/**
 * Filtering helpers — primarily for excluding inverse/leveraged/derivative ETFs
 * from advanced search results (CLAUDE.md §4.7).
 *
 * 변천:
 *   - M0-8: OVERSEAS 14개 → 50개, OVERSEAS_WHITELIST(Korea/한국) 도입, BOND_TDF 신설
 *   - 실측 보강: 해외기업명 추가 (브로드컴/샤오미/BYD/팔란티어 등),
 *     채권/REIT/원자재로 BOND_TDF 확장
 *   - 화이트리스트 분리: HARD vs SOFT OVERSEAS — Korea 화이트리스트가 너무 광범위해서
 *     "한국+미국 혼합 ETF"가 면제되던 버그 수정. HARD(국가/회사명)는 화이트리스트 무시,
 *     SOFT(지수 제공자 MSCI/FTSE/STOXX)만 화이트리스트 적용.
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
 * **HARD** 해외 키워드 — Korea 화이트리스트로도 면제 안 됨.
 *
 * 추종 자산이 명백히 해외인 키워드 (국가/지역/도시명 + 해외 회사명 + 해외 거래소 +
 * 해외 통화/채권 + 글로벌 분산). "한국+미국 혼합" ETF처럼 한국 키워드가 들어가도
 * 해외 비중이 명시되면 "주식형 한국 ETF"로 분류할 수 없으므로 제외.
 */
const OVERSEAS_HARD_KEYWORDS = [
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
  // 해외 거래소/지수 (지수 제공자 MSCI/FTSE/STOXX는 SOFT로 분리)
  "나스닥",
  "S&P",
  "S&P500",
  "다우",
  "DAX",
  "TOPIX",
  "Nifty",
  "항셍",
  "닛케이",
  "니케이",
  "NYSE",
  "필라델피아",
  // 해외 회사명 (개별주식 추종 ETF)
  "테슬라",
  "엔비디아",
  "애플",
  "아마존",
  "마이크로소프트",
  "구글",
  "알파벳",
  "메타",
  "넷플릭스",
  "브로드컴",
  "Broadcom",
  "샤오미",
  "Xiaomi",
  "BYD",
  "비야디",
  "팔란티어",
  "Palantir",
  "AMD",
  "인텔",
  "Intel",
  "INTC",
  "버크셔",
  "Berkshire",
  "워런버핏",
  "디즈니",
  "Disney",
  "어도비",
  "Adobe",
  "마스터카드",
  "Mastercard",
  "비자",
  "Visa",
  "페이팔",
  "PayPal",
  // 해외 통화/채권
  "달러",
  "USD",
  "미국채",
  "Treasury",
  // 글로벌/월드 (전세계 분산)
  "글로벌",
  "월드",
  "World",
  "Total World",
  "토탈월드",
];

/**
 * **SOFT** 해외 키워드 — Korea 화이트리스트로 면제 가능.
 *
 * 지수 제공자/포맷명 (MSCI/FTSE/STOXX)은 한국 자산 ETF에도 흔히 사용되므로
 * "Korea/한국"이 함께 있으면 한국 추종으로 인정. 예: KODEX MSCI Korea.
 *
 * SOFT 키워드만 있고 화이트리스트 없으면 제외 (예: TIGER MSCI Emerging은 제외).
 */
const OVERSEAS_SOFT_KEYWORDS = ["MSCI", "FTSE", "STOXX"];

/**
 * Korea 화이트리스트 — SOFT_OVERSEAS 키워드 매칭을 면제.
 * HARD_OVERSEAS는 면제 안 됨 (혼합형 방지).
 */
const OVERSEAS_WHITELIST = ["Korea", "한국"];

/**
 * 주식이 아닌 자산 ETF 식별 키워드 (M0-8 신설, 실측으로 확장).
 * `excludeBonds: true` 옵션 활성 시 적용 — 이름은 BOND이지만 실제로는 채권 + REIT
 * + 부동산 + 원자재 + 인프라 등 "주식 아닌 자산 추종" ETF를 광범위하게 제거한다.
 *
 * 사용자 의도가 "주식형 ETF"인 경우 이 옵션을 켜면 주식 외 자산이 모두 빠진다.
 */
