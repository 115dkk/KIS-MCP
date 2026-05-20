/**
 * Tool 4.2: get_return - business-day return analysis.
 */

import type { KisClient } from "../kis/client.js";
import {
  currentBusinessYmdKst,
  parseYmd,
  previousBusinessDayYmd,
  shiftBusinessMonthsYmd,
  shiftBusinessYearsYmd,
  subtractBusinessDaysYmd,
  ytdBusinessStartYmd,
} from "../utils/businessDay.js";
import { getChart, type PeriodCode } from "./chart.js";

export type ReturnPeriod = "1D" | "1W" | "1M" | "3M" | "6M" | "1Y" | "3Y" | "5Y" | "YTD";

export interface GetReturnInput {
  symbol: string;
  period: ReturnPeriod;
}

export interface ReturnResult {
  symbol: string;
  period: ReturnPeriod;
  startDate: string;
  endDate: string;
  targetStartDate: string;
  startPrice: number;
  endPrice: number;
  absoluteReturnPct: number;
  annualizedReturnPct?: number;
  pointCount: number;
  calculationBasis: "business_day";
}

interface PeriodSpec {
  chartPeriod: PeriodCode;
  tradingDays?: number;
  start: (endYmd: string) => string;
}

const PERIODS: Record<ReturnPeriod, PeriodSpec> = {
  "1D": { chartPeriod: "day", tradingDays: 1, start: (end) => subtractBusinessDaysYmd(end, 1) },
  "1W": { chartPeriod: "day", tradingDays: 5, start: (end) => subtractBusinessDaysYmd(end, 5) },
  "1M": { chartPeriod: "day", start: (end) => shiftBusinessMonthsYmd(end, -1) },
  "3M": { chartPeriod: "day", start: (end) => shiftBusinessMonthsYmd(end, -3) },
  "6M": { chartPeriod: "day", start: (end) => shiftBusinessMonthsYmd(end, -6) },
  "1Y": { chartPeriod: "day", start: (end) => shiftBusinessYearsYmd(end, -1) },
  "3Y": { chartPeriod: "week", start: (end) => shiftBusinessYearsYmd(end, -3) },
  "5Y": { chartPeriod: "week", start: (end) => shiftBusinessYearsYmd(end, -5) },
  YTD: { chartPeriod: "day", start: ytdBusinessStartYmd },
};

export async function getReturn(client: KisClient, input: GetReturnInput): Promise<ReturnResult> {
  const spec = PERIODS[input.period];
  if (!spec) throw new Error(`Unsupported return period: ${input.period}`);

  const endDate = currentBusinessYmdKst();
  const targetStartDate = spec.start(endDate);
  const fetchStartDate =
    spec.tradingDays !== undefined
      ? subtractBusinessDaysYmd(targetStartDate, 5)
      : previousBusinessDayYmd(targetStartDate, true);

  const chart = await getChart(client, {
    symbol: input.symbol,
    period: spec.chartPeriod,
    startDate: fetchStartDate,
    endDate,
    maxPoints: 500,
  });

  if (chart.points.length < 2) {
    throw new Error(`Not enough chart data to calculate return (points=${chart.points.length})`);
  }

  const first = chooseStartPoint(chart.points, targetStartDate, spec.tradingDays);
  const last = chart.points[chart.points.length - 1];
  const absoluteReturnPct = ((last.close - first.close) / first.close) * 100;

  const days = (parseChartDate(last.date).getTime() - parseChartDate(first.date).getTime()) / 86_400_000;
  const years = days / 365.25;
  let annualized: number | undefined;
  if (years > 1) {
    annualized = (Math.pow(last.close / first.close, 1 / years) - 1) * 100;
  }

  return {
    symbol: input.symbol,
    period: input.period,
    startDate: first.date,
    endDate: last.date,
    targetStartDate: toDashedDate(targetStartDate),
    startPrice: first.close,
    endPrice: last.close,
    absoluteReturnPct: round2(absoluteReturnPct),
    annualizedReturnPct: annualized !== undefined ? round2(annualized) : undefined,
    pointCount: chart.points.length,
    calculationBasis: "business_day",
  };
}

type ReturnPoint = Awaited<ReturnType<typeof getChart>>["points"][number];

function chooseStartPoint(
  points: ReturnPoint[],
  targetStartYmd: string,
  tradingDays: number | undefined,
): ReturnPoint {
  if (tradingDays !== undefined && points.length > tradingDays) {
    return points[points.length - 1 - tradingDays];
  }
  return points.find((p) => pointYmd(p.date) >= targetStartYmd) ?? points[0];
}

function pointYmd(date: string): string {
  return date.slice(0, 10).replace(/-/g, "");
}

function parseChartDate(date: string): Date {
  return parseYmd(pointYmd(date));
}

function toDashedDate(ymd: string): string {
  return `${ymd.slice(0, 4)}-${ymd.slice(4, 6)}-${ymd.slice(6, 8)}`;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
