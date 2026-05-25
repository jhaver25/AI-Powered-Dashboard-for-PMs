import ProjectCard from './ProjectCard'
import RisksSection from './RisksSection'
import DecisionsSection from './DecisionsSection'
import DependenciesSection from './DependenciesSection'
import '../App.css'
import './Dashboard.css'

function formatTimestamp(iso) {
  if (!iso) return ''
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long', day: 'numeric', year: 'numeric',
      hour: 'numeric', minute: '2-digit', timeZoneName: 'short',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

function StatCard({ count, label, variant }) {
  return (
    <div className={`stat-card stat-card--${variant}`}>
      <span className="stat-card__number">{count}</span>
      <span className="stat-card__label">{label}</span>
    </div>
  )
}

export default function Dashboard({ data, onReset }) {
  const {
    projects = [],
    keyRisks = [],
    executiveDecisions = [],
    keyDependencies = [],
    generatedAt,
  } = data

  const greenCount  = projects.filter(p => p.ragStatus === 'green').length
  const amberCount  = projects.filter(p => p.ragStatus === 'amber').length
  const redCount    = projects.filter(p => p.ragStatus === 'red').length
  const highRisks   = keyRisks.filter(r => r.severity === 'high').length
  const highDecisions = executiveDecisions.filter(d => d.urgency === 'high').length

  return (
    <div className="dashboard">
      {/* ── Summary bar ── */}
      <div className="dashboard__summary-bar">
        <div className="dashboard__summary-left">
          <h2 className="dashboard__summary-title">
            Portfolio Status
            <span className="dashboard__project-count">{projects.length} projects</span>
          </h2>
          <p className="dashboard__generated">Generated {formatTimestamp(generatedAt)}</p>
        </div>
        <div className="dashboard__stats">
          <StatCard count={greenCount}  label="On Track"  variant="green" />
          <StatCard count={amberCount}  label="At Risk"   variant="amber" />
          <StatCard count={redCount}    label="Off Track" variant="red"   />
          {highRisks > 0 && (
            <StatCard count={highRisks} label="High Risks" variant="risk" />
          )}
          {highDecisions > 0 && (
            <StatCard count={highDecisions} label="Urgent Decisions" variant="decision" />
          )}
        </div>
      </div>

      {/* ── Executive decisions callout (if any) ── */}
      {executiveDecisions.some(d => d.urgency === 'high') && (
        <div className="dashboard__alert">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          <span>
            <strong>{highDecisions} high-urgency decision{highDecisions !== 1 ? 's' : ''}</strong>
            {' '}require{highDecisions === 1 ? 's' : ''} immediate executive action. See Executive Decisions below.
          </span>
        </div>
      )}

      {/* ── Projects grid ── */}
      {projects.length > 0 ? (
        <section className="dashboard__section" aria-labelledby="projects-heading">
          <h2 className="section-heading" id="projects-heading">
            <svg className="section-heading__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
            </svg>
            Projects
          </h2>
          <div className="dashboard__projects-grid">
            {projects.map(project => (
              <ProjectCard key={project.id || project.name} project={project} />
            ))}
          </div>
        </section>
      ) : (
        <div className="card empty-state" style={{ padding: '2.5rem' }}>
          No projects were extracted from the input. Please ensure your text includes project names.
        </div>
      )}

      {/* ── Tabular sections ── */}
      <div className="dashboard__section">
        <DecisionsSection decisions={executiveDecisions} />
      </div>

      <div className="dashboard__section">
        <RisksSection risks={keyRisks} />
      </div>

      <div className="dashboard__section">
        <DependenciesSection dependencies={keyDependencies} />
      </div>

      {/* ── Footer action ── */}
      <div className="dashboard__footer-action">
        <button className="btn btn--ghost" onClick={onReset}>
          <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
          </svg>
          Run New Analysis
        </button>
      </div>
    </div>
  )
}
