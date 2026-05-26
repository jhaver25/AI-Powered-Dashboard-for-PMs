import { useState } from 'react'
import InputSection from './components/InputSection'
import LoadingIndicator from './components/LoadingIndicator'
import Dashboard from './components/Dashboard'
import { saveSnapshot, getTrends } from './utils/history'
import './App.css'

const VIEW = {
  INPUT: 'input',
  LOADING: 'loading',
  DASHBOARD: 'dashboard',
}

export default function App() {
  const [view, setView] = useState(VIEW.INPUT)
  const [inputText, setInputText] = useState('')
  const [dashboardData, setDashboardData] = useState(null)
  const [trends, setTrends] = useState({})
  const [error, setError] = useState(null)

  async function handleSubmit(projectData) {
    setError(null)
    setView(VIEW.LOADING)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 180_000)

    let res
    try {
      res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectData }),
        signal: controller.signal,
      })
    } catch (err) {
      clearTimeout(timeoutId)
      if (err.name === 'AbortError') {
        setError('The request timed out after 180 seconds. Please try again — the AI may be under high load.')
      } else {
        const devHint = import.meta.env.DEV ? ` Make sure vercel dev is running. (${err.message})` : ''
        setError(`Network error — could not reach the API.${devHint}`)
      }
      setView(VIEW.INPUT)
      return
    }
    clearTimeout(timeoutId)

    let data
    try {
      data = await res.json()
    } catch {
      const preview = await res.text().catch(() => '')
      const devHint = import.meta.env.DEV
        ? ` The /api/analyze route may not be running. Response preview: ${preview.slice(0, 120)}`
        : ''
      setError(`The server returned an unexpected response (HTTP ${res.status}).${devHint}`)
      setView(VIEW.INPUT)
      return
    }

    if (!res.ok) {
      setError(data.error || `Server error (${res.status})`)
      setView(VIEW.INPUT)
      return
    }

    const history = saveSnapshot(data)
    setTrends(getTrends(history, data.projects))
    setDashboardData(data)
    setView(VIEW.DASHBOARD)
  }

  function handleReset() {
    setDashboardData(null)
    setTrends({})
    setError(null)
    setInputText('')
    setView(VIEW.INPUT)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <div className="app-header__inner">
            <div className="app-header__brand">
              <svg className="app-header__logo" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <rect width="32" height="32" rx="8" fill="rgba(255,255,255,0.15)" />
                <rect x="6" y="9" width="14" height="3" rx="1.5" fill="white" />
                <rect x="6" y="15" width="20" height="3" rx="1.5" fill="white" />
                <rect x="6" y="21" width="10" height="3" rx="1.5" fill="rgba(255,255,255,0.6)" />
                <circle cx="24" cy="22.5" r="4" fill="#22c55e" />
              </svg>
              <div>
                <h1 className="app-header__title">Executive Project Dashboard</h1>
                <p className="app-header__subtitle">AI-Powered Portfolio Status Intelligence</p>
              </div>
            </div>
            {view === VIEW.DASHBOARD && (
              <button className="btn btn--outline-white" onClick={handleReset}>
                New Analysis
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {view === VIEW.INPUT && (
            <InputSection onSubmit={handleSubmit} error={error} text={inputText} onTextChange={setInputText} />
          )}
          {view === VIEW.LOADING && <LoadingIndicator />}
          {view === VIEW.DASHBOARD && dashboardData && (
            <Dashboard data={dashboardData} trends={trends} onReset={handleReset} />
          )}
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p className="text-xs text-muted">
            Powered by Claude AI &nbsp;·&nbsp; For internal executive use only
          </p>
        </div>
      </footer>
    </div>
  )
}
