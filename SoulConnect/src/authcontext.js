import React, { createContext, useContext, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(() => {
        // Retrieve token and user data from localStorage on initial load
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        return { token, user };
    });

    // Login function
    const login = (data) => {
        const { token, ...user } = data;

        // Save data to state and localStorage
        setAuthData({ token, user });
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    };

    // Logout function
    const logout = () => {
        setAuthData({ token: null, user: null });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const value = {
        authData,
        isAuthenticated: !!authData.token,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
