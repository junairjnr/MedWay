"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import Section, { SectionHeader } from "@/components/ui/Section";

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];
  const preview = testimonials.filter((_, i) => i !== active).slice(0, 3);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  return (
    <Section className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(20,184,166,0.12),transparent_60%)]" aria-hidden />
      <div className="relative">
        <SectionHeader
          eyebrow="What Our Customers Say"
          title="Trusted by People Who Value Independence"
          align="center"
          className="max-w-2xl mx-auto [&_h2]:text-white [&_p]:text-white/65"
        />

        <div className="mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45 }}
              className="relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-10"
            >
              <Quote className="absolute left-6 top-6 h-8 w-8 text-primary-light/40 sm:left-8 sm:top-8 sm:h-10 sm:w-10" aria-hidden />
              <blockquote className="relative z-10 pt-6 text-base font-light leading-relaxed text-white/90 sm:text-xl sm:leading-relaxed">
                &ldquo;{t.full}&rdquo;
              </blockquote>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                <div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary-light text-primary-light" />
                    ))}
                  </div>
                  <p className="mt-2 text-sm font-semibold text-white">{t.name}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={prev} className="touch-target flex items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors hover:bg-primary" aria-label="Previous review">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button onClick={next} className="touch-target flex items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors hover:bg-primary" aria-label="Next review">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Preview cards */}
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
            {preview.map((item) => {
              const idx = testimonials.indexOf(item);
              return (
                <button
                  key={item.id}
                  onClick={() => setActive(idx)}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 text-left transition-all hover:border-primary-light/30 hover:bg-white/10"
                >
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-primary-light/80 text-primary-light/80" />
                    ))}
                  </div>
                  <p className="text-xs leading-relaxed text-white/70 line-clamp-2">{item.excerpt}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
