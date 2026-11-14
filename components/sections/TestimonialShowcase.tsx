"use client";

import { AnimatePresence, motion, useInView, type PanInfo } from "framer-motion";
import { useId, useRef, useState, type CSSProperties, type FocusEvent, type KeyboardEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { Patch } from "@/components/ui/Patch";
import { SplitText } from "@/components/ui/SplitText";
import type { Testimonial, TestimonialLabels } from "@/lib/content";
import { useMotionProfile } from "@/lib/hooks/use-media-query";
import { DURATION, EASE } from "@/lib/motion";
import { COLOR_THREADS } from "@/lib/stitch/threads";
import { clamp, cn, initials, padIndex } from "@/lib/utils";

/** Patches sit slightly askew, like they were sewn on by hand; the chosen one straightens. */
const TILTS = [-6, 4, -3, 5, -4, 3];
/** Horizontal drag, in pixels, that counts as a swipe to the next or previous review. */
const SWIPE_PX = 60;
/** Delay between words as a quote stitches in. */
const WORD_STEP_MS = 14;

/** Time to read a quote before the next one: about 0.32 s a word, between 6 and 14 seconds. */
const readingSeconds = (quote: string) => clamp(quote.split(/\s+/).length * 0.32, 6, 14);

/** Shorter quotes get bigger type. */
const quoteClass = (quote: string) =>
  quote.length < 120 ? "text-3xl sm:text-5xl" : quote.length < 260 ? "text-2xl sm:text-4xl" : "text-xl sm:text-[1.75rem]";

const controlClass =
  "grid size-11 place-items-center rounded-control border border-line bg-surface text-strong transition-colors duration-300 hover:border-accent";

interface TestimonialShowcaseProps {
  items: Testimonial[];
  labels: TestimonialLabels;
}

/**
 * Client reviews as embroidered patches. Choosing a patch stitches that
 * client's quote into the hoop. Reviews advance on their own while the
 * section is in view (a thread fills to show the time left), pausing on hover,
 * keyboard focus or the pause button, and never with reduced motion. Tabs
 * pattern: arrow keys, Home and End move between clients; swipe on touch.
 */
export function TestimonialShowcase({ items, labels }: TestimonialShowcaseProps) {
  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(rootRef, { amount: 0.35 });
  const { reduced, finePointer } = useMotionProfile();
  const baseId = useId();

  const count = items.length;
  const item = items[active];
  const autoplay = !reduced && !userPaused && count > 1;
  const running = autoplay && inView && !hovering && !keyboardFocus;
  const tabId = (index: number) => `${baseId}-tab-${index}`;
  const panelId = `${baseId}-panel`;

  const go = (index: number) => setActive(((index % count) + count) % count);

  const handleTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const targets: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowDown: index + 1,
      ArrowLeft: index - 1,
      ArrowUp: index - 1,
      Home: 0,
      End: count - 1,
    };
    if (!(event.key in targets)) return;
    event.preventDefault();
    const next = ((targets[event.key] % count) + count) % count;
    go(next);
    tabRefs.current[next]?.focus();
  };

  const handleSwipe = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_PX) go(active + 1);
    else if (info.offset.x > SWIPE_PX) go(active - 1);
  };

  // Pause for keyboard users only: a mouse click on play should not hold the pause.
  const handleFocus = (event: FocusEvent) => {
    if ((event.target as Element).matches(":focus-visible")) setKeyboardFocus(true);
  };
  const handleBlur = (event: FocusEvent) => {
    if (!rootRef.current?.contains(event.relatedTarget as Node | null)) setKeyboardFocus(false);
  };

  return (
    <div
      ref={rootRef}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className="grid gap-5 lg:grid-cols-[1fr_19rem] lg:gap-8"
    >
      <motion.div
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabId(active)}
        aria-live={running ? "off" : "polite"}
        drag={finePointer ? false : "x"}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        onDragEnd={handleSwipe}
        className="relative isolate flex flex-col overflow-hidden rounded-card border border-line bg-raised p-6 sm:p-10 lg:p-12"
      >
        <div aria-hidden="true" className="fabric-weave absolute inset-0 -z-10 [mask-image:radial-gradient(120%_90%_at_100%_0%,black,transparent_60%)]" />
        <span aria-hidden="true" className="pointer-events-none absolute inset-3 -z-10 rounded-[calc(var(--shape-card)-0.5rem)] border-2 border-dashed border-line" />
        <span
          aria-hidden="true"
          className="text-outline pointer-events-none absolute -top-2 right-5 -z-10 hidden font-display sm:block text-[9rem] leading-none text-accent opacity-40 sm:-top-4 sm:right-8 sm:text-[13rem]"
        >
          “
        </span>

        {/* Every quote is laid out in the same grid cell (invisibly), so the card is as tall as the longest one and never jumps. */}
        <div className="grid">
          {items.map((entry) => (
            <div key={entry.name} aria-hidden="true" className={cn("invisible font-display leading-[1.18] font-medium [grid-area:1/1]", quoteClass(entry.quote))}>
              <SplitText text={entry.quote} still />
            </div>
          ))}
          <AnimatePresence mode="wait" initial={false}>
            <motion.blockquote
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: DURATION.fast } }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.2, ease: EASE.inOut } }}
              className={cn("font-display leading-[1.18] font-medium text-strong [grid-area:1/1]", quoteClass(item.quote))}
            >
              <SplitText text={item.quote} step={WORD_STEP_MS} />
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6">
          <div className="flex items-center gap-4">
            <Patch label={initials(item.name)} thread={COLOR_THREADS[active % COLOR_THREADS.length].token} className="size-14 text-lg" />
            <div>
              <p className="font-display text-xl font-semibold text-strong">{item.name}</p>
              {item.company ? (
                <p className="font-mono text-xs tracking-widest text-muted uppercase">{[item.company, item.location].filter(Boolean).join(", ")}</p>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <p aria-hidden="true" className="mr-2 font-mono text-sm tracking-widest text-muted">
              <span className="text-strong">{padIndex(active)}</span> / {padIndex(count - 1)}
            </p>
            <button type="button" aria-label={labels.previous} aria-controls={panelId} onClick={() => go(active - 1)} className={controlClass}>
              <Icon name="chevron" size={18} className="rotate-90" />
            </button>
            {!reduced && count > 1 ? (
              <button
                type="button"
                aria-label={userPaused ? labels.play : labels.pause}
                onClick={() => setUserPaused((paused) => !paused)}
                className={controlClass}
              >
                <Icon name={userPaused ? "play" : "pause"} size={16} />
              </button>
            ) : null}
            <button type="button" aria-label={labels.next} aria-controls={panelId} onClick={() => go(active + 1)} className={controlClass}>
              <Icon name="chevron" size={18} className="-rotate-90" />
            </button>
          </div>
        </div>

        <div aria-hidden="true" className="relative mt-6 h-1 overflow-hidden rounded-control bg-line">
          {autoplay ? (
            <span
              key={active}
              onAnimationEnd={() => go(active + 1)}
              style={{ "--progress-duration": `${readingSeconds(item.quote)}s`, animationPlayState: running ? "running" : "paused" } as CSSProperties}
              className="absolute inset-0 origin-left animate-progress bg-accent"
            />
          ) : (
            <span className="absolute inset-y-0 left-0 bg-accent" style={{ width: `${((active + 1) / count) * 100}%` }} />
          )}
        </div>
      </motion.div>

      <div role="tablist" aria-label={labels.listLabel} className="-mx-1 flex gap-1.5 overflow-x-auto px-1 py-2 sm:gap-2 lg:mx-0 lg:flex-col lg:gap-3 lg:overflow-visible lg:p-0">
        {items.map((entry, index) => {
          const selected = index === active;
          return (
            <button
              key={entry.name}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={tabId(index)}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => go(index)}
              onKeyDown={(event) => handleTabKey(event, index)}
              className={cn(
                "group/patch flex shrink-0 items-center gap-4 rounded-2xl border p-1 text-left transition-colors duration-300 sm:p-2 lg:p-3",
                selected ? "border-transparent lg:border-accent lg:bg-accent-soft" : "border-transparent lg:hover:border-line",
              )}
            >
              <span
                className={cn("block transition-[transform,opacity] duration-500 ease-brand", selected ? "scale-110 opacity-100" : "opacity-60 group-hover/patch:opacity-100")}
                style={{ transform: selected ? undefined : `rotate(${TILTS[index % TILTS.length]}deg)` }}
              >
                <Patch label={initials(entry.name)} thread={COLOR_THREADS[index % COLOR_THREADS.length].token} className="size-12 text-base sm:size-14 sm:text-lg" />
              </span>
              <span className="sr-only lg:not-sr-only">
                <span className="block font-display font-semibold text-strong">{entry.name}</span>
                {entry.company ? <span className="block text-sm text-muted">{entry.company}</span> : null}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
