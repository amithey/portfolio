import { ABOUT } from '@/data/about';
import { PROJECTS } from '@/data/projects';
import { SITE, runnableCount } from '@/lib/site';

/**
 * A syntax-highlighted snippet that introduces Amit as an object literal —
 * the "code" half of the site's atmosphere, stated outright rather than left
 * to the drifting glyphs in the backdrop.
 *
 * Every value is read from the real data files, so the numbers here can't
 * drift out of sync with the project catalogue the way a hardcoded snippet
 * would. It is presented as an image, not as text to be run: the whole thing
 * is aria-hidden and followed by a plain-language sentence for screen
 * readers, since a literal reading of the punctuation is worse than useless.
 */

const C = {
  kw: 'text-code-kw',
  fn: 'text-code-fn',
  str: 'text-code-str',
  num: 'text-code-num',
  key: 'text-code-key',
  punc: 'text-muted',
  comment: 'text-code-comment',
} as const;

function Line({ indent = 0, children }: { indent?: number; children: React.ReactNode }) {
  return <div style={{ paddingLeft: `${indent * 1.25}rem` }}>{children}</div>;
}

export function CodeCard() {
  const stack = ['TypeScript', 'React', 'Python'];
  const summary = `${SITE.name} is a developer in ${ABOUT.location}. ${PROJECTS.length} projects on this site, ${runnableCount} of them running live, and open to work.`;

  return (
    <figure className="overflow-hidden rounded-xl border border-line bg-surface-raised shadow-sm">
      {/* Window chrome, so it reads as an editor rather than a stray block. */}
      <figcaption className="flex items-center gap-2 border-b border-line bg-surface-sunken px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-warn/60" />
          <span className="size-2.5 rounded-full bg-live/60" />
          <span className="size-2.5 rounded-full bg-signal/60" />
        </span>
        <span className="readout ml-1 text-muted">amit.ts</span>
      </figcaption>

      <pre
        aria-hidden
        className="overflow-x-auto p-5 font-mono text-[0.8125rem] leading-relaxed sm:text-sm"
      >
        <code>
          <Line>
            <span className={C.kw}>const</span> <span className={C.fn}>amit</span>
            <span className={C.punc}> = {'{'}</span>
          </Line>

          <Line indent={1}>
            <span className={C.key}>role</span>
            <span className={C.punc}>: </span>
            <span className={C.str}>&apos;{ABOUT.role}&apos;</span>
            <span className={C.punc}>,</span>
          </Line>

          <Line indent={1}>
            <span className={C.key}>based</span>
            <span className={C.punc}>: </span>
            <span className={C.str}>&apos;{ABOUT.location}&apos;</span>
            <span className={C.punc}>,</span>
          </Line>

          <Line indent={1}>
            <span className={C.key}>stack</span>
            <span className={C.punc}>: [</span>
            {stack.map((s, i) => (
              <span key={s}>
                <span className={C.str}>&apos;{s}&apos;</span>
                {i < stack.length - 1 && <span className={C.punc}>, </span>}
              </span>
            ))}
            <span className={C.punc}>],</span>
          </Line>

          <Line indent={1}>
            <span className={C.key}>shipped</span>
            <span className={C.punc}>: </span>
            <span className={C.num}>{PROJECTS.length}</span>
            <span className={C.punc}>,</span>{' '}
            {/* Braced: a bare `//` in JSX children is parsed as a comment. */}
            <span className={C.comment}>{'// all of them on this site'}</span>
          </Line>

          <Line indent={1}>
            <span className={C.key}>liveRightNow</span>
            <span className={C.punc}>: </span>
            <span className={C.num}>{runnableCount}</span>
            <span className={C.punc}>,</span>
          </Line>

          <Line indent={1}>
            <span className={C.key}>ridesInWinter</span>
            <span className={C.punc}>: </span>
            <span className={C.kw}>true</span>
            <span className={C.punc}>,</span>
          </Line>

          <Line indent={1}>
            <span className={C.key}>openToWork</span>
            <span className={C.punc}>: </span>
            <span className={C.kw}>true</span>
            <span className={C.punc}>,</span>
          </Line>

          <Line>
            <span className={C.punc}>{'}'}</span>
            <span className={C.punc}>;</span>
          </Line>
        </code>
      </pre>

      {/* What the block actually says, for anyone not reading the picture. */}
      <p className="sr-only">{summary}</p>
    </figure>
  );
}
