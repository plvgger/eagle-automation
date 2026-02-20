"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, CheckCircle, AlertCircle, RefreshCw, Mail, Phone as PhoneIcon, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Turnstile, isTurnstileEnabled } from "@/components/ui/Turnstile";
import { analytics } from "@/lib/analytics";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FieldErrors {
  [key: string]: string;
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const loadedAt = useRef(0);
  const handleTurnstileVerify = useCallback((token: string) => setTurnstileToken(token), []);
  const handleTurnstileExpire = useCallback(() => setTurnstileToken(null), []);
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    machineModel: "",
    controlType: "",
    cycleTime: "",
    partWeight: "",
    shiftsPerDay: "",
    laborRate: "",
    annualVolume: "",
    bestTimeToCall: "",
    targetStartDate: "",
    notes: "",
  });

  useEffect(() => {
    loadedAt.current = Date.now();
  }, []);

  const NUMERIC_FIELDS = new Set(["cycleTime", "partWeight", "laborRate", "annualVolume"]);

  const validate = (name: string, value: string): string => {
    switch (name) {
      case "company":
        return value.trim() ? "" : "Company name is required.";
      case "name":
        return value.trim() ? "" : "Your name is required.";
      case "email":
        if (!value.trim()) return "Email is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email.";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (NUMERIC_FIELDS.has(name)) {
      if (value === "" || /^\d*\.?\d*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched.has(name)) {
      const err = validate(name, value);
      setFieldErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => new Set(prev).add(name));
    const err = validate(name, value);
    setFieldErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const requiredFields = ["company", "name", "email"] as const;
    const errors: FieldErrors = {};
    for (const f of requiredFields) {
      const err = validate(f, formData[f]);
      if (err) errors[f] = err;
    }
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setTouched(new Set(requiredFields));
      setStatus("idle");
      return;
    }

    const honeypot = (e.currentTarget.elements.namedItem("_website") as HTMLInputElement)?.value;

    try {
      if (isTurnstileEnabled() && !turnstileToken) {
        setErrorMsg("Please complete the verification challenge.");
        setStatus("error");
        return;
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          _honeypot: honeypot || undefined,
          _loadedAt: loadedAt.current,
          turnstileToken: turnstileToken || undefined,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrorMsg(json.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }

      analytics.contactSubmit(formData.company, true);
      setStatus("success");
    } catch {
      analytics.contactSubmit(formData.company, false);
      setErrorMsg(
        "Unable to reach our servers. Please try again or call us directly at (817) 472-5178.",
      );
      setStatus("error");
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setErrorMsg("");
    setTouched(new Set());
    setFieldErrors({});
    setFormData({
      company: "",
      name: "",
      email: "",
      phone: "",
      machineModel: "",
      controlType: "",
      cycleTime: "",
      partWeight: "",
      shiftsPerDay: "",
      laborRate: "",
      annualVolume: "",
      bestTimeToCall: "",
      targetStartDate: "",
      notes: "",
    });
    loadedAt.current = Date.now();
  };

  const fieldClass = (name: string) =>
    `input-field ${touched.has(name) && fieldErrors[name] ? "!border-red-500/60 focus:!ring-red-500/30" : ""}`;

  if (status === "success") {
    return (
      <Card padding="lg" className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-[#4ade80]/10 flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-[#4ade80]" />
        </div>
        <h3 className="mt-6 text-2xl font-bold text-white">
          Inquiry Received — We&apos;re On It
        </h3>
        <p className="mt-3 text-dark-400 max-w-md mx-auto">
          Our engineering team will review your details and respond with a
          preliminary scope and ROI estimate within <strong className="text-white">one business day</strong>.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 max-w-lg mx-auto text-left">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-dark-800">
            <Mail className="w-5 h-5 text-eagle-orange flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-white">Check Your Inbox</p>
              <p className="text-xs text-dark-400 mt-1">Confirmation email sent to {formData.email || "your address"}.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-dark-800">
            <FileText className="w-5 h-5 text-eagle-orange flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-white">Have Files?</p>
              <p className="text-xs text-dark-400 mt-1">Reply to the confirmation email with drawings or STEP files.</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button onClick={resetForm} variant="secondary" size="sm">
            <RefreshCw className="mr-2 w-4 h-4" />
            Submit Another Inquiry
          </Button>
          <a
            href="tel:+18174725178"
            className="inline-flex items-center gap-2 text-sm text-dark-400 hover:text-white transition-colors"
          >
            <PhoneIcon className="w-4 h-4" />
            Or call (817) 472-5178
          </a>
        </div>
      </Card>
    );
  }

  return (
    <Card padding="lg">
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Honeypot */}
        <div aria-hidden="true" className="absolute -left-[9999px] opacity-0 h-0 w-0 overflow-hidden">
          <label htmlFor="_website">Website</label>
          <input type="text" id="_website" name="_website" tabIndex={-1} autoComplete="off" />
        </div>

        {/* Error banner */}
        {status === "error" && errorMsg && (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-300">{errorMsg}</p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-2 inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Contact Info */}
        <fieldset>
          <legend className="text-sm font-semibold uppercase tracking-wider text-eagle-orange mb-4">
            Contact Information
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="company" className="input-label">Company Name *</label>
              <input
                type="text" id="company" name="company"
                value={formData.company} onChange={handleChange} onBlur={handleBlur}
                required className={fieldClass("company")}
                aria-invalid={!!fieldErrors.company}
              />
              {touched.has("company") && fieldErrors.company && (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.company}</p>
              )}
            </div>
            <div>
              <label htmlFor="name" className="input-label">Contact Name *</label>
              <input
                type="text" id="name" name="name"
                value={formData.name} onChange={handleChange} onBlur={handleBlur}
                required className={fieldClass("name")}
                aria-invalid={!!fieldErrors.name}
              />
              {touched.has("name") && fieldErrors.name && (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="input-label">Email *</label>
              <input
                type="email" id="email" name="email"
                value={formData.email} onChange={handleChange} onBlur={handleBlur}
                required className={fieldClass("email")}
                aria-invalid={!!fieldErrors.email}
              />
              {touched.has("email") && fieldErrors.email && (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="input-label">Phone <span className="text-dark-500 font-normal">(optional)</span></label>
              <input
                type="tel" id="phone" name="phone"
                value={formData.phone} onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>
        </fieldset>

        {/* Process Details */}
        <fieldset className="pt-6 border-t border-dark-700">
          <legend className="text-sm font-semibold uppercase tracking-wider text-eagle-orange mb-4">
            Process Details <span className="text-dark-500 font-normal text-xs normal-case tracking-normal ml-2">— optional, helps us scope faster</span>
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="machineModel" className="input-label">Machine Model</label>
              <input
                type="text" id="machineModel" name="machineModel"
                value={formData.machineModel} onChange={handleChange}
                placeholder="e.g., FANUC Robodrill, Mazak QT"
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="controlType" className="input-label">Control Type</label>
              <input
                type="text" id="controlType" name="controlType"
                value={formData.controlType} onChange={handleChange}
                placeholder="e.g., FANUC 0i, Siemens 840D"
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="cycleTime" className="input-label">Cycle Time (seconds)</label>
              <input
                type="text" inputMode="numeric" id="cycleTime" name="cycleTime"
                value={formData.cycleTime} onChange={handleChange}
                placeholder="e.g., 60"
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="partWeight" className="input-label">Part Weight (lbs)</label>
              <input
                type="text" inputMode="numeric" id="partWeight" name="partWeight"
                value={formData.partWeight} onChange={handleChange}
                placeholder="e.g., 5.2"
                className="input-field"
              />
            </div>
          </div>
        </fieldset>

        {/* Labor & Volume */}
        <fieldset className="pt-6 border-t border-dark-700">
          <legend className="text-sm font-semibold uppercase tracking-wider text-eagle-orange mb-4">
            Labor & Volume <span className="text-dark-500 font-normal text-xs normal-case tracking-normal ml-2">— optional</span>
          </legend>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="shiftsPerDay" className="input-label">Shifts Per Day</label>
              <select
                id="shiftsPerDay" name="shiftsPerDay"
                value={formData.shiftsPerDay} onChange={handleChange}
                className="input-field"
              >
                <option value="">Select...</option>
                <option value="1">1 Shift</option>
                <option value="2">2 Shifts</option>
                <option value="3">3 Shifts</option>
              </select>
            </div>
            <div>
              <label htmlFor="laborRate" className="input-label">Labor Rate ($/hr)</label>
              <input
                type="text" inputMode="numeric" id="laborRate" name="laborRate"
                value={formData.laborRate} onChange={handleChange}
                placeholder="22"
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="annualVolume" className="input-label">Annual Volume</label>
              <input
                type="text" inputMode="numeric" id="annualVolume" name="annualVolume"
                value={formData.annualVolume} onChange={handleChange}
                placeholder="e.g., 50000"
                className="input-field"
              />
            </div>
          </div>
        </fieldset>

        {/* Timeline & Preferences */}
        <fieldset className="pt-6 border-t border-dark-700">
          <legend className="text-sm font-semibold uppercase tracking-wider text-eagle-orange mb-4">
            Timeline & Preferences <span className="text-dark-500 font-normal text-xs normal-case tracking-normal ml-2">— optional</span>
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="bestTimeToCall" className="input-label">Best Time to Call</label>
              <select
                id="bestTimeToCall" name="bestTimeToCall"
                value={formData.bestTimeToCall} onChange={handleChange}
                className="input-field"
              >
                <option value="">No preference</option>
                <option value="morning">Morning (8–11 AM CT)</option>
                <option value="midday">Midday (11 AM–2 PM CT)</option>
                <option value="afternoon">Afternoon (2–5 PM CT)</option>
              </select>
            </div>
            <div>
              <label htmlFor="targetStartDate" className="input-label">Target Start Date</label>
              <select
                id="targetStartDate" name="targetStartDate"
                value={formData.targetStartDate} onChange={handleChange}
                className="input-field"
              >
                <option value="">Not sure yet</option>
                <option value="asap">As soon as possible</option>
                <option value="1-3-months">1–3 months</option>
                <option value="3-6-months">3–6 months</option>
                <option value="6-12-months">6–12 months</option>
                <option value="evaluating">Just evaluating options</option>
              </select>
            </div>
          </div>
        </fieldset>

        {/* Notes */}
        <div className="pt-6 border-t border-dark-700">
          <label htmlFor="notes" className="input-label">
            Additional Notes <span className="text-dark-500 font-normal">(optional)</span>
          </label>
          <textarea
            id="notes" name="notes"
            value={formData.notes} onChange={handleChange}
            rows={4}
            placeholder="Tell us about your process, challenges, or specific questions..."
            className="input-field resize-none"
          />
        </div>

        <Turnstile onVerify={handleTurnstileVerify} onExpire={handleTurnstileExpire} />

        {/* Submit */}
        <div className="pt-6 border-t border-dark-700">
          <Button
            type="submit" size="lg" className="w-full sm:w-auto"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting...
              </>
            ) : (
              <>
                Scope My Automation
                <Send className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>
          <p className="mt-4 text-xs text-dark-500">
            By submitting this form, you agree to be contacted regarding your
            inquiry. We do not share your information with third parties.
          </p>
        </div>
      </form>
    </Card>
  );
}
