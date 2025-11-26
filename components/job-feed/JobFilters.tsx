"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function JobFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [keyword, setKeyword] = useState(searchParams.get("q") || "");
    const [location, setLocation] = useState(searchParams.get("location") || "India");

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (keyword) params.set("q", keyword);
        else params.delete("q");

        if (location) params.set("location", location);
        else params.delete("location");

        router.push(`?${params.toString()}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

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
                            placeholder="e.g. London"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>

                    <Button className="w-full" onClick={handleSearch}>
                        Search Jobs
                    </Button>

                    {/* 
                      Adzuna API free tier has limited filtering capabilities via simple params.
                      We'll stick to Keyword + Location for now as they are the most effective.
                      Additional filters can be added if we switch to a more advanced API or scrape.
                    */}
                </CardContent>
            </Card>
        </div>
    );
}
