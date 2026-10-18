/**
 * Find Your FOOTMATE — transparent, editable recommendation rules.
 * Uses only supplied product facts (thickness, density classification,
 * verified staircase suitability). No invented performance scores.
 */
import { products, type Product } from "@/data/products";

export type Room = "bedroom" | "living" | "hallway" | "stairs" | "other";
export type Priority = "comfort" | "durability" | "balanced";
export type YesNo = "yes" | "no" | "unsure";
export type ThicknessPref = "9" | "11" | "none";

export interface FinderAnswers {
  room: Room;
  priority: Priority;
  stairs: YesNo;
  sound: YesNo;
  thickness: ThicknessPref;
}

export interface FinderResult {
  confident: boolean;
  primary: Product | null;
  shortlist: Product[];
  reasons: string[];
}

export function recommend(a: FinderAnswers, list: Product[] = products): FinderResult {
  const reasons: string[] = [];
  let pool = [...list];

  // Rule 1: stairs → only products with verified staircase suitability.
  if (a.stairs === "yes" || a.room === "stairs") {
    const stairSafe = pool.filter((p) => p.staircaseSuitability === true);
    if (stairSafe.length) {
      pool = stairSafe;
      reasons.push("Stairs are involved, so we've shown products with confirmed staircase suitability.");
    }
  }

  // Rule 2: thickness preference filters directly.
  if (a.thickness !== "none") {
    const t = Number(a.thickness);
    const byT = pool.filter((p) => p.thicknessMm === t);
    if (byT.length) {
      pool = byT;
      reasons.push(`You prefer a ${t} mm profile.`);
    }
  }

  // Rule 3: priority maps to density classification (UHD sits above HD+ in the range).
  if (a.priority === "durability") {
    const uhd = pool.filter((p) => p.densityCategory === "UHD");
    if (uhd.length) {
      pool = uhd;
      reasons.push("Durability is your priority, so we've favoured the UHD classification.");
    }
  } else if (a.priority === "comfort") {
    const thick = pool.filter((p) => p.thicknessMm === 11);
    if (thick.length && a.thickness === "none") {
      pool = thick;
      reasons.push("Comfort is your priority, so we've favoured the thicker 11 mm profile.");
    }
  }

  // Sound: no verified acoustic data — never used to rank.
  if (a.sound === "yes") {
    reasons.push("Acoustic test data isn't published yet, so sound reduction wasn't used to rank products — ask our team.");
  }

  const confident = pool.length === 1;
  return { confident, primary: confident ? (pool[0] ?? null) : null, shortlist: pool, reasons };
}
