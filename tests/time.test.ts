import { describe, expect, it } from "vitest";
import markets from "@/lib/content/markets.json";
import worldMap from "@/lib/content/world-map.generated.json";
import { deliveryWindow, formatClock, formatDayClock } from "@/lib/time";

const noonUtc = new Date("2026-11-14T12:00:00Z");

describe("deliveryWindow", () => {
  it("adds the turnaround hours to the order time", () => {
    const standard = deliveryWindow(noonUtc, [24, 24]);
    expect(standard.from.toISOString()).toBe("2026-11-15T12:00:00.000Z");
    expect(standard.to).toEqual(standard.from);

    const rush = deliveryWindow(noonUtc, [2, 12]);
    expect(rush.from.toISOString()).toBe("2026-11-14T14:00:00.000Z");
    expect(rush.to.toISOString()).toBe("2026-11-15T00:00:00.000Z");
  });
});

describe("clock formatting", () => {
  it("formats the same instant in each market's time zone", () => {
    expect(formatClock(noonUtc, "Asia/Kolkata")).toBe("17:30");
    expect(formatClock(noonUtc, "America/New_York")).toBe("07:00");
    expect(formatClock(noonUtc, "Europe/London")).toBe("12:00");
    expect(formatDayClock(noonUtc, "Australia/Sydney")).toBe("Sat 23:00");
  });

  it("every market has a valid time zone and a position on the generated map", () => {
    for (const market of markets) {
      expect(() => formatClock(noonUtc, market.timeZone)).not.toThrow();
      const pin = (worldMap.pins as Record<string, { x: number; y: number }>)[market.id];
      expect(pin, `run npm run map:build: no pin for ${market.id}`).toBeDefined();
      expect(pin.x).toBeGreaterThanOrEqual(0);
      expect(pin.x).toBeLessThanOrEqual(worldMap.width);
      expect(pin.y).toBeGreaterThanOrEqual(0);
      expect(pin.y).toBeLessThanOrEqual(worldMap.height);
    }
    expect(markets.filter((market) => "hq" in market && market.hq)).toHaveLength(1);
  });
});
