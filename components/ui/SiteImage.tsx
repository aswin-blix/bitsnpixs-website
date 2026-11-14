"use client";

import Image from "next/image";
import { useState } from "react";
import type { ImageRef } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ImagePlaceholder } from "./ImagePlaceholder";

interface SiteImageProps {
  image: ImageRef;
  /** Responsive sizes hint for next/image. */
  sizes: string;
  /** Override the intrinsic aspect ratio (width / height). */
  ratio?: number;
  /** Fill a positioned parent instead of sizing by ratio. */
  fill?: boolean;
  /** "contain" shows the whole image (letterboxed); "cover" crops to fill. */
  fit?: "cover" | "contain";
  /** Load eagerly with high priority (above-the-fold images only). */
  eager?: boolean;
  className?: string;
}

/**
 * Renders a content image, or an ImagePlaceholder when the image has no source
 * or fails to load. The placeholder also sits underneath while loading, so the
 * box never changes size (no layout shift).
 */
export function SiteImage({ image, sizes, ratio, fill, fit = "cover", eager, className }: SiteImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "failed">("loading");
  const usable = Boolean(image.src) && status !== "failed";

  return (
    <div
      style={fill ? undefined : { aspectRatio: ratio ?? image.width / image.height }}
      className={cn("overflow-hidden rounded-media", fill ? "absolute inset-0" : "relative w-full", className)}
    >
      {status !== "loaded" ? <ImagePlaceholder fill alt={image.alt} showLabel={!usable} className="rounded-none" /> : null}
      {usable && image.src ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("failed")}
          className={cn(
            fit === "contain" ? "object-contain" : "object-cover",
            "transition-opacity duration-700 ease-brand",
            status === "loaded" ? "opacity-100" : "opacity-0",
          )}
        />
      ) : null}
    </div>
  );
}
