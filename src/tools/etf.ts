/**
 * Tool 4.4: get_etf_components — ETF 구성종목 + 비중 + 현재가.
 *
 * KIS API 동작 특이점 (실측):
 *  - inquire-component-stock-price (FHKST121600C0)는 같은 요청에 비결정적 응답을 줌.
 *    rt_cd=0 정상으로 표시하지만 output2가 빈 배열로 오는 경우가 빈번 (재현 약 30~50%).
 *  - output1.etf_cnfg_issu_cnt가 진짜 구성종목 수를 알려주므로,
 *    이 값이 > 0인데 output2가 비어있으면 KIS 일시적 응답 누락으로 판단하고 재시도.
 *  - etf_cnfg_issu_cnt가 0이거나 output1 자체가 없으면 진짜 derivative/합성형 ETF.
 */

import { KIS } from "../kis/endpoints.js";
import type { KisClient } from "../kis/client.js";
import type { KisEtfComponentItem, KisResponse } from "../kis/types.js";
import { parseNum } from "../utils/downsample.js";
import { extractArray } from "../utils/kisResponse.js";
import { normalizeSymbol } from "../utils/symbol.js";

export interface GetEtfComponentsInput {
  symbol: string;
  /** Number of top components to return (default 50, max 200). */
  limit?: number;
  /** Optional override for max retry attempts on intermittent empty response. Default 3. */
  maxAttempts?: number;
}

export interface EtfComponent {
  symbol: string;
  name: string;
  weightPct: number;
  price: number;
  change: number;
  changeRate: number;
}

export interface EtfMeta {
  /** ETF가 보고하는 실제 구성종목 수 (etf_cnfg_issu_cnt). 0이면 derivative/합성형. */
  expectedComponentCount: number;
  /** 추적 NAV (output1.nav). */
  nav?: number;
  /** ETF 순자산 총액 (etf_ntas_ttam). */
  netAssets?: number;
  /** ETF CU 단위 증권 수. */
  cuUnitSecCount?: number;
}

export interface EtfComponentsResult {
  etfSymbol: string;
  totalCount: number;
  totalWeightPct: number;
  topNCount: number;
  topNWeightPct: number;
  components: EtfComponent[];
  meta?: EtfMeta;
  /** 실제로 KIS API 호출한 횟수 (재시도 포함). */
  attempts: number;
  message?: string;
}

interface KisEtfComponentMeta {
  stck_prpr?: string;
  nav?: string;
  etf_ntas_ttam?: string;
  etf_cu_unit_scrt_cnt?: string;
  /** 진짜 구성종목 수. derivative/합성형 ETF에서는 0 또는 누락. */
  etf_cnfg_issu_cnt?: string;
  [key: string]: string | undefined;
}

// M0-9: 재시도 정책 강화. KIS API의 비결정적 빈 응답(30~50% 확률)에 대해
// 5회까지 시도 + 지수 백오프(500ms × 1.5^i = 500/750/1125/1687).
//   3회 실패 확률: 50%^3 = 12.5%
//   5회 실패 확률: 50%^5 = 3.1%
// 더 이상 재시도해도 빈 응답이면 진짜 데이터 없음 가능성 높음.
const RETRY_DELAY_MS = 500;
const RETRY_BACKOFF = 1.5;

interface AttemptLog {
  attempt: number;
  emptyOutput: boolean;
  emptyOutput1: boolean;
  emptyOutput2: boolean;
  expectedComponentCount: number;
}

