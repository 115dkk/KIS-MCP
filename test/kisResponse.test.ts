/**
 * ROADMAP M0-1/M0-9 회귀 테스트.
 *
 * extractArray의 빈 배열 건너뛰기 정책이 정확한지 검증한다 — KIS가
 * `output: []`, `output2: [실제 데이터]` 형태로 응답할 때 실제 데이터에
 * 도달해야 한다 (M0-9 ETF 구성종목 빈 응답 버그의 근본 원인).
 */

import { describe, expect, it } from "vitest";
import {
  extractArray,
  extractArrayPreferred,
  extractArrayWithObjectFallback,
  extractObject,
  extractObjectPreferred,
} from "../src/utils/kisResponse.js";

const env = (data: Record<string, unknown>) => ({
  rt_cd: "0",
  msg_cd: "00000",
  msg1: "OK",
  ...data,
});

describe("extractArray", () => {
  it("output에 비어있지 않은 배열이 있으면 그것을 반환", () => {
    const res = env({ output: [{ a: 1 }, { a: 2 }] });
    expect(extractArray(res)).toEqual([{ a: 1 }, { a: 2 }]);
  });

  it("output1에 배열이 있으면 그것을 반환", () => {
    const res = env({ output1: [{ a: 1 }] });
    expect(extractArray(res)).toEqual([{ a: 1 }]);
  });

  it("output2에 배열이 있으면 그것을 반환", () => {
    const res = env({ output2: [{ a: 1 }] });
    expect(extractArray(res)).toEqual([{ a: 1 }]);
  });

  it("[M0-9] output: [], output2: [data] → output2의 데이터를 반환 (빈 배열 건너뛰기)", () => {
    const res = env({ output: [], output1: { meta: true }, output2: [{ data: 1 }] });
    expect(extractArray(res)).toEqual([{ data: 1 }]);
  });

  it("[M0-9] output: undefined, output2: [data] → output2", () => {
    const res = env({ output: undefined, output2: [{ data: 1 }] });
    expect(extractArray(res)).toEqual([{ data: 1 }]);
  });

  it("[M0-9] 모든 후보가 빈 배열이면 빈 배열 반환", () => {
    const res = env({ output: [], output1: {}, output2: [] });
    expect(extractArray(res)).toEqual([]);
  });

  it("undefined/null 응답에도 빈 배열 반환 (안전)", () => {
    expect(extractArray(undefined)).toEqual([]);
    expect(extractArray(null)).toEqual([]);
  });
});

describe("extractArrayPreferred", () => {
  it("우선순위에 따라 output2 → output → output1 순으로 검사", () => {
    const res = env({ output: [{ wrong: 1 }], output2: [{ right: 1 }] });
    expect(extractArrayPreferred(res, ["output2", "output", "output1"])).toEqual([{ right: 1 }]);
  });

  it("우선순위 첫 번째가 비어있으면 다음 후보로", () => {
    const res = env({ output2: [], output: [{ data: 1 }] });
    expect(extractArrayPreferred(res, ["output2", "output", "output1"])).toEqual([{ data: 1 }]);
  });
});

describe("extractObject", () => {
  it("output1이 객체면 그것을 반환", () => {
    const res = env({ output1: { foo: "bar" } });
    expect(extractObject<{ foo: string }>(res)).toEqual({ foo: "bar" });
  });

  it("output이 배열이면 다음 후보로 (output1 객체)", () => {
    const res = env({ output: [{ a: 1 }], output1: { meta: true } });
    expect(extractObject<{ meta: boolean }>(res)).toEqual({ meta: true });
  });

  it("아무것도 없으면 빈 객체", () => {
    expect(extractObject(env({}))).toEqual({});
    expect(extractObject(undefined)).toEqual({});
  });
});

describe("extractObjectPreferred", () => {
  it("우선순위 명시 시 그 순서로 검색", () => {
    const res = env({ output: { wrong: 1 }, output1: { right: 1 } });
    expect(extractObjectPreferred(res, ["output1", "output"])).toEqual({ right: 1 });
  });
});

describe("extractArrayWithObjectFallback", () => {
  it("배열이 있으면 배열 반환", () => {
    const res = env({ output: [{ a: 1 }] });
    expect(extractArrayWithObjectFallback(res)).toEqual([{ a: 1 }]);
  });

  it("배열이 없고 단일 객체만 있으면 [객체]로 감싸 반환", () => {
    const res = env({ output: { single: true } });
    expect(extractArrayWithObjectFallback<{ single: boolean }>(res)).toEqual([{ single: true }]);
  });

  it("아무것도 없으면 빈 배열", () => {
    expect(extractArrayWithObjectFallback(env({}))).toEqual([]);
  });
});
