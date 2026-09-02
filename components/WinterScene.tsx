import {
  SNOWFLAKES,
  STARS,
  CLOUDS_FAR,
  CLOUDS_NEAR,
  LIGHTNING_BOLT,
  type Cloud as CloudShape,
} from './scene-data';

/**
 * The hero scene: a rider crossing a winter landscape, under clouds whose
 * visible form is a neural network.
 *
 * Every motif here is something Amit named (motorcycles, AI, code, winter)
 * so this is a portrait rather than decoration. It is a server component: all
 * motion is CSS, which keeps it out of the JS bundle and lets the single
 * global prefers-reduced-motion rule switch the whole thing off at once.
 *
 * Things worth knowing before editing:
 *  - Light mode is an overcast winter afternoon, dark mode is night. The
 *    difference is entirely in the CSS custom properties plus a few
 *    dark-only layers (stars, headlight glow) — there is one scene here,
 *    not two.
 *  - Each cloud is a puff volume whose silhouette is drawn as nodes and
 *    glowing synapses. The net lives in the same group as the puff, so it
 *    drifts and breathes with that cloud. There is no separate sky graph.
 *  - The bike is drawn in its own local coordinate space (~78 units long,
 *    origin at the ground line between the wheels) and then placed with a
 *    single transform. That's what makes it resizable without redrawing —
 *    change BIKE_SCALE and nothing else moves.
 *  - Grain and vignette are the last two shapes on purpose: they have to sit
 *    over everything to read as a finish on the whole image.
 */

/**
 * The bike is 78 units axle-to-axle in its own space; at 1.28 that is ~100
 * units in the 800-wide scene — readable on the road without eating the
 * frame. Changing it here moves nothing else — but the wheel-spin period
 * in globals.css is derived from it, so the two have to change together
 * or the wheels start slipping.
 */
const BIKE_SCALE = 1.28;

type NetNode = { x: number; y: number; r: number };

/**
 * Four nodes per cloud, placed from puff geometry so the net is the cloud
 * silhouette. Deterministic for SSR. There is no sky graph outside clouds.
 */
function networkOnCloud(puffs: CloudShape['puffs']): { nodes: NetNode[]; links: [number, number][] } {
  /**
   * Four nodes on the puff silhouette — left, peak, right, core — wired into
   * a small star. That is the whole net: enough to read as a network, not a
   * constellation. Puff count only places the four points; it does not add
   * more of them.
   */
  const leftP = puffs.reduce((a, b) => (a.dx - a.rx < b.dx - b.rx ? a : b));
  const rightP = puffs.reduce((a, b) => (a.dx + a.rx > b.dx + b.rx ? a : b));
  const peakP = puffs.reduce((a, b) => (a.dy - a.ry < b.dy - b.ry ? a : b));
  const cx = puffs.reduce((s, p) => s + p.dx, 0) / puffs.length;
  const cy = puffs.reduce((s, p) => s + p.dy, 0) / puffs.length;

  const nodes: NetNode[] = [
    { x: leftP.dx - leftP.rx * 0.55, y: leftP.dy - leftP.ry * 0.15, r: 2.3 },
    { x: peakP.dx, y: peakP.dy - peakP.ry * 0.62, r: 2.7 },
    { x: rightP.dx + rightP.rx * 0.55, y: rightP.dy - rightP.ry * 0.12, r: 2.2 },
    { x: cx, y: cy + 2, r: 1.9 },
  ];
  const links: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 3],
    [1, 3],
    [2, 3],
  ];
  return { nodes, links };
}

