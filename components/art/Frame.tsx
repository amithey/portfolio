/**
 * The tinted, glowing backdrop every hand-drawn scene sits on — project covers
 * and interest icons alike. One hue in, one consistent frame out, so a wall of
 * either reads as the same family of art.
 *
 * The layers, bottom to top, are what give a flat SVG some depth:
 *  1. a diagonal hue wash
 *  2. a breathing radial glow behind the subject
 *  3. a soft floor shadow, so the subject sits on something
 *  4. the scene itself
 *  5. grain and a vignette, matching the finish on the hero illustration
 *
 * Every gradient and filter id is namespaced with `id` because these render
 * many-to-a-page — SVG ids are global, and a collision means one card
 * silently borrows another's gradient.
 */
export function Frame({
  id,
  hue,
  viewBox = '0 0 320 200',
  children,
}: {
  id: string;
  hue: number;
  viewBox?: string;
  children: React.ReactNode;
}) {
  const [, , w, h] = viewBox.split(' ').map(Number);
  const cx = w / 2;
  const cy = h * 0.475;

  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      style={{ '--h': hue } as React.CSSProperties}
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={`hsl(${hue} 70% 55% / 0.32)`} />
          <stop offset="55%" stopColor={`hsl(${(hue + 40) % 360} 70% 50% / 0.14)`} />
          <stop offset="100%" stopColor={`hsl(${(hue + 80) % 360} 70% 45% / 0.05)`} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor={`hsl(${hue} 90% 65% / 0.4)`} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id={`${id}-floor`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={`hsl(${hue} 40% 20% / 0.3)`} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id={`${id}-vignette`} cx="50%" cy="45%" r="72%">
          <stop offset="58%" stopColor="black" stopOpacity="0" />
          <stop offset="100%" stopColor="black" stopOpacity="0.16" />
        </radialGradient>
        <filter id={`${id}-grain`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
      </defs>

      <rect width={w} height={h} fill={`url(#${id}-bg)`} />
      <ellipse
        cx={cx}
        cy={cy}
        rx={w * 0.47}
        ry={h * 0.45}
        fill={`url(#${id}-glow)`}
        className="art-breathe"
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
      {/* Contact shadow — the cheapest way to stop the subject floating. */}
      <ellipse cx={cx} cy={h * 0.86} rx={w * 0.34} ry={h * 0.07} fill={`url(#${id}-floor)`} />

      {children}

      <rect
        width={w}
        height={h}
        filter={`url(#${id}-grain)`}
        opacity="0.05"
        style={{ mixBlendMode: 'overlay' }}
      />
      <rect width={w} height={h} fill={`url(#${id}-vignette)`} />
    </svg>
  );
}

/** Strokes follow the tile's text colour, so every scene works in both themes. */
export const ink = 'currentColor';
