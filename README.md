# KIS Read-Only MCP

한국투자증권 OpenAPI를 Claude에 연결하는 **조회 전용 MCP 서버**. Cloudflare Workers 위에서 동작한다.

> ⚠️ **매매·주문·잔고 기능은 존재하지 않는다.** 이 서버는 시장 데이터를 읽기만 한다. 세부 내용은 [SECURITY.md](SECURITY.md) 참고.

---

## 1. 뭐하는 거에요?

한국 주식·ETF 시장 데이터를 Claude 같은 LLM이 직접 조회할 수 있도록 한국투자증권 OpenAPI를 MCP(Model Context Protocol) 도구로 감싸 노출한다. 시세, 차트, 수익률, ETF 구성종목, 신용거래율, 환율, 원자재 선물 가격까지 — 한투에서 끌어올 수 있는 데이터를 최대한 많이 노출하는 게 목표다.

**절대 하지 않는 것:** 매수, 매도, 주문, 잔고 조회. 이 서버는 어떤 경우에도 사용자 자금이 움직이는 동작을 수행하지 않는다. 이중 방어를 적용했다(키 권한 차단 + 코드 미정의). 자세한 내용은 [SECURITY.md](SECURITY.md)를 읽어라.

### 제공하는 도구 15개

| 도구 이름 | 한 줄 설명 |
|---|---|
| `ping` | 서버·토큰·KV 연결 상태 확인 |
| `get_quote` | 주식/ETF 현재가 스냅샷 (주식은 PER/PBR/시총, ETF는 NAV/괴리율) |
| `get_return` | 지정 기간(1D~5Y/YTD) 절대 수익률(%) 단일 수치 |
| `get_chart` | OHLCV 일/주/월/년 시계열 (최대 500포인트) |
| `get_etf_components` | ETF 구성종목 목록과 비중 (상위 최대 200개) |
| `get_fundamentals` | PER/PBR/EPS/BPS/시총/상장주식수/융자잔고비율 |
| `get_dividend` | TTM 배당수익률 + 최근 배당 기록 |
| `get_credit_ratio` | 신용 잔고율/공여율, 공매도 비중, 대차잔고 (ETF는 구성종목 가중평균) |
| `advanced_search` | 시총/거래량/등락률 랭킹 기반 종목 발굴·스크리닝 (인버스/레버리지 자동 제외) |
| `get_index` | 국내·해외 지수 현재값 (KOSPI, KOSDAQ, S&P 500, NASDAQ 등) |
| `get_index_chart` | 지수 OHLCV 시계열 |
| `get_fx` | 환율 현재값 (원달러, 유로, 엔화, 위안) |
| `get_fx_chart` | 환율 OHLCV 시계열 |
| `get_commodity` | 원자재 현재값 (WTI 원유, Brent 원유, 금) |
| `get_commodity_chart` | 원자재 OHLCV 시계열 |

각 도구의 입출력 스키마와 상세 예시는 [TOOLS.md](TOOLS.md)를 참고하라.

---

## 2. 왜 굳이 새로 짰어요?

두 가지 이유다.

**첫째, 실행 환경.** 이 서버는 Cloudflare Workers라는 서버리스·원격 환경에서 구동하도록 설계했다. 내 PC에서만 돌아가는 로컬 프로세스가 아니라, 배포하면 어디서든 LLM 클라이언트가 URL로 붙을 수 있다. 한국투자증권 공식 샘플 코드는 파이썬 기반의 FastMCP이고 동적 코드 실행 패턴(코드를 URL에서 내려받아 실행하는 방식)을 사용하기 때문에 Cloudflare Workers에 그대로 올릴 수 없다. 그래서 TypeScript로 처음부터 새로 짰다.

**둘째, 매매 기능 제거.** 한투 공식 샘플은 조회와 거래가 뒤섞여 있다. 이 프로젝트는 조회만 남기고 거래를 완전히 잘라냈다. AI가 임의로 동전주를 매수하는 사태를 원치 않는다면 그대로 두는 걸 권장한다.

---

## 3. 조건이 있어요?

시작하기 전에 다음 세 가지를 준비해야 한다.

### 한국투자증권 OpenAPI 키

계좌가 있으면 무료로 발급받을 수 있다. 아래 링크에서 신청:

**https://securities.koreainvestment.com/main/member/login/login.jsp?returnUrl=%2Fmain%2Fcustomer%2Fsystemdown%2FRestAPIService.jsp&isXecurePass=Y**

