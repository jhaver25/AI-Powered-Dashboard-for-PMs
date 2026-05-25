import '../App.css'
import './TableSection.css'

export default function RisksSection({ risks = [] }) {
  return (
    <section className="table-section card" aria-labelledby="risks-heading">
      <div className="table-section__header">
        <div className="section-heading">
          <svg className="section-heading__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          Key Risks
          <span className="table-section__count">{risks.length}</span>
        </div>
      </div>

      {risks.length === 0 ? (
        <div className="empty-state">No risks reported across projects.</div>
      ) : (
        <div className="table-section__scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Risk</th>
                <th>Affected Projects</th>
                <th>Severity</th>
                <th>Mitigation</th>
              </tr>
            </thead>
            <tbody>
              {risks.map((risk) => (
                <tr key={risk.id}>
                  <td className="data-table__primary">{risk.description}</td>
                  <td>
                    <div className="tag-group">
                      {(risk.affectedProjects || []).map((p, i) => (
                        <span key={i} className="project-tag">{p}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className={`pill pill--${risk.severity}`}>
                      {risk.severity}
                    </span>
                  </td>
                  <td className="data-table__note">
                    {risk.mitigation || <span className="text-muted">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
