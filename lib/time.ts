/** Time helpers for the worldwide section. Pure, so they are unit tested. */

const HOUR_MS = 60 * 60 * 1000;

/** When an order placed at `now` is ready, for a turnaround of [min, max] hours. */
export function deliveryWindow(now: Date, hours: readonly [number, number]): { from: Date; to: Date } {
  const [min, max] = hours;
  return { from: new Date(now.getTime() + min * HOUR_MS), to: new Date(now.getTime() + max * HOUR_MS) };
}

/** "14:05" in the given IANA time zone (or the visitor's zone when omitted). */
export function formatClock(date: Date, timeZone?: string, locale = "en-GB"): string {
  return new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", hour12: false, timeZone }).format(date);
}

/** "Tue 14:05" in the given time zone (or the visitor's zone when omitted). */
export function formatDayClock(date: Date, timeZone?: string, locale = "en-GB"): string {
  const day = new Intl.DateTimeFormat(locale, { weekday: "short", timeZone }).format(date);
  return `${day} ${formatClock(date, timeZone, locale)}`;
}
