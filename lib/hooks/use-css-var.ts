"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * Reads a theme token from tokens.css at runtime, so canvas/WebGL code uses
 * the same variables as the CSS. Returns `fallback` during SSR.
 */
export function useCssVar(name: `--${string}`, fallback: string): string {
  return useSyncExternalStore(
    noopSubscribe,
    () => getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback,
    () => fallback,
  );
}
