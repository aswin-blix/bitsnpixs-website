"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { DURATION, EASE } from "@/lib/motion";
import { useMediaQuery, MEDIA } from "@/lib/hooks/use-media-query";

interface CounterProps {
  value: number;
  suffix?: string;
}

/**
 * Counts up to `value` the first time it scrolls into view. The final value is
 * server-rendered, so it is correct without JavaScript and for reduced motion.
 */
export function Counter({ value, suffix = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduced = useMediaQuery(MEDIA.reducedMotion);

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || reduced) return;
    const controls = animate(0, value, {
      duration: DURATION.slow * 1.6,
      ease: EASE.out,
      onUpdate: (latest) => {
        node.textContent = `${Math.round(latest)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduced, value, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}
