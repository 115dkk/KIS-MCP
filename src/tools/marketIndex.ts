/**
 * 지수 도구: get_index (현재값) + get_index_chart (시계열).
 *
 * 국내·해외 지수를 alias("KOSPI", "코스피", "SPX", "NASDAQ" 등)로 받아
 * 한투 API의 적절한 endpoint로 자동 라우팅한다.
 *
 *   국내(MRKT=U) → FHPUP02100000 (현재) / FHPUP02120000 (일·주·월)
 *   해외(MRKT=N) → FHKST03030100 (다목적 chartprice; 최근 1봉으로 현재값 추출)
 */

import { KIS } from "../kis/endpoints.js";
import type { KisClient } from "../kis/client.js";
import type {
  KisIndexDailyChartItem,
  KisIndexMinuteItem,
  KisIndexPriceOutput,
  KisOverseasChartItem,
  KisOverseasChartMeta,
  KisOverseasIndexMinuteItem,
  KisResponse,
} from "../kis/types.js";
import { aggregateMinutes, type ChartPoint, type IntervalMinutes } from "./chart.js";
import { downsample, parseNum } from "../utils/downsample.js";
import { resolveAlias, type MarketAlias } from "../utils/marketCodes.js";

const VALID_INTERVALS: IntervalMinutes[] = [1, 3, 5, 10, 15, 30, 60];

/** 입력 파라미터 — alias 또는 raw ISCD 직접 입력 모두 허용 */
export interface GetIndexInput {
  symbol: string;
}

export interface IndexResult {
  /** 입력 (정규화 전) */
  input: string;
  /** 표준 표시명 (alias가 매칭되면 displayName, 아니면 raw symbol) */
  name: string;
  /** 한투 내부 코드 (디버깅용) */
  resolvedCode: string;
  category: "index-domestic" | "index-overseas";
  value: number;
  change?: number;
  changeRate?: number;
  open?: number;
  high?: number;
  low?: number;
  /** 국내 지수만 제공 (FHPUP02100000 응답에 포함) */
  ytdHigh?: number;
  ytdHighDate?: string;
  ytdLow?: number;
  ytdLowDate?: string;
  /** 국내 지수만: 상승/하락/보합 종목 수 */
  advancing?: number;
  declining?: number;
  unchanged?: number;
  /** 데이터 출처 */
  source: "kis-domestic" | "kis-overseas";
  /** 추가 안내 */
  notes?: string[];
}

export type IndexPeriod = "1M" | "3M" | "6M" | "1Y" | "3Y" | "5Y" | "YTD" | "minute";

export interface GetIndexChartInput {
  symbol: string;
  period?: IndexPeriod;
  /** 최대 반환 포인트 수 (기본 500, 상한 500) */
  maxPoints?: number;
  /** 분봉 집계 단위 (period=minute일 때만). 기본 1 */
  intervalMinutes?: IntervalMinutes;
}

export interface IndexChartResult {
  input: string;
  name: string;
  resolvedCode: string;
  category: "index-domestic" | "index-overseas";
  period: IndexPeriod;
  intervalMinutes?: IntervalMinutes;
  startDate: string;
  endDate: string;
  points: ChartPoint[];
  rawCount: number;
  downsampledTo?: number;
  source: "kis-domestic" | "kis-overseas";
  notes?: string[];
}

// ─────────────────────── 공통 유틸 ───────────────────────

function formatYmd(date: Date): string {
  const y = date.getUTCFullYear().toString().padStart(4, "0");
  const m = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const d = date.getUTCDate().toString().padStart(2, "0");
  return `${y}${m}${d}`;
}

