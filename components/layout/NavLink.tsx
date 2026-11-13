"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SmartLink } from "@/components/ui/SmartLink";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

/** Navigation link with the stitched underline and aria-current for the active page. */
export function NavLink({ href, children, className, onClick }: NavLinkProps) {
  const pathname = usePathname();
  return (
    <SmartLink
      href={href}
      onClick={onClick}
      aria-current={pathname === href ? "page" : undefined}
      className={cn("link-stitch", className)}
    >
      {children}
    </SmartLink>
  );
}
