import { describe, expect, it } from "vitest";
import {
  getBondTdfKeywords,
  getOverseasKeywords,
  getOverseasWhitelist,
  isExcludedByKeyword,
} from "../src/utils/filters.js";
import { downsample } from "../src/utils/downsample.js";

describe("isExcludedByKeyword (advanced_search 기본 필터)", () => {
  it("인버스 ETF는 기본 제외된다", () => {
    expect(isExcludedByKeyword("KODEX 200선물인버스2X")).toBe(true);
  });
  it("레버리지 ETF는 기본 제외된다", () => {
    expect(isExcludedByKeyword("TIGER 2차전지소재Fn 레버리지")).toBe(true);
  });
  it("커버드콜 ETF는 기본 제외된다", () => {
    expect(isExcludedByKeyword("KODEX 미국S&P500커버드콜")).toBe(true);
  });
  it("혼합형은 기본 제외된다 (혼합/밸런스)", () => {
    // M0-8: '채권혼합' 키워드는 제거됨. excludeBonds=true에서 '채권'이 잡음.
    // '혼합'/'밸런스'는 기본 제외에 남아 있음 (주식/채권 혼합형 ETF).
    expect(isExcludedByKeyword("KODEX TRF3070 채권혼합")).toBe(true);
    expect(isExcludedByKeyword("ABC 밸런스형")).toBe(true);
  });
  it("일반 종목/ETF는 통과한다", () => {
    expect(isExcludedByKeyword("삼성전자")).toBe(false);
    expect(isExcludedByKeyword("KODEX 200")).toBe(false);
  });
});

describe("isExcludedByKeyword — excludeOverseas (M0-8 확장)", () => {
  it("기본 미국/나스닥/중국 키워드", () => {
    expect(isExcludedByKeyword("TIGER 미국나스닥100", { excludeOverseas: true })).toBe(true);
    expect(isExcludedByKeyword("KODEX 차이나H레버리지", { excludeOverseas: true })).toBe(true);
  });
  it("새 국가/지역 키워드 — 홍콩/대만/독일 등", () => {
    expect(isExcludedByKeyword("TIGER 홍콩H", { excludeOverseas: true })).toBe(true);
    expect(isExcludedByKeyword("KODEX 대만IT", { excludeOverseas: true })).toBe(true);
    expect(isExcludedByKeyword("ACE 독일DAX30", { excludeOverseas: true })).toBe(true);
    expect(isExcludedByKeyword("ARIRANG 영국FTSE100", { excludeOverseas: true })).toBe(true);
  });
  it("해외지수/거래소 — MSCI/FTSE/필라델피아", () => {
    expect(isExcludedByKeyword("TIGER 필라델피아반도체", { excludeOverseas: true })).toBe(true);
    expect(isExcludedByKeyword("KODEX MSCI EM", { excludeOverseas: true })).toBe(true);
    expect(isExcludedByKeyword("HANARO STOXX50", { excludeOverseas: true })).toBe(true);
  });
  it("해외기업명 — 테슬라/엔비디아/애플", () => {
    expect(isExcludedByKeyword("KODEX 테슬라1배", { excludeOverseas: true })).toBe(true);
    expect(isExcludedByKeyword("TIGER 엔비디아", { excludeOverseas: true })).toBe(true);
    expect(isExcludedByKeyword("ACE 애플액티브", { excludeOverseas: true })).toBe(true);
  });
  it("OVERSEAS_WHITELIST: KODEX MSCI Korea는 화이트리스트로 면제", () => {
    expect(isExcludedByKeyword("KODEX MSCI Korea", { excludeOverseas: true })).toBe(false);
    expect(isExcludedByKeyword("TIGER 한국MSCI", { excludeOverseas: true })).toBe(false);
  });
  it("excludeOverseas=false면 해외 키워드 무시", () => {
    expect(isExcludedByKeyword("TIGER 미국나스닥100")).toBe(false);
  });
  it("국내 일반 ETF는 면제 키워드 여부와 무관하게 통과", () => {
    expect(isExcludedByKeyword("KODEX 200", { excludeOverseas: true })).toBe(false);
  });
});

describe("isExcludedByKeyword — excludeBonds (M0-8 신설)", () => {
  it("회사채/국고채/채권형 ETF 제외", () => {
    expect(isExcludedByKeyword("HK 26-12 회사채(AA-이상)액티브", { excludeBonds: true })).toBe(true);
    expect(isExcludedByKeyword("KODEX 국고채30년", { excludeBonds: true })).toBe(true);
    expect(isExcludedByKeyword("TIGER 단기채권액티브", { excludeBonds: true })).toBe(true);
  });
  it("TDF/머니마켓 제외", () => {
    expect(isExcludedByKeyword("ACE TDF2030액티브", { excludeBonds: true })).toBe(true);
    expect(isExcludedByKeyword("TIGER 머니마켓액티브", { excludeBonds: true })).toBe(true);
    expect(isExcludedByKeyword("KODEX MMF", { excludeBonds: true })).toBe(true);
  });
  it("CD금리/하이일드도 제외", () => {
    expect(isExcludedByKeyword("KODEX CD금리액티브", { excludeBonds: true })).toBe(true);
    expect(isExcludedByKeyword("ACE 하이일드채권", { excludeBonds: true })).toBe(true);
  });
  it("excludeBonds=false면 채권/TDF가 통과", () => {
    expect(isExcludedByKeyword("KODEX 국고채30년")).toBe(false);
  });
});

describe("키워드 표 노출 (디버깅·문서화용)", () => {
  it("getOverseasKeywords / getOverseasWhitelist / getBondTdfKeywords가 비어있지 않음", () => {
    expect(getOverseasKeywords().length).toBeGreaterThan(20);
    expect(getOverseasWhitelist()).toContain("Korea");
    expect(getBondTdfKeywords().length).toBeGreaterThan(10);
  });
});

describe("downsample", () => {
  it("maxPoints 이하는 그대로 반환", () => {
    expect(downsample([1, 2, 3], 5)).toEqual([1, 2, 3]);
  });
  it("초과 시 균등 다운샘플", () => {
    const data = Array.from({ length: 1000 }, (_, i) => i);
    const out = downsample(data, 100);
    expect(out.length).toBe(100);
    expect(out[0]).toBe(0);
    expect(out[out.length - 1]).toBe(999);
  });
});
