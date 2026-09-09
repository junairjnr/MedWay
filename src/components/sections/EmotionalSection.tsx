"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/components/animations/usePrefersReducedMotion";
import Container from "@/components/ui/Container";

export default function EmotionalSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [60, 0, 0, -40]);

  return (
    <section ref={ref} className="relative min-h-[80vh] flex items-center overflow-hidden">
      <motion.div style={{ scale: reduced ? 1 : scale }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1576765608535-5f04a1e78831?w=1920&h=1080&fit=crop"
          alt="Better mobility better life"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/75" />
      </motion.div>

      <Container
        as="div"
        className="relative z-10 max-w-4xl py-24 text-center"
      >
        <motion.div style={reduced ? {} : { opacity: textOpacity, y: textY }}>
        <h2 className="font-display font-extrabold text-white text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-8">
          BETTER MOBILITY.<br />BETTER EVERYDAY LIFE.
        </h2>
        <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Because the right equipment isn&apos;t simply about getting from one place to another.
          It&apos;s about being able to do more. Go further. Stay independent. And live confidently.
        </p>
        </motion.div>
      </Container>
    </section>
  );
}
