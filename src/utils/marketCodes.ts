/**
 * 시장 지표(지수/환율/원자재) alias → 한투 코드 매핑.
 *
 * 한투 OpenAPI는 종목과 달리 "지수·환율·원자재"는 카테고리별로 다른 endpoint와
 * 입력 코드 체계를 사용한다. 사용자/LLM이 외우기 어려운 한투 내부 코드를
 * 직관적인 alias("KOSPI", "USDKRW", "WTI" 등)로 받기 위한 매핑 테이블.
 *
 * 매핑 실패 시 호출 측은 `marketMaster.ts`로 fallback 처리한다.
 *
 * ## 카테고리별 endpoint 요약 (구현 도구 기준)
 *   - index-domestic : FHPUP02100000 (현재) / FHPUP02120000 (일·주·월)
 *   - index-overseas : FHKST03030100 (일·주·월·년) — 최근 1봉으로 "현재값" 추출
 *   - fx             : FHKST03030100 (MRKT=X)
 *   - commodity-spot : FHKST03030100 (MRKT=S/I 등) — 금·국채 등 KIS가 직접 제공
 *   - commodity-fut  : HHDFC55010000 (현재) / HHDFC55020100 (일간 시계열) — WTI/Brent 등 해외선물.
 *                      contract 코드는 base(예: "CL") + 월코드(F~Z) + 2자리 연도로 구성.
 */

export type MarketCategory =
  | "index-domestic"
  | "index-overseas"
  | "fx"
  | "commodity-spot"
  | "commodity-futures";

export interface MarketAlias {
  /** 어느 카테고리에 속하는지 — 도구가 이걸 보고 endpoint를 라우팅 */
  category: MarketCategory;
  /** 한투 FID_COND_MRKT_DIV_CODE — 'U'(국내업종) | 'N'(해외지수) | 'X'(환율) | 'S'(금선물) | 'I'(국채) */
  mrkt?: string;
  /** 한투 FID_INPUT_ISCD — 직접 시세 조회에 쓰는 종목 식별자 */
  iscd?: string;
  /** 해외선물 SRS_CD의 base 코드 (예: "CL"=WTI, "LCO"=Brent). 만기물은 호출 시점에 산출 */
  srsBase?: string;
  /** 해외선물 만기 패턴: "monthly"(매월) | "quarterly"(분기 H/M/U/Z만) */
  contractCadence?: "monthly" | "quarterly";
  /** 사용자에게 보여줄 표준 이름 */
  displayName: string;
  /** 선택: 응답 필드 단위 라벨 (예: "USD/KRW", "USD/barrel") */
  unit?: string;
  /**
   * 선택: 한투 ffcode.mst의 sCalcDesz(가격 소수점 자릿수). 응답 raw 값에서
   * 10^priceDecimals로 나누어 실제 가격 산출. WTI/Brent=2(8895→88.95),
   * Gold=1(20654→2065.4) 등.
   */
  priceDecimals?: number;
  /** 선택: 발견되지 않을 가능성을 사용자에게 안내할 메모 */
  notes?: string;
}

// ─── 단일 진실의 원천: 카테고리별 대상 상수 (M0-4 참조 공유) ───
// 각 고유 대상에 대해 객체를 단 1번만 생성하고, ALIAS_TABLE에서 모든 alias가
// 이 상수를 참조한다. 결과: (1) 메모리 절감 (2) 변경 1군데만 (3) 참조 동일성
// 보장 (resolveAlias("KOSPI") === resolveAlias("코스피")).
//
// underscore prefix는 외부 export와 시각적으로 구분.

// 국내 지수 (FHPUP02100000 + MRKT=U)
const _KOSPI: MarketAlias = { category: "index-domestic", mrkt: "U", iscd: "0001", displayName: "코스피" };
const _KOSDAQ: MarketAlias = { category: "index-domestic", mrkt: "U", iscd: "1001", displayName: "코스닥" };
const _KOSPI200: MarketAlias = { category: "index-domestic", mrkt: "U", iscd: "2001", displayName: "코스피200" };
const _KOSDAQ150: MarketAlias = { category: "index-domestic", mrkt: "U", iscd: "3003", displayName: "KOSDAQ150" };

