import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (phone: string, password: string) => Promise<void>;
    register: (phone: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate(); // Move this line here

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (phone: string, password: string) => {
        console.log('Calling authAPI.login'); // Add this line
        try {
            const response = await authAPI.login(phone, password);
            const { access, refresh } = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            setIsAuthenticated(true);
            navigate('/explore'); // Navigate to explore page after successful login
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const register = async (phone: string, password: string) => {
        try {
            await authAPI.register(phone, password);
            // Optionally, automatically log in the user after registration
            await login(phone, password);
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};