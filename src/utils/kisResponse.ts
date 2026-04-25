/**
 * KIS 응답 추출 공용 유틸 (ROADMAP M0-1).
 *
 * 10개 도구 파일에 산재했던 `extract*` 함수들의 통합본. 모든 새 도구는
 * 이 모듈을 import해서 사용하고 도구 파일 내부에 별도 extract 함수를
 * 정의하지 않는다 (CLAUDE.md §5.7 DRY 원칙).
 *
 * ## 핵심 설계 결정
 *
 * 1) `extractArray`는 `Array.isArray(c) && c.length > 0` 조건을 사용한다.
 *    빈 배열(`[]`)은 건너뛴다.
 *
 *    근거: KIS API가 `output: []`, `output1: {meta}`, `output2: [실제 데이터]`
 *    형태로 응답하는 경우가 있다 (ETF 구성종목 등). 이 때 `Array.isArray([])`가
 *    true라는 이유로 즉시 빈 배열을 반환하면 `output2`의 실제 데이터에 도달하지
 *    못한다 (ROADMAP M0-9 ETF 구성종목 신뢰성 이슈의 근본 원인).
 *
 *    빈 배열을 유효한 응답으로 취급해야 하는 경우(데이터 없음 명시)에는 별도로
 *    `Array.isArray(res.output)` 검사를 호출 측에서 한다.
 *
 * 2) `extractObject`는 첫 번째 비배열 객체를 반환한다. output1이 메타 객체로
 *    오는 ETF 응답에서 사용.
 *
 * 3) `extractArrayPreferred`는 일부 KIS endpoint(해외주식 일/분봉)가 output2에
 *    배열을 넣는 패턴을 위해 우선순위를 변경한 변형이다. 추가 키 우선순위
 *    배열을 받아 같은 빈 배열 건너뛰기 로직을 적용한다.
 */

import type { KisResponse } from "../kis/types.js";

/** 응답 후보 키 — KIS는 output / output1 / output2 셋 중 하나를 채워 보낸다. */
export type OutputKey = "output" | "output1" | "output2";
const DEFAULT_ORDER: OutputKey[] = ["output", "output1", "output2"];

/**
 * KIS 응답에서 배열 타입 출력을 추출한다.
 * `output → output1 → output2` 순으로 검사하여 **비어있지 않은** 첫 배열을 반환.
 * 모두 비배열 또는 빈 배열이면 빈 배열을 반환.
 *
 * 빈 배열 건너뛰기 사유는 모듈 상단 주석 참조.
 */
export function extractArray<T>(res: KisResponse<unknown> | undefined | null): T[] {
  if (!res) return [];
  for (const key of DEFAULT_ORDER) {
    const c = res[key];
    if (Array.isArray(c) && c.length > 0) return c as T[];
  }
  return [];
}

/**
 * 우선순위를 명시적으로 지정해 배열 추출. 해외주식 일/분봉처럼 output2에
 * 배열이 오는 endpoint에 사용.
 *
 * 빈 배열 건너뛰기 정책은 동일.
 */
export function extractArrayPreferred<T>(
  res: KisResponse<unknown> | undefined | null,
  preferredOrder: OutputKey[],
): T[] {
  if (!res) return [];
  for (const key of preferredOrder) {
    const c = res[key];
    if (Array.isArray(c) && c.length > 0) return c as T[];
  }
  return [];
}

/**
 * KIS 응답에서 단일 객체 출력을 추출한다.
 * `output → output1 → output2` 순으로 검사하여 첫 번째 비배열 객체를 반환.
 * 모두 배열이거나 비어있으면 빈 객체.
 */
export function extractObject<T>(res: KisResponse<unknown> | undefined | null): Partial<T> {
  if (!res) return {};
  for (const key of DEFAULT_ORDER) {
    const c = res[key];
    if (c && typeof c === "object" && !Array.isArray(c)) return c as Partial<T>;
  }
  return {};
}

/**
 * 우선순위 명시 객체 추출 — output1이 메타로 오는 케이스 등.
 */
export function extractObjectPreferred<T>(
  res: KisResponse<unknown> | undefined | null,
  preferredOrder: OutputKey[],
): Partial<T> {
  if (!res) return {};
  for (const key of preferredOrder) {
    const c = res[key];
    if (c && typeof c === "object" && !Array.isArray(c)) return c as Partial<T>;
  }
  return {};
}

/**
 * 배열을 시도하고 실패하면 단일 객체를 배열로 감싸 반환. dividend.ts나
 * chart.ts 등 일부 도구가 사용하던 2단계 fallback 패턴.
 */
export function extractArrayWithObjectFallback<T>(
  res: KisResponse<unknown> | undefined | null,
): T[] {
  const arr = extractArray<T>(res);
  if (arr.length > 0) return arr;
  const obj = extractObject<T>(res);
  if (obj && Object.keys(obj).length > 0) return [obj as T];
  return [];
}
