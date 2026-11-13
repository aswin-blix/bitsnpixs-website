import { CompareSlider } from "@/components/ui/CompareSlider";
import type { PortfolioItem } from "@/lib/content";
import { padIndex } from "@/lib/utils";

interface ProjectCardProps {
  item: PortfolioItem;
  categoryLabel: string;
  index: number;
}

/** One portfolio sample: a before/after comparison with a caption. */
export function ProjectCard({ item, categoryLabel, index }: ProjectCardProps) {
  const label = `${categoryLabel} sample ${index + 1}`;
  return (
    <figure className="flex flex-col gap-4">
      <CompareSlider before={item.before} after={item.after} label={label} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" />
      <figcaption className="flex items-center justify-between gap-4 font-mono text-xs tracking-widest text-muted uppercase">
        <span>{categoryLabel}</span>
        <span aria-hidden="true" className="text-accent-text">
          {padIndex(index)}
        </span>
      </figcaption>
    </figure>
  );
}
