// src/pages/admin/AdminDashboard.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useAuth } from '../../context/AuthContext'
import '../../styles/Dashboard.css'

/**
 * AdminDashboard
 * Shows admin a list of all events with:
 * - Event name, date, venue
 * - How many students have registered vs max capacity
 * - A link to view the full registration list for each event
 * - A button to create a new event
 */
function AdminDashboard() {
  const { events, getRegistrationCount } = useAuth()

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-body">
        <div className="container">

          {/* Page header */}
          <div className="page-header">
            <div className="page-header__row">
              <div>
                <p className="page-header__label">Admin Panel</p>
                <h1 className="page-header__title">All Events</h1>
                <p className="page-header__sub">
                  Manage events and view registrations.
                </p>
              </div>
              {/* Button to go to Create Event page */}
              <Link to="/admin/create-event" className="btn-gold">
                + Create New Event
              </Link>
            </div>
          </div>

          {/* Summary stats */}
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-card__value">{events.length}</div>
              <div className="stat-card__label">Total Events</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__value">
                {/* Total registrations across all events */}
                {events.reduce((sum, e) => sum + getRegistrationCount(e.id), 0)}
              </div>
              <div className="stat-card__label">Total Registrations</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__value">
                {/* Events that are completely full */}
                {events.filter(e => getRegistrationCount(e.id) >= e.maxCapacity).length}
              </div>
              <div className="stat-card__label">Events Full</div>
            </div>
          </div>

          {/* Events table */}
          <div className="section-card">
            <div className="section-card__header">
              <span className="section-card__title">Event List</span>
            </div>

            {events.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state__icon">📭</div>
                <p className="empty-state__text">No events yet.</p>
                <p className="empty-state__sub">
                  Click "Create New Event" to add one.
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
                      <th>Registrations</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event, index) => {
                      const count = getRegistrationCount(event.id)
                      const isFull = count >= event.maxCapacity

                      return (
                        <tr key={event.id}>
                          <td>{index + 1}</td>
                          <td><strong>{event.name}</strong></td>
                          <td>{event.date}</td>
                          <td>{event.venue}</td>
                          {/* Show registered / max */}
                          <td>{count} / {event.maxCapacity}</td>
                          <td>
                            {isFull
                              ? <span className="badge badge--red">Full</span>
                              : <span className="badge badge--green">Open</span>
                            }
                          </td>
                          <td>
                            {/* Link to view all registrations for this event */}
                            <Link
                              to={`/admin/event/${event.id}/registrations`}
                              className="btn-outline-sm"
                            >
                              View Registrations
                            </Link>
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

export default AdminDashboard
