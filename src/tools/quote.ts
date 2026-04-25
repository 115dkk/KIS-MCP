/**
 * Tool 4.1: get_quote — current price/snapshot for a stock or ETF.
 *
 * 주식과 ETF는 KIS 응답 스키마가 다르다 (PER/PBR 유무, 시총 vs 순자산총액,
 * 52주 vs 연중 최고/최저). 결과 타입은 단일이지만 ETF 분기에서는 etfMetrics가
 * 채워지고, 주식 분기에서는 fundamentals가 채워진다.
 */

import { KIS } from "../kis/endpoints.js";
import type { KisClient } from "../kis/client.js";
import type { KisEtfPriceOutput, KisStockPriceOutput } from "../kis/types.js";
import { parseNum } from "../utils/downsample.js";
import { findByCode } from "../utils/symbolIndex.js";
import { normalizeSymbol } from "../utils/symbol.js";

export type InstrumentType = "stock" | "etf" | "auto";

export interface GetQuoteInput {
  symbol: string;
  instrumentType?: InstrumentType;
}

export interface QuoteResult {
  symbol: string;
  /** 업종/카테고리 분류명. KIS inquire-price는 종목명을 직접 반환하지 않음. */
  sector: string;
  market: string;
  price: number;
  change: number;
  changeRate: number;
  changeSign: string;
  volume: number;
  open: number;
  high: number;
  low: number;
  upperLimit: number;
  lowerLimit: number;
  /** 주식: 52주 최고가 (w52_hgpr). ETF: 연중 최고가 (stck_dryy_hgpr). */
  yearHigh?: number;
  yearLow?: number;
  /** YYYYMMDD. KIS가 함께 반환하므로 사용자가 시점을 확인할 수 있음. */
  yearHighDate?: string;
  yearLowDate?: string;
  fundamentals?: StockFundamentals;
  etfMetrics?: EtfMetrics;
  resolvedAs: "stock" | "etf";
}

export interface StockFundamentals {
  per?: number;
  pbr?: number;
  eps?: number;
  bps?: number;
  marketCap?: number; // hts_avls (단위는 KIS 정의)
  listedShares?: number;
  creditBalanceRatePct?: number;
  volumeTurnoverPct?: number;
  tradingValue?: number; // acml_tr_pbmn
}

export interface EtfMetrics {
  nav?: number;
  navPrevClose?: number;
  navChangeRate?: number;
  /** 괴리율 (현재가 vs NAV, %). dprt. */
  discountPct?: number;
  /** 추적 오차율 % */
  trackingErrorPct?: number;
  netAssets?: number; // etf_ntas_ttam
  listedShares?: number;
  componentCount?: number;
  dividendCycle?: string;
  lpHoldingRatePct?: number;
  foreignHoldingRatePct?: number;
  representativeSector?: string;
}

function isEtfMarket(name: string | undefined): boolean {
  if (!name) return false;
  const upper = name.toUpperCase();
  return upper.includes("ETF") || upper.includes("ETN");
}

export async function getQuote(client: KisClient, input: GetQuoteInput): Promise<QuoteResult> {
  const symbol = normalizeSymbol(input.symbol);
  const requested: InstrumentType = input.instrumentType ?? "auto";

  if (requested === "etf") {
    return fetchEtfQuote(client, symbol);
  }

  // M0-5: auto 모드일 때 마스터 인덱스로 사전 감지하여 1회 호출로 단축.
  // 마스터에 EF/EN/BC 분류로 등록된 종목이면 stock API 호출을 건너뛰고
  // ETF API로 직행 (기존: stock API 호출 → 응답 검사 → ETF API 재호출, 2회).
  if (requested === "auto") {
    const rec = findByCode(symbol);
    if (rec && (rec.type === "EF" || rec.type === "EN" || rec.type === "BC")) {
      return fetchEtfQuote(client, symbol);
    }
    // 마스터에 없으면 신규 상장 가능성 → 기존 fallback 진행
  }

  // requested === "stock" or "auto" (마스터에 ST 또는 미존재):
  // inquire-price (FHKST01010100)는 ETF 종목코드에도 응답을 주지만 rprs_mrkt_kor_name이
  // "ETF"/"ETN"으로 구분된다. auto일 때는 응답 검사 후 필요시 etfPrice로 재호출.
  const stockRes = await client.get<KisStockPriceOutput>({
    path: KIS.stockPrice.path,
    trId: KIS.stockPrice.trIdReal,
    query: { fid_cond_mrkt_div_code: "J", fid_input_iscd: symbol },
  });
  const stockOutput: Partial<KisStockPriceOutput> = stockRes.output ?? {};
  if (requested === "auto" && isEtfMarket(stockOutput.rprs_mrkt_kor_name)) {
    return fetchEtfQuote(client, symbol);
  }
  return mapStockOutput(symbol, stockOutput);
}

