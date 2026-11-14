"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HeroCanvas } from "@/components/three/HeroCanvas";
import { ActionRow } from "@/components/ui/ActionRow";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Rise } from "@/components/ui/Rise";
import { SplitText } from "@/components/ui/SplitText";
import type { PageHeroContent } from "@/lib/content";
import { cn } from "@/lib/utils";
import { StitchPad } from "./StitchPad";

/** Home hero: staggered headline and the live digitizer over the 3D pixel-to-stitch field. */
export function Hero({ hero }: { hero: PageHeroContent }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} data-surface="dark" className="relative flex min-h-svh items-center overflow-hidden pt-(--header-height)">
      <HeroCanvas
        progress={scrollYProgress}
        className="[mask-image:radial-gradient(110%_90%_at_80%_55%,black_30%,transparent_74%)]"
      />

      <div aria-hidden="true" className="brand-glow absolute top-1/2 right-0 size-[52rem] translate-x-1/4 -translate-y-1/2 opacity-50" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className={cn("container-page relative grid items-center gap-12 py-16", hero.digitizer && "xl:grid-cols-[1.05fr_0.95fr]")}
      >
        <div className="flex max-w-5xl flex-col items-start gap-8">
          {hero.eyebrow ? (
            <Rise>
              <Eyebrow>{hero.eyebrow}</Eyebrow>
            </Rise>
          ) : null}
          <h1
            className={cn(
              "leading-[0.95] font-semibold tracking-[-0.035em]",
              hero.digitizer ? "text-[clamp(2.75rem,6.2vw,5.5rem)]" : "text-[clamp(2.9rem,8.4vw,7.5rem)]",
            )}
          >
            <SplitText text={hero.title} />
          </h1>
          {hero.lead ? (
            <Rise index={3} solid>
              <p className="max-w-xl text-lg text-ink sm:text-xl">{hero.lead}</p>
            </Rise>
          ) : null}
          <Rise index={5}>
            <ActionRow actions={hero.actions} />
          </Rise>
        </div>

        {hero.digitizer ? (
          <Rise index={4}>
            <StitchPad content={hero.digitizer} />
          </Rise>
        ) : null}
      </motion.div>

      <div aria-hidden="true" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 font-mono text-[0.65rem] tracking-[0.3em] text-accent-text uppercase md:flex">
        Scroll
        <span className="stitch-y h-12 animate-pulse" />
      </div>
    </section>
  );
}
