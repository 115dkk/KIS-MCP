/**
 * Token-bucket rate limiter scoped per worker isolate.
 * KIS official limit is ~20 req/sec; we cap at 15/sec for safety margin.
 */

export class RateLimiter {
  private tokens: number;
  private lastRefill: number;

  constructor(
    private readonly capacity: number = 15,
    private readonly refillPerSec: number = 15,
  ) {
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }

  private refill(): void {
    const now = Date.now();
    const elapsedSec = (now - this.lastRefill) / 1000;
    if (elapsedSec <= 0) return;
    const refilled = elapsedSec * this.refillPerSec;
    this.tokens = Math.min(this.capacity, this.tokens + refilled);
    this.lastRefill = now;
  }

  async acquire(): Promise<void> {
    while (true) {
      this.refill();
      if (this.tokens >= 1) {
        this.tokens -= 1;
        return;
      }
      const need = 1 - this.tokens;
      const waitMs = Math.max(20, Math.ceil((need / this.refillPerSec) * 1000));
      await new Promise((r) => setTimeout(r, waitMs));
    }
  }
}

// Module-scoped limiter shared across all calls in this isolate.
export const kisRateLimiter = new RateLimiter(15, 15);
