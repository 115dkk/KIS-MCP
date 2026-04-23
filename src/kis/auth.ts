/**
 * KIS OAuth token issuance + KV caching.
 *
 * Spec (CLAUDE.md §3.2, §5.2):
 * - Token TTL stored as 23h (real expiry ~24h, 1h safety margin)
 * - Tokens never logged or returned in responses
 * - 401 from any KIS call should trigger one re-issuance + retry
 */

import { KIS } from "./endpoints.js";
import type { KisTokenResponse } from "./types.js";
import { KvCache } from "../utils/cache.js";

export interface KisAuthEnv {
  KIS_APP_KEY: string;
  KIS_APP_SECRET: string;
  KIS_BASE_URL: string;
  KIS_TOKENS: KVNamespace;
}

interface CachedToken {
  accessToken: string;
  issuedAt: number; // unix seconds
  expiresAt: number; // unix seconds
}

const TOKEN_KEY = "kis:access_token:v1";
const SAFETY_MARGIN_SEC = 60 * 60; // 1 hour
const TOKEN_TTL_SEC = 23 * 60 * 60; // 23 hours

// Per-isolate de-duplication of in-flight token requests.
const inflight = new Map<string, Promise<string>>();

export class KisAuth {
  private readonly cache: KvCache;

  constructor(private readonly env: KisAuthEnv) {
    this.cache = new KvCache(env.KIS_TOKENS);
  }

  /**
   * Returns a valid access token, fetching/refreshing as needed.
   * Concurrent callers in the same isolate share a single in-flight request.
   */
  async getAccessToken(forceRefresh = false): Promise<string> {
    if (!forceRefresh) {
      const cached = await this.cache.getJSON<CachedToken>(TOKEN_KEY);
      if (cached && this.isUsable(cached)) {
        return cached.accessToken;
      }
    }

    const inflightKey = forceRefresh ? "refresh" : "fetch";
    let p = inflight.get(inflightKey);
    if (!p) {
      p = this.issueAndCache().finally(() => inflight.delete(inflightKey));
      inflight.set(inflightKey, p);
    }
    return p;
  }

  /** Drop the cached token (e.g. after a 401 from a downstream call). */
  async invalidate(): Promise<void> {
    await this.cache.delete(TOKEN_KEY);
  }

  private isUsable(cached: CachedToken): boolean {
    const nowSec = Math.floor(Date.now() / 1000);
    return cached.expiresAt - nowSec > SAFETY_MARGIN_SEC;
  }

  private async issueAndCache(): Promise<string> {
    const url = `${this.env.KIS_BASE_URL}${KIS.oauth.issueToken.path}`;
    const body = JSON.stringify({
      grant_type: "client_credentials",
      appkey: this.env.KIS_APP_KEY,
      appsecret: this.env.KIS_APP_SECRET,
    });

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      // Strip any bearer-shaped strings before surfacing.
      const sanitized = text.replace(/Bearer\s+[A-Za-z0-9._\-]+/g, "Bearer ***");
      throw new Error(`KIS 토큰 발급 실패 (HTTP ${res.status}): ${sanitized.slice(0, 200)}`);
    }

    const data = (await res.json()) as KisTokenResponse;
    if (!data.access_token) {
      throw new Error("KIS 토큰 발급 응답에 access_token이 없습니다");
    }

    const nowSec = Math.floor(Date.now() / 1000);
    const expiresAt = nowSec + (Number.isFinite(data.expires_in) ? data.expires_in : 24 * 60 * 60);

    const cached: CachedToken = {
      accessToken: data.access_token,
      issuedAt: nowSec,
      expiresAt,
    };
    await this.cache.putJSON(TOKEN_KEY, cached, TOKEN_TTL_SEC);
    return data.access_token;
  }
}
