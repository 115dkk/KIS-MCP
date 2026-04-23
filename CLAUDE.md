# KIS Read-Only MCP Server 요구사항 명세

본 문서는 한국투자증권 OpenAPI를 기반으로 하는 **조회 전용 MCP 서버**를 Cloudflare Workers에 배포하기 위한 요구사항을 정의한다. Claude Code는 이 문서를 기준으로 TypeScript 프로젝트를 처음부터 작성한다.

---

## 1. 프로젝트 개요

### 1.1. 목적
Claude에게 한국 주식/ETF 시장 데이터 분석 능력을 부여한다. 시세 조회, 수익률 분석, ETF 구성 분석, 신용거래율 확인, 고급 검색 등의 기능을 제공하되, 매매 실행은 원천적으로 차단한다.

### 1.2. 배포 환경
- Runtime: Cloudflare Workers (V8 isolates)
- Protocol: MCP over SSE
- Storage: Cloudflare KV (OAuth 토큰 캐싱용)

### 1.3. 핵심 제약
- **매매 기능 일체 불포함.** 조회 엔드포인트만 구현한다. 잔고, 주문, 체결 관련 도구는 만들지 않는다.
- 한국투자증권 OpenAPI는 read-only 권한 신청 자체가 불가능하다(발급 옵션이 없음). 따라서 키 권한으로 매매를 차단할 수 없으며, **유일한 방어선은 코드에 매매 엔드포인트를 처음부터 정의하지 않는 것**이다. 본 프로젝트가 한투 공식 샘플을 그대로 포팅하지 않은 핵심 이유이기도 하다.
- 사용자 개인 계좌 정보(잔고, 보유 종목)에 접근하는 어떤 도구도 구현하지 않는다. 이 MCP는 **시장 데이터 분석 도구**이지 개인 계좌 관리 도구가 아니다.

---

## 2. 기술 스택

| 항목 | 선택 | 이유 |
|------|------|------|
| 언어 | TypeScript | V8 네이티브, 타입 안전성 |
| MCP SDK | `@modelcontextprotocol/sdk` | 공식 TypeScript SDK |
| HTTP | fetch (내장) | 외부 의존성 최소화 |
| 빌드/배포 | Wrangler | Cloudflare 공식 CLI |
| 토큰 저장소 | Cloudflare KV | 엣지 복제, TTL 지원 |
| 테스트 | Vitest + `@cloudflare/vitest-pool-workers` | 워커 환경 시뮬레이션 |

**금지:** 파이썬, Docker, 동적 코드 실행(`eval`, 외부 URL에서 코드 다운로드 후 실행).

---

## 3. 아키텍처

### 3.1. 모듈 구조
```
src/
├── index.ts              # Worker 엔트리 포인트, MCP 서버 초기화
├── mcp/
│   ├── server.ts         # MCP 서버 설정
│   └── sse.ts            # SSE transport
├── kis/
│   ├── auth.ts           # OAuth 토큰 발급/캐싱/갱신
│   ├── client.ts         # REST 호출 래퍼 (공통 헤더, 에러 처리)
│   ├── endpoints.ts      # 엔드포인트 URL/TR_ID 상수
│   └── types.ts          # 응답 타입 정의
├── tools/
│   ├── quote.ts          # 4.1 시세 조회
│   ├── return.ts         # 4.2 수익률 조회
│   ├── chart.ts          # 4.3 차트 데이터
│   ├── etf.ts            # 4.4 ETF 구성종목
│   ├── fundamentals.ts   # 4.5 재무 정보
│   ├── credit.ts         # 4.6 신용거래율
│   └── search.ts         # 4.7 고급 검색 (메타 도구)
└── utils/
    ├── cache.ts          # KV 래퍼
    ├── ratelimit.ts      # 레이트 리미팅
    ├── filters.ts        # 인버스/레버리지 필터링
    └── downsample.ts     # 차트 다운샘플링
```

