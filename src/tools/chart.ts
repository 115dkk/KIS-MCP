/**
 * Tool 4.3: get_chart — OHLCV time series for stocks/ETFs.
 *
 * 봉 단위:
 *   - day/week/month/year: FHKST03010100 (inquire-daily-itemchartprice)
 *     호출당 100건 cap → 페이지네이션 루프로 다일 범위 커버
 *   - minute: FHKST03010230 (inquire-time-dailychartprice) 1분봉 base
 *     intervalMinutes (1/3/5/10/15/30/60)로 클라이언트 집계
 *     호출당 ~120건(2시간) → HOUR/DATE 갱신으로 페이지네이션
 *
 * 한도 (CLAUDE.md §5.4 + 워커 30s wall-clock 고려):
 *   - maxPoints 상한 2000 (기본 500, 하위 호환)
 *   - 일봉 페이지: 최대 20회 (≈ 2000 영업일 ≈ 8년)
 *   - 분봉 페이지: 최대 30회 (≈ 60시간 분봉 데이터)
 *   - 분봉 최대 범위: 5 영업일
 *
 * 결과는 항상 시간 오름차순. 500포인트 초과 시 균등 다운샘플.
 */

import { KIS } from "../kis/endpoints.js";
import type { KisClient } from "../kis/client.js";
import type {
  KisChartItem,
  KisResponse,
  KisStockMinuteChartItem,
} from "../kis/types.js";
import { downsample, parseNum } from "../utils/downsample.js";
import { normalizeSymbol } from "../utils/symbol.js";

export type PeriodCode = "day" | "week" | "month" | "year" | "minute";

/** 분봉 집계 단위. 1분봉을 base로 클라이언트에서 합쳐 N분봉 생성. */
export type IntervalMinutes = 1 | 3 | 5 | 10 | 15 | 30 | 60;

const VALID_INTERVALS: IntervalMinutes[] = [1, 3, 5, 10, 15, 30, 60];

export interface GetChartInput {
  symbol: string;
  period: PeriodCode;
  startDate?: string; // YYYYMMDD
  endDate?: string; // YYYYMMDD
  /** Disable adjustment for splits/rights (default: adjusted). day/week/month/year 전용. */
  adjusted?: boolean;
  /** Hard cap on returned points (default 500, max 2000). */
  maxPoints?: number;
  /** 분봉 집계 단위. period=minute일 때만 유효. 기본 1. */
  intervalMinutes?: IntervalMinutes;
}

