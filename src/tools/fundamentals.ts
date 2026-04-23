/**
 * Tool 4.5: get_fundamentals — basic financial metrics for a stock.
 * Reuses the stock price endpoint output, which already includes PER/PBR/EPS/BPS,
 * market cap, dividend yield and listed shares.
 */

import { KIS } from "../kis/endpoints.js";
import type { KisClient } from "../kis/client.js";
import type { KisStockPriceOutput } from "../kis/types.js";
import { parseNum } from "../utils/downsample.js";
import { normalizeSymbol } from "../utils/symbol.js";

export interface GetFundamentalsInput {
  symbol: string;
}

export interface FundamentalsResult {
  symbol: string;
  name: string;
  per?: number;
  pbr?: number;
  eps?: number;
  bps?: number;
  marketCap?: number;
  listedShares?: number;
  creditBalanceRatePct?: number; // 전체 융자 잔고 비율 (whol_loan_rmnd_rate)
  volumeTurnoverPct?: number; // 거래량 회전율 (vol_tnrt)
  price: number;
  source: "inquire-price";
}

export async function getFundamentals(
  client: KisClient,
  input: GetFundamentalsInput,
): Promise<FundamentalsResult> {
  const symbol = normalizeSymbol(input.symbol);

  const res = await client.get<KisStockPriceOutput>({
    path: KIS.stockPrice.path,
    trId: KIS.stockPrice.trIdReal,
    query: { fid_cond_mrkt_div_code: "J", fid_input_iscd: symbol },
  });

  const o: Partial<KisStockPriceOutput> = res.output ?? {};
  const def = (n: number) => (Number.isFinite(n) && n !== 0 ? n : undefined);

  return {
    symbol,
    name: o.bstp_kor_isnm ?? "",
    per: def(parseNum(o.per)),
    pbr: def(parseNum(o.pbr)),
    eps: def(parseNum(o.eps)),
    bps: def(parseNum(o.bps)),
    marketCap: def(parseNum(o.hts_avls)),
    listedShares: def(parseNum(o.lstn_stcn)),
    creditBalanceRatePct: def(parseNum(o.whol_loan_rmnd_rate)),
    volumeTurnoverPct: def(parseNum(o.vol_tnrt)),
    price: parseNum(o.stck_prpr),
    source: "inquire-price",
  };
}
