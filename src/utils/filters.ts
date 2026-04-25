/**
 * Filtering helpers — primarily for excluding inverse/leveraged/derivative ETFs
 * from advanced search results (CLAUDE.md §4.7).
 *
 * M0-8 확장:
 *   - OVERSEAS_KEYWORDS 14개 → ~50개 (국가/지역, 해외지수, 해외기업명)
 *   - OVERSEAS_WHITELIST 추가 (MSCI Korea 같은 국내 추종 ETF 면제)
 *   - BOND_TDF_KEYWORDS + excludeBonds 옵션 신설
 */

const DEFAULT_EXCLUDE_KEYWORDS = [
  "인버스",
  "레버리지",
  "2X",
  "3X",
  "Inverse",
  "Leverage",
  "커버드콜",
  "CoveredCall",
  "Covered Call",
  // "채권혼합" 제거 (M0-8): excludeBonds=true에서 "채권"이 잡으므로 중복.
  // excludeBonds=false 환경에서는 채권혼합 ETF가 결과에 포함되어야 함.
  "혼합",
  "밸런스",
  "선물",
  "Futures",
];

/**
 * 해외 자산 추종 ETF 식별 키워드. M0-8에서 14 → 50개로 확장.
 *
 * 카테고리:
 *   1) 국가/지역명 — 한국어/영어
 *   2) 해외지수/거래소
 *   3) 해외기업명 (개별주식 추종 ETF)
 *   4) 해외통화/채권
 */
const OVERSEAS_KEYWORDS = [
  // 국가/지역 — 미주
  "미국",
  "캐나다",
  "브라질",
  "멕시코",
  "남미",
  // 국가/지역 — 아시아
  "차이나",
  "중국",
  "일본",
  "베트남",
  "인도",
  "홍콩",
  "대만",
  "필리핀",
  "인도네시아",
  "태국",
  "말레이",
  "싱가포르",
  "아시아",
  // 국가/지역 — 유럽
  "유럽",
  "독일",
  "영국",
  "프랑스",
  "이탈리아",
  "스페인",
  "폴란드",
  "터키",
  "러시아",
  // 국가/지역 — 기타
  "호주",
  "사우디",
  "아랍",
  "아프리카",
  "선진국",
  "신흥국",
  "이머징",
  // 해외지수/거래소
  "나스닥",
  "S&P",
  "S&P500",
  "다우",
  "글로벌",
  "MSCI",
  "FTSE",
  "STOXX",
  "DAX",
  "TOPIX",
  "Nifty",
  "항셍",
  "닛케이",
  "니케이",
  "NYSE",
  "필라델피아",
  // 해외기업명 (개별주식 추종 ETF)
  "테슬라",
  "엔비디아",
  "애플",
  "아마존",
  "마이크로소프트",
  "구글",
  "알파벳",
  "메타",
  "넷플릭스",
  // 해외 통화/채권
  "달러",
  "USD",
  "미국채",
  "Treasury",
];

/**
 * MSCI 키워드의 화이트리스트 — KODEX MSCI Korea 등 국내 추종 ETF는 면제.
 * `Korea` / `한국` 키워드가 이름에 포함되면 해외 필터를 건너뛴다.
 */
const OVERSEAS_WHITELIST = ["Korea", "한국"];

/**
 * 채권/TDF/머니마켓 ETF 식별 키워드 (M0-8 신설).
 * `excludeBonds: true`일 때 활성. 주식 스크리닝에서 채권형 상품을 제거하는 용도.
 */
const BOND_TDF_KEYWORDS = [
  "채권",
  "국고채",
  "국채",
  "회사채",
  "금리",
  "통안채",
  "단기채",
  "장기채",
  "TDF",
  "타겟데이트",
  "Target Date",
  "머니마켓",
  "MMF",
  "단기자금",
  "SOFR",
  "CD금리",
  "종합채권",
  "크레딧",
  "하이일드",
];

export interface ExclusionOptions {
  extraKeywords?: string[];
  excludeOverseas?: boolean;
  /** 채권/TDF/머니마켓 ETF 추가 제외. 주식 발굴 시 권장. */
  excludeBonds?: boolean;
}

/**
 * 종목명이 제외 대상이면 true 반환.
 *
 * 적용 순서:
 *   1) DEFAULT_EXCLUDE_KEYWORDS + opts.extraKeywords (화이트리스트 면제 없음)
 *   2) OVERSEAS_KEYWORDS — opts.excludeOverseas일 때만, OVERSEAS_WHITELIST 면제
 *   3) BOND_TDF_KEYWORDS — opts.excludeBonds일 때만
 */
export function isExcludedByKeyword(name: string, opts: ExclusionOptions = {}): boolean {
  if (!name) return false;
  const lower = name.toLowerCase();

  // 1) 기본 제외 키워드 (화이트리스트 면제 없음)
  for (const kw of [...DEFAULT_EXCLUDE_KEYWORDS, ...(opts.extraKeywords ?? [])]) {
    if (!kw) continue;
    if (lower.includes(kw.toLowerCase())) return true;
  }

  // 2) 해외 제외 키워드 — 화이트리스트 면제 적용
  if (opts.excludeOverseas) {
    const whitelisted = OVERSEAS_WHITELIST.some((w) => lower.includes(w.toLowerCase()));
    if (!whitelisted) {
      for (const kw of OVERSEAS_KEYWORDS) {
        if (lower.includes(kw.toLowerCase())) return true;
      }
    }
  }

  // 3) 채권/TDF/머니마켓 제외
  if (opts.excludeBonds) {
    for (const kw of BOND_TDF_KEYWORDS) {
      if (lower.includes(kw.toLowerCase())) return true;
    }
  }

  return false;
}

export function getDefaultExcludeKeywords(): readonly string[] {
  return DEFAULT_EXCLUDE_KEYWORDS;
}

export function getOverseasKeywords(): readonly string[] {
  return OVERSEAS_KEYWORDS;
}

export function getOverseasWhitelist(): readonly string[] {
  return OVERSEAS_WHITELIST;
}

export function getBondTdfKeywords(): readonly string[] {
  return BOND_TDF_KEYWORDS;
}
