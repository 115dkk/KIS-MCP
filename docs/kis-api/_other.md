# (기타) API

한국투자증권 OpenAPI — `(기타)` 카테고리 (5개).
원본 시트는 cp949 엑셀이며 본 파일은 LLM 친화 변환본. 검색은 `INDEX.md` 권장.

공통 OAuth 헤더(`authorization`, `appkey`, `appsecret`, `tr_id`, `custtype` 등)는 모든 API 동일하므로 본 문서에서 생략. `INDEX.md` 상단 참고.

---
### 1. API 목록

| Field | Value |
|---|---|
| Sheet | `API 목록` |
| Menu | — |
| Method | `GET` |
| URL | — |
| TR_ID (실전) | — |

---
### 2. Hashkey

| Field | Value |
|---|---|
| Sheet | `Hashkey` |
| Menu | OAuth인증 |
| Method | `POST` |
| URL | `/uapi/hashkey` |
| TR_ID (실전) | — |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `JsonBody` | 요청값 | object | Y |  | POST로 보낼 body값    ex)  datas = {      "CANO": '00000000',      "ACNT_PRDT_CD": "01",      "OVRS_EXCG_CD": "SHAA"   } |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `JsonBody` | 요청값 | object | Y |  | 요청한 JsonBody |
| `HASH` | 해쉬키 | string | Y | 256 | [POST API 대상] Client가 요청하는 Request Body를 hashkey api로 생성한 Hash값  * API문서 > hashkey 참조 |

**Request Example:**
```
{  	"ORD_PRCS_DVSN_CD": "02",  	"CANO": "계좌번호",  	"ACNT_PRDT_CD": "03",  	"SLL_BUY_DVSN_CD": "02",  	"SHTN_PDNO": "101S06",  	"ORD_QTY": "1",  	"UNIT_PRICE": "370",  	"NMPR_TYPE_CD": "",  	"KRX_NMPR_CNDT_CD": "",  	"CTAC_TLNO": "",  	"FUOP_ITEM_DVSN_CD": "",  	"ORD_DVSN_CD": "02"  }
```

**Response Example:**
```
{    "BODY": {      "ORD_PRCS_DVSN_CD": "02",      "CANO": "계좌번호",      "ACNT_PRDT_CD": "03",      "SLL_BUY_DVSN_CD": "02",      "SHTN_PDNO": "101S06",      "ORD_QTY": "1",      "UNIT_PRICE": "370",      "NMPR_TYPE_CD": "",      "KRX_NMPR_CNDT_CD": "",      "CTAC_TLNO": "",      "FUOP_ITEM_DVSN_CD": "",      "ORD_DVSN_CD": "02"    },    "HASH": "8b84068222a49302f7ef58226d90403f62e216828f8103465f900de0e7be2f0f"  }
```

---
### 3. 실시간 (웹소켓) 접속키 발급

| Field | Value |
|---|---|
| Sheet | `실시간 (웹소켓) 접속키 발급` |
| Menu | OAuth인증 |
| Method | `POST` |
| URL | `/oauth2/Approval` |
| TR_ID (실전) | — |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `grant_type` | 권한부여타입 | string | Y | 18 | "client_credentials" |
| `appkey` | 앱키 | string | Y | 36 | 한국투자증권 홈페이지에서 발급받은 appkey (절대 노출되지 않도록 주의해주세요.) |
| `secretkey` | 시크릿키 | string | Y | 180 | 한국투자증권 홈페이지에서 발급받은 appsecret (절대 노출되지 않도록 주의해주세요.)  * 주의 : appsecret와 secretkey는 동일하오니 착오없으시기 바랍니다. (용어가 다른점 양해 부탁드립니다.) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `approval_key` | 웹소켓 접속키 | string | Y | 286 | 웹소켓 이용 시 발급받은 웹소켓 접속키를 appkey와 appsecret 대신 헤더에 넣어 API 호출합니다. |

**Request Example:**
```
{  	"grant_type": "client_credentials",  	"appkey": "PSg5dctL9dKPo727J13Ur405OSXXXXXXXXXX",  	"secretkey": "yo2t8zS68zpdjGuWvFyM9VikjXE0i0CbgPEamnqPA00G0bIfrdfQb2RUD1xP7SqatQXr1cD1fGUNsb78MMXoq6o4lAYt9YTtHAjbMoFy+c72kbq5owQY1Pvp39/x6ejpJlXCj7gE3yVOB/h25Hvl+URmYeBTfrQeOqIAOYc/OIXXXXXXXXXX"  }
```

**Response Example:**
```
{      "approval_key": "a2585daf-8c09-4587-9fce-8ab893XXXXX"  }
```

---
### 4. 접근토큰폐기(P)

| Field | Value |
|---|---|
| Sheet | `접근토큰폐기(P)` |
| Menu | OAuth인증 |
| Method | `POST` |
| URL | `/oauth2/revokeP` |
| TR_ID (실전) | — |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `appkey` | 고객 앱Key | string | Y | 36 | 한국투자증권 홈페이지에서 발급받은 appkey (절대 노출되지 않도록 주의해주세요.) |
| `appsecret` | 고객 앱Secret | string | Y | 180 | 한국투자증권 홈페이지에서 발급받은 appsecret (절대 노출되지 않도록 주의해주세요.) |
| `token` | 접근토큰 | string | Y | 286 | OAuth 토큰이 필요한 API 경우 발급한 Access token  일반고객(Access token 유효기간 1일, OAuth 2.0의 Client Credentials Grant 절차를 준용)  법인(Access token 유효기간 3개월, Refresh token 유효기간 1년, OAuth 2.0의 Authorization Code Grant 절차를 준용) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `code` | 응답코드 | string | N | 8 | HTTP 응답코드 |
| `message` | 응답메세지 | string | N | 450 | 응답메세지 |

