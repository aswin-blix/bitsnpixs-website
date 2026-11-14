/** One horizontal band of a row-by-row reveal. */
export interface RevealRow {
  /** 1 slides the band out to the right, -1 to the left. */
  direction: 1 | -1;
  /** Seconds to wait before this band starts moving. */
  delay: number;
}

const wholeRows = (count: number) => Math.max(0, Math.floor(count));

/**
 * Bands of a reveal that crosses the frame the way a fill stitch is sewn:
 * one row left to right, the next one back again. Going forward the top row
 * starts first; `reverse` undoes it from the bottom row up.
 */
export function revealRows(count: number, stagger: number, reverse = false): RevealRow[] {
  const rows = wholeRows(count);
  return Array.from({ length: rows }, (_, index) => ({
    direction: index % 2 === 0 ? 1 : -1,
    delay: (reverse ? rows - 1 - index : index) * Math.max(0, stagger),
  }));
}

/** Seconds from the first band starting to the last band finishing. */
export function revealDuration(count: number, stagger: number, rowDuration: number): number {
  const rows = wholeRows(count);
  return rows === 0 ? 0 : (rows - 1) * Math.max(0, stagger) + rowDuration;
}
