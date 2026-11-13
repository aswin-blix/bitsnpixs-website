import { describe, expect, it } from "vitest";
import { buildMailtoHref, type ContactValues } from "@/lib/contact";
import { contactForm, site } from "@/lib/content";

const values: ContactValues = {
  name: "Asha Rao",
  phone: "+91 80000 00000",
  email: "asha@example.com",
  country: "India",
  company: "Thread & Co",
  subject: "Quote for 3D puff cap logo",
  question: "Can you digitize this?\nNeeded in DST & PES.",
};

describe("contact form", () => {
  it("has a value slot for every configured field", () => {
    expect(Object.keys(values).sort()).toEqual(contactForm.fields.map((field) => field.name).sort());
  });

  it("builds a mailto link addressed to the site inbox", () => {
    const href = buildMailtoHref(values);
    expect(href.startsWith(`mailto:${site.email}?`)).toBe(true);
    const params = new URLSearchParams(href.split("?")[1]);
    expect(params.get("subject")).toBe(values.subject);
    expect(params.get("body")).toContain("Name: Asha Rao");
    expect(params.get("body")).toContain("Needed in DST & PES.");
  });

  it("encodes characters that would break the link", () => {
    const href = buildMailtoHref({ ...values, subject: "A&B?=#", question: "" });
    expect(href).not.toMatch(/subject=A&B/);
    expect(new URLSearchParams(href.split("?")[1]).get("subject")).toBe("A&B?=#");
  });
});
