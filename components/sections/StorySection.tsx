"use client";

import { useRef, useState } from "react";
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
 *   stack       pinned; steps swap in place while the thread fills
 *   horizontal  pinned; steps travel sideways along a (spectrum) thread
 * Small screens and reduced-motion users get the same steps as a plain list.
 */
export function StorySection({ block }: { block: StoryBlock }) {
  const { rich } = useMotionProfile();
  const Layout = !rich ? StaticStory : block.mode === "horizontal" ? HorizontalStory : StackStory;

  return (
    <Section surface={block.surface ?? "dark"} bleed flush className="overflow-hidden">
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

function StackStory({ block }: LayoutProps) {
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const count = block.steps.length;

  useGsap(
    root,
    ({ gsap, ScrollTrigger }) => {
      const setBar = gsap.quickSetter(bar.current, "scaleX");
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: () => `+=${count * window.innerHeight * 0.55}`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          setBar(self.progress);
          setActive(Math.min(count - 1, Math.floor(self.progress * count)));
        },
      });
    },
    [count],
  );

  return (
    <div ref={root} className="flex min-h-svh items-center pt-(--header-height)">
      <div className="container-page grid items-center gap-16 py-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col items-start gap-10">
          <StoryIntro block={block} />
          <div className="flex w-full max-w-sm flex-col gap-3">
            <p aria-hidden="true" className="font-mono text-sm tracking-widest text-muted">
              <span className="text-strong">{padIndex(active)}</span> / {padIndex(count - 1)}
            </p>
            <ProgressThread thread={block.thread} barRef={bar} />
          </div>
          <StoryAction block={block} />
        </div>

        <ol className="relative min-h-[24rem]">
          {block.steps.map((step, index) => (
            <li
              key={step.body}
              className={cn(
                "absolute inset-0 flex flex-col justify-center transition-[opacity,transform] duration-500 ease-brand",
                index === active && "translate-y-0 opacity-100",
                index < active && "-translate-y-12 opacity-0",
                index > active && "translate-y-12 opacity-0",
              )}
            >
              <span aria-hidden="true" className="mb-6 font-display text-[clamp(5rem,12vw,11rem)] leading-none font-bold text-raised">
                {padIndex(index)}
              </span>
              <StepContent step={step} index={index} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function HorizontalStory({ block }: LayoutProps) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const count = block.steps.length;

  useGsap(
    root,
    ({ gsap }) => {
      const element = track.current;
      if (!element) return;
      const distance = () => Math.max(0, element.scrollWidth - window.innerWidth);
      const setBar = gsap.quickSetter(bar.current, "scaleX");
      gsap.to(element, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => setBar(self.progress),
        },
      });
    },
    [count],
  );

  return (
    <div ref={root} className="flex min-h-svh flex-col justify-center gap-14 overflow-hidden pt-(--header-height) pb-12">
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
