/**
 * Lighten (amount > 0) or darken (amount < 0) a #rrggbb colour. Used to give
 * neighbouring stitches slightly different shades, like the sheen of thread.
 */
export function shadeHex(hex: string, amount: number): string {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match) return hex;
  const value = parseInt(match[1], 16);
  const target = amount > 0 ? 255 : 0;
  const mix = Math.min(Math.abs(amount), 1);
  const channel = (shift: number) => {
    const current = (value >> shift) & 0xff;
    return Math.round(current + (target - current) * mix);
  };
  return `#${[16, 8, 0].map((shift) => channel(shift).toString(16).padStart(2, "0")).join("")}`;
}
