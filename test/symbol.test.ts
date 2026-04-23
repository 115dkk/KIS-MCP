import { describe, expect, it } from "vitest";
import { isValidSymbol, normalizeSymbol, SYMBOL_REGEX } from "../src/utils/symbol.js";

describe("normalizeSymbol", () => {
  it("일반 6자리 숫자 종목코드를 통과", () => {
    expect(normalizeSymbol("005930")).toBe("005930");
    expect(normalizeSymbol("069500")).toBe("069500");
  });

  it("ETN의 Q+6digits 형태 통과", () => {
    expect(normalizeSymbol("Q500001")).toBe("Q500001");
    expect(normalizeSymbol("Q580001")).toBe("Q580001");
  });

  it("소문자 q를 자동으로 대문자로 변환", () => {
    expect(normalizeSymbol("q500001")).toBe("Q500001");
  });

  it("공백을 trim 처리", () => {
    expect(normalizeSymbol("  005930  ")).toBe("005930");
  });

  it("특수문자/너무 긴/너무 짧은 입력 거부", () => {
    expect(() => normalizeSymbol("")).toThrow();
    expect(() => normalizeSymbol("ABC-123")).toThrow();
    expect(() => normalizeSymbol("1234567890123")).toThrow(); // 13자
    expect(() => normalizeSymbol(null)).toThrow();
    expect(() => normalizeSymbol(undefined)).toThrow();
  });
});

describe("isValidSymbol", () => {
  it("정상 종목코드는 true", () => {
    expect(isValidSymbol("005930")).toBe(true);
    expect(isValidSymbol("Q500001")).toBe(true);
  });
  it("비정상은 false (예외 안 던짐)", () => {
    expect(isValidSymbol("")).toBe(false);
    expect(isValidSymbol(null)).toBe(false);
    expect(isValidSymbol("ABC-123")).toBe(false);
  });
});

describe("SYMBOL_REGEX", () => {
  it("정확히 1~12자 영숫자만 허용", () => {
    expect(SYMBOL_REGEX.test("A")).toBe(true);
    expect(SYMBOL_REGEX.test("ABCDEFGHIJKL")).toBe(true); // 12자
    expect(SYMBOL_REGEX.test("ABCDEFGHIJKLM")).toBe(false); // 13자
    expect(SYMBOL_REGEX.test("a")).toBe(false); // 소문자 (정규화 전)
  });
});