**Request Example:**
```
{    "appkey" : "PSw2UvBQCpoZFc7nZpIfIrOttmXXXXXXXXXX",    "appsecret" : "/g84gaZp7W3DJEZhamiTH8ZdJkUJ8603rjo3HcOm5PvIc1YC3YmyJOQoW1H0kNjo4IbHwGUdi3+9oEbH4RKKl8GnEu3n/khxm0OrwHkQur+wbA74fcFXxaUnEbftu0X72Eaw9dEBMuK3rODeeOanrsJ1kZ9oKWykIG04F0nmgdXXXXXXXXXX",    "token" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjZmNDgxMjBiLTlmMDItNGI5ZS05MGExLTRiNDk2MGM5ZWY2MyIsImlzcyI6InVub2d3IiwiZXhwIjoxNjQzMjg2MDUzLCJpYXQiOjE2NDMxOTk2NTMsImp0aSI6IlBTdzJVdkJRQ3dvWkZhOG5acElmSXJPdHRtZUtLUGZCclNKcyJ9.6Z-UvArobBfXbnpSFbFhd9WPVEM3ZQa5NEpqfmQ6rrZBISCi-P9CEamfVReIduTVYbafF02Pl6EPXXXXXXXXXX"  }
```

**Response Example:**
```
{    "code" : 200,    "message" : "접근토큰 폐기에 성공하였습니다"  }
```

---
### 5. 접근토큰발급(P)

| Field | Value |
|---|---|
| Sheet | `접근토큰발급(P)` |
| Menu | OAuth인증 |
| Method | `POST` |
| URL | `/oauth2/tokenP` |
| TR_ID (실전) | — |

#### Request Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `grant_type` | 권한부여 Type | string | Y | 18 | client_credentials |
| `appkey` | 앱키 | string | Y | 36 | 한국투자증권 홈페이지에서 발급받은 appkey (절대 노출되지 않도록 주의해주세요.) |
| `appsecret` | 앱시크릿키 | string | Y | 180 | 한국투자증권 홈페이지에서 발급받은 appsecret (절대 노출되지 않도록 주의해주세요.) |

#### Response Body

| Element | 한글명 | Type | Req | Len | Description |
|---|---|---|---|---|---|
| `access_token` | 접근토큰 | string | Y | 350 | OAuth 토큰이 필요한 API 경우 발급한 Access token  ex) "eyJ0eXUxMiJ9.eyJz…..................................."     - 일반개인고객/일반법인고객    . Access token 유효기간 1일    .. 일정시간(6시간) 이내에 재호출 시에는 직전 토큰값을 리턴    . OAuth 2.0의 Client Credentials Grant 절차를 준용     - 제휴법인    . Access token 유효기간 3개월    . Refresh token 유효기간 1년    . OAuth 2.0의 Authorization Code Grant 절차를 준용 |
| `token_type` | 접근토큰유형 | string | Y | 20 | 접근토큰유형 : "Bearer"  ※ API 호출 시, 접근토큰유형 "Bearer" 입력. ex) "Bearer eyJ...." |
| `expires_in` | 접근토큰 유효기간 | number | Y | 10 | 유효기간(초)  ex) 7776000 |
| `access_token_token_expired` | 접근토큰 유효기간(일시표시) | string | Y | 50 | 유효기간(년:월:일 시:분:초)  ex) "2022-08-30 08:10:10" |

**Request Example:**
```
{    "grant_type": "client_credentials",    "appkey": "PSg5dctL9dKPo727J13Ur405OSXXXXXXXXXX",    "appsecret":  "yo2t8zS68zpdjGuWvFyM9VikjXE0i0CbgPEamnqPA00G0bIfrdfQb2RUD1xP7SqatQXr1cD1fGUNsb78MMXoq6o4lAYt9YTtHAjbMoFy+c72kbq5owQY1Pvp39/x6ejpJlXCj7gE3yVOB/h25Hvl+URmYeBTfrQeOqIAOYc/OIXXXXXXXXXX"  }
```

**Response Example:**
```
{  	"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6ImMwNzM1NTYzLTA1MjctNDNhZS05ODRiLTJiNWI1ZWZmOWYyMyIsImlzcyI6InVub2d3IiwiZXhwIjoxNjQ5NzUxMTAwLCJpYXQiOjE2NDE5NzUxMDAsImp0aSI6IkJTZlM0QUtSSnpRVGpmdHRtdXZlenVQUTlKajc3cHZGdjBZVyJ9.Oyt_C639yUjWmRhymlszgt6jDo8fvIKkkxH1mMngunV1T15SCC4I3Xe6MXxcY23DXunzBfR1uI0KXXXXXXXXXX",  	"access_token_token_expired":"2023-12-22 08:16:59",  	"token_type":"Bearer",  	"expires_in":86400  }
```

---
