import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { rentalItems, rentalsPage } from "@/data/rentals";
import { getPhotoCoverClassName } from "@/data/images";
import JsonLd from "@/components/seo/JsonLd";
import { rentalsPageJsonLd, staticPages } from "@/lib/seo";

export const metadata = staticPages.rentals;

export default function RentalsPage() {
  const { hero, intro } = rentalsPage;

  return (
    <>
      <JsonLd data={rentalsPageJsonLd()} />
      <div className="pt-14 lg:pt-[5.5rem] bg-background bg-pattern">
        <PageHero
          title={hero.title}
          description={hero.description}
          eyebrow={hero.eyebrow}
          image={hero.image}
          imageAlt="Medical equipment rentals"
          size="md"
        />
        <Container className="page-content">
          <p className="max-w-3xl text-muted leading-relaxed text-sm sm:text-base mb-10 sm:mb-12">
            {intro}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            {rentalItems.map((item, i) => (
              <Link
                key={item.slug}
                href={`/rentals/${item.slug}`}
                className="group surface-card overflow-hidden hover:-translate-y-1 flex flex-col h-full transition-transform"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={`${getPhotoCoverClassName(item.image)} group-hover:scale-105 transition-transform duration-500`}
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                    Rental {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="font-display font-bold text-base sm:text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-muted text-sm line-clamp-2 mb-4 flex-1">{item.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary min-h-10">
                    View Details{" "}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
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
    </>
  );
}