// 해외 지수 (FHKST03030100 + MRKT=N)
const _SPX: MarketAlias = { category: "index-overseas", mrkt: "N", iscd: "SPX", displayName: "S&P 500" };
const _NASDAQ_COMP: MarketAlias = { category: "index-overseas", mrkt: "N", iscd: "COMP", displayName: "NASDAQ Composite" };
const _NASDAQ_100: MarketAlias = { category: "index-overseas", mrkt: "N", iscd: "NDX", displayName: "NASDAQ-100" };
const _DJI: MarketAlias = { category: "index-overseas", mrkt: "N", iscd: ".DJI", displayName: "Dow Jones Industrial" };

// 환율 (FHKST03030100 + MRKT=X)
const _USD_KRW: MarketAlias = { category: "fx", mrkt: "X", iscd: "FX@KRW", displayName: "USD/KRW", unit: "원" };
const _EUR_KRW: MarketAlias = { category: "fx", mrkt: "X", iscd: "FX@EUR", displayName: "EUR/KRW", unit: "원" };
const _JPY_KRW: MarketAlias = { category: "fx", mrkt: "X", iscd: "FX@JPY", displayName: "JPY/KRW (100엔)", unit: "원" };
const _CNY_KRW: MarketAlias = { category: "fx", mrkt: "X", iscd: "FX@CNY", displayName: "CNY/KRW", unit: "원" };
const _GBP_KRW: MarketAlias = { category: "fx", mrkt: "X", iscd: "FX@GBP", displayName: "GBP/KRW", unit: "원", notes: "ISCD 미검증 — 응답 비면 master fallback" };
const _AUD_KRW: MarketAlias = { category: "fx", mrkt: "X", iscd: "FX@AUD", displayName: "AUD/KRW", unit: "원", notes: "ISCD 미검증 — 응답 비면 master fallback" };
const _CAD_KRW: MarketAlias = { category: "fx", mrkt: "X", iscd: "FX@CAD", displayName: "CAD/KRW", unit: "원", notes: "ISCD 미검증 — 응답 비면 master fallback" };

// 원자재 (해외선물 — HHDFC55010000)
const _WTI: MarketAlias = {
  category: "commodity-futures",
  srsBase: "CL",
  contractCadence: "monthly",
  displayName: "WTI 원유 (NYMEX / 한투 CME 분류)",
  unit: "USD/barrel",
  priceDecimals: 2,
};
// Brent: 한투 ffcode.mst 마스터에는 base="BZ"로 등록되어 있으나, 실제 API
// (HHDFC55010000)는 SRS_CD에 "BRN" prefix를 받는다 (한투 공식 spec 예시 BRNF25).
// 마스터 ↔ API의 알려진 코드 불일치 케이스.
const _BRENT: MarketAlias = {
  category: "commodity-futures",
  srsBase: "BRN",
  contractCadence: "monthly",
  displayName: "Brent 원유 (ICE)",
  unit: "USD/barrel",
  priceDecimals: 2,
};
// GC = COMEX Gold Futures. 분기 만기(H/M/U/Z)이지만 매월 거래 가능.
const _GOLD: MarketAlias = {
  category: "commodity-futures",
  srsBase: "GC",
  contractCadence: "monthly",
  displayName: "COMEX 금 선물 (100oz, 한투 CME 분류)",
  unit: "USD/oz",
  priceDecimals: 1,
  notes: "한투는 KRX 금현물 시세를 직접 제공하지 않음. COMEX 금선물(GC)로 우회.",
};
// 추가 원자재 (M3) — 한투 ffcode.mst 표 기준 추정값. priceDecimals/srsBase는
// 실호출 검증 후 보정 가능하도록 notes에 명시.
const _SILVER: MarketAlias = {
  category: "commodity-futures",
  srsBase: "SI",
  contractCadence: "monthly",
  displayName: "COMEX 은 선물",
  unit: "USD/oz",
  priceDecimals: 3,
  notes: "ffcode.mst 미검증 — 응답이 비면 raw SRS_CD(SIK26 등) 직접 입력",
};
const _COPPER: MarketAlias = {
  category: "commodity-futures",
  srsBase: "HG",
  contractCadence: "monthly",
  displayName: "COMEX 구리 선물",
  unit: "USD/lb",
  priceDecimals: 4,
  notes: "ffcode.mst 미검증 — 응답이 비면 raw SRS_CD(HGK26 등) 직접 입력",
};
const _NATGAS: MarketAlias = {
  category: "commodity-futures",
  srsBase: "NG",
  contractCadence: "monthly",
  displayName: "NYMEX 천연가스 선물",
  unit: "USD/MMBtu",
  priceDecimals: 3,
  notes: "ffcode.mst 미검증 — 응답이 비면 raw SRS_CD(NGK26 등) 직접 입력",
};
const _PALLADIUM: MarketAlias = {
  category: "commodity-futures",
  srsBase: "PA",
  contractCadence: "quarterly",
  displayName: "NYMEX 팔라듐 선물",
  unit: "USD/oz",
  priceDecimals: 1,
  notes: "ffcode.mst 미검증 — 분기 만기물(H/M/U/Z) 자동 산출",
};
const _PLATINUM: MarketAlias = {
  category: "commodity-futures",
  srsBase: "PL",
  contractCadence: "quarterly",
  displayName: "NYMEX 백금 선물",
  unit: "USD/oz",
  priceDecimals: 1,
  notes: "ffcode.mst 미검증 — 분기 만기물(H/M/U/Z) 자동 산출",
};

