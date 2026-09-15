"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { servicesNavLinks } from "@/data/services-nav";
import Button from "@/components/ui/Button";

interface ServicesMegaMenuProps {
  onNavigate?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function ServicesMegaMenuDesktop({ onNavigate, onMouseEnter, onMouseLeave }: ServicesMegaMenuProps) {
  const featured = servicesNavLinks[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute left-1/2 top-full z-50 w-[min(calc(100vw-2rem),24rem)] -translate-x-1/2 pt-3"
    >
      <div className="overflow-hidden rounded-2xl border border-border/80 bg-white shadow-[0_24px_64px_rgba(26,35,50,0.14)]">
        <div className="relative hidden sm:block h-28 overflow-hidden bg-navy">
          <Image src={featured.image} alt="" fill className="object-cover opacity-55" sizes="384px" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/75 to-navy/30" />
          <div className="relative z-10 flex h-full flex-col justify-end p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-light">Sales & Services</p>
            <p className="mt-1 font-display text-sm font-bold text-white">Buy, rent, or get expert support</p>
          </div>
        </div>

        <div className="p-2 sm:p-3">
          <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted sm:hidden">
            Sales & Services
          </p>
          <div className="space-y-1">
            {servicesNavLinks.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.2 }}
              >
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="group flex items-start gap-3 rounded-xl p-2.5 hover:bg-primary/[0.06] transition-colors"
                >
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-slate-50 border border-border/60 group-hover:border-primary/25 transition-colors">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="44px"
                    />
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted line-clamp-2">{item.description}</p>
                  </div>
                  <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-2 border-t border-border/70 pt-2.5 px-1">
            <Link
              href="/contact"
              onClick={onNavigate}
              className="inline-flex min-h-9 w-full items-center justify-center rounded-lg bg-primary/10 px-3 text-xs font-semibold text-primary hover:bg-primary/15 transition-colors"
            >
              Questions? Contact our team
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesMegaMenuMobile({ onNavigate }: ServicesMegaMenuProps) {
  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-xl bg-navy px-4 py-4">
        <div className="absolute inset-0 opacity-30">
          <Image src={servicesNavLinks[1].image} alt="" fill className="object-cover" sizes="400px" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/70" />
        <div className="relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary-light">Sales & Services</p>
          <p className="mt-1 font-display text-base font-bold text-white">Buy, rent, or get support</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {servicesNavLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className="group flex items-center gap-3 rounded-xl border border-border bg-white p-3 hover:border-primary/30 hover:shadow-sm transition-all"
          >
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-50">
              <Image src={item.image} alt="" fill className="object-cover" sizes="48px" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {item.label}
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-muted line-clamp-2">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <Button href="/contact" size="sm" variant="outline" fullWidth showArrow={false} onClick={onNavigate}>
        Contact our team
      </Button>
    </div>
  );
}
