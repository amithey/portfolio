import { ABOUT } from '@/data/about';
import { InterestArt } from '@/components/art/InterestArt';
import { Reveal } from '@/components/Reveal';

/**
 * The illustrated hobby cards.
 *
 * Shared by /about and the About section of the homepage, so the two can't
 * drift apart as interests are added — this markup existed only on /about
 * before the homepage grew a scrollable version of every section.
 */
export function InterestGrid() {
  if (ABOUT.interests.length === 0) return null;

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {ABOUT.interests.map((item, i) => (
        <Reveal
          key={item.label}
          as="li"
          delay={i * 90}
          dir={i % 2 === 0 ? 'left' : 'right'}
          className="lift group list-none overflow-hidden rounded-xl border border-line bg-surface-raised hover:border-signal"
        >
          <div className="aspect-square w-full text-ink/80">
            <InterestArt label={item.label} />
          </div>
          <div className="border-t border-line p-3 text-center">
            <p className="font-display text-sm font-bold">{item.label}</p>
            {item.note && <p className="mt-1 text-xs leading-relaxed text-muted">{item.note}</p>}
          </div>
        </Reveal>
      ))}
    </ul>
  );
}