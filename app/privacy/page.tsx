import { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { GridBackground } from "@/components/motion/GridBackground";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}. Learn how we collect, use, and protect your information.`,
};

export default function PrivacyPage() {
  return (
    <>
      <section className="relative pt-32 pb-12 overflow-hidden">
        <GridBackground />
        <div className="relative container-page">
          <FadeIn>
            <p className="text-xs font-semibold tracking-widest uppercase text-eagle-orange">
              Legal
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Privacy Policy
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 text-sm text-dark-500">
              Last updated: February 2026
            </p>
          </FadeIn>
        </div>
      </section>

      <Section>
        <div className="prose prose-invert prose-sm max-w-3xl mx-auto space-y-8">
          <FadeIn>
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">Information We Collect</h2>
              <p className="text-dark-400 leading-relaxed">
                When you submit an inquiry through our contact form, we collect the information you
                provide: your name, company name, email address, phone number, and details about
                your manufacturing process. We may also collect basic analytics data (pages visited,
                time on site) through Google Analytics to improve our website.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">How We Use Your Information</h2>
              <p className="text-dark-400 leading-relaxed">
                We use the information you provide solely to respond to your inquiry, prepare
                preliminary automation scopes and ROI estimates, and communicate with you about
                potential projects. We do not sell, rent, or share your personal information with
                third parties for marketing purposes.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">Data Retention</h2>
              <p className="text-dark-400 leading-relaxed">
                We retain your contact information and inquiry details for as long as necessary to
                fulfill the purpose for which it was collected, typically for the duration of our
                business relationship. You may request deletion of your data at any time by
                contacting us.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">Cookies & Analytics</h2>
              <p className="text-dark-400 leading-relaxed">
                This website may use cookies and similar technologies for analytics purposes. Google
                Analytics may collect anonymized data about your visit, including pages viewed and
                general location. No personally identifiable information is shared with analytics
                providers.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">Security</h2>
              <p className="text-dark-400 leading-relaxed">
                We take reasonable measures to protect your information, including encrypted data
                transmission (HTTPS) and secure email handling. However, no method of electronic
                transmission is 100% secure.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
              <p className="text-dark-400 leading-relaxed">
                For questions about this privacy policy or to request data deletion, contact us at{" "}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-eagle-orange hover:underline"
                >
                  {siteConfig.contact.email}
                </a>{" "}
                or call{" "}
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-eagle-orange hover:underline"
                >
                  {siteConfig.contact.phone}
                </a>
                .
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
