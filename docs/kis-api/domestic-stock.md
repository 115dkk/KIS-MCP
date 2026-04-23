# [국내주식] API

한국투자증권 OpenAPI — `[국내주식]` 카테고리 (186개).
원본 시트는 cp949 엑셀이며 본 파일은 LLM 친화 변환본. 검색은 `INDEX.md` 권장.

공통 OAuth 헤더(`authorization`, `appkey`, `appsecret`, `tr_id`, `custtype` 등)는 모든 API 동일하므로 본 문서에서 생략. `INDEX.md` 상단 참고.

---
### 1. 기간별계좌권리현황조회

| Field | Value |
|---|---|
| Sheet | `기간별계좌권리현황조회` |
| Menu | [국내주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/trading/period-rights` |
| TR_ID (실전) | `CTRGA011R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `INQR_DVSN` | 조회구분 | string | Y | 2 | 03 입력 |
| `CUST_RNCNO25` | 고객실명확인번호25 | string | Y | 25 | 공란 |
| `HMID` | 홈넷ID | string | Y | 8 | 공란 |
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 8자리 입력 (ex.12345678) |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 상품계좌번호 2자리 입력(ex. 01 or 22) |
| `INQR_STRT_DT` | 조회시작일자 | string | Y | 8 | 조회시작일자(YYYYMMDD) |
| `INQR_END_DT` | 조회종료일자 | string | Y | 8 | 조회종료일자(YYYYMMDD) |
| `RGHT_TYPE_CD` | 권리유형코드 | string | Y | 2 | 공란 |
| `PDNO` | 상품번호 | string | Y | 12 | 공란 |
| `PRDT_TYPE_CD` | 상품유형코드 | string | Y | 3 | 공란 |
| `CTX_AREA_NK100` | 연속조회키100 | string | Y | 100 | 다음조회시 입력 |
| `CTX_AREA_FK100` | 연속조회검색조건100 | string | Y | 100 | 다음조회시 입력 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `acno10` | 계좌번호10 | string | Y | 10 |  |
| `rght_type_cd` | 권리유형코드 | string | Y | 2 | 1	유상  2	무상  3	배당  4	매수청구  5	공개매수  6	주주총회  7	신주인수권증서  8	반대의사  9	신주인수권증권  11	합병  12	회사분할  13	주식교환  14	액면분할  15	액면병합  16	종목변경  17	감자  18	신구주합병  21	후합병  22	후회사분할  23	후주식교환  24	후액면분할  25	후액면병합  26	후종목변경  27	후감자  28	후신구주합병  31	뮤츄얼펀드  32	ETF  33	선박투자회사  34	투융자회사  35	해외자원  36	부동산신탁(Ritz)  37	상장수익증권  41	ELW만기  42	ELS분배  43	DLS분배  44	하일드펀드  45	ETN  51	전환청구  52	교환청구  53	BW청구  54	WRT청구  55	채권풋옵션청구  56	전환우선주청구  57	전환조건부청구  58	전자증권일괄입고  59	클라우드펀딩일괄입고  61	원리금상환  62	스트립채권  71	WRT소멸  72	WRT증권  73	DR전환  74	배당옵션  75	특별배당  76	ISINCODE변경  77	실권주청약  81	해외분배금(청산)  82	해외분배금(조기상환)  83	해외분배금(상장폐지)  84	DR FEE  85	SECTION 871M  86	종목전환  87	재매수  88	종목교환  89	기타이벤트  91	공모주  92	청약  93	환매  99	기타권리사유 |
| `bass_dt` | 기준일자 | string | Y | 8 |  |
| `rght_cblc_type_cd` | 권리잔고유형코드 | string | Y | 2 | 1	입고  2	출고  3	출고입고  4	출고입금  5	출고출금  10	현금입금  11	단수주대금입금  12	교부금입금  13	유상감자대금입금  14	지연이자입금  15	이자지급  16	대주권리금출금  17	분할상환  18	만기상환  19	조기상환  20	출금  21	입고&입금  22	입고&입금&단수주대금입금  25	유상환불금입금  26	중도상환  27	분할합병세금출금 |
| `rptt_pdno` | 대표상품번호 | string | Y | 12 |  |
| `pdno` | 상품번호 | string | Y | 12 |  |
| `prdt_type_cd` | 상품유형코드 | string | Y | 3 |  |
| `shtn_pdno` | 단축상품번호 | string | Y | 12 |  |
| `prdt_name` | 상품명 | string | Y | 60 |  |
| `cblc_qty` | 잔고수량 | string | Y | 19 |  |
| `last_alct_qty` | 최종배정수량 | string | Y | 19 |  |
| `excs_alct_qty` | 초과배정수량 | string | Y | 19 |  |
| `tot_alct_qty` | 총배정수량 | string | Y | 19 |  |
| `last_ftsk_qty` | 최종단수주수량 | string | Y | 191 |  |
| `last_alct_amt` | 최종배정금액 | string | Y | 19 |  |
| `last_ftsk_chgs` | 최종단수주대금 | string | Y | 19 |  |
| `rdpt_prca` | 상환원금 | string | Y | 19 |  |
| `dlay_int_amt` | 지연이자금액 | string | Y | 19 |  |
| `lstg_dt` | 상장일자 | string | Y | 8 |  |
| `sbsc_end_dt` | 청약종료일자 | string | Y | 8 |  |
| `cash_dfrm_dt` | 현금지급일자 | string | Y | 8 |  |
| `rqst_qty` | 신청수량 | string | Y | 19 |  |
| `rqst_amt` | 신청금액 | string | Y | 19 |  |
| `rqst_dt` | 신청일자 | string | Y | 8 |  |
| `rfnd_dt` | 환불일자 | string | Y | 8 |  |
| `rfnd_amt` | 환불금액 | string | Y | 19 |  |
| `lstg_stqt` | 상장주수 | string | Y | 19 |  |
| `tax_amt` | 세금금액 | string | Y | 19 |  |
| `sbsc_unpr` | 청약단가 | string | Y | 224 |  |

**Request Example:**
```
INQR_DVSN:03  CUST_RNCNO25:  HMID:  CANO:12345678  ACNT_PRDT_CD:01  INQR_STRT_DT:20240508  INQR_END_DT:20241106  RGHT_TYPE_CD:  PDNO:  PRDT_TYPE_CD:  CTX_AREA_NK100:  CTX_AREA_FK100:
```

**Response Example:**
```
{      "ctx_area_nk100": "                                                                                                    ",      "ctx_area_fk100": "03!^!^!^12345678!^01!^20240508!^20241106!^!^!^                                                      ",      "output": [          {              "acno10": "1234567801",              "rght_type_cd": "01",              "bass_dt": "20240919",              "rght_cblc_type_cd": "01",              "rptt_pdno": "00000A357880",              "pdno": "00000A357880",              "prdt_type_cd": "300",              "shtn_pdno": "357880",              "prdt_name": "비트나인",              "cblc_qty": "1000",              "last_alct_qty": "1050",              "excs_alct_qty": "0",              "tot_alct_qty": "1050",              "last_ftsk_qty": "0.0000000000",              "last_alct_amt": "0",              "last_ftsk_chgs": "0",              "rdpt_prca": "0",              "dlay_int_amt": "0",              "lstg_dt": "",              "sbsc_end_dt": "20241011",              "cash_dfrm_dt": "",              "rqst_qty": "1000",              "rqst_amt": "1865000",              "rqst_dt": "20241011",              "rfnd_dt": "",              "rfnd_amt": "0",              "lstg_stqt": "0",              "tax_amt": "0",              "sbsc_unpr": "1865.0000"          }      ],      "rt_cd": "0",      "msg_cd": "KIOK0460",      "msg1": "조회 되었습니다. (마지막 자료)                                                  "  }
```

---
### 2. 투자계좌자산현황조회

| Field | Value |
|---|---|
| Sheet | `투자계좌자산현황조회` |
| Menu | [국내주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/trading/inquire-account-balance` |
| TR_ID (실전) | `CTRP6548R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `INQR_DVSN_1` | 조회구분1 | string | Y | 1 | 공백입력 |
| `BSPR_BF_DT_APLY_YN` | 기준가이전일자적용여부 | string | Y | 1 | 공백입력 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `Output1` | 응답상세 | object array | Y |  | Array [아래 순서대로 출력 : 20항목]  1: 주식  2: 펀드/MMW  3: IMA  4: 채권  5: ELS/DLS  6: WRAP  7: 신탁  8: RP/발행어음  9: 해외주식  10: 해외채권  11: 금현물  12: CD/CP  13: 전자단기사채  14: 타사상품  15: 외화전자단기사채  16: 외화 ELS/DLS  17: 외화  18: 예수금  19: 청약자예수금  20: 합계    [21번 계좌일 경우 : 17항목]  1: 수익증권  2: IMA  3: 채권  4: ELS/DLS  5: WRAP  6: 신탁  7: RP  8: 외화rp  9: 해외채권  10: CD/CP  11: 전자단기사채  12: 외화전자단기사채  13: 외화ELS/DLS  14: 외화평가금액  15: 예수금+cma  16: 청약자예수금  17: 합계 |
| `pchs_amt` | 매입금액 | string | Y | 19 |  |
| `evlu_amt` | 평가금액 | string | Y | 19 |  |
| `evlu_pfls_amt` | 평가손익금액 | string | Y | 19 |  |
| `crdt_lnd_amt` | 신용대출금액 | string | Y | 19 |  |
| `real_nass_amt` | 실제순자산금액 | string | Y | 19 |  |
| `whol_weit_rt` | 전체비중율 | string | Y | 228 |  |
| `Output2` | 응답상세2 | object | Y |  |  |
| `pchs_amt_smtl` | 매입금액합계 | string | Y | 19 | 유가매입금액 |
| `nass_tot_amt` | 순자산총금액 | string | Y | 19 |  |
| `loan_amt_smtl` | 대출금액합계 | string | Y | 19 |  |
| `evlu_pfls_amt_smtl` | 평가손익금액합계 | string | Y | 19 | 평가손익금액 |
| `evlu_amt_smtl` | 평가금액합계 | string | Y | 19 | 유가평가금액 |
| `tot_asst_amt` | 총자산금액 | string | Y | 19 | 총 자산금액 |
| `tot_lnda_tot_ulst_lnda` | 총대출금액총융자대출금액 | string | Y | 19 |  |
| `cma_auto_loan_amt` | CMA자동대출금액 | string | Y | 19 |  |
| `tot_mgln_amt` | 총담보대출금액 | string | Y | 19 |  |
| `stln_evlu_amt` | 대주평가금액 | string | Y | 19 |  |
| `crdt_fncg_amt` | 신용융자금액 | string | Y | 19 |  |
| `ocl_apl_loan_amt` | OCL_APL대출금액 | string | Y | 19 |  |
| `pldg_stup_amt` | 질권설정금액 | string | Y | 19 |  |
| `frcr_evlu_tota` | 외화평가총액 | string | Y | 19 |  |
| `tot_dncl_amt` | 총예수금액 | string | Y | 19 |  |
| `cma_evlu_amt` | CMA평가금액 | string | Y | 19 |  |
| `dncl_amt` | 예수금액 | string | Y | 19 |  |
| `tot_sbst_amt` | 총대용금액 | string | Y | 19 |  |
| `thdt_rcvb_amt` | 당일미수금액 | string | Y | 20 |  |
| `ovrs_stck_evlu_amt1` | 해외주식평가금액1 | string | Y | 236 |  |
| `ovrs_bond_evlu_amt` | 해외채권평가금액 | string | Y | 236 |  |
| `mmf_cma_mgge_loan_amt` | MMFCMA담보대출금액 | string | Y | 19 |  |
| `sbsc_dncl_amt` | 청약예수금액 | string | Y | 19 |  |
| `pbst_sbsc_fnds_loan_use_amt` | 공모주청약자금대출사용금액 | string | Y | 20 |  |
| `etpr_crdt_grnt_loan_amt` | 기업신용공여대출금액 | string | Y | 19 |  |

**Request Example:**
```
{  	"CANO":"12345678",  	"ACNT_PRDT_CD":"01",  	"INQR_DVSN_1":"",  	"BSPR_BF_DT_APLY_YN":"",  }
```

**Response Example:**
```
{      "output1": [          {              "pchs_amt": "129105",              "evlu_amt": "406000",              "evlu_pfls_amt": "276895",              "crdt_lnd_amt": "0",              "real_nass_amt": "406000",              "whol_weit_rt": "0.00000000"          },          {              "pchs_amt": "0",              "evlu_amt": "0",              "evlu_pfls_amt": "0",              "crdt_lnd_amt": "0",              "real_nass_amt": "0",              "whol_weit_rt": "0.00000000"          },          {              "pchs_amt": "0",              "evlu_amt": "0",              "evlu_pfls_amt": "0",              "crdt_lnd_amt": "0",              "real_nass_amt": "0",              "whol_weit_rt": "0.00000000"          },          {              "pchs_amt": "0",              "evlu_amt": "0",              "evlu_pfls_amt": "0",              "crdt_lnd_amt": "0",              "real_nass_amt": "0",              "whol_weit_rt": "0.00000000"          },          {              "pchs_amt": "0",              "evlu_amt": "0",              "evlu_pfls_amt": "0",              "crdt_lnd_amt": "0",              "real_nass_amt": "0",              "whol_weit_rt": "0.00000000"          },          {              "pchs_amt": "0",              "evlu_amt": "0",              "evlu_pfls_amt": "0",              "crdt_lnd_amt": "0",              "real_nass_amt": "0",              "whol_weit_rt": "0.00000000"          },          {              "pchs_amt": "0",              "evlu_amt": "0",              "evlu_pfls_amt": "0",              "crdt_lnd_amt": "0",              "real_nass_amt": "0",              "whol_weit_rt": "0.00000000"          },          {              "pchs_amt": "161026228",              "evlu_amt": "185144504",              "evlu_pfls_amt": "24118276",              "crdt_lnd_amt": "0",              "real_nass_amt": "185144504",              "whol_weit_rt": "0.01000000"          },          {              "pchs_amt": "0",              "evlu_amt": "0",              "evlu_pfls_amt": "0",              "crdt_lnd_amt": "0",              "real_nass_amt": "0",              "whol_weit_rt": "0.00000000"          },          {              "pchs_amt": "0",              "evlu_amt": "0",              "evlu_pfls_amt": "0",              "crdt_lnd_amt": "0",              "real_nass_amt": "0",              "whol_weit_rt": "0.00000000"          },          {              "pchs_amt": "0",              "evlu_amt": "0",              "evlu_pfls_amt": "0",              "crdt_lnd_amt": "0",              "real_nass_amt": "0",              "whol_weit_rt": "0.00000000"          },          {              "pchs_amt": "0",              "evlu_amt": "0",              "evlu_pfls_amt": "0",              "crdt_lnd_amt": "0",              "real_nass_amt": "0",              "whol_weit_rt": "0.00000000"          },          {              "pchs_amt": "0",              "evlu_amt": "0",              "evlu_pfls_amt": "0",              "crdt_lnd_amt": "0",              "real_nass_amt": "0",       
```

---
### 3. 퇴직연금 예수금조회

| Field | Value |
|---|---|
| Sheet | `퇴직연금 예수금조회` |
| Menu | [국내주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/trading/pension/inquire-deposit` |
| TR_ID (실전) | `TTTC0506R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 |  |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 29 |
| `ACCA_DVSN_CD` | 적립금구분코드 | string | Y | 2 | 00 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세1 | object | Y |  |  |
| `dnca_tota` | 예수금총액 | string | Y | 19 |  |
| `nxdy_excc_amt` | 익일정산액 | string | Y | 19 |  |
| `nxdy_sttl_amt` | 익일결제금액 | string | Y | 19 |  |
| `nx2_day_sttl_amt` | 2익일결제금액 | string | Y | 19 |  |

**Request Example:**
```
{  	"CANO":"63512345",  	"ACNT_PRDT_CD":"29",  	"ACCA_DVSN_CD":"00"  }
```

**Response Example:**
```
{      "output": {          "dnca_tota": "57622382",          "nxdy_excc_amt": "11054042",          "nxdy_sttl_amt": "0",          "nx2_day_sttl_amt": "0"      },      "rt_cd": "0",      "msg_cd": "KIOK0510",      "msg1": "조회가 완료되었습니다                                                           "  }
```

---
### 4. 주식예약주문정정취소

| Field | Value |
|---|---|
| Sheet | `주식예약주문정정취소` |
| Menu | [국내주식] 주문/계좌 |
| Method | `POST` |
| URL | `/uapi/domestic-stock/v1/trading/order-resv-rvsecncl` |
| TR_ID (실전) | `(예약취소) CTSC0009U (예약정정) CTSC0013U` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | [정정/취소] 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | [정정/취소] 계좌번호 체계(8-2)의 뒤 2자리 |
| `PDNO` | 종목코드(6자리) | string | Y | 12 | [정정] |
| `ORD_QTY` | 주문수량 | string | Y | 10 | [정정] 주문주식수 |
| `ORD_UNPR` | 주문단가 | string | Y | 19 | [정정] 1주당 가격   * 장전 시간외, 시장가의 경우 1주당 가격을 공란으로 비우지 않음 "0"으로 입력 권고 |
| `SLL_BUY_DVSN_CD` | 매도매수구분코드 | string | Y | 2 | [정정]  01 : 매도  02 : 매수 |
| `ORD_DVSN_CD` | 주문구분코드 | string | Y | 2 | [정정]  00 : 지정가  01 : 시장가  02 : 조건부지정가  05 : 장전 시간외 |
| `ORD_OBJT_CBLC_DVSN_CD` | 주문대상잔고구분코드 | string | Y | 2 | [정정]  10 : 현금  12 : 주식담보대출  14 : 대여상환  21 : 자기융자신규  22 : 유통대주신규  23 : 유통융자신규  24 : 자기대주신규  25 : 자기융자상환  26 : 유통대주상환  27 : 유통융자상환  28 : 자기대주상환 |
| `LOAN_DT` | 대출일자 | string | N | 8 | [정정] |
| `RSVN_ORD_END_DT` | 예약주문종료일자 | string | N | 8 | [정정] |
| `CTAL_TLNO` | 연락전화번호 | string | N | 20 | [정정] |
| `RSVN_ORD_SEQ` | 예약주문순번 | string | Y | 10 | [정정/취소] |
| `RSVN_ORD_ORGNO` | 예약주문조직번호 | string | N | 5 | [정정/취소] |
| `RSVN_ORD_ORD_DT` | 예약주문주문일자 | string | N | 8 | [정정/취소] |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 | 0 : 성공   0 이외의 값 : 실패 |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | array | Y |  |  |
| `nrml_prcs_yn` | 정상처리여부 | string | Y | 1 |  |

**Request Example:**
```
{   	"_comment": "주식예약주문취소",   	"CANO": "810XXXXX",   	"ACNT_PRDT_CD": "01",   	"RSVN_ORD_ORD_DT": "20220427",   	"RSVN_ORD_SEQ": "39447",   	"RSVN_ORD_ORGNO": "00"   }     {   	"_comment": "주식예약주문정정",   	"CANO": "810XXXXX",   	"ACNT_PRDT_CD": "01",   	"PDNO": "009150",   	"ORD_QTY": "10",   	"ORD_UNPR": "140000",   	"SLL_BUY_DVSN_CD":"01",   	"ORD_DVSN_CD":"00",   	"ORD_OBJT_CBLC_DVSN_CD":"10",   	"LOAN_DT":"",   	"RSVN_ORD_END_DT":"",   	"CTAC_TLNO": "",   	"RSVN_ORD_SEQ":"39453",   	"RSVN_ORD_ORGNO":"",   	"RSVN_ORD_ORD_DT":"20220427"   }
```

**Response Example:**
```
{   	"rt_cd": "0",   	"msg_cd": "KIOK0430",   	"msg1": "정상적으로 처리되었습니다",   	"output": {   		"NRML_PRCS_YN": "Y"   	}   }
```

---
### 5. 신용매수가능조회

| Field | Value |
|---|---|
| Sheet | `신용매수가능조회` |
| Menu | [국내주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/trading/inquire-credit-psamount` |
| TR_ID (실전) | `TTTC8909R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `PDNO` | 상품번호 | string | Y | 12 | 종목코드(6자리) |
| `ORD_UNPR` | 주문단가 | string | Y | 19 | 1주당 가격   * 장전 시간외, 장후 시간외, 시장가의 경우 1주당 가격을 공란으로 비우지 않음 "0"으로 입력 권고 |
| `ORD_DVSN` | 주문구분 | string | Y | 2 | 00 : 지정가   01 : 시장가   02 : 조건부지정가   03 : 최유리지정가   04 : 최우선지정가   05 : 장전 시간외   06 : 장후 시간외   07 : 시간외 단일가  등 |
| `CRDT_TYPE` | 신용유형 | string | Y | 2 | 21 : 자기융자신규   23 : 유통융자신규   26 : 유통대주상환   28 : 자기대주상환   25 : 자기융자상환   27 : 유통융자상환   22 : 유통대주신규   24 : 자기대주신규 |
| `CMA_EVLU_AMT_ICLD_YN` | CMA평가금액포함여부 | string | Y | 1 | Y/N |
| `OVRS_ICLD_YN` | 해외포함여부 | string | Y | 1 | Y/N |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 | 0 : 성공  0 이외의 값 : 실패 |
| `msg_cd` | 응답코드 | string | Y | 8 | 응답코드 |
| `msg1` | 응답메세지 | string | Y | 80 | 응답메시지 |
| `output` | 응답상세 | object | Y |  |  |
| `ord_psbl_cash` | 주문가능현금 | string | Y | 19 |  |
| `ord_psbl_sbst` | 주문가능대용 | string | Y | 19 |  |
| `ruse_psbl_amt` | 재사용가능금액 | string | Y | 19 |  |
| `fund_rpch_chgs` | 펀드환매대금 | string | Y | 19 |  |
| `psbl_qty_calc_unpr` | 가능수량계산단가 | string | Y | 19 |  |
| `nrcvb_buy_amt` | 미수없는매수금액 | string | Y | 19 |  |
| `nrcvb_buy_qty` | 미수없는매수수량 | string | Y | 10 |  |
| `max_buy_amt` | 최대매수금액 | string | Y | 19 |  |
| `max_buy_qty` | 최대매수수량 | string | Y | 10 |  |
| `cma_evlu_amt` | CMA평가금액 | string | Y | 19 |  |
| `ovrs_re_use_amt_wcrc` | 해외재사용금액원화 | string | Y | 19 |  |
| `ord_psbl_frcr_amt_wcrc` | 주문가능외화금액원화 | string | Y | 19 |  |

**Request Example:**
```
{  "CANO": "12345678",  "ACNT_PRDT_CD": "01",  "PDNO": "005930",  "ORD_UNPR" : "55000",  "ORD_DVSN": "01",  "CRDT_TYPE": "21",  "CMA_EVLU_AMT_ICLD_YN": "N",  "OVRS_ICLD_YN": "N"  }
```

**Response Example:**
```
{      "output": {          "ord_psbl_cash": "99965177664",          "ord_psbl_sbst": "156772560",          "ruse_psbl_amt": "0",          "fund_rpch_chgs": "0",          "psbl_qty_calc_unpr": "69200",          "nrcvb_buy_amt": "0",          "nrcvb_buy_qty": "0",          "max_buy_amt": "0",          "max_buy_qty": "0",          "cma_evlu_amt": "0",          "ovrs_re_use_amt_wcrc": "0",          "ord_psbl_frcr_amt_wcrc": "157998704172856"      },      "rt_cd": "0",      "msg_cd": "KIOK0510",      "msg1": "조회가 완료되었습니다                                                           "  }
```

---
### 6. 주식통합증거금 현황

| Field | Value |
|---|---|
| Sheet | `주식통합증거금 현황` |
| Menu | [국내주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/trading/intgr-margin` |
| TR_ID (실전) | `TTTC0869R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `CMA_EVLU_AMT_ICLD_YN` | CMA평가금액포함여부 | string | Y | 1 | N 입력 |
| `WCRC_FRCR_DVSN_CD` | 원화외화구분코드 | string | Y | 2 | 01(외화기준),02(원화기준) |
| `FWEX_CTRT_FRCR_DVSN_CD` | 선도환계약외화구분코드 | string | Y | 2 | 01(외화기준),02(원화기준) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object | Y |  |  |
| `acmga_rt` | 계좌증거금율 | string | Y | 114 |  |
| `acmga_pct100_aptm_rson` | 계좌증거금100퍼센트지정사유 | string | Y | 100 |  |
| `stck_cash_objt_amt` | 주식현금대상금액 | string | Y | 184 |  |
| `stck_sbst_objt_amt` | 주식대용대상금액 | string | Y | 184 |  |
| `stck_evlu_objt_amt` | 주식평가대상금액 | string | Y | 184 |  |
| `stck_ruse_psbl_objt_amt` | 주식재사용가능대상금액 | string | Y | 184 |  |
| `stck_fund_rpch_chgs_objt_amt` | 주식펀드환매대금대상금액 | string | Y | 184 |  |
| `stck_fncg_rdpt_objt_atm` | 주식융자상환금대상금액 | string | Y | 184 |  |
| `bond_ruse_psbl_objt_amt` | 채권재사용가능대상금액 | string | Y | 184 |  |
| `stck_cash_use_amt` | 주식현금사용금액 | string | Y | 184 |  |
| `stck_sbst_use_amt` | 주식대용사용금액 | string | Y | 184 |  |
| `stck_evlu_use_amt` | 주식평가사용금액 | string | Y | 184 |  |
| `stck_ruse_psbl_amt_use_amt` | 주식재사용가능금사용금액 | string | Y | 184 |  |
| `stck_fund_rpch_chgs_use_amt` | 주식펀드환매대금사용금액 | string | Y | 184 |  |
| `stck_fncg_rdpt_amt_use_amt` | 주식융자상환금사용금액 | string | Y | 184 |  |
| `bond_ruse_psbl_amt_use_amt` | 채권재사용가능금사용금액 | string | Y | 184 |  |
| `stck_cash_ord_psbl_amt` | 주식현금주문가능금액 | string | Y | 184 |  |
| `stck_sbst_ord_psbl_amt` | 주식대용주문가능금액 | string | Y | 184 |  |
| `stck_evlu_ord_psbl_amt` | 주식평가주문가능금액 | string | Y | 184 |  |
| `stck_ruse_psbl_ord_psbl_amt` | 주식재사용가능주문가능금액 | string | Y | 184 |  |
| `stck_fund_rpch_ord_psbl_amt` | 주식펀드환매주문가능금액 | string | Y | 184 |  |
| `bond_ruse_psbl_ord_psbl_amt` | 채권재사용가능주문가능금액 | string | Y | 184 |  |
| `rcvb_amt` | 미수금액 | string | Y | 19 |  |
| `stck_loan_grta_ruse_psbl_amt` | 주식대출보증금재사용가능금액 | string | Y | 184 |  |
| `stck_cash20_max_ord_psbl_amt` | 주식현금20최대주문가능금액 | string | Y | 184 |  |
| `stck_cash30_max_ord_psbl_amt` | 주식현금30최대주문가능금액 | string | Y | 184 |  |
| `stck_cash40_max_ord_psbl_amt` | 주식현금40최대주문가능금액 | string | Y | 184 |  |
| `stck_cash50_max_ord_psbl_amt` | 주식현금50최대주문가능금액 | string | Y | 184 |  |
| `stck_cash60_max_ord_psbl_amt` | 주식현금60최대주문가능금액 | string | Y | 184 |  |
| `stck_cash100_max_ord_psbl_amt` | 주식현금100최대주문가능금액 | string | Y | 184 |  |
| `stck_rsip100_max_ord_psbl_amt` | 주식재사용불가100최대주문가능 | string | Y | 184 |  |
| `bond_max_ord_psbl_amt` | 채권최대주문가능금액 | string | Y | 184 |  |
| `stck_fncg45_max_ord_psbl_amt` | 주식융자45최대주문가능금액 | string | Y | 182 |  |
| `stck_fncg50_max_ord_psbl_amt` | 주식융자50최대주문가능금액 | string | Y | 184 |  |
| `stck_fncg60_max_ord_psbl_amt` | 주식융자60최대주문가능금액 | string | Y | 184 |  |
| `stck_fncg70_max_ord_psbl_amt` | 주식융자70최대주문가능금액 | string | Y | 182 |  |
| `stck_stln_max_ord_psbl_amt` | 주식대주최대주문가능금액 | string | Y | 184 |  |
| `lmt_amt` | 한도금액 | string | Y | 19 |  |
| `ovrs_stck_itgr_mgna_dvsn_name` | 해외주식통합증거금구분명 | string | Y | 40 |  |
| `usd_objt_amt` | 미화대상금액 | string | Y | 182 |  |
| `usd_use_amt` | 미화사용금액 | string | Y | 182 |  |
| `usd_ord_psbl_amt` | 미화주문가능금액 | string | Y | 182 |  |
| `hkd_objt_amt` | 홍콩달러대상금액 | string | Y | 182 |  |
| `hkd_use_amt` | 홍콩달러사용금액 | string | Y | 182 |  |
| `hkd_ord_psbl_amt` | 홍콩달러주문가능금액 | string | Y | 182 |  |
| `jpy_objt_amt` | 엔화대상금액 | string | Y | 182 |  |
| `jpy_use_amt` | 엔화사용금액 | string | Y | 182 |  |
| `jpy_ord_psbl_amt` | 엔화주문가능금액 | string | Y | 182 |  |
| `cny_objt_amt` | 위안화대상금액 | string | Y | 182 |  |
| `cny_use_amt` | 위안화사용금액 | string | Y | 182 |  |
| `cny_ord_psbl_amt` | 위안화주문가능금액 | string | Y | 182 |  |
| `usd_ruse_objt_amt` | 미화재사용대상금액 | string | Y | 182 |  |
| `usd_ruse_amt` | 미화재사용금액 | string | Y | 182 |  |
| `usd_ruse_ord_psbl_amt` | 미화재사용주문가능금액 | string | Y | 182 |  |
| `hkd_ruse_objt_amt` | 홍콩달러재사용대상금액 | string | Y | 182 |  |
| `hkd_ruse_amt` | 홍콩달러재사용금액 | string | Y | 182 |  |
| `hkd_ruse_ord_psbl_amt` | 홍콩달러재사용주문가능금액 | string | Y | 172 |  |
| `jpy_ruse_objt_amt` | 엔화재사용대상금액 | string | Y | 182 |  |
| `jpy_ruse_amt` | 엔화재사용금액 | string | Y | 182 |  |
| `jpy_ruse_ord_psbl_amt` | 엔화재사용주문가능금액 | string | Y | 182 |  |
| `cny_ruse_objt_amt` | 위안화재사용대상금액 | string | Y | 182 |  |
| `cny_ruse_amt` | 위안화재사용금액 | string | Y | 182 |  |
| `cny_ruse_ord_psbl_amt` | 위안화재사용주문가능금액 | string | Y | 182 |  |
| `usd_gnrl_ord_psbl_amt` | 미화일반주문가능금액 | string | Y | 182 |  |
| `usd_itgr_ord_psbl_amt` | 미화통합주문가능금액 | string | Y | 182 |  |
| `hkd_gnrl_ord_psbl_amt` | 홍콩달러일반주문가능금액 | string | Y | 182 |  |
| `hkd_itgr_ord_psbl_amt` | 홍콩달러통합주문가능금액 | string | Y | 182 |  |
| `jpy_gnrl_ord_psbl_amt` | 엔화일반주문가능금액 | string | Y | 182 |  |
| `jpy_itgr_ord_psbl_amt` | 엔화통합주문가능금액 | string | Y | 182 |  |
| `cny_gnrl_ord_psbl_amt` | 위안화일반주문가능금액 | string | Y | 182 |  |
| `cny_itgr_ord_psbl_amt` | 위안화통합주문가능금액 | string | Y | 182 |  |
| `stck_itgr_cash20_ord_psbl_amt` | 주식통합현금20주문가능금액 | string | Y | 182 |  |
| `stck_itgr_cash30_ord_psbl_amt` | 주식통합현금30주문가능금액 | string | Y | 182 |  |
| `stck_itgr_cash40_ord_psbl_amt` | 주식통합현금40주문가능금액 | string | Y | 182 |  |
| `stck_itgr_cash50_ord_psbl_amt` | 주식통합현금50주문가능금액 | string | Y | 182 |  |
| `stck_itgr_cash60_ord_psbl_amt` | 주식통합현금60주문가능금액 | string | Y | 182 |  |
| `stck_itgr_cash100_ord_psbl_amt` | 주식통합현금100주문가능금액 | string | Y | 182 |  |
| `stck_itgr_100_ord_psbl_amt` | 주식통합100주문가능금액 | string | Y | 182 |  |
| `stck_itgr_fncg45_ord_psbl_amt` | 주식통합융자45주문가능금액 | string | Y | 182 |  |
| `stck_itgr_fncg50_ord_psbl_amt` | 주식통합융자50주문가능금액 | string | Y | 182 |  |
| `stck_itgr_fncg60_ord_psbl_amt` | 주식통합융자60주문가능금액 | string | Y | 182 |  |
| `stck_itgr_fncg70_ord_psbl_amt` | 주식통합융자70주문가능금액 | string | Y | 182 |  |
| `stck_itgr_stln_ord_psbl_amt` | 주식통합대주주문가능금액 | string | Y | 182 |  |
| `bond_itgr_ord_psbl_amt` | 채권통합주문가능금액 | string | Y | 182 |  |
| `stck_cash_ovrs_use_amt` | 주식현금해외사용금액 | string | Y | 182 |  |
| `stck_sbst_ovrs_use_amt` | 주식대용해외사용금액 | string | Y | 182 |  |
| `stck_evlu_ovrs_use_amt` | 주식평가해외사용금액 | string | Y | 182 |  |
| `stck_re_use_amt_ovrs_use_amt` | 주식재사용금액해외사용금액 | string | Y | 182 |  |
| `stck_fund_rpch_ovrs_use_amt` | 주식펀드환매해외사용금액 | string | Y | 182 |  |
| `stck_fncg_rdpt_ovrs_use_amt` | 주식융자상환해외사용금액 | string | Y | 182 |  |
| `bond_re_use_ovrs_use_amt` | 채권재사용해외사용금액 | string | Y | 182 |  |
| `usd_oth_mket_use_amt` | 미화타시장사용금액 | string | Y | 182 |  |
| `jpy_oth_mket_use_amt` | 엔화타시장사용금액 | string | Y | 182 |  |
| `cny_oth_mket_use_amt` | 위안화타시장사용금액 | string | Y | 182 |  |
| `hkd_oth_mket_use_amt` | 홍콩달러타시장사용금액 | string | Y | 182 |  |
| `usd_re_use_oth_mket_use_amt` | 미화재사용타시장사용금액 | string | Y | 182 |  |
| `jpy_re_use_oth_mket_use_amt` | 엔화재사용타시장사용금액 | string | Y | 182 |  |
| `cny_re_use_oth_mket_use_amt` | 위안화재사용타시장사용금액 | string | Y | 182 |  |
| `hkd_re_use_oth_mket_use_amt` | 홍콩달러재사용타시장사용금액 | string | Y | 182 |  |
| `hgkg_cny_re_use_amt` | 홍콩위안화재사용금액 | string | Y | 182 |  |
| `usd_frst_bltn_exrt` | 미국달러최초고시환율 | string | Y | 23 |  |
| `hkd_frst_bltn_exrt` | 홍콩달러최초고시환율 | string | Y | 23 |  |
| `jpy_frst_bltn_exrt` | 일본엔화최초고시환율 | string | Y | 23 |  |
| `cny_frst_bltn_exrt` | 중국위안화최초고시환율 | string | Y | 23 |  |

**Request Example:**
```
CANO:12345678  ACNT_PRDT_CD:01  CMA_EVLU_AMT_ICLD_YN:N  WCRC_FRCR_DVSN_CD:01  FWEX_CTRT_FRCR_DVSN_CD:01
```

**Response Example:**
```
{      "output": {          "acmga_rt": "100.0000",          "acmga_pct100_aptm_rson": "고객100%신청",          "stck_cash_objt_amt": "249855306.0000",          "stck_sbst_objt_amt": "137816.0000",          "stck_evlu_objt_amt": "176966.0000",          "stck_ruse_psbl_objt_amt": "261213.0000",          "stck_fund_rpch_chgs_objt_amt": "0.0000",          "stck_fncg_rdpt_objt_atm": "0.0000",          "bond_ruse_psbl_objt_amt": "1024.0000",          "stck_cash_use_amt": "240482730.0000",          "stck_sbst_use_amt": "20295.0000",          "stck_evlu_use_amt": "20295.0000",          "stck_ruse_psbl_amt_use_amt": "261213.0000",          "stck_fund_rpch_chgs_use_amt": "0.0000",          "stck_fncg_rdpt_amt_use_amt": "0.0000",          "bond_ruse_psbl_amt_use_amt": "1024.0000",          "stck_cash_ord_psbl_amt": "9372576.0000",          "stck_sbst_ord_psbl_amt": "117521.0000",          "stck_evlu_ord_psbl_amt": "156671.0000",          "stck_ruse_psbl_ord_psbl_amt": "0.0000",          "stck_fund_rpch_ord_psbl_amt": "0.0000",          "bond_ruse_psbl_ord_psbl_amt": "0.0000",          "rcvb_amt": "0",          "stck_loan_grta_ruse_psbl_amt": "0.0000",          "stck_cash20_max_ord_psbl_amt": "8128560.1990",          "stck_cash30_max_ord_psbl_amt": "8128560.1990",          "stck_cash40_max_ord_psbl_amt": "8128560.1990",          "stck_cash50_max_ord_psbl_amt": "8128560.1990",          "stck_cash60_max_ord_psbl_amt": "8128560.1990",          "stck_cash100_max_ord_psbl_amt": "8128560.1990",          "stck_rsip100_max_ord_psbl_amt": "8128560.1990",          "bond_max_ord_psbl_amt": "9316675.9443",          "stck_fncg45_max_ord_psbl_amt": "20942905.49",          "stck_fncg50_max_ord_psbl_amt": "18869350.4950",          "stck_fncg60_max_ord_psbl_amt": "15750449.5868",          "stck_fncg70_max_ord_psbl_amt": "13516343.26",          "stck_stln_max_ord_psbl_amt": "9307424.0318",          "lmt_amt": "0",          "ovrs_stck_itgr_mgna_dvsn_name": "",          "usd_objt_amt": "0.00",          "usd_use_amt": "0.00",          "usd_ord_psbl_amt": "0.00",          "hkd_objt_amt": "0.00",          "hkd_use_amt": "0.00",          "hkd_ord_psbl_amt": "0.00",          "jpy_objt_amt": "0.00",          "jpy_use_amt": "0.00",          "jpy_ord_psbl_amt": "0.00",          "cny_objt_amt": "0.00",          "cny_use_amt": "0.00",          "cny_ord_psbl_amt": "0.00",          "usd_ruse_objt_amt": "0.00",          "usd_ruse_amt": "0.00",          "usd_ruse_ord_psbl_amt": "0.00",          "hkd_ruse_objt_amt": "0.00",          "hkd_ruse_amt": "0.00",          "hkd_ruse_ord_psbl_amt": "0.00",          "jpy_ruse_objt_amt": "0.00",          "jpy_ruse_amt": "0.00",          "jpy_ruse_ord_psbl_amt": "0.00",          "cny_ruse_objt_amt": "0.00",          "cny_ruse_amt": "0.00",          "cny_ruse_ord_psbl_amt": "0.00",          "usd_gnrl_ord_psbl_amt": "0.00",          "usd_itgr_ord_psbl_amt": "0.00",          "hkd_gnrl_ord_psbl_amt": "0.00",          "hkd_itgr_ord_psbl_amt": "0.00",          "j
```

---
### 7. 퇴직연금 미체결내역

| Field | Value |
|---|---|
| Sheet | `퇴직연금 미체결내역` |
| Menu | [국내주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/trading/pension/inquire-daily-ccld` |
| TR_ID (실전) | `TTTC2201R(기존 KRX만 가능), TTTC2210R (KRX,NXT/SOR)` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 |  |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 29 |
| `USER_DVSN_CD` | 사용자구분코드 | string | Y | 2 | %% |
| `SLL_BUY_DVSN_CD` | 매도매수구분코드 | string | Y | 2 | 00 : 전체 / 01 : 매도 / 02 : 매수 |
| `CCLD_NCCS_DVSN` | 체결미체결구분 | string | Y | 2 | %% : 전체 / 01 : 체결 / 02 : 미체결 |
| `INQR_DVSN_3` | 조회구분3 | string | Y | 2 | 00 : 전체 |
| `CTX_AREA_FK100` | 연속조회검색조건100 | string | Y | 100 |  |
| `CTX_AREA_NK100` | 연속조회키100 | string | Y | 100 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세1 | object array | Y |  | Array |
| `ord_gno_brno` | 주문채번지점번호 | string | Y | 5 |  |
| `sll_buy_dvsn_cd` | 매도매수구분코드 | string | Y | 2 |  |
| `trad_dvsn_name` | 매매구분명 | string | Y | 60 |  |
| `odno` | 주문번호 | string | Y | 10 |  |
| `pdno` | 상품번호 | string | Y | 12 |  |
| `prdt_name` | 상품명 | string | Y | 60 |  |
| `ord_unpr` | 주문단가 | string | Y | 19 |  |
| `ord_qty` | 주문수량 | string | Y | 10 |  |
| `tot_ccld_qty` | 총체결수량 | string | Y | 10 |  |
| `nccs_qty` | 미체결수량 | string | Y | 10 |  |
| `ord_dvsn_cd` | 주문구분코드 | string | Y | 2 |  |
| `ord_dvsn_name` | 주문구분명 | string | Y | 60 |  |
| `orgn_odno` | 원주문번호 | string | Y | 10 |  |
| `ord_tmd` | 주문시각 | string | Y | 6 |  |
| `objt_cust_dvsn_name` | 대상고객구분명 | string | Y | 10 |  |
| `pchs_avg_pric` | 매입평균가격 | string | Y | 184 |  |
| `stpm_cndt_pric` | 스톱지정가조건가격 | string | Y | 9 | 신규 API용 필드 |
| `stpm_efct_occr_dtmd` | 스톱지정가효력발생상세시각 | string | Y | 9 | 신규 API용 필드 |
| `stpm_efct_occr_yn` | 스톱지정가효력발생여부 | string | Y | 1 | 신규 API용 필드 |
| `excg_id_dvsn_cd` | 거래소ID구분코드 | string | Y | 3 | 신규 API용 필드 |

**Request Example:**
```
{  	"CANO":"63512345",  	"ACNT_PRDT_CD":"29",  	"USER_DVSN_CD":"%%",  	"SLL_BUY_DVSN_CD":"00",  	"CCLD_NCCS_DVSN":"%%",  	"INQR_DVSN_3":"00",  	"CTX_AREA_FK100":"",  	"CTX_AREA_NK100":""  }
```

**Response Example:**
```
{      "ctx_area_fk100": "63512345^29^%%^00^%%^00^                                                                            ",      "ctx_area_nk100": "^^                                                                                                  ",      "output": [],      "rt_cd": "0",      "msg_cd": "KIOK0490",      "msg1": "조회가 계속됩니다                                                               "  }
```

---
### 8. 기간별매매손익현황조회

| Field | Value |
|---|---|
| Sheet | `기간별매매손익현황조회` |
| Menu | [국내주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/trading/inquire-period-trade-profit` |
| TR_ID (실전) | `TTTC8715R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 |  |
| `SORT_DVSN` | 정렬구분 | string | Y | 2 | 00: 최근 순, 01: 과거 순, 02: 최근 순 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 |  |
| `PDNO` | 상품번호 | string | Y | 12 | ""공란입력 시, 전체 |
| `INQR_STRT_DT` | 조회시작일자 | string | Y | 8 |  |
| `INQR_END_DT` | 조회종료일자 | string | Y | 8 |  |
| `CTX_AREA_NK100` | 연속조회키100 | string | Y | 100 |  |
| `CBLC_DVSN` | 잔고구분 | string | Y | 2 | 00: 전체 |
| `CTX_AREA_FK100` | 연속조회검색조건100 | string | Y | 100 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `ctx_area_nk100` | 연속조회키100 | string | Y | 100 |  |
| `ctx_area_fk100` | 연속조회검색조건100 | string | Y | 100 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `trad_dt` | 매매일자 | string | Y | 8 |  |
| `pdno` | 상품번호 | string | Y | 12 | 종목번호(뒤 6자리만 해당) |
| `prdt_name` | 상품명 | string | Y | 60 |  |
| `trad_dvsn_name` | 매매구분명 | string | Y | 60 |  |
| `loan_dt` | 대출일자 | string | Y | 8 |  |
| `hldg_qty` | 보유수량 | string | Y | 19 |  |
| `pchs_unpr` | 매입단가 | string | Y | 19 |  |
| `buy_qty` | 매수수량 | string | Y | 10 |  |
| `buy_amt` | 매수금액 | string | Y | 19 |  |
| `sll_pric` | 매도가격 | string | Y | 10 |  |
| `sll_qty` | 매도수량 | string | Y | 10 |  |
| `sll_amt` | 매도금액 | string | Y | 19 |  |
| `rlzt_pfls` | 실현손익 | string | Y | 19 |  |
| `pfls_rt` | 손익률 | string | Y | 238 |  |
| `fee` | 수수료 | string | Y | 19 |  |
| `tl_tax` | 제세금 | string | Y | 19 |  |
| `loan_int` | 대출이자 | string | Y | 19 |  |
| `output2` | 응답상세2 | object | Y |  |  |
| `sll_qty_smtl` | 매도수량합계 | string | Y | 19 |  |
| `sll_tr_amt_smtl` | 매도거래금액합계 | string | Y | 19 |  |
| `sll_fee_smtl` | 매도수수료합계 | string | Y | 19 |  |
| `sll_tltx_smtl` | 매도제세금합계 | string | Y | 19 |  |
| `sll_excc_amt_smtl` | 매도정산금액합계 | string | Y | 19 |  |
| `buyqty_smtl` | 매수수량합계 | string | Y | 8 |  |
| `buy_tr_amt_smtl` | 매수거래금액합계 | string | Y | 19 |  |
| `buy_fee_smtl` | 매수수수료합계 | string | Y | 19 |  |
| `buy_tax_smtl` | 매수제세금합계 | string | Y | 19 |  |
| `buy_excc_amt_smtl` | 매수정산금액합계 | string | Y | 19 |  |
| `tot_qty` | 총수량 | string | Y | 10 |  |
| `tot_tr_amt` | 총거래금액 | string | Y | 19 |  |
| `tot_fee` | 총수수료 | string | Y | 19 |  |
| `tot_tltx` | 총제세금 | string | Y | 19 |  |
| `tot_excc_amt` | 총정산금액 | string | Y | 19 |  |
| `tot_rlzt_pfls` | 총실현손익 | string | Y | 19 |  |
| `loan_int` | 대출이자 | string | Y | 19 |  |
| `tot_pftrt` | 총수익률 | string | Y | 238 |  |

**Request Example:**
```
{  "CANO":"12345678",  "ACNT_PRDT_CD":"01",  "PDNO":"",  "INQR_STRT_DT":"20240216",  "INQR_END_DT":"20240216",  "SORT_DVSN":"02",  "CBLC_DVSN":"00",  "CTX_AREA_FK100":""  "CTX_AREA_FK100":""  }
```

**Response Example:**
```
{      "ctx_area_fk100": "                                                                                                    ",      "ctx_area_nk100": "20240216^00000A000120^300^0^00000000^                                                               ",      "output1": [          {              "trad_dt": "20240216",              "pdno": "000J2552221D",              "prdt_name": "SG 17WR",              "trad_dvsn_name": "현금",              "loan_dt": "",              "hldg_qty": "2",              "pchs_unpr": "135",              "buy_qty": "2",              "buy_amt": "271",              "sll_pric": "0",              "sll_qty": "0",              "sll_amt": "0",              "rlzt_pfls": "0",              "pfls_rt": "0.00000000",              "fee": "0",              "tl_tax": "0",              "loan_int": "0"          },          {              "trad_dt": "20240216",              "pdno": "000J00532219",              "prdt_name": "국동 9WR",              "trad_dvsn_name": "현금",              "loan_dt": "",              "hldg_qty": "10",              "pchs_unpr": "130",              "buy_qty": "10",              "buy_amt": "1300",              "sll_pric": "0",              "sll_qty": "0",              "sll_amt": "0",              "rlzt_pfls": "0",              "pfls_rt": "0.00000000",              "fee": "0",              "tl_tax": "0",              "loan_int": "0"          },          {              "trad_dt": "20240216",              "pdno": "00000Q520057",              "prdt_name": "미래에셋 인버스 2X 코스닥150 선물 ETN",              "trad_dvsn_name": "현금",              "loan_dt": "",              "hldg_qty": "1",              "pchs_unpr": "9365",              "buy_qty": "1",              "buy_amt": "9365",              "sll_pric": "0",              "sll_qty": "0",              "sll_amt": "0",              "rlzt_pfls": "0",              "pfls_rt": "0.00000000",              "fee": "0",              "tl_tax": "0",              "loan_int": "0"          },          {              "trad_dt": "20240216",              "pdno": "00000A900270",              "prdt_name": "헝셩그룹",              "trad_dvsn_name": "현금",              "loan_dt": "",              "hldg_qty": "66",              "pchs_unpr": "322",              "buy_qty": "66",              "buy_amt": "21252",              "sll_pric": "0",              "sll_qty": "0",              "sll_amt": "0",              "rlzt_pfls": "0",              "pfls_rt": "0.00000000",              "fee": "0",              "tl_tax": "0",              "loan_int": "0"          },          {              "trad_dt": "20240216",              "pdno": "00000A402340",              "prdt_name": "SK스퀘어",              "trad_dvsn_name": "현금",              "loan_dt": "",              "hldg_qty": "10",              "pchs_unpr": "59000",              "buy_qty": "10",              "buy_amt": "590000",              "sll_pric": "0",              "sll_qty": "0",              "sll_amt": "0",              "rlzt_pfls": "0",              "pfls_rt": "0.000
```

---
### 9. 주식주문(정정취소)

| Field | Value |
|---|---|
| Sheet | `주식주문(정정취소)` |
| Menu | [국내주식] 주문/계좌 |
| Method | `POST` |
| URL | `/uapi/domestic-stock/v1/trading/order-rvsecncl` |
| TR_ID (실전) | `TTTC0013U` |
| TR_ID (모의) | `VTTC0013U` |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 종합계좌번호 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 상품유형코드 |
| `KRX_FWDG_ORD_ORGNO` | 한국거래소전송주문조직번호 | string | Y | 5 |  |
| `ORGN_ODNO` | 원주문번호 | string | Y | 10 | 원주문번호 |
| `ORD_DVSN` | 주문구분 | string | Y | 2 | [KRX]  00 : 지정가  01 : 시장가  02 : 조건부지정가  03 : 최유리지정가  04 : 최우선지정가  05 : 장전 시간외  06 : 장후 시간외  07 : 시간외 단일가  11 : IOC지정가 (즉시체결,잔량취소)  12 : FOK지정가 (즉시체결,전량취소)  13 : IOC시장가 (즉시체결,잔량취소)  14 : FOK시장가 (즉시체결,전량취소)  15 : IOC최유리 (즉시체결,잔량취소)  16 : FOK최유리 (즉시체결,전량취소)  21 : 중간가  22 : 스톱지정가  23 : 중간가IOC  24 : 중간가FOK    [NXT]  00 : 지정가  03 : 최유리지정가  04 : 최우선지정가  11 : IOC지정가 (즉시체결,잔량취소)  12 : FOK지정가 (즉시체결,전량취소)  13 : IOC시장가 (즉시체결,잔량취소)  14 : FOK시장가 (즉시체결,전량취소)  15 : IOC최유리 (즉시체결,잔량취소)  16 : FOK최유리 (즉시체결,전량취소)  21 : 중간가  22 : 스톱지정가  23 : 중간가IOC  24 : 중간가FOK    [SOR]  00 : 지정가  01 : 시장가  03 : 최유리지정가  04 : 최우선지정가  11 : IOC지정가 (즉시체결,잔량취소)  12 : FOK지정가 (즉시체결,전량취소)  13 : IOC시장가 (즉시체결,잔량취소)  14 : FOK시장가 (즉시체결,전량취소)  15 : IOC최유리 (즉시체결,잔량취소)  16 : FOK최유리 (즉시체결,전량취소) |
| `RVSE_CNCL_DVSN_CD` | 정정취소구분코드 | string | Y | 2 | 01@정정  02@취소 |
| `ORD_QTY` | 주문수량 | string | Y | 10 | 주문수량 |
| `ORD_UNPR` | 주문단가 | string | Y | 19 | 주문단가 |
| `QTY_ALL_ORD_YN` | 잔량전부주문여부 | string | Y | 1 | 'Y@전량  N@일부' |
| `CNDT_PRIC` | 조건가격 | string | N | 19 | 스탑지정가호가에서 사용 |
| `EXCG_ID_DVSN_CD` | 거래소ID구분코드 | string | N | 3 | 한국거래소 : KRX  대체거래소 (넥스트레이드) : NXT  SOR (Smart Order Routing) : SOR  → 미입력시 KRX로 진행되며, 모의투자는 KRX만 가능 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | single |
| `krx_fwdg_ord_orgno` | 한국거래소전송주문조직번호 | string | Y | 5 |  |
| `odno` | 주문번호 | string | Y | 10 |  |
| `ord_tmd` | 주문시각 | string | Y | 6 |  |

**Request Example:**
```
{  "CANO": "810XXXXX",  "ACNT_PRDT_CD": "01",  "KRX_FWDG_ORD_ORGNO": "",  "ORGN_ODNO": "0001566017",  "ORD_DVSN": "00",  "RVSE_CNCL_DVSN_CD": "01",  "ORD_QTY": "1",  "ORD_UNPR": "180000",  "QTY_ALL_ORD_YN": "N"  }
```

**Response Example:**
```
{    "rt_cd": "0",    "msg_cd": "APBK0013",    "msg1": "주문 전송 완료 되었습니다.",    "output": {      "KRX_FWDG_ORD_ORGNO": "06010",      "ODNO": "0001569139",      "ORD_TMD": "131438"    }  }
```

---
### 10. 주식예약주문조회

| Field | Value |
|---|---|
| Sheet | `주식예약주문조회` |
| Menu | [국내주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/trading/order-resv-ccnl` |
| TR_ID (실전) | `CTSC0004R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `RSVN_ORD_ORD_DT` | 예약주문시작일자 | string | Y | 8 |  |
| `RSVN_ORD_END_DT` | 예약주문종료일자 | string | Y | 8 |  |
| `RSVN_ORD_SEQ` | 예약주문순번 | string | Y | 10 |  |
| `TMNL_MDIA_KIND_CD` | 단말매체종류코드 | string | Y | 2 | "00" 입력 |
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `PRCS_DVSN_CD` | 처리구분코드 | string | Y | 2 | 0: 전체  1: 처리내역  2: 미처리내역 |
| `CNCL_YN` | 취소여부 | string | Y | 1 | "Y" 유효한 주문만 조회 |
| `PDNO` | 상품번호 | string | Y | 12 | 종목코드(6자리) (공백 입력 시 전체 조회) |
| `SLL_BUY_DVSN_CD` | 매도매수구분코드 | string | Y | 2 |  |
| `CTX_AREA_FK200` | 연속조회검색조건200 | string | Y | 200 | 다음 페이지 조회시 사용 |
| `CTX_AREA_NK200` | 연속조회키200 | string | Y | 200 | 다음 페이지 조회시 사용 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 | 0 : 성공   0 이외의 값 : 실패 |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | array | Y |  |  |
| `rsvn_ord_seq` | 예약주문 순번 | string | N | 10 |  |
| `rsvn_ord_ord_dt` | 예약주문주문일자 | string | N | 8 |  |
| `rsvn_ord_rcit_dt` | 예약주문접수일자 | string | N | 8 |  |
| `pdno` | 상품번호 | string | N | 12 |  |
| `ord_dvsn_cd` | 주문구분코드 | string | N | 2 |  |
| `ord_rsvn_qty` | 주문예약수량 | string | N | 10 |  |
| `tot_ccld_qty` | 총체결수량 | string | N | 10 |  |
| `cncl_ord_dt` | 취소주문일자 | string | N | 8 |  |
| `ord_tmd` | 주문시각 | string | N | 6 |  |
| `ctac_tlno` | 연락전화번호 | string | N | 20 |  |
| `rjct_rson2` | 거부사유2 | string | N | 200 |  |
| `odno` | 주문번호 | string | N | 10 |  |
| `rsvn_ord_rcit_tmd` | 예약주문접수시각 | string | N | 6 |  |
| `kor_item_shtn_name` | 한글종목단축명 | string | N | 60 |  |
| `sll_buy_dvsn_cd` | 매도매수구분코드 | string | N | 2 |  |
| `ord_rsvn_unpr` | 주문예약단가 | string | N | 19 |  |
| `tot_ccld_amt` | 총체결금액 | string | N | 19 |  |
| `loan_dt` | 대출일자 | string | N | 8 |  |
| `cncl_rcit_tmd` | 취소접수시각 | string | N | 6 |  |
| `prcs_rslt` | 처리결과 | string | N | 60 |  |
| `ord_dvsn_name` | 주문구분명 | string | N | 60 |  |
| `tmnl_mdia_kind_cd` | 단말매체종류코드 | string | N | 2 |  |
| `rsvn_end_dt` | 예약종료일자 | string | N | 8 |  |

**Request Example:**
```
{  	"RSVN_ORD_ORD_DT":"20220520",  	"RSVN_ORD_END_DT":"20220523",  	"RSVN_ORD_SEQ":"",  	"TMNL_MDIA_KIND_CD":"00",  	"CANO":"81019970",  	"ACNT_PRDT_CD":"01",  	  	"PRCS_DVSN_CD":"0",  	"CNCL_YN":"Y",  	"PDNO":"",  	"SLL_BUY_DVSN_CD":"",  	"CTX_AREA_FK200":"",  	"CTX_AREA_NK200":""  }
```

**Response Example:**
```
{      "ctx_area_fk200": "20220520!^null!^0!^Y!^!^                                                                                                                                                                                ",      "ctx_area_nk200": " !^ !^                                                                                                                                                                                                  ",      "output": [          {              "rsvn_ord_seq": "42401",              "rsvn_ord_ord_dt": "20220523",              "rsvn_ord_rcit_dt": "20220520",              "pdno": "005940",              "ord_dvsn_cd": "01",              "ord_rsvn_qty": "1",              "tot_ccld_qty": "0",              "cncl_ord_dt": "",              "ord_tmd": "",              "ctac_tlno": "0",              "rjct_rson2": "",              "odno": "",              "rsvn_ord_rcit_tmd": "165318",              "kor_item_shtn_name": "NH투자증권",              "sll_buy_dvsn_cd": "02",              "ord_rsvn_unpr": "6000",              "tot_ccld_amt": "0",              "loan_dt": "",              "cncl_rcit_tmd": "",              "prcs_rslt": "미처리",              "ord_dvsn_name": "현금매수",              "tmnl_mdia_kind_cd": "31",              "rsvn_end_dt": "20220523"          },          {              "rsvn_ord_seq": "42405",              "rsvn_ord_ord_dt": "20220523",              "rsvn_ord_rcit_dt": "20220520",              "pdno": "005940",              "ord_dvsn_cd": "01",              "ord_rsvn_qty": "1",              "tot_ccld_qty": "0",              "cncl_ord_dt": "",              "ord_tmd": "",              "ctac_tlno": "0",              "rjct_rson2": "",              "odno": "",              "rsvn_ord_rcit_tmd": "170422",              "kor_item_shtn_name": "NH투자증권",              "sll_buy_dvsn_cd": "02",              "ord_rsvn_unpr": "6000",              "tot_ccld_amt": "0",              "loan_dt": "",              "cncl_rcit_tmd": "",              "prcs_rslt": "미처리",              "ord_dvsn_name": "현금매수",              "tmnl_mdia_kind_cd": "31",              "rsvn_end_dt": ""          },          {              "rsvn_ord_seq": "42406",              "rsvn_ord_ord_dt": "20220523",              "rsvn_ord_rcit_dt": "20220520",              "pdno": "005940",              "ord_dvsn_cd": "01",              "ord_rsvn_qty": "1",              "tot_ccld_qty": "0",              "cncl_ord_dt": "",              "ord_tmd": "",              "ctac_tlno": "0",              "rjct_rson2": "",              "odno": "",              "rsvn_ord_rcit_tmd": "170453",              "kor_item_shtn_name": "NH투자증권",              "sll_buy_dvsn_cd": "02",              "ord_rsvn_unpr": "6000",              "tot_ccld_amt": "0",              "loan_dt": "",              "cncl_rcit_tmd": "",              "prcs_rslt": "미처리",              "ord_dvsn_name": "현금매수",              "tmnl_mdia_kind_cd": "31",              "rsvn_end_dt": "20220523"          }      ],      
```

---
### 11. 퇴직연금 매수가능조회

| Field | Value |
|---|---|
| Sheet | `퇴직연금 매수가능조회` |
| Menu | [국내주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/trading/pension/inquire-psbl-order` |
| TR_ID (실전) | `TTTC0503R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 |  |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 29 |
| `PDNO` | 상품번호 | string | Y | 12 |  |
| `ACCA_DVSN_CD` | 적립금구분코드 | string | Y | 2 | 00 |
| `CMA_EVLU_AMT_ICLD_YN` | CMA평가금액포함여부 | string | Y | 1 |  |
| `ORD_DVSN` | 주문구분 | string | Y | 2 | 00 : 지정가 / 01 : 시장가 |
| `ORD_UNPR` | 주문단가 | string | Y | 19 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세1 | object | Y |  |  |
| `ord_psbl_cash` | 주문가능현금 | string | Y | 19 |  |
| `ruse_psbl_amt` | 재사용가능금액 | string | Y | 19 |  |
| `psbl_qty_calc_unpr` | 가능수량계산단가 | string | Y | 19 |  |
| `max_buy_amt` | 최대매수금액 | string | Y | 19 |  |
| `max_buy_qty` | 최대매수수량 | string | Y | 10 |  |

**Request Example:**
```
{  	"CANO":"63512345",  	"ACNT_PRDT_CD":"29",  	"PDNO":"029513",  	"ORD_UNPR":"55000",  	"ORD_DVSN":"00",  	"CMA_EVLU_AMT_ICLD_YN":"N",  	"ACCA_DVSN_CD":"00"  }
```

**Response Example:**
```
{      "output": {          "ord_psbl_cash": "11054042",          "ruse_psbl_amt": "0",          "psbl_qty_calc_unpr": "55000",          "max_buy_amt": "11054042",          "max_buy_qty": "200"      },      "rt_cd": "0",      "msg_cd": "KIOK0510",      "msg1": "조회가 완료되었습니다                                                           "  }
```

---
### 12. 주식잔고조회

| Field | Value |
|---|---|
| Sheet | `주식잔고조회` |
| Menu | [국내주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/trading/inquire-balance` |
| TR_ID (실전) | `TTTC8434R` |
| TR_ID (모의) | `VTTC8434R` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `AFHR_FLPR_YN` | 시간외단일가, 거래소여부 | string | Y | 1 | N : 기본값,  Y : 시간외단일가,  X : NXT 정규장 (프리마켓, 메인, 애프터마켓)  ※ NXT 선택 시 : NXT 거래종목만 시세 등 정보가 NXT 기준으로 변동됩니다. KRX 종목들은 그대로 유지 |
| `OFL_YN` | 오프라인여부 | string | N | 1 | 공란(Default) |
| `INQR_DVSN` | 조회구분 | string | Y | 2 | 01 : 대출일별 |
| `UNPR_DVSN` | 단가구분 | string | Y | 2 | 01 : 기본값 |
| `FUND_STTL_ICLD_YN` | 펀드결제분포함여부 | string | Y | 1 | N : 포함하지 않음  Y :  포함 |
| `FNCG_AMT_AUTO_RDPT_YN` | 융자금액자동상환여부 | string | Y | 1 | N : 기본값 |
| `PRCS_DVSN` | 처리구분 | string | Y | 2 | 00 :  전일매매포함  01 : 전일매매미포함 |
| `CTX_AREA_FK100` | 연속조회검색조건100 | string | N | 100 | 공란 : 최초 조회시  이전 조회 Output CTX_AREA_FK100 값 : 다음페이지 조회시(2번째부터) |
| `CTX_AREA_NK100` | 연속조회키100 | string | N | 100 | 공란 : 최초 조회시  이전 조회 Output CTX_AREA_NK100 값 : 다음페이지 조회시(2번째부터) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 | 0 : 성공  0 이외의 값 : 실패 |
| `msg_cd` | 응답코드 | string | Y | 8 | 응답코드 |
| `msg1` | 응답메세지 | string | Y | 80 | 응답메세지 |
| `ctx_area_fk100` | 연속조회검색조건100 | string | Y | 100 |  |
| `ctx_area_nk100` | 연속조회키100 | string | Y | 100 |  |
| `output1` | 응답상세1 | object array | Y |  | Array |
| `pdno` | 상품번호 | string | Y | 12 | 종목번호(뒷 6자리) |
| `prdt_name` | 상품명 | string | Y | 60 | 종목명 |
| `trad_dvsn_name` | 매매구분명 | string | Y | 60 | 매수매도구분 |
| `bfdy_buy_qty` | 전일매수수량 | string | Y | 10 |  |
| `bfdy_sll_qty` | 전일매도수량 | string | Y | 10 |  |
| `thdt_buyqty` | 금일매수수량 | string | Y | 10 |  |
| `thdt_sll_qty` | 금일매도수량 | string | Y | 10 |  |
| `hldg_qty` | 보유수량 | string | Y | 19 |  |
| `ord_psbl_qty` | 주문가능수량 | string | Y | 10 |  |
| `pchs_avg_pric` | 매입평균가격 | string | Y | 22 | 매입금액 / 보유수량 |
| `pchs_amt` | 매입금액 | string | Y | 19 |  |
| `prpr` | 현재가 | string | Y | 19 |  |
| `evlu_amt` | 평가금액 | string | Y | 19 |  |
| `evlu_pfls_amt` | 평가손익금액 | string | Y | 19 | 평가금액 - 매입금액 |
| `evlu_pfls_rt` | 평가손익율 | string | Y | 9 |  |
| `evlu_erng_rt` | 평가수익율 | string | Y | 31 | 미사용항목(0으로 출력) |
| `loan_dt` | 대출일자 | string | Y | 8 | INQR_DVSN(조회구분)을 01(대출일별)로 설정해야 값이 나옴 |
| `loan_amt` | 대출금액 | string | Y | 19 |  |
| `stln_slng_chgs` | 대주매각대금 | string | Y | 19 |  |
| `expd_dt` | 만기일자 | string | Y | 8 |  |
| `fltt_rt` | 등락율 | string | Y | 31 |  |
| `bfdy_cprs_icdc` | 전일대비증감 | string | Y | 19 |  |
| `item_mgna_rt_name` | 종목증거금율명 | string | Y | 20 |  |
| `grta_rt_name` | 보증금율명 | string | Y | 20 |  |
| `sbst_pric` | 대용가격 | string | Y | 19 | 증권매매의 위탁보증금으로서 현금 대신에 사용되는 유가증권 가격 |
| `stck_loan_unpr` | 주식대출단가 | string | Y | 22 |  |
| `output2` | 응답상세2 | object array | Y |  | Array |
| `dnca_tot_amt` | 예수금총금액 | string | Y | 19 | 예수금 |
| `nxdy_excc_amt` | 익일정산금액 | string | Y | 19 | D+1 예수금 |
| `prvs_rcdl_excc_amt` | 가수도정산금액 | string | Y | 19 | D+2 예수금 |
| `cma_evlu_amt` | CMA평가금액 | string | Y | 19 |  |
| `bfdy_buy_amt` | 전일매수금액 | string | Y | 19 |  |
| `thdt_buy_amt` | 금일매수금액 | string | Y | 19 |  |
| `nxdy_auto_rdpt_amt` | 익일자동상환금액 | string | Y | 19 |  |
| `bfdy_sll_amt` | 전일매도금액 | string | Y | 19 |  |
| `thdt_sll_amt` | 금일매도금액 | string | Y | 19 |  |
| `d2_auto_rdpt_amt` | D+2자동상환금액 | string | Y | 19 |  |
| `bfdy_tlex_amt` | 전일제비용금액 | string | Y | 19 |  |
| `thdt_tlex_amt` | 금일제비용금액 | string | Y | 19 |  |
| `tot_loan_amt` | 총대출금액 | string | Y | 19 |  |
| `scts_evlu_amt` | 유가평가금액 | string | Y | 19 |  |
| `tot_evlu_amt` | 총평가금액 | string | Y | 19 | 유가증권 평가금액 합계금액 + D+2 예수금 |
| `nass_amt` | 순자산금액 | string | Y | 19 |  |
| `fncg_gld_auto_rdpt_yn` | 융자금자동상환여부 | string | Y | 1 | 보유현금에 대한 융자금만 차감여부  신용융자 매수체결 시점에서는 융자비율을 매매대금 100%로 계산 하였다가 수도결제일에 보증금에 해당하는 금액을 고객의 현금으로 충당하여 융자금을 감소시키는 업무 |
| `pchs_amt_smtl_amt` | 매입금액합계금액 | string | Y | 19 |  |
| `evlu_amt_smtl_amt` | 평가금액합계금액 | string | Y | 19 | 유가증권 평가금액 합계금액 |
| `evlu_pfls_smtl_amt` | 평가손익합계금액 | string | Y | 19 |  |
| `tot_stln_slng_chgs` | 총대주매각대금 | string | Y | 19 |  |
| `bfdy_tot_asst_evlu_amt` | 전일총자산평가금액 | string | Y | 19 |  |
| `asst_icdc_amt` | 자산증감액 | string | Y | 19 |  |
| `asst_icdc_erng_rt` | 자산증감수익율 | string | Y | 31 | 데이터 미제공 |

**Request Example:**
```
{  	"CANO": "810XXXXX",  	"ACNT_PRDT_CD": "01",  	"AFHR_FLPR_YN": "N",  	"OFL_YN": "",  	"INQR_DVSN": "01",  	"UNPR_DVSN": "01",  	"FUND_STTL_ICLD_YN": "N",  	"FNCG_AMT_AUTO_RDPT_YN": "N",  	"PRCS_DVSN": "01",  	"CTX_AREA_FK100": "",  	"CTX_AREA_NK100": ""  }
```

**Response Example:**
```
{    "ctx_area_fk100": "81055689^01^N^N^01^01^N^                                                                            ",    "ctx_area_nk100": "                                                                                                    ",    "output1": [      {        "pdno": "009150",        "prdt_name": "삼성전기",        "trad_dvsn_name": "현금",        "bfdy_buy_qty": "12",        "bfdy_sll_qty": "0",        "thdt_buyqty": "1686",        "thdt_sll_qty": "41",        "hldg_qty": "1657",        "ord_psbl_qty": "1611",        "pchs_avg_pric": "135440.2517",        "pchs_amt": "224424497",        "prpr": "0",        "evlu_amt": "0",        "evlu_pfls_amt": "0",        "evlu_pfls_rt": "0.00",        "evlu_erng_rt": "0.00000000",        "loan_dt": "",        "loan_amt": "0",        "stln_slng_chgs": "0",        "expd_dt": "",        "fltt_rt": "-100.00000000",        "bfdy_cprs_icdc": "-184500",        "item_mgna_rt_name": "",        "grta_rt_name": "",        "sbst_pric": "140220",        "stck_loan_unpr": "0.0000"      },      {        "pdno": "009150",        "prdt_name": "삼성전기",        "trad_dvsn_name": "자기융자",        "bfdy_buy_qty": "3",        "bfdy_sll_qty": "0",        "thdt_buyqty": "0",        "thdt_sll_qty": "0",        "hldg_qty": "3",        "ord_psbl_qty": "3",        "pchs_avg_pric": "123000.0000",        "pchs_amt": "369000",        "prpr": "0",        "evlu_amt": "0",        "evlu_pfls_amt": "0",        "evlu_pfls_rt": "0.00",        "evlu_erng_rt": "0.00000000",        "loan_dt": "20211223",        "loan_amt": "369000",        "stln_slng_chgs": "0",        "expd_dt": "",        "fltt_rt": "-100.00000000",        "bfdy_cprs_icdc": "-184500",        "item_mgna_rt_name": "",        "grta_rt_name": "",        "sbst_pric": "140220",        "stck_loan_unpr": "123000.0000"      }  	  ],    "output2": [          {              "dnca_tot_amt": "346455",              "nxdy_excc_amt": "346455",              "prvs_rcdl_excc_amt": "346455",              "cma_evlu_amt": "0",              "bfdy_buy_amt": "0",              "thdt_buy_amt": "0",              "nxdy_auto_rdpt_amt": "0",              "bfdy_sll_amt": "0",              "thdt_sll_amt": "0",              "d2_auto_rdpt_amt": "0",              "bfdy_tlex_amt": "0",              "thdt_tlex_amt": "0",              "tot_loan_amt": "0",              "scts_evlu_amt": "1759600",              "tot_evlu_amt": "2106055",              "nass_amt": "2106055",              "fncg_gld_auto_rdpt_yn": "",              "pchs_amt_smtl_amt": "2516522",              "evlu_amt_smtl_amt": "1759600",              "evlu_pfls_smtl_amt": "-756922",              "tot_stln_slng_chgs": "0",              "bfdy_tot_asst_evlu_amt": "2142945",              "asst_icdc_amt": "-36890",              "asst_icdc_erng_rt": "0.00000000"          }      ],    "rt_cd": "0",    "msg_cd": "KIOK0510",    "msg1": "조회가 완료되었습니다                                                           "  }
```

---
### 13. 퇴직연금 체결기준잔고

| Field | Value |
|---|---|
| Sheet | `퇴직연금 체결기준잔고` |
| Menu | [국내주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/trading/pension/inquire-present-balance` |
| TR_ID (실전) | `TTTC2202R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 |  |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 29 |
| `USER_DVSN_CD` | 사용자구분코드 | string | Y | 2 | 00 |
| `CTX_AREA_FK100` | 연속조회검색조건100 | string | Y | 100 |  |
| `CTX_AREA_NK100` | 연속조회키100 | string | Y | 100 |  |
| `PRCS_DVSN_CD` | 처리구분코드 | string | N | 2 | 00 : 보유 주식 전체 조회  01 : 보유 주식 중 0주 주식 숨김 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세1 | object array | Y |  | Array |
| `cblc_dvsn` | 잔고구분 | string | Y | 2 |  |
| `cblc_dvsn_name` | 잔고구분명 | string | Y | 60 |  |
| `pdno` | 상품번호 | string | Y | 12 |  |
| `prdt_name` | 상품명 | string | Y | 60 |  |
| `hldg_qty` | 보유수량 | string | Y | 19 |  |
| `slpsb_qty` | 매도가능수량 | string | Y | 10 |  |
| `pchs_avg_pric` | 매입평균가격 | string | Y | 184 |  |
| `evlu_pfls_amt` | 평가손익금액 | string | Y | 19 |  |
| `evlu_pfls_rt` | 평가손익율 | string | Y | 72 |  |
| `prpr` | 현재가 | string | Y | 19 |  |
| `evlu_amt` | 평가금액 | string | Y | 19 |  |
| `pchs_amt` | 매입금액 | string | Y | 19 |  |
| `cblc_weit` | 잔고비중 | string | Y | 238 |  |
| `output2` | 응답상세2 | object array | Y |  | Array |
| `pchs_amt_smtl_amt` | 매입금액합계금액 | string | Y | 19 |  |
| `evlu_amt_smtl_amt` | 평가금액합계금액 | string | Y | 19 |  |
| `evlu_pfls_smtl_amt` | 평가손익합계금액 | string | Y | 19 |  |
| `trad_pfls_smtl` | 매매손익합계 | string | Y | 19 |  |
| `thdt_tot_pfls_amt` | 당일총손익금액 | string | Y | 19 |  |
| `pftrt` | 수익률 | string | Y | 238 |  |

**Request Example:**
```
{  	"CANO":"63512345",  	"ACNT_PRDT_CD":"29",  	"USER_DVSN_CD":"00",  	"CTX_AREA_FK100":"",  	"CTX_AREA_NK100":""  }
```

**Response Example:**
```
{      "ctx_area_fk100": "63512345^29^00^                                                                                     ",      "ctx_area_nk100": "                                                                                                    ",      "output1": [          {              "cblc_dvsn": "01",              "cblc_dvsn_name": "사용자",              "pdno": "069500",              "prdt_name": "KODEX 200",              "hldg_qty": "6",              "slpsb_qty": "6",              "pchs_avg_pric": "35670.0000",              "evlu_pfls_amt": "-3330",              "evlu_pfls_rt": "-1.56",              "prpr": "35115",              "evlu_amt": "210690",              "pchs_amt": "214020",              "cblc_weit": "53.06651890"          },          {              "cblc_dvsn": "01",              "cblc_dvsn_name": "사용자",              "pdno": "091160",              "prdt_name": "KODEX 반도체",              "hldg_qty": "7",              "slpsb_qty": "7",              "pchs_avg_pric": "35820.0000",              "evlu_pfls_amt": "-64400",              "evlu_pfls_rt": "-25.68",              "prpr": "26620",              "evlu_amt": "186340",              "pchs_amt": "250740",              "cblc_weit": "46.93348110"          }      ],      "output2": [          {              "pchs_amt_smtl_amt": "464760",              "evlu_amt_smtl_amt": "397030",              "evlu_pfls_smtl_amt": "-67730",              "trad_pfls_smtl": "0",              "thdt_tot_pfls_amt": "-67730",              "pftrt": "-14.57311300"          }      ],      "rt_cd": "0",      "msg_cd": "KIOK0510",      "msg1": "조회가 완료되었습니다                                                           "  }
```

---
### 14. 매수가능조회

| Field | Value |
|---|---|
| Sheet | `매수가능조회` |
| Menu | [국내주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/trading/inquire-psbl-order` |
| TR_ID (실전) | `TTTC8908R` |
| TR_ID (모의) | `VTTC8908R` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `PDNO` | 상품번호 | string | Y | 12 | 종목번호(6자리)  * PDNO, ORD_UNPR 공란 입력 시, 매수수량 없이 매수금액만 조회됨 |
| `ORD_UNPR` | 주문단가 | string | Y | 19 | 1주당 가격  * 시장가(ORD_DVSN:01)로 조회 시, 공란으로 입력  * PDNO, ORD_UNPR 공란 입력 시, 매수수량 없이 매수금액만 조회됨 |
| `ORD_DVSN` | 주문구분 | string | Y | 2 | * 특정 종목 전량매수 시 가능수량을 확인할 경우      00:지정가는 증거금율이 반영되지 않으므로      증거금율이 반영되는 01: 시장가로 조회  * 다만, 조건부지정가 등 특정 주문구분(ex.IOC)으로 주문 시 가능수량을 확인할 경우 주문 시와 동일한 주문구분(ex.IOC) 입력하여 가능수량 확인  * 종목별 매수가능수량 조회 없이 매수금액만 조회하고자 할 경우 임의값(00) 입력  00 : 지정가  01 : 시장가  02 : 조건부지정가  03 : 최유리지정가  04 : 최우선지정가  05 : 장전 시간외  06 : 장후 시간외  07 : 시간외 단일가  08 : 자기주식  09 : 자기주식S-Option  10 : 자기주식금전신탁  11 : IOC지정가 (즉시체결,잔량취소)  12 : FOK지정가 (즉시체결,전량취소)  13 : IOC시장가 (즉시체결,잔량취소)  14 : FOK시장가 (즉시체결,전량취소)  15 : IOC최유리 (즉시체결,잔량취소)  16 : FOK최유리 (즉시체결,전량취소)  51 : 장중대량  52 : 장중바스켓  62 : 장개시전 시간외대량  63 : 장개시전 시간외바스켓  67 : 장개시전 금전신탁자사주  69 : 장개시전 자기주식  72 : 시간외대량  77 : 시간외자사주신탁  79 : 시간외대량자기주식  80 : 바스켓 |
| `CMA_EVLU_AMT_ICLD_YN` | CMA평가금액포함여부 | string | Y | 1 | Y : 포함  N : 포함하지 않음 |
| `OVRS_ICLD_YN` | 해외포함여부 | string | Y | 1 | Y : 포함  N : 포함하지 않음 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 | 0 : 성공  0 이외의 값 : 실패 |
| `msg_cd` | 응답코드 | string | Y | 8 | 응답코드 |
| `msg1` | 응답메세지 | string | Y | 80 | 응답메세지 |
| `output` | 응답상세 | object | Y |  | Single |
| `ord_psbl_cash` | 주문가능현금 | string | Y | 19 | 예수금으로 계산된 주문가능금액 |
| `ord_psbl_sbst` | 주문가능대용 | string | Y | 19 |  |
| `ruse_psbl_amt` | 재사용가능금액 | string | Y | 19 | 전일/금일 매도대금으로 계산된 주문가능금액 |
| `fund_rpch_chgs` | 펀드환매대금 | string | Y | 19 |  |
| `psbl_qty_calc_unpr` | 가능수량계산단가 | string | Y | 19 |  |
| `nrcvb_buy_amt` | 미수없는매수금액 | string | Y | 19 | 미수를 사용하지 않으실 경우 nrcvb_buy_amt(미수없는매수금액)을 확인 |
| `nrcvb_buy_qty` | 미수없는매수수량 | string | Y | 10 | 미수를 사용하지 않으실 경우 nrcvb_buy_qty(미수없는매수수량)을 확인    * 특정 종목 전량매수 시 가능수량을 확인하실 경우    조회 시 ORD_DVSN:01(시장가)로 지정 필수  * 다만, 조건부지정가 등 특정 주문구분(ex.IOC)으로 주문 시 가능수량을 확인할 경우 주문 시와 동일한 주문구분(ex.IOC) 입력 |
| `max_buy_amt` | 최대매수금액 | string | Y | 19 | 미수를 사용하시는 경우 max_buy_amt(최대매수금액)를 확인 |
| `max_buy_qty` | 최대매수수량 | string | Y | 10 | 미수를 사용하시는 경우 max_buy_qty(최대매수수량)를 확인    * 특정 종목 전량매수 시 가능수량을 확인하실 경우    조회 시 ORD_DVSN:01(시장가)로 지정 필수  * 다만, 조건부지정가 등 특정 주문구분(ex.IOC)으로 주문 시 가능수량을 확인할 경우 주문 시와 동일한 주문구분(ex.IOC) 입력 |
| `cma_evlu_amt` | CMA평가금액 | string | Y | 19 |  |
| `ovrs_re_use_amt_wcrc` | 해외재사용금액원화 | string | Y | 19 |  |
| `ord_psbl_frcr_amt_wcrc` | 주문가능외화금액원화 | string | Y | 19 |  |

**Request Example:**
```
{  	"CANO": "810XXXXX",  	"ACNT_PRDT_CD": "01",  	"PDNO": "005930",  	"ORD_UNPR": "0",  	"ORD_DVSN": "01",  	"CMA_EVLU_AMT_ICLD_YN": "N",  	"OVRS_ICLD_YN": "N"  }
```

**Response Example:**
```
{    "output": {      "ord_psbl_cash": "741191178",      "ord_psbl_sbst": "0",      "ruse_psbl_amt": "0",      "fund_rpch_chgs": "0",      "psbl_qty_calc_unpr": "70000",      "nrcvb_buy_amt": "107177377",      "nrcvb_buy_qty": "1531",      "max_buy_amt": "1482382356",      "max_buy_qty": "21176",      "cma_evlu_amt": "0",      "ovrs_re_use_amt_wcrc": "0",      "ord_psbl_frcr_amt_wcrc": "1468797045293"    },    "rt_cd": "0",    "msg_cd": "KIOK0510",    "msg1": "조회가 완료되었습니다                                                           "  }
```

---
### 15. 기간별손익일별합산조회

| Field | Value |
|---|---|
| Sheet | `기간별손익일별합산조회` |
| Menu | [국내주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/trading/inquire-period-profit` |
| TR_ID (실전) | `TTTC8708R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 |  |
| `CANO` | 종합계좌번호 | string | Y | 8 |  |
| `INQR_STRT_DT` | 조회시작일자 | string | Y | 8 |  |
| `PDNO` | 상품번호 | string | Y | 12 | ""공란입력 시, 전체 |
| `CTX_AREA_NK100` | 연속조회키100 | string | Y | 100 |  |
| `INQR_END_DT` | 조회종료일자 | string | Y | 8 |  |
| `SORT_DVSN` | 정렬구분 | string | Y | 2 | 00: 최근 순, 01: 과거 순, 02: 최근 순 |
| `INQR_DVSN` | 조회구분 | string | Y | 2 | 00 입력 |
| `CBLC_DVSN` | 잔고구분 | string | Y | 2 | 00: 전체 |
| `CTX_AREA_FK100` | 연속조회검색조건100 | string | Y | 100 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `trad_dt` | 매매일자 | string | Y | 8 |  |
| `buy_amt` | 매수금액 | string | Y | 19 |  |
| `sll_amt` | 매도금액 | string | Y | 19 |  |
| `rlzt_pfls` | 실현손익 | string | Y | 19 |  |
| `fee` | 수수료 | string | Y | 19 |  |
| `loan_int` | 대출이자 | string | Y | 19 |  |
| `tl_tax` | 제세금 | string | Y | 19 |  |
| `pfls_rt` | 손익률 | string | Y | 238 |  |
| `sll_qty1` | 매도수량1 | string | Y | 19 |  |
| `buy_qty1` | 매수수량1 | string | Y | 9 |  |
| `output2` | 응답상세2 | object | Y |  |  |
| `sll_qty_smtl` | 매도수량합계 | string | Y | 19 |  |
| `sll_tr_amt_smtl` | 매도거래금액합계 | string | Y | 19 |  |
| `sll_fee_smtl` | 매도수수료합계 | string | Y | 19 |  |
| `sll_tltx_smtl` | 매도제세금합계 | string | Y | 19 |  |
| `sll_excc_amt_smtl` | 매도정산금액합계 | string | Y | 19 |  |
| `buy_qty_smtl` | 매수수량합계 | string | Y | 19 |  |
| `buy_tr_amt_smtl` | 매수거래금액합계 | string | Y | 19 |  |
| `buy_fee_smtl` | 매수수수료합계 | string | Y | 19 |  |
| `buy_tax_smtl` | 매수제세금합계 | string | Y | 19 |  |
| `buy_excc_amt_smtl` | 매수정산금액합계 | string | Y | 19 |  |
| `tot_qty` | 총수량 | string | Y | 10 |  |
| `tot_tr_amt` | 총거래금액 | string | Y | 19 |  |
| `tot_fee` | 총수수료 | string | Y | 19 |  |
| `tot_tltx` | 총제세금 | string | Y | 19 |  |
| `tot_excc_amt` | 총정산금액 | string | Y | 19 |  |
| `tot_rlzt_pfls` | 총실현손익 | string | Y | 19 | ※ HTS[0856] 기간별 매매손익 '일별' 화면의 우측 하단 '총손익률' 항목은   기간별매매손익현황조회(TTTC8715R) > output2 > tot_pftrt(총수익률) 으로 확인 가능 |
| `loan_int` | 대출이자 | string | Y | 19 |  |

**Request Example:**
```
{  "CANO":"12345678",  "ACNT_PRDT_CD":"01",  "PDNO":"",  "INQR_STRT_DT":"20230101",  "INQR_END_DT":"20240220",  "SORT_DVSN":"00",  "INQR_DVSN":"00",  "CBLC_DVSN":"00",  "CTX_AREA_FK100":"",  "CTX_AREA_NK100":""  }
```

**Response Example:**
```
{      "ctx_area_fk100": "                                                                                                    ",      "ctx_area_nk100": "                                                                                                    ",      "output1": [          {              "trad_dt": "20240220",              "buy_amt": "116697331",              "sll_amt": "96455",              "rlzt_pfls": "22991",              "fee": "0",              "loan_int": "0",              "tl_tax": "0",              "pfls_rt": "31.29560057",              "sll_qty1": "8",              "buy_qty1": "2003"          }      ],      "output2": {          "sll_qty_smtl": "8",          "sll_tr_amt_smtl": "96455",          "sll_fee_smtl": "0",          "sll_tltx_smtl": "0",          "sll_excc_amt_smtl": "96455",          "buy_qty_smtl": "2003",          "buy_tr_amt_smtl": "116697331",          "buy_fee_smtl": "0",          "buy_tax_smtl": "0",          "buy_excc_amt_smtl": "116697331",          "tot_qty": "2011",          "tot_tr_amt": "116793786",          "tot_fee": "0",          "tot_tltx": "0",          "tot_excc_amt": "116793786",          "tot_rlzt_pfls": "22991",          "loan_int": "0"      },      "rt_cd": "0",      "msg_cd": "KIOK0510",      "msg1": "조회가 완료되었습니다                                                           "  }
```

---
### 16. 주식주문(현금)

| Field | Value |
|---|---|
| Sheet | `주식주문(현금)` |
| Menu | [국내주식] 주문/계좌 |
| Method | `POST` |
| URL | `/uapi/domestic-stock/v1/trading/order-cash` |
| TR_ID (실전) | `(매도) TTTC0011U (매수) TTTC0012U` |
| TR_ID (모의) | `(매도) VTTC0011U (매수) VTTC0012U` |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 종합계좌번호 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 상품유형코드 |
| `PDNO` | 상품번호 | string | Y | 12 | 종목코드(6자리) , ETN의 경우 7자리 입력 |
| `SLL_TYPE` | 매도유형 (매도주문 시) | string | N | 2 | 01@일반매도  02@임의매매  05@대차매도  → 미입력시 01 일반매도로 진행 |
| `ORD_DVSN` | 주문구분 | string | Y | 2 | [KRX]  00 : 지정가  01 : 시장가  02 : 조건부지정가  03 : 최유리지정가  04 : 최우선지정가  05 : 장전 시간외  06 : 장후 시간외  07 : 시간외 단일가  11 : IOC지정가 (즉시체결,잔량취소)  12 : FOK지정가 (즉시체결,전량취소)  13 : IOC시장가 (즉시체결,잔량취소)  14 : FOK시장가 (즉시체결,전량취소)  15 : IOC최유리 (즉시체결,잔량취소)  16 : FOK최유리 (즉시체결,전량취소)  21 : 중간가  22 : 스톱지정가  23 : 중간가IOC  24 : 중간가FOK    [NXT]  00 : 지정가  03 : 최유리지정가  04 : 최우선지정가  11 : IOC지정가 (즉시체결,잔량취소)  12 : FOK지정가 (즉시체결,전량취소)  13 : IOC시장가 (즉시체결,잔량취소)  14 : FOK시장가 (즉시체결,전량취소)  15 : IOC최유리 (즉시체결,잔량취소)  16 : FOK최유리 (즉시체결,전량취소)  21 : 중간가  22 : 스톱지정가  23 : 중간가IOC  24 : 중간가FOK    [SOR]  00 : 지정가  01 : 시장가  03 : 최유리지정가  04 : 최우선지정가  11 : IOC지정가 (즉시체결,잔량취소)  12 : FOK지정가 (즉시체결,전량취소)  13 : IOC시장가 (즉시체결,잔량취소)  14 : FOK시장가 (즉시체결,전량취소)  15 : IOC최유리 (즉시체결,잔량취소)  16 : FOK최유리 (즉시체결,전량취소) |
| `ORD_QTY` | 주문수량 | string | Y | 10 | 주문수량 |
| `ORD_UNPR` | 주문단가 | string | Y | 19 | 주문단가  시장가 등 주문시, "0"으로 입력 |
| `CNDT_PRIC` | 조건가격 | string | N | 19 | 스탑지정가호가 주문 (ORD_DVSN이 22) 사용 시에만 필수 |
| `EXCG_ID_DVSN_CD` | 거래소ID구분코드 | string | N | 3 | 한국거래소 : KRX  대체거래소 (넥스트레이드) : NXT  SOR (Smart Order Routing) : SOR  → 미입력시 KRX로 진행되며, 모의투자는 KRX만 가능 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | single |
| `KRX_FWDG_ORD_ORGNO` | 계좌관리점코드 | string | Y | 5 |  |
| `ODNO` | 주문번호 | string | Y | 10 |  |
| `ORD_TMD` | 주문시간 | string | Y | 6 |  |

**Request Example:**
```
{  	"CANO": "810XXXXX",  	"ACNT_PRDT_CD": "01",  	"PDNO": "009150",  	"ORD_DVSN": "00",  	"ORD_QTY": "3",  	"ORD_UNPR": "150000"  }
```

**Response Example:**
```
{    "rt_cd": "0",    "msg_cd": "APBK0013",    "msg1": "주문 전송 완료 되었습니다.",    "output": {      "KRX_FWDG_ORD_ORGNO": "06010",      "ODNO": "0001569157",      "ORD_TMD": "155211"    }  }
```

---
### 17. 매도가능수량조회

| Field | Value |
|---|---|
| Sheet | `매도가능수량조회` |
| Menu | [국내주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/trading/inquire-psbl-sell` |
| TR_ID (실전) | `TTTC8408R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 종합계좌번호 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌상품코드 |
| `PDNO` | 종목번호 | string | Y | 12 | 보유종목 코드 ex)000660 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `pdno` | 상품번호 | string | Y | 12 |  |
| `prdt_name` | 상품명 | string | Y | 60 |  |
| `buy_qty` | 매수수량 | string | Y | 10 |  |
| `sll_qty` | 매도수량 | string | Y | 10 |  |
| `cblc_qty` | 잔고수량 | string | Y | 19 |  |
| `nsvg_qty` | 비저축수량 | string | Y | 19 |  |
| `ord_psbl_qty` | 주문가능수량 | string | Y | 10 |  |
| `pchs_avg_pric` | 매입평균가격 | string | Y | 184 |  |
| `pchs_amt` | 매입금액 | string | Y | 19 |  |
| `now_pric` | 현재가 | string | Y | 8 |  |
| `evlu_amt` | 평가금액 | string | Y | 19 |  |
| `evlu_pfls_amt` | 평가손익금액 | string | Y | 19 |  |
| `evlu_pfls_rt` | 평가손익율 | string | Y | 72 |  |

**Request Example:**
```
CANO:12345678  ACNT_PRDT_CD:01  PDNO:005930
```

**Response Example:**
```
{      "output": {          "pdno": "005930",          "prdt_name": "삼성전자",          "buy_qty": "1746",          "sll_qty": "2",          "cblc_qty": "1744",          "nsvg_qty": "0",          "ord_psbl_qty": "1744",          "pchs_avg_pric": "54388.4874",          "pchs_amt": "0",          "now_pric": "75800",          "evlu_amt": "132195200",          "evlu_pfls_amt": "37341678",          "evlu_pfls_rt": "39.36"      },      "rt_cd": "0",      "msg_cd": "KIOK0420",      "msg1": "정상적으로 조회되었습니다                                                       "  }
```

---
### 18. 주식일별주문체결조회

| Field | Value |
|---|---|
| Sheet | `주식일별주문체결조회` |
| Menu | [국내주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/trading/inquire-daily-ccld` |
| TR_ID (실전) | `(3개월이내) TTTC0081R (3개월이전) CTSC9215R` |
| TR_ID (모의) | `(3개월이내) VTTC0081R (3개월이전) VTSC9215R` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `INQR_STRT_DT` | 조회시작일자 | string | Y | 8 | YYYYMMDD |
| `INQR_END_DT` | 조회종료일자 | string | Y | 8 | YYYYMMDD |
| `SLL_BUY_DVSN_CD` | 매도매수구분코드 | string | Y | 2 | 00 : 전체 / 01 : 매도 / 02 : 매수 |
| `PDNO` | 상품번호 | string | N | 12 | 종목번호(6자리) |
| `ORD_GNO_BRNO` | 주문채번지점번호 | string | Y | 5 | 주문시 한국투자증권 시스템에서 지정된 영업점코드 |
| `ODNO` | 주문번호 | string | N | 10 | 주문시 한국투자증권 시스템에서 채번된 주문번호 |
| `CCLD_DVSN` | 체결구분 | string | Y | 2 | '00 전체  01 체결  02 미체결' |
| `INQR_DVSN` | 조회구분 | string | Y | 2 | '00 역순  01 정순' |
| `INQR_DVSN_1` | 조회구분1 | string | Y | 1 | '없음: 전체  1: ELW  2: 프리보드' |
| `INQR_DVSN_3` | 조회구분3 | string | Y | 2 | '00 전체  01 현금  02 신용  03 담보  04 대주  05 대여  06 자기융자신규/상환  07 유통융자신규/상환' |
| `EXCG_ID_DVSN_CD` | 거래소ID구분코드 | string | Y | 3 | 한국거래소 : KRX  대체거래소 (NXT) : NXT  SOR (Smart Order Routing) : SOR  ALL : 전체  ※ 모의투자는 KRX만 제공 |
| `CTX_AREA_FK100` | 연속조회검색조건100 | string | Y | 100 | '공란 : 최초 조회시는   이전 조회 Output CTX_AREA_FK100 값 : 다음페이지 조회시(2번째부터)' |
| `CTX_AREA_NK100` | 연속조회키100 | string | Y | 100 | '공란 : 최초 조회시   이전 조회 Output CTX_AREA_NK100 값 : 다음페이지 조회시(2번째부터)' |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `ord_dt` | 주문일자 | string | Y | 8 |  |
| `ord_gno_brno` | 주문채번지점번호 | string | Y | 5 |  |
| `odno` | 주문번호 | string | Y | 10 |  |
| `orgn_odno` | 원주문번호 | string | Y | 10 |  |
| `ord_dvsn_name` | 주문구분명 | string | Y | 60 |  |
| `sll_buy_dvsn_cd` | 매도매수구분코드 | string | Y | 2 |  |
| `sll_buy_dvsn_cd_name` | 매도매수구분코드명 | string | Y | 60 |  |
| `pdno` | 상품번호 | string | Y | 12 |  |
| `prdt_name` | 상품명 | string | Y | 60 |  |
| `ord_qty` | 주문수량 | string | Y | 10 |  |
| `ord_unpr` | 주문단가 | string | Y | 19 |  |
| `ord_tmd` | 주문시각 | string | Y | 6 |  |
| `tot_ccld_qty` | 총체결수량 | string | Y | 10 |  |
| `avg_prvs` | 평균가 | string | Y | 19 |  |
| `cncl_yn` | 취소여부 | string | Y | 1 |  |
| `tot_ccld_amt` | 총체결금액 | string | Y | 19 |  |
| `loan_dt` | 대출일자 | string | Y | 8 |  |
| `ordr_empno` | 주문자사번 | string | Y | 60 |  |
| `ord_dvsn_cd` | 주문구분코드 | string | Y | 2 |  |
| `cnc_cfrm_qty` | 취소확인수량 | string | Y | 10 |  |
| `rmn_qty` | 잔여수량 | string | Y | 10 |  |
| `rjct_qty` | 거부수량 | string | Y | 10 |  |
| `ccld_cndt_name` | 체결조건명 | string | Y | 10 |  |
| `inqr_ip_addr` | 조회IP주소 | string | Y | 15 |  |
| `cpbc_ordp_ord_rcit_dvsn_cd` | 전산주문표주문접수구분코드 | string | Y | 2 |  |
| `cpbc_ordp_infm_mthd_dvsn_cd` | 전산주문표통보방법구분코드 | string | Y | 2 |  |
| `infm_tmd` | 통보시각 | string | Y | 6 |  |
| `ctac_tlno` | 연락전화번호 | string | Y | 20 |  |
| `prdt_type_cd` | 상품유형코드 | string | Y | 3 |  |
| `excg_dvsn_cd` | 거래소구분코드 | string | Y | 2 |  |
| `cpbc_ordp_mtrl_dvsn_cd` | 전산주문표자료구분코드 | string | Y | 2 |  |
| `ord_orgno` | 주문조직번호 | string | Y | 5 |  |
| `rsvn_ord_end_dt` | 예약주문종료일자 | string | Y | 8 |  |
| `excg_id_dvsn_Cd` | 거래소ID구분코드 | string | Y | 3 |  |
| `stpm_cndt_pric` | 스톱지정가조건가격 | string | Y | 9 |  |
| `stpm_efct_occr_dtmd` | 스톱지정가효력발생상세시각 | string | Y | 9 |  |
| `output2` | 응답상세 | object | Y |  | single |
| `tot_ord_qty` | 총주문수량 | string | Y | 10 |  |
| `tot_ccld_qty` | 총체결수량 | string | Y | 10 |  |
| `tot_ccld_amt` | 매입평균가격 | string | Y | 19 |  |
| `prsm_tlex_smtl` | 총체결금액 | string | Y | 19 |  |
| `pchs_avg_pric` | 추정제비용합계 | string | Y | 184 |  |

**Request Example:**
```
{  	"CANO": "12345678",  	"ACNT_PRDT_CD": "01",  	"INQR_STRT_DT": "20211101",  	"INQR_END_DT": "20211101",  	"SLL_BUY_DVSN_CD": "00",  	"INQR_DVSN": "00",  	"PDNO": "",  	"CCLD_DVSN": "00",  	"ORD_GNO_BRNO": "",  	"ODNO": "",  	"INQR_DVSN_3": "00",  	"INQR_DVSN_1": "",  	"CTX_AREA_FK100": "",  	"CTX_AREA_NK100": ""  }
```

**Response Example:**
```
{    "ctx_area_fk100": "12345678^01^20220103^20220103^ ^00^00^                                                              ",    "ctx_area_nk100": "                                                                                                    ",    "output1": [      {        "ord_dt": "20220103",        "ord_gno_brno": "06010",        "odno": "0001568197",        "orgn_odno": "",        "ord_dvsn_name": "Limit",        "sll_buy_dvsn_cd": "02",        "sll_buy_dvsn_cd_name": "BUY REJECT",        "pdno": "009150",        "prdt_name": "삼성전기",        "ord_qty": "10",        "ord_unpr": "150000",        "ord_tmd": "170100",        "tot_ccld_qty": "0",        "avg_prvs": "0",        "cncl_yn": "",        "tot_ccld_amt": "0",        "loan_dt": "",        "ordr_empno": "Nsmart",        "ord_dvsn_cd": "00",        "cncl_cfrm_qty": "0",        "rmn_qty": "0",        "rjct_qty": "10",        "ccld_cndt_name": "None",        "inqr_ip_addr": "...",        "cpbc_ordp_ord_rcit_dvsn_cd": "",        "cpbc_ordp_infm_mthd_dvsn_cd": "",        "infm_tmd": "",        "ctac_tlno": "01047859775",        "prdt_type_cd": "300",        "excg_dvsn_cd": "02",        "cpbc_ordp_mtrl_dvsn_cd": "11",        "ord_orgno": "00000",        "rsvn_ord_end_dt": ""      },      {        "ord_dt": "20220103",        "ord_gno_brno": "06010",        "odno": "0001568196",        "orgn_odno": "",        "ord_dvsn_name": "Limit",        "sll_buy_dvsn_cd": "02",        "sll_buy_dvsn_cd_name": "BUY REJECT",        "pdno": "009150",        "prdt_name": "삼성전기",        "ord_qty": "10",        "ord_unpr": "150000",        "ord_tmd": "170038",        "tot_ccld_qty": "0",        "avg_prvs": "0",        "cncl_yn": "",        "tot_ccld_amt": "0",        "loan_dt": "",        "ordr_empno": "Nsmart",        "ord_dvsn_cd": "00",        "cncl_cfrm_qty": "0",        "rmn_qty": "0",        "rjct_qty": "10",        "ccld_cndt_name": "None",        "inqr_ip_addr": "P01.012.345.678",        "cpbc_ordp_ord_rcit_dvsn_cd": "",        "cpbc_ordp_infm_mthd_dvsn_cd": "",        "infm_tmd": "",        "ctac_tlno": "01047859775",        "prdt_type_cd": "300",        "excg_dvsn_cd": "02",        "cpbc_ordp_mtrl_dvsn_cd": "11",        "ord_orgno": "00000",        "rsvn_ord_end_dt": ""  	}  		],    "output2": {      "tot_ord_qty": "281",      "tot_ccld_qty": "0",      "tot_ccld_amt": "0",      "prsm_tlex_smtl": "0",      "pchs_avg_pric": "0.0000"    },    "rt_cd": "0",    "msg_cd": "KIOK0510",    "msg1": "조회가 완료되었습니다                                                           "  }
```

---
### 19. 주식정정취소가능주문조회

| Field | Value |
|---|---|
| Sheet | `주식정정취소가능주문조회` |
| Menu | [국내주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/trading/inquire-psbl-rvsecncl` |
| TR_ID (실전) | `TTTC0084R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `CTX_AREA_FK100` | 연속조회검색조건100 | string | Y | 100 | '공란 : 최초 조회시는   이전 조회 Output CTX_AREA_FK100 값 : 다음페이지 조회시(2번째부터)' |
| `CTX_AREA_NK100` | 연속조회키100 | string | Y | 100 | '공란 : 최초 조회시   이전 조회 Output CTX_AREA_NK100 값 : 다음페이지 조회시(2번째부터)' |
| `INQR_DVSN_1` | 조회구분1 | string | Y | 1 | '0 주문  1 종목' |
| `INQR_DVSN_2` | 조회구분2 | string | Y | 1 | '0 전체  1 매도  2 매수' |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `ord_gno_brno` | 주문채번지점번호 | string | Y | 5 | 주문시 한국투자증권 시스템에서 지정된 영업점코드 |
| `odno` | 주문번호 | string | Y | 10 | 주문시 한국투자증권 시스템에서 채번된 주문번호 |
| `orgn_odno` | 원주문번호 | string | Y | 6 | 정정/취소주문 인경우 원주문번호 |
| `ord_dvsn_name` | 주문구분명 | string | Y | 5 |  |
| `pdno` | 상품번호 | string | Y | 10 | 종목번호(뒤 6자리만 해당) |
| `prdt_name` | 상품명 | string | Y | 6 | 종목명 |
| `rvse_cncl_dvsn_name` | 정정취소구분명 | string | Y | 5 | 정정 또는 취소 여부 표시 |
| `ord_qty` | 주문수량 | string | Y | 10 |  |
| `ord_unpr` | 주문단가 | string | Y | 6 | 1주당 주문가격 |
| `ord_tmd` | 주문시각 | string | Y | 5 | 주문시각(시분초HHMMSS) |
| `tot_ccld_qty` | 총체결수량 | string | Y | 10 | 주문 수량 중 체결된 수량 |
| `tot_ccld_amt` | 총체결금액 | string | Y | 6 | 주문금액 중 체결금액 |
| `psbl_qty` | 가능수량 | string | Y | 5 | 정정/취소 주문 가능 수량 |
| `sll_buy_dvsn_cd` | 매도매수구분코드 | string | Y | 10 | 01 : 매도 / 02 : 매수 |
| `ord_dvsn_cd` | 주문구분코드 | string | Y | 6 | [KRX]  00 : 지정가  01 : 시장가  02 : 조건부지정가  03 : 최유리지정가  04 : 최우선지정가  05 : 장전 시간외  06 : 장후 시간외  07 : 시간외 단일가  11 : IOC지정가 (즉시체결,잔량취소)  12 : FOK지정가 (즉시체결,전량취소)  13 : IOC시장가 (즉시체결,잔량취소)  14 : FOK시장가 (즉시체결,전량취소)  15 : IOC최유리 (즉시체결,잔량취소)  16 : FOK최유리 (즉시체결,전량취소)  21 : 중간가  22 : 스톱지정가  23 : 중간가IOC  24 : 중간가FOK    [NXT]  00 : 지정가  03 : 최유리지정가  04 : 최우선지정가  11 : IOC지정가 (즉시체결,잔량취소)  12 : FOK지정가 (즉시체결,전량취소)  13 : IOC시장가 (즉시체결,잔량취소)  14 : FOK시장가 (즉시체결,전량취소)  15 : IOC최유리 (즉시체결,잔량취소)  16 : FOK최유리 (즉시체결,전량취소)  21 : 중간가  22 : 스톱지정가  23 : 중간가IOC  24 : 중간가FOK    [SOR]  00 : 지정가  01 : 시장가  03 : 최유리지정가  04 : 최우선지정가  11 : IOC지정가 (즉시체결,잔량취소)  12 : FOK지정가 (즉시체결,전량취소)  13 : IOC시장가 (즉시체결,잔량취소)  14 : FOK시장가 (즉시체결,전량취소)  15 : IOC최유리 (즉시체결,잔량취소)  16 : FOK최유리 (즉시체결,전량취소) |
| `mgco_aptm_odno` | 운용사지정주문번호 | string | Y | 5 |  |
| `excg_dvsn_cd` | 거래소구분코드 | string | Y | 2 |  |
| `excg_id_dvsn_cd` | 거래소ID구분코드 | string | Y | 3 |  |
| `excg_id_dvsn_name` | 거래소ID구분명 | string | Y | 100 |  |
| `stpm_cndt_pric` | 스톱지정가조건가격 | string | Y | 9 |  |
| `stpm_efct_occr_yn` | 스톱지정가효력발생여부 | string | Y | 1 |  |

**Request Example:**
```
{  	"ACNT_PRDT_CD": "01",  	"CANO": "810XXXXX",  	"CTX_AREA_FK100": "",  	"CTX_AREA_NK100": "",  	"INQR_DVSN_1": "0",  	"INQR_DVSN_2": "0"  }
```

**Response Example:**
```
{    "ctx_area_fk100": "81055689^01^                                                                                        ",    "ctx_area_nk100": "                                                                                                    ",    "output": [      {        "ord_gno_brno": "06010",        "odno": "0001569139",        "orgn_odno": "0001569136",        "ord_dvsn_name": "지정가",        "pdno": "009150",        "prdt_name": "SamsungElecMech",        "rvse_cncl_dvsn_name": "BUY AMEND*",        "ord_qty": "1",        "ord_unpr": "140000",        "ord_tmd": "131438",        "tot_ccld_qty": "0",        "tot_ccld_amt": "0",        "psbl_qty": "1",        "sll_buy_dvsn_cd": "02",        "ord_dvsn_cd": "00",        "mgco_aptm_odno": ""      },      {        "ord_gno_brno": "06010",        "odno": "0001569138",        "orgn_odno": "",        "ord_dvsn_name": "지정가",        "pdno": "009150",        "prdt_name": "SamsungElecMech",        "rvse_cncl_dvsn_name": "",        "ord_qty": "1",        "ord_unpr": "200000",        "ord_tmd": "131421",        "tot_ccld_qty": "0",        "tot_ccld_amt": "0",        "psbl_qty": "1",        "sll_buy_dvsn_cd": "02",        "ord_dvsn_cd": "00",        "mgco_aptm_odno": ""      }  	],    "rt_cd": "0",    "msg_cd": "KIOK0510",    "msg1": "조회가 완료되었습니다                                                           "  }
```

---
### 20. 주식예약주문

| Field | Value |
|---|---|
| Sheet | `주식예약주문` |
| Menu | [국내주식] 주문/계좌 |
| Method | `POST` |
| URL | `/uapi/domestic-stock/v1/trading/order-resv` |
| TR_ID (실전) | `CTSC0008U` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `PDNO` | 종목코드(6자리) | string | Y | 12 |  |
| `ORD_QTY` | 주문수량 | string | Y | 10 | 주문주식수 |
| `ORD_UNPR` | 주문단가 | string | Y | 19 | 1주당 가격   * 장전 시간외, 시장가의 경우 1주당 가격을 공란으로 비우지 않음 "0"으로 입력 권고 |
| `SLL_BUY_DVSN_CD` | 매도매수구분코드 | string | Y | 2 | 01 : 매도  02 : 매수 |
| `ORD_DVSN_CD` | 주문구분코드 | string | Y | 2 | 00 : 지정가  01 : 시장가  02 : 조건부지정가  05 : 장전 시간외 |
| `ORD_OBJT_CBLC_DVSN_CD` | 주문대상잔고구분코드 | string | Y | 2 | [매도매수구분코드 01:매도/02:매수시 사용]  10 : 현금     [매도매수구분코드 01:매도시 사용]  12 : 주식담보대출   14 : 대여상환  21 : 자기융자신규  22 : 유통대주신규  23 : 유통융자신규  24 : 자기대주신규  25 : 자기융자상환  26 : 유통대주상환  27 : 유통융자상환  28 : 자기대주상환 |
| `LOAN_DT` | 대출일자 | string | N | 8 |  |
| `RSVN_ORD_END_DT` | 예약주문종료일자 | string | N | 8 | (YYYYMMDD) 현재 일자보다 이후로 설정해야 함  * RSVN_ORD_END_DT(예약주문종료일자)를 안 넣으면 다음날 주문처리되고 예약주문은 종료됨  * RSVN_ORD_END_DT(예약주문종료일자)는 익영업일부터 달력일 기준으로 공휴일 포함하여 최대 30일이 되는 일자까지 입력 가능 |
| `LDNG_DT` | 대여일자 | string | N | 8 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 | 0 : 성공   0 이외의 값 : 실패 |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | Array |
| `rsvn_ord_seq` | 예약주문 순번 | string | N | 10 |  |

**Request Example:**
```
{   	"CANO": "810XXXXX",   	"ACNT_PRDT_CD": "01",   	"PDNO": "009150",   	"ORD_QTY": "10",   	"ORD_UNPR": "160000",   	"SLL_BUY_DVSN_CD":"02",   	"ORD_DVSN_CD":"00",   	"ORD_OBJT_CBLC_DVSN_CD":"10",   	"LOAN_DT":"",   	"RSVN_ORD_END_DT":""  }
```

**Response Example:**
```
{   	"rt_cd": "0",   	"msg_cd": "APBK2938",   	"msg1": "예약주문이 접수되었습니다.",   	"output": {   		"RSVN_ORD_SEQ": "39607"   	}   }
```

---
### 21. 주식주문(신용)

| Field | Value |
|---|---|
| Sheet | `주식주문(신용)` |
| Menu | [국내주식] 주문/계좌 |
| Method | `POST` |
| URL | `/uapi/domestic-stock/v1/trading/order-credit` |
| TR_ID (실전) | `(매도) TTTC0051U (매수) TTTC0052U` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `PDNO` | 상품번호 | string | Y | 5 | 종목코드(6자리) |
| `SLL_TYPE` | 매도유형 | string | N | 10 | 공란 입력 |
| `CRDT_TYPE` | 신용유형 | string | Y | 2 | [매도] 22 : 유통대주신규, 24 : 자기대주신규, 25 : 자기융자상환, 27 : 유통융자상환  [매수] 21 : 자기융자신규, 23 : 유통융자신규 , 26 : 유통대주상환, 28 : 자기대주상환 |
| `LOAN_DT` | 대출일자 | string | Y | 2 | [신용매수]   신규 대출로, 오늘날짜(yyyyMMdd)) 입력     [신용매도]   매도할 종목의 대출일자(yyyyMMdd)) 입력 |
| `ORD_DVSN` | 주문구분 | string | Y | 8 | [KRX]  00 : 지정가  01 : 시장가  02 : 조건부지정가  03 : 최유리지정가  04 : 최우선지정가  05 : 장전 시간외  06 : 장후 시간외  07 : 시간외 단일가  11 : IOC지정가 (즉시체결,잔량취소)  12 : FOK지정가 (즉시체결,전량취소)  13 : IOC시장가 (즉시체결,잔량취소)  14 : FOK시장가 (즉시체결,전량취소)  15 : IOC최유리 (즉시체결,잔량취소)  16 : FOK최유리 (즉시체결,전량취소)  21 : 중간가  22 : 스톱지정가  23 : 중간가IOC  24 : 중간가FOK    [NXT]  00 : 지정가  03 : 최유리지정가  04 : 최우선지정가  11 : IOC지정가 (즉시체결,잔량취소)  12 : FOK지정가 (즉시체결,전량취소)  13 : IOC시장가 (즉시체결,잔량취소)  14 : FOK시장가 (즉시체결,전량취소)  15 : IOC최유리 (즉시체결,잔량취소)  16 : FOK최유리 (즉시체결,전량취소)  21 : 중간가  22 : 스톱지정가  23 : 중간가IOC  24 : 중간가FOK    [SOR]  00 : 지정가  01 : 시장가  03 : 최유리지정가  04 : 최우선지정가  11 : IOC지정가 (즉시체결,잔량취소)  12 : FOK지정가 (즉시체결,전량취소)  13 : IOC시장가 (즉시체결,잔량취소)  14 : FOK시장가 (즉시체결,전량취소)  15 : IOC최유리 (즉시체결,잔량취소)  16 : FOK최유리 (즉시체결,전량취소) |
| `ORD_QTY` | 주문수량 | string | Y | 2 |  |
| `ORD_UNPR` | 주문단가 | string | Y | 5 | 1주당 가격   * 장전 시간외, 장후 시간외, 시장가의 경우 1주당 가격을 공란으로 비우지 않음 "0"으로 입력 권고 |
| `RSVN_ORD_YN` | 예약주문여부 | string | N | 2 | 정규 증권시장이 열리지 않는 시간 (15:10분 ~ 익일 7:30분) 에 주문을 미리 설정 하여 다음 영업일 또는 설정한 기간 동안 아침 동시 호가에 주문하는 것   Y : 예약주문   N : 신용주문 |
| `EMGC_ORD_YN` | 비상주문여부 | string | N | 2 |  |
| `PGTR_DVSN` | 프로그램매매구분 | string | N | 10 |  |
| `MGCO_APTM_ODNO` | 운용사지정주문번호 | string | N | 19 |  |
| `LQTY_TR_NGTN_DTL_NO` | 대량거래협상상세번호 | string | N | 1 |  |
| `LQTY_TR_AGMT_NO` | 대량거래협정번호 | string | N | 20 |  |
| `LQTY_TR_NGTN_ID` | 대량거래협상자Id | string | N | 19 |  |
| `LP_ORD_YN` | LP주문여부 | string | N | 3 |  |
| `MDIA_ODNO` | 매체주문번호 | string | N | 10 |  |
| `ORD_SVR_DVSN_CD` | 주문서버구분코드 | string | N | 19 |  |
| `PGM_NMPR_STMT_DVSN_CD` | 프로그램호가신고구분코드 | string | N | 1 |  |
| `CVRG_SLCT_RSON_CD` | 반대매매선정사유코드 | string | N | 20 |  |
| `CVRG_SEQ` | 반대매매순번 | string | N | 19 |  |
| `EXCG_ID_DVSN_CD` | 거래소ID구분코드 | string | N | 3 | 한국거래소 : KRX  대체거래소 (넥스트레이드) : NXT  SOR (Smart Order Routing) : SOR  → 미입력시 KRX로 진행되며, 모의투자는 KRX만 가능 |
| `CNDT_PRIC` | 조건가격 | string | N | 19 | 스탑지정가호가에서 사용 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object | Y |  | single |
| `krx_fwdg_ord_orgno` | 한국거래소전송주문조직번호 | string | Y | 5 |  |
| `odno` | 주문번호 | string | Y | 10 |  |
| `ord_tmd` | 주문시간 | string | Y | 6 |  |

**Request Example:**
```
{      "CANO": "810XXXXX",      "ACNT_PRDT_CD": "01",      "PDNO": "009150",      "CRDT_TYPE": "21",      "LOAN_DT": "20211103",      "ORD_DVSN": "00",      "ORD_QTY": "1",      "ORD_UNPR": "130000",      "RSVN_ORD_YN": "N"  }
```

**Response Example:**
```
{    "rt_cd": "0",    "msg_cd": "APBK0013",    "msg1": "주문 전송 완료 되었습니다.",    "output": {      "KRX_FWDG_ORD_ORGNO": "06010",      "ODNO": "0001569138",      "ORD_TMD": "131421"    }  }
```

---
### 22. 퇴직연금 잔고조회

| Field | Value |
|---|---|
| Sheet | `퇴직연금 잔고조회` |
| Menu | [국내주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/trading/pension/inquire-balance` |
| TR_ID (실전) | `TTTC2208R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 |  |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 29 |
| `ACCA_DVSN_CD` | 적립금구분코드 | string | Y | 2 | 00 |
| `INQR_DVSN` | 조회구분 | string | Y | 2 | 00 : 전체 |
| `CTX_AREA_FK100` | 연속조회검색조건100 | string | Y | 100 |  |
| `CTX_AREA_NK100` | 연속조회키100 | string | Y | 100 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | Array |
| `cblc_dvsn_name` | 잔고구분명 | string | Y | 60 |  |
| `prdt_name` | 상품명 | string | Y | 60 |  |
| `pdno` | 상품번호 | string | Y | 12 |  |
| `item_dvsn_name` | 종목구분명 | string | Y | 60 |  |
| `thdt_buyqty` | 금일매수수량 | string | Y | 10 |  |
| `thdt_sll_qty` | 금일매도수량 | string | Y | 10 |  |
| `hldg_qty` | 보유수량 | string | Y | 19 |  |
| `ord_psbl_qty` | 주문가능수량 | string | Y | 10 |  |
| `pchs_avg_pric` | 매입평균가격 | string | Y | 184 |  |
| `pchs_amt` | 매입금액 | string | Y | 19 |  |
| `prpr` | 현재가 | string | Y | 19 |  |
| `evlu_amt` | 평가금액 | string | Y | 19 |  |
| `evlu_pfls_amt` | 평가손익금액 | string | Y | 19 |  |
| `evlu_erng_rt` | 평가수익율 | string | Y | 238 |  |
| `output2` | 응답상세2 | object | Y |  |  |
| `dnca_tot_amt` | 예수금총금액 | string | Y | 19 |  |
| `nxdy_excc_amt` | 익일정산금액 | string | Y | 19 |  |
| `prvs_rcdl_excc_amt` | 가수도정산금액 | string | Y | 19 |  |
| `thdt_buy_amt` | 금일매수금액 | string | Y | 19 |  |
| `thdt_sll_amt` | 금일매도금액 | string | Y | 19 |  |
| `thdt_tlex_amt` | 금일제비용금액 | string | Y | 19 |  |
| `scts_evlu_amt` | 유가평가금액 | string | Y | 19 |  |
| `tot_evlu_amt` | 총평가금액 | string | Y | 19 |  |

**Request Example:**
```
{  	"CANO":"12345678",  	"ACNT_PRDT_CD":"29",  	"ACCA_DVSN_CD":"00",  	"INQR_DVSN":"00",  	"CTX_AREA_FK100":"",  	"CTX_AREA_NK100":""  }
```

**Response Example:**
```
{      "ctx_area_fk100": "12345678^29^00^00^                                                                                  ",      "ctx_area_nk100": "                                                                                                    ",      "output1": [          {              "cblc_dvsn_name": "사용자",              "prdt_name": "ACE 미국S&P500",              "pdno": "360200",              "item_dvsn_name": "현금",              "thdt_buyqty": "5",              "thdt_sll_qty": "0",              "hldg_qty": "5",              "ord_psbl_qty": "5",              "pchs_avg_pric": "13235.0000",              "pchs_amt": "66175",              "prpr": "13235",              "evlu_amt": "66175",              "evlu_pfls_amt": "0",              "evlu_erng_rt": "0.00000000"          }      ],      "output2": {          "dnca_tot_amt": "100000",          "nxdy_excc_amt": "100000",          "prvs_rcdl_excc_amt": "33825",          "thdt_buy_amt": "66175",          "thdt_sll_amt": "0",          "thdt_tlex_amt": "0",          "scts_evlu_amt": "66175",          "tot_evlu_amt": "100000"      },      "rt_cd": "0",      "msg_cd": "KIOK0510",      "msg1": "조회가 완료되었습니다                                                           "  }
```

---
### 23. 주식잔고조회_실현손익

| Field | Value |
|---|---|
| Sheet | `주식잔고조회_실현손익` |
| Menu | [국내주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/trading/inquire-balance-rlz-pl` |
| TR_ID (실전) | `TTTC8494R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `AFHR_FLPR_YN` | 시간외단일가여부 | string | Y | 1 | 'N : 기본값   Y : 시간외단일가' |
| `OFL_YN` | 오프라인여부 | string | Y | 1 | 공란 |
| `INQR_DVSN` | 조회구분 | string | Y | 2 | 00 : 전체 |
| `UNPR_DVSN` | 단가구분 | string | Y | 2 | 01 : 기본값 |
| `FUND_STTL_ICLD_YN` | 펀드결제포함여부 | string | Y | 1 | N : 포함하지 않음   Y : 포함 |
| `FNCG_AMT_AUTO_RDPT_YN` | 융자금액자동상환여부 | string | Y | 1 | N : 기본값 |
| `PRCS_DVSN` | PRCS_DVSN | string | Y | 2 | 00 : 전일매매포함   01 : 전일매매미포함 |
| `COST_ICLD_YN` | 비용포함여부 | string | Y | 1 |  |
| `CTX_AREA_FK100` | 연속조회검색조건100 | string | Y | 100 | 공란 : 최초 조회시   이전 조회 Output CTX_AREA_FK100 값 : 다음페이지 조회시(2번째부터) |
| `CTX_AREA_NK100` | 연속조회키100 | string | Y | 100 | 공란 : 최초 조회시   이전 조회 Output CTX_AREA_NK100 값 : 다음페이지 조회시(2번째부터) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | Array |
| `pdno` | 상품번호 | string | Y | 12 | 종목번호(뒷 6자리) |
| `prdt_name` | 상품명 | string | Y | 60 | 종목명 |
| `trad_dvsn_name` | 매매구분명 | string | Y | 60 | 매수매도구분 |
| `bfdy_buy_qty` | 전일매수수량 | string | Y | 10 |  |
| `bfdy_sll_qty` | 전일매도수량 | string | Y | 10 |  |
| `thdt_buyqty` | 금일매수수량 | string | Y | 10 |  |
| `thdt_sll_qty` | 금일매도수량 | string | Y | 10 |  |
| `hldg_qty` | 보유수량 | string | Y | 19 |  |
| `ord_psbl_qty` | 주문가능수량 | string | Y | 10 |  |
| `pchs_avg_pric` | 매입평균가격 | string | Y | 23 | 매입금액 / 보유수량 |
| `pchs_amt` | 매입금액 | string | Y | 19 |  |
| `prpr` | 현재가 | string | Y | 19 |  |
| `evlu_amt` | 평가금액 | string | Y | 19 |  |
| `evlu_pfls_amt` | 평가손익금액 | string | Y | 19 | 평가금액 - 매입금액 |
| `evlu_pfls_rt` | 평가손익율 | string | Y | 10 |  |
| `evlu_erng_rt` | 평가수익율 | string | Y | 32 |  |
| `loan_dt` | 대출일자 | string | Y | 8 |  |
| `loan_amt` | 대출금액 | string | Y | 19 |  |
| `stln_slng_chgs` | 대주매각대금 | string | Y | 19 | 신용 거래에서, 고객이 증권 회사로부터 대부받은 주식의 매각 대금 |
| `expd_dt` | 만기일자 | string | Y | 8 |  |
| `stck_loan_unpr` | 주식대출단가 | string | Y | 23 |  |
| `bfdy_cprs_icdc` | 전일대비증감 | string | Y | 19 |  |
| `fltt_rt` | 등락율 | string | Y | 32 |  |
| `output2` | 응답상세2 | object array | Y |  | Array |
| `dnca_tot_amt` | 예수금총금액 | string | Y | 19 |  |
| `nxdy_excc_amt` | 익일정산금액 | string | Y | 19 |  |
| `prvs_rcdl_excc_amt` | 가수도정산금액 | string | Y | 19 |  |
| `cma_evlu_amt` | CMA평가금액 | string | Y | 19 |  |
| `bfdy_buy_amt` | 전일매수금액 | string | Y | 19 |  |
| `thdt_buy_amt` | 금일매수금액 | string | Y | 19 |  |
| `nxdy_auto_rdpt_amt` | 익일자동상환금액 | string | Y | 19 |  |
| `bfdy_sll_amt` | 전일매도금액 | string | Y | 19 |  |
| `thdt_sll_amt` | 금일매도금액 | string | Y | 19 |  |
| `d2_auto_rdpt_amt` | D+2자동상환금액 | string | Y | 19 |  |
| `bfdy_tlex_amt` | 전일제비용금액 | string | Y | 19 |  |
| `thdt_tlex_amt` | 금일제비용금액 | string | Y | 19 |  |
| `tot_loan_amt` | 총대출금액 | string | Y | 19 |  |
| `scts_evlu_amt` | 유가평가금액 | string | Y | 19 |  |
| `tot_evlu_amt` | 총평가금액 | string | Y | 19 |  |
| `nass_amt` | 순자산금액 | string | Y | 19 |  |
| `fncg_gld_auto_rdpt_yn` | 융자금자동상환여부 | string | Y | 1 |  |
| `pchs_amt_smtl_amt` | 매입금액합계금액 | string | Y | 19 |  |
| `evlu_amt_smtl_amt` | 평가금액합계금액 | string | Y | 19 |  |
| `evlu_pfls_smtl_amt` | 평가손익합계금액 | string | Y | 19 |  |
| `tot_stln_slng_chgs` | 총대주매각대금 | string | Y | 19 |  |
| `bfdy_tot_asst_evlu_amt` | 전일총자산평가금액 | string | Y | 19 |  |
| `asst_icdc_amt` | 자산증감액 | string | Y | 19 |  |
| `asst_icdc_erng_rt` | 자산증감수익율 | string | Y | 32 |  |
| `rlzt_pfls` | 실현손익 | string | Y | 19 |  |
| `rlzt_erng_rt` | 실현수익율 | string | Y | 32 |  |
| `real_evlu_pfls` | 실평가손익 | string | Y | 19 |  |
| `real_evlu_pfls_erng_rt` | 실평가손익수익율 | string | Y | 32 |  |

**Request Example:**
```
{  "CANO":"12345678",  "ACNT_PRDT_CD":"01",  "AFHR_FLPR_YN":"N",  "OFL_YN":"",  "INQR_DVSN":"02",  "UNPR_DVSN":"01",  "FUND_STTL_ICLD_YN":"N",  "FNCG_AMT_AUTO_RDPT_YN":"N",  "PRCS_DVSN":"01",  "COST_ICLD_YN":"N",  "CTX_AREA_FK100":"",  "CTX_AREA_NK100":""  }
```

**Response Example:**
```
{      "ctx_area_fk100": "12345678^01^N^N^02^01^N^                                                                            ",      "ctx_area_nk100": "N^00000A900270^300^00000000^00^                                                                     ",      "output1": [          {              "pdno": "000080",              "prdt_name": "하이트진로",              "trad_dvsn_name": "현금",              "bfdy_buy_qty": "0",              "bfdy_sll_qty": "0",              "thdt_buyqty": "2",              "thdt_sll_qty": "0",              "hldg_qty": "2",              "ord_psbl_qty": "2",              "pchs_avg_pric": "22975.0000",              "pchs_amt": "45950",              "prpr": "22600",              "evlu_amt": "45200",              "evlu_pfls_amt": "-750",              "evlu_pfls_rt": "-1.63",              "evlu_erng_rt": "0.00000000",              "loan_dt": "",              "loan_amt": "0",              "stln_slng_chgs": "0",              "expd_dt": "",              "stck_loan_unpr": "0.0000",              "bfdy_cprs_icdc": "0",              "fltt_rt": "0.00000000"          },          {              "pdno": "000100",              "prdt_name": "유한양행",              "trad_dvsn_name": "현금",              "bfdy_buy_qty": "0",              "bfdy_sll_qty": "0",              "thdt_buyqty": "2",              "thdt_sll_qty": "0",              "hldg_qty": "2",              "ord_psbl_qty": "2",              "pchs_avg_pric": "64800.0000",              "pchs_amt": "129600",              "prpr": "67600",              "evlu_amt": "135200",              "evlu_pfls_amt": "5600",              "evlu_pfls_rt": "4.32",              "evlu_erng_rt": "0.00000000",              "loan_dt": "",              "loan_amt": "0",              "stln_slng_chgs": "0",              "expd_dt": "",              "stck_loan_unpr": "0.0000",              "bfdy_cprs_icdc": "2900",              "fltt_rt": "4.48222566"          },          {              "pdno": "000120",              "prdt_name": "CJ대한통운",              "trad_dvsn_name": "현금",              "bfdy_buy_qty": "0",              "bfdy_sll_qty": "0",              "thdt_buyqty": "10",              "thdt_sll_qty": "0",              "hldg_qty": "10",              "ord_psbl_qty": "10",              "pchs_avg_pric": "116800.0000",              "pchs_amt": "1168000",              "prpr": "129500",              "evlu_amt": "1295000",              "evlu_pfls_amt": "127000",              "evlu_pfls_rt": "10.87",              "evlu_erng_rt": "0.00000000",              "loan_dt": "",              "loan_amt": "0",              "stln_slng_chgs": "0",              "expd_dt": "",              "stck_loan_unpr": "0.0000",              "bfdy_cprs_icdc": "500",              "fltt_rt": "0.38759690"          },          {              "pdno": "000210",              "prdt_name": "DL",              "trad_dvsn_name": "현금",              "bfdy_buy_qty": "0",              "bfdy_sll_qty": "0",              "thdt_buyqty": "10",              "thdt_sll_qty": "
```

---
### 24. 주식현재가 일자별

| Field | Value |
|---|---|
| Sheet | `주식현재가 일자별` |
| Menu | [국내주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/inquire-daily-price` |
| TR_ID (실전) | `FHKST01010400` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | J:KRX, NX:NXT, UN:통합 |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 종목코드 (ex 005930 삼성전자) |
| `FID_PERIOD_DIV_CODE` | 기간 분류 코드 | string | Y | 32 | 'D : (일)최근 30거래일   W : (주)최근 30주   M : (월)최근 30개월' |
| `FID_ORG_ADJ_PRC` | 수정주가 원주가 가격 | string | Y | 10 | '0 : 수정주가미반영  1 : 수정주가반영  * 수정주가는 액면분할/액면병합 등 권리 발생 시 과거 시세를 현재 주가에 맞게 보정한 가격' |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stck_bsop_date` | 주식 영업 일자 | string | Y | 8 |  |
| `stck_oprc` | 주식 시가2 | string | Y | 10 |  |
| `stck_hgpr` | 주식 최고가 | string | Y | 10 |  |
| `stck_lwpr` | 주식 최저가 | string | Y | 10 |  |
| `stck_clpr` | 주식 종가 | string | Y | 10 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `prdy_vrss_vol_rate` | 전일 대비 거래량 비율 | string | Y | 84 | 13(8.4) |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 | 11(8.2) |
| `hts_frgn_ehrt` | HTS 외국인 소진율 | string | Y | 82 | 11(8.2) |
| `frgn_ntby_qty` | 외국인 순매수 수량 | string | Y | 12 |  |
| `flng_cls_code` | 락 구분 코드 | string | Y | 2 | '01 : 권리락   02 : 배당락   03 : 분배락   04 : 권배락   05 : 중간(분기)배당락   06 : 권리중간배당락   07 : 권리분기배당락' |
| `acml_prtt_rate` | 누적 분할 비율 | string | Y | 84 | 13(8.4) |

**Request Example:**
```
{  "fid_cond_mrkt_div_code": "J",  "fid_input_iscd": "000660",  "fid_org_adj_prc": "0000000001",  "fid_period_div_code": "D"  }
```

**Response Example:**
```
{    "output": [      {        "stck_bsop_date": "20220111",        "stck_oprc": "125500",        "stck_hgpr": "128500",        "stck_lwpr": "124500",        "stck_clpr": "128000",        "acml_vol": "3908418",        "prdy_vrss_vol_rate": "13.31",        "prdy_vrss": "3500",        "prdy_vrss_sign": "2",        "prdy_ctrt": "2.81",        "hts_frgn_ehrt": "49.39",        "frgn_ntby_qty": "0",        "flng_cls_code": "00",        "acml_prtt_rate": "1.00"      },      {        "stck_bsop_date": "20220110",        "stck_oprc": "126500",        "stck_hgpr": "127000",        "stck_lwpr": "123000",        "stck_clpr": "124500",        "acml_vol": "3449197",        "prdy_vrss_vol_rate": "5.48",        "prdy_vrss": "-2500",        "prdy_vrss_sign": "5",        "prdy_ctrt": "-1.97",        "hts_frgn_ehrt": "49.39",        "frgn_ntby_qty": "293389",        "flng_cls_code": "00",        "acml_prtt_rate": "0.00"      }  	  ],    "rt_cd": "0",    "msg_cd": "MCA00000",    "msg1": "정상처리 되었습니다!"  }
```

---
### 25. 주식현재가 시세

| Field | Value |
|---|---|
| Sheet | `주식현재가 시세` |
| Menu | [국내주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/inquire-price` |
| TR_ID (실전) | `FHKST01010100` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | J:KRX, NX:NXT, UN:통합 |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 종목코드 (ex 005930 삼성전자)  // ETN은 종목코드 6자리 앞에 Q 입력 필수 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object | Y |  |  |
| `iscd_stat_cls_code` | 종목 상태 구분 코드 | string | Y | 3 | 51 : 관리종목  52 : 투자위험  53 : 투자경고  54 : 투자주의  55 : 신용가능  57 : 증거금 100%  58 : 거래정지  59 : 단기과열종목 |
| `marg_rate` | 증거금 비율 | string | Y | 84 |  |
| `rprs_mrkt_kor_name` | 대표 시장 한글 명 | string | Y | 40 |  |
| `new_hgpr_lwpr_cls_code` | 신 고가 저가 구분 코드 | string | Y | 10 |  |
| `bstp_kor_isnm` | 업종 한글 종목명 | string | Y | 40 |  |
| `temp_stop_yn` | 임시 정지 여부 | string | Y | 1 |  |
| `oprc_rang_cont_yn` | 시가 범위 연장 여부 | string | Y | 1 |  |
| `clpr_rang_cont_yn` | 종가 범위 연장 여부 | string | Y | 1 |  |
| `crdt_able_yn` | 신용 가능 여부 | string | Y | 1 |  |
| `grmn_rate_cls_code` | 보증금 비율 구분 코드 | string | Y | 3 |  |
| `elw_pblc_yn` | ELW 발행 여부 | string | Y | 1 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `prdy_vrss_vol_rate` | 전일 대비 거래량 비율 | string | Y | 84 |  |
| `stck_oprc` | 주식 시가2 | string | Y | 10 |  |
| `stck_hgpr` | 주식 최고가 | string | Y | 10 |  |
| `stck_lwpr` | 주식 최저가 | string | Y | 10 |  |
| `stck_mxpr` | 주식 상한가 | string | Y | 10 |  |
| `stck_llam` | 주식 하한가 | string | Y | 10 |  |
| `stck_sdpr` | 주식 기준가 | string | Y | 10 |  |
| `wghn_avrg_stck_prc` | 가중 평균 주식 가격 | string | Y | 192 |  |
| `hts_frgn_ehrt` | HTS 외국인 소진율 | string | Y | 82 |  |
| `frgn_ntby_qty` | 외국인 순매수 수량 | string | Y | 12 |  |
| `pgtr_ntby_qty` | 프로그램매매 순매수 수량 | string | Y | 18 |  |
| `pvt_scnd_dmrs_prc` | 피벗 2차 디저항 가격 | string | Y | 10 |  |
| `pvt_frst_dmrs_prc` | 피벗 1차 디저항 가격 | string | Y | 10 |  |
| `pvt_pont_val` | 피벗 포인트 값 | string | Y | 10 |  |
| `pvt_frst_dmsp_prc` | 피벗 1차 디지지 가격 | string | Y | 10 |  |
| `pvt_scnd_dmsp_prc` | 피벗 2차 디지지 가격 | string | Y | 10 |  |
| `dmrs_val` | 디저항 값 | string | Y | 10 |  |
| `dmsp_val` | 디지지 값 | string | Y | 10 |  |
| `cpfn` | 자본금 | string | Y | 22 |  |
| `rstc_wdth_prc` | 제한 폭 가격 | string | Y | 10 |  |
| `stck_fcam` | 주식 액면가 | string | Y | 11 |  |
| `stck_sspr` | 주식 대용가 | string | Y | 10 |  |
| `aspr_unit` | 호가단위 | string | Y | 10 |  |
| `hts_deal_qty_unit_val` | HTS 매매 수량 단위 값 | string | Y | 10 |  |
| `lstn_stcn` | 상장 주수 | string | Y | 18 |  |
| `hts_avls` | HTS 시가총액 | string | Y | 18 |  |
| `per` | PER | string | Y | 82 |  |
| `pbr` | PBR | string | Y | 82 |  |
| `stac_month` | 결산 월 | string | Y | 2 |  |
| `vol_tnrt` | 거래량 회전율 | string | Y | 82 |  |
| `eps` | EPS | string | Y | 112 |  |
| `bps` | BPS | string | Y | 112 |  |
| `d250_hgpr` | 250일 최고가 | string | Y | 10 |  |
| `d250_hgpr_date` | 250일 최고가 일자 | string | Y | 8 |  |
| `d250_hgpr_vrss_prpr_rate` | 250일 최고가 대비 현재가 비율 | string | Y | 84 |  |
| `d250_lwpr` | 250일 최저가 | string | Y | 10 |  |
| `d250_lwpr_date` | 250일 최저가 일자 | string | Y | 8 |  |
| `d250_lwpr_vrss_prpr_rate` | 250일 최저가 대비 현재가 비율 | string | Y | 84 |  |
| `stck_dryy_hgpr` | 주식 연중 최고가 | string | Y | 10 |  |
| `dryy_hgpr_vrss_prpr_rate` | 연중 최고가 대비 현재가 비율 | string | Y | 84 |  |
| `dryy_hgpr_date` | 연중 최고가 일자 | string | Y | 8 |  |
| `stck_dryy_lwpr` | 주식 연중 최저가 | string | Y | 10 |  |
| `dryy_lwpr_vrss_prpr_rate` | 연중 최저가 대비 현재가 비율 | string | Y | 84 |  |
| `dryy_lwpr_date` | 연중 최저가 일자 | string | Y | 8 |  |
| `w52_hgpr` | 52주일 최고가 | string | Y | 10 |  |
| `w52_hgpr_vrss_prpr_ctrt` | 52주일 최고가 대비 현재가 대비 | string | Y | 82 |  |
| `w52_hgpr_date` | 52주일 최고가 일자 | string | Y | 8 |  |
| `w52_lwpr` | 52주일 최저가 | string | Y | 10 |  |
| `w52_lwpr_vrss_prpr_ctrt` | 52주일 최저가 대비 현재가 대비 | string | Y | 82 |  |
| `w52_lwpr_date` | 52주일 최저가 일자 | string | Y | 8 |  |
| `whol_loan_rmnd_rate` | 전체 융자 잔고 비율 | string | Y | 84 |  |
| `ssts_yn` | 공매도가능여부 | string | Y | 1 |  |
| `stck_shrn_iscd` | 주식 단축 종목코드 | string | Y | 9 |  |
| `fcam_cnnm` | 액면가 통화명 | string | Y | 20 |  |
| `cpfn_cnnm` | 자본금 통화명 | string | Y | 20 |  |
| `apprch_rate` | 접근도 | string | Y | 112 |  |
| `frgn_hldn_qty` | 외국인 보유 수량 | string | Y | 18 |  |
| `vi_cls_code` | VI적용구분코드 | string | Y | 1 |  |
| `ovtm_vi_cls_code` | 시간외단일가VI적용구분코드 | string | Y | 1 |  |
| `last_ssts_cntg_qty` | 최종 공매도 체결 수량 | string | Y | 12 |  |
| `invt_caful_yn` | 투자유의여부 | string | Y | 1 |  |
| `mrkt_warn_cls_code` | 시장경고코드 | string | Y | 2 |  |
| `short_over_yn` | 단기과열여부 | string | Y | 1 |  |
| `sltr_yn` | 정리매매여부 | string | Y | 1 |  |
| `mang_issu_cls_code` | 관리종목여부 | string | Y | 1 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code": "J",  "fid_input_iscd": "000660"  }
```

**Response Example:**
```
{    "output": {      "iscd_stat_cls_code": "55",      "marg_rate": "20.00",      "rprs_mrkt_kor_name": "KOSPI200",      "bstp_kor_isnm": "전기.전자",      "temp_stop_yn": "N",      "oprc_rang_cont_yn": "N",      "clpr_rang_cont_yn": "N",      "crdt_able_yn": "Y",      "grmn_rate_cls_code": "40",      "elw_pblc_yn": "Y",      "stck_prpr": "128500",      "prdy_vrss": "0",      "prdy_vrss_sign": "3",      "prdy_ctrt": "0.00",      "acml_tr_pbmn": "344570137500",      "acml_vol": "2669075",      "prdy_vrss_vol_rate": "75.14",      "stck_oprc": "128500",      "stck_hgpr": "130000",      "stck_lwpr": "128500",      "stck_mxpr": "167000",      "stck_llam": "90000",      "stck_sdpr": "128500",      "wghn_avrg_stck_prc": "129097.23",      "hts_frgn_ehrt": "49.48",      "frgn_ntby_qty": "0",      "pgtr_ntby_qty": "287715",      "pvt_scnd_dmrs_prc": "131833",      "pvt_frst_dmrs_prc": "130166",      "pvt_pont_val": "128333",      "pvt_frst_dmsp_prc": "126666",      "pvt_scnd_dmsp_prc": "124833",      "dmrs_val": "129250",      "dmsp_val": "125750",      "cpfn": "36577",      "rstc_wdth_prc": "38500",      "stck_fcam": "5000",      "stck_sspr": "97660",      "aspr_unit": "500",      "hts_deal_qty_unit_val": "1",      "lstn_stcn": "728002365",      "hts_avls": "935483",      "per": "19.67",      "pbr": "1.72",      "stac_month": "12",      "vol_tnrt": "0.37",      "eps": "6532.00",      "bps": "74721.00",      "d250_hgpr": "149500",      "d250_hgpr_date": "20210225",      "d250_hgpr_vrss_prpr_rate": "-14.05",      "d250_lwpr": "90500",      "d250_lwpr_date": "20211013",      "d250_lwpr_vrss_prpr_rate": "41.99",      "stck_dryy_hgpr": "132500",      "dryy_hgpr_vrss_prpr_rate": "-3.02",      "dryy_hgpr_date": "20220103",      "stck_dryy_lwpr": "121500",      "dryy_lwpr_vrss_prpr_rate": "5.76",      "dryy_lwpr_date": "20220105",      "w52_hgpr": "149500",      "w52_hgpr_vrss_prpr_ctrt": "-14.05",      "w52_hgpr_date": "20210225",      "w52_lwpr": "90500",      "w52_lwpr_vrss_prpr_ctrt": "41.99",      "w52_lwpr_date": "20211013",      "whol_loan_rmnd_rate": "0.22",      "ssts_yn": "Y",      "stck_shrn_iscd": "000660",      "fcam_cnnm": "5,000",      "cpfn_cnnm": "36,576 억",      "frgn_hldn_qty": "360220601",      "vi_cls_code": "N",      "ovtm_vi_cls_code": "N",      "last_ssts_cntg_qty": "43916",      "invt_caful_yn": "N",      "mrkt_warn_cls_code": "00",      "short_over_yn": "N",      "sltr_yn": "N"    },    "rt_cd": "0",    "msg_cd": "MCA00000",    "msg1": "정상처리 되었습니다!"  }
```

---
### 26. 국내주식 시간외현재가

| Field | Value |
|---|---|
| Sheet | `국내주식 시간외현재가` |
| Menu | [국내주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/inquire-overtime-price` |
| TR_ID (실전) | `FHPST02300000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (주식 J) |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object | Y |  |  |
| `bstp_kor_isnm` | 업종 한글 종목명 | string | Y | 40 | ※ 거래소 정보로 특정 종목은 업종구분이 없어 데이터 미회신 |
| `mang_issu_cls_name` | 관리 종목 구분 명 | string | Y | 40 |  |
| `ovtm_untp_prpr` | 시간외 단일가 현재가 | string | Y | 10 |  |
| `ovtm_untp_prdy_vrss` | 시간외 단일가 전일 대비 | string | Y | 10 |  |
| `ovtm_untp_prdy_vrss_sign` | 시간외 단일가 전일 대비 부호 | string | Y | 1 |  |
| `ovtm_untp_prdy_ctrt` | 시간외 단일가 전일 대비율 | string | Y | 82 |  |
| `ovtm_untp_vol` | 시간외 단일가 거래량 | string | Y | 18 |  |
| `ovtm_untp_tr_pbmn` | 시간외 단일가 거래 대금 | string | Y | 18 |  |
| `ovtm_untp_mxpr` | 시간외 단일가 상한가 | string | Y | 18 |  |
| `ovtm_untp_llam` | 시간외 단일가 하한가 | string | Y | 18 |  |
| `ovtm_untp_oprc` | 시간외 단일가 시가2 | string | Y | 10 |  |
| `ovtm_untp_hgpr` | 시간외 단일가 최고가 | string | Y | 10 |  |
| `ovtm_untp_lwpr` | 시간외 단일가 최저가 | string | Y | 10 |  |
| `marg_rate` | 증거금 비율 | string | Y | 84 |  |
| `ovtm_untp_antc_cnpr` | 시간외 단일가 예상 체결가 | string | Y | 10 |  |
| `ovtm_untp_antc_cntg_vrss` | 시간외 단일가 예상 체결 대비 | string | Y | 10 |  |
| `ovtm_untp_antc_cntg_vrss_sign` | 시간외 단일가 예상 체결 대비 | string | Y | 1 |  |
| `ovtm_untp_antc_cntg_ctrt` | 시간외 단일가 예상 체결 대비율 | string | Y | 82 |  |
| `ovtm_untp_antc_cnqn` | 시간외 단일가 예상 체결량 | string | Y | 18 |  |
| `crdt_able_yn` | 신용 가능 여부 | string | Y | 1 |  |
| `new_lstn_cls_name` | 신규 상장 구분 명 | string | Y | 40 |  |
| `sltr_yn` | 정리매매 여부 | string | Y | 1 |  |
| `mang_issu_yn` | 관리 종목 여부 | string | Y | 1 |  |
| `mrkt_warn_cls_code` | 시장 경고 구분 코드 | string | Y | 2 |  |
| `trht_yn` | 거래정지 여부 | string | Y | 1 |  |
| `vlnt_deal_cls_name` | 임의 매매 구분 명 | string | Y | 16 |  |
| `ovtm_untp_sdpr` | 시간외 단일가 기준가 | string | Y | 10 |  |
| `mrkt_warn_cls_name` | 시장 경구 구분 명 | string | Y | 40 |  |
| `revl_issu_reas_name` | 재평가 종목 사유 명 | string | Y | 40 |  |
| `insn_pbnt_yn` | 불성실 공시 여부 | string | Y | 1 |  |
| `flng_cls_name` | 락 구분 이름 | string | Y | 40 |  |
| `rprs_mrkt_kor_name` | 대표 시장 한글 명 | string | Y | 40 |  |
| `ovtm_vi_cls_code` | 시간외단일가VI적용구분코드 | string | Y | 1 |  |
| `bidp` | 매수호가 | string | Y | 10 |  |
| `askp` | 매도호가 | string | Y | 10 |  |

**Request Example:**
```
fid_cond_mrkt_div_code:J  fid_input_iscd:005930
```

**Response Example:**
```
{      "output": {          "bstp_kor_isnm": "전기.전자",          "ovtm_untp_prpr": "83600",          "ovtm_untp_prdy_vrss": "-100",          "ovtm_untp_prdy_vrss_sign": "5",          "ovtm_untp_prdy_ctrt": "-0.12",          "ovtm_untp_vol": "3500",          "ovtm_untp_tr_pbmn": "292600000",          "ovtm_untp_mxpr": "92000",          "ovtm_untp_llam": "75400",          "ovtm_untp_oprc": "83600",          "ovtm_untp_hgpr": "83600",          "ovtm_untp_lwpr": "83600",          "marg_rate": "20.00",          "ovtm_untp_antc_cnpr": "83500",          "ovtm_untp_antc_cntg_vrss": "-200",          "ovtm_untp_antc_cntg_vrss_sign": "5",          "ovtm_untp_antc_cntg_ctrt": "-0.24",          "ovtm_untp_antc_cnqn": "4442",          "crdt_able_yn": "Y",          "new_lstn_cls_name": "        ",          "sltr_yn": "N",          "mang_issu_yn": "N",          "mrkt_warn_cls_code": "00",          "trht_yn": "N",          "vlnt_deal_cls_name": " ",          "ovtm_untp_sdpr": "83700",          "insn_pbnt_yn": "N",          "rprs_mrkt_kor_name": "KOSPI200",          "ovtm_vi_cls_code": "N",          "bidp": "83600",          "askp": "83700"      },      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 27. ETF 구성종목시세

| Field | Value |
|---|---|
| Sheet | `ETF 구성종목시세` |
| Menu | [국내주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/etfetn/v1/quotations/inquire-component-stock-price` |
| TR_ID (실전) | `FHKST121600C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건시장분류코드 | string | Y | 2 | 시장구분코드 (J) |
| `FID_INPUT_ISCD` | 입력종목코드 | string | Y | 12 | 종목코드 |
| `FID_COND_SCR_DIV_CODE` | 조건화면분류코드 | string | Y | 5 | Unique key( 11216 ) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `etf_cnfg_issu_avls` | ETF구성종목시가총액 | string | Y | 18 |  |
| `nav` | NAV | string | Y | 112 |  |
| `nav_prdy_vrss_sign` | NAV 전일 대비 부호 | string | Y | 1 |  |
| `nav_prdy_vrss` | NAV 전일 대비 | string | Y | 112 |  |
| `nav_prdy_ctrt` | NAV 전일 대비율 | string | Y | 84 |  |
| `etf_ntas_ttam` | ETF 순자산 총액 | string | Y | 22 |  |
| `prdy_clpr_nav` | NAV전일종가 | string | Y | 112 |  |
| `oprc_nav` | NAV시가 | string | Y | 112 |  |
| `hprc_nav` | NAV고가 | string | Y | 112 |  |
| `lprc_nav` | NAV저가 | string | Y | 112 |  |
| `etf_cu_unit_scrt_cnt` | ETF CU 단위 증권 수 | string | Y | 18 |  |
| `etf_cnfg_issu_cnt` | ETF 구성 종목 수 | string | Y | 18 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `stck_shrn_iscd` | 주식 단축 종목코드 | string | Y | 9 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |
| `tday_rsfl_rate` | 당일 등락 비율 | string | Y | 52 |  |
| `prdy_vrss_vol` | 전일 대비 거래량 | string | Y | 18 |  |
| `tr_pbmn_tnrt` | 거래대금회전율 | string | Y | 82 |  |
| `hts_avls` | HTS 시가총액 | string | Y | 18 |  |
| `etf_cnfg_issu_avls` | ETF구성종목시가총액 | string | Y | 18 |  |
| `etf_cnfg_issu_rlim` | ETF구성종목비중 | string | Y | 72 |  |
| `etf_vltn_amt` | ETF구성종목내평가금액 | string | Y | 18 |  |

**Request Example:**
```
fid_cond_mrkt_div_code:J  fid_input_iscd:069500  fid_cond_scr_div_code:11216
```

**Response Example:**
```
{      "output1": {          "stck_prpr": "37195",          "prdy_vrss": "-365",          "prdy_vrss_sign": "5",          "prdy_ctrt": "-0.97",          "etf_cnfg_issu_avls": "184153",          "nav": "37301.11",          "nav_prdy_vrss_sign": "5",          "nav_prdy_vrss": "-347.36",          "nav_prdy_ctrt": "-0.92",          "etf_ntas_ttam": "68256",          "prdy_clpr_nav": "37648.47",          "oprc_nav": "37653.39",          "hprc_nav": "37720.17",          "lprc_nav": "37223.93",          "etf_cu_unit_scrt_cnt": "50000",          "etf_cnfg_issu_cnt": "201"      },      "output2": [          {              "stck_shrn_iscd": "005930",              "hts_kor_isnm": "삼성전자",              "stck_prpr": "83700",              "prdy_vrss": "-400",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-0.48",              "acml_vol": "16967184",              "acml_tr_pbmn": "1421776834400",              "tday_rsfl_rate": "2.02",              "prdy_vrss_vol": "-8570824",              "tr_pbmn_tnrt": "0.28",              "hts_avls": "4996708",              "etf_cnfg_issu_avls": "601300800",              "etf_cnfg_issu_rlim": "32.65",              "etf_vltn_amt": "604174400"          },          {              "stck_shrn_iscd": "000660",              "hts_kor_isnm": "SK하이닉스",              "stck_prpr": "187400",              "prdy_vrss": "-1000",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-0.53",              "acml_vol": "3042349",              "acml_tr_pbmn": "575151315700",              "tday_rsfl_rate": "2.34",              "prdy_vrss_vol": "-1055882",              "tr_pbmn_tnrt": "0.42",              "hts_avls": "1364276",              "etf_cnfg_issu_avls": "160039600",              "etf_cnfg_issu_rlim": "8.69",              "etf_vltn_amt": "160893600"          },          {              "stck_shrn_iscd": "005380",              "hts_kor_isnm": "현대차",              "stck_prpr": "238000",              "prdy_vrss": "-3000",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-1.24",              "acml_vol": "993944",              "acml_tr_pbmn": "237608070000",              "tday_rsfl_rate": "1.87",              "prdy_vrss_vol": "-859847",              "tr_pbmn_tnrt": "0.47",              "hts_avls": "503445",              "etf_cnfg_issu_avls": "50694000",              "etf_cnfg_issu_rlim": "2.75",              "etf_vltn_amt": "51333000"          },          {              "stck_shrn_iscd": "068270",              "hts_kor_isnm": "셀트리온",              "stck_prpr": "182200",              "prdy_vrss": "2700",              "prdy_vrss_sign": "2",              "prdy_ctrt": "1.50",              "acml_vol": "473566",              "acml_tr_pbmn": "85712403800",              "tday_rsfl_rate": "2.90",              "prdy_vrss_vol": "-52048",              "tr_pbmn_tnrt": "0.22",              "hts_avls": "397287",              "etf_cnfg_issu_avls": "46643200",              "etf_cnfg_issu_rlim": "2.53",              "etf_vltn_amt"
```

---
### 28. 주식현재가 시간외시간별체결

| Field | Value |
|---|---|
| Sheet | `주식현재가 시간외시간별체결` |
| Menu | [국내주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/inquire-time-overtimeconclusion` |
| TR_ID (실전) | `FHPST02310000` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | J : 주식, ETF, ETN |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 종목번호 (6자리)  ETN의 경우, Q로 시작 (EX. Q500001) |
| `FID_HOUR_CLS_CODE` | 시간 구분 코드 | string | Y | 5 | 1 : 시간외 (Default) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세1 | object | N |  | 기본정보 |
| `ovtm_untp_prpr` | 시간외 단일가 현재가 | string | N | 10 |  |
| `ovtm_untp_prdy_vrss` | 시간외 단일가 전일 대비 | string | N | 10 |  |
| `ovtm_untp_prdy_vrss_sign` | 시간외 단일가 전일 대비 부호 | string | N | 1 |  |
| `ovtm_untp_prdy_ctrt` | 시간외 단일가 전일 대비율 | string | N | 11 |  |
| `ovtm_untp_vol` | 시간외 단일가 거래량 | string | N | 18 |  |
| `ovtm_untp_tr_pbmn` | 시간외 단일가 거래 대금 | string | N | 18 |  |
| `ovtm_untp_mxpr` | 시간외 단일가 상한가 | string | N | 18 |  |
| `ovtm_untp_llam` | 시간외 단일가 하한가 | string | N | 18 |  |
| `ovtm_untp_oprc` | 시간외 단일가 시가2 | string | N | 10 |  |
| `ovtm_untp_hgpr` | 시간외 단일가 최고가 | string | N | 10 |  |
| `ovtm_untp_lwpr` | 시간외 단일가 최저가 | string | N | 10 |  |
| `ovtm_untp_antc_cnpr` | 시간외 단일가 예상 체결가 | string | N | 10 |  |
| `ovtm_untp_antc_cntg_vrss` | 시간외 단일가 예상 체결 대비 | string | N | 10 |  |
| `ovtm_untp_antc_cntg_vrss_sign` | 시간외 단일가 예상 체결 대비 | string | N | 1 |  |
| `ovtm_untp_antc_cntg_ctrt` | 시간외 단일가 예상 체결 대비율 | string | N | 11 |  |
| `ovtm_untp_antc_vol` | 시간외 단일가 예상 거래량 | string | N | 18 |  |
| `uplm_sign` | 상한 부호 | string | N | 1 |  |
| `lslm_sign` | 하한 부호 | string | N | 1 |  |
| `output2` | 응답상세2 | object array | N |  | Array 시간별체결 정보 |
| `stck_cntg_hour` | 주식 체결 시간 | string | N | 6 |  |
| `stck_prpr` | 주식 현재가 | string | N | 10 |  |
| `prdy_vrss` | 전일 대비 | string | N | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | N | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | N | 11 |  |
| `askp` | 매도호가 | string | N | 10 |  |
| `bidp` | 매수호가 | string | N | 10 |  |
| `acml_vol` | 누적 거래량 | string | N | 18 |  |
| `cntg_vol` | 체결 거래량 | string | N | 18 |  |

**Request Example:**
```
"input": {              "fid_cond_mrkt_div_code": "J",              "fid_hour_CLS_CODE": "1",              "fid_input_iscd": "018000"          }
```

**Response Example:**
```
"output1": {              "lslm_sign": "4",              "ovtm_untp_antc_cnpr": "0",              "ovtm_untp_antc_cntg_ctrt": "0.00",              "ovtm_untp_antc_cntg_vrss": "0",              "ovtm_untp_antc_cntg_vrss_sign": "3",              "ovtm_untp_antc_vol": "0",              "ovtm_untp_hgpr": "2900",              "ovtm_untp_llam": "2615",              "ovtm_untp_lwpr": "2835",              "ovtm_untp_mxpr": "3195",              "ovtm_untp_oprc": "2900",              "ovtm_untp_prdy_ctrt": "-2.41",              "ovtm_untp_prdy_vrss": "-70",              "ovtm_untp_prdy_vrss_sign": "5",              "ovtm_untp_prpr": "2835",              "ovtm_untp_tr_pbmn": "194135625",              "ovtm_untp_vol": "68086",              "uplm_sign": "1"          },          "output2": [              {                  "acml_vol": "68086",                  "askp": "2840",                  "bidp": "2835",                  "cntg_vol": "12865",                  "prdy_ctrt": "-2.41",                  "prdy_vrss": "-70",                  "prdy_vrss_sign": "5",                  "stck_cntg_hour": "180025",                  "stck_prpr": "2835"              },              {                  "acml_vol": "55221",                  "askp": "2840",                  "bidp": "2835",                  "cntg_vol": "6852",                  "prdy_ctrt": "-2.24",                  "prdy_vrss": "-65",                  "prdy_vrss_sign": "5",                  "stck_cntg_hour": "175026",                  "stck_prpr": "2840"              },  ....              {                  "acml_vol": "668",                  "askp": "2900",                  "bidp": "2895",                  "cntg_vol": "668",                  "prdy_ctrt": "-0.17",                  "prdy_vrss": "-5",                  "prdy_vrss_sign": "5",                  "stck_cntg_hour": "161022",                  "stck_prpr": "2900"              }          ],          "rt_cd": "0"
```

---
### 29. NAV 비교추이(종목)

| Field | Value |
|---|---|
| Sheet | `NAV 비교추이(종목)` |
| Menu | [국내주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/etfetn/v1/quotations/nav-comparison-trend` |
| TR_ID (실전) | `FHPST02440000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | J |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `stck_prpr` | 주식 현재가 | string | Y | 8 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 8 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 2 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 4 |  |
| `acml_vol` | 누적 거래량 | string | Y | 12 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 60 |  |
| `stck_prdy_clpr` | 주식 전일 종가 | string | Y | 10 |  |
| `stck_oprc` | 주식 시가2 | string | Y | 10 |  |
| `stck_hgpr` | 주식 최고가 | string | Y | 10 |  |
| `stck_lwpr` | 주식 최저가 | string | Y | 10 |  |
| `stck_mxpr` | 주식 상한가 | string | Y | 10 |  |
| `stck_llam` | 주식 하한가 | string | Y | 10 |  |
| `output2` | 응답상세 | object | Y |  |  |
| `nav` | NAV | string | Y | 11 |  |
| `nav_prdy_vrss_sign` | NAV 전일 대비 부호 | string | Y | 1 |  |
| `nav_prdy_vrss` | NAV 전일 대비 | string | Y | 11 |  |
| `nav_prdy_ctrt` | NAV 전일 대비율 | string | Y | 8 |  |
| `prdy_clpr_nav` | NAV전일종가 | string | Y | 11 |  |
| `oprc_nav` | NAV시가 | string | Y | 11 |  |
| `hprc_nav` | NAV고가 | string | Y | 11 |  |
| `lprc_nav` | NAV저가 | string | Y | 11 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"J",  "fid_input_iscd":"069500"  }
```

**Response Example:**
```
{      "output1": {          "stck_prpr": "36090",          "prdy_vrss": "110",          "prdy_vrss_sign": "2",          "prdy_ctrt": "0.31",          "acml_vol": "3720111",          "acml_tr_pbmn": "134826697200",          "stck_prdy_clpr": "35980",          "stck_oprc": "36300",          "stck_hgpr": "36510",          "stck_lwpr": "36040",          "stck_mxpr": "46770",          "stck_llam": "25190"      },      "output2": {          "nav": "36127.30",          "nav_prdy_vrss_sign": "2",          "nav_prdy_vrss": "91.08",          "nav_prdy_ctrt": "0.25",          "prdy_clpr_nav": "36036.22",          "oprc_nav": "36065.99",          "hprc_nav": "36543.62",          "lprc_nav": "36065.99"      },      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 30. 주식현재가 시간외일자별주가

| Field | Value |
|---|---|
| Sheet | `주식현재가 시간외일자별주가` |
| Menu | [국내주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/inquire-daily-overtimeprice` |
| TR_ID (실전) | `FHPST02320000` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | FID 조건 시장 분류 코드 | string | Y | 2 | J : 주식, ETF, ETN |
| `FID_INPUT_ISCD` | FID 입력 종목코드 | string | Y | 12 | 종목번호 (6자리)  ETN의 경우, Q로 시작 (EX. Q500001) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세1 | object | N |  | 기본정보 |
| `ovtm_untp_prpr` | 시간외 단일가 현재가 | string | N | 10 |  |
| `ovtm_untp_prdy_vrss` | 시간외 단일가 전일 대비 | string | N | 10 |  |
| `ovtm_untp_prdy_vrss_sign` | 시간외 단일가 전일 대비 부호 | string | N | 1 |  |
| `ovtm_untp_prdy_ctrt` | 시간외 단일가 전일 대비율 | string | N | 11 | 11(8.2) |
| `ovtm_untp_vol` | 시간외 단일가 거래량 | string | N | 18 |  |
| `ovtm_untp_tr_pbmn` | 시간외 단일가 거래 대금 | string | N | 18 |  |
| `ovtm_untp_mxpr` | 시간외 단일가 상한가 | string | N | 18 |  |
| `ovtm_untp_llam` | 시간외 단일가 하한가 | string | N | 18 |  |
| `ovtm_untp_oprc` | 시간외 단일가 시가2 | string | N | 10 |  |
| `ovtm_untp_hgpr` | 시간외 단일가 최고가 | string | N | 10 |  |
| `ovtm_untp_lwpr` | 시간외 단일가 최저가 | string | N | 10 |  |
| `ovtm_untp_antc_cnpr` | 시간외 단일가 예상 체결가 | string | N | 10 |  |
| `ovtm_untp_antc_cntg_vrss` | 시간외 단일가 예상 체결 대비 | string | N | 10 |  |
| `ovtm_untp_antc_cntg_vrss_sign` | 시간외 단일가 예상 체결 대비 | string | N | 1 |  |
| `ovtm_untp_antc_cntg_ctrt` | 시간외 단일가 예상 체결 대비율 | string | N | 11 | 11(8.2) |
| `ovtm_untp_antc_vol` | 시간외 단일가 예상 거래량 | string | N | 18 |  |
| `output2` | 응답상세2 | object array | N |  | Array 일자별 정보 |
| `stck_bsop_date` | 주식 영업 일자 | string | N | 8 |  |
| `ovtm_untp_prpr` | 시간외 단일가 현재가 | string | N | 10 |  |
| `ovtm_untp_prdy_vrss` | 시간외 단일가 전일 대비 | string | N | 10 |  |
| `ovtm_untp_prdy_vrss_sign` | 시간외 단일가 전일 대비 부호 | string | N | 1 |  |
| `ovtm_untp_prdy_ctrt` | 시간외 단일가 전일 대비율 | string | N | 11 | 11(8.2) |
| `ovtm_untp_vol` | 시간외 단일가 거래량 | string | N | 18 |  |
| `stck_clpr` | 주식 종가 | string | N | 10 |  |
| `prdy_vrss` | 전일 대비 | string | N | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | N | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | N | 11 | 11(8.2) |
| `acml_vol` | 누적 거래량 | string | N | 18 |  |
| `ovtm_untp_tr_pbmn` | 시간외 단일가 거래대금 | string | N | 18 |  |

**Request Example:**
```
'"input": {'                  '"fid_cond_mrkt_div_code":"J"'                  ','                  '"fid_input_iscd":"000660"'              '}'
```

**Response Example:**
```
"output1": {              "ovtm_untp_antc_cnpr": "0",              "ovtm_untp_antc_cntg_ctrt": "0.00",              "ovtm_untp_antc_cntg_vrss": "0",              "ovtm_untp_antc_cntg_vrss_sign": "3",              "ovtm_untp_antc_vol": "0",              "ovtm_untp_hgpr": "106000",              "ovtm_untp_llam": "95000",              "ovtm_untp_lwpr": "105500",              "ovtm_untp_mxpr": "116000",              "ovtm_untp_oprc": "0",              "ovtm_untp_prdy_ctrt": "0.47",              "ovtm_untp_prdy_vrss": "500",              "ovtm_untp_prdy_vrss_sign": "2",              "ovtm_untp_prpr": "106000",              "ovtm_untp_tr_pbmn": "1348318000",              "ovtm_untp_vol": "12740"          },          "output2": [              {                  "acml_vol": "4640744",                  "ovtm_untp_prdy_ctrt": "0.47",                  "ovtm_untp_prdy_vrss": "500",                  "ovtm_untp_prdy_vrss_sign": "2",                  "ovtm_untp_prpr": "106000",                  "ovtm_untp_tr_pbmn": "1348318000",                  "ovtm_untp_vol": "12740",                  "prdy_ctrt": "-0.47",                  "prdy_vrss": "-500",                  "prdy_vrss_sign": "5",                  "stck_bsop_date": "20220609",                  "stck_clpr": "105500"              },              {                  "acml_vol": "3075530",                  "ovtm_untp_prdy_ctrt": "0.47",                  "ovtm_untp_prdy_vrss": "500",                  "ovtm_untp_prdy_vrss_sign": "2",                  "ovtm_untp_prpr": "106500",                  "ovtm_untp_tr_pbmn": "1882068000",                  "ovtm_untp_vol": "17672",                  "prdy_ctrt": "1.92",                  "prdy_vrss": "2000",  ......              {                  "acml_vol": "2969516",                  "ovtm_untp_prdy_ctrt": "0.00",                  "ovtm_untp_prdy_vrss": "0",                  "ovtm_untp_prdy_vrss_sign": "3",                  "ovtm_untp_prpr": "111000",                  "ovtm_untp_tr_pbmn": "2273650500",                  "ovtm_untp_vol": "20565",                  "prdy_ctrt": "2.78",                  "prdy_vrss": "3000",                  "prdy_vrss_sign": "2",                  "stck_bsop_date": "20220426",                  "stck_clpr": "111000"              }          ],          "rt_cd": "0"
```

---
### 31. 국내주식 시간외호가

| Field | Value |
|---|---|
| Sheet | `국내주식 시간외호가` |
| Menu | [국내주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/inquire-overtime-asking-price` |
| TR_ID (실전) | `FHPST02300400` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 종목코드 |
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (주식 J) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `ovtm_untp_last_hour` | 시간외 단일가 최종 시간 | string | Y | 6 |  |
| `ovtm_untp_askp1` | 시간외 단일가 매도호가1 | string | Y | 10 |  |
| `ovtm_untp_askp2` | 시간외 단일가 매도호가2 | string | Y | 10 |  |
| `ovtm_untp_askp3` | 시간외 단일가 매도호가3 | string | Y | 10 |  |
| `ovtm_untp_askp4` | 시간외 단일가 매도호가4 | string | Y | 10 |  |
| `ovtm_untp_askp5` | 시간외 단일가 매도호가5 | string | Y | 10 |  |
| `ovtm_untp_askp6` | 시간외 단일가 매도호가6 | string | Y | 10 |  |
| `ovtm_untp_askp7` | 시간외 단일가 매도호가7 | string | Y | 10 |  |
| `ovtm_untp_askp8` | 시간외 단일가 매도호가8 | string | Y | 10 |  |
| `ovtm_untp_askp9` | 시간외 단일가 매도호가9 | string | Y | 10 |  |
| `ovtm_untp_askp10` | 시간외 단일가 매도호가10 | string | Y | 10 |  |
| `ovtm_untp_bidp1` | 시간외 단일가 매수호가1 | string | Y | 10 |  |
| `ovtm_untp_bidp2` | 시간외 단일가 매수호가2 | string | Y | 10 |  |
| `ovtm_untp_bidp3` | 시간외 단일가 매수호가3 | string | Y | 10 |  |
| `ovtm_untp_bidp4` | 시간외 단일가 매수호가4 | string | Y | 10 |  |
| `ovtm_untp_bidp5` | 시간외 단일가 매수호가5 | string | Y | 10 |  |
| `ovtm_untp_bidp6` | 시간외 단일가 매수호가6 | string | Y | 10 |  |
| `ovtm_untp_bidp7` | 시간외 단일가 매수호가7 | string | Y | 10 |  |
| `ovtm_untp_bidp8` | 시간외 단일가 매수호가8 | string | Y | 10 |  |
| `ovtm_untp_bidp9` | 시간외 단일가 매수호가9 | string | Y | 10 |  |
| `ovtm_untp_bidp10` | 시간외 단일가 매수호가10 | string | Y | 10 |  |
| `ovtm_untp_askp_icdc1` | 시간외 단일가 매도호가 증감1 | string | Y | 10 |  |
| `ovtm_untp_askp_icdc2` | 시간외 단일가 매도호가 증감2 | string | Y | 10 |  |
| `ovtm_untp_askp_icdc3` | 시간외 단일가 매도호가 증감3 | string | Y | 10 |  |
| `ovtm_untp_askp_icdc4` | 시간외 단일가 매도호가 증감4 | string | Y | 10 |  |
| `ovtm_untp_askp_icdc5` | 시간외 단일가 매도호가 증감5 | string | Y | 10 |  |
| `ovtm_untp_askp_icdc6` | 시간외 단일가 매도호가 증감6 | string | Y | 10 |  |
| `ovtm_untp_askp_icdc7` | 시간외 단일가 매도호가 증감7 | string | Y | 10 |  |
| `ovtm_untp_askp_icdc8` | 시간외 단일가 매도호가 증감8 | string | Y | 10 |  |
| `ovtm_untp_askp_icdc9` | 시간외 단일가 매도호가 증감9 | string | Y | 10 |  |
| `ovtm_untp_askp_icdc10` | 시간외 단일가 매도호가 증감10 | string | Y | 10 |  |
| `ovtm_untp_bidp_icdc1` | 시간외 단일가 매수호가 증감1 | string | Y | 10 |  |
| `ovtm_untp_bidp_icdc2` | 시간외 단일가 매수호가 증감2 | string | Y | 10 |  |
| `ovtm_untp_bidp_icdc3` | 시간외 단일가 매수호가 증감3 | string | Y | 10 |  |
| `ovtm_untp_bidp_icdc4` | 시간외 단일가 매수호가 증감4 | string | Y | 10 |  |
| `ovtm_untp_bidp_icdc5` | 시간외 단일가 매수호가 증감5 | string | Y | 10 |  |
| `ovtm_untp_bidp_icdc6` | 시간외 단일가 매수호가 증감6 | string | Y | 10 |  |
| `ovtm_untp_bidp_icdc7` | 시간외 단일가 매수호가 증감7 | string | Y | 10 |  |
| `ovtm_untp_bidp_icdc8` | 시간외 단일가 매수호가 증감8 | string | Y | 10 |  |
| `ovtm_untp_bidp_icdc9` | 시간외 단일가 매수호가 증감9 | string | Y | 10 |  |
| `ovtm_untp_bidp_icdc10` | 시간외 단일가 매수호가 증감10 | string | Y | 10 |  |
| `ovtm_untp_askp_rsqn1` | 시간외 단일가 매도호가 잔량1 | string | Y | 12 |  |
| `ovtm_untp_askp_rsqn2` | 시간외 단일가 매도호가 잔량2 | string | Y | 12 |  |
| `ovtm_untp_askp_rsqn3` | 시간외 단일가 매도호가 잔량3 | string | Y | 12 |  |
| `ovtm_untp_askp_rsqn4` | 시간외 단일가 매도호가 잔량4 | string | Y | 12 |  |
| `ovtm_untp_askp_rsqn5` | 시간외 단일가 매도호가 잔량5 | string | Y | 12 |  |
| `ovtm_untp_askp_rsqn6` | 시간외 단일가 매도호가 잔량6 | string | Y | 12 |  |
| `ovtm_untp_askp_rsqn7` | 시간외 단일가 매도호가 잔량7 | string | Y | 12 |  |
| `ovtm_untp_askp_rsqn8` | 시간외 단일가 매도호가 잔량8 | string | Y | 12 |  |
| `ovtm_untp_askp_rsqn9` | 시간외 단일가 매도호가 잔량9 | string | Y | 12 |  |
| `ovtm_untp_askp_rsqn10` | 시간외 단일가 매도호가 잔량10 | string | Y | 12 |  |
| `ovtm_untp_bidp_rsqn1` | 시간외 단일가 매수호가 잔량1 | string | Y | 12 |  |
| `ovtm_untp_bidp_rsqn2` | 시간외 단일가 매수호가 잔량2 | string | Y | 12 |  |
| `ovtm_untp_bidp_rsqn3` | 시간외 단일가 매수호가 잔량3 | string | Y | 12 |  |
| `ovtm_untp_bidp_rsqn4` | 시간외 단일가 매수호가 잔량4 | string | Y | 12 |  |
| `ovtm_untp_bidp_rsqn5` | 시간외 단일가 매수호가 잔량5 | string | Y | 12 |  |
| `ovtm_untp_bidp_rsqn6` | 시간외 단일가 매수호가 잔량6 | string | Y | 12 |  |
| `ovtm_untp_bidp_rsqn7` | 시간외 단일가 매수호가 잔량7 | string | Y | 12 |  |
| `ovtm_untp_bidp_rsqn8` | 시간외 단일가 매수호가 잔량8 | string | Y | 12 |  |
| `ovtm_untp_bidp_rsqn9` | 시간외 단일가 매수호가 잔량9 | string | Y | 12 |  |
| `ovtm_untp_bidp_rsqn10` | 시간외 단일가 매수호가 잔량10 | string | Y | 12 |  |
| `ovtm_untp_total_askp_rsqn` | 시간외 단일가 총 매도호가 잔량 | string | Y | 12 |  |
| `ovtm_untp_total_bidp_rsqn` | 시간외 단일가 총 매수호가 잔량 | string | Y | 12 |  |
| `ovtm_untp_total_askp_rsqn_icdc` | 시간외 단일가 총 매도호가 잔량 | string | Y | 10 |  |
| `ovtm_untp_total_bidp_rsqn_icdc` | 시간외 단일가 총 매수호가 잔량 | string | Y | 10 |  |
| `ovtm_untp_ntby_bidp_rsqn` | 시간외 단일가 순매수 호가 잔량 | string | Y | 12 |  |
| `total_askp_rsqn` | 총 매도호가 잔량 | string | Y | 12 |  |
| `total_bidp_rsqn` | 총 매수호가 잔량 | string | Y | 12 |  |
| `total_askp_rsqn_icdc` | 총 매도호가 잔량 증감 | string | Y | 10 |  |
| `total_bidp_rsqn_icdc` | 총 매수호가 잔량 증감 | string | Y | 10 |  |
| `ovtm_total_askp_rsqn` | 시간외 총 매도호가 잔량 | string | Y | 12 |  |
| `ovtm_total_bidp_rsqn` | 시간외 총 매수호가 잔량 | string | Y | 12 |  |
| `ovtm_total_askp_icdc` | 시간외 총 매도호가 증감 | string | Y | 10 |  |
| `ovtm_total_bidp_icdc` | 시간외 총 매수호가 증감 | string | Y | 10 |  |

**Request Example:**
```
fid_cond_mrkt_div_code:J  fid_input_iscd:005930
```

**Response Example:**
```
{      "output": {          "ovtm_untp_last_hour": "161847",          "ovtm_untp_askp1": "83600",          "ovtm_untp_askp2": "83700",          "ovtm_untp_askp3": "83800",          "ovtm_untp_askp4": "0",          "ovtm_untp_askp5": "0",          "ovtm_untp_askp6": "0",          "ovtm_untp_askp7": "0",          "ovtm_untp_askp8": "0",          "ovtm_untp_askp9": "0",          "ovtm_untp_askp10": "0",          "ovtm_untp_bidp1": "83500",          "ovtm_untp_bidp2": "83400",          "ovtm_untp_bidp3": "83300",          "ovtm_untp_bidp4": "0",          "ovtm_untp_bidp5": "0",          "ovtm_untp_bidp6": "0",          "ovtm_untp_bidp7": "0",          "ovtm_untp_bidp8": "0",          "ovtm_untp_bidp9": "0",          "ovtm_untp_bidp10": "0",          "ovtm_untp_askp_icdc1": "0",          "ovtm_untp_askp_icdc2": "0",          "ovtm_untp_askp_icdc3": "0",          "ovtm_untp_bidp_icdc1": "1",          "ovtm_untp_bidp_icdc2": "0",          "ovtm_untp_bidp_icdc3": "0",          "ovtm_untp_askp_rsqn1": "4498",          "ovtm_untp_askp_rsqn2": "11671",          "ovtm_untp_askp_rsqn3": "9625",          "ovtm_untp_askp_rsqn4": "0",          "ovtm_untp_askp_rsqn5": "0",          "ovtm_untp_askp_rsqn6": "0",          "ovtm_untp_askp_rsqn7": "0",          "ovtm_untp_askp_rsqn8": "0",          "ovtm_untp_askp_rsqn9": "0",          "ovtm_untp_askp_rsqn10": "0",          "ovtm_untp_bidp_rsqn1": "1219",          "ovtm_untp_bidp_rsqn2": "2242",          "ovtm_untp_bidp_rsqn3": "5603",          "ovtm_untp_bidp_rsqn4": "0",          "ovtm_untp_bidp_rsqn5": "0",          "ovtm_untp_bidp_rsqn6": "0",          "ovtm_untp_bidp_rsqn7": "0",          "ovtm_untp_bidp_rsqn8": "0",          "ovtm_untp_bidp_rsqn9": "0",          "ovtm_untp_bidp_rsqn10": "0",          "ovtm_untp_total_askp_rsqn": "25794",          "ovtm_untp_total_bidp_rsqn": "9064",          "ovtm_untp_total_askp_rsqn_icdc": "0",          "ovtm_untp_total_bidp_rsqn_icdc": "1",          "ovtm_untp_ntby_bidp_rsqn": "-16730",          "total_askp_rsqn": "923970",          "total_bidp_rsqn": "756893",          "total_askp_rsqn_icdc": "0",          "total_bidp_rsqn_icdc": "0",          "ovtm_total_askp_rsqn": "36230",          "ovtm_total_bidp_rsqn": "0",          "ovtm_total_askp_icdc": "0",          "ovtm_total_bidp_icdc": "0"      },      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 32. 주식현재가 당일시간대별체결

| Field | Value |
|---|---|
| Sheet | `주식현재가 당일시간대별체결` |
| Menu | [국내주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/inquire-time-itemconclusion` |
| TR_ID (실전) | `FHPST01060000` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | J:KRX, NX:NXT, UN:통합 |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 종목코드 (ex 005930 삼성전자) |
| `FID_INPUT_HOUR_1` | 입력 시간1 | string | Y | 10 | 입력시간 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  | single |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 11 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `prdy_vol` | 전일 거래량 | string | Y | 18 |  |
| `rprs_mrkt_kor_name` | 대표 시장 한글 명 | string | Y | 40 |  |
| `output2` | 응답상세 | object | Y |  | single |
| `stck_cntg_hour` | 주식 체결 시간 | string | Y | 6 |  |
| `stck_pbpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 11 |  |
| `askp` | 매도호가 | string | Y | 10 |  |
| `bidp` | 매수호가 | string | Y | 10 |  |
| `tday_rltv` | 당일 체결강도 | string | Y | 14 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `cnqn` | 체결량 | string | Y | 18 |  |

**Request Example:**
```
"input": {              "fid_cond_mrkt_div_code": "J",              "fid_input_hour_1": "141200",              "fid_input_iscd": "000660"          }
```

**Response Example:**
```
"output1": {              "acml_vol": "2315529",              "prdy_ctrt": "-2.80",              "prdy_vol": "1638006",              "prdy_vrss": "-3000",              "prdy_vrss_sign": "5",              "rprs_mrkt_kor_name": "KOSPI200",              "stck_prpr": "104000"          },          "output2": [              {                  "acml_vol": "1979727",                  "askp": "105000",                  "bidp": "104500",                  "cnqn": "20",                  "prdy_ctrt": "-2.34",                  "prdy_vrss": "-2500",                  "prdy_vrss_sign": "5",                  "stck_cntg_hour": "141159",                  "stck_prpr": "104500",                  "tday_rltv": "42.43"              },              {                  "acml_vol": "1979707",                  "askp": "105000",                  "bidp": "104500",                  "cnqn": "4",                  "prdy_ctrt": "-2.34",                  "prdy_vrss": "-2500",                  "prdy_vrss_sign": "5",                  "stck_cntg_hour": "141158",                  "stck_prpr": "104500",                  "tday_rltv": "42.43"              },  ....              {                  "acml_vol": "1979079",                  "askp": "105000",                  "bidp": "104500",                  "cnqn": "92",                  "prdy_ctrt": "-2.34",                  "prdy_vrss": "-2500",                  "prdy_vrss_sign": "5",                  "stck_cntg_hour": "141142",                  "stck_prpr": "104500",                  "tday_rltv": "42.44"              }          ],          "rt_cd": "0"
```

---
### 33. 주식현재가 시세2

| Field | Value |
|---|---|
| Sheet | `주식현재가 시세2` |
| Menu | [국내주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/inquire-price-2` |
| TR_ID (실전) | `FHPST01010000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | FID 조건 시장 분류 코드 | string | Y | 2 | J:KRX, NX:NXT, UN:통합 |
| `FID_INPUT_ISCD` | FID 입력 종목코드 | string | Y | 12 | 000660 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object | Y |  |  |
| `rprs_mrkt_kor_name` | 대표 시장 한글 명 | string | Y | 40 |  |
| `new_hgpr_lwpr_cls_code` | 신 고가 저가 구분 코드 | string | Y | 10 | 특정 경우에만 데이터 출력 |
| `mxpr_llam_cls_code` | 상하한가 구분 코드 | string | Y | 10 | 특정 경우에만 데이터 출력 |
| `crdt_able_yn` | 신용 가능 여부 | string | Y | 1 |  |
| `stck_mxpr` | 주식 상한가 | string | Y | 10 |  |
| `elw_pblc_yn` | ELW 발행 여부 | string | Y | 1 |  |
| `prdy_clpr_vrss_oprc_rate` | 전일 종가 대비 시가2 비율 | string | Y | 84 |  |
| `crdt_rate` | 신용 비율 | string | Y | 84 |  |
| `marg_rate` | 증거금 비율 | string | Y | 84 |  |
| `lwpr_vrss_prpr` | 최저가 대비 현재가 | string | Y | 10 |  |
| `lwpr_vrss_prpr_sign` | 최저가 대비 현재가 부호 | string | Y | 1 |  |
| `prdy_clpr_vrss_lwpr_rate` | 전일 종가 대비 최저가 비율 | string | Y | 84 |  |
| `stck_lwpr` | 주식 최저가 | string | Y | 10 |  |
| `hgpr_vrss_prpr` | 최고가 대비 현재가 | string | Y | 10 |  |
| `hgpr_vrss_prpr_sign` | 최고가 대비 현재가 부호 | string | Y | 1 |  |
| `prdy_clpr_vrss_hgpr_rate` | 전일 종가 대비 최고가 비율 | string | Y | 84 |  |
| `stck_hgpr` | 주식 최고가 | string | Y | 10 |  |
| `oprc_vrss_prpr` | 시가2 대비 현재가 | string | Y | 10 |  |
| `oprc_vrss_prpr_sign` | 시가2 대비 현재가 부호 | string | Y | 1 |  |
| `mang_issu_yn` | 관리 종목 여부 | string | Y | 1 |  |
| `divi_app_cls_code` | 동시호가배분처리코드 | string | Y | 2 | 11:매수상한배분 12:매수하한배분 13: 매도상한배분 14:매도하한배분 |
| `short_over_yn` | 단기과열여부 | string | Y | 1 |  |
| `mrkt_warn_cls_code` | 시장경고코드 | string | Y | 2 | 00: 없음 01: 투자주의 02:투자경고 03:투자위험 |
| `invt_caful_yn` | 투자유의여부 | string | Y | 1 |  |
| `stange_runup_yn` | 이상급등여부 | string | Y | 1 |  |
| `ssts_hot_yn` | 공매도과열 여부 | string | Y | 1 |  |
| `low_current_yn` | 저유동성 종목 여부 | string | Y | 1 |  |
| `vi_cls_code` | VI적용구분코드 | string | Y | 1 |  |
| `short_over_cls_code` | 단기과열구분코드 | string | Y | 10 |  |
| `stck_llam` | 주식 하한가 | string | Y | 10 |  |
| `new_lstn_cls_name` | 신규 상장 구분 명 | string | Y | 40 |  |
| `vlnt_deal_cls_name` | 임의 매매 구분 명 | string | Y | 16 |  |
| `flng_cls_name` | 락 구분 이름 | string | Y | 40 | 특정 경우에만 데이터 출력 |
| `revl_issu_reas_name` | 재평가 종목 사유 명 | string | Y | 40 | 특정 경우에만 데이터 출력 |
| `mrkt_warn_cls_name` | 시장 경고 구분 명 | string | Y | 40 | 특정 경우에만 데이터 출력  "투자환기" / "투자경고" |
| `stck_sdpr` | 주식 기준가 | string | Y | 10 |  |
| `bstp_cls_code` | 업종 구분 코드 | string | Y | 4 |  |
| `stck_prdy_clpr` | 주식 전일 종가 | string | Y | 10 |  |
| `insn_pbnt_yn` | 불성실 공시 여부 | string | Y | 1 |  |
| `fcam_mod_cls_name` | 액면가 변경 구분 명 | string | Y | 10 | 특정 경우에만 데이터 출력 |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `prdy_vrss_vol_rate` | 전일 대비 거래량 비율 | string | Y | 84 |  |
| `bstp_kor_isnm` | 업종 한글 종목명 | string | Y | 40 | ※ 거래소 정보로 특정 종목은 업종구분이 없어 데이터 미회신 |
| `sltr_yn` | 정리매매 여부 | string | Y | 1 |  |
| `trht_yn` | 거래정지 여부 | string | Y | 1 |  |
| `oprc_rang_cont_yn` | 시가 범위 연장 여부 | string | Y | 1 |  |
| `vlnt_fin_cls_code` | 임의 종료 구분 코드 | string | Y | 1 |  |
| `stck_oprc` | 주식 시가2 | string | Y | 10 |  |
| `prdy_vol` | 전일 거래량 | string | Y | 18 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"J",  "fid_input_iscd":"005930"  }
```

**Response Example:**
```
{      "output": {          "rprs_mrkt_kor_name": "KOSPI200",          "insn_pbnt_yn": "N",          "stck_prpr": "74400",          "prdy_vrss": "1000",          "prdy_vrss_sign": "2",          "prdy_ctrt": "1.36",          "acml_tr_pbmn": "276161183000",          "acml_vol": "3733708",          "prdy_vol": "11160062",          "prdy_vrss_vol_rate": "33.46",          "bstp_kor_isnm": "전기.전자",          "sltr_yn": "N",          "mang_issu_yn": "N",          "trht_yn": "N",          "oprc_rang_cont_yn": "N",          "vlnt_fin_cls_code": "N",          "stck_prdy_clpr": "73400",          "stck_oprc": "73800",          "prdy_clpr_vrss_oprc_rate": "0.54",          "oprc_vrss_prpr_sign": "2",          "oprc_vrss_prpr": "600",          "stck_hgpr": "74500",          "prdy_clpr_vrss_hgpr_rate": "1.50",          "hgpr_vrss_prpr_sign": "5",          "hgpr_vrss_prpr": "-100",          "stck_lwpr": "73500",          "prdy_clpr_vrss_lwpr_rate": "0.14",          "lwpr_vrss_prpr_sign": "2",          "lwpr_vrss_prpr": "900",          "marg_rate": "20.00",          "crdt_rate": "20.00",          "crdt_able_yn": "Y",          "elw_pblc_yn": "Y",          "stck_mxpr": "95400",          "stck_llam": "51400",          "bstp_cls_code": "005930",          "stck_sdpr": "73400",          "vlnt_deal_cls_name": " ",          "new_lstn_cls_name": "        ",          "divi_app_cls_code": "  ",          "short_over_cls_code": "          ",          "vi_cls_code": "N",          "low_current_yn": "N",          "ssts_hot_yn": " ",          "stange_runup_yn": "N",          "invt_caful_yn": "N",          "mrkt_warn_cls_code": "00",          "short_over_yn": "N"      },      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 34. 주식일별분봉조회

| Field | Value |
|---|---|
| Sheet | `주식일별분봉조회` |
| Menu | [국내주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/inquire-time-dailychartprice` |
| TR_ID (실전) | `FHKST03010230` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | J:KRX, NX:NXT, UN:통합 |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 종목코드 (ex 005930 삼성전자) |
| `FID_INPUT_HOUR_1` | 입력 시간1 | string | Y | 10 | 입력 시간(ex 13시 130000) |
| `FID_INPUT_DATE_1` | 입력 날짜1 | string | Y | 2 | 입력 날짜(20241023) |
| `FID_PW_DATA_INCU_YN` | 과거 데이터 포함 여부 | string | Y | 2 |  |
| `FID_FAKE_TICK_INCU_YN` | 허봉 포함 여부 | string | N | 2 | 공백 필수 입력 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 11 |  |
| `stck_prdy_clpr` | 주식 전일 종가 | string | Y | 10 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `stck_bsop_date` | 주식 영업 일자 | string | Y | 8 |  |
| `stck_cntg_hour` | 주식 체결 시간 | string | Y | 6 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `stck_oprc` | 주식 시가2 | string | Y | 10 |  |
| `stck_hgpr` | 주식 최고가 | string | Y | 10 |  |
| `stck_lwpr` | 주식 최저가 | string | Y | 10 |  |
| `cntg_vol` | 체결 거래량 | string | Y | 18 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:J  FID_INPUT_ISCD:005930  FID_INPUT_DATE_1:20241108  FID_INPUT_HOUR_1:140000  FID_PW_DATA_INCU_YN:Y  FID_FAKE_TICK_INCU_YN:N
```

**Response Example:**
```
{      "output1": {          "prdy_vrss": "-500",          "prdy_vrss_sign": "5",          "prdy_ctrt": "-0.87",          "stck_prdy_clpr": "57500",          "acml_vol": "13531211",          "acml_tr_pbmn": "779692013500",          "hts_kor_isnm": "삼성전자",          "stck_prpr": "57000"      },      "output2": [          {              "stck_bsop_date": "20241108",              "stck_cntg_hour": "140000",              "stck_prpr": "57300",              "stck_oprc": "57300",              "stck_hgpr": "57400",              "stck_lwpr": "57200",              "cntg_vol": "59047",              "acml_tr_pbmn": "538940180600"          },          {              "stck_bsop_date": "20241108",              "stck_cntg_hour": "135900",              "stck_prpr": "57300",              "stck_oprc": "57400",              "stck_hgpr": "57500",              "stck_lwpr": "57300",              "cntg_vol": "118619",              "acml_tr_pbmn": "535556648100"          },  		...          {              "stck_bsop_date": "20241108",              "stck_cntg_hour": "120100",              "stck_prpr": "57700",              "stck_oprc": "57700",              "stck_hgpr": "57800",              "stck_lwpr": "57700",              "cntg_vol": "3856",              "acml_tr_pbmn": "357875441100"          }      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 35. 국내주식기간별시세(일_주_월_년)

| Field | Value |
|---|---|
| Sheet | `국내주식기간별시세(일_주_월_년)` |
| Menu | [국내주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice` |
| TR_ID (실전) | `FHKST03010100` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | J:KRX, NX:NXT, UN:통합 |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 종목코드 (ex 005930 삼성전자) |
| `FID_INPUT_DATE_1` | 입력 날짜 1 | string | Y | 10 | 조회 시작일자 |
| `FID_INPUT_DATE_2` | 입력 날짜 2 | string | Y | 10 | 조회 종료일자 (최대 100개) |
| `FID_PERIOD_DIV_CODE` | 기간분류코드 | string | Y | 32 | D:일봉 W:주봉, M:월봉, Y:년봉 |
| `FID_ORG_ADJ_PRC` | 수정주가 원주가 가격 여부 | string | Y | 10 | 0:수정주가 1:원주가 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  | single |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 11 |  |
| `stck_prdy_clpr` | 주식 전일 종가 | string | Y | 10 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `stck_shrn_iscd` | 주식 단축 종목코드 | string | Y | 9 |  |
| `prdy_vol` | 전일 거래량 | string | Y | 18 |  |
| `stck_mxpr` | 주식 상한가 | string | Y | 10 |  |
| `stck_llam` | 주식 하한가 | string | Y | 10 |  |
| `stck_oprc` | 주식 시가2 | string | Y | 10 |  |
| `stck_hgpr` | 주식 최고가 | string | Y | 10 |  |
| `stck_lwpr` | 주식 최저가 | string | Y | 10 |  |
| `stck_prdy_oprc` | 주식 전일 시가 | string | Y | 10 |  |
| `stck_prdy_hgpr` | 주식 전일 최고가 | string | Y | 10 |  |
| `stck_prdy_lwpr` | 주식 전일 최저가 | string | Y | 10 |  |
| `askp` | 매도호가 | string | Y | 10 |  |
| `bidp` | 매수호가 | string | Y | 10 |  |
| `prdy_vrss_vol` | 전일 대비 거래량 | string | Y | 18 |  |
| `vol_tnrt` | 거래량 회전율 | string | Y | 11 | 11(8.2) |
| `stck_fcam` | 주식 액면가 | string | Y | 11 |  |
| `lstn_stcn` | 상장 주수 | string | Y | 18 |  |
| `cpfn` | 자본금 | string | Y | 22 |  |
| `hts_avls` | HTS 시가총액 | string | Y | 18 |  |
| `per` | PER | string | Y | 11 | 11(8.2) |
| `eps` | EPS | string | Y | 14 | 14(11.2) |
| `pbr` | PBR | string | Y | 11 | 11(8.2) |
| `itewhol_loan_rmnd_ratem` | 전체 융자 잔고 비율 | string | Y | 13 | 13(8.4) |
| `output2` | 응답상세 | object array | Y |  | Array |
| `stck_bsop_date` | 주식 영업 일자 | string | Y | 8 |  |
| `stck_clpr` | 주식 종가 | string | Y | 10 |  |
| `stck_oprc` | 주식 시가2 | string | Y | 10 |  |
| `stck_hgpr` | 주식 최고가 | string | Y | 10 |  |
| `stck_lwpr` | 주식 최저가 | string | Y | 10 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |
| `flng_cls_code` | 락 구분 코드 | string | Y | 2 | 01 : 권리락  02 : 배당락  03 : 분배락  04 : 권배락  05 : 중간(분기)배당락  06 : 권리중간배당락  07 : 권리분기배당락 |
| `prtt_rate` | 분할 비율 | string | Y | 11 | 기준가/전일 종가 |
| `mod_yn` | 변경 여부 | string | Y | 1 | 현재 영업일에 체결이 발생하지 않아 시가가 없을경우 Y 로 표시(차트에서 사용) |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `revl_issu_reas` | 재평가사유코드 | string | Y | 2 | 00:해당없음  01:회사분할  02:자본감소  03:장기간정지  04:초과분배  05:대규모배당  06:회사분할합병  07:ETN증권병합/분할  08:신종증권기세조정  99:기타 |

**Request Example:**
```
"input": {              "fid_cond_mrkt_div_code": "J",              "fid_input_date_1": "20220411",              "fid_input_date_2": "20220509",              "fid_input_iscd": "000660",              "fid_org_adj_prc": "0",              "fid_period_div_code": "D"          }
```

**Response Example:**
```
"msg_cd": "MCA00000",          "output1": {              "acml_tr_pbmn": "236062833000",              "acml_vol": "2106409",              "askp": "112500",              "bidp": "112000",              "cpfn": "36577",              "eps": "13190.00",              "hts_avls": "815363",              "hts_kor_isnm": "SK\ud558\uc774\ub2c9\uc2a4",              "itewhol_loan_rmnd_ratem name": "0.32",              "lstn_stcn": "728002365",              "pbr": "1.26",              "per": "8.49",              "prdy_ctrt": "0.90",              "prdy_vol": "3680049",              "prdy_vrss": "1000",              "prdy_vrss_sign": "2",              "prdy_vrss_vol": "-1573640",              "stck_fcam": "5000",              "stck_hgpr": "113000",              "stck_llam": "78000",              "stck_lwpr": "111000",              "stck_mxpr": "144000",              "stck_oprc": "111500",              "stck_prdy_clpr": "111000",              "stck_prdy_hgpr": "112500",              "stck_prdy_lwpr": "110000",              "stck_prdy_oprc": "110500",              "stck_prpr": "112000",              "stck_shrn_iscd": "000660",              "vol_tnrt": "0.29"          },          "output2": [              {                  "acml_tr_pbmn": "237914727500",                  "acml_vol": "2203472",                  "flng_cls_code": "00",                  "mod_yn": "N",                  "prdy_vrss": "0",                  "prdy_vrss_sign": "3",                  "prtt_rate": "0.00",                  "revl_issu_reas": "",                  "stck_bsop_date": "20220509",                  "stck_clpr": "107500",                  "stck_hgpr": "109000",                  "stck_lwpr": "106500",                  "stck_oprc": "107000"              },  ....
```

---
### 36. NAV 비교추이(일)

| Field | Value |
|---|---|
| Sheet | `NAV 비교추이(일)` |
| Menu | [국내주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/etfetn/v1/quotations/nav-comparison-daily-trend` |
| TR_ID (실전) | `FHPST02440200` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `fid_cond_mrkt_div_code` | FID 조건 시장 분류 코드 | string | Y | 2 | J 입력 |
| `fid_input_iscd` | FID 입력 종목코드 | string | Y | 12 | 종목코드 (6자리) |
| `fid_input_date_1` | FID 입력 날짜1 | string | Y | 10 | 조회 시작일자 (ex. 20240101) |
| `fid_input_date_2` | FID 입력 날짜2 | string | Y | 10 | 조회 종료일자 (ex. 20240220) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stck_bsop_date` | 주식 영업 일자 | string | Y | 8 |  |
| `stck_clpr` | 주식 종가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `cntg_vol` | 체결 거래량 | string | Y | 18 |  |
| `dprt` | 괴리율 | string | Y | 82 |  |
| `nav_vrss_prpr` | NAV 대비 현재가 | string | Y | 112 |  |
| `nav` | NAV | string | Y | 112 |  |
| `nav_prdy_vrss_sign` | NAV 전일 대비 부호 | string | Y | 1 |  |
| `nav_prdy_vrss` | NAV 전일 대비 | string | Y | 112 |  |
| `nav_prdy_ctrt` | NAV 전일 대비율 | string | Y | 84 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"J",  "fid_input_iscd":"069500",  "fid_input_date_1":"20240101",  "fid_input_date_2":"20240220"  }
```

**Response Example:**
```
{      "output": [          {              "stck_bsop_date": "20240220",              "stck_clpr": "35875",              "prdy_vrss": "-425",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-1.17",              "acml_vol": "6441149",              "cntg_vol": "",              "dprt": "-0.21",              "nav_vrss_prpr": "-77.09",              "nav": "35952.09",              "nav_prdy_vrss_sign": "5",              "nav_prdy_vrss": "-400.32",              "nav_prdy_ctrt": "-1.10"          },          {              "stck_bsop_date": "20240219",              "stck_clpr": "36300",              "prdy_vrss": "560",              "prdy_vrss_sign": "2",              "prdy_ctrt": "1.57",              "acml_vol": "6673013",              "cntg_vol": "",              "dprt": "-0.14",              "nav_vrss_prpr": "-52.41",              "nav": "36352.41",              "nav_prdy_vrss_sign": "2",              "nav_prdy_vrss": "536.42",              "nav_prdy_ctrt": "1.50"          },          {              "stck_bsop_date": "20240216",              "stck_clpr": "35740",              "prdy_vrss": "355",              "prdy_vrss_sign": "2",              "prdy_ctrt": "1.00",              "acml_vol": "7035777",              "cntg_vol": "",              "dprt": "-0.21",              "nav_vrss_prpr": "-75.99",              "nav": "35815.99",              "nav_prdy_vrss_sign": "2",              "nav_prdy_vrss": "432.75",              "nav_prdy_ctrt": "1.22"          },          {              "stck_bsop_date": "20240215",              "stck_clpr": "35385",              "prdy_vrss": "-50",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-0.14",              "acml_vol": "6137814",              "cntg_vol": "",              "dprt": "0.00",              "nav_vrss_prpr": "1.76",              "nav": "35383.24",              "nav_prdy_vrss_sign": "5",              "nav_prdy_vrss": "-147.98",              "nav_prdy_ctrt": "-0.42"          },          {              "stck_bsop_date": "20240214",              "stck_clpr": "35435",              "prdy_vrss": "-490",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-1.36",              "acml_vol": "7163970",              "cntg_vol": "",              "dprt": "-0.27",              "nav_vrss_prpr": "-96.22",              "nav": "35531.22",              "nav_prdy_vrss_sign": "5",              "nav_prdy_vrss": "-468.25",              "nav_prdy_ctrt": "-1.30"          },          {              "stck_bsop_date": "20240213",              "stck_clpr": "35925",              "prdy_vrss": "435",              "prdy_vrss_sign": "2",              "prdy_ctrt": "1.23",              "acml_vol": "6108254",              "cntg_vol": "",              "dprt": "-0.21",              "nav_vrss_prpr": "-74.47",              "nav": "35999.47",              "nav_prdy_vrss_sign": "2",              "nav_prdy_vrss": "407.86",              "nav_prdy_ctrt": "1.15"          },          {              "stck_bsop_date": "20
```

---
### 37. 주식현재가 호가_예상체결

| Field | Value |
|---|---|
| Sheet | `주식현재가 호가_예상체결` |
| Menu | [국내주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn` |
| TR_ID (실전) | `FHKST01010200` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | J:KRX, NX:NXT, UN:통합 |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 종목코드 (ex 005930 삼성전자) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `aspr_acpt_hour` | 호가 접수 시간 | string | Y | 6 |  |
| `askp1` | 매도호가1 | string | Y | 10 |  |
| `askp2` | 매도호가2 | string | Y | 10 |  |
| `askp3` | 매도호가3 | string | Y | 10 |  |
| `askp4` | 매도호가4 | string | Y | 10 |  |
| `askp5` | 매도호가5 | string | Y | 10 |  |
| `askp6` | 매도호가6 | string | Y | 10 |  |
| `askp7` | 매도호가7 | string | Y | 10 |  |
| `askp8` | 매도호가8 | string | Y | 10 |  |
| `askp9` | 매도호가9 | string | Y | 10 |  |
| `askp10` | 매도호가10 | string | Y | 10 |  |
| `bidp1` | 매수호가1 | string | Y | 10 |  |
| `bidp2` | 매수호가2 | string | Y | 10 |  |
| `bidp3` | 매수호가3 | string | Y | 10 |  |
| `bidp4` | 매수호가4 | string | Y | 10 |  |
| `bidp5` | 매수호가5 | string | Y | 10 |  |
| `bidp6` | 매수호가6 | string | Y | 10 |  |
| `bidp7` | 매수호가7 | string | Y | 10 |  |
| `bidp8` | 매수호가8 | string | Y | 10 |  |
| `bidp9` | 매수호가9 | string | Y | 10 |  |
| `bidp10` | 매수호가10 | string | Y | 10 |  |
| `askp_rsqn1` | 매도호가 잔량1 | string | Y | 12 |  |
| `askp_rsqn2` | 매도호가 잔량2 | string | Y | 12 |  |
| `askp_rsqn3` | 매도호가 잔량3 | string | Y | 12 |  |
| `askp_rsqn4` | 매도호가 잔량4 | string | Y | 12 |  |
| `askp_rsqn5` | 매도호가 잔량5 | string | Y | 12 |  |
| `askp_rsqn6` | 매도호가 잔량6 | string | Y | 12 |  |
| `askp_rsqn7` | 매도호가 잔량7 | string | Y | 12 |  |
| `askp_rsqn8` | 매도호가 잔량8 | string | Y | 12 |  |
| `askp_rsqn9` | 매도호가 잔량9 | string | Y | 12 |  |
| `askp_rsqn10` | 매도호가 잔량10 | string | Y | 12 |  |
| `bidp_rsqn1` | 매수호가 잔량1 | string | Y | 12 |  |
| `bidp_rsqn2` | 매수호가 잔량2 | string | Y | 12 |  |
| `bidp_rsqn3` | 매수호가 잔량3 | string | Y | 12 |  |
| `bidp_rsqn4` | 매수호가 잔량4 | string | Y | 12 |  |
| `bidp_rsqn5` | 매수호가 잔량5 | string | Y | 12 |  |
| `bidp_rsqn6` | 매수호가 잔량6 | string | Y | 12 |  |
| `bidp_rsqn7` | 매수호가 잔량7 | string | Y | 12 |  |
| `bidp_rsqn8` | 매수호가 잔량8 | string | Y | 12 |  |
| `bidp_rsqn9` | 매수호가 잔량9 | string | Y | 12 |  |
| `bidp_rsqn10` | 매수호가 잔량10 | string | Y | 12 |  |
| `askp_rsqn_icdc1` | 매도호가 잔량 증감1 | string | Y | 10 |  |
| `askp_rsqn_icdc2` | 매도호가 잔량 증감2 | string | Y | 10 |  |
| `askp_rsqn_icdc3` | 매도호가 잔량 증감3 | string | Y | 10 |  |
| `askp_rsqn_icdc4` | 매도호가 잔량 증감4 | string | Y | 10 |  |
| `askp_rsqn_icdc5` | 매도호가 잔량 증감5 | string | Y | 10 |  |
| `askp_rsqn_icdc6` | 매도호가 잔량 증감6 | string | Y | 10 |  |
| `askp_rsqn_icdc7` | 매도호가 잔량 증감7 | string | Y | 10 |  |
| `askp_rsqn_icdc8` | 매도호가 잔량 증감8 | string | Y | 10 |  |
| `askp_rsqn_icdc9` | 매도호가 잔량 증감9 | string | Y | 10 |  |
| `askp_rsqn_icdc10` | 매도호가 잔량 증감10 | string | Y | 10 |  |
| `bidp_rsqn_icdc1` | 매수호가 잔량 증감1 | string | Y | 10 |  |
| `bidp_rsqn_icdc2` | 매수호가 잔량 증감2 | string | Y | 10 |  |
| `bidp_rsqn_icdc3` | 매수호가 잔량 증감3 | string | Y | 10 |  |
| `bidp_rsqn_icdc4` | 매수호가 잔량 증감4 | string | Y | 10 |  |
| `bidp_rsqn_icdc5` | 매수호가 잔량 증감5 | string | Y | 10 |  |
| `bidp_rsqn_icdc6` | 매수호가 잔량 증감6 | string | Y | 10 |  |
| `bidp_rsqn_icdc7` | 매수호가 잔량 증감7 | string | Y | 10 |  |
| `bidp_rsqn_icdc8` | 매수호가 잔량 증감8 | string | Y | 10 |  |
| `bidp_rsqn_icdc9` | 매수호가 잔량 증감9 | string | Y | 10 |  |
| `bidp_rsqn_icdc10` | 매수호가 잔량 증감10 | string | Y | 10 |  |
| `total_askp_rsqn` | 총 매도호가 잔량 | string | Y | 12 |  |
| `total_bidp_rsqn` | 총 매수호가 잔량 | string | Y | 12 |  |
| `total_askp_rsqn_icdc` | 총 매도호가 잔량 증감 | string | Y | 10 |  |
| `total_bidp_rsqn_icdc` | 총 매수호가 잔량 증감 | string | Y | 10 |  |
| `ovtm_total_askp_icdc` | 시간외 총 매도호가 증감 | string | Y | 10 |  |
| `ovtm_total_bidp_icdc` | 시간외 총 매수호가 증감 | string | Y | 10 |  |
| `ovtm_total_askp_rsqn` | 시간외 총 매도호가 잔량 | string | Y | 12 |  |
| `ovtm_total_bidp_rsqn` | 시간외 총 매수호가 잔량 | string | Y | 12 |  |
| `ntby_aspr_rsqn` | 순매수 호가 잔량 | string | Y | 12 |  |
| `new_mkop_cls_code` | 신 장운영 구분 코드 | string | Y | 2 | ' '00' : 장전 예상체결가와 장마감 동시호가  '49' : 장후 예상체결가    (1) 첫 번째 비트  1 : 장개시전  2 : 장중  3 : 장종료후  4 : 시간외단일가  7 : 일반Buy-in  8 : 당일Buy-in  (2) 두 번째 비트  0 : 보통  1 : 종가  2 : 대량  3 : 바스켓  7 : 정리매매  8 : Buy-in' |
| `output2` | 응답상세 | object | Y |  |  |
| `antc_mkop_cls_code` | 예상 장운영 구분 코드 | string | Y | 3 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `stck_oprc` | 주식 시가2 | string | Y | 10 |  |
| `stck_hgpr` | 주식 최고가 | string | Y | 10 |  |
| `stck_lwpr` | 주식 최저가 | string | Y | 10 |  |
| `stck_sdpr` | 주식 기준가 | string | Y | 10 |  |
| `antc_cnpr` | 예상 체결가 | string | Y | 10 |  |
| `antc_cntg_vrss_sign` | 예상 체결 대비 부호 | string | Y | 1 |  |
| `antc_cntg_vrss` | 예상 체결 대비 | string | Y | 10 |  |
| `antc_cntg_prdy_ctrt` | 예상 체결 전일 대비율 | string | Y | 11 |  |
| `antc_vol` | 예상 거래량 | string | Y | 18 |  |
| `stck_shrn_iscd` | 주식 단축 종목코드 | string | Y | 9 |  |
| `vi_cls_code` | VI적용구분코드 | string | Y | 1 |  |

**Request Example:**
```
{  	"fid_cond_mrkt_div_code": "J",  	"fid_input_iscd": "000660"  }
```

**Response Example:**
```
{    "output1": {      "aspr_acpt_hour": "160000",      "askp1": "128000",      "askp2": "128500",      "askp3": "129000",      "askp4": "129500",      "askp5": "130000",      "askp6": "130500",      "askp7": "131000",      "askp8": "131500",      "askp9": "132000",      "askp10": "132500",      "bidp1": "127500",      "bidp2": "127000",      "bidp3": "126500",      "bidp4": "126000",      "bidp5": "125500",      "bidp6": "125000",      "bidp7": "124500",      "bidp8": "124000",      "bidp9": "123500",      "bidp10": "123000",      "askp_rsqn1": "69454",      "askp_rsqn2": "189698",      "askp_rsqn3": "154732",      "askp_rsqn4": "85703",      "askp_rsqn5": "158696",      "askp_rsqn6": "31395",      "askp_rsqn7": "50738",      "askp_rsqn8": "21039",      "askp_rsqn9": "39424",      "askp_rsqn10": "29126",      "bidp_rsqn1": "83147",      "bidp_rsqn2": "27469",      "bidp_rsqn3": "25200",      "bidp_rsqn4": "18544",      "bidp_rsqn5": "13251",      "bidp_rsqn6": "15742",      "bidp_rsqn7": "15070",      "bidp_rsqn8": "24995",      "bidp_rsqn9": "11658",      "bidp_rsqn10": "15773",      "askp_rsqn_icdc1": "0",      "askp_rsqn_icdc2": "0",      "askp_rsqn_icdc3": "0",      "askp_rsqn_icdc4": "0",      "askp_rsqn_icdc5": "0",      "askp_rsqn_icdc6": "0",      "askp_rsqn_icdc7": "0",      "askp_rsqn_icdc8": "0",      "askp_rsqn_icdc9": "0",      "askp_rsqn_icdc10": "0",      "bidp_rsqn_icdc1": "0",      "bidp_rsqn_icdc2": "0",      "bidp_rsqn_icdc3": "0",      "bidp_rsqn_icdc4": "0",      "bidp_rsqn_icdc5": "0",      "bidp_rsqn_icdc6": "0",      "bidp_rsqn_icdc7": "0",      "bidp_rsqn_icdc8": "0",      "bidp_rsqn_icdc9": "0",      "bidp_rsqn_icdc10": "0",      "total_askp_rsqn": "830005",      "total_bidp_rsqn": "250849",      "total_askp_rsqn_icdc": "0",      "total_bidp_rsqn_icdc": "0",      "ovtm_total_askp_icdc": "0",      "ovtm_total_bidp_icdc": "0",      "ovtm_total_askp_rsqn": "2943",      "ovtm_total_bidp_rsqn": "0",      "ntby_aspr_rsqn": "-579156",      "new_mkop_cls_code": "31"    },    "output2": {      "antc_mkop_cls_code": "112",      "stck_prpr": "128000",      "stck_oprc": "125500",      "stck_hgpr": "128500",      "stck_lwpr": "124500",      "stck_sdpr": "124500",      "antc_cnpr": "128000",      "antc_cntg_vrss_sign": "2",      "antc_cntg_vrss": "3500",      "antc_cntg_prdy_ctrt": "2.81",      "antc_vol": "220006",      "stck_shrn_iscd": "000660",      "vi_cls_code": "N"    },    "rt_cd": "0",    "msg_cd": "MCA00000",    "msg1": "정상처리 되었습니다!"  }
```

---
### 38. 주식현재가 체결

| Field | Value |
|---|---|
| Sheet | `주식현재가 체결` |
| Menu | [국내주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/inquire-ccnl` |
| TR_ID (실전) | `FHKST01010300` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 8 | J:KRX, NX:NXT, UN:통합 |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 2 | 종목코드 (ex 005930 삼성전자) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stck_cntg_hour` | 주식 체결 시간 | string | Y | 6 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `cntg_vol` | 체결 거래량 | string | Y | 18 |  |
| `tday_rltv` | 당일 체결강도 | string | Y | 112 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code": "J",  "fid_input_iscd": "000660"  }
```

**Response Example:**
```
{    "output": [      {        "stck_cntg_hour": "155955",        "stck_prpr": "78900",        "prdy_vrss": "900",        "prdy_vrss_sign": "2",        "cntg_vol": "2",        "tday_rltv": "114.05",        "prdy_ctrt": "1.15"      },      {        "stck_cntg_hour": "155935",        "stck_prpr": "78900",        "prdy_vrss": "900",        "prdy_vrss_sign": "2",        "cntg_vol": "10",        "tday_rltv": "114.05",        "prdy_ctrt": "1.15"      }  	  ],    "rt_cd": "0",    "msg_cd": "MCA00000",    "msg1": "정상처리 되었습니다!"  }
```

---
### 39. 주식현재가 회원사

| Field | Value |
|---|---|
| Sheet | `주식현재가 회원사` |
| Menu | [국내주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/inquire-member` |
| TR_ID (실전) | `FHKST01010600` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | FID 조건 시장 분류 코드 | string | Y | 2 | J:KRX, NX:NXT, UN:통합 |
| `FID_INPUT_ISCD` | FID 입력 종목코드 | string | Y | 12 | 종목번호 (6자리)  ETN의 경우, Q로 시작 (EX. Q500001) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 | 성공 실패 여부   성공 : 0   실패 : 0외 값 |
| `msg_cd` | 응답코드 | string | Y | 8 | 응답코드 |
| `msg1` | 응답메세지 | string | Y | 80 | 응답메세지 |
| `output` | 응답상세 | array | Y | null |  |
| `seln_mbcr_no1` | 매도 회원사 번호1 | string | Y | 5 |  |
| `seln_mbcr_no2` | 매도 회원사 번호2 | string | Y | 5 |  |
| `seln_mbcr_no3` | 매도 회원사 번호3 | string | Y | 5 |  |
| `seln_mbcr_no4` | 매도 회원사 번호4 | string | Y | 5 |  |
| `seln_mbcr_no5` | 매도 회원사 번호5 | string | Y | 5 |  |
| `seln_mbcr_name1` | 매도 회원사 명1 | string | Y | 40 |  |
| `seln_mbcr_name2` | 매도 회원사 명2 | string | Y | 40 |  |
| `seln_mbcr_name3` | 매도 회원사 명3 | string | Y | 40 |  |
| `seln_mbcr_name4` | 매도 회원사 명4 | string | Y | 40 |  |
| `seln_mbcr_name5` | 매도 회원사 명5 | string | Y | 40 |  |
| `total_seln_qty1` | 총 매도 수량1 | string | Y | 18 |  |
| `total_seln_qty2` | 총 매도 수량2 | string | Y | 18 |  |
| `total_seln_qty3` | 총 매도 수량3 | string | Y | 18 |  |
| `total_seln_qty4` | 총 매도 수량4 | string | Y | 18 |  |
| `total_seln_qty5` | 총 매도 수량5 | string | Y | 18 |  |
| `seln_mbcr_rlim1` | 매도 회원사 비중1 | string | Y | 9 |  |
| `seln_mbcr_rlim2` | 매도 회원사 비중2 | string | Y | 9 |  |
| `seln_mbcr_rlim3` | 매도 회원사 비중3 | string | Y | 9 |  |
| `seln_mbcr_rlim4` | 매도 회원사 비중4 | string | Y | 9 |  |
| `seln_mbcr_rlim5` | 매도 회원사 비중5 | string | Y | 9 |  |
| `seln_qty_icdc1` | 매도 수량 증감1 | string | Y | 10 |  |
| `seln_qty_icdc2` | 매도 수량 증감2 | string | Y | 10 |  |
| `seln_qty_icdc3` | 매도 수량 증감3 | string | Y | 10 |  |
| `seln_qty_icdc4` | 매도 수량 증감4 | string | Y | 10 |  |
| `seln_qty_icdc5` | 매도 수량 증감5 | string | Y | 10 |  |
| `shnu_mbcr_no1` | 매수2 회원사 번호1 | string | Y | 5 |  |
| `shnu_mbcr_no2` | 매수2 회원사 번호2 | string | Y | 5 |  |
| `shnu_mbcr_no3` | 매수2 회원사 번호3 | string | Y | 5 |  |
| `shnu_mbcr_no4` | 매수2 회원사 번호4 | string | Y | 5 |  |
| `shnu_mbcr_no5` | 매수2 회원사 번호5 | string | Y | 5 |  |
| `shnu_mbcr_name1` | 매수2 회원사 명1 | string | Y | 40 |  |
| `shnu_mbcr_name2` | 매수2 회원사 명2 | string | Y | 40 |  |
| `shnu_mbcr_name3` | 매수2 회원사 명3 | string | Y | 40 |  |
| `shnu_mbcr_name4` | 매수2 회원사 명4 | string | Y | 40 |  |
| `shnu_mbcr_name5` | 매수2 회원사 명5 | string | Y | 40 |  |
| `total_shnu_qty1` | 총 매수2 수량1 | string | Y | 18 |  |
| `total_shnu_qty2` | 총 매수2 수량2 | string | Y | 18 |  |
| `total_shnu_qty3` | 총 매수2 수량3 | string | Y | 18 |  |
| `total_shnu_qty4` | 총 매수2 수량4 | string | Y | 18 |  |
| `total_shnu_qty5` | 총 매수2 수량5 | string | Y | 18 |  |
| `shnu_mbcr_rlim1` | 매수2 회원사 비중1 | string | Y | 9 |  |
| `shnu_mbcr_rlim2` | 매수2 회원사 비중2 | string | Y | 9 |  |
| `shnu_mbcr_rlim3` | 매수2 회원사 비중3 | string | Y | 9 |  |
| `shnu_mbcr_rlim4` | 매수2 회원사 비중4 | string | Y | 9 |  |
| `shnu_mbcr_rlim5` | 매수2 회원사 비중5 | string | Y | 9 |  |
| `shnu_qty_icdc1` | 매수2 수량 증감1 | string | Y | 10 |  |
| `shnu_qty_icdc2` | 매수2 수량 증감2 | string | Y | 10 |  |
| `shnu_qty_icdc3` | 매수2 수량 증감3 | string | Y | 10 |  |
| `shnu_qty_icdc4` | 매수2 수량 증감4 | string | Y | 10 |  |
| `shnu_qty_icdc5` | 매수2 수량 증감5 | string | Y | 10 |  |
| `glob_total_seln_qty` | 외국계 총 매도 수량 | string | Y | 18 |  |
| `glob_seln_rlim` | 외국계 매도 비중 | string | Y | 9 |  |
| `glob_ntby_qty` | 외국계 순매수 수량 | string | Y | 12 |  |
| `glob_total_shnu_qty` | 외국계 총 매수2 수량 | string | Y | 18 |  |
| `glob_shnu_rlim` | 외국계 매수2 비중 | string | Y | 9 |  |
| `seln_mbcr_glob_yn_1` | 매도 회원사 외국계 여부1 | string | Y | 1 |  |
| `seln_mbcr_glob_yn_2` | 매도 회원사 외국계 여부2 | string | Y | 1 |  |
| `seln_mbcr_glob_yn_3` | 매도 회원사 외국계 여부3 | string | Y | 1 |  |
| `seln_mbcr_glob_yn_4` | 매도 회원사 외국계 여부4 | string | Y | 1 |  |
| `seln_mbcr_glob_yn_5` | 매도 회원사 외국계 여부5 | string | Y | 1 |  |
| `shnu_mbcr_glob_yn_1` | 매수2 회원사 외국계 여부1 | string | Y | 1 |  |
| `shnu_mbcr_glob_yn_2` | 매수2 회원사 외국계 여부2 | string | Y | 1 |  |
| `shnu_mbcr_glob_yn_3` | 매수2 회원사 외국계 여부3 | string | Y | 1 |  |
| `shnu_mbcr_glob_yn_4` | 매수2 회원사 외국계 여부4 | string | Y | 1 |  |
| `shnu_mbcr_glob_yn_5` | 매수2 회원사 외국계 여부5 | string | Y | 1 |  |
| `glob_total_seln_qty_icdc` | 외국계 총 매도 수량 증감 | string | Y | 10 |  |
| `glob_total_shnu_qty_icdc` | 외국계 총 매수2 수량 증감 | string | Y | 10 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code": "J",  "fid_input_iscd": "000660"  }
```

**Response Example:**
```
{    "output": {      "seln_mbcr_no1": "00086",      "seln_mbcr_no2": "00005",      "seln_mbcr_no3": "00050",      "seln_mbcr_no4": "00030",      "seln_mbcr_no5": "00002",      "seln_mbcr_name1": "BNK증권",      "seln_mbcr_name2": "미래에셋증권",      "seln_mbcr_name3": "키움증권",      "seln_mbcr_name4": "삼성증권",      "seln_mbcr_name5": "신한투자",      "total_seln_qty1": "801848",      "total_seln_qty2": "684589",      "total_seln_qty3": "310639",      "total_seln_qty4": "275035",      "total_seln_qty5": "235001",      "seln_mbcr_rlim1": "20.52",      "seln_mbcr_rlim2": "17.52",      "seln_mbcr_rlim3": "7.95",      "seln_mbcr_rlim4": "7.04",      "seln_mbcr_rlim5": "6.01",      "seln_qty_icdc1": "8000",      "seln_qty_icdc2": "39472",      "seln_qty_icdc3": "27755",      "seln_qty_icdc4": "13612",      "seln_qty_icdc5": "4047",      "shnu_mbcr_no1": "00086",      "shnu_mbcr_no2": "00005",      "shnu_mbcr_no3": "00033",      "shnu_mbcr_no4": "00045",      "shnu_mbcr_no5": "00036",      "shnu_mbcr_name1": "BNK증권",      "shnu_mbcr_name2": "미래에셋증권",      "shnu_mbcr_name3": "JP모간",      "shnu_mbcr_name4": "골드만",      "shnu_mbcr_name5": "모간서울",      "total_shnu_qty1": "822175",      "total_shnu_qty2": "598966",      "total_shnu_qty3": "378758",      "total_shnu_qty4": "354965",      "total_shnu_qty5": "261357",      "shnu_mbcr_rlim1": "21.04",      "shnu_mbcr_rlim2": "15.33",      "shnu_mbcr_rlim3": "9.69",      "shnu_mbcr_rlim4": "9.08",      "shnu_mbcr_rlim5": "6.69",      "shnu_qty_icdc1": "0",      "shnu_qty_icdc2": "2397",      "shnu_qty_icdc3": "20698",      "shnu_qty_icdc4": "17168",      "shnu_qty_icdc5": "11893",      "glob_total_seln_qty": "38125",      "glob_seln_rlim": "0.98",      "glob_ntby_qty": "1142513",      "glob_total_shnu_qty": "1180638",      "glob_shnu_rlim": "30.21",      "seln_mbcr_glob_yn_1": "N",      "seln_mbcr_glob_yn_2": "N",      "seln_mbcr_glob_yn_3": "N",      "seln_mbcr_glob_yn_4": "N",      "seln_mbcr_glob_yn_5": "N",      "shnu_mbcr_glob_yn_1": "N",      "shnu_mbcr_glob_yn_2": "N",      "shnu_mbcr_glob_yn_3": "Y",      "shnu_mbcr_glob_yn_4": "Y",      "shnu_mbcr_glob_yn_5": "Y",      "glob_total_seln_qty_icdc": "0",      "glob_total_shnu_qty_icdc": "49759"    },    "rt_cd": "0",    "msg_cd": "MCA00000",    "msg1": "정상처리 되었습니다!"  }
```

---
### 40. NAV 비교추이(분)

| Field | Value |
|---|---|
| Sheet | `NAV 비교추이(분)` |
| Menu | [국내주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/etfetn/v1/quotations/nav-comparison-time-trend` |
| TR_ID (실전) | `FHPST02440100` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `fid_hour_cls_code` | FID 시간 구분 코드 | string | Y | 5 | 1분 :60, 3분: 180 … 120분:7200 |
| `fid_cond_mrkt_div_code` | FID 조건 시장 분류 코드 | string | Y | 2 | E - 고정값 |
| `fid_input_iscd` | FID 입력 종목코드 | string | Y | 12 | 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `bsop_hour` | 영업 시간 | string | Y | 6 |  |
| `nav` | NAV | string | Y | 112 |  |
| `nav_prdy_vrss_sign` | NAV 전일 대비 부호 | string | Y | 1 |  |
| `nav_prdy_vrss` | NAV 전일 대비 | string | Y | 112 |  |
| `nav_prdy_ctrt` | NAV 전일 대비율 | string | Y | 84 |  |
| `nav_vrss_prpr` | NAV 대비 현재가 | string | Y | 112 |  |
| `dprt` | 괴리율 | string | Y | 82 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `cntg_vol` | 체결 거래량 | string | Y | 18 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"E",  "fid_input_iscd":"069500",  "fid_hour_cls_code":"60"  }
```

**Response Example:**
```
{      "output": [          {              "bsop_hour": "153000",              "nav": "36127.30",              "nav_prdy_vrss_sign": "2",              "nav_prdy_vrss": "91.08",              "nav_prdy_ctrt": "0.25",              "nav_vrss_prpr": "-37.30",              "dprt": "-0.10",              "stck_prpr": "36090",              "prdy_vrss": "110",              "prdy_vrss_sign": "2",              "prdy_ctrt": "0.31",              "acml_vol": "3714732",              "cntg_vol": "93993"          },          {              "bsop_hour": "152900",              "nav": "36170.22",              "nav_prdy_vrss_sign": "2",              "nav_prdy_vrss": "134.00",              "nav_prdy_ctrt": "0.37",              "nav_vrss_prpr": "-60.22",              "dprt": "-0.17",              "stck_prpr": "36110",              "prdy_vrss": "130",              "prdy_vrss_sign": "2",              "prdy_ctrt": "0.36",              "acml_vol": "3620739",              "cntg_vol": "46"          },          {              "bsop_hour": "152800",              "nav": "36170.22",              "nav_prdy_vrss_sign": "2",              "nav_prdy_vrss": "134.00",              "nav_prdy_ctrt": "0.37",              "nav_vrss_prpr": "-60.22",              "dprt": "-0.17",              "stck_prpr": "36110",              "prdy_vrss": "130",              "prdy_vrss_sign": "2",              "prdy_ctrt": "0.36",              "acml_vol": "3620739",              "cntg_vol": "46"          },          {              "bsop_hour": "152700",              "nav": "36170.22",              "nav_prdy_vrss_sign": "2",              "nav_prdy_vrss": "134.00",              "nav_prdy_ctrt": "0.37",              "nav_vrss_prpr": "-60.22",              "dprt": "-0.17",              "stck_prpr": "36110",              "prdy_vrss": "130",              "prdy_vrss_sign": "2",              "prdy_ctrt": "0.36",              "acml_vol": "3620739",              "cntg_vol": "46"          },          {              "bsop_hour": "152600",              "nav": "36170.22",              "nav_prdy_vrss_sign": "2",              "nav_prdy_vrss": "134.00",              "nav_prdy_ctrt": "0.37",              "nav_vrss_prpr": "-60.22",              "dprt": "-0.17",              "stck_prpr": "36110",              "prdy_vrss": "130",              "prdy_vrss_sign": "2",              "prdy_ctrt": "0.36",              "acml_vol": "3620739",              "cntg_vol": "46"          },          {              "bsop_hour": "152500",              "nav": "36170.22",              "nav_prdy_vrss_sign": "2",              "nav_prdy_vrss": "134.00",              "nav_prdy_ctrt": "0.37",              "nav_vrss_prpr": "-60.22",              "dprt": "-0.17",              "stck_prpr": "36110",              "prdy_vrss": "130",              "prdy_vrss_sign": "2",              "prdy_ctrt": "0.36",              "acml_vol": "3620739",              "cntg_vol": "46"          },          {              "bsop_hour": "152400",              "nav": "36170.22",   
```

---
### 41. 주식현재가 투자자

| Field | Value |
|---|---|
| Sheet | `주식현재가 투자자` |
| Menu | [국내주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/inquire-investor` |
| TR_ID (실전) | `FHKST01010900` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | J : KRX, NX : NXT, UN : 통합 |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 종목코드 (ex 005930 삼성전자) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | Array |
| `stck_bsop_date` | 주식 영업 일자 | string | Y | 8 |  |
| `stck_clpr` | 주식 종가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prsn_ntby_qty` | 개인 순매수 수량 | string | Y | 12 |  |
| `frgn_ntby_qty` | 외국인 순매수 수량 | string | Y | 12 |  |
| `orgn_ntby_qty` | 기관계 순매수 수량 | string | Y | 18 |  |
| `prsn_ntby_tr_pbmn` | 개인 순매수 거래 대금 | string | Y | 18 |  |
| `frgn_ntby_tr_pbmn` | 외국인 순매수 거래 대금 | string | Y | 18 |  |
| `orgn_ntby_tr_pbmn` | 기관계 순매수 거래 대금 | string | Y | 18 |  |
| `prsn_shnu_vol` | 개인 매수2 거래량 | string | Y | 18 |  |
| `frgn_shnu_vol` | 외국인 매수2 거래량 | string | Y | 18 |  |
| `orgn_shnu_vol` | 기관계 매수2 거래량 | string | Y | 18 |  |
| `prsn_shnu_tr_pbmn` | 개인 매수2 거래 대금 | string | Y | 18 |  |
| `frgn_shnu_tr_pbmn` | 외국인 매수2 거래 대금 | string | Y | 18 |  |
| `orgn_shnu_tr_pbmn` | 기관계 매수2 거래 대금 | string | Y | 18 |  |
| `prsn_seln_vol` | 개인 매도 거래량 | string | Y | 18 |  |
| `frgn_seln_vol` | 외국인 매도 거래량 | string | Y | 18 |  |
| `orgn_seln_vol` | 기관계 매도 거래량 | string | Y | 18 |  |
| `prsn_seln_tr_pbmn` | 개인 매도 거래 대금 | string | Y | 18 |  |
| `frgn_seln_tr_pbmn` | 외국인 매도 거래 대금 | string | Y | 18 |  |
| `orgn_seln_tr_pbmn` | 기관계 매도 거래 대금 | string | Y | 18 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code": "J",  "fid_input_iscd": "000660"  }
```

**Response Example:**
```
{    "output": [      {        "stck_bsop_date": "20220113",        "stck_clpr": "129500",        "prdy_vrss": "1000",        "prdy_vrss_sign": "2",        "prsn_ntby_qty": "-287624",        "frgn_ntby_qty": "797458",        "orgn_ntby_qty": "-503653",        "prsn_ntby_tr_pbmn": "-37176",        "frgn_ntby_tr_pbmn": "102959",        "orgn_ntby_tr_pbmn": "-64984",        "prsn_shnu_vol": "467525",        "frgn_shnu_vol": "1442791",        "orgn_shnu_vol": "2219433",        "prsn_shnu_tr_pbmn": "60368",        "frgn_shnu_tr_pbmn": "186166",        "orgn_shnu_tr_pbmn": "286505",        "prsn_seln_vol": "755149",        "frgn_seln_vol": "645333",        "orgn_seln_vol": "2723086",        "prsn_seln_tr_pbmn": "97544",        "frgn_seln_tr_pbmn": "83207",        "orgn_seln_tr_pbmn": "351489"      },      {        "stck_bsop_date": "20220112",        "stck_clpr": "128500",        "prdy_vrss": "500",        "prdy_vrss_sign": "2",        "prsn_ntby_qty": "-74249",        "frgn_ntby_qty": "-134600",        "orgn_ntby_qty": "206812",        "prsn_ntby_tr_pbmn": "-9687",        "frgn_ntby_tr_pbmn": "-17094",        "orgn_ntby_tr_pbmn": "26530",        "prsn_shnu_vol": "608748",        "frgn_shnu_vol": "721756",        "orgn_shnu_vol": "2201966",        "prsn_shnu_tr_pbmn": "77943",        "frgn_shnu_tr_pbmn": "92615",        "orgn_shnu_tr_pbmn": "281965",        "prsn_seln_vol": "682997",        "frgn_seln_vol": "856356",        "orgn_seln_vol": "1995154",        "prsn_seln_tr_pbmn": "87630",        "frgn_seln_tr_pbmn": "109708",        "orgn_seln_tr_pbmn": "255435"      }  	  ],    "rt_cd": "0",    "msg_cd": "MCA00000",    "msg1": "정상처리 되었습니다!"  }
```

---
### 42. ETF_ETN 현재가

| Field | Value |
|---|---|
| Sheet | `ETF_ETN 현재가` |
| Menu | [국내주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/etfetn/v1/quotations/inquire-price` |
| TR_ID (실전) | `FHPST02400000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `fid_input_iscd` | FID 입력 종목코드 | string | Y | 12 | 종목코드 |
| `fid_cond_mrkt_div_code` | FID 조건 시장 분류 코드 | string | Y | 2 | J |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object | Y |  |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `prdy_vol` | 전일 거래량 | string | Y | 18 |  |
| `stck_mxpr` | 주식 상한가 | string | Y | 10 |  |
| `stck_llam` | 주식 하한가 | string | Y | 10 |  |
| `stck_prdy_clpr` | 주식 전일 종가 | string | Y | 10 |  |
| `stck_oprc` | 주식 시가2 | string | Y | 10 |  |
| `prdy_clpr_vrss_oprc_rate` | 전일 종가 대비 시가2 비율 | string | Y | 84 |  |
| `stck_hgpr` | 주식 최고가 | string | Y | 10 |  |
| `prdy_clpr_vrss_hgpr_rate` | 전일 종가 대비 최고가 비율 | string | Y | 84 |  |
| `stck_lwpr` | 주식 최저가 | string | Y | 10 |  |
| `prdy_clpr_vrss_lwpr_rate` | 전일 종가 대비 최저가 비율 | string | Y | 84 |  |
| `prdy_last_nav` | 전일 최종 NAV | string | Y | 112 |  |
| `nav` | NAV | string | Y | 112 |  |
| `nav_prdy_vrss` | NAV 전일 대비 | string | Y | 112 |  |
| `nav_prdy_vrss_sign` | NAV 전일 대비 부호 | string | Y | 1 |  |
| `nav_prdy_ctrt` | NAV 전일 대비율 | string | Y | 82 |  |
| `trc_errt` | 추적 오차율 | string | Y | 82 |  |
| `stck_sdpr` | 주식 기준가 | string | Y | 10 |  |
| `stck_sspr` | 주식 대용가 | string | Y | 10 |  |
| `nmix_ctrt` | 지수 대비율 | string | Y | 135 |  |
| `etf_crcl_stcn` | ETF 유통 주수 | string | Y | 18 |  |
| `etf_ntas_ttam` | ETF 순자산 총액 | string | Y | 22 |  |
| `etf_frcr_ntas_ttam` | ETF 외화 순자산 총액 | string | Y | 22 |  |
| `frgn_limt_rate` | 외국인 한도 비율 | string | Y | 84 |  |
| `frgn_oder_able_qty` | 외국인 주문 가능 수량 | string | Y | 18 |  |
| `etf_cu_unit_scrt_cnt` | ETF CU 단위 증권 수 | string | Y | 18 |  |
| `etf_cnfg_issu_cnt` | ETF 구성 종목 수 | string | Y | 18 |  |
| `etf_dvdn_cycl` | ETF 배당 주기 | string | Y | 2 |  |
| `crcd` | 통화 코드 | string | Y | 4 |  |
| `etf_crcl_ntas_ttam` | ETF 유통 순자산 총액 | string | Y | 22 |  |
| `etf_frcr_crcl_ntas_ttam` | ETF 외화 유통 순자산 총액 | string | Y | 22 |  |
| `etf_frcr_last_ntas_wrth_val` | ETF 외화 최종 순자산 가치 값 | string | Y | 13 |  |
| `lp_oder_able_cls_code` | LP 주문 가능 구분 코드 | string | Y | 2 |  |
| `stck_dryy_hgpr` | 주식 연중 최고가 | string | Y | 10 |  |
| `dryy_hgpr_vrss_prpr_rate` | 연중 최고가 대비 현재가 비율 | string | Y | 84 |  |
| `dryy_hgpr_date` | 연중 최고가 일자 | string | Y | 8 |  |
| `stck_dryy_lwpr` | 주식 연중 최저가 | string | Y | 10 |  |
| `dryy_lwpr_vrss_prpr_rate` | 연중 최저가 대비 현재가 비율 | string | Y | 84 |  |
| `dryy_lwpr_date` | 연중 최저가 일자 | string | Y | 8 |  |
| `bstp_kor_isnm` | 업종 한글 종목명 | string | Y | 40 | ※ 거래소 정보로 특정 종목은 업종구분이 없어 데이터 미회신 |
| `vi_cls_code` | VI적용구분코드 | string | Y | 1 |  |
| `lstn_stcn` | 상장 주수 | string | Y | 18 |  |
| `frgn_hldn_qty` | 외국인 보유 수량 | string | Y | 18 |  |
| `frgn_hldn_qty_rate` | 외국인 보유 수량 비율 | string | Y | 84 |  |
| `etf_trc_ert_mltp` | ETF 추적 수익률 배수 | string | Y | 126 |  |
| `dprt` | 괴리율 | string | Y | 82 |  |
| `mbcr_name` | 회원사 명 | string | Y | 50 |  |
| `stck_lstn_date` | 주식 상장 일자 | string | Y | 8 |  |
| `mtrt_date` | 만기 일자 | string | Y | 8 |  |
| `shrg_type_code` | 분배금형태코드 | string | Y | 2 |  |
| `lp_hldn_rate` | LP 보유 비율 | string | Y | 84 |  |
| `etf_trgt_nmix_bstp_code` | ETF대상지수업종코드 | string | Y | 4 |  |
| `etf_div_name` | ETF 분류 명 | string | Y | 40 |  |
| `etf_rprs_bstp_kor_isnm` | ETF 대표 업종 한글 종목명 | string | Y | 40 |  |
| `lp_hldn_vol` | ETN LP 보유량 | string | Y | 18 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"J",  "fid_input_iscd":"069500"  }
```

**Response Example:**
```
{      "output": {          "stck_prpr": "36090",          "prdy_vrss_sign": "2",          "prdy_vrss": "110",          "prdy_ctrt": "0.31",          "acml_vol": "3719307",          "prdy_vol": "6463600",          "stck_mxpr": "46770",          "stck_llam": "25190",          "stck_prdy_clpr": "35980",          "stck_oprc": "36300",          "prdy_clpr_vrss_oprc_rate": "0.89",          "stck_hgpr": "36510",          "prdy_clpr_vrss_hgpr_rate": "1.47",          "stck_lwpr": "36040",          "prdy_clpr_vrss_lwpr_rate": "0.17",          "prdy_last_nav": "36036.22",          "nav": "36127.30",          "nav_prdy_vrss": "91.08",          "nav_prdy_vrss_sign": "2",          "nav_prdy_ctrt": "0.25",          "trc_errt": "0.53",          "stck_sdpr": "35980",          "stck_sspr": "28780",          "etf_crcl_stcn": "191550000",          "etf_ntas_ttam": "69027",          "etf_frcr_ntas_ttam": "0",          "frgn_limt_rate": "100.0000",          "frgn_oder_able_qty": "150950685",          "etf_cu_unit_scrt_cnt": "50000",          "etf_cnfg_issu_cnt": "201",          "etf_dvdn_cycl": "2",          "crcd": "KRW",          "etf_crcl_ntas_ttam": "0",          "etf_frcr_crcl_ntas_ttam": "0",          "etf_frcr_last_ntas_wrth_val": "0",          "lp_oder_able_cls_code": "N",          "stck_dryy_hgpr": "36510",          "dryy_hgpr_vrss_prpr_rate": "-1.15",          "dryy_hgpr_date": "20240223",          "stck_dryy_lwpr": "32748",          "dryy_lwpr_vrss_prpr_rate": "10.21",          "dryy_lwpr_date": "20240118",          "bstp_kor_isnm": "ETF(실물복제/수익증권)",          "vi_cls_code": "N",          "lstn_stcn": "191550000",          "frgn_hldn_qty": "40599315",          "frgn_hldn_qty_rate": "21.20",          "etf_trc_ert_mltp": "1.00",          "dprt": "-0.10",          "mbcr_name": "삼성자산운용(ETF)",          "stck_lstn_date": "20021014",          "mtrt_date": "0",          "shrg_type_code": "  ",          "lp_hldn_rate": "0.00",          "etf_trgt_nmix_bstp_code": "2001",          "etf_div_name": "수익증권형",          "etf_rprs_bstp_kor_isnm": "KOSPI200",          "lp_hldn_vol": "0"      },      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 43. 국내주식 장마감 예상체결가

| Field | Value |
|---|---|
| Sheet | `국내주식 장마감 예상체결가` |
| Menu | [국내주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/exp-closing-price` |
| TR_ID (실전) | `FHKST117300C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_RANK_SORT_CLS_CODE` | 순위 정렬 구분 코드 | string | Y | 2 | 0:전체, 1:상한가마감예상, 2:하한가마감예상, 3:직전대비상승률상위 ,4:직전대비하락률상위 |
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (주식 J) |
| `FID_COND_SCR_DIV_CODE` | 조건 화면 분류 코드 | string | Y | 5 | Unique key(11173) |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 0000:전체, 0001:거래소, 1001:코스닥, 2001:코스피200, 4001: KRX100 |
| `FID_BLNG_CLS_CODE` | 소속 구분 코드 | string | Y | 2 | 0:전체, 1:종가범위연장 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `stck_shrn_iscd` | 주식 단축 종목코드 | string | Y | 9 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `sdpr_vrss_prpr` | 기준가 대비 현재가 | string | Y | 10 |  |
| `sdpr_vrss_prpr_rate` | 기준가 대비 현재가 비율 | string | Y | 84 |  |
| `cntg_vol` | 체결 거래량 | string | Y | 18 |  |

**Request Example:**
```
fid_cond_mrkt_div_code:J  fid_cond_scr_div_code:11173  fid_input_iscd:0001  fid_blng_cls_code:0  fid_rank_sort_cls_code:0
```

**Response Example:**
```
{      "output": [],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 44. 주식당일분봉조회

| Field | Value |
|---|---|
| Sheet | `주식당일분봉조회` |
| Menu | [국내주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/inquire-time-itemchartprice` |
| TR_ID (실전) | `FHKST03010200` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | J:KRX, NX:NXT, UN:통합 |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 종목코드 (ex 005930 삼성전자) |
| `FID_INPUT_HOUR_1` | 입력 시간1 | string | Y | 10 | 입력시간 |
| `FID_PW_DATA_INCU_YN` | 과거 데이터 포함 여부 | string | Y | 2 |  |
| `FID_ETC_CLS_CODE` | 기타 구분 코드 | string | Y | 2 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 | 전일 대비 변동 (+-변동차이) |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 | 전일 대비 부호 |
| `prdy_ctrt` | 전일 대비율 | string | Y | 10 | 소수점 두자리까지 제공 |
| `stck_prdy_clpr` | 전일대비 종가 | string | Y | 10 | 전일대비 종가 |
| `acml_vol` | 누적 거래량 | string | Y | 18 | 누적 거래량 |
| `acml_tr_pbmn` | 누적 거래대금 | string | Y | 18 | 누적 거래대금 |
| `hts_kor_isnm` | 한글 종목명 | string | Y | 40 | 한글 종목명 (HTS 기준) |
| `stck_prpr` | 주식 현재가 | string | Y | 10 | 주식 현재가 |
| `output2` | 응답상세 | object array | Y |  | Array |
| `stck_bsop_date` | 주식 영업일자 | string | Y | 8 | 주식 영업일자 |
| `stck_cntg_hour` | 주식 체결시간 | string | Y | 6 | 주식 체결시간 |
| `stck_prpr` | 주식 현재가 | string | Y | 10 | 주식 현재가 |
| `stck_oprc` | 주식 시가 | string | Y | 10 | 주식 시가 |
| `stck_hgpr` | 주식 최고가 | string | Y | 10 | 주식 최고가 |
| `stck_lwpr` | 주식 최저가 | string | Y | 10 | 주식 최저가 |
| `cntg_vol` | 체결 거래량 | string | Y | 18 |  |
| `acml_tr_pbmn` | 누적 거래대금 | string | Y | 18 |  |

**Request Example:**
```
{              "fid_cond_mrkt_div_code": "J",              "fid_etc_cls_code": "",              "fid_input_hour_1": "100000",              "fid_input_iscd": "000660",              "fid_pw_data_incu_yn": "Y"   }
```

**Response Example:**
```
{          "output1": {              "acml_tr_pbmn": "96910660000",              "acml_vol": "1046883",              "hts_kor_isnm": "SK하이닉스",              "prdy_ctrt": "-0.11",              "prdy_vrss": "-100",              "prdy_vrss_sign": "5",              "stck_prdy_clpr": "92400",              "stck_prpr": "92300"          },          "output2": [              {                  "acml_tr_pbmn": "55858827400",                  "cntg_vol": "1383",                  "stck_bsop_date": "20220902",                  "stck_cntg_hour": "100000",                  "stck_hgpr": "92500",                  "stck_lwpr": "92400",                  "stck_oprc": "92400",                  "stck_prpr": "92500"              },              {                  "acml_tr_pbmn": "55731000300",                  "cntg_vol": "1564",                  "stck_bsop_date": "20220902",                  "stck_cntg_hour": "095900",                  "stck_hgpr": "92500",                  "stck_lwpr": "92400",                  "stck_oprc": "92500",                  "stck_prpr": "92400"                                "stck_hgpr": "93300",                  "stck_lwpr": "93100",                  "stck_oprc": "93100",                  "stck_prpr": "93200"              }              ......          ],          "rt_cd": "0",           "msg_cd": "MCA00000",           "msg1": "정상처리 되었습니다!"   }
```

---
### 45. ELW 현재가 시세

| Field | Value |
|---|---|
| Sheet | `ELW 현재가 시세` |
| Menu | [국내주식] ELW 시세 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/inquire-elw-price` |
| TR_ID (실전) | `FHKEW15010000` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | W |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 종목번호 (6자리) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `elw_shrn_iscd` | ELW 단축 종목코드 | string | Y | 9 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `elw_prpr` | ELW 현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 11 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `prdy_vrss_vol_rate` | 전일 대비 거래량 비율 | string | Y | 13 |  |
| `unas_shrn_iscd` | 기초자산 단축 종목코드 | string | Y | 9 |  |
| `unas_isnm` | 기초자산 종목명 | string | Y | 40 |  |
| `unas_prpr` | 기초자산 현재가 | string | Y | 14 |  |
| `unas_prdy_vrss` | 기초자산 전일 대비 | string | Y | 14 |  |
| `unas_prdy_vrss_sign` | 기초자산 전일 대비 부호 | string | Y | 1 |  |
| `unas_prdy_ctrt` | 기초자산 전일 대비율 | string | Y | 11 |  |
| `bidp` | 매수호가 | string | Y | 10 |  |
| `askp` | 매도호가 | string | Y | 10 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |
| `vol_tnrt` | 거래량 회전율 | string | Y | 11 |  |
| `elw_oprc` | ELW 시가2 | string | Y | 10 |  |
| `elw_hgpr` | ELW 최고가 | string | Y | 10 |  |
| `elw_lwpr` | ELW 최저가 | string | Y | 10 |  |
| `stck_prdy_clpr` | 주식 전일 종가 | string | Y | 10 |  |
| `hts_thpr` | HTS 이론가 | string | Y | 14 |  |
| `dprt` | 괴리율 | string | Y | 11 |  |
| `atm_cls_name` | ATM 구분 명 | string | Y | 10 |  |
| `hts_ints_vltl` | HTS 내재 변동성 | string | Y | 16 |  |
| `acpr` | 행사가 | string | Y | 14 |  |
| `pvt_scnd_dmrs_prc` | 피벗 2차 디저항 가격 | string | Y | 10 |  |
| `pvt_frst_dmrs_prc` | 피벗 1차 디저항 가격 | string | Y | 10 |  |
| `pvt_pont_val` | 피벗 포인트 값 | string | Y | 10 |  |
| `pvt_frst_dmsp_prc` | 피벗 1차 디지지 가격 | string | Y | 10 |  |
| `pvt_scnd_dmsp_prc` | 피벗 2차 디지지 가격 | string | Y | 10 |  |
| `dmsp_val` | 디지지 값 | string | Y | 10 |  |
| `dmrs_val` | 디저항 값 | string | Y | 10 |  |
| `elw_sdpr` | ELW 기준가 | string | Y | 10 |  |
| `apprch_rate` | 접근도 | string | Y | 14 |  |
| `tick_conv_prc` | 틱환산가 | string | Y | 11 |  |
| `invt_epmd_cntt` | 투자 유의 내용 | string | Y | 200 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code": "J",  "fid_input_iscd": "000660"  }
```

**Response Example:**
```
{    "output": {      "elw_prpr": "0",      "prdy_vrss": "0",      "prdy_ctrt": "0.00",      "acml_vol": "0",      "prdy_vrss_vol_rate": "0.00",      "unas_isnm": "BASKET",      "unas_prpr": "0.00",      "unas_prdy_vrss": "0.00",      "unas_prdy_vrss_sign": "3",      "unas_prdy_ctrt": "0.00",      "bidp": "0",      "askp": "0",      "acml_tr_pbmn": "0",      "vol_tnrt": "0.00",      "elw_oprc": "0",      "elw_hgpr": "0",      "elw_lwpr": "0",      "stck_prdy_clpr": "0",      "hts_thpr": "0.00",      "dprt": "0.00",      "atm_cls_name": "ATM",      "hts_ints_vltl": "0.00",      "acpr": "0.00",      "pvt_scnd_dmrs_prc": "0",      "pvt_frst_dmrs_prc": "0",      "pvt_pont_val": "0",      "pvt_frst_dmsp_prc": "0",      "pvt_scnd_dmsp_prc": "0",      "dmsp_val": "0",      "dmrs_val": "0",      "elw_sdpr": "0",      "apprch_rate": "0.00",      "tick_conv_prc": "0.00"    },    "rt_cd": "0",    "msg_cd": "MCA00000",    "msg1": "정상처리 되었습니다!"  }
```

---
### 46. ELW 신규상장종목

| Field | Value |
|---|---|
| Sheet | `ELW 신규상장종목` |
| Menu | [국내주식] ELW 시세 |
| Method | `GET` |
| URL | `/uapi/elw/v1/quotations/newly-listed` |
| TR_ID (실전) | `FHKEW154800C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건시장분류코드 | string | Y | 2 | 시장구분코드 (W) |
| `FID_COND_SCR_DIV_CODE` | 조건화면분류코드 | string | Y | 5 | Unique key(11548) |
| `FID_DIV_CLS_CODE` | 분류구분코드 | string | Y | 2 | 전체(02), 콜(00), 풋(01) |
| `FID_UNAS_INPUT_ISCD` | 기초자산입력종목코드 | string | Y | 12 | 'ex) 000000(전체), 2001(코스피200)  , 3003(코스닥150), 005930(삼성전자) ' |
| `FID_INPUT_ISCD_2` | 입력종목코드2 | string | Y | 8 | '00003(한국투자증권), 00017(KB증권),   00005(미래에셋증권)' |
| `FID_INPUT_DATE_1` | 입력날짜1 | string | Y | 10 | 날짜 (ex) 20240402) |
| `FID_BLNC_CLS_CODE` | 결재방법 | string | Y | 2 | 0(전체), 1(일반), 2(조기종료) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stck_lstn_date` | 주식상장일자 | string | Y | 8 |  |
| `elw_kor_isnm` | ELW한글종목명 | string | Y | 40 |  |
| `elw_shrn_iscd` | ELW단축종목코드 | string | Y | 9 |  |
| `unas_isnm` | 기초자산종목명 | string | Y | 40 |  |
| `pblc_co_name` | 발행회사명 | string | Y | 40 |  |
| `lstn_stcn` | 상장주수 | string | Y | 18 |  |
| `acpr` | 행사가 | string | Y | 112 |  |
| `stck_last_tr_date` | 주식최종거래일자 | string | Y | 8 |  |
| `elw_ko_barrier` | 조기종료발생기준가격 | string | Y | 112 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:W  FID_COND_SCR_DIV_CODE:11548  FID_DIV_CLS_CODE:02  FID_UNAS_INPUT_ISCD:000000  FID_INPUT_ISCD_2:00003  FID_INPUT_DATE_1:20240410  FID_BLNG_CLS_CODE:0
```

**Response Example:**
```
{      "output": [          {              "stck_lstn_date": "20240320",              "elw_kor_isnm": "한국K924HLB콜",              "elw_shrn_iscd": "57K924",              "unas_isnm": "HLB",              "pblc_co_name": "한국투자증권(주)",              "lstn_stcn": "7100000",              "acpr": "78000.00",              "stck_last_tr_date": "20240613",              "elw_ko_barrier": "0.00"          },          {              "stck_lstn_date": "20240320",              "elw_kor_isnm": "한국K925HMM콜",              "elw_shrn_iscd": "57K925",              "unas_isnm": "HMM",              "pblc_co_name": "한국투자증권(주)",              "lstn_stcn": "6700000",              "acpr": "20000.00",              "stck_last_tr_date": "20240912",              "elw_ko_barrier": "0.00"          },          {              "stck_lstn_date": "20240320",              "elw_kor_isnm": "한국K926HMM콜",              "elw_shrn_iscd": "57K926",              "unas_isnm": "HMM",              "pblc_co_name": "한국투자증권(주)",              "lstn_stcn": "5600000",              "acpr": "20000.00",              "stck_last_tr_date": "20241212",              "elw_ko_barrier": "0.00"          },          {              "stck_lstn_date": "20240320",              "elw_kor_isnm": "한국KB45HMM풋",              "elw_shrn_iscd": "57KB45",              "unas_isnm": "HMM",              "pblc_co_name": "한국투자증권(주)",              "lstn_stcn": "6900000",              "acpr": "17700.00",              "stck_last_tr_date": "20240613",              "elw_ko_barrier": "0.00"          },          {              "stck_lstn_date": "20240320",              "elw_kor_isnm": "한국K927KB금융콜",              "elw_shrn_iscd": "57K927",              "unas_isnm": "KB금융",              "pblc_co_name": "한국투자증권(주)",              "lstn_stcn": "24400000",              "acpr": "73600.00",              "stck_last_tr_date": "20240613",              "elw_ko_barrier": "0.00"          },          {              "stck_lstn_date": "20240320",              "elw_kor_isnm": "한국K928KB금융콜",              "elw_shrn_iscd": "57K928",              "unas_isnm": "KB금융",              "pblc_co_name": "한국투자증권(주)",              "lstn_stcn": "22300000",              "acpr": "73600.00",              "stck_last_tr_date": "20240912",              "elw_ko_barrier": "0.00"          },          {              "stck_lstn_date": "20240320",              "elw_kor_isnm": "한국K929KB금융콜",              "elw_shrn_iscd": "57K929",              "unas_isnm": "KB금융",              "pblc_co_name": "한국투자증권(주)",              "lstn_stcn": "18200000",              "acpr": "72000.00",              "stck_last_tr_date": "20240711",              "elw_ko_barrier": "0.00"          },          {              "stck_lstn_date": "20240320",              "elw_kor_isnm": "한국K930KB금융콜",              "elw_shrn_iscd": "57K930",              "unas_isnm": "KB금융",              "pblc_co_name": "한국투자증권(주)",              "lstn_stcn": "20000000",              "acpr": "70500.00",              "stck_last_tr_date": "202406
```

---
### 47. ELW 투자지표추이(일별)

| Field | Value |
|---|---|
| Sheet | `ELW 투자지표추이(일별)` |
| Menu | [국내주식] ELW 시세 |
| Method | `GET` |
| URL | `/uapi/elw/v1/quotations/indicator-trend-daily` |
| TR_ID (실전) | `FHPEW02740200` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 시장분류코드 | string | Y | 2 | W |
| `FID_INPUT_ISCD` | 종콕코드 | string | Y | 12 | ex. 57K281 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stck_bsop_date` | 주식영업일자 | string | Y | 8 |  |
| `elw_prpr` | ELW현재가 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일대비부호 | string | Y | 1 |  |
| `prdy_vrss` | 전일대비 | string | Y | 10 |  |
| `prdy_ctrt` | 전일대비율 | string | Y | 82 |  |
| `acml_vol` | 누적거래량 | string | Y | 18 |  |
| `lvrg_val` | 레버리지값 | string | Y | 114 |  |
| `gear` | 기어링 | string | Y | 84 |  |
| `tmvl_val` | 시간가치값 | string | Y | 132 |  |
| `invl_val` | 내재가치값 | string | Y | 132 |  |
| `prit` | 패리티 | string | Y | 112 |  |
| `elw_oprc` | ELW시가2 | string | Y | 10 |  |
| `elw_hgpr` | ELW최고가 | string | Y | 10 |  |
| `elw_lwpr` | ELW최저가 | string | Y | 10 |  |
| `apprch_rate` | 접근도 | string | Y | 112 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:W  FID_INPUT_ISCD:57K281
```

**Response Example:**
```
{      "output": [          {              "stck_bsop_date": "20240503",              "elw_prpr": "40",              "prdy_vrss_sign": "5",              "prdy_vrss": "-5",              "prdy_ctrt": "-11.11",              "acml_vol": "1000020",              "lvrg_val": "-11.0377",              "gear": "19.45",              "tmvl_val": "18.00",              "invl_val": "22.00",              "prit": "102.82",              "elw_oprc": "40",              "elw_hgpr": "40",              "elw_lwpr": "35",              "apprch_rate": "0.00"          },          {              "stck_bsop_date": "20240502",              "elw_prpr": "45",              "prdy_vrss_sign": "3",              "prdy_vrss": "0",              "prdy_ctrt": "0.00",              "acml_vol": "789280",              "lvrg_val": "-9.5810",              "gear": "17.33",              "tmvl_val": "25.00",              "invl_val": "20.00",              "prit": "102.56",              "elw_oprc": "45",              "elw_hgpr": "45",              "elw_lwpr": "35",              "apprch_rate": "0.00"          },          {              "stck_bsop_date": "20240430",              "elw_prpr": "45",              "prdy_vrss_sign": "5",              "prdy_vrss": "-5",              "prdy_ctrt": "-10.00",              "acml_vol": "62090",              "lvrg_val": "-10.0683",              "gear": "17.22",              "tmvl_val": "20.00",              "invl_val": "25.00",              "prit": "103.22",              "elw_oprc": "50",              "elw_hgpr": "50",              "elw_lwpr": "45",              "apprch_rate": "0.00"          },...          {              "stck_bsop_date": "20240117",              "elw_prpr": "0",              "prdy_vrss_sign": "0",              "prdy_vrss": "0",              "prdy_ctrt": "0.00",              "acml_vol": "0",              "lvrg_val": "-0.0000",              "gear": "0.00",              "tmvl_val": "-90.00",              "invl_val": "90.00",              "prit": "0.00",              "elw_oprc": "0",              "elw_hgpr": "0",              "elw_lwpr": "0",              "apprch_rate": "0.00"          }      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 48. ELW 민감도 순위

| Field | Value |
|---|---|
| Sheet | `ELW 민감도 순위` |
| Menu | [국내주식] ELW 시세 |
| Method | `GET` |
| URL | `/uapi/elw/v1/ranking/sensitivity` |
| TR_ID (실전) | `FHPEW02850000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건시장분류코드 | string | Y | 2 | 시장구분코드 (W) |
| `FID_COND_SCR_DIV_CODE` | 조건화면분류코드 | string | Y | 5 | Unique key(20285) |
| `FID_UNAS_INPUT_ISCD` | 기초자산입력종목코드 | string | Y | 12 | '000000(전체), 2001(코스피200)  , 3003(코스닥150), 005930(삼성전자) ' |
| `FID_INPUT_ISCD` | 입력종목코드 | string | Y | 12 | '00000(전체), 00003(한국투자증권)  , 00017(KB증권), 00005(미래에셋주식회사)' |
| `FID_DIV_CLS_CODE` | 콜풋구분코드 | string | Y | 2 | 0(전체), 1(콜), 2(풋) |
| `FID_INPUT_PRICE_1` | 가격(이상) | string | Y | 12 |  |
| `FID_INPUT_PRICE_2` | 가격(이하) | string | Y | 12 |  |
| `FID_INPUT_VOL_1` | 거래량(이상) | string | Y | 18 |  |
| `FID_INPUT_VOL_2` | 거래량(이하) | string | Y | 18 |  |
| `FID_RANK_SORT_CLS_CODE` | 순위정렬구분코드 | string | Y | 2 | '0(이론가), 1(델타), 2(감마), 3(로), 4(베가) , 5(로)  , 6(내재변동성), 7(90일변동성)' |
| `FID_INPUT_RMNN_DYNU_1` | 잔존일수(이상) | string | Y | 5 |  |
| `FID_INPUT_DATE_1` | 조회기준일 | string | Y | 10 |  |
| `FID_BLNG_CLS_CODE` | 결재방법 | string | Y | 2 | 0(전체), 1(일반), 2(조기종료) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `elw_shrn_iscd` | ELW단축종목코드 | string | Y | 9 |  |
| `elw_kor_isnm` | ELW한글종목명 | string | Y | 40 |  |
| `elw_prpr` | ELW현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일대비부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일대비율 | string | Y | 82 |  |
| `acml_vol` | 누적거래량 | string | Y | 18 |  |
| `hts_thpr` | HTS이론가 | string | Y | 112 |  |
| `delta_val` | 델타값 | string | Y | 114 |  |
| `gama` | 감마 | string | Y | 84 |  |
| `theta` | 세타 | string | Y | 84 |  |
| `vega` | 베가 | string | Y | 84 |  |
| `rho` | 로우 | string | Y | 84 |  |
| `hts_ints_vltl` | HTS내재변동성 | string | Y | 114 |  |
| `d90_hist_vltl` | 90일역사적변동성 | string | Y | 114 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:W  FID_COND_SCR_DIV_CODE:20285  FID_UNAS_INPUT_ISCD:000000  FID_INPUT_ISCD:00000  FID_INPUT_RMNN_DYNU_1:0  FID_DIV_CLS_CODE:0  FID_INPUT_PRICE_1:  FID_INPUT_PRICE_2:  FID_INPUT_VOL_1:  FID_INPUT_VOL_2:  FID_RANK_SORT_CLS_CODE:0  FID_INPUT_RMNN_DYNU_1:  FID_INPUT_DATE_1:  FID_BLNG_CLS_CODE:0
```

**Response Example:**
```
{      "output": [          {              "elw_shrn_iscd": "57K852",              "elw_kor_isnm": "한국K852KOSPI200콜",              "elw_prpr": "7770",              "prdy_vrss": "0",              "prdy_vrss_sign": "3",              "prdy_ctrt": "0.00",              "acml_vol": "0",              "hts_thpr": "8290.81",              "delta_val": "1.000000",              "gama": "0.0000",              "theta": "3.8670",              "vega": "0.0000",              "rho": "19.3352",              "hts_ints_vltl": "0.00",              "d90_hist_vltl": "16.793295"          },          {              "elw_shrn_iscd": "57JAVS",              "elw_kor_isnm": "한국JAVSKOSPI200콜",              "elw_prpr": "4690",              "prdy_vrss": "0",              "prdy_vrss_sign": "3",              "prdy_ctrt": "0.00",              "acml_vol": "0",              "hts_thpr": "7891.32",              "delta_val": "1.000000",              "gama": "0.0000",              "theta": "3.9449",              "vega": "0.0000",              "rho": "119.9611",              "hts_ints_vltl": "0.00",              "d90_hist_vltl": "16.793295"          },          {              "elw_shrn_iscd": "57JAVD",              "elw_kor_isnm": "한국JAVDKOSPI200콜",              "elw_prpr": "7800",              "prdy_vrss": "0",              "prdy_vrss_sign": "3",              "prdy_ctrt": "0.00",              "acml_vol": "0",              "hts_thpr": "7793.07",              "delta_val": "0.993055",              "gama": "0.0005",              "theta": "4.3385",              "vega": "4.0200",              "rho": "91.7439",              "hts_ints_vltl": "17.48",              "d90_hist_vltl": "16.793295"          },...      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 49. ELW 기초자산별 종목시세

| Field | Value |
|---|---|
| Sheet | `ELW 기초자산별 종목시세` |
| Menu | [국내주식] ELW 시세 |
| Method | `GET` |
| URL | `/uapi/elw/v1/quotations/udrl-asset-price` |
| TR_ID (실전) | `FHKEW154101C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건시장분류코드 | string | Y | 2 | 시장구분(W) |
| `FID_COND_SCR_DIV_CODE` | 조건화면분류코드 | string | Y | 5 | Uniquekey(11541) |
| `FID_MRKT_CLS_CODE` | 시장구분코드 | string | Y | 2 | 전체(A),콜(C),풋(P) |
| `FID_INPUT_ISCD` | 입력종목코드 | string | Y | 12 | '00000(전체), 00003(한국투자증권)  , 00017(KB증권), 00005(미래에셋주식회사)' |
| `FID_UNAS_INPUT_ISCD` | 기초자산입력종목코드 | string | Y | 12 |  |
| `FID_VOL_CNT` | 거래량수 | string | Y | 12 | 전일거래량(정수량미만) |
| `FID_TRGT_EXLS_CLS_CODE` | 대상제외구분코드 | string | Y | 32 | 거래불가종목제외(0:미체크,1:체크) |
| `FID_INPUT_PRICE_1` | 입력가격1 | string | Y | 12 | 가격~원이상 |
| `FID_INPUT_PRICE_2` | 입력가격2 | string | Y | 12 | 가격~월이하 |
| `FID_INPUT_VOL_1` | 입력거래량1 | string | Y | 18 | 거래량~계약이상 |
| `FID_INPUT_VOL_2` | 입력거래량2 | string | Y | 18 | 거래량~계약이하 |
| `FID_INPUT_RMNN_DYNU_1` | 입력잔존일수1 | string | Y | 5 | 잔존일(~일이상) |
| `FID_INPUT_RMNN_DYNU_2` | 입력잔존일수2 | string | Y | 5 | 잔존일(~일이하) |
| `FID_OPTION` | 옵션 | string | Y | 5 | 옵션상태(0:없음,1:ATM,2:ITM,3:OTM) |
| `FID_INPUT_OPTION_1` | 입력옵션1 | string | Y | 10 |  |
| `FID_INPUT_OPTION_2` | 입력옵션2 | string | Y | 10 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `elw_shrn_iscd` | ELW단축종목코드 | string | Y | 9 |  |
| `hts_kor_isnm` | HTS한글종목명 | string | Y | 40 |  |
| `elw_prpr` | ELW현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일대비부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일대비율 | string | Y | 82 |  |
| `acml_vol` | 누적거래량 | string | Y | 18 |  |
| `acpr` | 행사가 | string | Y | 112 |  |
| `prls_qryr_stpr_prc` | 손익분기주가가격 | string | Y | 112 |  |
| `hts_rmnn_dynu` | HTS잔존일수 | string | Y | 5 |  |
| `hts_ints_vltl` | HTS내재변동성 | string | Y | 114 |  |
| `stck_cnvr_rate` | 주식전환비율 | string | Y | 136 |  |
| `lp_hvol` | LP보유량 | string | Y | 18 |  |
| `lp_rlim` | LP비중 | string | Y | 52 |  |
| `lvrg_val` | 레버리지값 | string | Y | 114 |  |
| `gear` | 기어링 | string | Y | 84 |  |
| `delta_val` | 델타값 | string | Y | 114 |  |
| `gama` | 감마 | string | Y | 84 |  |
| `vega` | 베가 | string | Y | 84 |  |
| `theta` | 세타 | string | Y | 84 |  |
| `prls_qryr_rate` | 손익분기비율 | string | Y | 84 |  |
| `cfp` | 자본지지점 | string | Y | 112 |  |
| `prit` | 패리티 | string | Y | 112 |  |
| `invl_val` | 내재가치값 | string | Y | 132 |  |
| `tmvl_val` | 시간가치값 | string | Y | 132 |  |
| `hts_thpr` | HTS이론가 | string | Y | 112 |  |
| `stck_lstn_date` | 주식상장일자 | string | Y | 8 |  |
| `stck_last_tr_date` | 주식최종거래일자 | string | Y | 8 |  |
| `lp_ntby_qty` | LP순매도량 | string | Y | 18 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:W  FID_COND_SCR_DIV_CODE:11541  FID_MRKT_CLS_CODE:A  FID_INPUT_ISCD:00000  FID_UNAS_INPUT_ISCD:005930  FID_VOL_CNT:  FID_TRGT_EXLS_CLS_CODE:0  FID_INPUT_PRICE_1:  FID_INPUT_PRICE_2:  FID_INPUT_VOL_1:  FID_INPUT_VOL_2:  FID_INPUT_RMNN_DYNU_1:  FID_INPUT_RMNN_DYNU_2:  FID_OPTION:0  FID_INPUT_OPTION_1:  FID_INPUT_OPTION_2:
```

**Response Example:**
```
{      "output": [          {              "elw_shrn_iscd": "57JAAQ",              "hts_kor_isnm": "한국JAAQ삼성전자풋",              "elw_prpr": "10",              "prdy_vrss": "0",              "prdy_vrss_sign": "3",              "prdy_ctrt": "0.00",              "acml_vol": "0",              "acpr": "63300.00",              "prls_qryr_stpr_prc": "62300.00",              "hts_rmnn_dynu": "42",              "hts_ints_vltl": "60.72",              "stck_cnvr_rate": "0.010000",              "lp_hvol": "17298270",              "lp_rlim": "99.99",              "lvrg_val": "-9.448319",              "gear": "77.7000",              "delta_val": "-0.121600",              "gama": "0.0000",              "vega": "0.5078",              "theta": "0.5759",              "prls_qryr_rate": "-19.8100",              "cfp": "-19.5600",              "prit": "81.46",              "invl_val": "0.00",              "tmvl_val": "10.00",              "hts_thpr": "0.18",              "stck_lstn_date": "20231018",              "stck_last_tr_date": "20240613",              "lp_ntby_qty": "0"          },          {              "elw_shrn_iscd": "57JAML",              "hts_kor_isnm": "한국JAML삼성전자콜",              "elw_prpr": "120",              "prdy_vrss": "0",              "prdy_vrss_sign": "3",              "prdy_ctrt": "0.00",              "acml_vol": "0",              "acpr": "64700.00",              "prls_qryr_stpr_prc": "76700.00",              "hts_rmnn_dynu": "7",              "hts_ints_vltl": "0.00",              "stck_cnvr_rate": "0.010000",              "lp_hvol": "11995780",              "lp_rlim": "99.96",              "lvrg_val": "5.184000",              "gear": "6.4800",              "delta_val": "0.800000",              "gama": "0.0000",              "vega": "0.0000",              "theta": "0.0669",              "prls_qryr_rate": "-1.4100",              "cfp": "-1.6700",              "prit": "120.24",              "invl_val": "132.00",              "tmvl_val": "-12.00",              "hts_thpr": "131.60",              "stck_lstn_date": "20231116",              "stck_last_tr_date": "20240509",              "lp_ntby_qty": "0"          },          {              "elw_shrn_iscd": "57JAMM",              "hts_kor_isnm": "한국JAMM삼성전자콜",              "elw_prpr": "115",              "prdy_vrss": "0",              "prdy_vrss_sign": "3",              "prdy_ctrt": "0.00",              "acml_vol": "0",              "acpr": "67300.00",              "prls_qryr_stpr_prc": "78800.00",              "hts_rmnn_dynu": "42",              "hts_ints_vltl": "32.23",              "stck_cnvr_rate": "0.010000",              "lp_hvol": "12499500",              "lp_rlim": "100.00",              "lvrg_val": "6.288443",              "gear": "6.7600",              "delta_val": "0.930243",              "gama": "0.0000",              "vega": "0.3368",              "theta": "0.2915",              "prls_qryr_rate": "1.2800",              "cfp": "1.5000",              "prit": "115.60",              "invl_val"
```

---
### 50. ELW 종목검색

| Field | Value |
|---|---|
| Sheet | `ELW 종목검색` |
| Menu | [국내주식] ELW 시세 |
| Method | `GET` |
| URL | `/uapi/elw/v1/quotations/cond-search` |
| TR_ID (실전) | `FHKEW15100000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건시장분류코드 | string | Y | 2 | ELW(W) |
| `FID_COND_SCR_DIV_CODE` | 조건화면분류코드 | string | Y | 5 | 화면번호(11510) |
| `FID_RANK_SORT_CLS_CODE` | 순위정렬구분코드 | string | Y | 2 | '정렬1정렬안함(0)종목코드(1)현재가(2)대비율(3)거래량(4)행사가격(5)  전환비율(6)상장일(7)만기일(8)잔존일수(9)레버리지(10)' |
| `FID_INPUT_CNT_1` | 입력수1 | string | Y | 12 | 정렬1기준 - 상위(1)하위(2) |
| `FID_RANK_SORT_CLS_CODE_2` | 순위정렬구분코드2 | string | Y | 2 | 정렬2 |
| `FID_INPUT_CNT_2` | 입력수2 | string | Y | 12 | 정렬2기준 - 상위(1)하위(2) |
| `FID_RANK_SORT_CLS_CODE_3` | 순위정렬구분코드3 | string | Y | 2 | 정렬3 |
| `FID_INPUT_CNT_3` | 입력수3 | string | Y | 12 | 정렬3기준 - 상위(1)하위(2) |
| `FID_TRGT_CLS_CODE` | 대상구분코드 | string | Y | 32 | 0:발행회사종목코드,1:기초자산종목코드,2:FID시장구분코드,3:FID입력날짜1(상장일),  4:FID입력날짜2(만기일),5:LP회원사종목코드,6:행사가기초자산비교>=(1) <=(2),   7:잔존일 이상 이하, 8:현재가, 9:전일대비율, 10:거래량, 11:최종거래일, 12:레버리지 |
| `FID_INPUT_ISCD` | 입력종목코드 | string | Y | 12 | 발행사종목코드전체(00000) |
| `FID_UNAS_INPUT_ISCD` | 기초자산입력종목코드 | string | Y | 12 |  |
| `FID_MRKT_CLS_CODE` | 시장구분코드 | string | Y | 2 | 권리유형전체(A)콜(CO)풋(PO) |
| `FID_INPUT_DATE_1` | 입력날짜1 | string | Y | 10 | 상장일전체(0)금일(1)7일이하(2)8~30일(3)31~90일(4) |
| `FID_INPUT_DATE_2` | 입력날짜2 | string | Y | 10 | 만기일전체(0)1개월(1)1~2(2)2~3(3)3~6(4)6~9(5)9~12(6)12이상(7) |
| `FID_INPUT_ISCD_2` | 입력종목코드2 | string | Y | 8 |  |
| `FID_ETC_CLS_CODE` | 기타구분코드 | string | Y | 2 | 행사가전체(0)>=(1) |
| `FID_INPUT_RMNN_DYNU_1` | 입력잔존일수1 | string | Y | 5 | 잔존일이상 |
| `FID_INPUT_RMNN_DYNU_2` | 입력잔존일수2 | string | Y | 5 | 잔존일이하 |
| `FID_PRPR_CNT1` | 현재가수1 | string | Y | 11 | 현재가이상 |
| `FID_PRPR_CNT2` | 현재가수2 | string | Y | 11 | 현재가이하 |
| `FID_RSFL_RATE1` | 등락비율1 | string | Y | 132 | 전일대비율이상 |
| `FID_RSFL_RATE2` | 등락비율2 | string | Y | 132 | 전일대비율이하 |
| `FID_VOL1` | 거래량1 | string | Y | 18 | 거래량이상 |
| `FID_VOL2` | 거래량2 | string | Y | 18 | 거래량이하 |
| `FID_APLY_RANG_PRC_1` | 적용범위가격1 | string | Y | 18 | 최종거래일from |
| `FID_APLY_RANG_PRC_2` | 적용범위가격2 | string | Y | 18 | 최종거래일to |
| `FID_LVRG_VAL1` | 레버리지값1 | string | Y | 114 |  |
| `FID_LVRG_VAL2` | 레버리지값2 | string | Y | 114 |  |
| `FID_VOL3` | 거래량3 | string | Y | 18 | LP종료일from |
| `FID_VOL4` | 거래량4 | string | Y | 18 | LP종료일to |
| `FID_INTS_VLTL1` | 내재변동성1 | string | Y | 114 | 내재변동성이상 |
| `FID_INTS_VLTL2` | 내재변동성2 | string | Y | 114 | 내재변동성이하 |
| `FID_PRMM_VAL1` | 프리미엄값1 | string | Y | 132 | 프리미엄이상 |
| `FID_PRMM_VAL2` | 프리미엄값2 | string | Y | 132 | 프리미엄이하 |
| `FID_GEAR1` | 기어링1 | string | Y | 84 | 기어링이상 |
| `FID_GEAR2` | 기어링2 | string | Y | 84 | 기어링이하 |
| `FID_PRLS_QRYR_RATE1` | 손익분기비율1 | string | Y | 132 | 손익분기이상 |
| `FID_PRLS_QRYR_RATE2` | 손익분기비율2 | string | Y | 132 | 손익분기이하 |
| `FID_DELTA1` | 델타1 | string | Y | 84 | 델타이상 |
| `FID_DELTA2` | 델타2 | string | Y | 84 | 델타이하 |
| `FID_ACPR1` | 행사가1 | string | Y | 133 |  |
| `FID_ACPR2` | 행사가2 | string | Y | 133 |  |
| `FID_STCK_CNVR_RATE1` | 주식전환비율1 | string | Y | 94 | 전환비율이상 |
| `FID_STCK_CNVR_RATE2` | 주식전환비율2 | string | Y | 94 | 전환비율이하 |
| `FID_DIV_CLS_CODE` | 분류구분코드 | string | Y | 2 | 0:전체,1:일반,2:조기종료 |
| `FID_PRIT1` | 패리티1 | string | Y | 112 | 패리티이상 |
| `FID_PRIT2` | 패리티2 | string | Y | 112 | 패리티이하 |
| `FID_CFP1` | 자본지지점1 | string | Y | 112 | 배리어이상 |
| `FID_CFP2` | 자본지지점2 | string | Y | 112 | 배리어이하 |
| `FID_INPUT_NMIX_PRICE_1` | 지수가격1 | string | Y | 112 | LP보유비율이상 |
| `FID_INPUT_NMIX_PRICE_2` | 지수가격2 | string | Y | 112 | LP보유비율이하 |
| `FID_EGEA_VAL1` | E기어링값1 | string | Y | 132 | 접근도이상 |
| `FID_EGEA_VAL2` | E기어링값2 | string | Y | 132 | 접근도이하 |
| `FID_INPUT_DVDN_ERT` | 배당수익율 | string | Y | 112 | 손익분기점이상 |
| `FID_INPUT_HIST_VLTL` | 역사적변동성 | string | Y | 112 | 손익분기점이하 |
| `FID_THETA1` | 세타1 | string | Y | 84 | MONEYNESS이상 |
| `FID_THETA2` | 세타2 | string | Y | 84 | MONEYNESS이하 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `bond_shrn_iscd` | 채권단축종목코드 | string | Y | 9 |  |
| `hts_kor_isnm` | HTS한글종목명 | string | Y | 40 |  |
| `rght_type_name` | 권리유형명 | string | Y | 40 |  |
| `elw_prpr` | ELW현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일대비부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일대비율 | string | Y | 82 |  |
| `acml_vol` | 누적거래량 | string | Y | 18 |  |
| `acpr` | 행사가 | string | Y | 112 |  |
| `stck_cnvr_rate` | 주식전환비율 | string | Y | 136 |  |
| `stck_lstn_date` | 주식상장일자 | string | Y | 8 |  |
| `stck_last_tr_date` | 주식최종거래일자 | string | Y | 8 |  |
| `hts_rmnn_dynu` | HTS잔존일수 | string | Y | 5 |  |
| `unas_isnm` | 기초자산종목명 | string | Y | 40 |  |
| `unas_prpr` | 기초자산현재가 | string | Y | 112 |  |
| `unas_prdy_vrss` | 기초자산전일대비 | string | Y | 112 |  |
| `unas_prdy_vrss_sign` | 기초자산전일대비부호 | string | Y | 1 |  |
| `unas_prdy_ctrt` | 기초자산전일대비율 | string | Y | 82 |  |
| `unas_acml_vol` | 기초자산누적거래량 | string | Y | 18 |  |
| `moneyness` | MONEYNESS | string | Y | 132 |  |
| `atm_cls_name` | ATM구분명 | string | Y | 10 |  |
| `prit` | 패리티 | string | Y | 112 |  |
| `delta_val` | 델타값 | string | Y | 114 |  |
| `hts_ints_vltl` | HTS내재변동성 | string | Y | 114 |  |
| `tmvl_val` | 시간가치값 | string | Y | 132 |  |
| `gear` | 기어링 | string | Y | 84 |  |
| `lvrg_val` | 레버리지값 | string | Y | 114 |  |
| `prls_qryr_rate` | 손익분기비율 | string | Y | 84 |  |
| `cfp` | 자본지지점 | string | Y | 112 |  |
| `lstn_stcn` | 상장주수 | string | Y | 18 |  |
| `pblc_co_name` | 발행회사명 | string | Y | 40 |  |
| `lp_mbcr_name` | LP회원사명 | string | Y | 50 |  |
| `lp_hldn_rate` | LP보유비율 | string | Y | 84 |  |
| `elw_rght_form` | ELW권리형태 | string | Y | 20 |  |
| `elw_ko_barrier` | 조기종료발생기준가격 | string | Y | 112 |  |
| `apprch_rate` | 접근도 | string | Y | 112 |  |
| `unas_shrn_iscd` | 기초자산단축종목코드 | string | Y | 9 |  |
| `mtrt_date` | 만기일자 | string | Y | 8 |  |
| `prmm_val` | 프리미엄값 | string | Y | 114 |  |
| `stck_lp_fin_date` | 주식LP종료일자 | string | Y | 8 |  |
| `tick_conv_prc` | 틱환산가 | string | Y | 11 |  |
| `prls_qryr_stpr_prc` | 손익분기주가가격 | string | Y | 112 |  |
| `lp_hvol` | LP보유량 | string | Y | 18 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:W  FID_COND_SCR_DIV_CODE:11510  FID_RANK_SORT_CLS_CODE:0  FID_INPUT_CNT_1:1  FID_RANK_SORT_CLS_CODE_2:  FID_INPUT_CNT_2:  FID_RANK_SORT_CLS_CODE_3:  FID_INPUT_CNT_3:  FID_TRGT_CLS_CODE:  FID_INPUT_ISCD:  FID_UNAS_INPUT_ISCD:  FID_MRKT_CLS_CODE:  FID_INPUT_DATE_1:  FID_INPUT_DATE_2:  FID_INPUT_ISCD_2:  FID_ETC_CLS_CODE:  FID_INPUT_RMNN_DYNU_1:  FID_INPUT_RMNN_DYNU_2:  FID_PRPR_CNT1:  FID_PRPR_CNT2:  FID_RSFL_RATE1:  FID_RSFL_RATE2:  FID_VOL1:  FID_VOL2:  FID_APLY_RANG_PRC_1:  FID_APLY_RANG_PRC_2:  FID_LVRG_VAL1:  FID_LVRG_VAL2:  FID_VOL3:  FID_VOL4:  FID_INTS_VLTL1:  FID_INTS_VLTL2:  FID_PRMM_VAL1:  FID_PRMM_VAL2:  FID_GEAR1:  FID_GEAR2:  FID_PRLS_QRYR_RATE1:  FID_PRLS_QRYR_RATE2:  FID_DELTA1:  FID_DELTA2:  FID_ACPR1:  FID_ACPR2:  FID_STCK_CNVR_RATE1:  FID_STCK_CNVR_RATE2:  FID_DIV_CLS_CODE:  FID_PRIT1:  FID_PRIT2:  FID_CFP1:  FID_CFP2:  FID_INPUT_NMIX_PRICE_1:  FID_INPUT_NMIX_PRICE_2:  FID_EGEA_VAL1:  FID_EGEA_VAL2:  FID_INPUT_DVDN_ERT:  FID_INPUT_HIST_VLTL:  FID_THETA1:  FID_THETA2:
```

**Response Example:**
```
{      "output": [          {              "bond_shrn_iscd": "57JAES",              "hts_kor_isnm": "한국JAESKOSPI200콜",              "rght_type_name": "CALL",              "elw_prpr": "1560",              "prdy_vrss": "0",              "prdy_vrss_sign": "3",              "prdy_ctrt": "0.00",              "acml_vol": "0",              "acpr": "325.00",              "stck_cnvr_rate": "100.000000",              "stck_lstn_date": "20231018",              "stck_last_tr_date": "20240613",              "hts_rmnn_dynu": "1",              "unas_isnm": "KOSPI200",              "unas_prpr": "377.90",              "unas_prdy_vrss": "6.78",              "unas_prdy_vrss_sign": "2",              "unas_prdy_ctrt": "1.83",              "unas_acml_vol": "80478000",              "moneyness": "16.277",              "atm_cls_name": "ITM",              "prit": "116.27",              "delta_val": "1.000000",              "hts_ints_vltl": "0.00",              "tmvl_val": "-3751.00",              "gear": "24.2200",              "lvrg_val": "24.219999",              "prls_qryr_rate": "-9.8600",              "cfp": "-10.2900",              "lstn_stcn": "10000000",              "pblc_co_name": "한국투자증권(주)",              "lp_mbcr_name": "한국증권",              "lp_hldn_rate": "100.00",              "elw_rght_form": "표준형",              "elw_ko_barrier": "0.00",              "apprch_rate": "0.00",              "unas_shrn_iscd": "2001",              "mtrt_date": "20240617",              "prmm_val": "4.13",              "stck_lp_fin_date": "20240613",              "tick_conv_prc": "5.00",              "prls_qryr_stpr_prc": "340.60",              "lp_hvol": "9999800"          },          {              "bond_shrn_iscd": "57JAET",              "hts_kor_isnm": "한국JAETKOSPI200콜",              "rght_type_name": "CALL",              "elw_prpr": "4090",              "prdy_vrss": "0",              "prdy_vrss_sign": "3",              "prdy_ctrt": "0.00",              "acml_vol": "0",              "acpr": "322.50",              "stck_cnvr_rate": "100.000000",              "stck_lstn_date": "20231018",              "stck_last_tr_date": "20240613",              "hts_rmnn_dynu": "1",              "unas_isnm": "KOSPI200",              "unas_prpr": "377.90",              "unas_prdy_vrss": "6.78",              "unas_prdy_vrss_sign": "2",              "unas_prdy_ctrt": "1.83",              "unas_acml_vol": "80478000",              "moneyness": "17.178",              "atm_cls_name": "ITM",              "prit": "117.17",              "delta_val": "1.000000",              "hts_ints_vltl": "0.00",              "tmvl_val": "-1471.00",              "gear": "9.2300",              "lvrg_val": "9.230000",              "prls_qryr_rate": "-3.8300",              "cfp": "-4.2900",              "lstn_stcn": "9000000",              "pblc_co_name": "한국투자증권(주)",              "lp_mbcr_name": "한국증권",              "lp_hldn_rate": "99.99",              "elw_rght_form": "표준형",              "elw_ko_barrier": "0.00",       
```

---
### 51. ELW 변동성 추이(분별)

| Field | Value |
|---|---|
| Sheet | `ELW 변동성 추이(분별)` |
| Menu | [국내주식] ELW 시세 |
| Method | `GET` |
| URL | `/uapi/elw/v1/quotations/volatility-trend-minute` |
| TR_ID (실전) | `FHPEW02840300` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건시장분류코드 | string | Y | 2 | W(Unique key) |
| `FID_INPUT_ISCD` | 입력종목코드 | string | Y | 12 | ex) 58J297(KBJ297삼성전자콜) |
| `FID_HOUR_CLS_CODE` | 시간구분코드 | string | Y | 5 | '60(1분), 180(3분), 300(5분), 600(10분), 1800(30분), 3600(60분)  ' |
| `FID_PW_DATA_INCU_YN` | 과거데이터 포함 여부 | string | Y | 2 | N(과거데이터포함X),Y(과거데이터포함O) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stck_bsop_date` | 주식 영업 일자 | string | Y | 6 |  |
| `stck_cntg_hour` | 주식 체결 시간 | string | Y | 10 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `elw_oprc` | ELW 시가2 | string | Y | 1 |  |
| `elw_hgpr` | ELW 최고가 | string | Y | 82 |  |
| `elw_lwpr` | ELW 최저가 | string | Y | 10 |  |
| `hts_ints_vltl` | HTS 내재 변동성 | string | Y | 10 |  |
| `hist_vltl` | 역사적 변동성 | string | Y | 18 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:W  FID_INPUT_ISCD:57JS61  FID_HOUR_CLS_CODE:60  FID_PW_DATA_INCU_YN:N
```

**Response Example:**
```
{      "output": [          {              "stck_bsop_date": "20240422",              "stck_cntg_hour": "142800",              "stck_prpr": "265",              "elw_oprc": "265",              "elw_hgpr": "265",              "elw_lwpr": "265",              "hts_ints_vltl": "21.90",              "hist_vltl": ""          },          {              "stck_bsop_date": "20240422",              "stck_cntg_hour": "142700",              "stck_prpr": "265",              "elw_oprc": "270",              "elw_hgpr": "270",              "elw_lwpr": "260",              "hts_ints_vltl": "21.90",              "hist_vltl": ""          },          {              "stck_bsop_date": "20240422",              "stck_cntg_hour": "142600",              "stck_prpr": "275",              "elw_oprc": "275",              "elw_hgpr": "275",              "elw_lwpr": "275",              "hts_ints_vltl": "22.06",              "hist_vltl": ""          },          {              "stck_bsop_date": "20240422",              "stck_cntg_hour": "142500",              "stck_prpr": "270",              "elw_oprc": "275",              "elw_hgpr": "275",              "elw_lwpr": "270",              "hts_ints_vltl": "22.06",              "hist_vltl": ""          },  		...          {              "stck_bsop_date": "20240422",              "stck_cntg_hour": "124900",              "stck_prpr": "275",              "elw_oprc": "280",              "elw_hgpr": "280",              "elw_lwpr": "275",              "hts_ints_vltl": "22.24",              "hist_vltl": ""          }      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 52. ELW 변동성추이(체결)

| Field | Value |
|---|---|
| Sheet | `ELW 변동성추이(체결)` |
| Menu | [국내주식] ELW 시세 |
| Method | `GET` |
| URL | `/uapi/elw/v1/quotations/volatility-trend-ccnl` |
| TR_ID (실전) | `FHPEW02840100` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건시장분류코드 | string | Y | 2 | W(Unique key) |
| `FID_INPUT_ISCD` | 입력종목코드 | string | Y | 12 | ex) 58J297(KBJ297삼성전자콜) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  |  |
| `stck_cntg_hour` | 주식체결시간 | string | Y | 6 |  |
| `elw_prpr` | ELW현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일대비부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일대비율 | string | Y | 82 |  |
| `bidp` | 매수호가 | string | Y | 10 |  |
| `askp` | 매도호가 | string | Y | 10 |  |
| `acml_vol` | 누적거래량 | string | Y | 18 |  |
| `hts_ints_vltl` | HTS내재변동성 | string | Y | 114 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:W  FID_INPUT_ISCD:58J540
```

**Response Example:**
```
{      "output": [          {              "stck_cntg_hour": "150121",              "elw_prpr": "45",              "prdy_vrss": "-10",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-18.18",              "bidp": "45",              "askp": "50",              "acml_vol": "52690",              "hts_ints_vltl": "33.05"          },          {              "stck_cntg_hour": "140354",              "elw_prpr": "45",              "prdy_vrss": "-10",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-18.18",              "bidp": "45",              "askp": "0",              "acml_vol": "52680",              "hts_ints_vltl": "31.96"          },          {              "stck_cntg_hour": "140340",              "elw_prpr": "45",              "prdy_vrss": "-10",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-18.18",              "bidp": "45",              "askp": "0",              "acml_vol": "47680",              "hts_ints_vltl": "31.96"          },          {              "stck_cntg_hour": "140334",              "elw_prpr": "45",              "prdy_vrss": "-10",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-18.18",              "bidp": "45",              "askp": "50",              "acml_vol": "47670",              "hts_ints_vltl": "31.96"          },          {              "stck_cntg_hour": "140334",              "elw_prpr": "45",              "prdy_vrss": "-10",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-18.18",              "bidp": "45",              "askp": "50",              "acml_vol": "42690",              "hts_ints_vltl": "31.96"          },          {              "stck_cntg_hour": "140334",              "elw_prpr": "45",              "prdy_vrss": "-10",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-18.18",              "bidp": "45",              "askp": "50",              "acml_vol": "42680",              "hts_ints_vltl": "31.96"          },          {              "stck_cntg_hour": "140334",              "elw_prpr": "45",              "prdy_vrss": "-10",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-18.18",              "bidp": "45",              "askp": "50",              "acml_vol": "37680",              "hts_ints_vltl": "31.96"          },          {              "stck_cntg_hour": "114800",              "elw_prpr": "50",              "prdy_vrss": "-5",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-9.09",              "bidp": "50",              "askp": "55",              "acml_vol": "37670",              "hts_ints_vltl": "33.49"          },          {              "stck_cntg_hour": "114046",              "elw_prpr": "50",              "prdy_vrss": "-5",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-9.09",              "bidp": "50",              "askp": "55",              "acml_vol": "32670",              "hts_ints_vltl": "26.54"          },          {              "stck_cntg_hour": "104344",  
```

---
### 53. ELW 당일급변종목

| Field | Value |
|---|---|
| Sheet | `ELW 당일급변종목` |
| Menu | [국내주식] ELW 시세 |
| Method | `GET` |
| URL | `/uapi/elw/v1/ranking/quick-change` |
| TR_ID (실전) | `FHPEW02870000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건시장분류코드 | string | Y | 2 | 시장구분코드 (W) |
| `FID_COND_SCR_DIV_CODE` | 조건화면분류코드 | string | Y | 5 | Unique key(20287) |
| `FID_UNAS_INPUT_ISCD` | 기초자산입력종목코드 | string | Y | 12 | '000000(전체), 2001(코스피200)  , 3003(코스닥150), 005930(삼성전자) ' |
| `FID_INPUT_ISCD` | 발행사 | string | Y | 12 | '00000(전체), 00003(한국투자증권)  , 00017(KB증권), 00005(미래에셋주식회사)' |
| `FID_MRKT_CLS_CODE` | 시장구분코드 | string | Y | 2 | Unique key(A) |
| `FID_INPUT_PRICE_1` | 가격(이상) | string | Y | 12 |  |
| `FID_INPUT_PRICE_2` | 가격(이하) | string | Y | 12 |  |
| `FID_INPUT_VOL_1` | 거래량(이상) | string | Y | 18 |  |
| `FID_INPUT_VOL_2` | 거래량(이하) | string | Y | 18 |  |
| `FID_HOUR_CLS_CODE` | 시간구분코드 | string | Y | 5 | 1(분), 2(일) |
| `FID_INPUT_HOUR_1` | 입력 일 또는 분 | string | Y | 10 |  |
| `FID_INPUT_HOUR_2` | 기준시간(분 선택 시) | string | Y | 10 |  |
| `FID_RANK_SORT_CLS_CODE` | 순위정렬구분코드 | string | Y | 2 | '1(가격급등), 2(가격급락), 3(거래량급증)  , 4(매수잔량급증), 5(매도잔량급증)' |
| `FID_BLNG_CLS_CODE` | 결재방법 | string | Y | 2 | 0(전체), 1(일반), 2(조기종료) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `elw_shrn_iscd` | ELW단축종목코드 | string | Y | 9 |  |
| `elw_kor_isnm` | ELW한글종목명 | string | Y | 40 |  |
| `elw_prpr` | ELW현재가 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일대비부호 | string | Y | 1 |  |
| `prdy_vrss` | 전일대비 | string | Y | 10 |  |
| `prdy_ctrt` | 전일대비율 | string | Y | 82 |  |
| `askp` | 매도호가 | string | Y | 10 |  |
| `bidp` | 매수호가 | string | Y | 10 |  |
| `total_askp_rsqn` | 총매도호가잔량 | string | Y | 12 |  |
| `total_bidp_rsqn` | 총매수호가잔량 | string | Y | 12 |  |
| `acml_vol` | 누적거래량 | string | Y | 18 |  |
| `stnd_val` | 기준값 | string | Y | 10 |  |
| `stnd_val_vrss` | 기준값대비 | string | Y | 11 |  |
| `stnd_val_ctrt` | 기준값대비율 | string | Y | 162 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:W  FID_COND_SCR_DIV_CODE:20287  FID_UNAS_INPUT_ISCD:000000  FID_INPUT_ISCD:00000  FID_MRKT_CLS_CODE:A  FID_INPUT_PRICE_1:  FID_INPUT_PRICE_2:  FID_INPUT_VOL_1:  FID_INPUT_VOL_2:  FID_HOUR_CLS_CODE:2  FID_INPUT_HOUR_1:1  FID_INPUT_HOUR_2:  FID_RANK_SORT_CLS_CODE:1  FID_BLNG_CLS_CODE:0
```

**Response Example:**
```
{      "output": [          {              "elw_shrn_iscd": "57JAKW",              "elw_kor_isnm": "한국JAKWLS일렉콜",              "elw_prpr": "460",              "prdy_vrss_sign": "2",              "prdy_vrss": "350",              "prdy_ctrt": "318.18",              "askp": "0",              "bidp": "145",              "total_askp_rsqn": "0",              "total_bidp_rsqn": "49060",              "acml_vol": "3320",              "stnd_val": "110",              "stnd_val_vrss": "350",              "stnd_val_ctrt": "318.18"          },          {              "elw_shrn_iscd": "58JF27",              "elw_kor_isnm": "KBJF27KOSPI200콜",              "elw_prpr": "2395",              "prdy_vrss_sign": "2",              "prdy_vrss": "1745",              "prdy_ctrt": "268.46",              "askp": "0",              "bidp": "15",              "total_askp_rsqn": "0",              "total_bidp_rsqn": "29000",              "acml_vol": "100",              "stnd_val": "650",              "stnd_val_vrss": "1745",              "stnd_val_ctrt": "268.46"          },...      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 54. ELW 투자지표추이(분별)

| Field | Value |
|---|---|
| Sheet | `ELW 투자지표추이(분별)` |
| Menu | [국내주식] ELW 시세 |
| Method | `GET` |
| URL | `/uapi/elw/v1/quotations/indicator-trend-minute` |
| TR_ID (실전) | `FHPEW02740300` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건시장분류코드 | string | Y | 2 | 시장구분코드 (W) |
| `FID_INPUT_ISCD` | 입력종목코드 | string | Y | 12 | ex) 58J297(KBJ297삼성전자콜) |
| `FID_HOUR_CLS_CODE` | 시간구분코드 | string | Y | 5 | '60(1분), 180(3분), 300(5분), 600(10분), 1800(30분), 3600(60분), 7200(60분)  ' |
| `FID_PW_DATA_INCU_YN` | 과거데이터 포함 여부 | string | Y | 2 | N(과거데이터포함X),Y(과거데이터포함O) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stck_bsop_date` | 주식영업일자 | string | Y | 8 |  |
| `stck_cntg_hour` | 주식체결시간 | string | Y | 6 |  |
| `elw_prpr` | ELW현재가 | string | Y | 10 |  |
| `elw_oprc` | ELW시가2 | string | Y | 10 |  |
| `elw_hgpr` | ELW최고가 | string | Y | 10 |  |
| `elw_lwpr` | ELW최저가 | string | Y | 10 |  |
| `lvrg_val` | 레버리지값 | string | Y | 114 |  |
| `gear` | 기어링 | string | Y | 84 |  |
| `prmm_val` | 프리미엄값 | string | Y | 114 |  |
| `invl_val` | 내재가치값 | string | Y | 132 |  |
| `prit` | 패리티 | string | Y | 112 |  |
| `acml_vol` | 누적거래량 | string | Y | 18 |  |
| `cntg_vol` | 체결거래량 | string | Y | 18 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:W  FID_INPUT_ISCD:57K281  FID_HOUR_CLS_CODE:60  FID_PW_DATA_INCU_YN:Y
```

**Response Example:**
```
{      "output": [          {              "stck_bsop_date": "20240503",              "stck_cntg_hour": "131900",              "elw_prpr": "40",              "elw_oprc": "40",              "elw_hgpr": "40",              "elw_lwpr": "40",              "lvrg_val": "-10.8818",              "gear": "19.5700",              "prmm_val": "5.1086",              "invl_val": "17.00",              "prit": "102.17",              "acml_vol": "827720",              "cntg_vol": "55700"          },          {              "stck_bsop_date": "20240503",              "stck_cntg_hour": "131800",              "elw_prpr": "40",              "elw_oprc": "40",              "elw_hgpr": "40",              "elw_lwpr": "40",              "lvrg_val": "19.5700",              "gear": "33.5300",              "prmm_val": "5.1086",              "invl_val": "17.00",              "prit": "-10.72",              "acml_vol": "772020",              "cntg_vol": "0"          },          {              "stck_bsop_date": "20240503",              "stck_cntg_hour": "131700",              "elw_prpr": "40",              "elw_oprc": "40",              "elw_hgpr": "40",              "elw_lwpr": "40",              "lvrg_val": "19.5700",              "gear": "33.5300",              "prmm_val": "5.1086",              "invl_val": "17.00",              "prit": "-10.72",              "acml_vol": "772020",              "cntg_vol": "0"          },          {              "stck_bsop_date": "20240503",              "stck_cntg_hour": "131600",              "elw_prpr": "40",              "elw_oprc": "40",              "elw_hgpr": "40",              "elw_lwpr": "40",              "lvrg_val": "19.5700",              "gear": "33.5300",              "prmm_val": "5.1086",              "invl_val": "17.00",              "prit": "-10.72",              "acml_vol": "772020",              "cntg_vol": "0"          },          {              "stck_bsop_date": "20240503",              "stck_cntg_hour": "131500",              "elw_prpr": "40",              "elw_oprc": "40",              "elw_hgpr": "40",              "elw_lwpr": "40",              "lvrg_val": "19.5700",              "gear": "33.5300",              "prmm_val": "5.1086",              "invl_val": "17.00",              "prit": "-10.72",              "acml_vol": "772020",              "cntg_vol": "0"          },          {              "stck_bsop_date": "20240503",              "stck_cntg_hour": "131400",              "elw_prpr": "40",              "elw_oprc": "40",              "elw_hgpr": "40",              "elw_lwpr": "40",              "lvrg_val": "19.5700",              "gear": "33.5300",              "prmm_val": "5.1086",              "invl_val": "17.00",              "prit": "-10.72",              "acml_vol": "772020",              "cntg_vol": "0"          },          {              "stck_bsop_date": "20240503",              "stck_cntg_hour": "131300",              "elw_prpr": "40",              "elw_oprc": "40",              "elw_hgpr": "40",           
```

---
### 55. ELW 기초자산 목록조회

| Field | Value |
|---|---|
| Sheet | `ELW 기초자산 목록조회` |
| Menu | [국내주식] ELW 시세 |
| Method | `GET` |
| URL | `/uapi/elw/v1/quotations/udrl-asset-list` |
| TR_ID (실전) | `FHKEW154100C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_SCR_DIV_CODE` | 조건화면분류코드 | string | Y | 5 | 11541(Primary key) |
| `FID_RANK_SORT_CLS_CODE` | 순위정렬구분코드 | string | Y | 2 | 0(종목명순), 1(콜발행종목순), 2(풋발행종목순), 3(전일대비 상승율순), 4(전일대비 하락율순), 5(현재가 크기순), 6(종목코드순) |
| `FID_INPUT_ISCD` | 입력종목코드 | string | Y | 12 | 00000(전체), 00003(한국투자증권), 00017(KB증권), 00005(미래에셋) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `unas_shrn_iscd` | 기초자산단축종목코드 | string | Y | 9 |  |
| `unas_isnm` | 기초자산종목명 | string | Y | 40 |  |
| `unas_prpr` | 기초자산현재가 | string | Y | 112 |  |
| `unas_prdy_vrss` | 기초자산전일대비 | string | Y | 112 |  |
| `unas_prdy_vrss_sign` | 기초자산전일대비부호 | string | Y | 1 |  |
| `unas_prdy_ctrt` | 기초자산전일대비율 | string | Y | 82 |  |

**Request Example:**
```
FID_COND_SCR_DIV_CODE:11541  FID_RANK_SORT_CLS_CODE:0  FID_INPUT_ISCD:00000
```

**Response Example:**
```
{      "output": [          {              "unas_shrn_iscd": "2001",              "unas_isnm": "KOSPI200",              "unas_prpr": "371.33",              "unas_prdy_vrss": "0.17",              "unas_prdy_vrss_sign": "2",              "unas_prdy_ctrt": "0.05"          },          {              "unas_shrn_iscd": "000990",              "unas_isnm": "DB하이텍",              "unas_prpr": "40850.00",              "unas_prdy_vrss": "-300.00",              "unas_prdy_vrss_sign": "5",              "unas_prdy_ctrt": "-0.73"          },          {              "unas_shrn_iscd": "009540",              "unas_isnm": "HD한국조선해양",              "unas_prpr": "135400.00",              "unas_prdy_vrss": "1100.00",              "unas_prdy_vrss_sign": "2",              "unas_prdy_ctrt": "0.82"          },          {              "unas_shrn_iscd": "267260",              "unas_isnm": "HD현대일렉트릭",              "unas_prpr": "302500.00",              "unas_prdy_vrss": "9000.00",              "unas_prdy_vrss_sign": "2",              "unas_prdy_ctrt": "3.07"          },          {              "unas_shrn_iscd": "028300",              "unas_isnm": "HLB",              "unas_prpr": "64700.00",              "unas_prdy_vrss": "8500.00",              "unas_prdy_vrss_sign": "2",              "unas_prdy_ctrt": "15.12"          },          {              "unas_shrn_iscd": "011200",              "unas_isnm": "HMM",              "unas_prpr": "18010.00",              "unas_prdy_vrss": "460.00",              "unas_prdy_vrss_sign": "2",              "unas_prdy_ctrt": "2.62"          },          {              "unas_shrn_iscd": "403870",              "unas_isnm": "HPSP",              "unas_prpr": "45200.00",              "unas_prdy_vrss": "2900.00",              "unas_prdy_vrss_sign": "2",              "unas_prdy_ctrt": "6.86"          },          {              "unas_shrn_iscd": "035900",              "unas_isnm": "JYP Ent.",              "unas_prpr": "58800.00",              "unas_prdy_vrss": "-1700.00",              "unas_prdy_vrss_sign": "5",              "unas_prdy_ctrt": "-2.81"          },          {              "unas_shrn_iscd": "105560",              "unas_isnm": "KB금융",              "unas_prpr": "77100.00",              "unas_prdy_vrss": "800.00",              "unas_prdy_vrss_sign": "2",              "unas_prdy_ctrt": "1.05"          },          {              "unas_shrn_iscd": "3003",              "unas_isnm": "KSQ150",              "unas_prpr": "1355.15",              "unas_prdy_vrss": "0.44",              "unas_prdy_vrss_sign": "2",              "unas_prdy_ctrt": "0.03"          },          {              "unas_shrn_iscd": "030200",              "unas_isnm": "KT",              "unas_prpr": "36150.00",              "unas_prdy_vrss": "-450.00",              "unas_prdy_vrss_sign": "5",              "unas_prdy_ctrt": "-1.23"          },          {              "unas_shrn_iscd": "033780",              "unas_isnm": "KT&G",              "unas_prpr": "86100.00",              "unas_prdy
```

---
### 56. ELW 변동성 추이(일별)

| Field | Value |
|---|---|
| Sheet | `ELW 변동성 추이(일별)` |
| Menu | [국내주식] ELW 시세 |
| Method | `GET` |
| URL | `/uapi/elw/v1/quotations/volatility-trend-daily` |
| TR_ID (실전) | `FHPEW02840200` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건시장분류코드 | string | Y | 2 | 시장구분코드 (W) |
| `FID_INPUT_ISCD` | 입력종목코드 | string | Y | 12 | ex) 58J297(KBJ297삼성전자콜) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stck_bsop_date` | 주식 영업 일자 | string | Y | 8 |  |
| `elw_prpr` | ELW 현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일대비부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일대비율 | string | Y | 8 |  |
| `elw_oprc` | elw 시가2 | string | Y | 10 |  |
| `elw_hgpr` | elw 최고가 | string | Y | 10 |  |
| `elw_lwpr` | elw 최저가 | string | Y | 10 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `d10_hist_vltl` | 10일 역사적 변동성 | string | Y | 11 |  |
| `d20_hist_vltl` | 20일 역사적 변동성 | string | Y | 11 |  |
| `d30_hist_vltl` | 30일 역사적 변동성 | string | Y | 11 |  |
| `d60_hist_vltl` | 60일 역사적 변동성 | string | Y | 11 |  |
| `d90_hist_vltl` | 90일 역사적 변동성 | string | Y | 11 |  |
| `hts_ints_vltl` | HTS 내재 변동성 | string | Y | 11 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:W  FID_INPUT_ISCD:57JS61
```

**Response Example:**
```
{      "output": [          {              "stck_bsop_date": "20240503",              "elw_prpr": "5",              "prdy_vrss": "0",              "prdy_vrss_sign": "3",              "prdy_ctrt": "0.00",              "elw_oprc": "5",              "elw_hgpr": "5",              "elw_lwpr": "5",              "acml_vol": "76410",              "d10_hist_vltl": "21.05",              "d20_hist_vltl": "20.32",              "d30_hist_vltl": "19.58",              "d60_hist_vltl": "17.91",              "d90_hist_vltl": "18.33",              "hts_ints_vltl": "23.37"          },          {              "stck_bsop_date": "20240502",              "elw_prpr": "5",              "prdy_vrss": "-15",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-75.00",              "elw_oprc": "20",              "elw_hgpr": "20",              "elw_lwpr": "5",              "acml_vol": "6509850",              "d10_hist_vltl": "23.00",              "d20_hist_vltl": "21.31",              "d30_hist_vltl": "20.17",              "d60_hist_vltl": "19.07",              "d90_hist_vltl": "18.33",              "hts_ints_vltl": "20.16"          },          {              "stck_bsop_date": "20240430",              "elw_prpr": "20",              "prdy_vrss": "-5",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-20.00",              "elw_oprc": "25",              "elw_hgpr": "25",              "elw_lwpr": "15",              "acml_vol": "1839420",              "d10_hist_vltl": "23.69",              "d20_hist_vltl": "21.39",              "d30_hist_vltl": "20.42",              "d60_hist_vltl": "19.43",              "d90_hist_vltl": "18.33",              "hts_ints_vltl": "23.45"          },          {              "stck_bsop_date": "20240429",              "elw_prpr": "25",              "prdy_vrss": "-40",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-61.54",              "elw_oprc": "35",              "elw_hgpr": "40",              "elw_lwpr": "25",              "acml_vol": "3301030",              "d10_hist_vltl": "26.85",              "d20_hist_vltl": "21.38",              "d30_hist_vltl": "20.48",              "d60_hist_vltl": "19.44",              "d90_hist_vltl": "18.37",              "hts_ints_vltl": "21.85"          },          {              "stck_bsop_date": "20240426",              "elw_prpr": "65",              "prdy_vrss": "-70",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-51.85",              "elw_oprc": "65",              "elw_hgpr": "95",              "elw_lwpr": "50",              "acml_vol": "11476800",              "d10_hist_vltl": "26.51",              "d20_hist_vltl": "21.14",              "d30_hist_vltl": "21.13",              "d60_hist_vltl": "19.34",              "d90_hist_vltl": "18.45",              "hts_ints_vltl": "22.04"          },          {              "stck_bsop_date": "20240425",              "elw_prpr": "135",              "prdy_vrss": "80",              "prdy_vrss_sign": "2",              "prdy_
```

---
### 57. ELW 거래량순위

| Field | Value |
|---|---|
| Sheet | `ELW 거래량순위` |
| Menu | [국내주식] ELW 시세 |
| Method | `GET` |
| URL | `/uapi/elw/v1/ranking/volume-rank` |
| TR_ID (실전) | `FHPEW02780000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건시장분류코드 | string | Y | 2 | W |
| `FID_COND_SCR_DIV_CODE` | 조건화면분류코드 | string | Y | 5 | 20278 |
| `FID_UNAS_INPUT_ISCD` | 기초자산입력종목코드 | string | Y | 12 | 000000 |
| `FID_INPUT_ISCD` | 발행사 | string | Y | 12 | 00000(전체), 00003(한국투자증권)  , 00017(KB증권), 00005(미래에셋주식회사)' |
| `FID_INPUT_RMNN_DYNU_1` | 입력잔존일수 | string | Y | 5 |  |
| `FID_DIV_CLS_CODE` | 콜풋구분코드 | string | Y | 2 | 0(전체), 1(콜), 2(풋) |
| `FID_INPUT_PRICE_1` | 가격(이상) | string | Y | 12 | 거래가격1(이상) |
| `FID_INPUT_PRICE_2` | 가격(이하) | string | Y | 12 | 거래가격1(이하) |
| `FID_INPUT_VOL_1` | 거래량(이상) | string | Y | 18 | 거래량1(이상) |
| `FID_INPUT_VOL_2` | 거래량(이하) | string | Y | 18 | 거래량1(이하) |
| `FID_INPUT_DATE_1` | 조회기준일 | string | Y | 10 | 입력날짜(기준가 조회기준) |
| `FID_RANK_SORT_CLS_CODE` | 순위정렬구분코드 | string | Y | 2 | 0: 거래량순 1: 평균거래증가율 2: 평균거래회전율 3:거래금액순 4: 순매수잔량순 5: 순매도잔량순 |
| `FID_BLNG_CLS_CODE` | 소속구분코드 | string | Y | 2 | 0: 전체 |
| `FID_INPUT_ISCD_2` | LP발행사 | string | Y | 8 | 0000 |
| `FID_INPUT_DATE_2` | 만기일-최종거래일조회 | string | Y | 10 | 공백 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `elw_kor_isnm` | ELW한글종목명 | string | Y | 40 |  |
| `elw_shrn_iscd` | ELW단축종목코드 | string | Y | 9 |  |
| `elw_prpr` | ELW현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일대비부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일대비율 | string | Y | 82 |  |
| `lstn_stcn` | 상장주수 | string | Y | 18 |  |
| `acml_vol` | 누적거래량 | string | Y | 18 |  |
| `n_prdy_vol` | N전일거래량 | string | Y | 18 |  |
| `n_prdy_vol_vrss` | N전일거래량대비 | string | Y | 18 |  |
| `vol_inrt` | 거래량증가율 | string | Y | 84 |  |
| `vol_tnrt` | 거래량회전율 | string | Y | 82 |  |
| `nday_vol_tnrt` | N일거래량회전율 | string | Y | 8 |  |
| `acml_tr_pbmn` | 누적거래대금 | string | Y | 18 |  |
| `n_prdy_tr_pbmn` | N전일거래대금 | string | Y | 18 |  |
| `n_prdy_tr_pbmn_vrss` | N전일거래대금대비 | string | Y | 18 |  |
| `total_askp_rsqn` | 총매도호가잔량 | string | Y | 12 |  |
| `total_bidp_rsqn` | 총매수호가잔량 | string | Y | 12 |  |
| `ntsl_rsqn` | 순매도잔량 | string | Y | 13 |  |
| `ntby_rsqn` | 순매수잔량 | string | Y | 12 |  |
| `seln_rsqn_rate` | 매도잔량비율 | string | Y | 84 |  |
| `shnu_rsqn_rate` | 매수2잔량비율 | string | Y | 84 |  |
| `stck_cnvr_rate` | 주식전환비율 | string | Y | 136 |  |
| `hts_rmnn_dynu` | HTS잔존일수 | string | Y | 5 |  |
| `invl_val` | 내재가치값 | string | Y | 132 |  |
| `tmvl_val` | 시간가치값 | string | Y | 132 |  |
| `acpr` | 행사가 | string | Y | 112 |  |
| `lp_mbcr_name` | LP회원사명 | string | Y | 50 |  |
| `unas_isnm` | 기초자산명 | string | Y | 40 |  |
| `stck_last_tr_date` | 최종거래일 | string | Y | 8 |  |
| `unas_shrn_iscd` | 기초자산코드 | string | Y | 12 |  |
| `prdy_vol` | 전일거래량 | string | Y | 18 |  |
| `lp_hldn_rate` | LP보유비율 | string | Y | 84 |  |
| `prit` | 패리티 | string | Y | 112 |  |
| `prls_qryr_stpr_prc` | 손익분기주가가격 | string | Y | 112 |  |
| `delta_val` | 델타값 | string | Y | 114 |  |
| `theta` | 세타 | string | Y | 84 |  |
| `prls_qryr_rate` | 손익분기비율 | string | Y | 84 |  |
| `stck_lstn_date` | 주식상장일자 | string | Y | 8 |  |
| `hts_ints_vltl` | HTS내재변동성 | string | Y | 114 |  |
| `lvrg_val` | 레버리지값 | string | Y | 114 |  |
| `lp_ntby_qty` | LP순매도량 | string | Y | 18 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:W  FID_COND_SCR_DIV_CODE:20278  FID_UNAS_INPUT_ISCD:000000  FID_INPUT_ISCD:00000  FID_INPUT_RMNN_DYNU_1:0  FID_DIV_CLS_CODE:0  FID_INPUT_PRICE_1:  FID_INPUT_PRICE_2:  FID_INPUT_VOL_1:  FID_INPUT_VOL_2:  FID_INPUT_DATE_1:  FID_RANK_SORT_CLS_CODE:0  FID_BLNG_CLS_CODE:0  FID_INPUT_ISCD_2:0000  FID_INPUT_DATE_2:
```

**Response Example:**
```
{      "output": [          {              "elw_kor_isnm": "한국JS54KOSPI200콜",              "elw_shrn_iscd": "57JS54",              "elw_prpr": "135",              "prdy_vrss": "-100",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-42.55",              "lstn_stcn": "10000000",              "acml_vol": "44020240",              "n_prdy_vol": "0",              "n_prdy_vol_vrss": "44020240",              "vol_inrt": "0.00",              "vol_tnrt": "440.20",              "nday_vol_tnrt": "440.20",              "acml_tr_pbmn": "7881452400",              "n_prdy_tr_pbmn": "7881452400",              "n_prdy_tr_pbmn_vrss": "0",              "total_askp_rsqn": "1512690",              "total_bidp_rsqn": "337490",              "ntsl_rsqn": "-1175200",              "ntby_rsqn": "-1175200",              "seln_rsqn_rate": "81.76",              "shnu_rsqn_rate": "18.24",              "stck_cnvr_rate": "100.000000",              "hts_rmnn_dynu": "28",              "invl_val": "0.00",              "tmvl_val": "135.00",              "acpr": "385.00",              "lp_mbcr_name": "한국증권",              "unas_isnm": "KOSPI200",              "stck_last_tr_date": "20240509",              "unas_shrn_iscd": "2001",              "prdy_vol": "9013220",              "lp_hldn_rate": "11.21",              "prit": "95.38",              "prls_qryr_stpr_prc": "386.35",              "delta_val": "0.160726",              "theta": "12.4577",              "prls_qryr_rate": "5.2000",              "stck_lstn_date": "20230817",              "hts_ints_vltl": "16.98",              "lvrg_val": "43.722294",              "lp_ntby_qty": "5919560"          },          {              "elw_kor_isnm": "한국JS57KOSPI200풋",              "elw_shrn_iscd": "57JS57",              "elw_prpr": "250",              "prdy_vrss": "15",              "prdy_vrss_sign": "2",              "prdy_ctrt": "6.38",              "lstn_stcn": "10000000",              "acml_vol": "41360790",              "n_prdy_vol": "0",              "n_prdy_vol_vrss": "41360790",              "vol_inrt": "0.00",              "vol_tnrt": "413.61",              "nday_vol_tnrt": "413.61",              "acml_tr_pbmn": "9642006500",              "n_prdy_tr_pbmn": "9642006500",              "n_prdy_tr_pbmn_vrss": "0",              "total_askp_rsqn": "591950",              "total_bidp_rsqn": "320140",              "ntsl_rsqn": "-271810",              "ntby_rsqn": "-271810",              "seln_rsqn_rate": "64.90",              "shnu_rsqn_rate": "35.10",              "stck_cnvr_rate": "100.000000",              "hts_rmnn_dynu": "28",              "invl_val": "0.00",              "tmvl_val": "250.00",              "acpr": "355.00",              "lp_mbcr_name": "한국증권",              "unas_isnm": "KOSPI200",              "stck_last_tr_date": "20240509",              "unas_shrn_iscd": "2001",              "prdy_vol": "3829210",              "lp_hldn_rate": "38.24",              "prit": "96.66",              "prls_qryr_stpr_prc": "352.5
```

---
### 58. ELW 지표순위

| Field | Value |
|---|---|
| Sheet | `ELW 지표순위` |
| Menu | [국내주식] ELW 시세 |
| Method | `GET` |
| URL | `/uapi/elw/v1/ranking/indicator` |
| TR_ID (실전) | `FHPEW02790000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건시장분류코드 | string | Y | 2 | 시장구분코드 (W) |
| `FID_COND_SCR_DIV_CODE` | 조건화면분류코드 | string | Y | 5 | Unique key(20279) |
| `FID_UNAS_INPUT_ISCD` | 기초자산입력종목코드 | string | Y | 12 | '000000(전체), 2001(코스피200)  , 3003(코스닥150), 005930(삼성전자) ' |
| `FID_INPUT_ISCD` | 발행사 | string | Y | 12 | '00000(전체), 00003(한국투자증권)  , 00017(KB증권), 00005(미래에셋주식회사)' |
| `FID_DIV_CLS_CODE` | 콜풋구분코드 | string | Y | 2 | 0(전체), 1(콜), 2(풋) |
| `FID_INPUT_PRICE_1` | 가격(이상) | string | Y | 12 |  |
| `FID_INPUT_PRICE_2` | 가격(이하) | string | Y | 12 |  |
| `FID_INPUT_VOL_1` | 거래량(이상) | string | Y | 18 |  |
| `FID_INPUT_VOL_2` | 거래량(이하) | string | Y | 18 |  |
| `FID_RANK_SORT_CLS_CODE` | 순위정렬구분코드 | string | Y | 2 | 0(전환비율), 1(레버리지), 2(행사가 ), 3(내재가치), 4(시간가치) |
| `FID_BLNG_CLS_CODE` | 결재방법 | string | Y | 2 | 0(전체), 1(일반), 2(조기종료) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `elw_shrn_iscd` | ELW단축종목코드 | string | Y | 9 |  |
| `elw_kor_isnm` | ELW한글종목명 | string | Y | 40 |  |
| `elw_prpr` | ELW현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일대비부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일대비율 | string | Y | 82 |  |
| `acml_vol` | 누적거래량 | string | Y | 18 |  |
| `stck_cnvr_rate` | 주식전환비율 | string | Y | 136 |  |
| `lvrg_val` | 레버리지값 | string | Y | 114 |  |
| `acpr` | 행사가 | string | Y | 112 |  |
| `tmvl_val` | 시간가치값 | string | Y | 132 |  |
| `invl_val` | 내재가치값 | string | Y | 132 |  |
| `elw_ko_barrier` | 조기종료발생기준가격 | string | Y | 112 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:W  FID_COND_SCR_DIV_CODE:20279  FID_UNAS_INPUT_ISCD:000000  FID_INPUT_ISCD:00000  FID_DIV_CLS_CODE:0  FID_INPUT_PRICE_1:  FID_INPUT_PRICE_2:  FID_INPUT_VOL_1:  FID_INPUT_VOL_2:  FID_RANK_SORT_CLS_CODE:0  FID_BLNG_CLS_CODE:0
```

**Response Example:**
```
{      "output": [          {              "elw_shrn_iscd": "52JW82",              "elw_kor_isnm": "미래JW82KOSPI200콜",              "elw_prpr": "360",              "prdy_vrss": "-170",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-32.08",              "acml_vol": "726070",              "stck_cnvr_rate": "100.000000",              "lvrg_val": "35.047882",              "acpr": "375.00",              "tmvl_val": "360.00",              "invl_val": "0.00",              "elw_ko_barrier": "0.00"          },          {              "elw_shrn_iscd": "52JW83",              "elw_kor_isnm": "미래JW83KOSPI200콜",              "elw_prpr": "450",              "prdy_vrss": "180",              "prdy_vrss_sign": "2",              "prdy_ctrt": "66.67",              "acml_vol": "194290",              "stck_cnvr_rate": "100.000000",              "lvrg_val": "32.774658",              "acpr": "372.50",              "tmvl_val": "450.00",              "invl_val": "0.00",              "elw_ko_barrier": "0.00"          },          {              "elw_shrn_iscd": "52JW84",              "elw_kor_isnm": "미래JW84KOSPI200콜",              "elw_prpr": "565",              "prdy_vrss": "215",              "prdy_vrss_sign": "2",              "prdy_ctrt": "61.43",              "acml_vol": "41160",              "stck_cnvr_rate": "100.000000",              "lvrg_val": "30.090385",              "acpr": "370.00",              "tmvl_val": "565.00",              "invl_val": "0.00",              "elw_ko_barrier": "0.00"          },          {              "elw_shrn_iscd": "52JW85",              "elw_kor_isnm": "미래JW85KOSPI200콜",              "elw_prpr": "640",              "prdy_vrss": "0",              "prdy_vrss_sign": "3",              "prdy_ctrt": "0.00",              "acml_vol": "0",              "stck_cnvr_rate": "100.000000",              "lvrg_val": "30.062588",              "acpr": "367.50",              "tmvl_val": "640.00",              "invl_val": "0.00",              "elw_ko_barrier": "0.00"          },          {              "elw_shrn_iscd": "52JW86",              "elw_kor_isnm": "미래JW86KOSPI200콜",              "elw_prpr": "450",              "prdy_vrss": "0",              "prdy_vrss_sign": "3",              "prdy_ctrt": "0.00",              "acml_vol": "0",              "stck_cnvr_rate": "100.000000",              "lvrg_val": "55.580410",              "acpr": "365.00",              "tmvl_val": "228.00",              "invl_val": "222.00",              "elw_ko_barrier": "0.00"          },...      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 59. ELW 투자지표추이(체결)

| Field | Value |
|---|---|
| Sheet | `ELW 투자지표추이(체결)` |
| Menu | [국내주식] ELW 시세 |
| Method | `GET` |
| URL | `/uapi/elw/v1/quotations/indicator-trend-ccnl` |
| TR_ID (실전) | `FHPEW02740100` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건시장분류코드 | string | Y | 2 | 시장구분코드 (W) |
| `FID_INPUT_ISCD` | 입력종목코드 | string | Y | 12 | ex) 58J297(KBJ297삼성전자콜) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stck_cntg_hour` | 주식체결시간 | string | Y | 6 |  |
| `elw_prpr` | ELW현재가 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일대비부호 | string | Y | 1 |  |
| `prdy_vrss` | 전일대비 | string | Y | 10 |  |
| `prdy_ctrt` | 전일대비율 | string | Y | 82 |  |
| `acml_vol` | 누적거래량 | string | Y | 18 |  |
| `lvrg_val` | 레버리지값 | string | Y | 114 |  |
| `gear` | 기어링 | string | Y | 84 |  |
| `tmvl_val` | 시간가치값 | string | Y | 132 |  |
| `invl_val` | 내재가치값 | string | Y | 132 |  |
| `prit` | 패리티 | string | Y | 112 |  |
| `apprch_rate` | 접근도 | string | Y | 112 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:W  FID_INPUT_ISCD:57K281
```

**Response Example:**
```
{      "output": [          {              "stck_cntg_hour": "125151",              "elw_prpr": "40",              "prdy_vrss_sign": "5",              "prdy_vrss": "-5",              "prdy_ctrt": "-11.11",              "acml_vol": "827720",              "lvrg_val": "-10.8818",              "gear": "19.5700",              "tmvl_val": "23.00",              "invl_val": "17.00",              "prit": "102.1700",              "apprch_rate": "0.00"          },          {              "stck_cntg_hour": "113228",              "elw_prpr": "40",              "prdy_vrss_sign": "5",              "prdy_vrss": "-5",              "prdy_ctrt": "-11.11",              "acml_vol": "772020",              "lvrg_val": "-10.7220",              "gear": "19.5700",              "tmvl_val": "23.00",              "invl_val": "17.00",              "prit": "102.1700",              "apprch_rate": "0.00"          },          {              "stck_cntg_hour": "112254",              "elw_prpr": "40",              "prdy_vrss_sign": "5",              "prdy_vrss": "-5",              "prdy_ctrt": "-11.11",              "acml_vol": "762920",              "lvrg_val": "-10.7587",              "gear": "19.6000",              "tmvl_val": "23.00",              "invl_val": "17.00",              "prit": "102.0400",              "apprch_rate": "0.00"          },          {              "stck_cntg_hour": "112254",              "elw_prpr": "40",              "prdy_vrss_sign": "5",              "prdy_vrss": "-5",              "prdy_ctrt": "-11.11",              "acml_vol": "753820",              "lvrg_val": "-10.7587",              "gear": "19.6000",              "tmvl_val": "23.00",              "invl_val": "17.00",              "prit": "102.0400",              "apprch_rate": "0.00"          },          {              "stck_cntg_hour": "112028",              "elw_prpr": "40",              "prdy_vrss_sign": "5",              "prdy_vrss": "-5",              "prdy_ctrt": "-11.11",              "acml_vol": "707220",              "lvrg_val": "-10.6040",              "gear": "19.5700",              "tmvl_val": "23.00",              "invl_val": "17.00",              "prit": "102.1700",              "apprch_rate": "0.00"          },          {              "stck_cntg_hour": "112028",              "elw_prpr": "40",              "prdy_vrss_sign": "5",              "prdy_vrss": "-5",              "prdy_ctrt": "-11.11",              "acml_vol": "692220",              "lvrg_val": "-10.6040",              "gear": "19.5700",              "tmvl_val": "23.00",              "invl_val": "17.00",              "prit": "102.1700",              "apprch_rate": "0.00"          },          {              "stck_cntg_hour": "111947",              "elw_prpr": "40",              "prdy_vrss_sign": "5",              "prdy_vrss": "-5",              "prdy_ctrt": "-11.11",              "acml_vol": "651530",              "lvrg_val": "-10.6040",              "gear": "19.5700",              "tmvl_val": "23.00",              "invl_val
```

---
### 60. ELW 상승률순위

| Field | Value |
|---|---|
| Sheet | `ELW 상승률순위` |
| Menu | [국내주식] ELW 시세 |
| Method | `GET` |
| URL | `/uapi/elw/v1/ranking/updown-rate` |
| TR_ID (실전) | `FHPEW02770000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 사용자권한정보 | string | Y | 2 | 시장구분코드 (W) |
| `FID_COND_SCR_DIV_CODE` | 거래소코드 | string | Y | 5 | Unique key(20277) |
| `FID_UNAS_INPUT_ISCD` | 상승율/하락율 구분 | string | Y | 12 | '000000(전체), 2001(코스피200)  , 3003(코스닥150), 005930(삼성전자) ' |
| `FID_INPUT_ISCD` | N일자값 | string | Y | 12 | '00000(전체), 00003(한국투자증권)  , 00017(KB증권), 00005(미래에셋주식회사)' |
| `FID_INPUT_RMNN_DYNU_1` | 거래량조건 | string | Y | 5 | '0(전체), 1(1개월이하), 2(1개월~2개월),   3(2개월~3개월), 4(3개월~6개월),  5(6개월~9개월),6(9개월~12개월), 7(12개월이상)' |
| `FID_DIV_CLS_CODE` | NEXT KEY BUFF | string | Y | 2 | 0(전체), 1(콜), 2(풋) |
| `FID_INPUT_PRICE_1` | 사용자권한정보 | string | Y | 12 |  |
| `FID_INPUT_PRICE_2` | 거래소코드 | string | Y | 12 |  |
| `FID_INPUT_VOL_1` | 상승율/하락율 구분 | string | Y | 18 |  |
| `FID_INPUT_VOL_2` | N일자값 | string | Y | 18 |  |
| `FID_INPUT_DATE_1` | 거래량조건 | string | Y | 10 |  |
| `FID_RANK_SORT_CLS_CODE` | NEXT KEY BUFF | string | Y | 2 | '0(상승율), 1(하락율), 2(시가대비상승율)  , 3(시가대비하락율), 4(변동율)' |
| `FID_BLNG_CLS_CODE` | 사용자권한정보 | string | Y | 2 | 0(전체) |
| `FID_INPUT_DATE_2` | 거래소코드 | string | Y | 10 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `hts_kor_isnm` | HTS한글종목명 | string | Y | 40 |  |
| `elw_shrn_iscd` | ELW단축종목코드 | string | Y | 9 |  |
| `elw_prpr` | ELW현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일대비부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일대비율 | string | Y | 82 |  |
| `acml_vol` | 누적거래량 | string | Y | 18 |  |
| `stck_sdpr` | 주식기준가 | string | Y | 10 |  |
| `sdpr_vrss_prpr_sign` | 기준가대비현재가부호 | string | Y | 1 |  |
| `sdpr_vrss_prpr` | 기준가대비현재가 | string | Y | 10 |  |
| `sdpr_vrss_prpr_rate` | 기준가대비현재가비율 | string | Y | 84 |  |
| `stck_oprc` | 주식시가2 | string | Y | 10 |  |
| `oprc_vrss_prpr_sign` | 시가2대비현재가부호 | string | Y | 1 |  |
| `oprc_vrss_prpr` | 시가2대비현재가 | string | Y | 10 |  |
| `oprc_vrss_prpr_rate` | 시가2대비현재가비율 | string | Y | 84 |  |
| `stck_hgpr` | 주식최고가 | string | Y | 10 |  |
| `stck_lwpr` | 주식최저가 | string | Y | 10 |  |
| `prd_rsfl_sign` | 기간등락부호 | string | Y | 1 |  |
| `prd_rsfl` | 기간등락 | string | Y | 10 |  |
| `prd_rsfl_rate` | 기간등락비율 | string | Y | 84 |  |
| `stck_cnvr_rate` | 주식전환비율 | string | Y | 136 |  |
| `hts_rmnn_dynu` | HTS잔존일수 | string | Y | 5 |  |
| `acpr` | 행사가 | string | Y | 112 |  |
| `unas_isnm` | 기초자산명 | string | Y | 40 |  |
| `unas_shrn_iscd` | 기초자산코드 | string | Y | 12 |  |
| `lp_hldn_rate` | LP보유비율 | string | Y | 84 |  |
| `prit` | 패리티 | string | Y | 112 |  |
| `prls_qryr_stpr_prc` | 손익분기주가가격 | string | Y | 112 |  |
| `delta_val` | 델타값 | string | Y | 114 |  |
| `theta` | 세타 | string | Y | 84 |  |
| `prls_qryr_rate` | 손익분기비율 | string | Y | 84 |  |
| `stck_lstn_date` | 주식상장일자 | string | Y | 8 |  |
| `stck_last_tr_date` | 주식최종거래일자 | string | Y | 8 |  |
| `hts_ints_vltl` | HTS내재변동성 | string | Y | 114 |  |
| `lvrg_val` | 레버리지값 | string | Y | 114 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:W  FID_COND_SCR_DIV_CODE:20277  FID_UNAS_INPUT_ISCD:000000  FID_INPUT_ISCD:00000  FID_INPUT_RMNN_DYNU_1:0  FID_DIV_CLS_CODE:0  FID_INPUT_PRICE_1:  FID_INPUT_PRICE_2:  FID_INPUT_VOL_1:  FID_INPUT_VOL_2:  FID_INPUT_DATE_1:1  FID_RANK_SORT_CLS_CODE:0  FID_BLNG_CLS_CODE:0  FID_INPUT_DATE_2:
```

**Response Example:**
```
{      "output": [          {              "hts_kor_isnm": "한국JAKWLS일렉콜",              "elw_shrn_iscd": "57JAKW",              "elw_prpr": "460",              "prdy_vrss": "350",              "prdy_vrss_sign": "2",              "prdy_ctrt": "318.18",              "acml_vol": "3320",              "stck_sdpr": "110",              "sdpr_vrss_prpr_sign": "2",              "sdpr_vrss_prpr": "460",              "sdpr_vrss_prpr_rate": "0.00",              "stck_oprc": "470",              "oprc_vrss_prpr_sign": "5",              "oprc_vrss_prpr": "-10",              "oprc_vrss_prpr_rate": "-2.13",              "stck_hgpr": "605",              "stck_lwpr": "0",              "prd_rsfl_sign": "2",              "prd_rsfl": "0",              "prd_rsfl_rate": "34.44",              "stck_cnvr_rate": "0.010000",              "hts_rmnn_dynu": "63",              "acpr": "95600.00",              "unas_isnm": "LS ELECTRIC",              "unas_shrn_iscd": "010120",              "lp_hldn_rate": "99.96",              "prit": "146.12",              "prls_qryr_stpr_prc": "141600.00",              "delta_val": "0.930744",              "theta": "0.7829",              "prls_qryr_rate": "1.3600",              "stck_lstn_date": "20231116",              "stck_last_tr_date": "20240613",              "hts_ints_vltl": "71.91",              "lvrg_val": "2.820154"          },          {              "hts_kor_isnm": "KBJF27KOSPI200콜",              "elw_shrn_iscd": "58JF27",              "elw_prpr": "2395",              "prdy_vrss": "1745",              "prdy_vrss_sign": "2",              "prdy_ctrt": "268.46",              "acml_vol": "100",              "stck_sdpr": "650",              "sdpr_vrss_prpr_sign": "2",              "sdpr_vrss_prpr": "2395",              "sdpr_vrss_prpr_rate": "0.00",              "stck_oprc": "2395",              "oprc_vrss_prpr_sign": "3",              "oprc_vrss_prpr": "0",              "oprc_vrss_prpr_rate": "0.00",              "stck_hgpr": "2395",              "stck_lwpr": "0",              "prd_rsfl_sign": "3",              "prd_rsfl": "0",              "prd_rsfl_rate": "0.00",              "stck_cnvr_rate": "100.000000",              "hts_rmnn_dynu": "28",              "acpr": "345.00",              "unas_isnm": "KOSPI200",              "unas_shrn_iscd": "2001",              "lp_hldn_rate": "99.99",              "prit": "106.44",              "prls_qryr_stpr_prc": "368.95",              "delta_val": "0.900891",              "theta": "13.8535",              "prls_qryr_rate": "0.4600",              "stck_lstn_date": "20231228",              "stck_last_tr_date": "20240509",              "hts_ints_vltl": "19.71",              "lvrg_val": "13.810659"          },  		...      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 61. ELW 민감도 추이(일별)

| Field | Value |
|---|---|
| Sheet | `ELW 민감도 추이(일별)` |
| Menu | [국내주식] ELW 시세 |
| Method | `GET` |
| URL | `/uapi/elw/v1/quotations/sensitivity-trend-daily` |
| TR_ID (실전) | `FHPEW02830200` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건시장분류코드 | string | Y | 2 | 시장구분코드 (W) |
| `FID_INPUT_ISCD` | 입력종목코드 | string | Y | 12 | ex)(58J438(KBJ438삼성전자풋) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stck_bsop_date` | 주식영업일자 | string | Y | 8 |  |
| `elw_prpr` | ELW현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일대비부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일대비율 | string | Y | 82 |  |
| `hts_thpr` | HTS이론가 | string | Y | 112 |  |
| `delta_val` | 델타값 | string | Y | 114 |  |
| `gama` | 감마 | string | Y | 84 |  |
| `theta` | 세타 | string | Y | 84 |  |
| `vega` | 베가 | string | Y | 84 |  |
| `rho` | 로우 | string | Y | 84 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:W  FID_INPUT_ISCD:57K281
```

**Response Example:**
```
{      "output": [          {              "stck_bsop_date": "20240507",              "elw_prpr": "25",              "prdy_vrss": "-20",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-44.44",              "hts_thpr": "20.39",              "delta_val": "-0.4034",              "gama": "0.0000",              "theta": "0.5843",              "vega": "0.9954",              "rho": "-0.3529"          },          {              "stck_bsop_date": "20240503",              "elw_prpr": "45",              "prdy_vrss": "0",              "prdy_vrss_sign": "3",              "prdy_ctrt": "0.00",              "hts_thpr": "39.43",              "delta_val": "-0.5792",              "gama": "0.0000",              "theta": "0.5531",              "vega": "0.9786",              "rho": "-0.5143"          },          {              "stck_bsop_date": "20240502",              "elw_prpr": "45",              "prdy_vrss": "0",              "prdy_vrss_sign": "3",              "prdy_ctrt": "0.00",              "hts_thpr": "37.16",              "delta_val": "-0.5529",              "gama": "0.0000",              "theta": "0.5859",              "vega": "1.0136",              "rho": "-0.5143"          },          {              "stck_bsop_date": "20240430",              "elw_prpr": "45",              "prdy_vrss": "-5",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-10.00",              "hts_thpr": "39.30",              "delta_val": "-0.5847",              "gama": "0.0000",              "theta": "0.4979",              "vega": "1.0113",              "rho": "-0.5579"          },          {              "stck_bsop_date": "20240429",              "elw_prpr": "50",              "prdy_vrss": "0",              "prdy_vrss_sign": "3",              "prdy_ctrt": "0.00",              "hts_thpr": "44.66",              "delta_val": "-0.6211",              "gama": "0.0000",              "theta": "0.4599",              "vega": "0.9938",              "rho": "-0.6106"          },          {              "stck_bsop_date": "20240426",              "elw_prpr": "50",              "prdy_vrss": "0",              "prdy_vrss_sign": "3",              "prdy_ctrt": "0.00",              "hts_thpr": "44.96",              "delta_val": "-0.6202",              "gama": "0.0000",              "theta": "0.4439",              "vega": "1.0115",              "rho": "-0.6308"          },          {              "stck_bsop_date": "20240425",              "elw_prpr": "50",              "prdy_vrss": "5",              "prdy_vrss_sign": "2",              "prdy_ctrt": "11.11",              "hts_thpr": "47.92",              "delta_val": "-0.6534",              "gama": "0.0000",              "theta": "0.3673",              "vega": "0.9917",              "rho": "-0.6802"          },          {              "stck_bsop_date": "20240424",              "elw_prpr": "45",              "prdy_vrss": "-10",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-18.18",              "hts_thpr": "33.74"
```

---
### 62. ELW 비교대상종목조회

| Field | Value |
|---|---|
| Sheet | `ELW 비교대상종목조회` |
| Menu | [국내주식] ELW 시세 |
| Method | `GET` |
| URL | `/uapi/elw/v1/quotations/compare-stocks` |
| TR_ID (실전) | `FHKEW151701C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_SCR_DIV_CODE` | 조건화면분류코드 | string | Y | 5 | 11517(Primary key) |
| `FID_INPUT_ISCD` | 입력종목코드 | string | Y | 12 | 종목코드(ex)005930(삼성전자)) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object | Y |  |  |
| `elw_shrn_iscd` | ELW단축종목코드 | string | Y | 9 |  |
| `elw_kor_isnm` | ELW한글종목명 | string | Y | 40 |  |

**Request Example:**
```
FID_COND_SCR_DIV_CODE:11517  FID_INPUT_ISCD:005930
```

**Response Example:**
```
{      "output": [          {              "elw_shrn_iscd": "58J782",              "elw_kor_isnm": "KBJ782삼성전자풋"          },          {              "elw_shrn_iscd": "58J993",              "elw_kor_isnm": "KBJ993삼성전자풋"          },          {              "elw_shrn_iscd": "58JC71",              "elw_kor_isnm": "KBJC71삼성전자콜"          },          {              "elw_shrn_iscd": "58JC72",              "elw_kor_isnm": "KBJC72삼성전자콜"          },          {              "elw_shrn_iscd": "58JC73",              "elw_kor_isnm": "KBJC73삼성전자콜"          },          {              "elw_shrn_iscd": "58JC74",              "elw_kor_isnm": "KBJC74삼성전자콜"          },          {              "elw_shrn_iscd": "58JC75",              "elw_kor_isnm": "KBJC75삼성전자콜"          },          {              "elw_shrn_iscd": "58JC76",              "elw_kor_isnm": "KBJC76삼성전자풋"          },          {              "elw_shrn_iscd": "58JE26",              "elw_kor_isnm": "KBJE26삼성전자콜"          },          {              "elw_shrn_iscd": "58JE27",              "elw_kor_isnm": "KBJE27삼성전자콜"          },          {              "elw_shrn_iscd": "58JE28",              "elw_kor_isnm": "KBJE28삼성전자풋"          },          {              "elw_shrn_iscd": "58JE30",              "elw_kor_isnm": "KBJE30삼성전자풋"          },          {              "elw_shrn_iscd": "58K001",              "elw_kor_isnm": "KBK001삼성전자콜"          },          {              "elw_shrn_iscd": "58K002",              "elw_kor_isnm": "KBK002삼성전자콜"          },          {              "elw_shrn_iscd": "58K003",              "elw_kor_isnm": "KBK003삼성전자콜"          },          {              "elw_shrn_iscd": "58K004",              "elw_kor_isnm": "KBK004삼성전자콜"          },          {              "elw_shrn_iscd": "58K005",              "elw_kor_isnm": "KBK005삼성전자풋"          },          {              "elw_shrn_iscd": "58K006",              "elw_kor_isnm": "KBK006삼성전자풋"          },          {              "elw_shrn_iscd": "58K167",              "elw_kor_isnm": "KBK167삼성전자콜"          },          {              "elw_shrn_iscd": "58K168",              "elw_kor_isnm": "KBK168삼성전자풋"          },          {              "elw_shrn_iscd": "58K169",              "elw_kor_isnm": "KBK169삼성전자풋"          },          {              "elw_shrn_iscd": "58K314",              "elw_kor_isnm": "KBK314삼성전자풋"          },          {              "elw_shrn_iscd": "58K416",              "elw_kor_isnm": "KBK416삼성전자콜"          },          {              "elw_shrn_iscd": "58K417",              "elw_kor_isnm": "KBK417삼성전자콜"          },          {              "elw_shrn_iscd": "58K418",              "elw_kor_isnm": "KBK418삼성전자풋"          },          {              "elw_shrn_iscd": "58K419",              "elw_kor_isnm": "KBK419삼성전자풋"          },          {              "elw_shrn_iscd": "58K420",              "elw_kor_isnm": "KBK420삼성전자풋"          },          {              "elw_shrn_iscd": "58K421",              "elw_kor_isnm": "KBK421삼성전자풋"          },          {   
```

---
### 63. ELW 만기예정_만기종목

| Field | Value |
|---|---|
| Sheet | `ELW 만기예정_만기종목` |
| Menu | [국내주식] ELW 시세 |
| Method | `GET` |
| URL | `/uapi/elw/v1/quotations/expiration-stocks` |
| TR_ID (실전) | `FHKEW154700C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건시장분류코드 | string | Y | 2 | W 입력 |
| `FID_COND_SCR_DIV_CODE` | 조건화면분류코드 | string | Y | 5 | 11547 입력 |
| `FID_INPUT_DATE_1` | 입력날짜1 | string | Y | 10 | 입력날짜 ~ (ex) 20240402) |
| `FID_INPUT_DATE_2` | 입력날짜2 | string | Y | 10 | ~입력날짜 (ex) 20240408) |
| `FID_DIV_CLS_CODE` | 분류구분코드 | string | Y | 2 | 0(콜),1(풋),2(전체) |
| `FID_ETC_CLS_CODE` | 기타구분코드 | string | Y | 2 | 공백 입력 |
| `FID_UNAS_INPUT_ISCD` | 기초자산입력종목코드 | string | Y | 12 | 000000(전체), 2001(KOSPI 200), 기초자산코드(종목코드 ex. 삼성전자-005930) |
| `FID_INPUT_ISCD_2` | 발행회사코드 | string | Y | 8 | 00000(전체), 00003(한국투자증권), 00017(KB증권), 00005(미래에셋증권) |
| `FID_BLNG_CLS_CODE` | 결제방법 | string | Y | 2 | 0(전체),1(일반),2(조기종료) |
| `FID_INPUT_OPTION_1` | 입력옵션1 | string | Y | 10 | 공백 입력 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `elw_shrn_iscd` | ELW단축종목코드 | string | Y | 9 |  |
| `elw_kor_isnm` | ELW한글종목명 | string | Y | 40 |  |
| `unas_isnm` | 기초자산종목명 | string | Y | 40 |  |
| `unas_prpr` | 기초자산현재가 | string | Y | 112 |  |
| `acpr` | 행사가 | string | Y | 112 |  |
| `stck_cnvr_rate` | 주식전환비율 | string | Y | 136 |  |
| `elw_prpr` | ELW현재가 | string | Y | 10 |  |
| `stck_lstn_date` | 주식상장일자 | string | Y | 8 |  |
| `stck_last_tr_date` | 주식최종거래일자 | string | Y | 8 |  |
| `total_rdmp_amt` | 총상환금액 | string | Y | 18 |  |
| `rdmp_amt` | 상환금액 | string | Y | 186 |  |
| `lstn_stcn` | 상장주수 | string | Y | 18 |  |
| `lp_hvol` | LP보유량 | string | Y | 18 |  |
| `ccls_paym_prc` | 확정지급2가격 | string | Y | 223 |  |
| `mtrt_vltn_amt` | 만기평가금액 | string | Y | 192 |  |
| `evnt_prd_fin_date` | 행사2기간종료일자 | string | Y | 8 |  |
| `stlm_date` | 결제일자 | string | Y | 8 |  |
| `pblc_prc` | 발행가격 | string | Y | 18 |  |
| `unas_shrn_iscd` | 기초자산단축종목코드 | string | Y | 9 |  |
| `stnd_iscd` | 표준종목코드 | string | Y | 12 |  |
| `rdmp_ask_amt` | 상환청구금액 | string | Y | 18 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:W  FID_COND_SCR_DIV_CODE:11547  FID_INPUT_DATE_1:20240611  FID_INPUT_DATE_2:20240618  FID_DIV_CLS_CODE:2  FID_ETC_CLS_CODE:  FID_UNAS_INPUT_ISCD:000000  FID_INPUT_ISCD_2:00000  FID_BLNG_CLS_CODE:0  FID_INPUT_OPTION_1:
```

**Response Example:**
```
{      "output": [          {              "elw_shrn_iscd": "58K374",              "elw_kor_isnm": "KBK374KOSPI200풋",              "unas_isnm": "KOSPI200",              "unas_prpr": "367.71",              "acpr": "372.50",              "stck_cnvr_rate": "100.000000",              "elw_prpr": "515",              "stck_lstn_date": "20240320",              "stck_last_tr_date": "20240613",              "total_rdmp_amt": "0",              "rdmp_amt": "0.000000",              "lstn_stcn": "5000000",              "lp_hvol": "4982390",              "ccls_paym_prc": "0.000",              "mtrt_vltn_amt": "367.71",              "evnt_prd_fin_date": "20240617",              "stlm_date": "20240619",              "pblc_prc": "1143",              "unas_shrn_iscd": "2001",              "stnd_iscd": "KRA583261E30",              "rdmp_ask_amt": ""          },          {              "elw_shrn_iscd": "58K373",              "elw_kor_isnm": "KBK373KOSPI200풋",              "unas_isnm": "KOSPI200",              "unas_prpr": "367.71",              "acpr": "370.00",              "stck_cnvr_rate": "100.000000",              "elw_prpr": "370",              "stck_lstn_date": "20240320",              "stck_last_tr_date": "20240613",              "total_rdmp_amt": "0",              "rdmp_amt": "0.000000",              "lstn_stcn": "5000000",              "lp_hvol": "4727930",              "ccls_paym_prc": "0.000",              "mtrt_vltn_amt": "367.71",              "evnt_prd_fin_date": "20240617",              "stlm_date": "20240619",              "pblc_prc": "901",              "unas_shrn_iscd": "2001",              "stnd_iscd": "KRA583260E31",              "rdmp_ask_amt": ""          },...      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 64. ELW LP매매추이

| Field | Value |
|---|---|
| Sheet | `ELW LP매매추이` |
| Menu | [국내주식] ELW 시세 |
| Method | `GET` |
| URL | `/uapi/elw/v1/quotations/lp-trade-trend` |
| TR_ID (실전) | `FHPEW03760000` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건시장분류코드 | string | Y | 2 | 시장구분(W) |
| `FID_INPUT_ISCD` | 입력종목코드 | string | Y | 12 | 입력종목코드(ex 52K577(미래 K577KOSDAQ150콜) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `elw_prpr` | ELW현재가 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일대비부호 | string | Y | 1 |  |
| `prdy_vrss` | 전일대비 | string | Y | 10 |  |
| `prdy_ctrt` | 전일대비율 | string | Y | 82 |  |
| `acml_vol` | 누적거래량 | string | Y | 18 |  |
| `prdy_vol` | 전일거래량 | string | Y | 18 |  |
| `stck_cnvr_rate` | 주식전환비율 | string | Y | 136 |  |
| `prit` | 패리티 | string | Y | 112 |  |
| `lvrg_val` | 레버리지값 | string | Y | 114 |  |
| `gear` | 기어링 | string | Y | 84 |  |
| `prls_qryr_rate` | 손익분기비율 | string | Y | 84 |  |
| `cfp` | 자본지지점 | string | Y | 112 |  |
| `invl_val` | 내재가치값 | string | Y | 132 |  |
| `tmvl_val` | 시간가치값 | string | Y | 132 |  |
| `acpr` | 행사가 | string | Y | 112 |  |
| `elw_ko_barrier` | 조기종료발생기준가격 | string | Y | 112 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `stck_bsop_date` | 주식영업일자 | string | Y | 8 |  |
| `elw_prpr` | ELW현재가 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일대비부호 | string | Y | 1 |  |
| `prdy_vrss` | 전일대비 | string | Y | 10 |  |
| `prdy_ctrt` | 전일대비율 | string | Y | 82 |  |
| `lp_seln_qty` | LP매도수량 | string | Y | 19 |  |
| `lp_seln_avrg_unpr` | LP매도평균단가 | string | Y | 19 |  |
| `lp_shnu_qty` | LP매수수량 | string | Y | 19 |  |
| `lp_shnu_avrg_unpr` | LP매수평균단가 | string | Y | 19 |  |
| `lp_hvol` | LP보유량 | string | Y | 18 |  |
| `lp_hldn_rate` | LP보유비율 | string | Y | 84 |  |
| `prsn_deal_qty` | 개인매매수량 | string | Y | 19 |  |
| `apprch_rate` | 접근도 | string | Y | 112 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:W  FID_INPUT_ISCD:57K281
```

**Response Example:**
```
{      "output1": {          "elw_prpr": "40",          "prdy_vrss_sign": "2",          "prdy_vrss": "5",          "prdy_ctrt": "14.29",          "acml_vol": "320750",          "prdy_vol": "114850",          "stck_cnvr_rate": "0.010000",          "prit": "103.35",          "lvrg_val": "-12.130651",          "gear": "19.3500",          "prls_qryr_rate": "-1.8000",          "cfp": "-1.7100",          "invl_val": "27.00",          "tmvl_val": "13.00",          "acpr": "80000.00",          "elw_ko_barrier": "0.00"      },      "output2": [          {              "stck_bsop_date": "20240516",              "elw_prpr": "35",              "prdy_vrss_sign": "3",              "prdy_vrss": "0",              "prdy_ctrt": "0.00",              "lp_seln_qty": "30030",              "lp_seln_avrg_unpr": "30",              "lp_shnu_qty": "84810",              "lp_shnu_avrg_unpr": "34",              "lp_hvol": "7999900",              "lp_hldn_rate": "99.99",              "prsn_deal_qty": "10",              "apprch_rate": "0.00"          },          {              "stck_bsop_date": "20240514",              "elw_prpr": "35",              "prdy_vrss_sign": "5",              "prdy_vrss": "-5",              "prdy_ctrt": "-12.50",              "lp_seln_qty": "73510",              "lp_seln_avrg_unpr": "35",              "lp_shnu_qty": "74440",              "lp_shnu_avrg_unpr": "35",              "lp_hvol": "7945120",              "lp_hldn_rate": "99.31",              "prsn_deal_qty": "1260",              "apprch_rate": "0.00"          },          {              "stck_bsop_date": "20240513",              "elw_prpr": "40",              "prdy_vrss_sign": "2",              "prdy_vrss": "10",              "prdy_ctrt": "33.33",              "lp_seln_qty": "282010",              "lp_seln_avrg_unpr": "36",              "lp_shnu_qty": "277980",              "lp_shnu_avrg_unpr": "36",              "lp_hvol": "7944190",              "lp_hldn_rate": "99.30",              "prsn_deal_qty": "11140",              "apprch_rate": "0.00"          },          {              "stck_bsop_date": "20240510",              "elw_prpr": "30",              "prdy_vrss_sign": "2",              "prdy_vrss": "5",              "prdy_ctrt": "20.00",              "lp_seln_qty": "137480",              "lp_seln_avrg_unpr": "27",              "lp_shnu_qty": "209950",              "lp_shnu_avrg_unpr": "25",              "lp_hvol": "7948220",              "lp_hldn_rate": "99.35",              "prsn_deal_qty": "2040",              "apprch_rate": "0.00"          },          {              "stck_bsop_date": "20240509",              "elw_prpr": "25",              "prdy_vrss_sign": "3",              "prdy_vrss": "0",              "prdy_ctrt": "0.00",              "lp_seln_qty": "280020",              "lp_seln_avrg_unpr": "25",              "lp_shnu_qty": "209910",              "lp_shnu_avrg_unpr": "25",              "lp_hvol": "7875750",              "lp_hldn_rate": "98.44",              "prsn_deal_qty": "120",      
```

---
### 65. ELW 민감도 추이(체결)

| Field | Value |
|---|---|
| Sheet | `ELW 민감도 추이(체결)` |
| Menu | [국내주식] ELW 시세 |
| Method | `GET` |
| URL | `/uapi/elw/v1/quotations/sensitivity-trend-ccnl` |
| TR_ID (실전) | `FHPEW02830100` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건시장분류코드 | string | Y | 2 | 시장구분코드 (W) |
| `FID_INPUT_ISCD` | 입력종목코드 | string | Y | 12 | ex) 58J297(KBJ297삼성전자콜) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stck_cntg_hour` | 주식체결시간 | string | Y | 6 |  |
| `elw_prpr` | ELW현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일대비부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일대비율 | string | Y | 82 |  |
| `hts_thpr` | hts 이론가 | string | Y | 112 |  |
| `delta_val` | 델타 값 | string | Y | 114 |  |
| `gama` | 감마 | string | Y | 84 |  |
| `theta` | 세타 | string | Y | 84 |  |
| `vega` | 베가 | string | Y | 84 |  |
| `rho` | 로우 | string | Y | 84 |  |

---
### 66. ELW 변동성 추이(틱)

| Field | Value |
|---|---|
| Sheet | `ELW 변동성 추이(틱)` |
| Menu | [국내주식] ELW 시세 |
| Method | `GET` |
| URL | `/uapi/elw/v1/quotations/volatility-trend-tick` |
| TR_ID (실전) | `FHPEW02840400` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건시장분류코드 | string | Y | 2 | W(Unique key) |
| `FID_INPUT_ISCD` | 입력종목코드 | string | Y | 12 | ex) 58J297(KBJ297삼성전자콜) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `bsop_date` | 주식영업일자 | string | Y | 8 |  |
| `stck_cntg_hour` | ELW현재가 | string | Y | 6 |  |
| `elw_prpr` | 전일대비 | string | Y | 10 |  |
| `hts_ints_vltl` | 전일대비부호 | string | Y | 114 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:W  FID_INPUT_ISCD:57K281
```

**Response Example:**
```
{      "output": [          {              "bsop_date": "20240507",              "stck_cntg_hour": "150619",              "elw_prpr": "25",              "hts_ints_vltl": "33.03"          },          {              "bsop_date": "20240507",              "stck_cntg_hour": "150032",              "elw_prpr": "25",              "hts_ints_vltl": "28.44"          },          {              "bsop_date": "20240507",              "stck_cntg_hour": "150031",              "elw_prpr": "25",              "hts_ints_vltl": "28.44"          },          {              "bsop_date": "20240507",              "stck_cntg_hour": "145743",              "elw_prpr": "25",              "hts_ints_vltl": "33.44"          },          {              "bsop_date": "20240507",              "stck_cntg_hour": "145743",              "elw_prpr": "25",              "hts_ints_vltl": "33.44"          },          {              "bsop_date": "20240507",              "stck_cntg_hour": "133437",              "elw_prpr": "25",              "hts_ints_vltl": "32.47"          },          {              "bsop_date": "20240507",              "stck_cntg_hour": "133434",              "elw_prpr": "25",              "hts_ints_vltl": "32.47"          },          {              "bsop_date": "20240507",              "stck_cntg_hour": "132342",              "elw_prpr": "25",              "hts_ints_vltl": "31.60"          },          {              "bsop_date": "20240507",              "stck_cntg_hour": "093016",              "elw_prpr": "30",              "hts_ints_vltl": "28.62"          },          {              "bsop_date": "20240507",              "stck_cntg_hour": "092952",              "elw_prpr": "25",              "hts_ints_vltl": "28.62"          },          {              "bsop_date": "20240507",              "stck_cntg_hour": "091704",              "elw_prpr": "30",              "hts_ints_vltl": "33.03"          },          {              "bsop_date": "20240507",              "stck_cntg_hour": "090900",              "elw_prpr": "30",              "hts_ints_vltl": "33.02"          },          {              "bsop_date": "20240507",              "stck_cntg_hour": "090735",              "elw_prpr": "30",              "hts_ints_vltl": "28.59"          },          {              "bsop_date": "20240507",              "stck_cntg_hour": "090712",              "elw_prpr": "30",              "hts_ints_vltl": "28.59"          },          {              "bsop_date": "20240507",              "stck_cntg_hour": "090710",              "elw_prpr": "30",              "hts_ints_vltl": "28.59"          },          {              "bsop_date": "20240507",              "stck_cntg_hour": "090555",              "elw_prpr": "30",              "hts_ints_vltl": "33.46"          },          {              "bsop_date": "20240507",              "stck_cntg_hour": "090553",              "elw_prpr": "30",              "hts_ints_vltl": "33.46"          },          {              "bsop_date": "20240507",              "stck_cntg_h
```

---
### 67. 국내주식 예상체결지수 추이

| Field | Value |
|---|---|
| Sheet | `국내주식 예상체결지수 추이` |
| Menu | [국내주식] 업종/기타 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/exp-index-trend` |
| TR_ID (실전) | `FHPST01840000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_MKOP_CLS_CODE` | 장운영 구분 코드 | string | Y | 2 | 1: 장시작전, 2: 장마감 |
| `FID_INPUT_HOUR_1` | 입력 시간1 | string | Y | 10 | 10(10초), 30(30초), 60(1분), 600(10분) |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 0000:전체, 0001:코스피, 1001:코스닥, 2001:코스피200, 4001: KRX100 |
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (주식 U) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stck_cntg_hour` | 주식 단축 종목코드 | string | Y | 6 |  |
| `bstp_nmix_prpr` | HTS 한글 종목명 | string | Y | 112 |  |
| `prdy_vrss_sign` | 주식 현재가 | string | Y | 1 |  |
| `bstp_nmix_prdy_vrss` | 전일 대비 | string | Y | 112 |  |
| `prdy_ctrt` | 전일 대비 부호 | string | Y | 82 |  |
| `acml_vol` | 전일 대비율 | string | Y | 18 |  |
| `acml_tr_pbmn` | 기준가 대비 현재가 | string | Y | 18 |  |

**Request Example:**
```
fid_cond_mrkt_div_code:U  fid_input_iscd:0001  fid_input_hour_1:  fid_mkop_cls_code:1
```

**Response Example:**
```
{      "output": [          {              "stck_cntg_hour": "666666",              "bstp_nmix_prpr": "2765.30",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_vrss": "18.67",              "prdy_ctrt": "0.68",              "acml_vol": "5951",              "acml_tr_pbmn": "130953"          },          {              "stck_cntg_hour": "085950",              "bstp_nmix_prpr": "2766.50",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_vrss": "19.87",              "prdy_ctrt": "0.72",              "acml_vol": "5641",              "acml_tr_pbmn": "122873"          },          {              "stck_cntg_hour": "085940",              "bstp_nmix_prpr": "2768.19",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_vrss": "21.56",              "prdy_ctrt": "0.78",              "acml_vol": "5369",              "acml_tr_pbmn": "115013"          },          {              "stck_cntg_hour": "085930",              "bstp_nmix_prpr": "2766.70",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_vrss": "20.07",              "prdy_ctrt": "0.73",              "acml_vol": "5168",              "acml_tr_pbmn": "107488"          },          {              "stck_cntg_hour": "085920",              "bstp_nmix_prpr": "2767.01",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_vrss": "20.38",              "prdy_ctrt": "0.74",              "acml_vol": "5052",              "acml_tr_pbmn": "103832"          },          {              "stck_cntg_hour": "085910",              "bstp_nmix_prpr": "2767.09",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_vrss": "20.46",              "prdy_ctrt": "0.74",              "acml_vol": "4919",              "acml_tr_pbmn": "101950"          },          {              "stck_cntg_hour": "085900",              "bstp_nmix_prpr": "2766.91",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_vrss": "20.28",              "prdy_ctrt": "0.74",              "acml_vol": "4840",              "acml_tr_pbmn": "99526"          },          {              "stck_cntg_hour": "085850",              "bstp_nmix_prpr": "2767.06",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_vrss": "20.43",              "prdy_ctrt": "0.74",              "acml_vol": "4740",              "acml_tr_pbmn": "93391"          },          {              "stck_cntg_hour": "085840",              "bstp_nmix_prpr": "2767.12",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_vrss": "20.49",              "prdy_ctrt": "0.75",              "acml_vol": "4655",              "acml_tr_pbmn": "92533"          },          {              "stck_cntg_hour": "085830",              "bstp_nmix_prpr": "2767.27",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_vrss": "20.64",              "prdy_ctrt": "0.75",              "acml_vol": "4639",              "acml_tr_pbmn": "91639"          },          {              "stck_cntg_hour": "085820",              
```

---
### 68. 국내주식업종기간별시세(일_주_월_년)

| Field | Value |
|---|---|
| Sheet | `국내주식업종기간별시세(일_주_월_년)` |
| Menu | [국내주식] 업종/기타 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/inquire-daily-indexchartprice` |
| TR_ID (실전) | `FHKUP03500100` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | 업종 : U |
| `FID_INPUT_ISCD` | 업종 상세코드 | string | Y | 2 | '0001 : 종합  0002 : 대형주  ...  포탈 (FAQ : 종목정보 다운로드(국내) - 업종코드 참조)' |
| `FID_INPUT_DATE_1` | 조회 시작일자 | string | Y | 10 | 조회 시작일자 (ex. 20220501) |
| `FID_INPUT_DATE_2` | 조회 종료일자 | string | Y | 10 | 조회 종료일자 (ex. 20220530) |
| `FID_PERIOD_DIV_CODE` | '	기간분류코드' | string | Y | 32 | '	D:일봉 W:주봉, M:월봉, Y:년봉' |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  | Single |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `bstp_nmix_prdy_ctrt` | 업종 지수 전일 대비율 | string | Y | 82 |  |
| `prdy_nmix` | 전일 지수 | string | Y | 112 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `bstp_nmix_prpr` | 업종 지수 현재가 | string | Y | 112 |  |
| `bstp_cls_code` | 업종 구분 코드 | string | Y | 4 |  |
| `prdy_vol` | 전일 거래량 | string | Y | 18 |  |
| `bstp_nmix_oprc` | 업종 지수 시가2 | string | Y | 112 |  |
| `bstp_nmix_hgpr` | 업종 지수 최고가 | string | Y | 112 |  |
| `bstp_nmix_lwpr` | 업종 지수 최저가 | string | Y | 112 |  |
| `futs_prdy_oprc` | 선물 전일 시가 | string | Y | 112 |  |
| `futs_prdy_hgpr` | 선물 전일 최고가 | string | Y | 112 |  |
| `futs_prdy_lwpr` | 선물 전일 최저가 | string | Y | 112 |  |
| `output2` | 응답상세 | object array | Y |  | Array |
| `stck_bsop_date` | 주식 영업 일자 | string | Y | 8 |  |
| `bstp_nmix_prpr` | 업종 지수 현재가 | string | Y | 112 |  |
| `bstp_nmix_oprc` | 업종 지수 시가2 | string | Y | 112 |  |
| `bstp_nmix_hgpr` | 업종 지수 최고가 | string | Y | 112 |  |
| `bstp_nmix_lwpr` | 업종 지수 최저가 | string | Y | 112 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |
| `mod_yn` | 변경 여부 | string | Y | 1 |  |

**Request Example:**
```
"input": {              "fid_cond_mrkt_div_code": "U",              "fid_input_date_1": "20220411",              "fid_input_date_2": "20220509",              "fid_input_iscd": "0001",              "fid_period_div_code": "D"          }
```

**Response Example:**
```
"output1": {              "acml_tr_pbmn": "4736153",              "acml_vol": "305715",              "bstp_cls_code": "0001",              "bstp_nmix_hgpr": "2653.87",              "bstp_nmix_lwpr": "2634.29",              "bstp_nmix_oprc": "2651.63",              "bstp_nmix_prdy_ctrt": "0.11",              "bstp_nmix_prdy_vrss": "2.78",              "bstp_nmix_prpr": "2642.07",              "futs_prdy_hgpr": "2641.68",              "futs_prdy_lwpr": "2605.38",              "futs_prdy_oprc": "2605.78",              "hts_kor_isnm": "\uc885\ud569",              "prdy_nmix": "2639.29",              "prdy_vol": "755653",              "prdy_vrss_sign": "2"          },          "output2": [              {                  "acml_tr_pbmn": "9289660",                  "acml_vol": "892653",                  "bstp_nmix_hgpr": "2642.75",                  "bstp_nmix_lwpr": "2606.08",                  "bstp_nmix_oprc": "2634.32",                  "bstp_nmix_prpr": "2610.81",                  "mod_yn": "N",                  "stck_bsop_date": "20220509"              },              {                  "acml_tr_pbmn": "10595418",                  "acml_vol": "1333936",  .....
```

---
### 69. 국내업종 시간별지수(분)

| Field | Value |
|---|---|
| Sheet | `국내업종 시간별지수(분)` |
| Menu | [국내주식] 업종/기타 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/inquire-index-timeprice` |
| TR_ID (실전) | `FHPUP02110200` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_INPUT_HOUR_1` | ?입력 시간1 | string | Y | 10 | 초단위, 60(1분), 300(5분), 600(10분) |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 0001:거래소, 1001:코스닥, 2001:코스피200, 3003:KSQ150 |
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (업종 U) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `bsop_hour` | 영업 시간 | string | Y | 6 |  |
| `bstp_nmix_prpr` | 업종 지수 현재가 | string | Y | 112 |  |
| `bstp_nmix_prdy_vrss` | 업종 지수 전일 대비 | string | Y | 112 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `bstp_nmix_prdy_ctrt` | 업종 지수 전일 대비율 | string | Y | 82 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `cntg_vol` | 체결 거래량 | string | Y | 18 |  |

**Request Example:**
```
fid_cond_mrkt_div_code:U  fid_input_iscd:1001  fid_input_hour_1:120
```

**Response Example:**
```
{      "output": [          {              "bsop_hour": "100600",              "bstp_nmix_prpr": "916.77",              "bstp_nmix_prdy_vrss": "11.27",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "1.24",              "acml_tr_pbmn": "3839797",              "acml_vol": "313374",              "cntg_vol": "870"          },          {              "bsop_hour": "100400",              "bstp_nmix_prpr": "916.65",              "bstp_nmix_prdy_vrss": "11.15",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "1.23",              "acml_tr_pbmn": "3829216",              "acml_vol": "312504",              "cntg_vol": "4352"          },          {              "bsop_hour": "100200",              "bstp_nmix_prpr": "916.69",              "bstp_nmix_prdy_vrss": "11.19",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "1.24",              "acml_tr_pbmn": "3779730",              "acml_vol": "308152",              "cntg_vol": "4959"          },          {              "bsop_hour": "100000",              "bstp_nmix_prpr": "916.76",              "bstp_nmix_prdy_vrss": "11.26",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "1.24",              "acml_tr_pbmn": "3716791",              "acml_vol": "303193",              "cntg_vol": "5103"          },          {              "bsop_hour": "095800",              "bstp_nmix_prpr": "916.60",              "bstp_nmix_prdy_vrss": "11.10",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "1.23",              "acml_tr_pbmn": "3651490",              "acml_vol": "298090",              "cntg_vol": "5732"          },          {              "bsop_hour": "095600",              "bstp_nmix_prpr": "917.37",              "bstp_nmix_prdy_vrss": "11.87",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "1.31",              "acml_tr_pbmn": "3588380",              "acml_vol": "292358",              "cntg_vol": "5331"          },          {              "bsop_hour": "095400",              "bstp_nmix_prpr": "917.64",              "bstp_nmix_prdy_vrss": "12.14",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "1.34",              "acml_tr_pbmn": "3521010",              "acml_vol": "287027",              "cntg_vol": "6827"          },          {              "bsop_hour": "095200",              "bstp_nmix_prpr": "916.31",              "bstp_nmix_prdy_vrss": "10.81",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "1.19",              "acml_tr_pbmn": "3445942",              "acml_vol": "280200",              "cntg_vol": "7263"          },          {              "bsop_hour": "095000",              "bstp_nmix_prpr": "916.94",              "bstp_nmix_prdy_vrss": "11.44",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "1.26",              "acml_tr_pbmn": "3373037",              "acml_vol": "272937",              "cntg_vol": "5040"       
```

---
### 70. 국내업종 구분별전체시세

| Field | Value |
|---|---|
| Sheet | `국내업종 구분별전체시세` |
| Menu | [국내주식] 업종/기타 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/inquire-index-category-price` |
| TR_ID (실전) | `FHPUP02140000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | FID 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (업종 U) |
| `FID_INPUT_ISCD` | FID 입력 종목코드 | string | Y | 12 | 코스피(0001), 코스닥(1001), 코스피200(2001)  ...  포탈 (FAQ : 종목정보 다운로드(국내) - 업종코드 참조) |
| `FID_COND_SCR_DIV_CODE` | FID 조건 화면 분류 코드 | string | Y | 5 | Unique key( 20214 ) |
| `FID_MRKT_CLS_CODE` | FID 시장 구분 코드 | string | Y | 2 | 시장구분코드(K:거래소, Q:코스닥, K2:코스피200) |
| `FID_BLNG_CLS_CODE` | FID 소속 구분 코드 | string | Y | 2 | 시장구분코드에 따라 아래와 같이 입력  시장구분코드(K:거래소) 0:전업종, 1:기타구분, 2:자본금구분 3:상업별구분  시장구분코드(Q:코스닥) 0:전업종, 1:기타구분, 2:벤처구분 3:일반구분  시장구분코드(K2:코스닥) 0:전업종 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세1 | object | Y |  |  |
| `bstp_nmix_prpr` | 업종 지수 현재가 | string | Y | 112 |  |
| `bstp_nmix_prdy_vrss` | 업종 지수 전일 대비 | string | Y | 112 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `bstp_nmix_prdy_ctrt` | 업종 지수 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |
| `bstp_nmix_oprc` | 업종 지수 시가2 | string | Y | 112 |  |
| `bstp_nmix_hgpr` | 업종 지수 최고가 | string | Y | 112 |  |
| `bstp_nmix_lwpr` | 업종 지수 최저가 | string | Y | 112 |  |
| `prdy_vol` | 전일 거래량 | string | Y | 18 |  |
| `ascn_issu_cnt` | 상승 종목 수 | string | Y | 7 |  |
| `down_issu_cnt` | 하락 종목 수 | string | Y | 7 |  |
| `stnr_issu_cnt` | 보합 종목 수 | string | Y | 7 |  |
| `uplm_issu_cnt` | 상한 종목 수 | string | Y | 7 |  |
| `lslm_issu_cnt` | 하한 종목 수 | string | Y | 7 |  |
| `prdy_tr_pbmn` | 전일 거래 대금 | string | Y | 18 |  |
| `dryy_bstp_nmix_hgpr_date` | 연중업종지수최고가일자 | string | Y | 8 |  |
| `dryy_bstp_nmix_hgpr` | 연중업종지수최고가 | string | Y | 112 |  |
| `dryy_bstp_nmix_lwpr` | 연중업종지수최저가 | string | Y | 112 |  |
| `dryy_bstp_nmix_lwpr_date` | 연중업종지수최저가일자 | string | Y | 8 |  |
| `output2` | 응답상세2 | object array | Y |  | array |
| `bstp_cls_code` | 업종 구분 코드 | string | Y | 4 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `bstp_nmix_prpr` | 업종 지수 현재가 | string | Y | 112 |  |
| `bstp_nmix_prdy_vrss` | 업종 지수 전일 대비 | string | Y | 112 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `bstp_nmix_prdy_ctrt` | 업종 지수 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |
| `acml_vol_rlim` | 누적 거래량 비중 | string | Y | 72 |  |
| `acml_tr_pbmn_rlim` | 누적 거래 대금 비중 | string | Y | 72 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"U",  "fid_input_iscd":"0001",  "fid_cond_scr_div_code":"20214",  "fid_mrkt_cls_code":"K2",  "fid_blng_cls_code":"0"  }
```

**Response Example:**
```
{      "output1": {          "bstp_nmix_prpr": "2648.76",          "bstp_nmix_prdy_vrss": "34.96",          "prdy_vrss_sign": "2",          "bstp_nmix_prdy_ctrt": "1.34",          "acml_vol": "584715",          "acml_tr_pbmn": "10001487",          "bstp_nmix_oprc": "2635.63",          "bstp_nmix_hgpr": "2648.76",          "bstp_nmix_lwpr": "2625.01",          "prdy_vol": "621363",          "ascn_issu_cnt": "628",          "down_issu_cnt": "250",          "stnr_issu_cnt": "58",          "uplm_issu_cnt": "0",          "lslm_issu_cnt": "0",          "prdy_tr_pbmn": "10691024",          "dryy_bstp_nmix_hgpr_date": "20240102",          "dryy_bstp_nmix_hgpr": "2675.80",          "dryy_bstp_nmix_lwpr": "2429.12",          "dryy_bstp_nmix_lwpr_date": "20240118"      },      "output2": [          {              "bstp_cls_code": "2001",              "hts_kor_isnm": "KOSPI200",              "bstp_nmix_prpr": "355.52",              "bstp_nmix_prdy_vrss": "4.31",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "1.23",              "acml_vol": "118963",              "acml_tr_pbmn": "7078909",              "acml_vol_rlim": "100.00",              "acml_tr_pbmn_rlim": ""          },          {              "bstp_cls_code": "2007",              "hts_kor_isnm": "KOSPI100",              "bstp_nmix_prpr": "2691.34",              "bstp_nmix_prdy_vrss": "33.27",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "1.25",              "acml_vol": "76784",              "acml_tr_pbmn": "6124444",              "acml_vol_rlim": "64.54",              "acml_tr_pbmn_rlim": ""          },          {              "bstp_cls_code": "2008",              "hts_kor_isnm": "KOSPI50",              "bstp_nmix_prpr": "2478.39",              "bstp_nmix_prdy_vrss": "28.83",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "1.18",              "acml_vol": "52269",              "acml_tr_pbmn": "5222300",              "acml_vol_rlim": "43.94",              "acml_tr_pbmn_rlim": ""          },          {              "bstp_cls_code": "2039",              "hts_kor_isnm": "K커뮤니케이션서비스",              "bstp_nmix_prpr": "1850.38",              "bstp_nmix_prdy_vrss": "3.14",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "0.17",              "acml_vol": "5893",              "acml_tr_pbmn": "477398",              "acml_vol_rlim": "4.95",              "acml_tr_pbmn_rlim": ""          },          {              "bstp_cls_code": "2009",              "hts_kor_isnm": "K건설",              "bstp_nmix_prpr": "325.34",              "bstp_nmix_prdy_vrss": "8.08",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "2.55",              "acml_vol": "6636",              "acml_tr_pbmn": "225841",              "acml_vol_rlim": "5.58",              "acml_tr_pbmn_rlim": ""          },          {              "bstp_cls_code": "2010",              "hts_kor_isnm": "K중공업",              "bstp_nmix_prpr": "322.92",  
```

---
### 71. 업종 분봉조회

| Field | Value |
|---|---|
| Sheet | `업종 분봉조회` |
| Menu | [국내주식] 업종/기타 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/inquire-time-indexchartprice` |
| TR_ID (실전) | `FHKUP03500200` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | FID 조건 시장 분류 코드 | string | Y | 2 | U |
| `FID_ETC_CLS_CODE` | FID 기타 구분 코드 | string | Y | 12 | 0: 기본 1:장마감,시간외 제외 |
| `FID_INPUT_ISCD` | FID 입력 종목코드 | string | Y | 12 | 0001 : 종합  0002 : 대형주  ...  포탈 (FAQ : 종목정보 다운로드(국내) - 업종코드 참조) |
| `FID_INPUT_HOUR_1` | FID 입력 시간1 | string | Y | 12 | 30, 60 -> 1분, 600-> 10분, 3600 -> 1시간 |
| `FID_PW_DATA_INCU_YN` | FID 과거 데이터 포함 여부 | string | Y | 12 | Y (과거) / N (당일) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `Output1` | 응답상세 | object array | Y |  |  |
| `bstp_nmix_prdy_vrss` | 업종 지수 전일 대비 | string | Y | 112 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `bstp_nmix_prdy_ctrt` | 업종 지수 전일 대비율 | string | Y | 82 |  |
| `prdy_nmix` | 전일 지수 | string | Y | 112 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `bstp_nmix_prpr` | 업종 지수 현재가 | string | Y | 112 |  |
| `bstp_cls_code` | 업종 구분 코드 | string | Y | 4 |  |
| `prdy_vol` | 전일 거래량 | string | Y | 18 |  |
| `bstp_nmix_oprc` | 업종 지수 시가2 | string | Y | 112 |  |
| `bstp_nmix_hgpr` | 업종 지수 최고가 | string | Y | 112 |  |
| `bstp_nmix_lwpr` | 업종 지수 최저가 | string | Y | 112 |  |
| `futs_prdy_oprc` | 선물 전일 시가 | string | Y | 112 |  |
| `futs_prdy_hgpr` | 선물 전일 최고가 | string | Y | 112 |  |
| `futs_prdy_lwpr` | 선물 전일 최저가 | string | Y | 112 |  |
| `Output2` | 응답상세2 | object | Y |  | array |
| `stck_bsop_date` | 주식 영업 일자 | string | Y | 8 |  |
| `stck_cntg_hour` | 주식 체결 시간 | string | Y | 6 |  |
| `bstp_nmix_prpr` | 업종 지수 현재가 | string | Y | 112 |  |
| `bstp_nmix_oprc` | 업종 지수 시가2 | string | Y | 112 |  |
| `bstp_nmix_hgpr` | 업종 지수 최고가 | string | Y | 112 |  |
| `bstp_nmix_lwpr` | 업종 지수 최저가 | string | Y | 112 |  |
| `cntg_vol` | 체결 거래량 | string | Y | 18 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |

**Request Example:**
```
{  "FID_COND_MRKT_DIV_CODE":"U",  "FID_INPUT_ISCD":"1001",  "FID_INPUT_HOUR_1":"120",  "FID_PW_DATA_INCU_YN":"Y",  "FID_ETC_CLS_CODE":"0"  }
```

**Response Example:**
```
{      "output1": {          "bstp_nmix_prdy_vrss": "-3.68",          "prdy_vrss_sign": "5",          "bstp_nmix_prdy_ctrt": "-0.44",          "prdy_nmix": "837.24",          "acml_vol": "554702",          "acml_tr_pbmn": "5740155",          "hts_kor_isnm": "KOSDAQ",          "bstp_nmix_prpr": "833.56",          "bstp_cls_code": "1001",          "prdy_vol": "1238780",          "bstp_nmix_oprc": "841.21",          "bstp_nmix_hgpr": "841.21",          "bstp_nmix_lwpr": "830.09",          "futs_prdy_oprc": "818.76",          "futs_prdy_hgpr": "839.52",          "futs_prdy_lwpr": "817.06"      },      "output2": [          {              "stck_bsop_date": "20240129",              "stck_cntg_hour": "103200",              "bstp_nmix_prpr": "833.56",              "bstp_nmix_oprc": "834.07",              "bstp_nmix_hgpr": "834.07",              "bstp_nmix_lwpr": "833.56",              "cntg_vol": "4618",              "acml_tr_pbmn": "5740155"          },          {              "stck_bsop_date": "20240129",              "stck_cntg_hour": "103000",              "bstp_nmix_prpr": "833.99",              "bstp_nmix_oprc": "834.29",              "bstp_nmix_hgpr": "834.29",              "bstp_nmix_lwpr": "833.89",              "cntg_vol": "4601",              "acml_tr_pbmn": "5689290"          },          {              "stck_bsop_date": "20240129",              "stck_cntg_hour": "102800",              "bstp_nmix_prpr": "834.24",              "bstp_nmix_oprc": "833.47",              "bstp_nmix_hgpr": "834.32",              "bstp_nmix_lwpr": "833.44",              "cntg_vol": "4978",              "acml_tr_pbmn": "5635506"          },          {              "stck_bsop_date": "20240129",              "stck_cntg_hour": "102600",              "bstp_nmix_prpr": "833.46",              "bstp_nmix_oprc": "832.36",              "bstp_nmix_hgpr": "833.46",              "bstp_nmix_lwpr": "832.36",              "cntg_vol": "5033",              "acml_tr_pbmn": "5581000"          },          {              "stck_bsop_date": "20240129",              "stck_cntg_hour": "102400",              "bstp_nmix_prpr": "832.48",              "bstp_nmix_oprc": "832.92",              "bstp_nmix_hgpr": "832.92",              "bstp_nmix_lwpr": "832.47",              "cntg_vol": "5239",              "acml_tr_pbmn": "5518332"          },          {              "stck_bsop_date": "20240129",              "stck_cntg_hour": "102200",              "bstp_nmix_prpr": "832.85",              "bstp_nmix_oprc": "832.77",              "bstp_nmix_hgpr": "832.87",              "bstp_nmix_lwpr": "832.69",              "cntg_vol": "6042",              "acml_tr_pbmn": "5455651"          },          {              "stck_bsop_date": "20240129",              "stck_cntg_hour": "102000",              "bstp_nmix_prpr": "832.74",              "bstp_nmix_oprc": "832.55",              "bstp_nmix_hgpr": "833.25",              "bstp_nmix_lwpr": "832.55",              "cntg_vol": "6301",              "acml_tr_pbmn": "53
```

---
### 72. 국내휴장일조회

| Field | Value |
|---|---|
| Sheet | `국내휴장일조회` |
| Menu | [국내주식] 업종/기타 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/chk-holiday` |
| TR_ID (실전) | `CTCA0903R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `BASS_DT` | 기준일자 | string | Y | 8 | 기준일자(YYYYMMDD) |
| `CTX_AREA_NK` | 연속조회키 | string | Y | 20 | 공백으로 입력 |
| `CTX_AREA_FK` | 연속조회검색조건 | string | Y | 20 | 공백으로 입력 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세1 | object | Y |  |  |
| `bass_dt` | 기준일자 | string | Y | 8 | 기준일자(YYYYMMDD) |
| `wday_dvsn_cd` | 요일구분코드 | string | Y | 2 | 01:일요일, 02:월요일, 03:화요일, 04:수요일, 05:목요일, 06:금요일, 07:토요일 |
| `bzdy_yn` | 영업일여부 | string | Y | 1 | Y/N  금융기관이 업무를 하는 날 |
| `tr_day_yn` | 거래일여부 | string | Y | 1 | Y/N  증권 업무가 가능한 날(입출금, 이체 등의 업무 포함) |
| `opnd_yn` | 개장일여부 | string | Y | 1 | Y/N  주식시장이 개장되는 날  * 주문을 넣고자 할 경우 개장일여부(opnd_yn)를 사용 |
| `sttl_day_yn` | 결제일여부 | string | Y | 1 | Y/N  주식 거래에서 실제로 주식을 인수하고 돈을 지불하는 날 |

**Request Example:**
```
{      "BASS_DT":"20221227",      "CTX_AREA_NK":"",      "CTX_AREA_FK":""  }
```

**Response Example:**
```
{      "ctx_area_nk": "20230119            ",      "ctx_area_fk": "20221227            ",      "output": [          {              "bass_dt": "20221227",              "wday_dvsn_cd": "03",              "bzdy_yn": "Y",              "tr_day_yn": "Y",              "opnd_yn": "Y",              "sttl_day_yn": "Y"          },          {              "bass_dt": "20221228",              "wday_dvsn_cd": "04",              "bzdy_yn": "Y",              "tr_day_yn": "Y",              "opnd_yn": "Y",              "sttl_day_yn": "Y"          },          {              "bass_dt": "20221229",              "wday_dvsn_cd": "05",              "bzdy_yn": "Y",              "tr_day_yn": "Y",              "opnd_yn": "Y",              "sttl_day_yn": "Y"          },          {              "bass_dt": "20221230",              "wday_dvsn_cd": "06",              "bzdy_yn": "Y",              "tr_day_yn": "Y",              "opnd_yn": "N",              "sttl_day_yn": "N"          },          {              "bass_dt": "20221231",              "wday_dvsn_cd": "07",              "bzdy_yn": "N",              "tr_day_yn": "Y",              "opnd_yn": "N",              "sttl_day_yn": "N"          },          {              "bass_dt": "20230101",              "wday_dvsn_cd": "01",              "bzdy_yn": "N",              "tr_day_yn": "Y",              "opnd_yn": "N",              "sttl_day_yn": "N"          },          {              "bass_dt": "20230102",              "wday_dvsn_cd": "02",              "bzdy_yn": "Y",              "tr_day_yn": "Y",              "opnd_yn": "Y",              "sttl_day_yn": "Y"          },          {              "bass_dt": "20230103",              "wday_dvsn_cd": "03",              "bzdy_yn": "Y",              "tr_day_yn": "Y",              "opnd_yn": "Y",              "sttl_day_yn": "Y"          },          {              "bass_dt": "20230104",              "wday_dvsn_cd": "04",              "bzdy_yn": "Y",              "tr_day_yn": "Y",              "opnd_yn": "Y",              "sttl_day_yn": "Y"          },          {              "bass_dt": "20230105",              "wday_dvsn_cd": "05",              "bzdy_yn": "Y",              "tr_day_yn": "Y",              "opnd_yn": "Y",              "sttl_day_yn": "Y"          },          {              "bass_dt": "20230106",              "wday_dvsn_cd": "06",              "bzdy_yn": "Y",              "tr_day_yn": "Y",              "opnd_yn": "Y",              "sttl_day_yn": "Y"          },          {              "bass_dt": "20230107",              "wday_dvsn_cd": "07",              "bzdy_yn": "N",              "tr_day_yn": "Y",              "opnd_yn": "N",              "sttl_day_yn": "N"          },          {              "bass_dt": "20230108",              "wday_dvsn_cd": "01",              "bzdy_yn": "N",              "tr_day_yn": "Y",              "opnd_yn": "N",              "sttl_day_yn": "N"          },          {              "bass_dt": "20230109",              "wday_dvsn_cd": "02",              "bz
```

---
### 73. 국내주식 예상체결 전체지수

| Field | Value |
|---|---|
| Sheet | `국내주식 예상체결 전체지수` |
| Menu | [국내주식] 업종/기타 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/exp-total-index` |
| TR_ID (실전) | `FHKUP11750000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `fid_mrkt_cls_code` | 시장 구분 코드 | string | Y | 2 | 0:전체 K:거래소 Q:코스닥 |
| `fid_cond_mrkt_div_code` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (업종 U) |
| `fid_cond_scr_div_code` | 조건 화면 분류 코드 | string | Y | 5 | Unique key(11175) |
| `fid_input_iscd` | 입력 종목코드 | string | Y | 12 | 0000:전체, 0001:거래소, 1001:코스닥, 2001:코스피200, 4001: KRX100 |
| `fid_mkop_cls_code` | 장운영 구분 코드 | string | Y | 2 | 1:장시작전, 2:장마감 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `bstp_nmix_prpr` | 업종 지수 현재가 | string | Y | 112 |  |
| `bstp_nmix_prdy_vrss` | 업종 지수 전일 대비 | string | Y | 112 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `ascn_issu_cnt` | 상승 종목 수 | string | Y | 7 |  |
| `down_issu_cnt` | 하락 종목 수 | string | Y | 7 |  |
| `stnr_issu_cnt` | 보합 종목 수 | string | Y | 7 |  |
| `bstp_cls_code` | 업종 구분 코드 | string | Y | 4 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `bstp_nmix_prpr` | 업종 지수 현재가 | string | Y | 112 |  |
| `bstp_nmix_prdy_vrss` | 업종 지수 전일 대비 | string | Y | 112 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `bstp_nmix_prdy_ctrt` | 업종 지수 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `nmix_sdpr` | 지수 기준가 | string | Y | 112 |  |
| `ascn_issu_cnt` | 상승 종목 수 | string | Y | 7 |  |
| `stnr_issu_cnt` | 보합 종목 수 | string | Y | 7 |  |
| `down_issu_cnt` | 하락 종목 수 | string | Y | 7 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"U",  "fid_cond_scr_div_code":"11175",  "fid_input_iscd":"1001",  "fid_mkop_cls_code":"1",  "fid_mrkt_cls_code":"K"  }
```

**Response Example:**
```
{      "output1": {          "bstp_nmix_prpr": "883.03",          "bstp_nmix_prdy_vrss": "2.57",          "prdy_vrss_sign": "2",          "prdy_ctrt": "0.29",          "acml_vol": "10611",          "ascn_issu_cnt": "513",          "down_issu_cnt": "571",          "stnr_issu_cnt": "498"      },      "output2": [          {              "bstp_cls_code": "0001",              "hts_kor_isnm": "종합",              "bstp_nmix_prpr": "2676.62",              "bstp_nmix_prdy_vrss": "9.78",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "0.37",              "acml_vol": "5151",              "nmix_sdpr": "2666.84",              "ascn_issu_cnt": "409",              "stnr_issu_cnt": "249",              "down_issu_cnt": "225"          },          {              "bstp_cls_code": "2001",              "hts_kor_isnm": "KOSPI200",              "bstp_nmix_prpr": "360.44",              "bstp_nmix_prdy_vrss": "1.05",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "0.29",              "acml_vol": "1687",              "nmix_sdpr": "359.39",              "ascn_issu_cnt": "148",              "stnr_issu_cnt": "35",              "down_issu_cnt": "17"          },          {              "bstp_cls_code": "2039",              "hts_kor_isnm": "K커뮤니케이션서비스",              "bstp_nmix_prpr": "1766.78",              "bstp_nmix_prdy_vrss": "9.03",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "0.51",              "acml_vol": "42",              "nmix_sdpr": "1757.75",              "ascn_issu_cnt": "7",              "stnr_issu_cnt": "2",              "down_issu_cnt": "1"          },          {              "bstp_cls_code": "2009",              "hts_kor_isnm": "K건설",              "bstp_nmix_prpr": "320.87",              "bstp_nmix_prdy_vrss": "0.09",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "0.03",              "acml_vol": "76",              "nmix_sdpr": "320.78",              "ascn_issu_cnt": "3",              "stnr_issu_cnt": "6",              "down_issu_cnt": "1"          },          {              "bstp_cls_code": "2010",              "hts_kor_isnm": "K중공업",              "bstp_nmix_prpr": "366.27",              "bstp_nmix_prdy_vrss": "5.35",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "1.48",              "acml_vol": "457",              "nmix_sdpr": "360.92",              "ascn_issu_cnt": "12",              "stnr_issu_cnt": "0",              "down_issu_cnt": "1"          },          {              "bstp_cls_code": "2011",              "hts_kor_isnm": "K철강소재",              "bstp_nmix_prpr": "857.19",              "bstp_nmix_prdy_vrss": "6.34",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "0.75",              "acml_vol": "45",              "nmix_sdpr": "850.85",              "ascn_issu_cnt": "7",              "stnr_issu_cnt": "3",              "down_issu_cnt": "1"          },          {              "bstp_cls_code": "2012",       
```

---
### 74. 국내업종 현재지수

| Field | Value |
|---|---|
| Sheet | `국내업종 현재지수` |
| Menu | [국내주식] 업종/기타 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/inquire-index-price` |
| TR_ID (실전) | `FHPUP02100000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | FID 조건 시장 분류 코드 | string | Y | 2 | 업종(U) |
| `FID_INPUT_ISCD` | FID 입력 종목코드 | string | Y | 12 | 코스피(0001), 코스닥(1001), 코스피200(2001)  ...  포탈 (FAQ : 종목정보 다운로드(국내) - 업종코드 참조) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세1 | object | Y |  |  |
| `bstp_nmix_prpr` | 업종 지수 현재가 | string | Y | 112 |  |
| `bstp_nmix_prdy_vrss` | 업종 지수 전일 대비 | string | Y | 112 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `bstp_nmix_prdy_ctrt` | 업종 지수 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `prdy_vol` | 전일 거래량 | string | Y | 18 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |
| `prdy_tr_pbmn` | 전일 거래 대금 | string | Y | 18 |  |
| `bstp_nmix_oprc` | 업종 지수 시가2 | string | Y | 112 |  |
| `prdy_nmix_vrss_nmix_oprc` | 전일 지수 대비 지수 시가2 | string | Y | 112 |  |
| `oprc_vrss_prpr_sign` | 시가2 대비 현재가 부호 | string | Y | 1 |  |
| `bstp_nmix_oprc_prdy_ctrt` | 업종 지수 시가2 전일 대비율 | string | Y | 82 |  |
| `bstp_nmix_hgpr` | 업종 지수 최고가 | string | Y | 112 |  |
| `prdy_nmix_vrss_nmix_hgpr` | 전일 지수 대비 지수 최고가 | string | Y | 112 |  |
| `hgpr_vrss_prpr_sign` | 최고가 대비 현재가 부호 | string | Y | 1 |  |
| `bstp_nmix_hgpr_prdy_ctrt` | 업종 지수 최고가 전일 대비율 | string | Y | 82 |  |
| `bstp_nmix_lwpr` | 업종 지수 최저가 | string | Y | 112 |  |
| `prdy_clpr_vrss_lwpr` | 전일 종가 대비 최저가 | string | Y | 10 |  |
| `lwpr_vrss_prpr_sign` | 최저가 대비 현재가 부호 | string | Y | 1 |  |
| `prdy_clpr_vrss_lwpr_rate` | 전일 종가 대비 최저가 비율 | string | Y | 84 |  |
| `ascn_issu_cnt` | 상승 종목 수 | string | Y | 7 |  |
| `uplm_issu_cnt` | 상한 종목 수 | string | Y | 7 |  |
| `stnr_issu_cnt` | 보합 종목 수 | string | Y | 7 |  |
| `down_issu_cnt` | 하락 종목 수 | string | Y | 7 |  |
| `lslm_issu_cnt` | 하한 종목 수 | string | Y | 7 |  |
| `dryy_bstp_nmix_hgpr` | 연중업종지수최고가 | string | Y | 112 |  |
| `dryy_hgpr_vrss_prpr_rate` | 연중 최고가 대비 현재가 비율 | string | Y | 84 |  |
| `dryy_bstp_nmix_hgpr_date` | 연중업종지수최고가일자 | string | Y | 8 |  |
| `dryy_bstp_nmix_lwpr` | 연중업종지수최저가 | string | Y | 112 |  |
| `dryy_lwpr_vrss_prpr_rate` | 연중 최저가 대비 현재가 비율 | string | Y | 84 |  |
| `dryy_bstp_nmix_lwpr_date` | 연중업종지수최저가일자 | string | Y | 8 |  |
| `total_askp_rsqn` | 총 매도호가 잔량 | string | Y | 12 |  |
| `total_bidp_rsqn` | 총 매수호가 잔량 | string | Y | 12 |  |
| `seln_rsqn_rate` | 매도 잔량 비율 | string | Y | 84 |  |
| `shnu_rsqn_rate` | 매수2 잔량 비율 | string | Y | 84 |  |
| `ntby_rsqn` | 순매수 잔량 | string | Y | 12 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"U"  "fid_input_iscd":"1001"  }
```

**Response Example:**
```
{      "output": {          "bstp_nmix_prpr": "857.60",          "bstp_nmix_prdy_vrss": "-1.61",          "prdy_vrss_sign": "5",          "bstp_nmix_prdy_ctrt": "-0.19",          "acml_vol": "1312496",          "prdy_vol": "1222188",          "acml_tr_pbmn": "11507962",          "prdy_tr_pbmn": "11203385",          "bstp_nmix_oprc": "863.69",          "prdy_nmix_vrss_nmix_oprc": "4.48",          "oprc_vrss_prpr_sign": "2",          "bstp_nmix_oprc_prdy_ctrt": "0.52",          "bstp_nmix_hgpr": "864.24",          "prdy_nmix_vrss_nmix_hgpr": "5.03",          "hgpr_vrss_prpr_sign": "2",          "bstp_nmix_hgpr_prdy_ctrt": "0.59",          "bstp_nmix_lwpr": "854.72",          "prdy_clpr_vrss_lwpr": "-4.49",          "lwpr_vrss_prpr_sign": "5",          "prdy_clpr_vrss_lwpr_rate": "-0.52",          "ascn_issu_cnt": "828",          "uplm_issu_cnt": "5",          "stnr_issu_cnt": "94",          "down_issu_cnt": "716",          "lslm_issu_cnt": "1",          "dryy_bstp_nmix_hgpr": "890.06",          "dryy_hgpr_vrss_prpr_rate": "3.65",          "dryy_bstp_nmix_hgpr_date": "20240109",          "dryy_bstp_nmix_lwpr": "786.28",          "dryy_lwpr_vrss_prpr_rate": "-9.07",          "dryy_bstp_nmix_lwpr_date": "20240201",          "total_askp_rsqn": "24146999",          "total_bidp_rsqn": "40450437",          "seln_rsqn_rate": "37.38",          "shnu_rsqn_rate": "62.62",          "ntby_rsqn": "16303438"      },      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 75. 국내선물 영업일조회

| Field | Value |
|---|---|
| Sheet | `국내선물 영업일조회` |
| Menu | [국내주식] 업종/기타 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/market-time` |
| TR_ID (실전) | `HHMCM000002C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `date1` | 영업일1 | string | Y | 8 |  |
| `date2` | 영업일2 | string | Y | 8 |  |
| `date3` | 영업일3 | string | Y | 8 | 영업일 당일 |
| `date4` | 영업일4 | string | Y | 8 |  |
| `date5` | 영업일5 | string | Y | 8 |  |
| `today` | 오늘일자 | string | Y | 8 |  |
| `time` | 현재시간 | string | Y | 6 |  |
| `s_time` | 장시작시간 | string | Y | 6 |  |
| `e_time` | 장마감시간 | string | Y | 6 |  |

**Request Example:**
```
없음
```

**Response Example:**
```
{      "output1": {          "date1": "20240909",          "date2": "20240910",          "date3": "20240911",          "date4": "20240912",          "date5": "20240913",          "today": "20240911",          "time": "083523",          "s_time": "084500",          "e_time": "154500"      },      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 76. 국내업종 시간별지수(초)

| Field | Value |
|---|---|
| Sheet | `국내업종 시간별지수(초)` |
| Menu | [국내주식] 업종/기타 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/inquire-index-tickprice` |
| TR_ID (실전) | `FHPUP02110100` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 0001:거래소, 1001:코스닥, 2001:코스피200, 3003:KSQ150 |
| `FID_COND_MRKT_DIV_CODE` | 시장 분류 코드 | string | Y | 2 | 시장구분코드 (업종 U) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stck_cntg_hour` | 주식 체결 시간 | string | Y | 6 |  |
| `bstp_nmix_prpr` | 업종 지수 현재가 | string | Y | 112 |  |
| `bstp_nmix_prdy_vrss` | 업종 지수 전일 대비 | string | Y | 112 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `bstp_nmix_prdy_ctrt` | 업종 지수 전일 대비율 | string | Y | 82 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `cntg_vol` | 체결 거래량 | string | Y | 18 |  |

**Request Example:**
```
fid_cond_mrkt_div_code:U  fid_input_iscd:1001
```

**Response Example:**
```
{      "output": [          {              "stck_cntg_hour": "100520",              "bstp_nmix_prpr": "916.59",              "bstp_nmix_prdy_vrss": "11.09",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "1.22",              "acml_tr_pbmn": "3818437",              "acml_vol": "311514",              "cntg_vol": "378"          },          {              "stck_cntg_hour": "100510",              "bstp_nmix_prpr": "916.56",              "bstp_nmix_prdy_vrss": "11.06",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "1.22",              "acml_tr_pbmn": "3814862",              "acml_vol": "311136",              "cntg_vol": "389"          },          {              "stck_cntg_hour": "100500",              "bstp_nmix_prpr": "916.60",              "bstp_nmix_prdy_vrss": "11.10",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "1.23",              "acml_tr_pbmn": "3811191",              "acml_vol": "310747",              "cntg_vol": "460"          },          {              "stck_cntg_hour": "100450",              "bstp_nmix_prpr": "916.71",              "bstp_nmix_prdy_vrss": "11.21",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "1.24",              "acml_tr_pbmn": "3806215",              "acml_vol": "310287",              "cntg_vol": "347"          },          {              "stck_cntg_hour": "100440",              "bstp_nmix_prpr": "916.71",              "bstp_nmix_prdy_vrss": "11.21",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "1.24",              "acml_tr_pbmn": "3802603",              "acml_vol": "309940",              "cntg_vol": "378"          },          {              "stck_cntg_hour": "100430",              "bstp_nmix_prpr": "916.87",              "bstp_nmix_prdy_vrss": "11.37",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "1.26",              "acml_tr_pbmn": "3798885",              "acml_vol": "309562",              "cntg_vol": "390"          },          {              "stck_cntg_hour": "100420",              "bstp_nmix_prpr": "916.87",              "bstp_nmix_prdy_vrss": "11.37",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "1.26",              "acml_tr_pbmn": "3793980",              "acml_vol": "309172",              "cntg_vol": "331"          },          {              "stck_cntg_hour": "100410",              "bstp_nmix_prpr": "916.69",              "bstp_nmix_prdy_vrss": "11.19",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "1.24",              "acml_tr_pbmn": "3789649",              "acml_vol": "308841",              "cntg_vol": "387"          },          {              "stck_cntg_hour": "100400",              "bstp_nmix_prpr": "916.47",              "bstp_nmix_prdy_vrss": "10.97",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "1.21",              "acml_tr_pbmn": "3784355",              "acml_vol": "308454", 
```

---
### 77. 국내업종 일자별지수

| Field | Value |
|---|---|
| Sheet | `국내업종 일자별지수` |
| Menu | [국내주식] 업종/기타 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/inquire-index-daily-price` |
| TR_ID (실전) | `FHPUP02120000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_PERIOD_DIV_CODE` | FID 기간 분류 코드 | string | Y | 32 | 일/주/월 구분코드 ( D:일별 , W:주별, M:월별 ) |
| `FID_COND_MRKT_DIV_CODE` | FID 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (업종 U) |
| `FID_INPUT_ISCD` | FID 입력 종목코드 | string | Y | 12 | 코스피(0001), 코스닥(1001), 코스피200(2001)  ...  포탈 (FAQ : 종목정보 다운로드(국내) - 업종코드 참조) |
| `FID_INPUT_DATE_1` | FID 입력 날짜1 | string | Y | 10 | 입력 날짜(ex. 20240223) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세1 | object | Y |  |  |
| `bstp_nmix_prpr` | 업종 지수 현재가 | string | Y | 112 |  |
| `bstp_nmix_prdy_vrss` | 업종 지수 전일 대비 | string | Y | 112 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `bstp_nmix_prdy_ctrt` | 업종 지수 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |
| `bstp_nmix_oprc` | 업종 지수 시가2 | string | Y | 112 |  |
| `bstp_nmix_hgpr` | 업종 지수 최고가 | string | Y | 112 |  |
| `bstp_nmix_lwpr` | 업종 지수 최저가 | string | Y | 112 |  |
| `prdy_vol` | 전일 거래량 | string | Y | 18 |  |
| `ascn_issu_cnt` | 상승 종목 수 | string | Y | 7 |  |
| `down_issu_cnt` | 하락 종목 수 | string | Y | 7 |  |
| `stnr_issu_cnt` | 보합 종목 수 | string | Y | 7 |  |
| `uplm_issu_cnt` | 상한 종목 수 | string | Y | 7 |  |
| `lslm_issu_cnt` | 하한 종목 수 | string | Y | 7 |  |
| `prdy_tr_pbmn` | 전일 거래 대금 | string | Y | 18 |  |
| `dryy_bstp_nmix_hgpr_date` | 연중업종지수최고가일자 | string | Y | 8 |  |
| `dryy_bstp_nmix_hgpr` | 연중업종지수최고가 | string | Y | 112 |  |
| `dryy_bstp_nmix_lwpr` | 연중업종지수최저가 | string | Y | 112 |  |
| `dryy_bstp_nmix_lwpr_date` | 연중업종지수최저가일자 | string | Y | 8 |  |
| `output2` | 응답상세2 | object array | Y |  | array |
| `stck_bsop_date` | 주식 영업 일자 | string | Y | 8 |  |
| `bstp_nmix_prpr` | 업종 지수 현재가 | string | Y | 112 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `bstp_nmix_prdy_vrss` | 업종 지수 전일 대비 | string | Y | 112 |  |
| `bstp_nmix_prdy_ctrt` | 업종 지수 전일 대비율 | string | Y | 82 |  |
| `bstp_nmix_oprc` | 업종 지수 시가2 | string | Y | 112 |  |
| `bstp_nmix_hgpr` | 업종 지수 최고가 | string | Y | 112 |  |
| `bstp_nmix_lwpr` | 업종 지수 최저가 | string | Y | 112 |  |
| `acml_vol_rlim` | 누적 거래량 비중 | string | Y | 72 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |
| `invt_new_psdg` | 투자 신 심리도 | string | Y | 112 |  |
| `d20_dsrt` | 20일 이격도 | string | Y | 112 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"U"  "fid_input_iscd":"0001"  "fid_input_date_1":"20240125"  "fid_period_div_code":"D"  }
```

**Response Example:**
```
{      "output1": {          "bstp_nmix_prpr": "2648.76",          "bstp_nmix_prdy_vrss": "34.96",          "prdy_vrss_sign": "2",          "bstp_nmix_prdy_ctrt": "1.34",          "acml_vol": "593842",          "acml_tr_pbmn": "10221804",          "bstp_nmix_oprc": "2635.63",          "bstp_nmix_hgpr": "2648.76",          "bstp_nmix_lwpr": "2625.01",          "prdy_vol": "621363",          "ascn_issu_cnt": "628",          "down_issu_cnt": "250",          "stnr_issu_cnt": "58",          "uplm_issu_cnt": "0",          "lslm_issu_cnt": "0",          "prdy_tr_pbmn": "10691024",          "dryy_bstp_nmix_hgpr_date": "20240102",          "dryy_bstp_nmix_hgpr": "2675.80",          "dryy_bstp_nmix_lwpr": "2429.12",          "dryy_bstp_nmix_lwpr_date": "20240118"      },      "output2": [          {              "stck_bsop_date": "20240125",              "bstp_nmix_prpr": "2470.34",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_vrss": "0.65",              "bstp_nmix_prdy_ctrt": "0.03",              "bstp_nmix_oprc": "2467.73",              "bstp_nmix_hgpr": "2474.01",              "bstp_nmix_lwpr": "2452.36",              "acml_vol_rlim": "166.23",              "acml_vol": "357234",              "acml_tr_pbmn": "8124338",              "invt_new_psdg": "-19.94",              "d20_dsrt": "97.44"          },          {              "stck_bsop_date": "20240124",              "bstp_nmix_prpr": "2469.69",              "prdy_vrss_sign": "5",              "bstp_nmix_prdy_vrss": "-8.92",              "bstp_nmix_prdy_ctrt": "-0.36",              "bstp_nmix_oprc": "2476.22",              "bstp_nmix_hgpr": "2476.22",              "bstp_nmix_lwpr": "2454.34",              "acml_vol_rlim": "150.16",              "acml_vol": "395464",              "acml_tr_pbmn": "7446527",              "invt_new_psdg": "-30.49",              "d20_dsrt": "97.17"          },          {              "stck_bsop_date": "20240123",              "bstp_nmix_prpr": "2478.61",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_vrss": "14.26",              "bstp_nmix_prdy_ctrt": "0.58",              "bstp_nmix_oprc": "2478.32",              "bstp_nmix_hgpr": "2482.84",              "bstp_nmix_lwpr": "2464.24",              "acml_vol_rlim": "125.74",              "acml_vol": "472284",              "acml_tr_pbmn": "8029400",              "invt_new_psdg": "-32.13",              "d20_dsrt": "97.27"          },          {              "stck_bsop_date": "20240122",              "bstp_nmix_prpr": "2464.35",              "prdy_vrss_sign": "5",              "bstp_nmix_prdy_vrss": "-8.39",              "bstp_nmix_prdy_ctrt": "-0.34",              "bstp_nmix_oprc": "2489.57",              "bstp_nmix_hgpr": "2490.69",              "bstp_nmix_lwpr": "2464.35",              "acml_vol_rlim": "153.03",              "acml_vol": "388046",              "acml_tr_pbmn": "8419916",              "invt_new_psdg": "-48.90",              "d20_dsrt": "96.48"          },          {           
```

---
### 78. 금리 종합(국내채권_금리)

| Field | Value |
|---|---|
| Sheet | `금리 종합(국내채권_금리)` |
| Menu | [국내주식] 업종/기타 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/comp-interest` |
| TR_ID (실전) | `FHPST07020000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건시장분류코드 | string | Y | 2 | Unique key(I) |
| `FID_COND_SCR_DIV_CODE` | 조건화면분류코드 | string | Y | 5 | Unique key(20702) |
| `FID_DIV_CLS_CODE` | 분류구분코드 | string | Y | 2 | 1: 해외금리지표 |
| `FID_DIV_CLS_CODE1` | 분류구분코드 | string | Y | 2 | 공백 : 전체 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  | array |
| `bcdt_code` | 자료코드 | string | Y | 5 |  |
| `hts_kor_isnm` | HTS한글종목명 | string | Y | 40 |  |
| `bond_mnrt_prpr` | 채권금리현재가 | string | Y | 114 |  |
| `prdy_vrss_sign` | 전일대비부호 | string | Y | 1 |  |
| `bond_mnrt_prdy_vrss` | 채권금리전일대비 | string | Y | 114 |  |
| `prdy_ctrt` | 전일대비율 | string | Y | 82 |  |
| `stck_bsop_date` | 주식영업일자 | string | Y | 8 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `bcdt_code` | 자료코드 | string | Y | 5 |  |
| `hts_kor_isnm` | HTS한글종목명 | string | Y | 40 |  |
| `bond_mnrt_prpr` | 채권금리현재가 | string | Y | 114 |  |
| `prdy_vrss_sign` | 전일대비부호 | string | Y | 1 |  |
| `bond_mnrt_prdy_vrss` | 채권금리전일대비 | string | Y | 114 |  |
| `bstp_nmix_prdy_ctrt` | 업종지수전일대비율 | string | Y | 82 |  |
| `stck_bsop_date` | 주식영업일자 | string | Y | 8 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:I  FID_COND_SCR_DIV_CODE:20702  FID_DIV_CLS_CODE:1  FID_DIV_CLS_CODE1:
```

**Response Example:**
```
{      "output1": [          {              "bcdt_code": "Y0201",              "hts_kor_isnm": "미국 30년T-BOND",              "bond_mnrt_prpr": "4.6500",              "prdy_vrss_sign": "2",              "bond_mnrt_prdy_vrss": "0.0100",              "prdy_ctrt": "0.22",              "stck_bsop_date": "20240411"          },          {              "bcdt_code": "Y0202",              "hts_kor_isnm": "미국 10년T-NOTE 수익률",              "bond_mnrt_prpr": "4.5600",              "prdy_vrss_sign": "2",              "bond_mnrt_prdy_vrss": "0.0100",              "prdy_ctrt": "0.22",              "stck_bsop_date": "20240411"          },          {              "bcdt_code": "Y0203",              "hts_kor_isnm": "미국 1년T-BILL",              "bond_mnrt_prpr": "5.1700",              "prdy_vrss_sign": "5",              "bond_mnrt_prdy_vrss": "-0.0200",              "prdy_ctrt": "-0.39",              "stck_bsop_date": "20240411"          },          {              "bcdt_code": "Y0204",              "hts_kor_isnm": "미국 연방기금금리(콜)",              "bond_mnrt_prpr": "5.3300",              "prdy_vrss_sign": "3",              "bond_mnrt_prdy_vrss": "0.0000",              "prdy_ctrt": "0.00",              "stck_bsop_date": "20240410"          },          {              "bcdt_code": "Y0205",              "hts_kor_isnm": "미국 재할인률",              "bond_mnrt_prpr": "5.5000",              "prdy_vrss_sign": "3",              "bond_mnrt_prdy_vrss": "0.0000",              "prdy_ctrt": "0.00",              "stck_bsop_date": "20240410"          },          {              "bcdt_code": "Y0206",              "hts_kor_isnm": "미국 단기우대금리",              "bond_mnrt_prpr": "8.5000",              "prdy_vrss_sign": "3",              "bond_mnrt_prdy_vrss": "0.0000",              "prdy_ctrt": "0.00",              "stck_bsop_date": "20240410"          },          {              "bcdt_code": "Y0207",              "hts_kor_isnm": "일본 10년 국채수익률",              "bond_mnrt_prpr": "0.8540",              "prdy_vrss_sign": "2",              "bond_mnrt_prdy_vrss": "0.0530",              "prdy_ctrt": "6.62",              "stck_bsop_date": "20240411"          }      ],      "output2": [          {              "bcdt_code": "Y0101",              "hts_kor_isnm": "국고채 3년",              "bond_mnrt_prpr": "3.4080",              "prdy_vrss_sign": "5",              "bond_mnrt_prdy_vrss": "-0.0580",              "bstp_nmix_prdy_ctrt": "-1.67",              "stck_bsop_date": "20240412"          },          {              "bcdt_code": "Y0102",              "hts_kor_isnm": "회사채 무보증 3년AA-",              "bond_mnrt_prpr": "3.9630",              "prdy_vrss_sign": "5",              "bond_mnrt_prdy_vrss": "-0.0530",              "bstp_nmix_prdy_ctrt": "-1.32",              "stck_bsop_date": "20240412"          },          {              "bcdt_code": "Y0103",              "hts_kor_isnm": "회사채 3년 BBB-",              "bond_mnrt_prpr": "10.1690",              "prdy_vrss_sign": "5",              "bond_mnrt_prdy_vrss": "-0.0510",       
```

---
### 79. 변동성완화장치(VI) 현황

| Field | Value |
|---|---|
| Sheet | `변동성완화장치(VI) 현황` |
| Menu | [국내주식] 업종/기타 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/inquire-vi-status` |
| TR_ID (실전) | `FHPST01390000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_DIV_CLS_CODE` | FID 분류 구분 코드 | string | Y | 2 | 0:전체 1:상승 2:하락 |
| `FID_COND_SCR_DIV_CODE` | FID 조건 화면 분류 코드 | string | Y | 5 | 20139 |
| `FID_MRKT_CLS_CODE` | FID 시장 구분 코드 | string | Y | 2 | 0:전체 K:거래소 Q:코스닥 |
| `FID_INPUT_ISCD` | FID 입력 종목코드 | string | Y | 12 |  |
| `FID_RANK_SORT_CLS_CODE` | FID 순위 정렬 구분 코드 | string | Y | 2 | 0:전체1:정적2:동적3:정적&동적 |
| `FID_INPUT_DATE_1` | FID 입력 날짜1 | string | Y | 10 | 영업일 |
| `FID_TRGT_CLS_CODE` | FID 대상 구분 코드 | string | Y | 32 |  |
| `FID_TRGT_EXLS_CLS_CODE` | FID 대상 제외 구분 코드 | string | Y | 32 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object | Y |  |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `mksc_shrn_iscd` | 유가증권 단축 종목코드 | string | Y | 9 |  |
| `vi_cls_code` | VI발동상태 | string | Y | 1 | Y: 발동 / N: 해제 |
| `bsop_date` | 영업 일자 | string | Y | 8 |  |
| `cntg_vi_hour` | VI발동시간 | string | Y | 6 | VI발동시간 |
| `vi_cncl_hour` | VI해제시간 | string | Y | 6 | VI해제시간 |
| `vi_kind_code` | VI종류코드 | string | Y | 1 | 1:정적 2:동적 3:정적&동적 |
| `vi_prc` | VI발동가격 | string | Y | 10 |  |
| `vi_stnd_prc` | 정적VI발동기준가격 | string | Y | 10 |  |
| `vi_dprt` | 정적VI발동괴리율 | string | Y | 82 | % |
| `vi_dmc_stnd_prc` | 동적VI발동기준가격 | string | Y | 10 |  |
| `vi_dmc_dprt` | 동적VI발동괴리율 | string | Y | 82 | % |
| `vi_count` | VI발동횟수 | string | Y | 7 |  |

**Request Example:**
```
{  	"fid_cond_scr_div_code":"20139",  	"fid_mrkt_cls_code":"0",  	"fid_input_iscd":"",  	"fid_rank_sort_cls_code":"0",  	"fid_input_date_1":"20240126",  	"fid_trgt_cls_code":"",  	"fid_trgt_exls_cls_code":"",  	"fid_div_cls_code":"0"  }
```

**Response Example:**
```
{      "output": [          {              "hts_kor_isnm": "KODEX Fn멀티팩터",              "mksc_shrn_iscd": "337120",              "vi_cls_code": "N",              "bsop_date": "20240126",              "cntg_vi_hour": "174012",              "vi_cncl_hour": "174212",              "vi_kind_code": "2",              "vi_prc": "12135",              "vi_stnd_prc": "0",              "vi_dprt": "0.00",              "vi_dmc_stnd_prc": "13275",              "vi_dmc_dprt": "-8.59",              "vi_count": "2"          },          {              "hts_kor_isnm": "루멘스",              "mksc_shrn_iscd": "038060",              "vi_cls_code": "N",              "bsop_date": "20240126",              "cntg_vi_hour": "174008",              "vi_cncl_hour": "174210",              "vi_kind_code": "2",              "vi_prc": "1337",              "vi_stnd_prc": "0",              "vi_dprt": "0.00",              "vi_dmc_stnd_prc": "1241",              "vi_dmc_dprt": "7.74",              "vi_count": "1"          },          {              "hts_kor_isnm": "DL건설",              "mksc_shrn_iscd": "001880",              "vi_cls_code": "N",              "bsop_date": "20240126",              "cntg_vi_hour": "173030",              "vi_cncl_hour": "173234",              "vi_kind_code": "2",              "vi_prc": "14000",              "vi_stnd_prc": "0",              "vi_dprt": "0.00",              "vi_dmc_stnd_prc": "14990",              "vi_dmc_dprt": "-6.60",              "vi_count": "2"          },          {              "hts_kor_isnm": "성창기업지주",              "mksc_shrn_iscd": "000180",              "vi_cls_code": "N",              "bsop_date": "20240126",              "cntg_vi_hour": "173030",              "vi_cncl_hour": "173224",              "vi_kind_code": "2",              "vi_prc": "1860",              "vi_stnd_prc": "0",              "vi_dprt": "0.00",              "vi_dmc_stnd_prc": "1992",              "vi_dmc_dprt": "-6.63",              "vi_count": "2"          },          {              "hts_kor_isnm": "성창기업지주",              "mksc_shrn_iscd": "000180",              "vi_cls_code": "N",              "bsop_date": "20240126",              "cntg_vi_hour": "172030",              "vi_cncl_hour": "172204",              "vi_kind_code": "2",              "vi_prc": "1992",              "vi_stnd_prc": "0",              "vi_dprt": "0.00",              "vi_dmc_stnd_prc": "1857",              "vi_dmc_dprt": "7.27",              "vi_count": "1"          },          {              "hts_kor_isnm": "유아이디",              "mksc_shrn_iscd": "069330",              "vi_cls_code": "N",              "bsop_date": "20240126",              "cntg_vi_hour": "172030",              "vi_cncl_hour": "172234",              "vi_kind_code": "2",              "vi_prc": "1640",              "vi_stnd_prc": "0",              "vi_dprt": "0.00",              "vi_dmc_stnd_prc": "1490",              "vi_dmc_dprt": "10.07",              "vi_count": "1"          },          {              "hts_kor_isnm": "뷰웍스",      
```

---
### 80. 종합 시황_공시(제목)

| Field | Value |
|---|---|
| Sheet | `종합 시황_공시(제목)` |
| Menu | [국내주식] 업종/기타 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/news-title` |
| TR_ID (실전) | `FHKST01011800` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_NEWS_OFER_ENTP_CODE` | 뉴스 제공 업체 코드 | string | Y | 40 | 공백 필수 입력 |
| `FID_COND_MRKT_CLS_CODE` | 조건 시장 구분 코드 | string | Y | 6 | 공백 필수 입력 |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 공백: 전체, 종목코드 : 해당코드가 등록된 뉴스 |
| `FID_TITL_CNTT` | 제목 내용 | string | Y | 132 | 공백 필수 입력 |
| `FID_INPUT_DATE_1` | 입력 날짜 | string | Y | 10 | 공백: 현재기준, 조회일자(ex 00YYYYMMDD) |
| `FID_INPUT_HOUR_1` | 입력 시간 | string | Y | 10 | 공백: 현재기준, 조회시간(ex 0000HHMMSS) |
| `FID_RANK_SORT_CLS_CODE` | 순위 정렬 구분 코드 | string | Y | 2 | 공백 필수 입력 |
| `FID_INPUT_SRNO` | 입력 일련번호 | string | Y | 20 | 공백 필수 입력 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object | Y | 200 |  |
| `cntt_usiq_srno` | 내용 조회용 일련번호 | string | Y | 20 |  |
| `news_ofer_entp_code` | 뉴스 제공 업체 코드 | string | Y | 1 | '2'  /* 한경  news  */  '3'  /* 사용안함 */  '4'  /* 이데일리    */  '5'  /* 머니투데이  */  '6'  /* 연합뉴스    */  '7'  /* 인포스탁    */  '8'  /* 아시아경제  */  '9'  /* 뉴스핌      */  'A'  /* 매일경제    */  'B'  /* 헤럴드경제  */  'C'  /* 파이낸셜    */  'D'  /* 이투데이    */  'F'  /* 장내공시    */  'G'  /* 코스닥공시  */  'H'  /* 프리보드공시*/  'I'  /* 기타공시    */  'N'  /* 코넥스공시  */  'J'  /*  동향       */ /*  'L'   리서치 */  'K'  /* 청약안내 전송             */  'M'  /* 타사 추천종목             */  'O'  /* edaily  fx                */  'U'  /* 서울 경제 */  'V'  /* 조선 경제 */  'X'  /* CEO스코어               */  'Y'  /* 이프렌드 Air 뉴스       */  'Z'  /* 인베스트조선            */  'd'  /* NSP통신              */ |
| `data_dt` | 작성일자 | string | Y | 8 |  |
| `data_tm` | 작성시간 | string | Y | 6 |  |
| `hts_pbnt_titl_cntt` | HTS 공시 제목 내용 | string | Y | 400 |  |
| `news_lrdv_code` | 뉴스 대구분 | string | Y | 8 | 1:0:종합  1:FGHIN:공시  2:F:거래소  3:01:수시공시  3:02:공정공시  3:03:시장조치  3:04:신고사항  3:05:정기공시   3:06:특수공시    3:07:발행공시    3:08:지분공시  3:09:워런트공시  3:10:의결권행사공시  3:11:공정위공시  3:12:선물시장공시  3:A1:시장조치안내  3:A2:상장안내  3:A3:안내사항  3:A4:투자유의사항  3:A5:수익증권  3:A6:투자자참고사항  3:A7:뮤츄얼펀드  2:G:코스닥  3:01:수시공시  3:02:공정공시  3:03:시장조치  3:04:신고사항  3:05:정기공시   3:06:특수공시    3:07:발행공시    3:08:지분공시  3:09:워런트공시  3:10:의결권행사공시  3:11:공정위공시  3:12:선물시장공시  3:A1:시장조치안내  3:A2:상장안내  3:A3:안내사항  3:A4:투자유의사항  3:A5:수익증권  3:A6:투자자참고사항  3:A7:뮤츄얼펀드  2:N:코넥스  3:01:수시공시  3:02:공정공시  3:03:시장조치  3:04:신고사항  3:05:정기공시   3:06:특수공시    3:07:발행공시    3:08:지분공시  3:09:워런트공시  3:10:의결권행사공시  3:11:공정위공시  3:12:선물시장공시  3:A1:시장조치안내  3:A2:상장안내  3:A3:안내사항  3:A4:투자유의사항  3:A5:수익증권  3:A6:투자자참고사항  3:A7:뮤츄얼펀드  2:H:K-OTC  2:I:기타  1:6:연합뉴스  3:01:정치  3:02:경제  3:03:증권/금융  3:04:산업  3:05:사회  3:06:사건사고  3:07:문화  3:08:생활건강  3:09:IT. 과학  3:10:북한  3:11:국제  3:12:스포츠  3:13:기타  1:2:한경  3:01:증권  3:04:경제  3:03:부동산  3:07:IT/과학  3:08:정치  3:09:국제  3:10:사회  3:11:생활/문화  3:00:오피니언  3:12:스포츠  3:20:연예  3:18:보도자료  1:A:매경  3:01:경제  3:02:금융  3:03:산업/기업  3:04:중기/벤쳐/과기  3:05:증권  3:06:부동산  3:07:정치  3:08:사회  3:09:인물/동정  3:10:국제  3:11:문화  3:12:레저/스포츠  3:13:사설/칼럼  3:14:기획/분석  3:15:섹션  3:16:English News  3:17:매경이코노미  3:18:mbn  3:90:기타  1:4:이데일리  3:B1:채권시황  3:B2:신종채권  3:F1:외환시황  3:G1:보도자료  3:H1:정책뉴스  3:H2:금융뉴스  3:H3:금융금리/수익율  3:I1:IPO뉴스  3:J1:뉴욕  3:J2:아시아/유럽  3:J3:월드마켓  3:J4:국제기업/산업  3:J5:경제흐름  3:L1:기업뉴스  3:L2:IT  3:L3:벤처  3:L4:e3비즈월드  3:S1:주식시황  3:S2:거래소  3:S3:코스닥&장외  3:S4:루머  3:S5:증권가  1:5:머니투데이  3:A01:주식  3:A02:선물옵션  3:A05:해외증시  3:A06:외환  3:A07:채권  3:A08:펀드  3:B01:경제  3:B02:산업  3:B03:정보과학  3:B04:국제  3:B05:금융보험  3:B07:부동산  3:B08:성공학  3:B09:재테크  3:B10:바이오  1:9:뉴스핌  3:01:주식  3:02:채권  3:03:외환  3:04:국제  3:05:금융/제테크  3:06:산업  3:07:경제  3:08:광장  3:09:전문가기고  3:90:기타  1:8:아시아경제  3:A0:증권  3:B0:금융  3:C0:부동산  3:D0:산업  3:E0:경제  3:F0:정치,사회  3:G0:사설,칼럼  3:H0:인사,동정,부고  3:I0:루머&팩트  3:J0:국내뉴스  3:K0:아시아시각  3:L0:골프  3:M0:모닝브리핑  3:N0:연예  3:10:국제  3:20:중국  3:30:인도  3:40:일본  3:50:이머징마켓  1:B:헤럴드경제   3:01:뉴스  3:02:기업  3:03:재테크  3:04:스타  3:05:문화  3:90:기타  1:C:파이낸셜  3:01:증권  3:02:금융  3:03:부동산  3:04:산업  3:05:경제  3:06:정보과학  3:07:유통  3:08:국제  3:09:정치  3:10:전국/사회  3:11:문화  3:12:스포츠  3:13:교육  3:14:피플  3:15:사설/컬럼  3:16:기획/연재  3:17:fn재테크  3:18:광고  3:90:기타  1:D:이투데이  3:21:증권  3:51:금융  3:22:정치/정책  3:31:글로벌  3:23:산업  3:24:부동산  3:26:라이프  3:25:칼럼/인물  3:41:연예/스포츠  3:90:기타  1:U:서울경제  3:31:증권  3:32:부동산  3:33:경제/금융  3:34:산업/기업  3:35:IT/과학  3:36:정치  3:37:사회  3:38:국제  3:39:칼럼  3:3A:인사/동정/부음  3:3B:문화/건강/레저  3:3C:골프/스포츠  1:V:조선경제i  3:1:뉴스  3:2:Market  3:4:부동산  3:6:글로벌경제  3:8:위클리비즈  3:B:자동차  3:C:녹색BIZ  1:7:인포스탁  3:01:거래소종목  3:02:코스닥종목  3:03:해외증시  3:04:선물동향  3:00:기타  1:X:CEO스코어  3:01:경제  3:02:산업  3:03:금융  3:04:공기업  3:05:전자  3:06:통신  3:07:게임,인터넷  3:08:자동차  3:09:조선,철강  3:10:식음료  3:11:유통  3:12:건설  3:13:제약  3:14:화학,에너지  3:15:생활산업  3:16:기타  1:S:컨슈머타임스  3:01:종합  3:02:파이낸셜컨슈머  3:03:컨슈머리뷰  3:04:정치,사회  3:05:스포츠,연예  3:06:컨슈머뷰티  3:07:오피니언  3:09:기타  1:Z:인베스트조선  3:01:증권/금융  1:d:NSP통신  3:11:IT/과학  3:12:금융/증권  3:13:부동산  3:14:자동차  3:15:연예/문화  3:16:생활경제  3:17:물류/유통  3:18:인사/동정  3:19:정치/사회  3:20:기업  3:21:의학/건강  3:23:신상품/리뷰  3:24:해명/반론  1:a:IRGO  3:10:IR정보  3:20:IR일정  3:50:IR FOCUS  1:Y:eFriend Air  3:01:종목상담  3:02:VOD  1:J:동향  1:L:한투리서치 |
| `dorg` | 자료원 | string | Y | 20 |  |
| `iscd1` | 종목 코드1 | string | Y | 9 |  |
| `iscd2` | 종목 코드2 | string | Y | 9 |  |
| `iscd3` | 종목 코드3 | string | Y | 9 |  |
| `iscd4` | 종목 코드4 | string | Y | 9 |  |
| `iscd5` | 종목 코드5 | string | Y | 9 |  |

**Request Example:**
```
FID_NEWS_OFER_ENTP_CODE:  FID_COND_MRKT_CLS_CODE:  FID_INPUT_ISCD:  FID_TITL_CNTT:  FID_INPUT_DATE_1:  FID_INPUT_HOUR_1:  FID_RANK_SORT_CLS_CODE:  FID_INPUT_SRNO:
```

**Response Example:**
```
{      "output": [          {              "cntt_usiq_srno": "2024041217173779111",              "news_ofer_entp_code": "9",              "data_dt": "20240412",              "data_tm": "171737",              "hts_pbnt_titl_cntt": "금융투자협회, 인도 기프트 시티 규제당국 IFSCA와 라운드테이블",              "news_lrdv_code": "10",              "dorg": "뉴스핌",              "iscd1": "",              "iscd2": "",              "iscd3": "",              "iscd4": "",              "iscd5": "",              "iscd6": "",              "iscd7": "",              "iscd8": "",              "iscd9": "",              "iscd10": "",              "kor_isnm1": " ",              "kor_isnm2": "",              "kor_isnm3": "",              "kor_isnm4": "",              "kor_isnm5": "",              "kor_isnm6": "",              "kor_isnm7": "",              "kor_isnm8": "",              "kor_isnm9": "",              "kor_isnm10": ""          },          {              "cntt_usiq_srno": "2024041217173438610",              "news_ofer_entp_code": "5",              "data_dt": "20240412",              "data_tm": "171734",              "hts_pbnt_titl_cntt": "미국 매출 90% 껑충…BBQ, 지난해 4730억원 사상최대 매출",              "news_lrdv_code": "B02",              "dorg": "머니투데이",              "iscd1": "",              "iscd2": "",              "iscd3": "",              "iscd4": "",              "iscd5": "",              "iscd6": "",              "iscd7": "",              "iscd8": "",              "iscd9": "",              "iscd10": "",              "kor_isnm1": " ",              "kor_isnm2": "",              "kor_isnm3": "",              "kor_isnm4": "",              "kor_isnm5": "",              "kor_isnm6": "",              "kor_isnm7": "",              "kor_isnm8": "",              "kor_isnm9": "",              "kor_isnm10": ""          },          {              "cntt_usiq_srno": "2024041217172998812",              "news_ofer_entp_code": "9",              "data_dt": "20240412",              "data_tm": "171729",              "hts_pbnt_titl_cntt": "한미-한국여자의사회 제정 '젊은의학자학술상'에 정선재 부교수",              "news_lrdv_code": "10",              "dorg": "뉴스핌",              "iscd1": "",              "iscd2": "",              "iscd3": "",              "iscd4": "",              "iscd5": "",              "iscd6": "",              "iscd7": "",              "iscd8": "",              "iscd9": "",              "iscd10": "",              "kor_isnm1": " ",              "kor_isnm2": "",              "kor_isnm3": "",              "kor_isnm4": "",              "kor_isnm5": "",              "kor_isnm6": "",              "kor_isnm7": "",              "kor_isnm8": "",              "kor_isnm9": "",              "kor_isnm10": ""          },          {              "cntt_usiq_srno": "2024041217165428809",              "news_ofer_entp_code": "6",              "data_dt": "20240412",              "data_tm": "171654",              "hts_pbnt_titl_cntt": "[亞증시-종합] 강달러 속 혼조",              "news_lrdv_code": "03",              "dorg": "연합뉴스",              
```

---
### 81. 상품기본조회

| Field | Value |
|---|---|
| Sheet | `상품기본조회` |
| Menu | [국내주식] 종목정보 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/search-info` |
| TR_ID (실전) | `CTPF1604R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `PDNO` | 상품번호 | string | Y | 12 | '주식(하이닉스) :  000660 (코드 : 300)  선물(101S12) :  KR4101SC0009 (코드 : 301)  미국(AAPL) : AAPL (코드 : 512)' |
| `PRDT_TYPE_CD` | 상품유형코드 | string | Y | 3 | '300 주식  301 선물옵션  302 채권  512  미국 나스닥 / 513  미국 뉴욕 / 529  미국 아멕스   515  일본  501  홍콩 / 543  홍콩CNY / 558  홍콩USD  507  베트남 하노이 / 508  베트남 호치민  551  중국 상해A / 552  중국 심천A' |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세1 | object | Y |  |  |
| `pdno` | 상품번호 | string | Y | 12 |  |
| `prdt_type_cd` | 상품유형코드 | string | Y | 3 |  |
| `prdt_name` | 상품명 | string | Y | 60 |  |
| `prdt_name120` | 상품명120 | string | Y | 120 |  |
| `prdt_abrv_name` | 상품약어명 | string | Y | 60 |  |
| `prdt_eng_name` | 상품영문명 | string | Y | 60 |  |
| `prdt_eng_name120` | 상품영문명120 | string | Y | 120 |  |
| `prdt_eng_abrv_name` | 상품영문약어명 | string | Y | 60 |  |
| `std_pdno` | 표준상품번호 | string | Y | 12 |  |
| `shtn_pdno` | 단축상품번호 | string | Y | 12 |  |
| `prdt_sale_stat_cd` | 상품판매상태코드 | string | Y | 2 |  |
| `prdt_risk_grad_cd` | 상품위험등급코드 | string | Y | 2 |  |
| `prdt_clsf_cd` | 상품분류코드 | string | Y | 6 |  |
| `prdt_clsf_name` | 상품분류명 | string | Y | 60 |  |
| `sale_strt_dt` | 판매시작일자 | string | Y | 8 |  |
| `sale_end_dt` | 판매종료일자 | string | Y | 8 |  |
| `wrap_asst_type_cd` | 랩어카운트자산유형코드 | string | Y | 2 |  |
| `ivst_prdt_type_cd` | 투자상품유형코드 | string | Y | 4 |  |
| `ivst_prdt_type_cd_name` | 투자상품유형코드명 | string | Y | 60 |  |
| `frst_erlm_dt` | 최초등록일자 | string | Y | 8 |  |

**Request Example:**
```
{  	"PDNO":"AAPL",  	"PRDT_TYPE_CD":"512"  }
```

**Response Example:**
```
{      "output": {          "pdno": "AAPL",          "prdt_type_cd": "512",          "prdt_name": "애플",          "prdt_name120": "애플",          "prdt_abrv_name": "애플",          "prdt_eng_name": "APPLE INC",          "prdt_eng_name120": "APPLE INC",          "prdt_eng_abrv_name": "APPLE INC",          "std_pdno": "US0378331005",          "shtn_pdno": "AAPL",          "prdt_sale_stat_cd": "",          "prdt_risk_grad_cd": "",          "prdt_clsf_cd": "101210",          "prdt_clsf_name": "해외주식",          "sale_strt_dt": "",          "sale_end_dt": "",          "wrap_asst_type_cd": "06",          "ivst_prdt_type_cd": "1012",          "ivst_prdt_type_cd_name": "해외주식",          "frst_erlm_dt": ""      },      "rt_cd": "0",      "msg_cd": "KIOK0530",      "msg1": "조회되었습니다                                                                  "  }
```

---
### 82. 예탁원정보(상장정보일정)

| Field | Value |
|---|---|
| Sheet | `예탁원정보(상장정보일정)` |
| Menu | [국내주식] 종목정보 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ksdinfo/list-info` |
| TR_ID (실전) | `HHKDB669107C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `SHT_CD` | 종목코드 | string | Y | 9 | 공백: 전체,  특정종목 조회시 : 종목코드 |
| `T_DT` | 조회일자To | string | Y | 8 | ~ 일자 |
| `F_DT` | 조회일자From | string | Y | 8 | 일자 ~ |
| `CTS` | CTS | string | Y | 17 | 공백 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `list_dt` | 상장/등록일 | string | Y | 10 |  |
| `sht_cd` | 종목코드 | string | Y | 9 |  |
| `isin_name` | 종목명 | string | Y | 40 |  |
| `stk_kind` | 주식종류 | string | Y | 10 |  |
| `issue_type` | 사유 | string | Y | 21 |  |
| `issue_stk_qty` | 상장주식수 | string | Y | 12 |  |
| `tot_issue_stk_qty` | 총발행주식수 | string | Y | 12 |  |
| `issue_price` | 발행가 | string | Y | 9 |  |

**Request Example:**
```
cts:  f_dt:20230301  t_dt:20240326  sht_cd:
```

**Response Example:**
```
{      "output1": [          {              "list_dt": "20240326",              "sht_cd": "034220",              "isin_name": "LG디스플레이",              "stk_kind": "보통",              "issue_type": "유상증자",              "issue_stk_qty": "   142184300",              "tot_issue_stk_qty": "   500000000",              "issue_price": "     9090"          },          {              "list_dt": "20240326",              "sht_cd": "047560",              "isin_name": "이스트소프트",              "stk_kind": "보통",              "issue_type": "STOCKOPTION행사",              "issue_stk_qty": "       13000",              "tot_issue_stk_qty": "    11488232",              "issue_price": "    15000"          },          {              "list_dt": "20240326",              "sht_cd": "054180",              "isin_name": "메디콕스",              "stk_kind": "보통",              "issue_type": "국내CB행사",              "issue_stk_qty": "     2348484",              "tot_issue_stk_qty": "    57151168",              "issue_price": "      792"          },          {              "list_dt": "20240326",              "sht_cd": "067310",              "isin_name": "하나마이크론",              "stk_kind": "보통",              "issue_type": "STOCKOPTION행사",              "issue_stk_qty": "        5500",              "tot_issue_stk_qty": "    52136475",              "issue_price": "     9275"          },          {              "list_dt": "20240326",              "sht_cd": "146060",              "isin_name": "율촌",              "stk_kind": "보통",              "issue_type": "국내CB행사",              "issue_stk_qty": "     2391679",              "tot_issue_stk_qty": "    24015595",              "issue_price": "     1154"          },          {              "list_dt": "20240326",              "sht_cd": "403490",              "isin_name": "우듬지팜",              "stk_kind": "보통",              "issue_type": "STOCKOPTION행사",              "issue_stk_qty": "      288000",              "tot_issue_stk_qty": "    45212464",              "issue_price": "     1000"          },          {              "list_dt": "20240326",              "sht_cd": "455900",              "isin_name": "엔젤로보틱스",              "stk_kind": "보통",              "issue_type": "유상증자",              "issue_stk_qty": "     1648000",              "tot_issue_stk_qty": "    14322012",              "issue_price": "    20000"          },          {              "list_dt": "20240326",              "sht_cd": "455900",              "isin_name": "엔젤로보틱스",              "stk_kind": "보통",              "issue_type": "주식전환",              "issue_stk_qty": "      692224",              "tot_issue_stk_qty": "    14322012",              "issue_price": "     2891"          },          {              "list_dt": "20240326",              "sht_cd": "455900",              "isin_name": "엔젤로보틱스",              "stk_kind": "보통",              "issue_type": "통일교체",              "issue_stk_qty": "     8850720",              "tot_issue_stk_qty": "    14322012",              "issue_price": "      500
```

---
### 83. 예탁원정보(공모주청약일정)

| Field | Value |
|---|---|
| Sheet | `예탁원정보(공모주청약일정)` |
| Menu | [국내주식] 종목정보 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ksdinfo/pub-offer` |
| TR_ID (실전) | `HHKDB669108C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `SHT_CD` | 종목코드 | string | Y | 9 | 공백: 전체,  특정종목 조회시 : 종목코드 |
| `CTS` | CTS | string | Y | 17 | 공백 |
| `F_DT` | 조회일자From | string | Y | 8 | 일자 ~ |
| `T_DT` | 조회일자To | string | Y | 8 | ~ 일자 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `record_date` | 기준일 | string | Y | 8 |  |
| `sht_cd` | 종목코드 | string | Y | 9 |  |
| `isin_name` | 종목명 | string | Y | 40 |  |
| `fix_subscr_pri` | 공모가 | string | Y | 12 |  |
| `face_value` | 액면가 | string | Y | 9 |  |
| `subscr_dt` | 청약기간 | string | Y | 23 |  |
| `pay_dt` | 납입일 | string | Y | 10 |  |
| `refund_dt` | 환불일 | string | Y | 10 |  |
| `list_dt` | 상장/등록일 | string | Y | 10 |  |
| `lead_mgr` | 주간사 | string | Y | 41 |  |
| `pub_bf_cap` | 공모전자본금 | string | Y | 12 |  |
| `pub_af_cap` | 공모후자본금 | string | Y | 12 |  |
| `assign_stk_qty` | 당사배정물량 | string | Y | 12 |  |

**Request Example:**
```
cts:  f_dt:20230301  t_dt:20240326  sht_cd:
```

**Response Example:**
```
{      "output1": [          {              "record_date": "20240325",              "sht_cd": "461030",              "isin_name": "아이엠비디엑스",              "fix_subscr_pri": "       13000",              "face_value": "000000100",              "subscr_dt": "2024/03/25 ~ 2024/03/26",              "pay_dt": "2024/03/28",              "refund_dt": "2024/03/28",              "list_dt": "",              "lead_mgr": "미래에셋증권",              "pub_bf_cap": "     1141762",              "pub_af_cap": "       62500",              "assign_stk_qty": "           0"          },          {              "record_date": "20240318",              "sht_cd": "475240",              "isin_name": "하나32호기업인수목적",              "fix_subscr_pri": "        2000",              "face_value": "000000100",              "subscr_dt": "2024/03/18 ~ 2024/03/19",              "pay_dt": "2024/03/21",              "refund_dt": "2024/03/21",              "list_dt": "2024/03/27",              "lead_mgr": "하나증권",              "pub_bf_cap": "       20000",              "pub_af_cap": "       75000",              "assign_stk_qty": "           0"          },          {              "record_date": "20240314",              "sht_cd": "455900",              "isin_name": "엔젤로보틱스",              "fix_subscr_pri": "       20000",              "face_value": "000000500",              "subscr_dt": "2024/03/14 ~ 2024/03/15",              "pay_dt": "2024/03/19",              "refund_dt": "2024/03/19",              "list_dt": "2024/03/26",              "lead_mgr": "NH투자증권",              "pub_bf_cap": "     6648690",              "pub_af_cap": "      240000",              "assign_stk_qty": "           0"          },          {              "record_date": "20240312",              "sht_cd": "437730",              "isin_name": "삼현",              "fix_subscr_pri": "       30000",              "face_value": "000000500",              "subscr_dt": "2024/03/12 ~ 2024/03/13",              "pay_dt": "2024/03/15",              "refund_dt": "2024/03/15",              "list_dt": "2024/03/21",              "lead_mgr": "한국투자증권",              "pub_bf_cap": "     4267928",              "pub_af_cap": "      250000",              "assign_stk_qty": "      500000"          },          {              "record_date": "20240304",              "sht_cd": "036220",              "isin_name": "오상헬스케어",              "fix_subscr_pri": "       20000",              "face_value": "000000500",              "subscr_dt": "2024/03/04 ~ 2024/03/05",              "pay_dt": "2024/03/07",              "refund_dt": "2024/03/07",              "list_dt": "",              "lead_mgr": "NH투자증권",              "pub_bf_cap": "     6542358",              "pub_af_cap": "      123750",              "assign_stk_qty": "           0"          },          {              "record_date": "20240226",              "sht_cd": "199430",              "isin_name": "케이엔알시스템",              "fix_subscr_pri": "       13500",              "face_value": "000000100",              "subscr_d
```

---
### 84. 국내주식 재무비율

| Field | Value |
|---|---|
| Sheet | `국내주식 재무비율` |
| Menu | [국내주식] 종목정보 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/finance/financial-ratio` |
| TR_ID (실전) | `FHKST66430300` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_DIV_CLS_CODE` | 분류 구분 코드 | string | Y | 2 | 0: 년, 1: 분기 |
| `fid_cond_mrkt_div_code` | 조건 시장 분류 코드 | string | Y | 2 | J |
| `fid_input_iscd` | 입력 종목코드 | string | Y | 12 | 000660 : 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stac_yymm` | 결산 년월 | string | Y | 6 |  |
| `grs` | 매출액 증가율 | string | Y | 124 |  |
| `bsop_prfi_inrt` | 영업 이익 증가율 | string | Y | 124 | 적자지속, 흑자전환, 적자전환인 경우 0으로 표시 |
| `ntin_inrt` | 순이익 증가율 | string | Y | 124 |  |
| `roe_val` | ROE 값 | string | Y | 132 |  |
| `eps` | EPS | string | Y | 112 |  |
| `sps` | 주당매출액 | string | Y | 18 |  |
| `bps` | BPS | string | Y | 112 |  |
| `rsrv_rate` | 유보 비율 | string | Y | 84 |  |
| `lblt_rate` | 부채 비율 | string | Y | 84 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"J",  "fid_input_iscd":"005930",  "fid_div_cls_code":"1"  }
```

**Response Example:**
```
{      "output": [          {              "stac_yymm": "202312",              "grs": "-14.33",              "bsop_prfi_inrt": "-84.86",              "ntin_inrt": "-72.17",              "roe_val": "4.14",              "eps": "2131.00",              "sps": "38120",              "bps": "52002.00",              "rsrv_rate": "39256.91",              "lblt_rate": "25.36"          },          {              "stac_yymm": "202309",              "grs": "-17.52",              "bsop_prfi_inrt": "-90.42",              "ntin_inrt": "-71.26",              "roe_val": "3.22",              "eps": "1244.00",              "sps": "37522",              "bps": "52068.00",              "rsrv_rate": "39306.65",              "lblt_rate": "24.89"          },          {              "stac_yymm": "202306",              "grs": "-20.15",              "bsop_prfi_inrt": "-95.36",              "ntin_inrt": "-85.29",              "roe_val": "1.70",              "eps": "434.00",              "sps": "36437",              "bps": "51385.00",              "rsrv_rate": "38789.91",              "lblt_rate": "24.80"          },          {              "stac_yymm": "202303",              "grs": "-18.05",              "bsop_prfi_inrt": "-95.47",              "ntin_inrt": "-86.10",              "roe_val": "1.61",              "eps": "206.00",              "sps": "37538",              "bps": "51529.00",              "rsrv_rate": "38898.83",              "lblt_rate": "26.21"          },          {              "stac_yymm": "202212",              "grs": "8.09",              "bsop_prfi_inrt": "-15.99",              "ntin_inrt": "39.46",              "roe_val": "17.07",              "eps": "8057.00",              "sps": "44494",              "bps": "50817.00",              "rsrv_rate": "38360.25",              "lblt_rate": "26.41"          },          {              "stac_yymm": "202209",              "grs": "14.15",              "bsop_prfi_inrt": "3.45",              "ntin_inrt": "9.44",              "roe_val": "13.18",              "eps": "4597.00",              "sps": "45494",              "bps": "49387.00",              "rsrv_rate": "37277.71",              "lblt_rate": "36.35"          },          {              "stac_yymm": "202206",              "grs": "20.09",              "bsop_prfi_inrt": "28.56",              "ntin_inrt": "33.66",              "roe_val": "14.36",              "eps": "3251.00",              "sps": "45633",              "bps": "46937.00",              "rsrv_rate": "35423.75",              "lblt_rate": "36.64"          },          {              "stac_yymm": "202203",              "grs": "18.95",              "bsop_prfi_inrt": "50.50",              "ntin_inrt": "58.57",              "roe_val": "14.77",              "eps": "1638.00",              "sps": "45803",              "bps": "45106.00",              "rsrv_rate": "34037.84",              "lblt_rate": "39.34"          },          {              "stac_yymm": "202112",              "grs": "18.07",              "bsop_pr
```

---
### 85. 예탁원정보(자본감소일정)

| Field | Value |
|---|---|
| Sheet | `예탁원정보(자본감소일정)` |
| Menu | [국내주식] 종목정보 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ksdinfo/cap-dcrs` |
| TR_ID (실전) | `HHKDB669106C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CTS` | CTS | string | Y | 17 | 공백 |
| `F_DT` | 조회일자From | string | Y | 8 | 일자 ~ |
| `T_DT` | 조회일자To | string | Y | 8 | ~ 일자 |
| `SHT_CD` | 종목코드 | string | Y | 9 | 공백: 전체,  특정종목 조회시 : 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `record_date` | 기준일 | string | Y | 8 |  |
| `sht_cd` | 종목코드 | string | Y | 9 |  |
| `isin_name` | 종목명 | string | Y | 40 |  |
| `stk_kind` | 주식종류 | string | Y | 10 |  |
| `reduce_cap_type` | 감자구분 | string | Y | 9 |  |
| `reduce_cap_rate` | 감자배정율 | string | Y | 142 |  |
| `comp_way` | 계산방법 | string | Y | 6 |  |
| `td_stop_dt` | 매매거래정지기간 | string | Y | 23 |  |
| `list_dt` | 상장/등록일 | string | Y | 10 |  |

**Request Example:**
```
cts:  f_dt:20230301  t_dt:20240326  sht_cd:
```

**Response Example:**
```
{      "output1": [          {              "record_date": "20240315",              "sht_cd": "067390",              "isin_name": "아스트",              "stk_kind": "보통",              "reduce_cap_type": "무상감자",              "reduce_cap_rate": " 1.00",              "comp_way": "곱하기",              "td_stop_dt": "2024/03/14 ~ 2024/03/31",              "list_dt": "2024/04/01"          },          {              "record_date": "20240226",              "sht_cd": "000040",              "isin_name": "케이알모터스",              "stk_kind": "보통",              "reduce_cap_type": "무상감자",              "reduce_cap_rate": " 0.30",              "comp_way": "곱하기",              "td_stop_dt": "2024/02/23 ~ 2024/03/17",              "list_dt": "2024/03/18"          },          {              "record_date": "20240208",              "sht_cd": "033180",              "isin_name": "케이에이치필룩스",              "stk_kind": "보통",              "reduce_cap_type": "무상감자",              "reduce_cap_rate": " 0.20",              "comp_way": "곱하기",              "td_stop_dt": "2024/02/07 ~ 2024/02/28",              "list_dt": "2024/02/29"          },          {              "record_date": "20240207",              "sht_cd": "219750",              "isin_name": "지티지웰니스",              "stk_kind": "보통",              "reduce_cap_type": "무상감자",              "reduce_cap_rate": " 4.00",              "comp_way": "나누기",              "td_stop_dt": "",              "list_dt": ""          },          {              "record_date": "20240129",              "sht_cd": "057880",              "isin_name": "피에이치씨",              "stk_kind": "보통",              "reduce_cap_type": "무상감자",              "reduce_cap_rate": " 0.05",              "comp_way": "곱하기",              "td_stop_dt": "2024/01/26 ~ 2024/02/20",              "list_dt": "2024/02/21"          },          {              "record_date": "20240115",              "sht_cd": "001140",              "isin_name": "국보",              "stk_kind": "보통",              "reduce_cap_type": "",              "reduce_cap_rate": " 1.00",              "comp_way": "곱하기",              "td_stop_dt": "2024/01/12 ~ 2024/02/01",              "list_dt": "2024/02/02"          },          {              "record_date": "20240108",              "sht_cd": "078130",              "isin_name": "국일제지",              "stk_kind": "보통",              "reduce_cap_type": "무상감자",              "reduce_cap_rate": " 1.00",              "comp_way": "곱하기",              "td_stop_dt": "2024/01/05 ~ 2024/02/21",              "list_dt": "2024/02/22"          },          {              "record_date": "20240102",              "sht_cd": "013090",              "isin_name": "인켈",              "stk_kind": "보통",              "reduce_cap_type": "무상감자",              "reduce_cap_rate": " 0.07",              "comp_way": "곱하기",              "td_stop_dt": "",              "list_dt": ""          },          {              "record_date": "20240102",              "sht_cd": "013095",              "isin_name": "인켈1우",         
```

---
### 86. 예탁원정보(무상증자일정)

| Field | Value |
|---|---|
| Sheet | `예탁원정보(무상증자일정)` |
| Menu | [국내주식] 종목정보 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ksdinfo/bonus-issue` |
| TR_ID (실전) | `HHKDB669101C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CTS` | CTS | string | Y | 17 | 공백 |
| `F_DT` | 조회일자From | string | Y | 8 | 일자 ~ |
| `T_DT` | 조회일자To | string | Y | 8 | ~ 일자 |
| `SHT_CD` | 종목코드 | string | Y | 9 | 공백: 전체,  특정종목 조회시 : 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `record_date` | 기준일 | string | Y | 8 |  |
| `sht_cd` | 종목코드 | string | Y | 9 |  |
| `isin_name` | 종목명 | string | Y | 40 |  |
| `fix_rate` | 확정배정율 | string | Y | 152 |  |
| `odd_rec_price` | 단주기준가 | string | Y | 9 |  |
| `right_dt` | 권리락일 | string | Y | 8 |  |
| `odd_pay_dt` | 단주대금지급일 | string | Y | 23 |  |
| `list_date` | 상장/등록일 | string | Y | 8 |  |
| `tot_issue_stk_qty` | 발행주식 | string | Y | 12 |  |
| `issue_stk_qty` | 발행할주식 | string | Y | 12 |  |
| `stk_kind` | 주식종류 | string | Y | 2 |  |

**Request Example:**
```
cts:  f_dt:20230301  t_dt:20240326  sht_cd:
```

**Response Example:**
```
{      "output1": [          {              "record_date": "20240326",              "sht_cd": "466100",              "isin_name": "클로봇",              "fix_rate": "1000.0",              "odd_rec_price": "000000000",              "right_dt": "20240325",              "odd_pay_dt": "",              "list_date": "",              "tot_issue_stk_qty": "     1885394",              "issue_stk_qty": "    18853940",              "stk_kind": "01"          },          {              "record_date": "20240315",              "sht_cd": "473980",              "isin_name": "노머스",              "fix_rate": "3900.0",              "odd_rec_price": "000000000",              "right_dt": "20240314",              "odd_pay_dt": "",              "list_date": "",              "tot_issue_stk_qty": "      234220",              "issue_stk_qty": "     9134580",              "stk_kind": "01"          },          {              "record_date": "20240314",              "sht_cd": "377220",              "isin_name": "프롬바이오",              "fix_rate": "100.00",              "odd_rec_price": "000000000",              "right_dt": "20240313",              "odd_pay_dt": "",              "list_date": "20240405",              "tot_issue_stk_qty": "    14155000",              "issue_stk_qty": "    14155000",              "stk_kind": "01"          },          {              "record_date": "20240307",              "sht_cd": "357230",              "isin_name": "에이치피오",              "fix_rate": "100.00",              "odd_rec_price": "000000000",              "right_dt": "20240306",              "odd_pay_dt": "",              "list_date": "20240329",              "tot_issue_stk_qty": "    21149725",              "issue_stk_qty": "    20337240",              "stk_kind": "01"          },          {              "record_date": "20240305",              "sht_cd": "005810",              "isin_name": "풍산홀딩스",              "fix_rate": " 50.00",              "odd_rec_price": "000029850",              "right_dt": "20240304",              "odd_pay_dt": "2024/03/29 ~ 2024/03/29",              "list_date": "20240322",              "tot_issue_stk_qty": "     9748528",              "issue_stk_qty": "     4668764",              "stk_kind": "01"          },...      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 87. 국내주식 증권사별 투자의견

| Field | Value |
|---|---|
| Sheet | `국내주식 증권사별 투자의견` |
| Menu | [국내주식] 종목정보 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/invest-opbysec` |
| TR_ID (실전) | `FHKST663400C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건시장분류코드 | string | Y | 2 | J(시장 구분 코드) |
| `FID_COND_SCR_DIV_CODE` | 조건화면분류코드 | string | Y | 5 | 16634(Primary key) |
| `FID_INPUT_ISCD` | 입력종목코드 | string | Y | 12 | 회원사코드 (kis developers 포탈 사이트 포럼-> FAQ -> 종목정보 다운로드(국내) 참조) |
| `FID_DIV_CLS_CODE` | 분류구분코드 | string | Y | 2 | 전체(0) 매수(1) 중립(2) 매도(3) |
| `FID_INPUT_DATE_1` | 입력날짜1 | string | Y | 10 | 이후 ~ |
| `FID_INPUT_DATE_2` | 입력날짜2 | string | Y | 10 | ~ 이전 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stck_bsop_date` | 주식영업일자 | string | Y | 8 |  |
| `stck_shrn_iscd` | 주식단축종목코드 | string | Y | 9 |  |
| `hts_kor_isnm` | HTS한글종목명 | string | Y | 40 |  |
| `invt_opnn` | 투자의견 | string | Y | 40 |  |
| `invt_opnn_cls_code` | 투자의견구분코드 | string | Y | 2 |  |
| `rgbf_invt_opnn` | 직전투자의견 | string | Y | 40 |  |
| `rgbf_invt_opnn_cls_code` | 직전투자의견구분코드 | string | Y | 2 |  |
| `mbcr_name` | 회원사명 | string | Y | 50 |  |
| `stck_prpr` | 주식현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일대비부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일대비율 | string | Y | 82 |  |
| `hts_goal_prc` | HTS목표가격 | string | Y | 10 |  |
| `stck_prdy_clpr` | 주식전일종가 | string | Y | 10 |  |
| `stft_esdg` | 주식선물괴리도 | string | Y | 10 |  |
| `dprt` | 괴리율 | string | Y | 82 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:J  FID_COND_SCR_DIV_CODE:16633  FID_INPUT_ISCD:999  FID_DIV_CLS_CODE:0  FID_INPUT_DATE_1:20240428  FID_INPUT_DATE_2:20240528
```

**Response Example:**
```
{      "output": [          {              "stck_bsop_date": "20240527",              "stck_shrn_iscd": "454910",              "hts_kor_isnm": "두산로보틱스",              "invt_opnn": "NotRated",              "invt_opnn_cls_code": "3",              "rgbf_invt_opnn": "NotRated",              "rgbf_invt_opnn_cls_code": "3",              "mbcr_name": "상상인",              "stck_prpr": "74300",              "prdy_vrss": "500",              "prdy_vrss_sign": "2",              "prdy_ctrt": "0.68",              "hts_goal_prc": "0",              "stck_prdy_clpr": "71600",              "stft_esdg": "74300",              "dprt": "0.00"          },          {              "stck_bsop_date": "20240527",              "stck_shrn_iscd": "389140",              "hts_kor_isnm": "포바이포",              "invt_opnn": "NotRated",              "invt_opnn_cls_code": "3",              "rgbf_invt_opnn": "NotRated",              "rgbf_invt_opnn_cls_code": "3",              "mbcr_name": "상상인",              "stck_prpr": "10330",              "prdy_vrss": "0",              "prdy_vrss_sign": "3",              "prdy_ctrt": "0.00",              "hts_goal_prc": "0",              "stck_prdy_clpr": "10120",              "stft_esdg": "10330",              "dprt": "0.00"          },          {              "stck_bsop_date": "20240527",              "stck_shrn_iscd": "336260",              "hts_kor_isnm": "두산퓨얼셀",              "invt_opnn": "BUY",              "invt_opnn_cls_code": "2",              "rgbf_invt_opnn": "BUY",              "rgbf_invt_opnn_cls_code": "3",              "mbcr_name": "상상인",              "stck_prpr": "26150",              "prdy_vrss": "-50",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-0.19",              "hts_goal_prc": "33000",              "stck_prdy_clpr": "25000",              "stft_esdg": "-6850",              "dprt": "-20.76"          },          {              "stck_bsop_date": "20240527",              "stck_shrn_iscd": "298380",              "hts_kor_isnm": "에이비엘바이오",              "invt_opnn": "NotRated",              "invt_opnn_cls_code": "3",              "rgbf_invt_opnn": "NotRated",              "rgbf_invt_opnn_cls_code": "3",              "mbcr_name": "상상인",              "stck_prpr": "23300",              "prdy_vrss": "-100",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-0.43",              "hts_goal_prc": "0",              "stck_prdy_clpr": "24300",              "stft_esdg": "23300",              "dprt": "0.00"          },          {              "stck_bsop_date": "20240527",              "stck_shrn_iscd": "377740",              "hts_kor_isnm": "바이오노트",              "invt_opnn": "BUY",              "invt_opnn_cls_code": "2",              "rgbf_invt_opnn": "BUY",              "rgbf_invt_opnn_cls_code": "3",              "mbcr_name": "다올투자",              "stck_prpr": "4135",              "prdy_vrss": "-10",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-0.24",              "hts_goal_prc": "5700",         
```

---
### 88. 국내주식 당사 신용가능종목

| Field | Value |
|---|---|
| Sheet | `국내주식 당사 신용가능종목` |
| Menu | [국내주식] 종목정보 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/credit-by-company` |
| TR_ID (실전) | `FHPST04770000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `fid_rank_sort_cls_code` | 순위 정렬 구분 코드 | string | Y | 2 | 0:코드순, 1:이름순 |
| `fid_slct_yn` | 선택 여부 | string | Y | 1 | 0:신용주문가능, 1: 신용주문불가 |
| `fid_input_iscd` | 입력 종목코드 | string | Y | 12 | 0000:전체, 0001:거래소, 1001:코스닥, 2001:코스피200, 4001: KRX100 |
| `fid_cond_scr_div_code` | 조건 화면 분류 코드 | string | Y | 5 | Unique key(20477) |
| `fid_cond_mrkt_div_code` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (주식 J) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stck_shrn_iscd` | 주식 단축 종목코드 | string | Y | 9 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `crdt_rate` | 신용 비율 | string | Y | 84 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"J",  "fid_cond_scr_div_code":"20477",  "fid_input_iscd":"0000",  "fid_slct_yn":"0",  "fid_rank_sort_cls_code":"1"  }
```

**Response Example:**
```
{      "output": [          {              "stck_shrn_iscd": "473440",              "hts_kor_isnm": "ACE 11월만기자동연장회사채AA-이상액티브",              "crdt_rate": "50.00"          },          {              "stck_shrn_iscd": "105190",              "hts_kor_isnm": "ACE 200",              "crdt_rate": "40.00"          },          {              "stck_shrn_iscd": "332500",              "hts_kor_isnm": "ACE 200TR",              "crdt_rate": "50.00"          },          {              "stck_shrn_iscd": "448880",              "hts_kor_isnm": "ACE 24-12 회사채(AA-이상)액티브",              "crdt_rate": "40.00"          },          {              "stck_shrn_iscd": "461270",              "hts_kor_isnm": "ACE 26-06 회사채(AA-이상)액티브",              "crdt_rate": "40.00"          },          {              "stck_shrn_iscd": "414270",              "hts_kor_isnm": "ACE G2전기차&자율주행액티브",              "crdt_rate": "40.00"          },          {              "stck_shrn_iscd": "365780",              "hts_kor_isnm": "ACE 국고채10년",              "crdt_rate": "40.00"          },          {              "stck_shrn_iscd": "446770",              "hts_kor_isnm": "ACE 글로벌반도체TOP4 Plus SOLACTIVE",              "crdt_rate": "40.00"          },          {              "stck_shrn_iscd": "190620",              "hts_kor_isnm": "ACE 단기통안채",              "crdt_rate": "40.00"          },          {              "stck_shrn_iscd": "453850",              "hts_kor_isnm": "ACE 미국30년국채액티브(H)",              "crdt_rate": "30.00"          },          {              "stck_shrn_iscd": "360200",              "hts_kor_isnm": "ACE 미국S&P500",              "crdt_rate": "30.00"          },          {              "stck_shrn_iscd": "438080",              "hts_kor_isnm": "ACE 미국S&P500채권혼합액티브",              "crdt_rate": "50.00"          },          {              "stck_shrn_iscd": "309230",              "hts_kor_isnm": "ACE 미국WideMoat가치주",              "crdt_rate": "40.00"          },          {              "stck_shrn_iscd": "367380",              "hts_kor_isnm": "ACE 미국나스닥100",              "crdt_rate": "30.00"          },          {              "stck_shrn_iscd": "456880",              "hts_kor_isnm": "ACE 미국달러SOFR금리(합성)",              "crdt_rate": "40.00"          },          {              "stck_shrn_iscd": "402970",              "hts_kor_isnm": "ACE 미국배당다우존스",              "crdt_rate": "40.00"          },          {              "stck_shrn_iscd": "465580",              "hts_kor_isnm": "ACE 미국빅테크TOP7 Plus",              "crdt_rate": "40.00"          },          {              "stck_shrn_iscd": "245710",              "hts_kor_isnm": "ACE 베트남VN30(합성)",              "crdt_rate": "40.00"          },          {              "stck_shrn_iscd": "448540",              "hts_kor_isnm": "ACE 엔비디아채권혼합블룸버그",              "crdt_rate": "40.00"          },          {              "stck_shrn_iscd": "238720",              "hts_kor_isnm": "ACE 일본Nikkei225(H)",              "crdt_rate": "50.00"          },          {              "stck_shrn_i
```

---
### 89. 예탁원정보(주식매수청구일정)

| Field | Value |
|---|---|
| Sheet | `예탁원정보(주식매수청구일정)` |
| Menu | [국내주식] 종목정보 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ksdinfo/purreq` |
| TR_ID (실전) | `HHKDB669103C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `SHT_CD` | 종목코드 | string | Y | 9 | 공백: 전체,  특정종목 조회시 : 종목코드 |
| `T_DT` | 조회일자To | string | Y | 8 | ~ 일자 |
| `F_DT` | 조회일자From | string | Y | 8 | 일자 ~ |
| `CTS` | CTS | string | Y | 17 | 공백 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `record_date` | 기준일 | string | Y | 8 |  |
| `sht_cd` | 종목코드 | string | Y | 9 |  |
| `isin_name` | 종목명 | string | Y | 40 |  |
| `stk_kind` | 주식종류 | string | Y | 8 |  |
| `opp_opi_rcpt_term` | 반대의사접수시한 | string | Y | 9 |  |
| `buy_req_rcpt_term` | 매수청구접수시한 | string | Y | 12 |  |
| `buy_req_price` | 매수청구가격 | string | Y | 62 |  |
| `buy_amt_pay_dt` | 매수대금지급일 | string | Y | 62 |  |
| `get_meet_dt` | 주총일 | string | Y | 10 |  |

**Request Example:**
```
cts:  f_dt:20230301  t_dt:20240326  sht_cd:
```

**Response Example:**
```
{      "output1": [          {              "record_date": "20240313",              "sht_cd": "065350",              "isin_name": "신성델타테크",              "stk_kind": "보통",              "opp_opi_rcpt_term": "020240326",              "buy_req_rcpt_term": "",              "buy_req_price": "000000000000",              "buy_amt_pay_dt": "",              "get_meet_dt": ""          },          {              "record_date": "20240311",              "sht_cd": "472850",              "isin_name": "폰드그룹",              "stk_kind": "보통",              "opp_opi_rcpt_term": "020240325",              "buy_req_rcpt_term": "",              "buy_req_price": "000000000000",              "buy_amt_pay_dt": "",              "get_meet_dt": ""          },          {              "record_date": "20240306",              "sht_cd": "238930",              "isin_name": "제이비케이랩",              "stk_kind": "보통",              "opp_opi_rcpt_term": "020240319",              "buy_req_rcpt_term": "",              "buy_req_price": "000000000000",              "buy_amt_pay_dt": "",              "get_meet_dt": ""          },          {              "record_date": "20240305",              "sht_cd": "435620",              "isin_name": "하나금융25호기업인수목적",              "stk_kind": "보통",              "opp_opi_rcpt_term": "020240409",              "buy_req_rcpt_term": "020240430",              "buy_req_price": "000000010578",              "buy_amt_pay_dt": "2024/05/16",              "get_meet_dt": "2024/04/12"          },          {              "record_date": "20240305",              "sht_cd": "452450",              "isin_name": "피아이이",              "stk_kind": "보통",              "opp_opi_rcpt_term": "020240409",              "buy_req_rcpt_term": "020240430",              "buy_req_price": "000000006733",              "buy_amt_pay_dt": "2024/05/16",              "get_meet_dt": "2024/04/12"          },          {              "record_date": "20240304",              "sht_cd": "065150",              "isin_name": "대산에프앤비",              "stk_kind": "보통",              "opp_opi_rcpt_term": "020240327",              "buy_req_rcpt_term": "020240417",              "buy_req_price": "000000000260",              "buy_amt_pay_dt": "2024/05/17",              "get_meet_dt": "2024/03/29"          },          {              "record_date": "20240229",              "sht_cd": "034110",              "isin_name": "조선호텔앤리조트",              "stk_kind": "보통",              "opp_opi_rcpt_term": "020240322",              "buy_req_rcpt_term": "020240412",              "buy_req_price": "000000016577",              "buy_amt_pay_dt": "2024/05/14",              "get_meet_dt": "2024/03/26"          },          {              "record_date": "20240229",              "sht_cd": "034300",              "isin_name": "신세계건설",              "stk_kind": "보통",              "opp_opi_rcpt_term": "020240322",              "buy_req_rcpt_term": "020240412",              "buy_req_price": "000000011865",              "buy_amt_pay_dt": "2024/05/14",     
```

---
### 90. 예탁원정보(액면교체일정)

| Field | Value |
|---|---|
| Sheet | `예탁원정보(액면교체일정)` |
| Menu | [국내주식] 종목정보 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ksdinfo/rev-split` |
| TR_ID (실전) | `HHKDB669105C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `SHT_CD` | 종목코드 | string | Y | 9 | 공백: 전체,  특정종목 조회시 : 종목코드 |
| `CTS` | CTS | string | Y | 17 | 공백 |
| `F_DT` | 조회일자From | string | Y | 8 | 일자 ~ |
| `T_DT` | 조회일자To | string | Y | 8 | ~ 일자 |
| `MARKET_GB` | 시장구분 | string | Y | 1 | 0:전체, 1:코스피, 2:코스닥 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `record_date` | 기준일 | string | Y | 8 |  |
| `sht_cd` | 종목코드 | string | Y | 9 |  |
| `isin_name` | 종목명 | string | Y | 40 |  |
| `inter_bf_face_amt` | 변경전액면가 | string | Y | 9 |  |
| `inter_af_face_amt` | 변경후액면가 | string | Y | 9 |  |
| `td_stop_dt` | 매매거래정지기간 | string | Y | 23 |  |
| `list_dt` | 상장/등록일 | string | Y | 10 |  |

**Request Example:**
```
cts:  f_dt:20230301  t_dt:20240326  sht_cd:  market_gb:1
```

**Response Example:**
```
{      "output1": [          {              "record_date": "20230823",              "sht_cd": "001390",              "isin_name": "케이지케미칼",              "inter_bf_face_amt": "000005000",              "inter_af_face_amt": "000001000",              "td_stop_dt": "2023/08/22 ~ 2023/08/27",              "list_dt": "2023/08/28"          },          {              "record_date": "20230823",              "sht_cd": "011690",              "isin_name": "와이투솔루션",              "inter_bf_face_amt": "000000500",              "inter_af_face_amt": "000002500",              "td_stop_dt": "2023/08/22 ~ 2023/09/11",              "list_dt": "2023/09/12"          },          {              "record_date": "20230626",              "sht_cd": "017860",              "isin_name": "디에스단석",              "inter_bf_face_amt": "000001000",              "inter_af_face_amt": "000000500",              "td_stop_dt": "2023/06/23 ~",              "list_dt": ""          },          {              "record_date": "20230525",              "sht_cd": "111380",              "isin_name": "동인기연",              "inter_bf_face_amt": "000010000",              "inter_af_face_amt": "000000100",              "td_stop_dt": "2023/05/24 ~",              "list_dt": "2023/11/21"          },          {              "record_date": "20230525",              "sht_cd": "11138K",              "isin_name": "동인기연1우",              "inter_bf_face_amt": "000010000",              "inter_af_face_amt": "000000100",              "td_stop_dt": "2023/05/24 ~",              "list_dt": "2023/11/21"          },          {              "record_date": "20230509",              "sht_cd": "002900",              "isin_name": "티와이엠",              "inter_bf_face_amt": "000000500",              "inter_af_face_amt": "000002500",              "td_stop_dt": "2023/05/08 ~ 2023/05/21",              "list_dt": "2023/05/22"          },          {              "record_date": "20230503",              "sht_cd": "001140",              "isin_name": "국보",              "inter_bf_face_amt": "000000500",              "inter_af_face_amt": "000005000",              "td_stop_dt": "2023/05/02 ~ 2023/05/22",              "list_dt": "2023/05/23"          },          {              "record_date": "20230502",              "sht_cd": "001440",              "isin_name": "대한전선",              "inter_bf_face_amt": "000000100",              "inter_af_face_amt": "000001000",              "td_stop_dt": "2023/04/28 ~ 2023/05/15",              "list_dt": "2023/05/16"          },          {              "record_date": "20230420",              "sht_cd": "016590",              "isin_name": "신대양제지",              "inter_bf_face_amt": "000005000",              "inter_af_face_amt": "000000500",              "td_stop_dt": "2023/04/19 ~ 2023/04/23",              "list_dt": "2023/04/24"          },          {              "record_date": "20230414",              "sht_cd": "049770",              "isin_name": "동원에프앤비",              "inter_bf_face_amt": "000005000",              "i
```

---
### 91. 예탁원정보(배당일정)

| Field | Value |
|---|---|
| Sheet | `예탁원정보(배당일정)` |
| Menu | [국내주식] 종목정보 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ksdinfo/dividend` |
| TR_ID (실전) | `HHKDB669102C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CTS` | CTS | string | Y | 17 | 공백 |
| `GB1` | 조회구분 | string | Y | 1 | 0:배당전체, 1:결산배당, 2:중간배당 |
| `F_DT` | 조회일자From | string | Y | 8 | 일자 ~ |
| `T_DT` | 조회일자To | string | Y | 8 | ~ 일자 |
| `SHT_CD` | 종목코드 | string | Y | 9 | 공백: 전체,  특정종목 조회시 : 종목코드 |
| `HIGH_GB` | 고배당여부 | string | Y | 1 | 공백 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `record_date` | 기준일 | string | Y | 8 |  |
| `sht_cd` | 종목코드 | string | Y | 9 |  |
| `isin_name` | 종목명 | string | Y | 40 |  |
| `divi_kind` | 배당종류 | string | Y | 8 |  |
| `face_val` | 액면가 | string | Y | 9 |  |
| `per_sto_divi_amt` | 현금배당금 | string | Y | 12 |  |
| `divi_rate` | 현금배당률(%) | string | Y | 62 |  |
| `stk_divi_rate` | 주식배당률(%) | string | Y | 152 |  |
| `divi_pay_dt` | 배당금지급일 | string | Y | 10 |  |
| `stk_div_pay_dt` | 주식배당지급일 | string | Y | 10 |  |
| `odd_pay_dt` | 단주대금지급일 | string | Y | 10 |  |
| `stk_kind` | 주식종류 | string | Y | 10 |  |
| `high_divi_gb` | 고배당종목여부 | string | Y | 1 |  |

**Request Example:**
```
cts:  gb1:0  f_dt:20230301  t_dt:20240326  sht_cd:  high_gb:0
```

**Response Example:**
```
{      "output1": [          {              "record_date": "20240326",              "sht_cd": "000720",              "isin_name": "현대건설",              "divi_kind": "결산",              "face_val": "000005000",              "per_sto_divi_amt": "000000000600",              "divi_rate": " 12.00",              "stk_divi_rate": "  0.00",              "divi_pay_dt": "",              "stk_div_pay_dt": "",              "odd_pay_dt": "",              "stk_kind": "보통",              "high_divi_gb": ""          },          {              "record_date": "20240326",              "sht_cd": "000725",              "isin_name": "현대건설1우",              "divi_kind": "결산",              "face_val": "000005000",              "per_sto_divi_amt": "000000000650",              "divi_rate": " 13.00",              "stk_divi_rate": "  0.00",              "divi_pay_dt": "",              "stk_div_pay_dt": "",              "odd_pay_dt": "",              "stk_kind": "우선",              "high_divi_gb": ""          },          {              "record_date": "20240326",              "sht_cd": "003540",              "isin_name": "대신증권",              "divi_kind": "결산",              "face_val": "000005000",              "per_sto_divi_amt": "000000001200",              "divi_rate": " 24.00",              "stk_divi_rate": "  0.00",              "divi_pay_dt": "2024/04/16",              "stk_div_pay_dt": "",              "odd_pay_dt": "",              "stk_kind": "보통",              "high_divi_gb": ""          },          {              "record_date": "20240326",              "sht_cd": "003545",              "isin_name": "대신증권1우",              "divi_kind": "결산",              "face_val": "000005000",              "per_sto_divi_amt": "000000001250",              "divi_rate": " 25.00",              "stk_divi_rate": "  0.00",              "divi_pay_dt": "2024/04/16",              "stk_div_pay_dt": "",              "odd_pay_dt": "",              "stk_kind": "우선",              "high_divi_gb": ""          },          {              "record_date": "20240326",              "sht_cd": "003547",              "isin_name": "대신증권2우",              "divi_kind": "결산",              "face_val": "000005000",              "per_sto_divi_amt": "000000001200",              "divi_rate": " 24.00",              "stk_divi_rate": "  0.00",              "divi_pay_dt": "2024/04/16",              "stk_div_pay_dt": "",              "odd_pay_dt": "",              "stk_kind": "2우선",              "high_divi_gb": ""          },          {              "record_date": "20240326",              "sht_cd": "012510",              "isin_name": "더존비즈온",              "divi_kind": "결산",              "face_val": "000000500",              "per_sto_divi_amt": "000000000217",              "divi_rate": " 43.40",              "stk_divi_rate": "  0.00",              "divi_pay_dt": "2024/04/15",              "stk_div_pay_dt": "",              "odd_pay_dt": "",              "stk_kind": "보통",              "high_divi_gb": ""          },          {      
```

---
### 92. 국내주식 종목투자의견

| Field | Value |
|---|---|
| Sheet | `국내주식 종목투자의견` |
| Menu | [국내주식] 종목정보 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/invest-opinion` |
| TR_ID (실전) | `FHKST663300C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건시장분류코드 | string | Y | 2 | J(시장 구분 코드) |
| `FID_COND_SCR_DIV_CODE` | 조건화면분류코드 | string | Y | 5 | 16633(Primary key) |
| `FID_INPUT_ISCD` | 입력종목코드 | string | Y | 12 | 종목코드(ex) 005930(삼성전자)) |
| `FID_INPUT_DATE_1` | 입력날짜1 | string | Y | 10 | 이후 ~(ex) 0020231113) |
| `FID_INPUT_DATE_2` | 입력날짜2 | string | Y | 10 | ~ 이전(ex) 0020240513) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stck_bsop_date` | 주식영업일자 | string | Y | 8 |  |
| `invt_opnn` | 투자의견 | string | Y | 40 |  |
| `invt_opnn_cls_code` | 투자의견구분코드 | string | Y | 2 |  |
| `rgbf_invt_opnn` | 직전투자의견 | string | Y | 40 |  |
| `rgbf_invt_opnn_cls_code` | 직전투자의견구분코드 | string | Y | 2 |  |
| `mbcr_name` | 회원사명 | string | Y | 50 |  |
| `hts_goal_prc` | HTS목표가격 | string | Y | 10 |  |
| `stck_prdy_clpr` | 주식전일종가 | string | Y | 10 |  |
| `stck_nday_esdg` | 주식N일괴리도 | string | Y | 10 |  |
| `nday_dprt` | N일괴리율 | string | Y | 82 |  |
| `stft_esdg` | 주식선물괴리도 | string | Y | 10 |  |
| `dprt` | 괴리율 | string | Y | 82 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:J  FID_COND_SCR_DIV_CODE:16633  FID_INPUT_ISCD:005930  FID_INPUT_DATE_1:20240101  FID_INPUT_DATE_2:20240528
```

**Response Example:**
```
{      "output": [          {              "stck_bsop_date": "20240527",              "invt_opnn": "매수",              "invt_opnn_cls_code": "2",              "rgbf_invt_opnn": "매수",              "rgbf_invt_opnn_cls_code": "3",              "mbcr_name": "SK",              "hts_goal_prc": "105000",              "stck_prdy_clpr": "75900",              "stck_nday_esdg": "-29100",              "nday_dprt": "-27.71",              "stft_esdg": "-27400",              "dprt": "-26.10"          },          {              "stck_bsop_date": "20240520",              "invt_opnn": "BUY",              "invt_opnn_cls_code": "2",              "rgbf_invt_opnn": "BUY",              "rgbf_invt_opnn_cls_code": "3",              "mbcr_name": "하이투자",              "hts_goal_prc": "91000",              "stck_prdy_clpr": "77400",              "stck_nday_esdg": "-13600",              "nday_dprt": "-14.95",              "stft_esdg": "-13400",              "dprt": "-14.73"          },          {              "stck_bsop_date": "20240516",              "invt_opnn": "매수",              "invt_opnn_cls_code": "2",              "rgbf_invt_opnn": "매수",              "rgbf_invt_opnn_cls_code": "3",              "mbcr_name": "미래에셋",              "hts_goal_prc": "110000",              "stck_prdy_clpr": "78300",              "stck_nday_esdg": "-31700",              "nday_dprt": "-28.82",              "stft_esdg": "-32400",              "dprt": "-29.45"          },          {              "stck_bsop_date": "20240502",              "invt_opnn": "BUY",              "invt_opnn_cls_code": "2",              "rgbf_invt_opnn": "BUY",              "rgbf_invt_opnn_cls_code": "3",              "mbcr_name": "다올투자",              "hts_goal_prc": "105000",              "stck_prdy_clpr": "77500",              "stck_nday_esdg": "-27500",              "nday_dprt": "-26.19",              "stft_esdg": "-27400",              "dprt": "-26.10"          },          {              "stck_bsop_date": "20240502",              "invt_opnn": "BUY",              "invt_opnn_cls_code": "2",              "rgbf_invt_opnn": "BUY",              "rgbf_invt_opnn_cls_code": "3",              "mbcr_name": "하이투자",              "hts_goal_prc": "95000",              "stck_prdy_clpr": "77500",              "stck_nday_esdg": "-17500",              "nday_dprt": "-18.42",              "stft_esdg": "-17400",              "dprt": "-18.32"          },          {              "stck_bsop_date": "20240502",              "invt_opnn": "BUY",              "invt_opnn_cls_code": "2",              "rgbf_invt_opnn": "BUY",              "rgbf_invt_opnn_cls_code": "3",              "mbcr_name": "KB",              "hts_goal_prc": "120000",              "stck_prdy_clpr": "77500",              "stck_nday_esdg": "-42500",              "nday_dprt": "-35.42",              "stft_esdg": "-42400",              "dprt": "-35.33"          },          {              "stck_bsop_date": "20240502",              "invt_opnn": "매수",              "invt_opnn_cls_code": "2
```

---
### 93. 국내주식 안정성비율

| Field | Value |
|---|---|
| Sheet | `국내주식 안정성비율` |
| Menu | [국내주식] 종목정보 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/finance/stability-ratio` |
| TR_ID (실전) | `FHKST66430600` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `fid_input_iscd` | 입력 종목코드 | string | Y | 12 | 000660 : 종목코드 |
| `fid_div_cls_code` | 분류 구분 코드 | string | Y | 2 | 0: 년, 1: 분기 |
| `fid_cond_mrkt_div_code` | 조건 시장 분류 코드 | string | Y | 2 | J |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stac_yymm` | 결산 년월 | string | Y | 6 |  |
| `lblt_rate` | 부채 비율 | string | Y | 84 |  |
| `bram_depn` | 차입금 의존도 | string | Y | 92 |  |
| `crnt_rate` | 유동 비율 | string | Y | 84 |  |
| `quck_rate` | 당좌 비율 | string | Y | 84 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"J",  "fid_input_iscd":"005930",  "fid_div_cls_code":"1"  }
```

**Response Example:**
```
{      "output": [          {              "stac_yymm": "202312",              "lblt_rate": "25.36",              "bram_depn": "2.78",              "crnt_rate": "258.77",              "quck_rate": "190.59"          },          {              "stac_yymm": "202309",              "lblt_rate": "24.89",              "bram_depn": "2.21",              "crnt_rate": "280.39",              "quck_rate": "205.34"          },          {              "stac_yymm": "202306",              "lblt_rate": "24.80",              "bram_depn": "2.04",              "crnt_rate": "288.18",              "quck_rate": "209.76"          },          {              "stac_yymm": "202303",              "lblt_rate": "26.21",              "bram_depn": "2.19",              "crnt_rate": "281.95",              "quck_rate": "210.40"          },          {              "stac_yymm": "202212",              "lblt_rate": "26.41",              "bram_depn": "2.30",              "crnt_rate": "278.86",              "quck_rate": "212.24"          },          {              "stac_yymm": "202209",              "lblt_rate": "36.35",              "bram_depn": "2.65",              "crnt_rate": "294.17",              "quck_rate": "226.96"          },          {              "stac_yymm": "202206",              "lblt_rate": "36.64",              "bram_depn": "3.89",              "crnt_rate": "283.45",              "quck_rate": "220.96"          },          {              "stac_yymm": "202203",              "lblt_rate": "39.34",              "bram_depn": "4.11",              "crnt_rate": "256.86",              "quck_rate": "204.26"          },          {              "stac_yymm": "202112",              "lblt_rate": "39.92",              "bram_depn": "4.31",              "crnt_rate": "247.58",              "quck_rate": "200.62"          },          {              "stac_yymm": "202109",              "lblt_rate": "38.30",              "bram_depn": "4.65",              "crnt_rate": "259.91",              "quck_rate": "213.74"          },          {              "stac_yymm": "202106",              "lblt_rate": "36.29",              "bram_depn": "4.35",              "crnt_rate": "263.75",              "quck_rate": "217.39"          },          {              "stac_yymm": "202103",              "lblt_rate": "43.23",              "bram_depn": "5.08",              "crnt_rate": "232.11",              "quck_rate": "198.13"          },          {              "stac_yymm": "202012",              "lblt_rate": "37.07",              "bram_depn": "5.35",              "crnt_rate": "262.17",              "quck_rate": "219.79"          },          {              "stac_yymm": "202009",              "lblt_rate": "36.09",              "bram_depn": "5.22",              "crnt_rate": "278.77",              "quck_rate": "234.36"          },          {              "stac_yymm": "202006",              "lblt_rate": "32.67",              "bram_depn": "4.66",              "crnt_rate": "300.88",              "quck_rate": "252.96"         
```

---
### 94. 국내주식 수익성비율

| Field | Value |
|---|---|
| Sheet | `국내주식 수익성비율` |
| Menu | [국내주식] 종목정보 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/finance/profit-ratio` |
| TR_ID (실전) | `FHKST66430400` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `fid_input_iscd` | 입력 종목코드 | string | Y | 12 | 000660 : 종목코드 |
| `FID_DIV_CLS_CODE` | 분류 구분 코드 | string | Y | 2 | 0: 년, 1: 분기 |
| `fid_cond_mrkt_div_code` | 조건 시장 분류 코드 | string | Y | 2 | J |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stac_yymm` | 결산 년월 | string | Y | 6 |  |
| `cptl_ntin_rate` | 총자본 순이익율 | string | Y | 92 |  |
| `self_cptl_ntin_inrt` | 자기자본 순이익율 | string | Y | 92 |  |
| `sale_ntin_rate` | 매출액 순이익율 | string | Y | 92 |  |
| `sale_totl_rate` | 매출액 총이익율 | string | Y | 92 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"J",  "fid_input_iscd":"005930",  "fid_div_cls_code":"1"  }
```

**Response Example:**
```
{      "output": [          {              "stac_yymm": "202312",              "cptl_ntin_rate": "3.43",              "self_cptl_ntin_inrt": "4.14",              "sale_ntin_rate": "5.98",              "sale_totl_rate": "30.33"          },          {              "stac_yymm": "202309",              "cptl_ntin_rate": "2.70",              "self_cptl_ntin_inrt": "3.22",              "sale_ntin_rate": "4.78",              "sale_totl_rate": "29.76"          },          {              "stac_yymm": "202306",              "cptl_ntin_rate": "1.47",              "self_cptl_ntin_inrt": "1.70",              "sale_ntin_rate": "2.67",              "sale_totl_rate": "29.17"          },          {              "stac_yymm": "202303",              "cptl_ntin_rate": "1.40",              "self_cptl_ntin_inrt": "1.61",              "sale_ntin_rate": "2.47",              "sale_totl_rate": "27.83"          },          {              "stac_yymm": "202212",              "cptl_ntin_rate": "12.72",              "self_cptl_ntin_inrt": "17.07",              "sale_ntin_rate": "18.41",              "sale_totl_rate": "37.12"          },          {              "stac_yymm": "202209",              "cptl_ntin_rate": "9.46",              "self_cptl_ntin_inrt": "13.18",              "sale_ntin_rate": "13.73",              "sale_totl_rate": "38.98"          },          {              "stac_yymm": "202206",              "cptl_ntin_rate": "10.25",              "self_cptl_ntin_inrt": "14.36",              "sale_ntin_rate": "14.47",              "sale_totl_rate": "39.77"          },          {              "stac_yymm": "202203",              "cptl_ntin_rate": "10.46",              "self_cptl_ntin_inrt": "14.77",              "sale_ntin_rate": "14.56",              "sale_totl_rate": "39.48"          },          {              "stac_yymm": "202112",              "cptl_ntin_rate": "9.92",              "self_cptl_ntin_inrt": "13.92",              "sale_ntin_rate": "14.27",              "sale_totl_rate": "40.48"          },          {              "stac_yymm": "202109",              "cptl_ntin_rate": "9.83",              "self_cptl_ntin_inrt": "13.72",              "sale_ntin_rate": "14.32",              "sale_totl_rate": "40.18"          },          {              "stac_yymm": "202106",              "cptl_ntin_rate": "8.79",              "self_cptl_ntin_inrt": "12.21",              "sale_ntin_rate": "13.00",              "sale_totl_rate": "39.12"          },          {              "stac_yymm": "202103",              "cptl_ntin_rate": "7.41",              "self_cptl_ntin_inrt": "10.64",              "sale_ntin_rate": "10.92",              "sale_totl_rate": "36.53"          },          {              "stac_yymm": "202012",              "cptl_ntin_rate": "7.23",              "self_cptl_ntin_inrt": "9.99",              "sale_ntin_rate": "11.15",              "sale_totl_rate": "38.98"          },          {              "stac_yymm": "202009",              "cptl_ntin_rate": "7.25",              "s
```

---
### 95. 예탁원정보(실권주일정)

| Field | Value |
|---|---|
| Sheet | `예탁원정보(실권주일정)` |
| Menu | [국내주식] 종목정보 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ksdinfo/forfeit` |
| TR_ID (실전) | `HHKDB669109C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `SHT_CD` | 종목코드 | string | Y | 9 | 공백: 전체,  특정종목 조회시 : 종목코드 |
| `T_DT` | 조회일자To | string | Y | 8 | ~ 일자 |
| `F_DT` | 조회일자From | string | Y | 8 | 일자 ~ |
| `CTS` | CTS | string | Y | 17 | 공백 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `record_date` | 기준일 | string | Y | 8 |  |
| `sht_cd` | 종목코드 | string | Y | 9 |  |
| `isin_name` | 종목명 | string | Y | 40 |  |
| `subscr_dt` | 청약일 | string | Y | 23 |  |
| `subscr_price` | 공모가 | string | Y | 9 |  |
| `subscr_stk_qty` | 공모주식수 | string | Y | 12 |  |
| `refund_dt` | 환불일 | string | Y | 10 |  |
| `list_dt` | 상장/등록일 | string | Y | 10 |  |
| `lead_mgr` | 주간사 | string | Y | 25 |  |

**Request Example:**
```
cts:  f_dt:20230301  t_dt:20240326  sht_cd:
```

**Response Example:**
```
{      "output1": [          {              "record_date": "20240131",              "sht_cd": "001440",              "isin_name": "대한전선",              "subscr_dt": "2024/03/14 ~ 2024/03/15",              "subscr_price": "000007460",              "subscr_stk_qty": "    62000000",              "refund_dt": "2024/03/19",              "list_dt": "2024/04/02",              "lead_mgr": "케이비증권,미래에셋증권,"          },          {              "record_date": "20240131",              "sht_cd": "001447",              "isin_name": "대한전선2우",              "subscr_dt": "2024/03/14 ~ 2024/03/15",              "subscr_price": "000007460",              "subscr_stk_qty": "    62000000",              "refund_dt": "2024/03/19",              "list_dt": "2024/04/02",              "lead_mgr": "케이비증권,미래에셋증권,"          },          {              "record_date": "20240131",              "sht_cd": "001449",              "isin_name": "대한전선3우",              "subscr_dt": "2024/03/14 ~ 2024/03/15",              "subscr_price": "000007460",              "subscr_stk_qty": "    62000000",              "refund_dt": "2024/03/19",              "list_dt": "2024/04/02",              "lead_mgr": "케이비증권,미래에셋증권,"          },          {              "record_date": "20240131",              "sht_cd": "00144A",              "isin_name": "대한전선4우",              "subscr_dt": "2024/03/14 ~ 2024/03/15",              "subscr_price": "000007460",              "subscr_stk_qty": "    62000000",              "refund_dt": "2024/03/19",              "list_dt": "2024/04/02",              "lead_mgr": "케이비증권,미래에셋증권,"          },          {              "record_date": "20240131",              "sht_cd": "00144K",              "isin_name": "대한전선5우",              "subscr_dt": "2024/03/14 ~ 2024/03/15",              "subscr_price": "000007460",              "subscr_stk_qty": "    62000000",              "refund_dt": "2024/03/19",              "list_dt": "2024/04/02",              "lead_mgr": "케이비증권,미래에셋증권,"          },          {              "record_date": "20240126",              "sht_cd": "034220",              "isin_name": "LG디스플레이",              "subscr_dt": "2024/03/11 ~ 2024/03/12",              "subscr_price": "000009090",              "subscr_stk_qty": "   142184300",              "refund_dt": "2024/03/14",              "list_dt": "2024/03/26",              "lead_mgr": "한국투자증권,NH투자증권,"          }      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 96. 예탁원정보(의무예치일정)

| Field | Value |
|---|---|
| Sheet | `예탁원정보(의무예치일정)` |
| Menu | [국내주식] 종목정보 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ksdinfo/mand-deposit` |
| TR_ID (실전) | `HHKDB669110C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `T_DT` | 조회일자To | string | Y | 8 | ~ 일자 |
| `SHT_CD` | 종목코드 | string | Y | 9 | 공백: 전체,  특정종목 조회시 : 종목코드 |
| `F_DT` | 조회일자From | string | Y | 8 | 일자 ~ |
| `CTS` | CTS | string | Y | 17 | 공백 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `sht_cd` | 종목코드 | string | Y | 9 |  |
| `isin_name` | 종목명 | string | Y | 40 |  |
| `stk_qty` | 주식수 | string | Y | 12 |  |
| `depo_date` | 예치일 | string | Y | 23 |  |
| `depo_reason` | 사유 | string | Y | 10 |  |
| `tot_issue_qty_per_rate` | 총발행주식수대비비율(%) | string | Y | 52 |  |

**Request Example:**
```
cts:  f_dt:20230301  t_dt:20240326  sht_cd:
```

**Response Example:**
```
{      "output1": [          {              "sht_cd": "27322R",              "isin_name": "뷰텔7우",              "stk_qty": "       68966",              "depo_date": "2024/03/26 ~ 2025/03/26",              "depo_reason": "모집매출",              "tot_issue_qty_per_rate": "10000"          },          {              "sht_cd": "455900",              "isin_name": "엔젤로보틱스",              "stk_qty": "       48000",              "depo_date": "2024/03/26 ~ 2024/06/26",              "depo_reason": "-",              "tot_issue_qty_per_rate": "33.51"          },          {              "sht_cd": "455900",              "isin_name": "엔젤로보틱스",              "stk_qty": "     4224840",              "depo_date": "2024/03/26 ~ 2027/03/26",              "depo_reason": "최대주주",              "tot_issue_qty_per_rate": "3014."          },          {              "sht_cd": "455900",              "isin_name": "엔젤로보틱스",              "stk_qty": "      307036",              "depo_date": "2024/03/26 ~ 2024/04/26",              "depo_reason": "최대주주",              "tot_issue_qty_per_rate": "214.3"          },          {              "sht_cd": "45590S",              "isin_name": "엔젤로보틱스 8우",              "stk_qty": "       65128",              "depo_date": "2024/03/26 ~ 2024/04/26",              "depo_reason": "벤처금융",              "tot_issue_qty_per_rate": "700.0"          },          {              "sht_cd": "45590S",              "isin_name": "엔젤로보틱스 8우",              "stk_qty": "      865277",              "depo_date": "2024/03/26 ~ 2024/04/26",              "depo_reason": "최대주주",              "tot_issue_qty_per_rate": "9300."          },          {              "sht_cd": "119650",              "isin_name": "케이씨코트렐",              "stk_qty": "    12733857",              "depo_date": "2024/03/25 ~ 2025/03/25",              "depo_reason": "모집매출",              "tot_issue_qty_per_rate": "2000."          },          {              "sht_cd": "123840",              "isin_name": "뉴온",              "stk_qty": "    62516803",              "depo_date": "2024/03/25 ~ 2024/09/25",              "depo_reason": "-",              "tot_issue_qty_per_rate": "2253."          },          {              "sht_cd": "420570",              "isin_name": "제이투케이바이오",              "stk_qty": "         951",              "depo_date": "2024/03/25 ~ 2024/09/25",              "depo_reason": "-",              "tot_issue_qty_per_rate": " 1.71"          },          {              "sht_cd": "019570",              "isin_name": "리더스기술투자",              "stk_qty": "     8905532",              "depo_date": "2024/03/22 ~ 2025/03/22",              "depo_reason": "-",              "tot_issue_qty_per_rate": "1697."          },          {              "sht_cd": "036180",              "isin_name": "지더블유바이텍",              "stk_qty": "    28911564",              "depo_date": "2024/03/22 ~ 2025/03/22",              "depo_reason": "모집매출",              "tot_issue_qty_per_rate": "3160."          },          {              "sht_cd": "06911
```

---
### 97. 국내주식 손익계산서

| Field | Value |
|---|---|
| Sheet | `국내주식 손익계산서` |
| Menu | [국내주식] 종목정보 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/finance/income-statement` |
| TR_ID (실전) | `FHKST66430200` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_DIV_CLS_CODE` | 분류 구분 코드 | string | Y | 2 | 0: 년, 1: 분기    ※ 분기데이터는 연단위 누적합산 |
| `fid_cond_mrkt_div_code` | 조건 시장 분류 코드 | string | Y | 2 | J |
| `fid_input_iscd` | 입력 종목코드 | string | Y | 12 | 000660 : 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stac_yymm` | 결산 년월 | string | Y | 6 |  |
| `sale_account` | 매출액 | string | Y | 18 |  |
| `sale_cost` | 매출 원가 | string | Y | 182 |  |
| `sale_totl_prfi` | 매출 총 이익 | string | Y | 182 |  |
| `depr_cost` | 감가상각비 | string | Y | 182 | 출력되지 않는 데이터(99.99 로 표시) |
| `sell_mang` | 판매 및 관리비 | string | Y | 182 | 출력되지 않는 데이터(99.99 로 표시) |
| `bsop_prti` | 영업 이익 | string | Y | 182 |  |
| `bsop_non_ernn` | 영업 외 수익 | string | Y | 182 | 출력되지 않는 데이터(99.99 로 표시) |
| `bsop_non_expn` | 영업 외 비용 | string | Y | 182 | 출력되지 않는 데이터(99.99 로 표시) |
| `op_prfi` | 경상 이익 | string | Y | 182 |  |
| `spec_prfi` | 특별 이익 | string | Y | 182 |  |
| `spec_loss` | 특별 손실 | string | Y | 182 |  |
| `thtr_ntin` | 당기순이익 | string | Y | 102 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"J",  "fid_input_iscd":"005930",  "fid_div_cls_code":"1"  }
```

**Response Example:**
```
{      "output": [          {              "stac_yymm": "202312",              "sale_account": "2589355.00",              "sale_cost": "1803886.00",              "sale_totl_prfi": "785469",              "depr_cost": "99.99",              "sell_mang": "99.99",              "bsop_prti": "65670.00",              "bsop_non_ernn": "99.99",              "bsop_non_expn": "99.99",              "op_prfi": "110063.00",              "spec_prfi": "99.99",              "spec_loss": "99.99",              "thtr_ntin": "154871.00"          },          {              "stac_yymm": "202309",              "sale_account": "1911556.00",              "sale_cost": "1342731.00",              "sale_totl_prfi": "568825",              "depr_cost": "99.99",              "sell_mang": "99.99",              "bsop_prti": "37423.00",              "bsop_non_ernn": "99.99",              "bsop_non_expn": "99.99",              "op_prfi": "74820.00",              "spec_prfi": "99.99",              "spec_loss": "99.99",              "thtr_ntin": "91423.00"          },          {              "stac_yymm": "202306",              "sale_account": "1237509.00",              "sale_cost": "876543.00",              "sale_totl_prfi": "360966",              "depr_cost": "99.99",              "sell_mang": "99.99",              "bsop_prti": "13087.00",              "bsop_non_ernn": "99.99",              "bsop_non_expn": "99.99",              "op_prfi": "35394.00",              "spec_prfi": "99.99",              "spec_loss": "99.99",              "thtr_ntin": "32982.00"          },          {              "stac_yymm": "202303",              "sale_account": "637454.00",              "sale_cost": "460071.00",              "sale_totl_prfi": "177383",              "depr_cost": "99.99",              "sell_mang": "99.99",              "bsop_prti": "6402.00",              "bsop_non_ernn": "99.99",              "bsop_non_expn": "99.99",              "op_prfi": "18264.00",              "spec_prfi": "99.99",              "spec_loss": "99.99",              "thtr_ntin": "15746.00"          },          {              "stac_yymm": "202212",              "sale_account": "3022314.00",              "sale_cost": "1900418.00",              "sale_totl_prfi": "1121896",              "depr_cost": "99.99",              "sell_mang": "99.99",              "bsop_prti": "433766.00",              "bsop_non_ernn": "99.99",              "bsop_non_expn": "99.99",              "op_prfi": "464405.00",              "spec_prfi": "99.99",              "spec_loss": "99.99",              "thtr_ntin": "556541.00"          },          {              "stac_yymm": "202209",              "sale_account": "2317668.00",              "sale_cost": "1414141.00",              "sale_totl_prfi": "903527",              "depr_cost": "99.99",              "sell_mang": "99.99",              "bsop_prti": "390705.00",              "bsop_non_ernn": "99.99",              "bsop_non_expn": "99.99",              "op_prfi": "413856.00",              "spec_prfi"
```

---
### 98. 당사 대주가능 종목

| Field | Value |
|---|---|
| Sheet | `당사 대주가능 종목` |
| Menu | [국내주식] 종목정보 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/lendable-by-company` |
| TR_ID (실전) | `CTSC2702R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `EXCG_DVSN_CD` | 거래소구분코드 | string | Y | 2 | 00(전체), 02(거래소), 03(코스닥) |
| `PDNO` | 상품번호 | string | Y | 12 | 공백 : 전체조회, 종목코드 입력 시 해당종목만 조회 |
| `THCO_STLN_PSBL_YN` | 당사대주가능여부 | string | Y | 1 | Y |
| `INQR_DVSN_1` | 조회구분1 | string | Y | 1 | 0 : 전체조회, 1: 종목코드순 정렬 |
| `CTX_AREA_FK200` | 연속조회검색조건200 | string | Y | 200 | 미입력 (다음조회 불가) |
| `CTX_AREA_NK100` | 연속조회키100 | string | Y | 100 | 미입력 (다음조회 불가) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `pdno` | 상품번호 | string | Y | 12 |  |
| `prdt_name` | 상품명 | string | Y | 60 |  |
| `papr` | 액면가 | string | Y | 19 |  |
| `bfdy_clpr` | 전일종가 | string | Y | 19 | 전일종가 |
| `sbst_prvs` | 대용가 | string | Y | 19 |  |
| `tr_stop_dvsn_name` | 거래정지구분명 | string | Y | 60 |  |
| `psbl_yn_name` | 가능여부명 | string | Y | 60 |  |
| `lmt_qty1` | 한도수량1 | string | Y | 19 |  |
| `use_qty1` | 사용수량1 | string | Y | 19 |  |
| `trad_psbl_qty2` | 매매가능수량2 | string | Y | 19 | 가능수량 |
| `rght_type_cd` | 권리유형코드 | string | Y | 2 |  |
| `bass_dt` | 기준일자 | string | Y | 8 |  |
| `psbl_yn` | 가능여부 | string | Y | 1 |  |
| `output2` | 응답상세 | object | Y |  |  |
| `tot_stup_lmt_qty` | 총설정한도수량 | string | Y | 19 |  |
| `brch_lmt_qty` | 지점한도수량 | string | Y | 19 |  |
| `rqst_psbl_qty` | 신청가능수량 | string | Y | 19 |  |

**Request Example:**
```
EXCG_DVSN_CD:00  PDNO:  THCO_STLN_PSBL_YN:Y  INQR_DVSN_1:0  CTX_AREA_FK200:  CTX_AREA_NK100:
```

**Response Example:**
```
{      "ctx_area_fk200": "00!^!^Y!^0                                                                                                                                                                                              ",      "ctx_area_nk100": "                                                                                                    ",      "output1": [          {              "pdno": "130960",              "prdt_name": "CJ E&M",              "papr": "5000",              "bfdy_clpr": "0",              "sbst_prvs": "0",              "tr_stop_dvsn_name": "거래정지",              "psbl_yn_name": "가능",              "lmt_qty1": "10520",              "use_qty1": "0",              "trad_psbl_qty2": "10520",              "rght_type_cd": "11",              "bass_dt": "20180629",              "psbl_yn": "Y"          },          {              "pdno": "110550",              "prdt_name": "HIT 골드",              "papr": "0",              "bfdy_clpr": "0",              "sbst_prvs": "0",              "tr_stop_dvsn_name": "거래정지",              "psbl_yn_name": "가능",              "lmt_qty1": "0",              "use_qty1": "0",              "trad_psbl_qty2": "0",              "rght_type_cd": "32",              "bass_dt": "20111222",              "psbl_yn": "Y"          },          {              "pdno": "124090",              "prdt_name": "HIT 보험",              "papr": "0",              "bfdy_clpr": "0",              "sbst_prvs": "0",              "tr_stop_dvsn_name": "거래정지",              "psbl_yn_name": "가능",              "lmt_qty1": "0",              "use_qty1": "0",              "trad_psbl_qty2": "0",              "rght_type_cd": "32",              "bass_dt": "20111219",              "psbl_yn": "Y"          },          {              "pdno": "002550",              "prdt_name": "KB손해보험",              "papr": "500",              "bfdy_clpr": "0",              "sbst_prvs": "0",              "tr_stop_dvsn_name": "거래정지",              "psbl_yn_name": "가능",              "lmt_qty1": "0",              "use_qty1": "0",              "trad_psbl_qty2": "0",              "rght_type_cd": "13",              "bass_dt": "20170706",              "psbl_yn": "Y"          },          {              "pdno": "021960",              "prdt_name": "KB캐피탈",              "papr": "5000",              "bfdy_clpr": "0",              "sbst_prvs": "0",              "tr_stop_dvsn_name": "거래정지",              "psbl_yn_name": "가능",              "lmt_qty1": "0",              "use_qty1": "0",              "trad_psbl_qty2": "0",              "rght_type_cd": "13",              "bass_dt": "20170706",              "psbl_yn": "Y"          },          {              "pdno": "105270",              "prdt_name": "KINDEX 성장대형F15",              "papr": "0",              "bfdy_clpr": "0",              "sbst_prvs": "0",              "tr_stop_dvsn_name": "거래정지",              "psbl_yn_name": "가능",              "lmt_qty1": "0",              "use_qty1": "0",              "trad_psbl_qty2": "0",              "
```

---
### 99. 주식기본조회

| Field | Value |
|---|---|
| Sheet | `주식기본조회` |
| Menu | [국내주식] 종목정보 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/search-stock-info` |
| TR_ID (실전) | `CTPF1002R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `PRDT_TYPE_CD` | 상품유형코드 | string | Y | 3 | 300: 주식, ETF, ETN, ELW   301 : 선물옵션   302 : 채권   306 : ELS' |
| `PDNO` | 상품번호 | string | Y | 12 | 종목번호 (6자리)  ETN의 경우, Q로 시작 (EX. Q500001) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세1 | object | Y |  |  |
| `pdno` | 상품번호 | string | Y | 12 |  |
| `prdt_type_cd` | 상품유형코드 | string | Y | 3 |  |
| `mket_id_cd` | 시장ID코드 | string | Y | 3 | AGR.농축산물파생  BON.채권파생  CMD.일반상품시장  CUR.통화파생  ENG.에너지파생  EQU.주식파생  ETF.ETF파생  IRT.금리파생  KNX.코넥스  KSQ.코스닥  MTL.금속파생  SPI.주가지수파생  STK.유가증권 |
| `scty_grp_id_cd` | 증권그룹ID코드 | string | Y | 2 | BC.수익증권  DR.주식예탁증서  EF.ETF  EN.ETN  EW.ELW  FE.해외ETF  FO.선물옵션  FS.외국주권  FU.선물  FX.플렉스 선물  GD.금현물  IC.투자계약증권  IF.사회간접자본투융자회사  KN.코넥스주권  MF.투자회사  OP.옵션  RT.부동산투자회사  SC.선박투자회사  SR.신주인수권증서  ST.주권  SW.신주인수권증권  TC.신탁수익증권 |
| `excg_dvsn_cd` | 거래소구분코드 | string | Y | 2 | 01.한국증권  02.증권거래소  03.코스닥  04.K-OTC  05.선물거래소  06.CME  07.EUREX  21.금현물  50.미국주간  51.홍콩  52.상해B  53.심천  54.홍콩거래소  55.미국  56.일본  57.상해A  58.심천A  59.베트남  61.장전시간외시장  64.경쟁대량매매  65.경매매시장  81.시간외단일가시장 |
| `setl_mmdd` | 결산월일 | string | Y | 4 |  |
| `lstg_stqt` | 상장주수 | string | Y | 19 |  |
| `lstg_cptl_amt` | 상장자본금액 | string | Y | 19 |  |
| `cpta` | 자본금 | string | Y | 19 |  |
| `papr` | 액면가 | string | Y | 19 |  |
| `issu_pric` | 발행가격 | string | Y | 19 |  |
| `kospi200_item_yn` | 코스피200종목여부 | string | Y | 1 |  |
| `scts_mket_lstg_dt` | 유가증권시장상장일자 | string | Y | 8 |  |
| `scts_mket_lstg_abol_dt` | 유가증권시장상장폐지일자 | string | Y | 8 |  |
| `kosdaq_mket_lstg_dt` | 코스닥시장상장일자 | string | Y | 8 |  |
| `kosdaq_mket_lstg_abol_dt` | 코스닥시장상장폐지일자 | string | Y | 8 |  |
| `frbd_mket_lstg_dt` | 프리보드시장상장일자 | string | Y | 8 |  |
| `frbd_mket_lstg_abol_dt` | 프리보드시장상장폐지일자 | string | Y | 8 |  |
| `reits_kind_cd` | 리츠종류코드 | string | Y | 1 |  |
| `etf_dvsn_cd` | ETF구분코드 | string | Y | 2 |  |
| `oilf_fund_yn` | 유전펀드여부 | string | Y | 1 |  |
| `idx_bztp_lcls_cd` | 지수업종대분류코드 | string | Y | 3 |  |
| `idx_bztp_mcls_cd` | 지수업종중분류코드 | string | Y | 3 |  |
| `idx_bztp_scls_cd` | 지수업종소분류코드 | string | Y | 3 |  |
| `stck_kind_cd` | 주식종류코드 | string | Y | 3 | 000.해당사항없음  101.보통주  201.우선주  202.2우선주  203.3우선주  204.4우선주  205.5우선주  206.6우선주  207.7우선주  208.8우선주  209.9우선주  210.10우선주  211.11우선주  212.12우선주  213.13우선주  214.14우선주  215.15우선주  216.16우선주  217.17우선주  218.18우선주  219.19우선주  220.20우선주  301.후배주  401.혼합주 |
| `mfnd_opng_dt` | 뮤추얼펀드개시일자 | string | Y | 8 |  |
| `mfnd_end_dt` | 뮤추얼펀드종료일자 | string | Y | 8 |  |
| `dpsi_erlm_cncl_dt` | 예탁등록취소일자 | string | Y | 8 |  |
| `etf_cu_qty` | ETFCU수량 | string | Y | 10 |  |
| `prdt_name` | 상품명 | string | Y | 60 |  |
| `prdt_name120` | 상품명120 | string | Y | 120 |  |
| `prdt_abrv_name` | 상품약어명 | string | Y | 60 |  |
| `std_pdno` | 표준상품번호 | string | Y | 12 |  |
| `prdt_eng_name` | 상품영문명 | string | Y | 60 |  |
| `prdt_eng_name120` | 상품영문명120 | string | Y | 120 |  |
| `prdt_eng_abrv_name` | 상품영문약어명 | string | Y | 60 |  |
| `dpsi_aptm_erlm_yn` | 예탁지정등록여부 | string | Y | 1 |  |
| `etf_txtn_type_cd` | ETF과세유형코드 | string | Y | 2 |  |
| `etf_type_cd` | ETF유형코드 | string | Y | 2 |  |
| `lstg_abol_dt` | 상장폐지일자 | string | Y | 8 |  |
| `nwst_odst_dvsn_cd` | 신주구주구분코드 | string | Y | 2 |  |
| `sbst_pric` | 대용가격 | string | Y | 19 |  |
| `thco_sbst_pric` | 당사대용가격 | string | Y | 19 |  |
| `thco_sbst_pric_chng_dt` | 당사대용가격변경일자 | string | Y | 8 |  |
| `tr_stop_yn` | 거래정지여부 | string | Y | 1 |  |
| `admn_item_yn` | 관리종목여부 | string | Y | 1 |  |
| `thdt_clpr` | 당일종가 | string | Y | 19 |  |
| `bfdy_clpr` | 전일종가 | string | Y | 19 |  |
| `clpr_chng_dt` | 종가변경일자 | string | Y | 8 |  |
| `std_idst_clsf_cd` | 표준산업분류코드 | string | Y | 6 |  |
| `std_idst_clsf_cd_name` | 표준산업분류코드명 | string | Y | 130 | 표준산업소분류코드  000000	해당사항없음                                       010101	작물 재배업                                        010102	축산업                                             010103	작물재배 및 축산 복합농업                          010104	작물재배 및 축산 관련 서비스업                     010105	수렵 및 관련 서비스업                              010201	임업                                               010301	어로 어업                                          010302	양식어업 및 어업관련 서비스업                      020501	석탄 광업                                          020502	원유 및 천연가스 채굴업                            020601	철 광업                                            020602	비철금속 광업                                      020701	토사석 광업                                        020702	기타 비금속광물 광업                               020801	광업 지원 서비스업                                 031001	도축, 육류 가공 및 저장 처리업                     031002	수산물 가공 및 저장 처리업                         031003	과실, 채소 가공 및 저장 처리업                     031004	동물성 및 식물성 유지 제조업                       031005	낙농제품 및 식용빙과류 제조업                      031006	곡물가공품, 전분 및 전분제품 제조업                031007	기타 식품 제조업                                   031008	동물용 사료 및 조제식품 제조업                     031101	알콜음료 제조업                                    031102	비알콜음료 및 얼음 제조업                          031201	담배 제조업                                        031301	방적 및 가공사 제조업                              031302	직물직조 및 직물제품 제조업                        031303	편조원단 및 편조제품 제조업                        031304	섬유제품 염색, 정리 및 마무리 가공업               031309	기타 섬유제품 제조업                               031401	봉제의복 제조업                                    031402	모피가공 및 모피제품 제조업                        031403	편조의복 제조업                                    031404	의복 액세서리 제조업                               031501	가죽, 가방 및 유사제품 제조업                      031502	신발 및 신발부분품 제조업                          031601	제재 및 목재 가공업                                031602	나무제품 제조업                                    031603	코르크 및 조물 제품 제조업                         031701	펄프, 종이 및 판지 제조업                          031702	골판지, 종이 상자 및 종이용기 제조업               031709	기타 종이 및 판지 제품 제조업                      031801	인쇄 및 인쇄관련 산업                              031802	기록매체 복제업                                    031901	코크스 및 연탄 제조업                              031902	석유 정제품 제조업                                 032001	기초화학물질 제조업                                032002	비료 및 질소화합물 제조업                          032003	합성고무 및 플라스틱 물질 제조업                   032004	기타 화학제품 제조업                               032005	화학섬유 제조업                                    032101	기초 의약물질 및 생물학적 제제 제조업              032102	의약품 제조업                                      032103	의료용품 및 기타 의약관련제품 제조업               032201	고무제품 제조업                                    032202	플라스틱제품 제조업                                032301	유리 및 유리제품 제조업                            032302	도자기 및 기타 요업제품 제조업                     032303	시멘트, 석회, 플라스터 및 그 제품 제조업           032309	기타 비금속 광물제품 제조업                        032401	1차 철강 제조업                                    032402	1차 비철금속 제조업                                032403	금속 주조업                                        032501	구조용 금속제품, 탱크 및 증기발생기 제조업         032502	무기 및 총포탄 제조업                              032509	기타 금속가공제품 제조업                           032601	반도체 제조업                                      032602	전자부품 제조업                                    032603	컴퓨터 및 주변장치 제조업                          032604	통신 및 방송 장비 제조업                           032605	영상 및 음향기기 제조업                            032606	마그네틱 및 광학 매체 제조업                       032701	의료용 기기 제조업                                 032702	측정, 시험, 항해, 제어 및 기타 정밀기기 제조업; ?  032703	안경, 사진장비 및 기타 광학기기 제조업             032704	시계 및 시계부품 제조업                            032801	전동기, 발전기 및 전기 변환 · 공급 · 제어 장치   032802	일차전지 및 축전지 제조업                          032803	절연선 및 케이블 제조업                            032804	전구 및 조명장치 제조업                            032805	가정용 기기 제조업                                 032809	기타 전기장비 제조업                               032901	일반 목적용 기계 제조업                            032902	특수 목적용 기계 제조업                            033001	자동차용 엔진 및 자동차 제조업                     033002	자동차 차체 및 트레일러 제조업                     033003	자동차 부품 제조업                                 033101	선박 및 보트 건조업                                033102	철도장비 제조업                                    033103	항공기,우주선 및 부품 제조업                       033109	그외 기타 운송장비 제조업                          033201	가구 제조업                                        033301	귀금속 및 장신용품 제조업                          033302	악기 제조업                                        033303	운동 및 경기용구 제조업                            033304	인형,장난감 및 오락용품 제조업                     033309	그외 기타 제품 제조업                              043501	전기업                                             043502	가스 제조 및 배관공급업                            043503	증기, 냉온수 및 공기조절 공급업                    043601	수도사업                                           053701	하수, 폐수 및 분뇨 처리업                          053801	폐기물 수집운반업                                  053802	폐기물 처리업                                      053803	금속 및 비금속 원료 재생업                         053901	환경 정화 및 복원업                                064101	건물 건설업                                        064102	토목 건설업                                        064201	기반조성 및 시설물 축조관련 전문공사업             064202	건물설비 설치 공사업                               064203	전기 및 통신 공사업                                064204	실내건축 및 건축 마무리 공사업                     064205	건설장비 운영업                                    074501	자동차 판매업                                      074502	자동차 부품 및 내장품 판매업                       074503	모터사이클 및 부품 판매업                          074601	상품 중개업                                        074602	산업용 농축산물 및 산동물 도매업                   074603	음·식료품 및 담배 도매업                          074604	가정용품 도매업                                    074605	기계장비 및 관련 물품 도매업                       074606	건축자재, 철물 및 난방장치 도매업                  074607	기타 전문 도매업                                   074608	상품 종합 도매업                                   074701	종합 소매업                                        074702	음·식료품 및 담배 소매업                          074703	정보통신장비 소매업                                074704	섬유, 의복, 신발 및 가죽제품 소매업                074705	기타 가정용품 소매업                               074706	문화, 오락 및 여가 용품 소매업                     074707	연료 소매업                                        074708	기타 상품 전문 소매업                              074709	무점포 소매업                                      084901	철도운송업                                         084902	육상 여객 운송업                                   084903	도로 화물 운송업                                   084904	소화물 전문 운송업                                 084905	파이프라인 운송업                                  085001	해상 운송업                                        085002	내륙 수상 및 항만내 운송업                         085101	정기 항공 운송업                                   085102	부정기 항공 운송업                                 085201	보관 및 창고업                                     085209	기타 운송관련 서비스업                             095501	숙박시설 운영업                                    095509	기타 숙박업                                        095601	음식점업                                           095602	주점 및 비알콜음료점업                             105801	서적, 잡지 및 기타 인쇄물 출판업                   105802	소프트웨어 개발 및 공급업                          105901	영화, 비디오물, 방송프로그램 제작 및 배급업        105902	오디오물 출판 및 원판 녹음업                       106001	라디오 방송업                                      106002	텔레비전 방송업                                    106101	우편업                                             106102	전기통신업                                         106201	컴퓨터 프로그래밍, 시스템 통합 및 관리업           106301	자료처리, 호스팅, 포털 및 기타 인터넷 정보매개서?  106309	기타 정보 서비스업                                 116401	은행 및 저축기관                                   116402	투자기관                                           116409	기타 금융업                                        116501	보험업                                             116502	재 보험업                                          116503	연금 및 공제업                                     116601	금융지원 서비스업                                  116602	보험 및 연금관련 서비스업                          126801	부동산 임대 및 공급업                              126802	부동산 관련 서비스업                               126901	운송장비 임대업                                    126902	개인 및 가정용품 임대업                            126903	산업용 기계 및 장비 임대업                         126904	무형재산권 임대업                                  137001	자연과학 및 공학 연구개발업                        137002	인문 및 사회과학 연구개발업                        137101	법무관련 서비스업                                  137102	회계 및 세무관련 서비스업                          137103	광고업                                             137104	시장조사 및 여론조사업                             137105	회사본부, 지주회사 및 경영컨설팅 서비스업          137201	건축기술, 엔지니어링 및 관련기술 서비스업          137209	기타 과학기술 서비스업                             137301	수의업                                             137302	전문디자인업                                       137303	사진 촬영 및 처리업                                137309	그외 기타 전문, 과학 및 기술 서비스업              147401	사업시설 유지관리 서비스업                         147402	건물·산업설비 청소 및 방제 서비스업               147403	조경 관리 및 유지 서비스업                         147501	인력공급 및 고용알선업                             147502	여행사 및 기타 여행보조 서비스업                   147503	경비, 경호 및 탐정업                               147509	기타 사업지원 서비스업                             158401	입법 및 일반 정부 행정                             158402	사회 및 산업정책 행정                              158403	외무 및 국방 행정                                  158404	사법 및 공공질서 행정                              158405	사회보장 행정                                      168501	초등 교육기관                                      168502	중등 교육기관                                      168503	고등 교육기관                                      168504	특수학교, 외국인학교 및 대안학교                   168505	일반 교습 학원                                     168506	기타 교육기관                                      168507	교육지원 서비스업                                  178601	병원                                               178602	의원                                               178603	공중 보건 의료업                                   178609	기타 보건업                                        178701	거주 복지시설 운영업                               178702	비거주 복지시설 운영업                             189001	창작 및 예술관련 서비스업                          189002	도서관, 사적지 및 유사 여가관련 서비스업           189101	스포츠 서비스업                                    189102	유원지 및 기타 오락관련 서비스업                   199401	산업 및 전문가 단체                                199402	노동조합                                           199409	기타 협회 및 단체                                  199501	기계 및 장비 수리업                                199502	자동차 및 모터사이클 수리업                        199503	개인 및 가정용품 수리업                            199601	미용, 욕탕 및 유사 서비스업                        199609	그외 기타 개인 서비스업                            209701	가구내 고용활동                                    209801	자가 소비를 위한 가사 생산 활동                    209802	자가 소비를 위한 가사 서비스 활동                  219901	국제 및 외국기관 |
| `idx_bztp_lcls_cd_name` | 지수업종대분류코드명 | string | Y | 60 | 표준산업대분류코드  00	해당사항없음                                                              01	농업, 임업 및 어업                                                        02	광업                                                                      03	제조업                                                                    04	전기, 가스, 증기 및 수도사업                                              05	하수-폐기물 처리, 원료재생 및환경복원업                                   06	건설업                                                                    07	도매 및 소매업                                                            08	운수업                                                                    09	숙박 및 음식점업                                                          10	출판, 영상, 방송통신 및 정보서비스업                                      11	금융 및 보험업                                                            12	부동산업 및 임대업                                                        13	전문, 과학 및 기술 서비스업                                               14	사업시설관리 및 사업지원서비스업                                          15	공공행정, 국방 및 사회보장 행정                                           16	교육 서비스업                                                             17	보건업 및 사회복지 서비스업                                               18	예술, 스포츠 및 여가관련 서비스업                                         19	협회 및 단체, 수리 및 기타 개인 서비스업                                  20	가구내 고용활동 및 달리 분류되지 않은 자가소비생산활동                    21	국제 및 외국기관 |
| `idx_bztp_mcls_cd_name` | 지수업종중분류코드명 | string | Y | 60 | 표준산업중분류코드                                                     0000	해당사항없음                                                              0101	농업                                                                      0102	임업                                                                      0103	어업                                                                      0205	석탄, 원유 및 천연가스 광업                                               0206	금속 광업                                                                 0207	비금속광물 광업; 연료용 제외                                              0208	광업 지원 서비스업                                                        0310	식료품 제조업                                                             0311	음료 제조업                                                               0312	담배 제조업                                                               0313	섬유제품 제조업; 의복제외                                                 0314	의복, 의복액세서리 및 모피제품제조업                                      0315	가죽, 가방 및 신발 제조업                                                 0316	목재 및 나무제품 제조업;가구제외                                          0317	펄프, 종이 및 종이제품 제조업                                             0318	인쇄 및 기록매체 복제업                                                   0319	코크스, 연탄 및 석유정제품 제조업                                         0320	화학물질 및 화학제품 제조업;의약품 제외                                   0321	의료용 물질 및 의약품 제조업                                              0322	고무제품 및 플라스틱제품 제조업                                           0323	비금속 광물제품 제조업                                                    0324	1차 금속 제조업                                                           0325	금속가공제품 제조업;기계 및가구 제외                                      0326	전자부품, 컴퓨터, 영상, 음향 및 통신장비 제조업                           0327	의료, 정밀, 광학기기 및 시계 제조업                                       0328	전기장비 제조업                                                           0329	기타 기계 및 장비 제조업                                                  0330	자동차 및 트레일러 제조업                                                 0331	기타 운송장비 제조업                                                      0332	가구 제조업                                                               0333	기타 제품 제조업                                                          0435	전기, 가스, 증기 및 공기조절 공급업                                       0436	수도사업                                                                  0537	하수, 폐수 및 분뇨 처리업                                                 0538	폐기물 수집운반, 처리 및 원료재생업                                       0539	환경 정화 및 복원업                                                       0641	종합 건설업                                                               0642	전문직별 공사업                                                           0745	자동차 및 부품 판매업                                                     0746	도매 및 상품중개업                                                        0747	소매업; 자동차 제외                                                       0849	육상운송 및 파이프라인 운송업                                             0850	수상 운송업                                                               0851	항공 운송업                                                               0852	창고 및 운송관련 서비스업                                                 0955	숙박업                                                                    0956	음식점 및 주점업                                                          1058	출판업                                                                    1059	영상·오디오 기록물 제작 및 배급업                                        1060	방송업                                                                    1061	통신업                                                                    1062	컴퓨터 프로그래밍, 시스템 통합및 관리업                                   1063	정보서비스업                                                              1164	금융업                                                                    1165	보험 및 연금업                                                            1166	금융 및 보험 관련 서비스업                                                1268	부동산업                                                                  1269	임대업;부동산 제외                                                        1370	연구개발업                                                                1371	전문서비스업                                                              1372	건축기술, 엔지니어링 및 기타과학기술 서비스업                             1373	기타 전문, 과학 및 기술 서비스업                                          1474	사업시설 관리 및 조경 서비스업                                            1475	사업지원 서비스업                                                         1584	공공행정, 국방 및 사회보장 행정                                           1685	교육 서비스업                                                             1786	보건업                                                                    1787	사회복지 서비스업                                                         1890	창작, 예술 및 여가관련 서비스업                                           1891	스포츠 및 오락관련 서비스업                                               1994	협회 및 단체                                                              1995	수리업                                                                    1996	기타 개인 서비스업                                                        2097	가구내 고용활동                                                           2098	달리 분류되지 않은 자가소비를 위한가구의 재화 및 서비스 생산활동          2199	국제 및 외국기관 |
| `idx_bztp_scls_cd_name` | 지수업종소분류코드명 | string | Y | 60 | 표준산업소분류코드 참조 |
| `ocr_no` | OCR번호 | string | Y | 4 |  |
| `crfd_item_yn` | 크라우드펀딩종목여부 | string | Y | 1 |  |
| `elec_scty_yn` | 전자증권여부 | string | Y | 1 |  |
| `issu_istt_cd` | 발행기관코드 | string | Y | 5 |  |
| `etf_chas_erng_rt_dbnb` | ETF추적수익율배수 | string | Y | 19 |  |
| `etf_etn_ivst_heed_item_yn` | ETFETN투자유의종목여부 | string | Y | 1 |  |
| `stln_int_rt_dvsn_cd` | 대주이자율구분코드 | string | Y | 2 |  |
| `frnr_psnl_lmt_rt` | 외국인개인한도비율 | string | Y | 24 |  |
| `lstg_rqsr_issu_istt_cd` | 상장신청인발행기관코드 | string | Y | 5 |  |
| `lstg_rqsr_item_cd` | 상장신청인종목코드 | string | Y | 12 |  |
| `trst_istt_issu_istt_cd` | 신탁기관발행기관코드 | string | Y | 5 |  |
| `cptt_trad_tr_psbl_yn` | NXT 거래종목여부 | string | Y | 1 | NXT 거래가능한 종목은 Y, 그 외 종목은 N |
| `nxt_tr_stop_yn` | NXT 거래정지여부 | string | Y | 1 | NXT 거래종목 중 거래정지가 된 종목은 Y, 그 외 모든 종목은 N |

**Request Example:**
```
{  "PDNO":"000660",  "PRDT_TYPE_CD":"300"  }
```

**Response Example:**
```
{      "output": {          "pdno": "00000A000660",          "prdt_type_cd": "300",          "mket_id_cd": "STK",          "scty_grp_id_cd": "ST",          "excg_dvsn_cd": "02",          "setl_mmdd": "12",          "lstg_stqt": "728002365",          "lstg_cptl_amt": "0",          "cpta": "3657652050000",          "papr": "5000",          "issu_pric": "5000",          "kospi200_item_yn": "Y",          "scts_mket_lstg_dt": "19961226",          "scts_mket_lstg_abol_dt": "",          "kosdaq_mket_lstg_dt": "",          "kosdaq_mket_lstg_abol_dt": "",          "frbd_mket_lstg_dt": "19961226",          "frbd_mket_lstg_abol_dt": "",          "reits_kind_cd": "",          "etf_dvsn_cd": "0",          "oilf_fund_yn": "N",          "idx_bztp_lcls_cd": "002",          "idx_bztp_mcls_cd": "013",          "idx_bztp_scls_cd": "013",          "stck_kind_cd": "101",          "mfnd_opng_dt": "",          "mfnd_end_dt": "",          "dpsi_erlm_cncl_dt": "",          "etf_cu_qty": "0",          "prdt_name": "에스케이하이닉스보통주",          "prdt_name120": "에스케이하이닉스보통주",          "prdt_abrv_name": "SK하이닉스",          "std_pdno": "KR7000660001",          "prdt_eng_name": "SK hynix",          "prdt_eng_name120": "SK hynix",          "prdt_eng_abrv_name": "SK hynix",          "dpsi_aptm_erlm_yn": "Y",          "etf_txtn_type_cd": "00",          "etf_type_cd": "",          "lstg_abol_dt": "",          "nwst_odst_dvsn_cd": "1",          "sbst_pric": "115980",          "thco_sbst_pric": "115980",          "thco_sbst_pric_chng_dt": "20240215",          "tr_stop_yn": "N",          "admn_item_yn": "N",          "thdt_clpr": "146800",          "bfdy_clpr": "148700",          "clpr_chng_dt": "20240216",          "std_idst_clsf_cd": "032601",          "std_idst_clsf_cd_name": "반도체 제조업",          "idx_bztp_lcls_cd_name": "시가총액규모대",          "idx_bztp_mcls_cd_name": "전기,전자",          "idx_bztp_scls_cd_name": "전기,전자",          "ocr_no": "1147",          "crfd_item_yn": "N",          "elec_scty_yn": "Y"      },      "rt_cd": "0",      "msg_cd": "KIOK0530",      "msg1": "조회되었습니다                                                                  "  }
```

---
### 100. 예탁원정보(유상증자일정)

| Field | Value |
|---|---|
| Sheet | `예탁원정보(유상증자일정)` |
| Menu | [국내주식] 종목정보 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ksdinfo/paidin-capin` |
| TR_ID (실전) | `HHKDB669100C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CTS` | CTS | string | Y | 17 | 공백 |
| `GB1` | 조회구분 | string | Y | 1 | 1(청약일별), 2(기준일별) |
| `F_DT` | 조회일자From | string | Y | 8 | 일자 ~ |
| `T_DT` | 조회일자To | string | Y | 8 | ~ 일자 |
| `SHT_CD` | 종목코드 | string | Y | 9 | 공백(전체),  특정종목 조회시(종목코드) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `record_date` | 기준일 | string | Y | 8 |  |
| `sht_cd` | 종목코드 | string | Y | 9 |  |
| `isin_name` | 종목명 | string | Y | 40 |  |
| `tot_issue_stk_qty` | 발행주식 | string | Y | 12 |  |
| `issue_stk_qty` | 발행할주식 | string | Y | 12 |  |
| `fix_rate` | 확정배정율 | string | Y | 152 |  |
| `disc_rate` | 할인율 | string | Y | 52 |  |
| `fix_price` | 발행예정가 | string | Y | 8 |  |
| `right_dt` | 권리락일 | string | Y | 8 |  |
| `sub_term_ft` | 청약기간 | string | Y | 8 |  |
| `sub_term` | 청약기간 | string | Y | 23 |  |
| `list_date` | 상장/등록일 | string | Y | 10 |  |
| `stk_kind` | 주식종류 | string | Y | 2 |  |

**Request Example:**
```
cts:  gb1:1  f_dt:20230301  t_dt:20240326  sht_cd:
```

**Response Example:**
```
{      "output1": [          {              "record_date": "20240222",              "sht_cd": "426530",              "isin_name": "메타록",              "tot_issue_stk_qty": "    31000000",              "issue_stk_qty": "      273199",              "fix_rate": " 20.00",              "disc_rate": " 0.00",              "fix_price": "     500",              "right_dt": "20240221",              "sub_term_ft": "20240325",              "sub_term": "2024/03/25 ~ 2024/03/26",              "list_date": "",              "stk_kind": "01"          },          {              "record_date": "20240219",              "sht_cd": "429850",              "isin_name": "애딥",              "tot_issue_stk_qty": "      755400",              "issue_stk_qty": "     1680196",              "fix_rate": "397.14",              "disc_rate": " 0.00",              "fix_price": "     500",              "right_dt": "20240216",              "sub_term_ft": "20240319",              "sub_term": "2024/03/19 ~ 2024/03/20",              "list_date": "",              "stk_kind": "01"          },          {              "record_date": "20240213",              "sht_cd": "321850",              "isin_name": "나이스엘엠에스",              "tot_issue_stk_qty": "    22826013",              "issue_stk_qty": "     5337064",              "fix_rate": " 44.95",              "disc_rate": " 0.00",              "fix_price": "    6000",              "right_dt": "20240208",              "sub_term_ft": "20240318",              "sub_term": "2024/03/18 ~ 2024/03/18",              "list_date": "",              "stk_kind": "01"          },          {              "record_date": "20240216",              "sht_cd": "225340",              "isin_name": "메디셀",              "tot_issue_stk_qty": "    10085593",              "issue_stk_qty": "     1058677",              "fix_rate": " 29.70",              "disc_rate": " 0.00",              "fix_price": "    1000",              "right_dt": "20240215",              "sub_term_ft": "20240314",              "sub_term": "2024/03/14 ~ 2024/03/15",              "list_date": "",              "stk_kind": "01"          },          {              "record_date": "20240131",              "sht_cd": "001440",              "isin_name": "대한전선",              "tot_issue_stk_qty": "   124447300",              "issue_stk_qty": "    62000000",              "fix_rate": " 50.13",              "disc_rate": " 0.00",              "fix_price": "    7460",              "right_dt": "20240130",              "sub_term_ft": "20240311",              "sub_term": "2024/03/11 ~ 2024/03/12",              "list_date": "2024/04/02",              "stk_kind": "01"          },...      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 101. 예탁원정보(주주총회일정)

| Field | Value |
|---|---|
| Sheet | `예탁원정보(주주총회일정)` |
| Menu | [국내주식] 종목정보 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ksdinfo/sharehld-meet` |
| TR_ID (실전) | `HHKDB669111C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CTS` | CTS | string | Y | 17 | 공백 |
| `F_DT` | 조회일자From | string | Y | 8 | 일자 ~ |
| `T_DT` | 조회일자To | string | Y | 8 | ~ 일자 |
| `SHT_CD` | 종목코드 | string | Y | 9 | 공백: 전체,  특정종목 조회시 : 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `record_date` | 기준일 | string | Y | 8 |  |
| `sht_cd` | 종목코드 | string | Y | 9 |  |
| `isin_name` | 종목명 | string | Y | 40 |  |
| `gen_meet_dt` | 주총일자 | string | Y | 10 |  |
| `gen_meet_type` | 주총사유 | string | Y | 8 |  |
| `agenda` | 주총의안 | string | Y | 71 |  |
| `vote_tot_qty` | 의결권주식총수 | string | Y | 12 |  |

**Request Example:**
```
cts:  f_dt:20230101  t_dt:20240326  sht_cd:
```

**Response Example:**
```
{      "output1": [          {              "record_date": "20240322",              "sht_cd": "388370",              "isin_name": "(주)우앤컴퍼니",              "gen_meet_dt": "2024/04/18",              "gen_meet_type": "임시총회",              "agenda": "정관변경",              "vote_tot_qty": "      959800"          },          {              "record_date": "20240322",              "sht_cd": "388370",              "isin_name": "(주)우앤컴퍼니",              "gen_meet_dt": "2024/04/18",              "gen_meet_type": "임시총회",              "agenda": "이사선임",              "vote_tot_qty": "      959800"          },          {              "record_date": "20240321",              "sht_cd": "323530",              "isin_name": "(주)아이월드제약",              "gen_meet_dt": "2024/04/25",              "gen_meet_type": "임시총회",              "agenda": "사내이사 선임",              "vote_tot_qty": "    25721999"          },          {              "record_date": "20240321",              "sht_cd": "323530",              "isin_name": "(주)아이월드제약",              "gen_meet_dt": "2024/04/25",              "gen_meet_type": "임시총회",              "agenda": "정관변경",              "vote_tot_qty": "    25721999"          },          {              "record_date": "20240321",              "sht_cd": "323530",              "isin_name": "(주)아이월드제약",              "gen_meet_dt": "2024/04/25",              "gen_meet_type": "임시총회",              "agenda": "사외이사 선임",              "vote_tot_qty": "    25721999"          },          {              "record_date": "20240315",              "sht_cd": "091090",              "isin_name": "세원이앤씨(주)",              "gen_meet_dt": "2024/04/12",              "gen_meet_type": "임시총회",              "agenda": "이사해임(주주제안)",              "vote_tot_qty": "    52754723"          },          {              "record_date": "20240315",              "sht_cd": "091090",              "isin_name": "세원이앤씨(주)",              "gen_meet_dt": "2024/04/12",              "gen_meet_type": "임시총회",              "agenda": "정관변경(주주제안)",              "vote_tot_qty": "    52754723"          },          {              "record_date": "20240315",              "sht_cd": "091090",              "isin_name": "세원이앤씨(주)",              "gen_meet_dt": "2024/04/12",              "gen_meet_type": "임시총회",              "agenda": "이사해임(주주제안)",              "vote_tot_qty": "    52754723"          },          {              "record_date": "20240315",              "sht_cd": "091090",              "isin_name": "세원이앤씨(주)",              "gen_meet_dt": "2024/04/12",              "gen_meet_type": "임시총회",              "agenda": "사외이사 선임(주주제안)",              "vote_tot_qty": "    52754723"          },          {              "record_date": "20240315",              "sht_cd": "091090",              "isin_name": "세원이앤씨(주)",              "gen_meet_dt": "2024/04/12",              "gen_meet_type": "임시총회",              "agenda": "사내이사 선임(주주제안)",              "vote_tot_qty": "    52754723"          },          {              "record_date": "20240
```

---
### 102. 국내주식 성장성비율

| Field | Value |
|---|---|
| Sheet | `국내주식 성장성비율` |
| Menu | [국내주식] 종목정보 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/finance/growth-ratio` |
| TR_ID (실전) | `FHKST66430800` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `fid_input_iscd` | 입력 종목코드 | string | Y | 12 | ex : 000660 |
| `fid_div_cls_code` | 분류 구분 코드 | string | Y | 2 | 0: 년, 1: 분기 |
| `fid_cond_mrkt_div_code` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (주식 J) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stac_yymm` | 결산 년월 | string | Y | 6 |  |
| `grs` | 매출액 증가율 | string | Y | 124 |  |
| `bsop_prfi_inrt` | 영업 이익 증가율 | string | Y | 124 |  |
| `equt_inrt` | 자기자본 증가율 | string | Y | 92 |  |
| `totl_aset_inrt` | 총자산 증가율 | string | Y | 92 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"J",  "fid_input_iscd":"005930",  "fid_div_cls_code":"1"  }
```

**Response Example:**
```
{      "output": [          {              "stac_yymm": "202312",              "grs": "-14.33",              "bsop_prfi_inrt": "-84.86",              "equt_inrt": "2.52",              "totl_aset_inrt": "1.67"          },          {              "stac_yymm": "202309",              "grs": "-17.52",              "bsop_prfi_inrt": "-90.42",              "equt_inrt": "5.50",              "totl_aset_inrt": "-3.36"          },          {              "stac_yymm": "202306",              "grs": "-20.15",              "bsop_prfi_inrt": "-95.36",              "equt_inrt": "9.47",              "totl_aset_inrt": "-0.01"          },          {              "stac_yymm": "202303",              "grs": "-18.05",              "bsop_prfi_inrt": "-95.47",              "equt_inrt": "14.12",              "totl_aset_inrt": "3.36"          },          {              "stac_yymm": "202212",              "grs": "8.09",              "bsop_prfi_inrt": "-15.99",              "equt_inrt": "16.35",              "totl_aset_inrt": "5.11"          },          {              "stac_yymm": "202209",              "grs": "14.15",              "bsop_prfi_inrt": "3.45",              "equt_inrt": "16.22",              "totl_aset_inrt": "14.58"          },          {              "stac_yymm": "202206",              "grs": "20.09",              "bsop_prfi_inrt": "28.56",              "equt_inrt": "16.15",              "totl_aset_inrt": "16.44"          },          {              "stac_yymm": "202203",              "grs": "18.95",              "bsop_prfi_inrt": "50.50",              "equt_inrt": "14.96",              "totl_aset_inrt": "11.84"          },          {              "stac_yymm": "202112",              "grs": "18.07",              "bsop_prfi_inrt": "43.45",              "equt_inrt": "10.49",              "totl_aset_inrt": "12.79"          },          {              "stac_yymm": "202109",              "grs": "15.85",              "bsop_prfi_inrt": "40.15",              "equt_inrt": "7.47",              "totl_aset_inrt": "9.22"          },          {              "stac_yymm": "202106",              "grs": "19.18",              "bsop_prfi_inrt": "50.41",              "equt_inrt": "4.64",              "totl_aset_inrt": "7.49"          },          {              "stac_yymm": "202103",              "grs": "18.19",              "bsop_prfi_inrt": "45.53",              "equt_inrt": "2.96",              "totl_aset_inrt": "9.89"          },          {              "stac_yymm": "202012",              "grs": "2.78",              "bsop_prfi_inrt": "29.62",              "equt_inrt": "4.97",              "totl_aset_inrt": "7.28"          },          {              "stac_yymm": "202009",              "grs": "2.78",              "bsop_prfi_inrt": "30.76",              "equt_inrt": "4.82",              "totl_aset_inrt": "6.34"          },          {              "stac_yymm": "202006",              "grs": "-0.20",              "bsop_prfi_inrt": "13.74",              "equt_inrt": "4.68",              "
```

---
### 103. 국내주식 대차대조표

| Field | Value |
|---|---|
| Sheet | `국내주식 대차대조표` |
| Menu | [국내주식] 종목정보 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/finance/balance-sheet` |
| TR_ID (실전) | `FHKST66430100` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_DIV_CLS_CODE` | 분류 구분 코드 | string | Y | 2 | 0: 년, 1: 분기 |
| `fid_cond_mrkt_div_code` | 조건 시장 분류 코드 | string | Y | 2 | J |
| `fid_input_iscd` | 입력 종목코드 | string | Y | 12 | 000660 : 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stac_yymm` | 결산 년월 | string | Y | 6 |  |
| `cras` | 유동자산 | string | Y | 112 |  |
| `fxas` | 고정자산 | string | Y | 112 |  |
| `total_aset` | 자산총계 | string | Y | 102 |  |
| `flow_lblt` | 유동부채 | string | Y | 112 |  |
| `fix_lblt` | 고정부채 | string | Y | 112 |  |
| `total_lblt` | 부채총계 | string | Y | 102 |  |
| `cpfn` | 자본금 | string | Y | 22 |  |
| `cfp_surp` | 자본 잉여금 | string | Y | 182 | 출력되지 않는 데이터(99.99 로 표시) |
| `prfi_surp` | 이익 잉여금 | string | Y | 182 | 출력되지 않는 데이터(99.99 로 표시) |
| `total_cptl` | 자본총계 | string | Y | 102 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"J",  "fid_input_iscd":"005930",  "fid_div_cls_code":"1"  }
```

**Response Example:**
```
{      "output": [          {              "stac_yymm": "202312",              "cras": "1959366.00",              "fxas": "2599694.00",              "total_aset": "4559060.00",              "flow_lblt": "757195.00",              "fix_lblt": "165087.00",              "total_lblt": "922281.00",              "cpfn": "8975",              "cfp_surp": "99.99",              "prfi_surp": "99.99",              "total_cptl": "3636779.00"          },          {              "stac_yymm": "202309",              "cras": "2064386.00",              "fxas": "2480278.00",              "total_aset": "4544664.00",              "flow_lblt": "736252.00",              "fix_lblt": "169486.00",              "total_lblt": "905738.00",              "cpfn": "8975",              "cfp_surp": "99.99",              "prfi_surp": "99.99",              "total_cptl": "3638926.00"          },          {              "stac_yymm": "202306",              "cras": "2039754.00",              "fxas": "2440252.00",              "total_aset": "4480006.00",              "flow_lblt": "707806.00",              "fix_lblt": "182443.00",              "total_lblt": "890249.00",              "cpfn": "8975",              "cfp_surp": "99.99",              "prfi_surp": "99.99",              "total_cptl": "3589756.00"          },          {              "stac_yymm": "202303",              "cras": "2144421.00",              "fxas": "2396496.00",              "total_aset": "4540918.00",              "flow_lblt": "760574.00",              "fix_lblt": "182349.00",              "total_lblt": "942924.00",              "cpfn": "8975",              "cfp_surp": "99.99",              "prfi_surp": "99.99",              "total_cptl": "3597994.00"          },          {              "stac_yymm": "202212",              "cras": "2184706.00",              "fxas": "2299539.00",              "total_aset": "4484245.00",              "flow_lblt": "783449.00",              "fix_lblt": "153301.00",              "total_lblt": "936749.00",              "cpfn": "8975",              "cfp_surp": "99.99",              "prfi_surp": "99.99",              "total_cptl": "3547496.00"          },          {              "stac_yymm": "202209",              "cras": "2508806.00",              "fxas": "2193978.00",              "total_aset": "4702784.00",              "flow_lblt": "852857.00",              "fix_lblt": "400859.00",              "total_lblt": "1253715.00",              "cpfn": "8975",              "cfp_surp": "99.99",              "prfi_surp": "99.99",              "total_cptl": "3449069.00"          },          {              "stac_yymm": "202206",              "cras": "2362875.00",              "fxas": "2117532.00",              "total_aset": "4480407.00",              "flow_lblt": "833623.00",              "fix_lblt": "367717.00",              "total_lblt": "1201340.00",              "cpfn": "8975",              "cfp_surp": "99.99",              "prfi_surp": "99.99",              "total_cptl": "3279067.00"          },     
```

---
### 104. 예탁원정보(합병_분할일정)

| Field | Value |
|---|---|
| Sheet | `예탁원정보(합병_분할일정)` |
| Menu | [국내주식] 종목정보 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ksdinfo/merger-split` |
| TR_ID (실전) | `HHKDB669104C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CTS` | CTS | string | Y | 17 | 공백 |
| `F_DT` | 조회일자From | string | Y | 8 | 일자 ~ |
| `T_DT` | 조회일자To | string | Y | 8 | ~ 일자 |
| `SHT_CD` | 종목코드 | string | Y | 9 | 공백: 전체,  특정종목 조회시 : 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `record_date` | 기준일 | string | Y | 8 |  |
| `sht_cd` | 종목코드 | string | Y | 9 |  |
| `opp_cust_cd` | 피합병(피분할)회사코드 | string | Y | 5 |  |
| `opp_cust_nm` | 피합병(피분할)회사명 | string | Y | 37 |  |
| `cust_cd` | 합병(분할)회사코드 | string | Y | 5 |  |
| `cust_nm` | 합병(분할)회사명 | string | Y | 37 |  |
| `merge_type` | 합병사유 | string | Y | 8 |  |
| `merge_rate` | 비율 | string | Y | 142 |  |
| `td_stop_dt` | 매매거래정지기간 | string | Y | 23 |  |
| `list_dt` | 상장/등록일 | string | Y | 9 |  |
| `odd_amt_pay_dt` | 단주대금지급일 | string | Y | 10 |  |
| `tot_issue_stk_qty` | 발행주식 | string | Y | 12 |  |
| `issue_stk_qty` | 발행할주식 | string | Y | 12 |  |
| `seq` | 연번 | string | Y | 3 |  |

**Request Example:**
```
cts:  f_dt:20230301  t_dt:20240326  sht_cd:
```

**Response Example:**
```
{      "output1": [          {              "record_date": "20240311",              "sht_cd": "224020",              "opp_cust_cd": "22402",              "opp_cust_nm": "에스케이씨에스",              "cust_cd": "17735",              "cust_nm": "베셀",              "merge_type": "흡수합병",              "merge_rate": " 0.66",              "td_stop_dt": "2024/03/08 ~ 2024/03/28",              "list_dt": "20240329",              "odd_amt_pay_dt": "2024/04/05",              "tot_issue_stk_qty": "           0",              "issue_stk_qty": "           0",              "seq": "00"          },          {              "record_date": "20240305",              "sht_cd": "397880",              "opp_cust_cd": "39788",              "opp_cust_nm": "교보11호기업인수목적",              "cust_cd": "42057",              "cust_nm": "제이투케이바이오",              "merge_type": "흡수합병",              "merge_rate": " 0.12",              "td_stop_dt": "2024/03/04 ~",              "list_dt": "20240325",              "odd_amt_pay_dt": "2024/04/01",              "tot_issue_stk_qty": "           0",              "issue_stk_qty": "           0",              "seq": "00"          },          {              "record_date": "20240229",              "sht_cd": "210980",              "opp_cust_cd": "21098",              "opp_cust_nm": "에스케이디앤디",              "cust_cd": "47515",              "cust_nm": "에스케이이터닉스",              "merge_type": "회사분할",              "merge_rate": " 1.15",              "td_stop_dt": "2024/02/28 ~ 2024/03/28",              "list_dt": "20240329",              "odd_amt_pay_dt": "2024/04/05",              "tot_issue_stk_qty": "           0",              "issue_stk_qty": "           0",              "seq": "00"          },          {              "record_date": "20240229",              "sht_cd": "21098L",              "opp_cust_cd": "21098",              "opp_cust_nm": "에스케이디앤디",              "cust_cd": "21098",              "cust_nm": "에스케이디앤디",              "merge_type": "회사분할",              "merge_rate": " 0.77",              "td_stop_dt": "2024/02/28 ~ 2024/03/28",              "list_dt": "20240329",              "odd_amt_pay_dt": "2024/04/05",              "tot_issue_stk_qty": "           0",              "issue_stk_qty": "           0",              "seq": "00"          },          {              "record_date": "20240228",              "sht_cd": "072700",              "opp_cust_cd": "07270",              "opp_cust_nm": "더존홀딩스",              "cust_cd": "01251",              "cust_nm": "더존비즈온",              "merge_type": "흡수합병",              "merge_rate": "834.0",              "td_stop_dt": "2024/02/27 ~ 2024/03/21",              "list_dt": "20240322",              "odd_amt_pay_dt": "2024/03/29",              "tot_issue_stk_qty": "           0",              "issue_stk_qty": "           0",              "seq": "00"          },          {              "record_date": "20240228",              "sht_cd": "452240",              "opp_cust_cd": "45224",              "opp_cust_nm": "뉴온",     
```

---
### 105. 국내주식 종목추정실적

| Field | Value |
|---|---|
| Sheet | `국내주식 종목추정실적` |
| Menu | [국내주식] 종목정보 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/estimate-perform` |
| TR_ID (실전) | `HHKST668300C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `SHT_CD` | 종목코드 | string | Y | 2 | ex) 265520 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `sht_cd` | ELW단축종목코드 | string | Y | 9 |  |
| `item_kor_nm` | HTS한글종목명 | string | Y | 40 |  |
| `name1` | ELW현재가 | string | Y | 10 |  |
| `name2` | 전일대비 | string | Y | 10 |  |
| `estdate` | 전일대비부호 | string | Y | 1 |  |
| `rcmd_name` | 전일대비율 | string | Y | 82 |  |
| `capital` | 누적거래량 | string | Y | 18 |  |
| `forn_item_lmtrt` | 행사가 | string | Y | 112 |  |
| `output2` | 응답상세 | object array | Y |  | '(추정손익계산서-6개 array)    매출액, 매출액증감율,    영업이익, 영업이익증감율,    순이익, 순이익증감율,' |
| `data1` | DATA1 | string | Y | 15 | 결산연월(outblock4) 참조 |
| `data2` | DATA2 | string | Y | 15 | 결산연월(outblock4) 참조 |
| `data3` | DATA3 | string | Y | 15 | 결산연월(outblock4) 참조 |
| `data4` | DATA4 | string | Y | 15 | 결산연월(outblock4) 참조 |
| `data5` | DATA5 | string | Y | 15 | 결산연월(outblock4) 참조 |
| `output3` | 응답상세 | object array | Y |  | '(투자지표-8개 array)    EBITDA(십억원), EPS(원),     EPS 증감율(0.1%),  PER(배, 0.1%),     EV/EBITDA(배, 0.1), ROE(0.1%),    부채비율(0.1%), 이자보상배율(0.1%)' |
| `data1` | DATA1 | string | Y | 15 | 결산연월(outblock4) 참조 |
| `data2` | DATA2 | string | Y | 15 | 결산연월(outblock4) 참조 |
| `data3` | DATA3 | string | Y | 15 | 결산연월(outblock4) 참조 |
| `data4` | DATA4 | string | Y | 15 | 결산연월(outblock4) 참조 |
| `data5` | DATA5 | string | Y | 15 | 결산연월(outblock4) 참조 |
| `output4` | 응답상세 | object array | Y |  | array |
| `dt` | 결산년월 | string | Y | 8 | DATA1 ~5 결산월 정보 |

**Request Example:**
```
SHT_CD:005930
```

**Response Example:**
```
{      "output1": {          "sht_cd": "A005930",          "item_kor_nm": "삼성전자",          "name1": "김한국",          "name2": "",          "estdate": "20240109",          "rcmd_name": "매수",          "capital": "8975.0",          "forn_item_lmtrt": "0.00"      },      "output2": [          {              "data1": "2796048.0",              "data2": "3022314.0",              "data3": "2581509.0",              "data4": "3048945.0",              "data5": "3295675.0"          },          {              "data1": "181.0",              "data2": "81.0",              "data3": "-146.0",              "data4": "181.0",              "data5": "81.0"          },          {              "data1": "516339.0",              "data2": "433766.0",              "data3": "65405.0",              "data4": "330172.0",              "data5": "555410.0"          },          {              "data1": "435.0",              "data2": "-160.0",              "data3": "-849.0",              "data4": "4048.0",              "data5": "682.0"          },          {              "data1": "392438.0",              "data2": "547300.0",              "data3": "106144.0",              "data4": "253332.0",              "data5": "422055.0"          },          {              "data1": "504.0",              "data2": "395.0",              "data3": "-806.0",              "data4": "1387.0",              "data5": "666.0"          }      ],      "output3": [          {              "data1": "858812.0",              "data2": "824843.0",              "data3": "483199.0",              "data4": "792602.0",              "data5": "1043367.0"          },          {              "data1": "57770.0",              "data2": "80570.0",              "data3": "15609.0",              "data4": "36983.0",              "data5": "61483.0"          },          {              "data1": "504.0",              "data2": "395.0",              "data3": "-806.0",              "data4": "1369.0",              "data5": "662.0"          },          {              "data1": "136.0",              "data2": "69.0",              "data3": "503.0",              "data4": "207.0",              "data5": "124.0"          },          {              "data1": "50.0",              "data2": "34.0",              "data3": "95.0",              "data4": "53.0",              "data5": "39.0"          },          {              "data1": "139.0",              "data2": "171.0",              "data3": "31.0",              "data4": "70.0",              "data5": "109.0"          },          {              "data1": "399.0",              "data2": "264.0",              "data3": "255.0",              "data4": "226.0",              "data5": "163.0"          },          {              "data1": "1197.0",              "data2": "568.0",              "data3": "58.0",              "data4": "232.0",              "data5": "655.0"          }      ],      "output4": [          {              "dt": "2021.12"          },          {              "dt": "2022.12"          },          {     
```

---
### 106. 국내주식 기타주요비율

| Field | Value |
|---|---|
| Sheet | `국내주식 기타주요비율` |
| Menu | [국내주식] 종목정보 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/finance/other-major-ratios` |
| TR_ID (실전) | `FHKST66430500` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `fid_input_iscd` | 입력 종목코드 | string | Y | 12 | 000660 : 종목코드 |
| `fid_div_cls_code` | 분류 구분 코드 | string | Y | 2 | 0: 년, 1: 분기 |
| `fid_cond_mrkt_div_code` | 조건 시장 분류 코드 | string | Y | 2 | J |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stac_yymm` | 결산 년월 | string | Y | 6 |  |
| `payout_rate` | 배당 성향 | string | Y | 92 | 비정상 출력되는 데이터로 무시 |
| `eva` | EVA | string | Y | 82 |  |
| `ebitda` | EBITDA | string | Y | 82 |  |
| `ev_ebitda` | EV_EBITDA | string | Y | 82 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"J",  "fid_input_iscd":"005930",  "fid_div_cls_code":"1"  }
```

**Response Example:**
```
{      "output": [          {              "stac_yymm": "202309",              "payout_rate": "-0.02",              "eva": "0.00",              "ebitda": "23464.00",              "ev_ebitda": "0.00"          },          {              "stac_yymm": "202306",              "payout_rate": "-0.02",              "eva": "0.00",              "ebitda": "7851.00",              "ev_ebitda": "0.00"          },          {              "stac_yymm": "202303",              "payout_rate": "-0.05",              "eva": "0.00",              "ebitda": "1574.00",              "ev_ebitda": "0.00"          },          {              "stac_yymm": "202212",              "payout_rate": "0.05",              "eva": "-18075.00",              "ebitda": "209609.00",              "ev_ebitda": "3.48"          },          {              "stac_yymm": "202209",              "payout_rate": "0.02",              "eva": "0.00",              "ebitda": "191549.00",              "ev_ebitda": "0.00"          },          {              "stac_yymm": "202206",              "payout_rate": "0.02",              "eva": "0.00",              "ebitda": "139382.00",              "ev_ebitda": "0.00"          },          {              "stac_yymm": "202203",              "payout_rate": "0.06",              "eva": "0.00",              "ebitda": "62600.00",              "ev_ebitda": "0.00"          },          {              "stac_yymm": "202112",              "payout_rate": "0.01",              "eva": "40178.00",              "ebitda": "230671.00",              "ev_ebitda": "4.59"          },          {              "stac_yymm": "202109",              "payout_rate": "0.02",              "eva": "0.00",              "ebitda": "160524.00",              "ev_ebitda": "0.00"          },          {              "stac_yymm": "202106",              "payout_rate": "0.04",              "eva": "0.00",              "ebitda": "91711.00",              "ev_ebitda": "0.00"          },          {              "stac_yymm": "202103",              "payout_rate": "0.12",              "eva": "0.00",              "ebitda": "38610.00",              "ev_ebitda": "0.00"          },          {              "stac_yymm": "202012",              "payout_rate": "0.03",              "eva": "3789.00",              "ebitda": "147848.00",              "ev_ebitda": "6.37"          },          {              "stac_yymm": "202009",              "payout_rate": "0.04",              "eva": "0.00",              "ebitda": "112945.00",              "ev_ebitda": "0.00"          },          {              "stac_yymm": "202006",              "payout_rate": "0.06",              "eva": "0.00",              "ebitda": "75099.00",              "ev_ebitda": "0.00"          },          {              "stac_yymm": "202003",              "payout_rate": "0.19",              "eva": "0.00",              "ebitda": "31351.00",              "ev_ebitda": "0.00"          },          {              "stac_yymm": "201912",              "payout_rate": "0.06",              
```

---
### 107. 프로그램매매 종합현황(시간)

| Field | Value |
|---|---|
| Sheet | `프로그램매매 종합현황(시간)` |
| Menu | [국내주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/comp-program-trade-today` |
| TR_ID (실전) | `FHPPG04600101` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 시장 분류 코드 | string | Y | 2 | KRX : J , NXT : NX, 통합 : UN |
| `FID_MRKT_CLS_CODE` | 시장 구분 코드 | string | Y | 2 | K:코스피, Q:코스닥 |
| `FID_SCTN_CLS_CODE` | 구간 구분 코드 | string | Y | 2 | 공백 입력 |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 공백 입력 |
| `FID_COND_MRKT_DIV_CODE1` | 시장 분류코드1 | string | Y | 2 | 공백 입력 |
| `FID_INPUT_HOUR_1` | 입력 시간1 | string | Y | 10 | 공백 입력 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `bsop_hour` | 영업 시간 | string | Y | 6 |  |
| `arbt_smtn_seln_tr_pbmn` | 차익 합계 매도 거래 대금 | string | Y | 18 |  |
| `arbt_smtm_seln_tr_pbmn_rate` | 차익 합계 매도 거래대금 비율 | string | Y | 72 |  |
| `arbt_smtn_shnu_tr_pbmn` | 차익 합계 매수2 거래 대금 | string | Y | 18 |  |
| `arbt_smtm_shun_tr_pbmn_rate` | 차익합계매수거래대금비율 | string | Y | 72 |  |
| `nabt_smtn_seln_tr_pbmn` | 비차익 합계 매도 거래 대금 | string | Y | 18 |  |
| `nabt_smtm_seln_tr_pbmn_rate` | 비차익 합계 매도 거래대금 비율 | string | Y | 72 |  |
| `nabt_smtn_shnu_tr_pbmn` | 비차익 합계 매수2 거래 대금 | string | Y | 18 |  |
| `nabt_smtm_shun_tr_pbmn_rate` | 비차익합계매수거래대금비율 | string | Y | 72 |  |
| `arbt_smtn_ntby_tr_pbmn` | 차익 합계 순매수 거래 대금 | string | Y | 18 |  |
| `arbt_smtm_ntby_tr_pbmn_rate` | 차익 합계 순매수 거래대금 비율 | string | Y | 72 |  |
| `nabt_smtn_ntby_tr_pbmn` | 비차익 합계 순매수 거래 대금 | string | Y | 18 |  |
| `nabt_smtm_ntby_tr_pbmn_rate` | 비차익 합계 순매수 거래대금 비 | string | Y | 72 |  |
| `whol_smtn_ntby_tr_pbmn` | 전체 합계 순매수 거래 대금 | string | Y | 18 |  |
| `whol_ntby_tr_pbmn_rate` | 전체 순매수 거래대금 비율 | string | Y | 72 |  |
| `bstp_nmix_prpr` | 업종 지수 현재가 | string | Y | 112 |  |
| `bstp_nmix_prdy_vrss` | 업종 지수 전일 대비 | string | Y | 112 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:J  FID_MRKT_CLS_CODE:Q  FID_SCTN_CLS_CODE:1  FID_INPUT_ISCD:  FID_COND_MRKT_DIV_CODE1:  FID_INPUT_HOUR_1:
```

**Response Example:**
```
{      "output": [          {              "bsop_hour": "170000",              "arbt_smtn_seln_tr_pbmn": "63370",              "arbt_smtm_seln_tr_pbmn_rate": "0.58",              "arbt_smtn_shnu_tr_pbmn": "340275",              "arbt_smtm_shun_tr_pbmn_rate": "3.11",              "nabt_smtn_seln_tr_pbmn": "2122439",              "nabt_smtm_seln_tr_pbmn_rate": "19.40",              "nabt_smtn_shnu_tr_pbmn": "2981823",              "nabt_smtm_shun_tr_pbmn_rate": "27.25",              "arbt_smtn_ntby_tr_pbmn": "276905",              "arbt_smtm_ntby_tr_pbmn_rate": "2.53",              "nabt_smtn_ntby_tr_pbmn": "859384",              "nabt_smtm_ntby_tr_pbmn_rate": "7.85",              "whol_smtn_ntby_tr_pbmn": "1136289",              "whol_ntby_tr_pbmn_rate": "10.39"          },          {              "bsop_hour": "165900",              "arbt_smtn_seln_tr_pbmn": "63370",              "arbt_smtm_seln_tr_pbmn_rate": "0.58",              "arbt_smtn_shnu_tr_pbmn": "340275",              "arbt_smtm_shun_tr_pbmn_rate": "3.11",              "nabt_smtn_seln_tr_pbmn": "2122439",              "nabt_smtm_seln_tr_pbmn_rate": "19.40",              "nabt_smtn_shnu_tr_pbmn": "2981818",              "nabt_smtm_shun_tr_pbmn_rate": "27.25",              "arbt_smtn_ntby_tr_pbmn": "276905",              "arbt_smtm_ntby_tr_pbmn_rate": "2.53",              "nabt_smtn_ntby_tr_pbmn": "859379",              "nabt_smtm_ntby_tr_pbmn_rate": "7.85",              "whol_smtn_ntby_tr_pbmn": "1136284",              "whol_ntby_tr_pbmn_rate": "10.39"          },          {              "bsop_hour": "165800",              "arbt_smtn_seln_tr_pbmn": "63370",              "arbt_smtm_seln_tr_pbmn_rate": "0.58",              "arbt_smtn_shnu_tr_pbmn": "340275",              "arbt_smtm_shun_tr_pbmn_rate": "3.11",              "nabt_smtn_seln_tr_pbmn": "2122439",              "nabt_smtm_seln_tr_pbmn_rate": "19.40",              "nabt_smtn_shnu_tr_pbmn": "2981818",              "nabt_smtm_shun_tr_pbmn_rate": "27.25",              "arbt_smtn_ntby_tr_pbmn": "276905",              "arbt_smtm_ntby_tr_pbmn_rate": "2.53",              "nabt_smtn_ntby_tr_pbmn": "859379",              "nabt_smtm_ntby_tr_pbmn_rate": "7.85",              "whol_smtn_ntby_tr_pbmn": "1136284",              "whol_ntby_tr_pbmn_rate": "10.39"          },          {              "bsop_hour": "165700",              "arbt_smtn_seln_tr_pbmn": "63370",              "arbt_smtm_seln_tr_pbmn_rate": "0.58",              "arbt_smtn_shnu_tr_pbmn": "340275",              "arbt_smtm_shun_tr_pbmn_rate": "3.11",              "nabt_smtn_seln_tr_pbmn": "2122439",              "nabt_smtm_seln_tr_pbmn_rate": "19.40",              "nabt_smtn_shnu_tr_pbmn": "2981818",              "nabt_smtm_shun_tr_pbmn_rate": "27.25",              "arbt_smtn_ntby_tr_pbmn": "276905",              "arbt_smtm_ntby_tr_pbmn_rate": "2.53",              "nabt_smtn_ntby_tr_pbmn": "859379",              "nabt_smtm_ntby_tr_pbmn_rate": "7.85",              "whol_smtn_ntby_t
```

---
### 108. 국내주식 신용잔고 일별추이

| Field | Value |
|---|---|
| Sheet | `국내주식 신용잔고 일별추이` |
| Menu | [국내주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/daily-credit-balance` |
| TR_ID (실전) | `FHPST04760000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `fid_cond_mrkt_div_code` | 시장 분류 코드 | string | Y | 2 | 시장구분코드 (주식 J) |
| `fid_cond_scr_div_code` | 화면 분류 코드 | string | Y | 5 | Unique key(20476) |
| `fid_input_iscd` | 종목코드 | string | Y | 12 | 종목코드 (ex 005930) |
| `fid_input_date_1` | 결제일자 | string | Y | 10 | 결제일자 (ex 20240313) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `deal_date` | 매매 일자 | string | Y | 8 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `stlm_date` | 결제 일자 | string | Y | 8 |  |
| `whol_loan_new_stcn` | 전체 융자 신규 주수 | string | Y | 18 | 단위: 주 |
| `whol_loan_rdmp_stcn` | 전체 융자 상환 주수 | string | Y | 18 | 단위: 주 |
| `whol_loan_rmnd_stcn` | 전체 융자 잔고 주수 | string | Y | 18 | 단위: 주 |
| `whol_loan_new_amt` | 전체 융자 신규 금액 | string | Y | 18 | 단위: 만원 |
| `whol_loan_rdmp_amt` | 전체 융자 상환 금액 | string | Y | 18 | 단위: 만원 |
| `whol_loan_rmnd_amt` | 전체 융자 잔고 금액 | string | Y | 18 | 단위: 만원 |
| `whol_loan_rmnd_rate` | 전체 융자 잔고 비율 | string | Y | 84 |  |
| `whol_loan_gvrt` | 전체 융자 공여율 | string | Y | 82 |  |
| `whol_stln_new_stcn` | 전체 대주 신규 주수 | string | Y | 18 | 단위: 주 |
| `whol_stln_rdmp_stcn` | 전체 대주 상환 주수 | string | Y | 18 | 단위: 주 |
| `whol_stln_rmnd_stcn` | 전체 대주 잔고 주수 | string | Y | 18 | 단위: 주 |
| `whol_stln_new_amt` | 전체 대주 신규 금액 | string | Y | 18 | 단위: 만원 |
| `whol_stln_rdmp_amt` | 전체 대주 상환 금액 | string | Y | 18 | 단위: 만원 |
| `whol_stln_rmnd_amt` | 전체 대주 잔고 금액 | string | Y | 18 | 단위: 만원 |
| `whol_stln_rmnd_rate` | 전체 대주 잔고 비율 | string | Y | 84 |  |
| `whol_stln_gvrt` | 전체 대주 공여율 | string | Y | 82 |  |
| `stck_oprc` | 주식 시가2 | string | Y | 10 |  |
| `stck_hgpr` | 주식 최고가 | string | Y | 10 |  |
| `stck_lwpr` | 주식 최저가 | string | Y | 10 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"J",  "fid_cond_scr_div_code":"20476",  "fid_input_iscd":"005930",  "fid_input_date_1":"20240315"  }
```

**Response Example:**
```
{      "output": [          {              "deal_date": "20240313",              "stck_prpr": "74100",              "prdy_vrss_sign": "2",              "prdy_vrss": "800",              "prdy_ctrt": "1.09",              "acml_vol": "15243134",              "stlm_date": "20240315",              "whol_loan_new_stcn": "253817",              "whol_loan_rdmp_stcn": "603451",              "whol_loan_rmnd_stcn": "7155720",              "whol_loan_new_amt": "1678904",              "whol_loan_rdmp_amt": "3982732",              "whol_loan_rmnd_amt": "47321639",              "whol_loan_rmnd_rate": "0.11",              "whol_loan_gvrt": "1.65",              "whol_stln_new_stcn": "0",              "whol_stln_rdmp_stcn": "0",              "whol_stln_rmnd_stcn": "6861",              "whol_stln_new_amt": "0",              "whol_stln_rdmp_amt": "0",              "whol_stln_rmnd_amt": "43104",              "whol_stln_rmnd_rate": "0.00",              "whol_stln_gvrt": "0.00",              "stck_oprc": "73700",              "stck_hgpr": "74100",              "stck_lwpr": "73500"          },          {              "deal_date": "20240312",              "stck_prpr": "73300",              "prdy_vrss_sign": "2",              "prdy_vrss": "900",              "prdy_ctrt": "1.24",              "acml_vol": "13011654",              "stlm_date": "20240314",              "whol_loan_new_stcn": "357971",              "whol_loan_rdmp_stcn": "429002",              "whol_loan_rmnd_stcn": "7507526",              "whol_loan_new_amt": "2370294",              "whol_loan_rdmp_amt": "2871401",              "whol_loan_rmnd_amt": "49639923",              "whol_loan_rmnd_rate": "0.12",              "whol_loan_gvrt": "2.74",              "whol_stln_new_stcn": "0",              "whol_stln_rdmp_stcn": "0",              "whol_stln_rmnd_stcn": "6861",              "whol_stln_new_amt": "0",              "whol_stln_rdmp_amt": "0",              "whol_stln_rmnd_amt": "43104",              "whol_stln_rmnd_rate": "0.00",              "whol_stln_gvrt": "0.00",              "stck_oprc": "72600",              "stck_hgpr": "73500",              "stck_lwpr": "72100"          },          {              "deal_date": "20240311",              "stck_prpr": "72400",              "prdy_vrss_sign": "5",              "prdy_vrss": "-900",              "prdy_ctrt": "-1.23",              "acml_vol": "9740504",              "stlm_date": "20240313",              "whol_loan_new_stcn": "395234",              "whol_loan_rdmp_stcn": "242330",              "whol_loan_rmnd_stcn": "7586197",              "whol_loan_new_amt": "2579480",              "whol_loan_rdmp_amt": "1479272",              "whol_loan_rmnd_amt": "50194590",              "whol_loan_rmnd_rate": "0.12",              "whol_loan_gvrt": "4.05",              "whol_stln_new_stcn": "0",              "whol_stln_rdmp_stcn": "0",              "whol_stln_rmnd_stcn": "6861",              "whol_stln_new_amt": "0",              "whol_stln_rdmp_amt": "0",              "whol_
```

---
### 109. 시장별 투자자매매동향(일별)

| Field | Value |
|---|---|
| Sheet | `시장별 투자자매매동향(일별)` |
| Menu | [국내주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/inquire-investor-daily-by-market` |
| TR_ID (실전) | `FHPTJ04040000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (업종 U) |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 코스피, 코스닥 : 업종분류코드 (종목정보파일 - 업종코드 참조) |
| `FID_INPUT_DATE_1` | 입력 날짜1 | string | Y | 10 | ex. 20240517 |
| `FID_INPUT_ISCD_1` | 입력 종목코드 | string | Y | 12 | 코스피(KSP), 코스닥(KSQ) |
| `FID_INPUT_DATE_2` | 입력 날짜2 | string | Y | 10 | 입력 날짜1과 동일날짜 입력 |
| `FID_INPUT_ISCD_2` | 하위 분류코드 | string | Y | 10 | 코스피, 코스닥 : 업종분류코드 (종목정보파일 - 업종코드 참조) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stck_bsop_date` | 주식 영업 일자 | string | Y | 8 |  |
| `bstp_nmix_prpr` | 업종 지수 현재가 | string | Y | 112 |  |
| `bstp_nmix_prdy_vrss` | 업종 지수 전일 대비 | string | Y | 112 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `bstp_nmix_prdy_ctrt` | 업종 지수 전일 대비율 | string | Y | 82 |  |
| `bstp_nmix_oprc` | 업종 지수 시가2 | string | Y | 112 |  |
| `bstp_nmix_hgpr` | 업종 지수 최고가 | string | Y | 112 |  |
| `bstp_nmix_lwpr` | 업종 지수 최저가 | string | Y | 112 |  |
| `stck_prdy_clpr` | 주식 전일 종가 | string | Y | 10 |  |
| `frgn_ntby_qty` | 외국인 순매수 수량 | string | Y | 12 |  |
| `frgn_reg_ntby_qty` | 외국인 등록 순매수 수량 | string | Y | 18 |  |
| `frgn_nreg_ntby_qty` | 외국인 비등록 순매수 수량 | string | Y | 18 |  |
| `prsn_ntby_qty` | 개인 순매수 수량 | string | Y | 12 |  |
| `orgn_ntby_qty` | 기관계 순매수 수량 | string | Y | 18 |  |
| `scrt_ntby_qty` | 증권 순매수 수량 | string | Y | 12 |  |
| `ivtr_ntby_qty` | 투자신탁 순매수 수량 | string | Y | 12 |  |
| `pe_fund_ntby_vol` | 사모 펀드 순매수 거래량 | string | Y | 18 |  |
| `bank_ntby_qty` | 은행 순매수 수량 | string | Y | 12 |  |
| `insu_ntby_qty` | 보험 순매수 수량 | string | Y | 12 |  |
| `mrbn_ntby_qty` | 종금 순매수 수량 | string | Y | 12 |  |
| `fund_ntby_qty` | 기금 순매수 수량 | string | Y | 12 |  |
| `etc_ntby_qty` | 기타 순매수 수량 | string | Y | 12 |  |
| `etc_orgt_ntby_vol` | 기타 단체 순매수 거래량 | string | Y | 18 |  |
| `etc_corp_ntby_vol` | 기타 법인 순매수 거래량 | string | Y | 18 |  |
| `frgn_ntby_tr_pbmn` | 외국인 순매수 거래 대금 | string | Y | 18 |  |
| `frgn_reg_ntby_pbmn` | 외국인 등록 순매수 대금 | string | Y | 18 |  |
| `frgn_nreg_ntby_pbmn` | 외국인 비등록 순매수 대금 | string | Y | 18 |  |
| `prsn_ntby_tr_pbmn` | 개인 순매수 거래 대금 | string | Y | 18 |  |
| `orgn_ntby_tr_pbmn` | 기관계 순매수 거래 대금 | string | Y | 18 |  |
| `scrt_ntby_tr_pbmn` | 증권 순매수 거래 대금 | string | Y | 18 |  |
| `ivtr_ntby_tr_pbmn` | 투자신탁 순매수 거래 대금 | string | Y | 18 |  |
| `pe_fund_ntby_tr_pbmn` | 사모 펀드 순매수 거래 대금 | string | Y | 18 |  |
| `bank_ntby_tr_pbmn` | 은행 순매수 거래 대금 | string | Y | 18 |  |
| `insu_ntby_tr_pbmn` | 보험 순매수 거래 대금 | string | Y | 18 |  |
| `mrbn_ntby_tr_pbmn` | 종금 순매수 거래 대금 | string | Y | 18 |  |
| `fund_ntby_tr_pbmn` | 기금 순매수 거래 대금 | string | Y | 18 |  |
| `etc_ntby_tr_pbmn` | 기타 순매수 거래 대금 | string | Y | 18 |  |
| `etc_orgt_ntby_tr_pbmn` | 기타 단체 순매수 거래 대금 | string | Y | 18 |  |
| `etc_corp_ntby_tr_pbmn` | 기타 법인 순매수 거래 대금 | string | Y | 18 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:U  FID_INPUT_ISCD:0001  FID_INPUT_DATE_1:20240517  FID_INPUT_ISCD_1:KSP
```

**Response Example:**
```
{      "output": [          {              "stck_bsop_date": "20240517",              "bstp_nmix_prpr": "2724.62",              "bstp_nmix_prdy_vrss": "-28.38",              "prdy_vrss_sign": "5",              "bstp_nmix_prdy_ctrt": "-1.03",              "bstp_nmix_oprc": "2751.47",              "bstp_nmix_hgpr": "2752.17",              "bstp_nmix_lwpr": "2724.62",              "stck_prdy_clpr": "2753.00",              "frgn_ntby_qty": "-18565",              "frgn_reg_ntby_qty": "-18009",              "frgn_nreg_ntby_qty": "-557",              "prsn_ntby_qty": "22524",              "orgn_ntby_qty": "-4738",              "scrt_ntby_qty": "-1148",              "ivtr_ntby_qty": "-609",              "pe_fund_ntby_vol": "-431",              "bank_ntby_qty": "103",              "insu_ntby_qty": "-156",              "mrbn_ntby_qty": "-175",              "fund_ntby_qty": "-2322",              "etc_ntby_qty": "779",              "etc_orgt_ntby_vol": "0",              "etc_corp_ntby_vol": "779",              "frgn_ntby_tr_pbmn": "-597490",              "frgn_reg_ntby_pbmn": "-597676",              "frgn_nreg_ntby_pbmn": "186",              "prsn_ntby_tr_pbmn": "720787",              "orgn_ntby_tr_pbmn": "-150685",              "scrt_ntby_tr_pbmn": "-18893",              "ivtr_ntby_tr_pbmn": "-7246",              "pe_fund_ntby_tr_pbmn": "-25668",              "bank_ntby_tr_pbmn": "3326",              "insu_ntby_tr_pbmn": "-13791",              "mrbn_ntby_tr_pbmn": "-2742",              "fund_ntby_tr_pbmn": "-85671",              "etc_ntby_tr_pbmn": "27388",              "etc_orgt_ntby_tr_pbmn": "0",              "etc_corp_ntby_tr_pbmn": "27388"          },          {              "stck_bsop_date": "20240516",              "bstp_nmix_prpr": "2753.00",              "bstp_nmix_prdy_vrss": "22.66",              "prdy_vrss_sign": "2",              "bstp_nmix_prdy_ctrt": "0.83",              "bstp_nmix_oprc": "2770.27",              "bstp_nmix_hgpr": "2773.46",              "bstp_nmix_lwpr": "2748.22",              "stck_prdy_clpr": "2730.34",              "frgn_ntby_qty": "5326",              "frgn_reg_ntby_qty": "5287",              "frgn_nreg_ntby_qty": "38",              "prsn_ntby_qty": "-14059",              "orgn_ntby_qty": "8886",              "scrt_ntby_qty": "11036",              "ivtr_ntby_qty": "359",              "pe_fund_ntby_vol": "850",              "bank_ntby_qty": "41",              "insu_ntby_qty": "-989",              "mrbn_ntby_qty": "-341",              "fund_ntby_qty": "-2070",              "etc_ntby_qty": "-153",              "etc_orgt_ntby_vol": "0",              "etc_corp_ntby_vol": "-153",              "frgn_ntby_tr_pbmn": "425869",              "frgn_reg_ntby_pbmn": "425686",              "frgn_nreg_ntby_pbmn": "183",              "prsn_ntby_tr_pbmn": "-964779",              "orgn_ntby_tr_pbmn": "593789",              "scrt_ntby_tr_pbmn": "680881",              "ivtr_ntby_tr_pbmn": "20139",              "pe_fund_ntby_tr_pbmn": "11277",
```

---
### 110. 국내주식 공매도 일별추이

| Field | Value |
|---|---|
| Sheet | `국내주식 공매도 일별추이` |
| Menu | [국내주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/daily-short-sale` |
| TR_ID (실전) | `FHPST04830000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_INPUT_DATE_2` | 입력 날짜2 | string | Y | 10 | ~ 누적 |
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (주식 J) |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 종목코드 |
| `FID_INPUT_DATE_1` | 입력 날짜1 | string | Y | 10 | 공백시 전체 (기간 ~) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `prdy_vol` | 전일 거래량 | string | Y | 18 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `stck_bsop_date` | 주식 영업 일자 | string | Y | 8 |  |
| `stck_clpr` | 주식 종가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `stnd_vol_smtn` | 기준 거래량 합계 | string | Y | 18 |  |
| `ssts_cntg_qty` | 공매도 체결 수량 | string | Y | 12 |  |
| `ssts_vol_rlim` | 공매도 거래량 비중 | string | Y | 62 |  |
| `acml_ssts_cntg_qty` | 누적 공매도 체결 수량 | string | Y | 13 |  |
| `acml_ssts_cntg_qty_rlim` | 누적 공매도 체결 수량 비중 | string | Y | 72 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |
| `stnd_tr_pbmn_smtn` | 기준 거래대금 합계 | string | Y | 18 |  |
| `ssts_tr_pbmn` | 공매도 거래 대금 | string | Y | 18 |  |
| `ssts_tr_pbmn_rlim` | 공매도 거래대금 비중 | string | Y | 62 |  |
| `acml_ssts_tr_pbmn` | 누적 공매도 거래 대금 | string | Y | 19 |  |
| `acml_ssts_tr_pbmn_rlim` | 누적 공매도 거래 대금 비중 | string | Y | 72 |  |
| `stck_oprc` | 주식 시가2 | string | Y | 10 |  |
| `stck_hgpr` | 주식 최고가 | string | Y | 10 |  |
| `stck_lwpr` | 주식 최저가 | string | Y | 10 |  |
| `avrg_prc` | 평균가격 | string | Y | 11 |  |

---
### 111. 종목별 투자자매매동향(일별)

| Field | Value |
|---|---|
| Sheet | `종목별 투자자매매동향(일별)` |
| Menu | [국내주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/investor-trade-by-stock-daily` |
| TR_ID (실전) | `FHPTJ04160001` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | J:KRX, NX:NXT, UN:통합 |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 종목번호 (6자리) |
| `FID_INPUT_DATE_1` | 입력 날짜1 | string | Y | 10 | 입력 날짜(20250812) (해당일 조회는 장 종료 후 정상 조회 가능) |
| `FID_ORG_ADJ_PRC` | 수정주가 원주가 가격 | string | Y | 2 | 공란 입력 |
| `FID_ETC_CLS_CODE` | 기타 구분 코드 | string | Y | 2 | "1" 입력 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `prdy_vol` | 전일 거래량 | string | Y | 18 |  |
| `rprs_mrkt_kor_name` | 대표 시장 한글 명 | string | Y | 40 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `stck_bsop_date` | 주식 영업 일자 | string | Y | 8 |  |
| `stck_clpr` | 주식 종가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 | 단위 : 주 |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 | 단위 : 백만원 |
| `stck_oprc` | 주식 시가2 | string | Y | 10 |  |
| `stck_hgpr` | 주식 최고가 | string | Y | 10 |  |
| `stck_lwpr` | 주식 최저가 | string | Y | 10 |  |
| `frgn_ntby_qty` | 외국인 순매수 수량 | string | Y | 12 | 단위 : 주 |
| `frgn_reg_ntby_qty` | 외국인 등록 순매수 수량 | string | Y | 18 |  |
| `frgn_nreg_ntby_qty` | 외국인 비등록 순매수 수량 | string | Y | 18 |  |
| `prsn_ntby_qty` | 개인 순매수 수량 | string | Y | 12 |  |
| `orgn_ntby_qty` | 기관계 순매수 수량 | string | Y | 18 |  |
| `scrt_ntby_qty` | 증권 순매수 수량 | string | Y | 12 |  |
| `ivtr_ntby_qty` | 투자신탁 순매수 수량 | string | Y | 12 |  |
| `pe_fund_ntby_vol` | 사모 펀드 순매수 거래량 | string | Y | 18 |  |
| `bank_ntby_qty` | 은행 순매수 수량 | string | Y | 12 |  |
| `insu_ntby_qty` | 보험 순매수 수량 | string | Y | 12 |  |
| `mrbn_ntby_qty` | 종금 순매수 수량 | string | Y | 12 |  |
| `fund_ntby_qty` | 기금 순매수 수량 | string | Y | 12 |  |
| `etc_ntby_qty` | 기타 순매수 수량 | string | Y | 12 |  |
| `etc_corp_ntby_vol` | 기타 법인 순매수 거래량 | string | Y | 18 |  |
| `etc_orgt_ntby_vol` | 기타 단체 순매수 거래량 | string | Y | 18 |  |
| `frgn_reg_ntby_pbmn` | 외국인 등록 순매수 대금 | string | Y | 18 | 단위 : 백만원 |
| `frgn_ntby_tr_pbmn` | 외국인 순매수 거래 대금 | string | Y | 18 |  |
| `frgn_nreg_ntby_pbmn` | 외국인 비등록 순매수 대금 | string | Y | 18 |  |
| `prsn_ntby_tr_pbmn` | 개인 순매수 거래 대금 | string | Y | 18 |  |
| `orgn_ntby_tr_pbmn` | 기관계 순매수 거래 대금 | string | Y | 18 |  |
| `scrt_ntby_tr_pbmn` | 증권 순매수 거래 대금 | string | Y | 18 |  |
| `pe_fund_ntby_tr_pbmn` | 사모 펀드 순매수 거래 대금 | string | Y | 18 |  |
| `ivtr_ntby_tr_pbmn` | 투자신탁 순매수 거래 대금 | string | Y | 18 |  |
| `bank_ntby_tr_pbmn` | 은행 순매수 거래 대금 | string | Y | 18 |  |
| `insu_ntby_tr_pbmn` | 보험 순매수 거래 대금 | string | Y | 18 |  |
| `mrbn_ntby_tr_pbmn` | 종금 순매수 거래 대금 | string | Y | 18 |  |
| `fund_ntby_tr_pbmn` | 기금 순매수 거래 대금 | string | Y | 18 |  |
| `etc_ntby_tr_pbmn` | 기타 순매수 거래 대금 | string | Y | 18 |  |
| `etc_corp_ntby_tr_pbmn` | 기타 법인 순매수 거래 대금 | string | Y | 18 |  |
| `etc_orgt_ntby_tr_pbmn` | 기타 단체 순매수 거래 대금 | string | Y | 18 |  |
| `frgn_seln_vol` | 외국인 매도 거래량 | string | Y | 18 |  |
| `frgn_shnu_vol` | 외국인 매수2 거래량 | string | Y | 18 |  |
| `frgn_seln_tr_pbmn` | 외국인 매도 거래 대금 | string | Y | 18 |  |
| `frgn_shnu_tr_pbmn` | 외국인 매수2 거래 대금 | string | Y | 18 |  |
| `frgn_reg_askp_qty` | 외국인 등록 매도 수량 | string | Y | 18 |  |
| `frgn_reg_bidp_qty` | 외국인 등록 매수 수량 | string | Y | 18 |  |
| `frgn_reg_askp_pbmn` | 외국인 등록 매도 대금 | string | Y | 18 |  |
| `frgn_reg_bidp_pbmn` | 외국인 등록 매수 대금 | string | Y | 18 |  |
| `frgn_nreg_askp_qty` | 외국인 비등록 매도 수량 | string | Y | 18 |  |
| `frgn_nreg_bidp_qty` | 외국인 비등록 매수 수량 | string | Y | 18 |  |
| `frgn_nreg_askp_pbmn` | 외국인 비등록 매도 대금 | string | Y | 18 |  |
| `frgn_nreg_bidp_pbmn` | 외국인 비등록 매수 대금 | string | Y | 18 |  |
| `prsn_seln_vol` | 개인 매도 거래량 | string | Y | 18 |  |
| `prsn_shnu_vol` | 개인 매수2 거래량 | string | Y | 18 |  |
| `prsn_seln_tr_pbmn` | 개인 매도 거래 대금 | string | Y | 18 |  |
| `prsn_shnu_tr_pbmn` | 개인 매수2 거래 대금 | string | Y | 18 |  |
| `orgn_seln_vol` | 기관계 매도 거래량 | string | Y | 18 |  |
| `orgn_shnu_vol` | 기관계 매수2 거래량 | string | Y | 18 |  |
| `orgn_seln_tr_pbmn` | 기관계 매도 거래 대금 | string | Y | 18 |  |
| `orgn_shnu_tr_pbmn` | 기관계 매수2 거래 대금 | string | Y | 18 |  |
| `scrt_seln_vol` | 증권 매도 거래량 | string | Y | 18 |  |
| `scrt_shnu_vol` | 증권 매수2 거래량 | string | Y | 18 |  |
| `scrt_seln_tr_pbmn` | 증권 매도 거래 대금 | string | Y | 18 |  |
| `scrt_shnu_tr_pbmn` | 증권 매수2 거래 대금 | string | Y | 18 |  |
| `ivtr_seln_vol` | 투자신탁 매도 거래량 | string | Y | 18 |  |
| `ivtr_shnu_vol` | 투자신탁 매수2 거래량 | string | Y | 18 |  |
| `ivtr_seln_tr_pbmn` | 투자신탁 매도 거래 대금 | string | Y | 18 |  |
| `ivtr_shnu_tr_pbmn` | 투자신탁 매수2 거래 대금 | string | Y | 18 |  |
| `pe_fund_seln_tr_pbmn` | 사모 펀드 매도 거래 대금 | string | Y | 18 |  |
| `pe_fund_seln_vol` | 사모 펀드 매도 거래량 | string | Y | 18 |  |
| `pe_fund_shnu_tr_pbmn` | 사모 펀드 매수2 거래 대금 | string | Y | 18 |  |
| `pe_fund_shnu_vol` | 사모 펀드 매수2 거래량 | string | Y | 18 |  |
| `bank_seln_vol` | 은행 매도 거래량 | string | Y | 18 |  |
| `bank_shnu_vol` | 은행 매수2 거래량 | string | Y | 18 |  |
| `bank_seln_tr_pbmn` | 은행 매도 거래 대금 | string | Y | 18 |  |
| `bank_shnu_tr_pbmn` | 은행 매수2 거래 대금 | string | Y | 18 |  |
| `insu_seln_vol` | 보험 매도 거래량 | string | Y | 18 |  |
| `insu_shnu_vol` | 보험 매수2 거래량 | string | Y | 18 |  |
| `insu_seln_tr_pbmn` | 보험 매도 거래 대금 | string | Y | 18 |  |
| `insu_shnu_tr_pbmn` | 보험 매수2 거래 대금 | string | Y | 18 |  |
| `mrbn_seln_vol` | 종금 매도 거래량 | string | Y | 18 |  |
| `mrbn_shnu_vol` | 종금 매수2 거래량 | string | Y | 18 |  |
| `mrbn_seln_tr_pbmn` | 종금 매도 거래 대금 | string | Y | 18 |  |
| `mrbn_shnu_tr_pbmn` | 종금 매수2 거래 대금 | string | Y | 18 |  |
| `fund_seln_vol` | 기금 매도 거래량 | string | Y | 18 |  |
| `fund_shnu_vol` | 기금 매수2 거래량 | string | Y | 18 |  |
| `fund_seln_tr_pbmn` | 기금 매도 거래 대금 | string | Y | 18 |  |
| `fund_shnu_tr_pbmn` | 기금 매수2 거래 대금 | string | Y | 18 |  |
| `etc_seln_vol` | 기타 매도 거래량 | string | Y | 18 |  |
| `etc_shnu_vol` | 기타 매수2 거래량 | string | Y | 18 |  |
| `etc_seln_tr_pbmn` | 기타 매도 거래 대금 | string | Y | 18 |  |
| `etc_shnu_tr_pbmn` | 기타 매수2 거래 대금 | string | Y | 18 |  |
| `etc_orgt_seln_vol` | 기타 단체 매도 거래량 | string | Y | 18 |  |
| `etc_orgt_shnu_vol` | 기타 단체 매수2 거래량 | string | Y | 18 |  |
| `etc_orgt_seln_tr_pbmn` | 기타 단체 매도 거래 대금 | string | Y | 18 |  |
| `etc_orgt_shnu_tr_pbmn` | 기타 단체 매수2 거래 대금 | string | Y | 18 |  |
| `etc_corp_seln_vol` | 기타 법인 매도 거래량 | string | Y | 18 |  |
| `etc_corp_shnu_vol` | 기타 법인 매수2 거래량 | string | Y | 18 |  |
| `etc_corp_seln_tr_pbmn` | 기타 법인 매도 거래 대금 | string | Y | 18 |  |
| `etc_corp_shnu_tr_pbmn` | 기타 법인 매수2 거래 대금 | string | Y | 18 |  |
| `bold_yn` | BOLD 여부 | string | Y | 18 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:J  FID_INPUT_ISCD:005930  FID_INPUT_DATE_1:20250811  FID_ORG_ADJ_PRC:  FID_ETC_CLS_CODE:
```

**Response Example:**
```
{      "output1": {          "stck_prpr": "71100",          "prdy_vrss": "100",          "prdy_vrss_sign": "2",          "prdy_ctrt": "0.14",          "acml_vol": "15797656",          "prdy_vol": "11354253",          "rprs_mrkt_kor_name": "KOSPI200"      },      "output2": [          {              "stck_bsop_date": "20250811",              "stck_clpr": "71000",              "prdy_vrss": "-800",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-1.11",              "acml_vol": "11354253",              "acml_tr_pbmn": "808470078650",              "stck_oprc": "72000",              "stck_hgpr": "72100",              "stck_lwpr": "70800",              "frgn_ntby_qty": "-2029800",              "frgn_reg_ntby_qty": "-2031350",              "frgn_nreg_ntby_qty": "1550",              "prsn_ntby_qty": "1686273",              "orgn_ntby_qty": "-571822",              "scrt_ntby_qty": "-44264",              "ivtr_ntby_qty": "-205974",              "pe_fund_ntby_vol": "-125032",              "bank_ntby_qty": "2930",              "insu_ntby_qty": "-85309",              "mrbn_ntby_qty": "-737",              "fund_ntby_qty": "-113436",              "etc_ntby_qty": "915349",              "etc_corp_ntby_vol": "915349",              "etc_orgt_ntby_vol": "0",              "frgn_reg_ntby_pbmn": "-144473",              "frgn_ntby_tr_pbmn": "-144363",              "frgn_nreg_ntby_pbmn": "110",              "prsn_ntby_tr_pbmn": "120110",              "orgn_ntby_tr_pbmn": "-40903",              "scrt_ntby_tr_pbmn": "-3169",              "pe_fund_ntby_tr_pbmn": "-8887",              "ivtr_ntby_tr_pbmn": "-14641",              "bank_ntby_tr_pbmn": "209",              "insu_ntby_tr_pbmn": "-6061",              "mrbn_ntby_tr_pbmn": "-52",              "fund_ntby_tr_pbmn": "-8301",              "etc_ntby_tr_pbmn": "65156",              "etc_corp_ntby_tr_pbmn": "65156",              "etc_orgt_ntby_tr_pbmn": "0",              "frgn_seln_vol": "4557311",              "frgn_shnu_vol": "2527511",              "frgn_seln_tr_pbmn": "324535",              "frgn_shnu_tr_pbmn": "180172",              "frgn_reg_askp_qty": "4550828",              "frgn_reg_bidp_qty": "2519478",              "frgn_reg_askp_pbmn": "324074",              "frgn_reg_bidp_pbmn": "179600",              "frgn_nreg_askp_qty": "6483",              "frgn_nreg_bidp_qty": "8033",              "frgn_nreg_askp_pbmn": "461",              "frgn_nreg_bidp_pbmn": "572",              "prsn_seln_vol": "2003849",              "prsn_shnu_vol": "3690122",              "prsn_seln_tr_pbmn": "142680",              "prsn_shnu_tr_pbmn": "262790",              "orgn_seln_vol": "4694042",              "orgn_shnu_vol": "4122220",              "orgn_seln_tr_pbmn": "334201",              "orgn_shnu_tr_pbmn": "293298",              "scrt_seln_vol": "444582",              "scrt_shnu_vol": "400318",              "scrt_seln_tr_pbmn": "31639",              "scrt_shnu_tr_pbmn": "28470",              "ivtr_seln_vol": "282816",    
```

---
### 112. 종목조건검색 목록조회

| Field | Value |
|---|---|
| Sheet | `종목조건검색 목록조회` |
| Menu | [국내주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/psearch-title` |
| TR_ID (실전) | `HHKST03900300` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `user_id` | 사용자 HTS ID | string | Y | 40 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output2` | 응답상세 | object array | Y |  | Array |
| `user_id` | HTS ID | string | Y | 40 |  |
| `seq` | 조건키값 | string | Y | 10 | 해당 값을 종목조건검색조회 API의 input으로 사용  (0번부터 시작) |
| `grp_nm` | 그룹명 | string | Y | 40 | HTS(eFriend Plus) [0110] "사용자조건검색"화면을 통해  등록한 사용자조건 그룹 |
| `condition_nm` | 조건명 | string | Y | 40 | 등록한 사용자 조건명 |

**Request Example:**
```
{  	"user_id":"abcd9876"  }
```

**Response Example:**
```
{      "output2": [          {              "user_id": "abcd9876",              "seq": "0",              "grp_nm": "임시그룹",              "condition_nm": "RSI전략1_14_9_PER_부채비율"          },          {              "user_id": "abcd9876",              "seq": "1",              "grp_nm": "임시그룹",              "condition_nm": "모멘텀전략1_5_3_PER_부채비율"          },          {              "user_id": "abcd9876",              "seq": "2",              "grp_nm": "임시그룹",              "condition_nm": "외국계거래량_10000이상_PER_부채비율"          },          {              "user_id": "abcd9876",              "seq": "3",              "grp_nm": "임시그룹",              "condition_nm": "이평전략1_5_20_PER_부채비율"          },          {              "user_id": "abcd9876",              "seq": "4",              "grp_nm": "임시그룹",              "condition_nm": "이평전략2_5_20_PER_부채비율"          },          {              "user_id": "abcd9876",              "seq": "5",              "grp_nm": "임시그룹",              "condition_nm": "테스트3"          },          {              "user_id": "abcd9876",              "seq": "6",              "grp_nm": "임시그룹",              "condition_nm": "테트스"          },          {              "user_id": "abcd9876",              "seq": "7",              "grp_nm": "임시그룹",              "condition_nm": "테트스2"          },          {              "user_id": "abcd9876",              "seq": "8",              "grp_nm": "임시그룹",              "condition_nm": "투자경고제외"          }      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 113. 국내주식 상하한가 포착

| Field | Value |
|---|---|
| Sheet | `국내주식 상하한가 포착` |
| Menu | [국내주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/capture-uplowprice` |
| TR_ID (실전) | `FHKST130000C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건시장분류코드 | string | Y | 2 | 시장구분(J) |
| `FID_COND_SCR_DIV_CODE` | 조건화면분류코드 | string | Y | 5 | 11300(Unique key) |
| `FID_PRC_CLS_CODE` | 상하한가 구분코드 | string | Y | 2 | 0(상한가),1(하한가) |
| `FID_DIV_CLS_CODE` | 분류구분코드 | string | Y | 2 | '0(상하한가종목),6(8%상하한가 근접), 5(10%상하한가 근접), 1(15%상하한가 근접),2(20%상하한가 근접),  3(25%상하한가 근접)' |
| `FID_INPUT_ISCD` | 입력종목코드 | string | Y | 12 | 전체(0000), 코스피(0001),코스닥(1001) |
| `FID_TRGT_CLS_CODE` | 대상구분코드 | string | Y | 32 | 공백 입력 |
| `FID_TRGT_EXLS_CLS_CODE` | 대상제외구분코드 | string | Y | 32 | 공백 입력 |
| `FID_INPUT_PRICE_1` | 입력가격1 | string | Y | 12 | 공백 입력 |
| `FID_INPUT_PRICE_2` | 입력가격2 | string | Y | 12 | 공백 입력 |
| `FID_VOL_CNT` | 거래량수 | string | Y | 12 | 공백 입력 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `mksc_shrn_iscd` | 유가증권단축종목코드 | string | Y | 9 |  |
| `hts_kor_isnm` | HTS한글종목명 | string | Y | 40 |  |
| `stck_prpr` | 주식현재가 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일대비부호 | string | Y | 1 |  |
| `prdy_vrss` | 전일대비 | string | Y | 10 |  |
| `prdy_ctrt` | 전일대비율 | string | Y | 82 |  |
| `acml_vol` | 누적거래량 | string | Y | 18 |  |
| `total_askp_rsqn` | 총매도호가잔량 | string | Y | 12 |  |
| `total_bidp_rsqn` | 총매수호가잔량 | string | Y | 12 |  |
| `askp_rsqn1` | 매도호가잔량1 | string | Y | 12 |  |
| `bidp_rsqn1` | 매수호가잔량1 | string | Y | 12 |  |
| `prdy_vol` | 전일거래량 | string | Y | 18 |  |
| `seln_cnqn` | 매도체결량 | string | Y | 18 |  |
| `shnu_cnqn` | 매수2체결량 | string | Y | 18 |  |
| `stck_llam` | 주식하한가 | string | Y | 10 |  |
| `stck_mxpr` | 주식상한가 | string | Y | 10 |  |
| `prdy_vrss_vol_rate` | 전일대비거래량비율 | string | Y | 84 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:J  FID_COND_SCR_DIV_CODE:11300  FID_PRC_CLS_CODE:0  FID_DIV_CLS_CODE:0  FID_INPUT_ISCD:0000  FID_TRGT_CLS_CODE:  FID_TRGT_EXLS_CLS_CODE:  FID_INPUT_PRICE_1:  FID_INPUT_PRICE_2:  FID_VOL_CNT:
```

**Response Example:**
```
{      "output": [          {              "mksc_shrn_iscd": "012800",              "hts_kor_isnm": "대창",              "stck_prpr": "2080",              "prdy_vrss_sign": "1",              "prdy_vrss": "478",              "prdy_ctrt": "29.84",              "acml_vol": "39937550",              "total_askp_rsqn": "0",              "total_bidp_rsqn": "2648946",              "askp_rsqn1": "0",              "bidp_rsqn1": "2299811",              "prdy_vol": "4003121",              "seln_cnqn": "2",              "shnu_cnqn": "0",              "stck_llam": "1122",              "stck_mxpr": "2080",              "prdy_vrss_vol_rate": "997.66"          },          {              "mksc_shrn_iscd": "215100",              "hts_kor_isnm": "로보로보",              "stck_prpr": "5680",              "prdy_vrss_sign": "1",              "prdy_vrss": "1310",              "prdy_ctrt": "29.98",              "acml_vol": "10240653",              "total_askp_rsqn": "0",              "total_bidp_rsqn": "622698",              "askp_rsqn1": "0",              "bidp_rsqn1": "553376",              "prdy_vol": "34944",              "seln_cnqn": "40",              "shnu_cnqn": "0",              "stck_llam": "3060",              "stck_mxpr": "5680",              "prdy_vrss_vol_rate": "29305.90"          }      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 114. 프로그램매매 종합현황(일별)

| Field | Value |
|---|---|
| Sheet | `프로그램매매 종합현황(일별)` |
| Menu | [국내주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/comp-program-trade-daily` |
| TR_ID (실전) | `FHPPG04600001` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 시장 분류 코드 | string | Y | 2 | J : KRX, NX : NXT, UN : 통합 |
| `FID_MRKT_CLS_CODE` | 시장 구분 코드 | string | Y | 2 | K:코스피, Q:코스닥 |
| `FID_INPUT_DATE_1` | 검색시작일 | string | Y | 10 | 공백 입력, 입력 시 ~ 입력일자까지 조회됨  * 8개월 이상 과거 조회 불가 |
| `FID_INPUT_DATE_2` | 검색종료일 | string | Y | 10 | 공백 입력 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stck_bsop_date` | 주식 영업 일자 | string | Y | 8 |  |
| `nabt_entm_seln_tr_pbmn` | 비차익 위탁 매도 거래 대금 | string | Y | 18 |  |
| `nabt_onsl_seln_vol` | 비차익 자기 매도 거래량 | string | Y | 18 |  |
| `whol_onsl_seln_tr_pbmn` | 전체 자기 매도 거래 대금 | string | Y | 18 |  |
| `arbt_smtn_shnu_vol` | 차익 합계 매수2 거래량 | string | Y | 18 |  |
| `nabt_smtn_shnu_tr_pbmn` | 비차익 합계 매수2 거래 대금 | string | Y | 18 |  |
| `arbt_entm_ntby_qty` | 차익 위탁 순매수 수량 | string | Y | 18 |  |
| `nabt_entm_ntby_tr_pbmn` | 비차익 위탁 순매수 거래 대금 | string | Y | 18 |  |
| `arbt_entm_seln_vol` | 차익 위탁 매도 거래량 | string | Y | 18 |  |
| `nabt_entm_seln_vol_rate` | 비차익 위탁 매도 거래량 비율 | string | Y | 82 |  |
| `nabt_onsl_seln_vol_rate` | 비차익 자기 매도 거래량 비율 | string | Y | 82 |  |
| `whol_onsl_seln_tr_pbmn_rate` | 전체 자기 매도 거래 대금 비율 | string | Y | 82 |  |
| `arbt_smtm_shun_vol_rate` | 차익 합계 매수 거래량 비율 | string | Y | 72 |  |
| `nabt_smtm_shun_tr_pbmn_rate` | 비차익 합계 매수 거래대금 비율 | string | Y | 72 |  |
| `arbt_entm_ntby_qty_rate` | 차익 위탁 순매수 수량 비율 | string | Y | 82 |  |
| `nabt_entm_ntby_tr_pbmn_rate` | 비차익 위탁 순매수 거래 대금 | string | Y | 82 |  |
| `arbt_entm_seln_vol_rate` | 차익 위탁 매도 거래량 비율 | string | Y | 82 |  |
| `nabt_entm_seln_tr_pbmn_rate` | 비차익 위탁 매도 거래 대금 비 | string | Y | 82 |  |
| `nabt_onsl_seln_tr_pbmn` | 비차익 자기 매도 거래 대금 | string | Y | 18 |  |
| `whol_smtn_seln_vol` | 전체 합계 매도 거래량 | string | Y | 18 |  |
| `arbt_smtn_shnu_tr_pbmn` | 차익 합계 매수2 거래 대금 | string | Y | 18 |  |
| `whol_entm_shnu_vol` | 전체 위탁 매수2 거래량 | string | Y | 18 |  |
| `arbt_entm_ntby_tr_pbmn` | 차익 위탁 순매수 거래 대금 | string | Y | 18 |  |
| `nabt_onsl_ntby_qty` | 비차익 자기 순매수 수량 | string | Y | 18 |  |
| `arbt_entm_seln_tr_pbmn` | 차익 위탁 매도 거래 대금 | string | Y | 18 |  |
| `nabt_onsl_seln_tr_pbmn_rate` | 비차익 자기 매도 거래 대금 비 | string | Y | 82 |  |
| `whol_seln_vol_rate` | 전체 매도 거래량 비율 | string | Y | 72 |  |
| `arbt_smtm_shun_tr_pbmn_rate` | 차익 합계 매수 거래대금 비율 | string | Y | 72 |  |
| `whol_entm_shnu_vol_rate` | 전체 위탁 매수 거래량 비율 | string | Y | 82 |  |
| `arbt_entm_ntby_tr_pbmn_rate` | 차익 위탁 순매수 거래 대금 비 | string | Y | 82 |  |
| `nabt_onsl_ntby_qty_rate` | 비차익 자기 순매수 수량 비율 | string | Y | 82 |  |
| `arbt_entm_seln_tr_pbmn_rate` | 차익 위탁 매도 거래 대금 비율 | string | Y | 82 |  |
| `nabt_smtn_seln_vol` | 비차익 합계 매도 거래량 | string | Y | 18 |  |
| `whol_smtn_seln_tr_pbmn` | 전체 합계 매도 거래 대금 | string | Y | 18 |  |
| `nabt_entm_shnu_vol` | 비차익 위탁 매수2 거래량 | string | Y | 18 |  |
| `whol_entm_shnu_tr_pbmn` | 전체 위탁 매수2 거래 대금 | string | Y | 18 |  |
| `arbt_onsl_ntby_qty` | 차익 자기 순매수 수량 | string | Y | 18 |  |
| `nabt_onsl_ntby_tr_pbmn` | 비차익 자기 순매수 거래 대금 | string | Y | 18 |  |
| `arbt_onsl_seln_tr_pbmn` | 차익 자기 매도 거래 대금 | string | Y | 18 |  |
| `nabt_smtm_seln_vol_rate` | 비차익 합계 매도 거래량 비율 | string | Y | 72 |  |
| `whol_seln_tr_pbmn_rate` | 전체 매도 거래대금 비율 | string | Y | 72 |  |
| `nabt_entm_shnu_vol_rate` | 비차익 위탁 매수 거래량 비율 | string | Y | 82 |  |
| `whol_entm_shnu_tr_pbmn_rate` | 전체 위탁 매수 거래 대금 비율 | string | Y | 82 |  |
| `arbt_onsl_ntby_qty_rate` | 차익 자기 순매수 수량 비율 | string | Y | 82 |  |
| `nabt_onsl_ntby_tr_pbmn_rate` | 비차익 자기 순매수 거래 대금 | string | Y | 82 |  |
| `arbt_onsl_seln_tr_pbmn_rate` | 차익 자기 매도 거래 대금 비율 | string | Y | 82 |  |
| `nabt_smtn_seln_tr_pbmn` | 비차익 합계 매도 거래 대금 | string | Y | 18 |  |
| `arbt_entm_shnu_vol` | 차익 위탁 매수2 거래량 | string | Y | 18 |  |
| `nabt_entm_shnu_tr_pbmn` | 비차익 위탁 매수2 거래 대금 | string | Y | 18 |  |
| `whol_onsl_shnu_vol` | 전체 자기 매수2 거래량 | string | Y | 18 |  |
| `arbt_onsl_ntby_tr_pbmn` | 차익 자기 순매수 거래 대금 | string | Y | 18 |  |
| `nabt_smtn_ntby_qty` | 비차익 합계 순매수 수량 | string | Y | 18 |  |
| `arbt_onsl_seln_vol` | 차익 자기 매도 거래량 | string | Y | 18 |  |
| `nabt_smtm_seln_tr_pbmn_rate` | 비차익 합계 매도 거래대금 비율 | string | Y | 72 |  |
| `arbt_entm_shnu_vol_rate` | 차익 위탁 매수 거래량 비율 | string | Y | 82 |  |
| `nabt_entm_shnu_tr_pbmn_rate` | 비차익 위탁 매수 거래 대금 비 | string | Y | 82 |  |
| `whol_onsl_shnu_tr_pbmn` | 전체 자기 매수2 거래 대금 | string | Y | 18 |  |
| `arbt_onsl_ntby_tr_pbmn_rate` | 차익 자기 순매수 거래 대금 비 | string | Y | 82 |  |
| `nabt_smtm_ntby_qty_rate` | 비차익 합계 순매수 수량 비율 | string | Y | 72 |  |
| `arbt_onsl_seln_vol_rate` | 차익 자기 매도 거래량 비율 | string | Y | 82 |  |
| `whol_entm_seln_vol` | 전체 위탁 매도 거래량 | string | Y | 18 |  |
| `arbt_entm_shnu_tr_pbmn` | 차익 위탁 매수2 거래 대금 | string | Y | 18 |  |
| `nabt_onsl_shnu_vol` | 비차익 자기 매수2 거래량 | string | Y | 18 |  |
| `whol_onsl_shnu_tr_pbmn_rate` | 전체 자기 매수 거래 대금 비율 | string | Y | 82 |  |
| `arbt_smtn_ntby_qty` | 차익 합계 순매수 수량 | string | Y | 18 |  |
| `nabt_smtn_ntby_tr_pbmn` | 비차익 합계 순매수 거래 대금 | string | Y | 18 |  |
| `arbt_smtn_seln_vol` | 차익 합계 매도 거래량 | string | Y | 18 |  |
| `whol_entm_seln_tr_pbmn` | 전체 위탁 매도 거래 대금 | string | Y | 18 |  |
| `arbt_entm_shnu_tr_pbmn_rate` | 차익 위탁 매수 거래 대금 비율 | string | Y | 82 |  |
| `nabt_onsl_shnu_vol_rate` | 비차익 자기 매수 거래량 비율 | string | Y | 82 |  |
| `whol_onsl_shnu_vol_rate` | 전체 자기 매수 거래량 비율 | string | Y | 82 |  |
| `arbt_smtm_ntby_qty_rate` | 차익 합계 순매수 수량 비율 | string | Y | 72 |  |
| `nabt_smtm_ntby_tr_pbmn_rate` | 비차익 합계 순매수 거래대금 비 | string | Y | 72 |  |
| `arbt_smtm_seln_vol_rate` | 차익 합계 매도 거래량 비율 | string | Y | 72 |  |
| `whol_entm_seln_vol_rate` | 전체 위탁 매도 거래량 비율 | string | Y | 82 |  |
| `arbt_onsl_shnu_vol` | 차익 자기 매수2 거래량 | string | Y | 18 |  |
| `nabt_onsl_shnu_tr_pbmn` | 비차익 자기 매수2 거래 대금 | string | Y | 18 |  |
| `whol_smtn_shnu_vol` | 전체 합계 매수2 거래량 | string | Y | 18 |  |
| `arbt_smtn_ntby_tr_pbmn` | 차익 합계 순매수 거래 대금 | string | Y | 18 |  |
| `whol_entm_ntby_qty` | 전체 위탁 순매수 수량 | string | Y | 18 |  |
| `arbt_smtn_seln_tr_pbmn` | 차익 합계 매도 거래 대금 | string | Y | 18 |  |
| `whol_entm_seln_tr_pbmn_rate` | 전체 위탁 매도 거래 대금 비율 | string | Y | 82 |  |
| `arbt_onsl_shnu_vol_rate` | 차익 자기 매수 거래량 비율 | string | Y | 82 |  |
| `nabt_onsl_shnu_tr_pbmn_rate` | 비차익 자기 매수 거래 대금 비 | string | Y | 82 |  |
| `whol_shun_vol_rate` | 전체 매수 거래량 비율 | string | Y | 72 |  |
| `arbt_smtm_ntby_tr_pbmn_rate` | 차익 합계 순매수 거래대금 비율 | string | Y | 72 |  |
| `whol_entm_ntby_qty_rate` | 전체 위탁 순매수 수량 비율 | string | Y | 82 |  |
| `arbt_smtm_seln_tr_pbmn_rate` | 차익 합계 매도 거래대금 비율 | string | Y | 72 |  |
| `whol_onsl_seln_vol` | 전체 자기 매도 거래량 | string | Y | 18 |  |
| `arbt_onsl_shnu_tr_pbmn` | 차익 자기 매수2 거래 대금 | string | Y | 18 |  |
| `nabt_smtn_shnu_vol` | 비차익 합계 매수2 거래량 | string | Y | 18 |  |
| `whol_smtn_shnu_tr_pbmn` | 전체 합계 매수2 거래 대금 | string | Y | 18 |  |
| `nabt_entm_ntby_qty` | 비차익 위탁 순매수 수량 | string | Y | 18 |  |
| `whol_entm_ntby_tr_pbmn` | 전체 위탁 순매수 거래 대금 | string | Y | 18 |  |
| `nabt_entm_seln_vol` | 비차익 위탁 매도 거래량 | string | Y | 18 |  |
| `whol_onsl_seln_vol_rate` | 전체 자기 매도 거래량 비율 | string | Y | 82 |  |
| `arbt_onsl_shnu_tr_pbmn_rate` | 차익 자기 매수 거래 대금 비율 | string | Y | 82 |  |
| `nabt_smtm_shun_vol_rate` | 비차익 합계 매수 거래량 비율 | string | Y | 72 |  |
| `whol_shun_tr_pbmn_rate` | 전체 매수 거래대금 비율 | string | Y | 72 |  |
| `nabt_entm_ntby_qty_rate` | 비차익 위탁 순매수 수량 비율 | string | Y | 82 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:UN  FID_MRKT_CLS_CODE:K  FID_INPUT_DATE_1:  FID_INPUT_DATE_2:
```

**Response Example:**
```
{      "output": [          {              "stck_bsop_date": "20240404",              "arbt_entm_seln_vol": "945",              "arbt_entm_seln_vol_rate": "0.20",              "arbt_entm_seln_tr_pbmn": "60184",              "arbt_entm_seln_tr_pbmn_rate": "0.50",              "arbt_onsl_seln_tr_pbmn": "116742",              "arbt_onsl_seln_tr_pbmn_rate": "0.97",              "arbt_onsl_seln_vol": "1893",              "arbt_onsl_seln_vol_rate": "0.40",              "arbt_smtn_seln_vol": "2839",              "arbt_smtm_seln_vol_rate": "0.59",              "arbt_smtn_seln_tr_pbmn": "176926",              "arbt_smtm_seln_tr_pbmn_rate": "1.48",              "nabt_entm_seln_vol": "72995",              "nabt_entm_seln_tr_pbmn": "2335987",              "nabt_entm_seln_vol_rate": "15.27",              "nabt_entm_seln_tr_pbmn_rate": "19.50",              "nabt_onsl_seln_vol": "335",              "nabt_onsl_seln_vol_rate": "0.07",              "nabt_onsl_seln_tr_pbmn": "18428",              "nabt_onsl_seln_tr_pbmn_rate": "0.15",              "nabt_smtn_seln_vol": "73331",              "nabt_smtm_seln_vol_rate": "15.34",              "nabt_smtn_seln_tr_pbmn": "2354415",              "nabt_smtm_seln_tr_pbmn_rate": "19.66",              "whol_entm_seln_vol": "73940",              "whol_entm_seln_tr_pbmn": "2396171",              "whol_entm_seln_vol_rate": "15.47",              "whol_entm_seln_tr_pbmn_rate": "20.00",              "whol_onsl_seln_vol": "2229",              "whol_onsl_seln_vol_rate": "0.47",              "whol_onsl_seln_tr_pbmn": "135170",              "whol_onsl_seln_tr_pbmn_rate": "1.13",              "whol_smtn_seln_vol": "76169",              "whol_seln_vol_rate": "15.94",              "whol_smtn_seln_tr_pbmn": "2531340",              "whol_seln_tr_pbmn_rate": "21.13",              "arbt_entm_shnu_vol": "798",              "arbt_entm_shnu_vol_rate": "0.17",              "arbt_entm_shnu_tr_pbmn": "50818",              "arbt_entm_shnu_tr_pbmn_rate": "0.42",              "arbt_onsl_shnu_vol": "247",              "arbt_onsl_shnu_vol_rate": "0.05",              "arbt_onsl_shnu_tr_pbmn": "15309",              "arbt_onsl_shnu_tr_pbmn_rate": "0.13",              "arbt_smtn_shnu_vol": "1045",              "arbt_smtm_shun_vol_rate": "0.22",              "arbt_smtn_shnu_tr_pbmn": "66127",              "arbt_smtm_shun_tr_pbmn_rate": "0.55",              "nabt_entm_shnu_vol": "73441",              "nabt_entm_shnu_vol_rate": "15.37",              "nabt_entm_shnu_tr_pbmn": "2581806",              "nabt_entm_shnu_tr_pbmn_rate": "21.55",              "nabt_onsl_shnu_vol": "250",              "nabt_onsl_shnu_vol_rate": "0.05",              "nabt_onsl_shnu_tr_pbmn": "11652",              "nabt_onsl_shnu_tr_pbmn_rate": "0.10",              "nabt_smtn_shnu_vol": "73691",              "nabt_smtm_shun_vol_rate": "15.42",              "nabt_smtn_shnu_tr_pbmn": "2593458",              "nabt_smtm_shun_tr_pbmn_rate": "21.65",              "whol_entm_shnu_vol": "74239", 
```

---
### 115. 종목별 일별 대차거래추이

| Field | Value |
|---|---|
| Sheet | `종목별 일별 대차거래추이` |
| Menu | [국내주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/daily-loan-trans` |
| TR_ID (실전) | `HHPST074500C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `MRKT_DIV_CLS_CODE` | 조회구분 | string | Y | 1 | 1(코스피), 2(코스닥), 3(종목) |
| `MKSC_SHRN_ISCD` | 종목코드 | string | Y | 9 | 종목코드 |
| `START_DATE` | 조회시작일시 | string | Y | 8 | 조회기간 ~ |
| `END_DATE` | 조회종료일시 | string | Y | 8 | ~ 조회기간 |
| `CTS` | 이전조회KEY | string | Y | 8 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `bsop_date` | 일자 | string | Y | 8 |  |
| `stck_prpr` | 주식 종가 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 8 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `new_stcn` | 당일 증가 주수 (체결) | string | Y | 16 |  |
| `rdmp_stcn` | 당일 감소 주수 (상환) | string | Y | 16 |  |
| `prdy_rmnd_vrss` | 대차거래 증감 | string | Y | 16 |  |
| `rmnd_stcn` | 당일 잔고 주수 | string | Y | 16 |  |
| `rmnd_amt` | 당일 잔고 금액 | string | Y | 20 |  |

**Request Example:**
```
mrkt_div_cls_code:1  mksc_shrn_iscd:005930  start_date:20240401  end_date:20240430  cts:
```

**Response Example:**
```
{      "output2": [          {              "bsop_date": "20240430",              "stck_prpr": "2692.06",              "prdy_vrss_sign": "2",              "prdy_vrss": "4.62",              "prdy_ctrt": "0.17",              "acml_vol": "460083500",              "new_stcn": "14379227",              "rdmp_stcn": "13993603",              "prdy_rmnd_vrss": "385624",              "rmnd_stcn": "947521840",              "rmnd_amt": "47504735"          },          {              "bsop_date": "20240429",              "stck_prpr": "2687.44",              "prdy_vrss_sign": "2",              "prdy_vrss": "31.11",              "prdy_ctrt": "1.17",              "acml_vol": "470546000",              "new_stcn": "6028334",              "rdmp_stcn": "13437664",              "prdy_rmnd_vrss": "-7409330",              "rmnd_stcn": "947136216",              "rmnd_amt": "47367356"          },          {              "bsop_date": "20240426",              "stck_prpr": "2656.33",              "prdy_vrss_sign": "2",              "prdy_vrss": "27.71",              "prdy_ctrt": "1.05",              "acml_vol": "450520700",              "new_stcn": "14406990",              "rdmp_stcn": "12079739",              "prdy_rmnd_vrss": "2327251",              "rmnd_stcn": "954545546",              "rmnd_amt": "46874865"          },          {              "bsop_date": "20240425",              "stck_prpr": "2628.62",              "prdy_vrss_sign": "5",              "prdy_vrss": "-47.13",              "prdy_ctrt": "-1.76",              "acml_vol": "334062400",              "new_stcn": "4765719",              "rdmp_stcn": "13112635",              "prdy_rmnd_vrss": "-8346916",              "rmnd_stcn": "952231269",              "rmnd_amt": "46089010"          },          {              "bsop_date": "20240424",              "stck_prpr": "2675.75",              "prdy_vrss_sign": "2",              "prdy_vrss": "52.73",              "prdy_ctrt": "2.01",              "acml_vol": "325739600",              "new_stcn": "19649840",              "rdmp_stcn": "8993910",              "prdy_rmnd_vrss": "10655930",              "rmnd_stcn": "960577194",              "rmnd_amt": "47488544"          },          {              "bsop_date": "20240423",              "stck_prpr": "2623.02",              "prdy_vrss_sign": "5",              "prdy_vrss": "-6.42",              "prdy_ctrt": "-0.24",              "acml_vol": "430275800",              "new_stcn": "7802761",              "rdmp_stcn": "7414164",              "prdy_rmnd_vrss": "388597",              "rmnd_stcn": "949921264",              "rmnd_amt": "46108475"          },          {              "bsop_date": "20240422",              "stck_prpr": "2629.44",              "prdy_vrss_sign": "2",              "prdy_vrss": "37.58",              "prdy_ctrt": "1.45",              "acml_vol": "401892200",              "new_stcn": "10841550",              "rdmp_stcn": "18150018",              "prdy_rmnd_vrss": "-7308468",              "rmnd_stcn": "949532667"
```

---
### 116. 종목조건검색조회

| Field | Value |
|---|---|
| Sheet | `종목조건검색조회` |
| Menu | [국내주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/psearch-result` |
| TR_ID (실전) | `HHKST03900400` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `user_id` | 사용자 HTS ID | string | Y | 40 |  |
| `seq` | 사용자조건 키값 | string | Y | 10 | 종목조건검색 목록조회 API의 output인 'seq'을 이용  (0 부터 시작) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output2` | 응답상세 | object array | Y |  | Array |
| `code` | 종목코드 | string | Y | 6 |  |
| `name` | 종목명 | string | Y | 20 |  |
| `daebi` | 전일대비부호 | string | Y | 1 | 1. 상한 2. 상승 3. 보합 4. 하한 5. 하락 |
| `price` | 현재가 | string | Y | 16 |  |
| `chgrate` | 등락율 | string | Y | 16 |  |
| `acml_vol` | 거래량 | string | Y | 16 |  |
| `trade_amt` | 거래대금 | string | Y | 16 |  |
| `change` | 전일대비 | string | Y | 16 |  |
| `cttr` | 체결강도 | string | Y | 16 |  |
| `open` | 시가 | string | Y | 16 |  |
| `high` | 고가 | string | Y | 16 |  |
| `low` | 저가 | string | Y | 16 |  |
| `high52` | 52주최고가 | string | Y | 16 |  |
| `low52` | 52주최저가 | string | Y | 16 |  |
| `expprice` | 예상체결가 | string | Y | 16 |  |
| `expchange` | 예상대비 | string | Y | 16 |  |
| `expchggrate` | 예상등락률 | string | Y | 16 |  |
| `expcvol` | 예상체결수량 | string | Y | 16 |  |
| `chgrate2` | 전일거래량대비율 | string | Y | 16 |  |
| `expdaebi` | 예상대비부호 | string | Y | 1 |  |
| `recprice` | 기준가 | string | Y | 16 |  |
| `uplmtprice` | 상한가 | string | Y | 16 |  |
| `dnlmtprice` | 하한가 | string | Y | 16 |  |
| `stotprice` | 시가총액 | string | Y | 16 |  |

**Request Example:**
```
{  	"user_id":"abcd4321",  	"seq":"0"  }
```

**Response Example:**
```
{      "output2": [          {              "code": "000120",              "name": "CJ대한통운",              "daebi": "0",              "price": "00000138600.0000",              "chgrate": "          0.0000",              "acml_vol": "          0.0000",              "trade_amt": "          0.0000",              "change": "          0.0000",              "cttr": "          0.0000",              "open": "          0.0000",              "high": "          0.0000",              "low": "          0.0000",              "high52": "     148600.0000",              "low52": "      69000.0000",              "expprice": "00000000000.0000",              "expchange": "          0.0000",              "expchggrate": "       -100.0000",              "expcvol": "          0.0000",              "chgrate2": "          0.0000",              "expdaebi": "5",              "recprice": "     138600.0000",              "uplmtprice": "     180100.0000",              "dnlmtprice": "      97100.0000",              "stotprice": "      31617.9088"          },          {              "code": "002320",              "name": "한진",              "daebi": "0",              "price": "00000024350.0000",              "chgrate": "          0.0000",              "acml_vol": "          0.0000",              "trade_amt": "          0.0000",              "change": "          0.0000",              "cttr": "          0.0000",              "open": "          0.0000",              "high": "          0.0000",              "low": "          0.0000",              "high52": "      27300.0000",              "low52": "      18010.0000",              "expprice": "00000000000.0000",              "expchange": "          0.0000",              "expchggrate": "       -100.0000",              "expcvol": "          0.0000",              "chgrate2": "          0.0000",              "expdaebi": "5",              "recprice": "      24350.0000",              "uplmtprice": "      31650.0000",              "dnlmtprice": "      17050.0000",              "stotprice": "       3639.7474"          },          {              "code": "002680",              "name": "한탑",              "daebi": "0",              "price": "00000001234.0000",              "chgrate": "          0.0000",              "acml_vol": "          0.0000",              "trade_amt": "          0.0000",              "change": "          0.0000",              "cttr": "          0.0000",              "open": "          0.0000",              "high": "          0.0000",              "low": "          0.0000",              "high52": "       2275.0000",              "low52": "       1125.0000",              "expprice": "00000000000.0000",              "expchange": "          0.0000",              "expchggrate": "       -100.0000",              "expcvol": "          0.0000",              "chgrate2": "          0.0000",              "expdaebi": "5",              "recprice": "       1234.0000",              "uplmtprice": "       1604.0000",              "dnlmtprice":
```

---
### 117. 국내주식 매물대_거래비중

| Field | Value |
|---|---|
| Sheet | `국내주식 매물대_거래비중` |
| Menu | [국내주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/pbar-tratio` |
| TR_ID (실전) | `FHPST01130000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건시장분류코드 | string | Y | 2 | J:KRX, NX:NXT, UN:통합 |
| `FID_INPUT_ISCD` | 입력종목코드 | string | Y | 12 | 주식단축종목코드 |
| `FID_COND_SCR_DIV_CODE` | 조건화면분류코드 | string | Y | 5 | Uniquekey(20113) |
| `FID_INPUT_HOUR_1` | 입력시간1 | string | Y | 10 | 공백 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `rprs_mrkt_kor_name` | 대표시장한글명 | string | Y | 40 |  |
| `stck_shrn_iscd` | 주식단축종목코드 | string | Y | 9 |  |
| `hts_kor_isnm` | HTS한글종목명 | string | Y | 40 |  |
| `stck_prpr` | 주식현재가 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일대비부호 | string | Y | 1 |  |
| `prdy_vrss` | 전일대비 | string | Y | 10 |  |
| `prdy_ctrt` | 전일대비율 | string | Y | 82 |  |
| `acml_vol` | 누적거래량 | string | Y | 18 |  |
| `prdy_vol` | 전일거래량 | string | Y | 18 |  |
| `wghn_avrg_stck_prc` | 가중평균주식가격 | string | Y | 192 |  |
| `lstn_stcn` | 상장주수 | string | Y | 18 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `data_rank` | 데이터순위 | string | Y | 10 |  |
| `stck_prpr` | 주식현재가 | string | Y | 10 |  |
| `cntg_vol` | 체결거래량 | string | Y | 18 |  |
| `acml_vol_rlim` | 누적거래량비중 | string | Y | 72 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:J  FID_INPUT_ISCD:136480  FID_COND_SCR_DIV_CODE:20113  FID_INPUT_HOUR_1:
```

**Response Example:**
```
{      "output1": {          "rprs_mrkt_kor_name": "KOSDAQ",          "stck_shrn_iscd": "136480",          "hts_kor_isnm": "하림",          "stck_prpr": "3240",          "prdy_vrss_sign": "5",          "prdy_vrss": "-65",          "prdy_ctrt": "-1.97",          "acml_vol": "847563",          "prdy_vol": "974060",          "wghn_avrg_stck_prc": "3256.34",          "lstn_stcn": "106209702"      },      "output2": [          {              "data_rank": "1",              "stck_prpr": "3255",              "cntg_vol": "124515",              "acml_vol_rlim": "14.69"          },          {              "data_rank": "2",              "stck_prpr": "3260",              "cntg_vol": "123909",              "acml_vol_rlim": "14.62"          },          {              "data_rank": "3",              "stck_prpr": "3250",              "cntg_vol": "87983",              "acml_vol_rlim": "10.38"          },          {              "data_rank": "4",              "stck_prpr": "3245",              "cntg_vol": "83496",              "acml_vol_rlim": "9.85"          },          {              "data_rank": "5",              "stck_prpr": "3235",              "cntg_vol": "72101",              "acml_vol_rlim": "8.51"          },          {              "data_rank": "6",              "stck_prpr": "3240",              "cntg_vol": "70712",              "acml_vol_rlim": "8.34"          },          {              "data_rank": "7",              "stck_prpr": "3265",              "cntg_vol": "65838",              "acml_vol_rlim": "7.77"          },          {              "data_rank": "8",              "stck_prpr": "3275",              "cntg_vol": "57283",              "acml_vol_rlim": "6.76"          },          {              "data_rank": "9",              "stck_prpr": "3270",              "cntg_vol": "56295",              "acml_vol_rlim": "6.64"          },          {              "data_rank": "10",              "stck_prpr": "3230",              "cntg_vol": "30998",              "acml_vol_rlim": "3.66"          },          {              "data_rank": "11",              "stck_prpr": "3290",              "cntg_vol": "27419",              "acml_vol_rlim": "3.24"          },          {              "data_rank": "12",              "stck_prpr": "3280",              "cntg_vol": "15080",              "acml_vol_rlim": "1.78"          },          {              "data_rank": "13",              "stck_prpr": "3295",              "cntg_vol": "13623",              "acml_vol_rlim": "1.61"          },          {              "data_rank": "14",              "stck_prpr": "3285",              "cntg_vol": "9580",              "acml_vol_rlim": "1.13"          },          {              "data_rank": "15",              "stck_prpr": "3310",              "cntg_vol": "3646",              "acml_vol_rlim": "0.43"          },          {              "data_rank": "16",              "stck_prpr": "3225",              "cntg_vol": "2199",              "acml_vol_rlim": "0.26"          },          {              "data_ra
```

---
### 118. 국내기관_외국인 매매종목가집계

| Field | Value |
|---|---|
| Sheet | `국내기관_외국인 매매종목가집계` |
| Menu | [국내주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/foreign-institution-total` |
| TR_ID (실전) | `FHPTJ04400000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 시장 분류 코드 | string | Y | 2 | V(Default) |
| `FID_COND_SCR_DIV_CODE` | 조건 화면 분류 코드 | string | Y | 5 | 16449(Default) |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 0000:전체, 0001:코스피, 1001:코스닥  ...  포탈 (FAQ : 종목정보 다운로드(국내) - 업종코드 참조) |
| `FID_DIV_CLS_CODE` | 분류 구분 코드 | string | Y | 2 | 0: 수량정열, 1: 금액정열 |
| `FID_RANK_SORT_CLS_CODE` | 순위 정렬 구분 코드 | string | Y | 2 | 0: 순매수상위, 1: 순매도상위 |
| `FID_ETC_CLS_CODE` | 기타 구분  정렬 | string | Y | 2 | 0:전체 1:외국인 2:기관계 3:기타 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `Output` | 응답상세1 | object | Y |  |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `mksc_shrn_iscd` | 유가증권 단축 종목코드 | string | Y | 9 |  |
| `ntby_qty` | 순매수 수량 | string | Y | 18 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 8 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `frgn_ntby_qty` | 외국인 순매수 수량 | string | Y | 12 |  |
| `orgn_ntby_qty` | 기관계 순매수 수량 | string | Y | 18 |  |
| `ivtr_ntby_qty` | 투자신탁 순매수 수량 | string | Y | 12 |  |
| `bank_ntby_qty` | 은행 순매수 수량 | string | Y | 12 |  |
| `insu_ntby_qty` | 보험 순매수 수량 | string | Y | 12 |  |
| `mrbn_ntby_qty` | 종금 순매수 수량 | string | Y | 12 |  |
| `fund_ntby_qty` | 기금 순매수 수량 | string | Y | 12 |  |
| `etc_orgt_ntby_vol` | 기타 단체 순매수 거래량 | string | Y | 18 |  |
| `etc_corp_ntby_vol` | 기타 법인 순매수 거래량 | string | Y | 18 |  |
| `frgn_ntby_tr_pbmn` | 외국인 순매수 거래 대금 | string | Y | 18 | frgn_ntby_tr_pbmn ~ etc_corp_ntby_tr_pbmn  (단위 : 백만원, 수량*현재가) |
| `orgn_ntby_tr_pbmn` | 기관계 순매수 거래 대금 | string | Y | 18 |  |
| `ivtr_ntby_tr_pbmn` | 투자신탁 순매수 거래 대금 | string | Y | 18 |  |
| `bank_ntby_tr_pbmn` | 은행 순매수 거래 대금 | string | Y | 18 |  |
| `insu_ntby_tr_pbmn` | 보험 순매수 거래 대금 | string | Y | 18 |  |
| `mrbn_ntby_tr_pbmn` | 종금 순매수 거래 대금 | string | Y | 18 |  |
| `fund_ntby_tr_pbmn` | 기금 순매수 거래 대금 | string | Y | 18 |  |
| `etc_orgt_ntby_tr_pbmn` | 기타 단체 순매수 거래 대금 | string | Y | 18 |  |
| `etc_corp_ntby_tr_pbmn` | 기타 법인 순매수 거래 대금 | string | Y | 18 |  |

---
### 119. 관심종목 그룹별 종목조회

| Field | Value |
|---|---|
| Sheet | `관심종목 그룹별 종목조회` |
| Menu | [국내주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/intstock-stocklist-by-group` |
| TR_ID (실전) | `HHKCM113004C6` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `TYPE` | 관심종목구분코드 | string | Y | 1 | Unique key(1) |
| `USER_ID` | 사용자 ID | string | Y | 16 | HTS_ID 입력 |
| `DATA_RANK` | 데이터 순위 | string | Y | 10 | 공백 |
| `INTER_GRP_CODE` | 관심 그룹 코드 | string | Y | 3 | 관심그룹 조회 결과의 그룹 값 입력 |
| `INTER_GRP_NAME` | 관심 그룹 명 | string | Y | 40 | 공백 |
| `HTS_KOR_ISNM` | HTS 한글 종목명 | string | Y | 40 | 공백 |
| `CNTG_CLS_CODE` | 체결 구분 코드 | string | Y | 1 | 공백 |
| `FID_ETC_CLS_CODE` | 기타 구분 코드 | string | Y | 2 | Unique key(4) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `data_rank` | 데이터 순위 | string | Y | 10 |  |
| `inter_grp_name` | 관심 그룹 명 | string | Y | 40 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `fid_mrkt_cls_code` | FID 시장 구분 코드 | string | Y | 2 |  |
| `data_rank` | 데이터 순위 | string | Y | 10 |  |
| `exch_code` | 거래소코드 | string | Y | 4 |  |
| `jong_code` | 종목코드 | string | Y | 16 |  |
| `color_code` | 생상 코드 | string | Y | 8 |  |
| `memo` | 메모 | string | Y | 128 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `fxdt_ntby_qty` | 기준일 순매수 수량 | string | Y | 12 |  |
| `cntg_unpr` | 체결단가 | string | Y | 11 |  |
| `cntg_cls_code` | 체결 구분 코드 | string | Y | 1 |  |

**Request Example:**
```
TYPE:1  USER_ID:{{HTS_ID}}  DATA_RANK:  INTER_GRP_CODE:002  INTER_GRP_NAME:  HTS_KOR_ISNM:  CNTG_CLS_CODE:  FID_ETC_CLS_CODE:4
```

**Response Example:**
```
{      "output1": {          "data_rank": "0000000002",          "inter_grp_name": "관심종목02"      },      "output2": [          {              "fid_mrkt_cls_code": "J",              "data_rank": "0000000001",              "exch_code": "KRX",              "jong_code": "006840",              "color_code": "-1",              "memo": "",              "hts_kor_isnm": "AK홀딩스",              "fxdt_ntby_qty": "0",              "cntg_unpr": "0.000000",              "cntg_cls_code": "0"          },          {              "fid_mrkt_cls_code": "J",              "data_rank": "0000000002",              "exch_code": "KRX",              "jong_code": "054620",              "color_code": "-1",              "memo": "",              "hts_kor_isnm": "APS홀딩스",              "fxdt_ntby_qty": "0",              "cntg_unpr": "0.000000",              "cntg_cls_code": "0"          },          {              "fid_mrkt_cls_code": "J",              "data_rank": "0000000003",              "exch_code": "KRX",              "jong_code": "265520",              "color_code": "-1",              "memo": "",              "hts_kor_isnm": "AP시스템",              "fxdt_ntby_qty": "0",              "cntg_unpr": "0.000000",              "cntg_cls_code": "0"          },          {              "fid_mrkt_cls_code": "J",              "data_rank": "0000000004",              "exch_code": "KRX",              "jong_code": "211270",              "color_code": "-1",              "memo": "",              "hts_kor_isnm": "AP위성",              "fxdt_ntby_qty": "0",              "cntg_unpr": "0.000000",              "cntg_cls_code": "0"          },          {              "fid_mrkt_cls_code": "J",              "data_rank": "0000000005",              "exch_code": "KRX",              "jong_code": "138930",              "color_code": "-1",              "memo": "",              "hts_kor_isnm": "BNK금융지주",              "fxdt_ntby_qty": "0",              "cntg_unpr": "0.000000",              "cntg_cls_code": "0"          },          {              "fid_mrkt_cls_code": "J",              "data_rank": "0000000006",              "exch_code": "KRX",              "jong_code": "001460",              "color_code": "-1",              "memo": "",              "hts_kor_isnm": "BYC",              "fxdt_ntby_qty": "0",              "cntg_unpr": "0.000000",              "cntg_cls_code": "0"          },          {              "fid_mrkt_cls_code": "J",              "data_rank": "0000000007",              "exch_code": "KRX",              "jong_code": "001465",              "color_code": "-1",              "memo": "",              "hts_kor_isnm": "BYC우",              "fxdt_ntby_qty": "0",              "cntg_unpr": "0.000000",              "cntg_cls_code": "0"          },          {              "fid_mrkt_cls_code": "J",              "data_rank": "0000000008",              "exch_code": "KRX",              "jong_code": "013720",              "color_code": "-1",              "memo": "",              "hts_kor_isnm": "CBI",             
```

---
### 120. 주식현재가 회원사 종목매매동향

| Field | Value |
|---|---|
| Sheet | `주식현재가 회원사 종목매매동향` |
| Menu | [국내주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/inquire-member-daily` |
| TR_ID (실전) | `FHPST04540000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건시장분류코드 | string | Y | 2 | J: KRX, NX: NXT, UN: 통합 |
| `FID_INPUT_ISCD` | 입력종목코드 | string | Y | 12 | 주식종목코드입력 |
| `FID_INPUT_ISCD_2` | 회원사코드 | string | Y | 8 | 회원사코드 (kis developers 포탈 사이트 포럼-> FAQ -> 종목정보 다운로드(국내) > 회원사 참조) |
| `FID_INPUT_DATE_1` | 입력날짜1 | string | Y | 10 | 날짜 ~ |
| `FID_INPUT_DATE_2` | 입력날짜2 | string | Y | 10 | ~ 날짜 |
| `FID_SCTN_CLS_CODE` | 구간구분코드 | string | Y | 2 | 공백 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stck_bsop_date` | 주식영업일자 | string | Y | 8 |  |
| `total_seln_qty` | 총매도수량 | string | Y | 18 |  |
| `total_shnu_qty` | 총매수2수량 | string | Y | 18 |  |
| `ntby_qty` | 순매수수량 | string | Y | 18 |  |
| `stck_prpr` | 주식현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일대비부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일대비율 | string | Y | 82 |  |
| `acml_vol` | 누적거래량 | string | Y | 18 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:J  FID_INPUT_ISCD:136480  FID_INPUT_ISCD_2:00003  FID_INPUT_DATE_1:20240501  FID_INPUT_DATE_2:20240530  FID_SCTN_CLS_CODE:
```

**Response Example:**
```
{      "output": [          {              "stck_bsop_date": "20240530",              "total_seln_qty": "55432",              "total_shnu_qty": "81112",              "ntby_qty": "25680",              "stck_prpr": "3240",              "prdy_vrss": "-65",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-1.97",              "acml_vol": "862835"          },          {              "stck_bsop_date": "20240529",              "total_seln_qty": "53901",              "total_shnu_qty": "130678",              "ntby_qty": "76777",              "stck_prpr": "3305",              "prdy_vrss": "-30",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-0.90",              "acml_vol": "974060"          },          {              "stck_bsop_date": "20240528",              "total_seln_qty": "139470",              "total_shnu_qty": "209017",              "ntby_qty": "69547",              "stck_prpr": "3335",              "prdy_vrss": "-30",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-0.89",              "acml_vol": "1553914"          },          {              "stck_bsop_date": "20240527",              "total_seln_qty": "239813",              "total_shnu_qty": "246930",              "ntby_qty": "7117",              "stck_prpr": "3365",              "prdy_vrss": "-30",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-0.88",              "acml_vol": "1750949"          },          {              "stck_bsop_date": "20240524",              "total_seln_qty": "1451049",              "total_shnu_qty": "1526087",              "ntby_qty": "75038",              "stck_prpr": "3395",              "prdy_vrss": "110",              "prdy_vrss_sign": "2",              "prdy_ctrt": "3.35",              "acml_vol": "11758204"          },          {              "stck_bsop_date": "20240523",              "total_seln_qty": "120530",              "total_shnu_qty": "159459",              "ntby_qty": "38929",              "stck_prpr": "3285",              "prdy_vrss": "-40",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-1.20",              "acml_vol": "1532424"          },          {              "stck_bsop_date": "20240522",              "total_seln_qty": "290601",              "total_shnu_qty": "292948",              "ntby_qty": "2347",              "stck_prpr": "3325",              "prdy_vrss": "60",              "prdy_vrss_sign": "2",              "prdy_ctrt": "1.84",              "acml_vol": "2579194"          },          {              "stck_bsop_date": "20240521",              "total_seln_qty": "118718",              "total_shnu_qty": "75046",              "ntby_qty": "-43672",              "stck_prpr": "3265",              "prdy_vrss": "20",              "prdy_vrss_sign": "2",              "prdy_ctrt": "0.62",              "acml_vol": "979173"          },          {              "stck_bsop_date": "20240520",              "total_seln_qty": "400866",              "total_shnu_qty": "290925",              "n
```

---
### 121. 종목별 프로그램매매추이(일별)

| Field | Value |
|---|---|
| Sheet | `종목별 프로그램매매추이(일별)` |
| Menu | [국내주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/program-trade-by-stock-daily` |
| TR_ID (실전) | `FHPPG04650201` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | KRX : J , NXT : NX, 통합 : UN |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 종목코드 |
| `FID_INPUT_DATE_1` | 입력 날짜1 | string | Y | 10 | 기준일 (ex 0020240308), 미입력시 당일부터 조회 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stck_bsop_date` | 주식 영업 일자 | string | Y | 8 |  |
| `stck_clpr` | 주식 종가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |
| `whol_smtn_seln_vol` | 전체 합계 매도 거래량 | string | Y | 18 |  |
| `whol_smtn_shnu_vol` | 전체 합계 매수2 거래량 | string | Y | 18 |  |
| `whol_smtn_ntby_qty` | 전체 합계 순매수 수량 | string | Y | 18 |  |
| `whol_smtn_seln_tr_pbmn` | 전체 합계 매도 거래 대금 | string | Y | 18 |  |
| `whol_smtn_shnu_tr_pbmn` | 전체 합계 매수2 거래 대금 | string | Y | 18 |  |
| `whol_smtn_ntby_tr_pbmn` | 전체 합계 순매수 거래 대금 | string | Y | 18 |  |
| `whol_ntby_vol_icdc` | 전체 순매수 거래량 증감 | string | Y | 10 |  |
| `whol_ntby_tr_pbmn_icdc2` | 전체 순매수 거래 대금 증감2 | string | Y | 18 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:J  FID_INPUT_ISCD:005930  FID_INPUT_DATE_1:20240517
```

**Response Example:**
```
{      "output": [          {              "stck_bsop_date": "20240517",              "stck_clpr": "77400",              "prdy_vrss": "-800",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-1.02",              "acml_vol": "15698949",              "acml_tr_pbmn": "1220563293000",              "whol_smtn_seln_vol": "6910299",              "whol_smtn_shnu_vol": "3468820",              "whol_smtn_ntby_qty": "-3441479",              "whol_smtn_seln_tr_pbmn": "536935491000",              "whol_smtn_shnu_tr_pbmn": "270120727200",              "whol_smtn_ntby_tr_pbmn": "-266814763800",              "whol_ntby_vol_icdc": "-3989127",              "whol_ntby_tr_pbmn_icdc2": "-311124223700"          },          {              "stck_bsop_date": "20240516",              "stck_clpr": "78200",              "prdy_vrss": "-100",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-0.13",              "acml_vol": "20989778",              "acml_tr_pbmn": "1656384883213",              "whol_smtn_seln_vol": "4747160",              "whol_smtn_shnu_vol": "5294808",              "whol_smtn_ntby_qty": "547648",              "whol_smtn_seln_tr_pbmn": "374517364400",              "whol_smtn_shnu_tr_pbmn": "418826824300",              "whol_smtn_ntby_tr_pbmn": "44309459900",              "whol_ntby_vol_icdc": "631626",              "whol_ntby_tr_pbmn_icdc2": "50772364600"          },          {              "stck_bsop_date": "20240514",              "stck_clpr": "78300",              "prdy_vrss": "-100",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-0.13",              "acml_vol": "11763992",              "acml_tr_pbmn": "920737809850",              "whol_smtn_seln_vol": "2056263",              "whol_smtn_shnu_vol": "1972285",              "whol_smtn_ntby_qty": "-83978",              "whol_smtn_seln_tr_pbmn": "160973460500",              "whol_smtn_shnu_tr_pbmn": "154510555800",              "whol_smtn_ntby_tr_pbmn": "-6462904700",              "whol_ntby_vol_icdc": "867690",              "whol_ntby_tr_pbmn_icdc2": "67673387000"          },          {              "stck_bsop_date": "20240513",              "stck_clpr": "78400",              "prdy_vrss": "-800",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-1.01",              "acml_vol": "18652344",              "acml_tr_pbmn": "1460962492700",              "whol_smtn_seln_vol": "3971918",              "whol_smtn_shnu_vol": "3020250",              "whol_smtn_ntby_qty": "-951668",              "whol_smtn_seln_tr_pbmn": "311400439700",              "whol_smtn_shnu_tr_pbmn": "237264148000",              "whol_smtn_ntby_tr_pbmn": "-74136291700",              "whol_ntby_vol_icdc": "-1111550",              "whol_ntby_tr_pbmn_icdc2": "-87529870000"          },...      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 122. 관심종목 그룹조회

| Field | Value |
|---|---|
| Sheet | `관심종목 그룹조회` |
| Menu | [국내주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/intstock-grouplist` |
| TR_ID (실전) | `HHKCM113004C7` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `TYPE` | 관심종목구분코드 | string | Y | 1 | Unique key(1) |
| `FID_ETC_CLS_CODE` | FID 기타 구분 코드 | string | Y | 2 | Unique key(00) |
| `USER_ID` | 사용자 ID | string | Y | 16 | HTS_ID 입력 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output2` | 응답상세 | object | Y |  |  |
| `date` | 일자 | string | Y | 8 |  |
| `trnm_hour` | 전송 시간 | string | Y | 6 |  |
| `data_rank` | 데이터 순위 | string | Y | 10 |  |
| `inter_grp_code` | 관심 그룹 코드 | string | Y | 3 |  |
| `inter_grp_name` | 관심 그룹 명 | string | Y | 40 |  |
| `ask_cnt` | 요청 개수 | string | Y | 4 |  |

**Request Example:**
```
TYPE:1  FID_ETC_CLS_CODE:00  USER_ID:{{HTS_ID}}
```

**Response Example:**
```
{      "output2": [          {              "date": "20230517",              "trnm_hour": "171648",              "data_rank": "0000000000",              "inter_grp_code": "001",              "inter_grp_name": "조건검색결과",              "ask_cnt": "100"          },          {              "date": "20240318",              "trnm_hour": "133351",              "data_rank": "0000000001",              "inter_grp_code": "000",              "inter_grp_name": "기본그룹1",              "ask_cnt": "011"          },          {              "date": "20240529",              "trnm_hour": "090525",              "data_rank": "0000000002",              "inter_grp_code": "002",              "inter_grp_name": "관심종목02",              "ask_cnt": "022"          }      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 123. 종목별 외인기관 추정가집계

| Field | Value |
|---|---|
| Sheet | `종목별 외인기관 추정가집계` |
| Menu | [국내주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/investor-trend-estimate` |
| TR_ID (실전) | `HHPTJ04160200` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `MKSC_SHRN_ISCD` | 종목코드 | string | Y | 12 | 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output2` | 응답상세 | object array | Y |  | Array |
| `bsop_hour_gb` | 입력구분 | string | Y | 1 | 1: 09시 30분 입력  2: 10시 00분 입력   3: 11시 20분 입력   4: 13시 20분 입력   5: 14시 30분 입력 |
| `frgn_fake_ntby_qty` | 외국인수량(가집계) | string | Y | 18 |  |
| `orgn_fake_ntby_qty` | 기관수량(가집계) | string | Y | 18 |  |
| `sum_fake_ntby_qty` | 합산수량(가집계) | string | Y | 18 |  |

**Request Example:**
```
{     "MKSC_SHRN_ISCD":"000660"  }
```

**Response Example:**
```
{      "output2": [          {              "bsop_hour_gb": "5",              "frgn_fake_ntby_qty": "-00000000000030000",              "orgn_fake_ntby_qty": "000000000000121000",              "sum_fake_ntby_qty": "000000000000091000"          },          {              "bsop_hour_gb": "4",              "frgn_fake_ntby_qty": "-00000000000093000",              "orgn_fake_ntby_qty": "000000000000130000",              "sum_fake_ntby_qty": "000000000000037000"          },          {              "bsop_hour_gb": "3",              "frgn_fake_ntby_qty": "-00000000000026000",              "orgn_fake_ntby_qty": "000000000000037000",              "sum_fake_ntby_qty": "000000000000011000"          },          {              "bsop_hour_gb": "2",              "frgn_fake_ntby_qty": "-00000000000038000",              "orgn_fake_ntby_qty": "000000000000022000",              "sum_fake_ntby_qty": "-00000000000016000"          },          {              "bsop_hour_gb": "1",              "frgn_fake_ntby_qty": "-00000000000023000",              "orgn_fake_ntby_qty": "000000000000000000",              "sum_fake_ntby_qty": "-00000000000023000"          }      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 124. 종목별일별매수매도체결량

| Field | Value |
|---|---|
| Sheet | `종목별일별매수매도체결량` |
| Menu | [국내주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/inquire-daily-trade-volume` |
| TR_ID (실전) | `FHKST03010800` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | FID 조건 시장 분류 코드 | string | Y | 2 | J: KRX, NX: NXT, UN: 통합 |
| `FID_INPUT_ISCD` | FID 입력 종목코드 | string | Y | 12 | 005930 |
| `FID_INPUT_DATE_1` | FID 입력 날짜1 | string | Y | 10 | from |
| `FID_INPUT_DATE_2` | FID 입력 날짜2 | string | Y | 10 | to |
| `FID_PERIOD_DIV_CODE` | FID 기간 분류 코드 | string | Y | 32 | D |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `shnu_cnqn_smtn` | 매수 체결량 합계 | string | Y | 18 |  |
| `seln_cnqn_smtn` | 매도 체결량 합계 | string | Y | 18 |  |
| `output2` | 응답상세2 | object array | Y |  | array |
| `stck_bsop_date` | 거래상태정보 | string | Y | 8 |  |
| `total_seln_qty` | 총 매도 수량 | string | Y | 18 |  |
| `total_shnu_qty` | 총 매수 수량 | string | Y | 18 |  |

**Request Example:**
```
{  	"fid_cond_mrkt_div_code":"J",  	"fid_input_iscd":"005930",  	"fid_input_date_1":"20240101",  	"fid_input_date_2":"20240126",  	"fid_period_div_code":"D"  }
```

**Response Example:**
```
{      "output1": {          "shnu_cnqn_smtn": "4520816",          "seln_cnqn_smtn": "5285722"      },      "output2": [          {              "stck_bsop_date": "20240126",              "total_seln_qty": "5285722",              "total_shnu_qty": "4520816"          },          {              "stck_bsop_date": "20240125",              "total_seln_qty": "5610781",              "total_shnu_qty": "4008095"          },          {              "stck_bsop_date": "20240124",              "total_seln_qty": "7001409",              "total_shnu_qty": "4628223"          },          {              "stck_bsop_date": "20240123",              "total_seln_qty": "6929612",              "total_shnu_qty": "6221072"          },          {              "stck_bsop_date": "20240122",              "total_seln_qty": "9304203",              "total_shnu_qty": "8269298"          },          {              "stck_bsop_date": "20240119",              "total_seln_qty": "7937786",              "total_shnu_qty": "12024544"          },          {              "stck_bsop_date": "20240118",              "total_seln_qty": "7130130",              "total_shnu_qty": "8051305"          },          {              "stck_bsop_date": "20240117",              "total_seln_qty": "12448352",              "total_shnu_qty": "7781842"          },          {              "stck_bsop_date": "20240116",              "total_seln_qty": "7231456",              "total_shnu_qty": "5660392"          },          {              "stck_bsop_date": "20240115",              "total_seln_qty": "5146657",              "total_shnu_qty": "6242907"          },          {              "stck_bsop_date": "20240112",              "total_seln_qty": "6112124",              "total_shnu_qty": "5706461"          },          {              "stck_bsop_date": "20240111",              "total_seln_qty": "10835895",              "total_shnu_qty": "10905905"          },          {              "stck_bsop_date": "20240110",              "total_seln_qty": "12367976",              "total_shnu_qty": "6256368"          },          {              "stck_bsop_date": "20240109",              "total_seln_qty": "16376304",              "total_shnu_qty": "7458947"          },          {              "stck_bsop_date": "20240108",              "total_seln_qty": "5318849",              "total_shnu_qty": "4631085"          },          {              "stck_bsop_date": "20240105",              "total_seln_qty": "4907468",              "total_shnu_qty": "5219184"          },          {              "stck_bsop_date": "20240104",              "total_seln_qty": "6041013",              "total_shnu_qty": "7038798"          },          {              "stck_bsop_date": "20240103",              "total_seln_qty": "12066549",              "total_shnu_qty": "7713276"          },          {              "stck_bsop_date": "20240102",              "total_seln_qty": "5855872",              "total_shnu_qty": "9333762"          }      ],      "rt_cd": "0",      "msg_cd": 
```

---
### 125. 국내주식 체결금액별 매매비중

| Field | Value |
|---|---|
| Sheet | `국내주식 체결금액별 매매비중` |
| Menu | [국내주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/tradprt-byamt` |
| TR_ID (실전) | `FHKST111900C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건시장분류코드 | string | Y | 2 | J: KRX, NX: NXT, UN: 통합 |
| `FID_COND_SCR_DIV_CODE` | 조건화면분류코드 | string | Y | 5 | Uniquekey(11119) |
| `FID_INPUT_ISCD` | 입력종목코드 | string | Y | 12 | 종목코드(ex)(005930 (삼성전자)) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `prpr_name` | 가격명 | string | Y | 40 |  |
| `smtn_avrg_prpr` | 합계 평균가격 | string | Y | 10 |  |
| `acml_vol` | 합계 거래량 | string | Y | 18 |  |
| `whol_ntby_qty_rate` | 합계 순매수비율 | string | Y | 72 |  |
| `ntby_cntg_csnu` | 합계 순매수건수 | string | Y | 10 |  |
| `seln_cnqn_smtn` | 매도 거래량 | string | Y | 18 |  |
| `whol_seln_vol_rate` | 매도 거래량비율 | string | Y | 72 |  |
| `seln_cntg_csnu` | 매도 건수 | string | Y | 10 |  |
| `shnu_cnqn_smtn` | 매수 거래량 | string | Y | 18 |  |
| `whol_shun_vol_rate` | 매수 거래량비율 | string | Y | 72 |  |
| `shnu_cntg_csnu` | 매수 건수 | string | Y | 10 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:J  FID_COND_SCR_DIV_CODE:11119  FID_INPUT_ISCD:005930
```

**Response Example:**
```
{      "output": [          {              "prpr_name": "3백 이하",              "smtn_avrg_prpr": "78315",              "acml_vol": "291426",              "whol_ntby_qty_rate": "0.37",              "ntby_cntg_csnu": "13297",              "seln_cnqn_smtn": "126451",              "whol_seln_vol_rate": "1.21",              "seln_cntg_csnu": "16084",              "shnu_cnqn_smtn": "164975",              "whol_shun_vol_rate": "1.58",              "shnu_cntg_csnu": "29381"          },          {              "prpr_name": "5백 이하",              "smtn_avrg_prpr": "78317",              "acml_vol": "138138",              "whol_ntby_qty_rate": "-0.13",              "ntby_cntg_csnu": "-278",              "seln_cnqn_smtn": "75634",              "whol_seln_vol_rate": "0.73",              "seln_cntg_csnu": "1525",              "shnu_cnqn_smtn": "62504",              "whol_shun_vol_rate": "0.60",              "shnu_cntg_csnu": "1247"          },          {              "prpr_name": "1천 이하",              "smtn_avrg_prpr": "78304",              "acml_vol": "378958",              "whol_ntby_qty_rate": "0.10",              "ntby_cntg_csnu": "110",              "seln_cnqn_smtn": "184499",              "whol_seln_vol_rate": "1.77",              "seln_cntg_csnu": "2000",              "shnu_cnqn_smtn": "194459",              "whol_shun_vol_rate": "1.87",              "shnu_cntg_csnu": "2110"          },          {              "prpr_name": "3천 이하",              "smtn_avrg_prpr": "78328",              "acml_vol": "720672",              "whol_ntby_qty_rate": "-0.51",              "ntby_cntg_csnu": "-330",              "seln_cnqn_smtn": "387086",              "whol_seln_vol_rate": "3.72",              "seln_cntg_csnu": "1993",              "shnu_cnqn_smtn": "333586",              "whol_shun_vol_rate": "3.20",              "shnu_cntg_csnu": "1663"          },          {              "prpr_name": "5천 이하",              "smtn_avrg_prpr": "78349",              "acml_vol": "429911",              "whol_ntby_qty_rate": "0.16",              "ntby_cntg_csnu": "63",              "seln_cnqn_smtn": "206855",              "whol_seln_vol_rate": "1.99",              "seln_cntg_csnu": "426",              "shnu_cnqn_smtn": "223056",              "whol_shun_vol_rate": "2.14",              "shnu_cntg_csnu": "489"          },          {              "prpr_name": "1억 이하",              "smtn_avrg_prpr": "78336",              "acml_vol": "580130",              "whol_ntby_qty_rate": "-1.24",              "ntby_cntg_csnu": "-153",              "seln_cnqn_smtn": "354585",              "whol_seln_vol_rate": "3.40",              "seln_cntg_csnu": "402",              "shnu_cnqn_smtn": "225545",              "whol_shun_vol_rate": "2.17",              "shnu_cntg_csnu": "249"          },          {              "prpr_name": "5억 이하",              "smtn_avrg_prpr": "78326",              "acml_vol": "1664623",              "whol_ntby_qty_rate": "-1.57",              "ntby_cntg_csnu": "-61",              "seln_c
```

---
### 126. 프로그램매매 투자자매매동향(당일)

| Field | Value |
|---|---|
| Sheet | `프로그램매매 투자자매매동향(당일)` |
| Menu | [국내주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/investor-program-trade-today` |
| TR_ID (실전) | `HHPPG046600C1` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `EXCH_DIV_CLS_CODE` | 거래소 구분 코드 | string | Y | 2 | J : KRX, NX : NXT, UN : 통합 |
| `MRKT_DIV_CLS_CODE` | 시장 구분 코드 | string | Y | 1 | 1:코스피, 4:코스닥 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `invr_cls_code` | 투자자코드 | string | Y | 4 |  |
| `all_seln_qty` | 전체매도수량 | string | Y | 18 |  |
| `all_seln_amt` | 전체매도대금 | string | Y | 18 |  |
| `invr_cls_name` | 투자자 구분 명 | string | Y | 20 |  |
| `all_shnu_qty` | 전체매수수량 | string | Y | 18 |  |
| `all_shnu_amt` | 전체매수대금 | string | Y | 18 |  |
| `all_ntby_amt` | 전체순매수대금 | string | Y | 12 |  |
| `arbt_seln_qty` | 차익매도수량 | string | Y | 18 |  |
| `all_ntby_qty` | 전체순매수수량 | string | Y | 12 |  |
| `arbt_shnu_qty` | 차익매수수량 | string | Y | 18 |  |
| `arbt_ntby_qty` | 차익순매수수량 | string | Y | 12 |  |
| `arbt_seln_amt` | 차익매도대금 | string | Y | 18 |  |
| `arbt_shnu_amt` | 차익매수대금 | string | Y | 18 |  |
| `arbt_ntby_amt` | 차익순매수대금 | string | Y | 12 |  |
| `nabt_seln_qty` | 비차익매도수량 | string | Y | 18 |  |
| `nabt_shnu_qty` | 비차익매수수량 | string | Y | 18 |  |
| `nabt_ntby_qty` | 비차익순매수수량 | string | Y | 12 |  |
| `nabt_seln_amt` | 비차익매도대금 | string | Y | 18 |  |
| `nabt_shnu_amt` | 비차익매수대금 | string | Y | 18 |  |
| `nabt_ntby_amt` | 비차익순매수대금 | string | Y | 12 |  |

**Request Example:**
```
MRKT_DIV_CLS_CODE:1
```

**Response Example:**
```
{      "output1": [          {              "invr_cls_code": "7100",              "invr_cls_name": "기 타",              "arbt_seln_qty": "0",              "arbt_shnu_qty": "0",              "arbt_ntby_qty": "0",              "arbt_seln_amt": "0",              "arbt_shnu_amt": "0",              "arbt_ntby_amt": "0",              "nabt_seln_qty": "289",              "nabt_shnu_qty": "242",              "nabt_ntby_qty": "-47",              "nabt_seln_amt": "7151",              "nabt_shnu_amt": "4006",              "nabt_ntby_amt": "-3145",              "all_seln_qty": "289",              "all_shnu_qty": "242",              "all_ntby_qty": "-47",              "all_seln_amt": "7151",              "all_shnu_amt": "4006",              "all_ntby_amt": "-3145"          },          {              "invr_cls_code": "6000",              "invr_cls_name": "연기금등",              "arbt_seln_qty": "440",              "arbt_shnu_qty": "410",              "arbt_ntby_qty": "-29",              "arbt_seln_amt": "27863",              "arbt_shnu_amt": "25971",              "arbt_ntby_amt": "-1891",              "nabt_seln_qty": "608",              "nabt_shnu_qty": "474",              "nabt_ntby_qty": "-134",              "nabt_seln_amt": "16795",              "nabt_shnu_amt": "23282",              "nabt_ntby_amt": "6486",              "all_seln_qty": "1049",              "all_shnu_qty": "885",              "all_ntby_qty": "-164",              "all_seln_amt": "44658",              "all_shnu_amt": "49253",              "all_ntby_amt": "4595"          },          {              "invr_cls_code": "5000",              "invr_cls_name": "기타금융",              "arbt_seln_qty": "0",              "arbt_shnu_qty": "0",              "arbt_ntby_qty": "0",              "arbt_seln_amt": "0",              "arbt_shnu_amt": "0",              "arbt_ntby_amt": "0",              "nabt_seln_qty": "0",              "nabt_shnu_qty": "0",              "nabt_ntby_qty": "0",              "nabt_seln_amt": "0",              "nabt_shnu_amt": "20",              "nabt_ntby_amt": "20",              "all_seln_qty": "0",              "all_shnu_qty": "0",              "all_ntby_qty": "0",              "all_seln_amt": "0",              "all_shnu_amt": "20",              "all_ntby_amt": "20"          },          {              "invr_cls_code": "2000",              "invr_cls_name": "보 험",              "arbt_seln_qty": "0",              "arbt_shnu_qty": "0",              "arbt_ntby_qty": "0",              "arbt_seln_amt": "0",              "arbt_shnu_amt": "0",              "arbt_ntby_amt": "0",              "nabt_seln_qty": "211",              "nabt_shnu_qty": "110",              "nabt_ntby_qty": "-101",              "nabt_seln_amt": "12580",              "nabt_shnu_amt": "6296",              "nabt_ntby_amt": "-6283",              "all_seln_qty": "211",              "all_shnu_qty": "110",              "all_ntby_qty": "-101",              "all_seln_amt": "12580",              "all_shnu_amt": "6296",              "al
```

---
### 127. 국내 증시자금 종합

| Field | Value |
|---|---|
| Sheet | `국내 증시자금 종합` |
| Menu | [국내주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/mktfunds` |
| TR_ID (실전) | `FHKST649100C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_INPUT_DATE_1` | 입력날짜1 | string | Y | 10 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `bsop_date` | 영업일자 | string | Y | 8 |  |
| `bstp_nmix_prpr` | 업종지수현재가 | string | Y | 112 |  |
| `bstp_nmix_prdy_vrss` | 업종지수전일대비 | string | Y | 112 |  |
| `prdy_vrss_sign` | 전일대비부호 | string | Y | 1 | 1. 상한 2. 상승 3. 보합 4. 하한 5. 하락 |
| `prdy_ctrt` | 전일대비율 | string | Y | 82 |  |
| `hts_avls` | HTS시가총액 | string | Y | 18 | 단위: 백만원 |
| `cust_dpmn_amt` | 고객예탁금금액 | string | Y | 18 | 단위: 억원 |
| `cust_dpmn_amt_prdy_vrss` | 고객예탁금금액전일대비 | string | Y | 18 |  |
| `amt_tnrt` | 금액회전율 | string | Y | 84 |  |
| `uncl_amt` | 미수금액 | string | Y | 18 | 단위: 억원 |
| `crdt_loan_rmnd` | 신용융자잔고 | string | Y | 18 | 단위: 억원 |
| `futs_tfam_amt` | 선물예수금금액 | string | Y | 18 | 단위: 억원 |
| `sttp_amt` | 주식형금액 | string | Y | 18 | 단위: 억원 |
| `mxtp_amt` | 혼합형금액 | string | Y | 18 | 단위: 억원 |
| `bntp_amt` | 채권형금액 | string | Y | 18 | 단위: 억원 |
| `mmf_amt` | MMF금액 | string | Y | 18 | 단위: 억원 |
| `secu_lend_amt` | 담보대출잔고금액 | string | Y | 18 | 단위: 억원 |

**Request Example:**
```
FID_INPUT_DATE_1:20240503
```

**Response Example:**
```
{      "output": [          {              "bsop_date": "20240430",              "bstp_nmix_prpr": "2692.06",              "bstp_nmix_prdy_vrss": "4.62",              "prdy_vrss_sign": "2",              "prdy_ctrt": "100.17",              "hts_avls": "2193843858",              "cust_dpmn_amt": "572306",              "cust_dpmn_amt_prdy_vrss": "4435",              "amt_tnrt": "33.87",              "uncl_amt": "9289",              "crdt_loan_rmnd": "191730",              "futs_tfam_amt": "112724",              "sttp_amt": "1112330",              "mxtp_amt": "264052",              "bntp_amt": "1497053",              "mmf_amt": "1971372",              "secu_lend_amt": "199663"          },          {              "bsop_date": "20240429",              "bstp_nmix_prpr": "2687.44",              "bstp_nmix_prdy_vrss": "31.11",              "prdy_vrss_sign": "2",              "prdy_ctrt": "101.17",              "hts_avls": "2189691726",              "cust_dpmn_amt": "567872",              "cust_dpmn_amt_prdy_vrss": "2770",              "amt_tnrt": "31.81",              "uncl_amt": "9770",              "crdt_loan_rmnd": "191876",              "futs_tfam_amt": "114477",              "sttp_amt": "1108725",              "mxtp_amt": "264014",              "bntp_amt": "1490082",              "mmf_amt": "1995789",              "secu_lend_amt": "205197"          },          {              "bsop_date": "20240426",              "bstp_nmix_prpr": "2656.33",              "bstp_nmix_prdy_vrss": "27.71",              "prdy_vrss_sign": "2",              "prdy_ctrt": "101.05",              "hts_avls": "2164477451",              "cust_dpmn_amt": "565102",              "cust_dpmn_amt_prdy_vrss": "8389",              "amt_tnrt": "32.27",              "uncl_amt": "9224",              "crdt_loan_rmnd": "190610",              "futs_tfam_amt": "114228",              "sttp_amt": "1099696",              "mxtp_amt": "263514",              "bntp_amt": "1486148",              "mmf_amt": "2014269",              "secu_lend_amt": "200841"          },          {              "bsop_date": "20240425",              "bstp_nmix_prpr": "2628.62",              "bstp_nmix_prdy_vrss": "-47.13",              "prdy_vrss_sign": "5",              "prdy_ctrt": "98.24",              "hts_avls": "2142440795",              "cust_dpmn_amt": "556713",              "cust_dpmn_amt_prdy_vrss": "9753",              "amt_tnrt": "30.55",              "uncl_amt": "9460",              "crdt_loan_rmnd": "190653",              "futs_tfam_amt": "119102",              "sttp_amt": "1091640",              "mxtp_amt": "263032",              "bntp_amt": "1486119",              "mmf_amt": "2034032",              "secu_lend_amt": "197721"          },          {              "bsop_date": "20240424",              "bstp_nmix_prpr": "2675.75",              "bstp_nmix_prdy_vrss": "52.73",              "prdy_vrss_sign": "2",              "prdy_ctrt": "102.01",              "hts_avls": "2180629130",              "cust_dpmn_amt": "
```

---
### 128. 국내주식 예상체결가 추이

| Field | Value |
|---|---|
| Sheet | `국내주식 예상체결가 추이` |
| Menu | [국내주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/exp-price-trend` |
| TR_ID (실전) | `FHPST01810000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `fid_mkop_cls_code` | 장운영 구분 코드 | string | Y | 12 | 0:전체, 4:체결량 0 제외 |
| `fid_cond_mrkt_div_code` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (주식 J) |
| `fid_input_iscd` | 입력 종목코드 | string | Y | 5 | 종목코드(ex. 005930) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `rprs_mrkt_kor_name` | 대표 시장 한글 명 | string | Y | 40 |  |
| `antc_cnpr` | 예상 체결가 | string | Y | 10 |  |
| `antc_cntg_vrss_sign` | 예상 체결 대비 부호 | string | Y | 1 |  |
| `antc_cntg_vrss` | 예상 체결 대비 | string | Y | 10 |  |
| `antc_cntg_prdy_ctrt` | 예상 체결 전일 대비율 | string | Y | 82 |  |
| `antc_vol` | 예상 거래량 | string | Y | 18 |  |
| `antc_tr_pbmn` | 예상 거래대금 | string | Y | 19 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `stck_bsop_date` | 주식 영업 일자 | string | Y | 8 |  |
| `stck_cntg_hour` | 주식 체결 시간 | string | Y | 6 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"J",  "fid_input_iscd":"005930",  "fid_mkop_cls_code":"0"  }
```

**Response Example:**
```
{      "output1": {          "rprs_mrkt_kor_name": "KOSPI200",          "antc_cnpr": "72600",          "antc_cntg_vrss_sign": "2",          "antc_cntg_vrss": "300",          "antc_cntg_prdy_ctrt": "0.41",          "antc_vol": "420303",          "antc_tr_pbmn": "30513997800"      },      "output2": [          {              "stck_bsop_date": "20240318",              "stck_cntg_hour": "090023",              "stck_prpr": "72600",              "prdy_vrss_sign": "2",              "prdy_vrss": "300",              "prdy_ctrt": "0.41",              "acml_vol": "420303"          },          {              "stck_bsop_date": "20240318",              "stck_cntg_hour": "090023",              "stck_prpr": "72600",              "prdy_vrss_sign": "2",              "prdy_vrss": "300",              "prdy_ctrt": "0.41",              "acml_vol": "420196"          },          {              "stck_bsop_date": "20240318",              "stck_cntg_hour": "090023",              "stck_prpr": "72600",              "prdy_vrss_sign": "2",              "prdy_vrss": "300",              "prdy_ctrt": "0.41",              "acml_vol": "420206"          },          {              "stck_bsop_date": "20240318",              "stck_cntg_hour": "090023",              "stck_prpr": "72600",              "prdy_vrss_sign": "2",              "prdy_vrss": "300",              "prdy_ctrt": "0.41",              "acml_vol": "419330"          },          {              "stck_bsop_date": "20240318",              "stck_cntg_hour": "090022",              "stck_prpr": "72600",              "prdy_vrss_sign": "2",              "prdy_vrss": "300",              "prdy_ctrt": "0.41",              "acml_vol": "419131"          },          {              "stck_bsop_date": "20240318",              "stck_cntg_hour": "090022",              "stck_prpr": "72600",              "prdy_vrss_sign": "2",              "prdy_vrss": "300",              "prdy_ctrt": "0.41",              "acml_vol": "418134"          },          {              "stck_bsop_date": "20240318",              "stck_cntg_hour": "090022",              "stck_prpr": "72600",              "prdy_vrss_sign": "2",              "prdy_vrss": "300",              "prdy_ctrt": "0.41",              "acml_vol": "418123"          },          {              "stck_bsop_date": "20240318",              "stck_cntg_hour": "090021",              "stck_prpr": "72600",              "prdy_vrss_sign": "2",              "prdy_vrss": "300",              "prdy_ctrt": "0.41",              "acml_vol": "418123"          },          {              "stck_bsop_date": "20240318",              "stck_cntg_hour": "090020",              "stck_prpr": "72600",              "prdy_vrss_sign": "2",              "prdy_vrss": "300",              "prdy_ctrt": "0.41",              "acml_vol": "418123"          },          {              "stck_bsop_date": "20240318",              "stck_cntg_hour": "090019",              "stck_prpr": "72600",              "prdy_vrss_sign": "2",              "prdy_vrs
```

---
### 129. 회원사 실시간 매매동향(틱)

| Field | Value |
|---|---|
| Sheet | `회원사 실시간 매매동향(틱)` |
| Menu | [국내주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/frgnmem-trade-trend` |
| TR_ID (실전) | `FHPST04320000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | FID 조건 시장 분류 코드 | string | Y | 2 | J 고정 입력 |
| `FID_COND_SCR_DIV_CODE` | 화면분류코드 | string | Y | 5 | 20432(primary key) |
| `FID_INPUT_ISCD` | 종목코드 | string | Y | 12 | ex. 005930(삼성전자)     ※ FID_INPUT_ISCD(종목코드) 혹은 FID_MRKT_CLS_CODE(시장구분코드) 둘 중 하나만 입력 |
| `FID_INPUT_ISCD_2` | 회원사코드 | string | Y | 10 | ex. 99999(전체)    ※ 회원사코드 (kis developers 포탈 사이트 포럼-> FAQ -> 종목정보 다운로드(국내) 참조) |
| `FID_MRKT_CLS_CODE` | 시장구분코드 | string | Y | 2 | A(전체),K(코스피), Q(코스닥), K2(코스피200), W(ELW)    ※ FID_INPUT_ISCD(종목코드) 혹은 FID_MRKT_CLS_CODE(시장구분코드) 둘 중 하나만 입력 |
| `FID_VOL_CNT` | 거래량 | string | Y | 12 | 거래량 ~ |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  | array |
| `total_seln_qty` | 총매도수량 | string | Y | 18 |  |
| `total_shnu_qty` | 총매수2수량 | string | Y | 18 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `bsop_hour` | 영업시간 | string | Y | 6 |  |
| `mbcr_name` | 회원사명 | string | Y | 50 |  |
| `hts_kor_isnm` | HTS한글종목명 | string | Y | 40 |  |
| `stck_prpr` | 주식현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일대비부호 | string | Y | 1 |  |
| `cntg_vol` | 체결거래량 | string | Y | 18 |  |
| `acml_ntby_qty` | 누적순매수수량 | string | Y | 18 |  |
| `glob_ntby_qty` | 외국계순매수수량 | string | Y | 12 |  |
| `frgn_ntby_qty_icdc` | 외국인순매수수량증감 | string | Y | 10 |  |

**Request Example:**
```
FID_COND_SCR_DIV_CODE:20432  FID_INPUT_ISCD:005930  FID_INPUT_ISCD2:99999  FID_MRKT_CLS_CODE:  FID_VOL_CNT:
```

**Response Example:**
```
{      "output1": [          {              "total_seln_qty": "3403046",              "total_shnu_qty": "1539165"          }      ],      "output2": [          {              "bsop_hour": "153025",              "mbcr_name": "JP모간",              "hts_kor_isnm": "삼성전자",              "stck_prpr": "75200",              "prdy_vrss": "-500",              "prdy_vrss_sign": "5",              "cntg_vol": "168484",              "acml_ntby_qty": "1473742",              "glob_ntby_qty": "-1863881",              "frgn_ntby_qty_icdc": "168484"          },          {              "bsop_hour": "153025",              "mbcr_name": "메릴린치",              "hts_kor_isnm": "삼성전자",              "stck_prpr": "75200",              "prdy_vrss": "-500",              "prdy_vrss_sign": "5",              "cntg_vol": "-188645",              "acml_ntby_qty": "-938293",              "glob_ntby_qty": "-2032365",              "frgn_ntby_qty_icdc": "-188645"          },          {              "bsop_hour": "153025",              "mbcr_name": "씨티그룹",              "hts_kor_isnm": "삼성전자",              "stck_prpr": "75200",              "prdy_vrss": "-500",              "prdy_vrss_sign": "5",              "cntg_vol": "-135506",              "acml_ntby_qty": "-2308688",              "glob_ntby_qty": "-1843720",              "frgn_ntby_qty_icdc": "-135506"          },          {              "bsop_hour": "152020",              "mbcr_name": "JP모간",              "hts_kor_isnm": "삼성전자",              "stck_prpr": "75500",              "prdy_vrss": "-200",              "prdy_vrss_sign": "5",              "cntg_vol": "139",              "acml_ntby_qty": "1305258",              "glob_ntby_qty": "-1708214",              "frgn_ntby_qty_icdc": "139"          },          {              "bsop_hour": "151904",              "mbcr_name": "JP모간",              "hts_kor_isnm": "삼성전자",              "stck_prpr": "75400",              "prdy_vrss": "-300",              "prdy_vrss_sign": "5",              "cntg_vol": "2271",              "acml_ntby_qty": "1305119",              "glob_ntby_qty": "-1708353",              "frgn_ntby_qty_icdc": "2271"          },          {              "bsop_hour": "151749",              "mbcr_name": "JP모간",              "hts_kor_isnm": "삼성전자",              "stck_prpr": "75300",              "prdy_vrss": "-400",              "prdy_vrss_sign": "5",              "cntg_vol": "23867",              "acml_ntby_qty": "1302848",              "glob_ntby_qty": "-1710624",              "frgn_ntby_qty_icdc": "23867"          },...      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 130. 시장별 투자자매매동향(시세)

| Field | Value |
|---|---|
| Sheet | `시장별 투자자매매동향(시세)` |
| Menu | [국내주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/inquire-investor-time-by-market` |
| TR_ID (실전) | `FHPTJ04030000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `fid_input_iscd` | 시장구분 | string | Y | 12 | 코스피: KSP, 코스닥:KSQ,  선물,콜옵션,풋옵션 : K2I, 주식선물:999,  ETF: ETF, ELW:ELW, ETN: ETN,   미니: MKI, 위클리월 : WKM, 위클리목: WKI  코스닥150: KQI |
| `fid_input_iscd_2` | 업종구분 | string | Y | 8 | - fid_input_iscd: KSP(코스피) 혹은 KSQ(코스닥)인 경우  코스피(0001_종합, .…0027_제조업 )  코스닥(1001_종합, …. 1041_IT부품)  ...  포탈 (FAQ : 종목정보 다운로드(국내) - 업종코드 참조)    - fid_input_iscd가 K2I인 경우  F001(선물)  OC01(콜옵션)  OP01(풋옵션)    - fid_input_iscd가 999인 경우  S001(주식선물)    - fid_input_iscd가 ETF인 경우  T000(ETF)    - fid_input_iscd가 ELW인 경우  W000(ELW)    - fid_input_iscd가 ETN인 경우  E199(ETN)    - fid_input_iscd가 MKI인 경우  F004(미니선물)  OC02(미니콜옵션)  OP02(미니풋옵션)    - fid_input_iscd가 WKM인 경우  OC05(위클리콜(월))  OP05(위클리풋(월))    - fid_input_iscd가 WKI인 경우  OC04(위클리콜(목))  OP04(위클리풋(목))       - fid_input_iscd가 KQI인 경우  F002(코스닥150선물)  OC03(코스닥150콜옵션)  OP03(코스닥150풋옵션) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object | Y |  |  |
| `frgn_seln_vol` | 외국인 매도 거래량 | string | Y | 18 |  |
| `frgn_shnu_vol` | 외국인 매수2 거래량 | string | Y | 18 |  |
| `frgn_ntby_qty` | 외국인 순매수 수량 | string | Y | 12 |  |
| `frgn_seln_tr_pbmn` | 외국인 매도 거래 대금 | string | Y | 18 |  |
| `frgn_shnu_tr_pbmn` | 외국인 매수2 거래 대금 | string | Y | 18 |  |
| `frgn_ntby_tr_pbmn` | 외국인 순매수 거래 대금 | string | Y | 18 |  |
| `prsn_seln_vol` | 개인 매도 거래량 | string | Y | 18 |  |
| `prsn_shnu_vol` | 개인 매수2 거래량 | string | Y | 18 |  |
| `prsn_ntby_qty` | 개인 순매수 수량 | string | Y | 12 |  |
| `prsn_seln_tr_pbmn` | 개인 매도 거래 대금 | string | Y | 18 |  |
| `prsn_shnu_tr_pbmn` | 개인 매수2 거래 대금 | string | Y | 18 |  |
| `prsn_ntby_tr_pbmn` | 개인 순매수 거래 대금 | string | Y | 18 |  |
| `orgn_seln_vol` | 기관계 매도 거래량 | string | Y | 18 |  |
| `orgn_shnu_vol` | 기관계 매수2 거래량 | string | Y | 18 |  |
| `orgn_ntby_qty` | 기관계 순매수 수량 | string | Y | 18 |  |
| `orgn_seln_tr_pbmn` | 기관계 매도 거래 대금 | string | Y | 18 |  |
| `orgn_shnu_tr_pbmn` | 기관계 매수2 거래 대금 | string | Y | 18 |  |
| `orgn_ntby_tr_pbmn` | 기관계 순매수 거래 대금 | string | Y | 18 |  |
| `scrt_seln_vol` | 증권 매도 거래량 | string | Y | 18 |  |
| `scrt_shnu_vol` | 증권 매수2 거래량 | string | Y | 18 |  |
| `scrt_ntby_qty` | 증권 순매수 수량 | string | Y | 12 |  |
| `scrt_seln_tr_pbmn` | 증권 매도 거래 대금 | string | Y | 18 |  |
| `scrt_shnu_tr_pbmn` | 증권 매수2 거래 대금 | string | Y | 18 |  |
| `scrt_ntby_tr_pbmn` | 증권 순매수 거래 대금 | string | Y | 18 |  |
| `ivtr_seln_vol` | 투자신탁 매도 거래량 | string | Y | 18 |  |
| `ivtr_shnu_vol` | 투자신탁 매수2 거래량 | string | Y | 18 |  |
| `ivtr_ntby_qty` | 투자신탁 순매수 수량 | string | Y | 12 |  |
| `ivtr_seln_tr_pbmn` | 투자신탁 매도 거래 대금 | string | Y | 18 |  |
| `ivtr_shnu_tr_pbmn` | 투자신탁 매수2 거래 대금 | string | Y | 18 |  |
| `ivtr_ntby_tr_pbmn` | 투자신탁 순매수 거래 대금 | string | Y | 18 |  |
| `pe_fund_seln_tr_pbmn` | 사모 펀드 매도 거래 대금 | string | Y | 18 |  |
| `pe_fund_seln_vol` | 사모 펀드 매도 거래량 | string | Y | 18 |  |
| `pe_fund_ntby_vol` | 사모 펀드 순매수 거래량 | string | Y | 18 |  |
| `pe_fund_shnu_tr_pbmn` | 사모 펀드 매수2 거래 대금 | string | Y | 18 |  |
| `pe_fund_shnu_vol` | 사모 펀드 매수2 거래량 | string | Y | 18 |  |
| `pe_fund_ntby_tr_pbmn` | 사모 펀드 순매수 거래 대금 | string | Y | 18 |  |
| `bank_seln_vol` | 은행 매도 거래량 | string | Y | 18 |  |
| `bank_shnu_vol` | 은행 매수2 거래량 | string | Y | 18 |  |
| `bank_ntby_qty` | 은행 순매수 수량 | string | Y | 12 |  |
| `bank_seln_tr_pbmn` | 은행 매도 거래 대금 | string | Y | 18 |  |
| `bank_shnu_tr_pbmn` | 은행 매수2 거래 대금 | string | Y | 18 |  |
| `bank_ntby_tr_pbmn` | 은행 순매수 거래 대금 | string | Y | 18 |  |
| `insu_seln_vol` | 보험 매도 거래량 | string | Y | 18 |  |
| `insu_shnu_vol` | 보험 매수2 거래량 | string | Y | 18 |  |
| `insu_ntby_qty` | 보험 순매수 수량 | string | Y | 12 |  |
| `insu_seln_tr_pbmn` | 보험 매도 거래 대금 | string | Y | 18 |  |
| `insu_shnu_tr_pbmn` | 보험 매수2 거래 대금 | string | Y | 18 |  |
| `insu_ntby_tr_pbmn` | 보험 순매수 거래 대금 | string | Y | 18 |  |
| `mrbn_seln_vol` | 종금 매도 거래량 | string | Y | 18 |  |
| `mrbn_shnu_vol` | 종금 매수2 거래량 | string | Y | 18 |  |
| `mrbn_ntby_qty` | 종금 순매수 수량 | string | Y | 12 |  |
| `mrbn_seln_tr_pbmn` | 종금 매도 거래 대금 | string | Y | 18 |  |
| `mrbn_shnu_tr_pbmn` | 종금 매수2 거래 대금 | string | Y | 18 |  |
| `mrbn_ntby_tr_pbmn` | 종금 순매수 거래 대금 | string | Y | 18 |  |
| `fund_seln_vol` | 기금 매도 거래량 | string | Y | 18 |  |
| `fund_shnu_vol` | 기금 매수2 거래량 | string | Y | 18 |  |
| `fund_ntby_qty` | 기금 순매수 수량 | string | Y | 12 |  |
| `fund_seln_tr_pbmn` | 기금 매도 거래 대금 | string | Y | 18 |  |
| `fund_shnu_tr_pbmn` | 기금 매수2 거래 대금 | string | Y | 18 |  |
| `fund_ntby_tr_pbmn` | 기금 순매수 거래 대금 | string | Y | 18 |  |
| `etc_orgt_seln_vol` | 기타 단체 매도 거래량 | string | Y | 18 |  |
| `etc_orgt_shnu_vol` | 기타 단체 매수2 거래량 | string | Y | 18 |  |
| `etc_orgt_ntby_vol` | 기타 단체 순매수 거래량 | string | Y | 18 |  |
| `etc_orgt_seln_tr_pbmn` | 기타 단체 매도 거래 대금 | string | Y | 18 |  |
| `etc_orgt_shnu_tr_pbmn` | 기타 단체 매수2 거래 대금 | string | Y | 18 |  |
| `etc_orgt_ntby_tr_pbmn` | 기타 단체 순매수 거래 대금 | string | Y | 18 |  |
| `etc_corp_seln_vol` | 기타 법인 매도 거래량 | string | Y | 18 |  |
| `etc_corp_shnu_vol` | 기타 법인 매수2 거래량 | string | Y | 18 |  |
| `etc_corp_ntby_vol` | 기타 법인 순매수 거래량 | string | Y | 18 |  |
| `etc_corp_seln_tr_pbmn` | 기타 법인 매도 거래 대금 | string | Y | 18 |  |
| `etc_corp_shnu_tr_pbmn` | 기타 법인 매수2 거래 대금 | string | Y | 18 |  |
| `etc_corp_ntby_tr_pbmn` | 기타 법인 순매수 거래 대금 | string | Y | 18 |  |

**Request Example:**
```
{  "FID_INPUT_ISCD":"KSP",  "FID_INPUT_ISCD_2":"0001"  }
```

**Response Example:**
```
{      "output": [          {              "frgn_seln_vol": "75588",              "frgn_shnu_vol": "70298",              "frgn_ntby_qty": "-5290",              "frgn_seln_tr_pbmn": "2818983",              "frgn_shnu_tr_pbmn": "2967639",              "frgn_ntby_tr_pbmn": "148656",              "prsn_seln_vol": "294375",              "prsn_shnu_vol": "300449",              "prsn_ntby_qty": "6074",              "prsn_seln_tr_pbmn": "5131230",              "prsn_shnu_tr_pbmn": "5020361",              "prsn_ntby_tr_pbmn": "-110869",              "orgn_seln_vol": "36911",              "orgn_shnu_vol": "37631",              "orgn_ntby_qty": "720",              "orgn_seln_tr_pbmn": "2110371",              "orgn_shnu_tr_pbmn": "2054839",              "orgn_ntby_tr_pbmn": "-55532",              "scrt_seln_vol": "8493",              "scrt_shnu_vol": "12126",              "scrt_ntby_qty": "3633",              "scrt_seln_tr_pbmn": "384357",              "scrt_shnu_tr_pbmn": "472598",              "scrt_ntby_tr_pbmn": "88241",              "ivtr_seln_vol": "4086",              "ivtr_shnu_vol": "3964",              "ivtr_ntby_qty": "-122",              "ivtr_seln_tr_pbmn": "177374",              "ivtr_shnu_tr_pbmn": "165434",              "ivtr_ntby_tr_pbmn": "-11940",              "pe_fund_seln_tr_pbmn": "213413",              "pe_fund_seln_vol": "4833",              "pe_fund_ntby_vol": "-1804",              "pe_fund_shnu_tr_pbmn": "115551",              "pe_fund_shnu_vol": "3029",              "pe_fund_ntby_tr_pbmn": "-97861",              "bank_seln_vol": "245",              "bank_shnu_vol": "51",              "bank_ntby_qty": "-193",              "bank_seln_tr_pbmn": "13382",              "bank_shnu_tr_pbmn": "2873",              "bank_ntby_tr_pbmn": "-10509",              "insu_seln_vol": "1653",              "insu_shnu_vol": "1050",              "insu_ntby_qty": "-603",              "insu_seln_tr_pbmn": "79782",              "insu_shnu_tr_pbmn": "50378",              "insu_ntby_tr_pbmn": "-29404",              "mrbn_seln_vol": "230",              "mrbn_shnu_vol": "310",              "mrbn_ntby_qty": "80",              "mrbn_seln_tr_pbmn": "10393",              "mrbn_shnu_tr_pbmn": "11896",              "mrbn_ntby_tr_pbmn": "1502",              "fund_seln_vol": "17372",              "fund_shnu_vol": "17101",              "fund_ntby_qty": "-271",              "fund_seln_tr_pbmn": "1231671",              "fund_shnu_tr_pbmn": "1236109",              "fund_ntby_tr_pbmn": "4439",              "etc_orgt_seln_vol": "0",              "etc_orgt_shnu_vol": "0",              "etc_orgt_ntby_vol": "0",              "etc_orgt_seln_tr_pbmn": "0",              "etc_orgt_shnu_tr_pbmn": "0",              "etc_orgt_ntby_tr_pbmn": "0",              "etc_corp_seln_vol": "5061",              "etc_corp_shnu_vol": "3558",              "etc_corp_ntby_vol": "-1503",              "etc_corp_seln_tr_pbmn": "95856",              "etc_corp_shnu_tr_pbmn": "113601",              "etc_corp
```

---
### 131. 종목별 프로그램매매추이(체결)

| Field | Value |
|---|---|
| Sheet | `종목별 프로그램매매추이(체결)` |
| Menu | [국내주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/program-trade-by-stock` |
| TR_ID (실전) | `FHPPG04650101` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | KRX : J , NXT : NX, 통합 : UN |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `bsop_hour` | 영업 시간 | string | Y | 6 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `whol_smtn_seln_vol` | 전체 합계 매도 거래량 | string | Y | 18 |  |
| `whol_smtn_shnu_vol` | 전체 합계 매수2 거래량 | string | Y | 18 |  |
| `whol_smtn_ntby_qty` | 전체 합계 순매수 수량 | string | Y | 18 |  |
| `whol_smtn_seln_tr_pbmn` | 전체 합계 매도 거래 대금 | string | Y | 18 |  |
| `whol_smtn_shnu_tr_pbmn` | 전체 합계 매수2 거래 대금 | string | Y | 18 |  |
| `whol_smtn_ntby_tr_pbmn` | 전체 합계 순매수 거래 대금 | string | Y | 18 |  |
| `whol_ntby_vol_icdc` | 전체 순매수 거래량 증감 | string | Y | 10 |  |
| `whol_ntby_tr_pbmn_icdc` | 전체 순매수 거래 대금 증감 | string | Y | 10 |  |

---
### 132. 외국계 매매종목 가집계

| Field | Value |
|---|---|
| Sheet | `외국계 매매종목 가집계` |
| Menu | [국내주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/frgnmem-trade-estimate` |
| TR_ID (실전) | `FHKST644100C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건시장분류코드 | string | Y | 2 | 시장구분코드 (J) |
| `FID_COND_SCR_DIV_CODE` | 조건화면분류코드 | string | Y | 5 | Uniquekey (16441) |
| `FID_INPUT_ISCD` | 입력종목코드 | string | Y | 12 | 0000(전체), 1001(코스피), 2001(코스닥) |
| `FID_RANK_SORT_CLS_CODE` | 순위정렬구분코드 | string | Y | 2 | 0(금액순), 1(수량순) |
| `FID_RANK_SORT_CLS_CODE_2` | 순위정렬구분코드2 | string | Y | 2 | 0(매수순), 1(매도순) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stck_shrn_iscd` | 주식단축종목코드 | string | Y | 9 |  |
| `hts_kor_isnm` | HTS한글종목명 | string | Y | 40 |  |
| `glob_ntsl_qty` | 외국계순매도수량 | string | Y | 12 |  |
| `stck_prpr` | 주식현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일대비부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일대비율 | string | Y | 82 |  |
| `acml_vol` | 누적거래량 | string | Y | 18 |  |
| `glob_total_seln_qty` | 외국계총매도수량 | string | Y | 18 |  |
| `glob_total_shnu_qty` | 외국계총매수2수량 | string | Y | 18 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:J  FID_COND_SCR_DIV_CODE:16441  FID_INPUT_ISCD:0000  FID_RANK_SORT_CLS_CODE:0  FID_RANK_SORT_CLS_CODE_2:0
```

**Response Example:**
```
{      "output": [          {              "stck_shrn_iscd": "005930",              "hts_kor_isnm": "삼성전자",              "glob_ntsl_qty": "3870530",              "stck_prpr": "81300",              "prdy_vrss": "3700",              "prdy_vrss_sign": "2",              "prdy_ctrt": "4.77",              "acml_vol": "24892595",              "glob_total_seln_qty": "547879",              "glob_total_shnu_qty": "4418409"          },          {              "stck_shrn_iscd": "000660",              "hts_kor_isnm": "SK하이닉스",              "glob_ntsl_qty": "964256",              "stck_prpr": "179600",              "prdy_vrss": "6400",              "prdy_vrss_sign": "2",              "prdy_ctrt": "3.70",              "acml_vol": "4333233",              "glob_total_seln_qty": "680043",              "glob_total_shnu_qty": "1644299"          },          {              "stck_shrn_iscd": "267260",              "hts_kor_isnm": "HD현대일렉트릭",              "glob_ntsl_qty": "329507",              "stck_prpr": "252000",              "prdy_vrss": "22000",              "prdy_vrss_sign": "2",              "prdy_ctrt": "9.57",              "acml_vol": "955597",              "glob_total_seln_qty": "87986",              "glob_total_shnu_qty": "417493"          },          {              "stck_shrn_iscd": "005935",              "hts_kor_isnm": "삼성전자우",              "glob_ntsl_qty": "455400",              "stck_prpr": "66900",              "prdy_vrss": "2300",              "prdy_vrss_sign": "2",              "prdy_ctrt": "3.56",              "acml_vol": "1554888",              "glob_total_seln_qty": "211634",              "glob_total_shnu_qty": "667034"          },          {              "stck_shrn_iscd": "011070",              "hts_kor_isnm": "LG이노텍",              "glob_ntsl_qty": "79842",              "stck_prpr": "239500",              "prdy_vrss": "5000",              "prdy_vrss_sign": "2",              "prdy_ctrt": "2.13",              "acml_vol": "283787",              "glob_total_seln_qty": "0",              "glob_total_shnu_qty": "79842"          },          {              "stck_shrn_iscd": "012450",              "hts_kor_isnm": "한화에어로스페이스",              "glob_ntsl_qty": "56853",              "stck_prpr": "218500",              "prdy_vrss": "3000",              "prdy_vrss_sign": "2",              "prdy_ctrt": "1.39",              "acml_vol": "334636",              "glob_total_seln_qty": "15218",              "glob_total_shnu_qty": "72071"          },          {              "stck_shrn_iscd": "010140",              "hts_kor_isnm": "삼성중공업",              "glob_ntsl_qty": "1230023",              "stck_prpr": "9600",              "prdy_vrss": "210",              "prdy_vrss_sign": "2",              "prdy_ctrt": "2.24",              "acml_vol": "7158181",              "glob_total_seln_qty": "0",              "glob_total_shnu_qty": "1230023"          },          {              "stck_shrn_iscd": "009150",              "hts_kor_isnm": "삼성전기",              "glob_ntsl_qty": "73431", 
```

---
### 133. 국내주식 시간외예상체결등락률

| Field | Value |
|---|---|
| Sheet | `국내주식 시간외예상체결등락률` |
| Menu | [국내주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ranking/overtime-exp-trans-fluct` |
| TR_ID (실전) | `FHKST11860000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (J: 주식) |
| `FID_COND_SCR_DIV_CODE` | 조건 화면 분류 코드 | string | Y | 5 | Unique key(11186) |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 0000(전체), 0001(코스피), 1001(코스닥) |
| `FID_RANK_SORT_CLS_CODE` | 순위 정렬 구분 코드 | string | Y | 2 | 0(상승률), 1(상승폭), 2(보합), 3(하락률), 4(하락폭) |
| `FID_DIV_CLS_CODE` | 분류 구분 코드 | string | Y | 2 | '0(전체), 1(관리종목), 2(투자주의), 3(투자경고),   4(투자위험예고), 5(투자위험), 6(보통주), 7(우선주)' |
| `FID_INPUT_PRICE_1` | 입력 가격1 | string | Y | 12 | 가격 ~ |
| `FID_INPUT_PRICE_2` | 입력 가격2 | string | Y | 12 | 공백 |
| `FID_INPUT_VOL_1` | 입력 거래량 | string | Y | 18 | 거래량 ~ |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object | Y |  |  |
| `data_rank` | 데이터 순위 | string | Y | 10 |  |
| `iscd_stat_cls_code` | 종목 상태 구분 코드 | string | Y | 3 |  |
| `stck_shrn_iscd` | 주식 단축 종목코드 | string | Y | 9 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `ovtm_untp_antc_cnpr` | 시간외 단일가 예상 체결가 | string | Y | 10 |  |
| `ovtm_untp_antc_cntg_vrss` | 시간외 단일가 예상 체결 대비 | string | Y | 10 |  |
| `ovtm_untp_antc_cntg_vrsssign` | 시간외 단일가 예상 체결 대비 | string | Y | 1 |  |
| `ovtm_untp_antc_cntg_ctrt` | 시간외 단일가 예상 체결 대비율 | string | Y | 82 |  |
| `ovtm_untp_askp_rsqn1` | 시간외 단일가 매도호가 잔량1 | string | Y | 12 |  |
| `ovtm_untp_bidp_rsqn1` | 시간외 단일가 매수호가 잔량1 | string | Y | 12 |  |
| `ovtm_untp_antc_cnqn` | 시간외 단일가 예상 체결량 | string | Y | 18 |  |
| `itmt_vol` | 장중 거래량 | string | Y | 18 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:J  FID_COND_SCR_DIV_CODE:11186  FID_INPUT_ISCD:0000  FID_RANK_SORT_CLS_CODE:0  FID_DIV_CLS_CODE:0  FID_INPUT_PRICE_1:  FID_INPUT_PRICE_2:  FID_INPUT_VOL_1:
```

**Response Example:**
```
{      "output": [          {              "data_rank": "1",              "iscd_stat_cls_code": "57",              "stck_shrn_iscd": "025820",              "hts_kor_isnm": "이구산업",              "ovtm_untp_antc_cnpr": "6270",              "ovtm_untp_antc_cntg_vrss": "570",              "ovtm_untp_antc_cntg_vrss_sign": "1",              "ovtm_untp_antc_cntg_ctrt": "10.00",              "ovtm_untp_askp_rsqn1": "231200",              "ovtm_untp_bidp_rsqn1": "394",              "ovtm_untp_antc_cnqn": "253267",              "itmt_vol": "14355442",              "stck_prpr": "5700"          },          {              "data_rank": "2",              "iscd_stat_cls_code": "57",              "stck_shrn_iscd": "024840",              "hts_kor_isnm": "KBI메탈",              "ovtm_untp_antc_cnpr": "1805",              "ovtm_untp_antc_cntg_vrss": "164",              "ovtm_untp_antc_cntg_vrss_sign": "1",              "ovtm_untp_antc_cntg_ctrt": "9.99",              "ovtm_untp_askp_rsqn1": "0",              "ovtm_untp_bidp_rsqn1": "1512765",              "ovtm_untp_antc_cnqn": "25869",              "itmt_vol": "13518874",              "stck_prpr": "1641"          },          {              "data_rank": "3",              "iscd_stat_cls_code": "57",              "stck_shrn_iscd": "097800",              "hts_kor_isnm": "윈팩",              "ovtm_untp_antc_cnpr": "1334",              "ovtm_untp_antc_cntg_vrss": "121",              "ovtm_untp_antc_cntg_vrss_sign": "1",              "ovtm_untp_antc_cntg_ctrt": "9.98",              "ovtm_untp_askp_rsqn1": "150248",              "ovtm_untp_bidp_rsqn1": "300",              "ovtm_untp_antc_cnqn": "40546",              "itmt_vol": "1020359",              "stck_prpr": "1213"          },          {              "data_rank": "4",              "iscd_stat_cls_code": "57",              "stck_shrn_iscd": "060280",              "hts_kor_isnm": "큐렉소",              "ovtm_untp_antc_cnpr": "13460",              "ovtm_untp_antc_cntg_vrss": "1220",              "ovtm_untp_antc_cntg_vrss_sign": "1",              "ovtm_untp_antc_cntg_ctrt": "9.97",              "ovtm_untp_askp_rsqn1": "0",              "ovtm_untp_bidp_rsqn1": "5409",              "ovtm_untp_antc_cnqn": "4769",              "itmt_vol": "233482",              "stck_prpr": "12240"          },          {              "data_rank": "5",              "iscd_stat_cls_code": "57",              "stck_shrn_iscd": "206650",              "hts_kor_isnm": "유바이오로직스",              "ovtm_untp_antc_cnpr": "13270",              "ovtm_untp_antc_cntg_vrss": "1200",              "ovtm_untp_antc_cntg_vrss_sign": "1",              "ovtm_untp_antc_cntg_ctrt": "9.94",              "ovtm_untp_askp_rsqn1": "23618",              "ovtm_untp_bidp_rsqn1": "8",              "ovtm_untp_antc_cnqn": "20021",              "itmt_vol": "182132",              "stck_prpr": "12070"          },          {              "data_rank": "6",              "iscd_stat_cls_code": "51",              "stck_shrn_iscd": "008110",        
```

---
### 134. 종목별 외국계 순매수추이

| Field | Value |
|---|---|
| Sheet | `종목별 외국계 순매수추이` |
| Menu | [국내주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/frgnmem-pchs-trend` |
| TR_ID (실전) | `FHKST644400C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_INPUT_ISCD` | 조건시장분류코드 | string | Y | 12 | 종목코드(ex) 005930(삼성전자)) |
| `FID_INPUT_ISCD_2` | 조건화면분류코드 | string | Y | 8 | 외국계 전체(99999) |
| `FID_COND_MRKT_DIV_CODE` | 시장구분코드 | string | Y | 10 | J (KRX만 지원) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `bsop_hour` | 영업시간 | string | Y | 6 |  |
| `stck_prpr` | 주식현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일대비부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일대비율 | string | Y | 82 |  |
| `acml_vol` | 누적거래량 | string | Y | 18 |  |
| `frgn_seln_vol` | 외국인매도거래량 | string | Y | 18 |  |
| `frgn_shnu_vol` | 외국인매수2거래량 | string | Y | 18 |  |
| `glob_ntby_qty` | 외국계순매수수량 | string | Y | 12 |  |
| `frgn_ntby_qty_icdc` | 외국인순매수수량증감 | string | Y | 10 |  |

**Request Example:**
```
FID_INPUT_ISCD:005930  FID_INPUT_ISCD_2:99999
```

**Response Example:**
```
{      "output": [          {              "bsop_hour": "153106",              "stck_prpr": "81300",              "prdy_vrss": "3700",              "prdy_vrss_sign": "2",              "prdy_ctrt": "4.77",              "acml_vol": "24771461",              "frgn_seln_vol": "547879",              "frgn_shnu_vol": "4418409",              "glob_ntby_qty": "3870530",              "frgn_ntby_qty_icdc": "194396"          },          {              "bsop_hour": "151952",              "stck_prpr": "81200",              "prdy_vrss": "3600",              "prdy_vrss_sign": "2",              "prdy_ctrt": "4.64",              "acml_vol": "23517309",              "frgn_seln_vol": "547879",              "frgn_shnu_vol": "4224013",              "glob_ntby_qty": "3676134",              "frgn_ntby_qty_icdc": "3123"          },          {              "bsop_hour": "151836",              "stck_prpr": "81100",              "prdy_vrss": "3500",              "prdy_vrss_sign": "2",              "prdy_ctrt": "4.51",              "acml_vol": "23404992",              "frgn_seln_vol": "547879",              "frgn_shnu_vol": "4220890",              "glob_ntby_qty": "3673011",              "frgn_ntby_qty_icdc": "1700"          },          {              "bsop_hour": "151724",              "stck_prpr": "81100",              "prdy_vrss": "3500",              "prdy_vrss_sign": "2",              "prdy_ctrt": "4.51",              "acml_vol": "23374199",              "frgn_seln_vol": "547879",              "frgn_shnu_vol": "4219190",              "glob_ntby_qty": "3671311",              "frgn_ntby_qty_icdc": "1261"          },          {              "bsop_hour": "151613",              "stck_prpr": "81100",              "prdy_vrss": "3500",              "prdy_vrss_sign": "2",              "prdy_ctrt": "4.51",              "acml_vol": "23327774",              "frgn_seln_vol": "547879",              "frgn_shnu_vol": "4217929",              "glob_ntby_qty": "3670050",              "frgn_ntby_qty_icdc": "5152"          },          {              "bsop_hour": "151503",              "stck_prpr": "81100",              "prdy_vrss": "3500",              "prdy_vrss_sign": "2",              "prdy_ctrt": "4.51",              "acml_vol": "23255295",              "frgn_seln_vol": "547879",              "frgn_shnu_vol": "4212777",              "glob_ntby_qty": "3664898",              "frgn_ntby_qty_icdc": "181"          },          {              "bsop_hour": "151355",              "stck_prpr": "81200",              "prdy_vrss": "3600",              "prdy_vrss_sign": "2",              "prdy_ctrt": "4.64",              "acml_vol": "23222914",              "frgn_seln_vol": "547879",              "frgn_shnu_vol": "4212596",              "glob_ntby_qty": "3664717",              "frgn_ntby_qty_icdc": "87"          },          {              "bsop_hour": "151245",              "stck_prpr": "81200",              "prdy_vrss": "3600",              "prdy_vrss_sign": "2",              "prdy_ctrt": "4.64",    
```

---
### 135. 관심종목(멀티종목) 시세조회

| Field | Value |
|---|---|
| Sheet | `관심종목(멀티종목) 시세조회` |
| Menu | [국내주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/intstock-multprice` |
| TR_ID (실전) | `FHKST11300006` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE_1` | 조건 시장 분류 코드1 | string | Y | 2 | 그룹별종목조회 결과 fid_mrkt_cls_code(시장구분) 1 입력  J: KRX, NX: NXT, UN: 통합  ex) J |
| `FID_INPUT_ISCD_1` | 입력 종목코드1 | string | Y | 16 | 그룹별종목조회 결과 jong_code(종목코드) 1 입력  ex) 005930 |
| `FID_COND_MRKT_DIV_CODE_2` | 조건 시장 분류 코드2 | string | Y | 2 |  |
| `FID_INPUT_ISCD_2` | 입력 종목코드2 | string | Y | 16 |  |
| `FID_COND_MRKT_DIV_CODE_3` | 조건 시장 분류 코드3 | string | Y | 2 |  |
| `FID_INPUT_ISCD_3` | 입력 종목코드3 | string | Y | 16 |  |
| `FID_COND_MRKT_DIV_CODE_4` | 조건 시장 분류 코드4 | string | Y | 2 |  |
| `FID_INPUT_ISCD_4` | 입력 종목코드4 | string | Y | 16 |  |
| `FID_COND_MRKT_DIV_CODE_5` | 조건 시장 분류 코드5 | string | Y | 2 |  |
| `FID_INPUT_ISCD_5` | 입력 종목코드5 | string | Y | 16 |  |
| `FID_COND_MRKT_DIV_CODE_6` | 조건 시장 분류 코드6 | string | Y | 2 |  |
| `FID_INPUT_ISCD_6` | 입력 종목코드6 | string | Y | 16 |  |
| `FID_COND_MRKT_DIV_CODE_7` | 조건 시장 분류 코드7 | string | Y | 2 |  |
| `FID_INPUT_ISCD_7` | 입력 종목코드7 | string | Y | 16 |  |
| `FID_COND_MRKT_DIV_CODE_8` | 조건 시장 분류 코드8 | string | Y | 2 |  |
| `FID_INPUT_ISCD_8` | 입력 종목코드8 | string | Y | 16 |  |
| `FID_COND_MRKT_DIV_CODE_9` | 조건 시장 분류 코드9 | string | Y | 2 |  |
| `FID_INPUT_ISCD_9` | 입력 종목코드9 | string | Y | 16 |  |
| `FID_COND_MRKT_DIV_CODE_10` | 조건 시장 분류 코드10 | string | Y | 12 |  |
| `FID_INPUT_ISCD_10` | 입력 종목코드10 | string | Y | 16 |  |
| `FID_COND_MRKT_DIV_CODE_11` | 조건 시장 분류 코드11 | string | Y | 2 |  |
| `FID_INPUT_ISCD_11` | 입력 종목코드11 | string | Y | 16 |  |
| `FID_COND_MRKT_DIV_CODE_12` | 조건 시장 분류 코드12 | string | Y | 2 |  |
| `FID_INPUT_ISCD_12` | 입력 종목코드12 | string | Y | 16 |  |
| `FID_COND_MRKT_DIV_CODE_13` | 조건 시장 분류 코드13 | string | Y | 2 |  |
| `FID_INPUT_ISCD_13` | 입력 종목코드13 | string | Y | 16 |  |
| `FID_COND_MRKT_DIV_CODE_14` | 조건 시장 분류 코드14 | string | Y | 2 |  |
| `FID_INPUT_ISCD_14` | 입력 종목코드14 | string | Y | 16 |  |
| `FID_COND_MRKT_DIV_CODE_15` | 조건 시장 분류 코드15 | string | Y | 2 |  |
| `FID_INPUT_ISCD_15` | 입력 종목코드15 | string | Y | 16 |  |
| `FID_COND_MRKT_DIV_CODE_16` | 조건 시장 분류 코드16 | string | Y | 2 |  |
| `FID_INPUT_ISCD_16` | 입력 종목코드16 | string | Y | 16 |  |
| `FID_COND_MRKT_DIV_CODE_17` | 조건 시장 분류 코드17 | string | Y | 2 |  |
| `FID_INPUT_ISCD_17` | 입력 종목코드17 | string | Y | 16 |  |
| `FID_COND_MRKT_DIV_CODE_18` | 조건 시장 분류 코드18 | string | Y | 2 |  |
| `FID_INPUT_ISCD_18` | 입력 종목코드18 | string | Y | 16 |  |
| `FID_COND_MRKT_DIV_CODE_19` | 조건 시장 분류 코드19 | string | Y | 2 |  |
| `FID_INPUT_ISCD_19` | 입력 종목코드19 | string | Y | 16 |  |
| `FID_COND_MRKT_DIV_CODE_20` | 조건 시장 분류 코드20 | string | Y | 2 |  |
| `FID_INPUT_ISCD_20` | 입력 종목코드20 | string | Y | 16 |  |
| `FID_COND_MRKT_DIV_CODE_21` | 조건 시장 분류 코드21 | string | Y | 2 |  |
| `FID_INPUT_ISCD_21` | 입력 종목코드21 | string | Y | 16 |  |
| `FID_COND_MRKT_DIV_CODE_22` | 조건 시장 분류 코드22 | string | Y | 2 |  |
| `FID_INPUT_ISCD_22` | 입력 종목코드22 | string | Y | 16 |  |
| `FID_COND_MRKT_DIV_CODE_23` | 조건 시장 분류 코드23 | string | Y | 2 |  |
| `FID_INPUT_ISCD_23` | 입력 종목코드23 | string | Y | 16 |  |
| `FID_COND_MRKT_DIV_CODE_24` | 조건 시장 분류 코드24 | string | Y | 2 |  |
| `FID_INPUT_ISCD_24` | 입력 종목코드24 | string | Y | 16 |  |
| `FID_COND_MRKT_DIV_CODE_25` | 조건 시장 분류 코드25 | string | Y | 2 |  |
| `FID_INPUT_ISCD_25` | 입력 종목코드25 | string | Y | 16 |  |
| `FID_COND_MRKT_DIV_CODE_26` | 조건 시장 분류 코드26 | string | Y | 16 |  |
| `FID_INPUT_ISCD_26` | 입력 종목코드26 | string | Y | 2 |  |
| `FID_COND_MRKT_DIV_CODE_27` | 조건 시장 분류 코드27 | string | Y | 2 |  |
| `FID_INPUT_ISCD_27` | 입력 종목코드27 | string | Y | 16 |  |
| `FID_COND_MRKT_DIV_CODE_28` | 조건 시장 분류 코드28 | string | Y | 2 |  |
| `FID_INPUT_ISCD_28` | 입력 종목코드28 | string | Y | 16 |  |
| `FID_COND_MRKT_DIV_CODE_29` | 조건 시장 분류 코드29 | string | Y | 2 |  |
| `FID_INPUT_ISCD_29` | 입력 종목코드29 | string | Y | 16 |  |
| `FID_COND_MRKT_DIV_CODE_30` | 조건 시장 분류 코드30 | string | Y | 2 |  |
| `FID_INPUT_ISCD_30` | 입력 종목코드30 | string | Y | 16 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object | Y |  |  |
| `kospi_kosdaq_cls_name` | 코스피 코스닥 구분 명 | string | Y | 10 |  |
| `mrkt_trtm_cls_name` | 시장 조치 구분 명 | string | Y | 10 |  |
| `hour_cls_code` | 시간 구분 코드 | string | Y | 1 |  |
| `inter_shrn_iscd` | 관심 단축 종목코드 | string | Y | 16 |  |
| `inter_kor_isnm` | 관심 한글 종목명 | string | Y | 40 |  |
| `inter2_prpr` | 관심2 현재가 | string | Y | 11 |  |
| `inter2_prdy_vrss` | 관심2 전일 대비 | string | Y | 11 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `inter2_oprc` | 관심2 시가 | string | Y | 11 |  |
| `inter2_hgpr` | 관심2 고가 | string | Y | 11 |  |
| `inter2_lwpr` | 관심2 저가 | string | Y | 11 |  |
| `inter2_llam` | 관심2 하한가 | string | Y | 11 |  |
| `inter2_mxpr` | 관심2 상한가 | string | Y | 11 |  |
| `inter2_askp` | 관심2 매도호가 | string | Y | 11 |  |
| `inter2_bidp` | 관심2 매수호가 | string | Y | 11 |  |
| `seln_rsqn` | 매도 잔량 | string | Y | 12 |  |
| `shnu_rsqn` | 매수2 잔량 | string | Y | 12 |  |
| `total_askp_rsqn` | 총 매도호가 잔량 | string | Y | 12 |  |
| `total_bidp_rsqn` | 총 매수호가 잔량 | string | Y | 12 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |
| `inter2_prdy_clpr` | 관심2 전일 종가 | string | Y | 11 |  |
| `oprc_vrss_hgpr_rate` | 시가 대비 최고가 비율 | string | Y | 84 |  |
| `intr_antc_cntg_vrss` | 관심 예상 체결 대비 | string | Y | 11 |  |
| `intr_antc_cntg_vrss_sign` | 관심 예상 체결 대비 부호 | string | Y | 1 |  |
| `intr_antc_cntg_prdy_ctrt` | 관심 예상 체결 전일 대비율 | string | Y | 72 |  |
| `intr_antc_vol` | 관심 예상 거래량 | string | Y | 18 |  |
| `inter2_sdpr` | 관심2 기준가 | string | Y | 11 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE_1:J  FID_INPUT_ISCD_1:005930  FID_COND_MRKT_DIV_CODE_2:J  FID_INPUT_ISCD_2:000660  FID_COND_MRKT_DIV_CODE_3:U  FID_INPUT_ISCD_3:0001
```

**Response Example:**
```
{      "output": [          {              "kospi_kosdaq_cls_name": "거래소",              "mrkt_trtm_cls_name": "거래소",              "hour_cls_code": "0",              "inter_shrn_iscd": "005930",              "inter_kor_isnm": "삼성전자",              "inter2_prpr": "77400",              "inter2_prdy_vrss": "-800",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-1.02",              "acml_vol": "15713440",              "inter2_oprc": "78600",              "inter2_hgpr": "78800",              "inter2_lwpr": "77200",              "inter2_llam": "54800",              "inter2_mxpr": "101600",              "inter2_askp": "77400",              "inter2_bidp": "77300",              "seln_rsqn": "10248",              "shnu_rsqn": "269626",              "total_askp_rsqn": "1404667",              "total_bidp_rsqn": "2150657",              "acml_tr_pbmn": "1221686345500",              "inter2_prdy_clpr": "78200",              "oprc_vrss_hgpr_rate": "0.25",              "intr_antc_cntg_vrss": "0",              "intr_antc_cntg_vrss_sign": "3",              "intr_antc_cntg_prdy_ctrt": "0.00",              "intr_antc_vol": "0",              "inter2_sdpr": "78200"          },          {              "kospi_kosdaq_cls_name": "거래소",              "mrkt_trtm_cls_name": "거래소",              "hour_cls_code": "0",              "inter_shrn_iscd": "000660",              "inter_kor_isnm": "SK하이닉스",              "inter2_prpr": "189900",              "inter2_prdy_vrss": "-3100",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-1.61",              "acml_vol": "2758944",              "inter2_oprc": "192000",              "inter2_hgpr": "193500",              "inter2_lwpr": "189900",              "inter2_llam": "135100",              "inter2_mxpr": "250500",              "inter2_askp": "190000",              "inter2_bidp": "189900",              "seln_rsqn": "5625",              "shnu_rsqn": "4782",              "total_askp_rsqn": "27318",              "total_bidp_rsqn": "33313",              "acml_tr_pbmn": "528227479600",              "inter2_prdy_clpr": "193000",              "oprc_vrss_hgpr_rate": "0.78",              "intr_antc_cntg_vrss": "0",              "intr_antc_cntg_vrss_sign": "3",              "intr_antc_cntg_prdy_ctrt": "0.00",              "intr_antc_vol": "0",              "inter2_sdpr": "193000"          },          {              "kospi_kosdaq_cls_name": "업종",              "mrkt_trtm_cls_name": "",              "hour_cls_code": "2",              "inter_shrn_iscd": "0001",              "inter_kor_isnm": "종합",              "inter2_prpr": "2724.62",              "inter2_prdy_vrss": "-28.38",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-1.03",              "acml_vol": "561107",              "inter2_oprc": "2751.47",              "inter2_hgpr": "2752.17",              "inter2_lwpr": "2724.62",              "inter2_llam": "",              "inter2_mxpr": "",              "inter2_askp": "",              "inter2_bidp": "",    
```

---
### 136. 국내주식 예상체결 상승_하락상위

| Field | Value |
|---|---|
| Sheet | `국내주식 예상체결 상승_하락상위` |
| Menu | [국내주식] 순위분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ranking/exp-trans-updown` |
| TR_ID (실전) | `FHPST01820000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `fid_rank_sort_cls_code` | 순위 정렬 구분 코드 | string | Y | 2 | 0:상승률1:상승폭2:보합3:하락율4:하락폭5:체결량6:거래대금 |
| `fid_cond_mrkt_div_code` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (주식 J) |
| `fid_cond_scr_div_code` | 조건 화면 분류 코드 | string | Y | 5 | Unique key(20182) |
| `fid_input_iscd` | 입력 종목코드 | string | Y | 12 | 0000:전체, 0001:거래소, 1001:코스닥, 2001:코스피200, 4001: KRX100 |
| `fid_div_cls_code` | 분류 구분 코드 | string | Y | 2 | 0:전체 1:보통주 2:우선주 |
| `fid_aply_rang_prc_1` | 적용 범위 가격1 | string | Y | 18 | 입력값 없을때 전체 (가격 ~) |
| `fid_vol_cnt` | 거래량 수 | string | Y | 12 | 입력값 없을때 전체 (거래량 ~) |
| `fid_pbmn` | 거래대금 | string | Y | 18 | 입력값 없을때 전체 (거래대금 ~) 천원단위 |
| `fid_blng_cls_code` | 소속 구분 코드 | string | Y | 2 | 0: 전체 |
| `fid_mkop_cls_code` | 장운영 구분 코드 | string | Y | 2 | 0:장전예상1:장마감예상 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stck_shrn_iscd` | 주식 단축 종목코드 | string | Y | 9 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `stck_sdpr` | 주식 기준가 | string | Y | 10 |  |
| `seln_rsqn` | 매도 잔량 | string | Y | 12 |  |
| `askp` | 매도호가 | string | Y | 10 |  |
| `bidp` | 매수호가 | string | Y | 10 |  |
| `shnu_rsqn` | 매수2 잔량 | string | Y | 12 |  |
| `cntg_vol` | 체결 거래량 | string | Y | 18 |  |
| `antc_tr_pbmn` | 체결 거래대금 | string | Y | 18 |  |
| `total_askp_rsqn` | 총 매도호가 잔량 | string | Y | 12 |  |
| `total_bidp_rsqn` | 총 매수호가 잔량 | string | Y | 12 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"J",  "fid_cond_scr_div_code":"20182",  "fid_input_iscd":"0000",  "fid_div_cls_code":"0",  "fid_aply_rang_prc_1":"",  "fid_vol_cnt":"",  "fid_pbmn":"",  "fid_blng_cls_code":"0",  "fid_mkop_cls_code":"0",  "fid_rank_sort_cls_code":"0"  }
```

**Response Example:**
```
{      "output": [          {              "stck_shrn_iscd": "199800",              "hts_kor_isnm": "툴젠",              "stck_prpr": "76100",              "prdy_vrss": "17500",              "prdy_vrss_sign": "1",              "prdy_ctrt": "29.86",              "stck_sdpr": "58600",              "seln_rsqn": "0",              "askp": "0",              "bidp": "76100",              "shnu_rsqn": "49100",              "cntg_vol": "51683",              "antc_tr_pbmn": "3933076300",              "total_askp_rsqn": "0",              "total_bidp_rsqn": "67064"          },          {              "stck_shrn_iscd": "378340",              "hts_kor_isnm": "필에너지",              "stck_prpr": "31800",              "prdy_vrss": "3400",              "prdy_vrss_sign": "2",              "prdy_ctrt": "11.97",              "stck_sdpr": "28400",              "seln_rsqn": "10680",              "askp": "31800",              "bidp": "31750",              "shnu_rsqn": "6215",              "cntg_vol": "198612",              "antc_tr_pbmn": "6315861600",              "total_askp_rsqn": "14705",              "total_bidp_rsqn": "71743"          },          {              "stck_shrn_iscd": "115530",              "hts_kor_isnm": "씨엔플러스",              "stck_prpr": "386",              "prdy_vrss": "41",              "prdy_vrss_sign": "2",              "prdy_ctrt": "11.88",              "stck_sdpr": "345",              "seln_rsqn": "3257",              "askp": "386",              "bidp": "385",              "shnu_rsqn": "92624",              "cntg_vol": "1150496",              "antc_tr_pbmn": "72949040",              "total_askp_rsqn": "33272",              "total_bidp_rsqn": "173439"          },          {              "stck_shrn_iscd": "Q580040",              "hts_kor_isnm": "KB 인버스 2X KOSPI 200 선물 ETN",              "stck_prpr": "13305",              "prdy_vrss": "1205",              "prdy_vrss_sign": "2",              "prdy_ctrt": "9.96",              "stck_sdpr": "12100",              "seln_rsqn": "0",              "askp": "0",              "bidp": "12730",              "shnu_rsqn": "69",              "cntg_vol": "13",              "antc_tr_pbmn": "172965",              "total_askp_rsqn": "49927",              "total_bidp_rsqn": "15061"          },          {              "stck_shrn_iscd": "078150",              "hts_kor_isnm": "HB테크놀러지",              "stck_prpr": "2620",              "prdy_vrss": "230",              "prdy_vrss_sign": "2",              "prdy_ctrt": "9.62",              "stck_sdpr": "2390",              "seln_rsqn": "53479",              "askp": "2625",              "bidp": "2620",              "shnu_rsqn": "7114",              "cntg_vol": "822185",              "antc_tr_pbmn": "2154124700",              "total_askp_rsqn": "332932",              "total_bidp_rsqn": "206643"          },          {              "stck_shrn_iscd": "094820",              "hts_kor_isnm": "일진파워",              "stck_prpr": "13470",              "prdy_vrss": "1150",              "prdy_vrs
```

---
### 137. 국내주식 호가잔량 순위

| Field | Value |
|---|---|
| Sheet | `국내주식 호가잔량 순위` |
| Menu | [국내주식] 순위분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ranking/quote-balance` |
| TR_ID (실전) | `FHPST01720000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `fid_vol_cnt` | 거래량 수 | string | Y | 12 | 입력값 없을때 전체 (거래량 ~) |
| `fid_cond_mrkt_div_code` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (J:KRX, NX:NXT) |
| `fid_cond_scr_div_code` | 조건 화면 분류 코드 | string | Y | 5 | Unique key( 20172 ) |
| `fid_input_iscd` | 입력 종목코드 | string | Y | 12 | 0000(전체) 코스피(0001), 코스닥(1001), 코스피200(2001) |
| `fid_rank_sort_cls_code` | 순위 정렬 구분 코드 | string | Y | 2 | 0: 순매수잔량순, 1:순매도잔량순, 2:매수비율순, 3:매도비율순 |
| `fid_div_cls_code` | 분류 구분 코드 | string | Y | 2 | 0:전체 |
| `fid_trgt_cls_code` | 대상 구분 코드 | string | Y | 32 | 0:전체 |
| `fid_trgt_exls_cls_code` | 대상 제외 구분 코드 | string | Y | 32 | 0:전체 |
| `fid_input_price_1` | 입력 가격1 | string | Y | 12 | 입력값 없을때 전체 (가격 ~) |
| `fid_input_price_2` | 입력 가격2 | string | Y | 12 | 입력값 없을때 전체 (~ 가격) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `mksc_shrn_iscd` | 유가증권 단축 종목코드 | string | Y | 9 |  |
| `data_rank` | 데이터 순위 | string | Y | 10 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `total_askp_rsqn` | 총 매도호가 잔량 | string | Y | 12 |  |
| `total_bidp_rsqn` | 총 매수호가 잔량 | string | Y | 12 |  |
| `total_ntsl_bidp_rsqn` | 총 순 매수호가 잔량 | string | Y | 12 |  |
| `shnu_rsqn_rate` | 매수 잔량 비율 | string | Y | 84 |  |
| `seln_rsqn_rate` | 매도 잔량 비율 | string | Y | 84 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"J",  "fid_cond_scr_div_code":"20172",  "fid_input_iscd":"0000",  "fid_rank_sort_cls_code":"0",  "fid_div_cls_code":"0",  "fid_trgt_cls_code":"0",  "fid_trgt_exls_cls_code":"0",  "fid_input_price_1":"",  "fid_input_price_2":"",  "fid_vol_cnt":""  }
```

**Response Example:**
```
{      "output": [          {              "mksc_shrn_iscd": "Q530036",              "data_rank": "1",              "hts_kor_isnm": "삼성 인버스 2X WTI원유 선물 ETN",              "stck_prpr": "92",              "prdy_vrss": "0",              "prdy_vrss_sign": "3",              "prdy_ctrt": "0.00",              "acml_vol": "4019460",              "total_askp_rsqn": "27327397",              "total_bidp_rsqn": "59778444",              "total_ntsl_bidp_rsqn": "32451047",              "shnu_rsqn_rate": "68.63",              "seln_rsqn_rate": "31.37"          },          {              "mksc_shrn_iscd": "003410",              "data_rank": "2",              "hts_kor_isnm": "쌍용C&E",              "stck_prpr": "7000",              "prdy_vrss": "0",              "prdy_vrss_sign": "3",              "prdy_ctrt": "0.00",              "acml_vol": "83785",              "total_askp_rsqn": "238068",              "total_bidp_rsqn": "22904795",              "total_ntsl_bidp_rsqn": "22666727",              "shnu_rsqn_rate": "98.97",              "seln_rsqn_rate": "1.03"          },          {              "mksc_shrn_iscd": "252670",              "data_rank": "3",              "hts_kor_isnm": "KODEX 200선물인버스2X",              "stck_prpr": "2180",              "prdy_vrss": "0",              "prdy_vrss_sign": "3",              "prdy_ctrt": "0.00",              "acml_vol": "45344920",              "total_askp_rsqn": "16674598",              "total_bidp_rsqn": "26686853",              "total_ntsl_bidp_rsqn": "10012255",              "shnu_rsqn_rate": "61.55",              "seln_rsqn_rate": "38.45"          },          {              "mksc_shrn_iscd": "114800",              "data_rank": "4",              "hts_kor_isnm": "KODEX 인버스",              "stck_prpr": "4275",              "prdy_vrss": "0",              "prdy_vrss_sign": "3",              "prdy_ctrt": "0.00",              "acml_vol": "4988727",              "total_askp_rsqn": "5715746",              "total_bidp_rsqn": "9303814",              "total_ntsl_bidp_rsqn": "3588068",              "shnu_rsqn_rate": "61.94",              "seln_rsqn_rate": "38.06"          },          {              "mksc_shrn_iscd": "018000",              "data_rank": "5",              "hts_kor_isnm": "유니슨",              "stck_prpr": "1233",              "prdy_vrss": "215",              "prdy_vrss_sign": "2",              "prdy_ctrt": "21.12",              "acml_vol": "2436474",              "total_askp_rsqn": "0",              "total_bidp_rsqn": "2617859",              "total_ntsl_bidp_rsqn": "2617859",              "shnu_rsqn_rate": "100.00",              "seln_rsqn_rate": "0.00"          },          {              "mksc_shrn_iscd": "005930",              "data_rank": "6",              "hts_kor_isnm": "삼성전자",              "stck_prpr": "72800",              "prdy_vrss": "500",              "prdy_vrss_sign": "2",              "prdy_ctrt": "0.69",              "acml_vol": "3310579",              "total_askp_rsqn": "970901",              "total_bidp_rsqn
```

---
### 138. 국내주식 신용잔고 상위

| Field | Value |
|---|---|
| Sheet | `국내주식 신용잔고 상위` |
| Menu | [국내주식] 순위분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ranking/credit-balance` |
| TR_ID (실전) | `FHKST17010000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_SCR_DIV_CODE` | 조건 화면 분류 코드 | string | Y | 5 | Unique key(11701) |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 0000:전체, 0001:거래소, 1001:코스닥, 2001:코스피200, |
| `FID_OPTION` | 증가율기간 | string | Y | 5 | 2~999 |
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (주식 J) |
| `FID_RANK_SORT_CLS_CODE` | 순위 정렬 구분 코드 | string | Y | 2 | '(융자)0:잔고비율 상위, 1: 잔고수량 상위, 2: 잔고금액 상위, 3: 잔고비율 증가상위, 4: 잔고비율 감소상위   (대주)5:잔고비율 상위, 6: 잔고수량 상위, 7: 잔고금액 상위, 8: 잔고비율 증가상위, 9: 잔고비율 감소상위 ' |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `bstp_cls_code` | 업종 구분 코드 | string | Y | 4 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `stnd_date1` | 기준 일자1 | string | Y | 8 |  |
| `stnd_date2` | 기준 일자2 | string | Y | 8 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `mksc_shrn_iscd` | 유가증권 단축 종목코드 | string | Y | 9 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `whol_loan_rmnd_stcn` | 전체 융자 잔고 주수 | string | Y | 18 |  |
| `whol_loan_rmnd_amt` | 전체 융자 잔고 금액 | string | Y | 18 |  |
| `whol_loan_rmnd_rate` | 전체 융자 잔고 비율 | string | Y | 84 |  |
| `whol_stln_rmnd_stcn` | 전체 대주 잔고 주수 | string | Y | 18 |  |
| `whol_stln_rmnd_amt` | 전체 대주 잔고 금액 | string | Y | 18 |  |
| `whol_stln_rmnd_rate` | 전체 대주 잔고 비율 | string | Y | 84 |  |
| `nday_vrss_loan_rmnd_inrt` | N일 대비 융자 잔고 증가율 | string | Y | 84 |  |
| `nday_vrss_stln_rmnd_inrt` | N일 대비 대주 잔고 증가율 | string | Y | 84 |  |

**Request Example:**
```
fid_cond_scr_div_code:11701  fid_input_iscd:0000  fid_option:2  fid_cond_mrkt_div_code:J  fid_rank_sort_cls_code:0
```

**Response Example:**
```
{      "output1": [          {              "bstp_cls_code": "1001",              "hts_kor_isnm": "종합",              "stnd_date1": "20240409",              "stnd_date2": "20240411"          }      ],      "output2": [          {              "mksc_shrn_iscd": "089010",              "hts_kor_isnm": "켐트로닉스",              "stck_prpr": "28200",              "prdy_vrss": "-300",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-1.05",              "acml_vol": "2854589",              "whol_loan_rmnd_stcn": "1470604",              "whol_loan_rmnd_amt": "3312604",              "whol_loan_rmnd_rate": "9.68",              "whol_stln_rmnd_stcn": "0",              "whol_stln_rmnd_amt": "0",              "whol_stln_rmnd_rate": "0.00",              "nday_vrss_loan_rmnd_inrt": "2.61",              "nday_vrss_stln_rmnd_inrt": "0.00"          },          {              "mksc_shrn_iscd": "083500",              "hts_kor_isnm": "에프엔에스테크",              "stck_prpr": "12770",              "prdy_vrss": "-390",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-2.96",              "acml_vol": "640177",              "whol_loan_rmnd_stcn": "830732",              "whol_loan_rmnd_amt": "919030",              "whol_loan_rmnd_rate": "9.68",              "whol_stln_rmnd_stcn": "0",              "whol_stln_rmnd_amt": "0",              "whol_stln_rmnd_rate": "0.00",              "nday_vrss_loan_rmnd_inrt": "0.98",              "nday_vrss_stln_rmnd_inrt": "0.00"          },          {              "mksc_shrn_iscd": "251340",              "hts_kor_isnm": "KODEX 코스닥150선물인버스",              "stck_prpr": "3485",              "prdy_vrss": "10",              "prdy_vrss_sign": "2",              "prdy_ctrt": "0.29",              "acml_vol": "35592555",              "whol_loan_rmnd_stcn": "13685692",              "whol_loan_rmnd_amt": "4699136",              "whol_loan_rmnd_rate": "9.54",              "whol_stln_rmnd_stcn": "0",              "whol_stln_rmnd_amt": "0",              "whol_stln_rmnd_rate": "0.00",              "nday_vrss_loan_rmnd_inrt": "-0.46",              "nday_vrss_stln_rmnd_inrt": "0.00"          },          {              "mksc_shrn_iscd": "054450",              "hts_kor_isnm": "텔레칩스",              "stck_prpr": "26350",              "prdy_vrss": "0",              "prdy_vrss_sign": "3",              "prdy_ctrt": "0.00",              "acml_vol": "158467",              "whol_loan_rmnd_stcn": "1382693",              "whol_loan_rmnd_amt": "3550014",              "whol_loan_rmnd_rate": "9.12",              "whol_stln_rmnd_stcn": "0",              "whol_stln_rmnd_amt": "0",              "whol_stln_rmnd_rate": "0.00",              "nday_vrss_loan_rmnd_inrt": "0.00",              "nday_vrss_stln_rmnd_inrt": "0.00"          },          {              "mksc_shrn_iscd": "278650",              "hts_kor_isnm": "HLB바이오스텝",              "stck_prpr": "3815",              "prdy_vrss": "60",              "prdy_vrss_sign": "2",              "prdy_ctrt": "1.60",  
```

---
### 139. 국내주식 시간외거래량순위

| Field | Value |
|---|---|
| Sheet | `국내주식 시간외거래량순위` |
| Menu | [국내주식] 순위분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ranking/overtime-volume` |
| TR_ID (실전) | `FHPST02350000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (J: 주식) |
| `FID_COND_SCR_DIV_CODE` | 조건 화면 분류 코드 | string | Y | 5 | Unique key(20235) |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 0000(전체), 0001(코스피), 1001(코스닥) |
| `FID_RANK_SORT_CLS_CODE` | 순위 정렬 구분 코드 | string | Y | 2 | 0(매수잔량),  1(매도잔량), 2(거래량) |
| `FID_INPUT_PRICE_1` | 입력 가격1 | string | Y | 12 | 가격 ~ |
| `FID_INPUT_PRICE_2` | 입력 가격2 | string | Y | 12 | ~ 가격 |
| `FID_VOL_CNT` | 거래량 수 | string | Y | 12 | 거래량 ~ |
| `FID_TRGT_CLS_CODE` | 대상 구분 코드 | string | Y | 32 | 공백 |
| `FID_TRGT_EXLS_CLS_CODE` | 대상 제외 구분 코드 | string | Y | 32 | 공백 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `ovtm_untp_exch_vol` | 시간외 단일가 거래소 거래량 | string | Y | 18 |  |
| `ovtm_untp_exch_tr_pbmn` | 시간외 단일가 거래소 거래대금 | string | Y | 18 |  |
| `ovtm_untp_kosdaq_vol` | 시간외 단일가 KOSDAQ 거래량 | string | Y | 18 |  |
| `ovtm_untp_kosdaq_tr_pbmn` | 시간외 단일가 KOSDAQ 거래대금 | string | Y | 18 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `stck_shrn_iscd` | 주식 단축 종목코드 | string | Y | 9 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `ovtm_untp_prpr` | 시간외 단일가 현재가 | string | Y | 10 |  |
| `ovtm_untp_prdy_vrss` | 시간외 단일가 전일 대비 | string | Y | 10 |  |
| `ovtm_untp_prdy_vrss_sign` | 시간외 단일가 전일 대비 부호 | string | Y | 1 |  |
| `ovtm_untp_prdy_ctrt` | 시간외 단일가 전일 대비율 | string | Y | 82 |  |
| `ovtm_untp_seln_rsqn` | 시간외 단일가 매도 잔량 | string | Y | 12 |  |
| `ovtm_untp_shnu_rsqn` | 시간외 단일가 매수 잔량 | string | Y | 12 |  |
| `ovtm_untp_vol` | 시간외 단일가 거래량 | string | Y | 18 |  |
| `ovtm_vrss_acml_vol_rlim` | 시간외 대비 누적 거래량 비중 | string | Y | 52 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `bidp` | 매수호가 | string | Y | 10 |  |
| `askp` | 매도호가 | string | Y | 10 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:J  FID_COND_SCR_DIV_CODE:20235  FID_INPUT_ISCD:0000  FID_RANK_SORT_CLS_CODE:0  FID_INPUT_PRICE_1:  FID_INPUT_PRICE_2:  FID_VOL_CNT:  FID_TRGT_CLS_CODE:  FID_TRGT_EXLS_CLS_CODE:
```

**Response Example:**
```
{      "output1": {          "ovtm_untp_exch_vol": "5806628",          "ovtm_untp_exch_tr_pbmn": "54755931392",          "ovtm_untp_kosdaq_vol": "5204621",          "ovtm_untp_kosdaq_tr_pbmn": "47577538957"      },      "output2": [          {              "stck_shrn_iscd": "024840",              "hts_kor_isnm": "KBI메탈",              "ovtm_untp_prpr": "1805",              "ovtm_untp_prdy_vrss": "164",              "ovtm_untp_prdy_vrss_sign": "1",              "ovtm_untp_prdy_ctrt": "9.99",              "ovtm_untp_seln_rsqn": "0",              "ovtm_untp_shnu_rsqn": "1518111",              "ovtm_untp_vol": "830822",              "ovtm_vrss_acml_vol_rlim": "5.78",              "stck_prpr": "1641",              "acml_vol": "14376124",              "bidp": "1641",              "askp": "1642"          },          {              "stck_shrn_iscd": "251340",              "hts_kor_isnm": "KODEX 코스닥150선물인버스",              "ovtm_untp_prpr": "3480",              "ovtm_untp_prdy_vrss": "-5",              "ovtm_untp_prdy_vrss_sign": "5",              "ovtm_untp_prdy_ctrt": "-0.14",              "ovtm_untp_seln_rsqn": "483261",              "ovtm_untp_shnu_rsqn": "1280469",              "ovtm_untp_vol": "271489",              "ovtm_vrss_acml_vol_rlim": "0.76",              "stck_prpr": "3485",              "acml_vol": "35798171",              "bidp": "3480",              "askp": "3485"          },          {              "stck_shrn_iscd": "Q530036",              "hts_kor_isnm": "삼성 인버스 2X WTI원유 선물 ETN",              "ovtm_untp_prpr": "83",              "ovtm_untp_prdy_vrss": "-1",              "ovtm_untp_prdy_vrss_sign": "5",              "ovtm_untp_prdy_ctrt": "-1.19",              "ovtm_untp_seln_rsqn": "733502",              "ovtm_untp_shnu_rsqn": "1129085",              "ovtm_untp_vol": "500",              "ovtm_vrss_acml_vol_rlim": "0.00",              "stck_prpr": "84",              "acml_vol": "14500093",              "bidp": "83",              "askp": "84"          },          {              "stck_shrn_iscd": "900110",              "hts_kor_isnm": "이스트아시아홀딩스",              "ovtm_untp_prpr": "92",              "ovtm_untp_prdy_vrss": "0",              "ovtm_untp_prdy_vrss_sign": "3",              "ovtm_untp_prdy_ctrt": "0.00",              "ovtm_untp_seln_rsqn": "116978",              "ovtm_untp_shnu_rsqn": "929131",              "ovtm_untp_vol": "3590",              "ovtm_vrss_acml_vol_rlim": "0.33",              "stck_prpr": "92",              "acml_vol": "1072096",              "bidp": "91",              "askp": "92"          },          {              "stck_shrn_iscd": "Q500027",              "hts_kor_isnm": "신한 인버스 2X WTI원유 선물 ETN(H)",              "ovtm_untp_prpr": "70",              "ovtm_untp_prdy_vrss": "-1",              "ovtm_untp_prdy_vrss_sign": "5",              "ovtm_untp_prdy_ctrt": "-1.41",              "ovtm_untp_seln_rsqn": "146853",              "ovtm_untp_shnu_rsqn": "736280",              "ovtm_untp_vol": "800",              "ovtm_vr
```

---
### 140. 국내주식 배당률 상위

| Field | Value |
|---|---|
| Sheet | `국내주식 배당률 상위` |
| Menu | [국내주식] 순위분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ranking/dividend-rate` |
| TR_ID (실전) | `HHKDB13470100` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CTS_AREA` | CTS_AREA | string | Y | 17 | 공백 |
| `GB1` | KOSPI | string | Y | 1 | 0:전체, 1:코스피,  2: 코스피200, 3: 코스닥, |
| `UPJONG` | 업종구분 | string | Y | 4 | '코스피(0001:종합, 0002:대형주.…0027:제조업 ),   코스닥(1001:종합, …. 1041:IT부품  코스피200 (2001:KOSPI200, 2007:KOSPI100, 2008:KOSPI50)' |
| `GB2` | 종목선택 | string | Y | 1 | 0:전체, 6:보통주, 7:우선주 |
| `GB3` | 배당구분 | string | Y | 1 | 1:주식배당, 2: 현금배당 |
| `F_DT` | 기준일From | string | Y | 8 |  |
| `T_DT` | 기준일To | string | Y | 8 |  |
| `GB4` | 결산/중간배당 | string | Y | 1 | 0:전체, 1:결산배당, 2:중간배당 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `rank` | 순위 | string | Y | 4 |  |
| `sht_cd` | 종목코드 | string | Y | 9 |  |
| `isin_name` | 종목명 | string | Y | 40 |  |
| `record_date` | 기준일 | string | Y | 8 |  |
| `per_sto_divi_amt` | 현금/주식배당금 | string | Y | 12 |  |
| `divi_rate` | 현금/주식배당률(%) | string | Y | 62 |  |
| `divi_kind` | 배당종류 | string | Y | 8 |  |

**Request Example:**
```
CTS_AREA:  GB1:0  UPJONG:0001  GB2:0  GB3:1  F_DT:20200101  T_DT:20240403  GB4:0
```

**Response Example:**
```
{      "output": [          {              "rank": "1",              "sht_cd": "089600",              "isin_name": "나스미디어",              "record_date": "20211231",              "per_sto_divi_amt": "0",              "divi_rate": "0.00",              "divi_kind": "결산"          },          {              "rank": "2",              "sht_cd": "089600",              "isin_name": "나스미디어",              "record_date": "20201231",              "per_sto_divi_amt": "0",              "divi_rate": "0.00",              "divi_kind": "결산"          },          {              "rank": "3",              "sht_cd": "089600",              "isin_name": "나스미디어",              "record_date": "20221231",              "per_sto_divi_amt": "0",              "divi_rate": "0.00",              "divi_kind": "결산"          },          {              "rank": "4",              "sht_cd": "243070",              "isin_name": "휴온스",              "record_date": "20211231",              "per_sto_divi_amt": "0",              "divi_rate": "0.00",              "divi_kind": "결산"          },          {              "rank": "5",              "sht_cd": "243070",              "isin_name": "휴온스",              "record_date": "20201231",              "per_sto_divi_amt": "0",              "divi_rate": "0.00",              "divi_kind": "결산"          },          {              "rank": "6",              "sht_cd": "086520",              "isin_name": "에코프로",              "record_date": "20221231",              "per_sto_divi_amt": "0",              "divi_rate": "0.00",              "divi_kind": "결산"          },          {              "rank": "7",              "sht_cd": "084110",              "isin_name": "휴온스글로벌",              "record_date": "20211231",              "per_sto_divi_amt": "0",              "divi_rate": "0.00",              "divi_kind": "결산"          },          {              "rank": "8",              "sht_cd": "119610",              "isin_name": "인터로조",              "record_date": "20211231",              "per_sto_divi_amt": "0",              "divi_rate": "0.00",              "divi_kind": "결산"          },          {              "rank": "9",              "sht_cd": "086520",              "isin_name": "에코프로",              "record_date": "20211231",              "per_sto_divi_amt": "0",              "divi_rate": "0.00",              "divi_kind": "결산"          },          {              "rank": "10",              "sht_cd": "084110",              "isin_name": "휴온스글로벌",              "record_date": "20201231",              "per_sto_divi_amt": "0",              "divi_rate": "0.00",              "divi_kind": "결산"          },          {              "rank": "11",              "sht_cd": "239610",              "isin_name": "에이치엘사이언스",              "record_date": "20201231",              "per_sto_divi_amt": "0",              "divi_rate": "0.00",              "divi_kind": "결산"          },          {              "rank": "12",              "sht_cd": "068270",              "isin_name": "셀트리온",              "re
```

---
### 141. 국내주식 시간외잔량 순위

| Field | Value |
|---|---|
| Sheet | `국내주식 시간외잔량 순위` |
| Menu | [국내주식] 순위분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ranking/after-hour-balance` |
| TR_ID (실전) | `FHPST01760000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `fid_input_price_1` | 입력 가격1 | string | Y | 12 | 입력값 없을때 전체 (가격 ~) |
| `fid_cond_mrkt_div_code` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (주식 J) |
| `fid_cond_scr_div_code` | 조건 화면 분류 코드 | string | Y | 5 | Unique key( 20176 ) |
| `fid_rank_sort_cls_code` | 순위 정렬 구분 코드 | string | Y | 2 | 1: 장전 시간외, 2: 장후 시간외, 3:매도잔량, 4:매수잔량 |
| `fid_div_cls_code` | 분류 구분 코드 | string | Y | 2 | 0 : 전체 |
| `fid_input_iscd` | 입력 종목코드 | string | Y | 12 | 0000:전체, 0001:거래소, 1001:코스닥, 2001:코스피200 |
| `fid_trgt_exls_cls_code` | 대상 제외 구분 코드 | string | Y | 32 | 0 : 전체 |
| `fid_trgt_cls_code` | 대상 구분 코드 | string | Y | 32 | 0 : 전체 |
| `fid_vol_cnt` | 거래량 수 | string | Y | 12 | 입력값 없을때 전체 (거래량 ~) |
| `fid_input_price_2` | 입력 가격2 | string | Y | 12 | 입력값 없을때 전체 (~ 가격) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stck_shrn_iscd` | 주식 단축 종목코드 | string | Y | 9 |  |
| `data_rank` | 데이터 순위 | string | Y | 10 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `ovtm_total_askp_rsqn` | 시간외 총 매도호가 잔량 | string | Y | 12 |  |
| `ovtm_total_bidp_rsqn` | 시간외 총 매수호가 잔량 | string | Y | 12 |  |
| `mkob_otcp_vol` | 장개시전 시간외종가 거래량 | string | Y | 18 |  |
| `mkfa_otcp_vol` | 장종료후 시간외종가 거래량 | string | Y | 18 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"J",  "fid_cond_scr_div_code":"20176",  "fid_rank_sort_cls_code":"1",  "fid_div_cls_code":"0",  "fid_input_iscd":"0000",  "fid_trgt_cls_code":"0"  "fid_trgt_exls_cls_code":"0",  "fid_input_price_1":"",  "fid_input_price_2":"",  "fid_vol_cnt":"",  }
```

**Response Example:**
```
{      "output": [          {              "stck_shrn_iscd": "252670",              "data_rank": "1",              "hts_kor_isnm": "KODEX 200선물인버스2X",              "stck_prpr": "2170",              "prdy_vrss": "-10",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-0.46",              "ovtm_total_askp_rsqn": "0",              "ovtm_total_bidp_rsqn": "0",              "mkob_otcp_vol": "451685",              "mkfa_otcp_vol": "0"          },          {              "stck_shrn_iscd": "255220",              "data_rank": "2",              "hts_kor_isnm": "SG",              "stck_prpr": "2565",              "prdy_vrss": "-200",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-7.23",              "ovtm_total_askp_rsqn": "0",              "ovtm_total_bidp_rsqn": "0",              "mkob_otcp_vol": "216921",              "mkfa_otcp_vol": "0"          },          {              "stck_shrn_iscd": "001470",              "data_rank": "3",              "hts_kor_isnm": "삼부토건",              "stck_prpr": "2535",              "prdy_vrss": "-155",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-5.76",              "ovtm_total_askp_rsqn": "0",              "ovtm_total_bidp_rsqn": "0",              "mkob_otcp_vol": "77285",              "mkfa_otcp_vol": "0"          },          {              "stck_shrn_iscd": "253590",              "data_rank": "4",              "hts_kor_isnm": "네오셈",              "stck_prpr": "15850",              "prdy_vrss": "-200",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-1.25",              "ovtm_total_askp_rsqn": "0",              "ovtm_total_bidp_rsqn": "0",              "mkob_otcp_vol": "45191",              "mkfa_otcp_vol": "0"          },          {              "stck_shrn_iscd": "065450",              "data_rank": "5",              "hts_kor_isnm": "빅텍",              "stck_prpr": "5180",              "prdy_vrss": "80",              "prdy_vrss_sign": "2",              "prdy_ctrt": "1.57",              "ovtm_total_askp_rsqn": "0",              "ovtm_total_bidp_rsqn": "0",              "mkob_otcp_vol": "39634",              "mkfa_otcp_vol": "0"          },          {              "stck_shrn_iscd": "001780",              "data_rank": "6",              "hts_kor_isnm": "알루코",              "stck_prpr": "3580",              "prdy_vrss": "-30",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-0.83",              "ovtm_total_askp_rsqn": "0",              "ovtm_total_bidp_rsqn": "0",              "mkob_otcp_vol": "36447",              "mkfa_otcp_vol": "0"          },          {              "stck_shrn_iscd": "043100",              "data_rank": "7",              "hts_kor_isnm": "솔고바이오",              "stck_prpr": "524",              "prdy_vrss": "-9",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-1.69",              "ovtm_total_askp_rsqn": "0",              "ovtm_total_bidp_rsqn": "0",              "mkob_otcp_vol": "33361",              "mkfa_otcp_vol":
```

---
### 142. 국내주식 공매도 상위종목

| Field | Value |
|---|---|
| Sheet | `국내주식 공매도 상위종목` |
| Menu | [국내주식] 순위분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ranking/short-sale` |
| TR_ID (실전) | `FHPST04820000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_APLY_RANG_VOL` | FID 적용 범위 거래량 | string | Y | 18 | 공백 |
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (주식 J) |
| `FID_COND_SCR_DIV_CODE` | 조건 화면 분류 코드 | string | Y | 5 | Unique key(20482) |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 0000:전체, 0001:코스피, 1001:코스닥, 2001:코스피200, 4001: KRX100, 3003: 코스닥150 |
| `FID_PERIOD_DIV_CODE` | 조회구분 (일/월) | string | Y | 32 | 조회구분 (일/월) D: 일, M:월 |
| `FID_INPUT_CNT_1` | 조회가간(일수 | string | Y | 12 | '조회가간(일수):  조회구분(D) 0:1일, 1:2일, 2:3일, 3:4일, 4:1주일, 9:2주일, 14:3주일,   조회구분(M) 1:1개월,  2:2개월, 3:3개월' |
| `FID_TRGT_EXLS_CLS_CODE` | 대상 제외 구분 코드 | string | Y | 32 | 공백 |
| `FID_TRGT_CLS_CODE` | FID 대상 구분 코드 | string | Y | 32 | 공백 |
| `FID_APLY_RANG_PRC_1` | FID 적용 범위 가격1 | string | Y | 18 | 가격 ~ |
| `FID_APLY_RANG_PRC_2` | FID 적용 범위 가격2 | string | Y | 18 | ~ 가격 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `mksc_shrn_iscd` | 유가증권 단축 종목코드 | string | Y | 9 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |
| `ssts_cntg_qty` | 공매도 체결 수량 | string | Y | 12 |  |
| `ssts_vol_rlim` | 공매도 거래량 비중 | string | Y | 62 |  |
| `ssts_tr_pbmn` | 공매도 거래 대금 | string | Y | 18 |  |
| `ssts_tr_pbmn_rlim` | 공매도 거래대금 비중 | string | Y | 62 |  |
| `stnd_date1` | 기준 일자1 | string | Y | 8 |  |
| `stnd_date2` | 기준 일자2 | string | Y | 8 |  |
| `avrg_prc` | 평균가격 | string | Y | 11 |  |

**Request Example:**
```
fid_cond_mrkt_div_code:J  fid_cond_scr_div_code:20482  fid_input_iscd:0000  fid_period_div_code:D  fid_input_cnt_1:000000000000  fid_trgt_exls_cls_code:0  fid_trgt_cls_code:0  fid_aply_rang_prc_1:  fid_aply_rang_prc_2:  fid_aply_rang_vol:0
```

**Response Example:**
```
{      "output": [          {              "mksc_shrn_iscd": "138930",              "hts_kor_isnm": "BNK금융지주",              "stck_prpr": "7760",              "prdy_vrss": "-10",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-0.13",              "acml_vol": "874160",              "acml_tr_pbmn": "6842692780",              "ssts_cntg_qty": "64031",              "ssts_vol_rlim": "7.32",              "ssts_tr_pbmn": "499643430",              "ssts_tr_pbmn_rlim": "7.30",              "stnd_date1": "20240329",              "stnd_date2": "20240329",              "avrg_prc": "7803"          },          {              "mksc_shrn_iscd": "024110",              "hts_kor_isnm": "기업은행",              "stck_prpr": "13230",              "prdy_vrss": "-270",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-2.00",              "acml_vol": "2940414",              "acml_tr_pbmn": "39892800710",              "ssts_cntg_qty": "42457",              "ssts_vol_rlim": "1.44",              "ssts_tr_pbmn": "573293240",              "ssts_tr_pbmn_rlim": "1.44",              "stnd_date1": "0",              "stnd_date2": "0",              "avrg_prc": "13502"          },          {              "mksc_shrn_iscd": "067310",              "hts_kor_isnm": "하나마이크론",              "stck_prpr": "29300",              "prdy_vrss": "650",              "prdy_vrss_sign": "2",              "prdy_ctrt": "2.27",              "acml_vol": "7785025",              "acml_tr_pbmn": "219228491967",              "ssts_cntg_qty": "41626",              "ssts_vol_rlim": "0.53",              "ssts_tr_pbmn": "1195641050",              "ssts_tr_pbmn_rlim": "0.55",              "stnd_date1": "0",              "stnd_date2": "0",              "avrg_prc": "28723"          },          {              "mksc_shrn_iscd": "139130",              "hts_kor_isnm": "DGB금융지주",              "stck_prpr": "8480",              "prdy_vrss": "-70",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-0.82",              "acml_vol": "646804",              "acml_tr_pbmn": "5579590090",              "ssts_cntg_qty": "41615",              "ssts_vol_rlim": "6.43",              "ssts_tr_pbmn": "357709910",              "ssts_tr_pbmn_rlim": "6.41",              "stnd_date1": "0",              "stnd_date2": "0",              "avrg_prc": "8595"          },          {              "mksc_shrn_iscd": "316140",              "hts_kor_isnm": "우리금융지주",              "stck_prpr": "14050",              "prdy_vrss": "-270",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-1.89",              "acml_vol": "2158189",              "acml_tr_pbmn": "30895435840",              "ssts_cntg_qty": "39928",              "ssts_vol_rlim": "1.85",              "ssts_tr_pbmn": "570341910",              "ssts_tr_pbmn_rlim": "1.85",              "stnd_date1": "0",              "stnd_date2": "0",              "avrg_prc": "14284"          },          {              "mksc_shrn_iscd": "005930",              "hts_ko
```

---
### 143. 국내주식 이격도 순위

| Field | Value |
|---|---|
| Sheet | `국내주식 이격도 순위` |
| Menu | [국내주식] 순위분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ranking/disparity` |
| TR_ID (실전) | `FHPST01780000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `fid_input_price_2` | 입력 가격2 | string | Y | 12 | 입력값 없을때 전체 (~ 가격) |
| `fid_cond_mrkt_div_code` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (J:KRX, NX:NXT) |
| `fid_cond_scr_div_code` | 조건 화면 분류 코드 | string | Y | 5 | Unique key( 20178 ) |
| `fid_div_cls_code` | 분류 구분 코드 | string | Y | 2 | 0: 전체, 1:관리종목, 2:투자주의, 3:투자경고, 4:투자위험예고, 5:투자위험, 6:보톧주, 7:우선주 |
| `fid_rank_sort_cls_code` | 순위 정렬 구분 코드 | string | Y | 2 | 0: 이격도상위순, 1:이격도하위순 |
| `fid_hour_cls_code` | 시간 구분 코드 | string | Y | 5 | 5:이격도5, 10:이격도10, 20:이격도20, 60:이격도60, 120:이격도120 |
| `fid_input_iscd` | 입력 종목코드 | string | Y | 12 | 0000:전체, 0001:거래소, 1001:코스닥, 2001:코스피200 |
| `fid_trgt_cls_code` | 대상 구분 코드 | string | Y | 32 | 0 : 전체 |
| `fid_trgt_exls_cls_code` | 대상 제외 구분 코드 | string | Y | 32 | 0 : 전체 |
| `fid_input_price_1` | 입력 가격1 | string | Y | 12 | 입력값 없을때 전체 (가격 ~) |
| `fid_vol_cnt` | 거래량 수 | string | Y | 12 | 입력값 없을때 전체 (거래량 ~) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `mksc_shrn_iscd` | 유가증권 단축 종목코드 | string | Y | 9 |  |
| `data_rank` | 데이터 순위 | string | Y | 10 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `d5_dsrt` | 5일 이격도 | string | Y | 112 |  |
| `d10_dsrt` | 10일 이격도 | string | Y | 112 |  |
| `d20_dsrt` | 20일 이격도 | string | Y | 112 |  |
| `d60_dsrt` | 60일 이격도 | string | Y | 112 |  |
| `d120_dsrt` | 120일 이격도 | string | Y | 112 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"J",  "fid_cond_scr_div_code":"20178",  "fid_div_cls_code":"0",  "fid_rank_sort_cls_code":"0",  "fid_hour_cls_code":"0000",  "fid_input_iscd":"0000",  "fid_trgt_cls_code":"0",  "fid_trgt_exls_cls_code":"0",  "fid_input_price_1":"",  "fid_input_price_2":"",  "fid_vol_cnt":""  }
```

**Response Example:**
```
{      "output": [          {              "mksc_shrn_iscd": "199800",              "data_rank": "1",              "hts_kor_isnm": "툴젠",              "stck_prpr": "76100",              "prdy_vrss": "17500",              "prdy_ctrt": "29.86",              "prdy_vrss_sign": "1",              "acml_vol": "333421",              "d5_dsrt": "126.92",              "d10_dsrt": "137.66",              "d20_dsrt": "143.04",              "d60_dsrt": "134.37",              "d120_dsrt": "146.59"          },          {              "mksc_shrn_iscd": "032800",              "data_rank": "2",              "hts_kor_isnm": "판타지오",              "stck_prpr": "394",              "prdy_vrss": "63",              "prdy_ctrt": "19.03",              "prdy_vrss_sign": "2",              "acml_vol": "42856944",              "d5_dsrt": "125.32",              "d10_dsrt": "154.75",              "d20_dsrt": "181.27",              "d60_dsrt": "183.38",              "d120_dsrt": "169.90"          },          {              "mksc_shrn_iscd": "083790",              "data_rank": "3",              "hts_kor_isnm": "CG인바이츠",              "stck_prpr": "4235",              "prdy_vrss": "855",              "prdy_ctrt": "25.30",              "prdy_vrss_sign": "2",              "acml_vol": "3067053",              "d5_dsrt": "123.18",              "d10_dsrt": "121.02",              "d20_dsrt": "118.13",              "d60_dsrt": "138.02",              "d120_dsrt": "145.73"          },          {              "mksc_shrn_iscd": "237690",              "data_rank": "4",              "hts_kor_isnm": "에스티팜",              "stck_prpr": "96400",              "prdy_vrss": "18800",              "prdy_ctrt": "24.23",              "prdy_vrss_sign": "2",              "acml_vol": "1694242",              "d5_dsrt": "121.72",              "d10_dsrt": "127.83",              "d20_dsrt": "138.42",              "d60_dsrt": "147.80",              "d120_dsrt": "142.70"          },          {              "mksc_shrn_iscd": "010660",              "data_rank": "5",              "hts_kor_isnm": "화천기계",              "stck_prpr": "7250",              "prdy_vrss": "990",              "prdy_ctrt": "15.81",              "prdy_vrss_sign": "2",              "acml_vol": "10506735",              "d5_dsrt": "120.59",              "d10_dsrt": "135.12",              "d20_dsrt": "149.55",              "d60_dsrt": "179.64",              "d120_dsrt": "175.87"          },          {              "mksc_shrn_iscd": "103590",              "data_rank": "6",              "hts_kor_isnm": "일진전기",              "stck_prpr": "17370",              "prdy_vrss": "2690",              "prdy_ctrt": "18.32",              "prdy_vrss_sign": "2",              "acml_vol": "10956331",              "d5_dsrt": "119.93",              "d10_dsrt": "128.02",              "d20_dsrt": "142.95",              "d60_dsrt": "149.68",              "d120_dsrt": "144.38"          },          {              "mksc_shrn_iscd": "276730",              "data_rank": "7",           
```

---
### 144. HTS조회상위20종목

| Field | Value |
|---|---|
| Sheet | `HTS조회상위20종목` |
| Menu | [국내주식] 순위분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ranking/hts-top-view` |
| TR_ID (실전) | `HHMCM000100C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `mrkt_div_cls_code` | 시장구분 | string | Y | 9 | J : 코스피, Q : 코스닥 |
| `mksc_shrn_iscd` | 종목코드 | string | Y | 2 | 종목코드 |

**Request Example:**
```
없음
```

**Response Example:**
```
{      "output1": [          {              "mrkt_div_cls_code": "J",              "mksc_shrn_iscd": "005930"          },          {              "mrkt_div_cls_code": "J",              "mksc_shrn_iscd": "233740"          },          {              "mrkt_div_cls_code": "Q",              "mksc_shrn_iscd": "458650"          },          {              "mrkt_div_cls_code": "J",              "mksc_shrn_iscd": "042660"          },          {              "mrkt_div_cls_code": "J",              "mksc_shrn_iscd": "251340"          },          {              "mrkt_div_cls_code": "J",              "mksc_shrn_iscd": "000660"          },          {              "mrkt_div_cls_code": "Q",              "mksc_shrn_iscd": "196170"          },          {              "mrkt_div_cls_code": "J",              "mksc_shrn_iscd": "475560"          },          {              "mrkt_div_cls_code": "Q",              "mksc_shrn_iscd": "163280"          },          {              "mrkt_div_cls_code": "J",              "mksc_shrn_iscd": "001470"          },          {              "mrkt_div_cls_code": "J",              "mksc_shrn_iscd": "272210"          },          {              "mrkt_div_cls_code": "J",              "mksc_shrn_iscd": "017860"          },          {              "mrkt_div_cls_code": "Q",              "mksc_shrn_iscd": "475960"          },          {              "mrkt_div_cls_code": "J",              "mksc_shrn_iscd": "000100"          },          {              "mrkt_div_cls_code": "J",              "mksc_shrn_iscd": "035420"          },          {              "mrkt_div_cls_code": "Q",              "mksc_shrn_iscd": "460930"          },          {              "mrkt_div_cls_code": "J",              "mksc_shrn_iscd": "066970"          },          {              "mrkt_div_cls_code": "Q",              "mksc_shrn_iscd": "378800"          },          {              "mrkt_div_cls_code": "J",              "mksc_shrn_iscd": "373220"          },          {              "mrkt_div_cls_code": "Q",              "mksc_shrn_iscd": "255220"          }      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 145. 거래량순위

| Field | Value |
|---|---|
| Sheet | `거래량순위` |
| Menu | [국내주식] 순위분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/quotations/volume-rank` |
| TR_ID (실전) | `FHPST01710000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | J:KRX, NX:NXT |
| `FID_COND_SCR_DIV_CODE` | 조건 화면 분류 코드 | string | Y | 5 | 20171 |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 0000(전체) 기타(업종코드) |
| `FID_DIV_CLS_CODE` | 분류 구분 코드 | string | Y | 2 | 0(전체) 1(보통주) 2(우선주) |
| `FID_BLNG_CLS_CODE` | 소속 구분 코드 | string | Y | 2 | 0 : 평균거래량 1:거래증가율 2:평균거래회전율 3:거래금액순 4:평균거래금액회전율 |
| `FID_TRGT_CLS_CODE` | 대상 구분 코드 | string | Y | 32 | 1 or 0 9자리 (차례대로 증거금 30% 40% 50% 60% 100% 신용보증금 30% 40% 50% 60%)  ex) "111111111" |
| `FID_TRGT_EXLS_CLS_CODE` | 대상 제외 구분 코드 | string | Y | 32 | 1 or 0 10자리 (차례대로 투자위험/경고/주의 관리종목 정리매매 불성실공시 우선주 거래정지 ETF ETN 신용주문불가 SPAC)  ex) "0000000000" |
| `FID_INPUT_PRICE_1` | 입력 가격1 | string | Y | 12 | 가격 ~  ex) "0"    전체 가격 대상 조회 시 FID_INPUT_PRICE_1, FID_INPUT_PRICE_2 모두 ""(공란) 입력 |
| `FID_INPUT_PRICE_2` | 입력 가격2 | string | Y | 12 | ~ 가격  ex) "1000000"    전체 가격 대상 조회 시 FID_INPUT_PRICE_1, FID_INPUT_PRICE_2 모두 ""(공란) 입력 |
| `FID_VOL_CNT` | 거래량 수 | string | Y | 12 | 거래량 ~  ex) "100000"    전체 거래량 대상 조회 시 FID_VOL_CNT ""(공란) 입력 |
| `FID_INPUT_DATE_1` | 입력 날짜1 | string | Y | 10 | ""(공란) 입력 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `Output` | 응답상세 | object array | Y |  | Array |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `mksc_shrn_iscd` | 유가증권 단축 종목코드 | string | Y | 9 |  |
| `data_rank` | 데이터 순위 | string | Y | 10 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `prdy_vol` | 전일 거래량 | string | Y | 18 |  |
| `lstn_stcn` | 상장 주수 | string | Y | 18 |  |
| `avrg_vol` | 평균 거래량 | string | Y | 18 |  |
| `n_befr_clpr_vrss_prpr_rate` | N일전종가대비현재가대비율 | string | Y | 82 |  |
| `vol_inrt` | 거래량증가율 | string | Y | 84 |  |
| `vol_tnrt` | 거래량 회전율 | string | Y | 82 |  |
| `nday_vol_tnrt` | N일 거래량 회전율 | string | Y | 8 |  |
| `avrg_tr_pbmn` | 평균 거래 대금 | string | Y | 18 |  |
| `tr_pbmn_tnrt` | 거래대금회전율 | string | Y | 82 |  |
| `nday_tr_pbmn_tnrt` | N일 거래대금 회전율 | string | Y | 8 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |

**Request Example:**
```
{  "FID_COND_MRKT_DIV_CODE":"J",  "FID_COND_SCR_DIV_CODE":"20171",  "FID_INPUT_ISCD":"0000",  "FID_DIV_CLS_CODE":"0",  "FID_BLNG_CLS_CODE":"0",  "FID_TRGT_CLS_CODE":"111111111",  "FID_TRGT_EXLS_CLS_CODE":"000000",  "FID_INPUT_PRICE_1":"0",  "FID_INPUT_PRICE_2":"0",  "FID_VOL_CNT":"0",  "FID_INPUT_DATE_1":"0"  }
```

**Response Example:**
```
{      "output": [          {              "hts_kor_isnm": "삼성전자",              "mksc_shrn_iscd": "005930",              "data_rank": "1",              "stck_prpr": "65100",              "prdy_vrss_sign": "5",              "prdy_vrss": "-300",              "prdy_ctrt": "-0.46",              "acml_vol": "8958147",              "prdy_vol": "12334657",              "lstn_stcn": "5969782550",              "avrg_vol": "8958147",              "n_befr_clpr_vrss_prpr_rate": "-0.46",              "vol_inrt": "72.63",              "vol_tnrt": "0.15",              "nday_vol_tnrt": "0.15",              "avrg_tr_pbmn": "584861890300",              "tr_pbmn_tnrt": "0.15",              "nday_tr_pbmn_tnrt": "0.15",              "acml_tr_pbmn": "584861890300"          },          {              "hts_kor_isnm": "두산에너빌리티",              "mksc_shrn_iscd": "034020",              "data_rank": "2",              "stck_prpr": "15730",              "prdy_vrss_sign": "5",              "prdy_vrss": "-90",              "prdy_ctrt": "-0.57",              "acml_vol": "3285533",              "prdy_vol": "6090991",              "lstn_stcn": "640561146",              "avrg_vol": "3285533",              "n_befr_clpr_vrss_prpr_rate": "-0.57",              "vol_inrt": "53.94",              "vol_tnrt": "0.51",              "nday_vol_tnrt": "0.51",              "avrg_tr_pbmn": "52081429080",              "tr_pbmn_tnrt": "0.52",              "nday_tr_pbmn_tnrt": "0.52",              "acml_tr_pbmn": "52081429080"          },          {              "hts_kor_isnm": "LG디스플레이",              "mksc_shrn_iscd": "034220",              "data_rank": "3",              "stck_prpr": "15670",              "prdy_vrss_sign": "2",              "prdy_vrss": "470",              "prdy_ctrt": "3.09",              "acml_vol": "3171164",              "prdy_vol": "1476096",              "lstn_stcn": "357815700",              "avrg_vol": "3171164",              "n_befr_clpr_vrss_prpr_rate": "3.09",              "vol_inrt": "214.83",              "vol_tnrt": "0.89",              "nday_vol_tnrt": "0.89",              "avrg_tr_pbmn": "50045759170",              "tr_pbmn_tnrt": "0.89",              "nday_tr_pbmn_tnrt": "0.89",              "acml_tr_pbmn": "50045759170"          },          {              "hts_kor_isnm": "SK하이닉스",              "mksc_shrn_iscd": "000660",              "data_rank": "4",              "stck_prpr": "91700",              "prdy_vrss_sign": "2",              "prdy_vrss": "1300",              "prdy_ctrt": "1.44",              "acml_vol": "2833739",              "prdy_vol": "5121364",              "lstn_stcn": "728002365",              "avrg_vol": "2833739",              "n_befr_clpr_vrss_prpr_rate": "1.44",              "vol_inrt": "55.33",              "vol_tnrt": "0.39",              "nday_vol_tnrt": "0.39",              "avrg_tr_pbmn": "258969317100",              "tr_pbmn_tnrt": "0.39",              "nday_tr_pbmn_tnrt": "0.39",              "acml_tr_pbmn": "258969317100"          },     
```

---
### 146. 국내주식 수익자산지표 순위

| Field | Value |
|---|---|
| Sheet | `국내주식 수익자산지표 순위` |
| Menu | [국내주식] 순위분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ranking/profit-asset-index` |
| TR_ID (실전) | `FHPST01730000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `fid_cond_mrkt_div_code` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (J:KRX, NX:NXT) |
| `fid_trgt_cls_code` | 대상 구분 코드 | string | Y | 32 | 0:전체 |
| `fid_cond_scr_div_code` | 조건 화면 분류 코드 | string | Y | 5 | Unique key( 20173 ) |
| `fid_input_iscd` | 입력 종목코드 | string | Y | 12 | 0000:전체, 0001:거래소, 1001:코스닥, 2001:코스피200 |
| `fid_div_cls_code` | 분류 구분 코드 | string | Y | 2 | 0:전체 |
| `fid_input_price_1` | 입력 가격1 | string | Y | 12 | 입력값 없을때 전체 (가격 ~) |
| `fid_input_price_2` | 입력 가격2 | string | Y | 12 | 입력값 없을때 전체 (~ 가격) |
| `fid_vol_cnt` | 거래량 수 | string | Y | 12 | 입력값 없을때 전체 (거래량 ~) |
| `fid_input_option_1` | 입력 옵션1 | string | Y | 10 | 회계연도 (2023) |
| `fid_input_option_2` | 입력 옵션2 | string | Y | 10 | 0: 1/4분기 , 1: 반기, 2: 3/4분기, 3: 결산 |
| `fid_rank_sort_cls_code` | 순위 정렬 구분 코드 | string | Y | 2 | 0:매출이익 1:영업이익 2:경상이익 3:당기순이익 4:자산총계 5:부채총계 6:자본총계 |
| `fid_blng_cls_code` | 소속 구분 코드 | string | Y | 2 | 0:전체 |
| `fid_trgt_exls_cls_code` | 대상 제외 구분 코드 | string | Y | 32 | 0:전체 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `data_rank` | 데이터 순위 | string | Y | 10 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `mksc_shrn_iscd` | 유가증권 단축 종목코드 | string | Y | 9 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `sale_totl_prfi` | 매출 총 이익 | string | Y | 182 |  |
| `bsop_prti` | 영업 이익 | string | Y | 182 |  |
| `op_prfi` | 경상 이익 | string | Y | 182 |  |
| `thtr_ntin` | 당기순이익 | string | Y | 102 |  |
| `total_aset` | 자산총계 | string | Y | 102 |  |
| `total_lblt` | 부채총계 | string | Y | 102 |  |
| `total_cptl` | 자본총계 | string | Y | 102 |  |
| `stac_month` | 결산 월 | string | Y | 2 |  |
| `stac_month_cls_code` | 결산 월 구분 코드 | string | Y | 2 |  |
| `iqry_csnu` | 조회 건수 | string | Y | 10 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"J",  "fid_cond_scr_div_code":"20173",  "fid_input_iscd":"0000",  "fid_div_cls_code":"0",  "fid_input_price_1":"",  "fid_input_price_2":"",  "fid_vol_cnt":"",  "fid_input_option_1":"2023",  "fid_input_option_2":"0",  "fid_rank_sort_cls_code":"0",  "fid_blng_cls_code":"0",  "fid_trgt_exls_cls_code":"0",  "fid_trgt_cls_code":"0",  }
```

**Response Example:**
```
{      "output": [          {              "data_rank": "1",              "hts_kor_isnm": "삼성전자",              "mksc_shrn_iscd": "005930",              "stck_prpr": "72800",              "prdy_vrss": "500",              "prdy_vrss_sign": "2",              "prdy_ctrt": "0.69",              "acml_vol": "3682788",              "sale_totl_prfi": "177383.00",              "bsop_prti": "6402.00",              "op_prfi": "18264.00",              "thtr_ntin": "15746.00",              "total_aset": "4540918.00",              "total_lblt": "942924.00",              "total_cptl": "3597994.00",              "stac_month": "12",              "stac_month_cls_code": "0",              "iqry_csnu": "2468"          },          {              "data_rank": "2",              "hts_kor_isnm": "현대차",              "mksc_shrn_iscd": "005380",              "stck_prpr": "246500",              "prdy_vrss": "3000",              "prdy_vrss_sign": "2",              "prdy_ctrt": "1.23",              "acml_vol": "264085",              "sale_totl_prfi": "77220.00",              "bsop_prti": "35927.00",              "op_prfi": "45909.00",              "thtr_ntin": "34194.00",              "total_aset": "2643636.00",              "total_lblt": "1704440.00",              "total_cptl": "939195.00",              "stac_month": "12",              "stac_month_cls_code": "0",              "iqry_csnu": "2468"          },          {              "data_rank": "3",              "hts_kor_isnm": "KT",              "mksc_shrn_iscd": "030200",              "stck_prpr": "38100",              "prdy_vrss": "-150",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-0.39",              "acml_vol": "98431",              "sale_totl_prfi": "64437.00",              "bsop_prti": "4861.00",              "op_prfi": "4376.00",              "thtr_ntin": "3096.00",              "total_aset": "402144.00",              "total_lblt": "220625.00",              "total_cptl": "181520.00",              "stac_month": "12",              "stac_month_cls_code": "0",              "iqry_csnu": "2468"          },          {              "data_rank": "4",              "hts_kor_isnm": "기아",              "mksc_shrn_iscd": "000270",              "stck_prpr": "127400",              "prdy_vrss": "2400",              "prdy_vrss_sign": "2",              "prdy_ctrt": "1.92",              "acml_vol": "505419",              "sale_totl_prfi": "53734.00",              "bsop_prti": "28740.00",              "op_prfi": "31421.00",              "thtr_ntin": "21198.00",              "total_aset": "776127.00",              "total_lblt": "375811.00",              "total_cptl": "400316.00",              "stac_month": "12",              "stac_month_cls_code": "0",              "iqry_csnu": "2468"          },          {              "data_rank": "5",              "hts_kor_isnm": "LG전자",              "mksc_shrn_iscd": "066570",              "stck_prpr": "97900",              "prdy_vrss": "-1000",              "prdy_vrss_sign": "5",      
```

---
### 147. 국내주식 신고_신저근접종목 상위

| Field | Value |
|---|---|
| Sheet | `국내주식 신고_신저근접종목 상위` |
| Menu | [국내주식] 순위분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ranking/near-new-highlow` |
| TR_ID (실전) | `FHPST01870000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `fid_aply_rang_vol` | 적용 범위 거래량 | string | Y | 18 | 0: 전체, 100: 100주 이상 |
| `fid_cond_mrkt_div_code` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (주식 J) |
| `fid_cond_scr_div_code` | 조건 화면 분류 코드 | string | Y | 5 | Unique key(20187) |
| `fid_div_cls_code` | 분류 구분 코드 | string | Y | 2 | 0:전체, 1:관리종목, 2:투자주의, 3:투자경고 |
| `fid_input_cnt_1` | 입력 수1 | string | Y | 2 | 괴리율 최소 |
| `fid_input_cnt_2` | 입력 수2 | string | Y | 10 | 괴리율 최대 |
| `fid_prc_cls_code` | 가격 구분 코드 | string | Y | 10 | 0:신고근접, 1:신저근접 |
| `fid_input_iscd` | 입력 종목코드 | string | Y | 12 | 0000:전체, 0001:거래소, 1001:코스닥, 2001:코스피200, 4001: KRX100 |
| `fid_trgt_cls_code` | 대상 구분 코드 | string | Y | 32 | 0: 전체 |
| `fid_trgt_exls_cls_code` | 대상 제외 구분 코드 | string | Y | 32 | 0:전체, 1:관리종목, 2:투자주의, 3:투자경고, 4:투자위험예고, 5:투자위험, 6:보통주, 7:우선주 |
| `fid_aply_rang_prc_1` | 적용 범위 가격1 | string | Y | 18 | 가격 ~ |
| `fid_aply_rang_prc_2` | 적용 범위 가격2 | string | Y | 18 | ~ 가격 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `mksc_shrn_iscd` | 유가증권 단축 종목코드 | string | Y | 9 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `askp` | 매도호가 | string | Y | 10 |  |
| `askp_rsqn1` | 매도호가 잔량1 | string | Y | 12 |  |
| `bidp` | 매수호가 | string | Y | 10 |  |
| `bidp_rsqn1` | 매수호가 잔량1 | string | Y | 12 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `new_hgpr` | 신 최고가 | string | Y | 10 |  |
| `hprc_near_rate` | 고가 근접 비율 | string | Y | 84 |  |
| `new_lwpr` | 신 최저가 | string | Y | 10 |  |
| `lwpr_near_rate` | 저가 근접 비율 | string | Y | 84 |  |
| `stck_sdpr` | 주식 기준가 | string | Y | 10 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"J",  "fid_cond_scr_div_code":"20187",  "fid_div_cls_code":"0",  "fid_input_cnt_1":"",  "fid_input_cnt_2":"",  "fid_prc_cls_code":"0",  "fid_input_iscd":"0000",  "fid_trgt_cls_code":"0",  "fid_trgt_exls_cls_code":"0",  "fid_aply_rang_prc_1":"",  "fid_aply_rang_prc_2":"",  "fid_aply_rang_vol":"0"  }
```

**Response Example:**
```
{      "output": [          {              "hts_kor_isnm": "IHQ",              "mksc_shrn_iscd": "003560",              "stck_prpr": "10760",              "prdy_vrss_sign": "0",              "prdy_vrss": "0",              "prdy_ctrt": "0.00",              "askp": "0",              "askp_rsqn1": "0",              "bidp": "0",              "bidp_rsqn1": "0",              "acml_vol": "0",              "new_hgpr": "10760",              "hprc_near_rate": "0.00",              "new_lwpr": "185",              "lwpr_near_rate": "-98.28",              "stck_sdpr": "10760"          },          {              "hts_kor_isnm": "선도전기",              "mksc_shrn_iscd": "007610",              "stck_prpr": "3000",              "prdy_vrss_sign": "0",              "prdy_vrss": "0",              "prdy_ctrt": "0.00",              "askp": "0",              "askp_rsqn1": "0",              "bidp": "0",              "bidp_rsqn1": "0",              "acml_vol": "0",              "new_hgpr": "3000",              "hprc_near_rate": "0.00",              "new_lwpr": "3000",              "lwpr_near_rate": "0.00",              "stck_sdpr": "3000"          },          {              "hts_kor_isnm": "청호ICT",              "mksc_shrn_iscd": "012600",              "stck_prpr": "2490",              "prdy_vrss_sign": "0",              "prdy_vrss": "0",              "prdy_ctrt": "0.00",              "askp": "0",              "askp_rsqn1": "0",              "bidp": "0",              "bidp_rsqn1": "0",              "acml_vol": "0",              "new_hgpr": "2490",              "hprc_near_rate": "0.00",              "new_lwpr": "2490",              "lwpr_near_rate": "0.00",              "stck_sdpr": "2490"          },          {              "hts_kor_isnm": "광림",              "mksc_shrn_iscd": "014200",              "stck_prpr": "1006",              "prdy_vrss_sign": "0",              "prdy_vrss": "0",              "prdy_ctrt": "0.00",              "askp": "0",              "askp_rsqn1": "0",              "bidp": "0",              "bidp_rsqn1": "0",              "acml_vol": "0",              "new_hgpr": "1006",              "hprc_near_rate": "0.00",              "new_lwpr": "1006",              "lwpr_near_rate": "0.00",              "stck_sdpr": "1006"          },          {              "hts_kor_isnm": "비케이탑스",              "mksc_shrn_iscd": "030790",              "stck_prpr": "904",              "prdy_vrss_sign": "0",              "prdy_vrss": "0",              "prdy_ctrt": "0.00",              "askp": "0",              "askp_rsqn1": "0",              "bidp": "0",              "bidp_rsqn1": "0",              "acml_vol": "0",              "new_hgpr": "904",              "hprc_near_rate": "0.00",              "new_lwpr": "904",              "lwpr_near_rate": "0.00",              "stck_sdpr": "904"          },          {              "hts_kor_isnm": "더라미",              "mksc_shrn_iscd": "032860",              "stck_prpr": "3640",              "prdy_vrss_sign": "0",              "prdy_vrss": "0"
```

---
### 148. 국내주식 우선주_괴리율 상위

| Field | Value |
|---|---|
| Sheet | `국내주식 우선주_괴리율 상위` |
| Menu | [국내주식] 순위분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ranking/prefer-disparate-ratio` |
| TR_ID (실전) | `FHPST01770000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `fid_vol_cnt` | 거래량 수 | string | Y | 12 | 입력값 없을때 전체 (거래량 ~) |
| `fid_cond_mrkt_div_code` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (J:KRX, NX:NXT) |
| `fid_cond_scr_div_code` | 조건 화면 분류 코드 | string | Y | 5 | Unique key( 20177 ) |
| `fid_div_cls_code` | 분류 구분 코드 | string | Y | 2 | 0: 전체 |
| `fid_input_iscd` | 입력 종목코드 | string | Y | 12 | 0000:전체, 0001:거래소, 1001:코스닥, 2001:코스피200 |
| `fid_trgt_cls_code` | 대상 구분 코드 | string | Y | 32 | 0 : 전체 |
| `fid_trgt_exls_cls_code` | 대상 제외 구분 코드 | string | Y | 32 | 0 : 전체 |
| `fid_input_price_1` | 입력 가격1 | string | Y | 12 | 입력값 없을때 전체 (가격 ~) |
| `fid_input_price_2` | 입력 가격2 | string | Y | 12 | 입력값 없을때 전체 (~ 가격) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `mksc_shrn_iscd` | 유가증권 단축 종목코드 | string | Y | 9 |  |
| `data_rank` | 데이터 순위 | string | Y | 10 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 10 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 10 |  |
| `acml_vol` | 누적 거래량 | string | Y | 10 |  |
| `prst_iscd` | 우선주 종목코드 | string | Y | 10 |  |
| `prst_kor_isnm` | 우선주 한글 종목명 | string | Y | 10 |  |
| `prst_prpr` | 우선주 현재가 | string | Y | 10 |  |
| `prst_prdy_vrss` | 우선주 전일대비 | string | Y | 10 |  |
| `prst_prdy_vrss_sign` | 우선주 전일 대비 부호 | string | Y | 10 |  |
| `prst_acml_vol` | 우선주 누적 거래량 | string | Y | 40 |  |
| `diff_prpr` | 차이 현재가 | string | Y | 10 |  |
| `dprt` | 괴리율 | string | Y | 10 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 1 |  |
| `prst_prdy_ctrt` | 우선주 전일 대비율 | string | Y | 82 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"J",  "fid_cond_scr_div_code":"20177",  "fid_div_cls_code":"0",  "fid_input_iscd":"0000",  "fid_trgt_cls_code":"0"  "fid_trgt_exls_cls_code":"0",  "fid_input_price_1":"",  "fid_input_price_2":"",  "fid_vol_cnt":"",  }
```

**Response Example:**
```
{      "output": [          {              "mksc_shrn_iscd": "336370",              "data_rank": "1",              "hts_kor_isnm": "솔루스첨단소재",              "stck_prpr": "13610",              "prdy_vrss": "210",              "prdy_vrss_sign": "2",              "acml_vol": "108604",              "prst_iscd": "A33637K",              "prst_kor_isnm": "솔루스첨단소재1우",              "prst_prpr": "2890",              "prst_prdy_vrss": "30",              "prst_prdy_vrss_sign": "2",              "prst_acml_vol": "8203",              "diff_prpr": "10720",              "dprt": "78.77",              "prdy_ctrt": "1.57",              "prst_prdy_ctrt": "1.05"          },          {              "mksc_shrn_iscd": "336260",              "data_rank": "2",              "hts_kor_isnm": "두산퓨얼셀",              "stck_prpr": "20300",              "prdy_vrss": "510",              "prdy_vrss_sign": "2",              "acml_vol": "186883",              "prst_iscd": "A33626K",              "prst_kor_isnm": "두산퓨얼셀1우",              "prst_prpr": "6140",              "prst_prdy_vrss": "40",              "prst_prdy_vrss_sign": "2",              "prst_acml_vol": "4656",              "diff_prpr": "14160",              "dprt": "69.75",              "prdy_ctrt": "2.58",              "prst_prdy_ctrt": "0.66"          },          {              "mksc_shrn_iscd": "090430",              "data_rank": "3",              "hts_kor_isnm": "아모레퍼시픽",              "stck_prpr": "113000",              "prdy_vrss": "-100",              "prdy_vrss_sign": "5",              "acml_vol": "28537",              "prst_iscd": "A090435",              "prst_kor_isnm": "아모레퍼시픽우",              "prst_prpr": "34900",              "prst_prdy_vrss": "900",              "prst_prdy_vrss_sign": "2",              "prst_acml_vol": "4561",              "diff_prpr": "78100",              "dprt": "69.12",              "prdy_ctrt": "-0.09",              "prst_prdy_ctrt": "2.65"          },          {              "mksc_shrn_iscd": "336370",              "data_rank": "4",              "hts_kor_isnm": "솔루스첨단소재",              "stck_prpr": "13610",              "prdy_vrss": "210",              "prdy_vrss_sign": "2",              "acml_vol": "108604",              "prst_iscd": "A33637L",              "prst_kor_isnm": "솔루스첨단소재2우B",              "prst_prpr": "4825",              "prst_prdy_vrss": "40",              "prst_prdy_vrss_sign": "2",              "prst_acml_vol": "8216",              "diff_prpr": "8785",              "dprt": "64.55",              "prdy_ctrt": "1.57",              "prst_prdy_ctrt": "0.84"          },          {              "mksc_shrn_iscd": "007810",              "data_rank": "5",              "hts_kor_isnm": "코리아써키트",              "stck_prpr": "18580",              "prdy_vrss": "340",              "prdy_vrss_sign": "2",              "acml_vol": "89546",              "prst_iscd": "A007815",              "prst_kor_isnm": "코리아써우",              "prst_prpr": "6610",              "prst_prdy_vrss": "0",              "
```

---
### 149. 국내주식 대량체결건수 상위

| Field | Value |
|---|---|
| Sheet | `국내주식 대량체결건수 상위` |
| Menu | [국내주식] 순위분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ranking/bulk-trans-num` |
| TR_ID (실전) | `FHKST190900C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `fid_aply_rang_prc_2` | 적용 범위 가격2 | string | Y | 18 | ~ 가격 |
| `fid_cond_mrkt_div_code` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (J:KRX, NX:NXT) |
| `fid_cond_scr_div_code` | 조건 화면 분류 코드 | string | Y | 5 | Unique key(11909) |
| `fid_input_iscd` | 입력 종목코드 | string | Y | 12 | 0000:전체, 0001:거래소, 1001:코스닥, 2001:코스피200, 4001: KRX100 |
| `fid_rank_sort_cls_code` | 순위 정렬 구분 코드 | string | Y | 2 | 0:매수상위, 1:매도상위 |
| `fid_div_cls_code` | 분류 구분 코드 | string | Y | 2 | 0:전체 |
| `fid_input_price_1` | 입력 가격1 | string | Y | 12 | 건별금액 ~ |
| `fid_aply_rang_prc_1` | 적용 범위 가격1 | string | Y | 18 | 가격 ~ |
| `fid_input_iscd_2` | 입력 종목코드2 | string | Y | 8 | 공백:전체종목, 개별종목 조회시 종목코드 (000660) |
| `fid_trgt_exls_cls_code` | 대상 제외 구분 코드 | string | Y | 32 | 0:전체 |
| `fid_trgt_cls_code` | 대상 구분 코드 | string | Y | 32 | 0:전체 |
| `fid_vol_cnt` | 거래량 수 | string | Y | 12 | 거래량 ~ |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `mksc_shrn_iscd` | 유가증권 단축 종목코드 | string | Y | 9 |  |
| `data_rank` | 데이터 순위 | string | Y | 10 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `shnu_cntg_csnu` | 매수2 체결 건수 | string | Y | 10 |  |
| `seln_cntg_csnu` | 매도 체결 건수 | string | Y | 10 |  |
| `ntby_cnqn` | 순매수 체결량 | string | Y | 18 |  |

**Request Example:**
```
{      "output": [          {              "mksc_shrn_iscd": "000660",              "data_rank": "1",              "hts_kor_isnm": "SK하이닉스",              "stck_prpr": "162600",              "prdy_vrss_sign": "2",              "prdy_vrss": "1400",              "prdy_ctrt": "0.87",              "acml_vol": "1593227",              "shnu_cntg_csnu": "3172",              "seln_cntg_csnu": "2104",              "ntby_cnqn": "1068"          },          {              "mksc_shrn_iscd": "207940",              "data_rank": "2",              "hts_kor_isnm": "삼성바이오로직스",              "stck_prpr": "869000",              "prdy_vrss_sign": "2",              "prdy_vrss": "43000",              "prdy_ctrt": "5.21",              "acml_vol": "140772",              "shnu_cntg_csnu": "1446",              "seln_cntg_csnu": "725",              "ntby_cnqn": "721"          },          {              "mksc_shrn_iscd": "006400",              "data_rank": "3",              "hts_kor_isnm": "삼성SDI",              "stck_prpr": "444000",              "prdy_vrss_sign": "2",              "prdy_vrss": "19000",              "prdy_ctrt": "4.47",              "acml_vol": "441633",              "shnu_cntg_csnu": "2167",              "seln_cntg_csnu": "1488",              "ntby_cnqn": "679"          },          {              "mksc_shrn_iscd": "007660",              "data_rank": "4",              "hts_kor_isnm": "이수페타시스",              "stck_prpr": "37150",              "prdy_vrss_sign": "2",              "prdy_vrss": "3700",              "prdy_ctrt": "11.06",              "acml_vol": "7737796",              "shnu_cntg_csnu": "2920",              "seln_cntg_csnu": "2361",              "ntby_cnqn": "559"          },          {              "mksc_shrn_iscd": "112040",              "data_rank": "5",              "hts_kor_isnm": "위메이드",              "stck_prpr": "67100",              "prdy_vrss_sign": "2",              "prdy_vrss": "10900",              "prdy_ctrt": "19.40",              "acml_vol": "3088002",              "shnu_cntg_csnu": "2150",              "seln_cntg_csnu": "1697",              "ntby_cnqn": "453"          },          {              "mksc_shrn_iscd": "457190",              "data_rank": "6",              "hts_kor_isnm": "이수스페셜티케미컬",              "stck_prpr": "389500",              "prdy_vrss_sign": "2",              "prdy_vrss": "47000",              "prdy_ctrt": "13.72",              "acml_vol": "671298",              "shnu_cntg_csnu": "2582",              "seln_cntg_csnu": "2201",              "ntby_cnqn": "381"          },          {              "mksc_shrn_iscd": "454910",              "data_rank": "7",              "hts_kor_isnm": "두산로보틱스",              "stck_prpr": "92900",              "prdy_vrss_sign": "2",              "prdy_vrss": "5800",              "prdy_ctrt": "6.66",              "acml_vol": "1169659",              "shnu_cntg_csnu": "1214",              "seln_cntg_csnu": "836",              "ntby_cnqn": "378"          },          {              "mksc_shrn_iscd": "441540",              "data_rank": "8",              "hts_kor_isnm": "HANARO Fn조선해운",              "stck_prpr": "10610",              "prdy_vrss_sign": "2",              "prdy_vrss": "245",              "prdy_ctrt": "2.36",              "acml_vol": "2423370",              "shnu_cntg_csnu": "458",              "seln_cntg_csnu": "82",              "ntby_cnqn": "376"          },          {              "mksc_shrn_iscd": "066970",              "data_rank": "9",              "hts_kor_isnm": "엘앤에프",              "stck_prpr": "174700",              "prdy_vrss_sign": "2",              "prdy_vrss": "12500",              "prdy_ctrt": "7.71",              "acml_vol": "424191",              "shnu_cntg_csnu": "676",              "seln_cntg_csnu": "328",              "ntby_cnqn": "348"          },          {              "mksc_shrn_iscd": "006260",              "data_rank": "10",              "hts_kor_isnm": "LS",              "stck_prpr": "111000",              "prdy_vrss_sign": "2",              "prdy_vrss": "6900",              "prdy_ctrt": "6.63",              "acml_vol": "475967",              "shnu_cntg_csnu": "831",              "seln_cntg_csnu": "510",              "ntby_cnqn": "321"          },          {              "mksc_shrn_iscd": "247540",              "data_rank": "11",              "hts_kor_isnm": "에코프로비엠",              "stck_prpr": "265500",              "prdy_vrss_sign": "2",              "prdy_vrss": "9000",              "prdy_ctrt": "3.51",              "acml_vol": "484949",              "shnu_cntg_csnu": "1320",              "seln_cntg_csnu": "1004",              "ntby_cnqn": "316"          },          {              "mksc_shrn_iscd": "051910",              "data_rank": "12",              "hts_kor_isnm": "LG화학",              "stck_prpr": "441500",              "prdy_vrss_sign": "2",              "prdy_vrss": "10500",              "prdy_ctrt": "2.44",              "acml_vol": "119939",              "shnu_cntg_csnu": "708",              "seln_cntg_csnu": "399",              "ntby_cnqn": "309"          },          {              "mksc_shrn_iscd": "196170",              "data_rank": "13",              "hts_kor_isnm": "알테오젠",              "stck_prpr": "209500",              "prdy_vrss_sign": "2",              "prdy_vrss": "5000",              "prdy_ctrt": "2.44",              "acml_vol": "1859846",              "shnu_cntg_csnu": "3637",              "seln_cntg_csnu": "3379",              "ntby_cnqn": "258"          },          {              "mksc_shrn_iscd": "042660",              "data_rank": "14",              "hts_kor_isnm": "한화오션",              "stck_prpr": "28850",              "prdy_vrss_sign": "2",              "prdy_vrss": "1850",              "prdy_ctrt": "6.85",              "acml_vol": "3370897",              "shnu_cntg_csnu": "1112",              "seln_cntg_csnu": "856",              "ntby_cnqn": "256"          },          {              "mksc_shrn_iscd": "000270",              "data_rank": "15",              "hts_kor_isnm": "기아",              "stck_prpr": "127500",              "prdy_vrss_sign": "2",              "prdy_vrss": "2500",              "prdy_ctrt": "2.00",              "acml_vol": "866368",              "shnu_cntg_csnu": "1342",              "seln_cntg_csnu": "1110",              "ntby_cnqn": "232"          }      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

**Response Example:**
```
{      "output": [          {              "mksc_shrn_iscd": "000660",              "data_rank": "1",              "hts_kor_isnm": "SK하이닉스",              "stck_prpr": "162600",              "prdy_vrss_sign": "2",              "prdy_vrss": "1400",              "prdy_ctrt": "0.87",              "acml_vol": "1593227",              "shnu_cntg_csnu": "3172",              "seln_cntg_csnu": "2104",              "ntby_cnqn": "1068"          },          {              "mksc_shrn_iscd": "207940",              "data_rank": "2",              "hts_kor_isnm": "삼성바이오로직스",              "stck_prpr": "869000",              "prdy_vrss_sign": "2",              "prdy_vrss": "43000",              "prdy_ctrt": "5.21",              "acml_vol": "140772",              "shnu_cntg_csnu": "1446",              "seln_cntg_csnu": "725",              "ntby_cnqn": "721"          },          {              "mksc_shrn_iscd": "006400",              "data_rank": "3",              "hts_kor_isnm": "삼성SDI",              "stck_prpr": "444000",              "prdy_vrss_sign": "2",              "prdy_vrss": "19000",              "prdy_ctrt": "4.47",              "acml_vol": "441633",              "shnu_cntg_csnu": "2167",              "seln_cntg_csnu": "1488",              "ntby_cnqn": "679"          },          {              "mksc_shrn_iscd": "007660",              "data_rank": "4",              "hts_kor_isnm": "이수페타시스",              "stck_prpr": "37150",              "prdy_vrss_sign": "2",              "prdy_vrss": "3700",              "prdy_ctrt": "11.06",              "acml_vol": "7737796",              "shnu_cntg_csnu": "2920",              "seln_cntg_csnu": "2361",              "ntby_cnqn": "559"          },          {              "mksc_shrn_iscd": "112040",              "data_rank": "5",              "hts_kor_isnm": "위메이드",              "stck_prpr": "67100",              "prdy_vrss_sign": "2",              "prdy_vrss": "10900",              "prdy_ctrt": "19.40",              "acml_vol": "3088002",              "shnu_cntg_csnu": "2150",              "seln_cntg_csnu": "1697",              "ntby_cnqn": "453"          },          {              "mksc_shrn_iscd": "457190",              "data_rank": "6",              "hts_kor_isnm": "이수스페셜티케미컬",              "stck_prpr": "389500",              "prdy_vrss_sign": "2",              "prdy_vrss": "47000",              "prdy_ctrt": "13.72",              "acml_vol": "671298",              "shnu_cntg_csnu": "2582",              "seln_cntg_csnu": "2201",              "ntby_cnqn": "381"          },          {              "mksc_shrn_iscd": "454910",              "data_rank": "7",              "hts_kor_isnm": "두산로보틱스",              "stck_prpr": "92900",              "prdy_vrss_sign": "2",              "prdy_vrss": "5800",              "prdy_ctrt": "6.66",              "acml_vol": "1169659",              "shnu_cntg_csnu": "1214",              "seln_cntg_csnu": "836",              "ntby_cnqn": "378"          },          {              "mksc_shrn_iscd
```

---
### 150. 국내주식 재무비율 순위

| Field | Value |
|---|---|
| Sheet | `국내주식 재무비율 순위` |
| Menu | [국내주식] 순위분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ranking/finance-ratio` |
| TR_ID (실전) | `FHPST01750000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `fid_trgt_cls_code` | 대상 구분 코드 | string | Y | 32 | 0 : 전체 |
| `fid_cond_mrkt_div_code` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (J:KRX, NX:NXT) |
| `fid_cond_scr_div_code` | 조건 화면 분류 코드 | string | Y | 5 | Unique key( 20175 ) |
| `fid_input_iscd` | 입력 종목코드 | string | Y | 12 | 0000:전체, 0001:거래소, 1001:코스닥, 2001:코스피200 |
| `fid_div_cls_code` | 분류 구분 코드 | string | Y | 2 | 0 : 전체 |
| `fid_input_price_1` | 입력 가격1 | string | Y | 12 | 입력값 없을때 전체 (가격 ~) |
| `fid_input_price_2` | 입력 가격2 | string | Y | 12 | 입력값 없을때 전체 (~ 가격) |
| `fid_vol_cnt` | 거래량 수 | string | Y | 12 | 입력값 없을때 전체 (거래량 ~) |
| `fid_input_option_1` | 입력 옵션1 | string | Y | 10 | 회계년도 입력 (ex 2023) |
| `fid_input_option_2` | 입력 옵션2 | string | Y | 10 | 0: 1/4분기 , 1: 반기, 2: 3/4분기, 3: 결산 |
| `fid_rank_sort_cls_code` | 순위 정렬 구분 코드 | string | Y | 2 | 7: 수익성 분석, 11 : 안정성 분석, 15: 성장성 분석, 20: 활동성 분석 |
| `fid_blng_cls_code` | 소속 구분 코드 | string | Y | 2 | 0 |
| `fid_trgt_exls_cls_code` | 대상 제외 구분 코드 | string | Y | 32 | 0 : 전체 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `data_rank` | 데이터 순위 | string | Y | 10 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `mksc_shrn_iscd` | 유가증권 단축 종목코드 | string | Y | 9 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `cptl_op_prfi` | 총자본경상이익율 | string | Y | 92 |  |
| `cptl_ntin_rate` | 총자본 순이익율 | string | Y | 92 |  |
| `sale_totl_rate` | 매출액 총이익율 | string | Y | 92 |  |
| `sale_ntin_rate` | 매출액 순이익율 | string | Y | 92 |  |
| `bis` | 자기자본비율 | string | Y | 92 |  |
| `lblt_rate` | 부채 비율 | string | Y | 84 |  |
| `bram_depn` | 차입금 의존도 | string | Y | 92 |  |
| `rsrv_rate` | 유보 비율 | string | Y | 124 |  |
| `grs` | 매출액 증가율 | string | Y | 124 |  |
| `op_prfi_inrt` | 경상 이익 증가율 | string | Y | 124 |  |
| `bsop_prfi_inrt` | 영업 이익 증가율 | string | Y | 124 |  |
| `ntin_inrt` | 순이익 증가율 | string | Y | 124 |  |
| `equt_inrt` | 자기자본 증가율 | string | Y | 92 |  |
| `cptl_tnrt` | 총자본회전율 | string | Y | 92 |  |
| `sale_bond_tnrt` | 매출 채권 회전율 | string | Y | 92 |  |
| `totl_aset_inrt` | 총자산 증가율 | string | Y | 92 |  |
| `stac_month` | 결산 월 | string | Y | 2 |  |
| `stac_month_cls_code` | 결산 월 구분 코드 | string | Y | 2 |  |
| `iqry_csnu` | 조회 건수 | string | Y | 10 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"J",  "fid_cond_scr_div_code":"20175",  "fid_input_iscd":"0000",  "fid_div_cls_code":"0",  "fid_input_price_1":"",  "fid_input_price_2":"",  "fid_vol_cnt":"",  "fid_input_option_1":"2023",  "fid_input_option_2":"3",  "fid_rank_sort_cls_code":"7",  "fid_blng_cls_code":"0",  "fid_trgt_exls_cls_code":"0",  "fid_trgt_cls_code":"0"  }
```

**Response Example:**
```
{      "output": [          {              "data_rank": "1",              "hts_kor_isnm": "한진칼",              "mksc_shrn_iscd": "180640",              "stck_prpr": "59500",              "prdy_vrss": "400",              "prdy_vrss_sign": "2",              "prdy_ctrt": "0.68",              "acml_vol": "46057",              "cptl_op_prfi": "177.14",              "cptl_ntin_rate": "12.41",              "sale_totl_rate": "51.17",              "sale_ntin_rate": "177.14",              "bis": "75.41",              "lblt_rate": "32.61",              "bram_depn": "16.29",              "rsrv_rate": "1583.70",              "grs": "43.44",              "op_prfi_inrt": "13.31",              "bsop_prfi_inrt": "259.13",              "ntin_inrt": "-52.67",              "equt_inrt": "17.84",              "cptl_tnrt": "0.10",              "sale_bond_tnrt": "10.18",              "totl_aset_inrt": "1.39",              "stac_month": "12",              "stac_month_cls_code": "1",              "iqry_csnu": "1283"          },          {              "data_rank": "2",              "hts_kor_isnm": "한미반도체",              "mksc_shrn_iscd": "042700",              "stck_prpr": "97500",              "prdy_vrss": "1300",              "prdy_vrss_sign": "2",              "prdy_ctrt": "1.35",              "acml_vol": "319052",              "cptl_op_prfi": "170.24",              "cptl_ntin_rate": "44.40",              "sale_totl_rate": "45.81",              "sale_ntin_rate": "170.24",              "bis": "87.56",              "lblt_rate": "14.20",              "bram_depn": "0.22",              "rsrv_rate": "4282.44",              "grs": "-59.96",              "op_prfi_inrt": "85.51",              "bsop_prfi_inrt": "-83.40",              "ntin_inrt": "91.05",              "equt_inrt": "41.88",              "cptl_tnrt": "0.30",              "sale_bond_tnrt": "2.32",              "totl_aset_inrt": "34.34",              "stac_month": "12",              "stac_month_cls_code": "1",              "iqry_csnu": "1283"          },          {              "data_rank": "3",              "hts_kor_isnm": "한라IMS",              "mksc_shrn_iscd": "092460",              "stck_prpr": "6000",              "prdy_vrss": "50",              "prdy_vrss_sign": "2",              "prdy_ctrt": "0.84",              "acml_vol": "6707",              "cptl_op_prfi": "115.30",              "cptl_ntin_rate": "45.59",              "sale_totl_rate": "35.14",              "sale_ntin_rate": "115.30",              "bis": "73.41",              "lblt_rate": "36.21",              "bram_depn": "11.43",              "rsrv_rate": "1769.56",              "grs": "-15.09",              "op_prfi_inrt": "799.56",              "bsop_prfi_inrt": "-56.41",              "ntin_inrt": "722.02",              "equt_inrt": "66.58",              "cptl_tnrt": "0.61",              "sale_bond_tnrt": "15.19",              "totl_aset_inrt": "20.84",              "stac_month": "12",              "stac_month_cls_code": "1",              "iqry_csnu": "
```

---
### 151. 국내주식 시가총액 상위

| Field | Value |
|---|---|
| Sheet | `국내주식 시가총액 상위` |
| Menu | [국내주식] 순위분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ranking/market-cap` |
| TR_ID (실전) | `FHPST01740000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `fid_input_price_2` | 입력 가격2 | string | Y | 12 | 입력값 없을때 전체 (~ 가격) |
| `fid_cond_mrkt_div_code` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (J:KRX, NX:NXT) |
| `fid_cond_scr_div_code` | 조건 화면 분류 코드 | string | Y | 5 | Unique key( 20174 ) |
| `fid_div_cls_code` | 분류 구분 코드 | string | Y | 2 | 0: 전체,  1:보통주,  2:우선주 |
| `fid_input_iscd` | 입력 종목코드 | string | Y | 12 | 0000:전체, 0001:거래소, 1001:코스닥, 2001:코스피200 |
| `fid_trgt_cls_code` | 대상 구분 코드 | string | Y | 32 | 0 : 전체 |
| `fid_trgt_exls_cls_code` | 대상 제외 구분 코드 | string | Y | 32 | 0 : 전체 |
| `fid_input_price_1` | 입력 가격1 | string | Y | 12 | 입력값 없을때 전체 (가격 ~) |
| `fid_vol_cnt` | 거래량 수 | string | Y | 12 | 입력값 없을때 전체 (거래량 ~) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `mksc_shrn_iscd` | 유가증권 단축 종목코드 | string | Y | 9 |  |
| `data_rank` | 데이터 순위 | string | Y | 10 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `lstn_stcn` | 상장 주수 | string | Y | 18 |  |
| `stck_avls` | 시가 총액 | string | Y | 18 |  |
| `mrkt_whol_avls_rlim` | 시장 전체 시가총액 비중 | string | Y | 52 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"J",  "fid_cond_scr_div_code":"20174",  "fid_div_cls_code":"0",  "fid_input_iscd":"0000",  "fid_trgt_cls_code":"0"  "fid_trgt_exls_cls_code":"0",  "fid_input_price_1":"",  "fid_input_price_2":"",  "fid_vol_cnt":"",  }
```

**Response Example:**
```
{      "output": [          {              "mksc_shrn_iscd": "005930",              "data_rank": "1",              "hts_kor_isnm": "삼성전자",              "stck_prpr": "72700",              "prdy_vrss": "400",              "prdy_vrss_sign": "2",              "prdy_ctrt": "0.55",              "acml_vol": "3686661",              "lstn_stcn": "5969782550",              "stck_avls": "4340032",              "mrkt_whol_avls_rlim": "15.77"          },          {              "mksc_shrn_iscd": "000660",              "data_rank": "2",              "hts_kor_isnm": "SK하이닉스",              "stck_prpr": "162300",              "prdy_vrss": "1100",              "prdy_vrss_sign": "2",              "prdy_ctrt": "0.68",              "acml_vol": "807093",              "lstn_stcn": "728002365",              "stck_avls": "1181548",              "mrkt_whol_avls_rlim": "4.29"          },          {              "mksc_shrn_iscd": "373220",              "data_rank": "3",              "hts_kor_isnm": "LG에너지솔루션",              "stck_prpr": "404000",              "prdy_vrss": "5500",              "prdy_vrss_sign": "2",              "prdy_ctrt": "1.38",              "acml_vol": "43109",              "lstn_stcn": "234000000",              "stck_avls": "945360",              "mrkt_whol_avls_rlim": "3.43"          },          {              "mksc_shrn_iscd": "207940",              "data_rank": "4",              "hts_kor_isnm": "삼성바이오로직스",              "stck_prpr": "863000",              "prdy_vrss": "37000",              "prdy_vrss_sign": "2",              "prdy_ctrt": "4.48",              "acml_vol": "95134",              "lstn_stcn": "71174000",              "stck_avls": "614232",              "mrkt_whol_avls_rlim": "2.23"          },          {              "mksc_shrn_iscd": "005380",              "data_rank": "5",              "hts_kor_isnm": "현대차",              "stck_prpr": "246500",              "prdy_vrss": "3000",              "prdy_vrss_sign": "2",              "prdy_ctrt": "1.23",              "acml_vol": "264371",              "lstn_stcn": "211531506",              "stck_avls": "521425",              "mrkt_whol_avls_rlim": "1.89"          },          {              "mksc_shrn_iscd": "005935",              "data_rank": "6",              "hts_kor_isnm": "삼성전자우",              "stck_prpr": "62500",              "prdy_vrss": "500",              "prdy_vrss_sign": "2",              "prdy_ctrt": "0.81",              "acml_vol": "198907",              "lstn_stcn": "822886700",              "stck_avls": "514304",              "mrkt_whol_avls_rlim": "1.87"          },          {              "mksc_shrn_iscd": "000270",              "data_rank": "7",              "hts_kor_isnm": "기아",              "stck_prpr": "127400",              "prdy_vrss": "2400",              "prdy_vrss_sign": "2",              "prdy_ctrt": "1.92",              "acml_vol": "505817",              "lstn_stcn": "402044203",              "stck_avls": "512204",              "mrkt_whol_avls_rlim": "1.86"          },
```

---
### 152. 국내주식 당사매매종목 상위

| Field | Value |
|---|---|
| Sheet | `국내주식 당사매매종목 상위` |
| Menu | [국내주식] 순위분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ranking/traded-by-company` |
| TR_ID (실전) | `FHPST01860000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `fid_trgt_exls_cls_code` | 대상 제외 구분 코드 | string | Y | 32 | 0: 전체 |
| `fid_cond_mrkt_div_code` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (J:KRX, NX:NXT) |
| `fid_cond_scr_div_code` | 조건 화면 분류 코드 | string | Y | 5 | Unique key(20186) |
| `fid_div_cls_code` | 분류 구분 코드 | string | Y | 2 | 0:전체, 1:관리종목, 2:투자주의, 3:투자경고, 4:투자위험예고, 5:투자위험, 6:보통주, 7:우선주 |
| `fid_rank_sort_cls_code` | 순위 정렬 구분 코드 | string | Y | 2 | 0:매도상위,1:매수상위 |
| `fid_input_date_1` | 입력 날짜1 | string | Y | 10 | 기간~ |
| `fid_input_date_2` | 입력 날짜2 | string | Y | 10 | ~기간 |
| `fid_input_iscd` | 입력 종목코드 | string | Y | 12 | 0000:전체, 0001:거래소, 1001:코스닥, 2001:코스피200, 4001: KRX100 |
| `fid_trgt_cls_code` | 대상 구분 코드 | string | Y | 32 | 0: 전체 |
| `fid_aply_rang_vol` | 적용 범위 거래량 | string | Y | 18 | 0: 전체, 100: 100주 이상 |
| `fid_aply_rang_prc_2` | 적용 범위 가격2 | string | Y | 18 | ~ 가격 |
| `fid_aply_rang_prc_1` | 적용 범위 가격1 | string | Y | 18 | 가격 ~ |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `data_rank` | 데이터 순위 | string | Y | 10 |  |
| `mksc_shrn_iscd` | 유가증권 단축 종목코드 | string | Y | 9 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |
| `seln_cnqn_smtn` | 매도 체결량 합계 | string | Y | 18 |  |
| `shnu_cnqn_smtn` | 매수2 체결량 합계 | string | Y | 18 |  |
| `ntby_cnqn` | 순매수 체결량 | string | Y | 18 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"J",  "fid_cond_scr_div_code":"20186",  "fid_div_cls_code":"0",  "fid_rank_sort_cls_code":"0",  "fid_input_date_1":"20240314",  "fid_input_date_2":"20240315",  "fid_input_iscd":"0000",  "fid_trgt_cls_code":"0",  "fid_trgt_exls_cls_code":"0",  "fid_aply_rang_prc_1":"",  "fid_aply_rang_prc_2":"",  "fid_aply_rang_vol":"0"  }
```

**Response Example:**
```
{      "output": [          {              "data_rank": "1",              "mksc_shrn_iscd": "Q530036",              "hts_kor_isnm": "삼성 인버스 2X WTI원유 선물 ETN",              "stck_prpr": "92",              "prdy_vrss_sign": "3",              "prdy_vrss": "0",              "prdy_ctrt": "0.00",              "acml_vol": "5800370",              "acml_tr_pbmn": "533513365",              "seln_cnqn_smtn": "8248448",              "shnu_cnqn_smtn": "4633200",              "ntby_cnqn": "-3615248"          },          {              "data_rank": "2",              "mksc_shrn_iscd": "252670",              "hts_kor_isnm": "KODEX 200선물인버스2X",              "stck_prpr": "2175",              "prdy_vrss_sign": "5",              "prdy_vrss": "-5",              "prdy_ctrt": "-0.23",              "acml_vol": "55781783",              "acml_tr_pbmn": "121550061085",              "seln_cnqn_smtn": "27416314",              "shnu_cnqn_smtn": "25991495",              "ntby_cnqn": "-1424819"          },          {              "data_rank": "3",              "mksc_shrn_iscd": "025320",              "hts_kor_isnm": "시노펙스",              "stck_prpr": "10860",              "prdy_vrss_sign": "2",              "prdy_vrss": "830",              "prdy_ctrt": "8.28",              "acml_vol": "4687707",              "acml_tr_pbmn": "49125642180",              "seln_cnqn_smtn": "5824623",              "shnu_cnqn_smtn": "4909381",              "ntby_cnqn": "-915242"          },          {              "data_rank": "4",              "mksc_shrn_iscd": "290690",              "hts_kor_isnm": "소룩스",              "stck_prpr": "2550",              "prdy_vrss_sign": "2",              "prdy_vrss": "80",              "prdy_ctrt": "3.24",              "acml_vol": "2932021",              "acml_tr_pbmn": "7432512210",              "seln_cnqn_smtn": "1297638",              "shnu_cnqn_smtn": "485714",              "ntby_cnqn": "-811924"          },          {              "data_rank": "5",              "mksc_shrn_iscd": "453850",              "hts_kor_isnm": "ACE 미국30년국채액티브(H)",              "stck_prpr": "8555",              "prdy_vrss_sign": "5",              "prdy_vrss": "-15",              "prdy_ctrt": "-0.18",              "acml_vol": "535802",              "acml_tr_pbmn": "4573586665",              "seln_cnqn_smtn": "1416392",              "shnu_cnqn_smtn": "622450",              "ntby_cnqn": "-793942"          },          {              "data_rank": "6",              "mksc_shrn_iscd": "217620",              "hts_kor_isnm": "디딤이앤에프",              "stck_prpr": "422",              "prdy_vrss_sign": "5",              "prdy_vrss": "-19",              "prdy_ctrt": "-4.31",              "acml_vol": "4011940",              "acml_tr_pbmn": "1603037358",              "seln_cnqn_smtn": "3775356",              "shnu_cnqn_smtn": "3104696",              "ntby_cnqn": "-670660"          },          {              "data_rank": "7",              "mksc_shrn_iscd": "122630",              "hts_kor_isnm": "KODEX 레버리지",  
```

---
### 153. 국내주식 등락률 순위

| Field | Value |
|---|---|
| Sheet | `국내주식 등락률 순위` |
| Menu | [국내주식] 순위분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ranking/fluctuation` |
| TR_ID (실전) | `FHPST01700000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `fid_rsfl_rate2` | 등락 비율2 | string | Y | 132 | 공백 입력 시 전체 (~ 비율 |
| `fid_cond_mrkt_div_code` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (J:KRX, NX:NXT) |
| `fid_cond_scr_div_code` | 조건 화면 분류 코드 | string | Y | 5 | Unique key( 20170 ) |
| `fid_input_iscd` | 입력 종목코드 | string | Y | 12 | 0000(전체) 코스피(0001), 코스닥(1001), 코스피200(2001) |
| `fid_rank_sort_cls_code` | 순위 정렬 구분 코드 | string | Y | 2 | 0:상승율순 1:하락율순 2:시가대비상승율 3:시가대비하락율 4:변동율 |
| `fid_input_cnt_1` | 입력 수1 | string | Y | 12 | 0:전체 , 누적일수 입력 |
| `fid_prc_cls_code` | 가격 구분 코드 | string | Y | 2 | 'fid_rank_sort_cls_code :0 상승율 순일때 (0:저가대비, 1:종가대비)  fid_rank_sort_cls_code :1 하락율 순일때 (0:고가대비, 1:종가대비)  fid_rank_sort_cls_code : 기타 (0:전체)' |
| `fid_input_price_1` | 입력 가격1 | string | Y | 12 | 공백 입력 시 전체 (가격 ~) |
| `fid_input_price_2` | 입력 가격2 | string | Y | 12 | 공백 입력 시 전체 (~ 가격) |
| `fid_vol_cnt` | 거래량 수 | string | Y | 12 | 공백 입력 시 전체 (거래량 ~) |
| `fid_trgt_cls_code` | 대상 구분 코드 | string | Y | 32 | 0:전체 |
| `fid_trgt_exls_cls_code` | 대상 제외 구분 코드 | string | Y | 32 | 0:전체 |
| `fid_div_cls_code` | 분류 구분 코드 | string | Y | 2 | 0:전체 |
| `fid_rsfl_rate1` | 등락 비율1 | string | Y | 132 | 공백 입력 시 전체 (비율 ~) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stck_shrn_iscd` | 주식 단축 종목코드 | string | Y | 9 |  |
| `data_rank` | 데이터 순위 | string | Y | 10 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `stck_hgpr` | 주식 최고가 | string | Y | 10 |  |
| `hgpr_hour` | 최고가 시간 | string | Y | 6 |  |
| `acml_hgpr_date` | 누적 최고가 일자 | string | Y | 8 |  |
| `stck_lwpr` | 주식 최저가 | string | Y | 10 |  |
| `lwpr_hour` | 최저가 시간 | string | Y | 6 |  |
| `acml_lwpr_date` | 누적 최저가 일자 | string | Y | 8 |  |
| `lwpr_vrss_prpr_rate` | 최저가 대비 현재가 비율 | string | Y | 84 |  |
| `dsgt_date_clpr_vrss_prpr_rate` | 지정 일자 종가 대비 현재가 비 | string | Y | 84 |  |
| `cnnt_ascn_dynu` | 연속 상승 일수 | string | Y | 5 |  |
| `hgpr_vrss_prpr_rate` | 최고가 대비 현재가 비율 | string | Y | 84 |  |
| `cnnt_down_dynu` | 연속 하락 일수 | string | Y | 5 |  |
| `oprc_vrss_prpr_sign` | 시가2 대비 현재가 부호 | string | Y | 1 |  |
| `oprc_vrss_prpr` | 시가2 대비 현재가 | string | Y | 10 |  |
| `oprc_vrss_prpr_rate` | 시가2 대비 현재가 비율 | string | Y | 84 |  |
| `prd_rsfl` | 기간 등락 | string | Y | 10 |  |
| `prd_rsfl_rate` | 기간 등락 비율 | string | Y | 84 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"J",  "fid_cond_scr_div_code":"20170",  "fid_input_iscd":"0000",  "fid_rank_sort_cls_code":"0",  "fid_input_cnt_1":"0",  "fid_prc_cls_code":"0",  "fid_input_price_1":"",  "fid_input_price_2":"",  "fid_vol_cnt":"",  "fid_trgt_cls_code":"0",  "fid_trgt_exls_cls_code":"0",  "fid_div_cls_code":"0",  "fid_rsfl_rate1":"",  "fid_rsfl_rate2":""  }
```

**Response Example:**
```
{      "output": [          {              "stck_shrn_iscd": "000040",              "data_rank": "1",              "hts_kor_isnm": "KR모터스",              "stck_prpr": "1821",              "prdy_vrss": "197",              "prdy_vrss_sign": "2",              "prdy_ctrt": "12.13",              "acml_vol": "2267183",              "stck_hgpr": "1861",              "hgpr_hour": "100214",              "acml_hgpr_date": "20240318",              "stck_lwpr": "1301",              "lwpr_hour": "090239",              "acml_lwpr_date": "20240318",              "lwpr_vrss_prpr_rate": "39.97",              "dsgt_date_clpr_vrss_prpr_rate": "12.13",              "cnnt_ascn_dynu": "1",              "hgpr_vrss_prpr_rate": "-2.15",              "cnnt_down_dynu": "0",              "oprc_vrss_prpr_sign": "2",              "oprc_vrss_prpr": "0",              "oprc_vrss_prpr_rate": "0.00",              "prd_rsfl": "0",              "prd_rsfl_rate": "0.00"          },          {              "stck_shrn_iscd": "032800",              "data_rank": "2",              "hts_kor_isnm": "판타지오",              "stck_prpr": "406",              "prdy_vrss": "75",              "prdy_vrss_sign": "2",              "prdy_ctrt": "22.66",              "acml_vol": "36313396",              "stck_hgpr": "419",              "hgpr_hour": "095020",              "acml_hgpr_date": "20240318",              "stck_lwpr": "332",              "lwpr_hour": "090015",              "acml_lwpr_date": "20240318",              "lwpr_vrss_prpr_rate": "22.29",              "dsgt_date_clpr_vrss_prpr_rate": "22.66",              "cnnt_ascn_dynu": "1",              "hgpr_vrss_prpr_rate": "-3.10",              "cnnt_down_dynu": "1",              "oprc_vrss_prpr_sign": "2",              "oprc_vrss_prpr": "0",              "oprc_vrss_prpr_rate": "0.00",              "prd_rsfl": "0",              "prd_rsfl_rate": "0.00"          },          {              "stck_shrn_iscd": "018000",              "data_rank": "3",              "hts_kor_isnm": "유니슨",              "stck_prpr": "1233",              "prdy_vrss": "215",              "prdy_vrss_sign": "2",              "prdy_ctrt": "21.12",              "acml_vol": "2436474",              "stck_hgpr": "1233",              "hgpr_hour": "100301",              "acml_hgpr_date": "20240318",              "stck_lwpr": "1014",              "lwpr_hour": "090026",              "acml_lwpr_date": "20240318",              "lwpr_vrss_prpr_rate": "21.60",              "dsgt_date_clpr_vrss_prpr_rate": "21.12",              "cnnt_ascn_dynu": "1",              "hgpr_vrss_prpr_rate": "0.00",              "cnnt_down_dynu": "1",              "oprc_vrss_prpr_sign": "2",              "oprc_vrss_prpr": "0",              "oprc_vrss_prpr_rate": "0.00",              "prd_rsfl": "0",              "prd_rsfl_rate": "0.00"          },          {              "stck_shrn_iscd": "083790",              "data_rank": "4",              "hts_kor_isnm": "CG인바이츠",              "stck_prpr": "4025",              "prdy
```

---
### 154. 국내주식 시장가치 순위

| Field | Value |
|---|---|
| Sheet | `국내주식 시장가치 순위` |
| Menu | [국내주식] 순위분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ranking/market-value` |
| TR_ID (실전) | `FHPST01790000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `fid_trgt_cls_code` | 대상 구분 코드 | string | Y | 32 | 0 : 전체 |
| `fid_cond_mrkt_div_code` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (J:KRX, NX:NXT) |
| `fid_cond_scr_div_code` | 조건 화면 분류 코드 | string | Y | 5 | Unique key( 20179 ) |
| `fid_input_iscd` | 입력 종목코드 | string | Y | 12 | 0000:전체, 0001:거래소, 1001:코스닥, 2001:코스피200 |
| `fid_div_cls_code` | 분류 구분 코드 | string | Y | 2 | 0: 전체, 1:관리종목, 2:투자주의, 3:투자경고, 4:투자위험예고, 5:투자위험, 6:보톧주, 7:우선주 |
| `fid_input_price_1` | 입력 가격1 | string | Y | 12 | 입력값 없을때 전체 (가격 ~) |
| `fid_input_price_2` | 입력 가격2 | string | Y | 12 | 입력값 없을때 전체 (~ 가격) |
| `fid_vol_cnt` | 거래량 수 | string | Y | 12 | 입력값 없을때 전체 (거래량 ~) |
| `fid_input_option_1` | 입력 옵션1 | string | Y | 10 | 회계연도 입력 (ex 2023) |
| `fid_input_option_2` | 입력 옵션2 | string | Y | 10 | 0: 1/4분기 , 1: 반기, 2: 3/4분기, 3: 결산 |
| `fid_rank_sort_cls_code` | 순위 정렬 구분 코드 | string | Y | 2 | '가치분석(23:PER, 24:PBR, 25:PCR, 26:PSR, 27: EPS, 28:EVA,  29: EBITDA, 30: EV/EBITDA, 31:EBITDA/금융비율' |
| `fid_blng_cls_code` | 소속 구분 코드 | string | Y | 2 | 0 : 전체 |
| `fid_trgt_exls_cls_code` | 대상 제외 구분 코드 | string | Y | 32 | 0 : 전체 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `data_rank` | 데이터 순위 | string | Y | 10 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `mksc_shrn_iscd` | 유가증권 단축 종목코드 | string | Y | 9 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `per` | PER | string | Y | 82 |  |
| `pbr` | PBR | string | Y | 82 |  |
| `pcr` | PCR | string | Y | 82 |  |
| `psr` | PSR | string | Y | 82 |  |
| `eps` | EPS | string | Y | 112 |  |
| `eva` | EVA | string | Y | 82 |  |
| `ebitda` | EBITDA | string | Y | 82 |  |
| `pv_div_ebitda` | PV DIV EBITDA | string | Y | 82 |  |
| `ebitda_div_fnnc_expn` | EBITDA DIV 금융비용 | string | Y | 82 |  |
| `stac_month` | 결산 월 | string | Y | 2 |  |
| `stac_month_cls_code` | 결산 월 구분 코드 | string | Y | 2 |  |
| `iqry_csnu` | 조회 건수 | string | Y | 10 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"J",  "fid_cond_scr_div_code":"20179",  "fid_input_iscd":"0000",  "fid_div_cls_code":"0",  "fid_input_price_1":"",  "fid_input_price_2":"",  "fid_vol_cnt":"",  "fid_input_option_1":"2023",  "fid_input_option_2":"3",  "fid_rank_sort_cls_code":"23",  "fid_blng_cls_code":"0",  "fid_trgt_exls_cls_code":"0",  "fid_trgt_cls_code":"0"  }
```

**Response Example:**
```
{      "output": [          {              "data_rank": "1",              "hts_kor_isnm": "효성",              "mksc_shrn_iscd": "004800",              "stck_prpr": "57800",              "prdy_vrss": "-400",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-0.69",              "acml_vol": "7453",              "per": "19266.67",              "pbr": "0.49",              "pcr": "11.19",              "psr": "0.35",              "eps": "300",              "eva": "-812.00",              "ebitda": "2031.00",              "pv_div_ebitda": "12.98",              "ebitda_div_fnnc_expn": "0.02",              "stac_month": "12",              "stac_month_cls_code": "0",              "iqry_csnu": "1773"          },          {              "data_rank": "2",              "hts_kor_isnm": "에이엘티",              "mksc_shrn_iscd": "172670",              "stck_prpr": "21450",              "prdy_vrss": "50",              "prdy_vrss_sign": "2",              "prdy_ctrt": "0.23",              "acml_vol": "28989",              "per": "10725.00",              "pbr": "1.87",              "pcr": "10.63",              "psr": "3.68",              "eps": "200",              "eva": "0.00",              "ebitda": "170.00",              "pv_div_ebitda": "0.00",              "ebitda_div_fnnc_expn": "0.05",              "stac_month": "12",              "stac_month_cls_code": "1",              "iqry_csnu": "1773"          },          {              "data_rank": "3",              "hts_kor_isnm": "한싹",              "mksc_shrn_iscd": "430690",              "stck_prpr": "14450",              "prdy_vrss": "-170",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-1.16",              "acml_vol": "11549",              "per": "4816.67",              "pbr": "2.44",              "pcr": "171.76",              "psr": "3.74",              "eps": "300",              "eva": "0.00",              "ebitda": "1.00",              "pv_div_ebitda": "0.00",              "ebitda_div_fnnc_expn": "0.00",              "stac_month": "12",              "stac_month_cls_code": "1",              "iqry_csnu": "1773"          },          {              "data_rank": "4",              "hts_kor_isnm": "파버나인",              "mksc_shrn_iscd": "177830",              "stck_prpr": "3565",              "prdy_vrss": "5",              "prdy_vrss_sign": "2",              "prdy_ctrt": "0.14",              "acml_vol": "7838",              "per": "1188.33",              "pbr": "0.61",              "pcr": "6.37",              "psr": "0.40",              "eps": "300",              "eva": "0.00",              "ebitda": "83.00",              "pv_div_ebitda": "0.00",              "ebitda_div_fnnc_expn": "0.03",              "stac_month": "12",              "stac_month_cls_code": "1",              "iqry_csnu": "1773"          },          {              "data_rank": "5",              "hts_kor_isnm": "카카오페이",              "mksc_shrn_iscd": "377300",              "stck_prpr": "39800",              "prdy_vrss": "-150",  
```

---
### 155. 국내주식 관심종목등록 상위

| Field | Value |
|---|---|
| Sheet | `국내주식 관심종목등록 상위` |
| Menu | [국내주식] 순위분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ranking/top-interest-stock` |
| TR_ID (실전) | `FHPST01800000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `fid_input_iscd_2` | 입력 필수값2 | string | Y | 12 | 000000 : 필수입력값 |
| `fid_cond_mrkt_div_code` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (J:KRX, NX:NXT) |
| `fid_cond_scr_div_code` | 조건 화면 분류 코드 | string | Y | 5 | Unique key(20180) |
| `fid_input_iscd` | 업종 코드 | string | Y | 12 | 0000:전체, 0001:거래소, 1001:코스닥, 2001:코스피200 |
| `fid_trgt_cls_code` | 대상 구분 코드 | string | Y | 2 | 0 : 전체 |
| `fid_trgt_exls_cls_code` | 대상 제외 구분 코드 | string | Y | 2 | 0 : 전체 |
| `fid_input_price_1` | 입력 가격1 | string | Y | 2 | 입력값 없을때 전체 (가격 ~) |
| `fid_input_price_2` | 입력 가격2 | string | Y | 2 | 입력값 없을때 전체 (~ 가격) |
| `fid_vol_cnt` | 거래량 수 | string | Y | 12 | 입력값 없을때 전체 (거래량 ~) |
| `fid_div_cls_code` | 분류 구분 코드 | string | Y | 12 | 0: 전체 1: 관리종목 2: 투자주의 3: 투자경고 4: 투자위험예고 5: 투자위험 6: 보통주 7: 우선주 |
| `fid_input_cnt_1` | 순위 입력값 | string | Y | 10 | 순위검색 입력값(1: 1위부터, 10:10위부터) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `mrkt_div_cls_name` | 시장 분류 구분 명 | string | Y | 40 |  |
| `mksc_shrn_iscd` | 유가증권 단축 종목코드 | string | Y | 9 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |
| `askp` | 매도호가 | string | Y | 10 |  |
| `bidp` | 매수호가 | string | Y | 10 |  |
| `data_rank` | 데이터 순위 | string | Y | 10 |  |
| `inter_issu_reg_csnu` | 관심 종목 등록 건수 | string | Y | 10 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"J",  "fid_cond_scr_div_code":"20180",  "fid_input_iscd":"0000",  "fid_trgt_exls_cls_code":"0",  "fid_trgt_cls_code":"0",  "fid_input_price_1":"",  "fid_input_price_2":"",  "fid_vol_cnt":"",  "fid_div_cls_code":"0",  "fid_input_iscd_2":"000000",  "fid_input_cnt_1":"1"  }
```

**Response Example:**
```
{      "output": [          {              "mrkt_div_cls_name": "코스피",              "mksc_shrn_iscd": "005930",              "hts_kor_isnm": "삼성전자",              "stck_prpr": "72700",              "prdy_vrss": "400",              "prdy_vrss_sign": "2",              "prdy_ctrt": "0.55",              "acml_vol": "4160099",              "acml_tr_pbmn": "302366528800",              "askp": "72800",              "bidp": "72700",              "data_rank": "1",              "inter_issu_reg_csnu": "4316153"          },          {              "mrkt_div_cls_name": "코스피",              "mksc_shrn_iscd": "000660",              "hts_kor_isnm": "SK하이닉스",              "stck_prpr": "162900",              "prdy_vrss": "1700",              "prdy_vrss_sign": "2",              "prdy_ctrt": "1.05",              "acml_vol": "990751",              "acml_tr_pbmn": "160519591000",              "askp": "162900",              "bidp": "162800",              "data_rank": "2",              "inter_issu_reg_csnu": "1173540"          },          {              "mrkt_div_cls_name": "코스피",              "mksc_shrn_iscd": "373220",              "hts_kor_isnm": "LG에너지솔루션",              "stck_prpr": "404500",              "prdy_vrss": "6000",              "prdy_vrss_sign": "2",              "prdy_ctrt": "1.51",              "acml_vol": "46060",              "acml_tr_pbmn": "18601165500",              "askp": "404500",              "bidp": "404000",              "data_rank": "3",              "inter_issu_reg_csnu": "932490"          },          {              "mrkt_div_cls_name": "코스피",              "mksc_shrn_iscd": "207940",              "hts_kor_isnm": "삼성바이오로직스",              "stck_prpr": "869000",              "prdy_vrss": "43000",              "prdy_vrss_sign": "2",              "prdy_ctrt": "5.21",              "acml_vol": "102027",              "acml_tr_pbmn": "87895574000",              "askp": "869000",              "bidp": "868000",              "data_rank": "4",              "inter_issu_reg_csnu": "587897"          },          {              "mrkt_div_cls_name": "코스피",              "mksc_shrn_iscd": "005380",              "hts_kor_isnm": "현대차",              "stck_prpr": "247000",              "prdy_vrss": "3500",              "prdy_vrss_sign": "2",              "prdy_ctrt": "1.44",              "acml_vol": "313743",              "acml_tr_pbmn": "76616945500",              "askp": "247000",              "bidp": "246500",              "data_rank": "5",              "inter_issu_reg_csnu": "515079"          },          {              "mrkt_div_cls_name": "코스피",              "mksc_shrn_iscd": "005935",              "hts_kor_isnm": "삼성전자우",              "stck_prpr": "62400",              "prdy_vrss": "400",              "prdy_vrss_sign": "2",              "prdy_ctrt": "0.65",              "acml_vol": "222773",              "acml_tr_pbmn": "13898135300",              "askp": "62400",              "bidp": "62300",              "data_rank": "6",              "inter_issu_reg_csnu": "
```

---
### 156. 국내주식 체결강도 상위

| Field | Value |
|---|---|
| Sheet | `국내주식 체결강도 상위` |
| Menu | [국내주식] 순위분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ranking/volume-power` |
| TR_ID (실전) | `FHPST01680000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `fid_trgt_exls_cls_code` | 대상 제외 구분 코드 | string | Y | 10 | 0 : 전체 |
| `fid_cond_mrkt_div_code` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (J:KRX, NX:NXT) |
| `fid_cond_scr_div_code` | 조건 화면 분류 코드 | string | Y | 5 | Unique key( 20168 ) |
| `fid_input_iscd` | 입력 종목코드 | string | Y | 12 | 0000:전체, 0001:거래소, 1001:코스닥, 2001:코스피200 |
| `fid_div_cls_code` | 분류 구분 코드 | string | Y | 2 | 0: 전체,  1: 보통주 2: 우선주 |
| `fid_input_price_1` | 입력 가격1 | string | Y | 12 | 입력값 없을때 전체 (가격 ~) |
| `fid_input_price_2` | 입력 가격2 | string | Y | 12 | 입력값 없을때 전체 (~ 가격) |
| `fid_vol_cnt` | 거래량 수 | string | Y | 12 | 입력값 없을때 전체 (거래량 ~) |
| `fid_trgt_cls_code` | 대상 구분 코드 | string | Y | 10 | 0 : 전체 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stck_shrn_iscd` | 주식 단축 종목코드 | string | Y | 9 |  |
| `data_rank` | 데이터 순위 | string | Y | 10 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `prdy_vrss` | 전일 대비 | string | Y | 10 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `tday_rltv` | 당일 체결강도 | string | Y | 112 |  |
| `seln_cnqn_smtn` | 매도 체결량 합계 | string | Y | 18 |  |
| `shnu_cnqn_smtn` | 매수2 체결량 합계 | string | Y | 18 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code":"J",  "fid_cond_scr_div_code":"20168",  "fid_input_iscd":"0000",  "fid_div_cls_code":"0",  "fid_input_price_1":"",  "fid_input_price_2":"",  "fid_vol_cnt":"",  "fid_trgt_exls_cls_code":"0",  "fid_trgt_cls_code":"0"  }
```

**Response Example:**
```
{      "output": [          {              "stck_shrn_iscd": "422260",              "data_rank": "1",              "hts_kor_isnm": "VITA MZ소비액티브",              "stck_prpr": "7650",              "prdy_vrss": "20",              "prdy_vrss_sign": "2",              "prdy_ctrt": "0.26",              "acml_vol": "26424",              "tday_rltv": "999.99",              "seln_cnqn_smtn": "0",              "shnu_cnqn_smtn": "26424"          },          {              "stck_shrn_iscd": "452440",              "data_rank": "2",              "hts_kor_isnm": "VITA 밸류알파액티브",              "stck_prpr": "11440",              "prdy_vrss": "-45",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-0.39",              "acml_vol": "23100",              "tday_rltv": "999.99",              "seln_cnqn_smtn": "0",              "shnu_cnqn_smtn": "23100"          },          {              "stck_shrn_iscd": "449680",              "data_rank": "3",              "hts_kor_isnm": "TIGER 한중전기차(합성)",              "stck_prpr": "8945",              "prdy_vrss": "200",              "prdy_vrss_sign": "2",              "prdy_ctrt": "2.29",              "acml_vol": "12065",              "tday_rltv": "999.99",              "seln_cnqn_smtn": "0",              "shnu_cnqn_smtn": "12063"          },          {              "stck_shrn_iscd": "457940",              "data_rank": "4",              "hts_kor_isnm": "에스케이증권제10호스팩",              "stck_prpr": "2335",              "prdy_vrss": "-5",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-0.21",              "acml_vol": "1011",              "tday_rltv": "999.99",              "seln_cnqn_smtn": "0",              "shnu_cnqn_smtn": "1011"          },          {              "stck_shrn_iscd": "442580",              "data_rank": "5",              "hts_kor_isnm": "ARIRANG 글로벌D램반도체iSelect",              "stck_prpr": "17290",              "prdy_vrss": "200",              "prdy_vrss_sign": "2",              "prdy_ctrt": "1.17",              "acml_vol": "906",              "tday_rltv": "999.99",              "seln_cnqn_smtn": "0",              "shnu_cnqn_smtn": "885"          },          {              "stck_shrn_iscd": "458210",              "data_rank": "6",              "hts_kor_isnm": "히어로즈 CD금리액티브(합성)",              "stck_prpr": "102975",              "prdy_vrss": "0",              "prdy_vrss_sign": "3",              "prdy_ctrt": "0.00",              "acml_vol": "663",              "tday_rltv": "999.99",              "seln_cnqn_smtn": "0",              "shnu_cnqn_smtn": "663"          },          {              "stck_shrn_iscd": "418210",              "data_rank": "7",              "hts_kor_isnm": "신한제10호스팩",              "stck_prpr": "2420",              "prdy_vrss": "40",              "prdy_vrss_sign": "2",              "prdy_ctrt": "1.68",              "acml_vol": "618",              "tday_rltv": "999.99",              "seln_cnqn_smtn": "0",              "shnu_cnqn_smtn": "618"          },          {              "s
```

---
### 157. 국내주식 시간외등락율순위

| Field | Value |
|---|---|
| Sheet | `국내주식 시간외등락율순위` |
| Menu | [국내주식] 순위분석 |
| Method | `GET` |
| URL | `/uapi/domestic-stock/v1/ranking/overtime-fluctuation` |
| TR_ID (실전) | `FHPST02340000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (J: 주식) |
| `FID_MRKT_CLS_CODE` | 시장 구분 코드 | string | Y | 2 | 공백 입력 |
| `FID_COND_SCR_DIV_CODE` | 조건 화면 분류 코드 | string | Y | 5 | Unique key(20234) |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 0000(전체), 0001(코스피), 1001(코스닥) |
| `FID_DIV_CLS_CODE` | 분류 구분 코드 | string | Y | 2 | 1(상한가), 2(상승률), 3(보합),4(하한가),5(하락률) |
| `FID_INPUT_PRICE_1` | 입력 가격1 | string | Y | 12 | 입력값 없을때 전체 (가격 ~) |
| `FID_INPUT_PRICE_2` | 입력 가격2 | string | Y | 12 | 입력값 없을때 전체 (~ 가격) |
| `FID_VOL_CNT` | 거래량 수 | string | Y | 12 | 입력값 없을때 전체 (거래량 ~) |
| `FID_TRGT_CLS_CODE` | 대상 구분 코드 | string | Y | 32 | 공백 입력 |
| `FID_TRGT_EXLS_CLS_CODE` | 대상 제외 구분 코드 | string | Y | 32 | 공백 입력 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `ovtm_untp_uplm_issu_cnt` | 시간외 단일가 상한 종목 수 | string | Y | 7 |  |
| `ovtm_untp_ascn_issu_cnt` | 시간외 단일가 상승 종목 수 | string | Y | 7 |  |
| `ovtm_untp_stnr_issu_cnt` | 시간외 단일가 보합 종목 수 | string | Y | 7 |  |
| `ovtm_untp_lslm_issu_cnt` | 시간외 단일가 하한 종목 수 | string | Y | 7 |  |
| `ovtm_untp_down_issu_cnt` | 시간외 단일가 하락 종목 수 | string | Y | 7 |  |
| `ovtm_untp_acml_vol` | 시간외 단일가 누적 거래량 | string | Y | 19 |  |
| `ovtm_untp_acml_tr_pbmn` | 시간외 단일가 누적 거래대금 | string | Y | 19 |  |
| `ovtm_untp_exch_vol` | 시간외 단일가 거래소 거래량 | string | Y | 18 |  |
| `ovtm_untp_exch_tr_pbmn` | 시간외 단일가 거래소 거래대금 | string | Y | 18 |  |
| `ovtm_untp_kosdaq_vol` | 시간외 단일가 KOSDAQ 거래량 | string | Y | 18 |  |
| `ovtm_untp_kosdaq_tr_pbmn` | 시간외 단일가 KOSDAQ 거래대금 | string | Y | 18 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `mksc_shrn_iscd` | 유가증권 단축 종목코드 | string | Y | 9 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `ovtm_untp_prpr` | 시간외 단일가 현재가 | string | Y | 10 |  |
| `ovtm_untp_prdy_vrss` | 시간외 단일가 전일 대비 | string | Y | 10 |  |
| `ovtm_untp_prdy_vrss_sign` | 시간외 단일가 전일 대비 부호 | string | Y | 1 |  |
| `ovtm_untp_prdy_ctrt` | 시간외 단일가 전일 대비율 | string | Y | 82 |  |
| `ovtm_untp_askp1` | 시간외 단일가 매도호가1 | string | Y | 10 |  |
| `ovtm_untp_seln_rsqn` | 시간외 단일가 매도 잔량 | string | Y | 12 |  |
| `ovtm_untp_bidp1` | 시간외 단일가 매수호가1 | string | Y | 10 |  |
| `ovtm_untp_shnu_rsqn` | 시간외 단일가 매수 잔량 | string | Y | 12 |  |
| `ovtm_untp_vol` | 시간외 단일가 거래량 | string | Y | 18 |  |
| `ovtm_vrss_acml_vol_rlim` | 시간외 대비 누적 거래량 비중 | string | Y | 52 |  |
| `stck_prpr` | 주식 현재가 | string | Y | 10 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `bidp` | 매수호가 | string | Y | 10 |  |
| `askp` | 매도호가 | string | Y | 10 |  |

**Request Example:**
```
fid_cond_mrkt_div_code:J  fid_mrkt_cls_code:  fid_cond_scr_div_code:20234  fid_input_iscd:0000  fid_div_cls_code:2  fid_input_price_1:  fid_input_price_2:  fid_vol_cnt:  fid_trgt_cls_code:  fid_trgt_exls_cls_code:
```

**Response Example:**
```
{      "output1": {          "ovtm_untp_uplm_issu_cnt": "2",          "ovtm_untp_ascn_issu_cnt": "923",          "ovtm_untp_stnr_issu_cnt": "634",          "ovtm_untp_lslm_issu_cnt": "1",          "ovtm_untp_down_issu_cnt": "731",          "ovtm_untp_acml_vol": "30215421",          "ovtm_untp_acml_tr_pbmn": "232960766966",          "ovtm_untp_exch_vol": "15196593",          "ovtm_untp_exch_tr_pbmn": "119450793021",          "ovtm_untp_kosdaq_vol": "15018828",          "ovtm_untp_kosdaq_tr_pbmn": "113509973945"      },      "output2": [          {              "mksc_shrn_iscd": "36328K",              "hts_kor_isnm": "티와이홀딩스우",              "ovtm_untp_prpr": "5880",              "ovtm_untp_prdy_vrss": "530",              "ovtm_untp_prdy_vrss_sign": "1",              "ovtm_untp_prdy_ctrt": "9.91",              "ovtm_untp_askp1": "0",              "ovtm_untp_seln_rsqn": "0",              "ovtm_untp_bidp1": "5880",              "ovtm_untp_shnu_rsqn": "13465",              "ovtm_untp_vol": "19288",              "ovtm_vrss_acml_vol_rlim": "12.06",              "stck_prpr": "5480",              "acml_vol": "159997",              "bidp": "5470",              "askp": "5480"          },          {              "mksc_shrn_iscd": "025950",              "hts_kor_isnm": "동신건설",              "ovtm_untp_prpr": "21000",              "ovtm_untp_prdy_vrss": "1890",              "ovtm_untp_prdy_vrss_sign": "1",              "ovtm_untp_prdy_ctrt": "9.89",              "ovtm_untp_askp1": "0",              "ovtm_untp_seln_rsqn": "0",              "ovtm_untp_bidp1": "21000",              "ovtm_untp_shnu_rsqn": "27744",              "ovtm_untp_vol": "46834",              "ovtm_vrss_acml_vol_rlim": "12.37",              "stck_prpr": "21250",              "acml_vol": "378572",              "bidp": "21150",              "askp": "21250"          },          {              "mksc_shrn_iscd": "465610",              "hts_kor_isnm": "ACE 미국빅테크TOP7 Plus레버리지(합성)",              "ovtm_untp_prpr": "16595",              "ovtm_untp_prdy_vrss": "1465",              "ovtm_untp_prdy_vrss_sign": "2",              "ovtm_untp_prdy_ctrt": "9.68",              "ovtm_untp_askp1": "16595",              "ovtm_untp_seln_rsqn": "22",              "ovtm_untp_bidp1": "15140",              "ovtm_untp_shnu_rsqn": "623",              "ovtm_untp_vol": "2",              "ovtm_vrss_acml_vol_rlim": "0.01",              "stck_prpr": "14430",              "acml_vol": "26559",              "bidp": "14430",              "askp": "14450"          },          {              "mksc_shrn_iscd": "201490",              "hts_kor_isnm": "미투온",              "ovtm_untp_prpr": "2785",              "ovtm_untp_prdy_vrss": "245",              "ovtm_untp_prdy_vrss_sign": "2",              "ovtm_untp_prdy_ctrt": "9.65",              "ovtm_untp_askp1": "2785",              "ovtm_untp_seln_rsqn": "6957",              "ovtm_untp_bidp1": "2540",              "ovtm_untp_shnu_rsqn": "3182",              "ovtm_untp_vol": "43772",        
```

---
### 158. 국내지수 실시간예상체결

| Field | Value |
|---|---|
| Sheet | `국내지수 실시간예상체결` |
| Menu | [국내주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0UPANC0` |
| TR_ID (실전) | `H0UPANC0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | "1: 등록, 2:해제" |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 7 | H0UPANC0 |
| `tr_key` | 종목코드 | string | Y | 6 | 업종구분코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `BSTP_CLS_CODE` | 업종 구분 코드 | object | Y | 4 | '각 항목사이에는 구분자로 ^ 사용,  모든 데이터타입은 String으로 변환되어 push 처리됨' |
| `BSOP_HOUR` | 영업 시간 | string | Y | 6 |  |
| `PRPR_NMIX` | 현재가 지수 | string | Y | 1 |  |
| `PRDY_VRSS_SIGN` | 전일 대비 부호 | string | Y | 1 |  |
| `BSTP_NMIX_PRDY_VRSS` | 업종 지수 전일 대비 | string | Y | 1 |  |
| `ACML_VOL` | 누적 거래량 | string | Y | 1 |  |
| `ACML_TR_PBMN` | 누적 거래 대금 | string | Y | 1 |  |
| `PCAS_VOL` | 건별 거래량 | string | Y | 1 |  |
| `PCAS_TR_PBMN` | 건별 거래 대금 | string | Y | 1 |  |
| `PRDY_CTRT` | 전일 대비율 | string | Y | 1 |  |
| `OPRC_NMIX` | 시가 지수 | string | Y | 1 |  |
| `NMIX_HGPR` | 지수 최고가 | string | Y | 1 |  |
| `NMIX_LWPR` | 지수 최저가 | string | Y | 1 |  |
| `OPRC_VRSS_NMIX_PRPR` | 시가 대비 지수 현재가 | string | Y | 1 |  |
| `OPRC_VRSS_NMIX_SIGN` | 시가 대비 지수 부호 | string | Y | 1 |  |
| `HGPR_VRSS_NMIX_PRPR` | 최고가 대비 지수 현재가 | string | Y | 1 |  |
| `HGPR_VRSS_NMIX_SIGN` | 최고가 대비 지수 부호 | string | Y | 1 |  |
| `LWPR_VRSS_NMIX_PRPR` | 최저가 대비 지수 현재가 | string | Y | 1 |  |
| `LWPR_VRSS_NMIX_SIGN` | 최저가 대비 지수 부호 | string | Y | 1 |  |
| `PRDY_CLPR_VRSS_OPRC_RATE` | 전일 종가 대비 시가2 비율 | string | Y | 1 |  |
| `PRDY_CLPR_VRSS_HGPR_RATE` | 전일 종가 대비 최고가 비율 | string | Y | 1 |  |
| `PRDY_CLPR_VRSS_LWPR_RATE` | 전일 종가 대비 최저가 비율 | string | Y | 1 |  |
| `UPLM_ISSU_CNT` | 상한 종목 수 | string | Y | 1 |  |
| `ASCN_ISSU_CNT` | 상승 종목 수 | string | Y | 1 |  |
| `STNR_ISSU_CNT` | 보합 종목 수 | string | Y | 1 |  |
| `DOWN_ISSU_CNT` | 하락 종목 수 | string | Y | 1 |  |
| `LSLM_ISSU_CNT` | 하한 종목 수 | string | Y | 1 |  |
| `QTQT_ASCN_ISSU_CNT` | 기세 상승 종목수 | string | Y | 1 |  |
| `QTQT_DOWN_ISSU_CNT` | 기세 하락 종목수 | string | Y | 1 |  |
| `TICK_VRSS` | TICK대비 | string | Y | 1 |  |

**Request Example:**
```
{      "header": {          "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",          "custtype": "P",          "tr_type": "1",          "content-type": "utf-8"      },      "body": {          "input": {              "tr_id": "H0UPANC0",              "tr_key": "0001"          }      }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "H0UPANC0",           "tr_key": "0001",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output  0\|H0UPANC0\|001\|0001^085910^2607.71^2^15.85^5424^192338^5424^192338^0.61^0^43  9^201^251^201
```

---
### 159. 국내주식 장운영정보 (통합)

| Field | Value |
|---|---|
| Sheet | `국내주식 장운영정보 (통합)` |
| Menu | [국내주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0UNMKO0` |
| TR_ID (실전) | `H0UNMKO0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | N | 286 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 거래타입 | string | N | 1 | 1 : 등록  2 : 해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0UNMKO0 : 국내주식 장운영정보 (통합) |
| `tr_key` | 구분값 | string | Y | 12 | 종목코드 (ex 005930 삼성전자) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `TRHT_YN` | 거래정지 여부 | string | Y | 1 |  |
| `TR_SUSP_REAS_CNTT` | 거래 정지 사유 내용 | string | Y | 100 |  |
| `MKOP_CLS_CODE` | 장운영 구분 코드 | string | Y | 3 |  |
| `ANTC_MKOP_CLS_CODE` | 예상 장운영 구분 코드 | string | Y | 3 |  |
| `MRKT_TRTM_CLS_CODE` | 임의연장구분코드 | string | Y | 1 |  |
| `DIVI_APP_CLS_CODE` | 동시호가배분처리구분코드 | string | Y | 2 |  |
| `ISCD_STAT_CLS_CODE` | 종목상태구분코드 | string | Y | 2 |  |
| `VI_CLS_CODE` | VI적용구분코드 | string | Y | 1 |  |
| `OVTM_VI_CLS_CODE` | 시간외단일가VI적용구분코드 | string | Y | 1 |  |
| `EXCH_CLS_CODE` | 거래소 구분코드 | string | Y | 1 |  |

---
### 160. 국내주식 실시간회원사 (NXT)

| Field | Value |
|---|---|
| Sheet | `국내주식 실시간회원사 (NXT)` |
| Menu | [국내주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0NXMBC0` |
| TR_ID (실전) | `H0NXMBC0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | N | 286 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 거래타입 | string | N | 1 | '1 : 등록  2 : 해제' |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0NXMBC0 : 국내주식 주식종목회원사 (NXT) |
| `tr_key` | 구분값 | string | Y | 12 | 종목코드 (ex 005930 삼성전자) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `MKSC_SHRN_ISCD` | 유가증권 단축 종목코드 | string | Y | 9 |  |
| `SELN2_MBCR_NAME1` | 매도2 회원사명1 | string | Y | 16 |  |
| `SELN2_MBCR_NAME2` | 매도2 회원사명2 | string | Y | 16 |  |
| `SELN2_MBCR_NAME3` | 매도2 회원사명3 | string | Y | 16 |  |
| `SELN2_MBCR_NAME4` | 매도2 회원사명4 | string | Y | 16 |  |
| `SELN2_MBCR_NAME5` | 매도2 회원사명5 | string | Y | 16 |  |
| `BYOV_MBCR_NAME1` | 매수 회원사명1 | string | Y | 16 |  |
| `BYOV_MBCR_NAME2` | 매수 회원사명2 | string | Y | 16 |  |
| `BYOV_MBCR_NAME3` | 매수 회원사명3 | string | Y | 16 |  |
| `BYOV_MBCR_NAME4` | 매수 회원사명4 | string | Y | 16 |  |
| `BYOV_MBCR_NAME5` | 매수 회원사명5 | string | Y | 16 |  |
| `TOTAL_SELN_QTY1` | 총 매도 수량1 | string | Y | 8 |  |
| `TOTAL_SELN_QTY2` | 총 매도 수량2 | string | Y | 8 |  |
| `TOTAL_SELN_QTY3` | 총 매도 수량3 | string | Y | 8 |  |
| `TOTAL_SELN_QTY4` | 총 매도 수량4 | string | Y | 8 |  |
| `TOTAL_SELN_QTY5` | 총 매도 수량5 | string | Y | 8 |  |
| `TOTAL_SHNU_QTY1` | 총 매수2 수량1 | string | Y | 8 |  |
| `TOTAL_SHNU_QTY2` | 총 매수2 수량2 | string | Y | 8 |  |
| `TOTAL_SHNU_QTY3` | 총 매수2 수량3 | string | Y | 8 |  |
| `TOTAL_SHNU_QTY4` | 총 매수2 수량4 | string | Y | 8 |  |
| `TOTAL_SHNU_QTY5` | 총 매수2 수량5 | string | Y | 8 |  |
| `SELN_MBCR_GLOB_YN_1` | 매도거래원구분1 | string | Y | 1 |  |
| `SELN_MBCR_GLOB_YN_2` | 매도거래원구분2 | string | Y | 1 |  |
| `SELN_MBCR_GLOB_YN_3` | 매도거래원구분3 | string | Y | 1 |  |
| `SELN_MBCR_GLOB_YN_4` | 매도거래원구분4 | string | Y | 1 |  |
| `SELN_MBCR_GLOB_YN_5` | 매도거래원구분5 | string | Y | 1 |  |
| `SHNU_MBCR_GLOB_YN_1` | 매수거래원구분1 | string | Y | 1 |  |
| `SHNU_MBCR_GLOB_YN_2` | 매수거래원구분2 | string | Y | 1 |  |
| `SHNU_MBCR_GLOB_YN_3` | 매수거래원구분3 | string | Y | 1 |  |
| `SHNU_MBCR_GLOB_YN_4` | 매수거래원구분4 | string | Y | 1 |  |
| `SHNU_MBCR_GLOB_YN_5` | 매수거래원구분5 | string | Y | 1 |  |
| `SELN_MBCR_NO1` | 매도거래원코드1 | string | Y | 5 |  |
| `SELN_MBCR_NO2` | 매도거래원코드2 | string | Y | 5 |  |
| `SELN_MBCR_NO3` | 매도거래원코드3 | string | Y | 5 |  |
| `SELN_MBCR_NO4` | 매도거래원코드4 | string | Y | 5 |  |
| `SELN_MBCR_NO5` | 매도거래원코드5 | string | Y | 5 |  |
| `SHNU_MBCR_NO1` | 매수거래원코드1 | string | Y | 5 |  |
| `SHNU_MBCR_NO2` | 매수거래원코드2 | string | Y | 5 |  |
| `SHNU_MBCR_NO3` | 매수거래원코드3 | string | Y | 5 |  |
| `SHNU_MBCR_NO4` | 매수거래원코드4 | string | Y | 5 |  |
| `SHNU_MBCR_NO5` | 매수거래원코드5 | string | Y | 5 |  |
| `SELN_MBCR_RLIM1` | 매도 회원사 비중1 | string | Y | 8 |  |
| `SELN_MBCR_RLIM2` | 매도 회원사 비중2 | string | Y | 8 |  |
| `SELN_MBCR_RLIM3` | 매도 회원사 비중3 | string | Y | 8 |  |
| `SELN_MBCR_RLIM4` | 매도 회원사 비중4 | string | Y | 8 |  |
| `SELN_MBCR_RLIM5` | 매도 회원사 비중5 | string | Y | 8 |  |
| `SHNU_MBCR_RLIM1` | 매수2 회원사 비중1 | string | Y | 8 |  |
| `SHNU_MBCR_RLIM2` | 매수2 회원사 비중2 | string | Y | 8 |  |
| `SHNU_MBCR_RLIM3` | 매수2 회원사 비중3 | string | Y | 8 |  |
| `SHNU_MBCR_RLIM4` | 매수2 회원사 비중4 | string | Y | 8 |  |
| `SHNU_MBCR_RLIM5` | 매수2 회원사 비중5 | string | Y | 8 |  |
| `SELN_QTY_ICDC1` | 매도 수량 증감1 | string | Y | 4 |  |
| `SELN_QTY_ICDC2` | 매도 수량 증감2 | string | Y | 4 |  |
| `SELN_QTY_ICDC3` | 매도 수량 증감3 | string | Y | 4 |  |
| `SELN_QTY_ICDC4` | 매도 수량 증감4 | string | Y | 4 |  |
| `SELN_QTY_ICDC5` | 매도 수량 증감5 | string | Y | 4 |  |
| `SHNU_QTY_ICDC1` | 매수2 수량 증감1 | string | Y | 4 |  |
| `SHNU_QTY_ICDC2` | 매수2 수량 증감2 | string | Y | 4 |  |
| `SHNU_QTY_ICDC3` | 매수2 수량 증감3 | string | Y | 4 |  |
| `SHNU_QTY_ICDC4` | 매수2 수량 증감4 | string | Y | 4 |  |
| `SHNU_QTY_ICDC5` | 매수2 수량 증감5 | string | Y | 4 |  |
| `GLOB_TOTAL_SELN_QTY` | 외국계 총 매도 수량 | string | Y | 8 |  |
| `GLOB_TOTAL_SHNU_QTY` | 외국계 총 매수2 수량 | string | Y | 8 |  |
| `GLOB_TOTAL_SELN_QTY_ICDC` | 외국계 총 매도 수량 증감 | string | Y | 4 |  |
| `GLOB_TOTAL_SHNU_QTY_ICDC` | 외국계 총 매수2 수량 증감 | string | Y | 4 |  |
| `GLOB_NTBY_QTY` | 외국계 순매수 수량 | string | Y | 8 |  |
| `GLOB_SELN_RLIM` | 외국계 매도 비중 | string | Y | 8 |  |
| `GLOB_SHNU_RLIM` | 외국계 매수2 비중 | string | Y | 8 |  |
| `SELN2_MBCR_ENG_NAME1` | 매도2 영문회원사명1 | string | Y | 20 |  |
| `SELN2_MBCR_ENG_NAME2` | 매도2 영문회원사명2 | string | Y | 20 |  |
| `SELN2_MBCR_ENG_NAME3` | 매도2 영문회원사명3 | string | Y | 20 |  |
| `SELN2_MBCR_ENG_NAME4` | 매도2 영문회원사명4 | string | Y | 20 |  |
| `SELN2_MBCR_ENG_NAME5` | 매도2 영문회원사명5 | string | Y | 20 |  |
| `BYOV_MBCR_ENG_NAME1` | 매수 영문회원사명1 | string | Y | 20 |  |
| `BYOV_MBCR_ENG_NAME2` | 매수 영문회원사명2 | string | Y | 20 |  |
| `BYOV_MBCR_ENG_NAME3` | 매수 영문회원사명3 | string | Y | 20 |  |
| `BYOV_MBCR_ENG_NAME4` | 매수 영문회원사명4 | string | Y | 20 |  |
| `BYOV_MBCR_ENG_NAME5` | 매수 영문회원사명5 | string | Y | 20 |  |

---
### 161. 국내주식 실시간체결통보

| Field | Value |
|---|---|
| Sheet | `국내주식 실시간체결통보` |
| Menu | [국내주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0STCNI0` |
| TR_ID (실전) | `H0STCNI0` |
| TR_ID (모의) | `H0STCNI9` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | N | 286 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 거래타입 | string | N | 1 | 1: 등록 2 : 해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | '[실전/모의투자]  H0STCNI0 : 국내주식 실시간체결통보  H0STCNI9 : 모의투자 실시간 체결통보 |
| `tr_key` | 구분값 | string | Y | 12 | HTS ID |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CUST_ID` | 고객 ID | string | Y | 8 |  |
| `ACNT_NO` | 계좌번호 | string | Y | 10 |  |
| `ODER_NO` | 주문번호 | string | Y | 10 |  |
| `OODER_NO` | 원주문번호 | string | Y | 10 |  |
| `SELN_BYOV_CLS` | 매도매수구분 | string | Y | 2 | 01 : 매도   02 : 매수 |
| `RCTF_CLS` | 정정구분 | string | Y | 1 | 0:정상   1:정정   2:취소 |
| `ODER_KIND` | 주문종류 | string | Y | 2 | [KRX]  00 : 지정가  01 : 시장가  02 : 조건부지정가  03 : 최유리지정가  04 : 최우선지정가  05 : 장전 시간외  06 : 장후 시간외  07 : 시간외 단일가  11 : IOC지정가 (즉시체결,잔량취소)  12 : FOK지정가 (즉시체결,전량취소)  13 : IOC시장가 (즉시체결,잔량취소)  14 : FOK시장가 (즉시체결,전량취소)  15 : IOC최유리 (즉시체결,잔량취소)  16 : FOK최유리 (즉시체결,전량취소)  21 : 중간가  22 : 스톱지정가  23 : 중간가IOC  24 : 중간가FOK    [NXT]  00 : 지정가  03 : 최유리지정가  04 : 최우선지정가  11 : IOC지정가 (즉시체결,잔량취소)  12 : FOK지정가 (즉시체결,전량취소)  13 : IOC시장가 (즉시체결,잔량취소)  14 : FOK시장가 (즉시체결,전량취소)  15 : IOC최유리 (즉시체결,잔량취소)  16 : FOK최유리 (즉시체결,전량취소)  21 : 중간가  22 : 스톱지정가  23 : 중간가IOC  24 : 중간가FOK    [SOR]  00 : 지정가  01 : 시장가  03 : 최유리지정가  04 : 최우선지정가  11 : IOC지정가 (즉시체결,잔량취소)  12 : FOK지정가 (즉시체결,전량취소)  13 : IOC시장가 (즉시체결,잔량취소)  14 : FOK시장가 (즉시체결,전량취소)  15 : IOC최유리 (즉시체결,잔량취소)  16 : FOK최유리 (즉시체결,전량취소) |
| `ODER_COND` | 주문조건 | string | Y | 1 | 0:없음  1:IOC   2:FOK |
| `STCK_SHRN_ISCD` | 주식 단축 종목코드 | string | Y | 9 |  |
| `CNTG_QTY` | 체결 수량 | string | Y | 10 |  |
| `CNTG_UNPR` | 체결단가 | string | Y | 9 |  |
| `STCK_CNTG_HOUR` | 주식 체결 시간 | string | Y | 6 |  |
| `RFUS_YN` | 거부여부 | string | Y | 1 | 0 : 승인   1 : 거부 |
| `CNTG_YN` | 체결여부 | string | Y | 1 | 1 : 주문,정정,취소,거부  2 : 체결 |
| `ACPT_YN` | 접수여부 | string | Y | 1 | 1 : 주문접수  2 : 확인  3 : 취소(FOK/IOC) |
| `BRNC_NO` | 지점번호 | string | Y | 5 |  |
| `ODER_QTY` | 주문수량 | string | Y | 9 |  |
| `ACNT_NAME` | 계좌명 | string | Y | 12 |  |
| `ORD_COND_PRC` | 호가조건가격 | string | Y | 9 | 스톱지정가 시 표시 |
| `ORD_EXG_GB` | 주문거래소 구분 | string | Y | 1 | 1:KRX, 2:NXT, 3:SOR-KRX, 4:SOR-NXT |
| `POPUP_YN` | 실시간체결창 표시여부 | string | Y | 1 | Y/N |
| `FILLER` | 필러 | string | Y | 3 |  |
| `CRDT_CLS` | 신용구분 | string | Y | 2 |  |
| `CRDT_LOAN_DATE` | 신용대출일자 | string | Y | 8 |  |
| `CNTG_ISNM40` | 체결종목명 | string | Y | 40 |  |
| `ODER_PRC` | 주문가격 | string | Y | 9 |  |

**Request Example:**
```
{           "header":           {                    "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",                    "custtype":"P",                    "tr_type":"1",                    "content-type":"utf-8"           },           "body":           {                    "input":                    {                             "tr_id":"H0STCNI0",                             "tr_key":"HTS ID"                    }           }  }
```

**Response Example:**
```
{      "header": {          "tr_id": "H0STCNI0",           "tr_key": "HTS ID",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output - 주문·정정·취소·거부 접수 통보  HTS ID^1234567801^0000002891^^02^0^01^0^136480^0000000001^000000000^094941^0  ^1^1^06010^000000001^김한투^하림^10^^하림^    # output - 체결 통보  HTS ID^1234567801^0000002891^^02^0^00^0^136480^0000000001^000003190^094941^0  ^2^2^06010^000000001^김한투^하림^10^^하림^000000000
```

---
### 162. 국내주식 시간외 실시간예상체결 (KRX)

| Field | Value |
|---|---|
| Sheet | `국내주식 시간외 실시간예상체결 (KRX)` |
| Menu | [국내주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0STOAC0` |
| TR_ID (실전) | `H0STOAC0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | 1: 등록, 2:해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0STOAC0 |
| `tr_key` | 구분값 | string | Y | 12 | 종목코드 (ex 005930 삼성전자) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `MKSC_SHRN_ISCD` | 유가증권단축종목코드 | string | Y | 9 |  |
| `STCK_CNTG_HOUR` | 주식체결시간 | string | Y | 6 |  |
| `STCK_PRPR` | 주식현재가 | string | Y | 1 |  |
| `PRDY_VRSS_SIGN` | 전일대비구분 | string | Y | 1 |  |
| `PRDY_VRSS` | 전일대비 | string | Y | 1 |  |
| `PRDY_CTRT` | 등락율 | string | Y | 1 |  |
| `WGHN_AVRG_STCK_PRC` | 가중평균주식가격 | string | Y | 1 |  |
| `STCK_OPRC` | 시가 | string | Y | 1 |  |
| `STCK_HGPR` | 고가 | string | Y | 1 |  |
| `STCK_LWPR` | 저가 | string | Y | 1 |  |
| `ASKP1` | 매도호가 | string | Y | 1 |  |
| `BIDP1` | 매수호가 | string | Y | 1 |  |
| `CNTG_VOL` | 거래량 | string | Y | 1 |  |
| `ACML_VOL` | 누적거래량 | string | Y | 1 |  |
| `ACML_TR_PBMN` | 누적거래대금 | string | Y | 1 |  |
| `SELN_CNTG_CSNU` | 매도체결건수 | string | Y | 1 |  |
| `SHNU_CNTG_CSNU` | 매수체결건수 | string | Y | 1 |  |
| `NTBY_CNTG_CSNU` | 순매수체결건수 | string | Y | 1 |  |
| `CTTR` | 체결강도 | string | Y | 1 |  |
| `SELN_CNTG_SMTN` | 총매도수량 | string | Y | 1 |  |
| `SHNU_CNTG_SMTN` | 총매수수량 | string | Y | 1 |  |
| `CNTG_CLS_CODE` | 체결구분 | string | Y | 1 |  |
| `SHNU_RATE` | 매수비율 | string | Y | 1 |  |
| `PRDY_VOL_VRSS_ACML_VOL_RATE` | 전일거래량대비등락율 | string | Y | 1 |  |
| `OPRC_HOUR` | 시가시간 | string | Y | 6 |  |
| `OPRC_VRSS_PRPR_SIGN` | 시가대비구분 | string | Y | 1 |  |
| `OPRC_VRSS_PRPR` | 시가대비 | string | Y | 1 |  |
| `HGPR_HOUR` | 최고가시간 | string | Y | 6 |  |
| `HGPR_VRSS_PRPR_SIGN` | 고가대비구분 | string | Y | 1 |  |
| `HGPR_VRSS_PRPR` | 고가대비 | string | Y | 1 |  |
| `LWPR_HOUR` | 최저가시간 | string | Y | 6 |  |
| `LWPR_VRSS_PRPR_SIGN` | 저가대비구분 | string | Y | 1 |  |
| `LWPR_VRSS_PRPR` | 저가대비 | string | Y | 1 |  |
| `BSOP_DATE` | 영업일자 | string | Y | 8 |  |
| `NEW_MKOP_CLS_CODE` | 신장운영구분코드 | string | Y | 2 |  |
| `TRHT_YN` | 거래정지여부 | string | Y | 1 |  |
| `ASKP_RSQN1` | 매도호가잔량1 | string | Y | 1 |  |
| `BIDP_RSQN1` | 매수호가잔량1 | string | Y | 1 |  |
| `TOTAL_ASKP_RSQN` | 총매도호가잔량 | string | Y | 1 |  |
| `TOTAL_BIDP_RSQN` | 총매수호가잔량 | string | Y | 1 |  |
| `VOL_TNRT` | 거래량회전율 | string | Y | 1 |  |
| `PRDY_SMNS_HOUR_ACML_VOL` | 전일동시간누적거래량 | string | Y | 1 |  |
| `PRDY_SMNS_HOUR_ACML_VOL_RATE` | 전일동시간누적거래량비율 | string | Y | 1 |  |

**Request Example:**
```
{           "header":           {                    "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",                    "custtype":"P",                    "tr_type":"1",                    "content-type":"utf-8"           },           "body":           {                    "input":                    {                             "tr_id":"H0STOAC0",                             "tr_key":"005930"                    }           }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "H0STOAC0",           "tr_key": "005930",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output  0\|H0STOAC0\|001\|005930^164128^77700^2^100^0.13^78209.85^77600^77800^77  600^77800^77700^82^82^6371400^2^2^0^71.12^6995^5511^1^0.38^69.15^161015^3^100^162004^5^  -100^161015^3^100^20240503^49^N^71160^6882^24644^30955^0.00^0^0.00
```

---
### 163. 국내주식 시간외 실시간호가 (KRX)

| Field | Value |
|---|---|
| Sheet | `국내주식 시간외 실시간호가 (KRX)` |
| Menu | [국내주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0STOAA0` |
| TR_ID (실전) | `H0STOAA0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | 1: 등록, 2:해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0STOAA0 |
| `tr_key` | 구분값 | string | Y | 12 | 종목코드 (ex 005930 삼성전자) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `MKSC_SHRN_ISCD` | 유가증권단축종목코드 | string | Y | 9 |  |
| `BSOP_HOUR` | 영업시간 | string | Y | 6 |  |
| `HOUR_CLS_CODE` | 시간구분코드 | string | Y | 1 |  |
| `ASKP1` | 매도호가1 | string | Y | 1 |  |
| `ASKP2` | 매도호가2 | string | Y | 1 |  |
| `ASKP3` | 매도호가3 | string | Y | 1 |  |
| `ASKP4` | 매도호가4 | string | Y | 1 |  |
| `ASKP5` | 매도호가5 | string | Y | 1 |  |
| `ASKP6` | 매도호가6 | string | Y | 1 |  |
| `ASKP7` | 매도호가7 | string | Y | 1 |  |
| `ASKP8` | 매도호가8 | string | Y | 1 |  |
| `ASKP9` | 매도호가9 | string | Y | 1 |  |
| `BIDP1` | 매수호가1 | string | Y | 1 |  |
| `BIDP2` | 매수호가2 | string | Y | 1 |  |
| `BIDP3` | 매수호가3 | string | Y | 1 |  |
| `BIDP4` | 매수호가4 | string | Y | 1 |  |
| `BIDP5` | 매수호가5 | string | Y | 1 |  |
| `BIDP6` | 매수호가6 | string | Y | 1 |  |
| `BIDP7` | 매수호가7 | string | Y | 1 |  |
| `BIDP8` | 매수호가8 | string | Y | 1 |  |
| `BIDP9` | 매수호가9 | string | Y | 1 |  |
| `ASKP_RSQN1` | 매도호가잔량1 | string | Y | 1 |  |
| `ASKP_RSQN2` | 매도호가잔량2 | string | Y | 1 |  |
| `ASKP_RSQN3` | 매도호가잔량3 | string | Y | 1 |  |
| `ASKP_RSQN4` | 매도호가잔량4 | string | Y | 1 |  |
| `ASKP_RSQN5` | 매도호가잔량5 | string | Y | 1 |  |
| `ASKP_RSQN6` | 매도호가잔량6 | string | Y | 1 |  |
| `ASKP_RSQN7` | 매도호가잔량7 | string | Y | 1 |  |
| `ASKP_RSQN8` | 매도호가잔량8 | string | Y | 1 |  |
| `ASKP_RSQN9` | 매도호가잔량9 | string | Y | 1 |  |
| `BIDP_RSQN1` | 매수호가잔량1 | string | Y | 1 |  |
| `BIDP_RSQN2` | 매수호가잔량2 | string | Y | 1 |  |
| `BIDP_RSQN3` | 매수호가잔량3 | string | Y | 1 |  |
| `BIDP_RSQN4` | 매수호가잔량4 | string | Y | 1 |  |
| `BIDP_RSQN5` | 매수호가잔량5 | string | Y | 1 |  |
| `BIDP_RSQN6` | 매수호가잔량6 | string | Y | 1 |  |
| `BIDP_RSQN7` | 매수호가잔량7 | string | Y | 1 |  |
| `BIDP_RSQN8` | 매수호가잔량8 | string | Y | 1 |  |
| `BIDP_RSQN9` | 매수호가잔량9 | string | Y | 1 |  |
| `TOTAL_ASKP_RSQN` | 총매도호가잔량 | string | Y | 1 |  |
| `TOTAL_BIDP_RSQN` | 총매수호가잔량 | string | Y | 1 |  |
| `OVTM_TOTAL_ASKP_RSQN` | 시간외총매도호가잔량 | string | Y | 1 |  |
| `OVTM_TOTAL_BIDP_RSQN` | 시간외총매수호가잔량 | string | Y | 1 |  |
| `ANTC_CNPR` | 예상체결가 | string | Y | 1 |  |
| `ANTC_CNQN` | 예상체결량 | string | Y | 1 |  |
| `ANTC_VOL` | 예상거래량 | string | Y | 1 |  |
| `ANTC_CNTG_VRSS` | 예상체결대비 | string | Y | 1 |  |
| `ANTC_CNTG_VRSS_SIGN` | 예상체결대비부호 | string | Y | 1 |  |
| `ANTC_CNTG_PRDY_CTRT` | 예상체결전일대비율 | string | Y | 1 |  |
| `ACML_VOL` | 누적거래량 | string | Y | 1 |  |
| `TOTAL_ASKP_RSQN_ICDC` | 총매도호가잔량증감 | string | Y | 1 |  |
| `TOTAL_BIDP_RSQN_ICDC` | 총매수호가잔량증감 | string | Y | 1 |  |
| `OVTM_TOTAL_ASKP_ICDC` | 시간외총매도호가증감 | string | Y | 1 |  |
| `OVTM_TOTAL_BIDP_ICDC` | 시간외총매수호가증감 | string | Y | 1 |  |

**Request Example:**
```
{           "header":           {                    "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",                    "custtype":"P",                    "tr_type":"1",                    "content-type":"utf-8"           },           "body":           {                    "input":                    {                             "tr_id":"H0STOAA0",                             "tr_key":"005930"                    }           }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "H0STOAA0",           "tr_key": "005930",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output  0\|H0STOAA0\|001\|005930^164128^B^77800^77900^78000^0^0^0^0^0^0^0^77700^  77600^77500^0^0^0^0^0^0^0^8005^7355^9284^0^0^0^0^0^0^0^4^16654^14297^0^0^0^0^0^0^0^2464  4^30955^0^37426^77700^82^82^100^2^0.13^13069425^-1^0^0^0
```

---
### 164. 국내주식 실시간프로그램매매 (통합)

| Field | Value |
|---|---|
| Sheet | `국내주식 실시간프로그램매매 (통합)` |
| Menu | [국내주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0UNPGM0` |
| TR_ID (실전) | `H0UNPGM0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | N | 286 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 거래타입 | string | N | 1 | '1 : 등록  2 : 해제' |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0UNPGM0 : 실시간 주식종목프로그램매매 통합 |
| `tr_key` | 구분값 | string | Y | 12 | 종목코드 (ex 005930 삼성전자) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `MKSC_SHRN_ISCD` | 유가증권 단축 종목코드 | string | Y | 9 |  |
| `STCK_CNTG_HOUR` | 주식 체결 시간 | string | Y | 6 |  |
| `SELN_CNQN` | 매도 체결량 | string | Y | 8 |  |
| `SELN_TR_PBMN` | 매도 거래 대금 | string | Y | 8 |  |
| `SHNU_CNQN` | 매수2 체결량 | string | Y | 8 |  |
| `SHNU_TR_PBMN` | 매수2 거래 대금 | string | Y | 8 |  |
| `NTBY_CNQN` | 순매수 체결량 | string | Y | 8 |  |
| `NTBY_TR_PBMN` | 순매수 거래 대금 | string | Y | 8 |  |
| `SELN_RSQN` | 매도호가잔량 | string | Y | 8 |  |
| `SHNU_RSQN` | 매수호가잔량 | string | Y | 8 |  |
| `WHOL_NTBY_QTY` | 전체순매수호가잔량 | string | Y | 8 |  |

---
### 165. 국내주식 실시간호가 (통합)

| Field | Value |
|---|---|
| Sheet | `국내주식 실시간호가 (통합)` |
| Menu | [국내주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0UNASP0` |
| TR_ID (실전) | `H0UNASP0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | N | 286 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 거래타입 | string | N | 1 | '1 : 등록  2 : 해제' |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0UNASP0 : 실시간 주식 체결가 통합 |
| `tr_key` | 구분값 | string | Y | 12 | 종목코드 (ex 005930 삼성전자) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `MKSC_SHRN_ISCD` | 유가증권 단축 종목코드 | string | Y | 9 |  |
| `BSOP_HOUR` | 영업 시간 | string | Y | 6 |  |
| `HOUR_CLS_CODE` | 시간 구분 코드 | string | Y | 1 |  |
| `ASKP1` | 매도호가1 | string | Y | 4 |  |
| `ASKP2` | 매도호가2 | string | Y | 4 |  |
| `ASKP3` | 매도호가3 | string | Y | 4 |  |
| `ASKP4` | 매도호가4 | string | Y | 4 |  |
| `ASKP5` | 매도호가5 | string | Y | 4 |  |
| `ASKP6` | 매도호가6 | string | Y | 4 |  |
| `ASKP7` | 매도호가7 | string | Y | 4 |  |
| `ASKP8` | 매도호가8 | string | Y | 4 |  |
| `ASKP9` | 매도호가9 | string | Y | 4 |  |
| `ASKP10` | 매도호가10 | string | Y | 4 |  |
| `BIDP1` | 매수호가1 | string | Y | 4 |  |
| `BIDP2` | 매수호가2 | string | Y | 4 |  |
| `BIDP3` | 매수호가3 | string | Y | 4 |  |
| `BIDP4` | 매수호가4 | string | Y | 4 |  |
| `BIDP5` | 매수호가5 | string | Y | 4 |  |
| `BIDP6` | 매수호가6 | string | Y | 4 |  |
| `BIDP7` | 매수호가7 | string | Y | 4 |  |
| `BIDP8` | 매수호가8 | string | Y | 4 |  |
| `BIDP9` | 매수호가9 | string | Y | 4 |  |
| `BIDP10` | 매수호가10 | string | Y | 4 |  |
| `ASKP_RSQN1` | 매도호가 잔량1 | string | Y | 8 |  |
| `ASKP_RSQN2` | 매도호가 잔량2 | string | Y | 8 |  |
| `ASKP_RSQN3` | 매도호가 잔량3 | string | Y | 8 |  |
| `ASKP_RSQN4` | 매도호가 잔량4 | string | Y | 8 |  |
| `ASKP_RSQN5` | 매도호가 잔량5 | string | Y | 8 |  |
| `ASKP_RSQN6` | 매도호가 잔량6 | string | Y | 8 |  |
| `ASKP_RSQN7` | 매도호가 잔량7 | string | Y | 8 |  |
| `ASKP_RSQN8` | 매도호가 잔량8 | string | Y | 8 |  |
| `ASKP_RSQN9` | 매도호가 잔량9 | string | Y | 8 |  |
| `ASKP_RSQN10` | 매도호가 잔량10 | string | Y | 8 |  |
| `BIDP_RSQN1` | 매수호가 잔량1 | string | Y | 8 |  |
| `BIDP_RSQN2` | 매수호가 잔량2 | string | Y | 8 |  |
| `BIDP_RSQN3` | 매수호가 잔량3 | string | Y | 8 |  |
| `BIDP_RSQN4` | 매수호가 잔량4 | string | Y | 8 |  |
| `BIDP_RSQN5` | 매수호가 잔량5 | string | Y | 8 |  |
| `BIDP_RSQN6` | 매수호가 잔량6 | string | Y | 8 |  |
| `BIDP_RSQN7` | 매수호가 잔량7 | string | Y | 8 |  |
| `BIDP_RSQN8` | 매수호가 잔량8 | string | Y | 8 |  |
| `BIDP_RSQN9` | 매수호가 잔량9 | string | Y | 8 |  |
| `BIDP_RSQN10` | 매수호가 잔량10 | string | Y | 8 |  |
| `TOTAL_ASKP_RSQN` | 총 매도호가 잔량 | string | Y | 8 |  |
| `TOTAL_BIDP_RSQN` | 총 매수호가 잔량 | string | Y | 8 |  |
| `OVTM_TOTAL_ASKP_RSQN` | 시간외 총 매도호가 잔량 | string | Y | 8 |  |
| `OVTM_TOTAL_BIDP_RSQN` | 시간외 총 매수호가 잔량 | string | Y | 8 |  |
| `ANTC_CNPR` | 예상 체결가 | string | Y | 4 |  |
| `ANTC_CNQN` | 예상 체결량 | string | Y | 8 |  |
| `ANTC_VOL` | 예상 거래량 | string | Y | 8 |  |
| `ANTC_CNTG_VRSS` | 예상 체결 대비 | string | Y | 4 |  |
| `ANTC_CNTG_VRSS_SIGN` | 예상 체결 대비 부호 | string | Y | 1 |  |
| `ANTC_CNTG_PRDY_CTRT` | 예상 체결 전일 대비율 | string | Y | 8 |  |
| `ACML_VOL` | 누적 거래량 | string | Y | 8 |  |
| `TOTAL_ASKP_RSQN_ICDC` | 총 매도호가 잔량 증감 | string | Y | 4 |  |
| `TOTAL_BIDP_RSQN_ICDC` | 총 매수호가 잔량 증감 | string | Y | 4 |  |
| `OVTM_TOTAL_ASKP_ICDC` | 시간외 총 매도호가 증감 | string | Y | 4 |  |
| `OVTM_TOTAL_BIDP_ICDC` | 시간외 총 매수호가 증감 | string | Y | 4 |  |
| `STCK_DEAL_CLS_CODE` | 주식 매매 구분 코드 | string | Y | 2 |  |
| `KMID_PRC` | KRX 중간가 | string | Y | 4 |  |
| `KMID_TOTAL_RSQN` | KRX 중간가잔량합계수량 | string | Y | 8 |  |
| `KMID_CLS_CODE` | KRX 중간가 매수매도 구분 | string | Y | 1 |  |
| `NMID_PRC` | NXT 중간가 | string | Y | 4 |  |
| `NMID_TOTAL_RSQN` | NXT 중간가잔량합계수량 | string | Y | 8 |  |
| `NMID_CLS_CODE` | NXT 중간가 매수매도 구분 | string | Y | 1 |  |

---
### 166. 국내주식 실시간프로그램매매 (KRX)

| Field | Value |
|---|---|
| Sheet | `국내주식 실시간프로그램매매 (KRX)` |
| Menu | [국내주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0STPGM0` |
| TR_ID (실전) | `H0STPGM0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | "1: 등록, 2:해제" |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 7 | H0STPGM0 |
| `tr_key` | 종목코드 | string | Y | 6 | 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `MKSC_SHRN_ISCD` | 유가증권단축종목코드 | object | Y | 9 | '각 항목사이에는 구분자로 ^ 사용,  모든 데이터타입은 String으로 변환되어 push 처리됨' |
| `STCK_CNTG_HOUR` | 주식체결시간 | string | Y | 6 |  |
| `SELN_CNQN` | 매도체결량 | string | Y | 1 |  |
| `SELN_TR_PBMN` | 매도거래대금 | string | Y | 1 |  |
| `SHNU_CNQN` | 매수2체결량 | string | Y | 1 |  |
| `SHNU_TR_PBMN` | 매수2거래대금 | string | Y | 1 |  |
| `NTBY_CNQN` | 순매수체결량 | string | Y | 1 |  |
| `NTBY_TR_PBMN` | 순매수거래대금 | string | Y | 1 |  |
| `SELN_RSQN` | 매도호가잔량 | string | Y | 1 |  |
| `SHNU_RSQN` | 매수호가잔량 | string | Y | 1 |  |
| `WHOL_NTBY_QTY` | 전체순매수호가잔량 | string | Y | 1 |  |

**Request Example:**
```
{      "header": {          "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",          "custtype": "P",          "tr_type": "1",          "content-type": "utf-8"      },      "body": {          "input": {              "tr_id": "H0STPGM0",              "tr_key": "005930"          }      }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "H0STPGM0",           "tr_key": "005930",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output  0\|H0STPGM0\|001\|005930^092237^1413444^109159646900^1189408^91931710200^-2240  36^-17227936700^65033^15475^-49558
```

---
### 167. 국내주식 장운영정보 (KRX)

| Field | Value |
|---|---|
| Sheet | `국내주식 장운영정보 (KRX)` |
| Menu | [국내주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0STMKO0` |
| TR_ID (실전) | `H0STMKO0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | "1: 등록, 2:해제" |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 7 | H0STMKO0 |
| `tr_key` | 종목코드 | string | Y | 6 | 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `MKSC_SHRN_ISCD` | 유가증권단축종목코드 | object | Y | 9 | '각 항목사이에는 구분자로 ^ 사용,  모든 데이터타입은 String으로 변환되어 push 처리됨' |
| `TRHT_YN` | 거래정지여부 | string | Y | 1 |  |
| `TR_SUSP_REAS_CNTT` | 거래정지사유내용 | string | Y | 100 |  |
| `MKOP_CLS_CODE` | 장운영구분코드 | string | Y | 3 | 110        장전 동시호가 개시                        112        장개시                                    121        장후 동시호가 개시                        129        장마감                                    130        장개시전시간외개시                        139        장개시전시간외종료                        140        시간외 종가 매매 개시                     146        장종료후시간외 체결지시                   149        시간외 종가 매매 종료                     150        시간외 단일가 매매 개시                   156        시간외단일가 체결지시                     159        시간외 단일가 매매 종료                   164        시장임시정지                              174        서킷브레이크 발동                         175        서킷브레이크 해제                         182        서킷브레이크 장중동시마감                 184        서킷브레이크 개시                         185        서킷브레이크 해제                         387        사이드카 매도발동                         388        사이드카 매도발동해제                     397        사이드카 매수발동                         398        사이드카 매수발동해제                     ???        단일가개시                                ???        서킷브레이크 단일가접수                   F01        장개시 10초전                             F06        장개시 1분전                              F07        장개시 5분전                              F08        장개시 10분전                             F09        장개시 3분전                              F11        장마감 10초전                             F16        장마감 1분전                              F17        장마감 5분전                              F18        장마감 3분전                              P01        장개시 10초전                             P06        장개시 1분전                              P07        장개시 5분전                              P08        장개시 10분전                             P09        장개시 30분전                             P11        장마감 10초전                             P16        장마감 1분전                              P17        장마감 5분전                              P18        장마감 3분전 |
| `ANTC_MKOP_CLS_CODE` | 예상장운영구분코드 | string | Y | 3 | 112    장전예상종료   121   장후예상시작  129   장후예상종료  311  장전예상시작 |
| `MRKT_TRTM_CLS_CODE` | 임의연장구분코드 | string | Y | 1 | 1  시초동시 임의종료 지정  2  시초동시 임의종료 해제   3  마감동시 임의종료 지정   4  마감동시 임의종료 해제    5  시간외단일가임의종료 지정   6  시간외단일가임의종료 해제 |
| `DIVI_APP_CLS_CODE` | 동시호가배분처리구분코드 | string | Y | 2 | divi_app_cls_code[0]  1: 배분개시 2: 배분해제  divi_app_cls_code[1] 1: 매수상한 2: 매수하한 3: 매도상한 4: 매도하한 |
| `ISCD_STAT_CLS_CODE` | 종목상태구분코드 | string | Y | 2 | 51  관리종목 지정 종목  52  시장경고 구분이 '투자위험'인 종목  53  시장경고 구분이 '투자경고'인 종목  54  시장경고 구분이 '투자주의'인 종목  55  당사 신용가능 종목  57  당사 증거금률이 100인 종목  58  거래정지 지정된 종목    59  단기과열종목으로 지정되거나 지정 연장된 종목  00 그 외 종목 |
| `VI_CLS_CODE` | VI적용구분코드 | string | Y | 1 | Y  VI적용된 종목  N  VI적용되지 않은 종목 |
| `OVTM_VI_CLS_CODE` | 시간외단일가VI적용구분코드 | string | Y | 1 | Y 시간외단일가VI 적용된 종목  N 시간외단일가VI 적용되지 않은 종목 |
| `EXCH_CLS_CODE` | 거래소구분코드 | string | Y | 1 |  |

**Request Example:**
```
{      "header": {          "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",          "custtype": "P",          "tr_type": "1",          "content-type": "utf-8"      },      "body": {          "input": {              "tr_id": "H0STMKO0",              "tr_key": "396300"          }      }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "H0STMKO0",           "tr_key": "396300",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output  0\|H0STMKO0\|001\|396300^N^(null)^^311^^^55^N^N
```

---
### 168. 국내주식 실시간체결가 (KRX)

| Field | Value |
|---|---|
| Sheet | `국내주식 실시간체결가 (KRX)` |
| Menu | [국내주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0STCNT0` |
| TR_ID (실전) | `H0STCNT0` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 286 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 거래타입 | string | Y | 1 | 1 : 등록  2 : 해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 1 | [실전/모의투자]  H0STCNT0 : 실시간 주식 체결가 |
| `tr_key` | 구분값 | string | Y | 1 | 종목번호 (6자리)  ETN의 경우, Q로 시작 (EX. Q500001) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `MKSC_SHRN_ISCD` | 유가증권 단축 종목코드 | string | Y | 9 |  |
| `STCK_CNTG_HOUR` | 주식 체결 시간 | string | Y | 6 |  |
| `STCK_PRPR` | 주식 현재가 | number | Y | 4 | 체결가격 |
| `PRDY_VRSS_SIGN` | 전일 대비 부호 | string | Y | 1 | 1 : 상한  2 : 상승  3 : 보합  4 : 하한  5 : 하락 |
| `PRDY_VRSS` | 전일 대비 | number | Y | 4 |  |
| `PRDY_CTRT` | 전일 대비율 | number | Y | 8 |  |
| `WGHN_AVRG_STCK_PRC` | 가중 평균 주식 가격 | number | Y | 8 |  |
| `STCK_OPRC` | 주식 시가 | number | Y | 4 |  |
| `STCK_HGPR` | 주식 최고가 | number | Y | 4 |  |
| `STCK_LWPR` | 주식 최저가 | number | Y | 4 |  |
| `ASKP1` | 매도호가1 | number | Y | 4 |  |
| `BIDP1` | 매수호가1 | number | Y | 4 |  |
| `CNTG_VOL` | 체결 거래량 | number | Y | 8 |  |
| `ACML_VOL` | 누적 거래량 | number | Y | 8 |  |
| `ACML_TR_PBMN` | 누적 거래 대금 | number | Y | 8 |  |
| `SELN_CNTG_CSNU` | 매도 체결 건수 | number | Y | 4 |  |
| `SHNU_CNTG_CSNU` | 매수 체결 건수 | number | Y | 4 |  |
| `NTBY_CNTG_CSNU` | 순매수 체결 건수 | number | Y | 4 |  |
| `CTTR` | 체결강도 | number | Y | 8 |  |
| `SELN_CNTG_SMTN` | 총 매도 수량 | number | Y | 8 |  |
| `SHNU_CNTG_SMTN` | 총 매수 수량 | number | Y | 8 |  |
| `CCLD_DVSN` | 체결구분 | string | Y | 1 | 1:매수(+)   3:장전   5:매도(-) |
| `SHNU_RATE` | 매수비율 | number | Y | 8 |  |
| `PRDY_VOL_VRSS_ACML_VOL_RATE` | 전일 거래량 대비 등락율 | number | Y | 8 |  |
| `OPRC_HOUR` | 시가 시간 | string | Y | 6 |  |
| `OPRC_VRSS_PRPR_SIGN` | 시가대비구분 | string | Y | 1 | 1 : 상한  2 : 상승  3 : 보합  4 : 하한  5 : 하락 |
| `OPRC_VRSS_PRPR` | 시가대비 | number | Y | 4 |  |
| `HGPR_HOUR` | 최고가 시간 | string | Y | 6 |  |
| `HGPR_VRSS_PRPR_SIGN` | 고가대비구분 | string | Y | 1 | 1 : 상한  2 : 상승  3 : 보합  4 : 하한  5 : 하락 |
| `HGPR_VRSS_PRPR` | 고가대비 | number | Y | 4 |  |
| `LWPR_HOUR` | 최저가 시간 | string | Y | 6 |  |
| `LWPR_VRSS_PRPR_SIGN` | 저가대비구분 | string | Y | 1 | 1 : 상한  2 : 상승  3 : 보합  4 : 하한  5 : 하락 |
| `LWPR_VRSS_PRPR` | 저가대비 | number | Y | 4 |  |
| `BSOP_DATE` | 영업 일자 | string | Y | 8 |  |
| `NEW_MKOP_CLS_CODE` | 신 장운영 구분 코드 | string | Y | 2 | (1) 첫 번째 비트  1 : 장개시전  2 : 장중  3 : 장종료후  4 : 시간외단일가  7 : 일반Buy-in  8 : 당일Buy-in    (2) 두 번째 비트  0 : 보통  1 : 종가  2 : 대량  3 : 바스켓  7 : 정리매매  8 : Buy-in |
| `TRHT_YN` | 거래정지 여부 | string | Y | 1 | Y : 정지  N : 정상거래 |
| `ASKP_RSQN1` | 매도호가 잔량1 | number | Y | 8 |  |
| `BIDP_RSQN1` | 매수호가 잔량1 | number | Y | 8 |  |
| `TOTAL_ASKP_RSQN` | 총 매도호가 잔량 | number | Y | 8 |  |
| `TOTAL_BIDP_RSQN` | 총 매수호가 잔량 | number | Y | 8 |  |
| `VOL_TNRT` | 거래량 회전율 | number | Y | 8 |  |
| `PRDY_SMNS_HOUR_ACML_VOL` | 전일 동시간 누적 거래량 | number | Y | 8 |  |
| `PRDY_SMNS_HOUR_ACML_VOL_RATE` | 전일 동시간 누적 거래량 비율 | number | Y | 8 |  |
| `HOUR_CLS_CODE` | 시간 구분 코드 | string | Y | 1 | 0 : 장중  A : 장후예상  B : 장전예상  C : 9시이후의 예상가, VI발동  D : 시간외 단일가 예상 |
| `MRKT_TRTM_CLS_CODE` | 임의종료구분코드 | string | Y | 1 |  |
| `VI_STND_PRC` | 정적VI발동기준가 | number | Y | 4 |  |

**Request Example:**
```
{           "header":           {                    "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",                    "custtype":"P",                    "tr_type":"1",                    "content-type":"utf-8"           },           "body":           {                    "input":                    {                             "tr_id":"H0STCNT0",                             "tr_key":"005930"                    }           }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "H0STCNT0",           "tr_key": "005930",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output  005930^093354^71900^5^-100^-0.14^72023.83^72100^72400^71700^71900^71800^1^3052  507^219853241700^5105^6937^1832^84.90^1366314^1159996^1^0.39^20.28^090020^5^-2  00^090820^5^-500^092619^2^200^20230612^20^N^65945^216924^1118750^2199206^0.05^  2424142^125.92^0^^72100
```

---
### 169. 국내지수 실시간프로그램매매

| Field | Value |
|---|---|
| Sheet | `국내지수 실시간프로그램매매` |
| Menu | [국내주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0UPPGM0` |
| TR_ID (실전) | `H0UPPGM0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | "1: 등록, 2:해제" |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 7 | H0UPPGM0 |
| `tr_key` | 종목코드 | string | Y | 6 | 업종구분코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `BSTP_CLS_CODE` | 업종 구분 코드 | object | Y | 4 | '각 항목사이에는 구분자로 ^ 사용,  모든 데이터타입은 String으로 변환되어 push 처리됨' |
| `BSOP_HOUR` | 영업 시간 | string | Y | 6 |  |
| `ARBT_SELN_ENTM_CNQN` | 차익 매도 위탁 체결량 | string | Y | 1 |  |
| `ARBT_SELN_ONSL_CNQN` | 차익 매도 자기 체결량 | string | Y | 1 |  |
| `ARBT_SHNU_ENTM_CNQN` | 차익 매수2 위탁 체결량 | string | Y | 1 |  |
| `ARBT_SHNU_ONSL_CNQN` | 차익 매수2 자기 체결량 | string | Y | 1 |  |
| `NABT_SELN_ENTM_CNQN` | 비차익 매도 위탁 체결량 | string | Y | 1 |  |
| `NABT_SELN_ONSL_CNQN` | 비차익 매도 자기 체결량 | string | Y | 1 |  |
| `NABT_SHNU_ENTM_CNQN` | 비차익 매수2 위탁 체결량 | string | Y | 1 |  |
| `NABT_SHNU_ONSL_CNQN` | 비차익 매수2 자기 체결량 | string | Y | 1 |  |
| `ARBT_SELN_ENTM_CNTG_AMT` | 차익 매도 위탁 체결 금액 | string | Y | 1 |  |
| `ARBT_SELN_ONSL_CNTG_AMT` | 차익 매도 자기 체결 금액 | string | Y | 1 |  |
| `ARBT_SHNU_ENTM_CNTG_AMT` | 차익 매수2 위탁 체결 금액 | string | Y | 1 |  |
| `ARBT_SHNU_ONSL_CNTG_AMT` | 차익 매수2 자기 체결 금액 | string | Y | 1 |  |
| `NABT_SELN_ENTM_CNTG_AMT` | 비차익 매도 위탁 체결 금액 | string | Y | 1 |  |
| `NABT_SELN_ONSL_CNTG_AMT` | 비차익 매도 자기 체결 금액 | string | Y | 1 |  |
| `NABT_SHNU_ENTM_CNTG_AMT` | 비차익 매수2 위탁 체결 금액 | string | Y | 1 |  |
| `NABT_SHNU_ONSL_CNTG_AMT` | 비차익 매수2 자기 체결 금액 | string | Y | 1 |  |
| `ARBT_SMTN_SELN_VOL` | 차익 합계 매도 거래량 | string | Y | 1 |  |
| `ARBT_SMTM_SELN_VOL_RATE` | 차익 합계 매도 거래량 비율 | string | Y | 1 |  |
| `ARBT_SMTN_SELN_TR_PBMN` | 차익 합계 매도 거래 대금 | string | Y | 1 |  |
| `ARBT_SMTM_SELN_TR_PBMN_RATE` | 차익 합계 매도 거래대금 비율 | string | Y | 1 |  |
| `ARBT_SMTN_SHNU_VOL` | 차익 합계 매수2 거래량 | string | Y | 1 |  |
| `ARBT_SMTM_SHNU_VOL_RATE` | 차익 합계 매수 거래량 비율 | string | Y | 1 |  |
| `ARBT_SMTN_SHNU_TR_PBMN` | 차익 합계 매수2 거래 대금 | string | Y | 1 |  |
| `ARBT_SMTM_SHNU_TR_PBMN_RATE` | 차익 합계 매수 거래대금 비율 | string | Y | 1 |  |
| `ARBT_SMTN_NTBY_QTY` | 차익 합계 순매수 수량 | string | Y | 1 |  |
| `ARBT_SMTM_NTBY_QTY_RATE` | 차익 합계 순매수 수량 비율 | string | Y | 1 |  |
| `ARBT_SMTN_NTBY_TR_PBMN` | 차익 합계 순매수 거래 대금 | string | Y | 1 |  |
| `ARBT_SMTM_NTBY_TR_PBMN_RATE` | 차익 합계 순매수 거래대금 비율 | string | Y | 1 |  |
| `NABT_SMTN_SELN_VOL` | 비차익 합계 매도 거래량 | string | Y | 1 |  |
| `NABT_SMTM_SELN_VOL_RATE` | 비차익 합계 매도 거래량 비율 | string | Y | 1 |  |
| `NABT_SMTN_SELN_TR_PBMN` | 비차익 합계 매도 거래 대금 | string | Y | 1 |  |
| `NABT_SMTM_SELN_TR_PBMN_RATE` | 비차익 합계 매도 거래대금 비율 | string | Y | 1 |  |
| `NABT_SMTN_SHNU_VOL` | 비차익 합계 매수2 거래량 | string | Y | 1 |  |
| `NABT_SMTM_SHNU_VOL_RATE` | 비차익 합계 매수 거래량 비율 | string | Y | 1 |  |
| `NABT_SMTN_SHNU_TR_PBMN` | 비차익 합계 매수2 거래 대금 | string | Y | 1 |  |
| `NABT_SMTM_SHNU_TR_PBMN_RATE` | 비차익 합계 매수 거래대금 비율 | string | Y | 1 |  |
| `NABT_SMTN_NTBY_QTY` | 비차익 합계 순매수 수량 | string | Y | 1 |  |
| `NABT_SMTM_NTBY_QTY_RATE` | 비차익 합계 순매수 수량 비율 | string | Y | 1 |  |
| `NABT_SMTN_NTBY_TR_PBMN` | 비차익 합계 순매수 거래 대금 | string | Y | 1 |  |
| `NABT_SMTM_NTBY_TR_PBMN_RATE` | 비차익 합계 순매수 거래대금 비 | string | Y | 1 |  |
| `WHOL_ENTM_SELN_VOL` | 전체 위탁 매도 거래량 | string | Y | 1 |  |
| `ENTM_SELN_VOL_RATE` | 위탁 매도 거래량 비율 | string | Y | 1 |  |
| `WHOL_ENTM_SELN_TR_PBMN` | 전체 위탁 매도 거래 대금 | string | Y | 1 |  |
| `ENTM_SELN_TR_PBMN_RATE` | 위탁 매도 거래대금 비율 | string | Y | 1 |  |
| `WHOL_ENTM_SHNU_VOL` | 전체 위탁 매수2 거래량 | string | Y | 1 |  |
| `ENTM_SHNU_VOL_RATE` | 위탁 매수 거래량 비율 | string | Y | 1 |  |
| `WHOL_ENTM_SHNU_TR_PBMN` | 전체 위탁 매수2 거래 대금 | string | Y | 1 |  |
| `ENTM_SHNU_TR_PBMN_RATE` | 위탁 매수 거래대금 비율 | string | Y | 1 |  |
| `WHOL_ENTM_NTBY_QT` | 전체 위탁 순매수 수량 | string | Y | 1 |  |
| `ENTM_NTBY_QTY_RAT` | 위탁 순매수 수량 비율 | string | Y | 1 |  |
| `WHOL_ENTM_NTBY_TR_PBMN` | 전체 위탁 순매수 거래 대금 | string | Y | 1 |  |
| `ENTM_NTBY_TR_PBMN_RATE` | 위탁 순매수 금액 비율 | string | Y | 1 |  |
| `WHOL_ONSL_SELN_VOL` | 전체 자기 매도 거래량 | string | Y | 1 |  |
| `ONSL_SELN_VOL_RATE` | 자기 매도 거래량 비율 | string | Y | 1 |  |
| `WHOL_ONSL_SELN_TR_PBMN` | 전체 자기 매도 거래 대금 | string | Y | 1 |  |
| `ONSL_SELN_TR_PBMN_RATE` | 자기 매도 거래대금 비율 | string | Y | 1 |  |
| `WHOL_ONSL_SHNU_VOL` | 전체 자기 매수2 거래량 | string | Y | 1 |  |
| `ONSL_SHNU_VOL_RATE` | 자기 매수 거래량 비율 | string | Y | 1 |  |
| `WHOL_ONSL_SHNU_TR_PBMN` | 전체 자기 매수2 거래 대금 | string | Y | 1 |  |
| `ONSL_SHNU_TR_PBMN_RATE` | 자기 매수 거래대금 비율 | string | Y | 1 |  |
| `WHOL_ONSL_NTBY_QTY` | 전체 자기 순매수 수량 | string | Y | 1 |  |
| `ONSL_NTBY_QTY_RATE` | 자기 순매수량 비율 | string | Y | 1 |  |
| `WHOL_ONSL_NTBY_TR_PBMN` | 전체 자기 순매수 거래 대금 | string | Y | 1 |  |
| `ONSL_NTBY_TR_PBMN_RATE` | 자기 순매수 대금 비율 | string | Y | 1 |  |
| `TOTAL_SELN_QTY` | 총 매도 수량 | string | Y | 1 |  |
| `WHOL_SELN_VOL_RATE` | 전체 매도 거래량 비율 | string | Y | 1 |  |
| `TOTAL_SELN_TR_PBMN` | 총 매도 거래 대금 | string | Y | 1 |  |
| `WHOL_SELN_TR_PBMN_RATE` | 전체 매도 거래대금 비율 | string | Y | 1 |  |
| `SHNU_CNTG_SMTN` | 총 매수 수량 | string | Y | 1 |  |
| `WHOL_SHUN_VOL_RATE` | 전체 매수 거래량 비율 | string | Y | 1 |  |
| `TOTAL_SHNU_TR_PBMN` | 총 매수2 거래 대금 | string | Y | 1 |  |
| `WHOL_SHUN_TR_PBMN_RATE` | 전체 매수 거래대금 비율 | string | Y | 1 |  |
| `WHOL_NTBY_QTY` | 전체 순매수 수량 | string | Y | 1 |  |
| `WHOL_SMTM_NTBY_QTY_RATE` | 전체 합계 순매수 수량 비율 | string | Y | 1 |  |
| `WHOL_NTBY_TR_PBMN` | 전체 순매수 거래 대금 | string | Y | 1 |  |
| `WHOL_NTBY_TR_PBMN_RATE` | 전체 순매수 거래대금 비율 | string | Y | 1 |  |
| `ARBT_ENTM_NTBY_QTY` | 차익 위탁 순매수 수량 | string | Y | 1 |  |
| `ARBT_ENTM_NTBY_TR_PBMN` | 차익 위탁 순매수 거래 대금 | string | Y | 1 |  |
| `ARBT_ONSL_NTBY_QTY` | 차익 자기 순매수 수량 | string | Y | 1 |  |
| `ARBT_ONSL_NTBY_TR_PBMN` | 차익 자기 순매수 거래 대금 | string | Y | 1 |  |
| `NABT_ENTM_NTBY_QTY` | 비차익 위탁 순매수 수량 | string | Y | 1 |  |
| `NABT_ENTM_NTBY_TR_PBMN` | 비차익 위탁 순매수 거래 대금 | string | Y | 1 |  |
| `NABT_ONSL_NTBY_QTY` | 비차익 자기 순매수 수량 | string | Y | 1 |  |
| `NABT_ONSL_NTBY_TR_PBMN` | 비차익 자기 순매수 거래 대금 | string | Y | 1 |  |
| `ACML_VOL` | 누적 거래량 | string | Y | 1 |  |
| `ACML_TR_PBMN` | 누적 거래 대금 | string | Y | 1 |  |

**Request Example:**
```
{      "header": {          "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",          "custtype": "P",          "tr_type": "1",          "content-type": "utf-8"      },      "body": {          "input": {              "tr_id": "H0UPPGM0",              "tr_key": "0001"          }      }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "H0UPPGM0",           "tr_key": "0001",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output  0\|H0UPPGM0\|001\|0001^085913^0^0^0^0^0^0^1^0^0^0^0^0^1^0^10^0^0^0.00^0^0.00^0^  0.00^0^0.00^0^0.00^0^0.00^0^0.00^1^0.00^1^0.00^10^0.00^1^0.00^9^0.00^0^0.00^1^0.00^1^0.00^10^0  .00^1^0.00^9^0.00^0^0.00^0^0.00^0^0.00^0^0.00^0^0.00^0^0.00^0^0.00^1^0.00^1^0.00^10^0.00^1^0.0  0^9^0.00^0^0^0^0^1^9^0^0^0^0
```

---
### 170. 국내주식 실시간회원사 (통합)

| Field | Value |
|---|---|
| Sheet | `국내주식 실시간회원사 (통합)` |
| Menu | [국내주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0UNMBC0` |
| TR_ID (실전) | `H0UNMBC0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | N | 286 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 거래타입 | string | N | 1 | '1 : 등록  2 : 해제' |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0UNMBC0 : 국내주식 주식종목회원사 (통합) |
| `tr_key` | 구분값 | string | Y | 12 | 종목코드 (ex 005930 삼성전자) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `MKSC_SHRN_ISCD` | 유가증권 단축 종목코드 | string | Y | 9 |  |
| `SELN2_MBCR_NAME1` | 매도2 회원사명1 | string | Y | 16 |  |
| `SELN2_MBCR_NAME2` | 매도2 회원사명2 | string | Y | 16 |  |
| `SELN2_MBCR_NAME3` | 매도2 회원사명3 | string | Y | 16 |  |
| `SELN2_MBCR_NAME4` | 매도2 회원사명4 | string | Y | 16 |  |
| `SELN2_MBCR_NAME5` | 매도2 회원사명5 | string | Y | 16 |  |
| `BYOV_MBCR_NAME1` | 매수 회원사명1 | string | Y | 16 |  |
| `BYOV_MBCR_NAME2` | 매수 회원사명2 | string | Y | 16 |  |
| `BYOV_MBCR_NAME3` | 매수 회원사명3 | string | Y | 16 |  |
| `BYOV_MBCR_NAME4` | 매수 회원사명4 | string | Y | 16 |  |
| `BYOV_MBCR_NAME5` | 매수 회원사명5 | string | Y | 16 |  |
| `TOTAL_SELN_QTY1` | 총 매도 수량1 | string | Y | 8 |  |
| `TOTAL_SELN_QTY2` | 총 매도 수량2 | string | Y | 8 |  |
| `TOTAL_SELN_QTY3` | 총 매도 수량3 | string | Y | 8 |  |
| `TOTAL_SELN_QTY4` | 총 매도 수량4 | string | Y | 8 |  |
| `TOTAL_SELN_QTY5` | 총 매도 수량5 | string | Y | 8 |  |
| `TOTAL_SHNU_QTY1` | 총 매수2 수량1 | string | Y | 8 |  |
| `TOTAL_SHNU_QTY2` | 총 매수2 수량2 | string | Y | 8 |  |
| `TOTAL_SHNU_QTY3` | 총 매수2 수량3 | string | Y | 8 |  |
| `TOTAL_SHNU_QTY4` | 총 매수2 수량4 | string | Y | 8 |  |
| `TOTAL_SHNU_QTY5` | 총 매수2 수량5 | string | Y | 8 |  |
| `SELN_MBCR_GLOB_YN_1` | 매도거래원구분1 | string | Y | 1 |  |
| `SELN_MBCR_GLOB_YN_2` | 매도거래원구분2 | string | Y | 1 |  |
| `SELN_MBCR_GLOB_YN_3` | 매도거래원구분3 | string | Y | 1 |  |
| `SELN_MBCR_GLOB_YN_4` | 매도거래원구분4 | string | Y | 1 |  |
| `SELN_MBCR_GLOB_YN_5` | 매도거래원구분5 | string | Y | 1 |  |
| `SHNU_MBCR_GLOB_YN_1` | 매수거래원구분1 | string | Y | 1 |  |
| `SHNU_MBCR_GLOB_YN_2` | 매수거래원구분2 | string | Y | 1 |  |
| `SHNU_MBCR_GLOB_YN_3` | 매수거래원구분3 | string | Y | 1 |  |
| `SHNU_MBCR_GLOB_YN_4` | 매수거래원구분4 | string | Y | 1 |  |
| `SHNU_MBCR_GLOB_YN_5` | 매수거래원구분5 | string | Y | 1 |  |
| `SELN_MBCR_NO1` | 매도거래원코드1 | string | Y | 5 |  |
| `SELN_MBCR_NO2` | 매도거래원코드2 | string | Y | 5 |  |
| `SELN_MBCR_NO3` | 매도거래원코드3 | string | Y | 5 |  |
| `SELN_MBCR_NO4` | 매도거래원코드4 | string | Y | 5 |  |
| `SELN_MBCR_NO5` | 매도거래원코드5 | string | Y | 5 |  |
| `SHNU_MBCR_NO1` | 매수거래원코드1 | string | Y | 5 |  |
| `SHNU_MBCR_NO2` | 매수거래원코드2 | string | Y | 5 |  |
| `SHNU_MBCR_NO3` | 매수거래원코드3 | string | Y | 5 |  |
| `SHNU_MBCR_NO4` | 매수거래원코드4 | string | Y | 5 |  |
| `SHNU_MBCR_NO5` | 매수거래원코드5 | string | Y | 5 |  |
| `SELN_MBCR_RLIM1` | 매도 회원사 비중1 | string | Y | 8 |  |
| `SELN_MBCR_RLIM2` | 매도 회원사 비중2 | string | Y | 8 |  |
| `SELN_MBCR_RLIM3` | 매도 회원사 비중3 | string | Y | 8 |  |
| `SELN_MBCR_RLIM4` | 매도 회원사 비중4 | string | Y | 8 |  |
| `SELN_MBCR_RLIM5` | 매도 회원사 비중5 | string | Y | 8 |  |
| `SHNU_MBCR_RLIM1` | 매수2 회원사 비중1 | string | Y | 8 |  |
| `SHNU_MBCR_RLIM2` | 매수2 회원사 비중2 | string | Y | 8 |  |
| `SHNU_MBCR_RLIM3` | 매수2 회원사 비중3 | string | Y | 8 |  |
| `SHNU_MBCR_RLIM4` | 매수2 회원사 비중4 | string | Y | 8 |  |
| `SHNU_MBCR_RLIM5` | 매수2 회원사 비중5 | string | Y | 8 |  |
| `SELN_QTY_ICDC1` | 매도 수량 증감1 | string | Y | 4 |  |
| `SELN_QTY_ICDC2` | 매도 수량 증감2 | string | Y | 4 |  |
| `SELN_QTY_ICDC3` | 매도 수량 증감3 | string | Y | 4 |  |
| `SELN_QTY_ICDC4` | 매도 수량 증감4 | string | Y | 4 |  |
| `SELN_QTY_ICDC5` | 매도 수량 증감5 | string | Y | 4 |  |
| `SHNU_QTY_ICDC1` | 매수2 수량 증감1 | string | Y | 4 |  |
| `SHNU_QTY_ICDC2` | 매수2 수량 증감2 | string | Y | 4 |  |
| `SHNU_QTY_ICDC3` | 매수2 수량 증감3 | string | Y | 4 |  |
| `SHNU_QTY_ICDC4` | 매수2 수량 증감4 | string | Y | 4 |  |
| `SHNU_QTY_ICDC5` | 매수2 수량 증감5 | string | Y | 4 |  |
| `GLOB_TOTAL_SELN_QTY` | 외국계 총 매도 수량 | string | Y | 8 |  |
| `GLOB_TOTAL_SHNU_QTY` | 외국계 총 매수2 수량 | string | Y | 8 |  |
| `GLOB_TOTAL_SELN_QTY_ICDC` | 외국계 총 매도 수량 증감 | string | Y | 4 |  |
| `GLOB_TOTAL_SHNU_QTY_ICDC` | 외국계 총 매수2 수량 증감 | string | Y | 4 |  |
| `GLOB_NTBY_QTY` | 외국계 순매수 수량 | string | Y | 8 |  |
| `GLOB_SELN_RLIM` | 외국계 매도 비중 | string | Y | 8 |  |
| `GLOB_SHNU_RLIM` | 외국계 매수2 비중 | string | Y | 8 |  |
| `SELN2_MBCR_ENG_NAME1` | 매도2 영문회원사명1 | string | Y | 20 |  |
| `SELN2_MBCR_ENG_NAME2` | 매도2 영문회원사명2 | string | Y | 20 |  |
| `SELN2_MBCR_ENG_NAME3` | 매도2 영문회원사명3 | string | Y | 20 |  |
| `SELN2_MBCR_ENG_NAME4` | 매도2 영문회원사명4 | string | Y | 20 |  |
| `SELN2_MBCR_ENG_NAME5` | 매도2 영문회원사명5 | string | Y | 20 |  |
| `BYOV_MBCR_ENG_NAME1` | 매수 영문회원사명1 | string | Y | 20 |  |
| `BYOV_MBCR_ENG_NAME2` | 매수 영문회원사명2 | string | Y | 20 |  |
| `BYOV_MBCR_ENG_NAME3` | 매수 영문회원사명3 | string | Y | 20 |  |
| `BYOV_MBCR_ENG_NAME4` | 매수 영문회원사명4 | string | Y | 20 |  |
| `BYOV_MBCR_ENG_NAME5` | 매수 영문회원사명5 | string | Y | 20 |  |

---
### 171. 국내지수 실시간체결

| Field | Value |
|---|---|
| Sheet | `국내지수 실시간체결` |
| Menu | [국내주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0UPCNT0` |
| TR_ID (실전) | `H0UPCNT0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | "1: 등록, 2:해제" |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 7 | H0UPCNT0 |
| `tr_key` | 종목코드 | string | Y | 6 | 업종구분코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `bstp_cls_code` | 업종 구분 코드 | object | Y | 4 | '각 항목사이에는 구분자로 ^ 사용,  모든 데이터타입은 String으로 변환되어 push 처리됨' |
| `bsop_hour` | 영업 시간 | string | Y | 6 |  |
| `prpr_nmix` | 현재가 지수 | string | Y | 1 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `bstp_nmix_prdy_vrss` | 업종 지수 전일 대비 | string | Y | 1 |  |
| `acml_vol` | 누적 거래량 | string | Y | 1 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 1 |  |
| `pcas_vol` | 건별 거래량 | string | Y | 1 |  |
| `pcas_tr_pbmn` | 건별 거래 대금 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 1 |  |
| `oprc_nmix` | 시가 지수 | string | Y | 1 |  |
| `nmix_hgpr` | 지수 최고가 | string | Y | 1 |  |
| `nmix_lwpr` | 지수 최저가 | string | Y | 1 |  |
| `oprc_vrss_nmix_prpr` | 시가 대비 지수 현재가 | string | Y | 1 |  |
| `oprc_vrss_nmix_sign` | 시가 대비 지수 부호 | string | Y | 1 |  |
| `hgpr_vrss_nmix_prpr` | 최고가 대비 지수 현재가 | string | Y | 1 |  |
| `hgpr_vrss_nmix_sign` | 최고가 대비 지수 부호 | string | Y | 1 |  |
| `lwpr_vrss_nmix_prpr` | 최저가 대비 지수 현재가 | string | Y | 1 |  |
| `lwpr_vrss_nmix_sign` | 최저가 대비 지수 부호 | string | Y | 1 |  |
| `prdy_clpr_vrss_oprc_rate` | 전일 종가 대비 시가2 비율 | string | Y | 1 |  |
| `prdy_clpr_vrss_hgpr_rate` | 전일 종가 대비 최고가 비율 | string | Y | 1 |  |
| `prdy_clpr_vrss_lwpr_rate` | 전일 종가 대비 최저가 비율 | string | Y | 1 |  |
| `uplm_issu_cnt` | 상한 종목 수 | string | Y | 1 |  |
| `ascn_issu_cnt` | 상승 종목 수 | string | Y | 1 |  |
| `stnr_issu_cnt` | 보합 종목 수 | string | Y | 1 |  |
| `down_issu_cnt` | 하락 종목 수 | string | Y | 1 |  |
| `lslm_issu_cnt` | 하한 종목 수 | string | Y | 1 |  |
| `qtqt_ascn_issu_cnt` | 기세 상승 종목수 | string | Y | 1 |  |
| `qtqt_down_issu_cnt` | 기세 하락 종목수 | string | Y | 1 |  |
| `tick_vrss` | TICK대비 | string | Y | 1 |  |

**Request Example:**
```
{      "header": {          "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",          "custtype": "P",          "tr_type": "1",          "content-type": "utf-8"      },      "body": {          "input": {              "tr_id": "H0UPCNT0",              "tr_key": "0001"          }      }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "H0UPCNT0",           "tr_key": "0001",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output  0\|H0UPCNT0\|001\|0001^091240^2624.54^2^32.68^63952^1650684^439^10335^1.26^2615  .72^2624.82^2610.00^23.86^2^32.96^2^18.14^2^0.92^1.27^0.70^0^670^72^177^0^0^0^19
```

---
### 172. 국내주식 실시간예상체결 (KRX)

| Field | Value |
|---|---|
| Sheet | `국내주식 실시간예상체결 (KRX)` |
| Menu | [국내주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0STANC0` |
| TR_ID (실전) | `H0STANC0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | 1: 등록, 2:해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0STANC0 |
| `tr_key` | 구분값 | string | Y | 12 | 종목코드 (ex 005930 삼성전자) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `MKSC_SHRN_ISCD` | 유가증권단축종목코드 | string | Y | 9 |  |
| `STCK_CNTG_HOUR` | 주식체결시간 | string | Y | 6 |  |
| `STCK_PRPR` | 주식현재가 | string | Y | 4 |  |
| `PRDY_VRSS_SIGN` | 전일대비구분 | string | Y | 1 |  |
| `PRDY_VRSS` | 전일대비 | string | Y | 4 |  |
| `PRDY_CTRT` | 등락율 | string | Y | 8 |  |
| `WGHN_AVRG_STCK_PRC` | 가중평균주식가격 | string | Y | 8 |  |
| `STCK_OPRC` | 시가 | string | Y | 4 |  |
| `STCK_HGPR` | 고가 | string | Y | 4 |  |
| `STCK_LWPR` | 저가 | string | Y | 4 |  |
| `ASKP1` | 매도호가 | string | Y | 4 |  |
| `BIDP1` | 매수호가 | string | Y | 4 |  |
| `CNTG_VOL` | 거래량 | string | Y | 8 |  |
| `ACML_VOL` | 누적거래량 | string | Y | 8 |  |
| `ACML_TR_PBMN` | 누적거래대금 | string | Y | 8 |  |
| `SELN_CNTG_CSNU` | 매도체결건수 | string | Y | 4 |  |
| `SHNU_CNTG_CSNU` | 매수체결건수 | string | Y | 4 |  |
| `NTBY_CNTG_CSNU` | 순매수체결건수 | string | Y | 4 |  |
| `CTTR` | 체결강도 | string | Y | 8 |  |
| `SELN_CNTG_SMTN` | 총매도수량 | string | Y | 8 |  |
| `SHNU_CNTG_SMTN` | 총매수수량 | string | Y | 8 |  |
| `CNTG_CLS_CODE` | 체결구분 | string | Y | 1 |  |
| `SHNU_RATE` | 매수비율 | string | Y | 8 |  |
| `PRDY_VOL_VRSS_ACML_VOL_RATE` | 전일거래량대비등락율 | string | Y | 8 |  |
| `OPRC_HOUR` | 시가시간 | string | Y | 6 |  |
| `OPRC_VRSS_PRPR_SIGN` | 시가대비구분 | string | Y | 1 |  |
| `OPRC_VRSS_PRPR` | 시가대비 | string | Y | 4 |  |
| `HGPR_HOUR` | 최고가시간 | string | Y | 6 |  |
| `HGPR_VRSS_PRPR_SIGN` | 고가대비구분 | string | Y | 1 |  |
| `HGPR_VRSS_PRPR` | 고가대비 | string | Y | 4 |  |
| `LWPR_HOUR` | 최저가시간 | string | Y | 6 |  |
| `LWPR_VRSS_PRPR_SIGN` | 저가대비구분 | string | Y | 1 |  |
| `LWPR_VRSS_PRPR` | 저가대비 | string | Y | 4 |  |
| `BSOP_DATE` | 영업일자 | string | Y | 8 |  |
| `NEW_MKOP_CLS_CODE` | 신장운영구분코드 | string | Y | 2 |  |
| `TRHT_YN` | 거래정지여부 | string | Y | 1 |  |
| `ASKP_RSQN1` | 매도호가잔량1 | string | Y | 8 |  |
| `BIDP_RSQN1` | 매수호가잔량1 | string | Y | 8 |  |
| `TOTAL_ASKP_RSQN` | 총매도호가잔량 | string | Y | 8 |  |
| `TOTAL_BIDP_RSQN` | 총매수호가잔량 | string | Y | 8 |  |
| `VOL_TNRT` | 거래량회전율 | string | Y | 8 |  |
| `PRDY_SMNS_HOUR_ACML_VOL` | 전일동시간누적거래량 | string | Y | 8 |  |
| `PRDY_SMNS_HOUR_ACML_VOL_RATE` | 전일동시간누적거래량비율 | string | Y | 8 |  |
| `HOUR_CLS_CODE` | 시간구분코드 | string | Y | 1 |  |
| `MRKT_TRTM_CLS_CODE` | 임의종료구분코드 | string | Y | 1 |  |

**Request Example:**
```
{           "header":           {                    "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",                    "custtype":"P",                    "tr_type":"1",                    "content-type":"utf-8"           },           "body":           {                    "input":                    {                             "tr_id":"H0STANC0",                             "tr_key":"005930"                    }           }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "H0STANC0",           "tr_key": "005930",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output  0\|H0STANC0\|001\|005930^084945^77600^2^1300^1.70^0.00^0^0^0^77600^77  500^64^221986^17226113600^0^0^0^0.00^0^0^1^0.01^0.00^000000^3^0^000000^3^0^000000^3^  0^20240426^00^N^11591^2878^41034^6265^0.00^0^0.00^B^
```

---
### 173. ELW 실시간호가

| Field | Value |
|---|---|
| Sheet | `ELW 실시간호가` |
| Menu | [국내주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0EWASP0` |
| TR_ID (실전) | `H0EWASP0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | 1: 등록, 2:해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0EWASP0 |
| `tr_key` | 구분값 | string | Y | 12 | ELW 종목코드(ex. 57LA24) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `MKSC_SHRN_ISCD` | 유가증권단축종목코드 | string | Y | 9 |  |
| `BSOP_HOUR` | 영업시간 | string | Y | 6 |  |
| `HOUR_CLS_CODE` | 시간구분코드 | string | Y | 1 |  |
| `ASKP1` | 매도호가1 | string | Y | 1 |  |
| `ASKP2` | 매도호가2 | string | Y | 1 |  |
| `ASKP3` | 매도호가3 | string | Y | 1 |  |
| `ASKP4` | 매도호가4 | string | Y | 1 |  |
| `ASKP5` | 매도호가5 | string | Y | 1 |  |
| `ASKP6` | 매도호가6 | string | Y | 1 |  |
| `ASKP7` | 매도호가7 | string | Y | 1 |  |
| `ASKP8` | 매도호가8 | string | Y | 1 |  |
| `ASKP9` | 매도호가9 | string | Y | 1 |  |
| `ASKP10` | 매도호가10 | string | Y | 1 |  |
| `BIDP1` | 매수호가1 | string | Y | 1 |  |
| `BIDP2` | 매수호가2 | string | Y | 1 |  |
| `BIDP3` | 매수호가3 | string | Y | 1 |  |
| `BIDP4` | 매수호가4 | string | Y | 1 |  |
| `BIDP5` | 매수호가5 | string | Y | 1 |  |
| `BIDP6` | 매수호가6 | string | Y | 1 |  |
| `BIDP7` | 매수호가7 | string | Y | 1 |  |
| `BIDP8` | 매수호가8 | string | Y | 1 |  |
| `BIDP9` | 매수호가9 | string | Y | 1 |  |
| `BIDP10` | 매수호가10 | string | Y | 1 |  |
| `ASKP_RSQN1` | 매도호가잔량1 | string | Y | 1 |  |
| `ASKP_RSQN2` | 매도호가잔량2 | string | Y | 1 |  |
| `ASKP_RSQN3` | 매도호가잔량3 | string | Y | 1 |  |
| `ASKP_RSQN4` | 매도호가잔량4 | string | Y | 1 |  |
| `ASKP_RSQN5` | 매도호가잔량5 | string | Y | 1 |  |
| `ASKP_RSQN6` | 매도호가잔량6 | string | Y | 1 |  |
| `ASKP_RSQN7` | 매도호가잔량7 | string | Y | 1 |  |
| `ASKP_RSQN8` | 매도호가잔량8 | string | Y | 1 |  |
| `ASKP_RSQN9` | 매도호가잔량9 | string | Y | 1 |  |
| `ASKP_RSQN10` | 매도호가잔량10 | string | Y | 1 |  |
| `BIDP_RSQN1` | 매수호가잔량1 | string | Y | 1 |  |
| `BIDP_RSQN2` | 매수호가잔량2 | string | Y | 1 |  |
| `BIDP_RSQN3` | 매수호가잔량3 | string | Y | 1 |  |
| `BIDP_RSQN4` | 매수호가잔량4 | string | Y | 1 |  |
| `BIDP_RSQN5` | 매수호가잔량5 | string | Y | 1 |  |
| `BIDP_RSQN6` | 매수호가잔량6 | string | Y | 1 |  |
| `BIDP_RSQN7` | 매수호가잔량7 | string | Y | 1 |  |
| `BIDP_RSQN8` | 매수호가잔량8 | string | Y | 1 |  |
| `BIDP_RSQN9` | 매수호가잔량9 | string | Y | 1 |  |
| `BIDP_RSQN10` | 매수호가잔량10 | string | Y | 1 |  |
| `TOTAL_ASKP_RSQN` | 총매도호가잔량 | string | Y | 1 |  |
| `TOTAL_BIDP_RSQN` | 총매수호가잔량 | string | Y | 1 |  |
| `ANTC_CNPR` | 예상체결가 | string | Y | 1 |  |
| `ANTC_CNQN` | 예상체결량 | string | Y | 1 |  |
| `ANTC_CNTG_VRSS_SIGN` | 예상체결대비부호 | string | Y | 1 |  |
| `ANTC_CNTG_VRSS` | 예상체결대비 | string | Y | 1 |  |
| `ANTC_CNTG_PRDY_CTRT` | 예상체결전일대비율 | string | Y | 1 |  |
| `LP_ASKP_RSQN1` | LP매도호가잔량1 | string | Y | 1 |  |
| `LP_ASKP_RSQN2` | LP매도호가잔량2 | string | Y | 1 |  |
| `LP_ASKP_RSQN3` | LP매도호가잔량3 | string | Y | 1 |  |
| `LP_BIDP_RSQN4` | LP매수호가잔량4 | string | Y | 1 |  |
| `LP_ASKP_RSQN4` | LP매도호가잔량4 | string | Y | 1 |  |
| `LP_BIDP_RSQN5` | LP매수호가잔량5 | string | Y | 1 |  |
| `LP_ASKP_RSQN5` | LP매도호가잔량5 | string | Y | 1 |  |
| `LP_BIDP_RSQN6` | LP매수호가잔량6 | string | Y | 1 |  |
| `LP_ASKP_RSQN6` | LP매도호가잔량6 | string | Y | 1 |  |
| `LP_BIDP_RSQN7` | LP매수호가잔량7 | string | Y | 1 |  |
| `LP_ASKP_RSQN7` | LP매도호가잔량7 | string | Y | 1 |  |
| `LP_ASKP_RSQN8` | LP매도호가잔량8 | string | Y | 1 |  |
| `LP_BIDP_RSQN8` | LP매수호가잔량8 | string | Y | 1 |  |
| `LP_ASKP_RSQN9` | LP매도호가잔량9 | string | Y | 1 |  |
| `LP_BIDP_RSQN9` | LP매수호가잔량9 | string | Y | 1 |  |
| `LP_ASKP_RSQN10` | LP매도호가잔량10 | string | Y | 1 |  |
| `LP_BIDP_RSQN10` | LP매수호가잔량10 | string | Y | 1 |  |
| `LP_BIDP_RSQN1` | LP매수호가잔량1 | string | Y | 1 |  |
| `LP_TOTAL_ASKP_RSQN` | LP총매도호가잔량 | string | Y | 1 |  |
| `LP_BIDP_RSQN2` | LP매수호가잔량2 | string | Y | 1 |  |
| `LP_TOTAL_BIDP_RSQN` | LP총매수호가잔량 | string | Y | 1 |  |
| `LP_BIDP_RSQN3` | LP매수호가잔량3 | string | Y | 1 |  |
| `ANTC_VOL` | 예상거래량 | string | Y | 1 |  |

**Request Example:**
```
{           "header":           {                    "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",                    "custtype":"P",                    "tr_type":"1",                    "content-type":"utf-8"           },           "body":           {                    "input":                    {                             "tr_id":"H0EWASP0",                             "tr_key":"57JN53"                    }           }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "H0EWASP0",           "tr_key": "57JN53",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output  0\|H0EWASP0\|001\|57JN53^090333^0^270^275^280^285^290^295^300^305^310  ^315^265^260^255^250^245^240^235^230^225^220^132730^144770^53560^139510^104910^16386  0^111580^41530^66600^41040^119950^176460^142150^218620^148250^160210^154250^141660^1  40270^160640^1000090^1562460^0^0^3^0^0.00^0^0^0^0^0^0^0^0^0^0^0^0^0^0^0^0^0^0^0^0^0^  0^0
```

---
### 174. 국내주식 실시간호가 (KRX)

| Field | Value |
|---|---|
| Sheet | `국내주식 실시간호가 (KRX)` |
| Menu | [국내주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0STASP0` |
| TR_ID (실전) | `H0STASP0` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 286 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 거래타입 | string | Y | 1 | 1 : 등록  2 : 해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 1 | [실전/모의투자]  H0STASP0 : 주식호가 |
| `tr_key` | 구분값 | string | Y | 1 | 종목번호 (6자리)  ETN의 경우, Q로 시작 (EX. Q500001) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `MKSC_SHRN_ISCD` | 유가증권 단축 종목코드 | string | Y | 9 |  |
| `BSOP_HOUR` | 영업 시간 | string | Y | 6 |  |
| `HOUR_CLS_CODE` | 시간 구분 코드 | string | Y | 1 | 0 : 장중  A : 장후예상  B : 장전예상  C : 9시이후의 예상가, VI발동  D : 시간외 단일가 예상 |
| `ASKP1` | 매도호가1 | number | Y | 4 |  |
| `ASKP2` | 매도호가2 | number | Y | 4 |  |
| `ASKP3` | 매도호가3 | number | Y | 4 |  |
| `ASKP4` | 매도호가4 | number | Y | 4 |  |
| `ASKP5` | 매도호가5 | number | Y | 4 |  |
| `ASKP6` | 매도호가6 | number | Y | 4 |  |
| `ASKP7` | 매도호가7 | number | Y | 4 |  |
| `ASKP8` | 매도호가8 | number | Y | 4 |  |
| `ASKP9` | 매도호가9 | number | Y | 4 |  |
| `ASKP10` | 매도호가10 | number | Y | 4 |  |
| `BIDP1` | 매수호가1 | number | Y | 4 |  |
| `BIDP2` | 매수호가2 | number | Y | 4 |  |
| `BIDP3` | 매수호가3 | number | Y | 4 |  |
| `BIDP4` | 매수호가4 | number | Y | 4 |  |
| `BIDP5` | 매수호가5 | number | Y | 4 |  |
| `BIDP6` | 매수호가6 | number | Y | 4 |  |
| `BIDP7` | 매수호가7 | number | Y | 4 |  |
| `BIDP8` | 매수호가8 | number | Y | 4 |  |
| `BIDP9` | 매수호가9 | number | Y | 4 |  |
| `BIDP10` | 매수호가10 | number | Y | 4 |  |
| `ASKP_RSQN1` | 매도호가 잔량1 | number | Y | 8 |  |
| `ASKP_RSQN2` | 매도호가 잔량2 | number | Y | 8 |  |
| `ASKP_RSQN3` | 매도호가 잔량3 | number | Y | 8 |  |
| `ASKP_RSQN4` | 매도호가 잔량4 | number | Y | 8 |  |
| `ASKP_RSQN5` | 매도호가 잔량5 | number | Y | 8 |  |
| `ASKP_RSQN6` | 매도호가 잔량6 | number | Y | 8 |  |
| `ASKP_RSQN7` | 매도호가 잔량7 | number | Y | 8 |  |
| `ASKP_RSQN8` | 매도호가 잔량8 | number | Y | 8 |  |
| `ASKP_RSQN9` | 매도호가 잔량9 | number | Y | 8 |  |
| `ASKP_RSQN10` | 매도호가 잔량10 | number | Y | 8 |  |
| `BIDP_RSQN1` | 매수호가 잔량1 | number | Y | 8 |  |
| `BIDP_RSQN2` | 매수호가 잔량2 | number | Y | 8 |  |
| `BIDP_RSQN3` | 매수호가 잔량3 | number | Y | 8 |  |
| `BIDP_RSQN4` | 매수호가 잔량4 | number | Y | 8 |  |
| `BIDP_RSQN5` | 매수호가 잔량5 | number | Y | 8 |  |
| `BIDP_RSQN6` | 매수호가 잔량6 | number | Y | 8 |  |
| `BIDP_RSQN7` | 매수호가 잔량7 | number | Y | 8 |  |
| `BIDP_RSQN8` | 매수호가 잔량8 | number | Y | 8 |  |
| `BIDP_RSQN9` | 매수호가 잔량9 | number | Y | 8 |  |
| `BIDP_RSQN10` | 매수호가 잔량10 | number | Y | 8 |  |
| `TOTAL_ASKP_RSQN` | 총 매도호가 잔량 | number | Y | 8 |  |
| `TOTAL_BIDP_RSQN` | 총 매수호가 잔량 | number | Y | 8 |  |
| `OVTM_TOTAL_ASKP_RSQN` | 시간외 총 매도호가 잔량 | number | Y | 8 |  |
| `OVTM_TOTAL_BIDP_RSQN` | 시간외 총 매수호가 잔량 | number | Y | 8 |  |
| `ANTC_CNPR` | 예상 체결가 | number | Y | 4 | 동시호가 등 특정 조건하에서만 발생 |
| `ANTC_CNQN` | 예상 체결량 | number | Y | 8 | 동시호가 등 특정 조건하에서만 발생 |
| `ANTC_VOL` | 예상 거래량 | number | Y | 8 | 동시호가 등 특정 조건하에서만 발생 |
| `ANTC_CNTG_VRSS` | 예상 체결 대비 | number | Y | 4 | 동시호가 등 특정 조건하에서만 발생 |
| `ANTC_CNTG_VRSS_SIGN` | 예상 체결 대비 부호 | string | Y | 1 | 동시호가 등 특정 조건하에서만 발생    1 : 상한  2 : 상승  3 : 보합  4 : 하한  5 : 하락 |
| `ANTC_CNTG_PRDY_CTRT` | 예상 체결 전일 대비율 | number | Y | 8 |  |
| `ACML_VOL` | 누적 거래량 | number | Y | 8 |  |
| `TOTAL_ASKP_RSQN_ICDC` | 총 매도호가 잔량 증감 | number | Y | 4 |  |
| `TOTAL_BIDP_RSQN_ICDC` | 총 매수호가 잔량 증감 | number | Y | 4 |  |
| `OVTM_TOTAL_ASKP_ICDC` | 시간외 총 매도호가 증감 | number | Y | 4 |  |
| `OVTM_TOTAL_BIDP_ICDC` | 시간외 총 매수호가 증감 | number | Y | 4 |  |
| `STCK_DEAL_CLS_CODE` | 주식 매매 구분 코드 | string | Y | 2 | 사용 X (삭제된 값) |

**Request Example:**
```
{           "header":           {                    "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",                    "custtype":"P",                    "tr_type":"1",                    "content-type":"utf-8"           },           "body":           {                    "input":                    {                             "tr_id":"H0STASP0",                             "tr_key":"005930"                    }           }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "H0STASP0",           "tr_key": "005930",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output  005930^093730^0^71900^72000^72100^72200^72300^72400^72500^72600^72700^72800^71  800^71700^71600^71500^71400^71300^71200^71100^71000^70900^91918^117942^92673^7  9708^106729^141988^176192^113906^134077^104229^95221^159371^220746^284657^2127  42^195370^182710^209747^376432^158171^1159362^2095167^0^0^0^0^525579^-72000^5^  -100.00^3159115^0^8^0^0^0
```

---
### 175. 국내주식 실시간체결가 (통합)

| Field | Value |
|---|---|
| Sheet | `국내주식 실시간체결가 (통합)` |
| Menu | [국내주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0UNCNT0` |
| TR_ID (실전) | `H0UNCNT0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | N | 286 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 거래타입 | string | N | 1 | 1 : 등록 2 : 해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0UNCNT0 : 실시간 주식 체결가 통합 |
| `tr_key` | 구분값 | string | Y | 12 | 종목코드 (ex 005930 삼성전자) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `MKSC_SHRN_ISCD` | 유가증권 단축 종목코드 | string | Y | 9 |  |
| `STCK_CNTG_HOUR` | 주식 체결 시간 | string | Y | 6 |  |
| `STCK_PRPR` | 주식 현재가 | string | Y | 4 |  |
| `PRDY_VRSS_SIGN` | 전일 대비 부호 | string | Y | 1 |  |
| `PRDY_VRSS` | 전일 대비 | string | Y | 4 |  |
| `PRDY_CTRT` | 전일 대비율 | string | Y | 8 |  |
| `WGHN_AVRG_STCK_PRC` | 가중 평균 주식 가격 | string | Y | 8 |  |
| `STCK_OPRC` | 주식 시가 | string | Y | 4 |  |
| `STCK_HGPR` | 주식 최고가 | string | Y | 4 |  |
| `STCK_LWPR` | 주식 최저가 | string | Y | 4 |  |
| `ASKP1` | 매도호가1 | string | Y | 4 |  |
| `BIDP1` | 매수호가1 | string | Y | 4 |  |
| `CNTG_VOL` | 체결 거래량 | string | Y | 8 |  |
| `ACML_VOL` | 누적 거래량 | string | Y | 8 |  |
| `ACML_TR_PBMN` | 누적 거래 대금 | string | Y | 8 |  |
| `SELN_CNTG_CSNU` | 매도 체결 건수 | string | Y | 4 |  |
| `SHNU_CNTG_CSNU` | 매수 체결 건수 | string | Y | 4 |  |
| `NTBY_CNTG_CSNU` | 순매수 체결 건수 | string | Y | 4 |  |
| `CTTR` | 체결강도 | string | Y | 8 |  |
| `SELN_CNTG_SMTN` | 총 매도 수량 | string | Y | 8 |  |
| `SHNU_CNTG_SMTN` | 총 매수 수량 | string | Y | 8 |  |
| `CNTG_CLS_CODE` | 체결구분 | string | Y | 1 |  |
| `SHNU_RATE` | 매수비율 | string | Y | 8 |  |
| `PRDY_VOL_VRSS_ACML_VOL_RATE` | 전일 거래량 대비 등락율 | string | Y | 8 |  |
| `OPRC_HOUR` | 시가 시간 | string | Y | 6 |  |
| `OPRC_VRSS_PRPR_SIGN` | 시가대비구분 | string | Y | 1 |  |
| `OPRC_VRSS_PRPR` | 시가대비 | string | Y | 4 |  |
| `HGPR_HOUR` | 최고가 시간 | string | Y | 6 |  |
| `HGPR_VRSS_PRPR_SIGN` | 고가대비구분 | string | Y | 1 |  |
| `HGPR_VRSS_PRPR` | 고가대비 | string | Y | 4 |  |
| `LWPR_HOUR` | 최저가 시간 | string | Y | 6 |  |
| `LWPR_VRSS_PRPR_SIGN` | 저가대비구분 | string | Y | 1 |  |
| `LWPR_VRSS_PRPR` | 저가대비 | string | Y | 4 |  |
| `BSOP_DATE` | 영업 일자 | string | Y | 8 |  |
| `NEW_MKOP_CLS_CODE` | 신 장운영 구분 코드 | string | Y | 2 |  |
| `TRHT_YN` | 거래정지 여부 | string | Y | 1 |  |
| `ASKP_RSQN1` | 매도호가 잔량1 | string | Y | 8 |  |
| `BIDP_RSQN1` | 매수호가 잔량1 | string | Y | 8 |  |
| `TOTAL_ASKP_RSQN` | 총 매도호가 잔량 | string | Y | 8 |  |
| `TOTAL_BIDP_RSQN` | 총 매수호가 잔량 | string | Y | 8 |  |
| `VOL_TNRT` | 거래량 회전율 | string | Y | 8 |  |
| `PRDY_SMNS_HOUR_ACML_VOL` | 전일 동시간 누적 거래량 | string | Y | 8 |  |
| `PRDY_SMNS_HOUR_ACML_VOL_RATE` | 전일 동시간 누적 거래량 비율 | string | Y | 8 |  |
| `HOUR_CLS_CODE` | 시간 구분 코드 | string | Y | 1 |  |
| `MRKT_TRTM_CLS_CODE` | 임의종료구분코드 | string | Y | 1 |  |
| `VI_STND_PRC` | 정적VI발동기준가 | string | Y | 4 |  |

---
### 176. 국내주식 실시간호가 (NXT)

| Field | Value |
|---|---|
| Sheet | `국내주식 실시간호가 (NXT)` |
| Menu | [국내주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0NXASP0` |
| TR_ID (실전) | `H0NXASP0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | N | 286 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 거래타입 | string | N | 1 | '1 : 등록  2 : 해제' |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0NXASP0 : 실시간 주식 호가 (NXT) |
| `tr_key` | 구분값 | string | Y | 12 | 종목코드 (ex 005930 삼성전자) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `MKSC_SHRN_ISCD` | 유가증권 단축 종목코드 | string | Y | 9 |  |
| `BSOP_HOUR` | 영업 시간 | string | Y | 6 |  |
| `HOUR_CLS_CODE` | 시간 구분 코드 | string | Y | 1 |  |
| `ASKP1` | 매도호가1 | string | Y | 4 |  |
| `ASKP2` | 매도호가2 | string | Y | 4 |  |
| `ASKP3` | 매도호가3 | string | Y | 4 |  |
| `ASKP4` | 매도호가4 | string | Y | 4 |  |
| `ASKP5` | 매도호가5 | string | Y | 4 |  |
| `ASKP6` | 매도호가6 | string | Y | 4 |  |
| `ASKP7` | 매도호가7 | string | Y | 4 |  |
| `ASKP8` | 매도호가8 | string | Y | 4 |  |
| `ASKP9` | 매도호가9 | string | Y | 4 |  |
| `ASKP10` | 매도호가10 | string | Y | 4 |  |
| `BIDP1` | 매수호가1 | string | Y | 4 |  |
| `BIDP2` | 매수호가2 | string | Y | 4 |  |
| `BIDP3` | 매수호가3 | string | Y | 4 |  |
| `BIDP4` | 매수호가4 | string | Y | 4 |  |
| `BIDP5` | 매수호가5 | string | Y | 4 |  |
| `BIDP6` | 매수호가6 | string | Y | 4 |  |
| `BIDP7` | 매수호가7 | string | Y | 4 |  |
| `BIDP8` | 매수호가8 | string | Y | 4 |  |
| `BIDP9` | 매수호가9 | string | Y | 4 |  |
| `BIDP10` | 매수호가10 | string | Y | 4 |  |
| `ASKP_RSQN1` | 매도호가 잔량1 | string | Y | 8 |  |
| `ASKP_RSQN2` | 매도호가 잔량2 | string | Y | 8 |  |
| `ASKP_RSQN3` | 매도호가 잔량3 | string | Y | 8 |  |
| `ASKP_RSQN4` | 매도호가 잔량4 | string | Y | 8 |  |
| `ASKP_RSQN5` | 매도호가 잔량5 | string | Y | 8 |  |
| `ASKP_RSQN6` | 매도호가 잔량6 | string | Y | 8 |  |
| `ASKP_RSQN7` | 매도호가 잔량7 | string | Y | 8 |  |
| `ASKP_RSQN8` | 매도호가 잔량8 | string | Y | 8 |  |
| `ASKP_RSQN9` | 매도호가 잔량9 | string | Y | 8 |  |
| `ASKP_RSQN10` | 매도호가 잔량10 | string | Y | 8 |  |
| `BIDP_RSQN1` | 매수호가 잔량1 | string | Y | 8 |  |
| `BIDP_RSQN2` | 매수호가 잔량2 | string | Y | 8 |  |
| `BIDP_RSQN3` | 매수호가 잔량3 | string | Y | 8 |  |
| `BIDP_RSQN4` | 매수호가 잔량4 | string | Y | 8 |  |
| `BIDP_RSQN5` | 매수호가 잔량5 | string | Y | 8 |  |
| `BIDP_RSQN6` | 매수호가 잔량6 | string | Y | 8 |  |
| `BIDP_RSQN7` | 매수호가 잔량7 | string | Y | 8 |  |
| `BIDP_RSQN8` | 매수호가 잔량8 | string | Y | 8 |  |
| `BIDP_RSQN9` | 매수호가 잔량9 | string | Y | 8 |  |
| `BIDP_RSQN10` | 매수호가 잔량10 | string | Y | 8 |  |
| `TOTAL_ASKP_RSQN` | 총 매도호가 잔량 | string | Y | 8 |  |
| `TOTAL_BIDP_RSQN` | 총 매수호가 잔량 | string | Y | 8 |  |
| `OVTM_TOTAL_ASKP_RSQN` | 시간외 총 매도호가 잔량 | string | Y | 8 |  |
| `OVTM_TOTAL_BIDP_RSQN` | 시간외 총 매수호가 잔량 | string | Y | 8 |  |
| `ANTC_CNPR` | 예상 체결가 | string | Y | 4 |  |
| `ANTC_CNQN` | 예상 체결량 | string | Y | 8 |  |
| `ANTC_VOL` | 예상 거래량 | string | Y | 8 |  |
| `ANTC_CNTG_VRSS` | 예상 체결 대비 | string | Y | 4 |  |
| `ANTC_CNTG_VRSS_SIGN` | 예상 체결 대비 부호 | string | Y | 1 |  |
| `ANTC_CNTG_PRDY_CTRT` | 예상 체결 전일 대비율 | string | Y | 8 |  |
| `ACML_VOL` | 누적 거래량 | string | Y | 8 |  |
| `TOTAL_ASKP_RSQN_ICDC` | 총 매도호가 잔량 증감 | string | Y | 4 |  |
| `TOTAL_BIDP_RSQN_ICDC` | 총 매수호가 잔량 증감 | string | Y | 4 |  |
| `OVTM_TOTAL_ASKP_ICDC` | 시간외 총 매도호가 증감 | string | Y | 4 |  |
| `OVTM_TOTAL_BIDP_ICDC` | 시간외 총 매수호가 증감 | string | Y | 4 |  |
| `STCK_DEAL_CLS_CODE` | 주식 매매 구분 코드 | string | Y | 2 |  |
| `KMID_PRC` | KRX 중간가 | string | Y | 4 |  |
| `KMID_TOTAL_RSQN` | KRX 중간가잔량합계수량 | string | Y | 8 |  |
| `KMID_CLS_CODE` | KRX 중간가 매수매도 구분 | string | Y | 1 |  |
| `NMID_PRC` | NXT 중간가 | string | Y | 4 |  |
| `NMID_TOTAL_RSQN` | NXT 중간가잔량합계수량 | string | Y | 8 |  |
| `NMID_CLS_CODE` | NXT 중간가 매수매도 구분 | string | Y | 1 |  |

---
### 177. 국내주식 실시간프로그램매매 (NXT)

| Field | Value |
|---|---|
| Sheet | `국내주식 실시간프로그램매매 (NXT)` |
| Menu | [국내주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0NXPGM0` |
| TR_ID (실전) | `H0NXPGM0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | N | 286 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 거래타입 | string | N | 1 | '1 : 등록  2 : 해제' |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0NXPGM0 : 실시간 주식프로그램매매 (NXT) |
| `tr_key` | 구분값 | string | Y | 12 | 종목코드 (ex 005930 삼성전자) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `MKSC_SHRN_ISCD` | 유가증권 단축 종목코드 | string | Y | 9 |  |
| `STCK_CNTG_HOUR` | 주식 체결 시간 | string | Y | 6 |  |
| `SELN_CNQN` | 매도 체결량 | string | Y | 8 |  |
| `SELN_TR_PBMN` | 매도 거래 대금 | string | Y | 8 |  |
| `SHNU_CNQN` | 매수2 체결량 | string | Y | 8 |  |
| `SHNU_TR_PBMN` | 매수2 거래 대금 | string | Y | 8 |  |
| `NTBY_CNQN` | 순매수 체결량 | string | Y | 8 |  |
| `NTBY_TR_PBMN` | 순매수 거래 대금 | string | Y | 8 |  |
| `SELN_RSQN` | 매도호가잔량 | string | Y | 8 |  |
| `SHNU_RSQN` | 매수호가잔량 | string | Y | 8 |  |
| `WHOL_NTBY_QTY` | 전체순매수호가잔량 | string | Y | 8 |  |

---
### 178. 국내주식 실시간체결가 (NXT)

| Field | Value |
|---|---|
| Sheet | `국내주식 실시간체결가 (NXT)` |
| Menu | [국내주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0NXCNT0` |
| TR_ID (실전) | `H0NXCNT0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | N | 286 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 거래타입 | string | N | 1 | '1 : 등록  2 : 해제' |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0NXCNT0 : 주식종목체결 (NXT) |
| `tr_key` | 구분값 | string | Y | 12 | 종목코드 (ex 005930 삼성전자) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `MKSC_SHRN_ISCD` | 유가증권 단축 종목코드 | string | Y | 9 |  |
| `STCK_CNTG_HOUR` | 주식 체결 시간 | string | Y | 6 |  |
| `STCK_PRPR` | 주식 현재가 | string | Y | 4 |  |
| `PRDY_VRSS_SIGN` | 전일 대비 부호 | string | Y | 1 |  |
| `PRDY_VRSS` | 전일 대비 | string | Y | 4 |  |
| `PRDY_CTRT` | 전일 대비율 | string | Y | 8 |  |
| `WGHN_AVRG_STCK_PRC` | 가중 평균 주식 가격 | string | Y | 8 |  |
| `STCK_OPRC` | 주식 시가 | string | Y | 4 |  |
| `STCK_HGPR` | 주식 최고가 | string | Y | 4 |  |
| `STCK_LWPR` | 주식 최저가 | string | Y | 4 |  |
| `ASKP1` | 매도호가1 | string | Y | 4 |  |
| `BIDP1` | 매수호가1 | string | Y | 4 |  |
| `CNTG_VOL` | 체결 거래량 | string | Y | 8 |  |
| `ACML_VOL` | 누적 거래량 | string | Y | 8 |  |
| `ACML_TR_PBMN` | 누적 거래 대금 | string | Y | 8 |  |
| `SELN_CNTG_CSNU` | 매도 체결 건수 | string | Y | 4 |  |
| `SHNU_CNTG_CSNU` | 매수 체결 건수 | string | Y | 4 |  |
| `NTBY_CNTG_CSNU` | 순매수 체결 건수 | string | Y | 4 |  |
| `CTTR` | 체결강도 | string | Y | 8 |  |
| `SELN_CNTG_SMTN` | 총 매도 수량 | string | Y | 8 |  |
| `SHNU_CNTG_SMTN` | 총 매수 수량 | string | Y | 8 |  |
| `CNTG_CLS_CODE` | 체결구분 | string | Y | 1 |  |
| `SHNU_RATE` | 매수비율 | string | Y | 8 |  |
| `PRDY_VOL_VRSS_ACML_VOL_RATE` | 전일 거래량 대비 등락율 | string | Y | 8 |  |
| `OPRC_HOUR` | 시가 시간 | string | Y | 6 |  |
| `OPRC_VRSS_PRPR_SIGN` | 시가대비구분 | string | Y | 1 |  |
| `OPRC_VRSS_PRPR` | 시가대비 | string | Y | 4 |  |
| `HGPR_HOUR` | 최고가 시간 | string | Y | 6 |  |
| `HGPR_VRSS_PRPR_SIGN` | 고가대비구분 | string | Y | 1 |  |
| `HGPR_VRSS_PRPR` | 고가대비 | string | Y | 4 |  |
| `LWPR_HOUR` | 최저가 시간 | string | Y | 6 |  |
| `LWPR_VRSS_PRPR_SIGN` | 저가대비구분 | string | Y | 1 |  |
| `LWPR_VRSS_PRPR` | 저가대비 | string | Y | 4 |  |
| `BSOP_DATE` | 영업 일자 | string | Y | 8 |  |
| `NEW_MKOP_CLS_CODE` | 신 장운영 구분 코드 | string | Y | 2 |  |
| `TRHT_YN` | 거래정지 여부 | string | Y | 1 |  |
| `ASKP_RSQN1` | 매도호가 잔량1 | string | Y | 8 |  |
| `BIDP_RSQN1` | 매수호가 잔량1 | string | Y | 8 |  |
| `TOTAL_ASKP_RSQN` | 총 매도호가 잔량 | string | Y | 8 |  |
| `TOTAL_BIDP_RSQN` | 총 매수호가 잔량 | string | Y | 8 |  |
| `VOL_TNRT` | 거래량 회전율 | string | Y | 8 |  |
| `PRDY_SMNS_HOUR_ACML_VOL` | 전일 동시간 누적 거래량 | string | Y | 8 |  |
| `PRDY_SMNS_HOUR_ACML_VOL_RATE` | 전일 동시간 누적 거래량 비율 | string | Y | 8 |  |
| `HOUR_CLS_CODE` | 시간 구분 코드 | string | Y | 1 |  |
| `MRKT_TRTM_CLS_CODE` | 임의종료구분코드 | string | Y | 1 |  |
| `VI_STND_PRC` | 정적VI발동기준가 | string | Y | 4 |  |

---
### 179. ELW 실시간체결가

| Field | Value |
|---|---|
| Sheet | `ELW 실시간체결가` |
| Menu | [국내주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0EWCNT0` |
| TR_ID (실전) | `H0EWCNT0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | 1: 등록, 2:해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0EWCNT0 |
| `tr_key` | 구분값 | string | Y | 12 | ELW 종목코드(ex. 57LA24) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `MKSC_SHRN_ISCD` | 유가증권단축종목코드 | string | Y | 9 |  |
| `STCK_CNTG_HOUR` | 주식체결시간 | string | Y | 6 |  |
| `STCK_PRPR` | 주식현재가 | string | Y | 4 |  |
| `PRDY_VRSS_SIGN` | 전일대비부호 | string | Y | 1 |  |
| `PRDY_VRSS` | 전일대비 | string | Y | 4 |  |
| `PRDY_CTRT` | 전일대비율 | string | Y | 8 |  |
| `WGHN_AVRG_STCK_PRC` | 가중평균주식가격 | string | Y | 8 |  |
| `STCK_OPRC` | 주식시가2 | string | Y | 4 |  |
| `STCK_HGPR` | 주식최고가 | string | Y | 4 |  |
| `STCK_LWPR` | 주식최저가 | string | Y | 4 |  |
| `ASKP1` | 매도호가1 | string | Y | 4 |  |
| `BIDP1` | 매수호가1 | string | Y | 4 |  |
| `CNTG_VOL` | 체결거래량 | string | Y | 8 |  |
| `ACML_VOL` | 누적거래량 | string | Y | 8 |  |
| `ACML_TR_PBMN` | 누적거래대금 | string | Y | 8 |  |
| `SELN_CNTG_CSNU` | 매도체결건수 | string | Y | 4 |  |
| `SHNU_CNTG_CSNU` | 매수체결건수 | string | Y | 4 |  |
| `NTBY_CNTG_CSNU` | 순매수체결건수 | string | Y | 4 |  |
| `CTTR` | 체결강도 | string | Y | 8 |  |
| `SELN_CNTG_SMTN` | 총매도수량 | string | Y | 8 |  |
| `SHNU_CNTG_SMTN` | 총매수수량 | string | Y | 8 |  |
| `CNTG_CLS_CODE` | 체결구분코드 | string | Y | 1 |  |
| `SHNU_RATE` | 매수2비율 | string | Y | 8 |  |
| `PRDY_VOL_VRSS_ACML_VOL_RATE` | 전일거래량대비등락율 | string | Y | 8 |  |
| `OPRC_HOUR` | 시가시간 | string | Y | 6 |  |
| `OPRC_VRSS_PRPR_SIGN` | 시가2대비현재가부호 | string | Y | 1 |  |
| `OPRC_VRSS_PRPR` | 시가2대비현재가 | string | Y | 4 |  |
| `HGPR_HOUR` | 최고가시간 | string | Y | 6 |  |
| `HGPR_VRSS_PRPR_SIGN` | 최고가대비현재가부호 | string | Y | 1 |  |
| `HGPR_VRSS_PRPR` | 최고가대비현재가 | string | Y | 4 |  |
| `LWPR_HOUR` | 최저가시간 | string | Y | 6 |  |
| `LWPR_VRSS_PRPR_SIGN` | 최저가대비현재가부호 | string | Y | 1 |  |
| `LWPR_VRSS_PRPR` | 최저가대비현재가 | string | Y | 4 |  |
| `BSOP_DATE` | 영업일자 | string | Y | 8 |  |
| `NEW_MKOP_CLS_CODE` | 신장운영구분코드 | string | Y | 2 |  |
| `TRHT_YN` | 거래정지여부 | string | Y | 1 |  |
| `ASKP_RSQN1` | 매도호가잔량1 | string | Y | 8 |  |
| `BIDP_RSQN1` | 매수호가잔량1 | string | Y | 8 |  |
| `TOTAL_ASKP_RSQN` | 총매도호가잔량 | string | Y | 8 |  |
| `TOTAL_BIDP_RSQN` | 총매수호가잔량 | string | Y | 8 |  |
| `TMVL_VAL` | 시간가치값 | string | Y | 8 |  |
| `PRIT` | 패리티 | string | Y | 8 |  |
| `PRMM_VAL` | 프리미엄값 | string | Y | 8 |  |
| `GEAR` | 기어링 | string | Y | 8 |  |
| `PRLS_QRYR_RATE` | 손익분기비율 | string | Y | 8 |  |
| `INVL_VAL` | 내재가치값 | string | Y | 8 |  |
| `PRMM_RATE` | 프리미엄비율 | string | Y | 8 |  |
| `CFP` | 자본지지점 | string | Y | 8 |  |
| `LVRG_VAL` | 레버리지값 | string | Y | 8 |  |
| `DELTA` | 델타 | string | Y | 8 |  |
| `GAMA` | 감마 | string | Y | 8 |  |
| `VEGA` | 베가 | string | Y | 8 |  |
| `THETA` | 세타 | string | Y | 8 |  |
| `RHO` | 로우 | string | Y | 8 |  |
| `HTS_INTS_VLTL` | HTS내재변동성 | string | Y | 8 |  |
| `HTS_THPR` | HTS이론가 | string | Y | 8 |  |
| `VOL_TNRT` | 거래량회전율 | string | Y | 8 |  |
| `PRDY_SMNS_HOUR_ACML_VOL` | 전일동시간누적거래량 | string | Y | 8 |  |
| `PRDY_SMNS_HOUR_ACML_VOL_RATE` | 전일동시간누적거래량비율 | string | Y | 8 |  |
| `APPRCH_RATE` | 접근도 | string | Y | 8 |  |
| `LP_HVOL` | LP보유량 | string | Y | 8 |  |
| `LP_HLDN_RATE` | LP보유비율 | string | Y | 8 |  |
| `LP_NTBY_QTY` | LP순매도량 | string | Y | 8 |  |

**Request Example:**
```
{           "header":           {                    "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",                    "custtype":"P",                    "tr_type":"1",                    "content-type":"utf-8"           },           "body":           {                    "input":                    {                             "tr_id":"H0EWCNT0",                             "tr_key":"57JN53"                    }           }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "H0EWCNT0",           "tr_key": "57JN53",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output  0\|H0EWCNT0\|001\|57JN53^090333^265^2^50^23.26^285.39^305^310^255^265  ^260^50^5071350^1447312100^560^310^-250^78.69^2650440^2085570^1^0.42^11.49^090019^5^  -40^090019^5^-45^090316^2^10^20240426^20^N^33300^181460^992350^1655180^265.00^98.62^  1.99^133.32^2.14^0.00^0.00^2.15^49.09^0.37^0.03^24.30^29.04^4.15^17.94^293.24^50.71^  0^0.00^0.00^0^0.00^0
```

---
### 180. ELW 실시간예상체결

| Field | Value |
|---|---|
| Sheet | `ELW 실시간예상체결` |
| Menu | [국내주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0EWANC0` |
| TR_ID (실전) | `H0EWANC0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | 1: 등록, 2:해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0EWANC0 |
| `tr_key` | 구분값 | string | Y | 12 | ELW 종목코드(ex. 57LA24) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `MKSC_SHRN_ISCD` | 유가증권단축종목코드 | string | Y | 9 |  |
| `STCK_CNTG_HOUR` | 주식체결시간 | string | Y | 6 |  |
| `STCK_PRPR` | 주식현재가 | string | Y | 1 |  |
| `PRDY_VRSS_SIGN` | 전일대비부호 | string | Y | 1 |  |
| `PRDY_VRSS` | 전일대비 | string | Y | 1 |  |
| `PRDY_CTRT` | 전일대비율 | string | Y | 1 |  |
| `WGHN_AVRG_STCK_PRC` | 가중평균주식가격 | string | Y | 1 |  |
| `STCK_OPRC` | 주식시가2 | string | Y | 1 |  |
| `STCK_HGPR` | 주식최고가 | string | Y | 1 |  |
| `STCK_LWPR` | 주식최저가 | string | Y | 1 |  |
| `ASKP1` | 매도호가1 | string | Y | 1 |  |
| `BIDP1` | 매수호가1 | string | Y | 1 |  |
| `CNTG_VOL` | 체결거래량 | string | Y | 1 |  |
| `ACML_VOL` | 누적거래량 | string | Y | 1 |  |
| `ACML_TR_PBMN` | 누적거래대금 | string | Y | 1 |  |
| `SELN_CNTG_CSNU` | 매도체결건수 | string | Y | 1 |  |
| `SHNU_CNTG_CSNU` | 매수체결건수 | string | Y | 1 |  |
| `NTBY_CNTG_CSNU` | 순매수체결건수 | string | Y | 1 |  |
| `CTTR` | 체결강도 | string | Y | 1 |  |
| `SELN_CNTG_SMTN` | 총매도수량 | string | Y | 1 |  |
| `SHNU_CNTG_SMTN` | 총매수수량 | string | Y | 1 |  |
| `CNTG_CLS_CODE` | 체결구분코드 | string | Y | 1 |  |
| `SHNU_RATE` | 매수2비율 | string | Y | 1 |  |
| `PRDY_VOL_VRSS_ACML_VOL_RATE` | 전일거래량대비등락율 | string | Y | 1 |  |
| `OPRC_HOUR` | 시가시간 | string | Y | 6 |  |
| `OPRC_VRSS_PRPR_SIGN` | 시가2대비현재가부호 | string | Y | 1 |  |
| `OPRC_VRSS_PRPR` | 시가2대비현재가 | string | Y | 1 |  |
| `HGPR_HOUR` | 최고가시간 | string | Y | 6 |  |
| `HGPR_VRSS_PRPR_SIGN` | 최고가대비현재가부호 | string | Y | 1 |  |
| `HGPR_VRSS_PRPR` | 최고가대비현재가 | string | Y | 1 |  |
| `LWPR_HOUR` | 최저가시간 | string | Y | 6 |  |
| `LWPR_VRSS_PRPR_SIGN` | 최저가대비현재가부호 | string | Y | 1 |  |
| `LWPR_VRSS_PRPR` | 최저가대비현재가 | string | Y | 1 |  |
| `BSOP_DATE` | 영업일자 | string | Y | 8 |  |
| `NEW_MKOP_CLS_CODE` | 신장운영구분코드 | string | Y | 2 |  |
| `TRHT_YN` | 거래정지여부 | string | Y | 1 |  |
| `ASKP_RSQN1` | 매도호가잔량1 | string | Y | 1 |  |
| `BIDP_RSQN1` | 매수호가잔량1 | string | Y | 1 |  |
| `TOTAL_ASKP_RSQN` | 총매도호가잔량 | string | Y | 1 |  |
| `TOTAL_BIDP_RSQN` | 총매수호가잔량 | string | Y | 1 |  |
| `TMVL_VAL` | 시간가치값 | string | Y | 1 |  |
| `PRIT` | 패리티 | string | Y | 1 |  |
| `PRMM_VAL` | 프리미엄값 | string | Y | 1 |  |
| `GEAR` | 기어링 | string | Y | 1 |  |
| `PRLS_QRYR_RATE` | 손익분기비율 | string | Y | 1 |  |
| `INVL_VAL` | 내재가치값 | string | Y | 1 |  |
| `PRMM_RATE` | 프리미엄비율 | string | Y | 1 |  |
| `CFP` | 자본지지점 | string | Y | 1 |  |
| `LVRG_VAL` | 레버리지값 | string | Y | 1 |  |
| `DELTA` | 델타 | string | Y | 1 |  |
| `GAMA` | 감마 | string | Y | 1 |  |
| `VEGA` | 베가 | string | Y | 1 |  |
| `THETA` | 세타 | string | Y | 1 |  |
| `RHO` | 로우 | string | Y | 1 |  |
| `HTS_INTS_VLTL` | HTS내재변동성 | string | Y | 1 |  |
| `HTS_THPR` | HTS이론가 | string | Y | 1 |  |
| `VOL_TNRT` | 거래량회전율 | string | Y | 1 |  |
| `LP_HVOL` | LP보유량 | string | Y | 1 |  |
| `LP_HLDN_RATE` | LP보유비율 | string | Y | 1 |  |

**Request Example:**
```
{           "header":           {                    "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",                    "custtype":"P",                    "tr_type":"1",                    "content-type":"utf-8"           },           "body":           {                    "input":                    {                             "tr_id":"H0EWANC0",                             "tr_key":"57JN53"                    }           }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "H0EWANC0",           "tr_key": "57JN53",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output
```

---
### 181. 국내주식 실시간예상체결 (NXT)

| Field | Value |
|---|---|
| Sheet | `국내주식 실시간예상체결 (NXT)` |
| Menu | [국내주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0NXANC0` |
| TR_ID (실전) | `H0NXANC0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | N | 286 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 거래타입 | string | N | 1 | 1 : 등록  2 : 해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0NXANC0 : 국내주식 실시간예상체결 (NXT) |
| `tr_key` | 구분값 | string | Y | 12 | 종목코드 (ex 005930 삼성전자) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `MKSC_SHRN_ISCD` | 유가증권단축종목코드 | string | Y | 9 |  |
| `STCK_CNTG_HOUR` | 주식체결시간 | string | Y | 6 |  |
| `STCK_PRPR` | 주식현재가 | string | Y | 4 |  |
| `PRDY_VRSS_SIGN` | 전일대비구분 | string | Y | 1 |  |
| `PRDY_VRSS` | 전일대비 | string | Y | 4 |  |
| `PRDY_CTRT` | 등락율 | string | Y | 8 |  |
| `WGHN_AVRG_STCK_PRC` | 가중평균주식가격 | string | Y | 8 |  |
| `STCK_OPRC` | 시가 | string | Y | 4 |  |
| `STCK_HGPR` | 고가 | string | Y | 4 |  |
| `STCK_LWPR` | 저가 | string | Y | 4 |  |
| `ASKP1` | 매도호가 | string | Y | 4 |  |
| `BIDP1` | 매수호가 | string | Y | 4 |  |
| `CNTG_VOL` | 거래량 | string | Y | 8 |  |
| `ACML_VOL` | 누적거래량 | string | Y | 8 |  |
| `ACML_TR_PBMN` | 누적거래대금 | string | Y | 8 |  |
| `SELN_CNTG_CSNU` | 매도체결건수 | string | Y | 4 |  |
| `SHNU_CNTG_CSNU` | 매수체결건수 | string | Y | 4 |  |
| `NTBY_CNTG_CSNU` | 순매수체결건수 | string | Y | 4 |  |
| `CTTR` | 체결강도 | string | Y | 8 |  |
| `SELN_CNTG_SMTN` | 총매도수량 | string | Y | 8 |  |
| `SHNU_CNTG_SMTN` | 총매수수량 | string | Y | 8 |  |
| `CNTG_CLS_CODE` | 체결구분 | string | Y | 1 |  |
| `SHNU_RATE` | 매수비율 | string | Y | 8 |  |
| `PRDY_VOL_VRSS_ACML_VOL_RATE` | 전일거래량대비등락율 | string | Y | 8 |  |
| `OPRC_HOUR` | 시가시간 | string | Y | 6 |  |
| `OPRC_VRSS_PRPR_SIGN` | 시가대비구분 | string | Y | 1 |  |
| `OPRC_VRSS_PRPR` | 시가대비 | string | Y | 4 |  |
| `HGPR_HOUR` | 최고가시간 | string | Y | 6 |  |
| `HGPR_VRSS_PRPR_SIGN` | 고가대비구분 | string | Y | 1 |  |
| `HGPR_VRSS_PRPR` | 고가대비 | string | Y | 4 |  |
| `LWPR_HOUR` | 최저가시간 | string | Y | 6 |  |
| `LWPR_VRSS_PRPR_SIGN` | 저가대비구분 | string | Y | 1 |  |
| `LWPR_VRSS_PRPR` | 저가대비 | string | Y | 4 |  |
| `BSOP_DATE` | 영업일자 | string | Y | 8 |  |
| `NEW_MKOP_CLS_CODE` | 신장운영구분코드 | string | Y | 2 |  |
| `TRHT_YN` | 거래정지여부 | string | Y | 1 |  |
| `ASKP_RSQN1` | 매도호가잔량1 | string | Y | 8 |  |
| `BIDP_RSQN1` | 매수호가잔량1 | string | Y | 8 |  |
| `TOTAL_ASKP_RSQN` | 총매도호가잔량 | string | Y | 8 |  |
| `TOTAL_BIDP_RSQN` | 총매수호가잔량 | string | Y | 8 |  |
| `VOL_TNRT` | 거래량회전율 | string | Y | 8 |  |
| `PRDY_SMNS_HOUR_ACML_VOL` | 전일동시간누적거래량 | string | Y | 8 |  |
| `PRDY_SMNS_HOUR_ACML_VOL_RATE` | 전일동시간누적거래량비율 | string | Y | 8 |  |
| `HOUR_CLS_CODE` | 시간구분코드 | string | Y | 1 |  |
| `MRKT_TRTM_CLS_CODE` | 임의종료구분코드 | string | Y | 1 |  |
| `VI_STND_PRC` | VI 상태값 | string | Y | 4 |  |

---
### 182. 국내주식 실시간회원사 (KRX)

| Field | Value |
|---|---|
| Sheet | `국내주식 실시간회원사 (KRX)` |
| Menu | [국내주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0STMBC0` |
| TR_ID (실전) | `H0STMBC0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | "1: 등록, 2:해제" |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 7 | H0STMBC0 |
| `tr_key` | 종목코드 | string | Y | 6 | 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `MKSC_SHRN_ISCD` | 유가증권단축종목코드 | object | Y | 9 | '각 항목사이에는 구분자로 ^ 사용,  모든 데이터타입은 String으로 변환되어 push 처리됨' |
| `SELN2_MBCR_NAME1` | 매도2회원사명1 | string | Y | 16 |  |
| `SELN2_MBCR_NAME2` | 매도2회원사명2 | string | Y | 16 |  |
| `SELN2_MBCR_NAME3` | 매도2회원사명3 | string | Y | 16 |  |
| `SELN2_MBCR_NAME4` | 매도2회원사명4 | string | Y | 16 |  |
| `SELN2_MBCR_NAME5` | 매도2회원사명5 | string | Y | 16 |  |
| `BYOV_MBCR_NAME1` | 매수회원사명1 | string | Y | 16 |  |
| `BYOV_MBCR_NAME2` | 매수회원사명2 | string | Y | 16 |  |
| `BYOV_MBCR_NAME3` | 매수회원사명3 | string | Y | 16 |  |
| `BYOV_MBCR_NAME4` | 매수회원사명4 | string | Y | 16 |  |
| `BYOV_MBCR_NAME5` | 매수회원사명5 | string | Y | 16 |  |
| `TOTAL_SELN_QTY1` | 총매도수량1 | string | Y | 8 |  |
| `TOTAL_SELN_QTY2` | 총매도수량2 | string | Y | 8 |  |
| `TOTAL_SELN_QTY3` | 총매도수량3 | string | Y | 8 |  |
| `TOTAL_SELN_QTY4` | 총매도수량4 | string | Y | 8 |  |
| `TOTAL_SELN_QTY5` | 총매도수량5 | string | Y | 8 |  |
| `TOTAL_SHNU_QTY1` | 총매수2수량1 | string | Y | 8 |  |
| `TOTAL_SHNU_QTY2` | 총매수2수량2 | string | Y | 8 |  |
| `TOTAL_SHNU_QTY3` | 총매수2수량3 | string | Y | 8 |  |
| `TOTAL_SHNU_QTY4` | 총매수2수량4 | string | Y | 8 |  |
| `TOTAL_SHNU_QTY5` | 총매수2수량5 | string | Y | 8 |  |
| `SELN_MBCR_GLOB_YN_1` | 매도거래원구분1 | string | Y | 1 |  |
| `SELN_MBCR_GLOB_YN_2` | 매도거래원구분2 | string | Y | 1 |  |
| `SELN_MBCR_GLOB_YN_3` | 매도거래원구분3 | string | Y | 1 |  |
| `SELN_MBCR_GLOB_YN_4` | 매도거래원구분4 | string | Y | 1 |  |
| `SELN_MBCR_GLOB_YN_5` | 매도거래원구분5 | string | Y | 1 |  |
| `SHNU_MBCR_GLOB_YN_1` | 매수거래원구분1 | string | Y | 1 |  |
| `SHNU_MBCR_GLOB_YN_2` | 매수거래원구분2 | string | Y | 1 |  |
| `SHNU_MBCR_GLOB_YN_3` | 매수거래원구분3 | string | Y | 1 |  |
| `SHNU_MBCR_GLOB_YN_4` | 매수거래원구분4 | string | Y | 1 |  |
| `SHNU_MBCR_GLOB_YN_5` | 매수거래원구분5 | string | Y | 1 |  |
| `SELN_MBCR_NO1` | 매도거래원코드1 | string | Y | 5 |  |
| `SELN_MBCR_NO2` | 매도거래원코드2 | string | Y | 5 |  |
| `SELN_MBCR_NO3` | 매도거래원코드3 | string | Y | 5 |  |
| `SELN_MBCR_NO4` | 매도거래원코드4 | string | Y | 5 |  |
| `SELN_MBCR_NO5` | 매도거래원코드5 | string | Y | 5 |  |
| `SHNU_MBCR_NO1` | 매수거래원코드1 | string | Y | 5 |  |
| `SHNU_MBCR_NO2` | 매수거래원코드2 | string | Y | 5 |  |
| `SHNU_MBCR_NO3` | 매수거래원코드3 | string | Y | 5 |  |
| `SHNU_MBCR_NO4` | 매수거래원코드4 | string | Y | 5 |  |
| `SHNU_MBCR_NO5` | 매수거래원코드5 | string | Y | 5 |  |
| `SELN_MBCR_RLIM1` | 매도회원사비중1 | string | Y | 8 |  |
| `SELN_MBCR_RLIM2` | 매도회원사비중2 | string | Y | 8 |  |
| `SELN_MBCR_RLIM3` | 매도회원사비중3 | string | Y | 8 |  |
| `SELN_MBCR_RLIM4` | 매도회원사비중4 | string | Y | 8 |  |
| `SELN_MBCR_RLIM5` | 매도회원사비중5 | string | Y | 8 |  |
| `SHNU_MBCR_RLIM1` | 매수2회원사비중1 | string | Y | 8 |  |
| `SHNU_MBCR_RLIM2` | 매수2회원사비중2 | string | Y | 8 |  |
| `SHNU_MBCR_RLIM3` | 매수2회원사비중3 | string | Y | 8 |  |
| `SHNU_MBCR_RLIM4` | 매수2회원사비중4 | string | Y | 8 |  |
| `SHNU_MBCR_RLIM5` | 매수2회원사비중5 | string | Y | 8 |  |
| `SELN_QTY_ICDC1` | 매도수량증감1 | string | Y | 4 |  |
| `SELN_QTY_ICDC2` | 매도수량증감2 | string | Y | 4 |  |
| `SELN_QTY_ICDC3` | 매도수량증감3 | string | Y | 4 |  |
| `SELN_QTY_ICDC4` | 매도수량증감4 | string | Y | 4 |  |
| `SELN_QTY_ICDC5` | 매도수량증감5 | string | Y | 4 |  |
| `SHNU_QTY_ICDC1` | 매수2수량증감1 | string | Y | 4 |  |
| `SHNU_QTY_ICDC2` | 매수2수량증감2 | string | Y | 4 |  |
| `SHNU_QTY_ICDC3` | 매수2수량증감3 | string | Y | 4 |  |
| `SHNU_QTY_ICDC4` | 매수2수량증감4 | string | Y | 4 |  |
| `SHNU_QTY_ICDC5` | 매수2수량증감5 | string | Y | 4 |  |
| `GLOB_TOTAL_SELN_QTY` | 외국계총매도수량 | string | Y | 8 |  |
| `GLOB_TOTAL_SHNU_QTY` | 외국계총매수2수량 | string | Y | 8 |  |
| `GLOB_TOTAL_SELN_QTY_ICDC` | 외국계총매도수량증감 | string | Y | 4 |  |
| `GLOB_TOTAL_SHNU_QTY_ICDC` | 외국계총매수2수량증감 | string | Y | 4 |  |
| `GLOB_NTBY_QTY` | 외국계순매수수량 | string | Y | 8 |  |
| `GLOB_SELN_RLIM` | 외국계매도비중 | string | Y | 8 |  |
| `GLOB_SHNU_RLIM` | 외국계매수2비중 | string | Y | 8 |  |
| `SELN2_MBCR_ENG_NAME1` | 매도2영문회원사명1 | string | Y | 20 |  |
| `SELN2_MBCR_ENG_NAME2` | 매도2영문회원사명2 | string | Y | 20 |  |
| `SELN2_MBCR_ENG_NAME3` | 매도2영문회원사명3 | string | Y | 20 |  |
| `SELN2_MBCR_ENG_NAME4` | 매도2영문회원사명4 | string | Y | 20 |  |
| `SELN2_MBCR_ENG_NAME5` | 매도2영문회원사명5 | string | Y | 20 |  |
| `BYOV_MBCR_ENG_NAME1` | 매수영문회원사명1 | string | Y | 20 |  |
| `BYOV_MBCR_ENG_NAME2` | 매수영문회원사명2 | string | Y | 20 |  |
| `BYOV_MBCR_ENG_NAME3` | 매수영문회원사명3 | string | Y | 20 |  |
| `BYOV_MBCR_ENG_NAME4` | 매수영문회원사명4 | string | Y | 20 |  |
| `BYOV_MBCR_ENG_NAME5` | 매수영문회원사명5 | string | Y | 20 |  |

**Request Example:**
```
{      "header": {          "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",          "custtype": "P",          "tr_type": "1",          "content-type": "utf-8"      },      "body": {          "input": {              "tr_id": "H0STMBC0",              "tr_key": "005930"          }      }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "H0STMBC0",           "tr_key": "005930",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output  0\|H0STMBC0\|001\|005930^씨티그룹^미래에셋증권^모간서울^BNK증권^키움증권^미래  에셋증권^BNK증권^맥쿼리^NH투자증권^한국증권^903482^703873^484082^471203^246578^946273^571760^  343109^313536^311982^Y^N^Y^N^N^N^N^Y^N^N^00037^00005^00036^00086^00050^00005^00086^00035^0001  2^00003^19.06^14.85^10.21^9.94^5.20^19.96^12.06^7.24^6.61^6.58^14913^5054^7240^80000^3532^280  24^42986^0^5612^3043^1387564^681749^22153^0^-705815^29.27^14.38^^^^^^^^^^
```

---
### 183. 국내주식 실시간예상체결 (통합)

| Field | Value |
|---|---|
| Sheet | `국내주식 실시간예상체결 (통합)` |
| Menu | [국내주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0UNANC0` |
| TR_ID (실전) | `H0UNANC0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 286 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 거래타입 | string | Y | 1 | 1 : 등록  2 : 해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | [실전투자]  H0UNANC0 : 국내주식 실시간예상체결 (통합) |
| `tr_key` | 구분값 | string | Y | 12 | 종목코드 (ex 005930 삼성전자) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `MKSC_SHRN_ISCD` | 유가증권단축종목코드 | string | Y | 9 |  |
| `STCK_CNTG_HOUR` | 주식체결시간 | string | Y | 6 |  |
| `STCK_PRPR` | 주식현재가 | string | Y | 4 |  |
| `PRDY_VRSS_SIGN` | 전일대비구분 | string | Y | 1 |  |
| `PRDY_VRSS` | 전일대비 | string | Y | 4 |  |
| `PRDY_CTRT` | 등락율 | string | Y | 8 |  |
| `WGHN_AVRG_STCK_PRC` | 가중평균주식가격 | string | Y | 8 |  |
| `STCK_OPRC` | 시가 | string | Y | 4 |  |
| `STCK_HGPR` | 고가 | string | Y | 4 |  |
| `STCK_LWPR` | 저가 | string | Y | 4 |  |
| `ASKP1` | 매도호가 | string | Y | 4 |  |
| `BIDP1` | 매수호가 | string | Y | 4 |  |
| `CNTG_VOL` | 거래량 | string | Y | 8 |  |
| `ACML_VOL` | 누적거래량 | string | Y | 8 |  |
| `ACML_TR_PBMN` | 누적거래대금 | string | Y | 8 |  |
| `SELN_CNTG_CSNU` | 매도체결건수 | string | Y | 4 |  |
| `SHNU_CNTG_CSNU` | 매수체결건수 | string | Y | 4 |  |
| `NTBY_CNTG_CSNU` | 순매수체결건수 | string | Y | 4 |  |
| `CTTR` | 체결강도 | string | Y | 8 |  |
| `SELN_CNTG_SMTN` | 총매도수량 | string | Y | 8 |  |
| `SHNU_CNTG_SMTN` | 총매수수량 | string | Y | 8 |  |
| `CNTG_CLS_CODE` | 체결구분 | string | Y | 1 |  |
| `SHNU_RATE` | 매수비율 | string | Y | 8 |  |
| `PRDY_VOL_VRSS_ACML_VOL_RATE` | 전일거래량대비등락율 | string | Y | 8 |  |
| `OPRC_HOUR` | 시가시간 | string | Y | 6 |  |
| `OPRC_VRSS_PRPR_SIGN` | 시가대비구분 | string | Y | 1 |  |
| `OPRC_VRSS_PRPR` | 시가대비 | string | Y | 4 |  |
| `HGPR_HOUR` | 최고가시간 | string | Y | 6 |  |
| `HGPR_VRSS_PRPR_SIGN` | 고가대비구분 | string | Y | 1 |  |
| `HGPR_VRSS_PRPR` | 고가대비 | string | Y | 4 |  |
| `LWPR_HOUR` | 최저가시간 | string | Y | 6 |  |
| `LWPR_VRSS_PRPR_SIGN` | 저가대비구분 | string | Y | 1 |  |
| `LWPR_VRSS_PRPR` | 저가대비 | string | Y | 4 |  |
| `BSOP_DATE` | 영업일자 | string | Y | 8 |  |
| `NEW_MKOP_CLS_CODE` | 신장운영구분코드 | string | Y | 2 |  |
| `TRHT_YN` | 거래정지여부 | string | Y | 1 |  |
| `ASKP_RSQN1` | 매도호가잔량1 | string | Y | 8 |  |
| `BIDP_RSQN1` | 매수호가잔량1 | string | Y | 8 |  |
| `TOTAL_ASKP_RSQN` | 총매도호가잔량 | string | Y | 8 |  |
| `TOTAL_BIDP_RSQN` | 총매수호가잔량 | string | Y | 8 |  |
| `VOL_TNRT` | 거래량회전율 | string | Y | 8 |  |
| `PRDY_SMNS_HOUR_ACML_VOL` | 전일동시간누적거래량 | string | Y | 8 |  |
| `PRDY_SMNS_HOUR_ACML_VOL_RATE` | 전일동시간누적거래량비율 | string | Y | 8 |  |
| `HOUR_CLS_CODE` | 시간구분코드 | string | Y | 1 |  |
| `MRKT_TRTM_CLS_CODE` | 임의종료구분코드 | string | Y | 1 |  |
| `VI_STND_PRC` | VI 상태값 | string | Y | 4 |  |

---
### 184. 국내주식 장운영정보 (NXT)

| Field | Value |
|---|---|
| Sheet | `국내주식 장운영정보 (NXT)` |
| Menu | [국내주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0NXMKO0` |
| TR_ID (실전) | `H0NXMKO0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 286 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 거래타입 | string | Y | 1 | 1 : 등록  2 : 해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0NXMKO0 : 국내주식 장운영정보 (NXT) |
| `tr_key` | 구분값 | string | Y | 12 | 종목코드 (ex 005930 삼성전자) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `MKSC_SHRN_ISCD` | 종목코드 | string | Y | 9 |  |
| `TRHT_YN` | 거래정지 여부 | string | Y | 1 |  |
| `TR_SUSP_REAS_CNTT` | 거래 정지 사유 내용 | string | Y | 100 |  |
| `MKOP_CLS_CODE` | 장운영 구분 코드 | string | Y | 3 |  |
| `ANTC_MKOP_CLS_CODE` | 예상 장운영 구분 코드 | string | Y | 3 |  |
| `MRKT_TRTM_CLS_CODE` | 임의연장구분코드 | string | Y | 1 |  |
| `DIVI_APP_CLS_CODE` | 동시호가배분처리구분코드 | string | Y | 2 |  |
| `ISCD_STAT_CLS_CODE` | 종목상태구분코드 | string | Y | 2 |  |
| `VI_CLS_CODE` | VI적용구분코드 | string | Y | 1 |  |
| `OVTM_VI_CLS_CODE` | 시간외단일가VI적용구분코드 | string | Y | 1 |  |
| `EXCH_CLS_CODE` | 거래소 구분코드 | string | Y | 1 |  |

---
### 185. 국내ETF NAV추이

| Field | Value |
|---|---|
| Sheet | `국내ETF NAV추이` |
| Menu | [국내주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0STNAV0` |
| TR_ID (실전) | `H0STNAV0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | 1: 등록, 2:해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0STNAV0 |
| `tr_key` | 구분값 | string | Y | 12 | 종목코드 (ex. 005930 삼성전자) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `MKSC_SHRN_ISCD` | 유가증권단축종목코드 | string | Y | 9 |  |
| `NAV` | NAV | string | Y | 8 |  |
| `NAV_PRDY_VRSS_SIGN` | NAV전일대비부호 | string | Y | 1 |  |
| `NAV_PRDY_VRSS` | NAV전일대비 | string | Y | 8 |  |
| `NAV_PRDY_CTRT` | NAV전일대비율 | string | Y | 8 |  |
| `OPRC_NAV` | NAV시가 | string | Y | 8 |  |
| `HPRC_NAV` | NAV고가 | string | Y | 8 |  |
| `LPRC_NAV` | NAV저가 | string | Y | 8 |  |

**Request Example:**
```
{           "header":           {                    "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",                    "custtype":"P",                    "tr_type":"1",                    "content-type":"utf-8"           },           "body":           {                    "input":                    {                             "tr_id":"H0STNAV0",                             "tr_key":"069500"                    }           }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "H0STNAV0",           "tr_key": "069500",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output  0\|H0STNAV0\|001\|069500^37235.46^5^-381.26^-1.01^37646.25^37646.25^37202.10
```

---
### 186. 국내주식 시간외 실시간체결가 (KRX)

| Field | Value |
|---|---|
| Sheet | `국내주식 시간외 실시간체결가 (KRX)` |
| Menu | [국내주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0STOUP0` |
| TR_ID (실전) | `H0STOUP0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | 1: 등록, 2:해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0STOUP0 |
| `tr_key` | 구분값 | string | Y | 12 | 종목코드 (ex 005930 삼성전자) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `MKSC_SHRN_ISCD` | 유가증권단축종목코드 | string | Y | 9 |  |
| `STCK_CNTG_HOUR` | 주식체결시간 | string | Y | 6 |  |
| `STCK_PRPR` | 주식현재가 | string | Y | 1 |  |
| `PRDY_VRSS_SIGN` | 전일대비구분 | string | Y | 1 |  |
| `PRDY_VRSS` | 전일대비 | string | Y | 1 |  |
| `PRDY_CTRT` | 등락율 | string | Y | 1 |  |
| `WGHN_AVRG_STCK_PRC` | 가중평균주식가격 | string | Y | 1 |  |
| `STCK_OPRC` | 시가 | string | Y | 1 |  |
| `STCK_HGPR` | 고가 | string | Y | 1 |  |
| `STCK_LWPR` | 저가 | string | Y | 1 |  |
| `ASKP1` | 매도호가 | string | Y | 1 |  |
| `BIDP1` | 매수호가 | string | Y | 1 |  |
| `CNTG_VOL` | 거래량 | string | Y | 1 |  |
| `ACML_VOL` | 누적거래량 | string | Y | 1 |  |
| `ACML_TR_PBMN` | 누적거래대금 | string | Y | 1 |  |
| `SELN_CNTG_CSNU` | 매도체결건수 | string | Y | 1 |  |
| `SHNU_CNTG_CSNU` | 매수체결건수 | string | Y | 1 |  |
| `NTBY_CNTG_CSNU` | 순매수체결건수 | string | Y | 1 |  |
| `CTTR` | 체결강도 | string | Y | 1 |  |
| `SELN_CNTG_SMTN` | 총매도수량 | string | Y | 1 |  |
| `SHNU_CNTG_SMTN` | 총매수수량 | string | Y | 1 |  |
| `CNTG_CLS_CODE` | 체결구분 | string | Y | 1 |  |
| `SHNU_RATE` | 매수비율 | string | Y | 1 |  |
| `PRDY_VOL_VRSS_ACML_VOL_RATE` | 전일거래량대비등락율 | string | Y | 1 |  |
| `OPRC_HOUR` | 시가시간 | string | Y | 6 |  |
| `OPRC_VRSS_PRPR_SIGN` | 시가대비구분 | string | Y | 1 |  |
| `OPRC_VRSS_PRPR` | 시가대비 | string | Y | 1 |  |
| `HGPR_HOUR` | 최고가시간 | string | Y | 6 |  |
| `HGPR_VRSS_PRPR_SIGN` | 고가대비구분 | string | Y | 1 |  |
| `HGPR_VRSS_PRPR` | 고가대비 | string | Y | 1 |  |
| `LWPR_HOUR` | 최저가시간 | string | Y | 6 |  |
| `LWPR_VRSS_PRPR_SIGN` | 저가대비구분 | string | Y | 1 |  |
| `LWPR_VRSS_PRPR` | 저가대비 | string | Y | 1 |  |
| `BSOP_DATE` | 영업일자 | string | Y | 8 |  |
| `NEW_MKOP_CLS_CODE` | 신장운영구분코드 | string | Y | 2 |  |
| `TRHT_YN` | 거래정지여부 | string | Y | 1 |  |
| `ASKP_RSQN1` | 매도호가잔량1 | string | Y | 1 |  |
| `BIDP_RSQN1` | 매수호가잔량1 | string | Y | 1 |  |
| `TOTAL_ASKP_RSQN` | 총매도호가잔량 | string | Y | 1 |  |
| `TOTAL_BIDP_RSQN` | 총매수호가잔량 | string | Y | 1 |  |
| `VOL_TNRT` | 거래량회전율 | string | Y | 1 |  |
| `PRDY_SMNS_HOUR_ACML_VOL` | 전일동시간누적거래량 | string | Y | 1 |  |
| `PRDY_SMNS_HOUR_ACML_VOL_RATE` | 전일동시간누적거래량비율 | string | Y | 1 |  |

**Request Example:**
```
{           "header":           {                    "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",                    "custtype":"P",                    "tr_type":"1",                    "content-type":"utf-8"           },           "body":           {                    "input":                    {                             "tr_id":"H0STOUP0",                             "tr_key":"005930"                    }           }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "H0STOUP0",           "tr_key": "005930",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output  0\|H0STOUP0\|001\|005930^165020^77700^2^100^0.13^78209.85^77600^77800^77  600^77800^77700^1034^13540^1052379900^3^2^-1^71.12^8029^5511^5^0.37^69.15^161015^3^100^  162004^5^-100^161015^3^100^20240503^40^N^7898^6461^24577^38548^0.00^18636724^0.07
```

---
