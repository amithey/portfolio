/**
 * Fixed coordinates for the hero scene.
 *
 * Written out rather than randomised so the layout is identical on the server
 * and the client — a random sky would hydrate into a different sky — and so the
 * constellation can be composed by eye instead of left to chance.
 */

export const NEURONS: { x: number; y: number; r: number }[] = [
  { x: 78, y: 62, r: 2.6 },
  { x: 156, y: 108, r: 1.9 },
  { x: 214, y: 48, r: 2.2 },
  { x: 292, y: 96, r: 3 },
  { x: 356, y: 42, r: 1.8 },
  { x: 430, y: 104, r: 2.4 },
  { x: 498, y: 56, r: 2.1 },
  { x: 566, y: 118, r: 2.8 },
  { x: 628, y: 52, r: 1.9 },
  { x: 704, y: 100, r: 2.5 },
  { x: 748, y: 44, r: 2 },
  { x: 120, y: 158, r: 1.7 },
  { x: 340, y: 150, r: 2.2 },
  { x: 610, y: 162, r: 1.8 },
];

/** Index pairs into NEURONS. Kept sparse so the sky reads as a net, not a mesh. */
export const SYNAPSES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10],
  [0, 11], [1, 11], [3, 12], [5, 12], [7, 13], [9, 13], [11, 12], [12, 13],
  [2, 5], [6, 9],
];

export const SNOWFLAKES: { x: number; r: number; delay: number; dur: number }[] = [
  { x: 24, r: 1.6, delay: 0, dur: 11 },
  { x: 88, r: 1.1, delay: 2.4, dur: 14 },
  { x: 143, r: 2, delay: 5.1, dur: 9.5 },
  { x: 196, r: 1.3, delay: 1.2, dur: 13 },
  { x: 252, r: 1.7, delay: 6.8, dur: 10.5 },
  { x: 311, r: 1, delay: 3.6, dur: 15 },
  { x: 368, r: 1.9, delay: 8.2, dur: 12 },
  { x: 422, r: 1.4, delay: 0.9, dur: 10 },
  { x: 480, r: 1.7, delay: 4.7, dur: 13.5 },
  { x: 534, r: 1.1, delay: 7.5, dur: 11.5 },
  { x: 592, r: 2.1, delay: 2.1, dur: 9 },
  { x: 648, r: 1.3, delay: 5.9, dur: 14.5 },
  { x: 702, r: 1.6, delay: 3.1, dur: 12.5 },
  { x: 757, r: 1.2, delay: 7.9, dur: 10.8 },
];
