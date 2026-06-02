// src/components/Footer.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Footer.css'

/**
 * Footer
 * Site-wide footer with brand info, quick links, and copyright.
 */
function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          {/* Brand column */}
          <div className="footer__brand">
            <div className="footer__brand-name">🎓 EduEvents</div>
            <p className="footer__brand-desc">
              A centralised platform for college students to discover, register,
              and manage academic and extracurricular events on campus.
            </p>
          </div>

          {/* Navigation column */}
          <div className="footer__col">
            <div className="footer__col-title">Navigation</div>
            <ul className="footer__col-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </div>

          {/* Info column */}
          <div className="footer__col">
            <div className="footer__col-title">Information</div>
            <ul className="footer__col-links">
              <li><a href="#">About Portal</a></li>
              <li><a href="#">Help &amp; Support</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p className="footer__copy">
            © {year} EduEvents &mdash; Built for <span>students</span>, by students.
          </p>
          <span className="footer__badge">Internship Assignment Project</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
