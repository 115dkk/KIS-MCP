# [해외주식] API

한국투자증권 OpenAPI — `[해외주식]` 카테고리 (51개).
원본 시트는 cp949 엑셀이며 본 파일은 LLM 친화 변환본. 검색은 `INDEX.md` 권장.

공통 OAuth 헤더(`authorization`, `appkey`, `appsecret`, `tr_id`, `custtype` 등)는 모든 API 동일하므로 본 문서에서 생략. `INDEX.md` 상단 참고.

---
### 1. 해외주식 잔고

| Field | Value |
|---|---|
| Sheet | `해외주식 잔고` |
| Menu | [해외주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/overseas-stock/v1/trading/inquire-balance` |
| TR_ID (실전) | `TTTS3012R` |
| TR_ID (모의) | `VTTS3012R` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `OVRS_EXCG_CD` | 해외거래소코드 | string | Y | 4 | [모의]  NASD : 나스닥  NYSE : 뉴욕   AMEX : 아멕스    [실전]  NASD : 미국전체  NAS : 나스닥  NYSE : 뉴욕   AMEX : 아멕스    [모의/실전 공통]  SEHK : 홍콩  SHAA : 중국상해  SZAA : 중국심천  TKSE : 일본  HASE : 베트남 하노이  VNSE : 베트남 호치민 |
| `TR_CRCY_CD` | 거래통화코드 | string | Y | 3 | USD : 미국달러  HKD : 홍콩달러  CNY : 중국위안화  JPY : 일본엔화  VND : 베트남동 |
| `CTX_AREA_FK200` | 연속조회검색조건200 | string | N | 200 | 공란 : 최초 조회시  이전 조회 Output CTX_AREA_FK200값 : 다음페이지 조회시(2번째부터) |
| `CTX_AREA_NK200` | 연속조회키200 | string | N | 200 | 공란 : 최초 조회시  이전 조회 Output CTX_AREA_NK200값 : 다음페이지 조회시(2번째부터) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 | 0 : 성공   0 이외의 값 : 실패 |
| `msg_cd` | 응답코드 | string | Y | 8 | 응답코드 |
| `msg1` | 응답메세지 | string | Y | 80 | 응답메세지 |
| `ctx_area_fk200` | 연속조회검색조건200 | string | Y | 200 |  |
| `ctx_area_nk200` | 연속조회키200 | string | Y | 200 |  |
| `output1` | 응답상세1 | array | Y |  |  |
| `cano` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `acnt_prdt_cd` | 계좌상품코드 | string | Y | 2 | 계좌상품코드 |
| `prdt_type_cd` | 상품유형코드 | string | Y | 3 |  |
| `ovrs_pdno` | 해외상품번호 | string | Y | 12 |  |
| `ovrs_item_name` | 해외종목명 | string | Y | 60 |  |
| `frcr_evlu_pfls_amt` | 외화평가손익금액 | string | Y | 30 | 해당 종목의 매입금액과 평가금액의 외회기준 비교 손익 |
| `evlu_pfls_rt` | 평가손익율 | string | Y | 10 | 해당 종목의 평가손익을 기준으로 한 수익률 |
| `pchs_avg_pric` | 매입평균가격 | string | Y | 23 | 해당 종목의 매수 평균 단가 |
| `ovrs_cblc_qty` | 해외잔고수량 | string | Y | 19 |  |
| `ord_psbl_qty` | 주문가능수량 | string | Y | 10 | 매도 가능한 주문 수량 |
| `frcr_pchs_amt1` | 외화매입금액1 | string | Y | 23 | 해당 종목의 외화 기준 매입금액 |
| `ovrs_stck_evlu_amt` | 해외주식평가금액 | string | Y | 32 | 해당 종목의 외화 기준 평가금액 |
| `now_pric2` | 현재가격2 | string | Y | 25 | 해당 종목의 현재가 |
| `tr_crcy_cd` | 거래통화코드 | string | Y | 3 | USD : 미국달러  HKD : 홍콩달러  CNY : 중국위안화  JPY : 일본엔화  VND : 베트남동 |
| `ovrs_excg_cd` | 해외거래소코드 | string | Y | 4 | NASD : 나스닥  NYSE : 뉴욕  AMEX : 아멕스  SEHK : 홍콩  SHAA : 중국상해  SZAA : 중국심천  TKSE : 일본  HASE : 하노이거래소  VNSE : 호치민거래소 |
| `loan_type_cd` | 대출유형코드 | string | Y | 2 | 00 : 해당사항없음  01 : 자기융자일반형  03 : 자기융자투자형  05 : 유통융자일반형  06 : 유통융자투자형  07 : 자기대주  09 : 유통대주  10 : 현금  11 : 주식담보대출  12 : 수익증권담보대출  13 : ELS담보대출  14 : 채권담보대출  15 : 해외주식담보대출  16 : 기업신용공여  31 : 소액자동담보대출  41 : 매도담보대출  42 : 환매자금대출  43 : 매입환매자금대출  44 : 대여매도담보대출  81 : 대차거래  82 : 법인CMA론  91 : 공모주청약자금대출  92 : 매입자금  93 : 미수론서비스  94 : 대여 |
| `loan_dt` | 대출일자 | string | Y | 8 | 대출 실행일자 |
| `expd_dt` | 만기일자 | string | Y | 8 | 대출 만기일자 |
| `output2` | 응답상세2 | object | Y |  |  |
| `frcr_pchs_amt1` | 외화매입금액1 | string | Y | 24 |  |
| `ovrs_rlzt_pfls_amt` | 해외실현손익금액 | string | Y | 20 |  |
| `ovrs_tot_pfls` | 해외총손익 | string | Y | 24 |  |
| `rlzt_erng_rt` | 실현수익율 | string | Y | 32 |  |
| `tot_evlu_pfls_amt` | 총평가손익금액 | string | Y | 32 |  |
| `tot_pftrt` | 총수익률 | string | Y | 32 |  |
| `frcr_buy_amt_smtl1` | 외화매수금액합계1 | string | Y | 25 |  |
| `ovrs_rlzt_pfls_amt2` | 해외실현손익금액2 | string | Y | 24 |  |
| `frcr_buy_amt_smtl2` | 외화매수금액합계2 | string | Y | 25 |  |

**Request Example:**
```
{  "CANO": "810XXXXX",  "ACNT_PRDT_CD":"01",  "OVRS_EXCG_CD": "NASD",  "TR_CRCY_CD": "USD",  "CTX_AREA_FK200": "",  "CTX_AREA_NK200": ""  }
```

**Response Example:**
```
{    "ctx_area_fk200": "                                                                                                                                                                                                        ",    "ctx_area_nk200": "                                                                                                                                                                                                        ",    "output1": [      {        "cano": "810XXXXX",        "acnt_prdt_cd": "01",        "prdt_type_cd": "512",        "ovrs_pdno": "TSLA",        "ovrs_item_name": "테슬라",        "frcr_evlu_pfls_amt": "-3547254.185235",        "evlu_pfls_rt": "-81.75",        "pchs_avg_pric": "5832.2148",        "ovrs_cblc_qty": "744",        "ord_psbl_qty": "744",        "frcr_pchs_amt1": "4339167.78523",        "ovrs_stck_evlu_amt": "791913.60000000",        "now_pric2": "1064.400000",        "tr_crcy_cd": "USD",        "ovrs_excg_cd": "NASD",        "loan_type_cd": "10",        "loan_dt": "",        "expd_dt": ""      },      {        "cano": "",        "acnt_prdt_cd": "",        "prdt_type_cd": "",        "ovrs_pdno": "",        "ovrs_item_name": "",        "frcr_evlu_pfls_amt": "0.000000",        "evlu_pfls_rt": "0.00",        "pchs_avg_pric": "0.0000",        "ovrs_cblc_qty": "0",        "ord_psbl_qty": "0",        "frcr_pchs_amt1": "0.00000",        "ovrs_stck_evlu_amt": "0.00000000",        "now_pric2": "0.000000",        "tr_crcy_cd": "",        "ovrs_excg_cd": "",        "loan_type_cd": "",        "loan_dt": "",        "expd_dt": ""      }    ],    "output2": {      "frcr_pchs_amt1": "4339167.78523",      "ovrs_rlzt_pfls_amt": "-4836.71476",      "ovrs_tot_pfls": "-3547254.18524",      "rlzt_erng_rt": "-82.93101266",      "tot_evlu_pfls_amt": "791913.60000000",      "tot_pftrt": "-81.74964327",      "frcr_buy_amt_smtl1": "5832.214765",      "ovrs_rlzt_pfls_amt2": "-5780841.48713",      "frcr_buy_amt_smtl2": "6970663.087128"    },    "rt_cd": "0",    "msg_cd": "KIOK0510",    "msg1": "조회가 완료되었습니다                                                           "  }
```

---
### 2. 해외주식 체결기준현재잔고

| Field | Value |
|---|---|
| Sheet | `해외주식 체결기준현재잔고` |
| Menu | [해외주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/overseas-stock/v1/trading/inquire-present-balance` |
| TR_ID (실전) | `CTRP6504R` |
| TR_ID (모의) | `VTRP6504R` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `WCRC_FRCR_DVSN_CD` | 원화외화구분코드 | string | Y | 2 | 01 : 원화   02 : 외화 |
| `NATN_CD` | 국가코드 | string | Y | 3 | 000 전체  840 미국  344 홍콩  156 중국  392 일본  704 베트남 |
| `TR_MKET_CD` | 거래시장코드 | string | Y | 2 | [Request body NATN_CD 000 설정]  00 : 전체    [Request body NATN_CD 840 설정]  00 : 전체  01 : 나스닥(NASD)  02 : 뉴욕거래소(NYSE)  03 : 미국(PINK SHEETS)  04 : 미국(OTCBB)  05 : 아멕스(AMEX)    [Request body NATN_CD 156 설정]  00 : 전체  01 : 상해B  02 : 심천B  03 : 상해A  04 : 심천A    [Request body NATN_CD 392 설정]  01 : 일본    [Request body NATN_CD 704 설정]  01 : 하노이거래  02 : 호치민거래소    [Request body NATN_CD 344 설정]  01 : 홍콩  02 : 홍콩CNY  03 : 홍콩USD |
| `INQR_DVSN_CD` | 조회구분코드 | string | Y | 2 | 00 : 전체   01 : 일반해외주식   02 : 미니스탁 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 | 0 : 성공   0 이외의 값 : 실패 |
| `msg_cd` | 응답코드 | string | Y | 8 | 응답코드 |
| `msg1` | 응답메세지 | string | Y | 80 | 응답메세지 |
| `output1` | 응답상세1 (체결기준 잔고) | array | Y |  | 체결기준현재잔고 없으면 빈값으로 출력 |
| `prdt_name` | 상품명 | string | Y | 60 | 종목명 |
| `cblc_qty13` | 잔고수량13 | string | Y | 32 | 결제보유수량 |
| `thdt_buy_ccld_qty1` | 당일매수체결수량1 | string | Y | 32 | 당일 매수 체결 완료 수량 |
| `thdt_sll_ccld_qty1` | 당일매도체결수량1 | string | Y | 32 | 당일 매도 체결 완료 수량 |
| `ccld_qty_smtl1` | 체결수량합계1 | string | Y | 32 | 체결기준 현재 보유수량 |
| `ord_psbl_qty1` | 주문가능수량1 | string | Y | 32 | 주문 가능한 주문 수량 |
| `frcr_pchs_amt` | 외화매입금액 | string | Y | 29 | 해당 종목의 외화 기준 매입금액 |
| `frcr_evlu_amt2` | 외화평가금액2 | string | Y | 30 | 해당 종목의 외화 기준 평가금액 |
| `evlu_pfls_amt2` | 평가손익금액2 | string | Y | 31 | 해당 종목의 매입금액과 평가금액의 외회기준 비교 손익 |
| `evlu_pfls_rt1` | 평가손익율1 | string | Y | 32 | 해당 종목의 평가손익을 기준으로 한 수익률 |
| `pdno` | 상품번호 | string | Y | 12 | 종목코드 |
| `bass_exrt` | 기준환율 | string | Y | 31 | 원화 평가 시 적용 환율 |
| `buy_crcy_cd` | 매수통화코드 | string | Y | 3 | USD : 미국달러  HKD : 홍콩달러  CNY : 중국위안화  JPY : 일본엔화  VND : 베트남동 |
| `ovrs_now_pric1` | 해외현재가격1 | string | Y | 29 | 해당 종목의 현재가 |
| `avg_unpr3` | 평균단가3 | string | Y | 29 | 해당 종목의 매수 평균 단가 |
| `tr_mket_name` | 거래시장명 | string | Y | 60 | 해당 종목의 거래시장명 |
| `natn_kor_name` | 국가한글명 | string | Y | 60 | 거래 국가명 |
| `pchs_rmnd_wcrc_amt` | 매입잔액원화금액 | string | Y | 19 |  |
| `thdt_buy_ccld_frcr_amt` | 당일매수체결외화금액 | object | Y | 30 | 당일 매수 외화금액  (Type: Object X String O) |
| `thdt_sll_ccld_frcr_amt` | 당일매도체결외화금액 | string | Y | 30 | 당일 매도 외화금액 |
| `unit_amt` | 단위금액 | string | Y | 19 |  |
| `std_pdno` | 표준상품번호 | string | Y | 12 |  |
| `prdt_type_cd` | 상품유형코드 | string | Y | 3 |  |
| `scts_dvsn_name` | 유가증권구분명 | string | Y | 60 |  |
| `loan_rmnd` | 대출잔액 | string | Y | 19 | 대출 미상환 금액 |
| `loan_dt` | 대출일자 | string | Y | 8 | 대출 실행일자 |
| `loan_expd_dt` | 대출만기일자 | string | Y | 8 | 대출 만기일자 |
| `ovrs_excg_cd` | 해외거래소코드 | string | Y | 4 | NASD : 나스닥  NYSE : 뉴욕  AMEX : 아멕스  SEHK : 홍콩  SHAA : 중국상해  SZAA : 중국심천  TKSE : 일본  HASE : 하노이거래소  VNSE : 호치민거래소 |
| `item_lnkg_excg_cd` | 종목연동거래소코드 | string | Y | 4 | prdt_dvsn(상품구분) : 직원용 데이터(Type: String, Length:2) |
| `output2` | 응답상세2 | array | Y |  |  |
| `crcy_cd` | 통화코드 | string | Y | 3 |  |
| `crcy_cd_name` | 통화코드명 | string | Y | 60 |  |
| `frcr_buy_amt_smtl` | 외화매수금액합계 | string | Y | 29 | 해당 통화로 매수한 종목 전체의 매수금액 |
| `frcr_sll_amt_smtl` | 외화매도금액합계 | string | Y | 29 | 해당 통화로 매도한 종목 전체의 매수금액 |
| `frcr_dncl_amt_2` | 외화예수금액2 | string | Y | 29 | 외화로 표시된 외화사용가능금액 |
| `frst_bltn_exrt` | 최초고시환율 | string | Y | 31 |  |
| `frcr_buy_mgn_amt` | 외화매수증거금액 | string | Y | 31 | 매수증거금으로 사용된 외화금액 |
| `frcr_etc_mgna` | 외화기타증거금 | string | Y | 31 |  |
| `frcr_drwg_psbl_amt_1` | 외화출금가능금액1 | string | Y | 29 | 출금가능한 외화금액 |
| `frcr_evlu_amt2` | 출금가능원화금액 | string | Y | 29 | 출금가능한 원화금액 |
| `acpl_cstd_crcy_yn` | 현지보관통화여부 | string | Y | 1 |  |
| `nxdy_frcr_drwg_psbl_amt` | 익일외화출금가능금액 | string | Y | 31 |  |
| `output3` | 응답상세3 | object | Y |  |  |
| `pchs_amt_smtl` | 매입금액합계 | string | Y | 19 | 해외유가증권 매수금액의 원화 환산 금액 |
| `evlu_amt_smtl` | 평가금액합계 | string | Y | 19 | 해외유가증권 평가금액의 원화 환산 금액 |
| `evlu_pfls_amt_smtl` | 평가손익금액합계 | string | Y | 19 | 해외유가증권 평가손익의 원화 환산 금액 |
| `dncl_amt` | 예수금액 | string | Y | 19 |  |
| `cma_evlu_amt` | CMA평가금액 | string | Y | 19 |  |
| `tot_dncl_amt` | 총예수금액 | string | Y | 19 |  |
| `etc_mgna` | 기타증거금 | string | Y | 19 |  |
| `wdrw_psbl_tot_amt` | 인출가능총금액 | string | Y | 19 |  |
| `frcr_evlu_tota` | 외화평가총액 | string | Y | 19 |  |
| `evlu_erng_rt1` | 평가수익율1 | string | Y | 31 |  |
| `pchs_amt_smtl_amt` | 매입금액합계금액 | string | Y | 19 |  |
| `evlu_amt_smtl_amt` | 평가금액합계금액 | string | Y | 19 |  |
| `tot_evlu_pfls_amt` | 총평가손익금액 | string | Y | 31 |  |
| `tot_asst_amt` | 총자산금액 | string | Y | 19 |  |
| `buy_mgn_amt` | 매수증거금액 | string | Y | 19 |  |
| `mgna_tota` | 증거금총액 | string | Y | 19 |  |
| `frcr_use_psbl_amt` | 외화사용가능금액 | string | Y | 20 |  |
| `ustl_sll_amt_smtl` | 미결제매도금액합계 | string | Y | 19 |  |
| `ustl_buy_amt_smtl` | 미결제매수금액합계 | string | Y | 19 |  |
| `tot_frcr_cblc_smtl` | 총외화잔고합계 | string | Y | 29 |  |
| `tot_loan_amt` | 총대출금액 | string | Y | 19 |  |

**Request Example:**
```
{  "CANO": "810XXXXX",  "ACNT_PRDT_CD":"01",  "WCRC_FRCR_DVSN_CD": "01",  "TR_MKET_CD": "00",  "NATN_CD": "000",  "INQR_DVSN_CD": "00"  }
```

**Response Example:**
```
{    "output1": [      {        "prdt_name": "애플",        "cblc_qty13": "40.00000000",        "thdt_buy_ccld_qty1": "0.00000000",        "thdt_sll_ccld_qty1": "0.00000000",        "ccld_qty_smtl1": "40.00000000",        "ord_psbl_qty1": "40.00000000",        "frcr_pchs_amt": "6411629.00000",        "frcr_evlu_amt2": "8491110.000000",        "evlu_pfls_amt2": "2079481.00000",        "evlu_pfls_rt1": "32.43000000",        "pdno": "AAPL",        "bass_exrt": "1212.60000000",        "buy_crcy_cd": "USD",        "ovrs_now_pric1": "212277.75600",        "avg_unpr3": "160290.7250",        "tr_mket_name": "나스닥",        "natn_kor_name": "미국",        "pchs_rmnd_wcrc_amt": "5986768",        "thdt_buy_ccld_frcr_amt": "0.000000",        "thdt_sll_ccld_frcr_amt": "0.000000",        "unit_amt": "1",        "std_pdno": "US0378331005",        "prdt_type_cd": "512",        "scts_dvsn_name": "현금",        "loan_rmnd": "0",        "loan_dt": "",        "loan_expd_dt": "",        "ovrs_excg_cd": "NASD",        "item_lnkg_excg_cd": "NAS"      },      {        "prdt_name": "테슬라",        "cblc_qty13": "5.00000000",        "thdt_buy_ccld_qty1": "0.00000000",        "thdt_sll_ccld_qty1": "0.00000000",        "ccld_qty_smtl1": "5.00000000",        "ord_psbl_qty1": "5.00000000",        "frcr_pchs_amt": "4665399.00000",        "frcr_evlu_amt2": "6616309.000000",        "evlu_pfls_amt2": "1950910.00000",        "evlu_pfls_rt1": "41.81000000",        "pdno": "TSLA",        "bass_exrt": "1212.60000000",        "buy_crcy_cd": "USD",        "ovrs_now_pric1": "1323261.87600",        "avg_unpr3": "933079.8000",        "tr_mket_name": "나스닥",        "natn_kor_name": "미국",        "pchs_rmnd_wcrc_amt": "4560861",        "thdt_buy_ccld_frcr_amt": "0.000000",        "thdt_sll_ccld_frcr_amt": "0.000000",        "unit_amt": "1",        "std_pdno": "US88160R1014",        "prdt_type_cd": "512",        "scts_dvsn_name": "현금",        "loan_rmnd": "0",        "loan_dt": "",        "loan_expd_dt": "",        "ovrs_excg_cd": "NASD",        "item_lnkg_excg_cd": "NAS"      },      {        "prdt_name": "월트디즈니",        "cblc_qty13": "24.00000000",        "thdt_buy_ccld_qty1": "0.00000000",        "thdt_sll_ccld_qty1": "0.00000000",        "ccld_qty_smtl1": "24.00000000",        "ord_psbl_qty1": "24.00000000",        "frcr_pchs_amt": "5039237.00000",        "frcr_evlu_amt2": "3946867.000000",        "evlu_pfls_amt2": "-1092370.00000",        "evlu_pfls_rt1": "-21.67000000",        "pdno": "DIS",        "bass_exrt": "1212.60000000",        "buy_crcy_cd": "USD",        "ovrs_now_pric1": "164452.81200",        "avg_unpr3": "209968.2080",        "tr_mket_name": "뉴욕거래소",        "natn_kor_name": "미국",        "pchs_rmnd_wcrc_amt": "4766780",        "thdt_buy_ccld_frcr_amt": "0.000000",        "thdt_sll_ccld_frcr_amt": "0.000000",        "unit_amt": "1",        "std_pdno": "US2546871060",        "prdt_type_cd": "513",        "scts_dvsn_name": "현금",        "loan_rmnd": "0",        "loan_dt": "",        "loan_e
```

---
### 3. 해외주식 지정가체결내역조회

| Field | Value |
|---|---|
| Sheet | `해외주식 지정가체결내역조회` |
| Menu | [해외주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/overseas-stock/v1/trading/inquire-algo-ccnl` |
| TR_ID (실전) | `TTTS6059R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 계좌번호 | string | Y | 8 | 종합계좌번호 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 상품코드 2자리 (주식계좌 : 01) |
| `ORD_DT` | 주문일자 | string | Y | 8 | 주문일자 (YYYYMMDD) |
| `ORD_GNO_BRNO` | 주문채번지점번호 | string | N | 5 | TTS6058R 조회 시 해당 주문번호(odno)의 ord_gno_brno 입력 |
| `ODNO` | 주문번호 | string | Y | 10 | 지정가주문번호 (TTTS6058R)에서 조회된 주문번호 입력 |
| `TTLZ_ICLD_YN` | 집계포함여부 | string | N | 1 |  |
| `CTX_AREA_NK200` | 연속조회키200 | string | N | 200 | 연속조회 시 사용 |
| `CTX_AREA_FK200` | 연속조회조건200 | string | N | 200 | 연속조회 시 사용 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메시지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  |  |
| `CCLD_SEQ` | 체결순번 | string | Y | 4 |  |
| `CCLD_BTWN` | 체결시간 | string | Y | 6 | HHMMSS |
| `PDNO` | 상품번호 | string | Y | 12 |  |
| `ITEM_NAME` | 종목명 | string | Y | 60 |  |
| `FT_CCLD_QTY` | FT체결수량 | string | N | 4 |  |
| `FT_CCLD_UNPR3` | FT체결단가 | string | Y | 8 |  |
| `FT_CCLD_AMT3` | FT체결금액 | string | N | 8 |  |
| `output3` | 응답상세3 | object array | Y |  |  |
| `ODNO` | 주문번호 | string | Y | 10 |  |
| `TRAD_DVSN_NAME` | 매매구분명 | string | Y | 60 |  |
| `PDNO` | 상품번호 | string | Y | 12 |  |
| `ITEM_NAME` | 종목명 | string | Y | 60 |  |
| `FT_ORD_QTY` | FT주문수량 | string | Y | 4 |  |
| `FT_ORD_UNPR3` | FT주문단가 | string | Y | 8 |  |
| `ORD_TMD` | 주문시각 | string | Y | 6 |  |
| `SPLT_BUY_ATTR_NAME` | 분할매수속성명 | string | Y | 60 |  |
| `FT_CCLD_QTY` | FT체결수량 | string | Y | 4 |  |
| `TR_CRCY` | 거래통화 | string | Y | 3 |  |
| `FT_CCLD_UNPR3` | FT체결단가 | string | Y | 8 |  |
| `FT_CCLD_AMT3` | FT체결금액 | string | Y | 8 |  |
| `CCLD_CNT` | 체결건수 | string | Y | 4 |  |

**Request Example:**
```
CANO:12345678  ACNT_PRDT_CD:01  ORD_DT:20250523  ORD_GNO_BRNO:  ODNO:0031112345  TTLZ_ICLD_YN:  CTX_AREA_NK200:  CTX_AREA_FK200:
```

**Response Example:**
```
{      "ctx_area_nk200": "                                                                                                                                                                                                        ",      "ctx_area_fk200": "20250523^^0031112345^                                                                                                                                                                                   ",      "output1": [],      "output2": {          "odno": "0031112345",          "trad_dvsn_name": "TWAP지정가매수",          "pdno": "AAPL",          "item_name": "애플",          "ft_ord_qty": "10",          "ft_ord_unpr3": "10.00000000",          "ord_tmd": "173904",          "splt_buy_attr_name": "00:00~04:00",          "ft_ccld_qty": "0",          "tr_crcy": "",          "ft_ccld_unpr3": "0.00000000",          "ft_ccld_amt3": "0.00000",          "ccld_cnt": "0"      },      "rt_cd": "0",      "msg_cd": "KIOK0560",      "msg1": "조회할 내용이 없습니다                                                          "  }
```

---
### 4. 해외주식 기간손익

| Field | Value |
|---|---|
| Sheet | `해외주식 기간손익` |
| Menu | [해외주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/overseas-stock/v1/trading/inquire-period-profit` |
| TR_ID (실전) | `TTTS3039R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `OVRS_EXCG_CD` | 해외거래소코드 | string | Y | 2 | 공란 : 전체,   NASD : 미국, SEHK : 홍콩,  SHAA : 중국, TKSE : 일본, HASE : 베트남 |
| `NATN_CD` | 국가코드 | string | Y | 2 | 공란(Default) |
| `CRCY_CD` | 통화코드 | string | Y | 2 | 공란 : 전체  USD : 미국달러, HKD : 홍콩달러,  CNY : 중국위안화,  JPY : 일본엔화, VND : 베트남동 |
| `PDNO` | 상품번호 | string | Y | 2 | 공란 : 전체 |
| `INQR_STRT_DT` | 조회시작일자 | string | Y | 2 | YYYYMMDD |
| `INQR_END_DT` | 조회종료일자 | string | Y | 2 | YYYYMMDD |
| `WCRC_FRCR_DVSN_CD` | 원화외화구분코드 | string | Y | 2 | 01 : 외화, 02 : 원화 |
| `CTX_AREA_FK200` | 연속조회검색조건200 | string | Y | 2 |  |
| `CTX_AREA_NK200` | 연속조회키200 | string | Y | 2 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `Output1` | 응답상세 | object array | Y |  | array |
| `trad_day` | 매매일 | string | Y | 8 |  |
| `ovrs_pdno` | 해외상품번호 | string | Y | 12 |  |
| `ovrs_item_name` | 해외종목명 | string | Y | 60 |  |
| `slcl_qty` | 매도청산수량 | string | Y | 10 |  |
| `pchs_avg_pric` | 매입평균가격 | string | Y | 184 |  |
| `frcr_pchs_amt1` | 외화매입금액1 | string | Y | 185 |  |
| `avg_sll_unpr` | 평균매도단가 | string | Y | 238 |  |
| `frcr_sll_amt_smtl1` | 외화매도금액합계1 | string | Y | 186 |  |
| `stck_sll_tlex` | 주식매도제비용 | string | Y | 184 |  |
| `ovrs_rlzt_pfls_amt` | 해외실현손익금액 | string | Y | 145 |  |
| `pftrt` | 수익률 | string | Y | 238 |  |
| `exrt` | 환율 | string | Y | 201 |  |
| `ovrs_excg_cd` | 해외거래소코드 | string | Y | 4 |  |
| `frst_bltn_exrt` | 최초고시환율 | string | Y | 238 |  |
| `Output2` | 응답상세2 | object | Y |  |  |
| `stck_sll_amt_smtl` | 주식매도금액합계 | string | Y | 184 | WCRC_FRCR_DVSN_CD(원화외화구분코드)가 01(외화)이고  OVRS_EXCG_CD(해외거래소코드)가 공란(전체)인 경우  출력값 무시 |
| `stck_buy_amt_smtl` | 주식매수금액합계 | string | Y | 184 | WCRC_FRCR_DVSN_CD(원화외화구분코드)가 01(외화)이고  OVRS_EXCG_CD(해외거래소코드)가 공란(전체)인 경우  출력값 무시 |
| `smtl_fee1` | 합계수수료1 | string | Y | 138 | WCRC_FRCR_DVSN_CD(원화외화구분코드)가 01(외화)이고  OVRS_EXCG_CD(해외거래소코드)가 공란(전체)인 경우  출력값 무시 |
| `excc_dfrm_amt` | 정산지급금액 | string | Y | 205 | WCRC_FRCR_DVSN_CD(원화외화구분코드)가 01(외화)이고  OVRS_EXCG_CD(해외거래소코드)가 공란(전체)인 경우  출력값 무시 |
| `ovrs_rlzt_pfls_tot_amt` | 해외실현손익총금액 | string | Y | 145 | WCRC_FRCR_DVSN_CD(원화외화구분코드)가 01(외화)이고  OVRS_EXCG_CD(해외거래소코드)가 공란(전체)인 경우  출력값 무시 |
| `tot_pftrt` | 총수익률 | string | Y | 238 |  |
| `bass_dt` | 기준일자 | string | Y | 8 |  |
| `exrt` | 환율 | string | Y | 201 |  |

---
### 5. 해외주식 매수가능금액조회

| Field | Value |
|---|---|
| Sheet | `해외주식 매수가능금액조회` |
| Menu | [해외주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/overseas-stock/v1/trading/inquire-psamount` |
| TR_ID (실전) | `TTTS3007R` |
| TR_ID (모의) | `VTTS3007R` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `OVRS_EXCG_CD` | 해외거래소코드 | string | Y | 4 | NASD : 나스닥 / NYSE : 뉴욕 / AMEX : 아멕스  SEHK : 홍콩 / SHAA : 중국상해 / SZAA : 중국심천  TKSE : 일본 / HASE : 하노이거래소 / VNSE : 호치민거래소 |
| `OVRS_ORD_UNPR` | 해외주문단가 | string | Y | 27 | 해외주문단가 (23.8) 정수부분 23자리, 소수부분 8자리 |
| `ITEM_CD` | 종목코드 | string | Y | 12 | 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세1 | object | N |  |  |
| `tr_crcy_cd` | 거래통화코드 | string | N | 3 | 18.2 |
| `ord_psbl_frcr_amt` | 주문가능외화금액 | string | N | 21 | 18.2 |
| `sll_ruse_psbl_amt` | 매도재사용가능금액 | string | N | 21 | 가능금액 산정 시 사용 |
| `ovrs_ord_psbl_amt` | 해외주문가능금액 | string | N | 21 | - 한국투자 앱 해외주식 주문화면내 "외화" 인경우 주문가능금액 |
| `max_ord_psbl_qty` | 최대주문가능수량 | string | N | 19 | - 한국투자 앱 해외주식 주문화면내 "외화" 인경우 주문가능수량  - 매수 시 수량단위 절사해서 사용      예 : (100주단위) 545 주 -> 500 주 / (10주단위) 545 주 -> 540 주 |
| `echm_af_ord_psbl_amt` | 환전이후주문가능금액 | string | N | 21 | 사용되지 않는 사항(0으로 출력) |
| `echm_af_ord_psbl_qty` | 환전이후주문가능수량 | string | N | 19 | 사용되지 않는 사항(0으로 출력) |
| `ord_psbl_qty` | 주문가능수량 | string | N | 10 | 22(20.1) |
| `exrt` | 환율 | string | N | 22 | 25(18.6) |
| `frcr_ord_psbl_amt1` | 외화주문가능금액1 | string | N | 25 | - 한국투자 앱 해외주식 주문화면내 "통합" 인경우 주문가능금액 |
| `ovrs_max_ord_psbl_qty` | 해외최대주문가능수량 | string | N | 19 | - 한국투자 앱 해외주식 주문화면내 "통합" 인경우 주문가능수량  - 매수 시 수량단위 절사해서 사용      예 : (100주단위) 545 주 -> 500 주 / (10주단위) 545 주 -> 540 주 |

**Request Example:**
```
"input": {              "ACNT_PRDT_CD": "01",              "CANO": "81019777",              "ITEM_CD": "00011",              "OVRS_EXCG_CD": "SEHK",              "OVRS_ORD_UNPR": "133.200"          }
```

**Response Example:**
```
"output": {              "echm_af_ord_psbl_amt": "0.00",              "echm_af_ord_psbl_qty": "0",              "exrt": "165.5400000000",              "frcr_ord_psbl_amt1": "955**.12",              "max_ord_psbl_qty": "744**",              "ord_psbl_frcr_amt": "999**.52",              "ord_psbl_qty": "744**",              "ovrs_max_ord_psbl_qty": "717**",              "ovrs_ord_psbl_amt": "992**.35",              "sll_ruse_psbl_amt": "0.00",              "tr_crcy_cd": "HKD"          }
```

---
### 6. 해외주식 정정취소주문

| Field | Value |
|---|---|
| Sheet | `해외주식 정정취소주문` |
| Menu | [해외주식] 주문/계좌 |
| Method | `POST` |
| URL | `/uapi/overseas-stock/v1/trading/order-rvsecncl` |
| TR_ID (실전) | `(미국 정정·취소) TTTT1004U (아시아 국가 하단 규격서 참고)` |
| TR_ID (모의) | `(미국 정정·취소) VTTT1004U (아시아 국가 하단 규격서 참고)` |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `OVRS_EXCG_CD` | 해외거래소코드 | string | Y | 4 | NASD : 나스닥   NYSE : 뉴욕   AMEX : 아멕스  SEHK : 홍콩  SHAA : 중국상해  SZAA : 중국심천  TKSE : 일본  HASE : 베트남 하노이  VNSE : 베트남 호치민 |
| `PDNO` | 상품번호 | string | Y | 12 |  |
| `ORGN_ODNO` | 원주문번호 | string | Y | 10 | 정정 또는 취소할 원주문번호  (해외주식_주문 API ouput ODNO   or 해외주식 미체결내역 API output ODNO 참고) |
| `RVSE_CNCL_DVSN_CD` | 정정취소구분코드 | string | Y | 2 | 01 : 정정   02 : 취소 |
| `ORD_QTY` | 주문수량 | string | Y | 10 |  |
| `OVRS_ORD_UNPR` | 해외주문단가 | string | Y | 32 | 취소주문 시, "0" 입력 |
| `MGCO_APTM_ODNO` | 운용사지정주문번호 | string | N | 12 |  |
| `ORD_SVR_DVSN_CD` | 주문서버구분코드 | string | N | 1 | "0"(Default) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 | 0 : 성공   0 이외의 값 : 실패 |
| `msg_cd` | 응답코드 | string | Y | 8 | 응답코드 |
| `msg1` | 응답메세지 | string | Y | 80 | 응답메세지 |
| `output` | 응답상세 | object | Y |  |  |
| `KRX_FWDG_ORD_ORGNO` | 한국거래소전송주문조직번호 | string | Y | 5 | 주문시 한국투자증권 시스템에서 지정된 영업점코드 |
| `ODNO` | 주문번호 | string | Y | 10 | 주문시 한국투자증권 시스템에서 채번된 주문번호 |
| `ORD_TMD` | 주문시각 | string | Y | 6 | 주문시각(시분초HHMMSS) |

**Request Example:**
```
{  "CANO": "810XXXXX",  "ACNT_PRDT_CD": "01",  "OVRS_EXCG_CD": "NYSE",  "PDNO": "BA",  "ORGN_ODNO": "30135009",  "RVSE_CNCL_DVSN_CD": "01",  "ORD_QTY": "1",  "OVRS_ORD_UNPR": "226.00",  "CTAC_TLNO": "",  "MGCO_APTM_ODNO": "",  "ORD_SVR_DVSN_CD": "0"  }
```

**Response Example:**
```
{    "rt_cd": "0",    "msg_cd": "APBK0013",    "msg1": "주문 전송 완료 되었습니다.",    "output": {      "KRX_FWDG_ORD_ORGNO": "01790",      "ODNO": "0000004338",      "ORD_TMD": "160710"    }  }
```

---
### 7. 해외주식 예약주문접수

| Field | Value |
|---|---|
| Sheet | `해외주식 예약주문접수` |
| Menu | [해외주식] 주문/계좌 |
| Method | `POST` |
| URL | `/uapi/overseas-stock/v1/trading/order-resv` |
| TR_ID (실전) | `(미국예약매수) TTTT3014U  (미국예약매도) TTTT3016U   (중국/홍콩/일본/베트남 예약주문) TTTS3013U` |
| TR_ID (모의) | `(미국예약매수) VTTT3014U  (미국예약매도) VTTT3016U   (중국/홍콩/일본/베트남 예약주문) VTTS3013U` |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `SLL_BUY_DVSN_CD` | 매도매수구분코드 | string | N | 2 | tr_id가 TTTS3013U(중국/홍콩/일본/베트남 예약 주문)인 경우만 사용  01 : 매도  02 : 매수 |
| `RVSE_CNCL_DVSN_CD` | 정정취소구분코드 | string | Y | 2 | tr_id가 TTTS3013U(중국/홍콩/일본/베트남 예약 주문)인 경우만 사용  00 : "매도/매수 주문"시 필수 항목  02 : 취소 |
| `PDNO` | 상품번호 | string | Y | 12 |  |
| `PRDT_TYPE_CD` | 상품유형코드 | string | Y | 3 | tr_id가 TTTS3013U(중국/홍콩/일본/베트남 예약 주문)인 경우만 사용  515 : 일본  501 : 홍콩 / 543 : 홍콩CNY / 558 : 홍콩USD  507 : 베트남 하노이거래소 / 508 : 베트남 호치민거래소  551 : 중국 상해A / 552 : 중국 심천A |
| `OVRS_EXCG_CD` | 해외거래소코드 | string | Y | 4 | NASD : 나스닥  NYSE : 뉴욕  AMEX : 아멕스  SEHK : 홍콩  SHAA : 중국상해  SZAA : 중국심천  TKSE : 일본  HASE : 베트남 하노이  VNSE : 베트남 호치민 |
| `FT_ORD_QTY` | FT주문수량 | string | Y | 10 |  |
| `FT_ORD_UNPR3` | FT주문단가3 | string | Y | 27 |  |
| `ORD_SVR_DVSN_CD` | 주문서버구분코드 | string | N | 1 | "0"(Default) |
| `RSVN_ORD_RCIT_DT` | 예약주문접수일자 | string | N | 8 | tr_id가 TTTS3013U(중국/홍콩/일본/베트남 예약 주문)인 경우만 사용 |
| `ORD_DVSN` | 주문구분 | string | N | 20 | tr_id가 TTTT3014U(미국 예약 매수 주문)인 경우만 사용  00 : 지정가  35 : TWAP  36 : VWAP    tr_id가 TTTT3016U(미국 예약 매도 주문)인 경우만 사용  00 : 지정가  31 : MOO(장개시시장가)  35 : TWAP  36 : VWAP |
| `OVRS_RSVN_ODNO` | 해외예약주문번호 | string | N | 10 | tr_id가 TTTS3013U(중국/홍콩/일본/베트남 예약 주문)인 경우만 사용 |
| `ALGO_ORD_TMD_DVSN_CD` | 알고리즘주문시간구분코드 | string | N | 2 | ※ TWAP, VWAP 주문에서만 사용. 예약주문은 시간입력 불가하여 02로 값 고정  ※ 정규장 종료 10분전까지 가능 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 | 0 : 성공   0 이외의 값 : 실패 |
| `msg_cd` | 응답코드 | string | Y | 8 | 응답코드 |
| `msg1` | 응답메세지 | string | Y | 80 | 응답메세지 |
| `output` | 응답상세 | object | Y |  |  |
| `ODNO` | 한국거래소전송주문조직번호 | string | Y | 10 | tr_id가 TTTT3016U(미국 예약 매도 주문) / TTTT3014U(미국 예약 매수 주문)인 경우만 출력 |
| `RSVN_ORD_RCIT_DT` | 예약주문접수일자 | string | Y | 8 | tr_id가 TTTS3013U(중국/홍콩/일본/베트남 예약 주문)인 경우만 출력 |
| `OVRS_RSVN_ODNO` | 해외예약주문번호 | string | Y | 10 | tr_id가 TTTS3013U(중국/홍콩/일본/베트남 예약 주문)인 경우만 출력 |

**Request Example:**
```
{  "CANO": "810XXXXX",  "ACNT_PRDT_CD":"AAPL",  "PDNO": "AAPL",  "OVRS_EXCG_CD": "NASD",  "FT_ORD_QTY": "1",  "FT_ORD_UNPR3": "148.00"  }
```

**Response Example:**
```
{    "rt_cd": "0",    "msg_cd": "APBK0013",    "msg1": "주문 전송 완료 되었습니다.",    "output": {      "ODNO": "0030138295"    }  }
```

---
### 8. 해외주식 미체결내역

| Field | Value |
|---|---|
| Sheet | `해외주식 미체결내역` |
| Menu | [해외주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/overseas-stock/v1/trading/inquire-nccs` |
| TR_ID (실전) | `TTTS3018R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `OVRS_EXCG_CD` | 해외거래소코드 | string | Y | 4 | NASD : 나스닥  NYSE : 뉴욕   AMEX : 아멕스  SEHK : 홍콩  SHAA : 중국상해  SZAA : 중국심천  TKSE : 일본  HASE : 베트남 하노이  VNSE : 베트남 호치민    * NASD 인 경우만 미국전체로 조회되며 나머지 거래소 코드는 해당 거래소만 조회됨  * 공백 입력 시 다음조회가 불가능하므로, 반드시 거래소코드 입력해야 함 |
| `SORT_SQN` | 정렬순서 | string | Y | 2 | DS : 정순  그외 : 역순    [header tr_id: TTTS3018R]  ""(공란) |
| `CTX_AREA_FK200` | 연속조회검색조건200 | string | Y | 200 | 공란 : 최초 조회시  이전 조회 Output CTX_AREA_FK200값 : 다음페이지 조회시(2번째부터) |
| `CTX_AREA_NK200` | 연속조회키200 | string | Y | 200 | 공란 : 최초 조회시  이전 조회 Output CTX_AREA_NK200값 : 다음페이지 조회시(2번째부터) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 | 0 : 성공   0 이외의 값 : 실패 |
| `msg_cd` | 응답코드 | string | Y | 8 | 응답코드 |
| `msg1` | 응답메세지 | string | Y | 80 | 응답메세지 |
| `ctx_area_fk200` | 연속조회검색조건200 | string | Y | 200 |  |
| `ctx_area_nk200` | 연속조회키200 | string | Y | 200 |  |
| `output` | 응답상세 | array | Y |  |  |
| `ord_dt` | 주문일자 | string | Y | 8 | 주문접수 일자 |
| `ord_gno_brno` | 주문채번지점번호 | string | Y | 5 | 계좌 개설 시 관리점으로 선택한 영업점의 고유번호 |
| `odno` | 주문번호 | string | Y | 10 | 접수한 주문의 일련번호 |
| `orgn_odno` | 원주문번호 | string | Y | 10 | 정정 또는 취소 대상 주문의 일련번호 |
| `pdno` | 상품번호 | string | Y | 12 | 종목코드 |
| `prdt_name` | 상품명 | string | Y | 60 | 종목명 |
| `sll_buy_dvsn_cd` | 매도매수구분코드 | string | Y | 2 | 01 : 매도  02 : 매수 |
| `sll_buy_dvsn_cd_name` | 매도매수구분코드명 | string | Y | 60 | 매수매도구분명 |
| `rvse_cncl_dvsn_cd` | 정정취소구분코드 | string | Y | 2 | 01 : 정정  02 : 취소 |
| `rvse_cncl_dvsn_cd_name` | 정정취소구분코드명 | string | Y | 60 | 정정취소구분명 |
| `rjct_rson` | 거부사유 | string | Y | 60 | 정상 처리되지 못하고 거부된 주문의 사유 |
| `rjct_rson_name` | 거부사유명 | string | Y | 60 | 정상 처리되지 못하고 거부된 주문의 사유명 |
| `ord_tmd` | 주문시각 | string | Y | 6 | 주문 접수 시간 |
| `tr_mket_name` | 거래시장명 | string | Y | 60 |  |
| `tr_crcy_cd` | 거래통화코드 | string | Y | 3 | USD : 미국달러  HKD : 홍콩달러  CNY : 중국위안화  JPY : 일본엔화  VND : 베트남동 |
| `natn_cd` | 국가코드 | string | Y | 3 |  |
| `natn_kor_name` | 국가한글명 | string | Y | 60 |  |
| `ft_ord_qty` | FT주문수량 | string | Y | 10 | 주문수량 |
| `ft_ccld_qty` | FT체결수량 | string | Y | 10 | 체결된 수량 |
| `nccs_qty` | 미체결수량 | string | Y | 10 | 미체결수량 |
| `ft_ord_unpr3` | FT주문단가3 | string | Y | 26 | 주문가격 |
| `ft_ccld_unpr3` | FT체결단가3 | string | Y | 26 | 체결된 가격 |
| `ft_ccld_amt3` | FT체결금액3 | string | Y | 23 | 체결된 금액 |
| `ovrs_excg_cd` | 해외거래소코드 | string | Y | 4 | NASD : 나스닥  NYSE : 뉴욕  AMEX : 아멕스  SEHK : 홍콩  SHAA : 중국상해  SZAA : 중국심천  TKSE : 일본  HASE : 베트남 하노이  VNSE : 베트남 호치민 |
| `prcs_stat_name` | 처리상태명 | string | Y | 60 | "" |
| `loan_type_cd` | 대출유형코드 | string | Y | 2 | 00 해당사항없음  01 자기융자일반형  03 자기융자투자형  05 유통융자일반형  06 유통융자투자형  07 자기대주  09 유통대주  10 현금  11 주식담보대출  12 수익증권담보대출  13 ELS담보대출  14 채권담보대출  15 해외주식담보대출  16 기업신용공여  31 소액자동담보대출  41 매도담보대출  42 환매자금대출  43 매입환매자금대출  44 대여매도담보대출  81 대차거래  82 법인CMA론  91 공모주청약자금대출  92 매입자금  93 미수론서비스  94 대여 |
| `loan_dt` | 대출일자 | string | Y | 8 | 대출 실행일자 |
| `usa_amk_exts_rqst_yn` | 미국애프터마켓연장신청여부 | string | Y | 1 | Y/N |
| `splt_buy_attr_name` | 분할매수속성명 | string | Y | 60 | 정규장 종료 주문 시에는 '정규장 종료', 시간 입력 시에는 from ~ to 시간 표시됨 |

**Request Example:**
```
{  "CANO": "810XXXXX",  "ACNT_PRDT_CD":"01",  "OVRS_EXCG_CD": "NYSE",  "SORT_SQN": "DS",  "CTX_AREA_FK200": "",  "CTX_AREA_NK200": ""  }
```

**Response Example:**
```
{    "ctx_area_fk200": "81055689^01^NYSE^DS^                                                                                                                                                                                    ",    "ctx_area_nk200": "                                                                                                                                                                                                        ",    "output": [      {        "ord_dt": "20220112",        "ord_gno_brno": "01790",        "odno": "0030138112",        "orgn_odno": "",        "pdno": "BA",        "prdt_name": "보잉",        "sll_buy_dvsn_cd": "02",        "sll_buy_dvsn_cd_name": "매수",        "rvse_cncl_dvsn_cd": "00",        "rvse_cncl_dvsn_cd_name": "",        "rjct_rson": "",        "rjct_rson_name": "",        "ord_tmd": "163209",        "tr_mket_name": "뉴욕거래소",        "tr_crcy_cd": "USD",        "natn_cd": "840",        "natn_kor_name": "미국",        "ft_ord_qty": "1",        "ft_ccld_qty": "0",        "nccs_qty": "1",        "ft_ord_unpr3": "200.00000000",        "ft_ccld_unpr3": "0.00000000",        "ft_ccld_amt3": "0.00000",        "ovrs_excg_cd": "NYSE",        "prcs_stat_name": "",        "loan_type_cd": "10",        "loan_dt": ""      },      {        "ord_dt": "20220112",        "ord_gno_brno": "01790",        "odno": "0030138113",        "orgn_odno": "",        "pdno": "BA",        "prdt_name": "보잉",        "sll_buy_dvsn_cd": "02",        "sll_buy_dvsn_cd_name": "매수",        "rvse_cncl_dvsn_cd": "00",        "rvse_cncl_dvsn_cd_name": "",        "rjct_rson": "",        "rjct_rson_name": "",        "ord_tmd": "163211",        "tr_mket_name": "뉴욕거래소",        "tr_crcy_cd": "USD",        "natn_cd": "840",        "natn_kor_name": "미국",        "ft_ord_qty": "1",        "ft_ccld_qty": "0",        "nccs_qty": "1",        "ft_ord_unpr3": "200.00000000",        "ft_ccld_unpr3": "0.00000000",        "ft_ccld_amt3": "0.00000",        "ovrs_excg_cd": "NYSE",        "prcs_stat_name": "",        "loan_type_cd": "10",        "loan_dt": "",        "loan_dt": ""      }    ],    "rt_cd": "0",    "msg_cd": "KIOK0510",    "msg1": "조회가 완료되었습니다                                                           "  }
```

---
### 9. 해외주식 미국주간정정취소

| Field | Value |
|---|---|
| Sheet | `해외주식 미국주간정정취소` |
| Menu | [해외주식] 주문/계좌 |
| Method | `POST` |
| URL | `/uapi/overseas-stock/v1/trading/daytime-order-rvsecncl` |
| TR_ID (실전) | `TTTS6038U` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `OVRS_EXCG_CD` | 해외거래소코드 | string | Y | 4 | NASD:나스닥 / NYSE:뉴욕 / AMEX:아멕스 |
| `PDNO` | 상품번호 | string | Y | 12 | 종목코드 |
| `ORGN_ODNO` | 원주문번호 | string | Y | 10 | '정정 또는 취소할 원주문번호(매매 TR의 주문번호)  - 해외주식 주문체결내역api (/uapi/overseas-stock/v1/trading/inquire-nccs)에서 odno(주문번호) 참조' |
| `RVSE_CNCL_DVSN_CD` | 정정취소구분코드 | string | Y | 2 | '01 : 정정   02 : 취소' |
| `ORD_QTY` | 주문수량 | string | Y | 10 |  |
| `OVRS_ORD_UNPR` | 해외주문단가 | string | Y | 32 | 소수점 포함, 1주당 가격 |
| `CTAC_TLNO` | 연락전화번호 | string | Y | 20 | " " |
| `MGCO_APTM_ODNO` | 운용사지정주문번호 | string | Y | 12 | " " |
| `ORD_SVR_DVSN_CD` | 주문서버구분코드 | string | Y | 1 | "0" |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object | N |  |  |
| `KRX_FWDG_ORD_ORGNO` | 한국거래소전송주문조직번호 | string | Y | 5 | 주문시 한국투자증권 시스템에서 지정된 영업점코드 |
| `ODNO` | 주문번호 | string | Y | 10 | 주문시 한국투자증권 시스템에서 채번된 주문번호 |
| `ORD_TMD` | 주문시각 | string | Y | 6 | 주문시각(시분초HHMMSS) |

**Request Example:**
```
{      "CANO": "12345678",      "ACNT_PRDT_CD": "01",      "OVRS_EXCG_CD": "NASD",      "PDNO": "AMZN",      "ORGN_ODNO": "0000034436",      "RVSE_CNCL_DVSN_CD": "01",      "ORD_QTY": "111",      "OVRS_ORD_UNPR": "1.9",      "CTAC_TLNO": "",      "MGCO_APTM_ODNO": "",      "ORD_SVR_DVSN_CD": "0"  }
```

**Response Example:**
```
{      "rt_cd": "0",      "msg_cd": "APBK0013",      "msg1": "주문 전송 완료 되었습니다.",      "output": {          "KRX_FWDG_ORD_ORGNO": "01790",          "ODNO": "0000034437",          "ORD_TMD": "104202"      }  }
```

---
### 10. 해외주식 주문체결내역

| Field | Value |
|---|---|
| Sheet | `해외주식 주문체결내역` |
| Menu | [해외주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/overseas-stock/v1/trading/inquire-ccnl` |
| TR_ID (실전) | `TTTS3035R` |
| TR_ID (모의) | `VTTS3035R` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `PDNO` | 상품번호 | string | Y | 12 | 전종목일 경우 "%" 입력  ※ 모의투자계좌의 경우 ""(전체 조회)만 가능 |
| `ORD_STRT_DT` | 주문시작일자 | string | Y | 8 | YYYYMMDD 형식 (현지시각 기준) |
| `ORD_END_DT` | 주문종료일자 | string | Y | 8 | YYYYMMDD 형식 (현지시각 기준) |
| `SLL_BUY_DVSN` | 매도매수구분 | string | Y | 2 | 00 : 전체   01 : 매도   02 : 매수  ※ 모의투자계좌의 경우 "00"(전체 조회)만 가능 |
| `CCLD_NCCS_DVSN` | 체결미체결구분 | string | Y | 2 | 00 : 전체   01 : 체결   02 : 미체결  ※ 모의투자계좌의 경우 "00"(전체 조회)만 가능 |
| `OVRS_EXCG_CD` | 해외거래소코드 | string | Y | 4 | 전종목일 경우 "%" 입력  NASD : 미국시장 전체(나스닥, 뉴욕, 아멕스)  NYSE : 뉴욕  AMEX : 아멕스  SEHK : 홍콩   SHAA : 중국상해  SZAA : 중국심천  TKSE : 일본  HASE : 베트남 하노이  VNSE : 베트남 호치민  ※ 모의투자계좌의 경우 ""(전체 조회)만 가능 |
| `SORT_SQN` | 정렬순서 | string | Y | 2 | DS : 정순  AS : 역순   ※ 모의투자계좌의 경우 정렬순서 사용불가(Default : DS(정순)) |
| `ORD_DT` | 주문일자 | string | Y | 8 | "" (Null 값 설정) |
| `ORD_GNO_BRNO` | 주문채번지점번호 | string | Y | 5 | "" (Null 값 설정) |
| `ODNO` | 주문번호 | string | Y | 10 | "" (Null 값 설정)  ※ 주문번호로 검색 불가능합니다. 반드시 ""(Null 값 설정) 바랍니다. |
| `CTX_AREA_NK200` | 연속조회키200 | string | Y | 200 | 공란 : 최초 조회시  이전 조회 Output CTX_AREA_NK200값 : 다음페이지 조회시(2번째부터) |
| `CTX_AREA_FK200` | 연속조회검색조건200 | string | Y | 200 | 공란 : 최초 조회시  이전 조회 Output CTX_AREA_FK200값 : 다음페이지 조회시(2번째부터) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 | 0 : 성공   0 이외의 값 : 실패 |
| `msg_cd` | 응답코드 | string | Y | 8 | 응답코드 |
| `msg1` | 응답메세지 | string | Y | 80 | 응답메세지 |
| `ctx_area_fk200` | 연속조회검색조건200 | string | Y | 200 |  |
| `ctx_area_nk200` | 연속조회키200 | string | Y | 200 |  |
| `output` | 응답상세 | array | Y |  |  |
| `ord_dt` | 주문일자 | string | Y | 8 | 주문접수 일자 (현지시각 기준) |
| `ord_gno_brno` | 주문채번지점번호 | string | Y | 5 | 계좌 개설 시 관리점으로 선택한 영업점의 고유번호 |
| `odno` | 주문번호 | string | Y | 10 | 접수한 주문의 일련번호  ※ 정정취소주문 시, 해당 값 odno(주문번호) 넣어서 사용 |
| `orgn_odno` | 원주문번호 | string | Y | 10 | 정정 또는 취소 대상 주문의 일련번호 |
| `sll_buy_dvsn_cd` | 매도매수구분코드 | string | Y | 2 | 01 : 매도   02 : 매수 |
| `sll_buy_dvsn_cd_name` | 매도매수구분코드명 | string | Y | 60 |  |
| `rvse_cncl_dvsn` | 정정취소구분 | string | Y | 2 | 01 : 정정   02 : 취소 |
| `rvse_cncl_dvsn_name` | 정정취소구분명 | string | Y | 60 |  |
| `pdno` | 상품번호 | string | Y | 12 |  |
| `prdt_name` | 상품명 | string | Y | 60 |  |
| `ft_ord_qty` | FT주문수량 | string | Y | 10 | 주문수량 |
| `ft_ord_unpr3` | FT주문단가3 | string | Y | 26 | 주문가격 |
| `ft_ccld_qty` | FT체결수량 | string | Y | 10 | 체결된 수량 |
| `ft_ccld_unpr3` | FT체결단가3 | string | Y | 26 | 체결된 가격 |
| `ft_ccld_amt3` | FT체결금액3 | string | Y | 23 | 체결된 금액 |
| `nccs_qty` | 미체결수량 | string | Y | 10 | 미체결수량 |
| `prcs_stat_name` | 처리상태명 | string | Y | 60 | 완료, 거부, 전송 |
| `rjct_rson` | 거부사유 | string | Y | 60 | 정상 처리되지 못하고 거부된 주문의 사유 |
| `rjct_rson_name` | 거부사유명 | string | Y | 60 |  |
| `ord_tmd` | 주문시각 | string | Y | 6 | 주문 접수 시간 |
| `tr_mket_name` | 거래시장명 | string | Y | 60 |  |
| `tr_natn` | 거래국가 | string | Y | 3 |  |
| `tr_natn_name` | 거래국가명 | string | Y | 3 |  |
| `ovrs_excg_cd` | 해외거래소코드 | string | Y | 4 | NASD : 나스닥  NYSE : 뉴욕  AMEX : 아멕스  SEHK : 홍콩   SHAA : 중국상해  SZAA : 중국심천  TKSE : 일본  HASE : 베트남 하노이  VNSE : 베트남 호치민 |
| `tr_crcy_cd` | 거래통화코드 | string | Y | 60 |  |
| `dmst_ord_dt` | 국내주문일자 | string | Y | 8 |  |
| `thco_ord_tmd` | 당사주문시각 | string | Y | 6 |  |
| `loan_type_cd` | 대출유형코드 | string | Y | 2 | 00 : 해당사항없음  01 : 자기융자일반형  03 : 자기융자투자형  05 : 유통융자일반형  06 : 유통융자투자형  07 : 자기대주  09 : 유통대주  10 : 현금  11 : 주식담보대출  12 : 수익증권담보대출  13 : ELS담보대출  14 : 채권담보대출  15 : 해외주식담보대출  16 : 기업신용공여  31 : 소액자동담보대출  41 : 매도담보대출  42 : 환매자금대출  43 : 매입환매자금대출  44 : 대여매도담보대출  81 : 대차거래  82 : 법인CMA론  91 : 공모주청약자금대출  92 : 매입자금  93 : 미수론서비스  94 : 대여 |
| `loan_dt` | 대출일자 | string | Y | 8 |  |
| `mdia_dvsn_name` | 매체구분명 | string | Y | 60 | ex) OpenAPI, 모바일 |
| `usa_amk_exts_rqst_yn` | 미국애프터마켓연장신청여부 | string | Y | 1 | Y/N |
| `splt_buy_attr_name` | 분할매수/매도속성명 | string | Y | 60 | 정규장 종료 주문 시에는 '정규장 종료', 시간 입력 시에는 from ~ to 시간 표시 |

**Request Example:**
```
{  	"CANO": "810XXXXX",  	"ACNT_PRDT_CD":"01",  	"PDNO": ""%,  	"ORD_STRT_DT": "20211027",  	"ORD_END_DT": "20211027",  	"SLL_BUY_DVSN": "00",  	"CCLD_NCCS_DVSN": "00",  	"OVRS_EXCG_CD": "%",  	"SORT_SQN": "DS",  	"ORD_DT": "",  	"ORD_GNO_BRNO":"02111",  	"ODNO": "",  	"CTX_AREA_NK200": "",  	"CTX_AREA_FK200": ""  }
```

**Response Example:**
```
{    "ctx_area_nk200": "                                                                                                                                                                                                        ",    "ctx_area_fk200": "12345678^01^^20211027^20211027^00^00^NASD^^                                                                                                                                                             ",    "output": {        "ord_dt": "",        "ord_gno_brno": "",        "odno": "",        "orgn_odno": "",        "sll_buy_dvsn_cd": "",        "sll_buy_dvsn_cd_name": "",        "rvse_cncl_dvsn": "",        "rvse_cncl_dvsn_name": "",        "pdno": "",        "prdt_name": "",        "ft_ord_qty": "0",        "ft_ord_unpr3": "0.00000000",        "ft_ccld_qty": "0",        "ft_ccld_unpr3": "0.00000000",        "ft_ccld_amt3": "0.00000",        "nccs_qty": "0",        "prcs_stat_name": "",        "rjct_rson": "",        "rjct_rson_name": "",        "ord_tmd": "",        "tr_mket_name": "",        "tr_natn": "",        "tr_natn_name": "",        "ovrs_excg_cd": "",        "tr_crcy_cd": "",        "dmst_ord_dt": "",        "thco_ord_tmd": "",        "loan_type_cd": "",        "loan_dt": "",        "mdia_dvsn_name": "OpenAPI",        "usa_amk_exts_rqst_yn": "N",        "splt_buy_attr_name": "00:00~04:00"    },    "rt_cd": "0",    "msg_cd": "KIOK0560",    "msg1": "조회할 내용이 없습니다                                                          "  }
```

---
### 11. 해외주식 결제기준잔고

| Field | Value |
|---|---|
| Sheet | `해외주식 결제기준잔고` |
| Menu | [해외주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/overseas-stock/v1/trading/inquire-paymt-stdr-balance` |
| TR_ID (실전) | `CTRP6010R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 |  |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 |  |
| `BASS_DT` | 기준일자 | string | Y | 8 |  |
| `WCRC_FRCR_DVSN_CD` | 원화외화구분코드 | string | Y | 2 | 01(원화기준),02(외화기준) |
| `INQR_DVSN_CD` | 조회구분코드 | string | Y | 2 | 00(전체), 01(일반), 02(미니스탁) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `pdno` | 상품번호 | string | Y | 12 |  |
| `prdt_name` | 상품명 | string | Y | 60 |  |
| `cblc_qty13` | 잔고수량13 | string | Y | 238 |  |
| `ord_psbl_qty1` | 주문가능수량1 | string | Y | 238 |  |
| `avg_unpr3` | 평균단가3 | string | Y | 244 |  |
| `ovrs_now_pric1` | 해외현재가격1 | string | Y | 235 |  |
| `frcr_pchs_amt` | 외화매입금액 | string | Y | 235 |  |
| `frcr_evlu_amt2` | 외화평가금액2 | string | Y | 236 |  |
| `evlu_pfls_amt2` | 평가손익금액2 | string | Y | 255 |  |
| `bass_exrt` | 기준환율 | string | Y | 238 |  |
| `oprt_dtl_dtime` | 조작상세일시 | string | Y | 17 |  |
| `buy_crcy_cd` | 매수통화코드 | string | Y | 3 |  |
| `thdt_sll_ccld_qty1` | 당일매도체결수량1 | string | Y | 238 |  |
| `thdt_buy_ccld_qty1` | 당일매수체결수량1 | string | Y | 238 |  |
| `evlu_pfls_rt1` | 평가손익율1 | string | Y | 238 |  |
| `tr_mket_name` | 거래시장명 | string | Y | 60 |  |
| `natn_kor_name` | 국가한글명 | string | Y | 60 |  |
| `std_pdno` | 표준상품번호 | string | Y | 12 |  |
| `mgge_qty` | 담보수량 | string | Y | 19 |  |
| `loan_rmnd` | 대출잔액 | string | Y | 19 |  |
| `prdt_type_cd` | 상품유형코드 | string | Y | 3 |  |
| `ovrs_excg_cd` | 해외거래소코드 | string | Y | 4 |  |
| `scts_dvsn_name` | 유가증권구분명 | string | Y | 60 |  |
| `ldng_cblc_qty` | 대여잔고수량 | string | Y | 19 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `crcy_cd` | 통화코드 | string | Y | 3 |  |
| `crcy_cd_name` | 통화코드명 | string | Y | 60 |  |
| `frcr_dncl_amt_2` | 외화예수금액2 | string | Y | 236 |  |
| `frst_bltn_exrt` | 최초고시환율 | string | Y | 238 |  |
| `frcr_evlu_amt2` | 외화평가금액2 | string | Y | 236 |  |
| `output3` | 응답상세 | object | Y |  |  |
| `pchs_amt_smtl_amt` | 매입금액합계금액 | string | Y | 19 |  |
| `tot_evlu_pfls_amt` | 총평가손익금액 | string | Y | 238 |  |
| `evlu_erng_rt1` | 평가수익율1 | string | Y | 201 |  |
| `tot_dncl_amt` | 총예수금액 | string | Y | 19 |  |
| `wcrc_evlu_amt_smtl` | 원화평가금액합계 | string | Y | 236 |  |
| `tot_asst_amt2` | 총자산금액2 | string | Y | 236 |  |
| `frcr_cblc_wcrc_evlu_amt_smtl` | 외화잔고원화평가금액합계 | string | Y | 236 |  |
| `tot_loan_amt` | 총대출금액 | string | Y | 19 |  |
| `tot_ldng_evlu_amt` | 총대여평가금액 | string | Y | 9 |  |

**Request Example:**
```
CANO:12345678  ACNT_PRDT_CD:01  BASS_DT:20240524  WCRC_FRCR_DVSN_CD:01  INQR_DVSN_CD:00
```

**Response Example:**
```
{      "output1": [          {              "pdno": "ACVA",              "prdt_name": "ACV 옥션스",              "cblc_qty13": "5.00000000",              "ord_psbl_qty1": "5.00000000",              "avg_unpr3": "11137.2000",              "ovrs_now_pric1": "26065.48600",              "frcr_pchs_amt": "55686.00000",              "frcr_evlu_amt2": "130327.000000",              "evlu_pfls_amt2": "74641.00000",              "bass_exrt": "1365.40000000",              "oprt_dtl_dtime": "20240525104030326",              "buy_crcy_cd": "USD",              "thdt_sll_ccld_qty1": "0.00000000",              "thdt_buy_ccld_qty1": "0.00000000",              "evlu_pfls_rt1": "134.03000000",              "tr_mket_name": "나스닥",              "natn_kor_name": "미국",              "std_pdno": "US00091G1040",              "mgge_qty": "0",              "loan_rmnd": "0",              "prdt_type_cd": "512",              "ovrs_excg_cd": "NASD",              "scts_dvsn_name": "현금"          },          {              "pdno": "DLPN",              "prdt_name": "돌핀 엔터테인먼트",              "cblc_qty13": "1.00000000",              "ord_psbl_qty1": "1.00000000",              "avg_unpr3": "2279.0000",              "ovrs_now_pric1": "1529.24800",              "frcr_pchs_amt": "2279.00000",              "frcr_evlu_amt2": "1529.000000",              "evlu_pfls_amt2": "-750.00000",              "bass_exrt": "1365.40000000",              "oprt_dtl_dtime": "20240525104052328",              "buy_crcy_cd": "USD",              "thdt_sll_ccld_qty1": "0.00000000",              "thdt_buy_ccld_qty1": "0.00000000",              "evlu_pfls_rt1": "-32.90000000",              "tr_mket_name": "나스닥",              "natn_kor_name": "미국",              "std_pdno": "US25686H2094",              "mgge_qty": "0",              "loan_rmnd": "0",              "prdt_type_cd": "512",              "ovrs_excg_cd": "NASD",              "scts_dvsn_name": "현금"          },          {              "pdno": "NIO",              "prdt_name": "니오(ADR)",              "cblc_qty13": "1.00000000",              "ord_psbl_qty1": "1.00000000",              "avg_unpr3": "14316.0000",              "ovrs_now_pric1": "6854.30800",              "frcr_pchs_amt": "14316.00000",              "frcr_evlu_amt2": "6854.000000",              "evlu_pfls_amt2": "-7462.00000",              "bass_exrt": "1365.40000000",              "oprt_dtl_dtime": "20240528185338061",              "buy_crcy_cd": "USD",              "thdt_sll_ccld_qty1": "0.00000000",              "thdt_buy_ccld_qty1": "0.00000000",              "evlu_pfls_rt1": "-52.12000000",              "tr_mket_name": "뉴욕거래소",              "natn_kor_name": "미국",              "std_pdno": "US62914V1061",              "mgge_qty": "0",              "loan_rmnd": "0",              "prdt_type_cd": "513",              "ovrs_excg_cd": "NYSE",              "scts_dvsn_name": "현금"          },          {              "pdno": "6731",              "prdt_name": "[6731]픽셀라",              "cblc_qty13": "4.00000000"
```

---
### 12. 해외주식 일별거래내역

| Field | Value |
|---|---|
| Sheet | `해외주식 일별거래내역` |
| Menu | [해외주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/overseas-stock/v1/trading/inquire-period-trans` |
| TR_ID (실전) | `CTOS4001R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 |  |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 |  |
| `ERLM_STRT_DT` | 등록시작일자 | string | Y | 8 | 입력날짜 ~ (ex) 20240420) |
| `ERLM_END_DT` | 등록종료일자 | string | Y | 8 | ~입력날짜 (ex) 20240520) |
| `OVRS_EXCG_CD` | 해외거래소코드 | string | Y | 4 | 공백 |
| `PDNO` | 상품번호 | string | Y | 12 | 공백 (전체조회), 개별종목 조회는 상품번호입력 |
| `SLL_BUY_DVSN_CD` | 매도매수구분코드 | string | Y | 2 | 00(전체), 01(매도), 02(매수) |
| `LOAN_DVSN_CD` | 대출구분코드 | string | Y | 2 | 공백 |
| `CTX_AREA_FK100` | 연속조회검색조건100 | string | Y | 100 | 공백 |
| `CTX_AREA_NK100` | 연속조회키100 | string | Y | 100 | 공백 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `ctx_area_fk100` | 연속조회검색조건100 | string | Y | 100 |  |
| `ctx_area_nk100` | 연속조회키100 | string | Y | 100 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `trad_dt` | 매매일자 | string | Y | 8 |  |
| `sttl_dt` | 결제일자 | string | Y | 8 |  |
| `sll_buy_dvsn_cd` | 매도매수구분코드 | string | Y | 2 |  |
| `sll_buy_dvsn_name` | 매도매수구분명 | string | Y | 4 |  |
| `pdno` | 상품번호 | string | Y | 12 |  |
| `ovrs_item_name` | 해외종목명 | string | Y | 60 |  |
| `ccld_qty` | 체결수량 | string | Y | 10 |  |
| `amt_unit_ccld_qty` | 금액단위체결수량 | string | Y | 188 |  |
| `ft_ccld_unpr2` | FT체결단가2 | string | Y | 238 |  |
| `ovrs_stck_ccld_unpr` | 해외주식체결단가 | string | Y | 238 |  |
| `tr_frcr_amt2` | 거래외화금액2 | string | Y | 236 |  |
| `tr_amt` | 거래금액 | string | Y | 19 |  |
| `frcr_excc_amt_1` | 외화정산금액1 | string | Y | 236 |  |
| `wcrc_excc_amt` | 원화정산금액 | string | Y | 19 |  |
| `dmst_frcr_fee1` | 국내외화수수료1 | string | Y | 235 |  |
| `frcr_fee1` | 외화수수료1 | string | Y | 236 |  |
| `dmst_wcrc_fee` | 국내원화수수료 | string | Y | 19 |  |
| `ovrs_wcrc_fee` | 해외원화수수료 | string | Y | 19 |  |
| `crcy_cd` | 통화코드 | string | Y | 3 |  |
| `std_pdno` | 표준상품번호 | string | Y | 12 |  |
| `erlm_exrt` | 등록환율 | string | Y | 238 |  |
| `loan_dvsn_cd` | 대출구분코드 | string | Y | 2 |  |
| `loan_dvsn_name` | 대출구분명 | string | Y | 60 |  |
| `output2` | 응답상세 | object | Y |  |  |
| `frcr_buy_amt_smtl` | 외화매수금액합계 | string | Y | 236 |  |
| `frcr_sll_amt_smtl` | 외화매도금액합계 | string | Y | 236 |  |
| `dmst_fee_smtl` | 국내수수료합계 | string | Y | 256 |  |
| `ovrs_fee_smtl` | 해외수수료합계 | string | Y | 236 |  |

**Request Example:**
```
CANO:12345678  ACNT_PRDT_CD:01  ERLM_STRT_DT:20240101  ERLM_END_DT:20240528  OVRS_EXCG_CD:  PDNO:  SLL_BUY_DVSN_CD:00  LOAN_DVSN_CD:  CTX_AREA_FK100:  CTX_AREA_NK100:
```

**Response Example:**
```
{      "ctx_area_fk100": "12345678!^01!^20240101!^20240528!^!^                                                                ",      "ctx_area_nk100": "                                                                                                    ",      "output1": [          {              "trad_dt": "20240116",              "sttl_dt": "20240118",              "sll_buy_dvsn_cd": "01",              "sll_buy_dvsn_name": "매도",              "pdno": "AAPL",              "ovrs_item_name": "애플",              "ccld_qty": "1",              "amt_unit_ccld_qty": "1.00000000",              "ft_ccld_unpr2": "2.94000000",              "ovrs_stck_ccld_unpr": "0.00000000",              "tr_frcr_amt2": "2.940000",              "tr_amt": "0",              "frcr_excc_amt_1": "2.940000",              "wcrc_excc_amt": "0",              "dmst_frcr_fee1": "0.00000",              "frcr_fee1": "0.000000",              "dmst_wcrc_fee": "0",              "ovrs_wcrc_fee": "0",              "crcy_cd": "USD",              "std_pdno": "US0378331005",              "erlm_exrt": "0.00000000",              "loan_dvsn_cd": "01",              "loan_dvsn_name": "현금"          },          {              "trad_dt": "20240116",              "sttl_dt": "20240118",              "sll_buy_dvsn_cd": "02",              "sll_buy_dvsn_name": "매수",              "pdno": "USAS",              "ovrs_item_name": "아메리카스 골드 앤드 실버",              "ccld_qty": "1",              "amt_unit_ccld_qty": "1.00000000",              "ft_ccld_unpr2": "0.62000000",              "ovrs_stck_ccld_unpr": "0.00000000",              "tr_frcr_amt2": "0.620000",              "tr_amt": "0",              "frcr_excc_amt_1": "0.620000",              "wcrc_excc_amt": "0",              "dmst_frcr_fee1": "0.00000",              "frcr_fee1": "0.000000",              "dmst_wcrc_fee": "0",              "ovrs_wcrc_fee": "0",              "crcy_cd": "USD",              "std_pdno": "CA03062D1006",              "erlm_exrt": "0.00000000",              "loan_dvsn_cd": "01",              "loan_dvsn_name": "현금"          },          {              "trad_dt": "20240118",              "sttl_dt": "20240122",              "sll_buy_dvsn_cd": "02",              "sll_buy_dvsn_name": "매수",              "pdno": "TSLA",              "ovrs_item_name": "테슬라",              "ccld_qty": "1",              "amt_unit_ccld_qty": "1.00000000",              "ft_ccld_unpr2": "12.20000000",              "ovrs_stck_ccld_unpr": "16283.34000000",              "tr_frcr_amt2": "12.200000",              "tr_amt": "16283",              "frcr_excc_amt_1": "12.200000",              "wcrc_excc_amt": "16283",              "dmst_frcr_fee1": "0.00000",              "frcr_fee1": "0.000000",              "dmst_wcrc_fee": "0",              "ovrs_wcrc_fee": "0",              "crcy_cd": "USD",              "std_pdno": "US88160R1014",              "erlm_exrt": "1334.70000000",              "loan_dvsn_cd": "01",              "loan_dvsn_name": "현금"          },          {         
```

---
### 13. 해외주식 미국주간주문

| Field | Value |
|---|---|
| Sheet | `해외주식 미국주간주문` |
| Menu | [해외주식] 주문/계좌 |
| Method | `POST` |
| URL | `/uapi/overseas-stock/v1/trading/daytime-order` |
| TR_ID (실전) | `(주간매수) TTTS6036U (주간매도) TTTS6037U` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `OVRS_EXCG_CD` | 해외거래소코드 | string | Y | 4 | NASD:나스닥 / NYSE:뉴욕 / AMEX:아멕스 |
| `PDNO` | 상품번호 | string | Y | 12 | 종목코드 |
| `ORD_QTY` | 주문수량 | string | Y | 10 | 해외거래소 별 최소 주문수량 및 주문단위 확인 필요 |
| `OVRS_ORD_UNPR` | 해외주문단가 | string | Y | 32 | 소수점 포함, 1주당 가격  * 시장가의 경우 1주당 가격을 공란으로 비우지 않음 "0"으로 입력 |
| `CTAC_TLNO` | 연락전화번호 | string | N | 20 | " " |
| `MGCO_APTM_ODNO` | 운용사지정주문번호 | string | N | 12 | " " |
| `ORD_SVR_DVSN_CD` | 주문서버구분코드 | string | Y | 1 | "0" |
| `ORD_DVSN` | 주문구분 | string | Y | 2 | [미국 매수/매도 주문]   00 : 지정가   * 주간거래는 지정가만 가능 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object | N |  |  |
| `KRX_FWDG_ORD_ORGNO` | 한국거래소전송주문조직번호 | string | Y | 5 | 주문시 한국투자증권 시스템에서 지정된 영업점코드 |
| `ODNO` | 주문번호 | string | Y | 10 | 주문시 한국투자증권 시스템에서 채번된 주문번호 |
| `ORD_TMD` | 주문시각 | string | Y | 6 | 주문시각(시분초HHMMSS) |

---
### 14. 해외주식 예약주문조회

| Field | Value |
|---|---|
| Sheet | `해외주식 예약주문조회` |
| Menu | [해외주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/overseas-stock/v1/trading/order-resv-list` |
| TR_ID (실전) | `(미국) TTTT3039R (일본/중국/홍콩/베트남) TTTS3014R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `INQR_STRT_DT` | 조회시작일자 | string | Y | 8 | 조회시작일자(YYYYMMDD) |
| `INQR_END_DT` | 조회종료일자 | string | Y | 8 | 조회종료일자(YYYYMMDD) |
| `INQR_DVSN_CD` | 조회구분코드 | string | Y | 2 | 00 : 전체  01 : 일반해외주식   02 : 미니스탁 |
| `PRDT_TYPE_CD` | 상품유형코드 | string | Y | 3 | [tr_id=TTTT3039R인 경우]  공백 입력 시 미국주식 전체조회  [tr_id=TTTS3014R인 경우]  공백 입력 시 아시아주식 전체조회    512 : 미국 나스닥 / 513 : 미국 뉴욕거래소 / 529 : 미국 아멕스   515 : 일본  501 : 홍콩 / 543 : 홍콩CNY / 558 : 홍콩USD  507 : 베트남 하노이거래소 / 508 : 베트남 호치민거래소  551 : 중국 상해A / 552 : 중국 심천A |
| `OVRS_EXCG_CD` | 해외거래소코드 | string | Y | 4 | [tr_id=TTTT3039R인 경우]  공백 입력 시 미국주식 전체조회  [tr_id=TTTS3014R인 경우]  공백 입력 시 아시아주식 전체조회    NASD : 나스닥 / NYSE : 뉴욕 / AMEX : 아멕스  SEHK : 홍콩 / SHAA : 중국상해 / SZAA : 중국심천  TKSE : 일본 / HASE : 하노이거래소 / VNSE : 호치민거래소 |
| `CTX_AREA_FK200` | 연속조회검색조건200 | string | Y | 200 | 공란 : 최초 조회시  이전 조회 Output CTX_AREA_FK200값 : 다음페이지 조회시(2번째부터) |
| `CTX_AREA_NK200` | 연속조회키200 | string | Y | 200 | 공란 : 최초 조회시  이전 조회 Output CTX_AREA_NK200값 : 다음페이지 조회시(2번째부터) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `ctx_area_fk200` | 연속조회검색조건200 | string | Y | 200 |  |
| `ctx_area_nk200` | 연속조회키200 | string | Y | 200 |  |
| `output` | 응답상세1 | object | N |  |  |
| `cncl_yn` | 취소여부 | string | N | 1 |  |
| `rsvn_ord_rcit_dt` | 예약주문접수일자 | string | N | 8 |  |
| `ovrs_rsvn_odno` | 해외예약주문번호 | string | N | 10 |  |
| `ord_dt` | 주문일자 | string | N | 8 |  |
| `ord_gno_brno` | 주문채번지점번호 | string | N | 5 |  |
| `odno` | 주문번호 | string | N | 10 |  |
| `sll_buy_dvsn_cd` | 매도매수구분코드 | string | N | 2 |  |
| `sll_buy_dvsn_cd_name` | 매도매수구분명 | string | N | 60 |  |
| `ovrs_rsvn_ord_stat_cd` | 해외예약주문상태코드 | string | N | 2 |  |
| `ovrs_rsvn_ord_stat_cd_name` | 해외예약주문상태코드명 | string | N | 60 |  |
| `pdno` | 상품번호 | string | N | 12 |  |
| `prdt_type_cd` | 상품유형코드 | string | N | 3 |  |
| `prdt_name` | 상품명 | string | N | 60 |  |
| `ord_rcit_tmd` | 주문접수시각 | string | N | 6 |  |
| `ord_fwdg_tmd` | 주문전송시각 | string | N | 6 |  |
| `tr_dvsn_name` | 거래구분명 | string | N | 60 |  |
| `ovrs_excg_cd` | 해외거래소코드 | string | N | 4 |  |
| `tr_mket_name` | 거래시장명 | string | N | 60 |  |
| `ord_stfno` | 주문직원번호 | string | N | 6 |  |
| `ft_ord_qty` | FT주문수량 | string | N | 10 |  |
| `ft_ord_unpr3` | FT주문단가3 | string | N | 27 |  |
| `ft_ccld_qty` | FT체결수량 | string | N | 10 |  |
| `nprc_rson_text` | 미처리사유내용 | string | N | 500 |  |
| `splt_buy_attr_name` | 분할매수속성명 | string | N | 60 | 정규장 종료 주문 시에는 '정규장 종료', 시간 입력 시에는 from ~ to 시간 표시 |

**Request Example:**
```
"input": {              "ACNT_PRDT_CD": "01",              "CANO": "12345678",              "CTX_AREA_FK200": "",              "CTX_AREA_NK200": "",              "INQR_DVSN_CD": "00",              "INQR_END_DT": "20220709",              "INQR_STRT_DT": "20220705",              "OVRS_EXCG_CD": "SEHK",              "PRDT_TYPE_CD": "501"          }
```

**Response Example:**
```
{      "ctx_area_fk200": "12345678^01^20220809^20220830^00^                                                                                                                                                                       ",      "ctx_area_nk200": "                                                                                                                                                                                                        ",      "output": [          {              "cncl_yn": "N",              "rsvn_ord_rcit_dt": "20250523",              "ovrs_rsvn_odno": "0031111234",              "ord_dt": "",              "ord_gno_brno": "",              "odno": "",              "sll_buy_dvsn_cd": "02",              "sll_buy_dvsn_cd_name": "TWAP지정가매수",              "ovrs_rsvn_ord_stat_cd": "01",              "ovrs_rsvn_ord_stat_cd_name": "접수",              "pdno": "AAPL",              "prdt_name": "애플",              "ord_rcit_tmd": "161928",              "ord_fwdg_tmd": "",              "tr_dvsn_name": "접수",              "ovrs_excg_cd": "NASD",              "tr_mket_name": "NASDAQ",              "ord_stfno": "999999",              "ft_ord_qty": "100",              "ft_ord_unpr3": "150.00000000",              "ft_ccld_qty": "0",              "ft_ccld_unpr3": "0.00000000",              "nprc_rson_text": "",              "splt_buy_attr_name": "00:00~04:00"          },...      ],      "rt_cd": "0",      "msg_cd": "KIOK0510",      "msg1": "조회가 완료되었습니다                                                           "  }
```

---
### 15. 해외주식 주문

| Field | Value |
|---|---|
| Sheet | `해외주식 주문` |
| Menu | [해외주식] 주문/계좌 |
| Method | `POST` |
| URL | `/uapi/overseas-stock/v1/trading/order` |
| TR_ID (실전) | `(미국매수) TTTT1002U  (미국매도) TTTT1006U (아시아 국가 하단 규격서 참고)` |
| TR_ID (모의) | `(미국매수) VTTT1002U  (미국매도) VTTT1001U  (아시아 국가 하단 규격서 참고)` |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `OVRS_EXCG_CD` | 해외거래소코드 | string | Y | 4 | NASD : 나스닥  NYSE : 뉴욕  AMEX : 아멕스  SEHK : 홍콩  SHAA : 중국상해  SZAA : 중국심천  TKSE : 일본  HASE : 베트남 하노이  VNSE : 베트남 호치민 |
| `PDNO` | 상품번호 | string | Y | 12 | 종목코드 |
| `ORD_QTY` | 주문수량 | string | Y | 10 | 주문수량 (해외거래소 별 최소 주문수량 및 주문단위 확인 필요) |
| `OVRS_ORD_UNPR` | 해외주문단가 | string | Y | 31 | 1주당 가격  * 시장가의 경우 1주당 가격을 공란으로 비우지 않음 "0"으로 입력 |
| `CTAC_TLNO` | 연락전화번호 | string | N | 20 |  |
| `MGCO_APTM_ODNO` | 운용사지정주문번호 | string | N | 12 |  |
| `SLL_TYPE` | 판매유형 | string | N | 2 | 제거 : 매수  00 : 매도 |
| `ORD_SVR_DVSN_CD` | 주문서버구분코드 | string | Y | 1 | "0"(Default) |
| `ORD_DVSN` | 주문구분 | string | Y | 2 | [Header tr_id TTTT1002U(미국 매수 주문)]  00 : 지정가  32 : LOO(장개시지정가)  34 : LOC(장마감지정가)  35 : TWAP (시간가중평균)  36 : VWAP (거래량가중평균)  * 모의투자 VTTT1002U(미국 매수 주문)로는 00:지정가만 가능  * TWAP, VWAP 주문은 분할시간 주문 입력 필수    [Header tr_id TTTT1006U(미국 매도 주문)]  00 : 지정가  31 : MOO(장개시시장가)  32 : LOO(장개시지정가)  33 : MOC(장마감시장가)  34 : LOC(장마감지정가)  35 : TWAP (시간가중평균)  36 : VWAP (거래량가중평균)  * 모의투자 VTTT1006U(미국 매도 주문)로는 00:지정가만 가능  * TWAP, VWAP 주문은 분할시간 주문 입력 필수    [Header tr_id TTTS1001U(홍콩 매도 주문)]  00 : 지정가  50 : 단주지정가  * 모의투자 VTTS1001U(홍콩 매도 주문)로는 00:지정가만 가능    [그외 tr_id]  제거    ※ TWAP, VWAP 주문은 정정 불가 |
| `START_TIME` | 시작시간 | string | N | 6 | ※ TWAP, VWAP 주문유형이고 알고리즘주문시간구분코드가 00일때 사용  ※ YYMMDD 형태로 입력  ※ 시간 입력 시 정규장 종료 5분전까지 입력 가능 |
| `END_TIME` | 종료시간 | string | N | 6 | ※ TWAP, VWAP 주문유형이고 알고리즘주문시간구분코드가 00일때 사용  ※ YYMMDD 형태로 입력  ※ 시간 입력 시 정규장 종료 5분전까지 입력 가능 |
| `ALGO_ORD_TMD_DVSN_CD` | 알고리즘주문시간구분코드 | string | N | 2 | 00 : 분할주문 시간 직접입력 , 02 : 정규장 종료시까지 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 | 0 : 성공   0 이외의 값 : 실패 |
| `msg_cd` | 응답코드 | string | Y | 8 | 응답코드 |
| `msg1` | 응답메세지 | string | Y | 80 | 응답메세지 |
| `output` | 응답상세 | object | Y |  |  |
| `KRX_FWDG_ORD_ORGNO` | 한국거래소전송주문조직번호 | string | Y | 5 | 주문시 한국투자증권 시스템에서 지정된 영업점코드 |
| `ODNO` | 주문번호 | string | Y | 10 | 주문시 한국투자증권 시스템에서 채번된 주문번호 |
| `ORD_TMD` | 주문시각 | string | Y | 6 | 주문시각(시분초HHMMSS) |

**Request Example:**
```
{  "CANO": "810XXXXX",  "ACNT_PRDT_CD": "01",  "OVRS_EXCG_CD": "NASD",  "PDNO": "AAPL",  "ORD_QTY": "1",  "OVRS_ORD_UNPR": "145.00",  "CTAC_TLNO": "",  "MGCO_APTM_ODNO": "",  "ORD_SVR_DVSN_CD": "0",  "ORD_DVSN": "00"  }
```

**Response Example:**
```
{    "rt_cd": "0",    "msg_cd": "APBK0013",    "msg1": "주문 전송 완료 되었습니다.",    "output": {      "KRX_FWDG_ORD_ORGNO": "01790",      "ODNO": "0000004336",      "ORD_TMD": "160524"    }  }
```

---
### 16. 해외주식 예약주문접수취소

| Field | Value |
|---|---|
| Sheet | `해외주식 예약주문접수취소` |
| Menu | [해외주식] 주문/계좌 |
| Method | `POST` |
| URL | `/uapi/overseas-stock/v1/trading/order-resv-ccnl` |
| TR_ID (실전) | `(미국 예약주문 취소접수) TTTT3017U (아시아국가 미제공)` |
| TR_ID (모의) | `(미국 예약주문 취소접수) VTTT3017U (아시아국가 미제공)` |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `RSYN_ORD_RCIT_DT` | 해외주문접수일자 | string | Y | 8 |  |
| `OVRS_RSVN_ODNO` | 해외예약주문번호 | string | Y | 10 | 해외주식_예약주문접수 API Output ODNO(주문번호) 참고 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 | 0 : 성공   0 이외의 값 : 실패 |
| `msg_cd` | 응답코드 | string | Y | 8 | 응답코드 |
| `msg1` | 응답메세지 | string | Y | 80 | 응답메세지 |
| `output` | 응답상세 | object | Y |  |  |
| `OVRS_RSVN_ODNO` | 해외예약주문번호 | string | Y | 10 |  |

**Request Example:**
```
{  "CANO": "810XXXXX",  "ACNT_PRDT_CD": "01",  "RSVN_ORD_RCIT_DT": "20211124",  "OVRS_RSVN_ODNO": "30135682"  }
```

**Response Example:**
```
{    "rt_cd": "0",    "msg_cd": "APBK1711",    "msg1": "취소주문이 접수되었습니다.",    "output": {      "OVRS_RSVN_ODNO": "0030138295"    }  }
```

---
### 17. 해외주식 지정가주문번호조회

| Field | Value |
|---|---|
| Sheet | `해외주식 지정가주문번호조회` |
| Menu | [해외주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/overseas-stock/v1/trading/algo-ordno` |
| TR_ID (실전) | `TTTS6058R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `TRAD_DT` | 거래일자 | string | Y | 8 | YYYYMMDD |
| `CANO` | 계좌번호 | string | Y | 8 | 종합계좌번호 (8자리) |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌상품코드 (2자리) : 주식계좌는 01 |
| `CTX_AREA_NK200` | 연속조회키200 | string | N | 200 |  |
| `CTX_AREA_FK200` | 연속조회조건200 | string | N | 200 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `output` | 응답상세 | object array | Y |  |  |
| `odno` | 주문번호 | string | Y | 10 |  |
| `trad_dvsn_name` | 매매구분명 | string | Y | 60 |  |
| `pdno` | 상품번호 | string | Y | 12 |  |
| `item_name` | 종목명 | string | Y | 60 |  |
| `ft_ord_qty` | FT주문수량 | string | Y | 4 |  |
| `ft_ord_unpr3` | FT주문단가 | string | Y | 8 |  |
| `splt_buy_attr_name` | 분할매수속성명 | string | Y | 60 |  |
| `ft_ccld_qty` | FT체결수량 | string | Y | 4 |  |
| `ord_gno_brno` | 주문채번지점번호 | string | N | 5 |  |
| `rt_cd` | 성공 실패 여부 | string | Y | 1 | 0 : 성공  0 이외의 값 : 실패 |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `ctx_area_fk200` | 연속조회검색조건200 | string | Y | 200 |  |
| `ctx_area_nk200` | 연속조회키200 | string | Y | 200 |  |

**Request Example:**
```
CANO:12345678  ACNT_PRDT_CD:01  TRAD_DT:20250523  CTX_AREA_NK200:  CTX_AREA_FK200:
```

**Response Example:**
```
{      "ctx_area_nk200": "                                                                                                                                                                                                        ",      "ctx_area_fk200": "20250523^12345678^01^                                                                                                                                                                                   ",      "output": [],      "rt_cd": "0",      "msg_cd": "KIOK0560",      "msg1": "조회할 내용이 없습니다                                                          "  }
```

---
### 18. 해외증거금 통화별조회

| Field | Value |
|---|---|
| Sheet | `해외증거금 통화별조회` |
| Menu | [해외주식] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/overseas-stock/v1/trading/foreign-margin` |
| TR_ID (실전) | `TTTC2101R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 |  |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `natn_name` | 국가명 | string | Y | 60 |  |
| `crcy_cd` | 통화코드 | string | Y | 3 |  |
| `frcr_dncl_amt1` | 외화예수금액 | string | Y | 186 |  |
| `ustl_buy_amt` | 미결제매수금액 | string | Y | 182 |  |
| `ustl_sll_amt` | 미결제매도금액 | string | Y | 182 |  |
| `frcr_rcvb_amt` | 외화미수금액 | string | Y | 182 |  |
| `frcr_mgn_amt` | 외화증거금액 | string | Y | 186 |  |
| `frcr_gnrl_ord_psbl_amt` | 외화일반주문가능금액 | string | Y | 182 |  |
| `frcr_ord_psbl_amt1` | 외화주문가능금액 | string | Y | 186 | 원화주문가능환산금액 |
| `itgr_ord_psbl_amt` | 통합주문가능금액 | string | Y | 182 |  |
| `bass_exrt` | 기준환율 | string | Y | 238 |  |

**Request Example:**
```
CANO:12345678  ACNT_PRDT_CD:01
```

**Response Example:**
```
{      "output": [          {              "natn_name": "미국",              "crcy_cd": "USD",              "frcr_dncl_amt1": "698.190000",              "ustl_buy_amt": "0.00",              "ustl_sll_amt": "0.00",              "frcr_rcvb_amt": "0.00",              "frcr_mgn_amt": "0.000000",              "frcr_gnrl_ord_psbl_amt": "694.37",              "frcr_ord_psbl_amt1": "0.000000",              "itgr_ord_psbl_amt": "1094.52",              "bass_exrt": "1349.40000000"          },          {              "natn_name": "홍콩",              "crcy_cd": "HKD",              "frcr_dncl_amt1": "0.000000",              "ustl_buy_amt": "0.00",              "ustl_sll_amt": "0.00",              "frcr_rcvb_amt": "0.00",              "frcr_mgn_amt": "0.000000",              "frcr_gnrl_ord_psbl_amt": "0.00",              "frcr_ord_psbl_amt1": "0.000000",              "itgr_ord_psbl_amt": "8247.35",              "bass_exrt": "172.97000000"          },          {              "natn_name": "홍콩",              "crcy_cd": "CNY",              "frcr_dncl_amt1": "1459.110000",              "ustl_buy_amt": "0.00",              "ustl_sll_amt": "0.00",              "frcr_rcvb_amt": "0.00",              "frcr_mgn_amt": "0.000000",              "frcr_gnrl_ord_psbl_amt": "0.00",              "frcr_ord_psbl_amt1": "0.000000",              "itgr_ord_psbl_amt": "7705.45",              "bass_exrt": "186.89000000"          },          {              "natn_name": "중화인민공화국",              "crcy_cd": "CNY",              "frcr_dncl_amt1": "1459.110000",              "ustl_buy_amt": "0.00",              "ustl_sll_amt": "0.00",              "frcr_rcvb_amt": "0.00",              "frcr_mgn_amt": "0.000000",              "frcr_gnrl_ord_psbl_amt": "1448.97",              "frcr_ord_psbl_amt1": "0.000000",              "itgr_ord_psbl_amt": "7713.10",              "bass_exrt": "186.89000000"          },          {              "natn_name": "일본",              "crcy_cd": "JPY",              "frcr_dncl_amt1": "0.000000",              "ustl_buy_amt": "0.00",              "ustl_sll_amt": "0.00",              "frcr_rcvb_amt": "0.00",              "frcr_mgn_amt": "0.000000",              "frcr_gnrl_ord_psbl_amt": "0.00",              "frcr_ord_psbl_amt1": "0.000000",              "itgr_ord_psbl_amt": "164359.92",              "bass_exrt": "8.68370000"          },          {              "natn_name": "베트남",              "crcy_cd": "VND",              "frcr_dncl_amt1": "377568.000000",              "ustl_buy_amt": "0.00",              "ustl_sll_amt": "0.00",              "frcr_rcvb_amt": "0.00",              "frcr_mgn_amt": "0.000000",              "frcr_gnrl_ord_psbl_amt": "0.00",              "frcr_ord_psbl_amt1": "0.000000",              "itgr_ord_psbl_amt": "0.00",              "bass_exrt": "0.00000000"          },          {              "natn_name": "네덜란드",              "crcy_cd": "USD",              "frcr_dncl_amt1": "698.190000",              "ustl_buy_amt": "0.00",              "ustl_sll_amt": "0
```

---
### 19. 해외주식 체결추이

| Field | Value |
|---|---|
| Sheet | `해외주식 체결추이` |
| Menu | [해외주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-price/v1/quotations/inquire-ccnl` |
| TR_ID (실전) | `HHDFS76200300` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `EXCD` | 거래소명 | string | Y | 4 | 'NYS : 뉴욕, NAS : 나스닥,  AMS : 아멕스   HKS : 홍콩, SHS : 상해 , SZS : 심천  HSX : 호치민, HNX : 하노이  TSE : 도쿄 ' |
| `AUTH` | 사용자권한정보 | string | Y | 32 | 공백 |
| `KEYB` | NEXT KEY BUFF | string | Y | 32 | 공백 |
| `TDAY` | 당일전일구분 | string | Y | 1 | 0:전일, 1:당일 |
| `SYMB` | 종목코드 | string | Y | 16 | 해외종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `khms` | 한국기준시간 | string | Y | 6 |  |
| `last` | 체결가 | string | Y | 12 |  |
| `sign` | 기호 | string | Y | 1 |  |
| `diff` | 대비 | string | Y | 12 |  |
| `rate` | 등락율 | string | Y | 12 |  |
| `evol` | 체결량 | string | Y | 10 |  |
| `tvol` | 거래량 | string | Y | 14 |  |
| `mtyp` | 시장구분 | string | Y | 1 | 0: 장중 1:장전 2:장후 |
| `pbid` | 매수호가 | string | Y | 12 |  |
| `pask` | 매도호가 | string | Y | 12 |  |
| `vpow` | 체결강도 | string | Y | 10 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `rsym` | 실시간조회종목코드 | string | Y | 16 |  |
| `ZDIV` | 소수점자리수 | string | Y | 1 |  |
| `NREC` | Record Count | string | Y | 4 |  |

**Request Example:**
```
AUTH:  EXCD:NAS  SYMB:AAPL  TDAY:0  KEYB:
```

**Response Example:**
```
{      "output1": [          {              "khms": "085957",              "last": "195.2000",              "sign": "5",              "diff": "3.2200",              "rate": "-1.62",              "evol": "30",              "tvol": "29159135",              "mtyp": "",              "pbid": "195.1500",              "pask": "195.6000",              "vpow": "71.66"          },          {              "khms": "085957",              "last": "195.2000",              "sign": "5",              "diff": "3.2200",              "rate": "-1.62",              "evol": "10",              "tvol": "29159105",              "mtyp": "",              "pbid": "195.1500",              "pask": "195.6000",              "vpow": "71.66"          },...          {              "khms": "085505",              "last": "195.2700",              "sign": "5",              "diff": "3.1500",              "rate": "-1.59",              "evol": "50",              "tvol": "29155328",              "mtyp": "",              "pbid": "195.2300",              "pask": "195.3000",              "vpow": "71.67"          }      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 20. 해외주식 기간별시세

| Field | Value |
|---|---|
| Sheet | `해외주식 기간별시세` |
| Menu | [해외주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-price/v1/quotations/dailyprice` |
| TR_ID (실전) | `HHDFS76240000` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `AUTH` | 사용자권한정보 | string | Y | 32 | "" (Null 값 설정) |
| `EXCD` | 거래소코드 | string | Y | 4 | HKS : 홍콩  NYS : 뉴욕  NAS : 나스닥  AMS : 아멕스  TSE : 도쿄  SHS : 상해  SZS : 심천  SHI : 상해지수  SZI : 심천지수  HSX : 호치민  HNX : 하노이 |
| `SYMB` | 종목코드 | string | Y | 16 | 종목코드 (ex. TSLA) |
| `GUBN` | 일/주/월구분 | string | Y | 1 | 0 : 일  1 : 주  2 : 월 |
| `BYMD` | 조회기준일자 | string | Y | 8 | 조회기준일자(YYYYMMDD)  ※ 공란 설정 시, 기준일 오늘 날짜로 설정 |
| `MODP` | 수정주가반영여부 | string | Y | 1 | 0 : 미반영  1 : 반영 |
| `KEYB` | NEXT KEY BUFF | string | N | 1 | 응답시 다음값이 있으면 값이 셋팅되어 있으므로 다음 조회시 응답값 그대로 셋팅 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 | 0 : 성공   0 이외의 값 : 실패 |
| `msg_cd` | 응답코드 | string | Y | 8 | 응답코드 |
| `msg1` | 응답메세지 | string | Y | 80 | 응답메세지 |
| `output1` | 응답상세1 | object | Y |  |  |
| `rsym` | 실시간조회종목코드 | string | Y | 16 | D+시장구분(3자리)+종목코드  예) DNASAAPL : D+NAS(나스닥)+AAPL(애플)  [시장구분]  NYS : 뉴욕, NAS : 나스닥, AMS : 아멕스 ,  TSE : 도쿄, HKS : 홍콩,  SHS : 상해, SZS : 심천  HSX : 호치민, HNX : 하노이 |
| `zdiv` | 소수점자리수 | string | Y | 1 |  |
| `nrec` | 전일종가 | string | Y | 12 |  |
| `output2` | 응답상세2 | object array | Y |  |  |
| `xymd` | 일자(YYYYMMDD) | string | Y | 8 |  |
| `clos` | 종가 | string | Y | 12 | 해당 일자의 종가 |
| `sign` | 대비기호 | string | Y | 1 | 1 : 상한  2 : 상승  3 : 보합  4 : 하한  5 : 하락 |
| `diff` | 대비 | string | Y | 12 | 해당 일자의 종가와 해당 전일 종가의 차이 (해당일 종가-해당 전일 종가) |
| `rate` | 등락율 | string | Y | 12 | 해당 전일 대비 / 해당일 종가 * 100 |
| `open` | 시가 | string | Y | 12 | 해당일 최초 거래가격 |
| `high` | 고가 | string | Y | 12 | 해당일 가장 높은 거래가격 |
| `low` | 저가 | string | Y | 12 | 해당일 가장 낮은 거래가격 |
| `tvol` | 거래량 | string | Y | 14 | 해당일 거래량 |
| `tamt` | 거래대금 | string | Y | 14 | 해당일 거래대금 |
| `pbid` | 매수호가 | string | Y | 12 | 마지막 체결이 발생한 시점의 매수호가  * 해당 일자 거래량 0인 경우 값이 수신되지 않음 |
| `vbid` | 매수호가잔량 | string | Y | 10 | * 해당 일자 거래량 0인 경우 값이 수신되지 않음 |
| `pask` | 매도호가 | string | Y | 12 | 마지막 체결이 발생한 시점의 매도호가  * 해당 일자 거래량 0인 경우 값이 수신되지 않음 |
| `vask` | 매도호가잔량 | string | Y | 10 | * 해당 일자 거래량 0인 경우 값이 수신되지 않음 |

**Request Example:**
```
{  "AUTH": "",  "EXCD": "NAS",  "SYMB": "TSLA",  "GUBN": "0",  "BYMD": "",  "MODP": "0"  }
```

**Response Example:**
```
{    "output1": {      "rsym": "DNASTSLA",      "zdiv": "4",      "nrec": "100"    },    "output2": [      {        "xymd": "20220406",        "clos": "1045.7600",        "sign": "5",        "diff": "45.5000",        "rate": "-4.17",        "open": "1073.4700",        "high": "1079.0000",        "low": "1027.7000",        "tvol": "29782845",        "tamt": "31190274312",        "pbid": "1042.8900",        "vbid": "7",        "pask": "1043.2200",        "vask": "1"      },      {        "xymd": "20220405",        "clos": "1091.2600",        "sign": "5",        "diff": "54.1900",        "rate": "-4.73",        "open": "1136.3000",        "high": "1152.8700",        "low": "1087.3000",        "tvol": "26691673",        "tamt": "29742125077",        "pbid": "1090.0000",        "vbid": "100",        "pask": "1090.5000",        "vask": "100"      },      {        "xymd": "20220404",        "clos": "1145.4500",        "sign": "2",        "diff": "60.8600",        "rate": "+5.61",        "open": "1089.3800",        "high": "1149.9100",        "low": "1072.5300",        "tvol": "27392567",        "tamt": "30743176589",        "pbid": "1143.3000",        "vbid": "300",        "pask": "1143.6000",        "vask": "100"      },      {        "xymd": "20220401",        "clos": "1084.5900",        "sign": "2",        "diff": "6.9900",        "rate": "+0.65",        "open": "1081.1500",        "high": "1094.7500",        "low": "1066.6400",        "tvol": "18087741",        "tamt": "19558845872",        "pbid": "1090.0100",        "vbid": "100",        "pask": "1090.7500",        "vask": "100"      },      {        "xymd": "20220331",        "clos": "1077.6000",        "sign": "5",        "diff": "16.3900",        "rate": "-1.50",        "open": "1094.5700",        "high": "1103.1399",        "low": "1076.6410",        "tvol": "16330919",        "tamt": "17799070958",        "pbid": "1079.2900",        "vbid": "100",        "pask": "1079.8000",        "vask": "400"      },      {        "xymd": "20220330",        "clos": "1093.9900",        "sign": "5",        "diff": "5.5800",        "rate": "-0.51",        "open": "1091.1700",        "high": "1113.9500",        "low": "1084.0000",        "tvol": "19955002",        "tamt": "21921529520",        "pbid": "1095.0100",        "vbid": "1000",        "pask": "1095.4900",        "vask": "100"      },      {        "xymd": "20220329",        "clos": "1099.5700",        "sign": "2",        "diff": "7.7300",        "rate": "+0.71",        "open": "1107.9900",        "high": "1114.7700",        "low": "1073.1100",        "tvol": "24538273",        "tamt": "26908896769",        "pbid": "1096.0000",        "vbid": "700",        "pask": "1096.8800",        "vask": "700"      },      {        "xymd": "20220328",        "clos": "1091.8400",        "sign": "2",        "diff": "81.2000",        "rate": "+8.03",        "open": "1065.1000",        "high": "1097.8799",        "low": "1053.6000",        "tvol": "34168693",        "t
```

---
### 21. 해외결제일자조회

| Field | Value |
|---|---|
| Sheet | `해외결제일자조회` |
| Menu | [해외주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-stock/v1/quotations/countries-holiday` |
| TR_ID (실전) | `CTOS5011R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `TRAD_DT` | 기준일자 | string | Y | 8 | 기준일자(YYYYMMDD) |
| `CTX_AREA_NK` | 연속조회키 | string | Y | 20 | 공백으로 입력 |
| `CTX_AREA_FK` | 연속조회검색조건 | string | Y | 20 | 공백으로 입력 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세1 | object | Y |  |  |
| `prdt_type_cd` | 상품유형코드 | string | Y | 3 | 512  미국 나스닥 / 513  미국 뉴욕거래소 / 529  미국 아멕스   515  일본  501  홍콩 / 543  홍콩CNY / 558  홍콩USD  507  베트남 하노이거래소 / 508  베트남 호치민거래소  551  중국 상해A / 552  중국 심천A |
| `tr_natn_cd` | 거래국가코드 | string | Y | 3 | 840 미국 / 392 일본 / 344 홍콩  704 베트남 / 156 중국 |
| `tr_natn_name` | 거래국가명 | string | Y | 60 |  |
| `natn_eng_abrv_cd` | 국가영문약어코드 | string | Y | 2 | US 미국 / JP 일본 / HK 홍콩  VN 베트남 / CN 중국 |
| `tr_mket_cd` | 거래시장코드 | string | Y | 2 |  |
| `tr_mket_name` | 거래시장명 | string | Y | 60 |  |
| `acpl_sttl_dt` | 현지결제일자 | string | Y | 8 | 현지결제일자(YYYYMMDD) |
| `dmst_sttl_dt` | 국내결제일자 | string | Y | 8 | 국내결제일자(YYYYMMDD) |

**Request Example:**
```
{      "TRAD_DT":"20221227",      "CTX_AREA_NK":"",      "CTX_AREA_FK":""  }
```

**Response Example:**
```
{      "ctx_area_fk": "20221227            ",      "ctx_area_nk": "                    ",      "output": [          {              "prdt_type_cd": "507",              "tr_natn_cd": "704",              "tr_natn_name": "베트남",              "natn_eng_abrv_cd": "VN",              "tr_mket_cd": "01",              "tr_mket_name": "하노이거래소",              "acpl_sttl_dt": "20221229",              "dmst_sttl_dt": "20221229"          },          {              "prdt_type_cd": "508",              "tr_natn_cd": "704",              "tr_natn_name": "베트남",              "natn_eng_abrv_cd": "VN",              "tr_mket_cd": "02",              "tr_mket_name": "호치민거래소",              "acpl_sttl_dt": "20221229",              "dmst_sttl_dt": "20221229"          },          {              "prdt_type_cd": "512",              "tr_natn_cd": "840",              "tr_natn_name": "미국",              "natn_eng_abrv_cd": "US",              "tr_mket_cd": "01",              "tr_mket_name": "나스닥",              "acpl_sttl_dt": "20221229",              "dmst_sttl_dt": "20221230"          },          {              "prdt_type_cd": "513",              "tr_natn_cd": "840",              "tr_natn_name": "미국",              "natn_eng_abrv_cd": "US",              "tr_mket_cd": "02",              "tr_mket_name": "뉴욕거래소",              "acpl_sttl_dt": "20221229",              "dmst_sttl_dt": "20221230"          },          {              "prdt_type_cd": "515",              "tr_natn_cd": "392",              "tr_natn_name": "일본",              "natn_eng_abrv_cd": "JP",              "tr_mket_cd": "01",              "tr_mket_name": "일본",              "acpl_sttl_dt": "20221229",              "dmst_sttl_dt": "20221229"          },          {              "prdt_type_cd": "527",              "tr_natn_cd": "840",              "tr_natn_name": "미국",              "natn_eng_abrv_cd": "US",              "tr_mket_cd": "03",              "tr_mket_name": "미국",              "acpl_sttl_dt": "20221229",              "dmst_sttl_dt": "20221230"          },          {              "prdt_type_cd": "528",              "tr_natn_cd": "840",              "tr_natn_name": "미국",              "natn_eng_abrv_cd": "US",              "tr_mket_cd": "04",              "tr_mket_name": "미국",              "acpl_sttl_dt": "20221229",              "dmst_sttl_dt": "20221230"          },          {              "prdt_type_cd": "529",              "tr_natn_cd": "840",              "tr_natn_name": "미국",              "natn_eng_abrv_cd": "US",              "tr_mket_cd": "05",              "tr_mket_name": "아멕스",              "acpl_sttl_dt": "20221229",              "dmst_sttl_dt": "20221230"          },          {              "prdt_type_cd": "556",              "tr_natn_cd": "704",              "tr_natn_name": "베트남",              "natn_eng_abrv_cd": "VN",              "tr_mket_cd": "03",              "tr_mket_name": "업콤거래소",              "acpl_sttl_dt": "20221229",              "dmst_sttl_dt": "20221229"          }      ],      "rt_cd": "0",     
```

---
### 22. 해외주식 현재체결가

| Field | Value |
|---|---|
| Sheet | `해외주식 현재체결가` |
| Menu | [해외주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-price/v1/quotations/price` |
| TR_ID (실전) | `HHDFS00000300` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `AUTH` | 사용자권한정보 | string | Y | 32 | "" (Null 값 설정) |
| `EXCD` | 거래소코드 | string | Y | 4 | HKS : 홍콩  NYS : 뉴욕  NAS : 나스닥  AMS : 아멕스  TSE : 도쿄  SHS : 상해  SZS : 심천  SHI : 상해지수  SZI : 심천지수  HSX : 호치민  HNX : 하노이  BAY : 뉴욕(주간)  BAQ : 나스닥(주간)  BAA : 아멕스(주간) |
| `SYMB` | 종목코드 | string | Y | 16 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 | 0 : 성공   0 이외의 값 : 실패 |
| `msg_cd` | 응답코드 | string | Y | 8 | 응답코드 |
| `msg1` | 응답메세지 | string | Y | 80 | 응답메세지 |
| `output` | 응답상세 | object | Y |  |  |
| `rsym` | 실시간조회종목코드 | string | Y | 16 | D+시장구분(3자리)+종목코드  예) DNASAAPL : D+NAS(나스닥)+AAPL(애플)  [시장구분]  NYS : 뉴욕, NAS : 나스닥, AMS : 아멕스 ,  TSE : 도쿄, HKS : 홍콩,  SHS : 상해, SZS : 심천  HSX : 호치민, HNX : 하노이 |
| `zdiv` | 소수점자리수 | string | Y | 1 |  |
| `base` | 전일종가 | string | Y | 12 | 전일의 종가 |
| `pvol` | 전일거래량 | string | Y | 14 | 전일의 거래량 |
| `last` | 현재가 | string | Y | 12 | 당일 조회시점의 현재 가격 |
| `sign` | 대비기호 | string | Y | 1 | 1 : 상한  2 : 상승  3 : 보합  4 : 하한  5 : 하락 |
| `diff` | 대비 | string | Y | 12 | 전일 종가와 당일 현재가의 차이 (당일 현재가-전일 종가) |
| `rate` | 등락율 | string | Y | 12 | 전일 대비 / 당일 현재가 * 100 |
| `tvol` | 거래량 | string | Y | 14 | 당일 조회시점까지 전체 거래량 |
| `tamt` | 거래대금 | string | Y | 14 | 당일 조회시점까지 전체 거래금액 |
| `ordy` | 매수가능여부 | string | Y | 20 | 매수주문 가능 종목 여부 |

**Request Example:**
```
{  "AUTH": "",  "EXCD": "NAS",  "SYMB": "TSLA"  }
```

**Response Example:**
```
{    "output": {      "rsym": "DNASTSLA",      "zdiv": "4",      "base": "1091.2600",      "pvol": "26691673",      "last": "1091.2600",      "sign": "0",      "diff": "0.0000",      "rate": " 0.00",      "tvol": "0",      "tamt": "0",      "ordy": "매도불가"    },    "rt_cd": "0",    "msg_cd": "MCA00000",    "msg1": "정상처리 되었습니다."  }
```

---
### 23. 해외주식 복수종목 시세조회

| Field | Value |
|---|---|
| Sheet | `해외주식 복수종목 시세조회` |
| Menu | [해외주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-price/v1/quotations/multprice` |
| TR_ID (실전) | `HHDFS76220000` |
| TR_ID (모의) | `미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `AUTH` | 사용자권한정보 | string | Y | 32 | 공백 입력 필수 |
| `NREC` | 종목요청개수 | string | Y | 4 | 최대 10 |
| `EXCD_01 ~ 10` | 거래소코드 | string | Y | 4 | HKS : 홍콩  NYS : 뉴욕  NAS : 나스닥  AMS : 아멕스  TSE : 도쿄  SHS : 상해  SZS : 심천  SHI : 상해지수  SZI : 심천지수  HSX : 호치민  HNX : 하노이  BAY : 뉴욕(주간)  BAQ : 나스닥(주간)  BAA : 아멕스(주간) |
| `SYMB_01 ~ 10` | 종목코드 | string | Y | 16 | API 문서 -> 종목정보파일 -> 마스터 파일 참조 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object | Y |  |  |
| `nrec` | Output 개수 | string | Y | 4 |  |
| `output2` | 응답상세 | object array | Y |  | Array |
| `rsym` | 실시간조회심볼 | string | Y | 16 |  |
| `excd` | 거래소코드 | string | Y | 4 |  |
| `symb` | 종목코드 | string | Y | 16 |  |
| `knam` | 종목명 | string | Y | 48 |  |
| `exnm` | 거래소명 | string | Y | 20 |  |
| `nnam` | 국가명 | string | Y | 20 |  |
| `stat1` | 실 지 휴 정 재 | string | Y | 4 |  |
| `stat2` | 실시간 지연15분 휴장 거래정지 거래재개 | string | Y | 16 |  |
| `zdiv` | 소수점자리수 | string | Y | 1 |  |
| `last` | Last Price | string | Y | 12 |  |
| `sign` | 대비기호 | string | Y | 1 |  |
| `diff` | 대비 | string | Y | 12 |  |
| `rate` | 등락율 | string | Y | 12 |  |
| `open` | 시가 | string | Y | 12 |  |
| `high` | 고가 | string | Y | 12 |  |
| `low` | 저가 | string | Y | 12 |  |
| `pbid` | Bid Price | string | Y | 12 |  |
| `pask` | Ask Price | string | Y | 12 |  |
| `vbid` | 매수호가잔량 | string | Y | 10 |  |
| `vask` | 매도호가잔량 | string | Y | 10 |  |
| `bvol` | 매수호가총잔량 | string | Y | 10 |  |
| `avol` | 매도호가총잔량 | string | Y | 10 |  |
| `evol` | 체결량 | string | Y | 10 |  |
| `tvol` | 거래량 | string | Y | 14 |  |
| `tamt` | 거래대금 | string | Y | 14 |  |
| `powx` | 체결강도 | string | Y | 10 |  |
| `xhms` | 현지기준시간(HHMMSS) | string | Y | 6 |  |
| `khms` | 한국기준시간(HHMMSS) | string | Y | 6 |  |
| `curr` | 통화코드 | string | Y | 4 |  |
| `base` | Base Price | string | Y | 12 |  |
| `pvol` | Previous Volume | string | Y | 14 |  |
| `pamt` | 전일거래대금 | string | Y | 14 |  |
| `popen` | 전일시가 | string | Y | 12 |  |
| `phigh` | 전일고가 | string | Y | 12 |  |
| `plow` | 전일저가 | string | Y | 12 |  |
| `shar` | 상장주수 | string | Y | 16 |  |
| `mcap` | 자본금 | string | Y | 16 |  |
| `tomv` | 시가총액 | string | Y | 16 |  |
| `h52p` | 52주최고가 | string | Y | 12 |  |
| `l52p` | 52주최저가 | string | Y | 12 |  |
| `h52d` | 52주최고일자 | string | Y | 8 |  |
| `l52d` | 52주최저일자 | string | Y | 8 |  |
| `hanp` | High Anual Price | string | Y | 12 |  |
| `lanp` | Low Anual Price | string | Y | 12 |  |
| `hand` | 연중최고일자 | string | Y | 8 |  |
| `land` | 연중최저일자 | string | Y | 8 |  |
| `bnit` | 매매단위 | string | Y | 6 |  |
| `t_xprc` | 원환산당일가격 | string | Y | 12 |  |

---
### 24. 해외주식조건검색

| Field | Value |
|---|---|
| Sheet | `해외주식조건검색` |
| Menu | [해외주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-price/v1/quotations/inquire-search` |
| TR_ID (실전) | `HHDFS76410000` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `AUTH` | 사용자권한정보 | string | Y | 32 | "" (Null 값 설정) |
| `EXCD` | 거래소코드 | string | Y | 4 | NYS : 뉴욕, NAS : 나스닥,  AMS : 아멕스   HKS : 홍콩, SHS : 상해 , SZS : 심천  HSX : 호치민, HNX : 하노이  TSE : 도쿄 |
| `CO_YN_PRICECUR` | 현재가선택조건 | string | N | 1 | 해당조건 사용시(1), 미사용시 필수항목아님 |
| `CO_ST_PRICECUR` | 현재가시작범위가 | string | N | 12 | 단위: 각국통화(JPY, USD, HKD, CNY, VND) |
| `CO_EN_PRICECUR` | 현재가끝범위가 | string | N | 12 | 단위: 각국통화(JPY, USD, HKD, CNY, VND) |
| `CO_YN_RATE` | 등락율선택조건 | string | N | 1 | 해당조건 사용시(1), 미사용시 필수항목아님 |
| `CO_ST_RATE` | 등락율시작율 | string | N | 12 | % |
| `CO_EN_RATE` | 등락율끝율 | string | N | 12 | % |
| `CO_YN_VALX` | 시가총액선택조건 | string | N | 1 | 해당조건 사용시(1), 미사용시 필수항목아님 |
| `CO_ST_VALX` | 시가총액시작액 | string | N | 12 | 단위: 천 |
| `CO_EN_VALX` | 시가총액끝액 | string | N | 12 | 단위: 천 |
| `CO_YN_SHAR` | 발행주식수선택조건 | string | N | 1 | 해당조건 사용시(1), 미사용시 필수항목아님 |
| `CO_ST_SHAR` | 발행주식시작수 | string | N | 12 | 단위: 천 |
| `CO_EN_SHAR` | 발행주식끝수 | string | N | 112 | 단위: 천 |
| `CO_YN_VOLUME` | 거래량선택조건 | string | N | 1 | 해당조건 사용시(1), 미사용시 필수항목아님 |
| `CO_ST_VOLUME` | 거래량시작량 | string | N | 12 | 단위: 주 |
| `CO_EN_VOLUME` | 거래량끝량 | string | N | 12 | 단위: 주 |
| `CO_YN_AMT` | 거래대금선택조건 | string | N | 1 | 해당조건 사용시(1), 미사용시 필수항목아님 |
| `CO_ST_AMT` | 거래대금시작금 | string | N | 12 | 단위: 천 |
| `CO_EN_AMT` | 거래대금끝금 | string | N | 12 | 단위: 천 |
| `CO_YN_EPS` | EPS선택조건 | string | N | 1 | 해당조건 사용시(1), 미사용시 필수항목아님 |
| `CO_ST_EPS` | EPS시작 | string | N | 12 |  |
| `CO_EN_EPS` | EPS끝 | string | N | 12 |  |
| `CO_YN_PER` | PER선택조건 | string | N | 1 | 해당조건 사용시(1), 미사용시 필수항목아님 |
| `CO_ST_PER` | PER시작 | string | N | 12 |  |
| `CO_EN_PER` | PER끝 | string | N | 12 |  |
| `KEYB` | NEXT KEY BUFF | string | N | 8 | "" 공백 입력 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세1 | object | Y |  |  |
| `zdiv` | 소수점자리수 | string | Y | 1 | 소수점자리수 |
| `stat` | 거래상태정보 | string | Y | 20 | 거래상태정보 |
| `crec` | 현재조회종목수 | string | Y | 6 | 현재조회종목수 |
| `trec` | 전체조회종목수 | string | Y | 6 | 전체조회종목수 |
| `nrec` | Record Count | string | Y | 4 | Record Count |
| `output2` | 응답상세2 | object array | Y |  | 조회결과 상세 |
| `rsym` | 실시간조회심볼 | string | N | 32 | 실시간조회심볼    D+시장구분(3자리)+종목코드  예) DNASAAPL : D+NAS(나스닥)+AAPL(애플)  [시장구분]  NYS : 뉴욕, NAS : 나스닥, AMS : 아멕스 ,  TSE : 도쿄, HKS : 홍콩,  SHS : 상해, SZS : 심천  HSX : 호치민, HNX : 하노이 |
| `excd` | 거래소코드 | string | N | 4 | 거래소코드 |
| `name` | 종목명 | string | N | 48 | 종목명 |
| `symb` | 종목코드 | string | N | 16 | 종목코드 |
| `last` | 현재가 | string | N | 12 | 현재가 |
| `shar` | 발행주식 | string | N | 14 | 발행주식수(단위: 천) |
| `valx` | 시가총액 | string | N | 14 | 시가총액(단위: 천) |
| `plow` | 저가 | string | N | 12 | 저가 |
| `phigh` | 고가 | string | N | 12 | 고가 |
| `popen` | 시가 | string | N | 12 | 시가 |
| `tvol` | 거래량 | string | N | 14 | 거래량(단위: 주) |
| `rate` | 등락율 | string | N | 12 | 등락율(%) |
| `diff` | 대비 | string | N | 12 | 대비 |
| `sign` | 기호 | string | N | 1 | 기호 |
| `avol` | 거래대금 | string | N | 14 | 거래대금(단위: 천) |
| `eps` | EPS | string | N | 14 | EPS |
| `per` | PER | string | N | 14 | PER |
| `rank` | 순위 | string | N | 6 | 순위 |
| `ename` | 영문종목명 | string | N | 48 | 영문종목명 |
| `e_ordyn` | 매매가능 | string | N | 2 | 가능 : O |

**Request Example:**
```
{      "AUTH":"",      "EXCD":"NAS",      "CO_YN_PRICECUR":"1",      "CO_ST_PRICECUR":"160",      "CO_EN_PRICECUR":"161",      "CO_YN_RATE":"",      "CO_ST_RATE":"",      "CO_EN_RATE":"",      "CO_YN_VALX":"",      "CO_ST_VALX":"",      "CO_EN_VALX":"",      "CO_YN_SHAR":"",      "CO_ST_SHAR":"",      "CO_EN_SHAR":"",      "CO_YN_VOLUME":"",      "CO_ST_VOLUME":"",      "CO_EN_VOLUME":"",      "CO_YN_AMT":"",      "CO_ST_AMT":"",      "CO_EN_AMT":"",      CO_YN_EPS":"",      CO_ST_EPS":"",      CO_EN_EPS":"",      CO_YN_PER":"",      CO_ST_PER":"",      CO_EN_PER":""  }
```

**Response Example:**
```
{      "output1": {          "zdiv": "4",          "stat": "무료실시간",          "crec": "2",          "trec": "2",          "nrec": "2"      },      "output2": [          {              "rsym": "DNASTSLA",              "excd": "NAS",              "symb": "TSLA",              "name": "테슬라",              "last": "160.9500",              "sign": "5",              "diff": "6.8700",              "rate": "-4.09",              "tvol": "175862722",              "popen": "174.8700",              "phigh": "175.0500",              "plow": "156.9100",              "valx": "508239862",              "shar": "3157750000",              "avol": "28842552711",              "eps": "3.24",              "per": "49.73",              "rank": "1",              "ename": "TESLA INC",              "e_ordyn": "○"          },          {              "rsym": "DNASPANW",              "excd": "NAS",              "symb": "PANW",              "name": "팔로 알토 네트웍스",              "last": "160.7500",              "sign": "5",              "diff": "1.0300",              "rate": "-0.64",              "tvol": "3570070",              "popen": "168.2200",              "phigh": "168.9900",              "plow": "159.7700",              "valx": "48603888",              "shar": "302357000",              "avol": "580983313",              "eps": "0.50",              "per": "324.62",              "rank": "2",              "ename": "PALO ALTO NETWORKS INC",              "e_ordyn": "○"          }      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 25. 해외주식 상품기본정보

| Field | Value |
|---|---|
| Sheet | `해외주식 상품기본정보` |
| Menu | [해외주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-price/v1/quotations/search-info` |
| TR_ID (실전) | `CTPF1702R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `PRDT_TYPE_CD` | 상품유형코드 | string | Y | 3 | 512  미국 나스닥 / 513  미국 뉴욕 / 529  미국 아멕스   515  일본  501  홍콩 / 543  홍콩CNY / 558  홍콩USD  507  베트남 하노이 / 508  베트남 호치민  551  중국 상해A / 552  중국 심천A |
| `PDNO` | 상품번호 | string | Y | 12 | 예) AAPL (애플) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세1 | object | Y |  |  |
| `std_pdno` | 표준상품번호 | string | Y | 12 |  |
| `prdt_eng_name` | 상품영문명 | string | Y | 60 |  |
| `natn_cd` | 국가코드 | string | Y | 3 |  |
| `natn_name` | 국가명 | string | Y | 60 |  |
| `tr_mket_cd` | 거래시장코드 | string | Y | 2 |  |
| `tr_mket_name` | 거래시장명 | string | Y | 60 |  |
| `ovrs_excg_cd` | 해외거래소코드 | string | Y | 4 |  |
| `ovrs_excg_name` | 해외거래소명 | string | Y | 60 |  |
| `tr_crcy_cd` | 거래통화코드 | string | Y | 3 |  |
| `ovrs_papr` | 해외액면가 | string | Y | 195 |  |
| `crcy_name` | 통화명 | string | Y | 60 |  |
| `ovrs_stck_dvsn_cd` | 해외주식구분코드 | string | Y | 2 | 01.주식  02.WARRANT  03.ETF  04.우선주 |
| `prdt_clsf_cd` | 상품분류코드 | string | Y | 6 |  |
| `prdt_clsf_name` | 상품분류명 | string | Y | 60 |  |
| `sll_unit_qty` | 매도단위수량 | string | Y | 10 |  |
| `buy_unit_qty` | 매수단위수량 | string | Y | 10 |  |
| `tr_unit_amt` | 거래단위금액 | string | Y | 238 |  |
| `lstg_stck_num` | 상장주식수 | string | Y | 19 |  |
| `lstg_dt` | 상장일자 | string | Y | 8 |  |
| `ovrs_stck_tr_stop_dvsn_cd` | 해외주식거래정지구분코드 | string | Y | 2 | ※ 해당 값 지연 반영될 수 있는 점 유의 부탁드립니다.    01.정상  02.거래정지(ALL)  03.거래중단  04.매도정지  05.거래정지(위탁)  06.매수정지 |
| `lstg_abol_item_yn` | 상장폐지종목여부 | string | Y | 1 |  |
| `ovrs_stck_prdt_grp_no` | 해외주식상품그룹번호 | string | Y | 20 |  |
| `lstg_yn` | 상장여부 | string | Y | 1 |  |
| `tax_levy_yn` | 세금징수여부 | string | Y | 1 |  |
| `ovrs_stck_erlm_rosn_cd` | 해외주식등록사유코드 | string | Y | 2 |  |
| `ovrs_stck_hist_rght_dvsn_cd` | 해외주식이력권리구분코드 | string | Y | 2 |  |
| `chng_bf_pdno` | 변경전상품번호 | string | Y | 12 |  |
| `prdt_type_cd_2` | 상품유형코드2 | string | Y | 3 |  |
| `ovrs_item_name` | 해외종목명 | string | Y | 60 |  |
| `sedol_no` | SEDOL번호 | string | Y | 15 |  |
| `blbg_tckr_text` | 블름버그티커내용 | string | Y | 100 |  |
| `ovrs_stck_etf_risk_drtp_cd` | 해외주식ETF위험지표코드 | string | Y | 3 | 001.ETF  002.ETN  003.ETC(Exchage Traded Commodity)  004.Others(REIT's, Mutual Fund)  005.VIX Underlying ETF  006.VIX Underlying ETN |
| `etp_chas_erng_rt_dbnb` | ETP추적수익율배수 | string | Y | 236 |  |
| `istt_usge_isin_cd` | 기관용도ISIN코드 | string | Y | 12 |  |
| `mint_svc_yn` | MINT서비스여부 | string | Y | 1 |  |
| `mint_svc_yn_chng_dt` | MINT서비스여부변경일자 | string | Y | 8 |  |
| `prdt_name` | 상품명 | string | Y | 60 |  |
| `lei_cd` | LEI코드 | string | Y | 20 |  |
| `ovrs_stck_stop_rson_cd` | 해외주식정지사유코드 | string | Y | 2 | 01.권리발생  02.ISIN상이  03.기타  04.급등락종목  05.상장폐지(예정)  06.종목코드,거래소변경  07.PTP종목 |
| `lstg_abol_dt` | 상장폐지일자 | string | Y | 8 |  |
| `mini_stk_tr_stat_dvsn_cd` | 미니스탁거래상태구분코드 | string | Y | 2 | 01.정상  02.매매 불가  03.매수 불가  04.매도 불가 |
| `mint_frst_svc_erlm_dt` | MINT최초서비스등록일자 | string | Y | 8 |  |
| `mint_dcpt_trad_psbl_yn` | MINT소수점매매가능여부 | string | Y | 1 |  |
| `mint_fnum_trad_psbl_yn` | MINT정수매매가능여부 | string | Y | 1 |  |
| `mint_cblc_cvsn_ipsb_yn` | MINT잔고전환불가여부 | string | Y | 1 |  |
| `ptp_item_yn` | PTP종목여부 | string | Y | 1 |  |
| `ptp_item_trfx_exmt_yn` | PTP종목양도세면제여부 | string | Y | 1 |  |
| `ptp_item_trfx_exmt_strt_dt` | PTP종목양도세면제시작일자 | string | Y | 8 |  |
| `ptp_item_trfx_exmt_end_dt` | PTP종목양도세면제종료일자 | string | Y | 8 |  |
| `dtm_tr_psbl_yn` | 주간거래가능여부 | string | Y | 1 |  |
| `sdrf_stop_ecls_yn` | 급등락정지제외여부 | string | Y | 1 |  |
| `sdrf_stop_ecls_erlm_dt` | 급등락정지제외등록일자 | string | Y | 8 |  |
| `memo_text1` | 메모내용1 | string | Y | 500 |  |
| `ovrs_now_pric1` | 해외현재가격1 | string | Y | 23 | 23.5 |
| `last_rcvg_dtime` | 최종수신일시 | string | Y | 14 |  |

**Request Example:**
```
{  "PDNO":"AAPL",  "PRDT_TYPE_CD":"512"  }
```

**Response Example:**
```
{      "output": {          "std_pdno": "US0378331005",          "prdt_eng_name": "APPLE INC",          "natn_cd": "840",          "natn_name": "미국",          "tr_mket_cd": "01",          "tr_mket_name": "나스닥",          "ovrs_excg_cd": "NASD",          "ovrs_excg_name": "나스닥",          "tr_crcy_cd": "USD",          "ovrs_papr": "0.00000",          "crcy_name": "미국달러",          "ovrs_stck_dvsn_cd": "01",          "prdt_clsf_cd": "101210",          "prdt_clsf_name": "해외주식",          "sll_unit_qty": "1",          "buy_unit_qty": "1",          "tr_unit_amt": "0",          "lstg_stck_num": "15441900000",          "lstg_dt": "",          "ovrs_stck_tr_stop_dvsn_cd": "01",          "lstg_abol_item_yn": "N",          "ovrs_stck_prdt_grp_no": "4621",          "lstg_yn": "Y",          "tax_levy_yn": "N",          "ovrs_stck_erlm_rosn_cd": "00",          "ovrs_stck_hist_rght_dvsn_cd": "00",          "chng_bf_pdno": "",          "prdt_type_cd_2": "",          "ovrs_item_name": "",          "sedol_no": "2046251",          "blbg_tckr_text": "AAPL US",          "ovrs_stck_etf_risk_drtp_cd": "",          "etp_chas_erng_rt_dbnb": "0.000000",          "istt_usge_isin_cd": "US0378331005",          "mint_svc_yn": "Y",          "mint_svc_yn_chng_dt": "20220711",          "prdt_name": "애플",          "lei_cd": "HWUPKR0MPOU8FGXBT394",          "ovrs_stck_stop_rson_cd": "",          "lstg_abol_dt": "",          "mini_stk_tr_stat_dvsn_cd": "01",          "mint_frst_svc_erlm_dt": "20220711",          "mint_dcpt_trad_psbl_yn": "Y",          "mint_fnum_trad_psbl_yn": "Y",          "mint_cblc_cvsn_ipsb_yn": "N",          "ptp_item_yn": "N",          "ptp_item_trfx_exmt_yn": "N",          "ptp_item_trfx_exmt_strt_dt": "",          "ptp_item_trfx_exmt_end_dt": "",          "dtm_tr_psbl_yn": "Y",          "sdrf_stop_ecls_yn": "N",          "sdrf_stop_ecls_erlm_dt": "00000000"      },      "rt_cd": "0",      "msg_cd": "KIOK0530",      "msg1": "조회되었습니다                                                                  "  }
```

---
### 26. 해외지수분봉조회

| Field | Value |
|---|---|
| Sheet | `해외지수분봉조회` |
| Menu | [해외주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-price/v1/quotations/inquire-time-indexchartprice` |
| TR_ID (실전) | `FHKST03030200` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | N 해외지수  X 환율  KX 원화환율 |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 종목번호(ex. TSLA) |
| `FID_HOUR_CLS_CODE` | 시간 구분 코드 | string | Y | 5 | 0: 정규장, 1: 시간외 |
| `FID_PW_DATA_INCU_YN` | 과거 데이터 포함 여부 | string | Y | 2 | Y/N |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `ovrs_nmix_prdy_vrss` | 해외 지수 전일 대비 | string | Y | 114 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `ovrs_nmix_prdy_clpr` | 해외 지수 전일 종가 | string | Y | 114 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `ovrs_nmix_prpr` | 해외 지수 현재가 | string | Y | 114 |  |
| `stck_shrn_iscd` | 주식 단축 종목코드 | string | Y | 9 |  |
| `ovrs_prod_oprc` | 해외 상품 시가2 | string | Y | 114 | 시가 |
| `ovrs_prod_hgpr` | 해외 상품 최고가 | string | Y | 114 | 최고가 |
| `ovrs_prod_lwpr` | 해외 상품 최저가 | string | Y | 114 | 최저가 |
| `output2` | 응답상세2 | object array | Y |  | array |
| `stck_bsop_date` | 주식 영업 일자 | string | Y | 8 | 영업 일자 |
| `stck_cntg_hour` | 주식 체결 시간 | string | Y | 6 | 체결 시간 |
| `optn_prpr` | 옵션 현재가 | string | Y | 112 | 현재가 |
| `optn_oprc` | 옵션 시가2 | string | Y | 112 | 시가 |
| `optn_hgpr` | 옵션 최고가 | string | Y | 112 | 최고가 |
| `optn_lwpr` | 옵션 최저가 | string | Y | 112 | 최저가 |
| `cntg_vol` | 체결 거래량 | string | Y | 18 |  |

**Request Example:**
```
{  "FID_COND_MRKT_DIV_CODE":"N",  "FID_INPUT_ISCD":"SPX",  "FID_HOUR_CLS_CODE":"0",  "FID_PW_DATA_INCU_YN":"Y"  }
```

**Response Example:**
```
{      "output1": {          "ovrs_nmix_prdy_vrss": "105.23",          "prdy_vrss_sign": "2",          "prdy_ctrt": "2.11",          "ovrs_nmix_prdy_clpr": "4981.80",          "acml_vol": "0",          "hts_kor_isnm": "S&P500",          "ovrs_nmix_prpr": "5087.03",          "stck_shrn_iscd": "SPX",          "ovrs_prod_oprc": "5038.83",          "ovrs_prod_hgpr": "5094.39",          "ovrs_prod_lwpr": "5038.83"      },      "output2": [          {              "stck_bsop_date": "20240222",              "stck_cntg_hour": "170600",              "optn_prpr": "5087.03",              "optn_oprc": "5087.03",              "optn_hgpr": "5087.03",              "optn_lwpr": "5087.03",              "cntg_vol": "0"          },          {              "stck_bsop_date": "20240222",              "stck_cntg_hour": "162000",              "optn_prpr": "5087.03",              "optn_oprc": "5087.03",              "optn_hgpr": "5087.03",              "optn_lwpr": "5087.03",              "cntg_vol": "0"          },          {              "stck_bsop_date": "20240222",              "stck_cntg_hour": "161900",              "optn_prpr": "5087.03",              "optn_oprc": "5087.03",              "optn_hgpr": "5087.03",              "optn_lwpr": "5087.03",              "cntg_vol": "0"          },          {              "stck_bsop_date": "20240222",              "stck_cntg_hour": "161800",              "optn_prpr": "5087.03",              "optn_oprc": "5087.03",              "optn_hgpr": "5087.03",              "optn_lwpr": "5087.03",              "cntg_vol": "0"          },          {              "stck_bsop_date": "20240222",              "stck_cntg_hour": "161700",              "optn_prpr": "5087.03",              "optn_oprc": "5087.03",              "optn_hgpr": "5087.03",              "optn_lwpr": "5087.03",              "cntg_vol": "0"          },          {              "stck_bsop_date": "20240222",              "stck_cntg_hour": "161600",              "optn_prpr": "5087.03",              "optn_oprc": "5087.03",              "optn_hgpr": "5087.03",              "optn_lwpr": "5087.03",              "cntg_vol": "0"          },          {              "stck_bsop_date": "20240222",              "stck_cntg_hour": "161500",              "optn_prpr": "5087.03",              "optn_oprc": "5087.03",              "optn_hgpr": "5087.03",              "optn_lwpr": "5087.03",              "cntg_vol": "0"          },          {              "stck_bsop_date": "20240222",              "stck_cntg_hour": "161400",              "optn_prpr": "5087.03",              "optn_oprc": "5087.03",              "optn_hgpr": "5087.03",              "optn_lwpr": "5087.03",              "cntg_vol": "0"          },          {              "stck_bsop_date": "20240222",              "stck_cntg_hour": "161300",              "optn_prpr": "5087.03",              "optn_oprc": "5087.03",              "optn_hgpr": "5087.03",              "optn_lwpr": "5087.03",              "cntg_vol": "0"          },      
```

---
### 27. 해외주식분봉조회

| Field | Value |
|---|---|
| Sheet | `해외주식분봉조회` |
| Menu | [해외주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-price/v1/quotations/inquire-time-itemchartprice` |
| TR_ID (실전) | `HHDFS76950200` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `AUTH` | 사용자권한정보 | string | Y | 32 | "" 공백으로 입력 |
| `EXCD` | 거래소코드 | string | Y | 4 | NYS : 뉴욕  NAS : 나스닥  AMS : 아멕스   HKS : 홍콩  SHS : 상해   SZS : 심천  HSX : 호치민  HNX : 하노이  TSE : 도쿄     ※ 주간거래는 최대 1일치 분봉만 조회 가능  BAY : 뉴욕(주간)  BAQ : 나스닥(주간)  BAA : 아멕스(주간) |
| `SYMB` | 종목코드 | string | Y | 16 | 종목코드(ex. TSLA) |
| `NMIN` | 분갭 | string | Y | 4 | 분단위(1: 1분봉, 2: 2분봉, ...) |
| `PINC` | 전일포함여부 | string | Y | 1 | 0:당일 1:전일포함  ※ 다음조회 시 반드시 "1"로 입력 |
| `NEXT` | 다음여부 | string | Y | 1 | 처음조회 시, "" 공백 입력  다음조회 시, "1" 입력 |
| `NREC` | 요청갯수 | string | Y | 4 | 레코드요청갯수 (최대 120) |
| `FILL` | 미체결채움구분 | string | Y | 1 | "" 공백으로 입력 |
| `KEYB` | NEXT KEY BUFF | string | Y | 32 | 처음 조회 시, "" 공백 입력  다음 조회 시, 이전 조회 결과의 마지막 분봉 데이터를 이용하여, 1분 전 혹은 n분 전의 시간을 입력   (형식: YYYYMMDDHHMMSS, ex. 20241014140100) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  |  |
| `rsym` | 실시간종목코드 | string | Y | 16 |  |
| `zdiv` | 소수점자리수 | string | Y | 1 |  |
| `stim` | 장시작현지시간 | string | Y | 6 |  |
| `etim` | 장종료현지시간 | string | Y | 6 |  |
| `sktm` | 장시작한국시간 | string | Y | 6 |  |
| `ektm` | 장종료한국시간 | string | Y | 6 |  |
| `next` | 다음가능여부 | string | Y | 1 |  |
| `more` | 추가데이타여부 | string | Y | 1 |  |
| `nrec` | 레코드갯수 | string | Y | 4 |  |
| `output2` | 응답상세2 | object | Y |  | array |
| `tymd` | 현지영업일자 | string | Y | 8 |  |
| `xymd` | 현지기준일자 | string | Y | 8 |  |
| `xhms` | 현지기준시간 | string | Y | 6 |  |
| `kymd` | 한국기준일자 | string | Y | 8 |  |
| `khms` | 한국기준시간 | string | Y | 6 |  |
| `open` | 시가 | string | Y | 12 |  |
| `high` | 고가 | string | Y | 12 |  |
| `low` | 저가 | string | Y | 12 |  |
| `last` | 종가 | string | Y | 12 |  |
| `evol` | 체결량 | string | Y | 12 |  |
| `eamt` | 체결대금 | string | Y | 14 |  |

**Request Example:**
```
{  "AUTH":"",  "EXCD":"NAS",  "SYMB":"TSLA",  "NMIN":"5",  "PINC":"1",  "NEXT":"1",  "NREC":"120",  "FILL":"",  "KEYB":""  }
```

**Response Example:**
```
{      "output1": {          "rsym": "DNASTSLA",          "zdiv": "4",          "stim": "093000",          "etim": "160000",          "sktm": "233000",          "ektm": "060000",          "next": "1",          "more": "0",          "nrec": "120"      },      "output2": [          {              "tymd": "20240222",              "xymd": "20240222",              "xhms": "160000",              "kymd": "20240223",              "khms": "060000",              "open": "197.3400",              "high": "197.4100",              "low": "197.2800",              "last": "197.4100",              "evol": "5695",              "eamt": "1123799"          },          {              "tymd": "20240222",              "xymd": "20240222",              "xhms": "155500",              "kymd": "20240223",              "khms": "055500",              "open": "197.7200",              "high": "197.9900",              "low": "197.1700",              "last": "197.3800",              "evol": "1810184",              "eamt": "357462976"          },          {              "tymd": "20240222",              "xymd": "20240222",              "xhms": "155000",              "kymd": "20240223",              "khms": "055000",              "open": "197.3800",              "high": "197.8200",              "low": "197.3400",              "last": "197.7320",              "evol": "1063296",              "eamt": "210158482"          },          {              "tymd": "20240222",              "xymd": "20240222",              "xhms": "154500",              "kymd": "20240223",              "khms": "054500",              "open": "197.8572",              "high": "197.8800",              "low": "197.3000",              "last": "197.3800",              "evol": "924730",              "eamt": "182753296"          },          {              "tymd": "20240222",              "xymd": "20240222",              "xhms": "154000",              "kymd": "20240223",              "khms": "054000",              "open": "198.1258",              "high": "198.3200",              "low": "197.7200",              "last": "197.8572",              "evol": "1057656",              "eamt": "209470055"          },          {              "tymd": "20240222",              "xymd": "20240222",              "xhms": "153500",              "kymd": "20240223",              "khms": "053500",              "open": "197.6900",              "high": "198.1500",              "low": "197.6600",              "last": "198.1258",              "evol": "1139444",              "eamt": "225542973"          },          {              "tymd": "20240222",              "xymd": "20240222",              "xhms": "153000",              "kymd": "20240223",              "khms": "053000",              "open": "197.6600",              "high": "197.8600",              "low": "197.4300",              "last": "197.6900",              "evol": "761441",              "eamt": "150467794"          },          {              "tymd": "20240222",              "xymd": "20240222"
```

---
### 28. 해외주식 현재가상세

| Field | Value |
|---|---|
| Sheet | `해외주식 현재가상세` |
| Menu | [해외주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-price/v1/quotations/price-detail` |
| TR_ID (실전) | `HHDFS76200200` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `AUTH` | 사용자권한정보 | string | Y | 32 |  |
| `EXCD` | 거래소명 | string | Y | 4 | HKS : 홍콩  NYS : 뉴욕  NAS : 나스닥  AMS : 아멕스  TSE : 도쿄  SHS : 상해  SZS : 심천  SHI : 상해지수  SZI : 심천지수  HSX : 호치민  HNX : 하노이  BAY : 뉴욕(주간)  BAQ : 나스닥(주간)  BAA : 아멕스(주간) |
| `SYMB` | 종목코드 | string | Y | 16 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object | Y |  |  |
| `rsym` | 실시간조회종목코드 | string | Y | 16 |  |
| `pvol` | 전일거래량 | string | Y | 14 |  |
| `open` | 시가 | string | Y | 12 |  |
| `high` | 고가 | string | Y | 12 |  |
| `low` | 저가 | string | Y | 12 |  |
| `last` | 현재가 | string | Y | 12 |  |
| `base` | 전일종가 | string | Y | 12 |  |
| `tomv` | 시가총액 | string | Y | 16 |  |
| `pamt` | 전일거래대금 | string | Y | 14 |  |
| `uplp` | 상한가 | string | Y | 12 |  |
| `dnlp` | 하한가 | string | Y | 12 |  |
| `h52p` | 52주최고가 | string | Y | 12 |  |
| `h52d` | 52주최고일자 | string | Y | 8 |  |
| `l52p` | 52주최저가 | string | Y | 12 |  |
| `l52d` | 52주최저일자 | string | Y | 8 |  |
| `perx` | PER | string | Y | 10 |  |
| `pbrx` | PBR | string | Y | 10 |  |
| `epsx` | EPS | string | Y | 10 |  |
| `bpsx` | BPS | string | Y | 10 |  |
| `shar` | 상장주수 | string | Y | 16 |  |
| `mcap` | 자본금 | string | Y | 16 |  |
| `curr` | 통화 | string | Y | 4 |  |
| `zdiv` | 소수점자리수 | string | Y | 1 |  |
| `vnit` | 매매단위 | string | Y | 6 |  |
| `t_xprc` | 원환산당일가격 | string | Y | 12 |  |
| `t_xdif` | 원환산당일대비 | string | Y | 12 |  |
| `t_xrat` | 원환산당일등락 | string | Y | 12 |  |
| `p_xprc` | 원환산전일가격 | string | Y | 12 |  |
| `p_xdif` | 원환산전일대비 | string | Y | 12 |  |
| `p_xrat` | 원환산전일등락 | string | Y | 12 |  |
| `t_rate` | 당일환율 | string | Y | 12 |  |
| `p_rate` | 전일환율 | string | Y | 12 |  |
| `t_xsgn` | 원환산당일기호 | string | Y | 1 | HTS 색상표시용 |
| `p_xsng` | 원환산전일기호 | string | Y | 1 | HTS 색상표시용 |
| `e_ordyn` | 거래가능여부 | string | Y | 20 |  |
| `e_hogau` | 호가단위 | string | Y | 8 |  |
| `e_icod` | 업종(섹터) | string | Y | 40 |  |
| `e_parp` | 액면가 | string | Y | 12 |  |
| `tvol` | 거래량 | string | Y | 14 |  |
| `tamt` | 거래대금 | string | Y | 14 |  |
| `etyp_nm` | ETP 분류명 | string | Y | 20 |  |

**Request Example:**
```
{  	"AUTH":"",  	"EXCD":"NAS",  	"SYMB":"TSLA"  }
```

**Response Example:**
```
{      "output": {          "rsym": "DNASTSLA",          "zdiv": "4",          "curr": "USD",          "vnit": "1",          "open": "257.2600",          "high": "259.0794",          "low": "242.0100",          "last": "245.0100",          "base": "258.0800",          "pvol": "108861698",          "pamt": "28090405673",          "uplp": "0.0000",          "dnlp": "0.0000",          "h52p": "313.8000",          "h52d": "20220921",          "l52p": "101.8100",          "l52d": "20230106",          "perx": "69.51",          "pbrx": "15.21",          "epsx": "3.52",          "bpsx": "16.11",          "shar": "3173990000",          "mcap": "3000000",          "tomv": "777659289900",          "t_xprc": "323658",          "t_xdif": "17265",          "t_xrat": "-5.06",          "p_xprc": "0",          "p_xdif": "0",          "p_xrat": " 0.00",          "t_rate": "1321.00",          "p_rate": "",          "t_xsgn": "5",          "p_xsng": "3",          "e_ordyn": "매매 가능",          "e_hogau": "0.0100",          "e_icod": "자동차",          "e_parp": "0.0000",          "tvol": "132541640",          "tamt": "32907071789",          "etyp_nm": ""      },      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 29. 해외주식 업종별코드조회

| Field | Value |
|---|---|
| Sheet | `해외주식 업종별코드조회` |
| Menu | [해외주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-price/v1/quotations/industry-price` |
| TR_ID (실전) | `HHDFS76370100` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `AUTH` | 사용자권한정보 | string | Y | 32 | 공백 |
| `EXCD` | 거래소코드 | string | Y | 4 | 'NYS : 뉴욕, NAS : 나스닥,  AMS : 아멕스   HKS : 홍콩, SHS : 상해 , SZS : 심천  HSX : 호치민, HNX : 하노이  TSE : 도쿄 ' |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `nrec` | RecordCount | string | Y | 4 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `icod` | 업종코드 | string | Y | 4 |  |
| `name` | 업종명 | string | Y | 32 |  |

**Request Example:**
```
AUTH:  EXCD:NAS
```

**Response Example:**
```
{      "output1": {          "nrec": "42"      },      "output2": [          {              "icod": "000",              "name": "전체"          },          {              "icod": "010",              "name": "에너지 및 관련 서비스"          },...      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 30. 해외주식 종목_지수_환율기간별시세(일_주_월_년)

| Field | Value |
|---|---|
| Sheet | `해외주식 종목_지수_환율기간별시세(일_주_월_년)` |
| Menu | [해외주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-price/v1/quotations/inquire-daily-chartprice` |
| TR_ID (실전) | `FHKST03030100` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | FID 조건 시장 분류 코드 | string | Y | 2 | N: 해외지수, X 환율, I: 국채, S:금선물 |
| `FID_INPUT_ISCD` | FID 입력 종목코드 | string | Y | 12 | 종목코드  ※ 해외주식 마스터 코드 참조   (포럼 > FAQ > 종목정보 다운로드(해외) > 해외지수)    ※ 해당 API로 미국주식 조회 시, 다우30, 나스닥100, S&P500 종목만 조회 가능합니다. 더 많은 미국주식 종목 시세를 이용할 시에는, 해외주식기간별시세 API 사용 부탁드립니다. |
| `FID_INPUT_DATE_1` | FID 입력 날짜1 | string | Y | 10 | 시작일자(YYYYMMDD) |
| `FID_INPUT_DATE_2` | FID 입력 날짜2 | string | Y | 10 | 종료일자(YYYYMMDD) |
| `FID_PERIOD_DIV_CODE` | FID 기간 분류 코드 | string | Y | 32 | D:일, W:주, M:월, Y:년 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세1 | object | N |  | 기본정보 |
| `ovrs_nmix_prdy_vrss` | 전일 대비 | string | N | 16 | 16(11.4) 정수부분 11자리, 소수부분 4자리 |
| `prdy_vrss_sign` | 전일 대비 부호 | string | N | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | N | 11 | 11(8.2) 정수부분 8자리, 소수부분 2자리 |
| `ovrs_nmix_prdy_clpr` | 전일 종가 | string | N | 16 | 16(11.4) 정수부분 11자리, 소수부분 4자리 |
| `acml_vol` | 누적 거래량 | string | N | 18 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | N | 40 |  |
| `ovrs_nmix_prpr` | 현재가 | string | N | 16 | 16(11.4) 정수부분 11자리, 소수부분 4자리 |
| `stck_shrn_iscd` | 단축 종목코드 | string | N | 9 |  |
| `prdy_vol` | 전일 거래량 | string | N | 18 |  |
| `ovrs_prod_oprc` | 시가 | string | N | 16 | 16(11.4) 정수부분 11자리, 소수부분 4자리 |
| `ovrs_prod_hgpr` | 최고가 | string | N | 16 | 16(11.4) 정수부분 11자리, 소수부분 4자리 |
| `ovrs_prod_lwpr` | 최저가 | string | N | 16 | 16(11.4) 정수부분 11자리, 소수부분 4자리 |
| `output2` | 응답상세2 | object array | N |  | 일자별 정보 |
| `stck_bsop_date` | 영업 일자 | string | N | 8 |  |
| `ovrs_nmix_prpr` | 현재가 | string | N | 16 | 16(11.4) 정수부분 11자리, 소수부분 4자리 |
| `ovrs_nmix_oprc` | 시가 | string | N | 16 | 16(11.4) 정수부분 11자리, 소수부분 4자리 |
| `ovrs_nmix_hgpr` | 최고가 | string | N | 16 | 16(11.4) 정수부분 11자리, 소수부분 4자리 |
| `ovrs_nmix_lwpr` | 최저가 | string | N | 16 | 16(11.4) 정수부분 11자리, 소수부분 4자리 |
| `acml_vol` | 누적 거래량 | string | N | 18 |  |
| `mod_yn` | 변경 여부 | string | N | 1 |  |

**Request Example:**
```
"input": {              "fid_cond_mrkt_div_code": "N",              "fid_input_date_1": "20220401",              "fid_input_date_2": "20220613",              "fid_input_iscd": ".DJI",              "fid_period_div_code": "D"          }
```

**Response Example:**
```
"output1": {              "acml_vol": "397268510",              "hts_kor_isnm": "다우존스 산업지수",              "ovrs_nmix_prdy_clpr": "31029.31",              "ovrs_nmix_prdy_vrss": "-253.88",              "ovrs_nmix_prpr": "30775.43",              "ovrs_prod_hgpr": "30979.85",              "ovrs_prod_lwpr": "30431.87",              "ovrs_prod_oprc": "30790.00",              "prdy_ctrt": "-0.82",              "prdy_vrss_sign": "5",              "stck_shrn_iscd": ".DJI"          },          "output2": [              {                  "acml_vol": "480501460",                  "mod_yn": "N",                  "ovrs_nmix_hgpr": "31144.91",                  "ovrs_nmix_lwpr": "30373.72",                  "ovrs_nmix_oprc": "31144.91",                  "ovrs_nmix_prpr": "30516.74",                  "stck_bsop_date": "20220613"              },  ....              {                  "acml_vol": "346813590",                  "mod_yn": "N",                  "ovrs_nmix_hgpr": "34847.91",                  "ovrs_nmix_lwpr": "34538.25",                  "ovrs_nmix_oprc": "34740.89",                  "ovrs_nmix_prpr": "34818.27",                  "stck_bsop_date": "20220401"              }
```

---
### 31. 해외주식 업종별시세

| Field | Value |
|---|---|
| Sheet | `해외주식 업종별시세` |
| Menu | [해외주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-price/v1/quotations/industry-theme` |
| TR_ID (실전) | `HHDFS76370000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `KEYB` | NEXT KEY BUFF | string | Y | 8 | 공백 |
| `AUTH` | 사용자권한정보 | string | Y | 32 | 공백 |
| `EXCD` | 거래소코드 | string | Y | 4 | 'NYS : 뉴욕, NAS : 나스닥,  AMS : 아멕스   HKS : 홍콩, SHS : 상해 , SZS : 심천  HSX : 호치민, HNX : 하노이  TSE : 도쿄 ' |
| `ICOD` | 업종코드 | string | Y | 1 | 업종코드별조회(HHDFS76370100) 를 통해 확인 |
| `VOL_RANG` | 거래량조건 | string | Y | 1 | 0(전체), 1(1백주이상), 2(1천주이상), 3(1만주이상), 4(10만주이상), 5(100만주이상), 6(1000만주이상) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메시지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `zdiv` | 소수점자리수 | string | Y | 1 |  |
| `stat` | 거래상태정보 | string | Y | 20 |  |
| `crec` | 현재조회종목수 | string | Y | 6 |  |
| `trec` | 전체조회종목수 | string | Y | 6 |  |
| `nrec` | RecordCount | string | Y | 4 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `rsym` | 실시간조회심볼 | string | Y | 16 |  |
| `excd` | 거래소코드 | string | Y | 4 |  |
| `symb` | 종목코드 | string | Y | 1 |  |
| `name` | 종목명 | string | Y | 48 |  |
| `last` | 현재가 | string | Y | 16 |  |
| `sign` | 기호 | string | Y | 1 |  |
| `diff` | 대비 | string | Y | 12 |  |
| `rate` | 등락율 | string | Y | 12 |  |
| `tvol` | 거래량 | string | Y | 14 |  |
| `vask` | 매도잔량 | string | Y | 10 |  |
| `pask` | 매도호가 | string | Y | 12 |  |
| `pbid` | 매수호가 | string | Y | 12 |  |
| `vbid` | 매수잔량 | string | Y | 10 |  |
| `seqn` | 순위 | string | Y | 6 |  |
| `ename` | 영문종목명 | string | Y | 48 |  |
| `e_ordyn` | 매매가능 | string | Y | 2 |  |

---
### 32. 해외주식 현재가 호가

| Field | Value |
|---|---|
| Sheet | `해외주식 현재가 호가` |
| Menu | [해외주식] 기본시세 |
| Method | `GET` |
| URL | `/uapi/overseas-price/v1/quotations/inquire-asking-price` |
| TR_ID (실전) | `HHDFS76200100` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `AUTH` | 사용자권한정보 | string | Y | 32 | 공백 |
| `EXCD` | 거래소코드 | string | Y | 4 | NYS : 뉴욕  NAS : 나스닥  AMS : 아멕스   HKS : 홍콩  SHS : 상해   SZS : 심천  HSX : 호치민  HNX : 하노이  TSE : 도쿄   BAY : 뉴욕(주간)  BAQ : 나스닥(주간)  BAA : 아멕스(주간) |
| `SYMB` | 종목코드 | string | Y | 16 | 종목코드 예)TSLA |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y | 100 |  |
| `rsym` | 실시간조회종목코드 | string | Y | 16 |  |
| `zdiv` | 소수점자리수 | string | Y | 1 |  |
| `curr` | 통화 | string | Y | 4 |  |
| `base` | 전일종가 | string | Y | 12 |  |
| `open` | 시가 | string | Y | 12 |  |
| `high` | 고가 | string | Y | 12 |  |
| `low` | 저가 | string | Y | 12 |  |
| `last` | 현재가 | string | Y | 12 |  |
| `dymd` | 호가일자 | string | Y | 8 |  |
| `dhms` | 호가시간 | string | Y | 6 |  |
| `bvol` | 매수호가총잔량 | string | Y | 10 |  |
| `avol` | 매도호가총잔량 | string | Y | 10 |  |
| `bdvl` | 매수호가총잔량대비 | string | Y | 10 |  |
| `advl` | 매도호가총잔량대비 | string | Y | 10 |  |
| `code` | 종목코드 | string | Y | 16 |  |
| `ropen` | 시가율 | string | Y | 12 |  |
| `rhigh` | 고가율 | string | Y | 12 |  |
| `rlow` | 저가율 | string | Y | 12 |  |
| `rclose` | 현재가율 | string | Y | 12 |  |
| `output2` | 응답상세 | array | Y | 100 |  |
| `pbid1` | 매수호가가격1 | string | Y | 12 |  |
| `pask1` | 매도호가가격1 | string | Y | 12 |  |
| `vbid1` | 매수호가잔량1 | string | Y | 10 |  |
| `vask1` | 매도호가잔량1 | string | Y | 10 |  |
| `dbid1` | 매수호가대비1 | string | Y | 10 |  |
| `dask1` | 매도호가대비1 | string | Y | 10 |  |
| `pbid2` | 매수호가가격2 | string | Y | 12 | 미국 거래소만 수신 |
| `pask2` | 매도호가가격2 | string | Y | 12 | 미국 거래소만 수신 |
| `vbid2` | 매수호가잔량2 | string | Y | 10 | 미국 거래소만 수신 |
| `vask2` | 매도호가잔량2 | string | Y | 10 | 미국 거래소만 수신 |
| `dbid2` | 매수호가대비2 | string | Y | 10 | 미국 거래소만 수신 |
| `dask2` | 매도호가대비2 | string | Y | 10 | 미국 거래소만 수신 |
| `pbid3` | 매수호가가격3 | string | Y | 12 | 미국 거래소만 수신 |
| `pask3` | 매도호가가격3 | string | Y | 12 | 미국 거래소만 수신 |
| `vbid3` | 매수호가잔량3 | string | Y | 10 | 미국 거래소만 수신 |
| `vask3` | 매도호가잔량3 | string | Y | 10 | 미국 거래소만 수신 |
| `dbid3` | 매수호가대비3 | string | Y | 10 | 미국 거래소만 수신 |
| `dask3` | 매도호가대비3 | string | Y | 10 | 미국 거래소만 수신 |
| `pbid4` | 매수호가가격4 | string | Y | 12 | 미국 거래소만 수신 |
| `pask4` | 매도호가가격4 | string | Y | 12 | 미국 거래소만 수신 |
| `vbid4` | 매수호가잔량4 | string | Y | 10 | 미국 거래소만 수신 |
| `vask4` | 매도호가잔량4 | string | Y | 10 | 미국 거래소만 수신 |
| `dbid4` | 매수호가대비4 | string | Y | 10 | 미국 거래소만 수신 |
| `dask4` | 매도호가대비4 | string | Y | 10 | 미국 거래소만 수신 |
| `pbid5` | 매수호가가격5 | string | Y | 12 | 미국 거래소만 수신 |
| `pask5` | 매도호가가격5 | string | Y | 12 | 미국 거래소만 수신 |
| `vbid5` | 매수호가잔량5 | string | Y | 10 | 미국 거래소만 수신 |
| `vask5` | 매도호가잔량5 | string | Y | 10 | 미국 거래소만 수신 |
| `dbid5` | 매수호가대비5 | string | Y | 10 | 미국 거래소만 수신 |
| `dask5` | 매도호가대비5 | string | Y | 10 | 미국 거래소만 수신 |
| `pbid6` | 매수호가가격6 | string | Y | 12 | 미국 거래소만 수신 |
| `pask6` | 매도호가가격6 | string | Y | 12 | 미국 거래소만 수신 |
| `vbid6` | 매수호가잔량6 | string | Y | 10 | 미국 거래소만 수신 |
| `vask6` | 매도호가잔량6 | string | Y | 10 | 미국 거래소만 수신 |
| `dbid6` | 매수호가대비6 | string | Y | 10 | 미국 거래소만 수신 |
| `dask6` | 매도호가대비6 | string | Y | 10 | 미국 거래소만 수신 |
| `pbid7` | 매수호가가격7 | string | Y | 12 | 미국 거래소만 수신 |
| `pask7` | 매도호가가격7 | string | Y | 12 | 미국 거래소만 수신 |
| `vbid7` | 매수호가잔량7 | string | Y | 10 | 미국 거래소만 수신 |
| `vask7` | 매도호가잔량7 | string | Y | 10 | 미국 거래소만 수신 |
| `dbid7` | 매수호가대비7 | string | Y | 10 | 미국 거래소만 수신 |
| `dask7` | 매도호가대비7 | string | Y | 10 | 미국 거래소만 수신 |
| `pbid8` | 매수호가가격8 | string | Y | 12 | 미국 거래소만 수신 |
| `pask8` | 매도호가가격8 | string | Y | 12 | 미국 거래소만 수신 |
| `vbid8` | 매수호가잔량8 | string | Y | 10 | 미국 거래소만 수신 |
| `vask8` | 매도호가잔량8 | string | Y | 10 | 미국 거래소만 수신 |
| `dbid8` | 매수호가대비8 | string | Y | 10 | 미국 거래소만 수신 |
| `dask8` | 매도호가대비8 | string | Y | 10 | 미국 거래소만 수신 |
| `pbid9` | 매수호가가격9 | string | Y | 12 | 미국 거래소만 수신 |
| `pask9` | 매도호가가격9 | string | Y | 12 | 미국 거래소만 수신 |
| `vbid9` | 매수호가잔량9 | string | Y | 10 | 미국 거래소만 수신 |
| `vask9` | 매도호가잔량9 | string | Y | 10 | 미국 거래소만 수신 |
| `dbid9` | 매수호가대비9 | string | Y | 10 | 미국 거래소만 수신 |
| `dask9` | 매도호가대비9 | string | Y | 10 | 미국 거래소만 수신 |
| `pbid10` | 매수호가가격10 | string | Y | 12 | 미국 거래소만 수신 |
| `pask10` | 매도호가가격10 | string | Y | 12 | 미국 거래소만 수신 |
| `vbid10` | 매수호가잔량10 | string | Y | 10 | 미국 거래소만 수신 |
| `vask10` | 매도호가잔량10 | string | Y | 10 | 미국 거래소만 수신 |
| `dbid10` | 매수호가대비10 | string | Y | 10 | 미국 거래소만 수신 |
| `dask10` | 매도호가대비10 | string | Y | 10 | 미국 거래소만 수신 |
| `output3` | 응답상세 | object array | Y | 100 |  |
| `vstm` | VCMStart시간 | string | Y | 6 | 데이터 없음 |
| `vetm` | VCMEnd시간 | string | Y | 6 | 데이터 없음 |
| `csbp` | CAS/VCM기준가 | string | Y | 12 | 데이터 없음 |
| `cshi` | CAS/VCMHighprice | string | Y | 12 | 데이터 없음 |
| `cslo` | CAS/VCMLowprice | string | Y | 12 | 데이터 없음 |
| `iep` | IEP | string | Y | 12 | 데이터 없음 |
| `iev` | IEV | string | Y | 12 | 데이터 없음 |

**Request Example:**
```
AUTH:  EXCD:NAS  SYMB:TSLA
```

**Response Example:**
```
{      "output1": {          "rsym": "DNASTSLA",          "zdiv": "4",          "curr": "USD",          "base": "149.9300",          "open": "148.9700",          "high": "150.9400",          "low": "146.2200",          "last": "147.0500",          "dymd": "20240420",          "dhms": "090000",          "bvol": "0",          "avol": "10759",          "bdvl": "-1053",          "advl": "-985",          "code": "TSLA",          "ropen": "-0.64",          "rhigh": "+0.67",          "rlow": "-2.47",          "rclose": "-1.92"      },      "output2": {          "pbid1": "0.0000",          "pask1": "147.0000",          "vbid1": "0",          "vask1": "9730",          "dbid1": "-275",          "dask1": "9720",          "pbid2": "0.0000",          "pask2": "147.0000",          "vbid2": "0",          "vask2": "11",          "dbid2": "-300",          "dask2": "-216",          "pbid3": "0.0000",          "pask3": "147.0000",          "vbid3": "0",          "vask3": "643",          "dbid3": "-5",          "dask3": "-28",          "pbid4": "0.0000",          "pask4": "147.0000",          "vbid4": "0",          "vask4": "299",          "dbid4": "-135",          "dask4": "289",          "pbid5": "0.0000",          "pask5": "147.0000",          "vbid5": "0",          "vask5": "43",          "dbid5": "-300",          "dask5": "-57",          "pbid6": "0.0000",          "pask6": "147.0000",          "vbid6": "0",          "vask6": "15",          "dbid6": "-30",          "dask6": "-9715",          "pbid7": "0.0000",          "pask7": "147.0000",          "vbid7": "0",          "vask7": "18",          "dbid7": "-2",          "dask7": "7",          "pbid8": "0.0000",          "pask8": "0.0000",          "vbid8": "0",          "vask8": "0",          "dbid8": "-3",          "dask8": "-643",          "pbid9": "0.0000",          "pask9": "0.0000",          "vbid9": "0",          "vask9": "0",          "dbid9": "-1",          "dask9": "-299",          "pbid10": "0.0000",          "pask10": "0.0000",          "vbid10": "0",          "vask10": "0",          "dbid10": "-2",          "dask10": "-43"      },      "output3": {          "vstm": "",          "vetm": "",          "csbp": "",          "cshi": "",          "cslo": "",          "iep": "",          "iev": ""      },      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 33. 해외주식 거래증가율순위

| Field | Value |
|---|---|
| Sheet | `해외주식 거래증가율순위` |
| Menu | [해외주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/overseas-stock/v1/ranking/trade-growth` |
| TR_ID (실전) | `HHDFS76330000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `KEYB` | NEXT KEY BUFF | string | Y | 8 | 공백 |
| `AUTH` | 사용자권한정보 | string | Y | 32 | 공백 |
| `EXCD` | 거래소코드 | string | Y | 4 | 'NYS : 뉴욕, NAS : 나스닥,  AMS : 아멕스   HKS : 홍콩, SHS : 상해 , SZS : 심천  HSX : 호치민, HNX : 하노이  TSE : 도쿄 ' |
| `NDAY` | N일자값 | string | Y | 1 | N일전 : 0(당일), 1(2일), 2(3일), 3(5일), 4(10일), 5(20일전), 6(30일), 7(60일), 8(120일), 9(1년) |
| `VOL_RANG` | 거래량조건 | string | Y | 1 | 0(전체), 1(1백주이상), 2(1천주이상), 3(1만주이상), 4(10만주이상), 5(100만주이상), 6(1000만주이상) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메시지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `zdiv` | 소수점자리수 | string | Y | 1 |  |
| `stat` | 거래상태정보 | string | Y | 20 |  |
| `crec` | 현재조회종목수 | string | Y | 6 |  |
| `trec` | 전체조회종목수 | string | Y | 6 |  |
| `nrec` | RecordCount | string | Y | 4 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `rsym` | 실시간조회심볼 | string | Y | 16 |  |
| `excd` | 거래소코드 | string | Y | 4 |  |
| `symb` | 종목코드 | string | Y | 1 |  |
| `name` | 종목명 | string | Y | 48 |  |
| `last` | 현재가 | string | Y | 16 |  |
| `sign` | 기호 | string | Y | 1 |  |
| `diff` | 대비 | string | Y | 12 |  |
| `rate` | 등락율 | string | Y | 12 |  |
| `pask` | 매도호가 | string | Y | 12 |  |
| `pbid` | 매수호가 | string | Y | 12 |  |
| `tvol` | 거래량 | string | Y | 14 |  |
| `n_tvol` | 평균거래량 | string | Y | 14 |  |
| `n_rate` | 증가율 | string | Y | 12 |  |
| `rank` | 순위 | string | Y | 6 |  |
| `ename` | 영문종목명 | string | Y | 48 |  |
| `e_ordyn` | 매매가능 | string | Y | 2 |  |

---
### 34. 해외주식 기간별권리조회

| Field | Value |
|---|---|
| Sheet | `해외주식 기간별권리조회` |
| Menu | [해외주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/overseas-price/v1/quotations/period-rights` |
| TR_ID (실전) | `CTRGT011R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `RGHT_TYPE_CD` | 권리유형코드 | string | Y | 2 | '%%(전체), 01(유상), 02(무상), 03(배당), 11(합병),   14(액면분할), 15(액면병합), 17(감자), 54(WR청구),  61(원리금상환), 71(WR소멸), 74(배당옵션), 75(특별배당), 76(ISINCODE변경), 77(실권주청약)' |
| `INQR_DVSN_CD` | 조회구분코드 | string | Y | 2 | 02(현지기준일), 03(청약시작일), 04(청약종료일) |
| `INQR_STRT_DT` | 조회시작일자 | string | Y | 8 | 일자 ~ |
| `INQR_END_DT` | 조회종료일자 | string | Y | 8 | ~ 일자 |
| `PDNO` | 상품번호 | string | Y | 12 | 공백 |
| `PRDT_TYPE_CD` | 상품유형코드 | string | Y | 3 | 공백 |
| `CTX_AREA_NK50` | 연속조회키50 | string | Y | 50 | 공백 |
| `CTX_AREA_FK50` | 연속조회검색조건50 | string | Y | 50 | 공백 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `bass_dt` | 기준일자 | string | Y | 8 |  |
| `rght_type_cd` | 권리유형코드 | string | Y | 2 |  |
| `pdno` | 상품번호 | string | Y | 12 |  |
| `prdt_name` | 상품명 | string | Y | 60 |  |
| `prdt_type_cd` | 상품유형코드 | string | Y | 3 |  |
| `std_pdno` | 표준상품번호 | string | Y | 12 |  |
| `acpl_bass_dt` | 현지기준일자 | string | Y | 8 |  |
| `sbsc_strt_dt` | 청약시작일자 | string | Y | 8 |  |
| `sbsc_end_dt` | 청약종료일자 | string | Y | 8 |  |
| `cash_alct_rt` | 현금배정비율 | string | Y | 191 |  |
| `stck_alct_rt` | 주식배정비율 | string | Y | 2012 |  |
| `crcy_cd` | 통화코드 | string | Y | 3 |  |
| `crcy_cd2` | 통화코드2 | string | Y | 3 |  |
| `crcy_cd3` | 통화코드3 | string | Y | 3 |  |
| `crcy_cd4` | 통화코드4 | string | Y | 3 |  |
| `alct_frcr_unpr` | 배정외화단가 | string | Y | 195 |  |
| `stkp_dvdn_frcr_amt2` | 주당배당외화금액2 | string | Y | 195 |  |
| `stkp_dvdn_frcr_amt3` | 주당배당외화금액3 | string | Y | 195 |  |
| `stkp_dvdn_frcr_amt4` | 주당배당외화금액4 | string | Y | 195 |  |
| `dfnt_yn` | 확정여부 | string | Y | 1 |  |

**Request Example:**
```
RGHT_TYPE_CD:%%  INQR_DVSN_CD:02  INQR_STRT_DT:20240417  INQR_END_DT:20240417  PDNO:  PRDT_TYPE_CD:  CTX_AREA_NK50:  CTX_AREA_FK50:
```

**Response Example:**
```
{      "ctx_area_nk50": "                                                  ",      "ctx_area_fk50": "%%!^02!^20240417!^20240417!^!^                    ",      "output": [          {              "bass_dt": "20240418",              "rght_type_cd": "03",              "pdno": "000661",              "prdt_name": "[000661]CHANGCHUN HIGH-TECH INDUSTRY (GROUP",              "prdt_type_cd": "552",              "std_pdno": "CNE0000007J8",              "acpl_bass_dt": "20240417",              "sbsc_strt_dt": "",              "sbsc_end_dt": "",              "cash_alct_rt": "450.0000000000",              "stck_alct_rt": "0.000000000000",              "crcy_cd": "CNY",              "crcy_cd2": "",              "crcy_cd3": "",              "crcy_cd4": "",              "alct_frcr_unpr": "4.50000",              "stkp_dvdn_frcr_amt2": "0.00000",              "stkp_dvdn_frcr_amt3": "0.00000",              "stkp_dvdn_frcr_amt4": "0.00000",              "dfnt_yn": "Y"          },          {              "bass_dt": "20240418",              "rght_type_cd": "03",              "pdno": "AIR",              "prdt_name": "AIRBUS GROUP NV",              "prdt_type_cd": "542",              "std_pdno": "NL0000235190",              "acpl_bass_dt": "20240417",              "sbsc_strt_dt": "",              "sbsc_end_dt": "",              "cash_alct_rt": "180.0000000000",              "stck_alct_rt": "0.000000000000",              "crcy_cd": "EUR",              "crcy_cd2": "",              "crcy_cd3": "",              "crcy_cd4": "",              "alct_frcr_unpr": "1.80000",              "stkp_dvdn_frcr_amt2": "0.00000",              "stkp_dvdn_frcr_amt3": "0.00000",              "stkp_dvdn_frcr_amt4": "0.00000",              "dfnt_yn": "Y"          },          {              "bass_dt": "20240418",              "rght_type_cd": "03",              "pdno": "GYLD",              "prdt_name": "ARROW ETF TR ARROW DOW JONES GLOBAL YIELD ETF",              "prdt_type_cd": "513",              "std_pdno": "US04273H1041",              "acpl_bass_dt": "20240417",              "sbsc_strt_dt": "",              "sbsc_end_dt": "",              "cash_alct_rt": "12.6000000000",              "stck_alct_rt": "0.000000000000",              "crcy_cd": "USD",              "crcy_cd2": "",              "crcy_cd3": "",              "crcy_cd4": "",              "alct_frcr_unpr": "0.12600",              "stkp_dvdn_frcr_amt2": "0.00000",              "stkp_dvdn_frcr_amt3": "0.00000",              "stkp_dvdn_frcr_amt4": "0.00000",              "dfnt_yn": "Y"          },          {              "bass_dt": "20240418",              "rght_type_cd": "03",              "pdno": "NORAM",              "prdt_name": "NORAM DRILLING",              "prdt_type_cd": "525",              "std_pdno": "NO0010360019",              "acpl_bass_dt": "20240417",              "sbsc_strt_dt": "",              "sbsc_end_dt": "",              "cash_alct_rt": "43.8000000000",              "stck_alct_rt": "0.000000000000",              "crc
```

---
### 35. 해외주식 가격급등락

| Field | Value |
|---|---|
| Sheet | `해외주식 가격급등락` |
| Menu | [해외주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/overseas-stock/v1/ranking/price-fluct` |
| TR_ID (실전) | `HHDFS76260000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `KEYB` | NEXT KEY BUFF | string | Y | 8 | 공백 |
| `AUTH` | 사용자권한정보 | string | Y | 32 | 공백 |
| `EXCD` | 거래소코드 | string | Y | 4 | 'NYS : 뉴욕, NAS : 나스닥,  AMS : 아멕스   HKS : 홍콩, SHS : 상해 , SZS : 심천  HSX : 호치민, HNX : 하노이  TSE : 도쿄 ' |
| `GUBN` | 급등/급락구분 | string | Y | 1 | 0(급락), 1(급등) |
| `MINX` | N분전콤보값 | string | Y | 1 | N분전 : 0(1분전), 1(2분전), 2(3분전), 3(5분전), 4(10분전), 5(15분전), 6(20분전), 7(30분전), 8(60분전), 9(120분전) |
| `VOL_RANG` | 거래량조건 | string | Y | 1 | 0(전체), 1(1백주이상), 2(1천주이상), 3(1만주이상), 4(10만주이상), 5(100만주이상), 6(1000만주이상) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `zdiv` | 소수점자리수 | string | Y | 1 |  |
| `stat` | 거래상태 | string | Y | 20 |  |
| `nrec` | RecordCount | string | Y | 4 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `rsym` | 실시간조회심볼 | string | Y | 16 |  |
| `excd` | 거래소코드 | string | Y | 4 |  |
| `symb` | 종목코드 | string | Y | 16 |  |
| `knam` | 종목명 | string | Y | 48 |  |
| `last` | 현재가 | string | Y | 12 |  |
| `sign` | 기호 | string | Y | 1 |  |
| `diff` | 대비 | string | Y | 12 |  |
| `rate` | 등락율 | string | Y | 12 |  |
| `tvol` | 거래량 | string | Y | 14 |  |
| `pask` | 매도호가 | string | Y | 12 |  |
| `pbid` | 매수호가 | string | Y | 12 |  |
| `n_base` | 기준가격 | string | Y | 12 |  |
| `n_diff` | 기준가격대비 | string | Y | 12 |  |
| `n_rate` | 기준가격대비율 | string | Y | 12 |  |
| `enam` | 영문종목명 | string | Y | 48 |  |
| `e_ordyn` | 매매가능 | string | Y | 2 |  |

---
### 36. 해외주식 거래대금순위

| Field | Value |
|---|---|
| Sheet | `해외주식 거래대금순위` |
| Menu | [해외주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/overseas-stock/v1/ranking/trade-pbmn` |
| TR_ID (실전) | `HHDFS76320010` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `KEYB` | NEXT KEY BUFF | string | Y | 8 | 공백 |
| `AUTH` | 사용자권한정보 | string | Y | 32 | 공백 |
| `EXCD` | 거래소코드 | string | Y | 4 | 'NYS : 뉴욕, NAS : 나스닥,  AMS : 아멕스   HKS : 홍콩, SHS : 상해 , SZS : 심천  HSX : 호치민, HNX : 하노이  TSE : 도쿄 ' |
| `NDAY` | N일자값 | string | Y | 1 | N일전 : 0(당일), 1(2일), 2(3일), 3(5일), 4(10일), 5(20일전), 6(30일), 7(60일), 8(120일), 9(1년) |
| `VOL_RANG` | 거래량조건 | string | Y | 1 | 0(전체), 1(1백주이상), 2(1천주이상), 3(1만주이상), 4(10만주이상), 5(100만주이상), 6(1000만주이상) |
| `PRC1` | 현재가 필터범위 1 | string | Y | 12 | 가격 ~ |
| `PRC2` | 현재가 필터범위 2 | string | Y | 12 | ~ 가격 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `zdiv` | 소수점자리수 | string | Y | 1 |  |
| `stat` | 거래상태정보 | string | Y | 20 |  |
| `crec` | 현재조회종목수 | string | Y | 6 |  |
| `trec` | 전체조회종목수 | string | Y | 6 |  |
| `nrec` | RecordCount | string | Y | 4 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `rsym` | 실시간조회심볼 | string | Y | 16 |  |
| `excd` | 거래소코드 | string | Y | 4 |  |
| `symb` | 종목코드 | string | Y | 1 |  |
| `name` | 종목명 | string | Y | 48 |  |
| `last` | 현재가 | string | Y | 16 |  |
| `sign` | 기호 | string | Y | 1 |  |
| `diff` | 대비 | string | Y | 12 |  |
| `rate` | 등락율 | string | Y | 12 |  |
| `pask` | 매도호가 | string | Y | 12 |  |
| `pbid` | 매수호가 | string | Y | 12 |  |
| `tvol` | 거래량 | string | Y | 14 |  |
| `tamt` | 거래대금 | string | Y | 14 |  |
| `a_tamt` | 평균거래대금 | string | Y | 14 |  |
| `rank` | 순위 | string | Y | 6 |  |
| `ename` | 영문종목명 | string | Y | 48 |  |
| `e_ordyn` | 매매가능 | string | Y | 2 |  |

---
### 37. 해외주식 거래량급증

| Field | Value |
|---|---|
| Sheet | `해외주식 거래량급증` |
| Menu | [해외주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/overseas-stock/v1/ranking/volume-surge` |
| TR_ID (실전) | `HHDFS76270000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `KEYB` | NEXT KEY BUFF | string | Y | 8 | 공백 |
| `AUTH` | 사용자권한정보 | string | Y | 32 | 공백 |
| `EXCD` | 거래소코드 | string | Y | 4 | 'NYS : 뉴욕, NAS : 나스닥,  AMS : 아멕스   HKS : 홍콩, SHS : 상해 , SZS : 심천  HSX : 호치민, HNX : 하노이  TSE : 도쿄 ' |
| `MINX` | N분전콤보값 | string | Y | 1 | N분전 : 0(1분전), 1(2분전), 2(3분전), 3(5분전), 4(10분전), 5(15분전), 6(20분전), 7(30분전), 8(60분전), 9(120분전) |
| `VOL_RANG` | 거래량조건 | string | Y | 1 | 0(전체), 1(1백주이상), 2(1천주이상), 3(1만주이상), 4(10만주이상), 5(100만주이상), 6(1000만주이상) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `zdiv` | 소수점자리수 | string | Y | 1 |  |
| `stat` | 거래상태 | string | Y | 20 |  |
| `nrec` | RecordCount | string | Y | 4 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `rsym` | 실시간조회심볼 | string | Y | 16 |  |
| `excd` | 거래소코드 | string | Y | 4 |  |
| `symb` | 종목코드 | string | Y | 16 |  |
| `knam` | 종목명 | string | Y | 48 |  |
| `last` | 현재가 | string | Y | 12 |  |
| `sign` | 기호 | string | Y | 1 |  |
| `diff` | 대비 | string | Y | 12 |  |
| `rate` | 등락율 | string | Y | 12 |  |
| `tvol` | 거래량 | string | Y | 14 |  |
| `pask` | 매도호가 | string | Y | 12 |  |
| `pbid` | 매수호가 | string | Y | 12 |  |
| `n_tvol` | 기준거래량 | string | Y | 14 |  |
| `n_diff` | 증가량 | string | Y | 12 |  |
| `n_rate` | 증가율 | string | Y | 12 |  |
| `enam` | 영문종목명 | string | Y | 48 |  |
| `e_ordyn` | 매매가능 | string | Y | 2 |  |

---
### 38. 해외주식 신고_신저가

| Field | Value |
|---|---|
| Sheet | `해외주식 신고_신저가` |
| Menu | [해외주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/overseas-stock/v1/ranking/new-highlow` |
| TR_ID (실전) | `HHDFS76300000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `KEYB` | NEXT KEY BUFF | string | Y | 8 | 공백 |
| `AUTH` | 사용자권한정보 | string | Y | 32 | 공백 |
| `EXCD` | 거래소코드 | string | Y | 4 | 'NYS : 뉴욕, NAS : 나스닥,  AMS : 아멕스   HKS : 홍콩, SHS : 상해 , SZS : 심천  HSX : 호치민, HNX : 하노이  TSE : 도쿄 ' |
| `GUBN` | 신고/신저 구분 | string | Y | 1 | 신고(1) 신저(0) |
| `GUBN2` | 일시돌파/돌파 구분 | string | Y | 1 | 일시돌파(0) 돌파유지(1) |
| `NDAY` | N일자값 | string | Y | 1 | N일전 : 0(5일), 1(10일), 2(20일), 3(30일), 4(60일), 5(120일전), 6(52주), 7(1년) |
| `VOL_RANG` | 거래량조건 | string | Y | 1 | 0(전체), 1(1백주이상), 2(1천주이상), 3(1만주이상), 4(10만주이상), 5(100만주이상), 6(1000만주이상) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `zdiv` | 소수점자리수 | string | Y | 1 |  |
| `stat` | 거래상태정보 | string | Y | 20 |  |
| `nrec` | RecordCount | string | Y | 4 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `rsym` | 실시간조회심볼 | string | Y | 16 |  |
| `excd` | 거래소코드 | string | Y | 4 |  |
| `symb` | 종목코드 | string | Y | 1 |  |
| `name` | 종목명 | string | Y | 48 |  |
| `last` | 현재가 | string | Y | 16 |  |
| `sign` | 기호 | string | Y | 1 |  |
| `diff` | 대비 | string | Y | 12 |  |
| `rate` | 등락율 | string | Y | 12 |  |
| `tvol` | 거래량 | string | Y | 14 |  |
| `pask` | 매도호가 | string | Y | 12 |  |
| `pbid` | 매수호가 | string | Y | 12 |  |
| `n_base` | 기준가 | string | Y | 12 |  |
| `n_diff` | 기준가대비 | string | Y | 12 |  |
| `n_rate` | 기준가대비율 | string | Y | 12 |  |
| `ename` | 영문종목명 | string | Y | 48 |  |
| `e_ordyn` | 매매가능 | string | Y | 2 |  |

---
### 39. 해외주식 매수체결강도상위

| Field | Value |
|---|---|
| Sheet | `해외주식 매수체결강도상위` |
| Menu | [해외주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/overseas-stock/v1/ranking/volume-power` |
| TR_ID (실전) | `HHDFS76280000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `KEYB` | NEXT KEY BUFF | string | Y | 8 | 공백 |
| `AUTH` | 사용자권한정보 | string | Y | 32 | 공백 |
| `EXCD` | 거래소코드 | string | Y | 4 | 'NYS : 뉴욕, NAS : 나스닥,  AMS : 아멕스   HKS : 홍콩, SHS : 상해 , SZS : 심천  HSX : 호치민, HNX : 하노이  TSE : 도쿄 ' |
| `NDAY` | N일자값 | string | Y | 1 | N분전 : 0(1분전), 1(2분전), 2(3분전), 3(5분전), 4(10분전), 5(15분전), 6(20분전), 7(30분전), 8(60분전), 9(120분전) |
| `VOL_RANG` | 거래량조건 | string | Y | 1 | 0(전체), 1(1백주이상), 2(1천주이상), 3(1만주이상), 4(10만주이상), 5(100만주이상), 6(1000만주이상) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `zdiv` | 소수점자리수 | string | Y | 1 |  |
| `stat` | 거래상태 | string | Y | 20 |  |
| `nrec` | RecordCount | string | Y | 4 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `rsym` | 실시간조회심볼 | string | Y | 16 |  |
| `excd` | 거래소코드 | string | Y | 4 |  |
| `symb` | 종목코드 | string | Y | 16 |  |
| `knam` | 종목명 | string | Y | 48 |  |
| `last` | 현재가 | string | Y | 12 |  |
| `sign` | 기호 | string | Y | 1 |  |
| `diff` | 대비 | string | Y | 12 |  |
| `rate` | 등락율 | string | Y | 12 |  |
| `tvol` | 거래량 | string | Y | 14 |  |
| `pask` | 매도호가 | string | Y | 12 |  |
| `pbid` | 매수호가 | string | Y | 12 |  |
| `tpow` | 당일체결강도 | string | Y | 10 |  |
| `powx` | 체결강도 | string | Y | 10 |  |
| `enam` | 영문종목명 | string | Y | 48 |  |
| `e_ordyn` | 매매가능 | string | Y | 2 |  |

---
### 40. 해외주식 거래회전율순위

| Field | Value |
|---|---|
| Sheet | `해외주식 거래회전율순위` |
| Menu | [해외주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/overseas-stock/v1/ranking/trade-turnover` |
| TR_ID (실전) | `HHDFS76340000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `KEYB` | NEXT KEY BUFF | string | Y | 8 | 공백 |
| `AUTH` | 사용자권한정보 | string | Y | 32 | 공백 |
| `EXCD` | 거래소코드 | string | Y | 4 | 'NYS : 뉴욕, NAS : 나스닥,  AMS : 아멕스   HKS : 홍콩, SHS : 상해 , SZS : 심천  HSX : 호치민, HNX : 하노이  TSE : 도쿄 ' |
| `NDAY` | N일자값 | string | Y | 1 | N일전 : 0(당일), 1(2일), 2(3일), 3(5일), 4(10일), 5(20일전), 6(30일), 7(60일), 8(120일), 9(1년) |
| `VOL_RANG` | 거래량조건 | string | Y | 1 | 0(전체), 1(1백주이상), 2(1천주이상), 3(1만주이상), 4(10만주이상), 5(100만주이상), 6(1000만주이상) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `zdiv` | 소수점자리수 | string | Y | 1 |  |
| `stat` | 거래상태정보 | string | Y | 20 |  |
| `crec` | 현재조회종목수 | string | Y | 6 |  |
| `trec` | 전체조회종목수 | string | Y | 6 |  |
| `nrec` | RecordCount | string | Y | 4 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `rsym` | 실시간조회심볼 | string | Y | 16 |  |
| `excd` | 거래소코드 | string | Y | 4 |  |
| `symb` | 종목코드 | string | Y | 1 |  |
| `name` | 종목명 | string | Y | 48 |  |
| `last` | 현재가 | string | Y | 16 |  |
| `sign` | 기호 | string | Y | 1 |  |
| `diff` | 대비 | string | Y | 12 |  |
| `rate` | 등락율 | string | Y | 12 |  |
| `tvol` | 거래량 | string | Y | 14 |  |
| `pask` | 매도호가 | string | Y | 12 |  |
| `pbid` | 매수호가 | string | Y | 12 |  |
| `n_tvol` | 평균거래량 | string | Y | 14 |  |
| `shar` | 상장주식수 | string | Y | 16 |  |
| `tover` | 회전율 | string | Y | 10 |  |
| `rank` | 순위 | string | Y | 6 |  |
| `ename` | 영문종목명 | string | Y | 48 |  |
| `e_ordyn` | 매매가능 | string | Y | 2 |  |

---
### 41. 해외뉴스종합(제목)

| Field | Value |
|---|---|
| Sheet | `해외뉴스종합(제목)` |
| Menu | [해외주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/overseas-price/v1/quotations/news-title` |
| TR_ID (실전) | `HHPSTH60100C1` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `INFO_GB` | 뉴스구분 | string | Y | 1 | 전체: 공백 |
| `CLASS_CD` | 중분류 | string | Y | 2 | 전체: 공백 |
| `NATION_CD` | 국가코드 | string | Y | 2 | 전체: 공백  CN(중국), HK(홍콩), US(미국) |
| `EXCHANGE_CD` | 거래소코드 | string | Y | 3 | 전체: 공백 |
| `SYMB` | 종목코드 | string | Y | 20 | 전체: 공백 |
| `DATA_DT` | 조회일자 | string | Y | 8 | 전체: 공백  특정일자(YYYYMMDD) ex. 20240502 |
| `DATA_TM` | 조회시간 | string | Y | 6 | 전체: 공백  전체: 공백  특정시간(HHMMSS) ex. 093500 |
| `CTS` | 다음키 | string | Y | 35 | 공백 입력 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `outblock1` | 응답상세 | object array | Y |  | array |
| `info_gb` | 뉴스구분 | string | Y | 1 |  |
| `news_key` | 뉴스키 | string | Y | 20 |  |
| `data_dt` | 조회일자 | string | Y | 8 |  |
| `data_tm` | 조회시간 | string | Y | 6 |  |
| `class_cd` | 중분류 | string | Y | 2 |  |
| `class_name` | 중분류명 | string | Y | 20 |  |
| `source` | 자료원 | string | Y | 20 |  |
| `nation_cd` | 국가코드 | string | Y | 2 |  |
| `exchange_cd` | 거래소코드 | string | Y | 3 |  |
| `symb` | 종목코드 | string | Y | 20 |  |
| `symb_name` | 종목명 | string | Y | 48 |  |
| `title` | 제목 | string | Y | 128 |  |

**Request Example:**
```
INFO_GB:  CLASS_CD:  NATION_CD:  EXCHANGE_CD:  SYMB:  DATA_DT:  DATA_TM:  CTS:
```

**Response Example:**
```
{      "outblock1": [          {              "info_gb": "t",              "news_key": "ICH709214",              "data_dt": "20240503",              "data_tm": "145447",              "class_cd": "05",              "class_name": "종목리포트",              "source": "연합미국",              "nation_cd": "US",              "exchange_cd": "",              "symb": "",              "symb_name": "",              "title": "톰 리 “단기 내 금리인하 가능”"          },          {              "info_gb": "t",              "news_key": "ICH709213",              "data_dt": "20240503",              "data_tm": "144451",              "class_cd": "05",              "class_name": "종목리포트",              "source": "연합미국",              "nation_cd": "US",              "exchange_cd": "",              "symb": "",              "symb_name": "",              "title": "美 연준, 7월 금리인하 예상 GS 외"          },          {              "info_gb": "t",              "news_key": "ICH709212",              "data_dt": "20240503",              "data_tm": "144313",              "class_cd": "05",              "class_name": "종목리포트",              "source": "연합미국",              "nation_cd": "US",              "exchange_cd": "NAS",              "symb": "NFLX",              "symb_name": "넷플릭스",              "title": "넷플릭스, 광고 전망 낙관 제프리스"          },          {              "info_gb": "t",              "news_key": "ICH709215",              "data_dt": "20240503",              "data_tm": "143706",              "class_cd": "05",              "class_name": "종목리포트",              "source": "연합미국",              "nation_cd": "US",              "exchange_cd": "",              "symb": "",              "symb_name": "",              "title": "美 4월 비농업부문 고용자 수 +24.0만 명 추정 아데코"          },          {              "info_gb": "t",              "news_key": "ICH709208",              "data_dt": "20240503",              "data_tm": "142518",              "class_cd": "03",              "class_name": "전략/산업",              "source": "연합미국",              "nation_cd": "US",              "exchange_cd": "",              "symb": "",              "symb_name": "",              "title": "美 모기지 금리, 5주 연속 상승"          },          {              "info_gb": "t",              "news_key": "ICH709207",              "data_dt": "20240503",              "data_tm": "141851",              "class_cd": "02",              "class_name": "정책",              "source": "연합미국",              "nation_cd": "US",              "exchange_cd": "",              "symb": "",              "symb_name": "",              "title": "금리, 현재 정점에 있을 확률 높아 펀드스트랫"          },          {              "info_gb": "t",              "news_key": "ICH709206",              "data_dt": "20240503",              "data_tm": "140506",              "class_cd": "05",              "class_name": "종목리포트",              "source": "연합미국",              "nation_cd": "US",              "exchange_cd": "NYS",              "symb": "FSLY",              "symb_name": "패스틀리",              "title": "패스틀리, 단기 악재 직면 - BofA"    
```

---
### 42. 당사 해외주식담보대출 가능 종목

| Field | Value |
|---|---|
| Sheet | `당사 해외주식담보대출 가능 종목` |
| Menu | [해외주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/overseas-price/v1/quotations/colable-by-company` |
| TR_ID (실전) | `CTLN4050R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `PDNO` | 상품번호 | string | Y | 12 | ex)AMD |
| `PRDT_TYPE_CD` | 상품유형코드 | string | Y | 3 | 공백 |
| `INQR_STRT_DT` | 조회시작일자 | string | Y | 8 | 공백 |
| `INQR_END_DT` | 조회종료일자 | string | Y | 8 | 공백 |
| `INQR_DVSN` | 조회구분 | string | Y | 2 | 공백 |
| `NATN_CD` | 국가코드 | string | Y | 3 | 840(미국), 344(홍콩), 156(중국) |
| `INQR_SQN_DVSN` | 조회순서구분 | string | Y | 2 | 01(이름순), 02(코드순) |
| `RT_DVSN_CD` | 비율구분코드 | string | Y | 2 | 공백 |
| `RT` | 비율 | string | Y | 238 | 공백 |
| `LOAN_PSBL_YN` | 대출가능여부 | string | Y | 1 | 공백 |
| `CTX_AREA_FK100` | 연속조회검색조건100 | string | Y | 100 | 공백 |
| `CTX_AREA_NK100` | 연속조회키100 | string | Y | 100 | 공백 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | array | Y |  |  |
| `pdno` | 상품번호 | string | Y | 12 |  |
| `ovrs_item_name` | 해외종목명 | string | Y | 60 |  |
| `loan_rt` | 대출비율 | string | Y | 238 |  |
| `mgge_mntn_rt` | 담보유지비율 | string | Y | 238 |  |
| `mgge_ensu_rt` | 담보확보비율 | string | Y | 238 |  |
| `loan_exec_psbl_yn` | 대출실행가능여부 | string | Y | 1 |  |
| `stff_name` | 직원명 | string | Y | 60 |  |
| `erlm_dt` | 등록일자 | string | Y | 8 |  |
| `tr_mket_name` | 거래시장명 | string | Y | 60 |  |
| `crcy_cd` | 통화코드 | string | Y | 3 |  |
| `natn_kor_name` | 국가한글명 | string | Y | 60 |  |
| `ovrs_excg_cd` | 해외거래소코드 | string | Y | 4 |  |
| `output2` | 응답상세 | object | Y |  | array |
| `loan_psbl_item_num` | 대출가능종목수 | string | Y | 20 |  |

**Request Example:**
```
PDNO:AMD  PRDT_TYPE_CD:  INQR_STRT_DT:  INQR_END_DT:  INQR_DVSN:  NATN_CD:840  INQR_SQN_DVSN:02  RT_DVSN_CD:  RT:  LOAN_PSBL_YN:  CTX_AREA_FK100:  CTX_AREA_NK100:
```

**Response Example:**
```
{      "ctx_area_fk100": "AMD!^!^!^!^!^840!^02                                                                                ",      "ctx_area_nk100": "                                                                                                    ",      "output1": [          {              "pdno": "AMD",              "ovrs_item_name": "AMD",              "loan_rt": "50.00000000",              "mgge_mntn_rt": "170.00000000",              "mgge_ensu_rt": "170.00000000",              "loan_exec_psbl_yn": "Y",              "stff_name": "109477.석재민",              "erlm_dt": "20221230",              "tr_mket_name": "나스닥",              "crcy_cd": "USD",              "natn_kor_name": "미국",              "ovrs_excg_cd": "NASD"          }      ],      "output2": {          "loan_psbl_item_num": "403"      },      "rt_cd": "0",      "msg_cd": "KIOK0460",      "msg1": "조회 되었습니다. (마지막 자료)                                                  "  }
```

---
### 43. 해외주식 시가총액순위

| Field | Value |
|---|---|
| Sheet | `해외주식 시가총액순위` |
| Menu | [해외주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/overseas-stock/v1/ranking/market-cap` |
| TR_ID (실전) | `HHDFS76350100` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `KEYB` | NEXT KEY BUFF | string | Y | 1 | 공백 |
| `AUTH` | 사용자권한정보 | string | Y | 32 | 공백 |
| `EXCD` | 거래소코드 | string | Y | 4 | 'NYS : 뉴욕, NAS : 나스닥,  AMS : 아멕스   HKS : 홍콩, SHS : 상해 , SZS : 심천  HSX : 호치민, HNX : 하노이  TSE : 도쿄 ' |
| `VOL_RANG` | 거래량조건 | string | Y | 1 | 0(전체), 1(1백주이상), 2(1천주이상), 3(1만주이상), 4(10만주이상), 5(100만주이상), 6(1000만주이상) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `zdiv` | 소수점자리수 | string | Y | 1 |  |
| `stat` | 거래상태정보 | string | Y | 20 |  |
| `crec` | 현재조회종목수 | string | Y | 6 |  |
| `trec` | 전체조회종목수 | string | Y | 6 |  |
| `nrec` | RecordCount | string | Y | 4 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `rsym` | 실시간조회심볼 | string | Y | 16 |  |
| `excd` | 거래소코드 | string | Y | 4 |  |
| `symb` | 종목코드 | string | Y | 1 |  |
| `name` | 종목명 | string | Y | 48 |  |
| `last` | 현재가 | string | Y | 16 |  |
| `sign` | 기호 | string | Y | 1 |  |
| `diff` | 대비 | string | Y | 12 |  |
| `rate` | 등락율 | string | Y | 12 |  |
| `tvol` | 거래량 | string | Y | 14 |  |
| `shar` | 상장주식수 | string | Y | 16 |  |
| `tomv` | 시가총액 | string | Y | 16 |  |
| `grav` | 비중 | string | Y | 10 |  |
| `rank` | 순위 | string | Y | 6 |  |
| `ename` | 영문종목명 | string | Y | 48 |  |
| `e_ordyn` | 매매가능 | string | Y | 2 |  |

---
### 44. 해외속보(제목)

| Field | Value |
|---|---|
| Sheet | `해외속보(제목)` |
| Menu | [해외주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/overseas-price/v1/quotations/brknews-title` |
| TR_ID (실전) | `FHKST01011801` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_NEWS_OFER_ENTP_CODE` | 뉴스제공업체코드 | string | Y | 40 | 뉴스제공업체구분=>0:전체조회 |
| `FID_COND_MRKT_CLS_CODE` | 조건시장구분코드 | string | Y | 6 | 공백 |
| `FID_INPUT_ISCD` | 입력종목코드 | string | Y | 12 | 공백 |
| `FID_TITL_CNTT` | 제목내용 | string | Y | 132 | 공백 |
| `FID_INPUT_DATE_1` | 입력날짜1 | string | Y | 10 | 공백 |
| `FID_INPUT_HOUR_1` | 입력시간1 | string | Y | 10 | 공백 |
| `FID_RANK_SORT_CLS_CODE` | 순위정렬구분코드 | string | Y | 2 | 공백 |
| `FID_INPUT_SRNO` | 입력일련번호 | string | Y | 20 | 공백 |
| `FID_COND_SCR_DIV_CODE` | 조건화면분류코드 | string | Y | 5 | 화면번호:11801 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `cntt_usiq_srno` | 내용조회용일련번호 | string | Y | 20 |  |
| `news_ofer_entp_code` | 뉴스제공업체코드 | string | Y | 1 |  |
| `data_dt` | 작성일자 | string | Y | 8 |  |
| `data_tm` | 작성시간 | string | Y | 6 |  |
| `hts_pbnt_titl_cntt` | HTS공시제목내용 | string | Y | 400 |  |
| `news_lrdv_code` | 뉴스대구분 | string | Y | 8 |  |
| `dorg` | 자료원 | string | Y | 20 |  |
| `iscd1` | 종목코드1 | string | Y | 9 |  |
| `iscd2` | 종목코드2 | string | Y | 9 |  |
| `iscd3` | 종목코드3 | string | Y | 9 |  |
| `iscd4` | 종목코드4 | string | Y | 9 |  |
| `iscd5` | 종목코드5 | string | Y | 9 |  |
| `iscd6` | 종목코드6 | string | Y | 9 |  |
| `iscd7` | 종목코드7 | string | Y | 9 |  |
| `iscd8` | 종목코드8 | string | Y | 9 |  |
| `iscd9` | 종목코드9 | string | Y | 9 |  |
| `iscd10` | 종목코드10 | string | Y | 9 |  |
| `kor_isnm1` | 한글종목명1 | string | Y | 40 |  |
| `kor_isnm2` | 한글종목명2 | string | Y | 40 |  |
| `kor_isnm3` | 한글종목명3 | string | Y | 40 |  |
| `kor_isnm4` | 한글종목명4 | string | Y | 40 |  |
| `kor_isnm5` | 한글종목명5 | string | Y | 40 |  |
| `kor_isnm6` | 한글종목명6 | string | Y | 40 |  |
| `kor_isnm7` | 한글종목명7 | string | Y | 40 |  |
| `kor_isnm8` | 한글종목명8 | string | Y | 40 |  |
| `kor_isnm9` | 한글종목명9 | string | Y | 40 |  |
| `kor_isnm10` | 한글종목명10 | string | Y | 40 |  |

**Request Example:**
```
FID_NEWS_OFER_ENTP_CODE:0  FID_COND_MRKT_CLS_CODE:00  FID_INPUT_ISCD:  FID_TITL_CNTT:  FID_INPUT_DATE_1:  FID_INPUT_HOUR_1:  FID_RANK_SORT_CLS_CODE:  FID_INPUT_SRNO:  FID_COND_SCR_DIV_CODE:11801
```

**Response Example:**
```
{      "output": [          {              "cntt_usiq_srno": "2024052817340622954",              "news_ofer_entp_code": "U",              "data_dt": "20240528",              "data_tm": "173406",              "hts_pbnt_titl_cntt": "“시진핑, 기업인들 만나 신에너지 분야 과잉투자 경고”",              "news_lrdv_code": "38",              "dorg": "서울경제",              "iscd1": "",              "iscd2": "",              "iscd3": "",              "iscd4": "",              "iscd5": "",              "iscd6": "",              "iscd7": "",              "iscd8": "",              "iscd9": "",              "iscd10": "",              "kor_isnm1": " ",              "kor_isnm2": "",              "kor_isnm3": "",              "kor_isnm4": "",              "kor_isnm5": "",              "kor_isnm6": "",              "kor_isnm7": "",              "kor_isnm8": "",              "kor_isnm9": "",              "kor_isnm10": ""          },          {              "cntt_usiq_srno": "2024052817332725534",              "news_ofer_entp_code": "6",              "data_dt": "20240528",              "data_tm": "173327",              "hts_pbnt_titl_cntt": "군부대 찾은 라이칭더, 中포위훈련 언급하며 \"모두 잘 대응\"",              "news_lrdv_code": "11",              "dorg": "연합뉴스",              "iscd1": "",              "iscd2": "",              "iscd3": "",              "iscd4": "",              "iscd5": "",              "iscd6": "",              "iscd7": "",              "iscd8": "",              "iscd9": "",              "iscd10": "",              "kor_isnm1": " ",              "kor_isnm2": "",              "kor_isnm3": "",              "kor_isnm4": "",              "kor_isnm5": "",              "kor_isnm6": "",              "kor_isnm7": "",              "kor_isnm8": "",              "kor_isnm9": "",              "kor_isnm10": ""          },          {              "cntt_usiq_srno": "2024052817332721133",              "news_ofer_entp_code": "6",              "data_dt": "20240528",              "data_tm": "173327",              "hts_pbnt_titl_cntt": "적십자 \"기후변화로 '극단적 더위' 일수 1년 새 26일 증가\"",              "news_lrdv_code": "11",              "dorg": "연합뉴스",              "iscd1": "",              "iscd2": "",              "iscd3": "",              "iscd4": "",              "iscd5": "",              "iscd6": "",              "iscd7": "",              "iscd8": "",              "iscd9": "",              "iscd10": "",              "kor_isnm1": " ",              "kor_isnm2": "",              "kor_isnm3": "",              "kor_isnm4": "",              "kor_isnm5": "",              "kor_isnm6": "",              "kor_isnm7": "",              "kor_isnm8": "",              "kor_isnm9": "",              "kor_isnm10": ""          },          {              "cntt_usiq_srno": "2024052817312094823",              "news_ofer_entp_code": "6",              "data_dt": "20240528",              "data_tm": "173120",              "hts_pbnt_titl_cntt": "미국제재 우려했나…중국 하이크비전, 러시아 사업 중단설",              "news_lrdv_code": "11",              "dorg": "연합뉴스",    
```

---
### 45. 해외주식 상승율_하락율

| Field | Value |
|---|---|
| Sheet | `해외주식 상승율_하락율` |
| Menu | [해외주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/overseas-stock/v1/ranking/updown-rate` |
| TR_ID (실전) | `HHDFS76290000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `KEYB` | NEXT KEY BUFF | string | Y | 8 | 공백 |
| `AUTH` | 사용자권한정보 | string | Y | 32 | 공백 |
| `EXCD` | 거래소코드 | string | Y | 4 | 'NYS : 뉴욕, NAS : 나스닥,  AMS : 아멕스   HKS : 홍콩, SHS : 상해 , SZS : 심천  HSX : 호치민, HNX : 하노이  TSE : 도쿄 ' |
| `GUBN` | 상승율/하락율 구분 | string | Y | 1 | 0(하락율), 1(상승율) |
| `NDAY` | N일자값 | string | Y | 1 | N일전 : 0(당일), 1(2일), 2(3일), 3(5일), 4(10일), 5(20일전), 6(30일), 7(60일), 8(120일), 9(1년) |
| `VOL_RANG` | 거래량조건 | string | Y | 1 | 0(전체), 1(1백주이상), 2(1천주이상), 3(1만주이상), 4(10만주이상), 5(100만주이상), 6(1000만주이상) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `zdiv` | 소수점자리수 | string | Y | 1 |  |
| `stat` | 거래상태정보 | string | Y | 20 |  |
| `crec` | 현재Count | string | Y | 6 |  |
| `trec` | 전체조회종목수 | string | Y | 6 |  |
| `nrec` | RecordCount | string | Y | 4 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `rsym` | 실시간조회심볼 | string | Y | 16 |  |
| `excd` | 거래소코드 | string | Y | 4 |  |
| `symb` | 종목코드 | string | Y | 1 |  |
| `name` | 종목명 | string | Y | 48 |  |
| `last` | 현재가 | string | Y | 16 |  |
| `sign` | 기호 | string | Y | 1 |  |
| `diff` | 대비 | string | Y | 12 |  |
| `rate` | 등락율 | string | Y | 12 |  |
| `tvol` | 거래량 | string | Y | 14 |  |
| `pask` | 매도호가 | string | Y | 12 |  |
| `pbid` | 매수호가 | string | Y | 12 |  |
| `n_base` | 기준가격 | string | Y | 12 |  |
| `n_diff` | 기준가격대비 | string | Y | 12 |  |
| `n_rate` | 기준가격대비율 | string | Y | 12 |  |
| `rank` | 순위 | string | Y | 6 |  |
| `ename` | 영문종목명 | string | Y | 48 |  |
| `e_ordyn` | 매매가능 | string | Y | 2 |  |

---
### 46. 해외주식 권리종합

| Field | Value |
|---|---|
| Sheet | `해외주식 권리종합` |
| Menu | [해외주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/overseas-price/v1/quotations/rights-by-ice` |
| TR_ID (실전) | `HHDFS78330900` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `NCOD` | 국가코드 | string | Y | 2 | CN:중국 HK:홍콩 US:미국 JP:일본 VN:베트남 |
| `SYMB` | 심볼 | string | Y | 20 | 종목코드 |
| `ST_YMD` | 일자 시작일 | string | Y | 8 | 미입력 시, 오늘-3개월  기간지정 시, 종료일 입력(ex. 20240514)    ※ 조회기간 기준일 입력시 참고  - 상환: 상환일자, 조기상환: 조기상환일자, 티커변경: 적용일, 그 외: 발표일 |
| `ED_YMD` | 일자 종료일 | string | Y | 8 | 미입력 시, 오늘+3개월  기간지정 시, 종료일 입력(ex. 20240514)    ※ 조회기간 기준일 입력시 참고  - 상환: 상환일자, 조기상환: 조기상환일자, 티커변경: 적용일, 그 외: 발표일 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `anno_dt` | ICE공시일 | string | Y | 8 |  |
| `ca_title` | 권리유형 | string | Y | 12 |  |
| `div_lock_dt` | 배당락일 | string | Y | 8 |  |
| `pay_dt` | 지급일 | string | Y | 8 |  |
| `record_dt` | 기준일 | string | Y | 8 |  |
| `validity_dt` | 효력일자 | string | Y | 8 |  |
| `local_end_dt` | 현지지시마감일 | string | Y | 8 |  |
| `lock_dt` | 권리락일 | string | Y | 8 |  |
| `delist_dt` | 상장폐지일 | string | Y | 8 |  |
| `redempt_dt` | 상환일자 | string | Y | 8 |  |
| `early_redempt_dt` | 조기상환일자 | string | Y | 8 |  |
| `effective_dt` | 적용일 | string | Y | 8 |  |

**Request Example:**
```
NCOD:US  SYMB:MAIN  ST_YMD:20240214  ED_YMD:20240514
```

**Response Example:**
```
{      "output1": [          {              "anno_dt": "20240221",              "ca_title": "현금배당",              "div_lock_dt": "20240607",              "pay_dt": "20240614",              "record_dt": "20240607",              "validity_dt": "",              "local_end_dt": "",              "lock_dt": "",              "delist_dt": "",              "redempt_dt": "",              "early_redempt_dt": "",              "effective_dt": ""          },          {              "anno_dt": "20240221",              "ca_title": "현금배당",              "div_lock_dt": "20240405",              "pay_dt": "20240415",              "record_dt": "20240408",              "validity_dt": "",              "local_end_dt": "",              "lock_dt": "",              "delist_dt": "",              "redempt_dt": "",              "early_redempt_dt": "",              "effective_dt": ""          },          {              "anno_dt": "20240221",              "ca_title": "현금배당",              "div_lock_dt": "20240507",              "pay_dt": "20240515",              "record_dt": "20240508",              "validity_dt": "",              "local_end_dt": "",              "lock_dt": "",              "delist_dt": "",              "redempt_dt": "",              "early_redempt_dt": "",              "effective_dt": ""          },          {              "anno_dt": "20240507",              "ca_title": "현금배당",              "div_lock_dt": "20240808",              "pay_dt": "20240815",              "record_dt": "20240808",              "validity_dt": "",              "local_end_dt": "",              "lock_dt": "",              "delist_dt": "",              "redempt_dt": "",              "early_redempt_dt": "",              "effective_dt": ""          },          {              "anno_dt": "20240507",              "ca_title": "현금배당",              "div_lock_dt": "20240708",              "pay_dt": "20240715",              "record_dt": "20240708",              "validity_dt": "",              "local_end_dt": "",              "lock_dt": "",              "delist_dt": "",              "redempt_dt": "",              "early_redempt_dt": "",              "effective_dt": ""          },          {              "anno_dt": "20240507",              "ca_title": "현금배당",              "div_lock_dt": "20240906",              "pay_dt": "20240913",              "record_dt": "20240906",              "validity_dt": "",              "local_end_dt": "",              "lock_dt": "",              "delist_dt": "",              "redempt_dt": "",              "early_redempt_dt": "",              "effective_dt": ""          }      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 47. 해외주식 거래량순위

| Field | Value |
|---|---|
| Sheet | `해외주식 거래량순위` |
| Menu | [해외주식] 시세분석 |
| Method | `GET` |
| URL | `/uapi/overseas-stock/v1/ranking/trade-vol` |
| TR_ID (실전) | `HHDFS76310010` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `KEYB` | NEXT KEY BUFF | string | Y | 8 | 공백 |
| `AUTH` | 사용자권한정보 | string | Y | 32 | 공백 |
| `EXCD` | 거래소코드 | string | Y | 4 | 'NYS : 뉴욕, NAS : 나스닥,  AMS : 아멕스   HKS : 홍콩, SHS : 상해 , SZS : 심천  HSX : 호치민, HNX : 하노이  TSE : 도쿄 ' |
| `NDAY` | N일자값 | string | Y | 1 | N일전 : 0(당일), 1(2일), 2(3일), 3(5일), 4(10일), 5(20일전), 6(30일), 7(60일), 8(120일), 9(1년) |
| `PRC1` | 현재가 필터범위 1 | string | Y | 12 | 가격 ~ |
| `PRC2` | 현재가 필터범위 2 | string | Y | 12 | ~ 가격 |
| `VOL_RANG` | 거래량조건 | string | Y | 1 | 0(전체), 1(1백주이상), 2(1천주이상), 3(1만주이상), 4(10만주이상), 5(100만주이상), 6(1000만주이상) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `zdiv` | 소수점자리수 | string | Y | 1 |  |
| `stat` | 거래상태정보 | string | Y | 20 |  |
| `crec` | 현재조회종목수 | string | Y | 6 |  |
| `trec` | 전체조회종목수 | string | Y | 6 |  |
| `nrec` | RecordCount | string | Y | 4 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `rsym` | 실시간조회심볼 | string | Y | 16 |  |
| `excd` | 거래소코드 | string | Y | 4 |  |
| `symb` | 종목코드 | string | Y | 1 |  |
| `name` | 종목명 | string | Y | 48 |  |
| `last` | 현재가 | string | Y | 16 |  |
| `sign` | 기호 | string | Y | 1 |  |
| `diff` | 대비 | string | Y | 12 |  |
| `rate` | 등락율 | string | Y | 12 |  |
| `pask` | 매도호가 | string | Y | 12 |  |
| `pbid` | 매수호가 | string | Y | 12 |  |
| `tvol` | 거래량 | string | Y | 14 |  |
| `tamt` | 거래대금 | string | Y | 14 |  |
| `a_tvol` | 평균거래량 | string | Y | 14 |  |
| `rank` | 순위 | string | Y | 6 |  |
| `ename` | 영문종목명 | string | Y | 48 |  |
| `e_ordyn` | 매매가능 | string | Y | 2 |  |

---
### 48. 해외주식 실시간호가

| Field | Value |
|---|---|
| Sheet | `해외주식 실시간호가` |
| Menu | [해외주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/HDFSASP0` |
| TR_ID (실전) | `HDFSASP0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 286 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | "1: 등록, 2:해제" |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 7 | HDFSASP0 |
| `tr_key` | R거래소명종목코드 | string | Y | 6 | <미국 야간거래 - 무료시세>  D+시장구분(3자리)+종목코드  예) DNASAAPL : D+NAS(나스닥)+AAPL(애플)  [시장구분]  NYS : 뉴욕, NAS : 나스닥, AMS : 아멕스    <미국 주간거래>  R+시장구분(3자리)+종목코드  예) RBAQAAPL : R+BAQ(나스닥)+AAPL(애플)  [시장구분]  BAY : 뉴욕(주간), BAQ : 나스닥(주간). BAA : 아멕스(주간)    <아시아국가 - 유료시세>  ※ 유료시세 신청시에만 유료시세 수신가능  "포럼 > FAQ > 해외주식 유료시세 신청방법" 참고  R+시장구분(3자리)+종목코드  예) RHKS00003 : R+HKS(홍콩)+00003(홍콩중화가스)  [시장구분]  TSE : 도쿄, HKS : 홍콩,  SHS : 상해, SZS : 심천  HSX : 호치민, HNX : 하노이 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `RSYM` | 실시간종목코드 | object | Y | 16 | '각 항목사이에는 구분자로 ^ 사용,  모든 데이터타입은 String으로 변환되어 push 처리됨' |
| `SYMB` | 종목코드 | string | Y | 16 |  |
| `ZDIV` | 소숫점자리수 | string | Y | 1 |  |
| `XYMD` | 현지일자 | string | Y | 8 |  |
| `XHMS` | 현지시간 | string | Y | 6 |  |
| `KYMD` | 한국일자 | string | Y | 8 |  |
| `KHMS` | 한국시간 | string | Y | 6 |  |
| `BVOL` | 매수총잔량 | string | Y | 10 |  |
| `AVOL` | 매도총잔량 | string | Y | 10 |  |
| `BDVL` | 매수총잔량대비 | string | Y | 10 |  |
| `ADVL` | 매도총잔량대비 | string | Y | 10 |  |
| `PBID1` | 매수호가1 | string | Y | 12 |  |
| `PASK1` | 매도호가1 | string | Y | 12 |  |
| `VBID1` | 매수잔량1 | string | Y | 10 |  |
| `VASK1` | 매도잔량1 | string | Y | 10 |  |
| `DBID1` | 매수잔량대비1 | string | Y | 10 |  |
| `DASK1` | 매도잔량대비1 | string | Y | 10 |  |
| `PBID2` | 매수호가2 | string | Y | 12 |  |
| `PASK2` | 매도호가2 | string | Y | 12 |  |
| `VBID2` | 매수잔량2 | string | Y | 10 |  |
| `VASK2` | 매도잔량2 | string | Y | 10 |  |
| `DBID2` | 매수잔량대비2 | string | Y | 10 |  |
| `DASK2` | 매도잔량대비2 | string | Y | 10 |  |
| `PBID3` | 매수호가3 | string | Y | 12 |  |
| `PASK3` | 매도호가3 | string | Y | 12 |  |
| `VBID3` | 매수잔량3 | string | Y | 10 |  |
| `VASK3` | 매도잔량3 | string | Y | 10 |  |
| `DBID3` | 매수잔량대비3 | string | Y | 10 |  |
| `DASK3` | 매도잔량대비3 | string | Y | 10 |  |
| `PBID3` | 매수호가3 | string | Y | 12 |  |
| `PASK3` | 매도호가3 | string | Y | 12 |  |
| `VBID3` | 매수잔량3 | string | Y | 10 |  |
| `VASK3` | 매도잔량3 | string | Y | 10 |  |
| `DBID3` | 매수잔량대비3 | string | Y | 10 |  |
| `DASK3` | 매도잔량대비3 | string | Y | 10 |  |
| `PBID4` | 매수호가4 | string | Y | 12 |  |
| `PASK4` | 매도호가4 | string | Y | 12 |  |
| `VBID4` | 매수잔량4 | string | Y | 10 |  |
| `VASK4` | 매도잔량4 | string | Y | 10 |  |
| `DBID4` | 매수잔량대비4 | string | Y | 10 |  |
| `DASK4` | 매도잔량대비4 | string | Y | 10 |  |
| `PBID5` | 매수호가5 | string | Y | 12 |  |
| `PASK5` | 매도호가5 | string | Y | 12 |  |
| `VBID5` | 매수잔량5 | string | Y | 10 |  |
| `VASK5` | 매도잔량5 | string | Y | 10 |  |
| `DBID5` | 매수잔량대비5 | string | Y | 10 |  |
| `DASK5` | 매도잔량대비5 | string | Y | 10 |  |
| `PBID6` | 매수호가6 | string | Y | 12 |  |
| `PASK6` | 매도호가6 | string | Y | 12 |  |
| `VBID6` | 매수잔량6 | string | Y | 10 |  |
| `VASK6` | 매도잔량6 | string | Y | 10 |  |
| `DBID6` | 매수잔량대비6 | string | Y | 10 |  |
| `DASK6` | 매도잔량대비6 | string | Y | 10 |  |
| `PBID7` | 매수호가7 | string | Y | 12 |  |
| `PASK7` | 매도호가7 | string | Y | 12 |  |
| `VBID7` | 매수잔량7 | string | Y | 10 |  |
| `VASK7` | 매도잔량7 | string | Y | 10 |  |
| `DBID7` | 매수잔량대비7 | string | Y | 10 |  |
| `DASK7` | 매도잔량대비7 | string | Y | 10 |  |
| `PBID8` | 매수호가8 | string | Y | 12 |  |
| `PASK8` | 매도호가8 | string | Y | 12 |  |
| `VBID8` | 매수잔량8 | string | Y | 10 |  |
| `VASK8` | 매도잔량8 | string | Y | 10 |  |
| `DBID8` | 매수잔량대비8 | string | Y | 10 |  |
| `DASK8` | 매도잔량대비8 | string | Y | 10 |  |
| `PBID9` | 매수호가9 | string | Y | 12 |  |
| `PASK9` | 매도호가9 | string | Y | 12 |  |
| `VBID9` | 매수잔량9 | string | Y | 10 |  |
| `VASK9` | 매도잔량9 | string | Y | 10 |  |
| `DBID9` | 매수잔량대비9 | string | Y | 10 |  |
| `DASK9` | 매도잔량대비9 | string | Y | 10 |  |
| `PBID10` | 매수호가10 | string | Y | 12 |  |
| `PASK10` | 매도호가10 | string | Y | 12 |  |
| `VBID10` | 매수잔량10 | string | Y | 10 |  |
| `VASK10` | 매도잔량10 | string | Y | 10 |  |
| `DBID10` | 매수잔량대비10 | string | Y | 10 |  |
| `DASK10` | 매도잔량대비10 | string | Y | 10 |  |

**Request Example:**
```
{      "header": {          "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",          "custtype": "P",          "tr_type": "1",          "content-type": "utf-8"      },      "body": {          "input": {              "tr_id": "HDFSASP0",              "tr_key": "RBAQAAPL"          }      }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "HDFSASP0",           "tr_key": "RBAQAAPL",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output  0\|HDFSASP0\|001\|RBAQAAPL^AAPL^4^20240506^202223^20240507^092223^1482^381^0^-10^182.8500^182.8700^350^57^0^-10^182.8400^182.9000^1^10^0^0^182.8300^182.9100^6^54^0^0^182.7900^182.9500^54^5^0^0^182.7500^182.9600^309^3^0^0^182.7300^182.9700^20^81^0^0^182.7000^182.9800^124^3^0^0^182.6600^182.9900^397^1^0^0^182.6500^183.0000^20^69^0^0^182.6300^183.0100^201^98^0^0
```

---
### 49. 해외주식 지연호가(아시아)

| Field | Value |
|---|---|
| Sheet | `해외주식 지연호가(아시아)` |
| Menu | [해외주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/HDFSASP1` |
| TR_ID (실전) | `HDFSASP1` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 286 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | "1: 등록, 2:해제" |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 7 | HDFSASP1 |
| `tr_key` | D거래소명종목코드 | string | Y | 6 | <아시아국가 - 무료시세>  D+시장구분(3자리)+종목코드  예) DHKS00003 : D+HKS(홍콩)+00003(홍콩중화가스)  [시장구분]  TSE : 도쿄, HKS : 홍콩,  SHS : 상해, SZS : 심천  HSX : 호치민, HNX : 하노이 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `RSYM` | 실시간종목코드 | string | Y | 16 | '각 항목사이에는 구분자로 ^ 사용,  모든 데이터타입은 String으로 변환되어 push 처리됨' |
| `SYMB` | 종목코드 | string | Y | 16 |  |
| `ZDIV` | 소수점자리수 | string | Y | 1 |  |
| `XYMD` | 현지일자 | string | Y | 8 |  |
| `XHMS` | 현지시간 | string | Y | 6 |  |
| `KYMD` | 한국일자 | string | Y | 8 |  |
| `KHMS` | 한국시간 | string | Y | 6 |  |
| `BVOL` | 매수총잔량 | string | Y | 10 |  |
| `AVOL` | 매도총잔량 | string | Y | 10 |  |
| `BDVL` | 매수총잔량대비 | string | Y | 10 |  |
| `ADVL` | 매도총잔량대비 | string | Y | 10 |  |
| `PBID1` | 매수호가1 | string | Y | 12 |  |
| `PASK1` | 매도호가1 | string | Y | 12 |  |
| `VBID1` | 매수잔량1 | string | Y | 10 |  |
| `VASK1` | 매도잔량1 | string | Y | 10 |  |
| `DBID1` | 매수잔량대비1 | string | Y | 10 |  |
| `DASK1` | 매도잔량대비1 | string | Y | 10 |  |

---
### 50. 해외주식 실시간지연체결가

| Field | Value |
|---|---|
| Sheet | `해외주식 실시간지연체결가` |
| Menu | [해외주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/HDFSCNT0` |
| TR_ID (실전) | `HDFSCNT0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 286 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | 1: 등록, 2:해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 7 | HDFSCNT0 |
| `tr_key` | D거래소명종목코드 | string | Y | 6 | <미국 야간거래/아시아 주간거래 - 무료시세>  D+시장구분(3자리)+종목코드  예) DNASAAPL : D+NAS(나스닥)+AAPL(애플)  [시장구분]  NYS : 뉴욕, NAS : 나스닥, AMS : 아멕스 ,  TSE : 도쿄, HKS : 홍콩,  SHS : 상해, SZS : 심천  HSX : 호치민, HNX : 하노이    <미국 야간거래/아시아 주간거래 - 유료시세>  ※ 유료시세 신청시에만 유료시세 수신가능  "포럼 > FAQ > 해외주식 유료시세 신청방법" 참고  R+시장구분(3자리)+종목코드  예) RNASAAPL : R+NAS(나스닥)+AAPL(애플)  [시장구분]  NYS : 뉴욕, NAS : 나스닥, AMS : 아멕스 ,  TSE : 도쿄, HKS : 홍콩,  SHS : 상해, SZS : 심천  HSX : 호치민, HNX : 하노이    <미국 주간거래>  R+시장구분(3자리)+종목코드  예) RBAQAAPL : R+BAQ(나스닥)+AAPL(애플)  [시장구분]  BAY : 뉴욕(주간), BAQ : 나스닥(주간). BAA : 아멕스(주간) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `RSYM` | 실시간종목코드 | string | Y | 16 | '각 항목사이에는 구분자로 ^ 사용,  모든 데이터타입은 String으로 변환되어 push 처리됨' |
| `SYMB` | 종목코드 | string | Y | 16 |  |
| `ZDIV` | 수수점자리수 | string | Y | 1 |  |
| `TYMD` | 현지영업일자 | string | Y | 8 |  |
| `XYMD` | 현지일자 | string | Y | 6 |  |
| `XHMS` | 현지시간 | string | Y | 6 |  |
| `KYMD` | 한국일자 | string | Y | 6 |  |
| `KHMS` | 한국시간 | string | Y | 6 |  |
| `OPEN` | 시가 | string | Y | 6 |  |
| `HIGH` | 고가 | string | Y | 6 |  |
| `LOW` | 저가 | string | Y | 6 |  |
| `LAST` | 현재가 | string | Y | 6 |  |
| `SIGN` | 대비구분 | string | Y | 6 |  |
| `DIFF` | 전일대비 | string | Y | 8 |  |
| `RATE` | 등락율 | string | Y | 6 |  |
| `PBID` | 매수호가 | string | Y | 10 |  |
| `PASK` | 매도호가 | string | Y | 10 |  |
| `VBID` | 매수잔량 | string | Y | 10 |  |
| `VASK` | 매도잔량 | string | Y | 10 |  |
| `EVOL` | 체결량 | string | Y | 12 |  |
| `TVOL` | 거래량 | string | Y | 12 |  |
| `TAMT` | 거래대금 | string | Y | 10 |  |
| `BIVL` | 매도체결량 | string | Y | 10 | 매수호가가 매도주문 수량을 따라가서 체결된것을 표현하여 BIVL 이라는 표현을 사용 |
| `ASVL` | 매수체결량 | string | Y | 10 | 매도호가가 매수주문 수량을 따라가서 체결된것을 표현하여 ASVL 이라는 표현을 사용 |
| `STRN` | 체결강도 | string | Y | 10 |  |
| `MTYP` | 시장구분 1:장중,2:장전,3:장후 | string | Y | 10 |  |

---
### 51. 해외주식 실시간체결통보

| Field | Value |
|---|---|
| Sheet | `해외주식 실시간체결통보` |
| Menu | [해외주식] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0GSCNI0` |
| TR_ID (실전) | `H0GSCNI0` |
| TR_ID (모의) | `H0GSCNI9` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 286 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | 1: 등록, 2:해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 7 | [실전투자]  H0GSCNI0 : 실시간 해외주식 체결통보    [모의투자]  H0GSCNI9 : 실시간 해외주식 체결통보 |
| `tr_key` | HTSID | string | Y | 8 | HTSID |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CUST_ID` | 고객 ID | string | Y | 8 | '각 항목사이에는 구분자로 ^ 사용,  모든 데이터타입은 String으로 변환되어 push 처리됨' |
| `ACNT_NO` | 계좌번호 | string | Y | 10 |  |
| `ODER_NO` | 주문번호 | string | Y | 10 |  |
| `OODER_NO` | 원주문번호 | string | Y | 10 |  |
| `SELN_BYOV_CLS` | 매도매수구분 | string | Y | 2 | 01:매도 02:매수 03:전매도 04:환매수 |
| `RCTF_CLS` | 정정구분 | string | Y | 1 | 0:정상 1:정정 2:취소 |
| `ODER_KIND2` | 주문종류2 | string | Y | 1 | 1:시장가 2:지정자 6:단주시장가 7:단주지정가  A:MOO B:LOO C:MOC D:LOC |
| `STCK_SHRN_ISCD` | 주식 단축 종목코드 | string | Y | 9 |  |
| `CNTG_QTY` | 체결수량 | string | Y | 10 | - 주문통보의 경우 해당 위치에 주문수량이 출력  - 체결통보인 경우 해당 위치에 체결수량이 출력 |
| `CNTG_UNPR` | 체결단가 | string | Y | 9 | ※ 주문통보 시에는 주문단가가, 체결통보 시에는 체결단가가 수신 됩니다.  ※ 체결단가의 경우, 국가에 따라 소수점 생략 위치가 상이합니다.  미국 4 일본 1 중국 3 홍콩 3 베트남 0  EX) 미국 AAPL(현재가 : 148.0100)의 경우 001480100으로 체결단가가 오는데,   4번째 자리에 소수점을 찍어 148.01로 해석하시면 됩니다. |
| `STCK_CNTG_HOUR` | 주식 체결 시간 | string | Y | 6 | 특정 거래소의 체결시간 데이터는 수신되지 않습니다.   체결시간 데이터가 필요할 경우, 체결통보 데이터 수신 시 타임스탬프를 찍는 것으로 대체하시길 바랍니다. |
| `RFUS_YN` | 거부여부 | string | Y | 1 | 0:정상 1:거부 |
| `CNTG_YN` | 체결여부 | string | Y | 1 | 1:주문,정정,취소,거부 2:체결 |
| `ACPT_YN` | 접수여부 | string | Y | 1 | 1:주문접수 2:확인 3:취소(FOK/IOC) |
| `BRNC_NO` | 지점번호 | string | Y | 5 |  |
| `ODER_QTY` | 주문 수량 | string | Y | 9 | - 주문통보인 경우 해당 위치 미출력 (주문통보의 주문수량은 CNTG_QTY 위치에 출력)  - 체결통보인 경우 해당 위치에 주문수량이 출력 |
| `ACNT_NAME` | 계좌명 | string | Y | 12 |  |
| `CNTG_ISNM` | 체결종목명 | string | Y | 14 |  |
| `ODER_COND` | 해외종목구분 | string | Y | 1 | 4:홍콩(HKD) 5:상해B(USD)   6:NASDAQ 7:NYSE 8:AMEX 9:OTCB  C:홍콩(CNY) A:상해A(CNY) B:심천B(HKD)  D:도쿄 E:하노이 F:호치민 |
| `DEBT_GB` | 담보유형코드 | string | Y | 2 | 10:현금 15:해외주식담보대출 |
| `DEBT_DATE` | 담보대출일자 | string | Y | 8 | 대출일(YYYYMMDD) |
| `START_TM` | 분할매수/매도 시작시간 | string | Y | 6 | HHMMSS |
| `END_TM` | 분할매수/매도 종료시간 | string | Y | 6 | HHMMSS |
| `TM_DIV_TP` | 시간분할타입유형 | string | Y | 2 | 00 시간직접설정, 02 : 정규장까지 |
| `CNTG_UNPR12` | 체결단가12 | string | Y | 12 |  |

**Request Example:**
```
{           "header":           {                    "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",                    "custtype":"P",                    "tr_type":"1",                    "content-type":"utf-8"           },           "body":           {                    "input":                    {                             "tr_id":"H0GSCNI0",                             "tr_key":"HTS ID"                    }           }  }
```

**Response Example:**
```
# output - 등록 성공 시  {      "header": {          "tr_id": "H0GSCNI0",           "tr_key": "HTS ID",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output (복호화 전)   1\|H0GSCNI0\|001\|vebQjGIHMgFhxfNfvebQjGIHMgFhxfNfvebQjGIHMgFhxfNfvebQj...hxfNf    # output (복호화 후)  #### 해외주식 주문·정정·취소·거부 접수 통보 ####  고객 ID  [abcd1234]  계좌번호  [12345678]  주문번호  [3567]  원주문번호  []  매도매수구분  [02]  정정구분  [0]  주문종류2  [1]  단축종목코드  [7203]  주문수량  [0000000100]  체결단가  [000032200]  체결시간  []  거부여부  [0]  체결여부  [1]  접수여부  [1]  지점번호  []  체결수량  []  계좌명  [******]  체결종목명  [도요타자동차]  해외종목구분  [D]  담보유형코드  [10]  담보대출일자  []  분할매수매도시작시간  []  분할매수매도종료시간  []  시간분할타입유형  []
```

---
