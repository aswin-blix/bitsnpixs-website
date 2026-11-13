import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteImage } from "@/components/ui/SiteImage";
import type { ProseBlock } from "@/lib/content";
import { cn } from "@/lib/utils";

function ProseList({ list }: { list: NonNullable<ProseBlock["list"]> }) {
  const isCross = list.tone === "cross";
  return (
    <div className="rounded-card border border-line bg-raised p-7">
      {list.title ? <h3 className="mb-5 text-xl font-semibold">{list.title}</h3> : null}
      <ul className="flex flex-col gap-3">
        {list.items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className={cn("mt-0.5 grid size-6 shrink-0 place-items-center rounded-control", isCross ? "bg-sunken text-muted" : "bg-accent text-on-accent")}>
              <Icon name={isCross ? "cross" : "check"} size={13} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Long-form copy. With an image it becomes a two-column feature; without one,
 * the heading sticks on the left while the paragraphs scroll on the right.
 */
export function ProseSection({ block }: { block: ProseBlock }) {
  const body = (
    <RevealGroup className="flex flex-col gap-6 text-lg">
      {block.callout ? (
        <RevealItem>
          <p className="border-l-2 border-accent pl-5 font-display text-2xl font-medium text-strong">{block.callout}</p>
        </RevealItem>
      ) : null}
      {block.paragraphs.map((paragraph) => (
        <RevealItem key={paragraph}>
          <p>{paragraph}</p>
        </RevealItem>
      ))}
      {block.list ? (
        <RevealItem>
          <ProseList list={block.list} />
        </RevealItem>
      ) : null}
      {block.action ? (
        <RevealItem>
          <Button href={block.action.href}>{block.action.label}</Button>
        </RevealItem>
      ) : null}
    </RevealGroup>
  );

  if (block.image) {
    const imageFirst = block.imageSide === "left";
    return (
      <Section surface={block.surface}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className={cn("mx-auto w-full max-w-lg", imageFirst ? "lg:order-first" : "lg:order-last")}>
            <SiteImage image={block.image} sizes="(min-width: 1024px) 40vw, 90vw" className="rounded-card" />
          </Reveal>
          <div>
            <SectionHeading eyebrow={block.eyebrow} title={block.title} lead={block.lead} size="md" className="mb-8 lg:mb-10" />
            {body}
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section surface={block.surface}>
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <SectionHeading eyebrow={block.eyebrow} title={block.title} lead={block.lead} size="md" className="mb-0 lg:sticky lg:top-28 lg:mb-0 lg:self-start" />
        {body}
      </div>
    </Section>
  );
}
