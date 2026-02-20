# Eagle Automation

Marketing and lead-generation website for Eagle Automation — the automation integration division of Eagle Machine, Inc. FANUC Authorized System Integrator based in Arlington, TX.

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Email**: Resend or SMTP (Nodemailer) — auto-selects based on env vars
- **Bot Protection**: Cloudflare Turnstile (optional)
- **Deployment**: Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Fill in RESEND_API_KEY (required for contact form)

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

At least **one email provider** must be configured (Resend or SMTP).

### Email Provider

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | If using Resend | Resend API key (requires verified sending domain) |
| `SMTP_HOST` | If using SMTP | SMTP server hostname (e.g. `smtp.gmail.com`, `smtp.office365.com`) |
| `SMTP_PORT` | If using SMTP | SMTP port (`465` for SSL, `587` for STARTTLS) |
| `SMTP_SECURE` | If using SMTP | `true` for port 465 (SSL), `false` for port 587 (STARTTLS) |
| `SMTP_USER` | If using SMTP | SMTP username / email address |
| `SMTP_PASS` | If using SMTP | SMTP password or app password |

> **Provider selection**: If `RESEND_API_KEY` is set, Resend is used. Otherwise the SMTP variables are used. If neither is configured, form submissions will return a 500 error.

### Contact Form

| Variable | Required | Description |
|---|---|---|
| `CONTACT_TO_EMAIL` | No | Recipient email (defaults to `sales@eaglemachine.net`) |
| `CONTACT_FROM_EMAIL` | No | Sender address (defaults to `Eagle Automation <noreply@eagleautomation.com>`) |
| `CONTACT_CC` | No | Comma-separated CC list (e.g. `mel@eaglemachine.net,ramy@eaglemachine.net`) |

### Optional

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | No | Cloudflare Turnstile site key (enables captcha) |
| `TURNSTILE_SECRET_KEY` | No | Cloudflare Turnstile secret key (server-side verification) |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics measurement ID |

## Project Structure

```
app/
  page.tsx              # Home
  about/page.tsx        # About
  case-studies/page.tsx # Case Studies
  contact/              # Contact form + page
  platform/page.tsx     # Robot platforms
  process/page.tsx      # Process & support
  roi/                  # ROI calculator + resources
  solutions/page.tsx    # Solution categories
  api/contact/route.ts  # Contact form API
  sitemap.ts            # Auto-generated sitemap
  robots.ts             # Robots.txt
  opengraph-image.tsx   # Dynamic OG image
  not-found.tsx         # Custom 404

components/
  layout/               # Navbar, Footer
  sections/             # Page sections (Hero, CTA, etc.)
  motion/               # Animation components
  ui/                   # Reusable UI (Button, Card, etc.)

lib/
  content.ts            # All site content (CMS-ready)
  cn.ts                 # Tailwind class merge utility

public/
  assets/pdfs/          # Downloadable PDF documents
  images/               # Hero image, PDF previews
  logos/                 # Brand logos
```

## Content Editing

All site copy lives in `lib/content.ts`. Edit content there without touching component code.

## Deployment

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

Set environment variables in the Vercel dashboard under Project Settings > Environment Variables.

## Email Setup

The contact form supports two email providers. Pick the one that fits your setup.

### Option A — SMTP (quickest to get running)

**Gmail (for testing):**

1. Enable 2-Step Verification on your Google account
2. Go to <https://myaccount.google.com/apppasswords> and generate an App Password
3. Set these env vars:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=ramyalnesr@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx
   ```

**Outlook / GoDaddy (production):**

1. Use your mailbox credentials or generate an app password in the M365 admin
2. Set these env vars:
   ```
   SMTP_HOST=smtp.office365.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=ramy@eaglemachine.net
   SMTP_PASS=your-password
   ```

### Option B — Resend (requires DNS access)

1. Create an account at [resend.com](https://resend.com)
2. Add and verify your sending domain (`eagleautomation.com`)
3. Create an API key and add it as `RESEND_API_KEY`
4. The contact form will send notifications to `CONTACT_TO_EMAIL` and confirmations to the submitter

### Vercel Deployment

Add the chosen provider's env vars in the Vercel dashboard under **Project Settings > Environment Variables**. The form will auto-select Resend if `RESEND_API_KEY` is present, otherwise SMTP.

## Turnstile Setup (Optional)

1. Go to [Cloudflare Turnstile](https://dash.cloudflare.com/turnstile)
2. Create a widget for your domain
3. Add `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` to env vars
4. The captcha widget will automatically appear on the contact form
