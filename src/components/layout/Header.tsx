"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { ProductsMegaMenuDesktop, ProductsMegaMenuMobile } from "@/components/layout/ProductsMegaMenu";
import { siteLogo, siteLogoWidth, siteLogoHeight } from "@/data/images";
import { layoutGutterClass } from "@/lib/layout";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/solutions", label: "Solutions" },
  { href: "/about", label: "About" },
  // { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const solidNav = !isHome || scrolled;
  const isProductsActive = pathname.startsWith("/products") || pathname.startsWith("/categories");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setCategoriesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navText = solidNav
    ? "text-foreground hover:text-primary"
    : "text-foreground/90 hover:text-primary";
  const menuIcon = solidNav ? "text-foreground" : "text-white max-lg:text-foreground";

  const closeMenus = () => {
    setCategoriesOpen(false);
    setMobileOpen(false);
  };

  const categoriesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openCategoriesMenu = useCallback(() => {
    if (categoriesCloseTimer.current) {
      clearTimeout(categoriesCloseTimer.current);
      categoriesCloseTimer.current = null;
    }
    setCategoriesOpen(true);
  }, []);

  const scheduleCloseCategoriesMenu = useCallback(() => {
    if (categoriesCloseTimer.current) clearTimeout(categoriesCloseTimer.current);
    categoriesCloseTimer.current = setTimeout(() => setCategoriesOpen(false), 150);
  }, []);

  useEffect(() => {
    return () => {
      if (categoriesCloseTimer.current) clearTimeout(categoriesCloseTimer.current);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        className={`h-14 overflow-hidden transition-all duration-300 lg:overflow-visible ${
          solidNav ? "glass-nav lg:h-20" : "bg-white/90 backdrop-blur-sm lg:bg-navy/15 lg:backdrop-blur-sm lg:h-[5.5rem]"
        }`}
      >
        <Container variant="chrome" className="flex h-full items-center justify-between gap-3 lg:gap-6">
          <Link href="/" className="relative z-10 flex w-auto shrink-0 items-center self-center leading-none group py-1 lg:py-0">
            <Image
              src={siteLogo}
              alt="Med Way"
              width={siteLogoWidth}
              height={siteLogoHeight}
              quality={100}
              sizes="(max-width: 1024px) 400px, 280px"
              className="block h-10 w-auto max-w-[min(54vw,11.5rem)] object-contain object-left transition-opacity group-hover:opacity-90 sm:h-11 lg:h-14 lg:max-w-[11rem]"
              priority
            />
          </Link>

          <nav className="relative z-20 hidden lg:flex flex-1 items-center justify-center gap-0.5 self-center min-w-0">
            {/* Products mega menu */}
            <div className="relative">
              <button
                type="button"
                aria-expanded={categoriesOpen}
                aria-haspopup="true"
                onMouseEnter={openCategoriesMenu}
                onMouseLeave={scheduleCloseCategoriesMenu}
                onFocus={openCategoriesMenu}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-all rounded-lg ${
                  categoriesOpen || isProductsActive
                    ? "text-primary bg-primary/10"
                    : navText
                }`}
              >
                Products
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${categoriesOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {categoriesOpen && (
                  <ProductsMegaMenuDesktop
                    onNavigate={() => setCategoriesOpen(false)}
                    onMouseEnter={openCategoriesMenu}
                    onMouseLeave={scheduleCloseCategoriesMenu}
                  />
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 inline-flex items-center text-sm font-medium transition-colors rounded-lg ${navText} ${
                  pathname === link.href ? "text-primary bg-primary/10" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="relative z-20 flex shrink-0 items-center self-center">
            <div className="hidden lg:block">
              <Button href="/contact" variant="primary" size="sm" showArrow={false}>
                Enquire
              </Button>
            </div>

            <button
              className="lg:hidden touch-target inline-flex items-center justify-center rounded-md -mr-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className={`w-6 h-6 ${menuIcon}`} /> : <Menu className={`w-6 h-6 ${menuIcon}`} />}
            </button>
          </div>
        </Container>
      </motion.div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-14 bg-navy/40 backdrop-blur-sm lg:hidden z-40"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu overlay"
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-xl z-50 max-h-[calc(100dvh-3.5rem)] overflow-y-auto"
            >
              <div className={`${layoutGutterClass} py-5 space-y-5`}>
                <ProductsMegaMenuMobile onNavigate={closeMenus} />

                <hr className="border-border" />

                <div className="space-y-1">
                  {navLinks.slice(1).map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-3 py-3 min-h-11 font-semibold rounded-lg hover:bg-primary/5 transition-colors ${
                        pathname === link.href ? "text-primary bg-primary/5" : ""
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <Button href="/contact" fullWidth size="lg" onClick={() => setMobileOpen(false)}>
                  Enquire Now
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
