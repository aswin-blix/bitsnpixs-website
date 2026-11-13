"use client";

import { useEffect, useState, type RefObject } from "react";
import { VIEWPORT } from "@/lib/motion";

/**
 * static   as rendered by the server: visible, never animated
 * hidden   below the fold and waiting to be scrolled to
 * visible  scrolled into view: play the entrance
 */
export type RevealPhase = "static" | "hidden" | "visible";

/**
 * Decides whether an element should get a scroll reveal. Content starts
 * visible in the server HTML (so it paints before JavaScript and without it);
 * only elements that are below the viewport once the page is interactive are
 * hidden and then revealed. Anything already on screen is left alone.
 */
export function useRevealPhase(ref: RefObject<HTMLElement | null>): RevealPhase {
  const [phase, setPhase] = useState<RevealPhase>("static");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let armed = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (armed) setPhase("visible");
          observer.disconnect();
        } else if (!armed) {
          if (entry.boundingClientRect.top >= window.innerHeight) {
            armed = true;
            setPhase("hidden");
          } else {
            // On screen (within the reveal margin) or already scrolled past: leave it visible.
            observer.disconnect();
          }
        }
      },
      { rootMargin: VIEWPORT.margin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return phase;
}
