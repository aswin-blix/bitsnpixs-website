import { ImageResponse } from "next/og";
import { brand } from "@/lib/theme";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon generated from the brand colours: the pixel cluster from the wordmark. */
export default function Icon() {
  const pixel = (opacity: number) => ({ width: 22, height: 22, background: brand.primary, opacity });
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexWrap: "wrap", gap: 6, padding: 7, background: brand.ink, borderRadius: 12 }}>
        <div style={pixel(1)} />
        <div style={pixel(0.55)} />
        <div style={pixel(0.55)} />
        <div style={pixel(1)} />
      </div>
    ),
    size,
  );
}
