"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";

export default function MobileEnquireBar() {
  const pathname = usePathname();
  if (pathname === "/contact" || /^\/products\/[^/]+$/.test(pathname)) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="flex border-t border-border bg-white/95 backdrop-blur-md shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
        <a
          href="tel:1800633929"
          className="flex flex-1 items-center justify-center gap-2 min-h-[3.25rem] text-sm font-semibold text-foreground border-r border-border active:bg-background"
        >
          <Phone className="w-4 h-4 text-primary" />
          Call
        </a>
        <Link
          href="/contact"
          className="flex flex-[1.4] items-center justify-center min-h-[3.25rem] bg-primary text-white text-sm font-bold active:bg-primary-dark"
        >
          Enquire Now
        </Link>
      </div>
    </div>
  );
}
