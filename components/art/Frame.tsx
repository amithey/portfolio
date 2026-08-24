/**
 * The tinted, glowing backdrop every hand-drawn scene sits on — project covers
 * and interest icons alike. One hue in, one consistent frame out, so a wall of
 * either reads as the same family of art.
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
          <stop offset="0%" stopColor={`hsl(${hue} 70% 55% / 0.30)`} />
          <stop offset="55%" stopColor={`hsl(${(hue + 40) % 360} 70% 50% / 0.13)`} />
          <stop offset="100%" stopColor={`hsl(${(hue + 80) % 360} 70% 45% / 0.05)`} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor={`hsl(${hue} 90% 65% / 0.35)`} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
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
      {children}
    </svg>
  );
}

/** Strokes follow the tile's text colour, so every scene works in both themes. */
export const ink = 'currentColor';
