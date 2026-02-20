"use client";

import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/cn";

interface VideoInlineProps {
  src: string;
  poster?: string;
  alt?: string;
  className?: string;
}

export function VideoInline({ src, poster, alt, className }: VideoInlineProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const toggle = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <div className={cn("relative rounded-lg overflow-hidden group", className)}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-auto"
        aria-label={alt}
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute bottom-3 right-3 p-2 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-all"
        aria-label={playing ? "Pause video" : "Play video"}
      >
        {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>
    </div>
  );
}
