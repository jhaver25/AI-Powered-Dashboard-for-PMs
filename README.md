# AI-Powered Executive Project Dashboard

An AI-powered web application that transforms unstructured project status notes into a structured executive briefing. Paste raw meeting notes, status updates, or any free-form project text — the app uses Claude AI to extract and organize the information into a portfolio-level dashboard for C-level stakeholders.

---
## Demo Recording

Accessible via Loom: https://www.loom.com/share/52e902cde5b74e7780e4b5de5d46d61d

---

## What It Does

Product managers and program leads often maintain status updates in documents, notes, or emails that aren't easy to present to executives. This tool bridges that gap: paste your notes in any format, click **Analyze & Generate Dashboard**, and get a clean, interactive portfolio view in seconds.

The AI reads your input, infers each project's health status, and surfaces the information that matters most to leadership — risks, decisions needed, cross-project dependencies, and upcoming actions — all without requiring a specific input format.

---

## Features

### Portfolio Summary
At the top of every dashboard, a summary bar shows:
- Total project count broken down by RAG status (On Track / At Risk / Off Track)
- Count of high-severity risks across all projects
- Count of high-urgency decisions requiring executive action
- A prominent alert callout if any high-urgency decisions are pending

### Per-Project Cards
Each project gets its own card displaying:
- **RAG status badge** — green (On Track), amber (At Risk), or red (Off Track), inferred from context if not stated explicitly
- **Trend indicator** — shows whether the project improved or worsened compared to the previous analysis run (↑ Improved / ↓ Worsened)
- **One-line status summary** — a concise sentence describing the current state
- **Team chips** — all teams assigned to the project
- **Key accomplishments** — recent wins and milestones
- **Immediate next steps** — actions due within approximately two weeks, with suggested owners
- **Long-term next steps** — milestones and work beyond two weeks, with suggested owners

### RAG Filter
The projects section includes filter buttons to show All / Off Track / At Risk / On Track projects, making it easy to focus on the highest-priority items in a large portfolio.

### Executive Decisions Required
A table of all decisions that require leadership input or approval, sorted by urgency (high → medium → low). Each row includes:
- The decision needed
- Affected projects
- Urgency level
- Suggested owner
- Context to inform the decision

### Key Risks
A cross-portfolio risk table showing each risk's description, which projects it affects, severity (high / medium / low), and any mitigation approaches mentioned in the input.

### Key Dependencies
A table of cross-project and cross-team dependencies, showing what is being depended on, which team or project is providing it, which is depending on it, and whether the dependency is on-track, at-risk, or blocked.

### Export to Markdown
The **Export Markdown** button downloads a fully formatted `.md` file of the entire dashboard — portfolio summary table, all project details, decisions, risks, and dependencies — ready to paste into Confluence, Notion, a GitHub issue, or any document.

### Run History & Trend Tracking
The app stores the RAG status of each project across the last four analysis runs in browser local storage. On subsequent runs, project cards automatically show whether a project's status improved or worsened since the previous run — no account or server-side storage required.

---

## How to Use

1. **Paste your project status text** into the input field. Any format works: raw meeting notes, bullet points, structured reports, Markdown, or plain prose.
2. Click **Analyze & Generate Dashboard**.
3. Wait for the AI to process the input (typically 5–20 seconds depending on length).
4. Review the generated dashboard. Use the RAG filter to focus on at-risk or off-track projects.
5. Click **Export Markdown** to download the briefing for sharing.
6. Click **New Analysis** (or **Run New Analysis** at the bottom) to start over.

### Tips for Best Results

- **Include explicit project names** so each project is tracked separately on its own card.
- **Mention team names, blockers, and decisions needed** for richer output in the risks and decisions tables.
- **Use status keywords** like "on track", "delayed", "blocked", or "at risk" — the AI uses these to calibrate RAG status, but will also infer status from context when keywords are absent.
- **You can paste raw meeting notes** — the AI will extract the structure without needing a template.
- **Aim for at least a few sentences per project** for a useful dashboard. Very short inputs (under ~100 words) will show a warning.
- Input is capped at **50,000 characters**. A warning appears at 40,000. For large portfolios, consider trimming older or lower-priority content.

### Sample Input

A sample status notes file is included at `sample_status_notes.txt`. It covers nine projects across a typical engineering portfolio and demonstrates the kinds of input the app handles well — varying status levels, cross-project dependencies, executive decision points, and multi-team work.

---

## Setup & Local Development

### Prerequisites

