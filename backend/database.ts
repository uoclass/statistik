import { Sequelize } from "@sequelize/core";
import { hashSync } from "bcrypt-ts/browser";
import { MySqlDialect } from "@sequelize/mysql";
import dotenv from "dotenv";

/* Models */
import { Ticket } from "./models/ticket.model.ts";
import { User } from "./models/user.model.ts";
import { Diagnosis } from "models/diagnosis.model.ts";

dotenv.config({ path: "./.env.local" });

/* Initialize database with models */
const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  host: process.env.DB_ADDR,
  port: Number(process.env.DB_SERVER_PORT),
  password: process.env.DB_PASSWORD,
  models: [User, Ticket, Diagnosis],
  logging: console.log,
});

/* SEED DATA */
/*
await sequelize.sync();

const diagnoses = [
  { value: "HyFlex/Room Camera" },
  { value: "Blu-Ray/DVD Player" },
  { value: "Touch Panel" },
  { value: "Document Camera" },
  { value: "Cable--HDMI" },
  { value: "Cable-Ethernet" },
  { value: "Cable-Other (describe below)" },
  { value: "Microphone" },
  { value: "Assistive Listening Device" },
  { value: "Projector" },
  { value: "Tech Tour" },
  { value: "TV Display" },
  { value: "Transmitter/Receiver" },
  { value: "DM Controller" },
  { value: "Scaler" },
  { value: "Network Switch" },
  { value: "Power Strip/Surge Protector" },
  { value: "User Error" },
  { value: "Not a Classroom Support Issue" },
  { value: "Spam Call" },
  { value: "Adapter loan" },
  { value: "Equipment Request" },
  { value: "Other (provide description below)" },
];

await Diagnosis.bulkCreate(diagnoses, { ignoreDuplicates: false });

console.log("Diagnoses seeded!");

// Add test user
const hashedPass = hashSync("test");
await User.create({
  username: "test@test.edu",
  password: hashedPass,
});

// Add mocked ticket
const ticket = await Ticket.create({
  ticket_id: "1",
  title: "Title",
  assigned_to: "Classroom Sup",
  requestor: "Me",
  email: "test@edu",
  department: "CS",
  location: "here",
  room: "123",
  created: Date.now().toString(),
  modified: Date.now().toString(),
  status: "closed",
});

const diagnosisList = "Microphone, Assistive Listening Device";
const d = await Diagnosis.findAll({
  where: {
    value: diagnosisList.split(", "),
  },
});

await ticket.setDiagnoses(d);
*/

export default sequelize;
