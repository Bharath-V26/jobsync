"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function Header() {
    const { data: session } = useSession();
    const userInitials = session?.user?.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U";

    return (
        <header className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-border/50 bg-background/80 px-6 backdrop-blur-xl shadow-sm">
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end">
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <Bell className="h-5 w-5" />
                        <span className="sr-only">View notifications</span>
                    </Button>
                    <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-border" aria-hidden="true" />
                    <Link href="/profile" className="flex items-center gap-x-4">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                            {userInitials}
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
}
