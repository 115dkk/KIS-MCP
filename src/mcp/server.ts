/**
 * MCP server: KIS 조회 전용 도구 9종 + 워크플로 프롬프트 4종 등록.
 *
 * 자기 문서화 3-레이어:
 *   Layer 1: top-level `instructions` (initialize 시 항상 노출)
 *   Layer 2: 각 도구의 description + Zod field .describe() (도구 후보 검토 시 로드)
 *   Layer 3: server.prompt(...) 다중 도구 워크플로 (명시 호출 시에만 로드)
 *
 * Cloudflare `agents/mcp` McpAgent로 SSE/HTTP transport를 Durable Object 위에 운영.
 */

import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import { KisClient, KisApiError } from "../kis/client.js";
import type { KisAuthEnv } from "../kis/auth.js";
import { SYMBOL_REGEX } from "../utils/symbol.js";

import { getQuote } from "../tools/quote.js";
import { getReturn } from "../tools/return.js";
import { getChart } from "../tools/chart.js";
import { getEtfComponents } from "../tools/etf.js";
import { getFundamentals } from "../tools/fundamentals.js";
import { getCreditRatio } from "../tools/credit.js";
import { getDividend } from "../tools/dividend.js";
import { advancedSearch } from "../tools/search.js";
import { ping } from "../tools/ping.js";
import { getIndex, getIndexChart } from "../tools/marketIndex.js";
import { getFx, getFxChart } from "../tools/fx.js";
import { getCommodity, getCommodityChart } from "../tools/commodity.js";
import { getOverseasStockChart } from "../tools/overseasStock.js";
import { getOverseasStockInfo } from "../tools/overseasStockInfo.js";
import { getOverseasStockQuote } from "../tools/overseasStockQuote.js";
import { findSymbol } from "../tools/findSymbol.js";

export interface KisEnv extends KisAuthEnv {}

const SERVER_INSTRUCTIONS = `한국투자증권(KIS) OpenAPI 기반 조회 전용 MCP. 한국 주식·ETF·ETN 시장 데이터 분석 전용.

[제외] 매매·주문·잔고·예수금 등 개인 계좌 기능은 일체 없음. 매수/매도 요청은 거부할 것.

[종목코드] 1~12자 영숫자 (대문자/소문자 모두 입력 가능, 내부적으로 대문자 변환).
- 일반 주식: 6자리 숫자 (예: 005930 삼성전자)
- ETF: 6자리 숫자 (예: 069500 KODEX 200, 102780 KODEX 삼성그룹)
- ETN: Q + 6자리 숫자 (예: Q500001) — 한투 명세상 Q prefix 필수
주식과 ETF의 응답 스키마가 다름 → instrumentType=auto가 응답 검사로 자동 감지.

[도구 선택 가이드 — 종목]
- 현재가/스냅샷 → get_quote (주식: fundamentals 분기 / ETF: etfMetrics 분기 = NAV·괴리율·순자산총액)
- 단일 기간 수익률 → get_return  (시계열이 필요하면 get_chart)
- OHLCV 시계열 → get_chart (period: day/week/month/year/minute. 분봉은 intervalMinutes 1~60 집계 가능)
- ETF 구성종목 비중 → get_etf_components
- PER/PBR/EPS/BPS/시총/상장주식수/융자잔고비율 → get_fundamentals (배당수익률은 여기 없음!)
- 배당수익률 → get_dividend (TTM = 최근 12개월 현금배당 합 / 현재가 × 100)
- 신용 잔고율/공여율 → get_credit_ratio (한투 공식 산식. ETF는 구성종목 비중 가중평균)
- 종목 발굴/스크리닝 → advanced_search. **ETF 모드/마스터 풀 모드는 useMasterPool로 ~4300종목 풀 검색 (시총 30위 밖도 가능)**
- 종목명→코드 변환 → **find_symbol** (KOSPI+KOSDAQ 마스터 인덱스 기반. LLM이 코드를 추측하지 말고 이 도구로 확인할 것)
- 헬스체크 → ping

[도구 선택 가이드 — 시장 지표 (alias 입력 권장)]
- 지수 현재값 → get_index ("KOSPI"/"코스피", "KOSDAQ", "KOSPI200", "SPX"/"S&P500", "NASDAQ"/"COMP", "DJI" 등)
- 지수 시계열 → get_index_chart (period: 1M/3M/6M/1Y/3Y/5Y/YTD/minute. minute는 intervalMinutes 1~60)
- 환율 → get_fx / get_fx_chart ("USDKRW"/"원달러", "EURKRW", "JPYKRW", "CNYKRW")
- 원자재 → get_commodity / get_commodity_chart ("WTI", "BRENT"/"브렌트유", "GOLD"/"금"). 분봉은 선물만 지원
- **해외 개별주식 현재가** → get_overseas_stock_quote (market=NAS/NYS/... + symbol). OHLC + 52주 + 시총 + 한국어명 모두 포함
- **해외 개별주식 메타정보** → get_overseas_stock_info (한국어/영문명, 상장정보, ISIN/SEDOL/블룸버그 티커, 종목 분류)
- **해외 개별주식 차트** → get_overseas_stock_chart (day/week/month/minute, 분봉은 intervalMinutes 1~60 집계)
- 변동성지수(V-KOSPI200): 한투 직접 시세 미제공. 미지원.

[KIS 응답 단위 관습]
- marketCap (hts_avls): **억원** 단위
- 융자 잔고금액 (loanBalanceAmount): 원 단위로 환산되어 반환됨 (KIS raw는 만원)
- 모든 % 값은 0~100 스케일 (예: 1.42는 1.42%, 0.0142가 아님)
- get_quote.sector는 KIS bstp_kor_isnm(업종 분류명)이지 종목명이 아님

[자주 하는 실수]
- ETF에 PER/PBR 묻지 말 것 → 없음. ETF 평가는 etfMetrics.nav/discountPct 사용
- advanced_search rankBy=volume/fluctuation은 시총 데이터 미포함 → minMcap 필터가 무력함 (rankBy=mcap만 시총 포함)
- 배당수익률을 get_fundamentals에서 찾지 말 것 → get_dividend가 별도 도구

[제약]
- 자체 레이트 리미트: 초당 15회 (한투 공식 20 대비 안전마진)
- get_chart: maxPoints 기본 500, 상한 2000 (초과 시 균등 다운샘플). 일봉 페이지네이션 최대 20회(≈8년), 분봉 최대 5 영업일·30회 페이지
- get_credit_ratio: 신용잔고는 한 번 호출당 30건 cap (lookbackDays ≤ 30 권장)

[Prompts] 다중 도구 분석 시나리오는 prompts로 캡슐화되어 있음:
- analyze_credit_risk: 종목 신용 위험 종합 분석
- inspect_etf: ETF 구성·위험 점검
- screen_value_stocks: 저PER/저PBR 가치주 발굴 (M1: enrichWithFundamentals 통합)
- screen_high_dividend: 고배당 종목 발굴
- compare_stocks: 2~5개 종목 병렬 비교 (M7)
- analyze_sector: 업종 키워드 + 지수 대비 분석 (M7)
- portfolio_risk_check: 포트폴리오(최대 20종목) 위험 종합 보고 (M7)
사용자가 위 의도를 보이면 prompt 발동을 우선 검토.`;

