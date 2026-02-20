"use client";

import { Section, SectionHeader } from "@/components/ui/Section";
import { GlowCard } from "@/components/motion/GlowCard";
import { FadeIn, FadeInStagger, fadeInVariants } from "@/components/motion/FadeIn";
import { CountUp } from "@/components/motion/CountUp";
import { outcomesContent } from "@/lib/content";
import { motion } from "framer-motion";

export function Outcomes() {
  return (
    <Section dark>
      <FadeIn>
        <SectionHeader
          kicker="Business Impact"
          headline={outcomesContent.headline}
        />
      </FadeIn>

      <FadeInStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {outcomesContent.items.map((item) => (
          <motion.div key={item.title} variants={fadeInVariants}>
            <GlowCard
              className="border border-dark-700 h-full"
              glowColor={
                item.variant === "money"
                  ? "rgba(74, 222, 128, 0.12)"
                  : "rgba(255, 140, 0, 0.12)"
              }
            >
              <div className="p-8">
                <div
                  className={`text-3xl font-black ${
                    item.variant === "money"
                      ? "text-[#4ade80]"
                      : "text-eagle-orange"
                  }`}
                >
                  <CountUp value={item.metric} />
                </div>
                <div className="mt-1 text-xs text-dark-500 uppercase tracking-wider">
                  {item.metricLabel}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-dark-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </FadeInStagger>
    </Section>
  );
}
