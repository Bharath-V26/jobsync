"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export type ApplicationStatus = "applied" | "interviewing" | "offered" | "rejected";

export interface Application {
    id: string;
    jobTitle: string;
    company: string;
    location?: string;
    salary?: string;
    jobUrl?: string;
    status: ApplicationStatus;
    appliedAt: string;
    notes?: string;
}

interface ApplicationsContextType {
    applications: Application[];
    isLoading: boolean;
    addApplication: (app: Omit<Application, "id" | "appliedAt">) => Promise<void>;
    updateApplicationStatus: (id: string, status: ApplicationStatus) => Promise<void>;
    deleteApplication: (id: string) => Promise<void>;
}

const ApplicationsContext = createContext<ApplicationsContextType | undefined>(undefined);

export function ApplicationsProvider({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (session?.user) {
            fetchApplications();
        } else {
            setApplications([]);
            setIsLoading(false);
        }
    }, [session]);

    const fetchApplications = async () => {
        try {
            const res = await fetch("/api/applications");
            if (res.ok) {
                const data = await res.json();
                setApplications(data);
            }
        } catch (error) {
            console.error("Failed to fetch applications:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const addApplication = async (app: Omit<Application, "id" | "appliedAt">) => {
        // Optimistic update
        const tempId = Math.random().toString(36).substr(2, 9);
        const newApp: Application = { ...app, id: tempId, appliedAt: new Date().toISOString() };
        setApplications((prev) => [newApp, ...prev]);

        try {
            const res = await fetch("/api/applications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(app),
            });

            if (res.ok) {
                const savedApp = await res.json();
                setApplications((prev) => prev.map((a) => (a.id === tempId ? savedApp : a)));
            } else {
                // Revert on failure
                setApplications((prev) => prev.filter((a) => a.id !== tempId));
            }
        } catch (error) {
            console.error("Failed to add application:", error);
            setApplications((prev) => prev.filter((a) => a.id !== tempId));
        }
    };

    const updateApplicationStatus = async (id: string, status: ApplicationStatus) => {
        // Optimistic update
        setApplications((prev) =>
            prev.map((app) => (app.id === id ? { ...app, status } : app))
        );

        try {
            await fetch("/api/applications", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            });
        } catch (error) {
            console.error("Failed to update application:", error);
            // Revert could be complex here, usually just refetch or ignore
        }
    };

    const deleteApplication = async (id: string) => {
        // Optimistic update
        const prevApps = [...applications];
        setApplications((prev) => prev.filter((app) => app.id !== id));

        try {
            // We need to implement DELETE in the API route first!
            // For now assuming it exists or we will add it
            await fetch(`/api/applications?id=${id}`, { method: "DELETE" });
        } catch (error) {
            console.error("Failed to delete application:", error);
            setApplications(prevApps);
        }
    };

    return (
        <ApplicationsContext.Provider
            value={{ applications, isLoading, addApplication, updateApplicationStatus, deleteApplication }}
        >
            {children}
        </ApplicationsContext.Provider>
    );
}

export function useApplications() {
    const context = useContext(ApplicationsContext);
    if (context === undefined) {
        throw new Error("useApplications must be used within an ApplicationsProvider");
    }
    return context;
}
