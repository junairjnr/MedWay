"use client";

import { useEffect, useRef } from "react";
import { heroBannerVideo } from "@/data/images";
import TrustStatsBar from "@/components/sections/TrustStatsBar";

export default function HeroCarousel() {
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
      <div className="relative w-full min-h-[min(56vw,420px)] sm:min-h-[min(52vw,480px)] lg:min-h-[min(48vw,640px)] xl:min-h-[600px]">
        <video
          ref={heroVideoRef}
          className="absolute inset-0 h-full w-full object-cover object-center"
          src={heroBannerVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Med Way medical equipment and mobility solutions"
        />
      </div>

      <TrustStatsBar />
    </section>
  );
}
