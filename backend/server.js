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

require("dotenv").config({ path: "../.env" });

const app = express();
app.use(express.json());
app.use(cors());

// sequelize models
const db = require("./models");
const { User, Ticket } = require("./models");

// listen on port DB_PORT
db.sequelize.sync().then((req) => {
  app.listen(process.env.DB_PORT, () => {
    console.log(`Listening on port ${process.env.DB_PORT}`);
  });
});

// set the JWT secret key, protected by environment variable
const jwtSecretKey = process.env.JWT_PRIV_KEY;

// print my ip address
const ip = require("ip");
console.log(ip.address());

/*
 * Helper function for issuing a new JWT to the user.
 * This returns the JWT or an error message if the JWT could not be issued.
 */
function issue_new_jwt(r_username, expiration) {
  try {
    // create a new JWT token
    return jwt.sign({ username: r_username }, jwtSecretKey, {
      expiresIn: expiration,
    });
  } catch (err) {
    throw new Error("Could not issue a new JWT token: " + err);
  }
}

// API routes

// Define home route for API
app.get("/api", (req, res) => {
  res.send("You have reached the tstat-web authentication API");
});

// verification routes
app.post("/api/auth", async (req, res) => {
  // NOTE this is a basic implementation of authentication, check the Clerk.com tutorial to improve later
  // take in username and password from request body

  console.log(req.params["username"]);
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { username: email },
  });

  if (!user) {
    return res.status(401).send({ error: "Authentication Failed" });
  }

  console.log(`request password: ${password}, user.password: ${user.password}`);
  const passwordIsValid = await bcrypt.compare(password, user.password);

  // reject invalid password login
  if (!passwordIsValid) {
    return res.status(401).send({ error: "Authentication Failed" });
  }
  console.log("Password validated!");

  // create a JWT token
  var token;
  try {
    token = issue_new_jwt(email, "1h");
  } catch (err) {
    return res.send({
      error:
        "It is not possible to authenticate this user at this time (error 1003): " +
        err,
    });
  }

  return res.send({ message: "success", token: token });
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
    return res.send({ message: 'valid token', username: decoded.username });
  });
});
