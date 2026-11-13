"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HeroCanvas } from "@/components/three/HeroCanvas";
import { ActionRow } from "@/components/ui/ActionRow";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SplitText } from "@/components/ui/SplitText";
import type { PageHeroContent } from "@/lib/content";
import { fadeUp, staggerContainer } from "@/lib/motion";

/** Home hero: staggered headline over the 3D pixel-to-stitch field. */
export function Hero({ hero }: { hero: PageHeroContent }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} data-surface="tint" className="relative flex min-h-svh items-center overflow-hidden pt-(--header-height)">
      <HeroCanvas
        progress={scrollYProgress}
        className="[mask-image:radial-gradient(110%_90%_at_80%_55%,black_30%,transparent_74%)]"
      />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="container-page relative py-20">
        <motion.div variants={staggerContainer(0.12, 0.15)} initial="hidden" animate="visible" className="flex max-w-5xl flex-col items-start gap-8">
          {hero.eyebrow ? (
            <motion.div variants={fadeUp}>
              <Eyebrow>{hero.eyebrow}</Eyebrow>
            </motion.div>
          ) : null}
          <h1 className="text-[clamp(2.9rem,8.4vw,7.5rem)] leading-[0.95] font-semibold tracking-[-0.035em]">
            <SplitText text={hero.title} delay={0.2} />
          </h1>
          {hero.lead ? (
            <motion.p variants={fadeUp} className="max-w-xl text-lg text-ink sm:text-xl">
              {hero.lead}
            </motion.p>
          ) : null}
          <motion.div variants={fadeUp}>
            <ActionRow actions={hero.actions} />
          </motion.div>
        </motion.div>
      </motion.div>

      <div aria-hidden="true" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 font-mono text-[0.65rem] tracking-[0.3em] text-accent-text uppercase md:flex">
        Scroll
        <span className="stitch-y h-12 animate-pulse" />
      </div>
    </section>
  );
}
