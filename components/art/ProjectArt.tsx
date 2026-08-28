import { Frame, ink } from './Frame';
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
    <Frame id="web-games" hue={hueFor('web-games')}>
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

  /**
   * Each retrieval node sits directly above a specific candle and drops a
   * line onto its top. That anchoring is the whole point: previously the
   * graph floated at a fixed height and read as an unrelated second chart,
   * rather than as the model reading these particular bars.
   */
  const reads = [1, 3, 5, 7].map((i) => {
    const c = candles[i];
    return { cx: c.x + 6, cy: c.y - 26, candleTop: c.y - 9 };
  });

  /**
   * The price line traces every candle's own top, not just the four read
   * nodes. Connecting only the nodes used to skip candle index 6 — shorter
   * than its neighbours — so that stretch of line floated in empty space
   * above it rather than sitting on any bar. A price line has to hug the
   * bars underneath it the whole way across; only the glowing markers are
   * selective about which candles they call out.
   */
  const priceLine = candles.map((c) => ({ x: c.x + 6, y: c.y - 9 }));

  return (
    <Frame id="bot-trade" hue={hueFor('bot-trade')}>
      {candles.map((c, i) => (
        <g
          key={c.x}
          className="art-grow"
          style={{ animationDelay: `${i * 0.09}s`, transformOrigin: 'center bottom' }}
        >
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

      {/* Drop lines tying each node to the candle it reads. */}
      <g stroke={ink} strokeOpacity="0.28" strokeWidth="1" strokeDasharray="2 3">
        {reads.map((r) => (
          <line key={r.cx} x1={r.cx} y1={r.cy} x2={r.cx} y2={r.candleTop} />
        ))}
      </g>

      {/* The price line, hugging every candle's top all the way across. */}
      <g stroke={ink} strokeOpacity="0.4" strokeWidth="1.2">
        {priceLine.slice(0, -1).map((p, i) => (
          <line key={p.x} x1={p.x} y1={p.y} x2={priceLine[i + 1].x} y2={priceLine[i + 1].y} />
        ))}
      </g>

      {reads.map((r, i) => (
        <circle
          key={r.cx}
          cx={r.cx}
          cy={r.cy}
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
  // A knitted bag: soft body, visible stitch rows, and a price tag.
  return (
    <Frame id="bag-store" hue={hueFor('bag-store')}>
      <g className="art-sway" style={{ transformOrigin: 'center top' }}>
        {/* Handle, behind the body so the body reads as in front. */}
        <path
          d="M126 80 v-16 a34 34 0 0 1 68 0 v16"
          fill="none"
          stroke={ink}
          strokeOpacity="0.5"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* Body — curved sides and a rounded base, so it hangs like fabric
            rather than sitting there as a hard trapezium. */}
        <path
          d="M104 78 h112 q-4 44 -12 66 q-4 12 -16 14 h-56 q-12 -2 -16 -14 q-8 -22 -12 -66 z"
          fill="hsl(var(--h) 65% 55% / 0.45)"
          stroke={ink}
          strokeOpacity="0.4"
          strokeWidth="2"
        />
        {/* Cuff along the top opening. */}
        <path d="M104 78 h112 l-2 12 h-108 z" fill={ink} fillOpacity="0.14" />
        {/* Stitch rows, narrowing with the body as it falls. */}
        {[98, 114, 130, 146].map((y, i) => {
          const inset = 8 + i * 3;
          const step = (200 - inset * 2) / 5;
          const d = Array.from({ length: 5 }, () => `q${step / 2} -7 ${step} 0`).join(' ');
          return (
            <path
              key={y}
              d={`M${108 + inset} ${y} ${d}`}
              fill="none"
              stroke={ink}
              strokeOpacity="0.22"
              strokeWidth="1.6"
            />
          );
        })}
      </g>
      {/* Price tag on a string — says "shop", not just "bag". */}
      <g className="art-float">
        <line x1="196" y1="86" x2="212" y2="104" stroke={ink} strokeOpacity="0.35" strokeWidth="1.4" />
        <g transform="rotate(14 220 116)">
          <rect
            x="206"
            y="104"
            width="30"
            height="22"
            rx="4"
            fill="hsl(var(--h) 70% 60% / 0.75)"
            stroke={ink}
            strokeOpacity="0.3"
          />
          <circle cx="212" cy="110" r="2.4" fill={ink} fillOpacity="0.45" />
        </g>
      </g>
    </Frame>
  );
}

function DominionArt() {
  /**
   * An island of hexes ringed by sea, flag on the headquarters.
   *
   * Tiles are drawn with an extruded side wall and sorted back-to-front, so
   * the island has actual height instead of being a flat mosaic — the thing
   * that made this read as a diagram before.
   */
  const hexes = [
    { cx: 160, cy: 96, hq: true },
    { cx: 160, cy: 62, hq: false },
    { cx: 128, cy: 79, hq: false },
    { cx: 192, cy: 79, hq: false },
    { cx: 98, cy: 96, hq: false },
    { cx: 222, cy: 96, hq: false },
    { cx: 128, cy: 113, hq: false },
    { cx: 192, cy: 113, hq: false },
    { cx: 160, cy: 130, hq: false },
  ].sort((a, b) => a.cy - b.cy);

  const top = (cx: number, cy: number) => `M${cx - 17} ${cy} l8.5 -13 h17 l8.5 13 l-8.5 13 h-17 z`;
  const side = (cx: number, cy: number) =>
    `M${cx - 17} ${cy} l8.5 13 h17 l8.5 -13 v9 l-8.5 13 h-17 l-8.5 -13 z`;

  return (
    <Frame id="dominion" hue={hueFor('dominion')}>
      {/* Sea rings spreading out from the island. */}
      {[0, 1].map((i) => (
        <ellipse
          key={i}
          cx="160"
          cy="104"
          rx="122"
          ry="74"
          fill="none"
          stroke={ink}
          strokeOpacity="0.18"
          className="art-ripple"
          style={{ animationDelay: `${i * 1.6}s` }}
        />
      ))}

      {hexes.map((h, i) => (
        <g
          key={`${h.cx}-${h.cy}`}
          className="art-grow"
          style={{ animationDelay: `${i * 0.07}s`, transformOrigin: 'center' }}
        >
          {/* Shaded wall first, so the lit top sits on top of it. */}
          <path d={side(h.cx, h.cy)} fill={`hsl(var(--h) 45% 26% / 0.55)`} />
          <path
            d={top(h.cx, h.cy)}
            fill={`hsl(var(--h) 60% ${h.hq ? 62 : 46}% / ${h.hq ? 0.85 : 0.4})`}
            stroke={ink}
            strokeOpacity="0.28"
            strokeWidth="1.1"
          />
        </g>
      ))}

      {/* Headquarters flag on the centre tile. */}
      <line x1="160" y1="94" x2="160" y2="58" stroke={ink} strokeOpacity="0.75" strokeWidth="2.2" />
      <path
        d="M160 60 q14 6 26 0 q-12 10 0 16 q-14 6 -26 0 z"
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
    <Frame id="capital-gains-tax-report-generator" hue={hueFor('capital-gains-tax-report-generator')}>
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
  // The table mid-rally, with the score up top like the real thing.
  return (
    <Frame id="pong-game" hue={hueFor('pong-game')}>
      <rect
        x="20"
        y="22"
        width="280"
        height="156"
        rx="8"
        fill="hsl(var(--h) 40% 40% / 0.16)"
        stroke={ink}
        strokeOpacity="0.32"
      />
      {/* Inner court line — the detail that makes it a table, not a box. */}
      <rect
        x="29"
        y="31"
        width="262"
        height="138"
        rx="5"
        fill="none"
        stroke={ink}
        strokeOpacity="0.14"
      />
      <line
        x1="160"
        y1="38"
        x2="160"
        y2="162"
        stroke={ink}
        strokeOpacity="0.3"
        strokeWidth="3"
        strokeDasharray="9 11"
      />

      {/* Score, in the blocky style the game itself uses. */}
      <g fill={ink} fillOpacity="0.3" fontFamily="var(--font-plex-mono), monospace" fontSize="26" fontWeight="700">
        <text x="128" y="60" textAnchor="end">
          3
        </text>
        <text x="192" y="60" textAnchor="start">
          2
        </text>
      </g>

      <rect x="34" y="66" width="9" height="48" rx="4" fill={ink} fillOpacity="0.75" className="art-paddle-l" />
      <rect x="277" y="86" width="9" height="48" rx="4" fill={ink} fillOpacity="0.75" className="art-paddle-r" />

      {/* Trail behind the ball, fading back along its path. */}
      <g className="art-ball">
        <circle cx="52" cy="44" r="7" fill="hsl(var(--h) 85% 62% / 0.95)" />
        <circle cx="42" cy="44" r="5" fill="hsl(var(--h) 85% 62% / 0.4)" />
        <circle cx="34" cy="44" r="3.5" fill="hsl(var(--h) 85% 62% / 0.18)" />
      </g>
    </Frame>
  );
}

function TrainArt() {
  // Endless runner: the track scrolls, the train holds its lane.
  return (
    <Frame id="train-game" hue={hueFor('train-game')}>
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

      {/* An obstacle further down the line — this is a runner, so there has
          to be something to run at. */}
      <g className="art-scroll" style={{ animationDelay: '-1.6s' }}>
        <rect x="268" y="112" width="16" height="30" rx="3" fill={ink} fillOpacity="0.3" />
        <rect x="264" y="106" width="24" height="8" rx="2" fill={ink} fillOpacity="0.35" />
      </g>

      <g className="art-bob">
        {/* Body, with a sloped nose so it has a direction of travel. */}
        <path
          d="M96 96 q0 -10 10 -10 h74 q10 0 14 8 l10 20 q2 6 -1 12 q-2 6 -9 6 h-88 q-10 0 -10 -10 z"
          fill="hsl(var(--h) 70% 55% / 0.6)"
          stroke={ink}
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
        {/* Cab roof and chimney. */}
        <rect x="150" y="70" width="30" height="18" rx="4" fill="hsl(var(--h) 70% 50% / 0.7)" />
        <rect x="112" y="62" width="12" height="26" rx="3" fill={ink} fillOpacity="0.45" />
        {/* Smoke, drifting back off the chimney. */}
        {[0, 0.5, 1].map((d) => (
          <circle
            key={d}
            cx="118"
            cy="60"
            r="6"
            fill={ink}
            fillOpacity="0.2"
            className="art-float"
            style={{ animationDelay: `${d}s` }}
          />
        ))}
        {/* Windows. */}
        {[112, 140, 168].map((x) => (
          <rect key={x} x={x} y="100" width="20" height="16" rx="3" fill={ink} fillOpacity="0.4" />
        ))}
        {/* Wheels, with a coupling rod between them. */}
        <circle cx="120" cy="140" r="10" fill={ink} fillOpacity="0.5" />
        <circle cx="120" cy="140" r="4" fill={ink} fillOpacity="0.7" />
        <circle cx="184" cy="140" r="10" fill={ink} fillOpacity="0.5" />
        <circle cx="184" cy="140" r="4" fill={ink} fillOpacity="0.7" />
        <line x1="120" y1="144" x2="184" y2="144" stroke={ink} strokeOpacity="0.4" strokeWidth="2.5" />
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
    <Frame id={slug} hue={hueFor(slug)}>
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
