import { categories, getCategoryBySlug } from "@/data/categories";
import ProductListing from "@/components/products/ProductListing";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/categories/[slug]">) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return { title: "Category Not Found | Med Way" };
  return { title: `${cat.name} | Med Way`, description: cat.description };
}

export default async function CategoryPage({ params }: PageProps<"/categories/[slug]">) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();
  return (
    <ProductListing
      initialCategory={cat.slug}
      title={cat.name}
      description={cat.description}
    />
  );
}
