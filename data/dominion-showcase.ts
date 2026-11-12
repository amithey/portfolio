/**
 * Showcase data for Dominion (Alpha 1.0.6; the screenshots are from 1.0.5)
 * Built with Godot 4.7 Engine.
 *
 * 100% authentic screenshots generated directly from the current Godot build.
 */

export const HERO_STATS: { value: string; label: string }[] = [
  { value: '1.0.6', label: 'alpha build' },
  { value: '27', label: 'authentic tank models' },
  { value: '69', label: 'armored vehicles' },
  { value: '60 FPS', label: 'MultiMesh engine' },
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
  src: '/images/dominion/battlefield-current.jpg',
  alt: 'Dominion 3D battlefield in the current build featuring rolling hills, tree stands, modern armored units, and tactical hex terrain.',
  title: 'Current Build 3D Battlefield',
  caption: 'Direct in-engine capture of the live 3D tactical theater: rolling topographical hills, dynamic terrain shaders, and combined-arms units.',
  category: 'COMBAT',
  width: 1280,
  height: 800,
  badge: 'ALPHA 1.0.6',
};

export const SHOTS: Shot[] = [
  {
    src: '/images/dominion/battlefield-current.jpg',
    alt: 'High-altitude strategic battlefield view showing armored divisions, rolling hills, and tactical island hexes.',
    title: '3D Tactical Battlefield',
    caption: 'The current engine in full glory: gentle rolling swells, dirt tracks between capitals, MultiMesh tree stands, and modern armored units.',
    category: 'COMBAT',
    width: 1280,
    height: 800,
    badge: 'LATEST BUILD',
    actionText: 'View live battlefield',
  },
  {
    src: '/images/dominion/combat-armor-current.jpg',
    alt: 'Damaged armor unit selection with real-time health indicator, ownership marker, and tactical command HUD.',
    title: 'Armored Units & Tactical HUD',
    caption: 'Direct unit engagement: damaged armor retains clear health indicators, ownership markers, and responsive turret tracking.',
    category: 'TACTICS',
    width: 1280,
    height: 800,
    badge: 'COMBAT HUD',
    actionText: 'Inspect unit command',
  },
  {
    src: '/images/dominion/metropolis-current.jpg',
    alt: 'Sprawling capital metropolis with industrial zones, nuclear cooling towers, and artillery batteries.',
    title: 'Alpha Metropolis & Infrastructure',
    caption: 'Late-game metropolis: industrial complexes with active smoke columns, cooling towers, MultiMesh foliage, and defensive artillery divisions.',
    category: 'EMPIRE',
    width: 1400,
    height: 822,
    badge: 'CAPITAL CITY',
    actionText: 'Inspect capital city',
  },
  {
    src: '/images/dominion/construction-current.jpg',
    alt: 'Active farm construction with workers and yellow hazard hex boundary stripes.',
    title: 'Hex Construction & Workers',
    caption: 'Colony expansion in real time: place farms, power facilities, and factories on hex tiles with assigned physical construction crews.',
    category: 'ECONOMY',
    width: 1280,
    height: 800,
    badge: 'CONSTRUCTION',
    actionText: 'View colony building',
  },
  {
    src: '/images/dominion/missiles-current.jpg',
    alt: 'Strategic ballistic missile silo interface with DEFCON levels, launch queue, and island minimap.',
    title: 'Strategic Missile Silo & DEFCON',
    caption: 'High-tier strategic warfare: manage silo queues, monitor island minimap sectors, and arm ballistic deterrent weapons under DEFCON alerts.',
    category: 'DEFENSE',
    width: 1280,
    height: 800,
    badge: 'STRATEGIC SILO',
    actionText: 'Explore missile systems',
  },
  {
    src: '/images/dominion/territory-current.jpg',
    alt: 'Island territory map lens showing claimed national hex boundaries and frontline influence.',
    title: 'Island Hex Borders & Diplomacy',
    caption: 'Strategic map view: monitor sovereign hex borders, contested island sectors, and diplomatic boundaries across rival nations.',
    category: 'TERRITORY',
    width: 1280,
    height: 800,
    badge: 'HEX EXPANSION',
    actionText: 'View territory map',
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
    shot: SHOTS[3], // construction-current.jpg
    bullets: [
      'שליטה ב-10 משאבי יסוד: חשמל, דלק, מתכת, מזון ואוצר לאומי',
      'בנייה על פי גבולות טריטוריה במשושים עם צוותי בנייה פיזיים',
      'ניהול רשת חשמל עירונית וכיבוי אש מובנה בגרסה הנוכחית',
    ],
  },
  {
    step: '02',
    title: 'מחקר ועיר ענק (Research & Expand)',
    sub: 'מעידן ההקמה ועד לעידן העתיד',
    desc: 'חקור עשרות טכנולוגיות בעץ מחקר 4-שלבי. ממעבר מנשק קל לחטיבות שריון כבדות, ועד לטילים היפרסוניים, סיבי תעשייה מתקדמים ומערכות הגנה אווירית מתקדמות.',
    icon: '🔬',
    shot: SHOTS[2], // metropolis-current.jpg
    bullets: [
      '4 עידנים היסטוריים: הקמה, תעשייה, מודרני ועתיד',
      'שדרוג מפעלי תעשייה, מגדלי קירור, בתי חולים ותחנות כוח',
      'פתיחת 27 דגמי טנקים מודרניים אותנטיים (Abrams, Merkava, Leopard 2, T-90)',
    ],
  },
  {
    step: '03',
    title: 'קרב בזמן אמת וכיבוש (Command & Conquer)',
    sub: 'שריון, ארטילריה, לוחמת ים וסילו טילים',
    desc: 'הקרבות בדומיניון מתרחשים בזמן אמת בתלת-ממד מלא. טנקים מזיזים צריחים לפי מטרות, פגזים מחושבים בליסטית, וספינות קרב חולשות על קווי החוף של האי מול בינה מלאכותית תוקפנית.',
    icon: '⚔️',
    shot: SHOTS[1], // combat-armor-current.jpg
    bullets: [
      'מערכת לחימה משולבת: שריון, חיל רגלים, ארטילריה וספינות',
      'מדדי חיים טקטיים, סיבוב צריחים בזמן אמת והריסות רכבים שרופים',
      'סילו טילים אסטרטגיים ומערכות נ״מ להגנת המטרופולין תחת התראות DEFCON',
    ],
  },
];

