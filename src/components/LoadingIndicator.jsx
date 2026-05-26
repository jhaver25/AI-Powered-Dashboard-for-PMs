import { useState, useEffect } from 'react'
import './LoadingIndicator.css'

const STEPS = [
  'Parsing project status data…',
  'Identifying RAG status for each project…',
  'Extracting risks and dependencies…',
  'Identifying executive decisions needed…',
  'Compiling accomplishments and next steps…',
  'Structuring executive briefing…',
]

export default function LoadingIndicator() {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setElapsed(s => s + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const slow = elapsed >= 45

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
        <div className="loading__elapsed" aria-live="polite">
          <span className={slow ? 'loading__elapsed-time loading__elapsed-time--slow' : 'loading__elapsed-time'}>
            {elapsed}s elapsed
          </span>
          {slow && (
            <span className="loading__slow-note">
              Taking longer than usual — still working…
            </span>
          )}
        </div>
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
