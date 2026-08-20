# AGENTS.md — MenakYapı Project Architecture Rules

## 1. TECH STACK & EXACT VERSIONS
- **Frontend Framework:** Next.js 16.0 (App Router, Server Components default)
- **CMS / Backend:** Payload CMS 3.x (Embedded natively inside Next.js)
- **Database:** PostgreSQL 16 (Running in Docker container on Hetzner VPS via Coolify v4)
- **Styling:** Vanilla CSS / Tailwind CSS 4.x (configured strictly via `DESIGN.md` tokens)
- **Language & Runtime:** TypeScript 5.4+, Node.js 22 LTS
- **Testing & Quality:** Playwright (E2E), Vitest (Unit), ESLint 9+

## 2. BUILD, LINT & TEST COMMANDS
- `npm run dev` : Start local development server
- `npm run build` : Run Next.js production build and Payload type generation
- `npm run lint -- --fix` : Lint codebase and apply automatic fixes
- `npm run test:unit` : Run Vitest unit tests
- `npm run test:e2e` : Run Playwright end-to-end tests
- `npx payload generate:types` : Regenerate Payload TypeScript interfaces

## 3. FOLDER & NAMING CONVENTIONS
```
app/(site)/[...]/page.tsx      → Routing layer (SSG / ISR / Server Components)
components/ui/                 → Reusable atomic UI components (Button, Card, Input)
components/blocks/             → React components matching Payload Block slugs 1:1
lib/payload/                   → Local API fetchers and Payload CMS access layer
lib/utils/                     → Helper utilities and formatters
```
**CRITICAL RULE:** Every component under `components/blocks/` MUST match its Payload block `slug` exactly (e.g., block `hero` → `components/blocks/hero.tsx`).

## 4. NON-STANDARD PATTERNS & TRAPS
- **Coolify/Traefik Build Isolation:** Never perform direct database queries at Next.js `build` time if PostgreSQL connection is isolated inside the Docker network. Use `revalidatePath` / ISR or runtime server components.
- **GTM & Analytics Hydration:** GTM/GA4 IDs MUST be fetched from Payload Global (`site-settings`) via `getSiteSettings()`. If null, log a warning without crashing.
- **Auto-Restart & Health:** DB container uses `restart: unless-stopped`. Never hardcode fallback dummy data in production endpoints.

## 5. STRICT BANS (YASAKLAR)
- ❌ DO NOT use Vercel, Netlify, Supabase Cloud, or Firebase proprietary SDKs.
- ❌ DO NOT hardcode editable content, phone numbers, or titles inside React components.
- ❌ DO NOT create arbitrary folders outside `components/ui/` or `components/blocks/`.
- ❌ DO NOT introduce custom hex colors or spacing values outside `DESIGN.md`.
- ❌ DO NOT commit an entire phase in a single monolithic git commit. Use conventional commits (`feat:`, `fix:`, `chore:`).
- ❌ DO NOT mark a phase complete without updating `PROGRESS.md`.

## 6. PROJECT REFERENCE DOCUMENTS
- [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) — Business context & MenakYapı info
- [DESIGN.md](./DESIGN.md) — UI design tokens & design system
- [ARCHITECTURAL_DECISIONS.md](./ARCHITECTURAL_DECISIONS.md) — ADR Log & Zero Lock-in rationale
- [ADMIN_PANEL_MAP.md](./ADMIN_PANEL_MAP.md) — Payload Collections & Globals mapping
- [DEPLOYMENT.md](./DEPLOYMENT.md) — Coolify, Docker Compose & Hetzner Backup setup
- [SYSTEM_SCHEMA_AND_RISK_REPORT.md](./SYSTEM_SCHEMA_AND_RISK_REPORT.md) — Database schema & Risk report
- [PROGRESS.md](./PROGRESS.md) — Phase tracking checklist
- [.env.example](./.env.example) — Environment variables template
