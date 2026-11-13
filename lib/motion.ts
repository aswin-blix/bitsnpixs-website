import type { Transition, Variants } from "framer-motion";

/**
 * Motion vocabulary shared by every Framer Motion component.
 * Only transform and opacity are ever animated.
 */
export const EASE = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;

export const DURATION = { fast: 0.3, base: 0.7, slow: 1.1 } as const;

export const STAGGER = 0.08;

/** When an element counts as "in view" for scroll reveals. */
export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

export const baseTransition: Transition = { duration: DURATION.base, ease: EASE.out };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: baseTransition },
};

/** Word that rises out of a clipped line (hero headlines). */
export const riseWord: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: DURATION.slow, ease: EASE.out } },
};

export const staggerContainer = (stagger: number = STAGGER, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

/** Spring used by magnetic buttons and the scroll thread. */
export const SPRING = { stiffness: 220, damping: 18, mass: 0.4 } as const;
