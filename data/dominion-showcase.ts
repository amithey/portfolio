/**
 * Content for the Dominion showcase page, kept apart from the project
 * catalogue so a new release is a data edit.
 *
 * Sources: the GitHub release notes, the repository README, and real
 * screenshots captured from the Alpha 1.0.4 game on Windows.
 */

export const HERO_STATS: { value: string; label: string }[] = [
  { value: '1.0.4', label: 'alpha build' },
  { value: '27', label: 'main battle tank models' },
  { value: '69', label: 'armoured carriers and support vehicles' },
  { value: '394 MB', label: 'Windows installer' },
];

export interface Shot {
  src: string;
  alt: string;
  title: string;
  caption: string;
  width: number;
  height: number;
  badge?: string;
}

export const HERO_SHOT: Shot = {
  src: '/images/dominion/main-menu.jpg',
  alt: 'The grand war table of Dominion with campaign map, miniature troops, compass, brass sextant, and campaign options.',
  title: 'The War Table',
  caption: 'The strategic campaign room: a world to shape, a nation to lead.',
  width: 1920,
  height: 1080,
};

export const SHOTS: Shot[] = [
  {
    src: '/images/dominion/alpha-metropolis.jpg',
    alt: 'High-altitude tactical aerial view of an Alpha 1.0.4 sprawling capital city on hex tiles with factories, cooling towers, roads, and artillery units.',
    title: 'Metropolis · Alpha 1.0.4',
    caption: 'The latest build in action: batched MultiMesh foliage, bustling industrial facilities, cooling towers, artillery divisions, and territory boundaries.',
    width: 1400,
    height: 822,
    badge: 'LATEST BUILD',
  },
  {
    src: '/images/dominion/gameplay-hud.jpg',
    alt: 'In-game command view showing real-time resources, missile silo build queue, hypersonic missile launch controls, and tactical island minimap.',
    title: 'Command HUD & Strategic Weapons',
    caption: 'Full gameplay interface: comprehensive resource economics, island minimap with camera viewports, and active missile silo bombardment controls.',
    width: 1920,
    height: 1080,
    badge: 'LIVE HUD',
  },
  {
    src: '/images/dominion/strategic-city.jpg',
    alt: 'Close-up of the strategic weapons complex and city center with classical architecture domes, red-and-white smokestacks, and radar batteries.',
    title: 'Strategic Weapons Complex',
    caption: 'City center with research universities, factories with active smoke columns, nuclear assembly facilities, and defensive SAM arrays.',
    width: 1920,
    height: 1080,
    badge: 'CITY & DEFENSE',
  },
  {
    src: '/images/dominion/missile-base.jpg',
    alt: 'Perimeter missile base with surface-to-air radars, missile silos, and ammunition depots arranged along hex boundaries.',
    title: 'Radar Perimeter & Missile Battery',
    caption: 'Hex-tiled military outpost: tracking radar dishes, ballistic missile silos, and hardened bunkers guarding territory borders.',
    width: 1920,
    height: 1080,
    badge: 'MILITARY OUTPOST',
  },
  {
    src: '/images/dominion/main-menu.jpg',
    alt: 'The ornate war table with miniature regiments, compass, brass instruments, and campaign choices.',
    title: 'The War Council Screen',
    caption: 'The campaign briefing table with wax seal orders, historical miniature battalions, and campaign settings.',
    width: 1920,
    height: 1080,
    badge: 'CAMPAIGN DESK',
  },
];

export interface Feature {
  tag: string;
  title: string;
  text: string;
  icon: string;
}

export const FEATURES: Feature[] = [
  {
    tag: 'Build',
    title: 'Found it and grow it',
    text: 'Start from a headquarters, found villages and cities, claim territory, and place buildings on hex tiles.',
    icon: '🏛️',
  },
  {
    tag: 'Research',
    title: 'Advance through eras',
    text: 'Research your way through national eras. What you can build depends on how far you have come.',
    icon: '🔬',
  },
  {
    tag: 'Diplomacy',
    title: 'Talk before you fight',
    text: 'Foreign offices offer trade agreements, shipping routes, non-aggression treaties, military transit permits, and arms exports.',
    icon: '🕊️',
  },
  {
    tag: 'War',
    title: 'By land and sea',
    text: 'Fight AI opponents on a map where the coastline is a real constraint: shipyards must touch water and warships patrol the ocean.',
    icon: '⚔️',
  },
];

export const WHATS_NEW = {
  version: 'Alpha 1.0.4',
  intro: 'The latest release, for testers.',
  items: [
    'Engine & late-game performance overhaul: batched MultiMesh instances for grass & foliage cards, shared shader materials, bounded physics queries, and zero-allocation per-frame updates.',
    'Late-game stability: resolved framerate drops and micro-stutters during heavy combat, large armies, and extended play sessions.',
    'Combat & AI fixes: patched retreat navigation, carrier strike wings, target re-acquisition loops, and bunker health overlay refresh.',
    'The whole armoured army has real models, each nation’s own: 27 main battle tanks and 69 carriers, fighting vehicles, scouts and support vehicles.',
    'Turrets turn to the target, guns lift to the range and kick back, wheels roll, track pads run round their loop, and a destroyed vehicle becomes a burnt-out wreck.',
    'The meadow is now many kinds of grass, wildflowers, shrubs and reeds, swaying in the wind and under snow in winter.',
    'Iron, gold, coal or silicon, uranium and diamond sites each show their own ore.',
    'New building models: school, library, hospital, bank, police station, market hall, factory with a smoking stack, warehouse, power station, silo and more.',
  ],
};

/** Stated plainly in the release notes, so stated plainly here. */
export const KNOWN_ISSUES: string[] = [
  'Very large battles can run below 25 frames a second on integrated graphics. Setting Graphics to Low in Settings helps.',
];

export const SCREENSHOT_NOTE =
  'Real captures from the Godot native Windows build (Alpha 1.0.4). High-resolution tactical views, in-game missile interfaces, and the war council screen.';
