import type { Metadata } from 'next';
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { SITE } from '@/lib/site';
import { Header } from '@/components/Header';
import { AmbientBackdrop } from '@/components/AmbientBackdrop';

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
    default: `${SITE.name} — developer`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.headline,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: `${SITE.name} — developer`,
    description: SITE.headline,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${plexSans.variable} ${plexMono.variable}`}>
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
                <a href={SITE.github} className="transition-colors hover:text-signal" rel="noreferrer noopener">
                  GitHub
                </a>
              </li>
              <li>
                <a href={SITE.linkedin} className="transition-colors hover:text-signal" rel="noreferrer noopener">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </body>
    </html>
  );
}
