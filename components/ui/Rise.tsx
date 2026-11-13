import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RiseProps {
  children: ReactNode;
  /** Position in the stagger sequence (0 = first). */
  index?: number;
  /**
   * Slide without fading. Use for the largest text block above the fold: it
   * stays visible from the first frame, which keeps Largest Contentful Paint early.
   */
  solid?: boolean;
  className?: string;
}

/**
 * CSS-only entrance for above-the-fold content. Unlike the scroll reveals it
 * needs no JavaScript, so hero text paints immediately (good for LCP) and
 * still works with scripts disabled.
 */
export function Rise({ children, index = 0, solid, className }: RiseProps) {
  return (
    <div className={cn(solid ? "animate-slide" : "animate-rise", "stagger-delay", className)} style={{ "--stagger-index": index } as CSSProperties}>
      {children}
    </div>
  );
}
