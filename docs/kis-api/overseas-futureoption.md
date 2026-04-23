# [해외선물옵션] API

한국투자증권 OpenAPI — `[해외선물옵션]` 카테고리 (35개).
원본 시트는 cp949 엑셀이며 본 파일은 LLM 친화 변환본. 검색은 `INDEX.md` 권장.

공통 OAuth 헤더(`authorization`, `appkey`, `appsecret`, `tr_id`, `custtype` 등)는 모든 API 동일하므로 본 문서에서 생략. `INDEX.md` 상단 참고.

---
### 1. 해외선물옵션 주문

| Field | Value |
|---|---|
| Sheet | `해외선물옵션 주문` |
| Menu | [해외선물옵션] 주문/계좌 |
| Method | `POST` |
| URL | `/uapi/overseas-futureoption/v1/trading/order` |
| TR_ID (실전) | `OTFM3001U` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `OVRS_FUTR_FX_PDNO` | 해외선물FX상품번호 | string | Y | 32 |  |
| `SLL_BUY_DVSN_CD` | 매도매수구분코드 | string | Y | 2 | 01 : 매도  02 : 매수 |
| `FM_LQD_USTL_CCLD_DT` | FM청산미결제체결일자 | string | N | 8 | 빈칸 (hedge청산만 이용) |
| `FM_LQD_USTL_CCNO` | FM청산미결제체결번호 | string | N | 10 | 빈칸 (hedge청산만 이용) |
| `PRIC_DVSN_CD` | 가격구분코드 | string | Y | 1 | 1.지정, 2. 시장, 3. STOP, 4 S/L |
| `FM_LIMIT_ORD_PRIC` | FMLIMIT주문가격 | string | Y | 20 | 지정가인 경우 가격 입력  * 시장가, STOP주문인 경우, 빈칸("") 입력 |
| `FM_STOP_ORD_PRIC` | FMSTOP주문가격 | string | Y | 20 | STOP 주문 가격 입력  * 시장가, 지정가인 경우, 빈칸("") 입력 |
| `FM_ORD_QTY` | FM주문수량 | string | Y | 10 |  |
| `FM_LQD_LMT_ORD_PRIC` | FM청산LIMIT주문가격 | string | N | 20 | 빈칸 (hedge청산만 이용) |
| `FM_LQD_STOP_ORD_PRIC` | FM청산STOP주문가격 | string | N | 20 | 빈칸 (hedge청산만 이용) |
| `CCLD_CNDT_CD` | 체결조건코드 | string | Y | 1 | 일반적으로 6 (EOD, 지정가)   GTD인 경우 5, 시장가인 경우만 2 |
| `CPLX_ORD_DVSN_CD` | 복합주문구분코드 | string | Y | 1 | 0 (hedge청산만 이용) |
| `ECIS_RSVN_ORD_YN` | 행사예약주문여부 | string | Y | 1 | N |
| `FM_HDGE_ORD_SCRN_YN` | FM_HEDGE주문화면여부 | string | Y | 1 | N |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 | 0 : 성공  0 이외의 값 : 실패 |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` |  | object | N |  |  |
| `ORD_DT` | 주문일자 | string | N | 8 |  |
| `ODNO` | 주문번호 | string | N | 8 | 접수한 주문의 일련번호(ex. 00360686)  * 정정/취소시 문자열처럼 "0"을 포함해서 전송     (ex. ORGN_ODNO : 00360686) |

**Request Example:**
```
{      "CANO": "81012345",      "ACNT_PRDT_CD": "08",      "OVRS_FUTR_FX_PDNO": "6BZ22",      "SLL_BUY_DVSN_CD": "02",      "FM_LQD_USTL_CCLD_DT": "",      "FM_LQD_USTL_CCNO": "",      "PRIC_DVSN_CD": "1",      "FM_LIMIT_ORD_PRIC": "1.17",      "FM_STOP_ORD_PRIC": "",      "FM_ORD_QTY": "1",      "FM_LQD_LMT_ORD_PRIC": "",      "FM_LQD_STOP_ORD_PRIC": "",      "CCLD_CNDT_CD": "6",      "CPLX_ORD_DVSN_CD": "0",      "ECIS_RSVN_ORD_YN": "N",      "FM_HDGE_ORD_SCRN_YN": "N"  }
```

**Response Example:**
```
{      "rt_cd": "0",      "msg_cd": "APBK0013",      "msg1": "주문 전송 완료 되었습니다.",      "output": {          "ORD_DT": "20221214",          "ODNO": "00298040"      }  }
```

---
### 2. 해외선물옵션 정정취소주문

| Field | Value |
|---|---|
| Sheet | `해외선물옵션 정정취소주문` |
| Menu | [해외선물옵션] 주문/계좌 |
| Method | `POST` |
| URL | `/uapi/overseas-futureoption/v1/trading/order-rvsecncl` |
| TR_ID (실전) | `(정정) OTFM3002U (취소) OTFM3003U` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `ORGN_ORD_DT` | 원주문일자 | string | Y | 8 | 원 주문 시 출력되는 ORD_DT 값을 입력 (현지거래일) |
| `ORGN_ODNO` | 원주문번호 | string | Y | 8 | 정정/취소시 주문번호(ODNO) 8자리를 문자열처럼 "0"을 포함해서 전송 (원 주문 시 출력된 ODNO 값 활용)  (ex. ORGN_ODNO : 00360686) |
| `FM_LIMIT_ORD_PRIC` | FMLIMIT주문가격 | string | N | 20 | OTFM3002U(해외선물옵션주문정정)만 사용 |
| `FM_STOP_ORD_PRIC` | FMSTOP주문가격 | string | N | 20 | OTFM3002U(해외선물옵션주문정정)만 사용 |
| `FM_LQD_LMT_ORD_PRIC` | FM청산LIMIT주문가격 | string | N | 20 | OTFM3002U(해외선물옵션주문정정)만 사용 |
| `FM_LQD_STOP_ORD_PRIC` | FM청산STOP주문가격 | string | N | 20 | OTFM3002U(해외선물옵션주문정정)만 사용 |
| `FM_HDGE_ORD_SCRN_YN` | FM_HEDGE주문화면여부 | string | Y | 1 | N |
| `FM_MKPR_CVSN_YN` | FM시장가전환여부 | string | N | 1 | OTFM3003U(해외선물옵션주문취소)만 사용    ※ FM_MKPR_CVSN_YN 항목에 'Y'로 설정하여 취소주문을 접수할 경우, 주문 취소확인이 들어오면 원장에서 시장가주문을 하나 또 내줌 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 | 0 : 성공  0 이외의 값 : 실패 |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` |  | object | N |  |  |
| `ORD_DT` | 주문일자 | string | N | 8 | YYYYMMDD(ex. 20230811) |
| `ODNO` | 주문번호 | string | N | 8 | 접수한 주문의 일련번호(ex. 00360686)  * 정정/취소시 문자열처럼 "0"을 포함해서 전송     (ex. ORGN_ODNO : 00360686) |

**Request Example:**
```
{      "CANO": "81012345",      "ACNT_PRDT_CD": "08",      "ORGN_ORD_DT": "20221214",      "ORGN_ODNO": "00298044",      "FM_MKPR_CVSN_YN": "N",      "FM_HDGE_ORD_SCRN_YN": "N"  }
```

**Response Example:**
```
{      "rt_cd": "0",      "msg_cd": "APBK0013",      "msg1": "주문 전송 완료 되었습니다.",      "output": {          "ORD_DT": "20221214",          "ODNO": "00298045"      }  }
```

---
### 3. 해외선물옵션 당일주문내역조회

| Field | Value |
|---|---|
| Sheet | `해외선물옵션 당일주문내역조회` |
| Menu | [해외선물옵션] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/overseas-futureoption/v1/trading/inquire-ccld` |
| TR_ID (실전) | `OTFM3116R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `CCLD_NCCS_DVSN` | 체결미체결구분 | string | Y | 2 | 01:전체 / 02:체결 / 03:미체결 |
| `SLL_BUY_DVSN_CD` | 매도매수구분코드 | string | Y | 2 | %%:전체 / 01:매도 / 02:매수 |
| `FUOP_DVSN` | 선물옵션구분 | string | Y | 2 | 00:전체 / 01:선물 / 02:옵션 |
| `CTX_AREA_FK200` | 연속조회검색조건200 | string | Y | 200 |  |
| `CTX_AREA_NK200` | 연속조회키200 | string | Y | 200 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세1 | object array | N |  | Array |
| `cano` | 종합계좌번호 | string | N | 8 |  |
| `acnt_prdt_cd` | 계좌상품코드 | string | N | 2 |  |
| `ord_dt` | 주문일자 | string | N | 8 |  |
| `odno` | 주문번호 | string | N | 8 | 접수한 주문의 일련번호(ex. 00360686)  * 정정/취소시 문자열처럼 "0"을 포함해서 전송     (ex. ORGN_ODNO : 00360686) |
| `orgn_ord_dt` | 원주문일자 | string | N | 8 |  |
| `orgn_odno` | 원주문번호 | string | N | 8 | 원주문번호(ex. 00360685) |
| `ovrs_futr_fx_pdno` | 해외선물FX상품번호 | string | N | 32 |  |
| `rcit_dvsn_cd` | 접수구분코드 | string | N | 2 | 05	온라인 |
| `sll_buy_dvsn_cd` | 매도매수구분코드 | string | N | 2 | 01:매도, 02:매수 |
| `trad_stgy_dvsn_cd` | 매매전략구분코드 | string | N | 2 |  |
| `bass_pric_type_cd` | 기준가격유형코드 | string | N | 2 | 01	시가평가  02	액면가  03	기준가격  04	대용가 |
| `ord_stat_cd` | 주문상태코드 | string | N | 2 |  |
| `fm_ord_qty` | FM주문수량 | string | N | 10 |  |
| `fm_ord_pric` | FM주문가격 | string | N | 20 |  |
| `fm_stop_ord_pric` | FMSTOP주문가격 | string | N | 20 |  |
| `rsvn_dvsn` | 예약구분 | string | N | 2 |  |
| `fm_ccld_qty` | FM체결수량 | string | N | 10 |  |
| `fm_ccld_pric` | FM체결가격 | string | N | 20 |  |
| `fm_ord_rmn_qty` | FM주문잔여수량 | string | N | 10 |  |
| `ord_grp_name` | 주문그룹명 | string | N | 60 |  |
| `erlm_dtl_dtime` | 등록상세일시 | string | N | 17 |  |
| `ccld_dtl_dtime` | 체결상세일시 | string | N | 17 |  |
| `ord_stfno` | 주문직원번호 | string | N | 6 |  |
| `rmks1` | 비고1 | string | N | 100 |  |
| `new_lqd_dvsn_cd` | 신규청산구분코드 | string | N | 2 | 01	신규  02	청산 |
| `fm_lqd_lmt_ord_pric` | FM청산LIMIT주문가격 | string | N | 20 |  |
| `fm_lqd_stop_pric` | FM청산STOP가격 | string | N | 20 |  |
| `ccld_cndt_cd` | 체결조건코드 | string | N | 1 |  |
| `noti_vald_dt` | 게시유효일자 | string | N | 8 |  |
| `acnt_type_cd` | 계좌유형코드 | string | N | 2 |  |
| `fuop_dvsn` | 선물옵션구분 | string | N | 2 | 01:선물, 02: 옵션 |

**Request Example:**
```
{  	"CANO":"80012345",  	"ACNT_PRDT_CD":"08",  	"CCLD_NCCS_DVSN":"01",  	"SLL_BUY_DVSN_CD":"01",  	"FUOP_DVSN":"00",  	"CTX_AREA_FK100":"",  	"CTX_AREA_NK100":"",  }
```

**Response Example:**
```
{      "ctx_area_fk200": "81012345^08^01^02^00^                                                                                                                                                                                   ",      "ctx_area_nk200": "                                                                                                                                                                                                        ",      "output": [          {              "cano": "81012345",              "acnt_prdt_cd": "08",              "ord_dt": "20221214",              "odno": "00298048",              "orgn_ord_dt": "",              "orgn_odno": "",              "ovrs_futr_fx_pdno": "6BZ22",              "rcit_dvsn_cd": "00",              "sll_buy_dvsn_cd": "02",              "trad_stgy_dvsn_cd": "00",              "bass_pric_type_cd": "1",              "ord_stat_cd": "02",              "fm_ord_qty": "1",              "fm_ord_pric": "1.1700",              "fm_stop_ord_pric": "0.0000",              "rsvn_dvsn": "N",              "fm_ccld_qty": "0",              "fm_ccld_pric": "0.0000",              "fm_ord_rmn_qty": "1",              "ord_grp_name": "",              "erlm_dtl_dtime": "20221214134455791",              "ccld_dtl_dtime": "",              "ord_stfno": "invent",              "rmks1": "",              "new_lqd_dvsn_cd": "1",              "fm_lqd_lmt_ord_pric": "0.0000",              "fm_lqd_stop_pric": "0.0000",              "ccld_cndt_cd": "6",              "noti_vald_dt": "",              "acnt_type_cd": "1",              "fuop_dvsn": "01"          },          {              "cano": "81012345",              "acnt_prdt_cd": "08",              "ord_dt": "20221214",              "odno": "00298045",              "orgn_ord_dt": "20221214",              "orgn_odno": "00298044",              "ovrs_futr_fx_pdno": "6BZ22",              "rcit_dvsn_cd": "02",              "sll_buy_dvsn_cd": "02",              "trad_stgy_dvsn_cd": "00",              "bass_pric_type_cd": "1",              "ord_stat_cd": "02",              "fm_ord_qty": "1",              "fm_ord_pric": "0.0000",              "fm_stop_ord_pric": "0.0000",              "rsvn_dvsn": "N",              "fm_ccld_qty": "0",              "fm_ccld_pric": "0.0000",              "fm_ord_rmn_qty": "0",              "ord_grp_name": "",              "erlm_dtl_dtime": "20221214134356649",              "ccld_dtl_dtime": "",              "ord_stfno": "invent",              "rmks1": "",              "new_lqd_dvsn_cd": "1",              "fm_lqd_lmt_ord_pric": "0.0000",              "fm_lqd_stop_pric": "0.0000",              "ccld_cndt_cd": "6",              "noti_vald_dt": "",              "acnt_type_cd": "1",              "fuop_dvsn": "01"          },          {              "cano": "81012345",              "acnt_prdt_cd": "08",              "ord_dt": "20221214",              "odno": "00298044",              "orgn_ord_dt": "",              "orgn_odno": "",              "ovrs
```

---
### 4. 해외선물옵션 미결제내역조회(잔고)

| Field | Value |
|---|---|
| Sheet | `해외선물옵션 미결제내역조회(잔고)` |
| Menu | [해외선물옵션] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/overseas-futureoption/v1/trading/inquire-unpd` |
| TR_ID (실전) | `OTFM1412R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `FUOP_DVSN` | 선물옵션구분 | string | Y | 2 | 00: 전체 / 01:선물 / 02: 옵션 |
| `CTX_AREA_FK100` | 연속조회검색조건100 | string | Y | 100 |  |
| `CTX_AREA_NK100` | 연속조회키100 | string | Y | 100 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세1 | object array | N |  | Array |
| `cano` | 종합계좌번호 | string | N | 8 |  |
| `acnt_prdt_cd` | 계좌상품코드 | string | N | 2 |  |
| `ovrs_futr_fx_pdno` | 해외선물FX상품번호 | string | N | 32 |  |
| `prdt_type_cd` | 상품유형코드 | string | N | 3 |  |
| `crcy_cd` | 통화코드 | string | N | 3 |  |
| `sll_buy_dvsn_cd` | 매도매수구분코드 | string | N | 2 |  |
| `fm_ustl_qty` | FM미결제수량 | string | N | 10 |  |
| `fm_ccld_avg_pric` | FM체결평균가격 | string | N | 20 |  |
| `fm_now_pric` | FM현재가격 | string | N | 20 |  |
| `fm_evlu_pfls_amt` | FM평가손익금액 | string | N | 20 |  |
| `fm_opt_evlu_amt` | FM옵션평가금액 | string | N | 20 |  |
| `fm_otp_evlu_pfls_amt` | FM옵션평가손익금액 | string | N | 20 |  |
| `fuop_dvsn` | 선물옵션구분 | string | N | 2 |  |
| `ecis_rsvn_ord_yn` | 행사예약주문여부 | string | N | 1 |  |
| `fm_lqd_psbl_qty` | FM청산가능수량 | string | N | 10 |  |

**Request Example:**
```
{  	"CANO":"80012345",  	"ACNT_PRDT_CD":"08",  	"FUOP_DVSN":"00",  	"CTX_AREA_FK100":"",  	"CTX_AREA_NK100":"",  }
```

**Response Example:**
```
{      "ctx_area_fk100": "81012345^08^00^                                                                                     ",      "ctx_area_nk100": "                                                                                                    ",      "output": [          {              "cano": "81012345",              "acnt_prdt_cd": "08",              "ovrs_futr_fx_pdno": "6AZ22",              "prdt_type_cd": "600",              "crcy_cd": "USD",              "sll_buy_dvsn_cd": "02",              "fm_ustl_qty": "2",              "fm_ccld_avg_pric": "0.62950",              "fm_now_pric": "0.68320",              "fm_evlu_pfls_amt": "10740.00",              "fm_opt_evlu_amt": "",              "fm_otp_evlu_pfls_amt": "",              "fuop_dvsn": "01",              "ecis_rsvn_ord_yn": "",              "fm_lqd_psbl_qty": "2"          },          {              "cano": "81012345",              "acnt_prdt_cd": "08",              "ovrs_futr_fx_pdno": "6BZ22",              "prdt_type_cd": "600",              "crcy_cd": "USD",              "sll_buy_dvsn_cd": "02",              "fm_ustl_qty": "2",              "fm_ccld_avg_pric": "1.1898",              "fm_now_pric": "1.2350",              "fm_evlu_pfls_amt": "5656.24",              "fm_opt_evlu_amt": "",              "fm_otp_evlu_pfls_amt": "",              "fuop_dvsn": "01",              "ecis_rsvn_ord_yn": "",              "fm_lqd_psbl_qty": "2"          },          {              "cano": "81012345",              "acnt_prdt_cd": "08",              "ovrs_futr_fx_pdno": "6JZ22",              "prdt_type_cd": "600",              "crcy_cd": "USD",              "sll_buy_dvsn_cd": "02",              "fm_ustl_qty": "1",              "fm_ccld_avg_pric": "6925.0",              "fm_now_pric": "7383.0",              "fm_evlu_pfls_amt": "5725.00",              "fm_opt_evlu_amt": "",              "fm_otp_evlu_pfls_amt": "",              "fuop_dvsn": "01",              "ecis_rsvn_ord_yn": "",              "fm_lqd_psbl_qty": "1"          },          {              "cano": "81012345",              "acnt_prdt_cd": "08",              "ovrs_futr_fx_pdno": "ZBZ22",              "prdt_type_cd": "600",              "crcy_cd": "USD",              "sll_buy_dvsn_cd": "01",              "fm_ustl_qty": "100",              "fm_ccld_avg_pric": "132.293125",              "fm_now_pric": "131.218750",              "fm_evlu_pfls_amt": "107438.00",              "fm_opt_evlu_amt": "",              "fm_otp_evlu_pfls_amt": "",              "fuop_dvsn": "01",              "ecis_rsvn_ord_yn": "",              "fm_lqd_psbl_qty": "100"          }      ],      "rt_cd": "0",      "msg_cd": "KIOK0510",      "msg1": "조회가 완료되었습니다                                                           "  }
```

---
### 5. 해외선물옵션 주문가능조회

