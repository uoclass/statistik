/*
 * Server Backend
 * by Eric Edwards, Alex JPS
 * 2024-05-30
 *
 * Validates username and password and provides a JWT token.
 * Also verifies JWT tokens.
 *
 * Provides functions for interfacing with TDX API, creating new users, and refreshing Ticket database.
 */

// imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");

require("dotenv").config({ path: "../.env.local" });
require("dotenv").config({ path: ".env.local" });

const app = express();
app.use(express.json());
app.use(cors());

// sequelize models
const db = require("./models");
const { User, Ticket } = require("./models");

// listen on port DB_PORT
db.sequelize.sync().then((req) => {
  app.listen(process.env.REACT_APP_DB_PORT || 8080, () => {
    console.log(`Listening on port ${process.env.REACT_APP_DB_PORT}`);
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

// tdx data request helpers
async function fetchAdminApiToken(apiMode) {
  // https://ufl.teamdynamix.com/TDWebApi/Home/section/Auth#POSTapi/auth/loginadmin
  // mode: TDWebApi | SBTDWebApi
  if (apiMode !== "TDWebApi" && apiMode !== "SBTDWebApi") {
    console.log(apiMode);
    console.log("Undefined API mode. Use 'SBTDWebApi' or 'TDWebApi'");
    return { error: "Undefined API mode." };
  }
  let api_url = `https://service.uoregon.edu/${apiMode}/api/auth/loginadmin`;

  const credentials_body = JSON.stringify({
    BEID: process.env.TDX_ADMIN_BEID,
    WebServicesKey: process.env.TDX_ADMIN_WEBKEY,
  });

  // send post request to tdx api to recieve bearer token
  return fetch(api_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: credentials_body,
  })
    .then((response) => console.log(response.status) || response)
    .then((response) => response.text())
    .then((body) => {
      return body;
    });
}

async function fetchNewTicketReport() {
  // report request parameters
  const admin_bearer_token = await fetchAdminApiToken(
    process.env.API_ENVIRONMENT_MODE,
  );
  const reportId = 224500; // tstat Standard Report id
  const withData = true; // include data in http respones
  const dataSortExpression = ""; // default sorting

  // format the report uri
  const saved_report_url =
    `https://service.uoregon.edu/${process.env.API_ENVIRONMENT_MODE}` +
    `/api/reports/${reportId}?withData=${withData}&dataSortExpression=${dataSortExpression}`;

  const report_request = await fetch(saved_report_url, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${admin_bearer_token}`,
    },
    method: "GET",
  });

  if (!report_request.ok) {
    return { error: "Failed to fetch report." };
  }

  const data = await report_request.json();
  return data;
}

const ticketDataKeys = [
  "ticket_id",
  "title",
  "assigned_to",
  "requester",
  "email",
  "department",
  "location",
  "room",
  "created",
  "modified",
  "status",
  "diagnoses",
];

/**
 * Takes in a filter object and returns a formatted object suitable for a Sequelize 'where' query.
 * @param {Object} filter - An object that includes the filter properties to query the report cache with.
 */
function formatQueryFilter(filter) {
  let whereClause = Object.fromEntries(
    ticketDataKeys.reduce((result, key) => {
      if (filter[key]) {
        result.push(["jsonAttribute." + key, filter[key]]);
      }
      return result;
    }, []),
  );

  return whereClause;
}

async function fetchTicketsFromReportCache(filter) {
  const formattedFilter = formatQueryFilter(filter);

  const tickets = await Ticket.findAll({
    where: formattedFilter,
  });

  return tickets;
}

async function refreshTicketData() {
  const data = await fetchNewTicketReport();

  const { DataRows, DisplayedColumns } = data;
  // insert members of data into Tickets table -> data.DataRows[0] -> [len(DataRows)]

  // iterate through each row in the DataRows array
  for (let i = 0; i < DataRows.length; i++) {
    const row = DataRows[i];
    try {
      await Ticket.create({
        data: {
          ticket_id: row.TicketID,
          title: row.Title,
          assigned_to: row.ResponsibleGroupName,
          requester: row.CustomerName,
          email: row.ContactEmail,
          department: row.AccountName,
          location: row.LocationName,
          room: row.LocationRoomName,
          created: row.CreatedDate,
          modified: row.LastModifiedDate,
          status: row.StatusName,
          diagnoses: row["132559"], // NOTE -> This corresponds to the "diagnosis" header. Could refactor to read from { DisplayedColumns }
        },
      });
    } catch (error) {
      console.error(`Error inserting ticket ${row.ID}: ${error}`);
      return { error: error };
    }
  }
  const message = { message: "Completed update in refreshTicketData()" };
  console.log(message.message);
  return message;
}

/** HTTP API ENDPOINTS **/

app.get("/api", (req, res) => {
  res.send("You have reached the Statistik API");
});

/* Verification Endpoints */

/* JWT Authorization: POST { enail: <username>, password: <password> } */
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

  // create JWT token
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

/* JWT Verification: POST { token: <token> } */
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
    return res.send({ message: "valid token", username: decoded.username });
  });
});

/* Ticket Database Interaction Endpoints */

/* TDX Filtered Ticket Fetching from Report Cache: POST { ticketFilter: {<filter>: <parameter>,} } */
app.get("/api/tickets/fetch-filtered-tickets", async (req, res) => {
  return res.send();
});

/* TDX Report Fetching: GET */
app.get("/api/tickets/fetch-new-report", async (req, res) => {
  const data = await fetchNewTicketReport();

  if (data.error) {
    return res.status(400).json({ error: "Failed to fetch report." });
  }

  return res.json(data);
});

/* Get date and time that Report Cache was generated */
app.get("/api/tickets/report-cache-generation-time", async (req, res) => {
  return res.status(200).json({date: 1736374451097 });
});

/* Ticket Report Cache Refreshing: POST {} */
app.post("/api/tickets/refresh-report", async (req, res) => {
  const update = await refreshTicketData();

  if (update.error) {
    return res
      .status(400)
      .json({ error: "Failed to update database to most recent report." });
  }

  return res.status(200).json({ message: "Completed report update." });
});

module.exports = { fetchAdminApiToken, refreshTicketData };
