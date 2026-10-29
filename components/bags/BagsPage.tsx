import Image from 'next/image';
import Link from 'next/link';
import { Frank_Ruhl_Libre } from 'next/font/google';
import type { Project } from '@/data/projects';
import {
  FLOW,
  HERO_STATS,
  MOBILE_SCREEN,
  MODELS,
  NOTE_PHOTOS,
  SCREENS,
  STACK,
} from '@/data/bags-showcase';
import { Reveal } from '@/components/Reveal';
import { CountUp } from '@/components/noesis/CountUp';
import { demoHostLabel } from '@/lib/demo';

const serif = Frank_Ruhl_Libre({
  subsets: ['latin', 'hebrew'],
  variable: '--font-frank',
  display: 'swap',
});

/**
 * The BagStore showcase: an editorial, boutique page in the shop's own cream,
 * taupe and gold, set in the same Frank Ruhl Libre serif. It replaces the
 * standard project template. Content lives in data/bags-showcase.ts and
 * data/projects.ts.
 */

function Head({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="max-w-2xl">
      <p className="bg-eyebrow">{eyebrow}</p>
      <h2 className="bg-serif mt-3 text-4xl font-light leading-[1.1] sm:text-5xl">{title}</h2>
      {children && <p className="mt-5 text-lg leading-relaxed text-[var(--bg-muted)]">{children}</p>}
    </div>
  );
}

