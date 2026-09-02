import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CATEGORIES, PROJECTS, getProject, sortedProjects } from '@/data/projects';
import { RunDemo } from '@/components/RunDemo';
import { buildProjectsHref } from '@/lib/projects-href';
import { demoHostLabel } from '@/lib/demo';

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    openGraph: { title: project.title, description: project.tagline },
  };
}

const STATUS_LABEL = { live: 'live', wip: 'in progress', archived: 'archived' } as const;
const STATUS_CLASS = {
  live: 'text-live',
  wip: 'text-warn',
  archived: 'text-muted',
} as const;

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const ordered = sortedProjects();
  const index = ordered.findIndex((p) => p.slug === project.slug);
  const prev = index > 0 ? ordered[index - 1] : undefined;
  const next = index < ordered.length - 1 ? ordered[index + 1] : undefined;
  const category = CATEGORIES.find((c) => c.id === project.category);
  const hostLabel = project.demo.url ? demoHostLabel(project.demo.url) : undefined;

  return (
    <article className="mx-auto max-w-3xl px-5 py-14">
      <p className="readout text-muted">
        <Link href="/projects" className="hover:text-signal">
          Projects
        </Link>
        {' / '}
        {category && (
          <Link
            href={buildProjectsHref({ category: project.category })}
            className="hover:text-signal"
          >
            {category.label}
          </Link>
        )}
      </p>

      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        {project.title}
      </h1>
      <p className="mt-3 text-lg text-muted">{project.tagline}</p>

      <p className={`readout mt-4 ${STATUS_CLASS[project.status]}`}>
        <span aria-hidden="true">●</span> {STATUS_LABEL[project.status]}
        {project.built && <span className="text-muted"> · built {project.built}</span>}
      </p>

      {/* The caveat comes before the thing it is a caveat about. */}
      {project.demo.note && (
        <p className="mt-7 rounded-lg border border-line bg-surface-sunken px-4 py-3 text-sm text-muted">
          {project.demo.note}
        </p>
      )}

      <div className="mt-5">
        {project.demo.embeddable ? (
          <RunDemo demo={project.demo} title={project.title} />
        ) : project.demo.url ? (
          <a
            href={project.demo.url}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center justify-between gap-4 rounded-lg border border-line bg-surface-raised px-5 py-4 hover:border-signal"
          >
            <span className="font-semibold">Open the live site</span>
            <span className="readout text-signal">{hostLabel ?? 'open'} →</span>
          </a>
        ) : null}
      </div>

      <ul className="mt-6 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <li key={tag} className="readout rounded border border-line px-1.5 py-0.5 text-muted">
            <Link href={buildProjectsHref({ tag })} className="hover:text-signal">
              {tag}
            </Link>
          </li>
        ))}
      </ul>

      <section className="mt-12">
        <h2 className="font-display text-xl font-bold tracking-tight">What it does</h2>
        <p className="mt-3 leading-relaxed text-muted">{project.description}</p>
      </section>

      {project.highlights.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-xl font-bold tracking-tight">Worth knowing</h2>
          <ul className="mt-4 space-y-3">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 leading-relaxed text-muted">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Rendered only once written — never filled in with a generated stand-in. */}
      {project.learned.trim() !== '' && (
        <section className="mt-10">
          <h2 className="font-display text-xl font-bold tracking-tight">What I learned</h2>
          <p className="mt-3 leading-relaxed text-muted">{project.learned}</p>
        </section>
      )}

      <section className="mt-10 border-t border-line pt-6">
        <a
          href={project.repo}
          rel="noreferrer noopener"
          className="link-signal font-semibold"
        >
          Read the source on GitHub →
        </a>
      </section>

      <nav
        aria-label="Other projects"
        className="mt-12 flex justify-between gap-6 border-t border-line pt-6 text-sm"
      >
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className="group max-w-[45%]">
            <span className="readout text-muted">← previous</span>
            <span className="mt-1 block font-semibold group-hover:text-signal">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/projects/${next.slug}`} className="group max-w-[45%] text-right">
            <span className="readout text-muted">next →</span>
            <span className="mt-1 block font-semibold group-hover:text-signal">{next.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}