/**
 * Single source of truth for the whole site.
 *
 * Every page, filter, count and card renders from this file. Nothing about a
 * project should be hardcoded into a component.
 *
 * TWO FIELDS ARE DELIBERATELY INCOMPLETE:
 *
 *   `learned` — first person, and not mine to invent. Empty until Amit writes
 *               it. The detail page simply omits the section while it is blank.
 *   `built`   — only filled where a real date is known. Most repos were pushed
 *               in one squashed commit, so their git dates say nothing about
 *               when the work actually happened. Unknown is left undefined
 *               rather than guessed.
 */

export type Category = 'games-and-interactive' | 'web-apps' | 'data-and-ai';
export type ProjectStatus = 'live' | 'wip' | 'archived';
export type DemoKind = 'embed' | 'external' | 'video' | 'notebook' | 'none';

export interface Demo {
  kind: DemoKind;
  url?: string;
  /** Only true where the response headers have actually been checked. */
  embeddable: boolean;
  /** Required whenever the demo carries a caveat the visitor should know first. */
  note?: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: Category;
  tags: string[];
  status: ProjectStatus;
  featured: boolean;
  /** ISO year-month. Undefined where the real date isn't known. */
  built?: string;
  repo: string;
  demo: Demo;
  cover: string;
  screenshots?: string[];
  /** Factual statements about what the code does. */
  highlights: string[];
  /** Amit's own words. Empty until written — never auto-generated. */
  learned: string;
}

export const CATEGORIES: { id: Category; label: string; blurb: string }[] = [
  {
    id: 'games-and-interactive',
    label: 'Games & interactive',
    blurb: 'Things you can play in the browser right now.',
  },
  {
    id: 'web-apps',
    label: 'Web apps',
    blurb: 'Full applications with a UI, state, and a real backend.',
  },
  {
    id: 'data-and-ai',
    label: 'Data & AI',
    blurb: 'Systems that reason over data rather than just display it.',
  },
];

