import { User } from "../models/user.model.ts";
import sequelize from "../database.ts";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { compareSync } from "bcrypt-ts";
import type { Request, Response } from "express";

dotenv.config({ path: "../.env.local" });
const secret: string = process.env.JWT_PRIV_KEY;

const issueJwt = (username: string, expiration: string | number) => {
  return jwt.sign({ username: username }, secret, {
    expiresIn: expiration,
  });
};

export default {
  login: async (req: Request, res: Response) => {
    console.log(req);
    const { email, password } = req.body;
    // console.log(`${email} / ${password}`);

    let failed: boolean = false;

    await User.findOne({
      where: { username: email },
    }).then((user) => {
      if (!user) {
        failed = true;
        res.status(401).send({ error: "Authentication Failed" });
      }

      const passwordIsValid = compareSync(password, user?.password!);
      if (!passwordIsValid) {
        failed = true;
        res.status(401).send({ error: "Authentication Failed" });
      }
    });

    if (failed) {
      return;
    }

    // create JWT token
    let token: string;
    try {
      token = issueJwt(email, "1h");
    } catch (err) {
      res.status(500).send({
        error:
          "It is not possible to authenticate this user at this time:" + err,
      });
      return;
    }
    res.status(200).send({ message: "Successful login.", token: token });
    return;
  },

  verify: async (req: Request, res: Response) => {
    // take in JWT token from request body
    const token = req.body.token;

    // verify the JWT token
    jwt.verify(token, secret, (err, decoded) => {
      // here 'decoded' is the payload of the JWT token after verification
      if (err) {
        return res.status(403).send({ error: "Invalid JWT token" });
      }

      // sending back the username means it's valid and proves we know the user
      return res.status(200).send({
        message: "valid token",
        username: decoded.username,
      });
    });
  },
};
