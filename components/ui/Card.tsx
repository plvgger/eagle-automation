import { cn } from "@/lib/cn";
import { CountUp } from "@/components/motion/CountUp";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

const paddingStyles = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  children,
  className,
  hover = false,
  padding = "md",
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-dark-700 bg-dark-900",
        paddingStyles[padding],
        hover && "card-hover",
        className
      )}
    >
      {children}
    </div>
  );
}

export function StatCard({
  value,
  unit,
  label,
  className,
  variant = "default",
  animate = false,
}: {
  value: string;
  unit?: string;
  label: string;
  className?: string;
  variant?: "default" | "money";
  animate?: boolean;
}) {
  const valueColor = variant === "money" ? "text-[#4ade80]" : "text-white";
  const unitColor = variant === "money" ? "text-[#4ade80]" : "text-eagle-orange";

  return (
    <div className={cn("text-center", className)}>
      <div className="flex items-baseline justify-center gap-1">
        {animate ? (
          <CountUp
            value={value}
            className={cn(
              "text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight",
              valueColor
            )}
          />
        ) : (
          <span
            className={cn(
              "text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight",
              valueColor
            )}
          >
            {value}
          </span>
        )}
        {unit && (
          <span className={cn("text-2xl sm:text-3xl font-bold", unitColor)}>
            {unit}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-dark-400 font-medium">{label}</p>
    </div>
  );
}

export function MetricCard({
  metric,
  label,
  description,
  variant = "default",
}: {
  metric: string;
  label: string;
  description?: string;
  variant?: "default" | "money";
}) {
  const metricColor =
    variant === "money" ? "text-[#4ade80]" : "text-eagle-orange";

  return (
    <Card hover padding="lg">
      <div className={cn("text-3xl sm:text-4xl font-black", metricColor)}>
        {metric}
      </div>
      <div className="mt-2 text-lg font-semibold text-white">{label}</div>
      {description && (
        <p className="mt-2 text-sm text-dark-400">{description}</p>
      )}
    </Card>
  );
}
