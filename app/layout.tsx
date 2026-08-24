import type { Metadata } from 'next';
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { SITE } from '@/lib/site';

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

const NAV = [
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${plexSans.variable} ${plexMono.variable}`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-signal focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>

        <header className="border-b border-line">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
            <Link
              href="/"
              className="font-display text-[0.95rem] font-bold tracking-tight hover:text-signal"
            >
              {SITE.name}
            </Link>
            <nav aria-label="Main">
              <ul className="flex items-center gap-5 text-sm">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-muted hover:text-signal">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={SITE.github}
                    className="text-muted hover:text-signal"
                    rel="noreferrer noopener"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main id="main">{children}</main>

        <footer className="mt-24 border-t border-line">
          <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <p className="readout">{SITE.name}</p>
            <ul className="flex flex-wrap gap-4">
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-signal">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={SITE.github} className="hover:text-signal" rel="noreferrer noopener">
                  GitHub
                </a>
              </li>
              <li>
                <a href={SITE.linkedin} className="hover:text-signal" rel="noreferrer noopener">
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
