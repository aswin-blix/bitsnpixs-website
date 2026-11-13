"use client";

import { useRef } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SiteImage } from "@/components/ui/SiteImage";
import type { StatementBlock } from "@/lib/content";
import { useGsap } from "@/lib/hooks/use-gsap";
import { MEDIA, useMediaQuery } from "@/lib/hooks/use-media-query";

/** A large statement whose words "ink in" as it scrolls through the viewport. */
export function StatementSection({ block }: { block: StatementBlock }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useMediaQuery(MEDIA.reducedMotion);

  useGsap(
    ref,
    ({ gsap }) => {
      if (reduced) return;
      gsap.fromTo(
        ".js-word",
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: "top 82%", end: "bottom 48%", scrub: true },
        },
      );
    },
    [reduced, block.statement],
  );

  return (
    <Section surface={block.surface}>
      <Reveal className="mb-8 flex flex-col gap-4">
        {block.eyebrow ? <Eyebrow>{block.eyebrow}</Eyebrow> : null}
        {block.title ? <h2 className="font-mono text-sm font-medium tracking-[0.14em] text-muted uppercase">{block.title}</h2> : null}
      </Reveal>

      <p ref={ref} className="max-w-6xl font-display text-[clamp(2rem,5.2vw,4.75rem)] leading-[1.04] font-semibold tracking-[-0.03em] text-strong">
        {block.statement.split(" ").map((word, index) => (
          <span key={`${word}-${index}`} className="js-word">
            {word}{" "}
          </span>
        ))}
      </p>

      <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        {block.image ? (
          <Reveal className="mx-auto w-full max-w-sm lg:mx-0">
            <SiteImage image={block.image} sizes="(min-width: 1024px) 28vw, 80vw" className="rounded-card" />
          </Reveal>
        ) : null}
        <RevealGroup className="flex flex-col gap-6 text-lg">
          {block.paragraphs.map((paragraph) => (
            <RevealItem key={paragraph}>
              <p>{paragraph}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