export const WHATS_NEW = {
  version: 'Alpha 1.0.6',
  intro: 'מה חדש בגרסה האחרונה:',
  items: [
    'פיזיקת תנועה: מטוסים פונים בהטיה, מסוקים נושאים תנופה ומרחפים, ספינות נענות להגה לפי אורכן, ורכבי גלגלים פונים בקשת.',
    'מודל כוח אש לכל נשק: הדף שדועך בהדרגה, רסיסים, הדף שמעיף, הצתה, מכתשים ופגיעה בכבישים, גם לראשי נפץ אסטרטגיים.',
    'פיצוץ לכל סוג נשק: רימון, פגז טנק, נ״ט, מרגמה, ארטילריה, פצצת מטוס, תרמובארי, נ״מ, טורפדו, מצרר וחודר בונקרים.',
    'לוגיסטיקה אסטרטגית: דלק וטווח למטוסים, העברת מטוסים בין בסיסים, ומלאי טילים ונשק גרעיני שנשמר ומועבר בין בסיסים, נמלים וספינות.',
    'מגרסה 1.0.5: כל המבנים, הדמויות והרכבים עוצבו מחדש ב-Blender ברמת פירוט גבוהה.',
    'טופוגרפיה ריאליסטית: גבעות מתונות (Rolling Hills), שבילי עפר בין ערים וצבעי אגמים עמוקים.',
    'מערכת שריון עדכנית: 27 דגמי טנקי מערכה מודרניים עם צריחים עוקבים ומערכת הגנה אקטיבית.',
    'מערכת לוגיסטיקה ואוכלוסייה: ניהול רשת חשמל עם עומסי MW, כבאיות ואמבולנסים פיזיים.',
    'סילו טילים ומכ״ם: בקרת טילי שיוט מתקדמת, מערכות DEFCON ועדשות מפה אסטרטגיות.',
    'שיפורי בינה מלאכותית: יריבי מחשב חכמים יותר בפריסת חזיתות ותקיפות ימיות מתוזמנות.',
  ],
};

export const KNOWN_ISSUES: string[] = [
  'קרבות ענק של מאות יחידות עשויים לרוץ מתחת ל-25 FPS בכרטיסי מסך מובנים (מומלץ לבחור בהגדרות איכות Low במידת הצורך).',
];

export const SCREENSHOT_NOTE =
  'כל צילומי המסך נלכדו ישירות מתוך המשחק בגרסה Alpha 1.0.5, הפועל ב-Godot Engine במחשב.';
