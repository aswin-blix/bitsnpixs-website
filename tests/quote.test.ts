import { describe, expect, it } from "vitest";
import { pages } from "@/lib/content";
import { buildQuoteMessage, emptyQuote, isQuoteComplete, quoteFromPrice, quoteGroups, quoteLines, type QuoteSelection } from "@/lib/quote";

const block = pages.quote.blocks.find((entry) => entry.type === "quote");
if (!block || block.type !== "quote") throw new Error("quote page has no quote block");
const { config } = block;

describe("quote config", () => {
  it("only references option groups that exist, each with options", () => {
    const ids = new Set(config.groups.map((group) => group.id));
    for (const service of config.services) {
      expect(service.groupIds.length).toBeGreaterThan(0);
      for (const id of service.groupIds) expect(ids, `${service.id} uses unknown group ${id}`).toContain(id);
      if (service.fromBy) {
        expect(service.groupIds).toContain(service.fromBy.groupId);
        const options = config.groups.find((group) => group.id === service.fromBy?.groupId)?.options ?? [];
        expect(Object.keys(service.fromBy.prices).sort()).toEqual([...options].sort());
      }
    }
    for (const group of config.groups) expect(group.options.length).toBeGreaterThan(1);
  });
});

describe("quote builder logic", () => {
  const vector: QuoteSelection = { serviceId: "vector", choices: {} };

  it("asks nothing and is incomplete before a service is chosen", () => {
    expect(quoteGroups(config, emptyQuote)).toEqual([]);
    expect(isQuoteComplete(config, emptyQuote)).toBe(false);
    expect(() => buildQuoteMessage(config, emptyQuote, "")).toThrow();
  });

  it("is complete only when every group for the service is answered", () => {
    const groups = quoteGroups(config, vector);
    expect(isQuoteComplete(config, vector)).toBe(false);
    const choices = Object.fromEntries(groups.map((group) => [group.id, group.options[0]]));
    expect(isQuoteComplete(config, { ...vector, choices })).toBe(true);
    const [first, ...rest] = groups;
    const partial = Object.fromEntries(rest.map((group) => [group.id, group.options[0]]));
    expect(first && isQuoteComplete(config, { ...vector, choices: partial })).toBe(false);
  });

  it("prices vector work by complexity and other services at their published price", () => {
    const serviceById = (id: string) => {
      const service = config.services.find((entry) => entry.id === id);
      if (!service) throw new Error(`no ${id} service in the quote config`);
      return service;
    };
    const vectorService = serviceById("vector");
    expect(quoteFromPrice(vectorService, { complexity: "Simple" })).toBe("$9.00");
    expect(quoteFromPrice(vectorService, { complexity: "Complex" })).toBe("$18.00");
    expect(quoteFromPrice(vectorService, {})).toBe(vectorService.from);
    expect(quoteFromPrice(serviceById("coloreel"), { anything: "x" })).toBe("$18.00");
  });

  it("builds the outgoing message from the selection, ignoring stale choices", () => {
    const selection: QuoteSelection = { serviceId: "vector", choices: { complexity: "Complex", placement: "Cap" } };
    expect(quoteLines(config, selection)).toEqual([{ label: "Artwork", value: "Complex" }]);
    const message = buildQuoteMessage(config, selection, "  Needed by Friday.  ");
    expect(message.subject).toBe("Quote request: Vector Artwork Conversion");
    expect(message.question).toContain("Artwork: Complex");
    expect(message.question).toContain("Online price from: $18.00");
    expect(message.question).not.toContain("Cap");
    expect(message.question.endsWith("Needed by Friday.")).toBe(true);
  });
});