const BOND_TDF_KEYWORDS = [
  // ── 채권 ──
  "채권",
  "국고채",
  "국채",
  "회사채",
  "은행채",        // RISE 단기특수은행채액티브
  "금융채",        // KODEX 26-12 금융채(AA-이상)액티브
  "금리",
  "통안채",
  "단기채",
  "장기채",
  "WGBI",          // FTSE WGBI Korea (World Gov Bond Index)
  "GBI",           // 같은 계열
  // ── TDF / 머니마켓 ──
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
  // ── REIT / 부동산 / 인프라 ──
  "리츠",
  "REIT",
  "REITs",
  "부동산",
  "인프라",
  // ── 원자재 (선물 ETF — '선물'은 DEFAULT_EXCLUDE에 이미 있지만 일부 비선물 spot도 잡기 위해) ──
  "국제금",
  "WTI",          // 원유 ETF
  "원유",
  "구리",
  "팔라듐",
  "백금",
  "천연가스",
  "Natgas",
  "Silver",       // 영문만 — 한글 '은'은 false positive 위험으로 제외
];

export interface ExclusionOptions {
  extraKeywords?: string[];
  excludeOverseas?: boolean;
  /** 채권/TDF/머니마켓/REIT/원자재 등 주식 아닌 자산 ETF 추가 제외. */
  excludeBonds?: boolean;
}

/**
 * 종목명이 제외 대상이면 true 반환.
 *
 * 적용 순서:
 *   1) DEFAULT_EXCLUDE_KEYWORDS + opts.extraKeywords (화이트리스트 면제 없음)
 *   2) excludeOverseas일 때:
 *      a) HARD_OVERSEAS 매칭 → 즉시 제외 (Korea 화이트리스트도 무시)
 *      b) SOFT_OVERSEAS 매칭 + 화이트리스트 없음 → 제외
 *   3) excludeBonds일 때 BOND_TDF_KEYWORDS 매칭 → 제외
 *
 * Korea 화이트리스트가 SOFT만 면제하는 이유:
 *   - "KODEX MSCI Korea" → SOFT(MSCI) + Korea → 면제 ✓
 *   - "KIWOOM 한국고배당&미국AI테크" → HARD(미국) + Korea → HARD 우선, 제외 ✓
 *   - "ACE FTSE WGBI Korea" → SOFT(FTSE) + Korea → OVERSEAS 면제. WGBI는 BOND에서 잡힘 ✓
 */
export function isExcludedByKeyword(name: string, opts: ExclusionOptions = {}): boolean {
  if (!name) return false;
  const lower = name.toLowerCase();

  // 1) 기본 제외 키워드 (화이트리스트 면제 없음)
  for (const kw of [...DEFAULT_EXCLUDE_KEYWORDS, ...(opts.extraKeywords ?? [])]) {
    if (!kw) continue;
    if (lower.includes(kw.toLowerCase())) return true;
  }

  // 2) 해외 제외 키워드
  if (opts.excludeOverseas) {
    // 2a) HARD: Korea 화이트리스트 무시 — 명백한 해외 자산은 한국 키워드와 공존해도 제외
    for (const kw of OVERSEAS_HARD_KEYWORDS) {
      if (lower.includes(kw.toLowerCase())) return true;
    }
    // 2b) SOFT: Korea 화이트리스트 면제 적용 — 지수 제공자만 매칭되고 화이트리스트 있으면 통과
    const whitelisted = OVERSEAS_WHITELIST.some((w) => lower.includes(w.toLowerCase()));
    if (!whitelisted) {
      for (const kw of OVERSEAS_SOFT_KEYWORDS) {
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

/** Backward compat: HARD + SOFT 통합 view (테스트/디버깅용). */
export function getOverseasKeywords(): readonly string[] {
  return [...OVERSEAS_HARD_KEYWORDS, ...OVERSEAS_SOFT_KEYWORDS];
}

export function getOverseasHardKeywords(): readonly string[] {
  return OVERSEAS_HARD_KEYWORDS;
}

export function getOverseasSoftKeywords(): readonly string[] {
  return OVERSEAS_SOFT_KEYWORDS;
}

export function getOverseasWhitelist(): readonly string[] {
  return OVERSEAS_WHITELIST;
}

export function getBondTdfKeywords(): readonly string[] {
  return BOND_TDF_KEYWORDS;
}
