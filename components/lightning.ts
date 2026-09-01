/**
 * Lightning bolt geometry for the ambient backdrop.
 *
 * A bolt is a jagged polyline that steps downward with a sideways stagger at
 * every step, plus one shorter fork branching off a mid-point — which is
 * roughly what a real strike looks like, and nothing like the soft gradient
 * wash this replaced.
 *
 * The randomness is seeded, not `Math.random()`. Every bolt has to be
 * byte-identical on the server and on the client's first render or React
 * throws a hydration mismatch, so the shapes are generated once at module
 * scope from fixed seeds. They look arbitrary; they are entirely repeatable.
 */

/** mulberry32 — small, fast, and good enough for scattering line segments. */
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface Bolt {
  /** Main channel, top of frame downward. */
  main: string;
  /** A single fork off the main channel. */
  branch: string;
  /** Seconds. Long, and no two share a factor, so strikes never pair up. */
  duration: number;
  delay: number;
}

/** Coordinate space of the bolt overlay. Wider than tall so bolts stay slim. */
export const BOLT_VIEWBOX = { w: 200, h: 100 };

function buildBolt(seed: number): Pick<Bolt, 'main' | 'branch'> {
  const rnd = mulberry32(seed);
  const fmt = (pts: number[][]) =>
    `M${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L')}`;

  // Main channel: step down, stagger sideways, stop partway down the frame.
  let x = 20 + rnd() * 160;
  let y = 0;
  const stopAt = 34 + rnd() * 26;
  const pts: number[][] = [[x, y]];
  while (y < stopAt) {
    y += 3 + rnd() * 6;
    x += (rnd() - 0.5) * 11;
    pts.push([x, y]);
  }

  // One fork, off a point in the upper-middle of the channel.
  const from = 2 + Math.floor(rnd() * Math.max(1, pts.length - 4));
  let [bx, by] = pts[from];
  const away = rnd() < 0.5 ? -1 : 1;
  const bpts: number[][] = [[bx, by]];
  const steps = 2 + Math.floor(rnd() * 3);
  for (let i = 0; i < steps; i++) {
    by += 2.5 + rnd() * 5;
    bx += away * (2 + rnd() * 5);
    bpts.push([bx, by]);
  }

  return { main: fmt(pts), branch: fmt(bpts) };
}

/**
 * Three bolts on long, mutually non-matching cycles. Each is invisible for
 * well over 90% of its period, so strikes stay rare and never sync up.
 */
export const BOLTS: Bolt[] = [
  { ...buildBolt(20260825), duration: 37, delay: -4 },
  { ...buildBolt(77123), duration: 53, delay: -29 },
  { ...buildBolt(415009), duration: 71, delay: -52 },
];
