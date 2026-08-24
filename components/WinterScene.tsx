import { SNOWFLAKES, NEURONS, SYNAPSES } from './scene-data';

/**
 * The hero scene: a rider crossing a winter landscape at dusk, under a sky
 * wired like a neural net.
 *
 * Every motif here is something Amit named — motorcycles, AI, code, winter — so
 * this is a portrait rather than decoration. It is a server component: all
 * motion is CSS, which keeps it out of the JS bundle and lets the single global
 * prefers-reduced-motion rule switch the whole thing off at once.
 *
 * Deliberately cheap to run: ~28 animated nodes, transforms and opacity only,
 * so nothing here triggers layout.
 */
export function WinterScene() {
  return (
    <div className="scene relative overflow-hidden rounded-xl border border-line bg-surface-sunken">
      <svg
        viewBox="0 0 800 420"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="A motorcyclist riding through a snowy landscape at dusk, beneath a sky drawn as a neural network."
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
        </defs>

        <rect width="800" height="420" fill="url(#sky)" />

        {/* Sky as a neural network — the AI half of the portrait. */}
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
          <g fill="var(--scene-rider)">
            {/* wheels */}
            <circle cx="-16" cy="4" r="8.5" fill="none" stroke="var(--scene-rider)" strokeWidth="2.4" />
            <circle cx="14" cy="4" r="8.5" fill="none" stroke="var(--scene-rider)" strokeWidth="2.4" />
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

        {/* Snow, in front of everything. */}
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
      </svg>
    </div>
  );
}
