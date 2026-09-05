import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import { vitalImages } from "@/data/images";
import { siteContent } from "@/data/site-content";

export const metadata = {
  title: "About Us | Med Way",
  description: "Canada's Leading Medical Equipment Supplier & Rental Company.",
};

export default function AboutPage() {
  const { intro, cta, trust } = siteContent;

  return (
    <div className="pt-14 lg:pt-[5.5rem] bg-background">
      <PageHero
        title="About Med Way"
        description="Canada's leading medical equipment supplier — helping people move with comfort, confidence and independence."
        eyebrow="Our Story"
        image={vitalImages.sections.about}
        imageAlt="About Med Way"
      />
      <Container className="page-content max-w-4xl">
        <p className="text-lg sm:text-xl font-semibold text-primary mb-6 sm:mb-8 leading-relaxed">{intro.subheadline}</p>
        <div className="space-y-5 sm:space-y-6 text-muted leading-relaxed text-base sm:text-lg">
          {intro.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center surface-card overflow-hidden">
          <div className="relative aspect-video md:aspect-auto md:min-h-[280px] overflow-hidden">
            <Image src={trust.image} alt={trust.headline} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
          </div>
          <div className="p-6 sm:p-8">
            <h2 className="font-display font-bold text-xl sm:text-2xl mb-4">{trust.headline}</h2>
            {trust.paragraphs.map((p, i) => (
              <p key={i} className="text-muted leading-relaxed mb-3 text-sm sm:text-base">{p}</p>
            ))}
          </div>
        </div>

        <div className="mt-10 sm:mt-12 space-y-5 text-muted leading-relaxed text-sm sm:text-base surface-card p-6 sm:p-8">
          {cta.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </Container>
    </div>
  );
}
