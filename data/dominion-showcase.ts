/**
 * Authentic showcase data for Dominion (Alpha 1.0.4)
 * Built with Godot 4 Engine.
 *
 * Screenshots sourced directly from the player's native Windows Godot Alpha 1.0.4 build.
 */

export const HERO_STATS: { value: string; label: string }[] = [
  { value: '1.0.4', label: 'alpha build' },
  { value: '27', label: 'authentic tank models' },
  { value: '69', label: 'armored vehicles' },
  { value: '394 MB', label: 'Windows installer' },
];

export interface Shot {
  src: string;
  alt: string;
  title: string;
  caption: string;
  category: string;
  width: number;
  height: number;
  badge?: string;
  actionText?: string;
}

export const HERO_SHOT: Shot = {
  src: '/images/dominion/battle.jpg',
  alt: 'Intense 3D battlefield combat in Dominion with Abrams tanks firing, explosions, artillery strikes, and combat health indicators on hex tiles.',
  title: 'Real-Time Combined Arms Warfare',
  caption: 'Active tactical engagement: Abrams tanks advancing under smoke, artillery shells detonating, and tracking turrets engaging enemy armor.',
  category: 'COMBAT',
  width: 1280,
  height: 800,
  badge: 'ACTIVE BATTLE',
};

export const SHOTS: Shot[] = [
  {
    src: '/images/dominion/battle.jpg',
    alt: 'M1A2 Abrams tanks engaging hostile armor with gun recoil, smoke trails, and real-time damage bars.',
    title: 'Combined-Arms Armor Battle',
    caption: 'Real-time tactical combat: tanks fire with realistic recoil, turrets track targets, and artillery barrages shatter enemy positions.',
    category: 'COMBAT',
    width: 1280,
    height: 800,
    badge: 'REAL COMBAT',
    actionText: 'Watch armor engagement',
  },
  {
    src: '/images/dominion/alpha-metropolis.jpg',
    alt: 'High-altitude strategic view of a sprawling Alpha 1.0.4 metropolis with industrial zones, power cooling towers, and hex borders.',
    title: 'Alpha 1.0.4 Sprawling Metropolis',
    caption: 'Advanced late-game capital: MultiMesh grass and trees, smoking factory chimneys, cooling towers, and defensive artillery divisions.',
    category: 'EMPIRE',
    width: 1400,
    height: 822,
    badge: 'LATEST BUILD',
    actionText: 'Inspect capital city',
  },
  {
    src: '/images/dominion/building.jpg',
    alt: 'Founding an empire in Spring Year 1: Town Hall, Farm under construction with yellow hex boundary stripes, and resource gatherers.',
    title: 'Founding & Hex Construction',
    caption: 'From a solitary colony outpost to an empire: claim hex tiles, construct farms and mines, and manage local workforce allocation.',
    category: 'ECONOMY',
    width: 1280,
    height: 800,
    badge: 'FOUNDING ERA',
    actionText: 'View early game base',
  },
  {
    src: '/images/dominion/armies.jpg',
    alt: 'Tactical army assignments along strategic island hex borders showing Anti-Air, Artillery, Armor, and Infantry divisions.',
    title: 'Strategic Army Roles & Frontlines',
    caption: 'Hex-based frontline doctrine: position Anti-Air (AA), Artillery (ART), and Armored (ARM) divisions along contested borders.',
    category: 'TACTICS',
    width: 1280,
    height: 800,
    badge: 'HEX DOCTRINE',
    actionText: 'Inspect tactical frontlines',
  },
  {
    src: '/images/dominion/coastline.jpg',
    alt: 'Island coastline constraints with offshore oil platform, shipyard touching water, and dynamic sea shaders.',
    title: 'Offshore Drilling & Naval Yards',
    caption: 'Island geography dictates strategy: offshore oil rigs extract vital fuel while coastal shipyards produce fleets of warships.',
    category: 'NAVAL',
    width: 1280,
    height: 800,
    badge: 'COASTAL WAR',
    actionText: 'Explore naval frontier',
  },
];

export interface GameplayStep {
  step: string;
  title: string;
  sub: string;
  desc: string;
  icon: string;
  shot: Shot;
  bullets: string[];
}

