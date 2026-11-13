import { describe, expect, it } from "vitest";
import {
  allPages,
  imageIds,
  navigation,
  portfolioCategories,
  portfolioItems,
  getPortfolioItems,
  routes,
  services,
  site,
} from "@/lib/content";
import manifest from "@/lib/content/image-manifest.json";
import { isExternalHref } from "@/lib/utils";

/** Collect every href found anywhere inside a content object. */
function collectHrefs(value: unknown, found: string[] = []): string[] {
  if (Array.isArray(value)) value.forEach((entry) => collectHrefs(entry, found));
  else if (value && typeof value === "object") {
    for (const [key, entry] of Object.entries(value)) {
      if (key === "href" && typeof entry === "string") found.push(entry);
      else collectHrefs(entry, found);
    }
  }
  return found;
}

const pagePaths = allPages.map((page) => page.meta.path);

describe("pages", () => {
  it("covers every declared route exactly once", () => {
    expect([...pagePaths].sort()).toEqual(Object.values(routes).sort());
    expect(new Set(pagePaths).size).toBe(pagePaths.length);
  });

  it.each(allPages.map((page) => [page.meta.path, page] as const))("%s has usable metadata", (_path, page) => {
    expect(page.meta.title.length).toBeGreaterThan(3);
    expect(page.meta.description.length).toBeGreaterThan(40);
    expect(page.meta.description.length).toBeLessThanOrEqual(180);
    expect(page.hero.title.length).toBeGreaterThan(3);
  });

  it("never ships empty lists in blocks", () => {
    for (const page of allPages) {
      for (const block of page.blocks) {
        if (block.type === "story") expect(block.steps.length).toBeGreaterThan(1);
        if (block.type === "faq") expect(block.items.length).toBeGreaterThan(0);
        if (block.type === "features") expect(block.items.length).toBeGreaterThan(0);
        if (block.type === "cta") expect(block.actions.length).toBeGreaterThan(0);
      }
    }
  });
});

describe("links", () => {
  const hrefs = collectHrefs([allPages, navigation, services, portfolioCategories]);

  it("points every internal link at a page that exists", () => {
    const internal = hrefs.filter((href) => !isExternalHref(href));
    expect(internal.length).toBeGreaterThan(10);
    for (const href of internal) expect(pagePaths, `broken internal link: ${href}`).toContain(href);
  });

  it("uses absolute https URLs for external links", () => {
    for (const href of hrefs.filter(isExternalHref)) expect(href).toMatch(/^https:\/\//);
  });

  it("has well-formed contact details", () => {
    expect(site.email).toMatch(/^[^@\s]+@[^@\s]+\.[a-z]+$/);
    for (const phone of site.phones) expect(phone.href).toMatch(/^tel:\+\d{10,14}$/);
  });
});

describe("portfolio", () => {
  it("has unique items and at least one per category", () => {
    expect(new Set(portfolioItems.map((item) => item.id)).size).toBe(portfolioItems.length);
    for (const category of portfolioCategories) {
      expect(getPortfolioItems(category.id).length).toBeGreaterThan(0);
    }
  });

  it("filters and limits", () => {
    expect(getPortfolioItems("vector").every((item) => item.category === "vector")).toBe(true);
    expect(getPortfolioItems(undefined, 3)).toHaveLength(3);
    expect(getPortfolioItems()).toHaveLength(portfolioItems.length);
  });
});

describe("image manifest", () => {
  it("has unique local file names and real dimensions", () => {
    const files = imageIds.map((id) => manifest[id].file);
    expect(new Set(files).size).toBe(files.length);
    for (const id of imageIds) {
      expect(manifest[id].width).toBeGreaterThan(0);
      expect(manifest[id].height).toBeGreaterThan(0);
      expect(manifest[id].alt.length).toBeGreaterThan(3);
    }
  });
});
