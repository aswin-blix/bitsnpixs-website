/**
 * Single entry point for all site content. Import from "@/lib/content" only;
 * the modules under lib/content/ are an implementation detail, split by domain.
 */
import { aboutPage } from "./content/pages/about";
import { blogPage, careerPage, contactPage, portfolioPage, shopPage } from "./content/pages/company";
import { homePage } from "./content/pages/home";
import { servicePagesBySlug, softwarePage } from "./content/pages/services";
import { stitchLabPage } from "./content/pages/tools";
import type { PageContent } from "./content/types";

export * from "./content/types";
export * from "./content/site";
export * from "./content/images";
export * from "./content/services";
export * from "./content/portfolio";
export { servicePagesBySlug, type ServiceSlug } from "./content/pages/services";

export const pages = {
  home: homePage,
  about: aboutPage,
  software: softwarePage,
  portfolio: portfolioPage,
  career: careerPage,
  contact: contactPage,
  blog: blogPage,
  shop: shopPage,
  stitchLab: stitchLabPage,
} satisfies Record<string, PageContent>;

/** Every routable page, used by the sitemap and the content tests. */
export const allPages: PageContent[] = [...Object.values(pages), ...Object.values(servicePagesBySlug)];
