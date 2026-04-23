# [장내채권] API

한국투자증권 OpenAPI — `[장내채권]` 카테고리 (18개).
원본 시트는 cp949 엑셀이며 본 파일은 LLM 친화 변환본. 검색은 `INDEX.md` 권장.

공통 OAuth 헤더(`authorization`, `appkey`, `appsecret`, `tr_id`, `custtype` 등)는 모든 API 동일하므로 본 문서에서 생략. `INDEX.md` 상단 참고.

---
### 1. 장내채권 매수주문

| Field | Value |
|---|---|
| Sheet | `장내채권 매수주문` |
| Menu | [장내채권] 주문/계좌 |
| Method | `POST` |
| URL | `/uapi/domestic-bond/v1/trading/buy` |
| TR_ID (실전) | `TTTC0952U` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 |  |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 |  |
| `PDNO` | 상품번호 | string | Y | 12 |  |
| `ORD_QTY2` | 주문수량2 | string | Y | 19 | SAMT_MKET_PTCI_YN(소액시장참여여부) : N(일반시장) 입력 시 10단위 입력 |
| `BOND_ORD_UNPR` | 채권주문단가 | string | Y | 182 |  |
| `SAMT_MKET_PTCI_YN` | 소액시장참여여부 | string | Y | 1 | N: 일반시장, Y: 소액시장 |
| `BOND_RTL_MKET_YN` | 채권소매시장여부 | string | Y | 1 | Y, N |
| `IDCR_STFNO` | 유치자직원번호 | string | Y | 6 | 공백 |
| `MGCO_APTM_ODNO` | 운용사지정주문번호 | string | Y | 12 | 공백 |
| `ORD_SVR_DVSN_CD` | 주문서버구분코드 | string | Y | 1 | Unique key(0) |
| `CTAC_TLNO` | 연락전화번호 | string | Y | 20 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object | Y |  |  |
| `krx_fwdg_ord_orgno` | 한국거래소전송주문조직번호 | string | Y | 5 |  |
| `odno` | 주문번호 | string | Y | 10 |  |
| `ord_tmd` | 주문시각 | string | Y | 6 |  |

**Request Example:**
```
{      "CANO": "12345678",      "ACNT_PRDT_CD": "01",      "PDNO": "KR6095572D81",      "ORD_QTY2": "1",      "BOND_ORD_UNPR":"10000",      "SAMT_MKET_PTCI_YN":"N",      "BOND_RTL_MKET_YN":"N",      "IDCR_STFNO":"",      "MGCO_APTM_ODNO":"",      "ORD_SVR_DVSN_CD":"0",      "CTAC_TLNO":""  }
```

**Response Example:**
```
{      "rt_cd": "0",      "msg_cd": "APBK0013",      "msg1": "주문 전송 완료 되었습니다.",      "output": {          "KRX_FWDG_ORD_ORGNO": "01790",          "ODNO": "0000015401",          "ORD_TMD": "104258"      }  }
```

---
### 2. 장내채권 매도주문

| Field | Value |
|---|---|
| Sheet | `장내채권 매도주문` |
| Menu | [장내채권] 주문/계좌 |
| Method | `POST` |
| URL | `/uapi/domestic-bond/v1/trading/sell` |
| TR_ID (실전) | `TTTC0958U` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 |  |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 |  |
| `ORD_DVSN` | 주문구분 | string | Y | 2 | '01: 종목별 (매수일자, 매수순번 공백입력)   02: 일자별 (매수순번: 0 입력)   03: 체결가별 ' |
| `PDNO` | 상품번호 | string | Y | 12 |  |
| `ORD_QTY2` | 주문수량2 | string | Y | 4 | SAMT_MKET_PTCI_YN(소액시장참여여부) : N(일반시장) 입력 시 10단위 입력 |
| `BOND_ORD_UNPR` | 주문단가 | string | Y | 8 |  |
| `SPRX_YN` | 분리과세여부 | string | Y | 1 | N: 종합과세, Y:분리과세 |
| `BUY_DT` | 매수일자 | string | Y | 8 | (잔고조회 참조) |
| `BUY_SEQ` | 매수순번 | string | Y | 10 | (잔고조회 참조) |
| `SAMT_MKET_PTCI_YN` | 소액시장참여여부 | string | Y | 1 | N: 일반시장, Y: 소액시장 |
| `SLL_AGCO_OPPS_SLL_YN` | 매도대행사반대매도여부 | string | Y | 1 | N |
| `BOND_RTL_MKET_YN` | 채권소매시장여부 | string | Y | 1 | N |
| `MGCO_APTM_ODNO` | 운용사지정주문번호 | string | Y | 12 | 공백 |
| `ORD_SVR_DVSN_CD` | 주문서버구분코드 | string | Y | 1 | Unique key(0) |
| `CTAC_TLNO` | 연락전화번호 | string | Y | 20 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object | Y |  |  |
| `krx_fwdg_ord_orgno` | 한국거래소전송주문조직번호 | string | Y | 5 |  |
| `odno` | 주문번호 | string | Y | 10 |  |
| `ord_tmd` | 주문시각 | string | Y | 6 |  |

**Request Example:**
```
{      "CANO": "12345678",      "ACNT_PRDT_CD": "01",      "ORD_DVSN":"01",      "PDNO":"KR6095572D81",      "ORD_QTY2":"1",      "BOND_ORD_UNPR":"10450",      "SPRX_YN":"N",      "BUY_DT":"",      "BUY_SEQ":"",      "SAMT_MKET_PTCI_YN":"N",      "SLL_AGCO_OPPS_SLL_YN":"N",      "BOND_RTL_MKET_YN":"N",      "MGCO_APTM_ODNO":"",      "ORD_SVR_DVSN_CD":"0",      "CTAC_TLNO":""  }
```

**Response Example:**
```
{      "rt_cd": "0",      "msg_cd": "APBK0013",      "msg1": "주문 전송 완료 되었습니다.",      "output": {          "KRX_FWDG_ORD_ORGNO": "01790",          "ODNO": "0000015402",          "ORD_TMD": "104347"      }  }
```

---
### 3. 장내채권 정정취소주문

| Field | Value |
|---|---|
| Sheet | `장내채권 정정취소주문` |
| Menu | [장내채권] 주문/계좌 |
| Method | `POST` |
| URL | `/uapi/domestic-bond/v1/trading/order-rvsecncl` |
| TR_ID (실전) | `TTTC0953U` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | - |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | - |
| `PDNO` | 상품번호 | string | Y | 12 | - |
| `ORGN_ODNO` | 원주문번호 | string | Y | 10 | - |
| `ORD_QTY2` | 주문수량2 | string | Y | 19 | 원주문이 일반시장 주문일 시 10단위 입력 |
| `BOND_ORD_UNPR` | 채권주문단가 | string | Y | 182 | - |
| `QTY_ALL_ORD_YN` | 잔량전부주문여부 | string | Y | 1 | Y: 잔량전부(주문수량 입력안함), |
| `RVSE_CNCL_DVSN_CD` | 정정취소구분코드 | string | Y | 2 | 01: 정정, 02: 취소 |
| `MGCO_APTM_ODNO` | 운용사지정주문번호 | string | Y | 12 | 공백 |
| `ORD_SVR_DVSN_CD` | 주문서버구분코드 | string | Y | 1 | Unique key(0) |
| `CTAC_TLNO` | 연락전화번호 | string | Y | 20 | - |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object | Y |  |  |
| `krx_fwdg_ord_orgno` | 한국거래소전송주문조직번호 | string | Y | 5 |  |
| `odno` | 주문번호 | string | Y | 10 |  |
| `ord_tmd` | 주문시각 | string | Y | 6 |  |

**Request Example:**
```
{      "CANO": "12345678",      "ACNT_PRDT_CD": "01",      "PDNO": "KR6095572D81",      "ORGN_ODNO": "0000015402",      "ORD_QTY2": "2",      "BOND_ORD_UNPR": "10460",      "QTY_ALL_ORD_YN": "Y",      "RVSE_CNCL_DVSN_CD": "01",      "MGCO_APTM_ODNO": "",      "ORD_SVR_DVSN_CD": "0",      "CTAC_TLNO": ""  }
```

**Response Example:**
```
{      "rt_cd": "0",      "msg_cd": "APBK0013",      "msg1": "주문 전송 완료 되었습니다.",      "output": {          "KRX_FWDG_ORD_ORGNO": "01790",          "ODNO": "0000015403",          "ORD_TMD": "104448"      }  }
```

---
### 4. 채권정정취소가능주문조회

| Field | Value |
|---|---|
| Sheet | `채권정정취소가능주문조회` |
| Menu | [장내채권] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-bond/v1/trading/inquire-psbl-rvsecncl` |
| TR_ID (실전) | `CTSC8035R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 |  |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 |  |
| `ORD_DT` | 주문일자 | string | Y | 8 |  |
| `ODNO` | 주문번호 | string | Y | 10 |  |
| `CTX_AREA_FK200` | 연속조회검색조건200 | string | Y | 200 |  |
| `CTX_AREA_NK200` | 연속조회키200 | string | Y | 200 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `odno` | 주문번호 | string | Y | 10 |  |
| `pdno` | 상품번호 | string | Y | 12 |  |
| `rvse_cncl_dvsn_name` | 정정취소구분명 | string | Y | 60 |  |
| `ord_qty` | 주문수량 | string | Y | 10 |  |
| `bond_ord_unpr` | 채권주문단가 | string | Y | 182 |  |
| `ord_tmd` | 주문시각 | string | Y | 6 |  |
| `tot_ccld_qty` | 총체결수량 | string | Y | 10 |  |
| `tot_ccld_amt` | 총체결금액 | string | Y | 19 |  |
| `ord_psbl_qty` | 주문가능수량 | string | Y | 10 |  |
| `orgn_odno` | 원주문번호 | string | Y | 10 |  |
| `sll_buy_dvsn_cd` | 매도매수구분코드 | string | Y | 2 |  |
| `ord_dvsn_cd` | 주문구분코드 | string | Y | 2 |  |
| `mgco_aptm_odno` | 운용사지정주문번호 | string | Y | 12 |  |
| `samt_mket_ptci_yn` | 소액시장참여여부 | string | Y | 1 |  |
| `prdt_abrv_name` | 상품약어명 | string | Y | 60 |  |

**Request Example:**
```
CANO:12345678  ACNT_PRDT_CD:01  ORD_DT:  ODNO:  CTX_AREA_FK200:  CTX_AREA_NK200:
```

