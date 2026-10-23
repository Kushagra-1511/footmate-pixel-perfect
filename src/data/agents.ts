/**
 * FOOTMATE representatives, matched by state. Intentionally empty until
 * Sarva Australia supplies verified agent details — never add placeholders.
 */
export type Agent = { name: string; region: string; states: string[]; phone: string | null; email: string | null };

export const NEAREST_AGENT_CATEGORY = "Contact My Nearest Agent";

export const agents: Agent[] = [];

export function agentsForState(state: string): Agent[] {
  return state ? agents.filter((a) => a.states.includes(state)) : [];
}
