/**
 * 원자재 도구: get_commodity (현재값) + get_commodity_chart (시계열).
 *
 * 두 분기:
 *   commodity-futures (WTI, Brent) → 해외선물 endpoint:
 *     - 현재: HHDFC55010000 (overseas-futureoption inquire-price)
 *     - 시계열: HHDFC55020100 (체결추이 일간)
 *     - SRS_CD = base + 월코드(F~Z) + 2자리 연도. nearestFutureContract()로 자동 산출.
 *   commodity-spot (GOLD)         → overseas chartprice:
 *     - FHKST03030100 + MRKT=S + ISCD (예: GC)
 *     - 현재값은 최근 1봉 종가 추출.
 */

import { KIS } from "../kis/endpoints.js";
import type { KisClient } from "../kis/client.js";
import type {
  KisOverseasChartItem,
  KisOverseasChartMeta,
  KisOverseasFuturesChartItem,
  KisOverseasFuturesMinuteItem,
  KisOverseasFuturesMinuteMeta,
  KisOverseasFuturesPriceOutput,
  KisResponse,
} from "../kis/types.js";
import { aggregateMinutes, type ChartPoint, type IntervalMinutes } from "./chart.js";
import { downsample, parseNum } from "../utils/downsample.js";
import {
  nearestFutureContract,
  resolveAlias,
  type MarketAlias,
} from "../utils/marketCodes.js";

const VALID_INTERVALS: IntervalMinutes[] = [1, 3, 5, 10, 15, 30, 60];
const MAX_FUTURES_MINUTE_PAGES = 10; // 페이지당 최대 120건 → 최대 1200 raw points

export interface GetCommodityInput {
  /** WTI, BRENT, GOLD 등 alias 또는 SRS_CD raw (예: CLM26) */
  symbol: string;
}

export interface CommodityResult {
  input: string;
  name: string;
  /** 선물형이면 산출된 contract 코드 (예: CLM26), 현물(GOLD)이면 ISCD */
  resolvedCode: string;
  category: "commodity-futures" | "commodity-spot";
  price: number;
  change?: number;
  changeRate?: number;
  high?: number;
  low?: number;
  open?: number;
  prevClose?: number;
  asOf: string; // YYYY-MM-DD
  unit?: string;
  source: "kis-overseas-futures" | "kis-overseas-chartprice";
  notes?: string[];
}

export type CommodityPeriod = "1M" | "3M" | "6M" | "1Y" | "3Y" | "5Y" | "YTD" | "minute";

export interface GetCommodityChartInput {
  symbol: string;
  period?: CommodityPeriod;
  maxPoints?: number;
  /** 분봉 집계 단위 (period=minute일 때만, commodity-futures만 지원). 기본 1 */
  intervalMinutes?: IntervalMinutes;
}

export interface CommodityChartResult {
  input: string;
  name: string;
  resolvedCode: string;
  category: "commodity-futures" | "commodity-spot";
  period: CommodityPeriod;
  intervalMinutes?: IntervalMinutes;
  startDate: string;
  endDate: string;
  points: ChartPoint[];
  rawCount: number;
  downsampledTo?: number;
  pagesFetched?: number;
  unit?: string;
  source: "kis-overseas-futures" | "kis-overseas-chartprice";
  notes?: string[];
}

function formatYmd(date: Date): string {
  const y = date.getUTCFullYear().toString().padStart(4, "0");
  const m = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const d = date.getUTCDate().toString().padStart(2, "0");
  return `${y}${m}${d}`;
}

function periodToRange(period: CommodityPeriod): { startDate: string; endDate: string } {
  const today = new Date();
  const start = new Date(today);
  switch (period) {
    case "minute":
      // 분봉은 range 의미 없음. 페이지네이션이 종료일자(close) 기준 역방향이라 endDate=today만 의미.
      break;
    case "1M":
      start.setUTCMonth(start.getUTCMonth() - 1);
      break;
    case "3M":
      start.setUTCMonth(start.getUTCMonth() - 3);
      break;
    case "6M":
      start.setUTCMonth(start.getUTCMonth() - 6);
      break;
    case "1Y":
      start.setUTCFullYear(start.getUTCFullYear() - 1);
      break;
    case "3Y":
      start.setUTCFullYear(start.getUTCFullYear() - 3);
      break;
    case "5Y":
      start.setUTCFullYear(start.getUTCFullYear() - 5);
      break;
    case "YTD":
      start.setUTCMonth(0);
      start.setUTCDate(1);
      break;
  }
  return { startDate: formatYmd(start), endDate: formatYmd(today) };
}

