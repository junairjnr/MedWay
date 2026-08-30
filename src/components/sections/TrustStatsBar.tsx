"use client";

import { motion } from "framer-motion";
import { CreditCard, Truck, Headphones, ShieldCheck, MapPin, Award } from "lucide-react";
import Container from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/components/animations/usePrefersReducedMotion";

const stats = [
  { icon: Award, value: "16+", label: "Years serving Canada" },
  { icon: Truck, value: "Free", label: "Shipping over $100*" },
  { icon: ShieldCheck, value: "100%", label: "Integrity pricing" },
  { icon: Headphones, value: "Expert", label: "Mobility specialists" },
];

export default function TrustStatsBar() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="relative z-20 -mt-3 pb-6 sm:-mt-5 sm:pb-8 lg:-mt-8 lg:pb-10">
      <Container>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduced ? undefined : { y: -4, transition: { duration: 0.2 } }}
                className="group flex items-center gap-2.5 rounded-xl border border-white/80 bg-white/95 px-2.5 py-2.5 shadow-[0_8px_32px_rgba(26,35,50,0.08)] backdrop-blur-md sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3.5 lg:px-5 lg:py-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-dark text-white shadow-sm transition-transform group-hover:scale-105 sm:h-10 sm:w-10 sm:rounded-xl lg:h-11 lg:w-11">
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-base font-extrabold leading-none text-foreground sm:text-lg lg:text-xl">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-[9px] leading-snug text-muted sm:text-[10px] lg:text-xs">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export function PromoTicker() {
  const items = [
    { icon: CreditCard, text: "Buy now, pay later — financing available" },
    { icon: Truck, text: "Canada-wide shipping — free over $100*" },
    { icon: MapPin, text: "Toronto showrooms + coast-to-coast delivery" },
  ];

  return (
    <div className="overflow-hidden border-b border-primary-dark/20 bg-gradient-to-r from-primary-dark via-primary to-primary-dark text-white">
      <div className="marquee-track flex w-max gap-10 py-2.5 text-xs font-semibold tracking-wide">
        {[...items, ...items, ...items].map((item, i) => {
          const Icon = item.icon;
          return (
            <span key={i} className="inline-flex items-center gap-2 whitespace-nowrap px-4">
              <Icon className="h-3.5 w-3.5 shrink-0 text-primary-light" />
              {item.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}
