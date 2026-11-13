import { routes } from "./site";
import type {
  CtaBlock,
  Faq,
  FaqBlock,
  FeaturesBlock,
  TurnaroundBlock,
  TurnaroundOption,
} from "./types";

/** Content that appears on more than one page lives here, once. */

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

export const vectorFormats = ["AI (Adobe Illustrator)", "CDR (CorelDraw)", "PDF", "EPS (Encapsulated PostScript)", "WMF", "DXF"];

export const turnaroundOptions: TurnaroundOption[] = [
  {
    id: "standard",
    label: "Standard",
    time: "24 hours",
    body: "Our standard package comes with a 24 hours turnaround time.",
  },
  {
    id: "rush",
    label: "Rush Job",
    time: "2 to 12 hours",
    body: "Our Rush Job package provides a turnaround time of 2 to 12 hours for a few extra bucks.",
  },
];

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

export const digitizeCtaBlock: CtaBlock = {
  type: "cta",
  surface: "dark",
  title: "Digitize your designs today.",
  lead: "Trusted by 5,000+ clients for precise and high-quality embroidery designs.",
  actions: [
    { label: "Contact Us", href: routes.contact },
    { label: "Shop Now", href: routes.shop },
  ],
};
