import { vitalImages } from "./images";

export const servicesNavLinks = [
  {
    href: "/rentals",
    label: "Rentals",
    description: "Hospital beds, scooters, wheelchairs & more for home care.",
    image: vitalImages.sections.solutions.rentals,
  },
  {
    href: "/products",
    label: "Sales",
    description: "Mobility & home care equipment — shipped across Canada.",
    image: vitalImages.sections.salesArea,
  },
  {
    href: "/service",
    label: "Service",
    description: "Delivery, setup, repairs & expert support when you need it.",
    image: vitalImages.sections.service,
  },
] as const;
