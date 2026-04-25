/**
 * Worker entry. Routes:
 *   /sse, /sse/message            → MCP SSE transport (legacy clients)
 *   /mcp                          → MCP Streamable HTTP transport
 *   /                             → human-readable health page
 *
 * Scheduled (M5):
 *   매일 KST 16:00 (UTC 07:00) — 마스터 인덱스를 KV에 동기화.
 *   wrangler.toml의 [triggers] crons 참조.
 */

import { KisMcpAgent } from "./mcp/server.js";
import { syncSymbolIndexToKv } from "./utils/symbolIndex.js";

export { KisMcpAgent };

export interface Env {
  KIS_APP_KEY: string;
  KIS_APP_SECRET: string;
  KIS_BASE_URL: string;
  KIS_TOKENS: KVNamespace;
  MCP_OBJECT: DurableObjectNamespace;
  /** M6: optional bearer token for /sse and /mcp. 비어있으면 인증 우회 (하위 호환). */
  MCP_AUTH_TOKEN?: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // M6: Bearer 토큰 검증 미들웨어. /와 /health는 항상 공개.
    const expected = env.MCP_AUTH_TOKEN;
    if (expected && url.pathname !== "/" && url.pathname !== "/health") {
      const authHeader = request.headers.get("Authorization");
      if (authHeader !== `Bearer ${expected}`) {
        return new Response(
          JSON.stringify({
            error: "Unauthorized",
            hint: "Set Authorization: Bearer <MCP_AUTH_TOKEN>. /health 는 인증 없이 접근 가능.",
          }),
          { status: 401, headers: { "content-type": "application/json; charset=utf-8" } },
        );
      }
    }

    if (url.pathname === "/" || url.pathname === "/health") {
      return new Response(
        JSON.stringify({
          name: "kis-readonly-mcp",
          status: "ok",
          mcp: { sse: "/sse", streamableHttp: "/mcp" },
          docs: "https://github.com/your-org/kis-readonly-mcp",
          authRequired: Boolean(expected),
        }, null, 2),
        { headers: { "content-type": "application/json; charset=utf-8" } },
      );
    }

    if (url.pathname === "/sse" || url.pathname.startsWith("/sse/")) {
      return KisMcpAgent.serveSSE("/sse").fetch(request, env, ctx);
    }

    if (url.pathname === "/mcp" || url.pathname.startsWith("/mcp/")) {
      return KisMcpAgent.serve("/mcp").fetch(request, env, ctx);
    }

    return new Response("Not found", { status: 404 });
  },

  /**
   * Cron Trigger handler (M5).
   * 매일 KST 16:00 — 정적 마스터 인덱스를 KV에 동기화.
   *
   * Workers는 cp949 디코딩(ICU)이 미지원이라 한투 마스터 mst.zip을 워커 내부에서
   * 직접 파싱할 수 없다. 따라서 cron은 빌드 시점 정적 JSON을 KV에 push하는
   * 동기화 역할로 한정. 실제 마스터 갱신은 npm run build:index → git push로
   * 수동 트리거 (배포 시 워커 bundle에 새 정적 인덱스 포함).
   */
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    ctx.waitUntil(
      (async () => {
        try {
          const result = await syncSymbolIndexToKv(env.KIS_TOKENS);
          console.log(
            `[scheduled@${event.cron}] symbol-index synced to KV: ${result.totalRecords} records, generatedAt=${result.generatedAt}`,
          );
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error(`[scheduled@${event.cron}] symbol-index sync failed: ${msg}`);
        }
      })(),
    );
  },
};
