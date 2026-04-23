// End-to-end smoke test against a locally running wrangler dev worker.
//
// Prerequisites:
//   1. .dev.vars contains KIS_APP_KEY / KIS_APP_SECRET
//   2. `npx wrangler dev --port 8787 --local` is running in another terminal
//
// Run: node scripts/smoke.mjs
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const url = new URL(process.env.MCP_URL || "http://127.0.0.1:8787/mcp");

function log(label, obj) {
  console.log(`\n=== ${label} ===`);
  if (typeof obj === "string") console.log(obj);
  else console.log(JSON.stringify(obj, null, 2));
}

function summarize(result) {
  if (!result?.content) return result;
  return result.content.map((c) => (c.type === "text" ? c.text : c)).join("\n");
}

async function main() {
  const transport = new StreamableHTTPClientTransport(url);
  const client = new Client({ name: "kis-smoke", version: "0.1" }, { capabilities: {} });
  await client.connect(transport);

  log("Server", client.getServerVersion());
  log("Instructions (first 500 chars)", (client.getInstructions() ?? "").slice(0, 500));

  const tools = await client.listTools();
  log("Tools", tools.tools.map((t) => t.name));

  const prompts = await client.listPrompts().catch((e) => ({ error: String(e) }));
  log("Prompts", "prompts" in prompts ? prompts.prompts.map((p) => p.name) : prompts);

  const cases = [
    ["ping", {}],
    ["get_quote(005930 삼성전자)", { name: "get_quote", arguments: { symbol: "005930" } }],
    ["get_quote(069500 KODEX 200, auto)", { name: "get_quote", arguments: { symbol: "069500" } }],
    [
      "get_credit_ratio(005930, 7d)",
      { name: "get_credit_ratio", arguments: { symbol: "005930", lookbackDays: 7 } },
    ],
    [
      "get_chart(005930, day, 20pt)",
      { name: "get_chart", arguments: { symbol: "005930", period: "day", maxPoints: 20 } },
    ],
    [
      "get_etf_components(069500 KODEX 200, top 5) — retry test",
      { name: "get_etf_components", arguments: { symbol: "069500", limit: 5 } },
    ],
    [
      "get_etf_components(252670 KODEX 인버스) — derivative detection",
      { name: "get_etf_components", arguments: { symbol: "252670", limit: 5 } },
    ],
    [
      "get_etf_components(102780 KODEX 삼성그룹) — small ETF",
      { name: "get_etf_components", arguments: { symbol: "102780", limit: 5 } },
    ],
    [
      "get_credit_ratio(069500 KODEX 200) — ETF mode (uses get_etf_components internally)",
      { name: "get_credit_ratio", arguments: { symbol: "069500", componentLimit: 5 } },
    ],
    [
      "get_dividend(005930, 24M)",
      { name: "get_dividend", arguments: { symbol: "005930", lookbackMonths: 24 } },
    ],
    [
      "advanced_search(mcap, top 5)",
      { name: "advanced_search", arguments: { rankBy: "mcap", limit: 5 } },
    ],
    [
      "advanced_search(mcap, ETF 모드)",
      { name: "advanced_search", arguments: { rankBy: "mcap", instrumentType: "etf", limit: 10 } },
    ],
    [
      "advanced_search(mcap, stock 강제)",
      { name: "advanced_search", arguments: { rankBy: "mcap", instrumentType: "stock", limit: 5 } },
    ],

    // ─── 시장 지표 (지수/환율/원자재) ───
    ["get_index(KOSPI)", { name: "get_index", arguments: { symbol: "KOSPI" } }],
    ["get_index(코스피, 한글)", { name: "get_index", arguments: { symbol: "코스피" } }],
    ["get_index(KOSDAQ)", { name: "get_index", arguments: { symbol: "KOSDAQ" } }],
    ["get_index(KOSPI200)", { name: "get_index", arguments: { symbol: "KOSPI200" } }],
    ["get_index(SPX)", { name: "get_index", arguments: { symbol: "SPX" } }],
    ["get_index(NASDAQ)", { name: "get_index", arguments: { symbol: "NASDAQ" } }],
    ["get_index(DJI / .DJI 매핑)", { name: "get_index", arguments: { symbol: "DJI" } }],
    [
      "get_index_chart(KOSPI, 1M)",
      { name: "get_index_chart", arguments: { symbol: "KOSPI", period: "1M" } },
    ],
    [
      "get_index_chart(SPX, 3M)",
      { name: "get_index_chart", arguments: { symbol: "SPX", period: "3M" } },
    ],
    ["get_fx(USDKRW)", { name: "get_fx", arguments: { pair: "USDKRW" } }],
    ["get_fx(원달러, 한글)", { name: "get_fx", arguments: { pair: "원달러" } }],
    ["get_fx(JPYKRW)", { name: "get_fx", arguments: { pair: "JPYKRW" } }],
    [
      "get_fx_chart(USDKRW, 6M)",
      { name: "get_fx_chart", arguments: { pair: "USDKRW", period: "6M" } },
    ],
    [
      "get_commodity(WTI) — sCalcDesz 보정",
      { name: "get_commodity", arguments: { symbol: "WTI" } },
    ],
    [
      "get_commodity(BRENT) — known limitation: sttl/prev fallback",
      { name: "get_commodity", arguments: { symbol: "BRENT" } },
    ],
    ["get_commodity(GOLD)", { name: "get_commodity", arguments: { symbol: "GOLD" } }],
    [
      "get_commodity_chart(WTI, 1M)",
      { name: "get_commodity_chart", arguments: { symbol: "WTI", period: "1M" } },
    ],
  ];

  for (const [label, args] of cases) {
    const callArgs = args.name ? args : { name: "ping", arguments: {} };
    const res = await client.callTool(callArgs);
    log(label, summarize(res));
  }

  await client.close();
}

main().catch((e) => {
  console.error("\n!!! SMOKE TEST FAILED !!!");
  console.error(e?.stack ?? e);
  process.exit(1);
});
