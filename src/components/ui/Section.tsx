import { ReactNode } from "react";
import Container from "./Container";

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
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

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
