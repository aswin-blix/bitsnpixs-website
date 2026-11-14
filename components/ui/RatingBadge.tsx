import type { Rating } from "@/lib/content";
import { cn } from "@/lib/utils";

const STAR = "M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8z";

function StarRow({ count, className }: { count: number; className?: string }) {
  return (
    <span className={cn("flex gap-1", className)}>
      {Array.from({ length: count }, (_, index) => (
        <svg key={index} viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
          <path d={STAR} />
        </svg>
      ))}
    </span>
  );
}

/** Score with a row of stars filled to the exact fraction (4.7 of 5 fills 94%). */
export function RatingBadge({ score, outOf, label }: Rating) {
  const unfilled = 100 - (score / outOf) * 100;
  return (
    <div className="inline-flex items-center gap-4 rounded-card border border-line bg-raised px-5 py-4">
      <p className="font-display text-4xl leading-none font-semibold text-strong">
        {score}
        <span className="text-lg text-muted">/{outOf}</span>
      </p>
      <div>
        <span role="img" aria-label={`Rated ${score} out of ${outOf}`} className="relative block">
          <StarRow count={outOf} className="text-muted opacity-30" />
          <span className="absolute inset-0" style={{ clipPath: `inset(0 ${unfilled}% 0 0)` }}>
            <StarRow count={outOf} className="text-accent" />
          </span>
        </span>
        <p className="mt-1.5 font-mono text-[0.65rem] tracking-[0.18em] text-muted uppercase">{label}</p>
      </div>
    </div>
  );
}
