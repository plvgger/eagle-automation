type EventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: string, params?: EventParams) {
  if (typeof window === "undefined") return;

  // Google Analytics (gtag)
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }

  // Extensible: add Plausible, PostHog, etc. here
}

// Pre-defined event helpers
export const analytics = {
  ctaClick: (label: string, href: string) =>
    trackEvent("cta_click", { label, href }),

  pdfView: (title: string, filename: string) =>
    trackEvent("pdf_view", { title, filename }),

  pdfDownload: (title: string, filename: string) =>
    trackEvent("pdf_download", { title, filename }),

  contactSubmit: (company: string, success: boolean) =>
    trackEvent("contact_submit", { company, success }),

  roiCalculate: (laborRate: number, shifts: number) =>
    trackEvent("roi_calculate", { labor_rate: laborRate, shifts }),
};
