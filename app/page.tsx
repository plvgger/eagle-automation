import { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Outcomes } from "@/components/sections/Outcomes";
import { Industries } from "@/components/sections/Industries";
import { Capabilities } from "@/components/sections/Capabilities";
import { Process } from "@/components/sections/Process";
import { FeaturedAssets } from "@/components/sections/FeaturedAssets";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Turnkey CNC Automation | Eagle Automation",
  description:
    "ROI-driven CNC automation integration. Replace labor exposure with fixed capital. Achieve lights-out production with payback under 12 months.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Outcomes />
      <Industries />
      <Capabilities />
      <Process />
      <FeaturedAssets />
      <CTA />
    </>
  );
}
