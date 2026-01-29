import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { logout } = useAuth();

    return (
        <nav className="flex items-center gap-6 px-6 py-4 bg-black/30 backdrop-blur-md">
            <Link to="/home" className="text-white font-bold text-xl">
                SocioSphere
            </Link>
            <Link to="/profile" className="text-white/80">
                Profile
            </Link>

            <Link to="/services" className="text-white/80">
                Services
            </Link>
            <div className="ml-auto">
                <button
                    onClick={logout}
                    className="px-4 py-2 rounded-lg bg-red-400 text-sm font-semibold"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}
