import { motion, useReducedMotion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Home() {
    const { user } = useAuth();
    const shouldReduce = useReducedMotion();

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 p-6">
            {/* ✅ PAGE + CARD ANIMATION (ONCE) */}
            <motion.div
                initial={shouldReduce ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduce ? false : { opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="max-w-5xl mx-auto bg-white/15 backdrop-blur-xl rounded-2xl p-8 shadow-2xl"
            >
                {/* ❌ NO MOTION ON TEXT */}
                <h1 className="text-3xl font-bold text-white mb-2">
                    Welcome to SocioSphere
                </h1>

                <p className="text-white/80 mb-6">
                    {user?.role === "PROVIDER"
                        ? "You will start receiving service requests once users request services in your category."
                        : "Request a service to connect with nearby professionals in real time."}
                </p>

                {/* ❌ STATIC EMPTY STATE (NO MOTION) */}
                <div className="border border-white/20 rounded-xl p-6 text-center">
                    <p className="text-white/70 mb-4">
                        No activity yet
                    </p>

                    {/* ✅ INTERACTIVE MOTION ONLY */}
                    {user?.role === "PROVIDER" ? (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="px-6 py-3 rounded-xl bg-green-400 font-semibold"
                        >
                            Create Your First Service
                        </motion.button>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="px-6 py-3 rounded-xl bg-orange-400 font-semibold"
                        >
                            Request a Service
                        </motion.button>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
