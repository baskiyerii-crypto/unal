# ARCHITECTURAL_DECISIONS.md — Architectural Decision Records (ADR Log)

## ADR-001: Selection of Tier A (Next.js 16 App Router + Embedded Payload CMS 3.x)

- **Status:** Approved & Binding
- **Context:** MenakYapı requires a fast, SEO-optimized, highly responsive corporate website with dynamic content management (Services, Projects/Gallery, Site Settings) and an admin interface.
- **Decision:** Implement **Tier A Architecture**: Next.js 16 App Router with Payload CMS 3.x embedded natively inside the Next.js process (`/app/(payload)/admin`).
- **Rationale:**
  - Single application process simplifies deployment and reduces RAM usage on the VPS.
  - Native Payload CMS integration allows AI Agents to work seamlessly with TypeScript types.
  - Full SSG / ISR support delivers sub-second load times and high Core Web Vitals scores.

---

## ADR-002: Infrastructure Constitution & Zero-Lock-In Database Resilience

- **Status:** Approved & Binding
- **Context:** The client requires a zero-maintenance ("tak ve unut"), cost-predictable infrastructure without "hidden cloud traps" (such as Vercel Blob limits, Serverless cold-starts, or surprise overage bills), while guaranteeing zero vendor lock-in.
- **Decision:**
  1. **Deployment Target:** Hetzner VPS + Coolify v4 + Docker Compose.
  2. **Database Engine:** PostgreSQL 16 running inside a Docker container with `restart: unless-stopped` restart policy.
  3. **Auto-Recovery & Stability:**
     - Docker memory limits (512MB RAM + 1GB Swap) to prevent OOM killer crashes.
     - Automated nightly `pg_dump` backup pushed to Hetzner Storage Box via `rclone`/`restic` with 7-day retention.
  4. **Zero Vendor Lock-in Compliance:** Standard PostgreSQL ANSI SQL driver connection string (`postgres://...`). The entire database can be exported via standard `pg_dump` and restored anywhere in under 1 minute.
- **Consequences:**
  - Monthly cost is strictly fixed at ~€5/month (no surprise bills).
  - No database auto-pausing or cold-start delays.

---

## ADR-003: Transactional Email & Lead Notification Abstraction

- **Status:** Approved & Binding
- **Context:** Quote request forms ("Teklif Al") and contact forms must send immediate email alerts to `menakyapi@gmail.com`.
- **Decision:** Implement an abstract email service layer using `Nodemailer` driven by standard environment variables (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`).
- **Rationale:** Prevents lock-in to specific email providers (Resend, SendGrid, Mailgun). The client can switch SMTP providers anytime without touching code.

---

## ADR-004: Local Media Storage & Optimization Strategy

- **Status:** Approved & Binding
- **Context:** MenakYapı gallery relies heavily on high-resolution roof project photography and videos.
- **Decision:**
  - Store uploaded media directly in a persistent Docker Volume (`/media` mounted to Hetzner disk).
  - Process images automatically using `sharp` / Next.js `next/image` to serve WebP and AVIF formats.
  - Enforce `priority` flag on Hero images and `loading="lazy"` on gallery items below the fold.
- **Rationale:** Eliminates reliance on Vercel Blob or third-party paid image hosting tiers.
