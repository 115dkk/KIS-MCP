/**
 * 배치 병렬 실행 유틸 (ROADMAP M0-2).
 *
 * `for...of + await` 순차 패턴을 대체. 독립적인 API 호출들을 batchSize 단위로
 * 묶어 각 배치 내에서 `Promise.allSettled`로 병렬 실행한다.
 *
 * 입력 순서를 보존하며, 개별 호출 실패가 전체를 중단시키지 않는다 (실패한
 * 항목은 `error` 필드로 노출).
 *
 * 레이트 리미트 충돌 방지: 본 MCP 자체 제한이 초당 15회이므로 batchSize는
 * 8 이하 권장. 기본 5.
 */

export interface BatchResult<T, R> {
  item: T;
  result?: R;
  error?: unknown;
}

export async function batchParallel<T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  batchSize = 5,
): Promise<BatchResult<T, R>[]> {
  if (items.length === 0) return [];
  const size = Math.max(1, batchSize);
  const results: BatchResult<T, R>[] = [];
  for (let i = 0; i < items.length; i += size) {
    const batch = items.slice(i, i + size);
    const settled = await Promise.allSettled(batch.map((it) => fn(it)));
    for (let j = 0; j < batch.length; j++) {
      const s = settled[j];
      if (s.status === "fulfilled") {
        results.push({ item: batch[j], result: s.value });
      } else {
        results.push({ item: batch[j], error: s.reason });
      }
    }
  }
  return results;
}
