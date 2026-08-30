import { vitalImages } from "./images";

export const resources = [
  {
    slug: "how-to-choose-a-mobility-scooter",
    category: "Mobility Guides",
    title: "How to Choose the Right Mobility Scooter",
    description: "Understand the key features to consider before choosing a scooter.",
    image: vitalImages.sections.resources.scooter,
    content: [
      "Searching for the perfect product to suit your mobility needs? Look no further. Our expert staff are constantly scouring the market for the latest products at the lowest prices – and that's why we can stand 100% behind them!",
      "When choosing a mobility scooter, consider where you'll use it most — indoors, outdoors, or both. 3-wheel scooters offer tighter turning radius for indoor use, while 4-wheel scooters provide greater stability for outdoor terrain.",
      "Weight capacity, battery range, portability, and ease of disassembly are critical factors. For travel, consider auto-folding models like the FOXTR Auto-Fold Scooter. For everyday outdoor use, full-size scooters like the Pride Victory 10 offer extended range and comfort.",
      "Visit our Showrooms, give us a call or shop online with total confidence. Top brands like Drive Medical, VitalFlex, FOXTR Scooters, Pride Mobility, Invacare, Golden Technologies are right at your fingertips.",
    ],
  },
  {
    slug: "wheelchair-buying-guide",
    category: "Mobility Guides",
    title: "Wheelchair Buying Guide",
    description: "Everything you should know before selecting a wheelchair.",
    image: vitalImages.sections.resources.wheelchair,
    content: [
      "Whether you need a manual wheelchair, transport chair, or power wheelchair, understanding your daily needs is the first step toward the right solution.",
      "Transport wheelchairs are lightweight and designed for caregiver-assisted mobility — ideal for short trips and travel. Manual wheelchairs offer self-propulsion for independent users. Power wheelchairs provide motorized mobility for those who need full-time assistance.",
      "Key specifications to review include seat width and depth, weight capacity, turning radius, and portability. Our mobility experts can help you compare options from Invacare, Pride Mobility, Quantum Rehab, and Drive Medical.",
    ],
  },
  {
    slug: "mobility-at-home",
    category: "Home Care",
    title: "Mobility at Home",
    description: "Simple ways to improve comfort and accessibility.",
    image: vitalImages.sections.resources.home,
    content: [
      "At Med Way, we pride ourselves on being the go-to source for top-quality medical equipment in Toronto, the GTA, and across Canada. Our extensive selection includes everything from mobility aids and home hospital beds to bathroom safety products.",
      "Creating a safe home environment starts with the right equipment. Hospital beds like the VitalFlex Elite and Symphony provide comfort and positioning for long-term care. Bathroom safety products including grab bars, shower chairs, and transfer benches reduce fall risk.",
      "Whether you're a medical professional assisting patients in a healthcare setting or an individual seeking essential medical supplies for yourself or a loved one, we've got you covered.",
    ],
  },
  {
    slug: "understanding-mobility-equipment",
    category: "Education",
    title: "Understanding Mobility Equipment",
    description: "A practical guide to choosing the right solution.",
    image: vitalImages.sections.resources.guide,
    content: [
      "For the last 16 years, the team at Med Way has taken pride in being Canada's #1 Medical Equipment Supplier and independent source for Home Health Care Products.",
      "Mobility equipment spans a wide range — from rollators and walkers for mild support, to scooters and power wheelchairs for independent travel, to hospital beds and patient lifts for home care environments.",
      "Our dedicated mobility experts are passionate about helping patients, their families and caregivers to find comfort and independence with their medical equipment supplies. Contact us for personalized guidance.",
    ],
  },
] as const;

export type Resource = (typeof resources)[number];

export function getResourceBySlug(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}
