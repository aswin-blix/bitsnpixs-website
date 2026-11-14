import { describe, expect, it } from "vitest";
import { shadeHex } from "@/lib/stitch/color";
import { countStitches, generateStitches, SEGMENT_SIZE, type StitchMask } from "@/lib/stitch/engine";

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
