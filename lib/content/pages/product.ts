import { catalog } from "../products";
import {
  digitizeCtaBlock,
  digitizingFaqBlock,
  embroideryFormatsBlock,
  orderStepsBlock,
  vectorFormats,
} from "../shared";
import type { Block, PageMeta, Product } from "../types";

/** Wording on product pages and product cards. */
export const productsLabels = {
  shopCrumb: "Shop",
  includesTitle: "What you get",
  detailsEyebrow: "Details",
  specsTitle: "Embroidery file guidelines",
  sizeEyebrow: "Sizing",
  sizeTitle: "Choose the size by placement.",
  sizeLead:
    "Choose the size based on the intended placement of your design (for example left chest, cap front or jacket back) for the most professional finish.",
  moreEyebrow: "Shop",
  moreTitle: "More from the shop",
  viewLabel: "View Details",
  fromLabel: "From",
  galleryLabel: "Product images",
  sampleLabel: "Sample",
  configureStep: "Configure",
  detailsStep: "Your details",
  /** Proof points shown under the product title (figures from the old site). */
  highlights: ["4.7/5 rating", "130+ digitizers", "24/7 support"],
} as const;

export function productMeta(product: Product): PageMeta {
  return { title: `${product.name}: ${product.tagline}`, description: product.summary, path: product.path };
}

/** The sections below the ordering panel on a product page, built from the product's data. */
export function productBlocks(product: Product): Block[] {
  const sizeGroup = product.groupIds.includes("size") ? catalog.groups.find((group) => group.id === "size") : undefined;
  const isVector = product.formats === "vector";

  const blocks: (Block | false | undefined)[] = [
    {
      type: "prose",
      eyebrow: productsLabels.detailsEyebrow,
      title: product.name,
      paragraphs: product.description,
      list: { title: productsLabels.includesTitle, tone: "check", items: product.includes },
    },
    product.specs.length > 0 && {
      type: "features",
      layout: "rows",
      surface: "tint",
      title: productsLabels.specsTitle,
      items: product.specs.map((spec) => ({ title: spec.value, body: spec.label })),
    },
    sizeGroup && {
      type: "features",
      layout: "grid",
      eyebrow: productsLabels.sizeEyebrow,
      title: productsLabels.sizeTitle,
      lead: productsLabels.sizeLead,
      items: sizeGroup.options.map((option) => ({ title: option.label, body: option.hint })),
    },
    orderStepsBlock,
    isVector
      ? { type: "formats", surface: "tint", eyebrow: "File formats", title: "Available formats", formats: vectorFormats }
      : embroideryFormatsBlock,
    digitizingFaqBlock,
    {
      type: "products",
      surface: "tint",
      eyebrow: productsLabels.moreEyebrow,
      title: productsLabels.moreTitle,
      excludeSlug: product.slug,
      actionLabel: productsLabels.viewLabel,
    },
    digitizeCtaBlock,
  ];

  return blocks.filter((block): block is Block => Boolean(block));
}
