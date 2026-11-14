#!/usr/bin/env node
/**
 * Generates the dotted world map used by the "Worldwide" section:
 *   public/world-dots.svg                   the dots (used as a CSS mask, so it takes theme colours)
 *   lib/content/world-map.generated.json    map size and each market's position on it
 *
 * Re-run with `npm run map:build` after editing lib/content/markets.json.
 */
import { readFile, writeFile } from "node:fs/promises";
import DottedMapModule from "dotted-map";

const DottedMap = DottedMapModule.default ?? DottedMapModule;
const root = new URL("../", import.meta.url);
const markets = JSON.parse(await readFile(new URL("lib/content/markets.json", root), "utf8"));

const map = new DottedMap({ height: 56, grid: "diagonal" });
const { width, height } = map.image;
const round = (value) => Math.round(value * 100) / 100;

// One path with a zero-length segment per dot (drawn as round caps) keeps the file small.
const dots = map.getPoints().map((point) => `M${round(point.x)} ${round(point.y)}h0`).join("");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><path d="${dots}" fill="none" stroke="#000" stroke-width="0.46" stroke-linecap="round"/></svg>\n`;

const pins = Object.fromEntries(
  markets.map((market) => {
    const pin = map.getPin({ lat: market.lat, lng: market.lng });
    return [market.id, { x: round(pin.x), y: round(pin.y) }];
  }),
);

await writeFile(new URL("public/world-dots.svg", root), svg);
await writeFile(new URL("lib/content/world-map.generated.json", root), `${JSON.stringify({ width, height, pins }, null, 2)}\n`);
console.log(`world-dots.svg: ${map.getPoints().length} dots, ${Math.round(svg.length / 1024)} KB; ${markets.length} market pins`);
