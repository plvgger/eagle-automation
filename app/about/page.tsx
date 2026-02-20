import { Metadata } from "next";
import { ExternalLink, CheckCircle, Shield } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeIn, FadeInStagger } from "@/components/motion/FadeIn";
import { MotionDiv } from "@/components/motion/MotionDiv";
import { GridBackground } from "@/components/motion/GridBackground";
import Image from "next/image";
import { aboutContent, siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Eagle Automation — FANUC Authorized System Integrator based in Arlington, TX. Turnkey CNC automation integration for Texas manufacturers.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <GridBackground />
        <div className="relative container-page">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-dark-700 bg-dark-900/50 text-xs font-semibold tracking-wider uppercase text-eagle-orange">
              <Shield className="w-3.5 h-3.5" />
              FANUC Authorized System Integrator
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              {aboutContent.headline}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg text-dark-400 max-w-2xl leading-relaxed">
              {aboutContent.intro}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Brand Logos */}
      <Section dark className="pb-0">
        <FadeIn>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
            <div className="flex flex-col items-center gap-3">
              <Image
                src="/logos/eagle-automation-logo-white.png"
                alt="Eagle Automation"
                width={220}
                height={50}
                style={{ height: "auto" }}
              />
              <span className="text-xs text-dark-500 uppercase tracking-wider">Automation Division</span>
            </div>
            <div className="hidden sm:block w-px h-16 bg-dark-700" />
            <div className="sm:hidden w-16 h-px bg-dark-700" />
            <a
              href="https://eaglemachine.net"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 group"
            >
              <Image
                src="/logos/eagle-machine-logo.png"
                alt="Eagle Machine Inc."
                width={200}
                height={50}
                style={{ height: "auto" }}
                className="opacity-70 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-xs text-dark-500 uppercase tracking-wider group-hover:text-dark-300 transition-colors">Parent Company</span>
            </a>
          </div>
        </FadeIn>
      </Section>

      {/* Positioning + Stats */}
      <Section dark>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                {aboutContent.positioning.headline}
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-4 text-dark-400 leading-relaxed">
                {aboutContent.positioning.description}
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 gap-4 text-center">
              <Card padding="lg">
                <div className="text-4xl font-bold text-eagle-orange">FANUC</div>
                <div className="mt-2 text-sm text-dark-400">Authorized System Integrator</div>
              </Card>
              <Card padding="lg">
                <div className="text-4xl font-bold text-eagle-orange">TX</div>
                <div className="mt-2 text-sm text-dark-400">Based in Arlington, TX</div>
              </Card>
              <Card padding="lg">
                <div className="text-4xl font-bold text-eagle-orange">100%</div>
                <div className="mt-2 text-sm text-dark-400">Turnkey Solutions</div>
              </Card>
              <Card padding="lg">
                <div className="text-4xl font-bold text-[#4ade80]">&lt;12 mo</div>
                <div className="mt-2 text-sm text-dark-400">Typical Payback</div>
              </Card>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* What We Do — Services */}
      <Section>
        <FadeIn>
          <SectionHeader
            kicker="Comprehensive Services"
            headline="What We Do"
            subheadline="Define. Design. Integrate. Train. Support. — Customized robotic systems designed to optimize efficiency, productivity, and ROI."
          />
        </FadeIn>

        <FadeInStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {aboutContent.services.map((service) => (
            <MotionDiv key={service.title}>
              <Card hover padding="lg" className="h-full">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-eagle-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-dark-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Card>
            </MotionDiv>
          ))}
        </FadeInStagger>
      </Section>

      {/* Strategic Advantages */}
      <Section dark>
        <FadeIn>
          <SectionHeader
            kicker="Strategic Advantage"
            headline="Solving Today's Challenges"
            subheadline="The business case for automation goes beyond labor savings. Here's how robotics solves the challenges manufacturers face every day."
          />
        </FadeIn>

        <FadeInStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {aboutContent.strategicAdvantages.map((item) => (
            <MotionDiv key={item.title}>
              <Card hover padding="lg" className="h-full">
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-dark-400 leading-relaxed">
                  {item.description}
                </p>
              </Card>
            </MotionDiv>
          ))}
        </FadeInStagger>
      </Section>

      {/* Why Us */}
      <Section>
        <FadeIn>
          <SectionHeader
            kicker="Differentiators"
            headline="Why Eagle Automation"
          />
        </FadeIn>

        <FadeInStagger className="mt-12 grid gap-6 sm:grid-cols-2">
          {aboutContent.whyUs.map((item) => (
            <MotionDiv key={item.title}>
              <Card hover padding="lg" className="h-full">
                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-dark-400 leading-relaxed">
                  {item.description}
                </p>
              </Card>
            </MotionDiv>
          ))}
        </FadeInStagger>
      </Section>

      {/* Eagle Machine */}
      <Section dark>
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <a
              href="https://eaglemachine.net"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mb-6"
            >
              <Image
                src="/logos/eagle-machine-logo.png"
                alt="Eagle Machine Inc."
                width={200}
                height={56}
                style={{ height: "auto" }}
                className="mx-auto opacity-80 hover:opacity-100 transition-opacity"
              />
            </a>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              {aboutContent.eagleMachine.headline}
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 text-dark-400 leading-relaxed">
              {aboutContent.eagleMachine.description}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-8">
              <Button
                href={aboutContent.eagleMachine.link}
                variant="secondary"
                external
              >
                Visit Eagle Machine
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Contact Info */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Get in Touch
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-4 text-dark-400">
                Whether you&apos;re ready to scope an automation project or just want
                to learn more, we&apos;re here to help. Schedule a consultation to
                discuss your specific application requirements.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="mt-8">
                <Button href="/contact" size="lg">
                  Request a Discovery Call
                </Button>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <Card padding="lg">
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-dark-500 uppercase tracking-wider">
                    Headquarters
                  </div>
                  <div className="mt-1 text-lg font-semibold text-white">
                    Eagle Machine, Inc.
                  </div>
                  <div className="mt-1 text-sm text-dark-400">
                    {siteConfig.contact.address}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-dark-500 uppercase tracking-wider">
                    Direct Line
                  </div>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="mt-1 text-lg font-semibold text-white hover:text-eagle-orange transition-colors"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
                <div>
                  <div className="text-xs text-dark-500 uppercase tracking-wider">
                    Sales Inquiries
                  </div>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="mt-1 text-lg font-semibold text-white hover:text-eagle-orange transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
