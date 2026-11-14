import { StitchReveal } from "@/components/ui/StitchReveal";
import type { PortfolioCategory, PortfolioItem } from "@/lib/content";
import { padIndex } from "@/lib/utils";

interface ProjectCardProps {
  item: PortfolioItem;
  category: PortfolioCategory;
  index: number;
}

/** One portfolio sample: the artwork being made into the result, with its category and number. */
export function ProjectCard({ item, category, index }: ProjectCardProps) {
  return (
    <StitchReveal
      before={item.before}
      after={item.after}
      labels={category.views}
      name={`${category.label} sample ${index + 1}`}
      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
    >
      <p className="flex items-baseline gap-3 text-right font-mono text-xs tracking-widest text-muted uppercase">
        <span>{category.shortLabel}</span>
        <span aria-hidden="true" className="text-accent-text">
          {padIndex(index)}
        </span>
      </p>
    </StitchReveal>
  );
}
