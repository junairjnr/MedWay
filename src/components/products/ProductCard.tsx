"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Product, getProductDisplayName } from "@/data/products";
import { getPhotoCoverClassName } from "@/data/images";
import { usePrefersReducedMotion } from "@/components/animations/usePrefersReducedMotion";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
  featured?: boolean;
  /** Homepage popular row — smaller single-line cards */
  strip?: boolean;
}

export default function ProductCard({ product, compact = true, featured = false, strip = false }: ProductCardProps) {
  const reduced = usePrefersReducedMotion();
  const isCompact = compact || featured;
  const displayName = getProductDisplayName(product);

  const isHospitalBed = product.category === "hospital-beds";
  const imageAspect = strip
    ? "aspect-square max-h-[5.25rem] sm:max-h-[5.75rem] lg:max-h-none"
    : isCompact
      ? "aspect-square"
      : isHospitalBed
      ? "aspect-[4/3]"
      : "aspect-[4/5] sm:aspect-[3/4]";

  return (
    <motion.div
      whileHover={reduced ? undefined : { y: strip ? -3 : -6 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link
        href={`/products/${product.slug}`}
        className={`group flex h-full flex-col overflow-hidden transition-shadow duration-300 ${
          featured
            ? "surface-card ring-1 ring-white/15 hover:shadow-[0_12px_32px_rgba(15,118,110,0.2)]"
            : "surface-card hover:shadow-[0_16px_40px_rgba(15,118,110,0.14)]"
        }`}
      >
        <div className={`relative overflow-hidden bg-slate-50 ${imageAspect}`}>
          <Image
            src={product.image}
            alt={displayName}
            fill
            className={`${getPhotoCoverClassName(product.image, "transition-transform duration-700")} ${
              isHospitalBed
                ? "scale-[1.18] sm:scale-[1.22] group-hover:scale-[1.26]"
                : "group-hover:scale-105"
            }`}
            sizes={
              strip
                ? "(max-width: 1024px) 46vw, 16vw"
                : "(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
            }
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          {product.inStock ? (
            <span className="absolute top-1.5 right-1.5 rounded-full border border-primary/10 bg-white/95 px-1.5 py-0.5 text-[8px] font-semibold text-primary shadow-sm sm:top-2 sm:right-2 sm:px-2 sm:text-[9px]">
              In Stock
            </span>
          ) : (
            <span className="absolute top-1.5 right-1.5 rounded-full bg-navy/80 px-1.5 py-0.5 text-[8px] font-semibold text-white sm:top-2 sm:right-2 sm:px-2">
              Enquire
            </span>
          )}
          {!featured && (
            <span className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 translate-y-3 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-navy opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:inline-flex">
              View Details <ArrowRight className="h-3 w-3" />
            </span>
          )}
        </div>

        <div
          className={`flex flex-col border-t border-border/50 bg-white ${
            strip ? "p-2 sm:p-2.5" : isCompact ? "p-2.5 sm:p-3" : "flex-1 p-4 sm:p-5"
          }`}
        >
          <h3
            className={`font-display line-clamp-2 font-bold leading-snug text-foreground transition-colors group-hover:text-primary ${
              strip
                ? "mb-0.5 text-[10px] sm:text-xs"
                : isCompact
                  ? "mb-1 text-xs sm:text-sm md:text-base"
                  : "mb-2 text-sm sm:text-lg md:text-xl"
            }`}
          >
            {displayName}
          </h3>
          <div className={`flex items-end justify-between gap-1.5 pt-0.5 sm:pt-1 ${!isCompact ? "mt-auto" : ""}`}>
            <p className={`font-semibold text-primary ${strip ? "text-[8px] sm:text-[9px]" : "text-[9px] sm:text-[10px]"}`}>
              Enquire for details
            </p>
            <span className="shrink-0 text-primary sm:hidden" aria-hidden>
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
