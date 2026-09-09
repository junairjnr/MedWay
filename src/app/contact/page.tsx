import { Mail, Phone, MapPin, Clock, LucideIcon } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import { vitalImages } from "@/data/images";
import ContactForm from "@/components/forms/ContactForm";
import { siteContact, mailtoHref, whatsAppHref } from "@/data/site-contact";

export const metadata = {
  title: "Contact | Med Way",
  description: "Contact Med Way for medical equipment enquiries, rentals, and support.",
};

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

type ContactCard = {
  label: string;
  value: string;
  icon: LucideIcon;
  href?: string;
  external?: boolean;
  variant?: "default" | "phone-whatsapp";
};

const contactItems: ContactCard[] = [
  { label: "Email", value: siteContact.email, href: mailtoHref(), icon: Mail },
  { label: "Phone & WhatsApp", value: siteContact.phone, icon: Phone, variant: "phone-whatsapp" },
  { label: "Location", value: "123 Healthcare Blvd, Toronto, ON", icon: MapPin },
  { label: "Hours", value: "Mon–Fri 9am–6pm · Sat 10am–4pm", icon: Clock },
];

function ContactCardContent({ item }: { item: ContactCard }) {
  const Icon = item.icon;

  if (item.variant === "phone-whatsapp") {
    return (
      <div className="surface-card relative h-full overflow-hidden p-5 sm:p-6 transition-transform hover:-translate-y-0.5">
        <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/8" aria-hidden />
        <div className="pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-[#25D366]/10" aria-hidden />
        <div className="relative">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]/15">
              <WhatsAppIcon className="h-5 w-5 text-[#128C7E]" />
            </div>
          </div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-muted">{item.label}</p>
          <p className="text-base font-semibold leading-snug text-foreground sm:text-lg">{item.value}</p>
          <p className="mt-1.5 text-xs leading-relaxed text-muted">Call us directly or chat on WhatsApp.</p>
          <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <a
              href={`tel:${siteContact.phoneTel}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy-light"
            >
              <Phone className="h-4 w-4 shrink-0" />
              Call Now
            </a>
            <a
              href={whatsAppHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#20bd5a]"
            >
              <WhatsAppIcon className="h-4 w-4 shrink-0" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  const valueClass =
    item.label === "Email" ? siteContact.emailClass : "text-sm sm:text-base";

  return (
    <div className="surface-card h-full p-5 sm:p-6 transition-transform hover:-translate-y-0.5">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-muted">{item.label}</p>
      <p className={`font-semibold leading-snug text-foreground ${valueClass}`}>{item.value}</p>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="pt-14 lg:pt-[5.5rem] bg-background bg-pattern">
      <PageHero
        title="Get In Touch"
        description="Our mobility specialists are ready to help you find the right equipment."
        eyebrow="Contact"
        image={vitalImages.sections.contact}
        imageAlt="Med Way showroom"
      />
      <Container className="page-content">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            {contactItems.map((item) => {
              if (item.variant === "phone-whatsapp") {
                return (
                  <div key={item.label} className="min-w-0 md:col-span-2 lg:col-span-1">
                    <ContactCardContent item={item} />
                  </div>
                );
              }

              const content = <ContactCardContent item={item} />;

              return item.href ? (
                <a key={item.label} href={item.href} className="block min-w-0">
                  {content}
                </a>
              ) : (
                <div key={item.label} className="min-w-0">
                  {content}
                </div>
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
