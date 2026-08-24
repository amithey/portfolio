import { hueFor } from './palette';

/**
 * Hand-drawn cover art, one scene per project.
 *
 * These are not screenshots and are not trying to be — each is a small diagram
 * of what the project actually is (a pong table, a candlestick chart, an island
 * map), so a tile is recognisable at a glance and stays sharp at any size.
 *
 * Everything animates through CSS classes defined in globals.css, which keeps
 * this a server component and lets the one global prefers-reduced-motion rule
 * switch all of it off at once.
 */

function Frame({ slug, children }: { slug: string; children: React.ReactNode }) {
  const hue = hueFor(slug);
  const id = `art-${slug}`;

  return (
    <svg
      viewBox="0 0 320 200"
      role="img"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      style={{ '--h': hue } as React.CSSProperties}
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={`hsl(${hue} 70% 55% / 0.30)`} />
          <stop offset="55%" stopColor={`hsl(${(hue + 40) % 360} 70% 50% / 0.13)`} />
          <stop offset="100%" stopColor={`hsl(${(hue + 80) % 360} 70% 45% / 0.05)`} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor={`hsl(${hue} 90% 65% / 0.35)`} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      <rect width="320" height="200" fill={`url(#${id}-bg)`} />
      <ellipse
        cx="160"
        cy="95"
        rx="150"
        ry="90"
        fill={`url(#${id}-glow)`}
        className="art-breathe"
        style={{ transformOrigin: '160px 95px' }}
      />
      {children}
    </svg>
  );
}

/** Strokes follow the tile's text colour, so every scene works in both themes. */
const ink = 'currentColor';

/* ------------------------------------------------------------------ */

function WebGamesArt() {
  // A wall of uploaded games, with one of them playing.
  const cards = [
    { x: 26, y: 30, d: '0s' },
    { x: 128, y: 18, d: '.5s' },
    { x: 230, y: 30, d: '1s' },
    { x: 26, y: 118, d: '.8s' },
    { x: 230, y: 118, d: '.3s' },
  ];

  return (
    <Frame slug="web-games">
      {cards.map((c) => (
        <g key={`${c.x}-${c.y}`} className="art-float" style={{ animationDelay: c.d }}>
          <rect
            x={c.x}
            y={c.y}
            width="64"
            height="50"
            rx="7"
            fill="hsl(var(--h) 60% 55% / 0.18)"
            stroke={ink}
            strokeOpacity="0.28"
          />
          <circle cx={c.x + 32} cy={c.y + 20} r="7" fill={ink} fillOpacity="0.22" />
          <rect x={c.x + 17} y={c.y + 34} width="30" height="4" rx="2" fill={ink} fillOpacity="0.3" />
        </g>
      ))}

      <g className="art-lift">
        <rect
          x="116"
          y="94"
          width="88"
          height="66"
          rx="9"
          fill="hsl(var(--h) 75% 58% / 0.42)"
          stroke={ink}
          strokeOpacity="0.5"
        />
        <path d="M150 114 l22 13 -22 13 z" fill={ink} fillOpacity="0.85" className="art-pulse" />
      </g>
    </Frame>
  );
}

