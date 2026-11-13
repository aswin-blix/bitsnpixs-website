import type { Metadata } from "next";
import { site, studios, type PageMeta } from "@/lib/content";

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

/** schema.org Organization data for the JSON-LD script in the root layout. */
export function organizationJsonLd(): Record<string, unknown> {
  const [office] = studios;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    email: site.email,
    description: site.description,
    foundingDate: "2011",
    address: { "@type": "PostalAddress", streetAddress: office.address, addressLocality: office.city, addressCountry: "IN" },
    contactPoint: site.phones.map((phone) => ({
      "@type": "ContactPoint",
      telephone: phone.display,
      contactType: "customer support",
      areaServed: phone.region,
    })),
  };
}

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
