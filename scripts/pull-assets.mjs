#!/usr/bin/env node
/**
 * Copies every image in lib/content/image-manifest.json from the live site
 * into public/images, so the new site no longer depends on the old one.
 *
 *   npm run assets:pull
 *   then set NEXT_PUBLIC_ASSET_SOURCE=local in .env.local
 *
 * Existing files are skipped; pass --force to download them again.
 */
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const REMOTE_BASE = "https://www.bitsnpixs.com/web/image";
const root = new URL("../", import.meta.url);
const manifest = JSON.parse(await readFile(new URL("lib/content/image-manifest.json", root), "utf8"));
const outDir = new URL("public/images/", root);
const force = process.argv.includes("--force");

await mkdir(outDir, { recursive: true });

const exists = (url) => stat(url).then(() => true, () => false);
let downloaded = 0;
let skipped = 0;
const failed = [];

for (const [id, entry] of Object.entries(manifest)) {
  const target = new URL(entry.file, outDir);
  if (!force && (await exists(target))) {
    skipped += 1;
    continue;
  }
  try {
    const response = await fetch(`${REMOTE_BASE}/${encodeURI(entry.remote)}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    await writeFile(target, Buffer.from(await response.arrayBuffer()));
    downloaded += 1;
    console.log(`saved   ${entry.file}`);
  } catch (error) {
    failed.push(id);
    console.error(`failed  ${id}: ${error.message}`);
  }
}

console.log(`\n${downloaded} downloaded, ${skipped} already present, ${failed.length} failed -> ${fileURLToPath(outDir)}`);
if (failed.length) process.exitCode = 1;
else console.log("Next: set NEXT_PUBLIC_ASSET_SOURCE=local in .env.local");