function Cloud({
  cloud,
  tint,
  breatheDelay,
  breatheDur,
  puffBlur,
  emphasis,
}: {
  cloud: CloudShape;
  tint: string;
  breatheDelay: string;
  breatheDur: string;
  puffBlur: string;
  emphasis: boolean;
}) {
  /**
   * Soft volume underneath, then a neural net that follows the puff
   * silhouette and sits on its surface. Both share scene-cloud-breathe, so
   * the net is the cloud rather than a graph pasted beside it.
   */
  const { nodes, links } = networkOnCloud(cloud.puffs);

  return (
    <g transform={`translate(${cloud.x} ${cloud.y}) scale(${cloud.scale})`}>
      <g
        className="scene-cloud-breathe"
        style={{ animationDelay: breatheDelay, animationDuration: breatheDur }}
      >
        <g filter={puffBlur} opacity="0.5">
          {cloud.puffs.map((p, i) => (
            <ellipse key={`halo-${i}`} cx={p.dx} cy={p.dy} rx={p.rx} ry={p.ry} fill={tint} />
          ))}
        </g>
        <g opacity="0.72">
          {cloud.puffs.map((p, i) => (
            <ellipse key={`body-${i}`} cx={p.dx} cy={p.dy} rx={p.rx} ry={p.ry} fill={tint} />
          ))}
        </g>
        <g
          className="scene-net-wires"
          stroke="var(--scene-wire)"
          strokeWidth={emphasis ? 1.2 : 0.85}
          fill="none"
          strokeLinecap="round"
          filter="url(#net-glow)"
        >
          {links.map(([a, b], i) => (
            <line
              key={i}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              className="scene-net-wire"
              style={{ animationDelay: `${(i % 6) * 0.55}s` }}
            />
          ))}
        </g>
        <g filter="url(#star-glow)" className="scene-node-glow" fill="var(--scene-node)">
          {nodes.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r={n.r * 1.75} />
          ))}
        </g>
        <g fill="var(--scene-node)">
          {nodes.map((n, i) => (
            <circle
              key={i}
              cx={n.x}
              cy={n.y}
              r={n.r}
              className="scene-net-node"
              style={{ animationDelay: `${(i % 5) * 0.4}s` }}
            />
          ))}
        </g>
      </g>
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
  emphasis,
}: {
  clouds: CloudShape[];
  tint: string;
  opacity: number;
  blur: string;
  animationClass: string;
  emphasis: boolean;
}) {
  return (
    <g opacity={opacity} className={animationClass}>
      {[0, 800].map((offset) => (
        <g key={offset} transform={`translate(${offset} 0)`}>
          {clouds.map((c) => (
            <Cloud
              key={c.x}
              cloud={c}
              tint={tint}
              breatheDelay={`${-((c.x / 80) % 9)}s`}
              breatheDur={`${12 + (c.x % 7)}s`}
              puffBlur={blur}
              emphasis={emphasis}
            />
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
 * which is roughly what a litre sportbike actually measures.
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
 *  - A full-face helmet sitting ABOVE the tank and bars (shell, chin bar,
 *    visor, highlight), plus a contrasting jacket so the rider does not
 *    merge into the bodywork, with gloves and boots in a tucked posture.
 *
 * Everything that spins or bounces is its own group so the CSS can drive it
 * independently; see scene-wheel / scene-suspension / scene-rider-body.
 */
function Rider() {
  /** Two chords = four spoke arms — enough to read spin without clutter. */
  const spokes = [0, 90];

  const wheel = (cx: number, delay: string) => (
    <g className="scene-wheel" style={{ animationDelay: delay }}>
      <circle cx={cx} cy={-14} r="14" fill="none" stroke="var(--scene-rider)" strokeWidth="5.5" />
      <circle cx={cx} cy={-14} r="9.5" fill="none" stroke="var(--scene-rim)" strokeWidth="2" />
      {spokes.map((a) => (
        <line
          key={a}
          x1={cx - 8 * Math.cos((a * Math.PI) / 180)}
          y1={-14 - 8 * Math.sin((a * Math.PI) / 180)}
          x2={cx + 8 * Math.cos((a * Math.PI) / 180)}
          y2={-14 + 8 * Math.sin((a * Math.PI) / 180)}
          stroke="var(--scene-rim)"
          strokeWidth="2.2"
        />
      ))}
      <circle cx={cx + 7} cy={-14} r="1.3" fill="var(--scene-lamp)" opacity="0.85" />
      <circle cx={cx} cy={-14} r="2.8" fill="var(--scene-rim)" />
    </g>
  );

  return (
    <g className="scene-rider">
      <g className="scene-chassis">
        <g transform={`scale(${BIKE_SCALE})`}>
          <path d="M50 -34 L170 -10 L170 24 L48 -20 Z" fill="url(#beam)" className="scene-beam" />

          <g stroke="var(--scene-rider)" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round">
            {[-32, -20].map((dy, i) => (
              <line
                key={dy}
                x1="-68"
                y1={dy}
                x2="-50"
                y2={dy}
                className="scene-motion-line"
                style={{ animationDelay: `${i * 0.18}s` }}
              />
            ))}
          </g>

          <g transform="translate(-36 -18)">
            {[0, 0.7].map((d) => (
              <circle
                key={d}
                r="4.5"
                fill="var(--scene-rider)"
                opacity="0.18"
                className="scene-exhaust"
                style={{ animationDelay: `${d}s` }}
              />
            ))}
          </g>

          <g transform="translate(-30 0)" fill="var(--scene-snow-hi)">
            {[0, 0.4].map((d) => (
              <circle key={d} r="2.4" className="scene-spray" style={{ animationDelay: `${d}s` }} />
            ))}
          </g>

          {/* Rear swingarm + shock — one solid shape each */}
          <path d="M-6 -28 L-32 -17 L-32 -9 L-6 -19 Z" fill="var(--scene-engine)" />
          <line x1="-8" y1="-26" x2="-2" y2="-42" stroke="var(--scene-rim)" strokeWidth="3.5" strokeLinecap="round" />
          {wheel(-30, "0s")}

          {/* Exhaust can */}
          <path d="M-4 -22 q-18 3 -32 6" fill="none" stroke="var(--scene-rim)" strokeWidth="5" strokeLinecap="round" />

          {/* Engine block — one mass */}
          <path d="M-16 -36 h22 l8 10 l-2 10 q-8 4 -20 3 l-10 -4 z" fill="var(--scene-engine)" />

          {/* Tail + seat + tank — bike body only, cool slate, no rider colour */}
          <path d="M-40 -50 L-16 -52 l2 10 q-14 3 -24 1 z" fill="var(--scene-fairing)" />
          <path d="M-40 -49.5 l5 0 l1 4 l-5 0.5 z" fill="var(--scene-lamp)" opacity="0.8" />
          <path d="M-18 -51 q12 -1 18 -6 l3 8 q-10 4 -19 5 z" fill="var(--scene-fairing)" />
          <path
            d="M0 -50 q14 -5 26 -2 q8 2 12 8 l1 8 q-12 6 -26 5 l-14 -1 q-3 -7 1 -15 z"
            fill="var(--scene-fairing)"
          />
          <path
            d="M4 -48 q12 -2 22 4"
            fill="none"
            stroke="var(--scene-tank-hi)"
            strokeWidth="2"
            strokeOpacity="0.5"
            strokeLinecap="round"
          />
          <path d="M8 -34 q14 2 18 12 l-3 6 q-12 -6 -22 -5 z" fill="var(--scene-fairing)" />

          {/* Front forks + fender + wheel — metal, not rider-coloured */}
          <g className="scene-suspension">
            <line x1="30" y1="-14" x2="42" y2="-50" stroke="var(--scene-rim)" strokeWidth="4" strokeLinecap="round" />
            <line x1="26" y1="-15" x2="38" y2="-49" stroke="var(--scene-engine)" strokeWidth="3.2" strokeLinecap="round" opacity="0.85" />
            <path d="M16 -28 q16 -10 30 -1 l-2 5 q-13 -7 -26 1 z" fill="var(--scene-fairing)" />
            {wheel(30, "-0.35s")}
          </g>

          {/* Nose + screen + headlight + bars */}
          <path d="M18 -58 q18 1 26 12 l3 10 l-12 3 q-8 -12 -19 -15 z" fill="var(--scene-fairing)" />
          <path d="M16 -58 q11 -7 20 -1 l2 5 q-10 -4 -19 1 z" fill="var(--scene-engine)" opacity="0.55" />
          <circle cx="44" cy="-36" r="7.5" fill="var(--scene-lamp)" className="scene-lamp-glow" />
          <ellipse cx="43" cy="-35" rx="5.5" ry="4" fill="var(--scene-lamp)" className="scene-lamp" />
          <line x1="22" y1="-46" x2="36" y2="-49" stroke="var(--scene-rim)" strokeWidth="3.2" strokeLinecap="round" />

          {/*
            Rider sits ON the bike, not painted into it.
            Warm rust jacket + cream helmet vs cool slate bodywork, so the
            human silhouette stays readable: helmeted head above the tank
            and bars, torso on the seat, arms and legs as their own strokes.
          */}
          <g className="scene-rider-body">
            {/* Boot on the rearset — clear of the swingarm */}
            <path d="M-15 -21 L-1 -16.5 L0.5 -13.5 L-15 -16 Z" fill="var(--scene-boot)" />
            {/* Shin */}
            <path d="M-11 -18 L-3 -34" stroke="var(--scene-boot)" strokeWidth="5.2" fill="none" strokeLinecap="round" />
            {/* Thigh — dark pants, above the engine, not the fairing colour */}
            <path d="M-3 -34 L-15 -50" stroke="var(--scene-rider)" strokeWidth="6.8" fill="none" strokeLinecap="round" />
            {/* Hip on the seat */}
            <ellipse cx="-15" cy="-50" rx="5.2" ry="4" fill="var(--scene-rider)" />

            {/* Jacket torso — compact, tucked, underside clears the tank spine */}
            <path
              d="M-19 -49
                 C-23 -58 -16 -70 -5 -74
                 C6 -78 16 -74 17 -66
                 C17.5 -62 12 -59 6 -58
                 C-2 -61 -9 -57 -13 -52
                 C-15 -50 -17 -49 -19 -49 Z"
              fill="var(--scene-jacket)"
              stroke="var(--scene-jacket-edge)"
              strokeWidth="0.9"
            />

            {/* Upper arm, then forearm to the clip-ons; gap under the helmet */}
            <path d="M5 -66 L18 -54" stroke="var(--scene-jacket)" strokeWidth="6.2" fill="none" strokeLinecap="round" />
            <path d="M18 -54 L30 -47" stroke="var(--scene-jacket)" strokeWidth="5" fill="none" strokeLinecap="round" />
            <ellipse cx="31" cy="-47" rx="3.5" ry="2.4" fill="var(--scene-boot)" transform="rotate(-16 31 -47)" />

            {/* Collar — dark band so the black helmet separates from the red shirt */}
            <ellipse cx="9" cy="-71" rx="2.5" ry="1.9" fill="var(--scene-rider)" />

            {/* Racing full-face helmet ABOVE the tank and bars */}
            <g transform="translate(12.5 -80) scale(0.84) rotate(10)">
              {/* Shell — black with a light rim so it is not a solid blob */}
              <ellipse
                cx="4"
                cy="-2"
                rx="14"
                ry="15.5"
                fill="var(--scene-helmet)"
                stroke="var(--scene-helmet-edge)"
                strokeWidth="1.15"
              />
              {/* Soft highlight on the crown */}
              <path
                d="M-4 -12 C2 -17 12 -15 14 -7"
                fill="none"
                stroke="var(--scene-rim)"
                strokeWidth="1.6"
                strokeLinecap="round"
                opacity="0.55"
              />
              {/* Chin bar under the visor, forward */}
              <path
                d="M6 6 C11 7 16 9 15.5 12.5 C14.5 15.5 7 16 3.5 13.5 C2 11.5 3.5 7 6 6 Z"
                fill="var(--scene-helmet)"
                stroke="var(--scene-helmet-edge)"
                strokeWidth="0.8"
              />
              {/* Small rear spoiler */}
              <path
                d="M-10 -4 L-14.5 -9 L-12 -9.5 L-8.5 -5 Z"
                fill="var(--scene-helmet)"
                stroke="var(--scene-helmet-edge)"
                strokeWidth="0.65"
                strokeLinejoin="round"
              />
              {/* Forward-facing visor (toward travel / +X) — tinted glass, not a black block */}
              <path
                d="M3 -9
                   C9 -12.5 15.5 -9.5 16.5 -1.5
                   C16.5 3 12 6.5 6 6
                   C2 5.5 1 -1 1.5 -5
                   C1.8 -7.2 2 -8.2 3 -9 Z"
                fill="var(--scene-visor)"
                stroke="var(--scene-helmet-edge)"
                strokeWidth="0.6"
                opacity="0.92"
              />
              {/* Visor glint along the forward curve */}
              <path
                d="M5 -8 C10 -10.5 14.5 -7.5 15.5 -2"
                fill="none"
                stroke="var(--scene-tank-hi)"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.9"
                className="scene-visor-glint"
              />
              {/* Visor hinge at the temple */}
              <circle cx="2" cy="0" r="1.4" fill="var(--scene-rim)" stroke="var(--scene-helmet-edge)" strokeWidth="0.35" />
            </g>
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
        aria-label="A motorcyclist riding a winter road under clouds drawn as neural networks."
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
          <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--scene-lamp)" stopOpacity="0.5" />
            <stop offset="55%" stopColor="var(--scene-lamp)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="var(--scene-lamp)" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="vignette" cx="50%" cy="42%" r="75%">
            <stop offset="55%" stopColor="black" stopOpacity="0" />
            <stop offset="100%" stopColor="black" stopOpacity="0.22" />
          </radialGradient>
          <filter id="soften" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.6" />
          </filter>
          <filter id="cloud-blur-far" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
          <filter id="cloud-blur-near" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
          <filter id="star-glow" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
          <filter id="net-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="1.3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          </filter>
        </defs>

        <rect width="800" height="420" fill="url(#sky)" />

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
          opacity={0.72}
          blur="url(#cloud-blur-far)"
          animationClass="scene-cloud-far"
          emphasis={false}
        />

        <path d={LIGHTNING_BOLT} fill="var(--scene-bolt)" className="scene-bolt" />
        <rect width="800" height="420" fill="var(--scene-bolt)" className="scene-bolt-flash" />

        <path
          d="M0 250 L90 208 L165 240 L250 190 L330 236 L420 196 L510 242 L600 205 L690 244 L800 214 L800 420 L0 420 Z"
          fill="var(--scene-ridge-far)"
          filter="url(#soften)"
        />

        <CloudLayer
          clouds={CLOUDS_NEAR}
          tint="var(--scene-cloud-near)"
          opacity={0.82}
          blur="url(#cloud-blur-near)"
          animationClass="scene-cloud-near"
          emphasis={true}
        />

        <path
          d="M0 292 L110 258 L210 288 L300 250 L400 290 L500 256 L610 292 L720 262 L800 288 L800 420 L0 420 Z"
          fill="var(--scene-ridge-near)"
        />

        <g fill="var(--scene-tree)">
          {[60, 148, 236, 352, 468, 566, 664, 752].map((x, i) => (
            <g key={x} className="scene-tree" style={{ animationDelay: `${i * 0.4}s` }}>
              <path d={`M${x} 300 l-11 26 h22 z`} />
              <path d={`M${x} 286 l-9 22 h18 z`} />
              <rect x={x - 1.5} y="324" width="3" height="8" />
            </g>
          ))}
        </g>

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
        />

        <Rider />

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

        <rect width="800" height="420" filter="url(#grain)" opacity="0.05" style={{ mixBlendMode: 'overlay' }} />
        <rect width="800" height="420" fill="url(#vignette)" />
      </svg>
    </div>
  );
}