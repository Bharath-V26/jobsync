"use client";

import { useEffect, useState } from "react";
import { Job } from "@/lib/mock-data";
import { JobCard } from "./JobCard";
import { Loader2 } from "lucide-react";

export function JobFeed() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchJobs() {
            try {
                const response = await fetch("/api/jobs");
                const data = await response.json();
                setJobs(data);
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchJobs();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Recommended Jobs</h2>
            {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
            ))}
        </div>
    );
}
