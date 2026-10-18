import { describe, expect, it } from "vitest";
import { recommend } from "@/lib/recommend";
import { products, getProduct } from "@/data/products";
import { company } from "@/data/site";
import { RATING_MAX } from "@/data/products";

describe("product data", () => {
  it("has the four supplied products with exact thickness and classification", () => {
    expect(products.map((p) => [p.name, p.thicknessMm, p.densityCategory])).toEqual([
      ["Comfort", 11, "HD+"],
      ["Cosy", 9, "HD+"],
      ["Plush", 11, "UHD"],
      ["Serenity", 9, "UHD"],
    ]);
  });
  it("uses the six-star scale printed in the final booklet", () => {
    expect(RATING_MAX).toBe(6);
  });
  it.each([
    ["spring", 4, 5, 5], ["bounce", 4, 4, 4], ["pulse", 5, 5, 6], ["bloom", 5, 5, 5],
  ])("uses the printed durability, comfort and bounce ratings for %s", (slug, durability, comfort, bounce) => {
    const p = getProduct(String(slug));
    expect([p?.durabilityRating, p?.comfortRating, p?.bounceRating]).toEqual([durability, comfort, bounce]);
  });
  it("keeps unprovided measured specifications unavailable", () => {
    expect(products.map(p => p.technicalSpecifications.find(s => s.label === "Acoustic performance")?.value)).toEqual([null, null, null, null]);
  });
  it("uses the printed contact details", () => {
    expect([company.phone, company.email, company.address, company.website]).toEqual([
      "+61 419 802 853", "paulv@sarvafoam.com.au", "9 Cameron Street, Richmond VIC 3121", "https://www.sarvafoam.com.au",
    ]);
  });
});

describe("Find Your FOOTMATE", () => {
  it("shortlists both booklet-approved staircase products", () => {
    const r = recommend({ room: "stairs", priority: "balanced", stairs: "yes", sound: "no", thickness: "none" });
    expect(r.shortlist.map(p => p.name)).toEqual(["Cosy", "Serenity"]);
    expect(r.primary).toBeNull();
  });
  it("recommends Serenity for stairs with durability priority", () => {
    expect(recommend({ room: "stairs", priority: "durability", stairs: "yes", sound: "no", thickness: "none" }).primary?.name).toBe("Serenity");
  });
  it("recommends Plush for comfort + durability at 11 mm", () => {
    const r = recommend({ room: "bedroom", priority: "durability", stairs: "no", sound: "no", thickness: "11" });
    expect(r.primary).toEqual(getProduct("pulse"));
  });
  it("returns a shortlist, not a pick, when answers are not decisive", () => {
    const r = recommend({ room: "living", priority: "balanced", stairs: "no", sound: "unsure", thickness: "none" });
    expect(r.confident).toBe(false);
    expect(r.shortlist).toHaveLength(4);
  });
});
