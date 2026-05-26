const STORAGE_KEY = 'exec_dashboard_history'
const MAX_SNAPSHOTS = 4

export function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
  } catch {
    return []
  }
}

export function saveSnapshot(data) {
  const history = loadHistory()
  const snapshot = {
    generatedAt: data.generatedAt,
    projects: data.projects.map(p => ({ id: p.id, name: p.name, ragStatus: p.ragStatus })),
  }
  history.push(snapshot)
  if (history.length > MAX_SNAPSHOTS) history.splice(0, history.length - MAX_SNAPSHOTS)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  } catch {
    // localStorage unavailable or full — fail silently
  }
  return history
}

const RAG_RANK = { green: 2, amber: 1, red: 0 }

export function getTrends(history, currentProjects) {
  if (history.length < 2) return {}
  const previous = history[history.length - 2]
  const prevMap = {}
  for (const p of previous.projects) prevMap[p.id] = p.ragStatus

  const trends = {}
  for (const p of currentProjects) {
    const prev = prevMap[p.id]
    if (!prev || prev === p.ragStatus) {
      if (prev) trends[p.id] = 'same'
      continue
    }
    trends[p.id] = RAG_RANK[p.ragStatus] > RAG_RANK[prev] ? 'improved' : 'worsened'
  }
  return trends
}
