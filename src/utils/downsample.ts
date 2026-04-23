/**
 * Even downsampling for time-series points so LLM responses stay
 * within size limits (CLAUDE.md §5.4).
 */

export function downsample<T>(items: T[], maxPoints: number): T[] {
  if (maxPoints <= 0) return [];
  if (items.length <= maxPoints) return items;

  const result: T[] = [];
  const step = (items.length - 1) / (maxPoints - 1);
  for (let i = 0; i < maxPoints; i++) {
    const idx = Math.round(i * step);
    result.push(items[Math.min(idx, items.length - 1)]);
  }
  return result;
}

export function parseNum(v: string | undefined | null): number {
  if (v === undefined || v === null || v === "") return NaN;
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
}
