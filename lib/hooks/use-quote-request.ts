"use client";

import { useState } from "react";
import { catalog, type QuoteLabels } from "@/lib/content";
import { emptyContactValues, submitContactForm, type ContactResult, type ContactValues } from "@/lib/contact";
import {
  buildQuoteMessage,
  clampQuantity,
  emptyQuote,
  findProduct,
  isQuoteComplete,
  quoteGroups,
  quoteLines,
  quotePrice,
  type QuoteSelection,
} from "@/lib/quote";

/**
 * State and actions for requesting a quote, shared by the quote builder
 * (which starts with no product) and the product page (which starts on one).
 */
export function useQuoteRequest(initialSlug: string | null, labels: QuoteLabels) {
  const [selection, setSelection] = useState<QuoteSelection>(() => emptyQuote(initialSlug));
  const [values, setValues] = useState<ContactValues>(emptyContactValues);
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<ContactResult | "sending" | null>(null);

  return {
    selection,
    values,
    notes,
    result,
    currency: catalog.currency,
    products: catalog.products,
    product: findProduct(catalog, selection),
    groups: quoteGroups(catalog, selection),
    lines: quoteLines(catalog, selection, labels.quantityLabel),
    price: quotePrice(catalog, selection),
    complete: isQuoteComplete(catalog, selection),
    setNotes,
    setValue: (name: keyof ContactValues, value: string) => setValues((current) => ({ ...current, [name]: value })),
    chooseProduct: (slug: string) => setSelection(emptyQuote(slug)),
    choose: (groupId: string, option: string) =>
      setSelection((current) => ({ ...current, choices: { ...current.choices, [groupId]: option } })),
    setQuantity: (quantity: number) => setSelection((current) => ({ ...current, quantity: clampQuantity(quantity) })),
    submit: async () => {
      setResult("sending");
      setResult(await submitContactForm({ ...values, ...buildQuoteMessage(catalog, selection, notes, labels) }));
    },
  };
}

export type QuoteRequest = ReturnType<typeof useQuoteRequest>;
