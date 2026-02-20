import { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/Section";
import { PDFCard } from "@/components/ui/PDFCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { GridBackground } from "@/components/motion/GridBackground";
import { pdfAssets } from "@/lib/content";
import { ROICalculator } from "./ROICalculator";

export const metadata: Metadata = {
  title: "ROI & Resources",
  description:
    "Calculate your automation ROI and download financial analysis materials. See payback projections for CNC automation.",
};

export default function ROIPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <GridBackground />
        <div className="relative container-page">
          <FadeIn>
            <p className="text-xs font-semibold tracking-widest uppercase text-eagle-orange">
              ROI & Resources
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Financial Analysis Hub
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg text-dark-400 max-w-2xl">
              Automation is a capital decision. We provide the numbers to
              support your evaluation—no pressure, just data.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Calculator */}
      <Section dark id="calculator">
        <FadeIn>
          <SectionHeader
            kicker="Interactive Tool"
            headline="ROI Estimator"
            subheadline="Enter your labor parameters to see estimated payback. Final ROI depends on application and turnkey configuration."
          />
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="mt-12">
            <ROICalculator />
          </div>
        </FadeIn>
      </Section>

      {/* PDF Downloads */}
      <Section id="deck">
        <FadeIn>
          <SectionHeader
            kicker="Downloads"
            headline="Financial Materials"
            subheadline="Detailed analysis documents for your evaluation process."
          />
        </FadeIn>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pdfAssets.map((asset) => (
            <FadeIn key={asset.id}>
              <PDFCard
                title={asset.title}
                description={asset.description}
                filename={asset.filename}
                thumbnail={asset.thumbnail}
                category={asset.category}
              />
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Disclaimer */}
      <Section dark>
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-2xl font-bold text-white">
              Important Considerations
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-6 text-dark-400 space-y-4 text-sm leading-relaxed">
              <p>
                All ROI projections are estimates based on stated labor rates
                and standard assumptions. Actual payback periods vary based on
                cycle time, utilization, part mix, and integration complexity.
              </p>
              <p>
                Investment amounts reflect list pricing for standard
                configurations. Custom engineering, special EOAT, or complex
                integration may affect total investment.
              </p>
              <p>
                Contact us for a custom analysis based on your specific
                application and process requirements.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
