/**
 * Ambient, site-wide snowfall — the winter half of Amit's "motorcycles, AI,
 * code, winter, stocks" identity, carried past the hero and onto every page
 * rather than boxed into one illustration or a hobby card of its own.
 * Deliberately faint: it should read as atmosphere behind the text, not
 * compete with it.
 *
 * Falling snow is the constant; sparkles, a distant double-flash of
 * lightning, and one shooting star are rare, long-cycle extras layered on
 * top — see the matching keyframes in globals.css for why none of them ever
 * lands in visible sync with each other.
 *
 * A server component. Every position comes from a pure function of index
 * rather than Math.random(), so the server-rendered markup and the client's
 * first render are byte-identical — a random field would otherwise mismatch
 * on hydration. `prefers-reduced-motion` hides the whole thing (see
 * .snow-overlay in globals.css); there's no readable "paused snow" state
 * worth keeping around.
 */

interface Flake {
  left: number; // percent across the viewport
  size: number; // px
  opacity: number;
  duration: number; // s
  delay: number; // s
  drift: number; // px of horizontal drift over the fall
}

function makeFlakes(count: number): Flake[] {
  const flakes: Flake[] = [];
  for (let i = 0; i < count; i++) {
    // The golden angle spreads points evenly without them ever repeating a
    // pattern the eye can lock onto, which is what makes this look scattered
    // rather than gridded despite being entirely deterministic.
    const left = (i * 137.508) % 100;
    flakes.push({
      left,
      size: 2 + ((i * 7) % 5) * 0.6,
      opacity: 0.3 + ((i * 3) % 5) * 0.09,
      duration: 14 + ((i * 11) % 10),
      delay: -((i * 2.7) % 20),
      drift: ((i % 5) - 2) * 16,
    });
  }
  return flakes;
}

const FLAKES = makeFlakes(34);

interface Sparkle {
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

// Three, each on its own long cycle (see .snow-sparkle) so they read as
// occasional glints rather than a synchronised twinkle.
const SPARKLES: Sparkle[] = [
  { top: 18, left: 12, size: 8, delay: -4, duration: 22 },
  { top: 62, left: 82, size: 6, delay: -14, duration: 27 },
  { top: 38, left: 46, size: 7, delay: -21, duration: 31 },
];

export function SnowOverlay() {
  return (
    <>
      <div className="snow-overlay" aria-hidden>
        {FLAKES.map((f, i) => (
          <span
            key={i}
            className="snow-flake"
            style={
              {
                left: `${f.left}%`,
                width: `${f.size}px`,
                height: `${f.size}px`,
                animationDuration: `${f.duration}s`,
                animationDelay: `${f.delay}s`,
                '--flake-opacity': f.opacity,
                '--drift': `${f.drift}px`,
              } as React.CSSProperties
            }
          />
        ))}

        {SPARKLES.map((s, i) => (
          <span
            key={i}
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

      {/* Its own fixed layer, separate from .snow-overlay's clipping box —
          a flash should wash the whole viewport, not stop at an edge. */}
      <div className="snow-lightning" aria-hidden />
    </>
  );
}
