// src/components/FeatureCard.jsx
import React from 'react'

/**
 * FeatureCard
 * A single feature highlight card for the Home page features grid.
 *
 * Props:
 *   icon  {string} — Emoji or Unicode icon
 *   title {string} — Card heading
 *   desc  {string} — Short description
 *   tag   {string} — Small label shown at the bottom
 */
function FeatureCard({ icon, title, desc, tag }) {
  return (
    <article className="feature-card">
      <div className="feature-card__icon" aria-hidden="true">
        {icon}
      </div>
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__desc">{desc}</p>
      {tag && <span className="feature-card__tag">{tag}</span>}
    </article>
  )
}

export default FeatureCard
