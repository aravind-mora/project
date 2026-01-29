import express from "express";
import { acceptBid } from "../controllers/bid.controller.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/:bidId/accept", auth, acceptBid);

export default router;

