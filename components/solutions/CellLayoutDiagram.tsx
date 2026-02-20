"use client";

import { Bot, Box, ArrowRightLeft, ShieldCheck } from "lucide-react";

const ICONS: Record<string, typeof Bot> = {
  Robot: Bot,
  default: Box,
  Safety: ShieldCheck,
  Transfer: ArrowRightLeft,
};

function pickIcon(name: string) {
  if (name.toLowerCase().includes("robot")) return ICONS.Robot;
  if (name.toLowerCase().includes("safety") || name.toLowerCase().includes("interlock"))
    return ICONS.Safety;
  if (name.toLowerCase().includes("transfer") || name.toLowerCase().includes("conveyor"))
    return ICONS.Transfer;
  return ICONS.default;
}

interface CellLayoutDiagramProps {
  components: string[];
  title?: string;
}

export function CellLayoutDiagram({
  components,
  title = "Cell Layout",
}: CellLayoutDiagramProps) {
  return (
    <div className="rounded-lg border border-dark-700 bg-dark-900/50 p-6">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-eagle-orange mb-4">
        {title}
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {components.map((name, i) => {
          const Icon = pickIcon(name);
          const isRobot = name.toLowerCase().includes("robot");
          return (
            <div
              key={`${name}-${i}`}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm ${
                isRobot
                  ? "bg-eagle-orange/10 border border-eagle-orange/30 text-eagle-orange font-semibold"
                  : "bg-dark-800 border border-dark-700 text-dark-300"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
