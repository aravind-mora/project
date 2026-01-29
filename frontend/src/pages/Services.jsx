import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Services() {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setLocation({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                });
                setLoading(false);
            },
            () => {
                setError("Location access is required to find nearby services.");
                setLoading(false);
            }
        );
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }} className="min-h-screen bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 p-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}

                className="max-w-6xl mx-auto bg-white/15 backdrop-blur-xl rounded-2xl p-8 shadow-2xl"
            >
                <h1 className="text-3xl font-bold text-white mb-4">
                    Services Near You
                </h1>

                {loading && (
                    <p className="text-white/80">Detecting your location…</p>
                )}

                {error && (
                    <p className="text-red-200">{error}</p>
                )}

                {location && (
                    <>
                        {/* Search & Filter Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.35, ease: "easeOut" }} className="flex flex-wrap gap-4 mb-6">
                            <input
                                placeholder="Search services (e.g. Plumbing, Salon)"
                                className="flex-1 p-3 rounded-xl bg-white/90"
                            />
                            <select className="p-3 rounded-xl bg-white/90">
                                <option>Sort by Distance</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Rating</option>
                            </select>
                        </motion.div>

                        {/* Empty State */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.35, ease: "easeOut" }} className="border border-white/20 rounded-xl p-10 text-center space-y-4">
                            <p className="text-white/80">
                                No services available in your area yet.
                            </p>

                            <p className="text-white/60 text-sm">
                                Once providers register and add services, they will appear here.
                            </p>

                            {/* 👉 ACTION BUTTON GOES HERE */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                onClick={() => window.location.href = "/request"}
                                className="px-6 py-3 rounded-xl bg-orange-400 font-semibold hover:scale-105 transition"
                            >
                                Request a Service
                            </motion.button>
                        </motion.div>

                    </>
                )}
            </motion.div>
        </motion.div>
    );
}
