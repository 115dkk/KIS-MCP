/**
 * Thin wrapper over Cloudflare KV for typed JSON values with TTL.
 */

export interface CacheEntry<T> {
  value: T;
  expiresAt: number; // unix seconds
}

export class KvCache {
  constructor(private readonly kv: KVNamespace) {}

  async getJSON<T>(key: string): Promise<T | null> {
    const raw = await this.kv.get(key, "json");
    return (raw as T) ?? null;
  }

  async putJSON<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    if (ttlSeconds < 60) {
      // KV minimum TTL is 60 seconds.
      ttlSeconds = 60;
    }
    await this.kv.put(key, JSON.stringify(value), { expirationTtl: ttlSeconds });
  }

  async delete(key: string): Promise<void> {
    await this.kv.delete(key);
  }
}
