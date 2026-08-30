import { vitalImages, getCategoryImage } from "./images";

export interface Category {
  slug: string;
  name: string;
  headline: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    slug: "mobility-scooters",
    name: "Mobility Scooters",
    headline: "Discover freedom beyond your doorstep.",
    description: "Designed for everyday freedom and independent travel.",
    image: getCategoryImage("mobility-scooters"),
  },
  {
    slug: "wheelchairs",
    name: "Wheelchairs",
    headline: "Comfortable and reliable mobility for everyday life.",
    description: "Comfortable and reliable mobility solutions for everyday life.",
    image: getCategoryImage("wheelchairs"),
  },
  {
    slug: "walkers-rollators",
    name: "Rollators & Walkers",
    headline: "Stable support for confident movement.",
    description: "Stable, lightweight support for confident movement.",
    image: getCategoryImage("walkers-rollators"),
  },
  {
    slug: "power-wheelchairs",
    name: "Power Wheelchairs",
    headline: "Advanced powered mobility built for comfort.",
    description: "Advanced powered mobility designed around comfort and control.",
    image: getCategoryImage("power-wheelchairs"),
  },
  {
    slug: "transport-chairs",
    name: "Transport Chairs",
    headline: "Practical mobility for easy transportation.",
    description: "Practical mobility solutions for easy transportation.",
    image: getCategoryImage("transport-chairs"),
  },
  {
    slug: "hospital-beds",
    name: "Home Hospital Beds",
    headline: "Canada's top selling homecare beds.",
    description: "Shop our exclusive Symphony, VitalFlex and more of Canada's top selling Homecare Beds.",
    image: getCategoryImage("hospital-beds"),
  },
  {
    slug: "lift-chairs",
    name: "Medical Lift Chairs",
    headline: "Canada's Top Lift Chair Brands — Up To 30% OFF",
    description: "Supportive seating designed to make everyday movement easier.",
    image: getCategoryImage("lift-chairs"),
  },
  {
    slug: "bathroom-safety",
    name: "Bathroom Safety",
    headline: "Safety and independence where it matters most.",
    description: "Practical equipment designed to improve safety and independence.",
    image: getCategoryImage("bathroom-safety"),
  },
  {
    slug: "daily-living",
    name: "Daily Living / Rehab",
    headline: "Thoughtful products for everyday activities.",
    description: "Thoughtful products that make everyday activities easier.",
    image: getCategoryImage("daily-living"),
  },
  {
    slug: "patient-care",
    name: "Medical Mattresses & Patient Care",
    headline: "Reliable equipment for caregivers and home care.",
    description: "Medical mattresses, patient lifts and home-care equipment.",
    image: getCategoryImage("patient-care"),
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