/**
 * Alias 테이블. 키는 정규화된(uppercase, trim) 형태로 사전 매핑.
 * 한국어 alias도 그대로 받기 위해 정규화 시 case는 변환하되 한글은 보존.
 *
 * 모든 alias는 위의 상수를 참조 — 객체 리터럴 복사 없음 (M0-4).
 */
const ALIAS_TABLE: Record<string, MarketAlias> = {
  // ─── 국내 지수 ───
  KOSPI: _KOSPI,
  코스피: _KOSPI,
  KS11: _KOSPI,
  KOSDAQ: _KOSDAQ,
  코스닥: _KOSDAQ,
  KQ11: _KOSDAQ,
  KOSPI200: _KOSPI200,
  코스피200: _KOSPI200,
  KS200: _KOSPI200,
  KSQ150: _KOSDAQ150,
  KOSDAQ150: _KOSDAQ150,

  // ─── 해외 지수 ───
  SPX: _SPX,
  "S&P500": _SPX,
  SP500: _SPX,
  COMP: _NASDAQ_COMP,
  NASDAQ: _NASDAQ_COMP,
  IXIC: _NASDAQ_COMP,
  나스닥: _NASDAQ_COMP,
  NDX: _NASDAQ_100,
  "NASDAQ-100": _NASDAQ_100,
  NASDAQ100: _NASDAQ_100,
  DJI: _DJI,
  DOW: _DJI,
  DJIA: _DJI,
  다우: _DJI,

  // ─── 환율 ───
  USDKRW: _USD_KRW,
  원달러: _USD_KRW,
  달러: _USD_KRW,
  USDKRW_X: _USD_KRW,
  EURKRW: _EUR_KRW,
  유로: _EUR_KRW,
  JPYKRW: _JPY_KRW,
  엔화: _JPY_KRW,
  CNYKRW: _CNY_KRW,
  위안: _CNY_KRW,
  GBPKRW: _GBP_KRW,
  파운드: _GBP_KRW,
  영파운드: _GBP_KRW,
  AUDKRW: _AUD_KRW,
  호주달러: _AUD_KRW,
  CADKRW: _CAD_KRW,
  캐나다달러: _CAD_KRW,

  // ─── 원자재 (선물) ───
  WTI: _WTI,
  WTI원유: _WTI,
  CL: _WTI,
  BRENT: _BRENT,
  브렌트유: _BRENT,
  브렌트: _BRENT,
  BRN: _BRENT,
  GOLD: _GOLD,
  금: _GOLD,
  GC: _GOLD,
  SILVER: _SILVER,
  은: _SILVER,
  SI: _SILVER,
  COPPER: _COPPER,
  구리: _COPPER,
  HG: _COPPER,
  NATGAS: _NATGAS,
  천연가스: _NATGAS,
  NG: _NATGAS,
  PALLADIUM: _PALLADIUM,
  팔라듐: _PALLADIUM,
  PA: _PALLADIUM,
  PLATINUM: _PLATINUM,
  백금: _PLATINUM,
  PL: _PLATINUM,
};

