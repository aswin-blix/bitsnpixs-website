import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { isExternalHref } from "@/lib/utils";

type SmartLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & { href: string };

/**
 * One link component for the whole site: client-side navigation for internal
 * paths, a safe new tab for outbound http(s) links, a plain anchor for mailto/tel.
 */
export function SmartLink({ href, children, ...props }: SmartLinkProps) {
  if (!isExternalHref(href)) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  const opensNewTab = /^https?:/i.test(href);
  return (
    <a href={href} {...(opensNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...props}>
      {children}
      {opensNewTab ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}
