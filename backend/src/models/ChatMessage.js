import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema(
    {
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        message: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model("ChatMessage", chatMessageSchema);
