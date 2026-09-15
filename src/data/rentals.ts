import { vitalImages } from "./images";

export const rentalsPage = {
  hero: {
    title: "Medical Equipment Rentals",
    description:
      "Flexible home health care and mobility equipment rentals for short-term recovery, trial periods, and long-term care across Toronto, the GTA, and Canada.",
    eyebrow: "Rentals",
    image: vitalImages.sections.solutions.rentals,
  },
  intro:
    "Med Way offers reliable medical equipment rentals when you need quality solutions without a long-term purchase. Our team delivers, sets up, and supports your rental so you can focus on comfort and recovery at home.",
  sections: [
    {
      slug: "hospital-beds",
      title: "Hospital Bed Rentals",
      description: "Home hospital beds for recovery, post-surgery care, and long-term support.",
      detail:
        "Rent semi-electric and full-electric hospital beds with professional delivery and setup in Toronto and the Greater Toronto Area. Ideal for patients who need safe positioning, caregiver access, and comfortable home care.",
      image: vitalImages.categories["hospital-beds"],
      highlights: ["Delivery & setup available", "Short-term and long-term options", "Toronto & GTA service"],
    },
    {
      slug: "mobility-scooters",
      title: "Mobility Scooter Rentals",
      description: "Stay mobile while travelling or during temporary recovery.",
      detail:
        "Scooter rentals for vacations, seasonal use, or trial before purchase. Our mobility specialists help you choose the right model for indoor, outdoor, or travel needs.",
      image: vitalImages.categories["mobility-scooters"],
      highlights: ["Travel-friendly options", "Expert fitting guidance", "Flexible rental periods"],
    },
    {
      slug: "wheelchairs",
      title: "Wheelchair & Transport Chair Rentals",
      description: "Practical mobility support for everyday movement and short trips.",
      detail:
        "Rent manual wheelchairs, transport chairs, and related mobility aids for home use, appointments, and recovery. Lightweight and easy-to-use options available.",
      image: vitalImages.categories.wheelchairs,
      highlights: ["Manual & transport options", "Fast availability", "Ideal for temporary needs"],
    },
    {
      slug: "patient-lifts",
      title: "Patient Lift Rentals",
      description: "Safe transfer support for caregivers and home care environments.",
      detail:
        "Patient lift rentals help reduce strain during transfers at home. Professional guidance available to ensure safe setup and proper sling compatibility.",
      image: vitalImages.categories["patient-care"],
      highlights: ["Caregiver transfer support", "Setup guidance", "Home care focused"],
    },
  ],
};
