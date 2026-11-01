import type { Metadata } from "next";
import type { Product } from "@/data/products";
import type { Category } from "@/data/categories";
import { getProductDisplayName } from "@/data/products";
import { siteContact } from "@/data/site-contact";
import { siteLogo } from "@/data/images";

/** Public site origin — always use www production domain as fallback. */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const base = raw && raw.length > 0 ? raw : "https://www.medwaymobility.ca";
  return base.replace(/\/+$/, "");
}

export const siteSeo = {
  name: "Medway",
  /** Shown in title template and OG site_name */
  shortName: "Medway",
  defaultTitle: "Medway | Medical Equipment Rentals & Mobility Products in Toronto",
  titleTemplate: "%s | Medway",
  defaultDescription:
    "Medway offers hospital bed and medical bed rentals, sales, installation and service; mobility scooter rentals, sales, battery change and repair; wheelchair rentals, sales and service — Toronto, GTA and Canada.",
  locale: "en_CA",
  ogImagePath: "/opengraph-image",
  /** Google Search Console HTML tag (public in page source). */
  googleSiteVerification: "aLG0JBKJKXP0r2MVGMP-xQaXgu_rCN7OrlrFi2L9xME",
  /** Core offerings — used in metadata keywords and structured data (not visible on-page). */
  serviceKeywords: [
    "hospital bed rentals",
    "medical bed rentals",
    "hospital bed sales",
    "hospital bed service",
    "hospital bed moving",
    "hospital bed installation",
    "mobility scooter rentals",
    "mobility scooter services",
    "mobility scooter battery change",
    "mobility scooter sales",
    "wheelchair sales",
    "wheelchair rentals",
    "wheelchair services",
  ],
} as const;

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}

export function absoluteImageUrl(src: string): string {
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  return absoluteUrl(src.startsWith("/") ? src : `/${src}`);
}

type PageMetadataInput = {
  title: string;
  description: string;
  /** Pathname including leading slash, e.g. `/rentals` */
  path: string;
  /** Override OG/Twitter image URL (absolute or site-relative) */
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
};

