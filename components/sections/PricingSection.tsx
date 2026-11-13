import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PricingBlock } from "@/lib/content";

/** Product cards that hand off to the existing checkout, plus the order options. */
export function PricingSection({ block }: { block: PricingBlock }) {
  return (
    <Section surface={block.surface}>
      <SectionHeading eyebrow={block.eyebrow} title={block.title} lead={block.lead} />
      <RevealGroup as="ul" className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {block.products.map((product) => (
          <RevealItem as="li" key={product.name}>
            <Card interactive className="flex flex-col gap-6">
              <span className="font-mono text-xs tracking-widest text-accent-text uppercase">{product.category}</span>
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p className="mt-auto flex items-baseline gap-3">
                <span className="font-display text-5xl font-semibold tracking-tight text-strong">{product.price}</span>
                {product.compareAt ? (
                  <s className="text-lg text-muted">
                    <span className="sr-only">Previously </span>
                    {product.compareAt}
                  </s>
                ) : null}
              </p>
              <Button href={product.href} className="w-full">
                {block.orderLabel}
              </Button>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-14 grid gap-8 border-t border-line pt-10 md:grid-cols-2">
        {block.optionGroups.map((group) => (
          <div key={group.label}>
            <h3 className="mb-4 font-mono text-xs tracking-[0.18em] text-muted uppercase">
              {block.optionsNote}: {group.label}
            </h3>
            <ul className="flex flex-wrap gap-3">
              {group.options.map((option) => (
                <li key={option}>
                  <Chip>{option}</Chip>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
