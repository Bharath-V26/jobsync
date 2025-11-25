"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password?: string) => Promise<void>;
    logout: () => Promise<void>;
    signup: (email: string, password?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check for existing session (mock)
        const storedUser = localStorage.getItem("jobsync_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password?: string) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockUser: User = {
            id: "1",
            name: "John Doe",
            email: email,
            avatar: "https://github.com/shadcn.png",
        };
        setUser(mockUser);
        localStorage.setItem("jobsync_user", JSON.stringify(mockUser));
        setIsLoading(false);
        router.push("/dashboard");
    };

    const signup = async (email: string, password?: string) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockUser: User = {
            id: "1",
            name: "New User",
            email: email,
            avatar: "",
        };
        setUser(mockUser);
        localStorage.setItem("jobsync_user", JSON.stringify(mockUser));
        setIsLoading(false);
        router.push("/onboarding"); // Redirect to onboarding after signup
    };

    const logout = async () => {
        setUser(null);
        localStorage.removeItem("jobsync_user");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
