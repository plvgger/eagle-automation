"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

interface SolutionsNavProps {
  items: { id: string; title: string }[];
}

export function SolutionsNav({ items }: SolutionsNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const ids = items.map((i) => i.id);
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveId(visibleEntries[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    elements.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, [items]);

  useEffect(() => {
    const firstSection = document.getElementById(items[0]?.id ?? "");
    if (!firstSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.boundingClientRect.top < 200),
      { threshold: 0, rootMargin: "-200px 0px 0px 0px" },
    );
    observer.observe(firstSection);
    return () => observer.disconnect();
  }, [items]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div
      className={cn(
        "fixed top-[72px] left-0 right-0 z-40 bg-dark-950/90 backdrop-blur-md border-b border-dark-800 transition-all duration-300",
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none",
      )}
    >
      <div className="container-page overflow-x-auto no-scrollbar">
        <nav className="flex gap-1 py-2" aria-label="Solutions in-page navigation">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className={cn(
                "whitespace-nowrap px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                activeId === item.id
                  ? "bg-eagle-orange/10 text-eagle-orange"
                  : "text-dark-400 hover:text-white hover:bg-dark-800",
              )}
            >
              {item.title}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
