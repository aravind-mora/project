import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    request: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceRequest",
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: { type: String, required: true },
    seen: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Chat", chatSchema);
