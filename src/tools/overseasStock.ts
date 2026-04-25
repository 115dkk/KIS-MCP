/**
 * 신규 도구: get_overseas_stock_chart — 해외 개별주식 OHLCV 시계열.
 *
 * 한투 API 분기:
 *   - day/week/month: HHDFS76240000 (overseas dailyprice). KEYB 페이지네이션.
 *   - minute: HHDFS76950200 (overseas inquire-time-itemchartprice). NEXT/KEYB 페이지네이션.
 *
 * Market(거래소) 코드:
 *   NAS: 나스닥, NYS: 뉴욕, AMS: 아멕스, TSE: 도쿄, HKS: 홍콩,
 *   SHS: 상해, SZS: 심천, HSX: 호치민, HNX: 하노이
 *
 * 시간은 현지 시간(xymd/xhms) 기준 — 사용자가 시장 흐름을 자연스럽게 인식하도록.
 *
 * 한도:
 *   - 일봉 페이지: 최대 10회 (≈ 1000 영업일 ≈ 4년)
 *   - 분봉 페이지: 최대 30회 (페이지당 120 → 최대 3600 raw 1분봉 ≈ 9 거래일분)
 *   - 분봉 최대 범위: 5 영업일 (그 이상은 day로)
 */

import { KIS } from "../kis/endpoints.js";
import type { KisClient } from "../kis/client.js";
import type {
  KisOverseasStockDailyItem,
  KisOverseasStockDailyMeta,
  KisOverseasStockMinuteItem,
  KisOverseasStockMinuteMeta,
} from "../kis/types.js";
import { aggregateMinutes, type ChartPoint, type IntervalMinutes } from "./chart.js";
import { downsample, parseNum } from "../utils/downsample.js";
import { extractArrayPreferred, extractObject } from "../utils/kisResponse.js";

export type OverseasMarket =
  | "NAS"
  | "NYS"
  | "AMS"
  | "TSE"
  | "HKS"
  | "SHS"
  | "SZS"
  | "HSX"
  | "HNX";

const VALID_MARKETS: OverseasMarket[] = ["NAS", "NYS", "AMS", "TSE", "HKS", "SHS", "SZS", "HSX", "HNX"];
const VALID_INTERVALS: IntervalMinutes[] = [1, 3, 5, 10, 15, 30, 60];
const MAX_DAILY_PAGES = 10;
const MAX_MINUTE_PAGES = 30;
const MAX_MINUTE_RANGE_DAYS = 5;
const MAX_POINTS_CAP = 2000;
const DEFAULT_MAX_POINTS = 500;

export type OverseasPeriod = "day" | "week" | "month" | "minute";

export interface GetOverseasStockChartInput {
  /** 거래소: NAS/NYS/AMS/TSE/HKS/SHS/SZS/HSX/HNX */
  market: OverseasMarket;
  /** 종목코드 (예: TSLA, AAPL, MSFT) */
  symbol: string;
  period: OverseasPeriod;
  /** YYYYMMDD. minute에서는 endDate만 의미 (역방향 페이지네이션) */
  startDate?: string;
  endDate?: string;
  /** 최대 반환 포인트 수 (기본 500, 상한 2000) */
  maxPoints?: number;
  /** 분봉 집계 단위 (period=minute일 때만). 기본 1 */
  intervalMinutes?: IntervalMinutes;
  /** 수정주가 반영 (day/week/month 전용). 기본 true */
  adjusted?: boolean;
}

export interface OverseasStockChartResult {
  market: OverseasMarket;
  symbol: string;
  period: OverseasPeriod;
  intervalMinutes?: IntervalMinutes;
  startDate: string;
  endDate: string;
  /**
   * 응답 가격 소수점 자릿수 (zdiv). 일부 ETF/스플릿 후 종목은 zdiv가 4 등으로 큼.
   * 본 도구는 이미 number로 변환된 값을 노출하므로 추가 보정 불필요.
   */
  priceDecimals?: number;
  rsym?: string;
  points: ChartPoint[];
  rawCount: number;
  downsampledTo?: number;
  pagesFetched?: number;
  source: "kis-overseas-stock";
  notes?: string[];
}

