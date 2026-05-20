import { describe, expect, it, vi } from "vitest";
import type { KisClient } from "../src/kis/client.js";
import { KIS } from "../src/kis/endpoints.js";
import { getQuote } from "../src/tools/quote.js";

const env = (output: unknown) => ({ rt_cd: "0", msg_cd: "00000", msg1: "OK", output });

describe("getQuote", () => {
  it("preserves meaningful zero ETF metrics", async () => {
    const get = vi.fn(async () =>
      env({
        stck_prpr: "10000",
        prdy_vrss: "0",
        prdy_vrss_sign: "3",
        prdy_ctrt: "0.00",
        acml_vol: "1000",
        stck_oprc: "10000",
        stck_hgpr: "10000",
        stck_lwpr: "10000",
        stck_mxpr: "13000",
        stck_llam: "7000",
        nav: "10000",
        dprt: "0.00",
        trc_errt: "0.00",
        lp_hldn_rate: "0.00",
        frgn_hldn_qty_rate: "0.00",
      }),
    );
    const client = { get } as unknown as KisClient;

    const result = await getQuote(client, { symbol: "069500", instrumentType: "etf" });

    expect(get).toHaveBeenCalledWith(expect.objectContaining({ path: KIS.etfPrice.path }));
    expect(result.etfMetrics).toMatchObject({
      discountPct: 0,
      trackingErrorPct: 0,
      lpHoldingRatePct: 0,
      foreignHoldingRatePct: 0,
    });
  });
});
