"use client";

import { UnifiedProfileForm } from "@/components/profile/UnifiedProfileForm";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function ProfilePage() {
    const handleLogout = () => {
        signOut({ callbackUrl: "/login" });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your unified profile to speed up job applications.
                    </p>
                </div>
                <Button variant="outline" onClick={handleLogout} className="gap-2">
                    <LogOut className="h-4 w-4" />
                    Logout
                </Button>
            </div>
            <UnifiedProfileForm />
        </div>
    );
}
