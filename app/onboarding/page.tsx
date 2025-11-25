"use client";

import { UnifiedProfileForm } from "@/components/profile/UnifiedProfileForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function OnboardingPage() {
    return (
        <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight metallic-text sm:text-4xl">
                        Complete Your Profile
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Let's get you set up. This information will be used to auto-fill your job applications.
                    </p>
                </div>

                <UnifiedProfileForm />

                <div className="flex justify-center pt-8">
                    <Link href="/dashboard">
                        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                            Skip for now <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
