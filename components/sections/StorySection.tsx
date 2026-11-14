"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import type { Step, StoryBlock } from "@/lib/content";
import { useGsap } from "@/lib/hooks/use-gsap";
import { useMotionProfile } from "@/lib/hooks/use-media-query";
import { cn, padIndex } from "@/lib/utils";

/**
 * Scroll-told chapter: a set of steps the thread sews through.
 *   stack       held in place; steps swap as the thread fills
 *   horizontal  held in place; steps travel sideways along a (spectrum) thread
 * Small screens and reduced-motion users get the same steps as a plain list.
 */
export function StorySection({ block }: { block: StoryBlock }) {
  const { rich } = useMotionProfile();
  const Layout = !rich ? StaticStory : block.mode === "horizontal" ? HorizontalStory : StackStory;

  return (
    <Section surface={block.surface ?? "dark"} bleed flush>
      <Layout block={block} />
    </Section>
  );
}

interface LayoutProps {
  block: StoryBlock;
}

const threadClass = { brand: "bg-accent", spectrum: "bg-spectrum" } as const;

function StoryIntro({ block, className }: LayoutProps & { className?: string }) {
  return (
    <div className={cn("flex flex-col items-start gap-5", className)}>
      {block.eyebrow ? <Eyebrow>{block.eyebrow}</Eyebrow> : null}
      {block.title ? <h2 className="text-4xl font-semibold sm:text-5xl lg:text-6xl">{block.title}</h2> : null}
      {block.lead ? <p className="max-w-xl text-lg text-muted">{block.lead}</p> : null}
    </div>
  );
}

function StepContent({ step, index, compact }: { step: Step; index: number; compact?: boolean }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="font-mono text-xs tracking-[0.2em] text-accent-text uppercase">Step {padIndex(index)}</span>
      {step.title ? (
        <>
          <h3 className={cn("font-semibold", compact ? "text-2xl" : "text-3xl sm:text-5xl")}>{step.title}</h3>
          <p className={cn("text-muted", compact ? "text-base" : "max-w-xl text-lg sm:text-xl")}>{step.body}</p>
        </>
      ) : (
        <p className={cn("font-display font-medium text-strong", compact ? "text-xl" : "max-w-2xl text-2xl leading-snug sm:text-4xl")}>
          {step.body}
        </p>
      )}
    </div>
  );
}

function StoryAction({ block }: LayoutProps) {
  if (!block.action) return null;
  return <Button href={block.action.href}>{block.action.label}</Button>;
}

/** Thread that fills as the chapter progresses (scaleX only). */
function ProgressThread({ thread, barRef }: { thread: StoryBlock["thread"]; barRef: React.RefObject<HTMLSpanElement | null> }) {
  return (
    <div aria-hidden="true" className="relative h-1 w-full overflow-hidden rounded-control bg-line">
      <span ref={barRef} className={cn("absolute inset-0 origin-left scale-x-0", threadClass[thread])} />
    </div>
  );
}

/** Scroll distance each step gets in the stacked chapter, in viewport heights. */
const STACK_STEP_VH = 60;
/** Share of a step's scroll spent fading the previous step out, then the next one in. */
const SWAP = 0.22;

/*
 * Both pinned layouts hold their place with CSS `position: sticky` rather than
 * a JavaScript pin: the browser keeps the panel still on the compositor, so it
 * cannot jitter against smooth scrolling. GSAP only scrubs a timeline against
 * the wrapper's scroll progress, so every frame is a pure function of scroll
 * position: nothing is triggered at thresholds and nothing re-renders.
 *
 * The held panel is only as tall as its content (not a full viewport), and its
 * padding matches the page's section rhythm, so a chapter never opens or closes
 * with a screen of empty space. The extra scroll distance lives below the panel
 * (a spacer, or the wrapper's height), and the timeline runs exactly while the
 * panel is held: from the wrapper's top at the viewport top until the wrapper's
 * bottom meets the panel's bottom.
 */

const stageClass = "sticky top-0 pt-[max(var(--space-section),calc(var(--header-height)+2rem))] pb-(--space-section)";

/** Scroll position at which a held panel lets go: the wrapper's bottom reaches the panel's bottom. */
const heldEnd = (stage: HTMLElement | null) => () => `bottom ${stage?.offsetHeight ?? 0}px`;

