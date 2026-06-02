// src/data/sampleData.js
// Hardcoded users and starting events.
// In a real app this would come from a database.

// ── Hardcoded users ──────────────────────────────────────────
export const USERS = [
  {
    id: 'u1',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    fullName: 'Admin User',
  },
  {
    id: 'u2',
    username: 'student1',
    password: 'student123',
    role: 'student',
    fullName: 'Alice Johnson',
  },
  {
    id: 'u3',
    username: 'student2',
    password: 'student123',
    role: 'student',
    fullName: 'Bob Smith',
  },
  {
    id: 'u4',
    username: 'student3',
    password: 'student123',
    role: 'student',
    fullName: 'Carol Davis',
  },
]

// ── Seed events ──────────────────────────────────────────────
// Each event has a unique id, name, date, venue, and max capacity.
export const INITIAL_EVENTS = [
  {
    id: 'e1',
    name: 'Annual Tech Fest 2025',
    date: '2025-08-15',
    venue: 'Main Auditorium',
    maxCapacity: 3,
  },
  {
    id: 'e2',
    name: 'Cultural Night',
    date: '2025-08-22',
    venue: 'Open Air Theatre',
    maxCapacity: 5,
  },
  {
    id: 'e3',
    name: 'Sports Day',
    date: '2025-09-05',
    venue: 'College Grounds',
    maxCapacity: 2,
  },
  {
    id: 'e4',
    name: 'Career Fair',
    date: '2025-09-18',
    venue: 'Seminar Hall B',
    maxCapacity: 10,
  },
]
