import { vitalImages } from "./images";

export const servicePage = {
  hero: {
    title: "Sales, Service & Support",
    description:
      "From delivery and setup to repairs and ongoing support — Med Way helps you get the most from your medical equipment across Canada.",
    eyebrow: "Service",
    image: vitalImages.sections.howItWorks.support,
  },
  intro:
    "Our service team supports every stage of your equipment journey. Whether you are purchasing, renting, or already using mobility and home care products, we provide dependable help backed by experienced specialists.",
  sections: [
    {
      slug: "delivery-setup",
      title: "Delivery & Setup",
      description: "Professional delivery with setup where you need it.",
      detail:
        "We deliver medical equipment across Canada and provide white-glove setup in Toronto and the GTA. Our team ensures your equipment is placed, assembled, and ready to use safely at home.",
      image: vitalImages.sections.howItWorks.deliver,
      highlights: ["Canada-wide shipping", "White-glove Toronto & GTA setup", "Safe home installation"],
    },
    {
      slug: "repairs-maintenance",
      title: "Repairs & Maintenance",
      description: "Keep your equipment working safely and reliably.",
      detail:
        "From routine maintenance to repair support, our technicians help extend the life of your mobility scooters, hospital beds, lift chairs, and other home medical equipment.",
      image: vitalImages.hero.experts,
      highlights: ["Routine maintenance", "Repair coordination", "Safety-first approach"],
    },
    {
      slug: "expert-consultation",
      title: "Expert Consultation",
      description: "Guidance to help you choose the right solution.",
      detail:
        "Not sure what you need? Our mobility specialists listen to your situation and recommend practical equipment options for sales or rental — with clear, honest guidance.",
      image: vitalImages.sections.howItWorks.consult,
      highlights: ["Personalized recommendations", "Sales & rental guidance", "Friendly expert support"],
    },
    {
      slug: "ongoing-support",
      title: "Ongoing Customer Support",
      description: "Real people ready to help after your purchase or rental.",
      detail:
        "Questions about usage, accessories, or follow-up care? Our team is here with responsive support by phone, email, WhatsApp, and in-store assistance when you need it.",
      image: vitalImages.sections.trust,
      highlights: ["Phone, email & WhatsApp support", "Usage & care guidance", "Dedicated customer care"],
    },
  ],
};
