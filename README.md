# KIS Read-Only MCP

한국투자증권 OpenAPI를 기반으로 한 **조회 전용** MCP 서버입니다. Cloudflare Workers에서 동작하며, Claude를 비롯한 MCP 호환 LLM 클라이언트에 한국 주식·ETF 시장 데이터를 제공합니다.

매매·주문·잔고 관련 기능은 포함되어 있지 않습니다. 상세한 보안 설계는 [SECURITY.md](SECURITY.md)를 참고하세요.

---

## 개요

이 서버는 한국투자증권 OpenAPI의 조회 엔드포인트를 MCP 도구(tool)로 감싸서 노출합니다. LLM이 자연어 질문을 받으면 적절한 도구를 선택해 실시간 시장 데이터를 가져올 수 있습니다.

### 도구 목록 (16개)

| 도구 | 설명 |
|---|---|
| `ping` | 서버·토큰·KV 연결 상태 확인 |
| `get_quote` | 주식/ETF 현재가 스냅샷 (주식: PER·PBR·시총 / ETF: NAV·괴리율) |
| `get_return` | 지정 기간(1D~5Y, YTD) 수익률 단일 수치 |
| `get_chart` | OHLCV 일·주·월·년 시계열 (최대 500포인트, 초과 시 다운샘플링) |
| `get_etf_components` | ETF 구성종목과 비중 (상위 최대 200개) |
| `get_fundamentals` | PER·PBR·EPS·BPS·시총·상장주식수·융자잔고비율 |
| `get_dividend` | TTM 배당수익률 및 최근 배당 기록 |
| `get_credit_ratio` | 신용 잔고율·공여율, 공매도 비중, 대차잔고 (ETF는 구성종목 가중평균) |
| `advanced_search` | 시총·거래량·등락률 랭킹 기반 스크리닝 (인버스·레버리지 자동 제외) |
| `get_index` | 국내·해외 주요 지수 현재값 (KOSPI, KOSDAQ, S&P 500, NASDAQ 등) |
| `get_index_chart` | 지수 OHLCV 시계열 |
| `get_fx` | 주요 환율 현재값 (원/달러, 원/유로, 원/엔, 원/위안) |
| `get_fx_chart` | 환율 OHLCV 시계열 |
| `get_commodity` | 원자재 현재값 (WTI, Brent, 금) |
| `get_commodity_chart` | 원자재 OHLCV 시계열 |
| `get_overseas_stock_chart` | 해외 개별주식 OHLCV (NAS/NYS/TSE/HKS 등) — 일봉~분봉 |

각 도구의 입출력 스키마와 호출 예시는 [TOOLS.md](TOOLS.md)에 정리되어 있습니다.

---

## 왜 새로 만들었나

