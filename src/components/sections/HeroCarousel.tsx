"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { siteContent } from "@/data/site-content";
import { usePrefersReducedMotion } from "@/components/animations/usePrefersReducedMotion";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import TrustStatsBar from "@/components/sections/TrustStatsBar";

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 48, scale: 1.04 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -48, scale: 1.02 }),
};

const textContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const textItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const slides = siteContent.heroSlides;
  const reduced = usePrefersReducedMotion();

  const goTo = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, 1);
  }, [current, goTo, slides.length]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, -1);
  }, [current, goTo, slides.length]);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(next, 6500);
    return () => clearInterval(t);
  }, [next, reduced]);

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="relative min-h-[480px] sm:min-h-[520px] lg:min-h-[600px] pb-24 sm:pb-28 lg:pb-12">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={reduced ? undefined : slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <motion.div
              className="absolute inset-0"
              animate={reduced ? {} : { scale: [1, 1.06] }}
              transition={{ duration: 8, ease: "linear" }}
            >
              <Image src={slide.image} alt={slide.title} fill className="object-cover" priority sizes="100vw" />
            </motion.div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(15,118,110,0.28),transparent_55%)]" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/[0.97] via-navy/72 to-navy/15 lg:via-navy/55 lg:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="hero-glow pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-primary/25 blur-[100px]" aria-hidden />

        <Container className="relative z-10 flex min-h-[420px] sm:min-h-[460px] lg:min-h-[560px] items-center pt-8 pb-4 sm:pt-12 sm:pb-6 lg:py-16">
          <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={reduced ? false : { opacity: 0, x: direction * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? undefined : { opacity: 0, x: direction * -16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl"
              >
                <motion.div
                  variants={reduced ? undefined : textContainer}
                  initial="hidden"
                  animate="show"
                  className="max-w-2xl"
                >
                  <motion.div variants={reduced ? undefined : textItem} className="mb-4 flex flex-wrap items-center gap-2 sm:mb-5">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-light/30 bg-primary/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-primary-light backdrop-blur-sm sm:text-xs">
                      <Sparkles className="h-3 w-3" />
                      {slide.badge}
                    </span>
                    {slide.price && <span className="sale-tag">{slide.price}</span>}
                  </motion.div>

                  <motion.h1
                    variants={reduced ? undefined : textItem}
                    className="font-display text-[2rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.75rem]"
                  >
                    {slide.title}
                  </motion.h1>

                  {slide.note && (
                    <motion.p variants={reduced ? undefined : textItem} className="mt-3 max-w-lg text-sm leading-relaxed text-white/70 sm:mt-4 sm:text-base">
                      {slide.note}
                    </motion.p>
                  )}

                  <motion.div variants={reduced ? undefined : textItem} className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:gap-4">
                    <Button href={slide.href} variant="white" size="lg" showArrow={false} fullWidth className="sm:w-auto rounded-full px-8">
                      {slide.cta}
                    </Button>
                    <Button
                      href="/products"
                      variant="outline"
                      size="lg"
                      showArrow={false}
                      fullWidth
                      className="sm:w-auto rounded-full border-white/25 text-white hover:border-primary-light hover:bg-white/5"
                    >
                      Browse Catalogue
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <div className="hidden flex-col gap-3 lg:flex">
              {slides.map((s, i) => (
                <motion.button
                  key={i}
                  onClick={() => goTo(i, i > current ? 1 : -1)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group flex items-center gap-3 rounded-2xl border p-2 text-left transition-colors duration-300 ${
                    i === current
                      ? "border-primary-light/50 bg-white/10 shadow-lg backdrop-blur-md"
                      : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10"
                  }`}
                >
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/10">
                    <Image src={s.image} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="80px" />
                  </div>
                  <div className="min-w-0 pr-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-primary-light">{s.badge}</p>
                    <p className="mt-0.5 truncate text-sm font-semibold text-white">{s.title}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </Container>

        <button
          onClick={prev}
          className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 touch-target items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-primary sm:left-5 sm:flex"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
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
                  onClick={() => goTo(i, i > current ? 1 : -1)}
                  className="flex h-8 flex-1 items-center justify-center py-2"
                  aria-label={`Slide ${i + 1}`}
                >
                  <span className="h-1 w-full overflow-hidden rounded-full bg-white/25">
                    <motion.span
                      className="block h-full rounded-full bg-primary-light"
                      animate={{ width: i === current ? "100%" : "0%" }}
                      transition={{ duration: 0.35 }}
                    />
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
