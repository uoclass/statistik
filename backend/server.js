// imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const jwtSecretKey = process.env.JWT_PRIV_KEY;

app.listen(8081, () => {
  console.log("Listening on port 8081");
});

// connect tickets database
const mysql = require("mysql");
const ticket_db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.USER_ID,
  password: process.env.USER_PASSWORD,
  database: "tickets",
});

const user_credentials_db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.USER_ID,
  password: process.env.USER_PASSWORD,
  database: "user_credentials",
});

ticket_db.connect(function (err) {
  if (err) throw err;
  console.log("Ticket database connected.");
});

user_credentials_db.connect(function (err) {
  if (err) throw err;
  console.log("Credentials database connected.");
});

// verification routes
app.get("/api/auth", (req, res) => {
  const username = req.get("username");
  const q = "SELECT password_hash FROM credentials WHERE username=" + username;
  user_credentials_db.query(q, (err, data) => {
    if (err) return res.json({ error: err.sqlMessage });
    const passwordIsValid = bcrypt.compare(
      req.get("password", data["password"]),
    );
  });
});
