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
  /** Link text for a non-embeddable demo. Defaults to "Open the live site". */
  label?: string;
}

export interface ProjectVideo {
  /** Public path under /videos. */
  src: string;
  title: string;
  /** Factual: what the clip shows and the numbers the repository reports for it. */
  caption: string;
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
  /** Progress clips, shown on the detail page. */
  videos?: ProjectVideo[];
  /** Factual statements about what the code does. */
  highlights: string[];
  /** Amit's own words. Empty until written — never auto-generated. */
  learned: string;
}

export const CATEGORIES: { id: Category; label: string; blurb: string }[] = [
  {
    id: 'games-and-interactive',
    label: 'Games & interactive',
    blurb: 'Games you can play, in the browser or on your desktop.',
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
      'The largest web project on this site, and still being worked on: over 80 commits, more than 1,000 automated tests, and a deployment on Fly.io. It pulls market data and news, retrieves against a Chroma vector store of trading knowledge, and asks Claude for a decision that is then filtered through an entry research gate and explicit risk rules. It backtests strategies, tracks a paper portfolio, trains anomaly and market regime models, and reports through a Streamlit dashboard.',
    category: 'data-and-ai',
    tags: ['python', 'langchain', 'rag', 'claude', 'machine learning', 'backtesting', 'streamlit', 'docker'],
    status: 'live',
    featured: true,
    repo: 'https://github.com/amithey/bot-trade',
    demo: {
      kind: 'external',
      url: 'https://bottrade.fly.dev',
      // Not embeddable, and not because of a frame header: bottrade.fly.dev
      // sends neither X-Frame-Options nor frame-ancestors. Sign in is Google
      // OAuth, and Google refuses to render its consent screen in an iframe,
      // so an embed would strand every visitor on the first screen.
      embeddable: false,
      note: 'Opens in a new tab, because the sign in flow will not work inside an embedded frame. Free to actually use: the COMMITTEE mode runs 38 indicators voting against each other and makes no model calls at all, so nothing is behind a key. Everything it trades is simulated. No brokerage is connected anywhere in the code.',
    },
    cover: '/images/projects/bot-trade.webp',
    highlights: [
      'Retrieval augmented decisions: a Chroma vector store of ingested trading knowledge is queried before the model is asked anything.',
      'Model output never reaches an order directly. It passes through a separate risk layer with position sizing, a daily loss limit, and a hard halt.',
      'Per ticker anomaly and market regime models are trained and persisted alongside the rule engine.',
      'Backtesting runs the same decision path against historical data, so strategy changes are measurable rather than guessed at.',
      'Every entry passes a deterministic gate on completed candles: an established trend, a confirmed pullback or breakout, enough volume, and a limit on how stretched the price is. The repository labels these as testable hypotheses, not a proven edge.',
      'Open paper positions are protected by a persistent, fee aware trailing exit that runs independently of the AI, so a slow model call cannot hand back unrealised gains.',
      'It reports its own results without flattering them. Over 2022 to 2026 the multi asset trend scanner returned about what buy and hold did, at about half the drawdown, and the write up says plainly that any excess return is not established.',
      'Runs multi tenant: email and password accounts that survive a refresh, a shared decision cache so concurrent visitors on the same bar cost one upstream call, and a trading engine that survives a page refresh instead of orphaning its thread.',
      'Anyone can run the full product without paying for anything. COMMITTEE mode decides on 38 indicators alone, so the free tier is a working bot rather than a locked screenshot, and the paid modes are the ones that spend on Claude.',
      'The portfolio it trades is entirely simulated. No live brokerage connection exists anywhere in the code.',
    ],
    learned: '',
  },
  {
    slug: 'project-noesis',
    title: 'Project Noesis',
    tagline: 'A fruit fly body driven by a simulation of its real connectome, with nothing scripted.',
    description:
      'The idea: take the real wiring diagram of a fruit fly’s nervous system, mapped and published by neuroscientists, and run it as a simulation instead of programming the fly’s behaviour by hand. Around 158,000 neurons are modelled as an event driven leaky integrate and fire network, linked through motor neurons and muscles to a physics model of the fly’s body in MuJoCo, with sensory neurons feeding back what the body feels. Whatever the fly does has to come out of that wiring, and eventually out of learning. It is early and unfinished, and its findings log records what failed as carefully as what worked.',
    category: 'data-and-ai',
    tags: ['python', 'neuroscience', 'connectome', 'simulation', 'mujoco', 'numba', 'research'],
    status: 'wip',
    built: '2026-10',
    repo: 'https://github.com/amithey/Project-Noesis',
    featured: false,
    demo: {
      kind: 'none',
      embeddable: false,
      note: 'Code only, and it is a work in progress. The connectome data is not in the repository because of its licence, and most of the code currently lives on feature branches rather than the default branch, so the GitHub landing page looks emptier than the project is.',
    },
    cover: '/images/projects/project-noesis.webp',
    videos: [
      {
        src: '/videos/fly-stage2-gripped-steps-10s.mp4',
        title: 'Stage 2: gripped steps',
        caption:
          'Ten seconds of simulation at 30 FPS from the validated Stage 2 checkpoint, which passed a two seed gate. Forward displacement: 2.58 mm.',
      },
      {
        src: '/videos/fly-stage3-continuous-walking-10s.mp4',
        title: 'Stage 3: continuous walking',
        caption:
          'Ten seconds at 30 FPS from the Stage 3 candidate. Forward displacement: 1.06 mm, with tripod leg coordination of 0.141. A candidate, not a finished gait.',
      },
    ],
    highlights: [
      'Reproduces a published result from the data rather than from tuning: driving the sugar tasting neurons activates the proboscis motor neuron MN9, as in Shiu et al., Nature 2024.',
      'Corrects for a real data problem. One connectome undercounts synapses by 20 to 60 percent per brain region compared with another, so counts are rescaled region by region from a second dataset, and that alone restores the sugar response without any tuning.',
      'Validates against predictions written down in advance: an eight part response battery covering sugar, water, bitter and odour.',
      'Wires real sensory input into the body, including leg afferents, gravity sensing and the halteres, and a mushroom body with dopamine gated plasticity as a first step toward learning.',
      'Has moved on to training: a GPU pilot with checkpoints, frozen comparisons, and physical gait metrics that classify movement from falling and dragging through to coordinated tripod walking, tested on synthetic data first.',
      'Holds itself to pre-registered rules. A recent exploration experiment failed its own pass condition, so neither result was promoted, and the write up says so.',
      'Keeps a dated findings log of single runs, including corrections to its own earlier notes and a clear statement of what is not statistically established.',
    ],
    learned: '',
  },
  {
    slug: 'bag-store',
    title: 'BagStore',
    tagline: 'A real online store for handmade knitted bags, with cart, orders, and an admin dashboard.',
    description:
      'A working storefront built for an actual seller, not a mockup. Products and orders live in Supabase, customers get an emailed confirmation, the shop owner gets a WhatsApp notification, and a protected admin area manages stock and order state.',
    category: 'web-apps',
    tags: ['nextjs', 'typescript', 'supabase', 'resend', 'tailwindcss', 'framer motion'],
    status: 'live',
    featured: true,
    repo: 'https://github.com/amithey/bag-store',
    demo: {
      kind: 'external',
      url: 'https://sh-bags.vercel.app',
      embeddable: false,
      note: 'This is a live shop with real products, so please look around, but don’t place a test order. The interface is in Hebrew.',
    },
    cover: '/images/projects/bag-store.webp',
    highlights: [
      'Order submission is rate limited and request validated server side, because a public form that sends email and WhatsApp messages is an obvious abuse target.',
      'Stock is decremented as part of order handling rather than trusted from the client.',
      'Two notification channels on one order: a transactional email through Resend and a WhatsApp message to the owner.',
      'Admin routes sit behind their own auth check, separate from the storefront.',
    ],
    learned: '',
  },
  {
    slug: 'dominion',
    title: 'Dominion',
    tagline: 'A 3D real time strategy game for Windows, built in Godot. Currently in public alpha.',
    description:
      'A 3D real time strategy game in the spirit of Civilization crossed with Command & Conquer. You start from a headquarters, found villages and cities, claim territory, research your way through national eras, and fight AI opponents by land and sea. It began as a Three.js prototype in the browser and has since been rebuilt as a native Windows game in Godot, which is now the only version in active development: the repository has nearly 500 commits and the code is mostly GDScript.',
    category: 'games-and-interactive',
    tags: ['godot', 'gdscript', 'rts', 'game development', 'windows', '3d'],
    status: 'wip',
    featured: true,
    repo: 'https://github.com/amithey/dominion',
    demo: {
      kind: 'external',
      url: 'https://github.com/amithey/dominion/releases/download/v1.0.3-alpha/DOMINION-Setup.exe',
      embeddable: false,
      label: 'Download for Windows (installer, about 200 MB)',
      note: 'This is a Windows download, not a browser demo. The build is a pre-release alpha for testers, version 1.0.3, and Windows may warn about an unrecognised publisher. It is not on Steam, though Steam is the intended release. Release notes are on the GitHub releases page.',
    },
    cover: '/images/projects/dominion.webp',
    highlights: [
      'Rebuilt from a browser prototype into a native Windows game with its own installer, versioned releases, and a test script that can also check the exported executable.',
      'Units are modelled on real equipment, nation by nation. The 1.0.3 alpha added 27 main battle tank models and 69 armoured carriers, scouts, and support vehicles, with turrets that track targets, guns that recoil, and wrecks when a vehicle is destroyed.',
      'Its own AI opponents, diplomacy, and territory systems, carried over from the browser version.',
      'The map is an island, and the coastline is a real constraint: shipyards must touch water and warships patrol the ocean ring.',
      'Each release is written up with what changed, and customer-style review rounds are kept in the repository.',
    ],
    learned: '',
  },
  {
    slug: 'capital-gains-tax-report-generator',
    title: 'Capital Gains Tax Report Generator',
    tagline: 'Turns Israeli broker exports into a capital gains tax refund estimate.',
    description:
      'A tool for a problem with no good free option in Israel: working out whether you are owed a tax refund. It parses Israeli Form 867 and Interactive Brokers Flex Query XML, pulls official Bank of Israel exchange rates, and runs the numbers through a tax engine covering salary, self employment, rental income, credit points, and surtax, then explains what it could not account for.',
    category: 'web-apps',
    tags: ['nextjs', 'typescript', 'tax', 'israel', 'xml parsing', 'vitest'],
    status: 'live',
    featured: false,
    repo: 'https://github.com/amithey/capital-gains-tax-report-generator',
    demo: {
      kind: 'embed',
      url: 'https://capital-gains-tax-report-generator.vercel.app',
      embeddable: true,
      note: 'Safe to try with real numbers. Every calculation runs in your browser and nothing is uploaded. The interface is in Hebrew, because Israeli tax forms are. It produces an estimate, and says so.',
    },
    cover: '/images/projects/capital-gains-tax-report-generator.webp',
    highlights: [
      'Runs entirely client side. Your salary slips and broker statements never leave the browser, which for a tax tool is the whole point.',
      'Two independent parsers, Israeli Form 867 and Interactive Brokers Flex Query XML, feeding one shared tax model.',
      'Exchange rates come from a Bank of Israel endpoint rather than being hardcoded.',
      '103 tests across the tax engine, the parsers, and the rate handling, by some distance the best tested project here.',
      'Reports its own gaps: the result lists which inputs were missing and how they would change the outcome.',
    ],
    learned: '',
  },
  {
    slug: 'pong-game',
    title: 'Pong',
    tagline: 'Pong in a single HTML file, with selectable difficulty and a confetti win screen.',
    description:
      'A deliberately small project done properly. One file, no dependencies, no build step, but with difficulty selection, crisp pixel canvas rendering, and a confetti animation when you win.',
    category: 'games-and-interactive',
    tags: ['javascript', 'canvas', 'html5 game'],
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
      'The whole game, markup, styling, and logic, is one 970 line HTML file with no build step.',
      'Difficulty rewrites how the opponent thinks, not just how fast it moves: its aim error drops from ±40 to ±10, it starts predicting where the ball will land, and its dead zone tightens from 8 pixels to 2.',
      'Renders with pixelated image rendering to keep edges crisp instead of blurred when scaled.',
    ],
    learned: '',
  },
  {
    slug: 'train-game',
    title: 'Train Runner',
    tagline: 'An endless train runner arcade game on HTML canvas.',
    description:
      'An endless runner drawn straight onto a canvas: dodge obstacles, survive longer, beat your previous score. Score and high score persist between runs.',
    category: 'games-and-interactive',
    tags: ['javascript', 'canvas', 'html5 game', 'arcade'],
    status: 'live',
    featured: false,
    repo: 'https://github.com/amithey/train-game',
    demo: {
      kind: 'embed',
      url: 'https://train-game-inky.vercel.app',
      embeddable: true,
      note: 'Built for a narrow, tall screen. It works well on a phone.',
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
