"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { siteContent } from "@/data/site-content";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/components/animations/usePrefersReducedMotion";

export default function BottomCTA() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { cta } = siteContent;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.1"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [80, 0, 0, -40]);

  return (
    <section ref={ref} className="relative section-py overflow-hidden">
      <div className="absolute inset-0">
        <Image src={cta.image} alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-navy/88" />
      </div>
      <motion.div
        style={reduced ? {} : { opacity, y }}
        className="relative z-10"
      >
        <Container className="max-w-4xl text-center text-white">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight mb-6 sm:mb-8">
            {cta.headline}
          </h2>
          {cta.paragraphs.slice(0, 2).map((p, i) => (
            <p key={i} className="text-white/70 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">{p}</p>
          ))}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8 sm:mt-10">
            <Button href="/products" variant="white" size="lg" fullWidth className="sm:w-auto">
              Browse Products
            </Button>
            <Button href="/contact" variant="outline" size="lg" fullWidth className="sm:w-auto border-white/30 text-white hover:border-primary-light hover:text-primary-light hover:bg-transparent">
              Contact Us
            </Button>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
