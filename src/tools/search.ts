/**
 * Tool 4.7: advanced_search — meta-tool composing rankings + filters.
 *
 * Strategy:
 *   1. Pull a wide candidate pool from a KIS ranking endpoint:
 *        - rankBy=mcap → market-cap ranking
 *        - rankBy=volume → volume ranking
 *        - rankBy=return_* → fluctuation (등락률) ranking with rank_sort_cls_code
 *   2. Apply default + caller filters (inverse/leveraged/sector/etc.)
 *   3. Optionally compute period returns for the survivors (rate-limited).
 *   4. Sort and trim to `limit`.
 *
 * Constraints:
 *   - Hard cap of 100 results
 *   - Inverse/leveraged/derivative/mixed filters always applied (CLAUDE.md §4.7)
 */

import { KIS } from "../kis/endpoints.js";
import type { KisClient } from "../kis/client.js";
import type { KisRankingItem } from "../kis/types.js";
import { batchParallel } from "../utils/batch.js";
import { isExcludedByKeyword } from "../utils/filters.js";
import { parseNum } from "../utils/downsample.js";
import { extractArray } from "../utils/kisResponse.js";
import { isValidSymbol } from "../utils/symbol.js";
import {
  listByFilter,
  type SymbolMarket,
  type SymbolRecord,
  type SymbolType,
} from "../utils/symbolIndex.js";
import { getFundamentals } from "./fundamentals.js";
import { getReturn, type ReturnPeriod } from "./return.js";

export type RankBy = "return_1y" | "return_6m" | "return_3m" | "return_1m" | "volume" | "mcap";

export interface AdvancedSearchInput {
  instrumentType?: "stock" | "etf" | "both";
  rankBy: RankBy;
  order?: "asc" | "desc";
  limit?: number; // default 20, max 100
  sectorKeywords?: string[]; // INCLUDE keywords (must contain at least one)
  excludeKeywords?: string[]; // ADDITIONAL exclude keywords
  minMcap?: number; // 시총 하한 (한투 hts_avls 단위, 통상 억원)
  maxPer?: number;
  excludeOverseas?: boolean;
  /** 채권/TDF/머니마켓 ETF 추가 제외 (M0-8). 주식 스크리닝에서 권장. */
  excludeBonds?: boolean;
  /** When true, compute period return for top candidates (slower). */
  enrichWithReturn?: boolean;
  /**
   * enrichWithReturn=true일 때 계산할 기간을 명시적으로 지정.
   * - rankBy=return_1y/6m/3m/1m이면 그 매핑이 우선 (이 옵션 무시).
   * - rankBy=mcap/volume이면 이 옵션이 적용되어 "시총/거래량 풀 안에서의 N기간 수익률 정렬"이 가능.
   *   미지정 시 기본 '1Y'.
   */
  enrichmentPeriod?: ReturnPeriod;
  /**
   * 후보별 PER/PBR을 추가 조회하고 maxPer/maxPbr 필터를 적용 (M1).
   * 가치주 스크리닝(screen_value_stocks Prompt) 핵심 옵션.
   * 후보 상위 ENRICH_CAP(30)건에 대해 batchParallel(batch=5) 호출.
   */
  enrichWithFundamentals?: boolean;
  /**
   * PBR 상한. enrichWithFundamentals=true일 때만 유효.
   */
  maxPbr?: number;
  /**
   * 후보 풀을 KIS 랭킹(30건 cap, 시총 상위) 대신 마스터파일(KOSPI+KOSDAQ ~4300종목)에서 가져옴.
   * - 시총·거래량 데이터는 master에 없으므로 rankBy=mcap/volume이면 enrichWithReturn 권장
   * - sectorKeywords로 광범위 검색 가능 (예: "반도체" → 마스터 전체에서 매칭)
   * - instrumentType='etf' 모드에서는 자동으로 true (KIS 랭킹에 ETF가 거의 없는 한계 우회)
   */
  useMasterPool?: boolean;
}

export interface AdvancedSearchHit {
  symbol: string;
  name: string;
  price: number;
  changeRate: number;
  volume?: number;
  marketCap?: number;
  rankFromKis?: number;
  enrichedReturnPct?: number;
  enrichedReturnPeriod?: ReturnPeriod;
  /** M1: enrichWithFundamentals=true 시 채워짐 */
  enrichedPer?: number;
  enrichedPbr?: number;
}

