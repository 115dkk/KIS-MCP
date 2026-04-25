import { describe, expect, it } from "vitest";
import {
  FUTURES_MONTH_CODES,
  aliasesByCategory,
  listAliases,
  nearestFutureContract,
  normalizeAliasKey,
  resolveAlias,
} from "../src/utils/marketCodes.js";

describe("resolveAlias — 국내 지수", () => {
  it("KOSPI / 코스피 / KS11 모두 같은 코드로 매핑", () => {
    const a1 = resolveAlias("KOSPI");
    const a2 = resolveAlias("코스피");
    const a3 = resolveAlias("KS11");
    expect(a1?.iscd).toBe("0001");
    expect(a2?.iscd).toBe("0001");
    expect(a3?.iscd).toBe("0001");
    expect(a1?.mrkt).toBe("U");
    expect(a1?.category).toBe("index-domestic");
  });

  it("코스닥 → 1001, 코스피200 → 2001", () => {
    expect(resolveAlias("KOSDAQ")?.iscd).toBe("1001");
    expect(resolveAlias("코스닥")?.iscd).toBe("1001");
    expect(resolveAlias("KOSPI200")?.iscd).toBe("2001");
    expect(resolveAlias("코스피200")?.iscd).toBe("2001");
    expect(resolveAlias("KS200")?.iscd).toBe("2001");
  });

  it("KOSDAQ150 / KSQ150 → 3003", () => {
    expect(resolveAlias("KSQ150")?.iscd).toBe("3003");
    expect(resolveAlias("KOSDAQ150")?.iscd).toBe("3003");
  });
});

describe("resolveAlias — 해외 지수", () => {
  it("S&P 500 변형 모두 SPX", () => {
    expect(resolveAlias("SPX")?.iscd).toBe("SPX");
    expect(resolveAlias("S&P500")?.iscd).toBe("SPX");
    expect(resolveAlias("SP500")?.iscd).toBe("SPX");
    // 공백/하이픈/언더스코어 무시
    expect(resolveAlias("S&P 500")?.iscd).toBe("SPX");
    expect(resolveAlias("S&P-500")?.iscd).toBe("SPX");
    expect(resolveAlias("sp500")?.iscd).toBe("SPX");
  });

  it("NASDAQ Composite vs NASDAQ-100 구분", () => {
    expect(resolveAlias("NASDAQ")?.iscd).toBe("COMP");
    expect(resolveAlias("나스닥")?.iscd).toBe("COMP");
    expect(resolveAlias("NDX")?.iscd).toBe("NDX");
    expect(resolveAlias("NASDAQ100")?.iscd).toBe("NDX");
    expect(resolveAlias("NASDAQ-100")?.iscd).toBe("NDX");
  });

  it("Dow / DJI / DJIA / 다우 모두 .DJI (한투 frgn_code.mst 기준)", () => {
    expect(resolveAlias("DJI")?.iscd).toBe(".DJI");
    expect(resolveAlias("DOW")?.iscd).toBe(".DJI");
    expect(resolveAlias("DJIA")?.iscd).toBe(".DJI");
    expect(resolveAlias("다우")?.iscd).toBe(".DJI");
  });
});

describe("resolveAlias — 환율", () => {
  it("USDKRW / 원달러 / 달러 모두 동일", () => {
    const a = resolveAlias("USDKRW");
    expect(a?.category).toBe("fx");
    expect(a?.mrkt).toBe("X");
    expect(resolveAlias("원달러")?.iscd).toBe("FX@KRW");
    expect(resolveAlias("달러")?.iscd).toBe("FX@KRW");
  });

  it("EUR/JPY/CNY 환율도 매핑", () => {
    expect(resolveAlias("EURKRW")?.iscd).toBe("FX@EUR");
    expect(resolveAlias("JPYKRW")?.iscd).toBe("FX@JPY");
    expect(resolveAlias("CNYKRW")?.iscd).toBe("FX@CNY");
    expect(resolveAlias("엔화")?.iscd).toBe("FX@JPY");
    expect(resolveAlias("위안")?.iscd).toBe("FX@CNY");
  });
});

