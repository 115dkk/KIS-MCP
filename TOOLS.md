# Tools & Prompts

각 도구의 입력·출력 스펙과 사용 예시. 모든 도구는 JSON 텍스트 콘텐츠를 반환합니다. 하단에 다중 도구 워크플로 prompt 4종도 정리되어 있습니다.

> **참고:** 각 도구의 "When to use" 가이드는 [server.ts](src/mcp/server.ts)의 `description`/`instructions`와 동일합니다. server.ts가 단일 진실원이고 본 문서는 그 미러입니다.

## 종목코드 형식

`symbol` 파라미터는 **1~12자 영숫자**. 입력 시 자동으로 trim + 대문자 변환됩니다.

| 종류 | 형식 | 예 |
|---|---|---|
| 일반 주식 | 6자리 숫자 | `005930` (삼성전자), `247540` (에코프로비엠) |
| ETF | 6자리 숫자 | `069500` (KODEX 200), `102780` (KODEX 삼성그룹) |
| ETN | **Q + 6자리 숫자** (KIS 명세) | `Q500001` |
| ELW | 6자리 영숫자 | (시장 상장 코드 그대로) |

소문자도 허용 (`q500001` → 자동으로 `Q500001`). 특수문자·공백 사이 입력·12자 초과는 거부됩니다.

---

## `ping`

**When to use:** MCP 연결 확인, 토큰 발급 가능 여부 디버깅. 시크릿은 노출되지 않음.

**Input:** 없음

**Output:**
```json
{
  "serverStatus": "ok",
  "timestamp": "2026-04-18T03:00:00.000Z",
  "tokenStatus": "valid",
  "kvStatus": "ok",
  "lastKisCallAt": "2026-04-18T02:59:55.123Z"
}
```

---

## `get_quote`

**When to use:** 종목 현재가/등락/기본 재무를 한 번에. 주식은 PER/PBR 등 fundamentals, ETF는 NAV/괴리율 등 etfMetrics 분기.

**Input:**
| 파라미터 | 타입 | 필수 | 비고 |
|---------|------|------|------|
| `symbol` | string (6자리) | ✓ | 종목코드 |
| `instrumentType` | "stock" \| "etf" \| "auto" | | 기본 auto |

**Output (주식):**
```json
{
  "symbol": "005930",
  "sector": "전기·전자",
  "market": "KOSPI",
  "price": 78500,
  "changeRate": 1.42,
  "volume": 12345678,
  "open": 77800, "high": 78900, "low": 77500,
  "yearHigh": 88800, "yearLow": 65500,
  "yearHighDate": "20260318",
  "yearLowDate": "20250612",
  "fundamentals": {
    "per": 14.2, "pbr": 1.4, "eps": 5530, "bps": 56000,
    "marketCap": 4685000, "listedShares": 5969782550,
    "creditBalanceRatePct": 0.34, "volumeTurnoverPct": 0.21,
    "tradingValue": 982634000000
  },
  "resolvedAs": "stock"
}
```

**Output (ETF):** ETF는 PER/PBR이 없고, 시총 대신 순자산총액·NAV·괴리율 등을 `etfMetrics`로 반환:
```json
{
  "symbol": "069500",
  "sector": "지수ETF",
  "price": 35200,
  "yearHigh": 36100, "yearLow": 28900,
  "etfMetrics": {
    "nav": 35185.42, "navChangeRate": 0.78,
    "discountPct": 0.04, "trackingErrorPct": 0.12,
    "netAssets": 6234100000000, "componentCount": 200,
    "lpHoldingRatePct": 12.4, "foreignHoldingRatePct": 4.1,
    "dividendCycle": "분기", "representativeSector": "코스피200"
  },
  "resolvedAs": "etf"
}
```

**참고:** `sector`는 KIS `bstp_kor_isnm`(업종 분류명)을 그대로 노출합니다. 실제 종목명/ETF명은 inquire-price 응답에 포함되지 않습니다.

---

## `get_return`

**When to use:** 단일 기간 수익률(%) 한 줄. 시계열 자체가 필요하면 `get_chart`.

**Input:**
- `symbol`: 6자리 종목코드
- `period`: `1D` | `1W` | `1M` | `3M` | `6M` | `1Y` | `3Y` | `5Y` | `YTD`

