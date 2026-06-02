// src/router/AppRouter.jsx
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '../context/AuthContext'

// Public pages
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'

// Admin pages
import AdminDashboard from '../pages/admin/AdminDashboard'
import CreateEvent from '../pages/admin/CreateEvent'
import EventRegistrations from '../pages/admin/EventRegistrations'

// Student pages
import StudentDashboard from '../pages/student/StudentDashboard'
import MyRegistrations from '../pages/student/MyRegistrations'

/**
 * ProtectedRoute
 * Wraps a route that requires login and a specific role.
 * If not logged in → redirect to /login
 * If wrong role → redirect to /login
 */
function ProtectedRoute({ children, requiredRole }) {
  const { currentUser } = useAuth()

  if (!currentUser) {
    // Not logged in at all
    return <Navigate to="/login" replace />
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    // Logged in but wrong role (e.g. student trying to access admin page)
    return <Navigate to="/login" replace />
  }

  // All good — render the page
  return children
}

/**
 * AppRouter
 * Defines all routes in the application.
 *
 * Public routes:
 *   /           → HomePage
 *   /login      → LoginPage
 *   /register   → RegisterPage
 *
 * Admin routes (require login + admin role):
 *   /admin/dashboard                        → AdminDashboard
 *   /admin/create-event                     → CreateEvent
 *   /admin/event/:eventId/registrations     → EventRegistrations
 *
 * Student routes (require login + student role):
 *   /student/dashboard                      → StudentDashboard
 *   /student/my-registrations               → MyRegistrations
 */
function AppRoutes() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/"         element={<HomePage />} />
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Admin pages */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/create-event"
        element={
          <ProtectedRoute requiredRole="admin">
            <CreateEvent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/event/:eventId/registrations"
        element={
          <ProtectedRoute requiredRole="admin">
            <EventRegistrations />
          </ProtectedRoute>
        }
      />

      {/* Student pages */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute requiredRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/my-registrations"
        element={
          <ProtectedRoute requiredRole="student">
            <MyRegistrations />
          </ProtectedRoute>
        }
      />

      {/* Catch-all: redirect unknown URLs to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function AppRouter() {
  return (
    <BrowserRouter>
      {/* AuthProvider must wrap everything so all pages can access auth state */}
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default AppRouter
