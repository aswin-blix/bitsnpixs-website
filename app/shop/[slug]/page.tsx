import { notFound } from "next/navigation";
import { ProductView } from "@/components/sections/ProductView";
import { getProduct, productMeta, productSlugs } from "@/lib/content";
import { buildMetadata, productJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[slug]">) {
  const product = getProduct((await params).slug);
  return product ? buildMetadata(productMeta(product)) : {};
}

/** Product details page. Every product in lib/content/products.json gets one. */
export default async function ProductPage({ params }: PageProps<"/shop/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  return (
    <>
      <ProductView product={product} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }} />
    </>
  );
}
