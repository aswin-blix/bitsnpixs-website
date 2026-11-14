import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  /** Lift on hover (for cards that are, or contain, a link). */
  interactive?: boolean;
  className?: string;
}

/** Raised panel on the current surface. The base for every card on the site. */
export function Card({ children, interactive, className }: CardProps) {
  return (
    <div
      data-spotlight={interactive || undefined}
      className={cn(
        "relative h-full rounded-card border border-line bg-raised p-7 sm:p-8",
        interactive && "spotlight",
        interactive &&
          "transition-[transform,box-shadow,border-color] duration-500 ease-brand hover:-translate-y-1.5 hover:border-accent hover:shadow-card",
        className,
      )}
    >
      {children}
    </div>
  );
}