function formatYmd(date: Date): string {
  const y = date.getUTCFullYear().toString().padStart(4, "0");
  const m = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const d = date.getUTCDate().toString().padStart(2, "0");
  return `${y}${m}${d}`;
}

function parseYmd(s: string): Date {
  if (!/^\d{8}$/.test(s)) throw new Error(`날짜 형식은 YYYYMMDD여야 합니다: ${s}`);
  return new Date(
    Date.UTC(Number(s.slice(0, 4)), Number(s.slice(4, 6)) - 1, Number(s.slice(6, 8))),
  );
}

function dateRangeDays(startYmd: string, endYmd: string): number {
  return Math.round((parseYmd(endYmd).getTime() - parseYmd(startYmd).getTime()) / 86_400_000) + 1;
}

function defaultRange(period: OverseasPeriod): { startDate: string; endDate: string } {
  const today = new Date();
  const start = new Date(today);
  switch (period) {
    case "minute":
      // 분봉은 당일만
      break;
    case "day":
      start.setUTCMonth(start.getUTCMonth() - 6);
      break;
    case "week":
      start.setUTCFullYear(start.getUTCFullYear() - 2);
      break;
    case "month":
      start.setUTCFullYear(start.getUTCFullYear() - 5);
      break;
  }
  return { startDate: formatYmd(start), endDate: formatYmd(today) };
}

function gubnFor(period: OverseasPeriod): string {
  switch (period) {
    case "day":
      return "0";
    case "week":
      return "1";
    case "month":
      return "2";
    case "minute":
      throw new Error("minute period는 별도 endpoint를 사용합니다");
  }
}

export async function getOverseasStockChart(
  client: KisClient,
  input: GetOverseasStockChartInput,
): Promise<OverseasStockChartResult> {
  if (!input?.market) throw new Error("market은 필수입니다");
  if (!input?.symbol) throw new Error("symbol은 필수입니다");
  if (!VALID_MARKETS.includes(input.market)) {
    throw new Error(
      `market은 ${VALID_MARKETS.join("/")} 중 하나여야 합니다: ${input.market}`,
    );
  }
  const symbol = input.symbol.trim().toUpperCase();
  const period = input.period;
  const range = input.startDate && input.endDate
    ? { startDate: input.startDate, endDate: input.endDate }
    : defaultRange(period);
  const cap = Math.min(input.maxPoints ?? DEFAULT_MAX_POINTS, MAX_POINTS_CAP);

  if (period === "minute") {
    const interval = input.intervalMinutes ?? 1;
    if (!VALID_INTERVALS.includes(interval)) {
      throw new Error(
        `intervalMinutes는 ${VALID_INTERVALS.join("/")} 중 하나여야 합니다: ${interval}`,
      );
    }
    const days = dateRangeDays(range.startDate, range.endDate);
    if (days < 1 || days > MAX_MINUTE_RANGE_DAYS) {
      throw new Error(
        `분봉은 최대 ${MAX_MINUTE_RANGE_DAYS} 영업일까지만 조회 가능합니다 (요청: ${days}일). period=day로 조회하세요.`,
      );
    }
    return await fetchMinuteChart(client, input.market, symbol, range, cap, interval);
  }

  return await fetchDailyChart(client, input.market, symbol, period, range, cap, input.adjusted ?? true);
}

// ───────────── 일봉/주봉/월봉 (HHDFS76240000) ─────────────

