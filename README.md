# Study Abroad Mentor Platform

A trusted peer-to-peer guidance marketplace connecting aspiring students in Pakistan with verified students and graduates in Germany and the UK ("mentors").

---

## 🎯 Product Overview

- **Core Mission**: Break the dependency on costly (PKR 150k–500k+), untrusted educational consultants by connecting applicants directly with verified students living abroad who recently completed the journey.
- **Initial Corridor**: Pakistan → Germany (primary) and Pakistan → UK (secondary).
- **Key Offerings**: Verified 30/60-min 1-on-1 video sessions (LiveKit), document feedback (SOP/CV), 7/30-day chat passes, admission roadmaps, and peer fact cards.
- **Revenue Model**: 15% mentor commission + 5% student service fee (~20% platform margin).
- **Held Payments (Escrow)**: Payments held securely via Safepay in integer paisa until session completion + 72-hour dispute window, followed by weekly PKR payouts.
- **Strict Legal Boundary**: Information sharing and mentoring ONLY. **NEVER** provides individual visa/immigration advice and **NEVER** guarantees admission.

---

## 👥 Team Structure & Ownership

| Role | Primary Responsibilities | Capacity | AI Tooling |
| :--- | :--- | :--- | :--- |
| **Founder / Backend (You, PO)** | Product Owner, domain business rules, Safepay, ledger, Supabase migrations & RLS policies, production releases | 14 h/wk | Claude Code (MAJOR), Claude Chat, Hand |
| **Frontend + UI/UX** | Figma design system, Next.js App Router, Tailwind CSS, `next-intl` shell, PWA mobile experience, Playwright e2e | 12.5 h/wk | Claude Code (MAJOR), Antigravity (MINOR), Claude Chat |
| **AI Engineer** | CI/CD pipelines, local Docker/Supabase stack, LiveKit WebRTC, job worker processes, 2FA, contact filter | 12.5 h/wk | Claude Code (MAJOR), Antigravity (MINOR), Claude Chat |
| **R&D Specialist** | Student user research, mentor recruitment & "show don't send" ID verification, usability testing (SUS), QA coordination | 12.5 h/wk | Claude Chat (research), Antigravity (fact cards), Hand |

---

## 🛠️ Technology Stack

- **Monorepo**: Single repository managed with `pnpm` and `turbo`.
- **Frontend (`apps/web`)**: Next.js 15 (App Router), React, Tailwind CSS, `next-intl` (English first, Urdu ready), `@supabase/ssr`.
- **Backend API (`apps/api`)**: Python 3.12+ FastAPI, Pydantic, pure domain logic (`domain/`), async worker jobs (`jobs/`).
- **Database & Auth (`supabase`)**: PostgreSQL 15+ (Frankfurt region `eu-central-1`), Row Level Security (RLS) deny-by-default, pgvector, Supabase Auth (TOTP 2FA), Supabase Storage.
- **Payments**: Safepay (cards 2.9% + Rs 30; Raast / mobile wallets 1.5%). Integer paisa only.
- **Video**: LiveKit Cloud WebRTC.
- **Monitoring**: Sentry (GitHub Student Pack).

---

## 🚀 Quick Start (Local Setup)

### 1. Prerequisites
- **Node.js** v20+ / v24+
- **pnpm**: `npm install -g pnpm`
- **Python**: 3.12+ with `uv` (`curl -LsSf https://astral.sh/uv/install.ps1 | iex` on Windows)
- **Docker Desktop** (running)
- **Supabase CLI**: `npm install -g supabase` or via Scoop

### 2. Environment Configuration
Follow the **NEVER** rules in [AGENTS.md](file:///AGENTS.md):
- Never commit `.env` or credentials.
- Copy `.env.example` to `.env.local` for local development.

### 3. Running Local Stack
```bash
# 1. Start local Supabase (Postgres, Auth, Storage)
supabase start

# 2. Run Database Tests (pgTAP)
supabase test db

# 3. Generate TypeScript DB Types
supabase gen types typescript --local > packages/shared/src/db.types.ts

# 4. Start API (FastAPI)
cd apps/api
uv run uvicorn app.main:app --reload

# 5. Start Web (Next.js)
cd apps/web
pnpm dev
```

---

## 📋 AI Coding Rules & Guardrails

All coding agents and human contributors MUST follow [AGENTS.md](file:///AGENTS.md) and [CLAUDE.md](file:///CLAUDE.md):
- **MAJOR Tasks**: Routed to Claude Code (max 3 sessions per person per week).
- **MINOR Tasks**: Routed to Google Antigravity (max 2 files, <50 lines, styling, copy swaps, one-file fixes).
- **Review Policy**: Any change touching sensitive areas (`supabase/migrations`, `apps/api/app/domain`, payments, auth, CI) requires 2 non-author reviews.
- **Explain-Back Rule**: Authors must explain what their code does without AI. If you cannot explain a line, it does not get merged.
