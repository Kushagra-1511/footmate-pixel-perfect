import { describe, expect, it } from "vitest";
import { agents, agentsForState, NEAREST_AGENT_CATEGORY } from "@/data/agents";
import { contactCategories } from "@/data/site";

describe("nearest agent", () => {
  it("is offered as a contact enquiry type", () => {
    expect(contactCategories).toContain(NEAREST_AGENT_CATEGORY);
  });
  it("has no agent details until real ones are supplied", () => {
    expect(agents).toHaveLength(0);
    expect(agentsForState("VIC")).toEqual([]);
  });
});
