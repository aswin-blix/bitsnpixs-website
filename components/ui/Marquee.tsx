import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  /** Accessible name for the list, e.g. "Supported file formats". */
  label: string;
  className?: string;
}

/**
 * Infinite keyword band. Pure CSS (one translate3d animation), pauses on hover
 * and stops for reduced-motion users. The duplicate track is hidden from
 * assistive tech.
 */
export function Marquee({ items, label, className }: MarqueeProps) {
  const track = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} aria-label={hidden ? undefined : label} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-8 pr-8 font-display text-4xl font-semibold sm:text-6xl">
          <span>{item}</span>
          <span aria-hidden="true" className="size-3 rotate-45 bg-accent" />
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
