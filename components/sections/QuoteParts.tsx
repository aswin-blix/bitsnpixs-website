import { ChoiceChip } from "@/components/ui/ChoiceChip";
import { FormField } from "@/components/ui/FormField";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { contactForm, type QuoteLabels } from "@/lib/content";
import { statusMessage } from "@/lib/contact";
import type { QuoteRequest } from "@/lib/hooks/use-quote-request";
import { formatPrice, MAX_QUANTITY, MIN_QUANTITY } from "@/lib/quote";
import { cn } from "@/lib/utils";

/**
 * Building blocks shared by the quote builder and the product configurator.
 * Each takes the object returned by useQuoteRequest.
 */

interface PartProps {
  request: QuoteRequest;
  labels: QuoteLabels;
  /** Prefix for field ids, so two forms can share a page. */
  idPrefix: string;
}

/** Contact fields asked for a quote; subject and message are generated from the brief. */
const detailFields = contactForm.fields.filter((field) => field.name !== "subject" && field.name !== "question");

/** Option groups for the chosen product, plus quantity. */
export function QuoteOptions({ request, labels, idPrefix }: PartProps) {
  return (
    <div className="flex flex-col gap-6">
      {request.groups.map((group) => {
        const chosen = group.options.find((option) => option.label === request.selection.choices[group.id]);
        return (
          <div key={group.id} role="group" aria-label={group.label}>
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">{group.label}</p>
              <p aria-live="polite" className="truncate text-right text-sm text-ink">
                {chosen ? (chosen.hint ?? chosen.label) : null}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.options.map((option) => (
                <ChoiceChip key={option.label} size="md" selected={option === chosen} onSelect={() => request.choose(group.id, option.label)}>
                  {option.label}
                  {option.extra ? <span className="ml-1.5 font-mono text-xs opacity-75">+{formatPrice(option.extra, request.currency)}</span> : null}
                </ChoiceChip>
              ))}
            </div>
          </div>
        );
      })}
      <QuantityStepper
        id={`${idPrefix}-quantity`}
        label={labels.quantityLabel}
        value={request.selection.quantity}
        min={MIN_QUANTITY}
        max={MAX_QUANTITY}
        onChange={request.setQuantity}
      />
    </div>
  );
}

/** Name, email and the rest, plus free-text notes. */
export function QuoteDetails({ request, labels, idPrefix }: PartProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {detailFields.map((field) => (
        <FormField
          key={field.name}
          id={`${idPrefix}-${field.name}`}
          name={field.name}
          label={field.label}
          type={field.type}
          autoComplete={field.autoComplete}
          value={request.values[field.name]}
          onChange={(value) => request.setValue(field.name, value)}
        />
      ))}
      <FormField
        id={`${idPrefix}-notes`}
        name="notes"
        label={labels.notesLabel}
        type="textarea"
        required={false}
        value={request.notes}
        onChange={request.setNotes}
        className="sm:col-span-2"
      />
      <p className="text-sm text-muted sm:col-span-2">{labels.artworkNote}</p>
    </div>
  );
}

/** Price for the current selection, with the crossed-out price when there is one. */
export function QuotePriceTag({ request, labels, compact }: Pick<PartProps, "request" | "labels"> & { compact?: boolean }) {
  if (!request.price) return null;
  return (
    <div>
      <p className={cn("text-muted", compact ? "text-xs" : "text-sm")}>{labels.priceLabel}</p>
      <p aria-live="polite" className="flex flex-wrap items-baseline gap-x-3">
        <span className={cn("font-display font-semibold tracking-tight text-strong tabular-nums", compact ? "text-2xl sm:text-3xl" : "text-5xl")}>
          {formatPrice(request.price.total, request.currency)}
        </span>
        {request.price.compareTotal ? (
          <s className="text-lg text-muted">
            <span className="sr-only">Previously </span>
            {formatPrice(request.price.compareTotal, request.currency)}
          </s>
        ) : null}
      </p>
    </div>
  );
}

/** The brief so far: product, chosen options and price. */
export function QuoteSummary({ request, labels }: Pick<PartProps, "request" | "labels">) {
  return (
    <>
      <h2 className="mb-6 font-mono text-xs tracking-[0.18em] text-accent-text uppercase">{labels.summaryTitle}</h2>
      {request.product ? (
        <>
          <p className="font-display text-2xl font-semibold text-strong">{request.product.name}</p>
          <dl className="mt-5 mb-6 flex flex-col divide-y divide-line">
            {request.lines.map((line) => (
              <div key={line.label} className="flex items-baseline justify-between gap-4 py-3">
                <dt className="text-sm text-muted">{line.label}</dt>
                <dd className="text-right font-semibold text-strong">{line.value}</dd>
              </div>
            ))}
          </dl>
          <QuotePriceTag request={request} labels={labels} />
        </>
      ) : (
        <p className="text-ink">{labels.summaryEmpty}</p>
      )}
      <p className="mt-6 border-t border-line pt-5 text-sm text-muted">{labels.priceNote}</p>
    </>
  );
}

/** Live region that reports the outcome of a submission. */
export function QuoteStatus({ request }: Pick<PartProps, "request">) {
  return (
    <p role="status" aria-live="polite" className="text-sm text-muted">
      {request.result && request.result !== "sending" ? statusMessage(request.result) : null}
    </p>
  );
}