| Field | Value |
|---|---|
| Sheet | `해외선물옵션 주문가능조회` |
| Menu | [해외선물옵션] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/overseas-futureoption/v1/trading/inquire-psamount` |
| TR_ID (실전) | `OTFM3304R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `OVRS_FUTR_FX_PDNO` | 해외선물FX상품번호 | string | Y | 32 |  |
| `SLL_BUY_DVSN_CD` | 매도매수구분코드 | string | Y | 2 | 01 : 매도 / 02 : 매수 |
| `FM_ORD_PRIC` | FM주문가격 | string | Y | 20 |  |
| `ECIS_RSVN_ORD_YN` | 행사예약주문여부 | string | Y | 1 | N |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세1 | object | N |  |  |
| `cano` | 종합계좌번호 | string | N | 8 |  |
| `acnt_prdt_cd` | 계좌상품코드 | string | N | 2 |  |
| `ovrs_futr_fx_pdno` | 해외선물FX상품번호 | string | N | 32 |  |
| `crcy_cd` | 통화코드 | string | N | 3 |  |
| `sll_buy_dvsn_cd` | 매도매수구분코드 | string | N | 2 |  |
| `fm_ustl_qty` | FM미결제수량 | string | N | 10 |  |
| `fm_lqd_psbl_qty` | FM청산가능수량 | string | N | 10 |  |
| `fm_new_ord_psbl_qty` | FM신규주문가능수량 | string | N | 10 |  |
| `fm_tot_ord_psbl_qty` | FM총주문가능수량 | string | N | 10 |  |
| `fm_mkpr_tot_ord_psbl_qty` | FM시장가총주문가능수량 | string | N | 10 |  |

**Request Example:**
```
{  	"CANO":"80012345",  	"ACNT_PRDT_CD":"08",  	"OVRS_FUTR_FX_PDNO":"6AU22",  	"SLL_BUY_DVSN_CD":"02",  	"FM_ORD_PRIC":"",  	"ECIS_RSVN_ORD_YN":""  }
```

**Response Example:**
```
{      "output": {          "cano": "80012345",          "acnt_prdt_cd": "08",          "ovrs_futr_fx_pdno": "6AU22",          "crcy_cd": "",          "sll_buy_dvsn_cd": "02",          "fm_ustl_qty": "0",          "fm_lqd_psbl_qty": "0",          "fm_new_ord_psbl_qty": "3717",          "fm_tot_ord_psbl_qty": "3717",          "fm_mkpr_tot_ord_psbl_qty": "3717"      },      "rt_cd": "0",      "msg_cd": "KIOK0510",      "msg1": "조회가 완료되었습니다                                                           "  }
```

---
### 6. 해외선물옵션 기간계좌손익 일별

| Field | Value |
|---|---|
| Sheet | `해외선물옵션 기간계좌손익 일별` |
| Menu | [해외선물옵션] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/overseas-futureoption/v1/trading/inquire-period-ccld` |
| TR_ID (실전) | `OTFM3118R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `INQR_TERM_FROM_DT` | 조회기간FROM일자 | string | Y | 8 |  |
| `INQR_TERM_TO_DT` | 조회기간TO일자 | string | Y | 8 |  |
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `CRCY_CD` | 통화코드 | string | Y | 3 | '%%% : 전체  TUS: TOT_USD  / TKR: TOT_KRW  KRW: 한국  / USD: 미국  EUR: EUR   / HKD: 홍콩  CNY: 중국  / JPY: 일본' |
| `WHOL_TRSL_YN` | 전체환산여부 | string | Y | 1 | N |
| `FUOP_DVSN` | 선물옵션구분 | string | Y | 2 | 00:전체 / 01:선물 / 02:옵션 |
| `CTX_AREA_FK200` | 연속조회검색조건200 | string | Y | 200 |  |
| `CTX_AREA_NK200` | 연속조회키200 | string | Y | 200 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세1 | object array | Y |  | Array |
| `cano` | 종합계좌번호 | string | Y | 8 |  |
| `acnt_prdt_cd` | 계좌상품코드 | string | N | 2 |  |
| `crcy_cd` | 통화코드 | string | Y | 3 |  |
| `fm_buy_qty` | FM매수수량 | string | Y | 10 |  |
| `fm_sll_qty` | FM매도수량 | string | Y | 10 |  |
| `fm_lqd_pfls_amt` | FM청산손익금액 | string | Y | 20 |  |
| `fm_fee` | FM수수료 | string | Y | 20 |  |
| `fm_net_pfls_amt` | FM순손익금액 | string | Y | 20 |  |
| `fm_ustl_buy_qty` | FM미결제매수수량 | string | Y | 10 |  |
| `fm_ustl_sll_qty` | FM미결제매도수량 | string | Y | 10 |  |
| `fm_ustl_evlu_pfls_amt` | FM미결제평가손익금액 | string | Y | 20 |  |
| `fm_ustl_evlu_pfls_amt2` | FM미결제평가손익금액2 | string | Y | 20 |  |
| `fm_ustl_evlu_pfls_icdc_amt` | FM미결제평가손익증감금액 | string | Y | 20 |  |
| `fm_ustl_agrm_amt` | FM미결제약정금액 | string | Y | 20 |  |
| `fm_opt_lqd_amt` | FM옵션청산금액 | string | Y | 20 |  |
| `output2` | 응답상세2 | object array | Y |  | Array |
| `cano` | 종합계좌번호 | string | Y | 8 |  |
| `acnt_prdt_cd` | 계좌상품코드 | string | Y | 2 |  |
| `ovrs_futr_fx_pdno` | 해외선물FX상품번호 | string | Y | 32 |  |
| `crcy_cd` | 통화코드 | string | Y | 3 |  |
| `fm_buy_qty` | FM매수수량 | string | Y | 10 |  |
| `fm_sll_qty` | FM매도수량 | string | Y | 10 |  |
| `fm_lqd_pfls_amt` | FM청산손익금액 | string | Y | 20 |  |
| `fm_fee` | FM수수료 | string | Y | 20 |  |
| `fm_net_pfls_amt` | FM순손익금액 | string | Y | 20 |  |
| `fm_ustl_buy_qty` | FM미결제매수수량 | string | Y | 10 |  |
| `fm_ustl_sll_qty` | FM미결제매도수량 | string | Y | 10 |  |
| `fm_ustl_evlu_pfls_amt` | FM미결제평가손익금액 | string | Y | 20 |  |
| `fm_ustl_evlu_pfls_amt2` | FM미결제평가손익금액2 | string | Y | 20 |  |
| `fm_ustl_evlu_pfls_icdc_amt` | FM미결제평가손익증감금액 | string | Y | 20 |  |
| `fm_ccld_avg_pric` | FM체결평균가격 | string | Y | 20 |  |
| `fm_ustl_agrm_amt` | FM미결제약정금액 | string | Y | 20 |  |
| `fm_opt_lqd_amt` | FM옵션청산금액 | string | Y | 20 |  |

**Request Example:**
```
{  	"CANO":"80012345",  	"ACNT_PRDT_CD":"08",  	"INQR_TERM_FROM_DT":"20220901",  	"INQR_TERM_TO_DT":"20221117",  	"CRCY_CD":"%%%",  	"WHOL_TRSL_YN":"N",  	"FUOP_DVSN":"00",  	"CTX_AREA_FK100":"",  	"CTX_AREA_NK100":"",  }
```

**Response Example:**
```
{      "ctx_area_fk200": "                                                                                                                                                                                                        ",      "ctx_area_nk200": "                                                                                                                                                                                                        ",      "output1": [          {              "cano": "80012345",              "acnt_prdt_cd": "08",              "crcy_cd": "USD",              "fm_buy_qty": "",              "fm_sll_qty": "",              "fm_lqd_pfls_amt": "0.00",              "fm_fee": "0.00",              "fm_net_pfls_amt": "129650.00",              "fm_ustl_buy_qty": "5",              "fm_ustl_sll_qty": "100",              "fm_ustl_evlu_pfls_amt": "129650.00",              "fm_ustl_evlu_pfls_amt2": "0.00",              "fm_ustl_evlu_pfls_icdc_amt": "129650.00",              "fm_ustl_agrm_amt": "13590493.75",              "fm_opt_lqd_amt": "0.00"          }      ],      "output2": [          {              "cano": "80012345",              "acnt_prdt_cd": "08",              "ovrs_futr_fx_pdno": "6AZ22",              "crcy_cd": "USD",              "fm_buy_qty": "",              "fm_sll_qty": "",              "fm_lqd_pfls_amt": "0.00",              "fm_fee": "0.00",              "fm_net_pfls_amt": "10850.00",              "fm_ustl_buy_qty": "2",              "fm_ustl_sll_qty": "",              "fm_ustl_evlu_pfls_amt": "10850.00",              "fm_ustl_evlu_pfls_amt2": "0.00",              "fm_ustl_evlu_pfls_icdc_amt": "10850.00",              "fm_ccld_avg_pric": "0.62950",              "fm_ustl_agrm_amt": "125900.00",              "fm_opt_lqd_amt": "0.00"          },          {              "cano": "80012345",              "acnt_prdt_cd": "08",              "ovrs_futr_fx_pdno": "6BZ22",              "crcy_cd": "USD",              "fm_buy_qty": "",              "fm_sll_qty": "",              "fm_lqd_pfls_amt": "0.00",              "fm_fee": "0.00",              "fm_net_pfls_amt": "5656.25",              "fm_ustl_buy_qty": "2",              "fm_ustl_sll_qty": "",              "fm_ustl_evlu_pfls_amt": "5656.25",              "fm_ustl_evlu_pfls_amt2": "0.00",              "fm_ustl_evlu_pfls_icdc_amt": "5656.25",              "fm_ccld_avg_pric": "1.1898",              "fm_ustl_agrm_amt": "148718.75",              "fm_opt_lqd_amt": "0.00"          },          {              "cano": "80012345",              "acnt_prdt_cd": "08",              "ovrs_futr_fx_pdno": "6JZ22",              "crcy_cd": "USD",              "fm_buy_qty": "",              "fm_sll_qty": "",              "fm_lqd_pfls_amt": "0.00",              "fm_fee": "0.00",              "fm_net_pfls_amt": "5706.25",              "fm_ustl_buy_qty": "1",              "fm_ustl_sll_qty": "",              "fm_ustl_evlu_pfls_amt": "5706.25",              "fm_ustl_evlu_pfls_amt2": "0.00",  
```

---
### 7. 해외선물옵션 일별 체결내역

