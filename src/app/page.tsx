import HeroCarousel from "@/components/sections/HeroCarousel";
import { PromoTicker } from "@/components/sections/TrustStatsBar";
import NewsletterStrip from "@/components/sections/NewsletterStrip";
import IntroSection from "@/components/sections/IntroSection";
import ShowroomGallery from "@/components/sections/ShowroomGallery";
import CategoryGrid from "@/components/sections/CategoryGrid";
import HowItWorks from "@/components/sections/HowItWorks";
import PromoBanners from "@/components/sections/PromoBanners";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TrustSection from "@/components/sections/TrustSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
// import BrandsSection from "@/components/sections/BrandsSection";
// import ResourcesSection from "@/components/sections/ResourcesSection";
import BottomCTA from "@/components/sections/BottomCTA";
import ContactCTA from "@/components/sections/ContactCTA";

export default function HomePage() {
  return (
    <>
      <div className="pt-14 lg:pt-[5.5rem]">
        <PromoTicker />
        <HeroCarousel />
      </div>
      <NewsletterStrip />
      <IntroSection />
      <ShowroomGallery />
      <CategoryGrid />
      <HowItWorks />
      <PromoBanners />
      <FeaturedProducts />
      <WhyChooseUs />
      <TrustSection />
      <TestimonialsSection />
      {/* <BrandsSection /> */}
      {/* <ResourcesSection /> */}
      <BottomCTA />
      <ContactCTA />
    </>
  );
}
