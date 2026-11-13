import type { ComponentType } from "react";
import type { Block, BlockType } from "@/lib/content";
import { CTA } from "./CTA";
import { FaqSection } from "./FaqSection";
import { FeaturesSection } from "./FeaturesSection";
import { FormatsSection } from "./FormatsSection";
import { MarqueeSection } from "./MarqueeSection";
import { PortfolioSection } from "./PortfolioSection";
import { ProseSection } from "./ProseSection";
import { ServicesSection } from "./ServicesSection";
import { SpecialtiesSection } from "./SpecialtiesSection";
import { StatementSection } from "./StatementSection";
import { StatsSection } from "./StatsSection";
import { StorySection } from "./StorySection";
import { TestimonialsSection } from "./TestimonialsSection";
import { TurnaroundSection } from "./TurnaroundSection";

type SectionComponent<T extends BlockType> = ComponentType<{ block: Extract<Block, { type: T }> }>;

/**
 * The one place that knows which section renders which content block.
 * To add a block type: add it to lib/content/types.ts, build the section,
 * register it here.
 */
const registry: { [T in BlockType]?: SectionComponent<T> } = {
  statement: StatementSection,
  prose: ProseSection,
  services: ServicesSection,
  marquee: MarqueeSection,
  story: StorySection,
  features: FeaturesSection,
  stats: StatsSection,
  portfolio: PortfolioSection,
  testimonials: TestimonialsSection,
  formats: FormatsSection,
  specialties: SpecialtiesSection,
  turnaround: TurnaroundSection,
  faq: FaqSection,
  cta: CTA,
};

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        // The registry is keyed by block.type, so the component always matches the block.
        const Component = registry[block.type] as ComponentType<{ block: Block }> | undefined;
        return Component ? <Component key={`${block.type}-${index}`} block={block} /> : null;
      })}
    </>
  );
}