키 발급 시 **반드시 조회 전용 권한만 선택**할 것. 주식주문, 주식정정/취소주문, 잔고 조회, 예수금 조회 등의 권한은 포함하지 않는다. 이것이 이중 방어의 1차 방어선이다.

### Cloudflare 계정

Workers 무료 플랜으로 충분하다. [cloudflare.com](https://www.cloudflare.com)에서 가입.

### Node.js 20 이상 + Wrangler CLI

```bash
node --version   # v20 이상이어야 함
npm install -g wrangler
```

---

## 4. 어떻게 짜요?

누구든 이 단계를 순서대로 따라하면 작동한다.

### 1단계: 저장소 클론 + 의존성 설치

```bash
git clone <이 저장소 URL>
cd kis-readonly-mcp
npm install
```

### 2단계: Cloudflare 로그인 + KV 네임스페이스 생성

KV(Key-Value)는 OAuth 토큰을 캐싱하는 저장소다. 두 개(본 환경용, 로컬 개발용)를 만들어야 한다.

```bash
npx wrangler login
npx wrangler kv namespace create KIS_TOKENS
npx wrangler kv namespace create KIS_TOKENS --preview
```

첫 번째 명령은 `id`를, 두 번째 명령은 `preview_id`를 출력한다. 이 값들을 `wrangler.toml` 파일의 `[[kv_namespaces]]` 블록에 채워 넣어야 한다. 파일을 열면 placeholder가 있는 위치가 보인다.

```toml
# wrangler.toml 예시
[[kv_namespaces]]
binding = "KIS_TOKENS"
id = "여기에_id_붙여넣기"
preview_id = "여기에_preview_id_붙여넣기"
```

### 3단계: 워커 최초 배포

시크릿(API 키)은 이미 배포된 워커가 있어야 등록할 수 있다. 따라서 빈 상태로 먼저 배포한다.

```bash
npx wrangler deploy
```

배포가 끝나면 `https://kis-readonly-mcp.<your-subdomain>.workers.dev` 형태의 URL이 출력된다. 이 URL을 메모해 두라.

### 4단계: 한투 API 키를 워커 시크릿으로 등록

시크릿은 코드에 직접 넣지 않고 Cloudflare에 안전하게 등록한다. 명령을 실행하면 값을 입력하라는 프롬프트가 뜬다.

```bash
npx wrangler secret put KIS_APP_KEY
npx wrangler secret put KIS_APP_SECRET
```

한투 포털에서 발급받은 앱 키와 앱 시크릿을 각각 입력하면 된다. 한 줄에 쉼표로 묶어서 입력하는 방법은 지원되지 않으므로 두 번 따로 실행해야 한다.

### 5단계: 로컬 테스트 (권장)

실제 배포 전에 로컬에서 먼저 확인하고 싶다면:

```bash
cp .dev.vars.example .dev.vars
# .dev.vars 파일을 열고 KIS_APP_KEY / KIS_APP_SECRET 값 채우기
npm run dev
```

`http://127.0.0.1:8787/mcp` 또는 `http://127.0.0.1:8787/sse` 엔드포인트가 뜨면 성공이다.

타입 검사와 단위 테스트는 다음 명령으로 실행한다:

```bash
npm run typecheck
npm run test
```

### 6단계: 코드 변경 후 재배포

코드를 수정했을 때는 다시 배포하면 된다:

```bash
npx wrangler deploy
```

`wrangler deploy`는 코드만 교체하고 시크릿과 KV 데이터는 그대로 보존한다. URL도 바뀌지 않으므로 LLM 클라이언트 설정을 다시 건드릴 필요가 없다.

---

## 5. 어떻게 써요?

Claude Desktop, Claude.ai 커스텀 커넥터, Claude Code 등 MCP를 지원하는 LLM 클라이언트에 외부 MCP 서버로 등록해서 쓴다.

### 엔드포인트

배포 후 받은 워커 URL 뒤에 **`/sse`를 반드시 붙여서** 입력해야 한다. 안 붙이면 연결이 실패한다.

```
https://kis-readonly-mcp.<your-subdomain>.workers.dev/sse
```

Streamable HTTP를 지원하는 클라이언트는 `/mcp` 엔드포인트도 사용할 수 있다.

### Claude Desktop 연결 예시

Claude Desktop의 설정 파일(`claude_desktop_config.json`)에 다음을 추가한다:

```json
{
  "mcpServers": {
    "kis-readonly": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://kis-readonly-mcp.<your-subdomain>.workers.dev/sse"
      ]
    }
  }
}
```

`<your-subdomain>` 부분을 자신의 Cloudflare 서브도메인으로 교체하면 된다.

### 쓰는 방법

도구 설명과 스키마가 모두 한국어로 자세히 작성되어 있어서 별도의 프롬프트 엔지니어링 없이 LLM이 바로 활용할 수 있다. 자연어로 물어보면 LLM이 알아서 적절한 도구를 골라 호출한다.

| 자연어 질문 예시 | 내부적으로 호출되는 도구 |
|---|---|
| "삼성전자 현재가" | `get_quote("005930")` |
| "코스피 1년 차트" | `get_index_chart("KOSPI", "1Y")` |
| "원달러 환율" | `get_fx("USDKRW")` |
| "WTI 가격" | `get_commodity("WTI")` |
| "에코프로비엠 신용거래율" | `get_credit_ratio("247540")` |
| "1년 수익률 가장 낮은 ETF 10개, 인버스/레버리지 제외" | `advanced_search(rankBy=return_1y, order=asc, limit=10, ...)` |

자주 쓰이는 복합 분석 시나리오(종목 신용 위험 종합 분석, ETF 구성·위험 점검, 가치주 스크리닝, 고배당 스크리닝)는 MCP Prompt로 캡슐화되어 있다. 클라이언트에서 슬래시 커맨드처럼 노출된다. 자세한 내용은 [TOOLS.md](TOOLS.md)의 Prompts 섹션을 참고하라.

---

## 6. 알려진 문제

- **V-KOSPI(변동성 지수) 미지원:** 한국투자증권 API에서 직접 시세를 제공하지 않아 구현할 수 없다.
- **WTI/Brent 만기물 롤오버 시 시계열 갭:** WTI와 Brent 원유는 해외선물 만기물 코드를 자동 산출(만기 25일 전 다음 달 물로 롤오버)하는데, 만기물이 바뀌는 지점에서 가격 시계열에 갭이 생길 수 있다.
- **Brent 응답이 비는 경우가 가끔 있음:** 한국투자증권 측 데이터 누락으로 Brent(BRN) 만기물의 `last_price`가 비어 있을 때가 있다. 이 경우 `sttl_price` → `prev_clpr` 순으로 자동 폴백하지만, 그래도 비면 다른 만기물 코드를 직접 입력하거나 KODEX 브렌트원유선물 ETF로 우회할 수 있다.
- **Cloudflare Workers 30초 wall-clock 제한:** `get_credit_ratio`(ETF 모드)나 `advanced_search`처럼 내부적으로 여러 API를 순차 호출하는 도구는 이 제한 안에서 처리해야 한다. 구성종목이 많은 ETF나 limit이 큰 검색은 시간이 걸릴 수 있다.
- **실시간 웹소켓 미지원:** 한국투자증권의 실시간 시세 웹소켓 API는 Cloudflare Workers 환경의 특성상 지원하지 않는다. 시세는 REST 폴링으로만 조회한다.
- **한투 API 자체 점검 시간:** 평일 새벽 및 주말 새벽에 한국투자증권 API가 정기 점검에 들어가는 경우 일시적으로 호출이 실패할 수 있다. 이는 MCP 서버 자체의 문제가 아니다.
- **여기 적혀있지 않은 버그가 있다면** GitHub Issues 트래커로 제보해 주기 바란다.

---

## 7. 법적 한계 고지

- 본 프로젝트 코드(TypeScript 소스, 설정 파일 등)는 MIT 라이선스(LICENSE 파일 참조)로 배포된다. 무보증, 현상태(AS-IS) 제공이다.
- 본 프로그램 사용으로 인한 어떠한 손실(데이터 손실, 잘못된 분석에 기반한 투자 손실 등)에 대해서도 저작자 및 기여자는 책임을 지지 않는다.
- **한국투자증권 OpenAPI 문서는 MIT 라이선스 적용 대상이 아니다.** 본 저장소의 `docs/kis-api/` 디렉토리와 루트의 xlsx 파일은 한국투자증권 저작물을 가공·복제한 것이다. 한국투자증권의 권리 주장이 있을 경우 해당 파일들을 저장소에서 즉시 제거할 수 있다.
- 본 MCP는 비공식 개인 프로젝트이며 한국투자증권과 어떠한 제휴·후원·공식 관계도 없다.
