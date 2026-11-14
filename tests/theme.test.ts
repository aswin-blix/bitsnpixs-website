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

  it("defines every semantic token for the light surface as well as the dark default", () => {
    const required = ["--surface", "--surface-raised", "--ink", "--ink-strong", "--ink-muted", "--line", "--accent", "--on-accent", "--accent-text", "--focus-ring"];
    const light = tokens.slice(tokens.indexOf('[data-surface="light"] {'));
    const dark = tokens.slice(tokens.indexOf(":root,\n[data-surface=\"dark\"]"), tokens.indexOf('[data-surface="light"] {'));
    for (const token of required) {
      expect(light, `light surface is missing ${token}`).toContain(`${token}:`);
      expect(dark, `dark surface is missing ${token}`).toContain(`${token}:`);
    }
  });
});
