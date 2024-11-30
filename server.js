const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const pool = new Pool({
  user: "your_username",
  host: "localhost",
  database: "your_database",
  password: "your_password",
  port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

app.get("/api/notes", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM notes ORDER BY timestamp DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/api/notes", async (req, res) => {
  const { content, timestamp, color } = req.body;
  try {
    await pool.query(
      "INSERT INTO notes (content, timestamp, color) VALUES ($1, $2, $3)",
      [content, timestamp, color]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM notes WHERE id = $1", [id]);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
