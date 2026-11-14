"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import type { QuoteLabels } from "@/lib/content";
import { useQuoteRequest } from "@/lib/hooks/use-quote-request";
import { DURATION, EASE } from "@/lib/motion";
import { QuoteDetails, QuoteOptions, QuotePriceTag, QuoteStatus, QuoteSummary } from "./QuoteParts";

interface ProductConfiguratorProps {
  productSlug: string;
  labels: QuoteLabels;
}

/**
 * Ordering panel on a product page. Step one configures the product and shows
 * its live price; step two collects contact details and sends the order as a
 * quote request. There is no cart or payment: the site is frontend-only.
 */
export function ProductConfigurator({ productSlug, labels }: ProductConfiguratorProps) {
  const request = useQuoteRequest(productSlug, labels);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const idPrefix = `order-${productSlug}`;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!request.complete) return;
    if (detailsOpen) void request.submit();
    else setDetailsOpen(true);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-card border border-line bg-raised p-6 sm:p-8">
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
                <h2 className="mb-6 text-2xl font-semibold sm:text-3xl">{labels.detailsTitle}</h2>
                <QuoteDetails request={request} labels={labels} idPrefix={idPrefix} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              <QuoteOptions request={request} labels={labels} idPrefix={idPrefix} />
              <div className="border-t border-line pt-6">
                <QuotePriceTag request={request} labels={labels} />
                <p className="mt-3 text-sm text-muted">{labels.priceNote}</p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        {detailsOpen ? (
          <Button variant="secondary" withArrow={false} magnetic={false} onClick={() => setDetailsOpen(false)}>
            {labels.back}
          </Button>
        ) : null}
        <Button type="submit" size="lg" disabled={!request.complete || request.result === "sending"}>
          {detailsOpen ? labels.submit : labels.request}
        </Button>
        <QuoteStatus request={request} />
      </div>
    </form>
  );
}
