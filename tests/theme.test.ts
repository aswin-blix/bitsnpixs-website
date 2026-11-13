import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { brand, type BrandColor } from "@/lib/theme";

const tokens = readFileSync(new URL("../app/styles/tokens.css", import.meta.url), "utf8");

function readToken(name: string): string | undefined {
  return tokens.match(new RegExp(`--${name}:\\s*(#[0-9a-f]{6})`, "i"))?.[1].toLowerCase();
}

describe("theme", () => {
  it.each(Object.keys(brand) as BrandColor[])("lib/theme.ts %s matches tokens.css", (key) => {
    expect(readToken(`brand-${key}`)).toBe(brand[key]);
  });

  it("defines every semantic token for the dark surface", () => {
    const dark = tokens.slice(tokens.indexOf('[data-surface="dark"]'));
    for (const token of ["--surface", "--ink", "--ink-strong", "--line", "--accent", "--accent-text", "--focus-ring"]) {
      expect(dark, `dark surface is missing ${token}`).toContain(`${token}:`);
    }
  });
});
