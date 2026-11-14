import { productBlocks, type Product } from "@/lib/content";
import { BlockRenderer } from "./BlockRenderer";
import { ProductHero } from "./ProductHero";

/** Renders a product details page from a catalog entry. */
export function ProductView({ product }: { product: Product }) {
  return (
    <>
      <ProductHero product={product} />
      <BlockRenderer blocks={productBlocks(product)} />
    </>
  );
}
