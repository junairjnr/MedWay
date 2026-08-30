"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { siteContent } from "@/data/site-content";
import { usePrefersReducedMotion } from "@/components/animations/usePrefersReducedMotion";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import TrustStatsBar from "@/components/sections/TrustStatsBar";

const AUTOPLAY_MS = 7000;

function useIsMobile() {
  const [mobile, setMobile] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return mobile;
}

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const slides = siteContent.heroSlides;
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const goTo = useCallback(
    (index: number) => {
      if (index === current) return;
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo, slides.length]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo, slides.length]);

  useEffect(() => {
    slides.forEach((s) => {
      const img = new window.Image();
      img.src = s.image;
    });
  }, [slides]);

  useEffect(() => {
    if (reduced) return;
    const t = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [next, reduced]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? 0;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0]?.clientX ?? 0;
    const diff = touchStartX.current - endX;
    if (Math.abs(diff) < 48) return;
    if (diff > 0) next();
    else prev();
  };

  const slide = slides[current];
  const fadeMs = isMobile ? 700 : 900;

  return (
    <section
      className="relative overflow-hidden bg-navy"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative min-h-[min(72vh,540px)] sm:min-h-[500px] lg:min-h-[600px] pb-6 sm:pb-8 lg:pb-12">
        {/* Image stack — crossfade, no unmount (smooth on mobile) */}
        <div className="absolute inset-0">
          {slides.map((s, i) => (
            <div
              key={s.image}
              className={`hero-slide-layer absolute inset-0 ${i === current ? "hero-slide-active" : "hero-slide-idle"}`}
              style={{ transitionDuration: `${fadeMs}ms` }}
              aria-hidden={i !== current}
            >
              <div className="hero-slide-image absolute inset-0">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover object-[center_28%] sm:object-center"
                  priority={i === 0}
                  sizes="100vw"
                  quality={isMobile ? 75 : 85}
                />
                <div className="absolute inset-0 bg-navy/10 lg:bg-navy/20" aria-hidden />
              </div>
            </div>
          ))}
          {/* Mobile — keep top of photo visible, darken only behind text */}
          <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-t from-navy/90 via-navy/45 to-transparent to-[45%] lg:hidden" />
          {/* Desktop overlays */}
          <div className="pointer-events-none absolute inset-0 z-[5] hidden bg-[radial-gradient(ellipse_at_24%_42%,rgba(26,35,50,0.55),transparent_65%)] lg:block" />
          <div className="pointer-events-none absolute inset-0 z-[5] hidden bg-gradient-to-r from-navy/70 via-navy/45 to-navy/25 lg:block lg:via-navy/30 lg:to-transparent" />
          <div className="pointer-events-none absolute inset-0 z-[5] hidden bg-gradient-to-t from-navy/75 via-navy/30 to-transparent lg:block" />
          <div className="pointer-events-none absolute inset-0 z-[5] hidden bg-[radial-gradient(ellipse_at_20%_50%,rgba(15,118,110,0.12),transparent_55%)] lg:block" />
        </div>

        {!isMobile && (
          <div className="hero-glow pointer-events-none absolute -right-32 top-1/4 hidden h-96 w-96 rounded-full bg-primary/20 blur-[100px] lg:block" aria-hidden />
        )}

        <Container className="relative z-10 flex min-h-[min(72vh,540px)] sm:min-h-[500px] lg:min-h-[560px] items-end justify-start pb-2 pt-28 sm:items-end sm:pb-3 sm:pt-32 lg:items-center lg:py-16 lg:pt-16">
          <div className="grid w-full grid-cols-1 items-end gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
            <div className="hero-copy-panel w-full max-w-md sm:max-w-lg lg:max-w-2xl">
              <div className="mb-2 flex flex-wrap items-center gap-1.5 sm:mb-4 sm:gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-primary-light/30 bg-primary/25 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-primary-light sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs">
                  <Sparkles className="h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3" />
                  {slide.badge}
                </span>
                {slide.price && <span className="sale-tag sale-tag-compact">{slide.price}</span>}
              </div>

              <h1 className="font-display text-xl font-extrabold leading-[1.12] tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:text-3xl lg:text-[3.5rem] lg:leading-[1.1]">
                {slide.title}
              </h1>

              {slide.note && (
                <p className="mt-1.5 hidden max-w-lg text-sm leading-relaxed text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)] sm:mt-3 sm:block sm:text-base">{slide.note}</p>
              )}

              <div className="mt-3 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:gap-3 lg:mt-8">
                <Button href={slide.href} variant="white" size="sm" showArrow={false} fullWidth className="rounded-full px-5 sm:min-h-11 sm:w-auto sm:px-6 sm:py-2.5 sm:text-sm">
                  {slide.cta}
                </Button>
                <Button
                  href="/products"
                  variant="outline"
                  size="sm"
                  showArrow={false}
                  fullWidth
                  className="hidden sm:inline-flex sm:min-h-11 sm:w-auto sm:px-6 sm:py-2.5 sm:text-sm rounded-full border-white/30 text-white hover:border-primary-light hover:bg-white/10"
                >
                  Browse Catalogue
                </Button>
              </div>
            </div>

            <div className="hidden flex-col gap-3 lg:flex">
              {slides.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`group flex items-center gap-3 rounded-2xl border p-2 text-left transition-all duration-300 ${
                    i === current
                      ? "border-primary-light/50 bg-white/10 shadow-lg backdrop-blur-md"
                      : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10"
                  }`}
                >
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/10">
                    <Image src={s.image} alt="" fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="min-w-0 pr-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-primary-light">{s.badge}</p>
                    <p className="mt-0.5 truncate text-sm font-semibold text-white">{s.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Container>

        <button
          type="button"
          onClick={prev}
          className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 touch-target items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-primary sm:left-5 sm:flex"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 touch-target items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-primary sm:right-5 sm:flex"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

      </div>

      <TrustStatsBar />
    </section>
  );
}
