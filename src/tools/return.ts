/**
 * Tool 4.2: get_return — period return analysis.
 *
 * Internally fetches a chart slice and computes first/last close return
 * plus annualized return for periods over a year.
 */

import type { KisClient } from "../kis/client.js";
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
  startPrice: number;
  endPrice: number;
  absoluteReturnPct: number;
  annualizedReturnPct?: number;
  pointCount: number;
}

interface PeriodSpec {
  chartPeriod: PeriodCode;
  approxYears: number;
  start: (today: Date) => Date;
}

function shiftDays(d: Date, days: number): Date {
  const c = new Date(d);
  c.setUTCDate(c.getUTCDate() - days);
  return c;
}

function shiftMonths(d: Date, months: number): Date {
  const c = new Date(d);
  c.setUTCMonth(c.getUTCMonth() - months);
  return c;
}

function shiftYears(d: Date, years: number): Date {
  const c = new Date(d);
  c.setUTCFullYear(c.getUTCFullYear() - years);
  return c;
}

function ytdStart(today: Date): Date {
  return new Date(Date.UTC(today.getUTCFullYear(), 0, 1));
}

const PERIODS: Record<ReturnPeriod, PeriodSpec> = {
  "1D": { chartPeriod: "day", approxYears: 1 / 365, start: (t) => shiftDays(t, 7) },
  "1W": { chartPeriod: "day", approxYears: 7 / 365, start: (t) => shiftDays(t, 14) },
  "1M": { chartPeriod: "day", approxYears: 1 / 12, start: (t) => shiftMonths(t, 2) },
  "3M": { chartPeriod: "day", approxYears: 0.25, start: (t) => shiftMonths(t, 4) },
  "6M": { chartPeriod: "day", approxYears: 0.5, start: (t) => shiftMonths(t, 7) },
  "1Y": { chartPeriod: "day", approxYears: 1, start: (t) => shiftYears(t, 1) },
  "3Y": { chartPeriod: "week", approxYears: 3, start: (t) => shiftYears(t, 3) },
  "5Y": { chartPeriod: "week", approxYears: 5, start: (t) => shiftYears(t, 5) },
  YTD: { chartPeriod: "day", approxYears: 0, start: ytdStart },
};

function fmt(d: Date): string {
  const y = d.getUTCFullYear().toString().padStart(4, "0");
  const m = (d.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = d.getUTCDate().toString().padStart(2, "0");
  return `${y}${m}${day}`;
}

export async function getReturn(client: KisClient, input: GetReturnInput): Promise<ReturnResult> {
  const spec = PERIODS[input.period];
  if (!spec) throw new Error(`지원하지 않는 기간: ${input.period}`);

  const today = new Date();
  const startDate = fmt(spec.start(today));
  const endDate = fmt(today);

  const chart = await getChart(client, {
    symbol: input.symbol,
    period: spec.chartPeriod,
    startDate,
    endDate,
    maxPoints: 500,
  });

  if (chart.points.length < 2) {
    throw new Error(`수익률 계산에 충분한 데이터가 없습니다 (점 ${chart.points.length}개)`);
  }

  const first = chart.points[0];
  const last = chart.points[chart.points.length - 1];
  const absoluteReturnPct = ((last.close - first.close) / first.close) * 100;

  const days = (Date.parse(last.date) - Date.parse(first.date)) / (1000 * 60 * 60 * 24);
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
    startPrice: first.close,
    endPrice: last.close,
    absoluteReturnPct: round2(absoluteReturnPct),
    annualizedReturnPct: annualized !== undefined ? round2(annualized) : undefined,
    pointCount: chart.points.length,
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
