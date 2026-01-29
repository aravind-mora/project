export default function biddingSocket(io, socket) {

    // Provider places a bid
    socket.on("bid:create", async ({ requestId, amount, message }) => {
        if (socket.user.role !== "PROVIDER") return;

        const request = await ServiceRequest.findById(requestId);
        if (!request) return;

        const bid = await Bid.create({
            request: requestId,
            provider: socket.user.id,
            amount,
            message
        });

        // Notify ONLY the customer
        io.to(`request:${requestId}`).emit("bid:update", bid);
    });

    // Customer accepts a bid
    socket.on("bid:accepted", async ({ bidId }) => {
        const bid = await Bid.findById(bidId).populate("request");
        if (!bid) return;

        if (bid.request.customer.toString() !== socket.user.id) return;

        await Bid.updateMany(
            { request: bid.request._id },
            { status: "REJECTED" }
        );

        bid.status = "ACCEPTED";
        await bid.save();

        bid.request.status = "ACCEPTED";
        await bid.request.save();

        // Notify provider
        io.to(`provider:${bid.provider}`).emit("bid:accepted", {
            jobId: bid.request._id
        });
    });
}
