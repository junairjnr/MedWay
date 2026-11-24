import PageHero from "@/components/ui/PageHero";
import RentalCatalogue from "@/components/rentals/RentalCatalogue";
import { rentalsPage } from "@/data/rentals";
import JsonLd from "@/components/seo/JsonLd";
import { rentalsPageJsonLd, staticPages } from "@/lib/seo";

export const metadata = staticPages.rentals;

export default function RentalsPage() {
  const { hero } = rentalsPage;

  return (
    <>
      <JsonLd data={rentalsPageJsonLd()} />
      <div className="bg-background pt-14 lg:pt-[5.5rem]">
        <PageHero
          title={hero.title}
          description={hero.description}
          eyebrow={hero.eyebrow}
          image={hero.image}
          imageAlt="Medical equipment rentals"
          size="md"
        />
        <RentalCatalogue />
      </div>
    </>
  );
}
