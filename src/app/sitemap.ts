import type { MetadataRoute } from "next";
// Sales catalogue — hidden (keep for restore)
// import { categories } from "@/data/categories";
// import { products } from "@/data/products";
import { rentalItems } from "@/data/rentals";
import { resources } from "@/data/resources";
import { absoluteUrl, getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    // "/products",
    "/rentals",
    "/service",
    "/solutions",
    "/about",
    "/contact",
    "/resources",
  ].map((path) => ({
    url: path === "" ? `${siteUrl}/` : absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  // Sales catalogue — hidden (keep for restore)
  const categoryRoutes: MetadataRoute.Sitemap = [];
  // const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
  //   url: absoluteUrl(`/categories/${cat.slug}`),
  //   lastModified: now,
  //   changeFrequency: "weekly",
  //   priority: 0.75,
  // }));

  const productRoutes: MetadataRoute.Sitemap = [];
  // const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
  //   url: absoluteUrl(`/products/${product.slug}`),
  //   lastModified: now,
  //   changeFrequency: "weekly",
  //   priority: 0.7,
  // }));

  const rentalRoutes: MetadataRoute.Sitemap = rentalItems.map((rental) => ({
    url: absoluteUrl(`/rentals/${rental.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  const resourceRoutes: MetadataRoute.Sitemap = resources.map((resource) => ({
    url: absoluteUrl(`/resources/${resource.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...rentalRoutes,
    ...resourceRoutes,
  ];
}