describe("resolveAlias — 원자재", () => {
  it("WTI 계열 모두 srsBase=CL, 카테고리 commodity-futures", () => {
    const a = resolveAlias("WTI");
    expect(a?.category).toBe("commodity-futures");
    expect(a?.srsBase).toBe("CL");
    expect(a?.contractCadence).toBe("monthly");
    expect(resolveAlias("WTI원유")?.srsBase).toBe("CL");
    expect(resolveAlias("CL")?.srsBase).toBe("CL");
  });

  it("Brent 계열 srsBase=BRN (한투 API 호출용; 마스터 BZ와 다름)", () => {
    expect(resolveAlias("BRENT")?.srsBase).toBe("BRN");
    expect(resolveAlias("브렌트유")?.srsBase).toBe("BRN");
    expect(resolveAlias("브렌트")?.srsBase).toBe("BRN");
    expect(resolveAlias("BRN")?.srsBase).toBe("BRN");
  });

  it("GOLD는 commodity-futures (COMEX GC 100oz)", () => {
    const a = resolveAlias("GOLD");
    expect(a?.category).toBe("commodity-futures");
    expect(a?.srsBase).toBe("GC");
    expect(a?.priceDecimals).toBe(1);
    expect(resolveAlias("금")?.srsBase).toBe("GC");
  });

  it("WTI/Brent priceDecimals=2 (sCalcDesz)", () => {
    expect(resolveAlias("WTI")?.priceDecimals).toBe(2);
    expect(resolveAlias("BRENT")?.priceDecimals).toBe(2);
  });
});

describe("resolveAlias — M3 신규 환율 (GBP/AUD/CAD)", () => {
  it("GBPKRW / 파운드 / 영파운드 모두 동일 alias 객체 참조", () => {
    const a1 = resolveAlias("GBPKRW");
    const a2 = resolveAlias("파운드");
    const a3 = resolveAlias("영파운드");
    expect(a1?.iscd).toBe("FX@GBP");
    expect(a1?.category).toBe("fx");
    // M0-4 참조 공유 검증
    expect(a1).toBe(a2);
    expect(a1).toBe(a3);
  });
  it("AUDKRW / 호주달러", () => {
    expect(resolveAlias("AUDKRW")?.iscd).toBe("FX@AUD");
    expect(resolveAlias("호주달러")?.iscd).toBe("FX@AUD");
  });
  it("CADKRW / 캐나다달러", () => {
    expect(resolveAlias("CADKRW")?.iscd).toBe("FX@CAD");
    expect(resolveAlias("캐나다달러")?.iscd).toBe("FX@CAD");
  });
});

describe("resolveAlias — M3 신규 원자재", () => {
  it("SILVER / 은 / SI", () => {
    const a = resolveAlias("SILVER");
    expect(a?.srsBase).toBe("SI");
    expect(a?.contractCadence).toBe("monthly");
    expect(resolveAlias("은")).toBe(a);
    expect(resolveAlias("SI")).toBe(a);
  });
  it("COPPER / 구리 / HG", () => {
    expect(resolveAlias("COPPER")?.srsBase).toBe("HG");
    expect(resolveAlias("구리")?.srsBase).toBe("HG");
  });
  it("NATGAS / 천연가스 / NG", () => {
    expect(resolveAlias("NATGAS")?.srsBase).toBe("NG");
    expect(resolveAlias("천연가스")?.srsBase).toBe("NG");
  });
  it("PALLADIUM / 팔라듐 — 분기 만기", () => {
    const a = resolveAlias("팔라듐");
    expect(a?.srsBase).toBe("PA");
    expect(a?.contractCadence).toBe("quarterly");
  });
  it("PLATINUM / 백금 — 분기 만기", () => {
    const a = resolveAlias("백금");
    expect(a?.srsBase).toBe("PL");
    expect(a?.contractCadence).toBe("quarterly");
  });
});

describe("M0-4: 참조 공유 (resolveAlias 동일성)", () => {
  it("KOSPI === 코스피 === KS11 (객체 동일성)", () => {
    expect(resolveAlias("KOSPI")).toBe(resolveAlias("코스피"));
    expect(resolveAlias("KOSPI")).toBe(resolveAlias("KS11"));
  });
  it("WTI === WTI원유 === CL", () => {
    expect(resolveAlias("WTI")).toBe(resolveAlias("WTI원유"));
    expect(resolveAlias("WTI")).toBe(resolveAlias("CL"));
  });
  it("USDKRW === 원달러 === 달러", () => {
    expect(resolveAlias("USDKRW")).toBe(resolveAlias("원달러"));
    expect(resolveAlias("USDKRW")).toBe(resolveAlias("달러"));
  });
});

