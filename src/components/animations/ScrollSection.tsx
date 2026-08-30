"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, ReactNode } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface ScrollSectionProps {
  children: ReactNode | ((values: { opacity: MotionValue<number>; y: MotionValue<number> }) => ReactNode);
  className?: string;
  offset?: [string, string];
}

export default function ScrollSection({
  children,
  className = "",
  offset = ["start 0.85", "end 0.15"],
}: ScrollSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ["start 0.85", "end 0.15"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [80, 0, 0, -40]);

  if (reduced) {
    return (
      <section ref={ref} className={className}>
        {typeof children === "function" ? children({ opacity: opacity as MotionValue<number>, y: y as MotionValue<number> }) : children}
      </section>
    );
  }

  return (
    <section ref={ref} className={className}>
      {typeof children === "function" ? (
        children({ opacity, y })
      ) : (
        <motion.div style={{ opacity, y }}>{children}</motion.div>
      )}
    </section>
  );
}
