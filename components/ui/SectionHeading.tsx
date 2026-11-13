import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  title?: string;
  eyebrow?: string;
  lead?: string;
  align?: "left" | "center";
  size?: "lg" | "md";
  className?: string;
}

const titleSizes = {
  lg: "text-4xl sm:text-5xl lg:text-6xl",
  md: "text-3xl sm:text-4xl lg:text-5xl",
} as const;

/** Eyebrow + title + lead used at the top of every section. */
export function SectionHeading({ title, eyebrow, lead, align = "left", size = "lg", className }: SectionHeadingProps) {
  if (!title && !eyebrow && !lead) return null;
  return (
    <Reveal
      className={cn(
        "mb-12 flex max-w-3xl flex-col gap-5 lg:mb-16",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      {title ? <h2 className={cn("font-semibold", titleSizes[size])}>{title}</h2> : null}
      {lead ? <p className="max-w-2xl text-lg text-muted">{lead}</p> : null}
    </Reveal>
  );
}
