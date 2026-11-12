/**
 * The Project Noesis progress story, kept apart from the project catalogue so
 * the numbers can be updated in one place.
 *
 * Every figure comes from the project's own repository: the progression
 * gallery and gait validation report on the gemini/flygym2-gait-validation
 * branch, the findings log, and HANDOFF.md. Nothing here is rounded in the
 * project's favour, and the repository's own verdict (walking is not yet
 * verified) is carried through.
 */

export interface LoopStep {
  label: string;
  detail: string;
}

/** The closed loop the whole project is built around. */
export const LOOP: LoopStep[] = [
  { label: 'Connectome', detail: '158,262 real neurons and about 3 million connections, from a published fly map' },
  { label: 'Brain simulation', detail: 'Each neuron is a simple leaky integrate and fire cell, run event by event' },
  { label: 'Motor neurons', detail: 'Pools of neurons that drive each leg muscle' },
  { label: 'Fly body', detail: 'Skeleton, joints and muscles, simulated in MuJoCo' },
  { label: 'Senses', detail: 'Leg load, gravity and balance signals fed back into the brain' },
];

export interface Stage {
  id: string;
  number: number;
  title: string;
  summary: string;
  /** Verdict in the repository's own terms, shown as a status line. */
  status: string;
  tone: 'ok' | 'warn';
  media:
    | { kind: 'image'; src: string; alt: string; width: number; height: number }
    | { kind: 'video'; src: string; label: string };
  caption: string;
}

export const STAGES: Stage[] = [
  {
    id: 'standing',
    number: 1,
    title: 'Standing',
    summary:
      'The brain holds the body up on six legs without falling over. No steps yet: the fly stays where it is.',
    status: 'Achieved',
    tone: 'ok',
    media: {
      kind: 'image',
      src: '/images/noesis/stage1_standing_preview.png',
      alt: 'A 3D fruit fly standing on a checkered floor, its reflection below it.',
      width: 960,
      height: 720,
    },
    caption: 'The simulated fly at the start of a run, driven by the brain and the latest trained weights.',
  },
  {
    id: 'gripped-steps',
    number: 2,
    title: 'Gripped steps',
    summary:
      'The fly stops freezing and starts lifting and pushing its legs, gaining ground while gripping the floor better.',
    status: 'Validated: passed a two seed gate',
    tone: 'ok',
    media: { kind: 'video', src: '/videos/fly-stage2-gripped-steps-10s.mp4', label: 'Stage 2, ten seconds' },
    caption: 'Ten simulated seconds at 30 frames per second. Forward displacement: 2.58 mm.',
  },
  {
    id: 'coordination',
    number: 3,
    title: 'Leg coordination',
    summary:
      'The six legs begin to alternate in the classic tripod pattern, three in the air while three are planted.',
    status: 'Candidate: coordination up, walking not yet verified',
    tone: 'warn',
    media: { kind: 'video', src: '/videos/fly-stage3-continuous-walking-10s.mp4', label: 'Stage 3, ten seconds' },
    caption: 'Ten simulated seconds at 30 frames per second. Forward displacement: 1.06 mm.',
  },
];

export interface Metric {
  label: string;
  unit: string;
  /** One value per stage, in stage order. */
  values: [number, number, number];
  /** Which direction counts as better, so the bars can be read honestly. */
  better: 'higher' | 'lower';
  note: string;
}

export const METRICS: Metric[] = [
  {
    label: 'Forward progress in 10 s',
    unit: 'mm',
    values: [0, 2.58, 1.06],
    better: 'higher',
    note: 'Stage 3 moves less than Stage 2. It was chosen for its leg pattern, not its distance.',
  },
  {
    label: 'Tripod coordination score',
    unit: '',
    values: [0.035, 0.055, 0.141],
    better: 'higher',
    note: 'The headline gain: roughly 148% over the earlier score of 0.05.',
  },
  {
    label: 'Foot slip on the ground',
    unit: 'mm/s',
    values: [2.4, 1.92, 2.91],
    better: 'lower',
    note: 'Stage 2 grips best, about 20% less slip. Stage 3 slips more.',
  },
];

