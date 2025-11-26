"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ActiveFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const filters: { key: string; label: string; value: string }[] = [];

    // Collect all active filters
    if (searchParams.get("q")) {
        filters.push({ key: "q", label: "Keyword", value: searchParams.get("q")! });
    }
    if (searchParams.get("location") && searchParams.get("location") !== "India") {
        filters.push({ key: "location", label: "Location", value: searchParams.get("location")! });
    }
    if (searchParams.get("jobType")) {
        const types = searchParams.get("jobType")!.split(",");
        types.forEach(type => {
            filters.push({ key: "jobType", label: "Type", value: type });
        });
    }
    if (searchParams.get("experience")) {
        const levels = searchParams.get("experience")!.split(",");
        levels.forEach(level => {
            filters.push({ key: "experience", label: "Experience", value: level });
        });
    }
    if (searchParams.get("salary")) {
        filters.push({ key: "salary", label: "Salary", value: searchParams.get("salary")! });
    }

    const removeFilter = (key: string, value?: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (key === "jobType" || key === "experience") {
            // For array filters, remove specific value
            const current = params.get(key)?.split(",").filter(Boolean) || [];
            const updated = current.filter(v => v !== value);
            if (updated.length > 0) {
                params.set(key, updated.join(","));
            } else {
                params.delete(key);
            }
        } else {
            params.delete(key);
        }

        router.push(`?${params.toString()}`);
    };

    const clearAllFilters = () => {
        router.push("/dashboard");
    };

    if (filters.length === 0) {
        return null;
    }

    return (
        <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Active Filters:</span>
            {filters.map((filter, index) => (
                <Badge
                    key={`${filter.key}-${filter.value}-${index}`}
                    variant="secondary"
                    className="gap-1 pr-1"
                >
                    <span className="text-xs">
                        {filter.label}: {filter.value}
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => removeFilter(filter.key, filter.value)}
                    >
                        <X className="h-3 w-3" />
                    </Button>
                </Badge>
            ))}
            {filters.length > 1 && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="h-7 text-xs"
                >
                    Clear All
                </Button>
            )}
        </div>
    );
}
