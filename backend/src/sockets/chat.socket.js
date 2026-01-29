import ChatMessage from "../models/ChatMessage.js";

export default (io, socket) => {

    // ✅ Join job-specific chat room
    socket.on("chat:join", ({ jobId }) => {
        socket.join(`job:${jobId}`);
    });

    // ✅ Typing indicator
    socket.on("chat:typing", ({ jobId }) => {
        socket.to(`job:${jobId}`).emit("chat:typing", {
            userId: socket.user.id
        });
    });

    // ✅ Send chat message (JOB SCOPED)
    socket.on("chat:message", async ({ jobId, message }) => {
        if (!message || !jobId) return;

        const chat = await ChatMessage.create({
            job: jobId,
            sender: socket.user.id,
            message
        });

        io.to(`job:${jobId}`).emit("chat:message", {
            _id: chat._id,
            message: chat.message,
            sender: socket.user.id,
            createdAt: chat.createdAt
        });
    });
};
