import { describe, it, expect } from "vitest";
import { enquiryStats, dailySeries } from "@/lib/enquiry-stats";

const now = Date.parse("2026-11-23T12:00:00Z");
const r = (daysAgo: number, extra: Partial<{ enquiry_type: string; status: string; products: string[]; sample_requested: boolean }> = {}) => ({
  created_at: new Date(now - daysAgo * 86_400_000).toISOString(), enquiry_type: "contact", status: "new", products: [], sample_requested: false, ...extra,
});

describe("enquiry dashboard numbers", () => {
  it("counts last 30 days and growth against the 30 before", () => {
    const s = enquiryStats([r(1), r(5), r(40)], now);
    expect(s.last30).toBe(2);
    expect(s.growth).toBe(100);
  });
  it("counts sample requests from type or checkbox", () => {
    expect(enquiryStats([r(1, { enquiry_type: "sample" }), r(1, { sample_requested: true }), r(1)], now).samples).toBe(2);
  });
  it("builds one point per day", () => {
    const d = dailySeries([r(0), r(0), r(2)], 7, now);
    expect(d).toHaveLength(7);
    expect(d[6]!.count).toBe(2);
    expect(d[4]!.count).toBe(1);
  });
});
