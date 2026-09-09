import Image from "next/image";
import NewsletterForm from "@/components/forms/NewsletterForm";
import { vitalImages } from "@/data/images";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { siteContact, mailtoHref } from "@/data/site-contact";

const collage = [
  vitalImages.hero.store,
  vitalImages.hero.experts,
  vitalImages.categories["hospital-beds"],
  vitalImages.categories["mobility-scooters"],
];

export default function ContactCTA() {
  return (
    <section className="relative section-py overflow-hidden bg-background">
      <Container>
        <div className="overflow-hidden rounded-2xl bg-navy shadow-2xl ring-1 ring-white/10 sm:rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image collage */}
            <div className="relative grid min-h-[220px] grid-cols-2 grid-rows-2 gap-0.5 p-0.5 sm:min-h-[280px] lg:min-h-[360px]">
              {collage.map((src, i) => (
                <div key={src} className={`relative overflow-hidden ${i === 0 ? "row-span-2" : ""}`}>
                  <Image src={src} alt="" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 400px" />
                  <div className="absolute inset-0 bg-navy/20" />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy/80 lg:block hidden pointer-events-none" />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-12">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-light mb-3">Questions?</p>
              <a href={mailtoHref()} className={`font-medium text-white hover:text-primary-light transition-colors ${siteContact.emailClass}`}>
                {siteContact.email}
              </a>
              <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                Receive helpful mobility advice, product updates and news from our team.
              </p>
              <Button href="/contact" variant="white" size="lg" showArrow={false} className="mt-6 rounded-full w-full sm:w-auto">
                Contact Our Team
              </Button>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <h3 className="font-display text-base font-bold text-white sm:text-lg">Stay Connected</h3>
                <p className="mt-1 text-xs text-white/60 sm:text-sm">Offers &amp; promotions in your mailbox</p>
                <div className="mt-4">
                  <NewsletterForm variant="section" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
