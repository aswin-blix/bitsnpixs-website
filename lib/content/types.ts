/**
 * Content model. Every page is a hero plus an ordered list of typed blocks;
 * components/sections/BlockRenderer.tsx maps each block type to a section.
 * Adding a page or reordering sections is a data change, not a component change.
 */

import type { StitchKind } from "../stitch/engine";

export type Surface = "light" | "tint" | "dark";

export interface ImageRef {
  /** Undefined means "no asset yet": the UI renders an ImagePlaceholder. */
  src?: string;
  alt: string;
  width: number;
  height: number;
}

export interface LinkRef {
  label: string;
  href: string;
  external?: boolean;
}

export interface PageMeta {
  title: string;
  description: string;
  path: string;
}

export interface Step {
  title?: string;
  body: string;
}

export interface Feature {
  title: string;
  body?: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  company?: string;
  location?: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export type ServiceId = "embroidery" | "coloreel" | "vector" | "software";

export interface ServiceSummary {
  id: ServiceId;
  name: string;
  path: string;
  summary: string;
  image?: ImageRef;
}

export type PortfolioCategoryId = "coloreel" | "embroidery" | "vector";

export interface PortfolioCategory {
  id: PortfolioCategoryId;
  label: string;
  /** One-word label for the portfolio filter. */
  shortLabel: string;
  action: LinkRef;
}

export interface PortfolioItem {
  id: string;
  category: PortfolioCategoryId;
  before: ImageRef;
  after: ImageRef;
}

export type PlacementId = "cap" | "left-chest" | "jacket-back";

export interface Placement {
  id: PlacementId;
  label: string;
}

export interface Studio {
  id: string;
  kind: string;
  city: string;
  address: string;
  /** Used only to position the studio on the schematic route map. */
  lat: number;
  lng: number;
}

export interface ProductSpec {
  label: string;
  value: string;
}

/** A shop item. Data lives in lib/content/products.json. */
export interface Product {
  slug: string;
  name: string;
  category: string;
  /** Base price in the catalog currency, before option extras. */
  price: number;
  compareAt?: number;
  tagline: string;
  summary: string;
  description: string[];
  includes: string[];
  specs: ProductSpec[];
  /** Option groups asked when ordering, in order. */
  groupIds: string[];
  /** Which format list applies to this product. */
  formats: "embroidery" | "vector";
  /** Portfolio samples of this category join the product image in the gallery. */
  portfolioCategory: PortfolioCategoryId;
  image: ImageRef;
  path: string;
}

export interface Post {
  title: string;
  date: string;
  category: string;
  href: string;
}

export interface TurnaroundOption {
  id: string;
  label: string;
  time: string;
  body: string;
  /** Fastest and slowest delivery in hours, used by the delivery clock. */
  hours: [min: number, max: number];
}

export interface Market {
  id: string;
  country: string;
  city: string;
  timeZone: string;
  lat: number;
  lng: number;
  hq?: boolean;
}

export interface MachineFormats {
  brand: string;
  formats: string[];
}

/** Labels and options for the live digitizer (components/sections/StitchPad). */
export interface DigitizerContent {
  defaultText: string;
  inputLabel: string;
  kindLabel: string;
  threadLabel: string;
  countLabel: string;
  replayLabel: string;
  note: string;
  kinds: { id: StitchKind; label: string }[];
}

export interface PageHeroContent {
  /** "immersive" is the home hero with the 3D field; "page" is the inner-page hero. */
  variant: "immersive" | "page";
  eyebrow?: string;
  title: string;
  /** Short page name for the breadcrumb. Defaults to the title. */
  breadcrumb?: string;
  lead?: string;
  image?: ImageRef;
  actions?: LinkRef[];
  /** Shows the live digitizer beside the headline (immersive hero only). */
  digitizer?: DigitizerContent;
}

interface BlockBase {
  surface?: Surface;
  eyebrow?: string;
  title?: string;
  lead?: string;
}

export interface StatementBlock extends BlockBase {
  type: "statement";
  statement: string;
  paragraphs: string[];
  image?: ImageRef;
}

export interface ProseBlock extends BlockBase {
  type: "prose";
  paragraphs: string[];
  callout?: string;
  image?: ImageRef;
  imageSide?: "left" | "right";
  list?: { title?: string; items: string[]; tone: "check" | "cross" };
  action?: LinkRef;
}

export interface ServicesBlock extends BlockBase {
  type: "services";
  /** "index" is the oversized list with a cursor-following preview; "cards" a grid. */
  layout: "index" | "cards";
  serviceIds: ServiceId[];
}

export interface MarqueeBlock extends BlockBase {
  type: "marquee";
  /** "display" for huge keywords, "facts" for a compact band of proof points. */
  variant: "display" | "facts";
  items: string[];
}

export interface StoryBlock extends BlockBase {
  type: "story";
  /** "stack" pins and swaps steps in place; "horizontal" scrolls them sideways. */
  mode: "stack" | "horizontal";
  thread: "brand" | "spectrum";
  steps: Step[];
  action?: LinkRef;
}

export interface FeaturesBlock extends BlockBase {
  type: "features";
  layout: "grid" | "rows" | "chips";
  items: Feature[];
}

export interface StatsBlock extends BlockBase {
  type: "stats";
  items: Stat[];
}

export interface PortfolioBlock extends BlockBase {
  type: "portfolio";
  category?: PortfolioCategoryId;
  limit?: number;
  /** Show every sample with the category filter (the portfolio page). */
  explorer?: { allLabel: string; filterLabel: string };
  action?: LinkRef;
}

export interface QuoteOption {
  label: string;
  /** Added to the product's base price when chosen. */
  extra?: number;
  hint?: string;
}

export interface QuoteGroup {
  id: string;
  label: string;
  options: QuoteOption[];
}

/** Everything the quote builder and product pages order from. */
export interface Catalog {
  currency: string;
  products: Product[];
  groups: QuoteGroup[];
}

/** Wording shared by the quote builder and the product configurator. */
export interface QuoteLabels {
  steps: [product: string, options: string, details: string];
  productTitle: string;
  optionsTitle: string;
  detailsTitle: string;
  summaryTitle: string;
  summaryEmpty: string;
  priceLabel: string;
  quantityLabel: string;
  priceNote: string;
  /** Shown in the action bar until every option group is answered. */
  chooseAll: string;
  artworkNote: string;
  notesLabel: string;
  next: string;
  back: string;
  request: string;
  submit: string;
}

export interface QuoteBlock extends BlockBase {
  type: "quote";
  labels: QuoteLabels;
}

export interface Rating {
  score: number;
  outOf: number;
  label: string;
}

/** Control labels for the testimonial showcase. */
export interface TestimonialLabels {
  listLabel: string;
  previous: string;
  next: string;
  pause: string;
  play: string;
}

export interface TestimonialsBlock extends BlockBase {
  type: "testimonials";
  items: Testimonial[];
  rating?: Rating;
  labels: TestimonialLabels;
}

export interface FormatsBlock extends BlockBase {
  type: "formats";
  standard?: string;
  formats: string[];
  /** Adds the machine finder: pick a brand to highlight the formats it reads. */
  finder?: {
    prompt: string;
    allLabel: string;
    resultLabel: string;
    note: string;
    machines: MachineFormats[];
  };
}

export interface GlobalBlock extends BlockBase {
  type: "global";
  markets: Market[];
  clockTitle: string;
  deliveryTitle: string;
  deliveryNote: string;
  options: TurnaroundOption[];
}

export interface SpecialtiesBlock extends BlockBase {
  type: "specialties";
  placements: Placement[];
  techniques: string[];
}

export interface TurnaroundBlock extends BlockBase {
  type: "turnaround";
  options: TurnaroundOption[];
}

export interface FaqBlock extends BlockBase {
  type: "faq";
  items: Faq[];
}

export interface ContactBlock extends BlockBase {
  type: "contact";
  stat: Stat;
  image?: ImageRef;
}

export interface ProductsBlock extends BlockBase {
  type: "products";
  /** Leave one product out (used for "more products" on a product page). */
  excludeSlug?: string;
  actionLabel: string;
}

export interface PostsBlock extends BlockBase {
  type: "posts";
  posts: Post[];
}

export interface StitchLabBlock extends BlockBase {
  type: "stitchLab";
  digitizer: DigitizerContent;
}

export interface CtaBlock extends BlockBase {
  type: "cta";
  actions: LinkRef[];
}

export type Block =
  | StatementBlock
  | ProseBlock
  | ServicesBlock
  | MarqueeBlock
  | StoryBlock
  | FeaturesBlock
  | StatsBlock
  | PortfolioBlock
  | TestimonialsBlock
  | FormatsBlock
  | GlobalBlock
  | SpecialtiesBlock
  | TurnaroundBlock
  | FaqBlock
  | ContactBlock
  | ProductsBlock
  | PostsBlock
  | StitchLabBlock
  | QuoteBlock
  | CtaBlock;

export type BlockType = Block["type"];

export interface PageContent {
  meta: PageMeta;
  hero: PageHeroContent;
  blocks: Block[];
}
