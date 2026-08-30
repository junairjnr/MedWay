"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { vitalImages } from "@/data/images";
import { solutions } from "@/data/solutions";

export default function SolutionsPreview() {
  return (
    <section className="py-24 bg-navy text-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary-light mb-4">Solutions</p>
        <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-4">More Than Products.</h2>
        <p className="text-2xl font-display font-bold text-white/80 mb-16">Complete Mobility Solutions.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href="/solutions" className="group relative block h-64 overflow-hidden">
                <Image src={s.image} alt={s.title} fill className="object-cover opacity-50 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700" sizes="600px" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
                <div className="absolute bottom-0 p-6">
                  <h3 className="font-display font-bold text-xl mb-2">{s.title}</h3>
                  <p className="text-white/60 text-sm mb-3">{s.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-light">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
