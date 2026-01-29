import {
    BrowserRouter,
    Routes,
    Route,
    useLocation
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Entry from "./pages/Entry";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Request from "./pages/Request";
import Bids from "./pages/Bids";
import Job from "./pages/Job";
import Chat from "./pages/Chat";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function Layout() {
    const location = useLocation();

    const hideNavbar = ["/", "/login", "/signup"].includes(location.pathname);

    return (
        <>
            {!hideNavbar && <Navbar />}

            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Entry />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />

                    <Route
                        path="/home"
                        element={<ProtectedRoute><Home /></ProtectedRoute>}
                    />
                    <Route
                        path="/services"
                        element={<ProtectedRoute><Services /></ProtectedRoute>}
                    />
                    <Route
                        path="/request"
                        element={<ProtectedRoute><Request /></ProtectedRoute>}
                    />
                    <Route
                        path="/bids"
                        element={<ProtectedRoute><Bids /></ProtectedRoute>}
                    />
                    <Route
                        path="/job/:jobId"
                        element={<ProtectedRoute><Job /></ProtectedRoute>}
                    />
                    <Route
                        path="/chat/:jobId"
                        element={<ProtectedRoute><Chat /></ProtectedRoute>}
                    />
                </Routes>
            </AnimatePresence>
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
}
