import Bid from "../models/Bid.js";
import Job from "../models/Job.js";
import ServiceRequest from "../models/ServiceRequest.js";

export const acceptBid = async (req, res) => {
    const { bidId } = req.params;
    const userId = req.user.id;

    const bid = await Bid.findById(bidId);
    if (!bid) return res.status(404).json({ message: "Bid not found" });

    const request = await ServiceRequest.findById(bid.requestId);
    if (!request || request.userId.toString() !== userId) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    // Accept selected bid
    bid.status = "ACCEPTED";
    await bid.save();

    // Reject others
    await Bid.updateMany(
        { requestId: bid.requestId, _id: { $ne: bidId } },
        { status: "REJECTED" }
    );

    // Create job
    const job = await Job.create({
        requestId: bid.requestId,
        providerId: bid.providerId,
        userId,
        price: bid.amount,
        status: "IN_PROGRESS"
    });

    // Update request
    request.status = "ASSIGNED";
    await request.save();

    res.json({ jobId: job._id });
};