export const PROJECTS: Project[] = [
  {
    slug: 'bot-trade',
    title: 'BotTrade',
    tagline: 'An AI trading assistant with a RAG knowledge base, backtesting, and risk controls.',
    description:
      'The largest thing on this site: roughly 21,000 lines of Python. It pulls market data and news, retrieves against a Chroma vector store of trading knowledge, and asks Claude for a decision that is then filtered through explicit risk rules. It backtests strategies, tracks a portfolio, trains anomaly and market-regime models, and reports through a Streamlit dashboard.',
    category: 'data-and-ai',
    tags: ['python', 'langchain', 'rag', 'claude', 'machine-learning', 'backtesting', 'streamlit', 'docker'],
    status: 'wip',
    featured: true,
    repo: 'https://github.com/amithey/bot-trade',
    demo: {
      kind: 'video',
      embeddable: false,
      note: 'A live version is on the way: a free COMMITTEE-only mode that makes no API calls at all, plus bring-your-own-key for the LLM modes. Shown as a recording until sign-in and hosting are finished, then this becomes a real demo you can run.',
    },
    cover: '/images/projects/bot-trade.webp',
    highlights: [
      'Retrieval-augmented decisions: a Chroma vector store of ingested trading knowledge is queried before the model is asked anything.',
      'Model output never reaches an order directly — it passes through a separate risk layer with position sizing, a daily loss limit, and a hard halt.',
      'Per-ticker anomaly and market-regime models are trained and persisted alongside the rule engine.',
      'Backtesting runs the same decision path against historical data, so strategy changes are measurable rather than guessed at.',
      'Being rebuilt for multiple simultaneous users: a shared decision cache so concurrent visitors on the same bar cost one upstream call, per-account sign-in, and a live-trading engine that survives a page refresh instead of orphaning its thread.',
      'The portfolio it trades is entirely simulated — no live brokerage connection exists anywhere in the code.',
    ],
    learned: '',
  },
  {
    slug: 'bag-store',
    title: 'BagStore',
    tagline: 'A real online store for handmade knitted bags — cart, orders, and an admin dashboard.',
    description:
      'A working storefront built for an actual seller, not a mock-up. Products and orders live in Supabase, customers get an emailed confirmation, the shop owner gets a WhatsApp notification, and a protected admin area manages stock and order state.',
    category: 'web-apps',
    tags: ['nextjs', 'typescript', 'supabase', 'resend', 'tailwindcss', 'framer-motion'],
    status: 'live',
    featured: true,
    repo: 'https://github.com/amithey/bag-store',
    demo: {
      kind: 'external',
      url: 'https://sh-bags.vercel.app',
      embeddable: false,
      note: 'This is a live shop with real products — please look around, but don’t place a test order. The interface is in Hebrew.',
    },
    cover: '/images/projects/bag-store.webp',
    highlights: [
      'Order submission is rate-limited and request-validated server-side, because a public form that sends email and WhatsApp messages is an obvious abuse target.',
      'Stock is decremented as part of order handling rather than trusted from the client.',
      'Two notification channels on one order: a transactional email through Resend and a WhatsApp message to the owner.',
      'Admin routes sit behind their own auth check, separate from the storefront.',
    ],
    learned: '',
  },
  {
    slug: 'dominion',
    title: 'Dominion',
    tagline: 'A real-time strategy game running entirely in the browser on Three.js.',
    description:
      'A 3D real-time strategy game in the spirit of Civilization crossed with Command & Conquer. You start from a headquarters, found villages and cities, claim territory, research your way through national eras, and fight AI opponents by land and sea until every rival headquarters is gone. Around 10,900 lines of JavaScript across eleven modules, with no backend at all.',
    category: 'games-and-interactive',
    tags: ['threejs', 'javascript', 'webgl', 'rts', 'game-development'],
    status: 'live',
    featured: true,
    repo: 'https://github.com/amithey/dominion',
    demo: {
      kind: 'embed',
      url: 'https://dominion-one-kappa.vercel.app',
      embeddable: true,
      note: 'Loads around 60 MB of 3D models and textures, so give it a moment on a slow connection. Built for a desktop and a mouse.',
    },
    cover: '/images/projects/dominion.webp',
    highlights: [
      'Its own AI opponent, diplomacy system, pathfinding, and territory model — each a separate module rather than one game loop.',
      'The map is an island, and the coastline is a real constraint: shipyards must touch water and warships patrol the ocean ring.',
      'Settlements have construction districts, so where you can build is a consequence of what you have already founded.',
      'Falls back to procedural meshes automatically when a GLB model is missing, so the game still runs with assets absent.',
    ],
    learned: '',
  },
  {
    slug: 'capital-gains-tax-report-generator',
    title: 'Capital Gains Tax Report Generator',
    tagline: 'Turns Israeli broker exports into a capital-gains tax refund estimate.',
    description:
      'A tool for a problem with no good free option in Israel: working out whether you are owed a tax refund. It parses Israeli Form 867 and Interactive Brokers Flex Query XML, pulls official Bank of Israel exchange rates, and runs the numbers through a tax engine covering salary, self-employment, rental income, credit points, and surtax — then explains what it could not account for.',
    category: 'web-apps',
    tags: ['nextjs', 'typescript', 'tax', 'israel', 'xml-parsing', 'vitest'],
    status: 'live',
    featured: false,
    repo: 'https://github.com/amithey/capital-gains-tax-report-generator',
    demo: {
      kind: 'embed',
      url: 'https://capital-gains-tax-report-generator.vercel.app',
      embeddable: true,
      note: 'Safe to try with real numbers — every calculation runs in your browser and nothing is uploaded. The interface is in Hebrew, because Israeli tax forms are. It produces an estimate, and says so.',
    },
    cover: '/images/projects/capital-gains-tax-report-generator.webp',
    highlights: [
      'Runs entirely client-side — your salary slips and broker statements never leave the browser, which for a tax tool is the whole point.',
      'Two independent parsers — Israeli Form 867 and Interactive Brokers Flex Query XML — feeding one shared tax model.',
      'Exchange rates come from a Bank of Israel endpoint rather than being hardcoded.',
      '103 tests across the tax engine, the parsers, and the rate handling — by some distance the best-tested project here.',
      'Reports its own gaps: the result lists which inputs were missing and how they would change the outcome.',
    ],
    learned: '',
  },
  {
    slug: 'pong-game',
    title: 'Pong',
    tagline: 'Pong in a single HTML file, with selectable difficulty and a confetti win screen.',
    description:
      'A deliberately small project done properly. One file, no dependencies, no build step — but with difficulty selection, pixel-crisp canvas rendering, and a confetti animation when you win.',
    category: 'games-and-interactive',
    tags: ['javascript', 'canvas', 'html5-game'],
    status: 'live',
    featured: false,
    repo: 'https://github.com/amithey/pong-game',
    demo: {
      kind: 'embed',
      url: 'https://pong-game-blue-nine.vercel.app',
      embeddable: true,
    },
    cover: '/images/projects/pong-game.webp',
    highlights: [
      'The whole game — markup, styling, and logic — is one 970-line HTML file with no build step.',
      'Difficulty rewrites how the opponent thinks, not just how fast it moves: its aim error drops from ±40 to ±10, it starts predicting where the ball will land, and its dead zone tightens from 8 pixels to 2.',
      'Renders with image-rendering set to pixelated to keep edges crisp instead of blurred when scaled.',
    ],
    learned: '',
  },
  {
    slug: 'train-game',
    title: 'Train Runner',
    tagline: 'An endless train-runner arcade game on HTML canvas.',
    description:
      'An endless runner drawn straight onto a canvas: dodge obstacles, survive longer, beat your previous score. Score and high score persist between runs.',
    category: 'games-and-interactive',
    tags: ['javascript', 'canvas', 'html5-game', 'arcade'],
    status: 'live',
    featured: false,
    repo: 'https://github.com/amithey/train-game',
    demo: {
      kind: 'embed',
      url: 'https://train-game-inky.vercel.app',
      embeddable: true,
      note: 'Built for a narrow, tall screen — it works well on a phone.',
    },
    cover: '/images/projects/train-game.webp',
    highlights: [
      'Everything is drawn to a single canvas in one file, with no engine or framework underneath.',
      'Keeps a persistent high score across runs.',
    ],
    learned: '',
  },
];

/** Featured projects, capped at three by the design. */
export const FEATURED = PROJECTS.filter((p) => p.featured).slice(0, 3);

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/** Newest first; projects with no known date sort last rather than being guessed at. */
export function sortedProjects(list: Project[] = PROJECTS): Project[] {
  return [...list].sort((a, b) => {
    if (a.built && b.built) return b.built.localeCompare(a.built);
    if (a.built) return -1;
    if (b.built) return 1;
    return a.title.localeCompare(b.title);
  });
}

export const ALL_TAGS = Array.from(new Set(PROJECTS.flatMap((p) => p.tags))).sort();
