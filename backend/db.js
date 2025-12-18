const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12812356",
  password: "bndr43IGqb",
  database: "sql12812356"
});

db.connect(err => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("Connected to cloud MySQL");
  }
});

module.exports = db;
