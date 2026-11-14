import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { QuoteBlock } from "@/lib/content";
import { QuoteBuilder } from "./QuoteBuilder";

export function QuoteSection({ block }: { block: QuoteBlock }) {
  return (
    <Section surface={block.surface}>
      <SectionHeading eyebrow={block.eyebrow} title={block.title} lead={block.lead} />
      <QuoteBuilder labels={block.labels} />
    </Section>
  );
}
