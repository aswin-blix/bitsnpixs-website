import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightArea } from "@/components/ui/SpotlightArea";
import { products, type ProductsBlock } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";

/** Grid of products from the catalog, each linking to its details page. */
export function ProductsSection({ block }: { block: ProductsBlock }) {
  const visible = products.filter((product) => product.slug !== block.excludeSlug);
  return (
    <Section surface={block.surface}>
      <SectionHeading eyebrow={block.eyebrow} title={block.title} lead={block.lead} />
      <SpotlightArea>
        <RevealGroup as="ul" className={cn("grid gap-6 sm:grid-cols-2", visible.length % 3 === 0 ? "lg:grid-cols-3" : "xl:grid-cols-4")}>
          {visible.map((product) => (
            <RevealItem as="li" key={product.slug} className="relative">
              <ProductCard product={product} actionLabel={block.actionLabel} />
            </RevealItem>
          ))}
        </RevealGroup>
      </SpotlightArea>
    </Section>
  );
}
