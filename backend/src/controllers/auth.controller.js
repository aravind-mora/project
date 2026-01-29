import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { transporter } from "../config/mail.js";

const otpStore = new Map();

export const sendOTP = async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email, { otp, expires: Date.now() + 5 * 60 * 1000 });

    await transporter.sendMail({
        from: `"SocioSphere" <${process.env.OTP_EMAIL}>`,
        to: email,
        subject: "Your OTP",
        html: `<h2>Your OTP: ${otp}</h2>`
    });

    res.json({ message: "OTP sent" });
};

export const signup = async (req, res) => {
    const { fullName, email, mobile, password, otp, role } = req.body;
    const record = otpStore.get(email);

    if (!record || record.otp !== otp || record.expires < Date.now()) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
        fullName,
        email,
        mobile,
        password: hashed,
        role: role || "CUSTOMER",
        isVerified: true
    });
    otpStore.delete(email);

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
};
export const login = async (req, res) => {
    const { email, password, otp } = req.body;

    const record = otpStore.get(email);
    if (!record || record.otp !== otp || record.expires < Date.now()) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    otpStore.delete(email);

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.json({ token });
};
