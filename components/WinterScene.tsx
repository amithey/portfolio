import {
  SNOWFLAKES,
  NEURONS,
  SYNAPSES,
  STARS,
  CLOUDS_FAR,
  CLOUDS_NEAR,
  LIGHTNING_BOLT,
  type Cloud as CloudShape,
} from './scene-data';

/**
 * The hero scene: a rider crossing a winter landscape, under a sky that is a
 * neural network and a constellation at the same time.
 *
 * Every motif here is something Amit named — motorcycles, AI, code, winter —
 * so this is a portrait rather than decoration. It is a server component: all
 * motion is CSS, which keeps it out of the JS bundle and lets the single
 * global prefers-reduced-motion rule switch the whole thing off at once.
 *
 * Things worth knowing before editing:
 *  - Light mode is an overcast winter afternoon, dark mode is night. The
 *    difference is entirely in the CSS custom properties plus a few
 *    dark-only layers (stars, headlight glow) — there is one scene here,
 *    not two.
 *  - NEURONS/SYNAPSES do double duty: stars joined into constellations at
 *    night, a neural net over daylight. Same geometry, two readings.
 *  - The bike is drawn in its own local coordinate space (~78 units long,
 *    origin at the ground line between the wheels) and then placed with a
 *    single transform. That's what makes it resizable without redrawing —
 *    change BIKE_SCALE and nothing else moves.
 *  - Grain and vignette are the last two shapes on purpose: they have to sit
 *    over everything to read as a finish on the whole image.
 */

/**
 * The bike is 78 units axle-to-axle in its own space; this puts it at ~105
 * units in the 800-wide scene, a little over twice the size of the version
 * this replaced. Changing it here moves nothing else — but the wheel-spin
 * period in globals.css is derived from it, so the two have to change
 * together or the wheels start slipping.
 */
const BIKE_SCALE = 1.35;

function Cloud({ cloud, tint }: { cloud: CloudShape; tint: string }) {
  return (
    <g transform={`translate(${cloud.x} ${cloud.y}) scale(${cloud.scale})`}>
      {cloud.puffs.map((p, i) => (
        <ellipse key={i} cx={p.dx} cy={p.dy} rx={p.rx} ry={p.ry} fill={tint} />
      ))}
    </g>
  );
}

/** Both tiles of a cloud layer, positioned for a seamless horizontal loop. */
function CloudLayer({
  clouds,
  tint,
  opacity,
  blur,
  animationClass,
}: {
  clouds: CloudShape[];
  tint: string;
  opacity: number;
  blur: string;
  animationClass: string;
}) {
  return (
    <g opacity={opacity} filter={blur} className={animationClass}>
      {[0, 800].map((offset) => (
        <g key={offset} transform={`translate(${offset} 0)`}>
          {clouds.map((c) => (
            <Cloud key={c.x} cloud={c} tint={tint} />
          ))}
        </g>
      ))}
    </g>
  );
}

/**
 * The motorcycle and its rider, drawn side-on facing right.
 *
 * Local space: x from about -42 (rear tyre) to +42 (front wheel), y=0 at the
 * ground, negative upward. Everything that spins or bounces is its own group
 * so the CSS can drive it independently.
 */
