import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import { vitalImages } from "@/data/images";
import { siteContent } from "@/data/site-content";

export const metadata = {
  title: "About Us | Medway",
  description:
    "Medway is a trusted mobility and home medical equipment company dedicated to comfort, safety, mobility, and independence at home.",
};

export default function AboutPage() {
  const { about } = siteContent;

  return (
    <div className="pt-14 lg:pt-[5.5rem] bg-background">
      <PageHero
        title={about.title}
        description={about.description}
        eyebrow="Our Story"
        image={vitalImages.sections.about}
        imageAlt="About Medway"
      />
      <Container className="page-content max-w-4xl">
        <div className="space-y-5 sm:space-y-6 text-muted text-body leading-relaxed">
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center surface-card overflow-hidden">
          <div className="relative aspect-video md:aspect-auto md:min-h-[280px] overflow-hidden">
            <Image
              src={about.mission.image}
              alt={about.mission.headline}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
          <div className="p-6 sm:p-8">
            <h2 className="font-display font-bold text-xl sm:text-2xl mb-4">{about.mission.headline}</h2>
            {about.mission.paragraphs.map((p, i) => (
              <p key={i} className="text-muted leading-relaxed mb-3 text-sm sm:text-base">
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-10 sm:mt-12 text-muted leading-relaxed text-sm sm:text-base surface-card p-6 sm:p-8">
          <p className="text-body-lg font-semibold text-primary leading-relaxed">{about.lead}</p>
        </div>
      </Container>
    </div>
  );
}
