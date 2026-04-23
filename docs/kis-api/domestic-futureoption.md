# [국내선물옵션] API

한국투자증권 OpenAPI — `[국내선물옵션]` 카테고리 (44개).
원본 시트는 cp949 엑셀이며 본 파일은 LLM 친화 변환본. 검색은 `INDEX.md` 권장.

공통 OAuth 헤더(`authorization`, `appkey`, `appsecret`, `tr_id`, `custtype` 등)는 모든 API 동일하므로 본 문서에서 생략. `INDEX.md` 상단 참고.

---
### 1. (야간)선물옵션 증거금 상세

| Field | Value |
|---|---|
| Sheet | `(야간)선물옵션 증거금 상세` |
| Menu | [국내선물옵션] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-futureoption/v1/trading/ngt-margin-detail` |
| TR_ID (실전) | `(구) JTCE6003R (신) CTFN7107R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 |  |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 |  |
| `MGNA_DVSN_CD` | 증거금 구분코드 | string | Y | 2 | 위탁(01), 유지(02) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array  아래 18가지 항목이 순서대로 출력됨  (1) A. 신규증거금 - 선물 - 1.개별종목  (2) A. 신규증거금 - 선물 - 2.스프레드  (3) A. 신규증거금 - 3. ﻿﻿﻿옵션매수증거금  ﻿﻿(4) A. 신규증거금 - 4. 옵션매도증거금  ﻿﻿(5) A. 소계(1+2+3+4)  (6) B. 순위험증거금 - 1. ﻿﻿가격변동증거금  (7) B. 순위험증거금 - 2. ﻿﻿﻿선물스프레드증거금  ﻿﻿(8) B. 순위험증거금 - 3. 인수수도 증거금 등  (9) B. 순위험증거금 - 4. 최소증거금  (10) B. 순위험증거금 - 5. 옵션가격증거금  (11) B. 순위험증거금 - 6. 총위험증거금  (12) B. 소계SUM상품군별MAX[{MAX(1+2+3,4)+5},6]  (13) C. 결제예정금액 - 1. ﻿﻿﻿당일옵션매수금액  (14) ﻿﻿C. 결제예정금액 - 2. 당일옵션매도금액  (15) C. 결제예정금액 - 3. ﻿﻿당일선물손실  ﻿﻿﻿(16) C. 결제예정금액 - 4. 당일선물이익   (17) C.소계(1-2+3-4)  (18) (A)+B+(C) |
| `cash_amt` | 현금금액 | string | Y | 19 |  |
| `tot_amt` | 총금액 | string | Y | 19 |  |
| `output2` | 응답상세 | object array | Y |  | array  아래 5가지 항목이 순서대로 출력됨  (1) 예수금  (2) 인출가능금액  (3) 주문가능금액  ﻿﻿(4) 위탁증거금액  ﻿﻿(5) 추가증거금액    ※ 인출가능금액은 정산 후 인출가능 예정 금액입니다.  현재 시점 실제 인출 가능금액은 정규장, 야간시장 인출가능금액 중 적은 금액 기준입니다. |
| `cash_amt` | 현금금액 | string | Y | 19 |  |
| `sbst_amt` | 대용금액 | string | Y | 19 |  |
| `tot_amt` | 총금액 | string | Y | 19 |  |
| `output3` | 응답상세 | object | Y |  |  |
| `base_dpsa_gdat_grad_cd` | 기본예탁금차등등급코드 | string | Y | 2 |  |
| `bfdy_sbst_sll_ccld_amt` | 전일대용매도체결금액 | string | Y | 19 |  |
| `bfdy_sbst_sll_sbst_amt` | 전일대용매도대용금액 | string | Y | 19 |  |
| `excc_dfpa` | 정산차금 | string | Y | 19 |  |
| `fee_amt` | 수수료금액 | string | Y | 19 |  |
| `nxdy_dncl_amt` | 익일예수금액 | string | Y | 19 |  |
| `opt_base_dpsa_gdat_grad_cd` | 옵션기본예탁금차등등급코드 | string | Y | 2 |  |
| `opt_buy_exus_acnt_yn` | 옵션매수전용계좌여부 | string | Y | 1 |  |
| `opt_dfpa` | 옵션차금 | string | Y | 19 |  |
| `prsm_dpast_amt` | 추정예탁자산금액 | string | Y | 19 |  |
| `thdt_sbst_sll_ccld_amt` | 당일대용매도체결금액 | string | Y | 19 |  |
| `thdt_sbst_sll_sbst_amt` | 당일대용매도대용금액 | string | Y | 19 |  |
| `output1` | 응답상세 | object array | Y |  | Array 신 TR 사용 필드 |
| `futr_new_mgn_amt` | 선물신규증거금액 | string | Y | 19 | 신 TR 사용 필드 |
| `futr_sprd_ord_mgna` | 선물스프레드주문증거금 | string | Y | 19 | 신 TR 사용 필드 |
| `opt_sll_new_mgn_amt` | 옵션매도신규증거금액 | string | Y | 19 | 신 TR 사용 필드 |
| `opt_buy_new_mgn_amt` | 옵션매수신규증거금액 | string | Y | 19 | 신 TR 사용 필드 |
| `new_mgn_amt` | 신규증거금액 | string | Y | 19 | 신 TR 사용 필드 |
| `opt_pric_mgna` | 옵션가격증거금 | string | Y | 19 | 신 TR 사용 필드 |
| `fuop_pric_altr_mgna` | 선물옵션가격변동증거금 | string | Y | 19 | 신 TR 사용 필드 |
| `futr_sprd_mgna` | 선물스프레드증거금 | string | Y | 19 | 신 TR 사용 필드 |
| `uwdl_mgna` | 인수도증거금 | string | Y | 19 | 신 TR 사용 필드 |
| `ctrt_per_min_mgna` | 계약당최소증거금 | string | Y | 19 | 신 TR 사용 필드 |
| `tot_risk_mgna` | 총위험증거금 | string | Y | 19 | 신 TR 사용 필드 |
| `netrisk_brkg_mgna` | 순위험위탁증거금 | string | Y | 19 | 신 TR 사용 필드 |
| `opt_sll_chgs` | 옵션매도대금 | string | Y | 19 | 신 TR 사용 필드 |
| `opt_buy_chgs` | 옵션매수대금 | string | Y | 19 | 신 TR 사용 필드 |
| `futr_loss_amt` | 선물손실금액 | string | Y | 19 | 신 TR 사용 필드 |
| `futr_prft_amt` | 선물이익금액 | string | Y | 19 | 신 TR 사용 필드 |
| `thdt_ccld_net_loss_amt` | 당일체결순손실금액 | string | Y | 19 | 신 TR 사용 필드 |
| `brkg_mgna` | 위탁증거금 | string | Y | 19 | 신 TR 사용 필드 |
| `output2` | 응답상세 | object array | Y |  | Array 신 TR 사용 필드 |
| `futr_new_mgn_amt` | 선물신규증거금액 | string | Y | 19 | 신 TR 사용 필드 |
| `futr_sprd_ord_mgna` | 선물스프레드주문증거금 | string | Y | 19 | 신 TR 사용 필드 |
| `opt_sll_new_mgn_amt` | 옵션매도신규증거금액 | string | Y | 19 | 신 TR 사용 필드 |
| `opt_buy_new_mgn_amt` | 옵션매수신규증거금액 | string | Y | 19 | 신 TR 사용 필드 |
| `new_mgn_amt` | 신규증거금액 | string | Y | 19 | 신 TR 사용 필드 |
| `opt_pric_mgna` | 옵션가격증거금 | string | Y | 19 | 신 TR 사용 필드 |
| `fuop_pric_altr_mgna` | 선물옵션가격변동증거금 | string | Y | 19 | 신 TR 사용 필드 |
| `futr_sprd_mgna` | 선물스프레드증거금 | string | Y | 19 | 신 TR 사용 필드 |
| `uwdl_mgna` | 인수도증거금 | string | Y | 19 | 신 TR 사용 필드 |
| `ctrt_per_min_mgna` | 계약당최소증거금 | string | Y | 19 | 신 TR 사용 필드 |
| `tot_risk_mgna` | 총위험증거금 | string | Y | 19 | 신 TR 사용 필드 |
| `netrisk_brkg_mgna` | 순위험위탁증거금 | string | Y | 19 | 신 TR 사용 필드 |
| `opt_sll_chgs` | 옵션매도대금 | string | Y | 19 | 신 TR 사용 필드 |
| `opt_buy_chgs` | 옵션매수대금 | string | Y | 19 | 신 TR 사용 필드 |
| `futr_loss_amt` | 선물손실금액 | string | Y | 19 | 신 TR 사용 필드 |
| `futr_prft_amt` | 선물이익금액 | string | Y | 19 | 신 TR 사용 필드 |
| `thdt_ccld_net_loss_amt` | 당일체결순손실금액 | string | Y | 19 | 신 TR 사용 필드 |
| `brkg_mgna` | 위탁증거금 | string | Y | 19 | 신 TR 사용 필드 |
| `output3` | 응답상세 | object | Y |  | Single 신 TR 사용 필드 |
| `dnca_cash` | 예수금현금 | string | Y | 19 | 신 TR 사용 필드 |
| `dnca_sbst` | 예수금대용 | string | Y | 19 | 신 TR 사용 필드 |
| `dnca_tota` | 예수금총액 | string | Y | 19 | 신 TR 사용 필드 |
| `wdrw_psbl_cash_amt` | 인출가능현금금액 | string | Y | 19 | 신 TR 사용 필드 |
| `wdrw_psbl_sbsa` | 인출가능대용금액 | string | Y | 19 | 신 TR 사용 필드 |
| `wdrw_psbl_tot_amt` | 인출가능총금액 | string | Y | 19 | 신 TR 사용 필드 |
| `ord_psbl_cash_amt` | 주문가능현금금액 | string | Y | 19 | 신 TR 사용 필드 |
| `ord_psbl_sbsa` | 주문가능대용금액 | string | Y | 19 | 신 TR 사용 필드 |
| `ord_psbl_tot_amt` | 주문가능총금액 | string | Y | 19 | 신 TR 사용 필드 |
| `brkg_mgna_cash_amt` | 위탁증거금현금금액 | string | Y | 19 | 신 TR 사용 필드 |
| `brkg_mgna_sbst` | 위탁증거금대용 | string | Y | 19 | 신 TR 사용 필드 |
| `brkg_mgna_tot_amt` | 위탁증거금총금액 | string | Y | 19 | 신 TR 사용 필드 |
| `add_mgna_cash_amt` | 추가증거금현금금액 | string | Y | 19 | 신 TR 사용 필드 |
| `add_mgna_sbsa` | 추가증거금대용금액 | string | Y | 19 | 신 TR 사용 필드 |
| `add_mgna_tot_amt` | 추가증거금총금액 | string | Y | 19 | 신 TR 사용 필드 |
| `bfdy_sbst_sll_sbst_amt` | 전일대용매도대용금액 | string | Y | 19 | 신 TR 사용 필드 |
| `thdt_sbst_sll_sbst_amt` | 당일대용매도대용금액 | string | Y | 19 | 신 TR 사용 필드 |
| `bfdy_sbst_sll_ccld_amt` | 전일대용매도체결금액 | string | Y | 19 | 신 TR 사용 필드 |
| `thdt_sbst_sll_ccld_amt` | 당일대용매도체결금액 | string | Y | 19 | 신 TR 사용 필드 |
| `opt_dfpa` | 옵션차금 | string | Y | 19 | 신 TR 사용 필드 |
| `excc_dfpa` | 정산차금 | string | Y | 19 | 신 TR 사용 필드 |
| `fee_amt` | 수수료금액 | string | Y | 19 | 신 TR 사용 필드 |
| `nxdy_dncl_amt` | 익일예수금액 | string | Y | 19 | 신 TR 사용 필드 |
| `prsm_dpast_amt` | 추정예탁자산금액 | string | Y | 19 | 신 TR 사용 필드 |
| `opt_buy_exus_acnt_yn` | 옵션매수전용계좌여부 | string | Y | 19 | 신 TR 사용 필드 |
| `base_dpsa_gdat_grad_cd` | 기본예탁금차등등급코드 | string | Y | 19 | 신 TR 사용 필드 |
| `opt_base_dpsa_gdat_grad_cd` | 옵션기본예탁금차등등급코드 | string | Y | 19 | 신 TR 사용 필드 |

**Request Example:**
```
CANO:12345678  ACNT_PRDT_CD:03  MGNA_DVSN_CD:01
```

**Response Example:**
```
{      "output1": [          {              "cash_amt": "0",              "tot_amt": "0"          },          {              "cash_amt": "0",              "tot_amt": "0"          },          {              "cash_amt": "0",              "tot_amt": "0"          },          {              "cash_amt": "0",              "tot_amt": "0"          },          {              "cash_amt": "0",              "tot_amt": "0"          },          {              "cash_amt": "0",              "tot_amt": "0"          },          {              "cash_amt": "0",              "tot_amt": "0"          },          {              "cash_amt": "0",              "tot_amt": "0"          },          {              "cash_amt": "0",              "tot_amt": "0"          },          {              "cash_amt": "0",              "tot_amt": "0"          },          {              "cash_amt": "0",              "tot_amt": "0"          },          {              "cash_amt": "0",              "tot_amt": "0"          },          {              "cash_amt": "0",              "tot_amt": "0"          },          {              "cash_amt": "0",              "tot_amt": "0"          },          {              "cash_amt": "0",              "tot_amt": "0"          },          {              "cash_amt": "0",              "tot_amt": "0"          },          {              "cash_amt": "0",              "tot_amt": "0"          },          {              "cash_amt": "0",              "tot_amt": "0"          }      ],      "output2": [          {              "cash_amt": "100000000",              "sbst_amt": "0",              "tot_amt": "100000000"          },          {              "cash_amt": "100000000",              "sbst_amt": "0",              "tot_amt": "100000000"          },          {              "cash_amt": "100000000",              "sbst_amt": "0",              "tot_amt": "100000000"          },          {              "cash_amt": "0",              "sbst_amt": "0",              "tot_amt": "0"          },          {              "cash_amt": "0",              "sbst_amt": "0",              "tot_amt": "0"          }      ],      "output3": {          "bfdy_sbst_sll_sbst_amt": "0",          "thdt_sbst_sll_sbst_amt": "0",          "bfdy_sbst_sll_ccld_amt": "0",          "thdt_sbst_sll_ccld_amt": "0",          "opt_buy_exus_acnt_yn": "N",          "base_dpsa_gdat_grad_cd": "03",          "opt_dfpa": "0",          "excc_dfpa": "0",          "fee_amt": "0",          "nxdy_dncl_amt": "100000000",          "prsm_dpast_amt": "100000000",          "opt_base_dpsa_gdat_grad_cd": "01"      },      "rt_cd": "0",      "msg_cd": "KIOK0510",      "msg1": "조회가 완료되었습니다                                                           "  }
```

---
### 2. 선물옵션 총자산현황

| Field | Value |
|---|---|
| Sheet | `선물옵션 총자산현황` |
| Menu | [국내선물옵션] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-futureoption/v1/trading/inquire-deposit` |
| TR_ID (실전) | `CTRP6550R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object | Y |  |  |
| `dnca_tota` | 예수금총액 | string | Y | 19 |  |
| `bfdy_chck_amt` | 전일수표금액 | string | Y | 19 |  |
| `thdt_chck_amt` | 당일수표금액 | string | Y | 19 |  |
| `rlth_uwdl_dpos_amt` | 실물인수도예치금액 | string | Y | 19 |  |
| `brkg_mgna_cash` | 위탁증거금현금 | string | Y | 19 |  |
| `wdrw_psbl_tot_amt` | 인출가능총금액 | string | Y | 19 |  |
| `ord_psbl_cash` | 주문가능현금 | string | Y | 19 |  |
| `ord_psbl_tota` | 주문가능총액 | string | Y | 19 |  |
| `dnca_sbst` | 예수금대용 | string | Y | 19 |  |
| `scts_sbst_amt` | 유가증권대용금액 | string | Y | 19 |  |
| `frcr_evlu_amt` | 외화평가금액 | string | Y | 19 |  |
| `brkg_mgna_sbst` | 위탁증거금대용 | string | Y | 19 |  |
| `sbst_rlse_psbl_amt` | 대용해제가능금액 | string | Y | 19 |  |
| `mtnc_rt` | 유지비율 | string | Y | 238 |  |
| `add_mgna_tota` | 추가증거금총액 | string | Y | 19 |  |
| `add_mgna_cash` | 추가증거금현금 | string | Y | 19 |  |
| `rcva` | 미수금 | string | Y | 19 |  |
| `futr_trad_pfls` | 선물매매손익 | string | Y | 19 |  |
| `opt_trad_pfls_amt` | 옵션매매손익금액 | string | Y | 19 |  |
| `trad_pfls_smtl` | 매매손익합계 | string | Y | 19 |  |
| `futr_evlu_pfls_amt` | 선물평가손익금액 | string | Y | 19 |  |
| `opt_evlu_pfls_amt` | 옵션평가손익금액 | string | Y | 19 |  |
| `evlu_pfls_smtl` | 평가손익합계 | string | Y | 19 |  |
| `excc_dfpa` | 정산차금 | string | Y | 19 |  |
| `opt_dfpa` | 옵션차금 | string | Y | 19 |  |
| `brkg_fee` | 위탁수수료 | string | Y | 19 |  |
| `nxdy_dnca` | 익일예수금 | string | Y | 19 |  |
| `prsm_dpast_amt` | 추정예탁자산금액 | string | Y | 19 |  |
| `cash_mntn_amt` | 현금유지금액 | string | Y | 19 |  |
| `hack_acdt_acnt_move_amt` | 해킹사고계좌이전금액 | string | Y | 19 |  |

**Request Example:**
```
{  	"CANO":"12345678",  	"ACNT_PRDT_CD":"03",  }
```

**Response Example:**
```
{      "output": {          "dnca_tota": "100000000",          "bfdy_chck_amt": "0",          "thdt_chck_amt": "0",          "rlth_uwdl_dpos_amt": "0",          "brkg_mgna_cash": "17907612",          "wdrw_psbl_tot_amt": "34046775",          "ord_psbl_cash": "64184775",          "ord_psbl_tota": "64184775",          "dnca_sbst": "0",          "scts_sbst_amt": "0",          "frcr_evlu_amt": "0",          "brkg_mgna_sbst": "17907613",          "sbst_rlse_psbl_amt": "0",          "mtnc_rt": "418.23000000",          "add_mgna_tota": "0",          "add_mgna_cash": "0",          "rcva": "0",          "futr_trad_pfls": "0",          "opt_trad_pfls_amt": "0",          "trad_pfls_smtl": "0",          "futr_evlu_pfls_amt": "4187500",          "opt_evlu_pfls_amt": "-697500",          "evlu_pfls_smtl": "3490000",          "excc_dfpa": "-30138000",          "opt_dfpa": "0",          "brkg_fee": "0",          "nxdy_dnca": "69862000",          "prsm_dpast_amt": "69864500",          "cash_mntn_amt": "0",          "hack_acdt_acnt_move_amt": "0"      },      "rt_cd": "0",      "msg_cd": "APRP0126",      "msg1": "조회이(가) 완료되었습니다.                                                      "  }
```

---
### 3. 선물옵션기간약정수수료일별

| Field | Value |
|---|---|
| Sheet | `선물옵션기간약정수수료일별` |
| Menu | [국내선물옵션] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-futureoption/v1/trading/inquire-daily-amount-fee` |
| TR_ID (실전) | `CTFO6119R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `INQR_STRT_DAY` | 조회시작일 | string | Y | 8 | 조회시작일(YYYYMMDD) |
| `INQR_END_DAY` | 조회종료일 | string | Y | 8 | 조회종료일(YYYYMMDD) |
| `CTX_AREA_FK200` | 연속조회검색조건200 | string | Y | 200 | 연속조회검색조건200 |
| `CTX_AREA_NK200` | 연속조회키200 | string | Y | 200 | 연속조회키200 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | array | Y |  | array |
| `ord_dt` | 주문일자 | string | Y | 8 |  |
| `pdno` | 상품번호 | string | Y | 12 |  |
| `item_name` | 종목명 | string | Y | 60 |  |
| `sll_agrm_amt` | 매도약정금액 | string | Y | 19 |  |
| `sll_fee` | 매도수수료 | string | Y | 19 |  |
| `buy_agrm_amt` | 매수약정금액 | string | Y | 19 |  |
| `buy_fee` | 매수수수료 | string | Y | 19 |  |
| `tot_fee_smtl` | 총수수료합계 | string | Y | 19 |  |
| `trad_pfls` | 매매손익 | string | Y | 19 |  |
| `output2` | 응답상세2 | object | Y |  |  |
| `futr_agrm` | 선물약정 | string | Y | 19 |  |
| `futr_agrm_amt` | 선물약정금액 | string | Y | 19 |  |
| `futr_agrm_amt_smtl` | 선물약정금액합계 | string | Y | 19 |  |
| `futr_sll_fee_smtl` | 선물매도수수료합계 | string | Y | 19 |  |
| `futr_buy_fee_smtl` | 선물매수수수료합계 | string | Y | 19 |  |
| `futr_fee_smtl` | 선물수수료합계 | string | Y | 19 |  |
| `opt_agrm` | 옵션약정 | string | Y | 19 |  |
| `opt_agrm_amt` | 옵션약정금액 | string | Y | 19 |  |
| `opt_agrm_amt_smtl` | 옵션약정금액합계 | string | Y | 19 |  |
| `opt_sll_fee_smtl` | 옵션매도수수료합계 | string | Y | 19 |  |
| `opt_buy_fee_smtl` | 옵션매수수수료합계 | string | Y | 19 |  |
| `opt_fee_smtl` | 옵션수수료합계 | string | Y | 19 |  |
| `prdt_futr_agrm` | 상품선물약정 | string | Y | 19 |  |
| `prdt_fuop` | 상품선물옵션 | string | Y | 19 |  |
| `prdt_futr_evlu_amt` | 상품선물평가금액 | string | Y | 8 |  |
| `futr_fee` | 선물수수료 | string | Y | 19 |  |
| `opt_fee` | 옵션수수료 | string | Y | 19 |  |
| `fee` | 수수료 | string | Y | 19 |  |
| `sll_agrm_amt` | 매도약정금액 | string | Y | 19 |  |
| `buy_agrm_amt` | 매수약정금액 | string | Y | 19 |  |
| `agrm_amt_smtl` | 약정금액합계 | string | Y | 19 |  |
| `sll_fee` | 매도수수료 | string | Y | 19 |  |
| `buy_fee` | 매수수수료 | string | Y | 19 |  |
| `fee_smtl` | 수수료합계 | string | Y | 19 |  |
| `trad_pfls_smtl` | 매매손익합계 | string | Y | 19 |  |

**Request Example:**
```
{  	"CANO":"12345678",  	"ACNT_PRDT_CD":"03",  	"INQR_STRT_DAY":"20230901",  	"INQR_END_DAY":"20230920",  	"CTX_AREA_FK200":"",  	"CTX_AREA_NK200":""  }
```

**Response Example:**
```
{      "ctx_area_fk200": "12345678!^03!^20230901!^20230920                                                                                                                                                                        ",      "ctx_area_nk200": " !^                                                                                                                                                                                                     ",      "output1": [          {              "ord_dt": "20230901",              "pdno": "KR4101T90003",              "item_name": "F 202309",              "sll_agrm_amt": "0",              "sll_fee": "0",              "buy_agrm_amt": "0",              "buy_fee": "0",              "tot_fee_smtl": "0",              "trad_pfls": "0"          },          {              "ord_dt": "20230904",              "pdno": "KR4101T90003",              "item_name": "F 202309",              "sll_agrm_amt": "0",              "sll_fee": "0",              "buy_agrm_amt": "0",              "buy_fee": "0",              "tot_fee_smtl": "0",              "trad_pfls": "0"          },          {              "ord_dt": "20230905",              "pdno": "KR4101T90003",              "item_name": "F 202309",              "sll_agrm_amt": "0",              "sll_fee": "0",              "buy_agrm_amt": "0",              "buy_fee": "0",              "tot_fee_smtl": "0",              "trad_pfls": "0"          },          {              "ord_dt": "20230906",              "pdno": "KR4101T90003",              "item_name": "F 202309",              "sll_agrm_amt": "0",              "sll_fee": "0",              "buy_agrm_amt": "0",              "buy_fee": "0",              "tot_fee_smtl": "0",              "trad_pfls": "0"          },          {              "ord_dt": "20230907",              "pdno": "KR4101T90003",              "item_name": "F 202309",              "sll_agrm_amt": "0",              "sll_fee": "0",              "buy_agrm_amt": "0",              "buy_fee": "0",              "tot_fee_smtl": "0",              "trad_pfls": "0"          },          {              "ord_dt": "20230908",              "pdno": "KR4101T90003",              "item_name": "F 202309",              "sll_agrm_amt": "0",              "sll_fee": "0",              "buy_agrm_amt": "0",              "buy_fee": "0",              "tot_fee_smtl": "0",              "trad_pfls": "0"          },          {              "ord_dt": "20230911",              "pdno": "KR4101T90003",              "item_name": "F 202309",              "sll_agrm_amt": "0",              "sll_fee": "0",              "buy_agrm_amt": "0",              "buy_fee": "0",              "tot_fee_smtl": "0",              "trad_pfls": "0"          },          {              "ord_dt": "20230914",              "pdno": "KR4101T90003",              "item_name": "F 202309",              "sll_agrm_amt": "0",              "sll_fee": "0",              "buy_agrm_amt": "0",              "buy_fee": "0",              "tot_
```

---
### 4. (야간)선물옵션 잔고현황

