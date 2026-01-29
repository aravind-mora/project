import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    priceType: {
        type: String,
        enum: ["FIXED", "HOURLY"],
        required: true
    },
    basePrice: { type: Number, required: true },
    location: {
        address: String,
        lat: Number,
        lng: Number
    },
    availability: [String],
    images: [String],
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Service", serviceSchema);
