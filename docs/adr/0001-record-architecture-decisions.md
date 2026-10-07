# ADR-001: Core Technology Stack & Monorepo Architecture

## Status
Accepted

## Date
2026-10-06

## Context
We are building a study-abroad mentorship marketplace connecting Pakistani students with mentors studying/graduated in Germany and the UK.
The engineering team consists of 4 part-time university students with ~10-15 hours/week each.
We need a high-velocity, reliable, secure, and low-maintenance architecture that optimizes for rapid MVP delivery (Private Beta Mon 14 Dec 2026) while rigorously enforcing data safety, zero client-calculated payments, and GDPR compliance.

## Decisions
1. **Repository**: Single monorepo containing:
   - `apps/web/`: Next.js 15 (App Router) + Tailwind CSS + `next-intl` (SSR, PWA).
   - `apps/api/`: Python FastAPI service containing pure business rules (`domain/`), job workers, and payment integrations.
   - `supabase/`: PostgreSQL database schema migrations, RLS policies, functions, pgTAP tests, and seed data.
   - `packages/shared/`: Shared TypeScript types and contract definitions.
2. **Backend & Database**:
   - Managed Supabase (PostgreSQL 15+, Frankfurt region `eu-central-1` for GDPR alignment).
   - Supabase Auth (Email/password, Google OAuth, TOTP 2FA for admins).
   - Supabase Storage (private buckets with expiring signed URLs for verification documents).
   - Supabase Migrations as the **single source of truth** for database schemas.
3. **Payments & Ledger**:
   - Safepay gateway in Pakistan.
   - Integer paisa stored in database (never floats/decimals).
   - Double-entry / append-only ledger with Postgres trigger preventing `UPDATE` and `DELETE`.
   - Held payments (escrow per order) with 72h auto-confirm and weekly PKR payouts.
4. **Video**:
   - LiveKit Cloud for WebRTC audio/video sessions with in-browser connection.
5. **Monitoring & Error Tracking**:
   - Sentry for error tracking, performance, and uptime alerts.
