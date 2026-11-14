import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small mono label that introduces a section, prefixed by a stitch. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-baseline gap-3 font-mono text-[0.68rem] font-medium tracking-[0.14em] text-accent-text uppercase sm:text-xs sm:tracking-[0.18em]",
        className,
      )}
    >
      <span aria-hidden="true" className="stitch-x w-7 shrink-0 self-center sm:w-9" />
      {children}
    </p>
  );
}
