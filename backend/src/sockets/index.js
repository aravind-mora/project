import jwt from "jsonwebtoken";
import biddingSocket from "./bidding.socket.js";
import chatSocket from "./chat.socket.js";
import jobSocket from "./job.socket.js";

export default (io) => {
    io.use((socket, next) => {
        try {
            const token = socket.handshake.auth?.token;
            if (!token) return next(new Error("No token"));

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.user = decoded; // { id, role, category }
            next();
        } catch {
            next(new Error("Invalid token"));
        }
    });

    io.on("connection", (socket) => {

        socket.join(`user:${socket.user.id}`);

        socket.on("join:request", ({ requestId }) => {
            if (requestId) {
                socket.join(`request:${requestId}`);
            }
        });

        if (
            socket.user.role === "PROVIDER" &&
            typeof socket.user.category === "string"
        ) {
            if (
                socket.user.role === "PROVIDER" &&
                typeof socket.user.category === "string"
            ) {
                socket.join(`category:${socket.user.category}`);
            }

            socket.join(`provider:${socket.user.id}`);
        }

        biddingSocket(io, socket);
        chatSocket(io, socket);
        jobSocket(io, socket);
    });
};
