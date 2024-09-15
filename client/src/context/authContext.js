import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = async (inputs) => {
        try {
            const res = await axios.post("http://localhost:8800/api/auth/login", inputs);
            setCurrentUser(res.data);
        } catch (err) {
            console.error("Login error:", err);
            throw err;
        }
    };

    const logout = async () => {
        try {
            await axios.post("http://localhost:8800/api/auth/logout");
            setCurrentUser(null);
        } catch (err) {
            console.error("Logout error:", err);
            throw err;
        }
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
      }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

};