/** Headline figures, all from the repository's findings log. */
export const HERO_STATS: { value: number; label: string }[] = [
  { value: 158262, label: 'neurons simulated' },
  { value: 3037361, label: 'connections between them' },
  { value: 42, label: 'leg joints driven by muscles' },
];

export const BRAIN_VIDEO = {
  src: '/videos/brain-activity-10s.mp4',
  poster: '/images/noesis/brain_activity.png',
  label: 'Ten seconds of simulated firing across the whole fly brain and nerve cord',
  caption:
    'Ten seconds of real simulation output: the firing of the whole brain and nerve cord, with mean rate per region on the right. Positions are schematic, because the data has no coordinates, and the links drawn are a sample of real ones. Learning is switched off and no vision or odour input is connected; only joint, load and balance feedback is.',
};

export const BRAIN_FRAME = {
  src: '/images/noesis/brain_activity.png',
  alt: 'A schematic of the fly brain and nerve cord lit by firing neurons, beside bars of mean firing rate for each brain region.',
  width: 1280,
  height: 960,
  caption:
    'One frame from the live brain view, five seconds into a run: 13,446 of the 158,262 neurons firing at that moment. Positions are schematic, because the data has no coordinates. The sampled links drawn are real ones.',
};

export interface Experiment {
  id: string;
  date: string;
  title: string;
  verdict: string;
  tone: 'fail' | 'running';
  text: string;
}

/** Newest first. Verdicts are the repository's own words, not softened. */
export const EXPERIMENTS: Experiment[] = [
  {
    id: 'mp1',
    date: '10 Nov 2026',
    title: 'MP1: a measured neural policy, with matched controls',
    verdict: 'Running: no claim yet',
    tone: 'running',
    text: 'A whole set of neural weights is chosen by measurement, and only accepted with a margin in both training contexts. Acceptance passed in both, but the repository says this is by construction, not independent efficacy. The frozen evaluations and the final audit are still to come.',
  },
  {
    id: 'ew1',
    date: '10 Nov 2026',
    title: 'EW1: does a reward-driven update persist?',
    verdict: 'Update persists, conditions fail',
    tone: 'fail',
    text: 'A nonzero update was saved and reloaded correctly through the native neural motor path. It improved training return in only one of two training contexts, and none of the four development contexts met every declared physical direction. No checkpoint was adopted.',
  },
  {
    id: 'ws1',
    date: '10 Nov 2026',
    title: 'WS1: do neural weights actually move the body?',
    verdict: 'Yes, but neither offset holds up',
    tone: 'fail',
    text: 'Both constructed weight directions changed the brain’s motor commands and the fly’s real trajectory in every tested case. Both failed the unchanged strict retention test, so no offset was adopted and no learned ability is established.',
  },
  {
    id: 'ed2',
    date: '7 Nov 2026',
    title: 'ED2: replicate the learning result, method fixed',
    verdict: 'Zero of three births pass',
    tone: 'fail',
    text: 'With the source, parameters and criteria all fixed in advance, none of three training births met the original physical, anatomical and retention conditions. The original failed birth is kept, and the write up says this is not a proof that learning is impossible.',
  },
];

export const EXPERIMENTS_VERDICT =
  'The project’s standing line across all of them: no model is promoted, and stable standing or walking is not established.';

/** What is still unsolved, from the project's own handoff. */
export const OPEN_PROBLEMS: string[] = [
  'The awake brain is bistable. Any strong drive ignites one self-sustained state that never returns to rest, which blocks clean walking and learning trials.',
  'Leg motor neurons fire tonically, with flexors and extensors working against each other, so there is no walking rhythm yet.',
  'Learning from the world is not shown. The dopamine gated plasticity passes its controls, but the odour code is too dense to learn anything specific.',
  'Monoamines are modelled as fast excitatory synapses, when they should be slow and modulatory.',
];
