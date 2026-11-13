"use client";

import { useId, useState } from "react";
import type { ImageRef } from "@/lib/content";
import { cn } from "@/lib/utils";
import { SiteImage } from "./SiteImage";

interface CompareSliderProps {
  before: ImageRef;
  after: ImageRef;
  /** Accessible name, e.g. "Embroidery digitizing sample 1". */
  label: string;
  sizes: string;
  className?: string;
}

/**
 * Before/after comparison. A native range input covers the frame, so dragging,
 * tapping and arrow keys all work without custom pointer handling.
 */
export function CompareSlider({ before, after, label, sizes, className }: CompareSliderProps) {
  const [position, setPosition] = useState(50);
  const id = useId();

  return (
    <div className={cn("group/compare relative aspect-square overflow-hidden rounded-card border border-line bg-sunken", className)}>
      <SiteImage image={after} sizes={sizes} fill className="rounded-none" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <SiteImage image={before} sizes={sizes} fill className="rounded-none" />
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-surface" style={{ left: `${position}%` }}>
        <span className="absolute top-1/2 left-1/2 grid size-11 -translate-1/2 place-items-center rounded-control bg-surface text-strong shadow-card transition-transform duration-300 ease-brand group-hover/compare:scale-110 group-has-focus-visible/compare:scale-110 group-has-focus-visible/compare:outline-2 group-has-focus-visible/compare:outline-(--focus-ring)">
          <span className="stitch-x w-5" />
        </span>
      </div>

      <label htmlFor={id} className="sr-only">
        {label}: drag to compare the original artwork with the result
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        className="absolute inset-0 size-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
