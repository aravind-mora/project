import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function Request() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        category: "",
        description: "",
        preferredDate: "",
        preferredTime: "",
        contactNumber: "",
        location: "",
        lat: null,
        lng: null
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const detectLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setForm({
                    ...form,
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                });
            },
            () => setError("Location access is required")
        );
    };

    const submitRequest = async () => {
        setError("");

        if (!form.category || !form.description || !form.preferredDate ||
            !form.preferredTime || !form.contactNumber || !form.lat) {
            return setError("All required fields must be filled");
        }

        if (new Date(form.preferredDate) < new Date()) {
            return setError("Date cannot be in the past");
        }

        setLoading(true);
        try {
            await api.post("/requests", {
                category: form.category,
                description: form.description,
                preferredDate: form.preferredDate,
                preferredTime: form.preferredTime,
                contactNumber: form.contactNumber,
                location: {
                    address: form.location,
                    lat: form.lat,
                    lng: form.lng
                }
            });

            navigate("/bids");
        } catch {
            setError("Failed to create request");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}

                className="bg-white/15 backdrop-blur-xl p-8 rounded-2xl max-w-lg w-full shadow-2xl"
            >
                <h2 className="text-2xl font-bold text-white mb-4">
                    Request a Service
                </h2>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35, ease: "easeOut" }} className="space-y-3">
                    <input
                        name="category"
                        placeholder="Service Category (e.g. Plumbing)"
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl bg-white/90"
                    />

                    <textarea
                        name="description"
                        placeholder="Describe your problem"
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl bg-white/90"
                    />

                    <input
                        type="date"
                        name="preferredDate"
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl bg-white/90"
                    />

                    <input
                        type="time"
                        name="preferredTime"
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl bg-white/90"
                    />

                    <input
                        name="contactNumber"
                        placeholder="Contact Number"
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl bg-white/90"
                    />

                    <input
                        name="location"
                        placeholder="Location Address"
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl bg-white/90"
                    />

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={detectLocation}
                        className="w-full py-2 rounded-xl bg-blue-400 font-semibold"
                    >
                        Detect Location
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        disabled={loading}
                        onClick={submitRequest}
                        className="w-full py-3 rounded-xl bg-green-400 font-semibold disabled:opacity-50"
                    >
                        {loading ? "Submitting..." : "Submit Request"}
                    </motion.button>

                    {error && <p className="text-red-200 text-sm">{error}</p>}
                </motion.div>
            </motion.div>
        </div>
    );
}
