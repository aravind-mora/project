import express from "express";
import { sendOTP, signup, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/signup", signup);
router.post("/login", login);
export default router;