### 3.2. 인증 흐름
1. 첫 호출 시 `POST /oauth2/tokenP`로 토큰 발급 (`appkey`, `appsecret` 사용).
2. 발급된 `access_token`을 KV에 TTL 23시간으로 저장 (실제 만료 24시간 대비 안전마진).
3. 이후 모든 호출은 KV에서 토큰 조회 후 `Authorization: Bearer {token}` 헤더로 사용.
4. 만료 임박(TTL 1시간 이내) 시 자동 재발급.
5. 401 응답 수신 시 즉시 재발급 후 재시도 (1회 한정).

---

## 4. 기능 요구사항

### 4.1. 시세 조회 (`get_quote`)
**입력:** 종목코드 (6자리), 종목유형 (stock | etf, 자동 감지 가능)
**출력:** 현재가, 전일대비 등락, 거래량, 거래대금, 시가/고가/저가, 52주 최고/최저
**한투 API:**
- 주식: `GET /uapi/domestic-stock/v1/quotations/inquire-price` (TR_ID: `FHKST01010100`)
- ETF: `GET /uapi/etfetn/v1/quotations/inquire-price` (TR_ID: `FHPST02400000`)

### 4.2. 과거 수익률 조회 (`get_return`)
**입력:** 종목코드, 기간 열거형 (`1D`, `1W`, `1M`, `3M`, `6M`, `1Y`, `3Y`, `5Y`, `YTD`)
**출력:** 시작가, 종료가, 절대 수익률(%), 연환산 수익률(기간 1년 초과 시)
**한투 API:** `GET /uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice`
**비고:** 내부적으로는 차트 데이터를 가져와 첫/마지막 값으로 계산.

### 4.3. 차트 데이터 조회 (`get_chart`)
**입력:** 종목코드, 기간 분류 (`day` | `week` | `month` | `year`), 시작일, 종료일
**출력:** OHLCV 시계열 배열 (JSON). 각 요소는 `{date, open, high, low, close, volume}`.
**주의:**
- LLM이 직접 해석할 수 있도록 **텍스트 기반 시계열**로 제공한다. 이미지/바이너리 차트는 생성하지 않는다.
- 응답 크기 제한을 위해 500개 포인트 초과 시 균등 다운샘플링한다.
**한투 API:** 동일 `inquire-daily-itemchartprice` 또는 기간별 시세 API.

### 4.4. ETF 구성종목 조회 (`get_etf_components`)
**입력:** ETF 종목코드
**출력:** 구성종목 리스트. 각 요소는 `{종목코드, 종목명, 비중, 현재가, 전일대비}`. 기본 상위 50개 + 전체 합계.
**한투 API:** `GET /uapi/etfetn/v1/quotations/inquire-component-stock-price` (TR_ID: `FHKST121600C0`)

### 4.5. 재무 기본 정보 (`get_fundamentals`)
**입력:** 종목코드
**출력:** PER, PBR, EPS, BPS, 시가총액, 배당수익률, 상장주식수
**한투 API:** `주식현재가 시세` 또는 `종목투자의견` API의 재무지표 필드를 사용. 필요 시 여러 API 조합.

### 4.6. 신용거래율 조회 (`get_credit_ratio`) **[중요 기능]**
**배경:** 신용잔고율이 과도한 종목은 공매도 세력의 개미털기에 취약하므로, 이를 파악하는 것은 리스크 평가에 핵심이다. HTS/MTS가 모두 제공하는 기본 지표이다.

**입력:** 종목코드 또는 ETF 종목코드 (ETF인 경우 구성종목 전체를 집계)
**출력:**
- 신용잔고율 (시가총액 대비)
- 공매도 잔고율
- 대차잔고 비율
- (ETF의 경우) 구성종목별 신용거래율 분포 및 가중 평균

**한투 API:**
- `GET /uapi/domestic-stock/v1/quotations/daily-credit-balance` (신용잔고)
- `GET /uapi/domestic-stock/v1/quotations/inquire-short-sale` (공매도)
- `종목별 일별 대차거래추이`

