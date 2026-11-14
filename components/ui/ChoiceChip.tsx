import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ChoiceChipProps {
  children: ReactNode;
  selected: boolean;
  onSelect: () => void;
  /** "lg" for big cards (products), "md" for option chips, "sm" for dense filters. */
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "rounded-control px-4 py-2 text-sm",
  md: "rounded-xl px-4 py-2.5 text-[0.95rem]",
  lg: "rounded-2xl px-5 py-3 text-left",
} as const;

/** Toggle button used wherever the visitor picks one option from a set. */
export function ChoiceChip({ children, selected, onSelect, size = "lg", className }: ChoiceChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        "border font-semibold transition-colors duration-300",
        sizes[size],
        selected ? "border-accent bg-accent text-on-accent" : "border-line bg-surface text-strong hover:border-accent",
        className,
      )}
    >
      {children}
    </button>
  );
}
