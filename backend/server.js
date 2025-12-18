const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = require("./db");

/* ================= REGISTER ================= */
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
      err => {
        if (err) {
          return res.status(400).json({ message: "User already exists" });
        }
        res.json({ message: "Registration successful" });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= LOGIN ================= */
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      if (result.length === 0) {
        return res.status(401).json({ message: "Invalid username" });
      }

      const isMatch = await bcrypt.compare(password, result[0].password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }

      res.json({ message: "Login successful" });
    }
  );
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
