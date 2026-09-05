"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { ProductsMegaMenuDesktop, ProductsMegaMenuMobile } from "@/components/layout/ProductsMegaMenu";
import { siteLogo, siteLogoWidth, siteLogoHeight } from "@/data/images";

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

  const navText = solidNav ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white";
  const menuIcon = solidNav ? "text-foreground" : "text-white";

  const closeMenus = () => {
    setCategoriesOpen(false);
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        animate={{ height: solidNav ? 96 : 104 }}
        className={`transition-all duration-300 ${
          solidNav ? "glass-nav shadow-sm border-b border-border/60" : "bg-navy/40 backdrop-blur-md"
        }`}
      >
        <Container className="h-full flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex shrink-0 items-center min-h-11 group">
            <Image
              src={siteLogo}
              alt="Med Way"
              width={siteLogoWidth}
              height={siteLogoHeight}
              quality={100}
              sizes="(max-width: 640px) 260px, (max-width: 1024px) 360px, 480px"
              className="h-14 w-auto transition-opacity group-hover:opacity-90 sm:h-16 md:h-20 lg:h-24"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {/* Products mega menu */}
            <div
              className="relative"
              onMouseEnter={() => setCategoriesOpen(true)}
              onMouseLeave={() => setCategoriesOpen(false)}
            >
              <button
                type="button"
                aria-expanded={categoriesOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1.5 px-4 py-2.5 min-h-11 text-sm font-medium transition-all rounded-lg ${
                  categoriesOpen || isProductsActive
                    ? solidNav
                      ? "text-primary bg-primary/10"
                      : "text-white bg-white/10"
                    : navText
                }`}
              >
                Products
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${categoriesOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Hover bridge — prevents menu closing when moving cursor down */}
              <div className="absolute left-0 right-0 top-full h-3" aria-hidden />

              <AnimatePresence>
                {categoriesOpen && (
                  <ProductsMegaMenuDesktop onNavigate={() => setCategoriesOpen(false)} />
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2.5 min-h-11 inline-flex items-center text-sm font-medium transition-colors rounded-lg ${navText} ${
                  pathname === link.href ? "text-primary bg-primary/10" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button
              href="/contact"
              variant={solidNav ? "primary" : "white"}
              size="sm"
              showArrow={false}
            >
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
        </Container>
      </motion.div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-24 bg-navy/40 backdrop-blur-sm lg:hidden z-40"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu overlay"
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-xl z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto"
            >
              <div className="px-4 sm:px-6 py-5 space-y-5">
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
