"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/motion";

const tags = { div: motion.div, li: motion.li, article: motion.article, ul: motion.ul, ol: motion.ol } as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: keyof typeof tags;
}

/** Fades and slides a single element up when it scrolls into view. */
export function Reveal({ children, className, as = "div", delay = 0 }: RevealProps & { delay?: number }) {
  const Tag = tags[as];
  return (
    <Tag
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={{ delay }}
    >
      {children}
    </Tag>
  );
}

/** Parent that staggers its RevealItem children as it scrolls into view. */
export function RevealGroup({ children, className, as = "div", stagger }: RevealProps & { stagger?: number }) {
  const Tag = tags[as];
  return (
    <Tag
      className={className}
      variants={staggerContainer(stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
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