describe("resolveAlias — 매칭 실패", () => {
  it("미등록 alias는 null", () => {
    expect(resolveAlias("UNKNOWN")).toBeNull();
    expect(resolveAlias("XYZ123")).toBeNull();
    expect(resolveAlias("")).toBeNull();
  });
});

describe("normalizeAliasKey", () => {
  it("trim + 공백/하이픈/언더스코어 제거 + 영문 대문자화", () => {
    expect(normalizeAliasKey("  s&p 500 ")).toBe("S&P500");
    expect(normalizeAliasKey("kospi-200")).toBe("KOSPI200");
    expect(normalizeAliasKey("usd_krw")).toBe("USDKRW");
    expect(normalizeAliasKey("코스피")).toBe("코스피"); // 한글 보존
  });
});

describe("nearestFutureContract (ROLL_DAYS=25)", () => {
  it("월간 만기: today=2026-04-21 + 25일 = 5월 16일 → CLK26 (5월물)", () => {
    const code = nearestFutureContract("CL", "monthly", new Date(Date.UTC(2026, 3, 21)));
    expect(code).toBe("CLK26");
  });

  it("월간 만기: today=2026-04-01 + 25일 = 4월 26일 → CLJ26 (4월물)", () => {
    // 4월 1일 + 25일 = 4월 26일 (여전히 4월) → CLJ26
    const code = nearestFutureContract("CL", "monthly", new Date(Date.UTC(2026, 3, 1)));
    expect(code).toBe("CLJ26");
  });

  it("연도 넘김: today=2026-12-10 + 25일 → 2027-01-04 → CLF27", () => {
    const code = nearestFutureContract("CL", "monthly", new Date(Date.UTC(2026, 11, 10)));
    expect(code).toBe("CLF27");
  });

  it("분기 만기: today=2026-04-21 → 다음 분기물 M(6월)", () => {
    const code = nearestFutureContract("GC", "quarterly", new Date(Date.UTC(2026, 3, 21)));
    expect(code).toBe("GCM26");
  });

  it("분기 만기: today=2026-06-10 + 25일 = 7월 5일 → 9월물 U", () => {
    const code = nearestFutureContract("GC", "quarterly", new Date(Date.UTC(2026, 5, 10)));
    expect(code).toBe("GCU26");
  });

  it("Brent: today=2026-04-21 → BRNK26 (한투 API base BRN)", () => {
    const code = nearestFutureContract("BRN", "monthly", new Date(Date.UTC(2026, 3, 21)));
    expect(code).toBe("BRNK26");
  });

  it("월코드 매핑이 F~Z 12개 모두 정상", () => {
    expect(FUTURES_MONTH_CODES.length).toBe(12);
    expect(FUTURES_MONTH_CODES[0]).toBe("F"); // 1월
    expect(FUTURES_MONTH_CODES[11]).toBe("Z"); // 12월
  });
});

describe("listAliases / aliasesByCategory", () => {
  it("등록된 alias 목록을 반환", () => {
    const list = listAliases();
    expect(list).toContain("KOSPI");
    expect(list).toContain("WTI");
    expect(list).toContain("USDKRW");
    expect(list.length).toBeGreaterThan(20);
  });

  it("카테고리별 그룹핑 성공", () => {
    const groups = aliasesByCategory();
    expect(groups["index-domestic"].length).toBeGreaterThanOrEqual(8);
    expect(groups["index-overseas"].length).toBeGreaterThanOrEqual(8);
    expect(groups["fx"].length).toBeGreaterThanOrEqual(6);
    expect(groups["commodity-futures"].length).toBeGreaterThanOrEqual(8);
    // commodity-spot은 raw fallback 전용으로 alias 테이블에는 등록 없음 (현재 0)
    expect(groups["commodity-spot"].length).toBeGreaterThanOrEqual(0);
  });
});
