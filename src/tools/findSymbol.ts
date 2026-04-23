/**
 * Tool: find_symbol — 종목명으로 종목코드 찾기 (LLM 환각 방어용).
 *
 * 한투 OpenAPI에는 "이름→코드" 검색 endpoint가 없어서, 빌드 시 KOSPI/KOSDAQ
 * 마스터파일을 다운로드 → JSON 인덱스로 구워둔 것을 워커 번들에 포함.
 * 자세한 작동 원리는 src/utils/symbolIndex.ts 헤더 참고.
 *
 * 매칭 알고리즘 (tier 우선):
 *   1. 6자리 숫자 입력 → 코드 정확 매칭 → 즉시 반환
 *   2. 종목명 정확 매칭 (정규화 후)
 *   3. 종목명 prefix 매칭
 *   4. 종목명 substring 매칭
 *
 * 같은 tier 안에서는 가나다순. 결과 상한 기본 20.
 */

import {
  findByCode,
  findByName,
  getIndexMeta,
  type FindByNameOptions,
  type NameSearchHit,
  type SymbolMarket,
  type SymbolType,
} from "../utils/symbolIndex.js";

export interface FindSymbolInput {
  /** 검색어 — 종목명(부분 가능) 또는 6자리 코드 */
  query: string;
  /** 결과 상한 (기본 20, 상한 50) */
  limit?: number;
  /** 종목 분류 필터 (예: ["ST"]=주식만, ["EF","EN"]=ETF/ETN만) */
  types?: SymbolType[];
  /** 시장 필터 */
  markets?: SymbolMarket[];
}

export interface FindSymbolHit extends NameSearchHit {}

export interface FindSymbolResult {
  query: string;
  matchedBy: "code-exact" | "name-search";
  hits: FindSymbolHit[];
  indexMeta: {
    generatedAt: string;
    totalRecords: number;
  };
  notes?: string[];
}

const CODE_REGEX = /^\d{6}$/;

export function findSymbol(input: FindSymbolInput): FindSymbolResult {
  if (!input?.query) throw new Error("query는 필수입니다");
  const query = input.query.trim();
  if (!query) throw new Error("query가 비어 있습니다");

  const limit = Math.min(Math.max(input.limit ?? 20, 1), 50);
  const meta = getIndexMeta();

  // 1. 6자리 숫자 → 코드 정확 매칭
  if (CODE_REGEX.test(query)) {
    const hit = findByCode(query);
    if (hit) {
      return {
        query,
        matchedBy: "code-exact",
        hits: [{ ...hit, matchTier: 1 }],
        indexMeta: { generatedAt: meta.generatedAt, totalRecords: meta.totalRecords },
      };
    }
    // 코드 형식인데 매칭 안 되면 이름 검색으로 fallback (혹시나)
  }

  // 2. 이름 검색 (tier 1→2→3)
  const opts: FindByNameOptions = {
    limit,
    types: input.types,
    markets: input.markets,
  };
  const hits = findByName(query, opts);

  const notes: string[] = [];
  if (hits.length === 0) {
    notes.push(
      `'${query}' 매칭 없음. 다른 검색어를 시도하거나 (KOSPI/KOSDAQ 마스터에 등재된 종목만 검색됨), ` +
        `상장 직후 신규 종목이면 다음 일배치(다음 영업일) 후 다시 시도하세요.`,
    );
  } else if (hits[0].matchTier === 3 && hits.length > 1) {
    notes.push(
      "정확/prefix 매칭이 없어 substring 매칭 결과만 표시. 결과가 의도와 다르면 검색어를 더 구체적으로.",
    );
  }

  return {
    query,
    matchedBy: "name-search",
    hits,
    indexMeta: { generatedAt: meta.generatedAt, totalRecords: meta.totalRecords },
    notes: notes.length ? notes : undefined,
  };
}
