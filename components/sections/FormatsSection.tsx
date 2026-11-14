"use client";

import { useState } from "react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { FormatsBlock } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Wall of supported file formats. With a `finder`, visitors pick their machine
 * brand and the formats it reads light up while the rest dim.
 */
export function FormatsSection({ block }: { block: FormatsBlock }) {
  const { finder } = block;
  const [brand, setBrand] = useState<string | null>(null);
  const machine = finder?.machines.find((entry) => entry.brand === brand);
  const matches = (format: string) => !machine || machine.formats.includes(format);

  const chipClass = (active: boolean) =>
    cn(
      "rounded-control border px-4 py-2 text-sm font-semibold transition-colors duration-300",
      active ? "border-accent bg-accent text-on-accent" : "border-line bg-raised text-strong hover:border-accent",
    );

  return (
    <Section surface={block.surface}>
      <SectionHeading eyebrow={block.eyebrow} title={block.title} lead={block.lead} />

      {finder ? (
        <div className="mb-10 flex flex-col gap-4">
          <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">{finder.prompt}</p>
          <div role="group" aria-label={finder.prompt} className="flex flex-wrap gap-2.5">
            <button type="button" aria-pressed={brand === null} onClick={() => setBrand(null)} className={chipClass(brand === null)}>
              {finder.allLabel}
            </button>
            {finder.machines.map((entry) => (
              <button
                key={entry.brand}
                type="button"
                aria-pressed={entry.brand === brand}
                onClick={() => setBrand(entry.brand)}
                className={chipClass(entry.brand === brand)}
              >
                {entry.brand}
              </button>
            ))}
          </div>
          <p aria-live="polite" className="min-h-7 text-lg text-ink">
            {machine ? (
              <>
                {finder.resultLabel}{" "}
                <strong className="font-display text-xl font-semibold text-accent-text">{machine.formats.join(", ")}</strong>
              </>
            ) : (
              finder.note
            )}
          </p>
        </div>
      ) : null}

      <RevealGroup as="ul" stagger={0.03} className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {block.formats.map((format) => {
          const isStandard = format === block.standard;
          const lit = matches(format);
          return (
            <RevealItem as="li" key={format}>
              <span
                className={cn(
                  "flex h-full min-h-24 flex-col justify-between rounded-2xl p-4 transition-[opacity,transform,border-color] duration-500 ease-brand",
                  isStandard ? "bg-brand-gradient text-on-accent" : "border border-line bg-raised text-strong",
                  machine && lit && !isStandard && "border-accent",
                  lit ? "opacity-100" : "scale-95 opacity-25",
                )}
              >
                <span aria-hidden="true" className={cn("font-mono text-[0.65rem] tracking-widest uppercase", !isStandard && "text-ink")}>
                  {isStandard ? "Standard" : "Format"}
                </span>
                <span className="font-display text-xl font-semibold sm:text-2xl">
                  {format}
                  {isStandard ? <span className="sr-only"> (standard format)</span> : null}
                </span>
              </span>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
