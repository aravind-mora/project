import express from "express";
import { createService, getMyServices } from "../controllers/service.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createService);
router.get("/mine", protect, getMyServices);

export default router;
