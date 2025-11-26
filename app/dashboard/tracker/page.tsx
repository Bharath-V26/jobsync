"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApplications, ApplicationStatus } from "@/components/applications-provider";
import { AddApplicationDialog } from "@/components/tracker/add-application-dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TrackerPage() {
    const { applications, isLoading, updateApplicationStatus, deleteApplication } = useApplications();

    const columns: { id: ApplicationStatus; label: string }[] = [
        { id: "applied", label: "Applied" },
        { id: "interviewing", label: "Interviewing" },
        { id: "offered", label: "Offer" },
        { id: "rejected", label: "Rejected" },
    ];

    const getStatusColor = (status: ApplicationStatus) => {
        switch (status) {
            case "applied": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
            case "interviewing": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
            case "offered": return "bg-green-500/10 text-green-500 border-green-500/20";
            case "rejected": return "bg-red-500/10 text-red-500 border-red-500/20";
            default: return "";
        }
    };

    if (isLoading) {
        return <div className="p-8">Loading applications...</div>;
    }

    return (
        <div className="space-y-6 h-full flex flex-col">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight metallic-text">Application Tracker</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your job search pipeline.
                    </p>
                </div>
                <AddApplicationDialog />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 overflow-x-auto pb-4">
                {columns.map((column) => (
                    <div key={column.id} className="flex flex-col gap-4 min-w-[280px]">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                                {column.label}
                            </h3>
                            <Badge variant="outline" className="bg-secondary/50">
                                {applications.filter(a => a.status === column.id).length}
                            </Badge>
                        </div>

                        <div className="flex-1 bg-secondary/20 rounded-xl p-3 space-y-3 border border-border/50 min-h-[500px]">
                            {applications
                                .filter((app) => app.status === column.id)
                                .map((app) => (
                                    <Card key={app.id} className="glass-card hover:shadow-md transition-all">
                                        <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
                                            <div className="font-semibold text-sm truncate pr-2">{app.company}</div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => updateApplicationStatus(app.id, "interviewing")}>
                                                        Move to Interviewing
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => updateApplicationStatus(app.id, "offered")}>
                                                        Move to Offer
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => updateApplicationStatus(app.id, "rejected")}>
                                                        Move to Rejected
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        className="text-red-600 focus:text-red-600"
                                                        onClick={() => deleteApplication(app.id)}
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </CardHeader>
                                        <CardContent className="p-4 pt-0">
                                            <div className="text-xs text-muted-foreground mb-2 truncate">{app.jobTitle}</div>
                                            <div className="flex items-center justify-between mt-3">
                                                <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 h-5 ${getStatusColor(app.status)}`}>
                                                    {column.label}
                                                </Badge>
                                                <span className="text-[10px] text-muted-foreground">
                                                    {new Date(app.appliedAt).toLocaleDateString()}
                                                </span>
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