**Response Example:**
```
{      "ctx_area_fk200": "0!^null!^null!^null!^null!^null!^null!^null!^null!^null!^null!^null!^null!^null!^null                                                                                                                   ",      "ctx_area_nk200": "                                                                                                                                                                                                        ",      "output": [          {              "odno": "0000015401",              "pdno": "KR6095572D81",              "rvse_cncl_dvsn_name": "현금매수",              "ord_qty": "1",              "bond_ord_unpr": "10000.00",              "ord_tmd": "104258",              "tot_ccld_qty": "0",              "tot_ccld_amt": "0",              "ord_psbl_qty": "1",              "orgn_odno": "",              "sll_buy_dvsn_cd": "02",              "ord_dvsn_cd": "01",              "mgco_aptm_odno": "",              "samt_mket_ptci_yn": "N",              "prdt_abrv_name": "AJ네트웍스63-2"          },          {              "odno": "0000015403",              "pdno": "KR6095572D81",              "rvse_cncl_dvsn_name": "현금매도",              "ord_qty": "1",              "bond_ord_unpr": "10460.00",              "ord_tmd": "104448",              "tot_ccld_qty": "0",              "tot_ccld_amt": "0",              "ord_psbl_qty": "1",              "orgn_odno": "0000015402",              "sll_buy_dvsn_cd": "01",              "ord_dvsn_cd": "01",              "mgco_aptm_odno": "",              "samt_mket_ptci_yn": "N",              "prdt_abrv_name": "AJ네트웍스63-2"          }      ],      "rt_cd": "0",      "msg_cd": "KIOK0460",      "msg1": "조회 되었습니다. (마지막 자료)                                                  "  }
```

---
### 5. 장내채권 주문체결내역

| Field | Value |
|---|---|
| Sheet | `장내채권 주문체결내역` |
| Menu | [장내채권] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-bond/v1/trading/inquire-daily-ccld` |
| TR_ID (실전) | `CTSC8013R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 | 종합계좌번호 |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 | 계좌상품코드 |
| `INQR_STRT_DT` | 조회시작일자 | string | Y | 8 | 일자 ~ (1주일 이내) |
| `INQR_END_DT` | 조회종료일자 | string | Y | 8 | ~ 일자 (조회 당일) |
| `SLL_BUY_DVSN_CD` | 매도매수구분코드 | string | Y | 2 | %(전체), 01(매도), 02(매수) |
| `SORT_SQN_DVSN` | 정렬순서구분 | string | Y | 2 | 01(주문순서), 02(주문역순) |
| `PDNO` | 상품번호 | string | Y | 12 |  |
| `NCCS_YN` | 미체결여부 | string | Y | 1 | N(전체), C(체결), Y(미체결) |
| `CTX_AREA_NK200` | 연속조회키200 | string | Y | 200 |  |
| `CTX_AREA_FK200` | 연속조회검색조건200 | string | Y | 200 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  |  |
| `tot_ord_qty` | 총주문수량 | string | Y | 10 |  |
| `tot_ccld_qty_smtl` | 총체결수량합계 | string | Y | 19 |  |
| `tot_bond_ccld_avg_unpr` | 총채권체결평균단가 | string | Y | 182 |  |
| `tot_ccld_amt_smtl` | 총체결금액합계 | string | Y | 19 |  |
| `output2` | 응답상세 | object | Y |  | array |
| `ord_dt` | 주문일자 | string | Y | 8 |  |
| `odno` | 주문번호 | string | Y | 10 |  |
| `orgn_odno` | 원주문번호 | string | Y | 10 |  |
| `ord_dvsn_name` | 주문구분명 | string | Y | 60 |  |
| `sll_buy_dvsn_cd_name` | 매도매수구분코드명 | string | Y | 60 |  |
| `shtn_pdno` | 단축상품번호 | string | Y | 12 |  |
| `prdt_abrv_name` | 상품약어명 | string | Y | 60 |  |
| `ord_qty` | 주문수량 | string | Y | 10 |  |
| `bond_ord_unpr` | 채권주문단가 | string | Y | 182 |  |
| `ord_tmd` | 주문시각 | string | Y | 6 |  |
| `tot_ccld_qty` | 총체결수량 | string | Y | 10 |  |
| `bond_avg_unpr` | 채권평균단가 | string | Y | 182 |  |
| `tot_ccld_amt` | 총체결금액 | string | Y | 19 |  |
| `loan_dt` | 대출일자 | string | Y | 8 |  |
| `buy_dt` | 매수일자 | string | Y | 8 |  |
| `samt_mket_ptci_yn_name` | 소액시장참여여부명 | string | Y | 10 |  |
| `sprx_psbl_yn_ifom` | 분리과세가능여부알림 | string | Y | 60 |  |
| `ord_mdia_dvsn_name` | 주문매체구분명 | string | Y | 60 |  |
| `sll_buy_dvsn_cd` | 매도매수구분코드 | string | Y | 2 |  |
| `nccs_qty` | 미체결수량 | string | Y | 10 |  |
| `ord_gno_brno` | 주문채번지점번호 | string | Y | 5 |  |

**Request Example:**
```
CANO:12345678  ACNT_PRDT_CD:01  INQR_STRT_DT:20240401  INQR_END_DT:20240425  SLL_BUY_DVSN_CD:%  SORT_SQN_DVSN:01  PDNO:  NCCS_YN:N  CTX_AREA_FK200:  CTX_AREA_NK200:
```

**Response Example:**
```
{      "ctx_area_nk200": " !^                                                                                                                                                                                                     ",      "ctx_area_fk200": "null!^null!^null!^null!^null!^null!^null!^null!^null!^null!^null!^null!^null!^null!^null!^null!^null!^null!^%!^null                                                                                     ",      "output1": [          {              "ord_dt": "20240425",              "odno": "0000015201",              "orgn_odno": "",              "ord_dvsn_name": "보통",              "sll_buy_dvsn_cd_name": "현금매수",              "shtn_pdno": "KR6095572D81",              "prdt_abrv_name": "AJ네트웍스63-2",              "ord_qty": "1",              "bond_ord_unpr": "10450.00",              "ord_tmd": "102033",              "tot_ccld_qty": "1",              "bond_avg_unpr": "10250.00",              "tot_ccld_amt": "1025",              "loan_dt": "",              "buy_dt": "",              "samt_mket_ptci_yn_name": "일반시장",              "sprx_psbl_yn_ifom": "종합과세",              "ord_mdia_dvsn_name": "33",              "sll_buy_dvsn_cd": "02",              "nccs_qty": "0",              "ord_gno_brno": "01790"          },          {              "ord_dt": "20240425",              "odno": "0000015202",              "orgn_odno": "",              "ord_dvsn_name": "보통",              "sll_buy_dvsn_cd_name": "현금매수",              "shtn_pdno": "KR6095572D81",              "prdt_abrv_name": "AJ네트웍스63-2",              "ord_qty": "1",              "bond_ord_unpr": "10450.00",              "ord_tmd": "135029",              "tot_ccld_qty": "0",              "bond_avg_unpr": "0.00",              "tot_ccld_amt": "0",              "loan_dt": "",              "buy_dt": "",              "samt_mket_ptci_yn_name": "일반시장",              "sprx_psbl_yn_ifom": "종합과세",              "ord_mdia_dvsn_name": "33",              "sll_buy_dvsn_cd": "02",              "nccs_qty": "0",              "ord_gno_brno": "01790"          },          {              "ord_dt": "20240425",              "odno": "0000015203",              "orgn_odno": "0000015202",              "ord_dvsn_name": "보통",              "sll_buy_dvsn_cd_name": "매수취소*",              "shtn_pdno": "KR6095572D81",              "prdt_abrv_name": "AJ네트웍스63-2",              "ord_qty": "1",              "bond_ord_unpr": "0.00",              "ord_tmd": "135108",              "tot_ccld_qty": "0",              "bond_avg_unpr": "0.00",              "tot_ccld_amt": "0",              "loan_dt": "",              "buy_dt": "",              "samt_mket_ptci_yn_name": "일반시장",              "sprx_psbl_yn_ifom": "종합과세",              "ord_mdia_dvsn_name": "33",              "sll_buy_dvsn_cd": "02",              "nccs_qty": "0",              "ord_gno_brno": "01790"          },          {              "ord_dt": "20240425",              "odno": "0000015204",              "orgn_odno": "",              "ord_dvsn_na
```

---
### 6. 장내채권 잔고조회

| Field | Value |
|---|---|
| Sheet | `장내채권 잔고조회` |
| Menu | [장내채권] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-bond/v1/trading/inquire-balance` |
| TR_ID (실전) | `CTSC8407R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 |  |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 |  |
| `INQR_CNDT` | 조회조건 | string | Y | 2 | 00: 전체, 01: 상품번호단위 |
| `PDNO` | 상품번호 | string | Y | 12 | 공백 |
| `BUY_DT` | 매수일자 | string | Y | 8 | 공백 |
| `CTX_AREA_FK200` | 연속조회검색조건200 | string | Y | 200 |  |
| `CTX_AREA_NK200` | 연속조회키200 | string | Y | 200 |  |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `pdno` | 상품번호 | string | Y | 12 |  |
| `prdt_name` | 상품명 | string | Y | 60 |  |
| `buy_dt` | 매수일자 | string | Y | 8 |  |
| `buy_sqno` | 매수일련번호 | string | Y | 10 |  |
| `cblc_qty` | 잔고수량 | string | Y | 19 |  |
| `agrx_qty` | 종합과세수량 | string | Y | 10 |  |
| `sprx_qty` | 분리과세수량 | string | Y | 10 |  |
| `exdt` | 만기일 | string | Y | 8 |  |
| `buy_erng_rt` | 매수수익율 | string | Y | 238 |  |
| `buy_unpr` | 매수단가 | string | Y | 19 |  |
| `buy_amt` | 매수금액 | string | Y | 19 |  |
| `ord_psbl_qty` | 주문가능수량 | string | Y | 10 |  |

**Request Example:**
```
CANO:12345678  ACNT_PRDT_CD:01  INQR_CNDT:00  PDNO:  BUY_DT:  CTX_AREA_FK200:  CTX_AREA_NK200:
```

**Response Example:**
```
{      "ctx_area_fk200": "!^!^null                                                                                                                                                                                                ",      "ctx_area_nk200": " !^ !^                                                                                                                                                                                                  ",      "output": [          {              "pdno": "KR101501D942",              "prdt_name": "국민주택1종19-04",              "buy_dt": "20240426",              "buy_sqno": "1",              "cblc_qty": "4",              "agrx_qty": "4",              "sprx_qty": "0",              "exdt": "20240430",              "buy_erng_rt": "0.00000000",              "buy_unpr": "0",              "buy_amt": "0",              "ord_psbl_qty": "4"          },          {              "pdno": "KR2088012A16",              "prdt_name": "경남지역개발20-01",              "buy_dt": "20240426",              "buy_sqno": "1",              "cblc_qty": "6",              "agrx_qty": "5",              "sprx_qty": "0",              "exdt": "20250131",              "buy_erng_rt": "0.00000000",              "buy_unpr": "0",              "buy_amt": "0",              "ord_psbl_qty": "5"          },          {              "pdno": "KR6003492D41",              "prdt_name": "대한항공102-2",              "buy_dt": "20240426",              "buy_sqno": "1",              "cblc_qty": "9",              "agrx_qty": "9",              "sprx_qty": "0",              "exdt": "20260424",              "buy_erng_rt": "0.00000000",              "buy_unpr": "0",              "buy_amt": "0",              "ord_psbl_qty": "9"          },          {              "pdno": "KR6095572D81",              "prdt_name": "AJ네트웍스63-2",              "buy_dt": "20240426",              "buy_sqno": "1",              "cblc_qty": "23",              "agrx_qty": "22",              "sprx_qty": "0",              "exdt": "20250801",              "buy_erng_rt": "0.00000000",              "buy_unpr": "0",              "buy_amt": "0",              "ord_psbl_qty": "22"          }      ],      "rt_cd": "0",      "msg_cd": "KIOK0460",      "msg1": "조회 되었습니다. (마지막 자료)                                                  "  }
```

