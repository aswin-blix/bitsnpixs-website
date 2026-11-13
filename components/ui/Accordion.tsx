import type { Faq } from "@/lib/content";
import { Icon } from "./Icon";

interface AccordionProps {
  items: Faq[];
  /** Items sharing a name behave as an exclusive group (one open at a time). */
  name: string;
}

/** Native <details> accordion: keyboard and screen-reader support for free. */
export function Accordion({ items, name }: AccordionProps) {
  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <details key={item.question} name={name} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-xl font-medium text-strong sm:text-2xl [&::-webkit-details-marker]:hidden">
            {item.question}
            <span className="grid size-10 shrink-0 place-items-center rounded-control border border-line transition-transform duration-300 ease-brand group-open:rotate-45 group-open:border-accent">
              <Icon name="plus" size={18} />
            </span>
          </summary>
          <p className="max-w-3xl pb-8 text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
