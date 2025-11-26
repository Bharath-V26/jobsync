"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SavedJobsContextType {
    savedJobIds: string[];
    toggleSaveJob: (jobId: string, jobData?: any) => void;
    isJobSaved: (jobId: string) => boolean;
}

const SavedJobsContext = createContext<SavedJobsContextType | undefined>(undefined);

export function SavedJobsProvider({ children }: { children: React.ReactNode }) {
    const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                const res = await fetch("/api/jobs/saved");
                if (res.ok) {
                    const data = await res.json();
                    // API now returns Job objects, extract IDs from them
                    setSavedJobIds(data.map((job: any) => job.id));
                }
            } catch (error) {
                console.error("Failed to fetch saved jobs:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSavedJobs();
    }, []);

    const toggleSaveJob = async (jobId: string, jobData?: any) => {
        const isSaved = savedJobIds.includes(jobId);

        // Optimistic update
        setSavedJobIds((prev) =>
            isSaved ? prev.filter((id) => id !== jobId) : [...prev, jobId]
        );

        try {
            if (isSaved) {
                // DELETE
                await fetch(`/api/jobs/saved?jobId=${jobId}`, { method: "DELETE" });
            } else {
                // POST (Save)
                if (jobData) {
                    await fetch("/api/jobs/saved", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            jobId: String(jobId),
                            title: jobData.title,
                            company: jobData.company,
                            location: jobData.location,
                            salary: jobData.salary || "",
                            description: jobData.description || "",
                            url: jobData.url || ""
                        }),
                    });
                }
            }
        } catch (error) {
            console.error("Failed to toggle save job:", error);
            // Revert
            setSavedJobIds((prev) =>
                isSaved ? [...prev, jobId] : prev.filter((id) => id !== jobId)
            );
        }
    };

    const isJobSaved = (jobId: string) => savedJobIds.includes(jobId);

    return (
        <SavedJobsContext.Provider value={{ savedJobIds, toggleSaveJob, isJobSaved }}>
            {children}
        </SavedJobsContext.Provider>
    );
}

export function useSavedJobs() {
    const context = useContext(SavedJobsContext);
    if (context === undefined) {
        throw new Error("useSavedJobs must be used within a SavedJobsProvider");
    }
    return context;
}
