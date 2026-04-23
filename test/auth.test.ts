import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { KisAuth } from "../src/kis/auth.js";

class FakeKv implements Pick<KVNamespace, "get" | "put" | "delete"> {
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

function makeAuth(kv: FakeKv) {
  return new KisAuth({
    KIS_APP_KEY: "key",
    KIS_APP_SECRET: "secret",
    KIS_BASE_URL: "https://example.test",
    KIS_TOKENS: kv as unknown as KVNamespace,
  });
}

const okResponse = (token: string) =>
  new Response(
    JSON.stringify({ access_token: token, expires_in: 86400, token_type: "Bearer", access_token_token_expired: "" }),
    { status: 200, headers: { "content-type": "application/json" } },
  );

describe("KisAuth", () => {
  let kv: FakeKv;
  let fetchSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    kv = new FakeKv();
    fetchSpy = vi.spyOn(globalThis, "fetch");
  });
  afterEach(() => {
    fetchSpy.mockRestore();
  });

  it("최초 호출 시 토큰을 발급하고 캐시에 저장한다", async () => {
    fetchSpy.mockResolvedValueOnce(okResponse("tok-1"));
    const auth = makeAuth(kv);
    const t = await auth.getAccessToken();
    expect(t).toBe("tok-1");
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(kv.store.size).toBe(1);
  });

  it("캐시된 토큰을 재사용한다", async () => {
    fetchSpy.mockResolvedValueOnce(okResponse("tok-2"));
    const auth = makeAuth(kv);
    await auth.getAccessToken();
    await auth.getAccessToken();
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("forceRefresh=true 면 무조건 재발급한다", async () => {
    fetchSpy
      .mockResolvedValueOnce(okResponse("tok-old"))
      .mockResolvedValueOnce(okResponse("tok-new"));
    const auth = makeAuth(kv);
    await auth.getAccessToken();
    const t = await auth.getAccessToken(true);
    expect(t).toBe("tok-new");
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it("invalidate 후에는 다시 발급한다", async () => {
    fetchSpy
      .mockResolvedValueOnce(okResponse("tok-a"))
      .mockResolvedValueOnce(okResponse("tok-b"));
    const auth = makeAuth(kv);
    await auth.getAccessToken();
    await auth.invalidate();
    const t = await auth.getAccessToken();
    expect(t).toBe("tok-b");
  });

  it("토큰 발급 실패 응답에서 시크릿이 메시지에 노출되지 않는다", async () => {
    fetchSpy.mockResolvedValueOnce(
      new Response("Bearer abcdef.token.value 잘못된 키입니다", { status: 401 }),
    );
    const auth = makeAuth(kv);
    await expect(auth.getAccessToken()).rejects.toThrow(/Bearer \*\*\*/);
  });
});
