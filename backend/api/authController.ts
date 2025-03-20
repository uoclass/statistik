import { User } from "../models/user.model.ts";
import sequelize from "../database.ts";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { compareSync } from "bcrypt-ts";
import { NextFunction, Request, Response } from "express";

dotenv.config({ path: "../.env.local" });
const secret: string = process.env.JWT_PRIV_KEY;

declare global {
  namespace Express {
    interface Request {
      username?: any;
    }
  }
}

const issueJwt = (username: string, expiration: string | number) => {
  return jwt.sign({ username: username }, secret, {
    expiresIn: expiration,
  });
};

export const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Authentication failed." });
    return;
  }

  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      console.error(error);
      res.status(403).json({ message: "Invalid token." });
      return;
    }

    const tokenPayload = decoded as jwt.JwtPayload & { username: string };
    req.username = tokenPayload.username;

    next();
  });
};

export default {
  login: async (req: Request, res: Response) => {
    console.log(req);
    const { email, password } = req.body;
    // console.log(`${email} / ${password}`);

    let failed: boolean = false;

    const user = await User.findOne({
      where: { username: email },
    });

    if (!user) {
      failed = true;
      res.status(401).send({ error: "Authentication Failed" });
      return;
    }

    const passwordIsValid = compareSync(password, user?.password!);
    if (!passwordIsValid) {
      failed = true;
      res.status(401).send({ error: "Authentication Failed" });
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
