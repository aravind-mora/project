import mongoose from "mongoose";

const serviceRequestSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    category: { type: String, required: true },
    description: { type: String, required: true },
    preferredDate: { type: Date, required: true },
    preferredTime: { type: String, required: true },
    location: {
        address: String,
        lat: Number,
        lng: Number
    },
    contactNumber: { type: String, required: true },
    status: {
        type: String,
        enum: [
            "REQUESTED",
            "BIDDING",
            "ACCEPTED",
            "IN_PROGRESS",
            "COMPLETED",
            "CANCELLED"
        ],
        default: "REQUESTED"
    }

}, { timestamps: true });

export default mongoose.model("ServiceRequest", serviceRequestSchema);
