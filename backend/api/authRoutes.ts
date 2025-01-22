import { Router } from "express";
import controller from "./authController.ts";

const router = Router();

router.post("/login", controller.login);
router.post("/verify", controller.verify);

export default router;
