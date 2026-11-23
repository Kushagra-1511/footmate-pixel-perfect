import { describe, it, expect } from "vitest";
import { tooFast, tooManyLinks } from "@/lib/spam";

describe("enquiry spam rules", () => {
  it("drops submissions made under 3 seconds after opening", () => {
    expect(tooFast(1000, 3999)).toBe(true);
    expect(tooFast(1000, 4000)).toBe(false);
  });
  it("allows up to 2 links but blocks 3", () => {
    expect(tooManyLinks("see www.a.com and https://b.com")).toBe(false);
    expect(tooManyLinks("http://a.com http://b.com", "www.c.com")).toBe(true);
  });
});
