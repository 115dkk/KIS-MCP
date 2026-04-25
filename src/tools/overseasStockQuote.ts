/**
 * Tool (M2): get_overseas_stock_quote — 해외 개별주식 현재가 스냅샷.
 *
 * 1차 데이터 소스: 복수종목 시세조회 (HHDFS76220000)를 NREC=1 단일 종목 모드로 사용.
 *   - 단일 가격 endpoint(HHDFS00000300)는 OHLC와 52주 고저를 제공하지 않음.
 *   - multprice는 Open/High/Low/Close + 52주 + 시가총액 + 상장주식수까지 1회 호출.
 *
 * 시장 코드 (EXCD):
 *   NAS: 나스닥, NYS: 뉴욕, AMS: 아멕스
 *   TSE: 도쿄, HKS: 홍콩
 *   SHS: 상해, SZS: 심천
 *   HSX: 호치민, HNX: 하노이
 */

import { KIS } from "../kis/endpoints.js";
import type { KisClient } from "../kis/client.js";
import type {
  KisOverseasStockMultiPriceItem,
} from "../kis/types.js";
import { parseNum } from "../utils/downsample.js";
import { extractArrayPreferred } from "../utils/kisResponse.js";

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

const VALID_MARKETS: OverseasMarket[] = [
  "NAS",
  "NYS",
  "AMS",
  "TSE",
  "HKS",
  "SHS",
  "SZS",
  "HSX",
  "HNX",
];

export interface GetOverseasStockQuoteInput {
  market: OverseasMarket;
  symbol: string;
}

export interface OverseasStockQuoteResult {
  market: OverseasMarket;
  symbol: string;
  /** D + 시장(3자) + 종목 (예: DNASTSLA) */
  rsym?: string;
  nameKo?: string;
  exchangeName?: string;
  countryName?: string;
  currency?: string;
  /** 가격 소수점 자릿수 (zdiv). 응답값은 이미 number로 변환. */
  priceDecimals?: number;
  /** 현재가. */
  price: number;
  /** 전일 대비. */
  change: number;
  /** 등락률 %. */
  changeRate: number;
  /** 1:상한 2:상승 3:보합 4:하한 5:하락 */
  changeSign?: string;
  open?: number;
  high?: number;
  low?: number;
  prevClose?: number;
  prevVolume?: number;
  volume?: number;
  tradingValue?: number;
  marketCap?: number;
  listedShares?: number;
  /** 52주 최고/최저 + 일자. */
  yearHigh?: number;
  yearLow?: number;
  yearHighDate?: string;
  yearLowDate?: string;
  /** 연중 최고/최저 (아시아 시장은 보통 비어있음). */
  annualHigh?: number;
  annualLow?: number;
  /** 원환산 당일가격 (KIS 환율 기반). */
  priceInKrw?: number;
  source: "kis-overseas-stock-multprice";
  notes?: string[];
}

export async function getOverseasStockQuote(
  client: KisClient,
  input: GetOverseasStockQuoteInput,
): Promise<OverseasStockQuoteResult> {
  if (!input?.market) throw new Error("market은 필수입니다");
  if (!input?.symbol) throw new Error("symbol은 필수입니다");
  if (!VALID_MARKETS.includes(input.market)) {
    throw new Error(
      `market은 ${VALID_MARKETS.join("/")} 중 하나여야 합니다: ${input.market}`,
    );
  }
  const symbol = input.symbol.trim().toUpperCase();

  // 단일 종목 모드: NREC=1, EXCD_01/SYMB_01만 채움. 나머지 슬롯은 빈 문자열.
  // KIS multprice는 슬롯 비어 있어도 동작.
  const query: Record<string, string> = {
    AUTH: "",
    NREC: "1",
    EXCD_01: input.market,
    SYMB_01: symbol,
  };
  // 나머지 9개 슬롯은 빈 문자열로 채움 (생략해도 동작하나 명시적으로)
  for (let i = 2; i <= 10; i++) {
    const idx = i.toString().padStart(2, "0");
    query[`EXCD_${idx}`] = "";
    query[`SYMB_${idx}`] = "";
  }

  const res = await client.get<KisOverseasStockMultiPriceItem[]>({
    path: KIS.overseasStockMultiPrice.path,
    trId: KIS.overseasStockMultiPrice.trIdReal,
    query,
  });

  // multprice는 output2가 배열이지만 일부 응답에서 output에도 옴.
  const items = extractArrayPreferred<KisOverseasStockMultiPriceItem>(res, [
    "output2",
    "output",
    "output1",
  ]);

  if (items.length === 0) {
    throw new Error(
      `해외주식 응답이 비어있습니다 (market=${input.market}, symbol=${symbol}). ` +
        "종목코드 오타 또는 거래소 매칭 오류 가능성. find_symbol은 국내 종목만 지원하므로 종목코드를 직접 확인하세요.",
    );
  }

  const o = items[0];
  const decimals = parseNum(o.zdiv);
  const numOrUndef = (n: number) => (Number.isFinite(n) ? n : undefined);
  return {
    market: input.market,
    symbol,
    rsym: o.rsym,
    nameKo: o.knam,
    exchangeName: o.exnm,
    countryName: o.nnam,
    currency: o.curr,
    priceDecimals: Number.isFinite(decimals) ? decimals : undefined,
    price: parseNum(o.last),
    change: parseNum(o.diff),
    changeRate: parseNum(o.rate),
    changeSign: o.sign,
    open: numOrUndef(parseNum(o.open)),
    high: numOrUndef(parseNum(o.high)),
    low: numOrUndef(parseNum(o.low)),
    prevClose: numOrUndef(parseNum(o.base)),
    prevVolume: numOrUndef(parseNum(o.pvol)),
    volume: numOrUndef(parseNum(o.tvol)),
    tradingValue: numOrUndef(parseNum(o.tamt)),
    marketCap: numOrUndef(parseNum(o.tomv)),
    listedShares: numOrUndef(parseNum(o.shar)),
    yearHigh: numOrUndef(parseNum(o.h52p)),
    yearLow: numOrUndef(parseNum(o.l52p)),
    yearHighDate: o.h52d || undefined,
    yearLowDate: o.l52d || undefined,
    annualHigh: numOrUndef(parseNum(o.hanp)),
    annualLow: numOrUndef(parseNum(o.lanp)),
    priceInKrw: numOrUndef(parseNum(o.t_xprc)),
    source: "kis-overseas-stock-multprice",
    notes: ["복수종목 시세조회(HHDFS76220000)를 단일 종목 모드(NREC=1)로 사용 — OHLC + 52주 + 시총 모두 포함."],
  };
}