**구현 주의:** 단일 API로 얻을 수 없으므로 복수 API를 조합한다. ETF인 경우 `get_etf_components`를 먼저 호출 후 각 구성종목에 대해 순차 조회하며, 레이트 리미팅을 준수한다.

### 4.7. 고급 검색 (`advanced_search`) **[메타 도구]**
여러 API를 조합하는 상위 레벨 도구. LLM이 자연어 쿼리를 이 도구의 파라미터로 변환하여 호출한다.

**지원 쿼리 유형:**
- **수익률 기반 랭킹:** 특정 기간(1M/3M/6M/1Y) 수익률의 상위/하위 N개
- **섹터 필터링:** 바이오, 게임, 2차전지, 반도체, 방산 등 섹터 키워드 기반 조회
- **복합 조건:** 수익률 + 섹터 + 시가총액 등의 조합
- **소외 종목 탐색:** 특정 지수(KOSPI, KOSDAQ) 대비 언더퍼폼 종목

**입력 파라미터:**
```typescript
{
  instrumentType: "stock" | "etf" | "both",
  rankBy: "return_1y" | "return_3m" | "return_1m" | "volume" | "mcap",
  order: "asc" | "desc",
  limit: number,
  sectorKeywords?: string[],        // ["바이오", "게임"] 등
  excludeKeywords?: string[],       // 기본값 자동 주입 (아래 필터 규칙)
  minMcap?: number,
  maxPer?: number
}
```

**필수 필터링 규칙 (항상 기본 제외):**
- **인버스/레버리지:** 종목명에 `인버스`, `레버리지`, `2X`, `3X`, `Inverse` 포함
- **커버드콜:** `커버드콜`, `CoveredCall`
- **채권혼합/혼합형:** `채권혼합`, `혼합`, `밸런스`
- **파생/선물 기반:** `선물`, `Futures` (ETF 이름 기준)
- **해외 자산 ETF:** 기능 범위가 국내이므로 해외 추종 ETF 제외 (선택적; 파라미터로 토글)

**출력:** 조건에 맞는 종목/ETF 리스트 + 각 항목의 핵심 지표 + 쿼리 요약

### 4.8. 헬스체크 (`ping`)
**입력:** 없음
**출력:** 서버 상태, 토큰 유효성, KV 연결 상태, 마지막 API 호출 시각
**용도:** 디버깅, MCP 연결 검증

---

## 5. 비기능 요구사항

### 5.1. 매매 차단 (코드 미정의가 유일 방어선)
- **사실관계:** 한국투자증권 OpenAPI는 read-only 권한 신청 옵션을 제공하지 않는다. 발급된 키는 본질적으로 매매 권한을 포함한다. 따라서 "조회 전용 권한 키"라는 1차 방어선은 존재하지 않는다.
- **유일 방어선:** 코드에 매매 엔드포인트(`/uapi/domestic-stock/v1/trading/*`)를 호출하는 함수를 아예 정의하지 않는다. 상수 파일(`endpoints.ts`)에도 매매 URL을 포함시키지 않는다. 이를 호출하는 도구도 만들지 않는다. MCP 서버는 노출하지 않은 도구를 LLM이 호출할 수 없는 구조이므로, 매매 도구의 부재가 매매의 부재를 강제한다.
- **운영 시 점검:** 의존성 업데이트나 PR 머지 시 매매 관련 코드(trading/order 패턴)가 추가되지 않았는지 매번 확인한다.

### 5.2. 토큰 관리
- TTL 23시간 (실제 만료 24시간 대비 안전마진 1시간)
- 토큰은 KV에만 저장. 로그, 에러 메시지, 응답에 절대 포함하지 않는다.
- 동시 요청 상황에서 토큰 재발급이 중복 발생하지 않도록 KV의 compare-and-swap 또는 락 메커니즘 검토.

