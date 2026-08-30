"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Product, formatPrice } from "@/data/products";
import { usePrefersReducedMotion } from "@/components/animations/usePrefersReducedMotion";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
  featured?: boolean;
}

export default function ProductCard({ product, compact = true, featured = false }: ProductCardProps) {
  const reduced = usePrefersReducedMotion();
  const isCompact = compact || featured;

  const imageAspect = featured
    ? "aspect-[4/3] sm:aspect-square"
    : isCompact
      ? "aspect-square"
      : "aspect-[4/5] sm:aspect-[3/4]";

  return (
    <motion.div
      whileHover={reduced ? undefined : { y: -6 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link
        href={`/products/${product.slug}`}
        className="group surface-card flex h-full flex-col overflow-hidden hover:shadow-[0_16px_40px_rgba(15,118,110,0.14)]"
      >
        <div className={`relative overflow-hidden bg-slate-100 ${imageAspect}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
              featured ? "object-center" : "object-center"
            }`}
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          {product.originalPrice && (
            <span className="absolute top-1.5 left-1.5 rounded-full bg-gradient-to-r from-primary to-primary-light px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white shadow-md sm:top-2 sm:left-2 sm:px-2.5 sm:text-[9px]">
              Sale
            </span>
          )}
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
          className={`flex flex-1 flex-col border-t border-border/50 bg-white ${
            featured ? "p-2 sm:p-2.5" : isCompact ? "p-2.5 sm:p-3" : "p-4 sm:p-5"
          }`}
        >
          <p className="mb-0.5 line-clamp-1 text-[8px] font-bold uppercase tracking-widest text-primary sm:text-[9px]">
            {product.brand}
          </p>
          <h3
            className={`font-display line-clamp-2 font-bold leading-snug text-foreground transition-colors group-hover:text-primary ${
              featured ? "text-[11px] sm:text-xs" : isCompact ? "mb-1 text-xs sm:text-sm md:text-base" : "mb-2 text-sm sm:text-lg md:text-xl"
            }`}
          >
            {product.name}
          </h3>
          <div className="mt-auto flex items-end justify-between gap-1.5 pt-0.5 sm:pt-1">
            {product.price ? (
              <div className="min-w-0">
                <p className={`truncate font-bold text-foreground ${featured ? "text-xs sm:text-sm" : isCompact ? "text-sm sm:text-base" : "text-base sm:text-lg"}`}>
                  {formatPrice(product.price)}
                </p>
                {product.originalPrice && (
                  <p className="text-[9px] text-muted line-through sm:text-[10px]">{formatPrice(product.originalPrice)}</p>
                )}
              </div>
            ) : (
              <p className="text-[9px] font-semibold text-primary sm:text-[10px]">Enquire</p>
            )}
            <span className="shrink-0 text-primary sm:hidden" aria-hidden>
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
