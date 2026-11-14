import { routes } from "./site";
import markets from "./markets.json";
import type {
  CtaBlock,
  DigitizerContent,
  FormatsBlock,
  GlobalBlock,
  MachineFormats,
  Market,
  QuoteLabels,
  Rating,
  StoryBlock,
  TestimonialLabels,
  Faq,
  FaqBlock,
  FeaturesBlock,
  TurnaroundBlock,
  TurnaroundOption,
} from "./types";

/** Content that appears on more than one page lives here, once. */

export const digitizerContent: DigitizerContent = {
  defaultText: "BitsNPixs",
  inputLabel: "Type a word and watch it stitch",
  kindLabel: "Stitch type",
  threadLabel: "Thread colour",
  countLabel: "Stitches",
  replayLabel: "Replay",
  note: "A playful simulation. Your real files are digitized by hand by our in-house digitizers and test-stitched before delivery.",
  kinds: [
    { id: "satin", label: "Satin" },
    { id: "fill", label: "Fill" },
    { id: "run", label: "Run" },
  ],
};

export const embroideryFormats = [
  "DST",
  "EMB",
  "EXP",
  "CND",
  "DSB",
  "DSZ",
  "KSM",
  "T01",
  "T03",
  "T04",
  "T05",
  "T09",
  "TAP",
  "SEW",
  "JEF",
  "HUS",
  "PES",
  "PEC",
  "PCS",
  "PCD",
  "PCQ",
  "CSD",
];

/**
 * Which machine families read which of the formats above. General industry
 * reference (Wilcom / Embird format tables), not a BitsNPixs claim.
 */
export const machineFormats: MachineFormats[] = [
  { brand: "Tajima", formats: ["DST", "T01"] },
  { brand: "Barudan", formats: ["DSB", "T03"] },
  { brand: "Brother / Baby Lock", formats: ["PES", "PEC"] },
  { brand: "Melco", formats: ["EXP", "CND"] },
  { brand: "ZSK", formats: ["DSZ", "T05"] },
  { brand: "Janome / Elna", formats: ["JEF", "SEW"] },
  { brand: "Husqvarna Viking", formats: ["HUS"] },
  { brand: "Pfaff", formats: ["PCS", "PCD", "PCQ", "KSM"] },
  { brand: "Happy", formats: ["TAP"] },
  { brand: "Singer / Poem", formats: ["CSD"] },
  { brand: "Zangs", formats: ["T04"] },
  { brand: "Wilcom software", formats: ["EMB"] },
];

export const embroideryFormatsBlock: FormatsBlock = {
  type: "formats",
  surface: "tint",
  eyebrow: "File formats",
  title: "Which machine do you run?",
  lead: "Our standard file format is DST, but if you require any other format for the digitized file, we are compatible with all of these and can provide them.",
  standard: "DST",
  formats: embroideryFormats,
  finder: {
    prompt: "Pick your machine",
    allLabel: "All formats",
    resultLabel: "We can send",
    note: "Most commercial machines also read DST. Not sure? Tell us your machine and we will send the right file.",
    machines: machineFormats,
  },
};

export const trustFacts = [
  "Since 2011",
  "4.7/5 rating",
  "5,000+ clients",
  "24/7 support",
  "Free quotes in 2 to 24 hours",
  "Free edits within 30 days",
  "24 hours standard turnaround",
  "Rush jobs in 2 to 12 hours",
];

export const audienceBlock: FeaturesBlock = {
  type: "features",
  layout: "chips",
  eyebrow: "Who we work with",
  title: "Trusted by decorators and distributors worldwide.",
  lead: "We work with promotional product firms, renowned sign-makers, label makers, embroidery shops and apparel decorators.",
  items: [
    { title: "Embroidery shops" },
    { title: "Promotional product firms" },
    { title: "Apparel decorators" },
    { title: "Sign-makers" },
    { title: "Label makers" },
    { title: "Distributors" },
  ],
};

export const vectorFormats = ["AI (Adobe Illustrator)", "CDR (CorelDraw)", "PDF", "EPS (Encapsulated PostScript)", "WMF", "DXF"];

export const turnaroundOptions: TurnaroundOption[] = [
  {
    id: "standard",
    label: "Standard",
    time: "24 hours",
    body: "Our standard package comes with a 24 hours turnaround time.",
    hours: [24, 24],
  },
  {
    id: "rush",
    label: "Rush Job",
    time: "2 to 12 hours",
    body: "Our Rush Job package provides a turnaround time of 2 to 12 hours for a few extra bucks.",
    hours: [2, 12],
  },
];

export const globalBlock: GlobalBlock = {
  type: "global",
  eyebrow: "Worldwide",
  title: "Night or day, we are always there.",
  lead: "We mainly work with customers in the U.S.A, U.K, Australia and Canada, with support available 24 hours a day from our studios in India.",
  markets: markets as Market[],
  clockTitle: "Local time",
  deliveryTitle: "Order now, ready by",
  deliveryNote: "Shown in your own time zone. Turnaround depends on the complexity of the artwork.",
  options: turnaroundOptions,
};

export const turnaroundBlock: TurnaroundBlock = {
  type: "turnaround",
  surface: "tint",
  eyebrow: "Fast Turnaround",
  title: "Faster turnaround time",
  lead: "The turnaround time is based on the complexity of the image you send us. If you let us know your emergency, top priority will be given to your job.",
  options: turnaroundOptions,
};

