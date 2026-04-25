/**
 * ROADMAP M8-3 회귀 테스트.
 *
 * aggregateMinutes(1분봉 → N분봉 집계):
 *   - 단일 봉 → 그대로 반환
 *   - intervalMinutes 경계 (4개 1분봉 → 2개 3분봉)
 *   - 날짜 변경 시 버킷 강제 리셋
 *   - 빈 입력 → 빈 배열
 */

import { describe, expect, it } from "vitest";
import { aggregateMinutes, type ChartPoint } from "../src/tools/chart.js";

const point = (date: string, o: number, h: number, l: number, c: number, v: number): ChartPoint => ({
  date,
  open: o,
  high: h,
  low: l,
  close: c,
  volume: v,
});

describe("aggregateMinutes", () => {
  it("interval=1 이면 그대로 반환 (변환 없음)", () => {
    const input = [point("2026-04-21 09:00:00", 100, 105, 99, 102, 1000)];
    expect(aggregateMinutes(input, 1)).toEqual(input);
  });

  it("빈 입력 → 빈 배열", () => {
    expect(aggregateMinutes([], 5)).toEqual([]);
  });

  it("단일 1분봉을 5분봉으로 집계 → 그대로", () => {
    const input = [point("2026-04-21 09:00:00", 100, 105, 99, 102, 1000)];
    const out = aggregateMinutes(input, 5);
    expect(out.length).toBe(1);
    expect(out[0]).toMatchObject({ open: 100, high: 105, low: 99, close: 102, volume: 1000 });
  });

  it("4개 1분봉을 3분봉으로 집계 → 2개 봉 (3분 + 1분)", () => {
    const input = [
      point("2026-04-21 09:00:00", 100, 110, 99, 105, 1000),
      point("2026-04-21 09:01:00", 105, 115, 100, 108, 2000),
      point("2026-04-21 09:02:00", 108, 120, 105, 112, 3000),
      point("2026-04-21 09:03:00", 112, 130, 110, 125, 4000), // 새 버킷 시작
    ];
    const out = aggregateMinutes(input, 3);
    expect(out.length).toBe(2);
    // 첫 버킷: 09:00, 09:01, 09:02
    expect(out[0]).toMatchObject({
      date: "2026-04-21 09:00:00",
      open: 100,
      high: 120, // 110, 115, 120 중 max
      low: 99, // 99, 100, 105 중 min
      close: 112, // 마지막 봉의 close
      volume: 6000, // 1000+2000+3000
    });
    // 두 번째 버킷: 09:03만
    expect(out[1]).toMatchObject({
      date: "2026-04-21 09:03:00",
      open: 112,
      high: 130,
      low: 110,
      close: 125,
      volume: 4000,
    });
  });

  it("날짜 변경 시 버킷 강제 리셋 (장 마감~다음날 시작 사이 끊김)", () => {
    const input = [
      point("2026-04-21 15:29:00", 200, 201, 199, 200, 500),
      point("2026-04-21 15:30:00", 200, 202, 199, 201, 600),
      // 다음 날 — 같은 5분 bin이지만 날짜가 다르므로 새 버킷
      point("2026-04-22 09:00:00", 210, 212, 209, 211, 700),
    ];
    const out = aggregateMinutes(input, 5);
    // 첫 버킷: 21일 15:25~15:29 bin (15:29, 15:30 — 다른 bin이지만 같은 날?)
    // 15:29 → bin = floor((15*60+29)/5) = floor(929/5) = 185
    // 15:30 → bin = floor(930/5) = 186  → 다른 bin
    // 따라서 21일에 2개 버킷 + 22일에 1개 = 총 3개
    expect(out.length).toBe(3);
    expect(out[2].date).toBe("2026-04-22 09:00:00");
  });

  it("60분 집계 (시간봉)", () => {
    const input = [
      point("2026-04-21 09:00:00", 100, 105, 99, 102, 1000),
      point("2026-04-21 09:30:00", 102, 110, 100, 108, 2000),
      point("2026-04-21 09:59:00", 108, 115, 105, 112, 1500),
      point("2026-04-21 10:00:00", 112, 120, 110, 118, 1800), // 새 버킷
    ];
    const out = aggregateMinutes(input, 60);
    expect(out.length).toBe(2);
    expect(out[0]).toMatchObject({ open: 100, high: 115, low: 99, close: 112, volume: 4500 });
    expect(out[1]).toMatchObject({ open: 112 });
  });
});
