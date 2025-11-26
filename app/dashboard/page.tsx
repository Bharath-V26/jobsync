import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JobFeed } from "@/components/job-feed/JobFeed";
import { JobFilters } from "@/components/job-feed/JobFilters";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Job Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here are the latest jobs matching your profile.
          </p>
        </div>
        <Link href="/profile">
          <Button variant="premium">
            Update Profile
          </Button>
        </Link>
      </div>

      {/* Stats section removed in favor of dedicated Tracker page */}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
        <div className="lg:col-span-1">
          <JobFilters />
        </div>
        <div className="lg:col-span-3">
          <JobFeed />
        </div>
      </div>
    </div>
  );
}
