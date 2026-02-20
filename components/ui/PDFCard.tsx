"use client";

import Image from "next/image";
import { FileText, Download, ExternalLink } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/cn";
import { analytics } from "@/lib/analytics";

interface PDFCardProps {
  title: string;
  description: string;
  filename: string;
  thumbnail?: string;
  category?: string;
  className?: string;
}

export function PDFCard({
  title,
  description,
  filename,
  thumbnail,
  category,
  className,
}: PDFCardProps) {
  const pdfPath = `/assets/pdfs/${filename}`;

  return (
    <div
      className={cn(
        "group rounded-lg border border-dark-700 bg-dark-900 overflow-hidden",
        "hover:border-eagle-orange transition-all duration-200",
        className
      )}
    >
      {/* Thumbnail Area */}
      <div className="relative h-56 bg-dark-800 flex items-center justify-center overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={`Preview of ${title}`}
            fill
            className="object-contain p-3 opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex flex-col items-center gap-3 text-dark-500">
            <FileText className="w-16 h-16" />
            <span className="text-xs font-medium uppercase tracking-wider">
              PDF Document
            </span>
          </div>
        )}
        {category && (
          <span className="absolute top-3 left-3 px-2 py-1 text-xs font-semibold uppercase tracking-wider bg-dark-950/80 text-eagle-orange rounded z-10">
            {category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-dark-400 line-clamp-2">{description}</p>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            href={pdfPath}
            external
            className="flex-1"
            onClick={() => analytics.pdfView(title, filename)}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View
          </Button>
          <a
            href={pdfPath}
            download
            className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm border border-white/20 text-white hover:border-white/40 hover:bg-white/5 rounded-lg transition-all duration-200"
            onClick={() => analytics.pdfDownload(title, filename)}
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </a>
        </div>
      </div>
    </div>
  );
}

export function PDFCardCompact({
  title,
  filename,
  category,
}: {
  title: string;
  filename: string;
  category?: string;
}) {
  const pdfPath = `/assets/pdfs/${filename}`;

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg border border-dark-700 bg-dark-900/30 hover:border-eagle-orange/30 transition-colors">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-dark-800 flex items-center justify-center">
        <FileText className="w-5 h-5 text-eagle-orange" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-white truncate">{title}</h4>
        {category && (
          <p className="text-xs text-dark-500 uppercase tracking-wider">
            {category}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <a
          href={pdfPath}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-dark-400 hover:text-white transition-colors"
          title="View"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
        <a
          href={pdfPath}
          download
          className="p-2 text-dark-400 hover:text-white transition-colors"
          title="Download"
        >
          <Download className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
