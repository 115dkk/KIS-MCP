/**
 * Tool (M2): get_overseas_stock_info — 해외 개별주식 상품 메타정보.
 *
 * 데이터 소스: 해외주식 상품기본정보 (CTPF1702R, search-info).
 *
 * 제공 정보:
 *   - 한국어/영문 종목명
 *   - 거래소·국가·통화
 *   - 상장 정보 (상장주식수, 상장일자, 상장 폐지 여부)
 *   - 상품 분류 (주식/ETF/ETN/REIT/우선주/VIX 추종)
 *   - 거래 가능 상태 (정상/정지/중단)
 *   - 식별자 (ISIN, SEDOL, 블룸버그 티커)
 *
 * **PER/EPS/시총은 미포함** — get_overseas_stock_quote(multprice 기반)에서 시총 제공.
 * PER/EPS는 inquire-search 별도 endpoint 사용.
 */

import { KIS } from "../kis/endpoints.js";
import type { KisClient } from "../kis/client.js";
import type { KisOverseasStockSearchInfoOutput } from "../kis/types.js";
import { parseNum } from "../utils/downsample.js";
import { extractObject } from "../utils/kisResponse.js";

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

/**
 * EXCD → PRDT_TYPE_CD 매핑 (한투 search-info 명세).
 * 한투는 거래소를 EXCD(NAS 등)와 PRDT_TYPE_CD(512 등) 둘로 표현.
 */
const PRDT_TYPE_CODE: Record<OverseasMarket, string> = {
  NAS: "512",
  NYS: "513",
  AMS: "529",
  TSE: "515",
  HKS: "501",
  SHS: "551",
  SZS: "552",
  HSX: "508",
  HNX: "507",
};

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

export interface GetOverseasStockInfoInput {
  market: OverseasMarket;
  symbol: string;
}

export interface OverseasStockInfoResult {
  market: OverseasMarket;
  symbol: string;
  /** 한국어 상품명 */
  nameKo?: string;
  /** 영문 상품명 */
  nameEn?: string;
  /** 종목 분류 — "주식" | "ETF" | "ETN" | "REIT" | "우선주" | "VIX-ETF" 등 */
  classification: string;
  /** 거래소 명 (한투 분류) */
  exchangeName?: string;
  /** 국가 (한국어) */
  countryName?: string;
  /** 거래 통화 (USD/JPY/HKD 등) */
  currency?: string;
  /** 상장 주식수 */
  listedShares?: number;
  /** 상장 일자 YYYYMMDD */
  listingDate?: string;
  /** 상장 폐지 여부 (Y/N) */
  delisted?: boolean;
  /** 상장 폐지 일자 (있을 때) */
  delistedDate?: string;
  /** 거래 상태 — "정상" | "거래정지(ALL)" | "거래중단" | "매도정지" | "거래정지(위탁)" | "매수정지" */
  tradingStatus: string;
  /** 액면가 */
  faceValue?: number;
  /** 식별자 */
  isin?: string;
  sedol?: string;
  bloombergTicker?: string;
  /** 주간거래 가능 여부 */
  daytimeTradingAvailable?: boolean;
  /** 세금 부과 여부 (PTP 종목 등) */
  taxLevied?: boolean;
  /** PTP 종목 여부 (양도세 면제 시 별도) */
  ptpItem?: boolean;
  source: "kis-overseas-stock-search-info";
  notes?: string[];
}

const TRADING_STATUS_MAP: Record<string, string> = {
  "01": "정상",
  "02": "거래정지(ALL)",
  "03": "거래중단",
  "04": "매도정지",
  "05": "거래정지(위탁)",
  "06": "매수정지",
};

const STOCK_CLASSIFICATION_MAP: Record<string, string> = {
  "01": "주식",
  "02": "WARRANT",
  "03": "ETF",
  "04": "우선주",
};

