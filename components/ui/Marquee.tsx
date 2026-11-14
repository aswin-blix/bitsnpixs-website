import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  /** Accessible name for the list, e.g. "Supported file formats". */
  label: string;
  /** "display" for huge keywords, "facts" for a compact band. */
  variant?: "display" | "facts";
  className?: string;
}

const itemClass = {
  display: "gap-8 pr-8 font-display text-4xl font-semibold sm:text-6xl",
  facts: "gap-6 pr-6 font-mono text-sm tracking-[0.14em] uppercase",
} as const;

/**
 * Infinite keyword band. Pure CSS (one translate3d animation), pauses on hover
 * and stops for reduced-motion users. The duplicate track is hidden from
 * assistive tech.
 */
export function Marquee({ items, label, variant = "display", className }: MarqueeProps) {
  const track = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} aria-label={hidden ? undefined : label} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className={cn("flex items-center whitespace-nowrap", itemClass[variant])}>
          <span>{item}</span>
          <span aria-hidden="true" className={cn("rotate-45 bg-accent", variant === "display" ? "size-3" : "size-1.5")} />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("overflow-hidden", className)}>
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        {track(false)}
        {track(true)}
      </div>
    </div>
  );
}
