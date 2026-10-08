"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import MotionInView, { MotionStagger, MotionStaggerItem } from "@/components/animations/MotionInView";
import { usePrefersReducedMotion } from "@/components/animations/usePrefersReducedMotion";
import NewsletterForm from "@/components/forms/NewsletterForm";
import Button from "@/components/ui/Button";
import { categories } from "@/data/categories";
import { siteLogo, siteLogoWidth, siteLogoHeight } from "@/data/images";
import { siteContact, mailtoHref, whatsAppHref } from "@/data/site-contact";

export default function Footer() {
  const reduced = usePrefersReducedMotion();

  return (
    <footer className="relative bg-navy text-slate-400">
      {/* CTA band */}
      <div className="border-b border-white/10 bg-gradient-to-r from-primary-dark via-primary to-primary-dark">
        <Container variant="chrome" className="flex flex-col items-center justify-between gap-5 py-8 sm:flex-row sm:py-10">
          <MotionInView direction="left" className="text-center sm:text-left w-full sm:w-auto">
            <h2 className="font-display text-xl font-extrabold text-white sm:text-2xl">Need help choosing equipment?</h2>
            <p className="mt-1 text-sm text-white/75">Talk to our mobility experts — we&apos;re here to help.</p>
          </MotionInView>
          <MotionInView direction="right" delay={0.08} className="flex flex-col gap-3 sm:flex-row w-full sm:w-auto justify-center sm:justify-end">
            <Button href={whatsAppHref()} variant="white" size="md" showArrow={false} className="rounded-full">
              <Phone className="mr-2 h-4 w-4" /> {siteContact.phone}
            </Button>
            <Button href="/contact" variant="outline" size="md" showArrow={false} className="rounded-full border-white/30 text-white hover:bg-white/10">
              Contact Us
            </Button>
          </MotionInView>
        </Container>
      </div>

      <Container variant="chrome" className="py-12 sm:py-16 lg:py-20">
        <MotionStagger className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <MotionStaggerItem className="lg:col-span-4">
            <div className="mb-5">
              <Image
                src={siteLogo}
                alt="Med Way"
                width={siteLogoWidth}
                height={siteLogoHeight}
                quality={100}
                sizes="360px"
                className="h-14 w-auto sm:h-16 md:h-20"
              />
            </div>
            <p className="mb-6 max-w-sm text-sm leading-relaxed">
              Canada&apos;s leading medical equipment supplier. Helping people move with comfort, confidence and independence.
            </p>
            <div className="space-y-3 text-sm">
              <a href={mailtoHref()} className="flex items-center gap-2.5 hover:text-primary-light transition-colors">
                <Mail className="h-4 w-4 text-primary-light shrink-0" />
                <span className={siteContact.emailClass}>{siteContact.email}</span>
              </a>
              <a href={whatsAppHref()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-primary-light transition-colors">
                <Phone className="h-4 w-4 text-primary-light shrink-0" /> {siteContact.phone}
              </a>
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 text-primary-light shrink-0" />
                Toronto, ON — Canada-wide shipping
              </p>
            </div>
          </MotionStaggerItem>

          <MotionStaggerItem className="lg:col-span-2">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/products" className="hover:text-primary-light transition-colors">All Products</Link></li>
              {categories.slice(0, 5).map((c) => (
                <li key={c.slug}>
                  <Link href={`/categories/${c.slug}`} className="hover:text-primary-light transition-colors">{c.name}</Link>
                </li>
              ))}
            </ul>
          </MotionStaggerItem>

          <MotionStaggerItem className="lg:col-span-2">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">Company</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-primary-light transition-colors">About Us</Link></li>
              <li><Link href="/solutions" className="hover:text-primary-light transition-colors">Solutions</Link></li>
              <li><Link href="/rentals" className="hover:text-primary-light transition-colors">Rentals</Link></li>
              <li><Link href="/products" className="hover:text-primary-light transition-colors">Sales</Link></li>
              <li><Link href="/service" className="hover:text-primary-light transition-colors">Service</Link></li>
              {/* <li><Link href="/resources" className="hover:text-primary-light transition-colors">Resources</Link></li> */}
              <li><Link href="/contact" className="hover:text-primary-light transition-colors">Contact</Link></li>
            </ul>
          </MotionStaggerItem>

          <MotionStaggerItem className="lg:col-span-4">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">Stay Connected</h3>
            <p className="mb-4 text-sm leading-relaxed">Mobility advice, product updates &amp; exclusive offers.</p>
            <NewsletterForm variant="footer" />
          </MotionStaggerItem>
        </MotionStagger>

        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-700 pt-8 text-xs sm:flex-row"
        >
          <p>&copy; {new Date().getFullYear()} Med Way. All Rights Reserved.</p>
          <p className="text-primary-light/80">Outstanding Customer Service · Integrity Pricing</p>
        </motion.div>
      </Container>
    </footer>
  );
}
