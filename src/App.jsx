import { useState } from 'react'
import InputSection from './components/InputSection'
import LoadingIndicator from './components/LoadingIndicator'
import Dashboard from './components/Dashboard'
import './App.css'

const VIEW = {
  INPUT: 'input',
  LOADING: 'loading',
  DASHBOARD: 'dashboard',
}

export default function App() {
  const [view, setView] = useState(VIEW.INPUT)
  const [dashboardData, setDashboardData] = useState(null)
  const [error, setError] = useState(null)

  async function handleSubmit(projectData) {
    setError(null)
    setView(VIEW.LOADING)

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectData }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || `Server error (${res.status})`)
      }

      setDashboardData(data)
      setView(VIEW.DASHBOARD)
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.')
      setView(VIEW.INPUT)
    }
  }

  function handleReset() {
    setDashboardData(null)
    setError(null)
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
            <InputSection onSubmit={handleSubmit} error={error} />
          )}
          {view === VIEW.LOADING && <LoadingIndicator />}
          {view === VIEW.DASHBOARD && dashboardData && (
            <Dashboard data={dashboardData} onReset={handleReset} />
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
