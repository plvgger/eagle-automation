"use client";

import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";

interface Robot {
  model: string;
  payload: string;
  reach: string;
  image?: string;
}

const num = (s: string) => parseFloat(s.replace(/[^0-9.]/g, "")) || 0;

/**
 * Family overview strip — all robots on one studio stage, bottom-aligned,
 * with gentle height variation by reach so the lineup reads as a cohesive
 * set rather than a flat row. Built from the transparent cutout renders.
 */
export function RobotLineup({ robots }: { robots: Robot[] }) {
  const reaches = robots.map((r) => num(r.reach));
  const min = Math.min(...reaches);
  const max = Math.max(...reaches);
  const heightFor = (reach: string) => {
    if (max === min) return 1;
    // keep variation subtle (0.74 – 1.0) so it's a family, not a bar chart
    return 0.74 + 0.26 * ((num(reach) - min) / (max - min));
  };

  return (
    <FadeIn>
      <div className="robot-lineup-stage relative w-full rounded-xl overflow-hidden border border-dark-700 px-4 sm:px-8 lg:px-12 pt-8 pb-6">
        <div
          className="flex items-end justify-between gap-1 sm:gap-3"
          style={{ height: "clamp(150px, 24vw, 300px)" }}
        >
          {robots.map((robot) => (
            <div
              key={robot.model}
              className="flex-1 flex flex-col items-center justify-end h-full min-w-0"
            >
              {robot.image && (
                <div
                  className="relative w-full"
                  style={{ height: `${heightFor(robot.reach) * 100}%` }}
                >
                  <Image
                    src={robot.image}
                    alt={`FANUC ${robot.model}`}
                    fill
                    className="object-contain object-bottom"
                    sizes="(max-width: 768px) 16vw, 180px"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Labels row, aligned under each robot */}
        <div className="mt-4 flex items-start justify-between gap-1 sm:gap-3 border-t border-dark-700/60 pt-3">
          {robots.map((robot) => (
            <div key={robot.model} className="flex-1 text-center min-w-0">
              <div className="text-[10px] sm:text-xs font-bold text-white truncate">
                {robot.model}
              </div>
              <div className="text-[9px] sm:text-[11px] text-eagle-orange font-semibold">
                {robot.payload}
              </div>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}
