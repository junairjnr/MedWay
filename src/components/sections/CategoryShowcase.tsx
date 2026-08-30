"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { categories } from "@/data/categories";
import { usePrefersReducedMotion } from "@/components/animations/usePrefersReducedMotion";

export default function CategoryShowcase() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 mb-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Explore</p>
        <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight max-w-2xl">
          Explore Our Mobility Solutions
        </h2>
        <p className="text-muted text-lg mt-4 max-w-xl leading-relaxed">
          Thoughtfully selected mobility and healthcare equipment designed around comfort, safety and independence.
        </p>
      </div>
      <div>
        {categories.map((cat, i) => (
          <CategoryRow key={cat.slug} category={cat} reversed={i % 2 === 1} index={i} />
        ))}
      </div>
    </section>
  );
}

function CategoryRow({
  category,
  reversed,
  index,
}: {
  category: (typeof categories)[0];
  reversed: boolean;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.15"] });
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [80, 0, 0, -40]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.04]);

  return (
    <div ref={ref} className={`grid grid-cols-1 lg:grid-cols-2 min-h-[480px] ${index % 2 === 1 ? "bg-background" : "bg-white"}`}>
      <motion.div
        style={reduced ? {} : { opacity, y }}
        className={`flex flex-col justify-center px-5 lg:px-8 py-16 lg:py-24 ${reversed ? "lg:order-2" : ""}`}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">{category.name}</p>
        <h3 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight mb-4">{category.headline}</h3>
        <p className="text-muted leading-relaxed mb-8 max-w-md">{category.description}</p>
        <Link href={`/categories/${category.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-primary group">
          Explore Category <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
      <motion.div
        style={reduced ? {} : { scale: imageScale }}
        className={`relative min-h-[320px] lg:min-h-full overflow-hidden ${reversed ? "lg:order-1" : ""}`}
      >
        <Image src={category.image} alt={category.name} fill className="object-cover" sizes="50vw" />
      </motion.div>
    </div>
  );
}
