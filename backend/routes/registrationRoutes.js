const express = require("express");
const router = express.Router();
const db = require("../config/db");



router.post("/", async (req, res) => {
  try {
    const { studentId, eventId } = req.body;

    // Check event capacity
    const [eventRows] = await db.query(
      `
      SELECT capacity
      FROM events
      WHERE id = ?
      `,
      [eventId]
    );

    if (eventRows.length === 0) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    const capacity = eventRows[0].capacity;

    const [countRows] = await db.query(
      `
      SELECT COUNT(*) AS total
      FROM registrations
      WHERE event_id = ?
      `,
      [eventId]
    );

    const registeredCount = countRows[0].total;

    // Event full check
    if (registeredCount >= capacity) {
      return res.status(400).json({
        message: "Event is full",
      });
    }

    const [existing] = await db.query(
      `
      SELECT *
      FROM registrations
      WHERE student_id = ?
      AND event_id = ?
      `,
      [studentId, eventId]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        message: "Already registered for this event",
      });
    }

    await db.query(
      `
      INSERT INTO registrations
      (student_id, event_id)
      VALUES (?, ?)
      `,
      [studentId, eventId]
    );

    res.status(201).json({
      message: "Registration successful",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Registration failed",
    });
  }
});

router.get("/:studentId", async (req, res) => {
  try {

    const { studentId } = req.params;

    const [registrations] = await db.query(
      `
      SELECT
        events.id,
        events.event_name,
        events.event_date,
        events.venue

      FROM registrations

      JOIN events
      ON registrations.event_id = events.id

      WHERE registrations.student_id = ?
      `,
      [studentId]
    );

    res.status(200).json(registrations);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch registrations",
    });

  }
});

module.exports = router;