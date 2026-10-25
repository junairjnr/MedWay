import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import ServicePageSections from "@/components/service/ServicePageSections";
import { servicePage } from "@/data/service";

import { staticPages } from "@/lib/seo";

export const metadata = staticPages.service;

export default function ServicePage() {
  const { hero, intro, sections } = servicePage;

  return (
    <div className="pt-14 lg:pt-[5.5rem] bg-background">
      <PageHero
        title={hero.title}
        description={hero.description}
        eyebrow={hero.eyebrow}
        image={hero.image}
        imageAlt="Medical equipment service and support"
        size="md"
      />
      <Container className="page-content">
        <ServicePageSections intro={intro} sections={sections} />
      </Container>
    </div>
  );
}
