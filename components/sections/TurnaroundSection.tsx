"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { TurnaroundBlock } from "@/lib/content";
import { DURATION, EASE, SPRING } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Standard vs rush turnaround, switched with a segmented control. */
export function TurnaroundSection({ block }: { block: TurnaroundBlock }) {
  const [activeId, setActiveId] = useState(block.options[0].id);
  const active = block.options.find((option) => option.id === activeId) ?? block.options[0];
  const groupName = useId();

  return (
    <Section surface={block.surface}>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <SectionHeading eyebrow={block.eyebrow} title={block.title} lead={block.lead} size="md" className="mb-0 lg:mb-0" />

        <div className="rounded-card border border-line bg-raised p-7 sm:p-10">
          <fieldset>
            <legend className="sr-only">Turnaround package</legend>
            <div className="relative inline-flex rounded-control border border-line bg-surface p-1">
              {block.options.map((option) => {
                const selected = option.id === activeId;
                return (
                  <label
                    key={option.id}
                    className={cn(
                      "relative cursor-pointer rounded-control px-6 py-2.5 text-sm font-semibold transition-colors duration-300 has-focus-visible:outline-2 has-focus-visible:outline-(--focus-ring)",
                      selected ? "text-on-accent" : "text-strong",
                    )}
                  >
                    <input
                      type="radio"
                      name={groupName}
                      value={option.id}
                      checked={selected}
                      onChange={() => setActiveId(option.id)}
                      className="sr-only"
                    />
                    {selected ? (
                      <motion.span layoutId={`${groupName}-pill`} transition={SPRING} className="absolute inset-0 rounded-control bg-accent" />
                    ) : null}
                    <span className="relative">{option.label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div aria-live="polite" className="mt-10 min-h-44">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, transition: { duration: DURATION.fast, ease: EASE.out } }}
                exit={{ opacity: 0, y: -16, transition: { duration: 0.18 } }}
              >
                <p className="font-display text-[clamp(2.75rem,6vw,5rem)] leading-none font-semibold tracking-tight text-strong">{active.time}</p>
                <span aria-hidden="true" className="stitch-x my-6 block w-full text-accent" />
                <p className="text-lg text-muted">{active.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  );
}