/**
 * alias 해석 + raw fallback. raw 입력 휴리스틱:
 *   - 길이 5~6 + base가 영문이면 선물 contract (예: CLM26, LCOM26)
 *   - 그 외(2~3자) → spot (MRKT=S로 가정)
 */
function resolveCommodityInput(symbol: string): { alias: MarketAlias; resolvedCode: string } {
  const aliased = resolveAlias(symbol);
  if (aliased) {
    if (aliased.category !== "commodity-futures" && aliased.category !== "commodity-spot") {
      throw new Error(
        `'${symbol}'은 ${aliased.category} 카테고리로 매칭됩니다. ` +
          `원자재 도구가 아니라 ${
            aliased.category === "fx" ? "get_fx" : "get_index"
          }를 사용하세요.`,
      );
    }
    if (aliased.category === "commodity-futures" && aliased.srsBase) {
      const code = nearestFutureContract(
        aliased.srsBase,
        aliased.contractCadence ?? "monthly",
      );
      return { alias: aliased, resolvedCode: code };
    }
    return { alias: aliased, resolvedCode: aliased.iscd ?? "" };
  }
  // raw fallback
  const trimmed = symbol.trim().toUpperCase();
  if (/^[A-Z]{2,3}[FGHJKMNQUVXZ]\d{2}$/.test(trimmed)) {
    return {
      alias: {
        category: "commodity-futures",
        srsBase: trimmed.replace(/[FGHJKMNQUVXZ]\d{2}$/, ""),
        contractCadence: "monthly",
        displayName: trimmed,
      },
      resolvedCode: trimmed,
    };
  }
  return {
    alias: { category: "commodity-spot", mrkt: "S", iscd: trimmed, displayName: trimmed },
    resolvedCode: trimmed,
  };
}

// ─────────────────────── get_commodity ───────────────────────

export async function getCommodity(
  client: KisClient,
  input: GetCommodityInput,
): Promise<CommodityResult> {
  if (!input?.symbol) throw new Error("symbol은 필수입니다");
  const { alias, resolvedCode } = resolveCommodityInput(input.symbol);

  if (alias.category === "commodity-futures") {
    return fetchFuturesCurrent(client, input.symbol, alias, resolvedCode);
  }
  return fetchSpotCurrent(client, input.symbol, alias, resolvedCode);
}

async function fetchFuturesCurrent(
  client: KisClient,
  inputSymbol: string,
  alias: MarketAlias,
  resolvedCode: string,
): Promise<CommodityResult> {
  // 한투 spec에는 SRS_CD (대문자)지만 실측상 lowercase srs_cd로 호출해야 응답이 옴.
  // 대문자 보내면 HTTP 500 발생. KIS query string 처리의 비공식 동작.
  const res = await client.get<KisOverseasFuturesPriceOutput>({
    path: KIS.overseasFuturesPrice.path,
    trId: KIS.overseasFuturesPrice.trIdReal,
    query: { srs_cd: resolvedCode },
  });
  const o: Partial<KisOverseasFuturesPriceOutput> = res.output1 ?? res.output ?? {};
  const decimals = alias.priceDecimals ?? 0;
  const scale = 10 ** decimals;
  const adj = (raw: string | undefined) => {
    const n = parseNum(raw);
    return Number.isFinite(n) ? n / scale : NaN;
  };
  // last_price가 비면 sttl_price(정산가) → prev_clpr 순으로 fallback.
  // 한투는 만기물 활성도가 낮으면 last_price를 비워 응답함.
  let last = adj(o.last_price);
  let priceSourceNote: string | null = null;
  if (!Number.isFinite(last)) {
    const sttl = adj(o.sttl_price);
    if (Number.isFinite(sttl)) {
      last = sttl;
      priceSourceNote = "last_price 비어 sttl_price(정산가)로 대체.";
    } else {
      const prev = adj(o.prev_clpr);
      if (Number.isFinite(prev)) {
        last = prev;
        priceSourceNote = "last_price/sttl_price 모두 비어 prev_clpr(전일종가)로 대체.";
      }
    }
  }
  const prevClose = adj(o.prev_clpr);
  const change = numOrUndef(adj(o.prdy_vrss));
  const changeRate = numOrUndef(parseNum(o.prdy_ctrt)); // changeRate는 % 단위라 소수점 보정 없음
  const asOf = o.proc_date
    ? `${o.proc_date.slice(0, 4)}-${o.proc_date.slice(4, 6)}-${o.proc_date.slice(6, 8)}`
    : new Date().toISOString().slice(0, 10);

  return {
    input: inputSymbol,
    name: alias.displayName,
    resolvedCode,
    category: "commodity-futures",
    price: last,
    change,
    changeRate,
    high: numOrUndef(adj(o.high_price)),
    low: numOrUndef(adj(o.low_price)),
    open: numOrUndef(adj(o.open_price)),
    prevClose: numOrUndef(prevClose),
    asOf,
    unit: alias.unit,
    source: "kis-overseas-futures",
    notes: [
      `해외선물 SRS_CD '${resolvedCode}'은 가장 가까운 미래 만기물입니다 (자동 산출).`,
      priceSourceNote,
      decimals > 0
        ? `가격은 한투 raw 응답 / 10^${decimals} (sCalcDesz 보정)`
        : null,
      alias.notes,
    ].filter((s): s is string => typeof s === "string" && s.length > 0),
  };
}

