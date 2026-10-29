/**
 * Content for the BotTrade showcase page, kept apart from the project
 * catalogue.
 *
 * Sources: the repository README, its research notes, and screenshots taken
 * from a local run with no account, no API key and nothing started. The
 * Strategy tester result was produced by pressing Run backtest with the lab's
 * own defaults; it loses, and the page says so.
 */

export interface Mode {
  name: string;
  decides: string;
  cost: string;
  free?: boolean;
}

export const MODES: Mode[] = [
  { name: 'Committee', decides: '38 technical indicators vote; the majority rules.', cost: 'No model calls', free: true },
  { name: 'AI', decides: 'Claude alone, with retrieval over a trading knowledge base.', cost: '1 call per cycle' },
  { name: 'Hybrid', decides: 'The committee votes and Claude reviews the tally before acting.', cost: '1 call per cycle' },
  { name: 'Boardroom', decides: 'Eight analyst personas and a chairman, deliberating in parallel.', cost: 'about 9 calls per cycle' },
];

export interface PipelineStep {
  label: string;
  detail: string;
}

/** The decision path described in the README, in order. */
export const PIPELINE: PipelineStep[] = [
  { label: 'Market data', detail: 'Price and volume, plus indicators computed in pure pandas and numpy, with no outside TA library.' },
  { label: 'Decision', detail: 'The 38 indicator committee votes. In the AI modes, Claude is asked too, after a vector store of ingested trading knowledge is queried.' },
  { label: 'Entry gate', detail: 'Every buy candidate needs a trend, a confirmed pullback or breakout, enough volume, and a limit on how stretched the price is.' },
  { label: 'Risk layer', detail: 'Stop loss, take profit, a consecutive loss breaker, a cooldown after a bad trade, a daily halt, and a slippage model.' },
  { label: 'Paper portfolio', detail: 'A virtual account tracks positions and profit. No brokerage is connected anywhere in the code.' },
];

export const TAPE: string[] = [
  'STOP LOSS',
  'TAKE PROFIT',
  'DAILY LOSS HALT',
  'TILT COOLDOWN',
  'SLIPPAGE MODEL',
  'CLOSED BAR ENTRIES ONLY',
  'TRAILING PROFIT EXIT',
  'STALE DATA BLOCKS DECISIONS',
  'PAPER TRADING ONLY',
];

export const HERO_STATS: { value: number; label: string }[] = [
  { value: 38, label: 'indicators in the committee' },
  { value: 4, label: 'strategy modes' },
  { value: 1188, label: 'tests passing at the last run' },
];

export interface Shot {
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  text: string;
}

export const SHOTS: Shot[] = [
  {
    src: '/images/bot/agent.jpg',
    width: 1440,
    height: 900,
    alt: 'The BotTrade dashboard home, titled Your investment agent, with a paused agent, a portfolio of 100,000 dollars and an empty chart waiting for a symbol.',
    title: 'Your agent',
    text: 'Start and stop the bot, with the portfolio value, return and cash in front of you. The agent is paused until you start it.',
  },
  {
    src: '/images/bot/landing.jpg',
    width: 1440,
    height: 980,
    alt: 'The BotTrade public landing page: a headline about an AI trading bot you can watch decide, and a table of four strategy modes.',
    title: 'The public page',
    text: 'What the product is, how the four modes differ and what each one costs, before anyone signs in.',
  },
];

export const LAB = {
  shot: {
    src: '/images/bot/strategy-tester.jpg',
    width: 1440,
    height: 1300,
    alt: 'The Strategy tester after a backtest: the committee strategy is down 25.4 percent while buy and hold is up 1.0 percent, with 135 trades and fees of 23.4 percent, shown as a falling equity line under a flat grey one.',
  },
  title: 'The lab that tells you when you lose',
  intro:
    'Press Run backtest and the committee replays every historical bar, with fees. This is that result, unedited: five minute Bitcoin bars over about two months, the lab’s own defaults.',
  numbers: [
    { label: 'Committee', value: '−25.4%', tone: 'bad' },
    { label: 'Buy and hold', value: '+1.0%', tone: 'neutral' },
    { label: 'Trades', value: '135', tone: 'neutral' },
    { label: 'Fees paid', value: '23.4%', tone: 'bad' },
  ] as { label: string; value: string; tone: 'bad' | 'neutral' }[],
  verdict:
    'It loses, almost entirely to fees. That matches the repository’s own research notes: gross profit about zero on a three year five minute replay, with costs accounting for the loss. The tool is built to surface that rather than hide it, and its README says these rules are hypotheses, not a proven edge.',
};

export const STACK = ['Python', 'Streamlit', 'LangChain', 'ChromaDB', 'Claude API', 'scikit-learn', 'Docker', 'Fly.io'];

export const NOTE_SHOTS =
  'Screens are from a local run with no account and no keys, nothing started and no model called. Everything the bot trades is simulated.';
