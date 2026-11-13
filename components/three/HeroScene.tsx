"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import { useState } from "react";
import { useCssVar } from "@/lib/hooks/use-css-var";
import { brand } from "@/lib/theme";
import { PixelStitchField } from "./PixelStitchField";

interface HeroSceneProps {
  progress: MotionValue<number>;
  /** Desktop gets a denser field and pointer interaction. */
  rich: boolean;
  /** Stop rendering while the hero is off screen. */
  active: boolean;
}

const MAX_DPR = 1.5;

/**
 * Canvas wrapper. Loaded only through HeroCanvas (next/dynamic, ssr: false), so
 * three.js never lands in the server bundle or the initial JS.
 */
export default function HeroScene({ progress, rich, active }: HeroSceneProps) {
  const color = useCssVar("--brand-primary", brand.primary);
  const [dpr, setDpr] = useState(rich ? MAX_DPR : 1);

  return (
    <Canvas
      dpr={[1, dpr]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      aria-hidden="true"
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <PixelStitchField
        progress={progress}
        color={color}
        columns={rich ? 64 : 34}
        rows={rich ? 30 : 22}
        interactive={rich}
      />
    </Canvas>
  );
}
