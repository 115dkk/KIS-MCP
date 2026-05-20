import { KIS } from "../kis/endpoints.js";
import type { KisClient } from "../kis/client.js";
import { parseNum } from "../utils/downsample.js";
import { extractArray, extractObjectPreferred } from "../utils/kisResponse.js";
import { currentBusinessYmdKst, shiftBusinessMonthsYmd, normalizeBusinessRange } from "../utils/businessDay.js";
import { normalizeSymbol } from "../utils/symbol.js";

export type EtfNavMode = "snapshot" | "daily" | "minute";

export interface GetEtfNavTrendInput {
  symbol: string;
  mode?: EtfNavMode;
  startDate?: string;
  endDate?: string;
  intervalMinutes?: 1 | 3 | 5 | 10 | 15 | 30 | 60 | 120;
  maxPoints?: number;
}

export interface EtfNavSnapshot {
  price?: number;
  change?: number;
  changeRate?: number;
  volume?: number;
  tradingValue?: number;
  prevClose?: number;
  open?: number;
  high?: number;
  low?: number;
  nav?: number;
  navChange?: number;
  navChangeRate?: number;
  navPrevClose?: number;
  navOpen?: number;
  navHigh?: number;
  navLow?: number;
  discountPct?: number;
}

export interface EtfNavPoint {
  date: string;
  price?: number;
  nav?: number;
  discountPct?: number;
  navDiff?: number;
  change?: number;
  changeRate?: number;
  volume?: number;
  tradeVolume?: number;
}

export interface EtfNavTrendResult {
  symbol: string;
  mode: EtfNavMode;
  startDate?: string;
  endDate?: string;
  intervalMinutes?: number;
  snapshot?: EtfNavSnapshot;
  points?: EtfNavPoint[];
  rawCount?: number;
  downsampledTo?: number;
  notes?: string[];
}

interface EtfNavSnapshotPrice {
  stck_prpr?: string;
  prdy_vrss?: string;
  prdy_ctrt?: string;
  acml_vol?: string;
  acml_tr_pbmn?: string;
  stck_prdy_clpr?: string;
  stck_oprc?: string;
  stck_hgpr?: string;
  stck_lwpr?: string;
  [key: string]: string | undefined;
}

interface EtfNavSnapshotNav {
  nav?: string;
  nav_prdy_vrss?: string;
  nav_prdy_ctrt?: string;
  prdy_clpr_nav?: string;
  oprc_nav?: string;
  hprc_nav?: string;
  lprc_nav?: string;
  dprt?: string;
  [key: string]: string | undefined;
}

interface EtfNavDailyItem {
  stck_bsop_date?: string;
  stck_clpr?: string;
  prdy_vrss?: string;
  prdy_ctrt?: string;
  acml_vol?: string;
  cntg_vol?: string;
  dprt?: string;
  nav_vrss_prpr?: string;
  nav?: string;
  [key: string]: string | undefined;
}

interface EtfNavMinuteItem {
  bsop_hour?: string;
  stck_prpr?: string;
  prdy_vrss?: string;
  prdy_ctrt?: string;
  acml_vol?: string;
  cntg_vol?: string;
  dprt?: string;
  nav_vrss_prpr?: string;
  nav?: string;
  [key: string]: string | undefined;
}

const MAX_POINTS = 500;

export async function getEtfNavTrend(
  client: KisClient,
  input: GetEtfNavTrendInput,
): Promise<EtfNavTrendResult> {
  const symbol = normalizeSymbol(input.symbol);
  const mode = input.mode ?? "snapshot";
  if (mode === "snapshot") return getSnapshot(client, symbol);
  if (mode === "daily") return getDailyTrend(client, symbol, input);
  return getMinuteTrend(client, symbol, input);
}

async function getSnapshot(client: KisClient, symbol: string): Promise<EtfNavTrendResult> {
  const res = await client.get<unknown>({
    path: KIS.etfNavSnapshot.path,
    trId: KIS.etfNavSnapshot.trIdReal,
    query: { fid_cond_mrkt_div_code: "J", fid_input_iscd: symbol },
  });
  const price = extractObjectPreferred<EtfNavSnapshotPrice>(res, ["output1", "output"]);
  const nav = extractObjectPreferred<EtfNavSnapshotNav>(res, ["output2", "output"]);
  return {
    symbol,
    mode: "snapshot",
    snapshot: {
      price: num(parseNum(price.stck_prpr)),
      change: num(parseNum(price.prdy_vrss)),
      changeRate: num(parseNum(price.prdy_ctrt)),
      volume: num(parseNum(price.acml_vol)),
      tradingValue: num(parseNum(price.acml_tr_pbmn)),
      prevClose: num(parseNum(price.stck_prdy_clpr)),
      open: num(parseNum(price.stck_oprc)),
      high: num(parseNum(price.stck_hgpr)),
      low: num(parseNum(price.stck_lwpr)),
      nav: num(parseNum(nav.nav)),
      navChange: num(parseNum(nav.nav_prdy_vrss)),
      navChangeRate: num(parseNum(nav.nav_prdy_ctrt)),
      navPrevClose: num(parseNum(nav.prdy_clpr_nav)),
      navOpen: num(parseNum(nav.oprc_nav)),
      navHigh: num(parseNum(nav.hprc_nav)),
      navLow: num(parseNum(nav.lprc_nav)),
      discountPct: num(parseNum(nav.dprt)),
    },
  };
}

