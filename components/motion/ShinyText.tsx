"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

interface ShinyTextProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds between shimmer sweeps. Longer = more restrained. */
  interval?: number;
}

/**
 * Orange text with a slow, subtle light sheen sweeping across it.
 * reactbits-style "Shiny Text", tuned premium (low contrast, slow cadence).
 * Falls back to solid orange when the user prefers reduced motion.
 */
export function ShinyText({
  children,
  className,
  interval = 6,
}: ShinyTextProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <span className={cn("text-eagle-orange", className)}>{children}</span>;
  }

  return (
    <motion.span
      className={cn("inline-block bg-clip-text text-transparent", className)}
      style={{
        backgroundImage:
          "linear-gradient(110deg, #FF8C00 0%, #FF8C00 40%, #FFE0B5 50%, #FF8C00 60%, #FF8C00 100%)",
        backgroundSize: "220% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
      }}
      initial={{ backgroundPosition: "180% 0%" }}
      animate={{ backgroundPosition: "-80% 0%" }}
      transition={{
        duration: 1.4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: Math.max(interval - 1.4, 0),
      }}
    >
      {children}
    </motion.span>
  );
}
