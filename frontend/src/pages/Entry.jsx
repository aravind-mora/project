import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Entry() {
    const navigate = useNavigate();
    const shouldReduce = useReducedMotion();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600">
            {/* ✅ PAGE + CARD ANIMATION (ONCE) */}
            <motion.div
                initial={shouldReduce ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduce ? false : { opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="bg-white/10 backdrop-blur-xl p-10 rounded-2xl shadow-2xl text-center space-y-6"
            >
                {/* ❌ NO MOTION ON TEXT */}
                <h1 className="text-4xl font-bold text-white">
                    SocioSphere
                </h1>

                <p className="text-white/80">
                    Choose how you want to continue
                </p>

                {/* ❌ NO MOTION ON WRAPPER */}
                <div className="flex gap-4 justify-center">
                    {/* ✅ INTERACTIVE MOTION ONLY */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={() => navigate("/signup?role=customer")}
                        className="px-6 py-3 rounded-xl bg-orange-400 text-black font-semibold shadow-lg"
                    >
                        Continue as Customer
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={() => navigate("/signup?role=provider")}
                        className="px-6 py-3 rounded-xl bg-pink-400 text-black font-semibold shadow-lg"
                    >
                        Continue as Service Provider
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
