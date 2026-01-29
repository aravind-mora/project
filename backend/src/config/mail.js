import dotenv from "dotenv";
dotenv.config(); // ✅ ADD THIS

import nodemailer from "nodemailer";

console.log("📨 Mailer ENV HOST:", process.env.SMTP_HOST);

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});
