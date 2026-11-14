/**
 * Authentic showcase data for Dominion (Alpha 1.0.6)
 * Built with Godot 4.7 Engine.
 *
 * Windows installer rebuilt on 14/11/2026 (Alpha 1.0.6.0).
 * 100% authentic in-engine screenshots from the native Godot build.
 */

export const HERO_STATS: { value: string; label: string }[] = [
  { value: '1.0.6', label: 'גרסת Alpha עדכנית' },
  { value: '79', label: 'יחידות קרב מאוזנות' },
  { value: '616 MB', label: 'קובץ התקנה (Rebuild)' },
  { value: '60 FPS', label: 'מנוע MultiMesh מהיר' },
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
      'ניהול רשת חשמל עירונית, כיבוי אש ושינוע אספקה מובנה בגרסה הנוכחית',
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
    sub: 'שריון, לוגיסטיקה אווירית, לוחמת ים וסילו טילים',
    desc: 'הקרבות בדומיניון מתרחשים בזמן אמת בתלת-ממד מלא. טנקים מזיזים צריחים לפי מטרות, פגזים מחושבים בליסטית, וספינות קרב חולשות על קווי החוף של האי מול בינה מלאכותית תוקפנית.',
    icon: '⚔️',
    shot: SHOTS[1], // combat-armor-current.jpg
    bullets: [
      'מערכת לחימה משולבת: 79 יחידות קרב מאוזנות מחדש ב-Alpha 1.0.6',
      'פיזיקת תנועה: הטיית כלי טיס, מומנטום מסוקים והיגוי ספינות בריאליזם מלא',
      'לוגיסטיקה אסטרטגית: ניהול דלק למטוסים והעברת טילים וראשי נפץ בין בסיסים',
      'ביצורי שטח: שוחות חיל רגלים, מחסומי נ״ט (שיני דרקון) ושדות מוקשים טקטיים',
    ],
  },
];

export const WHATS_NEW = {
  version: 'Alpha 1.0.6 (Rebuilt 14/11/2026)',
  intro: 'גרסה רשמית עדכנית למחשב (Windows x64) לאחר בנייה ואריזה מחדש של ה-Installer:',
  items: [
    'פיזיקת תנועה ריאליסטית: הטיית כנף בפניות מטוסים (Banking Turns), מומנטום וריחוף מסוקים, זווית נטייה והגה בספינות, וקשתות סיבוב לרכבי גלגלים.',
    'מודל כוח אש וחימוש ייעודי: כל פגז וטיל מחושבים לפי פרופיל פיצוץ מדויק (הדף מתפוגג, רסיסים, הדף מעיף, מכתשים, שריפות והרס כבישים).',
    'אפקטי פיצוץ אותנטיים: מודל ויזואלי ייחודי לכל סוג חימוש — פגזי טנק, טילי נ״ט, מרגמות, ארטילריה כבדה, פצצות אוויר, חימוש תרמובארי וטורפדו.',
    'לוגיסטיקה אסטרטגית ודלק: מטוסי קרב שורפים דלק לפי מרחק וזמן שהייה באוויר (כולל חישוב דלק לחזרה - Bingo Fuel), העברת מטוסים בין בסיסים, ושינוע ראשי נפץ בין בסיסים וצוללות.',
    'ביצורי שדה קרב: שוחות הגנה לחיל רגלים, מחסומי נ״ט (Dragon Teeth) ושדות מוקשים טקטיים לבלימת מתקפות שריון.',
    'תיקון אריזת טקסטורות ב-Installer: כל משפחות החומרים של מבני ה-Blender (אספלט, מרצפות, אדמה, חצץ, חול והסוואה) נארזו כעת במלואן לתוך קובץ ההתקנה.',
    'איזון מקיף: כיול מחדש לכל 79 היחידות החמושות במשחק, והאטת קצב התפשטות שריפות במבנים.',
  ],
};

export const KNOWN_ISSUES: string[] = [
  'קרבות ענק של מאות יחידות עשויים לרוץ מתחת ל-25 FPS בכרטיסי מסך מובנים (מומלץ לבחור בהגדרות איכות Low במידת הצורך).',
];

export const SCREENSHOT_NOTE =
  'כל צילומי המסך נלכדו ישירות מתוך הגרסה הרשמית של המשחק (Alpha 1.0.6) הפועלת ב-Godot Engine במחשב.';
