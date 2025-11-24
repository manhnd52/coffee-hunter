import React, { createContext, useContext, useState } from "react";
import { MOCK_USERS } from "@/mocks/data/users";

// Context cho Authentication
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
    // Mock: User đã login (có thể để null nếu muốn test chưa login)
    const [currentUser, setCurrentUser] = useState(MOCK_USERS[0]); // Giả sử user đầu tiên đã login
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    // Hàm login (mock)
    const login = (email, password) => {
        const user = MOCK_USERS.find((u) => u.email === email);
        if (user) {
            setCurrentUser(user);
            setIsAuthenticated(true);
            return { success: true };
        }
        return { success: false, error: "ユーザーが見つかりません" };
    };

    // Hàm logout
    const logout = () => {
        setCurrentUser(null);
        setIsAuthenticated(false);
    };

    // Hàm signup (mock)
    const signup = (userData) => {
        const newUser = {
            id: MOCK_USERS.length + 1,
            ...userData,
        };
        MOCK_USERS.push(newUser);
        setCurrentUser(newUser);
        setIsAuthenticated(true);
        return { success: true };
    };

    const value = {
        currentUser,
        isAuthenticated,
        login,
        logout,
        signup,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook để sử dụng Auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};
