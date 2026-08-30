"use client";

import Image from "next/image";
import { vitalImages } from "@/data/images";
import { brands } from "@/data/brands";

function BrandRow({ items, reverse = false }: { items: { name: string; logo: string }[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <div className={`flex shrink-0 gap-4 sm:gap-6 ${reverse ? "marquee-track-reverse" : "marquee-track"}`}>
        {doubled.map((brand, i) => (
          <div
            key={`${brand.name}-${i}`}
            className="flex h-14 w-32 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-white px-4 shadow-sm sm:h-16 sm:w-36"
          >
            <div className="relative h-8 w-full sm:h-9">
              <Image src={brand.logo} alt={brand.name} fill className="object-contain grayscale opacity-70 transition-all hover:grayscale-0 hover:opacity-100" sizes="120px" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BrandsSection() {
  const brandEntries = brands
    .filter((b) => b !== "Med Way" && b !== "Breg" && b !== "Enovis" && b !== "Wellell")
    .map((name) => ({
      name,
      logo: vitalImages.brands[name as keyof typeof vitalImages.brands] || null,
    }))
    .filter((b) => b.logo !== null);

  const half = Math.ceil(brandEntries.length / 2);
  const row1 = brandEntries.slice(0, half);
  const row2 = brandEntries.slice(half);

  return (
    <section className="overflow-hidden border-y border-border bg-white py-12 sm:py-16">
      <div className="mb-8 text-center sm:mb-10">
        <p className="section-accent mx-auto justify-center text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3">Partners</p>
        <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">Brands We Sell</h2>
        <p className="mt-2 text-sm text-muted">Pride, Invacare, Drive, Golden Technologies &amp; more</p>
      </div>
      <div className="space-y-4 sm:space-y-5">
        <BrandRow items={row1} />
        <BrandRow items={row2} reverse />
      </div>
    </section>
  );
}
