"use client";

import { Section, SectionHeader } from "@/components/ui/Section";
import { PDFCard } from "@/components/ui/PDFCard";
import { FadeIn, FadeInStagger, fadeInVariants } from "@/components/motion/FadeIn";
import { pdfAssets } from "@/lib/content";
import { motion } from "framer-motion";

export function FeaturedAssets() {
  return (
    <Section dark>
      {/* Top glow separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dark-700 to-transparent" />

      <FadeIn>
        <SectionHeader
          kicker="Resources"
          headline="Download Our Materials"
          subheadline="Financial analysis, specifications, and executive summaries to support your evaluation."
        />
      </FadeIn>

      <FadeInStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pdfAssets.map((asset) => (
          <motion.div key={asset.id} variants={fadeInVariants}>
            <PDFCard
              title={asset.title}
              description={asset.description}
              filename={asset.filename}
              thumbnail={asset.thumbnail}
              category={asset.category}
            />
          </motion.div>
        ))}
      </FadeInStagger>
    </Section>
  );
}
