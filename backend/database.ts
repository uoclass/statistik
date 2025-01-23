import { Sequelize } from "@sequelize/core";
import { hashSync } from "bcrypt-ts/browser";
import { MySqlDialect } from "@sequelize/mysql";
import dotenv from "dotenv";

/* Models */
import { Ticket } from "./models/ticket.model.ts";
import { User } from "./models/user.model.ts";

dotenv.config({ path: "./.env.local" });

/* Initialize database with models */
const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  host: process.env.DB_ADDR,
  port: Number(process.env.DB_SERVER_PORT),
  password: process.env.DB_PASSWORD,
  models: [User, Ticket],
  logging: console.log,
});

/* Add test user */

const hashedPass = hashSync("test");
await User.create({
  username: "test@test.edu",
  password: hashedPass,
});

export default sequelize;
