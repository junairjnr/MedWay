import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Page Not Found",
  description: "The page you are looking for could not be found on Medway.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="pt-24 pb-20 bg-background">
      <Container className="max-w-lg text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">404</p>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-4">Page not found</h1>
        <p className="text-muted mb-8">
          This page may have moved or no longer exists. Browse products, rentals, or contact our team for help.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/" size="lg" className="rounded-full">
            Go to Homepage
          </Button>
          <Button href="/contact" variant="outline" size="lg" className="rounded-full">
            Contact Us
          </Button>
        </div>
        <p className="mt-8 text-sm text-muted">
          <Link href="/products" className="text-primary hover:underline">
            View all products
          </Link>
        </p>
      </Container>
    </div>
  );
}
