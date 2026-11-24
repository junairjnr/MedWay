"use client";

import { rentalItems, rentalsPage } from "@/data/rentals";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import MotionInView from "@/components/animations/MotionInView";
import { FeaturedRental, RentalTile, splitFeaturedRentals } from "@/components/rentals/RentalShowcase";

export default function FeaturedRentals() {
  const { hero } = rentalsPage;
  const { featured, rest } = splitFeaturedRentals();

  return (
    <Section className="bg-background">
      <MotionInView className="mb-6 flex flex-col items-start justify-between gap-4 sm:mb-8 sm:flex-row sm:items-end">
        <div className="min-w-0 max-w-2xl">
          <p className="section-accent mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary sm:mb-3">
            {hero.eyebrow}
          </p>
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {hero.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{hero.description}</p>
        </div>
        <Button href="/rentals" variant="outline" size="sm" showArrow={false} className="shrink-0 rounded-full">
          View All Rentals
        </Button>
      </MotionInView>

      {rentalItems.length === 0 || !featured ? (
        <div className="surface-card px-6 py-12 text-center">
          <p className="text-muted">
            Rental options are being updated. Contact our team and we will help you find the right equipment.
          </p>
          <Button href="/contact" size="md" className="mt-6 rounded-full">
            Enquire About Rentals
          </Button>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-5">
          <FeaturedRental item={featured} heading="h3" />
          {rest.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {rest.map((item) => (
                <RentalTile key={item.slug} item={item} heading="h3" />
              ))}
            </div>
          )}
        </div>
      )}
    </Section>
  );
}
