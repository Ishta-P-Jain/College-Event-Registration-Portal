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

module.exports = router;