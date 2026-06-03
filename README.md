# College Event Registration Portal

A full-stack web application that allows administrators to manage college events and students to register for upcoming events.

---

# Features

## Admin

* Login using admin credentials
* Create new events
* View all events
* View registration statistics
* View event capacity fill percentage
* View registered students for each event

## Student

* Login using student credentials
* Browse upcoming events
* Register for events
* View personal registrations
* Prevent duplicate registrations
* View full events status

---

# Tech Stack

## Frontend

* React.js
* CSS

## Backend

* Node.js
* Express.js

## Database

* MySQL

---

# Project Setup

## 1. Clone Repository

```bash
git clone <repository-url>
cd inspirante-ishta
```

---

## 2. Frontend Setup

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 3. Backend Setup

Move into backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=college_events
```

Start server:

```bash
node server.js
```

Backend runs on:

```text
http://localhost:5000
```

---

# Database Setup

Create a MySQL database:

```sql
CREATE DATABASE college_events;
```

Import the provided SQL dump or execute the schema and seed scripts.

Tables used:

* users
* events
* registrations

---

# Demo Credentials

## Admin

Username:

```text
admin
```

Password:

```text
inspirante2026
```

---

## Students

### Divya Kamath

```text
Username: divya.kamath
Password: student123
```

### Asha Rao

```text
Username: asha.rao
Password: student123
```

Additional student accounts are available in the seeded database.

---

# Capacity Status Indicator

The Admin Dashboard displays event capacity utilization using color-coded indicators.

| Capacity Filled | Status   |
| --------------- | -------- |
| Below 50%       | 🟢 Green |
| 50% - 79%       | 🟠 Amber |
| 80% and above   | 🔴 Red   |

Students cannot register once an event reaches maximum capacity.

Full events display:

```text
FULL
```

and registration is disabled.

---

# API Overview

## Authentication

### Login

```http
POST /api/auth/login
```

Request:

```json
{
  "username": "divya.kamath",
  "password": "student123"
}
```

---

## Events

### Get All Events

```http
GET /api/events
```

### Create Event

```http
POST /api/events
```

### Get Event Statistics

```http
GET /api/events/admin/stats
```

### Get Event Details

```http
GET /api/events/:eventId/details
```

---

## Registrations

### Register For Event

```http
POST /api/registrations
```

### Get Student Registrations

```http
GET /api/registrations/:studentId
```

---

# Business Rules

* A student cannot register for the same event twice.
* Full events cannot accept registrations.
* Event capacity is enforced by the backend.
* Admin users cannot register for events.
* Events are displayed in ascending date order.

---

# Future Improvements
* JWT-based authentication
* Role-based route protection
* Search and filter events
* Event categories and tags
* Email notifications after registration
* Dashboard analytics and charts
* Mobile-first responsive design
* Event editing and deletion
* Attendance tracking system

---

# Known Limitations

* Authentication currently uses assignment-provided credentials.
* Admin statistics refresh after page reload.

---

# Author

Ishta Jain

Inspirante Internship Assignment Submission
