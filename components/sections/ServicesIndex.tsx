"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useState, type PointerEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { SiteImage } from "@/components/ui/SiteImage";
import { SmartLink } from "@/components/ui/SmartLink";
import type { ServiceSummary } from "@/lib/content";
import { useMotionProfile } from "@/lib/hooks/use-media-query";
import { SPRING } from "@/lib/motion";
import { cn, padIndex } from "@/lib/utils";

/**
 * Oversized list of services. On desktop a preview image follows the cursor
 * and swaps as rows are hovered; on touch devices each row shows its image inline.
 */
export function ServicesIndex({ services }: { services: ServiceSummary[] }) {
  const { rich } = useMotionProfile();
  const [activeId, setActiveId] = useState<string | null>(null);
  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);
  const active = services.find((service) => service.id === activeId);

  const track = (event: PointerEvent<HTMLUListElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - bounds.left);
    y.set(event.clientY - bounds.top);
  };

  return (
    <ul className="relative border-t border-line" onPointerMove={rich ? track : undefined} onPointerLeave={() => setActiveId(null)}>
      {services.map((service, index) => (
        <li
          key={service.id}
          onPointerEnter={() => setActiveId(service.id)}
          className={cn(
            "group/row relative grid items-center gap-4 border-b border-line py-8 transition-opacity duration-500 md:grid-cols-[4rem_1.1fr_1fr_auto] md:gap-8 md:py-10",
            activeId && activeId !== service.id && "md:opacity-40",
          )}
        >
          <span aria-hidden="true" className="font-mono text-xs tracking-widest text-accent-text">
            {padIndex(index)}
          </span>
          <h3 className="text-3xl font-semibold transition-transform duration-500 ease-brand group-hover/row:translate-x-3 sm:text-5xl">
            <SmartLink href={service.path} className="after:absolute after:inset-0">
              {service.name}
            </SmartLink>
          </h3>
          <p className="text-muted">{service.summary}</p>
          <span aria-hidden="true" className="hidden size-12 place-items-center rounded-control border border-line text-strong transition-colors duration-300 group-hover/row:border-accent group-hover/row:bg-accent group-hover/row:text-on-accent md:grid">
            <Icon name="arrow" size={18} />
          </span>
          {!rich && service.image ? (
            <SiteImage image={service.image} ratio={16 / 9} sizes="92vw" className="md:col-span-4" />
          ) : null}
        </li>
      ))}

      {rich ? (
        <motion.li aria-hidden="true" style={{ x, y }} className="pointer-events-none absolute top-0 left-0 z-10 w-80 -translate-x-1/2 -translate-y-[115%]">
          <AnimatePresence>
            {active?.image ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-x-0 top-0 overflow-hidden rounded-card border border-line shadow-card"
              >
                <SiteImage image={active.image} ratio={16 / 10} sizes="20rem" className="rounded-none" />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.li>
      ) : null}
    </ul>
  );
}
