import { PROJECTS } from '@/data/projects';

export const SITE = {
  name: 'Amit Heymans',
  /** The claim in the hero. Kept short so it stays true. */
  headline: 'I take projects from idea to deployed.',
  email: 'heymans.amit@gmail.com',
  github: 'https://github.com/amithey',
  githubUser: 'amithey',
  linkedin: 'https://www.linkedin.com/in/amit-heymans-23a919401',
  /** Set once the production domain is known. */
  url: 'https://amithey.vercel.app',
} as const;

/**
 * Counted from the data rather than written down, so the hero can't drift out of
 * sync with reality the way a hardcoded number would.
 */
export const runnableCount = PROJECTS.filter(
  (p) => p.demo.kind === 'embed' || p.demo.kind === 'external',
).length;

export const embeddableCount = PROJECTS.filter((p) => p.demo.embeddable).length;
