import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { resources } from "@/data/resources";
import Section, { SectionHeader } from "@/components/ui/Section";

export default function ResourcesSection() {
  return (
    <Section className="bg-background bg-pattern">
      <SectionHeader
        eyebrow="Resources"
        title="Knowledge That Moves You Forward."
        description="Expert guides to help you make confident mobility decisions."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
        {resources.map((r) => (
          <Link
            key={r.slug}
            href={`/resources/${r.slug}`}
            className="group surface-card overflow-hidden hover:-translate-y-1 flex flex-col sm:flex-row h-full"
          >
            <div className="relative aspect-[16/9] sm:aspect-auto sm:w-2/5 sm:min-h-[160px] overflow-hidden shrink-0">
              <Image
                src={r.image}
                alt={r.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 240px"
              />
            </div>
            <div className="p-4 sm:p-5 flex flex-col justify-center flex-1 min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1.5">{r.category}</p>
              <h3 className="font-display font-bold text-sm sm:text-base mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {r.title}
              </h3>
              <p className="text-muted text-xs sm:text-sm line-clamp-2 mb-3 hidden sm:block">{r.description}</p>
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
