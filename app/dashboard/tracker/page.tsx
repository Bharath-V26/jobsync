"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

type Status = "Applied" | "Interviewing" | "Offer" | "Rejected";

interface Application {
    id: string;
    company: string;
    role: string;
    status: Status;
    date: string;
}

const initialApplications: Application[] = [
    { id: "1", company: "TechCorp", role: "Frontend Engineer", status: "Applied", date: "2024-03-10" },
    { id: "2", company: "StartupX", role: "Full Stack Dev", status: "Interviewing", date: "2024-03-08" },
    { id: "3", company: "BigData Inc", role: "React Developer", status: "Rejected", date: "2024-03-01" },
    { id: "4", company: "CloudSys", role: "UI Engineer", status: "Offer", date: "2024-03-12" },
];

export default function TrackerPage() {
    const [applications, setApplications] = useState<Application[]>(initialApplications);

    const columns: Status[] = ["Applied", "Interviewing", "Offer", "Rejected"];

    const getStatusColor = (status: Status) => {
        switch (status) {
            case "Applied": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
            case "Interviewing": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
            case "Offer": return "bg-green-500/10 text-green-500 border-green-500/20";
            case "Rejected": return "bg-red-500/10 text-red-500 border-red-500/20";
            default: return "";
        }
    };

    return (
        <div className="space-y-6 h-full flex flex-col">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight metallic-text">Application Tracker</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your job search pipeline.
                    </p>
                </div>
                <Button className="bg-primary text-primary-foreground shadow-lg">
                    <Plus className="mr-2 h-4 w-4" /> Add Application
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 overflow-x-auto pb-4">
                {columns.map((status) => (
                    <div key={status} className="flex flex-col gap-4 min-w-[280px]">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                                {status}
                            </h3>
                            <Badge variant="outline" className="bg-secondary/50">
                                {applications.filter(a => a.status === status).length}
                            </Badge>
                        </div>

                        <div className="flex-1 bg-secondary/20 rounded-xl p-3 space-y-3 border border-border/50 min-h-[500px]">
                            {applications
                                .filter((app) => app.status === status)
                                .map((app) => (
                                    <Card key={app.id} className="glass-card hover:shadow-md cursor-grab active:cursor-grabbing">
                                        <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
                                            <div className="font-semibold text-sm">{app.company}</div>
                                            <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </CardHeader>
                                        <CardContent className="p-4 pt-0">
                                            <div className="text-xs text-muted-foreground mb-2">{app.role}</div>
                                            <div className="flex items-center justify-between mt-3">
                                                <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 h-5 ${getStatusColor(app.status)}`}>
                                                    {app.status}
                                                </Badge>
                                                <span className="text-[10px] text-muted-foreground">{app.date}</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
