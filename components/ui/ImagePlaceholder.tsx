import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  /** Describes the image that belongs here; announced to screen readers. */
  alt: string;
  /** width / height. Ignored when `fill` is set. */
  ratio?: number;
  /** Fill the positioned parent instead of sizing by ratio. */
  fill?: boolean;
  showLabel?: boolean;
  className?: string;
}

/**
 * Stand-in for an image that is not available yet: a brand-tinted pixel grid
 * with the correct aspect ratio and a small label.
 */
export function ImagePlaceholder({ alt, ratio = 4 / 3, fill, showLabel = true, className }: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      style={fill ? undefined : { aspectRatio: ratio }}
      className={cn(
        "placeholder-surface @container flex items-end overflow-hidden rounded-media text-accent-text",
        fill ? "absolute inset-0" : "relative w-full",
        className,
      )}
    >
      <span aria-hidden="true" className="absolute inset-x-6 top-1/2 stitch-x opacity-40" />
      {showLabel ? (
        <span className="m-3 hidden rounded-control bg-surface/80 px-3 py-1 font-mono text-[0.65rem] tracking-widest uppercase @[12rem]:inline">
          Image placeholder
        </span>
      ) : null}
    </div>
  );
}
