import { UnifiedProfileForm } from "@/components/profile/UnifiedProfileForm";

export default function ProfilePage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
                <p className="text-muted-foreground mt-2">
                    Manage your unified profile to speed up job applications.
                </p>
            </div>
            <UnifiedProfileForm />
        </div>
    );
}
