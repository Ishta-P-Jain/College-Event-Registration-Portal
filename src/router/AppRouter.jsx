import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'

/**
 * AppRouter.jsx — Centralised routing configuration
 *
 * Routes:
 *   /           → HomePage
 *   /login      → LoginPage
 *   /register   → RegisterPage
 *   *           → Redirect to /
 */
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<HomePage />} />
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Catch-all: redirect unknown URLs to home */}
        <Route path="*"         element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