/** 한투 ffcode.mst의 월코드 (F=1월 … Z=12월). */
export const FUTURES_MONTH_CODES = [
  "F", "G", "H", "J", "K", "M", "N", "Q", "U", "V", "X", "Z",
] as const;
export type FuturesMonthCode = (typeof FUTURES_MONTH_CODES)[number];

/**
 * "현재 시점에서 가장 가까운 미래 만기물"의 SRS_CD를 산출.
 *
 *   nearestFutureContract("CL", today=2026-04-21) → "CLK26" (5월물)
 *
 * WTI/Brent는 통상 만기 직전 영업일까지 활발히 거래되지만, 본 함수는 보수적으로
 * **만기 25일 전부터 다음 달 만기물로 롤오버**한다. 이렇게 하면:
 *   - 매월 25일 이후는 다음 달 분으로 자동 전환 (front month 갱신)
 *   - "만기 직전 1~2일" 같은 예외 상황도 포함
 *
 * 분기 만기물은 cadence="quarterly"로 H/M/U/Z만 선택.
 */
export function nearestFutureContract(
  srsBase: string,
  cadence: "monthly" | "quarterly" = "monthly",
  today: Date = new Date(),
): string {
  const ROLL_DAYS = 25;

  // 작업용 날짜: today + ROLL_DAYS (이 시점이 속한 달이 "유효한 front month")
  const work = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  work.setUTCDate(work.getUTCDate() + ROLL_DAYS);

  let year = work.getUTCFullYear();
  let monthIdx = work.getUTCMonth(); // 0~11

  if (cadence === "quarterly") {
    // H=2(3월), M=5(6월), U=8(9월), Z=11(12월)
    const QUARTERLY = [2, 5, 8, 11];
    while (!QUARTERLY.includes(monthIdx)) {
      monthIdx += 1;
      if (monthIdx > 11) {
        monthIdx = 0;
        year += 1;
      }
    }
  }

  const monthCode = FUTURES_MONTH_CODES[monthIdx];
  const yy = String(year % 100).padStart(2, "0");
  return `${srsBase}${monthCode}${yy}`;
}

/**
 * 입력을 정규화 후 alias 테이블에서 조회.
 *
 * - trim
 * - 영문은 uppercase로 (한글은 그대로)
 * - 공백·하이픈·언더스코어는 제거 ("S&P 500" / "S&P-500" / "S&P_500" 모두 동일 키)
 *
 * 반환 null은 alias 매칭 실패. 이 경우 호출 측이 raw 코드 처리 또는 master fallback 시도.
 */
export function resolveAlias(input: string): MarketAlias | null {
  if (!input) return null;
  const normalized = normalizeAliasKey(input);
  if (!normalized) return null;
  const direct = ALIAS_TABLE[normalized];
  if (direct) return direct;
  return null;
}

export function normalizeAliasKey(input: string): string {
  return input
    .trim()
    .replace(/[\s_\-]+/g, "")
    .replace(/[a-z]/g, (m) => m.toUpperCase());
}

/** 디버깅/테스트/문서화용 — 등록된 모든 alias 키 목록. */
export function listAliases(): readonly string[] {
  return Object.keys(ALIAS_TABLE);
}

/** 카테고리별로 그룹핑한 alias 리스트 (TOOLS.md 자동 생성용). */
export function aliasesByCategory(): Record<MarketCategory, Array<{ alias: string; displayName: string }>> {
  const result: Record<MarketCategory, Array<{ alias: string; displayName: string }>> = {
    "index-domestic": [],
    "index-overseas": [],
    fx: [],
    "commodity-spot": [],
    "commodity-futures": [],
  };
  for (const [alias, info] of Object.entries(ALIAS_TABLE)) {
    result[info.category].push({ alias, displayName: info.displayName });
  }
  return result;
}
