"use client";

import { Section, SectionHeader } from "@/components/ui/Section";
import { FadeIn, FadeInStagger, fadeInVariants } from "@/components/motion/FadeIn";
import { GlowCard } from "@/components/motion/GlowCard";
import { industriesContent } from "@/lib/content";
import { motion } from "framer-motion";
import { Target, Plane, Factory, Wrench } from "lucide-react";

const industryIcons = {
  Firearms: Target,
  "Aerospace & Defense": Plane,
  "Job Shops": Wrench,
  "General Manufacturing": Factory,
};

export function Industries() {
  return (
    <Section>
      <FadeIn>
        <SectionHeader
          kicker="Industries"
          headline={industriesContent.headline}
          subheadline={industriesContent.subheadline}
        />
      </FadeIn>

      <FadeInStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {industriesContent.items.map((industry) => {
          const Icon =
            industryIcons[industry.name as keyof typeof industryIcons] ||
            Factory;
          return (
            <motion.div key={industry.name} variants={fadeInVariants}>
              <GlowCard className="border border-dark-800 h-full">
                <div className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-dark-800 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-eagle-orange" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    {industry.name}
                  </h3>
                  <p className="mt-2 text-sm text-dark-400 leading-relaxed">
                    {industry.description}
                  </p>
                </div>
              </GlowCard>
            </motion.div>
          );
        })}
      </FadeInStagger>
    </Section>
  );
}
