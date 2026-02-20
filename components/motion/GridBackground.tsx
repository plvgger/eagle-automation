"use client";

import { cn } from "@/lib/cn";

interface GridBackgroundProps {
  className?: string;
  showRadial?: boolean;
}

export function GridBackground({
  className,
  showRadial = true,
}: GridBackgroundProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-100" />

      {/* Radial Gradient */}
      {showRadial && (
        <div className="absolute inset-0 gradient-radial-top" />
      )}

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 gradient-fade-bottom" />
    </div>
  );
}

export function NoiseOverlay({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 opacity-[0.015]",
        className
      )}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}
