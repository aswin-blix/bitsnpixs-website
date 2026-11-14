"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import type { ImageRef } from "@/lib/content";
import { useMotionProfile } from "@/lib/hooks/use-media-query";
import { DURATION, EASE, STAGGER } from "@/lib/motion";
import { revealDuration, revealRows } from "@/lib/stitch/reveal";
import { cn } from "@/lib/utils";
import { SegmentedControl } from "./SegmentedControl";
import { SiteImage } from "./SiteImage";

type View = "before" | "after";

interface StitchRevealProps {
  before: ImageRef;
  after: ImageRef;
  /** Names of the two views, shown on the switch. */
  labels: Record<View, string>;
  /** Accessible name of the sample, e.g. "Embroidery Digitizing sample 1". */
  name: string;
  sizes: string;
  /** Caption shown beside the switch. */
  children?: ReactNode;
}

const ROWS = 6;
const ROW_SECONDS = DURATION.base;
/** Pause between the card entering the screen and the first row being sewn. */
const AUTO_START_MS = 450;
/** Hoop diameter as a share of the frame width, and the width of its ring. */
const HOOP = { size: "44cqw", ring: "6px" } as const;

/** Rows cross the frame at an even pace, like a machine sewing, not with the usual ease-out. */
const ROW_EASING = `cubic-bezier(${EASE.inOut.join(",")})`;

const sweep = "transition-transform";
/** A box exactly the size of the frame, wherever it sits inside it. */
const frameSized = "absolute left-0 size-[100cqw]";

/**
 * Before/after pair shown as one piece of work being made. The artwork is sewn
 * into the finished result row by row (transform only), once when the card
 * scrolls into view and again whenever the visitor switches views. On devices
 * with a mouse, an embroidery hoop follows the pointer and shows the other view
 * through it. Clicking the frame flips the view, as does the switch below it.
 */
export function StitchReveal({ before, after, labels, name, sizes, children }: StitchRevealProps) {
  const [view, setView] = useState<View>("before");
  const [hoop, setHoop] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const lens = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const quietUntil = useRef(0);
  const inView = useInView(frame, { once: true, margin: "0px 0px -20% 0px" });
  const { reduced, finePointer } = useMotionProfile();

  const stitched = view === "after";
  const stagger = reduced ? 0 : STAGGER;
  const rows = revealRows(ROWS, stagger, !stitched);

  // Sew the sample once when it first comes into view, unless the visitor got there first.
  useEffect(() => {
    if (!inView || reduced) return;
    const timer = window.setTimeout(() => {
      if (!touched.current) setView("after");
    }, AUTO_START_MS);
    return () => window.clearTimeout(timer);
  }, [inView, reduced]);

  const show = (next: View) => {
    touched.current = true;
    // Put the hoop away while the rows move, so nothing covers them.
    quietUntil.current = performance.now() + revealDuration(ROWS, stagger, ROW_SECONDS) * 1000;
    setHoop(false);
    setView(next);
  };

  const moveHoop = (event: PointerEvent<HTMLDivElement>) => {
    if (!lens.current) return;
    const box = event.currentTarget.getBoundingClientRect();
    lens.current.style.setProperty("--x", `${event.clientX - box.left}px`);
    lens.current.style.setProperty("--y", `${event.clientY - box.top}px`);
    if (!hoop && event.timeStamp > quietUntil.current) setHoop(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={frame}
        role="img"
        aria-label={(stitched ? after : before).alt}
        onClick={() => show(stitched ? "before" : "after")}
        onPointerMove={moveHoop}
        onPointerLeave={() => setHoop(false)}
        className="@container relative aspect-square cursor-pointer overflow-hidden rounded-card border border-line bg-sunken"
      >
        <SiteImage image={after} sizes={sizes} fill className="rounded-none" />

        {rows.map((row, index) => {
          const timing: CSSProperties = {
            transitionDuration: `${ROW_SECONDS}s`,
            transitionDelay: `${row.delay}s`,
            transitionTimingFunction: ROW_EASING,
          };
          // Slightly past 100% so no sub-pixel sliver of the band is left at the frame edge.
          const shift = (direction: number): CSSProperties => ({
            ...timing,
            transform: stitched ? `translateX(${direction * 102}%)` : undefined,
          });
          return (
            // Each band is a window onto the artwork. The window slides out while its
            // content slides back by the same amount, so the artwork itself stays still.
            <div
              key={index}
              className={cn("absolute inset-x-0 overflow-hidden", sweep)}
              style={{ top: `${(index * 100) / ROWS}%`, height: `calc(${100 / ROWS}% + 1px)`, ...shift(row.direction) }}
            >
              <div className={cn("size-full", sweep)} style={shift(-row.direction)}>
                <div className={frameSized} style={{ top: `calc(${-index} * 100cqw / ${ROWS})` }}>
                  <SiteImage image={before} sizes={sizes} fill className="rounded-none" />
                </div>
              </div>
              {/* The thread: a bright edge that leads each row across the frame. */}
              <span
                className={cn("absolute inset-y-0 w-0.5 bg-accent", row.direction > 0 ? "left-0" : "right-0", stitched ? "opacity-100" : "opacity-0")}
                style={{
                  transition: stitched
                    ? `opacity 0s linear ${row.delay}s`
                    : `opacity ${DURATION.fast}s linear ${row.delay + ROW_SECONDS - DURATION.fast}s`,
                }}
              />
            </div>
          );
        })}

        {finePointer ? (
          <div
            ref={lens}
            className="pointer-events-none absolute top-0 left-0"
            style={
              {
                "--hoop": HOOP.size,
                "--ring": HOOP.ring,
                width: "var(--hoop)",
                height: "var(--hoop)",
                transform: "translate(calc(var(--x, 50cqw) - 50%), calc(var(--y, 50cqw) - 50%))",
              } as CSSProperties
            }
          >
            <div
              className={cn(
                "satin-ring size-full rounded-full p-(--ring) shadow-card transition duration-300 ease-brand",
                hoop ? "scale-100 opacity-100" : "scale-75 opacity-0",
              )}
            >
              <div className="relative size-full overflow-hidden rounded-full bg-sunken">
                <div
                  className={cn(frameSized, "top-0")}
                  style={{
                    transform:
                      "translate(calc(var(--hoop) / 2 - var(--ring) - var(--x, 50cqw)), calc(var(--hoop) / 2 - var(--ring) - var(--y, 50cqw)))",
                  }}
                >
                  <SiteImage image={stitched ? before : after} sizes={sizes} fill className="rounded-none" />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-4">
        <SegmentedControl
          legend={name}
          size="sm"
          value={view}
          onChange={show}
          options={[
            { id: "before", label: labels.before },
            { id: "after", label: labels.after },
          ]}
        />
        {children}
      </div>
    </div>
  );
}
