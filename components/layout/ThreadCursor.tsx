"use client";

import { useEffect, useRef } from "react";
import { useMotionProfile } from "@/lib/hooks/use-media-query";

const MAX_POINTS = 18;
/** Minimum pointer travel, in pixels, before a new point is added. */
const MIN_STEP = 10;

/**
 * A length of stitched thread that trails the cursor and reels in when it
 * stops. Desktop fine-pointer devices only, never with reduced motion. The
 * animation loop runs only while there is a trail to draw.
 */
export function ThreadCursor() {
  const { rich } = useMotionProfile();
  const lineRef = useRef<SVGPolylineElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!rich || !line) return;

    const points: [number, number][] = [];
    let frame = 0;
    let moved = false;

    const draw = () => {
      if (!moved && points.length > 0) points.pop();
      moved = false;
      line.setAttribute("points", points.map(([x, y]) => `${x},${y}`).join(" "));
      frame = points.length > 0 ? requestAnimationFrame(draw) : 0;
    };

    const onMove = (event: PointerEvent) => {
      const [lastX, lastY] = points[0] ?? [Infinity, Infinity];
      if (Math.hypot(event.clientX - lastX, event.clientY - lastY) < MIN_STEP) return;
      points.unshift([event.clientX, event.clientY]);
      if (points.length > MAX_POINTS) points.pop();
      moved = true;
      if (!frame) frame = requestAnimationFrame(draw);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [rich]);

  if (!rich) return null;

  return (
    <svg aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] size-full">
      <polyline ref={lineRef} fill="none" stroke="var(--accent)" strokeWidth={2} strokeDasharray="9 7" strokeLinecap="round" opacity={0.75} />
    </svg>
  );
}