| Field | Value |
|---|---|
| Sheet | `(야간)선물옵션 잔고현황` |
| Menu | [국내선물옵션] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-futureoption/v1/trading/inquire-ngt-balance` |
| TR_ID (실전) | `(구) JTCE6001R (신) CTFN6118R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `ACNT_PWD` | 계좌비밀번호 | string | Y | 84 | 공란("")으로 조회 |
| `MGNA_DVSN` | 증거금구분 | string | Y | 2 | 01 : 개시,  02 : 유지 |
| `EXCC_STAT_CD` | 정산상태코드 | string | Y | 1 | 1 : 정산 (정산가격으로 잔고 조회)  2 : 본정산 (매입가격으로 잔고 조회) |
| `CTX_AREA_FK200` | 연속조회검색조건200 | string | Y | 200 | 공란 : 최초 조회시  이전 조회 Output CTX_AREA_FK200값 : 다음페이지 조회시(2번째부터) |
| `CTX_AREA_NK200` | 연속조회키200 | string | Y | 200 | 공란 : 최초 조회시  이전 조회 Output CTX_AREA_NK200값 : 다음페이지 조회시(2번째부터) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output2` | 응답상세2 | object | Y |  |  |
| `dnca_cash` | 예수금현금 | string | Y | 19 | 총주문수량 |
| `frcr_dncl_amt` | 외화예수금액 | string | Y | 19 | 주문채번지점번호 |
| `dnca_sbst` | 예수금대용 | string | Y | 19 |  |
| `tot_dncl_amt` | 총예수금액 | string | Y | 19 |  |
| `cash_mgna` | 현금증거금 | string | Y | 19 |  |
| `sbst_mgna` | 대용증거금 | string | Y | 19 |  |
| `mgna_tota` | 증거금총액 | string | Y | 19 |  |
| `opt_dfpa` | 옵션차금 | string | Y | 19 |  |
| `thdt_dfpa` | 당일차금 | string | Y | 19 |  |
| `rnwl_dfpa` | 갱신차금 | string | Y | 19 |  |
| `fee` | 수수료 | string | Y | 19 |  |
| `nxdy_dnca` | 익일예수금 | string | Y | 19 |  |
| `nxdy_dncl_amt` | 익일예수금액 | string | Y | 19 |  |
| `prsm_dpast` | 추정예탁자산 | string | Y | 19 | 종합계좌번호 |
| `pprt_ord_psbl_cash` | 적정주문가능현금 | string | Y | 19 | 총체결수량 |
| `add_mgna_cash` | 추가증거금현금 | string | Y | 19 | 총체결금액 |
| `add_mgna_tota` | 추가증거금총액 | string | Y | 19 | 종합계좌명 |
| `futr_trad_pfls_amt` | 선물매매손익금액 | string | Y | 19 | 수수료 |
| `opt_trad_pfls_amt` | 옵션매매손익금액 | string | Y | 19 | 계좌상품코드 |
| `futr_evlu_pfls_amt` | 선물평가손익금액 | string | Y | 19 | 주문일자 |
| `opt_evlu_pfls_amt` | 옵션평가손익금액 | string | Y | 19 | 주문번호 |
| `trad_pfls_amt_smtl` | 매매손익금액합계 | string | Y | 19 |  |
| `evlu_pfls_amt_smtl` | 평가손익금액합계 | string | Y | 19 |  |
| `wdrw_psbl_tot_amt` | 인출가능총금액 | string | Y | 19 |  |
| `ord_psbl_cash` | 주문가능현금 | string | Y | 19 |  |
| `ord_psbl_sbst` | 주문가능대용 | string | Y | 19 |  |
| `ord_psbl_tota` | 주문가능총액 | string | Y | 19 |  |
| `mmga_tot_amt` | 유지증거금총금액 | string | Y | 19 | 신규 TR 미사용 필드 |
| `mmga_cash_amt` | 유지증거금현금금액 | string | Y | 19 | 신규 TR 미사용 필드 |
| `mtnc_rt` | 유지비율 | string | Y | 32238 | 신규 TR 미사용 필드 |
| `isfc_amt` | 부족금액 | string | Y | 19 | 신규 TR 미사용 필드 |
| `pchs_amt_smtl` | 매입금액합계 | string | Y | 19 |  |
| `evlu_amt_smtl` | 평가금액합계 | string | Y | 19 |  |
| `output1` | 응답상세2 | object array | Y |  | 시간별체결 정보 |
| `cano` | 종합계좌번호 | string | Y | 8 |  |
| `acnt_prdt_cd` | 계좌상품코드 | string | Y | 2 |  |
| `pdno` | 상품번호 | string | Y | 12 |  |
| `prdt_type_cd` | 상품유형코드 | string | Y | 3 |  |
| `shtn_pdno` | 단축상품번호 | string | Y | 12 |  |
| `prdt_name` | 상품명 | string | Y | 60 |  |
| `sll_buy_dvsn_name` | 매도매수구분명 | string | Y | 4 | 신규 TR 사용 필드 |
| `sll_buy_dvsn_cd` | 매도매수구분코드 | string | Y | 2 |  |
| `trad_dvsn_name` | 매매구분명 | string | Y | 60 |  |
| `cblc_qty` | 잔고수량 | string | Y | 19 |  |
| `excc_unpr` | 정산단가 | string | Y | 32238 |  |
| `ccld_avg_unpr1` | 체결평균단가1 | string | Y | 32238 |  |
| `idx_clpr` | 지수종가 | string | Y | 32238 |  |
| `pchs_amt` | 매입금액 | string | Y | 19 |  |
| `evlu_amt` | 평가금액 | string | Y | 19 |  |
| `evlu_pfls_amt` | 평가손익금액 | string | Y | 19 |  |
| `trad_pfls_amt` | 매매손익금액 | string | Y | 19 |  |
| `lqd_psbl_qty` | 청산가능수량 | string | Y | 19 |  |

**Request Example:**
```
{  	"CANO":"80012345",  	"ACNT_PRDT_CD":"03",  	"ACNT_PWD":"",  	"MGNA_DVSN":"01",  	"EXCC_STAT_CD":"1",  	"CTX_AREA_FK200":"",  	"CTX_AREA_NK200":""  }
```

**Response Example:**
```
{      "ctx_area_fk200": "80012345^03^01^1^                                                                                                                                                                                       ",      "ctx_area_nk200": "                                                                                                                                                                                                        ",      "output1": [          {              "cano": "80012345",              "acnt_prdt_cd": "03",              "pdno": "KR4101SC0009",              "prdt_type_cd": "301",              "shtn_pdno": "101S12",              "prdt_name": "F 202212",              "sll_buy_dvsn_cd": "02",              "trad_dvsn_name": "매수",              "cblc_qty": "3",              "excc_unpr": "309.10000000",              "ccld_avg_unpr1": "320.50000000",              "idx_clpr": "307.45000000",              "pchs_amt": "231825000",              "evlu_amt": "230587500",              "evlu_pfls_amt": "-1237500",              "trad_pfls_amt": "0",              "lqd_psbl_qty": "3"          }      ],      "output2": {          "dnca_cash": "10101527360",          "frcr_dncl_amt": "0",          "dnca_sbst": "0",          "tot_dncl_amt": "10101527360",          "cash_mgna": "108922232",          "sbst_mgna": "133854708",          "mgna_tota": "242776940",          "opt_dfpa": "0",          "thdt_dfpa": "0",          "rnwl_dfpa": "-16200000",          "fee": "0",          "nxdy_dnca": "10085327360",          "prsm_dpast": "10085327360",          "pprt_ord_psbl_cash": "9858750420",          "add_mgna_cash": "0",          "add_mgna_tota": "0",          "futr_trad_pfls_amt": "0",          "opt_trad_pfls_amt": "0",          "futr_evlu_pfls_amt": "-1237500",          "opt_evlu_pfls_amt": "0",          "trad_pfls_amt_smtl": "0",          "evlu_pfls_amt_smtl": "-1237500",          "wdrw_psbl_tot_amt": "9858750420",          "ord_psbl_cash": "9858750420",          "ord_psbl_sbst": "0",          "ord_psbl_tota": "9858750420",          "mmga_tot_amt": "0",          "mmga_cash_amt": "0",          "mtnc_rt": "0.00000000",          "isfc_amt": "0",          "pchs_amt_smtl": "231825000",          "evlu_amt_smtl": "230587500"      },      "rt_cd": "0",      "msg_cd": "KIOK0510",      "msg1": "조회가 완료되었습니다                                                           "  }
```

---
### 5. 선물옵션 잔고현황

| Field | Value |
|---|---|
| Sheet | `선물옵션 잔고현황` |
| Menu | [국내선물옵션] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-futureoption/v1/trading/inquire-balance` |
| TR_ID (실전) | `CTFO6118R` |
| TR_ID (모의) | `VTFO6118R` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `MGNA_DVSN` | 증거금 구분 | string | Y | 2 | 01 : 개시  02 : 유지 |
| `EXCC_STAT_CD` | 정산상태코드 | string | Y | 1 | 1 : 정산 (정산가격으로 잔고 조회)  2 : 본정산 (매입가격으로 잔고 조회) |
| `CTX_AREA_FK200` | 연속조회검색조건200 | string | Y | 200 | 공란 : 최초 조회시  이전 조회 Output CTX_AREA_FK200값 : 다음페이지 조회시(2번째부터) |
| `CTX_AREA_NK200` | 연속조회키200 | string | Y | 200 | 공란 : 최초 조회시  이전 조회 Output CTX_AREA_NK200값 : 다음페이지 조회시(2번째부터) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 | 0 : 성공  0 이외의 값 : 실패 |
| `msg_cd` | 응답코드 | string | Y | 8 | 응답코드 |
| `msg1` | 응답메세지 | string | Y | 80 | 응답메세지 |
| `ctx_area_fk200` | 연속조회검색조건200 | string | Y | 200 |  |
| `ctx_area_nk200` | 연속조회키200 | string | Y | 200 |  |
| `output1` | 응답상세1 | array | Y |  |  |
| `cano` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `acnt_prdt_cd` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `pdno` | 상품번호 | string | Y | 12 | 선물옵션종목코드 |
| `prdt_type_cd` | 상품유형코드 | string | Y | 3 |  |
| `shtn_pdno` | 단축상품번호 | string | Y | 12 | 단축상품번호 (예: 101P09) |
| `prdt_name` | 상품명 | string | Y | 60 |  |
| `sll_buy_dvsn_name` | 매도매수구분명 | string | Y | 4 | 매도/매수 구분의 명칭    - 매수잔고를 가진 경우, "매수" 혹은 "BUY"로 출력  - 매도잔고를 가진 경우, "매도" 혹은 "SLL"로 출력  - 당일 잔고를 청산하여 잔고를 가지고 있지 않은 경우 빈칸으로 출력 |
| `cblc_qty` | 잔고수량 | string | Y | 10 | 보유한 종목의 수량 |
| `excc_unpr` | 정산단가 | string | Y | 32 | 당일 종가로 정산한 가격 |
| `ccld_avg_unpr1` | 체결평균단가1 | string | Y | 32 | 보유한 종목의 평균 체결 가격 |
| `idx_clpr` | 지수종가 | string | Y | 32 |  |
| `pchs_amt` | 매입금액 | string | Y | 19 | 보유 종목을 매수한 금액 |
| `evlu_amt` | 평가금액 | string | Y | 19 | 보유 종목을 현재가로 평가하여 산출한 금액 |
| `evlu_pfls_amt` | 평가손익금액 | string | Y | 19 | 매입금액과 평가금액을 비교한 손익 |
| `trad_pfls_amt` | 매매손익금액 | string | Y | 19 | 매수와 매도가 완료된 수량에 대한 실현 손익 |
| `lqd_psbl_qty` | 청산가능수량 | string | Y | 19 | 청산 가능한 수량 |
| `output2` | 응답상세2 | object | Y |  |  |
| `dnca_cash` | 예수금현금 | string | Y | 19 | 원화로 보유한 현금 (현금미수금액, 수수료미수금액 차감) |
| `frcr_dncl_amt` | 외화예수금액 | string | Y | 19 | 외화로 보유한 현금 |
| `dnca_sbst` | 예수금대용 | string | Y | 19 | 주식대용금액+채권대용금액+전일대용매도대용금액+당일대용매도대용금액 |
| `tot_dncl_amt` | 총예수금액 | string | Y | 19 | 상기 3개 예수금 항목의 합계 금액 |
| `tot_ccld_amt` | 총체결금액 | string | Y | 19 | 체결된 주문의 합계금액 |
| `cash_mgna` | 현금증거금 | string | Y | 19 | 원화 현금 중 주문증거금으로 사용된 금액 |
| `sbst_mgna` | 대용증거금 | string | Y | 19 | 대용 예수금 중 주문증거금으로 사용된 금액 |
| `mgna_tota` | 증거금총액 | string | Y | 19 | 증거금으로 사용된 항목의 합계 금액 |
| `opt_dfpa` | 옵션차금 | string | Y | 19 | 당일옵션매도금에서 당일옵션매수금을 차감한 금액 |
| `thdt_dfpa` | 당일차금 | string | Y | 19 | 당일의 각 매수거래에 대하여 1에 의하여 산출한 금액의 합계액과 당일의 각 매도거래에 대하여 2에 의하여 산출한 금액의 합계액을 합산한 금액  1. 매수거래수량*(당일의 정산가격-체결가격)*최소가격변동금액*환산승수  2. 매도거래수량*(체결가격-당일의 정산가격)*최소가격변동금액*환산승수 |
| `rnwl_dfpa` | 갱신차금 | string | Y | 19 | 직전 거래일의 매수미결제약정에 대하여 1에 의하여 산출한 금액과 직전거래일의 매도미결제약정에 대하여 2에 의하여 산출한 금액을 합산한 금액  1. 매수미결제약정*(당일의 정산가격-직전거래일의 정산가격)*최소가격변동 금액*환산승수  2. 매도미결제약정*(직전거래일의 정산가격-당일의 정산가격)*최소가격변동 금액*환산승수 |
| `fee` | 수수료 | string | Y | 19 | 체결된 주문에 의한 매매수수료 |
| `nxdy_dnca` | 익일예수금 | string | Y | 19 | 당일 매매내역을 근거로 익일(결제일) 고객님 계좌에 있는 현금 |
| `nxdy_dncl_amt` | 익일예수금액 | string | Y | 19 |  |
| `prsm_dpast` | 추정예탁자산 | string | Y | 19 | 보유한 잔고를 정산 기준으로 평가한 금액과 예수금을 합한 금액 |
| `prsm_dpast_amt` | 추정예탁자산금액 | string | Y | 19 |  |
| `pprt_ord_psbl_cash` | 적정주문가능현금 | string | Y | 19 | 미수없는 주문가능금액 |
| `add_mgna_cash` | 추가증거금현금 | string | Y | 19 | 장 종료 후 예탁평가액이 유지증거금을 하회할 경우 또는 예탁현금이 결제금액 보다 적은 경우 고객이 추가적으로 납부해야  하는 증거금 |
| `add_mgna_tota` | 추가증거금총액 | string | Y | 19 |  |
| `futr_trad_pfls_amt` | 선물매매손익금액 | string | Y | 19 | 선물 매수와 매도가 완료된 수량에 대한 실현 손익 |
| `opt_trad_pfls_amt` | 옵션매매손익금액 | string | Y | 19 | 옵션 매수와 매도가 완료된 수량에 대한 실현 손익 |
| `futr_evlu_pfls_amt` | 선물평가손익금액 | string | Y | 19 | 선물 잔고의 매입가격 또는 정산가격과 평가금액을 비교한 손익 |
| `opt_evlu_pfls_amt` | 옵션평가손익금액 | string | Y | 19 | 옵션 잔고의 매입가격 또는 정산가격과 평가금액을 비교한 손익 |
| `trad_pfls_amt_smtl` | 매매손익금액합계 | string | Y | 19 | 선물매매손익금액과 옵션매매손익금액을 합한 금액 |
| `evlu_pfls_amt_smtl` | 평가손익금액합계 | string | Y | 19 | 선물평가손익금액과 옵션평가손익금액을 합한 금액 |
| `wdrw_psbl_tot_amt` | 인출가능총금액 | string | Y | 19 | 출금 가능한 현금(예탁현금+예탁대용-예탁증거금총액) |
| `ord_psbl_cash` | 주문가능현금 | string | Y | 19 | 예수금현금에서 현금증거금을 차감한 금액 |
| `ord_psbl_sbst` | 주문가능대용 | string | Y | 19 | 예수금대용에서 대용증거금을 차감한 금액 |
| `ord_psbl_tota` | 주문가능총액 | string | Y | 19 | 주문가능현금과 주문가능대용을 합한 금액 |
| `pchs_amt_smtl` | 매입금액합계 | string | Y | 19 | 종목별 매입금액의 합계 금액 |
| `evlu_amt_smtl` | 평가금액합계 | string | Y | 19 | 종목별 평가금액의 합계 금액 |

**Request Example:**
```
{      	"CANO": "810XXXXX",  	"ACNT_PRDT_CD":"3",  	"MGNA_DVSN": "01",  	"EXCC_STAT_CD": "1",  	"CTX_AREA_FK200": "",  	"CTX_AREA_NK200": ""  }
```

**Response Example:**
```
{    "ctx_area_fk200": "연속조회검색조건200을 입력하세요.",    "output1": {      "lqd_psbl_qty": [        "6",        "133",        "110",        "1000",        "1000",        "1000",        "1000",        "1",        "25"      ],      "pdno": [        "KR4101RC0000",        "KR4101S30001",        "KR4111RA0000",        "KR41ACRC0005",        "KR41ACS60004",        "KR41ADRC0004",        "KR41ADS30005",        "KR41AES90007",        "KR41DRRA0007"      ],      "prdt_type_cd": [        "301",        "301",        "301",        "301",        "301",        "301",        "301",        "301",        "301"      ],      "pchs_amt": [        "586950000",        "12937575000",        "78980000",        "3003000000",        "3012000000",        "5686000000",        "5672000000",        "2610000",        "21350000"      ],      "sll_buy_dvsn_name": [        "SLL",        "BUY",        "BUY",        "BUY",        "SLL",        "BUY",        "SLL",        "SLL",        "BUY"      ],      "trad_pfls_amt": [        "0",        "0",        "0",        "0",        "0",        "0",        "0",        "0",        "0"      ],      "shtn_pdno": [        "101R12",        "101S03",        "111R10",        "1ACR12",        "1ACS06",        "1ADR12",        "1ADS03",        "1AES09",        "1DRR10"      ],      "acnt_prdt_cd": [        "",        "",        "",        "",        "",        "",        "",        "",        ""      ],      "cblc_qty": [        "6",        "133",        "110",        "1000",        "1000",        "1000",        "1000",        "1",        "25"      ],      "excc_unpr": [        "391.30000000",        "389.10000000",        "71800.00000000",        "3003.00000000",        "3012.00000000",        "5686.00000000",        "5672.00000000",        "2610.00000000",        "85400.00000000"      ],      "cano": [        "",        "",        "",        "",        "",        "",        "",        "",        ""      ],      "idx_clpr": [        "380.55000000",        "389.10000000",        "71800.00000000",        "3003.00000000",        "3012.00000000",        "5686.00000000",        "5672.00000000",        "2610.00000000",        "85400.00000000"      ],      "ccld_avg_unpr1": [        "402.28975400",        "406.38538995",        "71618.18181818",        "4626.00000000",        "4766.50000000",        "6992.50000000",        "5695.50000000",        "3430.50000000",        "87700.00000000"      ],      "evlu_pfls_amt": [        "16125000",        "0",        "0",        "0",        "0",        "0",        "0",        "0",        "0"      ],      "evlu_amt": [        "570825000",        "12937575000",        "78980000",        "3003000000",        "3012000000",        "5686000000",        "5672000000",        "2610000",        "21350000"      ],      "prdt_name": [        "F 202112",        "F 202203",        "SamsungEle F 202110 (  10)",        "BBIG K-NewDeal     F 202112",        "BBIG K-NewDeal     F 202206",        "Battery K-NewDeal  F 202112",        "Batte
```

---
### 6. 선물옵션 주문

| Field | Value |
|---|---|
| Sheet | `선물옵션 주문` |
| Menu | [국내선물옵션] 주문/계좌 |
| Method | `POST` |
| URL | `/uapi/domestic-futureoption/v1/trading/order` |
| TR_ID (실전) | `(주간 매수/매도) TTTO1101U (야간 매수/매도) (구) JTCE1001U (신) STTN1101U` |
| TR_ID (모의) | `(주간 매수/매도) VTTO1101U (야간은 모의투자 미제공)` |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `ORD_PRCS_DVSN_CD` | 주문처리구분코드 | string | Y | 2 | 02 : 주문전송 |
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `SLL_BUY_DVSN_CD` | 매도매수구분코드 | string | Y | 2 | 01 : 매도  02 : 매수 |
| `SHTN_PDNO` | 단축상품번호 | string | Y | 12 | 종목번호  선물 6자리 (예: A01603)  옵션 9자리 (예: B01603955) |
| `ORD_QTY` | 주문수량 | string | Y | 10 |  |
| `UNIT_PRICE` | 주문가격1 | string | Y | 23 | 시장가나 최유리 지정가인 경우 0으로 입력 |
| `NMPR_TYPE_CD` | 호가유형코드 | string | N | 2 | ※ ORD_DVSN_CD(주문구분코드)를 입력한 경우 ""(공란)으로 입력해도 됨  01 : 지정가  02 : 시장가   03 : 조건부  04 : 최유리 |
| `KRX_NMPR_CNDT_CD` | 한국거래소호가조건코드 | string | N | 1 | ※ ORD_DVSN_CD(주문구분코드)를 입력한 경우 ""(공란)으로 입력해도 됨  0 : 없음  3 : IOC  4 : FOK |
| `CTAC_TLNO` | 연락전화번호 | string | N | 20 | 고객의 연락 가능한 전화번호 |
| `FUOP_ITEM_DVSN_CD` | 선물옵션종목구분코드 | string | N | 2 | 공란(Default) |
| `ORD_DVSN_CD` | 주문구분코드 | string | Y | 2 | 01 : 지정가  02 : 시장가  03 : 조건부  04 : 최유리,  10 : 지정가(IOC)  11 : 지정가(FOK)  12 : 시장가(IOC)  13 : 시장가(FOK)  14 : 최유리(IOC)  15 : 최유리(FOK) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 | 0 : 성공  0 이외의 값 : 실패 |
| `msg_cd` | 응답코드 | string | Y | 8 | 응답코드 |
| `msg1` | 응답메세지 | string | Y | 80 | 응답메세지 |
| `output` | 응답상세 | array | Y |  |  |
| `ACNT_NAME` | 계좌명 | string | Y | 60 | 계좌의 고객명 |
| `TRAD_DVSN_NAME` | 매매구분명 | string | Y | 60 | 매도/매수 등 구분값 |
| `ITEM_NAME` | 종목명 | string | Y | 60 | 주문 종목 명칭 |
| `ORD_TMD` | 주문시각 | string | Y | 6 | 주문 접수 시간 |
| `ORD_GNO_BRNO` | 주문채번지점번호 | string | Y | 5 | 계좌 개설 시 관리점으로 선택한 영업점의 고유번호 |
| `ODNO` | 주문번호 | string | Y | 10 | 접수한 주문의 일련번호 |

**Request Example:**
```
{  	"ORD_PRCS_DVSN_CD":"02",  	"CANO": "810XXXXX",  	"ACNT_PRDT_CD":"03",             	"SLL_BUY_DVSN_CD":"02",  	"SHTN_PDNO":"167R12",  	"ORD_QTY":"1",  	"UNIT_PRICE":"123",  	"NMPR_TYPE_CD":"",  	"KRX_NMPR_CNDT_CD":"",  	"CTAC_TLNO":"",  	"FUOP_ITEM_DVSN_CD":"",  	"ORD_DVSN_CD":"01"  }
```

**Response Example:**
```
{    "rt_cd": "0",    "msg_cd": "APBK0029",    "msg1": "주문전송이 정상적으로 처리되었습니다.",    "output": {      "ACNT_NAME": "류민수",      "TRAD_DVSN_NAME": "매도",      "ITEM_NAME": "코스피200 F 202203",      "ORD_TMD": "131604",      "ORD_GNO_BRNO": "06010",      "ODNO": "0000007045"    }  }
```

---
### 7. 선물옵션 잔고평가손익내역