function BotTradeArt() {
  // Candles, and the retrieval graph reasoning above them.
  const candles = [
    { x: 34, y: 118, h: 34, up: false },
    { x: 62, y: 100, h: 46, up: true },
    { x: 90, y: 108, h: 30, up: false },
    { x: 118, y: 82, h: 56, up: true },
    { x: 146, y: 92, h: 38, up: false },
    { x: 174, y: 64, h: 66, up: true },
    { x: 202, y: 74, h: 48, up: true },
    { x: 230, y: 50, h: 78, up: true },
  ];
  const nodes: [number, number][] = [
    [60, 36],
    [110, 22],
    [160, 40],
    [212, 20],
  ];

  return (
    <Frame slug="bot-trade">
      {candles.map((c, i) => (
        <g key={c.x} className="art-grow" style={{ animationDelay: `${i * 0.09}s`, transformOrigin: 'center bottom' }}>
          <line
            x1={c.x + 6}
            y1={c.y - 9}
            x2={c.x + 6}
            y2={c.y + c.h + 8}
            stroke={ink}
            strokeOpacity="0.35"
            strokeWidth="1.5"
          />
          <rect
            x={c.x}
            y={c.y}
            width="12"
            height={c.h}
            rx="2"
            fill={c.up ? 'hsl(var(--h) 65% 50% / 0.85)' : 'hsl(var(--h) 15% 55% / 0.35)'}
          />
        </g>
      ))}

      <g stroke={ink} strokeOpacity="0.35" strokeWidth="1.2">
        <line x1="60" y1="36" x2="110" y2="22" />
        <line x1="110" y1="22" x2="160" y2="40" />
        <line x1="160" y1="40" x2="212" y2="20" />
      </g>
      {nodes.map(([cx, cy], i) => (
        <circle
          key={cx}
          cx={cx}
          cy={cy}
          r="5"
          fill="hsl(var(--h) 80% 60% / 0.9)"
          className="art-pulse"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
    </Frame>
  );
}

function BagStoreArt() {
  // A knitted bag, stitches and all.
  return (
    <Frame slug="bag-store">
      <g className="art-sway" style={{ transformOrigin: 'center top' }}>
        <path
          d="M126 78 v-14 a34 34 0 0 1 68 0 v14"
          fill="none"
          stroke={ink}
          strokeOpacity="0.5"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M104 76 h112 l-10 84 h-92 z"
          fill="hsl(var(--h) 65% 55% / 0.42)"
          stroke={ink}
          strokeOpacity="0.4"
          strokeWidth="2"
        />
        {[92, 108, 124, 140].map((y) => (
          <path
            key={y}
            d={`M110 ${y} q9 -7 18 0 q9 -7 18 0 q9 -7 18 0 q9 -7 18 0 q9 -7 18 0`}
            fill="none"
            stroke={ink}
            strokeOpacity="0.22"
            strokeWidth="1.6"
          />
        ))}
      </g>
    </Frame>
  );
}

function DominionArt() {
  // An island of hexes ringed by sea, flag on the headquarters.
  const hexes: [number, number][] = [
    [160, 96],
    [130, 78],
    [190, 78],
    [130, 114],
    [190, 114],
    [160, 60],
    [160, 132],
    [100, 96],
    [220, 96],
  ];
  const hex = (cx: number, cy: number) => `M${cx - 16} ${cy} l8 -12 h16 l8 12 l-8 12 h-16 z`;

  return (
    <Frame slug="dominion">
      {[0, 1].map((i) => (
        <ellipse
          key={i}
          cx="160"
          cy="100"
          rx="120"
          ry="72"
          fill="none"
          stroke={ink}
          strokeOpacity="0.18"
          className="art-ripple"
          style={{ animationDelay: `${i * 1.6}s` }}
        />
      ))}

      {hexes.map(([cx, cy], i) => (
        <path
          key={`${cx}-${cy}`}
          d={hex(cx, cy)}
          fill={`hsl(var(--h) 60% ${i === 0 ? 58 : 45}% / ${i === 0 ? 0.75 : 0.32})`}
          stroke={ink}
          strokeOpacity="0.3"
          strokeWidth="1.2"
          className="art-grow"
          style={{ animationDelay: `${i * 0.07}s`, transformOrigin: 'center' }}
        />
      ))}

      <line x1="160" y1="94" x2="160" y2="60" stroke={ink} strokeOpacity="0.7" strokeWidth="2" />
      <path
        d="M160 62 q14 6 26 0 q-12 10 0 16 q-14 6 -26 0 z"
        fill="hsl(var(--h) 80% 60% / 0.95)"
        className="art-wave"
        style={{ transformOrigin: 'left center' }}
      />
    </Frame>
  );
}

function TaxArt() {
  // A form resolving into a number.
  return (
    <Frame slug="capital-gains-tax-report-generator">
      <g className="art-lift">
        <rect
          x="58"
          y="30"
          width="122"
          height="146"
          rx="8"
          fill="hsl(var(--h) 50% 60% / 0.22)"
          stroke={ink}
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
        {[54, 72, 90, 108, 126, 144].map((y, i) => (
          <rect
            key={y}
            x="74"
            y={y}
            width={i % 3 === 0 ? 90 : 62}
            height="6"
            rx="3"
            fill={ink}
            fillOpacity="0.25"
            className="art-fill"
            style={{ animationDelay: `${i * 0.14}s` }}
          />
        ))}
      </g>

      <g className="art-float">
        <circle cx="228" cy="112" r="42" fill="hsl(var(--h) 70% 55% / 0.35)" />
        <text
          x="228"
          y="128"
          textAnchor="middle"
          fontSize="46"
          fontWeight="600"
          fill={ink}
          fillOpacity="0.8"
          fontFamily="var(--font-geist-mono), monospace"
        >
          ₪
        </text>
      </g>
    </Frame>
  );
}

function PongArt() {
  // The table, mid-rally.
  return (
    <Frame slug="pong-game">
      <rect
        x="20"
        y="22"
        width="280"
        height="156"
        rx="8"
        fill="hsl(var(--h) 40% 40% / 0.14)"
        stroke={ink}
        strokeOpacity="0.3"
      />
      <line
        x1="160"
        y1="30"
        x2="160"
        y2="170"
        stroke={ink}
        strokeOpacity="0.3"
        strokeWidth="3"
        strokeDasharray="9 11"
      />
      <rect x="34" y="66" width="9" height="48" rx="4" fill={ink} fillOpacity="0.75" className="art-paddle-l" />
      <rect x="277" y="86" width="9" height="48" rx="4" fill={ink} fillOpacity="0.75" className="art-paddle-r" />
      {/* Sits at a sensible resting spot, so it stays on the table when
          reduced motion switches the rally off. */}
      <circle cx="52" cy="44" r="7" fill="hsl(var(--h) 85% 62% / 0.95)" className="art-ball" />
    </Frame>
  );
}

function TrainArt() {
  // Endless runner: the track scrolls, the train holds its lane.
  return (
    <Frame slug="train-game">
      <g className="art-scroll">
        {/* Two identical sleeper runs, so the loop has no seam. */}
        {[0, 320].map((offset) => (
          <g key={offset} transform={`translate(${offset} 0)`}>
            {Array.from({ length: 11 }, (_, i) => (
              <rect key={i} x={i * 30} y="146" width="16" height="7" rx="2" fill={ink} fillOpacity="0.3" />
            ))}
          </g>
        ))}
      </g>
      <line x1="0" y1="142" x2="320" y2="142" stroke={ink} strokeOpacity="0.35" strokeWidth="2" />
      <line x1="0" y1="160" x2="320" y2="160" stroke={ink} strokeOpacity="0.35" strokeWidth="2" />

      <g className="art-bob">
        <rect
          x="96"
          y="86"
          width="112"
          height="50"
          rx="10"
          fill="hsl(var(--h) 70% 55% / 0.55)"
          stroke={ink}
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
        <rect x="190" y="68" width="18" height="20" rx="4" fill={ink} fillOpacity="0.4" />
        {[112, 140, 168].map((x) => (
          <rect key={x} x={x} y="98" width="20" height="16" rx="3" fill={ink} fillOpacity="0.35" />
        ))}
        <circle cx="120" cy="140" r="9" fill={ink} fillOpacity="0.55" />
        <circle cx="184" cy="140" r="9" fill={ink} fillOpacity="0.55" />
      </g>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */

const SCENES: Record<string, () => React.JSX.Element> = {
  'web-games': WebGamesArt,
  'bot-trade': BotTradeArt,
  'bag-store': BagStoreArt,
  dominion: DominionArt,
  'capital-gains-tax-report-generator': TaxArt,
  'pong-game': PongArt,
  'train-game': TrainArt,
};

/** Fallback for any project added later that has no drawing of its own yet. */
function DefaultArt({ slug, title }: { slug: string; title: string }) {
  const label = title
    .split(/[\s-]+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <Frame slug={slug}>
      <text
        x="160"
        y="118"
        textAnchor="middle"
        fontSize="56"
        fontWeight="600"
        fill={ink}
        fillOpacity="0.4"
        fontFamily="var(--font-geist-mono), monospace"
        className="art-breathe"
        style={{ transformOrigin: '160px 100px' }}
      >
        {label}
      </text>
    </Frame>
  );
}

export function ProjectArt({ slug, title }: { slug: string; title: string }) {
  const Scene = SCENES[slug];
  return Scene ? <Scene /> : <DefaultArt slug={slug} title={title} />;
}
