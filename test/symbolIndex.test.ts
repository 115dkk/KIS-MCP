/**
 * ROADMAP M0-3 회귀 테스트.
 *
 * symbolIndex의 사전 캐시(_norm) 적용 후에도 findByName / findByCode /
 * listByFilter가 동작하는지 검증. 마스터 인덱스는 빌드 시점에 생성된
 * src/data/symbolIndex.json을 사용한다 (4300+ 종목).
 */

import { describe, expect, it } from "vitest";
import {
  findByCode,
  findByName,
  getIndexMeta,
  listByFilter,
} from "../src/utils/symbolIndex.js";

describe("getIndexMeta", () => {
  it("인덱스 메타가 정상 (KOSPI+KOSDAQ ~4300종목)", () => {
    const meta = getIndexMeta();
    expect(meta.totalRecords).toBeGreaterThan(3000);
    expect(meta.generatedAt).toBeTruthy();
    // type 분포에 ST/EF/EN 모두 존재
    expect(meta.typeDistribution.ST).toBeGreaterThan(1000);
    expect(meta.typeDistribution.EF).toBeGreaterThan(100);
    // 시장 분포
    expect(meta.marketDistribution.KOSPI).toBeGreaterThan(0);
    expect(meta.marketDistribution.KOSDAQ).toBeGreaterThan(0);
  });
});

describe("findByCode", () => {
  it("삼성전자 005930 정확 매칭", () => {
    const rec = findByCode("005930");
    expect(rec).toBeDefined();
    expect(rec?.name).toContain("삼성전자");
    expect(rec?.type).toBe("ST");
    expect(rec?.market).toBe("KOSPI");
  });

  it("KODEX 200 069500 정확 매칭 + 분류 EF", () => {
    const rec = findByCode("069500");
    expect(rec).toBeDefined();
    expect(rec?.type).toBe("EF");
  });

  it("미존재 코드는 undefined", () => {
    expect(findByCode("999999")).toBeUndefined();
  });

  it("trim/uppercase 자동 적용", () => {
    expect(findByCode("  005930  ")).toBeDefined();
  });
});

describe("findByName — 3-tier 매칭", () => {
  it("정확 매칭 (tier1)", () => {
    const hits = findByName("삼성전자");
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0].matchTier).toBe(1);
    expect(hits[0].name).toBe("삼성전자");
  });

  it("부분 매칭으로 KODEX ETF 다수 발견", () => {
    const hits = findByName("KODEX");
    expect(hits.length).toBeGreaterThan(0);
    // 최소 하나는 KODEX prefix
    expect(hits.some((h) => h.name.toUpperCase().startsWith("KODEX"))).toBe(true);
  });

  it("limit 옵션 적용", () => {
    const hits = findByName("KODEX", { limit: 3 });
    expect(hits.length).toBeLessThanOrEqual(3);
  });

  it("types 필터 — ETF만", () => {
    const hits = findByName("KODEX", { types: ["EF"], limit: 50 });
    expect(hits.length).toBeGreaterThan(0);
    expect(hits.every((h) => h.type === "EF")).toBe(true);
  });

  it("markets 필터 — KOSDAQ만", () => {
    const hits = findByName("바이오", { markets: ["KOSDAQ"], limit: 50 });
    expect(hits.every((h) => h.market === "KOSDAQ")).toBe(true);
  });

  it("빈 쿼리는 빈 결과", () => {
    expect(findByName("")).toEqual([]);
  });
});

describe("listByFilter", () => {
  it("ETF 전체 풀 (~1500개)", () => {
    const etfs = listByFilter({ types: ["EF"] });
    expect(etfs.length).toBeGreaterThan(500);
    expect(etfs.every((r) => r.type === "EF")).toBe(true);
  });

  it("KOSPI 전체", () => {
    const kospi = listByFilter({ markets: ["KOSPI"] });
    expect(kospi.length).toBeGreaterThan(1000);
    expect(kospi.every((r) => r.market === "KOSPI")).toBe(true);
  });

  it("필터 없으면 전체 반환", () => {
    const all = listByFilter();
    const meta = getIndexMeta();
    expect(all.length).toBe(meta.totalRecords);
  });
});

describe("M0-3: 사전 정규화 캐시 효과", () => {
  it("findByName 다중 호출에서 결과 일관성 (캐시 무관)", () => {
    const hits1 = findByName("삼성", { limit: 10 });
    const hits2 = findByName("삼성", { limit: 10 });
    expect(hits1).toEqual(hits2);
  });
});
