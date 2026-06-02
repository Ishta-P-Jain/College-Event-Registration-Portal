
const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const [events] = await db.query(`
      SELECT *
      FROM events
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

module.exports = router;