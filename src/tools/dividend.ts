/**
 * Tool: get_dividend — 종목 배당 기록 + TTM 배당수익률 추정.
 *
 * KIS 예탁원 정보 - 배당일정 (HHKDB669102C0) API를 호출하여 최근 N개월
 * 배당 내역을 가져오고, 이를 합산해 현재가 대비 배당수익률(%)을 계산한다.
 *
 *   배당수익률(%) = (최근 12개월 현금배당금 합계) / 현재가 * 100
 *
 * inquire-price 응답에는 배당수익률 필드가 없으므로 본 도구로 보완한다.
 */

import { KIS } from "../kis/endpoints.js";
import type { KisClient } from "../kis/client.js";
import type { KisDividendItem, KisResponse, KisStockPriceOutput } from "../kis/types.js";
import { parseNum } from "../utils/downsample.js";
import { normalizeSymbol } from "../utils/symbol.js";

export interface GetDividendInput {
  symbol: string;
  /** 조회 기간(개월). 기본 12. 최대 36. */
  lookbackMonths?: number;
  /** 0:전체, 1:결산배당, 2:중간배당. 기본 0. */
  dividendKind?: "all" | "settlement" | "interim";
}

export interface DividendRecord {
  recordDate: string;
  payoutDate?: string;
  dividendKind?: string;
  faceValue?: number; // 액면가 (원)
  cashDividendPerShare?: number;
  /**
   * 액면배당률(%) = per_sto_divi_amt / face_val × 100.
   * **시가배당률이 아님에 주의** — Samsung처럼 액면 100원 종목은 566원 배당 시 566%로 표시됨.
   * 시가 기준 배당수익률은 ttmDividendYieldPct (TTM 합계 / 현재가) 또는
   * 본 record의 cashDividendYieldPct (record_date 시점 계산은 추후 확장 시).
   */
  cashDividendRateOfFaceValuePct?: number;
  stockDividendRateOfFaceValuePct?: number;
  isHighDividend?: boolean;
}

export interface DividendResult {
  symbol: string;
  isinName?: string;
  currentPrice?: number;
  ttmCashDividendPerShare?: number;
  ttmDividendYieldPct?: number;
  records: DividendRecord[];
  notes: string[];
}

const KIND_MAP: Record<NonNullable<GetDividendInput["dividendKind"]>, string> = {
  all: "0",
  settlement: "1",
  interim: "2",
};

function ymd(d: Date): string {
  return `${d.getUTCFullYear()}${(d.getUTCMonth() + 1).toString().padStart(2, "0")}${d
    .getUTCDate()
    .toString()
    .padStart(2, "0")}`;
}

export async function getDividend(
  client: KisClient,
  input: GetDividendInput,
): Promise<DividendResult> {
  const symbol = normalizeSymbol(input.symbol);
  const months = Math.min(Math.max(input.lookbackMonths ?? 12, 1), 36);
  const kind = KIND_MAP[input.dividendKind ?? "all"];

  const today = new Date();
  const start = new Date(today);
  start.setUTCMonth(start.getUTCMonth() - months);

  const [divRes, priceRes] = await Promise.all([
    client
      .get<KisDividendItem[] | KisDividendItem>({
        path: KIS.dividendInfo.path,
        trId: KIS.dividendInfo.trIdReal,
        // 공식 명세 (HHKDB669102C0): xlsx Example이 소문자 파라미터를 사용.
        query: {
          cts: "",
          gb1: kind,
          f_dt: ymd(start),
          t_dt: ymd(today),
          sht_cd: symbol,
          high_gb: "",
        },
      })
      .catch(() => null),
    client
      .get<KisStockPriceOutput>({
        path: KIS.stockPrice.path,
        trId: KIS.stockPrice.trIdReal,
        query: { fid_cond_mrkt_div_code: "J", fid_input_iscd: symbol },
      })
      .catch(() => null),
  ]);

  const items = extractItems(divRes ?? undefined);
  const records: DividendRecord[] = items
    .map(toRecord)
    .filter((r): r is DividendRecord => r !== null)
    .sort((a, b) => b.recordDate.localeCompare(a.recordDate));

  const ttmCash = sumTtm(records, today);
  const currentPrice = parseNum(priceRes?.output?.stck_prpr);
  let ttmYield: number | undefined;
  if (Number.isFinite(currentPrice) && currentPrice > 0 && Number.isFinite(ttmCash) && ttmCash > 0) {
    ttmYield = round2((ttmCash / currentPrice) * 100);
  }

  const notes: string[] = [
    "배당수익률(TTM%) = 최근 12개월 현금배당금 합계 / 현재가 * 100 (시가배당률 기준).",
    "각 record의 cashDividendRateOfFaceValuePct는 액면배당률 (배당금/액면가). 시가 기준이 아님.",
    "원천: 예탁원 배당일정 API (HHKDB669102C0). 향후 예정 배당은 포함되지 않을 수 있음.",
  ];
  if (records.length === 0) notes.push("조회 기간 내 배당 기록이 없습니다.");

  return {
    symbol,
    isinName: items[0]?.isin_name,
    currentPrice: Number.isFinite(currentPrice) ? currentPrice : undefined,
    ttmCashDividendPerShare: Number.isFinite(ttmCash) && ttmCash > 0 ? ttmCash : undefined,
    ttmDividendYieldPct: ttmYield,
    records,
    notes,
  };
}

function extractItems(res: KisResponse<KisDividendItem[] | KisDividendItem> | undefined): KisDividendItem[] {
  if (!res) return [];
  for (const c of [res.output, res.output1, res.output2]) {
    if (Array.isArray(c)) return c as KisDividendItem[];
  }
  if (res.output1 && typeof res.output1 === "object" && !Array.isArray(res.output1)) {
    return [res.output1 as KisDividendItem];
  }
  return [];
}

function toRecord(item: KisDividendItem): DividendRecord | null {
  if (!item.record_date) return null;
  return {
    recordDate: item.record_date,
    payoutDate: item.divi_pay_dt,
    dividendKind: item.divi_kind,
    faceValue: numOrUndef(parseNum(item.face_val)),
    cashDividendPerShare: numOrUndef(parseNum(item.per_sto_divi_amt)),
    cashDividendRateOfFaceValuePct: numOrUndef(parseNum(item.divi_rate)),
    stockDividendRateOfFaceValuePct: numOrUndef(parseNum(item.stk_divi_rate)),
    isHighDividend: item.high_divi_gb === "Y",
  };
}

function sumTtm(records: DividendRecord[], today: Date): number {
  const oneYearAgo = new Date(today);
  oneYearAgo.setUTCFullYear(oneYearAgo.getUTCFullYear() - 1);
  const cutoff = ymd(oneYearAgo);
  let sum = 0;
  for (const r of records) {
    if (r.recordDate >= cutoff && Number.isFinite(r.cashDividendPerShare)) {
      sum += r.cashDividendPerShare ?? 0;
    }
  }
  return sum;
}

function numOrUndef(n: number): number | undefined {
  return Number.isFinite(n) && n !== 0 ? n : undefined;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
