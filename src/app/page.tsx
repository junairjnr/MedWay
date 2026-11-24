import HeroCarousel from "@/components/sections/HeroCarousel";
import { PromoTicker } from "@/components/sections/TrustStatsBar";
import NewsletterStrip from "@/components/sections/NewsletterStrip";
import IntroSection from "@/components/sections/IntroSection";
// Showroom — hidden (keep for restore)
// import ShowroomGallery from "@/components/sections/ShowroomGallery";
// Sales catalogue — hidden (keep for restore)
// import CategoryGrid from "@/components/sections/CategoryGrid";
import FeaturedRentals from "@/components/sections/FeaturedRentals";
import HowItWorks from "@/components/sections/HowItWorks";
// import PromoBanners from "@/components/sections/PromoBanners";
// import FeaturedProducts from "@/components/sections/FeaturedProducts";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TrustSection from "@/components/sections/TrustSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
// import BrandsSection from "@/components/sections/BrandsSection";
// import ResourcesSection from "@/components/sections/ResourcesSection";
import ContactCTA from "@/components/sections/ContactCTA";
import { staticPages } from "@/lib/seo";

export const metadata = staticPages.home;

export default function HomePage() {
  return (
    <>
      <h1 className="sr-only">
        Hospital Bed Rental &amp; Mobility Equipment Rentals in Brampton, Mississauga &amp; Toronto
      </h1>
      <div className="pt-14 lg:pt-[5.5rem]">
        <PromoTicker />
        <HeroCarousel />
      </div>
      <NewsletterStrip />
      <IntroSection />
      {/* Real Showrooms / See It Before You Buy — hidden (keep for restore)
      <ShowroomGallery />
      */}
      {/* Sales catalogue — hidden (keep for restore): category listing + View All Products
      <CategoryGrid />
      */}
      <FeaturedRentals />
      <HowItWorks />
      {/* <PromoBanners /> */}
      {/* Sales catalogue — hidden (keep for restore): popular product listing + View All
      <FeaturedProducts />
      */}
      <WhyChooseUs />
      <TrustSection />
      <TestimonialsSection />
      {/* <BrandsSection /> */}
      {/* <ResourcesSection /> */}
      {/* <BottomCTA /> */}
      <ContactCTA />
    </>
  );
}