export const GAMEPLAY_LOOP: GameplayStep[] = [
  {
    step: '01',
    title: 'הקמה וכלכלה (Found & Build)',
    sub: 'הנח את המפקדה, ספח שטחים וגייס עובדים',
    desc: 'המשחק מתחיל בהנחת עיר בירה על מפת משושים (Hex Grid). כל משושה מספק משאבים טבעיים — ברזל, נפט, חיטה ואורניום. עליך לתכנן רשת חוות, תחנות כוח ומפעלים ולשמור על מאזן כלכלי יציב.',
    icon: '🏛️',
    shot: SHOTS[2], // building.jpg
    bullets: [
      'שליטה ב-10 משאבי יסוד: חשמל, דלק, מתכת, מזון ואוצר לאומי',
      'בנייה על פי גבולות טריטוריה במשושים',
      'הצבת פועלים ושרשראות אספקה דינמיות',
    ],
  },
  {
    step: '02',
    title: 'מחקר וטכנולוגיה (Research & Progress)',
    sub: 'מעידן ההקמה ועד לעידן העתיד',
    desc: 'חקור עשרות טכנולוגיות בעץ מחקר 4-שלבי. ממעבר מנשק קל לחטיבות שריון כבדות, ועד לטילים היפרסוניים, סיבי תעשייה מתקדמים ומערכות הגנה אווירית מתקדמות.',
    icon: '🔬',
    shot: SHOTS[1], // alpha-metropolis.jpg
    bullets: [
      '4 עידנים היסטוריים: הקמה, תעשייה, מודרני ועתיד',
      'שדרוג סדנאות נשק, מחנות צבא ומרכזי מחקר',
      'פתיחת 27 דגמי טנקים אמיתיים (Abrams, Merkava, Leopard 2, T-90)',
    ],
  },
  {
    step: '03',
    title: 'קרב בזמן אמת וכיבוש (Command & Conquer)',
    sub: 'טנקים, ארטילריה, לוחמה ימית וטילים',
    desc: 'הקרבות בדומיניון מתרחשים בזמן אמת בתלת-ממד מלא. טנקים מזיזים צריחים לפי מטרות, פגזים מחושבים בליסטית, וספינות קרב חולשות על קווי החוף של האי מול בינה מלאכותית תוקפנית.',
    icon: '⚔️',
    shot: SHOTS[0], // battle.jpg
    bullets: [
      'מערכת לחימה משולבת: שריון, חיל רגלים, ארטילריה וספינות',
      'הדמיית רתע, עשן, פיצוצים והריסות רכבים שרופים',
      'סילו טילים אסטרטגיים ומערכות נ״מ להגנת המטרופולין',
    ],
  },
];

export const WHATS_NEW = {
  version: 'Alpha 1.0.4',
  intro: 'הגרסה העדכנית ביותר הפועלת במחשב — מנוע Godot 4 משודרג:',
  items: [
    'שדרוג ביצועי שדה הקרב: טכנולוגיית MultiMesh לצמחייה ודשא בדיוק 60 FPS ללא האטות.',
    '27 דגמי טנקי מערכה אמיתיים ו-69 נגמ״שים ורכבי תמיכה בעיצובים לאומיים מדויקים.',
    'פיזיקת לחימה משופרת: צריחים עוקבים בזמן אמת, רתע קנה מורגש, ועשן פיצוצים דינמי.',
    'מערכת עונות ומזג אוויר: שלג בחורף, פריחה באביב, ותאורת לילה טקטית.',
    'מבנים חדשים: תחנות כוח, מגדלי קירור, מפעלי נשק, סילו לטילים ובתי חולים.',
    'שיפורי בינה מלאכותית ליריבים: ניווט מתקדם, נסיגות טקטיות ותקיפות ימיות מתוזמנות.',
  ],
};

export const KNOWN_ISSUES: string[] = [
  'קרבות ענק של מאות יחידות עשויים לרוץ מתחת ל-25 FPS בכרטיסי מסך מובנים (מומלץ לבחור בהגדרות איכות Low במידת הצורך).',
];

export const SCREENSHOT_NOTE =
  'צילומי מסך מקוריים שנלכדו ישירות מתוך גרסת האלפא 1.0.4 הפועלת ב-Godot Engine במחשב.';
