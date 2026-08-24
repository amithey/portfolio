import { Frame, ink } from './Frame';
import { hueForInterest } from './palette';

/**
 * A small illustrated icon per hobby on the About page — the same hand-drawn,
 * hue-tinted language as the project covers, at icon scale. Each one is a tiny
 * scene of the thing itself, not a stock glyph: the motorcycle actually leans
 * into a turn, the code brackets actually blink a cursor.
 *
 * Icons are square (0 0 120 120) so the card grid can be perfectly regular.
 */

function MotorcycleIcon() {
  // Riding right. Rear wheel/exhaust trail behind on the left, front
  // wheel/headlight lead on the right — every animation reinforces that one
  // direction instead of just bobbing in place.
  const spokeAngles = [0, 72, 144, 216, 288];
  const exhaustPuffs = [0, 0.4, 0.8];
  const speedLines = [
    { y: 74, delay: 0 },
    { y: 84, delay: 0.35 },
    { y: 94, delay: 0.15 },
  ];

  return (
    <Frame id="interest-motorcycles" hue={hueForInterest('Motorcycles')} viewBox="0 0 120 120">
      {/* Road, streaming past beneath the bike. */}
      <line
        x1="4"
        y1="100"
        x2="116"
        y2="100"
        stroke={ink}
        strokeOpacity="0.22"
        strokeWidth="2"
        strokeDasharray="7 7"
        className="scene-roadline"
      />

      {/* Speed lines behind the rear wheel — the clearest "moving" cue. */}
      <g stroke={ink} strokeOpacity="0.4" strokeWidth="2.2" strokeLinecap="round">
        {speedLines.map((s) => (
          <line
            key={s.y}
            x1="2"
            y1={s.y}
            x2="14"
            y2={s.y}
            className="icon-speedline"
            style={{ animationDelay: `${s.delay}s` }}
          />
        ))}
      </g>

      <g className="icon-ride">
        {/* Exhaust puffs, spawning at the rear and drifting back and up. */}
        <g transform="translate(20 88)">
          {exhaustPuffs.map((delay) => (
            <circle
              key={delay}
              r="3"
              fill={ink}
              fillOpacity="0.28"
              className="icon-exhaust"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </g>

        {/* Rear wheel — fixed to the body, no independent suspension. */}
        <g className="icon-wheel">
          <circle cx="30" cy="84" r="13" fill="none" stroke={ink} strokeOpacity="0.65" strokeWidth="3.2" />
          {spokeAngles.map((a) => (
            <line
              key={a}
              x1="30"
              y1="84"
              x2={30 + 11 * Math.cos((a * Math.PI) / 180)}
              y2={84 + 11 * Math.sin((a * Math.PI) / 180)}
              stroke={ink}
              strokeOpacity="0.4"
              strokeWidth="1.4"
            />
          ))}
        </g>
        <path d="M20 90 a13 4 0 0 1 20 0" fill="none" stroke={ink} strokeOpacity="0.35" strokeWidth="2.4" />

        {/* Frame, tank and seat. */}
        <path
          d="M30 84 L48 62 L70 60 L88 84"
          stroke={ink}
          strokeOpacity="0.7"
          strokeWidth="3.2"
          fill="none"
          strokeLinejoin="round"
        />
        <path d="M42 60 q13 -9 26 -1 l-3 7 h-21 z" fill="hsl(var(--h) 70% 55% / 0.65)" />
        <path d="M36 63 q6 -5 12 -2 l-2 5 h-8 z" fill={ink} fillOpacity="0.5" />

        {/* Front fork and wheel — bounces slightly out of sync with the
            body, the way a real suspension would. */}
        <g className="icon-fork">
          <path d="M70 60 L88 84" stroke={ink} strokeOpacity="0.7" strokeWidth="3" fill="none" />
          <path d="M84 58 L92 50" stroke={ink} strokeOpacity="0.75" strokeWidth="3" strokeLinecap="round" />
          <g className="icon-wheel" style={{ animationDelay: '-0.3s' }}>
            <circle cx="88" cy="84" r="13" fill="none" stroke={ink} strokeOpacity="0.65" strokeWidth="3.2" />
            {spokeAngles.map((a) => (
              <line
                key={a}
                x1="88"
                y1="84"
                x2={88 + 11 * Math.cos((a * Math.PI) / 180)}
                y2={84 + 11 * Math.sin((a * Math.PI) / 180)}
                stroke={ink}
                strokeOpacity="0.4"
                strokeWidth="1.4"
              />
            ))}
          </g>
          <path d="M78 90 a13 4 0 0 1 20 0" fill="none" stroke={ink} strokeOpacity="0.35" strokeWidth="2.4" />

          {/* Headlight — a small beam fanning out ahead of the front wheel. */}
          <path d="M94 66 L118 58 L118 76 Z" fill="hsl(var(--h) 85% 70% / 0.3)" className="art-pulse" />
          <circle cx="94" cy="66" r="3.4" fill="hsl(var(--h) 85% 65% / 0.9)" />
        </g>

        {/* Rider, leaning forward over the tank. */}
        <path
          d="M50 60 q4 -16 14 -20 q8 -3 11 2"
          stroke={ink}
          strokeOpacity="0.8"
          strokeWidth="3.6"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M52 62 L46 76" stroke={ink} strokeOpacity="0.7" strokeWidth="3.2" strokeLinecap="round" />
        <circle cx="88" cy="36" r="6.5" fill={ink} fillOpacity="0.8" />
        <path d="M91 32 q4 1 4 5" stroke="hsl(var(--h) 85% 70% / 0.7)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </g>
    </Frame>
  );
}

function AIIcon() {
  const nodes: [number, number][] = [
    [34, 40],
    [86, 32],
    [30, 84],
    [88, 82],
    [60, 60],
  ];
  const edges: [number, number][] = [
    [0, 4],
    [1, 4],
    [2, 4],
    [3, 4],
    [0, 1],
    [2, 3],
  ];

  return (
    <Frame id="interest-ai" hue={hueForInterest('AI')} viewBox="0 0 120 120">
      <g stroke={ink} strokeOpacity="0.3" strokeWidth="1.4">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
            className="scene-synapse"
            // Duration varies slightly too, not just delay — identical periods
            // eventually resynchronise and the network briefly pulses as one,
            // which reads as mechanical rather than "thinking".
            style={{ animationDelay: `${i * 0.35}s`, animationDuration: `${5.2 + (i % 3) * 0.6}s` }}
          />
        ))}
      </g>
      {nodes.map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={i === 4 ? 6 : 4.4}
          fill={`hsl(var(--h) 80% 60% / ${i === 4 ? 0.9 : 0.7})`}
          className="scene-node"
          style={{ animationDelay: `${i * 0.5}s`, animationDuration: `${3.8 + (i % 4) * 0.4}s` }}
        />
      ))}
    </Frame>
  );
}

