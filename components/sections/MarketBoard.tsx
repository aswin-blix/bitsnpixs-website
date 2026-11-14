"use client";

import type { Market, TurnaroundOption } from "@/lib/content";
import { useNow } from "@/lib/hooks/use-now";
import { deliveryWindow, formatClock, formatDayClock } from "@/lib/time";

interface MarketBoardProps {
  markets: Market[];
  options: TurnaroundOption[];
  clockTitle: string;
  deliveryTitle: string;
  deliveryNote: string;
}

const PENDING = "--:--";

/**
 * Live local times for each market, and when an order placed right now would
 * be ready, in the visitor's own time zone. Renders placeholders until the
 * client clock is available.
 */
export function MarketBoard({ markets, options, clockTitle, deliveryTitle, deliveryNote }: MarketBoardProps) {
  const now = useNow();

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-card border border-line bg-raised p-7">
        <h3 className="mb-5 font-mono text-xs tracking-[0.18em] text-accent-text uppercase">{clockTitle}</h3>
        <ul className="flex flex-col divide-y divide-line">
          {markets.map((market) => (
            <li key={market.id} className="flex items-baseline justify-between gap-4 py-3">
              <span className="text-strong">
                {market.city} <span className="text-sm text-muted">{market.country}</span>
              </span>
              <span className="font-mono text-lg text-strong tabular-nums">{now ? formatClock(now, market.timeZone) : PENDING}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-card border border-accent bg-accent-soft p-7">
        <h3 className="mb-5 font-mono text-xs tracking-[0.18em] text-accent-text uppercase">{deliveryTitle}</h3>
        <ul className="flex flex-col gap-6">
          {options.map((option) => {
            const delivery = now ? deliveryWindow(now, option.hours) : null;
            const sameMoment = option.hours[0] === option.hours[1];
            return (
              <li key={option.id}>
                <p className="text-sm text-muted">
                  {option.label} ({option.time})
                </p>
                <p className="font-display text-3xl font-semibold text-strong tabular-nums sm:text-4xl">
                  {delivery ? formatDayClock(delivery.from) : PENDING}
                  {delivery && !sameMoment ? <span className="text-muted"> to {formatDayClock(delivery.to)}</span> : null}
                </p>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-sm text-muted">{deliveryNote}</p>
      </div>
    </div>
  );
}
