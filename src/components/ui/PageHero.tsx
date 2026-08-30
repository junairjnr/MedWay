import { ReactNode } from "react";
import Image from "next/image";
import Container from "./Container";

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
  const heightClass = size === "lg" ? "h-52 sm:h-64 md:h-72 lg:h-80" : "h-44 sm:h-52 md:h-60";
  const alignClass = align === "center" ? "items-center" : "items-end";

  return (
    <div className={`relative ${heightClass} overflow-hidden`}>
      <Image src={image} alt={imageAlt || title} fill className="object-cover scale-105" sizes="100vw" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/75 to-navy/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent opacity-60" />
      <Container className={`relative z-10 h-full flex ${alignClass}`}>
        <div className={`w-full ${align === "bottom" ? "pb-8 sm:pb-10 lg:pb-12" : ""}`}>
          {eyebrow && (
            <p className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-primary-light mb-2 sm:mb-3">
              <span className="w-6 h-px bg-primary-light" aria-hidden />
              {eyebrow}
            </p>
          )}
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-white tracking-tight leading-[1.1] max-w-3xl">
            {title}
          </h1>
          {description && (
            <p className="text-white/75 mt-3 sm:mt-4 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
          {children}
        </div>
      </Container>
    </div>
  );
}