| Field | Value |
|---|---|
| Sheet | `해외선물옵션 일별 체결내역` |
| Menu | [해외선물옵션] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/overseas-futureoption/v1/trading/inquire-daily-ccld` |
| TR_ID (실전) | `OTFM3122R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `STRT_DT` | 시작일자 | string | Y | 8 | 시작일자(YYYYMMDD) |
| `END_DT` | 종료일자 | string | Y | 8 | 종료일자(YYYYMMDD) |
| `FUOP_DVSN_CD` | 선물옵션구분코드 | string | Y | 2 | 00:전체 / 01:선물 / 02:옵션 |
| `FM_PDGR_CD` | FM상품군코드 | string | Y | 10 | 공란(Default) |
| `CRCY_CD` | 통화코드 | string | Y | 3 | %%% : 전체  TUS: TOT_USD  / TKR: TOT_KRW  KRW: 한국  / USD: 미국  EUR: EUR   / HKD: 홍콩  CNY: 중국  / JPY: 일본  VND: 베트남 |
| `FM_ITEM_FTNG_YN` | FM종목합산여부 | string | Y | 1 | "N"(Default) |
| `SLL_BUY_DVSN_CD` | 매도매수구분코드 | string | Y | 2 | %%: 전체 / 01 : 매도 / 02 : 매수 |
| `CTX_AREA_FK200` | 연속조회검색조건200 | string | Y | 200 |  |
| `CTX_AREA_NK200` | 연속조회키200 | string | Y | 200 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output2` | 응답상세2 | object | Y |  |  |
| `fm_tot_ccld_qty` | FM총체결수량 | string | Y | 10 |  |
| `fm_tot_futr_agrm_amt` | FM총선물약정금액 | string | Y | 20 |  |
| `fm_tot_opt_agrm_amt` | FM총옵션약정금액 | string | Y | 20 |  |
| `fm_fee_smtl` | FM수수료합계 | string | Y | 20 |  |
| `output1` | 응답상세1 | object array | Y |  | Array |
| `dt` | 일자 | string | Y | 8 |  |
| `ccno` | 체결번호 | string | Y | 8 |  |
| `ovrs_futr_fx_pdno` | 해외선물FX상품번호 | string | Y | 32 |  |
| `sll_buy_dvsn_cd` | 매도매수구분코드 | string | Y | 3 |  |
| `fm_ccld_qty` | FM체결수량 | string | Y | 10 |  |
| `fm_ccld_amt` | FM체결금액 | string | Y | 20 |  |
| `fm_futr_ccld_amt` | FM선물체결금액 | string | Y | 20 |  |
| `fm_opt_ccld_amt` | FM옵션체결금액 | string | Y | 20 |  |
| `crcy_cd` | 통화코드 | string | Y | 3 |  |
| `fm_fee` | FM수수료 | string | Y | 20 |  |
| `fm_futr_pure_agrm_amt` | FM선물순약정금액 | string | Y | 20 |  |
| `fm_opt_pure_agrm_amt` | FM옵션순약정금액 | string | Y | 20 |  |
| `ccld_dtl_dtime` | 체결상세일시 | string | Y | 17 |  |
| `ord_dt` | 주문일자 | string | Y | 8 |  |
| `odno` | 주문번호 | string | Y | 8 | 접수한 주문의 일련번호(ex. 00360686) |
| `ord_mdia_dvsn_name` | 주문매체구분명 | string | Y | 60 |  |

**Request Example:**
```
{  	"CANO":"80012345",  	"ACNT_PRDT_CD":"08",  	"STRT_DT":"20221010",  	"END_DT":"20221216",  	"FUOP_DVSN":"00",  	"FM_PDGR_CD":"",  	"CRCY_CD":"%%%",  	"FM_ITEM_FTNG_YN":"N",  	"SLL_BUY_DVSN_CD":"%%",  	"CTX_AREA_FK100":"",  	"CTX_AREA_NK100":"",  }
```

**Response Example:**
```
{      "ctx_area_fk200": "80012345^08^20221010^20221216^00^^%%%^N^%%^                                                                                                                                                             ",      "ctx_area_nk200": "                                                                                                                                                                                                        ",      "output1": [          {              "dt": "20221020",              "ccno": "00004090",              "ovrs_futr_fx_pdno": "6AZ22",              "sll_buy_dvsn_cd": "02",              "fm_ccld_qty": "1",              "fm_ccld_amt": ".62955",              "fm_futr_ccld_amt": "62955",              "fm_opt_ccld_amt": "0",              "crcy_cd": "USD",              "fm_fee": "12.5",              "fm_futr_pure_agrm_amt": "62967.5",              "fm_opt_pure_agrm_amt": "0",              "ccld_dtl_dtime": "20221020132204282",              "ord_dt": "20221020",              "odno": "00284471",              "ord_mdia_dvsn_name": "일반"          },          {              "dt": "20221020",              "ccno": "00004089",              "ovrs_futr_fx_pdno": "6AZ22",              "sll_buy_dvsn_cd": "02",              "fm_ccld_qty": "1",              "fm_ccld_amt": ".62945",              "fm_futr_ccld_amt": "62945",              "fm_opt_ccld_amt": "0",              "crcy_cd": "USD",              "fm_fee": "12.5",              "fm_futr_pure_agrm_amt": "62957.5",              "fm_opt_pure_agrm_amt": "0",              "ccld_dtl_dtime": "20221020125948252",              "ord_dt": "20221020",              "odno": "00284466",              "ord_mdia_dvsn_name": "일반"          }      ],      "output2": {          "fm_tot_ccld_qty": "2",          "fm_tot_futr_agrm_amt": "125900",          "fm_tot_opt_agrm_amt": "0",          "fm_fee_smtl": "25"      },      "rt_cd": "0",      "msg_cd": "KIOK0510",      "msg1": "조회가 완료되었습니다                                                           "  }
```

---
### 8. 해외선물옵션 예수금현황

| Field | Value |
|---|---|
| Sheet | `해외선물옵션 예수금현황` |
| Menu | [해외선물옵션] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/overseas-futureoption/v1/trading/inquire-deposit` |
| TR_ID (실전) | `OTFM1411R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `CRCY_CD` | 통화코드 | string | Y | 3 | TUS: TOT_USD  / TKR: TOT_KRW  KRW: 한국  / USD: 미국  EUR: EUR   / HKD: 홍콩  CNY: 중국  / JPY: 일본  VND: 베트남 |
| `INQR_DT` | 조회일자 | string | Y | 8 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세1 | object | Y |  |  |
| `fm_nxdy_dncl_amt` | FM익일예수금액 | string | Y | 20 |  |
| `fm_tot_asst_evlu_amt` | FM총자산평가금액 | string | Y | 20 |  |
| `cano` | 종합계좌번호 | string | Y | 8 |  |
| `acnt_prdt_cd` | 계좌상품코드 | string | Y | 2 |  |
| `crcy_cd` | 통화코드 | string | Y | 3 |  |
| `resp_dt` | 응답일자 | string | Y | 8 |  |
| `fm_dnca_rmnd` | FM예수금잔액 | string | Y | 20 |  |
| `fm_lqd_pfls_amt` | FM청산손익금액 | string | Y | 20 |  |
| `fm_fee` | FM수수료 | string | Y | 20 |  |
| `fm_fuop_evlu_pfls_amt` | FM선물옵션평가손익금액 | string | Y | 20 |  |
| `fm_rcvb_amt` | FM미수금액 | string | Y | 20 |  |
| `fm_brkg_mgn_amt` | FM위탁증거금액 | string | Y | 20 |  |
| `fm_mntn_mgn_amt` | FM유지증거금액 | string | Y | 20 |  |
| `fm_add_mgn_amt` | FM추가증거금액 | string | Y | 20 |  |
| `fm_risk_rt` | FM위험율 | string | Y | 10 |  |
| `fm_ord_psbl_amt` | FM주문가능금액 | string | Y | 20 |  |
| `fm_drwg_psbl_amt` | FM출금가능금액 | string | Y | 20 |  |
| `fm_echm_rqrm_amt` | FM환전요청금액 | string | Y | 20 |  |
| `fm_drwg_prar_amt` | FM출금예정금액 | string | Y | 20 |  |
| `fm_opt_tr_chgs` | FM옵션거래대금 | string | Y | 20 |  |
| `fm_opt_icld_asst_evlu_amt` | FM옵션포함자산평가금액 | string | Y | 20 |  |
| `fm_opt_evlu_amt` | FM옵션평가금액 | string | Y | 20 |  |
| `fm_crcy_sbst_amt` | FM통화대용금액 | string | Y | 20 |  |
| `fm_crcy_sbst_use_amt` | FM통화대용사용금액 | string | Y | 20 |  |
| `fm_crcy_sbst_stup_amt` | FM통화대용설정금액 | string | Y | 20 |  |

**Request Example:**
```
{  	"CANO":"80012345",  	"ACNT_PRDT_CD":"08",  	"CRCY_CD":":"KRW",  	"INQR_DT":"20221214"  }
```

**Response Example:**
```
{      "output": {          "cano": "81012345",          "acnt_prdt_cd": "08",          "crcy_cd": "KRW",          "resp_dt": "20230104",          "fm_dnca_rmnd": "9990000012",          "fm_lqd_pfls_amt": "0",          "fm_fee": "0",          "fm_nxdy_dncl_amt": "9990000012",          "fm_tot_asst_evlu_amt": "9990000012",          "fm_fuop_evlu_pfls_amt": "0",          "fm_rcvb_amt": "0",          "fm_brkg_mgn_amt": "0",          "fm_mntn_mgn_amt": "0",          "fm_add_mgn_amt": "0",          "fm_risk_rt": "0.00",          "fm_ord_psbl_amt": "9718323936",          "fm_drwg_psbl_amt": "9704739489",          "fm_echm_rqrm_amt": "0",          "fm_drwg_prar_amt": "0",          "fm_opt_tr_chgs": "0",          "fm_opt_icld_asst_evlu_amt": "9990000012",          "fm_opt_evlu_amt": "0",          "fm_crcy_sbst_amt": "0",          "fm_crcy_sbst_use_amt": "0",          "fm_crcy_sbst_stup_amt": "0"      },      "rt_cd": "0",      "msg_cd": "KIOK0510",      "msg1": "조회가 완료되었습니다                                                           "  }
```

---
### 9. 해외선물옵션 일별 주문내역

| Field | Value |
|---|---|
| Sheet | `해외선물옵션 일별 주문내역` |
| Menu | [해외선물옵션] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/overseas-futureoption/v1/trading/inquire-daily-order` |
| TR_ID (실전) | `OTFM3120R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `STRT_DT` | 시작일자 | string | Y | 8 |  |
| `END_DT` | 종료일자 | string | Y | 8 |  |
| `FM_PDGR_CD` | FM상품군코드 | string | Y | 10 |  |
| `CCLD_NCCS_DVSN` | 체결미체결구분 | string | Y | 2 | 01:전체 / 02:체결 / 03:미체결 |
| `SLL_BUY_DVSN_CD` | 매도매수구분코드 | string | Y | 2 | %%전체 / 01 : 매도 / 02 : 매수 |
| `FUOP_DVSN` | 선물옵션구분 | string | Y | 2 | 00:전체 / 01:선물 / 02:옵션 |
| `CTX_AREA_FK200` | 연속조회검색조건200 | string | Y | 200 |  |
| `CTX_AREA_NK200` | 연속조회키200 | string | Y | 200 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세1 | object array | Y |  | Array |
| `cano` | 종합계좌번호 | string | Y | 8 |  |
| `acnt_prdt_cd` | 계좌상품코드 | string | Y | 2 |  |
| `dt` | 일자 | string | Y | 8 |  |
| `ord_dt` | 주문일자 | string | Y | 8 |  |
| `odno` | 주문번호 | string | Y | 8 | 접수한 주문의 일련번호(ex. 00360686)  * 정정/취소시 문자열처럼 "0"을 포함해서 전송     (ex. ORGN_ODNO : 00360686)  * 정정/취소시 문자열처럼 "0"을 포함해서 전송     (ex. ORGN_ODNO : 00360686) |
| `orgn_ord_dt` | 원주문일자 | string | Y | 8 |  |
| `orgn_odno` | 원주문번호 | string | Y | 8 | 원주문번호(ex. 00360685) |
| `ovrs_futr_fx_pdno` | 해외선물FX상품번호 | string | Y | 32 |  |
| `rvse_cncl_dvsn_cd` | 정정취소구분코드 | string | Y | 2 | 청산체결이 없는 신규	00  청산체결이 없는 정정	01  청산체결이 없는 취소	02  청산체결이 있는 취소	02  청산체결이 있는 신규	03  청산체결이 있는 정정	04  행사	05  배정	06  소멸	07  만기	08 |
| `sll_buy_dvsn_cd` | 매도매수구분코드 | string | Y | 2 |  |
| `cplx_ord_dvsn_cd` | 복합주문구분코드 | string | Y | 1 |  |
| `pric_dvsn_cd` | 가격구분코드 | string | Y | 1 |  |
| `rcit_dvsn_cd` | 접수구분코드 | string | Y | 2 |  |
| `fm_ord_qty` | FM주문수량 | string | Y | 10 |  |
| `fm_ord_pric` | FM주문가격 | string | Y | 20 |  |
| `fm_stop_ord_pric` | FMSTOP주문가격 | string | Y | 20 |  |
| `ecis_rsvn_ord_yn` | 행사예약주문여부 | string | Y | 1 |  |
| `fm_ccld_qty` | FM체결수량 | string | Y | 10 |  |
| `fm_ccld_pric` | FM체결가격 | string | Y | 20 |  |
| `fm_ord_rmn_qty` | FM주문잔여수량 | string | Y | 10 |  |
| `ord_grp_name` | 주문그룹명 | string | Y | 60 |  |
| `rcit_dtl_dtime` | 접수상세일시 | string | Y | 17 |  |
| `ccld_dtl_dtime` | 체결상세일시 | string | Y | 17 |  |
| `ordr_emp_no` | 주문자사원번호 | string | Y | 6 |  |
| `rjct_rson_name` | 거부사유명 | string | Y | 60 |  |
| `ccld_cndt_cd` | 체결조건코드 | string | Y | 1 |  |
| `trad_end_dt` | 매매종료일자 | string | Y | 8 |  |

**Request Example:**
```
{  	"CANO":"12345678",  	"ACNT_PRDT_CD":"08",  	"STRT_DT":"20220101",  	"END_DT":"20221214",  	"FM_PDGR_CD":"",  	"CCLD_NCCS_DVSN":"01",  	"SLL_BUY_DVSN_CD":"%%",  	"FUOP_DVSN":"00",  	"CTX_AREA_FK200":"",  	"CTX_AREA_NK200":"",  }
```

**Response Example:**
```
{      "ctx_area_fk200": "12345678^08^20231206^20231206^^01^%%^00^                                                                                                                                                                ",      "ctx_area_nk200": "                                                                                                                                                                                                        ",      "output": [          {              "cano": "12345678",              "acnt_prdt_cd": "08",              "dt": "20231206",              "ord_dt": "20231206",              "odno": "00362398",              "orgn_ord_dt": "",              "orgn_odno": "",              "ovrs_futr_fx_pdno": "6CZ23",              "rvse_cncl_dvsn_cd": "00",              "sll_buy_dvsn_cd": "02",              "cplx_ord_dvsn_cd": "0",              "pric_dvsn_cd": "2",              "rcit_dvsn_cd": "02",              "fm_ord_qty": "3",              "fm_ord_pric": "0.00000",              "fm_stop_ord_pric": "0.00000",              "ecis_rsvn_ord_yn": "N",              "fm_ccld_qty": "3",              "fm_ccld_pric": "0.73935",              "fm_ord_rmn_qty": "0",              "ord_grp_name": "",              "rcit_dtl_dtime": "20231206092306005",              "ccld_dtl_dtime": "20231206092306005",              "ordr_emp_no": "109171",              "rjct_rson_name": "",              "ccld_cndt_cd": "2",              "trad_end_dt": ""          },          {              "cano": "12345678",              "acnt_prdt_cd": "08",              "dt": "20231206",              "ord_dt": "20231206",              "odno": "00362397",              "orgn_ord_dt": "",              "orgn_odno": "",              "ovrs_futr_fx_pdno": "6CZ23",              "rvse_cncl_dvsn_cd": "00",              "sll_buy_dvsn_cd": "02",              "cplx_ord_dvsn_cd": "0",              "pric_dvsn_cd": "2",              "rcit_dvsn_cd": "02",              "fm_ord_qty": "1",              "fm_ord_pric": "0.00000",              "fm_stop_ord_pric": "0.00000",              "ecis_rsvn_ord_yn": "N",              "fm_ccld_qty": "1",              "fm_ccld_pric": "0.73925",              "fm_ord_rmn_qty": "0",              "ord_grp_name": "",              "rcit_dtl_dtime": "20231206092247252",              "ccld_dtl_dtime": "20231206092247252",              "ordr_emp_no": "109171",              "rjct_rson_name": "",              "ccld_cndt_cd": "2",              "trad_end_dt": ""          },          {              "cano": "12345678",              "acnt_prdt_cd": "08",              "dt": "20231206",              "ord_dt": "20231206",              "odno": "00362396",              "orgn_ord_dt": "",              "orgn_odno": "",              "ovrs_futr_fx_pdno": "6CZ23",              "rvse_cncl_dvsn_cd": "00",              "sll_buy_dvsn_cd": "02",              "cplx_ord_dvsn_cd": "0",              "pric_dvsn_cd": "2",              "rcit_dvsn_cd": "02",              "fm_ord_qty"
```

---
### 10. 해외선물옵션 기간계좌거래내역

| Field | Value |
|---|---|
| Sheet | `해외선물옵션 기간계좌거래내역` |
| Menu | [해외선물옵션] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/overseas-futureoption/v1/trading/inquire-period-trans` |
| TR_ID (실전) | `OTFM3114R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `INQR_TERM_FROM_DT` | 조회기간FROM일자 | string | Y | 8 |  |
| `INQR_TERM_TO_DT` | 조회기간TO일자 | string | Y | 8 |  |
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `ACNT_TR_TYPE_CD` | 계좌거래유형코드 | string | Y | 2 | 1: 전체, 2:입출금 , 3: 결제 |
| `CRCY_CD` | 통화코드 | string | Y | 3 | '%%% : 전체  TUS: TOT_USD  / TKR: TOT_KRW  KRW: 한국  / USD: 미국  EUR: EUR   / HKD: 홍콩  CNY: 중국  / JPY: 일본  VND: 베트남  ' |
| `CTX_AREA_FK100` | 연속조회검색조건100 | string | Y | 100 | 공란 : 최초 조회시  이전 조회 Output CTX_AREA_FK100값 : 다음페이지 조회시(2번째부터) |
| `CTX_AREA_NK100` | 연속조회키100 | string | Y | 100 | 공란 : 최초 조회시  이전 조회 Output CTX_AREA_NK100값 : 다음페이지 조회시(2번째부터) |
| `PWD_CHK_YN` | 비밀번호체크여부 | string | Y | 1 | 공란(Default) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세1 | object array | Y |  | Array |
| `bass_dt` | 기준일자 | string | Y | 8 |  |
| `cano` | 종합계좌번호 | string | Y | 8 |  |
| `acnt_prdt_cd` | 계좌상품코드 | string | Y | 2 |  |
| `fm_ldgr_inog_seq` | FM원장출납순번 | string | Y | 10 |  |
| `acnt_tr_type_name` | 계좌거래유형명 | string | Y | 60 |  |
| `crcy_cd` | 통화코드 | string | Y | 3 |  |
| `tr_itm_name` | 거래항목명 | string | Y | 60 |  |
| `fm_iofw_amt` | FM입출금액 | string | Y | 20 |  |
| `fm_fee` | FM수수료 | string | Y | 20 |  |
| `fm_tax_amt` | FM세금금액 | string | Y | 20 |  |
| `fm_sttl_amt` | FM결제금액 | string | Y | 20 |  |
| `fm_bf_dncl_amt` | FM이전예수금액 | string | Y | 20 |  |
| `fm_dncl_amt` | FM예수금액 | string | Y | 20 |  |
| `fm_rcvb_occr_amt` | FM미수발생금액 | string | Y | 20 |  |
| `fm_rcvb_pybk_amt` | FM미수변제금액 | string | Y | 20 |  |
| `ovdu_int_pybk_amt` | 연체이자변제금액 | string | Y | 20 |  |
| `rmks_text` | 비고내용 | string | Y | 500 |  |

**Request Example:**
```
{  	"INQR_TERM_FROM_DT":"20220101",  	"INQR_TERM_TO_DT":"20221214",  	"CANO":"80012345",  	"ACNT_PRDT_CD":"08",  	"ACNT_TR_TYPE_CD":"%%",  	"CRCY_CD":"%%%",  	"CTX_AREA_FK100":"",  	"CTX_AREA_NK100":"",  	"PWD_CHK_YN":""  }
```

**Response Example:**
```
{      "ctx_area_fk100": "20220101^20221214^81012345^08^%%^%%%^                                                               ",      "ctx_area_nk100": "                                                                                                    ",      "output": [],      "rt_cd": "0",      "msg_cd": "KIOK0560",      "msg1": "조회할 내용이 없습니다                                                          "  }
```

---
### 11. 해외선물옵션 증거금상세

| Field | Value |
|---|---|
| Sheet | `해외선물옵션 증거금상세` |
| Menu | [해외선물옵션] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/overseas-futureoption/v1/trading/margin-detail` |
| TR_ID (실전) | `OTFM3115R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 |  |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 |  |
| `CRCY_CD` | 통화코드 | string | Y | 3 | 'TKR(TOT_KRW), TUS(TOT_USD),   USD(미국달러), HKD(홍콩달러),  CNY(중국위안화), JPY )일본엔화), VND(베트남동)' |
| `INQR_DT` | 조회일자 | string | Y | 8 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object | Y |  |  |
| `cano` | 종합계좌번호 | string | Y | 8 |  |
| `acnt_prdt_cd` | 계좌상품코드 | string | Y | 2 |  |
| `crcy_cd` | 통화코드 | string | Y | 3 |  |
| `resp_dt` | 응답일자 | string | Y | 8 |  |
| `acnt_net_risk_mgna_aply_yn` | 계좌순위험증거금적용여부 | string | Y | 1 |  |
| `fm_ord_psbl_amt` | FM주문가능금액 | string | Y | 20 |  |
| `fm_add_mgn_amt` | FM추가증거금액 | string | Y | 20 |  |
| `fm_brkg_mgn_amt` | FM위탁증거금액 | string | Y | 20 |  |
| `fm_excc_brkg_mgn_amt` | FM정산위탁증거금액 | string | Y | 20 |  |
| `fm_ustl_mgn_amt` | FM미결제증거금액 | string | Y | 20 |  |
| `fm_mntn_mgn_amt` | FM유지증거금액 | string | Y | 20 |  |
| `fm_ord_mgn_amt` | FM주문증거금액 | string | Y | 20 |  |
| `fm_futr_ord_mgn_amt` | FM선물주문증거금액 | string | Y | 20 |  |
| `fm_opt_buy_ord_amt` | FM옵션매수주문금액 | string | Y | 20 |  |
| `fm_opt_sll_ord_mgn_amt` | FM옵션매도주문증거금액 | string | Y | 20 |  |
| `fm_opt_buy_ord_mgn_amt` | FM옵션매수주문증거금액 | string | Y | 20 |  |
| `fm_ecis_rsvn_mgn_amt` | FM행사예약증거금액 | string | Y | 20 |  |
| `fm_span_brkg_mgn_amt` | FMSPAN위탁증거금액 | string | Y | 20 |  |
| `fm_span_pric_altr_mgn_amt` | FMSPAN가격변동증거금액 | string | Y | 20 |  |
| `fm_span_term_sprd_mgn_amt` | FMSPAN기간스프레드증거금액 | string | Y | 20 |  |
| `fm_span_buy_opt_min_mgn_amt` | FMSPAN옵션가격증거금액 | string | Y | 20 |  |
| `fm_span_opt_min_mgn_amt` | FMSPAN옵션최소증거금액 | string | Y | 20 |  |
| `fm_span_tot_risk_mgn_amt` | FMSPAN총위험증거금액 | string | Y | 20 |  |
| `fm_span_mntn_mgn_amt` | FMSPAN유지증거금액 | string | Y | 20 |  |
| `fm_span_mntn_pric_altr_mgn_amt` | FMSPAN유지가격변동증거금액 | string | Y | 20 |  |
| `fm_span_mntn_term_sprd_mgn_amt` | FMSPAN유지기간스프레드증거금액 | string | Y | 20 |  |
| `fm_span_mntn_opt_pric_mgn_amt` | FMSPAN유지옵션가격증거금액 | string | Y | 20 |  |
| `fm_span_mntn_opt_min_mgn_amt` | FMSPAN유지옵션최소증거금액 | string | Y | 20 |  |
| `fm_span_mntn_tot_risk_mgn_amt` | FMSPAN유지총위험증거금액 | string | Y | 20 |  |
| `fm_eurx_brkg_mgn_amt` | FMEUREX위탁증거금액 | string | Y | 20 |  |
| `fm_eurx_pric_altr_mgn_amt` | FMEUREX가격변동증거금액 | string | Y | 20 |  |
| `fm_eurx_term_sprd_mgn_amt` | FMEUREX기간스프레드증거금액 | string | Y | 20 |  |
| `fm_eurx_opt_pric_mgn_amt` | FMEUREX옵션가격증거금액 | string | Y | 20 |  |
| `fm_eurx_buy_opt_min_mgn_amt` | FMEUREX매수옵션최소증거금액 | string | Y | 20 |  |
| `fm_eurx_tot_risk_mgn_amt` | FMEUREX총위험증거금액 | string | Y | 20 |  |
| `fm_eurx_mntn_mgn_amt` | FMEUREX유지증거금액 | string | Y | 20 |  |
| `fm_eurx_mntn_pric_altr_mgn_amt` | FMEUREX유지가격변동증거금액 | string | Y | 20 |  |
| `fm_eurx_mntn_term_sprd_mgn_amt` | FMEUREX기간스프레드증거금액 | string | Y | 20 |  |
| `fm_eurx_mntn_opt_pric_mgn_amt` | FMEUREX유지옵션가격증거금액 | string | Y | 20 |  |
| `fm_eurx_mntn_tot_risk_mgn_amt` | FMEUREX유지총위험증거금액 | string | Y | 20 |  |
| `fm_gnrl_brkg_mgn_amt` | FM일반위탁증거금액 | string | Y | 20 |  |
| `fm_futr_ustl_mgn_amt` | FM선물미결제증거금액 | string | Y | 20 |  |
| `fm_sll_opt_ustl_mgn_amt` | FM매도옵션미결제증거금액 | string | Y | 20 |  |
| `fm_buy_opt_ustl_mgn_amt` | FM매수옵션미결제증거금액 | string | Y | 20 |  |
| `fm_sprd_ustl_mgn_amt` | FM스프레드미결제증거금액 | string | Y | 20 |  |
| `fm_avg_dsct_mgn_amt` | FMAVG할인증거금액 | string | Y | 20 |  |
| `fm_gnrl_mntn_mgn_amt` | FM일반유지증거금액 | string | Y | 20 |  |
| `fm_futr_mntn_mgn_amt` | FM선물유지증거금액 | string | Y | 20 |  |
| `fm_opt_mntn_mgn_amt` | FM옵션유지증거금액 | string | Y | 20 |  |

**Request Example:**
```
CANO:12345678  ACNT_PRDT_CD:08  CRCY_CD:TKR  INQR_DT:20240522
```

**Response Example:**
```
{      "output": {          "cano": "12345678",          "acnt_prdt_cd": "08",          "crcy_cd": "TKR",          "resp_dt": "20240522",          "acnt_net_risk_mgna_aply_yn": "Y",          "fm_ord_psbl_amt": "86128052",          "fm_add_mgn_amt": "0",          "fm_brkg_mgn_amt": "49082990",          "fm_excc_brkg_mgn_amt": "49082990",          "fm_ustl_mgn_amt": "49082990",          "fm_mntn_mgn_amt": "44620900",          "fm_ord_mgn_amt": "0",          "fm_futr_ord_mgn_amt": "0",          "fm_opt_buy_ord_amt": "0",          "fm_opt_sll_ord_mgn_amt": "0",          "fm_opt_buy_ord_mgn_amt": "0",          "fm_ecis_rsvn_mgn_amt": "0",          "fm_span_brkg_mgn_amt": "49082990",          "fm_span_pric_altr_mgn_amt": "49082990",          "fm_span_term_sprd_mgn_amt": "0",          "fm_span_buy_opt_min_mgn_amt": "0",          "fm_span_opt_min_mgn_amt": "0",          "fm_span_tot_risk_mgn_amt": "49082990",          "fm_span_mntn_mgn_amt": "44620900",          "fm_span_mntn_pric_altr_mgn_amt": "44620900",          "fm_span_mntn_term_sprd_mgn_amt": "0",          "fm_span_mntn_opt_pric_mgn_amt": "0",          "fm_span_mntn_opt_min_mgn_amt": "0",          "fm_span_mntn_tot_risk_mgn_amt": "44620900",          "fm_eurx_brkg_mgn_amt": "0",          "fm_eurx_pric_altr_mgn_amt": "0",          "fm_eurx_term_sprd_mgn_amt": "0",          "fm_eurx_opt_pric_mgn_amt": "0",          "fm_eurx_buy_opt_min_mgn_amt": "0",          "fm_eurx_tot_risk_mgn_amt": "0",          "fm_eurx_mntn_mgn_amt": "0",          "fm_eurx_mntn_pric_altr_mgn_amt": "0",          "fm_eurx_mntn_term_sprd_mgn_amt": "0",          "fm_eurx_mntn_opt_pric_mgn_amt": "0",          "fm_eurx_mntn_tot_risk_mgn_amt": "0",          "fm_gnrl_brkg_mgn_amt": "0",          "fm_futr_ustl_mgn_amt": "0",          "fm_sll_opt_ustl_mgn_amt": "0",          "fm_buy_opt_ustl_mgn_amt": "0",          "fm_sprd_ustl_mgn_amt": "0",          "fm_avg_dsct_mgn_amt": "0",          "fm_gnrl_mntn_mgn_amt": "0",          "fm_futr_mntn_mgn_amt": "0",          "fm_opt_mntn_mgn_amt": "0"      },      "rt_cd": "0",      "msg_cd": "KIOK0510",      "msg1": "조회가 완료되었습니다                                                           "  }
```

---
### 12. 해외선물종목현재가

| Field | Value |
|---|---|
| Sheet | `해외선물종목현재가` |
| Menu | [해외선물옵션] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-futureoption/v1/quotations/inquire-price` |
| TR_ID (실전) | `HHDFC55010000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `SRS_CD` | 종목코드 | string | Y | 32 | ex) CNHU24  ※ 종목코드 "포럼 > FAQ > 종목정보 다운로드(해외) - 해외지수선물" 참고 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세1 | object | N |  |  |
| `proc_date` | 최종처리일자 | string | N | 8 | 최종처리일자 |
| `high_price` | 고가 | string | N | 15 | 고가  ※ ffcode.mst(해외선물종목마스터 파일)의 sCalcDesz(계산 소수점) 값 참고 |
| `proc_time` | 최종처리시각 | string | N | 6 | 최종처리시각 |
| `open_price` | 시가 | string | N | 15 | 시가  ※ ffcode.mst(해외선물종목마스터 파일)의 sCalcDesz(계산 소수점) 값 참고 |
| `trst_mgn` | 증거금 | string | N | 19 | 증거금 |
| `low_price` | 저가 | string | N | 15 | 저가  ※ ffcode.mst(해외선물종목마스터 파일)의 sCalcDesz(계산 소수점) 값 참고 |
| `last_price` | 현재가 | string | N | 15 | 현재가  ※ ffcode.mst(해외선물종목마스터 파일)의 sCalcDesz(계산 소수점) 값 참고 |
| `vol` | 누적거래수량 | string | N | 10 | 누적거래수량 |
| `prev_diff_flag` | 전일대비구분 | string | N | 1 | 전일대비구분  '1':상한 '2':상승 '3':보합 '4':하한 '5':하락 |
| `prev_diff_price` | 전일대비가격 | string | N | 15 | 전일대비가격 |
| `prev_diff_rate` | 전일대비율 | string | N | 10 | 전일대비율 |
| `bid_qntt` | 매수1수량 | string | N | 10 | 매수1수량 |
| `bid_price` | 매수1호가 | string | N | 15 | 매수1호가  ※ ffcode.mst(해외선물종목마스터 파일)의 sCalcDesz(계산 소수점) 값 참고 |
| `ask_qntt` | 매도1수량 | string | N | 10 | 매도1수량 |
| `ask_price` | 매도1호가 | string | N | 15 | 매도1호가  ※ ffcode.mst(해외선물종목마스터 파일)의 sCalcDesz(계산 소수점) 값 참고 |
| `prev_price` | 전일종가 | string | N | 15 | 전일종가  ※ ffcode.mst(해외선물종목마스터 파일)의 sCalcDesz(계산 소수점) 값 참고 |
| `exch_cd` | 거래소코드 | string | N | 10 | 거래소코드 |
| `crc_cd` | 거래통화 | string | N | 10 | 거래통화 |
| `trd_fr_date` | 상장일 | string | N | 8 | 상장일 |
| `expr_date` | 만기일 | string | N | 8 | 만기일 |
| `trd_to_date` | 최종거래일 | string | N | 8 | 최종거래일 |
| `remn_cnt` | 잔존일수 | string | N | 4 | 잔존일수 |
| `last_qntt` | 체결량 | string | N | 10 | 체결량 |
| `tot_ask_qntt` | 총매도잔량 | string | N | 10 | 총매도잔량 |
| `tot_bid_qntt` | 총매수잔량 | string | N | 10 | 총매수잔량 |
| `tick_size` | 틱사이즈 | string | N | 19 | 틱사이즈 |
| `open_date` | 장개시일자 | string | N | 8 | 장개시일자 |
| `open_time` | 장개시시각 | string | N | 6 | 장개시시각 |
| `close_date` | 장종료일자 | string | N | 8 | 장종료일자 |
| `close_time` | 장종료시각 | string | N | 6 | 장종료시각 |
| `sbsnsdate` | 영업일자 | string | N | 8 | 영업일자 |
| `sttl_price` | 정산가 | string | N | 15 | 정산가 |

**Request Example:**
```
SRS_CD:BRNF25
```

**Response Example:**
```
{      "output1": {          "proc_date": "20241108",          "proc_time": "173937",          "open_price": "          75.55",          "high_price": "          75.61",          "low_price": "          74.66",          "last_price": "          74.90",          "vol": "33004",          "prev_diff_flag": "5",          "prev_diff_price": "           0.67",          "prev_diff_rate": "     -0.89",          "bid_qntt": "         7",          "bid_price": "          74.89",          "ask_qntt": "         4",          "ask_price": "          74.90",          "prev_price": "          75.57",          "trst_mgn": "               3670",          "exch_cd": "ICE",          "crc_cd": "USD",          "trd_fr_date": "20180110",          "expr_date": "20241129",          "trd_to_date": "20241129",          "remn_cnt": "  22",          "last_qntt": "1",          "tot_ask_qntt": "       115",          "tot_bid_qntt": "       157",          "tick_size": "               0.01",          "open_date": "20241108",          "open_time": "100000",          "close_date": "20241109",          "close_time": "080000",          "sbsnsdate": "20241108",          "sttl_price": "  75.6300000000"      },      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 13. 해외선물종목상세

| Field | Value |
|---|---|
| Sheet | `해외선물종목상세` |
| Menu | [해외선물옵션] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-futureoption/v1/quotations/stock-detail` |
| TR_ID (실전) | `HHDFC55010100` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `SRS_CD` | 종목코드 | string | Y | 32 | ex) CNHU24  ※ 종목코드 "포럼 > FAQ > 종목정보 다운로드(해외) - 해외지수선물" 참고 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세1 | object | N |  |  |
| `exch_cd` | 거래소코드 | string | N | 10 | 거래소코드 |
| `tick_sz` | 틱사이즈 | string | N | 19 | 틱사이즈 |
| `disp_digit` | 가격표시진법 | string | N | 10 | 가격표시진법 |
| `trst_mgn` | 증거금 | string | N | 19 | 증거금 |
| `sttl_date` | 정산일 | string | N | 8 | 정산일 |
| `prev_price` | 전일종가 | string | N | 15 | 전일종가  ※ ffcode.mst(해외선물종목마스터 파일)의 sCalcDesz(계산 소수점) 값 참고 |
| `crc_cd` | 거래통화 | string | N | 10 | 거래통화 |
| `clas_cd` | 품목종류 | string | N | 3 | 품목종류 |
| `tick_val` | 틱가치 | string | N | 19 | 틱가치 |
| `mrkt_open_date` | 장개시일자 | string | N | 8 | 장개시일자 |
| `mrkt_open_time` | 장개시시각 | string | N | 6 | 장개시시각 |
| `mrkt_close_date` | 장마감일자 | string | N | 8 | 장마감일자 |
| `mrkt_close_time` | 장마감시각 | string | N | 6 | 장마감시각 |
| `trd_fr_date` | 상장일 | string | N | 8 | 상장일 |
| `expr_date` | 만기일 | string | N | 8 | 만기일 |
| `trd_to_date` | 최종거래일 | string | N | 8 | 최종거래일 |
| `remn_cnt` | 잔존일수 | string | N | 4 | 잔존일수 |
| `stat_tp` | 매매여부 | string | N | 1 | 매매여부 |
| `ctrt_size` | 계약크기 | string | N | 19 | 계약크기 |
| `stl_tp` | 최종결제구분 | string | N | 20 | 최종결제구분 |
| `frst_noti_date` | 최초식별일 | string | N | 8 | 최초식별일 |
| `sprd_srs_cd1` | 스프레드 종목 #1 | string | N | 32 |  |
| `sprd_srs_cd2` | 스프레드 종목 #2 | string | N | 32 |  |

**Request Example:**
```
{       "SRS_CD": "6AU22"   }
```

**Response Example:**
```
{      "output1": {          "exch_cd": "CME",          "clas_cd": "001",          "crc_cd": "USD",          "prev_price": "         6722.0",          "sttl_date": "20220919",          "trst_mgn": "               2200",          "disp_digit": "        10",          "tick_sz": "            0.00005",          "tick_val": "                  5",          "mrkt_open_date": "20220919",          "mrkt_open_time": "070000",          "mrkt_close_date": "20220920",          "mrkt_close_time": "060000",          "trd_fr_date": "20170906",          "expr_date": "20220919",          "trd_to_date": "20220919",          "remn_cnt": "   0",          "stat_tp": "2",          "ctrt_size": "             100000",          "stl_tp": "실물인수도",          "frst_noti_date": "20220919",          "sprd_srs_cd1": "",          "sprd_srs_cd2": ""      },      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 14. 해외선물 호가

| Field | Value |
|---|---|
| Sheet | `해외선물 호가` |
| Menu | [해외선물옵션] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-futureoption/v1/quotations/inquire-asking-price` |
| TR_ID (실전) | `HHDFC86000000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `SRS_CD` | 종목명 | string | Y | 32 | 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `open_price` | 시가 | string | Y | 15 |  |
| `high_price` | 고가 | string | Y | 15 |  |
| `lowp_rice` | 저가 | string | Y | 15 |  |
| `last_price` | 현재가 | string | Y | 15 |  |
| `prev_price` | 전일종가 | string | Y | 15 |  |
| `vol` | 거래량 | string | Y | 10 |  |
| `prev_diff_price` | 전일대비가 | string | Y | 15 |  |
| `prev_diff_rate` | 전일대비율 | string | Y | 10 |  |
| `quot_date` | 호가수신일자 | string | Y | 8 |  |
| `quot_time` | 호가수신시각 | string | Y | 6 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `bid_qntt` | 매수수량 | string | Y | 10 |  |
| `bid_num` | 매수번호 | string | Y | 10 |  |
| `bid_price` | 매수호가 | string | Y | 15 |  |
| `ask_qntt` | 매도수량 | string | Y | 10 |  |
| `ask_num` | 매도번호 | string | Y | 10 |  |
| `ask_price` | 매도호가 | string | Y | 15 |  |

**Request Example:**
```
SRS_CD:6AM24
```

**Response Example:**
```
{      "output1": {          "open_price": "         6430.0",          "high_price": "         6466.5",          "lowp_rice": "         6425.0",          "last_price": "         6443.5",          "prev_price": "         6428.5",          "vol": "27383",          "prev_diff_price": "             15",          "prev_diff_rate": "      0.23",          "quot_date": "20240422",          "quot_time": "160201"      },      "output2": [          {              "bid_qntt": "        35",              "bid_num": "        11",              "bid_price": "         6443.0",              "ask_qntt": "        11",              "ask_num": "         7",              "ask_price": "         6443.5"          },          {              "bid_qntt": "       108",              "bid_num": "        25",              "bid_price": "         6442.5",              "ask_qntt": "       137",              "ask_num": "        23",              "ask_price": "         6444.0"          },          {              "bid_qntt": "       145",              "bid_num": "        28",              "bid_price": "         6442.0",              "ask_qntt": "       120",              "ask_num": "        24",              "ask_price": "         6444.5"          },          {              "bid_qntt": "       139",              "bid_num": "        29",              "bid_price": "         6441.5",              "ask_qntt": "       142",              "ask_num": "        21",              "ask_price": "         6445.0"          },          {              "bid_qntt": "       128",              "bid_num": "        25",              "bid_price": "         6441.0",              "ask_qntt": "       127",              "ask_num": "        20",              "ask_price": "         6445.5"          }      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 15. 해외선물 분봉조회

| Field | Value |
|---|---|
| Sheet | `해외선물 분봉조회` |
| Menu | [해외선물옵션] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-futureoption/v1/quotations/inquire-time-futurechartprice` |
| TR_ID (실전) | `HHDFC55020400` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `SRS_CD` | 종목코드 | string | Y | 32 | ex) CNHU24  ※ 종목코드 "포럼 > FAQ > 종목정보 다운로드(해외) - 해외지수선물" 참고 |
| `EXCH_CD` | 거래소코드 | string | Y | 10 | CME |
| `START_DATE_TIME` | 조회시작일시 | string | Y | 12 | 공백 |
| `CLOSE_DATE_TIME` | 조회종료일시 | string | Y | 12 | ex) 20230823 |
| `QRY_TP` | 조회구분 | string | Y | 1 | Q : 최초조회시 , P : 다음키(INDEX_KEY) 입력하여 조회시 |
| `QRY_CNT` | 요청개수 | string | Y | 4 | 120 (조회갯수) |
| `QRY_GAP` | 묶음개수 | string | Y | 3 | 5 (분간격) |
| `INDEX_KEY` | 이전조회KEY | string | Y | 30 | 다음조회(QRY_TP를 P로 입력) 시, 이전 호출의 "output1 > index_key" 기입하여 조회 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output2` | 응답상세 | object | Y |  |  |
| `ret_cnt` | 자료개수 | string | Y | 4 |  |
| `last_n_cnt` | N틱최종개수 | string | Y | 4 |  |
| `index_key` | 이전조회KEY | string | Y | 30 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `data_date` | 일자 | string | Y | 8 |  |
| `data_time` | 시각 | string | Y | 6 |  |
| `open_price` | 시가 | string | Y | 15 |  |
| `high_price` | 고가 | string | Y | 15 |  |
| `low_price` | 저가 | string | Y | 15 |  |
| `last_price` | 체결가격 | string | Y | 15 | 체결가격  ※ ffcode.mst(해외선물종목마스터 파일)의 sCalcDesz(계산 소수점) 값 참고 |
| `last_qntt` | 체결수량 | string | Y | 10 |  |
| `vol` | 누적거래수량 | string | Y | 10 |  |
| `prev_diff_flag` | 전일대비구분 | string | Y | 1 |  |
| `prev_diff_price` | 전일대비가격 | string | Y | 15 |  |
| `prev_diff_rate` | 전일대비율 | string | Y | 10 |  |

**Request Example:**
```
SRS_CD:BRNQ24  EXCH_CD:ICE  START_DATE_TIME:  CLOSE_DATE_TIME:20231212  QRY_TP:P  QRY_CNT:500  QRY_GAP:1  INDEX_KEY:20231211       128
```

**Response Example:**
```
{      "output2": {          "ret_cnt": "0500",          "last_n_cnt": "",          "index_key": "20231208       246"      },      "output1": [          {              "data_date": "20231208",              "data_time": "202100",              "open_price": "75.41",              "high_price": "75.41",              "low_price": "75.41",              "last_price": "75.41",              "last_qntt": "5",              "vol": "3985",              "prev_diff_flag": "3",              "prev_diff_price": "0",              "prev_diff_rate": "0"          },          {              "data_date": "20231208",              "data_time": "202200",              "open_price": "75.41",              "high_price": "75.43",              "low_price": "75.41",              "last_price": "75.43",              "last_qntt": "3",              "vol": "3988",              "prev_diff_flag": "2",              "prev_diff_price": "0.02",              "prev_diff_rate": "0.02652168"          },          {              "data_date": "20231208",              "data_time": "202300",              "open_price": "75.45",              "high_price": "75.45",              "low_price": "75.45",              "last_price": "75.45",              "last_qntt": "19",              "vol": "4007",              "prev_diff_flag": "2",              "prev_diff_price": "0.02",              "prev_diff_rate": "0.02651464"          },          {              "data_date": "20231208",              "data_time": "202400",              "open_price": "75.45",              "high_price": "75.45",              "low_price": "75.45",              "last_price": "75.45",              "last_qntt": "2",              "vol": "4009",              "prev_diff_flag": "3",              "prev_diff_price": "0",              "prev_diff_rate": "0"          },          {              "data_date": "20231208",              "data_time": "202600",              "open_price": "75.45",              "high_price": "75.47",              "low_price": "75.45",              "last_price": "75.47",              "last_qntt": "4",              "vol": "4013",              "prev_diff_flag": "2",              "prev_diff_price": "0.02",              "prev_diff_rate": "0.02650762"          },          {              "data_date": "20231208",              "data_time": "202700",              "open_price": "75.49",              "high_price": "75.49",              "low_price": "75.48",              "last_price": "75.48",              "last_qntt": "3",              "vol": "4016",              "prev_diff_flag": "2",              "prev_diff_price": "0.01",              "prev_diff_rate": "0.01325029"          },          {              "data_date": "20231208",              "data_time": "202800",              "open_price": "75.45",              "high_price": "75.46",              "low_price": "75.45",              "last_price": "75.46",              "last_qntt": "3",              "vol": "4019",              "prev_diff_flag": "5",              "prev_diff_price": "0.02",   
```

---
### 16. 해외선물 체결추이(틱)

| Field | Value |
|---|---|
| Sheet | `해외선물 체결추이(틱)` |
| Menu | [해외선물옵션] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-futureoption/v1/quotations/tick-ccnl` |
| TR_ID (실전) | `HHDFC55020200` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `SRS_CD` | 종목코드 | string | Y | 32 | 예) 6AM24 |
| `EXCH_CD` | 거래소코드 | string | Y | 10 | 예) CME |
| `START_DATE_TIME` | 조회시작일시 | string | Y | 12 | 공백 |
| `CLOSE_DATE_TIME` | 조회종료일시 | string | Y | 12 | 예) 20240402 |
| `QRY_TP` | 조회구분 | string | Y | 1 | Q : 최초조회시 , P : 다음키(INDEX_KEY) 입력하여 조회시 |
| `QRY_CNT` | 요청개수 | string | Y | 4 | 예) 30 (최대 40) |
| `QRY_GAP` | 묶음개수 | string | Y | 3 | 공백 (분만 사용) |
| `INDEX_KEY` | 이전조회KEY | string | Y | 30 | 공백 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `tret_cnt` | 자료개수 | string | Y | 4 |  |
| `last_n_cnt` | N틱최종개수 | string | Y | 4 |  |
| `index_key` | 이전조회KEY | string | Y | 30 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `data_date` | 일자 | string | Y | 8 |  |
| `data_time` | 시각 | string | Y | 6 |  |
| `open_price` | 시가 | string | Y | 15 |  |
| `high_price` | 고가 | string | Y | 15 |  |
| `low_price` | 저가 | string | Y | 15 |  |
| `last_price` | 체결가격 | string | Y | 15 | 체결가격  ※ ffcode.mst(해외선물종목마스터 파일)의 sCalcDesz(계산 소수점) 값 참고 |
| `last_qntt` | 체결수량 | string | Y | 10 |  |
| `vol` | 누적거래수량 | string | Y | 10 |  |
| `prev_diff_flag` | 전일대비구분 | string | Y | 1 |  |
| `prev_diff_price` | 전일대비가격 | string | Y | 15 |  |
| `prev_diff_rate` | 전일대비율 | string | Y | 10 |  |

**Request Example:**
```
SRS_CD:6AM24  EXCH_CD:CME  START_DATE_TIME:  CLOSE_DATE_TIME:20240423  QRY_TP:Q  QRY_CNT:40  QRY_GAP:  INDEX_KEY:
```

**Response Example:**
```
{      "output1": {          "ret_cnt": "0040",          "last_n_cnt": "0001",          "index_key": "20240423      6445"      },      "output2": [          {              "data_date": "20240423",              "data_time": "164434",              "open_price": "         6464.5",              "high_price": "         6464.5",              "low_price": "         6464.5",              "last_price": "         6464.5",              "last_qntt": "         4",              "vol": "27806",              "prev_diff_flag": "2",              "prev_diff_price": "            4.5",              "prev_diff_rate": "      0.07"          },          {              "data_date": "20240423",              "data_time": "164434",              "open_price": "         6464.5",              "high_price": "         6464.5",              "low_price": "         6464.5",              "last_price": "         6464.5",              "last_qntt": "         1",              "vol": "27807",              "prev_diff_flag": "2",              "prev_diff_price": "            4.5",              "prev_diff_rate": "      0.07"          },          {              "data_date": "20240423",              "data_time": "164450",              "open_price": "         6464.5",              "high_price": "         6464.5",              "low_price": "         6464.5",              "last_price": "         6464.5",              "last_qntt": "         5",              "vol": "27812",              "prev_diff_flag": "2",              "prev_diff_price": "            4.5",              "prev_diff_rate": "      0.07"          },          {              "data_date": "20240423",              "data_time": "164501",              "open_price": "         6464.5",              "high_price": "         6464.5",              "low_price": "         6464.5",              "last_price": "         6464.5",              "last_qntt": "         2",              "vol": "27814",              "prev_diff_flag": "2",              "prev_diff_price": "            4.5",              "prev_diff_rate": "      0.07"          },          {              "data_date": "20240423",              "data_time": "164503",              "open_price": "         6464.5",              "high_price": "         6464.5",              "low_price": "         6464.5",              "last_price": "         6464.5",              "last_qntt": "         9",              "vol": "27823",              "prev_diff_flag": "2",              "prev_diff_price": "            4.5",              "prev_diff_rate": "      0.07"          },          {              "data_date": "20240423",              "data_time": "164503",              "open_price": "         6464.5",              "high_price": "         6464.5",              "low_price": "         6464.5",              "last_price": "         6464.5",              "last_qntt": "         1",              "vol": "27824",              "prev_diff_flag": "2",              "prev_diff_price": "            4.5",              "prev_diff_rate
```

---
### 17. 해외선물 체결추이(주간)

| Field | Value |
|---|---|
| Sheet | `해외선물 체결추이(주간)` |
| Menu | [해외선물옵션] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-futureoption/v1/quotations/weekly-ccnl` |
| TR_ID (실전) | `HHDFC55020000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `SRS_CD` | 종목코드 | string | Y | 32 | 예) 6AM24 |
| `EXCH_CD` | 거래소코드 | string | Y | 10 | 예) CME |
| `START_DATE_TIME` | 조회시작일시 | string | Y | 12 | 공백 |
| `CLOSE_DATE_TIME` | 조회종료일시 | string | Y | 12 | 예) 20240402 |
| `QRY_TP` | 조회구분 | string | Y | 1 | Q : 최초조회시 , P : 다음키(INDEX_KEY) 입력하여 조회시 |
| `QRY_CNT` | 요청개수 | string | Y | 4 | 예) 30 (최대 40) |
| `QRY_GAP` | 묶음개수 | string | Y | 3 | 공백 (분만 사용) |
| `INDEX_KEY` | 이전조회KEY | string | Y | 30 | 공백 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `ret_cnt` | 자료개수 | string | Y | 4 |  |
| `last_n_cnt` | N틱최종개수 | string | Y | 4 |  |
| `index_key` | 이전조회KEY | string | Y | 30 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `data_date` | 일자 | string | Y | 8 |  |
| `data_time` | 시각 | string | Y | 6 |  |
| `open_price` | 시가 | string | Y | 15 |  |
| `high_price` | 고가 | string | Y | 15 |  |
| `low_price` | 저가 | string | Y | 15 |  |
| `last_price` | 체결가격 | string | Y | 15 |  |
| `last_qntt` | 체결수량 | string | Y | 10 |  |
| `vol` | 누적거래수량 | string | Y | 10 |  |
| `prev_diff_flag` | 전일대비구분 | string | Y | 1 |  |
| `prev_diff_price` | 전일대비가격 | string | Y | 15 |  |
| `prev_diff_rate` | 전일대비율 | string | Y | 10 |  |

