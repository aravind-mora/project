import { createContext, useContext, useEffect } from "react";
import socket from "../utils/socket";
import { useAuth } from "./AuthContext";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const { token } = useAuth();

    useEffect(() => {
        if (token) {
            socket.auth = { token };
            socket.connect();
        }

        return () => {
            socket.disconnect();
        };
    }, [token]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
