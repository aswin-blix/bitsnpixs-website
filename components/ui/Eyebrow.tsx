import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small mono label that introduces a section, prefixed by a stitch. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 font-mono text-xs font-medium tracking-[0.18em] text-accent-text uppercase",
        className,
      )}
    >
      <span aria-hidden="true" className="stitch-x w-9 shrink-0" />
      {children}
    </p>
  );
}
