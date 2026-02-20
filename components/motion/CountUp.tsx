"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  value: string;
  className?: string;
  duration?: number;
}

export function CountUp({ value, className, duration = 1.8 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(value);
  const [counting, setCounting] = useState(false);
  const hasStarted = useRef(false);
  const countingRef = useRef(false);

  useEffect(() => {
    if (!isInView || hasStarted.current) return;
    if (prefersReducedMotion) {
      hasStarted.current = true;
      return;
    }

    hasStarted.current = true;

    const numericMatch = value.match(/^([^0-9]*)([0-9,.]+)(.*)$/);
    if (!numericMatch) return;

    const prefix = numericMatch[1];
    const numStr = numericMatch[2];
    const suffix = numericMatch[3];
    const target = parseFloat(numStr.replace(/,/g, ""));
    const hasDecimal = numStr.includes(".");
    const decimalPlaces = hasDecimal ? numStr.split(".")[1].length : 0;
    const hasComma = numStr.includes(",");

    const startTime = performance.now();

    const animate = (now: number) => {
      if (!countingRef.current) {
        countingRef.current = true;
        setCounting(true);
      }
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      const current = target * eased;
      let formatted: string;

      if (hasDecimal) {
        formatted = current.toFixed(decimalPlaces);
      } else {
        formatted = Math.round(current).toString();
      }

      if (hasComma) {
        formatted = Number(formatted).toLocaleString();
      }

      setDisplayValue(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
        setCounting(false);
        countingRef.current = false;
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {counting ? (
        <span style={{ display: "inline-grid" }}>
          <span
            style={{ gridArea: "1 / 1", visibility: "hidden" }}
            aria-hidden="true"
          >
            {value}
          </span>
          <span style={{ gridArea: "1 / 1" }}>{displayValue}</span>
        </span>
      ) : (
        displayValue
      )}
    </span>
  );
}
