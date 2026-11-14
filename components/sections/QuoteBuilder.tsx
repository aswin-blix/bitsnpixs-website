"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { contactForm, type QuoteBlock } from "@/lib/content";
import { emptyContactValues, statusMessage, submitContactForm, type ContactResult, type ContactValues } from "@/lib/contact";
import { DURATION, EASE } from "@/lib/motion";
import {
  buildQuoteMessage,
  emptyQuote,
  findService,
  isQuoteComplete,
  quoteFromPrice,
  quoteGroups,
  quoteLines,
  type QuoteSelection,
} from "@/lib/quote";
import { cn, padIndex } from "@/lib/utils";

/** Contact fields asked on the last step; subject and message are generated from the brief. */
const detailFields = contactForm.fields.filter((field) => field.name !== "subject" && field.name !== "question");

const choiceClass = (active: boolean) =>
  cn(
    "rounded-2xl border px-5 py-3 text-left font-semibold transition-colors duration-300",
    active ? "border-accent bg-accent text-on-accent" : "border-line bg-surface text-strong hover:border-accent",
  );

/**
 * Three-step quote builder: service, design options, contact details. The
 * brief builds up in the summary panel and is sent through lib/contact.
 */
export function QuoteBuilder({ config, labels }: Pick<QuoteBlock, "config" | "labels">) {
  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState<QuoteSelection>(emptyQuote);
  const [values, setValues] = useState<ContactValues>(emptyContactValues);
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<ContactResult | "sending" | null>(null);

  const service = findService(config, selection);
  const groups = quoteGroups(config, selection);
  const lines = quoteLines(config, selection);
  const canContinue = step === 0 ? Boolean(service) : isQuoteComplete(config, selection);

  const chooseService = (serviceId: string) => setSelection({ serviceId, choices: {} });
  const choose = (groupId: string, option: string) =>
    setSelection((current) => ({ ...current, choices: { ...current.choices, [groupId]: option } }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step < 2) {
      if (canContinue) setStep(step + 1);
      return;
    }
    setResult("sending");
    setResult(await submitContactForm({ ...values, ...buildQuoteMessage(config, selection, notes) }));
  };

  const titles = [labels.serviceTitle, labels.optionsTitle, labels.detailsTitle];

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
              <div role="group" aria-label={labels.serviceTitle} className="grid gap-3 sm:grid-cols-2">
                {config.services.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    aria-pressed={entry.id === selection.serviceId}
                    onClick={() => chooseService(entry.id)}
                    className={cn(choiceClass(entry.id === selection.serviceId), "flex flex-col gap-2 p-6")}
                  >
                    <span className="font-display text-2xl">{entry.label}</span>
                    <span className="font-mono text-xs tracking-widest uppercase opacity-80">
                      {labels.fromLabel} {entry.from}
                    </span>
                  </button>
                ))}
              </div>
            ) : null}

            {step === 1 ? (
              <div className="flex flex-col gap-8">
                {groups.map((group) => (
                  <div key={group.id} role="group" aria-label={group.label}>
                    <p className="mb-3 font-mono text-xs tracking-[0.18em] text-muted uppercase">{group.label}</p>
                    <div className="flex flex-wrap gap-2.5">
                      {group.options.map((option) => {
                        const active = selection.choices[group.id] === option;
                        return (
                          <button key={option} type="button" aria-pressed={active} onClick={() => choose(group.id, option)} className={choiceClass(active)}>
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {step === 2 ? (
              <div className="grid gap-5 sm:grid-cols-2">
                {detailFields.map((field) => (
                  <FormField
                    key={field.name}
                    id={`quote-${field.name}`}
                    name={field.name}
                    label={field.label}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    value={values[field.name]}
                    onChange={(value) => setValues({ ...values, [field.name]: value })}
                  />
                ))}
                <FormField
                  id="quote-notes"
                  name="notes"
                  label={labels.notesLabel}
                  type="textarea"
                  required={false}
                  value={notes}
                  onChange={setNotes}
                  className="sm:col-span-2"
                />
                <p className="text-sm text-muted sm:col-span-2">{labels.artworkNote}</p>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-line pt-8">
          {step > 0 ? (
            <Button variant="secondary" withArrow={false} magnetic={false} onClick={() => setStep(step - 1)}>
              {labels.back}
            </Button>
          ) : null}
          <Button type="submit" disabled={!canContinue || result === "sending"}>
            {step < 2 ? labels.next : labels.submit}
          </Button>
          <p role="status" aria-live="polite" className="text-sm text-muted">
            {result && result !== "sending" ? statusMessage(result) : null}
          </p>
        </div>
      </div>

      <aside aria-label={labels.summaryTitle} className="h-fit rounded-card border border-accent bg-accent-soft p-7 lg:sticky lg:top-28">
        <h2 className="mb-6 font-mono text-xs tracking-[0.18em] text-accent-text uppercase">{labels.summaryTitle}</h2>
        {service ? (
          <>
            <p className="font-display text-2xl font-semibold text-strong">{service.label}</p>
            <dl className="mt-5 flex flex-col divide-y divide-line">
              {lines.map((line) => (
                <div key={line.label} className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-sm text-muted">{line.label}</dt>
                  <dd className="text-right font-semibold text-strong">{line.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-muted">{labels.fromLabel}</p>
            <p className="font-display text-5xl font-semibold tracking-tight text-strong">{quoteFromPrice(service, selection.choices)}</p>
          </>
        ) : (
          <p className="text-ink">{labels.summaryEmpty}</p>
        )}
        <p className="mt-6 border-t border-line pt-5 text-sm text-muted">{labels.priceNote}</p>
      </aside>
    </form>
  );
}
