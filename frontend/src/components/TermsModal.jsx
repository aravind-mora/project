export default function TermsModal({ open, onClose, onAccept }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <motion.div className="bg-white p-6 rounded-xl max-w-lg w-full">
                <h2 className="text-xl font-bold mb-4">Terms & Conditions</h2>

                <div className="h-64 overflow-y-auto text-sm text-gray-700">
                    <p>No fake data allowed.</p>
                    <p>Users are responsible for actions.</p>
                </div>

                <div className="flex gap-3 mt-4">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2 bg-gray-200 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onAccept}
                        className="flex-1 py-2 bg-green-400 rounded-lg font-semibold"
                    >
                        Accept
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
