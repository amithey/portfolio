import Image from 'next/image';
import { ProjectArt } from './art/ProjectArt';
import { coverExists } from '@/lib/covers';

/**
 * A project's cover: the real screenshot if one has been added, otherwise the
 * drawn scene for that project. Which of the two is decided on the server (see
 * lib/covers.ts), so a tile never renders a broken image on its way to the art.
 */
export function Cover({
  src,
  title,
  slug,
  priority = false,
  className = '',
  sizes = '(min-width: 768px) 50vw, 100vw',
}: {
  src: string;
  title: string;
  slug: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-surface-muted ${className}`}>
      {coverExists(src) ? (
        <Image
          src={src}
          alt={`${title} screenshot`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <ProjectArt slug={slug} title={title} />
      )}
    </div>
  );
}