function Rider() {
  const spokes = [0, 45, 90, 135];

  return (
    <g className="scene-rider">
      <g transform={`scale(${BIKE_SCALE})`}>
        {/* Headlight beam, thrown forward onto the road. Dark mode only —
            a lit beam reads as nothing against a bright afternoon. */}
        <path
          d="M36 -34 L150 -14 L150 26 L34 -24 Z"
          fill="url(#beam)"
          className="scene-beam"
        />

        {/* Motion streaks off the rear wheel. */}
        <g stroke="var(--scene-rider)" strokeOpacity="0.4" strokeWidth="1.8" strokeLinecap="round">
          {[-22, -14, -6].map((dy, i) => (
            <line
              key={dy}
              x1="-54"
              y1={dy}
              x2="-40"
              y2={dy}
              className="scene-motion-line"
              style={{ animationDelay: `${i * 0.14}s` }}
            />
          ))}
        </g>

        {/* Exhaust, drifting back and up. */}
        <g transform="translate(-34 -12)">
          {[0, 0.45, 0.9].map((d) => (
            <circle
              key={d}
              r="4"
              fill="var(--scene-rider)"
              opacity="0.22"
              className="scene-exhaust"
              style={{ animationDelay: `${d}s` }}
            />
          ))}
        </g>

        <g stroke="var(--scene-rider)" fill="var(--scene-rider)">
          {/* ---- Rear wheel ---- */}
          <g className="scene-wheel">
            <circle cx="-26" cy="-13" r="13" fill="none" strokeWidth="3.4" />
            <circle cx="-26" cy="-13" r="7.5" fill="none" strokeWidth="1" strokeOpacity="0.5" />
            {spokes.map((a) => (
              <line
                key={a}
                x1={-26 - 11 * Math.cos((a * Math.PI) / 180)}
                y1={-13 - 11 * Math.sin((a * Math.PI) / 180)}
                x2={-26 + 11 * Math.cos((a * Math.PI) / 180)}
                y2={-13 + 11 * Math.sin((a * Math.PI) / 180)}
                strokeWidth="1.1"
                strokeOpacity="0.55"
              />
            ))}
            <circle cx="-26" cy="-13" r="2" stroke="none" />
          </g>

          {/* ---- Front wheel, on a fork that gives slightly ---- */}
          <g className="scene-suspension">
            <g className="scene-wheel" style={{ animationDelay: '-0.18s' }}>
              <circle cx="26" cy="-13" r="13" fill="none" strokeWidth="3.4" />
              <circle cx="26" cy="-13" r="7.5" fill="none" strokeWidth="1" strokeOpacity="0.5" />
              {spokes.map((a) => (
                <line
                  key={a}
                  x1={26 - 11 * Math.cos((a * Math.PI) / 180)}
                  y1={-13 - 11 * Math.sin((a * Math.PI) / 180)}
                  x2={26 + 11 * Math.cos((a * Math.PI) / 180)}
                  y2={-13 + 11 * Math.sin((a * Math.PI) / 180)}
                  strokeWidth="1.1"
                  strokeOpacity="0.55"
                />
              ))}
              <circle cx="26" cy="-13" r="2" stroke="none" />
            </g>
            {/* fork legs + headlight shell */}
            <line x1="26" y1="-13" x2="33" y2="-34" strokeWidth="3.2" strokeLinecap="round" />
            <line x1="21" y1="-14" x2="28" y2="-33" strokeWidth="2" strokeOpacity="0.6" strokeLinecap="round" />
            <path d="M31 -38 q8 2 7 9 l-9 -2 z" stroke="none" />
            <circle cx="35" cy="-33" r="3" fill="var(--scene-lamp)" stroke="none" className="scene-lamp" />
            {/* handlebar */}
            <line x1="30" y1="-38" x2="40" y2="-42" strokeWidth="2.6" strokeLinecap="round" />
          </g>

          {/* ---- Engine, frame, tank, seat ---- */}
          <path d="M-26 -13 L-8 -18 L-4 -30 L14 -30 L26 -13" fill="none" strokeWidth="2.6" />
          {/* engine block */}
          <path d="M-10 -14 L-2 -26 L10 -26 L12 -14 Z" stroke="none" opacity="0.85" />
          <line x1="-6" y1="-25" x2="-2" y2="-15" strokeWidth="1" strokeOpacity="0.45" />
          <line x1="1" y1="-25" x2="4" y2="-15" strokeWidth="1" strokeOpacity="0.45" />
          {/* exhaust pipe running back from the engine */}
          <path d="M-8 -15 q-14 1 -24 -1" fill="none" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.75" />
          {/* tank */}
          <path d="M-6 -31 q12 -8 22 -2 l-2 6 h-19 z" stroke="none" />
          <path d="M-2 -33 q7 -3 12 -1" fill="none" strokeWidth="1.4" stroke="var(--scene-tank-hi)" strokeLinecap="round" />
          {/* seat + tail */}
          <path d="M-28 -32 q10 -4 22 -1 l-1 4 h-21 z" stroke="none" />
          {/* swingarm */}
          <line x1="-26" y1="-13" x2="-6" y2="-17" strokeWidth="2.4" strokeOpacity="0.8" />
        </g>

        {/* ---- Rider ---- */}
        <g stroke="var(--scene-rider)" fill="var(--scene-rider)" strokeLinecap="round">
          {/* leg: hip to knee to footpeg */}
          <path d="M-14 -33 L-2 -22 L-6 -12" fill="none" strokeWidth="4.6" />
          {/* torso, leaning into the ride */}
          <path d="M-14 -34 q6 -14 18 -20" fill="none" strokeWidth="7" />
          {/* arm reaching for the bar */}
          <path d="M2 -52 L26 -43" fill="none" strokeWidth="4" />
          {/* helmet with a visor */}
          <g transform="translate(8 -56)">
            <circle r="7" stroke="none" />
            <path d="M2 -3 q6 0 6.5 5 l-7 0 z" fill="var(--scene-visor)" stroke="none" />
          </g>
        </g>
      </g>
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
        aria-label="A motorcyclist riding through a snowy landscape beneath a sky drawn as both a constellation and a neural network."
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
          {/* The beam fades out along its length rather than ending on a hard
              edge, which is what sells it as light instead of a shape. */}
          <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--scene-lamp)" stopOpacity="0.5" />
            <stop offset="55%" stopColor="var(--scene-lamp)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="var(--scene-lamp)" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="vignette" cx="50%" cy="42%" r="75%">
            <stop offset="55%" stopColor="black" stopOpacity="0" />
            <stop offset="100%" stopColor="black" stopOpacity="0.22" />
          </radialGradient>
          {/* Distance reads as haze: only the far ridge gets this. */}
          <filter id="soften" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.6" />
          </filter>
          <filter id="cloud-blur-far" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <filter id="cloud-blur-near" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.6" />
          </filter>
          <filter id="star-glow" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          </filter>
        </defs>

        <rect width="800" height="420" fill="url(#sky)" />

        {/* Background stars — dark mode only, see .scene-star. */}
        <g fill="var(--scene-star)" className="scene-stars">
          {STARS.map((s, i) => (
            <circle
              key={i}
              cx={s.x}
              cy={s.y}
              r={s.r}
              className="scene-star"
              style={{ animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s` }}
            />
          ))}
        </g>

        <CloudLayer
          clouds={CLOUDS_FAR}
          tint="var(--scene-cloud-far)"
          opacity={0.6}
          blur="url(#cloud-blur-far)"
          animationClass="scene-cloud-far"
        />

        {/* Rare lightning: a drawn bolt, plus a full-sky wash that fires with
            it. Both idle for most of a long cycle — see .scene-bolt. */}
        <path d={LIGHTNING_BOLT} fill="var(--scene-bolt)" className="scene-bolt" />
        <rect width="800" height="420" fill="var(--scene-bolt)" className="scene-bolt-flash" />

        {/* The constellation: stars joined by lines at night, a neural net by
            day. One geometry, two readings. */}
        <g stroke="var(--scene-wire)" strokeWidth="0.7" fill="none">
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
          {/* A soft halo under each node — only visible at night, where it
              turns a flat dot into something with light coming off it. */}
          <g filter="url(#star-glow)" className="scene-node-glow">
            {NEURONS.map((n, i) => (
              <circle key={i} cx={n.x} cy={n.y} r={n.r * 1.6} />
            ))}
          </g>
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
          tint="var(--scene-cloud-near)"
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
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M0 372 Q400 356 800 378"
          stroke="var(--scene-road-line)"
          strokeWidth="1.5"
          strokeDasharray="16 22"
          fill="none"
          opacity="0.5"
          className="scene-roadline"
        />

        <Rider />

        {/* Snow, in front of everything but the finish below. */}
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

        {/* Canvas grain and a vignette, blended over the finished image for a
            painted rather than vector-flat result. */}
        <rect width="800" height="420" filter="url(#grain)" opacity="0.05" style={{ mixBlendMode: 'overlay' }} />
        <rect width="800" height="420" fill="url(#vignette)" />
      </svg>
    </div>
  );
}