const ETF_RISK_MAP: Record<string, string> = {
  "001": "ETF",
  "002": "ETN",
  "003": "ETC",
  "004": "REIT/MutualFund",
  "005": "VIX-ETF",
  "006": "VIX-ETN",
};

function classify(o: Partial<KisOverseasStockSearchInfoOutput>): string {
  // ETF risk 코드가 있으면 우선 사용 (더 세분화됨).
  const risk = o.ovrs_stck_etf_risk_drtp_cd?.trim();
  if (risk && ETF_RISK_MAP[risk]) return ETF_RISK_MAP[risk];
  const dvsn = o.ovrs_stck_dvsn_cd?.trim();
  if (dvsn && STOCK_CLASSIFICATION_MAP[dvsn]) return STOCK_CLASSIFICATION_MAP[dvsn];
  return o.prdt_clsf_name ?? "주식";
}

export async function getOverseasStockInfo(
  client: KisClient,
  input: GetOverseasStockInfoInput,
): Promise<OverseasStockInfoResult> {
  if (!input?.market) throw new Error("market은 필수입니다");
  if (!input?.symbol) throw new Error("symbol은 필수입니다");
  if (!VALID_MARKETS.includes(input.market)) {
    throw new Error(
      `market은 ${VALID_MARKETS.join("/")} 중 하나여야 합니다: ${input.market}`,
    );
  }
  const symbol = input.symbol.trim().toUpperCase();
  const prdtType = PRDT_TYPE_CODE[input.market];

  const res = await client.get<KisOverseasStockSearchInfoOutput>({
    path: KIS.overseasStockSearchInfo.path,
    trId: KIS.overseasStockSearchInfo.trIdReal,
    query: { PRDT_TYPE_CD: prdtType, PDNO: symbol },
  });

  const o = extractObject<KisOverseasStockSearchInfoOutput>(res);
  if (!o.std_pdno && !o.prdt_name && !o.prdt_eng_name) {
    throw new Error(
      `해외주식 정보 응답이 비어있습니다 (market=${input.market}, symbol=${symbol}). ` +
        "종목코드 오타 또는 PRDT_TYPE_CD 매핑 누락 가능성.",
    );
  }

  const status = TRADING_STATUS_MAP[o.ovrs_stck_tr_stop_dvsn_cd?.trim() ?? ""] ?? "알 수 없음";
  const numOrUndef = (n: number) => (Number.isFinite(n) && n !== 0 ? n : undefined);

  return {
    market: input.market,
    symbol,
    nameKo: o.prdt_name?.trim() || undefined,
    nameEn: o.prdt_eng_name?.trim() || undefined,
    classification: classify(o),
    exchangeName: o.ovrs_excg_name?.trim() || o.tr_mket_name?.trim() || undefined,
    countryName: o.natn_name?.trim() || undefined,
    currency: o.tr_crcy_cd?.trim() || undefined,
    listedShares: numOrUndef(parseNum(o.lstg_stck_num)),
    listingDate: o.lstg_dt?.trim() || undefined,
    delisted: o.lstg_abol_item_yn === "Y" || o.lstg_yn === "N",
    delistedDate: o.lstg_abol_dt?.trim() || undefined,
    tradingStatus: status,
    faceValue: numOrUndef(parseNum(o.ovrs_papr)),
    isin: o.std_pdno?.trim() || undefined,
    sedol: o.sedol_no?.trim() || undefined,
    bloombergTicker: o.blbg_tckr_text?.trim() || undefined,
    daytimeTradingAvailable: o.dtm_tr_psbl_yn === "Y",
    taxLevied: o.tax_levy_yn === "Y",
    ptpItem: o.ptp_item_yn === "Y",
    source: "kis-overseas-stock-search-info",
    notes: ["search-info(CTPF1702R)는 상품 메타·상장 정보만 제공. PER/EPS/시총은 get_overseas_stock_quote 사용."],
  };
}
