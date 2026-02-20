import { Metadata } from "next";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeIn, FadeInStagger } from "@/components/motion/FadeIn";
import { MotionDiv } from "@/components/motion/MotionDiv";
import { GridBackground } from "@/components/motion/GridBackground";
import { platformContent } from "@/lib/content";
import { RobotGrid } from "@/components/platform/RobotGrid";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "Full FANUC CRX collaborative robot lineup, EOAT options, and CNC integration approach. CRX-5iA through CR-35iB — matched to your application.",
};

export default function PlatformPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <GridBackground />
        <div className="relative container-page">
          <FadeIn>
            <p className="text-xs font-semibold tracking-widest uppercase text-eagle-orange">
              Platform
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              {platformContent.headline}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg text-dark-400 max-w-2xl">
              {platformContent.subheadline}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Family Lineup Banner */}
      <Section dark className="border-t border-dark-800 !py-10">
        <FadeIn>
          <div className="relative w-full rounded-xl overflow-hidden border border-dark-700 bg-dark-900">
            <Image
              src="/images/robots/crx-family-lineup.png"
              alt="Full FANUC CRX collaborative robot lineup"
              width={1200}
              height={400}
              className="w-full h-auto"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>
        </FadeIn>
      </Section>

      {/* Robot Models — compact grid with detail expand */}
      <Section dark>
        <FadeIn>
          <SectionHeader
            kicker="FANUC CRX Series"
            headline="Collaborative Robot Lineup"
            subheadline="The full FANUC CRX series — from 5 kg to 50 kg payload. Click any model for full specs."
          />
        </FadeIn>

        <div className="mt-12">
          <RobotGrid robots={platformContent.robots} />
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-12 p-5 rounded-lg border border-dark-700 bg-dark-800/50 text-center max-w-3xl mx-auto">
            <p className="text-sm text-dark-300 leading-relaxed">
              {platformContent.industrialNote}
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* EOAT Options */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <FadeIn>
              <SectionHeader
                kicker="End-of-Arm Tooling"
                headline="Grippers & Fixtures"
                subheadline="We select and integrate the right EOAT for your part geometry, weight, and cycle requirements."
              />
            </FadeIn>

            <FadeInStagger className="mt-8 grid gap-4 sm:grid-cols-2">
              {platformContent.eoatOptions.map((option) => (
                <MotionDiv key={option.category}>
                  <Card padding="md" className="h-full">
                    <h3 className="text-sm font-semibold text-white">
                      {option.category}
                    </h3>
                    <p className="mt-1.5 text-xs text-dark-400 leading-relaxed">
                      {option.description}
                    </p>
                  </Card>
                </MotionDiv>
              ))}
            </FadeInStagger>
          </div>

          <FadeIn delay={0.15}>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-dark-700 bg-white/5">
              <Image
                src="/images/applications/onrobot-grippers.png"
                alt="OnRobot end-of-arm tooling collection — grippers, sensors, and tool changers"
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 550px"
              />
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* CNC Integration */}
      <Section dark>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <FadeIn>
              <p className="text-xs font-semibold tracking-widest uppercase text-eagle-orange">
                Integration
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white">
                {platformContent.integrationApproach.headline}
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-4 text-dark-400 leading-relaxed">
                Every cell includes complete integration with your CNC control.
                We handle the communication, timing, and safety interlocks —
                seamless coordination between PLC, HMI, safety systems, and robot.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-8">
                <Button href="/contact">Discuss Your Machine</Button>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <Card padding="lg">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-eagle-orange mb-4">
                Integration Includes
              </h3>
              <ul className="space-y-3">
                {platformContent.integrationApproach.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-eagle-orange flex-shrink-0 mt-0.5" />
                    <span className="text-dark-300">{point}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </FadeIn>
        </div>
      </Section>

      {/* CTA */}
      <Section className="border-t border-dark-800">
        <div className="text-center max-w-2xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Not Sure Which Platform?
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 text-dark-400">
              Tell us about your part and process. We&apos;ll recommend the right
              robot and EOAT configuration for your application.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-8">
              <Button href="/contact" size="lg">
                Get a Recommendation
              </Button>
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
