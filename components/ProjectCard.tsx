import Link from 'next/link';
import type { Project } from '@/data/projects';
import { Cover } from './Cover';

const STATUS: Record<Project['status'], { label: string; className: string }> = {
  live: { label: 'live', className: 'text-live' },
  wip: { label: 'in progress', className: 'text-warn' },
  archived: { label: 'archived', className: 'text-muted' },
};

function DemoLabel({ project }: { project: Project }) {
  const { demo } = project;
  if (demo.kind === 'none') return <>code only</>;
  if (demo.kind === 'video') return <>video</>;
  if (demo.embeddable) return <>runs here</>;
  return <>live site</>;
}

export function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  const status = STATUS[project.status];

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-line bg-surface-raised transition-colors hover:border-signal">
      <Cover
        src={project.cover}
        title={project.title}
        slug={project.slug}
        priority={large}
        className={`w-full border-b border-line text-ink/70 ${large ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}
        sizes={large ? '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw' : '(min-width: 1024px) 33vw, 50vw'}
      />

      <div className={`flex flex-1 flex-col ${large ? 'p-6' : 'p-5'}`}>
      <div className="flex items-center justify-between gap-3">
        <p className={`readout ${status.className}`}>
          <span aria-hidden="true">●</span> {status.label}
        </p>
        <p className="readout text-muted">
          <DemoLabel project={project} />
        </p>
      </div>

      <h3
        className={`mt-3 font-display font-bold tracking-tight ${large ? 'text-2xl' : 'text-lg'}`}
      >
        <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
          {project.title}
        </Link>
      </h3>

      <p className={`mt-2 text-muted ${large ? 'text-base' : 'text-sm'}`}>{project.tagline}</p>

      <ul className="mt-4 flex flex-wrap gap-1.5 pt-1">
        {project.tags.slice(0, large ? 6 : 4).map((tag) => (
          <li
            key={tag}
            className="readout rounded border border-line px-1.5 py-0.5 text-muted"
          >
            {tag}
          </li>
        ))}
      </ul>
      </div>
    </article>
  );
}
