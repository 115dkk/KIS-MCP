import { KIS } from "../kis/endpoints.js";
import type { KisClient } from "../kis/client.js";
import type { KisCreditBalanceItem, KisShortSaleItem } from "../kis/types.js";
import { parseNum } from "../utils/downsample.js";
import { isExcludedByKeyword } from "../utils/filters.js";
import { extractArray, extractArrayPreferred } from "../utils/kisResponse.js";

export type CreditRankKind = "credit_balance" | "short_sale";
export type CreditRankMarket = "all" | "kospi" | "kosdaq" | "kospi200" | "kosdaq150";

export interface GetCreditRankInput {
  kind?: CreditRankKind;
  market?: CreditRankMarket;
  limit?: number;
  sortBy?:
    | "credit_balance_ratio"
    | "credit_balance_shares"
    | "credit_balance_amount"
    | "credit_balance_ratio_increase"
    | "credit_balance_ratio_decrease"
    | "short_sale_value_ratio"
    | "short_sale_volume_ratio";
  lookbackDays?: number;
  excludeEtfLike?: boolean;
}

export interface CreditRankHit {
  symbol: string;
  name: string;
  price?: number;
  change?: number;
  changeRate?: number;
  volume?: number;
  rank?: number;
  creditBalanceShares?: number;
  creditBalanceAmount?: number;
  creditBalanceRatioPct?: number;
  lendingBalanceShares?: number;
  lendingBalanceAmount?: number;
  lendingBalanceRatioPct?: number;
  creditBalanceRatioChangePct?: number;
  lendingBalanceRatioChangePct?: number;
  shortSaleShares?: number;
  shortSaleVolumeRatioPct?: number;
  shortSaleValue?: number;
  shortSaleValueRatioPct?: number;
  averagePrice?: number;
  standardDate1?: string;
  standardDate2?: string;
}

export interface CreditRankResult {
  kind: CreditRankKind;
  market: CreditRankMarket;
  sortBy: NonNullable<GetCreditRankInput["sortBy"]>;
  lookbackDays: number;
  pulled: number;
  hits: CreditRankHit[];
  notes: string[];
}

interface CreditRankItem extends KisCreditBalanceItem {
  mksc_shrn_iscd?: string;
  hts_kor_isnm?: string;
  stck_prpr?: string;
  prdy_vrss?: string;
  prdy_ctrt?: string;
  data_rank?: string;
  nday_vrss_loan_rmnd_inrt?: string;
  nday_vrss_stln_rmnd_inrt?: string;
}

interface ShortSaleRankItem extends KisShortSaleItem {
  mksc_shrn_iscd?: string;
  hts_kor_isnm?: string;
  stck_prpr?: string;
  prdy_vrss?: string;
  prdy_ctrt?: string;
  acml_vol?: string;
  acml_tr_pbmn?: string;
  avrg_prc?: string;
  data_rank?: string;
  stnd_date1?: string;
  stnd_date2?: string;
}

const MARKET_CODE: Record<CreditRankMarket, string> = {
  all: "0000",
  kospi: "0001",
  kosdaq: "1001",
  kospi200: "2001",
  kosdaq150: "3003",
};

const CREDIT_SORT: Record<string, string> = {
  credit_balance_ratio: "0",
  credit_balance_shares: "1",
  credit_balance_amount: "2",
  credit_balance_ratio_increase: "3",
  credit_balance_ratio_decrease: "4",
};

const SHORT_SORT_FALLBACK: NonNullable<GetCreditRankInput["sortBy"]> = "short_sale_value_ratio";

export async function getCreditRank(
  client: KisClient,
  input: GetCreditRankInput,
): Promise<CreditRankResult> {
  const kind = input.kind ?? "credit_balance";
  const market = input.market ?? "all";
  const limit = Math.min(Math.max(input.limit ?? 20, 1), 100);
  const lookbackDays = Math.min(Math.max(input.lookbackDays ?? 1, 1), 90);
  const sortBy = input.sortBy ?? (kind === "credit_balance" ? "credit_balance_ratio" : SHORT_SORT_FALLBACK);

  if (kind === "short_sale") {
    return getShortSaleRank(client, market, limit, lookbackDays, sortBy, input.excludeEtfLike ?? true);
  }
  return getCreditBalanceRank(client, market, limit, lookbackDays, sortBy, input.excludeEtfLike ?? true);
}

async function getCreditBalanceRank(
  client: KisClient,
  market: CreditRankMarket,
  limit: number,
  lookbackDays: number,
  sortBy: NonNullable<GetCreditRankInput["sortBy"]>,
  excludeEtfLike: boolean,
): Promise<CreditRankResult> {
  const sortCode = CREDIT_SORT[sortBy] ?? CREDIT_SORT.credit_balance_ratio;
  const res = await client.get<unknown>({
    path: KIS.creditBalanceRank.path,
    trId: KIS.creditBalanceRank.trIdReal,
    query: {
      fid_cond_scr_div_code: "11701",
      fid_input_iscd: MARKET_CODE[market],
      fid_option: String(Math.min(Math.max(lookbackDays, 2), 999)),
      fid_cond_mrkt_div_code: "J",
      fid_rank_sort_cls_code: sortCode,
    },
  });
  const items = extractArrayPreferred<CreditRankItem>(res, ["output2", "output"]);
  const hits = items.map(mapCreditRank).filter((hit) => !excludeEtfLike || !isExcludedByKeyword(hit.name)).slice(0, limit);
  return {
    kind: "credit_balance",
    market,
    sortBy,
    lookbackDays,
    pulled: items.length,
    hits,
    notes: [
      "credit_balance ranking uses KIS FHKST17010000.",
      "ETF-like inverse/leveraged/derivative names are excluded by default.",
    ],
  };
}

