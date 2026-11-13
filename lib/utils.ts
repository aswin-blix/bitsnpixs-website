import { clsx, type ClassValue } from "clsx";

/** Join conditional class names. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/** True for links that leave the site (absolute URLs, mailto:, tel:). */
export function isExternalHref(href: string): boolean {
  return /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href);
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** Format an ISO date (YYYY-MM-DD) as "25 Aug 2026". */
export function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(`${isoDate}T00:00:00Z`));
}

/** Zero-padded step label: 1 -> "01". */
export function padIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
