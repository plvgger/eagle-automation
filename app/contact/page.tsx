import { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/motion/FadeIn";
import { GridBackground } from "@/components/motion/GridBackground";
import { contactContent, siteConfig } from "@/lib/content";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Scope your CNC automation project with Eagle Automation. Tell us about your process and receive a preliminary scope and ROI estimate within one business day.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <GridBackground />
        <div className="relative container-page">
          <FadeIn>
            <p className="text-xs font-semibold tracking-widest uppercase text-eagle-orange">
              Contact
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              {contactContent.headline}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg text-dark-400 max-w-2xl">
              {contactContent.subheadline}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Form Section */}
      <Section dark>
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <FadeIn>
              <h2 className="text-xl font-semibold text-white">
                Contact Information
              </h2>
              <p className="mt-2 text-sm text-dark-400">
                Prefer to reach out directly? We&apos;re available during business
                hours.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="mt-8 space-y-6">
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-dark-800 flex items-center justify-center flex-shrink-0 group-hover:bg-eagle-orange/10 transition-colors">
                    <Phone className="w-5 h-5 text-eagle-orange" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-eagle-orange transition-colors">
                      Phone
                    </div>
                    <div className="mt-1 text-sm text-dark-400">
                      {siteConfig.contact.phone}
                    </div>
                  </div>
                </a>

                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-dark-800 flex items-center justify-center flex-shrink-0 group-hover:bg-eagle-orange/10 transition-colors">
                    <Mail className="w-5 h-5 text-eagle-orange" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-eagle-orange transition-colors">
                      Email
                    </div>
                    <div className="mt-1 text-sm text-dark-400">
                      {siteConfig.contact.email}
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-dark-800 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-eagle-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      Location
                    </div>
                    <div className="mt-1 text-sm text-dark-400">
                      {siteConfig.contact.address}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Card padding="md" className="mt-8">
                <p className="text-sm text-dark-400">
                  <strong className="text-white">Response Time:</strong> We
                  typically respond within one business day. For urgent
                  inquiries, call us directly.
                </p>
              </Card>
            </FadeIn>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <FadeIn delay={0.1}>
              <ContactForm />
            </FadeIn>
          </div>
        </div>
      </Section>
    </>
  );
}