export interface AdvancedSearchResult {
  query: AdvancedSearchInput;
  pulled: number;
  afterFilters: number;
  hits: AdvancedSearchHit[];
  notes: string[];
}

const RANK_RETURN_TO_PERIOD: Record<string, ReturnPeriod> = {
  return_1y: "1Y",
  return_6m: "6M",
  return_3m: "3M",
  return_1m: "1M",
};
const MASTER_RETURN_ENRICH_CAP = 30;

/** ETF 발행사 브랜드명. instrumentType='etf' 모드에서 자동 sectorKeywords로 사용. */
const ETF_BRAND_KEYWORDS = [
  "KODEX", "TIGER", "ACE", "PLUS", "RISE", "SOL", "ARIRANG", "HANARO",
  "KOSEF", "SMART", "FOCUS", "TIMEFOLIO", "WOORI", "KOACT", "BNK", "WON",
];

export async function advancedSearch(
  client: KisClient,
  input: AdvancedSearchInput,
): Promise<AdvancedSearchResult> {
  const limit = Math.min(Math.max(input.limit ?? 20, 1), 100);
  const order = input.order ?? "desc";
  const instrumentType = input.instrumentType ?? "both";
  const notes: string[] = [];

  // ETF 모드는 마스터파일 풀로 자동 전환 (KIS 랭킹 30건에 ETF가 거의 없음 → 항상 0건이던 문제 해결)
  const useMasterPool = input.useMasterPool ?? instrumentType === "etf";
  if (useMasterPool) {
    return await advancedSearchViaMaster(client, input, instrumentType, limit, order, notes);
  }

  let candidates: KisRankingItem[];
  if (input.rankBy === "mcap") {
    candidates = await fetchMarketCapRanking(client);
    notes.push("KIS 시가총액 상위 랭킹을 후보군으로 사용");
  } else if (input.rankBy === "volume") {
    candidates = await fetchVolumeRanking(client);
    notes.push("KIS 거래량 랭킹을 후보군으로 사용");
  } else {
    const isAsc = order === "asc";
    candidates = await fetchFluctuationRanking(client, isAsc);
    notes.push(`KIS 등락률 ${isAsc ? "하위" : "상위"} 랭킹을 후보군으로 사용`);
  }

  const pulled = candidates.length;

  // 엔드포인트별 응답 필드 차이 (공식 명세 기준):
  //   fluctuation: stck_shrn_iscd (시총·거래대금 필드 없음)
  //   market-cap : mksc_shrn_iscd, stck_avls (시총)
  //   volume-rank: mksc_shrn_iscd, acml_tr_pbmn (시총 없음)
  const symbolOf = (c: KisRankingItem) => c.stck_shrn_iscd ?? c.mksc_shrn_iscd ?? "";
  const marketCapOf = (c: KisRankingItem) => parseNum(c.stck_avls ?? c.hts_avls);

  // instrumentType='etf'면 사용자가 sectorKeywords를 주지 않은 한 ETF 브랜드명 자동 주입.
  // KIS 랭킹 API는 ETF가 별도로 분리되지 않고 통합 풀에 있으므로 키워드로 필터.
  let effectiveSectorKeywords = input.sectorKeywords;
  if (instrumentType === "etf" && (!effectiveSectorKeywords || effectiveSectorKeywords.length === 0)) {
    effectiveSectorKeywords = ETF_BRAND_KEYWORDS;
    notes.push(
      `instrumentType='etf' 자동 처리: ${ETF_BRAND_KEYWORDS.length}개 ETF 브랜드 키워드를 sectorKeywords로 주입.`,
    );
  } else if (instrumentType === "stock") {
    notes.push("instrumentType='stock' 모드: ETF는 결과에서 자동 제외 (브랜드 키워드 매칭).");
  }

  const isEtfName = (name: string) => {
    const upper = name.toUpperCase();
    return ETF_BRAND_KEYWORDS.some((k) => upper.includes(k));
  };

  // Filter out empty/invalid + apply keyword filters.
  const filtered = candidates.filter((c) => {
    const name = c.hts_kor_isnm ?? "";
    const symbol = symbolOf(c);
    if (!isValidSymbol(symbol) || !name) return false;
    if (
      isExcludedByKeyword(name, {
        extraKeywords: input.excludeKeywords,
        excludeOverseas: input.excludeOverseas,
        excludeBonds: input.excludeBonds,
      })
    ) {
      return false;
    }
    // instrumentType='stock' 명시 시 ETF 자동 제외
    if (instrumentType === "stock" && isEtfName(name)) return false;
    if (effectiveSectorKeywords && effectiveSectorKeywords.length > 0) {
      const upper = name.toUpperCase();
      if (!effectiveSectorKeywords.some((k) => upper.includes(k.toUpperCase()))) return false;
    }
    if (input.minMcap !== undefined) {
      const mc = marketCapOf(c);
      // 시총 필드가 응답에 없는 랭킹(fluctuation/volume)은 minMcap 필터 적용 불가 → 통과시킴
      if (Number.isFinite(mc) && mc < input.minMcap) return false;
    }
    return true;
  });

  // ETF 모드인데 결과가 0건이면 안내 추가
  if (instrumentType === "etf" && filtered.length === 0) {
    notes.push(
      "⚠️ KIS 랭킹 API에는 ETF가 거의 포함되지 않습니다 (개별 주식 위주). " +
        "ETF 분석은 inspect_etf prompt 또는 get_quote(ETF 종목코드)+get_etf_components 조합을 사용하세요.",
    );
  }

  const baseHits: AdvancedSearchHit[] = filtered.map((c, i) => ({
    symbol: symbolOf(c),
    name: c.hts_kor_isnm!,
    price: parseNum(c.stck_prpr),
    changeRate: parseNum(c.prdy_ctrt),
    volume: parseNum(c.acml_vol) || undefined,
    marketCap: marketCapOf(c) || undefined,
    rankFromKis: parseNum(c.data_rank) || i + 1,
  }));

  // Return enrichment.
  // rankBy=return_*면 매핑 사용. mcap/volume이면 enrichmentPeriod (기본 1Y) 사용.
  const returnRankPeriod = RANK_RETURN_TO_PERIOD[input.rankBy];
  const period: ReturnPeriod | undefined =
    returnRankPeriod ??
    (input.enrichWithReturn ? input.enrichmentPeriod ?? "1Y" : undefined);
  const shouldEnrichReturn = period !== undefined && (input.enrichWithReturn === true || returnRankPeriod !== undefined);

  // **enrichment는 limit으로 자르기 전에 적용** — 그래야 30개 풀 전체의 N기간
  // 수익률로 정렬한 결과의 상위/하위 limit을 얻을 수 있음.
  // 자르고 나서 정렬하면 잘린 풀 안에서만 정렬되어 사용자 의도(전체 풀의 상위/하위)와 다름.
  // 30s wall-clock 보호: 풀 전체(~30개) 모두 enrichment.
  let trimmed: AdvancedSearchHit[];
  if (shouldEnrichReturn && period) {
    // batchParallel: 5건씩 병렬 호출 (레이트리미터 15/s 안전 마진).
    const batchResults = await batchParallel(
      baseHits,
      (hit) => getReturn(client, { symbol: hit.symbol, period }),
      5,
    );
    const enriched: AdvancedSearchHit[] = batchResults.map(({ item, result }) =>
      result
        ? { ...item, enrichedReturnPct: result.absoluteReturnPct, enrichedReturnPeriod: period }
        : item,
    );
    enriched.sort((a, b) => {
      const av = a.enrichedReturnPct ?? a.changeRate;
      const bv = b.enrichedReturnPct ?? b.changeRate;
      return order === "asc" ? av - bv : bv - av;
    });
    trimmed = enriched.slice(0, limit);
    notes.push(
      `풀 전체 ${baseHits.length}개에 ${period} 수익률 병렬 계산(batch=5) 후 ${order} 정렬, 상위 ${trimmed.length}개 반환` +
        (returnRankPeriod ? ` (rankBy=${input.rankBy} 자동 enrichment)` : ` (rankBy=${input.rankBy} 풀의 ${period} 진짜 순위)`),
    );
  } else {
    trimmed = baseHits.slice(0, limit);
  }

  // M1: PER/PBR enrichment + maxPer/maxPbr 필터.
  if (input.enrichWithFundamentals) {
    trimmed = await enrichFundamentalsAndFilter(
      client,
      trimmed,
      input.maxPer,
      input.maxPbr,
      notes,
    );
  }

  return {
    query: input,
    pulled,
    afterFilters: filtered.length,
    hits: trimmed,
    notes,
  };
}

