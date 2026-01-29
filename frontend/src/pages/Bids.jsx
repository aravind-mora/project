import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const colors = [
    "border-green-400",
    "border-blue-400",
    "border-pink-400",
    "border-purple-400"
];

export default function Bids() {
    const socket = useSocket();
    const navigate = useNavigate();
    const shouldReduce = useReducedMotion();
    const [bids, setBids] = useState([]);

    // ✅ ACCEPT BID
    const acceptBid = async (bidId) => {
        try {
            const res = await api.post(`/bids/${bidId}/accept`);
            navigate(`/job/${res.data.jobId}`);
        } catch {
            alert("Failed to accept bid. Please try again.");
        }
    };

    // ✅ REAL-TIME BIDS
    useEffect(() => {
        if (!socket) return;

        const onBidUpdate = (bid) => {
            setBids((prev) =>
                [...prev, bid].sort((a, b) => a.amount - b.amount)
            );
        };

        socket.on("bid:update", onBidUpdate);
        return () => socket.off("bid:update", onBidUpdate);
    }, [socket]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 p-6">
            {/* ✅ PAGE ANIMATION (ONLY ONCE) */}
            <motion.div
                initial={shouldReduce ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduce ? false : { opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="max-w-4xl mx-auto bg-white/15 backdrop-blur-xl rounded-2xl p-8 shadow-2xl"
            >
                <h1 className="text-3xl font-bold text-white mb-6">
                    Provider Bids
                </h1>

                {/* ✅ EMPTY STATE */}
                {bids.length === 0 && (
                    <p className="text-white/70 text-center">
                        Waiting for providers to place bids…
                    </p>
                )}

                <div className="space-y-4">
                    {bids.map((bid, i) => (
                        /* ✅ CARD-LEVEL MICRO ANIMATION */
                        <motion.div
                            key={bid._id}
                            initial={shouldReduce ? false : { opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.25 }}
                            className={`border-l-4 ${colors[i % colors.length]
                                } bg-white/90 p-4 rounded-xl flex justify-between items-center`}
                        >
                            {/* ❌ NO MOTION ON TEXT */}
                            <div>
                                <p className="font-semibold">Bid Amount</p>
                                <p className="text-sm text-gray-600">
                                    Provider offered ₹{bid.amount}
                                </p>
                            </div>

                            {/* ✅ INTERACTIVE MOTION ONLY */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                onClick={() => acceptBid(bid._id)}
                                className="px-4 py-2 rounded-lg bg-green-400 font-semibold"
                            >
                                Accept
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