async function fetchSpotCurrent(
  client: KisClient,
  inputSymbol: string,
  alias: MarketAlias,
  resolvedCode: string,
): Promise<CommodityResult> {
  const today = new Date();
  const start = new Date(today);
  start.setUTCDate(start.getUTCDate() - 14); // 금시장은 휴장일 많음 → 2주 윈도우

  const res = await client.get<KisOverseasChartItem[] | KisOverseasChartMeta>({
    path: KIS.overseasChartPrice.path,
    trId: KIS.overseasChartPrice.trIdReal,
    query: {
      fid_cond_mrkt_div_code: alias.mrkt!,
      fid_input_iscd: resolvedCode,
      fid_input_date_1: formatYmd(start),
      fid_input_date_2: formatYmd(today),
      fid_period_div_code: "D",
    },
  });

  const items = extractOverseasChartItems(res);
  const points = items
    .map(itemToOverseasPoint)
    .filter((p): p is ChartPoint => p !== null)
    .sort((a, b) => a.date.localeCompare(b.date));

  if (points.length === 0) {
    throw new Error(
      `원자재 '${inputSymbol}' 응답이 비어있습니다 (resolvedCode=${resolvedCode}). ` +
        `한투 마스터파일에서 ISCD가 변경되었을 수 있습니다.`,
    );
  }

  const last = points[points.length - 1];
  const prev = points.length >= 2 ? points[points.length - 2] : undefined;
  const change = prev ? last.close - prev.close : undefined;
  const changeRate = prev && prev.close !== 0 ? ((change ?? 0) / prev.close) * 100 : undefined;

  return {
    input: inputSymbol,
    name: alias.displayName,
    resolvedCode,
    category: "commodity-spot",
    price: last.close,
    change: change !== undefined ? round2(change) : undefined,
    changeRate: changeRate !== undefined ? round2(changeRate) : undefined,
    high: last.high || undefined,
    low: last.low || undefined,
    open: last.open || undefined,
    asOf: last.date,
    unit: alias.unit,
    source: "kis-overseas-chartprice",
    notes: alias.notes ? [alias.notes] : undefined,
  };
}

// ─────────────────────── get_commodity_chart ───────────────────────

