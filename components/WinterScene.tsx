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
 * A supersport motorcycle and its rider, drawn side-on facing right.
 *
 * Local space: x from about -42 (rear tyre) to +42 (front wheel), y=0 at the
 * ground, negative upward. Everything that spins or bounces is its own group
 * so the CSS can drive it independently.
 *
 * The shape that makes this read as a sportbike rather than a bicycle is the
 * mass in the middle: a filled fairing running from the nose back to the
 * engine, a high upswept tail, clip-on bars below the tank line, and the
 * rider tucked down over the tank rather than sitting upright. Outline alone
 * reads as a pushbike no matter how many spokes it has.
 */
function Rider() {
  /**
   * Three spokes, drawn as full chords through the hub, give six arms 60
   * degrees apart. Five chords (the previous count) put the arms 36 degrees
   * apart, and at this rotation speed that repeat is fast enough to shimmer
   * rather than read as turning. The off-centre brake disc is what actually
   * sells the rotation: a radially symmetric wheel gives the eye nothing to
   * track.
   */
  const spokes = [0, 60, 120];

  /** Both wheels are identical apart from position and phase. */
  const wheel = (cx: number, delay: string) => (
    <g className="scene-wheel" style={{ animationDelay: delay }}>
      {/* tyre */}
      <circle cx={cx} cy={-13} r="13" fill="none" stroke="var(--scene-rider)" strokeWidth="4.5" />
      {/* brake disc */}
      <circle
        cx={cx}
        cy={-13}
        r="6.5"
        fill="none"
        stroke="var(--scene-rim)"
        strokeWidth="2.6"
        strokeOpacity="0.45"
      />
      {/* rim */}
      <circle cx={cx} cy={-13} r="9.5" fill="none" stroke="var(--scene-rim)" strokeWidth="1.6" />
      {spokes.map((a) => (
        <line
          key={a}
          x1={cx - 9 * Math.cos((a * Math.PI) / 180)}
          y1={-13 - 9 * Math.sin((a * Math.PI) / 180)}
          x2={cx + 9 * Math.cos((a * Math.PI) / 180)}
          y2={-13 + 9 * Math.sin((a * Math.PI) / 180)}
          stroke="var(--scene-rim)"
          strokeWidth="1.8"
        />
      ))}
      {/* Valve stem — one asymmetric mark, so a full turn is countable. */}
      <circle cx={cx + 7.5} cy={-13} r="1.3" fill="var(--scene-lamp)" opacity="0.7" />
      <circle cx={cx} cy={-13} r="2.4" fill="var(--scene-rim)" />
    </g>
  );

  return (
    <g className="scene-rider">
      <g transform={`scale(${BIKE_SCALE})`}>
        {/* Headlight beam, thrown forward onto the road. Dark mode only —
            a lit beam reads as nothing against a bright afternoon. */}
        <path d="M38 -30 L152 -12 L152 24 L36 -20 Z" fill="url(#beam)" className="scene-beam" />

        {/* Motion streaks off the back of the bike. */}
        <g stroke="var(--scene-rider)" strokeOpacity="0.4" strokeWidth="1.8" strokeLinecap="round">
          {[-30, -20, -10].map((dy, i) => (
            <line
              key={dy}
              x1="-58"
              y1={dy}
              x2="-42"
              y2={dy}
              className="scene-motion-line"
              style={{ animationDelay: `${i * 0.14}s` }}
            />
          ))}
        </g>

        {/* Exhaust, drifting back and up from the underslung can. */}
        <g transform="translate(-30 -14)">
          {[0, 0.45, 0.9].map((d) => (
            <circle
              key={d}
              r="4"
              fill="var(--scene-rider)"
              opacity="0.2"
              className="scene-exhaust"
              style={{ animationDelay: `${d}s` }}
            />
          ))}
        </g>

        {wheel(-26, '0s')}

        {/*
          Only what is actually bolted to the fork moves with the fork: the
          wheel, the lower legs and the mudguard. The nose fairing, screen,
          headlight and clip-on are frame-mounted on a sportbike, and while
          they were inside this group the whole nose twitched against the
          body every 0.4s, opening and closing a seam where the two meet.
        */}
        <g className="scene-suspension">
          {wheel(26, '-0.4s')}
          {/* Upside-down forks, raked forward the way a sportbike's are. */}
          <path
            d="M24 -13 L34 -40"
            stroke="var(--scene-rider)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M19 -14 L29 -39"
            stroke="var(--scene-rider)"
            strokeOpacity="0.55"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          {/* Front mudguard, hugging the tyre. */}
          <path
            d="M14 -24 q12 -7 24 -1 l-2 4 q-10 -5 -20 1 z"
            fill="var(--scene-rider)"
          />
        </g>

        {/* Nose fairing + screen — frame-mounted, so it holds still. */}
        <path d="M28 -44 q12 1 13 11 l-13 3 z" fill="var(--scene-fairing)" />
        <path d="M28 -44 q7 -3 10 -1 l1 3 q-6 -1 -11 1 z" fill="var(--scene-visor)" opacity="0.6" />
        <circle cx="38" cy="-31" r="7" fill="var(--scene-lamp)" className="scene-lamp-glow" />
        <circle cx="38" cy="-31" r="3.4" fill="var(--scene-lamp)" className="scene-lamp" />
        {/* Clip-on bar, low and forward. */}
        <line x1="26" y1="-40" x2="34" y2="-42" stroke="var(--scene-rider)" strokeWidth="2.8" strokeLinecap="round" />

        {/* ---- The body: one filled silhouette from tail to nose ----
            Drawn as a single path so the bike has real mass in the middle,
            which is the whole difference between this and a bicycle. */}
        <path
          d="M-34 -34
             q10 -5 20 -3
             l10 2
             q10 1 16 6
             l6 6
             q3 4 1 8
             l-10 3
             q-6 2 -12 1
             l-14 -2
             q-8 -1 -12 -6
             q-4 -6 -5 -15 z"
          fill="var(--scene-fairing)"
        />
        {/* Tank crease — one highlight following the body, not floating. */}
        <path
          d="M-18 -35 q12 -3 24 2"
          fill="none"
          stroke="var(--scene-tank-hi)"
          strokeWidth="1.6"
          strokeOpacity="0.55"
          strokeLinecap="round"
        />
        {/* Upswept tail unit. */}
        <path d="M-40 -40 q8 -3 14 0 l2 7 q-9 2 -17 -1 z" fill="var(--scene-fairing)" />
        <path d="M-41 -40 q4 -2 8 -1 l1 3 q-5 0 -8 1 z" fill="var(--scene-lamp)" opacity="0.5" />

        {/* Engine block, filling the gap between the wheels. */}
        <path d="M-14 -22 l6 -10 h16 l6 10 q-4 6 -14 6 q-10 0 -14 -6 z" fill="var(--scene-engine)" />
        <g stroke="var(--scene-rider)" strokeOpacity="0.35" strokeWidth="1.1">
          <line x1="-8" y1="-30" x2="-8" y2="-19" />
          <line x1="-2" y1="-31" x2="-2" y2="-18" />
          <line x1="4" y1="-31" x2="4" y2="-18" />
        </g>
        {/* Exhaust can, tucked under the tail. */}
        <path
          d="M-6 -18 q-12 2 -22 -1"
          fill="none"
          stroke="var(--scene-rider)"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        {/* Swingarm to the rear axle. */}
        <path
          d="M-26 -13 L-6 -20"
          stroke="var(--scene-rider)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* ---- Rider, tucked over the tank ---- */}
        <g stroke="var(--scene-rider)" fill="var(--scene-rider)" strokeLinecap="round">
          {/* Thigh, then shin folded back to the high rearset peg — the
              tight knee bend is characteristic of this riding position. */}
          <path d="M-16 -40 L-4 -32" fill="none" strokeWidth="7" />
          <path d="M-4 -32 L-12 -22" fill="none" strokeWidth="5.5" />
          <path d="M-13 -21 l-4 2" fill="none" strokeWidth="3" />
          {/* Torso, folded down over the tank. */}
          <path d="M-18 -42 q10 -8 22 -14" fill="none" strokeWidth="9" />
          {/* Upper arm and forearm reaching down to the clip-on. */}
          <path d="M2 -57 L14 -50" fill="none" strokeWidth="5" />
          <path d="M14 -50 L27 -42" fill="none" strokeWidth="4.2" />
          {/* Helmet, chin down and forward. */}
          <g transform="translate(9 -60) rotate(14)">
            <path d="M-7 -1 q0 -7 7 -7 q8 0 8 8 q0 5 -4 6 l-9 1 q-2 -3 -2 -8 z" />
            <path d="M0 -5 q7 -2 8 3 l-9 2 z" fill="var(--scene-visor)" />
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
        {/* Static: see the note on .scene-roadline in globals.css — the
            camera is fixed, so paint on the road cannot move. */}
        <path
          d="M0 372 Q400 356 800 378"
          stroke="var(--scene-road-line)"
          strokeWidth="1.5"
          strokeDasharray="16 22"
          fill="none"
          opacity="0.5"
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
