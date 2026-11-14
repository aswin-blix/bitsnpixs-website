"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { ChoiceChip } from "@/components/ui/ChoiceChip";
import type { QuoteLabels } from "@/lib/content";
import { useQuoteRequest } from "@/lib/hooks/use-quote-request";
import { DURATION, EASE } from "@/lib/motion";
import { formatPrice } from "@/lib/quote";
import { cn, padIndex } from "@/lib/utils";
import { QuoteDetails, QuoteOptions, QuoteStatus, QuoteSummary } from "./QuoteParts";

const ID_PREFIX = "quote";

/**
 * Three-step quote builder: product, design options, contact details. The
 * brief builds up in the summary panel and is sent through lib/contact.
 */
export function QuoteBuilder({ labels }: { labels: QuoteLabels }) {
  const request = useQuoteRequest(null, labels);
  const [step, setStep] = useState(0);
  const canContinue = step === 0 ? Boolean(request.product) : request.complete;
  const titles = [labels.productTitle, labels.optionsTitle, labels.detailsTitle];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step === 2) void request.submit();
    else if (canContinue) setStep(step + 1);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
      <div className="rounded-card border border-line bg-raised p-6 sm:p-10">
        <ol className="mb-10 flex items-center gap-3">
          {labels.steps.map((label, index) => (
            <li key={label} aria-current={index === step ? "step" : undefined} className="flex flex-1 items-center gap-3">
              <span
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-control border font-mono text-xs transition-colors duration-300",
                  index <= step ? "border-accent bg-accent text-on-accent" : "border-line text-muted",
                )}
              >
                {padIndex(index)}
              </span>
              <span className={cn("hidden text-sm font-semibold sm:block", index <= step ? "text-strong" : "text-muted")}>{label}</span>
              {index < labels.steps.length - 1 ? (
                <span aria-hidden="true" className={cn("stitch-x flex-1", index < step ? "text-accent" : "text-muted opacity-40")} />
              ) : null}
            </li>
          ))}
        </ol>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0, transition: { duration: DURATION.fast, ease: EASE.out } }}
            exit={{ opacity: 0, x: -24, transition: { duration: 0.18 } }}
          >
            <h2 className="mb-8 text-3xl font-semibold sm:text-4xl">{titles[step]}</h2>

            {step === 0 ? (
              <div role="group" aria-label={labels.productTitle} className="grid gap-3 sm:grid-cols-2">
                {request.products.map((product) => (
                  <ChoiceChip
                    key={product.slug}
                    selected={product.slug === request.selection.productSlug}
                    onSelect={() => request.chooseProduct(product.slug)}
                    className="flex flex-col gap-2 p-6"
                  >
                    <span className="font-display text-2xl">{product.name}</span>
                    <span className="font-mono text-xs tracking-widest uppercase opacity-80">
                      {labels.priceLabel} {formatPrice(product.price, request.currency)}
                    </span>
                  </ChoiceChip>
                ))}
              </div>
            ) : null}
            {step === 1 ? <QuoteOptions request={request} labels={labels} idPrefix={ID_PREFIX} /> : null}
            {step === 2 ? <QuoteDetails request={request} labels={labels} idPrefix={ID_PREFIX} /> : null}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-line pt-8">
          {step > 0 ? (
            <Button variant="secondary" withArrow={false} magnetic={false} onClick={() => setStep(step - 1)}>
              {labels.back}
            </Button>
          ) : null}
          <Button type="submit" disabled={!canContinue || request.result === "sending"}>
            {step < 2 ? labels.next : labels.submit}
          </Button>
          <QuoteStatus request={request} />
        </div>
      </div>

      <aside aria-label={labels.summaryTitle} className="h-fit rounded-card border border-accent bg-accent-soft p-7 lg:sticky lg:top-28">
        <QuoteSummary request={request} labels={labels} />
      </aside>
    </form>
  );
}
