// imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const app = express();
const { Sequelize } = require("sequelize");

// environment variables
require("dotenv").config();

// sequelize models
import { User, Ticket } from "./models";

app.use(express.json());
app.use(cors());

const jwtSecretKey = process.env.JWT_PRIV_KEY;

app.listen(8081, () => {
  console.log("Listening on port 8081");
});

// verification routes
app.get("/api/auth", async (req, res) => {
  const { username, password } = await User.findOne({
    where: {
      username: req.username,
    },
  }).then((password) => {
    const passwordIsValid = bcrypt.compare(req.password, password);
  });
});
