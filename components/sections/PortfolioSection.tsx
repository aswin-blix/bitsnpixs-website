import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  getPortfolioItems,
  portfolioCategories,
  type LinkRef,
  type PortfolioBlock,
  type PortfolioItem,
} from "@/lib/content";
import { PortfolioExplorer } from "./PortfolioExplorer";
import { ProjectCard } from "./ProjectCard";

const categoryLabels = Object.fromEntries(portfolioCategories.map(({ id, label }) => [id, label]));

function ProjectGrid({ items }: { items: PortfolioItem[] }) {
  // Number samples within their own category, not across the whole grid.
  const seen = new Map<string, number>();
  return (
    <RevealGroup as="ul" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const index = seen.get(item.category) ?? 0;
        seen.set(item.category, index + 1);
        return (
          <RevealItem as="li" key={item.id}>
            <ProjectCard item={item} categoryLabel={categoryLabels[item.category]} index={index} />
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}

function SectionAction({ action }: { action?: LinkRef }) {
  if (!action) return null;
  return (
    <Reveal className="mt-12 flex justify-center">
      <Button href={action.href} variant="secondary">
        {action.label}
      </Button>
    </Reveal>
  );
}

/** Portfolio samples: a preview grid, or every sample with a filter when `explorer` is set. */
export function PortfolioSection({ block }: { block: PortfolioBlock }) {
  return (
    <Section surface={block.surface}>
      <SectionHeading eyebrow={block.eyebrow} title={block.title} lead={block.lead} />
      {block.explorer ? (
        <PortfolioExplorer items={getPortfolioItems()} categories={portfolioCategories} labels={block.explorer} />
      ) : (
        <ProjectGrid items={getPortfolioItems(block.category, block.limit)} />
      )}
      <SectionAction action={block.action} />
    </Section>
  );
}
