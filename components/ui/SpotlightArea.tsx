"use client";

import type { PointerEvent, ReactNode } from "react";

/**
 * Tracks the pointer for every [data-spotlight] descendant (see the `spotlight`
 * utility). One delegated listener serves a whole grid of cards.
 */
export function SpotlightArea({ children, className }: { children: ReactNode; className?: string }) {
  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const card = (event.target as HTMLElement).closest<HTMLElement>("[data-spotlight]");
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - bounds.left}px`);
    card.style.setProperty("--my", `${event.clientY - bounds.top}px`);
  };

  return (
    <div className={className} onPointerMove={handleMove}>
      {children}
    </div>
  );
}
