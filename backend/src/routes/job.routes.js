import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { startJob, completeJob } from "../controllers/job.controller.js";

const router = express.Router();

router.patch("/:requestId/start", protect, startJob);
router.patch("/:requestId/complete", protect, completeJob);

export default router;
