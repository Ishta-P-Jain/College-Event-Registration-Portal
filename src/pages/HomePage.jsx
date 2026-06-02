// src/pages/HomePage.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FeatureCard from '../components/FeatureCard'
import '../styles/HomePage.css'

/**
 * HomePage
 * The main landing page.
 * Contains: Navbar → Hero → Features → Footer
 */
function HomePage() {
  /* Feature cards data — easy to extend later */
  const features = [
    {
      icon: '📋',
      title: 'Easy Event Registration',
      desc:
        'Browse all upcoming campus events in one place and register in seconds with a clean, guided form — no paperwork needed.',
      tag: 'Instant Sign-up',
    },
    {
      icon: '📅',
      title: 'Event Management',
      desc:
        'Organisers can create, edit, and publish events with full control over capacity, schedules, and attendee details.',
      tag: 'For Organisers',
    },
    {
      icon: '🎓',
      title: 'Student Dashboard',
      desc:
        'Every student gets a personal dashboard showing registered events, upcoming deadlines, and participation history.',
      tag: 'Personalised',
    },
  ]

  return (
    <div className="home">
      <Navbar />

      {/* ════════════ HERO ════════════ */}
      <section className="hero">
        <div className="container">
          <div className="hero__inner">
            <p className="hero__eyebrow">
              <span className="hero__eyebrow-dot" aria-hidden="true" />
              Welcome to your campus event hub
            </p>

            <h1 className="hero__title">
              College <em>Event</em><br />
              Registration Portal
            </h1>

            <p className="hero__desc">
              Discover, register, and manage every academic and extracurricular
              event on campus — all from a single, easy-to-use platform built
              for students and organisers alike.
            </p>

            <div className="hero__actions">
              <Link to="/login" className="btn btn--primary btn--lg">
                Login to Portal
              </Link>
              <Link to="/register" className="btn btn--outline-light btn--lg">
                Create Account
              </Link>
            </div>

            {/* Quick stats — static/decorative */}
            <div className="hero__stat-row" aria-label="Platform stats">
              <div className="hero__stat">
                <span className="hero__stat-value">120+</span>
                <span className="hero__stat-label">Events Per Year</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-value">5,000+</span>
                <span className="hero__stat-label">Students Enrolled</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-value">30+</span>
                <span className="hero__stat-label">Departments</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ FEATURES ════════════ */}
      <section className="features" aria-labelledby="features-heading">
        <div className="container">
          <div className="features__header">
            <p className="section-label">Why EduEvents?</p>
            <h2 className="section-title" id="features-heading">
              Everything you need,<br />in one portal
            </h2>
            <p className="section-desc">
              A purpose-built platform that makes campus event participation
              simple, organised, and enjoyable for everyone.
            </p>
          </div>

          <div className="features__grid">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default HomePage
