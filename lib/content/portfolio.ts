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

export function getPortfolioItems(category?: PortfolioCategoryId, limit?: number): PortfolioItem[] {
  const items = category ? portfolioItems.filter((item) => item.category === category) : portfolioItems;
  return limit ? items.slice(0, limit) : items;
}
