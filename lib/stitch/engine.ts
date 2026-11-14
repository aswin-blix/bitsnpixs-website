/**
 * Stitch simulation used by the live digitizer. Pure functions: a shape mask
 * goes in, an ordered list of stitches comes out. No DOM access, so it is unit
 * tested directly (tests/stitch.test.ts).
 *
 * This is a visual simulation for the website, not a production digitizer.
 */

export type StitchKind = "satin" | "fill" | "run";

/** Shape to embroider: `data[y * width + x]` is 1 where thread should go. */
export interface StitchMask {
  width: number;
  height: number;
  data: Uint8Array;
}

export interface StitchOptions {
  /** Distance between neighbouring stitch lines, in pixels. */
  spacing: number;
  /** Longest single stitch, in pixels. Longer runs are split. */
  maxLength: number;
}

export const STITCH_DEFAULTS: Record<StitchKind, StitchOptions> = {
  satin: { spacing: 2.4, maxLength: 18 },
  fill: { spacing: 3, maxLength: 9 },
  run: { spacing: 6, maxLength: 4 },
};

/** Values per stitch in the flat segment array: x1, y1, x2, y2. */
export const SEGMENT_SIZE = 4;

type Run = [start: number, end: number];

/** Filled stretches along one line of the mask; `end` is exclusive. */
function runsAlong(mask: StitchMask, fixed: number, vertical: boolean): Run[] {
  const length = vertical ? mask.height : mask.width;
  const runs: Run[] = [];
  let start = -1;
  for (let i = 0; i <= length; i += 1) {
    const filled = i < length && mask.data[vertical ? i * mask.width + fixed : fixed * mask.width + i] === 1;
    if (filled && start < 0) start = i;
    else if (!filled && start >= 0) {
      runs.push([start, i]);
      start = -1;
    }
  }
  return runs;
}

/** Cut a run into pieces no longer than maxLength, staggered like brickwork. */
function splitRun([start, end]: Run, maxLength: number, lineIndex: number): Run[] {
  const length = end - start;
  if (length <= maxLength) return [[start, end]];
  const piece = length / Math.ceil(length / maxLength);
  const pieces: Run[] = [];
  let from = start;
  let to = start + (lineIndex % 2 === 0 ? piece : piece / 2);
  while (from < end - 0.001) {
    pieces.push([from, Math.min(to, end)]);
    from = to;
    to += piece;
  }
  return pieces;
}

function satin(mask: StitchMask, { spacing, maxLength }: StitchOptions, out: number[]): void {
  for (let x = 0, column = 0; x < mask.width; x += spacing, column += 1) {
    for (const run of runsAlong(mask, Math.floor(x), true)) {
      for (const [from, to] of splitRun(run, maxLength, column)) out.push(x, from, x + spacing / 2, to);
    }
  }
}

function fill(mask: StitchMask, { spacing, maxLength }: StitchOptions, out: number[]): void {
  for (let y = 0, row = 0; y < mask.height; y += spacing, row += 1) {
    for (const run of runsAlong(mask, Math.floor(y), false)) {
      for (const [from, to] of splitRun(run, maxLength, row)) out.push(from, y, to, y + spacing * 0.3);
    }
  }
}

/** Dashes along every edge of the shape, ordered left to right like a sewing pass. */
function run(mask: StitchMask, { spacing, maxLength }: StitchOptions, out: number[]): void {
  const dashes: [number, number, number, number][] = [];
  for (let x = 0; x < mask.width; x += spacing) {
    for (const [top, bottom] of runsAlong(mask, Math.floor(x), true)) {
      dashes.push([x, top, x + maxLength, top], [x, bottom, x + maxLength, bottom]);
    }
  }
  for (let y = 0; y < mask.height; y += spacing) {
    for (const [left, right] of runsAlong(mask, Math.floor(y), false)) {
      dashes.push([left, y, left, y + maxLength], [right, y, right, y + maxLength]);
    }
  }
  dashes.sort((a, b) => a[0] - b[0]);
  for (const dash of dashes) out.push(...dash);
}

const generators = { satin, fill, run } as const;

/** Stitches for a mask as a flat array (x1, y1, x2, y2 per stitch), in sewing order. */
export function generateStitches(
  mask: StitchMask,
  kind: StitchKind,
  options: StitchOptions = STITCH_DEFAULTS[kind],
): Float32Array {
  if (options.spacing <= 0 || options.maxLength <= 0) throw new RangeError("spacing and maxLength must be positive");
  const out: number[] = [];
  generators[kind](mask, options, out);
  return Float32Array.from(out);
}

export const countStitches = (segments: Float32Array): number => segments.length / SEGMENT_SIZE;
