"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Heart, Building2 } from "lucide-react";
import { siteContent } from "@/data/site-content";
import Container from "@/components/ui/Container";

const pillars = [
  { icon: Building2, title: "Hospitals & Clinics", desc: "Trusted by healthcare professionals" },
  { icon: Heart, title: "Home Care Patients", desc: "Comfort for families across Canada" },
  { icon: Shield, title: "Quality Guaranteed", desc: "Top brands, integrity pricing" },
];

export default function TrustSection() {
  const { trust } = siteContent;

  return (
    <section className="section-py relative overflow-hidden bg-background bg-pattern">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-primary/15 to-transparent blur-md" aria-hidden />
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
              <Image src={trust.image} alt="Trusted medical equipment supplier" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <p className="section-accent text-xs font-bold uppercase tracking-[0.18em] text-primary mb-4">Why Med Way</p>
            <h2 className="font-display text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
              {trust.headline}
            </h2>
            {trust.paragraphs.slice(0, 2).map((p, i) => (
              <p key={i} className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{p}</p>
            ))}

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.title} className="rounded-xl border border-border/80 bg-white p-4 shadow-sm">
                    <Icon className="h-5 w-5 text-primary mb-2" />
                    <p className="text-sm font-bold text-foreground">{pillar.title}</p>
                    <p className="mt-0.5 text-xs text-muted">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
