import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import { vitalImages } from "@/data/images";
import { solutions } from "@/data/solutions";

export const metadata = {
  title: "Solutions | Med Way",
  description: "Complete mobility solutions — personal mobility, home care, professional care, and rentals.",
};

export default function SolutionsPage() {
  return (
    <div className="pt-24 sm:pt-[6.5rem] bg-background">
      <PageHero
        title="Complete Mobility Solutions"
        description="More than products — end-to-end support for personal mobility, home care, and professional environments."
        eyebrow="Solutions"
        image={vitalImages.sections.emotional}
        imageAlt="Mobility solutions"
      />
      <Container className="page-content space-y-12 sm:space-y-16 lg:space-y-20">
        {solutions.map((s, i) => (
          <article
            key={s.slug}
            className="grid grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12"
          >
            <div className={`min-w-0 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <p className="section-accent text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3">
                Solution {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl mb-3 sm:mb-4">{s.title}</h2>
              <p className="text-base sm:text-lg font-medium text-primary mb-3 sm:mb-4">{s.description}</p>
              <p className="text-muted leading-relaxed text-sm sm:text-base">{s.detail}</p>
            </div>
            <div className={`relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <Image src={s.image} alt={s.title} fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="(max-width: 1024px) 100vw, 600px" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent pointer-events-none" />
            </div>
          </article>
        ))}
      </Container>
    </div>
  );
}
