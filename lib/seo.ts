import type { Metadata } from "next";
import { site, type PageMeta } from "@/lib/content";

/** Site-wide defaults, applied once in the root layout. */
export const rootMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Embroidery Digitizing & Vector Art`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: { type: "website", siteName: site.name, locale: site.locale },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

/** Per-page metadata built from the page's content entry. */
export function buildMetadata(meta: PageMeta): Metadata {
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: meta.path },
    openGraph: { title: meta.title, description: meta.description, url: meta.path },
    twitter: { title: meta.title, description: meta.description },
  };
}
