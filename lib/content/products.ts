import { image, type ImageId } from "./images";
import data from "./products.json";
import { turnaroundOptions } from "./shared";
import { routes } from "./site";
import type { Catalog, Product, QuoteGroup } from "./types";

/**
 * The shop catalog. Products, prices and option groups come from
 * products.json so they can later be swapped for an API or CMS response with
 * the same shape. Nothing else in the app reads the JSON directly.
 */

export const productPath = (slug: string) => `${routes.shop}/${slug}`;

/** Turnaround is defined once (shared.ts) and offered on every product. */
const turnaroundGroup: QuoteGroup = {
  id: "turnaround",
  label: "Turnaround",
  options: turnaroundOptions.map((option) => ({ label: `${option.label} (${option.time})`, hint: option.body })),
};

export const products: Product[] = data.products.map((entry) => ({
  ...entry,
  formats: entry.formats as Product["formats"],
  image: image(entry.image as ImageId),
  path: productPath(entry.slug),
}));

export const catalog: Catalog = {
  currency: data.currency,
  products,
  groups: [...data.optionGroups, turnaroundGroup],
};

export const getProduct = (slug: string): Product | undefined => products.find((product) => product.slug === slug);

export const productSlugs = products.map((product) => product.slug);
