"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { productsLabels, type QuoteLabels } from "@/lib/content";
import { useQuoteRequest } from "@/lib/hooks/use-quote-request";
import { DURATION, EASE } from "@/lib/motion";
import { cn, padIndex } from "@/lib/utils";
import { QuoteDetails, QuoteOptions, QuotePriceTag, QuoteStatus, QuoteSummary } from "./QuoteParts";

interface ProductConfiguratorProps {
  productSlug: string;
  labels: QuoteLabels;
}

/**
 * Ordering panel on a product page. Step one configures the product; step two
 * collects contact details and sends the order as a quote request (the site
 * is frontend-only: no cart or payment). The price and action bar stays in
 * view at the bottom of the panel while the visitor scrolls the options.
 */
export function ProductConfigurator({ productSlug, labels }: ProductConfiguratorProps) {
  const request = useQuoteRequest(productSlug, labels);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const idPrefix = `order-${productSlug}`;
  const steps = [productsLabels.configureStep, productsLabels.detailsStep];
  const activeStep = detailsOpen ? 1 : 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!request.complete) return;
    if (detailsOpen) void request.submit();
    else setDetailsOpen(true);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-card border border-line bg-raised">
      <ol className="flex items-center gap-3 border-b border-line px-6 py-4 sm:px-8">
        {steps.map((step, index) => (
          <li key={step} aria-current={index === activeStep ? "step" : undefined} className="flex items-center gap-3">
            <span
              className={cn(
                "grid size-7 place-items-center rounded-control font-mono text-[0.65rem] transition-colors duration-300",
                index <= activeStep ? "bg-accent text-on-accent" : "border border-line text-muted",
              )}
            >
              {padIndex(index)}
            </span>
            <span className={cn("text-sm font-semibold", index <= activeStep ? "text-strong" : "text-muted")}>{step}</span>
            {index < steps.length - 1 ? <span aria-hidden="true" className="stitch-x w-10 text-muted opacity-50" /> : null}
          </li>
        ))}
      </ol>

      <div className="p-6 sm:p-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={detailsOpen ? "details" : "options"}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0, transition: { duration: DURATION.fast, ease: EASE.out } }}
            exit={{ opacity: 0, x: -24, transition: { duration: 0.18 } }}
          >
            {detailsOpen ? (
              <div className="flex flex-col gap-8">
                <div className="rounded-2xl border border-accent bg-accent-soft p-6">
                  <QuoteSummary request={request} labels={labels} />
                </div>
                <div>
                  <h2 className="mb-6 text-2xl font-semibold">{labels.detailsTitle}</h2>
                  <QuoteDetails request={request} labels={labels} idPrefix={idPrefix} />
                </div>
              </div>
            ) : (
              <QuoteOptions request={request} labels={labels} idPrefix={idPrefix} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="sticky bottom-0 z-10 rounded-b-card border-t border-line bg-raised/95 px-5 py-4 backdrop-blur-md sm:px-8 sm:py-5">
        <div className="flex items-center justify-between gap-4">
          {detailsOpen ? (
            <Button variant="secondary" withArrow={false} magnetic={false} onClick={() => setDetailsOpen(false)}>
              {labels.back}
            </Button>
          ) : (
            <QuotePriceTag request={request} labels={labels} compact />
          )}
          <Button type="submit" disabled={!request.complete || request.result === "sending"}>
            {detailsOpen ? labels.submit : labels.request}
          </Button>
        </div>
        <div className="mt-2 flex flex-wrap justify-between gap-x-4 gap-y-1">
          {detailsOpen ? null : request.complete ? (
            <p className="hidden text-xs text-muted sm:block">{labels.priceNote}</p>
          ) : (
            <p className="text-xs text-muted">
              {labels.chooseAll}{" "}
              <span className="font-mono text-accent-text">
                {request.answered}/{request.groups.length}
              </span>
            </p>
          )}
          <QuoteStatus request={request} />
        </div>
      </div>
    </form>
  );
}
