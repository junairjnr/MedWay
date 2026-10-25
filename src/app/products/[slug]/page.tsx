import { products, getProductBySlug, getProductDisplayName } from "@/data/products";
import ProductDetailView from "@/components/products/ProductDetailView";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import {
  breadcrumbListJsonLd,
  productJsonLd,
  productPageMetadata,
  type BreadcrumbItem,
} from "@/lib/seo";
import { getCategoryBySlug } from "@/data/categories";
import type { Metadata } from "next";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: "Product Not Found" };
  }
  return productPageMetadata(product);
}

function productBreadcrumbs(productSlug: string, displayName: string, categorySlug: string): BreadcrumbItem[] {
  const category = getCategoryBySlug(categorySlug);
  return [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    ...(category ? [{ name: category.name, href: `/categories/${category.slug}` }] : []),
    { name: displayName },
  ];
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const displayName = getProductDisplayName(product);
  const breadcrumbs = productBreadcrumbs(product.slug, displayName, product.category);

  return (
    <>
      <JsonLd data={[productJsonLd(product), breadcrumbListJsonLd(breadcrumbs)]} />
      <ProductDetailView product={product} breadcrumbs={breadcrumbs} />
    </>
  );
}
