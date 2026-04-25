/**
 * 환율 도구: get_fx (현재값) + get_fx_chart (시계열).
 *
 * 한투 OpenAPI에 환율 전용 endpoint는 없고, 다목적 chartprice
 * (FHKST03030100, MRKT=X)를 사용한다. 따라서 "현재값"은 최근 1영업일 차트의 마지막
 * 종가를 추출하는 방식.
 *
 *   alias 매핑은 marketCodes.ts에 위임. ISCD(예: FX@KRW)가 한투 마스터파일에 따라
 *   변동될 수 있으므로 매칭 실패 시 호출자가 master fallback을 시도해야 한다.
 */

import { KIS } from "../kis/endpoints.js";
import type { KisClient } from "../kis/client.js";
import type {
  KisOverseasChartItem,
  KisOverseasChartMeta,
} from "../kis/types.js";
import type { ChartPoint } from "./chart.js";
import { downsample, parseNum } from "../utils/downsample.js";
import { extractArray, extractObject } from "../utils/kisResponse.js";
import { resolveAlias, type MarketAlias } from "../utils/marketCodes.js";

export interface GetFxInput {
  /** USDKRW, 원달러, JPYKRW 등 alias 또는 한투 ISCD raw */
  pair: string;
}

export interface FxResult {
  input: string;
  pair: string;
  resolvedCode: string;
  rate: number;
  /** rate을 항상 소수점 둘째 자리까지 문자열로 표시 (예: "1472.00"). number는 trailing zero 손실. */
  rateFormatted: string;
  change?: number;
  /** change를 소수점 둘째 자리 문자열로 (예: "-0.80"). */
  changeFormatted?: string;
  changeRate?: number;
  asOf: string; // YYYY-MM-DD
  unit?: string; // 통상 "원"
  source: "kis-overseas-chartprice";
  notes?: string[];
}

export type FxPeriod = "1M" | "3M" | "6M" | "1Y" | "3Y" | "5Y" | "YTD";

export interface GetFxChartInput {
  pair: string;
  period?: FxPeriod;
  maxPoints?: number;
}

export interface FxChartResult {
  input: string;
  pair: string;
  resolvedCode: string;
  period: FxPeriod;
  startDate: string;
  endDate: string;
  points: ChartPoint[];
  rawCount: number;
  downsampledTo?: number;
  unit?: string;
  source: "kis-overseas-chartprice";
  notes?: string[];
}

function formatYmd(date: Date): string {
  const y = date.getUTCFullYear().toString().padStart(4, "0");
  const m = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const d = date.getUTCDate().toString().padStart(2, "0");
  return `${y}${m}${d}`;
}

