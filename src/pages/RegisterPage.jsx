// src/pages/RegisterPage.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/AuthPages.css'

/**
 * RegisterPage
 * Sign-up form with full client-side validation, password match check,
 * field-level error messages, and a success banner on submission.
 */

const INITIAL_FORM = {
  fullName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function RegisterPage() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  /* ── Validation ── */
  function validate(fields) {
    const errs = {}

    // Full name
    if (!fields.fullName.trim()) {
      errs.fullName = 'Full name is required.'
    } else if (fields.fullName.trim().length < 2) {
      errs.fullName = 'Full name must be at least 2 characters.'
    }

    // Username
    if (!fields.username.trim()) {
      errs.username = 'Username is required.'
    } else if (fields.username.trim().length < 3) {
      errs.username = 'Username must be at least 3 characters.'
    } else if (!/^[a-zA-Z0-9_]+$/.test(fields.username)) {
      errs.username = 'Only letters, numbers, and underscores are allowed.'
    }

    // Email
    if (!fields.email.trim()) {
      errs.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      errs.email = 'Please enter a valid email address.'
    }

    // Password
    if (!fields.password) {
      errs.password = 'Password is required.'
    } else if (fields.password.length < 8) {
      errs.password = 'Password must be at least 8 characters.'
    } else if (!/[A-Z]/.test(fields.password)) {
      errs.password = 'Password must contain at least one uppercase letter.'
    } else if (!/[0-9]/.test(fields.password)) {
      errs.password = 'Password must contain at least one number.'
    }

    // Confirm password
    if (!fields.confirmPassword) {
      errs.confirmPassword = 'Please confirm your password.'
    } else if (fields.password !== fields.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.'
    }

    return errs
  }

  /* ── Input handler ── */
  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
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
    setSubmitted(true)
    setForm(INITIAL_FORM)
    setErrors({})
  }

  return (
    <div className="auth-page">
      <Navbar />

      <main className="auth-page__body">
        <div className="auth-layout">

          {/* ── Left brand panel ── */}
          <div className="auth-panel" aria-hidden="true">
            <p className="auth-panel__eyebrow">New Student</p>
            <h2 className="auth-panel__title">
              Join EduEvents today
            </h2>
            <p className="auth-panel__desc">
              Create your free account and get instant access to all
              campus events, registrations, and your personal dashboard.
            </p>
            <ul className="auth-panel__perks">
              <li className="auth-panel__perk">
                <span className="auth-panel__perk-icon">⚡</span>
                Register for events instantly
              </li>
              <li className="auth-panel__perk">
                <span className="auth-panel__perk-icon">📊</span>
                Personal student dashboard
              </li>
              <li className="auth-panel__perk">
                <span className="auth-panel__perk-icon">🔒</span>
                Secure &amp; free account
              </li>
            </ul>
          </div>

          {/* ── Right form card ── */}
          <div className="auth-card">
            <h1 className="auth-card__heading">Create Account</h1>
            <p className="auth-card__subheading">
              Fill in your details to get started.
            </p>

            {/* Success banner */}
            {submitted && (
              <div className="auth-success" role="alert">
                <span className="auth-success__icon">✅</span>
                <div className="auth-success__text">
                  <strong>Registration successful!</strong>
                  Your account has been created. You can now{' '}
                  <Link to="/login">log in here</Link>.
                </div>
              </div>
            )}

            {!submitted && (
              <form className="form" onSubmit={handleSubmit} noValidate>

                {/* Full Name */}
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-fullname">
                    Full Name
                  </label>
                  <input
                    id="reg-fullname"
                    className={`form-input${errors.fullName ? ' error' : ''}`}
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Jane Smith"
                    autoComplete="name"
                    aria-describedby={errors.fullName ? 'err-fullname' : undefined}
                  />
                  {errors.fullName && (
                    <span className="form-error" id="err-fullname" role="alert">
                      ⚠ {errors.fullName}
                    </span>
                  )}
                </div>

                {/* Username */}
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-username">
                    Username
                  </label>
                  <input
                    id="reg-username"
                    className={`form-input${errors.username ? ' error' : ''}`}
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="e.g. jane_smith"
                    autoComplete="username"
                    aria-describedby={errors.username ? 'err-username' : undefined}
                  />
                  {errors.username && (
                    <span className="form-error" id="err-username" role="alert">
                      ⚠ {errors.username}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-email">
                    Email Address
                  </label>
                  <input
                    id="reg-email"
                    className={`form-input${errors.email ? ' error' : ''}`}
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="e.g. jane@college.edu"
                    autoComplete="email"
                    aria-describedby={errors.email ? 'err-email' : undefined}
                  />
                  {errors.email && (
                    <span className="form-error" id="err-email" role="alert">
                      ⚠ {errors.email}
                    </span>
                  )}
                </div>

                {/* Password */}
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-password">
                    Password
                  </label>
                  <div className="form-input-wrap">
                    <input
                      id="reg-password"
                      className={`form-input${errors.password ? ' error' : ''}`}
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Min. 8 chars, 1 uppercase, 1 number"
                      autoComplete="new-password"
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

                {/* Confirm Password */}
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-confirm">
                    Confirm Password
                  </label>
                  <div className="form-input-wrap">
                    <input
                      id="reg-confirm"
                      className={`form-input${errors.confirmPassword ? ' error' : ''}`}
                      type={showConfirm ? 'text' : 'password'}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                      aria-describedby={errors.confirmPassword ? 'err-confirm' : undefined}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirm(prev => !prev)}
                      aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                    >
                      {showConfirm ? '🙈' : '👁️'}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <span className="form-error" id="err-confirm" role="alert">
                      ⚠ {errors.confirmPassword}
                    </span>
                  )}
                </div>

                <button type="submit" className="form-submit">
                  Create My Account
                </button>
              </form>
            )}

            <p className="auth-redirect">
              Already have an account?{' '}
              <Link to="/login">Login here</Link>
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}

export default RegisterPage
