import '../App.css'
import './TableSection.css'

const URGENCY_ORDER = { high: 0, medium: 1, low: 2 }
const URGENCY_LABEL = { high: 'High Urgency', medium: 'Medium Urgency', low: 'Low Urgency' }

export default function DecisionsSection({ decisions = [] }) {
  const sorted = [...decisions].sort(
    (a, b) => (URGENCY_ORDER[a.urgency] ?? 3) - (URGENCY_ORDER[b.urgency] ?? 3)
  )

  const rows = []
  let lastUrgency = null
  for (const dec of sorted) {
    if (dec.urgency !== lastUrgency) {
      rows.push({ type: 'divider', urgency: dec.urgency })
      lastUrgency = dec.urgency
    }
    rows.push({ type: 'row', dec })
  }

  return (
    <section className="table-section card table-section--decisions" aria-labelledby="decisions-heading">
      <div className="table-section__header">
        <div className="section-heading">
          <svg className="section-heading__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.745 3.745 0 013.296-1.043A3.745 3.745 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
          </svg>
          Executive Decisions Required
          <span className="table-section__count">{decisions.length}</span>
        </div>
        {decisions.length > 0 && (
          <p className="table-section__note">
            These items require leadership input or approval to unblock progress.
          </p>
        )}
      </div>

      {decisions.length === 0 ? (
        <div className="empty-state">No executive decisions pending.</div>
      ) : (
        <div className="table-section__scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Decision Needed</th>
                <th>Affected Projects</th>
                <th>Urgency</th>
                <th>Suggested Owner</th>
                <th>Context</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item, i) => {
                if (item.type === 'divider') {
                  return (
                    <tr key={`divider-${item.urgency}`} className="data-table__divider-row">
                      <td colSpan={5}>
                        <span className={`pill pill--${item.urgency}`}>
                          {URGENCY_LABEL[item.urgency]}
                        </span>
                      </td>
                    </tr>
                  )
                }
                const { dec } = item
                return (
                  <tr key={dec.id}>
                    <td className="data-table__primary">{dec.description}</td>
                    <td>
                      <div className="tag-group">
                        {(dec.affectedProjects || []).map((p, j) => (
                          <span key={j} className="project-tag">{p}</span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span className={`pill pill--${dec.urgency}`}>
                        {dec.urgency}
                      </span>
                    </td>
                    <td className="data-table__note">
                      {dec.suggestedOwner || <span className="text-muted">—</span>}
                    </td>
                    <td className="data-table__note">
                      {dec.context || <span className="text-muted">—</span>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
