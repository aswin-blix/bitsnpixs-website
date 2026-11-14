"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

/** Re-renders when <html data-theme> changes (from any toggle on the page). */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

/**
 * Current theme and a setter that applies and remembers it. Returns null
 * during server rendering, when the theme is not known yet.
 */
export function useTheme(): [Theme | null, (theme: Theme) => void] {
  const theme = useSyncExternalStore(subscribe, readTheme, () => null);

  const setTheme = (next: Theme) => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the switch still applies for this visit.
    }
  };

  return [theme, setTheme];
}
