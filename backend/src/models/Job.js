import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
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
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        price: Number,
        status: {
            type: String,
            enum: ["IN_PROGRESS", "COMPLETED"],
            default: "IN_PROGRESS"
        }
    },
    { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
