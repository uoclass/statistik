import { Sequelize } from "@sequelize/core";
import { hashSync } from "bcrypt-ts/browser";
import { MySqlDialect } from "@sequelize/mysql";
import dotenv from "dotenv";

/* Models */
import { Ticket } from "./models/ticket.model.ts";
import { User } from "./models/user.model.ts";
import { Diagnosis } from "./models/diagnosis.model.ts";
import { Display, type ViewConfig } from "./models/display.model.ts";

dotenv.config({ path: "./.env.local" });

/* Initialize database with models */
const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  host: process.env.DB_ADDR,
  port: Number(process.env.DB_SERVER_PORT),
  password: process.env.DB_PASSWORD,
  models: [User, Ticket, Diagnosis, Display],
  logging: console.log,
});

/* SEED DATA */
const SEED_DATA = process.env.SEED_MODE_ON;
await sequelize.sync();

if (SEED_DATA) {
  // seed test user
  const hashedPass = hashSync(process.env.SEED_PASSWORD);
  await User.findOrCreate({
    where: {
      username: process.env.SEED_USERNAME,
      fullName: process.env.SEED_FULLNAME,
      password: hashedPass,
    },
  });

  // seed saved display
  const exampleDisplayConfig: ViewConfig = {
    layout: "chart",
    building: [],
    requestor: [],
    diagnoses: [],
    grouping: "building",
    termStart: "",
    termEnd: "",
    room: "",
    matchAllDiagnoses: false,
  };

  User.findByPk(1).then((user) =>
    user?.createDisplay({ viewConfig: exampleDisplayConfig }),
  );
}

export default sequelize;
