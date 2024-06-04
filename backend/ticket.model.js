const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  "tstat_db",
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established.");
  })
  .catch((error) => {
    console.error("Unable to connect to database:", error);
  });

// auto-specifies 'Tickets' table in the tstat_db database
const Ticket = sequelize.define("Ticket", {
  title: {
    type: DataTypes.STRING,
  },
  resp_group: {
    type: DataTypes.STRING,
  },
  requestor: {
    type: DataTypes.STRING,
  },
  requestor_email: {
    type: DataTypes.STRING,
  },
  requestor_phone: {
    type: DataTypes.STRING,
  },
  acct_dept: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
  },
  location_room: {
    type: DataTypes.STRING,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Tickets table accessed successfully.");
  })
  .catch((error) => {
    console.error("Unable to access table: ", error);
  });
