"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { whatsAppHref } from "@/data/site-contact";
import { usePrefersReducedMotion } from "@/components/animations/usePrefersReducedMotion";

export default function MobileEnquireBar() {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  const visible = pathname !== "/contact" && !/^\/products\/[^/]+$/.test(pathname);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="mobile-enquire-bar"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 inset-x-0 z-40 lg:hidden pb-[env(safe-area-inset-bottom)]"
        >
          <div className="flex border-t border-border bg-white/95 backdrop-blur-md shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
            <a
              href={whatsAppHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 min-h-[3.25rem] text-sm font-semibold text-foreground border-r border-border active:bg-background"
            >
              <Phone className="w-4 h-4 text-primary" />
              WhatsApp
            </a>
            <Link
              href="/contact"
              className="flex flex-[1.4] items-center justify-center min-h-[3.25rem] bg-primary text-white text-sm font-bold active:bg-primary-dark"
            >
              Enquire Now
            </Link>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
