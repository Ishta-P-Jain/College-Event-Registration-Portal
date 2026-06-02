// src/pages/admin/EventRegistrations.jsx
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useAuth } from '../../context/AuthContext'
import '../../styles/Dashboard.css'

/**
 * EventRegistrations
 * Admin can view the full list of students registered for a specific event.
 * The event id comes from the URL: /admin/event/:eventId/registrations
 */
function EventRegistrations() {
  // Get the eventId from the URL params
  const { eventId } = useParams()

  const { events, getRegistrationsForEvent, getRegistrationCount } = useAuth()

  // Find the event object matching the URL id
  const event = events.find(e => e.id === eventId)

  // Get all registrations for this event
  const registrations = getRegistrationsForEvent(eventId)
  const count = getRegistrationCount(eventId)

  // If event not found, show a message
  if (!event) {
    return (
      <div className="dashboard-page">
        <Navbar />
        <div className="dashboard-body">
          <div className="container">
            <Link to="/admin/dashboard" className="back-link">
              ← Back to Dashboard
            </Link>
            <div className="alert alert--error">
              Event not found.
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
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

          {/* Page header with event info */}
          <div className="page-header">
            <p className="page-header__label">Admin Panel · Event Registrations</p>
            <h1 className="page-header__title">{event.name}</h1>
            <p className="page-header__sub">
              📅 {event.date} &nbsp;·&nbsp; 📍 {event.venue}
            </p>
          </div>

          {/* Summary stats for this event */}
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-card__value">{event.maxCapacity}</div>
              <div className="stat-card__label">Max Capacity</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__value">{count}</div>
              <div className="stat-card__label">Registered</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__value">
                {event.maxCapacity - count}
              </div>
              <div className="stat-card__label">Spots Left</div>
            </div>
          </div>

          {/* Registrations table */}
          <div className="section-card">
            <div className="section-card__header">
              <span className="section-card__title">
                Registered Students ({count})
              </span>
              {count >= event.maxCapacity
                ? <span className="badge badge--red">Event Full</span>
                : <span className="badge badge--green">Spots Available</span>
              }
            </div>

            {registrations.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state__icon">👥</div>
                <p className="empty-state__text">No registrations yet.</p>
                <p className="empty-state__sub">
                  Students will appear here once they register.
                </p>
              </div>
            ) : (
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Student Name</th>
                      <th>Registration ID</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((reg, index) => (
                      <tr key={reg.id}>
                        <td>{index + 1}</td>
                        <td><strong>{reg.studentName}</strong></td>
                        <td style={{ fontFamily: 'monospace', fontSize: '12px', color: '#888' }}>
                          {reg.id}
                        </td>
                        <td>
                          <span className="badge badge--blue">Confirmed</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default EventRegistrations
