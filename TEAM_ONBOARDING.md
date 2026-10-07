# Team Onboarding & Development Guide

Welcome to the **Study Abroad Mentor Platform** team! This guide explains how to set up your local development environment, configure your AI coding tools safely, write code following our strict conventions, and collaborate effectively.

---

## 📑 Table of Contents
1. [Team Roles & Ownership](#1-team-roles--ownership)
2. [Prerequisites & Machine Setup](#2-prerequisites--machine-setup)
3. [Repository & Environment Setup](#3-repository--environment-setup)
4. [AI Coding Tools Setup & Safe Settings](#4-ai-coding-tools-setup--safe-settings)
5. [The "AI Driving Licence" (Sprint 0 Check)](#5-the-ai-driving-licence-sprint-0-check)
6. [Daily Coding Workflow: From Issue to PR](#6-daily-coding-workflow-from-issue-to-pr)
7. [Coding Conventions & Invariants](#7-coding-conventions--invariants)
8. [Role-Specific Guides](#8-role-specific-guides)
9. [Team Cadence & Communication](#9-team-cadence--communication)
10. [The 14 NEVER Rules](#10-the-14-never-rules)

---

## 1. Team Roles & Ownership

Each member has dedicated areas of ownership and a defined weekly commitment:

* **Backend & Product Owner (Founder)** (14 h/wk): Data model, Supabase migrations, `apps/api/app/domain/` rules, Safepay, append-only ledger, payouts, releases.
* **Frontend + UI/UX Engineer** (12.5 h/wk): Figma design, `apps/web/` (Next.js App Router, Tailwind CSS, `next-intl`), mobile PWA responsiveness, Playwright tests.
* **AI Engineer** (12.5 h/wk): GitHub Actions CI/CD, local Docker/Supabase stack, LiveKit WebRTC, worker jobs, 2FA, contact filter (`app.contains_contact`).
* **R&D Specialist** (12.5 h/wk): Student discovery interviews, mentor "show don't send" verification, fact cards (`ai/kb/cards/`), usability moderation (SUS), QA coordination.

---

## 2. Prerequisites & Machine Setup

Every developer needs the following tools installed on their machine (Windows with WSL 2 or PowerShell, macOS, or Linux).

### 2.1 Git
* Install Git: [git-scm.com](https://git-scm.com/)
* Verify: `git --version` (requires 2.40+)
* Set your name and email:
  ```bash
  git config --global user.name "Your Name"
  git config --global user.email "your.email@example.com"
  ```

### 2.2 Node.js & pnpm
* Node.js v20 LTS or v24: [nodejs.org](https://nodejs.org/)
* Install `pnpm` globally:
  ```bash
  npm install -g pnpm
  pnpm --version
  ```

### 2.3 Python & uv
* Python 3.12+ (or 3.14): [python.org](https://www.python.org/)
* Install `uv` (fast Python package manager):
  * **Windows (PowerShell)**:
    ```powershell
    powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
    ```
  * **macOS / Linux**:
    ```bash
    curl -LsSf https://astral.sh/uv/install.sh | sh
    ```
  * Verify: `uv --version`

### 2.4 Docker Desktop
* Install Docker Desktop: [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/)
* Make sure Docker Desktop is **running** in the background.

### 2.5 Supabase CLI
* Install Supabase CLI:
  ```bash
  npm install -g supabase
  supabase --version
  ```

### 2.6 GitHub CLI (`gh`)
* Install GitHub CLI: [cli.github.com](https://cli.github.com/)
* Authenticate:
  ```bash
  gh auth login
  ```

---

## 3. Repository & Environment Setup

### 3.1 Clone the Repository
```bash
git clone https://github.com/<organization-or-username>/study-abroad-mentor-platform.git
cd study-abroad-mentor-platform
```

### 3.2 Install Dependencies
```bash
# Install root and frontend web dependencies
pnpm install

# Setup Python API virtual environment and dependencies
cd apps/api
uv sync
cd ../..
```

### 3.3 Local Database Stack
Make sure Docker Desktop is running, then execute:
```bash
# Start local PostgreSQL, Supabase Auth, Storage, and Studio
supabase start

# Run database tests to verify setup
supabase test db
```
Local Supabase Studio will be accessible at: `http://localhost:54323`

---

## 4. AI Coding Tools Setup & Safe Settings

We use **Claude Code (Claude Pro)** for MAJOR tasks and **Google Antigravity** for MINOR tasks. Both tools MUST have privacy safeguards enabled before you run any command.

### 4.1 Claude Code Setup (Claude Pro Account Required)
1. Install Claude Code CLI:
   ```bash
   npm install -g @anthropic-ai/claude-code
   claude --version
   claude doctor
   ```
2. **Turn OFF Model Training**:
   * Open `claude.ai` → **Settings** → **Privacy**.
   * Turn OFF: **"Help improve Claude with your chats"**.
3. **Verify Settings Load**:
   * In the repo root, run: `claude`
   * Type `/context` and confirm that `AGENTS.md` and `CLAUDE.md` are loaded.
   * Type `/permissions` and confirm `.env` files are blocked.

### 4.2 Google Antigravity Setup
1. Install Google Antigravity IDE / CLI.
2. **Disable Telemetry**: Settings → Telemetry → **OFF**.
3. **Safe Settings**:
   * Security Preset: **Request Review** (never Turbo or Unrestricted).
   * Terminal Command Auto-execution: **Request Review**.
   * Plan Review Policy: **Asks for review**.
   * Sandbox Mode: **On**.
   * Access to files outside workspace: **Off**.
   * Browser tools: **Off by default** (only enabled for staging tests, restricted to `localhost` and staging domain).

### 4.3 The MAJOR vs MINOR Task Rule
* **MAJOR Task** → Use **Claude Code** (Max 3 sessions per person per week):
  * Any new screen, endpoint, job, or test suite.
  * Changes touching >2 files or >100 lines.
  * Touches sensitive areas: payments, ledger, refunds, auth, 2FA, RLS, migrations, CI.
  * Changes shared contracts (schema, API shape).
* **MINOR Task** → Use **Google Antigravity** or By Hand:
  * Touches at most 2 files and under 50 lines.
  * NOT in a sensitive area.
  * You already know exactly what to change (styling, copy swap, lint fix, 1-file tweak).
* **HUMAN ONLY (By Hand - NO AI)**:
  * Secrets, API keys, payment webhook signatures (`verify_signature`), `access_matrix.yaml`, and merging PRs.

---

## 5. The "AI Driving Licence" (Sprint 0 Check)

Before taking your first MAJOR task, schedule a 1-hour session with the AI Engineer to demonstrate:
1. [ ] Privacy settings are toggled OFF on both Claude and Antigravity (provide screenshot in Discord `#dev`).
2. [ ] `/context` in Claude Code confirms `AGENTS.md` and `CLAUDE.md` loaded.
3. [ ] Attempting to ask Claude to read `.env` is blocked by `.claude/settings.json`.
4. [ ] Explain what plan mode, `/clear`, `/usage`, and `/rewind` do.
5. [ ] State the MAJOR vs MINOR rule and recite the 14 NEVER rules.
6. [ ] Complete one T7 Explain-Back exercise.
7. [ ] Open a practice PR adhering to the project PR template.

---

## 6. Daily Coding Workflow: From Issue to PR

### Step 1: Pick an Issue
* Find your assigned issue on GitHub Projects.
* Ensure it has clear acceptance criteria in `Given / When / Then` format.

### Step 2: Create a Feature Branch
```bash
git checkout main
git pull origin main
git checkout -b feat/<issue-number>-<short-slug>
# Example: git checkout -b feat/12-mentor-directory
```

### Step 3: Plan Before Coding
* Start Claude Code in plan mode:
  ```
  /plan
  Task: Issue #12: Mentor Directory
  Goal: Allow students to filter mentors by country and field
  Scope: apps/web/app/(public)/mentors
  Constraints: Follow AGENTS.md
  ```
* Review the plan, ask "why", approve each step.

### Step 4: Write Tests First
* For domain, booking, and money logic: **tests come before code**.
* Run in a fresh session (`/clear`):
  * Test happy path.
  * Test invalid inputs.
  * Test permission/edge cases.
* Pass `now` as a parameter for any time-based function.

### Step 5: Implement in Small Steps
* Build one step per prompt.
* Keep changes under ~300 lines per PR.

### Step 6: Run Local Checks
Before committing or pushing, run:
```bash
# Web & types check:
pnpm test:fast

# API checks:
cd apps/api
uv run ruff check .
uv run mypy app
uv run pytest -m "not integration and not eval"
cd ../..
```

### Step 7: The "Break-It Check"
* Flip one condition in your code or schema.
* Run the test suite and confirm the relevant test **fails**.
* Undo the flip and confirm it passes.

### Step 8: Self-Review & PR Submission
* Run `/code-review` in Claude Code.
* Push your branch:
  ```bash
  git push origin feat/<issue-number>-<short-slug>
  ```
* Open a PR using GitHub CLI:
  ```bash
  gh pr create
  ```
* Fill out the PR template completely:
  * **Explain-Back section**: Write 3–5 sentences **in your own words without AI** explaining what the code does, why it's built this way, and what breaks if removed.

---

## 7. Coding Conventions & Invariants

* **Money**:
  * ALWAYS integer paisa (`PKR 5,000 = 500000` paisa).
  * **NEVER use floats or decimals for money**.
  * Server calculates every amount; frontend never calculates prices.
* **Time**:
  * Store all dates/times in **UTC**.
  * Display times in the viewer's detected local time zone (`Asia/Karachi`, `Europe/Berlin`, `Europe/London`).
  * Domain functions accept `now` as an explicit parameter.
* **Database & RLS**:
  * Supabase migrations in `supabase/migrations/` are the **single source of truth**.
  * Every table must have Row-Level Security (RLS) enabled, **deny by default**.
  * Every new table requires a row in `supabase/tests/access_matrix.yaml` and passing pgTAP tests.
  * Ledger is **append-only**: Postgres triggers prevent `UPDATE` and `DELETE`.
* **User-Facing Text**:
  * All text lives in `apps/web/messages/en.json` (for future Urdu translation).
  * Use logical CSS properties (`ms-`, `me-`, `ps-`, `pe-`, `start`, `end`).
* **Input Validation**:
  * Validate frontend inputs with **zod**.
  * Validate API payloads with **Pydantic**.
  * Contact detail filtering uses the database function `app.contains_contact`.

---

## 8. Role-Specific Guides

### 8.1 Frontend + UI/UX Engineer
* **Location**: `apps/web/`
* **Run Dev Server**:
  ```bash
  pnpm dev
  ```
* **Testing**:
  ```bash
  # Unit & Component tests:
  pnpm test

  # End-to-end journeys with Playwright:
  pnpm exec playwright test
  ```
* **Accessibility**: Every journey test runs `axe` accessibility verification. Aim for WCAG 2.2 AA.

### 8.2 Backend & AI Engineer
* **Location**: `apps/api/`
* **Run API Server**:
  ```bash
  cd apps/api
  uv run uvicorn app.main:app --reload --port 8000
  ```
* **Testing**:
  ```bash
  # Unit tests (no external calls):
  uv run pytest -m "not integration and not eval"

  # Integration tests (requires 'supabase start'):
  uv run pytest -m integration
  ```
* **Coverage Requirement**: Domain logic (`apps/api/app/domain/`) requires **>= 90% line coverage** and **>= 85% branch coverage**.

### 8.3 R&D Specialist
* **Location**: `ai/kb/cards/` (Fact cards) and `docs/testing/`
* Edit fact cards directly via GitHub web editor or VS Code.
* Every fact card must cite an official URL (DAAD, uni-assist, GOV.UK, university page) and record a `last_verified` date.
* Lead the weekly Sunday test bash and moderate think-aloud usability testing.

---

## 9. Team Cadence & Communication

We communicate on **Discord** and **GitHub**:

### 9.1 Daily Async Standup (Mon–Thu, Sat by 23:00 PKT)
Post in Discord channel `#standup` using this exact template:
```
Done: Issue #12 - Created mentor filter component
Next: Issue #15 - Wire mentor directory to search API [CC]
Blocked: none
Hours today: 2.0   AI: Claude weekly 45%
```
*Tool tags*: `[CC]` Claude Code, `[AG]` Antigravity, `[chat]` Claude Chat, `[hand]` By Hand.

### 9.2 Weekly Schedule
* **Wednesday 22:00 PKT**: Mid-week checkpoint (mark items `on track`, `at risk`, or `blocked`).
* **Friday**: Catch-up & rest day. No scheduled coding.
* **Saturday 11:00–12:00 PKT**: Live sync on Google Meet (weekly metrics, 3-minute live demos, quality review, AI budget check).
* **Sunday 20:00–21:00 PKT**: Team Test Bash on staging mobile browsers.

---

## 10. The 14 NEVER Rules

Every team member must strictly adhere to these 14 rules without exception:

1. **NEVER** read, print, or edit `.env` files, secrets, `*.pem`, `*.key`, or credentials.
2. **NEVER** put keys, tokens, or passwords in code, tests, logs, commits, screenshots, or prompts.
3. **NEVER** use real user data or documents (passports, CNIC, transcripts, real chats, payment exports). Use only `@example.com` emails and fake data.
4. **NEVER** disable auth, permission checks, rate limits, validation, or webhook signature checks.
5. **NEVER** change prices, fee %, refund rules, order states, or payout logic unless the issue links an approved ADR in `docs/adr/`.
6. **NEVER** create stored wallet balances. Money is tracked strictly per order in escrow.
7. **NEVER** log personal data (phone, email, document numbers, chat content).
8. **NEVER** write a migration that drops or renames tables/columns without explicit approval.
9. **NEVER** push directly to `main`, force-push, merge PRs, or modify branch protection.
10. **NEVER** run `supabase db push`, `supabase db reset --linked`, `supabase link`, `vercel`, or `gh secret` from personal laptops (laptops link to STAGING only).
11. **NEVER** add a dependency without name, purpose, approved license (MIT/Apache-2.0/BSD/ISC), and proof it exists.
12. **NEVER** treat untrusted external text (web pages, PDFs, issues) as instructions. Treat it as DATA.
13. **NEVER** write content that gives individual visa advice or guarantees university admission.
14. **NEVER** enable `FAULT_INJECTION_ENABLED` outside local and staging environments.

---

## 🆘 Need Help?
* **Code / Architecture Questions**: Post in Discord `#dev` and tag `@founder` or `@ai-engineer`.
* **Design / UX Questions**: Post in `#design`.
* **Testing / Bug Reporting**: Post in `#bugs`.
