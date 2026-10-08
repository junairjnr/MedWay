"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "./Container";
import { getPhotoCoverClassName } from "@/data/images";
import { usePrefersReducedMotion } from "@/components/animations/usePrefersReducedMotion";

interface PageHeroProps {
  title: string;
  description?: string;
  eyebrow?: string;
  image: string;
  imageAlt?: string;
  children?: ReactNode;
  align?: "center" | "bottom";
  size?: "md" | "lg";
}

export default function PageHero({
  title,
  description,
  eyebrow,
  image,
  imageAlt = "",
  children,
  align = "bottom",
  size = "lg",
}: PageHeroProps) {
  const reduced = usePrefersReducedMotion();
  const heightClass = size === "lg" ? "h-52 sm:h-64 md:h-72 lg:h-80" : "h-48 sm:h-56 md:h-64";
  const titleClass =
    size === "lg"
      ? "text-3xl sm:text-4xl lg:text-5xl"
      : "text-2xl sm:text-3xl lg:text-4xl";
  const descriptionClass =
    size === "lg"
      ? "text-base sm:text-lg"
      : "text-sm sm:text-base";
  const alignClass = align === "center" ? "items-center" : "items-end";

  return (
    <div className={`relative ${heightClass} overflow-hidden`}>
      <motion.div
        className="absolute inset-0"
        initial={reduced ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={image}
          alt={imageAlt || title}
          fill
          className={`${getPhotoCoverClassName(image)}`}
          sizes="100vw"
          priority
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/75 to-navy/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent opacity-60" />
      <Container className={`relative z-10 h-full flex ${alignClass}`}>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className={`w-full ${align === "bottom" ? (size === "lg" ? "pb-8 sm:pb-10 lg:pb-12" : "pb-6 sm:pb-8 lg:pb-10") : ""}`}
        >
          {eyebrow && (
            <p className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-primary-light mb-2 sm:mb-3">
              <span className="w-6 h-px bg-primary-light" aria-hidden />
              {eyebrow}
            </p>
          )}
          <h1 className={`font-display font-extrabold text-white tracking-tight leading-tight max-w-3xl ${titleClass}`}>
            {title}
          </h1>
          {description && (
            <p className={`text-white/75 mt-2 sm:mt-3 max-w-2xl leading-relaxed ${descriptionClass}`}>
              {description}
            </p>
          )}
          {children}
        </motion.div>
      </Container>
    </div>
  );
}
