import { describe, expect, it } from "vitest";
import { shadeHex } from "@/lib/stitch/color";
import { countStitches, generateStitches, SEGMENT_SIZE, type StitchMask } from "@/lib/stitch/engine";
import { revealDuration, revealRows } from "@/lib/stitch/reveal";

/** A mask with one filled rectangle. */
function rectMask(width: number, height: number, rect: { x: number; y: number; w: number; h: number }): StitchMask {
  const data = new Uint8Array(width * height);
  for (let y = rect.y; y < rect.y + rect.h; y += 1) data.fill(1, y * width + rect.x, y * width + rect.x + rect.w);
  return { width, height, data };
}

const segmentsOf = (segments: Float32Array) =>
  Array.from({ length: countStitches(segments) }, (_, i) => Array.from(segments.subarray(i * SEGMENT_SIZE, (i + 1) * SEGMENT_SIZE)));

describe("stitch engine", () => {
  const box = rectMask(40, 30, { x: 10, y: 5, w: 20, h: 10 });

  it("returns no stitches for an empty mask", () => {
    const empty = rectMask(20, 20, { x: 0, y: 0, w: 0, h: 0 });
    for (const kind of ["satin", "fill", "run"] as const) expect(countStitches(generateStitches(empty, kind))).toBe(0);
  });

  it("satin: one stitch per column that spans the shape top to bottom", () => {
    const stitches = segmentsOf(generateStitches(box, "satin", { spacing: 2, maxLength: 18 }));
    expect(stitches).toHaveLength(10);
    for (const [x1, y1, , y2] of stitches) {
      expect(x1).toBeGreaterThanOrEqual(10);
      expect(x1).toBeLessThan(30);
      expect(y1).toBe(5);
      expect(y2).toBe(15);
    }
  });

  it("splits runs longer than maxLength without leaving gaps", () => {
    const tall = rectMask(10, 60, { x: 0, y: 4, w: 1, h: 50 });
    const stitches = segmentsOf(generateStitches(tall, "satin", { spacing: 10, maxLength: 16 }));
    expect(stitches.length).toBeGreaterThan(1);
    const covered = stitches.reduce((sum, [, y1, , y2]) => sum + (y2 - y1), 0);
    expect(covered).toBeCloseTo(50, 3);
    for (const [, y1, , y2] of stitches) expect(y2 - y1).toBeLessThanOrEqual(16.001);
  });

  it("fill: rows of short stitches that stay inside the shape", () => {
    const stitches = segmentsOf(generateStitches(box, "fill", { spacing: 2, maxLength: 6 }));
    expect(stitches.length).toBeGreaterThan(5 * 3);
    for (const [x1, y1, x2] of stitches) {
      expect(x1).toBeGreaterThanOrEqual(10);
      expect(x2).toBeLessThanOrEqual(30);
      expect(x2 - x1).toBeLessThanOrEqual(6.001);
      expect(y1).toBeGreaterThanOrEqual(5);
      expect(y1).toBeLessThan(15);
    }
  });

  it("run: dashes sit on the outline and are sewn left to right", () => {
    const stitches = segmentsOf(generateStitches(box, "run", { spacing: 5, maxLength: 3 }));
    expect(stitches.length).toBeGreaterThan(0);
    const xs = stitches.map(([x1]) => x1);
    expect([...xs].sort((a, b) => a - b)).toEqual(xs);
    for (const [x1, y1] of stitches) {
      const onHorizontalEdge = y1 === 5 || y1 === 15;
      const onVerticalEdge = x1 === 10 || x1 === 30;
      expect(onHorizontalEdge || onVerticalEdge).toBe(true);
    }
  });

  it("denser spacing produces more stitches", () => {
    const loose = countStitches(generateStitches(box, "fill", { spacing: 4, maxLength: 9 }));
    const dense = countStitches(generateStitches(box, "fill", { spacing: 2, maxLength: 9 }));
    expect(dense).toBeGreaterThan(loose);
  });

  it("rejects non-positive options", () => {
    expect(() => generateStitches(box, "satin", { spacing: 0, maxLength: 5 })).toThrow(RangeError);
    expect(() => generateStitches(box, "fill", { spacing: 2, maxLength: -1 })).toThrow(RangeError);
  });
});

describe("shadeHex", () => {
  it("lightens, darkens and clamps", () => {
    expect(shadeHex("#808080", 0)).toBe("#808080");
    expect(shadeHex("#000000", 1)).toBe("#ffffff");
    expect(shadeHex("#ffffff", -1)).toBe("#000000");
    expect(shadeHex("#6faf2b", 0.5)).toBe("#b7d795");
    expect(shadeHex("6faf2b", -2)).toBe("#000000");
  });

  it("returns unparseable input unchanged", () => {
    expect(shadeHex("rebeccapurple", 0.2)).toBe("rebeccapurple");
  });
});

describe("row reveal", () => {
  it("alternates direction like a fill stitch and starts from the top", () => {
    const rows = revealRows(4, 0.1);
    expect(rows.map((row) => row.direction)).toEqual([1, -1, 1, -1]);
    expect(rows.map((row) => row.delay)).toEqual([0, 0.1, 0.2, 0.3].map((delay) => expect.closeTo(delay)));
  });

  it("undoes the rows from the bottom up, keeping each row's direction", () => {
    const forward = revealRows(4, 0.1);
    const back = revealRows(4, 0.1, true);
    expect(back.map((row) => row.direction)).toEqual(forward.map((row) => row.direction));
    expect(back.map((row) => row.delay)).toEqual([0.3, 0.2, 0.1, 0].map((delay) => expect.closeTo(delay)));
  });

  it("moves every row at once when there is no stagger (reduced motion)", () => {
    expect(revealRows(5, 0).every((row) => row.delay === 0)).toBe(true);
    expect(revealRows(5, -1).every((row) => row.delay === 0)).toBe(true);
    expect(revealDuration(5, 0, 0.7)).toBe(0.7);
  });

  it("handles empty, negative and fractional row counts", () => {
    expect(revealRows(0, 0.1)).toEqual([]);
    expect(revealRows(-3, 0.1)).toEqual([]);
    expect(revealRows(2.9, 0.1)).toHaveLength(2);
    expect(revealDuration(0, 0.1, 0.7)).toBe(0);
    expect(revealDuration(-3, 0.1, 0.7)).toBe(0);
  });

  it("lasts until the last row has finished", () => {
    expect(revealDuration(6, 0.08, 0.7)).toBeCloseTo(1.1);
    expect(revealDuration(1, 0.08, 0.7)).toBeCloseTo(0.7);
  });
});
