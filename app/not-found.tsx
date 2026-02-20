import { ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center">
      <div className="container-page text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-eagle-orange/10 mb-8">
          <span className="text-2xl font-black text-eagle-orange">404</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
          Page Not Found
        </h1>

        <p className="mt-4 text-lg text-dark-400 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get
          you back on track.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/" variant="secondary">
            <Home className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
          <Button href="/contact">
            Scope Your Automation
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
