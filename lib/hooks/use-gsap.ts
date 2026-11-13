"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { DependencyList, RefObject } from "react";
import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect";

let pluginsRegistered = false;

export interface GsapTools {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
}

/**
 * Runs GSAP code inside a gsap.context() scoped to `scope` and reverts it on
 * unmount or when `deps` change. Every scroll animation on the site goes
 * through this hook, so cleanup is never hand-written in a section.
 */
export function useGsap(
  scope: RefObject<HTMLElement | null>,
  setup: (tools: GsapTools) => void,
  deps: DependencyList,
): void {
  useIsomorphicLayoutEffect(() => {
    if (!scope.current) return;
    if (!pluginsRegistered) {
      gsap.registerPlugin(ScrollTrigger);
      pluginsRegistered = true;
    }
    const context = gsap.context(() => setup({ gsap, ScrollTrigger }), scope);
    return () => context.revert();
    // The caller owns the dependency list, exactly like useEffect.
  }, deps);
}
