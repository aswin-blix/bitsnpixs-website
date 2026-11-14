import type { StitchMask } from "./engine";

/**
 * Draws text centred on an offscreen canvas and returns it as a stitch mask.
 * Browser only (needs a 2D canvas).
 */
export function rasterizeText(text: string, fontFamily: string, width: number, height: number): StitchMask {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(width));
  canvas.height = Math.max(1, Math.floor(height));
  const context = canvas.getContext("2d", { willReadFrequently: true });
  const empty = { width: canvas.width, height: canvas.height, data: new Uint8Array(canvas.width * canvas.height) };
  if (!context || !text.trim()) return empty;

  // Start from the tallest size that fits the height, then shrink to fit the width.
  let fontSize = canvas.height * 0.62;
  const setFont = () => {
    context.font = `800 ${fontSize}px ${fontFamily}`;
  };
  setFont();
  const maxWidth = canvas.width * 0.9;
  const measured = context.measureText(text).width;
  if (measured > maxWidth) {
    fontSize *= maxWidth / measured;
    setFont();
  }

  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
  for (let i = 0; i < empty.data.length; i += 1) empty.data[i] = pixels[i * 4 + 3] > 128 ? 1 : 0;
  return empty;
}
