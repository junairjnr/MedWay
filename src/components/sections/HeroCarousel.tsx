"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { heroBannerVideo } from "@/data/images";
import TrustStatsBar from "@/components/sections/TrustStatsBar";
import { usePrefersReducedMotion } from "@/components/animations/usePrefersReducedMotion";

export default function HeroCarousel() {
  const reduced = usePrefersReducedMotion();
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        /* autoplay blocked — first frame still visible */
      });
    }
  }, []);

  return (
    <section className="relative overflow-hidden bg-navy">
      <AnimatePresence mode="wait">
        <motion.div
          key="hero-video"
          className="relative w-full bg-navy h-[min(56.25vw,640px)] min-h-[200px] sm:min-h-[240px]"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <video
          ref={heroVideoRef}
          className="absolute inset-0 h-full w-full object-contain object-center"
          src={heroBannerVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Med Way medical equipment and mobility solutions"
          />
        </motion.div>
      </AnimatePresence>

      <TrustStatsBar />
    </section>
  );
}
