"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DURATION, EASE } from "@/lib/motion";
import { MEDIA, useMediaQuery } from "@/lib/hooks/use-media-query";

/**
 * Page transition. When the route changes, a curtain covers the new page in the
 * same render (no flash of content) and then lifts away, trailing a stitched
 * thread along its lower edge. AnimatePresence plays the exit, and the new
 * page's hero runs its CSS entrance underneath as the curtain lifts.
 *
 * Page content itself is never wrapped in an opacity animation: server-rendered
 * HTML must be visible before JavaScript loads (first paint, LCP, no-JS).
 */
export function RouteCurtain() {
  const pathname = usePathname();
  const [settledPath, setSettledPath] = useState(pathname);
  const reduced = useMediaQuery(MEDIA.reducedMotion);
  const covering = settledPath !== pathname;

  useEffect(() => {
    if (!covering) return;
    const timer = window.setTimeout(() => setSettledPath(pathname), 60);
    return () => window.clearTimeout(timer);
  }, [covering, pathname]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {covering ? (
        <motion.div
          key="route-curtain"
          aria-hidden="true"
          data-surface="dark"
          className="pointer-events-none fixed inset-0 z-[70] flex items-end"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: DURATION.base, ease: EASE.inOut } }}
        >
          <span className="stitch-x w-full text-accent" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
