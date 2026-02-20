import { cn } from "@/lib/cn";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  dark?: boolean;
  noPadding?: boolean;
}

export function Section({
  children,
  className,
  containerClassName,
  id,
  dark = false,
  noPadding = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative",
        dark ? "bg-dark-900" : "bg-dark-950",
        !noPadding && "py-20 lg:py-28",
        className
      )}
    >
      <div className={cn("container-page", containerClassName)}>{children}</div>
    </section>
  );
}

export function SectionHeader({
  kicker,
  headline,
  subheadline,
  className,
  align = "left",
}: {
  kicker?: string;
  headline: string;
  subheadline?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {kicker && (
        <p className="text-xs font-semibold tracking-widest uppercase text-eagle-orange mb-4">
          {kicker}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
        {headline}
      </h2>
      {subheadline && (
        <p className="mt-4 text-lg text-dark-400 leading-relaxed">
          {subheadline}
        </p>
      )}
    </div>
  );
}
