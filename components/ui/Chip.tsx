import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Pill label for techniques, options and short capability lists. */
export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-control border border-line bg-raised px-4 py-2 text-sm font-medium text-strong",
        className,
      )}
    >
      {children}
    </span>
  );
}
