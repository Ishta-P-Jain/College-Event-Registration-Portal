const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/login", async (req, res) => {
  try {

    const { username, password } = req.body;

    const [users] = await db.query(
      `
      SELECT *
      FROM users
      WHERE username = ?
      `,
      [username]
    );

    if (users.length === 0) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const user = users[0];

    if (user.password !== password) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    res.status(200).json({
      message: "Login successful",
      user,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Login failed",
    });

  }
});

module.exports = router;