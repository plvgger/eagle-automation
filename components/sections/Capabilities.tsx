"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { FadeIn, FadeInStagger, fadeInVariants } from "@/components/motion/FadeIn";
import { GlowCard } from "@/components/motion/GlowCard";
import { capabilitiesContent } from "@/lib/content";
import { motion } from "framer-motion";

export function Capabilities() {
  return (
    <Section dark>
      <FadeIn>
        <SectionHeader
          kicker="What We Do"
          headline={capabilitiesContent.headline}
        />
      </FadeIn>

      <FadeInStagger className="mt-12 grid gap-6 sm:grid-cols-2">
        {capabilitiesContent.items.map((item) => (
          <motion.div key={item.title} variants={fadeInVariants}>
            <Link href={item.href} className="block h-full">
              <GlowCard className="group border border-dark-700 h-full">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white group-hover:text-eagle-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-dark-400 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-semibold text-eagle-orange">
                    Learn more
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </GlowCard>
            </Link>
          </motion.div>
        ))}
      </FadeInStagger>
    </Section>
  );
}
