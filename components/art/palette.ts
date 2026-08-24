/**
 * One accent hue per project. The cover art, the window chrome and the hover
 * glow all read from here, so a tile is colour-identifiable before you read it.
 * Hues are spread around the wheel deliberately — no two neighbours collide.
 */
export const PROJECT_HUE: Record<string, number> = {
  'web-games': 265,
  'bot-trade': 158,
  'bag-store': 330,
  dominion: 32,
  'capital-gains-tax-report-generator': 200,
  'pong-game': 88,
  'train-game': 8,
};

export function hueFor(slug: string): number {
  if (slug in PROJECT_HUE) return PROJECT_HUE[slug];
  // Deterministic fallback so a project added to the data file still gets art.
  let h = 0;
  for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) % 360;
  return h;
}
