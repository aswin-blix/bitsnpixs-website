import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { StitchLabBlock } from "@/lib/content";
import { StitchPad } from "./StitchPad";

/** The full-width live digitizer. */
export function StitchLabSection({ block }: { block: StitchLabBlock }) {
  return (
    <Section surface={block.surface}>
      <SectionHeading eyebrow={block.eyebrow} title={block.title} lead={block.lead} />
      <Reveal>
        <StitchPad content={block.digitizer} size="full" />
      </Reveal>
    </Section>
  );
}