/**
 * M1: 후보 hits에 PER/PBR 추가 + maxPer/maxPbr 필터.
 *
 * - batchParallel(batch=5)로 getFundamentals 호출
 * - 호출 실패한 종목은 필터에서 통과시킴 (보수적 — 데이터 부재로 잘못 제거 방지)
 * - 필터 통과만 남김
 */
async function enrichFundamentalsAndFilter(
  client: KisClient,
  hits: AdvancedSearchHit[],
  maxPer: number | undefined,
  maxPbr: number | undefined,
  notes: string[],
): Promise<AdvancedSearchHit[]> {
  if (hits.length === 0) return hits;

  const batchResults = await batchParallel(
    hits,
    (hit) => getFundamentals(client, { symbol: hit.symbol }),
    5,
  );
  const enriched: AdvancedSearchHit[] = batchResults.map(({ item, result }) =>
    result
      ? { ...item, enrichedPer: result.per, enrichedPbr: result.pbr }
      : item,
  );

  let pre = enriched.length;
  const filtered = enriched.filter((hit) => {
    if (maxPer !== undefined && hit.enrichedPer !== undefined && hit.enrichedPer > maxPer) {
      return false;
    }
    if (maxPbr !== undefined && hit.enrichedPbr !== undefined && hit.enrichedPbr > maxPbr) {
      return false;
    }
    return true;
  });
  notes.push(
    `상위 ${pre}개에 대해 PER/PBR 병렬 enrichment (batch=5)` +
      (maxPer !== undefined || maxPbr !== undefined
        ? ` → maxPer=${maxPer ?? "∞"}/maxPbr=${maxPbr ?? "∞"} 필터 후 ${filtered.length}건`
        : ""),
  );
  return filtered;
}

