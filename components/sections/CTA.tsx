import { ActionRow } from "@/components/ui/ActionRow";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import type { CtaBlock } from "@/lib/content";

/** Closing call to action used at the bottom of most pages. */
export function CTA({ block }: { block: CtaBlock }) {
  return (
    <Section surface={block.surface ?? "dark"} className="overflow-hidden">
      <div aria-hidden="true" className="pixel-grid absolute inset-0 [mask-image:radial-gradient(60%_70%_at_50%_50%,black,transparent)] opacity-60" />
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 size-[42rem] -translate-1/2 rounded-full bg-(--brand-glow) opacity-40 blur-3xl" />
      <Reveal className="relative mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
        {block.eyebrow ? <Eyebrow>{block.eyebrow}</Eyebrow> : null}
        {block.title ? (
          <h2 className="text-[clamp(2.5rem,7vw,6rem)] leading-[0.98] font-semibold tracking-[-0.03em]">{block.title}</h2>
        ) : null}
        {block.lead ? <p className="max-w-2xl text-xl text-ink">{block.lead}</p> : null}
        <ActionRow actions={block.actions} className="justify-center" />
      </Reveal>
    </Section>
  );
}