| Field | Value |
|---|---|
| Sheet | `선물옵션 잔고평가손익내역` |
| Menu | [국내선물옵션] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-futureoption/v1/trading/inquire-balance-valuation-pl` |
| TR_ID (실전) | `CTFO6159R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `MGNA_DVSN` | 증거금구분 | string | Y | 2 | 01 : 개시, 02 : 유지 |
| `EXCC_STAT_CD` | 정산상태코드 | string | Y | 1 | 1 : 정산 (정산가격으로 잔고 조회)  2 : 본정산 (매입가격으로 잔고 조회) |
| `CTX_AREA_FK200` | 연속조회검색조건200 | string | Y | 200 | 연속조회검색조건200 |
| `CTX_AREA_NK200` | 연속조회키200 | string | Y | 200 | 연속조회키200 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output2` | 응답상세 | object | Y |  |  |
| `dnca_cash` | 예수금현금 | string | Y | 19 |  |
| `frcr_dncl_amt` | 외화예수금액 | string | Y | 19 |  |
| `dnca_sbst` | 예수금대용 | string | Y | 19 |  |
| `tot_dncl_amt` | 총예수금액 | string | Y | 19 |  |
| `tot_ccld_amt` | 총체결금액 | string | Y | 19 |  |
| `cash_mgna` | 현금증거금 | string | Y | 19 |  |
| `sbst_mgna` | 대용증거금 | string | Y | 19 |  |
| `mgna_tota` | 증거금총액 | string | Y | 19 |  |
| `opt_dfpa` | 옵션차금 | string | Y | 19 |  |
| `thdt_dfpa` | 당일차금 | string | Y | 19 |  |
| `rnwl_dfpa` | 갱신차금 | string | Y | 19 |  |
| `fee` | 수수료 | string | Y | 19 |  |
| `nxdy_dnca` | 익일예수금 | string | Y | 19 |  |
| `nxdy_dncl_amt` | 익일예수금액 | string | Y | 19 |  |
| `prsm_dpast` | 추정예탁자산 | string | Y | 19 |  |
| `prsm_dpast_amt` | 추정예탁자산금액 | string | Y | 19 |  |
| `pprt_ord_psbl_cash` | 적정주문가능현금 | string | Y | 19 |  |
| `add_mgna_cash` | 추가증거금현금 | string | Y | 19 |  |
| `add_mgna_tota` | 추가증거금총액 | string | Y | 19 |  |
| `futr_trad_pfls_amt` | 선물매매손익금액 | string | Y | 19 |  |
| `opt_trad_pfls_amt` | 옵션매매손익금액 | string | Y | 19 |  |
| `futr_evlu_pfls_amt` | 선물평가손익금액 | string | Y | 19 |  |
| `opt_evlu_pfls_amt` | 옵션평가손익금액 | string | Y | 19 |  |
| `trad_pfls_amt_smtl` | 매매손익금액합계 | string | Y | 19 |  |
| `evlu_pfls_amt_smtl` | 평가손익금액합계 | string | Y | 19 |  |
| `wdrw_psbl_tot_amt` | 인출가능총금액 | string | Y | 19 |  |
| `ord_psbl_cash` | 주문가능현금 | string | Y | 19 |  |
| `ord_psbl_sbst` | 주문가능대용 | string | Y | 19 |  |
| `ord_psbl_tota` | 주문가능총액 | string | Y | 19 |  |
| `output1` | 응답상세2 | array | Y |  | array |
| `cano` | 종합계좌번호 | string | Y | 8 |  |
| `acnt_prdt_cd` | 계좌상품코드 | string | Y | 2 |  |
| `pdno` | 상품번호 | string | Y | 12 |  |
| `prdt_type_cd` | 상품유형코드 | string | Y | 3 |  |
| `shtn_pdno` | 단축상품번호 | string | Y | 12 |  |
| `prdt_name` | 상품명 | string | Y | 60 |  |
| `sll_buy_dvsn_name` | 매도매수구분명 | string | Y | 4 |  |
| `cblc_qty1` | 잔고수량1 | string | Y | 10 |  |
| `excc_unpr` | 정산단가 | string | Y | 24 |  |
| `ccld_avg_unpr1` | 체결평균단가1 | string | Y | 24 |  |
| `idx_clpr` | 지수종가 | string | Y | 24 |  |
| `pchs_amt` | 매입금액 | string | Y | 19 |  |
| `evlu_amt` | 평가금액 | string | Y | 19 |  |
| `evlu_pfls_amt` | 평가손익금액 | string | Y | 19 |  |
| `trad_pfls_amt` | 매매손익금액 | string | Y | 19 |  |
| `lqd_psbl_qty` | 청산가능수량 | string | Y | 19 |  |

**Request Example:**
```
{  	"CANO":"12345678",  	"ACNT_PRDT_CD":"03",  	"MGNA_DVSN":"02",  	"EXCC_STAT_CD":"1",  	"CTX_AREA_FK200":"",  	"CTX_AREA_NK200":""  }
```

**Response Example:**
```
{      "ctx_area_fk200": "12345678!^03!^02!^1                                                                                                                                                                                     ",      "ctx_area_nk200": " !^ !^ !^                                                                                                                                                                                               ",      "output1": [          {              "cano": "12345678",              "acnt_prdt_cd": "03",              "pdno": "KR4101T90003",              "prdt_type_cd": "301",              "shtn_pdno": "101T09",              "prdt_name": "F 202309",              "sll_buy_dvsn_name": "매수",              "cblc_qty1": "2",              "excc_unpr": "340.30000000",              "ccld_avg_unpr1": "345.50000000",              "idx_clpr": "0.00000000",              "pchs_amt": "170150000",              "evlu_amt": "0",              "evlu_pfls_amt": "0",              "trad_pfls_amt": "0",              "lqd_psbl_qty": "2"          },          {              "cano": "12345678",              "acnt_prdt_cd": "03",              "pdno": "KR4101TC0008",              "prdt_type_cd": "301",              "shtn_pdno": "101T12",              "prdt_name": "F 202312",              "sll_buy_dvsn_name": "매수",              "cblc_qty1": "5",              "excc_unpr": "350.00000000",              "ccld_avg_unpr1": "335.50000000",              "idx_clpr": "353.35000000",              "pchs_amt": "437500000",              "evlu_amt": "441687500",              "evlu_pfls_amt": "4187500",              "trad_pfls_amt": "0",              "lqd_psbl_qty": "5"          },          {              "cano": "12345678",              "acnt_prdt_cd": "03",              "pdno": "KR4175TA0001",              "prdt_type_cd": "301",              "shtn_pdno": "175T10",              "prdt_name": "미국달러 F 202310",              "sll_buy_dvsn_name": "매수",              "cblc_qty1": "1",              "excc_unpr": "1349.20000000",              "ccld_avg_unpr1": "1338.60000000",              "idx_clpr": "0.00000000",              "pchs_amt": "13492000",              "evlu_amt": "0",              "evlu_pfls_amt": "0",              "trad_pfls_amt": "0",              "lqd_psbl_qty": "1"          },          {              "cano": "12345678",              "acnt_prdt_cd": "03",              "pdno": "KR4201TA3409",              "prdt_type_cd": "301",              "shtn_pdno": "201T10340",              "prdt_name": "C 202310 340.0",              "sll_buy_dvsn_name": "매수",              "cblc_qty1": "1",              "excc_unpr": "2.80000000",              "ccld_avg_unpr1": "2.80000000",              "idx_clpr": "0.01000000",              "pchs_amt": "700000",              "evlu_amt": "2500",              "evlu_pfls_amt": "-697500",              "trad_pfls_amt": "0",              "lqd_psbl_qty": "1"          }      ],      "output2": {          "dnca_cash": "100000000",  
```

---
### 8. 선물옵션 증거금률

| Field | Value |
|---|---|
| Sheet | `선물옵션 증거금률` |
| Menu | [국내선물옵션] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-futureoption/v1/quotations/margin-rate` |
| TR_ID (실전) | `TTTO6032R` |
| TR_ID (모의) | `미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `BASS_DT` | 기준일자 | string | Y | 8 | 날짜 입력) ex) 20260313 |
| `BAST_ID` | 기초자산ID | string | Y | 20 | 공백 입력 |
| `CTX_AREA_NK200` | 연속조회키200 | string | Y | 200 | 다음 조회 시 필요, 입력 후 header tr_cont : N 설정 필수 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | Array |
| `bast_id` | 기초자산ID | string | Y | 20 |  |
| `bast_name` | 기초자산명 | string | Y | 60 |  |
| `brkg_mgna_rt` | 위탁증거금율 | string | Y | 23 | 소수점 8자리까지 표현 |
| `tr_mgna_rt` | 거래증거금율 | string | Y | 23 | 소수점 8자리까지 표현 |
| `bast_pric` | 기초자산가격 | string | Y | 18 | 소수점 8자리까지 표현 |
| `tr_mtpl_idx` | 거래승수지수 | string | Y | 18 | 소수점 8자리까지 표현 |
| `ctrt_per_futr_mgna` | 계약당선물증거금 | string | Y | 18 | 소수점 8자리까지 표현 |

---
### 9. 선물옵션 정정취소주문

| Field | Value |
|---|---|
| Sheet | `선물옵션 정정취소주문` |
| Menu | [국내선물옵션] 주문/계좌 |
| Method | `POST` |
| URL | `/uapi/domestic-futureoption/v1/trading/order-rvsecncl` |
| TR_ID (실전) | `(주간 정정/취소) TTTO1103U (야간 정정/취소) (구) JTCE1002U (신) STTN1103U` |
| TR_ID (모의) | `(주간 정정/취소) VTTO1103U (야간은 모의투자 미제공)` |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `ORD_PRCS_DVSN_CD` | 주문처리구분코드 | string | Y | 2 | 02 : 주문전송 |
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `RVSE_CNCL_DVSN_CD` | 정정취소구분코드 | string | Y | 2 | 01 : 정정  02 : 취소 |
| `ORGN_ODNO` | 원주문번호 | string | Y | 10 | 정정 혹은 취소할 주문의 번호 |
| `ORD_QTY` | 주문수량 | string | Y | 10 | [Header tr_id TTTO1103U(선물옵션 정정취소 주간)]  전량일경우 0으로 입력    [Header tr_id JTCE1002U(선물옵션 정정취소 야간)]  일부수량 정정 및 취소 불가, 주문수량 반드시 입력 (공백 불가)  일부 미체결 시 잔량 전체에 대해서 취소 가능  EX) 2개 매수주문 후 1개 체결, 1개 미체결인 상태에서 취소주문 시 ORD_QTY는 1로 입력    ※ 모의계좌의 경우, 주문수량 반드시 입력 (공백 불가) |
| `UNIT_PRICE` | 주문가격1 | string | Y | 23 | 시장가나 최유리의 경우 0으로 입력 (취소 시에도 0 입력) |
| `NMPR_TYPE_CD` | 호가유형코드 | string | Y | 2 | 01 : 지정가  02 : 시장가  03 : 조건부  04 : 최유리 |
| `KRX_NMPR_CNDT_CD` | 한국거래소호가조건코드 | string | Y | 1 | 취소시 0으로 입력  정정시  0 : 없음  3 : IOC  4 : FOK |
| `RMN_QTY_YN` | 잔여수량여부 | string | Y | 1 | Y : 전량  N : 일부 |
| `FUOP_ITEM_DVSN_CD` | 선물옵션종목구분코드 | string | N | 2 | [Header tr_id TTTO1103U(선물옵션 정정취소 주간)]  공란(Default)    [Header tr_id JTCE1002U(선물옵션 정정취소 야간)]  01 : 선물  02 : 콜옵션  03 : 풋옵션  04 : 스프레드 |
| `ORD_DVSN_CD` | 주문구분코드 | string | Y | 2 | [정정]  01 : 지정가  02 : 시장가  03 : 조건부  04 : 최유리,  10 : 지정가(IOC)  11 : 지정가(FOK)  12 : 시장가(IOC)  13 : 시장가(FOK)  14 : 최유리(IOC)  15 : 최유리(FOK)    [취소]  01 로 입력 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 | 0 : 성공  0 이외의 값 : 실패 |
| `msg_cd` | 응답코드 | string | Y | 8 | 응답코드 |
| `msg1` | 응답메세지 | string | Y | 80 | 응답메세지 |
| `output` | 응답상세 | array | Y |  |  |
| `ACNT_NAME` | 계좌명 | string | Y | 60 | 계좌의 고객명 |
| `TRAD_DVSN_NAME` | 매매구분명 | string | Y | 60 | 매도/매수 등 구분값 |
| `ITEM_NAME` | 종목명 | string | Y | 60 | 주문 종목 명칭 |
| `ORD_TMD` | 주문시각 | string | Y | 6 | 주문 접수 시간 |
| `ORD_GNO_BRNO` | 주문채번지점번호 | string | Y | 5 | 계좌 개설 시 관리점으로 선택한 영업점의 고유번호 |
| `ORGN_ODNO` | 원주문번호 | string | Y | 10 | 정정 또는 취소 대상 주문의 일련번호 |
| `ODNO` | 주문번호 | string | Y | 10 | 접수한 주문(정정 또는 취소)의 일련번호 |

**Request Example:**
```
{      "ORD_PRCS_DVSN_CD": "02",      "CANO": "810XXXXX",      "ACNT_PRDT_CD": "03",      "RVSE_CNCL_DVSN_CD": "02",      "ORGN_ODNO": "0000005605",      "ORD_QTY": "1",      "UNIT_PRICE": "460.00",      "NMPR_TYPE_CD": "",      "KRX_NMPR_CNDT_CD": "",      "RMN_QTY_YN": "N",      "CTAC_TLNO": "000 00000000",      "FUOP_ITEM_DVSN_CD": "",      "ORD_DVSN_CD": "01"  }
```

---
### 10. 선물옵션 주문체결내역조회

| Field | Value |
|---|---|
| Sheet | `선물옵션 주문체결내역조회` |
| Menu | [국내선물옵션] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-futureoption/v1/trading/inquire-ccnl` |
| TR_ID (실전) | `TTTO5201R` |
| TR_ID (모의) | `VTTO5201R` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `STRT_ORD_DT` | 시작주문일자 | string | Y | 8 | 주문내역 조회 시작 일자, YYYYMMDD |
| `END_ORD_DT` | 종료주문일자 | string | Y | 8 | 주문내역 조회 마지막 일자, YYYYMMDD |
| `SLL_BUY_DVSN_CD` | 매도매수구분코드 | string | Y | 2 | 00 : 전체  01 : 매도  02 : 매수 |
| `CCLD_NCCS_DVSN` | 체결미체결구분 | string | Y | 2 | 00 : 전체  01 : 체결  02 : 미체결 |
| `SORT_SQN` | 정렬순서 | string | Y | 2 | AS : 정순  DS : 역순 |
| `STRT_ODNO` | 시작주문번호 | string | Y | 10 | 조회 시작 번호 입력 |
| `PDNO` | 상품번호 | string | Y | 12 | 공란 시, 전체  조회  선물 6자리 (예: 101S03)  옵션 9자리 (예: 201S03370) |
| `MKET_ID_CD` | 시장ID코드 | string | Y | 3 | 공란(Default) |
| `CTX_AREA_FK200` | 연속조회검색조건200 | string | Y | 200 | 공란 : 최초 조회시  이전 조회 Output CTX_AREA_FK200값 : 다음페이지 조회시(2번째부터) |
| `CTX_AREA_NK200` | 연속조회키200 | string | Y | 200 | 공란 : 최초 조회시  이전 조회 Output CTX_AREA_NK200값 : 다음페이지 조회시(2번째부터) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 | 0 : 성공  0 이외의 값 : 실패 |
| `msg_cd` | 응답코드 | string | Y | 8 | 응답코드 |
| `msg1` | 응답메세지 | string | Y | 80 | 응답메세지 |
| `ctx_area_fk200` | 연속조회검색조건200 | string | Y | 200 |  |
| `ctx_area_nk200` | 연속조회키200 | string | Y | 200 |  |
| `output1` | 응답상세1 | array | Y |  |  |
| `ord_gno_brno` | 주문채번지점번호 | string | Y | 5 | 계좌 개설 시 관리점으로 선택한 영업점의 고유번호 |
| `cano` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `csac_name` | 종합계좌명 | string | Y | 60 | 계좌의 고객명 |
| `acnt_prdt_cd` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `ord_dt` | 주문일자 | string | Y | 8 | 주문의 접수일자 |
| `odno` | 주문번호 | string | Y | 10 | 접수한 주문의 일련번호 |
| `orgn_odno` | 원주문번호 | string | Y | 10 | 정정 또는 취소 대상 주문의 일련번호 |
| `sll_buy_dvsn_cd` | 매도매수구분코드 | string | Y | 2 | 00 : 전체   01 : 매도   02 : 매수 |
| `trad_dvsn_name` | 매매구분명 | string | Y | 60 | 매도/매수 등 구분값 |
| `nmpr_type_cd` | 호가유형코드 | string | Y | 2 | 01 : 지정가  02 : 시장가  03 : 조건부  04 : 최유리 |
| `nmpr_type_name` | 호가유형명 | string | Y | 60 | 호가 유형의 명칭 |
| `pdno` | 상품번호 | string | Y | 12 | 선물옵션종목코드 |
| `prdt_name` | 상품명 | string | Y | 60 |  |
| `prdt_type_cd` | 상품유형코드 | string | Y | 3 |  |
| `ord_qty` | 주문수량 | string | Y | 10 | 주문 수량 |
| `ord_idx` | 주문지수 | string | Y | 24 | 주문 가격 |
| `qty` | 잔량 | string | Y | 10 | 주문 체결되지 않고 남은 수량 |
| `ord_tmd` | 주문시각 | string | Y | 6 | 주문 접수 시간 |
| `tot_ccld_qty` | 총체결수량 | string | Y | 10 | 주문 체결된 수량 |
| `avg_idx` | 평균지수 | string | Y | 27 | 체결된 주문 수량의 평균 체결 가격 |
| `tot_ccld_amt` | 총체결금액 | string | Y | 19 | 체결된 주문의 합계금액 |
| `rjct_qty` | 거부수량 | string | Y | 10 | 접수된 주문이 정상 처리되지 못하고 거부된 수량 |
| `ingr_trad_rjct_rson_cd` | 장내매매거부사유코드 | string | Y | 5 | 정상 처리되지 못하고 거부된 주문의 사유코드 |
| `ingr_trad_rjct_rson_name` | 장내매매거부사유명 | string | Y | 60 | 정상 처리되지 못하고 거부된 주문의 사유 |
| `ord_stfno` | 주문직원번호 | string | Y | 6 | 주문 접수한 직원의 사번 또는 온라인 주문 시 매체 유형코드 |
| `sprd_item_yn` | 스프레드종목여부 | string | Y | 1 | 스프레드 종목 여부 구분값 |
| `ord_ip_addr` | 주문IP주소 | string | Y | 200 | 주문 시 사용한 매체의 IP 주소 |
| `output2` | 응답상세2 | object | Y |  |  |
| `tot_ord_qty` | 총주문수량 | string | Y | 10 | 전체 주문 수량 |
| `tot_ccld_amt_smtl` | 총체결금액합계 | string | Y | 19 | 체결된 주문 전체의 합계 금액 |
| `tot_ccld_qty_smtl` | 총체결수량합계 | string | Y | 19 | 체결된 주문 전체의 합계 수량 |
| `fee_smtl` | 수수료합계 | string | Y | 19 | 체결된 주문에 대한 매매수수료의 합계 금액 |
| `ctac_tlno` | 연락전화번호 | string | Y | 20 | 고객의 연락 가능한 전화번호 |

**Request Example:**
```
{  	"CANO": "810XXXXX",  	"ACNT_PRDT_CD":"03",  	"STRT_ORD_DT": "20211122",  	"END_ORD_DT": "20211122",  	"SLL_BUY_DVSN_CD": "00",  	"CCLD_NCCS_DVSN": "00",  	"SORT_SQN": "DS",  	"STRT_ODNO": "",  	"PDNO": "",  	"MKET_ID_CD": "00",  	"CTX_AREA_FK200": "",  	"CTX_AREA_NK200": ""  }
```

**Response Example:**
```
{    "ctx_area_fk200": "81055689^03^20220101^20220114^DS^                                                                                                                                                                       ",    "ctx_area_nk200": "                                                                                                                                                                                                        ",    "output1": [      {        "ord_gno_brno": "06010",        "cano": "810XXXXX",        "csac_name": "",        "acnt_prdt_cd": "03",        "ord_dt": "20220113",        "odno": "0000007045",        "orgn_odno": "0000000000",        "sll_buy_dvsn_cd": "01",        "trad_dvsn_name": "HTS SELL",        "nmpr_type_cd": "01",        "nmpr_type_name": "Limit Order",        "pdno": "101S03",        "prdt_name": "F 202203",        "prdt_type_cd": "301",        "ord_qty": "1",        "ord_idx": "400.00",        "qty": "0",        "ord_tmd": "131604",        "tot_ccld_qty": "1",        "avg_idx": "400.00000000",        "tot_ccld_amt": "100000000",        "rjct_qty": "0",        "ingr_trad_rjct_rson_cd": "00000",        "ingr_trad_rjct_rson_name": "NORMAL",        "ord_stfno": "Nsmart",        "sprd_item_yn": "N",        "ord_ip_addr": "P01032651641"      },      {        "ord_gno_brno": "06010",        "cano": "810XXXXX",        "csac_name": "",        "acnt_prdt_cd": "03",        "ord_dt": "20220111",        "odno": "0000007006",        "orgn_odno": "0000007004",        "sll_buy_dvsn_cd": "01",        "trad_dvsn_name": "CANCEL CONFIRM",        "nmpr_type_cd": "01",        "nmpr_type_name": "Limit Order",        "pdno": "101S03",        "prdt_name": "F 202203",        "prdt_type_cd": "301",        "ord_qty": "1",        "ord_idx": "0.00",        "qty": "0",        "ord_tmd": "150233",        "tot_ccld_qty": "0",        "avg_idx": "0.00000000",        "tot_ccld_amt": "0",        "rjct_qty": "0",        "ingr_trad_rjct_rson_cd": "00000",        "ingr_trad_rjct_rson_name": "NORMAL",        "ord_stfno": "Nsmart",        "sprd_item_yn": "N",        "ord_ip_addr": "P01032651641"      }    ],    "output2": {      "tot_ord_qty": "4",      "tot_ccld_amt_smtl": "200000000",      "tot_ccld_qty_smtl": "2",      "fee_smtl": "28570",      "ctac_tlno": "01047859775"    },    "rt_cd": "0",    "msg_cd": "KIOK0510",    "msg1": "조회가 완료되었습니다                                                           "  }
```

---
### 11. (야간)선물옵션 주문체결 내역조회

| Field | Value |
|---|---|
| Sheet | `(야간)선물옵션 주문체결 내역조회` |
| Menu | [국내선물옵션] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-futureoption/v1/trading/inquire-ngt-ccnl` |
| TR_ID (실전) | `(구) JTCE5005R (신) STTN5201R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `STRT_ORD_DT` | 시작주문일자 | string | Y | 8 |  |
| `END_ORD_DT` | 종료주문일자 | string | Y | 8 | 조회하려는 마지막 일자 다음일자로 조회  (ex. 20221011 까지의 내역을 조회하고자 할 경우,   20221012로 종료주문일자 설정) |
| `SLL_BUY_DVSN_CD` | 매도매수구분코드 | string | Y | 2 | 공란 : default (00: 전체 ,01 : 매도, 02 : 매수) |
| `CCLD_NCCS_DVSN` | 체결미체결구분 | string | Y | 2 | 00 : 전체  01 : 체결  02 : 미체결 |
| `SORT_SQN` | 정렬순서 | string | Y | 2 | 공란 : default (DS : 정순, 그외 : 역순) |
| `STRT_ODNO` | 시작주문번호 | string | Y | 10 | 공란 : default |
| `PDNO` | 상품번호 | string | Y | 12 | 공란 : default |
| `MKET_ID_CD` | 시장ID코드 | string | Y | 3 | 공란 : default |
| `FUOP_DVSN_CD` | 선물옵션구분코드 | string | Y | 2 | 공란 : 전체, 01 : 선물, 02 : 옵션 |
| `SCRN_DVSN` | 화면구분 | string | Y | 2 | 02(Default) |
| `CTX_AREA_FK200` | 연속조회검색조건200 | string | Y | 200 | 공란 : 최초 조회시  이전 조회 Output CTX_AREA_FK200값 : 다음페이지 조회시(2번째부터) |
| `CTX_AREA_NK200` | 연속조회키200 | string | Y | 200 | 공란 : 최초 조회시  이전 조회 Output CTX_AREA_NK200값 : 다음페이지 조회시(2번째부터) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output2` | 응답상세1 | object | Y |  |  |
| `tot_ord_qty` | 총주문수량 | string | Y | 10 |  |
| `tot_ccld_qty` | 총체결수량 | string | Y | 10 |  |
| `tot_ccld_qty_SMTL` | 총체결수량 | string | Y | 19 | 신규 TR 사용 필드 |
| `tot_ccld_amt` | 총체결금액 | string | Y | 19 |  |
| `tot_ccld_amt_SMTL` | 총체결금액 | string | Y | 11 | 신규 TR 사용 필드 |
| `fee` | 수수료 | string | Y | 19 |  |
| `ctac_tlno` | 연락전화번호 | string | Y | 20 | 신규 TR 사용 필드 |
| `output1` | 응답상세2 | object array | Y |  | 시간별체결 정보 |
| `ord_gno_brno` | 주문채번지점번호 | string | Y | 5 |  |
| `cano` | 종합계좌번호 | string | Y | 8 |  |
| `csac_name` | 종합계좌명 | string | Y | 60 |  |
| `acnt_prdt_cd` | 계좌상품코드 | string | Y | 2 |  |
| `ord_dt` | 주문일자 | string | Y | 8 |  |
| `odno` | 주문번호 | string | Y | 10 |  |
| `orgn_odno` | 원주문번호 | string | Y | 10 |  |
| `sll_buy_dvsn_cd` | 매도매수구분코드 | string | Y | 2 |  |
| `trad_dvsn_name` | 매매구분명 | string | Y | 60 |  |
| `nmpr_type_name` | 호가유형명 | string | Y | 60 |  |
| `pdno` | 상품번호 | string | Y | 12 |  |
| `prdt_name` | 상품명 | string | Y | 60 |  |
| `prdt_type_cd` | 상품유형코드 | string | Y | 3 |  |
| `ord_qty` | 주문수량 | string | Y | 10 |  |
| `ord_idx4` | 주문지수 | string | Y | 20 | 신규 TR 사용 필드 |
| `qty` | 잔량 | string | Y | 10 |  |
| `ord_tmd` | 주문시각 | string | Y | 6 |  |
| `tot_ccld_qty` | 총체결수량 | string | Y | 10 |  |
| `avg_idx` | 평균지수 | string | Y | 19 |  |
| `tot_ccld_amt` | 총체결금액 | string | Y | 19 |  |
| `rjct_qty` | 거부수량 | string | Y | 10 |  |
| `ingr_trad_rjct_rson_cd` | 장내매매거부사유코드 | string | Y | 5 |  |
| `ingr_trad_rjct_rson_name` | 장내매매거부사유명 | string | Y | 60 |  |
| `ord_stfno` | 주문직원번호 | string | Y | 6 |  |
| `sprd_item_yn` | 스프레드종목여부 | string | Y | 1 |  |
| `ord_ip_addr` | 주문IP주소 | string | Y | 200 |  |

**Request Example:**
```
{  	"CANO":"80012345",  	"ACNT_PRDT_CD":"03",  	"STRT_ORD_DT":"20220730",  	"END_ORD_DT":"20221214",  	"SLL_BUY_DVSN_CD":"00",  	"CCLD_NCCS_DVSN":"00",  	"SORT_SQN":"DS",  	"STRT_ODNO":"",  	"PDNO":"",  	"MKET_ID_CD":"00",  	"FUOP_DVSN_CD":"",  	"SCRN_DVSN":"00",  	"CTX_AREA_FK200":"",  	"CTX_AREA_NK200":""  }
```

**Response Example:**
```
{      "ctx_area_fk200": "81012345^03^20221214^20221214^DS^                                                                                                                                                                       ",      "ctx_area_nk200": "                                                                                                                                                                                                        ",      "output1": [],      "output2": {          "tot_ord_qty": "0",          "tot_ccld_qty": "0",          "tot_ccld_amt": "0",          "fee": "0"      },      "rt_cd": "0",      "msg_cd": "KIOK0560",      "msg1": "조회할 내용이 없습니다                                                          "  }
```

---
### 12. (야간)선물옵션 주문가능 조회

| Field | Value |
|---|---|
| Sheet | `(야간)선물옵션 주문가능 조회` |
| Menu | [국내선물옵션] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-futureoption/v1/trading/inquire-psbl-ngt-order` |
| TR_ID (실전) | `(구) JTCE1004R (신) STTN5105R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 |  |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 |  |
| `PDNO` | 상품번호 | string | Y | 12 |  |
| `PRDT_TYPE_CD` | 상품유형코드 | string | Y | 3 | 301 : 선물옵션 |
| `SLL_BUY_DVSN_CD` | 매도매수구분코드 | string | Y | 2 | 01 : 매도 , 02 : 매수 |
| `UNIT_PRICE` | 주문가격1 | string | Y | 23 |  |
| `ORD_DVSN_CD` | 주문구분코드 | string | Y | 2 | '01 : 지정가        02 : 시장가   03 : 조건부        04 : 최유리,   10 : 지정가(IOC) 11 : 지정가(FOK)   12 : 시장가(IOC) 13 : 시장가(FOK)   14 : 최유리(IOC) 15 : 최유리(FOK)' |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세1 | object | Y |  |  |
| `max_ord_psbl_qty` | 최대주문가능수량 | string | Y | 19 | 최대주문가능수량 (신규 TR 미사용 필드) |
| `tot_psbl_qty` | 최대주문가능수량 | string | Y | 19 |  |
| `lqd_psbl_qty` | 청산가능수량 | string | Y | 19 | 청산가능수량 |
| `lqd_psbl_qty_1` | 청산가능수량 | string | Y | 19 | 신규 TR 사용 필드 |
| `ord_psbl_qty` | 주문가능수량 | string | Y | 19 |  |
| `bass_idx` | 기준지수 | string | Y | 23 | 신규 TR 사용 필드 |

**Request Example:**
```
{  	"CANO":"80012345",  	"ACNT_PRDT_CD":"03",  	"PDNO":"101T03",  	"PRDT_TYPE_CD":"301",  	"SLL_BUY_DVSN_CD":"02",  	"UNIT_PRICE":"",  	"ORD_DVSN_CD":"01"  }
```

**Response Example:**
```
{      "output": {          "max_ord_psbl_qty": "996",          "lqd_psbl_qty": "0",          "ord_psbl_qty": "996"      },      "rt_cd": "0",      "msg_cd": "KIOK0510",      "msg1": "조회가 완료되었습니다                                                           "  }
```

---
### 13. 선물옵션 잔고정산손익내역

| Field | Value |
|---|---|
| Sheet | `선물옵션 잔고정산손익내역` |
| Menu | [국내선물옵션] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-futureoption/v1/trading/inquire-balance-settlement-pl` |
| TR_ID (실전) | `CTFO6117R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `INQR_DT` | 조회일자 | string | Y | 8 | 조회일자(YYYYMMDD) |
| `CTX_AREA_FK200` | 연속조회검색조건200 | string | Y | 200 | 연속조회검색조건200 |
| `CTX_AREA_NK200` | 연속조회키200 | string | Y | 200 | 연속조회키200 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output2` | 응답상세 | object | Y |  |  |
| `nxdy_dnca` | 익일예수금 | string | Y | 19 |  |
| `mmga_cash` | 유지증거금현금 | string | Y | 19 |  |
| `brkg_mgna_cash` | 위탁증거금현금 | string | Y | 19 |  |
| `opt_buy_chgs` | 옵션매수대금 | string | Y | 19 |  |
| `opt_lqd_evlu_amt` | 옵션청산평가금액 | string | Y | 19 |  |
| `dnca_sbst` | 예수금대용 | string | Y | 19 |  |
| `mmga_tota` | 유지증거금총액 | string | Y | 19 |  |
| `brkg_mgna_tota` | 위탁증거금총액 | string | Y | 19 |  |
| `opt_sll_chgs` | 옵션매도대금 | string | Y | 19 |  |
| `fee` | 수수료 | string | Y | 19 |  |
| `thdt_dfpa` | 당일차금 | string | Y | 19 |  |
| `rnwl_dfpa` | 갱신차금 | string | Y | 19 |  |
| `dnca_cash` | 예수금현금 | string | Y | 19 |  |
| `output1` | 응답상세2 | array | Y |  | array |
| `pdno` | 상품번호 | string | Y | 12 |  |
| `prdt_name` | 상품명 | string | Y | 60 |  |
| `trad_dvsn_name` | 매매구분명 | string | Y | 60 |  |
| `bfdy_cblc_qty` | 전일잔고수량 | string | Y | 19 |  |
| `new_qty` | 신규수량 | string | Y | 10 |  |
| `mnpl_rpch_qty` | 전매환매수량 | string | Y | 10 |  |
| `cblc_qty` | 잔고수량 | string | Y | 19 |  |
| `cblc_amt` | 잔고금액 | string | Y | 19 |  |
| `trad_pfls_amt` | 매매손익금액 | string | Y | 19 |  |
| `evlu_amt` | 평가금액 | string | Y | 19 |  |
| `evlu_pfls_amt` | 평가손익금액 | string | Y | 19 |  |

**Request Example:**
```
{  	"CANO":"12345678",  	"ACNT_PRDT_CD":"03",  	"INQR_DT":"20230906",  	"CTX_AREA_FK200":"",  	"CTX_AREA_NK200":""  }
```

**Response Example:**
```
{      "ctx_area_fk200": "12345678!^03!^20230906                                                                                                                                                                                  ",      "ctx_area_nk200": " !^                                                                                                                                                                                                     ",      "output1": [          {              "pdno": "101T09",              "prdt_name": "F 202309",              "trad_dvsn_name": "매수",              "bfdy_cblc_qty": "2",              "new_qty": "0",              "mnpl_rpch_qty": "0",              "cblc_qty": "2",              "cblc_amt": "-425000",              "trad_pfls_amt": "0",              "evlu_amt": "149350000",              "evlu_pfls_amt": "-1675000"          }      ],      "output2": {          "nxdy_dnca": "0",          "mmga_cash": "0",          "brkg_mgna_cash": "0",          "opt_buy_chgs": "0",          "opt_lqd_evlu_amt": "0",          "dnca_sbst": "0",          "mmga_tota": "0",          "brkg_mgna_tota": "0",          "opt_sll_chgs": "0",          "fee": "0",          "thdt_dfpa": "0",          "rnwl_dfpa": "0",          "dnca_cash": "0"      },      "rt_cd": "0",      "msg_cd": "KIOK0460",      "msg1": "조회 되었습니다. (마지막 자료)                                                  "  }
```

---
### 14. 선물옵션 주문가능

| Field | Value |
|---|---|
| Sheet | `선물옵션 주문가능` |
| Menu | [국내선물옵션] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-futureoption/v1/trading/inquire-psbl-order` |
| TR_ID (실전) | `TTTO5105R` |
| TR_ID (모의) | `VTTO5105R` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | N | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | N | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `PDNO` | 상품번호 | string | N | 12 | 선물옵션종목코드  선물 6자리 (예: 101S03)  옵션 9자리 (예: 201S03370) |
| `SLL_BUY_DVSN_CD` | 매도매수구분코드 | string | N | 2 | 01 : 매도  02 : 매수 |
| `UNIT_PRICE` | 주문가격1 | string | N | 23 | 주문가격  ※ 주문가격 '0'일 경우   - 옵션매수 : 현재가   - 그 이외   : 기준가 |
| `ORD_DVSN_CD` | 주문구분코드 | string | N | 2 | 01 : 지정가  02 : 시장가  03 : 조건부  04 : 최유리,  10 : 지정가(IOC)  11 : 지정가(FOK)  12 : 시장가(IOC)  13 : 시장가(FOK)  14 : 최유리(IOC)  15 : 최유리(FOK) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 | 0 : 성공  0 이외의 값 : 실패 |
| `msg_cd` | 응답코드 | string | Y | 8 | 응답코드 |
| `msg1` | 응답메세지 | string | Y | 80 | 응답메세지 |
| `output` | 응답상세 | array | Y |  |  |
| `tot_psbl_qty` | 총가능수량 | string | Y | 10 | 총가능수량 |
| `lqd_psbl_qty1` | 청산가능수량1 | string | Y | 10 | 청산가능수량 |
| `ord_psbl_qty` | 주문가능수량 | string | Y | 10 | 주문가능수량 |
| `bass_idx` | 기준지수 | string | Y | 32 | 기준지수 |

**Request Example:**
```
{  	"CANO": "810XXXXX",  	"ACNT_PRDT_CD":"03",  	"PDNO": "101R12",  	"SLL_BUY_DVSN_CD": "02",  	"UNIT_PRICE": "397.95",  	"ORD_DVSN_CD": "01"  }
```

**Response Example:**
```
{    "output": {      "tot_psbl_qty": "11679",      "lqd_psbl_qty1": "0",      "ord_psbl_qty": "11665",      "bass_idx": "379.67000000"    },    "rt_cd": "0",    "msg_cd": "KIOK0510",    "msg1": "조회가 완료되었습니다                                                           "  }
```

---
### 15. 선물옵션 기준일체결내역

| Field | Value |
|---|---|
| Sheet | `선물옵션 기준일체결내역` |
| Menu | [국내선물옵션] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-futureoption/v1/trading/inquire-ccnl-bstime` |
| TR_ID (실전) | `CTFO5139R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 계좌번호 체계(8-2)의 앞 8자리 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌번호 체계(8-2)의 뒤 2자리 |
| `ORD_DT` | 주문일자 | string | Y | 8 | 주문일자(YYYYMMDD) |
| `FUOP_TR_STRT_TMD` | 선물옵션거래시작시각 | string | Y | 6 | 선물옵션거래시작시간(HHMMSS) |
| `FUOP_TR_END_TMD` | 선물옵션거래종료시각 | string | Y | 6 | 선물옵션거래종료시간(HHMMSS) |
| `CTX_AREA_FK200` | 연속조회검색조건200 | string | Y | 200 | 연속조회검색조건200 |
| `CTX_AREA_NK200` | 연속조회키200 | string | Y | 200 | 연속조회키200 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | array | Y |  | array |
| `pdno` | 상품번호 | string | Y | 12 |  |
| `prdt_name` | 상품명 | string | Y | 60 |  |
| `odno` | 주문번호 | string | Y | 10 |  |
| `tr_type_name` | 거래유형명 | string | Y | 60 |  |
| `last_sttldt` | 최종결제일 | string | Y | 8 |  |
| `ccld_idx` | 체결지수 | string | Y | 24 |  |
| `ccld_qty` | 체결량 | string | Y | 10 |  |
| `trad_amt` | 매매금액 | string | Y | 19 |  |
| `fee` | 수수료 | string | Y | 19 |  |
| `ccld_btwn` | 체결시간 | string | Y | 6 |  |
| `output2` | 응답상세2 | object | Y |  |  |
| `tot_ccld_qty_smtl` | 총체결수량합계 | string | Y | 19 |  |
| `tot_ccld_amt_smtl` | 총체결금액합계 | string | Y | 19 |  |
| `fee_adjt` | 수수료조정 | string | Y | 19 |  |
| `fee_smtl` | 수수료합계 | string | Y | 19 |  |

**Request Example:**
```
{  	"CANO":"12345678",  	"ACNT_PRDT_CD":"03",  	"ORD_DT":"20230920",  	"FUOP_TR_STRT_TMD":"000000",  	"FUOP_TR_END_TMD":"240000",  	"CTX_AREA_FK200":"",  	'CTX_AREA_NK200":""  }
```

**Response Example:**
```
{      "ctx_area_fk200": "12345678!^03!^20230920!^000000!^240000                                                                                                                                                                  ",      "ctx_area_nk200": " !^ !^ !^                                                                                                                                                                                               ",      "output1": [          {              "pdno": "201T10340",              "prdt_name": "코스피200 C 202310 340.0",              "odno": "0000219602",              "tr_type_name": "지수콜옵션매수",              "last_sttldt": "20231012",              "ccld_idx": "2.80000000",              "ccld_qty": "1",              "trad_amt": "700000",              "fee": "2758",              "ccld_btwn": "140144"          },          {              "pdno": "101T12",              "prdt_name": "코스피200 F 202312",              "odno": "0000219606",              "tr_type_name": "지수선물매수",              "last_sttldt": "20231214",              "ccld_idx": "335.50000000",              "ccld_qty": "5",              "trad_amt": "419375000",              "fee": "41144",              "ccld_btwn": "140121"          }      ],      "output2": {          "tot_ccld_qty_smtl": "6",          "tot_ccld_amt_smtl": "420075000",          "fee_adjt": "43902",          "fee_smtl": "43890"      },      "rt_cd": "0",      "msg_cd": "KIOK0460",      "msg1": "조회 되었습니다. (마지막 자료)                                                  "  }
```

---
### 16. 선물옵션 시세

| Field | Value |
|---|---|
| Sheet | `선물옵션 시세` |
| Menu | [국내선물옵션] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-futureoption/v1/quotations/inquire-price` |
| TR_ID (실전) | `FHMIF10000000` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | FID 조건 시장 분류 코드 | string | Y | 2 | F: 지수선물, O:지수옵션  JF: 주식선물, JO:주식옵션  CF: 상품선물(금), 금리선물(국채), 통화선물(달러)  CM: 야간선물, EU: 야간옵션 |
| `FID_INPUT_ISCD` | FID 입력 종목코드 | string | Y | 12 | 종목코드 (예: 101S03) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 | 0 : 성공  0 이외의 값 : 실패 |
| `msg_cd` | 응답코드 | string | Y | 8 | 응답코드 |
| `msg1` | 응답메세지 | string | Y | 80 | 응답메세지 |
| `output1` | 응답상세1 | object | Y |  |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 | 종목명 |
| `futs_prpr` | 선물 현재가 | string | Y | 14 | 선물의 현재가격 |
| `futs_prdy_vrss` | 선물 전일 대비 | string | Y | 14 | 선물의 전일 종가와 당일 현재가의 차이 (당일 현재가-전일 종가) |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 | 1 : 상한   2 : 상승  3 : 보합  4 : 하한  5 : 하락 |
| `futs_prdy_clpr` | 선물 전일 종가 | string | Y | 14 | 해당 선물 종목의 전일 종가 |
| `futs_prdy_ctrt` | 선물 전일 대비율 | string | Y | 11 | 선물 전일 대비 / 당일 현재가 * 100 |
| `acml_vol` | 누적 거래량 | string | Y | 18 | 당일 조회시점까지 전체 거래량 |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 | 당일 조회시점까지 전체 거래금액 |
| `hts_otst_stpl_qty` | HTS 미결제 약정 수량 | string | Y | 18 | 현재까지 반대매매로 청산되지 않은 계약수 |
| `otst_stpl_qty_icdc` | 미결제 약정 수량 증감 | string | Y | 10 | 전일대비 미결제 약정 수량의 증감 |
| `futs_oprc` | 선물 시가2 | string | Y | 14 | 당일 최초 거래가격 |
| `futs_hgpr` | 선물 최고가 | string | Y | 14 | 당일 조회 시점까지 가장 높은 거래가격 |
| `futs_lwpr` | 선물 최저가 | string | Y | 14 | 당일 조회 시점까지 가장 낮은 거래가격 |
| `futs_mxpr` | 선물 상한가 | string | Y | 14 | 당일 거래 가능한 최고 가격 |
| `futs_llam` | 선물 하한가 | string | Y | 14 | 당일 거래 가능한 최저 가격 |
| `basis` | 베이시스 | string | Y | 13 | 이론베이시스  선물 이론가격과 현물가격과의 차이 |
| `futs_sdpr` | 선물 기준가 | string | Y | 14 |  |
| `hts_thpr` | HTS 이론가 | string | Y | 14 | 해당 월물의 이론적 가치를 계산한 것으로 주가지수 선물 이론가격은 (주가지수 선물 이론가격 = 주가지수 + 기간이자비용 - 기간배당수입) 로 계산 |
| `dprt` | 괴리율 | string | Y | 11 | 현재의 시장가가 이론가격으로부터 얼마나 벗어나 있는지에 대한 측정 자료  괴리도 = (현재가 - 이론가격) |
| `crbr_aply_mxpr` | 서킷브레이커 적용 상한가 | string | Y | 14 |  |
| `crbr_aply_llam` | 서킷브레이커 적용 하한가 | string | Y | 14 |  |
| `futs_last_tr_date` | 선물 최종 거래 일자 | string | Y | 8 | 해당 선물 종목의 마지막 거래일 |
| `hts_rmnn_dynu` | HTS 잔존 일수 | string | Y | 5 | 최종 거래일까지 남은 일수 |
| `futs_lstn_medm_hgpr` | 선물 상장 중 최고가 | string | Y | 14 | 해당 선물 종목의 상장일 이후 최고 거래가격 |
| `futs_lstn_medm_lwpr` | 선물 상장 중 최저가 | string | Y | 14 | 해당 선물 종목의 상장일 이후 최저 거래가격 |
| `delta_val` | 델타 값 | string | Y | 16 | 옵션 종목의 지표값 |
| `gama` | 감마 | string | Y | 13 | 옵션 종목의 지표값 |
| `theta` | 세타 | string | Y | 13 | 옵션 종목의 지표값 |
| `vega` | 베가 | string | Y | 13 | 옵션 종목의 지표값 |
| `rho` | 로우 | string | Y | 13 | 옵션 종목의 지표값 |
| `hist_vltl` | 역사적 변동성 | string | Y | 16 | 옵션 종목의 지표값 |
| `hts_ints_vltl` | HTS 내재 변동성 | string | Y | 16 | 옵션 종목의 지표값 |
| `mrkt_basis` | 시장 베이시스 | string | Y | 13 | 시장베이시스  현재 시장에서 형성된 선물가격과 현물가격과의 차이 |
| `acpr` | 행사가 | string | Y | 14 | 옵션의 행사가격 |
| `output2` | 응답상세2 | object | Y |  |  |
| `bstp_cls_code` | 업종 구분 코드 | string | Y | 4 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 | 종목명 |
| `bstp_nmix_prpr` | 업종 지수 현재가 | string | Y | 14 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `bstp_nmix_prdy_vrss` | 업종 지수 전일 대비 | string | Y | 14 |  |
| `bstp_nmix_prdy_ctrt` | 업종 지수 전일 대비율 | string | Y | 11 |  |
| `output3` | 응답상세3 | object | Y |  |  |
| `bstp_cls_code` | 업종 구분 코드 | string | Y | 4 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `bstp_nmix_prpr` | 업종 지수 현재가 | string | Y | 14 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `bstp_nmix_prdy_vrss` | 업종 지수 전일 대비 | string | Y | 14 |  |
| `bstp_nmix_prdy_ctrt` | 업종 지수 전일 대비율 | string | Y | 11 |  |

**Request Example:**
```
{  "fid_cond_mrkt_div_code": "F",  "fid_input_iscd": "101S03"  }
```

**Response Example:**
```
{    "output1": {      "hts_kor_isnm": "F 202203",      "futs_prpr": "395.00",      "futs_prdy_vrss": "6.70",      "prdy_vrss_sign": "2",      "futs_prdy_clpr": "388.30",      "futs_prdy_ctrt": "1.73",      "acml_vol": "220924",      "acml_tr_pbmn": "21741293338",      "hts_otst_stpl_qty": "247121",      "otst_stpl_qty_icdc": "-592",      "futs_oprc": "391.05",      "futs_hgpr": "395.15",      "futs_lwpr": "391.00",      "futs_mxpr": "419.35",      "futs_llam": "357.25",      "basis": "0.82",      "futs_sdpr": "388.30",      "hts_thpr": "395.48",      "dprt": "-0.12",      "crbr_aply_mxpr": "0.00",      "crbr_aply_llam": "0.00",      "futs_last_tr_date": "20220310",      "hts_rmnn_dynu": "58",      "futs_lstn_medm_hgpr": "434.00",      "futs_lstn_medm_lwpr": "366.60",      "delta_val": "1.0000",      "gama": "0.0000",      "theta": "0.0000",      "vega": "0.0000",      "rho": "0.0000",      "mrkt_basis": "0.34"    },    "output2": {      "bstp_cls_code": "0001",      "hts_kor_isnm": "종합",      "bstp_nmix_prpr": "2972.48",      "prdy_vrss_sign": "2",      "bstp_nmix_prdy_vrss": "45.10",      "bstp_nmix_prdy_ctrt": "1.54"    },    "output3": {      "bstp_cls_code": "2001",      "hts_kor_isnm": "KOSPI200",      "bstp_nmix_prpr": "394.66",      "prdy_vrss_sign": "2",      "bstp_nmix_prdy_vrss": "5.69",      "bstp_nmix_prdy_ctrt": "1.46"    },    "rt_cd": "0",    "msg_cd": "MCA00000",    "msg1": "정상처리 되었습니다!"  }
```

---
### 17. 국내선물 기초자산 시세

| Field | Value |
|---|---|
| Sheet | `국내선물 기초자산 시세` |
| Menu | [국내선물옵션] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-futureoption/v1/quotations/display-board-top` |
| TR_ID (실전) | `FHPIF05030000` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (F: 선물) |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 선물최근월물 ex)(101V06) |
| `FID_COND_MRKT_DIV_CODE1` | 조건 시장 분류 코드 | string | Y | 2 | 공백 |
| `FID_COND_SCR_DIV_CODE` | 조건 화면 분류 코드 | string | Y | 5 | 공백 |
| `FID_MTRT_CNT` | 만기 수 | string | Y | 11 | 공백 |
| `FID_COND_MRKT_CLS_CODE` | 조건 시장 구분 코드 | string | Y | 6 | 공백 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `unas_prpr` | 기초자산 현재가 | string | Y | 112 |  |
| `unas_prdy_vrss` | 기초자산 전일 대비 | string | Y | 112 |  |
| `unas_prdy_vrss_sign` | 기초자산 전일 대비 부호 | string | Y | 1 |  |
| `unas_prdy_ctrt` | 기초자산 전일 대비율 | string | Y | 82 |  |
| `unas_acml_vol` | 기초자산 누적 거래량 | string | Y | 18 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `futs_prpr` | 선물 현재가 | string | Y | 112 |  |
| `futs_prdy_vrss` | 선물 전일 대비 | string | Y | 112 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `futs_prdy_ctrt` | 선물 전일 대비율 | string | Y | 82 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `hts_rmnn_dynu` | HTS 잔존 일수 | string | Y | 5 |  |

**Request Example:**
```
fid_cond_mrkt_div_code:F  fid_input_iscd:101V06  fid_cond_mrkt_div_code1:  fid_cond_scr_div_code:  fid_mtrt_cnt:  fid_cond_mrkt_cls_code:
```

**Response Example:**
```
{      "output1": {          "unas_prpr": "367.25",          "unas_prdy_vrss": "-3.47",          "unas_prdy_vrss_sign": "5",          "unas_prdy_ctrt": "-0.94",          "unas_acml_vol": "161725000",          "hts_kor_isnm": "F 202406",          "futs_prpr": "369.35",          "futs_prdy_vrss": "-3.45",          "prdy_vrss_sign": "5",          "futs_prdy_ctrt": "-0.93"      },      "output2": [],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 18. 선물옵션 일중예상체결추이

| Field | Value |
|---|---|
| Sheet | `선물옵션 일중예상체결추이` |
| Menu | [국내선물옵션] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-futureoption/v1/quotations/exp-price-trend` |
| TR_ID (실전) | `FHPIF05110100` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 종목번호 (지수선물:6자리, 지수옵션 9자리) |
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | F : 지수선물, O : 지수옵션 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object | Y |  |  |
| `hts_kor_isnm` | 영업 시간 | string | Y | 40 |  |
| `futs_antc_cnpr` | 업종 지수 현재가 | string | Y | 112 |  |
| `antc_cntg_vrss_sign` | 업종 지수 전일 대비 | string | Y | 1 |  |
| `futs_antc_cntg_vrss` | 전일 대비 부호 | string | Y | 112 |  |
| `antc_cntg_prdy_ctrt` | 업종 지수 전일 대비율 | string | Y | 82 |  |
| `futs_sdpr` | 누적 거래 대금 | string | Y | 112 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `stck_cntg_hour` | 주식체결시간 | string | Y | 6 |  |
| `futs_antc_cnpr` | 선물예상체결가 | string | Y | 112 |  |
| `antc_cntg_vrss_sign` | 예상체결대비부호 | string | Y | 1 |  |
| `futs_antc_cntg_vrss` | 선물예상체결대비 | string | Y | 112 |  |
| `antc_cntg_prdy_ctrt` | 예상체결전일대비율 | string | Y | 82 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:F  FID_INPUT_ISCD:101V06
```

**Response Example:**
```
{      "output1": {          "hts_kor_isnm": "F 202406",          "futs_antc_cnpr": "0.000",          "antc_cntg_vrss_sign": "0",          "futs_antc_cntg_vrss": "0.000",          "antc_cntg_prdy_ctrt": "0.00",          "futs_sdpr": "376.95"      },      "output2": [          {              "stck_cntg_hour": "084500",              "futs_antc_cnpr": "379.95",              "antc_cntg_vrss_sign": "2",              "futs_antc_cntg_vrss": "3.00",              "antc_cntg_prdy_ctrt": "0.80"          },          {              "stck_cntg_hour": "084459",              "futs_antc_cnpr": "379.95",              "antc_cntg_vrss_sign": "2",              "futs_antc_cntg_vrss": "3.00",              "antc_cntg_prdy_ctrt": "0.80"          },          {              "stck_cntg_hour": "084459",              "futs_antc_cnpr": "379.95",              "antc_cntg_vrss_sign": "2",              "futs_antc_cntg_vrss": "3.00",              "antc_cntg_prdy_ctrt": "0.80"          },          {              "stck_cntg_hour": "084459",              "futs_antc_cnpr": "379.95",              "antc_cntg_vrss_sign": "2",              "futs_antc_cntg_vrss": "3.00",              "antc_cntg_prdy_ctrt": "0.80"          },          {              "stck_cntg_hour": "084459",              "futs_antc_cnpr": "379.95",              "antc_cntg_vrss_sign": "2",              "futs_antc_cntg_vrss": "3.00",              "antc_cntg_prdy_ctrt": "0.80"          },          {              "stck_cntg_hour": "084459",              "futs_antc_cnpr": "379.95",              "antc_cntg_vrss_sign": "2",              "futs_antc_cntg_vrss": "3.00",              "antc_cntg_prdy_ctrt": "0.80"          },          {              "stck_cntg_hour": "084459",              "futs_antc_cnpr": "379.95",              "antc_cntg_vrss_sign": "2",              "futs_antc_cntg_vrss": "3.00",              "antc_cntg_prdy_ctrt": "0.80"          },          {              "stck_cntg_hour": "084459",              "futs_antc_cnpr": "379.95",              "antc_cntg_vrss_sign": "2",              "futs_antc_cntg_vrss": "3.00",              "antc_cntg_prdy_ctrt": "0.80"          },          {              "stck_cntg_hour": "084459",              "futs_antc_cnpr": "379.95",              "antc_cntg_vrss_sign": "2",              "futs_antc_cntg_vrss": "3.00",              "antc_cntg_prdy_ctrt": "0.80"          },          {              "stck_cntg_hour": "084459",              "futs_antc_cnpr": "379.95",              "antc_cntg_vrss_sign": "2",              "futs_antc_cntg_vrss": "3.00",              "antc_cntg_prdy_ctrt": "0.80"          },          {              "stck_cntg_hour": "084459",              "futs_antc_cnpr": "379.95",              "antc_cntg_vrss_sign": "2",              "futs_antc_cntg_vrss": "3.00",              "antc_cntg_prdy_ctrt": "0.80"          },          {              "stck_cntg_hour": "084459",              "futs_antc_cnpr": "380.00",              "antc_cntg_vrss_sign": "2",              "futs_antc_cntg_vrss":
```

---
### 19. 선물옵션기간별시세(일_주_월_년)

| Field | Value |
|---|---|
| Sheet | `선물옵션기간별시세(일_주_월_년)` |
| Menu | [국내선물옵션] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-futureoption/v1/quotations/inquire-daily-fuopchartprice` |
| TR_ID (실전) | `FHKIF03020100` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | FID 조건 시장 분류 코드 | string | Y | 2 | F: 지수선물, O:지수옵션  JF: 주식선물, JO:주식옵션,  CF: 상품선물(금), 금리선물(국채), 통화선물(달러)  CM: 야간선물, EU: 야간옵션 |
| `FID_INPUT_ISCD` | 종목코드 | string | Y | 12 | 종목번호 (지수선물:6자리, 지수옵션 9자리) |
| `FID_INPUT_DATE_1` | 조회 시작일자 | string | Y | 10 | 조회 시작일자 (ex. 20220401) |
| `FID_INPUT_DATE_2` | 조회 종료일자 | string | Y | 10 | 조회 종료일자 (ex. 20220524)    ※ 주(W), 월(M), 년(Y) 봉 조회 시에 아래 참고  ㅁ FID_INPUT_DATE_2 가 현재일 까지일때  . 주봉 조회 : 해당 주의 첫번째 영업일이 포함되어야함  . 월봉 조회 : 해당 월의 전월 일자로 시작되어야함  . 년봉 조회 : 해당 년의 전년도 일자로 시작되어야함  ㅁ FID_INPUT_DATE_2 가 현재일보다 이전일 때  . 주봉 조회 : 해당 주의 첫번째 영업일이 포함되어야함  . 월봉 조회 : 해당 월의 영업일이 포함되어야함  . 년봉 조회 : 해당 년의 영업일이 포함되어야함 |
| `FID_PERIOD_DIV_CODE` | 기간분류코드 | string | Y | 32 | D:일봉 W:주봉, M:월봉, Y:년봉 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 | 0 : 성공   0 이외의 값 : 실패 |
| `msg_cd` | 응답코드 | string | Y | 8 | 응답코드 |
| `msg1` | 응답메세지 | string | Y | 80 | 응답메세지 |
| `output1` | 상세기본정보 | object | Y | 1 | 상세기본정보 |
| `-futs_prdy_vrss` | 전일 대비 | string | Y | 14 | 전일 대비 |
| `-prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 | 전일 대비 부호 |
| `-futs_prdy_ctrt` | 선물 전일 대비율 | string | Y | 11 | 선물 전일 대비율 |
| `-futs_prdy_clpr` | 선물 전일 종가 | string | Y | 14 | 선물 전일 종가 |
| `-acml_vol` | 누적 거래량 | string | Y | 18 | 누적 거래량 |
| `-acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 | 누적 거래 대금 |
| `-hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 | HTS 한글 종목명 |
| `-futs_prpr` | 현재가 | string | Y | 14 | 현재가 |
| `-futs_shrn_iscd` | 단축 종목코드 | string | Y | 9 | 단축 종목코드 |
| `-prdy_vol` | 전일 거래량 | string | Y | 18 | 전일 거래량 |
| `-futs_mxpr` | 상한가 | string | Y | 14 | 상한가 |
| `-futs_llam` | 하한가 | string | Y | 14 | 하한가 |
| `-futs_oprc` | 시가 | string | Y | 14 | 시가 |
| `-futs_hgpr` | 최고가 | string | Y | 14 | 최고가 |
| `-futs_lwpr` | 최저가 | string | Y | 14 | 최저가 |
| `-futs_prdy_oprc` | 전일 시가 | string | Y | 14 | 전일 시가 |
| `-futs_prdy_hgpr` | 전일 최고가 | string | Y | 14 | 전일 최고가 |
| `-futs_prdy_lwpr` | 전일 최저가 | string | Y | 14 | 전일 최저가 |
| `-futs_askp` | 매도호가 | string | Y | 14 | 매도호가 |
| `-futs_bidp` | 매수호가 | string | Y | 14 | 매수호가 |
| `-basis` | 베이시스 | string | Y | 12 | 베이시스 |
| `-kospi200_nmix` | KOSPI200 지수 | string | Y | 14 | KOSPI200 지수 |
| `-kospi200_prdy_vrss` | KOSPI200 전일 대비 | string | Y | 14 | KOSPI200 전일 대비 |
| `-kospi200_prdy_ctrt` | KOSPI200 전일 대비율 | string | Y | 11 | KOSPI200 전일 대비율 |
| `-kospi200_prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 | 전일 대비 부호 |
| `-hts_otst_stpl_qty` | HTS 미결제 약정 수량 | string | Y | 18 | HTS 미결제 약정 수량 |
| `-otst_stpl_qty_icdc` | 미결제 약정 수량 증감 | string | Y | 10 | 미결제 약정 수량 증감 |
| `-tday_rltv` | 당일 체결강도 | string | Y | 14 | 당일 체결강도 |
| `-hts_thpr` | HTS 이론가 | string | Y | 14 | HTS 이론가 |
| `-dprt` | 괴리율 | string | Y | 11 | 괴리율 |
| `output2` | 기간별 조회데이터 (배열) | array | Y | 1 | 기간별 조회데이터 (배열) |
| `-stck_bsop_date` | 영업 일자 | string | Y | 8 | 영업 일자 |
| `-futs_prpr` | 현재가 | string | Y | 14 | 현재가 |
| `-futs_oprc` | 시가 | string | Y | 14 | 시가 |
| `-futs_hgpr` | 최고가 | string | Y | 14 | 최고가 |
| `-futs_lwpr` | 최저가 | string | Y | 14 | 최저가 |
| `-acml_vol` | 누적 거래량 | string | Y | 18 | 누적 거래량 |
| `-acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 | 누적 거래 대금 |
| `-mod_yn` | 변경 여부 | string | Y | 1 | 변경 여부 |

**Request Example:**
```
"input": {              "fid_cond_mrkt_div_code": "F",              "fid_input_date_1": "20220401",              "fid_input_date_2": "20220524",              "fid_input_iscd": "101S06",              "fid_period_div_code": "D"          }
```

**Response Example:**
```
"output1": {              "acml_tr_pbmn": "15491417875",              "acml_vol": "178446",              "basis": "0.28",              "dprt": "-0.14",              "futs_askp": "344.70",              "futs_bidp": "344.65",              "futs_hgpr": "349.75",              "futs_llam": "322.65",              "futs_lwpr": "344.65",              "futs_mxpr": "378.75",              "futs_oprc": "348.85",              "futs_prdy_clpr": "350.70",              "futs_prdy_ctrt": "-1.71",              "futs_prdy_hgpr": "351.85",              "futs_prdy_lwpr": "348.65",              "futs_prdy_oprc": "351.55",              "futs_prdy_vrss": "-6.00",              "futs_prpr": "344.70",              "futs_shrn_iscd": "101S06",              "hts_kor_isnm": "F 202206",              "hts_otst_stpl_qty": "297901",              "hts_thpr": "345.17",              "kospi200_nmix": "344.89",              "otst_stpl_qty_icdc": "4348",              "prdy_vol": "222987",              "prdy_vrss_sign": "5",              "tday_rltv": "92.20"          },          "output2": [              {                  "acml_tr_pbmn": "15491417875",                  "acml_vol": "178446",                  "futs_hgpr": "349.75",                  "futs_lwpr": "344.65",                  "futs_oprc": "348.85",                  "futs_prpr": "344.70",                  "mod_yn": "N",                  "stck_bsop_date": "20220524"              },  ....
```

---
### 20. 국내옵션전광판_선물

| Field | Value |
|---|---|
| Sheet | `국내옵션전광판_선물` |
| Menu | [국내선물옵션] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-futureoption/v1/quotations/display-board-futures` |
| TR_ID (실전) | `FHPIF05030200` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (F: 선물) |
| `FID_COND_SCR_DIV_CODE` | 조건 화면 분류 코드 | string | Y | 5 | Unique key(20503) |
| `FID_COND_MRKT_CLS_CODE` | 조건 시장 구분 코드 | string | Y | 6 | 공백: KOSPI200  MKI: 미니KOSPI200  WKM: KOSPI200위클리(월)  WKI: KOSPI200위클리(목)  KQI: KOSDAQ150 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `futs_shrn_iscd` | 선물 단축 종목코드 | string | Y | 9 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `futs_prpr` | 선물 현재가 | string | Y | 112 |  |
| `futs_prdy_vrss` | 선물 전일 대비 | string | Y | 112 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `futs_prdy_ctrt` | 선물 전일 대비율 | string | Y | 82 |  |
| `hts_thpr` | HTS 이론가 | string | Y | 112 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `futs_askp` | 선물 매도호가 | string | Y | 112 |  |
| `futs_bidp` | 선물 매수호가 | string | Y | 112 |  |
| `hts_otst_stpl_qty` | HTS 미결제 약정 수량 | string | Y | 18 |  |
| `futs_hgpr` | 선물 최고가 | string | Y | 112 |  |
| `futs_lwpr` | 선물 최저가 | string | Y | 112 |  |
| `hts_rmnn_dynu` | HTS 잔존 일수 | string | Y | 5 |  |
| `total_askp_rsqn` | 총 매도호가 잔량 | string | Y | 12 |  |
| `total_bidp_rsqn` | 총 매수호가 잔량 | string | Y | 12 |  |
| `futs_antc_cnpr` | 선물예상체결가 | string | Y | 112 |  |
| `futs_antc_cntg_vrss` | 선물예상체결대비 | string | Y | 112 |  |
| `antc_cntg_vrss_sign` | 예상 체결 대비 부호 | string | Y | 1 |  |
| `antc_cntg_prdy_ctrt` | 예상 체결 전일 대비율 | string | Y | 82 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:F  FID_COND_SCR_DIV_CODE:20503  FID_COND_MRKT_CLS_CODE:MKI
```

**Response Example:**
```
{      "output": [          {              "futs_shrn_iscd": "105V05",              "hts_kor_isnm": "미니F 202405",              "futs_prpr": "368.28",              "futs_prdy_vrss": "-3.32",              "prdy_vrss_sign": "5",              "futs_prdy_ctrt": "-0.89",              "hts_thpr": "368.26",              "acml_vol": "91624",              "futs_askp": "368.28",              "futs_bidp": "368.26",              "hts_otst_stpl_qty": "38188",              "futs_hgpr": "372.86",              "futs_lwpr": "367.40",              "hts_rmnn_dynu": "28",              "total_askp_rsqn": "934",              "total_bidp_rsqn": "282",              "futs_antc_cnpr": "0.00",              "futs_antc_cntg_vrss": "0.00",              "antc_cntg_vrss_sign": "0",              "antc_cntg_prdy_ctrt": "0.00"          },          {              "futs_shrn_iscd": "105V06",              "hts_kor_isnm": "미니F 202406",              "futs_prpr": "369.48",              "futs_prdy_vrss": "-3.32",              "prdy_vrss_sign": "5",              "futs_prdy_ctrt": "-0.89",              "hts_thpr": "369.51",              "acml_vol": "621",              "futs_askp": "369.54",              "futs_bidp": "369.48",              "hts_otst_stpl_qty": "3433",              "futs_hgpr": "374.16",              "futs_lwpr": "368.64",              "hts_rmnn_dynu": "63",              "total_askp_rsqn": "68",              "total_bidp_rsqn": "53",              "futs_antc_cnpr": "0.00",              "futs_antc_cntg_vrss": "0.00",              "antc_cntg_vrss_sign": "0",              "antc_cntg_prdy_ctrt": "0.00"          },          {              "futs_shrn_iscd": "105V07",              "hts_kor_isnm": "미니F 202407",              "futs_prpr": "369.00",              "futs_prdy_vrss": "-3.98",              "prdy_vrss_sign": "5",              "futs_prdy_ctrt": "-1.07",              "hts_thpr": "369.43",              "acml_vol": "19",              "futs_askp": "370.24",              "futs_bidp": "367.52",              "hts_otst_stpl_qty": "31",              "futs_hgpr": "372.00",              "futs_lwpr": "369.00",              "hts_rmnn_dynu": "91",              "total_askp_rsqn": "257",              "total_bidp_rsqn": "13",              "futs_antc_cnpr": "0.00",              "futs_antc_cntg_vrss": "0.00",              "antc_cntg_vrss_sign": "0",              "antc_cntg_prdy_ctrt": "0.00"          },          {              "futs_shrn_iscd": "105V08",              "hts_kor_isnm": "미니F 202408",              "futs_prpr": "373.78",              "futs_prdy_vrss": "0.00",              "prdy_vrss_sign": "3",              "futs_prdy_ctrt": "0.00",              "hts_thpr": "370.41",              "acml_vol": "0",              "futs_askp": "403.58",              "futs_bidp": "344.00",              "hts_otst_stpl_qty": "1",              "futs_hgpr": "0.00",              "futs_lwpr": "0.00",              "hts_rmnn_dynu": "119",              "total_askp_rsqn": "4",              "total_bidp_rsqn": "5",      
```

---
### 21. 선물옵션 분봉조회

| Field | Value |
|---|---|
| Sheet | `선물옵션 분봉조회` |
| Menu | [국내선물옵션] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-futureoption/v1/quotations/inquire-time-fuopchartprice` |
| TR_ID (실전) | `FHKIF03020200` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | FID 조건 시장 분류 코드 | string | Y | 2 | F: 지수선물, O:지수옵션  JF: 주식선물, JO:주식옵션,  CF: 상품선물(금), 금리선물(국채), 통화선물(달러)  CM: 야간선물, EU: 야간옵션 |
| `FID_INPUT_ISCD` | FID 입력 종목코드 | string | Y | 12 | 종목번호 (지수선물:6자리, 지수옵션 9자리) |
| `FID_HOUR_CLS_CODE` | FID 시간 구분 코드 | string | Y | 5 | FID 시간 구분 코드(30: 30초, 60: 1분, 3600: 1시간) |
| `FID_PW_DATA_INCU_YN` | FID 과거 데이터 포함 여부 | string | Y | 2 | Y(과거) / N (당일) |
| `FID_FAKE_TICK_INCU_YN` | FID 허봉 포함 여부 | string | Y | 2 | N으로 입력 |
| `FID_INPUT_DATE_1` | FID 입력 날짜1 | string | Y | 10 | 입력 날짜 기준으로 이전 기간 조회(YYYYMMDD)  ex) 20230908 입력 시, 2023년 9월 8일부터 일자 역순으로 조회 |
| `FID_INPUT_HOUR_1` | FID 입력 시간1 | string | Y | 10 | 입력 시간 기준으로 이전 시간 조회(HHMMSS)  ex) 093000 입력 시, 오전 9시 30분부터 역순으로 분봉 조회    * CM(야간선물), EU(야간옵션)인 경우, 자정 이후 시간은 +24시간으로 입력  ex) 253000 입력 시, 새벽 1시 30분부터 역순으로 분봉 조회 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `Output1` | 응답상세 | object array | Y |  |  |
| `futs_prdy_vrss` | 선물 전일 대비 | string | Y | 11 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `futs_prdy_ctrt` | 선물 전일 대비율 | string | Y | 8 |  |
| `futs_prdy_clpr` | 선물 전일 종가 | string | Y | 11 |  |
| `prdy_nmix` | 전일 지수 | string | Y | 11 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 |  |
| `futs_prpr` | 선물 현재가 | string | Y | 11 |  |
| `futs_shrn_iscd` | 선물 단축 종목코드 | string | Y | 9 |  |
| `prdy_vol` | 전일 거래량 | string | Y | 18 |  |
| `futs_mxpr` | 선물 상한가 | string | Y | 11 |  |
| `futs_llam` | 선물 하한가 | string | Y | 11 |  |
| `futs_oprc` | 선물 시가2 | string | Y | 11 |  |
| `futs_hgpr` | 선물 최고가 | string | Y | 11 |  |
| `futs_lwpr` | 선물 최저가 | string | Y | 11 |  |
| `futs_prdy_oprc` | 선물 전일 시가 | string | Y | 11 |  |
| `futs_prdy_hgpr` | 선물 전일 최고가 | string | Y | 11 |  |
| `futs_prdy_lwpr` | 선물 전일 최저가 | string | Y | 11 |  |
| `futs_askp` | 선물 매도호가 | string | Y | 11 |  |
| `futs_bidp` | 선물 매수호가 | string | Y | 11 |  |
| `basis` | 베이시스 | string | Y | 8 |  |
| `kospi200_nmix` | KOSPI200 지수 | string | Y | 11 |  |
| `kospi200_prdy_vrss` | KOSPI200 전일 대비 | string | Y | 18 |  |
| `kospi200_prdy_ctrt` | KOSPI200 전일 대비율 | string | Y | 8 |  |
| `kospi200_prdy_vrss_sign` | KOSPI200 전일 대비 부호 | string | Y | 1 |  |
| `hts_otst_stpl_qty` | HTS 미결제 약정 수량 | string | Y | 18 |  |
| `otst_stpl_qty_icdc` | 미결제 약정 수량 증감 | string | Y | 10 |  |
| `tday_rltv` | 당일 체결강도 | string | Y | 11 |  |
| `hts_thpr` | HTS 이론가 | string | Y | 11 |  |
| `dprt` | 괴리율 | string | Y | 8 |  |
| `Output2` | 응답상세2 | object | Y |  | array |
| `stck_bsop_date` | 주식 영업 일자 | string | Y | 8 |  |
| `stck_cntg_hour` | 주식 체결 시간 | string | Y | 6 | CM(야간선물), EU(야간옵션)인 경우, 자정 이후 시간은 +24시간으로 표시  ex) "260000"인 경우, 오전 4시를 의미 |
| `futs_prpr` | 선물 현재가 | string | Y | 11 |  |
| `futs_oprc` | 선물 시가2 | string | Y | 11 |  |
| `futs_hgpr` | 선물 최고가 | string | Y | 11 |  |
| `futs_lwpr` | 선물 최저가 | string | Y | 11 |  |
| `cntg_vol` | 체결 거래량 | string | Y | 18 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |

**Request Example:**
```
fid_cond_mrkt_div_code:F  fid_input_iscd:101V09  fid_hour_cls_code:30  fid_pw_data_incu_yn:N  fid_fake_tick_incu_yn:Y  fid_input_date_1:  fid_input_hour_1:
```

**Response Example:**
```
{      "output1": {          "futs_prdy_vrss": "-0.30",          "prdy_vrss_sign": "5",          "futs_prdy_ctrt": "-0.08",          "futs_prdy_clpr": "359.90",          "prdy_nmix": "359.90",          "acml_vol": "349",          "acml_tr_pbmn": "31394925",          "hts_kor_isnm": "F 202409",          "futs_prpr": "359.60",          "futs_shrn_iscd": "101V09",          "prdy_vol": "721",          "futs_mxpr": "388.65",          "futs_llam": "331.15",          "futs_oprc": "361.50",          "futs_hgpr": "362.00",          "futs_lwpr": "357.20",          "futs_prdy_oprc": "364.95",          "futs_prdy_hgpr": "365.30",          "futs_prdy_lwpr": "358.60",          "futs_askp": "359.65",          "futs_bidp": "359.50",          "basis": "4.06",          "kospi200_nmix": "356.42",          "hts_otst_stpl_qty": "11529",          "otst_stpl_qty_icdc": "0",          "tday_rltv": "78.97",          "hts_thpr": "360.48",          "dprt": "-0.25"      },      "output2": [          {              "stck_bsop_date": "20240417",              "stck_cntg_hour": "141500",              "futs_prpr": "359.60",              "futs_oprc": "359.60",              "futs_hgpr": "359.60",              "futs_lwpr": "359.60",              "cntg_vol": "0",              "acml_tr_pbmn": "31394925"          },          {              "stck_bsop_date": "20240417",              "stck_cntg_hour": "141430",              "futs_prpr": "359.60",              "futs_oprc": "359.60",              "futs_hgpr": "359.60",              "futs_lwpr": "359.60",              "cntg_vol": "0",              "acml_tr_pbmn": "31394925"          },          {              "stck_bsop_date": "20240417",              "stck_cntg_hour": "141400",              "futs_prpr": "359.60",              "futs_oprc": "359.60",              "futs_hgpr": "359.60",              "futs_lwpr": "359.60",              "cntg_vol": "0",              "acml_tr_pbmn": "31394925"          },          {              "stck_bsop_date": "20240417",              "stck_cntg_hour": "141330",              "futs_prpr": "359.60",              "futs_oprc": "359.60",              "futs_hgpr": "359.60",              "futs_lwpr": "359.60",              "cntg_vol": "0",              "acml_tr_pbmn": "31394925"          },...      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 22. 국내옵션전광판_옵션월물리스트

| Field | Value |
|---|---|
| Sheet | `국내옵션전광판_옵션월물리스트` |
| Menu | [국내선물옵션] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-futureoption/v1/quotations/display-board-option-list` |
| TR_ID (실전) | `FHPIO056104C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_SCR_DIV_CODE` | 조건 화면 분류 코드 | string | Y | 5 | Unique key(509) |
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | 공백 |
| `FID_COND_MRKT_CLS_CODE` | 조건 시장 구분 코드 | string | Y | 6 | 공백 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `mtrt_yymm_code` | 만기 년월 코드 | string | Y | 6 |  |
| `mtrt_yymm` | 만기 년월 | string | Y | 6 |  |

**Request Example:**
```
fid_cond_scr_div_code:509  fid_cond_mrkt_div_code:  fid_cond_mrkt_cls_code:
```

**Response Example:**
```
{      "output": [          {              "mtrt_yymm_code": "0V05",              "mtrt_yymm": "202405"          },          {              "mtrt_yymm_code": "0V06",              "mtrt_yymm": "202406"          },          {              "mtrt_yymm_code": "0V07",              "mtrt_yymm": "202407"          },          {              "mtrt_yymm_code": "0V08",              "mtrt_yymm": "202408"          },          {              "mtrt_yymm_code": "0V09",              "mtrt_yymm": "202409"          },          {              "mtrt_yymm_code": "0V10",              "mtrt_yymm": "202410"          },          {              "mtrt_yymm_code": "0V12",              "mtrt_yymm": "202412"          },          {              "mtrt_yymm_code": "0W03",              "mtrt_yymm": "202503"          },          {              "mtrt_yymm_code": "0W06",              "mtrt_yymm": "202506"          },          {              "mtrt_yymm_code": "0W12",              "mtrt_yymm": "202512"          },          {              "mtrt_yymm_code": "0612",              "mtrt_yymm": "202612"          }      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 23. 선물옵션 시세호가

| Field | Value |
|---|---|
| Sheet | `선물옵션 시세호가` |
| Menu | [국내선물옵션] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-futureoption/v1/quotations/inquire-asking-price` |
| TR_ID (실전) | `FHMIF10010000` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | FID 조건 시장 분류 코드 | string | Y | 2 | F: 지수선물, O:지수옵션  JF: 주식선물, JO:주식옵션  CF: 상품선물(금), 금리선물(국채), 통화선물(달러)  CM: 야간선물, EU: 야간옵션 |
| `FID_INPUT_ISCD` | FID 입력 종목코드 | string | Y | 12 | 종목코드 (예: 101S03) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 | 0 : 성공  0 이외의 값 : 실패 |
| `msg_cd` | 응답코드 | string | Y | 8 | 응답코드 |
| `msg1` | 응답메세지 | string | Y | 80 | 응답메세지 |
| `output1` | 응답상세1 | object | Y |  |  |
| `hts_kor_isnm` | HTS 한글 종목명 | string | Y | 40 | 종목명 |
| `futs_prpr` | 선물 현재가 | string | Y | 14 | 선물의 현재가격 |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 | 1 : 상한   2 : 상승  3 : 보합  4 : 하한  5 : 하락 |
| `futs_prdy_vrss` | 선물 전일 대비 | string | Y | 14 | 선물의 전일 종가와 당일 현재가의 차이 (당일 현재가-전일 종가) |
| `futs_prdy_ctrt` | 선물 전일 대비율 | string | Y | 11 | 선물 전일 대비 / 당일 현재가 * 100 |
| `acml_vol` | 누적 거래량 | string | Y | 18 | 당일 조회시점까지 전체 거래량 |
| `futs_prdy_clpr` | 선물 전일 종가 | string | Y | 14 | 해당 선물 종목의 전일 종가 |
| `futs_shrn_iscd` | 선물 단축 종목코드 | string | Y | 9 |  |
| `output2` | 응답상세2 | object array | Y |  | Array |
| `futs_askp1` | 선물 매도호가1 | string | Y | 14 | 해당 종목의 매도호가 중 1번째 낮은 호가 |
| `futs_askp2` | 선물 매도호가2 | string | Y | 14 | 해당 종목의 매도호가 중 2번째 낮은 호가 |
| `futs_askp3` | 선물 매도호가3 | string | Y | 14 | 해당 종목의 매도호가 중 3번째 낮은 호가 |
| `futs_askp4` | 선물 매도호가4 | string | Y | 14 | 해당 종목의 매도호가 중 4번째 낮은 호가 |
| `futs_askp5` | 선물 매도호가5 | string | Y | 14 | 해당 종목의 매도호가 중 5번째 낮은 호가 |
| `futs_bidp1` | 선물 매수호가1 | string | Y | 14 | 해당 종목의 매수호가 중 가장 높은 호가 |
| `futs_bidp2` | 선물 매수호가1 | string | Y | 14 | 해당 종목의 매수호가 중 2번째 높은 호가 |
| `futs_bidp3` | 선물 매수호가3 | string | Y | 14 | 해당 종목의 매수호가 중 3번째 높은 호가 |
| `futs_bidp4` | 선물 매수호가4 | string | Y | 14 | 해당 종목의 매수호가 중 4번째 높은 호가 |
| `futs_bidp5` | 선물 매수호가5 | string | Y | 14 | 해당 종목의 매수호가 중 5번째 높은 호가 |
| `askp_rsqn1` | 매도호가 잔량1 | string | Y | 12 | 매도호가 1의 미체결수량 |
| `askp_rsqn2` | 매도호가 잔량2 | string | Y | 12 | 매도호가 2의 미체결수량 |
| `askp_rsqn3` | 매도호가 잔량3 | string | Y | 12 | 매도호가 3의 미체결수량 |
| `askp_rsqn4` | 매도호가 잔량4 | string | Y | 12 | 매도호가 4의 미체결수량 |
| `askp_rsqn5` | 매도호가 잔량5 | string | Y | 12 | 매도호가 5의 미체결수량 |
| `bidp_rsqn1` | 매수호가 잔량1 | string | Y | 12 | 매수호가 1의 미체결수량 |
| `bidp_rsqn2` | 매수호가 잔량2 | string | Y | 12 | 매수호가 2의 미체결수량 |
| `bidp_rsqn3` | 매수호가 잔량3 | string | Y | 12 | 매수호가 3의 미체결수량 |
| `bidp_rsqn4` | 매수호가 잔량4 | string | Y | 12 | 매수호가 4의 미체결수량 |
| `bidp_rsqn5` | 매수호가 잔량5 | string | Y | 12 | 매수호가 5의 미체결수량 |
| `askp_csnu1` | 매도호가 건수1 | string | Y | 10 | 매도호가 1의 미체결 주문 건수 |
| `askp_csnu2` | 매도호가 건수2 | string | Y | 10 | 매도호가 2의 미체결 주문 건수 |
| `askp_csnu3` | 매도호가 건수3 | string | Y | 10 | 매도호가 3의 미체결 주문 건수 |
| `askp_csnu4` | 매도호가 건수4 | string | Y | 10 | 매도호가 4의 미체결 주문 건수 |
| `askp_csnu5` | 매도호가 건수5 | string | Y | 10 | 매도호가 5의 미체결 주문 건수 |
| `bidp_csnu1` | 매수호가 건수1 | string | Y | 10 | 매수호가 1의 미체결 주문 건수 |
| `bidp_csnu2` | 매수호가 건수2 | string | Y | 10 | 매수호가 2의 미체결 주문 건수 |
| `bidp_csnu3` | 매수호가 건수3 | string | Y | 10 | 매수호가 3의 미체결 주문 건수 |
| `bidp_csnu4` | 매수호가 건수4 | string | Y | 10 | 매수호가 4의 미체결 주문 건수 |
| `bidp_csnu5` | 매수호가 건수5 | string | Y | 10 | 매수호가 5의 미체결 주문 건수 |
| `total_askp_rsqn` | 총 매도호가 잔량 | string | Y | 12 | 매도호가 1~5의 잔량 합계 |
| `total_bidp_rsqn` | 총 매수호가 잔량 | string | Y | 12 | 매수호가 1~5의 잔량 합계 |
| `total_askp_csnu` | 총 매도호가 건수 | string | Y | 10 | 매도호가 1~5의 미체결 주문 건수 합계 |
| `total_bidp_csnu` | 총 매수호가 건수 | string | Y | 10 | 매수호가 1~5의 미체결 주문 건수 합계 |
| `aspr_acpt_hour` | 호가 접수 시간 | string | Y | 6 | 가장 최근 호가의 접수 시간 |

**Request Example:**
```
{  "fid_cond_mrkt_div_code" : "F",  "fid_input_iscd" : "101S06"  }
```

**Response Example:**
```
{    "output1": {      "hts_kor_isnm": "F 202206",      "futs_prpr": "364.40",      "prdy_vrss_sign": "2",      "futs_prdy_vrss": "3.00",      "futs_prdy_ctrt": "0.83",      "acml_vol": "193112",      "futs_prdy_clpr": "361.40",      "futs_shrn_iscd": "101S06"    },    "output2": {      "futs_askp1": "364.40",      "futs_askp2": "364.45",      "futs_askp3": "364.50",      "futs_askp4": "364.55",      "futs_askp5": "364.60",      "futs_bidp1": "364.35",      "futs_bidp2": "364.30",      "futs_bidp3": "364.25",      "futs_bidp4": "364.20",      "futs_bidp5": "364.15",      "askp_rsqn1": "35",      "askp_rsqn2": "47",      "askp_rsqn3": "32",      "askp_rsqn4": "56",      "askp_rsqn5": "88",      "bidp_rsqn1": "22",      "bidp_rsqn2": "70",      "bidp_rsqn3": "68",      "bidp_rsqn4": "97",      "bidp_rsqn5": "42",      "askp_csnu1": "9",      "askp_csnu2": "19",      "askp_csnu3": "21",      "askp_csnu4": "28",      "askp_csnu5": "20",      "bidp_csnu1": "9",      "bidp_csnu2": "45",      "bidp_csnu3": "26",      "bidp_csnu4": "31",      "bidp_csnu5": "22",      "total_askp_rsqn": "7140",      "total_bidp_rsqn": "9319",      "total_askp_csnu": "1091",      "total_bidp_csnu": "1115",      "aspr_acpt_hour": "153744"    },    "rt_cd": "0",    "msg_cd": "MCA00000",    "msg1": "정상처리 되었습니다."  }
```

---
### 24. 국내옵션전광판_콜풋

| Field | Value |
|---|---|
| Sheet | `국내옵션전광판_콜풋` |
| Menu | [국내선물옵션] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-futureoption/v1/quotations/display-board-callput` |
| TR_ID (실전) | `FHPIF05030100` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | 시장구분코드 (O: 옵션) |
| `FID_COND_SCR_DIV_CODE` | 조건 화면 분류 코드 | string | Y | 5 | Unique key(20503) |
| `FID_MRKT_CLS_CODE` | 시장 구분 코드 | string | Y | 2 | 시장구분코드 (CO: 콜옵션) |
| `FID_MTRT_CNT` | 만기 수 | string | Y | 11 | - FID_COND_MRKT_CLS_CODE : 공백(KOSPI200), MKI(미니KOSPI200), KQI(KOSDAQ150) 인 경우  : 만기년월(YYYYMM) 입력 (ex. 202407)    - FID_COND_MRKT_CLS_CODE : WKM(KOSPI200위클리(월)), WKI(KOSPI200위클리(목)) 인 경우  : 만기년월주차(YYMMWW) 입력  (ex. 2024년도 7월 3주차인 경우, 240703 입력) |
| `FID_COND_MRKT_CLS_CODE` | 조건 시장 구분 코드 | string | Y | 6 | 공백: KOSPI200  MKI: 미니KOSPI200  WKM: KOSPI200위클리(월)  WKI: KOSPI200위클리(목)  KQI: KOSDAQ150 |
| `FID_MRKT_CLS_CODE1` | 시장 구분 코드 | string | Y | 2 | 시장구분코드 (PO: 풋옵션) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `acpr` | 행사가 | string | Y | 112 |  |
| `unch_prpr` | 환산 현재가 | string | Y | 112 |  |
| `optn_shrn_iscd` | 옵션 단축 종목코드 | string | Y | 9 |  |
| `optn_prpr` | 옵션 현재가 | string | Y | 112 |  |
| `optn_prdy_vrss` | 옵션 전일 대비 | string | Y | 112 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `optn_prdy_ctrt` | 옵션 전일 대비율 | string | Y | 82 |  |
| `optn_bidp` | 옵션 매수호가 | string | Y | 112 |  |
| `optn_askp` | 옵션 매도호가 | string | Y | 112 |  |
| `tmvl_val` | 시간가치 값 | string | Y | 132 |  |
| `nmix_sdpr` | 지수 기준가 | string | Y | 112 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `seln_rsqn` | 매도 잔량 | string | Y | 12 |  |
| `shnu_rsqn` | 매수2 잔량 | string | Y | 12 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |
| `hts_otst_stpl_qty` | HTS 미결제 약정 수량 | string | Y | 18 |  |
| `otst_stpl_qty_icdc` | 미결제 약정 수량 증감 | string | Y | 10 |  |
| `delta_val` | 델타 값 | string | Y | 114 |  |
| `gama` | 감마 | string | Y | 84 |  |
| `vega` | 베가 | string | Y | 84 |  |
| `theta` | 세타 | string | Y | 84 |  |
| `rho` | 로우 | string | Y | 84 |  |
| `hts_ints_vltl` | HTS 내재 변동성 | string | Y | 114 |  |
| `invl_val` | 내재가치 값 | string | Y | 132 |  |
| `esdg` | 괴리도 | string | Y | 114 |  |
| `dprt` | 괴리율 | string | Y | 82 |  |
| `hist_vltl` | 역사적 변동성 | string | Y | 114 |  |
| `hts_thpr` | HTS 이론가 | string | Y | 112 |  |
| `optn_oprc` | 옵션 시가2 | string | Y | 112 |  |
| `optn_hgpr` | 옵션 최고가 | string | Y | 112 |  |
| `optn_lwpr` | 옵션 최저가 | string | Y | 112 |  |
| `optn_mxpr` | 옵션 상한가 | string | Y | 112 |  |
| `optn_llam` | 옵션 하한가 | string | Y | 112 |  |
| `atm_cls_name` | ATM 구분 명 | string | Y | 10 |  |
| `rgbf_vrss_icdc` | 직전 대비 증감 | string | Y | 10 |  |
| `total_askp_rsqn` | 총 매도호가 잔량 | string | Y | 12 |  |
| `total_bidp_rsqn` | 총 매수호가 잔량 | string | Y | 12 |  |
| `futs_antc_cnpr` | 선물예상체결가 | string | Y | 112 |  |
| `futs_antc_cntg_vrss` | 선물예상체결대비 | string | Y | 112 |  |
| `antc_cntg_vrss_sign` | 예상 체결 대비 부호 | string | Y | 1 |  |
| `antc_cntg_prdy_ctrt` | 예상 체결 전일 대비율 | string | Y | 82 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `acpr` | 행사가 | string | Y | 112 |  |
| `unch_prpr` | 환산 현재가 | string | Y | 112 |  |
| `optn_shrn_iscd` | 옵션 단축 종목코드 | string | Y | 9 |  |
| `optn_prpr` | 옵션 현재가 | string | Y | 112 |  |
| `optn_prdy_vrss` | 옵션 전일 대비 | string | Y | 112 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `optn_prdy_ctrt` | 옵션 전일 대비율 | string | Y | 82 |  |
| `optn_bidp` | 옵션 매수호가 | string | Y | 112 |  |
| `optn_askp` | 옵션 매도호가 | string | Y | 112 |  |
| `tmvl_val` | 시간가치 값 | string | Y | 132 |  |
| `nmix_sdpr` | 지수 기준가 | string | Y | 112 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |
| `seln_rsqn` | 매도 잔량 | string | Y | 12 |  |
| `shnu_rsqn` | 매수2 잔량 | string | Y | 12 |  |
| `acml_tr_pbmn` | 누적 거래 대금 | string | Y | 18 |  |
| `hts_otst_stpl_qty` | HTS 미결제 약정 수량 | string | Y | 18 |  |
| `otst_stpl_qty_icdc` | 미결제 약정 수량 증감 | string | Y | 10 |  |
| `delta_val` | 델타 값 | string | Y | 114 |  |
| `gama` | 감마 | string | Y | 84 |  |
| `vega` | 베가 | string | Y | 84 |  |
| `theta` | 세타 | string | Y | 84 |  |
| `rho` | 로우 | string | Y | 84 |  |
| `hts_ints_vltl` | HTS 내재 변동성 | string | Y | 114 |  |
| `invl_val` | 내재가치 값 | string | Y | 132 |  |
| `esdg` | 괴리도 | string | Y | 114 |  |
| `dprt` | 괴리율 | string | Y | 82 |  |
| `hist_vltl` | 역사적 변동성 | string | Y | 114 |  |
| `hts_thpr` | HTS 이론가 | string | Y | 112 |  |
| `optn_oprc` | 옵션 시가2 | string | Y | 112 |  |
| `optn_hgpr` | 옵션 최고가 | string | Y | 112 |  |
| `optn_lwpr` | 옵션 최저가 | string | Y | 112 |  |
| `optn_mxpr` | 옵션 상한가 | string | Y | 112 |  |
| `optn_llam` | 옵션 하한가 | string | Y | 112 |  |
| `atm_cls_name` | ATM 구분 명 | string | Y | 10 |  |
| `rgbf_vrss_icdc` | 직전 대비 증감 | string | Y | 10 |  |
| `total_askp_rsqn` | 총 매도호가 잔량 | string | Y | 12 |  |
| `total_bidp_rsqn` | 총 매수호가 잔량 | string | Y | 12 |  |
| `futs_antc_cnpr` | 선물예상체결가 | string | Y | 112 |  |
| `futs_antc_cntg_vrss` | 선물예상체결대비 | string | Y | 112 |  |
| `antc_cntg_vrss_sign` | 예상 체결 대비 부호 | string | Y | 1 |  |
| `antc_cntg_prdy_ctrt` | 예상 체결 전일 대비율 | string | Y | 82 |  |

**Request Example:**
```
fid_cond_mrkt_div_code:O  fid_cond_scr_div_code:20503  fid_mrkt_cls_code:CO  fid_mtrt_cnt:202405  fid_cond_mrkt_cls_code:  fid_mrkt_cls_code1:PO
```

**Response Example:**
```
{      "output1": [          {              "acpr": "480.00",              "unch_prpr": "3505.17",              "optn_shrn_iscd": "201V05480",              "optn_prpr": "0.01",              "optn_prdy_vrss": "0.00",              "prdy_vrss_sign": "3",              "optn_prdy_ctrt": "0.00",              "optn_bidp": "0.00",              "optn_askp": "0.01",              "tmvl_val": "0.01",              "nmix_sdpr": "0.01",              "acml_vol": "34",              "seln_rsqn": "1710",              "shnu_rsqn": "0",              "acml_tr_pbmn": "85",              "hts_otst_stpl_qty": "642",              "otst_stpl_qty_icdc": "39",              "delta_val": "0.0000",              "gama": "0.0000",              "vega": "0.0000",              "theta": "-0.0000",              "rho": "0.0000",              "hts_ints_vltl": "31.5614",              "invl_val": "0.00",              "esdg": "0.01",              "dprt": "9999.99",              "hist_vltl": "16.9285",              "hts_thpr": "0.00",              "optn_oprc": "0.01",              "optn_hgpr": "0.01",              "optn_lwpr": "0.01",              "optn_mxpr": "5.20",              "optn_llam": "0.01",              "atm_cls_name": "OTM",              "rgbf_vrss_icdc": "1",              "total_askp_rsqn": "1710",              "total_bidp_rsqn": "0",              "futs_antc_cnpr": "0.00",              "futs_antc_cntg_vrss": "0.00",              "antc_cntg_vrss_sign": "0",              "antc_cntg_prdy_ctrt": "0.00"          },  		...      ],      "output2": [          {              "acpr": "480.00",              "unch_prpr": "3505.17",              "optn_shrn_iscd": "301V05480",              "optn_prpr": "108.45",              "optn_prdy_vrss": "0.00",              "prdy_vrss_sign": "3",              "optn_prdy_ctrt": "0.00",              "optn_bidp": "78.35",              "optn_askp": "142.60",              "tmvl_val": "-4.30",              "nmix_sdpr": "108.45",              "acml_vol": "0",              "seln_rsqn": "10",              "shnu_rsqn": "10",              "acml_tr_pbmn": "0",              "hts_otst_stpl_qty": "48",              "otst_stpl_qty_icdc": "0",              "delta_val": "-1.0000",              "gama": "0.0000",              "vega": "0.0000",              "theta": "0.0460",              "rho": "-0.3541",              "hts_ints_vltl": "0.0000",              "invl_val": "112.75",              "esdg": "-3.06",              "dprt": "-2.74",              "hist_vltl": "16.9285",              "hts_thpr": "111.51",              "optn_oprc": "0.00",              "optn_hgpr": "0.00",              "optn_lwpr": "0.00",              "optn_mxpr": "142.60",              "optn_llam": "78.35",              "atm_cls_name": "ITM",              "rgbf_vrss_icdc": "0",              "total_askp_rsqn": "10",              "total_bidp_rsqn": "10",              "futs_antc_cnpr": "0.00",              "futs_antc_cntg_vrss": "0.00",              "antc_cntg_vrss_sign": "0",              "antc_cntg_prdy
```

---
### 25. 주식옵션 실시간호가

| Field | Value |
|---|---|
| Sheet | `주식옵션 실시간호가` |
| Menu | [국내선물옵션] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0ZOASP0` |
| TR_ID (실전) | `H0ZOASP0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | "1: 등록, 2:해제" |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 7 | H0ZOASP0 |
| `tr_key` | 종목코드 | string | Y | 6 | 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `OPTN_SHRN_ISCD` | 옵션단축종목코드 | object | Y | 9 | '각 항목사이에는 구분자로 ^ 사용,  모든 데이터타입은 String으로 변환되어 push 처리됨' |
| `BSOP_HOUR` | 영업시간 | string | Y | 6 |  |
| `OPTN_ASKP1` | 옵션매도호가1 | string | Y | 8 |  |
| `OPTN_ASKP2` | 옵션매도호가2 | string | Y | 8 |  |
| `OPTN_ASKP3` | 옵션매도호가3 | string | Y | 8 |  |
| `OPTN_ASKP4` | 옵션매도호가4 | string | Y | 8 |  |
| `OPTN_ASKP5` | 옵션매도호가5 | string | Y | 8 |  |
| `OPTN_BIDP1` | 옵션매수호가1 | string | Y | 8 |  |
| `OPTN_BIDP2` | 옵션매수호가2 | string | Y | 8 |  |
| `OPTN_BIDP3` | 옵션매수호가3 | string | Y | 8 |  |
| `OPTN_BIDP4` | 옵션매수호가4 | string | Y | 8 |  |
| `OPTN_BIDP5` | 옵션매수호가5 | string | Y | 8 |  |
| `ASKP_CSNU1` | 매도호가건수1 | string | Y | 4 |  |
| `ASKP_CSNU2` | 매도호가건수2 | string | Y | 4 |  |
| `ASKP_CSNU3` | 매도호가건수3 | string | Y | 4 |  |
| `ASKP_CSNU4` | 매도호가건수4 | string | Y | 4 |  |
| `ASKP_CSNU5` | 매도호가건수5 | string | Y | 4 |  |
| `BIDP_CSNU1` | 매수호가건수1 | string | Y | 4 |  |
| `BIDP_CSNU2` | 매수호가건수2 | string | Y | 4 |  |
| `BIDP_CSNU3` | 매수호가건수3 | string | Y | 4 |  |
| `BIDP_CSNU4` | 매수호가건수4 | string | Y | 4 |  |
| `BIDP_CSNU5` | 매수호가건수5 | string | Y | 4 |  |
| `ASKP_RSQN1` | 매도호가잔량1 | string | Y | 8 |  |
| `ASKP_RSQN2` | 매도호가잔량2 | string | Y | 8 |  |
| `ASKP_RSQN3` | 매도호가잔량3 | string | Y | 8 |  |
| `ASKP_RSQN4` | 매도호가잔량4 | string | Y | 8 |  |
| `ASKP_RSQN5` | 매도호가잔량5 | string | Y | 8 |  |
| `BIDP_RSQN1` | 매수호가잔량1 | string | Y | 8 |  |
| `BIDP_RSQN2` | 매수호가잔량2 | string | Y | 8 |  |
| `BIDP_RSQN3` | 매수호가잔량3 | string | Y | 8 |  |
| `BIDP_RSQN4` | 매수호가잔량4 | string | Y | 8 |  |
| `BIDP_RSQN5` | 매수호가잔량5 | string | Y | 8 |  |
| `TOTAL_ASKP_CSNU` | 총매도호가건수 | string | Y | 4 |  |
| `TOTAL_BIDP_CSNU` | 총매수호가건수 | string | Y | 4 |  |
| `TOTAL_ASKP_RSQN` | 총매도호가잔량 | string | Y | 8 |  |
| `TOTAL_BIDP_RSQN` | 총매수호가잔량 | string | Y | 8 |  |
| `TOTAL_ASKP_RSQN_ICDC` | 총매도호가잔량증감 | string | Y | 4 |  |
| `TOTAL_BIDP_RSQN_ICDC` | 총매수호가잔량증감 | string | Y | 4 |  |
| `OPTN_ASKP6` | 옵션매도호가6 | string | Y | 8 |  |
| `OPTN_ASKP7` | 옵션매도호가7 | string | Y | 8 |  |
| `OPTN_ASKP8` | 옵션매도호가8 | string | Y | 8 |  |
| `OPTN_ASKP9` | 옵션매도호가9 | string | Y | 8 |  |
| `OPTN_ASKP10` | 옵션매도호가10 | string | Y | 8 |  |
| `OPTN_BIDP6` | 옵션매수호가6 | string | Y | 8 |  |
| `OPTN_BIDP7` | 옵션매수호가7 | string | Y | 8 |  |
| `OPTN_BIDP8` | 옵션매수호가8 | string | Y | 8 |  |
| `OPTN_BIDP9` | 옵션매수호가9 | string | Y | 8 |  |
| `OPTN_BIDP10` | 옵션매수호가10 | string | Y | 8 |  |
| `ASKP_CSNU6` | 매도호가건수6 | string | Y | 4 |  |
| `ASKP_CSNU7` | 매도호가건수7 | string | Y | 4 |  |
| `ASKP_CSNU8` | 매도호가건수8 | string | Y | 4 |  |
| `ASKP_CSNU9` | 매도호가건수9 | string | Y | 4 |  |
| `ASKP_CSNU10` | 매도호가건수10 | string | Y | 4 |  |
| `BIDP_CSNU6` | 매수호가건수6 | string | Y | 4 |  |
| `BIDP_CSNU7` | 매수호가건수7 | string | Y | 4 |  |
| `BIDP_CSNU8` | 매수호가건수8 | string | Y | 4 |  |
| `BIDP_CSNU9` | 매수호가건수9 | string | Y | 4 |  |
| `BIDP_CSNU10` | 매수호가건수10 | string | Y | 4 |  |
| `ASKP_RSQN6` | 매도호가잔량6 | string | Y | 8 |  |
| `ASKP_RSQN7` | 매도호가잔량7 | string | Y | 8 |  |
| `ASKP_RSQN8` | 매도호가잔량8 | string | Y | 8 |  |
| `ASKP_RSQN9` | 매도호가잔량9 | string | Y | 8 |  |
| `ASKP_RSQN10` | 매도호가잔량10 | string | Y | 8 |  |
| `BIDP_RSQN6` | 매수호가잔량6 | string | Y | 8 |  |
| `BIDP_RSQN7` | 매수호가잔량7 | string | Y | 8 |  |
| `BIDP_RSQN8` | 매수호가잔량8 | string | Y | 8 |  |
| `BIDP_RSQN9` | 매수호가잔량9 | string | Y | 8 |  |
| `BIDP_RSQN10` | 매수호가잔량10 | string | Y | 8 |  |

**Request Example:**
```
{      "header": {          "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",          "custtype": "P",          "tr_type": "1",          "content-type": "utf-8"      },      "body": {          "input": {              "tr_id": "H0ZOASP0",              "tr_key": "211V05059"          }      }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "H0ZOASP0",           "tr_key": "211V05059",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output  0\|H0ZOASP0\|001\|211V05059^091509^1140.00^1160.00^1200.00^1300.00^1400.00^1120  .00^1080.00^620.00^580.00^530.00^2^1^1^1^1^1^2^1^1^1^187^12^10^10^10^12^187^3^3^3^9^6^241^208^  0^0^1500.00^1520.00^1700.00^0.00^0.00^0.00^0.00^0.00^0.00^0.00^1^1^1^0^0^0^0^0^0^0^10^1^1^0^0^  0^0^0^0^0
```

---
### 26. 선물옵션 실시간체결통보

| Field | Value |
|---|---|
| Sheet | `선물옵션 실시간체결통보` |
| Menu | [국내선물옵션] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0IFCNI0` |
| TR_ID (실전) | `H0IFCNI0` |
| TR_ID (모의) | `H0IFCNI9` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | 1: 등록, 2:해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 7 | [실전투자]  H0IFCNI0 : 실시간 선물옵션 체결통보    [모의투자]  H0IFCNI9 : 실시간 선물옵션 체결통보 |
| `tr_key` | 코드 | string | Y | 6 | 예:101S12 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CUST_ID` | 고객 ID | array | Y | 16 | '각 항목사이에는 구분자로 ^ 사용,  모든 데이터타입은 String으로 변환되어 push 처리됨' |
| `ACNT_NO` | 계좌번호 | string | Y | 16 |  |
| `ODER_NO` | 주문번호 | string | Y | 1 |  |
| `OODER_NO` | 원주문번호 | string | Y | 8 |  |
| `SELN_BYOV_CLS` | 매도매수구분 | string | Y | 8 | 01:매도, 02매수 |
| `RCTF_CLS` | 정정구분 | string | Y | 8 |  |
| `ODER_KIND2` | 주문종류2 | string | Y | 8 | L: 주문접수통보, 0: 체결통보 |
| `STCK_SHRN_ISCD` | 주식 단축 종목코드 | string | Y | 8 |  |
| `CNTG_QTY` | 체결 수량 | string | Y | 8 |  |
| `CNTG_UNPR` | 체결단가 | string | Y | 8 |  |
| `STCK_CNTG_HOUR` | 주식 체결 시간 | string | Y | 8 |  |
| `RFUS_YN` | 거부여부 | string | Y | 8 |  |
| `CNTG_YN` | 체결여부 | string | Y | 8 | 1: 주문,정정,취소,거부 통보, 2 체결 |
| `ACPT_YN` | 접수여부 | string | Y | 8 | 1:주문접수, 2:확인, 3, 취소 |
| `BRNC_NO` | 지점번호 | string | Y | 8 |  |
| `ODER_QTY` | 주문수량 | string | Y | 8 |  |
| `ACNT_NAME` | 계좌명 | string | Y | 8 |  |
| `CNTG_ISNM` | 체결종목명 | string | Y | 8 |  |
| `ODER_COND` | 주문조건 | string | Y | 8 |  |
| `ORD_GRP` | 주문그룹ID | string | Y | 8 |  |
| `ORD_GRPSEQ` | 주문그룹SEQ | string | Y | 8 |  |
| `ORDER_PRC` | 주문가격 | string | Y | 8 |  |

**Request Example:**
```
{           "header":           {                    "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",                    "custtype":"P",                    "tr_type":"1",                    "content-type":"utf-8"           },           "body":           {                    "input":                    {                             "tr_id":"H0IFCNI0",                             "tr_key":"HTS ID"                    }           }  }
```

**Response Example:**
```
# output - 등록 성공 시  {      "header": {          "tr_id": "H0IFCNI0",           "tr_key": "HTS ID",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output (복호화 전)   1\|H0IFCNI0\|001\|vebQjGIHMgFhxfNfvebQjGIHMgFhxfNfvebQjGIHMgFhxfNfvebQj...hxfNf    # output (복호화 후)  #### 지수선물옵션 체결 통보 ####  고객ID  [abcd1234]  계좌번호  [1234567803]  주문번호  [0000001666]  원주문번호  []  매도매수구분  [02]  정정구분  [0]  주문종류  [0]  단축종목코드  [111V06]  체결수량  [0000000002]  체결단가  [007840000]  체결시간  [095835]  거부여부  [0]  체결여부  [2]  접수여부  [2]  지점번호  [00950]  주문수량  [000000000]  계좌명  [김한국]  체결종목명  [삼성전자   F 2]  주문조건  []  주문그룹ID  []  주문그룹SEQ  []  주문가격  [000000000]
```

---
### 27. KRX야간선물 실시간종목체결

| Field | Value |
|---|---|
| Sheet | `KRX야간선물 실시간종목체결` |
| Menu | [국내선물옵션] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0MFCNT0` |
| TR_ID (실전) | `H0MFCNT0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | 1: 등록, 2:해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0MFCNT0 |
| `tr_key` | 구분값 | string | Y | 12 | 야간선물 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FUTS_SHRN_ISCD` | 선물 단축 종목코드 | string | Y | 9 |  |
| `BSOP_HOUR` | 영업 시간 | string | Y | 6 |  |
| `FUTS_PRDY_VRSS` | 선물 전일 대비 | string | Y | 1 |  |
| `PRDY_VRSS_SIGN` | 전일 대비 부호 | string | Y | 1 |  |
| `FUTS_PRDY_CTRT` | 선물 전일 대비율 | string | Y | 1 |  |
| `FUTS_PRPR` | 선물 현재가 | string | Y | 1 |  |
| `FUTS_OPRC` | 선물 시가2 | string | Y | 1 |  |
| `FUTS_HGPR` | 선물 최고가 | string | Y | 1 |  |
| `FUTS_LWPR` | 선물 최저가 | string | Y | 1 |  |
| `LAST_CNQN` | 최종 거래량 | string | Y | 1 |  |
| `ACML_VOL` | 누적 거래량 | string | Y | 1 |  |
| `ACML_TR_PBMN` | 누적 거래 대금 | string | Y | 1 |  |
| `HTS_THPR` | HTS 이론가 | string | Y | 1 |  |
| `MRKT_BASIS` | 시장 베이시스 | string | Y | 1 |  |
| `DPRT` | 괴리율 | string | Y | 1 |  |
| `NMSC_FCTN_STPL_PRC` | 근월물 약정가 | string | Y | 1 |  |
| `FMSC_FCTN_STPL_PRC` | 원월물 약정가 | string | Y | 1 |  |
| `SPEAD_PRC` | 스프레드1 | string | Y | 1 |  |
| `HTS_OTST_STPL_QTY` | HTS 미결제 약정 수량 | string | Y | 1 |  |
| `OTST_STPL_QTY_ICDC` | 미결제 약정 수량 증감 | string | Y | 1 |  |
| `OPRC_HOUR` | 시가 시간 | string | Y | 6 |  |
| `OPRC_VRSS_PRPR_SIGN` | 시가2 대비 현재가 부호 | string | Y | 1 |  |
| `OPRC_VRSS_NMIX_PRPR` | 시가 대비 지수 현재가 | string | Y | 1 |  |
| `HGPR_HOUR` | 최고가 시간 | string | Y | 6 |  |
| `HGPR_VRSS_PRPR_SIGN` | 최고가 대비 현재가 부호 | string | Y | 1 |  |
| `HGPR_VRSS_NMIX_PRPR` | 최고가 대비 지수 현재가 | string | Y | 1 |  |
| `LWPR_HOUR` | 최저가 시간 | string | Y | 6 |  |
| `LWPR_VRSS_PRPR_SIGN` | 최저가 대비 현재가 부호 | string | Y | 1 |  |
| `LWPR_VRSS_NMIX_PRPR` | 최저가 대비 지수 현재가 | string | Y | 1 |  |
| `SHNU_RATE` | 매수2 비율 | string | Y | 1 |  |
| `CTTR` | 체결강도 | string | Y | 1 |  |
| `ESDG` | 괴리도 | string | Y | 1 |  |
| `OTST_STPL_RGBF_QTY_ICDC` | 미결제 약정 직전 수량 증감 | string | Y | 1 |  |
| `THPR_BASIS` | 이론 베이시스 | string | Y | 1 |  |
| `FUTS_ASKP1` | 선물 매도호가1 | string | Y | 1 |  |
| `FUTS_BIDP1` | 선물 매수호가1 | string | Y | 1 |  |
| `ASKP_RSQN1` | 매도호가 잔량1 | string | Y | 1 |  |
| `BIDP_RSQN1` | 매수호가 잔량1 | string | Y | 1 |  |
| `SELN_CNTG_CSNU` | 매도 체결 건수 | string | Y | 1 |  |
| `SHNU_CNTG_CSNU` | 매수 체결 건수 | string | Y | 1 |  |
| `NTBY_CNTG_CSNU` | 순매수 체결 건수 | string | Y | 1 |  |
| `SELN_CNTG_SMTN` | 총 매도 수량 | string | Y | 1 |  |
| `SHNU_CNTG_SMTN` | 총 매수 수량 | string | Y | 1 |  |
| `TOTAL_ASKP_RSQN` | 총 매도호가 잔량 | string | Y | 1 |  |
| `TOTAL_BIDP_RSQN` | 총 매수호가 잔량 | string | Y | 1 |  |
| `PRDY_VOL_VRSS_ACML_VOL_RATE` | 전일 거래량 대비 등락율 | string | Y | 1 |  |
| `DYNM_MXPR` | 실시간상한가 | string | Y | 8 |  |
| `DYNM_LLAM` | 실시간하한가 | string | Y | 8 |  |
| `DYNM_PRC_LIMT_YN` | 실시간가격제한구분 | string | Y | 1 |  |

**Request Example:**
```
{      "header": {          "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",          "custtype": "P",          "tr_type": "1",          "content-type": "utf-8"      },      "body": {          "input": {              "tr_id": "H0MFCNT0",              "tr_key": "101V06"          }      }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "H0MFCNT0",           "tr_key": "101V06",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output  0\|H0MFCNT0\|001\|101V06^190215^0.75^2^0.20^367.30^367.10^367.60^367.05^2^1596^1465526  87^366.08^1.22^0.33^0.00^0.00^0.00^268223^0^000000^2^0.20^000000^5^-0.30^000000^2^0.25^0.49^96.31^1.2  2^0^0.00^367.35^367.30^0^0^345^358^13^813^783^0^0^0.00
```

---
### 28. KRX야간선물 실시간호가

| Field | Value |
|---|---|
| Sheet | `KRX야간선물 실시간호가` |
| Menu | [국내선물옵션] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0MFASP0` |
| TR_ID (실전) | `H0MFASP0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | 1: 등록, 2:해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0MFASP0 |
| `tr_key` | 구분값 | string | Y | 12 | 야간선물 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FUTS_SHRN_ISCD` | 선물 단축 종목코드 | string | Y | 9 |  |
| `BSOP_HOUR` | 영업 시간 | string | Y | 6 |  |
| `FUTS_ASKP1` | 선물 매도호가1 | string | Y | 8 |  |
| `FUTS_ASKP2` | 선물 매도호가2 | string | Y | 8 |  |
| `FUTS_ASKP3` | 선물 매도호가3 | string | Y | 8 |  |
| `FUTS_ASKP4` | 선물 매도호가4 | string | Y | 8 |  |
| `FUTS_ASKP5` | 선물 매도호가5 | string | Y | 8 |  |
| `FUTS_BIDP1` | 선물 매수호가1 | string | Y | 8 |  |
| `FUTS_BIDP2` | 선물 매수호가2 | string | Y | 8 |  |
| `FUTS_BIDP3` | 선물 매수호가3 | string | Y | 8 |  |
| `FUTS_BIDP4` | 선물 매수호가4 | string | Y | 8 |  |
| `FUTS_BIDP5` | 선물 매수호가5 | string | Y | 8 |  |
| `ASKP_CSNU1` | 매도호가 건수1 | string | Y | 4 |  |
| `ASKP_CSNU2` | 매도호가 건수2 | string | Y | 4 |  |
| `ASKP_CSNU3` | 매도호가 건수3 | string | Y | 4 |  |
| `ASKP_CSNU4` | 매도호가 건수4 | string | Y | 4 |  |
| `ASKP_CSNU5` | 매도호가 건수5 | string | Y | 4 |  |
| `BIDP_CSNU1` | 매수호가 건수1 | string | Y | 4 |  |
| `BIDP_CSNU2` | 매수호가 건수2 | string | Y | 4 |  |
| `BIDP_CSNU3` | 매수호가 건수3 | string | Y | 4 |  |
| `BIDP_CSNU4` | 매수호가 건수4 | string | Y | 4 |  |
| `BIDP_CSNU5` | 매수호가 건수5 | string | Y | 4 |  |
| `ASKP_RSQN1` | 매도호가 잔량1 | string | Y | 8 |  |
| `ASKP_RSQN2` | 매도호가 잔량2 | string | Y | 8 |  |
| `ASKP_RSQN3` | 매도호가 잔량3 | string | Y | 8 |  |
| `ASKP_RSQN4` | 매도호가 잔량4 | string | Y | 8 |  |
| `ASKP_RSQN5` | 매도호가 잔량5 | string | Y | 8 |  |
| `BIDP_RSQN1` | 매수호가 잔량1 | string | Y | 8 |  |
| `BIDP_RSQN2` | 매수호가 잔량2 | string | Y | 8 |  |
| `BIDP_RSQN3` | 매수호가 잔량3 | string | Y | 8 |  |
| `BIDP_RSQN4` | 매수호가 잔량4 | string | Y | 8 |  |
| `BIDP_RSQN5` | 매수호가 잔량5 | string | Y | 8 |  |
| `TOTAL_ASKP_CSNU` | 총 매도호가 건수 | string | Y | 4 |  |
| `TOTAL_BIDP_CSNU` | 총 매수호가 건수 | string | Y | 4 |  |
| `TOTAL_ASKP_RSQN` | 총 매도호가 잔량 | string | Y | 8 |  |
| `TOTAL_BIDP_RSQN` | 총 매수호가 잔량 | string | Y | 8 |  |
| `TOTAL_ASKP_RSQN_ICDC` | 총 매도호가 잔량 증감 | string | Y | 4 |  |
| `TOTAL_BIDP_RSQN_ICDC` | 총 매수호가 잔량 증감 | string | Y | 4 |  |

**Request Example:**
```
{      "header": {          "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",          "custtype": "P",          "tr_type": "1",          "content-type": "utf-8"      },      "body": {          "input": {              "tr_id": "H0MFASP0",              "tr_key": "101V06"          }      }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "H0MFASP0",           "tr_key": "101V06",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output  0\|H0MFASP0\|001\|101V06^190215^367.35^367.40^367.45^0.00^0.00^367.30^367.25^367.20^0.  00^0.00^0^0^0^0^0^0^0^0^0^0^24^21^21^0^0^2^28^20^0^0^0^0^0^0^^0^0^0^0^0^^000000^2^
```

---
### 29. KRX야간옵션 실시간체결가

| Field | Value |
|---|---|
| Sheet | `KRX야간옵션 실시간체결가` |
| Menu | [국내선물옵션] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0EUCNT0` |
| TR_ID (실전) | `H0EUCNT0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | 1: 등록, 2:해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0EUCNT0 |
| `tr_key` | 구분값 | string | Y | 12 | 야간옵션 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `OPTN_SHRN_ISCD` | 옵션단축종목코드 | string | Y | 9 |  |
| `BSOP_HOUR` | 영업시간 | string | Y | 6 |  |
| `OPTN_PRPR` | 옵션현재가 | string | Y | 1 |  |
| `PRDY_VRSS_SIGN` | 전일대비부호 | string | Y | 1 |  |
| `OPTN_PRDY_VRSS` | 옵션전일대비 | string | Y | 1 |  |
| `PRDY_CTRT` | 전일대비율 | string | Y | 1 |  |
| `OPTN_OPRC` | 옵션시가2 | string | Y | 1 |  |
| `OPTN_HGPR` | 옵션최고가 | string | Y | 1 |  |
| `OPTN_LWPR` | 옵션최저가 | string | Y | 1 |  |
| `LAST_CNQN` | 최종거래량 | string | Y | 1 |  |
| `ACML_VOL` | 누적거래량 | string | Y | 1 |  |
| `ACML_TR_PBMN` | 누적거래대금 | string | Y | 1 |  |
| `HTS_THPR` | HTS이론가 | string | Y | 1 |  |
| `HTS_OTST_STPL_QTY` | HTS미결제약정수량 | string | Y | 1 |  |
| `OTST_STPL_QTY_ICDC` | 미결제약정수량증감 | string | Y | 1 |  |
| `OPRC_HOUR` | 시가시간 | string | Y | 6 |  |
| `OPRC_VRSS_PRPR_SIGN` | 시가2대비현재가부호 | string | Y | 1 |  |
| `OPRC_VRSS_NMIX_PRPR` | 시가대비지수현재가 | string | Y | 1 |  |
| `HGPR_HOUR` | 최고가시간 | string | Y | 6 |  |
| `HGPR_VRSS_PRPR_SIGN` | 최고가대비현재가부호 | string | Y | 1 |  |
| `HGPR_VRSS_NMIX_PRPR` | 최고가대비지수현재가 | string | Y | 1 |  |
| `LWPR_HOUR` | 최저가시간 | string | Y | 6 |  |
| `LWPR_VRSS_PRPR_SIGN` | 최저가대비현재가부호 | string | Y | 1 |  |
| `LWPR_VRSS_NMIX_PRPR` | 최저가대비지수현재가 | string | Y | 1 |  |
| `SHNU_RATE` | 매수2비율 | string | Y | 1 |  |
| `PRMM_VAL` | 프리미엄값 | string | Y | 1 |  |
| `INVL_VAL` | 내재가치값 | string | Y | 1 |  |
| `TMVL_VAL` | 시간가치값 | string | Y | 1 |  |
| `DELTA` | 델타 | string | Y | 1 |  |
| `GAMA` | 감마 | string | Y | 1 |  |
| `VEGA` | 베가 | string | Y | 1 |  |
| `THETA` | 세타 | string | Y | 1 |  |
| `RHO` | 로우 | string | Y | 1 |  |
| `HTS_INTS_VLTL` | HTS내재변동성 | string | Y | 1 |  |
| `ESDG` | 괴리도 | string | Y | 1 |  |
| `OTST_STPL_RGBF_QTY_ICDC` | 미결제약정직전수량증감 | string | Y | 1 |  |
| `THPR_BASIS` | 이론베이시스 | string | Y | 1 |  |
| `UNAS_HIST_VLTL` | 역사적변동성 | string | Y | 1 |  |
| `CTTR` | 체결강도 | string | Y | 1 |  |
| `DPRT` | 괴리율 | string | Y | 1 |  |
| `MRKT_BASIS` | 시장베이시스 | string | Y | 1 |  |
| `OPTN_ASKP1` | 옵션매도호가1 | string | Y | 1 |  |
| `OPTN_BIDP1` | 옵션매수호가1 | string | Y | 1 |  |
| `ASKP_RSQN1` | 매도호가잔량1 | string | Y | 1 |  |
| `BIDP_RSQN1` | 매수호가잔량1 | string | Y | 1 |  |
| `SELN_CNTG_CSNU` | 매도체결건수 | string | Y | 1 |  |
| `SHNU_CNTG_CSNU` | 매수체결건수 | string | Y | 1 |  |
| `NTBY_CNTG_CSNU` | 순매수체결건수 | string | Y | 1 |  |
| `SELN_CNTG_SMTN` | 총매도수량 | string | Y | 1 |  |
| `SHNU_CNTG_SMTN` | 총매수수량 | string | Y | 1 |  |
| `TOTAL_ASKP_RSQN` | 총매도호가잔량 | string | Y | 1 |  |
| `TOTAL_BIDP_RSQN` | 총매수호가잔량 | string | Y | 1 |  |
| `PRDY_VOL_VRSS_ACML_VOL_RATE` | 전일거래량대비등락율 | string | Y | 1 |  |
| `DYNM_MXPR` | 실시간상한가 | string | Y | 8 |  |
| `DYNM_PRC_LIMT_YN` | 실시간가격제한구분 | string | Y | 1 |  |
| `DYNM_LLAM` | 실시간하한가 | string | Y | 8 |  |

**Request Example:**
```
{      "header": {          "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",          "custtype": "P",          "tr_type": "1",          "content-type": "utf-8"      },      "body": {          "input": {              "tr_id": "H0EUCNT0",              "tr_key": "301V06362"          }      }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "H0EUCNT0",           "tr_key": "301V06362",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output  0\|H0EUCNT0\|001\|301V06362^190612^2.98^5^-0.35^-10.51^3.06^3.09^2.98^1^106^0^-nan^0^0  ^000000^5^-0.08^000000^5^-0.11^000000^3^0.00^0.25^0.00^0.00^2.98^-nan^-nan^-nan^nan^-nan^84.55^-nan^0  ^-nan^nan^32.50^-nan^-363.10^3.00^2.98^15^1^33^18^-15^80^26^37^27^0.00    # output - 복호화 후  #### 야간옵션(EUREX) 체결 ####  ============================================  ### [1 / 1]  옵션단축종목코드     [301V06362]  영업시간         [190612]  옵션현재가        [2.98]  전일대비부호       [5]  옵션전일대비       [-0.35]  전일대비율        [-10.51]  옵션시가2        [3.06]  옵션최고가        [3.09]  옵션최저가        [2.98]  최종거래량        [1]  누적거래량        [106]  누적거래대금       [0]  HTS이론가       [-nan]  HTS미결제약정수량   [0]  미결제약정수량증감    [0]  시가시간         [000000]  시가2대비현재가부호   [5]  시가대비지수현재가    [-0.08]  최고가시간        [000000]  최고가대비현재가부호   [5]  최고가대비지수현재가   [-0.11]  최저가시간        [000000]  최저가대비현재가부호   [3]  최저가대비지수현재가   [0.00]  매수2비율        [0.25]  프리미엄값        [0.00]  내재가치값        [0.00]  시간가치값        [2.98]  델타           [-nan]  감마           [-nan]  베가           [-nan]  세타           [nan]  로우           [-nan]  HTS내재변동성     [84.55]  괴리도          [-nan]  미결제약정직전수량증감  [0]  이론베이시스       [-nan]  역사적변동성       [nan]  체결강도         [32.50]  괴리율          [-nan]  시장베이시스       [-363.10]  옵션매도호가1      [3.00]  옵션매수호가1      [2.98]  매도호가잔량1      [15]  매수호가잔량1      [1]  매도체결건수       [33]  매수체결건수       [18]  순매수체결건수      [-15]  총매도수량        [80]  총매수수량        [26]  총매도호가잔량      [37]  총매수호가잔량      [27]  전일거래량대비등락율   [0.00]
```

---
### 30. KRX야간옵션실시간예상체결

| Field | Value |
|---|---|
| Sheet | `KRX야간옵션실시간예상체결` |
| Menu | [국내선물옵션] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0EUANC0` |
| TR_ID (실전) | `H0EUANC0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | 1: 등록, 2:해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0EUANC0 |
| `tr_key` | 구분값 | string | Y | 12 | 야간옵션 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `OPTN_SHRN_ISCD` | 옵션단축종목코드 | string | Y | 9 |  |
| `BSOP_HOUR` | 영업시간 | string | Y | 6 |  |
| `ANTC_CNPR` | 예상체결가 | string | Y | 8 |  |
| `ANTC_CNTG_VRSS` | 예상체결대비 | string | Y | 8 |  |
| `ANTC_CNTG_VRSS_SIGN` | 예상체결대비부호 | string | Y | 1 |  |
| `ANTC_CNTG_PRDY_CTRT` | 예상체결전일대비율 | string | Y | 8 |  |
| `ANTC_MKOP_CLS_CODE` | 예상장운영구분코드 | string | Y | 3 |  |
| `ANTC_CNQN` | 예상체결수량 | number | Y | 8 |  |

**Request Example:**
```
{      "header": {          "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",          "custtype": "P",          "tr_type": "1",          "content-type": "utf-8"      },      "body": {          "input": {              "tr_id": "H0EUANC0",              "tr_key": "301V06362"          }      }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "H0EUANC0",           "tr_key": "301V06362",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output
```

---
### 31. 지수선물 실시간체결가

| Field | Value |
|---|---|
| Sheet | `지수선물 실시간체결가` |
| Menu | [국내선물옵션] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0IFCNT0` |
| TR_ID (실전) | `H0IFCNT0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | "1: 등록, 2:해제" |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 7 | H0IFCNT0 |
| `tr_key` | 코드 | string | Y | 6 | 예:101S12 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FUTS_SHRN_ISCD` | 선물 단축 종목코드 | object | Y | 16 | '각 항목사이에는 구분자로 ^ 사용,  모든 데이터타입은 String으로 변환되어 push 처리됨' |
| `BSOP_HOUR` | 영업 시간 | string | Y | 16 |  |
| `FUTS_PRDY_VRSS` | 선물 전일 대비 | string | Y | 1 |  |
| `PRDY_VRSS_SIGN` | 전일 대비 부호 | string | Y | 8 |  |
| `FUTS_PRDY_CTRT` | 선물 전일 대비율 | string | Y | 8 |  |
| `FUTS_PRPR` | 선물 현재가 | string | Y | 8 |  |
| `FUTS_OPRC` | 선물 시가2 | string | Y | 8 |  |
| `FUTS_HGPR` | 선물 최고가 | string | Y | 8 |  |
| `FUTS_LWPR` | 선물 최저가 | string | Y | 8 |  |
| `LAST_CNQN` | 최종 거래량 | string | Y | 8 | 체결량 |
| `ACML_VOL` | 누적 거래량 | string | Y | 8 |  |
| `ACML_TR_PBMN` | 누적 거래 대금 | string | Y | 8 |  |
| `HTS_THPR` | HTS 이론가 | string | Y | 8 |  |
| `MRKT_BASIS` | 시장 베이시스 | string | Y | 8 |  |
| `DPRT` | 괴리율 | string | Y | 8 |  |
| `NMSC_FCTN_STPL_PRC` | 근월물 약정가 | string | Y | 8 |  |
| `FMSC_FCTN_STPL_PRC` | 원월물 약정가 | string | Y | 8 |  |
| `SPEAD_PRC` | 스프레드1 | string | Y | 8 |  |
| `HTS_OTST_STPL_QTY` | HTS 미결제 약정 수량 | string | Y | 8 |  |
| `OTST_STPL_QTY_ICDC` | 미결제 약정 수량 증감 | string | Y | 8 |  |
| `OPRC_HOUR` | 시가 시간 | string | Y | 8 |  |
| `OPRC_VRSS_PRPR_SIGN` | 시가2 대비 현재가 부호 | string | Y | 8 |  |
| `OPRC_VRSS_NMIX_PRPR` | 시가 대비 지수 현재가 | string | Y | 8 |  |
| `HGPR_HOUR` | 최고가 시간 | string | Y | 8 |  |
| `HGPR_VRSS_PRPR_SIGN` | 최고가 대비 현재가 부호 | string | Y | 8 |  |
| `HGPR_VRSS_NMIX_PRPR` | 최고가 대비 지수 현재가 | string | Y | 8 |  |
| `LWPR_HOUR` | 최저가 시간 | string | Y | 8 |  |
| `LWPR_VRSS_PRPR_SIGN` | 최저가 대비 현재가 부호 | string | Y | 8 |  |
| `LWPR_VRSS_NMIX_PRPR` | 최저가 대비 지수 현재가 | string | Y | 8 |  |
| `SHNU_RATE` | 매수2 비율 | string | Y | 8 |  |
| `CTTR` | 체결강도 | string | Y | 8 |  |
| `ESDG` | 괴리도 | string | Y | 8 |  |
| `OTST_STPL_RGBF_QTY_ICDC` | 미결제 약정 직전 수량 증감 | string | Y | 8 |  |
| `THPR_BASIS` | 이론 베이시스 | string | Y | 8 |  |
| `FUTS_ASKP1` | 선물 매도호가1 | string | Y | 8 |  |
| `FUTS_BIDP1` | 선물 매수호가1 | string | Y | 8 |  |
| `ASKP_RSQN1` | 매도호가 잔량1 | string | Y | 8 |  |
| `BIDP_RSQN1` | 매수호가 잔량1 | string | Y | 8 |  |
| `SELN_CNTG_CSNU` | 매도 체결 건수 | string | Y | 6 |  |
| `SHNU_CNTG_CSNU` | 매수 체결 건수 | string | Y | 6 |  |
| `NTBY_CNTG_CSNU` | 순매수 체결 건수 | string | Y | 6 |  |
| `SELN_CNTG_SMTN` | 총 매도 수량 | string | Y | 6 |  |
| `SHNU_CNTG_SMTN` | 총 매수 수량 | string | Y | 6 |  |
| `TOTAL_ASKP_RSQN` | 총 매도호가 잔량 | string | Y | 6 |  |
| `TOTAL_BIDP_RSQN` | 총 매수호가 잔량 | string | Y | 6 |  |
| `PRDY_VOL_VRSS_ACML_VOL_RATE` | 전일 거래량 대비 등락율 | string | Y | 6 |  |
| `DSCS_BLTR_ACML_QTY` | 협의 대량 거래량 | string | Y | 6 |  |
| `DYNM_MXPR` | 실시간상한가 | string | Y | 8 |  |
| `DYNM_LLAM` | 실시간하한가 | string | Y | 6 |  |
| `DYNM_PRC_LIMT_YN` | 실시간가격제한구분 | string | Y | 10 |  |

---
### 32. 주식선물 실시간예상체결

| Field | Value |
|---|---|
| Sheet | `주식선물 실시간예상체결` |
| Menu | [국내선물옵션] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0ZFANC0` |
| TR_ID (실전) | `H0ZFANC0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | 1: 등록, 2:해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0ZFANC0 |
| `tr_key` | 구분값 | string | Y | 12 | 주식선물 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FUTS_SHRN_ISCD` | 선물단축종목코드 | string | Y | 9 |  |
| `BSOP_HOUR` | 영업시간 | string | Y | 6 |  |
| `ANTC_CNPR` | 예상체결가 | string | Y | 8 |  |
| `ANTC_CNTG_VRSS` | 예상체결대비 | string | Y | 8 |  |
| `ANTC_CNTG_VRSS_SIGN` | 예상체결대비부호 | string | Y | 1 |  |
| `ANTC_CNTG_PRDY_CTRT` | 예상체결전일대비율 | string | Y | 8 |  |
| `ANTC_MKOP_CLS_CODE` | 예상장운영구분코드 | string | Y | 3 |  |
| `ANTC_CNQN` | 예상체결수량 | string | Y | 8 |  |

---
### 33. KRX야간옵션실시간체결통보

| Field | Value |
|---|---|
| Sheet | `KRX야간옵션실시간체결통보` |
| Menu | [국내선물옵션] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0EUCNI0` |
| TR_ID (실전) | `H0MFCNI0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | 1: 등록, 2:해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0MFCNI0 |
| `tr_key` | 구분값 | string | Y | 12 | HTS ID |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CUST_ID` | 고객 ID | string | Y | 8 |  |
| `ACNT_NO` | 계좌번호 | string | Y | 10 |  |
| `ODER_NO` | 주문번호 | string | Y | 10 |  |
| `OODER_NO` | 원주문번호 | string | Y | 10 |  |
| `SELN_BYOV_CLS` | 매도매수구분 | string | Y | 2 |  |
| `RCTF_CLS` | 정정구분 | string | Y | 1 |  |
| `ODER_KIND2` | 주문종류2 | string | Y | 1 |  |
| `STCK_SHRN_ISCD` | 주식 단축 종목코드 | string | Y | 9 |  |
| `CNTG_QTY` | 체결 수량 | string | Y | 10 |  |
| `CNTG_UNPR` | 체결단가 | string | Y | 9 |  |
| `STCK_CNTG_HOUR` | 주식 체결 시간 | string | Y | 6 |  |
| `RFUS_YN` | 거부여부 | string | Y | 1 |  |
| `CNTG_YN` | 체결여부 | string | Y | 1 |  |
| `ACPT_YN` | 접수여부 | string | Y | 1 |  |
| `BRNC_NO` | 지점번호 | string | Y | 5 |  |
| `ODER_QTY` | 주문수량 | string | Y | 9 |  |
| `ACNT_NAME` | 계좌명 | string | Y | 12 |  |
| `CNTG_ISNM` | 체결종목명 | string | Y | 14 |  |
| `ODER_COND` | 주문조건 | string | Y | 1 |  |

**Request Example:**
```
{      "header": {          "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",          "custtype": "P",          "tr_type": "1",          "content-type": "utf-8"      },      "body": {          "input": {              "tr_id": "H0EUCNI0",              "tr_key": "HTS_ID"          }      }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "H0EUCNI0",           "tr_key": "HTS_ID",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output  1\|H0EUCNI0\|001\|qWVvLmhf0Iax57SI6HYSTc30qiWTnUjWAT+BxQD4RaljIiBLp3XqzoA0eeEFa7yn8afB  Ufvo32b/Ivf9rxtl1VZU+oouQlH9rwuNjUnC40gkB+2lm2Q8sTkc4wMYKJuOn8SnLrfGjilAIzueLOLCndSy5xkv4qmPAXk+NKC6x  nimfxBoVTVtcrpzOaHPvwvD    # output - 복호화 후  #### 국내선물옵션 주문 접수 통보 ####  고객ID  [HTS_ID]  계좌번호  [1234567803]  주문번호  [0000000021]  원주문번호  [0000000021]  매도매수구분  [02]  정정구분  [0]  주문종류  [L]  단축종목코드  [175V06]  주문수량  [0000000001]  체결단가  [000135900]  체결시간  [100422]  거부여부  [0]  체결여부  [1]  접수여부  [1]  지점번호  [00000]  체결수량  [000000001]  계좌명  [******]  체결종목명  [미국달러F2406]  주문조건  [0]
```

---
### 34. KRX야간선물 실시간체결통보

| Field | Value |
|---|---|
| Sheet | `KRX야간선물 실시간체결통보` |
| Menu | [국내선물옵션] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0MFCNI0` |
| TR_ID (실전) | `H0MFCNI0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | 1: 등록, 2:해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0MFCNI0 |
| `tr_key` | 구분값 | string | Y | 12 | HTS ID |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CUST_ID` | 고객 ID | string | Y | 8 |  |
| `ACNT_NO` | 계좌번호 | string | Y | 10 |  |
| `ODER_NO` | 주문번호 | string | Y | 10 |  |
| `OODER_NO` | 원주문번호 | string | Y | 10 |  |
| `SELN_BYOV_CLS` | 매도매수구분 | string | Y | 2 |  |
| `RCTF_CLS` | 정정구분 | string | Y | 1 |  |
| `ODER_KIND2` | 주문종류2 | string | Y | 1 |  |
| `STCK_SHRN_ISCD` | 주식 단축 종목코드 | string | Y | 9 |  |
| `CNTG_QTY` | 체결 수량 | string | Y | 10 |  |
| `CNTG_UNPR` | 체결단가 | string | Y | 9 |  |
| `STCK_CNTG_HOUR` | 주식 체결 시간 | string | Y | 6 |  |
| `RFUS_YN` | 거부여부 | string | Y | 1 |  |
| `CNTG_YN` | 체결여부 | string | Y | 1 |  |
| `ACPT_YN` | 접수여부 | string | Y | 1 |  |
| `BRNC_NO` | 지점번호 | string | Y | 5 |  |
| `ODER_QTY` | 주문수량 | string | Y | 9 |  |
| `ACNT_NAME` | 계좌명 | string | Y | 12 |  |
| `CNTG_ISNM` | 체결종목명 | string | Y | 14 |  |
| `ODER_COND` | 주문조건 | string | Y | 1 |  |

---
### 35. 상품선물 실시간체결가

| Field | Value |
|---|---|
| Sheet | `상품선물 실시간체결가` |
| Menu | [국내선물옵션] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0CFCNT0` |
| TR_ID (실전) | `H0CFCNT0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | "1: 등록, 2:해제" |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 7 | H0CFCNT0 |
| `tr_key` | 종목코드 | string | Y | 6 | 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FUTS_SHRN_ISCD` | 선물 단축 종목코드 | object | Y | 32 | '각 항목사이에는 구분자로 ^ 사용,  모든 데이터타입은 String으로 변환되어 push 처리됨' |
| `BSOP_HOUR` | 영업 시간 | string | Y | 9 |  |
| `FUTS_PRDY_VRSS` | 선물 전일 대비 | string | Y | 6 |  |
| `PRDY_VRSS_SIGN` | 전일 대비 부호 | string | Y | 8 |  |
| `FUTS_PRDY_CTRT` | 선물 전일 대비율 | string | Y | 1 |  |
| `FUTS_PRPR` | 선물 현재가 | string | Y | 8 |  |
| `FUTS_OPRC` | 선물 시가2 | string | Y | 8 |  |
| `FUTS_HGPR` | 선물 최고가 | string | Y | 8 |  |
| `FUTS_LWPR` | 선물 최저가 | string | Y | 8 |  |
| `LAST_CNQN` | 최종 거래량 | string | Y | 8 |  |
| `ACML_VOL` | 누적 거래량 | string | Y | 8 |  |
| `ACML_TR_PBMN` | 누적 거래 대금 | string | Y | 8 |  |
| `HTS_THPR` | HTS 이론가 | string | Y | 8 |  |
| `MRKT_BASIS` | 시장 베이시스 | string | Y | 8 |  |
| `DPRT` | 괴리율 | string | Y | 8 |  |
| `NMSC_FCTN_STPL_PRC` | 근월물 약정가 | string | Y | 8 |  |
| `FMSC_FCTN_STPL_PRC` | 원월물 약정가 | string | Y | 8 |  |
| `SPEAD_PRC` | 스프레드1 | string | Y | 8 |  |
| `HTS_OTST_STPL_QTY` | HTS 미결제 약정 수량 | string | Y | 8 |  |
| `OTST_STPL_QTY_ICDC` | 미결제 약정 수량 증감 | string | Y | 8 |  |
| `OPRC_HOUR` | 시가 시간 | string | Y | 4 |  |
| `OPRC_VRSS_PRPR_SIGN` | 시가2 대비 현재가 부호 | string | Y | 6 |  |
| `OPRC_VRSS_NMIX_PRPR` | 시가 대비 지수 현재가 | string | Y | 1 |  |
| `HGPR_HOUR` | 최고가 시간 | string | Y | 8 |  |
| `HGPR_VRSS_PRPR_SIGN` | 최고가 대비 현재가 부호 | string | Y | 6 |  |
| `HGPR_VRSS_NMIX_PRPR` | 최고가 대비 지수 현재가 | string | Y | 1 |  |
| `LWPR_HOUR` | 최저가 시간 | string | Y | 8 |  |
| `LWPR_VRSS_PRPR_SIGN` | 최저가 대비 현재가 부호 | string | Y | 6 |  |
| `LWPR_VRSS_NMIX_PRPR` | 최저가 대비 지수 현재가 | string | Y | 1 |  |
| `SHNU_RATE` | 매수2 비율 | string | Y | 8 |  |
| `CTTR` | 체결강도 | string | Y | 8 |  |
| `ESDG` | 괴리도 | string | Y | 8 |  |
| `OTST_STPL_RGBF_QTY_ICDC` | 미결제 약정 직전 수량 증감 | string | Y | 8 |  |
| `THPR_BASIS` | 이론 베이시스 | string | Y | 4 |  |
| `FUTS_ASKP1` | 선물 매도호가1 | string | Y | 8 |  |
| `FUTS_BIDP1` | 선물 매수호가1 | string | Y | 8 |  |
| `ASKP_RSQN1` | 매도호가 잔량1 | string | Y | 8 |  |
| `BIDP_RSQN1` | 매수호가 잔량1 | string | Y | 8 |  |
| `SELN_CNTG_CSNU` | 매도 체결 건수 | string | Y | 8 |  |
| `SHNU_CNTG_CSNU` | 매수 체결 건수 | string | Y | 4 |  |
| `NTBY_CNTG_CSNU` | 순매수 체결 건수 | string | Y | 4 |  |
| `SELN_CNTG_SMTN` | 총 매도 수량 | string | Y | 4 |  |
| `SHNU_CNTG_SMTN` | 총 매수 수량 | string | Y | 8 |  |
| `TOTAL_ASKP_RSQN` | 총 매도호가 잔량 | string | Y | 8 |  |
| `TOTAL_BIDP_RSQN` | 총 매수호가 잔량 | string | Y | 8 |  |
| `PRDY_VOL_VRSS_ACML_VOL_RATE` | 전일 거래량 대비 등락율 | string | Y | 8 |  |
| `DSCS_BLTR_ACML_QTY` | 협의 대량 거래량 | string | Y | 8 |  |
| `DYNM_MXPR` | 실시간상한가 | string | Y | 8 |  |
| `DYNM_LLAM` | 실시간하한가 | string | Y | 8 |  |
| `DYNM_PRC_LIMT_YN` | 실시간가격제한구분 | string | Y | 8 |  |

---
### 36. 지수선물 실시간호가

| Field | Value |
|---|---|
| Sheet | `지수선물 실시간호가` |
| Menu | [국내선물옵션] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0IFASP0` |
| TR_ID (실전) | `H0IFASP0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | "1: 등록, 2:해제" |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 7 | H0IFASP0 |
| `tr_key` | 코드 | string | Y | 6 | 예:101S12 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FUTS_SHRN_ISCD` | 선물 단축 종목코드 | object | Y | 16 | '각 항목사이에는 구분자로 ^ 사용,  모든 데이터타입은 String으로 변환되어 push 처리됨' |
| `BSOP_HOUR` | 영업 시간 | string | Y | 16 |  |
| `FUTS_ASKP1` | 선물 매도호가1 | string | Y | 1 |  |
| `FUTS_ASKP2` | 선물 매도호가2 | string | Y | 8 |  |
| `FUTS_ASKP3` | 선물 매도호가3 | string | Y | 8 |  |
| `FUTS_ASKP4` | 선물 매도호가4 | string | Y | 8 |  |
| `FUTS_ASKP5` | 선물 매도호가5 | string | Y | 8 |  |
| `FUTS_BIDP1` | 선물 매수호가1 | string | Y | 8 |  |
| `FUTS_BIDP2` | 선물 매수호가2 | string | Y | 8 |  |
| `FUTS_BIDP3` | 선물 매수호가3 | string | Y | 8 |  |
| `FUTS_BIDP4` | 선물 매수호가4 | string | Y | 8 |  |
| `FUTS_BIDP5` | 선물 매수호가5 | string | Y | 8 |  |
| `ASKP_CSNU1` | 매도호가 건수1 | string | Y | 8 |  |
| `ASKP_CSNU2` | 매도호가 건수2 | string | Y | 8 |  |
| `ASKP_CSNU3` | 매도호가 건수3 | string | Y | 8 |  |
| `ASKP_CSNU4` | 매도호가 건수4 | string | Y | 8 |  |
| `ASKP_CSNU5` | 매도호가 건수5 | string | Y | 8 |  |
| `BIDP_CSNU1` | 매수호가 건수1 | string | Y | 8 |  |
| `BIDP_CSNU2` | 매수호가 건수2 | string | Y | 8 |  |
| `BIDP_CSNU3` | 매수호가 건수3 | string | Y | 8 |  |
| `BIDP_CSNU4` | 매수호가 건수4 | string | Y | 8 |  |
| `BIDP_CSNU5` | 매수호가 건수5 | string | Y | 8 |  |
| `ASKP_RSQN1` | 매도호가 잔량1 | string | Y | 8 |  |
| `ASKP_RSQN2` | 매도호가 잔량2 | string | Y | 8 |  |
| `ASKP_RSQN3` | 매도호가 잔량3 | string | Y | 8 |  |
| `ASKP_RSQN4` | 매도호가 잔량4 | string | Y | 8 |  |
| `ASKP_RSQN5` | 매도호가 잔량5 | string | Y | 8 |  |
| `BIDP_RSQN1` | 매수호가 잔량1 | string | Y | 8 |  |
| `BIDP_RSQN2` | 매수호가 잔량2 | string | Y | 8 |  |
| `BIDP_RSQN3` | 매수호가 잔량3 | string | Y | 8 |  |
| `BIDP_RSQN4` | 매수호가 잔량4 | string | Y | 8 |  |
| `BIDP_RSQN5` | 매수호가 잔량5 | string | Y | 8 |  |
| `TOTAL_ASKP_CSNU` | 총 매도호가 건수 | string | Y | 8 |  |
| `TOTAL_BIDP_CSNU` | 총 매수호가 건수 | string | Y | 8 |  |
| `TOTAL_ASKP_RSQN` | 총 매도호가 잔량 | string | Y | 8 |  |
| `TOTAL_BIDP_RSQN` | 총 매수호가 잔량 | string | Y | 8 |  |
| `TOTAL_ASKP_RSQN_ICDC` | 총 매도호가 잔량 증감 | string | Y | 8 |  |
| `TOTAL_BIDP_RSQN_ICDC` | 총 매수호가 잔량 증감 | string | Y | 8 |  |

---
### 37. 지수옵션  실시간체결가

| Field | Value |
|---|---|
| Sheet | `지수옵션  실시간체결가` |
| Menu | [국내선물옵션] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0IOCNT0` |
| TR_ID (실전) | `H0IOCNT0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | "1: 등록, 2:해제" |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 7 | H0IOCNT0 |
| `tr_key` | 코드 | string | Y | 6 | 예:201S11305 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `OPTN_SHRN_ISCD` | 옵션 단축 종목코드 | object | Y | 16 | '각 항목사이에는 구분자로 ^ 사용,  모든 데이터타입은 String으로 변환되어 push 처리됨' |
| `BSOP_HOUR` | 영업 시간 | string | Y | 16 |  |
| `OPTN_PRPR` | 옵션 현재가 | string | Y | 1 |  |
| `PRDY_VRSS_SIGN` | 전일 대비 부호 | string | Y | 8 |  |
| `OPTN_PRDY_VRSS` | 옵션 전일 대비 | string | Y | 8 |  |
| `PRDY_CTRT` | 전일 대비율 | string | Y | 8 |  |
| `OPTN_OPRC` | 옵션 시가2 | string | Y | 8 |  |
| `OPTN_HGPR` | 옵션 최고가 | string | Y | 8 |  |
| `OPTN_LWPR` | 옵션 최저가 | string | Y | 8 |  |
| `LAST_CNQN` | 최종 거래량 | string | Y | 8 |  |
| `ACML_VOL` | 누적 거래량 | string | Y | 8 |  |
| `ACML_TR_PBMN` | 누적 거래 대금 | string | Y | 8 |  |
| `HTS_THPR` | HTS 이론가 | string | Y | 8 |  |
| `HTS_OTST_STPL_QTY` | HTS 미결제 약정 수량 | string | Y | 8 |  |
| `OTST_STPL_QTY_ICDC` | 미결제 약정 수량 증감 | string | Y | 8 |  |
| `OPRC_HOUR` | 시가 시간 | string | Y | 8 |  |
| `OPRC_VRSS_PRPR_SIGN` | 시가2 대비 현재가 부호 | string | Y | 8 |  |
| `OPRC_VRSS_NMIX_PRPR` | 시가 대비 지수 현재가 | string | Y | 8 |  |
| `HGPR_HOUR` | 최고가 시간 | string | Y | 8 |  |
| `HGPR_VRSS_PRPR_SIGN` | 최고가 대비 현재가 부호 | string | Y | 8 |  |
| `HGPR_VRSS_NMIX_PRPR` | 최고가 대비 지수 현재가 | string | Y | 8 |  |
| `LWPR_HOUR` | 최저가 시간 | string | Y | 8 |  |
| `LWPR_VRSS_PRPR_SIGN` | 최저가 대비 현재가 부호 | string | Y | 8 |  |
| `LWPR_VRSS_NMIX_PRPR` | 최저가 대비 지수 현재가 | string | Y | 8 |  |
| `SHNU_RATE` | 매수2 비율 | string | Y | 8 |  |
| `PRMM_VAL` | 프리미엄 값 | string | Y | 8 |  |
| `INVL_VAL` | 내재가치 값 | string | Y | 8 |  |
| `TMVL_VAL` | 시간가치 값 | string | Y | 8 |  |
| `DELTA` | 델타 | string | Y | 8 |  |
| `GAMA` | 감마 | string | Y | 8 |  |
| `VEGA` | 베가 | string | Y | 8 |  |
| `THETA` | 세타 | string | Y | 8 |  |
| `RHO` | 로우 | string | Y | 8 |  |
| `HTS_INTS_VLTL` | HTS 내재 변동성 | string | Y | 8 |  |
| `ESDG` | 괴리도 | string | Y | 8 |  |
| `OTST_STPL_RGBF_QTY_ICDC` | 미결제 약정 직전 수량 증감 | string | Y | 8 |  |
| `THPR_BASIS` | 이론 베이시스 | string | Y | 8 |  |
| `UNAS_HIST_VLTL` | 역사적변동성 | string | Y | 8 |  |
| `CTTR` | 체결강도 | string | Y | 8 |  |
| `DPRT` | 괴리율 | string | Y | 8 |  |
| `MRKT_BASIS` | 시장 베이시스 | string | Y | 8 |  |
| `OPTN_ASKP1` | 옵션 매도호가1 | string | Y | 8 |  |
| `OPTN_BIDP1` | 옵션 매수호가1 | string | Y | 8 |  |
| `ASKP_RSQN1` | 매도호가 잔량1 | string | Y | 8 |  |
| `BIDP_RSQN1` | 매수호가 잔량1 | string | Y | 8 |  |
| `SELN_CNTG_CSNU` | 매도 체결 건수 | string | Y | 8 |  |
| `SHNU_CNTG_CSNU` | 매수 체결 건수 | string | Y | 8 |  |
| `NTBY_CNTG_CSNU` | 순매수 체결 건수 | string | Y | 8 |  |
| `SELN_CNTG_SMTN` | 총 매도 수량 | string | Y | 8 |  |
| `SHNU_CNTG_SMTN` | 총 매수 수량 | string | Y | 6 |  |
| `TOTAL_ASKP_RSQN` | 총 매도호가 잔량 | string | Y | 6 |  |
| `TOTAL_BIDP_RSQN` | 총 매수호가 잔량 | string | Y | 6 |  |
| `PRDY_VOL_VRSS_ACML_VOL_RATE` | 전일 거래량 대비 등락율 | string | Y | 6 |  |
| `AVRG_VLTL` | 평균 변동성 | string | Y | 6 |  |
| `DSCS_LRQN_VOL` | 협의대량누적 거래량 | string | Y | 6 |  |
| `DYNM_MXPR` | 실시간상한가 | string | Y | 6 |  |
| `DYNM_LLAM` | 실시간하한가 | string | Y | 6 |  |
| `DYNM_PRC_LIMT_YN` | 실시간가격제한구분 | string | Y | 6 |  |

---
### 38. KRX야간옵션 실시간호가

| Field | Value |
|---|---|
| Sheet | `KRX야간옵션 실시간호가` |
| Menu | [국내선물옵션] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0EUASP0` |
| TR_ID (실전) | `H0EUASP0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | 1: 등록, 2:해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0EUASP0 |
| `tr_key` | 구분값 | string | Y | 12 | 야간옵션 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `OPTN_SHRN_ISCD` | 옵션단축종목코드 | string | Y | 9 |  |
| `BSOP_HOUR` | 영업시간 | string | Y | 6 |  |
| `OPTN_ASKP1` | 옵션매도호가1 | string | Y | 1 |  |
| `OPTN_ASKP2` | 옵션매도호가2 | string | Y | 1 |  |
| `OPTN_ASKP3` | 옵션매도호가3 | string | Y | 1 |  |
| `OPTN_ASKP4` | 옵션매도호가4 | string | Y | 1 |  |
| `OPTN_ASKP5` | 옵션매도호가5 | string | Y | 1 |  |
| `OPTN_BIDP1` | 옵션매수호가1 | string | Y | 1 |  |
| `OPTN_BIDP2` | 옵션매수호가2 | string | Y | 1 |  |
| `OPTN_BIDP3` | 옵션매수호가3 | string | Y | 1 |  |
| `OPTN_BIDP4` | 옵션매수호가4 | string | Y | 1 |  |
| `OPTN_BIDP5` | 옵션매수호가5 | string | Y | 1 |  |
| `ASKP_CSNU1` | 매도호가건수1 | string | Y | 1 |  |
| `ASKP_CSNU2` | 매도호가건수2 | string | Y | 1 |  |
| `ASKP_CSNU3` | 매도호가건수3 | string | Y | 1 |  |
| `ASKP_CSNU4` | 매도호가건수4 | string | Y | 1 |  |
| `ASKP_CSNU5` | 매도호가건수5 | string | Y | 1 |  |
| `BIDP_CSNU1` | 매수호가건수1 | string | Y | 1 |  |
| `BIDP_CSNU2` | 매수호가건수2 | string | Y | 1 |  |
| `BIDP_CSNU3` | 매수호가건수3 | string | Y | 1 |  |
| `BIDP_CSNU4` | 매수호가건수4 | string | Y | 1 |  |
| `BIDP_CSNU5` | 매수호가건수5 | string | Y | 1 |  |
| `ASKP_RSQN1` | 매도호가잔량1 | string | Y | 1 |  |
| `ASKP_RSQN2` | 매도호가잔량2 | string | Y | 1 |  |
| `ASKP_RSQN3` | 매도호가잔량3 | string | Y | 1 |  |
| `ASKP_RSQN4` | 매도호가잔량4 | string | Y | 1 |  |
| `ASKP_RSQN5` | 매도호가잔량5 | string | Y | 1 |  |
| `BIDP_RSQN1` | 매수호가잔량1 | string | Y | 1 |  |
| `BIDP_RSQN2` | 매수호가잔량2 | string | Y | 1 |  |
| `BIDP_RSQN3` | 매수호가잔량3 | string | Y | 1 |  |
| `BIDP_RSQN4` | 매수호가잔량4 | string | Y | 1 |  |
| `BIDP_RSQN5` | 매수호가잔량5 | string | Y | 1 |  |
| `TOTAL_ASKP_CSNU` | 총매도호가건수 | string | Y | 1 |  |
| `TOTAL_BIDP_CSNU` | 총매수호가건수 | string | Y | 1 |  |
| `TOTAL_ASKP_RSQN` | 총매도호가잔량 | string | Y | 1 |  |
| `TOTAL_BIDP_RSQN` | 총매수호가잔량 | string | Y | 1 |  |
| `TOTAL_ASKP_RSQN_ICDC` | 총매도호가잔량증감 | string | Y | 1 |  |
| `TOTAL_BIDP_RSQN_ICDC` | 총매수호가잔량증감 | string | Y | 1 |  |

**Request Example:**
```
{      "header": {          "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",          "custtype": "P",          "tr_type": "1",          "content-type": "utf-8"      },      "body": {          "input": {              "tr_id": "H0EUASP0",              "tr_key": "301V06362"          }      }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "H0EUASP0",           "tr_key": "301V06362",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output  0\|H0EUASP0\|001\|301V06362^190159^2.98^2.99^3.00^0.00^0.00^2.97^2.96^2.95^0.00^0.00^0  ^0^0^0^0^0^0^0^0^0^1^3^12^0^0^9^21^16^0^0^0^0^16^46^5^0    # output - 복호화 후  #### 야간옵션(EUREX) 호가 ####  야간옵션(EUREX)  [301V06362]  영업시간  [190215]  ====================================  옵션매도호가1   [2.98],    매도호가건수1        [0],    매도호가잔량1   [1]  옵션매도호가2   [3.00],    매도호가건수2        [0],    매도호가잔량2   [6]  옵션매도호가3   [3.01],    매도호가건수3        [0],    매도호가잔량3   [15]  옵션매도호가4   [0.00],    매도호가건수4        [0],    매도호가잔량4   [0]  옵션매도호가5   [0.00],    매도호가건수5        [0],    매도호가잔량5   [0]  옵션매수호가1   [2.97],    매수호가건수1        [0],    매수호가잔량1   [10]  옵션매수호가2   [2.96],    매수호가건수2        [0],    매수호가잔량2   [21]  옵션매수호가3   [2.95],    매수호가건수3        [0],    매수호가잔량3   [16]  옵션매수호가4   [0.00],   매수호가건수4 [0],    매수호가잔량4   [0]  옵션매수호가5   [0.00],    매수호가건수5        [0],    매수호가잔량5   [0]  ====================================  총매도호가건수  [0],    총매도호가잔량  [22],    총매도호가잔량증감     [-1]  총매수호가건수  [0],    총매수호가잔량  [47],    총매수호가잔량증감     [1]
```

---
### 39. 상품선물 실시간호가

| Field | Value |
|---|---|
| Sheet | `상품선물 실시간호가` |
| Menu | [국내선물옵션] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0CFASP0` |
| TR_ID (실전) | `H0CFASP0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | "1: 등록, 2:해제" |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 7 | H0CFASP0 |
| `tr_key` | 종목코드 | string | Y | 6 | 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FUTS_SHRN_ISCD` | 선물 단축 종목코드 | object | Y | 32 | '각 항목사이에는 구분자로 ^ 사용,  모든 데이터타입은 String으로 변환되어 push 처리됨' |
| `BSOP_HOUR` | 영업 시간 | string | Y | 9 |  |
| `FUTS_ASKP1` | 선물 매도호가1 | string | Y | 6 |  |
| `FUTS_ASKP2` | 선물 매도호가2 | string | Y | 8 |  |
| `FUTS_ASKP3` | 선물 매도호가3 | string | Y | 1 |  |
| `FUTS_ASKP4` | 선물 매도호가4 | string | Y | 8 |  |
| `FUTS_ASKP5` | 선물 매도호가5 | string | Y | 8 |  |
| `FUTS_BIDP1` | 선물 매수호가1 | string | Y | 8 |  |
| `FUTS_BIDP2` | 선물 매수호가2 | string | Y | 8 |  |
| `FUTS_BIDP3` | 선물 매수호가3 | string | Y | 8 |  |
| `FUTS_BIDP4` | 선물 매수호가4 | string | Y | 8 |  |
| `FUTS_BIDP5` | 선물 매수호가5 | string | Y | 8 |  |
| `ASKP_CSNU1` | 매도호가 건수1 | string | Y | 8 |  |
| `ASKP_CSNU2` | 매도호가 건수2 | string | Y | 8 |  |
| `ASKP_CSNU3` | 매도호가 건수3 | string | Y | 8 |  |
| `ASKP_CSNU4` | 매도호가 건수4 | string | Y | 8 |  |
| `ASKP_CSNU5` | 매도호가 건수5 | string | Y | 8 |  |
| `BIDP_CSNU1` | 매수호가 건수1 | string | Y | 8 |  |
| `BIDP_CSNU2` | 매수호가 건수2 | string | Y | 8 |  |
| `BIDP_CSNU3` | 매수호가 건수3 | string | Y | 8 |  |
| `BIDP_CSNU4` | 매수호가 건수4 | string | Y | 4 |  |
| `BIDP_CSNU5` | 매수호가 건수5 | string | Y | 6 |  |
| `ASKP_RSQN1` | 매도호가 잔량1 | string | Y | 1 |  |
| `ASKP_RSQN2` | 매도호가 잔량2 | string | Y | 8 |  |
| `ASKP_RSQN3` | 매도호가 잔량3 | string | Y | 6 |  |
| `ASKP_RSQN4` | 매도호가 잔량4 | string | Y | 1 |  |
| `ASKP_RSQN5` | 매도호가 잔량5 | string | Y | 8 |  |
| `BIDP_RSQN1` | 매수호가 잔량1 | string | Y | 6 |  |
| `BIDP_RSQN2` | 매수호가 잔량2 | string | Y | 1 |  |
| `BIDP_RSQN3` | 매수호가 잔량3 | string | Y | 8 |  |
| `BIDP_RSQN4` | 매수호가 잔량4 | string | Y | 8 |  |
| `BIDP_RSQN5` | 매수호가 잔량5 | string | Y | 8 |  |
| `TOTAL_ASKP_CSNU` | 총 매도호가 건수 | string | Y | 8 |  |
| `TOTAL_BIDP_CSNU` | 총 매수호가 건수 | string | Y | 4 |  |
| `TOTAL_ASKP_RSQN` | 총 매도호가 잔량 | string | Y | 8 |  |
| `TOTAL_BIDP_RSQN` | 총 매수호가 잔량 | string | Y | 8 |  |
| `TOTAL_ASKP_RSQN_ICDC` | 총 매도호가 잔량 증감 | string | Y | 8 |  |
| `TOTAL_BIDP_RSQN_ICDC` | 총 매수호가 잔량 증감 | string | Y | 8 |  |

---
### 40. 주식옵션 실시간예상체결

| Field | Value |
|---|---|
| Sheet | `주식옵션 실시간예상체결` |
| Menu | [국내선물옵션] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0ZOANC0` |
| TR_ID (실전) | `H0ZOANC0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | 1: 등록, 2:해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0ZOANC0 |
| `tr_key` | 구분값 | string | Y | 12 | 주식옵션 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `OPTN_SHRN_ISCD` | 옵션단축종목코드 | string | Y | 9 |  |
| `BSOP_HOUR` | 영업시간 | string | Y | 6 |  |
| `ANTC_CNPR` | 예상체결가 | string | Y | 8 |  |
| `ANTC_CNTG_VRSS` | 예상체결대비 | string | Y | 8 |  |
| `ANTC_CNTG_VRSS_SIGN` | 예상체결대비부호 | string | Y | 1 |  |
| `ANTC_CNTG_PRDY_CTRT` | 예상체결전일대비율 | string | Y | 8 |  |
| `ANTC_MKOP_CLS_CODE` | 예상장운영구분코드 | string | Y | 3 |  |

---
### 41. 주식선물 실시간호가

| Field | Value |
|---|---|
| Sheet | `주식선물 실시간호가` |
| Menu | [국내선물옵션] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0ZFASP0` |
| TR_ID (실전) | `H0ZFASP0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | "1: 등록, 2:해제" |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 7 | H0ZFASP0 |
| `tr_key` | 종목코드 | string | Y | 6 | 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FUTS_SHRN_ISCD` | 선물단축종목코드 | object | Y | 9 | '각 항목사이에는 구분자로 ^ 사용,  모든 데이터타입은 String으로 변환되어 push 처리됨' |
| `BSOP_HOUR` | 영업시간 | string | Y | 6 |  |
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
| `ASKP_CSNU1` | 매도호가건수1 | string | Y | 1 |  |
| `ASKP_CSNU2` | 매도호가건수2 | string | Y | 1 |  |
| `ASKP_CSNU3` | 매도호가건수3 | string | Y | 1 |  |
| `ASKP_CSNU4` | 매도호가건수4 | string | Y | 1 |  |
| `ASKP_CSNU5` | 매도호가건수5 | string | Y | 1 |  |
| `ASKP_CSNU6` | 매도호가건수6 | string | Y | 1 |  |
| `ASKP_CSNU7` | 매도호가건수7 | string | Y | 1 |  |
| `ASKP_CSNU8` | 매도호가건수8 | string | Y | 1 |  |
| `ASKP_CSNU9` | 매도호가건수9 | string | Y | 1 |  |
| `ASKP_CSNU10` | 매도호가건수10 | string | Y | 1 |  |
| `BIDP_CSNU1` | 매수호가건수1 | string | Y | 1 |  |
| `BIDP_CSNU2` | 매수호가건수2 | string | Y | 1 |  |
| `BIDP_CSNU3` | 매수호가건수3 | string | Y | 1 |  |
| `BIDP_CSNU4` | 매수호가건수4 | string | Y | 1 |  |
| `BIDP_CSNU5` | 매수호가건수5 | string | Y | 1 |  |
| `BIDP_CSNU6` | 매수호가건수6 | string | Y | 1 |  |
| `BIDP_CSNU7` | 매수호가건수7 | string | Y | 1 |  |
| `BIDP_CSNU8` | 매수호가건수8 | string | Y | 1 |  |
| `BIDP_CSNU9` | 매수호가건수9 | string | Y | 1 |  |
| `BIDP_CSNU10` | 매수호가건수10 | string | Y | 1 |  |
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
| `TOTAL_ASKP_CSNU` | 총매도호가건수 | string | Y | 1 |  |
| `TOTAL_BIDP_CSNU` | 총매수호가건수 | string | Y | 1 |  |
| `TOTAL_ASKP_RSQN` | 총매도호가잔량 | string | Y | 1 |  |
| `TOTAL_BIDP_RSQN` | 총매수호가잔량 | string | Y | 1 |  |
| `TOTAL_ASKP_RSQN_ICDC` | 총매도호가잔량증감 | string | Y | 1 |  |
| `TOTAL_BIDP_RSQN_ICDC` | 총매수호가잔량증감 | string | Y | 1 |  |

**Request Example:**
```
{      "header": {          "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",          "custtype": "P",          "tr_type": "1",          "content-type": "utf-8"      },      "body": {          "input": {              "tr_id": "H0ZFASP0",              "tr_key": "111V06"          }      }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "H0ZFASP0",           "tr_key": "111V06",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output  0\|H0ZFASP0\|001\|111V06^092304^79700^79800^79900^80000^80200^80300^80500^81100^8490  0^85900^79500^79400^79300^79200^79100^79000^78900^78800^78700^78600^1^18^6^2^2^1^3^1^1^1^8^6^4^8^4^  8^7^11^11^3^950^4148^988^6^9^1^3^15^5^10^4404^2277^1321^3440^330^2237^1835^362^83^15^36^97^6135^165  09^950^0
```

---
### 42. 주식옵션 실시간체결가

| Field | Value |
|---|---|
| Sheet | `주식옵션 실시간체결가` |
| Menu | [국내선물옵션] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0ZOCNT0` |
| TR_ID (실전) | `H0ZOCNT0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | "1: 등록, 2:해제" |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 7 | H0ZOCNT0 |
| `tr_key` | 종목코드 | string | Y | 6 | 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `OPTN_SHRN_ISCD` | 옵션단축종목코드 | object | Y | 9 | '각 항목사이에는 구분자로 ^ 사용,  모든 데이터타입은 String으로 변환되어 push 처리됨' |
| `BSOP_HOUR` | 영업시간 | string | Y | 6 |  |
| `OPTN_PRPR` | 옵션현재가 | string | Y | 1 |  |
| `PRDY_VRSS_SIGN` | 전일대비부호 | string | Y | 1 |  |
| `OPTN_PRDY_VRSS` | 옵션전일대비 | string | Y | 1 |  |
| `PRDY_CTRT` | 전일대비율 | string | Y | 1 |  |
| `OPTN_OPRC` | 옵션시가2 | string | Y | 1 |  |
| `OPTN_HGPR` | 옵션최고가 | string | Y | 1 |  |
| `OPTN_LWPR` | 옵션최저가 | string | Y | 1 |  |
| `LAST_CNQN` | 최종거래량 | string | Y | 1 |  |
| `ACML_VOL` | 누적거래량 | string | Y | 1 |  |
| `ACML_TR_PBMN` | 누적거래대금 | string | Y | 1 |  |
| `HTS_THPR` | HTS이론가 | string | Y | 1 |  |
| `HTS_OTST_STPL_QTY` | HTS미결제약정수량 | string | Y | 1 |  |
| `OTST_STPL_QTY_ICDC` | 미결제약정수량증감 | string | Y | 1 |  |
| `OPRC_HOUR` | 시가시간 | string | Y | 6 |  |
| `OPRC_VRSS_PRPR_SIGN` | 시가2대비현재가부호 | string | Y | 1 |  |
| `OPRC_VRSS_NMIX_PRPR` | 시가대비지수현재가 | string | Y | 1 |  |
| `HGPR_HOUR` | 최고가시간 | string | Y | 6 |  |
| `HGPR_VRSS_PRPR_SIGN` | 최고가대비현재가부호 | string | Y | 1 |  |
| `HGPR_VRSS_NMIX_PRPR` | 최고가대비지수현재가 | string | Y | 1 |  |
| `LWPR_HOUR` | 최저가시간 | string | Y | 6 |  |
| `LWPR_VRSS_PRPR_SIGN` | 최저가대비현재가부호 | string | Y | 1 |  |
| `LWPR_VRSS_NMIX_PRPR` | 최저가대비지수현재가 | string | Y | 1 |  |
| `SHNU_RATE` | 매수2비율 | string | Y | 1 |  |
| `PRMM_VAL` | 프리미엄값 | string | Y | 1 |  |
| `INVL_VAL` | 내재가치값 | string | Y | 1 |  |
| `TMVL_VAL` | 시간가치값 | string | Y | 1 |  |
| `DELTA` | 델타 | string | Y | 1 |  |
| `GAMA` | 감마 | string | Y | 1 |  |
| `VEGA` | 베가 | string | Y | 1 |  |
| `THETA` | 세타 | string | Y | 1 |  |
| `RHO` | 로우 | string | Y | 1 |  |
| `HTS_INTS_VLTL` | HTS내재변동성 | string | Y | 1 |  |
| `ESDG` | 괴리도 | string | Y | 1 |  |
| `OTST_STPL_RGBF_QTY_ICDC` | 미결제약정직전수량증감 | string | Y | 1 |  |
| `THPR_BASIS` | 이론베이시스 | string | Y | 1 |  |
| `UNAS_HIST_VLTL` | 역사적변동성 | string | Y | 1 |  |
| `CTTR` | 체결강도 | string | Y | 1 |  |
| `DPRT` | 괴리율 | string | Y | 1 |  |
| `MRKT_BASIS` | 시장베이시스 | string | Y | 1 |  |
| `OPTN_ASKP1` | 옵션매도호가1 | string | Y | 1 |  |
| `OPTN_BIDP1` | 옵션매수호가1 | string | Y | 1 |  |
| `ASKP_RSQN1` | 매도호가잔량1 | string | Y | 1 |  |
| `BIDP_RSQN1` | 매수호가잔량1 | string | Y | 1 |  |
| `SELN_CNTG_CSNU` | 매도체결건수 | string | Y | 1 |  |
| `SHNU_CNTG_CSNU` | 매수체결건수 | string | Y | 1 |  |
| `NTBY_CNTG_CSNU` | 순매수체결건수 | string | Y | 1 |  |
| `SELN_CNTG_SMTN` | 총매도수량 | string | Y | 1 |  |
| `SHNU_CNTG_SMTN` | 총매수수량 | string | Y | 1 |  |
| `TOTAL_ASKP_RSQN` | 총매도호가잔량 | string | Y | 1 |  |
| `TOTAL_BIDP_RSQN` | 총매수호가잔량 | string | Y | 1 |  |
| `PRDY_VOL_VRSS_ACML_VOL_RATE` | 전일거래량대비등락율 | string | Y | 1 |  |

**Request Example:**
```
{      "header": {          "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",          "custtype": "P",          "tr_type": "1",          "content-type": "utf-8"      },      "body": {          "input": {              "tr_id": "H0ZOCNT0",              "tr_key": "211V05059"          }      }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "H0ZOCNT0",           "tr_key": "211V05059",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output  0\|H0ZOCNT0\|001\|211V05059^091940^1060.00^5^-120.00^-10.17^970.00^1140.00^970  .00^6^563^5933200^35464.07^1134^-2^000000^2^90.00^000000^5^-80.00^000000^2^90.00^0.43^0.00^0.  00^1060.00^1.00^0.00^0.00^-4.06^20.58^0.31^-34404.07^0^-41735.93^0.26^74.84^-97.01^-76140.00^  1100.00^1040.00^6^175^13^16^3^322^241^241^184^12.33
```

---
### 43. 지수옵션 실시간호가

| Field | Value |
|---|---|
| Sheet | `지수옵션 실시간호가` |
| Menu | [국내선물옵션] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0IOASP0` |
| TR_ID (실전) | `H0IOASP0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | "1: 등록, 2:해제" |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 7 | H0IOASP0 |
| `tr_key` | 코드 | string | Y | 6 | 예:201S11305 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `OPTN_SHRN_ISCD` | 옵션 단축 종목코드 | object | Y | 16 | '각 항목사이에는 구분자로 ^ 사용,  모든 데이터타입은 String으로 변환되어 push 처리됨' |
| `BSOP_HOUR` | 영업 시간 | string | Y | 16 |  |
| `OPTN_ASKP1` | 옵션 매도호가1 | string | Y | 1 |  |
| `OPTN_ASKP2` | 옵션 매도호가2 | string | Y | 8 |  |
| `OPTN_ASKP3` | 옵션 매도호가3 | string | Y | 8 |  |
| `OPTN_ASKP4` | 옵션 매도호가4 | string | Y | 8 |  |
| `OPTN_ASKP5` | 옵션 매도호가5 | string | Y | 8 |  |
| `OPTN_BIDP1` | 옵션 매수호가1 | string | Y | 8 |  |
| `OPTN_BIDP2` | 옵션 매수호가2 | string | Y | 8 |  |
| `OPTN_BIDP3` | 옵션 매수호가3 | string | Y | 8 |  |
| `OPTN_BIDP4` | 옵션 매수호가4 | string | Y | 8 |  |
| `OPTN_BIDP5` | 옵션 매수호가5 | string | Y | 8 |  |
| `ASKP_CSNU1` | 매도호가 건수1 | string | Y | 8 |  |
| `ASKP_CSNU2` | 매도호가 건수2 | string | Y | 8 |  |
| `ASKP_CSNU3` | 매도호가 건수3 | string | Y | 8 |  |
| `ASKP_CSNU4` | 매도호가 건수4 | string | Y | 8 |  |
| `ASKP_CSNU5` | 매도호가 건수5 | string | Y | 8 |  |
| `BIDP_CSNU1` | 매수호가 건수1 | string | Y | 8 |  |
| `BIDP_CSNU2` | 매수호가 건수2 | string | Y | 8 |  |
| `BIDP_CSNU3` | 매수호가 건수3 | string | Y | 8 |  |
| `BIDP_CSNU4` | 매수호가 건수4 | string | Y | 8 |  |
| `BIDP_CSNU5` | 매수호가 건수5 | string | Y | 8 |  |
| `ASKP_RSQN1` | 매도호가 잔량1 | string | Y | 8 |  |
| `ASKP_RSQN2` | 매도호가 잔량2 | string | Y | 8 |  |
| `ASKP_RSQN3` | 매도호가 잔량3 | string | Y | 8 |  |
| `ASKP_RSQN4` | 매도호가 잔량4 | string | Y | 8 |  |
| `ASKP_RSQN5` | 매도호가 잔량5 | string | Y | 8 |  |
| `BIDP_RSQN1` | 매수호가 잔량1 | string | Y | 8 |  |
| `BIDP_RSQN2` | 매수호가 잔량2 | string | Y | 8 |  |
| `BIDP_RSQN3` | 매수호가 잔량3 | string | Y | 8 |  |
| `BIDP_RSQN4` | 매수호가 잔량4 | string | Y | 8 |  |
| `BIDP_RSQN5` | 매수호가 잔량5 | string | Y | 8 |  |
| `TOTAL_ASKP_CSNU` | 총 매도호가 건수 | string | Y | 8 |  |
| `TOTAL_BIDP_CSNU` | 총 매수호가 건수 | string | Y | 8 |  |
| `TOTAL_ASKP_RSQN` | 총 매도호가 잔량 | string | Y | 8 |  |
| `TOTAL_BIDP_RSQN` | 총 매수호가 잔량 | string | Y | 8 |  |
| `TOTAL_ASKP_RSQN_ICDC` | 총 매도호가 잔량 증감 | string | Y | 8 |  |
| `TOTAL_BIDP_RSQN_ICDC` | 총 매수호가 잔량 증감 | string | Y | 8 |  |

---
### 44. 주식선물 실시간체결가

| Field | Value |
|---|---|
| Sheet | `주식선물 실시간체결가` |
| Menu | [국내선물옵션] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0ZFCNT0` |
| TR_ID (실전) | `H0ZFCNT0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | "1: 등록, 2:해제" |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 7 | H0ZFCNT0 |
| `tr_key` | 종목코드 | string | Y | 6 | 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FUTS_SHRN_ISCD` | 선물단축종목코드 | object | Y | 9 | '각 항목사이에는 구분자로 ^ 사용,  모든 데이터타입은 String으로 변환되어 push 처리됨' |
| `BSOP_HOUR` | 영업시간 | string | Y | 6 |  |
| `STCK_PRPR` | 주식현재가 | string | Y | 4 |  |
| `PRDY_VRSS_SIGN` | 전일대비부호 | string | Y | 1 |  |
| `PRDY_VRSS` | 전일대비 | string | Y | 4 |  |
| `FUTS_PRDY_CTRT` | 선물전일대비율 | string | Y | 8 |  |
| `STCK_OPRC` | 주식시가2 | string | Y | 4 |  |
| `STCK_HGPR` | 주식최고가 | string | Y | 4 |  |
| `STCK_LWPR` | 주식최저가 | string | Y | 4 |  |
| `LAST_CNQN` | 최종거래량 | string | Y | 8 |  |
| `ACML_VOL` | 누적거래량 | string | Y | 8 |  |
| `ACML_TR_PBMN` | 누적거래대금 | string | Y | 8 |  |
| `HTS_THPR` | HTS이론가 | string | Y | 8 |  |
| `MRKT_BASIS` | 시장베이시스 | string | Y | 8 |  |
| `DPRT` | 괴리율 | string | Y | 8 |  |
| `NMSC_FCTN_STPL_PRC` | 근월물약정가 | string | Y | 8 |  |
| `FMSC_FCTN_STPL_PRC` | 원월물약정가 | string | Y | 8 |  |
| `SPEAD_PRC` | 스프레드1 | string | Y | 8 |  |
| `HTS_OTST_STPL_QTY` | HTS미결제약정수량 | string | Y | 8 |  |
| `OTST_STPL_QTY_ICDC` | 미결제약정수량증감 | string | Y | 4 |  |
| `OPRC_HOUR` | 시가시간 | string | Y | 6 |  |
| `OPRC_VRSS_PRPR_SIGN` | 시가2대비현재가부호 | string | Y | 1 |  |
| `OPRC_VRSS_PRPR` | 시가2대비현재가 | string | Y | 4 |  |
| `HGPR_HOUR` | 최고가시간 | string | Y | 6 |  |
| `HGPR_VRSS_PRPR_SIGN` | 최고가대비현재가부호 | string | Y | 1 |  |
| `HGPR_VRSS_PRPR` | 최고가대비현재가 | string | Y | 4 |  |
| `LWPR_HOUR` | 최저가시간 | string | Y | 6 |  |
| `LWPR_VRSS_PRPR_SIGN` | 최저가대비현재가부호 | string | Y | 1 |  |
| `LWPR_VRSS_PRPR` | 최저가대비현재가 | string | Y | 4 |  |
| `SHNU_RATE` | 매수2비율 | string | Y | 8 |  |
| `CTTR` | 체결강도 | string | Y | 8 |  |
| `ESDG` | 괴리도 | string | Y | 8 |  |
| `OTST_STPL_RGBF_QTY_ICDC` | 미결제약정직전수량증감 | string | Y | 4 |  |
| `THPR_BASIS` | 이론베이시스 | string | Y | 8 |  |
| `ASKP1` | 매도호가1 | string | Y | 4 |  |
| `BIDP1` | 매수호가1 | string | Y | 4 |  |
| `ASKP_RSQN1` | 매도호가잔량1 | string | Y | 8 |  |
| `BIDP_RSQN1` | 매수호가잔량1 | string | Y | 8 |  |
| `SELN_CNTG_CSNU` | 매도체결건수 | string | Y | 4 |  |
| `SHNU_CNTG_CSNU` | 매수체결건수 | string | Y | 4 |  |
| `NTBY_CNTG_CSNU` | 순매수체결건수 | string | Y | 4 |  |
| `SELN_CNTG_SMTN` | 총매도수량 | string | Y | 8 |  |
| `SHNU_CNTG_SMTN` | 총매수수량 | string | Y | 8 |  |
| `TOTAL_ASKP_RSQN` | 총매도호가잔량 | string | Y | 8 |  |
| `TOTAL_BIDP_RSQN` | 총매수호가잔량 | string | Y | 8 |  |
| `PRDY_VOL_VRSS_ACML_VOL_RATE` | 전일거래량대비등락율 | string | Y | 8 |  |
| `DYNM_MXPR` | 실시간상한가 | string | Y | 4 |  |
| `DYNM_LLAM` | 실시간하한가 | string | Y | 4 |  |
| `DYNM_PRC_LIMT_YN` | 실시간가격제한구분 | string | Y | 1 |  |

**Request Example:**
```
{      "header": {          "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",          "custtype": "P",          "tr_type": "1",          "content-type": "utf-8"      },      "body": {          "input": {              "tr_id": "H0ZFCNT0",              "tr_key": "111V06"          }      }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "H0ZFCNT0",           "tr_key": "111V06",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output  0\|H0ZFCNT0\|001\|111V06^091639^77900^5^-100^-0.13^77900^77900^77300^5^1724^13  37128000^77899.50^400.00^0.00^0.00^0.00^-500.00^32053^219^000000^3^0^000000^3^0^000000^2^600^  0.36^58.23^0.50^-1^399.50^77900^77800^0^0^105^36^-69^1075^626^0^0^6.23^0^0^0
```

---
