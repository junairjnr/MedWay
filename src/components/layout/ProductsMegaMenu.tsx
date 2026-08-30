"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { categories } from "@/data/categories";
import { getCategoryImage } from "@/data/images";
import Button from "@/components/ui/Button";

interface ProductsMegaMenuProps {
  onNavigate?: () => void;
}

export function ProductsMegaMenuDesktop({ onNavigate }: ProductsMegaMenuProps) {
  const featuredImage = getCategoryImage("mobility-scooters");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-1/2 top-full z-50 w-[min(calc(100vw-2rem),56rem)] -translate-x-1/2 pt-3"
    >
      <div className="overflow-hidden rounded-2xl border border-border/80 bg-white shadow-[0_24px_64px_rgba(26,35,50,0.14)]">
        <div className="grid grid-cols-[minmax(0,15rem)_1fr] xl:grid-cols-[minmax(0,17rem)_1fr]">
          {/* Featured panel */}
          <div className="relative hidden sm:block min-h-full overflow-hidden bg-navy">
            <Image
              src={featuredImage}
              alt="Shop mobility products"
              fill
              className="object-cover opacity-60"
              sizes="280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/40" />
            <div className="relative z-10 flex h-full flex-col justify-between p-5 lg:p-6">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  <Sparkles className="h-3 w-3" />
                  Catalogue
                </span>
                <h3 className="mt-4 font-display text-lg font-extrabold leading-snug text-white lg:text-xl">
                  Find the right mobility solution
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-white/65 lg:text-sm">
                  Scooters, wheelchairs, beds, lift chairs &amp; more — shipped across Canada.
                </p>
              </div>
              <Link
                href="/products"
                onClick={onNavigate}
                className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-light hover:text-white transition-colors"
              >
                Browse all products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Category grid */}
          <div className="bg-white p-4 lg:p-5">
            <div className="mb-3 flex items-center justify-between gap-3 border-b border-border/70 pb-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                Shop by Category
              </p>
              <Link
                href="/products"
                onClick={onNavigate}
                className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-1.5 lg:gap-2 max-h-[min(70vh,22rem)] overflow-y-auto pr-0.5">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.025, duration: 0.2 }}
                >
                  <Link
                    href={`/categories/${cat.slug}`}
                    onClick={onNavigate}
                    className="group flex items-center gap-2.5 rounded-xl p-2 hover:bg-primary/[0.06] transition-colors"
                  >
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-slate-50 border border-border/60 group-hover:border-primary/25 transition-colors">
                      <Image
                        src={cat.image}
                        alt=""
                        fill
                        className="object-contain p-1.5 group-hover:scale-110 transition-transform duration-300"
                        sizes="44px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {cat.name}
                      </p>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2 border-t border-border/70 pt-3">
              <Link
                href="/products"
                onClick={onNavigate}
                className="inline-flex min-h-9 items-center rounded-lg border border-border px-3 text-xs font-semibold hover:border-primary/30 hover:text-primary transition-colors"
              >
                All Products
              </Link>
              <Link
                href="/contact"
                onClick={onNavigate}
                className="inline-flex min-h-9 items-center rounded-lg bg-primary/10 px-3 text-xs font-semibold text-primary hover:bg-primary/15 transition-colors"
              >
                Need help choosing?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProductsMegaMenuMobile({ onNavigate }: ProductsMegaMenuProps) {
  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-xl bg-navy px-4 py-4">
        <div className="absolute inset-0 opacity-30">
          <Image src={getCategoryImage("wheelchairs")} alt="" fill className="object-cover" sizes="400px" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/70" />
        <div className="relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary-light">Products</p>
          <p className="mt-1 font-display text-base font-bold text-white">Explore our catalogue</p>
          <Button href="/products" size="sm" variant="white" showArrow={false} className="mt-3" onClick={onNavigate}>
            View All Products
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            onClick={onNavigate}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white hover:border-primary/30 hover:shadow-sm transition-all"
          >
            <div className="relative aspect-[4/3] bg-slate-50 p-2">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                sizes="45vw"
              />
            </div>
            <div className="border-t border-border/80 px-2.5 py-2">
              <p className="text-[11px] font-semibold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {cat.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
