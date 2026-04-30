/**
 * ROADMAP M8-1 회귀 테스트.
 *
 * KisClient:
 *   - 401 시 토큰 재발급 1회 재시도
 *   - 429 시 지수 백오프 (3회 시도)
 *   - rt_cd!=0, EGW00201 코드 인식 + 재시도
 *   - 정상 응답 캐싱 (M4) — 두 번째 호출이 캐시 히트
 *   - skipCache=true 면 캐시 우회
 *   - 빈 응답은 캐시 안 됨 (M4 + M0-9 결합)
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { KisApiError, KisClient } from "../src/kis/client.js";

class FakeKv {
  store = new Map<string, string>();
  async get(key: string, type?: "json" | "text"): Promise<unknown> {
    const v = this.store.get(key);
    if (v === undefined) return null;
    return type === "json" ? JSON.parse(v) : v;
  }
  async put(key: string, value: string): Promise<void> {
    this.store.set(key, value);
  }
  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }
}

function makeClient(kv: FakeKv): KisClient {
  return new KisClient({
    KIS_APP_KEY: "key",
    KIS_APP_SECRET: "secret",
    KIS_BASE_URL: "https://example.test",
    KIS_TOKENS: kv as unknown as KVNamespace,
  });
}

const tokenResponse = (token: string) =>
  new Response(
    JSON.stringify({ access_token: token, expires_in: 86400, token_type: "Bearer", access_token_token_expired: "" }),
    { status: 200, headers: { "content-type": "application/json" } },
  );

const okData = (output: unknown) =>
  new Response(
    JSON.stringify({ rt_cd: "0", msg_cd: "00000", msg1: "OK", output }),
    { status: 200, headers: { "content-type": "application/json" } },
  );

const okEnvelope = (data: Record<string, unknown>) =>
  new Response(
    JSON.stringify({ rt_cd: "0", msg_cd: "00000", msg1: "OK", ...data }),
    { status: 200, headers: { "content-type": "application/json" } },
  );

const rateLimitData = () =>
  new Response(
    JSON.stringify({ rt_cd: "1", msg_cd: "EGW00201", msg1: "초당 거래건수 초과" }),
    { status: 200, headers: { "content-type": "application/json" } },
  );

describe("KisClient — 인증 + 재시도 + 캐싱", () => {
  let kv: FakeKv;
  let fetchSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    kv = new FakeKv();
    fetchSpy = vi.spyOn(globalThis, "fetch");
  });
  afterEach(() => {
    fetchSpy.mockRestore();
  });

  it("정상 응답을 받고 KisResponse를 반환", async () => {
    fetchSpy
      .mockResolvedValueOnce(tokenResponse("tok-1"))
      .mockResolvedValueOnce(okData({ price: "100" }));
    const client = makeClient(kv);
    const res = await client.get<{ price: string }>({
      path: "/uapi/test/path1",
      trId: "FHKST00000001",
      query: { symbol: "005930" },
    });
    expect(res.rt_cd).toBe("0");
    expect((res.output as { price: string }).price).toBe("100");
  });

  it("M4: 같은 path/query 두 번째 호출은 캐시에서 반환 (fetch 1회만)", async () => {
    fetchSpy
      .mockResolvedValueOnce(tokenResponse("tok-1"))
      .mockResolvedValueOnce(okData({ price: "100" }));
    const client = makeClient(kv);
    await client.get({
      path: "/uapi/test/path-cache",
      trId: "FHKST00000001",
      query: { s: "005930" },
    });
    // 두 번째 호출 — fetch는 더 이상 호출되지 않아야 함 (캐시 히트)
    const res2 = await client.get({
      path: "/uapi/test/path-cache",
      trId: "FHKST00000001",
      query: { s: "005930" },
    });
    expect(res2.rt_cd).toBe("0");
    // tokenResponse(1) + okData(1) = 2번 fetch만
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it("M4: skipCache=true면 캐시 우회 (fetch 매번)", async () => {
    fetchSpy
      .mockResolvedValueOnce(tokenResponse("tok-1"))
      .mockResolvedValueOnce(okData({ price: "100" }))
      .mockResolvedValueOnce(okData({ price: "101" }));
    const client = makeClient(kv);
    await client.get({
      path: "/uapi/test/path-skip",
      trId: "FHKST00000001",
      query: { s: "005930" },
      skipCache: true,
    });
    await client.get({
      path: "/uapi/test/path-skip",
      trId: "FHKST00000001",
      query: { s: "005930" },
      skipCache: true,
    });
    expect(fetchSpy).toHaveBeenCalledTimes(3);
  });

  it("M0-9 + M4: output이 모두 비어있으면 캐싱하지 않음 (다음 호출 재시도 가능)", async () => {
    fetchSpy
      .mockResolvedValueOnce(tokenResponse("tok-1"))
      // 1차: 빈 output
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({ rt_cd: "0", msg_cd: "00000", msg1: "OK", output: [] }),
          { status: 200, headers: { "content-type": "application/json" } },
        ),
      )
      // 2차: 같은 path 재호출 시 정상 데이터
      .mockResolvedValueOnce(okData([{ data: 1 }]));
    const client = makeClient(kv);
    const res1 = await client.get({
      path: "/uapi/test/path-empty",
      trId: "FHKST00000001",
      query: { s: "005930" },
    });
    expect(res1.output).toEqual([]);
    const res2 = await client.get({
      path: "/uapi/test/path-empty",
      trId: "FHKST00000001",
      query: { s: "005930" },
    });
    // 빈 응답이 캐시되지 않았으므로 두 번째 호출이 새로운 데이터를 가져옴
    expect(res2.output).toEqual([{ data: 1 }]);
    expect(fetchSpy).toHaveBeenCalledTimes(3); // token + 2 data
  });

  it("M0-9 + M4: ETF 구성종목은 output1 메타만 있고 output2가 비면 캐싱하지 않음", async () => {
    const path = "/uapi/etfetn/v1/quotations/inquire-component-stock-price";
    fetchSpy
      .mockResolvedValueOnce(tokenResponse("tok-1"))
      .mockResolvedValueOnce(
        okEnvelope({
          output: [],
          output1: { etf_cnfg_issu_cnt: "201", nav: "99715.86" },
          output2: [],
        }),
      )
      .mockResolvedValueOnce(
        okEnvelope({
          output: [],
          output1: { etf_cnfg_issu_cnt: "201", nav: "99715.86" },
          output2: [{ stck_shrn_iscd: "005930" }],
        }),
      );
    const client = makeClient(kv);
    const res1 = await client.get({
      path,
      trId: "FHKST121600C0",
      query: { fid_input_iscd: "069500" },
    });
    expect(res1.output2).toEqual([]);

    const res2 = await client.get({
      path,
      trId: "FHKST121600C0",
      query: { fid_input_iscd: "069500" },
    });
    expect(res2.output2).toEqual([{ stck_shrn_iscd: "005930" }]);
    expect(fetchSpy).toHaveBeenCalledTimes(3); // token + 2 data
  });

  it("M0-9 + M4: ETF 구성종목이 진짜 0개인 메타 응답은 캐싱 가능", async () => {
    const path = "/uapi/etfetn/v1/quotations/inquire-component-stock-price";
    fetchSpy
      .mockResolvedValueOnce(tokenResponse("tok-1"))
      .mockResolvedValueOnce(
        okEnvelope({
          output1: { etf_cnfg_issu_cnt: "0", nav: "10000" },
          output2: [],
        }),
      );
    const client = makeClient(kv);
    await client.get({
      path,
      trId: "FHKST121600C0",
      query: { fid_input_iscd: "252670" },
    });
    const res2 = await client.get({
      path,
      trId: "FHKST121600C0",
      query: { fid_input_iscd: "252670" },
    });
    expect(res2.output1).toEqual({ etf_cnfg_issu_cnt: "0", nav: "10000" });
    expect(fetchSpy).toHaveBeenCalledTimes(2); // token + 1 data; second is cache
  });

  it("EGW00201 (rate limit) 시 지수 백오프 후 재시도", async () => {
    fetchSpy
      .mockResolvedValueOnce(tokenResponse("tok-1"))
      .mockResolvedValueOnce(rateLimitData()) // 1차: 레이트
      .mockResolvedValueOnce(rateLimitData()) // 2차: 레이트
      .mockResolvedValueOnce(okData({ price: "100" })); // 3차: 정상
    const client = makeClient(kv);
    const res = await client.get({
      path: "/uapi/test/path-rl",
      trId: "FHKST00000002",
    });
    expect(res.rt_cd).toBe("0");
    // token + 3 data calls
    expect(fetchSpy).toHaveBeenCalledTimes(4);
  });

  it("rt_cd=1 + 일반 에러 코드 → KisApiError 즉시", async () => {
    fetchSpy
      .mockResolvedValueOnce(tokenResponse("tok-1"))
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({ rt_cd: "1", msg_cd: "EGW00123", msg1: "유효하지 않은 종목코드" }),
          { status: 200, headers: { "content-type": "application/json" } },
        ),
      );
    const client = makeClient(kv);
    await expect(
      client.get({ path: "/uapi/test/path-err", trId: "FHKST00000003" }),
    ).rejects.toBeInstanceOf(KisApiError);
  });

  it("HTTP 401 시 토큰 재발급 + 1회 재시도", async () => {
    fetchSpy
      .mockResolvedValueOnce(tokenResponse("tok-old"))
      .mockResolvedValueOnce(new Response("Unauthorized", { status: 401 })) // 1차 401
      .mockResolvedValueOnce(tokenResponse("tok-new")) // 토큰 재발급
      .mockResolvedValueOnce(okData({ price: "100" })); // 재시도 성공
    const client = makeClient(kv);
    const res = await client.get({
      path: "/uapi/test/path-401",
      trId: "FHKST00000004",
    });
    expect(res.rt_cd).toBe("0");
    expect(fetchSpy).toHaveBeenCalledTimes(4);
  });
});
