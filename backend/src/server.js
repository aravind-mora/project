import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import initSockets from "./sockets/index.js";

dotenv.config();
connectDB();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
});

initSockets(io);
app.set("io", io);

server.listen(process.env.PORT, () => {
    console.log(`🚀 Backend running on port ${process.env.PORT}`);
});
