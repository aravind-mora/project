import ServiceRequest from "../models/ServiceRequest.js";

export const startJob = async (req, res) => {
    try {
        const { requestId } = req.params;
        const request = await ServiceRequest.findById(requestId);

        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        if (request.status !== "ACCEPTED") {
            return res.status(400).json({ message: "Job cannot be started" });
        }

        request.status = "IN_PROGRESS";
        await request.save();

        req.app.get("io")
            .to(`request:${requestId}`)
            .emit("job:status:update", request);

        res.json(request);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const completeJob = async (req, res) => {
    try {
        const { requestId } = req.params;
        const request = await ServiceRequest.findById(requestId);

        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        if (request.status !== "IN_PROGRESS") {
            return res.status(400).json({ message: "Job not in progress" });
        }

        request.status = "COMPLETED";
        await request.save();

        req.app.get("io")
            .to(`request:${requestId}`)
            .emit("job:status:update", request);

        res.json(request);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
