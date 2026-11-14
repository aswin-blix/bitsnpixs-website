import { Marquee } from "@/components/ui/Marquee";
import { Section } from "@/components/ui/Section";
import type { MarqueeBlock } from "@/lib/content";
import { cn } from "@/lib/utils";

export function MarqueeSection({ block }: { block: MarqueeBlock }) {
  const isFacts = block.variant === "facts";
  return (
    <Section surface={block.surface ?? "tint"} bleed flush className={cn("border-y border-line", isFacts ? "py-5" : "py-8 sm:py-10")}>
      <Marquee
        items={block.items}
        variant={block.variant}
        label={block.title ?? (isFacts ? "Why clients choose us" : "Available file formats")}
        className={isFacts ? "text-accent-text" : "text-strong"}
      />
    </Section>
  );
}
