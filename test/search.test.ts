/**
 * advanced_search 회귀 테스트.
 *
 * rankBy=return_*는 이름 그대로 실제 기간 수익률 랭킹이어야 한다.
 * enrichWithReturn 옵션을 따로 주지 않아도 자동으로 get_return 경로를 탄다.
 */

import { describe, expect, it, vi } from "vitest";
import type { KisClient } from "../src/kis/client.js";
import { KIS } from "../src/kis/endpoints.js";
import { advancedSearch } from "../src/tools/search.js";

const env = (data: Record<string, unknown>) => ({
  rt_cd: "0",
  msg_cd: "00000",
  msg1: "OK",
  ...data,
});

const chart = (startClose: number, endClose: number) => [
  {
    stck_bsop_date: "20250430",
    stck_oprc: String(startClose),
    stck_hgpr: String(startClose),
    stck_lwpr: String(startClose),
    stck_clpr: String(startClose),
    acml_vol: "1000",
  },
  {
    stck_bsop_date: "20260430",
    stck_oprc: String(endClose),
    stck_hgpr: String(endClose),
    stck_lwpr: String(endClose),
    stck_clpr: String(endClose),
    acml_vol: "1000",
  },
];

describe("advancedSearch", () => {
  it("rankBy=return_*는 enrichWithReturn 없이도 실제 수익률로 정렬", async () => {
    const get = vi.fn(async (opts: { path: string; query?: Record<string, string> }) => {
      if (opts.path === KIS.fluctuationRank.path) {
        return env({
          output: [
            {
              stck_shrn_iscd: "000001",
              hts_kor_isnm: "테스트상승",
              stck_prpr: "120",
              prdy_ctrt: "0",
              acml_vol: "1000",
              data_rank: "1",
            },
            {
              stck_shrn_iscd: "000002",
              hts_kor_isnm: "테스트하락",
              stck_prpr: "90",
              prdy_ctrt: "0",
              acml_vol: "1000",
              data_rank: "2",
            },
          ],
        });
      }
      if (opts.path === KIS.stockDailyChart.path) {
        const symbol = opts.query?.fid_input_iscd;
        return env({ output: symbol === "000001" ? chart(100, 120) : chart(100, 90) });
      }
      throw new Error(`unexpected path: ${opts.path}`);
    });
    const client = { get } as unknown as KisClient;

    const result = await advancedSearch(client, {
      rankBy: "return_1y",
      order: "asc",
      limit: 2,
      useMasterPool: false,
    });

    expect(result.hits.map((h) => h.symbol)).toEqual(["000002", "000001"]);
    expect(result.hits.map((h) => h.enrichedReturnPct)).toEqual([-10, 20]);
    expect(result.notes.join(" ")).toContain("rankBy=return_1y 자동 enrichment");
    expect(get).toHaveBeenCalledTimes(3); // ranking + 2 chart calls
  });

  it("마스터 풀 return 랭킹이 cap을 넘으면 샘플 순위를 반환하지 않음", async () => {
    const get = vi.fn(async () => {
      throw new Error("master pool guard should run before KIS calls");
    });
    const client = { get } as unknown as KisClient;

    const result = await advancedSearch(client, {
      instrumentType: "etf",
      rankBy: "return_1y",
      order: "asc",
      limit: 5,
      excludeOverseas: true,
      excludeBonds: true,
    });

    expect(result.afterFilters).toBeGreaterThan(30);
    expect(result.hits).toEqual([]);
    expect(result.notes.join(" ")).toContain("샘플 30개 순위를 진짜 순위처럼 반환하지 않도록 결과를 비웠습니다");
    expect(get).not.toHaveBeenCalled();
  });
});
