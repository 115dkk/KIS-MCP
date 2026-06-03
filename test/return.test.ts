import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { KisClient } from "../src/kis/client.js";
import { KIS } from "../src/kis/endpoints.js";
import { getReturn } from "../src/tools/return.js";

const env = (output: unknown) => ({ rt_cd: "0", msg_cd: "00000", msg1: "OK", output });

const chartItem = (date: string, close: number) => ({
  stck_bsop_date: date,
  stck_oprc: String(close),
  stck_hgpr: String(close),
  stck_lwpr: String(close),
  stck_clpr: String(close),
  acml_vol: "1000",
});

const overseasEnv = (output2: unknown) => ({
  rt_cd: "0",
  msg_cd: "00000",
  msg1: "OK",
  output1: {},
  output2,
});

const overseasChartItem = (date: string, close: number) => ({
  xymd: date,
  open: String(close),
  high: String(close),
  low: String(close),
  clos: String(close),
  tvol: "1000",
});

describe("getReturn business-day windows", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-18T03:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("uses the previous trading point for 1D across a weekend", async () => {
    const get = vi.fn(async () =>
      env([
        chartItem("20260518", 121),
        chartItem("20260515", 110),
        chartItem("20260514", 108),
        chartItem("20260513", 106),
        chartItem("20260512", 104),
        chartItem("20260511", 100),
      ]),
    );
    const client = { get } as unknown as KisClient;

    const result = await getReturn(client, { symbol: "005930", period: "1D" });

    expect(result.calculationBasis).toBe("business_day");
    expect(result.targetStartDate).toBe("2026-05-15");
    expect(result.startDate).toBe("2026-05-15");
    expect(result.endDate).toBe("2026-05-18");
    expect(result.absoluteReturnPct).toBe(10);
    expect(get).toHaveBeenCalledWith(
      expect.objectContaining({
        path: KIS.stockDailyChart.path,
        query: expect.objectContaining({
          fid_input_date_1: "20260508",
          fid_input_date_2: "20260518",
        }),
      }),
    );
  });

  it("uses five business days for 1W", async () => {
    const get = vi.fn(async () =>
      env([
        chartItem("20260518", 120),
        chartItem("20260515", 115),
        chartItem("20260514", 114),
        chartItem("20260513", 113),
        chartItem("20260512", 112),
        chartItem("20260511", 100),
      ]),
    );
    const client = { get } as unknown as KisClient;

    const result = await getReturn(client, { symbol: "005930", period: "1W" });

    expect(result.targetStartDate).toBe("2026-05-11");
    expect(result.startDate).toBe("2026-05-11");
    expect(result.absoluteReturnPct).toBe(20);
  });

  it("supports overseas ETFs when market is provided", async () => {
    const get = vi.fn(async () =>
      overseasEnv([
        overseasChartItem("20260518", 121),
        overseasChartItem("20260515", 110),
        overseasChartItem("20260514", 108),
        overseasChartItem("20260513", 106),
        overseasChartItem("20260512", 104),
        overseasChartItem("20260511", 100),
      ]),
    );
    const client = { get } as unknown as KisClient;

    const result = await getReturn(client, { symbol: "RSP", market: "AMS", period: "1D" });

    expect(result.market).toBe("AMS");
    expect(result.instrumentType).toBe("overseas");
    expect(result.targetStartDate).toBe("2026-05-15");
    expect(result.startDate).toBe("2026-05-15");
    expect(result.endDate).toBe("2026-05-18");
    expect(result.absoluteReturnPct).toBe(10);
    expect(get).toHaveBeenCalledWith(
      expect.objectContaining({
        path: KIS.overseasStockDailyChart.path,
        query: expect.objectContaining({
          EXCD: "AMS",
          SYMB: "RSP",
          GUBN: "0",
          BYMD: "20260518",
        }),
      }),
    );
  });

  it("does not route overseas-looking tickers to the domestic chart without market", async () => {
    const get = vi.fn();
    const client = { get } as unknown as KisClient;

    await expect(getReturn(client, { symbol: "RSP", period: "1Y" })).rejects.toThrow(
      /market for overseas/,
    );
    expect(get).not.toHaveBeenCalled();
  });
});
