// src/components/Navbar.jsx
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)
  return (
    <nav className="navbar">
      <div className="container">
        {/* ── Logo ── */}
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          <div className="navbar__logo-badge" aria-hidden="true">🎓</div>
          <div className="navbar__logo-text">
            <span className="navbar__logo-name">EduEvents</span>
            <span className="navbar__logo-sub">College Portal</span>
          </div>
        </Link>

        {/* ── Mobile hamburger ── */}
        <button
          className={`navbar__hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        {/* ── Nav links ── */}
        <ul className={`navbar__links${menuOpen ? ' open' : ''}`} role="list">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `navbar__link${isActive ? ' active' : ''}`
              }
              onClick={closeMenu}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `navbar__link${isActive ? ' active' : ''}`
              }
              onClick={closeMenu}
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `navbar__link navbar__link--cta${isActive ? ' active' : ''}`
              }
              onClick={closeMenu}
            >
              Register
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