async function getDailyTrend(
  client: KisClient,
  symbol: string,
  input: GetEtfNavTrendInput,
): Promise<EtfNavTrendResult> {
  const endDate = input.endDate ?? currentBusinessYmdKst();
  const startDate = input.startDate ?? shiftBusinessMonthsYmd(endDate, -1);
  const range = normalizeBusinessRange(startDate, endDate);
  const res = await client.get<EtfNavDailyItem[]>({
    path: KIS.etfNavDailyTrend.path,
    trId: KIS.etfNavDailyTrend.trIdReal,
    query: {
      fid_cond_mrkt_div_code: "J",
      fid_input_iscd: symbol,
      fid_input_date_1: range.startDate,
      fid_input_date_2: range.endDate,
    },
  });
  const points = extractArray<EtfNavDailyItem>(res)
    .map(dailyPoint)
    .filter((p): p is EtfNavPoint => p !== null)
    .sort((a, b) => a.date.localeCompare(b.date));
  const cap = Math.min(input.maxPoints ?? MAX_POINTS, MAX_POINTS);
  const sliced = points.length > cap ? downsample(points, cap) : points;
  return {
    symbol,
    mode: "daily",
    startDate: range.startDate,
    endDate: range.endDate,
    points: sliced,
    rawCount: points.length,
    downsampledTo: sliced.length < points.length ? sliced.length : undefined,
  };
}

async function getMinuteTrend(
  client: KisClient,
  symbol: string,
  input: GetEtfNavTrendInput,
): Promise<EtfNavTrendResult> {
  const interval = input.intervalMinutes ?? 1;
  const seconds = String(interval * 60);
  const res = await client.get<EtfNavMinuteItem[]>({
    path: KIS.etfNavTimeTrend.path,
    trId: KIS.etfNavTimeTrend.trIdReal,
    query: {
      fid_cond_mrkt_div_code: "E",
      fid_input_iscd: symbol,
      fid_hour_cls_code: seconds,
    },
  });
  const today = currentBusinessYmdKst();
  const points = extractArray<EtfNavMinuteItem>(res)
    .map((item) => minutePoint(item, today))
    .filter((p): p is EtfNavPoint => p !== null)
    .sort((a, b) => a.date.localeCompare(b.date));
  const cap = Math.min(input.maxPoints ?? MAX_POINTS, MAX_POINTS);
  const sliced = points.length > cap ? downsample(points, cap) : points;
  return {
    symbol,
    mode: "minute",
    startDate: today,
    endDate: today,
    intervalMinutes: interval,
    points: sliced,
    rawCount: points.length,
    downsampledTo: sliced.length < points.length ? sliced.length : undefined,
    notes: ["Minute NAV trend is provided by KIS for the current trading day only."],
  };
}

function dailyPoint(item: EtfNavDailyItem): EtfNavPoint | null {
  if (!item.stck_bsop_date) return null;
  const d = item.stck_bsop_date;
  return {
    date: `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`,
    price: num(parseNum(item.stck_clpr)),
    nav: num(parseNum(item.nav)),
    discountPct: num(parseNum(item.dprt)),
    navDiff: num(parseNum(item.nav_vrss_prpr)),
    change: num(parseNum(item.prdy_vrss)),
    changeRate: num(parseNum(item.prdy_ctrt)),
    volume: num(parseNum(item.acml_vol)),
    tradeVolume: num(parseNum(item.cntg_vol)),
  };
}

function minutePoint(item: EtfNavMinuteItem, today: string): EtfNavPoint | null {
  if (!item.bsop_hour) return null;
  const h = item.bsop_hour.padStart(6, "0");
  return {
    date: `${today.slice(0, 4)}-${today.slice(4, 6)}-${today.slice(6, 8)} ${h.slice(0, 2)}:${h.slice(2, 4)}:${h.slice(4, 6)}`,
    price: num(parseNum(item.stck_prpr)),
    nav: num(parseNum(item.nav)),
    discountPct: num(parseNum(item.dprt)),
    navDiff: num(parseNum(item.nav_vrss_prpr)),
    change: num(parseNum(item.prdy_vrss)),
    changeRate: num(parseNum(item.prdy_ctrt)),
    volume: num(parseNum(item.acml_vol)),
    tradeVolume: num(parseNum(item.cntg_vol)),
  };
}

function downsample<T>(items: T[], cap: number): T[] {
  if (items.length <= cap) return items;
  const result: T[] = [];
  const last = items.length - 1;
  for (let i = 0; i < cap; i++) {
    result.push(items[Math.round((i * last) / (cap - 1))]);
  }
  return result;
}

function num(n: number): number | undefined {
  return Number.isFinite(n) ? n : undefined;
}
