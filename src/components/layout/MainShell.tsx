"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function MainShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isProductDetail = /^\/products\/[^/]+$/.test(pathname);
  const hideMobileBar = pathname === "/contact" || isProductDetail;

  return (
    <main className={`flex-1 ${hideMobileBar ? "" : "pb-mobile-bar lg:pb-0"}`}>
      {children}
    </main>
  );
}
