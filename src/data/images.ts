/** High-quality stock photography (Unsplash) + Vital Mobility brand logos */
const VM = "https://www.vitalmobility.ca/wp-content/uploads";

export const siteLogo = "/assets/logo.png";
export const siteLogoWidth = 1979;
export const siteLogoHeight = 570;

/** Verified Unsplash photo IDs (HTTP 200 tested) */
const STOCK = {
  scooterHero: "photo-1773239627185-dca814dd0546",
  scooterBuilding: "photo-1772182966255-3a6300797f8c",
  scooterOutdoor1: "photo-1774537353191-ac0a7927c5c0",
  scooterOutdoor2: "photo-1774537362067-304f903ee998",
  scooterOutdoor3: "photo-1773239621372-6284abef83e7",
  scooterFamily: "photo-1697479382036-2895087975ab",
  mobilityDevice: "photo-1589228589773-7ebefccb6dfc",
  wheelchairCare: "photo-1772790990227-05bba73f13bb",
  wheelchairPark: "photo-1602533103327-c7a145c761a1",
  wheelchairPath: "photo-1584145798265-b286d367426f",
  hospitalBed: "photo-1519494026892-80bbd2d6fd0d",
  hospitalRoom: "photo-1778151270902-cb0ca572f2ee",
  patientCare: "photo-1631049307264-da0ec9d70304",
  liftChair: "photo-1586023492125-27b2c045efd7",
  bathroomSafety: "photo-1620626011761-996317b8d101",
  medicalLab: "photo-1584308666744-24d5c474f2ae",
  medicalTeam: "photo-1559757175-5700dde675bc",
  clinic: "photo-1516549655169-df83a0774514",
  wellness: "photo-1571019613454-1cb2f99b2d8b",
  pharmacy: "photo-1558618666-fcd25c85cd64",
  medicalOffice: "photo-1582719478250-c89cae4dc85b",
  doctor: "photo-1612349317150-e413f6a5b16d",
  seniorCare: "photo-1573496359142-b8d87734a5a2",
} as const;

/** Optimized Unsplash URL helper */
const U = (photoId: string, w = 1400) =>
  `https://images.unsplash.com/${photoId}?w=${w}&q=85&auto=format&fit=crop`;

