"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

interface BlurTextProps {
  text: string;
  className?: string;
  /** Delay before the first word animates in (seconds). */
  delay?: number;
  /** Per-word stagger (seconds). */
  stagger?: number;
}

/**
 * Reveals text word-by-word with a blur + fade + rise.
 * reactbits-style "Blur Text", kept tight and premium (no toy bounce).
 * Falls back to static text when the user prefers reduced motion.
 */
export function BlurText({
  text,
  className,
  delay = 0,
  stagger = 0.08,
}: BlurTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={cn("inline-block", className)}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block will-change-[transform,filter,opacity]"
          initial={{ opacity: 0, filter: "blur(8px)", y: "0.25em" }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * stagger,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}
