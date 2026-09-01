/**
 * The living background behind every page: falling snow crystals, drifting
 * code glyphs, twinkling stars, a slow aurora, rare sparkles, an occasional
 * shooting star, and distant lightning.
 *
 * This carries Amit's "motorcycles, AI, code, winter, stocks" identity past
 * the hero and onto every page, rather than boxing it into one illustration.
 *
 * Three rules shape everything here:
 *
 *  1. Night-only layers stay night-only. Stars and an aurora over a bright
 *     page would read as broken, so they are enabled solely under
 *     prefers-color-scheme: dark (see globals.css). Light mode keeps the
 *     snow, code and lightning, which work in daylight.
 *
 *  2. Nothing is random. Every position comes from a pure function of index,
 *     so the server-rendered markup and the client's first render are
 *     byte-identical — Math.random() here would mismatch on hydration.
 *
 *  3. Snow and code get equal visual weight, and are told apart by motion
 *     rather than by volume: snow falls and tumbles, code drifts and fades.
 *
 * Snow is built in three depth bands: near flakes are larger, faster and
 * brighter, far ones small, slow and faint. That parallax is what stops it
 * reading as a screensaver.
 */

import { BOLTS, BOLT_VIEWBOX } from './lightning';

/* ------------------------------------------------------------------ */
/* Snow                                                                */
/* ------------------------------------------------------------------ */

interface Flake {
  left: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
  spin: number;
  blur: number;
}

/**
 * Sizes are much larger than a dot-based field would need: a six-armed
 * crystal has to have some area before the arms resolve at all, and below
 * about 5px it collapses back into a speck. Opacity, not size, is what keeps
 * these from shouting.
 */
const BANDS = [
  { count: 14, size: [5, 7], opacity: [0.16, 0.26], duration: [27, 35], drift: 14, spin: 180, blur: 0.5 },
  { count: 13, size: [8, 11], opacity: [0.26, 0.4], duration: [18, 24], drift: 26, spin: 300, blur: 0 },
  { count: 9, size: [12, 16], opacity: [0.34, 0.5], duration: [12, 16], drift: 42, spin: 420, blur: 0.3 },
] as const;

function makeFlakes(): Flake[] {
  const flakes: Flake[] = [];
  let i = 0;

  for (const band of BANDS) {
    for (let n = 0; n < band.count; n++, i++) {
      // The golden angle spreads points evenly without ever repeating a
      // pattern the eye can lock onto — scattered, but entirely determined.
      const t = ((n * 7) % 5) / 4;
      flakes.push({
        left: (i * 137.508) % 100,
        size: band.size[0] + (band.size[1] - band.size[0]) * t,
        opacity: band.opacity[0] + (band.opacity[1] - band.opacity[0]) * (((n * 3) % 5) / 4),
        duration: band.duration[0] + (band.duration[1] - band.duration[0]) * (((n * 11) % 7) / 6),
        delay: -((i * 2.7) % 24),
        drift: (((n % 5) - 2) / 2) * band.drift,
        // Alternating sign, so the field doesn't all tumble the same way.
        spin: band.spin * (n % 2 === 0 ? 1 : -1),
        blur: band.blur,
      });
    }
  }
  return flakes;
}

const FLAKES = makeFlakes();

/**
 * One arm of a snow crystal, pointing straight up from the centre of a 24x24
 * box: a spine plus two pairs of side branches. The full flake is six of
 * these rotated by 60 degrees, which is the actual six-fold symmetry real
 * crystals have — drawing all six by hand would just be the same numbers
 * copied six times with rounding drift.
 */
const CRYSTAL_ARM =
  'M12 12 L12 2.5 M12 6.2 L9.6 3.4 M12 6.2 L14.4 3.4 M12 8.8 L10.3 6.8 M12 8.8 L13.7 6.8';

const ARM_ROTATIONS = [0, 60, 120, 180, 240, 300];

/* ------------------------------------------------------------------ */
/* Code glyphs                                                         */
/* ------------------------------------------------------------------ */

interface Glyph {
  text: string;
  top: number;
  left: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  tilt: number;
}

