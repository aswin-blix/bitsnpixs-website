"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { SPRING } from "@/lib/motion";

/**
 * The thread that runs down the edge of every page: a stitched line that
 * "sews" in step with scroll progress (scaleY only). Decorative, wide screens only.
 */
export function ScrollThread() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, SPRING);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-y-0 left-5 z-40 hidden w-0.5 mix-blend-difference 2xl:block">
      <motion.div className="stitch-y h-full origin-top text-accent" style={{ scaleY }} />
    </div>
  );
}