export async function getCommodityChart(
  client: KisClient,
  input: GetCommodityChartInput,
): Promise<CommodityChartResult> {
  if (!input?.symbol) throw new Error("symbol은 필수입니다");
  const period = input.period ?? "1Y";
  const { alias, resolvedCode } = resolveCommodityInput(input.symbol);
  const range = periodToRange(period);
  const cap = Math.min(input.maxPoints ?? 500, 500);

  if (period === "minute") {
    if (alias.category !== "commodity-futures") {
      throw new Error(
        `분봉은 해외선물(commodity-futures)에서만 지원합니다. ` +
          `'${input.symbol}'(${alias.category})은 한투에 분봉 endpoint가 없습니다. ` +
          `period=1M 등 일봉 단위로 호출하세요.`,
      );
    }
    const interval = input.intervalMinutes ?? 1;
    if (!VALID_INTERVALS.includes(interval)) {
      throw new Error(
        `intervalMinutes는 ${VALID_INTERVALS.join("/")} 중 하나여야 합니다: ${interval}`,
      );
    }
    return fetchFuturesMinuteChart(client, input.symbol, alias, resolvedCode, range, cap, interval);
  }

  if (alias.category === "commodity-futures") {
    // 한투 daily-ccnl spec: SRS_CD + EXCH_CD + CLOSE_DATE_TIME + QRY_CNT (1회 최대 ~40건).
    // EXCH_CD는 srsBase에 따라 라우팅:
    //   CL/NG/HO/RB    → NYM (NYMEX)
    //   BRN/COCOA/COFFEE → ICE
    //   GC/SI/HG/PA/PL → CMX (COMEX)
    //   소수: CME (지수선물 등)
    const exchCd = exchangeForBase(alias.srsBase ?? resolvedCode);
    const res = await client.get<KisOverseasFuturesChartItem[]>({
      path: KIS.overseasFuturesDailyChart.path,
      trId: KIS.overseasFuturesDailyChart.trIdReal,
      // 한투 query는 lowercase 사용 (대문자는 HTTP 500 유발).
      query: {
        srs_cd: resolvedCode,
        exch_cd: exchCd,
        start_date_time: "",
        close_date_time: range.endDate,
        qry_tp: "Q",
        qry_cnt: "40",
        qry_gap: "",
        index_key: "",
      },
    });
    const items = extractFuturesChartItems(res);
    const decimals = alias.priceDecimals ?? 0;
    const points = items
      .map((it) => itemToFuturesPoint(it, decimals))
      .filter((p): p is ChartPoint => p !== null)
      .sort((a, b) => a.date.localeCompare(b.date));
    const downsampled = downsample(points, cap);
    return {
      input: input.symbol,
      name: alias.displayName,
      resolvedCode,
      category: "commodity-futures",
      period,
      startDate: range.startDate,
      endDate: range.endDate,
      rawCount: points.length,
      downsampledTo: downsampled.length < points.length ? downsampled.length : undefined,
      points: downsampled,
      unit: alias.unit,
      source: "kis-overseas-futures",
      notes: [
        `SRS_CD '${resolvedCode}'은 가장 가까운 미래 만기물입니다. 다른 만기물 시계열은 raw SRS_CD 직접 입력.`,
        "만기물 변경 구간에서는 시계열에 갭/점프가 발생할 수 있습니다.",
        decimals > 0 ? `가격은 한투 raw / 10^${decimals} (sCalcDesz 보정)` : null,
        alias.notes,
      ].filter((s): s is string => typeof s === "string" && s.length > 0),
    };
  }

  // spot (GOLD 등)
  const res = await client.get<KisOverseasChartItem[]>({
    path: KIS.overseasChartPrice.path,
    trId: KIS.overseasChartPrice.trIdReal,
    query: {
      fid_cond_mrkt_div_code: alias.mrkt!,
      fid_input_iscd: resolvedCode,
      fid_input_date_1: range.startDate,
      fid_input_date_2: range.endDate,
      fid_period_div_code: periodCode(period),
    },
  });
  const items = extractOverseasChartItems(res);
  const points = items
    .map(itemToOverseasPoint)
    .filter((p): p is ChartPoint => p !== null)
    .sort((a, b) => a.date.localeCompare(b.date));
  const downsampled = downsample(points, cap);
  return {
    input: input.symbol,
    name: alias.displayName,
    resolvedCode,
    category: "commodity-spot",
    period,
    startDate: range.startDate,
    endDate: range.endDate,
    rawCount: points.length,
    downsampledTo: downsampled.length < points.length ? downsampled.length : undefined,
    points: downsampled,
    unit: alias.unit,
    source: "kis-overseas-chartprice",
    notes: alias.notes ? [alias.notes] : undefined,
  };
}

/**
 * srsBase → 한투 EXCH_CD 매핑.
 *
 * **중요**: 한투 ffcode.mst를 직접 검증한 결과, 거의 모든 해외선물의 EXCH_CD가
 * "CME"로 통일되어 있다 (Energy=CL/BZ/NG, Metals=GC/SI, 지수=ES/NQ 모두 CME).
 * 한투 내부 분류이지 실제 거래소(NYMEX/COMEX/ICE)와 다름. ICE 분류는 일부 (CC/Cocoa).
 */
