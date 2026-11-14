import type { QuoteConfig, QuoteService } from "@/lib/content";

/** What the visitor has chosen so far in the quote builder. */
export interface QuoteSelection {
  serviceId: string | null;
  /** groupId -> chosen option. */
  choices: Record<string, string>;
}

export const emptyQuote: QuoteSelection = { serviceId: null, choices: {} };

export function findService(config: QuoteConfig, selection: QuoteSelection): QuoteService | undefined {
  return config.services.find((service) => service.id === selection.serviceId);
}

/** Option groups to ask for the selected service, in order. */
export function quoteGroups(config: QuoteConfig, selection: QuoteSelection) {
  const service = findService(config, selection);
  if (!service) return [];
  return service.groupIds.flatMap((id) => config.groups.filter((group) => group.id === id));
}

/** The published online price for the selection (may depend on one choice). */
export function quoteFromPrice(service: QuoteService, choices: Record<string, string>): string {
  const dependent = service.fromBy && service.fromBy.prices[choices[service.fromBy.groupId]];
  return dependent ?? service.from;
}

/** True once a service is picked and every one of its option groups is answered. */
export function isQuoteComplete(config: QuoteConfig, selection: QuoteSelection): boolean {
  const groups = quoteGroups(config, selection);
  return Boolean(findService(config, selection)) && groups.every((group) => group.id in selection.choices);
}

/** Label/value rows for the summary panel and the outgoing message. */
export function quoteLines(config: QuoteConfig, selection: QuoteSelection): { label: string; value: string }[] {
  return quoteGroups(config, selection)
    .filter((group) => selection.choices[group.id])
    .map((group) => ({ label: group.label, value: selection.choices[group.id] }));
}

/** Subject and body of the quote request sent through the contact pipeline. */
export function buildQuoteMessage(config: QuoteConfig, selection: QuoteSelection, notes: string): { subject: string; question: string } {
  const service = findService(config, selection);
  if (!service) throw new Error("Cannot build a quote message without a service");
  const lines = quoteLines(config, selection).map((line) => `${line.label}: ${line.value}`);
  const body = [`Service: ${service.label}`, ...lines, `Online price from: ${quoteFromPrice(service, selection.choices)}`];
  if (notes.trim()) body.push("", notes.trim());
  return { subject: `Quote request: ${service.label}`, question: body.join("\n") };
}
