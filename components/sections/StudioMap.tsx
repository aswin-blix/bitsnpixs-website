"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { Studio } from "@/lib/content";
import { cn } from "@/lib/utils";

const VIEW = { width: 300, height: 420, padding: 44 };

/** Projects each studio's coordinates into the schematic's box (north up). */
function project(studios: Studio[]) {
  const lats = studios.map((studio) => studio.lat);
  const lngs = studios.map((studio) => studio.lng);
  const [minLat, maxLat] = [Math.min(...lats), Math.max(...lats)];
  const [minLng, maxLng] = [Math.min(...lngs), Math.max(...lngs)];
  const spanX = VIEW.width - VIEW.padding * 2;
  const spanY = VIEW.height - VIEW.padding * 2;
  return studios.map((studio) => ({
    id: studio.id,
    x: VIEW.padding + ((studio.lng - minLng) / (maxLng - minLng || 1)) * spanX,
    y: VIEW.padding + (1 - (studio.lat - minLat) / (maxLat - minLat || 1)) * spanY,
  }));
}

/**
 * The studio route: every office as a node on one stitched line. Selecting a
 * studio in the list highlights its node; the schematic itself is decorative.
 */
export function StudioMap({ studios }: { studios: Studio[] }) {
  const [activeId, setActiveId] = useState(studios[0].id);
  const points = project(studios);
  const route = points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`).join(" ");

  return (
    <div className="grid gap-8 sm:grid-cols-[0.8fr_1.2fr] sm:items-center">
      <svg viewBox={`0 0 ${VIEW.width} ${VIEW.height}`} aria-hidden="true" className="pixel-grid mx-auto h-auto w-full max-w-64 rounded-card border border-line">
        <path d={route} fill="none" stroke="var(--accent)" strokeWidth={2.5} strokeDasharray="9 7" strokeLinecap="round" />
        {points.map((point) => {
          const active = point.id === activeId;
          return (
            <g key={point.id} transform={`translate(${point.x} ${point.y})`}>
              <rect
                x={-9}
                y={-9}
                width={18}
                height={18}
                className={cn("origin-center rotate-45 transition-transform duration-500 ease-brand [transform-box:fill-box]", active && "scale-150")}
                fill={active ? "var(--accent)" : "var(--surface)"}
                stroke="var(--ink-strong)"
                strokeWidth={2}
              />
            </g>
          );
        })}
      </svg>

      <ul className="flex flex-col gap-3">
        {studios.map((studio) => {
          const active = studio.id === activeId;
          return (
            <li key={studio.id}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => setActiveId(studio.id)}
                onPointerEnter={() => setActiveId(studio.id)}
                className={cn(
                  "flex w-full gap-4 rounded-2xl border p-5 text-left transition-[border-color,background-color] duration-300",
                  active ? "border-accent bg-accent-soft" : "border-line bg-raised hover:border-accent",
                )}
              >
                <Icon name="pin" className="mt-1 shrink-0 text-accent-text" />
                <span className="flex flex-col gap-1">
                  <span className="font-mono text-[0.65rem] tracking-widest text-accent-text uppercase">{studio.kind}</span>
                  <span className="font-display text-xl font-semibold text-strong">{studio.city}</span>
                  <span className="text-sm text-muted">{studio.address}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
