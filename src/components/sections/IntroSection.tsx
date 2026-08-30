"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { siteContent } from "@/data/site-content";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

const highlights = [
  "Canada-wide sales & GTA rentals",
  "Top brands: Drive, Pride, Invacare & more",
  "Expert staff & integrity pricing",
];

export default function IntroSection() {
  const { intro } = siteContent;

  return (
    <section className="section-py relative overflow-hidden bg-white">
      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/[0.04] to-transparent pointer-events-none" aria-hidden />
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-accent text-xs font-bold uppercase tracking-[0.18em] text-primary mb-4">{intro.eyebrow}</p>
            <h2 className="font-display text-3xl font-extrabold leading-[1.12] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {intro.headline}
            </h2>
            <p className="mt-4 text-lg font-semibold text-primary sm:text-xl">{intro.subheadline}</p>

            <ul className="mt-6 space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted sm:text-base">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>

            {intro.paragraphs.slice(0, 1).map((p, i) => (
              <p key={i} className="mt-6 text-muted leading-relaxed text-sm sm:text-base">{p}</p>
            ))}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/products" size="lg" className="rounded-full">
                Shop Products
              </Button>
              <Button href="/about" variant="outline" size="lg" className="rounded-full">
                Our Story
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="relative pb-8 sm:pb-10 md:pb-0"
          >
            <div className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-primary/20 via-primary-light/10 to-accent/10 blur-sm" aria-hidden />
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
              <Image src={intro.image} alt="Med Way home health care stores Canada" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-3 left-2 max-w-[200px] rounded-xl border border-white/80 bg-white/95 p-3 shadow-xl backdrop-blur-md sm:-bottom-5 sm:-left-4 sm:max-w-[240px] sm:rounded-2xl sm:p-4 md:-bottom-6 md:-left-6">
              <p className="font-display text-2xl font-extrabold text-primary sm:text-3xl">16+</p>
              <p className="mt-1 text-xs font-semibold text-foreground sm:text-sm">Years as Canada&apos;s trusted supplier</p>
              <Link href="/about" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary hover:gap-2 transition-all">
                Learn more <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
