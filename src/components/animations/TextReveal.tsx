"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface TextRevealProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
}

export default function TextReveal({ lines, className = "", lineClassName = "" }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  });

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {lines.map((line, i) => (
          <p key={i} className={lineClassName}>{line}</p>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => {
        const start = i / lines.length;
        const end = (i + 1) / lines.length;
        return (
          <Line key={i} progress={scrollYProgress} start={start} end={end} className={lineClassName}>
            {line}
          </Line>
        );
      })}
    </div>
  );
}

function Line({
  children,
  progress,
  start,
  end,
  className,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
  className?: string;
}) {
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const y = useTransform(progress, [start, end], [40, 0]);

  return (
    <motion.p style={{ opacity, y }} className={className}>
      {children}
    </motion.p>
  );
}
