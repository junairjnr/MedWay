import { Mail, Phone, MapPin, Clock } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import { vitalImages } from "@/data/images";
import ContactForm from "@/components/forms/ContactForm";

export const metadata = {
  title: "Contact | Med Way",
  description: "Contact Med Way for medical equipment enquiries, rentals, and support.",
};

const contactItems = [
  { label: "Email", value: "info@medway.ca", href: "mailto:info@medway.ca", icon: Mail },
  { label: "Phone", value: "1-800-MED-WAY", href: "tel:1800633929", icon: Phone },
  { label: "Location", value: "123 Healthcare Blvd, Toronto, ON", icon: MapPin },
  { label: "Hours", value: "Mon–Fri 9am–6pm · Sat 10am–4pm", icon: Clock },
];

export default function ContactPage() {
  return (
    <div className="pt-24 sm:pt-[6.5rem] bg-background bg-pattern">
      <PageHero
        title="Get In Touch"
        description="Our mobility specialists are ready to help you find the right equipment."
        eyebrow="Contact"
        image={vitalImages.sections.contact}
        imageAlt="Med Way showroom"
      />
      <Container className="page-content">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {contactItems.map((item) => {
              const Icon = item.icon;
              const inner = (
                <div className="surface-card p-5 sm:p-6 h-full hover:-translate-y-0.5 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1">{item.label}</p>
                  <p className="text-sm sm:text-base font-semibold text-foreground leading-snug">{item.value}</p>
                </div>
              );
              return item.href ? (
                <a key={item.label} href={item.href} className="block">{inner}</a>
              ) : (
                <div key={item.label}>{inner}</div>
              );
            })}
          </div>
          <div className="lg:col-span-3 surface-elevated p-6 sm:p-8 md:p-10 lg:p-12">
            <h2 className="font-display font-bold text-xl sm:text-2xl mb-2">Send a Message</h2>
            <p className="text-muted text-sm mb-6 sm:mb-8">We typically respond within one business day.</p>
            <ContactForm showUpdates />
          </div>
        </div>
      </Container>
    </div>
  );
}
