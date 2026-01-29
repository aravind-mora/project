import { motion } from "framer-motion";

export default function TermsModal({ open, onClose, onAccept }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white max-w-lg w-full p-6 rounded-xl shadow-xl"
            >
                <h2 className="text-xl font-bold mb-4">Terms & Conditions</h2>

                <div className="h-64 overflow-y-auto text-sm text-gray-700 space-y-3">
                    <p>No fake data allowed.</p>
                    <p>Users are responsible for provided information.</p>
                    <p>Providers must deliver services honestly.</p>
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2 rounded-lg bg-gray-200 font-semibold"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onAccept}
                        className="flex-1 py-2 rounded-lg bg-green-500 text-white font-semibold"
                    >
                        Accept
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
