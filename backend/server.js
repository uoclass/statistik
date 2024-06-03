/*
 * Server Backend
 * by Eric Edwards, Alex JPS
 * 2024-05-30
 *
 * Validates username and password and provides a JWT token.
 * Also verifies JWT tokens.
 */

// imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
require('dotenv').config({path: "./secretkey.env"});

const app = express();
app.use(express.json());
app.use(cors());

// set the JWT secret key, protected by environment variable
const jwtSecretKey = process.env.JWT_SECRET_KEY;


// print my ip address
const ip = require('ip');
console.log(ip.address());

console.log("Making sure the env variables work.");
console.log(process.env.JWT_SECRET_KEY);


// connect tickets database
// const ticket_db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

const user_credentials_db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "user_credentials"
});

// ticket_db.connect(function (err) {
//   if (err) throw err;
//   console.log("Ticket database connected.");
// });

user_credentials_db.connect(function (err) {
  if (err) throw err;
  console.log("Credentials database connected.");
});

/* Helper function for issuing a new JWT to the user.
This returns the JWT or an error message if the JWT could not be issued.
 */
function issue_new_jwt(username, expiration) {
    try {
        // create a new JWT token
        return jwt.sign({username: username}, jwtSecretKey, {expiresIn: expiration,});
    } catch (err) {
        throw new Error("Could not issue a new JWT token.");
    }
}


// API routes

// Define home route for API
app.get('/api', (req, res) => {
  res.send("You have reached the tstat-web authentication API");
})

// verification routes
app.post("/api/auth", (req, res) => {
  // NOTE this is a basic implementation of authentication, check the Clerk.com tutorial to improve later
  // take in username and password from request body
  const { username , password } = req.body;

  // find the matching entry in the SQL database
  const password_hash_query = "SELECT password_hash FROM credentials WHERE username=?";

  user_credentials_db.query(password_hash_query, username, async (err, data) => {
    if (err) {
      // send error message if query fails
      return res.send({ error: "It is not possible to authenticate this user at this time (error 1001)" });
    }

    // make sure length of data is just one object (i.e. only one entry per username)
    if (data.length !== 1) {
      return res.send({ error: "It is not possible to authenticate this user at this time (error 1002)" });
    }

    const passwordIsValid = await bcrypt.compare(password, data[0]["password_hash"]);

    // reject invalid password login
    if (!passwordIsValid) {
      return res.send({ error: "Invalid password" });
    }

    // create a JWT token
    var token;
    try {
      token = issue_new_jwt(username, "1h");
    } catch (err)  {
        return res.send({ error: "It is not possible to authenticate this user at this time (error 1003)" });
    }

    return res.send(token);
  });
});

// Define a route for verifying a JWT token
app.post("/api/verify", (req, res) => {
  // take in JWT token from request body
  const token = req.body.token;

  // verify the JWT token
  jwt.verify(token, jwtSecretKey, (err, decoded) => {
    // here 'decoded' is the payload of the JWT token after verification
    if (err) {
      return res.send({ error: "Invalid JWT token" });
    }

    // sending back the username means it's valid and proves we know the user
    return res.send({ username: decoded.username });
  });
});

// listen on port 3080
app.listen(3080, () => {
  console.log("Listening on port 8081");
});
