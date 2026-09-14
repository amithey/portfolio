import { ImageResponse } from 'next/og';

/**
 * Replaces Next.js's default favicon.ico (the black-circle Next logo — never
 * anything of Amit's) with a monogram in the site's own identity colour.
 *
 * Ink, not signal: the design system reserves --signal for interaction only
 * (see globals.css's opening comment), so the mark uses the same dark-ink
 * (#1b2430) the hero rider and body text are drawn in, not the blue.
 */
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1b2430',
          color: '#fbfcfd',
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: -0.5,
        }}
      >
        AH
      </div>
    ),
    { ...size },
  );
}
