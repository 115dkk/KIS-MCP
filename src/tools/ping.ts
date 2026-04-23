/**
 * Tool 4.8: ping — health/diagnostic info. Never returns secrets.
 */

import type { KisClient } from "../kis/client.js";
import type { KisAuth } from "../kis/auth.js";

export interface PingResult {
  serverStatus: "ok";
  timestamp: string;
  tokenStatus: "valid" | "absent" | "error";
  tokenError?: string;
  kvStatus: "ok" | "error";
  kvError?: string;
  lastKisCallAt?: string;
}

export async function ping(client: KisClient, kv: KVNamespace): Promise<PingResult> {
  const result: PingResult = {
    serverStatus: "ok",
    timestamp: new Date().toISOString(),
    tokenStatus: "absent",
    kvStatus: "ok",
  };

  try {
    const auth: KisAuth = client.getAuth();
    const token = await auth.getAccessToken();
    result.tokenStatus = token ? "valid" : "absent";
  } catch (err) {
    result.tokenStatus = "error";
    result.tokenError = err instanceof Error ? err.message : String(err);
  }

  try {
    await kv.get("kis:health-probe", "text");
  } catch (err) {
    result.kvStatus = "error";
    result.kvError = err instanceof Error ? err.message : String(err);
  }

  const last = client.getLastCallAt();
  if (last > 0) result.lastKisCallAt = new Date(last).toISOString();

  return result;
}
