import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import TermsModal from "../components/TermsModal";

export default function Signup() {
    const [params] = useSearchParams();
    const role = params.get("role") || "customer";
    const navigate = useNavigate();
    const { setToken } = useAuth();

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        otp: "",
        acceptTerms: false
    });

    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const sendOtp = async () => {
        if (!form.acceptTerms) {
            return setError("You must accept Terms & Conditions");
        }

        setError("");
        setLoading(true);
        try {
            await api.post("/auth/send-otp", { email: form.email });
            setOtpSent(true);
        } catch {
            setError("Failed to send OTP");
        }
        setLoading(false);
    };

    const signup = async () => {
        setError("");

        if (form.password !== form.confirmPassword) {
            return setError("Passwords do not match");
        }

        try {
            const res = await api.post("/auth/signup", {
                ...form,
                role: role.toUpperCase()
            });
            setToken(res.data.token);
            navigate("/home");
        } catch {
            setError("Signup failed");
        }
    };

    return (
        <>
            <motion.div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600">
                <motion.div className="bg-white/15 backdrop-blur-xl p-8 rounded-2xl w-full max-w-md shadow-2xl">

                    <h2 className="text-2xl font-bold text-white mb-4">
                        Sign up as {role === "provider" ? "Service Provider" : "Customer"}
                    </h2>

                    <div className="space-y-3">
                        {!otpSent && (
                            <>
                                <input name="fullName" placeholder="Full Name" onChange={handleChange} className="w-full p-3 rounded-xl bg-white/90" />
                                <input name="email" placeholder="Email" onChange={handleChange} className="w-full p-3 rounded-xl bg-white/90" />
                                <input name="mobile" placeholder="Mobile Number" onChange={handleChange} className="w-full p-3 rounded-xl bg-white/90" />
                                <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-3 rounded-xl bg-white/90" />
                                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="w-full p-3 rounded-xl bg-white/90" />

                                {/* ✅ TERMS CHECKBOX */}
                                <label className="flex items-center text-white text-sm gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={form.acceptTerms}
                                        readOnly
                                    />
                                    <span onClick={() => setShowTerms(true)}>
                                        I accept <span className="underline">Terms & Conditions</span>
                                    </span>
                                </label>

                                <motion.button
                                    disabled={!form.acceptTerms || loading}
                                    whileHover={{ scale: 1.03 }}
                                    onClick={sendOtp}
                                    className="w-full py-3 rounded-xl bg-orange-400 font-semibold disabled:opacity-50"
                                >
                                    {loading ? "Sending..." : "Send OTP"}
                                </motion.button>
                            </>
                        )}

                        {otpSent && (
                            <>
                                <input
                                    name="otp"
                                    placeholder="Enter OTP"
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-xl bg-white/90"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    onClick={signup}
                                    className="w-full py-3 rounded-xl bg-green-400 font-semibold"
                                >
                                    Verify & Create Account
                                </motion.button>
                            </>
                        )}

                        {error && <p className="text-red-200 text-sm">{error}</p>}
                    </div>
                </motion.div>
            </motion.div>

            {/* ✅ TERMS MODAL */}
            <TermsModal
                open={showTerms}
                onClose={() => setShowTerms(false)}
                onAccept={() => {
                    setForm({ ...form, acceptTerms: true });
                    setShowTerms(false);
                }}
            />
        </>
    );
}