export class KisMcpAgent extends McpAgent<KisEnv> {
  server = new McpServer(
    { name: "kis-readonly-mcp", version: "0.1.0" },
    { instructions: SERVER_INSTRUCTIONS },
  );

  async init(): Promise<void> {
    const client = new KisClient(this.env);
    registerTools(this.server, client, this.env.KIS_TOKENS);
    registerPrompts(this.server);
  }
}

/**
 * Zod symbol schema: 입력을 trim+uppercase 정규화한 뒤 SYMBOL_REGEX로 검증.
 * 005930, q500001(→Q500001), Q500001 모두 유효. 빈 문자열·특수문자·12자 초과는 거부.
 */
const SYMBOL_SCHEMA = z
  .string()
  .transform((s) => s.trim().toUpperCase())
  .pipe(z.string().regex(SYMBOL_REGEX, "1~12자 영숫자 종목코드 (예: 005930, Q500001)"));

function registerTools(server: McpServer, client: KisClient, kv: KVNamespace): void {
  server.tool(
    "ping",
    "서버 상태, KIS 토큰 발급 가능성, KV 연결 상태를 점검합니다. 시크릿은 절대 노출하지 않음. 디버깅·MCP 연결 검증용.",
    {},
    async () => {
      try {
        return jsonContent(await ping(client, kv));
      } catch (err) {
        return errorContent(err);
      }
    },
  );

  server.tool(
    "get_quote",
    [
      "주식 또는 ETF의 현재가 스냅샷.",
      "주식은 fundamentals(PER/PBR/EPS/BPS/시총/상장주식수/융자잔고비율/거래량회전율/거래대금)을 채움.",
      "ETF는 etfMetrics(NAV/괴리율/추적오차율/순자산총액/구성종목수/배당주기/LP보유율/외국인보유율)을 채움.",
      "yearHigh/Low는 주식이면 52주, ETF면 연중(YTD year) — KIS 응답 필드 차이.",
      "sector는 업종 분류명(bstp_kor_isnm); 실제 종목명이 아님에 유의.",
    ].join(" "),
    {
      symbol: SYMBOL_SCHEMA.describe(
        "1~12자 영숫자 종목코드 (예: 005930 삼성전자, 069500 KODEX 200, Q500001 ETN)",
      ),
      instrumentType: z
        .enum(["stock", "etf", "auto"])
        .optional()
        .describe("기본 'auto' — stock 응답의 rprs_mrkt_kor_name 검사 후 ETF면 etfPrice 재호출"),
    },
    async (args) => {
      try {
        return jsonContent(await getQuote(client, args));
      } catch (err) {
        return errorContent(err);
      }
    },
  );

  server.tool(
    "get_return",
    [
      "지정 기간(1D/1W/1M/3M/6M/1Y/3Y/5Y/YTD)의 절대 수익률(%) 단일 수치.",
      "기간이 1년 초과면 연환산 수익률도 함께 반환.",
      "내부적으로 get_chart 첫/마지막 종가를 사용. 시계열 자체가 필요하면 get_chart를 직접 호출.",
    ].join(" "),
    {
      symbol: SYMBOL_SCHEMA.describe("종목코드 (예: 005930, Q500001)"),
      period: z
        .enum(["1D", "1W", "1M", "3M", "6M", "1Y", "3Y", "5Y", "YTD"])
        .describe("수익률 산정 기간"),
    },
    async (args) => {
      try {
        return jsonContent(await getReturn(client, args));
      } catch (err) {
        return errorContent(err);
      }
    },
  );

  server.tool(
    "get_chart",
    [
      "OHLCV 시계열. 봉 단위는 day/week/month/year/minute.",
      "minute의 경우 intervalMinutes(1/3/5/10/15/30/60)로 1분봉을 집계.",
      "분봉은 최대 5 영업일까지 조회 가능, 기본 범위는 오늘 하루.",
      "일봉 이상은 페이지네이션으로 다일 범위 자동 커버 (KIS 100건/호출 제약 회피).",
      "maxPoints 초과 시 균등 다운샘플 (downsampledTo 필드 표시).",
      "기본 startDate: minute=오늘 / day=6M / week=2Y / month=5Y / year=20Y.",
    ].join(" "),
    {
      symbol: SYMBOL_SCHEMA.describe("종목코드"),
      period: z.enum(["day", "week", "month", "year", "minute"]).describe("봉 단위"),
      startDate: z
        .string()
        .regex(/^\d{8}$/)
        .optional()
        .describe("YYYYMMDD. 미지정 시 period에 따라 자동"),
      endDate: z.string().regex(/^\d{8}$/).optional().describe("YYYYMMDD. 미지정 시 오늘"),
      adjusted: z
        .boolean()
        .optional()
        .describe("수정주가 여부 (기본 true). day/week/month/year 전용"),
      maxPoints: z
        .number()
        .int()
        .min(1)
        .max(2000)
        .optional()
        .describe("최대 반환 포인트 수 (기본 500, 상한 2000)"),
      intervalMinutes: z
        .union([
          z.literal(1),
          z.literal(3),
          z.literal(5),
          z.literal(10),
          z.literal(15),
          z.literal(30),
          z.literal(60),
        ])
        .optional()
        .describe("분봉 집계 단위 (기본 1). period=minute일 때만 유효"),
    },
    async (args) => {
      try {
        return jsonContent(await getChart(client, args));
      } catch (err) {
        return errorContent(err);
      }
    },
  );

  server.tool(
    "get_etf_components",
    [
      "ETF의 구성종목 리스트와 비중(상위 N개 + 합계).",
      "구성종목, 포트폴리오, 보유 종목, 비중 등의 질문에 사용.",
      "ETF 위험 분석을 위해 inspect_etf prompt 또는 get_credit_ratio와 함께 자주 사용됨.",
      "KIS API의 비결정적 빈 응답 특성상 최대 5회 재시도(지수 백오프)하며, 그래도 빈 응답이면 message 필드로 시도 로그와 함께 안내.",
      "파생/합성형 ETF는 진짜로 구성종목 정보가 없을 수 있음 (etf_cnfg_issu_cnt=0).",
    ].join(" "),
    {
      symbol: SYMBOL_SCHEMA.describe("ETF 종목코드 (예: 069500)"),
      limit: z
        .number()
        .int()
        .min(1)
        .max(200)
        .optional()
        .describe("반환할 상위 구성종목 수 (기본 50, 상한 200)"),
    },
    async (args) => {
      try {
        return jsonContent(await getEtfComponents(client, args));
      } catch (err) {
        return errorContent(err);
      }
    },
  );

  server.tool(
    "get_fundamentals",
    [
      "PER/PBR/EPS/BPS, 시가총액(억원), 상장주식수, 융자잔고비율(%), 거래량회전율(%) 조회.",
      "**배당수익률은 여기 없음** → get_dividend 사용.",
      "ETF에는 PER/PBR이 없어 빈 결과가 나올 수 있음.",
    ].join(" "),
    { symbol: SYMBOL_SCHEMA.describe("종목코드 (예: 005930)") },
    async (args) => {
      try {
        return jsonContent(await getFundamentals(client, args));
      } catch (err) {
        return errorContent(err);
      }
    },
  );

  server.tool(
    "get_dividend",
    [
      "최근 N개월(기본 12) 현금배당 기록과 TTM 배당수익률.",
      "산식: ttmDividendYieldPct = 최근 12개월 record_date 기준 현금배당금 합계 / 현재가 × 100.",
      "예탁원 배당일정 API(HHKDB669102C0) 기반. 향후 예정 배당은 미포함될 수 있음.",
    ].join(" "),
    {
      symbol: SYMBOL_SCHEMA.describe("종목코드"),
      lookbackMonths: z
        .number()
        .int()
        .min(1)
        .max(36)
        .optional()
        .describe("조회 기간(개월). 기본 12, 상한 36"),
      dividendKind: z
        .enum(["all", "settlement", "interim"])
        .optional()
        .describe("배당 종류: all(전체) / settlement(결산) / interim(중간). 기본 all"),
    },
    async (args) => {
      try {
        return jsonContent(await getDividend(client, args));
      } catch (err) {
        return errorContent(err);
      }
    },
  );

  server.tool(
    "get_credit_ratio",
    [
      "신용 잔고율/공여율을 한투 공식 산식으로 반환.",
      "잔고율(%) = 융자잔고주수 / 신용한도주식수 × 100.",
      "공여율(%) = 당일 융자신규주수 / 당일 거래량 × 100.",
      "공매도 거래대금 비중과 대차잔고는 보조 지표로 함께.",
      "ETF는 자체 신용잔고가 0이므로 구성종목의 잔고율을 ETF 비중으로 가중평균.",
    ].join(" "),
    {
      symbol: SYMBOL_SCHEMA.describe("종목코드 (주식/ETF/ETN)"),
      instrumentType: z
        .enum(["stock", "etf", "auto"])
        .optional()
        .describe("기본 auto. ETF면 구성종목 가중평균 모드로 동작"),
      lookbackDays: z
        .number()
        .int()
        .min(5)
        .max(90)
        .optional()
        .describe("추세 평균 산출 기간 (5~90, 기본 30). 신용잔고는 30건 cap이라 30 이하 권장"),
      componentLimit: z
        .number()
        .int()
        .min(1)
        .max(50)
        .optional()
        .describe("ETF 모드에서 가중평균에 포함할 상위 구성종목 수 (1~50, 기본 30)"),
    },
    async (args) => {
      try {
        return jsonContent(await getCreditRatio(client, args));
      } catch (err) {
        return errorContent(err);
      }
    },
  );

  // ─── Market index / fx / commodity tools ───

  server.tool(
    "get_index",
    [
      "지수 현재값 (국내+해외 통합).",
      "alias 우선: 'KOSPI'/'코스피'(0001), 'KOSDAQ'(1001), 'KOSPI200'(2001), 'SPX'/'S&P500', 'NASDAQ'/'COMP', 'DJI'/'다우' 등.",
      "raw 코드 직접 입력도 가능: 4자리 숫자(0001~9999)는 국내 업종, 그 외는 해외 ISCD로 가정.",
      "국내 지수는 등락 종목 수, 연중 최고/최저까지 반환. 해외 지수는 KIS가 실시간 미지원이므로 최근 영업일 종가.",
    ].join(" "),
    {
      symbol: z
        .string()
        .min(1)
        .describe(
          "지수 alias 또는 한투 ISCD. 예: 'KOSPI', '코스피', 'KOSPI200', 'SPX', 'NASDAQ', 'DJI', '다우'",
        ),
    },
    async (args) => {
      try {
        return jsonContent(await getIndex(client, args));
      } catch (err) {
        return errorContent(err);
      }
    },
  );

  server.tool(
    "get_index_chart",
    [
      "지수 OHLCV 시계열 (국내+해외 통합).",
      "period: 1M/3M/6M는 일봉(D), 1Y는 주봉(W), 3Y/5Y는 월봉(M), 'minute'는 분봉.",
      "분봉은 intervalMinutes(1/3/5/10/15/30/60)로 집계. 국내 분봉은 OHLC 없이 close만 (open=high=low=close).",
      "500포인트 초과 시 균등 다운샘플(downsampledTo 표시).",
    ].join(" "),
    {
      symbol: z.string().min(1).describe("지수 alias (KOSPI/SPX 등) 또는 raw ISCD"),
      period: z
        .enum(["1M", "3M", "6M", "1Y", "3Y", "5Y", "YTD", "minute"])
        .optional()
        .describe("기본 1Y. minute는 당일 분봉"),
      maxPoints: z.number().int().min(1).max(500).optional().describe("최대 포인트 (기본·상한 500)"),
      intervalMinutes: z
        .union([
          z.literal(1),
          z.literal(3),
          z.literal(5),
          z.literal(10),
          z.literal(15),
          z.literal(30),
          z.literal(60),
        ])
        .optional()
        .describe("분봉 집계 단위 (period=minute일 때만, 기본 1)"),
    },
    async (args) => {
      try {
        return jsonContent(await getIndexChart(client, args));
      } catch (err) {
        return errorContent(err);
      }
    },
  );

  server.tool(
    "get_fx",
    [
      "환율 현재값. alias: 'USDKRW'/'원달러'/'달러', 'EURKRW'/'유로', 'JPYKRW'/'엔화', 'CNYKRW'/'위안'.",
      "한투에 환율 전용 API가 없어 다목적 chartprice(MRKT=X) 최근 1영업일 종가를 추출.",
      "ISCD가 한투 마스터파일에 따라 변동 가능 — 응답 비면 master fallback 검토.",
    ].join(" "),
    {
      pair: z.string().min(1).describe("통화쌍 alias 또는 raw ISCD (예: USDKRW, 원달러, FX@KRW)"),
    },
    async (args) => {
      try {
        return jsonContent(await getFx(client, args));
      } catch (err) {
        return errorContent(err);
      }
    },
  );

  server.tool(
    "get_fx_chart",
    [
      "환율 OHLCV 시계열.",
      "period: 1M/3M/6M는 일봉, 1Y는 주봉, 3Y/5Y는 월봉.",
      "500포인트 초과 시 균등 다운샘플.",
    ].join(" "),
    {
      pair: z.string().min(1).describe("통화쌍 alias 또는 raw ISCD"),
      period: z.enum(["1M", "3M", "6M", "1Y", "3Y", "5Y", "YTD"]).optional().describe("기본 1Y"),
      maxPoints: z.number().int().min(1).max(500).optional().describe("최대 포인트 (기본·상한 500)"),
    },
    async (args) => {
      try {
        return jsonContent(await getFxChart(client, args));
      } catch (err) {
        return errorContent(err);
      }
    },
  );

  server.tool(
    "get_commodity",
    [
      "원자재 현재값. alias: 'WTI'/'WTI원유'(NYMEX CL), 'BRENT'/'브렌트유'(ICE BRN), 'GOLD'/'금'(COMEX GC).",
      "WTI/Brent/Gold 모두 해외선물 endpoint, 가장 가까운 미래 만기물의 SRS_CD를 자동 산출(예: CLM26, BRNK26, GCM26).",
      "**알려진 한계**: Brent(BRN)는 일부 만기물에서 한투 응답 last_price가 비어 있을 수 있음 (이 경우 sttl_price/prev_clpr fallback). 응답이 계속 비면 raw SRS_CD로 다른 만기물 시도(BRNM26, BRNN26 등) 또는 KODEX 브렌트원유선물 ETF 활용.",
      "가격은 한투 raw / 10^priceDecimals (sCalcDesz) 보정 후 반환 (WTI/Brent=2, Gold=1).",
    ].join(" "),
    {
      symbol: z.string().min(1).describe("원자재 alias 또는 raw SRS_CD/ISCD"),
    },
    async (args) => {
      try {
        return jsonContent(await getCommodity(client, args));
      } catch (err) {
        return errorContent(err);
      }
    },
  );

  server.tool(
    "get_commodity_chart",
    [
      "원자재 OHLCV 시계열.",
      "WTI/Brent는 해외선물 일간 체결 추이 (HHDFC55020100). 만기물 변경 구간 갭/점프 가능.",
      "GOLD는 chartprice(MRKT=S) 일/주/월.",
      "period='minute'는 해외선물 분봉(HHDFC55020400, INDEX_KEY 페이지네이션). intervalMinutes로 집계.",
      "**분봉은 commodity-futures(WTI/Brent/Gold)만 지원**, GOLD spot 모드(MRKT=S)에는 분봉 없음.",
    ].join(" "),
    {
      symbol: z.string().min(1).describe("원자재 alias 또는 raw 코드"),
      period: z
        .enum(["1M", "3M", "6M", "1Y", "3Y", "5Y", "YTD", "minute"])
        .optional()
        .describe("기본 1Y. minute는 분봉 (선물만)"),
      maxPoints: z.number().int().min(1).max(500).optional().describe("최대 포인트 (기본·상한 500)"),
      intervalMinutes: z
        .union([
          z.literal(1),
          z.literal(3),
          z.literal(5),
          z.literal(10),
          z.literal(15),
          z.literal(30),
          z.literal(60),
        ])
        .optional()
        .describe("분봉 집계 단위 (period=minute & 선물 전용, 기본 1)"),
    },
    async (args) => {
      try {
        return jsonContent(await getCommodityChart(client, args));
      } catch (err) {
        return errorContent(err);
      }
    },
  );

  server.tool(
    "find_symbol",
    [
      "종목명으로 종목코드 찾기 (LLM 환각 방어용).",
      "한투에 '이름→코드' 검색 endpoint가 없어, 빌드 시 KOSPI+KOSDAQ 마스터파일을 다운로드한 ~4300종목 인덱스를 사용.",
      "매칭 우선순위: (1) 6자리 숫자→코드 정확 (2) 종목명 정확 (3) prefix (4) substring.",
      "types로 분류 필터: ['ST']=주식, ['EF']=ETF, ['EN']=ETN, 미지정시 전체.",
      "결과는 가나다순. 마스터는 일배치 갱신 → 신규 상장은 다음 영업일 반영.",
    ].join(" "),
    {
      query: z.string().min(1).describe("종목명(부분 가능) 또는 6자리 코드"),
      limit: z.number().int().min(1).max(50).optional().describe("결과 상한 (기본 20, 상한 50)"),
      types: z
        .array(z.string())
        .optional()
        .describe("종목 분류 필터 (예: ['ST'], ['EF','EN'])"),
      markets: z
        .array(z.enum(["KOSPI", "KOSDAQ"]))
        .optional()
        .describe("시장 필터"),
    },
    async (args) => {
      try {
        return jsonContent(findSymbol(args));
      } catch (err) {
        return errorContent(err);
      }
    },
  );

  server.tool(
    "get_overseas_stock_quote",
    [
      "해외 개별주식 현재가 스냅샷 (NAS/NYS/AMS/TSE/HKS/SHS/SZS/HSX/HNX 거래소).",
      "복수종목 시세조회(HHDFS76220000) 단일 종목 모드 사용 — OHLC + 52주 고저 + 시가총액 + 상장주식수 + 통화 + 원환산가 모두 포함.",
      "한국어 종목명, 거래소명, 국가명도 함께 반환.",
      "사용 예: market='NAS', symbol='TSLA' / market='TSE', symbol='7203' (도요타).",
    ].join(" "),
    {
      market: z
        .enum(["NAS", "NYS", "AMS", "TSE", "HKS", "SHS", "SZS", "HSX", "HNX"])
        .describe("거래소 코드"),
      symbol: z.string().min(1).max(16).describe("종목코드 (예: TSLA, AAPL, 7203)"),
    },
    async (args) => {
      try {
        return jsonContent(await getOverseasStockQuote(client, args));
      } catch (err) {
        return errorContent(err);
      }
    },
  );

  server.tool(
    "get_overseas_stock_info",
    [
      "해외 개별주식 상품 메타정보 (상품기본정보, CTPF1702R).",
      "포함: 한국어/영문명, 거래소, 국가, 통화, 상장주식수, 상장일자, 상장폐지 여부, 상품 분류(주식/ETF/ETN/REIT/우선주/VIX), 거래상태(정상/정지/중단), 식별자(ISIN/SEDOL/블룸버그 티커).",
      "**PER/EPS/시총은 미포함** — 시총은 get_overseas_stock_quote에서. PER/EPS는 KIS inquire-search 별도.",
    ].join(" "),
    {
      market: z
        .enum(["NAS", "NYS", "AMS", "TSE", "HKS", "SHS", "SZS", "HSX", "HNX"])
        .describe("거래소 코드"),
      symbol: z.string().min(1).max(16).describe("종목코드"),
    },
    async (args) => {
      try {
        return jsonContent(await getOverseasStockInfo(client, args));
      } catch (err) {
        return errorContent(err);
      }
    },
  );

  server.tool(
    "get_overseas_stock_chart",
    [
      "해외 개별주식 OHLCV 시계열 (NAS/NYS/AMS/TSE/HKS/SHS/SZS/HSX/HNX 거래소).",
      "period: day/week/month는 일/주/월봉(HHDFS76240000, KEYB 페이지네이션 ≈ 4년).",
      "period: minute은 1분봉 base(HHDFS76950200) + 클라이언트 N분 집계, 최대 5 영업일.",
      "시간은 현지 시간(xymd/xhms) 기준. 미국주식은 ET 시간으로 표시됨.",
      "사용 예: market='NAS', symbol='TSLA', period='minute', intervalMinutes=5",
    ].join(" "),
    {
      market: z
        .enum(["NAS", "NYS", "AMS", "TSE", "HKS", "SHS", "SZS", "HSX", "HNX"])
        .describe("거래소 코드"),
      symbol: z.string().min(1).max(16).describe("종목코드 (예: TSLA, AAPL, 7203)"),
      period: z.enum(["day", "week", "month", "minute"]).describe("봉 단위"),
      startDate: z.string().regex(/^\d{8}$/).optional().describe("YYYYMMDD"),
      endDate: z.string().regex(/^\d{8}$/).optional().describe("YYYYMMDD. 미지정 시 오늘"),
      adjusted: z
        .boolean()
        .optional()
        .describe("수정주가 반영 (day/week/month 전용, 기본 true)"),
      maxPoints: z
        .number()
        .int()
        .min(1)
        .max(2000)
        .optional()
        .describe("최대 포인트 (기본 500, 상한 2000)"),
      intervalMinutes: z
        .union([
          z.literal(1),
          z.literal(3),
          z.literal(5),
          z.literal(10),
          z.literal(15),
          z.literal(30),
          z.literal(60),
        ])
        .optional()
        .describe("분봉 집계 단위 (period=minute일 때만, 기본 1)"),
    },
    async (args) => {
      try {
        return jsonContent(await getOverseasStockChart(client, args));
      } catch (err) {
        return errorContent(err);
      }
    },
  );

  server.tool(
    "advanced_search",
    [
      "종목 발굴/스크리닝 메타 도구.",
      "기본은 KIS 랭킹(시총/거래량/등락률 30건 cap) 후보군에서 키워드 필터링.",
      "useMasterPool=true (또는 instrumentType='etf'면 자동) → KOSPI+KOSDAQ 마스터파일(~4300종목)에서 검색 → 시총 30위 밖 종목·ETF도 발굴 가능.",
      "**인버스/레버리지/커버드콜/혼합형/선물형은 항상 자동 제외**.",
      "excludeOverseas=true → 해외추종 ETF 70+개 키워드 추가 제외 (브로드컴/샤오미/BYD/팔란티어/World 등 + 미국/나스닥/MSCI; KODEX MSCI Korea는 Korea 화이트리스트로 생존).",
      "excludeBonds=true → **주식 아닌 자산** ETF 추가 제외 (채권/은행채/WGBI/TDF/머니마켓/리츠/부동산/인프라/원자재 등). 사용자가 '주식형 ETF' 요청 시 필수.",
      "rankBy=mcap만 시총 포함 (volume/fluctuation 랭킹과 마스터 풀에서는 minMcap 필터 무력).",
      "enrichWithReturn=true는 후보별 실제 수익률 병렬 계산(batch=5, 마스터 풀에서는 30건 cap, 워커 30s 보호).",
    ].join(" "),
    {
      instrumentType: z
        .enum(["stock", "etf", "both"])
        .optional()
        .describe("필터링용. 현재 KIS 랭킹은 통합 풀에서 키워드로 분리"),
      rankBy: z
        .enum(["return_1y", "return_6m", "return_3m", "return_1m", "volume", "mcap"])
        .describe("후보군 랭킹 기준. mcap만 시총 포함, volume/fluctuation은 거래량/등락률 기반"),
      order: z.enum(["asc", "desc"]).optional().describe("정렬 방향 (기본 desc)"),
      limit: z.number().int().min(1).max(100).optional().describe("반환 종목 수 (기본 20, 상한 100)"),
      sectorKeywords: z
        .array(z.string())
        .optional()
        .describe("종목명에 하나라도 포함되어야 통과 (예: ['바이오','반도체'])"),
      excludeKeywords: z
        .array(z.string())
        .optional()
        .describe("기본 제외 키워드(인버스 등)에 추가로 적용할 키워드"),
      minMcap: z
        .number()
        .nonnegative()
        .optional()
        .describe("시총 하한. rankBy=mcap에서만 유효 (단위: 억원)"),
      maxPer: z
        .number()
        .positive()
        .optional()
        .describe("PER 상한. enrichWithFundamentals=true에서 적용 (M1)"),
      maxPbr: z
        .number()
        .positive()
        .optional()
        .describe("PBR 상한. enrichWithFundamentals=true에서 적용 (M1)"),
      excludeOverseas: z
        .boolean()
        .optional()
        .describe(
          "true면 해외추종 ETF 추가 제외 (미국/나스닥/MSCI/필라델피아/테슬라·엔비디아 등 ~50개 키워드, KODEX MSCI Korea 같은 국내 추종은 화이트리스트로 면제)",
        ),
      excludeBonds: z
        .boolean()
        .optional()
        .describe(
          "true면 **주식이 아닌 자산** ETF 추가 제외 — 채권(국고채/회사채/은행채/WGBI/하이일드) + TDF/머니마켓 + REIT/부동산/인프라 + 원자재(국제금/원유/구리/팔라듐/백금/천연가스/Silver). 사용자가 '주식형 ETF'를 요청했으면 켤 것",
        ),
      enrichWithReturn: z
        .boolean()
        .optional()
        .describe("true면 후보 종목별 실제 기간 수익률 계산 후 재정렬 (느림). 마스터 풀에서는 상위 30건만 처리"),
      enrichWithFundamentals: z
        .boolean()
        .optional()
        .describe(
          "true면 후보 종목별 PER/PBR 추가 조회. maxPer/maxPbr 필터가 함께 적용됨 (M1, screen_value_stocks 핵심 옵션)",
        ),
      useMasterPool: z
        .boolean()
        .optional()
        .describe(
          "true면 KIS 랭킹 대신 KOSPI+KOSDAQ 마스터파일(~4300종목) 풀 사용. instrumentType='etf'면 자동 true.",
        ),
    },
    async (args) => {
      try {
        return jsonContent(await advancedSearch(client, args));
      } catch (err) {
        return errorContent(err);
      }
    },
  );
}