한국투자증권이 공식 MCP 샘플([open-trading-api](https://github.com/koreainvestment/open-trading-api))을 제공하고 있지만, 두 가지 이유로 직접 구현했습니다.

**실행 환경이 다릅니다.** 공식 샘플은 파이썬 FastMCP 기반이며 동적 코드 실행 패턴(GitHub에서 코드를 내려받아 런타임에 실행)을 사용합니다. Cloudflare Workers의 V8 아이솔레이트 환경에서는 이 패턴이 작동하지 않으므로, TypeScript로 처음부터 작성했습니다. 원격 배포 덕분에 PC뿐 아니라 스마트폰에서도 동일한 MCP 도구를 사용할 수 있습니다.

**조회만 필요합니다.** 공식 샘플은 조회와 매매가 한 서버에 섞여 있습니다. 이 프로젝트는 매매 엔드포인트를 코드에서 완전히 제거하고 조회 기능만 남겼습니다.

---

## 사전 준비

시작하기 전에 아래 세 가지가 필요합니다.

### 한국투자증권 OpenAPI 키

계좌가 있으면 무료로 발급받을 수 있습니다.

→ [한국투자증권 OpenAPI 신청 페이지](https://securities.koreainvestment.com/main/member/login/login.jsp?returnUrl=%2Fmain%2Fcustomer%2Fsystemdown%2FRestAPIService.jsp&isXecurePass=Y)

> **참고:** 한국투자증권 OpenAPI는 조회 전용 권한의 키를 별도로 발급하지 않습니다. 발급되는 키에는 매매 권한이 포함되어 있으나, 이 MCP는 매매 엔드포인트를 코드에 포함하지 않는 방식으로 매매를 차단합니다. 키는 이 MCP 외부에 노출하지 않는 것을 권장합니다.

### Cloudflare 계정

Workers 무료 플랜으로 충분합니다. [cloudflare.com](https://www.cloudflare.com)에서 가입할 수 있습니다.

### Node.js 20+ 및 Wrangler CLI

```bash
node --version   # v20 이상 필요
npm install -g wrangler
```

---

## 설치 및 배포

### 1. 저장소 클론 및 의존성 설치

```bash
git clone <이 저장소 URL>
cd kis-readonly-mcp
npm install
```

### 2. Cloudflare 로그인 및 KV 네임스페이스 생성

KV는 OAuth 토큰을 캐싱하는 저장소입니다. 프로덕션용과 로컬 개발용 두 개를 생성합니다.

```bash
npx wrangler login
npx wrangler kv namespace create KIS_TOKENS
npx wrangler kv namespace create KIS_TOKENS --preview
```

각 명령이 출력하는 `id`와 `preview_id`를 `wrangler.toml`의 `[[kv_namespaces]]` 블록에 입력합니다.

```toml
# wrangler.toml
[[kv_namespaces]]
binding = "KIS_TOKENS"
id = "<첫 번째 명령에서 출력된 id>"
preview_id = "<두 번째 명령에서 출력된 preview_id>"
```

### 3. 워커 최초 배포

시크릿 등록은 배포된 워커가 있어야 가능하므로, 먼저 빈 상태로 배포합니다.

```bash
npx wrangler deploy
```

배포가 완료되면 `https://kis-readonly-mcp.<subdomain>.workers.dev` 형태의 URL이 출력됩니다. 이 URL을 기록해 두세요.

### 4. API 키를 워커 시크릿으로 등록

```bash
npx wrangler secret put KIS_APP_KEY
npx wrangler secret put KIS_APP_SECRET
```

각 명령을 실행하면 값을 입력하는 프롬프트가 나타납니다. 한투 포털에서 발급받은 앱 키와 앱 시크릿을 각각 입력하세요. 두 시크릿은 한 번에 등록할 수 없으므로 명령을 따로 실행해야 합니다.

### 5. 로컬 테스트 (선택)

배포 전에 로컬에서 확인하고 싶다면:

```bash
cp .dev.vars.example .dev.vars
# .dev.vars 파일에 KIS_APP_KEY, KIS_APP_SECRET 값을 입력
npm run dev
```

`http://127.0.0.1:8787/mcp` 또는 `http://127.0.0.1:8787/sse`에 접속되면 정상입니다.

타입 검사와 테스트:

```bash
npm run typecheck
npm run test
```

### 6. 코드 수정 후 재배포

```bash
npx wrangler deploy
```

시크릿과 KV 데이터는 보존되며 URL도 변경되지 않습니다.

---

## 사용 방법

Claude Desktop, Claude.ai 커스텀 커넥터, Claude Code 등 MCP를 지원하는 LLM 클라이언트에 등록하여 사용합니다.

### 엔드포인트

워커 URL 뒤에 `/sse`를 붙여서 사용합니다.

```
https://kis-readonly-mcp.<subdomain>.workers.dev/sse
```

Streamable HTTP를 지원하는 클라이언트는 `/mcp` 엔드포인트도 사용할 수 있습니다.

### Claude Desktop 설정 예시

`claude_desktop_config.json`에 다음을 추가합니다.

```json
{
  "mcpServers": {
    "kis-readonly": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://kis-readonly-mcp.<subdomain>.workers.dev/sse"
      ]
    }
  }
}
```

### Claude.ai 커스텀 커넥터

`claude.ai/settings/connectors`에서 "Add custom connector"를 클릭하고, 위의 `/sse` URL을 입력하면 됩니다.

### 사용 예시

도구 설명이 한국어로 작성되어 있어 별도의 프롬프트 설정 없이 자연어로 질문하면 LLM이 적절한 도구를 호출합니다.

| 질문 | 호출되는 도구 |
|---|---|
| "삼성전자 현재가" | `get_quote("005930")` |
| "코스피 1년 차트" | `get_index_chart("KOSPI", "1Y")` |
| "원달러 환율" | `get_fx("USDKRW")` |
| "WTI 가격" | `get_commodity("WTI")` |
| "에코프로비엠 신용거래율" | `get_credit_ratio("247540")` |
| "1년 수익률 최하위 ETF 10개" | `advanced_search(rankBy=return_1y, order=asc, ...)` |

자주 쓰이는 복합 분석 시나리오(종목 신용 위험 분석, ETF 구성·위험 점검, 가치주·고배당 스크리닝 등)는 MCP Prompt로 캡슐화되어 있습니다. 자세한 내용은 [TOOLS.md](TOOLS.md)의 Prompts 섹션을 참고하세요.

---

## 알려진 제한사항

- **V-KOSPI(변동성 지수):** 한국투자증권 API에서 직접 제공하지 않아 조회할 수 없습니다.
- **WTI/Brent 만기물 롤오버:** 만기물 자동 산출(만기 25일 전 다음 달 물로 전환)이 적용되는데, 전환 시점에서 가격 시계열에 갭이 발생할 수 있습니다.
- **Brent 데이터 누락:** 한국투자증권 측 데이터 문제로 Brent(BRN) 만기물의 가격이 비어 있을 때가 있습니다. `sttl_price` → `prev_clpr` 순으로 자동 폴백하지만, 그래도 비는 경우 다른 만기물 코드를 직접 입력하거나 KODEX 브렌트원유선물 ETF로 우회할 수 있습니다.
- **30초 wall-clock 제한:** Cloudflare Workers의 실행 시간 제한으로, `get_credit_ratio`(ETF 모드)나 `advanced_search`처럼 내부적으로 여러 API를 순차 호출하는 도구는 구성종목 수나 limit에 따라 시간이 걸릴 수 있습니다.
- **실시간 웹소켓 미지원:** Cloudflare Workers 환경 특성상 한국투자증권의 실시간 시세 웹소켓 API는 지원하지 않습니다. 시세는 REST 호출로 조회합니다.
- **한투 API 정기 점검:** 평일 새벽 및 주말 새벽에 한국투자증권 API가 점검에 들어가면 일시적으로 호출이 실패할 수 있습니다. MCP 서버 자체의 문제가 아닙니다.

이 외의 문제를 발견하시면 GitHub Issues로 알려주세요.

---

## 라이선스 및 면책

- 본 프로젝트 코드(TypeScript 소스, 설정 파일 등)는 [MIT 라이선스](LICENSE)로 배포됩니다.
- 본 프로그램 사용으로 인한 손실(데이터 손실, 투자 손실 등)에 대해 저작자 및 기여자는 책임을 지지 않습니다.
- `docs/kis-api/` 디렉토리와 루트의 xlsx 파일은 한국투자증권 저작물을 가공·복제한 것이며, MIT 라이선스 적용 대상이 아닙니다. 한국투자증권의 요청이 있을 경우 해당 파일은 즉시 제거합니다.
- 이 프로젝트는 비공식 개인 프로젝트이며, 한국투자증권과 제휴·후원·공식 관계가 없습니다.