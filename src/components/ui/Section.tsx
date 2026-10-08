"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Container from "./Container";
import { usePrefersReducedMotion } from "@/components/animations/usePrefersReducedMotion";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  containerClassName?: string;
}

export default function Section({ children, className = "", id, containerClassName = "" }: SectionProps) {
  return (
    <section id={id} className={`section-py ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const reduced = usePrefersReducedMotion();
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  if (reduced) {
    return (
      <div className={`section-header ${alignClass} ${className}`}>
        {eyebrow && (
          <p className="section-accent text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3">{eyebrow}</p>
        )}
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight text-foreground">
          {title}
        </h2>
        {description && (
          <p className="mt-3 sm:mt-4 text-muted text-base sm:text-lg leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`section-header ${alignClass} ${className}`}
    >
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05, duration: 0.45 }}
          className="section-accent text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight text-foreground"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.16, duration: 0.5 }}
          className="mt-3 sm:mt-4 text-muted text-base sm:text-lg leading-relaxed max-w-2xl"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
