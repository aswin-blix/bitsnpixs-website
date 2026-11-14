import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SpotlightArea } from "@/components/ui/SpotlightArea";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Feature, FeaturesBlock } from "@/lib/content";
import { cn, padIndex } from "@/lib/utils";

function FeatureGrid({ items }: { items: Feature[] }) {
  return (
    <SpotlightArea>
      <RevealGroup as="ul" className={cn("grid gap-5 sm:grid-cols-2", items.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4")}>
      {items.map((item, index) => (
        <RevealItem as="li" key={item.title}>
          <Card interactive className="flex flex-col gap-4">
            <span aria-hidden="true" className="font-mono text-xs tracking-widest text-accent-text">
              {padIndex(index)}
            </span>
            <h3 className="text-2xl font-semibold">{item.title}</h3>
            {item.body ? <p className="text-muted">{item.body}</p> : null}
          </Card>
        </RevealItem>
      ))}
      </RevealGroup>
    </SpotlightArea>
  );
}

function FeatureRows({ items }: { items: Feature[] }) {
  return (
    <RevealGroup as="ul" className="border-t border-line">
      {items.map((item, index) => (
        <RevealItem as="li" key={item.title} className="group/row relative grid gap-3 border-b border-line py-8 md:grid-cols-[auto_1fr_1.2fr] md:items-baseline md:gap-10">
          <span aria-hidden="true" className="font-mono text-xs tracking-widest text-accent-text">
            {padIndex(index)}
          </span>
          <h3 className="text-2xl font-semibold sm:text-3xl">{item.title}</h3>
          {item.body ? <p className="text-lg text-muted">{item.body}</p> : null}
          <span aria-hidden="true" className="absolute -bottom-px left-0 h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-brand group-hover/row:scale-x-100" />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

function FeatureChips({ items }: { items: Feature[] }) {
  return (
    <RevealGroup as="ul" stagger={0.04} className="flex flex-wrap gap-3">
      {items.map((item) => (
        <RevealItem as="li" key={item.title}>
          <Chip className="px-5 py-3 text-base">
            <Icon name="check" size={16} className="text-accent-text" />
            {item.title}
          </Chip>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

const layouts = { grid: FeatureGrid, rows: FeatureRows, chips: FeatureChips } as const;

/** Feature list in one of three layouts, chosen by the content block. */
export function FeaturesSection({ block }: { block: FeaturesBlock }) {
  const Layout = layouts[block.layout];
  return (
    <Section surface={block.surface}>
      <SectionHeading eyebrow={block.eyebrow} title={block.title} lead={block.lead} />
      <Layout items={block.items} />
    </Section>
  );
}
