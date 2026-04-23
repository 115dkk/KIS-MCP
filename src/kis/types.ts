/**
 * Common KIS API response shapes. Most KIS responses include rt_cd/msg_cd/msg1
 * envelope plus output(s).
 */

export interface KisEnvelope {
  rt_cd: string;
  msg_cd: string;
  msg1: string;
}

export interface KisResponse<TOutput = unknown> extends KisEnvelope {
  output?: TOutput;
  output1?: TOutput;
  output2?: TOutput;
}

export interface KisTokenResponse {
  access_token: string;
  access_token_token_expired: string;
  token_type: string;
  expires_in: number;
}

/**
 * inquire-price (FHKST01010100) 응답.
 * 주의: `bstp_kor_isnm`은 "업종 한글 종목명"으로, 실제 종목명이 아니라 **업종 분류명**.
 * 종목명이 필요하면 별도 API(상품기본조회 등)가 필요함.
 */
export interface KisStockPriceOutput {
  iscd_stat_cls_code?: string;
  marg_rate?: string;
  rprs_mrkt_kor_name?: string;
  bstp_kor_isnm?: string; // 업종 분류명 (NOT 종목명)
  stck_prpr: string;
  prdy_vrss: string;
  prdy_vrss_sign: string;
  prdy_ctrt: string;
  acml_vol: string;
  acml_tr_pbmn: string;
  stck_oprc: string;
  stck_hgpr: string;
  stck_lwpr: string;
  stck_mxpr: string;
  stck_llam: string;
  w52_hgpr?: string;
  w52_lwpr?: string;
  w52_hgpr_date?: string;
  w52_lwpr_date?: string;
  per?: string;
  pbr?: string;
  eps?: string;
  bps?: string;
  hts_avls?: string;
  lstn_stcn?: string;
  vol_tnrt?: string;
  whol_loan_rmnd_rate?: string; // inquire-price도 융자잔고비율을 포함
  // Many additional fields exist; only those we surface are listed.
  [key: string]: string | undefined;
}

/**
 * ETF/ETN 현재가 (FHPST02400000) 응답. 주식 inquire-price와 일부 필드 차이가 있다:
 * - PER/PBR/EPS/BPS 없음
 * - 시가총액(hts_avls) 대신 etf_ntas_ttam (ETF 순자산 총액)
 * - 52주 최고/최저(w52_*) 없음 → stck_dryy_hgpr/lwpr (연중 최고/최저)
 * - bstp_kor_isnm은 "업종 분류" (예: 지수ETF). ETF 이름 자체는 별도 API 필요.
 */
export interface KisEtfPriceOutput {
  stck_prpr: string;
  prdy_vrss_sign?: string;
  prdy_vrss?: string;
  prdy_ctrt?: string;
  acml_vol?: string;
  prdy_vol?: string;
  stck_mxpr?: string;
  stck_llam?: string;
  stck_prdy_clpr?: string;
  stck_oprc?: string;
  stck_hgpr?: string;
  stck_lwpr?: string;
  prdy_last_nav?: string;
  nav?: string;
  nav_prdy_vrss?: string;
  nav_prdy_vrss_sign?: string;
  nav_prdy_ctrt?: string;
  trc_errt?: string; // 추적 오차율
  stck_sdpr?: string;
  nmix_ctrt?: string;
  etf_crcl_stcn?: string; // ETF 유통 주수
  etf_ntas_ttam?: string; // ETF 순자산 총액
  etf_cu_unit_scrt_cnt?: string;
  etf_cnfg_issu_cnt?: string; // 구성 종목 수
  etf_dvdn_cycl?: string; // 배당 주기
  stck_dryy_hgpr?: string; // 연중 최고가
  dryy_hgpr_date?: string;
  stck_dryy_lwpr?: string; // 연중 최저가
  dryy_lwpr_date?: string;
  bstp_kor_isnm?: string; // 업종 분류 (NOT ETF 이름)
  vi_cls_code?: string;
  lstn_stcn?: string;
  frgn_hldn_qty?: string;
  frgn_hldn_qty_rate?: string; // 외국인 보유율 %
  etf_trc_ert_mltp?: string;
  dprt?: string; // 괴리율 %
  stck_lstn_date?: string;
  shrg_type_code?: string; // 분배금 형태 코드
  lp_hldn_rate?: string; // LP 보유 비율 %
  etf_div_name?: string;
  etf_rprs_bstp_kor_isnm?: string; // ETF 대표 업종
  [key: string]: string | undefined;
}

