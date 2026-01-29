import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: String,
    email: { type: String, unique: true },
    mobile: String,
    password: String,
    role: { type: String, enum: ["CUSTOMER", "PROVIDER"], default: "CUSTOMER" },
    isVerified: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