function CodeIcon() {
  // Three lines "typing" in under the brackets — reuses the same fill-from-
  // left motion the tax-report cover uses for its form rows.
  const lines = [
    { y: 50, w: 20 },
    { y: 60, w: 30 },
    { y: 70, w: 14 },
  ];

  return (
    <Frame id="interest-code" hue={hueForInterest('Code')} viewBox="0 0 120 120">
      <g className="art-float">
        <path
          d="M44 30 L20 60 L44 90"
          stroke={ink}
          strokeOpacity="0.75"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M76 30 L100 60 L76 90"
          stroke={ink}
          strokeOpacity="0.75"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {lines.map((l, i) => (
        <rect
          key={l.y}
          x="50"
          y={l.y}
          width={l.w}
          height="4"
          rx="2"
          fill="hsl(var(--h) 70% 55% / 0.55)"
          className="art-fill"
          style={{ animationDelay: `${i * 0.5}s`, animationDuration: '3s' }}
        />
      ))}
      {/* Blinks at the end of the line currently "typing". */}
      <rect
        x={50 + lines[2].w + 3}
        y={lines[2].y - 1}
        width="3.5"
        height="6"
        rx="1"
        fill="hsl(var(--h) 85% 60% / 0.9)"
        className="icon-caret"
        style={{ animationDelay: '1s' }}
      />
    </Frame>
  );
}

function StocksIcon() {
  const candles = [
    { x: 20, y: 78, h: 20, up: false },
    { x: 38, y: 66, h: 30, up: true },
    { x: 56, y: 72, h: 22, up: false },
    { x: 74, y: 50, h: 44, up: true },
    { x: 92, y: 34, h: 54, up: true },
  ];

  return (
    <Frame id="interest-stocks" hue={hueForInterest('Stocks')} viewBox="0 0 120 120">
      {candles.map((c, i) => (
        <g
          key={c.x}
          className="art-grow"
          style={{ animationDelay: `${i * 0.12}s`, transformOrigin: 'center bottom' }}
        >
          <line
            x1={c.x + 4}
            y1={c.y - 6}
            x2={c.x + 4}
            y2={c.y + c.h + 6}
            stroke={ink}
            strokeOpacity="0.35"
            strokeWidth="1.4"
          />
          <rect
            x={c.x}
            y={c.y}
            width="8"
            height={c.h}
            rx="2"
            fill={c.up ? 'hsl(var(--h) 70% 50% / 0.85)' : 'hsl(var(--h) 15% 55% / 0.35)'}
          />
        </g>
      ))}

      {/* A trend line drawing itself in above the candles it's plotted from. */}
      <path
        d="M18 92 L42 70 L60 76 L78 44 L98 22"
        stroke="hsl(var(--h) 80% 55% / 0.75)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="icon-draw"
        style={{ '--path-len': 122 } as React.CSSProperties}
      />
      <path d="M98 22 l-11 1 l6 10 z" fill="hsl(var(--h) 85% 60% / 0.9)" className="art-pulse" />
    </Frame>
  );
}

const ICONS: Record<string, () => React.JSX.Element> = {
  Motorcycles: MotorcycleIcon,
  AI: AIIcon,
  Code: CodeIcon,
  Stocks: StocksIcon,
};

/** Fallback for any interest that doesn't have a drawing of its own yet. */
function DefaultIcon({ label }: { label: string }) {
  const hue = hueForInterest(label);
  const initial = label[0]?.toUpperCase() ?? '?';

  return (
    <Frame id={`interest-${label}`} hue={hue} viewBox="0 0 120 120">
      <text
        x="60"
        y="76"
        textAnchor="middle"
        fontSize="42"
        fontWeight="600"
        fill={ink}
        fillOpacity="0.4"
        fontFamily="var(--font-plex-mono), monospace"
        className="art-breathe"
        style={{ transformOrigin: '60px 60px' }}
      >
        {initial}
      </text>
    </Frame>
  );
}

export function InterestArt({ label }: { label: string }) {
  const Icon = ICONS[label];
  return Icon ? <Icon /> : <DefaultIcon label={label} />;
}
