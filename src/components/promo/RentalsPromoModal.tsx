"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { rentalsPage, rentalsPromoSlides } from "@/data/rentals";
import { usePrefersReducedMotion } from "@/components/animations/usePrefersReducedMotion";

/** Wait before first show and before each re-show after close */
const SHOW_DELAY_MS = 10_000;
const SLIDE_AUTOPLAY_MS = 4500;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

export default function RentalsPromoModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const showTimerRef = useRef<number | null>(null);
  const touchStartX = useRef(0);
  const reduced = usePrefersReducedMotion();
  const slides = rentalsPromoSlides;
  const activeSlide = slides[slideIndex];

  const clearShowTimer = useCallback(() => {
    if (showTimerRef.current) {
      window.clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
  }, []);

  const scheduleShow = useCallback(() => {
    clearShowTimer();
    if (pathname === "/rentals") return;

    showTimerRef.current = window.setTimeout(() => {
      setOpen(true);
    }, SHOW_DELAY_MS);
  }, [clearShowTimer, pathname]);

  useEffect(() => {
    setOpen(false);
    scheduleShow();
    return clearShowTimer;
  }, [pathname, scheduleShow, clearShowTimer]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setSlideIndex(0);
      setDirection(1);
    }
  }, [open]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === slideIndex) return;
      setDirection(index > slideIndex ? 1 : -1);
      setSlideIndex(index);
    },
    [slideIndex, slides.length]
  );

  const nextSlide = useCallback(() => {
    goToSlide((slideIndex + 1) % slides.length);
  }, [goToSlide, slideIndex, slides.length]);

  const prevSlide = useCallback(() => {
    goToSlide((slideIndex - 1 + slides.length) % slides.length);
  }, [goToSlide, slideIndex, slides.length]);

  useEffect(() => {
    if (!open || reduced || slides.length <= 1) return;
    const timer = window.setInterval(nextSlide, SLIDE_AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [open, reduced, nextSlide, slides.length]);

  function dismiss() {
    setOpen(false);
    scheduleShow();
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0]?.clientX ?? 0;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) nextSlide();
    else prevSlide();
  }

  const { hero } = rentalsPage;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="rentals-promo-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-5"
        >
          <motion.button
            type="button"
            aria-label="Close rental offer"
            className="absolute inset-0 bg-navy/65 backdrop-blur-sm"
            onClick={dismiss}
          />

          <div className="relative z-10 w-full max-w-lg">
            {!reduced && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -inset-1 rounded-[1.15rem] bg-gradient-to-r from-primary/50 via-primary-light/40 to-primary/50 opacity-80 blur-md"
                animate={{ opacity: [0.45, 0.85, 0.45], scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.94, rotate: -0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
              className="relative flex max-h-[min(90dvh,720px)] w-full flex-col overflow-hidden rounded-2xl border border-primary/15 bg-white shadow-[0_24px_80px_rgba(26,35,50,0.35)]"
              onClick={(e) => e.stopPropagation()}
            >
            <div
              className="relative h-40 overflow-hidden sm:h-48"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {!reduced && slides.length > 1 && (
                <div className="absolute inset-x-0 top-0 z-20 h-1 bg-white/25">
                  <motion.div
                    key={slideIndex}
                    className="h-full w-full origin-left bg-gradient-to-r from-primary-light via-white to-primary-light"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: SLIDE_AUTOPLAY_MS / 1000, ease: "linear" }}
                  />
                </div>
              )}

              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={slideIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <motion.div
                    className="absolute inset-0"
                    initial={false}
                    animate={reduced ? { scale: 1 } : { scale: [1, 1.08, 1] }}
                    transition={{ duration: SLIDE_AUTOPLAY_MS / 1000, ease: "linear" }}
                  >
                    <Image
                      src={activeSlide.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 512px"
                      priority
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/15" />

              <motion.span
                animate={reduced ? {} : { scale: [1, 1.06, 1], boxShadow: ["0 0 0 rgba(255,255,255,0)", "0 0 18px rgba(255,255,255,0.45)", "0 0 0 rgba(255,255,255,0)"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg"
              >
                <motion.span
                  animate={reduced ? {} : { rotate: [0, 12, -12, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex"
                >
                  <Sparkles className="h-3 w-3" aria-hidden />
                </motion.span>
                {hero.eyebrow}
              </motion.span>

              <button
                type="button"
                onClick={dismiss}
                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-navy shadow-sm transition-colors hover:bg-white"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-2 px-4">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goToSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className="touch-target flex h-8 w-8 items-center justify-center"
                  >
                    <motion.span
                      className="block rounded-full bg-white"
                      initial={false}
                      animate={{
                        width: i === slideIndex ? 22 : 8,
                        height: i === slideIndex ? 8 : 8,
                        opacity: i === slideIndex ? 1 : 0.45,
                      }}
                      transition={{ type: "spring", stiffness: 420, damping: 28 }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-y-auto p-5 sm:p-6 md:p-7">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={slideIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">{activeSlide.tag}</p>
                  <h2 id="rentals-promo-title" className="mt-1 font-display text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                    {activeSlide.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{activeSlide.description}</p>
                </motion.div>
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className="relative mt-6"
              >
                {!reduced && (
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute -inset-1 rounded-lg bg-primary/25 blur-md"
                    animate={{ opacity: [0.35, 0.7, 0.35] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                <motion.div
                  whileHover={reduced ? {} : { scale: 1.02 }}
                  whileTap={reduced ? {} : { scale: 0.98 }}
                  className="relative"
                >
                  <Button href="/rentals" size="lg" fullWidth onClick={dismiss}>
                    Explore Rentals
                  </Button>
                </motion.div>
              </motion.div>
              <button
                type="button"
                onClick={dismiss}
                className="mt-3 w-full text-center text-xs text-muted hover:text-foreground transition-colors"
              >
                Not now
              </button>
            </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
