import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ABOUT, SKILLS, type TimelineEntry } from '@/data/about';
import { PROJECTS } from '@/data/projects';
import { SITE, embeddableCount } from '@/lib/site';
import { publicFileExists } from '@/lib/covers';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'About',
  description: `${SITE.name} — developer. Background, skills and contact details.`,
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-10">
      <h2 className="font-display text-xl font-bold tracking-tight">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Timeline({ entries }: { entries: readonly TimelineEntry[] }) {
  return (
    <ol className="space-y-5">
      {entries.map((e, i) => (
        <Reveal key={`${e.title}-${i}`} delay={i * 60}>
          <li className="border-l-2 border-line pl-4">
            <p className="font-display font-bold">{e.title}</p>
            {(e.org || e.period) && (
              <p className="readout mt-1 text-muted">
                {[e.org, e.period].filter(Boolean).join(' · ')}
              </p>
            )}
            {e.detail && <p className="mt-2 text-sm leading-relaxed text-muted">{e.detail}</p>}
          </li>
        </Reveal>
      ))}
    </ol>
  );
}

export default function AboutPage() {
  const hasPhoto = publicFileExists(ABOUT.photo);
  const hasCv = publicFileExists(ABOUT.cvFile);
  const initials = SITE.name
    .split(' ')
    .map((w) => w[0])
    .join('');

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      {/* Identity block: photo, name, where, how to reach. */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border border-line bg-surface-sunken">
          {hasPhoto ? (
            <Image
              src={ABOUT.photo}
              alt={ABOUT.photoAlt}
              fill
              sizes="112px"
              priority
              className="object-cover"
            />
          ) : (
            <span
              aria-hidden="true"
              className="flex h-full w-full items-center justify-center font-display text-3xl font-bold text-muted"
            >
              {initials}
            </span>
          )}
        </div>

        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {SITE.name}
          </h1>
          <p className="readout mt-2 text-muted">
            {ABOUT.role} · {ABOUT.location}
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
            <li>
              <a href={`mailto:${SITE.email}`} className="text-signal hover:underline">
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={SITE.linkedin} className="text-signal hover:underline" rel="noreferrer noopener">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={SITE.github} className="text-signal hover:underline" rel="noreferrer noopener">
                GitHub
              </a>
            </li>
            {hasCv && (
              <li>
                <a href={ABOUT.cvFile} className="text-signal hover:underline" download>
                  Download CV
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Written bio if there is one; otherwise a factual summary of the work. */}
      <div className="mt-8 space-y-4 leading-relaxed text-muted">
        {ABOUT.bio ? (
          ABOUT.bio.split('\n\n').map((para) => <p key={para.slice(0, 24)}>{para}</p>)
        ) : (
          <p>
            I build things and put them where people can actually use them.{' '}
            {PROJECTS.length} projects are listed on this site — {embeddableCount} of them
            start in the browser, and every one links to its source.{' '}
            <Link href="/projects" className="text-signal hover:underline">
              See the work →
            </Link>
          </p>
        )}
      </div>

      {ABOUT.interests.length > 0 && (
        <Section title="Outside of work">
          <ul className="grid gap-3 sm:grid-cols-2">
            {ABOUT.interests.map((item, i) => (
              <Reveal key={item.label} delay={i * 60}>
                <li className="lift list-none rounded-lg border border-line bg-surface-raised p-4 hover:border-signal">
                  <p className="font-display font-bold">{item.label}</p>
                  {item.note && <p className="mt-1.5 text-sm text-muted">{item.note}</p>}
                </li>
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Skills">
        <dl className="space-y-4">
          {SKILLS.map((group) => (
            <div key={group.group} className="sm:flex sm:gap-6">
              <dt className="readout w-40 shrink-0 pt-1 text-muted">{group.group}</dt>
              <dd className="mt-1.5 flex flex-wrap gap-1.5 sm:mt-0">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded border border-line px-2 py-0.5 text-sm text-muted"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {ABOUT.experience.length > 0 && (
        <Section title="Experience">
          <Timeline entries={ABOUT.experience} />
        </Section>
      )}

      {ABOUT.education.length > 0 && (
        <Section title="Education">
          <Timeline entries={ABOUT.education} />
        </Section>
      )}

      {ABOUT.languages.length > 0 && (
        <Section title="Languages">
          <ul className="flex flex-wrap gap-x-6 gap-y-1 text-muted">
            {ABOUT.languages.map((l) => (
              <li key={l.name}>
                {l.name} <span className="readout">{l.level}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Get in touch">
        <p className="text-muted">
          I&rsquo;m looking for a junior developer role. Email is the fastest way to reach me.
        </p>
        <p className="mt-4">
          <a href={`mailto:${SITE.email}`} className="font-semibold text-signal hover:underline">
            {SITE.email}
          </a>
        </p>
      </Section>
    </div>
  );
}