async function fetchEtfQuote(client: KisClient, symbol: string): Promise<QuoteResult> {
  const res = await client.get<KisEtfPriceOutput>({
    path: KIS.etfPrice.path,
    trId: KIS.etfPrice.trIdReal,
    query: { fid_cond_mrkt_div_code: "J", fid_input_iscd: symbol },
  });
  return mapEtfOutput(symbol, res.output ?? {});
}

function mapStockOutput(symbol: string, o: Partial<KisStockPriceOutput>): QuoteResult {
  const fundamentals: StockFundamentals = pruneNumeric({
    per: parseNum(o.per),
    pbr: parseNum(o.pbr),
    eps: parseNum(o.eps),
    bps: parseNum(o.bps),
    marketCap: parseNum(o.hts_avls),
    listedShares: parseNum(o.lstn_stcn),
    creditBalanceRatePct: parseNum(o.whol_loan_rmnd_rate),
    volumeTurnoverPct: parseNum(o.vol_tnrt),
    tradingValue: parseNum(o.acml_tr_pbmn),
  });

  return {
    symbol,
    sector: o.bstp_kor_isnm ?? "",
    market: o.rprs_mrkt_kor_name ?? "",
    price: parseNum(o.stck_prpr),
    change: parseNum(o.prdy_vrss),
    changeRate: parseNum(o.prdy_ctrt),
    changeSign: o.prdy_vrss_sign ?? "",
    volume: parseNum(o.acml_vol),
    open: parseNum(o.stck_oprc),
    high: parseNum(o.stck_hgpr),
    low: parseNum(o.stck_lwpr),
    upperLimit: parseNum(o.stck_mxpr),
    lowerLimit: parseNum(o.stck_llam),
    yearHigh: numOrUndef(parseNum(o.w52_hgpr)),
    yearLow: numOrUndef(parseNum(o.w52_lwpr)),
    yearHighDate: o.w52_hgpr_date,
    yearLowDate: o.w52_lwpr_date,
    fundamentals: Object.keys(fundamentals).length ? fundamentals : undefined,
    resolvedAs: "stock",
  };
}

function mapEtfOutput(symbol: string, o: Partial<KisEtfPriceOutput>): QuoteResult {
  const etfMetrics: EtfMetrics = pruneNumeric({
    nav: parseNum(o.nav),
    navPrevClose: parseNum(o.prdy_last_nav),
    navChangeRate: parseNum(o.nav_prdy_ctrt),
    discountPct: parseNum(o.dprt),
    trackingErrorPct: parseNum(o.trc_errt),
    netAssets: parseNum(o.etf_ntas_ttam),
    listedShares: parseNum(o.lstn_stcn),
    componentCount: parseNum(o.etf_cnfg_issu_cnt),
    lpHoldingRatePct: parseNum(o.lp_hldn_rate),
    foreignHoldingRatePct: parseNum(o.frgn_hldn_qty_rate),
  });
  if (o.etf_dvdn_cycl) etfMetrics.dividendCycle = o.etf_dvdn_cycl;
  if (o.etf_rprs_bstp_kor_isnm) etfMetrics.representativeSector = o.etf_rprs_bstp_kor_isnm;

  return {
    symbol,
    sector: o.bstp_kor_isnm ?? "",
    market: "",
    price: parseNum(o.stck_prpr),
    change: parseNum(o.prdy_vrss),
    changeRate: parseNum(o.prdy_ctrt),
    changeSign: o.prdy_vrss_sign ?? "",
    volume: parseNum(o.acml_vol),
    open: parseNum(o.stck_oprc),
    high: parseNum(o.stck_hgpr),
    low: parseNum(o.stck_lwpr),
    upperLimit: parseNum(o.stck_mxpr),
    lowerLimit: parseNum(o.stck_llam),
    yearHigh: numOrUndef(parseNum(o.stck_dryy_hgpr)),
    yearLow: numOrUndef(parseNum(o.stck_dryy_lwpr)),
    yearHighDate: o.dryy_hgpr_date,
    yearLowDate: o.dryy_lwpr_date,
    etfMetrics: Object.keys(etfMetrics).length ? etfMetrics : undefined,
    resolvedAs: "etf",
  };
}

function pruneNumeric<T extends Record<string, number | undefined | string>>(obj: T): T {
  const out: Record<string, number | string> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === "string" && v) out[k] = v;
    else if (typeof v === "number" && Number.isFinite(v) && v !== 0) out[k] = v;
  }
  return out as T;
}

function numOrUndef(n: number): number | undefined {
  return Number.isFinite(n) && n !== 0 ? n : undefined;
}
