"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/components/animations/usePrefersReducedMotion";

export default function MainShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  const isProductDetail = /^\/products\/[^/]+$/.test(pathname);
  const hideMobileBar = pathname === "/contact" || isProductDetail;

  return (
    <main className={`flex-1 overflow-x-hidden ${hideMobileBar ? "" : "pb-mobile-bar lg:pb-0"}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
