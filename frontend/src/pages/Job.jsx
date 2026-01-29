import { motion, useReducedMotion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { useAuth } from "../context/AuthContext";

export default function Job() {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const socket = useSocket();
    const { user } = useAuth();
    const shouldReduce = useReducedMotion();

    const [status, setStatus] = useState("IN_PROGRESS");

    useEffect(() => {
        if (!socket) return;
        socket.emit("chat:join", { jobId });
        socket.on("job:status:update", ({ status }) => setStatus(status));
        return () => socket.off("job:status:update");
    }, [socket, jobId]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 flex items-center justify-center">
            <motion.div
                initial={shouldReduce ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduce ? false : { opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="bg-white/15 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-white text-center max-w-md w-full"
            >
                <h2 className="text-2xl font-bold mb-2">Job Status</h2>

                <p className="mb-4 text-white/80">
                    Current status: <strong>{status}</strong>
                </p>

                {status === "IN_PROGRESS" && user?.role === "PROVIDER" && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={() => socket.emit("job:complete", { jobId })}
                        className="px-6 py-3 rounded-xl bg-green-400 font-semibold"
                    >
                        Mark as Completed
                    </motion.button>
                )}

                {status === "COMPLETED" && (
                    <p className="mt-4 text-green-200">Job completed successfully 🎉</p>
                )}

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => navigate(`/chat/${jobId}`)}
                    className="mt-6 px-6 py-3 rounded-xl bg-blue-400 font-semibold"
                >
                    Open Chat
                </motion.button>
            </motion.div>
        </div>
    );
}