async function fetchFluctuationRanking(
  client: KisClient,
  ascending: boolean,
): Promise<KisRankingItem[]> {
  const res = await client.get<KisRankingItem[]>({
    path: KIS.fluctuationRank.path,
    trId: KIS.fluctuationRank.trIdReal,
    query: {
      fid_cond_mrkt_div_code: "J",
      fid_cond_scr_div_code: "20170",
      fid_input_iscd: "0000",
      fid_rank_sort_cls_code: ascending ? "1" : "0", // 0:상승, 1:하락
      fid_input_cnt_1: "0",
      fid_prc_cls_code: "0",
      fid_input_price_1: "",
      fid_input_price_2: "",
      fid_vol_cnt: "",
      // 명세: 9자리 (증거금 30/40/50/60/100, 신용보증금 30/40/50/60). 0=전체 포함.
      fid_trgt_cls_code: "0",
      // 명세: 10자리 마스크 (투자위험·관리·정리·불성실·우선·거래정지·ETF·ETN·신용주문불가·SPAC).
      // 7번째 비트(ETF) / 8번째 비트(ETN) = 0 이면 ETF/ETN 결과에 포함.
      fid_trgt_exls_cls_code: "0000000000",
      fid_div_cls_code: "0",
      fid_rsfl_rate1: "",
      fid_rsfl_rate2: "",
    },
  });
  return extractArray<KisRankingItem>(res);
}

async function fetchMarketCapRanking(client: KisClient): Promise<KisRankingItem[]> {
  const res = await client.get<KisRankingItem[]>({
    path: KIS.marketCapRank.path,
    trId: KIS.marketCapRank.trIdReal,
    query: {
      fid_input_price_2: "",
      fid_cond_mrkt_div_code: "J",
      fid_cond_scr_div_code: "20174",
      fid_div_cls_code: "0",
      fid_input_iscd: "0000",
      fid_trgt_cls_code: "0",
      // 명세: 10자리 마스크. ETF/ETN 비트 0 = 포함.
      fid_trgt_exls_cls_code: "0000000000",
      fid_input_price_1: "",
      fid_vol_cnt: "",
    },
  });
  return extractArray<KisRankingItem>(res);
}