### 5.3. 에러 처리
- 한투 API 에러 응답은 LLM이 해석 가능한 메시지로 변환한다. 예: `"rt_cd": "1", "msg_cd": "EGW00123"` → `"한투 API 에러 (EGW00123): 유효하지 않은 종목코드"`.
- Rate limit 히트(HTTP 429 또는 한투 고유 에러 코드) 시 지수 백오프로 최대 3회 재시도.
- 워커 타임아웃(50ms CPU, 30초 wall clock) 고려하여 요청별 타임아웃 25초 설정.
- 인증 실패(401) 시 토큰 재발급 후 1회 재시도.

### 5.4. 응답 크기 관리
- 차트 데이터: 최대 500개 포인트, 초과 시 균등 다운샘플링
- ETF 구성종목: 기본 상위 50개 + 전체 합계 정보 (확장 파라미터로 최대 200개까지)
- 고급 검색 결과: 기본 limit 20, 최대 100

### 5.5. 레이트 리미팅
- 한투 API 공식 제한: 실전 기준 초당 20회
- 본 MCP는 초당 **15회**로 자체 제한 (안전마진)
- 구현: 워커 내부 토큰 버킷 또는 KV 기반 카운터
- 메타 도구(고급 검색, ETF 신용거래율 집계)는 내부 호출들을 순차 처리하며 제한 준수

### 5.6. 로깅
- 요청/응답 메타데이터(tool name, params 일부, latency)만 로깅
- 토큰, API 키, 계좌번호는 로그에 찍지 않는다.
- 에러 발생 시 상세 로그는 Cloudflare Workers Observability로 전송.

---

## 6. 참고 자료

### 6.1. 레퍼런스 코드 (읽기 전용)
- 위치: `open-trading-api/MCP/Kis Trading MCP/`
- GitHub: https://github.com/koreainvestment/open-trading-api
- **용도:** 한투 API 호출 방식, TR_ID, 파라미터 구조 파악
- **주의:** 파이썬 FastMCP 기반이며 동적 코드 실행 패턴을 사용한다. **구조를 그대로 포팅하지 말 것.** TR_ID, 엔드포인트 URL, 파라미터 스펙만 참고하고 구현은 TypeScript로 처음부터 작성한다.

### 6.2. 공식 API 문서
- **LLM 친화 변환본 (사용 권장):** `docs/kis-api/`
  - `INDEX.md` — 339개 전체 API의 TR_ID·URL·카테고리·파일 위치 색인 + 본 MCP 사용 매핑
  - `domestic-stock.md` (186개) / `overseas-stock.md` (51개) / `domestic-futureoption.md` (44개) /
    `overseas-futureoption.md` (35개) / `domestic-bond.md` (18개) / `_other.md` (5개)
  - 각 API: 메타 표(Sheet/Menu/Method/URL/TR_ID) + Request/Response 필드 표 + Request/Response Example
  - 공통 OAuth 헤더(`authorization`/`appkey`/`appsecret` 등)는 INDEX.md에만 한 번 나오고 각 API에서 생략됨
  - **검색 패턴**: TR_ID 찾기 → `grep "FHKST01010100" docs/kis-api/`, 카테고리 전체 보기 → 카테고리 파일 직접 read
- **원본 (소스):** `한국투자증권_오픈API_전체문서_20260418_030007.xlsx`
  - 사람이 직접 더블클릭으로 열 때만 사용. LLM은 cp949 + 셀 단위 구조라 직접 읽기 어려움