---
### 7. 장내채권 매수가능조회

| Field | Value |
|---|---|
| Sheet | `장내채권 매수가능조회` |
| Menu | [장내채권] 주문/계좌 |
| Method | `GET` |
| URL | `/uapi/domestic-bond/v1/trading/inquire-psbl-order` |
| TR_ID (실전) | `TTTC8910R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `CANO` | 종합계좌번호 | string | Y | 8 |  |
| `ACNT_PRDT_CD` | 계좌상품코드 | string | Y | 2 |  |
| `PDNO` | 상품번호 | string | Y | 12 |  |
| `BOND_ORD_UNPR` | 채권주문단가 | string | Y | 182 |  |
| `SAMT_MKET_PTCI_YN` | 소액시장참여여부 | string | Y | 1 | Y(소액시장) N (일반시장) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `ord_psbl_cash` | 주문가능현금 | string | Y | 19 |  |
| `ord_psbl_sbst` | 주문가능대용 | string | Y | 19 |  |
| `ruse_psbl_amt` | 재사용가능금액 | string | Y | 19 |  |
| `bond_ord_unpr2` | 채권주문단가2 | string | Y | 182 |  |
| `buy_psbl_amt` | 매수가능금액 | string | Y | 19 |  |
| `buy_psbl_qty` | 매수가능수량 | string | Y | 10 | 매수가능수량(buy_psbl_qty) = 매수가능금액(buy_psbl_amt) / 채권주문단가2(bond_ord_unpr2) * 10 |
| `cma_evlu_amt` | CMA평가금액 | string | Y | 19 |  |

**Request Example:**
```
CANO:12345678  ACNT_PRDT_CD:01  PDNO:KR6095572D81  BOND_ORD_UNPR:10450.0
```

**Response Example:**
```
{      "output": {          "ord_psbl_cash": "9285653",          "ord_psbl_sbst": "117521",          "ruse_psbl_amt": "0",          "bond_ord_unpr2": "10450.00",          "buy_psbl_amt": "9230271",          "buy_psbl_qty": "8832",          "cma_evlu_amt": "0"      },      "rt_cd": "0",      "msg_cd": "KIOK0510",      "msg1": "조회가 완료되었습니다                                                           "  }
```

---
### 8. 장내채권현재가(호가)

| Field | Value |
|---|---|
| Sheet | `장내채권현재가(호가)` |
| Menu | [장내채권] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-bond/v1/quotations/inquire-asking-price` |
| TR_ID (실전) | `FHKBJ773401C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 분류 코드 | string | Y | 2 | B: 장내 |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 채권종목코드  ex. KR2088012A16 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object | Y |  |  |
| `aspr_acpt_hour` | 호가 접수 시간 | string | Y | 6 |  |
| `bond_askp1` | 채권 매도호가1 | string | Y | 112 |  |
| `bond_askp2` | 채권 매도호가2 | string | Y | 112 |  |
| `bond_askp3` | 채권 매도호가3 | string | Y | 112 |  |
| `bond_askp4` | 채권 매도호가4 | string | Y | 112 |  |
| `bond_askp5` | 채권 매도호가5 | string | Y | 112 |  |
| `bond_bidp1` | 채권 매수호가1 | string | Y | 112 |  |
| `bond_bidp2` | 채권 매수호가2 | string | Y | 112 |  |
| `bond_bidp3` | 채권 매수호가3 | string | Y | 112 |  |
| `bond_bidp4` | 채권 매수호가4 | string | Y | 112 |  |
| `bond_bidp5` | 채권 매수호가5 | string | Y | 112 |  |
| `askp_rsqn1` | 매도호가 잔량1 | string | Y | 12 |  |
| `askp_rsqn2` | 매도호가 잔량2 | string | Y | 12 |  |
| `askp_rsqn3` | 매도호가 잔량3 | string | Y | 12 |  |
| `askp_rsqn4` | 매도호가 잔량4 | string | Y | 12 |  |
| `askp_rsqn5` | 매도호가 잔량5 | string | Y | 12 |  |
| `bidp_rsqn1` | 매수호가 잔량1 | string | Y | 12 |  |
| `bidp_rsqn2` | 매수호가 잔량2 | string | Y | 12 |  |
| `bidp_rsqn3` | 매수호가 잔량3 | string | Y | 12 |  |
| `bidp_rsqn4` | 매수호가 잔량4 | string | Y | 12 |  |
| `bidp_rsqn5` | 매수호가 잔량5 | string | Y | 12 |  |
| `total_askp_rsqn` | 총 매도호가 잔량 | string | Y | 12 |  |
| `total_bidp_rsqn` | 총 매수호가 잔량 | string | Y | 12 |  |
| `ntby_aspr_rsqn` | 순매수 호가 잔량 | string | Y | 12 |  |
| `seln_ernn_rate1` | 매도 수익 비율1 | string | Y | 84 |  |
| `seln_ernn_rate2` | 매도 수익 비율2 | string | Y | 84 |  |
| `seln_ernn_rate3` | 매도 수익 비율3 | string | Y | 84 |  |
| `seln_ernn_rate4` | 매도 수익 비율4 | string | Y | 84 |  |
| `seln_ernn_rate5` | 매도 수익 비율5 | string | Y | 84 |  |
| `shnu_ernn_rate1` | 매수2 수익 비율1 | string | Y | 84 |  |
| `shnu_ernn_rate2` | 매수2 수익 비율2 | string | Y | 84 |  |
| `shnu_ernn_rate3` | 매수2 수익 비율3 | string | Y | 84 |  |
| `shnu_ernn_rate4` | 매수2 수익 비율4 | string | Y | 84 |  |
| `shnu_ernn_rate5` | 매수2 수익 비율5 | string | Y | 84 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:B  FID_INPUT_ISCD:KR2088012A16
```

**Response Example:**
```
{      "output": {          "aspr_acpt_hour": "094618",          "bond_askp1": "0.00",          "bond_askp2": "0.00",          "bond_askp3": "0.00",          "bond_askp4": "0.00",          "bond_askp5": "0.00",          "bond_bidp1": "10190.20",          "bond_bidp2": "10189.70",          "bond_bidp3": "10189.40",          "bond_bidp4": "10188.90",          "bond_bidp5": "10188.60",          "askp_rsqn1": "0",          "askp_rsqn2": "0",          "askp_rsqn3": "0",          "askp_rsqn4": "0",          "askp_rsqn5": "0",          "bidp_rsqn1": "320138",          "bidp_rsqn2": "53685",          "bidp_rsqn3": "9081",          "bidp_rsqn4": "8232",          "bidp_rsqn5": "4020",          "total_askp_rsqn": "0",          "total_bidp_rsqn": "425156",          "ntby_aspr_rsqn": "425156",          "seln_ernn_rate1": "0.000",          "seln_ernn_rate2": "0.000",          "seln_ernn_rate3": "0.000",          "seln_ernn_rate4": "0.000",          "seln_ernn_rate5": "0.000",          "shnu_ernn_rate1": "4.549",          "shnu_ernn_rate2": "4.556",          "shnu_ernn_rate3": "4.560",          "shnu_ernn_rate4": "4.567",          "shnu_ernn_rate5": "4.571"      },      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 9. 장내채권현재가(시세)

| Field | Value |
|---|---|
| Sheet | `장내채권현재가(시세)` |
| Menu | [장내채권] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-bond/v1/quotations/inquire-price` |
| TR_ID (실전) | `FHKBJ773400C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건시장분류코드 | string | Y | 2 | B (업종코드) |
| `FID_INPUT_ISCD` | 입력종목코드 | string | Y | 12 | 채권종목코드(ex KR2033022D33) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object | Y |  |  |
| `stnd_iscd` | 표준종목코드 | string | Y | 12 |  |
| `hts_kor_isnm` | HTS한글종목명 | string | Y | 40 |  |
| `bond_prpr` | 채권현재가 | string | Y | 112 |  |
| `prdy_vrss_sign` | 전일대비부호 | string | Y | 1 |  |
| `bond_prdy_vrss` | 채권전일대비 | string | Y | 112 |  |
| `prdy_ctrt` | 전일대비율 | string | Y | 82 |  |
| `acml_vol` | 누적거래량 | string | Y | 18 |  |
| `bond_prdy_clpr` | 채권전일종가 | string | Y | 112 |  |
| `bond_oprc` | 채권시가2 | string | Y | 112 |  |
| `bond_hgpr` | 채권고가 | string | Y | 112 |  |
| `bond_lwpr` | 채권저가 | string | Y | 112 |  |
| `ernn_rate` | 수익비율 | string | Y | 84 |  |
| `oprc_ert` | 시가2수익률 | string | Y | 72 |  |
| `hgpr_ert` | 최고가수익률 | string | Y | 72 |  |
| `lwpr_ert` | 최저가수익률 | string | Y | 72 |  |
| `bond_mxpr` | 채권상한가 | string | Y | 112 |  |
| `bond_llam` | 채권하한가 | string | Y | 112 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:B  FID_INPUT_ISCD:KR6095572D81
```

**Response Example:**
```
{      "output": {          "stnd_iscd": "KR6095572D81",          "hts_kor_isnm": "AJ네트웍스63-2",          "bond_prpr": "10265.00",          "prdy_vrss_sign": "5",          "bond_prdy_vrss": "-15.00",          "prdy_ctrt": "-0.15",          "acml_vol": "110000",          "bond_prdy_clpr": "10280.00",          "bond_oprc": "10265.00",          "bond_hgpr": "10265.00",          "bond_lwpr": "10265.00",          "ernn_rate": "4.478",          "oprc_ert": "4.478",          "hgpr_ert": "4.478",          "lwpr_ert": "4.478",          "bond_mxpr": "13364.00",          "bond_llam": "7196.00"      },      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 10. 장내채권현재가(체결)

| Field | Value |
|---|---|
| Sheet | `장내채권현재가(체결)` |
| Menu | [장내채권] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-bond/v1/quotations/inquire-ccnl` |
| TR_ID (실전) | `FHKBJ773403C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건시장분류코드 | string | Y | 2 | B (업종코드) |
| `FID_INPUT_ISCD` | 입력종목코드 | string | Y | 12 | 채권종목코드(ex KR2033022D33) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object | Y |  |  |
| `stck_cntg_hour` | 주식 체결 시간 | string | Y | 6 |  |
| `bond_prpr` | 채권 현재가 | string | Y | 112 |  |
| `bond_prdy_vrss` | 채권 전일 대비 | string | Y | 112 |  |
| `prdy_vrss_sign` | 전일 대비 부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일 대비율 | string | Y | 82 |  |
| `cntg_vol` | 체결 거래량 | string | Y | 18 |  |
| `acml_vol` | 누적 거래량 | string | Y | 18 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:B  FID_INPUT_ISCD:KR6095572D81
```

**Response Example:**
```
{      "output": [          {              "stck_cntg_hour": "091632",              "bond_prpr": "10265.00",              "bond_prdy_vrss": "-15.00",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-0.15",              "cntg_vol": "110000",              "acml_vol": "110000"          }      ],      "rt_cd": "0",      "msg_cd": "MCA00000",      "msg1": "정상처리 되었습니다."  }
```

