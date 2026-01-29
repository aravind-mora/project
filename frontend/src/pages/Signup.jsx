import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import TermsModal from "../components/TermsModal";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[6-9]\d{9}$/;
const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

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

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // 🔐 Password rules (LIVE)
    const passwordRules = {
        length: form.password.length >= 8,
        uppercase: /[A-Z]/.test(form.password),
        lowercase: /[a-z]/.test(form.password),
        number: /\d/.test(form.password),
        special: /[@$!%*?&]/.test(form.password)
    };

    const isPasswordStrong = Object.values(passwordRules).every(Boolean);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // 📩 SEND OTP
    const sendOtp = async () => {
        setError("");

        if (!form.fullName.trim()) return setError("Full name is required");
        if (!emailRegex.test(form.email)) return setError("Invalid email");
        if (!mobileRegex.test(form.mobile)) return setError("Invalid mobile number");
        if (!passwordRegex.test(form.password))
            return setError("Password is too weak");
        if (form.password !== form.confirmPassword)
            return setError("Passwords do not match");
        if (!form.acceptTerms)
            return setError("You must accept Terms & Conditions");

        try {
            setLoading(true);
            await api.post("/auth/send-otp", { email: form.email });
            setOtpSent(true);
        } catch {
            setError("Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    // ✅ SIGNUP
    const signup = async () => {
        setError("");

        if (!form.otp || form.otp.length !== 6)
            return setError("Enter valid 6-digit OTP");

        try {
            const res = await api.post("/auth/signup", {
                ...form,
                role: role.toUpperCase()
            });

            setToken(res.data.token);
            navigate("/home");
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <>
            <motion.div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600">
                <motion.div className="bg-white/15 backdrop-blur-xl p-8 rounded-2xl w-full max-w-md shadow-2xl">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Sign up as {role === "provider" ? "Service Provider" : "Customer"}
                    </h2>

                    {!otpSent && (
                        <div className="space-y-3">
                            <input name="fullName" placeholder="Full Name" onChange={handleChange} className="w-full p-3 rounded-xl bg-white/90" />
                            <input name="email" placeholder="Email" onChange={handleChange} className="w-full p-3 rounded-xl bg-white/90" />
                            <input name="mobile" placeholder="Mobile Number" onChange={handleChange} className="w-full p-3 rounded-xl bg-white/90" />

                            {/* PASSWORD */}
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Create a strong password"
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-xl bg-white/90 pr-10"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3">
                                    👁
                                </button>
                            </div>

                            {/* RULES */}
                            <div className="grid grid-cols-2 gap-2 text-sm text-white">
                                <Rule ok={passwordRules.length} label="8+ characters" />
                                <Rule ok={passwordRules.uppercase} label="Uppercase" />
                                <Rule ok={passwordRules.lowercase} label="Lowercase" />
                                <Rule ok={passwordRules.number} label="Number" />
                                <Rule ok={passwordRules.special} label="Special char" />
                            </div>

                            {/* CONFIRM PASSWORD */}
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-xl bg-white/90 pr-10"
                                />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3">
                                    👁
                                </button>
                            </div>

                            {/* TERMS */}
                            <label className="flex items-center gap-2 text-white text-sm">
                                <input
                                    type="checkbox"
                                    checked={form.acceptTerms}
                                    onChange={() => setShowTerms(true)}
                                />
                                I accept Terms & Conditions
                            </label>

                            <motion.button
                                disabled={!isPasswordStrong || !form.acceptTerms || loading}
                                whileHover={{ scale: 1.03 }}
                                onClick={sendOtp}
                                className="w-full py-3 rounded-xl bg-orange-400 font-semibold disabled:opacity-50"
                            >
                                {loading ? "Sending..." : "Send OTP"}
                            </motion.button>
                        </div>
                    )}

                    {otpSent && (
                        <div className="space-y-3">
                            <input name="otp" placeholder="Enter OTP" onChange={handleChange} className="w-full p-3 rounded-xl bg-white/90" />
                            <motion.button whileHover={{ scale: 1.03 }} onClick={signup} className="w-full py-3 rounded-xl bg-green-400 font-semibold">
                                Verify & Create Account
                            </motion.button>
                        </div>
                    )}

                    {error && <p className="text-red-200 text-sm mt-2">{error}</p>}
                </motion.div>
            </motion.div>

            {/* MODAL */}
            <TermsModal
                open={showTerms}
                onClose={() => setShowTerms(false)}
                onAccept={() => {
                    setForm((prev) => ({ ...prev, acceptTerms: true }));
                    setShowTerms(false);
                }}
            />
        </>
    );
}

/* RULE COMPONENT */
function Rule({ ok, label }) {
    return (
        <div className={`flex items-center gap-2 ${ok ? "text-green-300" : "text-white/60"}`}>
            <span>{ok ? "✔" : "○"}</span>
            {label}
        </div>
    );
}
