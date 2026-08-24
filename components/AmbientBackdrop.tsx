/**
 * The living background behind every page: falling snow, twinkling stars, a
 * slow aurora, rare sparkles, an occasional shooting star, and distant
 * lightning.
 *
 * This is the winter half of Amit's "motorcycles, AI, code, winter, stocks"
 * identity, carried past the hero and onto every page rather than boxed into
 * one illustration or a hobby card of its own.
 *
 * Two rules shape everything here:
 *
 *  1. Night-only layers stay night-only. Stars and an aurora over a bright
 *     page would read as broken, so they are enabled solely under
 *     prefers-color-scheme: dark (see globals.css). Light mode keeps the
 *     snow and the lightning, which work in daylight.
 *
 *  2. Nothing is random. Every position comes from a pure function of index,
 *     so the server-rendered markup and the client's first render are
 *     byte-identical — Math.random() here would mismatch on hydration.
 *
 * Snow is built in three depth bands rather than one flat field: near flakes
 * are larger, faster and brighter, far ones small, slow and faint. That
 * parallax is what stops it looking like a screensaver.
 */

interface Flake {
  left: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
  blur: number;
}

const BANDS = [
  { count: 16, size: [1.6, 2.4], opacity: [0.18, 0.3], duration: [26, 34], drift: 14, blur: 0.6 },
  { count: 16, size: [2.6, 3.6], opacity: [0.3, 0.45], duration: [17, 23], drift: 26, blur: 0 },
  { count: 10, size: [4, 5.6], opacity: [0.42, 0.6], duration: [11, 15], drift: 42, blur: 0.4 },
] as const;

function makeFlakes(): Flake[] {
  const flakes: Flake[] = [];
  let i = 0;

  for (const band of BANDS) {
    for (let n = 0; n < band.count; n++, i++) {
      // The golden angle spreads points evenly without ever repeating a
      // pattern the eye can lock onto — scattered, but entirely determined.
      const t = (n * 7) % 5 / 4;
      flakes.push({
        left: (i * 137.508) % 100,
        size: band.size[0] + (band.size[1] - band.size[0]) * t,
        opacity: band.opacity[0] + (band.opacity[1] - band.opacity[0]) * (((n * 3) % 5) / 4),
        duration: band.duration[0] + (band.duration[1] - band.duration[0]) * (((n * 11) % 7) / 6),
        delay: -((i * 2.7) % 24),
        drift: (((n % 5) - 2) / 2) * band.drift,
        blur: band.blur,
      });
    }
  }
  return flakes;
}

const FLAKES = makeFlakes();

interface Star {
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

const STARS: Star[] = Array.from({ length: 54 }, (_, i) => ({
  left: (i * 137.508) % 100,
  // Weighted toward the upper half — stars thin out toward the horizon.
  top: ((i * 61.803) % 100) * 0.82,
  size: 1.4 + ((i * 7) % 4) * 0.55,
  duration: 3 + ((i * 11) % 8) * 0.6,
  delay: -((i * 1.9) % 11),
}));

interface Sparkle {
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

// Each on its own long cycle, so they read as occasional glints rather than
// a synchronised twinkle.
const SPARKLES: Sparkle[] = [
  { top: 18, left: 12, size: 9, delay: -4, duration: 22 },
  { top: 62, left: 82, size: 7, delay: -14, duration: 27 },
  { top: 38, left: 46, size: 8, delay: -21, duration: 31 },
];

export function AmbientBackdrop() {
  return (
    <>
      <div className="backdrop" aria-hidden>
        {/* Aurora — two slow, broad bands. Dark mode only. */}
        <div className="aurora">
          <span className="aurora-band aurora-band-a" />
          <span className="aurora-band aurora-band-b" />
        </div>

        {STARS.map((s, i) => (
          <span
            key={`star-${i}`}
            className="backdrop-star"
            style={
              {
                top: `${s.top}%`,
                left: `${s.left}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                animationDuration: `${s.duration}s`,
                animationDelay: `${s.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}

        {FLAKES.map((f, i) => (
          <span
            key={`flake-${i}`}
            className="snow-flake"
            style={
              {
                left: `${f.left}%`,
                width: `${f.size}px`,
                height: `${f.size}px`,
                animationDuration: `${f.duration}s`,
                animationDelay: `${f.delay}s`,
                filter: f.blur ? `blur(${f.blur}px)` : undefined,
                '--flake-opacity': f.opacity,
                '--drift': `${f.drift}px`,
              } as React.CSSProperties
            }
          />
        ))}

        {SPARKLES.map((s, i) => (
          <span
            key={`sparkle-${i}`}
            className="snow-sparkle"
            style={
              {
                top: `${s.top}%`,
                left: `${s.left}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                animationDuration: `${s.duration}s`,
                animationDelay: `${s.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}

        <span className="snow-shooting-star" style={{ animationDelay: '-9s' }} />
      </div>

      {/* Its own fixed layer, outside .backdrop's clipping box — a flash
          should wash the whole viewport, not stop at an edge. */}
      <div className="backdrop-lightning" aria-hidden />
    </>
  );
}
