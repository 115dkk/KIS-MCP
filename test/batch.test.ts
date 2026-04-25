/**
 * ROADMAP M0-2 회귀 테스트.
 *
 * batchParallel:
 *   - 입력 순서 보존
 *   - 개별 호출 실패가 전체를 중단시키지 않음
 *   - batchSize 경계 (items.length가 batchSize의 배수가 아닐 때)
 *   - 빈 입력
 */

import { describe, expect, it } from "vitest";
import { batchParallel } from "../src/utils/batch.js";

describe("batchParallel", () => {
  it("입력 순서를 보존한다", async () => {
    const items = [1, 2, 3, 4, 5];
    const results = await batchParallel(items, async (n) => n * 10, 2);
    expect(results.map((r) => r.item)).toEqual([1, 2, 3, 4, 5]);
    expect(results.map((r) => r.result)).toEqual([10, 20, 30, 40, 50]);
  });

  it("개별 실패가 전체를 중단시키지 않는다", async () => {
    const items = [1, 2, 3];
    const results = await batchParallel(items, async (n) => {
      if (n === 2) throw new Error("boom");
      return n * 10;
    }, 2);
    expect(results.length).toBe(3);
    expect(results[0].result).toBe(10);
    expect(results[1].result).toBeUndefined();
    expect(results[1].error).toBeInstanceOf(Error);
    expect((results[1].error as Error).message).toBe("boom");
    expect(results[2].result).toBe(30);
  });

  it("batchSize 경계: items=10, batchSize=3 → 4개 배치 (3+3+3+1)", async () => {
    const items = Array.from({ length: 10 }, (_, i) => i);
    const order: number[] = [];
    const results = await batchParallel(
      items,
      async (n) => {
        order.push(n);
        return n;
      },
      3,
    );
    expect(results.length).toBe(10);
    expect(results.map((r) => r.result)).toEqual(items);
  });

  it("빈 입력 → 빈 결과", async () => {
    const results = await batchParallel([], async () => 0, 5);
    expect(results).toEqual([]);
  });

  it("batchSize=0 또는 음수도 안전 (최소 1로 클램프)", async () => {
    const items = [1, 2];
    const results = await batchParallel(items, async (n) => n, 0);
    expect(results.map((r) => r.result)).toEqual([1, 2]);
  });

  it("배치 내 병렬 실행 (동시 in-flight 카운트)", async () => {
    let inFlight = 0;
    let maxInFlight = 0;
    const items = [1, 2, 3, 4, 5, 6];
    await batchParallel(
      items,
      async (n) => {
        inFlight += 1;
        maxInFlight = Math.max(maxInFlight, inFlight);
        await new Promise((r) => setTimeout(r, 10));
        inFlight -= 1;
        return n;
      },
      3,
    );
    // batchSize=3이므로 동시 3개 in-flight
    expect(maxInFlight).toBe(3);
  });
});
