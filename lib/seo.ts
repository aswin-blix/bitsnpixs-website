import type { Metadata } from "next";
import { catalog, site, studios, type PageMeta, type Product } from "@/lib/content";

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

/** schema.org Product data for a product details page. */
export function productJsonLd(product: Product): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    category: product.category,
    brand: { "@type": "Brand", name: site.name },
    url: new URL(product.path, site.url).toString(),
    ...(product.image.src ? { image: new URL(product.image.src, site.url).toString() } : {}),
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: catalog.currency,
      availability: "https://schema.org/InStock",
      url: new URL(product.path, site.url).toString(),
    },
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
