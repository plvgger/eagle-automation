import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FadeIn, FadeInStagger } from "@/components/motion/FadeIn";
import { MotionDiv } from "@/components/motion/MotionDiv";
import { GridBackground } from "@/components/motion/GridBackground";
import { caseStudies } from "@/lib/content";
import Image from "next/image";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const study = caseStudies.find((s) => s.id === id);
  if (!study) return { title: "Case Study Not Found" };
  return {
    title: study.title,
    description: `${study.industry} case study: ${study.challenge.slice(0, 140)}`,
  };
}

export default async function CaseStudyDetail({ params }: PageProps) {
  const { id } = await params;
  const study = caseStudies.find((s) => s.id === id);
  if (!study) notFound();

  const studyIndex = caseStudies.findIndex((s) => s.id === id);
  const prev = studyIndex > 0 ? caseStudies[studyIndex - 1] : null;
  const next =
    studyIndex < caseStudies.length - 1 ? caseStudies[studyIndex + 1] : null;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <GridBackground />
        <div className="relative container-page">
          <FadeIn>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-dark-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              All Case Studies
            </Link>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-800 text-xs font-semibold uppercase tracking-wider text-eagle-orange">
              {study.industry}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              {study.title}
            </h1>
          </FadeIn>

          {study.isExample && (
            <FadeIn delay={0.15}>
              <p className="mt-4 text-sm text-dark-500 italic">
                Representative scenario — specific details available upon
                request for qualified prospects.
              </p>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Metrics strip */}
      <Section dark className="border-t border-dark-800">
        <FadeInStagger className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {study.outcomes.map((o) => (
            <MotionDiv key={o.label}>
              <div className="text-center">
                <div
                  className={`text-4xl sm:text-5xl font-black ${
                    o.variant === "money" ? "text-[#4ade80]" : "text-white"
                  }`}
                >
                  {o.metric}
                </div>
                <div className="mt-2 text-sm text-dark-400">{o.label}</div>
              </div>
            </MotionDiv>
          ))}
        </FadeInStagger>
      </Section>

      {/* Challenge / Approach / Outcome */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          <FadeIn>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-dark-500 mb-3">
                Challenge
              </h2>
              <p className="text-dark-300 leading-relaxed">{study.challenge}</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-eagle-orange mb-3">
                Approach
              </h2>
              <p className="text-dark-300 leading-relaxed">{study.approach}</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#4ade80] mb-3">
                Outcome
              </h2>
              <ul className="space-y-2">
                {study.outcomes.map((o) => (
                  <li key={o.label} className="flex items-baseline gap-3">
                    <span
                      className={`font-bold ${
                        o.variant === "money"
                          ? "text-[#4ade80]"
                          : "text-white"
                      }`}
                    >
                      {o.metric}
                    </span>
                    <span className="text-sm text-dark-400">{o.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* System overview — media placeholder */}
      <Section dark>
        <FadeIn>
          <SectionHeader
            kicker="System Overview"
            headline="Automation Cell"
            subheadline="Visual documentation of the deployed system and integration."
          />
        </FadeIn>

        {study.media && study.media.length > 0 && (
          <FadeIn delay={0.2}>
            <div className="mt-12 grid gap-6 sm:grid-cols-1 max-w-2xl mx-auto">
              {study.media.map((m) => (
                <div key={m.src} className="relative aspect-[16/10] rounded-lg overflow-hidden border border-dark-700">
                  <Image
                    src={m.src}
                    alt={m.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 700px"
                  />
                </div>
              ))}
            </div>
          </FadeIn>
        )}
      </Section>

      {/* Quote */}
      {study.quote && (
        <Section>
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <blockquote className="text-2xl sm:text-3xl font-semibold text-white leading-snug">
                &ldquo;{study.quote}&rdquo;
              </blockquote>
              <cite className="mt-4 block text-sm text-dark-500 not-italic">
                — {study.quoteAuthor}
              </cite>
            </div>
          </FadeIn>
        </Section>
      )}

      {/* CTA */}
      <Section dark>
        <div className="text-center max-w-2xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              See Similar Results in Your Operation
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 text-dark-400">
              Every shop is different. Tell us about your process and we&apos;ll
              show you what automation looks like for your specific application.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-8">
              <Button
                href={`/contact?ref=case-study-${study.id}`}
                size="lg"
              >
                Discuss Your Application
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Prev/Next */}
      <Section className="border-t border-dark-800">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {prev ? (
            <Link
              href={`/case-studies/${prev.id}`}
              className="flex items-center gap-3 text-dark-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <div>
                <div className="text-xs text-dark-500">Previous</div>
                <div className="text-sm font-medium">{prev.title}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/case-studies/${next.id}`}
              className="flex items-center gap-3 text-dark-400 hover:text-white transition-colors sm:text-right"
            >
              <div>
                <div className="text-xs text-dark-500">Next</div>
                <div className="text-sm font-medium">{next.title}</div>
              </div>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </Section>
    </>
  );
}