function exchangeForBase(base: string): string {
  const upper = base.toUpperCase();
  // ICE 카테고리 (한투 마스터 기준)
  if (["CC", "KC", "SB", "CT", "OJ", "RC"].includes(upper)) return "ICE";
  // EUREX
  if (["VG", "FBTP", "FOAT", "FBTS", "FDAX", "FESX"].includes(upper)) return "EUREX";
  // 그 외 모두 CME (한투 통합 분류)
  return "CME";
}

function periodCode(period: CommodityPeriod): string {
  switch (period) {
    case "1M":
    case "3M":
    case "6M":
    case "YTD":
      return "D";
    case "1Y":
      return "W";
    case "3Y":
    case "5Y":
      return "M";
    case "minute":
      throw new Error("minute period는 별도 endpoint를 사용합니다 (이 함수 호출 금지)");
  }
}

function extractOverseasChartItems(
  res: KisResponse<KisOverseasChartItem[] | KisOverseasChartMeta>,
): KisOverseasChartItem[] {
  for (const c of [res.output, res.output1, res.output2]) {
    if (Array.isArray(c)) return c as KisOverseasChartItem[];
  }
  return [];
}

function extractFuturesChartItems(
  res: KisResponse<KisOverseasFuturesChartItem[]>,
): KisOverseasFuturesChartItem[] {
  for (const c of [res.output, res.output1, res.output2]) {
    if (Array.isArray(c)) return c as KisOverseasFuturesChartItem[];
  }
  return [];
}

function itemToOverseasPoint(item: KisOverseasChartItem): ChartPoint | null {
  if (!item.stck_bsop_date) return null;
  const close = parseNum(item.ovrs_nmix_prpr);
  if (!Number.isFinite(close) || close === 0) return null;
  const d = item.stck_bsop_date;
  return {
    date: `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`,
    open: parseNum(item.ovrs_nmix_oprc) || close,
    high: parseNum(item.ovrs_nmix_hgpr) || close,
    low: parseNum(item.ovrs_nmix_lwpr) || close,
    close,
    volume: parseNum(item.acml_vol) || 0,
  };
}

/**
 * 해외선물 분봉 (HHDFC55020400). INDEX_KEY 기반 페이지네이션.
 * - 응답 output1=배열, output2=메타 (일봉 endpoint와 의미 반전됨에 유의)
 * - QRY_TP=Q (최초) → P (다음, INDEX_KEY로 이전 응답의 키)
 * - QRY_GAP=intervalMinutes로 직접 지정 (서버측 집계). 1분이 아니면 클라이언트 집계 불필요.
 *   하지만 일관성을 위해 1분으로 받아서 클라이언트 집계 (집계 결과 동일성 + chart.ts 패턴 통일).
 */
