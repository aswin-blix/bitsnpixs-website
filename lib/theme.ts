/**
 * Brand values for the few places that cannot read CSS variables: the
 * <meta name="theme-color">, the generated Open Graph image and the WebGL
 * fallback colours. tests/theme.test.ts fails if these drift from
 * app/styles/tokens.css, so tokens.css stays the source of truth.
 */
export const brand = {
  primary: "#6faf2b",
  tint: "#aedf7b",
  slate: "#454d50",
  ink: "#212529",
  paper: "#ffffff",
} as const;

export type BrandColor = keyof typeof brand;

export type Theme = "dark" | "light";

/**
 * Theme for first-time visitors: "system" follows their device setting,
 * or force "dark" / "light". A visitor's own choice (the header toggle) is
 * remembered and always wins.
 */
export const DEFAULT_THEME: Theme | "system" = "system";

export const THEME_STORAGE_KEY = "bnp-theme";

/**
 * Inline script for <head>: sets data-theme before the first paint so the
 * page never flashes the wrong theme. Kept tiny and dependency-free.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(t!=="dark"&&t!=="light"){var d=${JSON.stringify(DEFAULT_THEME)};t=d==="system"?(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"):d}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})()`;