async function fetchDailyChart(
  client: KisClient,
  market: OverseasMarket,
  symbol: string,
  period: OverseasPeriod,
  range: { startDate: string; endDate: string },
  cap: number,
  adjusted: boolean,
): Promise<OverseasStockChartResult> {
  const startDateMs = parseYmd(range.startDate).getTime();
  let bymd = range.endDate;
  let keyb = "";
  let pages = 0;
  const all: ChartPoint[] = [];
  const seenDates = new Set<string>();
  let priceDecimals: number | undefined;
  let rsym: string | undefined;
  const notes: string[] = [];

  while (pages < MAX_DAILY_PAGES) {
    pages++;
    const res = await client.get<KisOverseasStockDailyItem[]>({
      path: KIS.overseasStockDailyChart.path,
      trId: KIS.overseasStockDailyChart.trIdReal,
      query: {
        AUTH: "",
        EXCD: market,
        SYMB: symbol,
        GUBN: gubnFor(period),
        BYMD: bymd,
        MODP: adjusted ? "1" : "0",
        KEYB: keyb,
      },
    });
    const meta = extractObject<KisOverseasStockDailyMeta>(res);
    if (meta.zdiv !== undefined) priceDecimals = parseNum(meta.zdiv) || 0;
    if (meta.rsym) rsym = meta.rsym;
    const items = extractArrayPreferred<KisOverseasStockDailyItem>(res, [
      "output2",
      "output",
      "output1",
    ]);
    if (items.length === 0) break;

    let oldestYmd: string | null = null;
    for (const it of items) {
      const point = dailyItemToPoint(it);
      if (!point) continue;
      const ymd = it.xymd;
      if (seenDates.has(ymd)) continue;
      seenDates.add(ymd);
      all.push(point);
      if (oldestYmd === null || ymd < oldestYmd) oldestYmd = ymd;
    }
    if (!oldestYmd) break;
    if (parseYmd(oldestYmd).getTime() <= startDateMs) break;
    if (items.length < 100) break; // 더 데이터 없음 (KIS는 100건/호출 가능)

    // 다음 페이지: bymd를 oldestYmd - 1일로
    const next = new Date(parseYmd(oldestYmd).getTime() - 86_400_000);
    const nextBymd = formatYmd(next);
    if (nextBymd >= bymd) break;
    bymd = nextBymd;
    keyb = ""; // BYMD 갱신 방식이 KEYB보다 단순하고 안전 (KEYB는 next 비공식)
  }

  if (pages >= MAX_DAILY_PAGES) {
    notes.push(
      `페이지네이션 상한(${MAX_DAILY_PAGES}회)에 도달했습니다. 더 긴 기간이 필요하면 startDate를 줄이거나 period=week/month로.`,
    );
  }

  const filtered = all
    .filter((p) => p.date.replace(/-/g, "") >= range.startDate)
    .sort((a, b) => a.date.localeCompare(b.date));
  const downsampled = downsample(filtered, cap);

  return {
    market,
    symbol,
    period,
    startDate: range.startDate,
    endDate: range.endDate,
    priceDecimals,
    rsym,
    rawCount: filtered.length,
    downsampledTo: downsampled.length < filtered.length ? downsampled.length : undefined,
    points: downsampled,
    pagesFetched: pages,
    source: "kis-overseas-stock",
    notes: notes.length ? notes : undefined,
  };
}

// ───────────── 분봉 (HHDFS76950200) ─────────────

