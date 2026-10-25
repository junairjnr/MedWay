import HeroCarousel from "@/components/sections/HeroCarousel";
import { PromoTicker } from "@/components/sections/TrustStatsBar";
import NewsletterStrip from "@/components/sections/NewsletterStrip";
import IntroSection from "@/components/sections/IntroSection";
import ShowroomGallery from "@/components/sections/ShowroomGallery";
import CategoryGrid from "@/components/sections/CategoryGrid";
import HowItWorks from "@/components/sections/HowItWorks";
// import PromoBanners from "@/components/sections/PromoBanners";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
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
      <h1 className="sr-only">Medical Equipment Rentals &amp; Mobility Products in Toronto</h1>
      <div className="pt-14 lg:pt-[5.5rem]">
        <PromoTicker />
        <HeroCarousel />
      </div>
      <NewsletterStrip />
      <IntroSection />
      <ShowroomGallery />
      <CategoryGrid />
      <HowItWorks />
      {/* <PromoBanners /> */}
      <FeaturedProducts />
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
