import { Metadata } from "next";
import { CheckCircle, Phone, Wrench, GraduationCap, HeadphonesIcon } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeIn, FadeInStagger } from "@/components/motion/FadeIn";
import { MotionDiv } from "@/components/motion/MotionDiv";
import { GridBackground } from "@/components/motion/GridBackground";
import { processContent } from "@/lib/content";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Process & Support",
  description:
    "Learn about Eagle Automation's turnkey integration process from discovery to production, including training and ongoing support.",
};

export default function ProcessPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <GridBackground />
        <div className="relative container-page">
          <FadeIn>
            <p className="text-xs font-semibold tracking-widest uppercase text-eagle-orange">
              Process & Support
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Turnkey Integration,{" "}
              <span className="text-eagle-orange">Local Support</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg text-dark-400 max-w-2xl">
              From initial discovery to ongoing production support, we handle
              the complexity so you can focus on making parts.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Discovery */}
      <Section dark>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <FadeIn>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-eagle-orange/10">
                <Phone className="w-6 h-6 text-eagle-orange" />
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-white">
                {processContent.discovery.headline}
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-4 text-dark-400 leading-relaxed">
                {processContent.discovery.description}
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-8">
                <Button href="/contact">Schedule a Call</Button>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <div className="space-y-6">
              <Card padding="lg">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-eagle-orange mb-4">
                  What We Need to Know
                </h3>
                <ul className="space-y-3">
                  {processContent.discovery.whatWeDiscuss.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-eagle-orange flex-shrink-0 mt-0.5" />
                      <span className="text-dark-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              {processContent.discovery.prepareItems && (
                <Card padding="lg" className="bg-dark-800/50">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-eagle-accent mb-3">
                    Prepare These Items
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {processContent.discovery.prepareItems.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 text-sm font-medium text-white bg-dark-700 rounded-md"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-dark-500">
                    The more details you provide upfront, the more accurate our ROI analysis and system proposal will be.
                  </p>
                </Card>
              )}
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Process media */}
      <Section className="border-t border-dark-800 pb-0">
        <FadeIn>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-dark-700">
              <Image
                src="/images/applications/crx-cnc-tending-cell.png"
                alt="FANUC CRX cobot with CNC automation cell"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 550px"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-dark-700">
              <Image
                src="/images/applications/crx-20ia-machine-tending.png"
                alt="FANUC CRX-20iA/L tending a CNC machine on-site"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 550px"
              />
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Assessment */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <FadeIn className="lg:order-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-eagle-orange/10">
              <Wrench className="w-6 h-6 text-eagle-orange" />
            </div>
            <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-white">
              {processContent.assessment.headline}
            </h2>
            <p className="mt-4 text-dark-400 leading-relaxed">
              {processContent.assessment.description}
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="lg:order-1">
            <Card padding="lg">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-eagle-orange mb-4">
                Assessment Checklist
              </h3>
              <ul className="space-y-3">
                {processContent.assessment.checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-eagle-orange flex-shrink-0 mt-0.5" />
                    <span className="text-dark-300">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </FadeIn>
        </div>
      </Section>

      {/* Timeline */}
      <Section dark>
        <FadeIn>
          <SectionHeader
            kicker="Timeline"
            headline={processContent.timeline.headline}
            subheadline={`Typical project: ${processContent.timeline.typical}`}
            align="center"
          />
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-dark-700 ml-[11px]" />

              {/* Timeline items */}
              <div className="space-y-8">
                {processContent.timeline.phases.map((phase) => (
                  <div key={phase.week} className="relative flex gap-6">
                    <div className="relative flex-shrink-0">
                      <div className="w-6 h-6 rounded-full bg-dark-900 border-2 border-eagle-orange flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-eagle-orange" />
                      </div>
                    </div>
                    <div className="pb-8">
                      <div className="text-sm font-semibold text-eagle-orange">
                        Week {phase.week}
                      </div>
                      <div className="mt-1 text-lg font-semibold text-white">
                        {phase.activity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Training */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <FadeIn>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-eagle-orange/10">
                <GraduationCap className="w-6 h-6 text-eagle-orange" />
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-white">
                {processContent.training.headline}
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-4 text-dark-400 leading-relaxed">
                {processContent.training.description}
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <Card padding="lg">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-eagle-orange mb-4">
                Training Includes
              </h3>
              <ul className="space-y-3">
                {processContent.training.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-eagle-orange flex-shrink-0 mt-0.5" />
                    <span className="text-dark-300">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </FadeIn>
        </div>
      </Section>

      {/* Support */}
      <Section dark>
        <FadeIn>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-eagle-orange/10">
            <HeadphonesIcon className="w-6 h-6 text-eagle-orange" />
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-white">
            {processContent.support.headline}
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-4 text-dark-400 max-w-2xl">
            {processContent.support.description}
          </p>
        </FadeIn>

        <FadeInStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {processContent.support.features.map((feature) => (
            <MotionDiv key={feature.title}>
              <Card padding="lg" hover className="h-full">
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-dark-400">{feature.detail}</p>
              </Card>
            </MotionDiv>
          ))}
        </FadeInStagger>
      </Section>

      {/* CTA */}
      <Section className="border-t border-dark-800">
        <div className="text-center max-w-2xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Ready to Start the Process?
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 text-dark-400">
              The first step is a simple conversation. No commitment, no
              pressure—just a discussion about your operation.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-8">
              <Button href="/contact" size="lg">
                Schedule Discovery Call
              </Button>
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
