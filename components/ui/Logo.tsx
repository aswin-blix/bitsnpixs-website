import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Typographic wordmark: a cluster of pixels that trails off into stitches.
 * Themeable (it uses the current surface colours). Swap this component for the
 * vector logo once the file is available; see README "Missing content".
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 font-display text-2xl font-semibold tracking-tight text-strong", className)}>
      <svg width="30" height="18" viewBox="0 0 30 18" aria-hidden="true" className="text-accent">
        <rect x="0" y="0" width="5" height="5" fill="currentColor" />
        <rect x="6.5" y="0" width="5" height="5" fill="currentColor" opacity="0.55" />
        <rect x="0" y="6.5" width="5" height="5" fill="currentColor" opacity="0.55" />
        <rect x="6.5" y="6.5" width="5" height="5" fill="currentColor" />
        <rect x="0" y="13" width="5" height="5" fill="currentColor" />
        <path d="M14 15.5h4M21 15.5h4M27 15.5h3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      <span aria-hidden="true">
        bits<span className="text-accent-text">n</span>pixs
      </span>
      <span className="sr-only">{site.name} home</span>
    </span>
  );
}