- **변환 스크립트:** `scripts/build-api-docs.py` (엑셀 갱신 시 재실행)
- 핵심 참조 시트 (본 MCP 9+6개 도구가 사용):
  - `주식현재가 시세` (FHKST01010100), `ETF/ETN 현재가` (FHPST02400000)
  - `국내주식기간별시세(일_주_월_년)` (FHKST03010100)
  - `ETF 구성종목시세` (FHKST121600C0)
  - `예탁원정보(배당일정)` (HHKDB669102C0)
  - `종목별 일별 신용잔고` (FHPST04760000), `종목별 일별 공매도` (FHPST04830000), `종목별 일별 대차거래추이` (HHPST074500C0)
  - `국내주식 등락률 순위` (FHPST01700000), `시가총액 순위` (FHPST01740000), `거래량 순위` (FHPST01710000)
  - `국내업종 현재지수` (FHPUP02100000), `국내업종 일자별지수` (FHPUP02120000)
  - `해외주식 종목/지수/환율 기간별시세` (FHKST03030100)
  - `해외선물종목현재가` (HHDFC55010000), `해외선물 체결추이(일간)` (HHDFC55020100)

### 6.3. 한투 OpenAPI 포털
- https://apiportal.koreainvestment.com/
- 키 발급 및 공식 가이드 참조

---

## 7. 산출물

### 7.1. 코드
상기 모듈 구조에 따른 TypeScript 소스 파일 일체.

### 7.2. 설정
- `wrangler.toml`: Cloudflare Workers 배포 설정 (KV 바인딩 포함)
- `package.json`: 의존성 정의
- `tsconfig.json`: TypeScript 설정
- `.dev.vars.example`: 환경변수 템플릿 (실제 키는 Secrets로 주입)

### 7.3. 문서
- `README.md`: 설치, 로컬 개발, 배포, 사용 방법, MCP 클라이언트 연결 예시
- `SECURITY.md`: 매매 차단 원칙, API 키 발급 시 권한 설정 가이드
- `TOOLS.md`: 각 도구의 상세 스펙과 예시 호출

### 7.4. 테스트
- 각 툴에 대한 단위 테스트 (mock 응답 기반)
- 인증 토큰 캐싱/갱신 시나리오 테스트
- 필터링 규칙 테스트 (인버스/레버리지 제외 확인)

---

## 8. 환경 변수

| 이름 | 용도 | 등록 방법 |
|------|------|----------|
| `KIS_APP_KEY` | 한투 앱 키 | `wrangler secret put KIS_APP_KEY` |
| `KIS_APP_SECRET` | 한투 앱 시크릿 | `wrangler secret put KIS_APP_SECRET` |
| `KIS_TOKENS` (KV binding) | OAuth 토큰 캐시 | `wrangler kv namespace create` |

**주의:** `.dev.vars`, `.env` 등 시크릿 파일은 git에 커밋하지 않는다. `.gitignore`에 명시.

---

## 9. 검증 방법

### 9.1. 로컬 개발
- `wrangler dev`로 로컬 실행
- Claude Desktop 또는 MCP Inspector로 연결하여 각 도구 수동 호출
- 예상 쿼리:
  - "삼성전자 현재가 알려줘" → `get_quote`
  - "KODEX 200 구성종목 상위 10개" → `get_etf_components`
  - "1년 수익률이 가장 낮은 국내 주식형 ETF 10개, 인버스/레버리지 제외" → `advanced_search`
  - "에코프로비엠 신용거래율" → `get_credit_ratio`

### 9.2. 배포 후
- `wrangler deploy` 후 Claude Desktop의 `mcp-remote`로 워커 URL 연결
- 동일한 쿼리들로 프로덕션 검증
- 에러 시나리오 검증 (잘못된 종목코드, 만료된 토큰 등)

### 9.3. 검증 체크리스트
- [ ] OAuth 토큰 발급 성공, KV에 저장됨
- [ ] 캐싱된 토큰으로 2회 이상 연속 호출 성공
- [ ] 각 도구(4.1~4.8)가 정상 응답
- [ ] 매매 관련 엔드포인트가 코드에 존재하지 않음 (`grep -r "trading" src/` 결과 없음)
- [ ] 인버스/레버리지 ETF가 `advanced_search` 결과에서 자동 제외
- [ ] 차트 데이터가 500포인트 이하로 다운샘플링됨
- [ ] Rate limit 상황에서 재시도 동작
- [ ] 에러 메시지가 한글로 LLM이 해석 가능한 수준

