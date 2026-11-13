"use client";

import { useMotionValue, useSpring } from "framer-motion";
import type { PointerEvent } from "react";
import { SPRING } from "@/lib/motion";

/**
 * Pulls an element toward the pointer while it is hovered.
 * Spread `handlers` on the element and pass `style` to a motion component.
 */
export function useMagnetic(enabled: boolean, strength = 0.3) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const handlers = enabled
    ? {
        onPointerMove: (event: PointerEvent<HTMLElement>) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          rawX.set((event.clientX - (bounds.left + bounds.width / 2)) * strength);
          rawY.set((event.clientY - (bounds.top + bounds.height / 2)) * strength);
        },
        onPointerLeave: reset,
      }
    : {};

  return { style: { x, y }, handlers };
}
