import { describe, expect, it } from "vitest";
import {
  businessDaysBetweenInclusive,
  currentBusinessYmdKst,
  nextBusinessDayYmd,
  previousBusinessDayYmd,
  shiftBusinessMonthsYmd,
  subtractBusinessDaysYmd,
  ytdBusinessStartYmd,
} from "../src/utils/businessDay.js";

describe("business-day utilities", () => {
  it("moves weekend boundaries to adjacent weekdays", () => {
    expect(previousBusinessDayYmd("20260517")).toBe("20260515");
    expect(nextBusinessDayYmd("20260516")).toBe("20260518");
  });

  it("subtracts business days across a weekend", () => {
    expect(subtractBusinessDaysYmd("20260518", 1)).toBe("20260515");
    expect(subtractBusinessDaysYmd("20260518", 5)).toBe("20260511");
  });

  it("counts business days inclusively", () => {
    expect(businessDaysBetweenInclusive("20260515", "20260518")).toBe(2);
  });

  it("adjusts month and YTD boundaries to business days", () => {
    expect(shiftBusinessMonthsYmd("20260531", -1)).toBe("20260430");
    expect(ytdBusinessStartYmd("20260110")).toBe("20260101");
  });

  it("uses KST date before applying business-day adjustment", () => {
    expect(currentBusinessYmdKst(new Date("2026-05-17T15:30:00.000Z"))).toBe("20260518");
  });
});
