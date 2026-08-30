"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Search, MessageCircle, Truck, HeartHandshake } from "lucide-react";
import { vitalImages } from "@/data/images";
import Section, { SectionHeader } from "@/components/ui/Section";

const steps = [
  {
    icon: Search,
    title: "Browse & Compare",
    desc: "Explore scooters, beds, chairs & more with detailed specs and real product photos.",
    image: vitalImages.sections.howItWorks.browse,
  },
  {
    icon: MessageCircle,
    title: "Talk to an Expert",
    desc: "Our mobility specialists help you choose the right equipment for your needs.",
    image: vitalImages.sections.howItWorks.consult,
  },
  {
    icon: Truck,
    title: "Delivery & Setup",
    desc: "Canada-wide shipping or White Glove delivery and setup in Toronto & GTA.",
    image: vitalImages.sections.howItWorks.deliver,
  },
  {
    icon: HeartHandshake,
    title: "Ongoing Support",
    desc: "Warranty, service, rentals — we're with you long after your purchase.",
    image: vitalImages.sections.howItWorks.support,
  },
];

export default function HowItWorks() {
  return (
    <Section className="bg-white">
      <SectionHeader
        eyebrow="How It Works"
        title="From Browse to Your Doorstep"
        description="A simple, supported journey — whether you shop online or visit our showrooms."
        align="center"
        className="max-w-2xl mx-auto"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group overflow-hidden rounded-2xl border border-border/80 bg-background shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-extrabold text-white shadow-md">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="p-4 sm:p-5">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground sm:text-lg">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted sm:text-sm">{step.desc}</p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}
