import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const shouldReduce = useReducedMotion();

    const [form, setForm] = useState({ email: "", password: "", otp: "" });
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500">
            <motion.div
                initial={shouldReduce ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduce ? false : { opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="bg-white/15 backdrop-blur-xl p-8 rounded-2xl w-full max-w-md shadow-2xl"
            >
                <h2 className="text-2xl font-bold text-white mb-4">Login</h2>

                <div className="space-y-3">
                    <input name="email" placeholder="Email" onChange={handleChange} className="w-full p-3 rounded-xl bg-white/90" />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-3 rounded-xl bg-white/90" />

                    {!otpSent ? (
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            onClick={async () => {
                                await api.post("/auth/send-otp", { email: form.email });
                                setOtpSent(true);
                            }}
                            className="w-full py-3 rounded-xl bg-orange-400 font-semibold"
                        >
                            Send OTP
                        </motion.button>
                    ) : (
                        <>
                            <input name="otp" placeholder="Enter OTP" onChange={handleChange} className="w-full p-3 rounded-xl bg-white/90" />
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                onClick={async () => {
                                    const res = await api.post("/auth/login", form);
                                    setToken(res.data.token);
                                    navigate("/home");
                                }}
                                className="w-full py-3 rounded-xl bg-green-400 font-semibold"
                            >
                                Verify & Login
                            </motion.button>
                        </>
                    )}

                    {error && <p className="text-red-200 text-sm">{error}</p>}
                </div>
            </motion.div>
        </div>
    );
}
