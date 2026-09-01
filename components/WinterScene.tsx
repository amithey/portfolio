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
 * Local space: y=0 is the road, negative is up, and the wheels sit at
 * x=-30 and x=+30 with r=13. Those numbers are the ones to preserve when
 * editing: a 60-unit wheelbase against a 26-unit wheel is a ratio of 2.3,
 * which is roughly what a litre sportbike actually measures. The earlier
 * draft used 2.0, and that alone made it sit like a bicycle before any
 * bodywork was drawn.
 *
 * What makes the silhouette read as a sportbike, in rough order of how much
 * each one matters:
 *
 *  - Mass in the middle: a filled engine block bridging the wheels, not an
 *    open triangle of tubes.
 *  - A tail that kicks up past the rear wheel, with the line through seat
 *    and tank rising toward the front.
 *  - Clip-ons *below* the top of the tank, which is what folds the rider
 *    down over it instead of leaving them sitting up behind it.
 *  - Raked forks. Vertical forks read as a pushbike whatever else is on it.
 *
 * Everything that spins or bounces is its own group so the CSS can drive it
 * independently; see scene-wheel / scene-suspension / scene-rider-body.
 */
function Rider() {
  /**
   * Three chords through the hub give six arms 60 degrees apart. Five chords
   * put them 36 degrees apart, close enough at this speed to shimmer rather
   * than read as turning. The brake disc and the valve stem are what
   * actually sell the rotation — a radially symmetric wheel gives the eye
   * nothing to track.
   */
  const spokes = [0, 60, 120];

  /** Both wheels are identical apart from position and phase. */
  const wheel = (cx: number, delay: string) => (
    <g className="scene-wheel" style={{ animationDelay: delay }}>
      {/* tyre — fat, the way a sport tyre is */}
      <circle cx={cx} cy={-13} r="13" fill="none" stroke="var(--scene-rider)" strokeWidth="5" />
      {/* brake disc: a real one is about half the wheel across */}
      <circle
        cx={cx}
        cy={-13}
        r="6.8"
        fill="none"
        stroke="var(--scene-rim)"
        strokeWidth="2.8"
        strokeOpacity="0.4"
      />
      <circle cx={cx} cy={-13} r="9.3" fill="none" stroke="var(--scene-rim)" strokeWidth="1.5" />
      {spokes.map((a) => (
        <line
          key={a}
          x1={cx - 8.8 * Math.cos((a * Math.PI) / 180)}
          y1={-13 - 8.8 * Math.sin((a * Math.PI) / 180)}
          x2={cx + 8.8 * Math.cos((a * Math.PI) / 180)}
          y2={-13 + 8.8 * Math.sin((a * Math.PI) / 180)}
          stroke="var(--scene-rim)"
          strokeWidth="2"
        />
      ))}
      {/* Valve stem — one asymmetric mark, so a full turn is countable. */}
      <circle cx={cx + 7.2} cy={-13} r="1.2" fill="var(--scene-lamp)" opacity="0.75" />
      <circle cx={cx} cy={-13} r="2.6" fill="var(--scene-rim)" />
    </g>
  );

  return (
    <g className="scene-rider">
      <g transform={`scale(${BIKE_SCALE})`}>
        {/* Headlight beam, thrown forward onto the road. Dark mode only —
            a lit beam reads as nothing against a bright afternoon. */}
        <path d="M44 -32 L158 -14 L158 22 L42 -22 Z" fill="url(#beam)" className="scene-beam" />

        {/* Motion streaks off the back of the bike. */}
        <g stroke="var(--scene-rider)" strokeOpacity="0.4" strokeWidth="1.8" strokeLinecap="round">
          {[-34, -24, -14].map((dy, i) => (
            <line
              key={dy}
              x1="-66"
              y1={dy}
              x2="-48"
              y2={dy}
              className="scene-motion-line"
              style={{ animationDelay: `${i * 0.14}s` }}
            />
          ))}
        </g>

        {/* Exhaust, drifting back and up from the can under the tail. */}
        <g transform="translate(-34 -17)">
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

        {/* Snow kicked up off the rear contact patch. Faster and tighter than
            the exhaust so the two don't read as one cloud. */}
        <g transform="translate(-30 -1)" fill="var(--scene-snow-hi)">
          {[
            { d: 0, r: 2.2 },
            { d: 0.22, r: 1.5 },
            { d: 0.44, r: 2.6 },
            { d: 0.66, r: 1.8 },
          ].map((p) => (
            <circle
              key={p.d}
              r={p.r}
              className="scene-spray"
              style={{ animationDelay: `${p.d}s` }}
            />
          ))}
        </g>

        {/* ---- Rear end: swingarm, shock, chain, wheel ---- */}
        <path d="M-9 -25 L-30 -16 L-30 -10 L-9 -19 Z" fill="var(--scene-engine)" />
        <path
          d="M-11 -24 L-6 -37"
          stroke="var(--scene-rim)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.7"
        />
        <line
          x1="-30"
          y1="-13"
          x2="-8"
          y2="-22"
          stroke="var(--scene-rim)"
          strokeWidth="1.2"
          strokeOpacity="0.5"
        />
        {wheel(-30, '0s')}

        {/* Exhaust can, tucked under the tail. */}
        <path
          d="M-8 -21 q-14 3 -25 4"
          fill="none"
          stroke="var(--scene-rider)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* ---- Engine: the mass that bridges the wheels ---- */}
        <path d="M-14 -33 h20 l6 8 l-2 8 q-6 4 -16 3 l-8 -3 z" fill="var(--scene-engine)" />
        {/* Cylinder fins, canted forward the way an inline-four sits. */}
        <g stroke="var(--scene-rider)" strokeOpacity="0.3" strokeWidth="1.1">
          <line x1="-9" y1="-32" x2="-11" y2="-21" />
          <line x1="-3" y1="-32" x2="-5" y2="-20" />
          <line x1="3" y1="-32" x2="1" y2="-20" />
        </g>
        {/* Front sprocket cover. */}
        <circle cx="-9" cy="-22" r="3.4" fill="var(--scene-rim)" opacity="0.55" />

        {/* ---- Bodywork: one rising line from tail through tank to nose ---- */}
        <path d="M-36 -46 L-20 -47 l2 8 q-10 3 -19 1 z" fill="var(--scene-fairing)" />
        <path d="M-36 -46 l5 -0.4 l1 4 l-5 0.6 z" fill="var(--scene-lamp)" opacity="0.55" />
        {/* Seat, dropping forward into the tank. */}
        <path d="M-21 -47 q10 -1 16 -4 l2 6 q-8 3 -16 4 z" fill="var(--scene-rider)" />
        {/* Tank — the widest part of the silhouette. */}
        <path
          d="M-6 -45 q10 -4 20 -3 q8 1 12 5 l2 7 q-9 5 -20 5 l-14 -1 q-3 -6 0 -13 z"
          fill="var(--scene-fairing)"
        />
        {/* One crease along the tank, following the body rather than floating. */}
        <path
          d="M-2 -44 q12 -2 22 3"
          fill="none"
          stroke="var(--scene-tank-hi)"
          strokeWidth="1.5"
          strokeOpacity="0.5"
          strokeLinecap="round"
        />
        {/* Belly pan, wrapping under the engine. */}
        <path d="M8 -33 q12 2 16 10 l-3 7 q-10 -6 -21 -5 z" fill="var(--scene-fairing)" />

        {/* ---- Front end ----
            Only what is bolted to the fork moves with it: the wheel, the
            lower legs and the mudguard. The nose fairing and headlight are
            frame-mounted, so they sit outside this group and hold still —
            inside it, the whole nose twitched against the body. */}
        <g className="scene-suspension">
          <path
            d="M30 -13 L41 -43"
            stroke="var(--scene-rider)"
            strokeWidth="4.2"
            strokeLinecap="round"
          />
          <path
            d="M25 -14 L36 -42"
            stroke="var(--scene-rim)"
            strokeOpacity="0.5"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          {/* Front mudguard, hugging the tyre. */}
          <path d="M18 -25 q13 -8 26 -1 l-2 5 q-11 -6 -22 1 z" fill="var(--scene-fairing)" />
          {wheel(30, '-0.4s')}
        </g>

        {/* Nose fairing: sharp, leaning forward over the wheel. */}
        <path d="M22 -52 q14 1 20 9 l3 9 l-10 3 q-6 -10 -15 -13 z" fill="var(--scene-fairing)" />
        {/* Screen bubble. */}
        <path d="M20 -52 q9 -5 16 -1 l2 4 q-9 -3 -17 1 z" fill="var(--scene-visor)" opacity="0.55" />
        {/* Headlight, set into the nose. */}
        <circle cx="41" cy="-33" r="7" fill="var(--scene-lamp)" className="scene-lamp-glow" />
        <path
          d="M36 -37 q7 0 8 5 l-1 4 q-5 -4 -9 -4 z"
          fill="var(--scene-lamp)"
          className="scene-lamp"
        />
        {/* Clip-on, below the top of the tank — this is what folds the rider. */}
        <line
          x1="24"
          y1="-44"
          x2="33"
          y2="-45"
          stroke="var(--scene-rider)"
          strokeWidth="2.6"
          strokeLinecap="round"
        />

        {/* ---- Rider, tucked over the tank ----
            Settles on the same period as the fork but later and by less:
            the rider is sprung mass, so it lags the wheel rather than
            snapping with it. Moving them in lockstep is what makes a bike
            and rider read as one rigid cut-out. */}
        <g
          className="scene-rider-body"
          stroke="var(--scene-rider)"
          fill="var(--scene-rider)"
          strokeLinecap="round"
        >
          {/* Boot on the rearset, then shin folded back up to the knee. */}
          <path d="M-13 -22 l-5 1" strokeWidth="3.4" fill="none" />
          <path d="M-12 -23 L-6 -34" strokeWidth="6" fill="none" />
          {/* Thigh, clamped along the tank. */}
          <path d="M-6 -34 L-18 -46" strokeWidth="7.5" fill="none" />
          {/* Torso, folded down over the tank toward the bars. */}
          <path d="M-19 -47 q11 -9 22 -14" strokeWidth="10" fill="none" />
          {/* Upper arm, then forearm reaching down to the clip-on. */}
          <path d="M2 -60 L14 -53" strokeWidth="5" fill="none" />
          <path d="M14 -53 L25 -45" strokeWidth="4.2" fill="none" />
          {/* Helmet: chin down and forward, with a visor. */}
          <g transform="translate(9 -63) rotate(16)">
            <path d="M-8 -1 q0 -8 8 -8 q9 0 9 9 q0 6 -5 7 l-10 1 q-2 -4 -2 -9 z" />
            <path d="M0 -6 q8 -2 9 4 l-10 2 z" fill="var(--scene-visor)" />
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
