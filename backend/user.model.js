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

// auto-specifies 'Users' table in the tstat_db database
const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.CHAR(60).BINARY,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Users table accessed successfully.");
  })
  .catch((error) => {
    console.error("Unable to access table: ", error);
  });
