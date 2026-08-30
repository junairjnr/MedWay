"use client";

import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import MotionInView, { MotionStagger, MotionStaggerItem } from "@/components/animations/MotionInView";

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.inStock).slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-navy py-10 sm:py-12 lg:py-14">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_100%,rgba(15,118,110,0.15),transparent_55%)]" aria-hidden />
      <Container className="relative">
        <MotionInView className="mb-5 flex flex-col items-start justify-between gap-3 sm:mb-6 sm:flex-row sm:items-end sm:gap-4">
          <div className="min-w-0">
            <p className="section-accent mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-light sm:mb-3">
              Selected
            </p>
            <h2 className="font-display text-xl font-extrabold tracking-tight text-white sm:text-2xl lg:text-3xl">
              Popular Products
            </h2>
            <p className="mt-1.5 max-w-lg text-xs text-white/65 sm:mt-2 sm:text-sm">
              Hand-picked mobility solutions — scooters, beds, chairs &amp; more.
            </p>
          </div>
          <Button href="/products" variant="white" size="sm" showArrow={false} className="shrink-0 rounded-full">
            View All
          </Button>
        </MotionInView>

        <MotionStagger className="product-grid-featured">
          {featured.map((p) => (
            <MotionStaggerItem key={p.slug}>
              <ProductCard product={p} compact featured />
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </Container>
    </section>
  );
}
