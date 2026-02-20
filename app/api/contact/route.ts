import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import nodemailer from "nodemailer";

// ---------------------------------------------------------------------------
// Email providers – lazy-initialised so the build never fails
// ---------------------------------------------------------------------------
function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function getSmtpTransport(): nodemailer.Transporter | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT ?? "465");
  const secure = process.env.SMTP_SECURE !== "false";

  return nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
}

// ---------------------------------------------------------------------------
// Rate limiting (best-effort in-memory)
// ---------------------------------------------------------------------------
const RATE_WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;
const CLEANUP_INTERVAL_MS = 5 * 60_000;

const ipLog = new Map<string, number[]>();
let lastCleanup = Date.now();

function pruneStaleEntries() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  for (const [ip, ts] of ipLog) {
    const fresh = ts.filter((t) => now - t < RATE_WINDOW_MS);
    if (fresh.length === 0) ipLog.delete(ip);
    else ipLog.set(ip, fresh);
  }
}

function isRateLimited(ip: string): boolean {
  pruneStaleEntries();
  const now = Date.now();
  const ts = (ipLog.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (ts.length >= MAX_PER_WINDOW) return true;
  ts.push(now);
  ipLog.set(ip, ts);
  return false;
}

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------
const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const FIELD_LIMITS: Record<string, number> = {
  company: 200,
  name: 200,
  email: 320,
  phone: 30,
  machineModel: 200,
  controlType: 200,
  cycleTime: 20,
  partWeight: 20,
  shiftsPerDay: 2,
  laborRate: 20,
  annualVolume: 20,
  bestTimeToCall: 30,
  targetStartDate: 30,
  notes: 3000,
};

function sanitize(val: unknown, field: string): string {
  if (typeof val !== "string") return "";
  const limit = FIELD_LIMITS[field] ?? 500;
  return val.trim().slice(0, limit);
}

function sanitizeNumeric(val: unknown, field: string): string {
  const s = sanitize(val, field);
  if (!s) return "";
  const cleaned = s.replace(/[^0-9.]/g, "");
  if (cleaned === "" || isNaN(Number(cleaned))) return "";
  return cleaned;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ---------------------------------------------------------------------------
// Human-readable labels for select-field values
// ---------------------------------------------------------------------------
const BEST_TIME_LABELS: Record<string, string> = {
  morning: "Morning (8–11 AM CT)",
  midday: "Midday (11 AM–2 PM CT)",
  afternoon: "Afternoon (2–5 PM CT)",
};

const TARGET_DATE_LABELS: Record<string, string> = {
  asap: "As soon as possible",
  "1-3-months": "1–3 months",
  "3-6-months": "3–6 months",
  "6-12-months": "6–12 months",
  evaluating: "Just evaluating options",
};

// ---------------------------------------------------------------------------
// Payload shape
// ---------------------------------------------------------------------------
interface ContactPayload {
  company: string;
  name: string;
  email: string;
  phone?: string;
  machineModel?: string;
  controlType?: string;
  cycleTime?: string;
  partWeight?: string;
  shiftsPerDay?: string;
  laborRate?: string;
  annualVolume?: string;
  bestTimeToCall?: string;
  targetStartDate?: string;
  notes?: string;
  _honeypot?: string;
  _loadedAt?: number;
  turnstileToken?: string;
}

// ---------------------------------------------------------------------------
// Email templates
// ---------------------------------------------------------------------------
function buildNotificationHtml(data: ContactPayload): string {
  const rows = [
    ["Company", data.company],
    ["Contact", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Machine Model", data.machineModel],
    ["Control Type", data.controlType],
    ["Cycle Time", data.cycleTime ? `${data.cycleTime}s` : ""],
    ["Part Weight", data.partWeight ? `${data.partWeight} lbs` : ""],
    ["Shifts/Day", data.shiftsPerDay],
    ["Labor Rate", data.laborRate ? `$${data.laborRate}/hr` : ""],
    ["Annual Volume", data.annualVolume],
    ["Best Time to Call", data.bestTimeToCall ? BEST_TIME_LABELS[data.bestTimeToCall] ?? data.bestTimeToCall : ""],
    ["Target Start Date", data.targetStartDate ? TARGET_DATE_LABELS[data.targetStartDate] ?? data.targetStartDate : ""],
    ["Notes", data.notes],
  ]
    .filter(([, v]) => v)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;color:#9CA3AF;white-space:nowrap;vertical-align:top">${escapeHtml(String(label))}</td><td style="padding:8px 12px;color:#FFFFFF">${escapeHtml(String(value))}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#000;color:#fff;padding:40px">
      <div style="max-width:600px;margin:0 auto">
        <div style="border-bottom:2px solid #FF8C00;padding-bottom:16px;margin-bottom:24px">
          <h1 style="margin:0;font-size:24px;color:#FF8C00">New Automation Inquiry</h1>
          <p style="margin:8px 0 0;font-size:14px;color:#6B7280">Submitted via eagleautomation.com</p>
        </div>
        <table style="width:100%;border-collapse:collapse;background:#111;border-radius:8px;overflow:hidden">
          ${rows}
        </table>
        <div style="margin-top:24px;padding:16px;background:#111;border-radius:8px;border-left:4px solid #FF8C00">
          <p style="margin:0;font-size:13px;color:#6B7280">Reply directly to this email to respond to <strong style="color:#fff">${escapeHtml(data.name)}</strong> at <a href="mailto:${escapeHtml(data.email)}" style="color:#FF8C00">${escapeHtml(data.email)}</a></p>
        </div>
      </div>
    </div>
  `;
}

function buildConfirmationHtml(name: string): string {
  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#000;color:#fff;padding:40px">
      <div style="max-width:600px;margin:0 auto">
        <div style="border-bottom:2px solid #FF8C00;padding-bottom:16px;margin-bottom:24px">
          <h1 style="margin:0;font-size:24px;color:#FFFFFF">Thank you, ${escapeHtml(name)}</h1>
        </div>
        <p style="font-size:16px;color:#D1D5DB;line-height:1.6">
          We've received your automation inquiry and our engineering team will review it within <strong style="color:#FF8C00">one business day</strong>.
        </p>
        <p style="font-size:16px;color:#D1D5DB;line-height:1.6">
          If you have drawings, STEP files, or process videos to share, reply to this email with them attached &mdash; the more detail we have upfront, the more accurate our preliminary scope will be.
        </p>
        <div style="margin-top:32px;padding:20px;background:#111;border-radius:8px">
          <p style="margin:0 0 12px;font-size:14px;color:#6B7280;text-transform:uppercase;letter-spacing:0.1em;font-weight:600">What happens next</p>
          <ol style="margin:0;padding-left:20px;color:#D1D5DB;font-size:14px;line-height:2">
            <li>Our team reviews your submission</li>
            <li>We reach out to schedule a brief discovery call</li>
            <li>You receive a preliminary scope &amp; ROI estimate</li>
          </ol>
        </div>
        <p style="margin-top:32px;font-size:13px;color:#6B7280">
          Eagle Automation &mdash; Arlington, TX<br/>
          <a href="tel:8174725178" style="color:#FF8C00">(817) 472-5178</a> &bull;
          <a href="https://eagleautomation.com" style="color:#FF8C00">eagleautomation.com</a>
        </p>
      </div>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// Unified send helpers — Resend first, SMTP fallback
// ---------------------------------------------------------------------------
interface SendOpts {
  from: string;
  to: string[];
  cc?: string[];
  replyTo?: string;
  subject: string;
  html: string;
}

async function sendViaResend(opts: SendOpts): Promise<void> {
  const resend = getResend();
  if (!resend) throw new Error("Resend not configured");
  const { error } = await resend.emails.send({
    from: opts.from,
    to: opts.to,
    cc: opts.cc,
    replyTo: opts.replyTo,
    subject: opts.subject,
    html: opts.html,
  });
  if (error) throw new Error(`Resend error: ${JSON.stringify(error)}`);
}

async function sendViaSmtp(opts: SendOpts): Promise<void> {
  const transport = getSmtpTransport();
  if (!transport) throw new Error("SMTP not configured");
  await transport.sendMail({
    from: opts.from,
    to: opts.to.join(", "),
    cc: opts.cc?.join(", "),
    replyTo: opts.replyTo,
    subject: opts.subject,
    html: opts.html,
  });
}

async function sendEmail(opts: SendOpts): Promise<void> {
  if (getResend()) {
    return sendViaResend(opts);
  }
  if (getSmtpTransport()) {
    return sendViaSmtp(opts);
  }
  throw new Error(
    "No email provider configured. Set RESEND_API_KEY or SMTP_HOST/SMTP_USER/SMTP_PASS."
  );
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  const startMs = Date.now();
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      console.warn(`[contact] rate-limited ip=${ip}`);
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    let body: ContactPayload;
    try {
      body = (await request.json()) as ContactPayload;
    } catch {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    if (body._honeypot) {
      return NextResponse.json({ success: true });
    }

    if (body._loadedAt && Date.now() - body._loadedAt < 3000) {
      return NextResponse.json({ success: true });
    }

    // Turnstile verification (when configured)
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret) {
      const token = body.turnstileToken;
      if (!token) {
        return NextResponse.json(
          { error: "Verification required." },
          { status: 400 }
        );
      }
      const verifyRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: turnstileSecret,
            response: token,
            remoteip: ip,
          }),
        }
      );
      const verifyJson = await verifyRes.json();
      if (!verifyJson.success) {
        console.warn(`[contact] turnstile failed ip=${ip}`);
        return NextResponse.json(
          { error: "Verification failed. Please try again." },
          { status: 400 }
        );
      }
    }

    // Sanitize + normalize
    const data: ContactPayload = {
      company: sanitize(body.company, "company"),
      name: sanitize(body.name, "name"),
      email: sanitize(body.email, "email").toLowerCase(),
      phone: sanitize(body.phone, "phone"),
      machineModel: sanitize(body.machineModel, "machineModel"),
      controlType: sanitize(body.controlType, "controlType"),
      cycleTime: sanitizeNumeric(body.cycleTime, "cycleTime"),
      partWeight: sanitizeNumeric(body.partWeight, "partWeight"),
      shiftsPerDay: sanitize(body.shiftsPerDay, "shiftsPerDay"),
      laborRate: sanitizeNumeric(body.laborRate, "laborRate"),
      annualVolume: sanitizeNumeric(body.annualVolume, "annualVolume"),
      bestTimeToCall: sanitize(body.bestTimeToCall, "bestTimeToCall"),
      targetStartDate: sanitize(body.targetStartDate, "targetStartDate"),
      notes: sanitize(body.notes, "notes"),
    };

    // Required field checks
    if (!data.company) {
      return NextResponse.json({ error: "Company name is required." }, { status: 400 });
    }
    if (!data.name) {
      return NextResponse.json({ error: "Contact name is required." }, { status: 400 });
    }
    if (!data.email) {
      return NextResponse.json({ error: "Email address is required." }, { status: 400 });
    }
    if (!EMAIL_RE.test(data.email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }
    if (data.shiftsPerDay && !["1", "2", "3"].includes(data.shiftsPerDay)) {
      data.shiftsPerDay = "";
    }

    // Deliverability config
    const toEmail =
      process.env.CONTACT_TO_EMAIL ?? "sales@eaglemachine.net";
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL ??
      "Eagle Automation <noreply@eagleautomation.com>";
    const ccList = process.env.CONTACT_CC
      ? process.env.CONTACT_CC.split(",").map((e) => e.trim())
      : undefined;

    // Internal notification (must succeed)
    await sendEmail({
      from: fromEmail,
      to: [toEmail],
      cc: ccList,
      replyTo: data.email,
      subject: `New Inquiry: ${data.company} — ${data.name}`,
      html: buildNotificationHtml(data),
    });

    // Auto-confirmation to prospect (fire-and-forget)
    sendEmail({
      from: fromEmail,
      to: [data.email],
      subject: "Eagle Automation — We received your inquiry",
      html: buildConfirmationHtml(data.name),
    }).catch((err) => {
      console.warn(
        "[contact] confirmation email failed:",
        err instanceof Error ? err.message : err
      );
    });

    console.info(
      `[contact] success company="${data.company}" ms=${Date.now() - startMs}`
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(
      "[contact] unhandled error:",
      err instanceof Error ? err.stack ?? err.message : err
    );
    return NextResponse.json(
      {
        error:
          "Something went wrong. Please try again or call us directly at (817) 472-5178.",
      },
      { status: 500 }
    );
  }
}
