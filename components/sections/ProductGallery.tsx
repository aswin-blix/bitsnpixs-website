"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SiteImage } from "@/components/ui/SiteImage";
import type { ImageRef } from "@/lib/content";
import { DURATION, EASE } from "@/lib/motion";
import { cn, padIndex } from "@/lib/utils";

interface ProductGalleryProps {
  images: ImageRef[];
  label: string;
  sampleLabel: string;
}

/**
 * Product images on a light "swatch" stage with a stitched inner border, plus
 * thumbnails. Images are letterboxed (object-contain) so square portfolio
 * samples and the portrait product shot both show whole.
 */
export function ProductGallery({ images, label, sampleLabel }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div role="group" aria-label={label} data-surface="light" className="rounded-card p-3 shadow-card sm:p-4">
      <div className="relative aspect-square max-h-[calc(100svh-17rem)] w-full sm:aspect-[4/5] overflow-hidden rounded-media bg-sunken">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.fast, ease: EASE.out }}
            className="absolute inset-0"
          >
            <SiteImage image={current} sizes="(min-width: 1024px) 40vw, 92vw" fill fit="contain" eager={active === 0} className="rounded-none" />
          </motion.div>
        </AnimatePresence>
        <span aria-hidden="true" className="pointer-events-none absolute inset-3 rounded-[calc(var(--shape-media)-0.5rem)] border-2 border-dashed border-accent/50" />
        <p className="absolute bottom-5 left-5 rounded-control bg-raised/90 px-3 py-1 font-mono text-[0.65rem] tracking-widest text-ink uppercase">
          {sampleLabel} {padIndex(active)} / {padIndex(images.length - 1)}
        </p>
      </div>

      {images.length > 1 ? (
        <ul className="mt-3 grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <li key={`${image.src ?? image.alt}-${index}`}>
              <button
                type="button"
                aria-pressed={index === active}
                aria-label={`${sampleLabel} ${index + 1}: ${image.alt}`}
                onClick={() => setActive(index)}
                className={cn(
                  "relative block w-full overflow-hidden rounded-xl border-2 bg-sunken transition-[border-color,opacity] duration-300",
                  index === active ? "border-accent" : "border-transparent opacity-70 hover:opacity-100",
                )}
              >
                <SiteImage image={image} ratio={1} sizes="8rem" fit="contain" className="rounded-none" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
