/**
 * Tool 4.6: get_credit_ratio — 신용 공여율/잔고율 + 공매도/대차 보조 지표.
 *
 * 한투 공식 정의 (사용자 확인):
 *   공여율(%) = 해당종목의 융자신규주수 / 해당종목의 당일 거래량 * 100
 *   잔고율(%) = 해당종목의 융자잔고주수 / 해당종목의 신용한도주식수 * 100
 *
 * 위 두 값은 KIS daily-credit-balance API 응답에 이미 산출된 형태
 * (`whol_loan_gvrt`, `whol_loan_rmnd_rate`)로 포함된다. 본 도구는 그 값을
 * 그대로 surface 하고, 정합성 점검을 위해 자체 계산값(공여율 only)도 함께
 * 노출한다.
 *
 * 보조 지표:
 *   - 공매도 거래대금 비중 (daily-short-sale)
 *   - 대차잔고 (daily-loan-trans)
 *
 * ETF: 자체 신용잔고는 통상 0이므로 구성종목의 잔고율을 ETF 비중으로
 * 가중평균하여 집계한다.
 */

import { KIS } from "../kis/endpoints.js";
import type { KisClient } from "../kis/client.js";
import type {
  KisCreditBalanceItem,
  KisLoanTransItem,
  KisResponse,
  KisShortSaleItem,
  KisStockPriceOutput,
} from "../kis/types.js";
import { parseNum } from "../utils/downsample.js";
import { getEtfComponents } from "./etf.js";
import { isExcludedByKeyword } from "../utils/filters.js";
import { isValidSymbol, normalizeSymbol } from "../utils/symbol.js";

export interface GetCreditRatioInput {
  symbol: string;
  /** "stock" | "etf" — auto-detected if omitted. */
  instrumentType?: "stock" | "etf" | "auto";
  /** Lookback days for trends (5~90). Defaults to 30. */
  lookbackDays?: number;
  /** ETF aggregation: how many top constituents to fetch (1~50, default 30). */
  componentLimit?: number;
}

export interface CreditMetrics {
  /** 잔고율(%) = 융자잔고주수 / 신용한도주식수 * 100 (공식, KIS 제공값). */
  balanceRatioPct?: number;
  /** 공여율(%) = 당일 융자신규주수 / 당일 거래량 * 100 (공식, KIS 제공값). */
  contributionRatioPct?: number;
  /** 자체 검산용: 공여율을 raw 필드로 다시 계산한 값. */
  contributionRatioPctComputed?: number;
  loanBalanceShares?: number; // 융자잔고주수
  loanBalanceAmount?: number; // 융자잔고금액
  newLoanShares?: number; // 당일 융자 신규
  redeemedLoanShares?: number; // 당일 융자 상환
  asOfDate?: string;
  sampleDays: number;
  /** 잔고율 N일 평균 — 추세 파악용. */
  avgBalanceRatioPct?: number;
  /** 공여율 N일 평균. */
  avgContributionRatioPct?: number;
}

export interface ShortSaleMetrics {
  asOfDate?: string;
  /** 평균 공매도 거래량 비중(%) — KIS ssts_vol_rlim 평균. */
  avgVolumeRatioPct?: number;
  /** 평균 공매도 거래대금 비중(%) — KIS ssts_tr_pbmn_rlim 평균. */
  avgValueRatioPct?: number;
  latestVolumeRatioPct?: number;
  sampleDays: number;
}

export interface LoanLendingMetrics {
  asOfDate?: string;
  latestBalanceShares?: number;
  latestBalanceAmount?: number;
  sampleDays: number;
}

export interface CreditRatioStock {
  symbol: string;
  /** KIS bstp_kor_isnm (업종 분류명). 종목명이 아님에 주의. */
  sector?: string;
  marketCap?: number;
  credit: CreditMetrics;
  shortSale: ShortSaleMetrics;
  lending: LoanLendingMetrics;
}

export interface CreditRatioEtfAggregate {
  componentsAnalyzed: number;
  componentsSkipped: number;
  weightedAvg: {
    creditBalanceRatioPct?: number;
    creditContributionRatioPct?: number;
    shortValueRatioPct?: number;
  };
  topByCreditBalanceRatio: Array<{
    symbol: string;
    sector?: string;
    weightPct: number;
    balanceRatioPct?: number;
  }>;
  topByShortValueRatio: Array<{
    symbol: string;
    sector?: string;
    weightPct: number;
    shortValueRatioPct?: number;
  }>;
}

