import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useSocket } from "../context/SocketContext";
import { useAuth } from "../context/AuthContext";

export default function Chat() {
    const { jobId } = useParams();
    const socket = useSocket();
    const { user } = useAuth();
    const shouldReduce = useReducedMotion();

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [typing, setTyping] = useState(false);

    useEffect(() => {
        if (!socket) return;

        socket.emit("chat:join", { jobId });

        socket.on("chat:message", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        socket.on("chat:typing", () => {
            setTyping(true);
            setTimeout(() => setTyping(false), 1000);
        });

        return () => {
            socket.off("chat:message");
            socket.off("chat:typing");
        };
    }, [socket, jobId]);

    const sendMessage = () => {
        if (!text.trim()) return;
        socket.emit("chat:message", { jobId, message: text });
        setText("");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 p-6 flex justify-center">
            <motion.div
                initial={shouldReduce ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduce ? false : { opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="bg-white/15 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col"
            >
                <div className="p-4 border-b border-white/20 text-white font-semibold">
                    Job Chat
                </div>

                <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                    {messages.length === 0 && (
                        <p className="text-white/70 text-center">
                            Start the conversation with your service provider.
                        </p>
                    )}

                    {messages.map((msg) => (
                        <div
                            key={msg._id}
                            className={`p-3 rounded-xl max-w-[70%] ${msg.sender === user?.id
                                    ? "bg-green-400 ml-auto text-black"
                                    : "bg-white text-black"
                                }`}
                        >
                            {msg.message}
                        </div>
                    ))}

                    {typing && (
                        <p className="text-white/70 text-sm">Typing…</p>
                    )}
                </div>

                <div className="p-4 flex gap-2 border-t border-white/20">
                    <input
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                            socket.emit("chat:typing", { jobId });
                        }}
                        placeholder="Type a message"
                        className="flex-1 p-3 rounded-xl"
                    />

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={sendMessage}
                        className="px-6 rounded-xl bg-green-400 font-semibold"
                    >
                        Send
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
