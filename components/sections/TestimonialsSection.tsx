import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { TestimonialsBlock } from "@/lib/content";

/** Horizontally scrollable client quotes (native scroll snapping, keyboard reachable). */
export function TestimonialsSection({ block }: { block: TestimonialsBlock }) {
  return (
    <Section surface={block.surface} bleed className="overflow-hidden">
      <div className="container-page">
        <SectionHeading eyebrow={block.eyebrow} title={block.title} lead={block.lead} />
      </div>
      <Reveal>
        <ul
          tabIndex={0}
          aria-label="Client testimonials"
          className="flex snap-x snap-mandatory scroll-px-(--container-inset) gap-6 overflow-x-auto px-(--container-inset) pb-6 [scrollbar-width:thin]"
        >
          {block.items.map((item) => (
            <li key={item.name} className="w-[min(86vw,30rem)] shrink-0 snap-start">
              <Card className="flex flex-col gap-8">
                <span aria-hidden="true" className="font-display text-7xl leading-[0.6] text-accent">
                  “
                </span>
                <blockquote className="text-lg text-ink">{item.quote}</blockquote>
                <footer className="mt-auto border-t border-line pt-5">
                  <p className="font-display text-xl font-semibold text-strong">{item.name}</p>
                  {item.company ? (
                    <p className="font-mono text-xs tracking-widest text-muted uppercase">
                      {[item.company, item.location].filter(Boolean).join(", ")}
                    </p>
                  ) : null}
                </footer>
              </Card>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