async function fetchVolumeRanking(client: KisClient): Promise<KisRankingItem[]> {
  const res = await client.get<KisRankingItem[]>({
    path: KIS.volumeRank.path,
    trId: KIS.volumeRank.trIdReal,
    query: {
      fid_cond_mrkt_div_code: "J",
      fid_cond_scr_div_code: "20171",
      fid_input_iscd: "0000",
      fid_div_cls_code: "0",
      fid_blng_cls_code: "0",
      fid_trgt_cls_code: "111111111",
      fid_trgt_exls_cls_code: "0000000000",
      fid_input_price_1: "",
      fid_input_price_2: "",
      fid_vol_cnt: "",
      fid_input_date_1: "",
    },
  });
  return extractArray<KisRankingItem>(res);
}

/**
 * 마스터파일(KOSPI+KOSDAQ ~4300 종목) 기반 풀 검색.
 *
 * 작동 원리 (CLAUDE.md §12 워크플로우 + advanced_search 진단 보고 참조):
 *   1. 마스터에서 instrumentType에 맞는 종목분류로 1차 필터 (ST/EF/EN)
 *   2. excludeKeywords (기본 인버스/레버리지 등 + 사용자 추가) 제거
 *   3. sectorKeywords (있으면) include 필터
 *   4. rankBy=return_* 또는 enrichWithReturn=true이면 getReturn 호출
 *   5. enrichment 결과로 정렬 (없으면 가나다순)
 *
 * KIS 랭킹과 차이점:
 *   - 시총·거래량 데이터 없음 (마스터에 미포함) → minMcap/rankBy=mcap/volume이 무력
 *     → rankBy=return_*는 후보가 cap 이내일 때만 정확한 실제 수익률 정렬 가능
 *   - 풀 사이즈 무제한 (~4300) → 에코프로비엠/카카오 등 시총 30위 밖도 검색 가능
 *   - ETF 검색이 실제로 작동 (~1500개 EF/EN 풀)
 */
