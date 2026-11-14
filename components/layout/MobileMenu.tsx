"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { navigation } from "@/lib/content";
import { DURATION, EASE, fadeUp, staggerContainer } from "@/lib/motion";
import { NavLink } from "./NavLink";

interface MobileMenuProps {
  id: string;
  open: boolean;
  onClose: () => void;
}

/** Full-screen navigation for small screens. Locks page scroll and closes on Escape. */
export function MobileMenu({ id, open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id={id}
          data-surface="dark"
          className="fixed inset-x-0 top-(--header-height) bottom-0 z-40 overflow-y-auto lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: DURATION.fast } }}
          exit={{ opacity: 0, transition: { duration: DURATION.fast, ease: EASE.inOut } }}
        >
          <nav aria-label="Mobile" className="container-page flex min-h-full flex-col gap-10 py-10">
            <motion.ul variants={staggerContainer(0.05)} initial="hidden" animate="visible" className="flex flex-col gap-6">
              {navigation.main.map((item) => (
                <motion.li key={item.label} variants={fadeUp}>
                  <NavLink href={item.href} onClick={onClose} className="font-display text-4xl font-semibold text-strong">
                    {item.label}
                  </NavLink>
                  {item.children ? (
                    <ul className="mt-4 flex flex-col gap-3 border-l border-line pl-5">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <NavLink href={child.href} onClick={onClose} className="text-lg text-ink">
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </motion.li>
              ))}
            </motion.ul>

            <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-line pt-8">
              <Button href={navigation.primaryAction.href} onClick={onClose} magnetic={false}>
                {navigation.primaryAction.label}
              </Button>
              <Button href={navigation.secondaryAction.href} variant="secondary" onClick={onClose} magnetic={false}>
                {navigation.secondaryAction.label}
              </Button>
            </div>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
