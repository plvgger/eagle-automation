"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { MediaItem } from "@/lib/content";

interface MediaGalleryProps {
  items: MediaItem[];
  columns?: 1 | 2 | 3;
  aspectRatio?: "video" | "square" | "auto";
  className?: string;
}

export function MediaGallery({
  items,
  columns = 2,
  aspectRatio = "video",
  className = "",
}: MediaGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const next = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i + 1) % items.length : null)),
    [items.length],
  );
  const prev = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null ? (i - 1 + items.length) % items.length : null,
      ),
    [items.length],
  );

  const colsClass =
    columns === 1
      ? "grid-cols-1"
      : columns === 3
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        : "grid-cols-1 sm:grid-cols-2";

  const ratioClass =
    aspectRatio === "square"
      ? "aspect-square"
      : aspectRatio === "video"
        ? "aspect-video"
        : "";

  if (items.length === 0) return null;

  return (
    <>
      <div className={`grid gap-3 ${colsClass} ${className}`}>
        {items.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={() => openLightbox(i)}
            className={`relative overflow-hidden rounded-lg border border-dark-700 bg-dark-800 group cursor-pointer ${ratioClass}`}
          >
            {item.type === "video" ? (
              <>
                {item.poster && (
                  <Image
                    src={item.poster}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Play className="w-10 h-10 text-white/80 group-hover:text-eagle-orange transition-colors" />
                </div>
              </>
            ) : (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button
              type="button"
              className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors z-10"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors z-10"
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors z-10"
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  aria-label="Next"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            <motion.div
              key={lightboxIndex}
              className="relative max-w-[90vw] max-h-[85vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              {items[lightboxIndex].type === "video" ? (
                <video
                  src={items[lightboxIndex].src}
                  poster={items[lightboxIndex].poster}
                  controls
                  autoPlay
                  className="max-h-[85vh] rounded-lg"
                />
              ) : (
                <Image
                  src={items[lightboxIndex].src}
                  alt={items[lightboxIndex].alt}
                  width={items[lightboxIndex].width ?? 1600}
                  height={items[lightboxIndex].height ?? 900}
                  className="max-h-[85vh] w-auto rounded-lg object-contain"
                  sizes="90vw"
                  quality={90}
                />
              )}
              <p className="mt-3 text-center text-sm text-dark-400">
                {items[lightboxIndex].alt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
