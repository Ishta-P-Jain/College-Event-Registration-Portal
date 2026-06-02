// src/pages/LoginPage.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/AuthPages.css'

/**
 * LoginPage
 * Login form with username/password fields, show/hide password toggle,
 * client-side validation, and a dummy submit handler.
 */
function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  /* ── Validation ── */
  function validate(fields) {
    const errs = {}
    if (!fields.username.trim()) {
      errs.username = 'Username is required.'
    } else if (fields.username.trim().length < 3) {
      errs.username = 'Username must be at least 3 characters.'
    }
    if (!fields.password) {
      errs.password = 'Password is required.'
    } else if (fields.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.'
    }
    return errs
  }

  /* ── Input handler ── */
  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // Clear error for field being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  /* ── Submit handler (dummy) ── */
  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    // TODO: Replace with real API call
    alert(`Login attempted for "${form.username}". (No backend connected)`)
  }

  return (
    <div className="auth-page">
      <Navbar />

      <main className="auth-page__body">
        <div className="auth-layout">

          {/* ── Left brand panel ── */}
          <div className="auth-panel" aria-hidden="true">
            <p className="auth-panel__eyebrow">Student Access</p>
            <h2 className="auth-panel__title">
              Welcome back to EduEvents
            </h2>
            <p className="auth-panel__desc">
              Log in to view your registered events, track upcoming
              activities, and manage your campus schedule.
            </p>
            <ul className="auth-panel__perks">
              <li className="auth-panel__perk">
                <span className="auth-panel__perk-icon">📋</span>
                View all registered events
              </li>
              <li className="auth-panel__perk">
                <span className="auth-panel__perk-icon">🔔</span>
                Get event reminders
              </li>
              <li className="auth-panel__perk">
                <span className="auth-panel__perk-icon">🎓</span>
                Track participation history
              </li>
            </ul>
          </div>

          {/* ── Right form card ── */}
          <div className="auth-card">
            <h1 className="auth-card__heading">Login</h1>
            <p className="auth-card__subheading">
              Enter your credentials to access the portal.
            </p>

            <form className="form" onSubmit={handleSubmit} noValidate>

              {/* Username */}
              <div className="form-group">
                <label className="form-label" htmlFor="login-username">
                  Username
                </label>
                <div className="form-input-wrap">
                  <input
                    id="login-username"
                    className={`form-input${errors.username ? ' error' : ''}`}
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="e.g. john_doe"
                    autoComplete="username"
                    aria-describedby={errors.username ? 'err-username' : undefined}
                  />
                </div>
                {errors.username && (
                  <span className="form-error" id="err-username" role="alert">
                    ⚠ {errors.username}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="form-group">
                <label className="form-label" htmlFor="login-password">
                  Password
                </label>
                <div className="form-input-wrap">
                  <input
                    id="login-password"
                    className={`form-input${errors.password ? ' error' : ''}`}
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    aria-describedby={errors.password ? 'err-password' : undefined}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(prev => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.password && (
                  <span className="form-error" id="err-password" role="alert">
                    ⚠ {errors.password}
                  </span>
                )}
              </div>

              <button type="submit" className="form-submit">
                Login to Portal
              </button>
            </form>

            <p className="auth-redirect">
              Don't have an account?{' '}
              <Link to="/register">Create one here</Link>
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}

export default LoginPage