export const whyBitsNPixsBlock: FeaturesBlock = {
  type: "features",
  layout: "grid",
  surface: "tint",
  eyebrow: "Why BitsNPixs?",
  title: "We bring solutions to make life easier.",
  items: [
    {
      title: "4.7/5 Rating",
      body: "Listen to real reviews about our service from our clientele. We always ensure that customer satisfaction is kept on top.",
    },
    {
      title: "24/7 Support",
      body: "Our services are available to our customers 24 hours a day. Be it night or day, we are always there to help our customers.",
    },
    {
      title: "Easy & Secure Payment",
      body: "We accept payment through various modes such as PayPal, Credit Cards, Debit Cards and Wire Transfers.",
    },
    {
      title: "Fast Turnaround",
      body: "A standard package with 24 hours delivery time, and for the rush package we deliver in 2 to 12 hours.",
    },
    {
      title: "Experienced Team",
      body: "10+ years of experience in the industry.",
    },
    {
      title: "Design Backup",
      body: "We offer you a safe and easy environment to manage your orders efficiently and keep track of order details.",
    },
  ],
};

export const whyVectorBlock: FeaturesBlock = {
  type: "features",
  layout: "chips",
  title: "Why our vector artwork service?",
  items: [
    { title: "Experienced Team" },
    { title: "Fast Turnaround" },
    { title: "Manual Tracing" },
    { title: "Scalable" },
    { title: "Affordable Rates" },
    { title: "Internal Quality Check" },
    { title: "Handling Large Volumes" },
    { title: "High Speed Connectivity" },
  ],
};

const fileTypesFaq: Faq = {
  question: "What are the file types that I can send you?",
  answer:
    "The file formats that you can send us are .jpg, .gif, .bmp, .tif, .ai and .eps. It is better to email .jpeg or .gif since the file size will be smaller.",
};

export const digitizingFaqBlock: FaqBlock = {
  type: "faq",
  title: "Frequently asked questions",
  items: [
    fileTypesFaq,
    {
      question: "How do I receive the final file?",
      answer:
        "After your approval and successful payment, we will email you the PDF and DST (or any other format) file.",
    },
    {
      question: "In which format will I receive my completed files?",
      answer:
        "We normally provide the DST file format, but can provide any file format based on your requirement.",
    },
    {
      question: "What is your turnaround time?",
      answer:
        "The turnaround time is based on the complexity of the image you send us. Normally we deliver within 24 hours. If you let us know your emergency, top priority will be given to your job.",
    },
  ],
};

export const coloreelFaqBlock: FaqBlock = {
  type: "faq",
  title: "Frequently asked questions",
  items: [
    fileTypesFaq,
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach our customer support team by emailing info@bitsnpixs.com, calling +91 808 670 0015, or using the live chat on our website. Our dedicated team is available 24/7 to assist with any inquiries or issues.",
    },
  ],
};

/** The five ordering steps, told as a pinned chapter on the home and product pages. */
export const orderStepsBlock: StoryBlock = {
  type: "story",
  mode: "stack",
  thread: "brand",
  surface: "dark",
  eyebrow: "How we do it",
  title: "Steps to follow for placing the order.",
  action: { label: "Shop Now", href: routes.shop },
  steps: [
    {
      title: "Sign up & share your design",
      body: "Sign up, fill in your embroidery requirements, upload your design at checkout, and make a quick, secure payment to get your digitizing journey started seamlessly.",
    },
    {
      title: "We digitize your artwork",
      body: "Once we receive your request, our expert team carefully analyzes your artwork and digitizes it according to your embroidery specifications. We ensure precision at every stage to eliminate thread breakage during production.",
    },
    {
      title: "Tested for perfection",
      body: "After digitizing, we run your design on our machines to ensure smooth stitching with zero thread breakage. This extra step saves you time and guarantees flawless results before delivery.",
    },
    {
      title: "Quality check",
      body: "Our quality assurance team thoroughly reviews the digitized file to ensure it meets your exact requirements. Only after it passes our strict quality standards is it approved for delivery.",
    },
    {
      title: "Order delivery",
      body: "Once the quality check is complete, we'll deliver the final digitized files straight to your inbox in your preferred format. Plus, we offer 100% free revisions to make any adjustments you need.",
    },
  ],
};

export const quoteLabels: QuoteLabels = {
  steps: ["Product", "Design", "Your details"],
  productTitle: "What do you need?",
  optionsTitle: "Tell us about the design.",
  detailsTitle: "Where should we send the quote?",
  summaryTitle: "Your brief",
  summaryEmpty: "Pick a product to start your brief.",
  priceLabel: "Online price",
  quantityLabel: "Quantity",
  priceNote: "Rush jobs and bulk orders are quoted individually. Quotations are always free.",
  chooseAll: "Choose an option in each group to continue",
  artworkNote:
    "Have your artwork ready: .jpg, .gif, .bmp, .tif, .ai or .eps. Attach it to the email, or send it when we reply.",
  notesLabel: "Anything else we should know?",
  next: "Continue",
  back: "Back",
  request: "Request a Quote",
  submit: "Send My Quote Request",
};

/** From the old site: "4.7/5 Rating. Listen to real reviews about our service from our clientele." */
export const clientRating: Rating = { score: 4.7, outOf: 5, label: "Client rating" };

export const testimonialLabels: TestimonialLabels = {
  listLabel: "Choose a client review",
  previous: "Previous review",
  next: "Next review",
  pause: "Pause reviews",
  play: "Play reviews",
};

export const digitizeCtaBlock: CtaBlock = {
  type: "cta",
  title: "Digitize your designs today.",
  lead: "Trusted by 5,000+ clients for precise and high-quality embroidery designs.",
  actions: [
    { label: "Get a Free Quote", href: routes.quote },
    { label: "Shop Now", href: routes.shop },
  ],
};