async function fetchFuturesMinuteChart(
  client: KisClient,
  inputSymbol: string,
  alias: MarketAlias,
  resolvedCode: string,
  range: { startDate: string; endDate: string },
  cap: number,
  interval: IntervalMinutes,
): Promise<CommodityChartResult> {
  const exchCd = exchangeForBase(alias.srsBase ?? resolvedCode);
  const decimals = alias.priceDecimals ?? 0;
  const minuteByKey = new Map<string, ChartPoint>();
  let pages = 0;
  let qryTp = "Q";
  let indexKey = "";
  const notes: string[] = [];

  while (pages < MAX_FUTURES_MINUTE_PAGES) {
    pages++;
    const res = await client.get<KisOverseasFuturesMinuteItem[]>({
      path: KIS.overseasFuturesMinuteChart.path,
      trId: KIS.overseasFuturesMinuteChart.trIdReal,
      query: {
        srs_cd: resolvedCode,
        exch_cd: exchCd,
        start_date_time: "",
        close_date_time: range.endDate,
        qry_tp: qryTp,
        qry_cnt: "120",
        qry_gap: "1", // 1분으로 받아 클라이언트 집계
        index_key: indexKey,
      },
    });

    const items = extractFuturesMinuteItems(res);
    if (items.length === 0) break;
    let added = 0;
    for (const it of items) {
      const point = itemToFuturesMinutePoint(it, decimals);
      if (!point) continue;
      const key = `${it.data_date ?? ""}_${it.data_time ?? ""}`;
      if (minuteByKey.has(key)) continue;
      minuteByKey.set(key, point);
      added++;
    }

    // 페이지네이션 키 추출 — output2가 메타 (일봉과 반대)
    const meta = ((res.output2 as unknown) as Partial<KisOverseasFuturesMinuteMeta>) ?? {};
    const nextKey = meta.index_key?.trim();
    if (!nextKey || nextKey === indexKey || added === 0 || items.length < 120) break;
    qryTp = "P";
    indexKey = nextKey;
  }

  if (pages >= MAX_FUTURES_MINUTE_PAGES) {
    notes.push(
      `페이지네이션 상한(${MAX_FUTURES_MINUTE_PAGES}회)에 도달했습니다. 더 긴 범위는 endDate를 줄이거나 intervalMinutes를 키우세요.`,
    );
  }

  const oneMin = Array.from(minuteByKey.values()).sort((a, b) => a.date.localeCompare(b.date));
  const aggregated = interval > 1 ? aggregateMinutes(oneMin, interval) : oneMin;
  const downsampled = downsample(aggregated, cap);

  return {
    input: inputSymbol,
    name: alias.displayName,
    resolvedCode,
    category: "commodity-futures",
    period: "minute",
    intervalMinutes: interval,
    startDate: range.startDate,
    endDate: range.endDate,
    rawCount: aggregated.length,
    downsampledTo: downsampled.length < aggregated.length ? downsampled.length : undefined,
    points: downsampled,
    pagesFetched: pages,
    unit: alias.unit,
    source: "kis-overseas-futures",
    notes: [
      `SRS_CD '${resolvedCode}' 만기물의 분봉입니다.`,
      decimals > 0 ? `가격은 한투 raw / 10^${decimals} (sCalcDesz 보정)` : null,
      ...notes,
    ].filter((s): s is string => typeof s === "string" && s.length > 0),
  };
}

function extractFuturesMinuteItems(
  res: KisResponse<KisOverseasFuturesMinuteItem[]>,
): KisOverseasFuturesMinuteItem[] {
  // 분봉은 output1=배열 (일봉과 반대)
  for (const c of [res.output1, res.output, res.output2]) {
    if (Array.isArray(c)) return c as KisOverseasFuturesMinuteItem[];
  }
  return [];
}

function itemToFuturesMinutePoint(
  item: KisOverseasFuturesMinuteItem,
  priceDecimals: number,
): ChartPoint | null {
  if (!item.data_date || !item.data_time) return null;
  const close = parseNum(item.last_price);
  if (!Number.isFinite(close) || close === 0) return null;
  const scale = 10 ** priceDecimals;
  const adj = (s: string | undefined) => {
    const n = parseNum(s);
    return Number.isFinite(n) ? n / scale : NaN;
  };
  const closeAdj = close / scale;
  const d = item.data_date;
  const h = item.data_time.padStart(6, "0");
  return {
    date: `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)} ${h.slice(0, 2)}:${h.slice(2, 4)}:${h.slice(4, 6)}`,
    open: adj(item.open_price) || closeAdj,
    high: adj(item.high_price) || closeAdj,
    low: adj(item.low_price) || closeAdj,
    close: closeAdj,
    volume: parseNum(item.vol) || 0,
  };
}

function itemToFuturesPoint(
  item: KisOverseasFuturesChartItem,
  priceDecimals: number,
): ChartPoint | null {
  // 한투 daily-ccnl 응답: data_date / open_price / high_price / low_price / last_price / vol
  // 일부 필드는 close_price가 아니라 last_price로 옴.
  const dateStr =
    (item as Record<string, string | undefined>).data_date ?? item.bsop_date ?? item.stck_bsop_date;
  if (!dateStr) return null;
  const last = (item as Record<string, string | undefined>).last_price ?? item.close_price;
  const close = parseNum(last);
  if (!Number.isFinite(close) || close === 0) return null;
  const scale = 10 ** priceDecimals;
  const adj = (s: string | undefined) => {
    const n = parseNum(s);
    return Number.isFinite(n) ? n / scale : NaN;
  };
  const closeAdj = close / scale;
  return {
    date: `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`,
    open: adj(item.open_price) || closeAdj,
    high: adj(item.high_price) || closeAdj,
    low: adj(item.low_price) || closeAdj,
    close: closeAdj,
    volume: parseNum((item as Record<string, string | undefined>).vol ?? item.trad_vol) || 0,
  };
}

function numOrUndef(n: number): number | undefined {
  return Number.isFinite(n) ? n : undefined;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
