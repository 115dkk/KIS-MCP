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

describe("isExcludedByKeyword — excludeBonds (M0-8 신설 + 실측 확장)", () => {
  it("회사채/국고채/채권형 ETF 제외", () => {
    expect(isExcludedByKeyword("HK 26-12 회사채(AA-이상)액티브", { excludeBonds: true })).toBe(true);
    expect(isExcludedByKeyword("KODEX 국고채30년", { excludeBonds: true })).toBe(true);
    expect(isExcludedByKeyword("TIGER 단기채권액티브", { excludeBonds: true })).toBe(true);
  });
  it("은행채/WGBI 같은 추가 채권 키워드 (실측 보강)", () => {
    expect(isExcludedByKeyword("RISE 단기특수은행채액티브", { excludeBonds: true })).toBe(true);
    expect(isExcludedByKeyword("ACE FTSE WGBI Korea", { excludeBonds: true })).toBe(true);
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
  it("REIT/부동산/인프라 제외 (주식 아닌 자산)", () => {
    expect(isExcludedByKeyword("TIGER 리츠부동산인프라TOP10액티브", { excludeBonds: true })).toBe(true);
    expect(isExcludedByKeyword("KODEX 리츠Plus", { excludeBonds: true })).toBe(true);
    expect(isExcludedByKeyword("ARIRANG REITs", { excludeBonds: true })).toBe(true);
  });
  it("원자재 ETF 제외 (국제금/원유/구리/팔라듐/백금/천연가스/Silver)", () => {
    expect(isExcludedByKeyword("SOL 국제금", { excludeBonds: true })).toBe(true);
    expect(isExcludedByKeyword("TIGER 원유선물Enhanced", { excludeBonds: true })).toBe(true);
    expect(isExcludedByKeyword("KODEX 구리실물", { excludeBonds: true })).toBe(true);
    expect(isExcludedByKeyword("KODEX 팔라듐선물", { excludeBonds: true })).toBe(true);
    expect(isExcludedByKeyword("KODEX 천연가스선물", { excludeBonds: true })).toBe(true);
    expect(isExcludedByKeyword("ABC Silver Trust", { excludeBonds: true })).toBe(true);
  });
  it("excludeBonds=false면 채권/리츠/원자재가 통과", () => {
    expect(isExcludedByKeyword("KODEX 국고채30년")).toBe(false);
    expect(isExcludedByKeyword("KODEX 리츠Plus")).toBe(false);
    expect(isExcludedByKeyword("SOL 국제금")).toBe(false);
  });
});

describe("isExcludedByKeyword — excludeOverseas 실측 확장", () => {
  it("브로드컴/샤오미/BYD/팔란티어 등 추가 해외기업명 잡음", () => {
    expect(isExcludedByKeyword("KoAct 브로드컴밸류체인액티브", { excludeOverseas: true })).toBe(true);
    expect(isExcludedByKeyword("KoAct Broadcom Value", { excludeOverseas: true })).toBe(true);
    expect(isExcludedByKeyword("1Q 샤오미밸류체인액티브", { excludeOverseas: true })).toBe(true);
    expect(isExcludedByKeyword("ACE BYD밸류체인액티브", { excludeOverseas: true })).toBe(true);
    expect(isExcludedByKeyword("ABC 비야디", { excludeOverseas: true })).toBe(true);
    expect(isExcludedByKeyword("RISE 팔란티어고정테크100", { excludeOverseas: true })).toBe(true);
    expect(isExcludedByKeyword("XYZ Palantir Tech", { excludeOverseas: true })).toBe(true);
  });
  it("World/월드/Total World 글로벌 분산 ETF 잡음", () => {
    expect(isExcludedByKeyword("TIGER 토탈월드스탁액티브", { excludeOverseas: true })).toBe(true);
    expect(isExcludedByKeyword("KODEX MSCI World", { excludeOverseas: true })).toBe(true);
  });
});

describe("isExcludedByKeyword — HARD vs SOFT OVERSEAS 분리 (Korea 화이트리스트 한계)", () => {
  it("[CORE] HARD 키워드는 Korea 화이트리스트로도 면제 안 됨 — 한국+해외 혼합 ETF 제외", () => {
    // "한국+미국 혼합" 같이 한국 키워드가 있어도 명백한 해외 자산이 매칭되면 제외
    expect(isExcludedByKeyword("KIWOOM 한국고배당&미국AI테크", { excludeOverseas: true })).toBe(true);
    expect(isExcludedByKeyword("ABC 한국+일본 분산", { excludeOverseas: true })).toBe(true);
    expect(isExcludedByKeyword("XYZ 코리아 테슬라 듀얼", { excludeOverseas: true })).toBe(true);
  });

  it("[CORE] SOFT 키워드 + Korea 화이트리스트 → 면제 (지수 제공자만 매칭)", () => {
    // KODEX MSCI Korea: 지수 제공자(MSCI)는 한국 추종 ETF에도 흔히 사용 → 통과
    expect(isExcludedByKeyword("KODEX MSCI Korea", { excludeOverseas: true })).toBe(false);
    expect(isExcludedByKeyword("TIGER FTSE 한국TOP30", { excludeOverseas: true })).toBe(false);
  });

  it("SOFT 키워드만 있고 화이트리스트 없으면 제외", () => {
    expect(isExcludedByKeyword("TIGER MSCI Emerging", { excludeOverseas: true })).toBe(true);
    expect(isExcludedByKeyword("ABC FTSE EM Index", { excludeOverseas: true })).toBe(true);
    expect(isExcludedByKeyword("XYZ STOXX 600", { excludeOverseas: true })).toBe(true);
  });

  it("ACE FTSE WGBI Korea: SOFT(FTSE)+Korea로 OVERSEAS 면제, 단 WGBI는 BOND에서 잡힘", () => {
    expect(isExcludedByKeyword("ACE FTSE WGBI Korea", { excludeOverseas: true })).toBe(false); // SOFT만이라 면제
    expect(isExcludedByKeyword("ACE FTSE WGBI Korea", { excludeOverseas: true, excludeBonds: true })).toBe(true); // BOND에서 잡힘
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
