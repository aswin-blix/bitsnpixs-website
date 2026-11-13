import { image, type ImageId } from "./images";
import { routes } from "./site";
import type { PortfolioCategory, PortfolioCategoryId, PortfolioItem } from "./types";

export const portfolioCategories: PortfolioCategory[] = [
  {
    id: "coloreel",
    label: "Coloreel Embroidery Digitizing",
    action: { label: "View service", href: routes.coloreel },
  },
  {
    id: "embroidery",
    label: "Embroidery Digitizing",
    action: { label: "View service", href: routes.embroidery },
  },
  {
    id: "vector",
    label: "Vector Artwork Conversion",
    action: { label: "View service", href: routes.vector },
  },
];

/** Number of before/after pairs per category in the image manifest. */
const pairCounts: Record<PortfolioCategoryId, number> = { coloreel: 3, embroidery: 6, vector: 3 };

function buildItems(category: PortfolioCategoryId): PortfolioItem[] {
  return Array.from({ length: pairCounts[category] }, (_, index) => {
    const id = `portfolio-${category}-${index + 1}`;
    return {
      id,
      category,
      before: image(`${id}-before` as ImageId),
      after: image(`${id}-after` as ImageId),
    };
  });
}

export const portfolioItems: PortfolioItem[] = portfolioCategories.flatMap(({ id }) => buildItems(id));

/**
 * Items for a category, or for all categories. A limited selection across all
 * categories is interleaved (one from each in turn) so previews show variety.
 */
export function getPortfolioItems(category?: PortfolioCategoryId, limit?: number): PortfolioItem[] {
  if (category) {
    const items = portfolioItems.filter((item) => item.category === category);
    return limit ? items.slice(0, limit) : items;
  }
  if (!limit) return portfolioItems;

  const byCategory = portfolioCategories.map(({ id }) => portfolioItems.filter((item) => item.category === id));
  const longest = Math.max(...byCategory.map((items) => items.length));
  const interleaved: PortfolioItem[] = [];
  for (let index = 0; index < longest; index += 1) {
    for (const items of byCategory) if (items[index]) interleaved.push(items[index]);
  }
  return interleaved.slice(0, limit);
}
