import { Marquee } from "@/components/ui/Marquee";
import { Section } from "@/components/ui/Section";
import type { MarqueeBlock } from "@/lib/content";

export function MarqueeSection({ block }: { block: MarqueeBlock }) {
  return (
    <Section surface={block.surface ?? "dark"} bleed flush className="py-8 sm:py-10">
      <Marquee items={block.items} label={block.title ?? "Available file formats"} className="text-strong" />
    </Section>
  );
}
