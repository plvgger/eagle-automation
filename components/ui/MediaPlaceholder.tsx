"use client";

import { ImageIcon, Film } from "lucide-react";
import { cn } from "@/lib/cn";

interface MediaPlaceholderProps {
  label?: string;
  type?: "image" | "video";
  aspectRatio?: "video" | "square" | "auto";
  className?: string;
}

export function MediaPlaceholder({
  label = "Media coming soon",
  type = "image",
  aspectRatio = "video",
  className,
}: MediaPlaceholderProps) {
  const Icon = type === "video" ? Film : ImageIcon;
  const ratioClass =
    aspectRatio === "square"
      ? "aspect-square"
      : aspectRatio === "video"
        ? "aspect-video"
        : "min-h-[200px]";

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-dark-700 bg-dark-900/50",
        ratioClass,
        className,
      )}
    >
      <Icon className="w-8 h-8 text-dark-600" />
      <p className="text-xs text-dark-500 uppercase tracking-wider font-medium">
        {label}
      </p>
    </div>
  );
}