export interface CreditRatioResult {
  symbol: string;
  resolvedAs: "stock" | "etf";
  stock?: CreditRatioStock;
  etf?: CreditRatioEtfAggregate;
  notes: string[];
}

// 종목명 또는 KIS sector 필드(bstp_kor_isnm)에 등장하는 ETF/ETN 식별 키워드.
// sector 예: "ETF(실물복제/수익증권)", "ETN", "지수ETF". 종목명 예: "KODEX 200", "TIGER 반도체".
const ETF_NAME_HINTS = [
  "ETF",
  "ETN",
  "KODEX",
  "TIGER",
  "ACE",
  "PLUS",
  "RISE",
  "SOL",
  "ARIRANG",
  "HANARO",
  "KOSEF",
  "SMART",
];

function looksLikeEtfByName(name: string): boolean {
  if (!name) return false;
  const upper = name.toUpperCase();
  return ETF_NAME_HINTS.some((h) => upper.includes(h));
}

function ymd(d: Date): string {
  return `${d.getUTCFullYear()}${(d.getUTCMonth() + 1).toString().padStart(2, "0")}${d
    .getUTCDate()
    .toString()
    .padStart(2, "0")}`;
}

export async function getCreditRatio(
  client: KisClient,
  input: GetCreditRatioInput,
): Promise<CreditRatioResult> {
  const symbol = normalizeSymbol(input.symbol);

  const requested = input.instrumentType ?? "auto";
  const lookbackDays = Math.min(Math.max(input.lookbackDays ?? 30, 5), 90);
  const componentLimit = Math.min(Math.max(input.componentLimit ?? 30, 1), 50);

  const stockMetrics = await fetchStockMetrics(client, symbol, lookbackDays);

  const isLikelyEtf =
    requested === "etf" || (requested === "auto" && looksLikeEtfByName(stockMetrics?.sector ?? ""));

  if (!isLikelyEtf) {
    return {
      symbol,
      resolvedAs: "stock",
      stock: stockMetrics,
      notes: [
        "잔고율(%) = 융자잔고주수 / 신용한도주식수 * 100 (한투 공식 산식, KIS API 제공값)",
        "공여율(%) = 당일 융자신규주수 / 당일 거래량 * 100 (한투 공식 산식, KIS API 제공값)",
        "공매도/대차는 보조 지표입니다.",
      ],
    };
  }

  const components = await getEtfComponents(client, { symbol, limit: componentLimit });
  if (components.totalCount === 0) {
    return {
      symbol,
      resolvedAs: "etf",
      stock: stockMetrics,
      notes: ["ETF 구성종목 정보가 비어있어 집계가 불가능합니다 (파생/합성형 ETF 가능성)."],
    };
  }

  const componentMetrics: Array<CreditRatioStock & { weightPct: number }> = [];
  let skipped = 0;
  for (const c of components.components) {
    if (!isValidSymbol(c.symbol) || isExcludedByKeyword(c.name)) {
      skipped += 1;
      continue;
    }
    try {
      const m = await fetchStockMetrics(client, c.symbol, Math.min(lookbackDays, 14));
      if (m) componentMetrics.push({ ...m, weightPct: c.weightPct });
    } catch {
      skipped += 1;
    }
  }

  const aggregate = aggregateEtf(componentMetrics);
  return {
    symbol,
    resolvedAs: "etf",
    stock: stockMetrics,
    etf: { ...aggregate, componentsAnalyzed: componentMetrics.length, componentsSkipped: skipped },
    notes: [
      `상위 ${componentLimit}개 구성종목의 신용 잔고율/공여율을 ETF 구성비중으로 가중평균 (한투 공식 산식 기준).`,
      "단일 ETF 자체의 신용잔고는 통상 0이므로 구성종목 집계로 대체했습니다.",
    ],
  };
}

