/**
 * KIS OpenAPI endpoint paths and TR_IDs (read-only).
 *
 * SECURITY (CLAUDE.md §5.1):
 * Only inquiry endpoints are listed here. Trading endpoints
 * (`/uapi/domestic-stock/v1/trading/*`) are intentionally absent.
 */

export const KIS = {
  oauth: {
    issueToken: { path: "/oauth2/tokenP" },
    revokeToken: { path: "/oauth2/revokeP" },
  },

  // Stock quotations
  stockPrice: {
    path: "/uapi/domestic-stock/v1/quotations/inquire-price",
    trIdReal: "FHKST01010100",
  },
  stockDailyChart: {
    path: "/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice",
    trIdReal: "FHKST03010100",
  },
  /**
   * 주식일별분봉조회. 1분봉 OHLCV. 호출당 약 120건 반환(2시간 분량).
   * 페이지네이션: FID_INPUT_DATE_1 + FID_INPUT_HOUR_1 (HHMMSS) 기점으로 과거 방향.
   * 다음 페이지는 직전 응답의 가장 이른 시각 - 1분으로 HOUR를 갱신.
   * FID_PW_DATA_INCU_YN=Y로 과거 데이터 포함, FID_FAKE_TICK_INCU_YN="" (공백, 허봉 미포함).
   */
  stockMinuteChart: {
    path: "/uapi/domestic-stock/v1/quotations/inquire-time-dailychartprice",
    trIdReal: "FHKST03010230",
  },

  // Rankings
  fluctuationRank: {
    path: "/uapi/domestic-stock/v1/ranking/fluctuation",
    trIdReal: "FHPST01700000",
  },
  marketCapRank: {
    path: "/uapi/domestic-stock/v1/ranking/market-cap",
    trIdReal: "FHPST01740000",
  },
  volumeRank: {
    path: "/uapi/domestic-stock/v1/quotations/volume-rank",
    trIdReal: "FHPST01710000",
  },

  // Dividend (예탁원 정보)
  /**
   * 종목별 현금배당 일정/내역.
   * SHT_CD에 종목코드 입력 시 단일 종목 배당 기록 조회.
   * 응답 divi_rate(현금배당률%)와 per_sto_divi_amt(현금배당금)로 배당수익률 계산.
   */
  dividendInfo: {
    path: "/uapi/domestic-stock/v1/ksdinfo/dividend",
    trIdReal: "HHKDB669102C0",
  },

  // Credit / short sale / lending
  /**
   * 종목별 신용잔고 일별추이.
   * 한투 공식 산식:
   *   공여율(%) = 당일 융자신규주수 / 당일 거래량 * 100
   *   잔고율(%) = 융자잔고주수 / 신용한도주식수 * 100
   * 응답에 whol_loan_gvrt(공여율), whol_loan_rmnd_rate(잔고율)이 포함된다.
   */
  creditBalanceDaily: {
    path: "/uapi/domestic-stock/v1/quotations/daily-credit-balance",
    trIdReal: "FHPST04760000",
  },
  shortSaleDaily: {
    path: "/uapi/domestic-stock/v1/quotations/daily-short-sale",
    trIdReal: "FHPST04830000",
  },
  loanTransDaily: {
    path: "/uapi/domestic-stock/v1/quotations/daily-loan-trans",
    trIdReal: "HHPST074500C0",
  },

  // ETF / ETN
  etfPrice: {
    path: "/uapi/etfetn/v1/quotations/inquire-price",
    trIdReal: "FHPST02400000",
  },
  etfComponents: {
    path: "/uapi/etfetn/v1/quotations/inquire-component-stock-price",
    trIdReal: "FHKST121600C0",
  },

  // ─── Market indices (domestic 업종지수) ───
  /**
   * 국내업종 현재지수. KOSPI(0001) / KOSDAQ(1001) / KOSPI200(2001) 등.
   * MRKT=U 고정, ISCD는 4자리 업종 코드.
   * 응답 output: bstp_nmix_prpr/oprc/hgpr/lwpr, bstp_nmix_prdy_vrss/ctrt,
   *              ascn/down/stnr/uplm/lslm_issu_cnt, dryy_bstp_nmix_hgpr/lwpr (연중 최고/최저).
   */
  indexPrice: {
    path: "/uapi/domestic-stock/v1/quotations/inquire-index-price",
    trIdReal: "FHPUP02100000",
  },
  /**
   * 국내업종 일자별지수. PERIOD=D/W/M, 100건/호출.
   * 응답: output1(메타) + output2[](OHLCV)
   */
  indexDailyChart: {
    path: "/uapi/domestic-stock/v1/quotations/inquire-index-daily-price",
    trIdReal: "FHPUP02120000",
  },
  /**
   * 국내업종 시간별지수(분). FID_INPUT_HOUR_1은 **초 단위** (60=1분, 300=5분, 600=10분).
   * 응답 output[]: bsop_hour(HHMMSS), bstp_nmix_prpr(close만), cntg_vol.
   * **주의**: OHLC 없이 close만 반환. ChartPoint shape에 맞추려면 open=high=low=close로 채움.
   * 페이지네이션 키 없음 → 단일 호출 (당일 데이터만).
   */
  indexMinuteChart: {
    path: "/uapi/domestic-stock/v1/quotations/inquire-index-timeprice",
    trIdReal: "FHPUP02110200",
  },

  // ─── Overseas chart (다목적: 해외지수 N / 환율 X / 국채 I / 금선물 S) ───
  /**
   * 해외주식 종목/지수/환율 기간별시세 (일/주/월/년).
   * MRKT 분기:
   *   N : 해외지수 (예: SPX, COMP, DJI)
   *   X : 환율 (예: FX@KRW)
   *   I : 국채 금리
   *   S : 금선물 (예: GC)
   * PERIOD=D/W/M/Y. 100건/호출.
   * "현재값"이 필요하면 PERIOD=D + 최근 1영업일로 호출하여 마지막 종가 추출.
   */
  overseasChartPrice: {
    path: "/uapi/overseas-price/v1/quotations/inquire-daily-chartprice",
    trIdReal: "FHKST03030100",
  },
  /**
   * 해외지수 분봉. MRKT=N(해외지수), HOUR_CLS=0(정규장)/1(시간외), PW_DATA_INCU_YN=Y(과거 포함).
   * 응답 output1(메타) + output2[](stck_bsop_date, stck_cntg_hour, optn_prpr/oprc/hgpr/lwpr, cntg_vol).
   * 단일 호출 (페이지네이션 키 명세에 없음).
   */
  overseasIndexMinuteChart: {
    path: "/uapi/overseas-price/v1/quotations/inquire-time-indexchartprice",
    trIdReal: "FHKST03030200",
  },
  /**
   * 해외주식 일봉/주봉/월봉. EXCD(NAS/NYS/AMS/HKS/SHS/SZS/HSX/HNX/TSE),
   * SYMB(종목코드), GUBN(0:일/1:주/2:월), BYMD(기준일자), MODP(0:미반영/1:수정주가).
   * 응답 output1(rsym, zdiv, nrec) + output2[](xymd, clos, open, high, low, tvol).
   * KEYB로 다음 페이지 (이전 응답값을 그대로 셋팅).
   */
  overseasStockDailyChart: {
    path: "/uapi/overseas-price/v1/quotations/dailyprice",
    trIdReal: "HHDFS76240000",
  },
  /**
   * 해외주식 분봉. NMIN(분간격), PINC(0:당일/1:전일포함), NEXT/KEYB 페이지네이션, NREC(최대 120).
   * 응답 output1(메타: stim/etim/sktm/ektm/next/more/nrec) + output2[](xymd, xhms, kymd, khms,
   * open, high, low, last, evol, eamt). 다음 호출 시 KEYB=YYYYMMDDHHMMSS (마지막 분봉의 1분 전).
   */
  overseasStockMinuteChart: {
    path: "/uapi/overseas-price/v1/quotations/inquire-time-itemchartprice",
    trIdReal: "HHDFS76950200",
  },

  // ─── Overseas futures (해외선물 — WTI/Brent 등 상품선물) ───
  /**
   * 해외선물 현재가. SRS_CD = base + 월코드(F~Z) + 2자리 연도 (예: CLM26).
   * 응답: output1.high_price/low_price/last_qntt/proc_date 등.
   */
  overseasFuturesPrice: {
    path: "/uapi/overseas-futureoption/v1/quotations/inquire-price",
    trIdReal: "HHDFC55010000",
  },
  /**
   * 해외선물 체결추이(일간). SRS_CD + EXCH_CD(CME/ICE/etc) + CLOSE_DATE_TIME + QRY_CNT.
   * 응답: output1(ret_cnt, last_n_cnt, index_key) + output2[](data_date, open_price, high_price, low_price, last_price, vol).
   */
  overseasFuturesDailyChart: {
    path: "/uapi/overseas-futureoption/v1/quotations/daily-ccnl",
    trIdReal: "HHDFC55020100",
  },
  /**
   * 해외선물 분봉. SRS_CD + EXCH_CD(CME) + QRY_GAP(분 간격) + QRY_CNT(최대 120) + INDEX_KEY(페이지네이션).
   * 응답: output2(메타: ret_cnt, **index_key**) + output1[](data_date, data_time,
   * open_price/high_price/low_price/last_price, vol). 일봉 endpoint와 output1/output2 의미 반전됨에 유의.
   * 다음 페이지: QRY_TP=P + INDEX_KEY=직전 응답의 output2.index_key.
   */
  overseasFuturesMinuteChart: {
    path: "/uapi/overseas-futureoption/v1/quotations/inquire-time-futurechartprice",
    trIdReal: "HHDFC55020400",
  },
} as const;

export type KisEndpoint = (typeof KIS)[keyof typeof KIS];
