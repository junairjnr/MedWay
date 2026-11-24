import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { rentalItems, rentalsPage } from "@/data/rentals";
import { FeaturedRental, RentalTile, splitFeaturedRentals } from "@/components/rentals/RentalShowcase";

export default function RentalCatalogue() {
  const { intro } = rentalsPage;
  const { featured, rest } = splitFeaturedRentals();

  return (
    <>
      <Container className="page-content">
        <p className="mb-8 max-w-[65ch] text-base leading-relaxed text-muted sm:mb-10 sm:text-lg">{intro}</p>

        {rentalItems.length === 0 || !featured ? (
          <div className="rounded-3xl bg-white px-6 py-14 text-center shadow-[0_12px_40px_rgba(26,35,50,0.08)]">
            <p className="mx-auto max-w-md text-muted">
              Rental options are being updated. Contact our team and we will help you find the right equipment.
            </p>
            <Button href="/contact" size="lg" className="mt-6 rounded-full">
              Enquire About Rentals
            </Button>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-5">
            <FeaturedRental item={featured} priority />
            {rest.length > 0 && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                {rest.map((item) => (
                  <RentalTile key={item.slug} item={item} />
                ))}
              </div>
            )}
          </div>
        )}
      </Container>

      <section className="bg-navy">
        <Container className="flex flex-col items-start justify-between gap-6 py-12 sm:flex-row sm:items-center sm:py-16">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">Need a rental quote?</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
              Contact our team to check availability, delivery options, and rental terms for your equipment needs.
            </p>
          </div>
          <Button href="/contact" variant="white" size="lg" className="rounded-full">
            Enquire About Rentals
          </Button>
        </Container>
      </section>
    </>
  );
}
