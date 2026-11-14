import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { GlobalBlock } from "@/lib/content";
import { MarketBoard } from "./MarketBoard";
import { WorldMap } from "./WorldMap";

/** Worldwide section: the map, live market clocks and the delivery clock. */
export function GlobalSection({ block }: { block: GlobalBlock }) {
  return (
    <Section surface={block.surface} className="overflow-hidden">
      <SectionHeading eyebrow={block.eyebrow} title={block.title} lead={block.lead} />
      <Reveal className="mb-14">
        <WorldMap markets={block.markets} />
      </Reveal>
      <Reveal>
        <MarketBoard
          markets={block.markets}
          options={block.options}
          clockTitle={block.clockTitle}
          deliveryTitle={block.deliveryTitle}
          deliveryNote={block.deliveryNote}
        />
      </Reveal>
    </Section>
  );
}
