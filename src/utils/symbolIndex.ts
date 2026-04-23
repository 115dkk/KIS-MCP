/**
 * 한투 KOSPI/KOSDAQ 마스터파일에서 빌드 타임에 추출한 종목 인덱스 액세서.
 *
 * 데이터 소스:
 *   - https://new.real.download.dws.co.kr/common/master/kospi_code.mst.zip
 *   - https://new.real.download.dws.co.kr/common/master/kosdaq_code.mst.zip
 *
 * 빌드:
 *   npm run build:index  (== node scripts/build-symbol-index.mjs)
 *
 * 런타임은 src/data/symbolIndex.json을 import — fetch/decode 없음.
 *
 * 종목 분류 코드 (KIS 마스터 기준):
 *   ST = 주식 (보통주/우선주)
 *   EF = ETF
 *   EN = ETN
 *   RT = REITs
 *   BC = 수익증권 (펀드형 ETF/일부 ETF의 분류)
 *   PF/IF/MF/DR/SW/FS = 기타 (인프라/뮤추얼펀드/외화표시펀드 등)
 */

import indexJson from "../data/symbolIndex.json";

export type SymbolType = "ST" | "EF" | "EN" | "RT" | "BC" | "PF" | "IF" | "MF" | "DR" | "SW" | "FS" | string;
export type SymbolMarket = "KOSPI" | "KOSDAQ";

export interface SymbolRecord {
  code: string; // 6자리 단축코드
  name: string; // 한글 종목명
  type: SymbolType;
  market: SymbolMarket;
}

interface IndexFile {
  generatedAt: string;
  sourceServer: string;
  totalRecords: number;
  typeDistribution: Record<string, number>;
  marketDistribution: Record<string, number>;
  records: SymbolRecord[];
}

const data = indexJson as unknown as IndexFile;

// 한 번만 인덱싱 (모듈 로드 시점). KOSPI+KOSDAQ 합쳐 ~4300개 → Map 액세스 O(1).
const byCode = new Map<string, SymbolRecord>();
const byNormalizedName = new Map<string, SymbolRecord[]>();
for (const rec of data.records) {
  byCode.set(rec.code, rec);
  const norm = normalizeName(rec.name);
  const existing = byNormalizedName.get(norm);
  if (existing) existing.push(rec);
  else byNormalizedName.set(norm, [rec]);
}

/** 검색용 정규화: 공백·특수문자 제거 후 소문자. 한글은 그대로. */
function normalizeName(s: string): string {
  return s.replace(/[\s\-_().[\]]/g, "").toLowerCase();
}

export interface SymbolIndexMeta {
  generatedAt: string;
  totalRecords: number;
  typeDistribution: Record<string, number>;
  marketDistribution: Record<string, number>;
}

export function getIndexMeta(): SymbolIndexMeta {
  return {
    generatedAt: data.generatedAt,
    totalRecords: data.totalRecords,
    typeDistribution: data.typeDistribution,
    marketDistribution: data.marketDistribution,
  };
}

/** 정확 코드 매칭 (6자리 숫자 권장). */
export function findByCode(code: string): SymbolRecord | undefined {
  return byCode.get(code.trim().toUpperCase());
}

export interface FindByNameOptions {
  /** 결과 상한 (기본 20). */
  limit?: number;
  /** 종목 분류 필터 (예: ["ST"], ["EF","EN"]). 미지정 시 전체. */
  types?: SymbolType[];
  /** 시장 필터 (KOSPI/KOSDAQ). 미지정 시 전체. */
  markets?: SymbolMarket[];
}

export interface NameSearchHit extends SymbolRecord {
  /** 매칭 품질 — 1=정확, 2=prefix, 3=substring */
  matchTier: 1 | 2 | 3;
}

/**
 * 종목명 검색.
 *   1. 정확 매칭 (normalizeName 기준) → matchTier=1
 *   2. prefix 매칭 → matchTier=2
 *   3. substring 매칭 → matchTier=3
 * 같은 tier 내에서는 가나다순.
 */
export function findByName(query: string, options: FindByNameOptions = {}): NameSearchHit[] {
  const limit = options.limit ?? 20;
  const norm = normalizeName(query);
  if (!norm) return [];
  const typeSet = options.types && options.types.length ? new Set(options.types) : null;
  const marketSet = options.markets && options.markets.length ? new Set(options.markets) : null;
  const filter = (rec: SymbolRecord) => {
    if (typeSet && !typeSet.has(rec.type)) return false;
    if (marketSet && !marketSet.has(rec.market)) return false;
    return true;
  };

  const tier1: NameSearchHit[] = [];
  const tier2: NameSearchHit[] = [];
  const tier3: NameSearchHit[] = [];

  // 정확 매칭
  const exact = byNormalizedName.get(norm);
  if (exact) {
    for (const rec of exact) {
      if (filter(rec)) tier1.push({ ...rec, matchTier: 1 });
    }
  }

  // prefix / substring (전체 순회 — 4300개라 즉시)
  for (const rec of data.records) {
    if (!filter(rec)) continue;
    const recNorm = normalizeName(rec.name);
    if (recNorm === norm) continue; // tier1에 이미 있음
    if (recNorm.startsWith(norm)) tier2.push({ ...rec, matchTier: 2 });
    else if (recNorm.includes(norm)) tier3.push({ ...rec, matchTier: 3 });
  }

  const sortByName = (a: SymbolRecord, b: SymbolRecord) => a.name.localeCompare(b.name);
  tier1.sort(sortByName);
  tier2.sort(sortByName);
  tier3.sort(sortByName);

  return [...tier1, ...tier2, ...tier3].slice(0, limit);
}

/** 분류 + 시장 필터로 전체 풀 반환 (advanced_search ETF 모드용 등). */
export function listByFilter(options: FindByNameOptions = {}): SymbolRecord[] {
  const typeSet = options.types && options.types.length ? new Set(options.types) : null;
  const marketSet = options.markets && options.markets.length ? new Set(options.markets) : null;
  const result: SymbolRecord[] = [];
  for (const rec of data.records) {
    if (typeSet && !typeSet.has(rec.type)) continue;
    if (marketSet && !marketSet.has(rec.market)) continue;
    result.push(rec);
  }
  return result;
}
