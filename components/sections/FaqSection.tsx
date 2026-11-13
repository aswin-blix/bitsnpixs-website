import { useId } from "react";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { FaqBlock } from "@/lib/content";

export function FaqSection({ block }: { block: FaqBlock }) {
  const name = useId();
  return (
    <Section surface={block.surface}>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading eyebrow={block.eyebrow ?? "FAQ"} title={block.title} lead={block.lead} size="md" className="mb-0 lg:mb-0" />
        <Reveal>
          <Accordion items={block.items} name={name} />
        </Reveal>
      </div>
    </Section>
  );
}