async function fetchStockMetrics(
  client: KisClient,
  symbol: string,
  lookbackDays: number,
): Promise<CreditRatioStock | undefined> {
  const today = new Date();
  const start = new Date(today);
  start.setUTCDate(start.getUTCDate() - lookbackDays - 5);

  const [priceRes, creditRes, shortRes, loanRes] = await Promise.all([
    client
      .get<KisStockPriceOutput>({
        path: KIS.stockPrice.path,
        trId: KIS.stockPrice.trIdReal,
        query: { fid_cond_mrkt_div_code: "J", fid_input_iscd: symbol },
      })
      .catch(() => null),
    client
      .get<KisCreditBalanceItem[]>({
        path: KIS.creditBalanceDaily.path,
        trId: KIS.creditBalanceDaily.trIdReal,
        // 공식 명세 (한투 OpenAPI 문서):
        //   fid_cond_mrkt_div_code, fid_cond_scr_div_code(20476), fid_input_iscd, fid_input_date_1
        //   한 번 호출당 최대 30건. fid_input_date_1 은 결제일자.
        query: {
          fid_cond_mrkt_div_code: "J",
          fid_cond_scr_div_code: "20476",
          fid_input_iscd: symbol,
          fid_input_date_1: ymd(today),
        },
      })
      .catch(() => null),
    client
      .get<KisShortSaleItem[]>({
        path: KIS.shortSaleDaily.path,
        trId: KIS.shortSaleDaily.trIdReal,
        query: {
          fid_cond_mrkt_div_code: "J",
          fid_input_iscd: symbol,
          fid_input_date_1: ymd(start),
          fid_input_date_2: ymd(today),
        },
      })
      .catch(() => null),
    client
      .get<KisLoanTransItem[]>({
        path: KIS.loanTransDaily.path,
        trId: KIS.loanTransDaily.trIdReal,
        // 공식 명세 (HHPST074500C0): xlsx Example이 소문자 파라미터를 사용.
        // mrkt_div_cls_code=3 → 종목 단위 조회.
        query: {
          mrkt_div_cls_code: "3",
          mksc_shrn_iscd: symbol,
          start_date: ymd(start),
          end_date: ymd(today),
          cts: "",
        },
      })
      .catch(() => null),
  ]);

  if (!priceRes && !creditRes && !shortRes && !loanRes) return undefined;

  const sector = priceRes?.output?.bstp_kor_isnm;
  const marketCap = parseNum(priceRes?.output?.hts_avls);

  // daily-credit-balance 는 한 번에 최대 30건 반환.
  const creditItems = extractArray<KisCreditBalanceItem>(creditRes ?? undefined).slice(
    0,
    Math.min(lookbackDays, 30),
  );
  const shortItems = extractArray<KisShortSaleItem>(shortRes ?? undefined).slice(0, lookbackDays);
  const loanItems = extractArray<KisLoanTransItem>(loanRes ?? undefined).slice(0, lookbackDays);

  const credit = mapCredit(creditItems);
  const shortSale = mapShortSale(shortItems);
  const lending = mapLending(loanItems);

  return {
    symbol,
    sector,
    marketCap: Number.isFinite(marketCap) ? marketCap : undefined,
    credit,
    shortSale,
    lending,
  };
}

function mapCredit(items: KisCreditBalanceItem[]): CreditMetrics {
  if (!items.length) return { sampleDays: 0 };

  // 한투 응답은 통상 최신 → 과거 순. 가장 최신 항목을 "as of" 로 사용.
  const latest = items[0];

  const balanceRatios = items
    .map((i) => parseNum(i.whol_loan_rmnd_rate))
    .filter(Number.isFinite);
  const contributionRatios = items
    .map((i) => parseNum(i.whol_loan_gvrt))
    .filter(Number.isFinite);

  const newShares = parseNum(latest.whol_loan_new_stcn);
  const dailyVol = parseNum(latest.acml_vol);
  let computed: number | undefined;
  if (Number.isFinite(newShares) && Number.isFinite(dailyVol) && dailyVol > 0) {
    computed = round2((newShares / dailyVol) * 100);
  }

  return {
    asOfDate: latest.deal_date,
    balanceRatioPct: round2OrUndef(parseNum(latest.whol_loan_rmnd_rate)),
    contributionRatioPct: round2OrUndef(parseNum(latest.whol_loan_gvrt)),
    contributionRatioPctComputed: computed,
    loanBalanceShares: numOrUndef(parseNum(latest.whol_loan_rmnd_stcn)),
    // whol_loan_rmnd_amt 단위는 만원 → 원으로 환산
    loanBalanceAmount: numOrUndef(parseNum(latest.whol_loan_rmnd_amt) * 10_000),
    newLoanShares: numOrUndef(newShares),
    redeemedLoanShares: numOrUndef(parseNum(latest.whol_loan_rdmp_stcn)),
    sampleDays: items.length,
    avgBalanceRatioPct: avg(balanceRatios),
    avgContributionRatioPct: avg(contributionRatios),
  };
}

