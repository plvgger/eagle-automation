"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AnimatedOrb() {
  const prefersReducedMotion = useReducedMotion();

  const noMotion = { x: 0, y: 0 };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-[900px] h-[900px] rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(255,140,0,0.18) 0%, rgba(255,140,0,0.06) 40%, transparent 70%)",
          top: "-10%",
          right: "-5%",
          translateZ: 0,
        }}
        animate={prefersReducedMotion ? noMotion : { x: [0, 30, -20, 0], y: [0, -20, 10, 0] }}
        transition={prefersReducedMotion ? undefined : { duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(255,140,0,0.08) 0%, rgba(255,140,0,0.02) 40%, transparent 70%)",
          bottom: "5%",
          left: "-8%",
          translateZ: 0,
        }}
        animate={prefersReducedMotion ? noMotion : { x: [0, -20, 15, 0], y: [0, 15, -10, 0] }}
        transition={prefersReducedMotion ? undefined : { duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(37,150,190,0.05) 0%, transparent 60%)",
          bottom: "-5%",
          left: "30%",
          translateZ: 0,
        }}
        animate={prefersReducedMotion ? noMotion : { x: [0, 10, -10, 0], y: [0, -10, 5, 0] }}
        transition={prefersReducedMotion ? undefined : { duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