**Output:**
```json
{
  "symbol": "005930", "period": "1Y",
  "startDate": "2025-04-18", "endDate": "2026-04-17",
  "startPrice": 65500, "endPrice": 78500,
  "absoluteReturnPct": 19.85,
  "annualizedReturnPct": 19.85,
  "pointCount": 247
}
```

---

## `get_chart`

**When to use:** OHLCV 시계열. 일봉~연봉뿐 아니라 분봉(1/3/5/10/15/30/60분)도 지원.

**Input:**
- `symbol`: 6자리
- `period`: `day` | `week` | `month` | `year` | `minute`
- `startDate`, `endDate`: `YYYYMMDD` (옵션)
- `adjusted`: 수정주가 여부 (기본 `true`). day/week/month/year 전용
- `maxPoints`: 1~2000 (기본 500)
- `intervalMinutes`: `1`|`3`|`5`|`10`|`15`|`30`|`60` (기본 1, `period=minute` 전용)

**Output:**
```json
{
  "symbol": "005930",
  "period": "minute",
  "intervalMinutes": 5,
  "startDate": "20260423",
  "endDate": "20260423",
  "points": [
    { "date": "2026-04-23 09:00:00", "open": 78500, "high": 78700, "low": 78400, "close": 78650, "volume": 124300 }
  ],
  "rawCount": 78,
  "pagesFetched": 4
}
```

**일봉/주봉/월봉/연봉**: KIS API는 호출당 100건 cap이라 페이지네이션 루프(최대 20회 ≈ 8년치)로 자동 확장. 페이지 상한 도달 시 `notes` 필드로 안내.

**분봉**:
- 기본 범위는 오늘 하루(약 391분 = 1분봉 기준 391포인트). 미지정 시 자동.
- 최대 5 영업일까지 조회 가능 (그 이상은 `period=day`로).
- 1분봉을 base로 받아 클라이언트에서 N분봉 집계 (open=첫봉시가, close=마지막봉종가, high/low=구간 max/min, volume=합).
- 시간외 단일가(8:30 이전, 15:30 이후)는 분봉 일관성을 위해 제외.
- 호출 횟수가 많아 워커 30s wall-clock 안에서 처리되도록 `intervalMinutes`를 키우면 빠름.

**다운샘플링**: `rawCount > maxPoints`이면 균등 다운샘플 후 `downsampledTo` 필드 표시.

---

## `get_etf_components`

**When to use:** ETF 구성종목 비중 확인. 위험 분석 시 `inspect_etf` prompt나 `get_credit_ratio`와 조합.

**Input:**
- `symbol`: ETF 6자리
- `limit`: 1~200 (기본 50)

**Output:**
```json
{
  "etfSymbol": "069500",
  "totalCount": 200,
  "totalWeightPct": 100.0,
  "topNCount": 50,
  "topNWeightPct": 92.3,
  "components": [
    { "symbol": "005930", "name": "삼성전자", "weightPct": 28.4, "price": 78500, "change": 1100, "changeRate": 1.42 }
  ]
}
```

---

## `get_fundamentals`

**When to use:** PER/PBR/EPS/BPS·시총·상장주식수·융자잔고비율. 배당수익률은 여기 없음 → `get_dividend`.

**Input:** `symbol`

**Output:** `{symbol, name, per, pbr, eps, bps, marketCap, listedShares, creditBalanceRatePct, volumeTurnoverPct, price, source}`

> 배당수익률은 `inquire-price` 응답에 포함되지 않습니다 → `get_dividend` 도구 참조.

---

## `get_dividend`

**When to use:** TTM 배당수익률 + 배당 기록. `get_fundamentals`에는 배당 정보가 없으므로 별도 호출.

**Input:**
- `symbol`: 6자리
- `lookbackMonths`: 1~36 (기본 12)
- `dividendKind`: `all` | `settlement`(결산) | `interim`(중간)

**Output:**
```json
{
  "symbol": "005930",
  "isinName": "삼성전자",
  "currentPrice": 78500,
  "ttmCashDividendPerShare": 1444,
  "ttmDividendYieldPct": 1.84,
  "records": [
    { "recordDate": "20251230", "payoutDate": "20260415",
      "dividendKind": "결산배당", "faceValue": 100,
      "cashDividendPerShare": 361,
      "cashDividendRateOfFaceValuePct": 361, "isHighDividend": false }
  ],
  "notes": [
    "배당수익률(TTM%) = 최근 12개월 현금배당금 합계 / 현재가 * 100 (시가배당률 기준).",
    "각 record의 cashDividendRateOfFaceValuePct는 액면배당률 (배당금/액면가). 시가 기준이 아님."
  ]
}
```