/** Short enough to read at a glance and stay out of the way. */
const CODE_TOKENS = ['{ }', '</>', '=>', '( )', '[ ]', '&&', '!==', '::', 'fn', 'const', '??', '||'];

const GLYPHS: Glyph[] = CODE_TOKENS.map((text, i) => ({
  text,
  left: (i * 137.508) % 92,
  top: ((i * 61.803) % 88),
  size: 13 + ((i * 7) % 4) * 4,
  opacity: 0.16 + ((i * 3) % 4) * 0.05,
  duration: 26 + ((i * 11) % 9) * 2.5,
  delay: -((i * 4.3) % 30),
  tilt: ((i % 5) - 2) * 5,
}));

/* ------------------------------------------------------------------ */
/* Stars, sparkles                                                     */
/* ------------------------------------------------------------------ */

const STARS = Array.from({ length: 54 }, (_, i) => ({
  left: (i * 137.508) % 100,
  // Weighted toward the upper half — stars thin out toward the horizon.
  top: ((i * 61.803) % 100) * 0.82,
  size: 1.4 + ((i * 7) % 4) * 0.55,
  duration: 3 + ((i * 11) % 8) * 0.6,
  delay: -((i * 1.9) % 11),
}));

// Each on its own long cycle, so they read as occasional glints rather than
// a synchronised twinkle.
const SPARKLES = [
  { top: 18, left: 12, size: 9, delay: -4, duration: 22 },
  { top: 62, left: 82, size: 7, delay: -14, duration: 27 },
  { top: 38, left: 46, size: 8, delay: -21, duration: 31 },
];

export function AmbientBackdrop() {
  return (
    <>
      {/* The crystal geometry, defined once and referenced by every flake.
          A hidden zero-size SVG, so it contributes nothing to layout. */}
      <svg width="0" height="0" aria-hidden className="absolute">
        <defs>
          <symbol id="snow-crystal" viewBox="0 0 24 24">
            <g
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            >
              {ARM_ROTATIONS.map((deg) => (
                <path key={deg} d={CRYSTAL_ARM} transform={`rotate(${deg} 12 12)`} />
              ))}
            </g>
          </symbol>
        </defs>
      </svg>

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

        {GLYPHS.map((g, i) => (
          <span
            key={`glyph-${i}`}
            className="code-glyph"
            style={
              {
                top: `${g.top}%`,
                left: `${g.left}%`,
                fontSize: `${g.size}px`,
                animationDuration: `${g.duration}s`,
                animationDelay: `${g.delay}s`,
                '--glyph-opacity': g.opacity,
                '--tilt': `${g.tilt}deg`,
              } as React.CSSProperties
            }
          >
            {g.text}
          </span>
        ))}

        {FLAKES.map((f, i) => (
          <svg
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
                '--spin': `${f.spin}deg`,
              } as React.CSSProperties
            }
          >
            <use href="#snow-crystal" />
          </svg>
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

      {/*
        Lightning lives outside .backdrop's clipping box — both the bolt and
        the flash it throws should reach the whole viewport, not stop at an
        edge. Each bolt is paired with a flash on the SAME duration and
        delay, which is what makes the sky light up at the instant the bolt
        appears instead of on some unrelated schedule.
      */}
      {BOLTS.map((b, i) => (
        <div
          key={`flash-${i}`}
          className="bolt-flash"
          aria-hidden
          style={{ animationDuration: `${b.duration}s`, animationDelay: `${b.delay}s` }}
        />
      ))}

      <svg
        className="backdrop-bolts"
        viewBox={`0 0 ${BOLT_VIEWBOX.w} ${BOLT_VIEWBOX.h}`}
        preserveAspectRatio="xMidYMin slice"
        aria-hidden
      >
        {BOLTS.map((b, i) => (
          <g
            key={`bolt-${i}`}
            className="bolt"
            style={{ animationDuration: `${b.duration}s`, animationDelay: `${b.delay}s` }}
          >
            <path d={b.main} strokeWidth="0.9" />
            <path d={b.branch} strokeWidth="0.5" strokeOpacity="0.75" />
          </g>
        ))}
      </svg>
    </>
  );
}
