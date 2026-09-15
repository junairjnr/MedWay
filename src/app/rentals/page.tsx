import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { rentalsPage } from "@/data/rentals";

export const metadata = {
  title: "Rentals | Med Way",
  description: "Medical equipment and mobility rentals for home care — hospital beds, scooters, wheelchairs, and more.",
};

export default function RentalsPage() {
  const { hero, intro, sections } = rentalsPage;

  return (
    <div className="pt-14 lg:pt-[5.5rem] bg-background">
      <PageHero
        title={hero.title}
        description={hero.description}
        eyebrow={hero.eyebrow}
        image={hero.image}
        imageAlt="Medical equipment rentals"
      />
      <Container className="page-content">
        <p className="max-w-3xl text-muted leading-relaxed text-sm sm:text-base mb-10 sm:mb-12">{intro}</p>

        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
          {sections.map((section, i) => (
            <article
              key={section.slug}
              className="grid grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12"
            >
              <div className={`min-w-0 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <p className="section-accent text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3">
                  Rental {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl mb-3 sm:mb-4">{section.title}</h2>
                <p className="text-base sm:text-lg font-medium text-primary mb-3 sm:mb-4">{section.description}</p>
                <p className="text-muted leading-relaxed text-sm sm:text-base mb-4 sm:mb-5">{section.detail}</p>
                <ul className="space-y-2">
                  {section.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent pointer-events-none" />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 surface-card p-6 sm:p-8 text-center">
          <h2 className="font-display font-bold text-xl sm:text-2xl mb-2">Need a rental quote?</h2>
          <p className="text-muted text-sm sm:text-base mb-6 max-w-2xl mx-auto">
            Contact our team to check availability, delivery options, and rental terms for your equipment needs.
          </p>
          <Button href="/contact" size="lg" className="rounded-full">
            Enquire About Rentals
          </Button>
        </div>
      </Container>
    </div>
  );
}