**산식:**
- TTM 시가배당률 = 최근 12개월 record_date 기준 `per_sto_divi_amt` 합계 / 현재가 × 100. → `ttmDividendYieldPct`
- 각 record의 `cashDividendRateOfFaceValuePct`는 KIS 응답 `divi_rate` 그대로 — **액면배당률**(배당금/액면가). 삼성전자(액면 100원)는 566원 배당 시 566%로 표시되므로 시가배당률과 혼동 금지.
- 데이터 원천: KIS 예탁원 배당일정 API (HHKDB669102C0).

---

## `get_credit_ratio`

**When to use:** 신용 잔고율/공여율(한투 공식 산식) + 공매도/대차 보조 지표. ETF는 구성종목 가중평균.

**Input:**
- `symbol`: 종목/ETF 6자리
- `instrumentType`: `stock` | `etf` | `auto`
- `lookbackDays`: 5~90 (기본 30)
- `componentLimit`: ETF 가중평균 시 사용할 구성종목 수 (1~50, 기본 30)

**한투 공식 산식 (KIS daily-credit-balance API 제공값):**
- 잔고율(%) = 융자잔고주수 / 신용한도주식수 × 100
- 공여율(%) = 당일 융자신규주수 / 당일 거래량 × 100

**Output (단일 종목):**
```json
{
  "symbol": "247540",
  "resolvedAs": "stock",
  "stock": {
    "sector": "에너지화학",
    "marketCap": 162000,
    "credit": {
      "asOfDate": "20260417",
      "balanceRatioPct": 2.34,
      "contributionRatioPct": 4.12,
      "contributionRatioPctComputed": 4.10,
      "loanBalanceShares": 1234567,
      "loanBalanceAmount": 234567000000,
      "newLoanShares": 12345,
      "redeemedLoanShares": 8901,
      "sampleDays": 30,
      "avgBalanceRatioPct": 2.30,
      "avgContributionRatioPct": 3.95
    },
    "shortSale": { "asOfDate": "20260417", "avgValueRatioPct": 8.4, "sampleDays": 30 },
    "lending": { "asOfDate": "20260417", "latestBalanceShares": 567890, "sampleDays": 30 }
  },
  "notes": ["잔고율(%) = 융자잔고주수 / 신용한도주식수 * 100 ...", "..."]
}
```

**Output (ETF):** 추가로 `etf.weightedAvg.{creditBalanceRatioPct,creditContributionRatioPct,shortValueRatioPct}`, `etf.topByCreditBalanceRatio`, `etf.topByShortValueRatio` 포함 (구성종목 ETF 비중으로 가중평균).

---

## `advanced_search`

**When to use:** 시총/거래량/등락률 랭킹 기반 종목 발굴. 인버스/레버리지/혼합형/커버드콜/선물형 자동 제외. `rankBy=mcap`만 시총 데이터 포함하므로 `minMcap` 필터는 mcap 모드에서만 유효.

**Input:**
| 파라미터 | 타입 | 비고 |
|---------|------|------|
| `rankBy` | `return_1y`/`return_6m`/`return_3m`/`return_1m`/`volume`/`mcap` | 후보군 소스 |
| `order` | `asc` \| `desc` | 기본 `desc` |
| `limit` | 1~100 | 기본 20 |
| `instrumentType` | `stock` \| `etf` \| `both` | (현재 KIS 랭킹은 통합 풀에서 필터링) |
| `sectorKeywords` | `string[]` | 종목명에 하나라도 포함되어야 함 |
| `excludeKeywords` | `string[]` | 추가 제외 키워드 |
| `minMcap` | number | 시총 하한 (한투 hts_avls 단위) |
| `maxPer` | number | (계획됨, 추후 enrichment에서 필터) |
| `excludeOverseas` | boolean | true 시 미국/나스닥/중국 등 해외추종 ETF 제외 |
| `enrichWithReturn` | boolean | true 시 후보 종목별 실제 수익률 계산(느림) |

**기본 자동 제외 키워드:** `인버스`, `레버리지`, `2X`, `3X`, `Inverse`, `Leverage`, `커버드콜`, `CoveredCall`, `채권혼합`, `혼합`, `밸런스`, `선물`, `Futures`.

