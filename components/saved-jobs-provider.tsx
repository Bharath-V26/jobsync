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
                    // Extract job IDs from the saved jobs list
                    setSavedJobIds(data.map((job: any) => job.jobId));
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
                // We need job details to save. If not provided, we can't save to DB properly
                // For now, we assume jobData is passed or we handle it elsewhere
                if (jobData) {
                    await fetch("/api/jobs/saved", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            jobId,
                            title: jobData.title,
                            company: jobData.company.display_name,
                            location: jobData.location.display_name,
                            salary: String(jobData.salary_min || ""),
                            description: jobData.description,
                            url: jobData.redirect_url
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
