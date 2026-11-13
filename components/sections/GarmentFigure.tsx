import type { PlacementId } from "@/lib/content";
import { cn } from "@/lib/utils";

interface Garment {
  viewBox: string;
  /** Outline paths of the garment. */
  outline: string[];
  /** Embroidery zone as [x, y, width, height]. */
  zone: [number, number, number, number];
}

const garments: Record<PlacementId, Garment> = {
  cap: {
    viewBox: "0 0 170 130",
    outline: [
      "M34 88C34 46 60 26 92 26s58 20 58 62Z",
      "M34 88C18 90 8 98 6 110c30-9 62-13 96-13l48-9",
      "M92 26v-6",
    ],
    zone: [70, 50, 44, 24],
  },
  "left-chest": {
    viewBox: "0 0 170 130",
    outline: [
      "M52 14 30 24 6 52l20 18 14-12v62h90V58l14 12 20-18-24-28-22-10",
      "M52 14c8 12 18 18 33 18s25-6 33-18",
      "M85 32v24",
    ],
    zone: [96, 44, 24, 18],
  },
  "jacket-back": {
    viewBox: "0 0 170 130",
    outline: [
      "M52 14 30 24 6 52l20 18 14-12v62h90V58l14 12 20-18-24-28-22-10",
      "M52 14c10 6 20 9 33 9s23-3 33-9",
    ],
    zone: [54, 40, 62, 62],
  },
};

interface GarmentFigureProps {
  placement: PlacementId;
  active: boolean;
}

/** Line drawing of a garment with its embroidery zone marked in stitches. */
export function GarmentFigure({ placement, active }: GarmentFigureProps) {
  const { viewBox, outline, zone } = garments[placement];
  const [x, y, width, height] = zone;

  return (
    <svg
      viewBox={viewBox}
      fill="none"
      aria-hidden="true"
      className={cn("h-auto w-full transition-[opacity,transform] duration-500 ease-brand", active ? "scale-100 opacity-100" : "scale-95 opacity-35")}
    >
      {outline.map((path) => (
        <path key={path} d={path} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      ))}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={3}
        className={cn("transition-opacity duration-500", active ? "opacity-100" : "opacity-0")}
        fill="var(--accent-soft)"
        stroke="var(--accent)"
        strokeWidth={2}
        strokeDasharray="5 4"
      />
    </svg>
  );
}
