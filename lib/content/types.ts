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

export interface Product {
  name: string;
  category: string;
  price: string;
  compareAt?: string;
  href: string;
}

export interface OptionGroup {
  label: string;
  options: string[];
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
  serviceIds: ServiceId[];
}

export interface MarqueeBlock extends BlockBase {
  type: "marquee";
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
  grouped?: boolean;
  action?: LinkRef;
}

export interface TestimonialsBlock extends BlockBase {
  type: "testimonials";
  items: Testimonial[];
}

export interface FormatsBlock extends BlockBase {
  type: "formats";
  standard?: string;
  formats: string[];
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

export interface PricingBlock extends BlockBase {
  type: "pricing";
  products: Product[];
  optionGroups: OptionGroup[];
  optionsNote: string;
  orderLabel: string;
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
  | SpecialtiesBlock
  | TurnaroundBlock
  | FaqBlock
  | ContactBlock
  | PricingBlock
  | PostsBlock
  | StitchLabBlock
  | CtaBlock;

export type BlockType = Block["type"];

export interface PageContent {
  meta: PageMeta;
  hero: PageHeroContent;
  blocks: Block[];
}