export function BagsPage({
  project,
  prev,
  next,
}: {
  project: Project;
  prev?: Project;
  next?: Project;
}) {
  const shopUrl = project.demo.url;
  const host = shopUrl ? demoHostLabel(shopUrl) : undefined;
  const ribbon = [...MODELS, ...MODELS];

  return (
    <article className={`bg ${serif.variable}`}>
      {/* ───────── Hero ───────── */}
      <header className="bg-paper relative">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-28">
          <div>
            <p className="bg-eyebrow">
              <Link href="/projects" className="hover:underline">
                Projects
              </Link>
              {' / '}Web apps
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="bg-chip">
                <span className="bg-dot" aria-hidden="true" /> A live shop
              </span>
              <span className="bg-chip">Built for a real seller</span>
              <span className="bg-chip">Hebrew, right to left</span>
            </div>

            <h1 className="bg-serif mt-7 text-5xl font-light leading-[1.02] sm:text-7xl">
              Handmade bags,
              <span className="block italic text-[var(--bg-taupe)]">sold properly.</span>
            </h1>
            <div className="bg-rule mt-7 w-24" />
            <p className="mt-7 max-w-xl text-xl leading-relaxed text-[var(--bg-muted)]">{project.tagline}</p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              {shopUrl && (
                <a href={shopUrl} target="_blank" rel="noreferrer noopener" className="bg-btn">
                  Visit the live shop <span aria-hidden="true">→</span>
                </a>
              )}
              <a href={project.repo} target="_blank" rel="noreferrer noopener" className="bg-btn bg-btn-ghost">
                Read the source <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* The hero bag, in an arch. */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="bg-arch-ring" aria-hidden="true" />
            <div className="bg-arch bg-float">
              <Image
                src={MODELS[3].image.src}
                alt={`${MODELS[3].en}: a hand-knitted mint bag with a gold chain, beside a white vase.`}
                width={MODELS[3].image.width}
                height={MODELS[3].image.height}
                priority
                sizes="(min-width: 1024px) 380px, 80vw"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="bg-tag">
              Model {MODELS[3].number} · {MODELS[3].en}
            </p>
          </div>
        </div>
      </header>

      {/* ───────── Ribbon ───────── */}
      <div className="bg-ribbon" aria-hidden="true">
        <div className="bg-marquee">
          {ribbon.map((m, i) => (
            <span key={`${m.number}-${i}`} className="bg-serif">
              {m.en} <span className="bg-star">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-28 px-5 pb-28 pt-24 sm:space-y-36">
        {/* ───────── The brief ───────── */}
        <Reveal>
          <section className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <Head eyebrow="The brief" title="A storefront with a real person behind it" />
            <div>
              <p className="text-xl leading-relaxed sm:text-2xl">{project.description}</p>
              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-[var(--bg-line)] pt-8">
                {HERO_STATS.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <span className="bg-serif block text-5xl font-light text-[var(--bg-taupe)]">
                        <CountUp to={s.value} duration={900} />
                      </span>
                      <span className="mt-2 block text-sm leading-snug text-[var(--bg-muted)]">{s.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        </Reveal>

        {/* ───────── Lookbook ───────── */}
        <section>
          <Reveal>
            <Head eyebrow="The collection" title="Seven models, one by one">
              A horizontal lookbook of the live shop&rsquo;s range. Scroll sideways.
            </Head>
          </Reveal>
          <div className="bg-scroller mt-12" tabIndex={0} role="region" aria-label="The seven bag models">
            {MODELS.map((m) => (
              <figure key={m.number} className="bg-card">
                <div className="bg-card-photo">
                  <Image
                    src={m.image.src}
                    alt=""
                    width={m.image.width}
                    height={m.image.height}
                    sizes="320px"
                    aria-hidden="true"
                    className="bg-card-blur"
                  />
                  <Image
                    src={m.image.src}
                    alt={`${m.en}, a hand-knitted bag.`}
                    width={m.image.width}
                    height={m.image.height}
                    sizes="320px"
                    className="bg-card-img"
                  />
                </div>
                <figcaption className="px-1 pt-4">
                  <p className="bg-eyebrow">Model {m.number}</p>
                  <p className="bg-serif mt-1 text-2xl">{m.en}</p>
                  <p dir="rtl" className="mt-0.5 text-sm text-[var(--bg-muted)]">
                    {m.he}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ───────── Engineering ───────── */}
        <section>
          <Reveal>
            <Head eyebrow="Behind the storefront" title="What happens to an order">
              Pretty is the easy half. A public form that sends email and WhatsApp messages needs
              care.
            </Head>
          </Reveal>
          <ol className="bg-flow mt-14">
            {FLOW.map((step, i) => (
              <Reveal key={step.label} as="li" delay={i * 70}>
                <span className="bg-flow-num bg-serif" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="bg-serif text-2xl">{step.label}</h3>
                  <p className="mt-1.5 max-w-xl leading-relaxed text-[var(--bg-muted)]">{step.detail}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <ul className="mt-12 flex flex-wrap gap-2" aria-label="Built with">
            {STACK.map((s) => (
              <li key={s} className="bg-chip">
                {s}
              </li>
            ))}
          </ul>
        </section>

        {/* ───────── Screens ───────── */}
        <section>
          <Reveal>
            <Head eyebrow="On screen" title="The shop, as a visitor sees it" />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <Reveal className="h-full">
              <figure className="bg-frame">
                <Image
                  src={SCREENS[0].src}
                  alt={SCREENS[0].alt}
                  width={SCREENS[0].width}
                  height={SCREENS[0].height}
                  sizes="(min-width: 1024px) 700px, 100vw"
                  className="block w-full"
                />
                <figcaption className="p-5">
                  <p className="bg-serif text-xl">{SCREENS[0].title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--bg-muted)]">{SCREENS[0].text}</p>
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={100} className="h-full">
              <figure className="bg-frame bg-phone-wrap h-full">
                <div className="bg-phone">
                  <Image
                    src={MOBILE_SCREEN.src}
                    alt={MOBILE_SCREEN.alt}
                    width={MOBILE_SCREEN.width}
                    height={MOBILE_SCREEN.height}
                    sizes="260px"
                    className="block w-full"
                  />
                </div>
                <figcaption className="p-5 pt-6">
                  <p className="bg-serif text-xl">On a phone</p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--bg-muted)]">
                    The same page, narrowed: the headline, two actions, three figures, then the first
                    bag.
                  </p>
                </figcaption>
              </figure>
            </Reveal>
            {SCREENS.slice(1).map((s, i) => (
              <Reveal key={s.src} delay={i * 80} className="h-full lg:col-span-1">
                <figure className="bg-frame h-full">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={s.width}
                    height={s.height}
                    sizes="(min-width: 1024px) 480px, 100vw"
                    className="block w-full"
                  />
                  <figcaption className="p-5">
                    <p className="bg-serif text-xl">{s.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--bg-muted)]">{s.text}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm text-[var(--bg-muted)]">{NOTE_PHOTOS}</p>
        </section>

        {/* ───────── Visit ───────── */}
        <section>
          <Reveal>
            <div className="bg-visit">
              <p className="bg-eyebrow !text-[var(--bg-gold)]">Visit</p>
              <h2 className="bg-serif mt-3 text-4xl font-light sm:text-5xl">See it for real</h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#d9cfc1]">{project.demo.note}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {shopUrl && (
                  <a href={shopUrl} target="_blank" rel="noreferrer noopener" className="bg-btn bg-btn-light">
                    Open {host ?? 'the shop'} <span aria-hidden="true">→</span>
                  </a>
                )}
                <a href={project.repo} target="_blank" rel="noreferrer noopener" className="bg-btn bg-btn-line">
                  Source on GitHub <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ───────── Navigation ───────── */}
        <nav aria-label="Other projects" className="flex justify-between gap-6 border-t border-[var(--bg-line)] pt-8 text-sm">
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="group max-w-[45%]">
              <span className="bg-eyebrow">← previous</span>
              <span className="mt-1 block font-semibold group-hover:text-[var(--bg-taupe)]">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/projects/${next.slug}`} className="group max-w-[45%] text-right">
              <span className="bg-eyebrow">next →</span>
              <span className="mt-1 block font-semibold group-hover:text-[var(--bg-taupe)]">{next.title}</span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