/** Build page-level metadata with canonical, Open Graph, and Twitter cards. */
export function createPageMetadata({
  title,
  description,
  path,
  image,
  noIndex = false,
  keywords,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ? absoluteImageUrl(image) : absoluteUrl(siteSeo.ogImagePath);

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
        },
    openGraph: {
      title,
      description,
      url,
      siteName: siteSeo.name,
      locale: siteSeo.locale,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${siteSeo.name} — Medical Equipment & Mobility Solutions` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

const categoryTitleBySlug: Record<string, string> = {
  "mobility-scooters": "Mobility Scooter Rentals, Sales & Service in Toronto",
  wheelchairs: "Wheelchair Rentals, Sales & Service in Toronto",
  "walkers-rollators": "Rollators & Walkers in Toronto",
  "power-wheelchairs": "Power Wheelchairs in Toronto",
  "transport-chairs": "Transport Chairs in Toronto",
  "hospital-beds": "Hospital Bed & Medical Bed Rentals, Sales & Service",
  "lift-chairs": "Medical Lift Chairs in Toronto",
  "bathroom-safety": "Bathroom Safety Equipment in Toronto",
  "daily-living": "Daily Living & Rehab Products in Toronto",
  "patient-care": "Medical Mattresses & Patient Care in Toronto",
};

const categorySeoBySlug: Record<
  string,
  { description: string; keywords: string[] }
> = {
  "hospital-beds": {
    description:
      "Hospital bed rentals and medical bed rentals, hospital bed sales, installation, moving and in-home service in Toronto and the GTA. Medway delivers, sets up and supports home hospital beds across Canada.",
    keywords: [
      "hospital bed rentals",
      "medical bed rentals",
      "hospital bed sales",
      "hospital bed service",
      "hospital bed moving",
      "hospital bed installation",
    ],
  },
  "mobility-scooters": {
    description:
      "Mobility scooter rentals and sales plus scooter service, repair and battery change in Toronto and the GTA. Medway helps you stay mobile with expert support and Canada-wide shipping on purchases.",
    keywords: [
      "mobility scooter rentals",
      "mobility scooter services",
      "mobility scooter battery change",
      "mobility scooter sales",
    ],
  },
  wheelchairs: {
    description:
      "Wheelchair sales and rentals with wheelchair service, fitting guidance and home setup in Toronto and the GTA. Manual, transport and power mobility options from Medway across Canada.",
    keywords: ["wheelchair sales", "wheelchair rentals", "wheelchair services"],
  },
};

export function categoryPageMetadata(category: Category): Metadata {
  const custom = categorySeoBySlug[category.slug];
  const title =
    categoryTitleBySlug[category.slug] ?? `${category.name} in Toronto`;
  const description =
    custom?.description ??
    (category.description.length > 120
      ? `${category.description} Available from Medway in Toronto, the GTA and across Canada.`
      : `Shop ${category.name.toLowerCase()} from Medway — ${category.description} Serving Toronto, the GTA and Canada.`);

  return createPageMetadata({
    title,
    description,
    path: `/categories/${category.slug}`,
    image: category.image,
    keywords: custom?.keywords,
  });
}

export function productPageMetadata(product: Product): Metadata {
  const displayName = getProductDisplayName(product);
  const title = displayName;
  const description =
    product.shortDescription ||
    `Explore the ${displayName} from Medway. View features and specifications for mobility and home care needs in Toronto and the GTA.`;

  return createPageMetadata({
    title,
    description,
    path: `/products/${product.slug}`,
    image: product.image,
  });
}

export type BreadcrumbItem = { name: string; href?: string };

export function breadcrumbListJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}

type MedwayServiceOffer = {
  name: string;
  path: string;
};

/** Indexable service lines for OfferCatalog / page-level Service schema. */
export const medwayServiceOffers: MedwayServiceOffer[] = [
  { name: "Hospital bed rentals", path: "/rentals" },
  { name: "Medical bed rentals", path: "/rentals" },
  { name: "Hospital bed sales", path: "/categories/hospital-beds" },
  { name: "Hospital bed service", path: "/service" },
  { name: "Hospital bed moving", path: "/service" },
  { name: "Hospital bed installation", path: "/service" },
  { name: "Mobility scooter rentals", path: "/rentals" },
  { name: "Mobility scooter services", path: "/service" },
  { name: "Mobility scooter battery change", path: "/service" },
  { name: "Mobility scooter sales", path: "/categories/mobility-scooters" },
  { name: "Wheelchair sales", path: "/categories/wheelchairs" },
  { name: "Wheelchair rentals", path: "/rentals" },
  { name: "Wheelchair services", path: "/service" },
];

function serviceOffersJsonLd(offers: MedwayServiceOffer[]) {
  return offers.map((offer, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: offer.name,
      provider: { "@type": "MedicalBusiness", name: siteSeo.name, url: getSiteUrl() },
      areaServed: "Toronto and Greater Toronto Area, Canada",
      url: absoluteUrl(offer.path),
    },
  }));
}

export function offerCatalogJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Medway medical equipment rentals, sales and service",
    url: getSiteUrl(),
    itemListElement: serviceOffersJsonLd(medwayServiceOffers),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: siteSeo.name,
    url: getSiteUrl(),
    logo: absoluteUrl(siteLogo),
    image: absoluteUrl(siteLogo),
    email: siteContact.email,
    telephone: siteContact.phoneTel,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteContact.address,
      addressLocality: "Brampton",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    areaServed: [
      { "@type": "City", name: "Toronto" },
      { "@type": "AdministrativeArea", name: "Greater Toronto Area" },
      { "@type": "Country", name: "Canada" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Rentals, sales and service",
      itemListElement: serviceOffersJsonLd(medwayServiceOffers),
    },
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteSeo.name,
    url: getSiteUrl(),
  };
}

export function productJsonLd(product: Product) {
  const displayName = getProductDisplayName(product);
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: displayName,
    description: product.shortDescription || product.description,
    sku: product.sku,
    image: product.images.map((img) => absoluteImageUrl(img)),
    url: absoluteUrl(`/products/${product.slug}`),
  };

  if (product.brand) {
    data.brand = { "@type": "Brand", name: product.brand };
  }

  if (typeof product.price === "number") {
    data.offers = {
      "@type": "Offer",
      url: absoluteUrl(`/products/${product.slug}`),
      priceCurrency: "CAD",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    };
  }

  return data;
}

export function rootMetadata(): Metadata {
  const googleVerification =
    process.env.GOOGLE_SITE_VERIFICATION?.trim() || siteSeo.googleSiteVerification;

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: siteSeo.defaultTitle,
      template: siteSeo.titleTemplate,
    },
    description: siteSeo.defaultDescription,
    keywords: [...siteSeo.serviceKeywords],
    applicationName: siteSeo.name,
    authors: [{ name: siteSeo.name, url: getSiteUrl() }],
    creator: siteSeo.name,
    publisher: siteSeo.name,
    alternates: {
      canonical: getSiteUrl() + "/",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    openGraph: {
      title: siteSeo.defaultTitle,
      description: siteSeo.defaultDescription,
      url: getSiteUrl(),
      siteName: siteSeo.name,
      locale: siteSeo.locale,
      type: "website",
      images: [
        {
          url: absoluteUrl(siteSeo.ogImagePath),
          width: 1200,
          height: 630,
          alt: `${siteSeo.name} — Medical Equipment & Mobility Solutions`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteSeo.defaultTitle,
      description: siteSeo.defaultDescription,
      images: [absoluteUrl(siteSeo.ogImagePath)],
    },
    ...(googleVerification
      ? { verification: { google: googleVerification } }
      : {}),
  };
}

/** Static marketing pages — unique titles and descriptions */
export const staticPages = {
  home: {
    ...createPageMetadata({
      title: "Medical Equipment Rentals & Mobility Products in Toronto",
      description:
        "Hospital bed rentals, mobility scooter rentals, wheelchair rentals, sales and service in Toronto and the GTA. Medway also provides hospital bed installation, scooter battery change and equipment moving across Canada.",
      path: "/",
      keywords: [...siteSeo.serviceKeywords],
    }),
    title: {
      absolute: "Medical Equipment Rentals & Mobility Products in Toronto | Medway",
    },
  },
  products: createPageMetadata({
    title: "Mobility & Home Medical Equipment Products",
    description:
      "Shop hospital beds, mobility scooters and wheelchairs for sale in Toronto — plus lift chairs, bathroom safety and home care products with Canada-wide shipping from Medway.",
    path: "/products",
    keywords: [
      "hospital bed sales",
      "mobility scooter sales",
      "wheelchair sales",
      "medical equipment Toronto",
    ],
  }),
  rentals: createPageMetadata({
    title: "Hospital Bed, Mobility Scooter & Wheelchair Rentals",
    description:
      "Hospital bed rentals and medical bed rentals, mobility scooter rentals and wheelchair rentals in Toronto and the GTA. Flexible terms with delivery and setup from Medway.",
    path: "/rentals",
    keywords: [
      "hospital bed rentals",
      "medical bed rentals",
      "mobility scooter rentals",
      "wheelchair rentals",
    ],
  }),
  service: createPageMetadata({
    title: "Hospital Bed Installation, Scooter & Wheelchair Service",
    description:
      "Hospital bed installation, moving and service; mobility scooter repair and battery change; wheelchair service and setup — expert support from Medway in Toronto, the GTA and Canada.",
    path: "/service",
    keywords: [
      "hospital bed service",
      "hospital bed moving",
      "hospital bed installation",
      "mobility scooter services",
      "mobility scooter battery change",
      "wheelchair services",
    ],
  }),
  solutions: createPageMetadata({
    title: "Mobility & Home Care Solutions",
    description:
      "End-to-end mobility and home care solutions — personal mobility, home healthcare, professional care environments and rentals from Medway.",
    path: "/solutions",
  }),
  about: createPageMetadata({
    title: "About Medway",
    description:
      "Medway is a trusted mobility and home medical equipment company helping Canadians with comfort, safety, mobility and independence at home.",
    path: "/about",
  }),
  contact: createPageMetadata({
    title: "Contact Medway",
    description:
      "Contact Medway for medical equipment enquiries, rentals, sales and support in Toronto, the GTA and Canada-wide.",
    path: "/contact",
  }),
  resources: createPageMetadata({
    title: "Mobility Guides & Resources",
    description:
      "Expert mobility guides and home care articles to help you choose wheelchairs, scooters, hospital beds and accessibility equipment with confidence.",
    path: "/resources",
  }),
} as const;

export function resourcePageMetadata(resource: {
  slug: string;
  title: string;
  description: string;
  image: string;
}): Metadata {
  return createPageMetadata({
    title: resource.title,
    description: resource.description,
    path: `/resources/${resource.slug}`,
    image: resource.image,
  });
}

export function rentalsPageJsonLd() {
  const rentalOffers = medwayServiceOffers.filter((o) => /rentals/i.test(o.name));
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Medical equipment rentals",
    url: absoluteUrl("/rentals"),
    description:
      "Hospital bed rentals and medical bed rentals, mobility scooter rentals and wheelchair rentals in Toronto and the GTA from Medway.",
    isPartOf: { "@type": "WebSite", name: siteSeo.name, url: getSiteUrl() },
    about: {
      "@type": "OfferCatalog",
      name: "Medway equipment rentals",
      itemListElement: serviceOffersJsonLd(rentalOffers),
    },
  };
}

export function servicePageJsonLd() {
  const serviceOffers = medwayServiceOffers.filter((o) =>
    /service|installation|moving|battery change/i.test(o.name)
  );
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Medical equipment service and support",
    url: absoluteUrl("/service"),
    description:
      "Hospital bed installation, moving and service; mobility scooter repair and battery change; wheelchair service from Medway.",
    isPartOf: { "@type": "WebSite", name: siteSeo.name, url: getSiteUrl() },
    about: {
      "@type": "OfferCatalog",
      name: "Medway equipment service",
      itemListElement: serviceOffersJsonLd(serviceOffers),
    },
  };
}
