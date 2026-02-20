"use client";

import { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/cn";

interface SpotlightSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function SpotlightSection({ children, className }: SpotlightSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <div
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className={cn("relative", className)}
    >
      {isActive && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(800px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255,139,0,0.04), transparent 40%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}
