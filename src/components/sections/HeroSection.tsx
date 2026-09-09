"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/components/animations/usePrefersReducedMotion";

const words = ["MOVE", "WITH", "CONFIDENCE."];

export default function HeroSection() {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(() => setWordIndex((p) => (p < words.length ? p + 1 : p)), 600);
    return () => clearInterval(timer);
  }, [reduced]);

  return (
    <section ref={ref} className="relative h-screen min-h-[640px] overflow-hidden">
      <motion.div style={{ scale: reduced ? 1 : imageScale }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1576092768241-dec231879aa3?w=1920&h=1080&fit=crop"
          alt="Mobility with confidence"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy/80" />
      </motion.div>

      <Container as="div" className="relative z-10 flex h-full flex-col justify-center pt-20">
        <motion.div style={{ y: reduced ? 0 : textY, opacity: reduced ? 1 : opacity }} className="max-w-3xl">
          <h1 className="font-display font-extrabold text-white leading-[0.95] tracking-tight">
            {words.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 60 }}
                animate={i < wordIndex ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="text-white/70 text-base sm:text-lg mt-8 max-w-md leading-relaxed"
          >
            Designed for comfort.<br />Built for independence.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.6 }}
            className="mt-10"
          >
            <Button href="/products" className="bg-white text-navy hover:bg-white/90 !shadow-none">
              Explore Products
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      <motion.div
        style={{ opacity: reduced ? 1 : opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50 text-xs uppercase tracking-widest"
      >
        <span>Scroll to explore</span>
        <ChevronDown className="w-5 h-5 scroll-indicator" />
      </motion.div>
    </section>
  );
}
