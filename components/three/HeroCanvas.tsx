"use client";

import { useInView, type MotionValue } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { useMotionProfile } from "@/lib/hooks/use-media-query";
import { cn } from "@/lib/utils";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

interface HeroCanvasProps {
  progress: MotionValue<number>;
  className?: string;
}

/**
 * Lazy mount point for the 3D field. The static pixel grid underneath is what
 * renders first, on the server, and for reduced-motion users (who never
 * download three.js at all).
 */
export function HeroCanvas({ progress, className }: HeroCanvasProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { reduced, rich } = useMotionProfile();
  const inView = useInView(ref, { margin: "200px" });
  const everInView = useInView(ref, { once: true, margin: "200px" });

  return (
    <div ref={ref} aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      <div className="pixel-grid absolute inset-0 opacity-70" />
      {!reduced && everInView ? <HeroScene progress={progress} rich={rich} active={inView} /> : null}
    </div>
  );
}
