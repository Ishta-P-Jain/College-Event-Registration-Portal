// src/components/Navbar.jsx
import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Navbar.css'

/**
 * Navbar
 * Shows different links depending on whether the user is:
 * - Not logged in → Home, Login, Register
 * - Logged in as Admin → Dashboard, Create Event, Logout
 * - Logged in as Student → Events, My Registrations, Logout
 */
function Navbar() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  function handleLogout() {
    logout()
    navigate('/')
    closeMenu()
  }

  return (
    <nav className="navbar">
      <div className="container">

        {/* Logo — links to correct home depending on role */}
        <Link
          to={
            currentUser?.role === 'admin'
              ? '/admin/dashboard'
              : currentUser?.role === 'student'
              ? '/student/dashboard'
              : '/'
          }
          className="navbar__logo"
          onClick={closeMenu}
        >
          <div className="navbar__logo-badge">🎓</div>
          <div className="navbar__logo-text">
            <span className="navbar__logo-name">EduEvents</span>
            <span className="navbar__logo-sub">College Portal</span>
          </div>
        </Link>

        {/* Mobile hamburger button */}
        <button
          className={`navbar__hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Nav links — change based on login state */}
        <ul className={`navbar__links${menuOpen ? ' open' : ''}`}>

          {/* ── Not logged in ── */}
          {!currentUser && (
            <>
              <li>
                <NavLink to="/" end
                  className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
                  onClick={closeMenu}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/login"
                  className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
                  onClick={closeMenu}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register"
                  className={({ isActive }) => `navbar__link navbar__link--cta${isActive ? ' active' : ''}`}
                  onClick={closeMenu}
                >
                  Register
                </NavLink>
              </li>
            </>
          )}

          {/* ── Admin links ── */}
          {currentUser?.role === 'admin' && (
            <>
              <li>
                <NavLink to="/admin/dashboard"
                  className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
                  onClick={closeMenu}
                >
                  All Events
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/create-event"
                  className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
                  onClick={closeMenu}
                >
                  Create Event
                </NavLink>
              </li>
              <li>
                <span className="navbar__user">👤 {currentUser.fullName}</span>
              </li>
              <li>
                <button className="navbar__link navbar__logout" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}

          {/* ── Student links ── */}
          {currentUser?.role === 'student' && (
            <>
              <li>
                <NavLink to="/student/dashboard"
                  className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
                  onClick={closeMenu}
                >
                  Browse Events
                </NavLink>
              </li>
              <li>
                <NavLink to="/student/my-registrations"
                  className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
                  onClick={closeMenu}
                >
                  My Registrations
                </NavLink>
              </li>
              <li>
                <span className="navbar__user">👤 {currentUser.fullName}</span>
              </li>
              <li>
                <button className="navbar__link navbar__logout" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}

        </ul>
      </div>
    </nav>
  )
}

export default Navbar
