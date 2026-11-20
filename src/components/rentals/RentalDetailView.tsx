import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Phone, Clock } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import RentalSeoContent from "@/components/rentals/RentalSeoContent";
import RentalEnquiryForm from "@/components/forms/RentalEnquiryForm";
import type { RentalItem } from "@/data/rentals";
import { getRelatedRentals } from "@/data/rentals";
import { getRentalSeoPage } from "@/data/rental-seo-content";
import { getPhotoCoverClassName } from "@/data/images";
import { siteContact, whatsAppHref } from "@/data/site-contact";
import type { BreadcrumbItem } from "@/lib/seo";

interface RentalDetailViewProps {
  rental: RentalItem;
  breadcrumbs: BreadcrumbItem[];
}

export default function RentalDetailView({ rental, breadcrumbs }: RentalDetailViewProps) {
  const seo = getRentalSeoPage(rental.slug);
  const related = getRelatedRentals(rental.slug);
  const heroTitle = seo?.h1 ?? rental.title;
  const heroDescription = seo?.metaDescription ?? rental.description;
  const heroAlt = seo?.imageAlts[0] ?? rental.title;

  return (
    <div className="pt-14 lg:pt-[5.5rem] bg-background">
      <PageHero
        title={heroTitle}
        description={heroDescription}
        eyebrow="Rentals"
        image={seo?.image ?? rental.image}
        imageAlt={heroAlt}
        size="md"
      />

      <Container className="page-content">
        <Breadcrumbs items={breadcrumbs} className="mb-8 sm:mb-10" />

        {seo ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
              <div className="lg:col-span-8 min-w-0">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-lg mb-8 sm:mb-10">
                  <Image
                    src={seo.image}
                    alt={seo.imageAlts[0]}
                    fill
                    className={getPhotoCoverClassName(seo.image)}
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                  />
                </div>
                <RentalSeoContent page={seo} />
              </div>

              <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-28 lg:self-start">
                <div className="surface-elevated p-5 sm:p-6">
                  <h2 className="font-display font-bold text-xl mb-2">{seo.requestHeading}</h2>
                  <p className="text-muted text-sm leading-relaxed mb-5">{seo.requestCopy}</p>
                  <RentalEnquiryForm rentalName={seo.pageName} />
                </div>

                <div className="surface-card p-5 sm:p-6 space-y-3 text-sm">
                  <p className="font-display font-bold text-base">Medway Mobility</p>
                  <a
                    href={`tel:${siteContact.phoneTel}`}
                    className="flex items-start gap-2.5 text-muted hover:text-primary transition-colors"
                  >
                    <Phone className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                    {siteContact.phone}
                  </a>
                  <p className="flex items-start gap-2.5 text-muted">
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                    {seo.addressLine}
                  </p>
                  <p className="flex items-start gap-2.5 text-muted">
                    <Clock className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                    Hours: {seo.hours}
                  </p>
                  <Button href={whatsAppHref()} size="sm" className="w-full rounded-full mt-2" showArrow={false}>
                    WhatsApp us
                  </Button>
                </div>
              </aside>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0">
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl mb-3 sm:mb-4">
                About this rental
              </h2>
              <p className="text-muted leading-relaxed text-sm sm:text-base mb-6 sm:mb-8">
                {rental.detail}
              </p>
              <ul className="space-y-2.5 mb-8">
                {rental.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm sm:text-base text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button href="/contact" size="lg" className="rounded-full">
                  Enquire About This Rental
                </Button>
                <Button href="/rentals" variant="outline" size="lg" className="rounded-full" showArrow={false}>
                  All Rentals
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
              <Image
                src={rental.image}
                alt={rental.title}
                fill
                className={getPhotoCoverClassName(rental.image)}
                sizes="(max-width: 1024px) 100vw, 600px"
                priority
              />
            </div>
          </div>
        )}

        {related.length > 0 && (
          <section className="mt-14 sm:mt-16 lg:mt-20">
            <h2 className="font-display font-bold text-xl sm:text-2xl mb-6 sm:mb-8">
              More rental options
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {related.map((item) => (
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
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    <h3 className="font-display font-bold text-sm sm:text-base mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-muted text-xs sm:text-sm line-clamp-2 mb-3 flex-1">
                      {item.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      View Details{" "}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
