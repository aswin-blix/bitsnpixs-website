"use client";

import { useSyncExternalStore } from "react";

/**
 * The current time, refreshed every `intervalMs`. Null during server rendering
 * and hydration, so markup that depends on the clock never mismatches.
 */
export function useNow(intervalMs = 30_000): Date | null {
  const tick = useSyncExternalStore(
    (onChange) => {
      const timer = window.setInterval(onChange, intervalMs);
      return () => window.clearInterval(timer);
    },
    () => Math.floor(Date.now() / intervalMs),
    () => null,
  );
  return tick === null ? null : new Date(tick * intervalMs);
}