async function fetchMinuteChart(
  client: KisClient,
  market: OverseasMarket,
  symbol: string,
  range: { startDate: string; endDate: string },
  cap: number,
  interval: IntervalMinutes,
): Promise<OverseasStockChartResult> {
  const startDateMs = parseYmd(range.startDate).getTime();
  let pages = 0;
  let next = "";
  let keyb = "";
  let priceDecimals: number | undefined;
  let rsym: string | undefined;
  const minuteByKey = new Map<string, ChartPoint>();
  const notes: string[] = [];

  while (pages < MAX_MINUTE_PAGES) {
    pages++;
    const res = await client.get<KisOverseasStockMinuteItem[]>({
      path: KIS.overseasStockMinuteChart.path,
      trId: KIS.overseasStockMinuteChart.trIdReal,
      query: {
        AUTH: "",
        EXCD: market,
        SYMB: symbol,
        NMIN: "1", // 1분봉으로 받아 클라이언트 집계
        PINC: pages === 1 ? "0" : "1", // 첫 페이지는 당일, 다음부터 전일 포함
        NEXT: next,
        NREC: "120",
        FILL: "",
        KEYB: keyb,
      },
    });
    const meta = extractObject<KisOverseasStockMinuteMeta>(res);
    if (meta.zdiv !== undefined) priceDecimals = parseNum(meta.zdiv) || 0;
    if (meta.rsym) rsym = meta.rsym;
    const items = extractArrayPreferred<KisOverseasStockMinuteItem>(res, [
      "output2",
      "output",
      "output1",
    ]);
    if (items.length === 0) break;

    let oldest: { ymd: string; hms: string } | null = null;
    let added = 0;
    for (const it of items) {
      const point = minuteItemToPoint(it);
      if (!point) continue;
      const key = `${it.xymd}_${it.xhms}`;
      if (minuteByKey.has(key)) continue;
      minuteByKey.set(key, point);
      added++;
      if (
        !oldest ||
        it.xymd < oldest.ymd ||
        (it.xymd === oldest.ymd && it.xhms < oldest.hms)
      ) {
        oldest = { ymd: it.xymd, hms: it.xhms };
      }
    }
    if (!oldest || added === 0) break;
    if (parseYmd(oldest.ymd).getTime() < startDateMs) break;
    if (meta.next !== "1") break;

    // 다음 페이지: KEYB를 oldest 시각의 1분 전으로
    const stepped = stepBackOneMinute(oldest.ymd, oldest.hms);
    const newKeyb = stepped.ymd + stepped.hms;
    if (newKeyb === keyb) break;
    keyb = newKeyb;
    next = "1";

    if (parseYmd(stepped.ymd).getTime() < startDateMs) break;
  }

  if (pages >= MAX_MINUTE_PAGES) {
    notes.push(
      `페이지네이션 상한(${MAX_MINUTE_PAGES}회)에 도달했습니다. endDate를 줄이거나 intervalMinutes를 키우세요.`,
    );
  }

  const oneMin = Array.from(minuteByKey.values())
    .filter((p) => p.date.slice(0, 10).replace(/-/g, "") >= range.startDate)
    .sort((a, b) => a.date.localeCompare(b.date));
  const aggregated = interval > 1 ? aggregateMinutes(oneMin, interval) : oneMin;
  const downsampled = downsample(aggregated, cap);

  return {
    market,
    symbol,
    period: "minute",
    intervalMinutes: interval,
    startDate: range.startDate,
    endDate: range.endDate,
    priceDecimals,
    rsym,
    rawCount: aggregated.length,
    downsampledTo: downsampled.length < aggregated.length ? downsampled.length : undefined,
    points: downsampled,
    pagesFetched: pages,
    source: "kis-overseas-stock",
    notes: notes.length ? notes : undefined,
  };
}

function stepBackOneMinute(ymd: string, hms: string): { ymd: string; hms: string } {
  const hh = Number(hms.slice(0, 2));
  const mm = Number(hms.slice(2, 4));
  const ss = Number(hms.slice(4, 6));
  let totalMin = hh * 60 + mm - 1;
  if (totalMin < 0) {
    const prev = new Date(parseYmd(ymd).getTime() - 86_400_000);
    return { ymd: formatYmd(prev), hms: "235900" };
  }
  const newHh = Math.floor(totalMin / 60);
  const newMm = totalMin % 60;
  return {
    ymd,
    hms:
      newHh.toString().padStart(2, "0") +
      newMm.toString().padStart(2, "0") +
      ss.toString().padStart(2, "0"),
  };
}

function dailyItemToPoint(item: KisOverseasStockDailyItem): ChartPoint | null {
  if (!item.xymd) return null;
  const close = parseNum(item.clos);
  if (!Number.isFinite(close) || close === 0) return null;
  const d = item.xymd;
  return {
    date: `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`,
    open: parseNum(item.open) || close,
    high: parseNum(item.high) || close,
    low: parseNum(item.low) || close,
    close,
    volume: parseNum(item.tvol) || 0,
  };
}

function minuteItemToPoint(item: KisOverseasStockMinuteItem): ChartPoint | null {
  if (!item.xymd || !item.xhms) return null;
  const close = parseNum(item.last);
  if (!Number.isFinite(close) || close === 0) return null;
  const d = item.xymd;
  const h = item.xhms.padStart(6, "0");
  return {
    date: `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)} ${h.slice(0, 2)}:${h.slice(2, 4)}:${h.slice(4, 6)}`,
    open: parseNum(item.open) || close,
    high: parseNum(item.high) || close,
    low: parseNum(item.low) || close,
    close,
    volume: parseNum(item.evol) || 0,
  };
}
