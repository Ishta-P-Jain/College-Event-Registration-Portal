// src/pages/student/MyRegistrations.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useAuth } from '../../context/AuthContext'
import '../../styles/Dashboard.css'

/**
 * MyRegistrations
 * Shows the logged-in student all events they have registered for.
 */
function MyRegistrations() {
  const { events, getMyRegistrations } = useAuth()

  // Get all registrations belonging to the current student
  const myRegistrations = getMyRegistrations()

  // For each registration, find the matching event details
  const myEvents = myRegistrations.map(reg => {
    const event = events.find(e => e.id === reg.eventId)
    return { ...reg, event }
  })

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-body">
        <div className="container">

          {/* Back link */}
          <Link to="/student/dashboard" className="back-link">
            ← Back to Events
          </Link>

          {/* Page header */}
          <div className="page-header">
            <p className="page-header__label">Student Portal</p>
            <h1 className="page-header__title">My Registrations</h1>
            <p className="page-header__sub">
              Events you have signed up for.
            </p>
          </div>

          {/* Summary */}
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-card__value">{myEvents.length}</div>
              <div className="stat-card__label">Events Registered</div>
            </div>
          </div>

          {/* Registrations table */}
          <div className="section-card">
            <div className="section-card__header">
              <span className="section-card__title">
                Registered Events ({myEvents.length})
              </span>
            </div>

            {myEvents.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state__icon">🎟️</div>
                <p className="empty-state__text">
                  You haven't registered for any events yet.
                </p>
                <p className="empty-state__sub">
                  <Link
                    to="/student/dashboard"
                    style={{ color: '#f0a500', fontWeight: '600' }}
                  >
                    Browse Events →
                  </Link>
                </p>
              </div>
            ) : (
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Event Name</th>
                      <th>Date</th>
                      <th>Venue</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myEvents.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>
                          <strong>
                            {item.event ? item.event.name : 'Unknown Event'}
                          </strong>
                        </td>
                        <td>{item.event ? item.event.date : '—'}</td>
                        <td>{item.event ? item.event.venue : '—'}</td>
                        <td>
                          <span className="badge badge--blue">✓ Confirmed</span>
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

export default MyRegistrations
