import type { Catalog, Product, QuoteGroup } from "@/lib/content";

/**
 * Ordering logic shared by the quote builder and the product pages. Pure
 * functions over the catalog, so prices and messages are unit tested.
 */

/** What the visitor has chosen so far. */
export interface QuoteSelection {
  productSlug: string | null;
  /** groupId -> chosen option label. */
  choices: Record<string, string>;
  quantity: number;
}

export const MIN_QUANTITY = 1;
export const MAX_QUANTITY = 99;

export const emptyQuote = (productSlug: string | null = null): QuoteSelection => ({ productSlug, choices: {}, quantity: MIN_QUANTITY });

export function findProduct(catalog: Catalog, selection: QuoteSelection): Product | undefined {
  return catalog.products.find((product) => product.slug === selection.productSlug);
}

/** Option groups to ask for the selected product, in order. */
export function quoteGroups(catalog: Catalog, selection: QuoteSelection): QuoteGroup[] {
  const product = findProduct(catalog, selection);
  if (!product) return [];
  return product.groupIds.flatMap((id) => catalog.groups.filter((group) => group.id === id));
}

/** Sum of the extras for the options chosen so far. */
function chosenExtras(groups: QuoteGroup[], choices: Record<string, string>): number {
  return groups.reduce((sum, group) => sum + (group.options.find((option) => option.label === choices[group.id])?.extra ?? 0), 0);
}

export interface QuotePrice {
  /** Price of one item with the chosen options. */
  unit: number;
  total: number;
  /** Total at the crossed-out price, when the product has one. */
  compareTotal?: number;
}

/** Published price for the selection: (base + option extras) x quantity. */
export function quotePrice(catalog: Catalog, selection: QuoteSelection): QuotePrice | null {
  const product = findProduct(catalog, selection);
  if (!product) return null;
  const extras = chosenExtras(quoteGroups(catalog, selection), selection.choices);
  const unit = product.price + extras;
  return {
    unit,
    total: unit * selection.quantity,
    compareTotal: product.compareAt ? (product.compareAt + extras) * selection.quantity : undefined,
  };
}

/** True once a product is picked and every one of its option groups is answered. */
export function isQuoteComplete(catalog: Catalog, selection: QuoteSelection): boolean {
  return Boolean(findProduct(catalog, selection)) && quoteGroups(catalog, selection).every((group) => group.id in selection.choices);
}

export function clampQuantity(value: number): number {
  if (!Number.isFinite(value)) return MIN_QUANTITY;
  return Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, Math.round(value)));
}

export function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

/** Label/value rows for the summary panel and the outgoing message. */
export function quoteLines(catalog: Catalog, selection: QuoteSelection, quantityLabel: string): { label: string; value: string }[] {
  const lines = quoteGroups(catalog, selection)
    .filter((group) => selection.choices[group.id])
    .map((group) => ({ label: group.label, value: selection.choices[group.id] }));
  return findProduct(catalog, selection) ? [...lines, { label: quantityLabel, value: String(selection.quantity) }] : lines;
}

/** Subject and body of the quote request sent through the contact pipeline. */
export function buildQuoteMessage(
  catalog: Catalog,
  selection: QuoteSelection,
  notes: string,
  labels: { quantityLabel: string; priceLabel: string },
): { subject: string; question: string } {
  const product = findProduct(catalog, selection);
  const price = quotePrice(catalog, selection);
  if (!product || !price) throw new Error("Cannot build a quote message without a product");
  const body = [
    `Product: ${product.name}`,
    ...quoteLines(catalog, selection, labels.quantityLabel).map((line) => `${line.label}: ${line.value}`),
    `${labels.priceLabel}: ${formatPrice(price.total, catalog.currency)}`,
  ];
  if (notes.trim()) body.push("", notes.trim());
  return { subject: `Quote request: ${product.name}`, question: body.join("\n") };
}
