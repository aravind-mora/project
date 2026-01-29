import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import requestRoutes from "./routes/request.routes.js";
import jobRoutes from "./routes/job.routes.js";
import profileRoutes from "./routes/profile.routes.js";

import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// 🔐 CORS
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    })
);

// 📦 BODY PARSER
app.use(express.json());

// 🔗 ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/profile", profileRoutes);

// ❗ ERROR HANDLER (MUST BE LAST)
app.use(errorHandler);

export default app;
