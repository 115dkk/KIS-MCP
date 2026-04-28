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

/** 검색용 정규화: 공백·특수문자 제거 후 소문자. 한글은 그대로. */
function normalizeName(s: string): string {
  return s.replace(/[\s\-_().[\]]/g, "").toLowerCase();
}

/**
 * 사전 정규화된 레코드 (M0-3).
 * 모듈 로드 시 normalizeName을 1회만 적용. findByName 호출마다 4300번
 * 정규식 치환을 재실행하던 패턴 제거 (벤치마크상 66% CPU 절감).
 */
interface IndexedRecord extends SymbolRecord {
  _norm: string;
}

const indexed: IndexedRecord[] = data.records.map((rec) => ({
  ...rec,
  _norm: normalizeName(rec.name),
}));

// 한 번만 인덱싱 (모듈 로드 시점). KOSPI+KOSDAQ 합쳐 ~4300개 → Map 액세스 O(1).
const byCode = new Map<string, SymbolRecord>();
const byNormalizedName = new Map<string, SymbolRecord[]>();
for (const rec of indexed) {
  byCode.set(rec.code, rec);
  const existing = byNormalizedName.get(rec._norm);
  if (existing) existing.push(rec);
  else byNormalizedName.set(rec._norm, [rec]);
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

/**
 * IndexedRecord → SymbolRecord 변환 (외부 응답용).
 * 내부 캐시 필드(_norm)를 제거. spread를 그대로 쓰면 _norm이 누설되는 버그 방지.
 */
function pureRecord(rec: IndexedRecord): SymbolRecord {
  return { code: rec.code, name: rec.name, type: rec.type, market: rec.market };
}

/** 정확 코드 매칭 (6자리 숫자 권장). 내부 캐시 필드(_norm)는 제거하고 깨끗한 SymbolRecord 반환. */
export function findByCode(code: string): SymbolRecord | undefined {
  const rec = byCode.get(code.trim().toUpperCase());
  return rec ? pureRecord(rec as IndexedRecord) : undefined;
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
      // byNormalizedName은 IndexedRecord[]를 담고 있으므로 _norm을 제외하고 반환.
      if (filter(rec)) tier1.push({ ...pureRecord(rec as IndexedRecord), matchTier: 1 });
    }
  }

  // prefix / substring (전체 순회 — 4300개라 즉시).
  // _norm은 모듈 초기화 시 사전 계산 (M0-3).
  for (const rec of indexed) {
    if (!filter(rec)) continue;
    if (rec._norm === norm) continue; // tier1에 이미 있음
    if (rec._norm.startsWith(norm)) tier2.push({ ...pureRecord(rec), matchTier: 2 });
    else if (rec._norm.includes(norm)) tier3.push({ ...pureRecord(rec), matchTier: 3 });
  }

  const sortByName = (a: SymbolRecord, b: SymbolRecord) => a.name.localeCompare(b.name);
  tier1.sort(sortByName);
  tier2.sort(sortByName);
  tier3.sort(sortByName);

  return [...tier1, ...tier2, ...tier3].slice(0, limit);
}

/**
 * KV에 정적 인덱스를 저장 (M5 scheduled handler용).
 * 매일 cron이 호출하여 worker isolate 재시작 시점과 무관하게 KV에 항상 최신 보장.
 *
 * 본 함수는 static import된 indexJson을 그대로 KV에 저장. Workers에서 cp949 디코딩이
 * 불가능하므로(ICU 미포함) 한투 마스터 직접 fetch는 불가. 빌드 시점에 미리 가공한
 * 정적 JSON을 KV에 동기화하는 패턴으로 우회한다.
 *
 * 추후 cp949 디코더가 워커에 포함되면 이 함수를 한투 master fetch 로직으로 교체.
 */
export async function syncSymbolIndexToKv(kv: KVNamespace): Promise<{
  saved: boolean;
  totalRecords: number;
  generatedAt: string;
}> {
  const KEY = "kis:symbol-index:v1";
  const TTL = 8 * 24 * 60 * 60; // 8일 (cron 1일 + 안전 마진 7일)
  // 정적 indexJson을 그대로 직렬화하여 KV에 저장.
  // 280KB라 KV 25MB value 한도 내 충분.
  await kv.put(KEY, JSON.stringify(data), { expirationTtl: TTL });
  return {
    saved: true,
    totalRecords: data.totalRecords,
    generatedAt: data.generatedAt,
  };
}

/**
 * KV에서 인덱스 로드 (선택적 사용 — 향후 KV-aware lookup 기반).
 * 현재는 sync API(findByCode/findByName/listByFilter)가 정적 인덱스만 사용.
 * KV에서 가져온 인덱스를 사용하려면 추후 lazy-init 패턴으로 전환.
 */
export async function loadSymbolIndexFromKv(kv: KVNamespace): Promise<IndexFile | null> {
  const KEY = "kis:symbol-index:v1";
  const raw = await kv.get(KEY, "json");
  return (raw as IndexFile | null) ?? null;
}

/**
 * 분류 + 시장 필터로 전체 풀 반환 (advanced_search ETF 모드용 등).
 * 내부 캐시 필드(_norm)는 제거 — pureRecord()로 깨끗한 SymbolRecord만 반환.
 */
export function listByFilter(options: FindByNameOptions = {}): SymbolRecord[] {
  const typeSet = options.types && options.types.length ? new Set(options.types) : null;
  const marketSet = options.markets && options.markets.length ? new Set(options.markets) : null;
  const result: SymbolRecord[] = [];
  for (const rec of indexed) {
    if (typeSet && !typeSet.has(rec.type)) continue;
    if (marketSet && !marketSet.has(rec.market)) continue;
    result.push(pureRecord(rec));
  }
  return result;
}
