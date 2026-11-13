"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useMagnetic } from "@/lib/hooks/use-magnetic";
import { useMotionProfile } from "@/lib/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";
import { SmartLink } from "./SmartLink";

const variants = {
  primary: "bg-accent text-on-accent hover:shadow-card",
  secondary: "border border-line bg-surface text-strong hover:border-accent",
  inverse: "bg-strong text-surface hover:shadow-card",
} as const;

const sizes = {
  md: "min-h-12 px-6 text-[0.95rem]",
  lg: "min-h-14 px-8 text-base",
  sm: "min-h-10 px-4 text-sm",
} as const;

interface ButtonProps {
  children: ReactNode;
  /** Renders a link when set, otherwise a <button>. */
  href?: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** Pull toward the cursor on fine-pointer devices. */
  magnetic?: boolean;
  withArrow?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  magnetic = true,
  withArrow = true,
  type = "button",
  disabled,
  onClick,
  className,
}: ButtonProps) {
  const { rich } = useMotionProfile();
  const { style, handlers } = useMagnetic(magnetic && rich);

  const classes = cn(
    "group/button inline-flex items-center justify-center gap-2.5 rounded-control font-semibold",
    "transition-[box-shadow,border-color,opacity] duration-300 ease-brand",
    "disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {withArrow ? (
        <Icon
          name="arrow"
          size={16}
          className="transition-transform duration-300 ease-brand group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
        />
      ) : null}
    </>
  );

  return (
    <motion.span className="inline-flex" style={style} whileTap={{ scale: 0.97 }} {...handlers}>
      {href ? (
        <SmartLink href={href} className={classes} onClick={onClick}>
          {content}
        </SmartLink>
      ) : (
        <button type={type} className={classes} disabled={disabled} onClick={onClick}>
          {content}
        </button>
      )}
    </motion.span>
  );
}
