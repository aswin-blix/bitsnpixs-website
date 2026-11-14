import { contactForm, site, type ContactFieldName } from "@/lib/content";

export type ContactValues = Record<ContactFieldName, string>;

export type ContactResult = { ok: true; via: "endpoint" | "email" } | { ok: false; message: string };

export const emptyContactValues = Object.fromEntries(contactForm.fields.map((field) => [field.name, ""])) as ContactValues;

/** What to tell the visitor after a submission. */
export function statusMessage(result: ContactResult): string {
  if (!result.ok) return result.message;
  return result.via === "email"
    ? "Your email app has opened with the message ready to send."
    : "Thank you. Your message has been sent and we will get back to you.";
}

/**
 * Where contact form submissions go. Set NEXT_PUBLIC_CONTACT_ENDPOINT to a URL
 * that accepts a JSON POST (a form service or your own API route). Without it,
 * the form opens the visitor's email app with the message pre-filled.
 */
const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

/** Builds the mailto: link used as the no-backend fallback. */
export function buildMailtoHref(values: ContactValues): string {
  const body = [
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    `Email: ${values.email}`,
    `Country: ${values.country}`,
    `Company: ${values.company}`,
    "",
    values.question,
  ].join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
}

export async function submitContactForm(values: ContactValues): Promise<ContactResult> {
  if (!endpoint) {
    window.location.href = buildMailtoHref(values);
    return { ok: true, via: "email" };
  }
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(values),
    });
    if (!response.ok) return { ok: false, message: `The message could not be sent (error ${response.status}).` };
    return { ok: true, via: "endpoint" };
  } catch {
    return { ok: false, message: "The message could not be sent. Please check your connection and try again." };
  }
}