function periodToRange(period: FxPeriod): { startDate: string; endDate: string } {
  const today = new Date();
  const start = new Date(today);
  switch (period) {
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

/** alias 매칭 → fx 카테고리 강제. raw 입력은 fx 카테고리 가정 + ISCD 그대로 사용. */
function resolveFxInput(pair: string): MarketAlias {
  const aliased = resolveAlias(pair);
  if (aliased) {
    if (aliased.category !== "fx") {
      throw new Error(
        `'${pair}'은 ${aliased.category} 카테고리로 매칭됩니다. ` +
          `환율 도구가 아니라 ${
            aliased.category === "index-domestic" || aliased.category === "index-overseas"
              ? "get_index"
              : "get_commodity"
          }를 사용하세요.`,
      );
    }
    return aliased;
  }
  return {
    category: "fx",
    mrkt: "X",
    iscd: pair.trim().toUpperCase(),
    displayName: pair.trim().toUpperCase(),
    unit: "원",
  };
}

export async function getFx(client: KisClient, input: GetFxInput): Promise<FxResult> {
  if (!input?.pair) throw new Error("pair는 필수입니다");
  const alias = resolveFxInput(input.pair);

  // 최근 7일 차트 호출 → 마지막 종가 = 현재값
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

  const items = extractArray<KisOverseasChartItem>(res);
  const points = items
    .map(itemToPoint)
    .filter((p): p is ChartPoint => p !== null)
    .sort((a, b) => a.date.localeCompare(b.date));

  if (points.length === 0) {
    const meta = extractObject<KisOverseasChartMeta>(res);
    if (meta.ovrs_nmix_prpr) {
      const r = parseNum(meta.ovrs_nmix_prpr);
      const c = numOrUndef(parseNum(meta.ovrs_nmix_prdy_vrss));
      return {
        input: input.pair,
        pair: alias.displayName,
        resolvedCode: alias.iscd!,
        rate: r,
        rateFormatted: Number.isFinite(r) ? r.toFixed(2) : "",
        change: c,
        changeFormatted: c !== undefined ? c.toFixed(2) : undefined,
        changeRate: numOrUndef(parseNum(meta.ovrs_nmix_prdy_ctrt)),
        asOf: new Date().toISOString().slice(0, 10),
        unit: alias.unit,
        source: "kis-overseas-chartprice",
        notes: ["일자별 시계열 응답이 비어있어 메타 필드(output1)에서 추출했습니다."],
      };
    }
    throw new Error(
      `환율 '${input.pair}' 응답이 비어있습니다 (resolvedCode=${alias.iscd}). ` +
        `한투 마스터파일에서 환율 ISCD가 변경되었을 수 있습니다.`,
    );
  }

  const last = points[points.length - 1];
  const prev = points.length >= 2 ? points[points.length - 2] : undefined;
  const change = prev ? last.close - prev.close : undefined;
  const changeRate = prev && prev.close !== 0 ? ((change ?? 0) / prev.close) * 100 : undefined;
  const rateRounded = round2(last.close);
  const changeRounded = change !== undefined ? round2(change) : undefined;

  return {
    input: input.pair,
    pair: alias.displayName,
    resolvedCode: alias.iscd!,
    rate: rateRounded,
    rateFormatted: rateRounded.toFixed(2),
    change: changeRounded,
    changeFormatted: changeRounded !== undefined ? changeRounded.toFixed(2) : undefined,
    changeRate: changeRate !== undefined ? round4(changeRate) : undefined,
    asOf: last.date,
    unit: alias.unit,
    source: "kis-overseas-chartprice",
  };
}

export async function getFxChart(
  client: KisClient,
  input: GetFxChartInput,
): Promise<FxChartResult> {
  if (!input?.pair) throw new Error("pair는 필수입니다");
  const period = input.period ?? "1Y";
  const alias = resolveFxInput(input.pair);
  const range = periodToRange(period);

  const res = await client.get<KisOverseasChartItem[]>({
    path: KIS.overseasChartPrice.path,
    trId: KIS.overseasChartPrice.trIdReal,
    query: {
      fid_cond_mrkt_div_code: alias.mrkt!,
      fid_input_iscd: alias.iscd!,
      fid_input_date_1: range.startDate,
      fid_input_date_2: range.endDate,
      fid_period_div_code: periodCode(period),
    },
  });

  const items = extractArray<KisOverseasChartItem>(res);
  const points = items
    .map(itemToPoint)
    .filter((p): p is ChartPoint => p !== null)
    .sort((a, b) => a.date.localeCompare(b.date));
  const cap = Math.min(input.maxPoints ?? 500, 500);
  const downsampled = downsample(points, cap);

  return {
    input: input.pair,
    pair: alias.displayName,
    resolvedCode: alias.iscd!,
    period,
    startDate: range.startDate,
    endDate: range.endDate,
    rawCount: points.length,
    downsampledTo: downsampled.length < points.length ? downsampled.length : undefined,
    points: downsampled,
    unit: alias.unit,
    source: "kis-overseas-chartprice",
  };
}

function periodCode(period: FxPeriod): string {
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
  }
}

function itemToPoint(item: KisOverseasChartItem): ChartPoint | null {
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

function numOrUndef(n: number): number | undefined {
  return Number.isFinite(n) ? n : undefined;
}

function round4(n: number): number {
  return Math.round(n * 10000) / 10000;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
