import type { ReactNode } from "react";
import type { Surface } from "@/lib/content";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  surface?: Surface;
  id?: string;
  /** Skip the centred container (for full-bleed content such as marquees). */
  bleed?: boolean;
  /** Skip the vertical section padding. */
  flush?: boolean;
  className?: string;
}

/** Page section: sets the surface palette, vertical rhythm and container. */
export function Section({ children, surface = "dark", id, bleed, flush, className }: SectionProps) {
  return (
    <section id={id} data-surface={surface} className={cn("relative", !flush && "section-y", className)}>
      {bleed ? children : <div className="container-page">{children}</div>}
    </section>
  );
}
