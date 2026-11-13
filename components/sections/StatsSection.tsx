import { Counter } from "@/components/ui/Counter";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { StatsBlock } from "@/lib/content";

export function StatsSection({ block }: { block: StatsBlock }) {
  return (
    <Section surface={block.surface}>
      <SectionHeading eyebrow={block.eyebrow} title={block.title} lead={block.lead} />
      <RevealGroup as="ul" className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
        {block.items.map((stat) => (
          <RevealItem as="li" key={stat.label} className="flex flex-col gap-3 border-t border-line pt-6">
            <span className="font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-none font-semibold tracking-tight text-accent-text">
              <Counter value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="font-mono text-xs tracking-[0.16em] text-muted uppercase">{stat.label}</span>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
