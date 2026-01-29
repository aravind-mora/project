import ServiceRequest from "../models/ServiceRequest.js";



export const createRequest = async (req, res) => {
    try {
        if (req.user.role !== "CUSTOMER") {
            return res.status(403).json({ message: "Only customers can request services" });
        }

        const request = await ServiceRequest.create({
            customer: req.user.id,
            status: "BIDDING",
            ...req.body
        });

        // 🔥 Real-time notify matching providers
        req.app.get("io")
            .to(`category:${request.category}`)
            .emit("service:request:new", request);

        res.status(201).json(request);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const getMyRequests = async (req, res) => {
    try {
        const requests = await ServiceRequest.find({ customer: req.user.id });
        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