function periodToRange(period: IndexPeriod): { startDate: string; endDate: string } {
  const today = new Date();
  const start = new Date(today);
  switch (period) {
    case "minute":
      // 분봉은 당일만 (range 의미 없음)
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
 * alias 매칭을 시도한 뒤, 매칭 실패면 입력을 raw 코드로 간주.
 * raw 코드는 "0001"~"9999" 같은 4자리 국내 업종코드일 수도 있고,
 * "SPX" 같은 해외 ISCD일 수도 있어서 휴리스틱이 필요.
 *
 * - 4자리 숫자 → 국내(U) 가정
 * - 그 외 → 해외(N) 가정
 *
 * 정확하지 않을 수 있으므로 호출자에게 raw 입력 사용을 권하지 않고 alias 우선.
 */
function resolveIndexInput(symbol: string): MarketAlias {
  const aliased = resolveAlias(symbol);
  if (aliased && (aliased.category === "index-domestic" || aliased.category === "index-overseas")) {
    return aliased;
  }
  if (aliased && aliased.category !== "index-domestic" && aliased.category !== "index-overseas") {
    throw new Error(
      `'${symbol}'은 ${aliased.category} 카테고리로 매칭됩니다. ` +
        `지수 도구 대신 ${aliasErrorHint(aliased.category)} 사용하세요.`,
    );
  }
  // raw fallback
  const trimmed = symbol.trim().toUpperCase();
  if (/^\d{4}$/.test(trimmed)) {
    return {
      category: "index-domestic",
      mrkt: "U",
      iscd: trimmed,
      displayName: trimmed,
    };
  }
  return {
    category: "index-overseas",
    mrkt: "N",
    iscd: trimmed,
    displayName: trimmed,
  };
}

function aliasErrorHint(cat: string): string {
  if (cat === "fx") return "get_fx";
  if (cat.startsWith("commodity")) return "get_commodity";
  return "다른 도구를";
}

// ─────────────────────── get_index ───────────────────────

export async function getIndex(client: KisClient, input: GetIndexInput): Promise<IndexResult> {
  if (!input?.symbol) throw new Error("symbol은 필수입니다");
  const alias = resolveIndexInput(input.symbol);

  if (alias.category === "index-domestic") {
    return fetchDomesticIndex(client, input.symbol, alias);
  }
  return fetchOverseasIndex(client, input.symbol, alias);
}

async function fetchDomesticIndex(
  client: KisClient,
  inputSymbol: string,
  alias: MarketAlias,
): Promise<IndexResult> {
  const res = await client.get<KisIndexPriceOutput>({
    path: KIS.indexPrice.path,
    trId: KIS.indexPrice.trIdReal,
    query: {
      fid_cond_mrkt_div_code: alias.mrkt!,
      fid_input_iscd: alias.iscd!,
    },
  });
  const o: Partial<KisIndexPriceOutput> = res.output ?? {};
  return {
    input: inputSymbol,
    name: alias.displayName,
    resolvedCode: alias.iscd!,
    category: "index-domestic",
    value: parseNum(o.bstp_nmix_prpr),
    change: numOrUndef(parseNum(o.bstp_nmix_prdy_vrss)),
    changeRate: numOrUndef(parseNum(o.bstp_nmix_prdy_ctrt)),
    open: numOrUndef(parseNum(o.bstp_nmix_oprc)),
    high: numOrUndef(parseNum(o.bstp_nmix_hgpr)),
    low: numOrUndef(parseNum(o.bstp_nmix_lwpr)),
    ytdHigh: numOrUndef(parseNum(o.dryy_bstp_nmix_hgpr)),
    ytdHighDate: o.dryy_bstp_nmix_hgpr_date,
    ytdLow: numOrUndef(parseNum(o.dryy_bstp_nmix_lwpr)),
    ytdLowDate: o.dryy_bstp_nmix_lwpr_date,
    advancing: numOrUndef(parseNum(o.ascn_issu_cnt)),
    declining: numOrUndef(parseNum(o.down_issu_cnt)),
    unchanged: numOrUndef(parseNum(o.stnr_issu_cnt)),
    source: "kis-domestic",
  };
}

async function fetchOverseasIndex(
  client: KisClient,
  inputSymbol: string,
  alias: MarketAlias,
): Promise<IndexResult> {
  // 해외지수 "현재값"은 별도 endpoint가 없어 chartprice를 D 단위로 호출 후 마지막 종가 사용.
  // 7일 윈도우 → 휴장 고려.
  const today = new Date();
  const start = new Date(today);
  start.setUTCDate(start.getUTCDate() - 7);
  const res = await client.get<KisOverseasChartItem[] | KisOverseasChartMeta>({
    path: KIS.overseasChartPrice.path,
    trId: KIS.overseasChartPrice.trIdReal,
    query: {
      fid_cond_mrkt_div_code: alias.mrkt!,
      fid_input_iscd: alias.iscd!,
      fid_input_date_1: formatYmd(start),
      fid_input_date_2: formatYmd(today),
      fid_period_div_code: "D",
    },
  });

  const items = extractOverseasChartItems(res);
  // 가장 최근 영업일을 마지막 항목으로 정렬
  const sorted = items
    .map(itemToOverseasPoint)
    .filter((p): p is ChartPoint => p !== null)
    .sort((a, b) => a.date.localeCompare(b.date));

  if (sorted.length === 0) {
    const meta: Partial<KisOverseasChartMeta> = (res.output1 as Partial<KisOverseasChartMeta>) ?? {};
    // output1만이라도 있으면 그걸로
    if (meta.ovrs_nmix_prpr) {
      return {
        input: inputSymbol,
        name: alias.displayName,
        resolvedCode: alias.iscd!,
        category: "index-overseas",
        value: parseNum(meta.ovrs_nmix_prpr),
        change: numOrUndef(parseNum(meta.ovrs_nmix_prdy_vrss)),
        changeRate: numOrUndef(parseNum(meta.ovrs_nmix_prdy_ctrt)),
        source: "kis-overseas",
        notes: ["일자별 시계열 응답이 비어있어 메타 필드(output1)에서 현재값을 추출했습니다."],
      };
    }
    throw new Error(
      `'${inputSymbol}' 해외지수 응답이 비어있습니다 (resolvedCode=${alias.iscd}). ` +
        `한투 마스터파일에서 종목코드가 변경되었을 수 있습니다.`,
    );
  }

  const last = sorted[sorted.length - 1];
  const prev = sorted.length >= 2 ? sorted[sorted.length - 2] : undefined;
  const change = prev ? last.close - prev.close : undefined;
  const changeRate = prev && prev.close !== 0 ? (change! / prev.close) * 100 : undefined;

  return {
    input: inputSymbol,
    name: alias.displayName,
    resolvedCode: alias.iscd!,
    category: "index-overseas",
    value: last.close,
    change: change !== undefined ? round2(change) : undefined,
    changeRate: changeRate !== undefined ? round2(changeRate) : undefined,
    open: last.open || undefined,
    high: last.high || undefined,
    low: last.low || undefined,
    source: "kis-overseas",
    notes: [`해외지수 '현재값'은 ${last.date} 종가입니다 (KIS는 실시간 미지원).`],
  };
}

// ─────────────────────── get_index_chart ───────────────────────

export async function getIndexChart(
  client: KisClient,
  input: GetIndexChartInput,
): Promise<IndexChartResult> {
  if (!input?.symbol) throw new Error("symbol은 필수입니다");
  const period = input.period ?? "1Y";
  const alias = resolveIndexInput(input.symbol);
  const range = periodToRange(period);
  const cap = Math.min(input.maxPoints ?? 500, 500);

  if (period === "minute") {
    const interval = input.intervalMinutes ?? 1;
    if (!VALID_INTERVALS.includes(interval)) {
      throw new Error(
        `intervalMinutes는 ${VALID_INTERVALS.join("/")} 중 하나여야 합니다: ${interval}`,
      );
    }
    if (alias.category === "index-domestic") {
      return fetchDomesticIndexMinute(client, input.symbol, alias, range, cap, interval);
    }
    return fetchOverseasIndexMinute(client, input.symbol, alias, range, cap, interval);
  }

  if (alias.category === "index-domestic") {
    const res = await client.get<KisIndexDailyChartItem[]>({
      path: KIS.indexDailyChart.path,
      trId: KIS.indexDailyChart.trIdReal,
      query: {
        fid_cond_mrkt_div_code: alias.mrkt!,
        fid_input_iscd: alias.iscd!,
        fid_input_date_1: range.startDate,
        fid_input_date_2: range.endDate,
        fid_period_div_code: domesticPeriodCode(period),
      },
    });
    const items = extractDomesticChartItems(res);
    const points = items
      .map(itemToDomesticPoint)
      .filter((p): p is ChartPoint => p !== null)
      .sort((a, b) => a.date.localeCompare(b.date));
    const downsampled = downsample(points, cap);
    return {
      input: input.symbol,
      name: alias.displayName,
      resolvedCode: alias.iscd!,
      category: "index-domestic",
      period,
      startDate: range.startDate,
      endDate: range.endDate,
      rawCount: points.length,
      downsampledTo: downsampled.length < points.length ? downsampled.length : undefined,
      points: downsampled,
      source: "kis-domestic",
      notes: points.length === 100
        ? ["KIS 응답이 100건 cap에 도달. 더 긴 기간이 필요하면 period=W/M로 호출하세요."]
        : undefined,
    };
  }

  // 해외 — overseasChartPrice 사용
  const res = await client.get<KisOverseasChartItem[]>({
    path: KIS.overseasChartPrice.path,
    trId: KIS.overseasChartPrice.trIdReal,
    query: {
      fid_cond_mrkt_div_code: alias.mrkt!,
      fid_input_iscd: alias.iscd!,
      fid_input_date_1: range.startDate,
      fid_input_date_2: range.endDate,
      fid_period_div_code: overseasPeriodCode(period),
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
    resolvedCode: alias.iscd!,
    category: "index-overseas",
    period,
    startDate: range.startDate,
    endDate: range.endDate,
    rawCount: points.length,
    downsampledTo: downsampled.length < points.length ? downsampled.length : undefined,
    points: downsampled,
    source: "kis-overseas",
  };
}

/** 국내 지수 일자별 API는 D/W/M 지원. 1M~6M은 D, 1Y~5Y는 W, YTD는 D 기본. */
function domesticPeriodCode(period: IndexPeriod): string {
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

/** 해외 chartprice는 D/W/M/Y 지원. */
function overseasPeriodCode(period: IndexPeriod): string {
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

// ─────────────────────── get_index_chart (분봉) ───────────────────────

/**
 * 국내 업종지수 분봉 (FHPUP02110200).
 * - FID_INPUT_HOUR_1은 **초 단위** (60=1분, 300=5분 등). 1분봉을 받아서 클라이언트 집계.
 * - 응답에 OHLC 없이 close만. high=low=open=close로 채움.
 * - 페이지네이션 키 없음 → 단일 호출 (당일 데이터만, ~1시간~1영업일 분량).
 */
async function fetchDomesticIndexMinute(
  client: KisClient,
  inputSymbol: string,
  alias: MarketAlias,
  range: { startDate: string; endDate: string },
  cap: number,
  interval: IntervalMinutes,
): Promise<IndexChartResult> {
  const res = await client.get<KisIndexMinuteItem[]>({
    path: KIS.indexMinuteChart.path,
    trId: KIS.indexMinuteChart.trIdReal,
    query: {
      fid_cond_mrkt_div_code: alias.mrkt!,
      fid_input_iscd: alias.iscd!,
      fid_input_hour_1: "60", // 1분(60초)으로 받아 클라이언트 집계
    },
  });
  const items = extractGenericArray<KisIndexMinuteItem>(res);
  const today = new Date().toISOString().slice(0, 10);
  const oneMin = items
    .map((it) => domesticIndexMinuteToPoint(it, today))
    .filter((p): p is ChartPoint => p !== null)
    .sort((a, b) => a.date.localeCompare(b.date));
  const aggregated = interval > 1 ? aggregateMinutes(oneMin, interval) : oneMin;
  const downsampled = downsample(aggregated, cap);
  return {
    input: inputSymbol,
    name: alias.displayName,
    resolvedCode: alias.iscd!,
    category: "index-domestic",
    period: "minute",
    intervalMinutes: interval,
    startDate: range.startDate,
    endDate: range.endDate,
    rawCount: aggregated.length,
    downsampledTo: downsampled.length < aggregated.length ? downsampled.length : undefined,
    points: downsampled,
    source: "kis-domestic",
    notes: [
      "국내 업종지수 분봉 endpoint(FHPUP02110200)는 OHLC를 제공하지 않아 open=high=low=close로 채워집니다.",
      "당일 데이터만 조회 가능 (페이지네이션 미지원).",
    ],
  };
}

/**
 * 해외지수 분봉 (FHKST03030200).
 * - HOUR_CLS=0(정규장), PW_DATA_INCU_YN=Y(과거 포함)
 * - OHLC 있음 (optn_* 필드). 단일 호출.
 */
async function fetchOverseasIndexMinute(
  client: KisClient,
  inputSymbol: string,
  alias: MarketAlias,
  range: { startDate: string; endDate: string },
  cap: number,
  interval: IntervalMinutes,
): Promise<IndexChartResult> {
  const res = await client.get<KisOverseasIndexMinuteItem[]>({
    path: KIS.overseasIndexMinuteChart.path,
    trId: KIS.overseasIndexMinuteChart.trIdReal,
    query: {
      fid_cond_mrkt_div_code: alias.mrkt!,
      fid_input_iscd: alias.iscd!,
      fid_hour_cls_code: "0",
      fid_pw_data_incu_yn: "Y",
    },
  });
  const items = extractGenericArray<KisOverseasIndexMinuteItem>(res);
  const oneMin = items
    .map(overseasIndexMinuteToPoint)
    .filter((p): p is ChartPoint => p !== null)
    .sort((a, b) => a.date.localeCompare(b.date));
  const aggregated = interval > 1 ? aggregateMinutes(oneMin, interval) : oneMin;
  const downsampled = downsample(aggregated, cap);
  return {
    input: inputSymbol,
    name: alias.displayName,
    resolvedCode: alias.iscd!,
    category: "index-overseas",
    period: "minute",
    intervalMinutes: interval,
    startDate: range.startDate,
    endDate: range.endDate,
    rawCount: aggregated.length,
    downsampledTo: downsampled.length < aggregated.length ? downsampled.length : undefined,
    points: downsampled,
    source: "kis-overseas",
    notes: [
      "해외지수 분봉은 단일 호출로 받아오며 페이지네이션 미지원입니다 (한투 명세 기준).",
      "시간은 현지 시간 기준입니다.",
    ],
  };
}

function domesticIndexMinuteToPoint(item: KisIndexMinuteItem, todayYmd: string): ChartPoint | null {
  if (!item.bsop_hour) return null;
  const close = parseNum(item.bstp_nmix_prpr);
  if (!Number.isFinite(close) || close === 0) return null;
  const h = item.bsop_hour.padStart(6, "0");
  return {
    date: `${todayYmd} ${h.slice(0, 2)}:${h.slice(2, 4)}:${h.slice(4, 6)}`,
    open: close,
    high: close,
    low: close,
    close,
    volume: parseNum(item.cntg_vol) || 0,
  };
}

function overseasIndexMinuteToPoint(item: KisOverseasIndexMinuteItem): ChartPoint | null {
  if (!item.stck_bsop_date || !item.stck_cntg_hour) return null;
  const close = parseNum(item.optn_prpr);
  if (!Number.isFinite(close) || close === 0) return null;
  const d = item.stck_bsop_date;
  const h = item.stck_cntg_hour.padStart(6, "0");
  return {
    date: `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)} ${h.slice(0, 2)}:${h.slice(2, 4)}:${h.slice(4, 6)}`,
    open: parseNum(item.optn_oprc) || close,
    high: parseNum(item.optn_hgpr) || close,
    low: parseNum(item.optn_lwpr) || close,
    close,
    volume: parseNum(item.cntg_vol) || 0,
  };
}

function extractGenericArray<T>(res: KisResponse<T[]>): T[] {
  for (const c of [res.output, res.output1, res.output2]) {
    if (Array.isArray(c)) return c as T[];
  }
  return [];
}

// ─────────────────────── 응답 파서 ───────────────────────

function extractDomesticChartItems(
  res: KisResponse<KisIndexDailyChartItem[]>,
): KisIndexDailyChartItem[] {
  for (const c of [res.output, res.output1, res.output2]) {
    if (Array.isArray(c)) return c as KisIndexDailyChartItem[];
  }
  return [];
}

function extractOverseasChartItems(
  res: KisResponse<KisOverseasChartItem[] | KisOverseasChartMeta>,
): KisOverseasChartItem[] {
  for (const c of [res.output, res.output1, res.output2]) {
    if (Array.isArray(c)) return c as KisOverseasChartItem[];
  }
  return [];
}

function itemToDomesticPoint(item: KisIndexDailyChartItem): ChartPoint | null {
  if (!item.stck_bsop_date) return null;
  const close = parseNum(item.bstp_nmix_prpr);
  if (!Number.isFinite(close) || close === 0) return null;
  const d = item.stck_bsop_date;
  return {
    date: `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`,
    open: parseNum(item.bstp_nmix_oprc) || close,
    high: parseNum(item.bstp_nmix_hgpr) || close,
    low: parseNum(item.bstp_nmix_lwpr) || close,
    close,
    volume: parseNum(item.acml_vol) || 0,
  };
}

function itemToOverseasPoint(item: KisOverseasChartItem): ChartPoint | null {
  const dateStr = item.stck_bsop_date;
  if (!dateStr) return null;
  const close = parseNum(item.ovrs_nmix_prpr);
  if (!Number.isFinite(close) || close === 0) return null;
  return {
    date: `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`,
    open: parseNum(item.ovrs_nmix_oprc) || close,
    high: parseNum(item.ovrs_nmix_hgpr) || close,
    low: parseNum(item.ovrs_nmix_lwpr) || close,
    close,
    volume: parseNum(item.acml_vol) || 0,
  };
}

function numOrUndef(n: number): number | undefined {
  return Number.isFinite(n) ? n : undefined;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
