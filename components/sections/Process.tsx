"use client";

import { Section, SectionHeader } from "@/components/ui/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { processSteps } from "@/lib/content";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function ProcessStep({
  step,
  index,
}: {
  step: { number: string; title: string; description: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="flex flex-col items-center text-center"
    >
      {/* Step number circle */}
      <motion.div
        className="relative z-10 w-12 h-12 rounded-full border-2 border-dark-700 bg-dark-950 flex items-center justify-center mb-5"
        animate={isInView ? { borderColor: "rgba(255,140,0,0.5)" } : {}}
        transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
      >
        <span className="text-sm font-bold text-eagle-orange">
          {step.number}
        </span>
      </motion.div>

      <h3 className="text-lg font-semibold text-white">{step.title}</h3>
      <p className="mt-2 text-sm text-dark-400 leading-relaxed max-w-[200px]">
        {step.description}
      </p>
    </motion.div>
  );
}

export function Process() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isTimelineInView = useInView(timelineRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <Section>
      <FadeIn>
        <SectionHeader
          kicker="Our Process"
          headline="From Discovery to Production"
          subheadline="A structured approach that de-risks your automation investment and ensures successful deployment."
          align="center"
        />
      </FadeIn>

      <div ref={timelineRef} className="mt-16 relative">
        {/* Horizontal connecting line — desktop only, sits behind circles */}
        <div className="hidden xl:block absolute top-6 left-0 right-0 h-px z-0">
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-dark-700 to-transparent"
            initial={{ scaleX: 0 }}
            animate={isTimelineInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          />
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {processSteps.map((step, index) => (
            <ProcessStep key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}
