"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ReactNode } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const easeOut = [0.22, 1, 0.36, 1] as const;

/** Mount/unmount with fade + slide (forms, alerts, toggled panels) */
export function MotionPresenceFade({
  show,
  children,
  className = "",
  mode = "wait" as const,
}: {
  show: boolean;
  children: ReactNode;
  className?: string;
  mode?: "sync" | "wait" | "popLayout";
}) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return show ? <div className={className}>{children}</div> : null;
  }

  return (
    <AnimatePresence mode={mode}>
      {show ? (
        <motion.div
          key="motion-presence-fade"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: easeOut }}
          className={className}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/** Swap keyed children (filters, tabs, route blocks) */
export function MotionPresenceSwap({
  presenceKey,
  children,
  className = "",
}: {
  presenceKey: string | number;
  children: ReactNode;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={presenceKey}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.4, ease: easeOut }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

interface MotionInViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
}

const offsets = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
};

export default function MotionInView({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.55,
  once = true,
}: MotionInViewProps) {
  const reduced = usePrefersReducedMotion();
  const offset = offsets[direction];

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-48px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MotionStagger({
  children,
  className = "",
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduced = usePrefersReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
  };

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MotionStaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();

  const item: Variants = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}
