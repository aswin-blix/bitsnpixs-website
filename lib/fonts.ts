import localFont from "next/font/local";

/**
 * Self-hosted variable fonts (SIL Open Font License), loaded through next/font
 * so there is no layout shift and no request to a font CDN.
 * To change a typeface: drop the new .woff2 in app/fonts and update the path.
 * The CSS variable names are what globals.css maps onto font-display / font-sans / font-mono.
 */
export const displayFont = localFont({
  src: "../app/fonts/BricolageGrotesque-Variable.woff2",
  variable: "--font-display-face",
  weight: "200 800",
  display: "swap",
});

export const bodyFont = localFont({
  src: "../app/fonts/Figtree-Variable.woff2",
  variable: "--font-body-face",
  weight: "300 900",
  display: "swap",
});

export const monoFont = localFont({
  src: "../app/fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-mono-face",
  weight: "100 800",
  display: "swap",
  preload: false,
});

export const fontVariables = [displayFont.variable, bodyFont.variable, monoFont.variable].join(" ");
