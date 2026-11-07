import ProductListing from "@/components/products/ProductListing";
import { staticPages } from "@/lib/seo";

export const metadata = staticPages.products;

export default function ProductsPage() {
  return (
    <ProductListing
      title="Medical Equipment & Mobility Products"
      description="Find the right mobility solution for your everyday journey."
    />
  );
}
