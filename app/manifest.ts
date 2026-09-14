import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

/**
 * Lets a phone's "Add to Home Screen" use the site's own icon and colours
 * instead of a browser-generated placeholder. Icons come from icon.tsx /
 * apple-icon.tsx — no separate PNG files to keep in sync.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — developer portfolio`,
    short_name: SITE.name,
    description: SITE.headline,
    start_url: '/',
    display: 'browser',
    background_color: '#fbfcfd',
    theme_color: '#1b2430',
    icons: [
      { src: '/icon', sizes: '32x32', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
