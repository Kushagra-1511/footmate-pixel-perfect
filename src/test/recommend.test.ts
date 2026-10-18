import { describe, expect, it } from "vitest";
import { recommend } from "@/lib/recommend";
import { products, getProduct } from "@/data/products";

describe("product data", () => {
  it("has the four supplied products with exact thickness and classification", () => {
    expect(products.map((p) => [p.slug, p.thicknessMm, p.densityCategory])).toEqual([
      ["spring", 11, "HD+"],
      ["bounce", 9, "HD+"],
      ["pulse", 11, "UHD"],
      ["bloom", 9, "UHD"],
    ]);
  });
  it("does not fabricate ratings", () => {
    expect(products.every((p) => p.comfortRating === null)).toBe(true);
  });
});

describe("Find Your FOOTMATE", () => {
  it("recommends Bounce when stairs are involved", () => {
    const r = recommend({ room: "stairs", priority: "balanced", stairs: "yes", sound: "no", thickness: "none" });
    expect(r.primary?.slug).toBe("bounce");
  });
  it("recommends Pulse for comfort + durability at 11 mm", () => {
    const r = recommend({ room: "bedroom", priority: "durability", stairs: "no", sound: "no", thickness: "11" });
    expect(r.primary).toEqual(getProduct("pulse"));
  });
  it("returns a shortlist, not a pick, when answers are not decisive", () => {
    const r = recommend({ room: "living", priority: "balanced", stairs: "no", sound: "unsure", thickness: "none" });
    expect(r.confident).toBe(false);
    expect(r.shortlist).toHaveLength(4);
  });
});
