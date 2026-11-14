"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { SPRING } from "@/lib/motion";
import { cn } from "@/lib/utils";

const sizes = {
  md: "px-5 py-2.5 text-sm",
  sm: "px-3.5 py-1.5 text-xs",
} as const;

interface SegmentedControlProps<T extends string> {
  /** Accessible name for the group (visually hidden). */
  legend: string;
  options: readonly { id: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  /** "sm" for a switch that sits inside a card. */
  size?: keyof typeof sizes;
  className?: string;
}

/** Radio group styled as a pill switch; the highlight slides between options. */
export function SegmentedControl<T extends string>({ legend, options, value, onChange, size = "md", className }: SegmentedControlProps<T>) {
  const groupName = useId();

  return (
    <fieldset className={className}>
      <legend className="sr-only">{legend}</legend>
      <div className="relative inline-flex flex-wrap rounded-control border border-line bg-surface p-1">
        {options.map((option) => {
          const selected = option.id === value;
          return (
            <label
              key={option.id}
              className={cn(
                "relative cursor-pointer rounded-control font-semibold transition-colors duration-300 has-focus-visible:outline-2 has-focus-visible:outline-(--focus-ring)",
                sizes[size],
                selected ? "text-on-accent" : "text-strong",
              )}
            >
              <input
                type="radio"
                name={groupName}
                value={option.id}
                checked={selected}
                onChange={() => onChange(option.id)}
                className="sr-only"
              />
              {selected ? (
                <motion.span layoutId={`${groupName}-pill`} transition={SPRING} className="absolute inset-0 rounded-control bg-accent" />
              ) : null}
              <span className="relative">{option.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
