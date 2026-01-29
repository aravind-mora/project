import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.DATABASE_NAME
        });
        console.log("✅ MongoDB connected");
    } catch (err) {
        console.error("❌ MongoDB error:", err.message);
        process.exit(1);
    }
};
