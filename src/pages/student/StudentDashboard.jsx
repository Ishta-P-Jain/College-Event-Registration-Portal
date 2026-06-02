// src/pages/student/StudentDashboard.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useAuth } from '../../context/AuthContext'
import '../../styles/Dashboard.css'

/**
 * StudentDashboard
 * Students can:
 * - See all upcoming events
 * - See how many spots are left
 * - Register for an event (if not already registered and not full)
 */
function StudentDashboard() {
  const {
    currentUser,
    events,
    getRegistrationCount,
    registerForEvent,
    isRegistered,
    getMyRegistrations,
  } = useAuth()

  // Store feedback messages per event { eventId: 'message' }
  const [feedback, setFeedback] = useState({})

  // Handle register button click
  function handleRegister(eventId) {
    const result = registerForEvent(eventId)

    if (result.success) {
      setFeedback(prev => ({
        ...prev,
        [eventId]: { type: 'success', text: 'Successfully registered! 🎉' }
      }))
    } else {
      setFeedback(prev => ({
        ...prev,
        [eventId]: { type: 'error', text: result.error }
      }))
    }

    // Clear the message after 3 seconds
    setTimeout(() => {
      setFeedback(prev => ({ ...prev, [eventId]: null }))
    }, 3000)
  }

  const myRegCount = getMyRegistrations().length

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-body">
        <div className="container">

          {/* Page header */}
          <div className="page-header">
            <div className="page-header__row">
              <div>
                <p className="page-header__label">Student Portal</p>
                <h1 className="page-header__title">
                  Welcome, {currentUser.fullName} 👋
                </h1>
                <p className="page-header__sub">
                  Browse and register for upcoming events.
                </p>
              </div>
              <Link to="/student/my-registrations" className="btn-navy">
                My Registrations ({myRegCount})
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-card__value">{events.length}</div>
              <div className="stat-card__label">Total Events</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__value">{myRegCount}</div>
              <div className="stat-card__label">My Registrations</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__value">
                {/* How many events still have open spots */}
                {events.filter(e => getRegistrationCount(e.id) < e.maxCapacity).length}
              </div>
              <div className="stat-card__label">Events Open</div>
            </div>
          </div>

          {/* Events table */}
          <div className="section-card">
            <div className="section-card__header">
              <span className="section-card__title">Upcoming Events</span>
            </div>

            {events.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state__icon">📭</div>
                <p className="empty-state__text">No events available yet.</p>
                <p className="empty-state__sub">Check back later.</p>
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
                      <th>Spots Left</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event, index) => {
                      const count = getRegistrationCount(event.id)
                      const spotsLeft = event.maxCapacity - count
                      const isFull = spotsLeft <= 0
                      const alreadyIn = isRegistered(event.id)
                      const fb = feedback[event.id]

                      return (
                        <tr key={event.id}>
                          <td>{index + 1}</td>
                          <td><strong>{event.name}</strong></td>
                          <td>{event.date}</td>
                          <td>{event.venue}</td>
                          <td>
                            {isFull
                              ? <span className="badge badge--red">Full</span>
                              : <span className="badge badge--green">{spotsLeft} left</span>
                            }
                          </td>
                          <td>
                            {/* Show feedback message if present */}
                            {fb ? (
                              <span
                                style={{
                                  fontSize: '13px',
                                  color: fb.type === 'success' ? '#1a7a4a' : '#c0392b',
                                  fontWeight: '600',
                                }}
                              >
                                {fb.text}
                              </span>
                            ) : alreadyIn ? (
                              /* Already registered */
                              <span className="badge badge--blue">✓ Registered</span>
                            ) : isFull ? (
                              /* Event full */
                              <span className="btn-disabled">Full</span>
                            ) : (
                              /* Register button */
                              <button
                                className="btn-gold"
                                onClick={() => handleRegister(event.id)}
                                style={{ padding: '5px 14px', fontSize: '13px' }}
                              >
                                Register
                              </button>
                            )}
                          </td>
                        </tr>
                      )
                    })}
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

export default StudentDashboard
