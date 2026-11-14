import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface PatchProps {
  /** Short text stitched in the middle (initials). */
  label: string;
  /** CSS custom property holding the thread colour, e.g. "--spectrum-3". */
  thread: string;
  className?: string;
}

/**
 * An embroidered patch: satin-stitched ring in the thread colour, a dashed
 * running stitch inside it, and woven fabric behind the label. Decorative;
 * the surrounding control carries the accessible name.
 */
export function Patch({ label, thread, className }: PatchProps) {
  return (
    <span
      aria-hidden="true"
      style={{ "--patch": `var(${thread})` } as CSSProperties}
      className={cn("satin-ring grid shrink-0 place-items-center rounded-full p-[5px] shadow-card", className)}
    >
      <span className="fabric-weave grid size-full place-items-center rounded-full border-2 border-dashed border-[color-mix(in_oklab,var(--patch)_60%,transparent)] bg-raised font-display font-semibold tracking-tight text-strong">
        {label}
      </span>
    </span>
  );
}
