# Code Review Notes — AI-Powered Executive Project Dashboard

**Reviewed by:** Claude (Anthropic), acting as senior software engineering consultant. Proposed changes review and prioritized by Jeremy H, acting as Product and Program Manager.
**Review date:** May 26, 2026
**Codebase:** AI-Powered Dashboard for PMs — React + Vite + Vercel Serverless

---

## Overview

This document captures a full code review of the dashboard application, covering input handling resilience, API error handling, dashboard UI/display behavior, and usability/functionality improvements. Each change is ranked by priority (as agreed with the product owner), includes a description and justification, and provides before/after code blocks for implementation reference.

---

## Summary of Changes

| # | Change | Category | Effort |
|---|--------|----------|--------|
| 1 | Preserve input text across errors | Bug fix | Low |
| 2 | Add request timeout with user notification | Resilience | Low |
| 3 | Handle irrelevant or near-empty input gracefully | Validation | Low |
| 4 | Add maximum input length guard | Input resilience | Low |
| 5 | RAG trend tracking via localStorage (max 4 snapshots) | Feature | Medium |
| 6 | Specific error messages for API key issues | Resilience | Low |
| 7 | Add `suggestedOwner` to decisions and next steps | Schema + UI | Medium |
| 8 | Markdown export | Feature | Medium |
| 9 | Filter projects by RAG status | Usability | Low |
| 10 | Sort decisions table by urgency | UI | Low |
| 11 | Restrict CORS to known origin in production | Security | Low |
| 12 | Remove development-only language from production errors | Polish | Low |
| 13 | Detect and handle conflicting project status in prompt | Prompt | Low |

---

## Change 1: Preserve Input Text Across Errors

**Category:** Bug fix
**Files:** `src/App.jsx`, `src/components/InputSection.jsx`

### Description
Lift the `text` state from `InputSection` up to `App.jsx` and pass it down as a prop. Currently, `InputSection` is unmounted when the view switches to `LOADING`, and remounted fresh when it returns to `INPUT` on error — silently wiping the user's input.

### Justification
Silent data loss on a transient error. A PM who spent time formatting notes loses everything with no warning. Highest priority fix regardless of how infrequently it triggers.

---

### `src/App.jsx` — add `inputText` state, pass to `InputSection`

**Before:**
```jsx
export default function App() {
  const [view, setView] = useState(VIEW.INPUT)
  const [dashboardData, setDashboardData] = useState(null)
  const [error, setError] = useState(null)
```

**After:**
```jsx
export default function App() {
  const [view, setView] = useState(VIEW.INPUT)
  const [dashboardData, setDashboardData] = useState(null)
  const [error, setError] = useState(null)
  const [inputText, setInputText] = useState('')
```

**Before:**
```jsx
          <InputSection onSubmit={handleSubmit} error={error} />
```

**After:**
```jsx
          <InputSection
            onSubmit={handleSubmit}
            error={error}
            text={inputText}
            onTextChange={setInputText}
          />
```

---

### `src/components/InputSection.jsx` — remove internal text state, accept props

**Before:**
```jsx
export default function InputSection({ onSubmit, error }) {
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return
    setSubmitting(true)
    await onSubmit(text)
    setSubmitting(false)
  }

  const charCount = text.length
```

**After:**
```jsx
export default function InputSection({ onSubmit, error, text, onTextChange }) {
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return
    setSubmitting(true)
    await onSubmit(text)
    setSubmitting(false)
  }

  const charCount = text.length
```

**Before:**
```jsx
            onChange={e => setText(e.target.value)}
```

**After:**
```jsx
            onChange={e => onTextChange(e.target.value)}
```

> **Note:** The `useState` import is still needed in `InputSection` for the `submitting` state.

---

## Change 2: Add a Request Timeout with User Notification

**Category:** Resilience
**Files:** `src/App.jsx`, `src/components/LoadingIndicator.jsx`, `src/components/LoadingIndicator.css`

### Description
Wrap the `fetch` call in `App.jsx` with an `AbortController` set to 180 seconds. On timeout, display a specific user-facing message. Update `LoadingIndicator` to show an elapsed-time counter after 20 seconds so users know the request is still live.

### Justification
A hung or slow API call currently produces an infinite spinner with no feedback or escape hatch. For executives sharing a screen in a meeting, this is a silent failure that erodes trust. 180 seconds covers slow Claude responses under heavy load (increased from an initial 90s to better support local development environments); the 20-second elapsed counter provides reassurance during normal operation.

---

### `src/App.jsx` — add AbortController around fetch

**Before:**
```jsx
    let res
    try {
      res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectData }),
      })
    } catch (err) {
      setError(`Network error — could not reach the API. Make sure vercel dev is running. (${err.message})`)
      setView(VIEW.INPUT)
      return
    }
```

**After:**
```jsx
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 180000)

    let res
    try {
      res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectData }),
        signal: controller.signal,
      })
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('The analysis timed out after 180 seconds — the AI service may be under heavy load. Please try again in a moment.')
      } else {
        setError(`Network error — could not reach the analysis service. (${err.message})`)
      }
      setView(VIEW.INPUT)
      return
    } finally {
      clearTimeout(timeoutId)
    }
```

---

### `src/components/LoadingIndicator.jsx` — add elapsed timer

