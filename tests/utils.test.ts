import { describe, expect, it } from "vitest";
import { clamp, cn, formatDate, initials, isExternalHref, padIndex } from "@/lib/utils";

describe("utils", () => {
  it("cn joins truthy class names only", () => {
    expect(cn("a", false, undefined, ["b", null], { c: true, d: false })).toBe("a b c");
  });

  it("isExternalHref separates site paths from outbound links", () => {
    expect(isExternalHref("/contact-us")).toBe(false);
    expect(isExternalHref("#section")).toBe(false);
    expect(isExternalHref("https://www.bitsnpixs.com/shop")).toBe(true);
    expect(isExternalHref("mailto:info@bitsnpixs.com")).toBe(true);
    expect(isExternalHref("tel:+918086700015")).toBe(true);
    expect(isExternalHref("//cdn.example.com/x.js")).toBe(true);
  });

  it("formatDate is stable regardless of the machine time zone", () => {
    expect(formatDate("2026-08-25")).toBe("25 Aug 2026");
    expect(formatDate("2026-01-01")).toBe("01 Jan 2026");
  });

  it("padIndex and clamp handle boundaries", () => {
    expect(padIndex(0)).toBe("01");
    expect(padIndex(9)).toBe("10");
    expect(clamp(5, 0, 1)).toBe(1);
    expect(clamp(-5, 0, 1)).toBe(0);
    expect(clamp(0.4, 0, 1)).toBe(0.4);
  });

  it("initials takes the first and last word, skipping roman numerals", () => {
    expect(initials("David Gitman")).toBe("DG");
    expect(initials("Emil Del Rosario III")).toBe("ER");
    expect(initials("Julie")).toBe("J");
    expect(initials("  kathleen  ")).toBe("K");
    expect(initials("")).toBe("");
  });
});