async function getShortSaleRank(
  client: KisClient,
  market: CreditRankMarket,
  limit: number,
  lookbackDays: number,
  sortBy: NonNullable<GetCreditRankInput["sortBy"]>,
  excludeEtfLike: boolean,
): Promise<CreditRankResult> {
  const periodDiv = lookbackDays >= 21 ? "M" : "D";
  const count = periodDiv === "M" ? String(Math.min(Math.max(Math.round(lookbackDays / 21), 1), 3)) : shortSaleDayCount(lookbackDays);
  const res = await client.get<ShortSaleRankItem[]>({
    path: KIS.shortSaleRank.path,
    trId: KIS.shortSaleRank.trIdReal,
    query: {
      fid_aply_rang_vol: "0",
      fid_cond_mrkt_div_code: "J",
      fid_cond_scr_div_code: "20482",
      fid_input_iscd: MARKET_CODE[market],
      fid_period_div_code: periodDiv,
      fid_input_cnt_1: count,
      fid_trgt_exls_cls_code: "0",
      fid_trgt_cls_code: "0",
      fid_aply_rang_prc_1: "",
      fid_aply_rang_prc_2: "",
    },
  });
  const items = extractArray<ShortSaleRankItem>(res);
  const hits = items.map(mapShortSaleRank).filter((hit) => !excludeEtfLike || !isExcludedByKeyword(hit.name));
  hits.sort((a, b) => {
    const av = sortBy === "short_sale_volume_ratio" ? a.shortSaleVolumeRatioPct : a.shortSaleValueRatioPct;
    const bv = sortBy === "short_sale_volume_ratio" ? b.shortSaleVolumeRatioPct : b.shortSaleValueRatioPct;
    return (bv ?? -Infinity) - (av ?? -Infinity);
  });
  return {
    kind: "short_sale",
    market,
    sortBy,
    lookbackDays,
    pulled: items.length,
    hits: hits.slice(0, limit),
    notes: [
      "short_sale ranking uses KIS FHPST04820000.",
      "KIS supports discrete daily/monthly lookback buckets; requested lookbackDays is mapped to the nearest supported bucket.",
    ],
  };
}

function mapCreditRank(item: CreditRankItem, index: number): CreditRankHit {
  return {
    symbol: item.mksc_shrn_iscd ?? "",
    name: item.hts_kor_isnm ?? "",
    price: num(parseNum(item.stck_prpr)),
    change: num(parseNum(item.prdy_vrss)),
    changeRate: num(parseNum(item.prdy_ctrt)),
    volume: num(parseNum(item.acml_vol)),
    rank: num(parseNum(item.data_rank)) ?? index + 1,
    creditBalanceShares: num(parseNum(item.whol_loan_rmnd_stcn)),
    creditBalanceAmount: num(parseNum(item.whol_loan_rmnd_amt)),
    creditBalanceRatioPct: num(parseNum(item.whol_loan_rmnd_rate)),
    lendingBalanceShares: num(parseNum(item.whol_stln_rmnd_stcn)),
    lendingBalanceAmount: num(parseNum(item.whol_stln_rmnd_amt)),
    lendingBalanceRatioPct: num(parseNum(item.whol_stln_rmnd_rate)),
    creditBalanceRatioChangePct: num(parseNum(item.nday_vrss_loan_rmnd_inrt)),
    lendingBalanceRatioChangePct: num(parseNum(item.nday_vrss_stln_rmnd_inrt)),
  };
}

function mapShortSaleRank(item: ShortSaleRankItem, index: number): CreditRankHit {
  return {
    symbol: item.mksc_shrn_iscd ?? "",
    name: item.hts_kor_isnm ?? "",
    price: num(parseNum(item.stck_prpr)),
    change: num(parseNum(item.prdy_vrss)),
    changeRate: num(parseNum(item.prdy_ctrt)),
    volume: num(parseNum(item.acml_vol)),
    rank: num(parseNum(item.data_rank)) ?? index + 1,
    shortSaleShares: num(parseNum(item.ssts_cntg_qty)),
    shortSaleVolumeRatioPct: num(parseNum(item.ssts_vol_rlim)),
    shortSaleValue: num(parseNum(item.ssts_tr_pbmn)),
    shortSaleValueRatioPct: num(parseNum(item.ssts_tr_pbmn_rlim)),
    averagePrice: num(parseNum(item.avrg_prc)),
    standardDate1: item.stnd_date1,
    standardDate2: item.stnd_date2,
  };
}

function shortSaleDayCount(days: number): string {
  if (days <= 1) return "0";
  if (days <= 2) return "1";
  if (days <= 3) return "2";
  if (days <= 4) return "3";
  if (days <= 7) return "4";
  if (days <= 14) return "9";
  return "14";
}

function num(n: number): number | undefined {
  return Number.isFinite(n) ? n : undefined;
}

