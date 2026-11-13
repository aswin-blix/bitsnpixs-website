"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useMotionProfile } from "@/lib/hooks/use-media-query";

/**
 * Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger and Lenis
 * share one clock. Only enabled on desktop fine-pointer devices without
 * reduced motion; everyone else keeps native scrolling.
 */
export function SmoothScroll() {
  const { rich } = useMotionProfile();
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!rich) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.11, anchors: true });
    lenisRef.current = lenis;

    const onTick = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [rich]);

  // New page: start at the top and let ScrollTrigger re-measure the new layout.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