function StackStory({ block }: LayoutProps) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const count = block.steps.length;

  useGsap(
    root,
    ({ gsap }) => {
      const panels = gsap.utils.toArray<HTMLElement>(".js-step");
      gsap.set(panels.slice(1), { opacity: 0, yPercent: 14 });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: heldEnd(stage.current),
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const label = padIndex(Math.min(count - 1, Math.floor(self.progress * count)));
            if (counter.current && counter.current.textContent !== label) counter.current.textContent = label;
          },
        },
      });

      // One unit of timeline per step. The thread fills across the whole chapter.
      timeline.to(bar.current, { scaleX: 1, duration: count }, 0);
      // Steps swap one after the other (out, then in), so two are never half-visible at once.
      for (let index = 1; index < count; index += 1) {
        timeline
          .to(panels[index - 1], { opacity: 0, yPercent: -14, duration: SWAP }, index - SWAP)
          .to(panels[index], { opacity: 1, yPercent: 0, duration: SWAP }, index);
      }
    },
    [count],
  );

  return (
    <div ref={root}>
      <div ref={stage} className={stageClass}>
        <div className="container-page grid items-center gap-16 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col items-start gap-10">
            <StoryIntro block={block} />
            <div className="flex w-full max-w-sm flex-col gap-3">
              <p aria-hidden="true" className="font-mono text-sm tracking-widest text-muted">
                <span ref={counter} className="text-strong">
                  {padIndex(0)}
                </span>{" "}
                / {padIndex(count - 1)}
              </p>
              <ProgressThread thread={block.thread} barRef={bar} />
            </div>
            <StoryAction block={block} />
          </div>

          <ol className="relative min-h-[24rem]">
            {block.steps.map((step, index) => (
              <li key={step.body} className="js-step absolute inset-0 flex flex-col justify-center will-change-[transform,opacity]">
                <span aria-hidden="true" className="mb-6 font-display text-[clamp(5rem,12vw,11rem)] leading-none font-bold text-ghost">
                  {padIndex(index)}
                </span>
                <StepContent step={step} index={index} />
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div aria-hidden="true" style={{ height: `${count * STACK_STEP_VH}vh` }} />
    </div>
  );
}

function HorizontalStory({ block }: LayoutProps) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const count = block.steps.length;

  useGsap(
    root,
    ({ gsap, ScrollTrigger }) => {
      const wrapper = root.current;
      const element = track.current;
      if (!wrapper || !element) return;
      const distance = () => Math.max(0, element.scrollWidth - window.innerWidth);
      // The wrapper is the panel plus the sideways travel, so one pixel of scroll moves the track one pixel.
      const sizeWrapper = () => {
        wrapper.style.height = `${(stage.current?.offsetHeight ?? 0) + distance()}px`;
      };
      sizeWrapper();
      ScrollTrigger.addEventListener("refreshInit", sizeWrapper);

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: wrapper, start: "top top", end: heldEnd(stage.current), scrub: true, invalidateOnRefresh: true },
        })
        .to(element, { x: () => -distance() }, 0)
        .to(bar.current, { scaleX: 1 }, 0);

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", sizeWrapper);
        wrapper.style.height = "";
      };
    },
    [count],
  );

  return (
    <div ref={root}>
      <div ref={stage} className={cn(stageClass, "flex flex-col gap-14 overflow-x-clip")}>
        <div className="container-page flex flex-wrap items-end justify-between gap-8">
          <StoryIntro block={block} />
          <div className="w-full max-w-xs">
            <ProgressThread thread={block.thread} barRef={bar} />
          </div>
        </div>

        <div ref={track} className="relative w-max px-(--container-inset) will-change-transform">
          <span aria-hidden="true" className={cn("absolute inset-x-0 top-3 h-1", threadClass[block.thread])} />
          <ol className="flex gap-8">
            {block.steps.map((step, index) => (
              <li key={step.body} className="relative w-[min(78vw,25rem)] shrink-0 pt-14">
                <span aria-hidden="true" className="absolute top-0 left-0 size-7 rotate-45 border-2 border-strong bg-surface" />
                <div className="h-full rounded-card border border-line bg-raised p-8">
                  <StepContent step={step} index={index} compact />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

function StaticStory({ block }: LayoutProps) {
  return (
    <div className="container-page section-y">
      <StoryIntro block={block} className="mb-12" />
      <RevealGroup as="ol" className="flex flex-col">
        {block.steps.map((step, index) => (
          <RevealItem as="li" key={step.body} className="relative border-l-2 border-dashed border-line pb-10 pl-8 last:pb-0">
            <span aria-hidden="true" className={cn("absolute top-1 -left-[0.45rem] size-3 rotate-45", threadClass[block.thread])} />
            <StepContent step={step} index={index} compact />
          </RevealItem>
        ))}
      </RevealGroup>
      {block.action ? (
        <div className="mt-12">
          <StoryAction block={block} />
        </div>
      ) : null}
    </div>
  );
}
