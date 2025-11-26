"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function JobFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [keyword, setKeyword] = useState(searchParams.get("q") || "");
    const [location, setLocation] = useState(searchParams.get("location") || "India");

    // Multi-select filters
    const [jobTypes, setJobTypes] = useState<string[]>(
        searchParams.get("jobType")?.split(",").filter(Boolean) || []
    );
    const [experienceLevels, setExperienceLevels] = useState<string[]>(
        searchParams.get("experience")?.split(",").filter(Boolean) || []
    );
    const [salaryRange, setSalaryRange] = useState(searchParams.get("salary") || "");

    // Update state when URL changes
    useEffect(() => {
        setKeyword(searchParams.get("q") || "");
        setLocation(searchParams.get("location") || "India");
        setJobTypes(searchParams.get("jobType")?.split(",").filter(Boolean) || []);
        setExperienceLevels(searchParams.get("experience")?.split(",").filter(Boolean) || []);
        setSalaryRange(searchParams.get("salary") || "");
    }, [searchParams]);

    const toggleArrayFilter = (value: string, current: string[], setter: (v: string[]) => void) => {
        if (current.includes(value)) {
            setter(current.filter(v => v !== value));
        } else {
            setter([...current, value]);
        }
    };

    const handleSearch = () => {
        const params = new URLSearchParams();

        if (keyword) params.set("q", keyword);
        if (location) params.set("location", location);
        if (jobTypes.length > 0) params.set("jobType", jobTypes.join(","));
        if (experienceLevels.length > 0) params.set("experience", experienceLevels.join(","));
        if (salaryRange) params.set("salary", salaryRange);

        router.push(`?${params.toString()}`);
    };

    const handleClearFilters = () => {
        setKeyword("");
        setLocation("India");
        setJobTypes([]);
        setExperienceLevels([]);
        setSalaryRange("");
        router.push("/dashboard");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const jobTypeOptions = ["Full-time", "Part-time", "Contract", "Remote"];
    const experienceOptions = ["Entry Level", "Mid Level", "Senior", "Lead"];
    const salaryOptions = [
        { label: "Any", value: "" },
        { label: "₹0-5L", value: "0-500000" },
        { label: "₹5-10L", value: "500000-1000000" },
        { label: "₹10-20L", value: "1000000-2000000" },
        { label: "₹20L+", value: "2000000+" },
    ];

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Search & Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Keywords</Label>
                        <Input
                            placeholder="e.g. React Developer"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Location</Label>
                        <Input
                            placeholder="e.g. Bangalore"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Job Type</Label>
                        <div className="space-y-2">
                            {jobTypeOptions.map((type) => (
                                <label key={type} className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={jobTypes.includes(type)}
                                        onChange={() => toggleArrayFilter(type, jobTypes, setJobTypes)}
                                        className="rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    {type}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Experience Level</Label>
                        <div className="space-y-2">
                            {experienceOptions.map((level) => (
                                <label key={level} className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={experienceLevels.includes(level)}
                                        onChange={() => toggleArrayFilter(level, experienceLevels, setExperienceLevels)}
                                        className="rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    {level}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Salary Range</Label>
                        <Select value={salaryRange} onValueChange={setSalaryRange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                            <SelectContent>
                                {salaryOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Button className="w-full" onClick={handleSearch}>
                            Apply Filters
                        </Button>
                        <Button
                            className="w-full"
                            variant="outline"
                            onClick={handleClearFilters}
                        >
                            Clear All
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
