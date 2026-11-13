import type { MetadataRoute } from "next";
import { allPages, routes, site } from "@/lib/content";

/** Generated from the content layer, so new pages appear automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  return allPages.map(({ meta }) => ({
    url: new URL(meta.path, site.url).toString(),
    changeFrequency: "monthly",
    priority: meta.path === routes.home ? 1 : 0.7,
  }));
}