/**
 * 예탁원 정보 - 배당일정 (HHKDB669102C0) 응답 항목.
 */
export interface KisDividendItem {
  record_date: string; // 기준일 YYYYMMDD
  sht_cd: string; // 종목코드
  isin_name?: string; // 종목명
  divi_kind?: string; // 배당 종류
  face_val?: string; // 액면가
  per_sto_divi_amt?: string; // 현금배당금 (원/주)
  divi_rate?: string; // 현금배당률 %
  stk_divi_rate?: string; // 주식배당률 %
  divi_pay_dt?: string; // 배당금 지급일
  stk_div_pay_dt?: string; // 주식배당 지급일
  odd_pay_dt?: string;
  stk_kind?: string;
  high_divi_gb?: string; // 고배당 종목 여부
  [key: string]: string | undefined;
}

export interface KisChartItem {
  stck_bsop_date: string;
  stck_clpr: string;
  stck_oprc: string;
  stck_hgpr: string;
  stck_lwpr: string;
  acml_vol: string;
  acml_tr_pbmn?: string;
  flng_cls_code?: string;
  prtt_rate?: string;
  mod_yn?: string;
  prdy_vrss_sign?: string;
  prdy_vrss?: string;
  revl_issu_reas?: string;
}

/**
 * 주식일별분봉조회 (FHKST03010230) output2 항목. 1분봉.
 * - stck_bsop_date: 영업일자 YYYYMMDD
 * - stck_cntg_hour: 체결시간 HHMMSS (분봉 시작 시각)
 * - stck_prpr: 해당 분봉 종가 (현재가가 아니라 그 분의 close)
 * - cntg_vol: 해당 분봉 체결 거래량 (누적이 아님)
 *
 * 일봉용 KisChartItem과 필드명이 다르다: stck_clpr → stck_prpr, acml_vol → cntg_vol.
 */
export interface KisStockMinuteChartItem {
  stck_bsop_date: string;
  stck_cntg_hour: string;
  stck_prpr: string;
  stck_oprc: string;
  stck_hgpr: string;
  stck_lwpr: string;
  cntg_vol: string;
  acml_tr_pbmn?: string;
  [key: string]: string | undefined;
}

export interface KisEtfComponentItem {
  hts_kor_isnm: string;
  stck_shrn_iscd: string;
  etf_cnfg_issu_rlim?: string; // 구성비중
  stck_prpr?: string;
  prdy_vrss?: string;
  prdy_vrss_sign?: string;
  prdy_ctrt?: string;
  [key: string]: string | undefined;
}

/**
 * 종목별 신용잔고 일별추이 응답 항목 (FHPST04760000, daily-credit-balance).
 *
 * 공식 정의 (KIS API 워크북 확인):
 *   공여율 = whol_loan_new_stcn / acml_vol * 100  → whol_loan_gvrt
 *   잔고율 = whol_loan_rmnd_stcn / 신용한도주식수 * 100 → whol_loan_rmnd_rate
 *
 * 한 번 호출당 최대 30건. 날짜 필드는 `deal_date`(매매일자) 또는 `stlm_date`(결제일자).
 */
export interface KisCreditBalanceItem {
  deal_date: string; // 매매 일자
  stlm_date?: string; // 결제 일자
  stck_prpr?: string;
  prdy_vrss?: string;
  prdy_vrss_sign?: string;
  prdy_ctrt?: string;
  acml_vol?: string; // 누적 거래량 (공여율 분모)
  whol_loan_new_stcn?: string; // 전체 융자 신규 주수
  whol_loan_rdmp_stcn?: string; // 전체 융자 상환 주수
  whol_loan_rmnd_stcn?: string; // 전체 융자 잔고 주수
  whol_loan_new_amt?: string; // 단위: 만원
  whol_loan_rdmp_amt?: string; // 단위: 만원
  whol_loan_rmnd_amt?: string; // 단위: 만원
  whol_loan_rmnd_rate?: string; // 전체 융자 잔고 비율(%) — 공식 잔고율
  whol_loan_gvrt?: string; // 전체 융자 공여율(%) — 공식 공여율
  // 대주(공매도 결제용) 통계도 동일 응답에 포함됨
  whol_stln_new_stcn?: string;
  whol_stln_rdmp_stcn?: string;
  whol_stln_rmnd_stcn?: string;
  whol_stln_rmnd_amt?: string;
  whol_stln_rmnd_rate?: string;
  whol_stln_gvrt?: string;
  stck_oprc?: string;
  stck_hgpr?: string;
  stck_lwpr?: string;
  [key: string]: string | undefined;
}