- **Node.js** 18 or later
- **Vercel CLI** — required for local development (`npm i -g vercel`)
- An **Anthropic API key** (get one at [console.anthropic.com](https://console.anthropic.com))

### Installation

```bash
# Clone the repo
git clone <repo-url>
cd AI-Powered-Dashboard-for-PMs

# Install dependencies
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your API key:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
ANTHROPIC_API_KEY=your_api_key_here
```

This key is used **only** in the serverless function (`api/analyze.js`) and is never exposed to the browser.

Optionally, set `ALLOWED_ORIGIN` to restrict CORS to a specific domain (e.g., your production URL). If unset, all origins are allowed — suitable for development.

### Running Locally

You **must** use `vercel dev` instead of `npm run dev`. The app requires the Vercel CLI to run both the Vite frontend and the serverless API function together:

```bash
vercel dev
```

This starts the frontend (Vite) and the `/api/analyze` serverless function on the same local port. Running `npm run dev` alone will start the frontend but the API calls will fail because the `/api/analyze` route won't exist.

> **First run:** `vercel dev` may prompt you to link the project to a Vercel account. Follow the prompts, or run `vercel link` first.

---

## Deployment

The project is pre-configured for Vercel deployment via `vercel.json`.

### Deploy via Vercel CLI

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod
```

### Deploy via GitHub

1. Push the repository to GitHub.
2. Import the project in the [Vercel dashboard](https://vercel.com/new).
3. Add the `ANTHROPIC_API_KEY` environment variable in **Project Settings → Environment Variables**.
4. Vercel will build and deploy automatically on every push to `main`.

### Environment Variables on Vercel

Set the following in the Vercel dashboard or via the CLI:

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | Yes | Your Anthropic API key |
| `ALLOWED_ORIGIN` | No | Restrict CORS to a specific origin (e.g., `https://yourdomain.com`) |

---

## Architecture

```
┌─────────────────────────────────────────────┐
│  Browser (React + Vite)                     │
│                                             │
│  InputSection → fetch POST /api/analyze     │
│       ↓                                     │
│  LoadingIndicator (while waiting)           │
│       ↓                                     │
│  Dashboard (projects, risks, decisions,     │
│             dependencies)                  │
└─────────────────────────┬───────────────────┘
                          │ HTTP POST
                          ▼
┌─────────────────────────────────────────────┐
│  Vercel Serverless Function                 │
│  api/analyze.js                             │
│                                             │
│  - Validates input (size, format)           │
│  - Calls Anthropic claude-sonnet-4-6        │
│  - Prompt caching on system prompt          │
│  - Returns structured JSON                  │
└─────────────────────────────────────────────┘
```

**Frontend:** React 18 + Vite 6, no UI component library — pure CSS with custom properties.

**API:** Single Vercel serverless function at `api/analyze.js`. It calls the Anthropic API with a detailed system prompt that defines the exact JSON schema to return. The system prompt is cached (Anthropic prompt caching) to reduce cost and latency on repeated calls.

**AI model:** `claude-sonnet-4-6`. The model receives the user's raw text and returns a single JSON object containing all projects, risks, decisions, and dependencies. No streaming — the full response is parsed before the dashboard renders.

**Local state:** Run history is stored in browser `localStorage` (last 4 snapshots). No user accounts, no database, no server-side session state.

---

## Project Structure

```
api/
  analyze.js              Vercel serverless function — Anthropic API call and JSON validation

src/
  main.jsx                React entry point
  App.jsx                 Top-level state machine (input / loading / dashboard views)
  App.css                 Global styles and design tokens

  components/
    InputSection.jsx/css  Text input form with character counter and input tips
    LoadingIndicator.jsx/css  Loading spinner shown during API call
    Dashboard.jsx/css     Summary bar, stat cards, alert callout, filter bar, export button
    ProjectCard.jsx/css   Per-project card with RAG badge, trend indicator, and detail sections
    RisksSection.jsx      Key Risks table
    DecisionsSection.jsx  Executive Decisions Required table (sorted by urgency)
    DependenciesSection.jsx  Key Dependencies table
    TableSection.css      Shared table and pill styles

  utils/
    exportMarkdown.js     Generates and downloads a Markdown file from dashboard data
    history.js            localStorage-based run history and trend calculation

sample_status_notes.txt   Example input covering nine projects across an engineering portfolio
```

---

## Constraints & Limits

| Constraint | Value |
|---|---|
| Maximum input size | 50,000 characters |
| Soft warning threshold | 40,000 characters |
| Request timeout | 180 seconds |
| Run history depth | 4 snapshots (browser localStorage) |
| AI model max output | 16,000 tokens |

If the input does not contain recognizable project status information (e.g., random text or a test message), the API returns a validation error and prompts the user to provide project data.

---

## Built With

- [React 18](https://react.dev)
- [Vite 6](https://vitejs.dev)
- [Anthropic SDK](https://github.com/anthropics/anthropic-sdk-typescript) (`claude-sonnet-4-6`)
- [Vercel](https://vercel.com) (hosting + serverless functions)