**Before:**
```jsx
import './LoadingIndicator.css'

const STEPS = [ ... ]

export default function LoadingIndicator() {
  return (
    <div className="loading">
      <div className="loading__card card">
        <div className="loading__spinner" aria-hidden="true">
          <div className="loading__ring" />
        </div>
        <h2 className="loading__title">Analyzing Project Data</h2>
        <p className="loading__subtitle">
          Claude is reading your project status and building the executive dashboard.
          This typically takes 10–30 seconds.
        </p>
        <div className="loading__steps" aria-label="Processing steps">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="loading__step"
              style={{ animationDelay: `${i * 0.45}s` }}
            >
              <div className="loading__step-dot" />
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

**After:**
```jsx
import { useState, useEffect } from 'react'
import './LoadingIndicator.css'

const STEPS = [ ... ]

export default function LoadingIndicator() {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setElapsed(s => s + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="loading">
      <div className="loading__card card">
        <div className="loading__spinner" aria-hidden="true">
          <div className="loading__ring" />
        </div>
        <h2 className="loading__title">Analyzing Project Data</h2>
        <p className="loading__subtitle">
          Claude is reading your project status and building the executive dashboard.
          This typically takes 10–30 seconds.
        </p>
        {elapsed >= 20 && (
          <p className="loading__elapsed" role="status">
            Still working… {elapsed}s elapsed (timeout at 180s)
          </p>
        )}
        <div className="loading__steps" aria-label="Processing steps">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="loading__step"
              style={{ animationDelay: `${i * 0.45}s` }}
            >
              <div className="loading__step-dot" />
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

---

### `src/components/LoadingIndicator.css` — add elapsed style

**After (append to file):**
```css
.loading__elapsed {
  font-size: 0.8125rem;
  color: var(--amber);
  font-weight: 500;
  margin-bottom: 1rem;
  padding: 0.5rem 0.75rem;
  background: var(--amber-bg);
  border: 1px solid var(--amber-border);
  border-radius: var(--radius);
  text-align: center;
}
```

---

## Change 3: Handle Irrelevant or Near-Empty Input Gracefully

**Category:** Input validation
**Files:** `src/components/InputSection.jsx`, `src/components/InputSection.css`, `api/analyze.js`

### Description
Two-part change. (a) Client-side: show a non-blocking warning in `InputSection` when word count is under 100. (b) Server-side: add an instruction to the Claude prompt to return an `inputError` field if the content is clearly not project status information. Check for that field in `api/analyze.js` and return a descriptive 422 before reaching the dashboard.

### Justification
Without this, submitting random text fires a full API call, costs tokens, and either returns a hallucinated dashboard or an empty one. The prompt-side check is more reliable than regex — Claude can detect irrelevance. The client-side word count warning handles legitimate short-input cases without hard-blocking.

---

### `src/components/InputSection.jsx` — add word count warning

**Before:**
```jsx
  const charCount = text.length

  return (
    <div className="input-section">
```

**After:**
```jsx
  const charCount = text.length
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  const showBriefWarning = wordCount > 0 && wordCount < 100

  return (
    <div className="input-section">
```

**Before:**
```jsx
      <form className="input-section__form card" onSubmit={handleSubmit}>
```

**After:**
```jsx
      {showBriefWarning && (
        <div className="input-section__warning" role="alert">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          <span>
            Your notes appear brief ({wordCount} word{wordCount !== 1 ? 's' : ''}) — the dashboard may have
            limited information. For best results, include project names, status indicators, and team assignments.
          </span>
        </div>
      )}

      <form className="input-section__form card" onSubmit={handleSubmit}>
```

---

### `src/components/InputSection.css` — add warning style

**After (append to file):**
```css
.input-section__warning {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  background: var(--amber-bg);
  border: 1px solid var(--amber-border);
  border-radius: var(--radius);
  padding: 0.75rem 1rem;
  font-size: 0.8125rem;
  color: var(--amber-text);
  line-height: 1.5;
}

.input-section__warning svg {
  flex-shrink: 0;
  margin-top: 0.1rem;
  color: var(--amber);
}
```

---

### `api/analyze.js` — add irrelevant-content detection to prompt and check for `inputError`

**Before (end of rules in SYSTEM_PROMPT):**
```js
- If a section has no data, return an empty array
- Be thorough — executives rely on completeness`;
```

**After:**
```js
- If a section has no data, return an empty array
- Be thorough — executives rely on completeness
- If the input does not appear to contain project status information (e.g., it is random text, a single unrelated sentence, or clearly off-topic content), return a JSON object with an "inputError" field containing a single plain-English sentence explaining the issue, and set all other arrays to empty. Do not hallucinate or invent project data from non-project content.`;
```

**Before:**
```js
    parsed.generatedAt = new Date().toISOString();
    return res.status(200).json(parsed);
```

**After:**
```js
    if (parsed.inputError) {
      return res.status(422).json({
        error: `Could not generate dashboard: ${parsed.inputError}`,
      })
    }

    parsed.generatedAt = new Date().toISOString();
    return res.status(200).json(parsed);
```

---

## Change 4: Add a Maximum Input Length Guard

**Category:** Input resilience
**Files:** `src/components/InputSection.jsx`, `src/components/InputSection.css`

### Description
Add a 50,000-character hard limit and a 40,000-character soft warning in `InputSection`. Update the character count display to show remaining characters, turning amber then red as the user approaches and exceeds the limit. Disable the submit button when over the limit.

### Justification
No upper bound currently exists. An accidental paste of a large document fires an expensive, slow API call with unpredictable output quality. 50,000 characters (~35,000 words) covers any realistic portfolio status report.

---

### `src/components/InputSection.jsx`

**Before:**
```jsx
  const charCount = text.length
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  const showBriefWarning = wordCount > 0 && wordCount < 100
```

**After:**
```jsx
  const MAX_CHARS = 50000
  const WARN_CHARS = 40000
  const charCount = text.length
  const isOverLimit = charCount > MAX_CHARS
  const isNearLimit = charCount >= WARN_CHARS && !isOverLimit
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  const showBriefWarning = wordCount > 0 && wordCount < 100
```

**Before:**
```jsx
          <div className="input-section__meta" id="char-count">
            <span className="text-xs text-muted">
              {charCount > 0 ? `${charCount.toLocaleString()} characters` : 'No input yet'}
            </span>
            <span className="text-xs text-muted">
              Supports plain text, Markdown, or any structured format
            </span>
          </div>
```

**After:**
```jsx
          <div className="input-section__meta" id="char-count">
            <span className={`text-xs ${isOverLimit ? 'char-count--error' : isNearLimit ? 'char-count--warn' : 'text-muted'}`}>
              {charCount > 0
                ? `${charCount.toLocaleString()} / ${MAX_CHARS.toLocaleString()} characters`
                : 'No input yet'}
              {isOverLimit && ' — exceeds limit'}
              {isNearLimit && ' — approaching limit'}
            </span>
            <span className="text-xs text-muted">
              Supports plain text, Markdown, or any structured format
            </span>
          </div>

          {isOverLimit && (
            <div className="input-section__limit-error" role="alert">
              Input exceeds the 50,000 character limit. Please trim your notes before submitting.
            </div>
          )}
```

**Before:**
```jsx
            disabled={submitting || !text.trim()}
```

**After:**
```jsx
            disabled={submitting || !text.trim() || isOverLimit}
```

---

### `src/components/InputSection.css` — add limit warning styles

**After (append to file):**
```css
.char-count--warn  { color: var(--amber); font-weight: 500; }
.char-count--error { color: var(--red);   font-weight: 600; }

.input-section__limit-error {
  font-size: 0.8125rem;
  color: var(--red-text);
  background: var(--red-bg);
  border: 1px solid var(--red-border);
  border-radius: var(--radius);
  padding: 0.625rem 0.875rem;
  margin-top: 0.25rem;
}
```

---

## Change 5: RAG Trend Tracking via localStorage (max 4 snapshots)

**Category:** Feature
**Files:** `src/utils/history.js` *(new)*, `src/App.jsx`, `src/components/Dashboard.jsx`, `src/components/ProjectCard.jsx`, `src/components/ProjectCard.css`

### Description
After every successful analysis, save a lightweight snapshot `{ generatedAt, projects: [{ name, ragStatus }] }` to localStorage (max 4 entries, newest first — covering ~1 month at weekly cadence). Before saving, compare the current analysis against the most recent prior snapshot and compute a trend for each project: `improved`, `worsened`, `unchanged`, or `new`. Pass the trend data to `ProjectCard` to display a small indicator next to the RAG badge. Projects are matched by normalized name (lowercase, trimmed) rather than Claude-generated IDs for robustness across runs.

### Justification
The single highest-value functional addition for a PM audience. Executives reading a weekly briefing need to know not just current status but direction of travel — whether a project that's amber got worse or is recovering. Requires no backend infrastructure.

---

### `src/utils/history.js` *(new file — full content)*

```js
const STORAGE_KEY = 'pm-dashboard-history'
const MAX_SNAPSHOTS = 4

const RAG_RANK = { green: 0, amber: 1, red: 2 }

export function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export function saveSnapshot(dashboardData) {
  const snapshot = {
    generatedAt: dashboardData.generatedAt,
    projects: (dashboardData.projects || []).map(p => ({
      name: p.name,
      ragStatus: p.ragStatus,
    })),
  }
  const history = loadHistory()
  const updated = [snapshot, ...history].slice(0, MAX_SNAPSHOTS)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch {
    // localStorage quota exceeded — fail silently
  }
}

function normalizeName(name) {
  return (name || '').toLowerCase().trim()
}

export function computeTrends(currentProjects, previousSnapshot) {
  if (!previousSnapshot) return {}
  const prevMap = {}
  for (const p of previousSnapshot.projects) {
    prevMap[normalizeName(p.name)] = p.ragStatus
  }
  const trends = {}
  for (const p of currentProjects) {
    const key = normalizeName(p.name)
    const prev = prevMap[key]
    if (!prev) {
      trends[key] = { trend: 'new', previousRagStatus: null }
    } else if (RAG_RANK[p.ragStatus] < RAG_RANK[prev]) {
      trends[key] = { trend: 'improved', previousRagStatus: prev }
    } else if (RAG_RANK[p.ragStatus] > RAG_RANK[prev]) {
      trends[key] = { trend: 'worsened', previousRagStatus: prev }
    } else {
      trends[key] = { trend: 'unchanged', previousRagStatus: prev }
    }
  }
  return trends
}
```

---

### `src/App.jsx` — import history utils, compute trends, save snapshot on success

**Before:**
```jsx
import { useState } from 'react'
import InputSection from './components/InputSection'
import LoadingIndicator from './components/LoadingIndicator'
import Dashboard from './components/Dashboard'
import './App.css'
```

**After:**
```jsx
import { useState } from 'react'
import InputSection from './components/InputSection'
import LoadingIndicator from './components/LoadingIndicator'
import Dashboard from './components/Dashboard'
import { loadHistory, saveSnapshot, computeTrends } from './utils/history'
import './App.css'
```

**Before:**
```jsx
export default function App() {
  const [view, setView] = useState(VIEW.INPUT)
  const [dashboardData, setDashboardData] = useState(null)
  const [error, setError] = useState(null)
  const [inputText, setInputText] = useState('')
```

**After:**
```jsx
export default function App() {
  const [view, setView] = useState(VIEW.INPUT)
  const [dashboardData, setDashboardData] = useState(null)
  const [trends, setTrends] = useState({})
  const [error, setError] = useState(null)
  const [inputText, setInputText] = useState('')
```

**Before:**
```jsx
    setDashboardData(data)
    setView(VIEW.DASHBOARD)
```

**After:**
```jsx
    const history = loadHistory()
    const previousSnapshot = history[0] ?? null
    const projectTrends = computeTrends(data.projects || [], previousSnapshot)
    saveSnapshot(data)
    setTrends(projectTrends)
    setDashboardData(data)
    setView(VIEW.DASHBOARD)
```

**Before:**
```jsx
          {view === VIEW.DASHBOARD && dashboardData && (
            <Dashboard data={dashboardData} onReset={handleReset} />
          )}
```

**After:**
```jsx
          {view === VIEW.DASHBOARD && dashboardData && (
            <Dashboard data={dashboardData} trends={trends} onReset={handleReset} />
          )}
```

**Before (handleReset):**
```jsx
  function handleReset() {
    setDashboardData(null)
    setError(null)
    setView(VIEW.INPUT)
  }
```

**After:**
```jsx
  function handleReset() {
    setDashboardData(null)
    setTrends({})
    setError(null)
    setView(VIEW.INPUT)
  }
```

---

### `src/components/Dashboard.jsx` — accept and pass trends to project cards

**Before:**
```jsx
export default function Dashboard({ data, onReset }) {
```

**After:**
```jsx
export default function Dashboard({ data, trends = {}, onReset }) {
```

**Before:**
```jsx
            {projects.map(project => (
              <ProjectCard key={project.id || project.name} project={project} />
            ))}
```

**After:**
```jsx
            {projects.map(project => {
              const trendKey = (project.name || '').toLowerCase().trim()
              const trendInfo = trends[trendKey] || { trend: null, previousRagStatus: null }
              return (
                <ProjectCard
                  key={project.id || project.name}
                  project={project}
                  trend={trendInfo.trend}
                  previousRagStatus={trendInfo.previousRagStatus}
                />
              )
            })}
```

---

### `src/components/ProjectCard.jsx` — add trend indicator

**Before:**
```jsx
export default function ProjectCard({ project }) {
  const {
    name,
    ragStatus,
    statusSummary,
    teams = [],
    accomplishments = [],
    immediateNextSteps = [],
    longTermNextSteps = [],
  } = project
```

**After:**
```jsx
const TREND_CONFIG = {
  improved: { symbol: '↑', label: 'Improved',      className: 'trend--improved' },
  worsened: { symbol: '↓', label: 'Worsened',      className: 'trend--worsened' },
  unchanged:{ symbol: '→', label: 'Unchanged',     className: 'trend--unchanged' },
  new:      { symbol: 'NEW', label: 'New this week', className: 'trend--new' },
}

export default function ProjectCard({ project, trend, previousRagStatus }) {
  const {
    name,
    ragStatus,
    statusSummary,
    teams = [],
    accomplishments = [],
    immediateNextSteps = [],
    longTermNextSteps = [],
  } = project

  const trendConfig = trend ? TREND_CONFIG[trend] : null
```

**Before:**
```jsx
        <div className="project-card__header-top">
          <h3 className="project-card__name">{name}</h3>
          <RagBadge status={ragStatus} />
        </div>
```

**After:**
```jsx
        <div className="project-card__header-top">
          <h3 className="project-card__name">{name}</h3>
          <div className="project-card__status-group">
            {trendConfig && (
              <span
                className={`trend-indicator ${trendConfig.className}`}
                title={`${trendConfig.label}${previousRagStatus ? ` from ${previousRagStatus}` : ''}`}
              >
                {trendConfig.symbol}
              </span>
            )}
            <RagBadge status={ragStatus} />
          </div>
        </div>
```

---

### `src/components/ProjectCard.css` — add trend indicator styles

**After (append to file):**
```css
.project-card__status-group {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  flex-shrink: 0;
}

.trend-indicator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.4rem;
  border-radius: var(--radius-sm);
  line-height: 1;
  cursor: default;
}

.trend--improved  { background: var(--green-bg);   color: var(--green);   border: 1px solid var(--green-border); }
.trend--worsened  { background: var(--red-bg);     color: var(--red);     border: 1px solid var(--red-border); }
.trend--unchanged { background: var(--gray-100);   color: var(--gray-500); border: 1px solid var(--gray-200); }
.trend--new       { background: var(--blue-light); color: #1e40af;        border: 1px solid #bfdbfe; }
```

---

## Change 6: Specific Error Messages for API Key Issues

**Category:** Resilience
**Files:** `api/analyze.js`

### Description
Detect specific Anthropic SDK error types before the generic catch handler and return targeted, actionable messages for authentication errors, rate limit errors, and connection errors.

### Justification
"AI service error: 401 {error...}" is not actionable for any user. Specific error types tell the user exactly what's wrong and what to do.

---

### `api/analyze.js`

**Before:**
```js
  } catch (err) {
    console.error('Anthropic API error:', err);
    const message = err?.message || 'An unexpected error occurred.';
    return res.status(502).json({ error: `AI service error: ${message}` });
  }
```

**After:**
```js
  } catch (err) {
    console.error('Anthropic API error:', err);

    if (err instanceof Anthropic.AuthenticationError) {
      return res.status(401).json({
        error: 'API key is invalid or has been revoked. Check the ANTHROPIC_API_KEY environment variable.',
      });
    }
    if (err instanceof Anthropic.RateLimitError) {
      return res.status(429).json({
        error: 'API rate limit reached. Please wait a moment and try again.',
      });
    }
    if (err instanceof Anthropic.APIConnectionError) {
      return res.status(503).json({
        error: 'Could not connect to the AI service. Please check your connection and try again.',
      });
    }

    const message = err?.message || 'An unexpected error occurred.';
    return res.status(502).json({ error: `AI service error: ${message}` });
  }
```

---

## Change 7: Add `suggestedOwner` to Decisions and Next Steps

**Category:** Schema + UI
**Files:** `api/analyze.js`, `src/components/DecisionsSection.jsx`, `src/components/ProjectCard.jsx`, `src/App.css`

### Description
Extend the Claude prompt schema to add a `suggestedOwner` field to `executiveDecisions`, and change `immediateNextSteps`/`longTermNextSteps` from plain string arrays to object arrays with `action` and `suggestedOwner` fields. Update `DecisionsSection` to render an Owner column. Update `ProjectCard`'s `SubSection` to render the owner inline, with a string fallback for robustness.

### Justification
Unowned decisions and action items have zero accountability. Claude can infer the likely owner from surrounding context reliably. Turns the dashboard from a read-only summary into a lightweight action-tracking artifact.

---

### `api/analyze.js` — update schema in system prompt

**Before (executiveDecisions schema):**
```js
  "executiveDecisions": [
    {
      "id": "<kebab-case-slug>",
      "description": "<decision needed from leadership>",
      "affectedProjects": ["<project name>"],
      "urgency": "high" | "medium" | "low",
      "context": "<additional context to inform the decision>"
    }
  ],
```

**After:**
```js
  "executiveDecisions": [
    {
      "id": "<kebab-case-slug>",
      "description": "<decision needed from leadership>",
      "affectedProjects": ["<project name>"],
      "urgency": "high" | "medium" | "low",
      "context": "<additional context to inform the decision>",
      "suggestedOwner": "<team or role best positioned to drive or make this decision>"
    }
  ],
```

**Before (next steps in projects schema):**
```js
      "immediateNextSteps": ["<action item due within ~2 weeks>"],
      "longTermNextSteps": ["<action item or milestone beyond ~2 weeks>"]
```

**After:**
```js
      "immediateNextSteps": [{ "action": "<action item due within ~2 weeks>", "suggestedOwner": "<team or role>" }],
      "longTermNextSteps":  [{ "action": "<action item or milestone beyond ~2 weeks>", "suggestedOwner": "<team or role>" }]
```

---

### `src/components/DecisionsSection.jsx` — add Owner column

**Before:**
```jsx
              <tr>
                <th>Decision Needed</th>
                <th>Affected Projects</th>
                <th>Urgency</th>
                <th>Context</th>
              </tr>
```

**After:**
```jsx
              <tr>
                <th>Decision Needed</th>
                <th>Affected Projects</th>
                <th>Urgency</th>
                <th>Owner</th>
                <th>Context</th>
              </tr>
```

**Before:**
```jsx
                <tr key={dec.id}>
                  <td className="data-table__primary">{dec.description}</td>
                  <td>
                    <div className="tag-group">
                      {(dec.affectedProjects || []).map((p, i) => (
                        <span key={i} className="project-tag">{p}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className={`pill pill--${dec.urgency}`}>
                      {dec.urgency}
                    </span>
                  </td>
                  <td className="data-table__note">
                    {dec.context || <span className="text-muted">—</span>}
                  </td>
                </tr>
```

**After:**
```jsx
                <tr key={dec.id}>
                  <td className="data-table__primary">{dec.description}</td>
                  <td>
                    <div className="tag-group">
                      {(dec.affectedProjects || []).map((p, i) => (
                        <span key={i} className="project-tag">{p}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className={`pill pill--${dec.urgency}`}>
                      {dec.urgency}
                    </span>
                  </td>
                  <td>
                    {dec.suggestedOwner
                      ? <span className="team-chip">{dec.suggestedOwner}</span>
                      : <span className="text-muted">—</span>}
                  </td>
                  <td className="data-table__note">
                    {dec.context || <span className="text-muted">—</span>}
                  </td>
                </tr>
```

---

### `src/components/ProjectCard.jsx` — update `SubSection` to handle object items

**Before:**
```jsx
function SubSection({ title, items, emptyText }) {
  if (!items || items.length === 0) return null
  return (
    <div className="project-card__sub">
      <p className="project-card__sub-title">{title}</p>
      <ul className="bullet-list">
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  )
}
```

**After:**
```jsx
function SubSection({ title, items }) {
  if (!items || items.length === 0) return null
  return (
    <div className="project-card__sub">
      <p className="project-card__sub-title">{title}</p>
      <ul className="bullet-list">
        {items.map((item, i) => {
          const action = typeof item === 'string' ? item : item.action
          const owner  = typeof item === 'object' ? item.suggestedOwner : null
          return (
            <li key={i}>
              <span>{action}</span>
              {owner && <span className="next-step-owner">{owner}</span>}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
```

---

### `src/App.css` — add next-step owner chip style

**After (append to file):**
```css
.next-step-owner {
  display: inline-flex;
  align-items: center;
  margin-left: 0.5rem;
  padding: 0.1rem 0.45rem;
  background: var(--gray-100);
  color: var(--gray-500);
  border: 1px solid var(--gray-200);
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 500;
  white-space: nowrap;
}
```

---

## Change 8: Markdown Export

**Category:** Feature
**Files:** `src/utils/exportMarkdown.js` *(new)*, `src/components/Dashboard.jsx`, `src/components/Dashboard.css`

### Description
Add an "Export as Markdown" button to the dashboard summary bar. On click, generate a formatted `.md` document from the dashboard data and trigger a browser file download. No server call or additional dependencies required — pure client-side JS string generation.

### Justification
Executives receiving this briefing will immediately want to paste it into Confluence, a Slack update, a board deck, or an email. Without export, the output is trapped in the browser tab. One button, zero infrastructure.

---

### `src/utils/exportMarkdown.js` *(new file — full content)*

```js
const RAG_EMOJI = { green: '🟢', amber: '🟡', red: '🔴' }
const RAG_LABEL = { green: 'On Track', amber: 'At Risk', red: 'Off Track' }

function formatDate(iso) {
  if (!iso) return ''
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long', day: 'numeric', year: 'numeric',
      hour: 'numeric', minute: '2-digit', timeZoneName: 'short',
    }).format(new Date(iso))
  } catch { return iso }
}

function stepText(item) {
  if (typeof item === 'string') return item
  const owner = item.suggestedOwner ? ` *(${item.suggestedOwner})*` : ''
  return `${item.action}${owner}`
}

export function generateMarkdown(data) {
  const {
    projects = [],
    keyRisks = [],
    executiveDecisions = [],
    keyDependencies = [],
    generatedAt,
  } = data

  const green = projects.filter(p => p.ragStatus === 'green').length
  const amber = projects.filter(p => p.ragStatus === 'amber').length
  const red   = projects.filter(p => p.ragStatus === 'red').length

  const lines = []

  lines.push(`# Executive Project Dashboard`)
  lines.push(`*Generated: ${formatDate(generatedAt)}*`)
  lines.push('')
  lines.push(`## Portfolio Overview`)
  lines.push(`**${projects.length} Projects** — 🟢 ${green} On Track · 🟡 ${amber} At Risk · 🔴 ${red} Off Track`)
  lines.push('')

  if (projects.length > 0) {
    lines.push(`## Projects`)
    lines.push('')
    for (const p of projects) {
      lines.push(`### ${RAG_EMOJI[p.ragStatus] ?? ''} ${p.name} — ${RAG_LABEL[p.ragStatus] ?? p.ragStatus}`)
      if (p.teams?.length)   lines.push(`**Teams:** ${p.teams.join(', ')}`)
      if (p.statusSummary)   lines.push(`**Status:** ${p.statusSummary}`)
      lines.push('')
      if (p.accomplishments?.length) {
        lines.push(`#### Key Accomplishments`)
        p.accomplishments.forEach(a => lines.push(`- ${a}`))
        lines.push('')
      }
      if (p.immediateNextSteps?.length) {
        lines.push(`#### Immediate Next Steps`)
        p.immediateNextSteps.forEach(s => lines.push(`- ${stepText(s)}`))
        lines.push('')
      }
      if (p.longTermNextSteps?.length) {
        lines.push(`#### Long-Term Next Steps`)
        p.longTermNextSteps.forEach(s => lines.push(`- ${stepText(s)}`))
        lines.push('')
      }
      lines.push('---')
      lines.push('')
    }
  }

  if (executiveDecisions.length > 0) {
    lines.push(`## Executive Decisions Required`)
    lines.push('')
    lines.push(`| Decision | Projects | Urgency | Owner |`)
    lines.push(`|----------|----------|---------|-------|`)
    for (const d of executiveDecisions) {
      const projects = (d.affectedProjects || []).join(', ')
      const owner    = d.suggestedOwner || '—'
      lines.push(`| ${d.description} | ${projects} | ${d.urgency} | ${owner} |`)
    }
    lines.push('')
  }

  if (keyRisks.length > 0) {
    lines.push(`## Key Risks`)
    lines.push('')
    lines.push(`| Risk | Projects | Severity | Mitigation |`)
    lines.push(`|------|----------|----------|------------|`)
    for (const r of keyRisks) {
      const projects   = (r.affectedProjects || []).join(', ')
      const mitigation = r.mitigation || '—'
      lines.push(`| ${r.description} | ${projects} | ${r.severity} | ${mitigation} |`)
    }
    lines.push('')
  }

  if (keyDependencies.length > 0) {
    lines.push(`## Key Dependencies`)
    lines.push('')
    lines.push(`| Dependency | Provider | Dependent | Status |`)
    lines.push(`|------------|----------|-----------|--------|`)
    for (const d of keyDependencies) {
      lines.push(`| ${d.description} | ${d.from} | ${d.to} | ${d.status} |`)
    }
    lines.push('')
  }

  return lines.join('\n')
}

export function downloadMarkdown(data) {
  const md     = generateMarkdown(data)
  const blob   = new Blob([md], { type: 'text/markdown;charset=utf-8' })
  const url    = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  const date   = new Date().toISOString().split('T')[0]
  anchor.href     = url
  anchor.download = `executive-dashboard-${date}.md`
  anchor.click()
  URL.revokeObjectURL(url)
}
```

---

### `src/components/Dashboard.jsx` — import export util and add button

**Before:**
```jsx
import ProjectCard from './ProjectCard'
import RisksSection from './RisksSection'
import DecisionsSection from './DecisionsSection'
import DependenciesSection from './DependenciesSection'
import '../App.css'
import './Dashboard.css'
```

**After:**
```jsx
import ProjectCard from './ProjectCard'
import RisksSection from './RisksSection'
import DecisionsSection from './DecisionsSection'
import DependenciesSection from './DependenciesSection'
import { downloadMarkdown } from '../utils/exportMarkdown'
import '../App.css'
import './Dashboard.css'
```

**Before (summary bar):**
```jsx
        <div className="dashboard__summary-left">
          ...
        </div>
        <div className="dashboard__stats">
          ...
        </div>
```

**After:**
```jsx
        <div className="dashboard__summary-left">
          ...
        </div>
        <div className="dashboard__summary-right">
          <button
            className="btn btn--ghost btn--export"
            onClick={() => downloadMarkdown(data)}
            title="Download dashboard as Markdown"
          >
            <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Export .md
          </button>
          <div className="dashboard__stats">
            ...
          </div>
        </div>
```

---

### `src/components/Dashboard.css` — add summary-right layout and export button

**Before:**
```css
.dashboard__stats {
  display: flex;
  gap: 0.625rem;
  flex-wrap: wrap;
}
```

**After:**
```css
.dashboard__summary-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.625rem;
}

