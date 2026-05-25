import '../App.css'
import './ProjectCard.css'

function RagBadge({ status }) {
  const label = { green: 'On Track', amber: 'At Risk', red: 'Off Track' }[status] ?? status
  return (
    <span className={`rag-badge rag-badge--${status}`}>
      <span className={`rag-dot rag-dot--${status}`} aria-hidden="true" />
      {label}
    </span>
  )
}

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

  return (
    <article className={`project-card card project-card--${ragStatus}`}>
      <div className="project-card__header">
        <div className="project-card__header-top">
          <h3 className="project-card__name">{name}</h3>
          <RagBadge status={ragStatus} />
        </div>
        {statusSummary && (
          <p className="project-card__summary">{statusSummary}</p>
        )}
        {teams.length > 0 && (
          <div className="project-card__teams" aria-label="Teams">
            {teams.map((t, i) => (
              <span key={i} className="team-chip">{t}</span>
            ))}
          </div>
        )}
      </div>

      <div className="project-card__body">
        <SubSection
          title="Key Accomplishments"
          items={accomplishments}
        />
        <SubSection
          title="Immediate Next Steps"
          items={immediateNextSteps}
        />
        <SubSection
          title="Long-Term Next Steps"
          items={longTermNextSteps}
        />
        {accomplishments.length === 0 && immediateNextSteps.length === 0 && longTermNextSteps.length === 0 && (
          <p className="empty-state" style={{ padding: '1rem 0' }}>No additional details reported.</p>
        )}
      </div>
    </article>
  )
}