---

## 10. 알려진 이슈 및 주의사항

- 한투 API는 모의투자와 실전투자의 TR_ID가 다르다. 본 MCP는 **실전투자 조회 도구만**으로 구현한다 (실전투자 키 한 종류만 사용. 조회이므로 거래 체결과 무관하지만, 엔드포인트와 TR_ID가 다르다).
- ETF 구성종목 API는 일부 파생형/합성 ETF에 대해 응답이 비어 있을 수 있다. 이 경우 명확한 빈 응답 메시지를 반환한다.
- 신용거래율은 단일 API로 제공되지 않으므로, 대차거래 추이와 공매도 잔고를 조합하여 산출한다. 정확한 산출 공식은 구현 시 한투 고객센터 또는 공식 문서로 재확인 필요.
- Cloudflare Workers는 아웃바운드 요청에 대해 `fetch` 외의 네트워크 프로토콜을 지원하지 않는다. 한투 웹소켓 API (실시간 시세)는 본 MCP 범위에서 **제외**한다. 실시간 데이터가 필요하면 REST 폴링으로 대체.
- MCP 프로토콜의 SSE transport는 워커의 30초 wall clock 제한 내에서 동작해야 한다. 장기 연결이 필요한 경우 Durable Object 검토.

---

## 11. 개발 우선순위

Claude Code가 순차적으로 구현할 권장 순서:

1. **기반:** 프로젝트 골격, `wrangler.toml`, KV 설정, 타입 정의
2. **인증:** `kis/auth.ts` + 토큰 캐싱
3. **클라이언트:** `kis/client.ts` 공통 REST 래퍼
4. **MCP 서버:** `mcp/server.ts` + SSE transport
5. **기본 도구 (4.1~4.3):** 시세, 수익률, 차트
6. **ETF 도구 (4.4):** 구성종목
7. **재무 (4.5):** PER/PBR 등
8. **신용거래율 (4.6):** 복수 API 조합 로직
9. **고급 검색 (4.7):** 메타 도구, 필터링 규칙
10. **문서화 및 테스트**

각 단계 완료 후 `wrangler dev`로 실제 동작 확인하며 진행한다.

---

## 12. 코드 변경 후 배포 워크플로우 (필수)

**이 프로젝트의 모든 코드 변경은 두 곳에 동시 반영해야 한다.** 둘 중 하나라도 빠지면 작업이 미완료 상태로 간주한다.

1. **Cloudflare Workers 프로덕션 배포**
   - `npm run typecheck` 통과 확인
   - `npm run test` 통과 확인 (테스트가 있는 경우)
   - 가능하면 `wrangler dev` 로컬 실행으로 변경된 도구 한 번 호출
   - `npx wrangler deploy` → 프로덕션 워커 갱신

2. **GitHub 저장소 push**
   - `git add` (변경된 파일만 명시적으로 — `git add .`는 검토 후)
   - `git commit -m "..."` (한 줄 제목 + 본문에 변경 이유 + 영향 범위)
   - `git push origin main`

순서는 워커 → GitHub을 권장한다. 워커 배포 실패 시 코드 자체에 문제가 있을 가능성이 높으므로 GitHub에는 작동 검증된 코드만 올라가도록 한다.

`wrangler.toml`은 `git update-index --skip-worktree`로 추적이 일시 중단되어 있어 실제 KV namespace ID를 로컬에 유지하면서도 GitHub에는 placeholder가 push된다. wrangler.toml을 수정해야 할 일이 생기면 일시적으로 `--no-skip-worktree`로 추적을 켜고, placeholder 버전으로 커밋한 뒤, 다시 실제 ID로 복원 + `--skip-worktree` 재설정하는 사이클을 거친다.

문서만 변경(README/SECURITY/TOOLS/CLAUDE 등)한 경우 워커 배포는 생략 가능하지만 GitHub push는 반드시 수행한다.