export interface ChartPoint {
  /** day/week/month/year: "YYYY-MM-DD" / minute: "YYYY-MM-DD HH:MM:SS" */
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface ChartResult {
  symbol: string;
  period: PeriodCode;
  intervalMinutes?: IntervalMinutes;
  startDate: string;
  endDate: string;
  points: ChartPoint[];
  rawCount: number;
  downsampledTo?: number;
  /** 페이지네이션 루프 횟수 (디버깅·요금 추정용). */
  pagesFetched?: number;
  notes?: string[];
}

const DAILY_PERIOD_CODE: Partial<Record<PeriodCode, string>> = {
  day: "D",
  week: "W",
  month: "M",
  year: "Y",
};

// ── KRX 정규장 시간 상수 ────────────────────────────────────────
const MARKET_OPEN_HHMM = 900; // 09:00
const MARKET_CLOSE_HHMM = 1530; // 15:30 (정규장 마감)
const MAX_DAILY_PAGES = 20;
const MAX_MINUTE_PAGES = 30;
const MAX_MINUTE_RANGE_DAYS = 5;
const MAX_POINTS_CAP = 2000;
const DEFAULT_MAX_POINTS = 500;

function formatYmd(date: Date): string {
  const y = date.getUTCFullYear().toString().padStart(4, "0");
  const m = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const d = date.getUTCDate().toString().padStart(2, "0");
  return `${y}${m}${d}`;
}

function parseYmd(s: string): Date {
  if (!/^\d{8}$/.test(s)) throw new Error(`날짜 형식은 YYYYMMDD여야 합니다: ${s}`);
  const y = Number(s.slice(0, 4));
  const m = Number(s.slice(4, 6)) - 1;
  const d = Number(s.slice(6, 8));
  return new Date(Date.UTC(y, m, d));
}

function dateRangeDays(startYmd: string, endYmd: string): number {
  const s = parseYmd(startYmd).getTime();
  const e = parseYmd(endYmd).getTime();
  return Math.round((e - s) / 86_400_000) + 1;
}

function defaultRange(period: PeriodCode): { startDate: string; endDate: string } {
  const today = new Date();
  const start = new Date(today);
  switch (period) {
    case "minute":
      // 분봉 기본 범위: 오늘 하루
      break;
    case "day":
      start.setUTCMonth(start.getUTCMonth() - 6);
      break;
    case "week":
      start.setUTCFullYear(start.getUTCFullYear() - 2);
      break;
    case "month":
      start.setUTCFullYear(start.getUTCFullYear() - 5);
      break;
    case "year":
      start.setUTCFullYear(start.getUTCFullYear() - 20);
      break;
  }
  return { startDate: formatYmd(start), endDate: formatYmd(today) };
}

export async function getChart(client: KisClient, input: GetChartInput): Promise<ChartResult> {
  const symbol = normalizeSymbol(input.symbol);
  if (input.period !== "minute" && !DAILY_PERIOD_CODE[input.period]) {
    throw new Error(
      `기간 분류는 day/week/month/year/minute 중 하나여야 합니다: ${input.period}`,
    );
  }

  const range = input.startDate && input.endDate
    ? { startDate: input.startDate, endDate: input.endDate }
    : defaultRange(input.period);

  const cap = Math.min(input.maxPoints ?? DEFAULT_MAX_POINTS, MAX_POINTS_CAP);

  if (input.period === "minute") {
    return await fetchMinuteChart(client, symbol, range, cap, input.intervalMinutes ?? 1);
  }
  return await fetchDailyChart(client, symbol, input.period, range, cap, input.adjusted ?? true);
}

// ── 일봉/주봉/월봉/연봉 (FHKST03010100) ──────────────────────────
async function fetchDailyChart(
  client: KisClient,
  symbol: string,
  period: PeriodCode,
  range: { startDate: string; endDate: string },
  cap: number,
  adjusted: boolean,
): Promise<ChartResult> {
  const periodCode = DAILY_PERIOD_CODE[period]!;
  const startDateMs = parseYmd(range.startDate).getTime();
  let cursor = range.endDate;
  let pages = 0;
  const all: ChartPoint[] = [];
  const notes: string[] = [];
  const seenDates = new Set<string>();

  while (pages < MAX_DAILY_PAGES) {
    pages++;
    const res = await client.get<KisChartItem[] | KisChartItem>({
      path: KIS.stockDailyChart.path,
      trId: KIS.stockDailyChart.trIdReal,
      query: {
        fid_cond_mrkt_div_code: "J",
        fid_input_iscd: symbol,
        fid_input_date_1: range.startDate,
        fid_input_date_2: cursor,
        fid_period_div_code: periodCode,
        fid_org_adj_prc: adjusted ? "0" : "1",
      },
    });

    const items = extractDailyItems(res);
    if (items.length === 0) break;

    let newOldestYmd: string | null = null;
    for (const item of items) {
      const point = dailyItemToPoint(item);
      if (!point) continue;
      const rawYmd = item.stck_bsop_date;
      if (seenDates.has(rawYmd)) continue;
      seenDates.add(rawYmd);
      all.push(point);
      if (newOldestYmd === null || rawYmd < newOldestYmd) newOldestYmd = rawYmd;
    }

    // 응답이 항상 시작 날짜에 도달했거나, 더 오래된 데이터가 없으면 종료
    if (!newOldestYmd) break;
    if (parseYmd(newOldestYmd).getTime() <= startDateMs) break;

    // 한 페이지가 100건 미만이면 더 이상 데이터 없음
    if (items.length < 100) break;

    // 다음 페이지: cursor를 가장 오래된 날짜의 1일 전으로
    const nextCursor = new Date(parseYmd(newOldestYmd).getTime() - 86_400_000);
    const nextCursorYmd = formatYmd(nextCursor);
    if (nextCursorYmd >= cursor) break; // safety: cursor가 진전 없으면 중단
    cursor = nextCursorYmd;
  }

  if (pages >= MAX_DAILY_PAGES) {
    notes.push(
      `페이지네이션 상한(${MAX_DAILY_PAGES}회)에 도달했습니다. 더 긴 기간이 필요하면 startDate를 더 가깝게 조정하거나 period를 더 큰 단위(week/month/year)로 변경하세요.`,
    );
  }

  // 시작 날짜 이전 데이터 제거 + 시간 오름차순 정렬
  const filtered = all.filter((p) => p.date.replace(/-/g, "") >= range.startDate);
  filtered.sort((a, b) => a.date.localeCompare(b.date));

  const downsampled = downsample(filtered, cap);

  return {
    symbol,
    period,
    startDate: range.startDate,
    endDate: range.endDate,
    rawCount: filtered.length,
    downsampledTo: downsampled.length < filtered.length ? downsampled.length : undefined,
    points: downsampled,
    pagesFetched: pages,
    notes: notes.length ? notes : undefined,
  };
}

// ── 분봉 (FHKST03010230, 1분봉 base) ─────────────────────────────
async function fetchMinuteChart(
  client: KisClient,
  symbol: string,
  range: { startDate: string; endDate: string },
  cap: number,
  intervalMinutes: IntervalMinutes,
): Promise<ChartResult> {
  if (!VALID_INTERVALS.includes(intervalMinutes)) {
    throw new Error(
      `intervalMinutes는 ${VALID_INTERVALS.join("/")} 중 하나여야 합니다: ${intervalMinutes}`,
    );
  }

  const days = dateRangeDays(range.startDate, range.endDate);
  if (days < 1 || days > MAX_MINUTE_RANGE_DAYS) {
    throw new Error(
      `분봉은 최대 ${MAX_MINUTE_RANGE_DAYS} 영업일까지만 조회 가능합니다 (요청 범위: ${days}일). ` +
        `더 긴 기간이 필요하면 period=day를 사용하세요.`,
    );
  }

  const startDateMs = parseYmd(range.startDate).getTime();
  let cursorDate = range.endDate;
  let cursorHour = "153000"; // 정규장 마감 (역순 fetch 시작점)
  let pages = 0;
  const minuteByKey = new Map<string, ChartPoint>();
  const notes: string[] = [];

  while (pages < MAX_MINUTE_PAGES) {
    pages++;
    const res = await client.get<KisStockMinuteChartItem[]>({
      path: KIS.stockMinuteChart.path,
      trId: KIS.stockMinuteChart.trIdReal,
      query: {
        fid_cond_mrkt_div_code: "J",
        fid_input_iscd: symbol,
        fid_input_date_1: cursorDate,
        fid_input_hour_1: cursorHour,
        fid_pw_data_incu_yn: "Y",
        fid_fake_tick_incu_yn: "",
      },
    });

    const items = extractMinuteItems(res);
    if (items.length === 0) break;

    let oldestKey: { ymd: string; hms: string } | null = null;
    let added = 0;
    for (const item of items) {
      const point = minuteItemToPoint(item);
      if (!point) continue;
      const key = `${item.stck_bsop_date}_${item.stck_cntg_hour}`;
      if (minuteByKey.has(key)) continue;
      minuteByKey.set(key, point);
      added++;
      if (
        !oldestKey ||
        item.stck_bsop_date < oldestKey.ymd ||
        (item.stck_bsop_date === oldestKey.ymd && item.stck_cntg_hour < oldestKey.hms)
      ) {
        oldestKey = { ymd: item.stck_bsop_date, hms: item.stck_cntg_hour };
      }
    }

    if (!oldestKey) break;
    if (parseYmd(oldestKey.ymd).getTime() < startDateMs) break;
    if (added === 0) break; // 무한 루프 방지: 새 데이터 없음

    // 다음 페이지 커서: 가장 오래된 시각의 1분 전
    const nextCursor = stepBackOneMinute(oldestKey.ymd, oldestKey.hms);
    if (nextCursor.ymd === cursorDate && nextCursor.hms >= cursorHour) break;
    cursorDate = nextCursor.ymd;
    cursorHour = nextCursor.hms;

    if (parseYmd(cursorDate).getTime() < startDateMs) break;
  }

  if (pages >= MAX_MINUTE_PAGES) {
    notes.push(
      `페이지네이션 상한(${MAX_MINUTE_PAGES}회)에 도달했습니다. 더 긴 범위가 필요하면 endDate를 줄이거나 intervalMinutes를 키워 호출 횟수를 줄이세요.`,
    );
  }

  // 1분봉 raw → 시작일 이후 + 정렬
  const oneMin = Array.from(minuteByKey.values())
    .filter((p) => p.date.slice(0, 10).replace(/-/g, "") >= range.startDate)
    .sort((a, b) => a.date.localeCompare(b.date));

  // intervalMinutes로 집계 (>1일 때만)
  const aggregated = intervalMinutes > 1 ? aggregateMinutes(oneMin, intervalMinutes) : oneMin;

  const downsampled = downsample(aggregated, cap);

  return {
    symbol,
    period: "minute",
    intervalMinutes,
    startDate: range.startDate,
    endDate: range.endDate,
    rawCount: aggregated.length,
    downsampledTo: downsampled.length < aggregated.length ? downsampled.length : undefined,
    points: downsampled,
    pagesFetched: pages,
    notes: notes.length ? notes : undefined,
  };
}

/**
 * 1분봉 → N분봉 집계.
 * 같은 분 단위 버킷(연속 N개 1분봉)으로 그룹화.
 * - open: 버킷 첫 봉 open
 * - close: 버킷 마지막 봉 close
 * - high: 버킷 내 max high
 * - low: 버킷 내 min low
 * - volume: 버킷 내 sum
 * 버킷 라벨(date)은 버킷 첫 봉 시각.
 *
 * 시간 경계는 일별로 리셋 (장 마감 ~ 다음날 장 시작 사이는 버킷 끊김).
 */
function aggregateMinutes(points: ChartPoint[], interval: IntervalMinutes): ChartPoint[] {
  if (interval === 1) return points;
  if (points.length === 0) return [];
  const result: ChartPoint[] = [];
  let bucketStart: ChartPoint | null = null;
  let bucketDate = ""; // YYYY-MM-DD
  let bucketBin = -1;

  for (const p of points) {
    const ymd = p.date.slice(0, 10);
    const hh = Number(p.date.slice(11, 13));
    const mm = Number(p.date.slice(14, 16));
    const minutes = hh * 60 + mm;
    const bin = Math.floor(minutes / interval);

    if (bucketStart === null || ymd !== bucketDate || bin !== bucketBin) {
      if (bucketStart !== null) result.push(bucketStart);
      bucketStart = { ...p };
      bucketDate = ymd;
      bucketBin = bin;
    } else {
      bucketStart.high = Math.max(bucketStart.high, p.high);
      bucketStart.low = Math.min(bucketStart.low, p.low);
      bucketStart.close = p.close;
      bucketStart.volume += p.volume;
    }
  }
  if (bucketStart !== null) result.push(bucketStart);
  return result;
}

function stepBackOneMinute(ymd: string, hms: string): { ymd: string; hms: string } {
  const hh = Number(hms.slice(0, 2));
  const mm = Number(hms.slice(2, 4));
  const ss = Number(hms.slice(4, 6));
  let totalMin = hh * 60 + mm - 1;
  if (totalMin < 0) {
    // 전날 정규장 마감으로 점프
    const prev = new Date(parseYmd(ymd).getTime() - 86_400_000);
    return { ymd: formatYmd(prev), hms: "153000" };
  }
  const newHh = Math.floor(totalMin / 60);
  const newMm = totalMin % 60;
  return {
    ymd,
    hms:
      newHh.toString().padStart(2, "0") +
      newMm.toString().padStart(2, "0") +
      ss.toString().padStart(2, "0"),
  };
}

function extractDailyItems(res: KisResponse<KisChartItem[] | KisChartItem>): KisChartItem[] {
  const candidates: unknown[] = [res.output, res.output1, res.output2];
  for (const c of candidates) {
    if (Array.isArray(c)) return c as KisChartItem[];
  }
  if (res.output && typeof res.output === "object" && !Array.isArray(res.output)) {
    return [res.output as KisChartItem];
  }
  return [];
}

function extractMinuteItems(res: KisResponse<KisStockMinuteChartItem[]>): KisStockMinuteChartItem[] {
  const candidates: unknown[] = [res.output, res.output1, res.output2];
  for (const c of candidates) {
    if (Array.isArray(c)) return c as KisStockMinuteChartItem[];
  }
  return [];
}

function dailyItemToPoint(item: KisChartItem): ChartPoint | null {
  if (!item.stck_bsop_date) return null;
  const close = parseNum(item.stck_clpr);
  if (!Number.isFinite(close) || close === 0) return null;
  const date = item.stck_bsop_date;
  return {
    date: `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`,
    open: parseNum(item.stck_oprc) || close,
    high: parseNum(item.stck_hgpr) || close,
    low: parseNum(item.stck_lwpr) || close,
    close,
    volume: parseNum(item.acml_vol) || 0,
  };
}

function minuteItemToPoint(item: KisStockMinuteChartItem): ChartPoint | null {
  if (!item.stck_bsop_date || !item.stck_cntg_hour) return null;
  const close = parseNum(item.stck_prpr);
  if (!Number.isFinite(close) || close === 0) return null;
  const d = item.stck_bsop_date;
  const h = item.stck_cntg_hour.padStart(6, "0");
  // 분봉 응답이 정규장 시간 외(VI/단일가)도 포함할 수 있음 — 정규장 시간 필터링
  const hhmm = Number(h.slice(0, 4));
  if (hhmm < MARKET_OPEN_HHMM || hhmm > MARKET_CLOSE_HHMM) {
    // 시간외 단일가는 분봉 분석 일관성을 깨므로 제외
    return null;
  }
  return {
    date: `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)} ${h.slice(0, 2)}:${h.slice(2, 4)}:${h.slice(4, 6)}`,
    open: parseNum(item.stck_oprc) || close,
    high: parseNum(item.stck_hgpr) || close,
    low: parseNum(item.stck_lwpr) || close,
    close,
    volume: parseNum(item.cntg_vol) || 0,
  };
}
