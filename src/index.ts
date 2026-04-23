/**
 * Worker entry. Routes:
 *   /sse, /sse/message            → MCP SSE transport (legacy clients)
 *   /mcp                          → MCP Streamable HTTP transport
 *   /                             → human-readable health page
 */

import { KisMcpAgent } from "./mcp/server.js";

export { KisMcpAgent };

export interface Env {
  KIS_APP_KEY: string;
  KIS_APP_SECRET: string;
  KIS_BASE_URL: string;
  KIS_TOKENS: KVNamespace;
  MCP_OBJECT: DurableObjectNamespace;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/" || url.pathname === "/health") {
      return new Response(
        JSON.stringify({
          name: "kis-readonly-mcp",
          status: "ok",
          mcp: { sse: "/sse", streamableHttp: "/mcp" },
          docs: "https://github.com/your-org/kis-readonly-mcp",
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
};
