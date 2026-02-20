import { Metadata } from "next";
import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeIn, FadeInStagger } from "@/components/motion/FadeIn";
import { MotionArticle } from "@/components/motion/MotionDiv";
import { GridBackground } from "@/components/motion/GridBackground";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real-world CNC automation case studies showing ROI, cycle time improvements, and operational outcomes.",
};

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <GridBackground />
        <div className="relative container-page">
          <FadeIn>
            <p className="text-xs font-semibold tracking-widest uppercase text-eagle-orange">
              Case Studies
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Results in Production
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg text-dark-400 max-w-2xl">
              Real implementations with measurable outcomes. See how
              manufacturers like you have achieved ROI with Eagle Automation.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Example Note */}
      <Section noPadding className="py-4">
        <FadeIn>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-eagle-orange/10 border border-eagle-orange/20">
            <AlertCircle className="w-5 h-5 text-eagle-orange flex-shrink-0" />
            <p className="text-sm text-dark-300">
              <strong className="text-white">Note:</strong> These case studies
              represent typical implementation scenarios. Details have been
              generalized to protect customer confidentiality.
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* Case Studies */}
      <Section>
        <FadeInStagger className="space-y-16">
          {caseStudies.map((study, index) => (
            <MotionArticle
              key={study.id}
              className="grid gap-8 lg:grid-cols-2 lg:gap-12"
            >
              {/* Content */}
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-800 text-xs font-semibold uppercase tracking-wider text-eagle-orange">
                  {study.industry}
                </div>
                <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-white">
                  {study.title}
                </h2>

                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-dark-500">
                      Challenge
                    </h3>
                    <p className="mt-2 text-dark-400 leading-relaxed">
                      {study.challenge}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-dark-500">
                      Approach
                    </h3>
                    <p className="mt-2 text-dark-400 leading-relaxed">
                      {study.approach}
                    </p>
                  </div>
                </div>

                {study.quote && (
                  <blockquote className="mt-8 pl-4 border-l-2 border-eagle-orange">
                    <p className="text-dark-300 italic">&ldquo;{study.quote}&rdquo;</p>
                    <cite className="mt-2 block text-sm text-dark-500 not-italic">
                      — {study.quoteAuthor}
                    </cite>
                  </blockquote>
                )}

                <Link
                  href={`/case-studies/${study.id}`}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-eagle-orange hover:text-eagle-orange-light transition-colors"
                >
                  View Full Case Study
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Metrics */}
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <Card padding="lg" className="h-full">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-eagle-orange">
                    Outcomes
                  </h3>
                  <div className="mt-6 grid grid-cols-2 gap-6">
                    {study.outcomes.map((outcome) => (
                      <div key={outcome.label}>
                        <div className={`text-3xl sm:text-4xl font-bold ${outcome.variant === "money" ? "text-[#4ade80]" : "text-white"}`}>
                          {outcome.metric}
                        </div>
                        <div className="mt-1 text-sm text-dark-400">
                          {outcome.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {study.isExample && (
                    <p className="mt-8 pt-6 border-t border-dark-700 text-xs text-dark-500">
                      Example format — specific details available upon request
                      for qualified prospects.
                    </p>
                  )}
                </Card>
              </div>
            </MotionArticle>
          ))}
        </FadeInStagger>
      </Section>

      {/* CTA */}
      <Section dark>
        <div className="text-center max-w-2xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              See How Automation Fits Your Operation
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 text-dark-400">
              Every shop is different. Let&apos;s discuss your specific challenges
              and see what ROI looks like for your process.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-8">
              <Button href="/contact" size="lg">
                Discuss Your Application
              </Button>
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