export async function getEtfComponents(
  client: KisClient,
  input: GetEtfComponentsInput,
): Promise<EtfComponentsResult> {
  const symbol = normalizeSymbol(input.symbol);
  const limit = Math.min(Math.max(input.limit ?? 50, 1), 200);
  // M0-9: 기본 maxAttempts 3 → 5
  const maxAttempts = Math.min(Math.max(input.maxAttempts ?? 5, 1), 5);

  let lastMeta: EtfMeta | undefined;
  let lastItems: KisEtfComponentItem[] = [];
  let attempts = 0;
  let isDerivative = false;
  const attemptLog: AttemptLog[] = [];

  for (let i = 0; i < maxAttempts; i++) {
    attempts++;
    const res = await client.get<unknown>({
      path: KIS.etfComponents.path,
      trId: KIS.etfComponents.trIdReal,
      // 공식 명세: fid_cond_scr_div_code=11216 필수
      query: {
        fid_cond_mrkt_div_code: "J",
        fid_cond_scr_div_code: "11216",
        fid_input_iscd: symbol,
      },
    });

    lastMeta = parseEtfMeta(res);
    lastItems = extractArray<KisEtfComponentItem>(res);

    // 디버깅 보강 (M0-9): 시도별로 어느 output 필드에 데이터가 있었는지 기록.
    attemptLog.push({
      attempt: attempts,
      emptyOutput: !Array.isArray(res.output) || res.output.length === 0,
      emptyOutput1: !Array.isArray(res.output1) || (res.output1 as unknown[]).length === 0,
      emptyOutput2: !Array.isArray(res.output2) || (res.output2 as unknown[]).length === 0,
      expectedComponentCount: lastMeta?.expectedComponentCount ?? -1,
    });

    if (lastItems.length > 0) break;

    // output1.etf_cnfg_issu_cnt === 0 → 진짜 derivative ETF, 재시도 무의미
    if (lastMeta && lastMeta.expectedComponentCount === 0) {
      isDerivative = true;
      break;
    }

    // 마지막 시도가 아니면 지수 백오프 후 재시도 (M0-9: 고정 → 지수)
    if (i < maxAttempts - 1) {
      const delay = Math.round(RETRY_DELAY_MS * RETRY_BACKOFF ** i);
      await sleep(delay);
    }
  }

  if (lastItems.length === 0) {
    if (isDerivative) {
      return {
        etfSymbol: symbol,
        totalCount: 0,
        totalWeightPct: 0,
        topNCount: 0,
        topNWeightPct: 0,
        components: [],
        meta: lastMeta,
        attempts,
        message:
          "이 ETF는 파생/합성형 (선물·스왑 등) 기반이라 개별 구성종목 정보가 없습니다. 추적 지수와 NAV는 get_quote로 확인하세요.",
      };
    }
    const expected = lastMeta?.expectedComponentCount ?? 0;
    // M0-9: attemptLog를 message에 부착하여 디버깅 가시성 확보.
    const attemptSummary = attemptLog
      .map(
        (a) =>
          `#${a.attempt}: out=${a.emptyOutput ? "∅" : "■"}/out1=${a.emptyOutput1 ? "∅" : "■"}/out2=${a.emptyOutput2 ? "∅" : "■"}`,
      )
      .join(", ");
    return {
      etfSymbol: symbol,
      totalCount: 0,
      totalWeightPct: 0,
      topNCount: 0,
      topNWeightPct: 0,
      components: [],
      meta: lastMeta,
      attempts,
      message:
        `KIS API가 ${attempts}회 호출 모두에서 구성종목 데이터를 반환하지 않았습니다 (예상 ${expected}개). ` +
        `시도 로그: [${attemptSummary}]. ` +
        "KIS inquire-component-stock-price 엔드포인트는 같은 요청에도 빈 응답을 비결정적으로 내려보내는 알려진 동작이 있습니다. 잠시 후 재시도하면 데이터가 올 가능성이 높습니다.",
    };
  }

  const all = lastItems.map(toComponent).sort((a, b) => b.weightPct - a.weightPct);
  const totalWeight = all.reduce((s, c) => s + c.weightPct, 0);
  const top = all.slice(0, limit);
  const topWeight = top.reduce((s, c) => s + c.weightPct, 0);

  return {
    etfSymbol: symbol,
    totalCount: all.length,
    totalWeightPct: round2(totalWeight),
    topNCount: top.length,
    topNWeightPct: round2(topWeight),
    components: top,
    meta: lastMeta,
    attempts,
  };
}

/**
 * KIS raw 응답 → EtfMeta domain 변환.
 *
 * extract* 명명을 피한 이유: M0-1 원칙상 일반 응답 추출은 utils/kisResponse.ts
 * 사용. 여기는 ETF 도메인 특정 메타 (nav/netAssets 등) 가공이므로 parse* 명명.
 */
function parseEtfMeta(res: KisResponse<unknown>): EtfMeta | undefined {
  // output1은 ETF 메타 (객체). output2가 components (배열).
  const candidate =
    !Array.isArray(res.output1) && typeof res.output1 === "object" ? (res.output1 as KisEtfComponentMeta) : null;
  if (!candidate) return undefined;
  const expected = parseNum(candidate.etf_cnfg_issu_cnt);
  return {
    expectedComponentCount: Number.isFinite(expected) ? expected : 0,
    nav: numOrUndef(parseNum(candidate.nav)),
    netAssets: numOrUndef(parseNum(candidate.etf_ntas_ttam)),
    cuUnitSecCount: numOrUndef(parseNum(candidate.etf_cu_unit_scrt_cnt)),
  };
}

function toComponent(item: KisEtfComponentItem): EtfComponent {
  return {
    symbol: item.stck_shrn_iscd ?? "",
    name: item.hts_kor_isnm ?? "",
    weightPct: parseNum(item.etf_cnfg_issu_rlim),
    price: parseNum(item.stck_prpr),
    change: parseNum(item.prdy_vrss),
    changeRate: parseNum(item.prdy_ctrt),
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function numOrUndef(n: number): number | undefined {
  return Number.isFinite(n) && n !== 0 ? n : undefined;
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