**Request Example:**
```
SRS_CD:6AM24  EXCH_CD:CME  START_DATE_TIME:  CLOSE_DATE_TIME:20240424  QRY_TP:  QRY_CNT:40  QRY_GAP:  INDEX_KEY:
```

**Response Example:**
```
{      "output1": {          "ret_cnt": "0040",          "last_n_cnt": "",          "index_key": "20230522"      },      "output2": [          {              "data_date": "20230522",              "data_time": "",              "open_price": "         6713.0",              "high_price": "         6713.0",              "low_price": "         6620.0",              "last_price": "         6620.0",              "last_qntt": "",              "vol": "        10",              "prev_diff_flag": "5",              "prev_diff_price": "             93",              "prev_diff_rate": "     -1.39"          },          {              "data_date": "20230612",              "data_time": "",              "open_price": "         6809.5",              "high_price": "         6817.0",              "low_price": "         6809.0",              "last_price": "         6817.0",              "last_qntt": "",              "vol": "        20",              "prev_diff_flag": "2",              "prev_diff_price": "            197",              "prev_diff_rate": "      2.98"          },          {              "data_date": "20230626",              "data_time": "",              "open_price": "         6692.0",              "high_price": "         6692.0",              "low_price": "         6692.0",              "last_price": "         6692.0",              "last_qntt": "",              "vol": "5         ",              "prev_diff_flag": "5",              "prev_diff_price": "            125",              "prev_diff_rate": "     -1.83"          },          {              "data_date": "20230710",              "data_time": "",              "open_price": "         6840.5",              "high_price": "         6840.5",              "low_price": "         6840.0",              "last_price": "         6840.0",              "last_qntt": "",              "vol": "5         ",              "prev_diff_flag": "2",              "prev_diff_price": "            148",              "prev_diff_rate": "      2.21"          },          {              "data_date": "20230731",              "data_time": "",              "open_price": "         6702.0",              "high_price": "         6702.0",              "low_price": "         6605.0",              "last_price": "         6605.0",              "last_qntt": "",              "vol": "        11",              "prev_diff_flag": "5",              "prev_diff_price": "            235",              "prev_diff_rate": "     -3.44"          },          {              "data_date": "20230807",              "data_time": "",              "open_price": "         6594.5",              "high_price": "         6594.5",              "low_price": "         6594.5",              "last_price": "         6594.5",              "last_qntt": "",              "vol": "5         ",              "prev_diff_flag": "5",              "prev_diff_price": "           10.5",              "prev_diff_rate": "     -0.16"          },          {              "data_date": "20230904",    
```

