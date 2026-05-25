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
