import { RatingBadge } from "@/components/ui/RatingBadge";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { TestimonialsBlock } from "@/lib/content";
import { TestimonialShowcase } from "./TestimonialShowcase";

/** Client reviews: heading with the overall rating, then the patch showcase. */
export function TestimonialsSection({ block }: { block: TestimonialsBlock }) {
  return (
    <Section surface={block.surface} className="overflow-hidden">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-8 lg:mb-14">
        <SectionHeading eyebrow={block.eyebrow} title={block.title} lead={block.lead} className="mb-0 lg:mb-0" />
        {block.rating ? (
          <Reveal>
            <RatingBadge {...block.rating} />
          </Reveal>
        ) : null}
      </div>
      <Reveal>
        <TestimonialShowcase items={block.items} labels={block.labels} />
      </Reveal>
    </Section>
  );
}
