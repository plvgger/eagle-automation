"use client";

import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { siteConfig } from "@/lib/content";
import { motion, useReducedMotion } from "framer-motion";

export function CTA() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Layered background */}
      <div className="absolute inset-0 bg-dark-950" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Animated glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,139,0,0.1) 0%, transparent 70%)",
        }}
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={prefersReducedMotion ? undefined : {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-eagle-orange/40 to-transparent" />

      <div className="relative container-page">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Ready to Reduce Your{" "}
              <span className="text-eagle-orange">
                Labor Exposure
              </span>
              ?
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mt-6 text-lg text-dark-400 leading-relaxed">
              Tell us about your operation and we&apos;ll scope a turnkey solution
              with a detailed payback projection — no commitment required.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button href="/contact" size="lg" className="shadow-[0_4px_12px_rgba(255,140,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,140,0,0.4)]">
                  Automate Your Process
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  href={`tel:${siteConfig.contact.phone}`}
                  variant="secondary"
                  size="lg"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Talk to Engineering
                </Button>
              </motion.div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-8 text-sm text-dark-500">
              No commitment required. Typical response within one business day.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
