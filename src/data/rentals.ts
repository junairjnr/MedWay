import { hospitalBedImage, patientLiftImage, vitalImages } from "./images";
import { getRentalSeoPage, rentalSeoPages } from "./rental-seo-content";

export interface RentalItem {
  slug: string;
  title: string;
  description: string;
  detail: string;
  image: string;
  highlights: string[];
}

/** Listing cards — titles/descriptions align with SEO pages where available. */
export const rentalItems: RentalItem[] = [
  {
    slug: "hospital-bed-rental",
    title: "Hospital Bed Rental",
    description: "Home hospital beds for recovery, post-surgery care, and long-term support in Brampton.",
    detail:
      "Rent full-electric hospital beds with professional delivery and setup in Brampton and the GTA.",
    image: hospitalBedImage,
    highlights: ["Delivery & setup available", "From $140/month", "Brampton & GTA service"],
  },
  {
    slug: "patient-lift-rental",
    title: "Patient Lift Rental",
    description: "Battery-powered Hoyer patient lifts with sling sizing and training in Brampton.",
    detail:
      "Patient lift rentals with delivery, setup and caregiver walk-through across Brampton and Mississauga.",
    image: patientLiftImage,
    highlights: ["From $150/week", "Sling included", "Setup & training"],
  },
  {
    slug: "wheelchair-rental",
    title: "Wheelchair & Transport Chair Rental",
    description: "Practical mobility support for everyday movement and short trips.",
    detail:
      "Rent manual wheelchairs, transport chairs, and related mobility aids for home use, appointments, and recovery in Brampton and the GTA.",
    image: vitalImages.categories.wheelchairs,
    highlights: ["Manual & transport options", "Fast availability", "Ideal for temporary needs"],
  },
  {
    slug: "mobility-scooter-rental",
    title: "Mobility Scooter Rental",
    description: "Travel and full-size scooters by the day, week or month in Brampton.",
    detail:
      "Scooter rentals with delivery, setup and pickup across Brampton and Mississauga.",
    image: vitalImages.categories["mobility-scooters"],
    highlights: ["From $75/day", "Travel & standard options", "Flexible rental periods"],
  },
];

export function getRentalBySlug(slug: string): RentalItem | undefined {
  return rentalItems.find((item) => item.slug === slug);
}

export function getRelatedRentals(slug: string, limit = 3): RentalItem[] {
  return rentalItems.filter((item) => item.slug !== slug).slice(0, limit);
}

export function rentalHasSeoContent(slug: string): boolean {
  return Boolean(getRentalSeoPage(slug));
}

export const rentalsPage = {
  hero: {
    title: "Medical Equipment Rentals",
    description:
      "Flexible home health care and mobility equipment rentals for short-term recovery, trial periods, and long-term care across Brampton, Mississauga, Toronto, the GTA, and Canada.",
    eyebrow: "Rentals",
    image: hospitalBedImage,
  },
  intro:
    "Medway Mobility offers reliable medical equipment rentals when you need quality solutions without a long-term purchase. Our team delivers, sets up, and supports your rental so you can focus on comfort and recovery at home.",
  sections: rentalItems,
};

const rentalsPromoFeaturedSlide = {
  title: rentalsPage.hero.title,
  description: "Flexible home health care and mobility rentals — Brampton, Mississauga, Toronto & GTA.",
  image: rentalsPage.hero.image,
  tag: "Featured" as const,
};

export const rentalsPromoSlides = [
  rentalsPromoFeaturedSlide,
  ...rentalItems
    .filter((section) => section.image !== rentalsPage.hero.image)
    .map((section) => ({
      title: section.title,
      description: section.description,
      image: section.image,
      tag: section.highlights[0],
    })),
];

/** Old slugs → new SEO URLs (for redirects). */
export const rentalSlugRedirects: Record<string, string> = {
  "hospital-beds": "hospital-bed-rental",
  "mobility-scooters": "mobility-scooter-rental",
  "patient-lifts": "patient-lift-rental",
  wheelchairs: "wheelchair-rental",
};

export { rentalSeoPages, getRentalSeoPage };
