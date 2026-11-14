import {
  digitizeCtaBlock,
  digitizerContent,
  digitizingFaqBlock,
  embroideryFormatsBlock,
  quoteLabels,
  vectorFormats,
  whyBitsNPixsBlock,
} from "../shared";
import { routes } from "../site";
import type { PageContent } from "../types";

/** Interactive tool pages added in the redesign (not on the old site). */

export const stitchLabPage: PageContent = {
  meta: {
    title: "Stitch Lab: Watch a Word Become Embroidery",
    description:
      "Type a word, choose satin, fill or run stitches and a thread colour, and watch it sew out stitch by stitch in the BitsNPixs Stitch Lab.",
    path: routes.stitchLab,
  },
  hero: {
    variant: "page",
    eyebrow: "Stitch Lab",
    title: "From pixels to stitches, live.",
    lead: "Type a word, pick a stitch type and a thread, and watch it sew out. It is the idea behind everything we do, in a few seconds.",
  },
  blocks: [
    {
      type: "stitchLab",
      eyebrow: "Live digitizer",
      title: "Your word, in thread.",
      digitizer: digitizerContent,
    },
    {
      type: "features",
      layout: "grid",
      surface: "tint",
      eyebrow: "Stitch types",
      title: "Satin, fill and running stitch.",
      lead: "Every embroidery design is built from a few basic stitch types. Choosing the right one for each part of the artwork is where digitizing skill shows.",
      items: [
        {
          title: "Satin",
          body: "Long, glossy stitches laid side by side. Used for lettering, borders and narrow shapes.",
        },
        {
          title: "Fill",
          body: "Rows of short stitches that cover larger areas with an even, textured surface.",
        },
        {
          title: "Run",
          body: "A single line of stitches for outlines, fine detail and the underlay beneath other stitches.",
        },
      ],
    },
    digitizeCtaBlock,
  ],
};

export const formatsPage: PageContent = {
  meta: {
    title: "Embroidery File Formats and Machine Compatibility",
    description:
      "Find the embroidery file format for your machine. BitsNPixs delivers DST as standard and can provide EMB, EXP, PES, JEF, HUS and many more on request.",
    path: routes.formats,
  },
  hero: {
    variant: "page",
    eyebrow: "File formats",
    title: "The right file for your machine.",
    lead: "We normally provide the DST file format, but can provide any file format based on your requirement.",
    actions: [{ label: "Get a Free Quote", href: routes.quote }],
  },
  blocks: [
    { ...embroideryFormatsBlock, eyebrow: "Embroidery formats" },
    {
      type: "features",
      layout: "chips",
      eyebrow: "Your artwork",
      title: "File types you can send us",
      lead: "It is better to email .jpeg or .gif since the file size will be smaller.",
      items: [".jpg", ".gif", ".bmp", ".tif", ".ai", ".eps"].map((title) => ({ title })),
    },
    {
      type: "formats",
      surface: "tint",
      eyebrow: "Vector formats",
      title: "Vector artwork formats",
      lead: "All vector files can be provided in the given formats.",
      formats: vectorFormats,
    },
    digitizingFaqBlock,
    digitizeCtaBlock,
  ],
};

export const quotePage: PageContent = {
  meta: {
    title: "Get a Free Embroidery Digitizing Quote",
    description:
      "Build your brief in three steps and get a free quote with price estimate and stitch count within 2 to 24 hours.",
    path: routes.quote,
  },
  hero: {
    variant: "page",
    eyebrow: "Free quote",
    title: "Quotations are always free.",
    lead: "You will receive the price estimate and stitch count within 2 to 24 hours after requesting a quote.",
  },
  blocks: [
    { type: "quote", labels: quoteLabels },
    whyBitsNPixsBlock,
  ],
};
