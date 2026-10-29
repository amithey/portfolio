/**
 * Content for the BagStore showcase page, kept apart from the project
 * catalogue.
 *
 * Product photos and screenshots come from the live shop and its repository.
 * The shop's interface is in Hebrew; model names are glossed in English here,
 * with the Hebrew name kept alongside. Prices are deliberately left out, since
 * they are the seller's to change and would go stale on this page.
 */

export interface Model {
  number: string;
  en: string;
  he: string;
  image: { src: string; width: number; height: number };
}

export const MODELS: Model[] = [
  { number: '01', en: 'Coco Brown', he: 'תיק קוקו חום', image: { src: '/images/bags/bag-brown.jpg', width: 770, height: 482 } },
  { number: '02', en: 'Cream Stripe', he: 'תיק פסים שמנת', image: { src: '/images/bags/bag-pattern.jpg', width: 770, height: 469 } },
  { number: '03', en: 'Minimal Grey', he: 'תיק אפור מינימל', image: { src: '/images/bags/bag-grey.jpg', width: 762, height: 810 } },
  { number: '04', en: 'Mint Handle', he: 'תיק מנטה ידית', image: { src: '/images/bags/bag-green.jpg', width: 770, height: 795 } },
  { number: '05', en: 'Pleated Blue', he: 'תיק כחול פליסה', image: { src: '/images/bags/bag-blue.jpg', width: 734, height: 964 } },
  { number: '06', en: 'Gilded Lilac', he: 'תיק לילך מוזהב', image: { src: '/images/bags/bag-purple.jpg', width: 770, height: 785 } },
  { number: '07', en: 'Pleated Silver', he: 'תיק כסף פליסה', image: { src: '/images/bags/bag-silver.jpg', width: 770, height: 587 } },
];

export const HERO_STATS: { value: number; label: string }[] = [
  { value: 7, label: 'models in the live shop' },
  { value: 2, label: 'notification channels per order' },
  { value: 1, label: 'owner dashboard for stock and orders' },
];

export interface FlowStep {
  label: string;
  detail: string;
}

/** What happens to an order, from the code described in the repository. */
export const FLOW: FlowStep[] = [
  { label: 'Browse and choose', detail: 'Filter the collection, open a model, add it to the cart.' },
  { label: 'Validate on the server', detail: 'Every order is checked server side and rate limited, because a public form that sends messages is an obvious abuse target.' },
  { label: 'Store the order', detail: 'Products and orders live in Supabase.' },
  { label: 'Take stock off the shelf', detail: 'Stock is decremented as part of order handling, never trusted from the browser.' },
  { label: 'Tell both people', detail: 'A confirmation email to the customer through Resend, and a WhatsApp message to the owner.' },
  { label: 'Manage it', detail: 'A protected admin area for stock and order state, behind its own sign in.' },
];

export interface Screen {
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  text: string;
}

export const SCREENS: Screen[] = [
  {
    src: '/images/bags/shop-collection.jpg',
    width: 1600,
    height: 888,
    alt: 'The collection section of the shop in Hebrew, with category filters and product cards for handmade knitted bags.',
    title: 'The collection',
    text: 'Filter by shoulder bags, handbags, or ready to collect. Each card shows the bag, its model number and its price.',
  },
  {
    src: '/images/bags/shop-anatomy.jpg',
    width: 1600,
    height: 888,
    alt: 'A dark section titled the anatomy of a bag, with numbered hotspots over a photo and a panel describing the gold chain.',
    title: 'Anatomy of a bag',
    text: 'Numbered hotspots over a photo explain the chain, the clasp, the knit texture, the tag, the base and the lining.',
  },
  {
    src: '/images/bags/shop-process.jpg',
    width: 1600,
    height: 888,
    alt: 'The behind the scenes section of the shop, describing the four steps from choosing materials to personal delivery.',
    title: 'Behind the scenes',
    text: 'Four steps, from choosing yarn to personal delivery, so a buyer knows what they are waiting for.',
  },
];

export const MOBILE_SCREEN = {
  src: '/images/bags/shop-mobile.jpg',
  width: 780,
  height: 1688,
  alt: 'The shop on a phone: headline, two buttons, a row of three figures and the first product card.',
};

export const STACK = ['Next.js', 'TypeScript', 'Supabase', 'Resend', 'Tailwind CSS', 'Framer Motion', 'Lenis'];

export const NOTE_PHOTOS =
  'Photos and screens are from the live shop. The interface is in Hebrew, and reads right to left.';