---
### 11. 장내채권현재가(일별)

| Field | Value |
|---|---|
| Sheet | `장내채권현재가(일별)` |
| Menu | [장내채권] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-bond/v1/quotations/inquire-daily-price` |
| TR_ID (실전) | `FHKBJ773404C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건시장분류코드 | string | Y | 2 | B (업종코드) |
| `FID_INPUT_ISCD` | 입력종목코드 | string | Y | 12 | 채권종목코드(ex KR2033022D33) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object | Y |  |  |
| `stck_bsop_date` | 주식영업일자 | string | Y | 8 |  |
| `bond_prpr` | 채권현재가 | string | Y | 112 |  |
| `bond_prdy_vrss` | 채권전일대비 | string | Y | 112 |  |
| `prdy_vrss_sign` | 전일대비부호 | string | Y | 1 |  |
| `prdy_ctrt` | 전일대비율 | string | Y | 82 |  |
| `acml_vol` | 누적거래량 | string | Y | 18 |  |
| `bond_oprc` | 채권시가2 | string | Y | 112 |  |
| `bond_hgpr` | 채권고가 | string | Y | 112 |  |
| `bond_lwpr` | 채권저가 | string | Y | 112 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:B  FID_INPUT_ISCD:KR6095572D81
```

**Response Example:**
```
{      "output": [          {              "stck_bsop_date": "20240503",              "bond_prpr": "10265.00",              "bond_prdy_vrss": "-15.00",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-0.15",              "acml_vol": "110000",              "bond_oprc": "10265.00",              "bond_hgpr": "10265.00",              "bond_lwpr": "10265.00"          },          {              "stck_bsop_date": "20240502",              "bond_prpr": "10280.00",              "bond_prdy_vrss": "-145.00",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-1.39",              "acml_vol": "61278",              "bond_oprc": "10280.00",              "bond_hgpr": "10280.00",              "bond_lwpr": "10280.00"          },          {              "stck_bsop_date": "20240430",              "bond_prpr": "10425.00",              "bond_prdy_vrss": "5.00",              "prdy_vrss_sign": "2",              "prdy_ctrt": "0.05",              "acml_vol": "5012",              "bond_oprc": "10425.00",              "bond_hgpr": "10425.00",              "bond_lwpr": "10425.00"          },          {              "stck_bsop_date": "20240429",              "bond_prpr": "10420.00",              "bond_prdy_vrss": "-30.00",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-0.29",              "acml_vol": "9999",              "bond_oprc": "10420.00",              "bond_hgpr": "10420.00",              "bond_lwpr": "10420.00"          },          {              "stck_bsop_date": "20240426",              "bond_prpr": "10450.00",              "bond_prdy_vrss": "10.30",              "prdy_vrss_sign": "2",              "prdy_ctrt": "0.10",              "acml_vol": "102001",              "bond_oprc": "10430.00",              "bond_hgpr": "10450.00",              "bond_lwpr": "10430.00"          },          {              "stck_bsop_date": "20240425",              "bond_prpr": "10439.70",              "bond_prdy_vrss": "39.70",              "prdy_vrss_sign": "2",              "prdy_ctrt": "0.38",              "acml_vol": "5718",              "bond_oprc": "10290.00",              "bond_hgpr": "10439.70",              "bond_lwpr": "10290.00"          },          {              "stck_bsop_date": "20240424",              "bond_prpr": "10400.00",              "bond_prdy_vrss": "-100.00",              "prdy_vrss_sign": "5",              "prdy_ctrt": "-0.95",              "acml_vol": "3000",              "bond_oprc": "10400.00",              "bond_hgpr": "10400.00",              "bond_lwpr": "10400.00"          },          {              "stck_bsop_date": "20240423",              "bond_prpr": "10500.00",              "bond_prdy_vrss": "50.00",              "prdy_vrss_sign": "2",              "prdy_ctrt": "0.48",              "acml_vol": "10023",              "bond_oprc": "10400.00",              "bond_hgpr": "10500.00",              "bond_lwpr": "10400.00"          },          {              "stck_bsop_date": "20240422",              "bond_prpr": "10450
```

---
### 12. 장내채권 기간별시세(일)

| Field | Value |
|---|---|
| Sheet | `장내채권 기간별시세(일)` |
| Menu | [장내채권] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-bond/v1/quotations/inquire-daily-itemchartprice` |
| TR_ID (실전) | `FHKBJ773701C0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `FID_COND_MRKT_DIV_CODE` | 조건 시장 구분 코드 | string | Y | 6 | Unique key(B) |
| `FID_INPUT_ISCD` | 입력 종목코드 | string | Y | 12 | 종목코드 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object array | Y |  | array |
| `stck_bsop_date` | 주식영업일자 | string | Y | 8 |  |
| `bond_oprc` | 채권시가2 | string | Y | 112 |  |
| `bond_hgpr` | 채권고가 | string | Y | 112 |  |
| `bond_lwpr` | 채권저가 | string | Y | 112 |  |
| `bond_prpr` | 채권현재가 | string | Y | 112 |  |
| `acml_vol` | 누적거래량 | string | Y | 18 |  |

**Request Example:**
```
FID_COND_MRKT_DIV_CODE:B  FID_INPUT_ISCD:KR101501D967
```

**Response Example:**
```
{      "output": [          {              "stck_bsop_date": "20240610",              "bond_oprc": "0.00",              "bond_hgpr": "0.00",              "bond_lwpr": "0.00",              "bond_prpr": "10997.10",              "acml_vol": "0"          },          {              "stck_bsop_date": "20240607",              "bond_oprc": "10997.10",              "bond_hgpr": "10997.10",              "bond_lwpr": "10997.10",              "bond_prpr": "10997.10",              "acml_vol": "119"          },          {              "stck_bsop_date": "20240605",              "bond_oprc": "10997.50",              "bond_hgpr": "10997.50",              "bond_lwpr": "10997.50",              "bond_prpr": "10997.50",              "acml_vol": "97"          },          {              "stck_bsop_date": "20240530",              "bond_oprc": "10860.00",              "bond_hgpr": "10860.00",              "bond_lwpr": "10860.00",              "bond_prpr": "10860.00",              "acml_vol": "46"          },          {              "stck_bsop_date": "20240529",              "bond_oprc": "10873.00",              "bond_hgpr": "10873.00",              "bond_lwpr": "10873.00",              "bond_prpr": "10873.00",              "acml_vol": "3"          },          {              "stck_bsop_date": "20240528",              "bond_oprc": "8540.00",              "bond_hgpr": "10700.00",              "bond_lwpr": "8540.00",              "bond_prpr": "10700.00",              "acml_vol": "49"          },          {              "stck_bsop_date": "20240520",              "bond_oprc": "10867.70",              "bond_hgpr": "10867.70",              "bond_lwpr": "10867.70",              "bond_prpr": "10867.70",              "acml_vol": "14"          },          {              "stck_bsop_date": "20240517",              "bond_oprc": "10850.40",              "bond_hgpr": "10850.40",              "bond_lwpr": "10850.40",              "bond_prpr": "10850.40",              "acml_vol": "1015"          },          {              "stck_bsop_date": "20240514",              "bond_oprc": "10861.80",              "bond_hgpr": "10863.50",              "bond_lwpr": "10861.80",              "bond_prpr": "10863.50",              "acml_vol": "17549"          },          {              "stck_bsop_date": "20240513",              "bond_oprc": "10844.30",              "bond_hgpr": "10861.10",              "bond_lwpr": "10844.30",              "bond_prpr": "10861.10",              "acml_vol": "1963"          },          {              "stck_bsop_date": "20240510",              "bond_oprc": "10858.00",              "bond_hgpr": "10858.00",              "bond_lwpr": "10858.00",              "bond_prpr": "10858.00",              "acml_vol": "12"          },          {              "stck_bsop_date": "20240509",              "bond_oprc": "10857.00",              "bond_hgpr": "10857.00",              "bond_lwpr": "10857.00",              "bond_prpr": "10857.00",              "acml_vol": "2"          },          {    
```

---
### 13. 장내채권 평균단가조회

| Field | Value |
|---|---|
| Sheet | `장내채권 평균단가조회` |
| Menu | [장내채권] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-bond/v1/quotations/avg-unit` |
| TR_ID (실전) | `CTPF2005R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `INQR_STRT_DT` | 조회시작일자 | string | Y | 8 | 일자 ~ |
| `INQR_END_DT` | 조회종료일자 | string | Y | 8 | ~ 일자 |
| `PDNO` | 상품번호 | string | Y | 12 | 공백: 전체,  특정종목 조회시 : 종목코드 |
| `PRDT_TYPE_CD` | 상품유형코드 | string | Y | 3 | Unique key(302) |
| `VRFC_KIND_CD` | 검증종류코드 | string | Y | 2 | Unique key(00) |
| `CTX_AREA_NK30` | 연속조회키30 | string | Y | 30 | 공백 |
| `CTX_AREA_FK100` | 연속조회검색조건100 | string | Y | 100 | 공백 |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output1` | 응답상세 | object array | Y |  | array |
| `evlu_dt` | 평가일자 | string | Y | 245 |  |
| `pdno` | 상품번호 | string | Y | 202 |  |
| `prdt_type_cd` | 상품유형코드 | string | Y | 238 |  |
| `prdt_name` | 상품명 | string | Y | 1 |  |
| `kis_unpr` | 한국신용평가단가 | string | Y | 8 |  |
| `kbp_unpr` | 한국채권평가단가 | string | Y | 500 |  |
| `nice_evlu_unpr` | 한국신용정보평가단가 | string | Y | 238 |  |
| `fnp_unpr` | 에프앤자산평가단가 | string | Y | 202 |  |
| `avg_evlu_unpr` | 평균평가단가 | string | Y | 500 |  |
| `kis_crdt_grad_text` | 한국신용평가신용등급내용 | string | Y | 238 |  |
| `kbp_crdt_grad_text` | 한국채권평가신용등급내용 | string | Y | 202 |  |
| `nice_crdt_grad_text` | 한국신용정보신용등급내용 | string | Y | 238 |  |
| `fnp_crdt_grad_text` | 에프앤자산평가신용등급내용 | string | Y | 500 |  |
| `chng_yn` | 변경여부 | string | Y | 238 |  |
| `kis_erng_rt` | 한국신용평가수익율 | string | Y | 202 |  |
| `kbp_erng_rt` | 한국채권평가수익율 | string | Y | 238 |  |
| `nice_evlu_erng_rt` | 한국신용정보평가수익율 | string | Y | 500 |  |
| `fnp_erng_rt` | 에프앤자산평가수익율 | string | Y | 179 |  |
| `avg_evlu_erng_rt` | 평균평가수익율 | string | Y | 202 |  |
| `kis_rf_unpr` | 한국신용평가RF단가 | string | Y | 238 |  |
| `kbp_rf_unpr` | 한국채권평가RF단가 | string | Y | 12 |  |
| `nice_evlu_rf_unpr` | 한국신용정보평가RF단가 | string | Y | 60 |  |
| `avg_evlu_rf_unpr` | 평균평가RF단가 | string | Y | 3 |  |
| `output2` | 응답상세 | object array | Y |  | array |
| `evlu_dt` | 평가일자 | string | Y | 19 |  |
| `pdno` | 상품번호 | string | Y | 1 |  |
| `prdt_type_cd` | 상품유형코드 | string | Y | 8 |  |
| `prdt_name` | 상품명 | string | Y | 19 |  |
| `kis_evlu_amt` | 한국신용평가평가금액 | string | Y | 19 |  |
| `kbp_evlu_amt` | 한국채권평가평가금액 | string | Y | 19 |  |
| `nice_evlu_amt` | 한국신용정보평가금액 | string | Y | 19 |  |
| `fnp_evlu_amt` | 에프앤자산평가평가금액 | string | Y | 12 |  |
| `avg_evlu_amt` | 평균평가금액 | string | Y | 60 |  |
| `chng_yn` | 변경여부 | string | Y | 3 |  |
| `output3` | 응답상세 | object array | Y |  | array |
| `evlu_dt` | 평가일자 | string | Y | 236 |  |
| `pdno` | 상품번호 | string | Y | 19 |  |
| `prdt_type_cd` | 상품유형코드 | string | Y | 1 |  |
| `prdt_name` | 상품명 | string | Y | 8 |  |
| `kis_crcy_cd` | 한국신용평가통화코드 | string | Y | 3 |  |
| `kis_evlu_unit_pric` | 한국신용평가평가단위가격 | string | Y | 236 |  |
| `kis_evlu_pric` | 한국신용평가평가가격 | string | Y | 19 |  |
| `kbp_crcy_cd` | 한국채권평가통화코드 | string | Y | 3 |  |
| `kbp_evlu_unit_pric` | 한국채권평가평가단위가격 | string | Y | 236 |  |
| `kbp_evlu_pric` | 한국채권평가평가가격 | string | Y | 19 |  |
| `nice_crcy_cd` | 한국신용정보통화코드 | string | Y | 3 |  |
| `nice_evlu_unit_pric` | 한국신용정보평가단위가격 | string | Y | 236 |  |
| `nice_evlu_pric` | 한국신용정보평가가격 | string | Y | 19 |  |
| `avg_evlu_unit_pric` | 평균평가단위가격 | string | Y | 12 |  |
| `avg_evlu_pric` | 평균평가가격 | string | Y | 60 |  |
| `chng_yn` | 변경여부 | string | Y | 3 |  |

**Request Example:**
```
INQR_STRT_DT:20240101  INQR_END_DT:20240425  PDNO:KR2033022D33  PRDT_TYPE_CD:302  VRFC_KIND_CD:00  CTX_AREA_NK30:  CTX_AREA_FK100:
```

**Response Example:**
```
{      "ctx_area_nk30": "20240406!^KR2033022D33!^302   ",      "ctx_area_fk100": "20240101!^20240425!^KR2033022D33!^302!^00                                                           ",      "output1": [          {              "evlu_dt": "20240425",              "pdno": "KR2033022D33",              "prdt_type_cd": "302",              "prdt_name": "충북지역개발채권23-03",              "kis_unpr": "9745.69000000",              "kbp_unpr": "9760.39000000",              "nice_evlu_unpr": "9767.78000000",              "fnp_unpr": "9760.76",              "avg_evlu_unpr": "9758.65000000",              "kis_crdt_grad_text": "",              "kbp_crdt_grad_text": "",              "nice_crdt_grad_text": "",              "fnp_crdt_grad_text": "",              "chng_yn": "N",              "kis_erng_rt": "3.87000000",              "kbp_erng_rt": "3.83000000",              "nice_evlu_erng_rt": "3.810000000",              "fnp_erng_rt": "3.82900000",              "avg_evlu_erng_rt": "3.83480",              "kis_rf_unpr": "0.00",              "kbp_rf_unpr": "0.00",              "nice_evlu_rf_unpr": "0.00",              "avg_evlu_rf_unpr": "0.00"          },          {              "evlu_dt": "20240424",              "pdno": "KR2033022D33",              "prdt_type_cd": "302",              "prdt_name": "충북지역개발채권23-03",              "kis_unpr": "9757.62000000",              "kbp_unpr": "9771.98000000",              "nice_evlu_unpr": "9780.14000000",              "fnp_unpr": "9773.46",              "avg_evlu_unpr": "9770.80000000",              "kis_crdt_grad_text": "",              "kbp_crdt_grad_text": "",              "nice_crdt_grad_text": "",              "fnp_crdt_grad_text": "",              "chng_yn": "N",              "kis_erng_rt": "3.83500000",              "kbp_erng_rt": "3.79600000",              "nice_evlu_erng_rt": "3.774000000",              "fnp_erng_rt": "3.79200000",              "avg_evlu_erng_rt": "3.79930",              "kis_rf_unpr": "0.00",              "kbp_rf_unpr": "0.00",              "nice_evlu_rf_unpr": "0.00",              "avg_evlu_rf_unpr": "0.00"          },          {              "evlu_dt": "20240423",              "pdno": "KR2033022D33",              "prdt_type_cd": "302",              "prdt_name": "충북지역개발채권23-03",              "kis_unpr": "9764.04000000",              "kbp_unpr": "9778.42000000",              "nice_evlu_unpr": "9785.84000000",              "fnp_unpr": "9779.90",              "avg_evlu_unpr": "9777.05000000",              "kis_crdt_grad_text": "",              "kbp_crdt_grad_text": "",              "nice_crdt_grad_text": "",              "fnp_crdt_grad_text": "",              "chng_yn": "N",              "kis_erng_rt": "3.81500000",              "kbp_erng_rt": "3.77600000",              "nice_evlu_erng_rt": "3.756000000",              "fnp_erng_rt": "3.77200000",              "avg_evlu_erng_rt": "3.77980",              "kis_rf_unpr": "0.00",              "kbp_rf_unpr": "0.00",              "nice_evlu_rf_unpr": "0.00",   
```

---
### 14. 장내채권 발행정보

| Field | Value |
|---|---|
| Sheet | `장내채권 발행정보` |
| Menu | [장내채권] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-bond/v1/quotations/issue-info` |
| TR_ID (실전) | `CTPF1101R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `PDNO` | 사용자권한정보 | string | Y | 12 | 채권 종목번호(ex. KR6449111CB8) |
| `PRDT_TYPE_CD` | 거래소코드 | string | Y | 3 | Unique key(302) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object | Y |  |  |
| `pdno` | 상품번호 | string | Y | 12 |  |
| `prdt_type_cd` | 상품유형코드 | string | Y | 3 |  |
| `prdt_name` | 상품명 | string | Y | 60 |  |
| `prdt_eng_name` | 상품영문명 | string | Y | 60 |  |
| `ivst_heed_prdt_yn` | 투자유의상품여부 | string | Y | 1 |  |
| `exts_yn` | 연장여부 | string | Y | 1 |  |
| `bond_clsf_cd` | 채권분류코드 | string | Y | 6 |  |
| `bond_clsf_kor_name` | 채권분류한글명 | string | Y | 60 |  |
| `papr` | 액면가 | string | Y | 19 |  |
| `int_mned_dvsn_cd` | 이자월말구분코드 | string | Y | 1 |  |
| `rvnu_shap_cd` | 매출형태코드 | string | Y | 1 |  |
| `issu_amt` | 발행금액 | string | Y | 19 |  |
| `lstg_rmnd` | 상장잔액 | string | Y | 19 |  |
| `int_dfrm_mcnt` | 이자지급개월수 | string | Y | 6 |  |
| `bond_int_dfrm_mthd_cd` | 채권이자지급방법코드 | string | Y | 2 |  |
| `splt_rdpt_rcnt` | 분할상환횟수 | string | Y | 6 |  |
| `prca_dfmt_term_mcnt` | 원금거치기간개월수 | string | Y | 6 |  |
| `int_anap_dvsn_cd` | 이자선후급구분코드 | string | Y | 1 |  |
| `bond_rght_dvsn_cd` | 채권권리구분코드 | string | Y | 2 |  |
| `prdt_pclc_text` | 상품특성내용 | string | Y | 500 |  |
| `prdt_abrv_name` | 상품약어명 | string | Y | 60 |  |
| `prdt_eng_abrv_name` | 상품영문약어명 | string | Y | 60 |  |
| `sprx_psbl_yn` | 분리과세가능여부 | string | Y | 1 |  |
| `pbff_pplc_ofrg_mthd_cd` | 공모사모모집방법코드 | string | Y | 2 |  |
| `cmco_cd` | 주간사코드 | string | Y | 4 |  |
| `issu_istt_cd` | 발행기관코드 | string | Y | 5 |  |
| `issu_istt_name` | 발행기관명 | string | Y | 60 |  |
| `pnia_dfrm_agcy_istt_cd` | 원리금지급대행기관코드 | string | Y | 4 |  |
| `dsct_ec_rt` | 할인할증율 | string | Y | 238 |  |
| `srfc_inrt` | 표면이율 | string | Y | 238 |  |
| `expd_rdpt_rt` | 만기상환율 | string | Y | 238 |  |
| `expd_asrc_erng_rt` | 만기보장수익율 | string | Y | 238 |  |
| `bond_grte_istt_name` | 채권보증기관명 | string | Y | 60 |  |
| `int_dfrm_day_type_cd` | 이자지급일유형코드 | string | Y | 2 |  |
| `ksd_int_calc_unit_cd` | 증권예탁결제원이자계산단위코드 | string | Y | 1 |  |
| `int_wunt_uder_prcs_dvsn_cd` | 이자원화단위미만처리구분코드 | string | Y | 1 |  |
| `rvnu_dt` | 매출일자 | string | Y | 8 |  |
| `issu_dt` | 발행일자 | string | Y | 8 |  |
| `lstg_dt` | 상장일자 | string | Y | 8 |  |
| `expd_dt` | 만기일자 | string | Y | 8 |  |
| `rdpt_dt` | 상환일자 | string | Y | 8 |  |
| `sbst_pric` | 대용가격 | string | Y | 19 |  |
| `rgbf_int_dfrm_dt` | 직전이자지급일자 | string | Y | 8 |  |
| `nxtm_int_dfrm_dt` | 차기이자지급일자 | string | Y | 8 |  |
| `frst_int_dfrm_dt` | 최초이자지급일자 | string | Y | 8 |  |
| `ecis_pric` | 행사가격 | string | Y | 19 |  |
| `rght_stck_std_pdno` | 권리주식표준상품번호 | string | Y | 12 |  |
| `ecis_opng_dt` | 행사개시일자 | string | Y | 8 |  |
| `ecis_end_dt` | 행사종료일자 | string | Y | 8 |  |
| `bond_rvnu_mthd_cd` | 채권매출방법코드 | string | Y | 2 |  |
| `oprt_stfno` | 조작직원번호 | string | Y | 6 |  |
| `oprt_stff_name` | 조작직원명 | string | Y | 60 |  |
| `rgbf_int_dfrm_wday` | 직전이자지급요일 | string | Y | 2 |  |
| `nxtm_int_dfrm_wday` | 차기이자지급요일 | string | Y | 2 |  |
| `kis_crdt_grad_text` | 한국신용평가신용등급내용 | string | Y | 500 |  |
| `kbp_crdt_grad_text` | 한국채권평가신용등급내용 | string | Y | 500 |  |
| `nice_crdt_grad_text` | 한국신용정보신용등급내용 | string | Y | 500 |  |
| `fnp_crdt_grad_text` | 에프앤자산평가신용등급내용 | string | Y | 500 |  |
| `dpsi_psbl_yn` | 예탁가능여부 | string | Y | 1 |  |
| `pnia_int_calc_unpr` | 원리금이자계산단가 | string | Y | 234 |  |
| `prcm_idx_bond_yn` | 물가지수채권여부 | string | Y | 1 |  |
| `expd_exts_srdp_rcnt` | 만기연장분할상환횟수 | string | Y | 10 |  |
| `expd_exts_srdp_rt` | 만기연장분할상환율 | string | Y | 2212 |  |
| `loan_psbl_yn` | 대출가능여부 | string | Y | 1 |  |
| `grte_dvsn_cd` | 보증구분코드 | string | Y | 1 |  |
| `fnrr_rank_dvsn_cd` | 선후순위구분코드 | string | Y | 1 |  |
| `krx_lstg_abol_dvsn_cd` | 한국거래소상장폐지구분코드 | string | Y | 1 |  |
| `asst_rqdi_dvsn_cd` | 자산유동화구분코드 | string | Y | 2 |  |
| `opcb_dvsn_cd` | 옵션부사채구분코드 | string | Y | 1 |  |
| `crfd_item_yn` | 크라우드펀딩종목여부 | string | Y | 1 |  |
| `crfd_item_rstc_cclc_dt` | 크라우드펀딩종목제한해지일자 | string | Y | 8 |  |
| `bond_nmpr_unit_pric` | 채권호가단위가격 | string | Y | 202 |  |
| `ivst_heed_bond_dvsn_name` | 투자유의채권구분명 | string | Y | 60 |  |
| `add_erng_rt` | 추가수익율 | string | Y | 238 |  |
| `add_erng_rt_aply_dt` | 추가수익율적용일자 | string | Y | 8 |  |
| `bond_tr_stop_dvsn_cd` | 채권거래정지구분코드 | string | Y | 1 |  |
| `ivst_heed_bond_dvsn_cd` | 투자유의채권구분코드 | string | Y | 1 |  |
| `pclr_cndt_text` | 특이조건내용 | string | Y | 500 |  |
| `hbbd_yn` | 하이브리드채권여부 | string | Y | 1 |  |
| `cdtl_cptl_scty_type_cd` | 조건부자본증권유형코드 | string | Y | 1 |  |
| `elec_scty_yn` | 전자증권여부 | string | Y | 1 |  |
| `sq1_clop_ecis_opng_dt` | 1차콜옵션행사개시일자 | string | Y | 8 |  |
| `frst_erlm_stfno` | 최초등록직원번호 | string | Y | 6 |  |
| `frst_erlm_dt` | 최초등록일자 | string | Y | 8 |  |
| `frst_erlm_tmd` | 최초등록시각 | string | Y | 6 |  |
| `tlg_rcvg_dtl_dtime` | 전문수신상세일시 | string | Y | 17 |  |

**Request Example:**
```
PDNO:KR6449111CB8  PRDT_TYPE_CD:302
```

**Response Example:**
```
{      "output": {          "pdno": "KR6449111CB8",          "prdt_type_cd": "302",          "prdt_name": "2022기보제일차유동화전문1-1(사)",          "prdt_eng_name": "2022 KIBO 1st Securitization Specialty1-1(S)",          "ivst_heed_prdt_yn": "N",          "exts_yn": "N",          "bond_clsf_cd": "116100",          "bond_clsf_kor_name": "일반사채",          "papr": "10000",          "int_mned_dvsn_cd": "1",          "rvnu_shap_cd": "2",          "issu_amt": "77839700000",          "lstg_rmnd": "77839700000",          "int_dfrm_mcnt": "3",          "bond_int_dfrm_mthd_cd": "03",          "splt_rdpt_rcnt": "0",          "prca_dfmt_term_mcnt": "0",          "int_anap_dvsn_cd": "2",          "bond_rght_dvsn_cd": "",          "prdt_pclc_text": "",          "prdt_abrv_name": "2022기보제일차유1-1(사)",          "prdt_eng_abrv_name": "2022 KIBO 1st SEC1-1(S)",          "sprx_psbl_yn": "N",          "pbff_pplc_ofrg_mthd_cd": "01",          "cmco_cd": "2117",          "issu_istt_cd": "44911",          "issu_istt_name": "2022기보제일차유동화전문 유한회사",          "pnia_dfrm_agcy_istt_cd": "1105",          "dsct_ec_rt": "0.000000",          "srfc_inrt": "5.931000",          "expd_rdpt_rt": "0.000000",          "expd_asrc_erng_rt": "0.000000",          "bond_grte_istt_name": "2022기보제일차유동화전문 유한회사",          "int_dfrm_day_type_cd": "01",          "ksd_int_calc_unit_cd": "1",          "int_wunt_uder_prcs_dvsn_cd": "1",          "rvnu_dt": "",          "issu_dt": "20221116",          "lstg_dt": "20221116",          "expd_dt": "20241116",          "rdpt_dt": "20241116",          "sbst_pric": "8900",          "rgbf_int_dfrm_dt": "20240516",          "nxtm_int_dfrm_dt": "20240816",          "frst_int_dfrm_dt": "",          "ecis_pric": "0",          "rght_stck_std_pdno": "",          "ecis_opng_dt": "",          "ecis_end_dt": "",          "bond_rvnu_mthd_cd": "",          "oprt_stfno": "BATCH",          "oprt_stff_name": "",          "rgbf_int_dfrm_wday": "05",          "nxtm_int_dfrm_wday": "06",          "kis_crdt_grad_text": "AAA",          "kbp_crdt_grad_text": "AAA",          "nice_crdt_grad_text": "AAA",          "fnp_crdt_grad_text": "AAA",          "dpsi_psbl_yn": "Y",          "pnia_int_calc_unpr": "0",          "prcm_idx_bond_yn": "N",          "expd_exts_srdp_rcnt": "0",          "expd_exts_srdp_rt": "0",          "loan_psbl_yn": "N",          "grte_dvsn_cd": "4",          "fnrr_rank_dvsn_cd": "1",          "krx_lstg_abol_dvsn_cd": "Y",          "asst_rqdi_dvsn_cd": "11",          "opcb_dvsn_cd": "",          "crfd_item_yn": "N",          "crfd_item_rstc_cclc_dt": "",          "bond_nmpr_unit_pric": "0.100000",          "ivst_heed_bond_dvsn_name": "",          "add_erng_rt": "0.000000",          "add_erng_rt_aply_dt": "",          "bond_tr_stop_dvsn_cd": "N",          "ivst_heed_bond_dvsn_cd": "0",          "pclr_cndt_text": "",          "hbbd_yn": "N",          "cdtl_cptl_scty_type_cd": "",          "elec_scty_yn": "Y",          "sq1_clop_ecis_opng_dt": "",          "frst_erlm_stfno":
```

---
### 15. 장내채권 기본조회

| Field | Value |
|---|---|
| Sheet | `장내채권 기본조회` |
| Menu | [장내채권] 기본시세 |
| Method | `GET` |
| URL | `/uapi/domestic-bond/v1/quotations/search-bond-info` |
| TR_ID (실전) | `CTPF1114R` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Query Parameter

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `PDNO` | 상품번호 | string | Y | 12 | 상품번호 |
| `PRDT_TYPE_CD` | 상품유형코드 | string | Y | 3 | Unique key(302) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `rt_cd` | 성공 실패 여부 | string | Y | 1 |  |
| `msg_cd` | 응답코드 | string | Y | 8 |  |
| `msg1` | 응답메세지 | string | Y | 80 |  |
| `output` | 응답상세 | object | Y |  |  |
| `pdno` | 상품번호 | string | Y | 12 |  |
| `prdt_type_cd` | 상품유형코드 | string | Y | 3 |  |
| `ksd_bond_item_name` | 증권예탁결제원채권종목명 | string | Y | 100 |  |
| `ksd_bond_item_eng_name` | 증권예탁결제원채권종목영문명 | string | Y | 100 |  |
| `ksd_bond_lstg_type_cd` | 증권예탁결제원채권상장유형코드 | string | Y | 2 |  |
| `ksd_ofrg_dvsn_cd` | 증권예탁결제원모집구분코드 | string | Y | 2 |  |
| `ksd_bond_int_dfrm_dvsn_cd` | 증권예탁결제원채권이자지급구분 | string | Y | 1 |  |
| `issu_dt` | 발행일자 | string | Y | 8 |  |
| `rdpt_dt` | 상환일자 | string | Y | 8 |  |
| `rvnu_dt` | 매출일자 | string | Y | 8 |  |
| `iso_crcy_cd` | 통화코드 | string | Y | 3 |  |
| `mdwy_rdpt_dt` | 중도상환일자 | string | Y | 8 |  |
| `ksd_rcvg_bond_dsct_rt` | 증권예탁결제원수신채권할인율 | string | Y | 2212 |  |
| `ksd_rcvg_bond_srfc_inrt` | 증권예탁결제원수신채권표면이율 | string | Y | 2012 |  |
| `bond_expd_rdpt_rt` | 채권만기상환율 | string | Y | 2212 |  |
| `ksd_prca_rdpt_mthd_cd` | 증권예탁결제원원금상환방법코드 | string | Y | 2 |  |
| `int_caltm_mcnt` | 이자계산기간개월수 | string | Y | 10 |  |
| `ksd_int_calc_unit_cd` | 증권예탁결제원이자계산단위코드 | string | Y | 1 | 1.발행금액  2.만원  3.십만원  4.백만원 |
| `uval_cut_dvsn_cd` | 절상절사구분코드 | string | Y | 1 |  |
| `uval_cut_dcpt_dgit` | 절상절사소수점자릿수 | string | Y | 10 |  |
| `ksd_dydv_caltm_aply_dvsn_cd` | 증권예탁결제원일할계산기간적용 | string | Y | 1 |  |
| `dydv_calc_dcnt` | 일할계산일수 | string | Y | 5 |  |
| `bond_expd_asrc_erng_rt` | 채권만기보장수익율 | string | Y | 2212 |  |
| `padf_plac_hdof_name` | 원리금지급장소본점명 | string | Y | 60 |  |
| `lstg_dt` | 상장일자 | string | Y | 8 |  |
| `lstg_abol_dt` | 상장폐지일자 | string | Y | 8 |  |
| `ksd_bond_issu_mthd_cd` | 증권예탁결제원채권발행방법코드 | string | Y | 1 |  |
| `laps_indf_yn` | 경과이자지급여부 | string | Y | 1 |  |
| `ksd_lhdy_pnia_dfrm_mthd_cd` | 증권예탁결제원공휴일원리금지급 | string | Y | 1 |  |
| `frst_int_dfrm_dt` | 최초이자지급일자 | string | Y | 8 |  |
| `ksd_prcm_lnkg_gvbd_yn` | 증권예탁결제원물가연동국고채여 | string | Y | 1 |  |
| `dpsi_end_dt` | 예탁종료일자 | string | Y | 8 |  |
| `dpsi_strt_dt` | 예탁시작일자 | string | Y | 8 |  |
| `dpsi_psbl_yn` | 예탁가능여부 | string | Y | 1 |  |
| `atyp_rdpt_bond_erlm_yn` | 비정형상환채권등록여부 | string | Y | 1 |  |
| `dshn_occr_yn` | 부도발생여부 | string | Y | 1 |  |
| `expd_exts_yn` | 만기연장여부 | string | Y | 1 |  |
| `pclr_ptcr_text` | 특이사항내용 | string | Y | 500 |  |
| `dpsi_psbl_excp_stat_cd` | 예탁가능예외상태코드 | string | Y | 2 |  |
| `expd_exts_srdp_rcnt` | 만기연장분할상환횟수 | string | Y | 10 |  |
| `expd_exts_srdp_rt` | 만기연장분할상환율 | string | Y | 2212 |  |
| `expd_rdpt_rt` | 만기상환율 | string | Y | 238 |  |
| `expd_asrc_erng_rt` | 만기보장수익율 | string | Y | 238 |  |
| `bond_int_dfrm_mthd_cd` | 채권이자지급방법코드 | string | Y | 2 | 01.할인채  02.복리채  03.이표채.확정금리  04.이표채.금리연동  05.이표채.변동금리  06.단리채  07.분할채  09.복5단2  19.기타.고정금리  29.기타.변동금리 |
| `int_dfrm_day_type_cd` | 이자지급일유형코드 | string | Y | 2 | 01.발행일  02.만기일  03.특정일 |
| `prca_dfmt_term_mcnt` | 원금거치기간개월수 | string | Y | 6 |  |
| `splt_rdpt_rcnt` | 분할상환횟수 | string | Y | 6 |  |
| `rgbf_int_dfrm_dt` | 직전이자지급일자 | string | Y | 8 |  |
| `nxtm_int_dfrm_dt` | 차기이자지급일자 | string | Y | 8 |  |
| `sprx_psbl_yn` | 분리과세가능여부 | string | Y | 1 |  |
| `ictx_rt_dvsn_cd` | 소득세율구분코드 | string | Y | 2 |  |
| `bond_clsf_cd` | 채권분류코드 | string | Y | 6 |  |
| `bond_clsf_kor_name` | 채권분류한글명 | string | Y | 60 |  |
| `int_mned_dvsn_cd` | 이자월말구분코드 | string | Y | 1 | 1.일자기준  2.말일기준 |
| `pnia_int_calc_unpr` | 원리금이자계산단가 | string | Y | 234 |  |
| `frn_intr` | FRN금리 | string | Y | 1512 |  |
| `aply_day_prcm_idx_lnkg_cefc` | 적용일물가지수연동계수 | string | Y | 151 |  |
| `ksd_expd_dydv_calc_bass_cd` | 증권예탁결제원만기일할계산기준 | string | Y | 1 |  |
| `expd_dydv_calc_dcnt` | 만기일할계산일수 | string | Y | 7 |  |
| `ksd_cbbw_dvsn_cd` | 증권예탁결제원신종사채구분코드 | string | Y | 1 |  |
| `crfd_item_yn` | 크라우드펀딩종목여부 | string | Y | 1 |  |
| `pnia_bank_ofdy_dfrm_mthd_cd` | 원리금은행휴무일지급방법코드 | string | Y | 1 |  |
| `qib_yn` | QIB여부 | string | Y | 1 |  |
| `qib_cclc_dt` | QIB해지일자 | string | Y | 8 |  |
| `csbd_yn` | 영구채여부 | string | Y | 1 |  |
| `csbd_cclc_dt` | 영구채해지일자 | string | Y | 8 |  |
| `ksd_opcb_yn` | 증권예탁결제원옵션부사채여부 | string | Y | 1 |  |
| `ksd_sodn_yn` | 증권예탁결제원후순위채권여부 | string | Y | 1 |  |
| `ksd_rqdi_scty_yn` | 증권예탁결제원유동화증권여부 | string | Y | 1 |  |
| `elec_scty_yn` | 전자증권여부 | string | Y | 1 |  |
| `rght_ecis_mbdy_dvsn_cd` | 권리행사주체구분코드 | string | Y | 1 |  |
| `int_rkng_mthd_dvsn_cd` | 이자산정방법구분코드 | string | Y | 1 |  |
| `ofrg_dvsn_cd` | 모집구분코드 | string | Y | 2 |  |
| `ksd_tot_issu_amt` | 증권예탁결제원총발행금액 | string | Y | 202 |  |
| `next_indf_chk_ecls_yn` | 다음이자지급체크제외여부 | string | Y | 1 |  |
| `ksd_bond_intr_dvsn_cd` | 증권예탁결제원채권금리구분코드 | string | Y | 1 |  |
| `ksd_inrt_aply_dvsn_cd` | 증권예탁결제원이율적용구분코드 | string | Y | 1 |  |
| `krx_issu_istt_cd` | KRX발행기관코드 | string | Y | 5 |  |
| `ksd_indf_frqc_uder_calc_cd` | 증권예탁결제원이자지급주기미만 | string | Y | 1 |  |
| `ksd_indf_frqc_uder_calc_dcnt` | 증권예탁결제원이자지급주기미만 | string | Y | 4 |  |
| `tlg_rcvg_dtl_dtime` | 전문수신상세일시 | string | Y | 17 |  |

**Request Example:**
```
PDNO:KR2033022D33  PRDT_TYPE_CD:302
```

**Response Example:**
```
{      "output": {          "pdno": "KR2033022D33",          "prdt_type_cd": "302",          "ksd_bond_item_name": "충북지역개발채권 23-03",          "ksd_bond_item_eng_name": "CHUNGBUK PROVINCIAL DEVELOPMENT 23-03",          "ksd_bond_lstg_type_cd": "11",          "ksd_ofrg_dvsn_cd": "11",          "ksd_bond_int_dfrm_dvsn_cd": "3",          "issu_dt": "20230331",          "rdpt_dt": "20280331",          "rvnu_dt": "20230302",          "iso_crcy_cd": "KRW",          "mdwy_rdpt_dt": "00000000",          "ksd_rcvg_bond_dsct_rt": "0.000000000000",          "ksd_rcvg_bond_srfc_inrt": "2.500000000000",          "bond_expd_rdpt_rt": "100.000000000000",          "ksd_prca_rdpt_mthd_cd": "11",          "int_caltm_mcnt": "12",          "ksd_int_calc_unit_cd": "1",          "uval_cut_dvsn_cd": "2",          "uval_cut_dcpt_dgit": "0",          "ksd_dydv_caltm_aply_dvsn_cd": "1",          "dydv_calc_dcnt": "0",          "bond_expd_asrc_erng_rt": "0.000000000000",          "padf_plac_hdof_name": "농협은행",          "lstg_dt": "20230302",          "lstg_abol_dt": "20280401",          "ksd_bond_issu_mthd_cd": "2",          "laps_indf_yn": "Y",          "ksd_lhdy_pnia_dfrm_mthd_cd": "2",          "frst_int_dfrm_dt": "00000000",          "ksd_prcm_lnkg_gvbd_yn": "N",          "dpsi_end_dt": "20280401",          "dpsi_strt_dt": "20230302",          "dpsi_psbl_yn": "Y",          "atyp_rdpt_bond_erlm_yn": "N",          "dshn_occr_yn": "N",          "expd_exts_yn": "N",          "pclr_ptcr_text": "",          "dpsi_psbl_excp_stat_cd": "",          "expd_exts_srdp_rcnt": "0",          "expd_exts_srdp_rt": "0.000000000000",          "expd_rdpt_rt": "0.00000000",          "expd_asrc_erng_rt": "0.00000000",          "bond_int_dfrm_mthd_cd": "02",          "int_dfrm_day_type_cd": "02",          "prca_dfmt_term_mcnt": "0",          "splt_rdpt_rcnt": "0",          "rgbf_int_dfrm_dt": "",          "nxtm_int_dfrm_dt": "20280331",          "sprx_psbl_yn": "N",          "ictx_rt_dvsn_cd": "",          "bond_clsf_cd": "112555",          "bond_clsf_kor_name": "충북지역개발채권",          "int_mned_dvsn_cd": "2",          "pnia_int_calc_unpr": "0.0000",          "frn_intr": "0.000000000000",          "aply_day_prcm_idx_lnkg_cefc": "0.0000000000",          "ksd_expd_dydv_calc_bass_cd": "",          "expd_dydv_calc_dcnt": "0",          "ksd_cbbw_dvsn_cd": "9",          "crfd_item_yn": "N",          "pnia_bank_ofdy_dfrm_mthd_cd": "1",          "qib_yn": "N",          "qib_cclc_dt": "00000000",          "csbd_yn": "N",          "csbd_cclc_dt": "00000000",          "ksd_opcb_yn": "N",          "ksd_sodn_yn": "N",          "ksd_rqdi_scty_yn": "N",          "elec_scty_yn": "Y",          "rght_ecis_mbdy_dvsn_cd": "1",          "int_rkng_mthd_dvsn_cd": "1",          "ofrg_dvsn_cd": "",          "ksd_tot_issu_amt": "17303560000.00",          "next_indf_chk_ecls_yn": "N",          "ksd_bond_intr_dvsn_cd": "1",          "ksd_inrt_aply_dvsn_cd": "1",          "krx_issu_istt_cd": "MB033",          "ksd_indf_frqc_
```

---
### 16. 일반채권 실시간체결가

| Field | Value |
|---|---|
| Sheet | `일반채권 실시간체결가` |
| Menu | [장내채권] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0BJCNT0` |
| TR_ID (실전) | `H0BJCNT0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | 1: 등록, 2:해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0BJCNT0 |
| `tr_key` | 구분값 | string | Y | 12 | 채권 종목코드 (ex. KR103502GA34) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `STND_ISCD` | 표준종목코드 | string | Y | 12 |  |
| `BOND_ISNM` | 채권종목명 | string | Y | 80 |  |
| `STCK_CNTG_HOUR` | 주식체결시간 | string | Y | 6 |  |
| `PRDY_VRSS_SIGN` | 전일대비부호 | string | Y | 1 |  |
| `PRDY_VRSS` | 전일대비 | string | Y | 8 |  |
| `PRDY_CTRT` | 전일대비율 | string | Y | 8 |  |
| `STCK_PRPR` | 현재가 | string | Y | 8 |  |
| `CNTG_VOL` | 체결거래량 | string | Y | 8 |  |
| `STCK_OPRC` | 시가 | string | Y | 8 |  |
| `STCK_HGPR` | 고가 | string | Y | 8 |  |
| `STCK_LWPR` | 저가 | string | Y | 8 |  |
| `STCK_PRDY_CLPR` | 전일종가 | string | Y | 8 |  |
| `BOND_CNTG_ERT` | 현재수익률 | string | Y | 10 |  |
| `OPRC_ERT` | 시가수익률 | string | Y | 10 |  |
| `HGPR_ERT` | 고가수익률 | string | Y | 10 |  |
| `LWPR_ERT` | 저가수익률 | string | Y | 10 |  |
| `ACML_VOL` | 누적거래량 | string | Y | 8 |  |
| `PRDY_VOL` | 전일거래량 | string | Y | 8 |  |
| `CNTG_TYPE_CLS_CODE` | 체결유형코드 | string | Y | 1 |  |

**Request Example:**
```
{           "header":           {                    "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",                    "custtype":"P",                    "tr_type":"1",                    "content-type":"utf-8"           },           "body":           {                    "input":                    {                             "tr_id":"H0BJCNT0",                             "tr_key":"KR103502GD31"                    }           }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "H0BJCNT0",           "tr_key": "KR103502GD31",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output - 정제 전  0\|H0BJCNT0\|001\|KR103502GD31^국고03250-5303(23-2)^131743^2^5.00^0.05^10575.00^1^10525.00^10578.00^10525.00^0.00^3.012^3.037^3.010^3.037^659  4124^9874082^2    # output - 정제 후  #### 장내채권 체결 ####  ============================================  ### [1 / 1]  표준종목코드       [KR103502GD31]  채권종목명        [국고03250-5303(23-2)]  주식체결시간       [131743]  전일대비부호       [2]  전일대비         [5.00]  전일대비율        [0.05]  현재가          [10575.00]  체결거래량        [1]  시가           [10525.00]  고가           [10578.00]  저가           [10525.00]  전일종가         [0.00]  현재수익률        [3.012]  시가수익률        [3.037]  고가수익률        [3.010]  저가수익률        [3.037]  누적거래량        [6594124]  전일거래량        [9874082]  체결유형코드       [2]
```

---
### 17. 일반채권 실시간호가

| Field | Value |
|---|---|
| Sheet | `일반채권 실시간호가` |
| Menu | [장내채권] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0BJASP0` |
| TR_ID (실전) | `H0BJCNT0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0BJCNT0 |
| `tr_key` | 구분값 | string | Y | 12 | 채권 종목코드 (ex. KR103502GA34) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `STND_ISCD` | 표준종목코드 | string | Y | 12 |  |
| `STCK_CNTG_HOUR` | 주식체결시간 | string | Y | 6 |  |
| `ASKP_ERT1` | 매도호가수익률 | string | Y | 10 |  |
| `BIDP_ERT1` | 매수호가수익률1 | string | Y | 10 |  |
| `ASKP1` | 매도호가1 | string | Y | 8 |  |
| `BIDP1` | 매수호가1 | string | Y | 8 |  |
| `ASKP_RSQN1` | 매도호가잔량1 | string | Y | 8 |  |
| `BIDP_RSQN1` | 매수호가잔량1 | string | Y | 8 |  |
| `ASKP_ERT2` | 매도호가수익률2 | string | Y | 10 |  |
| `BIDP_ERT2` | 매수호가수익률2 | string | Y | 10 |  |
| `ASKP2` | 매도호가2 | string | Y | 8 |  |
| `BIDP2` | 매수호가2 | string | Y | 8 |  |
| `ASKP_RSQN2` | 매도호가잔량2 | string | Y | 8 |  |
| `BIDP_RSQN2` | 매수호가잔량2 | string | Y | 8 |  |
| `ASKP_ERT3` | 매도호가수익률3 | string | Y | 10 |  |
| `BIDP_ERT3` | 매수호가수익률3 | string | Y | 10 |  |
| `ASKP3` | 매도호가3 | string | Y | 8 |  |
| `BIDP3` | 매수호가3 | string | Y | 8 |  |
| `ASKP_RSQN3` | 매도호가잔량3 | string | Y | 8 |  |
| `BIDP_RSQN3` | 매수호가잔량3 | string | Y | 8 |  |
| `ASKP_ERT4` | 매도호가수익률4 | string | Y | 10 |  |
| `BIDP_ERT4` | 매수호가수익률4 | string | Y | 10 |  |
| `ASKP4` | 매도호가4 | string | Y | 8 |  |
| `BIDP4` | 매수호가4 | string | Y | 8 |  |
| `ASKP_RSQN4` | 매도호가잔량4 | string | Y | 8 |  |
| `BIDP_RSQN4` | 매수호가잔량4 | string | Y | 8 |  |
| `ASKP_ERT5` | 매도호가수익률5 | string | Y | 10 |  |
| `BIDP_ERT5` | 매수호가수익률5 | string | Y | 10 |  |
| `ASKP5` | 매도호가5 | string | Y | 8 |  |
| `BIDP5` | 매수호가5 | string | Y | 8 |  |
| `ASKP_RSQN52` | 매도호가잔량5 | string | Y | 8 |  |
| `BIDP_RSQN53` | 매수호가잔량5 | string | Y | 8 |  |
| `TOTAL_ASKP_RSQN` | 총매도호가잔량 | string | Y | 8 |  |
| `TOTAL_BIDP_RSQN` | 총매수호가잔량 | string | Y | 8 |  |

**Request Example:**
```
{           "header":           {                    "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",                    "custtype":"P",                    "tr_type":"1",                    "content-type":"utf-8"           },           "body":           {                    "input":                    {                             "tr_id":"H0BJASP0",                             "tr_key":"KR103502GD31"                    }           }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "H0BJASP0",           "tr_key": "KR103502GD31",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output - 정제 전  0\|H0BJASP0\|001\|KR103502GD31^131743^3.012^3.020^10575.00^10560.00^416090^323813^3.011^3.022^10576.00^10556.00^405284^57^3.010^3.022^10578.0  0^10555.00^177098^500000^3.009^3.024^10580.00^10551.00^97637^363079^3.001^3.025^10597.00^10550.00^80000^379920^1698609^4112382    # output - 정제 후  #### 장내채권 호가 ####  채권종목코드  [KR103502GD31]  영업시간  [131743]  ====================================  채권매도호가1   [10575.00],    매도호가수익률1  [3.012],    매도호가잔량1      [416090]  채권매도호가2   [10576.00],    매도호가수익률2  [3.011],    매도호가잔량2      [405284]  채권매도호가3   [10578.00],    매도호가수익률3  [3.010],    매도호가잔량3      [177098]  채권매도호가4   [10580.00],    매도호가수익률4  [3.009],    매도호가잔량4      [97637]  채권매도호가5   [10597.00],    매도호가수익률5  [3.001],    매도호가잔량5      [80000]  채권매수호가1   [10560.00],    매수호가수익률1  [3.020],    매수호가잔량1      [323813]  채권매수호가2   [10556.00],    매수호가수익률2  [3.022],    매수호가잔량2      [57]  채권매수호가3   [10555.00],    매수호가수익률3  [3.022],    매수호가잔량3      [500000]  채권매수호가4   [10551.00],   매수호가수익률4   [3.024],    매수호가잔량4      [363079]  채권매수호가5   [10550.00],    매수호가수익률5  [3.025],    매수호가잔량5      [379920]  ====================================  총매도호가잔량  [1698609]  총매수호가잔량  [4112382]
```

---
### 18. 채권지수 실시간체결가

| Field | Value |
|---|---|
| Sheet | `채권지수 실시간체결가` |
| Menu | [장내채권] 실시간시세 |
| Method | `POST` |
| URL | `/tryitout/H0BICNT0` |
| TR_ID (실전) | `H0BICNT0` |
| TR_ID (모의) | `모의투자 미지원` |

#### Request Header

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 36 | 실시간 (웹소켓) 접속키 발급 API(/oauth2/Approval)를 사용하여 발급받은 웹소켓 접속키 |
| `tr_type` | 등록/해제 | string | Y | 1 | 1: 등록, 2:해제 |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `tr_id` | 거래ID | string | Y | 2 | H0BICNT0 |
| `tr_key` | 구분값 | string | Y | 12 | 채권 종목코드 (ex. KR103502GA34) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `NMIX_ID` | 지수ID | string | Y | 6 |  |
| `STND_DATE1` | 기준일자1 | string | Y | 8 |  |
| `TRNM_HOUR` | 전송시간 | string | Y | 6 |  |
| `TOTL_ERNN_NMIX_OPRC` | 총수익지수시가지수 | string | Y | 1 |  |
| `TOTL_ERNN_NMIX_HGPR` | 총수익지수최고가 | string | Y | 1 |  |
| `TOTL_ERNN_NMIX_LWPR` | 총수익지수최저가 | string | Y | 1 |  |
| `TOTL_ERNN_NMIX` | 총수익지수 | string | Y | 1 |  |
| `PRDY_TOTL_ERNN_NMIX` | 전일총수익지수 | string | Y | 1 |  |
| `TOTL_ERNN_NMIX_PRDY_VRSS` | 총수익지수전일대비 | string | Y | 1 |  |
| `TOTL_ERNN_NMIX_PRDY_VRSS_SIGN` | 총수익지수전일대비부호 | string | Y | 1 |  |
| `TOTL_ERNN_NMIX_PRDY_CTRT` | 총수익지수전일대비율 | string | Y | 1 |  |
| `CLEN_PRC_NMIX` | 순가격지수 | string | Y | 1 |  |
| `MRKT_PRC_NMIX` | 시장가격지수 | string | Y | 1 |  |
| `BOND_CALL_RNVS_NMIX` | Call재투자지수 | string | Y | 1 |  |
| `BOND_ZERO_RNVS_NMIX` | Zero재투자지수 | string | Y | 1 |  |
| `BOND_FUTS_THPR` | 선물이론가격 | string | Y | 1 |  |
| `BOND_AVRG_DRTN_VAL` | 평균듀레이션 | string | Y | 1 |  |
| `BOND_AVRG_CNVX_VAL` | 평균컨벡서티 | string | Y | 1 |  |
| `BOND_AVRG_YTM_VAL` | 평균YTM | string | Y | 1 |  |
| `BOND_AVRG_FRDL_YTM_VAL` | 평균선도YTM | string | Y | 1 |  |

**Request Example:**
```
{           "header":           {                    "approval_key": "35xxxxxa-bxxa-4xxb-87xxx-f56xxxxxxxxxx",                    "custtype":"P",                    "tr_type":"1",                    "content-type":"utf-8"           },           "body":           {                    "input":                    {                             "tr_id":"H0BICNT0",                             "tr_key":"KBPR01"                    }           }  }
```

**Response Example:**
```
# 연결 확인  {      "header": {          "tr_id": "H0BICNT0",           "tr_key": "KBPR01",           "encrypt": "N"          },       "body": {          "rt_cd": "0",           "msg_cd": "OPSP0000",          "msg1": "SUBSCRIBE SUCCESS",           "output": {              "iv": "0123456789abcdef",               "key": "abcdefghijklmnopabcdefghijklmnop"}          }  }    # output - 정제 전  0\|H0BICNT0\|001\|KBPR01^20240726^131500^163.55^163.56^163.52^163.54^163.53^0.00^2^0.00^98.92^99.50^163.54^161.83^0.00^9.45^181.22^3.07^0.00    # output - 정제 후  #### 채권지수 체결 ####  ============================================  ### [1 / 1]  지수ID         [KBPR01]  기준일자1        [20240726]  전송시간         [131500]  총수익지수시가지수    [163.55]  총수익지수최고가     [163.56]  총수익지수최저가     [163.52]  총수익지수        [163.54]  전일총수익지수      [163.53]  총수익지수전일대비    [0.00]  총수익지수전일대비부호  [2]  총수익지수전일대비율   [0.00]  순가격지수        [98.92]  시장가격지수       [99.50]  Call재투자지수    [163.54]  Zero재투자지수    [161.83]  선물이론가격       [0.00]  평균듀레이션       [9.45]  평균컨벡서티       [181.22]  평균YTM        [3.07]  평균선도YTM      [0.00]
```

---
