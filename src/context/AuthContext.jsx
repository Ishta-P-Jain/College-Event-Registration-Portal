// src/context/AuthContext.jsx
// This file creates a "global store" using React Context.
// Any component in the app can read or update:
//   - currentUser  → who is logged in (null if nobody)
//   - events       → list of all events
//   - registrations → list of all registrations

import React, { createContext, useContext, useState } from 'react'
import { USERS, INITIAL_EVENTS } from '../data/sampleData'

// 1. Create the context object
const AuthContext = createContext(null)

// 2. Custom hook — lets any component easily read the context
//    Usage: const { currentUser, login } = useAuth()
export function useAuth() {
  return useContext(AuthContext)
}

// 3. Provider component — wraps the whole app and holds the state
export function AuthProvider({ children }) {

  // Who is currently logged in? null means nobody.
  const [currentUser, setCurrentUser] = useState(null)

  // All events. Admin can add new ones.
  const [events, setEvents] = useState(INITIAL_EVENTS)

  // All registrations. Each entry: { id, eventId, userId, studentName }
  const [registrations, setRegistrations] = useState([])

  // ── LOGIN ────────────────────────────────────────────────────
  // Check username + password against the hardcoded list.
  // Returns: { success: true } or { success: false, error: '...' }
  function login(username, password) {
    const user = USERS.find(
      u => u.username === username && u.password === password
    )
    if (user) {
      setCurrentUser(user)
      return { success: true, role: user.role }
    }
    return { success: false, error: 'Invalid username or password.' }
  }

  // ── LOGOUT ───────────────────────────────────────────────────
  function logout() {
    setCurrentUser(null)
  }

  // ── CREATE EVENT (admin only) ─────────────────────────────────
  // Adds a new event to the events list.
  function createEvent(eventData) {
    const newEvent = {
      id: 'e' + Date.now(), // simple unique id using timestamp
      name: eventData.name,
      date: eventData.date,
      venue: eventData.venue,
      maxCapacity: Number(eventData.maxCapacity),
    }
    setEvents(prev => [...prev, newEvent])
    return newEvent
  }

  // ── REGISTER FOR EVENT (student only) ───────────────────────
  // Returns { success: true } or { success: false, error: '...' }
  function registerForEvent(eventId) {
    // Check if student already registered for this event
    const alreadyRegistered = registrations.find(
      r => r.eventId === eventId && r.userId === currentUser.id
    )
    if (alreadyRegistered) {
      return { success: false, error: 'You have already registered for this event.' }
    }

    // Check if event is full
    const event = events.find(e => e.id === eventId)
    const registeredCount = registrations.filter(r => r.eventId === eventId).length
    if (registeredCount >= event.maxCapacity) {
      return { success: false, error: 'This event is full.' }
    }

    // Add the registration
    const newReg = {
      id: 'r' + Date.now(),
      eventId: eventId,
      userId: currentUser.id,
      studentName: currentUser.fullName,
    }
    setRegistrations(prev => [...prev, newReg])
    return { success: true }
  }

  // ── HELPERS ──────────────────────────────────────────────────

  // How many students registered for a given event?
  function getRegistrationCount(eventId) {
    return registrations.filter(r => r.eventId === eventId).length
  }

  // Get all registrations for a specific event (admin use)
  function getRegistrationsForEvent(eventId) {
    return registrations.filter(r => r.eventId === eventId)
  }

  // Get all registrations for the currently logged-in student
  function getMyRegistrations() {
    if (!currentUser) return []
    return registrations.filter(r => r.userId === currentUser.id)
  }

  // Is the current student already registered for this event?
  function isRegistered(eventId) {
    if (!currentUser) return false
    return registrations.some(
      r => r.eventId === eventId && r.userId === currentUser.id
    )
  }

  // 4. The value object — everything components can access
  const value = {
    currentUser,
    events,
    registrations,
    login,
    logout,
    createEvent,
    registerForEvent,
    getRegistrationCount,
    getRegistrationsForEvent,
    getMyRegistrations,
    isRegistered,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
