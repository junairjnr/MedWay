"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import MotionInView from "@/components/animations/MotionInView";
import { usePrefersReducedMotion } from "@/components/animations/usePrefersReducedMotion";
interface ServiceSection {
  slug: string;
  title: string;
  description: string;
  detail: string;
  image: string;
  highlights: string[];
}

interface ServicePageSectionsProps {
  intro: string;
  sections: ServiceSection[];
}

export default function ServicePageSections({ intro, sections }: ServicePageSectionsProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <>
      <MotionInView>
        <p className="max-w-3xl text-muted leading-relaxed text-sm sm:text-base mb-10 sm:mb-12">{intro}</p>
      </MotionInView>

      <div className="space-y-12 sm:space-y-16 lg:space-y-20">
        {sections.map((section, i) => (
          <motion.article
            key={section.slug}
            initial={reduced ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12"
          >
            <div className={`min-w-0 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <p className="section-accent text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3">
                Service {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl mb-3 sm:mb-4">{section.title}</h2>
              <p className="text-base sm:text-lg font-medium text-primary mb-3 sm:mb-4">{section.description}</p>
              <p className="text-muted leading-relaxed text-sm sm:text-base mb-4 sm:mb-5">{section.detail}</p>
              <ul className="space-y-2">
                {section.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <motion.div
              whileHover={reduced ? undefined : { scale: 1.02 }}
              transition={{ duration: 0.35 }}
              className={`relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg ${i % 2 === 1 ? "lg:order-1" : ""}`}
            >
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent pointer-events-none" />
            </motion.div>
          </motion.article>
        ))}
      </div>

      <MotionInView delay={0.1} className="mt-12 sm:mt-16 surface-card p-6 sm:p-8 text-center">
        <h2 className="font-display font-bold text-xl sm:text-2xl mb-2">Need service or support?</h2>
        <p className="text-muted text-sm sm:text-base mb-6 max-w-2xl mx-auto">
          Reach out for delivery, setup, repairs, or expert advice — our team is ready to help anywhere in Canada.
        </p>
        <Button href="/contact" size="lg" className="rounded-full">
          Contact Our Team
        </Button>
      </MotionInView>
    </>
  );
}
