/**
 * Filtering helpers — primarily for excluding inverse/leveraged/derivative ETFs
 * from advanced search results (CLAUDE.md §4.7).
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
  "채권혼합",
  "혼합",
  "밸런스",
  "선물",
  "Futures",
];

const OVERSEAS_KEYWORDS = [
  "미국",
  "나스닥",
  "S&P",
  "S&P500",
  "다우",
  "글로벌",
  "차이나",
  "중국",
  "일본",
  "베트남",
  "인도",
  "유럽",
  "선진국",
  "신흥국",
];

export interface ExclusionOptions {
  extraKeywords?: string[];
  excludeOverseas?: boolean;
}

/**
 * Returns true when the given instrument name should be EXCLUDED based on
 * default + caller-supplied filter keywords.
 */
export function isExcludedByKeyword(name: string, opts: ExclusionOptions = {}): boolean {
  if (!name) return false;
  const lower = name.toLowerCase();
  const keywords = [
    ...DEFAULT_EXCLUDE_KEYWORDS,
    ...(opts.extraKeywords ?? []),
    ...(opts.excludeOverseas ? OVERSEAS_KEYWORDS : []),
  ];
  for (const kw of keywords) {
    if (!kw) continue;
    if (lower.includes(kw.toLowerCase())) return true;
  }
  return false;
}

export function getDefaultExcludeKeywords(): readonly string[] {
  return DEFAULT_EXCLUDE_KEYWORDS;
}
