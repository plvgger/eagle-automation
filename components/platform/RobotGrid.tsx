"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Users, Zap, ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Robot {
  model: string;
  payload: string;
  reach: string;
  axes?: number;
  weight?: string;
  image?: string;
  description?: string;
  bestFor: string;
  highlights?: string[];
  collaborative: boolean;
}

function DetailPanel({
  robot,
  onClose,
}: {
  robot: Robot;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [robot.model]);

  return (
    <motion.div
      ref={panelRef}
      key={robot.model}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="col-span-full overflow-hidden"
    >
      <div className="mt-2 mb-2 rounded-xl border border-dark-700 bg-dark-800/80 backdrop-blur-sm p-5 lg:p-6">
        <div className="grid gap-5 lg:grid-cols-[180px_1fr]">
          {robot.image && (
            <div className="relative aspect-square w-full max-w-[180px] mx-auto lg:mx-0 rounded-lg overflow-hidden robot-stage border border-dark-700">
              <Image
                src={robot.image}
                alt={`FANUC ${robot.model}`}
                fill
                className="relative z-[1] object-contain p-2"
                sizes="180px"
              />
            </div>
          )}

          <div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {robot.model}
                </h3>
                {robot.collaborative && (
                  <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 text-xs font-medium rounded-full bg-eagle-accent/10 text-eagle-accent border border-eagle-accent/20">
                    <Users className="w-3 h-3" />
                    Collaborative
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-dark-700 transition-colors text-dark-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {robot.description && (
              <p className="mt-2.5 text-sm text-dark-300 leading-relaxed">
                {robot.description}
              </p>
            )}

            <div className="mt-3 flex flex-wrap gap-2.5">
              {[
                { label: "Payload", value: robot.payload },
                { label: "Reach", value: robot.reach },
                ...(robot.axes
                  ? [{ label: "Axes", value: String(robot.axes) }]
                  : []),
                ...(robot.weight
                  ? [{ label: "Weight", value: robot.weight }]
                  : []),
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="px-3 py-1.5 rounded-lg bg-dark-900/60 border border-dark-700"
                >
                  <div className="text-[10px] text-dark-500 uppercase tracking-wider">
                    {spec.label}
                  </div>
                  <div className="mt-0.5 text-sm font-bold text-white">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            {robot.highlights && robot.highlights.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {robot.highlights.map((h) => (
                  <span
                    key={h}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-full bg-eagle-orange/10 text-eagle-orange border border-eagle-orange/20"
                  >
                    <Zap className="w-3 h-3" />
                    {h}
                  </span>
                ))}
              </div>
            )}

            <p className="mt-2.5 text-xs text-dark-400 italic">
              {robot.bestFor}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function useColumns() {
  const [cols, setCols] = useState(3);

  const update = useCallback(() => {
    if (typeof window === "undefined") return;
    setCols(window.innerWidth >= 1024 ? 3 : 2);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  return cols;
}

export function RobotGrid({ robots }: { robots: Robot[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const cols = useColumns();

  const selectedIndex = robots.findIndex((r) => r.model === selected);
  const selectedRobot = selectedIndex >= 0 ? robots[selectedIndex] : null;
  const detailAfterIndex = selectedIndex >= 0
    ? Math.min((Math.floor(selectedIndex / cols) + 1) * cols - 1, robots.length - 1)
    : -1;

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
      {robots.map((robot, i) => {
        const isActive = selected === robot.model;
        return (
          <>
            <button
              key={robot.model}
              onClick={() => setSelected(isActive ? null : robot.model)}
              className={`group relative text-left rounded-xl border transition-all duration-200 overflow-hidden ${
                isActive
                  ? "border-eagle-orange bg-dark-800 ring-1 ring-eagle-orange/30"
                  : "border-dark-700 bg-dark-900/50 hover:border-dark-500 hover:bg-dark-800/60"
              }`}
            >
              <div className="relative aspect-square robot-stage overflow-hidden">
                {robot.image ? (
                  <Image
                    src={robot.image}
                    alt={`FANUC ${robot.model}`}
                    fill
                    className="relative z-[1] object-contain p-2 transition-transform duration-300 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 45vw, 300px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-dark-500 text-sm">
                    {robot.model}
                  </div>
                )}
                {robot.collaborative && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium rounded bg-eagle-accent/15 text-eagle-accent border border-eagle-accent/20">
                    <Users className="w-2.5 h-2.5" />
                    Cobot
                  </div>
                )}
              </div>

              <div className="p-3 border-t border-dark-700/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">
                    {robot.model}
                  </h3>
                  <ChevronDown
                    className={`w-4 h-4 text-dark-500 transition-transform duration-200 ${
                      isActive ? "rotate-180 text-eagle-orange" : ""
                    }`}
                  />
                </div>
                <div className="mt-1.5 flex items-center gap-3 text-[11px] text-dark-400">
                  <span>
                    <span className="font-semibold text-white">{robot.payload}</span>{" "}
                    payload
                  </span>
                  <span className="text-dark-600">|</span>
                  <span>
                    <span className="font-semibold text-white">{robot.reach}</span>{" "}
                    reach
                  </span>
                </div>
              </div>
            </button>

            {/* Detail panel inserted after the last card in this row */}
            {i === detailAfterIndex && selectedRobot && (
              <AnimatePresence mode="wait">
                <DetailPanel
                  key={selectedRobot.model}
                  robot={selectedRobot}
                  onClose={() => setSelected(null)}
                />
              </AnimatePresence>
            )}
          </>
        );
      })}
    </div>
  );
}
