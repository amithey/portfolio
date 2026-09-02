/**
 * One accent hue per project. The cover art, the window chrome and the hover
 * glow all read from here, so a tile is colour-identifiable before you read it.
 * Hues are spread around the wheel deliberately — no two neighbours collide.
 */
export const PROJECT_HUE: Record<string, number> = {
  'bot-trade': 158,
  'bag-store': 330,
  dominion: 32,
  'capital-gains-tax-report-generator': 200,
  'pong-game': 88,
  'train-game': 8,
};

/** Same idea, keyed by the interest label instead of a project slug. */
export const INTEREST_HUE: Record<string, number> = {
  Motorcycles: 14,
  AI: 210,
  Code: 152,
  Stocks: 42,
};

function fallbackHue(key: string): number {
  // Deterministic, so anything added later still gets a stable colour.
  let h = 0;
  for (const ch of key) h = (h * 31 + ch.charCodeAt(0)) % 360;
  return h;
}

export function hueFor(slug: string): number {
  return slug in PROJECT_HUE ? PROJECT_HUE[slug] : fallbackHue(slug);
}

export function hueForInterest(label: string): number {
  return label in INTEREST_HUE ? INTEREST_HUE[label] : fallbackHue(label);
}
