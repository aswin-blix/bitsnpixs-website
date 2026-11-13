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
