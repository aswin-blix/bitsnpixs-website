import type { MetadataRoute } from "next";
import { allPaths, routes, site } from "@/lib/content";

/** Generated from the content layer, so new pages and products appear automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  return allPaths.map((path) => ({
    url: new URL(path, site.url).toString(),
    changeFrequency: "monthly",
    priority: path === routes.home ? 1 : 0.7,
  }));
}
