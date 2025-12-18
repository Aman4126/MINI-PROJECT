const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Aman@#2579",
  database: "auth_db"
});

db.connect(err => {
  if (err) {
    console.error("DB error:", err);
  } else {
    console.log("MySQL connected");
  }
});

// REGISTER
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const hashed = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, hashed],
    err => {
      if (err) {
        return res.status(400).json({ message: "User already exists" });
      }
      res.json({ message: "Registration successful" });
    }
  );
});

// LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, result) => {
      if (result.length === 0) {
        return res.status(401).json({ message: "Invalid username" });
      }

      const match = await bcrypt.compare(password, result[0].password);
      if (!match) {
        return res.status(401).json({ message: "Invalid password" });
      }

      res.json({ message: "Login successful" });
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

