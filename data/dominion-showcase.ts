/**
 * Content for the Dominion showcase page, kept apart from the project
 * catalogue so a new release is a data edit.
 *
 * Sources: the v1.0.3-alpha release notes, the repository README, and the
 * screenshots captured from the local development build. That build is 1.0.4
 * alpha, ahead of the published 1.0.3 download, and the page says so rather
 * than passing them off as the download. Screens that show real people's
 * portraits (the diplomacy contacts) are deliberately not used.
 */

export const HERO_STATS: { value: string; label: string }[] = [
  { value: '1.0.3', label: 'alpha build' },
  { value: '27', label: 'main battle tank models' },
  { value: '69', label: 'armoured carriers and support vehicles' },
  { value: '199 MB', label: 'Windows installer' },
];

export interface Shot {
  src: string;
  alt: string;
  title: string;
  caption: string;
  width: number;
  height: number;
}

export const HERO_SHOT: Shot = {
  src: '/images/dominion/hero-city.jpg',
  alt: 'A hex-tiled capital seen from above in spring, with roads, towers, a missile site and territory borders.',
  title: 'The capital',
  caption: 'A developed capital in spring.',
  width: 1360,
  height: 840,
};

export const SHOTS: Shot[] = [
  {
    src: '/images/dominion/winter-city.jpg',
    alt: 'The same capital under snow, with aircraft, a missile battery and a solar-panelled tower among the homes.',
    title: 'A capital in winter',
    caption: 'Seasons change the map. Snow settles over homes, a missile site, a solar-panelled tower and aircraft.',
    width: 1600,
    height: 590,
  },
  {
    src: '/images/dominion/security-council.jpg',
    alt: 'The UN Security Council screen showing an agenda item, each delegation’s ballot, and the result of the vote.',
    title: 'The Security Council',
    caption: 'A UN session in play: the agenda, each delegation’s ballot, and your own vote. This one failed, 0 yes, 2 no, 1 abstain.',
    width: 1400,
    height: 788,
  },
];

export interface Feature {
  tag: string;
  title: string;
  text: string;
}

export const FEATURES: Feature[] = [
  {
    tag: 'Build',
    title: 'Found it and grow it',
    text: 'Start from a headquarters, found villages and cities, claim territory, and place buildings on hex tiles.',
  },
  {
    tag: 'Research',
    title: 'Advance through eras',
    text: 'Research your way through national eras. What you can build depends on how far you have come.',
  },
  {
    tag: 'Diplomacy',
    title: 'Talk before you fight',
    text: 'Foreign offices offer trade agreements, shipping routes, non-aggression treaties, military transit permits, and arms exports.',
  },
  {
    tag: 'War',
    title: 'By land and sea',
    text: 'Fight AI opponents on a map where the coastline is a real constraint: shipyards must touch water and warships patrol the ocean.',
  },
];

export const WHATS_NEW = {
  version: 'Alpha 1.0.3',
  intro: 'The latest release, for testers.',
  items: [
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
  'Tanks may stall in narrow gaps, and riflemen cannot yet hurt tanks.',
  'The installer is not code signed, so Windows may warn about an unrecognised publisher.',
];

export const SCREENSHOT_NOTE =
  'Screenshots are from the current development build, 1.0.4 alpha, which is a little ahead of the 1.0.3 download below.';
