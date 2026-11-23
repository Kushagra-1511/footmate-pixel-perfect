/** Spam rules for the enquiry form. Pure so they can be unit tested. */
export const MIN_FILL_MS = 3000;
export const MAX_LINKS = 2;

/** True when the form was submitted faster than a person could fill it in. */
export function tooFast(startedAt: number | undefined, now: number): boolean {
  if (!startedAt) return false;
  return now - startedAt < MIN_FILL_MS;
}

export function countLinks(text: string): number {
  return (text.match(/(https?:\/\/|www\.)/gi) ?? []).length;
}

export function tooManyLinks(...texts: (string | undefined)[]): boolean {
  return texts.reduce((n, t) => n + countLinks(t ?? ""), 0) > MAX_LINKS;
}
