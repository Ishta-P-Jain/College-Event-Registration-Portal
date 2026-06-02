// src/pages/LoginPage.jsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'
import '../styles/AuthPages.css'

/**
 * LoginPage
 * - Validates username and password fields
 * - Checks credentials against hardcoded users in AuthContext
 * - Redirects admin → /admin/dashboard
 * - Redirects student → /student/dashboard
 *
 * Sample credentials:
 *   Admin:   username: admin      password: admin123
 *   Student: username: student1   password: student123
 */
function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  // ── Validation ──────────────────────────────────────────────
  function validate(fields) {
    const errs = {}
    if (!fields.username.trim()) {
      errs.username = 'Username is required.'
    }
    if (!fields.password) {
      errs.password = 'Password is required.'
    }
    return errs
  }

  // ── Input change handler ─────────────────────────────────────
  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // ── Submit handler ───────────────────────────────────────────
  function handleSubmit(e) {
    e.preventDefault()

    // Check empty fields first
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    // Try logging in via AuthContext
    const result = login(form.username, form.password)

    if (!result.success) {
      // Show the error from context (wrong username/password)
      setErrors({ general: result.error })
      return
    }

    // Redirect based on role
    if (result.role === 'admin') {
      navigate('/admin/dashboard')
    } else {
      navigate('/student/dashboard')
    }
  }

  return (
    <div className="auth-page">
      <Navbar />

      <main className="auth-page__body">
        <div className="auth-layout">

          {/* ── Left info panel ── */}
          <div className="auth-panel">
            <p className="auth-panel__eyebrow">Portal Access</p>
            <h2 className="auth-panel__title">
              Welcome back to EduEvents
            </h2>
            <p className="auth-panel__desc">
              Log in with your credentials to access the portal.
              Admins and students have separate dashboards.
            </p>

            {/* Sample credentials hint */}
            <div style={{
              background: 'rgba(240,165,0,0.1)',
              border: '1px solid rgba(240,165,0,0.3)',
              borderRadius: '8px',
              padding: '14px',
              marginBottom: '20px',
            }}>
              <p style={{ color: '#f0c060', fontSize: '12px', fontWeight: '700', marginBottom: '8px', letterSpacing: '0.5px' }}>
                SAMPLE CREDENTIALS
              </p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginBottom: '4px' }}>
                🔑 Admin: <strong style={{color:'#fff'}}>admin</strong> / <strong style={{color:'#fff'}}>admin123</strong>
              </p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>
                🎓 Student: <strong style={{color:'#fff'}}>student1</strong> / <strong style={{color:'#fff'}}>student123</strong>
              </p>
            </div>

            <ul className="auth-panel__perks">
              <li className="auth-panel__perk">
                <span className="auth-panel__perk-icon">📋</span>
                View and register for events
              </li>
              <li className="auth-panel__perk">
                <span className="auth-panel__perk-icon">🔒</span>
                Role-based access control
              </li>
              <li className="auth-panel__perk">
                <span className="auth-panel__perk-icon">🎓</span>
                Personal student dashboard
              </li>
            </ul>
          </div>

          {/* ── Right form card ── */}
          <div className="auth-card">
            <h1 className="auth-card__heading">Login</h1>
            <p className="auth-card__subheading">
              Enter your username and password.
            </p>

            {/* General error (wrong credentials) */}
            {errors.general && (
              <div className="alert alert--error" style={{ marginBottom: '15px' }}>
                ⚠ {errors.general}
              </div>
            )}

            <form className="form" onSubmit={handleSubmit} noValidate>

              {/* Username */}
              <div className="form-group">
                <label className="form-label" htmlFor="login-username">
                  Username
                </label>
                <input
                  id="login-username"
                  className={`form-input${errors.username ? ' error' : ''}`}
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  autoComplete="username"
                />
                {errors.username && (
                  <span className="form-error">⚠ {errors.username}</span>
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
                    placeholder="Enter your password"
                    autoComplete="current-password"
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
                  <span className="form-error">⚠ {errors.password}</span>
                )}
              </div>

              <button type="submit" className="form-submit">
                Login
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
