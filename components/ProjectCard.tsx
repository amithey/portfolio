import Link from 'next/link';
import type { Project } from '@/data/projects';
import { Cover } from './Cover';

const STATUS: Record<Project['status'], { label: string; className: string; dot: string }> = {
  live: { label: 'live', className: 'text-live', dot: 'dot-live' },
  wip: { label: 'in progress', className: 'text-warn', dot: '' },
  archived: { label: 'archived', className: 'text-muted', dot: '' },
};

function demoLabel(project: Project): string {
  const { demo } = project;
  if (demo.kind === 'none') return 'code only';
  if (demo.kind === 'video') return 'video';
  if (demo.embeddable) return 'runs here';
  return 'live site';
}

/** "2026-03" → "Mar 2026". Nothing renders when the date is unknown. */
function builtLabel(built?: string): string | null {
  if (!built) return null;
  const [y, m] = built.split('-');
  const date = new Date(Number(y), Number(m) - 1);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}

export function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  const status = STATUS[project.status];
  const built = builtLabel(project.built);
  const tagLimit = large ? 5 : 3;
  const extraTags = project.tags.length - tagLimit;

  return (
    <article className="card group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface-raised">
      <div className="relative overflow-hidden">
        <Cover
          src={project.cover}
          title={project.title}
          slug={project.slug}
          priority={large}
          className={`card-cover w-full text-ink/70 ${large ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}
          sizes={
            large
              ? '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
              : '(min-width: 1024px) 33vw, 50vw'
          }
        />
        {/* Grounds the art against the text below instead of letting the two
            meet on a hard line. */}
        <div className="card-cover-fade pointer-events-none absolute inset-x-0 bottom-0 h-14" />

        <p className="readout absolute bottom-2.5 right-3 rounded-full border border-line/70 bg-surface-raised/85 px-2 py-0.5 text-muted backdrop-blur-sm">
          {demoLabel(project)}
        </p>
      </div>

      <div className={`flex flex-1 flex-col border-t border-line ${large ? 'p-6' : 'p-5'}`}>
        <div className="flex items-center justify-between gap-3">
          <p className={`readout ${status.className}`}>
            <span aria-hidden="true" className={status.dot}>
              ●
            </span>{' '}
            {status.label}
          </p>
          {built && <p className="readout text-muted">{built}</p>}
        </div>

        <h3 className={`mt-3 font-display font-bold tracking-tight ${large ? 'text-2xl' : 'text-lg'}`}>
          <Link
            href={`/projects/${project.slug}`}
            className="card-link after:absolute after:inset-0"
          >
            {project.title}
          </Link>
        </h3>

        <p className={`mt-2 text-muted ${large ? 'text-base' : 'text-sm'}`}>{project.tagline}</p>

        {/* The single most concrete thing about the project — the detail that
            makes a card worth stopping on rather than just a title. */}
        {large && project.highlights[0] && (
          <p className="mt-3 border-l-2 border-line pl-3 text-sm leading-relaxed text-muted">
            {project.highlights[0]}
          </p>
        )}

        <ul className="mt-4 flex flex-wrap items-center gap-1.5 pt-1">
          {project.tags.slice(0, tagLimit).map((tag) => (
            <li key={tag} className="readout rounded border border-line px-1.5 py-0.5 text-muted">
              {tag}
            </li>
          ))}
          {extraTags > 0 && <li className="readout text-muted">+{extraTags}</li>}
        </ul>

        <p className="readout mt-4 flex items-center gap-1.5 text-signal">
          View project
          <span aria-hidden="true" className="card-arrow">
            →
          </span>
        </p>
      </div>
    </article>
  );
}
