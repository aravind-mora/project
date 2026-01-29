import { motion } from "framer-motion";

export default function Loader() {
    return (
        <div className="flex justify-center items-center py-10">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full"
            />
        </div>
    );
}
