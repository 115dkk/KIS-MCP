import { describe, expect, it } from "vitest";
import { isExcludedByKeyword } from "../src/utils/filters.js";
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
  it("채권혼합/혼합형은 기본 제외된다", () => {
    expect(isExcludedByKeyword("KODEX TRF3070 채권혼합")).toBe(true);
  });
  it("일반 종목/ETF는 통과한다", () => {
    expect(isExcludedByKeyword("삼성전자")).toBe(false);
    expect(isExcludedByKeyword("KODEX 200")).toBe(false);
  });
  it("excludeOverseas=true 일 때 해외 추종 ETF가 제외된다", () => {
    expect(isExcludedByKeyword("TIGER 미국나스닥100", { excludeOverseas: true })).toBe(true);
    expect(isExcludedByKeyword("KODEX 200", { excludeOverseas: true })).toBe(false);
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
