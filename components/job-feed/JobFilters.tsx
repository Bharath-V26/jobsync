"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function JobFilters() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Job Type</Label>
                        <div className="flex flex-col gap-2">
                            {["Full-time", "Part-time", "Contract", "Remote"].map((type) => (
                                <label key={type} className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                                    {type}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Experience Level</Label>
                        <div className="flex flex-col gap-2">
                            {["Entry Level", "Mid Level", "Senior", "Lead"].map((level) => (
                                <label key={level} className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                                    {level}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Source</Label>
                        <div className="flex flex-col gap-2">
                            {["LinkedIn", "Indeed", "Glassdoor", "Direct"].map((source) => (
                                <label key={source} className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                                    {source}
                                </label>
                            ))}
                        </div>
                    </div>

                    <Button className="w-full" variant="outline">Reset Filters</Button>
                </CardContent>
            </Card>
        </div>
    );
}
