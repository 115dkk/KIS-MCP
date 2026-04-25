/**
 * KIS 응답 캐싱 유틸 (ROADMAP M4).
 *
 * ## 설계
 *
 * 1) 캐시 키: `kis:resp:<sha256(path + sorted query)>` 16자.
 *    SHA-256은 Web Crypto(`crypto.subtle.digest`)로 구현. Workers 런타임에 내장.
 *
 * 2) TTL 분류 (logical):
 *    - inquire-price / 지수-price / overseas-quote: **10초** (시세 변동 빈도)
 *    - 랭킹 / 배당 / 마스터 정보: **300초** (5분)
 *    - 차트 / 신용잔고 / 기타: **60초**
 *
 * 3) KV 최소 TTL이 60초이므로 10초 캐시는 KV 저장 시 60초 TTL을 쓰되,
 *    값 내부에 `expiresAt` 타임스탬프를 두어 조회 시 만료를 자체 검사.
 *
 * 4) **isolate 수명 통계**: hits/misses 카운터를 모듈 레벨에 둔다 — ping 도구가
 *    참조. KV-side 통계는 추적하지 않음 (worker 별로 다름).
 */

export type CacheTtl = "short" | "medium" | "long";

/** 경로별 TTL 분류 — KisClient.get()에서 사용. */
export function classifyTtl(path: string): { logicalSec: number; kvSec: number; tier: CacheTtl } {
  const lower = path.toLowerCase();
  // 현재가 / 환율·지수 현재값 — 짧은 TTL
  if (
    lower.includes("inquire-price") ||
    lower.includes("inquire-index-price") ||
    lower.endsWith("/quotations/price") ||
    lower.endsWith("/quotations/multprice")
  ) {
    return { logicalSec: 10, kvSec: 60, tier: "short" };
  }
  // 배당 / 랭킹 / 상품 정보 — 긴 TTL (5분)
  if (
    lower.includes("/ksdinfo/") ||
    lower.includes("/ranking/") ||
    lower.includes("volume-rank") ||
    lower.includes("search-info") ||
    lower.includes("ffcode")
  ) {
    return { logicalSec: 300, kvSec: 300, tier: "long" };
  }
  // 그 외 (차트, 신용, 분봉) — 60초
  return { logicalSec: 60, kvSec: 60, tier: "medium" };
}

interface CachedResponse<T> {
  data: T;
  expiresAt: number; // unix seconds
}

interface CacheStats {
  hits: number;
  misses: number;
  bypass: number;
  errors: number;
}

const stats: CacheStats = { hits: 0, misses: 0, bypass: 0, errors: 0 };

export function getCacheStats(): Readonly<CacheStats> {
  return { ...stats };
}

export function bumpBypass(): void {
  stats.bypass += 1;
}

const KEY_PREFIX = "kis:resp:";

/**
 * 캐시 키 산출. path + 정렬된 query string + tr_id의 SHA-256.
 * tr_id 분리: 같은 path라도 모의/실전이 다른 응답을 줄 수 있어 키에 포함.
 */
export async function buildCacheKey(
  path: string,
  query: Record<string, string | undefined | null> | undefined,
  trId: string,
): Promise<string> {
  const parts: string[] = [trId, path];
  if (query) {
    const sorted = Object.keys(query)
      .sort()
      .map((k) => `${k}=${query[k] ?? ""}`)
      .join("&");
    parts.push(sorted);
  }
  const text = parts.join("|");
  const hash = await sha256Hex(text);
  return KEY_PREFIX + hash.slice(0, 32);
}

async function sha256Hex(text: string): Promise<string> {
  const enc = new TextEncoder();
  const buf = await crypto.subtle.digest("SHA-256", enc.encode(text));
  const bytes = new Uint8Array(buf);
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, "0");
  }
  return hex;
}

/**
 * KV에서 캐시된 응답 조회. 만료되었으면 null.
 * 통계 자동 갱신 (hit/miss).
 */
export async function getFromCache<T>(
  kv: KVNamespace,
  key: string,
): Promise<T | null> {
  try {
    const raw = await kv.get(key, "json");
    if (!raw) {
      stats.misses += 1;
      return null;
    }
    const cached = raw as CachedResponse<T>;
    const nowSec = Math.floor(Date.now() / 1000);
    if (cached.expiresAt <= nowSec) {
      // 만료 — KV의 60초 TTL은 아직 살아있을 수 있으므로 명시 삭제는 생략 (다음 put 시 덮어씀)
      stats.misses += 1;
      return null;
    }
    stats.hits += 1;
    return cached.data;
  } catch {
    stats.errors += 1;
    return null;
  }
}

/**
 * 응답을 KV에 저장. logicalSec(10/60/300)을 expiresAt에 반영하고,
 * KV TTL은 max(logicalSec, 60)으로 (KV 최소 60초).
 */
export async function putToCache<T>(
  kv: KVNamespace,
  key: string,
  data: T,
  logicalSec: number,
  kvSec: number,
): Promise<void> {
  try {
    const nowSec = Math.floor(Date.now() / 1000);
    const wrapper: CachedResponse<T> = {
      data,
      expiresAt: nowSec + logicalSec,
    };
    await kv.put(key, JSON.stringify(wrapper), {
      expirationTtl: Math.max(60, kvSec),
    });
  } catch {
    stats.errors += 1;
  }
}
