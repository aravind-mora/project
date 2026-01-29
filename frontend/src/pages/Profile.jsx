import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../utils/api";

export default function Profile() {
    const shouldReduce = useReducedMotion();
    const [profile, setProfile] = useState(null);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        api.get("/profile").then(res => setProfile(res.data));
    }, []);

    if (!profile) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 flex justify-center p-6">
            <motion.div
                initial={shouldReduce ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduce ? false : { opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="bg-white/15 backdrop-blur-xl p-8 rounded-2xl shadow-2xl max-w-md w-full text-white"
            >
                <h2 className="text-2xl font-bold mb-6">My Profile</h2>

                <input value={profile.name} disabled={!edit} onChange={e => setProfile({ ...profile, name: e.target.value })} className="w-full p-3 rounded-xl mb-3 text-black" />
                <input value={profile.email} disabled className="w-full p-3 rounded-xl mb-3 text-black opacity-70" />
                <input value={profile.mobile} disabled={!edit} onChange={e => setProfile({ ...profile, mobile: e.target.value })} className="w-full p-3 rounded-xl mb-4 text-black" />

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={edit ? async () => { const res = await api.put("/profile", profile); setProfile(res.data); setEdit(false); } : () => setEdit(true)}
                    className={`w-full py-3 rounded-xl font-semibold ${edit ? "bg-green-400" : "bg-blue-400"}`}
                >
                    {edit ? "Save Changes" : "Edit Profile"}
                </motion.button>
            </motion.div>
        </div>
    );
}
