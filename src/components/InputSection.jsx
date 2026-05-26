import { useState } from 'react'
import '../App.css'
import './InputSection.css'

const PLACEHOLDER = `Paste your project status notes here. Include any combination of:

• Project names and current status
• Team assignments
• Recent accomplishments and milestones
• Risks and blockers
• Decisions needed from leadership
• Dependencies between projects or teams
• Upcoming action items and next steps

Example:
---
Project: Customer Portal Relaunch
Status: On track for Q3 launch. Engineering has completed 80% of backend API work.
Teams: Web Engineering, Product Design, QA
Accomplishments: Authentication service deployed to staging; performance benchmarks met.
Risks: Design handoff for checkout flow is 1 week late — could compress QA window.
Dependencies: Requires sign-off from Security team on OAuth implementation.
Next steps (immediate): Complete checkout flow design review by June 2.
Next steps (long-term): Load testing and penetration test before August launch.
---`

export default function InputSection({ onSubmit, error, text, onTextChange }) {
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return
    setSubmitting(true)
    await onSubmit(text)
    setSubmitting(false)
  }

  const HARD_LIMIT = 50_000
  const SOFT_LIMIT = 40_000
  const charCount = text.length
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
  const tooShort = wordCount > 0 && wordCount < 100
  const nearLimit = charCount >= SOFT_LIMIT && charCount < HARD_LIMIT
  const overLimit = charCount >= HARD_LIMIT

  return (
    <div className="input-section">
      <div className="input-section__hero">
        <h2 className="input-section__heading">Generate Your Executive Dashboard</h2>
        <p className="input-section__description">
          Paste your project status updates, meeting notes, or status report text below.
          The AI will analyze the content and generate a structured executive briefing.
        </p>
      </div>

      {error && (
        <div className="error-banner" role="alert">
          <svg className="error-banner__icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <form className="input-section__form card" onSubmit={handleSubmit}>
        <div className="input-section__field">
          <label className="input-section__label" htmlFor="project-data">
            Project Status Data
          </label>
          <textarea
            id="project-data"
            className="input-section__textarea"
            value={text}
            onChange={e => onTextChange(e.target.value)}
            placeholder={PLACEHOLDER}
            rows={18}
            disabled={submitting}
            aria-describedby="char-count"
          />
          <div className="input-section__meta" id="char-count">
            <span className={`text-xs ${overLimit ? 'input-section__char-count--over' : nearLimit ? 'input-section__char-count--near' : 'text-muted'}`}>
              {charCount > 0 ? `${charCount.toLocaleString()} / ${HARD_LIMIT.toLocaleString()} characters · ${wordCount.toLocaleString()} words` : 'No input yet'}
            </span>
            <span className="text-xs text-muted">
              Supports plain text, Markdown, or any structured format
            </span>
          </div>
          {tooShort && !overLimit && (
            <p className="input-section__warning" role="alert">
              Input seems short ({wordCount} words). For a useful dashboard, include project names, status, teams, risks, and next steps — at least a few sentences per project.
            </p>
          )}
          {nearLimit && (
            <p className="input-section__warning" role="alert">
              Approaching the 50,000-character limit ({charCount.toLocaleString()} characters). Consider trimming older or less relevant content.
            </p>
          )}
          {overLimit && (
            <p className="input-section__warning input-section__warning--error" role="alert">
              Input exceeds the 50,000-character limit ({charCount.toLocaleString()} characters). Please reduce the text before submitting.
            </p>
          )}
        </div>

        <div className="input-section__actions">
          <button
            type="submit"
            className="btn btn--primary btn--lg"
            disabled={submitting || !text.trim() || overLimit}
          >
            {submitting ? 'Analyzing…' : (
              <>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                Analyze &amp; Generate Dashboard
              </>
            )}
          </button>
        </div>
      </form>

      <div className="input-section__tips">
        <p className="input-section__tips-heading">Tips for best results</p>
        <ul className="input-section__tips-list">
          <li>Include explicit project names so each project is tracked separately</li>
          <li>Mention team names, blockers, and decisions needed for richer output</li>
          <li>Status keywords like "on track", "delayed", "blocked" help calibrate RAG status</li>
          <li>You can paste raw meeting notes — the AI will extract the structure</li>
        </ul>
      </div>
    </div>
  )
}
