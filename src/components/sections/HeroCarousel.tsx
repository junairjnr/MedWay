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
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef(0);
  const slides = siteContent.heroSlides;
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const goTo = useCallback(
    (index: number, dir: number) => {
      if (index === current) return;
      setDirection(dir);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, 1);
  }, [current, goTo, slides.length]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, -1);
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
      <div className="relative min-h-[460px] sm:min-h-[500px] lg:min-h-[600px] pb-24 sm:pb-28 lg:pb-12">
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
                  className="object-cover object-center"
                  priority={i === 0}
                  sizes="100vw"
                  quality={isMobile ? 75 : 85}
                />
                <div className="absolute inset-0 bg-navy/20" aria-hidden />
              </div>
            </div>
          ))}
          {/* Global overlays — light scrim for readable text */}
          <div className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(ellipse_at_24%_42%,rgba(26,35,50,0.55),transparent_65%)]" />
          <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-r from-navy/70 via-navy/45 to-navy/25 sm:via-navy/35 sm:to-navy/15 lg:via-navy/30 lg:to-transparent" />
          <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-t from-navy/75 via-navy/30 to-transparent" />
          <div className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(ellipse_at_20%_50%,rgba(15,118,110,0.12),transparent_55%)]" />
        </div>

        {!isMobile && (
          <div className="hero-glow pointer-events-none absolute -right-32 top-1/4 hidden h-96 w-96 rounded-full bg-primary/20 blur-[100px] lg:block" aria-hidden />
        )}

        <Container className="relative z-10 flex min-h-[400px] sm:min-h-[440px] lg:min-h-[560px] items-center pt-6 pb-4 sm:pt-10 sm:pb-6 lg:py-16">
          <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
            <div className="hero-copy-panel max-w-2xl">
              <div className="mb-3 flex flex-wrap items-center gap-2 sm:mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-light/30 bg-primary/25 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-primary-light sm:text-xs">
                  <Sparkles className="h-3 w-3 shrink-0" />
                  {slide.badge}
                </span>
                {slide.price && <span className="sale-tag">{slide.price}</span>}
              </div>

              <h1 className="font-display text-[1.75rem] font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-4xl lg:text-[3.5rem]">
                {slide.title}
              </h1>

              {slide.note && (
                <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)] sm:mt-3 sm:text-base">{slide.note}</p>
              )}

              <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:gap-3">
                <Button href={slide.href} variant="white" size="lg" showArrow={false} fullWidth className="sm:w-auto rounded-full px-7">
                  {slide.cta}
                </Button>
                <Button
                  href="/products"
                  variant="outline"
                  size="lg"
                  showArrow={false}
                  fullWidth
                  className="sm:w-auto rounded-full border-white/30 text-white hover:border-primary-light hover:bg-white/10"
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
                  onClick={() => goTo(i, i > current ? 1 : -1)}
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

        <div className="absolute bottom-5 left-0 right-0 z-20 sm:bottom-6 lg:hidden">
          <Container className="flex items-center gap-3 px-4 sm:px-6">
            <div className="flex flex-1 gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i, i > current ? 1 : -1)}
                  className="flex h-9 flex-1 items-center justify-center py-2"
                  aria-label={`Slide ${i + 1}`}
                  aria-current={i === current ? "true" : undefined}
                >
                  <span className="relative h-1 w-full overflow-hidden rounded-full bg-white/25">
                    {i === current && !reduced ? (
                      <span
                        key={`progress-${current}-${direction}`}
                        className="hero-progress-bar absolute inset-y-0 left-0 block rounded-full bg-primary-light"
                        style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                      />
                    ) : (
                      <span
                        className={`block h-full rounded-full transition-colors duration-300 ${
                          i === current ? "w-full bg-primary-light" : "w-0 bg-primary-light/0"
                        }`}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
            <span className="shrink-0 text-xs font-medium tabular-nums text-white/70">
              {current + 1}/{slides.length}
            </span>
          </Container>
        </div>
      </div>

      <TrustStatsBar />
    </section>
  );
}
