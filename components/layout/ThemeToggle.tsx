"use client";

import type { MouseEvent } from "react";
import { useTheme } from "@/lib/hooks/use-theme";
import { cn } from "@/lib/utils";

const REVEAL_MS = 600;

/**
 * Switches between the dark and light themes. Where the browser supports view
 * transitions (and motion is allowed), the new theme spreads out in a circle
 * from the button; otherwise it switches instantly.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useTheme();
  const next = theme === "light" ? "dark" : "light";
  const label = `Switch to ${next} theme`;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduced) {
      setTheme(next);
      return;
    }
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = bounds.left + bounds.width / 2;
    const y = bounds.top + bounds.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const transition = document.startViewTransition(() => setTheme(next));
    transition.ready
      .then(() =>
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: REVEAL_MS, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
        ),
      )
      .catch(() => undefined);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      title={label}
      className={cn(
        "relative grid size-10 shrink-0 place-items-center sm:size-11 overflow-hidden rounded-control border border-line bg-surface text-strong transition-colors duration-300 hover:border-accent",
        className,
      )}
    >
      {/* Sun and moon share the button and swap with a turn; both are drawn so nothing shifts before hydration. */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={cn("absolute size-5 transition-[transform,opacity] duration-500 ease-brand", theme === "light" ? "rotate-0 opacity-100" : "-rotate-90 opacity-0")}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
      >
        <path d="M21 13.2A8.5 8.5 0 1 1 10.8 3a6.6 6.6 0 0 0 10.2 10.2Z" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={cn("absolute size-5 transition-[transform,opacity] duration-500 ease-brand", theme === "light" ? "rotate-90 opacity-0" : "rotate-0 opacity-100")}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
