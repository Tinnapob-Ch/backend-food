import { Router } from "express";
import * as authController from "./auth.controller.js";
import { validateToken } from "../middleware.js";

const router = Router();

router.post("/login", authController.login);
router.get("/profile", validateToken, authController.getProfile);

export default router;