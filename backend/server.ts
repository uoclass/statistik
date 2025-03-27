/* Imports */
import { hash, compare } from "bcrypt-ts";
import { sign, verify } from "jsonwebtoken";
import express from "express";
import cors from "cors";
import morgan from "morgan";

/* Database */
import sequelize from "./database.ts";

/* Routes */
import ticketRoutes from "./api/ticketRoutes.ts";
import authRoutes from "./api/authRoutes.ts";
import { authenticationMiddleware } from "./api/authController.ts";

/* Middleware Setup */
const app = express();
const logger = morgan("combined");

app.use(cors());
app.use(express.json());
app.use(logger);

/* Mount routes */
app.use("/api/tickets", authenticationMiddleware, ticketRoutes);
app.use("/api/auth", authRoutes);

/* Configure Server Listener */
const serverPort = process.env.SERVER_PORT;
sequelize.sync().then((req) => {
  app.listen(serverPort, () => {
    console.log(`Server listening on port ${serverPort}`);
  });
});
