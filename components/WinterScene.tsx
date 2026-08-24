import { SNOWFLAKES, NEURONS, SYNAPSES, CLOUDS_FAR, CLOUDS_NEAR } from './scene-data';

/**
 * The hero scene: a rider crossing a winter landscape at dusk, under a sky
 * wired like a neural net and drifting with real clouds.
 *
 * Every motif here is something Amit named — motorcycles, AI, code, winter —
 * so this is a portrait rather than decoration. It is a server component: all
 * motion is CSS, which keeps it out of the JS bundle and lets the single
 * global prefers-reduced-motion rule switch the whole thing off at once.
 *
 * A few things earn a second look if you're editing this:
 *  - Clouds are one cluster of puffs (CLOUD_PUFFS) placed at different points
 *    and scales from CLOUDS_FAR/CLOUDS_NEAR, each rendered twice — at x and
 *    x+800 — inside a group that drifts a full tile width and loops. That's
 *    what makes the drift seamless instead of visibly resetting.
 *  - The far ridge gets a soft blur and the near one doesn't — aerial
 *    perspective (distance reads as haze) rather than a uniform "soft" look.
 *  - The grain and vignette rects are the last two shapes for a reason: they
 *    have to sit on top of everything to read as a texture over the whole
 *    image, not a layer within it.
 */

/** One puff cluster, reused at every cloud position and scale. */
const CLOUD_PUFFS: { dx: number; dy: number; r: number }[] = [
  { dx: -30, dy: 8, r: 14 },
  { dx: -10, dy: -8, r: 18 },
  { dx: 16, dy: -3, r: 16 },
  { dx: 36, dy: 8, r: 12 },
  { dx: 4, dy: 12, r: 13 },
];

function Cloud({ x, y, scale }: { x: number; y: number; scale: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {CLOUD_PUFFS.map((p) => (
        <circle key={`${p.dx}-${p.dy}`} cx={p.dx} cy={p.dy} r={p.r} />
      ))}
    </g>
  );
}

/** Both tiles of a cloud layer, positioned for a seamless horizontal loop. */
function CloudLayer({
  clouds,
  color,
  opacity,
  blur,
  animationClass,
}: {
  clouds: { x: number; y: number; scale: number }[];
  color: string;
  opacity: number;
  blur: string;
  animationClass: string;
}) {
  return (
    <g fill={color} opacity={opacity} filter={blur} className={animationClass}>
      {[0, 800].map((offset) => (
        <g key={offset} transform={`translate(${offset} 0)`}>
          {clouds.map((c) => (
            <Cloud key={c.x} x={c.x} y={c.y} scale={c.scale} />
          ))}
        </g>
      ))}
    </g>
  );
}

