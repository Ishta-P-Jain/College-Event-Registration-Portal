// src/pages/admin/CreateEvent.jsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useAuth } from '../../context/AuthContext'
import '../../styles/Dashboard.css'
import '../../styles/AuthPages.css'

/**
 * CreateEvent
 * Form for admin to create a new event.
 * Fields: Event Name, Date, Venue, Max Capacity
 * On submit: adds the event via context and redirects to dashboard.
 */
function CreateEvent() {
  const { createEvent } = useAuth()
  const navigate = useNavigate()

  // Form field values
  const [form, setForm] = useState({
    name: '',
    date: '',
    venue: '',
    maxCapacity: '',
  })

  // Validation error messages
  const [errors, setErrors] = useState({})

  // Success message after creating
  const [successMsg, setSuccessMsg] = useState('')

  // ── Validation ──────────────────────────────────────────────
  function validate(fields) {
    const errs = {}

    if (!fields.name.trim()) {
      errs.name = 'Event name is required.'
    }

    if (!fields.date) {
      errs.date = 'Date is required.'
    } else if (new Date(fields.date) < new Date()) {
      errs.date = 'Date must be in the future.'
    }

    if (!fields.venue.trim()) {
      errs.venue = 'Venue is required.'
    }

    if (!fields.maxCapacity) {
      errs.maxCapacity = 'Max capacity is required.'
    } else if (Number(fields.maxCapacity) < 1) {
      errs.maxCapacity = 'Capacity must be at least 1.'
    } else if (!Number.isInteger(Number(fields.maxCapacity))) {
      errs.maxCapacity = 'Capacity must be a whole number.'
    }

    return errs
  }

  // ── Input change handler ─────────────────────────────────────
  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // Clear that field's error as the user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // ── Submit handler ───────────────────────────────────────────
  function handleSubmit(e) {
    e.preventDefault()

    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    // Create the event using the context function
    createEvent(form)

    setSuccessMsg(`Event "${form.name}" created successfully!`)

    // After a short delay, go back to the admin dashboard
    setTimeout(() => {
      navigate('/admin/dashboard')
    }, 1500)
  }

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-body">
        <div className="container">

          {/* Back link */}
          <Link to="/admin/dashboard" className="back-link">
            ← Back to Dashboard
          </Link>

          {/* Page header */}
          <div className="page-header">
            <p className="page-header__label">Admin Panel</p>
            <h1 className="page-header__title">Create New Event</h1>
            <p className="page-header__sub">
              Fill in the details below to add a new event.
            </p>
          </div>

          {/* Success message */}
          {successMsg && (
            <div className="alert alert--success">
              ✅ {successMsg} Redirecting...
            </div>
          )}

          {/* Create Event Form */}
          <div className="section-card" style={{ maxWidth: '540px' }}>
            <div className="section-card__header">
              <span className="section-card__title">Event Details</span>
            </div>

            <div style={{ padding: '25px' }}>
              <form className="form" onSubmit={handleSubmit} noValidate>

                {/* Event Name */}
                <div className="form-group">
                  <label className="form-label" htmlFor="event-name">
                    Event Name
                  </label>
                  <input
                    id="event-name"
                    className={`form-input${errors.name ? ' error' : ''}`}
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Annual Tech Fest"
                  />
                  {errors.name && (
                    <span className="form-error">⚠ {errors.name}</span>
                  )}
                </div>

                {/* Date */}
                <div className="form-group">
                  <label className="form-label" htmlFor="event-date">
                    Event Date
                  </label>
                  <input
                    id="event-date"
                    className={`form-input${errors.date ? ' error' : ''}`}
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                  />
                  {errors.date && (
                    <span className="form-error">⚠ {errors.date}</span>
                  )}
                </div>

                {/* Venue */}
                <div className="form-group">
                  <label className="form-label" htmlFor="event-venue">
                    Venue
                  </label>
                  <input
                    id="event-venue"
                    className={`form-input${errors.venue ? ' error' : ''}`}
                    type="text"
                    name="venue"
                    value={form.venue}
                    onChange={handleChange}
                    placeholder="e.g. Main Auditorium"
                  />
                  {errors.venue && (
                    <span className="form-error">⚠ {errors.venue}</span>
                  )}
                </div>

                {/* Max Capacity */}
                <div className="form-group">
                  <label className="form-label" htmlFor="event-capacity">
                    Maximum Capacity
                  </label>
                  <input
                    id="event-capacity"
                    className={`form-input${errors.maxCapacity ? ' error' : ''}`}
                    type="number"
                    name="maxCapacity"
                    value={form.maxCapacity}
                    onChange={handleChange}
                    placeholder="e.g. 100"
                    min="1"
                  />
                  {errors.maxCapacity && (
                    <span className="form-error">⚠ {errors.maxCapacity}</span>
                  )}
                </div>

                <button type="submit" className="form-submit">
                  Create Event
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default CreateEvent
