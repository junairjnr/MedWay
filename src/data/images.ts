/** High-quality stock photography (Unsplash) + Vital Mobility brand logos */
const VM = "https://www.vitalmobility.ca/wp-content/uploads";

export const siteLogo = "/assets/logo.png";
export const siteLogoWidth = 1979;
export const siteLogoHeight = 570;

/** Client-provided photography — Daily Living / Rehab (Super Pole) */
export const rehabDailyImage = "/assets/rehab-image.jpg";
export const rehabDailyImageSecond = "/assets/rehab-image-2.webp";

/** Client-provided product photography */
export const patientLiftImage = "/assets/patient%20lift.jpeg";
export const airMattressImage = "/assets/Air%20mattress.jpeg";
/** Hospital bed product photos (client assets) — one listing, two gallery views */
export const hospitalBedImage = "/assets/hospital%20bed%201.PNG";
export const hospitalBedImageSecond = "/assets/hospital%20bed%202.PNG";
export const liftChairImage = "/assets/lift%20chair.jpeg";

/** Hero banner side panel video (client asset) */
export const heroBannerVideo = "/assets/hero_video.mp4";

/** Home intro / Our Story section video (client asset) */
export const introStoryVideo = "/assets/our_story.mp4";

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
    mobilityScooter: U(STOCK.scooterHero, 1600),
    /** @deprecated Use mobilityScooter — kept for cached bundles */
    foxtrSale: U(STOCK.scooterHero, 1600),
    hospitalBeds: hospitalBedImage,
    liftChairs: liftChairImage,
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
    "hospital-beds": hospitalBedImage,
    "lift-chairs": liftChairImage,
    "bathroom-safety": U(STOCK.bathroomSafety, 800),
    "daily-living": rehabDailyImage,
    "patient-care": patientLiftImage,
    rentals: hospitalBedImage,
  },
  products: {
    "vitalflex-elite-hospital-bed": hospitalBedImage,
    "foxtr-auto-fold-scooter": U(STOCK.scooterHero, 1200),
    "golden-comfort-lift-chair": liftChairImage,
    "solcare-100-mattress": U(STOCK.patientCare, 1200),
    "serene-elite-mattress": airMattressImage,
    "pride-victory-scooter": U(STOCK.scooterOutdoor1, 1200),
    "pride-transport-chair": U(STOCK.wheelchairCare, 1200),
    "quantum-pulse-wheelchair": U(STOCK.mobilityDevice, 1200),
    "drive-nitro-rollator": U(STOCK.wheelchairPath, 1200),
    "healthcraft-grab-bars": U(STOCK.bathroomSafety, 1200),
    "home-rehab-daily-living": rehabDailyImage,
    "invacare-patient-lift": patientLiftImage,
  },
  productGallery: {
    "vitalflex-elite-hospital-bed": [hospitalBedImage, hospitalBedImageSecond],
    "foxtr-auto-fold-scooter": [
      U(STOCK.scooterHero, 1200),
      U(STOCK.scooterBuilding, 1200),
      U(STOCK.scooterFamily, 1200),
    ],
    "golden-comfort-lift-chair": [liftChairImage],
    "solcare-100-mattress": [U(STOCK.patientCare, 1200), hospitalBedImage],
    "serene-elite-mattress": [airMattressImage],
    "pride-victory-scooter": [U(STOCK.scooterOutdoor1, 1200), U(STOCK.scooterOutdoor2, 1200)],
    "pride-transport-chair": [U(STOCK.wheelchairCare, 1200), U(STOCK.wheelchairPark, 1200)],
    "quantum-pulse-wheelchair": [U(STOCK.mobilityDevice, 1200), U(STOCK.wheelchairPark, 1200)],
    "drive-nitro-rollator": [U(STOCK.wheelchairPath, 1200), U(STOCK.wellness, 1200)],
    "healthcraft-grab-bars": [U(STOCK.bathroomSafety, 1200), U(STOCK.medicalOffice, 1200)],
    "home-rehab-daily-living": [rehabDailyImage, rehabDailyImageSecond],
    "invacare-patient-lift": [patientLiftImage],
  } as Record<string, string[]>,
  gallery: [
    { src: U(STOCK.scooterHero, 1200), alt: "Mobility scooter outdoors", span: "large" as const },
    { src: U(STOCK.wheelchairCare, 1200), alt: "Wheelchair care outdoors", span: "tall" as const },
    { src: U(STOCK.scooterBuilding, 1200), alt: "Electric mobility scooter", span: "normal" as const },
    { src: hospitalBedImage, alt: "Hospital bed", span: "normal" as const },
    { src: liftChairImage, alt: "Comfort lift recliner", span: "wide" as const },
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
      homeCare: hospitalBedImage,
      professional: U(STOCK.doctor, 1200),
      rentals: hospitalBedImage,
    },
    resources: {
      scooter: U(STOCK.scooterHero, 1000),
      wheelchair: U(STOCK.wheelchairPark, 1000),
      home: hospitalBedImage,
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

export function isHospitalBedAsset(src: string): boolean {
  if (src === hospitalBedImage || src === hospitalBedImageSecond) return true;
  const lower = src.toLowerCase();
  return lower.includes("hospital%20bed") || lower.includes("hospital bed");
}

/** Full-bleed cover tuned for wide hospital bed product photos */
export function getHospitalBedPhotoClassName(extra = ""): string {
  return `object-cover object-[50%_78%] sm:object-[50%_82%] ${extra}`.trim();
}

export function getPhotoCoverClassName(src: string, extra = ""): string {
  if (isHospitalBedAsset(src)) return getHospitalBedPhotoClassName(extra);
  return `object-cover object-center ${extra}`.trim();
}

/** Rentals promo modal — show full product (avoid tight crop on wide bed PNGs) */
export function getPromoModalPhotoClassName(src: string): string {
  if (isHospitalBedAsset(src)) {
    return "object-contain object-center p-1 sm:p-1.5";
  }
  return "object-cover object-center";
}

/** Home hero carousel — full bed visible on wide slides */
export function getHeroSlidePhotoClassName(src: string): string {
  if (isHospitalBedAsset(src)) {
    return "object-contain object-center px-2 py-3 sm:px-6 sm:py-4 lg:px-10 lg:py-6";
  }
  return "object-cover object-center";
}
