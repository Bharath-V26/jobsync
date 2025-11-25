"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Copy, Check } from "lucide-react";
import { useProfile } from "@/components/profile-provider";

export function ApplyHelper({ children }: { children: React.ReactNode }) {
    const { profile } = useProfile();
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const profileData = {
        "Full Name": profile.fullName || "Not set",
        "Email": profile.email || "Not set",
        "Phone": profile.phone || "Not set",
        "LinkedIn": profile.portfolio || "Not set",
        "Location": profile.location || "Not set",
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md glass-card border-white/20">
                <DialogHeader>
                    <DialogTitle>Apply with JobSync Profile</DialogTitle>
                    <DialogDescription>
                        Copy your details to paste into the application form.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {Object.entries(profileData).map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border/50">
                            <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground">{label}</span>
                                <span className="text-sm font-medium">{value}</span>
                            </div>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                                onClick={() => copyToClipboard(value, label)}
                            >
                                {copiedField === label ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                    <Copy className="h-4 w-4 text-muted-foreground" />
                                )}
                            </Button>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center">
                    <Button className="w-full" onClick={() => window.open("https://example.com/apply", "_blank")}>
                        Go to Application Site
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
