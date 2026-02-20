"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/Card";
import { FadeIn } from "@/components/motion/FadeIn";
import { GridBackground } from "@/components/motion/GridBackground";
import { AnimatedOrb } from "@/components/motion/AnimatedOrb";
import { heroContent } from "@/lib/content";
import { motion, useReducedMotion } from "framer-motion";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <section className="relative min-h-screen flex items-center pt-18 overflow-hidden">
      <GridBackground />
      <AnimatedOrb />

      <div className="relative container-page py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <FadeIn>
              <motion.p
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-dark-700 bg-dark-900/50 text-xs font-semibold tracking-wider uppercase text-eagle-orange"
                whileHover={{ borderColor: "rgba(255,140,0,0.4)", scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-eagle-orange animate-pulse" />
                {heroContent.kicker}
              </motion.p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="mt-8 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.08]">
                <span className="text-white">{heroContent.headline}</span>
                <br />
                <span className="text-eagle-orange">
                  {heroContent.headlineAccent}
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg lg:text-xl text-dark-400 max-w-2xl leading-relaxed">
                {heroContent.subheadline}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    href={heroContent.ctas.primary.href}
                    size="lg"
                    className="shadow-[0_4px_12px_rgba(255,140,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,140,0,0.4)]"
                  >
                    {heroContent.ctas.primary.label}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    href={heroContent.ctas.secondary.href}
                    variant="secondary"
                    size="lg"
                  >
                    {heroContent.ctas.secondary.label}
                  </Button>
                </motion.div>
              </div>
            </FadeIn>
          </div>

          {/* Right: Hero image */}
          <FadeIn delay={0.3} direction="right" distance={40}>
            <motion.div
              className="relative"
              animate={prefersReducedMotion ? {} : { y: [0, -8, 0] }}
              transition={prefersReducedMotion ? undefined : {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div
                className="absolute inset-0 blur-3xl opacity-20"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(255,140,0,0.3), transparent 70%)",
                }}
              />
              <Image
                src="/images/hero-machines.png"
                alt="CNC machines and FANUC robots — turnkey automation cells"
                width={900}
                height={580}
                className="relative w-full h-auto drop-shadow-2xl scale-110 lg:scale-125 origin-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </FadeIn>
        </div>

        {/* Stats */}
        <FadeIn delay={0.5}>
          <div className="mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-16 pt-10 border-t border-dark-700 max-w-4xl mx-auto text-center">
            {heroContent.stats.map((stat) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                unit={stat.unit}
                label={stat.label}
                variant={stat.variant}
                className="text-center"
                animate
              />
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border-2 border-dark-700 flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-eagle-orange rounded-full will-change-transform"
            animate={prefersReducedMotion ? {} : { y: [0, 14, 0] }}
            transition={prefersReducedMotion ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}
