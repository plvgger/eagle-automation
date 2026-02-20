import { Metadata } from "next";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/motion/FadeIn";
import { GridBackground } from "@/components/motion/GridBackground";
import { solutions, pdfAssets } from "@/lib/content";
import { PDFCardCompact } from "@/components/ui/PDFCard";
import { CellLayoutDiagram } from "@/components/solutions/CellLayoutDiagram";
import { CopyableInputs } from "@/components/solutions/CopyableInputs";
import Image from "next/image";
import { SolutionsNav } from "@/components/solutions/SolutionsNav";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Explore Eagle Automation's turnkey CNC automation solutions: machine tending, palletizing, loading/unloading, and part transfer.",
};

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <GridBackground />
        <div className="relative container-page">
          <FadeIn>
            <p className="text-xs font-semibold tracking-widest uppercase text-eagle-orange">
              Solutions
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              What We Automate
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg text-dark-400 max-w-2xl">
              Each solution is engineered around your specific process, parts,
              and floor constraints. We handle the integration so you can focus
              on production.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Scrollspy nav */}
      <SolutionsNav items={solutions.map((s) => ({ id: s.id, title: s.title }))} />

      {/* Solutions Detail */}
      {solutions.map((solution, index) => {
        const relatedDocs = solution.relatedPdfs
          ? pdfAssets.filter((p) => solution.relatedPdfs!.includes(p.id))
          : [];

        return (
          <Section
            key={solution.id}
            id={solution.id}
            dark={index % 2 === 0}
            className="border-t border-dark-800"
          >
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Content */}
              <div>
                <FadeIn>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white">
                    {solution.headline}
                  </h2>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <p className="mt-4 text-dark-400 leading-relaxed">
                    {solution.description}
                  </p>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <div className="mt-8">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-eagle-orange">
                      Who It&apos;s For
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {solution.whoItsFor.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-eagle-orange flex-shrink-0 mt-0.5" />
                          <span className="text-dark-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="mt-8">
                    <Button href="/contact">
                      Scope My Process
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </FadeIn>
              </div>

              {/* Details */}
              <div className="space-y-6">
                {/* Solution media */}
                {solution.media && solution.media.length > 0 && (
                  <FadeIn delay={0.1}>
                    <div className={`grid gap-3 ${solution.media.length > 1 ? "grid-cols-2" : ""}`}>
                      {solution.media.slice(0, 2).map((m) => (
                        <div key={m.src} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-dark-700 bg-dark-800/50">
                          <Image
                            src={m.src}
                            alt={m.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 550px"
                          />
                        </div>
                      ))}
                    </div>
                  </FadeIn>
                )}

                {/* Cell layout schematic */}
                {solution.layoutComponents && (
                  <FadeIn delay={0.15}>
                    <CellLayoutDiagram
                      components={solution.layoutComponents}
                      title="Typical Cell Components"
                    />
                  </FadeIn>
                )}

                <FadeIn delay={0.2}>
                  <Card padding="lg">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-eagle-orange">
                      Typical Cell Layout
                    </h3>
                    <p className="mt-3 text-dark-400 leading-relaxed">
                      {solution.typicalLayout}
                    </p>
                  </Card>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <Card padding="lg">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-eagle-orange mb-4">
                      Required Inputs
                    </h3>
                    <CopyableInputs inputs={solution.requiredInputs} />
                  </Card>
                </FadeIn>

                <FadeIn delay={0.4}>
                  <Card
                    padding="lg"
                    className="border-eagle-orange/20 bg-eagle-orange/5"
                  >
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-eagle-orange">
                      Safety Note
                    </h3>
                    <p className="mt-3 text-dark-300 text-sm leading-relaxed">
                      {solution.safetyNote}
                    </p>
                  </Card>
                </FadeIn>

                {/* Per-solution related PDFs */}
                {relatedDocs.length > 0 && (
                  <FadeIn delay={0.5}>
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-dark-500">
                        Related Resources
                      </h4>
                      {relatedDocs.map((asset) => (
                        <PDFCardCompact
                          key={asset.id}
                          title={asset.title}
                          filename={asset.filename}
                          category={asset.category}
                        />
                      ))}
                    </div>
                  </FadeIn>
                )}
              </div>
            </div>
          </Section>
        );
      })}

      {/* Global Resources */}
      <Section dark>
        <FadeIn>
          <SectionHeader
            headline="All Resources"
            subheadline="Download specifications and financial analysis materials."
          />
        </FadeIn>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pdfAssets.map((asset) => (
            <FadeIn key={asset.id}>
              <PDFCardCompact
                title={asset.title}
                filename={asset.filename}
                category={asset.category}
              />
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}