---
### 18. 해외선물 체결추이(일간)

| Field | Value |
|---|---|
| Sheet | `해외선물 체결추이(일간)` |
| Menu | [해외선물옵션] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-futureoption/v1/quotations/daily-ccnl` |
| TR_ID (실전) | `HHDFC55020100` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `SRS_CD` | 종목코드 | string | Y | 32 | 예) 6AM24 |
| `EXCH_CD` | 거래소코드 | string | Y | 10 | 예) CME |
| `START_DATE_TIME` | 조회시작일시 | string | Y | 12 | 공백 |
| `CLOSE_DATE_TIME` | 조회종료일시 | string | Y | 12 | 예) 20240402 |
| `QRY_TP` | 조회구분 | string | Y | 1 | Q : 최초조회시 , P : 다음키(INDEX_KEY) 입력하여 조회시 |
| `QRY_CNT` | 요청개수 | string | Y | 4 | 예) 30 (최대 40) |
| `QRY_GAP` | 묶음개수 | string | Y | 3 | 공백 (분만 사용) |
| `INDEX_KEY` | 이전조회KEY | string | Y | 30 | 공백 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `tret_cnt` | 자료개수 | string | Y | 4 |  |
| `last_n_cnt` | N틱최종개수 | string | Y | 4 |  |
| `index_key` | 이전조회KEY | string | Y | 30 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `data_date` | 일자 | string | Y | 8 |  |
| `data_time` | 시각 | string | Y | 6 |  |
| `open_price` | 시가 | string | Y | 15 |  |
| `high_price` | 고가 | string | Y | 15 |  |
| `low_price` | 저가 | string | Y | 15 |  |
| `last_price` | 체결가격 | string | Y | 15 |  |
| `last_qntt` | 체결수량 | string | Y | 10 |  |
| `vol` | 누적거래수량 | string | Y | 10 |  |
| `prev_diff_flag` | 전일대비구분 | string | Y | 1 |  |
| `prev_diff_price` | 전일대비가격 | string | Y | 15 |  |
| `prev_diff_rate` | 전일대비율 | string | Y | 10 |  |

**Request Example:**
```
SRS_CD:6AM24  EXCH_CD:CME  START_DATE_TIME:  CLOSE_DATE_TIME:20240424  QRY_TP:  QRY_CNT:40  QRY_GAP:  INDEX_KEY:
```

**Response Example:**
```
{      "output1": {          "ret_cnt": "0040",          "last_n_cnt": "",          "index_key": "20240226"      },      "output2": [          {              "data_date": "20240226",              "data_time": "",              "open_price": "         6588.5",              "high_price": "         6588.5",              "low_price": "         6555.0",              "last_price": "         6562.5",              "last_qntt": "",              "vol": "       639",              "prev_diff_flag": "5",              "prev_diff_price": "           21.5",              "prev_diff_rate": "     -0.33"          },          {              "data_date": "20240227",              "data_time": "",              "open_price": "         6555.0",              "high_price": "         6577.5",              "low_price": "         6549.0",              "last_price": "         6565.0",              "last_qntt": "",              "vol": "       134",              "prev_diff_flag": "2",              "prev_diff_price": "            2.5",              "prev_diff_rate": "      0.04"          },          {              "data_date": "20240228",              "data_time": "",              "open_price": "         6567.0",              "high_price": "         6568.5",              "low_price": "         6511.0",              "last_price": "         6515.0",              "last_qntt": "",              "vol": "      1210",              "prev_diff_flag": "5",              "prev_diff_price": "             50",              "prev_diff_rate": "     -0.76"          },          {              "data_date": "20240229",              "data_time": "",              "open_price": "         6516.0",              "high_price": "         6551.0",              "low_price": "         6509.5",              "last_price": "         6519.0",              "last_qntt": "",              "vol": "       503",              "prev_diff_flag": "2",              "prev_diff_price": "              4",              "prev_diff_rate": "      0.06"          },          {              "data_date": "20240301",              "data_time": "",              "open_price": "         6517.5",              "high_price": "         6554.5",              "low_price": "         6510.5",              "last_price": "         6546.0",              "last_qntt": "",              "vol": "       942",              "prev_diff_flag": "2",              "prev_diff_price": "             27",              "prev_diff_rate": "      0.41"          },          {              "data_date": "20240304",              "data_time": "",              "open_price": "         6546.0",              "high_price": "         6549.0",              "low_price": "         6528.5",              "last_price": "         6528.5",              "last_qntt": "",              "vol": "      2298",              "prev_diff_flag": "5",              "prev_diff_price": "           17.5",              "prev_diff_rate": "     -0.27"          },          {              "data_date": "20240305",    
```

---
### 19. 해외선물 체결추이(월간)

| Field | Value |
|---|---|
| Sheet | `해외선물 체결추이(월간)` |
| Menu | [해외선물옵션] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-futureoption/v1/quotations/monthly-ccnl` |
| TR_ID (실전) | `HHDFC55020300` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `SRS_CD` | 종목코드 | string | Y | 32 | 예) 6AM24 |
| `EXCH_CD` | 거래소코드 | string | Y | 10 | 예) CME |
| `START_DATE_TIME` | 조회시작일시 | string | Y | 12 | 공백 |
| `CLOSE_DATE_TIME` | 조회종료일시 | string | Y | 12 | 예) 20240402 |
| `QRY_TP` | 조회구분 | string | Y | 1 | Q : 최초조회시 , P : 다음키(INDEX_KEY) 입력하여 조회시 |
| `QRY_CNT` | 요청개수 | string | Y | 4 | 예) 30 (최대 40) |
| `QRY_GAP` | 묶음개수 | string | Y | 3 | 공백 (분만 사용) |
| `INDEX_KEY` | 이전조회KEY | string | Y | 30 | 공백 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `tret_cnt` | 자료개수 | string | Y | 4 |  |
| `last_n_cnt` | N틱최종개수 | string | Y | 4 |  |
| `index_key` | 이전조회KEY | string | Y | 30 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `data_date` | 일자 | string | Y | 8 |  |
| `data_time` | 시각 | string | Y | 6 |  |
| `open_price` | 시가 | string | Y | 15 |  |
| `high_price` | 고가 | string | Y | 15 |  |
| `low_price` | 저가 | string | Y | 15 |  |
| `last_price` | 체결가격 | string | Y | 15 |  |
| `last_qntt` | 체결수량 | string | Y | 10 |  |
| `vol` | 누적거래수량 | string | Y | 10 |  |
| `prev_diff_flag` | 전일대비구분 | string | Y | 1 |  |
| `prev_diff_price` | 전일대비가격 | string | Y | 15 |  |
| `prev_diff_rate` | 전일대비율 | string | Y | 10 |  |

**Request Example:**
```
SRS_CD:6AM24  EXCH_CD:CME  START_DATE_TIME:  CLOSE_DATE_TIME:20240423  QRY_TP:  QRY_CNT:30  QRY_GAP:  INDEX_KEY:
```

**Response Example:**
```
{      "output1": {          "ret_cnt": "0013",          "last_n_cnt": "",          "index_key": ""      },      "output2": [          {              "data_date": "20230401",              "data_time": "",              "open_price": "         6770.0",              "high_price": "         6770.0",              "low_price": "         6770.0",              "last_price": "         6770.0",              "last_qntt": "",              "vol": "3",              "prev_diff_flag": "3",              "prev_diff_price": "      0.0000000",              "prev_diff_rate": "      0.00"          },          {              "data_date": "20230501",              "data_time": "",              "open_price": "         6795.0",              "high_price": "         6800.0",              "low_price": "         6620.0",              "last_price": "         6620.0",              "last_qntt": "",              "vol": "        16",              "prev_diff_flag": "5",              "prev_diff_price": "    150.0000000",              "prev_diff_rate": "     -2.22"          },          {              "data_date": "20230601",              "data_time": "",              "open_price": "         6809.5",              "high_price": "         6817.0",              "low_price": "         6692.0",              "last_price": "         6692.0",              "last_qntt": "",              "vol": "        25",              "prev_diff_flag": "2",              "prev_diff_price": "     72.0000000",              "prev_diff_rate": "      1.09"          },          {              "data_date": "20230701",              "data_time": "",              "open_price": "         6840.5",              "high_price": "         6840.5",              "low_price": "         6840.0",              "last_price": "         6840.0",              "last_qntt": "",              "vol": "5",              "prev_diff_flag": "2",              "prev_diff_price": "    148.0000000",              "prev_diff_rate": "      2.21"          },          {              "data_date": "20230801",              "data_time": "",              "open_price": "         6702.0",              "high_price": "         6702.0",              "low_price": "         6594.5",              "last_price": "         6594.5",              "last_qntt": "",              "vol": "        16",              "prev_diff_flag": "5",              "prev_diff_price": "    245.5000000",              "prev_diff_rate": "     -3.59"          },          {              "data_date": "20230901",              "data_time": "",              "open_price": "         6535.0",              "high_price": "         6558.5",              "low_price": "         6430.0",              "last_price": "         6450.5",              "last_qntt": "",              "vol": "        55",              "prev_diff_flag": "5",              "prev_diff_price": "    144.0000000",              "prev_diff_rate": "     -2.18"          },          {              "data_date": "20231001",              "data_time": "",
```

---
### 20. 해외선물 상품기본정보

| Field | Value |
|---|---|
| Sheet | `해외선물 상품기본정보` |
| Menu | [해외선물옵션] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-futureoption/v1/quotations/search-contract-detail` |
| TR_ID (실전) | `HHDFC55200000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `QRY_CNT` | 요청개수 | string | Y | 4 | 입력한 코드 개수 |
| `SRS_CD_01` | 품목종류 | string | Y | 32 | 최대 32개 까지 가능 |
| `SRS_CD_02…` | 품목종류… | string | Y | 32 |  |
| `SRS_CD_32` | 품목종류 | string | Y | 32 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `exch_cd` | 거래소코드 | string | Y | 10 |  |
| `clas_cd` | 품목종류 | string | Y | 3 |  |
| `crc_cd` | 거래통화 | string | Y | 10 |  |
| `sttl_price` | 정산가 | string | Y | 15 |  |
| `sttl_date` | 정산일 | string | Y | 8 |  |
| `trst_mgn` | 증거금 | string | Y | 19 |  |
| `disp_digit` | 가격표시진법 | string | Y | 10 |  |
| `tick_sz` | 틱사이즈 | string | Y | 19 |  |
| `tick_val` | 틱가치 | string | Y | 19 |  |
| `mrkt_open_date` | 장개시일자 | string | Y | 8 |  |
| `mrkt_open_time` | 장개시시각 | string | Y | 6 |  |
| `mrkt_close_date` | 장마감일자 | string | Y | 8 |  |
| `mrkt_close_time` | 장마감시각 | string | Y | 6 |  |
| `trd_fr_date` | 상장일 | string | Y | 8 |  |
| `expr_date` | 만기일 | string | Y | 8 |  |
| `trd_to_date` | 최종거래일 | string | Y | 8 |  |
| `remn_cnt` | 잔존일수 | string | Y | 4 |  |
| `stat_tp` | 매매여부 | string | Y | 1 |  |
| `ctrt_size` | 계약크기 | string | Y | 19 |  |
| `stl_tp` | 최종결제구분 | string | Y | 20 |  |
| `frst_noti_date` | 최초식별일 | string | Y | 8 |  |
| `sub_exch_nm` | 서브거래소코드 | string | Y | 32 |  |

**Request Example:**
```
QRY_CNT:2  SRS_CD_01:6AM24  SRS_CD_02:10YK24
```

