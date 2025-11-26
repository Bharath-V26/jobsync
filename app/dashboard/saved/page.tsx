"use client";

import { useEffect, useState } from "react";
import { Job } from "@/lib/mock-data";
import { JobCard } from "@/components/job-feed/JobCard";
import { BookmarkX, Loader2 } from "lucide-react";

export default function SavedJobsPage() {
    const [savedJobs, setSavedJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSavedJobs() {
            try {
                const response = await fetch("/api/jobs/saved");
                if (response.ok) {
                    const data = await response.json();
                    setSavedJobs(data);
                }
            } catch (error) {
                console.error("Failed to fetch saved jobs:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchSavedJobs();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight metallic-text">Saved Jobs</h1>
                <p className="text-muted-foreground mt-2">
                    Your bookmarked opportunities.
                </p>
            </div>

            {savedJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedJobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 border-2 border-dashed border-border rounded-xl bg-secondary/20">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                        <BookmarkX className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">No saved jobs yet</h3>
                        <p className="text-muted-foreground max-w-sm mx-auto mt-1">
                            Bookmark jobs from the dashboard to view them here.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
