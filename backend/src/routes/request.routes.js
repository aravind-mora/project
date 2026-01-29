import express from "express";
import { createRequest, getMyRequests } from "../controllers/request.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createRequest);
router.get("/mine", protect, getMyRequests);

export default router;
