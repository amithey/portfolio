import type { Metadata } from 'next';
import Link from 'next/link';
import { ALL_TAGS, CATEGORIES, PROJECTS, sortedProjects, type Category } from '@/data/projects';
import { ProjectCard } from '@/components/ProjectCard';

export const metadata: Metadata = {
  title: 'Projects',
  description: `All ${PROJECTS.length} projects. Filter by category or stack.`,
};

type Search = { category?: string; tag?: string };

/**
 * Filters are plain links, not client-side state. The URL is the state, which
 * means filtered views are shareable, the back button behaves, every control is
 * keyboard-reachable for free, and the whole page still works with JS disabled.
 */
function buildHref(next: Search) {
  const params = new URLSearchParams();
  if (next.category) params.set('category', next.category);
  if (next.tag) params.set('tag', next.tag);
  const qs = params.toString();
  return qs ? `/projects?${qs}` : '/projects';
}

function Chip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'true' : undefined}
      className={`readout inline-block rounded border px-2.5 py-1.5 transition-colors ${
        active
          ? 'border-signal bg-signal text-white'
          : 'border-line text-muted hover:border-signal hover:text-signal'
      }`}
    >
      {children}
    </Link>
  );
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const { category, tag } = await searchParams;

  const validCategory = CATEGORIES.some((c) => c.id === category)
    ? (category as Category)
    : undefined;
  const validTag = tag && ALL_TAGS.includes(tag) ? tag : undefined;

  // Category and tag combine with AND.
  const results = sortedProjects(
    PROJECTS.filter(
      (p) =>
        (!validCategory || p.category === validCategory) &&
        (!validTag || p.tags.includes(validTag)),
    ),
  );

  const activeFilters = [validCategory, validTag].filter(Boolean).length;

  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Projects</h1>
      <p className="mt-3 text-muted">
        {PROJECTS.length} projects. Every one links to its source, and most of them start in
        the page.
      </p>

      <div className="mt-9 space-y-4">
        <fieldset>
          <legend className="readout mb-2 text-muted">Category</legend>
          <div className="flex flex-wrap gap-2">
            <Chip href={buildHref({ tag: validTag })} active={!validCategory}>
              All
            </Chip>
            {CATEGORIES.filter((c) => PROJECTS.some((p) => p.category === c.id)).map((c) => (
              <Chip
                key={c.id}
                href={buildHref({ category: c.id, tag: validTag })}
                active={validCategory === c.id}
              >
                {c.label}
              </Chip>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="readout mb-2 text-muted">Stack</legend>
          <div className="flex flex-wrap gap-2">
            {ALL_TAGS.map((t) => (
              <Chip
                key={t}
                href={buildHref({
                  category: validCategory,
                  tag: validTag === t ? undefined : t,
                })}
                active={validTag === t}
              >
                {t}
              </Chip>
            ))}
          </div>
        </fieldset>
      </div>

      <p className="readout mt-8 text-muted" aria-live="polite">
        {results.length} {results.length === 1 ? 'project' : 'projects'}
        {activeFilters > 0 && (
          <>
            {' · '}
            <Link href="/projects" className="link-signal">
              clear filters
            </Link>
          </>
        )}
      </p>

      {results.length > 0 ? (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-lg border border-line bg-surface-raised p-8 text-center">
          <p>No projects match those filters.</p>
          <p className="mt-2">
            <Link href="/projects" className="link-signal">
              Clear them?
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
