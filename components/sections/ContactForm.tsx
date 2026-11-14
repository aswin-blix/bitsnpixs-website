"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { contactForm } from "@/lib/content";
import { emptyContactValues, statusMessage, submitContactForm, type ContactResult, type ContactValues } from "@/lib/contact";

type Status = { state: "idle" } | { state: "sending" } | { state: "done"; result: ContactResult };

/** Contact form. Fields come from lib/content; delivery is handled by lib/contact. */
export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(emptyContactValues);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ state: "sending" });
    const result = await submitContactForm(values);
    setStatus({ state: "done", result });
    if (result.ok && result.via === "endpoint") setValues(emptyContactValues);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      {contactForm.fields.map((field) => (
        <FormField
          key={field.name}
          id={`contact-${field.name}`}
          name={field.name}
          label={field.label}
          type={field.type}
          autoComplete={field.autoComplete}
          value={values[field.name]}
          onChange={(value) => setValues({ ...values, [field.name]: value })}
          className={field.type === "textarea" || field.name === "subject" ? "sm:col-span-2" : undefined}
        />
      ))}

      <div className="flex flex-wrap items-center gap-5 sm:col-span-2">
        <Button type="submit" size="lg" disabled={status.state === "sending"}>
          {status.state === "sending" ? "Sending" : contactForm.submitLabel}
        </Button>
        <p role="status" aria-live="polite" className="text-sm text-muted">
          {status.state === "done" ? statusMessage(status.result) : null}
        </p>
      </div>
    </form>
  );
}
