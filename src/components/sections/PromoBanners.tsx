"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteContent } from "@/data/site-content";
import Container from "@/components/ui/Container";
import MotionInView from "@/components/animations/MotionInView";

export default function PromoBanners() {
  return (
    <section className="bg-background py-6 sm:py-8">
      <Container>
        <MotionInView className="mb-5 sm:mb-6">
          <p className="section-accent text-xs font-bold uppercase tracking-[0.18em] text-primary mb-2">Offers</p>
          <h2 className="font-display text-xl font-extrabold tracking-tight sm:text-2xl">Current Promotions</h2>
        </MotionInView>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {siteContent.promoBanners.map((banner, i) => (
            <MotionInView key={banner.title} delay={i * 0.08} direction={i % 2 === 0 ? "left" : "right"}>
              <Link
                href={banner.href}
                className="group relative block h-44 overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:h-48 md:h-52 lg:h-56"
              >
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/35 to-navy/10" />
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-primary-light sm:text-xs">{banner.title}</p>
                    <p className="font-display text-sm font-bold leading-snug text-white sm:text-base">{banner.subtitle}</p>
                    {"price" in banner && banner.price && (
                      <p className="mt-1 text-sm font-bold text-primary-light">{banner.price}</p>
                    )}
                  </div>
                  <motion.span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(15,118,110,0.9)" }}
                  >
                    <ArrowUpRight className="h-4 w-4 text-white" />
                  </motion.span>
                </div>
              </Link>
            </MotionInView>
          ))}
        </div>
      </Container>
    </section>
  );
}
