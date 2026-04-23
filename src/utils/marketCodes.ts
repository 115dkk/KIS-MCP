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

/**
 * Alias 테이블. 키는 정규화된(uppercase, trim) 형태로 사전 매핑.
 * 한국어 alias도 그대로 받기 위해 정규화 시 case는 변환하되 한글은 보존.
 */
const ALIAS_TABLE: Record<string, MarketAlias> = {
  // ─── 국내 지수 (FHPUP02100000 + MRKT=U) ───
  // 출처: 한투 엑셀 "국내업종 현재지수" 시트의 FID_INPUT_ISCD 명세
  KOSPI: { category: "index-domestic", mrkt: "U", iscd: "0001", displayName: "코스피" },
  코스피: { category: "index-domestic", mrkt: "U", iscd: "0001", displayName: "코스피" },
  KS11: { category: "index-domestic", mrkt: "U", iscd: "0001", displayName: "코스피" },

  KOSDAQ: { category: "index-domestic", mrkt: "U", iscd: "1001", displayName: "코스닥" },
  코스닥: { category: "index-domestic", mrkt: "U", iscd: "1001", displayName: "코스닥" },
  KQ11: { category: "index-domestic", mrkt: "U", iscd: "1001", displayName: "코스닥" },

  KOSPI200: { category: "index-domestic", mrkt: "U", iscd: "2001", displayName: "코스피200" },
  코스피200: { category: "index-domestic", mrkt: "U", iscd: "2001", displayName: "코스피200" },
  KS200: { category: "index-domestic", mrkt: "U", iscd: "2001", displayName: "코스피200" },

  KSQ150: { category: "index-domestic", mrkt: "U", iscd: "3003", displayName: "KOSDAQ150" },
  KOSDAQ150: { category: "index-domestic", mrkt: "U", iscd: "3003", displayName: "KOSDAQ150" },

  // ─── 해외 지수 (FHKST03030100 + MRKT=N) ───
  // ISCD는 한투 GitHub 마스터파일(해외 지수) 기준. 코드 변경 시 master fallback이 작동.
  SPX: { category: "index-overseas", mrkt: "N", iscd: "SPX", displayName: "S&P 500" },
  "S&P500": { category: "index-overseas", mrkt: "N", iscd: "SPX", displayName: "S&P 500" },
  SP500: { category: "index-overseas", mrkt: "N", iscd: "SPX", displayName: "S&P 500" },

  COMP: { category: "index-overseas", mrkt: "N", iscd: "COMP", displayName: "NASDAQ Composite" },
  NASDAQ: { category: "index-overseas", mrkt: "N", iscd: "COMP", displayName: "NASDAQ Composite" },
  IXIC: { category: "index-overseas", mrkt: "N", iscd: "COMP", displayName: "NASDAQ Composite" },
  나스닥: { category: "index-overseas", mrkt: "N", iscd: "COMP", displayName: "NASDAQ Composite" },

  NDX: { category: "index-overseas", mrkt: "N", iscd: "NDX", displayName: "NASDAQ-100" },
  "NASDAQ-100": { category: "index-overseas", mrkt: "N", iscd: "NDX", displayName: "NASDAQ-100" },
  NASDAQ100: { category: "index-overseas", mrkt: "N", iscd: "NDX", displayName: "NASDAQ-100" },

  DJI: { category: "index-overseas", mrkt: "N", iscd: ".DJI", displayName: "Dow Jones Industrial" },
  DOW: { category: "index-overseas", mrkt: "N", iscd: ".DJI", displayName: "Dow Jones Industrial" },
  DJIA: { category: "index-overseas", mrkt: "N", iscd: ".DJI", displayName: "Dow Jones Industrial" },
  다우: { category: "index-overseas", mrkt: "N", iscd: ".DJI", displayName: "Dow Jones Industrial" },

  // ─── 환율 (FHKST03030100 + MRKT=X) ───
  // 한투 ISCD는 마스터파일에 따라 변동. 1차 추정값 사용 후 실패 시 master fallback.
  USDKRW: { category: "fx", mrkt: "X", iscd: "FX@KRW", displayName: "USD/KRW", unit: "원" },
  원달러: { category: "fx", mrkt: "X", iscd: "FX@KRW", displayName: "USD/KRW", unit: "원" },
  달러: { category: "fx", mrkt: "X", iscd: "FX@KRW", displayName: "USD/KRW", unit: "원" },
  USDKRW_X: { category: "fx", mrkt: "X", iscd: "FX@KRW", displayName: "USD/KRW", unit: "원" },

  EURKRW: { category: "fx", mrkt: "X", iscd: "FX@EUR", displayName: "EUR/KRW", unit: "원" },
  유로: { category: "fx", mrkt: "X", iscd: "FX@EUR", displayName: "EUR/KRW", unit: "원" },
  JPYKRW: { category: "fx", mrkt: "X", iscd: "FX@JPY", displayName: "JPY/KRW (100엔)", unit: "원" },
  엔화: { category: "fx", mrkt: "X", iscd: "FX@JPY", displayName: "JPY/KRW (100엔)", unit: "원" },
  CNYKRW: { category: "fx", mrkt: "X", iscd: "FX@CNY", displayName: "CNY/KRW", unit: "원" },
  위안: { category: "fx", mrkt: "X", iscd: "FX@CNY", displayName: "CNY/KRW", unit: "원" },

  // ─── 원자재 (해외선물 — HHDFC55010000) ───
  // CL = NYMEX WTI Crude Oil (월간 만기). LCO = ICE Brent Crude Oil (월간 만기).
  WTI: {
    category: "commodity-futures",
    srsBase: "CL",
    contractCadence: "monthly",
    displayName: "WTI 원유 (NYMEX / 한투 CME 분류)",
    unit: "USD/barrel",
    priceDecimals: 2,
  },
  WTI원유: {
    category: "commodity-futures",
    srsBase: "CL",
    contractCadence: "monthly",
    displayName: "WTI 원유 (NYMEX / 한투 CME 분류)",
    unit: "USD/barrel",
    priceDecimals: 2,
  },
  CL: {
    category: "commodity-futures",
    srsBase: "CL",
    contractCadence: "monthly",
    displayName: "WTI 원유 (NYMEX / 한투 CME 분류)",
    unit: "USD/barrel",
    priceDecimals: 2,
  },
  // Brent: 한투 ffcode.mst 마스터에는 base="BZ"로 등록되어 있으나, 실제 API
  // (HHDFC55010000)는 SRS_CD에 "BRN" prefix를 받는다 (한투 공식 spec 예시 BRNF25).
  // 마스터 ↔ API의 알려진 코드 불일치 케이스.
  BRENT: {
    category: "commodity-futures",
    srsBase: "BRN",
    contractCadence: "monthly",
    displayName: "Brent 원유 (ICE)",
    unit: "USD/barrel",
    priceDecimals: 2,
  },
  브렌트유: {
    category: "commodity-futures",
    srsBase: "BRN",
    contractCadence: "monthly",
    displayName: "Brent 원유 (ICE)",
    unit: "USD/barrel",
    priceDecimals: 2,
  },
  브렌트: {
    category: "commodity-futures",
    srsBase: "BRN",
    contractCadence: "monthly",
    displayName: "Brent 원유 (ICE)",
    unit: "USD/barrel",
    priceDecimals: 2,
  },
  BRN: {
    category: "commodity-futures",
    srsBase: "BRN",
    contractCadence: "monthly",
    displayName: "Brent 원유 (ICE)",
    unit: "USD/barrel",
    priceDecimals: 2,
  },

  // ─── 금 (선물 우회 — overseas chart MRKT=S) ───
  // GC = COMEX Gold Futures. 분기 만기(H/M/U/Z)이지만 매월 거래 가능.
  GOLD: {
    category: "commodity-futures",
    srsBase: "GC",
    contractCadence: "monthly",
    displayName: "COMEX 금 선물 (100oz, 한투 CME 분류)",
    unit: "USD/oz",
    priceDecimals: 1,
    notes: "한투는 KRX 금현물 시세를 직접 제공하지 않음. COMEX 금선물(GC)로 우회.",
  },
  금: {
    category: "commodity-futures",
    srsBase: "GC",
    contractCadence: "monthly",
    displayName: "COMEX 금 선물 (100oz, 한투 CME 분류)",
    unit: "USD/oz",
    priceDecimals: 1,
    notes: "한투는 KRX 금현물 시세를 직접 제공하지 않음. COMEX 금선물(GC)로 우회.",
  },
  GC: {
    category: "commodity-futures",
    srsBase: "GC",
    contractCadence: "monthly",
    displayName: "COMEX 금 선물 (100oz)",
    unit: "USD/oz",
    priceDecimals: 1,
  },
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
