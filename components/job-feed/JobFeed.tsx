"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Job } from "@/lib/mock-data";
import { JobCard } from "./JobCard";
import { Loader2 } from "lucide-react";

export function JobFeed() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();

    useEffect(() => {
        async function fetchJobs() {
            setLoading(true);
            try {
                // Construct query string from current URL params
                const params = new URLSearchParams(searchParams.toString());
                const response = await fetch(`/api/jobs?${params.toString()}`);
                const data = await response.json();
                setJobs(data);
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchJobs();
    }, [searchParams]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (jobs.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                No jobs found. Try adjusting your search filters.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">
                {searchParams.get("q") ? `Results for "${searchParams.get("q")}"` : "Recommended Jobs"}
            </h2>
            {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
            ))}
        </div>
    );
}
