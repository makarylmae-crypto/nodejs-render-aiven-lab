const express = require("express");
const mysql = require("mysql2");

const app = express();

const db = mysql.createConnection({
  // Use env variables first, fall back to your specific Aiven details
  host: process.env.DB_HOST || "mysql-3597ae11-makarylmae-fccb.e.aivencloud.com",
  user: process.env.DB_USER || "avnadmin",
  password: process.env.DB_PASSWORD || "AVNS_wpow1XW33XtmW6RqrPR",
  database: process.env.DB_NAME || "defaultdb",
  port: process.env.DB_PORT || 24521,
  // CRITICAL: Aiven requires SSL to allow the connection
  ssl: {
    rejectUnauthorized: false 
  }
});

// Test connection on startup to catch errors early
db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.message);
    return;
  }
  console.log("Connected to Aiven MySQL");
});

app.get("/", (req, res) => {
  db.query("SELECT NOW()", (err, result) => {
    if (err) {
      console.error("Query Error:", err.message);
      return res.status(500).send("Database Error: " + err.message);
    }
    res.send("Database Connected Successfully: " + result[0]["NOW()"]);
  });
});

const PORT = process.env.PORT || 10000; // Render prefers 10000
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
