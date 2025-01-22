import { User } from "../models/user.model.ts";
import sequelize from "../database.ts";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt-ts";

dotenv.config({ path: "../.env.local" });
const secret: string = process.env.JWT_PRIV_KEY;

interface LoginRequestParams {
  email: string;
  password: string;
}

const issueJwt = (username: string, expiration: string | number) => {
  return jwt.sign({ username: username }, secret, {
    expiresIn: expiration,
  });
};

export default {
  login: async (req, res) => {
    console.log(req);
    const { email, password } = req.body;
    console.log(`${email} / ${password}`);

    const user = await User.findOne({
      where: { username: email },
    });

    if (!user) {
      return res.status(401).send({ error: "Authentication Failed" });
    }

    const passwordIsValid = await compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ error: "Authentication Failed" });
    }

    // create JWT token
    let token: string;
    try {
      token = issueJwt(email, "1h");
    } catch (err) {
      return res.status(500).send({
        error:
          "It is not possible to authenticate this user at this time:" + err,
      });
    }
    return res.status(200).send({ message: "Successful login.", token: token });
  },
  verify: async (req, res) => {
    // take in JWT token from request body
    const token = req.body.token;

    // verify the JWT token
    jwt.verify(token, secret, (err, decoded) => {
      // here 'decoded' is the payload of the JWT token after verification
      if (err) {
        return res.send({ error: "Invalid JWT token" });
      }

      // sending back the username means it's valid and proves we know the user
      return res.send({ message: "valid token", username: decoded.username });
    });
  },
};