function mapShortSale(items: KisShortSaleItem[]): ShortSaleMetrics {
  if (!items.length) return { sampleDays: 0 };
  const volPcts = items.map((i) => parseNum(i.ssts_vol_rlim)).filter(Number.isFinite);
  const valPcts = items.map((i) => parseNum(i.ssts_tr_pbmn_rlim)).filter(Number.isFinite);
  return {
    asOfDate: items[0].stck_bsop_date,
    avgVolumeRatioPct: avg(volPcts),
    avgValueRatioPct: avg(valPcts),
    latestVolumeRatioPct: round2OrUndef(volPcts[0]),
    sampleDays: items.length,
  };
}

function mapLending(items: KisLoanTransItem[]): LoanLendingMetrics {
  if (!items.length) return { sampleDays: 0 };
  const latest = items[0];
  return {
    asOfDate: latest.bsop_date,
    latestBalanceShares: numOrUndef(parseNum(latest.rmnd_stcn)),
    latestBalanceAmount: numOrUndef(parseNum(latest.rmnd_amt)),
    sampleDays: items.length,
  };
}

function aggregateEtf(metrics: Array<CreditRatioStock & { weightPct: number }>): Omit<
  CreditRatioEtfAggregate,
  "componentsAnalyzed" | "componentsSkipped"
> {
  const wAvg = (vals: Array<number | undefined>) => {
    let num = 0;
    let den = 0;
    metrics.forEach((m, i) => {
      const v = vals[i];
      if (Number.isFinite(v)) {
        num += (v as number) * m.weightPct;
        den += m.weightPct;
      }
    });
    return den > 0 ? round2(num / den) : undefined;
  };

  const topByCreditBalance = [...metrics]
    .filter((m) => Number.isFinite(m.credit.balanceRatioPct))
    .sort((a, b) => (b.credit.balanceRatioPct ?? 0) - (a.credit.balanceRatioPct ?? 0))
    .slice(0, 10)
    .map((m) => ({
      symbol: m.symbol,
      sector: m.sector,
      weightPct: m.weightPct,
      balanceRatioPct: m.credit.balanceRatioPct,
    }));

  const topByShort = [...metrics]
    .filter((m) => Number.isFinite(m.shortSale.avgValueRatioPct))
    .sort((a, b) => (b.shortSale.avgValueRatioPct ?? 0) - (a.shortSale.avgValueRatioPct ?? 0))
    .slice(0, 10)
    .map((m) => ({
      symbol: m.symbol,
      sector: m.sector,
      weightPct: m.weightPct,
      shortValueRatioPct: m.shortSale.avgValueRatioPct,
    }));

  return {
    weightedAvg: {
      creditBalanceRatioPct: wAvg(metrics.map((m) => m.credit.balanceRatioPct)),
      creditContributionRatioPct: wAvg(metrics.map((m) => m.credit.contributionRatioPct)),
      shortValueRatioPct: wAvg(metrics.map((m) => m.shortSale.avgValueRatioPct)),
    },
    topByCreditBalanceRatio: topByCreditBalance,
    topByShortValueRatio: topByShort,
  };
}

function extractArray<T>(res: KisResponse<unknown> | undefined): T[] {
  if (!res) return [];
  for (const c of [res.output, res.output1, res.output2]) {
    if (Array.isArray(c)) return c as T[];
  }
  return [];
}

function avg(nums: number[]): number | undefined {
  if (!nums.length) return undefined;
  return round2(nums.reduce((s, n) => s + n, 0) / nums.length);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function round2OrUndef(n: number): number | undefined {
  return Number.isFinite(n) ? round2(n) : undefined;
}

function numOrUndef(n: number): number | undefined {
  return Number.isFinite(n) ? n : undefined;
}