**Response Example:**
```
{      "output2": [          {              "exch_cd": "CME",              "clas_cd": "001",              "crc_cd": "USD",              "sttl_price": "         6684.5",              "sttl_date": "20240516",              "trst_mgn": "               1595",              "disp_digit": "        10",              "tick_sz": "            0.00005",              "tick_val": "                  5",              "mrkt_open_date": "20240517",              "mrkt_open_time": "070000",              "mrkt_close_date": "20240518",              "mrkt_close_time": "060000",              "trd_fr_date": "20190604",              "expr_date": "20240617",              "trd_to_date": "20240617",              "remn_cnt": "  29",              "stat_tp": "1",              "ctrt_size": "             100000",              "stl_tp": "실물인수도",              "frst_noti_date": "20240617",              "sub_exch_nm": "CME"          },          {              "exch_cd": "CME",              "clas_cd": "002",              "crc_cd": "USD",              "sttl_price": "           4375",              "sttl_date": "20240516",              "trst_mgn": "                352",              "disp_digit": "        10",              "tick_sz": "              0.001",              "tick_val": "                  1",              "mrkt_open_date": "20240517",              "mrkt_open_time": "070000",              "mrkt_close_date": "20240518",              "mrkt_close_time": "060000",              "trd_fr_date": "20240315",              "expr_date": "20240531",              "trd_to_date": "20240531",              "remn_cnt": "  15",              "stat_tp": "1",              "ctrt_size": "               1000",              "stl_tp": "현금결제",              "frst_noti_date": "20240531",              "sub_exch_nm": "CBOT"          }      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 21. 해외선물 미결제추이

| Field | Value |
|---|---|
| Sheet | `해외선물 미결제추이` |
| Menu | [해외선물옵션] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-futureoption/v1/quotations/investor-unpd-trend` |
| TR_ID (실전) | `HHDDB95030000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `PROD_ISCD` | 상품 | string | Y | 5 | 금리 (GE, ZB, ZF,ZN,ZT), 금속(GC, PA, PL,SI, HG), 농산물(CC, CT,KC, OJ, SB, ZC,ZL, ZM, ZO, ZR, ZS, ZW), 에너지(CL, HO, NG, WBS), 지수(ES, NQ, TF, YM, VX), 축산물(GF, HE, LE), 통화(6A, 6B, 6C, 6E, 6J, 6N, 6S, DX) |
| `BSOP_DATE` | 일자 | string | Y | 8 | 기준일(ex)20240513) |
| `UPMU_GUBUN` | 구분 | string | Y | 1 | 0(수량), 1(증감) |
| `CTS_KEY` | CTS_KEY | string | Y | 16 | 공백 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `row_cnt` | 응답레코드카운트 | string | Y | 4 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `prod_iscd` | 상품 | string | Y | 5 |  |
| `cftc_iscd` | CFTC코드 | string | Y | 10 |  |
| `bsop_date` | 일자 | string | Y | 8 |  |
| `bidp_spec` | 매수투기 | string | Y | 10 |  |
| `askp_spec` | 매도투기 | string | Y | 10 |  |
| `spread_spec` | 스프레드투기 | string | Y | 10 |  |
| `bidp_hedge` | 매수헤지 | string | Y | 10 |  |
| `askp_hedge` | 매도헤지 | string | Y | 10 |  |
| `hts_otst_smtn` | 미결제합계 | string | Y | 10 |  |
| `bidp_missing` | 매수누락 | string | Y | 10 |  |
| `askp_missing` | 매도누락 | string | Y | 10 |  |
| `bidp_spec_cust` | 매수투기고객 | string | Y | 10 |  |
| `askp_spec_cust` | 매도투기고객 | string | Y | 10 |  |
| `spread_spec_cust` | 스프레드투기고객 | string | Y | 10 |  |
| `bidp_hedge_cust` | 매수헤지고객 | string | Y | 10 |  |
| `askp_hedge_cust` | 매도헤지고객 | string | Y | 10 |  |
| `cust_smtn` | 고객합계 | string | Y | 10 |  |

**Request Example:**
```
PROD_ISCD:ES  BSOP_DATE:20240624  UPMU_GUBUN:0  CTS_KEY:
```

**Response Example:**
```
{      "output1": {          "row_cnt": "0100"      },      "output2": [          {              "prod_iscd": "ES",              "cftc_iscd": "13874A",              "bsop_date": "20240611",              "bidp_spec": "270380",              "askp_spec": "381794",              "spread_spec": "0",              "bidp_hedge": "1606798",              "askp_hedge": "1617849",              "hts_otst_smtn": "2266096",              "bidp_missing": "297310",              "askp_missing": "174845",              "bidp_spec_cust": "80",              "askp_spec_cust": "68",              "spread_spec_cust": "55",              "bidp_hedge_cust": "253",              "askp_hedge_cust": "205",              "cust_smtn": "472"          },          {              "prod_iscd": "ES",              "cftc_iscd": "13874A",              "bsop_date": "20240604",              "bidp_spec": "265433",              "askp_spec": "330433",              "spread_spec": "0",              "bidp_hedge": "1534557",              "askp_hedge": "1581649",              "hts_otst_smtn": "2160026",              "bidp_missing": "287673",              "askp_missing": "175581",              "bidp_spec_cust": "76",              "askp_spec_cust": "68",              "spread_spec_cust": "45",              "bidp_hedge_cust": "262",              "askp_hedge_cust": "207",              "cust_smtn": "474"          },          {              "prod_iscd": "ES",              "cftc_iscd": "13874A",              "bsop_date": "20240528",              "bidp_spec": "330937",              "askp_spec": "333145",              "spread_spec": "0",              "bidp_hedge": "1503708",              "askp_hedge": "1609652",              "hts_otst_smtn": "2179731",              "bidp_missing": "289071",              "askp_missing": "180919",              "bidp_spec_cust": "80",              "askp_spec_cust": "63",              "spread_spec_cust": "39",              "bidp_hedge_cust": "251",              "askp_hedge_cust": "203",              "cust_smtn": "469"          },          {              "prod_iscd": "ES",              "cftc_iscd": "13874A",              "bsop_date": "20240521",              "bidp_spec": "304226",              "askp_spec": "327000",              "spread_spec": "0",              "bidp_hedge": "1501724",              "askp_hedge": "1593706",              "hts_otst_smtn": "2148201",              "bidp_missing": "288496",              "askp_missing": "173740",              "bidp_spec_cust": "78",              "askp_spec_cust": "66",              "spread_spec_cust": "42",              "bidp_hedge_cust": "249",              "askp_hedge_cust": "205",              "cust_smtn": "470"          },          {              "prod_iscd": "ES",              "cftc_iscd": "13874A",              "bsop_date": "20240514",              "bidp_spec": "273398",              "askp_spec": "298682",              "spread_spec": "0",              "bidp_hedge": "1477881",              "askp_hedge": "1550928",              "hts_ots
```

---
### 22. 해외옵션종목현재가

| Field | Value |
|---|---|
| Sheet | `해외옵션종목현재가` |
| Menu | [해외선물옵션] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-futureoption/v1/quotations/opt-price` |
| TR_ID (실전) | `HHDFO55010000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `SRS_CD` | 종목명 | string | Y | 32 | ex) OESU24 C5500  ※ 종목코드 "포럼 > FAQ > 종목정보 다운로드(해외) - 해외지수옵션/해외주식옵션" 참고 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `proc_date` | 최종처리일자 | string | Y | 8 |  |
| `proc_time` | 최종처리시각 | string | Y | 6 |  |
| `open_price` | 시가 | string | Y | 15 |  |
| `high_price` | 고가 | string | Y | 15 |  |
| `low_price` | 저가 | string | Y | 15 |  |
| `last_price` | 현재가 | string | Y | 15 | 현재가  ※ focode.mst, fostkcode.mst* 의 sCalcDesz(계산 소수점) 값 참고  * 포럼 > FAQ > 종목정보 다운로드(해외) - 해외지수옵션/해외주식옵션 |
| `vol` | 누적거래수량 | string | Y | 10 |  |
| `prev_diff_flag` | 전일대비구분 | string | Y | 1 |  |
| `prev_diff_price` | 전일대비가격 | string | Y | 15 |  |
| `prev_diff_rate` | 전일대비율 | string | Y | 10 |  |
| `bid_qntt` | 매수1수량 | string | Y | 10 |  |
| `bid_price` | 매수1호가 | string | Y | 15 |  |
| `ask_qntt` | 매도1수량 | string | Y | 10 |  |
| `ask_price` | 매도1호가 | string | Y | 15 |  |
| `trst_mgn` | 증거금 | string | Y | 19 |  |
| `exch_cd` | 거래소코드 | string | Y | 10 |  |
| `crc_cd` | 거래통화 | string | Y | 10 |  |
| `trd_fr_date` | 상장일 | string | Y | 8 |  |
| `expr_date` | 만기일 | string | Y | 8 |  |
| `trd_to_date` | 최종거래일 | string | Y | 8 |  |
| `remn_cnt` | 잔존일수 | string | Y | 4 |  |
| `last_qntt` | 체결량 | string | Y | 10 |  |
| `tot_ask_qntt` | 총매도잔량 | string | Y | 10 |  |
| `tot_bid_qntt` | 총매수잔량 | string | Y | 10 |  |
| `tick_size` | 틱사이즈 | string | Y | 19 |  |
| `open_date` | 장개시일자 | string | Y | 8 |  |
| `open_time` | 장개시시각 | string | Y | 6 |  |
| `close_date` | 장종료일자 | string | Y | 8 |  |
| `close_time` | 장종료시각 | string | Y | 6 |  |
| `sbsnsdate` | 영업일자 | string | Y | 8 |  |
| `sttl_price` | 정산가 | string | N | 15 | 정산가 |

**Request Example:**
```
SRS_CD:OGXX24 C19500
```

**Response Example:**
```
{      "output1": {          "proc_date": "20241108",          "proc_time": "173441",          "open_price": "           84.0",          "high_price": "           84.0",          "low_price": "           83.0",          "last_price": "           83.0",          "vol": "         3",          "prev_diff_flag": "5",          "prev_diff_price": "           38.0",          "prev_diff_rate": "    -31.40",          "bid_qntt": "       275",          "bid_price": "           83.0",          "ask_qntt": "       425",          "ask_price": "           87.0",          "prev_price": "          121.0",          "trst_mgn": "               4101",          "exch_cd": "EUREX",          "crc_cd": "EUR",          "trd_fr_date": "20240816",          "expr_date": "20240816",          "trd_to_date": "20241115",          "remn_cnt": "0008",          "last_qntt": "         2",          "tot_ask_qntt": "       952",          "tot_bid_qntt": "       726",          "tick_size": "                0.1",          "open_date": "20241108",          "open_time": "150000",          "close_date": "20241109",          "close_time": "013000",          "sbsnsdate": "20241108",          "sttl_price": "          102.2"      },      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 23. 해외옵션종목상세

| Field | Value |
|---|---|
| Sheet | `해외옵션종목상세` |
| Menu | [해외선물옵션] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-futureoption/v1/quotations/opt-detail` |
| TR_ID (실전) | `HHDFO55010100` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `SRS_CD` | 종목명 | string | Y | 32 | ex) OESU24 C5500  ※ 종목코드 "포럼 > FAQ > 종목정보 다운로드(해외) - 해외지수옵션/해외주식옵션" 참고 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `exch_cd` | 거래소코드 | string | Y | 10 |  |
| `clas_cd` | 품목종류 | string | Y | 1 |  |
| `crc_cd` | 거래통화 | string | Y | 10 |  |
| `sttl_price` | 전일종가 | string | Y | 15 | (★주의) 정산가 X 전일종가 O 가 수신됨    ※ focode.mst, fostkcode.mst* 의 sCalcDesz(계산 소수점) 값 참고  * 포럼 > FAQ > 종목정보 다운로드(해외) - 해외지수옵션/해외주식옵션 |
| `sttl_date` | 정산일 | string | Y | 8 |  |
| `trst_mgn` | 증거금 | string | Y | 19 |  |
| `disp_digit` | 가격표시진법 | string | Y | 10 |  |
| `tick_sz` | 틱사이즈 | string | Y | 19 |  |
| `tick_val` | 틱가치 | string | Y | 19 |  |
| `mrkt_open_date` | 장개시일자 | string | Y | 8 |  |
| `mrkt_open_time` | 장개시시각 | string | Y | 6 |  |
| `mrkt_close_date` | 장마감일자 | string | Y | 8 |  |
| `mrkt_close_time` | 장마감시각 | string | Y | 6 |  |
| `trd_fr_date` | 상장일 | string | Y | 8 |  |
| `expr_date` | 만기일 | string | Y | 8 |  |
| `trd_to_date` | 최종거래일 | string | Y | 8 |  |
| `remn_cnt` | 잔존일수 | string | Y | 4 |  |
| `stat_tp` | 매매여부 | string | Y | 1 |  |
| `ctrt_size` | 계약크기 | string | Y | 19 |  |
| `stl_tp` | 최종결제구분 | string | Y | 20 |  |
| `frst_noti_date` | 최초식별일 | string | Y | 8 |  |

**Request Example:**
```
SRS_CD:OESU24 P5650
```

**Response Example:**
```
{      "output1": {          "exch_cd": "CME",          "clas_cd": "4",          "crc_cd": "USD",          "sttl_price": "           7525",          "sttl_date": "20240826",          "trst_mgn": "               7788",          "disp_digit": "        10",          "tick_sz": "                  0",          "tick_val": "                2.5",          "mrkt_open_date": "20240826",          "mrkt_open_time": "070000",          "mrkt_close_date": "20240827",          "mrkt_close_time": "060000",          "trd_fr_date": "20240610",          "expr_date": "20240920",          "trd_to_date": "20240920",          "remn_cnt": "  26",          "stat_tp": "1",          "ctrt_size": "                 50",          "stl_tp": "현금결제",          "frst_noti_date": "20240920"      },      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 24. 해외옵션 호가

| Field | Value |
|---|---|
| Sheet | `해외옵션 호가` |
| Menu | [해외선물옵션] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-futureoption/v1/quotations/opt-asking-price` |
| TR_ID (실전) | `HHDFO86000000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `SRS_CD` | 종목명 | string | Y | 8 | 예)OESM24 C5340 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `open_price` | 시가 | string | Y | 15 |  |
| `high_price` | 고가 | string | Y | 15 |  |
| `lowp_rice` | 저가 | string | Y | 15 |  |
| `last_price` | 현재가 | string | Y | 15 |  |
| `sttl_price` | 정산가 | string | Y | 15 |  |
| `vol` | 거래량 | string | Y | 10 |  |
| `prev_diff_price` | 전일대비가 | string | Y | 15 |  |
| `prev_diff_rate` | 전일대비율 | string | Y | 10 |  |
| `quot_date` | 호가수신일자 | string | Y | 8 |  |
| `quot_time` | 호가수신시각 | string | Y | 6 |  |
| `output2` | 응답상세 | object array | Y |  | array (1호가~ 5호가 순서대로 표시) |
| `bid_qntt` | 매수수량 | string | Y | 10 |  |
| `bid_num` | 매수번호 | string | Y | 10 |  |
| `bid_price` | 매수호가 | string | Y | 15 |  |
| `ask_qntt` | 매도수량 | string | Y | 10 |  |
| `ask_num` | 매도번호 | string | Y | 10 |  |
| `ask_price` | 매도호가 | string | Y | 15 |  |

**Request Example:**
```
SRS_CD:OTXM24 C22000
```

**Response Example:**
```
{      "output1": {          "open_price": "          282.0",          "high_price": "          295.0",          "lowp_rice": "          280.0",          "last_price": "          290.0",          "sttl_price": "          288.0",          "vol": "       100",          "prev_diff_price": "            2.0",          "prev_diff_rate": "      0.69",          "quot_date": "20240528",          "quot_time": "184601"      },      "output2": [          {              "bid_qntt": "        37",              "bid_num": "         0",              "bid_price": "          288.0",              "ask_qntt": "         4",              "ask_num": "         0",              "ask_price": "          290.0"          },          {              "bid_qntt": "        43",              "bid_num": "         0",              "bid_price": "          287.0",              "ask_qntt": "         8",              "ask_num": "         0",              "ask_price": "          291.0"          },          {              "bid_qntt": "        20",              "bid_num": "         0",              "bid_price": "          285.0",              "ask_qntt": "        54",              "ask_num": "         0",              "ask_price": "          292.0"          },          {              "bid_qntt": "         4",              "bid_num": "         0",              "bid_price": "          280.0",              "ask_qntt": "        21",              "ask_num": "         0",              "ask_price": "          295.0"          },          {              "bid_qntt": "         5",              "bid_num": "         0",              "bid_price": "          276.0",              "ask_qntt": "         1",              "ask_num": "         0",              "ask_price": "          296.0"          }      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 25. 해외옵션 분봉조회

| Field | Value |
|---|---|
| Sheet | `해외옵션 분봉조회` |
| Menu | [해외선물옵션] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-futureoption/v1/quotations/inquire-time-optchartprice` |
| TR_ID (실전) | `HHDFO55020400` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `SRS_CD` | 종목코드 | string | Y | 32 | ex) OESU24 C5500  ※ 종목코드 "포럼 > FAQ > 종목정보 다운로드(해외) - 해외지수옵션/해외주식옵션" 참고 |
| `EXCH_CD` | 거래소코드 | string | Y | 10 | 종목코드에 맞는 거래소 코드 ex) CME |
| `START_DATE_TIME` | 조회시작일시 | string | Y | 12 | "" 공란 입력 |
| `CLOSE_DATE_TIME` | 조회종료일시 | string | Y | 12 | "" 공란 입력  ※ 날짜 입력해도 처리 안됨 |
| `QRY_TP` | 조회구분 | string | Y | 1 | Q : 최초조회시 , P : 다음키(INDEX_KEY) 입력하여 조회시 |
| `QRY_CNT` | 요청개수 | string | Y | 4 | 예) 120 (최대 120) |
| `QRY_GAP` | 묶음개수 | string | Y | 3 | 1: 1분봉, 5: 5분봉 ... |
| `INDEX_KEY` | 이전조회KEY | string | Y | 30 | 다음조회(QRY_TP를 P로 입력) 시, 이전 호출의 "output1 > index_key" 기입하여 조회 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output2` | 응답상세 | object | Y |  |  |
| `ret_cnt` | 자료개수 | string | Y | 4 |  |
| `last_n_cnt` | N틱최종개수 | string | Y | 4 |  |
| `index_key` | 이전조회KEY | string | Y | 30 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `data_date` | 일자 | string | Y | 8 |  |
| `data_time` | 시간 | string | Y | 6 |  |
| `open_price` | 시가 | string | Y | 15 |  |
| `high_price` | 고가 | string | Y | 15 |  |
| `low_price` | 저가 | string | Y | 15 |  |
| `last_price` | 체결가격 | string | Y | 15 | 체결가격  ※ focode.mst, fostkcode.mst* 의 sCalcDesz(계산 소수점) 값 참고  * 포럼 > FAQ > 종목정보 다운로드(해외) - 해외지수옵션/해외주식옵션 |
| `last_qntt` | 체결수량 | string | Y | 10 |  |
| `vol` | 누적거래수량 | string | Y | 10 |  |
| `prev_diff_flag` | 전일대비구분 | string | Y | 1 |  |
| `prev_diff_price` | 전일대비가격 | string | Y | 15 |  |
| `prev_diff_rate` | 전일대비율 | string | Y | 10 |  |

**Request Example:**
```
SRS_CD:OESU24 C5660  EXCH_CD:CME  START_DATE_TIME:  CLOSE_DATE_TIME:  QRY_TP:Q  QRY_CNT:120  QRY_GAP:  INDEX_KEY:
```

**Response Example:**
```
{      "output2": {          "ret_cnt": "0120",          "last_n_cnt": "",          "index_key": "20240820        29"      },      "output1": [          {              "data_date": "20240821",              "data_time": "031600",              "open_price": "6375",              "high_price": "6425",              "low_price": "6375",              "last_price": "6425",              "last_qntt": "18",              "vol": "251",              "prev_diff_flag": "2",              "prev_diff_price": "75",              "prev_diff_rate": "1.18"          },          {              "data_date": "20240821",              "data_time": "043400",              "open_price": "6000",              "high_price": "6000",              "low_price": "6000",              "last_price": "6000",              "last_qntt": "2",              "vol": "253",              "prev_diff_flag": "5",              "prev_diff_price": "-425",              "prev_diff_rate": "-6.61"          },          {              "data_date": "20240821",              "data_time": "044100",              "open_price": "6025",              "high_price": "6025",              "low_price": "6000",              "last_price": "6000",              "last_qntt": "4",              "vol": "257",              "prev_diff_flag": "3",              "prev_diff_price": "0",              "prev_diff_rate": "0.00"          },          {              "data_date": "20240821",              "data_time": "044700",              "open_price": "6025",              "high_price": "6025",              "low_price": "6025",              "last_price": "6025",              "last_qntt": "10",              "vol": "267",              "prev_diff_flag": "2",              "prev_diff_price": "25",              "prev_diff_rate": "0.42"          },...          {              "data_date": "20240826",              "data_time": "141000",              "open_price": "6950",              "high_price": "6950",              "low_price": "6950",              "last_price": "6950",              "last_qntt": "1",              "vol": "1",              "prev_diff_flag": "5",              "prev_diff_price": "-125",              "prev_diff_rate": "-1.77"          }      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 26. 해외옵션 체결추이(틱)

| Field | Value |
|---|---|
| Sheet | `해외옵션 체결추이(틱)` |
| Menu | [해외선물옵션] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-futureoption/v1/quotations/opt-tick-ccnl` |
| TR_ID (실전) | `HHDFO55020200` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `SRS_CD` | 종목코드 | string | Y | 32 | ex) OESU24 C5500  ※ 종목코드 "포럼 > FAQ > 종목정보 다운로드(해외) - 해외지수옵션/해외주식옵션" 참고 |
| `EXCH_CD` | 거래소코드 | string | Y | 10 | 종목코드에 맞는 거래소 코드 ex) CME |
| `START_DATE_TIME` | 조회시작일시 | string | Y | 12 | "" 공란 입력 |
| `CLOSE_DATE_TIME` | 조회종료일시 | string | Y | 12 | "" 공란 입력  ※ 날짜 입력해도 처리 안됨 |
| `QRY_TP` | 조회구분 | string | Y | 1 | Q : 최초조회시 , P : 다음키(INDEX_KEY) 입력하여 조회시 |
| `QRY_CNT` | 요청개수 | string | Y | 4 | 예) 30 (최대 40) |
| `QRY_GAP` | 묶음개수 | string | Y | 3 | 공백 |
| `INDEX_KEY` | 이전조회KEY | string | Y | 30 | 다음조회(QRY_TP를 P로 입력) 시, 이전 호출의 "output1 > index_key" 기입하여 조회 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `ret_cnt` | 자료개수 | string | Y | 4 |  |
| `last_n_cnt` | N틱최종개수 | string | Y | 4 |  |
| `index_key` | 이전조회KEY | string | Y | 30 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `data_date` | 일자 | string | Y | 8 | 과거일자 ~ 최근일자 순으로 조회됨 |
| `data_time` | 시간 | string | Y | 6 | HHMMSS |
| `open_price` | 시가 | string | Y | 15 |  |
| `high_price` | 고가 | string | Y | 15 |  |
| `low_price` | 저가 | string | Y | 15 |  |
| `last_price` | 체결가격 | string | Y | 15 | 체결가격  ※ focode.mst, fostkcode.mst* 의 sCalcDesz(계산 소수점) 값 참고  * 포럼 > FAQ > 종목정보 다운로드(해외) - 해외지수옵션/해외주식옵션 |
| `last_qntt` | 체결수량 | string | Y | 10 |  |
| `vol` | 누적거래수량 | string | Y | 10 |  |
| `prev_diff_flag` | 전일대비구분 | string | Y | 1 |  |
| `prev_diff_price` | 전일대비가격 | string | Y | 15 |  |
| `prev_diff_rate` | 전일대비율 | string | Y | 10 |  |

**Request Example:**
```
SRS_CD:OESU24 C5600  EXCH_CD:CME  START_DATE_TIME:  CLOSE_DATE_TIME:  QRY_TP:Q  QRY_CNT:30  QRY_GAP:  INDEX_KEY:
```

**Response Example:**
```
{      "output1": {          "ret_cnt": "0030",          "last_n_cnt": "0001",          "index_key": "20240823       146"      },      "output2": [          {              "data_date": "20240824",              "data_time": "024037",              "open_price": "9900",              "high_price": "9900",              "low_price": "9900",              "last_price": "9900",              "last_qntt": "6",              "vol": "343",              "prev_diff_flag": "2",              "prev_diff_price": "1700",              "prev_diff_rate": "20.73"          },          {              "data_date": "20240824",              "data_time": "024417",              "open_price": "10050",              "high_price": "10050",              "low_price": "10050",              "last_price": "10050",              "last_qntt": "6",              "vol": "349",              "prev_diff_flag": "2",              "prev_diff_price": "1850",              "prev_diff_rate": "22.56"          },...          {              "data_date": "20240826",              "data_time": "081707",              "open_price": "10375",              "high_price": "10375",              "low_price": "10375",              "last_price": "10375",              "last_qntt": "1",              "vol": "7",              "prev_diff_flag": "5",              "prev_diff_price": "-400",              "prev_diff_rate": "-3.71"          }      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 27. 해외옵션 체결추이(일간)

| Field | Value |
|---|---|
| Sheet | `해외옵션 체결추이(일간)` |
| Menu | [해외선물옵션] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-futureoption/v1/quotations/opt-daily-ccnl` |
| TR_ID (실전) | `HHDFO55020100` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `SRS_CD` | 종목코드 | string | Y | 32 | ex) OESU24 C5500  ※ 종목코드 "포럼 > FAQ > 종목정보 다운로드(해외) - 해외지수옵션/해외주식옵션" 참고 |
| `EXCH_CD` | 거래소코드 | string | Y | 10 | 종목코드에 맞는 거래소 코드 ex) CME |
| `START_DATE_TIME` | 조회시작일시 | string | Y | 12 | "" 공란 입력 |
| `CLOSE_DATE_TIME` | 조회종료일시 | string | Y | 12 | "" 공란 입력 |
| `QRY_TP` | 조회구분 | string | Y | 1 | Q |
| `QRY_CNT` | 요청개수 | string | Y | 4 | 예) 100 (최대 119)  ※ QRY_CNT 입력값의 +1 개 데이터가 조회됩니다. |
| `QRY_GAP` | 묶음개수 | string | Y | 3 | "" 공란 입력 |
| `INDEX_KEY` | 이전조회KEY | string | Y | 30 | "" 공란 입력  ※ 다음조회 불가 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `ret_cnt` | 자료개수 | string | Y | 4 | ※ "input > QRY_CNT" +1 개 만큼 조회됨 |
| `last_n_cnt` | N틱최종개수 | string | Y | 4 |  |
| `index_key` | 이전조회KEY | string | Y | 30 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `data_date` | 일자 | string | Y | 8 | 과거일자 ~ 최근일자 순으로 조회됨 |
| `data_time` | 시간 | string | Y | 6 | "" |
| `open_price` | 시가 | string | Y | 15 |  |
| `high_price` | 고가 | string | Y | 15 |  |
| `low_price` | 저가 | string | Y | 15 |  |
| `last_price` | 체결가격 | string | Y | 15 | 체결가격  ※ focode.mst, fostkcode.mst* 의 sCalcDesz(계산 소수점) 값 참고  * 포럼 > FAQ > 종목정보 다운로드(해외) - 해외지수옵션/해외주식옵션 |
| `last_qntt` | 체결수량 | string | Y | 10 |  |
| `vol` | 누적거래수량 | string | Y | 10 |  |
| `prev_diff_flag` | 전일대비구분 | string | Y | 1 |  |
| `prev_diff_price` | 전일대비가격 | string | Y | 15 |  |
| `prev_diff_rate` | 전일대비율 | string | Y | 10 |  |

**Request Example:**
```
SRS_CD:OESU24 C5500  EXCH_CD:CME  START_DATE_TIME:  CLOSE_DATE_TIME:  QRY_TP:Q  QRY_CNT:119  QRY_GAP:  INDEX_KEY:
```

**Response Example:**
```
{      "output1": {          "ret_cnt": "0120",          "last_n_cnt": "",          "index_key": "20240308"      },      "output2": [          {              "data_date": "20240308",              "data_time": "",              "open_price": "           6600",              "high_price": "           6675",              "low_price": "           6600",              "last_price": "           6675",              "last_qntt": "",              "vol": "        20",              "prev_diff_flag": "2",              "prev_diff_price": "            800",              "prev_diff_rate": "     13.62"          },          {              "data_date": "20240311",              "data_time": "",              "open_price": "           5075",              "high_price": "           5100",              "low_price": "           5000",              "last_price": "           5100",              "last_qntt": "",              "vol": "        17",              "prev_diff_flag": "5",              "prev_diff_price": "           1575",              "prev_diff_rate": "    -23.60"          },  		...          {              "data_date": "20240909",              "data_time": "",              "open_price": "            400",              "high_price": "            400",              "low_price": "            385",              "last_price": "            385",              "last_qntt": "",              "vol": "         2",              "prev_diff_flag": "2",              "prev_diff_price": "             50",              "prev_diff_rate": "     14.93"          }      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 28. 해외옵션 체결추이(주간)

| Field | Value |
|---|---|
| Sheet | `해외옵션 체결추이(주간)` |
| Menu | [해외선물옵션] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-futureoption/v1/quotations/opt-weekly-ccnl` |
| TR_ID (실전) | `HHDFO55020000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `SRS_CD` | 종목코드 | string | Y | 32 | ex) OESU24 C5500  ※ 종목코드 "포럼 > FAQ > 종목정보 다운로드(해외) - 해외지수옵션/해외주식옵션" 참고 |
| `EXCH_CD` | 거래소코드 | string | Y | 10 | 종목코드에 맞는 거래소 코드 ex) CME |
| `START_DATE_TIME` | 조회시작일시 | string | Y | 12 | "" 공란 입력 |
| `CLOSE_DATE_TIME` | 조회종료일시 | string | Y | 12 | "" 공란 입력 |
| `QRY_TP` | 조회구분 | string | Y | 1 | Q |
| `QRY_CNT` | 요청개수 | string | Y | 4 | 예) 20 (최대 120) |
| `QRY_GAP` | 묶음개수 | string | Y | 3 | "" 공란 입력 |
| `INDEX_KEY` | 이전조회KEY | string | Y | 30 | "" 공란 입력 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `ret_cnt` | 자료개수 | string | Y | 4 |  |
| `last_n_cnt` | N틱최종개수 | string | Y | 4 |  |
| `index_key` | 이전조회KEY | string | Y | 30 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `data_date` | 일자 | string | Y | 8 | 과거일자 ~ 최근일자 순으로 조회됨 |
| `data_time` | 시간 | string | Y | 6 | "" |
| `open_price` | 시가 | string | Y | 15 |  |
| `high_price` | 고가 | string | Y | 15 |  |
| `low_price` | 저가 | string | Y | 15 |  |
| `last_price` | 체결가격 | string | Y | 15 | 체결가격  ※ focode.mst, fostkcode.mst* 의 sCalcDesz(계산 소수점) 값 참고  * 포럼 > FAQ > 종목정보 다운로드(해외) - 해외지수옵션/해외주식옵션 |
| `last_qntt` | 체결수량 | string | Y | 10 |  |
| `vol` | 누적거래수량 | string | Y | 10 |  |
| `prev_diff_flag` | 전일대비구분 | string | Y | 1 |  |
| `prev_diff_price` | 전일대비가격 | string | Y | 15 |  |
| `prev_diff_rate` | 전일대비율 | string | Y | 10 |  |

**Request Example:**
```
SRS_CD:OESU24 C5600  EXCH_CD:CME  START_DATE_TIME:  CLOSE_DATE_TIME:  QRY_TP:Q  QRY_CNT:100  QRY_GAP:  INDEX_KEY:
```

**Response Example:**
```
{      "output1": {          "ret_cnt": "0052",          "last_n_cnt": "",          "index_key": ""      },      "output2": [          {              "data_date": "20221128",              "data_time": "",              "open_price": "           5525",              "high_price": "           5550",              "low_price": "           5525",              "last_price": "           5525",              "last_qntt": "",              "vol": "       150",              "prev_diff_flag": "5",              "prev_diff_price": "            425",              "prev_diff_rate": "     -7.14"          },          {              "data_date": "20221219",              "data_time": "",              "open_price": "           3650",              "high_price": "           3650",              "low_price": "           3650",              "last_price": "           3650",              "last_qntt": "",              "vol": "        25",              "prev_diff_flag": "5",              "prev_diff_price": "           1875",              "prev_diff_rate": "    -33.94"          },          {              "data_date": "20230102",              "data_time": "",              "open_price": "           2900",              "high_price": "           2900",              "low_price": "           2825",              "last_price": "           2875",              "last_qntt": "",              "vol": "       225",              "prev_diff_flag": "5",              "prev_diff_price": "            775",              "prev_diff_rate": "    -21.23"          },  		...          {              "data_date": "20240909",              "data_time": "",              "open_price": "            900",              "high_price": "            950",              "low_price": "            900",              "last_price": "            950",              "last_qntt": "",              "vol": "        26",              "prev_diff_flag": "2",              "prev_diff_price": "            145",              "prev_diff_rate": "     18.01"          }      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 29. 해외옵션 체결추이(월간)

| Field | Value |
|---|---|
| Sheet | `해외옵션 체결추이(월간)` |
| Menu | [해외선물옵션] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-futureoption/v1/quotations/opt-monthly-ccnl` |
| TR_ID (실전) | `HHDFO55020300` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `SRS_CD` | 종목코드 | string | Y | 32 | ex) OESU24 C5500  ※ 종목코드 "포럼 > FAQ > 종목정보 다운로드(해외) - 해외지수옵션/해외주식옵션" 참고 |
| `EXCH_CD` | 거래소코드 | string | Y | 10 | 종목코드에 맞는 거래소 코드 ex) CME |
| `START_DATE_TIME` | 조회시작일시 | string | Y | 12 | "" 공란 입력 |
| `CLOSE_DATE_TIME` | 조회종료일시 | string | Y | 12 | "" 공란 입력 |
| `QRY_TP` | 조회구분 | string | Y | 1 | Q |
| `QRY_CNT` | 요청개수 | string | Y | 4 | 예) 20 (최대 120) |
| `QRY_GAP` | 묶음개수 | string | Y | 3 | "" 공란 입력 |
| `INDEX_KEY` | 이전조회KEY | string | Y | 30 | "" 공란 입력 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `ret_cnt` | 자료개수 | string | Y | 4 |  |
| `last_n_cnt` | N틱최종개수 | string | Y | 4 |  |
| `index_key` | 이전조회KEY | string | Y | 30 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `data_date` | 일자 | string | Y | 8 | 과거일자 ~ 최근일자 순으로 조회됨 |
| `data_time` | 시간 | string | Y | 6 | "" |
| `open_price` | 시가 | string | Y | 15 |  |
| `high_price` | 고가 | string | Y | 15 |  |
| `low_price` | 저가 | string | Y | 15 |  |
| `last_price` | 체결가격 | string | Y | 15 | 체결가격  ※ focode.mst, fostkcode.mst* 의 sCalcDesz(계산 소수점) 값 참고  * 포럼 > FAQ > 종목정보 다운로드(해외) - 해외지수옵션/해외주식옵션 |
| `last_qntt` | 체결수량 | string | Y | 10 |  |
| `vol` | 누적거래수량 | string | Y | 10 |  |
| `prev_diff_flag` | 전일대비구분 | string | Y | 1 |  |
| `prev_diff_price` | 전일대비가격 | string | Y | 15 |  |
| `prev_diff_rate` | 전일대비율 | string | Y | 10 |  |

**Request Example:**
```
SRS_CD:OESU24 C5600  EXCH_CD:CME  START_DATE_TIME:  CLOSE_DATE_TIME:  QRY_TP:Q  QRY_CNT:20  QRY_GAP:  INDEX_KEY:
```

**Response Example:**
```
{      "output1": {          "ret_cnt": "0016",          "last_n_cnt": "",          "index_key": ""      },      "output2": [          {              "data_date": "20221101",              "data_time": "",              "open_price": "5525",              "high_price": "5550",              "low_price": "5525",              "last_price": "5525",              "last_qntt": "",              "vol": "150",              "prev_diff_flag": "5",              "prev_diff_price": "425",              "prev_diff_rate": "-7.14"          },          {              "data_date": "20221201",              "data_time": "",              "open_price": "3650",              "high_price": "3650",              "low_price": "3650",              "last_price": "3650",              "last_qntt": "",              "vol": "25",              "prev_diff_flag": "5",              "prev_diff_price": "1875",              "prev_diff_rate": "-33.94"          },          {              "data_date": "20230101",              "data_time": "",              "open_price": "2900",              "high_price": "2900",              "low_price": "2825",              "last_price": "2875",              "last_qntt": "",              "vol": "225",              "prev_diff_flag": "5",              "prev_diff_price": "775",              "prev_diff_rate": "-21.23"          },          {              "data_date": "20230901",              "data_time": "",              "open_price": "750",              "high_price": "750",              "low_price": "750",              "last_price": "750",              "last_qntt": "",              "vol": "2",              "prev_diff_flag": "5",              "prev_diff_price": "2125",              "prev_diff_rate": "-73.91"          },          {              "data_date": "20231001",              "data_time": "",              "open_price": "630",              "high_price": "645",              "low_price": "320",              "last_price": "330",              "last_qntt": "",              "vol": "357",              "prev_diff_flag": "5",              "prev_diff_price": "420",              "prev_diff_rate": "-56.00"          },          {              "data_date": "20231101",              "data_time": "",              "open_price": "360",              "high_price": "815",              "low_price": "360",              "last_price": "800",              "last_qntt": "",              "vol": "1230",              "prev_diff_flag": "2",              "prev_diff_price": "470",              "prev_diff_rate": "142.42"          },  		...          {              "data_date": "20240901",              "data_time": "",              "open_price": "9400",              "high_price": "10250",              "low_price": "805",              "last_price": "900",              "last_qntt": "",              "vol": "3985",              "prev_diff_flag": "5",              "prev_diff_price": "9000",              "prev_diff_rate": "-90.91"          }      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1":
```

---
### 30. 해외옵션 상품기본정보

| Field | Value |
|---|---|
| Sheet | `해외옵션 상품기본정보` |
| Menu | [해외선물옵션] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-futureoption/v1/quotations/search-opt-detail` |
| TR_ID (실전) | `HHDFO55200000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `QRY_CNT` | 요청개수 | string | Y | 32 | 입력한 코드 개수 |
| `SRS_CD_01` | 종목코드1 | string | Y | 32 | SRS_CD_01부터 차례로 입력(ex ) OESU24 C5500  최대 30개 까지 가능 |
| `SRS_CD_02...` | 종목코드2 | string | Y | 32 |  |
| `SRS_CD_30` | 종목코드30 | string | Y | 32 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `exch_cd` | 거래소코드 | string | Y | 10 |  |
| `clas_cd` | 품목종류 | string | Y | 1 |  |
| `crc_cd` | 거래통화 | string | Y | 10 |  |
| `sttl_price` | 정산가 | string | Y | 15 | 정산가  ※ focode.mst, fostkcode.mst* 의 sCalcDesz(계산 소수점) 값 참고  * 포럼 > FAQ > 종목정보 다운로드(해외) - 해외지수옵션/해외주식옵션 |
| `sttl_date` | 정산일 | string | Y | 8 |  |
| `trst_mgn` | 증거금 | string | Y | 19 |  |
| `disp_digit` | 가격표시진법 | string | Y | 10 |  |
| `tick_sz` | 틱사이즈 | string | Y | 19 |  |
| `tick_val` | 틱가치 | string | Y | 19 |  |
| `mrkt_open_date` | 장개시일자 | string | Y | 8 |  |
| `mrkt_open_time` | 장개시시각 | string | Y | 6 |  |
| `mrkt_close_date` | 장마감일자 | string | Y | 8 |  |
| `mrkt_close_time` | 장마감시각 | string | Y | 6 |  |
| `trd_fr_date` | 상장일 | string | Y | 8 |  |
| `expr_date` | 만기일 | string | Y | 8 |  |
| `trd_to_date` | 최종거래일 | string | Y | 8 |  |
| `remn_cnt` | 잔존일수 | string | Y | 4 |  |
| `stat_tp` | 매매여부 | string | Y | 1 |  |
| `ctrt_size` | 계약크기 | string | Y | 19 |  |
| `stl_tp` | 최종결제구분 | string | Y | 20 |  |
| `frst_noti_date` | 최초식별일 | string | Y | 8 |  |

**Request Example:**
```
QRY_CNT:3  SRS_CD_01:OESU24 C5600  SRS_CD_02:OESU24 C5590  SRS_CD_03:OESU24 C5580
```

**Response Example:**
```
{      "output2": [          {              "exch_cd": "CME",              "clas_cd": "4",              "crc_cd": "USD",              "sttl_price": "          11000",              "sttl_date": "20240826",              "trst_mgn": "               7788",              "disp_digit": "        10",              "tick_sz": "                  0",              "tick_val": "                2.5",              "mrkt_open_date": "20240826",              "mrkt_open_time": "000700",              "mrkt_close_date": "20240827",              "mrkt_close_time": "000600",              "trd_fr_date": "20240610",              "expr_date": "20240920",              "trd_to_date": "20240920",              "remn_cnt": "0026",              "stat_tp": "",              "ctrt_size": "                 50",              "stl_tp": "현금결제",              "frst_noti_date": ""          },          {              "exch_cd": "CME",              "clas_cd": "4",              "crc_cd": "USD",              "sttl_price": "          11675",              "sttl_date": "20240826",              "trst_mgn": "               7788",              "disp_digit": "        10",              "tick_sz": "                  0",              "tick_val": "                2.5",              "mrkt_open_date": "20240826",              "mrkt_open_time": "000700",              "mrkt_close_date": "20240827",              "mrkt_close_time": "000600",              "trd_fr_date": "20240610",              "expr_date": "20240920",              "trd_to_date": "20240920",              "remn_cnt": "0026",              "stat_tp": "",              "ctrt_size": "                 50",              "stl_tp": "현금결제",              "frst_noti_date": ""          },          {              "exch_cd": "CME",              "clas_cd": "4",              "crc_cd": "USD",              "sttl_price": "          12400",              "sttl_date": "20240826",              "trst_mgn": "               7788",              "disp_digit": "        10",              "tick_sz": "                  0",              "tick_val": "                2.5",              "mrkt_open_date": "20240826",              "mrkt_open_time": "000700",              "mrkt_close_date": "20240827",              "mrkt_close_time": "000600",              "trd_fr_date": "20240718",              "expr_date": "20240920",              "trd_to_date": "20240920",              "remn_cnt": "0026",              "stat_tp": "",              "ctrt_size": "                 50",              "stl_tp": "현금결제",              "frst_noti_date": ""          }      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 31. 해외선물옵션 장운영시간

| Field | Value |
|---|---|
| Sheet | `해외선물옵션 장운영시간` |
| Menu | [해외선물옵션] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-futureoption/v1/quotations/market-time` |
| TR_ID (실전) | `OTFM2229R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FM_PDGR_CD` | FM상품군코드 | string | Y | 10 | 공백 |
| `FM_CLAS_CD` | FM클래스코드 | string | Y | 3 | '공백(전체), 001(통화), 002(금리), 003(지수),  004(농산물),005(축산물),006(금속),007(에너지)' |
| `FM_EXCG_CD` | FM거래소코드 | string | Y | 10 | 'CME(CME), EUREX(EUREX), HKEx(HKEx),  ICE(ICE), SGX(SGX), OSE(OSE), ASX(ASX),  CBOE(CBOE), MDEX(MDEX), NYSE(NYSE),  BMF(BMF),FTX(FTX), HNX(HNX), ETC(기타)' |
| `OPT_YN` | 옵션여부 | string | Y | 1 | %(전체), N(선물), Y(옵션) |
| `CTX_AREA_NK200` | 연속조회키200 | string | Y | 200 |  |
| `CTX_AREA_FK200` | 연속조회검색조건200 | string | Y | 200 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  |  |
| `fm_pdgr_cd` | FM상품군코드 | string | Y | 10 |  |
| `fm_pdgr_name` | FM상품군명 | string | Y | 60 |  |
| `fm_excg_cd` | FM거래소코드 | string | Y | 10 |  |
| `fm_excg_name` | FM거래소명 | string | Y | 60 |  |
| `fuop_dvsn_name` | 선물옵션구분명 | string | Y | 60 |  |
| `fm_clas_cd` | FM클래스코드 | string | Y | 3 |  |
| `fm_clas_name` | FM클래스명 | string | Y | 30 |  |
| `am_mkmn_strt_tmd` | 오전장운영시작시각 | string | Y | 6 |  |
| `am_mkmn_end_tmd` | 오전장운영종료시각 | string | Y | 6 |  |
| `pm_mkmn_strt_tmd` | 오후장운영시작시각 | string | Y | 6 |  |
| `pm_mkmn_end_tmd` | 오후장운영종료시각 | string | Y | 6 |  |
| `mkmn_nxdy_strt_tmd` | 장운영익일시작시각 | string | Y | 6 |  |
| `mkmn_nxdy_end_tmd` | 장운영익일종료시각 | string | Y | 6 |  |
| `base_mket_strt_tmd` | 기본시장시작시각 | string | Y | 6 |  |
| `base_mket_end_tmd` | 기본시장종료시각 | string | Y | 6 |  |

**Request Example:**
```
FM_PDGR_CD:  FM_CLAS_CD:  FM_EXCG_CD:CME  OPT_YN:%  CTX_AREA_NK200:  CTX_AREA_FK200:
```

**Response Example:**
```
{      "ctx_area_nk200": "CME^003^2ES^                                                                                                                                                                                            ",      "ctx_area_fk200": "^CME^%^                                                                                                                                                                                                 ",      "output": [          {              "fm_pdgr_cd": "6A",              "fm_pdgr_name": "Australian Dollar",              "fm_excg_cd": "CME",              "fm_excg_name": "Chicago Mercantile Exchange",              "fuop_dvsn_name": "선물",              "fm_clas_cd": "001",              "fm_clas_name": "통화",              "am_mkmn_strt_tmd": "070000",              "am_mkmn_end_tmd": "060000",              "pm_mkmn_strt_tmd": "",              "pm_mkmn_end_tmd": "",              "mkmn_nxdy_strt_tmd": "",              "mkmn_nxdy_end_tmd": "",              "base_mket_strt_tmd": "070000",              "base_mket_end_tmd": "060000"          },          {              "fm_pdgr_cd": "6B",              "fm_pdgr_name": "British pounds",              "fm_excg_cd": "CME",              "fm_excg_name": "Chicago Mercantile Exchange",              "fuop_dvsn_name": "선물",              "fm_clas_cd": "001",              "fm_clas_name": "통화",              "am_mkmn_strt_tmd": "070000",              "am_mkmn_end_tmd": "060000",              "pm_mkmn_strt_tmd": "",              "pm_mkmn_end_tmd": "",              "mkmn_nxdy_strt_tmd": "",              "mkmn_nxdy_end_tmd": "",              "base_mket_strt_tmd": "070000",              "base_mket_end_tmd": "060000"          },          {              "fm_pdgr_cd": "6C",              "fm_pdgr_name": "Canadian Dollar",              "fm_excg_cd": "CME",              "fm_excg_name": "Chicago Mercantile Exchange",              "fuop_dvsn_name": "선물",              "fm_clas_cd": "001",              "fm_clas_name": "통화",              "am_mkmn_strt_tmd": "070000",              "am_mkmn_end_tmd": "060000",              "pm_mkmn_strt_tmd": "",              "pm_mkmn_end_tmd": "",              "mkmn_nxdy_strt_tmd": "",              "mkmn_nxdy_end_tmd": "",              "base_mket_strt_tmd": "070000",              "base_mket_end_tmd": "060000"          },          {              "fm_pdgr_cd": "6E",              "fm_pdgr_name": "Euro FX",              "fm_excg_cd": "CME",              "fm_excg_name": "Chicago Mercantile Exchange",              "fuop_dvsn_name": "선물",              "fm_clas_cd": "001",              "fm_clas_name": "통화",              "am_mkmn_strt_tmd": "070000",              "am_mkmn_end_tmd": "060000",              "pm_mkmn_strt_tmd": "",              "pm_mkmn_end_tmd": "",              "mkmn_nxdy_strt_tmd": "",              "mkmn_nxdy_end_tmd": "",              "base_mket_strt_tmd": "070000",              "base_mket_end_tmd": "060000"          },          {              "f
```

---
### 32. 해외선물옵션 실시간체결가

| Field | Value |
|---|---|
| Sheet | `해외선물옵션 실시간체결가` |
| Menu | [해외선물옵션]실시간시세 |
| Method | `POST` |
| URL | `/tryitout/HDFFF020` |
| TR_ID (실전) | `HDFFF020` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | "1: 등록, 2:해제" |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 7 | HDFFF020 |
| `tr_key` | 종목코드 | string | Y | 6 | 종목코드    ※ CME, SGX 실시간시세 유료시세 신청 필수   "포럼 > FAQ > 해외선물옵션 API 유료시세 신청방법(CME, SGX 거래소)" |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `SERIES_CD` | 종목코드 | string | Y | 32 | '각 항목사이에는 구분자로 ^ 사용,  모든 데이터타입은 String으로 변환되어 push 처리됨' |
| `BSNS_DATE` | 영업일자 | string | Y | 8 |  |
| `MRKT_OPEN_DATE` | 장개시일자 | string | Y | 8 |  |
| `MRKT_OPEN_TIME` | 장개시시각 | string | Y | 6 |  |
| `MRKT_CLOSE_DATE` | 장종료일자 | string | Y | 8 |  |
| `MRKT_CLOSE_TIME` | 장종료시각 | string | Y | 6 |  |
| `PREV_PRICE` | 전일종가 | string | Y | 15 | 전일종가, 체결가격, 전일대비가, 시가, 고가, 저가  ※ ffcode.mst(해외선물종목마스터 파일)의 sCalcDesz(계산 소수점) 값 참고 |
| `RECV_DATE` | 수신일자 | string | Y | 8 |  |
| `RECV_TIME` | 수신시각 | string | Y | 6 | 수신시각(recv_time) = 실제 체결시각 |
| `ACTIVE_FLAG` | 본장_전산장구분 | string | Y | 1 |  |
| `LAST_PRICE` | 체결가격 | string | Y | 15 |  |
| `LAST_QNTT` | 체결수량 | string | Y | 10 |  |
| `PREV_DIFF_PRICE` | 전일대비가 | string | Y | 15 |  |
| `PREV_DIFF_RATE` | 등락률 | string | Y | 10 |  |
| `OPEN_PRICE` | 시가 | string | Y | 15 |  |
| `HIGH_PRICE` | 고가 | string | Y | 15 |  |
| `LOW_PRICE` | 저가 | string | Y | 15 |  |
| `VOL` | 누적거래량 | string | Y | 10 |  |
| `PREV_SIGN` | 전일대비부호 | string | Y | 1 |  |
| `QUOTSIGN` | 체결구분 | string | Y | 1 | 2:매수체결 5:매도체결 |
| `RECV_TIME2` | 수신시각2 만분의일초 | string | Y | 4 |  |
| `PSTTL_PRICE` | 전일정산가 | string | Y | 15 |  |
| `PSTTL_SIGN` | 전일정산가대비 | string | Y | 1 |  |
| `PSTTL_DIFF_PRICE` | 전일정산가대비가격 | string | Y | 15 |  |
| `PSTTL_DIFF_RATE` | 전일정산가대비율 | string | Y | 10 |  |

---
### 33. 해외선물옵션 실시간호가

| Field | Value |
|---|---|
| Sheet | `해외선물옵션 실시간호가` |
| Menu | [해외선물옵션]실시간시세 |
| Method | `POST` |
| URL | `/tryitout/HDFFF010` |
| TR_ID (실전) | `HDFFF010` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | "1: 등록, 2:해제" |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 7 | HDFFF010 |
| `tr_key` | 종목코드 | string | Y | 6 | 종목코드    ※ CME, SGX 실시간시세 유료시세 신청 필수   "포럼 > FAQ > 해외선물옵션 API 유료시세 신청방법(CME, SGX 거래소)" |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `SERIES_CD` | 종목코드 | object | Y | 32 | '각 항목사이에는 구분자로 ^ 사용,  모든 데이터타입은 String으로 변환되어 push 처리됨' |
| `RECV_DATE` | 수신일자 | string | Y | 8 |  |
| `RECV_TIME` | 수신시각 | string | Y | 12 |  |
| `PREV_PRICE` | 전일종가 | string | Y | 15 | 전일종가, 매수1호가~매도5호가  ※ ffcode.mst(해외선물종목마스터 파일)의 sCalcDesz(계산 소수점) 값 참고 |
| `BID_QNTT_1` | 매수1수량 | string | Y | 10 |  |
| `BID_NUM_1` | 매수1번호 | string | Y | 10 |  |
| `BID_PRICE_1` | 매수1호가 | string | Y | 15 |  |
| `ASK_QNTT_1` | 매도1수량 | string | Y | 10 |  |
| `ASK_NUM_1` | 매도1번호 | string | Y | 10 |  |
| `ASK_PRICE_1` | 매도1호가 | string | Y | 15 |  |
| `BID_QNTT_2` | 매수2수량 | string | Y | 10 |  |
| `BID_NUM_2` | 매수2번호 | string | Y | 10 |  |
| `BID_PRICE_2` | 매수2호가 | string | Y | 15 |  |
| `ASK_QNTT_2` | 매도2수량 | string | Y | 10 |  |
| `ASK_NUM_2` | 매도2번호 | string | Y | 10 |  |
| `ASK_PRICE_2` | 매도2호가 | string | Y | 15 |  |
| `BID_QNTT_3` | 매수3수량 | string | Y | 10 |  |
| `BID_NUM_3` | 매수3번호 | string | Y | 10 |  |
| `BID_PRICE_3` | 매수3호가 | string | Y | 15 |  |
| `ASK_QNTT_3` | 매도3수량 | string | Y | 10 |  |
| `ASK_NUM_3` | 매도3번호 | string | Y | 10 |  |
| `ASK_PRICE_3` | 매도3호가 | string | Y | 15 |  |
| `BID_QNTT_4` | 매수4수량 | string | Y | 10 |  |
| `BID_NUM_4` | 매수4번호 | string | Y | 10 |  |
| `BID_PRICE_4` | 매수4호가 | string | Y | 15 |  |
| `ASK_QNTT_4` | 매도4수량 | string | Y | 10 |  |
| `ASK_NUM_4` | 매도4번호 | string | Y | 10 |  |
| `ASK_PRICE_4` | 매도4호가 | string | Y | 15 |  |
| `BID_QNTT_5` | 매수5수량 | string | Y | 10 |  |
| `BID_NUM_5` | 매수5번호 | string | Y | 10 |  |
| `BID_PRICE_5` | 매수5호가 | string | Y | 15 |  |
| `ASK_QNTT_5` | 매도5수량 | string | Y | 10 |  |
| `ASK_NUM_5` | 매도5번호 | string | Y | 10 |  |
| `ASK_PRICE_5` | 매도5호가 | string | Y | 15 |  |
| `STTL_PRICE` | 전일정산가 | string | Y | 15 |  |

---
### 34. 해외선물옵션 실시간주문내역통보

| Field | Value |
|---|---|
| Sheet | `해외선물옵션 실시간주문내역통보` |
| Menu | [해외선물옵션]실시간시세 |
| Method | `POST` |
| URL | `/tryitout/HDFFF1C0` |
| TR_ID (실전) | `HDFFF1C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | "1: 등록, 2:해제" |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 7 | HDFFF1C0 |
| `tr_key` | HTSID | string | Y | 8 | HTSID |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `USER_ID` | 유저ID | object | Y | 8 | '각 항목사이에는 구분자로 ^ 사용,  모든 데이터타입은 String으로 변환되어 push 처리됨' |
| `ACCT_NO` | 계좌번호 | string | Y | 10 |  |
| `ORD_DT` | 주문일자 | string | Y | 8 |  |
| `ODNO` | 주문번호 | string | Y | 10 |  |
| `ORGN_ORD_DT` | 원주문일자 | string | Y | 8 |  |
| `ORGN_ODNO` | 원주문번호 | string | Y | 10 |  |
| `SERIES` | 종목명 | string | Y | 32 |  |
| `RVSE_CNCL_DVSN_CD` | 정정취소구분코드 | string | Y | 2 | 해당없음 : 00 , 정정 : 01 , 취소 : 02 |
| `SLL_BUY_DVSN_CD` | 매도매수구분코드 | string | Y | 2 | 01 : 매도,  02 : 매수 |
| `CPLX_ORD_DVSN_CD` | 복합주문구분코드 | string | Y | 1 | 0 (hedge청산만 이용) |
| `PRCE_TP` | 가격구분코드 | string | Y | 1 | 1:Limit, 2:Market, 3:Stop(Stop가격시 시장가) |
| `FM_EXCG_RCIT_DVSN_CD` | FM거래소접수구분코드 | string | Y | 2 | 01:접수전, 02:응답, 03:거부 |
| `ORD_QTY` | 주문수량 | string | Y | 18 |  |
| `FM_LMT_PRIC` | FMLIMIT가격 | string | Y | 21 |  |
| `FM_STOP_ORD_PRIC` | FMSTOP주문가격 | string | Y | 21 |  |
| `TOT_CCLD_QTY` | 총체결수량 | string | Y | 18 |  |
| `TOT_CCLD_UV` | 총체결단가 | string | Y | 21 |  |
| `ORD_REMQ` | 잔량 | string | Y | 21 |  |
| `FM_ORD_GRP_DT` | FM주문그룹일자 | string | Y | 8 | 주문일자(ORD_DT)와 동일 |
| `ORD_GRP_STNO` | 주문그룹번호 | string | Y | 12 |  |
| `ORD_DTL_DTIME` | 주문상세일시 | string | Y | 17 |  |
| `OPRT_DTL_DTIME` | 조작상세일시 | string | Y | 17 |  |
| `WORK_EMPL` | 주문자 | string | Y | 8 |  |
| `CRCY_CD` | 통화코드 | string | Y | 3 |  |
| `LQD_YN` | 청산여부(Y/N) | string | Y | 1 |  |
| `LQD_LMT_PRIC` | 청산LIMIT가격 | string | Y | 21 |  |
| `LQD_STOP_PRIC` | 청산STOP가격 | string | Y | 21 |  |
| `TRD_COND` | 체결조건코드 | string | Y | 1 |  |
| `TERM_ORD_VALD_DTIME` | 기간주문유효상세일시 | string | Y | 17 |  |
| `SPEC_TP` | 계좌청산유형구분코드 | string | Y | 1 |  |
| `ECIS_RSVN_ORD_YN` | 행사예약주문여부 | string | Y | 1 |  |
| `FUOP_ITEM_DVSN_CD` | 선물옵션종목구분코드 | string | Y | 2 |  |
| `AUTO_ORD_DVSN_CD` | 자동주문 전략구분 | string | Y | 2 |  |

---
### 35. 해외선물옵션 실시간체결내역통보

| Field | Value |
|---|---|
| Sheet | `해외선물옵션 실시간체결내역통보` |
| Menu | [해외선물옵션]실시간시세 |
| Method | `POST` |
| URL | `/tryitout/HDFFF2C0` |
| TR_ID (실전) | `HDFFF2C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | "1: 등록, 2:해제" |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 7 | HDFFF2C0 |
| `tr_key` | HTSID | string | Y | 8 | HTSID |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `USER_ID` | 유저ID | object | Y | 8 | '각 항목사이에는 구분자로 ^ 사용,  모든 데이터타입은 String으로 변환되어 push 처리됨' |
| `ACCT_NO` | 계좌번호 | string | Y | 10 |  |
| `ORD_DT` | 주문일자 | string | Y | 8 |  |
| `ODNO` | 주문번호 | string | Y | 10 |  |
| `ORGN_ORD_DT` | 원주문일자 | string | Y | 8 |  |
| `ORGN_ODNO` | 원주문번호 | string | Y | 10 |  |
| `SERIES` | 종목명 | string | Y | 32 |  |
| `RVSE_CNCL_DVSN_CD` | 정정취소구분코드 | string | Y | 2 | 해당없음 : 00 , 정정 : 01 , 취소 : 02 |
| `SLL_BUY_DVSN_CD` | 매도매수구분코드 | string | Y | 2 | 01 : 매도,  02 : 매수 |
| `CPLX_ORD_DVSN_CD` | 복합주문구분코드 | string | Y | 1 | 0 (hedge청산만 이용) |
| `PRCE_TP` | 가격구분코드 | string | Y | 1 |  |
| `FM_EXCG_RCIT_DVSN_CD` | FM거래소접수구분코드 | string | Y | 2 |  |
| `ORD_QTY` | 주문수량 | string | Y | 18 |  |
| `FM_LMT_PRIC` | FMLIMIT가격 | string | Y | 21 |  |
| `FM_STOP_ORD_PRIC` | FMSTOP주문가격 | string | Y | 21 |  |
| `TOT_CCLD_QTY` | 총체결수량 | string | Y | 18 | 동일한 주문건에 대한 누적된 체결수량 (하나의 주문건에 여러건의 체결내역 발생) |
| `TOT_CCLD_UV` | 총체결단가 | string | Y | 21 |  |
| `ORD_REMQ` | 잔량 | string | Y | 21 |  |
| `FM_ORD_GRP_DT` | FM주문그룹일자 | string | Y | 8 |  |
| `ORD_GRP_STNO` | 주문그룹번호 | string | Y | 12 |  |
| `ORD_DTL_DTIME` | 주문상세일시 | string | Y | 17 |  |
| `OPRT_DTL_DTIME` | 조작상세일시 | string | Y | 17 |  |
| `WORK_EMPL` | 주문자 | string | Y | 8 |  |
| `CCLD_DT` | 체결일자 | string | Y | 8 |  |
| `CCNO` | 체결번호 | string | Y | 11 |  |
| `API_CCNO` | API 체결번호 | string | Y | 20 |  |
| `CCLD_QTY` | 체결수량 | string | Y | 18 | 매 체결 단위 체결수량임 (여러건 체결내역 누적 체결수량인 총체결수량과 다름) |
| `FM_CCLD_PRIC` | FM체결가격 | string | Y | 21 |  |
| `CRCY_CD` | 통화코드 | string | Y | 3 |  |
| `TRST_FEE` | 위탁수수료 | string | Y | 21 |  |
| `ORD_MDIA_ONLINE_YN` | 주문매체온라인여부 | string | Y | 1 |  |
| `FM_CCLD_AMT` | FM체결금액 | string | Y | 21 |  |
| `FUOP_ITEM_DVSN_CD` | 선물옵션종목구분코드 | string | Y | 2 |  |

---
