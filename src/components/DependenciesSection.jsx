import '../App.css'
import './TableSection.css'

const STATUS_LABEL = {
  'on-track': 'On Track',
  'at-risk': 'At Risk',
  'blocked': 'Blocked',
}

export default function DependenciesSection({ dependencies = [] }) {
  return (
    <section className="table-section card" aria-labelledby="deps-heading">
      <div className="table-section__header">
        <div className="section-heading">
          <svg className="section-heading__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
          </svg>
          Key Dependencies
          <span className="table-section__count">{dependencies.length}</span>
        </div>
      </div>

      {dependencies.length === 0 ? (
        <div className="empty-state">No cross-project dependencies reported.</div>
      ) : (
        <div className="table-section__scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Dependency</th>
                <th>Provider</th>
                <th>Dependent</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dependencies.map((dep) => (
                <tr key={dep.id}>
                  <td className="data-table__primary">{dep.description}</td>
                  <td>
                    <span className="project-tag">{dep.from}</span>
                  </td>
                  <td>
                    <span className="project-tag">{dep.to}</span>
                  </td>
                  <td>
                    <span className={`dep-status dep-status--${dep.status}`}>
                      {STATUS_LABEL[dep.status] ?? dep.status}
                    </span>
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
