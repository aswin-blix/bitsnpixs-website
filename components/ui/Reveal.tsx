"use client";

import { motion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useRevealPhase } from "@/lib/hooks/use-reveal-phase";
import { fadeUp, staggerContainer } from "@/lib/motion";

const tags = { div: motion.div, li: motion.li, article: motion.article, ul: motion.ul, ol: motion.ol } as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: keyof typeof tags;
}

/**
 * Shared wiring for scroll reveals. `initial={false}` keeps the server HTML
 * visible; the phase from useRevealPhase then drives the hidden/visible variants.
 */
function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const phase = useRevealPhase(ref);
  // The motion tag varies with `as`; every option renders an HTMLElement, so one cast covers them.
  return { ref: ref as never, initial: false, animate: phase === "hidden" ? "hidden" : "visible" } as const;
}

/** Fades and slides a single element up when it scrolls into view. */
export function Reveal({ children, className, as = "div" }: RevealProps) {
  const Tag = tags[as];
  return (
    <Tag className={className} variants={fadeUp} {...useReveal()}>
      {children}
    </Tag>
  );
}

/** Parent that staggers its RevealItem children as it scrolls into view. */
export function RevealGroup({ children, className, as = "div", stagger }: RevealProps & { stagger?: number }) {
  const Tag = tags[as];
  return (
    <Tag className={className} variants={staggerContainer(stagger)} {...useReveal()}>
      {children}
    </Tag>
  );
}

/** Child of RevealGroup. Inherits the hidden/visible state from the group. */
export function RevealItem({ children, className, as = "div" }: RevealProps) {
  const Tag = tags[as];
  return (
    <Tag className={className} variants={fadeUp}>
      {children}
    </Tag>
  );
}
