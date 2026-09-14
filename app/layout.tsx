import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { SITE } from '@/lib/site';
import { ABOUT } from '@/data/about';
import { Header } from '@/components/Header';
import { AmbientBackdrop } from '@/components/AmbientBackdrop';
import { ScrollManager } from '@/components/ScrollManager';

/**
 * Person structured data, built from the same SITE/ABOUT objects the page
 * renders from — so this can't drift out of sync with what's actually on
 * the page the way a hand-typed JSON-LD block would.
 */
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE.name,
  url: SITE.url,
  email: `mailto:${SITE.email}`,
  jobTitle: ABOUT.role,
  ...(ABOUT.location ? { address: ABOUT.location } : {}),
  sameAs: [SITE.github, SITE.linkedin],
};

/**
 * Every visit starts at the top.
 *
 * Runs before first paint, as the first thing in <body>, because by the time
 * React hydrates the browser has already done the damage: it has jumped to
 * whatever `#section` is left in the URL, or restored the scroll position
 * from last time — which on a phone was the bottom of the page. Clearing the
 * hash here, before the target element even exists, means there is nothing
 * to jump to. Inline scripts are allowed by the CSP in next.config.ts.
 */
const START_AT_TOP = `try{if('scrollRestoration' in history)history.scrollRestoration='manual';if(location.hash)history.replaceState(null,'',location.pathname+location.search)}catch(e){}`;

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

const plexSans = IBM_Plex_Sans({
  variable: '--font-plex-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} · developer`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.headline,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: `${SITE.name} · developer`,
    description: SITE.headline,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} · developer`,
    description: SITE.headline,
  },
};

// Tints mobile browser chrome (the address bar / status bar) to match
// whichever theme is active, using the same --surface tokens as globals.css.
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfcfd' },
    { media: '(prefers-color-scheme: dark)', color: '#10151b' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${plexSans.variable} ${plexMono.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script dangerouslySetInnerHTML={{ __html: START_AT_TOP }} />
        <ScrollManager />
        <AmbientBackdrop />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-signal focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>

        <Header />

        {/* relative z-10: without an explicit stacking order, unpositioned
            content paints behind the fixed, positive-z-index snow layer. */}
        <main id="main" className="relative z-10">
          {children}
        </main>

        <footer className="relative z-10 mt-24 border-t border-line bg-surface-sunken">
          <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="readout text-ink">{SITE.name}</p>
              <p className="readout mt-1">
                built with next.js · deployed on vercel
              </p>
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              <li>
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-signal">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.github}
                  className="transition-colors hover:text-signal"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={SITE.linkedin}
                  className="transition-colors hover:text-signal"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </footer>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
