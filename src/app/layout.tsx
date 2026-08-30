import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileEnquireBar from "@/components/layout/MobileEnquireBar";
import MainShell from "@/components/layout/MainShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Med Way | Home Medical Equipment Supplies & Rentals in Toronto, Canada",
  description:
    "Canada's Leading Medical Equipment Supplier & Rental Company. Outstanding Customer Service. Integrity Pricing.",
  openGraph: {
    title: "Med Way | Medical Equipment & Mobility",
    description: "Canada's trusted home health care and mobility experts.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <MainShell>{children}</MainShell>
        <Footer />
        <MobileEnquireBar />
      </body>
    </html>
  );
}
