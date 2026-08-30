import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import { resources } from "@/data/resources";
import { vitalImages } from "@/data/images";

export const metadata = {
  title: "Resources | Med Way",
  description: "Mobility guides, buying guides, and educational articles.",
};

export default function ResourcesPage() {
  return (
    <div className="pt-16 sm:pt-[4.5rem] bg-background bg-pattern">
      <PageHero
        title="Knowledge That Moves You Forward"
        description="Expert guides to help you choose the right mobility equipment with confidence."
        eyebrow="Resources"
        image={vitalImages.sections.resources.guide}
        imageAlt="Resources"
        size="md"
      />
      <Container className="page-content">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {resources.map((r) => (
            <Link
              key={r.slug}
              href={`/resources/${r.slug}`}
              className="group surface-card overflow-hidden hover:-translate-y-1 flex flex-col h-full"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={r.image}
                  alt={r.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">{r.category}</p>
                <h2 className="font-display font-bold text-base sm:text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {r.title}
                </h2>
                <p className="text-muted text-sm line-clamp-2 mb-4 flex-1">{r.description}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary min-h-10">
                  Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
