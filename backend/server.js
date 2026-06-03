const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const app = express();

const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoutes");

app.use(cors()); 

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/registrations", registrationRoutes);

app.use("/api/events", eventRoutes);

db.query("SELECT 1")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});