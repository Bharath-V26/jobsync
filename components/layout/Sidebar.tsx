"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, User, FileText, Users, Settings, Bookmark, Kanban } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Job Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Feed", href: "/feed", icon: Users },
    { name: "Saved Jobs", href: "/dashboard/saved", icon: Bookmark },
    { name: "Tracker", href: "/dashboard/tracker", icon: Kanban },
    { name: "Tools", href: "/dashboard/tools", icon: Briefcase },
    { name: "My Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden border-r bg-card/50 backdrop-blur-xl lg:block lg:w-72 lg:fixed lg:inset-y-0 z-50">
            <div className="flex h-16 items-center px-6 border-b border-border/50">
                <Briefcase className="h-6 w-6 text-primary mr-2" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    JobSync
                </span>
            </div>
            <div className="flex flex-col gap-y-1 px-3 py-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "group flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-primary/10 text-primary shadow-sm"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "h-5 w-5 shrink-0",
                                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                )}
                                aria-hidden="true"
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </div>
            <div className="absolute bottom-4 left-0 right-0 px-6">
                <div className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-4 text-white shadow-lg">
                    <p className="text-sm font-semibold">Upgrade to Pro</p>
                    <p className="text-xs text-blue-100 mt-1">Get unlimited job applications and AI resume reviews.</p>
                </div>
            </div>
        </div>
    );
}
