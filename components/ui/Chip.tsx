import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Pill label for formats, techniques and short capability lists. */
export function Chip({ children, strong, className }: { children: ReactNode; strong?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-control border px-4 py-2 text-sm font-medium",
        strong ? "border-accent bg-accent text-on-accent" : "border-line bg-raised text-strong",
        className,
      )}
    >
      {children}
    </span>
  );
}
