import { ImageResponse } from "next/og";
import { pages, site } from "@/lib/content";
import { brand } from "@/lib/theme";

export const alt = `${site.name}: embroidery digitizing, vector art conversion and Coloreel`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social share image, drawn from the brand colours and the home headline. */
export default function OpenGraphImage() {
  const stitches = Array.from({ length: 34 });
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: brand.ink,
          color: brand.paper,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 40, fontWeight: 700 }}>
          <div style={{ width: 30, height: 30, background: brand.primary }} />
          {site.name}
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3, maxWidth: 980 }}>
          {pages.home.hero.title}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", gap: 12 }}>
            {stitches.map((_, index) => (
              <div key={index} style={{ width: 19, height: 5, background: brand.primary }} />
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 28, color: brand.tint }}>{pages.home.hero.eyebrow}</div>
        </div>
      </div>
    ),
    size,
  );
}
