/**
 * KIS REST client wrapper.
 *
 * Behavior (CLAUDE.md §5.3, §5.5):
 * - Rate limited to 15 req/sec (token bucket)
 * - 25s per-request timeout
 * - 401 → invalidate token, re-issue once, retry
 * - 429 / KIS rate-limit error code → exponential backoff up to 3 retries
 * - Korean-friendly error normalization
 * - Tokens / app keys never appear in logged messages
 */

import { KisAuth, type KisAuthEnv } from "./auth.js";
import { kisRateLimiter } from "../utils/ratelimit.js";
import {
  bumpBypass,
  buildCacheKey,
  classifyTtl,
  getFromCache,
  putToCache,
} from "../utils/responseCache.js";
import type { KisResponse } from "./types.js";

export interface KisGetOptions {
  /** Endpoint path, e.g. "/uapi/domestic-stock/v1/quotations/inquire-price". */
  path: string;
  /** TR_ID header value (real env). */
  trId: string;
  /** Query parameters (string-only — KIS expects everything as query strings). */
  query?: Record<string, string | undefined | null>;
  /** Optional tr_cont (paging) header. */
  trCont?: string;
  /** Optional custgtype header (P=개인, B=법인). Defaults to P. */
  custgType?: string;
  /**
   * 응답 캐시 우회 (M4). 페이지네이션 중간 호출이나 디버깅 시 사용.
   * 기본 false (캐시 사용).
   */
  skipCache?: boolean;
}

const REQUEST_TIMEOUT_MS = 25_000;
const MAX_RATE_LIMIT_RETRIES = 3;

export class KisApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly msgCode: string,
    public readonly msg: string,
    public readonly raw?: unknown,
  ) {
    super(`한투 API 에러 (${msgCode || `HTTP ${status}`}): ${msg}`);
    this.name = "KisApiError";
  }
}

export class KisClient {
  private readonly auth: KisAuth;
  private lastCallAt = 0;
  /**
   * KV 인스턴스 — 응답 캐싱(M4)에 사용. KisAuthEnv의 KIS_TOKENS와 동일 namespace 재사용.
   * (응답 캐시 키는 'kis:resp:' prefix이고 토큰 키는 'kis:access_token:'이라 충돌 없음.)
   */
  private get kv(): KVNamespace {
    return this.env.KIS_TOKENS;
  }

  constructor(private readonly env: KisAuthEnv) {
    this.auth = new KisAuth(env);
  }

  getLastCallAt(): number {
    return this.lastCallAt;
  }

  getAuth(): KisAuth {
    return this.auth;
  }