export interface KisShortSaleItem {
  stck_bsop_date: string;
  ssts_cntg_qty?: string; // 공매도 체결수량
  ssts_tr_pbmn?: string; // 공매도 거래대금
  ssts_vol_rlim?: string; // 공매도 거래량 비중
  ssts_tr_pbmn_rlim?: string; // 공매도 거래대금 비중
  [key: string]: string | undefined;
}

/**
 * 종목별 일별 대차거래추이 응답 항목 (HHPST074500C0, daily-loan-trans).
 * 응답 필드명이 일반 prefix 없는 짧은 형태임에 유의.
 */
export interface KisLoanTransItem {
  bsop_date: string; // 일자
  stck_prpr?: string; // 주식 종가 (필드명은 prpr이지만 종가)
  prdy_vrss_sign?: string;
  prdy_vrss?: string;
  prdy_ctrt?: string;
  acml_vol?: string;
  new_stcn?: string; // 당일 증가 주수 (체결)
  rdmp_stcn?: string; // 당일 감소 주수 (상환)
  prdy_rmnd_vrss?: string; // 대차거래 증감
  rmnd_stcn?: string; // 당일 잔고 주수
  rmnd_amt?: string; // 당일 잔고 금액
  [key: string]: string | undefined;
}

/**
 * 국내업종 현재지수 (FHPUP02100000) 응답.
 * 필드명에 "bstp_nmix"는 "업종 지수(Industry Index)" 약자. 종목용 필드와 prefix 다름.
 */
export interface KisIndexPriceOutput {
  bstp_nmix_prpr?: string; // 현재가
  bstp_nmix_prdy_vrss?: string; // 전일대비
  bstp_nmix_prdy_vrss_sign?: string;
  bstp_nmix_prdy_ctrt?: string; // 등락률 %
  bstp_nmix_oprc?: string; // 시가
  bstp_nmix_hgpr?: string;
  bstp_nmix_lwpr?: string;
  prdy_nmix_vrss_nmix_oprc?: string;
  bstp_nmix_oprc_prdy_ctrt?: string;
  prdy_nmix_vrss_nmix_hgpr?: string;
  bstp_nmix_hgpr_prdy_ctrt?: string;
  prdy_nmix_vrss_nmix_lwpr?: string;
  bstp_nmix_lwpr_prdy_ctrt?: string;
  ascn_issu_cnt?: string; // 상승 종목 수
  uplm_issu_cnt?: string; // 상한
  stnr_issu_cnt?: string; // 보합
  down_issu_cnt?: string; // 하락
  lslm_issu_cnt?: string; // 하한
  dryy_bstp_nmix_hgpr?: string; // 연중 최고
  dryy_bstp_nmix_hgpr_date?: string;
  dryy_bstp_nmix_lwpr?: string;
  dryy_bstp_nmix_lwpr_date?: string;
  acml_vol?: string;
  acml_tr_pbmn?: string;
  [key: string]: string | undefined;
}

/**
 * 국내업종 일자별지수 (FHPUP02120000) output2 항목. 100건/호출.
 * date 필드명이 stck_bsop_date 그대로(통상 종목 일봉과 일치).
 */
export interface KisIndexDailyChartItem {
  stck_bsop_date: string;
  bstp_nmix_prpr?: string; // 종가
  bstp_nmix_oprc?: string;
  bstp_nmix_hgpr?: string;
  bstp_nmix_lwpr?: string;
  acml_vol?: string;
  acml_tr_pbmn?: string;
  [key: string]: string | undefined;
}

