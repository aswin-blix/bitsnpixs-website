import type { LinkRef } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

interface ActionRowProps {
  actions?: LinkRef[];
  size?: "md" | "lg";
  className?: string;
}

/** A row of calls to action: the first is primary, the rest secondary. */
export function ActionRow({ actions, size = "lg", className }: ActionRowProps) {
  if (!actions?.length) return null;
  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      {actions.map((action, index) => (
        <Button key={action.href} href={action.href} size={size} variant={index === 0 ? "primary" : "secondary"}>
          {action.label}
        </Button>
      ))}
    </div>
  );
}
