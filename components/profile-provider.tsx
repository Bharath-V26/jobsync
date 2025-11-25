"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserProfile {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    portfolio: string;
    summary: string;
}

interface ProfileContextType {
    profile: UserProfile;
    updateProfile: (data: Partial<UserProfile>) => void;
    isLoading: boolean;
}

const defaultProfile: UserProfile = {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    portfolio: "",
    summary: "",
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
    const [profile, setProfile] = useState<UserProfile>(defaultProfile);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch("/api/profile");
                if (res.ok) {
                    const data = await res.json();
                    // Merge with default to ensure all fields exist
                    setProfile({ ...defaultProfile, ...data });
                }
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const updateProfile = async (data: Partial<UserProfile>) => {
        // Optimistic update
        setProfile((prev) => ({ ...prev, ...data }));

        try {
            await fetch("/api/profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...profile, ...data }),
            });
        } catch (error) {
            console.error("Failed to update profile:", error);
            // Revert on error (optional, but good practice)
        }
    };

    return (
        <ProfileContext.Provider value={{ profile, updateProfile, isLoading }}>
            {children}
        </ProfileContext.Provider>
    );
}

export function useProfile() {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error("useProfile must be used within a ProfileProvider");
    }
    return context;
}
