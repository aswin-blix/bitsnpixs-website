"use client";

import { useInView } from "framer-motion";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import type { DigitizerContent } from "@/lib/content";
import { useElementWidth } from "@/lib/hooks/use-element-width";
import { MEDIA, useMediaQuery } from "@/lib/hooks/use-media-query";
import { shadeHex } from "@/lib/stitch/color";
import { countStitches, generateStitches, SEGMENT_SIZE, type StitchKind } from "@/lib/stitch/engine";
import { rasterizeText } from "@/lib/stitch/rasterize";
import { STITCH_THREADS, type ThreadToken } from "@/lib/stitch/threads";
import { cn } from "@/lib/utils";

const MAX_DPR = 2;
/** Seconds a full sew-out takes, whatever the stitch count. */
const SEW_SECONDS = 2.6;
const MAX_LETTERS = 14;
const LINE_WIDTH: Record<StitchKind, number> = { satin: 1.5, fill: 1.4, run: 1.8 };

interface StitchPadProps {
  content: DigitizerContent;
  /** "full" is the wide Stitch Lab version; "compact" fits beside the hero headline. */
  size?: "compact" | "full";
  className?: string;
}

/**
 * The live digitizer: whatever the visitor types is "embroidered" on a canvas,
 * stitch by stitch, with a needle that follows the thread. Stitch geometry
 * comes from lib/stitch/engine; thread colours are theme tokens.
 */
export function StitchPad({ content, size = "compact", className }: StitchPadProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const needleRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  const [text, setText] = useState(content.defaultText);
  const [kind, setKind] = useState<StitchKind>(content.kinds[0].id);
  const [thread, setThread] = useState<ThreadToken>(STITCH_THREADS[0].token);
  const [replay, setReplay] = useState(0);

  const word = useDeferredValue(text.trim() || content.defaultText);
  const width = useElementWidth(frameRef);
  const inView = useInView(frameRef, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useMediaQuery(MEDIA.reducedMotion);

  useEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    const needle = needleRef.current;
    const counter = countRef.current;
    if (!frame || !canvas || !needle || !counter || !inView || width === 0) return;

    let animation = 0;
    let cancelled = false;

    const sew = () => {
      if (cancelled) return;
      const height = frame.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      const context = canvas.getContext("2d");
      if (!context) return;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.lineCap = "round";
      context.lineWidth = LINE_WIDTH[kind];

      const styles = getComputedStyle(frame);
      const base = styles.getPropertyValue(thread).trim();
      // Three shades of the same thread give the sheen of real embroidery.
      const shades = [shadeHex(base, 0.22), base, shadeHex(base, -0.2)];

      const segments = generateStitches(rasterizeText(word, styles.fontFamily, width, height), kind);
      const total = countStitches(segments);
      const perFrame = reduced ? total : Math.max(4, Math.ceil(total / (SEW_SECONDS * 60)));
      let sewn = 0;

      const step = () => {
        const until = Math.min(total, sewn + perFrame);
        for (let index = sewn; index < until; index += 1) {
          const at = index * SEGMENT_SIZE;
          context.strokeStyle = shades[index % shades.length];
          context.beginPath();
          context.moveTo(segments[at], segments[at + 1]);
          context.lineTo(segments[at + 2], segments[at + 3]);
          context.stroke();
        }
        sewn = until;
        counter.textContent = sewn.toLocaleString("en-US");

        const done = sewn >= total;
        if (sewn > 0) {
          const last = (sewn - 1) * SEGMENT_SIZE;
          needle.style.transform = `translate3d(${segments[last + 2]}px, ${segments[last + 3]}px, 0)`;
        }
        needle.style.opacity = done ? "0" : "1";
        if (!done) animation = requestAnimationFrame(step);
      };
      step();
    };

    // Wait for the display font so the first sew-out uses the right letterforms.
    document.fonts.ready.then(sew);

    return () => {
      cancelled = true;
      cancelAnimationFrame(animation);
    };
  }, [word, kind, thread, replay, width, inView, reduced]);

  return (
    <div className={cn("rounded-card border border-line bg-raised/85 p-4 backdrop-blur-sm sm:p-6", className)}>
      <div
        ref={frameRef}
        className={cn(
          "fabric-weave relative overflow-hidden rounded-media border border-line bg-sunken font-display",
          size === "full" ? "aspect-[16/10] sm:aspect-[16/6]" : "aspect-[16/10]",
        )}
      >
        <canvas ref={canvasRef} role="img" aria-label={`Embroidery simulation of "${word}"`} className="absolute inset-0 size-full" />
        <span
          ref={needleRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 -mt-7 -ml-px h-7 w-0.5 rounded-full bg-strong opacity-0 transition-opacity duration-300"
        />
        <p className="absolute top-3 left-4 font-mono text-[0.65rem] tracking-[0.18em] text-muted uppercase">
          {content.countLabel}{" "}
          <span ref={countRef} className="text-accent-text tabular-nums">
            0
          </span>
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-end gap-4">
        <label className="min-w-0 flex-1">
          <span className="mb-2 block font-mono text-[0.65rem] tracking-[0.18em] text-muted uppercase">{content.inputLabel}</span>
          <input
            type="text"
            value={text}
            maxLength={MAX_LETTERS}
            spellCheck={false}
            autoComplete="off"
            onChange={(event) => setText(event.target.value)}
            className="w-full rounded-2xl border border-line bg-surface px-4 py-3 font-display text-xl font-semibold text-strong transition-colors duration-200 hover:border-accent focus:border-accent focus:outline-2 focus:outline-(--focus-ring)"
          />
        </label>
        <Button variant="secondary" size="md" withArrow={false} magnetic={false} onClick={() => setReplay((count) => count + 1)}>
          {content.replayLabel}
        </Button>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <SegmentedControl legend={content.kindLabel} options={content.kinds} value={kind} onChange={setKind} />
        <div role="group" aria-label={content.threadLabel} className="flex items-center gap-2">
          {STITCH_THREADS.map((spool) => (
            <button
              key={spool.token}
              type="button"
              aria-label={spool.label}
              aria-pressed={spool.token === thread}
              onClick={() => setThread(spool.token)}
              style={{ backgroundColor: `var(${spool.token})` }}
              className="size-8 rounded-full border-2 border-surface outline-2 outline-transparent transition-[outline-color,transform] duration-200 hover:scale-110 aria-pressed:outline-(--accent-text)"
            />
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">{content.note}</p>
    </div>
  );
}