**Output:**
```json
{
  "query": { "...": "..." },
  "pulled": 80,
  "afterFilters": 35,
  "hits": [
    { "symbol": "069500", "name": "KODEX 200", "price": 35200, "changeRate": 0.8, "marketCap": 76000, "rankFromKis": 1 }
  ],
  "notes": ["KIS 시가총액 상위 랭킹을 후보군으로 사용"]
}
```

---

## `get_index` / `get_index_chart`

**When to use:** 한국·해외 시장 지수 (KOSPI, KOSDAQ, KOSPI200, S&P 500, NASDAQ, Dow). alias 입력 권장.

**alias 매핑** (대소문자·한글·영문·하이픈/공백 무시):

| 카테고리 | alias | 한투 코드 | 비고 |
|---|---|---|---|
| 국내 | `KOSPI`, `코스피`, `KS11` | MRKT=U / ISCD=0001 | |
| 국내 | `KOSDAQ`, `코스닥`, `KQ11` | MRKT=U / ISCD=1001 | |
| 국내 | `KOSPI200`, `코스피200`, `KS200` | MRKT=U / ISCD=2001 | |
| 국내 | `KSQ150`, `KOSDAQ150` | MRKT=U / ISCD=3003 | |
| 해외 | `SPX`, `S&P500`, `SP500` | MRKT=N / ISCD=SPX | |
| 해외 | `NASDAQ`, `COMP`, `IXIC`, `나스닥` | MRKT=N / ISCD=COMP | NASDAQ Composite |
| 해외 | `NDX`, `NASDAQ-100`, `NASDAQ100` | MRKT=N / ISCD=NDX | |
| 해외 | `DJI`, `DOW`, `DJIA`, `다우` | MRKT=N / ISCD=`.DJI` | dot prefix 필요 (한투 마스터) |

**Input (`get_index`):** `{ symbol: string }`
**Input (`get_index_chart`):** `{ symbol: string, period?: "1M"|"3M"|"6M"|"1Y"|"3Y"|"5Y"|"YTD", maxPoints?: 1~500 }`

**Output (`get_index`):**
```json
{
  "input": "KOSPI", "name": "코스피", "resolvedCode": "0001",
  "category": "index-domestic",
  "value": 6388.47, "change": 169.38, "changeRate": 2.72,
  "open": 6302.54, "high": 6388.47, "low": 6302.54,
  "ytdHigh": 6388.47, "ytdHighDate": "20260421",
  "ytdLow": 4216.68, "ytdLowDate": "20260102",
  "advancing": 457, "declining": 410, "unchanged": 40,
  "source": "kis-domestic"
}
```

해외지수는 KIS가 실시간 미지원이므로 최근 영업일 종가 (`notes`에 안내).

**period→봉 매핑 (자동):** 1M/3M/6M/YTD=일봉, 1Y=주봉, 3Y/5Y=월봉. 국내 일봉 API는 100건 cap.

---

## `get_fx` / `get_fx_chart`

**When to use:** 환율. alias 입력 권장.

| alias | 한투 ISCD | 단위 |
|---|---|---|
| `USDKRW`, `원달러`, `달러` | FX@KRW | 원 |
| `EURKRW`, `유로` | FX@EUR | 원 |
| `JPYKRW`, `엔화` | FX@JPY | 원 (100엔당) |
| `CNYKRW`, `위안` | FX@CNY | 원 |

**Input (`get_fx`):** `{ pair: string }`
**Input (`get_fx_chart`):** `{ pair: string, period?: ..., maxPoints?: ... }`

**Output (`get_fx`):**
```json
{
  "input": "USDKRW", "pair": "USD/KRW", "resolvedCode": "FX@KRW",
  "rate": 1472.0, "change": -0.8, "changeRate": -0.0543,
  "asOf": "2026-04-21", "unit": "원",
  "source": "kis-overseas-chartprice"
}
```

한투에 환율 전용 API가 없어 `overseasChartPrice(MRKT=X)` 최근 1영업일 종가 추출.

---

## `get_commodity` / `get_commodity_chart`

**When to use:** 원자재 (WTI, Brent, 금). alias 입력 권장.

| alias | srsBase | 만기물 자동산출 예 | 단위 | priceDecimals |
|---|---|---|---|---|
| `WTI`, `WTI원유`, `CL` | CL | CLK26 (5월물) | USD/barrel | 2 (raw/100) |
| `BRENT`, `브렌트유`, `브렌트`, `BRN` | BRN | BRNK26 | USD/barrel | 2 (raw/100) |
| `GOLD`, `금`, `GC` | GC | GCK26 | USD/oz | 1 (raw/10) |

