"use client";

import { useEffect, useState } from "react";

const INTERACTION_EVENTS = ["pointerdown", "touchstart", "keydown", "scroll"] as const;

/**
 * Becomes true when it is a good moment to start non-essential work such as
 * the WebGL scene:
 *   "idle"         once the browser is idle (desktop: almost immediately)
 *   "interaction"  on the visitor's first scroll, tap or key press (phones:
 *                  keeps three.js out of the initial load entirely)
 */
export function useDeferredReady(mode: "idle" | "interaction"): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const markReady = () => setReady(true);

    if (mode === "interaction") {
      const options = { once: true, passive: true } as const;
      INTERACTION_EVENTS.forEach((type) => window.addEventListener(type, markReady, options));
      return () => INTERACTION_EVENTS.forEach((type) => window.removeEventListener(type, markReady));
    }

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(markReady, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = window.setTimeout(markReady, 300);
    return () => window.clearTimeout(timer);
  }, [mode]);

  return ready;
}
