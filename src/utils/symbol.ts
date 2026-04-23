/**
 * 종목코드 정규화 + 검증.
 *
 * KIS OpenAPI는 fid_input_iscd / pdno 등의 종목 식별자 필드 길이를 12자로
 * 정의하며, 형태는 endpoint마다 다르다:
 *   - 일반 주식:           6자리 숫자  (예: 005930 삼성전자)
 *   - ETN:                 Q + 6자리 숫자 (예: Q500001) — 명세에 명시됨
 *   - ETF:                 6자리 숫자  (예: 069500 KODEX 200)
 *   - ELW:                 6자리 숫자/영숫자 혼합 가능
 *   - KOSDAQ Global 일부:  영문 prefix 가능
 *
 * 본 모듈은 입력을 trim + uppercase 정규화 후 1~12자 영숫자만 허용.
 * 너무 엄격한 패턴 (`^\d{6}$`)은 ETN을 차단하므로 사용 금지.
 */

const SYMBOL_RE = /^[A-Z0-9]{1,12}$/;

export function normalizeSymbol(input: unknown): string {
  const raw = String(input ?? "").trim().toUpperCase();
  if (!SYMBOL_RE.test(raw)) {
    throw new Error(
      `종목코드 형식이 올바르지 않습니다 (1~12자 영숫자, 예: 005930 / Q500001): ${input}`,
    );
  }
  return raw;
}

/** 검증만 수행. 정상이면 true. (boolean form, search filter 등에서 사용) */
export function isValidSymbol(s: string | undefined | null): boolean {
  if (!s) return false;
  return SYMBOL_RE.test(String(s).trim().toUpperCase());
}

export const SYMBOL_REGEX = SYMBOL_RE;
