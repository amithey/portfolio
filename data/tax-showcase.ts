/**
 * Content for the Capital Gains Tax Report Generator showcase page.
 *
 * Screenshots are of the app running locally with synthetic data only: the
 * project's own sample Flex Query file (all figures fake, per its header) and
 * made-up salary numbers. Everything the page says about the app comes from the
 * repository, the catalogue entry in projects.ts, or what the screens show.
 */

/** The six wizard steps, as they appear in the app's own stepper. */
export const WIZARD_STEPS: { he: string; en: string }[] = [
  { he: 'מי אתם?', en: 'Who are you?' },
  { he: 'משכורת (טופס 106)', en: 'Salary (Form 106)' },
  { he: 'שוק ההון', en: 'Capital market' },
  { he: 'נקודות זיכוי', en: 'Credit points' },
  { he: 'בדיקת שלמות התיק', en: 'Portfolio completeness' },
  { he: 'תוצאה וטפסים', en: 'Result and forms' },
];

export interface Walkthrough {
  id: string;
  /** Index into WIZARD_STEPS, so tabs show the app's real step numbers. */
  step: number;
  title: string;
  text: string;
  image: { src: string; width: number; height: number; alt: string };
}

export const WALKTHROUGH: Walkthrough[] = [
  {
    id: 'who',
    step: 0,
    title: 'Start with your situation',
    text: 'Tick the kinds of income you had: salary, self-employment, capital markets, rental. The wizard only asks about what applies.',
    image: {
      src: '/images/tax/1-who.jpg',
      width: 1760,
      height: 1085,
      alt: 'The first wizard step in Hebrew, asking who you are, with income-source checkboxes for employee, self-employed, capital market investor and rental property.',
    },
  },
  {
    id: 'salary',
    step: 1,
    title: 'Enter your payslip data',
    text: 'Form 106 figures go in by employer: gross pay, tax already withheld, pension and insurance deductions. Several employers are supported.',
    image: {
      src: '/images/tax/2-salary.jpg',
      width: 1760,
      height: 1085,
      alt: 'The Form 106 step in Hebrew with employer name, gross income and tax withheld filled in with sample figures.',
    },
  },
  {
    id: 'trades',
    step: 2,
    title: 'Drop in a broker file',
    text: 'Upload an Interactive Brokers Flex Query XML or an Israeli Form 867. It is parsed in the browser and the trades appear as a table, with currency and commission per trade.',
    image: {
      src: '/images/tax/3-trades.jpg',
      width: 1760,
      height: 1085,
      alt: 'The capital market step in Hebrew showing a trades table parsed from a sample file: buys and sells of AAPL, SAP and TEVA in USD, EUR and ILS.',
    },
  },
  {
    id: 'complete',
    step: 4,
    title: 'Check what is missing',
    text: 'Before any number is shown, the tool asks about the things that change the answer: residency, marriage, national insurance payments, severance, foreign income, losses carried forward.',
    image: {
      src: '/images/tax/5-completeness.jpg',
      width: 1760,
      height: 1085,
      alt: 'The portfolio completeness step in Hebrew, a list of yes, no or not-sure questions about residency, marriage, national insurance payments, severance, foreign income and previous losses.',
    },
  },
  {
    id: 'result',
    step: 5,
    title: 'Get a report, and a list of gaps',
    text: 'The result is a preparation file, not a filing. It lists what still has to be checked, and says plainly that this is not an official submission.',
    image: {
      src: '/images/tax/6-result.jpg',
      width: 1760,
      height: 1085,
      alt: 'The results step in Hebrew, with a warning that data is missing, a list of what remains to be checked before filing, and a reminder that this is a preparation file only.',
    },
  },
];

export const HERO_STATS: { value: number; suffix?: string; label: string }[] = [
  { value: 103, label: 'automated tests' },
  { value: 2, label: 'independent broker-file parsers' },
  { value: 6, label: 'guided steps' },
  { value: 0, suffix: ' bytes', label: 'uploaded to a server' },
];

export interface PipelineStep {
  label: string;
  detail: string;
}

export const PIPELINE: PipelineStep[] = [
  { label: 'Broker file', detail: 'Israeli Form 867, or Interactive Brokers Flex Query XML' },
  { label: 'Parse', detail: 'Two independent parsers feeding one shared tax model' },
  { label: 'Convert', detail: 'Official Bank of Israel exchange rates, fetched rather than hardcoded' },
  { label: 'Calculate', detail: 'Salary, self employment, rental income, credit points and surtax' },
  { label: 'Report', detail: 'An estimate, with the inputs it could not account for' },
];

export const PRINCIPLES: { title: string; text: string }[] = [
  {
    title: 'Your documents never leave',
    text: 'Every calculation runs in the browser. Salary slips and broker statements are not uploaded, which for a tax tool is the whole point.',
  },
  {
    title: 'It says what it does not know',
    text: 'With data missing, it will not invent a total. It lists which inputs were absent and how they would change the outcome.',
  },
  {
    title: 'An estimate, labelled as one',
    text: 'The banner on every screen says the output is not an official return. It prepares you for filing; it does not replace advice.',
  },
];

export const NOTE_SAMPLE =
  'Screenshots use synthetic data only: the project’s own sample broker file, whose figures are fake, and made-up salary numbers. The app’s interface is in Hebrew, because Israeli tax forms are.';
