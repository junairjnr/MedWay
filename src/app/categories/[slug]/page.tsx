import { categories, getCategoryBySlug } from "@/data/categories";
import ProductListing from "@/components/products/ProductListing";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbListJsonLd, categoryPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/categories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return { title: "Category Not Found" };
  return categoryPageMetadata(cat);
}

export default async function CategoryPage({ params }: PageProps<"/categories/[slug]">) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: cat.name },
  ];

  return (
    <>
      <JsonLd data={breadcrumbListJsonLd(breadcrumbs)} />
      <ProductListing
        initialCategory={cat.slug}
        title={cat.name}
        description={cat.description}
        breadcrumbs={breadcrumbs}
      />
    </>
  );
}