export const vitalImages = {
  hero: {
    foxtrSale: U(STOCK.scooterHero, 1600),
    hospitalBeds: U(STOCK.hospitalBed, 1600),
    liftChairs: U(STOCK.liftChair, 1600),
    store: U(STOCK.medicalOffice, 1600),
    experts: U(STOCK.wheelchairCare, 1600),
    heroBg: U(STOCK.medicalTeam, 1600),
  },
  categories: {
    "mobility-scooters": U(STOCK.scooterBuilding, 800),
    wheelchairs: U(STOCK.wheelchairCare, 800),
    "walkers-rollators": U(STOCK.wheelchairPath, 800),
    "power-wheelchairs": U(STOCK.mobilityDevice, 800),
    "transport-chairs": U(STOCK.wheelchairPark, 800),
    "hospital-beds": U(STOCK.hospitalBed, 800),
    "lift-chairs": U(STOCK.liftChair, 800),
    "bathroom-safety": U(STOCK.bathroomSafety, 800),
    "daily-living": U(STOCK.wellness, 800),
    "patient-care": U(STOCK.patientCare, 800),
    rentals: U(STOCK.hospitalRoom, 800),
  },
  products: {
    "vitalflex-elite-hospital-bed": U(STOCK.hospitalBed, 1200),
    "foxtr-auto-fold-scooter": U(STOCK.scooterHero, 1200),
    "vitalflex-symphony-bed": U(STOCK.patientCare, 1200),
    "golden-comfort-lift-chair": U(STOCK.liftChair, 1200),
    "solcare-100-mattress": U(STOCK.patientCare, 1200),
    "serene-elite-mattress": U(STOCK.hospitalRoom, 1200),
    "pride-victory-scooter": U(STOCK.scooterOutdoor1, 1200),
    "pride-transport-chair": U(STOCK.wheelchairCare, 1200),
    "quantum-pulse-wheelchair": U(STOCK.mobilityDevice, 1200),
    "drive-nitro-rollator": U(STOCK.wheelchairPath, 1200),
    "healthcraft-grab-bars": U(STOCK.bathroomSafety, 1200),
    "invacare-patient-lift": U(STOCK.medicalLab, 1200),
  },
  productGallery: {
    "vitalflex-elite-hospital-bed": [
      U(STOCK.hospitalBed, 1200),
      U(STOCK.patientCare, 1200),
      U(STOCK.hospitalRoom, 1200),
    ],
    "foxtr-auto-fold-scooter": [
      U(STOCK.scooterHero, 1200),
      U(STOCK.scooterBuilding, 1200),
      U(STOCK.scooterFamily, 1200),
    ],
    "vitalflex-symphony-bed": [
      U(STOCK.patientCare, 1200),
      U(STOCK.hospitalBed, 1200),
      U(STOCK.seniorCare, 1200),
    ],
    "golden-comfort-lift-chair": [U(STOCK.liftChair, 1200), U(STOCK.seniorCare, 1200)],
    "solcare-100-mattress": [U(STOCK.patientCare, 1200), U(STOCK.hospitalRoom, 1200)],
    "serene-elite-mattress": [U(STOCK.hospitalRoom, 1200), U(STOCK.patientCare, 1200)],
    "pride-victory-scooter": [U(STOCK.scooterOutdoor1, 1200), U(STOCK.scooterOutdoor2, 1200)],
    "pride-transport-chair": [U(STOCK.wheelchairCare, 1200), U(STOCK.wheelchairPark, 1200)],
    "quantum-pulse-wheelchair": [U(STOCK.mobilityDevice, 1200), U(STOCK.wheelchairPark, 1200)],
    "drive-nitro-rollator": [U(STOCK.wheelchairPath, 1200), U(STOCK.wellness, 1200)],
    "healthcraft-grab-bars": [U(STOCK.bathroomSafety, 1200), U(STOCK.medicalOffice, 1200)],
    "invacare-patient-lift": [U(STOCK.medicalLab, 1200), U(STOCK.medicalTeam, 1200)],
  } as Record<string, string[]>,
  gallery: [
    { src: U(STOCK.scooterHero, 1200), alt: "Mobility scooter outdoors", span: "large" as const },
    { src: U(STOCK.wheelchairCare, 1200), alt: "Wheelchair care outdoors", span: "tall" as const },
    { src: U(STOCK.scooterBuilding, 1200), alt: "Electric mobility scooter", span: "normal" as const },
    { src: U(STOCK.hospitalBed, 1200), alt: "Home hospital care", span: "normal" as const },
    { src: U(STOCK.liftChair, 1200), alt: "Comfort lift recliner", span: "wide" as const },
    { src: U(STOCK.wheelchairPath, 1200), alt: "Rollator walker support", span: "normal" as const },
    { src: U(STOCK.medicalOffice, 1200), alt: "Medical supply showroom", span: "normal" as const },
    { src: U(STOCK.wheelchairPark, 1200), alt: "Wheelchair independence", span: "normal" as const },
  ],
  sections: {
    trust: U(STOCK.wheelchairCare, 1400),
    emotional: U(STOCK.seniorCare, 1400),
    about: U(STOCK.clinic, 1400),
    solutions: {
      personal: U(STOCK.scooterOutdoor3, 1200),
      homeCare: U(STOCK.hospitalBed, 1200),
      professional: U(STOCK.doctor, 1200),
      rentals: U(STOCK.hospitalRoom, 1200),
    },
    resources: {
      scooter: U(STOCK.scooterHero, 1000),
      wheelchair: U(STOCK.wheelchairPark, 1000),
      home: U(STOCK.hospitalBed, 1000),
      guide: U(STOCK.wheelchairPath, 1000),
    },
    contact: U(STOCK.pharmacy, 1400),
    howItWorks: {
      browse: U(STOCK.scooterBuilding, 900),
      consult: U(STOCK.doctor, 900),
      deliver: U(STOCK.pharmacy, 900),
      support: U(STOCK.medicalTeam, 900),
    },
  },
  brands: {
    "Drive DeVilbiss Healthcare": `${VM}/2024/07/Drive-Devilbiss-Brand-logo.jpg`,
    "Golden Technologies": `${VM}/2024/03/Golden_Technolgies_logo.webp`,
    Invacare: `${VM}/2024/07/Invacare-brand-logo.jpg`,
    "Pride Mobility": `${VM}/2024/03/pride_mobility_brand_logo.jpg`,
    "Quantum Rehab": `${VM}/2024/07/Quantum-Rehab-Brand-logo.jpg`,
    Healthcraft: `${VM}/2024/07/Healthcraft_brand_logo.jpg`,
    "Medline Industries": `${VM}/2024/02/Medline-Brand-Logo.jpg`,
    "Proactive Medical": `${VM}/2024/04/Proactive-Medical-Brand-Logo.jpg`,
    Rotec: `${VM}/2024/07/Rotec-brand-logo.jpg`,
    "Sunrise Medical": `${VM}/2024/07/Sunrise-Medical-Brand-Logo.jpg`,
    FOXTR: `${VM}/2024/04/foxtr2.jpg`,
    "Human Care Group": `${VM}/2024/02/human-care-brand-logo.webp`,
    "HMS Vilgo": `${VM}/2024/07/HMS-Vilgo-brand-logo.jpg`,
    "Joerns Healthcare": `${VM}/2024/07/Joerns-Healthcare-brand-logo.jpg`,
    "Mobb Home Health Care": `${VM}/2024/07/Mobb-Home-Health-Care-Brand-Logo.jpg`,
    "Power Plus Mobility": `${VM}/2024/07/Power-Plus-Mobility-brand-logo.jpg`,
    "Robooter / Ally": `${VM}/2024/07/Robooter-brand-logo.jpg`,
    VitalFlex: `${VM}/2024/07/Vital-Brand-Logo.jpg`,
  },
} as const;

export function getProductImage(slug: string, fallback?: string): string {
  const img = vitalImages.products[slug as keyof typeof vitalImages.products];
  return img || fallback || vitalImages.hero.store;
}

export function getProductImages(slug: string): string[] {
  const gallery = vitalImages.productGallery[slug];
  if (gallery?.length) return gallery;
  return [getProductImage(slug)];
}

export function getCategoryImage(slug: string): string {
  return vitalImages.categories[slug as keyof typeof vitalImages.categories] || vitalImages.hero.store;
}
