"use client";

import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { SmartLink } from "@/components/ui/SmartLink";
import { navigation, routes } from "@/lib/content";
import { useScrolled } from "@/lib/hooks/use-scrolled";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "./ThemeToggle";

const MOBILE_MENU_ID = "mobile-menu";

/** Fixed site header: transparent at the top of the page, frosted once scrolled. */
export function Header() {
  const pathname = usePathname();
  const scrolled = useScrolled();
  // Storing the path the menu was opened on closes it automatically on navigation.
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const menuOpen = menuPath === pathname;
  const closeMenu = useCallback(() => setMenuPath(null), []);
  // A desktop dropdown the visitor just used stays shut until the pointer leaves it or focus returns.
  const [dismissed, setDismissed] = useState<string | null>(null);

  return (
    <>
      <header
        data-surface="dark"
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300",
          scrolled || menuOpen ? "border-line bg-surface/75 backdrop-blur-md" : "border-transparent bg-transparent",
        )}
      >
        <div className="container-page flex h-(--header-height) items-center justify-between gap-6">
          <SmartLink href={routes.home} className="shrink-0 rounded-control">
            <Logo />
          </SmartLink>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-9 text-[0.95rem] font-medium text-strong">
              {navigation.main.map((item) => (
                <li
                  key={item.label}
                  data-dismissed={dismissed === item.label || undefined}
                  onPointerLeave={() => setDismissed((current) => (current === item.label ? null : current))}
                  onFocus={(event) => {
                    // Only the top-level link reopens it; focus moving inside the open menu does not.
                    if ((event.target as Element) === event.currentTarget.querySelector("a")) setDismissed(null);
                  }}
                  onKeyDown={(event) => {
                    if (event.key !== "Escape" || !item.children) return;
                    // Return focus first: its onFocus clears the flag, then this sets it.
                    event.currentTarget.querySelector("a")?.focus();
                    setDismissed(item.label);
                  }}
                  className="group/nav relative"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <NavLink href={item.href}>{item.label}</NavLink>
                    {item.children ? (
                      <Icon name="chevron" size={14} className="transition-transform duration-300 group-hover/nav:rotate-180" />
                    ) : null}
                  </span>
                  {item.children ? (
                    <div className="invisible absolute top-full left-1/2 w-80 -translate-x-1/2 translate-y-2 pt-5 opacity-0 transition-[opacity,transform,visibility] duration-300 ease-brand group-focus-within/nav:visible group-focus-within/nav:translate-y-0 group-focus-within/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100 group-data-dismissed/nav:invisible! group-data-dismissed/nav:translate-y-2! group-data-dismissed/nav:opacity-0!">
                      <ul className="rounded-card border border-line bg-surface p-2.5 shadow-card">
                        {item.children.map((child, index) => (
                          <li key={child.href}>
                            <SmartLink
                              href={child.href}
                              aria-current={pathname === child.href ? "page" : undefined}
                              onClick={(event) => {
                                setDismissed(item.label);
                                event.currentTarget.blur();
                              }}
                              className="flex items-center justify-between gap-4 rounded-2xl px-4 py-3 transition-colors duration-200 hover:bg-accent-soft aria-[current=page]:bg-accent-soft"
                            >
                              <span>{child.label}</span>
                              <span aria-hidden="true" className="font-mono text-xs text-muted">
                                0{index + 1}
                              </span>
                            </SmartLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <NavLink href={navigation.secondaryAction.href} className="hidden text-[0.95rem] font-medium text-strong lg:inline-block">
              {navigation.secondaryAction.label}
            </NavLink>
            {/* On phones the primary action lives in the menu, leaving room for the logo and controls. */}
            <Button href={navigation.primaryAction.href} size="sm" wrapperClassName="hidden sm:inline-flex">
              {navigation.primaryAction.label}
            </Button>
            <ThemeToggle />
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls={MOBILE_MENU_ID}
              onClick={() => setMenuPath(menuOpen ? null : pathname)}
              className="grid size-10 place-items-center rounded-control border border-line bg-surface text-strong sm:size-11 lg:hidden"
            >
              <Icon name={menuOpen ? "cross" : "menu"} />
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sibling of the header, not a child: the header's backdrop-filter would otherwise trap position: fixed. */}
      <MobileMenu id={MOBILE_MENU_ID} open={menuOpen} onClose={closeMenu} />
    </>
  );
}
