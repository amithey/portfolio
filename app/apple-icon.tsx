import { ImageResponse } from 'next/og';

/** Same mark as icon.tsx, at the size iOS wants for "Add to Home Screen". */
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
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
          fontSize: 84,
          fontWeight: 700,
          letterSpacing: -2,
        }}
      >
        AH
      </div>
    ),
    { ...size },
  );
}
