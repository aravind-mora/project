import Job from "../models/Job.js";

export default (io, socket) => {

    socket.on("job:complete", async ({ jobId }) => {
        const job = await Job.findById(jobId);
        if (!job) return;

        // Only provider can complete job
        if (job.provider.toString() !== socket.user.id) return;

        job.status = "COMPLETED";
        await job.save();

        // Notify both customer & provider
        io.to(`job:${jobId}`).emit("job:status:update", {
            jobId,
            status: "COMPLETED"
        });
    });
};
