import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
    request: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceRequest",
        required: true
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: { type: Number, required: true },
    message: String,
    status: {
        type: String,
        enum: ["PENDING", "ACCEPTED", "REJECTED"],
        default: "PENDING"
    }
}, { timestamps: true });

export default mongoose.model("Bid", bidSchema);
