import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { FormatsBlock } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Wall of supported file formats, styled like labels on a machine readout. */
export function FormatsSection({ block }: { block: FormatsBlock }) {
  return (
    <Section surface={block.surface ?? "dark"}>
      <SectionHeading eyebrow={block.eyebrow} title={block.title} lead={block.lead} />
      <RevealGroup as="ul" stagger={0.03} className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {block.formats.map((format) => {
          const isStandard = format === block.standard;
          return (
            <RevealItem as="li" key={format}>
              <span
                className={
                  isStandard
                    ? "bg-brand-gradient flex h-full min-h-24 flex-col justify-between rounded-2xl p-4 text-on-accent"
                    : "flex h-full min-h-24 flex-col justify-between rounded-2xl border border-line bg-raised p-4 text-strong transition-[border-color,transform] duration-300 ease-brand hover:-translate-y-1 hover:border-accent"
                }
              >
                <span aria-hidden="true" className={cn("font-mono text-[0.65rem] tracking-widest uppercase", !isStandard && "text-ink")}>
                  {isStandard ? "Standard" : "Format"}
                </span>
                <span className="font-display text-xl font-semibold sm:text-2xl">
                  {format}
                  {isStandard ? <span className="sr-only"> (standard format)</span> : null}
                </span>
              </span>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
