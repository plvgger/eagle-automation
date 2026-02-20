"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyableInputsProps {
  inputs: { label: string; example: string }[];
}

export function CopyableInputs({ inputs }: CopyableInputsProps) {
  const [copied, setCopied] = useState(false);

  const plainText = inputs
    .map((i) => `${i.label}: ${i.example}`)
    .join("\n");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(plainText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard API unavailable */
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-3 right-3 p-1.5 rounded-md bg-dark-700/80 text-dark-400 hover:text-white hover:bg-dark-600 transition-colors z-10"
        title="Copy to clipboard"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-eagle-orange" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>
      <div className="grid gap-3 sm:grid-cols-2">
        {inputs.map((input) => (
          <div key={input.label}>
            <div className="text-sm font-medium text-white">
              {input.label}
            </div>
            <div className="text-xs text-dark-500">{input.example}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
