"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/categories";
import Section, { SectionHeader } from "@/components/ui/Section";

export default function CategoryGrid() {
  const featured = categories.slice(0, 2);
  const rest = categories.slice(2);

  return (
    <Section className="bg-background">
      <SectionHeader
        eyebrow="Catalogue"
        title="Shop by Category"
        description="Mobility scooters, hospital beds, lift chairs, bathroom safety & more — all in one place."
        align="center"
        className="max-w-2xl mx-auto"
      />

      {/* Featured large categories */}
      <div className="mb-3 grid grid-cols-1 gap-3 sm:mb-4 sm:grid-cols-2 sm:gap-4">
        {featured.map((cat, i) => (
          <FeaturedCategoryCard key={cat.slug} category={cat} index={i} />
        ))}
      </div>

      {/* Remaining categories — 2 col mobile, 4 col desktop */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 lg:grid-cols-4">
        {rest.map((cat, i) => (
          <CategoryCard key={cat.slug} category={cat} index={i + 2} compact />
        ))}
      </div>

      <div className="mt-8 text-center sm:mt-10">
        <Link
          href="/products"
          className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-primary/20 bg-white px-8 text-sm font-bold text-primary shadow-sm transition-all hover:border-primary hover:bg-primary hover:text-white hover:shadow-md"
        >
          View All Products
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}

function FeaturedCategoryCard({ category, index }: { category: (typeof categories)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link
        href={`/categories/${category.slug}`}
        className="group relative flex h-44 sm:h-52 md:h-56 overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-2xl"
      >
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary-light">{category.headline.split(".")[0]}</p>
          <h3 className="mt-1 font-display text-xl font-extrabold text-white sm:text-2xl">{category.name}</h3>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-colors group-hover:bg-primary">
            Shop now <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function CategoryCard({
  category,
  index,
  compact = false,
}: {
  category: (typeof categories)[0];
  index: number;
  compact?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: (index % 4) * 0.05, duration: 0.4 }}
    >
      <Link
        href={`/categories/${category.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-border/80 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"
      >
        <div className={`relative overflow-hidden bg-slate-50 ${compact ? "aspect-square p-2" : "aspect-square p-3"}`}>
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-110 sm:p-2"
            sizes="(max-width: 640px) 45vw, 15vw"
          />
        </div>
        <div className="flex min-h-[2.75rem] flex-1 items-center justify-center border-t border-border/60 px-2 py-2 sm:min-h-[3rem] sm:px-3">
          <h3 className="text-center text-[10px] font-semibold leading-snug text-foreground transition-colors group-hover:text-primary line-clamp-2 sm:text-xs">
            {category.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}
