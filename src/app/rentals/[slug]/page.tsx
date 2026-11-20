import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { rentalItems, getRentalBySlug } from "@/data/rentals";
import { getRentalSeoPage } from "@/data/rental-seo-content";
import RentalDetailView from "@/components/rentals/RentalDetailView";
import JsonLd from "@/components/seo/JsonLd";
import {
  breadcrumbListJsonLd,
  rentalPageMetadata,
  rentalDetailJsonLd,
  rentalFaqJsonLd,
  type BreadcrumbItem,
} from "@/lib/seo";

export function generateStaticParams() {
  return rentalItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/rentals/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const rental = getRentalBySlug(slug);
  if (!rental) return { title: "Rental Not Found" };
  return rentalPageMetadata(rental);
}

export default async function RentalDetailPage({
  params,
}: PageProps<"/rentals/[slug]">) {
  const { slug } = await params;
  const rental = getRentalBySlug(slug);
  if (!rental) notFound();

  const seo = getRentalSeoPage(rental.slug);
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Home", href: "/" },
    { name: "Rentals", href: "/rentals" },
    { name: seo?.pageName ?? rental.title },
  ];

  const schemas: Record<string, unknown>[] = [
    rentalDetailJsonLd(rental),
    breadcrumbListJsonLd(breadcrumbs),
  ];
  if (seo) {
    const faqLd = rentalFaqJsonLd(seo);
    if (faqLd) schemas.push(faqLd);
  }

  return (
    <>
      <JsonLd data={schemas} />
      <RentalDetailView rental={rental} breadcrumbs={breadcrumbs} />
    </>
  );
}
