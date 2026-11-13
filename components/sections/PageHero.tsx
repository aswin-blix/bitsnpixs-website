"use client";

import { motion } from "framer-motion";
import { ActionRow } from "@/components/ui/ActionRow";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SiteImage } from "@/components/ui/SiteImage";
import { SmartLink } from "@/components/ui/SmartLink";
import { SplitText } from "@/components/ui/SplitText";
import { routes, type PageHeroContent } from "@/lib/content";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Hero for inner pages: breadcrumb, headline, lead, actions and an optional image. */
export function PageHero({ hero }: { hero: PageHeroContent }) {
  return (
    <section data-surface="tint" className="relative overflow-hidden pt-(--header-height)">
      <div aria-hidden="true" className="pixel-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)] opacity-60" />
      <div className={cn("container-page relative grid items-center gap-12 py-16 lg:py-24", hero.image && "lg:grid-cols-[1.25fr_0.75fr]")}>
        <motion.div variants={staggerContainer(0.1, 0.1)} initial="hidden" animate="visible" className="flex flex-col items-start gap-7">
          <motion.nav variants={fadeUp} aria-label="Breadcrumb" className="font-mono text-xs tracking-widest text-muted uppercase">
            <ol className="flex items-center gap-2">
              <li>
                <SmartLink href={routes.home} className="link-stitch">
                  Home
                </SmartLink>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-accent-text">
                {hero.eyebrow ?? hero.title}
              </li>
            </ol>
          </motion.nav>
          {hero.eyebrow ? (
            <motion.div variants={fadeUp}>
              <Eyebrow>{hero.eyebrow}</Eyebrow>
            </motion.div>
          ) : null}
          <h1 className="text-[clamp(2.6rem,6.4vw,5.75rem)] leading-[0.98] font-semibold tracking-[-0.03em]">
            <SplitText text={hero.title} delay={0.15} />
          </h1>
          {hero.lead ? (
            <motion.p variants={fadeUp} className="max-w-2xl text-lg text-ink sm:text-xl">
              {hero.lead}
            </motion.p>
          ) : null}
          <motion.div variants={fadeUp}>
            <ActionRow actions={hero.actions} />
          </motion.div>
        </motion.div>

        {hero.image ? (
          <motion.div
            initial={{ opacity: 0, y: 48, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="relative mx-auto w-full max-w-md"
          >
            <span aria-hidden="true" className="absolute -inset-3 rounded-card border border-dashed border-accent" />
            <SiteImage image={hero.image} sizes="(min-width: 1024px) 30vw, 90vw" eager className="rounded-card" />
          </motion.div>
        ) : null}
      </div>
      <div aria-hidden="true" className="stitch-x w-full text-accent opacity-60" />
    </section>
  );
}
