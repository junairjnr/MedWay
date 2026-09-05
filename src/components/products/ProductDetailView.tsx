"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { Product, formatPrice, getRelatedProducts } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import ContactForm from "@/components/forms/ContactForm";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/components/animations/usePrefersReducedMotion";
import { getCategoryBySlug } from "@/data/categories";

interface ProductDetailViewProps {
  product: Product;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const related = getRelatedProducts(product);
  const category = getCategoryBySlug(product.category);

  const { scrollYProgress } = useScroll({ target: contentRef, offset: ["start start", "end end"] });
  const imageScale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);

  return (
    <div className="pt-14 lg:pt-[5.5rem] pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-12">
      <Container className="py-4 sm:py-6">
        <Link href="/products" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors min-h-11">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
      </Container>

      <Container className="pb-8 sm:pb-12 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 xl:gap-20">
          <motion.div
            ref={imageRef}
            style={reduced ? {} : { scale: imageScale }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-100 shadow-md ring-1 ring-black/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image src={product.images[activeImage]} alt={product.name} fill className="object-cover" priority sizes="50vw" />
                </motion.div>
              </AnimatePresence>
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 overflow-hidden border-2 rounded-md touch-target !min-w-0 ${
                      i === activeImage ? "border-primary" : "border-border"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <div ref={contentRef}>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">{category?.name || product.category}</p>
            <h1 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight mb-4">{product.name}</h1>
            <p className="text-sm text-muted mb-4">SKU: {product.sku} · {product.brand}</p>
            {product.price && (
              <p className="text-2xl font-bold mb-6">
                {formatPrice(product.price)}
                {product.originalPrice && <span className="text-muted line-through text-lg ml-3">{formatPrice(product.originalPrice)}</span>}
              </p>
            )}

            <p className="text-lg font-medium mb-4">Designed for freedom. Built for everyday confidence.</p>
            <p className="text-muted leading-relaxed mb-8">{product.description}</p>

            <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
              {product.badges.map((b) => (
                <span key={b} className="text-[10px] sm:text-xs font-semibold bg-primary/10 text-primary px-2.5 sm:px-3 py-1 rounded-full">{b}</span>
              ))}
            </div>

            <Button onClick={() => setShowEnquiry(true)} size="lg" fullWidth className="sm:w-auto sm:min-w-[220px]">
              Request Information
            </Button>

            <section className="mt-16">
              <h2 className="font-display font-bold text-xl mb-4 uppercase tracking-wide">Who It&apos;s For</h2>
              <p className="text-muted leading-relaxed">{product.whoItsFor}</p>
            </section>

            <section className="mt-12">
              <h2 className="font-display font-bold text-xl mb-6 uppercase tracking-wide">Key Benefits</h2>
              <ul className="space-y-3">
                {product.benefits.map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-40px" }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 text-muted"
                  >
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    {b}
                  </motion.li>
                ))}
              </ul>
            </section>

            <section className="mt-12">
              <h2 className="font-display font-bold text-xl mb-6 uppercase tracking-wide">Features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((f) => (
                  <li key={f} className="text-sm text-muted border border-border px-4 py-3">{f}</li>
                ))}
              </ul>
            </section>

            <section className="mt-12">
              <h2 className="font-display font-bold text-lg sm:text-xl mb-4 sm:mb-6 uppercase tracking-wide">Specifications</h2>
              <div className="surface-card overflow-hidden divide-y divide-border">
                {product.specs.map((s) => (
                  <div key={s.label} className="grid grid-cols-2 gap-4 px-4 sm:px-5 py-3 sm:py-3.5 text-sm even:bg-background/60">
                    <span className="font-semibold text-foreground">{s.label}</span>
                    <span className="text-muted text-right sm:text-left">{s.value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12 grid grid-cols-2 gap-4 text-sm">
              {product.maxSpeed && <div><span className="font-semibold block">Max Speed</span><span className="text-muted">{product.maxSpeed}</span></div>}
              {product.range && <div><span className="font-semibold block">Range</span><span className="text-muted">{product.range}</span></div>}
              {product.weightCapacity && <div><span className="font-semibold block">Weight Capacity</span><span className="text-muted">{product.weightCapacity}</span></div>}
              {product.battery && <div><span className="font-semibold block">Battery</span><span className="text-muted">{product.battery}</span></div>}
              {product.dimensions && <div><span className="font-semibold block">Dimensions</span><span className="text-muted">{product.dimensions}</span></div>}
              {product.weight && <div><span className="font-semibold block">Product Weight</span><span className="text-muted">{product.weight}</span></div>}
            </section>

            <section className="mt-12">
              <h2 className="font-display font-bold text-xl mb-4 uppercase tracking-wide">Warranty</h2>
              <p className="text-muted">{product.warranty}</p>
            </section>

            <section className="mt-12">
              <h2 className="font-display font-bold text-xl mb-4 uppercase tracking-wide">Accessories</h2>
              <ul className="flex flex-wrap gap-2">
                {product.accessories.map((a) => (
                  <li key={a} className="text-sm bg-background border border-border px-3 py-1">{a}</li>
                ))}
              </ul>
            </section>

            <section className="mt-12">
              <h2 className="font-display font-bold text-xl mb-4 uppercase tracking-wide">Usage & Care</h2>
              <p className="text-muted mb-3">{product.usageInfo}</p>
              <p className="text-muted">{product.careInfo}</p>
            </section>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16 sm:mt-20 lg:mt-24">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl mb-6 sm:mb-8 lg:mb-10">Related Products</h2>
            <div className="product-grid-featured">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} compact />
              ))}
            </div>
          </div>
        )}
      </Container>

      <AnimatePresence>
        {showEnquiry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowEnquiry(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white max-w-lg w-full p-8 md:p-10 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display font-bold text-2xl mb-2">Request Information</h3>
              <p className="text-muted text-sm mb-6">{product.name}</p>
              <ContactForm productName={product.name} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-0 inset-x-0 lg:hidden z-40 border-t border-border bg-white/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
        <div className="p-3 sm:p-4">
          <Button onClick={() => setShowEnquiry(true)} fullWidth size="lg">
            Talk to an Expert
          </Button>
        </div>
      </div>
    </div>
  );
}