function registerPrompts(server: McpServer): void {
  server.prompt(
    "analyze_credit_risk",
    "특정 종목의 신용 위험을 종합 분석합니다. 신용 잔고율/공여율 추세와 가격 변동을 함께 평가.",
    {
      symbol: SYMBOL_SCHEMA.describe("종목코드"),
    },
    (args) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: [
              `종목 ${args.symbol}의 신용 위험을 종합 분석해줘. 다음 순서로 도구를 호출하고 결과를 종합해.`,
              "",
              "1. get_credit_ratio({symbol, lookbackDays: 30}) — 잔고율/공여율 현재값과 30일 평균",
              "2. get_quote({symbol}) — 현재가, 등락률, 거래량",
              "3. get_chart({symbol, period: 'day', maxPoints: 90}) — 최근 가격 추세",
              "",
              "분석 포인트:",
              "- credit.balanceRatioPct가 credit.avgBalanceRatioPct 대비 급등했는가? (개미털기 위험 신호)",
              "- credit.contributionRatioPct가 비정상적으로 높은가? (단기 신용 매수 집중)",
              "- 신용 잔고 변동이 가격 추세와 같이/거꾸로 움직이는가?",
              "- shortSale.avgValueRatioPct(공매도 비중)도 함께 높으면 양방향 압박 가능",
              "",
              "결과는 한국어로 위험도 등급(낮음/중간/높음)과 근거를 함께 보고. 종목명은 sector 필드가 아니라 종목코드를 그대로 사용 (KIS API는 종목명을 직접 반환하지 않음).",
            ].join("\n"),
          },
        },
      ],
    }),
  );

  server.prompt(
    "inspect_etf",
    "ETF의 구성종목 중 위험 종목을 식별합니다. NAV/괴리율 + 상위 N개 구성종목의 신용 위험 점검.",
    {
      etfSymbol: SYMBOL_SCHEMA.describe("ETF 종목코드 (예: 069500)"),
      topN: z.string().optional().describe("위험 점검할 상위 구성종목 수 (기본 10)"),
    },
    (args) => {
      const n = Number(args.topN) || 10;
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: [
                `ETF ${args.etfSymbol}의 구성과 위험을 점검해줘. 다음 순서로:`,
                "",
                `1. get_quote({symbol: '${args.etfSymbol}', instrumentType: 'etf'}) — NAV, 괴리율(discountPct), 순자산총액 확인`,
                `2. get_etf_components({symbol: '${args.etfSymbol}', limit: ${n}}) — 상위 ${n}개 구성종목과 비중`,
                `3. 상위 ${n}개 각각에 대해 get_credit_ratio({symbol})`,
                "",
                "분석 포인트:",
                "- ETF 자체 NAV-가격 괴리율(etfMetrics.discountPct)이 큰가?",
                "- 구성종목 중 credit.balanceRatioPct가 평균(보통 1~3%) 대비 두드러지게 높은 종목은?",
                "- 비중 상위 종목에 위험 신호가 집중되어 있는가? (가중치 × 위험도)",
                "",
                "결과는 'ETF 요약 → 위험 구성종목 표(종목코드/비중/잔고율) → 종합 의견' 순으로 한국어 보고.",
              ].join("\n"),
            },
          },
        ],
      };
    },
  );

  server.prompt(
    "screen_value_stocks",
    "저PER/저PBR 가치주를 발굴합니다. 시총 상위 후보군 + 재무지표 필터.",
    {
      sectorKeywords: z
        .string()
        .optional()
        .describe("쉼표 구분 섹터 키워드 (예: '반도체,바이오'). 비우면 전체"),
      maxPer: z.string().optional().describe("PER 상한 (기본 15)"),
      maxPbr: z.string().optional().describe("PBR 상한 (기본 1.5)"),
    },
    (args) => {
      const sectors = args.sectorKeywords
        ? args.sectorKeywords
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [];
      const maxPer = Number(args.maxPer) || 15;
      const maxPbr = Number(args.maxPbr) || 1.5;
      const sectorArg =
        sectors.length > 0
          ? `, sectorKeywords: [${sectors.map((s) => JSON.stringify(s)).join(", ")}]`
          : "";
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: [
                "가치주 스크리닝을 수행해줘. M1 통합 호출:",
                "",
                `1. advanced_search({rankBy: 'mcap', instrumentType: 'stock', limit: 30${sectorArg}, enrichWithFundamentals: true, maxPer: ${maxPer}, maxPbr: ${maxPbr}})`,
                `   → 시총 상위 30개에서 PER/PBR 병렬 조회 + 필터 통합 (단일 호출).`,
                "2. 결과를 PER 오름차순 정렬, 상위 10개 선정.",
                "3. (옵션) 상위 5개에 get_dividend로 TTM 배당수익률 추가.",
                "",
                `결과 형식 (한국어): 종목코드 | 현재가 | PER | PBR | 시가총액(억원) | 배당수익률(있으면).`,
                "주의: 시가총액은 억원 단위. PER/PBR이 없는 ETF는 자동 제외됨.",
                "참고: enrichWithFundamentals=true 옵션이 batchParallel(batch=5)로 30종목 PER/PBR을 ~6 배치에 병렬 조회.",
              ].join("\n"),
            },
          },
        ],
      };
    },
  );

  server.prompt(
    "compare_stocks",
    "2~5개 종목의 현재가/PER/PBR/배당수익률/1Y 수익률을 병렬 비교 (M7).",
    {
      symbols: z
        .string()
        .describe("쉼표로 구분된 2~5개 종목코드 (예: '005930,000660,035420'). 국내 종목만 지원"),
    },
    (args) => {
      const list = args.symbols
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 5);
      const formatted = list.map((s) => `'${s}'`).join(", ");
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: [
                `다음 ${list.length}개 종목을 비교해줘: ${list.join(", ")}`,
                "",
                "각 종목에 대해 다음 도구를 병렬로 호출:",
                `  - get_quote({symbol}) — 현재가, 등락률, 거래량`,
                `  - get_fundamentals({symbol}) — PER/PBR/시가총액`,
                `  - get_dividend({symbol, lookbackMonths: 12}) — TTM 배당수익률`,
                `  - get_return({symbol, period: '1Y'}) — 1년 수익률`,
                "",
                `종목 리스트: [${formatted}]`,
                "",
                "결과 표(한국어):",
                "| 종목코드 | 현재가 | 1Y 수익률 | PER | PBR | 시가총액(억원) | TTM 배당수익률 |",
                "",
                "추가 분석:",
                "- 가장 저평가된 종목 (PER/PBR 상대 비교)",
                "- 가장 높은 수익률 / 배당 종목",
                "- 시가총액 차이가 크면 동일 가중 비교의 한계 명시",
                "",
                "주의: 종목명은 KIS sector 필드(업종 분류명)이지 종목명이 아님 — find_symbol로 정확한 이름 확인 가능.",
              ].join("\n"),
            },
          },
        ],
      };
    },
  );

  server.prompt(
    "analyze_sector",
    "업종 키워드로 시총 상위 종목을 발굴하고 업종 지수와 대비 분석 (M7).",
    {
      keyword: z
        .string()
        .describe("업종 키워드 (예: '반도체', '바이오', '2차전지', '방산')"),
      indexAlias: z
        .string()
        .optional()
        .describe("대비할 지수 alias (기본 'KOSPI'). 'KOSDAQ', 'KOSPI200' 등도 가능"),
    },
    (args) => {
      const idx = args.indexAlias || "KOSPI";
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: [
                `업종 '${args.keyword}'을 분석해줘. 단계별 진행:`,
                "",
                `1. advanced_search({rankBy: 'mcap', instrumentType: 'stock', sectorKeywords: ['${args.keyword}'], limit: 10, useMasterPool: true, enrichWithReturn: true, rankBy: 'return_1y'})`,
                `   → 마스터 풀에서 '${args.keyword}' 키워드 매칭 종목 + 1Y 수익률 enrichment.`,
                `2. get_index({symbol: '${idx}'}) — 비교 지수 현재값`,
                `3. get_index_chart({symbol: '${idx}', period: '1Y'}) — 지수 1년 시계열`,
                `4. 상위 종목 5개에 get_fundamentals 호출 (병렬)`,
                "",
                "분석 포인트:",
                `- 업종 평균 1Y 수익률 vs ${idx} 1Y 수익률 — 아웃퍼폼/언더퍼폼 정도`,
                "- 평균 PER/PBR과 시장 평균 비교 (저평가/고평가)",
                "- 업종 내 시총 1위 vs 평균 격차 (집중도)",
                "- 변동성 높은 종목과 안정적 종목 분리",
                "",
                `결과: '${args.keyword}' 업종 보고서 (한국어). 종목 표 + ${idx} 대비 차트 요약 + 종합 평가.`,
              ].join("\n"),
            },
          },
        ],
      };
    },
  );

  server.prompt(
    "portfolio_risk_check",
    "종목 리스트(최대 20개)의 신용 위험/배당/수익률 종합 보고 (M7).",
    {
      symbols: z
        .string()
        .describe("쉼표로 구분된 1~20개 종목코드"),
      lookbackDays: z
        .string()
        .optional()
        .describe("신용잔고 평균 산출 기간 (기본 30)"),
    },
    (args) => {
      const list = args.symbols
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 20);
      const lookback = Number(args.lookbackDays) || 30;
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: [
                `포트폴리오 ${list.length}개 종목의 위험을 종합 점검:`,
                "",
                `종목 리스트: [${list.join(", ")}]`,
                "",
                "각 종목에 대해 병렬 호출:",
                `  - get_credit_ratio({symbol, lookbackDays: ${lookback}}) — 신용 잔고율/공여율 추세`,
                `  - get_dividend({symbol, lookbackMonths: 12}) — TTM 배당수익률`,
                `  - get_return({symbol, period: '1Y'}) — 1년 수익률`,
                "",
                "분석 표 (한국어):",
                "| 종목 | 1Y 수익률 | 신용 잔고율 | 30일 평균 잔고율 | 잔고율 급등? | TTM 배당 | 종합 위험 |",
                "",
                "위험 등급 산정 기준:",
                "- 🔴 높음: 잔고율 5% 초과 + 30일 평균 대비 1.5배 이상 급등 (개미털기 위험)",
                "- 🟡 중간: 잔고율 3~5% 또는 평균 대비 1.2~1.5배",
                "- 🟢 낮음: 그 외",
                "",
                "추가 보고:",
                "- 위험 집중도: 🔴 등급 종목이 포트폴리오에 몇 개 있는가",
                "- 배당 안정성: TTM 배당 ≥ 4% 종목 비율",
                "- 수익률 분산: 1Y 수익률 표준편차",
                "",
                "주의: 본 도구는 매매 추천이 아닌 위험 인식용. 신용 잔고율은 한투 공식 산식 (잔고주수/신용한도주수×100).",
              ].join("\n"),
            },
          },
        ],
      };
    },
  );

  server.prompt(
    "screen_high_dividend",
    "고배당 종목을 발굴합니다. 시총 상위 후보군 + TTM 배당수익률 필터.",
    {
      sectorKeywords: z
        .string()
        .optional()
        .describe("쉼표 구분 섹터 키워드 (예: '금융,통신'). 비우면 전체"),
      minYieldPct: z.string().optional().describe("최소 TTM 배당수익률 % (기본 4.0)"),
    },
    (args) => {
      const sectors = args.sectorKeywords
        ? args.sectorKeywords
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [];
      const minYield = Number(args.minYieldPct) || 4.0;
      const sectorArg =
        sectors.length > 0
          ? `, sectorKeywords: [${sectors.map((s) => JSON.stringify(s)).join(", ")}]`
          : "";
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: [
                "고배당 종목 스크리닝:",
                "",
                `1. advanced_search({rankBy: 'mcap', instrumentType: 'stock', limit: 30${sectorArg}}) — 후보 풀`,
                "2. 후보별 get_dividend({symbol, lookbackMonths: 12}) 호출 (병렬 가능)",
                `3. ttmDividendYieldPct ≥ ${minYield} 조건으로 필터`,
                "4. 배당수익률 내림차순 정렬, 상위 10개 보고",
                "5. (옵션) 상위 종목에 get_fundamentals로 PER/시총 정보 부여",
                "",
                "결과 형식 (한국어): 종목코드 | 현재가 | TTM 배당수익률(%) | 12M 배당금 합 | (PER/시총 옵션).",
                "주의: TTM 산식 = 최근 12개월 record_date 기준 현금배당금 합 / 현재가 × 100. 향후 예정 배당은 미포함.",
              ].join("\n"),
            },
          },
        ],
      };
    },
  );
}

function jsonContent(data: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
  };
}

function errorContent(err: unknown) {
  let message: string;
  if (err instanceof KisApiError) {
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
  } else {
    message = String(err);
  }
  return {
    isError: true,
    content: [{ type: "text" as const, text: message }],
  };
}