export function WinterScene() {
  return (
    <div className="scene relative overflow-hidden rounded-xl border border-line bg-surface-sunken">
      <svg
        viewBox="0 0 800 420"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="A motorcyclist riding through a snowy landscape at dusk, beneath a sky drawn as a neural network with drifting clouds."
        className="block h-full w-full"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--scene-sky-top)" />
            <stop offset="62%" stopColor="var(--scene-sky-mid)" />
            <stop offset="100%" stopColor="var(--scene-sky-low)" />
          </linearGradient>
          <linearGradient id="snowfield" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--scene-snow-hi)" />
            <stop offset="100%" stopColor="var(--scene-snow-lo)" />
          </linearGradient>
          <radialGradient id="headlamp" cx="0%" cy="50%" r="100%">
            <stop offset="0%" stopColor="var(--scene-lamp)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--scene-lamp)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="vignette" cx="50%" cy="42%" r="75%">
            <stop offset="55%" stopColor="black" stopOpacity="0" />
            <stop offset="100%" stopColor="black" stopOpacity="0.2" />
          </radialGradient>
          {/* Distance reads as haze: only the far ridge gets this. */}
          <filter id="soften" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.6" />
          </filter>
          <filter id="cloud-blur-far" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <filter id="cloud-blur-near" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.2" />
          </filter>
          {/* A canvas-grain wash, blended over the finished scene at low
              opacity — see the rect using it near the end of the file. */}
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          </filter>
        </defs>

        <rect width="800" height="420" fill="url(#sky)" />

        <CloudLayer
          clouds={CLOUDS_FAR}
          color="var(--scene-cloud-far)"
          opacity={0.55}
          blur="url(#cloud-blur-far)"
          animationClass="scene-cloud-far"
        />

        {/* Sky as a neural network — the AI half of the portrait, layered
            over the clouds like an overlay rather than a physical thing. */}
        <g className="scene-neurons" stroke="var(--scene-wire)" strokeWidth="0.7" fill="none">
          {SYNAPSES.map(([a, b], i) => (
            <line
              key={i}
              x1={NEURONS[a].x}
              y1={NEURONS[a].y}
              x2={NEURONS[b].x}
              y2={NEURONS[b].y}
              className="scene-synapse"
              style={{ animationDelay: `${(i % 7) * 0.5}s` }}
            />
          ))}
        </g>
        <g fill="var(--scene-node)">
          {NEURONS.map((n, i) => (
            <circle
              key={i}
              cx={n.x}
              cy={n.y}
              r={n.r}
              className="scene-node"
              style={{ animationDelay: `${(i % 5) * 0.7}s` }}
            />
          ))}
        </g>

        {/* Far ridge, then near ridge — depth without a photograph. */}
        <path
          d="M0 250 L90 208 L165 240 L250 190 L330 236 L420 196 L510 242 L600 205 L690 244 L800 214 L800 420 L0 420 Z"
          fill="var(--scene-ridge-far)"
          filter="url(#soften)"
        />

        <CloudLayer
          clouds={CLOUDS_NEAR}
          color="var(--scene-cloud-near)"
          opacity={0.7}
          blur="url(#cloud-blur-near)"
          animationClass="scene-cloud-near"
        />

        <path
          d="M0 292 L110 258 L210 288 L300 250 L400 290 L500 256 L610 292 L720 262 L800 288 L800 420 L0 420 Z"
          fill="var(--scene-ridge-near)"
        />

        {/* Conifers on the near ridge. */}
        <g fill="var(--scene-tree)">
          {[60, 148, 236, 352, 468, 566, 664, 752].map((x, i) => (
            <g key={x} className="scene-tree" style={{ animationDelay: `${i * 0.4}s` }}>
              <path d={`M${x} 300 l-11 26 h22 z`} />
              <path d={`M${x} 286 l-9 22 h18 z`} />
              <rect x={x - 1.5} y="324" width="3" height="8" />
            </g>
          ))}
        </g>

        {/* Snowfield and the road the rider is on. */}
        <path d="M0 330 Q400 312 800 336 L800 420 L0 420 Z" fill="url(#snowfield)" />
        <path
          d="M0 372 Q400 356 800 378"
          stroke="var(--scene-road)"
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M0 372 Q400 356 800 378"
          stroke="var(--scene-road-line)"
          strokeWidth="1.5"
          strokeDasharray="16 22"
          fill="none"
          className="scene-roadline"
        />

        {/* The rider. Travels the full width, then loops. */}
        <g className="scene-rider">
          <ellipse cx="34" cy="0" rx="66" ry="17" fill="url(#headlamp)" />

          {/* Motion streaks trailing the rear wheel — the clearest signal
              that this is riding, not sliding. */}
          <g stroke="var(--scene-rider)" strokeOpacity="0.45" strokeWidth="1.6" strokeLinecap="round">
            {[-1.5, 2, 5.5].map((dy, i) => (
              <line
                key={dy}
                x1="-30"
                y1={dy}
                x2="-20"
                y2={dy}
                className="scene-motion-line"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </g>

          <g fill="var(--scene-rider)">
            {/* wheels, actually turning */}
            <g className="scene-wheel">
              <circle cx="-16" cy="4" r="8.5" fill="none" stroke="var(--scene-rider)" strokeWidth="2.4" />
              <line x1="-16" y1="-4.5" x2="-16" y2="12.5" stroke="var(--scene-rider)" strokeWidth="1" />
              <line x1="-24" y1="4" x2="-8" y2="4" stroke="var(--scene-rider)" strokeWidth="1" />
            </g>
            <path d="M-25 4 a9 3 0 0 1 18 0" fill="none" stroke="var(--scene-rider)" strokeWidth="1.8" />

            <g className="scene-suspension">
              <g className="scene-wheel" style={{ animationDelay: '-0.2s' }}>
                <circle cx="14" cy="4" r="8.5" fill="none" stroke="var(--scene-rider)" strokeWidth="2.4" />
                <line x1="14" y1="-4.5" x2="14" y2="12.5" stroke="var(--scene-rider)" strokeWidth="1" />
                <line x1="6" y1="4" x2="22" y2="4" stroke="var(--scene-rider)" strokeWidth="1" />
              </g>
              <path d="M5 4 a9 3 0 0 1 18 0" fill="none" stroke="var(--scene-rider)" strokeWidth="1.8" />
            </g>

            {/* frame and tank */}
            <path d="M-16 4 L-4 -6 L10 -6 L14 4" stroke="var(--scene-rider)" strokeWidth="2.4" fill="none" />
            <path d="M-6 -7 q7 -5 14 -1 l-2 4 h-11 z" />
            {/* rider leaning forward */}
            <path
              d="M-1 -8 q2 -9 7 -11 q4 -2 6 1"
              stroke="var(--scene-rider)"
              strokeWidth="2.6"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="6" cy="-21" r="4.2" />
          </g>
        </g>

        {/* Snow, in front of everything but the texture and framing below. */}
        <g fill="var(--scene-flake)">
          {SNOWFLAKES.map((f, i) => (
            <circle
              key={i}
              cx={f.x}
              cy="-8"
              r={f.r}
              className="scene-flake"
              style={{ animationDelay: `${f.delay}s`, animationDuration: `${f.dur}s` }}
            />
          ))}
        </g>

        {/* Canvas grain, blended over the whole image for a painted rather
            than vector-flat finish. */}
        <rect width="800" height="420" filter="url(#grain)" opacity="0.045" style={{ mixBlendMode: 'overlay' }} />
        {/* Vignette, framing the scene the way a lens would. */}
        <rect width="800" height="420" fill="url(#vignette)" />
      </svg>
    </div>
  );
}
