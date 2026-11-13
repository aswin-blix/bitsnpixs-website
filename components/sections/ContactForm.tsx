"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { contactForm } from "@/lib/content";
import { submitContactForm, type ContactResult, type ContactValues } from "@/lib/contact";

const inputClass =
  "w-full rounded-2xl border border-line bg-surface px-4 py-3 text-strong placeholder:text-muted transition-colors duration-200 hover:border-accent focus:border-accent focus:outline-2 focus:outline-(--focus-ring)";

const emptyValues = Object.fromEntries(contactForm.fields.map((field) => [field.name, ""])) as ContactValues;

type Status = { state: "idle" } | { state: "sending" } | { state: "done"; result: ContactResult };

const statusMessage = (result: ContactResult): string => {
  if (!result.ok) return result.message;
  return result.via === "email"
    ? "Your email app has opened with the message ready to send."
    : "Thank you. Your message has been sent and we will get back to you.";
};

/** Contact form. Fields come from lib/content; delivery is handled by lib/contact. */
export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(emptyValues);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ state: "sending" });
    const result = await submitContactForm(values);
    setStatus({ state: "done", result });
    if (result.ok && result.via === "endpoint") setValues(emptyValues);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      {contactForm.fields.map((field) => {
        const id = `contact-${field.name}`;
        const shared = {
          id,
          name: field.name,
          required: true,
          autoComplete: field.autoComplete,
          value: values[field.name],
          className: inputClass,
        };
        const isArea = field.type === "textarea";
        return (
          <div key={field.name} className={isArea || field.name === "subject" ? "sm:col-span-2" : undefined}>
            <label htmlFor={id} className="mb-2 block text-sm font-semibold text-strong">
              {field.label} <span aria-hidden="true" className="text-accent-text">*</span>
            </label>
            {isArea ? (
              <textarea {...shared} rows={5} onChange={(event) => setValues({ ...values, [field.name]: event.target.value })} />
            ) : (
              <input {...shared} type={field.type} onChange={(event) => setValues({ ...values, [field.name]: event.target.value })} />
            )}
          </div>
        );
      })}

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