async function advancedSearchViaMaster(
  client: KisClient,
  input: AdvancedSearchInput,
  instrumentType: "stock" | "etf" | "both",
  limit: number,
  order: "asc" | "desc",
  notes: string[],
): Promise<AdvancedSearchResult> {
  // 분류 매핑
  const types: SymbolType[] =
    instrumentType === "etf"
      ? ["EF", "EN"]
      : instrumentType === "stock"
      ? ["ST"]
      : ["ST", "EF", "EN"];

  const markets: SymbolMarket[] = ["KOSPI", "KOSDAQ"];
  const pool: SymbolRecord[] = listByFilter({ types, markets });
  const pulled = pool.length;

  notes.push(
    `마스터파일 풀(${pulled}개, type=${types.join("/")}) 사용 — KIS 랭킹 30건 cap 우회.`,
  );
  if (input.minMcap !== undefined) {
    notes.push(
      "minMcap은 마스터 풀에서 무력합니다 (마스터에 시총 데이터 없음). " +
        "정확한 시총 필터링이 필요하면 useMasterPool=false로 KIS 랭킹 사용.",
    );
  }

  // 키워드 필터
  const filtered = pool.filter((rec) => {
    const name = rec.name;
    if (
      isExcludedByKeyword(name, {
        extraKeywords: input.excludeKeywords,
        excludeOverseas: input.excludeOverseas,
        excludeBonds: input.excludeBonds,
      })
    ) {
      return false;
    }
    if (input.sectorKeywords && input.sectorKeywords.length > 0) {
      const upper = name.toUpperCase();
      if (!input.sectorKeywords.some((k) => upper.includes(k.toUpperCase()))) return false;
    }
    return true;
  });

  // baseHits에 매핑 — 가격/시총/거래량은 master에 없음 (NaN/undefined)
  let hits: AdvancedSearchHit[] = filtered.map((rec, i) => ({
    symbol: rec.code,
    name: rec.name,
    price: NaN,
    changeRate: NaN,
    rankFromKis: i + 1,
  }));

  // enrichment: rankBy=return_*면 자동 적용. mcap/volume이면 enrichWithReturn=true일 때만 적용.
  // 마스터 풀이 크므로 호출 보호.
  const returnRankPeriod = RANK_RETURN_TO_PERIOD[input.rankBy];
  const period: ReturnPeriod | undefined =
    returnRankPeriod ??
    (input.enrichWithReturn ? input.enrichmentPeriod ?? "1Y" : undefined);
  const shouldEnrichReturn = period !== undefined && (input.enrichWithReturn === true || returnRankPeriod !== undefined);
  if (shouldEnrichReturn && period) {
    if (returnRankPeriod && filtered.length > MASTER_RETURN_ENRICH_CAP) {
      notes.push(
        `rankBy=${input.rankBy}은 ${period} 실제 수익률 랭킹이 필요하지만, 마스터 후보가 ${filtered.length}개라 ` +
          `워커 안전 한도(${MASTER_RETURN_ENRICH_CAP}개)를 초과합니다. 샘플 30개 순위를 진짜 순위처럼 반환하지 않도록 결과를 비웠습니다. ` +
          "sectorKeywords/excludeKeywords/excludeBonds/excludeOverseas로 후보를 30개 이하로 좁혀 다시 호출하세요.",
      );
      return {
        query: input,
        pulled,
        afterFilters: filtered.length,
        hits: [],
        notes,
      };
    }

    const targets = hits.slice(0, Math.min(filtered.length, MASTER_RETURN_ENRICH_CAP));
    if (targets.length < filtered.length) {
      notes.push(
        `enrichWithReturn 대상이 ${MASTER_RETURN_ENRICH_CAP}건으로 제한됩니다 (워커 30s wall-clock 보호). ` +
          `더 좁은 후보가 필요하면 sectorKeywords로 필터링하세요.`,
      );
    }
    const batchResults = await batchParallel(
      targets,
      (hit) => getReturn(client, { symbol: hit.symbol, period }),
      5,
    );
    const enriched: AdvancedSearchHit[] = batchResults.map(({ item, result }) =>
      result
        ? {
            ...item,
            price: result.endPrice ?? NaN,
            enrichedReturnPct: result.absoluteReturnPct,
            enrichedReturnPeriod: period,
          }
        : item,
    );
    enriched.sort((a, b) => {
      const av = a.enrichedReturnPct;
      const bv = b.enrichedReturnPct;
      if (av === undefined && bv === undefined) return 0;
      if (av === undefined) return 1;
      if (bv === undefined) return -1;
      return order === "asc" ? av - bv : bv - av;
    });
    hits = enriched.slice(0, limit);
    notes.push(
      `${targets.length}개 후보에 대해 ${period} 수익률 계산 후 ${order} 정렬, 상위 ${hits.length}개 반환` +
        (returnRankPeriod ? ` (rankBy=${input.rankBy} 자동 enrichment)` : ""),
    );
  } else {
    // 정렬 없이 가나다순 (마스터 풀의 deterministic 출력)
    hits = hits.slice(0, limit);
    if (period && !input.enrichWithReturn) {
      notes.push(
        `rankBy=${input.rankBy}이지만 enrichWithReturn=false → 실제 수익률 계산 없이 마스터 순(가나다)으로 반환. ` +
          `정확한 수익률 정렬이 필요하면 enrichWithReturn=true.`,
      );
    } else if (input.rankBy === "mcap" || input.rankBy === "volume") {
      notes.push(
        `rankBy=${input.rankBy}은 마스터 풀에서 의미가 없습니다 (시총/거래량 데이터 없음). ` +
          `KIS 랭킹 사용을 원하면 useMasterPool=false 명시.`,
      );
    }
  }

  // M1: PER/PBR enrichment 마스터 풀에서도 적용.
  // enrichWithReturn=true와 동시 사용 시 enrichWithReturn 후 결과(이미 30건 이내)에 적용됨.
  if (input.enrichWithFundamentals) {
    hits = await enrichFundamentalsAndFilter(
      client,
      hits,
      input.maxPer,
      input.maxPbr,
      notes,
    );
  }

  return {
    query: input,
    pulled,
    afterFilters: filtered.length,
    hits,
    notes,
  };
}
