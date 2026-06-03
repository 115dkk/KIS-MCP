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
import { getChart, type ChartPoint, type PeriodCode } from "./chart.js";
import {
  getOverseasStockChart,
  type OverseasMarket,
  type OverseasPeriod,
} from "./overseasStock.js";

export type ReturnPeriod = "1D" | "1W" | "1M" | "3M" | "6M" | "1Y" | "3Y" | "5Y" | "YTD";
export type ReturnMarket = "KRX" | OverseasMarket;

export interface GetReturnInput {
  symbol: string;
  period: ReturnPeriod;
  /**
   * Omit for domestic KRX symbols. Set NAS/NYS/AMS/... for overseas stocks/ETFs
   * such as { symbol: "RSP", market: "AMS" }.
   */
  market?: ReturnMarket;
}

export interface ReturnResult {
  symbol: string;
  market: ReturnMarket;
  instrumentType: "domestic" | "overseas";
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
  overseasPeriod: OverseasPeriod;
  tradingDays?: number;
  start: (endYmd: string) => string;
}

const PERIODS: Record<ReturnPeriod, PeriodSpec> = {
  "1D": {
    chartPeriod: "day",
    overseasPeriod: "day",
    tradingDays: 1,
    start: (end) => subtractBusinessDaysYmd(end, 1),
  },
  "1W": {
    chartPeriod: "day",
    overseasPeriod: "day",
    tradingDays: 5,
    start: (end) => subtractBusinessDaysYmd(end, 5),
  },
  "1M": { chartPeriod: "day", overseasPeriod: "day", start: (end) => shiftBusinessMonthsYmd(end, -1) },
  "3M": { chartPeriod: "day", overseasPeriod: "day", start: (end) => shiftBusinessMonthsYmd(end, -3) },
  "6M": { chartPeriod: "day", overseasPeriod: "day", start: (end) => shiftBusinessMonthsYmd(end, -6) },
  "1Y": { chartPeriod: "day", overseasPeriod: "day", start: (end) => shiftBusinessYearsYmd(end, -1) },
  "3Y": { chartPeriod: "week", overseasPeriod: "month", start: (end) => shiftBusinessYearsYmd(end, -3) },
  "5Y": { chartPeriod: "week", overseasPeriod: "month", start: (end) => shiftBusinessYearsYmd(end, -5) },
  YTD: { chartPeriod: "day", overseasPeriod: "day", start: ytdBusinessStartYmd },
};

export async function getReturn(client: KisClient, input: GetReturnInput): Promise<ReturnResult> {
  const spec = PERIODS[input.period];
  if (!spec) throw new Error(`Unsupported return period: ${input.period}`);

  const route = resolveRoute(input);
  const endDate = currentBusinessYmdKst();
  const targetStartDate = spec.start(endDate);
  const fetchStartDate =
    spec.tradingDays !== undefined
      ? subtractBusinessDaysYmd(targetStartDate, 5)
      : previousBusinessDayYmd(targetStartDate, true);

  const chart =
    route.instrumentType === "domestic"
      ? await getChart(client, {
          symbol: route.symbol,
          period: spec.chartPeriod,
          startDate: fetchStartDate,
          endDate,
          maxPoints: 500,
        })
      : await getOverseasStockChart(client, {
          market: route.market,
          symbol: route.symbol,
          period: spec.overseasPeriod,
          startDate: fetchStartDate,
          endDate,
          maxPoints: 500,
          adjusted: true,
        });

  return calculateReturn({
    symbol: route.symbol,
    market: route.market,
    instrumentType: route.instrumentType,
    period: input.period,
    targetStartDate,
    tradingDays: spec.tradingDays,
    points: chart.points,
  });
}

const OVERSEAS_MARKETS: OverseasMarket[] = ["NAS", "NYS", "AMS", "TSE", "HKS", "SHS", "SZS", "HSX", "HNX"];
const DOMESTIC_LIKE_SYMBOL_RE = /^(?:\d{6}|Q\d{6})$/;
const OVERSEAS_LIKE_SYMBOL_RE = /^[A-Z]{1,5}$/;

type ReturnRoute =
  | { symbol: string; market: "KRX"; instrumentType: "domestic" }
  | { symbol: string; market: OverseasMarket; instrumentType: "overseas" };

function resolveRoute(input: GetReturnInput): ReturnRoute {
  const symbol = String(input.symbol ?? "").trim().toUpperCase();
  const market = input.market?.trim().toUpperCase() as ReturnMarket | undefined;

  if (!symbol) throw new Error("symbol is required");
  if (!market || market === "KRX") {
    if (!market && OVERSEAS_LIKE_SYMBOL_RE.test(symbol) && !DOMESTIC_LIKE_SYMBOL_RE.test(symbol)) {
      throw new Error(
        "get_return requires market for overseas stocks/ETFs. Example: { symbol: 'RSP', market: 'AMS', period: '1Y' }.",
      );
    }
    return { symbol, market: "KRX", instrumentType: "domestic" };
  }

  if (!OVERSEAS_MARKETS.includes(market as OverseasMarket)) {
    throw new Error(`market must be KRX or one of ${OVERSEAS_MARKETS.join("/")}: ${input.market}`);
  }

  return { symbol, market: market as OverseasMarket, instrumentType: "overseas" };
}

function calculateReturn(args: {
  symbol: string;
  market: ReturnMarket;
  instrumentType: "domestic" | "overseas";
  period: ReturnPeriod;
  targetStartDate: string;
  tradingDays: number | undefined;
  points: ChartPoint[];
}): ReturnResult {
  if (args.points.length < 2) {
    throw new Error(`Not enough chart data to calculate return (points=${args.points.length})`);
  }

  const first = chooseStartPoint(args.points, args.targetStartDate, args.tradingDays);
  const last = args.points[args.points.length - 1];
  const absoluteReturnPct = ((last.close - first.close) / first.close) * 100;

  const days = (parseChartDate(last.date).getTime() - parseChartDate(first.date).getTime()) / 86_400_000;
  const years = days / 365.25;
  let annualized: number | undefined;
  if (years > 1) {
    annualized = (Math.pow(last.close / first.close, 1 / years) - 1) * 100;
  }

  return {
    symbol: args.symbol,
    market: args.market,
    instrumentType: args.instrumentType,
    period: args.period,
    startDate: first.date,
    endDate: last.date,
    targetStartDate: toDashedDate(args.targetStartDate),
    startPrice: first.close,
    endPrice: last.close,
    absoluteReturnPct: round2(absoluteReturnPct),
    annualizedReturnPct: annualized !== undefined ? round2(annualized) : undefined,
    pointCount: args.points.length,
    calculationBasis: "business_day",
  };
}

function chooseStartPoint(
  points: ChartPoint[],
  targetStartYmd: string,
  tradingDays: number | undefined,
): ChartPoint {
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
