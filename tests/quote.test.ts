import { describe, expect, it } from "vitest";
import { catalog, getProduct, productSlugs } from "@/lib/content";
import manifest from "@/lib/content/image-manifest.json";
import data from "@/lib/content/products.json";
import {
  buildQuoteMessage,
  clampQuantity,
  emptyQuote,
  formatPrice,
  isQuoteComplete,
  quoteGroups,
  quoteLines,
  quotePrice,
  type QuoteSelection,
} from "@/lib/quote";

const labels = { quantityLabel: "Quantity", priceLabel: "Online price" };
const pick = (slug: string, choices: Record<string, string> = {}, quantity = 1): QuoteSelection => ({ productSlug: slug, choices, quantity });

describe("product catalog data", () => {
  it("has unique slugs, sane prices and known option groups", () => {
    expect(new Set(productSlugs).size).toBe(productSlugs.length);
    const groupIds = new Set(catalog.groups.map((group) => group.id));
    expect(groupIds.size).toBe(catalog.groups.length);
    for (const product of catalog.products) {
      expect(product.slug).toMatch(/^[a-z0-9-]+$/);
      expect(product.price).toBeGreaterThan(0);
      if (product.compareAt) expect(product.compareAt).toBeGreaterThan(product.price);
      expect(product.groupIds.length).toBeGreaterThan(0);
      for (const id of product.groupIds) expect(groupIds, `${product.slug} uses unknown group ${id}`).toContain(id);
      expect(product.summary.length).toBeGreaterThan(20);
      expect(product.includes.length).toBeGreaterThan(0);
    }
    for (const group of catalog.groups) {
      expect(group.options.length).toBeGreaterThan(1);
      expect(new Set(group.options.map((option) => option.label)).size).toBe(group.options.length);
    }
  });

  it("points every product at an image in the manifest", () => {
    for (const entry of data.products) expect(Object.keys(manifest), `${entry.slug} image`).toContain(entry.image);
  });
});

describe("quote logic", () => {
  it("asks nothing and is incomplete before a product is chosen", () => {
    expect(quoteGroups(catalog, emptyQuote())).toEqual([]);
    expect(isQuoteComplete(catalog, emptyQuote())).toBe(false);
    expect(quotePrice(catalog, emptyQuote())).toBeNull();
    expect(() => buildQuoteMessage(catalog, emptyQuote(), "", labels)).toThrow();
    expect(quoteLines(catalog, emptyQuote(), "Quantity")).toEqual([]);
  });

  it("is complete only when every group for the product is answered", () => {
    const groups = quoteGroups(catalog, pick("standard-embroidery"));
    expect(groups.map((group) => group.id)).toEqual(getProduct("standard-embroidery")?.groupIds);
    const all = Object.fromEntries(groups.map((group) => [group.id, group.options[0].label]));
    expect(isQuoteComplete(catalog, pick("standard-embroidery", all))).toBe(true);
    const missingOne = Object.fromEntries(groups.slice(1).map((group) => [group.id, group.options[0].label]));
    expect(isQuoteComplete(catalog, pick("standard-embroidery", missingOne))).toBe(false);
  });

  it("prices as (base + size extra) x quantity, with the compare price moving in step", () => {
    expect(quotePrice(catalog, pick("standard-embroidery"))).toEqual({ unit: 9, total: 9, compareTotal: 10 });
    expect(quotePrice(catalog, pick("standard-embroidery", { size: "Upto 8 inch" }))).toEqual({ unit: 19, total: 19, compareTotal: 20 });
    expect(quotePrice(catalog, pick("standard-embroidery", { size: "Upto 16 inch", format: "3D Puff" }, 3))).toEqual({
      unit: 39,
      total: 117,
      compareTotal: 120,
    });
    expect(quotePrice(catalog, pick("coloreel-embroidery", { size: "Upto 12 inch" }, 2))?.total).toBe(76);
    expect(quotePrice(catalog, pick("vector-conversion-complex"))?.total).toBe(18);
  });

  it("ignores choices that do not belong to the product or the group", () => {
    expect(quotePrice(catalog, pick("vector-conversion-simple", { size: "Upto 16 inch" }))?.unit).toBe(9);
    expect(quotePrice(catalog, pick("standard-embroidery", { size: "Upto 99 inch" }))?.unit).toBe(9);
  });

  it("clamps quantity to a whole number in range", () => {
    expect(clampQuantity(0)).toBe(1);
    expect(clampQuantity(-4)).toBe(1);
    expect(clampQuantity(2.6)).toBe(3);
    expect(clampQuantity(500)).toBe(99);
    expect(clampQuantity(Number.NaN)).toBe(1);
  });

  it("formats prices in the catalog currency", () => {
    expect(formatPrice(9, catalog.currency)).toBe("$9.00");
    expect(formatPrice(117, "USD")).toBe("$117.00");
  });

  it("builds the outgoing message from the selection", () => {
    const selection = pick("standard-embroidery", { format: "3D Puff", size: "Upto 8 inch", placement: "stale" }, 2);
    expect(quoteLines(catalog, selection, "Quantity")).toEqual([
      { label: "Format", value: "3D Puff" },
      { label: "Size", value: "Upto 8 inch" },
      { label: "Quantity", value: "2" },
    ]);
    const message = buildQuoteMessage(catalog, selection, "  Needed by Friday.  ", labels);
    expect(message.subject).toBe("Quote request: Standard Embroidery");
    expect(message.question).toContain("Product: Standard Embroidery");
    expect(message.question).toContain("Size: Upto 8 inch");
    expect(message.question).toContain("Online price: $38.00");
    expect(message.question).not.toContain("stale");
    expect(message.question.endsWith("Needed by Friday.")).toBe(true);
  });
});
