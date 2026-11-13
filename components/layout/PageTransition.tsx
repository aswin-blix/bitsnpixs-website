"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fade } from "@/lib/motion";

/**
 * Fades each page in after the route curtain lifts. Opacity only: a transform
 * on this wrapper would break position: fixed pinning inside story chapters.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div variants={fade} initial="hidden" animate="visible">
      {children}
    </motion.div>
  );
}