/**
 * 해외 종목/지수/환율 기간별시세 (FHKST03030100) 응답.
 *   output1: 메타 (현재가, 마지막 변동, 전영업일 종가 등)
 *   output2: 시계열 [{stck_bsop_date, ovrs_nmix_prpr/oprc/hgpr/lwpr, ...}]
 *
 * MRKT(N=지수, X=환율, I=국채, S=금선물)에 따라 일부 필드 의미가 달라진다.
 * 이름은 "ovrs_nmix" prefix지만 환율/금에도 동일 필드 재활용.
 */
export interface KisOverseasChartMeta {
  /** 종목명/지수명/환율명 (한국어) */
  hts_kor_isnm?: string;
  /** 단축 코드 */
  ovrs_nmix_prdy_vrss?: string;
  ovrs_nmix_prdy_vrss_sign?: string;
  ovrs_nmix_prdy_ctrt?: string;
  ovrs_nmix_prpr?: string; // 현재가/최근 종가
  prdy_clpr?: string; // 전일 종가
  acml_vol?: string;
  [key: string]: string | undefined;
}

export interface KisOverseasChartItem {
  stck_bsop_date: string;
  ovrs_nmix_prpr?: string; // 종가
  ovrs_nmix_oprc?: string;
  ovrs_nmix_hgpr?: string;
  ovrs_nmix_lwpr?: string;
  acml_vol?: string;
  acml_tr_pbmn?: string;
  mod_yn?: string;
  [key: string]: string | undefined;
}

/**
 * 국내업종 분봉 (FHPUP02110200) output 항목.
 * **OHLC 없음**: bstp_nmix_prpr(close)만 제공. ChartPoint shape에 맞추려면 open=high=low=close.
 */
export interface KisIndexMinuteItem {
  bsop_hour: string; // HHMMSS
  bstp_nmix_prpr?: string; // 현재가 (close)
  bstp_nmix_prdy_vrss?: string;
  prdy_vrss_sign?: string;
  bstp_nmix_prdy_ctrt?: string;
  acml_tr_pbmn?: string;
  acml_vol?: string;
  cntg_vol?: string; // 해당 분봉 체결 거래량
  [key: string]: string | undefined;
}

/**
 * 해외지수 분봉 (FHKST03030200) output2 항목.
 * 필드명 prefix가 'optn_' (option-style)이지만 지수 분봉이다.
 */
export interface KisOverseasIndexMinuteItem {
  stck_bsop_date: string;
  stck_cntg_hour: string; // HHMMSS (현지 시간)
  optn_prpr?: string; // close
  optn_oprc?: string;
  optn_hgpr?: string;
  optn_lwpr?: string;
  cntg_vol?: string;
  [key: string]: string | undefined;
}

/**
 * 해외주식 일봉 (HHDFS76240000) output2 항목.
 * 필드명이 짧은 4자(KIS 해외시세 계열 통일).
 */
export interface KisOverseasStockDailyItem {
  xymd: string; // YYYYMMDD
  clos?: string; // 종가
  open?: string;
  high?: string;
  low?: string;
  tvol?: string; // 거래량
  tamt?: string;
  diff?: string;
  rate?: string;
  sign?: string;
  pbid?: string;
  pask?: string;
  [key: string]: string | undefined;
}

/**
 * 해외주식 일봉 메타 (HHDFS76240000) output1.
 * zdiv: 가격 소수점 자릿수 (응답값 그대로 사용 — KIS는 일봉 응답에서 소수점 보정 불필요).
 */
export interface KisOverseasStockDailyMeta {
  rsym?: string; // D + 시장(3자) + 종목코드 (예: DNASTSLA)
  zdiv?: string; // 소수점 자릿수
  nrec?: string; // 레코드수
  [key: string]: string | undefined;
}

/**
 * 해외주식 분봉 (HHDFS76950200) output2 항목.
 * 시간 필드 두 가지:
 *   - 현지: tymd(영업일자) / xymd(기준일자) / xhms(기준시간)
 *   - 한국: kymd / khms
 * 본 MCP는 현지 시간(xymd/xhms) 사용 — 사용자가 시장 흐름을 자연스럽게 인식.
 */
