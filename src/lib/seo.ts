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
    "Medway provides medical equipment rentals, mobility products, home healthcare equipment and medical supplies in Toronto, the GTA and across Canada.",
  locale: "en_CA",
  ogImagePath: "/opengraph-image",
  /** Google Search Console HTML tag (public in page source). */
  googleSiteVerification: "aLG0JBKJKXP0r2MVGMP-xQaXgu_rCN7OrlrFi2L9xME",
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
};

/** Build page-level metadata with canonical, Open Graph, and Twitter cards. */
export function createPageMetadata({
  title,
  description,
  path,
  image,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ? absoluteImageUrl(image) : absoluteUrl(siteSeo.ogImagePath);

  return {
    title,
    description,
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
  "mobility-scooters": "Mobility Scooters in Toronto",
  wheelchairs: "Wheelchairs in Toronto",
  "walkers-rollators": "Rollators & Walkers in Toronto",
  "power-wheelchairs": "Power Wheelchairs in Toronto",
  "transport-chairs": "Transport Chairs in Toronto",
  "hospital-beds": "Hospital Bed Rentals in Toronto",
  "lift-chairs": "Medical Lift Chairs in Toronto",
  "bathroom-safety": "Bathroom Safety Equipment in Toronto",
  "daily-living": "Daily Living & Rehab Products in Toronto",
  "patient-care": "Medical Mattresses & Patient Care in Toronto",
};

export function categoryPageMetadata(category: Category): Metadata {
  const title =
    categoryTitleBySlug[category.slug] ?? `${category.name} in Toronto`;
  const description =
    category.description.length > 120
      ? `${category.description} Available from Medway in Toronto, the GTA and across Canada.`
      : `Shop ${category.name.toLowerCase()} from Medway — ${category.description} Serving Toronto, the GTA and Canada.`;

  return createPageMetadata({
    title,
    description,
    path: `/categories/${category.slug}`,
    image: category.image,
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
        "Medical equipment rentals, mobility scooters, wheelchairs, hospital beds, lift chairs and home healthcare products serving Toronto, the GTA and Canada.",
      path: "/",
    }),
    title: {
      absolute: "Medical Equipment Rentals & Mobility Products in Toronto | Medway",
    },
  },
  products: createPageMetadata({
    title: "Mobility & Home Medical Equipment Products",
    description:
      "Explore mobility scooters, wheelchairs, hospital beds, lift chairs, bathroom safety and home care products from Medway in Toronto and across Canada.",
    path: "/products",
  }),
  rentals: createPageMetadata({
    title: "Medical Equipment Rentals in Toronto",
    description:
      "Explore medical equipment rental options from Medway, including mobility equipment, hospital beds, wheelchairs and home healthcare solutions in Toronto and the GTA.",
    path: "/rentals",
  }),
  service: createPageMetadata({
    title: "Medical Equipment Service & Support",
    description:
      "Delivery, setup, repairs and maintenance for mobility and home medical equipment — expert support from Medway across Toronto, the GTA and Canada.",
    path: "/service",
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
