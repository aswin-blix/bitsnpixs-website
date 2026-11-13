import manifest from "./image-manifest.json";
import type { ImageRef } from "./types";

export type ImageId = keyof typeof manifest;

/**
 * Where images are loaded from. Set NEXT_PUBLIC_ASSET_SOURCE to:
 *   "remote" (default)  the live Odoo site, so the redesign shows real images today
 *   "local"             /public/images, after running `npm run assets:pull`
 *   "none"              ImagePlaceholder everywhere
 */
type AssetSource = "remote" | "local" | "none";

const REMOTE_BASE = "https://www.bitsnpixs.com/web/image";
const LOCAL_BASE = "/images";
const source = (process.env.NEXT_PUBLIC_ASSET_SOURCE ?? "remote") as AssetSource;

function resolveSrc(id: ImageId): string | undefined {
  const entry = manifest[id];
  if (source === "none") return undefined;
  if (source === "local") return `${LOCAL_BASE}/${entry.file}`;
  return `${REMOTE_BASE}/${encodeURI(entry.remote)}`;
}

export function image(id: ImageId): ImageRef {
  const { alt, width, height } = manifest[id];
  return { src: resolveSrc(id), alt, width, height };
}

/** For slots the old site has no asset for: always renders an ImagePlaceholder. */
export function placeholder(alt: string, width: number, height: number): ImageRef {
  return { alt, width, height };
}

export const imageIds = Object.keys(manifest) as ImageId[];
