"use client";

import { Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import NewsletterForm from "@/components/forms/NewsletterForm";
import MotionInView from "@/components/animations/MotionInView";

export default function NewsletterStrip() {
  return (
    <section className="relative overflow-hidden mesh-gradient border-y border-primary/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(20,184,166,0.15),transparent_50%)]" aria-hidden />
      <Container className="relative flex flex-col items-center justify-between gap-5 py-8 sm:flex-row sm:gap-8 sm:py-10">
        <MotionInView direction="left" className="flex items-start gap-4 text-center sm:text-left">
          <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-primary-light backdrop-blur-sm">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-white sm:text-lg">Sign Up to Our Newsletter</h3>
            <p className="mt-1 text-xs text-white/65 sm:text-sm">Get offers, promotions &amp; mobility tips in your inbox</p>
          </div>
        </MotionInView>
        <MotionInView direction="right" delay={0.1} className="w-full sm:max-w-md lg:max-w-lg">
          <NewsletterForm variant="hero" />
        </MotionInView>
      </Container>
    </section>
  );
}
