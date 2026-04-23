/**
 * Tool 4.3: get_chart — OHLCV time series for stocks/ETFs.
 *
 * Returns a JSON array of {date,open,high,low,close,volume}. Caps at 500
 * points via even downsampling per CLAUDE.md §5.4.
 */

import { KIS } from "../kis/endpoints.js";
import type { KisClient } from "../kis/client.js";
import type { KisChartItem, KisResponse } from "../kis/types.js";
import { downsample, parseNum } from "../utils/downsample.js";
import { normalizeSymbol } from "../utils/symbol.js";

export type PeriodCode = "day" | "week" | "month" | "year";

export interface GetChartInput {
  symbol: string;
  period: PeriodCode;
  startDate?: string; // YYYYMMDD
  endDate?: string; // YYYYMMDD
  /** Disable adjustment for splits/rights (default: adjusted). */
  adjusted?: boolean;
  /** Hard cap on returned points (default 500, max 500). */
  maxPoints?: number;
}

export interface ChartPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface ChartResult {
  symbol: string;
  period: PeriodCode;
  startDate: string;
  endDate: string;
  points: ChartPoint[];
  rawCount: number;
  downsampledTo?: number;
}

const PERIOD_CODE: Record<PeriodCode, string> = {
  day: "D",
  week: "W",
  month: "M",
  year: "Y",
};

function formatYmd(date: Date): string {
  const y = date.getUTCFullYear().toString().padStart(4, "0");
  const m = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const d = date.getUTCDate().toString().padStart(2, "0");
  return `${y}${m}${d}`;
}

function defaultRange(period: PeriodCode): { startDate: string; endDate: string } {
  const today = new Date();
  const start = new Date(today);
  switch (period) {
    case "day":
      start.setUTCMonth(start.getUTCMonth() - 6);
      break;
    case "week":
      start.setUTCFullYear(start.getUTCFullYear() - 2);
      break;
    case "month":
      start.setUTCFullYear(start.getUTCFullYear() - 5);
      break;
    case "year":
      start.setUTCFullYear(start.getUTCFullYear() - 20);
      break;
  }
  return { startDate: formatYmd(start), endDate: formatYmd(today) };
}

export async function getChart(client: KisClient, input: GetChartInput): Promise<ChartResult> {
  const symbol = normalizeSymbol(input.symbol);
  if (!PERIOD_CODE[input.period]) {
    throw new Error(`기간 분류는 day/week/month/year 중 하나여야 합니다: ${input.period}`);
  }

  const range = input.startDate && input.endDate
    ? { startDate: input.startDate, endDate: input.endDate }
    : defaultRange(input.period);

  const adjusted = input.adjusted ?? true;

  const res = await client.get<KisChartItem[] | KisChartItem>({
    path: KIS.stockDailyChart.path,
    trId: KIS.stockDailyChart.trIdReal,
    query: {
      fid_cond_mrkt_div_code: "J",
      fid_input_iscd: symbol,
      fid_input_date_1: range.startDate,
      fid_input_date_2: range.endDate,
      fid_period_div_code: PERIOD_CODE[input.period],
      fid_org_adj_prc: adjusted ? "0" : "1",
    },
  });

  const items = extractChartItems(res);
  const sorted = items
    .map(itemToPoint)
    .filter((p): p is ChartPoint => p !== null)
    .sort((a, b) => a.date.localeCompare(b.date));

  const cap = Math.min(input.maxPoints ?? 500, 500);
  const downsampled = downsample(sorted, cap);

  return {
    symbol,
    period: input.period,
    startDate: range.startDate,
    endDate: range.endDate,
    rawCount: sorted.length,
    downsampledTo: downsampled.length < sorted.length ? downsampled.length : undefined,
    points: downsampled,
  };
}

function extractChartItems(res: KisResponse<KisChartItem[] | KisChartItem>): KisChartItem[] {
  const candidates: unknown[] = [res.output, res.output1, res.output2];
  for (const c of candidates) {
    if (Array.isArray(c)) return c as KisChartItem[];
  }
  if (res.output && typeof res.output === "object" && !Array.isArray(res.output)) {
    return [res.output as KisChartItem];
  }
  return [];
}

function itemToPoint(item: KisChartItem): ChartPoint | null {
  if (!item.stck_bsop_date) return null;
  const close = parseNum(item.stck_clpr);
  if (!Number.isFinite(close) || close === 0) return null;
  const date = item.stck_bsop_date;
  return {
    date: `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`,
    open: parseNum(item.stck_oprc),
    high: parseNum(item.stck_hgpr),
    low: parseNum(item.stck_lwpr),
    close,
    volume: parseNum(item.acml_vol),
  };
}
