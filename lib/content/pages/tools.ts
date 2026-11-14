import { digitizeCtaBlock, digitizerContent } from "../shared";
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
