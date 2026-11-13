"use client";

import { useState } from "react";
import { Chip } from "@/components/ui/Chip";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SpecialtiesBlock } from "@/lib/content";
import { cn } from "@/lib/utils";
import { GarmentFigure } from "./GarmentFigure";

/**
 * Placement picker: choose where the embroidery goes and the matching garment
 * lights up its stitch zone. Technique specialties are listed alongside.
 */
export function SpecialtiesSection({ block }: { block: SpecialtiesBlock }) {
  const [activeId, setActiveId] = useState(block.placements[0]?.id);

  return (
    <Section surface={block.surface}>
      <SectionHeading eyebrow={block.eyebrow} title={block.title} lead={block.lead} />

      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <Reveal className="rounded-card border border-line bg-raised p-6 sm:p-10">
          <div className="grid grid-cols-3 items-end gap-4 text-strong sm:gap-8">
            {block.placements.map((placement) => (
              <GarmentFigure key={placement.id} placement={placement.id} active={placement.id === activeId} />
            ))}
          </div>
          <div role="group" aria-label="Embroidery placement" className="mt-8 grid gap-3 sm:grid-cols-3">
            {block.placements.map((placement) => {
              const active = placement.id === activeId;
              return (
                <button
                  key={placement.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveId(placement.id)}
                  onPointerEnter={() => setActiveId(placement.id)}
                  className={cn(
                    "rounded-control border px-4 py-3 text-sm font-semibold transition-colors duration-300",
                    active ? "border-accent bg-accent text-on-accent" : "border-line bg-surface text-strong hover:border-accent",
                  )}
                >
                  {placement.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <RevealGroup as="ul" stagger={0.04} className="flex flex-wrap content-start gap-3">
          {block.techniques.map((technique) => (
            <RevealItem as="li" key={technique}>
              <Chip className="px-5 py-3 text-base">{technique}</Chip>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
