"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Job } from "@/lib/mock-data";
import { JobCard } from "./JobCard";
import { Loader2 } from "lucide-react";

export function JobFeed() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const searchParams = useSearchParams();

    useEffect(() => {
        setPage(1);
        setHasMore(true);
        fetchJobs(1, true);
    }, [searchParams]);

    async function fetchJobs(pageNum: number, isNewSearch: boolean) {
        if (isNewSearch) setLoading(true);
        else setLoadingMore(true);

        try {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", pageNum.toString());

            const response = await fetch(`/api/jobs?${params.toString()}`);
            const data = await response.json();

            if (data.length === 0) {
                setHasMore(false);
            } else {
                setJobs(prev => isNewSearch ? data : [...prev, ...data]);
            }
        } catch (error) {
            console.error("Failed to fetch jobs:", error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchJobs(nextPage, false);
    };

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
        <div className="space-y-6">
            <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">
                    {searchParams.get("q") ? `Results for "${searchParams.get("q")}"` : "Recommended Jobs"}
                </h2>
                {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>

            {hasMore && (
                <div className="flex justify-center pt-4">
                    <Button
                        variant="outline"
                        onClick={loadMore}
                        disabled={loadingMore}
                        className="w-full md:w-auto"
                    >
                        {loadingMore ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            "Load More Jobs"
                        )}
                    </Button>
                </div>
            )}
        </div>
    );
}
