/* AnimateIn - Scroll-triggered entrance animations using framer-motion
   Usage: <AnimateIn> wraps any element for fade-up on scroll
   Variants: fade-up, fade-left, fade-right, scale, stagger-children */

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// Full transform strings (not Motion's x/y/scale shorthands) let the browser
// run the reveal on the compositor, so it stays smooth while a phone scrolls.
const ENTRANCE_EASE = [0.23, 1, 0.32, 1] as const;

const presets: Record<string, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, transform: "translateY(32px)" },
    visible: { opacity: 1, transform: "translateY(0px)" },
  },
  "fade-down": {
    hidden: { opacity: 0, transform: "translateY(-24px)" },
    visible: { opacity: 1, transform: "translateY(0px)" },
  },
  "fade-left": {
    hidden: { opacity: 0, transform: "translateX(-40px)" },
    visible: { opacity: 1, transform: "translateX(0px)" },
  },
  "fade-right": {
    hidden: { opacity: 0, transform: "translateX(40px)" },
    visible: { opacity: 1, transform: "translateX(0px)" },
  },
  scale: {
    hidden: { opacity: 0, transform: "scale(0.92)" },
    visible: { opacity: 1, transform: "scale(1)" },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

interface AnimateInProps {
  children: ReactNode;
  variant?: keyof typeof presets;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

export default function AnimateIn({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
  amount = 0.15,
}: AnimateInProps) {
  // Reduced motion keeps the fade and drops the movement.
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={reduce ? presets.fade : presets[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: ENTRANCE_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Stagger container for lists of items */
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.08,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ staggerChildren: staggerDelay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={
        reduce
          ? presets.fade
          : {
              hidden: { opacity: 0, transform: "translateY(24px)" },
              visible: { opacity: 1, transform: "translateY(0px)" },
            }
      }
      transition={{ duration: 0.5, ease: ENTRANCE_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