export interface KisOverseasStockMinuteItem {
  tymd?: string;
  xymd: string; // YYYYMMDD (현지)
  xhms: string; // HHMMSS (현지)
  kymd?: string;
  khms?: string;
  open?: string;
  high?: string;
  low?: string;
  last?: string; // 종가 (close)
  evol?: string;
  eamt?: string;
  [key: string]: string | undefined;
}

/**
 * 해외주식 분봉 메타 (HHDFS76950200) output1.
 * next: "1" if 추가 데이터 있음 / nrec: 이번 응답 건수
 */
export interface KisOverseasStockMinuteMeta {
  rsym?: string;
  zdiv?: string;
  stim?: string; // 장시작 현지시간
  etim?: string; // 장종료 현지시간
  sktm?: string; // 한국시간
  ektm?: string;
  next?: string; // "1": 다음 페이지 있음
  more?: string;
  nrec?: string;
  [key: string]: string | undefined;
}

/**
 * 해외선물 분봉 (HHDFC55020400) output1 항목.
 * **주의**: 일봉 endpoint(HHDFC55020100)와 output1/output2 의미가 반전됨.
 *   - 일봉: output1=메타, output2=배열
 *   - 분봉: output1=배열, output2=메타 (ret_cnt, **index_key** for pagination)
 * 가격은 sCalcDesz 보정 필요 (priceDecimals).
 */
export interface KisOverseasFuturesMinuteItem {
  data_date?: string;
  data_time?: string;
  open_price?: string;
  high_price?: string;
  low_price?: string;
  last_price?: string;
  last_qntt?: string;
  vol?: string;
  prev_diff_flag?: string;
  prev_diff_price?: string;
  prev_diff_rate?: string;
  [key: string]: string | undefined;
}

export interface KisOverseasFuturesMinuteMeta {
  ret_cnt?: string;
  last_n_cnt?: string;
  index_key?: string; // 다음 페이지 키
  [key: string]: string | undefined;
}

/**
 * 해외선물 현재가 (HHDFC55010000) output1.
 * "ffcode.mst의 sCalcDesz(계산 소수점) 값을 활용해서 가격을 재계산해야 한다"는
 * KIS 안내가 있으나 본 MCP는 값을 그대로 노출하고 단위를 displayName/unit에 명시.
 */
export interface KisOverseasFuturesPriceOutput {
  proc_date?: string; // 처리일자
  high_price?: string;
  low_price?: string;
  last_price?: string; // 최근 체결가
  sttl_price?: string; // 정산가
  prev_clpr?: string; // 전일 종가
  open_price?: string;
  prdy_vrss?: string;
  prdy_vrss_sign?: string;
  prdy_ctrt?: string;
  acml_vol?: string;
  hts_kor_isnm?: string;
  [key: string]: string | undefined;
}

/**
 * 해외선물 체결추이(일간) (HHDFC55020100) output2 항목.
 * 응답 필드명은 일반 ovrs/futs 계열을 혼용하므로 [key]도 함께 둠.
 */
export interface KisOverseasFuturesChartItem {
  bsop_date?: string;
  stck_bsop_date?: string;
  open_price?: string;
  high_price?: string;
  low_price?: string;
  close_price?: string;
  trad_vol?: string;
  [key: string]: string | undefined;
}

/**
 * 랭킹 응답은 엔드포인트마다 종목코드/시총 필드명이 다르다.
 *   - fluctuation: stck_shrn_iscd (시총·거래대금 없음)
 *   - market-cap : mksc_shrn_iscd, stck_avls
 *   - volume-rank: mksc_shrn_iscd, acml_tr_pbmn (시총 없음)
 */
export interface KisRankingItem {
  hts_kor_isnm: string;
  stck_shrn_iscd?: string;
  mksc_shrn_iscd?: string;
  stck_prpr: string;
  prdy_vrss: string;
  prdy_vrss_sign: string;
  prdy_ctrt: string;
  acml_vol?: string;
  acml_tr_pbmn?: string;
  hts_avls?: string;
  stck_avls?: string;
  lstn_stcn?: string;
  data_rank?: string;
  [key: string]: string | undefined;
}
