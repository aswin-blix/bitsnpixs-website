import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { brand, DEFAULT_THEME, THEME_STORAGE_KEY, themeInitScript, type BrandColor } from "@/lib/theme";

const tokens = readFileSync(new URL("../app/styles/tokens.css", import.meta.url), "utf8");

function readToken(name: string): string | undefined {
  return tokens.match(new RegExp(`--${name}:\\s*(#[0-9a-f]{6})`, "i"))?.[1].toLowerCase();
}

describe("theme", () => {
  it.each(Object.keys(brand) as BrandColor[])("lib/theme.ts %s matches tokens.css", (key) => {
    expect(readToken(`brand-${key}`)).toBe(brand[key]);
  });

  it("defines every semantic token in both palettes", () => {
    const required = ["--surface", "--surface-raised", "--surface-sunken", "--ink", "--ink-strong", "--ink-muted", "--ink-ghost", "--line", "--accent", "--on-accent", "--accent-text", "--accent-soft", "--focus-ring"];
    const darkStart = tokens.indexOf(":root,\n[data-surface=\"dark\"],");
    const lightStart = tokens.indexOf('[data-surface="light"],\n:root[data-theme="light"]');
    expect(darkStart, "dark palette block").toBeGreaterThan(0);
    expect(lightStart, "light palette block").toBeGreaterThan(darkStart);
    const block = (start: number) => tokens.slice(start, tokens.indexOf("}", start));
    for (const token of required) {
      expect(block(darkStart), `dark palette is missing ${token}`).toContain(`${token}:`);
      expect(block(lightStart), `light palette is missing ${token}`).toContain(`${token}:`);
    }
  });

  it("restyles every surface for the light theme", () => {
    for (const selector of [':root[data-theme="light"]', '[data-theme="light"] [data-surface="dark"]', '[data-theme="light"] [data-surface="tint"]']) {
      expect(tokens).toContain(selector);
    }
  });
});

describe("theme start-up script", () => {
  it("is valid JavaScript that reads the saved theme and falls back to the default", () => {
    expect(() => new Function(themeInitScript)).not.toThrow();
    expect(themeInitScript).toContain(JSON.stringify(THEME_STORAGE_KEY));
    expect(themeInitScript).toContain(JSON.stringify(DEFAULT_THEME));
    expect(["system", "dark", "light"]).toContain(DEFAULT_THEME);
  });

  function run(saved: string | null, prefersLight: boolean) {
    const html = { dataset: {} as Record<string, string> };
    const sandbox = new Function("localStorage", "matchMedia", "document", themeInitScript);
    sandbox({ getItem: () => saved }, () => ({ matches: prefersLight }), { documentElement: html });
    return html.dataset.theme;
  }

  it("uses a saved choice first, then the device setting", () => {
    expect(run("light", false)).toBe("light");
    expect(run("dark", true)).toBe("dark");
    expect(run(null, true)).toBe(DEFAULT_THEME === "system" ? "light" : DEFAULT_THEME);
    expect(run("bogus", false)).toBe(DEFAULT_THEME === "system" ? "dark" : DEFAULT_THEME);
  });
});
