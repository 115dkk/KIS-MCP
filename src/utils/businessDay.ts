const KST_OFFSET_MS = 9 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

export function parseYmd(ymd: string): Date {
  if (!/^\d{8}$/.test(ymd)) {
    throw new Error(`Date must be YYYYMMDD: ${ymd}`);
  }
  const year = Number(ymd.slice(0, 4));
  const month = Number(ymd.slice(4, 6));
  const day = Number(ymd.slice(6, 8));
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    throw new Error(`Invalid date: ${ymd}`);
  }
  return date;
}

export function formatYmd(date: Date): string {
  const year = date.getUTCFullYear().toString().padStart(4, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  return `${year}${month}${day}`;
}

export function formatYmdKst(now = new Date()): string {
  return formatYmd(new Date(now.getTime() + KST_OFFSET_MS));
}

export function isBusinessDayYmd(ymd: string): boolean {
  const day = parseYmd(ymd).getUTCDay();
  return day !== 0 && day !== 6;
}

export function previousBusinessDayYmd(ymd: string, includeSelf = true): string {
  let date = parseYmd(ymd);
  if (!includeSelf) date = new Date(date.getTime() - DAY_MS);
  while (date.getUTCDay() === 0 || date.getUTCDay() === 6) {
    date = new Date(date.getTime() - DAY_MS);
  }
  return formatYmd(date);
}

export function nextBusinessDayYmd(ymd: string, includeSelf = true): string {
  let date = parseYmd(ymd);
  if (!includeSelf) date = new Date(date.getTime() + DAY_MS);
  while (date.getUTCDay() === 0 || date.getUTCDay() === 6) {
    date = new Date(date.getTime() + DAY_MS);
  }
  return formatYmd(date);
}

export function currentBusinessYmdKst(now = new Date()): string {
  return previousBusinessDayYmd(formatYmdKst(now), true);
}

export function addBusinessDaysYmd(ymd: string, count: number): string {
  if (count < 0) return subtractBusinessDaysYmd(ymd, -count);
  let date = parseYmd(previousBusinessDayYmd(ymd, true));
  let remaining = count;
  while (remaining > 0) {
    date = new Date(date.getTime() + DAY_MS);
    if (date.getUTCDay() !== 0 && date.getUTCDay() !== 6) remaining--;
  }
  return formatYmd(date);
}

export function subtractBusinessDaysYmd(ymd: string, count: number): string {
  if (count < 0) return addBusinessDaysYmd(ymd, -count);
  let date = parseYmd(previousBusinessDayYmd(ymd, true));
  let remaining = count;
  while (remaining > 0) {
    date = new Date(date.getTime() - DAY_MS);
    if (date.getUTCDay() !== 0 && date.getUTCDay() !== 6) remaining--;
  }
  return formatYmd(date);
}

export function shiftBusinessMonthsYmd(ymd: string, months: number): string {
  const source = parseYmd(ymd);
  const shifted = new Date(source);
  const originalDay = source.getUTCDate();
  shifted.setUTCMonth(shifted.getUTCMonth() + months);
  if (shifted.getUTCDate() !== originalDay) {
    shifted.setUTCDate(0);
  }
  return months >= 0
    ? nextBusinessDayYmd(formatYmd(shifted), true)
    : previousBusinessDayYmd(formatYmd(shifted), true);
}

export function shiftBusinessYearsYmd(ymd: string, years: number): string {
  const source = parseYmd(ymd);
  const shifted = new Date(source);
  const originalMonth = source.getUTCMonth();
  shifted.setUTCFullYear(shifted.getUTCFullYear() + years);
  if (shifted.getUTCMonth() !== originalMonth) {
    shifted.setUTCDate(0);
  }
  return years >= 0
    ? nextBusinessDayYmd(formatYmd(shifted), true)
    : previousBusinessDayYmd(formatYmd(shifted), true);
}

export function ytdBusinessStartYmd(endYmd: string): string {
  const year = parseYmd(endYmd).getUTCFullYear();
  return nextBusinessDayYmd(`${year}0101`, true);
}

export function businessDaysBetweenInclusive(startYmd: string, endYmd: string): number {
  let date = parseYmd(startYmd);
  const end = parseYmd(endYmd).getTime();
  if (date.getTime() > end) return 0;
  let count = 0;
  while (date.getTime() <= end) {
    const day = date.getUTCDay();
    if (day !== 0 && day !== 6) count++;
    date = new Date(date.getTime() + DAY_MS);
  }
  return count;
}

export function normalizeBusinessRange(
  startYmd: string,
  endYmd: string,
): { startDate: string; endDate: string } {
  const startDate = nextBusinessDayYmd(startYmd, true);
  const endDate = previousBusinessDayYmd(endYmd, true);
  if (startDate > endDate) {
    throw new Error(`Business-day range is empty: ${startYmd}~${endYmd}`);
  }
  return { startDate, endDate };
}

