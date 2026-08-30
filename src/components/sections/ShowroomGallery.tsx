"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { vitalImages } from "@/data/images";
import Container from "@/components/ui/Container";

/** Bento spans — simplified on mobile to avoid layout breaks */
const spanClass: Record<string, string> = {
  large: "col-span-2 min-h-[150px] sm:min-h-[190px] md:row-span-2 md:min-h-[260px]",
  tall: "col-span-1 min-h-[120px] sm:min-h-[150px] md:row-span-2 md:min-h-[320px]",
  wide: "col-span-2 min-h-[120px] sm:min-h-[150px]",
  normal: "col-span-1 min-h-[120px] sm:min-h-[150px]",
};

export default function ShowroomGallery() {
  return (
    <section className="section-py relative overflow-hidden bg-navy">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(20,184,166,0.12),transparent_60%)]" aria-hidden />
      <Container className="relative">
        <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:mb-8 sm:flex-row sm:items-end sm:gap-4">
          <div className="min-w-0">
            <p className="section-accent mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-light sm:mb-3">
              Real Showrooms
            </p>
            <h2 className="font-display text-xl font-extrabold tracking-tight text-white sm:text-2xl lg:text-3xl">
              See It Before You Buy
            </h2>
            <p className="mt-1.5 max-w-xl text-xs text-white/65 sm:mt-2 sm:text-sm">
              Visit our Toronto stores or browse online with the same expert guidance.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition-all hover:border-primary hover:bg-primary sm:px-5 sm:py-2.5 sm:text-sm"
          >
            <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Find a Showroom
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 md:grid-cols-4 md:gap-3">
          {vitalImages.gallery.map((item, i) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.45 }}
              className={`group relative overflow-hidden rounded-xl sm:rounded-2xl ${spanClass[item.span]}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-1.5 p-2.5 sm:gap-2 sm:p-3 md:p-4">
                <p className="line-clamp-2 text-[9px] font-semibold leading-snug text-white/90 sm:text-[10px] md:text-xs">
                  {item.alt}
                </p>
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 opacity-0 backdrop-blur transition-all group-hover:opacity-100 sm:h-7 sm:w-7">
                  <ArrowUpRight className="h-3 w-3 text-white sm:h-3.5 sm:w-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
