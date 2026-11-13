"use client";

import { useSyncExternalStore } from "react";

export const MEDIA = {
  desktop: "(min-width: 1024px)",
  reducedMotion: "(prefers-reduced-motion: reduce)",
  finePointer: "(hover: hover) and (pointer: fine)",
} as const;

/** Subscribes to a media query. Returns `serverValue` during SSR and hydration. */
export function useMediaQuery(query: string, serverValue = false): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

/**
 * One place to decide how much motion a device gets.
 * `rich` is true only for desktop, fine-pointer devices without reduced motion:
 * that is when pinned chapters, smooth scrolling and magnetic buttons turn on.
 */
export function useMotionProfile() {
  const reduced = useMediaQuery(MEDIA.reducedMotion);
  const desktop = useMediaQuery(MEDIA.desktop);
  const finePointer = useMediaQuery(MEDIA.finePointer);
  return { reduced, desktop, finePointer, rich: desktop && finePointer && !reduced };
}
