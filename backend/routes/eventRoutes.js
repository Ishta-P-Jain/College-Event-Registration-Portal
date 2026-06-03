const express = require("express");
const router = express.Router();
const db = require("../config/db");


router.get("/", async (req, res) => {
  try {

    const [events] = await db.query(`
      SELECT
      events.*,
      COUNT(registrations.id) AS registered_count

      FROM events

      LEFT JOIN registrations
      ON events.id = registrations.event_id

      GROUP BY events.id

      ORDER BY event_date ASC
    `);

    res.status(200).json(events);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch events",
    });

  }
});


router.get("/admin/stats", async (req, res) => {
  try {

    const [events] = await db.query(`
      SELECT
      events.id,
      events.event_name,
      events.capacity,

      COUNT(registrations.id)
      AS registered_count

      FROM events

      LEFT JOIN registrations
      ON events.id = registrations.event_id

      GROUP BY events.id
    `);

    res.status(200).json(events);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch stats",
    });

  }
});

router.post("/", async (req, res) => {
  try {

    const {
      event_name,
      event_date,
      venue,
      capacity
    } = req.body;

    await db.query(
      `
      INSERT INTO events
      (event_name,event_date,venue,capacity)
      VALUES (?,?,?,?)
      `,
      [
        event_name,
        event_date,
        venue,
        capacity
      ]
    );

    res.status(201).json({
      message: "Event created successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to create event",
    });

  }
});

router.get("/:eventId/registrations", async (req, res) => {
  try {

    const { eventId } = req.params;

    const [students] = await db.query(
      `
      SELECT
      users.id,
      users.name,
      users.username

      FROM registrations

      JOIN users
      ON registrations.student_id = users.id

      WHERE registrations.event_id = ?
      `,
      [eventId]
    );

    res.status(200).json(students);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch registrations",
    });

  }
});

router.get("/:eventId/details", async (req, res) => {
  try {

    const { eventId } = req.params;

    const [event] = await db.query(
      `
      SELECT *
      FROM events
      WHERE id = ?
      `,
      [eventId]
    );

    const [students] = await db.query(
      `
      SELECT
      users.id,
      users.name

      FROM registrations

      JOIN users
      ON registrations.student_id = users.id

      WHERE registrations.event_id = ?
      `,
      [eventId]
    );

    res.json({
      event: event[0],
      students,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch event details",
    });

  }
});

module.exports = router;