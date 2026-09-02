/**
 * Everything personal lives here, separate from the project catalogue.
 *
 * Anything left blank is simply not rendered — no placeholder text ever reaches
 * the page. That keeps the site honest while it is still being filled in, and it
 * means adding a section is a matter of typing into this file rather than
 * touching a component.
 *
 * TO FILL IN:
 *   photo      — drop the file at public/images/amit.jpg (or change the path).
 *                While it is missing the page renders initials instead.
 *   bio        — a paragraph or two in your own voice.
 *   interests  — labels are yours; the `note` on each is optional.
 *   education  — school, dates, what you studied.
 *   experience — jobs, internships, army, freelance.
 *   languages  — spoken languages and level.
 */

export interface TimelineEntry {
  title: string;
  org?: string;
  /** Free text — "2023–2026", "Summer 2025". */
  period?: string;
  detail?: string;
}

export const ABOUT = {
  /** Public path. Rendered only if the file is actually present. */
  photo: '/images/amit.jpg',
  photoAlt: 'Amit Heymans',

  location: 'Israel',
  role: 'Developer',

  /** Your own words. Blank until written. */
  bio: '' as string,

  /** Labels Amit named. `note` is optional and only shown when present. */
  // Winter isn't listed here — it's not a hobby with its own moment, it's the
  // site's ambient atmosphere (see the site-wide snowfall in every page's
  // layout), so it doesn't get a card of its own.
  interests: [
    { label: 'Motorcycles', note: '' },
    { label: 'AI', note: '' },
    { label: 'Code', note: '' },
    { label: 'Stocks', note: '' },
  ] as { label: string; note?: string }[],

  education: [] as TimelineEntry[],
  experience: [] as TimelineEntry[],
  languages: [] as { name: string; level: string }[],

  /** Optional PDF at public/cv.pdf — the download button appears only if present. */
  cvFile: '/cv.pdf',
} as const;

/**
 * Skills, grouped by hand but drawn from what the projects actually use, so this
 * list cannot claim something no code on this site backs up.
 */
export const SKILLS: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL'] },
  { group: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Three.js', 'HTML Canvas'] },
  { group: 'Backend & data', items: ['Node.js', 'Express', 'Supabase', 'PostgreSQL', 'REST APIs'] },
  { group: 'AI', items: ['LangChain', 'RAG', 'Chroma', 'Claude API', 'scikit learn'] },
  { group: 'Tooling', items: ['Git', 'Docker', 'Vercel', 'Vitest', 'Streamlit'] },
];
