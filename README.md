# College Event Registration Portal

## Overview

A full-stack web application that allows administrators to create and manage college events while enabling students to register for upcoming events.

## Tech Stack

* Frontend: React.js
* Backend: Node.js + Express.js
* Database: MySQL

## Features

### Admin

* Login using admin credentials
* Create new events
* View event statistics
* View registered students for each event

### Student

* Login using student credentials
* Browse upcoming events
* Register for events
* View personal registrations
* Prevent duplicate registrations

## Installation

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
node server.js
```

## Database Setup

1. Create a MySQL database.
2. Import the SQL dump/seed file.
3. Update database credentials inside `.env`.

## Environment Variables

Create a `.env` file inside backend:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=college_events
```

## Known Issues

* Admin statistics refresh requires page refresh after creating an event.
* Authentication uses hardcoded credentials as specified in the assignment.

## Author

Ishta P Jain
