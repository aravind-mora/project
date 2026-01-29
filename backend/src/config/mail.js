import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.OTP_EMAIL,
        pass: process.env.OTP_EMAIL_PASSWORD
    }
});
