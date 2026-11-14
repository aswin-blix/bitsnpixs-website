/**
 * Thread colours offered by the live digitizer. Each one is a theme token from
 * app/styles/tokens.css, so re-theming the site re-colours the spools too.
 */
export const STITCH_THREADS = [
  { token: "--brand-primary", label: "Brand green" },
  { token: "--brand-paper", label: "White" },
  { token: "--spectrum-2", label: "Gold" },
  { token: "--spectrum-3", label: "Orange" },
  { token: "--spectrum-4", label: "Pink" },
  { token: "--spectrum-6", label: "Blue" },
] as const;

export type ThreadToken = (typeof STITCH_THREADS)[number]["token"];

/** The coloured threads only (no white), used for embroidered patch rings. */
export const COLOR_THREADS = STITCH_THREADS.filter((thread) => thread.token !== "--brand-paper");