  /**
   * GET helper that handles auth, rate limiting, retries, and error normalization.
   *
   * M4: 캐시 레이어 통합. 캐시 히트 시 레이트 리미터를 소비하지 않음.
   * skipCache=true / trCont 페이지네이션 / rt_cd!=0 / 빈 응답은 캐싱 우회.
   */
  async get<TOutput = unknown>(opts: KisGetOptions): Promise<KisResponse<TOutput>> {
    // ── M4: 캐시 조회 ──
    let cacheKey: string | null = null;
    let ttl: { logicalSec: number; kvSec: number } | null = null;
    if (!opts.skipCache && !opts.trCont) {
      cacheKey = await buildCacheKey(opts.path, opts.query, opts.trId);
      ttl = classifyTtl(opts.path);
      const hit = await getFromCache<KisResponse<TOutput>>(this.kv, cacheKey);
      if (hit) {
        return hit;
      }
    } else {
      bumpBypass();
    }

    let token = await this.auth.getAccessToken();
    let attempt = 0;
    let authRetried = false;

    while (true) {
      await kisRateLimiter.acquire();
      const response = await this.executeRequest(opts, token);
      this.lastCallAt = Date.now();

      // 401: token expired or revoked → refresh once and retry.
      if (response.status === 401 && !authRetried) {
        authRetried = true;
        await this.auth.invalidate();
        token = await this.auth.getAccessToken(true);
        continue;
      }

      // 429 or KIS-side rate-limit → exponential backoff.
      if (response.status === 429 || response.status === 500) {
        if (attempt < MAX_RATE_LIMIT_RETRIES) {
          attempt += 1;
          await sleep(250 * 2 ** (attempt - 1));
          continue;
        }
      }

      const data = (await response.json().catch(() => null)) as KisResponse<TOutput> | null;

      if (!response.ok) {
        const msgCode = data?.msg_cd ?? "";
        const msg = data?.msg1 ?? `HTTP ${response.status}`;
        throw new KisApiError(response.status, msgCode, msg, data);
      }

      if (!data) {
        throw new KisApiError(response.status, "PARSE_ERROR", "응답을 JSON으로 해석할 수 없습니다");
      }

      // KIS sets rt_cd="0" on success and "1" on logical errors.
      if (data.rt_cd && data.rt_cd !== "0") {
        // Some "rate limit" style errors come through with 200 + EGW00201 etc.
        if (isRateLimitErrorCode(data.msg_cd) && attempt < MAX_RATE_LIMIT_RETRIES) {
          attempt += 1;
          await sleep(250 * 2 ** (attempt - 1));
          continue;
        }
        throw new KisApiError(response.status, data.msg_cd, data.msg1 || "KIS 응답 오류", data);
      }

      // ── M4: 성공 응답 캐싱 ──
      if (cacheKey && ttl) {
        if (isCacheableSuccess(opts.path, data)) {
          // fire-and-forget: KV put이 늦어도 응답은 즉시 반환
          void putToCache(this.kv, cacheKey, data, ttl.logicalSec, ttl.kvSec);
        }
      }

      return data;
    }
  }

  private async executeRequest(opts: KisGetOptions, token: string): Promise<Response> {
    const url = new URL(opts.path, this.env.KIS_BASE_URL);
    if (opts.query) {
      for (const [k, v] of Object.entries(opts.query)) {
        if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
      }
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json; charset=utf-8",
      authorization: `Bearer ${token}`,
      appkey: this.env.KIS_APP_KEY,
      appsecret: this.env.KIS_APP_SECRET,
      tr_id: opts.trId,
      custtype: opts.custgType ?? "P",
    };
    if (opts.trCont) headers.tr_cont = opts.trCont;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      return await fetch(url.toString(), { method: "GET", headers, signal: controller.signal });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new KisApiError(0, "NETWORK", `KIS API 호출 실패: ${msg}`);
    } finally {
      clearTimeout(timer);
    }
  }
}

function isRateLimitErrorCode(code: string | undefined): boolean {
  if (!code) return false;
  // EGW00201 = 초당 거래건수 초과, observed in KIS production.
  return code === "EGW00201" || code === "EGW00121";
}

function isCacheableSuccess(path: string, data: KisResponse<unknown>): boolean {
  const lower = path.toLowerCase();

  if (lower.includes("inquire-component-stock-price")) {
    return hasEtfComponentPayload(data);
  }

  return [data.output, data.output1, data.output2].some(hasSubstantiveOutput);
}

function hasEtfComponentPayload(data: KisResponse<unknown>): boolean {
  // ETF 구성종목 API는 output1에 메타, output2에 실제 구성종목 배열을 준다.
  // output1만 있는 빈 output2를 캐싱하면 재시도가 같은 빈 응답을 되읽는다.
  if (Array.isArray(data.output2) && data.output2.length > 0) return true;

  const meta = data.output1;
  if (!meta || typeof meta !== "object" || Array.isArray(meta)) return false;

  const expectedRaw = (meta as Record<string, unknown>).etf_cnfg_issu_cnt;
  const expected = Number(String(expectedRaw ?? "").replace(/,/g, "").trim());
  return Number.isFinite(expected) && expected === 0;
}

function hasSubstantiveOutput(output: unknown): boolean {
  if (Array.isArray(output)) return output.length > 0;
  return (
    output !== null &&
    output !== undefined &&
    typeof output === "object" &&
    Object.keys(output as Record<string, unknown>).length > 0
  );
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