.dashboard__stats {
  display: flex;
  gap: 0.625rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.btn--export {
  font-size: 0.8125rem;
  padding: 0.45rem 0.875rem;
  gap: 0.375rem;
}
```

**Before (responsive block):**
```css
@media (max-width: 640px) {
  .dashboard__summary-bar {
    flex-direction: column;
    align-items: flex-start;
  }
  ...
  .dashboard__stats {
    width: 100%;
    justify-content: flex-start;
  }
```

**After:**
```css
@media (max-width: 640px) {
  .dashboard__summary-bar {
    flex-direction: column;
    align-items: flex-start;
  }
  .dashboard__summary-right {
    width: 100%;
    align-items: flex-start;
  }
  .dashboard__stats {
    width: 100%;
    justify-content: flex-start;
  }
```

---

## Change 9: Filter Projects by RAG Status

**Category:** Usability
**Files:** `src/components/Dashboard.jsx`, `src/components/Dashboard.css`

### Description
Add a filter bar above the projects grid with toggle buttons for All / Off Track / At Risk / On Track. Filters maintain local component state and default to All. Each button shows the count for that status.

### Justification
For a 10-project portfolio in a live meeting, a CTO who wants to see only red projects shouldn't scroll past eight green cards. Particularly powerful in combination with the trend tracking feature.

---

### `src/components/Dashboard.jsx`

**Before:**
```jsx
export default function Dashboard({ data, trends = {}, onReset }) {
  const {
    projects = [],
    ...
  } = data

  const greenCount = projects.filter(p => p.ragStatus === 'green').length
  const amberCount = projects.filter(p => p.ragStatus === 'amber').length
  const redCount   = projects.filter(p => p.ragStatus === 'red').length
```

**After:**
```jsx
export default function Dashboard({ data, trends = {}, onReset }) {
  const [ragFilter, setRagFilter] = useState('all')

  const {
    projects = [],
    ...
  } = data

  const greenCount = projects.filter(p => p.ragStatus === 'green').length
  const amberCount = projects.filter(p => p.ragStatus === 'amber').length
  const redCount   = projects.filter(p => p.ragStatus === 'red').length

  const filteredProjects = ragFilter === 'all'
    ? projects
    : projects.filter(p => p.ragStatus === ragFilter)
```

Add `useState` to the import at the top of the file:
```jsx
import { useState } from 'react'
```

**Before (projects section):**
```jsx
        <section className="dashboard__section" aria-labelledby="projects-heading">
          <h2 className="section-heading" id="projects-heading">
            ...
          </h2>
          <div className="dashboard__projects-grid">
            {projects.map(project => {
```

**After:**
```jsx
        <section className="dashboard__section" aria-labelledby="projects-heading">
          <div className="dashboard__projects-header">
            <h2 className="section-heading" id="projects-heading">
              ...
            </h2>
            <div className="dashboard__filters" role="group" aria-label="Filter projects by status">
              {[
                { key: 'all',   label: 'All',       count: projects.length },
                { key: 'red',   label: 'Off Track',  count: redCount },
                { key: 'amber', label: 'At Risk',    count: amberCount },
                { key: 'green', label: 'On Track',   count: greenCount },
              ].map(({ key, label, count }) => (
                <button
                  key={key}
                  className={`filter-btn filter-btn--${key} ${ragFilter === key ? 'filter-btn--active' : ''}`}
                  onClick={() => setRagFilter(key)}
                  aria-pressed={ragFilter === key}
                >
                  {label} <span className="filter-btn__count">{count}</span>
                </button>
              ))}
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <p className="empty-state" style={{ padding: '2rem 0' }}>
              No projects match the selected filter.
            </p>
          ) : (
          <div className="dashboard__projects-grid">
            {filteredProjects.map(project => {
              ...
            })}
          </div>
          )}
        </section>
```

---

### `src/components/Dashboard.css` — filter bar styles

**After (append to file):**
```css
.dashboard__projects-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}

.dashboard__projects-header .section-heading {
  margin-bottom: 0;
}

.dashboard__filters {
  display: flex;
  gap: 0.375rem;
  flex-wrap: wrap;
}

.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.35rem 0.75rem;
  font-family: var(--font);
  font-size: 0.8125rem;
  font-weight: 500;
  border-radius: 999px;
  border: 1.5px solid var(--gray-200);
  background: var(--white);
  color: var(--gray-600);
  cursor: pointer;
  transition: all 0.15s ease;
}

.filter-btn:hover { background: var(--gray-100); border-color: var(--gray-300); }

.filter-btn__count {
  font-size: 0.7rem;
  font-weight: 700;
  background: var(--gray-100);
  border-radius: 999px;
  padding: 0.1rem 0.4rem;
}

.filter-btn--all.filter-btn--active   { background: var(--navy);      color: white;               border-color: var(--navy); }
.filter-btn--red.filter-btn--active   { background: var(--red-bg);    color: var(--red-text);     border-color: var(--red-border); }
.filter-btn--amber.filter-btn--active { background: var(--amber-bg);  color: var(--amber-text);   border-color: var(--amber-border); }
.filter-btn--green.filter-btn--active { background: var(--green-bg);  color: var(--green-text);   border-color: var(--green-border); }
```

---

## Change 10: Sort Decisions Table by Urgency

**Category:** UI
**Files:** `src/components/DecisionsSection.jsx`, `src/components/TableSection.css`

### Description
Sort the `decisions` array before rendering: high → medium → low. Add a subtle visual separator row between urgency tiers when multiple tiers are present.

### Justification
Decisions currently render in Claude's return order, which is unpredictable. A high-urgency decision must never appear below a low-urgency one in an executive briefing.

---

### `src/components/DecisionsSection.jsx`

**Before:**
```jsx
export default function DecisionsSection({ decisions = [] }) {
  return (
```

**After:**
```jsx
const URGENCY_ORDER = { high: 0, medium: 1, low: 2 }

export default function DecisionsSection({ decisions = [] }) {
  const sorted = [...decisions].sort(
    (a, b) => (URGENCY_ORDER[a.urgency] ?? 3) - (URGENCY_ORDER[b.urgency] ?? 3)
  )

  return (
```

**Before:**
```jsx
            <tbody>
              {decisions.map((dec) => (
                <tr key={dec.id}>
                  ...
                </tr>
              ))}
            </tbody>
```

**After:**
```jsx
            <tbody>
              {sorted.map((dec, i) => {
                const prevUrgency = sorted[i - 1]?.urgency
                const showDivider = i > 0 && dec.urgency !== prevUrgency
                return (
                  <>
                    {showDivider && (
                      <tr key={`divider-${i}`} className="data-table__divider">
                        <td colSpan={5}>
                          <span>{dec.urgency.charAt(0).toUpperCase() + dec.urgency.slice(1)} Priority</span>
                        </td>
                      </tr>
                    )}
                    <tr key={dec.id}>
                      ...
                    </tr>
                  </>
                )
              })}
            </tbody>
```

---

### `src/components/TableSection.css` — divider row style

**After (append to file):**
```css
.data-table__divider td {
  padding: 0.35rem 1rem;
  background: var(--gray-50);
  border-bottom: 1px solid var(--gray-200);
}

.data-table__divider span {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--gray-400);
}
```

---

## Change 11: Restrict CORS to Known Origin in Production

**Category:** Security
**Files:** `api/analyze.js`

### Description
Replace the wildcard `Access-Control-Allow-Origin: *` with an env-var-driven origin check. In development (no `ALLOWED_ORIGIN` set), the wildcard is kept. In production, only the configured origin is allowed. Add `ALLOWED_ORIGIN=https://your-app.vercel.app` to Vercel's Production and Preview environment variable settings.

### Justification
The wildcard means any website can call `/api/analyze` and run up API costs against your Anthropic key. One env var and four lines of code close this. Particularly relevant given the audience includes senior security managers.

---

### `api/analyze.js`

**Before:**
```js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
```

**After:**
```js
export default async function handler(req, res) {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');
```

> **Deployment step:** Add `ALLOWED_ORIGIN=https://your-project.vercel.app` to Vercel's Production and Preview environment variables (not Development, where `*` is intentionally kept for local tooling).

---

## Change 12: Remove Development-Only Language from Production Error Messages

**Category:** Polish
**Files:** `src/App.jsx`

### Description
Use Vite's `import.meta.env.DEV` to conditionally append the "Make sure vercel dev is running" hint only in development builds. In production, the error message is clean and user-facing.

### Justification
"Make sure vercel dev is running" is meaningless and confusing to any non-technical user in a production environment.

---

### `src/App.jsx`

**Before:**
```jsx
      setError(`Network error — could not reach the analysis service. (${err.message})`)
```

**After:**
```jsx
      const devHint = import.meta.env.DEV ? ' Make sure vercel dev is running.' : ''
      setError(`Network error — could not reach the analysis service.${devHint} (${err.message})`)
```

---

## Change 13: Detect and Handle Conflicting Project Status in the Prompt

**Category:** Prompt quality
**Files:** `api/analyze.js`

### Description
Add a rule to the Claude system prompt instructing it to synthesize a single entry when the same project appears multiple times with conflicting status signals, to use the more cautious RAG assessment, and to note the conflict in `statusSummary`.

### Justification
Real PM notes are assembled from multiple sources — Jira, Slack, meeting notes — and conflicts are common. Without this instruction, Claude's behavior on conflicting input is undefined and may produce duplicate entries or silently discard information. The cautious-assessment default (prefer worse RAG) is right for an executive audience — better to over-flag than under-flag.

---

### `api/analyze.js` — add rule to SYSTEM_PROMPT

**Before (end of rules section):**
```js
- If a section has no data, return an empty array
- Be thorough — executives rely on completeness
- If the input does not appear to contain project status information...
```

**After (insert before the inputError rule):**
```js
- If a section has no data, return an empty array
- Be thorough — executives rely on completeness
- If the same project appears multiple times with conflicting status information, synthesize a single entry using the most specific and detailed information available. When RAG status conflicts, use the more cautious assessment (red over amber, amber over green). Briefly note the conflict in the statusSummary field (e.g., "Status signals are mixed — notes show both on-track and at-risk indicators; erring cautious.")
- If the input does not appear to contain project status information...
```

---

*End of code review notes.*
