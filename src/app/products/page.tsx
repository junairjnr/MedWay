import ProductListing from "@/components/products/ProductListing";
import { staticPages } from "@/lib/seo";

export const metadata = staticPages.products;

export default function ProductsPage() {
  return <ProductListing />;
}
