import dotenv from "dotenv";
dotenv.config(); // ✅ MUST be first

// 🔍 ENV CHECK (Brevo)
console.log("ENV CHECK:");
console.log("SMTP_HOST =", process.env.SMTP_HOST);
console.log("SMTP_PORT =", process.env.SMTP_PORT);
console.log("SMTP_USER =", process.env.SMTP_USER);
console.log("SMTP_PASS exists =", !!process.env.SMTP_PASS);
console.log("OTP_EMAIL =", process.env.OTP_EMAIL);

import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import initSockets from "./sockets/index.js";

// ✅ Connect DB after env is loaded
connectDB();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
});

// ✅ Init sockets
initSockets(io);

// ✅ Make io accessible in controllers
app.set("io", io);

// ✅ Start server
server.listen(process.env.PORT, () => {
    console.log(`🚀 Backend running on port ${process.env.PORT}`);
});