**입력 형식 SRS_CD:** `<base><월코드 F~Z><2자리 연도>`. 월코드: F=1월, G=2월, H=3월, J=4월, K=5월, M=6월, N=7월, Q=8월, U=9월, V=10월, X=11월, Z=12월. 만기 25일 전부터 다음 달 만기물로 자동 롤오버.

**Input (`get_commodity`):** `{ symbol: string }` — alias 또는 raw SRS_CD (예: `CLN26`).
**Input (`get_commodity_chart`):** `{ symbol: string, period?: ..., maxPoints?: ... }`

**Output (`get_commodity`):**
```json
{
  "input": "WTI", "name": "WTI 원유 (NYMEX / 한투 CME 분류)",
  "resolvedCode": "CLK26", "category": "commodity-futures",
  "price": 89.15, "change": null, "changeRate": null,
  "high": 89.50, "low": 88.40, "open": 89.00,
  "asOf": "2026-04-21", "unit": "USD/barrel",
  "source": "kis-overseas-futures",
  "notes": [
    "해외선물 SRS_CD 'CLK26'은 가장 가까운 미래 만기물입니다 (자동 산출).",
    "가격은 한투 raw 응답 / 10^2 (sCalcDesz 보정)"
  ]
}
```

**알려진 한계:**
- **Brent**: 한투 응답에서 `last_price`가 비어 있을 수 있음 (만기물 활성도 추정). `sttl_price` → `prev_clpr` 순으로 자동 fallback. 모두 비면 raw SRS_CD로 다른 만기물 (`BRNM26`, `BRNN26`) 시도 또는 `KODEX 브렌트원유선물` ETF 활용.
- **V-KOSPI 변동성지수**: 한투 직접 시세 없음. 미지원.
- **KRX 금현물**: 한투 미지원. COMEX 금선물(GC)로 우회.

---

## 공통 에러 형식

도구 실행 실패 시 `isError: true` 와 함께 한글 메시지 반환:

```text
한투 API 에러 (EGW00123): 유효하지 않은 종목코드
```

네트워크/타임아웃 오류는 `KIS API 호출 실패: ...` 로 시작합니다.

---

# Prompts (워크플로 템플릿)

다중 도구 호출이 필요한 빈번한 분석 시나리오를 MCP Prompt로 캡슐화. 클라이언트(Claude Desktop, Cursor 등)에서 슬래시 커맨드처럼 노출됩니다. 사용자가 prompt를 호출하면 LLM이 안내문을 받고 적절한 도구를 순차/병렬 호출합니다.

## `analyze_credit_risk(symbol)`

**역할:** 단일 종목의 신용 위험 종합 분석.

**호출 도구:** `get_credit_ratio` → `get_quote` → `get_chart`

**평가:** 잔고율 급등(개미털기 신호), 공여율 급증(단기 신용 매수), 가격 추세와의 동조/역행, 공매도 비중 동시 상승 여부.

---

## `inspect_etf(etfSymbol, topN?)`

**역할:** ETF 자체 + 상위 N개 구성종목의 위험 점검.

**호출 도구:** `get_quote(etf)` → `get_etf_components` → 상위 N개 각각 `get_credit_ratio`

**평가:** ETF NAV-가격 괴리율, 구성종목별 잔고율, 비중 가중 위험도.

**기본값:** topN=10

---

## `screen_value_stocks(sectorKeywords?, maxPer?, maxPbr?)`

**역할:** 저PER/저PBR 가치주 발굴.

**호출 도구:** `advanced_search(rankBy=mcap)` → 후보별 `get_fundamentals` → 필터링 → (옵션) `get_dividend`

**기본값:** maxPer=15, maxPbr=1.5. sectorKeywords는 쉼표 구분 문자열.

---

## `screen_high_dividend(sectorKeywords?, minYieldPct?)`

**역할:** TTM 배당수익률 기반 고배당 종목 발굴.

**호출 도구:** `advanced_search(rankBy=mcap)` → 후보별 `get_dividend` → 필터링 → (옵션) `get_fundamentals`

**기본값:** minYieldPct=4.0. sectorKeywords는 쉼표 구분 문자열.

> Prompt 인자는 MCP 사양상 모두 문자열입니다 (숫자/배열은 핸들러 내부에서 파싱). 클라이언트 UI는 자연어 텍스트 입력으로 표시됩니다.
